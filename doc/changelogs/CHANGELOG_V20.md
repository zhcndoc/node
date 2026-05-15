# Node.js 20 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>LTS 'Iron'</th>
<th>当前版</th>
</tr>
<tr>
<td>
<a href="#20.20.2">20.20.2</a><br/>
<a href="#20.20.1">20.20.1</a><br/>
<a href="#20.20.0">20.20.0</a><br/>
<a href="#20.19.6">20.19.6</a><br/>
<a href="#20.19.5">20.19.5</a><br/>
<a href="#20.19.4">20.19.4</a><br/>
<a href="#20.19.3">20.19.3</a><br/>
<a href="#20.19.2">20.19.2</a><br/>
<a href="#20.19.1">20.19.1</a><br/>
<a href="#20.19.0">20.19.0</a><br/>
<a href="#20.18.3">20.18.3</a><br/>
<a href="#20.18.2">20.18.2</a><br/>
<a href="#20.18.1">20.18.1</a><br/>
<a href="#20.18.0">20.18.0</a><br/>
<a href="#20.17.0">20.17.0</a><br/>
<a href="#20.16.0">20.16.0</a><br/>
<a href="#20.15.1">20.15.1</a><br/>
<a href="#20.15.0">20.15.0</a><br/>
<a href="#20.14.0">20.14.0</a><br/>
<a href="#20.13.1">20.13.1</a><br/>
<a href="#20.13.0">20.13.0</a><br/>
<a href="#20.12.2">20.12.2</a><br/>
<a href="#20.12.1">20.12.1</a><br/>
<a href="#20.12.0">20.12.0</a><br/>
<a href="#20.11.1">20.11.1</a><br/>
<a href="#20.11.0">20.11.0</a><br/>
<a href="#20.10.0">20.10.0</a><br/>
<a href="#20.9.0">20.9.0</a><br/>
</td>
<td>
<a href="#20.8.1">20.8.1</a><br/>
<a href="#20.8.0">20.8.0</a><br/>
<a href="#20.7.0">20.7.0</a><br/>
<a href="#20.6.1">20.6.1</a><br/>
<a href="#20.6.0">20.6.0</a><br/>
<a href="#20.5.1">20.5.1</a><br/>
<a href="#20.5.0">20.5.0</a><br/>
<a href="#20.4.0">20.4.0</a><br/>
<a href="#20.3.1">20.3.1</a><br/>
<a href="#20.3.0">20.3.0</a><br/>
<a href="#20.2.0">20.2.0</a><br/>
<a href="#20.1.0">20.1.0</a><br/>
<a href="#20.0.0">20.0.0</a><br/>
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
  * [4.x](CHANGELOG_V4.md)
  * [0.12.x](CHANGELOG_V012.md)
  * [0.10.x](CHANGELOG_V010.md)
  * [io.js](CHANGELOG_IOJS.md)
  * [归档](CHANGELOG_ARCHIVE.md)

<a id="20.20.2"></a>

## 2026-03-24, 版本 20.20.2 'Iron' (LTS), @marco-ippolito

这是一个安全发布版本。

### 显著变更

* (CVE-2026-21717) 修复数组索引哈希碰撞 (Joyee Cheung) <https://github.com/nodejs-private/node-private/pull/834>
* (CVE-2026-21713) 在 Web Cryptography 的 HMAC 和 KMAC 中使用时序安全比较 (Filip Skokan) <https://github.com/nodejs-private/node-private/pull/822>
* (CVE-2026-21710) 为 headersDistinct/trailersDistinct 使用 null 原型 (Matteo Collina) <https://github.com/nodejs-private/node-private/pull/821>
* (CVE-2026-21716) 在 lib/fs/promises 中加入权限检查 (RafaelGSS) <https://github.com/nodejs-private/node-private/pull/795>
* (CVE-2026-21715) 为 realpath.native 添加权限检查 (RafaelGSS) <https://github.com/nodejs-private/node-private/pull/794>
* (CVE-2026-21714) 处理 NGHTTP2\_ERR\_FLOW\_CONTROL 错误码 (RafaelGSS) <https://github.com/nodejs-private/node-private/pull/832>
* (CVE-2026-21637) 将 SNICallback 调用包装在 try/catch 中 (Matteo Collina) <https://github.com/nodejs-private/node-private/pull/819>

### 提交

* \[[`cfb51fa9ce`](https://github.com/nodejs/node/commit/cfb51fa9ce)] - **(CVE-2026-21713)** **crypto**: 在 Web Cryptography 的 HMAC 中使用时序安全比较 (Filip Skokan) [nodejs-private/node-private#831](https://github.com/nodejs-private/node-private/pull/831)
* \[[`f333d0be5f`](https://github.com/nodejs/node/commit/f333d0be5f)] - **deps**: V8: 覆盖 `depot_tools` 版本 (Richard Lau) [#62344](https://github.com/nodejs/node/pull/62344)
* \[[`2acd5d1226`](https://github.com/nodejs/node/commit/2acd5d1226)] - **deps**: 将 undici 更新到 v6.24.1 (Matteo Collina) [#62285](https://github.com/nodejs/node/pull/62285)
* \[[`af5c144ebc`](https://github.com/nodejs/node/commit/af5c144ebc)] - **(CVE-2026-21717)** **deps,build,test**: 修复数组索引哈希碰撞 (Joyee Cheung) [nodejs-private/node-private#834](https://github.com/nodejs-private/node-private/pull/834)
* \[[`00ad47a28e`](https://github.com/nodejs/node/commit/00ad47a28e)] - **(CVE-2026-21710)** **http**: 为 headersDistinct/trailersDistinct 使用 null 原型 (Matteo Collina) [nodejs-private/node-private#821](https://github.com/nodejs-private/node-private/pull/821)
* \[[`0123309566`](https://github.com/nodejs/node/commit/0123309566)] - **(CVE-2026-21716)** **permission**: 在 lib/fs/promises 中加入权限检查 (RafaelGSS) [nodejs-private/node-private#840](https://github.com/nodejs-private/node-private/pull/840)
* \[[`00830712bc`](https://github.com/nodejs/node/commit/00830712bc)] - **(CVE-2026-21715)** **permission**: 为 realpath.native 添加权限检查 (RafaelGSS) [nodejs-private/node-private#838](https://github.com/nodejs-private/node-private/pull/838)
* \[[`a0c73425da`](https://github.com/nodejs/node/commit/a0c73425da)] - **(CVE-2026-21714)** **src**: 处理 NGHTTP2\_ERR\_FLOW\_CONTROL 错误码 (RafaelGSS) [nodejs-private/node-private#832](https://github.com/nodejs-private/node-private/pull/832)
* \[[`cc3f294507`](https://github.com/nodejs/node/commit/cc3f294507)] - **(CVE-2026-21637)** **tls**: 将 SNICallback 调用包装在 try/catch 中 (Matteo Collina) [nodejs-private/node-private#839](https://github.com/nodejs-private/node-private/pull/839)

<a id="20.20.1"></a>

## 2026-03-05, 版本 20.20.1 'Iron' (LTS), @marco-ippolito

### 显著变更

* \[[`91a66e671c`](https://github.com/nodejs/node/commit/91a66e671c)] - **build**: 在 Python 3.14 上测试 (Christian Clauss) [#59983](https://github.com/nodejs/node/pull/59983)
* \[[`f66056054b`](https://github.com/nodejs/node/commit/f66056054b)] - **crypto**: 将根证书更新到 NSS 3.119 (Node.js GitHub Bot) [#61419](https://github.com/nodejs/node/pull/61419)
* \[[`80feacaddb`](https://github.com/nodejs/node/commit/80feacaddb)] - **crypto**: 将根证书更新到 NSS 3.117 (Node.js GitHub Bot) [#60741](https://github.com/nodejs/node/pull/60741)

### 提交

* \[[`6f580d5399`](https://github.com/nodejs/node/commit/6f580d5399)] - **assert**: 修复 deepEqual 在 URL 上总是返回 true (Xuguang Mei) [#50853](https://github.com/nodejs/node/pull/50853)
* \[[`91a66e671c`](https://github.com/nodejs/node/commit/91a66e671c)] - **build**: 在 Python 3.14 上测试 (Christian Clauss) [#59983](https://github.com/nodejs/node/pull/59983)
* \[[`cc4f7af6f3`](https://github.com/nodejs/node/commit/cc4f7af6f3)] - **build**: 在非 main 分支上跳过 sscache 动作 (Joyee Cheung) [#61790](https://github.com/nodejs/node/pull/61790)
* \[[`f66056054b`](https://github.com/nodejs/node/commit/f66056054b)] - **crypto**: 将根证书更新到 NSS 3.119 (Node.js GitHub Bot) [#61419](https://github.com/nodejs/node/pull/61419)
* \[[`80feacaddb`](https://github.com/nodejs/node/commit/80feacaddb)] - **crypto**: 将根证书更新到 NSS 3.117 (Node.js GitHub Bot) [#60741](https://github.com/nodejs/node/pull/60741)
* \[[`fa88cc07e2`](https://github.com/nodejs/node/commit/fa88cc07e2)] - **crypto**: 确保使用文档中声明的 RSA-PSS saltLength 默认值 (Filip Skokan) [#60662](https://github.com/nodejs/node/pull/60662)
* \[[`88b2eec88a`](https://github.com/nodejs/node/commit/88b2eec88a)] - **deps**: 将 minimatch 更新到 10.2.2 (Node.js GitHub Bot) [#61830](https://github.com/nodejs/node/pull/61830)
* \[[`5c053264f1`](https://github.com/nodejs/node/commit/5c053264f1)] - **deps**: V8: 回移植 6a0a25abaed3 (Vivian Wang) [#61687](https://github.com/nodejs/node/pull/61687)
* \[[`4a398699d0`](https://github.com/nodejs/node/commit/4a398699d0)] - **deps**: 将 googletest 更新到 5a9c3f9e8d9b90bbbe8feb32902146cb8f7c1757 (Node.js GitHub Bot) [#61731](https://github.com/nodejs/node/pull/61731)
* \[[`4fa43adf15`](https://github.com/nodejs/node/commit/4fa43adf15)] - **deps**: 将 googletest 更新到 56efe3983185e3f37e43415d1afa97e3860f187f (Node.js GitHub Bot) [#61605](https://github.com/nodejs/node/pull/61605)
* \[[`1a855d490c`](https://github.com/nodejs/node/commit/1a855d490c)] - **deps**: 将 googletest 更新到 85087857ad10bd407cd6ed2f52f7ea9752db621f (Node.js GitHub Bot) [#61417](https://github.com/nodejs/node/pull/61417)
* \[[`d8a9359826`](https://github.com/nodejs/node/commit/d8a9359826)] - **deps**: 将 icu 更新到 78.2 (Node.js GitHub Bot) [#60523](https://github.com/nodejs/node/pull/60523)
* \[[`e79cd3a0bb`](https://github.com/nodejs/node/commit/e79cd3a0bb)] - **deps**: 将 acorn-walk 更新到 8.3.5 (Node.js GitHub Bot) [#61928](https://github.com/nodejs/node/pull/61928)
* \[[`0707ade464`](https://github.com/nodejs/node/commit/0707ade464)] - **deps**: 将 acorn 更新到 8.16.0 (Node.js GitHub Bot) [#61925](https://github.com/nodejs/node/pull/61925)
* \[[`dc5a3cddef`](https://github.com/nodejs/node/commit/dc5a3cddef)] - **deps**: 将 llhttp 更新到 9.3.1 (Node.js GitHub Bot) [#61827](https://github.com/nodejs/node/pull/61827)
* \[[`46043b94c7`](https://github.com/nodejs/node/commit/46043b94c7)] - **deps**: 将 zlib 更新到 1.3.1-e00f703 (Node.js GitHub Bot) [#61135](https://github.com/nodejs/node/pull/61135)
* \[[`6be15a596e`](https://github.com/nodejs/node/commit/6be15a596e)] - **deps**: 将 cjs-module-lexer 更新到 2.2.0 (Node.js GitHub Bot) [#61271](https://github.com/nodejs/node/pull/61271)
* \[[`10881404cd`](https://github.com/nodejs/node/commit/10881404cd)] - **deps**: 将时区数据更新到 2025c (Node.js GitHub Bot) [#61138](https://github.com/nodejs/node/pull/61138)
* \[[`1594a78c85`](https://github.com/nodejs/node/commit/1594a78c85)] - **deps**: 将 googletest 更新到 065127f1e4b46c5f14fc73cf8d323c221f9dc68e (Node.js GitHub Bot) [#61055](https://github.com/nodejs/node/pull/61055)
* \[[`7fa2ee1933`](https://github.com/nodejs/node/commit/7fa2ee1933)] - **deps**: 将 zlib 更新到 1.3.1-63d7e16 (Node.js GitHub Bot) [#60898](https://github.com/nodejs/node/pull/60898)
* \[[`09259532ef`](https://github.com/nodejs/node/commit/09259532ef)] - **deps**: 将 googletest 更新到 1b96fa13f549387b7549cc89e1a785cf143a1a50 (Node.js GitHub Bot) [#60739](https://github.com/nodejs/node/pull/60739)
* \[[`aa8bdb6886`](https://github.com/nodejs/node/commit/aa8bdb6886)] - **deps**: 将 cjs-module-lexer 更新到 2.1.1 (Node.js GitHub Bot) [#60646](https://github.com/nodejs/node/pull/60646)
* \[[`cc849fde27`](https://github.com/nodejs/node/commit/cc849fde27)] - **deps**: 将 googletest 更新到 279f847 (Node.js GitHub Bot) [#60219](https://github.com/nodejs/node/pull/60219)
* \[[`a99ba553a2`](https://github.com/nodejs/node/commit/a99ba553a2)] - **deps**: 将 googletest 更新到 50b8600 (Node.js GitHub Bot) [#59955](https://github.com/nodejs/node/pull/59955)
* \[[`6349a79f5f`](https://github.com/nodejs/node/commit/6349a79f5f)] - **deps**: 将 googletest 更新到 7e17b15 (Node.js GitHub Bot) [#59131](https://github.com/nodejs/node/pull/59131)
* \[[`8ba759f1a0`](https://github.com/nodejs/node/commit/8ba759f1a0)] - **deps**: 将 googletest 更新到 35b75a2 (Node.js GitHub Bot) [#58710](https://github.com/nodejs/node/pull/58710)
* \[[`927d906850`](https://github.com/nodejs/node/commit/927d906850)] - **deps**: 将 googletest 更新到 e9092b1 (Node.js GitHub Bot) [#58565](https://github.com/nodejs/node/pull/58565)
* \[[`bf8919f5c2`](https://github.com/nodejs/node/commit/bf8919f5c2)] - **deps**: 将 googletest 更新到 0bdccf4 (Node.js GitHub Bot) [#57380](https://github.com/nodejs/node/pull/57380)
* \[[`ae6231dac0`](https://github.com/nodejs/node/commit/ae6231dac0)] - **deps**: 将 googletest 更新到 e235eb3 (Node.js GitHub Bot) [#56873](https://github.com/nodejs/node/pull/56873)
* \[[`0561c62e85`](https://github.com/nodejs/node/commit/0561c62e85)] - **deps**: 将 minimatch 更新到 10.1.2 (Node.js GitHub Bot) [#61732](https://github.com/nodejs/node/pull/61732)
* \[[`f0ef221b0d`](https://github.com/nodejs/node/commit/f0ef221b0d)] - **deps**: 将 minimatch 更新到 10.1.1 (Node.js GitHub Bot) [#60543](https://github.com/nodejs/node/pull/60543)
* \[[`15bd0da404`](https://github.com/nodejs/node/commit/15bd0da404)] - **deps**: 更新 openssl 的 archs 文件 (Antoine du Hamel) [#61912](https://github.com/nodejs/node/pull/61912)
* \[[`04d439323f`](https://github.com/nodejs/node/commit/04d439323f)] - **deps**: 将 openssl 源码升级到 openssl-3.0.19 (Antoine du Hamel) [#61912](https://github.com/nodejs/node/pull/61912)
* \[[`2ea16d3bd6`](https://github.com/nodejs/node/commit/2ea16d3bd6)] - **deps**: 将 corepack 更新到 0.34.6 (Node.js GitHub Bot) [#61510](https://github.com/nodejs/node/pull/61510)
* \[[`622f973d1c`](https://github.com/nodejs/node/commit/622f973d1c)] - **deps**: 将 corepack 更新到 0.34.5 (Node.js GitHub Bot) [#60842](https://github.com/nodejs/node/pull/60842)
* \[[`2cd265d8b9`](https://github.com/nodejs/node/commit/2cd265d8b9)] - **deps**: 将 corepack 更新到 0.34.4 (Node.js GitHub Bot) [#60643](https://github.com/nodejs/node/pull/60643)
* \[[`65e839687b`](https://github.com/nodejs/node/commit/65e839687b)] - **deps**: 将 corepack 更新到 0.34.2 (Node.js GitHub Bot) [#60550](https://github.com/nodejs/node/pull/60550)
* \[[`2dc99d2771`](https://github.com/nodejs/node/commit/2dc99d2771)] - **dns**: 通过调整 c-ares 回退检测修复 Windows SRV ECONNREFUSED (notvivek12) [#61453](https://github.com/nodejs/node/pull/61453)
* \[[`2c7b84b1d8`](https://github.com/nodejs/node/commit/2c7b84b1d8)] - **doc**: 修复 http.md 中的拼写错误 (Michael Solomon) [#59354](https://github.com/nodejs/node/pull/59354)
* \[[`a84b42667c`](https://github.com/nodejs/node/commit/a84b42667c)] - **doc**: 修复 global dispatcher 用法中的语法错误 (Eng Zer Jun) [#59344](https://github.com/nodejs/node/pull/59344)
* \[[`ffd0ada45f`](https://github.com/nodejs/node/commit/ffd0ada45f)] - **doc**: 修复 `test/common/README.md` 中的拼写错误 (Yoo) [#59180](https://github.com/nodejs/node/pull/59180)
* \[[`b4d9d006e7`](https://github.com/nodejs/node/commit/b4d9d006e7)] - **doc**: 修复 `URL.parse` 中损坏的句子 (Superchupu) [#59164](https://github.com/nodejs/node/pull/59164)
* \[[`45e9971d9c`](https://github.com/nodejs/node/commit/45e9971d9c)] - **doc**: 修复 writing-test.md 中的拼写错误 (SeokHun) [#59123](https://github.com/nodejs/node/pull/59123)
* \[[`e9fd10b5d6`](https://github.com/nodejs/node/commit/e9fd10b5d6)] - **doc**: 修复 `globals.md` 中的 `fetch` 小节 (Antoine du Hamel) [#58933](https://github.com/nodejs/node/pull/58933)
* \[[`3715dd1c2b`](https://github.com/nodejs/node/commit/3715dd1c2b)] - **doc**: 修复 http2 中错误的 RFC 编号 (Deokjin Kim) [#58753](https://github.com/nodejs/node/pull/58753)
* \[[`098c017eac`](https://github.com/nodejs/node/commit/098c017eac)] - **doc**: 为 Node-API 版本说明澄清补充标点修正 (Jiacai Liu) [#58599](https://github.com/nodejs/node/pull/58599)
* \[[`545bf434e1`](https://github.com/nodejs/node/commit/545bf434e1)] - **doc**: 修复文件 `http.md` 中 `outgoingMessage.setTimeout` 小节的拼写错误 (yusheng chen) [#58188](https://github.com/nodejs/node/pull/58188)
* \[[`b3d6683e7b`](https://github.com/nodejs/node/commit/b3d6683e7b)] - **doc**: 仅支持 Visual Studio 2019 和 2022 的工具链 (Mike McCready) [#61450](https://github.com/nodejs/node/pull/61450)
* \[[`8fdde5d110`](https://github.com/nodejs/node/commit/8fdde5d110)] - **doc**: 修复安全发布后的 v20 变更日志 (Marco Ippolito) [#61371](https://github.com/nodejs/node/pull/61371)
* \[[`31d04599be`](https://github.com/nodejs/node/commit/31d04599be)] - **http**: 修复请求后空行后 keep-alive 不会超时的问题 (Shima Ryuhei) [#58178](https://github.com/nodejs/node/pull/58178)
* \[[`5ec7d1eba0`](https://github.com/nodejs/node/commit/5ec7d1eba0)] - **http2**: 按 HTTP/2 规范验证 initialWindowSize (Matteo Collina) [#61402](https://github.com/nodejs/node/pull/61402)
* \[[`5c091d5a96`](https://github.com/nodejs/node/commit/5c091d5a96)] - **meta**: 将 sccache 守护进程保留到构建工作流结束 (René) [#61639](https://github.com/nodejs/node/pull/61639)
* \[[`183353aba0`](https://github.com/nodejs/node/commit/183353aba0)] - **path,win**: 修复 resolve 和 normalize 中的错误 (Hüseyin Açacak) [#55623](https://github.com/nodejs/node/pull/55623)
* \[[`dbe9e5091b`](https://github.com/nodejs/node/commit/dbe9e5091b)] - **src**: 修复 JSUdpWrap 中 flags 参数偏移 (Weixie Cui) [#61948](https://github.com/nodejs/node/pull/61948)
* \[[`4106bfc775`](https://github.com/nodejs/node/commit/4106bfc775)] - **test**: 将 AIX 上的 stringbytes-external-max 标记为易变 (Stewart X Addison) [#60995](https://github.com/nodejs/node/pull/60995)
* \[[`de51937306`](https://github.com/nodejs/node/commit/de51937306)] - **test**: 将 AIX 上的 stringbytes-external-exceed-max 测试标记为易变 (Joyee Cheung) [#60565](https://github.com/nodejs/node/pull/60565)
* \[[`368b221be3`](https://github.com/nodejs/node/commit/368b221be3)] - **test**: 修复易变的 test-performance-eventloopdelay (Matteo Collina) [#61629](https://github.com/nodejs/node/pull/61629)
* \[[`e134912a33`](https://github.com/nodejs/node/commit/e134912a33)] - **test**: 修复易变的 test-worker-message-port-transfer-filehandle 测试 (Alex Yang) [#59158](https://github.com/nodejs/node/pull/59158)
* \[[`5630170d3e`](https://github.com/nodejs/node/commit/5630170d3e)] - **test**: 在易变的 async\_hooks 测试中考虑 truthy signal (Darshan Sen) [#58478](https://github.com/nodejs/node/pull/58478)
* \[[`1e5363bb63`](https://github.com/nodejs/node/commit/1e5363bb63)] - **test**: 将 `test-http2-debug` 标记为 LinuxONE 上的易变测试 (Richard Lau) [#58494](https://github.com/nodejs/node/pull/58494)
* \[[`662998787a`](https://github.com/nodejs/node/commit/662998787a)] - **test**: 将 `test-fs-cp` 设为易变 (Stefan Stojanovic) [#56799](https://github.com/nodejs/node/pull/56799)
* \[[`0807127339`](https://github.com/nodejs/node/commit/0807127339)] - **test**: 将 `test-esm-loader-hooks-inspect-wait` 标记为易变 (Richard Lau) [#56803](https://github.com/nodejs/node/pull/56803)
* \[[`6320cd0721`](https://github.com/nodejs/node/commit/6320cd0721)] - **test**: 跳过使用共享 openssl 的 strace 测试 (Richard Lau) [#61987](https://github.com/nodejs/node/pull/61987)
* \[[`83b9f8ee02`](https://github.com/nodejs/node/commit/83b9f8ee02)] - **tools**: 使 nodedownload 模块兼容 Python 3.14 (Lumír 'Frenzy' Balhar) [#58752](https://github.com/nodejs/node/pull/58752)
* \[[`6cf9b5786e`](https://github.com/nodejs/node/commit/6cf9b5786e)] - **tools**: 在发布提案中强制移除 `lts-watch-*` 标签 (Antoine du Hamel) [#61672](https://github.com/nodejs/node/pull/61672)
* \[[`cd4161499c`](https://github.com/nodejs/node/commit/cd4161499c)] - **tools**: 在 meta GitHub Actions 中使用 ubuntu-slim 运行器 (Tierney Cyren) [#61663](https://github.com/nodejs/node/pull/61663)
* \[[`6dc2a99a0d`](https://github.com/nodejs/node/commit/6dc2a99a0d)] - **tools**: 将发布提交差异验证作为 `lint-release-proposal` 的一部分 (Antoine du Hamel) [#61440](https://github.com/nodejs/node/pull/61440)
* \[[`5014f22332`](https://github.com/nodejs/node/commit/5014f22332)] - **tools**: 为读取内容的工作流添加读取权限 (Antoine du Hamel) [#58255](https://github.com/nodejs/node/pull/58255)
* \[[`6c3ad2a5a3`](https://github.com/nodejs/node/commit/6c3ad2a5a3)] - **tools**: 在 GHA 作业中切换到 ARM 运行器 (Antoine du Hamel) [#61903](https://github.com/nodejs/node/pull/61903)
* \[[`1abada9c34`](https://github.com/nodejs/node/commit/1abada9c34)] - **tools**: 避免在覆盖率作业中构建两次 (Antoine du Hamel) [#61899](https://github.com/nodejs/node/pull/61899)
* \[[`f260e40127`](https://github.com/nodejs/node/commit/f260e40127)] - **tools**: 在 GHA 中使用 ubuntu-slim 运行器 (Antoine du Hamel) [#61759](https://github.com/nodejs/node/pull/61759)
* \[[`64beca5e01`](https://github.com/nodejs/node/commit/64beca5e01)] - **tools**: 在 GHA 中使用 ubuntu-slim 运行器 (Antoine du Hamel) [#61734](https://github.com/nodejs/node/pull/61734)

<a id="20.20.0"></a>

## 2026-01-13，版本 20.20.0 'Iron'（LTS），@marco-ippolito

这是一个安全发布。

### 重要变更

* (CVE-2025-55132) 在启用权限模型时禁用 futimes（RafaelGSS） <https://github.com/nodejs-private/node-private/pull/802>
* (CVE-2025-59465) 添加 TLSSocket 默认错误处理程序（RafaelGSS） <https://github.com/nodejs-private/node-private/pull/797>
* (CVE-2025-55130) 要求 symlink API 具备完整的读写权限（RafaelGSS） <https://github.com/nodejs-private/node-private/pull/760>
* (CVE-2025-59466) 在 async\_hooks 中重新抛出栈溢出异常（Matteo Collina） <https://github.com/nodejs-private/node-private/pull/773>
* (CVE-2025-55131) 重构不安全的 buffer 创建以移除 zero-fill 切换（Сковорода Никита Андреевич） <https://github.com/nodejs-private/node-private/pull/759>
* (CVE-2026-21637) 将回调异常通过错误处理程序路由（Matteo Collina） <https://github.com/nodejs-private/node-private/pull/796>

### 提交

* \[[`8f9ba3f623`](https://github.com/nodejs/node/commit/8f9ba3f623)] - **deps**: 将 c-ares 更新到 v1.34.6（Node.js GitHub Bot）[#60997](https://github.com/nodejs/node/pull/60997)
* \[[`97fc9b0eb7`](https://github.com/nodejs/node/commit/97fc9b0eb7)] - **deps**: 将 undici 更新到 6.23.0（Matteo Collina）[nodejs-private/node-private#792](https://github.com/nodejs-private/node-private/pull/792)
* \[[`14fbbb510c`](https://github.com/nodejs/node/commit/14fbbb510c)] - **(CVE-2025-55132)** **lib**: 在启用权限模型时禁用 futimes（RafaelGSS）[nodejs-private/node-private#802](https://github.com/nodejs-private/node-private/pull/802)
* \[[`1febc48d5b`](https://github.com/nodejs/node/commit/1febc48d5b)] - **(CVE-2025-59465)** **lib**: 添加 TLSSocket 默认错误处理程序（RafaelGSS）[nodejs-private/node-private#797](https://github.com/nodejs-private/node-private/pull/797)
* \[[`494f62dc23`](https://github.com/nodejs/node/commit/494f62dc23)] - **(CVE-2025-55130)** **lib,permission**: 要求 symlink API 具备完整的读写权限（RafaelGSS）[nodejs-private/node-private#760](https://github.com/nodejs-private/node-private/pull/760)
* \[[`d7a5c587c0`](https://github.com/nodejs/node/commit/d7a5c587c0)] - **(CVE-2025-59466)** **src**: 在 async\_hooks 中重新抛出栈溢出异常（Matteo Collina）[nodejs-private/node-private#773](https://github.com/nodejs-private/node-private/pull/773)
* \[[`51f4de4b4a`](https://github.com/nodejs/node/commit/51f4de4b4a)] - **(CVE-2025-55131)** **src,lib**: 重构不安全的 buffer 创建以移除 zero-fill 切换（Сковорода Никита Андреевич）[nodejs-private/node-private#759](https://github.com/nodejs-private/node-private/pull/759)
* \[[`85f73e7057`](https://github.com/nodejs/node/commit/85f73e7057)] - **(CVE-2026-21637)** **tls**: 将回调异常通过错误处理程序路由（Matteo Collina）[nodejs-private/node-private#796](https://github.com/nodejs-private/node-private/pull/796)

<a id="20.19.6"></a>

## 2025-11-25，版本 20.19.6 'Iron'（LTS），@marco-ippolito

### 重要变更

* \[[`6277910a15`](https://github.com/nodejs/node/commit/6277910a15)] - **crypto**: 将根证书更新到 NSS 3.114（Node.js GitHub Bot）[#59571](https://github.com/nodejs/node/pull/59571)
* \[[`082e50d4a2`](https://github.com/nodejs/node/commit/082e50d4a2)] - **doc**: 更新如何验证发布版本的说明（Antoine du Hamel）[#59113](https://github.com/nodejs/node/pull/59113)
* \[[`db68cec4cb`](https://github.com/nodejs/node/commit/db68cec4cb)] - **doc**: 废弃 HTTP/2 优先级信号传递（Matteo Collina）[#58313](https://github.com/nodejs/node/pull/58313)

### 提交

* \[[`0f644df42e`](https://github.com/nodejs/node/commit/0f644df42e)] - **build**: 修复 OpenHarmony 平台上的 'implicit-function-declaration'（hqzing）[#59547](https://github.com/nodejs/node/pull/59547)
* \[[`fba0025b9c`](https://github.com/nodejs/node/commit/fba0025b9c)] - **build**: 使用 `windows-2025` 运行器（Michaël Zasso）[#59673](https://github.com/nodejs/node/pull/59673)
* \[[`3456ec946d`](https://github.com/nodejs/node/commit/3456ec946d)] - **crypto**: 将根证书更新到 NSS 3.116（Node.js GitHub Bot）[#59956](https://github.com/nodejs/node/pull/59956)
* \[[`6277910a15`](https://github.com/nodejs/node/commit/6277910a15)] - **crypto**: 将根证书更新到 NSS 3.114（Node.js GitHub Bot）[#59571](https://github.com/nodejs/node/pull/59571)
* \[[`1788fb5f3d`](https://github.com/nodejs/node/commit/1788fb5f3d)] - **deps**: 将 undici 更新到 6.22.0（Matteo Collina）[#60112](https://github.com/nodejs/node/pull/60112)
* \[[`5d61b55f24`](https://github.com/nodejs/node/commit/5d61b55f24)] - **deps**: 将 uvwasi 更新到 0.0.23（Node.js GitHub Bot）[#59791](https://github.com/nodejs/node/pull/59791)
* \[[`9f1e5e4637`](https://github.com/nodejs/node/commit/9f1e5e4637)] - **deps**: 将 histogram 更新到 0.11.9（Node.js GitHub Bot）[#59689](https://github.com/nodejs/node/pull/59689)
* \[[`d0edb01d25`](https://github.com/nodejs/node/commit/d0edb01d25)] - **deps**: 将 googletest 更新到 eb2d85e（Node.js GitHub Bot）[#59335](https://github.com/nodejs/node/pull/59335)
* \[[`576242ff39`](https://github.com/nodejs/node/commit/576242ff39)] - **deps**: V8: 反向挑选 a0d0d4fc4f19（Ho Cheung）[#60716](https://github.com/nodejs/node/pull/60716)
* \[[`a07a277020`](https://github.com/nodejs/node/commit/a07a277020)] - **deps**: 将 corepack 更新到 0.34.1（Node.js GitHub Bot）[#60314](https://github.com/nodejs/node/pull/60314)
* \[[`fa5c5af8ce`](https://github.com/nodejs/node/commit/fa5c5af8ce)] - **deps**: 更新 openssl-3.0.17 的 archs 文件（Node.js GitHub Bot）[#59134](https://github.com/nodejs/node/pull/59134)
* \[[`556113e2fc`](https://github.com/nodejs/node/commit/556113e2fc)] - **deps**: 将 openssl 源码升级到 openssl-3.0.17（Node.js GitHub Bot）[#59134](https://github.com/nodejs/node/pull/59134)
* \[[`cd1536ca90`](https://github.com/nodejs/node/commit/cd1536ca90)] - **deps**: 将 corepack 更新到 0.34.0（Node.js GitHub Bot）[#59133](https://github.com/nodejs/node/pull/59133)
* \[[`acec79989e`](https://github.com/nodejs/node/commit/acec79989e)] - **deps**: V8: 反向挑选 6b1b9bca2a8（zhoumingtao）[#59283](https://github.com/nodejs/node/pull/59283)
* \[[`e65b930aa7`](https://github.com/nodejs/node/commit/e65b930aa7)] - **deps**: V8: 回移植 2e4c5cf9b112（Michaël Zasso）[#60654](https://github.com/nodejs/node/pull/60654)
* \[[`1b75a601f7`](https://github.com/nodejs/node/commit/1b75a601f7)] - **doc**: 修复 child\_process.md 中的拼写错误（Angelo Gazzola）[#60114](https://github.com/nodejs/node/pull/60114)
* \[[`a2bcb217c6`](https://github.com/nodejs/node/commit/a2bcb217c6)] - **doc**: 修复 microtask 顺序章节中的拼写错误（Tobias Nießen）[#59932](https://github.com/nodejs/node/pull/59932)
* \[[`2426d3f3ff`](https://github.com/nodejs/node/commit/2426d3f3ff)] - **doc**: 添加安全升级政策（Ulises Gascón）[#59806](https://github.com/nodejs/node/pull/59806)
* \[[`e7f6f04758`](https://github.com/nodejs/node/commit/e7f6f04758)] - **doc**: 添加 Miles Guicent 为 triager（Miles Guicent）[#59562](https://github.com/nodejs/node/pull/59562)
* \[[`e51ef3f48b`](https://github.com/nodejs/node/commit/e51ef3f48b)] - **doc**: 更新 install\_tools.bat 的可用磁盘空间说明（Stefan Stojanovic）[#59579](https://github.com/nodejs/node/pull/59579)
* \[[`8a504d900a`](https://github.com/nodejs/node/commit/8a504d900a)] - **doc**: 修复 `http` 页面中指向 Error 文档的缺失链接（Alexander Makarenko）[#59080](https://github.com/nodejs/node/pull/59080)
* \[[`8c5c8aa71d`](https://github.com/nodejs/node/commit/8c5c8aa71d)] - **doc**: 澄清实验性平台漏洞政策（Matteo Collina）[#59591](https://github.com/nodejs/node/pull/59591)
* \[[`109c4bff77`](https://github.com/nodejs/node/commit/109c4bff77)] - **doc**: 添加安全事件响应计划（Rafael Gonzaga）[#59470](https://github.com/nodejs/node/pull/59470)
* \[[`4f004efdf3`](https://github.com/nodejs/node/commit/4f004efdf3)] - **doc**: 添加 RafaelGSS 作为性能战略负责人（Rafael Gonzaga）[#59445](https://github.com/nodejs/node/pull/59445)
* \[[`caa2db4bac`](https://github.com/nodejs/node/commit/caa2db4bac)] - **doc**: 修复 test.md 中的链接（Vas Sudanagunta）[#58876](https://github.com/nodejs/node/pull/58876)
* \[[`082e50d4a2`](https://github.com/nodejs/node/commit/082e50d4a2)] - **doc**: 更新如何验证发布版本的说明（Antoine du Hamel）[#59113](https://github.com/nodejs/node/pull/59113)
* \[[`19a66365d9`](https://github.com/nodejs/node/commit/19a66365d9)] - **doc**: 澄清 DEP0194 范围（Antoine du Hamel）[#58504](https://github.com/nodejs/node/pull/58504)
* \[[`db68cec4cb`](https://github.com/nodejs/node/commit/db68cec4cb)] - **doc**: 废弃 HTTP/2 优先级信号传递（Matteo Collina）[#58313](https://github.com/nodejs/node/pull/58313)
* \[[`3b2368774f`](https://github.com/nodejs/node/commit/3b2368774f)] - **doc**: 让 Stability 标签在 Stability 索引中不再保持粘性（Livia Medeiros）[#58291](https://github.com/nodejs/node/pull/58291)
* \[[`960d05ad7d`](https://github.com/nodejs/node/commit/960d05ad7d)] - **doc**: 为 `--input-type` 章节添加历史记录条目（Antoine du Hamel）[#58175](https://github.com/nodejs/node/pull/58175)
* \[[`20616f1750`](https://github.com/nodejs/node/commit/20616f1750)] - **http2**: 不要在 ping 缓冲区长度不匹配时崩溃（René）[#60135](https://github.com/nodejs/node/pull/60135)
* \[[`9eb94232c8`](https://github.com/nodejs/node/commit/9eb94232c8)] - **lib**: 处理 Windows 设备上的上标变体（Rafael Gonzaga）[#59261](https://github.com/nodejs/node/pull/59261)
* \[[`dc58b4e35f`](https://github.com/nodejs/node/commit/dc58b4e35f)] - **meta**: 将 Michael 转为 emeritus（Michael Dawson）[#60070](https://github.com/nodejs/node/pull/60070)
* \[[`d943cfb260`](https://github.com/nodejs/node/commit/d943cfb260)] - **meta**: 将 actions/setup-node 从 4.4.0 升级到 5.0.0（dependabot\[bot]）[#60093](https://github.com/nodejs/node/pull/60093)
* \[[`de9a3aaf0f`](https://github.com/nodejs/node/commit/de9a3aaf0f)] - **meta**: 将 step-security/harden-runner 从 2.12.2 升级到 2.13.1（dependabot\[bot]）[#60094](https://github.com/nodejs/node/pull/60094)
* \[[`b4b5d4a4d7`](https://github.com/nodejs/node/commit/b4b5d4a4d7)] - **meta**: 将 ossf/scorecard-action 从 2.4.2 升级到 2.4.3（dependabot\[bot]）[#60096](https://github.com/nodejs/node/pull/60096)
* \[[`e5b4eee901`](https://github.com/nodejs/node/commit/e5b4eee901)] - **meta**: 将 actions/setup-python 从 5.6.0 升级到 6.0.0（dependabot\[bot]）[#60090](https://github.com/nodejs/node/pull/60090)
* \[[`7cb032c2c1`](https://github.com/nodejs/node/commit/7cb032c2c1)] - **meta**: 将 devcontainer 更新到最新 schema（Aviv Keller）[#54347](https://github.com/nodejs/node/pull/54347)
* \[[`bb108191aa`](https://github.com/nodejs/node/commit/bb108191aa)] - **meta**: 在发布后调用 `create-release-post.yml`（Aviv Keller）[#60366](https://github.com/nodejs/node/pull/60366)
* \[[`2a11d50526`](https://github.com/nodejs/node/commit/2a11d50526)] - **module**: 在歧义上下文中正确检测顶层 await（Shima Ryuhei）[#58646](https://github.com/nodejs/node/pull/58646)
* \[[`144233b71a`](https://github.com/nodejs/node/commit/144233b71a)] - **process**: 修复 unhandled-rejections=strict 下错误的 asyncContext（Shima Ryuhei）[#60103](https://github.com/nodejs/node/pull/60103)
* \[[`409cb773a4`](https://github.com/nodejs/node/commit/409cb773a4)] - **repl**: 修复向 REPL 粘贴大字符串时的 CPU 开销（Ruben Bridgewater）[#59857](https://github.com/nodejs/node/pull/59857)
* \[[`d1c9d80cac`](https://github.com/nodejs/node/commit/d1c9d80cac)] - **repl**: 在包装输入前添加 isValidParentheses 检查（Xuguang Mei）[#59607](https://github.com/nodejs/node/pull/59607)
* \[[`b8d145db2c`](https://github.com/nodejs/node/commit/b8d145db2c)] - **src**: 修复 CHECK\_NOT\_NULL/dereference 的顺序（Tobias Nießen）[#59487](https://github.com/nodejs/node/pull/59487)
* \[[`2c8a73f95f`](https://github.com/nodejs/node/commit/2c8a73f95f)] - **src**: 移除 node\_constants.cc 中 `O_EXCL` 的重复赋值（Daniel Osvaldo R）[#59049](https://github.com/nodejs/node/pull/59049)
* \[[`b1da374503`](https://github.com/nodejs/node/commit/b1da374503)] - **test**: 修复 test-benchmark-readline.js 的拼写错误（Deokjin Kim）[#59993](https://github.com/nodejs/node/pull/59993)
* \[[`4b4e38f497`](https://github.com/nodejs/node/commit/4b4e38f497)] - **test**: 将 sea 测试标记为在 macOS x64 上不稳定（Richard Lau）[#60068](https://github.com/nodejs/node/pull/60068)
* \[[`cbf4fc34c3`](https://github.com/nodejs/node/commit/cbf4fc34c3)] - **test**: 在 Linux ppc64le 上跳过更多 sea 测试（Richard Lau）[#59755](https://github.com/nodejs/node/pull/59755)
* \[[`9543facad7`](https://github.com/nodejs/node/commit/9543facad7)] - **test**: 再次将 test-inspector-network-fetch 标记为不稳定（Joyee Cheung）[#59640](https://github.com/nodejs/node/pull/59640)
* \[[`4f858d22ac`](https://github.com/nodejs/node/commit/4f858d22ac)] - **test**: 跳过在 Windows 上持续失败的 test-fs-cp\* 测试（Joyee Cheung）[#59637](https://github.com/nodejs/node/pull/59637)
* \[[`3ec534dbe8`](https://github.com/nodejs/node/commit/3ec534dbe8)] - **test**: 在 Linux ppc64le 上跳过 sea 测试（Richard Lau）[#59563](https://github.com/nodejs/node/pull/59563)
* \[[`a7a109f926`](https://github.com/nodejs/node/commit/a7a109f926)] - **test**: 修复拼写错误（Lee Jiho）[#59330](https://github.com/nodejs/node/pull/59330)
* \[[`fd9d43da46`](https://github.com/nodejs/node/commit/fd9d43da46)] - **test**: 跳过 macOS 15.7+ 上失败的测试（Antoine du Hamel）[#60419](https://github.com/nodejs/node/pull/60419)
* \[[`bc3ffbd713`](https://github.com/nodejs/node/commit/bc3ffbd713)] - **test_runner**: 修复 junit 中的 isSkipped 检查（Sungwon）[#59414](https://github.com/nodejs/node/pull/59414)
* \[[`0cace96472`](https://github.com/nodejs/node/commit/0cace96472)] - **test_runner**: 更正“already mocked”错误的标点位置（Jacob Smith）[#58840](https://github.com/nodejs/node/pull/58840)
* \[[`76001f9480`](https://github.com/nodejs/node/commit/76001f9480)] - **tools**: 移除 `build-tarball.yml` 中未使用的 actions（Antoine du Hamel）[#59787](https://github.com/nodejs/node/pull/59787)
* \[[`69904844bb`](https://github.com/nodejs/node/commit/69904844bb)] - **tools**: 不再尝试压缩 tgz 归档文件（Antoine du Hamel）[#59785](https://github.com/nodejs/node/pull/59785)
* \[[`a6e7adb173`](https://github.com/nodejs/node/commit/a6e7adb173)] - **tools**: 修复 try\_check\_compiler 的返回值（theanarkh）[#59434](https://github.com/nodejs/node/pull/59434)
* \[[`6443ad2da5`](https://github.com/nodejs/node/commit/6443ad2da5)] - **tools**: 放弃已弃用的 `macos-13` 运行器（Richard Lau）[#60679](https://github.com/nodejs/node/pull/60679)
* \[[`45ec702ef7`](https://github.com/nodejs/node/commit/45ec702ef7)] - **tools**: 修复 clang 下的 `tools/make-v8.sh`（Richard Lau）[#59893](https://github.com/nodejs/node/pull/59893)
* \[[`393ff7226e`](https://github.com/nodejs/node/commit/393ff7226e)] - **util**: 修复负小数的 numericSeparator（sangwook）[#59379](https://github.com/nodejs/node/pull/59379)
* \[[`9e8beff0f4`](https://github.com/nodejs/node/commit/9e8beff0f4)] - **util**: 修复使用 inspect 时对带命名空间的 node\_modules 的高亮显示错误（Ruben Bridgewater）[#59446](https://github.com/nodejs/node/pull/59446)

<a id="20.19.5"></a>

## 2025-09-03，版本 20.19.5 'Iron'（LTS），@marco-ippolito

### 显著变更

* \[[`f5b293ad48`](https://github.com/nodejs/node/commit/f5b293ad48)] - **doc**: 将 JonasBa 添加为协作者（Jonas Badalic） [#58355](https://github.com/nodejs/node/pull/58355)
* \[[`4e6ae787c6`](https://github.com/nodejs/node/commit/4e6ae787c6)] - **doc**: 将 puskin 添加为协作者（Giovanni Bucci） [#58308](https://github.com/nodejs/node/pull/58308)
* \[[`d06db658fc`](https://github.com/nodejs/node/commit/d06db658fc)] - **doc**: 将 Filip Skokan 添加到 TSC（Rafael Gonzaga） [#58499](https://github.com/nodejs/node/pull/58499)
* \[[`3c6206cac9`](https://github.com/nodejs/node/commit/3c6206cac9)] - **doc**: 将 @geeksilva97 添加为协作者（Edy Silva） [#57241](https://github.com/nodejs/node/pull/57241)

### 提交

* \[[`ea20403467`](https://github.com/nodejs/node/commit/ea20403467)] - **build**: 修复 uvwasi 包名（Antoine du Hamel） [#58270](https://github.com/nodejs/node/pull/58270)
* \[[`c647aa4b30`](https://github.com/nodejs/node/commit/c647aa4b30)] - **build**: 修复指针压缩构建（Joyee Cheung） [#58171](https://github.com/nodejs/node/pull/58171)
* \[[`d2c5e609ae`](https://github.com/nodejs/node/commit/d2c5e609ae)] - **build**: 在非 64 位平台上禁用 v8\_enable\_pointer\_compression\_shared\_cage（Shelley Vohr） [#58867](https://github.com/nodejs/node/pull/58867)
* \[[`84d5c4d244`](https://github.com/nodejs/node/commit/84d5c4d244)] - **build**: 在多个位置查找 libnode.so（Jan Staněk） [#58213](https://github.com/nodejs/node/pull/58213)
* \[[`068c439552`](https://github.com/nodejs/node/commit/068c439552)] - **crypto**: 修复 OpenSSL 3.4 引入的 SHAKE128/256 破坏性变更（Filip Skokan） [#58942](https://github.com/nodejs/node/pull/58942)
* \[[`edff105c34`](https://github.com/nodejs/node/commit/edff105c34)] - **debugger**: 修复调试器 repl 中普通对象 exec 的行为（Dario Piotrowicz） [#57498](https://github.com/nodejs/node/pull/57498)
* \[[`0473e35b7f`](https://github.com/nodejs/node/commit/0473e35b7f)] - **deps**: 将 zlib 更新到 1.3.1-470d3a2（Node.js GitHub Bot） [#58628](https://github.com/nodejs/node/pull/58628)
* \[[`1218dbbea5`](https://github.com/nodejs/node/commit/1218dbbea5)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-780819f（Node.js GitHub Bot） [#57768](https://github.com/nodejs/node/pull/57768)
* \[[`0e3cd9ec00`](https://github.com/nodejs/node/commit/0e3cd9ec00)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-788cb3c（Node.js GitHub Bot） [#56655](https://github.com/nodejs/node/pull/56655)
* \[[`a194dd9bd4`](https://github.com/nodejs/node/commit/a194dd9bd4)] - **deps**: 更新 openssl-3.0.16 的 archs 文件（Node.js GitHub Bot） [#57335](https://github.com/nodejs/node/pull/57335)
* \[[`cc9b79ca70`](https://github.com/nodejs/node/commit/cc9b79ca70)] - **deps**: 将 openssl 源升级到 quictls/openssl-3.0.16（Node.js GitHub Bot） [#57335](https://github.com/nodejs/node/pull/57335)
* \[[`82c46d5358`](https://github.com/nodejs/node/commit/82c46d5358)] - **deps**: 将 cjs-module-lexer 更新到 2.1.0（Node.js GitHub Bot） [#57180](https://github.com/nodejs/node/pull/57180)
* \[[`43e3f9b26b`](https://github.com/nodejs/node/commit/43e3f9b26b)] - **deps**: 将 cjs-module-lexer 更新到 2.0.0（Michael Dawson） [#56855](https://github.com/nodejs/node/pull/56855)
* \[[`91282ff16b`](https://github.com/nodejs/node/commit/91282ff16b)] - **deps**: 将 corepack 更新到 0.33.0（Node.js GitHub Bot） [#58566](https://github.com/nodejs/node/pull/58566)
* \[[`b76bca6f38`](https://github.com/nodejs/node/commit/b76bca6f38)] - **deps**: 将 acorn 更新到 8.15.0（Node.js GitHub Bot） [#58711](https://github.com/nodejs/node/pull/58711)
* \[[`ae11481011`](https://github.com/nodejs/node/commit/ae11481011)] - **deps**: 将 acorn 更新到 8.14.1（Node.js GitHub Bot） [#57382](https://github.com/nodejs/node/pull/57382)
* \[[`142d701201`](https://github.com/nodejs/node/commit/142d701201)] - **deps**: 将 minimatch 更新到 10.0.3（Node.js GitHub Bot） [#58712](https://github.com/nodejs/node/pull/58712)
* \[[`fee082d684`](https://github.com/nodejs/node/commit/fee082d684)] - **deps**: 将 llhttp 更新到 9.3.0（Fedor Indutny） [#58144](https://github.com/nodejs/node/pull/58144)
* \[[`c06f6f3f05`](https://github.com/nodejs/node/commit/c06f6f3f05)] - **dns**: 删除使用公共变量的冗余代码（Deokjin Kim） [#57386](https://github.com/nodejs/node/pull/57386)
* \[[`cded8e7e77`](https://github.com/nodejs/node/commit/cded8e7e77)] - **dns**: 修复解析内存泄漏（theanarkh） [#58973](https://github.com/nodejs/node/pull/58973)
* \[[`182ae67233`](https://github.com/nodejs/node/commit/182ae67233)] - **dns**: 修复 dns 查询缓存实现（Ethan Arrowood） [#58404](https://github.com/nodejs/node/pull/58404)
* \[[`621b66a297`](https://github.com/nodejs/node/commit/621b66a297)] - **doc**: 为协作者提名添加审查指南（Antoine du Hamel） [#57449](https://github.com/nodejs/node/pull/57449)
* \[[`b1009b5b72`](https://github.com/nodejs/node/commit/b1009b5b72)] - **doc**: 明确将任意代码执行提及为漏洞（Rafael Gonzaga） [#57426](https://github.com/nodejs/node/pull/57426)
* \[[`f5b293ad48`](https://github.com/nodejs/node/commit/f5b293ad48)] - **doc**: 将 JonasBa 添加为协作者（Jonas Badalic） [#58355](https://github.com/nodejs/node/pull/58355)
* \[[`4e6ae787c6`](https://github.com/nodejs/node/commit/4e6ae787c6)] - **doc**: 将 puskin 添加为协作者（Giovanni Bucci） [#58308](https://github.com/nodejs/node/pull/58308)
* \[[`530473f479`](https://github.com/nodejs/node/commit/530473f479)] - **doc**: 将 ovflowd 重新加入核心协作者（Claudio W.） [#58911](https://github.com/nodejs/node/pull/58911)
* \[[`38e8bbc131`](https://github.com/nodejs/node/commit/38e8bbc131)] - **doc**: 添加关于项目如何管理社交媒体的信息（Michael Dawson） [#57318](https://github.com/nodejs/node/pull/57318)
* \[[`d06bb4dcc2`](https://github.com/nodejs/node/commit/d06bb4dcc2)] - **doc**: 针对每个安全补丁请求 ping nodejs/tsc（Rafael Gonzaga） [#57309](https://github.com/nodejs/node/pull/57309)
* \[[`d06db658fc`](https://github.com/nodejs/node/commit/d06db658fc)] - **doc**: 将 Filip Skokan 添加到 TSC（Rafael Gonzaga） [#58499](https://github.com/nodejs/node/pull/58499)
* \[[`8c3bc156ed`](https://github.com/nodejs/node/commit/8c3bc156ed)] - **doc**: 澄清 `path.isAbsolute` 不是路径穿越缓解措施（Eric Fortis） [#57073](https://github.com/nodejs/node/pull/57073)
* \[[`e688410bda`](https://github.com/nodejs/node/commit/e688410bda)] - **doc**: 修复 DEP0174 描述的渲染（David Sanders） [#56835](https://github.com/nodejs/node/pull/56835)
* \[[`e6a0c6a0fa`](https://github.com/nodejs/node/commit/e6a0c6a0fa)] - **doc**: 添加缺失的 assert 返回类型（Colin Ihrig） [#57219](https://github.com/nodejs/node/pull/57219)
* \[[`026b3cab6a`](https://github.com/nodejs/node/commit/026b3cab6a)] - **doc**: 将 1ilsang 添加到 triage 团队（1ilsang） [#57183](https://github.com/nodejs/node/pull/57183)
* \[[`3c6206cac9`](https://github.com/nodejs/node/commit/3c6206cac9)] - **doc**: 将 @geeksilva97 添加为协作者（Edy Silva） [#57241](https://github.com/nodejs/node/pull/57241)
* \[[`ef3a4675c7`](https://github.com/nodejs/node/commit/ef3a4675c7)] - **doc**: 修复 pull-requests.md 中的 web.libera.chat 链接（Samuel Bronson） [#57076](https://github.com/nodejs/node/pull/57076)
* \[[`1db42b76f7`](https://github.com/nodejs/node/commit/1db42b76f7)] - **doc**: 从 performance hooks 示例中移除 buffered 标志（Pavel Romanov） [#52607](https://github.com/nodejs/node/pull/52607)
* \[[`b73a1356ce`](https://github.com/nodejs/node/commit/b73a1356ce)] - **doc**: 添加 `module namespace object` 链接（Dario Piotrowicz） [#57093](https://github.com/nodejs/node/pull/57093)
* \[[`09368db20f`](https://github.com/nodejs/node/commit/09368db20f)] - **doc**: 消除伪代码语句歧义（Dario Piotrowicz） [#57092](https://github.com/nodejs/node/pull/57092)
* \[[`2c3dc569a1`](https://github.com/nodejs/node/commit/2c3dc569a1)] - **doc**: 修正用于指代模块的冠词用法（Dario Piotrowicz） [#57090](https://github.com/nodejs/node/pull/57090)
* \[[`cd8259cb4e`](https://github.com/nodejs/node/commit/cd8259cb4e)] - **doc**: `modules.md`：修复 `distance` 定义（Alexander “weej” Jones） [#57046](https://github.com/nodejs/node/pull/57046)
* \[[`7b0ea9ab2d`](https://github.com/nodejs/node/commit/7b0ea9ab2d)] - **doc**: 修复动词形式错误（Dario Piotrowicz） [#57091](https://github.com/nodejs/node/pull/57091)
* \[[`14fcfc242b`](https://github.com/nodejs/node/commit/14fcfc242b)] - **doc**: 在测试文档中添加关于 `require('../common')` 的说明（Aditi） [#56953](https://github.com/nodejs/node/pull/56953)
* \[[`bc7d18b6ea`](https://github.com/nodejs/node/commit/bc7d18b6ea)] - **doc**: 建议在新文件中编写测试并包含注释（Joyee Cheung） [#57028](https://github.com/nodejs/node/pull/57028)
* \[[`acd4d7f269`](https://github.com/nodejs/node/commit/acd4d7f269)] - **doc**: 改进参数校验文档（Aditi） [#56954](https://github.com/nodejs/node/pull/56954)
* \[[`4cd6b3ca73`](https://github.com/nodejs/node/commit/4cd6b3ca73)] - **doc**: buffer：修复 `Buffer.copyBytesFrom(` `offset` 选项中的拼写错误（tpoisseau） [#57015](https://github.com/nodejs/node/pull/57015)
* \[[`01220607f2`](https://github.com/nodejs/node/commit/01220607f2)] - **doc**: 更新清理流程以信任漏洞数据库自动化（Rafael Gonzaga） [#57004](https://github.com/nodejs/node/pull/57004)
* \[[`77a0505a32`](https://github.com/nodejs/node/commit/77a0505a32)] - **doc**: 更新发布后安全修复流程（Rafael Gonzaga） [#56907](https://github.com/nodejs/node/pull/56907)
* \[[`77dbcfce5f`](https://github.com/nodejs/node/commit/77dbcfce5f)] - **doc**: 添加关于在权限模型下使用 npx 的章节（Rafael Gonzaga） [#56539](https://github.com/nodejs/node/pull/56539)
* \[[`73e51407b7`](https://github.com/nodejs/node/commit/73e51407b7)] - **doc**: 将 RedYetiDev 从 triagers 团队移除（Aviv Keller） [#55947](https://github.com/nodejs/node/pull/55947)
* \[[`9a36cbb792`](https://github.com/nodejs/node/commit/9a36cbb792)] - **doc**: 修复 `--allow-fs` 中关于相对路径的提及（Rafael Gonzaga） [#55791](https://github.com/nodejs/node/pull/55791)
* \[[`04d9c5baeb`](https://github.com/nodejs/node/commit/04d9c5baeb)] - **doc**: 为链接添加滚动边距（Roman Reiss） [#58982](https://github.com/nodejs/node/pull/58982)
* \[[`959a67f6ff`](https://github.com/nodejs/node/commit/959a67f6ff)] - **doc**: 使 Stability 标签在 Stability 索引中不再固定（Livia Medeiros） [#58291](https://github.com/nodejs/node/pull/58291)
* \[[`8757a5532f`](https://github.com/nodejs/node/commit/8757a5532f)] - **doc**: 更新 aduh95 的发布密钥（Antoine du Hamel） [#58877](https://github.com/nodejs/node/pull/58877)
* \[[`6fa0626327`](https://github.com/nodejs/node/commit/6fa0626327)] - **doc,src,test**: 修复拼写错误（Noritaka Kobayashi） [#58477](https://github.com/nodejs/node/pull/58477)
* \[[`9991788e4a`](https://github.com/nodejs/node/commit/9991788e4a)] - **http**: 将 content-length 强制转换为数字（Marco Ippolito） [#57458](https://github.com/nodejs/node/pull/57458)
* \[[`ff5cf8a428`](https://github.com/nodejs/node/commit/ff5cf8a428)] - **http2**: 修复对 `frame->hd.type` 的检查（hanguanqiang） [#57644](https://github.com/nodejs/node/pull/57644)
* \[[`2f333b6c51`](https://github.com/nodejs/node/commit/2f333b6c51)] - **lib**: 优化内置帧上的 `prepareStackTrace`（Chengzhong Wu） [#56299](https://github.com/nodejs/node/pull/56299)
* \[[`cdf985071f`](https://github.com/nodejs/node/commit/cdf985071f)] - **lib**: 抑制 source map 查找异常（Chengzhong Wu） [#56299](https://github.com/nodejs/node/pull/56299)
* \[[`faa08b14ed`](https://github.com/nodejs/node/commit/faa08b14ed)] - **lib**: 修复 assertEncoding 中错误的参数顺序（James M Snell） [#57177](https://github.com/nodejs/node/pull/57177)
* \[[`a683cd1232`](https://github.com/nodejs/node/commit/a683cd1232)] - **meta**: 将 IlyasShabi 添加为协作者（Ilyas Shabi） [#58916](https://github.com/nodejs/node/pull/58916)
* \[[`b145bb28aa`](https://github.com/nodejs/node/commit/b145bb28aa)] - **meta**: 将 codecov/codecov-action 从 5.4.2 升级到 5.4.3（dependabot\[bot]） [#58551](https://github.com/nodejs/node/pull/58551)
* \[[`2c59789001`](https://github.com/nodejs/node/commit/2c59789001)] - **meta**: 将 ossf/scorecard-action 从 2.4.1 升级到 2.4.2（dependabot\[bot]） [#58550](https://github.com/nodejs/node/pull/58550)
* \[[`4095337e96`](https://github.com/nodejs/node/commit/4095337e96)] - **meta**: 将 rtCamp/action-slack-notify 从 2.3.2 升级到 2.3.3（dependabot\[bot]） [#58108](https://github.com/nodejs/node/pull/58108)
* \[[`631fed8e39`](https://github.com/nodejs/node/commit/631fed8e39)] - **meta**: 将一名或多名协作者移至 emeritus（Node.js GitHub Bot） [#58456](https://github.com/nodejs/node/pull/58456)
* \[[`7d2f7180b6`](https://github.com/nodejs/node/commit/7d2f7180b6)] - **meta**: 将 codecov/codecov-action 从 5.4.0 升级到 5.4.2（dependabot\[bot]） [#58110](https://github.com/nodejs/node/pull/58110)
* \[[`1558551ea5`](https://github.com/nodejs/node/commit/1558551ea5)] - **meta**: 将 actions/download-artifact 从 4.2.1 升级到 4.3.0（dependabot\[bot]） [#58106](https://github.com/nodejs/node/pull/58106)
* \[[`e1f12fe737`](https://github.com/nodejs/node/commit/e1f12fe737)] - **meta**: 在 Linux CI 中忽略 mailmap 变更（Jonas Badalic） [#58356](https://github.com/nodejs/node/pull/58356)
* \[[`1b78eb1313`](https://github.com/nodejs/node/commit/1b78eb1313)] - **meta**: 将 actions/setup-node 从 4.3.0 升级到 4.4.0（dependabot\[bot]） [#58111](https://github.com/nodejs/node/pull/58111)
* \[[`2b8449c39a`](https://github.com/nodejs/node/commit/2b8449c39a)] - **meta**: 将 actions/setup-python 从 5.5.0 升级到 5.6.0（dependabot\[bot]） [#58107](https://github.com/nodejs/node/pull/58107)
* \[[`833b70bbc5`](https://github.com/nodejs/node/commit/833b70bbc5)] - **meta**: 在事先授权下允许对实时系统进行渗透测试（Matteo Collina） [#57966](https://github.com/nodejs/node/pull/57966)
* \[[`c6a88561f5`](https://github.com/nodejs/node/commit/c6a88561f5)] - **meta**: 将 actions/setup-python 从 5.4.0 升级到 5.5.0（dependabot\[bot]） [#57718](https://github.com/nodejs/node/pull/57718)
* \[[`9046ef4fb3`](https://github.com/nodejs/node/commit/9046ef4fb3)] - **meta**: 将 peter-evans/create-pull-request 从 7.0.7 升级到 7.0.8（dependabot\[bot]） [#57717](https://github.com/nodejs/node/pull/57717)
* \[[`46388a4e2a`](https://github.com/nodejs/node/commit/46388a4e2a)] - **meta**: 将 actions/cache 从 4.2.2 升级到 4.2.3（dependabot\[bot]） [#57715](https://github.com/nodejs/node/pull/57715)
* \[[`d3970685bd`](https://github.com/nodejs/node/commit/d3970685bd)] - **meta**: 将 actions/setup-node 从 4.2.0 升级到 4.3.0（dependabot\[bot]） [#57714](https://github.com/nodejs/node/pull/57714)
* \[[`47004ef37f`](https://github.com/nodejs/node/commit/47004ef37f)] - **meta**: 将 actions/upload-artifact 从 4.6.1 升级到 4.6.2（dependabot\[bot]） [#57713](https://github.com/nodejs/node/pull/57713)
* \[[`4abe83ec03`](https://github.com/nodejs/node/commit/4abe83ec03)] - **meta**: 为提名流程添加一些说明（James M Snell） [#57503](https://github.com/nodejs/node/pull/57503)
* \[[`45e9b88363`](https://github.com/nodejs/node/commit/45e9b88363)] - **meta**: 移除协作者自荐提名（Rich Trott） [#57537](https://github.com/nodejs/node/pull/57537)
* \[[`d10949b7d8`](https://github.com/nodejs/node/commit/d10949b7d8)] - **meta**: 编辑协作者提名流程（Antoine du Hamel） [#57483](https://github.com/nodejs/node/pull/57483)
* \[[`704562fb7a`](https://github.com/nodejs/node/commit/704562fb7a)] - **meta**: 将 ovflowd 移至 emeritus（Claudio W.） [#57443](https://github.com/nodejs/node/pull/57443)
* \[[`3f981b8537`](https://github.com/nodejs/node/commit/3f981b8537)] - **meta**: 将 codecov/codecov-action 从 5.3.1 升级到 5.4.0（dependabot\[bot]） [#57257](https://github.com/nodejs/node/pull/57257)
* \[[`7e1ff7b332`](https://github.com/nodejs/node/commit/7e1ff7b332)] - **meta**: 将 ossf/scorecard-action 从 2.4.0 升级到 2.4.1（dependabot\[bot]） [#57253](https://github.com/nodejs/node/pull/57253)
* \[[`8d4ec412b9`](https://github.com/nodejs/node/commit/8d4ec412b9)] - **meta**: 将 RaisinTen 恢复为协作者、triagers 以及 SEA champion（Darshan Sen） [#57292](https://github.com/nodejs/node/pull/57292)
* \[[`cc2abb5d17`](https://github.com/nodejs/node/commit/cc2abb5d17)] - **meta**: 将 peter-evans/create-pull-request 从 7.0.6 升级到 7.0.7（dependabot\[bot]） [#57259](https://github.com/nodejs/node/pull/57259)
* \[[`4fad2b8758`](https://github.com/nodejs/node/commit/4fad2b8758)] - **meta**: 将 actions/cache 从 4.2.0 升级到 4.2.2（dependabot\[bot]） [#57256](https://github.com/nodejs/node/pull/57256)
* \[[`5f5bb8b986`](https://github.com/nodejs/node/commit/5f5bb8b986)] - **meta**: 将 actions/upload-artifact 从 4.6.0 升级到 4.6.1（dependabot\[bot]） [#57255](https://github.com/nodejs/node/pull/57255)
* \[[`e949359a56`](https://github.com/nodejs/node/commit/e949359a56)] - **meta**: 将 `actions/setup-python` 从 5.3.0 升级到 5.4.0（dependabot\[bot]） [#56867](https://github.com/nodejs/node/pull/56867)
* \[[`d3c5ad7510`](https://github.com/nodejs/node/commit/d3c5ad7510)] - **meta**: 将 `peter-evans/create-pull-request` 从 7.0.5 升级到 7.0.6（dependabot\[bot]） [#56866](https://github.com/nodejs/node/pull/56866)
* \[[`56decfe2d1`](https://github.com/nodejs/node/commit/56decfe2d1)] - **meta**: 将 `codecov/codecov-action` 从 5.0.7 升级到 5.3.1（dependabot\[bot]） [#56864](https://github.com/nodejs/node/pull/56864)
* \[[`52e518444d`](https://github.com/nodejs/node/commit/52e518444d)] - **meta**: 将 `actions/cache` 从 4.1.2 升级到 4.2.0（dependabot\[bot]） [#56862](https://github.com/nodejs/node/pull/56862)
* \[[`9cac93d9c3`](https://github.com/nodejs/node/commit/9cac93d9c3)] - **meta**: 将 `actions/stale` 从 9.0.0 升级到 9.1.0（dependabot\[bot]） [#56860](https://github.com/nodejs/node/pull/56860)
* \[[`ecf4252f7c`](https://github.com/nodejs/node/commit/ecf4252f7c)] - **meta**: 更新 jkrems 的姓氏（Jan Martin） [#57006](https://github.com/nodejs/node/pull/57006)
* \[[`e8beaaaedf`](https://github.com/nodejs/node/commit/e8beaaaedf)] - **meta**: 将 `actions/upload-artifact` 从 4.4.3 升级到 4.6.0（dependabot\[bot]） [#56861](https://github.com/nodejs/node/pull/56861)
* \[[`5462c257f8`](https://github.com/nodejs/node/commit/5462c257f8)] - **meta**: 将 `actions/setup-node` 从 4.1.0 升级到 4.2.0（dependabot\[bot]） [#56868](https://github.com/nodejs/node/pull/56868)
* \[[`89c37891a0`](https://github.com/nodejs/node/commit/89c37891a0)] - **meta**: 将一名或多名协作者移至 emeritus（Node.js GitHub Bot） [#56889](https://github.com/nodejs/node/pull/56889)
* \[[`2a0175c291`](https://github.com/nodejs/node/commit/2a0175c291)] - **meta**: 将 @nodejs/url 添加为代码所有者（Chengzhong Wu） [#56783](https://github.com/nodejs/node/pull/56783)
* \[[`c12aae1e78`](https://github.com/nodejs/node/commit/c12aae1e78)] - **meta**: 将 github/codeql-action 从 3.28.18 升级到 3.29.2（dependabot\[bot]） [#58922](https://github.com/nodejs/node/pull/58922)
* \[[`4ef09990f1`](https://github.com/nodejs/node/commit/4ef09990f1)] - **meta**: 将 github/codeql-action 从 3.28.16 升级到 3.28.18（dependabot\[bot]） [#58552](https://github.com/nodejs/node/pull/58552)
* \[[`889654eb2c`](https://github.com/nodejs/node/commit/889654eb2c)] - **meta**: 将 github/codeql-action 从 3.28.11 升级到 3.28.16（dependabot\[bot]） [#58112](https://github.com/nodejs/node/pull/58112)
* \[[`091e5c1bb9`](https://github.com/nodejs/node/commit/091e5c1bb9)] - **meta**: 将 github/codeql-action 从 3.28.10 升级到 3.28.13（dependabot\[bot]） [#57716](https://github.com/nodejs/node/pull/57716)
* \[[`01415153de`](https://github.com/nodejs/node/commit/01415153de)] - **meta**: 将 github/codeql-action 从 3.28.8 升级到 3.28.10（dependabot\[bot]） [#57254](https://github.com/nodejs/node/pull/57254)
* \[[`72ea8aac34`](https://github.com/nodejs/node/commit/72ea8aac34)] - **meta**: 将 `github/codeql-action` 从 3.27.5 升级到 3.28.8（dependabot\[bot]） [#56859](https://github.com/nodejs/node/pull/56859)
* \[[`99a271e588`](https://github.com/nodejs/node/commit/99a271e588)] - **meta**: 将 step-security/harden-runner 从 2.12.0 升级到 2.12.2（dependabot\[bot]） [#58923](https://github.com/nodejs/node/pull/58923)
* \[[`b4c4c02490`](https://github.com/nodejs/node/commit/b4c4c02490)] - **meta**: 将 step-security/harden-runner 从 2.11.0 升级到 2.12.0（dependabot\[bot]） [#58109](https://github.com/nodejs/node/pull/58109)
* \[[`5361bb9157`](https://github.com/nodejs/node/commit/5361bb9157)] - **meta**: 将 step-security/harden-runner 从 2.10.4 升级到 2.11.0（dependabot\[bot]） [#57258](https://github.com/nodejs/node/pull/57258)
* \[[`28e33acf30`](https://github.com/nodejs/node/commit/28e33acf30)] - **meta**: 将 `step-security/harden-runner` 从 2.10.2 升级到 2.10.4（dependabot\[bot]） [#56863](https://github.com/nodejs/node/pull/56863)
* \[[`fad773cede`](https://github.com/nodejs/node/commit/fad773cede)] - **module**: 在重新运行出错的模块任务时抛出错误（Joyee Cheung） [#58957](https://github.com/nodejs/node/pull/58957)
* \[[`2531185423`](https://github.com/nodejs/node/commit/2531185423)] - **module**: 允许 ESM 加载器中的 CJS 处理里 require() 出现循环（Joyee Cheung） [#58598](https://github.com/nodejs/node/pull/58598)
* \[[`ed43b69689`](https://github.com/nodejs/node/commit/ed43b69689)] - **module**: 澄清 ModuleJobSync 上 cjs 类全局错误（Carlos Espa） [#56491](https://github.com/nodejs/node/pull/56491)
* \[[`6e02db1b12`](https://github.com/nodejs/node/commit/6e02db1b12)] - **module**: 在 require(esm) 中处理已实例化的异步模块任务（Joyee Cheung） [#58067](https://github.com/nodejs/node/pull/58067)
* \[[`badba50d30`](https://github.com/nodejs/node/commit/badba50d30)] - **module**: 修复 require(esm) 循环错误消息中的格式错误（haykam821） [#57453](https://github.com/nodejs/node/pull/57453)
* \[[`939ecf8906`](https://github.com/nodejs/node/commit/939ecf8906)] - **module**: 在 require(esm) 中处理已缓存并已链接的异步任务（Joyee Cheung） [#57187](https://github.com/nodejs/node/pull/57187)
* \[[`ba7f8a0353`](https://github.com/nodejs/node/commit/ba7f8a0353)] - **module**: 改进 require(esm) 中由异步性导致的错误消息（Joyee Cheung） [#57126](https://github.com/nodejs/node/pull/57126)
* \[[`c1e7fa2586`](https://github.com/nodejs/node/commit/c1e7fa2586)] - **module**: 在 CommonJS 中的 .js 处理程序中处理 .mjs（Joyee Cheung） [#55590](https://github.com/nodejs/node/pull/55590)
* \[[`41f3dfd21b`](https://github.com/nodejs/node/commit/41f3dfd21b)] - **module**: 修复 require.resolve() 在非字符串路径上的崩溃（Aditi） [#56942](https://github.com/nodejs/node/pull/56942)
* \[[`043dcdd628`](https://github.com/nodejs/node/commit/043dcdd628)] - **os**: 修复 GetInterfaceAddresses 内存泄漏（theanarkh） [#58940](https://github.com/nodejs/node/pull/58940)
* \[[`9b74e9bfd9`](https://github.com/nodejs/node/commit/9b74e9bfd9)] - **permission**: 在模块加载期间忽略 internalModuleStat（Rafael Gonzaga） [#55797](https://github.com/nodejs/node/pull/55797)
* \[[`611a147b45`](https://github.com/nodejs/node/commit/611a147b45)] - **readline**: 修复中止时未解决的 promise（Daniel Venable） [#54030](https://github.com/nodejs/node/pull/54030)
* \[[`f891ae3421`](https://github.com/nodejs/node/commit/f891ae3421)] - **repl**: 在标签补全中避免使用已弃用的 `require.extensions`（baki gul） [#58653](https://github.com/nodejs/node/pull/58653)
* \[[`7ba44290bf`](https://github.com/nodejs/node/commit/7ba44290bf)] - **repl**: 修复标签补全在计算机字符串属性下不工作的问题（Dario Piotrowicz） [#58709](https://github.com/nodejs/node/pull/58709)
* \[[`eb842048b2`](https://github.com/nodejs/node/commit/eb842048b2)] - **src**: 不要为 THROW\_ERR\_\* 的单个字符串参数进行格式化（Joyee Cheung） [#57126](https://github.com/nodejs/node/pull/57126)
* \[[`4f004937ec`](https://github.com/nodejs/node/commit/4f004937ec)] - **src**: 在多个地方进一步修正错误处理（James M Snell） [#57852](https://github.com/nodejs/node/pull/57852)
* \[[`5daa7fe2e2`](https://github.com/nodejs/node/commit/5daa7fe2e2)] - **src**: 修复模块缓冲区分配（X-BW） [#57738](https://github.com/nodejs/node/pull/57738)
* \[[`586b1be11b`](https://github.com/nodejs/node/commit/586b1be11b)] - **src**: 修复使用共享 simdutf 时的构建问题（Antoine du Hamel） [#58407](https://github.com/nodejs/node/pull/58407)
* \[[`563e61f012`](https://github.com/nodejs/node/commit/563e61f012)] - **src**: 修复可能的空指针解引用（Eusgor） [#58459](https://github.com/nodejs/node/pull/58459)
* \[[`cbec07ea0b`](https://github.com/nodejs/node/commit/cbec07ea0b)] - **src**: 修复 FIPS 初始化错误处理（Tobias Nießen） [#58379](https://github.com/nodejs/node/pull/58379)
* \[[`80fb80e71b`](https://github.com/nodejs/node/commit/80fb80e71b)] - **src**: 修复 src/node\_api.cc 中的 -Wunreachable-code 警告（Shelley Vohr） [#58901](https://github.com/nodejs/node/pull/58901)
* \[[`5e97719860`](https://github.com/nodejs/node/commit/5e97719860)] - **test**: 在 macos 上跳过 test-http-imports（Marco Ippolito） [#59745](https://github.com/nodejs/node/pull/59745)
* \[[`69c43bdfcc`](https://github.com/nodejs/node/commit/69c43bdfcc)] - **test**: 修复 internet/test-dns（Michaël Zasso） [#59660](https://github.com/nodejs/node/pull/59660)
* \[[`6fd58e0338`](https://github.com/nodejs/node/commit/6fd58e0338)] - **tools**: 将 coverage GitHub Actions 更新为固定版本（Rich Trott） [#59512](https://github.com/nodejs/node/pull/59512)
* \[[`eb7bbce73e`](https://github.com/nodejs/node/commit/eb7bbce73e)] - **tools**: 禁用失败的 coverage 作业（Antoine du Hamel） [#58770](https://github.com/nodejs/node/pull/58770)
* \[[`65b1669936`](https://github.com/nodejs/node/commit/65b1669936)] - **util**: 修复带有内置 Symbol.toPrimitive 的对象格式化问题（Shima Ryuhei） [#57832](https://github.com/nodejs/node/pull/57832)
* \[[`8a29f13bec`](https://github.com/nodejs/node/commit/8a29f13bec)] - **util**: 修复 parseEnv 误将值中的多个 ‘=‘ 拆分的问题（HEESEUNG） [#57421](https://github.com/nodejs/node/pull/57421)
* \[[`077d5020c4`](https://github.com/nodejs/node/commit/077d5020c4)] - **v8**: 修复 heap utils destroy 中缺失回调的问题（Ruben Bridgewater） [#58846](https://github.com/nodejs/node/pull/58846)
* \[[`34ae9f8b18`](https://github.com/nodejs/node/commit/34ae9f8b18)] - **vm**: import 调用应在当前上下文中返回 promise（Chengzhong Wu） [#58309](https://github.com/nodejs/node/pull/58309)
* \[[`0dd3a8d6d1`](https://github.com/nodejs/node/commit/0dd3a8d6d1)] - **win,build**: 修复 MSVS v17.14 编译问题（StefanStojanovic） [#58902](https://github.com/nodejs/node/pull/58902)
* \[[`1b83a2bd2d`](https://github.com/nodejs/node/commit/1b83a2bd2d)] - **zlib**: 移除对未暴露的 Z_TREES 常量的提及（Jimmy Leung） [#58371](https://github.com/nodejs/node/pull/58371)
* \[[`9dc9604502`](https://github.com/nodejs/node/commit/9dc9604502)] - **zlib**: 修复指针对齐（jhofstee） [#57727](https://github.com/nodejs/node/pull/57727)

<a id="20.19.4"></a>

## 2025-07-15, 版本 20.19.4 'Iron'（LTS），@RafaelGSS

这是一个安全更新。

### 重要变更

* (CVE-2025-27210) Windows 设备名称（CON、PRN、AUX）可绕过 path.normalize() 中的路径遍历保护

### 提交

* \[[`db7b93fcef`](https://github.com/nodejs/node/commit/db7b93fcef)] - **(CVE-2025-27210)** **lib**: 处理所有 Windows 保留驱动器名称（RafaelGSS）[nodejs-private/node-private#721](https://github.com/nodejs-private/node-private/pull/721)

<a id="20.19.3"></a>

## 2025-06-23, 版本 20.19.3 'Iron'（LTS），@marco-ippolito

### 重要变更

* \[[`c535a3c483`](https://github.com/nodejs/node/commit/c535a3c483)] - **crypto**: 将 WebCryptoAPI 的 Ed25519 和 X25519 算法升级为稳定版（Filip Skokan）[#56142](https://github.com/nodejs/node/pull/56142)
* \[[`af1dc63815`](https://github.com/nodejs/node/commit/af1dc63815)] - **crypto**: 将根证书更新为 NSS 3.108（Node.js GitHub Bot）[#57381](https://github.com/nodejs/node/pull/57381)
* \[[`01d63a4ddf`](https://github.com/nodejs/node/commit/01d63a4ddf)] - **deps**: 将时区更新为 2025b（Node.js GitHub Bot）[#57857](https://github.com/nodejs/node/pull/57857)
* \[[`b6daa344eb`](https://github.com/nodejs/node/commit/b6daa344eb)] - **doc**: 将 dario-piotrowicz 添加为协作者（Dario Piotrowicz）[#58102](https://github.com/nodejs/node/pull/58102)

### 提交

* \[[`fc1fa7a357`](https://github.com/nodejs/node/commit/fc1fa7a357)] - **build**: 使用 FILE\_OFFSET\_BITS=64，尤其是在 32 位架构上（RafaelGSS）[#58090](https://github.com/nodejs/node/pull/58090)
* \[[`79e0812181`](https://github.com/nodejs/node/commit/79e0812181)] - **build**: 对 out/Makefile 的依赖使用 glob（Richard Lau）[#55789](https://github.com/nodejs/node/pull/55789)
* \[[`f56e62851a`](https://github.com/nodejs/node/commit/f56e62851a)] - **crypto**: 允许在 SubtleCrypto.deriveBits 中为 HKDF 和 PBKDF2 使用 length=0（Filip Skokan）[#55866](https://github.com/nodejs/node/pull/55866)
* \[[`c535a3c483`](https://github.com/nodejs/node/commit/c535a3c483)] - **crypto**: 将 WebCryptoAPI 的 Ed25519 和 X25519 算法升级为稳定版（Filip Skokan）[#56142](https://github.com/nodejs/node/pull/56142)
* \[[`39925de8b1`](https://github.com/nodejs/node/commit/39925de8b1)] - **crypto**: 允许在 SubtleCrypto.deriveBits 中使用 8 的非倍数值（Filip Skokan）[#55296](https://github.com/nodejs/node/pull/55296)
* \[[`af1dc63815`](https://github.com/nodejs/node/commit/af1dc63815)] - **crypto**: 将根证书更新为 NSS 3.108（Node.js GitHub Bot）[#57381](https://github.com/nodejs/node/pull/57381)
* \[[`d09008add3`](https://github.com/nodejs/node/commit/d09008add3)] - **deps**: V8: 反向挑选 1a3ecc2483b2（Michaël Zasso）[#58342](https://github.com/nodejs/node/pull/58342)
* \[[`fd56652425`](https://github.com/nodejs/node/commit/fd56652425)] - **deps**: V8: 反向挑选 182d9c05e78b（Andrey Kosyakov）[#58342](https://github.com/nodejs/node/pull/58342)
* \[[`447481e829`](https://github.com/nodejs/node/commit/447481e829)] - **deps**: V8: 反向挑选 third\_party/zlib\@646b7f569718（Hans Wennborg）[#58342](https://github.com/nodejs/node/pull/58342)
* \[[`eb447168df`](https://github.com/nodejs/node/commit/eb447168df)] - **deps**: 将 simdutf 更新为 6.4.2（Node.js GitHub Bot）[#57855](https://github.com/nodejs/node/pull/57855)
* \[[`01d63a4ddf`](https://github.com/nodejs/node/commit/01d63a4ddf)] - **deps**: 将时区更新为 2025b（Node.js GitHub Bot）[#57857](https://github.com/nodejs/node/pull/57857)
* \[[`10fb49f2a9`](https://github.com/nodejs/node/commit/10fb49f2a9)] - **deps**: 将 icu 更新为 77.1（Node.js GitHub Bot）[#57455](https://github.com/nodejs/node/pull/57455)
* \[[`f1dc7d0205`](https://github.com/nodejs/node/commit/f1dc7d0205)] - **deps**: 将 corepack 更新为 0.32.0（Node.js GitHub Bot）[#57265](https://github.com/nodejs/node/pull/57265)
* \[[`7a2e64bb8a`](https://github.com/nodejs/node/commit/7a2e64bb8a)] - **deps**: 将 simdutf 更新为 6.4.0（Node.js GitHub Bot）[#56764](https://github.com/nodejs/node/pull/56764)
* \[[`e80669be0d`](https://github.com/nodejs/node/commit/e80669be0d)] - **doc**: 提到报告应与 Node.js 行为准则保持一致（Rafael Gonzaga）[#57607](https://github.com/nodejs/node/pull/57607)
* \[[`7b2c0bc92e`](https://github.com/nodejs/node/commit/7b2c0bc92e)] - **doc**: 将 gurgunday 添加为审阅者（Gürgün Dayıoğlu）[#57594](https://github.com/nodejs/node/pull/57594)
* \[[`791e4879de`](https://github.com/nodejs/node/commit/791e4879de)] - **doc**: 记录 REPL 自定义 eval 参数（Dario Piotrowicz）[#57690](https://github.com/nodejs/node/pull/57690)
* \[[`2917f09876`](https://github.com/nodejs/node/commit/2917f09876)] - **doc**: 改进 fetch 文档（Alessandro Miliucci）[#57296](https://github.com/nodejs/node/pull/57296)
* \[[`d940b15843`](https://github.com/nodejs/node/commit/d940b15843)] - **doc**: 在 process 文档中澄清 `unhandledRejection` 事件的行为（Dario Piotrowicz）[#57654](https://github.com/nodejs/node/pull/57654)
* \[[`71c664fab7`](https://github.com/nodejs/node/commit/71c664fab7)] - **doc**: 将 fs 中的 position 类型更新为 integer | null（Yukihiro Hasegawa）[#57745](https://github.com/nodejs/node/pull/57745)
* \[[`0c0fbfa9c6`](https://github.com/nodejs/node/commit/0c0fbfa9c6)] - **doc**: 补充缺失的 v0.x 变更日志条目（Antoine du Hamel）[#57779](https://github.com/nodejs/node/pull/57779)
* \[[`e99462c9fc`](https://github.com/nodejs/node/commit/e99462c9fc)] - **doc**: 更正 `assert.CallTracker` 的弃用类型（René）[#57997](https://github.com/nodejs/node/pull/57997)
* \[[`c7e92696ef`](https://github.com/nodejs/node/commit/c7e92696ef)] - **doc**: 为 https.get 添加返回值说明（Eng Zer Jun）[#58025](https://github.com/nodejs/node/pull/58025)
* \[[`ccc42b69ce`](https://github.com/nodejs/node/commit/ccc42b69ce)] - **doc**: 修正 `util.styleText` 中的环境变量名（Antoine du Hamel）[#58072](https://github.com/nodejs/node/pull/58072)
* \[[`b6daa344eb`](https://github.com/nodejs/node/commit/b6daa344eb)] - **doc**: 将 dario-piotrowicz 添加为协作者（Dario Piotrowicz）[#58102](https://github.com/nodejs/node/pull/58102)
* \[[`e5d6a3df16`](https://github.com/nodejs/node/commit/e5d6a3df16)] - **doc**: 修复 node v18 之后 `AsyncLocalStorage` 示例响应变化的问题（Naor Tedgi (Abu Emma)）[#57969](https://github.com/nodejs/node/pull/57969)
* \[[`f006411998`](https://github.com/nodejs/node/commit/f006411998)] - **doc**: 修正文件 `zlib.md` 的拼写错误（yusheng chen）[#58093](https://github.com/nodejs/node/pull/58093)
* \[[`5193735df4`](https://github.com/nodejs/node/commit/5193735df4)] - **doc**: 为 readlinePromises.createInterface() 补充缺失的 options.signal（Jimmy Leung）[#55456](https://github.com/nodejs/node/pull/55456)
* \[[`fd44af730f`](https://github.com/nodejs/node/commit/fd44af730f)] - **doc**: 修复 vm.compileFunction() 中错位的选项（Jimmy Leung）[#58145](https://github.com/nodejs/node/pull/58145)
* \[[`0fdcc0ddcd`](https://github.com/nodejs/node/commit/0fdcc0ddcd)] - **doc**: 添加大使消息（Brian Muenzenmeyer）[#57600](https://github.com/nodejs/node/pull/57600)
* \[[`5ca9616bd3`](https://github.com/nodejs/node/commit/5ca9616bd3)] - **doc**: 提高页眉元素的 z-index（Dario Piotrowicz）[#57851](https://github.com/nodejs/node/pull/57851)
* \[[`81342d10f0`](https://github.com/nodejs/node/commit/81342d10f0)] - **doc**: 修复 `DEP0148` 的弃用类型（Livia Medeiros）[#57785](https://github.com/nodejs/node/pull/57785)
* \[[`776becfe01`](https://github.com/nodejs/node/commit/776becfe01)] - **doc**: 删除关于 `--require` 不支持 ES modules 的提及（Huáng Jùnliàng）[#57620](https://github.com/nodejs/node/pull/57620)
* \[[`3140a8f133`](https://github.com/nodejs/node/commit/3140a8f133)] - **doc**: 在 `fs.md` 中补充缺失的 `deprecated` 徽标（Yukihiro Hasegawa）[#57384](https://github.com/nodejs/node/pull/57384)
* \[[`441ce24ae3`](https://github.com/nodejs/node/commit/441ce24ae3)] - **doc**: 将在 `fs.existsSync` 中传入无效类型标记为弃用（Carlos Espa）[#55892](https://github.com/nodejs/node/pull/55892)
* \[[`0556f54544`](https://github.com/nodejs/node/commit/0556f54544)] - **http**: 正确翻译 HTTP 方法（Paolo Insogna）[#52701](https://github.com/nodejs/node/pull/52701)
* \[[`c2c6d2b035`](https://github.com/nodejs/node/commit/c2c6d2b035)] - **http**: 更加适配分代式 GC（ywave620）[#56767](https://github.com/nodejs/node/pull/56767)
* \[[`cdf3fa241c`](https://github.com/nodejs/node/commit/cdf3fa241c)] - **http2**: 如果流已关闭则跳过 writeHead（Shima Ryuhei）[#57686](https://github.com/nodejs/node/pull/57686)
* \[[`bbd5aec785`](https://github.com/nodejs/node/commit/bbd5aec785)] - **http2**: 修复优雅关闭会话（Kushagra Pandey）[#57808](https://github.com/nodejs/node/pull/57808)
* \[[`b427ae4f34`](https://github.com/nodejs/node/commit/b427ae4f34)] - **meta**: 删除 `build-windows.yml`（Aviv Keller）[#54662](https://github.com/nodejs/node/pull/54662)
* \[[`49e624f554`](https://github.com/nodejs/node/commit/49e624f554)] - **os**: 修复 getCIDR 函数中 netmask 格式检查条件（Wiyeong Seo）[#57324](https://github.com/nodejs/node/pull/57324)
* \[[`d582954434`](https://github.com/nodejs/node/commit/d582954434)] - **src**: 删除 crypto_x509.cc 中未使用的变量（Michaël Zasso）[#57754](https://github.com/nodejs/node/pull/57754)
* \[[`234a505e96`](https://github.com/nodejs/node/commit/234a505e96)] - **src**: 允许嵌入者自定义 OOMErrorHandler（Shelley Vohr）[#57325](https://github.com/nodejs/node/pull/57325)
* \[[`c0252cd380`](https://github.com/nodejs/node/commit/c0252cd380)] - **src**: 修复 node_sea 中的 -Wunreachable-code-return（Shelley Vohr）[#57664](https://github.com/nodejs/node/pull/57664)
* \[[`fcd1622fc1`](https://github.com/nodejs/node/commit/fcd1622fc1)] - **src**: 修复 Windows 上 kill signal 0 的问题（Stefan Stojanovic）[#57695](https://github.com/nodejs/node/pull/57695)
* \[[`850192b06b`](https://github.com/nodejs/node/commit/850192b06b)] - **test**: 在 rhel8 上跳过有问题的 sea（Marco Ippolito）[#58761](https://github.com/nodejs/node/pull/58761)
* \[[`3cf7cfb695`](https://github.com/nodejs/node/commit/3cf7cfb695)] - **test**: 将 WebCryptoAPI 的 WPT 更新到 edd42c005c（Node.js GitHub Bot）[#57365](https://github.com/nodejs/node/pull/57365)
* \[[`f57765bdcf`](https://github.com/nodejs/node/commit/f57765bdcf)] - **test**: 将 windows 上的 test-without-async-context-frame 标记为不稳定（James M Snell）[#56753](https://github.com/nodejs/node/pull/56753)
* \[[`275ea8e7ef`](https://github.com/nodejs/node/commit/275ea8e7ef)] - **test**: 在 test-file-write-stream4 中强制执行 GC（Luigi Pinca）[#57930](https://github.com/nodejs/node/pull/57930)
* \[[`da6a13c338`](https://github.com/nodejs/node/commit/da6a13c338)] - **test**: 为 test-http2-options-max-headers-block-length 去除不稳定性（Luigi Pinca）[#57959](https://github.com/nodejs/node/pull/57959)
* \[[`56fce6691e`](https://github.com/nodejs/node/commit/56fce6691e)] - **test**: 防止 test-runner-output 中多余的 HOSTNAME 替换（René）[#58076](https://github.com/nodejs/node/pull/58076)
* \[[`c9c0be5596`](https://github.com/nodejs/node/commit/c9c0be5596)] - **test**: 更新 macOS 的预期错误消息（Antoine du Hamel）[#57742](https://github.com/nodejs/node/pull/57742)
* \[[`3cbf5f93d2`](https://github.com/nodejs/node/commit/3cbf5f93d2)] - **test**: 修复 test-blob-slice-with-large-size 中缺失的边界情况（Joyee Cheung）[#58414](https://github.com/nodejs/node/pull/58414)
* \[[`bffd4ec379`](https://github.com/nodejs/node/commit/bffd4ec379)] - **test**: 在分配失败时跳过 test-buffer-tostring-rangeerror（Joyee Cheung）[#58415](https://github.com/nodejs/node/pull/58415)
* \[[`8237346fb7`](https://github.com/nodejs/node/commit/8237346fb7)] - **test,crypto**: 更新 WebCryptoAPI WPT（Filip Skokan）[#54593](https://github.com/nodejs/node/pull/54593)
* \[[`b90c4ab937`](https://github.com/nodejs/node/commit/b90c4ab937)] - **tools**: 删除未使用的 `osx-pkg-postinstall.sh`（Antoine du Hamel）[#57667](https://github.com/nodejs/node/pull/57667)
* \[[`414013dcfb`](https://github.com/nodejs/node/commit/414013dcfb)] - **tools**: 编辑 create-release-proposal 工作流以处理 pr body 长度（Elves Vieira）[#57841](https://github.com/nodejs/node/pull/57841)
* \[[`7c449ed6b3`](https://github.com/nodejs/node/commit/7c449ed6b3)] - **tools**: 修复 tarball 测试目录（Marco Ippolito）[#57994](https://github.com/nodejs/node/pull/57994)
* \[[`d164dc2d38`](https://github.com/nodejs/node/commit/d164dc2d38)] - **tools**: 将 sccache 版本更新为 v0.10.0（Marco Ippolito）[#57994](https://github.com/nodejs/node/pull/57994)
* \[[`debd3c2cc0`](https://github.com/nodejs/node/commit/debd3c2cc0)] - **tools**: 在 `test-linux` CI 中禁用失败的测试环境（Antoine du Hamel）[#58351](https://github.com/nodejs/node/pull/58351)
* \[[`152112505a`](https://github.com/nodejs/node/commit/152112505a)] - **typings**: 修复 `ImportModuleDynamicallyCallback` 的返回类型（Chengzhong Wu）[#57160](https://github.com/nodejs/node/pull/57160)
* \[[`363bf744ab`](https://github.com/nodejs/node/commit/363bf744ab)] - **worker**: 在退出时刷新 stdout 和 stderr（Matteo Collina）[#56428](https://github.com/nodejs/node/pull/56428)

<a id="20.19.2"></a>

## 2025-05-14，版本 20.19.2 'Iron'（LTS），@RafaelGSS

这是一个安全发布版本。

### 主要变更

* (CVE-2025-23166) 修复异步加密操作中的错误处理
* (CVE-2025-23167)（SEMVER-MAJOR）将 llhttp 更新到 9.2.0
* (CVE-2025-23165) 补充对 uv\_fs\_req\_cleanup 的缺失调用

### 提交

* \[[`eb25047b1b`](https://github.com/nodejs/node/commit/eb25047b1b)] - **deps**: 将 llhttp 更新到 9.2.0（Node.js GitHub Bot）[#51719](https://github.com/nodejs/node/pull/51719)
* \[[`12dcd8db08`](https://github.com/nodejs/node/commit/12dcd8db08)] - **deps**: 将 llhttp 更新到 9.1.3（Node.js GitHub Bot）[#50080](https://github.com/nodejs/node/pull/50080)
* \[[`190e45a291`](https://github.com/nodejs/node/commit/190e45a291)] - **(SEMVER-MAJOR)** **(CVE-2025-23167)** **deps**: 将 llhttp 更新到 9.1.2（Paolo Insogna）[#48981](https://github.com/nodejs/node/pull/48981)
* \[[`fc68c44e6a`](https://github.com/nodejs/node/commit/fc68c44e6a)] - **fs**: 为缺失对 uv\_fs\_req\_cleanup 的调用添加测试（Justin Nietzel）[#57811](https://github.com/nodejs/node/pull/57811)
* \[[`9e13bf0a81`](https://github.com/nodejs/node/commit/9e13bf0a81)] - **(CVE-2025-23165)** **fs**: 补充对 uv\_fs\_req\_cleanup 的缺失调用（Justin Nietzel）[#57811](https://github.com/nodejs/node/pull/57811)
* \[[`bd0aa5d44c`](https://github.com/nodejs/node/commit/bd0aa5d44c)] - **(CVE-2024-27982)** **http**: 默认不允许在标头中折叠 OBS（Paolo Insogna）[nodejs-private/node-private#556](https://github.com/nodejs-private/node-private/pull/556)
* \[[`6c57465920`](https://github.com/nodejs/node/commit/6c57465920)] - **(CVE-2025-23166)** **src**: 修复异步加密操作中的错误处理（RafaelGSS）[nodejs-private/node-private#710](https://github.com/nodejs-private/node-private/pull/710)

<a id="20.19.1"></a>

## 2025-04-22，版本 20.19.1 'Iron'（LTS），由 @RafaelGSS 为 @UlisesGascon 准备

### 主要变更

* \[[`d5e73ce0f8`](https://github.com/nodejs/node/commit/d5e73ce0f8)] - **deps**: 将 undici 更新到 6.21.2（Matteo Collina）[#57442](https://github.com/nodejs/node/pull/57442)
* \[[`e4a6323ab2`](https://github.com/nodejs/node/commit/e4a6323ab2)] - **deps**: 将 c-ares 更新到 v1.34.5（Node.js GitHub Bot）[#57792](https://github.com/nodejs/node/pull/57792)

### 提交

* \[[`d5e73ce0f8`](https://github.com/nodejs/node/commit/d5e73ce0f8)] - **deps**: 将 undici 更新到 6.21.2（Matteo Collina）[#57442](https://github.com/nodejs/node/pull/57442)
* \[[`e4a6323ab2`](https://github.com/nodejs/node/commit/e4a6323ab2)] - **deps**: 将 c-ares 更新到 v1.34.5（Node.js GitHub Bot）[#57792](https://github.com/nodejs/node/pull/57792)
* \[[`b2b9eb36af`](https://github.com/nodejs/node/commit/b2b9eb36af)] - **dns**: 恢复 DNS 查询缓存 TTL（Ethan Arrowood）[#57640](https://github.com/nodejs/node/pull/57640)
* \[[`07a99a5c0b`](https://github.com/nodejs/node/commit/07a99a5c0b)] - **doc**: 修正 v20 更新日志中 require(esm) 警告的状态（Joyee Cheung）[#57529](https://github.com/nodejs/node/pull/57529)
* \[[`d45517ccbf`](https://github.com/nodejs/node/commit/d45517ccbf)] - **meta**: 将 Mozilla-Actions/sccache-action 从 0.0.8 升级到 0.0.9（dependabot\[bot]）[#57720](https://github.com/nodejs/node/pull/57720)
* \[[`fa93bb2633`](https://github.com/nodejs/node/commit/fa93bb2633)] - **test**: 针对 OpenSSL 3.5 更新 parallel/test-tls-dhe（Richard Lau）[#57477](https://github.com/nodejs/node/pull/57477)
* \[[`29c032403c`](https://github.com/nodejs/node/commit/29c032403c)] - **tools**: 更新 sccache 以支持 GH 缓存变更（Michaël Zasso）[#57573](https://github.com/nodejs/node/pull/57573)

<a id="20.19.0"></a>

## 2025-03-13，版本 20.19.0 'Iron'（LTS），@marco-ippolito

### 主要变更

### require(esm) 现在默认启用

使用 require() 加载原生 ES 模块的支持在 v20.x 中一直可以通过命令行标志 --experimental-require-module 使用，而在 v22.x 和 v23.x 中默认可用。在这个版本中，它在 v20.x 上也不再需要标志即可使用。

该功能已在 v23.x 和 v22.x 上经过测试，我们正在收集来自 v20.x 的用户反馈，以便在完全稳定前做出更最终的调整。
现在它不再输出警告，除非显式使用 `--trace-require-module`。
如果此功能引入了任何回归，用户可以向 Node.js 问题跟踪器报告。同时，也可以使用 `--no-experimental-require-module` 作为临时解决方案来禁用此功能。

启用此功能后，如果使用 `require()` 加载 ES 模块，Node.js 将不再抛出 `ERR_REQUIRE_ESM`。不过，如果被加载的 ES 模块或其依赖包含顶层 `await`，则可能抛出 `ERR_REQUIRE_ASYNC_MODULE`。当 ES 模块成功通过 `require()` 加载时，返回的对象要么是类似于 `import()` 返回结果的 ES 模块命名空间对象，要么是 ES 模块中导出为 `"module.exports"` 的内容。

用户可以检查 `process.features.require_module` 来查看当前 Node.js 实例中是否启用了 `require(esm)`。对于包，可以使用 `"module-sync"` 导出条件作为检测当前 Node.js 实例是否支持 `require(esm)` 的方式，并允许 `require()` 和 `import` 以同样的方式加载同一个原生 ES 模块。有关此功能的更多细节，请参阅[文档](https://nodejs.org/docs/latest/api/modules.html#loading-ecmascript-modules-using-require)。

由 Joyee Cheung 贡献于 [#55085](https://github.com/nodejs/node/pull/55085)

### 模块语法检测现在默认启用

模块语法检测（`--experimental-detect-module` 标志）现在默认启用。如有需要，可使用 `--no-experimental-detect-module` 禁用它。

语法检测会尝试将歧义文件作为 CommonJS 运行，如果由于 ES 模块语法导致无法按 CommonJS 解析，Node.js 会再次尝试并将该文件作为 ES 模块运行。
歧义文件是指扩展名为 `.js` 或没有扩展名，且最近的父级 `package.json` 中没有 `"type"` 字段（无论是 `"type": "module"` 还是 `"type": "commonjs"`）的文件。
语法检测对 CommonJS 模块不应有性能影响，但对 ES 模块会带来轻微的性能损耗；在最近的父级 `package.json` 文件中添加 `"type": "module"` 可消除该性能开销。
此功能解锁的一个用例是：在附近没有 `package.json` 的无扩展名脚本中使用 ES 模块语法。

感谢 Geoffrey Booth 在 [#53619](https://github.com/nodejs/node/pull/53619) 中完成这项工作。

### 其他主要变更

* \[[`285bb4ee14`](https://github.com/nodejs/node/commit/285bb4ee14)] - **crypto**: 将根证书更新为 NSS 3.107（Node.js GitHub Bot）[#56566](https://github.com/nodejs/node/pull/56566)
* \[[`73b5c16684`](https://github.com/nodejs/node/commit/73b5c16684)] - **(SEMVER-MINOR)** **worker**: 添加 postMessageToThread（Paolo Insogna）[#53682](https://github.com/nodejs/node/pull/53682)
* \[[`de313b2336`](https://github.com/nodejs/node/commit/de313b2336)] - **(SEMVER-MINOR)** **module**: 仅在 `--trace-require-module` 下输出 require(esm) 警告（Joyee Cheung）[#56194](https://github.com/nodejs/node/pull/56194)
* \[[`4fba01911d`](https://github.com/nodejs/node/commit/4fba01911d)] - **(SEMVER-MINOR)** **process**: 添加 process.features.require\_module（Joyee Cheung）[#55241](https://github.com/nodejs/node/pull/55241)
* \[[`df8a045afe`](https://github.com/nodejs/node/commit/df8a045afe)] - **(SEMVER-MINOR)** **module**: 实现 `"module-sync"` 导出条件（Joyee Cheung）[#54648](https://github.com/nodejs/node/pull/54648)
* \[[`f9dc1eaef5`](https://github.com/nodejs/node/commit/f9dc1eaef5)] - **(SEMVER-MINOR)** **module**: 为 require() 的 ESM 添加 __esModule（Joyee Cheung）[#52166](https://github.com/nodejs/node/pull/52166)

### 提交

* \[[`d84be843e3`](https://github.com/nodejs/node/commit/d84be843e3)] - **benchmark**: 在 styleText 基准测试中添加 validateStream（Rafael Gonzaga）[#56556](https://github.com/nodejs/node/pull/56556)
* \[[`d8eaf5b9b8`](https://github.com/nodejs/node/commit/d8eaf5b9b8)] - **build**: 修复与 V8 的 `depot_tools` 的兼容性（Richard Lau）[#57330](https://github.com/nodejs/node/pull/57330)
* \[[`1ee4bf9690`](https://github.com/nodejs/node/commit/1ee4bf9690)] - **build**: 在 GitHub actions 上测试 macos-13（Michaël Zasso）[#56307](https://github.com/nodejs/node/pull/56307)
* \[[`1cc8d69882`](https://github.com/nodejs/node/commit/1cc8d69882)] - **build**: 在 macOS 上使用 -fvisibility=hidden 构建 v8（Joyee Cheung）[#56275](https://github.com/nodejs/node/pull/56275)
* \[[`52f1f7e22b`](https://github.com/nodejs/node/commit/52f1f7e22b)] - **child\_process**: 修复对分割长度字段消息的解析（Maksim Gorkov）[#56106](https://github.com/nodejs/node/pull/56106)
* \[[`5ef3c3c996`](https://github.com/nodejs/node/commit/5ef3c3c996)] - **crypto**: 补充缺失的返回值检查（Michael Dawson）[#56615](https://github.com/nodejs/node/pull/56615)
* \[[`285bb4ee14`](https://github.com/nodejs/node/commit/285bb4ee14)] - **crypto**: 将根证书更新为 NSS 3.107（Node.js GitHub Bot）[#56566](https://github.com/nodejs/node/pull/56566)
* \[[`46ceb9dc1c`](https://github.com/nodejs/node/commit/46ceb9dc1c)] - **deps**: 将时区数据更新到 2025a（Node.js GitHub Bot）[#56876](https://github.com/nodejs/node/pull/56876)
* \[[`d4ca38fe8e`](https://github.com/nodejs/node/commit/d4ca38fe8e)] - **deps**: libc++ 中的 ENODATA 宏已弃用（Cheng）[#56698](https://github.com/nodejs/node/pull/56698)
* \[[`15214e6508`](https://github.com/nodejs/node/commit/15214e6508)] - **deps**: 将 simdutf 更新到 6.0.3（Node.js GitHub Bot）[#56567](https://github.com/nodejs/node/pull/56567)
* \[[`1e44f5d84b`](https://github.com/nodejs/node/commit/1e44f5d84b)] - **deps**: 将 simdutf 更新到 5.7.2（Node.js GitHub Bot）[#56388](https://github.com/nodejs/node/pull/56388)
* \[[`b92ff7be38`](https://github.com/nodejs/node/commit/b92ff7be38)] - **deps**: 将 googletest 更新到 7d76a23（Node.js GitHub Bot）[#56387](https://github.com/nodejs/node/pull/56387)
* \[[`e1b71a81a9`](https://github.com/nodejs/node/commit/e1b71a81a9)] - **deps**: 将 googletest 更新到 e54519b（Node.js GitHub Bot）[#56370](https://github.com/nodejs/node/pull/56370)
* \[[`c0d45e7f38`](https://github.com/nodejs/node/commit/c0d45e7f38)] - **deps**: 将 simdutf 更新到 5.7.0（Node.js GitHub Bot）[#56332](https://github.com/nodejs/node/pull/56332)
* \[[`d69107f5a8`](https://github.com/nodejs/node/commit/d69107f5a8)] - **deps**: 将 icu 更新到 76.1（Node.js GitHub Bot）[#55551](https://github.com/nodejs/node/pull/55551)
* \[[`5c9a397699`](https://github.com/nodejs/node/commit/5c9a397699)] - **deps**: V8: 回移植 9ab40592f697（Lu Yahan）[#56781](https://github.com/nodejs/node/pull/56781)
* \[[`8342233f6d`](https://github.com/nodejs/node/commit/8342233f6d)] - **deps**: 将 corepack 更新到 0.31.0（Node.js GitHub Bot）[#56795](https://github.com/nodejs/node/pull/56795)
* \[[`561493d35e`](https://github.com/nodejs/node/commit/561493d35e)] - **deps,src**: 简化 base64 编码（Daniel Lemire）[#52714](https://github.com/nodejs/node/pull/52714)
* \[[`6207b2936c`](https://github.com/nodejs/node/commit/6207b2936c)] - **doc**: 将 anatoli 移至 emeritus（Michael Dawson）[#56592](https://github.com/nodejs/node/pull/56592)
* \[[`b0ab483400`](https://github.com/nodejs/node/commit/b0ab483400)] - **doc**: 修复可展开目录树的样式（Antoine du Hamel）[#56755](https://github.com/nodejs/node/pull/56755)
* \[[`53e4dc2a82`](https://github.com/nodejs/node/commit/53e4dc2a82)] - **doc**: 添加“跳到内容”按钮（Antoine du Hamel）[#56750](https://github.com/nodejs/node/pull/56750)
* \[[`33ee4645c3`](https://github.com/nodejs/node/commit/33ee4645c3)] - **doc**: 改进可展开列表的可访问性（Antoine du Hamel）[#56749](https://github.com/nodejs/node/pull/56749)
* \[[`b514438418`](https://github.com/nodejs/node/commit/b514438418)] - **doc**: 添加关于提交信息尾注的说明（Dario Piotrowicz）[#56736](https://github.com/nodejs/node/pull/56736)
* \[[`627f2997e3`](https://github.com/nodejs/node/commit/627f2997e3)] - **doc**: 修复 util.styleText 示例代码中的拼写错误（Robin Mehner）[#56720](https://github.com/nodejs/node/pull/56720)
* \[[`68548dcb48`](https://github.com/nodejs/node/commit/68548dcb48)] - **doc**: 修复 `WeakSet` 和 `WeakMap` 比较细节中的不一致（Shreyans Pathak）[#56683](https://github.com/nodejs/node/pull/56683)
* \[[`337cfb2549`](https://github.com/nodejs/node/commit/337cfb2549)] - **doc**: 添加 RafaelGSS 作为最新安全发布维护者（Rafael Gonzaga）[#56682](https://github.com/nodejs/node/pull/56682)
* \[[`e890c86d7b`](https://github.com/nodejs/node/commit/e890c86d7b)] - **doc**: 澄清 `queueMicrotask()` 与 `process.nextTick()` 中 cjs/esm 的差异（Dario Piotrowicz）[#56659](https://github.com/nodejs/node/pull/56659)
* \[[`978263923f`](https://github.com/nodejs/node/commit/978263923f)] - **doc**: `WeakSet` 和 `WeakMap` 比较细节（Shreyans Pathak）[#56648](https://github.com/nodejs/node/pull/56648)
* \[[`aba280ccd8`](https://github.com/nodejs/node/commit/aba280ccd8)] - **doc**: 提及 prepare --security（Rafael Gonzaga）[#56617](https://github.com/nodejs/node/pull/56617)
* \[[`0a009a527b`](https://github.com/nodejs/node/commit/0a009a527b)] - **doc**: 调整 ambassador 计划中关于转发帖的信息（Michael Dawson）[#56589](https://github.com/nodejs/node/pull/56589)
* \[[`d2f09e2ab3`](https://github.com/nodejs/node/commit/d2f09e2ab3)] - **doc**: 为 ambassador 计划添加类型剥离内容（Marco Ippolito）[#56598](https://github.com/nodejs/node/pull/56598)
* \[[`b0b77d7fbe`](https://github.com/nodejs/node/commit/b0b77d7fbe)] - **doc**: 改进内置快照的内部文档（Joyee Cheung）[#56505](https://github.com/nodejs/node/pull/56505)
* \[[`4b3e7fee94`](https://github.com/nodejs/node/commit/4b3e7fee94)] - **doc**: 记录通过 CLI 打开 nodejs/bluesky PR 的方式（Antoine du Hamel）[#56506](https://github.com/nodejs/node/pull/56506)
* \[[`03878b0384`](https://github.com/nodejs/node/commit/03878b0384)] - **doc**: 更新 ubuntu-lts 的 gcc-version（Kunal Kumar）[#56553](https://github.com/nodejs/node/pull/56553)
* \[[`acbbd7c1a6`](https://github.com/nodejs/node/commit/acbbd7c1a6)] - **doc**: 修复选项中的括号（Tobias Nießen）[#56563](https://github.com/nodejs/node/pull/56563)
* \[[`3fe80c30b8`](https://github.com/nodejs/node/commit/3fe80c30b8)] - **doc**: 将 CVE 到 EOL 行纳入安全发布流程（Rafael Gonzaga）[#56520](https://github.com/nodejs/node/pull/56520)
* \[[`ff8af58046`](https://github.com/nodejs/node/commit/ff8af58046)] - **doc**: 为 node:trace\_events 添加 esm 示例（Alfredo González）[#56514](https://github.com/nodejs/node/pull/56514)
* \[[`27b9cfd135`](https://github.com/nodejs/node/commit/27b9cfd135)] - **doc**: 为 Ambassadors 添加宣传文案（Michael Dawson）[#56235](https://github.com/nodejs/node/pull/56235)
* \[[`020c939da1`](https://github.com/nodejs/node/commit/020c939da1)] - **doc**: 允许通过 GitHub 界面请求 TSC 审阅（Antoine du Hamel）[#56493](https://github.com/nodejs/node/pull/56493)
* \[[`1ef9c9a354`](https://github.com/nodejs/node/commit/1ef9c9a354)] - **doc**: 添加管道传输 ReadableStream 的示例（Gabriel Schulhof）[#56415](https://github.com/nodejs/node/pull/56415)
* \[[`e675c3a7fc`](https://github.com/nodejs/node/commit/e675c3a7fc)] - **doc**: 扩展 `parseArg` 的 `default` 描述（Kevin Gibbons）[#54431](https://github.com/nodejs/node/pull/54431)
* \[[`bc756da876`](https://github.com/nodejs/node/commit/bc756da876)] - **doc**: 在 `SECURITY.md` 中使用 `<ul>` 代替 `<ol>`（Antoine du Hamel）[#56346](https://github.com/nodejs/node/pull/56346)
* \[[`ad59c82a49`](https://github.com/nodejs/node/commit/ad59c82a49)] - **doc**: 澄清 WASM 是受信任的（Matteo Collina）[#56345](https://github.com/nodejs/node/pull/56345)
* \[[`8e76cc69e5`](https://github.com/nodejs/node/commit/8e76cc69e5)] - **doc**: 将双包发布文档移至单独仓库（Joyee Cheung）[#55444](https://github.com/nodejs/node/pull/55444)
* \[[`9fda8e29cd`](https://github.com/nodejs/node/commit/9fda8e29cd)] - **doc**: 将 `--env-file-if-exists` 标志标记为实验性（Juan José）[#56893](https://github.com/nodejs/node/pull/56893)
* \[[`9e975f1a7d`](https://github.com/nodejs/node/commit/9e975f1a7d)] - **doc**: 修复 `SourceMap` 章节的链接和历史记录（Antoine du Hamel）[#57098](https://github.com/nodejs/node/pull/57098)
* \[[`64ce95b8fc`](https://github.com/nodejs/node/commit/64ce95b8fc)] - **doc**: 更新 `require(ESM)` 的历史与稳定性状态（Antoine du Hamel）[#55199](https://github.com/nodejs/node/pull/55199)
* \[[`697a39248b`](https://github.com/nodejs/node/commit/697a39248b)] - **doc**: 修复 `process.features` 的历史记录（Antoine du Hamel）[#54897](https://github.com/nodejs/node/pull/54897)
* \[[`7c38e503a3`](https://github.com/nodejs/node/commit/7c38e503a3)] - **doc**: 添加 process.features 的文档（Marco Ippolito）[#54897](https://github.com/nodejs/node/pull/54897)
* \[[`c85b386a39`](https://github.com/nodejs/node/commit/c85b386a39)] - **esm**: 修复 esm/loader 中指向 `ModuleJobBase` 的 jsdoc 类型引用（Jacob Smith）[#56499](https://github.com/nodejs/node/pull/56499)
* \[[`4813a6a66c`](https://github.com/nodejs/node/commit/4813a6a66c)] - **esm**: 抛出 `ERR_REQUIRE_ESM`，而不是 `ERR_INTERNAL_ASSERTION`（Antoine du Hamel）[#54868](https://github.com/nodejs/node/pull/54868)
* \[[`0d327c8e47`](https://github.com/nodejs/node/commit/0d327c8e47)] - **esm**: 重构 `get_format`（Antoine du Hamel）[#53872](https://github.com/nodejs/node/pull/53872)
* \[[`e87db6c9bc`](https://github.com/nodejs/node/commit/e87db6c9bc)] - **events**: 为 validate 添加 hasEventListener 工具函数（Sunghoon）[#55230](https://github.com/nodejs/node/pull/55230)
* \[[`674b932f33`](https://github.com/nodejs/node/commit/674b932f33)] - **http**: 不在 destroy 后继续发出 error（Robert Nagy）[#55457](https://github.com/nodejs/node/pull/55457)
* \[[`4c24ef8f71`](https://github.com/nodejs/node/commit/4c24ef8f71)] - **http2**: 当 HTTP2 主机是 IP 地址时省略服务器名（islandryu）[#56530](https://github.com/nodejs/node/pull/56530)
* \[[`533afe8124`](https://github.com/nodejs/node/commit/533afe8124)] - **lib**: 减少捕获的 URL 错误数量（Yagiz Nizipli）[#52658](https://github.com/nodejs/node/pull/52658)
* \[[`34221a1d6e`](https://github.com/nodejs/node/commit/34221a1d6e)] - **lib**: 允许回收 CJS 源映射缓存（Chengzhong Wu）[#51711](https://github.com/nodejs/node/pull/51711)
* \[[`f13589f1f9`](https://github.com/nodejs/node/commit/f13589f1f9)] - **lib,src**: 在 JS 中迭代模块包裹器的模块请求（Chengzhong Wu）[#52058](https://github.com/nodejs/node/pull/52058)
* \[[`6afee9ea43`](https://github.com/nodejs/node/commit/6afee9ea43)] - **meta**: 将一位或多位协作者移至 emeritus（Node.js GitHub Bot）[#56580](https://github.com/nodejs/node/pull/56580)
* \[[`85bb738739`](https://github.com/nodejs/node/commit/85bb738739)] - **meta**: 添加安全发布文档的 codeowners（Rafael Gonzaga）[#56521](https://github.com/nodejs/node/pull/56521)
* \[[`48f9ca0992`](https://github.com/nodejs/node/commit/48f9ca0992)] - **meta**: 将一位或多位协作者移至 emeritus（Node.js GitHub Bot）[#56342](https://github.com/nodejs/node/pull/56342)
* \[[`4d724121b4`](https://github.com/nodejs/node/commit/4d724121b4)] - **meta**: 将 MoLow 移至 TSC 正式成员（Moshe Atlow）[#56276](https://github.com/nodejs/node/pull/56276)
* \[[`5e2dab7868`](https://github.com/nodejs/node/commit/5e2dab7868)] - **module**: 修复对 `.` 和 `..` 使用选项 paths 时错误的 `require.resolve`（Dario Piotrowicz）[#56735](https://github.com/nodejs/node/pull/56735)
* \[[`f507c05060`](https://github.com/nodejs/node/commit/f507c05060)] - **module**: 简化 --inspect-brk 处理（Joyee Cheung）[#55679](https://github.com/nodejs/node/pull/55679)
* \[[`ed2d373e5a`](https://github.com/nodejs/node/commit/ed2d373e5a)] - **module**: 为 policy 和网络导入禁用 require(esm)（Joyee Cheung）[#56927](https://github.com/nodejs/node/pull/56927)
* \[[`de313b2336`](https://github.com/nodejs/node/commit/de313b2336)] - **(SEMVER-MINOR)** **module**: 仅在 `--trace-require-module` 下输出 require(esm) 警告（Joyee Cheung）[#56194](https://github.com/nodejs/node/pull/56194)
* \[[`3d89e6b6fa`](https://github.com/nodejs/node/commit/3d89e6b6fa)] - **module**: 将 require(esm) 中的求值拒绝标记为已处理（Joyee Cheung）[#56122](https://github.com/nodejs/node/pull/56122)
* \[[`e01dd4bd4f`](https://github.com/nodejs/node/commit/e01dd4bd4f)] - **module**: 当 require(esm) 来自 node\_modules 时不警告（Joyee Cheung）[#55960](https://github.com/nodejs/node/pull/55960)
* \[[`011e6e0032`](https://github.com/nodejs/node/commit/011e6e0032)] - **module**: 修复 require(esm) 遇到 TLA 时重复抛出的错误（Joyee Cheung）[#55520](https://github.com/nodejs/node/pull/55520)
* \[[`fdf50289c6`](https://github.com/nodejs/node/commit/fdf50289c6)] - **module**: 截断 require(esm) 警告中的内部堆栈帧（Joyee Cheung）[#55496](https://github.com/nodejs/node/pull/55496)
* \[[`8d33f78ca5`](https://github.com/nodejs/node/commit/8d33f78ca5)] - **module**: 允许重新导入之前加载失败的 ESM（Joyee Cheung）[#55502](https://github.com/nodejs/node/pull/55502)
* \[[`8192dd6cf3`](https://github.com/nodejs/node/commit/8192dd6cf3)] - **module**: 在 require(esm) 警告中包含模块信息（Joyee Cheung）[#55397](https://github.com/nodejs/node/pull/55397)
* \[[`1db210a0ec`](https://github.com/nodejs/node/commit/1db210a0ec)] - **module**: 分别检查 --experimental-require-module 与检测机制（Joyee Cheung）[#55250](https://github.com/nodejs/node/pull/55250)
* \[[`cf8701c866`](https://github.com/nodejs/node/commit/cf8701c866)] - **module**: 使用 kNodeModulesRE 检测 node\_modules（Joyee Cheung）[#55243](https://github.com/nodejs/node/pull/55243)
* \[[`dc66632261`](https://github.com/nodejs/node/commit/dc66632261)] - **module**: 支持 require(esm) 中的 'module.exports' 互操作导出（Guy Bedford）[#54563](https://github.com/nodejs/node/pull/54563)
* \[[`1ac1dda9a4`](https://github.com/nodejs/node/commit/1ac1dda9a4)] - **(SEMVER-MINOR)** **module**: 取消 --experimental-require-module 的标记（Joyee Cheung）[#55085](https://github.com/nodejs/node/pull/55085)
* \[[`683c93f45f`](https://github.com/nodejs/node/commit/683c93f45f)] - **module**: 重构 ESM 加载器，以便添加未来的同步钩子（Joyee Cheung）[#54769](https://github.com/nodejs/node/pull/54769)
* \[[`df8a045afe`](https://github.com/nodejs/node/commit/df8a045afe)] - **(SEMVER-MINOR)** **module**: 实现 `"module-sync"` 导出条件（Joyee Cheung）[#54648](https://github.com/nodejs/node/pull/54648)
* \[[`249d82b686`](https://github.com/nodejs/node/commit/249d82b686)] - **module**: 报告歧义模块中未完成的 TLA（Antoine du Hamel）[#54980](https://github.com/nodejs/node/pull/54980)
* \[[`1925d729f9`](https://github.com/nodejs/node/commit/1925d729f9)] - **module**: 在带有 --import 的 CJS 入口处理中过滤掉错误断言（Joyee Cheung）[#54592](https://github.com/nodejs/node/pull/54592)
* \[[`d1331fccb2`](https://github.com/nodejs/node/commit/d1331fccb2)] - **module**: 当不存在时，不对无类型 package.json 发出警告（Joyee Cheung）[#54045](https://github.com/nodejs/node/pull/54045)
* \[[`9916458b44`](https://github.com/nodejs/node/commit/9916458b44)] - **(SEMVER-MINOR)** **module**: 取消 detect-module 的标记（Geoffrey Booth）[#53619](https://github.com/nodejs/node/pull/53619)
* \[[`f9dc1eaef5`](https://github.com/nodejs/node/commit/f9dc1eaef5)] - **(SEMVER-MINOR)** **module**: 为 require() 的 ESM 添加 __esModule（Joyee Cheung）[#52166](https://github.com/nodejs/node/pull/52166)
* \[[`b86f575504`](https://github.com/nodejs/node/commit/b86f575504)] - **module**: 不为 Worker eval 设置 CJS 变量（Antoine du Hamel）[#53050](https://github.com/nodejs/node/pull/53050)
* \[[`30ed93db12`](https://github.com/nodejs/node/commit/30ed93db12)] - **module**: 在链接前缓存同步模块作业（Joyee Cheung）[#52868](https://github.com/nodejs/node/pull/52868)
* \[[`a03faf289d`](https://github.com/nodejs/node/commit/a03faf289d)] - **module**: 在 CJS 加载器中支持 ESM 检测（Joyee Cheung）[#52047](https://github.com/nodejs/node/pull/52047)
* \[[`b07ad39bda`](https://github.com/nodejs/node/commit/b07ad39bda)] - **module**: 通过尝试重新编译为 SourceTextModule 来检测 ESM 语法（Joyee Cheung）[#52413](https://github.com/nodejs/node/pull/52413)
* \[[`132a5c190f`](https://github.com/nodejs/node/commit/132a5c190f)] - **module**: 消除对 cjs 入口检测带来的性能开销（Geoffrey Booth）[#52093](https://github.com/nodejs/node/pull/52093)
* \[[`55a57a189f`](https://github.com/nodejs/node/commit/55a57a189f)] - **node-api**: 从 napi_module_register 中移除已弃用属性（Vladimir Morozov）[#56162](https://github.com/nodejs/node/pull/56162)
* \[[`4fba01911d`](https://github.com/nodejs/node/commit/4fba01911d)] - **(SEMVER-MINOR)** **process**: 添加 process.features.require\_module（Joyee Cheung）[#55241](https://github.com/nodejs/node/pull/55241)
* \[[`c0fad18ac0`](https://github.com/nodejs/node/commit/c0fad18ac0)] - **src**: 为 X509\_STORE\_new() 添加 nullptr 处理（Burkov Egor）[#56700](https://github.com/nodejs/node/pull/56700)
* \[[`5b88d48cbb`](https://github.com/nodejs/node/commit/5b88d48cbb)] - **src**: 为 RSACipherConfig mode 字段添加默认值（Burkov Egor）[#56701](https://github.com/nodejs/node/pull/56701)
* \[[`e3b69e57a6`](https://github.com/nodejs/node/commit/e3b69e57a6)] - **src**: 修复使用 GCC 15 的构建（tjuhaszrh）[#56740](https://github.com/nodejs/node/pull/56740)
* \[[`a7c1d8c0e8`](https://github.com/nodejs/node/commit/a7c1d8c0e8)] - **src**: 在使用 FSReqWrapSync 的路径中对其进行初始化（Michaël Zasso）[#56613](https://github.com/nodejs/node/pull/56613)
* \[[`c06ac66356`](https://github.com/nodejs/node/commit/c06ac66356)] - **src**: 修复错误来源中未定义的脚本名称（Chengzhong Wu）[#56502](https://github.com/nodejs/node/pull/56502)
* \[[`500f3ccc66`](https://github.com/nodejs/node/commit/500f3ccc66)] - **src**: 在 snapshot 构建器中正确锁定线程（Joyee Cheung）[#56327](https://github.com/nodejs/node/pull/56327)
* \[[`cf25a5edeb`](https://github.com/nodejs/node/commit/cf25a5edeb)] - **src**: 在创建启动快照前清空平台任务（Chengzhong Wu）[#56403](https://github.com/nodejs/node/pull/56403)
* \[[`8af1b53bb8`](https://github.com/nodejs/node/commit/8af1b53bb8)] - **src**: 安全移除 dotenv 的最后一行（Shima Ryuhei）[#55982](https://github.com/nodejs/node/pull/55982)
* \[[`bb57e909aa`](https://github.com/nodejs/node/commit/bb57e909aa)] - **src**: 从 `process.versions` 中移除 `base64`（Richard Lau）[#53442](https://github.com/nodejs/node/pull/53442)
* \[[`b8c89a693e`](https://github.com/nodejs/node/commit/b8c89a693e)] - **src**: 添加 `--env-file-if-exists` 标志（Bosco Domingo）[#53060](https://github.com/nodejs/node/pull/53060)
* \[[`9097de073a`](https://github.com/nodejs/node/commit/9097de073a)] - **src**: 在 `Dotenv::GetPathFromArgs` 中不要匹配 `--` 之后的内容（Aviv Keller）[#54237](https://github.com/nodejs/node/pull/54237)
* \[[`ececd225b6`](https://github.com/nodejs/node/commit/ececd225b6)] - **src**: 在 C++ 中实现 IsInsideNodeModules()（Joyee Cheung）[#55286](https://github.com/nodejs/node/pull/55286)
* \[[`18593b7d3e`](https://github.com/nodejs/node/commit/18593b7d3e)] - **src**: 重构嵌入式入口点加载（Joyee Cheung）[#53573](https://github.com/nodejs/node/pull/53573)
* \[[`d7aefc0524`](https://github.com/nodejs/node/commit/d7aefc0524)] - **stream**: 修复 ReadableStreamBYOBReader.readIntoRequests 中的拼写错误（Mattias Buelens）[#56560](https://github.com/nodejs/node/pull/56560)
* \[[`fe5f7bcd47`](https://github.com/nodejs/node/commit/fe5f7bcd47)] - **stream**: 验证 WritableStream 中未定义的 sizeAlgorithm（Jason Zhang）[#56067](https://github.com/nodejs/node/pull/56067)
* \[[`12744c1fd4`](https://github.com/nodejs/node/commit/12744c1fd4)] - **test**: 减少写入块的数量（Luigi Pinca）[#56757](https://github.com/nodejs/node/pull/56757)
* \[[`e121d7d62c`](https://github.com/nodejs/node/commit/e121d7d62c)] - **test**: 修复无效的 common.mustSucceed() 用法（Luigi Pinca）[#56756](https://github.com/nodejs/node/pull/56756)
* \[[`11b82de7ed`](https://github.com/nodejs/node/commit/11b82de7ed)] - **test**: 在 global setters 测试中使用严格模式（Rich Trott）[#56742](https://github.com/nodejs/node/pull/56742)
* \[[`f9d6e35c5e`](https://github.com/nodejs/node/commit/f9d6e35c5e)] - **test**: 清理并简化 test-crypto-aes-wrap（James M Snell）[#56748](https://github.com/nodejs/node/pull/56748)
* \[[`792ce98699`](https://github.com/nodejs/node/commit/792ce98699)] - **test**: 不使用 common.isMainThread（Luigi Pinca）[#56768](https://github.com/nodejs/node/pull/56768)
* \[[`4f0cf475e0`](https://github.com/nodejs/node/commit/4f0cf475e0)] - **test**: 添加一个使用多字节路径并解析模块的测试（yamachu）[#56696](https://github.com/nodejs/node/pull/56696)
* \[[`3bc8d273c2`](https://github.com/nodejs/node/commit/3bc8d273c2)] - **test**: 添加缺失的 env 文件测试（Jonas）[#56642](https://github.com/nodejs/node/pull/56642)
* \[[`ad39367712`](https://github.com/nodejs/node/commit/ad39367712)] - **test**: 在 test-zlib-const 中强制使用严格模式（Rich Trott）[#56689](https://github.com/nodejs/node/pull/56689)
* \[[`ca79914137`](https://github.com/nodejs/node/commit/ca79914137)] - **test**: test-stream-compose.js 不需要 internals（Meghan Denny）[#56619](https://github.com/nodejs/node/pull/56619)
* \[[`08bde67101`](https://github.com/nodejs/node/commit/08bde67101)] - **test**: 为 gcUntil() 添加 maxCount 和 gcOptions（Joyee Cheung）[#56522](https://github.com/nodejs/node/pull/56522)
* \[[`40a0f6f6e3`](https://github.com/nodejs/node/commit/40a0f6f6e3)] - **test**: 将 test-worker-prof 在 smartos 上标记为 flaky（Joyee Cheung）[#56583](https://github.com/nodejs/node/pull/56583)
* \[[`d17bf2f62a`](https://github.com/nodejs/node/commit/d17bf2f62a)] - **test**: 将 test-child-process-bad-stdio 更新为使用 node:test（Colin Ihrig）[#56562](https://github.com/nodejs/node/pull/56562)
* \[[`5660b99b43`](https://github.com/nodejs/node/commit/5660b99b43)] - **test**: 禁用与 openssl 3.4.0 不兼容的测试（Jelle van der Waa）[#56160](https://github.com/nodejs/node/pull/56160)
* \[[`861c99f351`](https://github.com/nodejs/node/commit/861c99f351)] - **test**: 使 test-crypto-hash 兼容 OpenSSL > 3.4.0（Jelle van der Waa）[#56160](https://github.com/nodejs/node/pull/56160)
* \[[`597a39b5f9`](https://github.com/nodejs/node/commit/597a39b5f9)] - **test**: 更新 tls-psk-circuit 中针对 OpenSSL 3.4 的错误代码（sebastianas）[#56420](https://github.com/nodejs/node/pull/56420)
* \[[`721e9e1217`](https://github.com/nodejs/node/commit/721e9e1217)] - **test**: 添加初始 test426 覆盖率（Chengzhong Wu）[#56436](https://github.com/nodejs/node/pull/56436)
* \[[`cfe5380c44`](https://github.com/nodejs/node/commit/cfe5380c44)] - **test**: 将 test-set-http-max-http-headers 更新为使用 node:test（Colin Ihrig）[#56439](https://github.com/nodejs/node/pull/56439)
* \[[`51ff71a87a`](https://github.com/nodejs/node/commit/51ff71a87a)] - **test**: 将 test-child-process-windows-hide 更新为使用 node:test（Colin Ihrig）[#56437](https://github.com/nodejs/node/pull/56437)
* \[[`d6aca0cd89`](https://github.com/nodejs/node/commit/d6aca0cd89)] - **test**: 增加 s390 上 eventloop 测试的自旋次数（Michael Dawson）[#56228](https://github.com/nodejs/node/pull/56228)
* \[[`82461af6ec`](https://github.com/nodejs/node/commit/82461af6ec)] - **test**: 将 message eval 测试从 Python 迁移到 JS（Yiyun Lei）[#50482](https://github.com/nodejs/node/pull/50482)
* \[[`5083bbb2bb`](https://github.com/nodejs/node/commit/5083bbb2bb)] - **test**: 移除 async-hooks/test-writewrap 的 flaky 标记（Luigi Pinca）[#56048](https://github.com/nodejs/node/pull/56048)
* \[[`b4b26e973d`](https://github.com/nodejs/node/commit/b4b26e973d)] - **test**: 使 test-esm-loader-hooks-inspect-brk 稳定化（Luigi Pinca）[#56050](https://github.com/nodejs/node/pull/56050)
* \[[`182be26b8a`](https://github.com/nodejs/node/commit/182be26b8a)] - **test**: 将 url 的 WPT 更新到 67880a4eb83ca9aa732eec4b35a1971ff5bf37ff（Node.js GitHub Bot）[#55999](https://github.com/nodejs/node/pull/55999)
* \[[`e67a84902f`](https://github.com/nodejs/node/commit/e67a84902f)] - **test_runner**: 移除未使用的错误（Pietro Marchini）[#56607](https://github.com/nodejs/node/pull/56607)
* \[[`4274c6a015`](https://github.com/nodejs/node/commit/4274c6a015)] - **test_runner**: 运行单文件测试基准（Pietro Marchini）[#56479](https://github.com/nodejs/node/pull/56479)
* \[[`e57004458b`](https://github.com/nodejs/node/commit/e57004458b)] - **tools**: 更新文档到新版本（Node.js GitHub Bot）[#56259](https://github.com/nodejs/node/pull/56259)
* \[[`e039f2b571`](https://github.com/nodejs/node/commit/e039f2b571)] - **tools**: 在缺失 `create-release-proposal.sh` 时不抛出错误（Antoine du Hamel）[#56704](https://github.com/nodejs/node/pull/56704)
* \[[`9a1e314498`](https://github.com/nodejs/node/commit/9a1e314498)] - **tools**: 修复 tools-deps-update（Daniel Lemire）[#56684](https://github.com/nodejs/node/pull/56684)
* \[[`d6469b5287`](https://github.com/nodejs/node/commit/d6469b5287)] - **tools**: 在缺失 `create-release-proposal.sh` 时不抛出错误（Antoine du Hamel）[#56695](https://github.com/nodejs/node/pull/56695)
* \[[`e162476fdc`](https://github.com/nodejs/node/commit/e162476fdc)] - **tools**: 修复 `lint-release-proposal` 工作流中的权限（Antoine du Hamel）[#56614](https://github.com/nodejs/node/pull/56614)
* \[[`914b4675c8`](https://github.com/nodejs/node/commit/914b4675c8)] - **tools**: 编辑 `create-release-proposal` 工作流（Antoine du Hamel）[#56540](https://github.com/nodejs/node/pull/56540)
* \[[`4ff9aa7235`](https://github.com/nodejs/node/commit/4ff9aa7235)] - **tools**: 将提交列表验证纳入 `lint-release-commit`（Antoine du Hamel）[#56291](https://github.com/nodejs/node/pull/56291)
* \[[`589d0ae8ea`](https://github.com/nodejs/node/commit/589d0ae8ea)] - **tools**: 修复 loong64 构建失败（Xiao-Tao）[#56466](https://github.com/nodejs/node/pull/56466)
* \[[`bc8c39bff8`](https://github.com/nodejs/node/commit/bc8c39bff8)] - **tools**: 在 Python linting 中禁用不必要的规则忽略（Rich Trott）[#56429](https://github.com/nodejs/node/pull/56429)
* \[[`3b130002bb`](https://github.com/nodejs/node/commit/3b130002bb)] - **tools**: 在打开 release proposal 时添加 release line 标签（Antoine du Hamel）[#56317](https://github.com/nodejs/node/pull/56317)
* \[[`73b5c16684`](https://github.com/nodejs/node/commit/73b5c16684)] - **(SEMVER-MINOR)** **worker**: 添加 postMessageToThread（Paolo Insogna）[#53682](https://github.com/nodejs/node/pull/53682)

<a id="20.18.3"></a>

## 2025-02-10, 版本 20.18.3 'Iron' (LTS), @marco-ippolito

### 值得注意的变更

* \[[`030f155986`](https://github.com/nodejs/node/commit/030f155986)] - **esm**: 将 import attributes 和 JSON 模块标记为稳定版 (Nicolò Ribaudo) [#55333](https://github.com/nodejs/node/pull/55333)
* \[[`b9b006331f`](https://github.com/nodejs/node/commit/b9b006331f)] - **doc**: 将 LJHarb 添加为协作者 (Jordan Harband) [#56132](https://github.com/nodejs/node/pull/56132)
* \[[`39b89e90b4`](https://github.com/nodejs/node/commit/39b89e90b4)] - **doc**: 对 semver-major 版本发布执行严格策略 (Rafael Gonzaga) [#55732](https://github.com/nodejs/node/pull/55732)
* \[[`247fa1959f`](https://github.com/nodejs/node/commit/247fa1959f)] - **crypto**: 将根证书更新为 NSS 3.104 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
* \[[`adfc2f993a`](https://github.com/nodejs/node/commit/adfc2f993a)] - **tools**: 修复根证书更新器 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
* \[[`29862ae105`](https://github.com/nodejs/node/commit/29862ae105)] - **doc**: 将 jazelly 添加为协作者 (Jason Zhang) [#55531](https://github.com/nodejs/node/pull/55531)

### 提交

* \[[`b4f5da18a5`](https://github.com/nodejs/node/commit/b4f5da18a5)] - **benchmark**: 添加 `test-reporters` (Aviv Keller) [#55757](https://github.com/nodejs/node/pull/55757)
* \[[`407992e272`](https://github.com/nodejs/node/commit/407992e272)] - **benchmark**: 添加 `test_runner/mock-fn` (Aviv Keller) [#55771](https://github.com/nodejs/node/pull/55771)
* \[[`17abec4367`](https://github.com/nodejs/node/commit/17abec4367)] - **benchmark**: 添加 nodeTiming.uvmetricsinfo 基准测试 (RafaelGSS) [#55614](https://github.com/nodejs/node/pull/55614)
* \[[`43f7050338`](https://github.com/nodejs/node/commit/43f7050338)] - **benchmark**: 为 run.js 添加 --runs 支持 (Rafael Gonzaga) [#55158](https://github.com/nodejs/node/pull/55158)
* \[[`470789a981`](https://github.com/nodejs/node/commit/470789a981)] - **benchmark**: 调整 buffer-copy 的字节大小 (Rafael Gonzaga) [#55295](https://github.com/nodejs/node/pull/55295)
* \[[`ea1c97ac16`](https://github.com/nodejs/node/commit/ea1c97ac16)] - **buffer**: 记录 concat 零填充 (Duncan) [#55562](https://github.com/nodejs/node/pull/55562)
* \[[`ae683a9e1f`](https://github.com/nodejs/node/commit/ae683a9e1f)] - **build**: 在 loongarch64 上为 'make binary' 正确设置 DESTCPU (吴小白) [#56271](https://github.com/nodejs/node/pull/56271)
* \[[`af020edf96`](https://github.com/nodejs/node/commit/af020edf96)] - **build**: 修复 d8 构建中缺失的 fp16 依赖 (Joyee Cheung) [#56266](https://github.com/nodejs/node/pull/56266)
* \[[`d6a1b74404`](https://github.com/nodejs/node/commit/d6a1b74404)] - **build**: 添加主版本发布动作 (Rafael Gonzaga) [#56199](https://github.com/nodejs/node/pull/56199)
* \[[`bc92a96a5a`](https://github.com/nodejs/node/commit/bc92a96a5a)] - **build**: 允许覆盖 clang 的使用 (Shelley Vohr) [#56016](https://github.com/nodejs/node/pull/56016)
* \[[`f370ec0989`](https://github.com/nodejs/node/commit/f370ec0989)] - **build**: 移除 create-release-proposal 的默认值 (Rafael Gonzaga) [#56042](https://github.com/nodejs/node/pull/56042)
* \[[`25e1862e87`](https://github.com/nodejs/node/commit/25e1862e87)] - **build**: 在 GN 中将 node_arch 设置为 target_cpu (Shelley Vohr) [#55967](https://github.com/nodejs/node/pull/55967)
* \[[`55c205e5f6`](https://github.com/nodejs/node/commit/55c205e5f6)] - **build**: 添加创建发布提案动作 (Rafael Gonzaga) [#55690](https://github.com/nodejs/node/pull/55690)
* \[[`9f14ba808d`](https://github.com/nodejs/node/commit/9f14ba808d)] - **build**: 在 GN 构建中实现 node_use_amaro 标志 (Cheng) [#55798](https://github.com/nodejs/node/pull/55798)
* \[[`046430c47e`](https://github.com/nodejs/node/commit/046430c47e)] - **build**: 修复使用系统 icu 76 构建的问题 (Michael Cho) [#55563](https://github.com/nodejs/node/pull/55563)
* \[[`0b6d62c812`](https://github.com/nodejs/node/commit/0b6d62c812)] - **build**: 修复 generate_config_gypi.py 中使用的 GN 参数 (Shelley Vohr) [#55530](https://github.com/nodejs/node/pull/55530)
* \[[`8f9c642369`](https://github.com/nodejs/node/commit/8f9c642369)] - **build**: 修复 cares/uv 依赖的 GN 构建 (Cheng) [#55477](https://github.com/nodejs/node/pull/55477)
* \[[`284e932326`](https://github.com/nodejs/node/commit/284e932326)] - **build**: 修复 AIX 7.1 的卸载脚本 (Cloorc) [#55438](https://github.com/nodejs/node/pull/55438)
* \[[`2f71f168ef`](https://github.com/nodejs/node/commit/2f71f168ef)] - **build**: 整理 cares.gyp (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
* \[[`e89e807522`](https://github.com/nodejs/node/commit/e89e807522)] - **build**: 同步 c-ares 源文件列表 (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
* \[[`5eb6c94851`](https://github.com/nodejs/node/commit/5eb6c94851)] - **build**: 修复路径拼接 (Mohammed Keyvanzadeh) [#55387](https://github.com/nodejs/node/pull/55387)
* \[[`720d23f3ac`](https://github.com/nodejs/node/commit/720d23f3ac)] - **build**: 修复 Makefile 中出现的 make 错误 (minkyu_kim) [#55287](https://github.com/nodejs/node/pull/55287)
* \[[`dc552c6739`](https://github.com/nodejs/node/commit/dc552c6739)] - **build,win**: 为 clang-cl 启用 pch (Stefan Stojanovic) [#55249](https://github.com/nodejs/node/pull/55249)
* \[[`64b140d484`](https://github.com/nodejs/node/commit/64b140d484)] - **cli**: 将 `--heap-prof` 标志加入 `NODE_OPTIONS` 可用范围 (Juan José) [#54259](https://github.com/nodejs/node/pull/54259)
* \[[`23fb644037`](https://github.com/nodejs/node/commit/23fb644037)] - **crypto**: 确保 CryptoKey 的 usages 和 algorithm 是缓存对象 (Filip Skokan) [#56108](https://github.com/nodejs/node/pull/56108)
* \[[`247fa1959f`](https://github.com/nodejs/node/commit/247fa1959f)] - **crypto**: 将根证书更新为 NSS 3.104 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
* \[[`3c4262a171`](https://github.com/nodejs/node/commit/3c4262a171)] - **deps**: V8: 挑拣提交 26fd1dfa9cd6 (Shu-yu Guo) [#55961](https://github.com/nodejs/node/pull/55961)
* \[[`558e6588a4`](https://github.com/nodejs/node/commit/558e6588a4)] - **deps**: V8: 回移植 ae5a4db8ad86 (Shu-yu Guo) [#55961](https://github.com/nodejs/node/pull/55961)
* \[[`169bc58447`](https://github.com/nodejs/node/commit/169bc58447)] - **deps**: 将 simdutf 更新到 5.6.4 (Node.js GitHub Bot) [#56255](https://github.com/nodejs/node/pull/56255)
* \[[`bc7bb1e269`](https://github.com/nodejs/node/commit/bc7bb1e269)] - **deps**: 将 c-ares 更新到 v1.34.4 (Node.js GitHub Bot) [#56256](https://github.com/nodejs/node/pull/56256)
* \[[`782bb6cac4`](https://github.com/nodejs/node/commit/782bb6cac4)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-82a5fec (Node.js GitHub Bot) [#55980](https://github.com/nodejs/node/pull/55980)
* \[[`f7131cf178`](https://github.com/nodejs/node/commit/f7131cf178)] - **deps**: 将 corepack 更新到 0.30.0 (Node.js GitHub Bot) [#55977](https://github.com/nodejs/node/pull/55977)
* \[[`b09f6abcd3`](https://github.com/nodejs/node/commit/b09f6abcd3)] - **deps**: 将 simdutf 更新到 5.6.3 (Node.js GitHub Bot) [#55973](https://github.com/nodejs/node/pull/55973)
* \[[`d63ccb60ea`](https://github.com/nodejs/node/commit/d63ccb60ea)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-7e2e4d7 (Node.js GitHub Bot) [#54432](https://github.com/nodejs/node/pull/54432)
* \[[`a2f315ef8b`](https://github.com/nodejs/node/commit/a2f315ef8b)] - **deps**: 将 simdutf 更新到 5.6.2 (Node.js GitHub Bot) [#55889](https://github.com/nodejs/node/pull/55889)
* \[[`afed723b6c`](https://github.com/nodejs/node/commit/afed723b6c)] - **deps**: 将 simdutf 更新到 5.6.1 (Node.js GitHub Bot) [#55850](https://github.com/nodejs/node/pull/55850)
* \[[`753c3b322f`](https://github.com/nodejs/node/commit/753c3b322f)] - **deps**: 将 c-ares 更新到 v1.34.3 (Node.js GitHub Bot) [#55803](https://github.com/nodejs/node/pull/55803)
* \[[`4f89af8a6f`](https://github.com/nodejs/node/commit/4f89af8a6f)] - **deps**: 将 acorn 更新到 8.14.0 (Node.js GitHub Bot) [#55699](https://github.com/nodejs/node/pull/55699)
* \[[`07359ec14f`](https://github.com/nodejs/node/commit/07359ec14f)] - **deps**: 将 acorn 更新到 8.13.0 (Node.js GitHub Bot) [#55558](https://github.com/nodejs/node/pull/55558)
* \[[`c6236571fc`](https://github.com/nodejs/node/commit/c6236571fc)] - **deps**: 将 googletest 更新到 df1544b (Node.js GitHub Bot) [#55465](https://github.com/nodejs/node/pull/55465)
* \[[`f63413c6f3`](https://github.com/nodejs/node/commit/f63413c6f3)] - **deps**: 将 c-ares 更新到 v1.34.2 (Node.js GitHub Bot) [#55463](https://github.com/nodejs/node/pull/55463)
* \[[`ad725c766d`](https://github.com/nodejs/node/commit/ad725c766d)] - **deps**: 将 ada 更新到 2.9.1 (Node.js GitHub Bot) [#54679](https://github.com/nodejs/node/pull/54679)
* \[[`33367cbd62`](https://github.com/nodejs/node/commit/33367cbd62)] - **deps**: 将 simdutf 更新到 5.6.0 (Node.js GitHub Bot) [#55379](https://github.com/nodejs/node/pull/55379)
* \[[`f2a55d9d2d`](https://github.com/nodejs/node/commit/f2a55d9d2d)] - **deps**: 将 c-ares 更新到 v1.34.1 (Node.js GitHub Bot) [#55369](https://github.com/nodejs/node/pull/55369)
* \[[`1d14886266`](https://github.com/nodejs/node/commit/1d14886266)] - **dgram**: 检查 udp 缓冲区大小以避免 fd 泄漏 (theanarkh) [#56084](https://github.com/nodejs/node/pull/56084)
* \[[`de265b9558`](https://github.com/nodejs/node/commit/de265b9558)] - **diagnostics_channel**: 修复发布期间取消订阅的问题 (simon-id) [#55116](https://github.com/nodejs/node/pull/55116)
* \[[`22e0d17097`](https://github.com/nodejs/node/commit/22e0d17097)] - **dns**: 停止使用已弃用的 `ares_query` (Aviv Keller) [#55430](https://github.com/nodejs/node/pull/55430)
* \[[`44f3b23749`](https://github.com/nodejs/node/commit/44f3b23749)] - **dns**: 遵循 order 选项 (Luigi Pinca) [#55392](https://github.com/nodejs/node/pull/55392)
* \[[`f78508cd30`](https://github.com/nodejs/node/commit/f78508cd30)] - **doc**: 为 Permission Model 添加历史信息 (Antoine du Hamel) [#56707](https://github.com/nodejs/node/pull/56707)
* \[[`f07be5e3cd`](https://github.com/nodejs/node/commit/f07be5e3cd)] - **doc**: 为使用 `InternalWorker` 且启用权限模型的功能添加说明 (Antoine du Hamel) [#56706](https://github.com/nodejs/node/pull/56706)
* \[[`618e005672`](https://github.com/nodejs/node/commit/618e005672)] - **doc**: 为 JSON 模块稳定化添加历史条目 (Antoine du Hamel) [#55855](https://github.com/nodejs/node/pull/55855)
* \[[`f89f4ff856`](https://github.com/nodejs/node/commit/f89f4ff856)] - **doc**: 修复浅色模式下的颜色对比度问题 (Rich Trott) [#56272](https://github.com/nodejs/node/pull/56272)
* \[[`a51ef9d829`](https://github.com/nodejs/node/commit/a51ef9d829)] - **doc**: 澄清 util.aborted 的资源使用情况 (Kunal Kumar) [#55780](https://github.com/nodejs/node/pull/55780)
* \[[`2d88c4b425`](https://github.com/nodejs/node/commit/2d88c4b425)] - **doc**: 为 node:repl 添加 esm 示例 (Alfredo González) [#55432](https://github.com/nodejs/node/pull/55432)
* \[[`722dada673`](https://github.com/nodejs/node/commit/722dada673)] - **doc**: 为 node:readline 添加 esm 示例 (Alfredo González) [#55335](https://github.com/nodejs/node/pull/55335)
* \[[`090c7a3b01`](https://github.com/nodejs/node/commit/090c7a3b01)] - **doc**: 将 'which' 改为 'that' 并添加逗号 (Selveter Senitro) [#56216](https://github.com/nodejs/node/pull/56216)
* \[[`ae3f6fbe59`](https://github.com/nodejs/node/commit/ae3f6fbe59)] - **doc**: `sea.getRawAsset(key)` 始终返回 ArrayBuffer (沈鸿飞) [#56206](https://github.com/nodejs/node/pull/56206)
* \[[`d103917d92`](https://github.com/nodejs/node/commit/d103917d92)] - **doc**: 更新发布公告文档 (Rafael Gonzaga) [#56200](https://github.com/nodejs/node/pull/56200)
* \[[`80e5bb87c4`](https://github.com/nodejs/node/commit/80e5bb87c4)] - **doc**: 将博客链接更新为 /vulnerability (Rafael Gonzaga) [#56198](https://github.com/nodejs/node/pull/56198)
* \[[`b739c2a926`](https://github.com/nodejs/node/commit/b739c2a926)] - **doc**: 指出 import.meta 仅在 ES 模块中受支持 (Anton Kastritskii) [#56186](https://github.com/nodejs/node/pull/56186)
* \[[`bbd0222a10`](https://github.com/nodejs/node/commit/bbd0222a10)] - **doc**: 添加宣传消息 - Node.js 的优势 (Michael Dawson) [#56085](https://github.com/nodejs/node/pull/56085)
* \[[`0e9abf2754`](https://github.com/nodejs/node/commit/0e9abf2754)] - **doc**: 修复样式指南的错误链接 (Yuan-Ming Hsu) [#56181](https://github.com/nodejs/node/pull/56181)
* \[[`1dbc7e87d7`](https://github.com/nodejs/node/commit/1dbc7e87d7)] - **doc**: 修复 c++ addon hello world 示例 (Edigleysson Silva (Edy)) [#56172](https://github.com/nodejs/node/pull/56172)
* \[[`026f0198c8`](https://github.com/nodejs/node/commit/026f0198c8)] - **doc**: 更新博客 release-post 链接 (Ruy Adorno) [#56123](https://github.com/nodejs/node/pull/56123)
* \[[`c2fa359f7a`](https://github.com/nodejs/node/commit/c2fa359f7a)] - **doc**: 提及发布脚本的 `-a` 标志 (Ruy Adorno) [#56124](https://github.com/nodejs/node/pull/56124)
* \[[`b9b006331f`](https://github.com/nodejs/node/commit/b9b006331f)] - **doc**: 将 LJHarb 添加为协作者 (Jordan Harband) [#56132](https://github.com/nodejs/node/pull/56132)
* \[[`7a1365ba62`](https://github.com/nodejs/node/commit/7a1365ba62)] - **doc**: 将 create-release-action 添加到流程中 (Rafael Gonzaga) [#55993](https://github.com/nodejs/node/pull/55993)
* \[[`51262ec84e`](https://github.com/nodejs/node/commit/51262ec84e)] - **doc**: 将文件重命名为 advocacy-ambassador-program.md (Tobias Nießen) [#56046](https://github.com/nodejs/node/pull/56046)
* \[[`6fc7328831`](https://github.com/nodejs/node/commit/6fc7328831)] - **doc**: 从示例代码中移除未使用的导入 (Blended Bram) [#55570](https://github.com/nodejs/node/pull/55570)
* \[[`9f3ef4a434`](https://github.com/nodejs/node/commit/9f3ef4a434)] - **doc**: 在 releases 部分添加 FAQ (Rafael Gonzaga) [#55992](https://github.com/nodejs/node/pull/55992)
* \[[`1dcf8dfedb`](https://github.com/nodejs/node/commit/1dcf8dfedb)] - **doc**: 将历史条目移到类描述中 (Luigi Pinca) [#55991](https://github.com/nodejs/node/pull/55991)
* \[[`e016f68c73`](https://github.com/nodejs/node/commit/e016f68c73)] - **doc**: 为 textEncoder.encodeInto() 添加历史条目 (Luigi Pinca) [#55990](https://github.com/nodejs/node/pull/55990)
* \[[`1b31638262`](https://github.com/nodejs/node/commit/1b31638262)] - **doc**: 略微改进 GN 构建文档 (Shelley Vohr) [#55968](https://github.com/nodejs/node/pull/55968)
* \[[`d25bcfd0b2`](https://github.com/nodejs/node/commit/d25bcfd0b2)] - **doc**: 删除令人困惑且过时的句子 (Luigi Pinca) [#55988](https://github.com/nodejs/node/pull/55988)
* \[[`65c1784337`](https://github.com/nodejs/node/commit/65c1784337)] - **doc**: 为 PerformanceObserver.takeRecords() 添加文档 (skyclouds2001) [#55786](https://github.com/nodejs/node/pull/55786)
* \[[`682ae41f86`](https://github.com/nodejs/node/commit/682ae41f86)] - **doc**: 将已审核课程添加到大使福利中 (Matteo Collina) [#55934](https://github.com/nodejs/node/pull/55934)
* \[[`9b6cc54b50`](https://github.com/nodejs/node/commit/9b6cc54b50)] - **doc**: 记录如何为推广添加消息 (Michael Dawson) [#55843](https://github.com/nodejs/node/pull/55843)
* \[[`db5378c8b9`](https://github.com/nodejs/node/commit/db5378c8b9)] - **doc**: 为 zlib 添加 esm 示例 (Leonardo Peixoto) [#55946](https://github.com/nodejs/node/pull/55946)
* \[[`58a6fbb9cf`](https://github.com/nodejs/node/commit/58a6fbb9cf)] - **doc**: 记录在依赖中构建 wasm 的方法 (Michael Dawson) [#55940](https://github.com/nodejs/node/pull/55940)
* \[[`41e3bcd752`](https://github.com/nodejs/node/commit/41e3bcd752)] - **doc**: 为 node:timers 添加 esm 示例 (Alfredo González) [#55857](https://github.com/nodejs/node/pull/55857)
* \[[`61de8f9b04`](https://github.com/nodejs/node/commit/61de8f9b04)] - **doc**: 在步骤中包含 git node release --promote (Rafael Gonzaga) [#55835](https://github.com/nodejs/node/pull/55835)
* \[[`559a0bfa2e`](https://github.com/nodejs/node/commit/559a0bfa2e)] - **doc**: 添加关于 console 流行为的说明 (Gireesh Punathil) [#55616](https://github.com/nodejs/node/pull/55616)
* \[[`3d11a85fe5`](https://github.com/nodejs/node/commit/3d11a85fe5)] - **doc**: 添加 `-S` 标志的发布准备示例 (Antoine du Hamel) [#55836](https://github.com/nodejs/node/pull/55836)
* \[[`955690e6cf`](https://github.com/nodejs/node/commit/955690e6cf)] - **doc**: 澄清 UV_THREADPOOL_SIZE 环境变量的用法 (Preveen P) [#55832](https://github.com/nodejs/node/pull/55832)
* \[[`d6738e919a`](https://github.com/nodejs/node/commit/d6738e919a)] - **doc**: 在安全修复发布中添加值得注意的变更说明 (Rafael Gonzaga) [#55830](https://github.com/nodejs/node/pull/55830)
* \[[`79876f0dfd`](https://github.com/nodejs/node/commit/79876f0dfd)] - **doc**: 修复 `URL.prototype.toJSON` 的历史信息 (Antoine du Hamel) [#55818](https://github.com/nodejs/node/pull/55818)
* \[[`c14776fbaa`](https://github.com/nodejs/node/commit/c14776fbaa)] - **doc**: 修正 max-semi-space-size 的说明 (Joe Bowbeer) [#55812](https://github.com/nodejs/node/pull/55812)
* \[[`83b415e8f3`](https://github.com/nodejs/node/commit/83b415e8f3)] - **doc**: 运行 license-builder (github-actions[bot]) [#55813](https://github.com/nodejs/node/pull/55813)
* \[[`07f53b1d75`](https://github.com/nodejs/node/commit/07f53b1d75)] - **doc**: 澄清 triager 角色 (Gireesh Punathil) [#55775](https://github.com/nodejs/node/pull/55775)
* \[[`2abfdefcf3`](https://github.com/nodejs/node/commit/2abfdefcf3)] - **doc**: 澄清移除实验性 API 不需要弃用声明 (Antoine du Hamel) [#55746](https://github.com/nodejs/node/pull/55746)
* \[[`39b89e90b4`](https://github.com/nodejs/node/commit/39b89e90b4)] - **doc**: 对 semver-major 版本发布执行严格策略 (Rafael Gonzaga) [#55732](https://github.com/nodejs/node/pull/55732)
* \[[`d0417eaec9`](https://github.com/nodejs/node/commit/d0417eaec9)] - **doc**: 在 `path.md` 中添加 esm 示例 (Aviv Keller) [#55745](https://github.com/nodejs/node/pull/55745)
* \[[`032ff07a2d`](https://github.com/nodejs/node/commit/032ff07a2d)] - **doc**: 统一使用 child process 一词 (Gireesh Punathil) [#55654](https://github.com/nodejs/node/pull/55654)
* \[[`16eef6461e`](https://github.com/nodejs/node/commit/16eef6461e)] - **doc**: 提高清楚度，说明可用的 addon 选项 (Preveen P) [#55715](https://github.com/nodejs/node/pull/55715)
* \[[`a7ce82e3cc`](https://github.com/nodejs/node/commit/a7ce82e3cc)] - **doc**: 更新 `--max-semi-space-size` 的说明 (Joe Bowbeer) [#55495](https://github.com/nodejs/node/pull/55495)
* \[[`1bb461e2b6`](https://github.com/nodejs/node/commit/1bb461e2b6)] - **doc**: 按照示例代码意图，为打开文件时添加写入标志 (robberfree) [#54626](https://github.com/nodejs/node/pull/54626)
* \[[`8cd619f8d7`](https://github.com/nodejs/node/commit/8cd619f8d7)] - **doc**: 移除 crypto.diffieHellman 中关于 ECDH-ES 的提及 (Filip Skokan) [#55611](https://github.com/nodejs/node/pull/55611)
* \[[`4576d14d0f`](https://github.com/nodejs/node/commit/4576d14d0f)] - **doc**: 改进 c++ embedder API 文档 (Gireesh Punathil) [#55597](https://github.com/nodejs/node/pull/55597)
* \[[`12bd57fbaa`](https://github.com/nodejs/node/commit/12bd57fbaa)] - **doc**: 将 "MIT License" 首字母大写 (Aviv Keller) [#55575](https://github.com/nodejs/node/pull/55575)
* \[[`362b01b275`](https://github.com/nodejs/node/commit/362b01b275)] - **doc**: 为 node:string_decoder 添加 esm 示例 (Alfredo González) [#55507](https://github.com/nodejs/node/pull/55507)
* \[[`29862ae105`](https://github.com/nodejs/node/commit/29862ae105)] - **doc**: 将 jazelly 添加为协作者 (Jason Zhang) [#55531](https://github.com/nodejs/node/pull/55531)
* \[[`c1b63e5e6b`](https://github.com/nodejs/node/commit/c1b63e5e6b)] - **doc**: 更改用于验证 SHASUMS256 的命令 (adriancuadrado) [#55420](https://github.com/nodejs/node/pull/55420)
* \[[`9db657532b`](https://github.com/nodejs/node/commit/9db657532b)] - **doc**: 为 child_process 中的 stdio 流添加说明 (Ederin (Ed) Igharoro) [#55322](https://github.com/nodejs/node/pull/55322)
* \[[`475e478713`](https://github.com/nodejs/node/commit/475e478713)] - **doc**: 将 `isBigIntObject` 添加到文档中 (leviscar) [#55450](https://github.com/nodejs/node/pull/55450)
* \[[`0487e70475`](https://github.com/nodejs/node/commit/0487e70475)] - **doc**: 移除 fs 中关于 `highWaterMark` 的过时说明 (Ian Kerins) [#55462](https://github.com/nodejs/node/pull/55462)
* \[[`e9a8feb44a`](https://github.com/nodejs/node/commit/e9a8feb44a)] - **doc**: 将 Danielle Adams 的 key 移到旧 gpg keys 中 (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
* \[[`bfbe651626`](https://github.com/nodejs/node/commit/bfbe651626)] - **doc**: 将 Bryan English 的 key 移到旧 gpg keys 中 (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
* \[[`c1cab9b4d7`](https://github.com/nodejs/node/commit/c1cab9b4d7)] - **doc**: 将 Beth Griggs 的 keys 移到旧 gpg keys 中 (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
* \[[`85d8eb397c`](https://github.com/nodejs/node/commit/85d8eb397c)] - **doc**: 明确条件限制 (Jan Martin) [#55187](https://github.com/nodejs/node/pull/55187)
* \[[`de8de542b5`](https://github.com/nodejs/node/commit/de8de542b5)] - **doc**: 为 buffer 文档添加缺失的返回值 (Karl Horky) [#55273](https://github.com/nodejs/node/pull/55273)
* \[[`a5df7087fd`](https://github.com/nodejs/node/commit/a5df7087fd)] - **doc**: 修复 ambasador markdown 列表 (Rafael Gonzaga) [#55361](https://github.com/nodejs/node/pull/55361)
* \[[`fbfcb0cc08`](https://github.com/nodejs/node/commit/fbfcb0cc08)] - **doc**: 编辑 onboarding 指南以说明何时需要添加 mailmap (Antoine du Hamel) [#55334](https://github.com/nodejs/node/pull/55334)
* \[[`e70abce96a`](https://github.com/nodejs/node/commit/e70abce96a)] - **doc**: 修复 outgoingMessage.setHeaders() 的返回类型 (Jimmy Leung) [#55290](https://github.com/nodejs/node/pull/55290)
* \[[`030f155986`](https://github.com/nodejs/node/commit/030f155986)] - **esm**: 将 import attributes 和 JSON 模块标记为稳定版 (Nicolò Ribaudo) [#55333](https://github.com/nodejs/node/pull/55333)
* \[[`86cb697b81`](https://github.com/nodejs/node/commit/86cb697b81)] - **esm**: 在 importer 不是文件时添加回退方案 (Antoine du Hamel) [#55471](https://github.com/nodejs/node/pull/55471)
* \[[`8c8de30680`](https://github.com/nodejs/node/commit/8c8de30680)] - **esm**: 修复 `resolve` 钩子中 `importAssertion` 的不一致问题 (Wei Zhu) [#55365](https://github.com/nodejs/node/pull/55365)
* \[[`a41b0e1247`](https://github.com/nodejs/node/commit/a41b0e1247)] - **events**: 优化 EventTarget.addEventListener (Robert Nagy) [#55312](https://github.com/nodejs/node/pull/55312)
* \[[`2c6dcf7209`](https://github.com/nodejs/node/commit/2c6dcf7209)] - **fs**: 让 Promise 版 `readdir()` 中对 `options` 的修改不影响结果 (LiviaMedeiros) [#56057](https://github.com/nodejs/node/pull/56057)
* \[[`9317feb829`](https://github.com/nodejs/node/commit/9317feb829)] - **fs**: 延迟加载 ReadFileContext (Gürgün Dayıoğlu) [#55998](https://github.com/nodejs/node/pull/55998)
* \[[`739ee18430`](https://github.com/nodejs/node/commit/739ee18430)] - **http2**: 支持 ALPNCallback 选项 (ZYSzys) [#56187](https://github.com/nodejs/node/pull/56187)
* \[[`7ba6dcf180`](https://github.com/nodejs/node/commit/7ba6dcf180)] - **http2**: 修复因过早移除监听器导致的内存泄漏 (ywave620) [#55966](https://github.com/nodejs/node/pull/55966)
* \[[`4c15bd44a0`](https://github.com/nodejs/node/commit/4c15bd44a0)] - **http2**: 修复客户端异步存储持久化 (Orgad Shaneh) [#55460](https://github.com/nodejs/node/pull/55460)
* \[[`ac57dadd9a`](https://github.com/nodejs/node/commit/ac57dadd9a)] - **lib**: 为 compileFunction 中的选项添加校验 (Taejin Kim) [#56023](https://github.com/nodejs/node/pull/56023)
* \[[`a5b0d8900a`](https://github.com/nodejs/node/commit/a5b0d8900a)] - **lib**: 移除用于字符检查的 startsWith/endsWith primordials (Gürgün Dayıoğlu) [#55407](https://github.com/nodejs/node/pull/55407)
* \[[`f10857828f`](https://github.com/nodejs/node/commit/f10857828f)] - **lib**: test_runner#mock:timers 遵守 timeout_max 行为 (BadKey) [#55375](https://github.com/nodejs/node/pull/55375)
* \[[`1a193bf256`](https://github.com/nodejs/node/commit/1a193bf256)] - **meta**: 将 github/codeql-action 从 3.27.0 升级到 3.27.5 (dependabot[bot]) [#56103](https://github.com/nodejs/node/pull/56103)
* \[[`23f319803d`](https://github.com/nodejs/node/commit/23f319803d)] - **meta**: 将 actions/checkout 从 4.1.7 升级到 4.2.2 (dependabot[bot]) [#56102](https://github.com/nodejs/node/pull/56102)
* \[[`a953301a1c`](https://github.com/nodejs/node/commit/a953301a1c)] - **meta**: 将 step-security/harden-runner 从 2.10.1 升级到 2.10.2 (dependabot[bot]) [#56101](https://github.com/nodejs/node/pull/56101)
* \[[`c58065ae77`](https://github.com/nodejs/node/commit/c58065ae77)] - **meta**: 将 actions/setup-node 从 4.0.3 升级到 4.1.0 (dependabot[bot]) [#56100](https://github.com/nodejs/node/pull/56100)
* \[[`12b0cecc20`](https://github.com/nodejs/node/commit/12b0cecc20)] - **meta**: 将 releasers 作为 CODEOWNERS 添加到 proposal action 中 (Rafael Gonzaga) [#56043](https://github.com/nodejs/node/pull/56043)
* \[[`070aa9d6a5`](https://github.com/nodejs/node/commit/070aa9d6a5)] - **meta**: 将 actions/setup-python 从 5.2.0 升级到 5.3.0 (dependabot[bot]) [#55688](https://github.com/nodejs/node/pull/55688)
* \[[`7a46ffd18a`](https://github.com/nodejs/node/commit/7a46ffd18a)] - **meta**: 将 actions/setup-node 从 4.0.4 升级到 4.1.0 (dependabot[bot]) [#55687](https://github.com/nodejs/node/pull/55687)
* \[[`8b4f2e0c6a`](https://github.com/nodejs/node/commit/8b4f2e0c6a)] - **meta**: 将 rtCamp/action-slack-notify 从 2.3.0 升级到 2.3.2 (dependabot[bot]) [#55686](https://github.com/nodejs/node/pull/55686)
* \[[`024c5b2ab3`](https://github.com/nodejs/node/commit/024c5b2ab3)] - **meta**: 将 actions/upload-artifact 从 4.4.0 升级到 4.4.3 (dependabot[bot]) [#55685](https://github.com/nodejs/node/pull/55685)
* \[[`3d06971a15`](https://github.com/nodejs/node/commit/3d06971a15)] - **meta**: 将 actions/cache 从 4.0.2 升级到 4.1.2 (dependabot[bot]) [#55684](https://github.com/nodejs/node/pull/55684)
* \[[`c33de63a86`](https://github.com/nodejs/node/commit/c33de63a86)] - **meta**: 将 actions/checkout 从 4.2.0 升级到 4.2.2 (dependabot[bot]) [#55683](https://github.com/nodejs/node/pull/55683)
* \[[`ccc1ea0576`](https://github.com/nodejs/node/commit/ccc1ea0576)] - **meta**: 将 github/codeql-action 从 3.26.10 升级到 3.27.0 (dependabot[bot]) [#55682](https://github.com/nodejs/node/pull/55682)
* \[[`9c2d0fd242`](https://github.com/nodejs/node/commit/9c2d0fd242)] - **meta**: 使 review-wanted 消息更精简 (Aviv Keller) [#55607](https://github.com/nodejs/node/pull/55607)
* \[[`0c14cae2b2`](https://github.com/nodejs/node/commit/0c14cae2b2)] - **meta**: 在 review-wanted 中显示 PR/issue 标题 (Aviv Keller) [#55606](https://github.com/nodejs/node/pull/55606)
* \[[`aeae7e1e6f`](https://github.com/nodejs/node/commit/aeae7e1e6f)] - **meta**: 将一名或多名协作者移至 emeritus (Node.js GitHub Bot) [#55381](https://github.com/nodejs/node/pull/55381)
* \[[`6d7b78c3d8`](https://github.com/nodejs/node/commit/6d7b78c3d8)] - **meta**: 将通知 review-wanted 的颜色改为蓝色 (Rafael Gonzaga) [#55423](https://github.com/nodejs/node/pull/55423)
* \[[`7441e289db`](https://github.com/nodejs/node/commit/7441e289db)] - **meta**: 将 codecov/codecov-action 从 4.5.0 升级到 4.6.0 (dependabot[bot]) [#55222](https://github.com/nodejs/node/pull/55222)
* \[[`158c8ad77c`](https://github.com/nodejs/node/commit/158c8ad77c)] - **meta**: 将 github/codeql-action 从 3.26.6 升级到 3.26.10 (dependabot[bot]) [#55221](https://github.com/nodejs/node/pull/55221)
* \[[`8d3d4a9fab`](https://github.com/nodejs/node/commit/8d3d4a9fab)] - **meta**: 将 step-security/harden-runner 从 2.9.1 升级到 2.10.1 (dependabot[bot]) [#55220](https://github.com/nodejs/node/pull/55220)
* \[[`6797a35a5b`](https://github.com/nodejs/node/commit/6797a35a5b)] - **module**: 防止主线程在 esm worker 结束前退出 (Shima Ryuhei) [#56183](https://github.com/nodejs/node/pull/56183)
* \[[`bd99bf109f`](https://github.com/nodejs/node/commit/bd99bf109f)] - **node-api**: 允许在 finalizers 中使用 napi_delete_reference (Chengzhong Wu) [#55620](https://github.com/nodejs/node/pull/55620)
* \[[`6308c18dbb`](https://github.com/nodejs/node/commit/6308c18dbb)] - **report**: 修复在 getReport libuv 中使用 exclude-network 时的网络查询 (Adrien Foulon) [#55602](https://github.com/nodejs/node/pull/55602)
* \[[`ff2eec7275`](https://github.com/nodejs/node/commit/ff2eec7275)] - **sea**: 仅对主线程断言 snapshot main function (Joyee Cheung) [#56120](https://github.com/nodejs/node/pull/56120)
* \[[`f9f3003de7`](https://github.com/nodejs/node/commit/f9f3003de7)] - **src**: 修复过时的 js2c.cc 引用 (Chengzhong Wu) [#56133](https://github.com/nodejs/node/pull/56133)
* \[[`a882536596`](https://github.com/nodejs/node/commit/a882536596)] - **src**: 修复 Windows 上的 kill 信号 (Hüseyin Açacak) [#55514](https://github.com/nodejs/node/pull/55514)
* \[[`df1002438a`](https://github.com/nodejs/node/commit/df1002438a)] - **src**: 改进 `node:os` 的 userInfo 性能 (Yagiz Nizipli) [#55719](https://github.com/nodejs/node/pull/55719)
* \[[`f17416ec3e`](https://github.com/nodejs/node/commit/f17416ec3e)] - **src**: 修复创建 NodeAresTask 失败时的 dns 崩溃 (theanarkh) [#55521](https://github.com/nodejs/node/pull/55521)
* \[[`8d5b8c31d8`](https://github.com/nodejs/node/commit/8d5b8c31d8)] - **src**: 在 NODE_DEFINE_CONSTANT 中使用 NewFromUtf8Literal (Charles Kerr) [#55581](https://github.com/nodejs/node/pull/55581)
* \[[`0977bb6c1d`](https://github.com/nodejs/node/commit/0977bb6c1d)] - **src**: 移除基于 icu 的 `ToASCII` 和 `ToUnicode` (Yagiz Nizipli) [#55156](https://github.com/nodejs/node/pull/55156)
* \[[`72817072e2`](https://github.com/nodejs/node/commit/72817072e2)] - **src**: 修复 winapi_strerror 错误字符串 (Hüseyin Açacak) [#55207](https://github.com/nodejs/node/pull/55207)
* \[[`6f47f53f90`](https://github.com/nodejs/node/commit/6f47f53f90)] - **src,lib**: 优化 nodeTiming.uvMetricsInfo (RafaelGSS) [#55614](https://github.com/nodejs/node/pull/55614)
* \[[`ac583d4549`](https://github.com/nodejs/node/commit/ac583d4549)] - **stream**: 传播 AbortSignal reason (Marvin ROGER) [#55473](https://github.com/nodejs/node/pull/55473)
* \[[`1c8b474319`](https://github.com/nodejs/node/commit/1c8b474319)] - **test**: 在 smartos 上跳过 test-buffer-tostring-range (Marco Ippolito) [#56727](https://github.com/nodejs/node/pull/56727)
* \[[`39d608f9d8`](https://github.com/nodejs/node/commit/39d608f9d8)] - **test**: 将 test-http-server-request-timeouts-mixed 标记为易波动 (Joyee Cheung) [#56503](https://github.com/nodejs/node/pull/56503)
* \[[`5c3f18be04`](https://github.com/nodejs/node/commit/5c3f18be04)] - **test**: 临时移除 fs 读写中的资源检查 (Rafael Gonzaga) [#56789](https://github.com/nodejs/node/pull/56789)
* \[[`4196aaf033`](https://github.com/nodejs/node/commit/4196aaf033)] - **test**: 移除 PPC 上 sea 测试的排除项 (Michael Dawson) [#56217](https://github.com/nodejs/node/pull/56217)
* \[[`3ea738fc26`](https://github.com/nodejs/node/commit/3ea738fc26)] - **test**: 移除 `hasOpenSSL3x` 工具函数 (Antoine du Hamel) [#56164](https://github.com/nodejs/node/pull/56164)
* \[[`21e21a270e`](https://github.com/nodejs/node/commit/21e21a270e)] - **test**: 移除 test-fs-utimes 的易波动标记 (Luigi Pinca) [#56052](https://github.com/nodejs/node/pull/56052)
* \[[`e464c6f7a5`](https://github.com/nodejs/node/commit/e464c6f7a5)] - **test**: 将 test-worker-arraybuffer-zerofill 移到并行执行 (Luigi Pinca) [#56053](https://github.com/nodejs/node/pull/56053)
* \[[`e99584cd57`](https://github.com/nodejs/node/commit/e99584cd57)] - **test**: 让 HTTP/1.0 连接测试更稳健 (Arne Keller) [#55959](https://github.com/nodejs/node/pull/55959)
* \[[`2d03f87ef7`](https://github.com/nodejs/node/commit/2d03f87ef7)] - **test**: 将 readdir 测试转换为使用 test runner (Thomas Chetwin) [#55750](https://github.com/nodejs/node/pull/55750)
* \[[`207562fa3d`](https://github.com/nodejs/node/commit/207562fa3d)] - **test**: 让 x509 crypto 测试可与 BoringSSL 配合工作 (Shelley Vohr) [#55927](https://github.com/nodejs/node/pull/55927)
* \[[`a17d9e1acf`](https://github.com/nodejs/node/commit/a17d9e1acf)] - **test**: 修复最低优先级的判定 (Livia Medeiros) [#55908](https://github.com/nodejs/node/pull/55908)
* \[[`50b6729d8c`](https://github.com/nodejs/node/commit/50b6729d8c)] - **test**: 提高 `pathToFileURL` 的覆盖率 (Antoine du Hamel) [#55493](https://github.com/nodejs/node/pull/55493)
* \[[`0aa9e74027`](https://github.com/nodejs/node/commit/0aa9e74027)] - **test**: 提高 child process 消息发送的测试覆盖率 (Juan José) [#55710](https://github.com/nodejs/node/pull/55710)
* \[[`ebdbbc3ec8`](https://github.com/nodejs/node/commit/ebdbbc3ec8)] - **test**: 确保测试优先级不高于当前优先级 (Livia Medeiros) [#55739](https://github.com/nodejs/node/pull/55739)
* \[[`b40789e085`](https://github.com/nodejs/node/commit/b40789e085)] - **test**: 为 fs_permission 测试添加 buffer (Rafael Gonzaga) [#55734](https://github.com/nodejs/node/pull/55734)
* \[[`a9998799be`](https://github.com/nodejs/node/commit/a9998799be)] - **test**: 提高 `ServerResponse` 的测试覆盖率 (Juan José) [#55711](https://github.com/nodejs/node/pull/55711)
* \[[`d2421f3c92`](https://github.com/nodejs/node/commit/d2421f3c92)] - **test**: 在 FW watch 测试中忽略无关事件 (Carlos Espa) [#55605](https://github.com/nodejs/node/pull/55605)
* \[[`0ac0afc4a9`](https://github.com/nodejs/node/commit/0ac0afc4a9)] - **test**: 重构部分 esm 测试 (Antoine du Hamel) [#55472](https://github.com/nodejs/node/pull/55472)
* \[[`0f8b8269d1`](https://github.com/nodejs/node/commit/0f8b8269d1)] - **test**: 拆分 test-runner-mock-timers 测试 (Julian Gassner) [#55506](https://github.com/nodejs/node/pull/55506)
* \[[`8f6462f40b`](https://github.com/nodejs/node/commit/8f6462f40b)] - **test**: 避免对大量元素调用 `apply()` (Livia Medeiros) [#55501](https://github.com/nodejs/node/pull/55501)
* \[[`e9b0ff482b`](https://github.com/nodejs/node/commit/e9b0ff482b)] - **test**: 提高 `http.OutgoingMessage.appendHeader()` 的测试覆盖率 (Juan José) [#55467](https://github.com/nodejs/node/pull/55467)
* \[[`d5ad060073`](https://github.com/nodejs/node/commit/d5ad060073)] - **test**: 修复 addons 和 node-api 测试假设 (Antoine du Hamel) [#55441](https://github.com/nodejs/node/pull/55441)
* \[[`a28376bb85`](https://github.com/nodejs/node/commit/a28376bb85)] - **test**: 修复 `test-cluster-shared-handle-bind-privileged-port` 的不稳定性 (Aviv Keller) [#55378](https://github.com/nodejs/node/pull/55378)
* \[[`22c07867d1`](https://github.com/nodejs/node/commit/22c07867d1)] - **test**: 移除重复测试 (Luigi Pinca) [#55393](https://github.com/nodejs/node/pull/55393)
* \[[`5489656b35`](https://github.com/nodejs/node/commit/5489656b35)] - **test**: 为覆盖率更新 test_util.cc (minkyu_kim) [#55291](https://github.com/nodejs/node/pull/55291)
* \[[`ceafb3250d`](https://github.com/nodejs/node/commit/ceafb3250d)] - **test,crypto**: 让 crypto 测试可与 BoringSSL 配合工作 (Shelley Vohr) [#55491](https://github.com/nodejs/node/pull/55491)
* \[[`7021b3b276`](https://github.com/nodejs/node/commit/7021b3b276)] - **test_runner**: 简化 hook 运行逻辑 (Colin Ihrig) [#55963](https://github.com/nodejs/node/pull/55963)
* \[[`d9fd632f56`](https://github.com/nodejs/node/commit/d9fd632f56)] - **test_runner**: 在对已被 mock 的日期进行 mock 时抛出错误 (Aviv Keller) [#55858](https://github.com/nodejs/node/pull/55858)
* \[[`3fcca16374`](https://github.com/nodejs/node/commit/3fcca16374)] - **test_runner**: 为 mock timers 添加对 scheduler.wait 的支持 (Erick Wendel) [#55244](https://github.com/nodejs/node/pull/55244)
* \[[`f67147ec47`](https://github.com/nodejs/node/commit/f67147ec47)] - **tools**: 将 github_reporter 更新到 1.7.2 (Node.js GitHub Bot) [#56205](https://github.com/nodejs/node/pull/56205)
* \[[`5c819f1043`](https://github.com/nodejs/node/commit/5c819f1043)] - **tools**: 在工作流中添加 REPLACEME 检查 (Mert Can Altin) [#56251](https://github.com/nodejs/node/pull/56251)
* \[[`b24a85b00b`](https://github.com/nodejs/node/commit/b24a85b00b)] - **tools**: 在发布提案中使用 `github.actor` 而不是 bot 用户名 (Antoine du Hamel) [#56232](https://github.com/nodejs/node/pull/56232)
* \[[`33cd7d3d8c`](https://github.com/nodejs/node/commit/33cd7d3d8c)] - **tools**: 修复发布提案 linter 以支持超过 1 位准备者 (Antoine du Hamel) [#56203](https://github.com/nodejs/node/pull/56203)
* \[[`10d55e3d73`](https://github.com/nodejs/node/commit/10d55e3d73)] - **tools**: 在创建发布提案时使用提交标题作为 PR 标题 (Antoine du Hamel) [#56165](https://github.com/nodejs/node/pull/56165)
* \[[`b3d40e3be5`](https://github.com/nodejs/node/commit/b3d40e3be5)] - **tools**: 改进发布提案 PR 的打开流程 (Antoine du Hamel) [#56161](https://github.com/nodejs/node/pull/56161)
* \[[`13455ca9ce`](https://github.com/nodejs/node/commit/13455ca9ce)] - **tools**: 更新 `create-release-proposal` 工作流 (Antoine du Hamel) [#56054](https://github.com/nodejs/node/pull/56054)
* \[[`851a3d7d8d`](https://github.com/nodejs/node/commit/851a3d7d8d)] - **tools**: 修复 update-undici 脚本 (Michaël Zasso) [#56069](https://github.com/nodejs/node/pull/56069)
* \[[`e1635fbd4e`](https://github.com/nodejs/node/commit/e1635fbd4e)] - **tools**: 允许从 forks 触发 `tools.yml` (Antoine du Hamel) [#56008](https://github.com/nodejs/node/pull/56008)
* \[[`5f15d8b3f5`](https://github.com/nodejs/node/commit/5f15d8b3f5)] - **tools**: 修复 nghttp3 更新脚本 (Antoine du Hamel) [#56007](https://github.com/nodejs/node/pull/56007)
* \[[`bbf39b8c46`](https://github.com/nodejs/node/commit/bbf39b8c46)] - **tools**: 过滤发布 keys 以减少交互 (Antoine du Hamel) [#55950](https://github.com/nodejs/node/pull/55950)
* \[[`954e60b87d`](https://github.com/nodejs/node/commit/954e60b87d)] - **tools**: 更新 WPT 更新器 (Antoine du Hamel) [#56003](https://github.com/nodejs/node/pull/56003)
* \[[`1e09d258da`](https://github.com/nodejs/node/commit/1e09d258da)] - **tools**: 为特定子系统添加 WPT 更新器 (Mert Can Altin) [#54460](https://github.com/nodejs/node/pull/54460)
* \[[`b95c4f5bf0`](https://github.com/nodejs/node/commit/b95c4f5bf0)] - **tools**: 使用无 token 的 Codecov 上传 (Michaël Zasso) [#55943](https://github.com/nodejs/node/pull/55943)
* \[[`6327554706`](https://github.com/nodejs/node/commit/6327554706)] - **tools**: 添加发布提交提案的 linter (Antoine du Hamel) [#55923](https://github.com/nodejs/node/pull/55923)
* \[[`aad478e58d`](https://github.com/nodejs/node/commit/aad478e58d)] - **tools**: 修复 commit-queue 的排除标签 (Richard Lau) [#55809](https://github.com/nodejs/node/pull/55809)
* \[[`1c8c881aef`](https://github.com/nodejs/node/commit/1c8c881aef)] - **tools**: 让 commit-queue 检查 blocked 标签 (Marco Ippolito) [#55781](https://github.com/nodejs/node/pull/55781)
* \[[`c3913f9c87`](https://github.com/nodejs/node/commit/c3913f9c87)] - **tools**: 修复 Node.js 18 的 c-ares 更新脚本 (Richard Lau) [#55717](https://github.com/nodejs/node/pull/55717)
* \[[`adfc2f993a`](https://github.com/nodejs/node/commit/adfc2f993a)] - **tools**: 修复根证书更新器 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
* \[[`d336f8de15`](https://github.com/nodejs/node/commit/d336f8de15)] - **tools**: 在 daily-wpt-fyi.yml 动作中压缩 jq 输出 (Filip Skokan) [#55695](https://github.com/nodejs/node/pull/55695)
* \[[`cdb7839a0c`](https://github.com/nodejs/node/commit/cdb7839a0c)] - **tools**: 在所有受支持的版本上运行每日 WPT.fyi 报告 (Filip Skokan) [#55619](https://github.com/nodejs/node/pull/55619)
* \[[`274d0b4062`](https://github.com/nodejs/node/commit/274d0b4062)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#55470](https://github.com/nodejs/node/pull/55470)
* \[[`3dceeb8b15`](https://github.com/nodejs/node/commit/3dceeb8b15)] - **tools**: 添加用于同步 c-ares 源列表的脚本 (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
* \[[`bd0ec907da`](https://github.com/nodejs/node/commit/bd0ec907da)] - **url**: 在 `pathToFileURL` 中正确处理“unsafe”字符 (Antoine du Hamel) [#54545](https://github.com/nodejs/node/pull/54545)
* \[[`83137bceb6`](https://github.com/nodejs/node/commit/83137bceb6)] - **util**: 修复 Latin1 解码以返回字符串输出 (Mert Can Altin) [#56222](https://github.com/nodejs/node/pull/56222)
* \[[`195cc42935`](https://github.com/nodejs/node/commit/195cc42935)] - **util**: 不依赖可变的 `Object` 和 `Function` 的 `constructor` 属性 (Antoine du Hamel) [#56188](https://github.com/nodejs/node/pull/56188)
* \[[`cca7c518de`](https://github.com/nodejs/node/commit/cca7c518de)] - **util**: 为 Latin1 解码添加快速路径 (Mert Can Altin) [#55275](https://github.com/nodejs/node/pull/55275)
* \[[`7ed346d8fd`](https://github.com/nodejs/node/commit/7ed346d8fd)] - **util**: 不再捕获循环 `@@toStringTag` 错误 (Aviv Keller) [#55544](https://github.com/nodejs/node/pull/55544)
* \[[`aa031b3eec`](https://github.com/nodejs/node/commit/aa031b3eec)] - **worker**: 修复 worker 在退出后加入时的崩溃 (Stephen Belanger) [#56191](https://github.com/nodejs/node/pull/56191)

<a id="20.18.2"></a>

## 2025-01-21，版本 20.18.2 'Iron' (LTS)，@RafaelGSS

这是一个安全更新。

### 重要变更

* CVE-2025-23083 - 在启用权限模型时，对 InternalWorker 的使用抛出错误（高）
* CVE-2025-23085 - src: 修复过早关闭和 ERR\_PROTO 时的 HTTP2 内存泄漏（中）
* CVE-2025-23084 - path: 修复 Windows 上 normalize() 中的路径穿越（中）

依赖更新：

* CVE-2025-22150 - undici fetch() 中使用了不够随机的值（中）

### 提交

* \[[`df8b9f2c3e`](https://github.com/nodejs/node/commit/df8b9f2c3e)] - **(CVE-2025-22150)** **deps**: 将 undici 更新到 v6.21.1（Matteo Collina）[nodejs-private/node-private#663](https://github.com/nodejs-private/node-private/pull/663)
* \[[`42d5821873`](https://github.com/nodejs/node/commit/42d5821873)] - **(CVE-2025-23084)** **path**: 修复 Windows 上 normalize() 中的路径穿越（Tobias Nießen）[nodejs-private/node-private#555](https://github.com/nodejs-private/node-private/pull/555)
* \[[`8187a4b9bb`](https://github.com/nodejs/node/commit/8187a4b9bb)] - **src**: 修复过早关闭和 ERR\_PROTO 时的 HTTP2 内存泄漏（RafaelGSS）
* \[[`389f239a28`](https://github.com/nodejs/node/commit/389f239a28)] - **(CVE-2025-23083)** **src,loader,permission**: 在使用 InternalWorker 时抛出错误（RafaelGSS）[nodejs-private/node-private#652](https://github.com/nodejs-private/node-private/pull/652)

<a id="20.18.1"></a>

## 2024-11-20，版本 20.18.1 'Iron' (LTS)，@marco-ippolito

### 重要变更

* \[[`7a8992b2d6`](https://github.com/nodejs/node/commit/7a8992b2d6)] - **doc**: 将 abmusse 添加到协作者（Abdirahim Musse）[#55086](https://github.com/nodejs/node/pull/55086)

### 提交

* \[[`085c3441fe`](https://github.com/nodejs/node/commit/085c3441fe)] - **assert**: 在带有自定义消息的深度比较数据时显示 diff（Giovanni）[#54759](https://github.com/nodejs/node/pull/54759)
* \[[`01f0b0e7b4`](https://github.com/nodejs/node/commit/01f0b0e7b4)] - **benchmark**: 为 deepEqual 对象调整配置（Rafael Gonzaga）[#55254](https://github.com/nodejs/node/pull/55254)
* \[[`a45537269b`](https://github.com/nodejs/node/commit/a45537269b)] - **benchmark**: 重写 detect-esm-syntax 基准测试（Joyee Cheung）[#55238](https://github.com/nodejs/node/pull/55238)
* \[[`1a0d8ef64f`](https://github.com/nodejs/node/commit/1a0d8ef64f)] - **benchmark**: 为 process.has 基准测试添加 no-warnings（Rafael Gonzaga）[#55159](https://github.com/nodejs/node/pull/55159)
* \[[`2be5d611ce`](https://github.com/nodejs/node/commit/2be5d611ce)] - **benchmark**: 为 typescript 创建基准测试（Marco Ippolito）[#54904](https://github.com/nodejs/node/pull/54904)
* \[[`a2aa4fa477`](https://github.com/nodejs/node/commit/a2aa4fa477)] - **benchmark**: 将 ascii 纳入 fs/readfile（Rafael Gonzaga）[#54988](https://github.com/nodejs/node/pull/54988)
* \[[`09849105fe`](https://github.com/nodejs/node/commit/09849105fe)] - **benchmark**: 添加 dotenv 基准测试（Aviv Keller）[#54278](https://github.com/nodejs/node/pull/54278)
* \[[`6b3c24dbad`](https://github.com/nodejs/node/commit/6b3c24dbad)] - **buffer**: 修复 toString 越界问题（Jason Zhang）[#54553](https://github.com/nodejs/node/pull/54553)
* \[[`f25a5b6dc4`](https://github.com/nodejs/node/commit/f25a5b6dc4)] - **build**: 使用 rclone 替代 aws CLI（Michaël Zasso）[#55617](https://github.com/nodejs/node/pull/55617)
* \[[`0bbeb605de`](https://github.com/nodejs/node/commit/0bbeb605de)] - **build**: 修复 notify-on-review-wanted action（Rafael Gonzaga）[#55304](https://github.com/nodejs/node/pull/55304)
* \[[`5b35836732`](https://github.com/nodejs/node/commit/5b35836732)] - **build**: 在 coverage 工作流中包含 `.nycrc`（Wuli Zuo）[#55210](https://github.com/nodejs/node/pull/55210)
* \[[`f38d1e90e0`](https://github.com/nodejs/node/commit/f38d1e90e0)] - **build**: 在 review-wanted 时通过 slack 通知（Rafael Gonzaga）[#55102](https://github.com/nodejs/node/pull/55102)
* \[[`0b985ec4bb`](https://github.com/nodejs/node/commit/0b985ec4bb)] - **build**: 移除 -v 标志以减少噪音（iwuliz）[#55025](https://github.com/nodejs/node/pull/55025)
* \[[`09f75b27a1`](https://github.com/nodejs/node/commit/09f75b27a1)] - **build**: 在 test-macOS 工作流中显示构建后的可用磁盘空间（iwuliz）[#55025](https://github.com/nodejs/node/pull/55025)
* \[[`f25760c4a2`](https://github.com/nodejs/node/commit/f25760c4a2)] - **build**: 在 vcbuild.bat 中添加生成 compile\_commands.json 的选项（Segev Finer）[#52279](https://github.com/nodejs/node/pull/52279)
* \[[`746e78c4f3`](https://github.com/nodejs/node/commit/746e78c4f3)] - _**Revert**_ "**build**: 将 clang-format 升级到 v18"（Chengzhong Wu）[#54994](https://github.com/nodejs/node/pull/54994)
* \[[`67834ee646`](https://github.com/nodejs/node/commit/67834ee646)] - **build**: 为 py 和 yml 打印 `Running XYZ linter...`（Aviv Keller）[#54386](https://github.com/nodejs/node/pull/54386)
* \[[`ae34e276a2`](https://github.com/nodejs/node/commit/ae34e276a2)] - **build**: 将 doc 工作流锁定到 Node.js 20（Richard Lau）[#55755](https://github.com/nodejs/node/pull/55755)
* \[[`d0e871a706`](https://github.com/nodejs/node/commit/d0e871a706)] - **build,win**: 添加 winget 配置以设置环境（Hüseyin Açacak）[#54729](https://github.com/nodejs/node/pull/54729)
* \[[`93ac799b6b`](https://github.com/nodejs/node/commit/93ac799b6b)] - **cli**: 修复端口范围错误的间距（Aviv Keller）[#54495](https://github.com/nodejs/node/pull/54495)
* \[[`3ba2e7bf97`](https://github.com/nodejs/node/commit/3ba2e7bf97)] - _**Revert**_ "**console**: 为 console error 和 warn 着色"（Aviv Keller）[#54677](https://github.com/nodejs/node/pull/54677)
* \[[`2f678ea53b`](https://github.com/nodejs/node/commit/2f678ea53b)] - **crypto**: 确保无效的 SubtleCrypto JWK 数据导入会产生 DataError（Filip Skokan）[#55041](https://github.com/nodejs/node/pull/55041)
* \[[`5d28d98542`](https://github.com/nodejs/node/commit/5d28d98542)] - **deps**: 将 undici 更新到 6.20.0（Node.js GitHub Bot）[#55329](https://github.com/nodejs/node/pull/55329)
* \[[`0c7f2fc421`](https://github.com/nodejs/node/commit/0c7f2fc421)] - **deps**: 更新 openssl-3.0.15+quic1 的 archs 文件（Node.js GitHub Bot）[#55184](https://github.com/nodejs/node/pull/55184)
* \[[`da15e7edf5`](https://github.com/nodejs/node/commit/da15e7edf5)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.15+quic1（Node.js GitHub Bot）[#55184](https://github.com/nodejs/node/pull/55184)
* \[[`381f1f9d08`](https://github.com/nodejs/node/commit/381f1f9d08)] - **deps**: 更新 openssl-3.0.14+quic1 的 archs 文件（Node.js GitHub Bot）[#54336](https://github.com/nodejs/node/pull/54336)
* \[[`48d643f78a`](https://github.com/nodejs/node/commit/48d643f78a)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.14+quic1（Node.js GitHub Bot）[#54336](https://github.com/nodejs/node/pull/54336)
* \[[`7b1796803b`](https://github.com/nodejs/node/commit/7b1796803b)] - **deps**: 将时区数据更新到 2024b（Node.js GitHub Bot）[#55056](https://github.com/nodejs/node/pull/55056)
* \[[`8f1956c588`](https://github.com/nodejs/node/commit/8f1956c588)] - **deps**: 将 acorn-walk 更新到 8.3.4（Node.js GitHub Bot）[#54950](https://github.com/nodejs/node/pull/54950)
* \[[`20501a7350`](https://github.com/nodejs/node/commit/20501a7350)] - **deps**: 将 corepack 更新到 0.29.4（Node.js GitHub Bot）[#54845](https://github.com/nodejs/node/pull/54845)
* \[[`0f81eafecc`](https://github.com/nodejs/node/commit/0f81eafecc)] - **doc**: 修复 Markdown linter（Antoine du Hamel）[#55344](https://github.com/nodejs/node/pull/55344)
* \[[`df713f0a98`](https://github.com/nodejs/node/commit/df713f0a98)] - _**Revert**_ "**doc**: 更新 test context.assert"（Antoine du Hamel）[#55344](https://github.com/nodejs/node/pull/55344)
* \[[`fd6fc61d2c`](https://github.com/nodejs/node/commit/fd6fc61d2c)] - **doc**: 将 pmarchini 添加到协作者（Pietro Marchini）[#55331](https://github.com/nodejs/node/pull/55331)
* \[[`b963db9ee2`](https://github.com/nodejs/node/commit/b963db9ee2)] - **doc**: 修复使用 `AbortSignal` 的 `events.once()` 示例（Ivo Janssen）[#55144](https://github.com/nodejs/node/pull/55144)
* \[[`50b13bfb12`](https://github.com/nodejs/node/commit/50b13bfb12)] - **doc**: 添加大使项目的入门细节（Marco Ippolito）[#55284](https://github.com/nodejs/node/pull/55284)
* \[[`27564b7811`](https://github.com/nodejs/node/commit/27564b7811)] - **doc**: 修复 autoSelectFamily 的初始默认值（Ihor Rohovets）[#55245](https://github.com/nodejs/node/pull/55245)
* \[[`9e7be23aa5`](https://github.com/nodejs/node/commit/9e7be23aa5)] - **doc**: 调整入门说明（Michael Dawson）[#55212](https://github.com/nodejs/node/pull/55212)
* \[[`f412a029c3`](https://github.com/nodejs/node/commit/f412a029c3)] - **doc**: 更新 test context.assert（Pietro Marchini）[#55186](https://github.com/nodejs/node/pull/55186)
* \[[`2f7828debb`](https://github.com/nodejs/node/commit/2f7828debb)] - **doc**: 修复无序错误锚点（Antoine du Hamel）[#55242](https://github.com/nodejs/node/pull/55242)
* \[[`d08e4c235b`](https://github.com/nodejs/node/commit/d08e4c235b)] - **doc**: 在实验性权限中提及 addons（Rafael Gonzaga）[#55166](https://github.com/nodejs/node/pull/55166)
* \[[`d65c2458dc`](https://github.com/nodejs/node/commit/d65c2458dc)] - **doc**: 在稳定性状态中使用正确的破折号（Antoine du Hamel）[#55200](https://github.com/nodejs/node/pull/55200)
* \[[`d9839c16cf`](https://github.com/nodejs/node/commit/d9839c16cf)] - **doc**: 修复 `test/README.md` 中的链接（Livia Medeiros）[#55165](https://github.com/nodejs/node/pull/55165)
* \[[`1ad659afa4`](https://github.com/nodejs/node/commit/1ad659afa4)] - **doc**: 为 node:net 添加 ESM 示例（Alfredo González）[#55134](https://github.com/nodejs/node/pull/55134)
* \[[`81ad69d50f`](https://github.com/nodejs/node/commit/81ad69d50f)] - **doc**: 移动 YAML changes 元素（sendoru）[#55112](https://github.com/nodejs/node/pull/55112)
* \[[`7a51a161be`](https://github.com/nodejs/node/commit/7a51a161be)] - **doc**: 修复 `modules.md` 中的 require resolve 算法（chirsz）[#55117](https://github.com/nodejs/node/pull/55117)
* \[[`80edcdf899`](https://github.com/nodejs/node/commit/80edcdf899)] - **doc**: 更新样式指南（Aviv Keller）[#53223](https://github.com/nodejs/node/pull/53223)
* \[[`388c754dd2`](https://github.com/nodejs/node/commit/388c754dd2)] - **doc**: 为 `run()` 的 `globPatterns` 补上缺失的 `:`（Aviv Keller）[#55135](https://github.com/nodejs/node/pull/55135)
* \[[`94302b6a76`](https://github.com/nodejs/node/commit/94302b6a76)] - **doc**: 将 abmusse 添加到协作者（Abdirahim Musse）[#55086](https://github.com/nodejs/node/pull/55086)
* \[[`27ff2da964`](https://github.com/nodejs/node/commit/27ff2da964)] - **doc**: 添加关于 `--expose-internals` 的说明（Aviv Keller）[#52861](https://github.com/nodejs/node/pull/52861)
* \[[`df6dc753b7`](https://github.com/nodejs/node/commit/df6dc753b7)] - **doc**: 从 REPL 文档中移除 `parseREPLKeyword`（Aviv Keller）[#54749](https://github.com/nodejs/node/pull/54749)
* \[[`4baa5c4d10`](https://github.com/nodejs/node/commit/4baa5c4d10)] - **doc**: 根据更新后的信息修改回迁指南（Aviv Keller）[#53746](https://github.com/nodejs/node/pull/53746)
* \[[`9947fc112f`](https://github.com/nodejs/node/commit/9947fc112f)] - **doc**: 为 `internal-api.md` 添加缺失的定义（Aviv Keller）[#53303](https://github.com/nodejs/node/pull/53303)
* \[[`a4586f0e94`](https://github.com/nodejs/node/commit/a4586f0e94)] - **doc**: 更新外部化依赖的文档（Michael Dawson）[#54792](https://github.com/nodejs/node/pull/54792)
* \[[`70504f8522`](https://github.com/nodejs/node/commit/70504f8522)] - **doc**: 更新 `require(ESM)` 的历史和稳定性状态（Antoine du Hamel）[#55199](https://github.com/nodejs/node/pull/55199)
* \[[`9d0041ac40`](https://github.com/nodejs/node/commit/9d0041ac40)] - **doc**: 为 aduh95 添加发布密钥（Antoine du Hamel）[#55349](https://github.com/nodejs/node/pull/55349)
* \[[`0c1666a52a`](https://github.com/nodejs/node/commit/0c1666a52a)] - **events**: 允许 null/undefined eventInitDict（Matthew Aitken）[#54643](https://github.com/nodejs/node/pull/54643)
* \[[`453df77f99`](https://github.com/nodejs/node/commit/453df77f99)] - **events**: 在分发时返回 `currentTarget`（Matthew Aitken）[#54642](https://github.com/nodejs/node/pull/54642)
* \[[`0decaab9db`](https://github.com/nodejs/node/commit/0decaab9db)] - **fs**: 在 `filehandle.createReadStream()` 中识别 `signal` 选项（Livia Medeiros）[#55148](https://github.com/nodejs/node/pull/55148)
* \[[`00a2fc7166`](https://github.com/nodejs/node/commit/00a2fc7166)] - **lib**: 将 `Symbol[Async]Dispose` polyfill 移到 `internal/util`（Antoine du Hamel）[#54853](https://github.com/nodejs/node/pull/54853)
* \[[`8e6b606ac4`](https://github.com/nodejs/node/commit/8e6b606ac4)] - **lib**: 移除 lib/internal/idna.js（Yagiz Nizipli）[#55050](https://github.com/nodejs/node/pull/55050)
* \[[`c96e5cb664`](https://github.com/nodejs/node/commit/c96e5cb664)] - **lib**: REPL 应能在 Array.prototype 方法被删除后继续运行（Jordan Harband）[#31457](https://github.com/nodejs/node/pull/31457)
* \[[`748ed2e559`](https://github.com/nodejs/node/commit/748ed2e559)] - **meta**: 将一位或多位协作者移至 emeritus（Node.js GitHub Bot）[#55300](https://github.com/nodejs/node/pull/55300)
* \[[`8b8d35f015`](https://github.com/nodejs/node/commit/8b8d35f015)] - **meta**: 将 mozilla-actions/sccache-action 从 0.0.5 升级到 0.0.6（dependabot\[bot]）[#55225](https://github.com/nodejs/node/pull/55225)
* \[[`d3441ff0c8`](https://github.com/nodejs/node/commit/d3441ff0c8)] - **meta**: 将 actions/checkout 从 4.1.7 升级到 4.2.0（dependabot\[bot]）[#55224](https://github.com/nodejs/node/pull/55224)
* \[[`1c20908558`](https://github.com/nodejs/node/commit/1c20908558)] - **meta**: 将 actions/setup-node 从 4.0.3 升级到 4.0.4（dependabot\[bot]）[#55223](https://github.com/nodejs/node/pull/55223)
* \[[`8a529abd69`](https://github.com/nodejs/node/commit/8a529abd69)] - **meta**: 将 peter-evans/create-pull-request 从 7.0.1 升级到 7.0.5（dependabot\[bot]）[#55219](https://github.com/nodejs/node/pull/55219)
* \[[`9053d210ab`](https://github.com/nodejs/node/commit/9053d210ab)] - **meta**: 为 abmusse 添加 mailmap 条目（Abdirahim Musse）[#55182](https://github.com/nodejs/node/pull/55182)
* \[[`db2496c125`](https://github.com/nodejs/node/commit/db2496c125)] - **meta**: 添加关于 nightly releases 的更多信息（Aviv Keller）[#55084](https://github.com/nodejs/node/pull/55084)
* \[[`d2ce003b2f`](https://github.com/nodejs/node/commit/d2ce003b2f)] - **meta**: 在协作者指南中为 OS 标签添加 `linux`（Aviv Keller）[#54986](https://github.com/nodejs/node/pull/54986)
* \[[`37b0bea247`](https://github.com/nodejs/node/commit/37b0bea247)] - **meta**: 移除从未使用过的工作流触发器（Aviv Keller）[#54983](https://github.com/nodejs/node/pull/54983)
* \[[`ae27e2dcd7`](https://github.com/nodejs/node/commit/ae27e2dcd7)] - **meta**: 添加替代 issue 跟踪器的链接（Aviv Keller）[#54401](https://github.com/nodejs/node/pull/54401)
* \[[`6e5d524b0f`](https://github.com/nodejs/node/commit/6e5d524b0f)] - **module**: 移除重复导入（Aviv Keller）[#54942](https://github.com/nodejs/node/pull/54942)
* \[[`3a682cca03`](https://github.com/nodejs/node/commit/3a682cca03)] - **path**: 移除 `posix.resolve` 中重复的条件运算符（Wiyeong Seo）[#54835](https://github.com/nodejs/node/pull/54835)
* \[[`ac1cb8dfdb`](https://github.com/nodejs/node/commit/ac1cb8dfdb)] - **perf\_hooks**: 为 getEntriesByName 添加缺失的类型参数（Luke Taher）[#54767](https://github.com/nodejs/node/pull/54767)
* \[[`85b3edc83b`](https://github.com/nodejs/node/commit/85b3edc83b)] - **repl**: 在换行检测中捕获 `\v` 和 `\r`（Aviv Keller）[#54512](https://github.com/nodejs/node/pull/54512)
* \[[`df1f04999e`](https://github.com/nodejs/node/commit/df1f04999e)] - **src**: 将原生错误消息解码为 UTF-8（Joyee Cheung）[#55024](https://github.com/nodejs/node/pull/55024)
* \[[`86d718177a`](https://github.com/nodejs/node/commit/86d718177a)] - **src**: 更新 clang-tidy 并侧重于现代化（Yagiz Nizipli）[#53757](https://github.com/nodejs/node/pull/53757)
* \[[`7d01b6a9c5`](https://github.com/nodejs/node/commit/7d01b6a9c5)] - **src**: 不再借助列表直接清理每个 env 的句柄（Chengzhong Wu）[#54993](https://github.com/nodejs/node/pull/54993)
* \[[`a730cdb622`](https://github.com/nodejs/node/commit/a730cdb622)] - **src**: 移除设置 AF\_INET 的重复代码（He Yang）[#54939](https://github.com/nodejs/node/pull/54939)
* \[[`f10d9ad283`](https://github.com/nodejs/node/commit/f10d9ad283)] - **stream**: 将 null asyncIterator 视为 undefined（Jason Zhang）[#55119](https://github.com/nodejs/node/pull/55119)
* \[[`6027084245`](https://github.com/nodejs/node/commit/6027084245)] - **test**: 让 `test-loaders-workers-spawned` 更不容易出错（Antoine du Hamel）[#55172](https://github.com/nodejs/node/pull/55172)
* \[[`66a87d19bd`](https://github.com/nodejs/node/commit/66a87d19bd)] - **test**: 将多个 assert 测试更新为使用 node:test（James M Snell）[#54585](https://github.com/nodejs/node/pull/54585)
* \[[`5105188c47`](https://github.com/nodejs/node/commit/5105188c47)] - **test**: 更新编码相关的 wpt 测试（devstone）[#55151](https://github.com/nodejs/node/pull/55151)
* \[[`81bcec0b82`](https://github.com/nodejs/node/commit/81bcec0b82)] - **test**: 修复 test/pummel/test-timers.js 的不稳定问题（jakecastelli）[#55098](https://github.com/nodejs/node/pull/55098)
* \[[`82c402265a`](https://github.com/nodejs/node/commit/82c402265a)] - **test**: 修复 test-http-remove-header-stays-removed 的不稳定问题（Luigi Pinca）[#55004](https://github.com/nodejs/node/pull/55004)
* \[[`78021701ed`](https://github.com/nodejs/node/commit/78021701ed)] - **test**: 修复 test-tls-junk-closes-server（Michael Dawson）[#55089](https://github.com/nodejs/node/pull/55089)
* \[[`c908b8a2d8`](https://github.com/nodejs/node/commit/c908b8a2d8)] - **test**: 修复路径包含空格时失败的更多测试（Antoine du Hamel）[#55088](https://github.com/nodejs/node/pull/55088)
* \[[`afc1628e73`](https://github.com/nodejs/node/commit/afc1628e73)] - **test**: 修复路径包含引号时的 `assertSnapshot`（Antoine du Hamel）[#55087](https://github.com/nodejs/node/pull/55087)
* \[[`7c88739b83`](https://github.com/nodejs/node/commit/7c88739b83)] - **test**: 修复路径包含 `%` 时的某些测试（Antoine du Hamel）[#55082](https://github.com/nodejs/node/pull/55082)
* \[[`eb4d468671`](https://github.com/nodejs/node/commit/eb4d468671)] - _**Revert**_ "**test**: 将 test-fs-watch-non-recursive 标记为 Windows 上的不稳定测试"（Luigi Pinca）[#55079](https://github.com/nodejs/node/pull/55079)
* \[[`bc7b5249d4`](https://github.com/nodejs/node/commit/bc7b5249d4)] - **test**: 让 `test-runner-assert` 更健壮（Aviv Keller）[#55036](https://github.com/nodejs/node/pull/55036)
* \[[`6c2a1386f7`](https://github.com/nodejs/node/commit/6c2a1386f7)] - **test**: 更新 tls 测试以支持 OpenSSL32（Michael Dawson）[#55030](https://github.com/nodejs/node/pull/55030)
* \[[`96406610fa`](https://github.com/nodejs/node/commit/96406610fa)] - **test**: 修复路径包含空格时的 `test-vm-context-dont-contextify`（Antoine du Hamel）[#55026](https://github.com/nodejs/node/pull/55026)
* \[[`39a80eed4f`](https://github.com/nodejs/node/commit/39a80eed4f)] - **test**: 为 OpenSSL32 调整 tls-set-ciphers（Michael Dawson）[#55016](https://github.com/nodejs/node/pull/55016)
* \[[`bd8fd4fceb`](https://github.com/nodejs/node/commit/bd8fd4fceb)] - **test**: 添加 `util.stripVTControlCharacters` 测试（RedYetiDev）[#54865](https://github.com/nodejs/node/pull/54865)
* \[[`333b5a02d0`](https://github.com/nodejs/node/commit/333b5a02d0)] - **test**: 提高 timer promises scheduler 的覆盖率（Aviv Keller）[#53370](https://github.com/nodejs/node/pull/53370)
* \[[`f48992f433`](https://github.com/nodejs/node/commit/f48992f433)] - **test**: 移除未使用的 common 工具（RedYetiDev）[#54825](https://github.com/nodejs/node/pull/54825)
* \[[`93a098c56d`](https://github.com/nodejs/node/commit/93a098c56d)] - **test**: 修复 test-http-header-overflow 的不稳定问题（Luigi Pinca）[#54978](https://github.com/nodejs/node/pull/54978)
* \[[`f849cf677d`](https://github.com/nodejs/node/commit/f849cf677d)] - **test**: 将 `soucre` 修正为 `source`（Aviv Keller）[#55038](https://github.com/nodejs/node/pull/55038)
* \[[`1a007ea814`](https://github.com/nodejs/node/commit/1a007ea814)] - **test**: 添加断言以验证测试假设（Michael Dawson）[#54997](https://github.com/nodejs/node/pull/54997)
* \[[`6f53c096f8`](https://github.com/nodejs/node/commit/6f53c096f8)] - **test**: 将 test-http-max-sockets 移到并行执行（Luigi Pinca）[#54977](https://github.com/nodejs/node/pull/54977)
* \[[`aba9dc775e`](https://github.com/nodejs/node/commit/aba9dc775e)] - **test**: 移除 test-http-max-sockets 的 flaky 标记（Luigi Pinca）[#54976](https://github.com/nodejs/node/pull/54976)
* \[[`ee5624bffe`](https://github.com/nodejs/node/commit/ee5624bffe)] - **test**: 调整密钥大小以支持 OpenSSL32（Michael Dawson）[#54972](https://github.com/nodejs/node/pull/54972)
* \[[`5c11a61140`](https://github.com/nodejs/node/commit/5c11a61140)] - **test**: 更新测试以支持 OpenSSL32（Michael Dawson）[#54968](https://github.com/nodejs/node/pull/54968)
* \[[`62f21470e4`](https://github.com/nodejs/node/commit/62f21470e4)] - **test**: 更新 DOM events web platform 测试（Matthew Aitken）[#54642](https://github.com/nodejs/node/pull/54642)
* \[[`426851705c`](https://github.com/nodejs/node/commit/426851705c)] - **test_runner**: 断言 entry 是一个有效对象（Edigleysson Silva (Edy)）[#55231](https://github.com/nodejs/node/pull/55231)
* \[[`b1cad519d7`](https://github.com/nodejs/node/commit/b1cad519d7)] - **test_runner**: 在父测试第二次打印时使用 `test:` 符号（RedYetiDev）[#54956](https://github.com/nodejs/node/pull/54956)
* \[[`63c8f3d436`](https://github.com/nodejs/node/commit/63c8f3d436)] - **test_runner**: 用 ansi reset 替换 ansi clear（Pietro Marchini）[#55013](https://github.com/nodejs/node/pull/55013)
* \[[`0b3fb344f7`](https://github.com/nodejs/node/commit/0b3fb344f7)] - **tools**: 为 `prefer-primordials` 规则添加 `polyfilled` 选项（Antoine du Hamel）[#55318](https://github.com/nodejs/node/pull/55318)
* \[[`8981309bd9`](https://github.com/nodejs/node/commit/8981309bd9)] - **tools**: 让 `choco install` 脚本更易读（Aviv Keller）[#54002](https://github.com/nodejs/node/pull/54002)
* \[[`7310abeae1`](https://github.com/nodejs/node/commit/7310abeae1)] - **tools**: 为 `lint-md` 将 Rollup 从 4.18.1 升级到 4.22.4（dependabot\[bot]）[#55093](https://github.com/nodejs/node/pull/55093)
* \[[`083311e8af`](https://github.com/nodejs/node/commit/083311e8af)] - **tools**: 从 eslint require 规则中移除冗余代码（Aviv Keller）[#54892](https://github.com/nodejs/node/pull/54892)
* \[[`ae4b2aece1`](https://github.com/nodejs/node/commit/ae4b2aece1)] - **tools**: 更新 license-builder 中关于 ICU 的错误消息（Aviv Keller）[#54742](https://github.com/nodejs/node/pull/54742)
* \[[`3ebd31684d`](https://github.com/nodejs/node/commit/3ebd31684d)] - **tools**: 将 github\_reporter 更新到 1.7.1（Node.js GitHub Bot）[#54951](https://github.com/nodejs/node/pull/54951)
* \[[`397be8a10e`](https://github.com/nodejs/node/commit/397be8a10e)] - **tty**: 修复终端颜色链接（Aviv Keller）[#54596](https://github.com/nodejs/node/pull/54596)
* \[[`a3c2ef9e98`](https://github.com/nodejs/node/commit/a3c2ef9e98)] - **util**: 更新 ansi 正则表达式（Aviv Keller）[#54865](https://github.com/nodejs/node/pull/54865)
* \[[`efdccc88a2`](https://github.com/nodejs/node/commit/efdccc88a2)] - **watch**: 在优雅重启时保留输出（Théo LUDWIG）[#54323](https://github.com/nodejs/node/pull/54323)
* \[[`226836c5ac`](https://github.com/nodejs/node/commit/226836c5ac)] - **worker**: 在 close 后的 postMessage 中抛出 InvalidStateError（devstone）[#55206](https://github.com/nodejs/node/pull/55206)
* \[[`f39ff4d14b`](https://github.com/nodejs/node/commit/f39ff4d14b)] - **worker**: 更一致地处理 `--input-type`（Antoine du Hamel）[#54979](https://github.com/nodejs/node/pull/54979)
* \[[`30383ffb9a`](https://github.com/nodejs/node/commit/30383ffb9a)] - **zlib**: 从 c++ 抛出 brotli 初始化错误（Yagiz Nizipli）[#54698](https://github.com/nodejs/node/pull/54698)

<a id="20.18.0"></a>

## 2024-10-03, 版本 20.18.0 'Iron' (LTS), @targos

### 重要变更

### Node.js 中的实验性网络检查支持

本次更新引入了对 Node.js 网络检查的初始支持。
目前这是一个实验性功能，因此你需要使用 `--experimental-network-inspection` 标志来启用它。
启用此功能后，你可以检查 JavaScript 应用程序中发生的网络活动。

要使用网络检查，请使用以下命令启动你的 Node.js 应用程序：

```console
$ node --inspect-wait --experimental-network-inspection index.js
```

请注意，网络检查功能仍在积极开发中。
我们正在积极改进此功能，并将在未来的更新中继续扩展其能力。

* 网络检查仅限于 `http` 和 `https` 模块。
* 在 Chrome DevTools 侧的
  [功能请求](https://issues.chromium.org/issues/353924015) 得到解决之前，Chrome DevTools 中的 Network 选项卡将不可用。

由 Kohei Ueno 在 [#53593](https://github.com/nodejs/node/pull/53593) 和 [#54246](https://github.com/nodejs/node/pull/54246) 中贡献

#### 将 X509\_V\_FLAG\_PARTIAL\_CHAIN 暴露给 tls.createSecureContext

此版本为 API `tls.createSecureContext` 引入了一个新选项。从现在开始，可以使用 `tls.createSecureContext({ allowPartialTrustChain: true })` 将信任 CA 证书列表中的中间（非自签名）证书视为受信任证书。

由 Anna Henningsen 在 [#54790](https://github.com/nodejs/node/pull/54790) 中贡献

#### vm.createContext() 新增选项，可创建具有可冻结 globalThis 的上下文

Node.js 实现了 `vm.createContext()` 及其相关 API 的一种变体：当使用 vm.constants.DONT\_CONTEXTIFY 时，它会创建一个不会对其全局对象进行 contextify 的上下文。这适用于用户希望冻结该上下文的场景（如果全局对象被 contextify，即安装了拦截器，则无法冻结），或者在不需要拦截器行为时加快全局访问速度。

由 Joyee Cheung 在 [#54394](https://github.com/nodejs/node/pull/54394) 中贡献

#### 弃用

* \[[`64aa31f6e5`](https://github.com/nodejs/node/commit/64aa31f6e5)] - **repl**: 文档弃用在没有 `new` 的情况下实例化 `node:repl` 类（Aviv Keller） [#54842](https://github.com/nodejs/node/pull/54842)
* \[[`4c52ee3d7f`](https://github.com/nodejs/node/commit/4c52ee3d7f)] - **zlib**: 弃用在没有 new 的情况下实例化类（Yagiz Nizipli） [#54708](https://github.com/nodejs/node/pull/54708)

#### 其他重要变更

* \[[`b80da2f964`](https://github.com/nodejs/node/commit/b80da2f964)] - **buffer**: 优化 createFromString（Robert Nagy） [#54324](https://github.com/nodejs/node/pull/54324)
* \[[`02b36cbd2d`](https://github.com/nodejs/node/commit/02b36cbd2d)] - **(SEMVER-MINOR)** **lib**: 添加 EventSource 客户端（Aras Abbasi） [#51575](https://github.com/nodejs/node/pull/51575)
* \[[`879546a9bf`](https://github.com/nodejs/node/commit/879546a9bf)] - **(SEMVER-MINOR)** **src,lib**: 添加 performance.uvMetricsInfo（Rafael Gonzaga） [#54413](https://github.com/nodejs/node/pull/54413)
* \[[`f789f4c92d`](https://github.com/nodejs/node/commit/f789f4c92d)] - **(SEMVER-MINOR)** **test_runner**: 支持模块 mocking（Colin Ihrig） [#52848](https://github.com/nodejs/node/pull/52848)
* \[[`4eb0749b6c`](https://github.com/nodejs/node/commit/4eb0749b6c)] - **(SEMVER-MINOR)** **url**: 实现用于更安全 URL 解析的 parse 方法（Ali Hassan） [#52280](https://github.com/nodejs/node/pull/52280)

### 提交

* \[[`013c48f0e9`](https://github.com/nodejs/node/commit/013c48f0e9)] - **benchmark**: 使用 --no-warnings 以避免 DEP/ExpWarn 日志 (Rafael Gonzaga) [#54928](https://github.com/nodejs/node/pull/54928)
* \[[`194fc113ac`](https://github.com/nodejs/node/commit/194fc113ac)] - **benchmark**: 添加 buffer.isAscii 基准 (RafaelGSS) [#54740](https://github.com/nodejs/node/pull/54740)
* \[[`7410d51cb9`](https://github.com/nodejs/node/commit/7410d51cb9)] - **benchmark**: 添加 buffer.isUtf8 基准测试 (RafaelGSS) [#54740](https://github.com/nodejs/node/pull/54740)
* \[[`2393f21e8a`](https://github.com/nodejs/node/commit/2393f21e8a)] - **benchmark**: 为基准测试添加 access 异步版本 (Rafael Gonzaga) [#54747](https://github.com/nodejs/node/pull/54747)
* \[[`b8779721f0`](https://github.com/nodejs/node/commit/b8779721f0)] - **benchmark**: 增强 dc 发布基准测试 (Rafael Gonzaga) [#54745](https://github.com/nodejs/node/pull/54745)
* \[[`4078aa83ff`](https://github.com/nodejs/node/commit/4078aa83ff)] - **benchmark**: 添加 match 和 doesNotMatch 基准测试 (RafaelGSS) [#54734](https://github.com/nodejs/node/pull/54734)
* \[[`66acab9976`](https://github.com/nodejs/node/commit/66acab9976)] - **benchmark**: 添加 rejects 和 doesNotReject 基准测试 (RafaelGSS) [#54734](https://github.com/nodejs/node/pull/54734)
* \[[`6db777fb3a`](https://github.com/nodejs/node/commit/6db777fb3a)] - **benchmark**: 添加 throws 和 doesNotThrow 基准测试 (RafaelGSS) [#54734](https://github.com/nodejs/node/pull/54734)
* \[[`8f101560ce`](https://github.com/nodejs/node/commit/8f101560ce)] - **benchmark**: 添加 strictEqual 和 notStrictEqual 基准测试 (RafaelGSS) [#54734](https://github.com/nodejs/node/pull/54734)
* \[[`2c9e4c936e`](https://github.com/nodejs/node/commit/2c9e4c936e)] - **benchmark**: 添加分组以更好地分离各个基准测试 (Giovanni Bucci) [#54393](https://github.com/nodejs/node/pull/54393)
* \[[`671c3ac633`](https://github.com/nodejs/node/commit/671c3ac633)] - **benchmark**: 修复文件路径与 URL 转换的基准测试 (Early Riser) [#54190](https://github.com/nodejs/node/pull/54190)
* \[[`8c8708cb5b`](https://github.com/nodejs/node/commit/8c8708cb5b)] - **benchmark**: 使用 assert.ok searchparams (Rafael Gonzaga) [#54334](https://github.com/nodejs/node/pull/54334)
* \[[`8b71fa79e2`](https://github.com/nodejs/node/commit/8b71fa79e2)] - **benchmark**: 添加 stream.compose 基准测试 (jakecastelli) [#54308](https://github.com/nodejs/node/pull/54308)
* \[[`93ee36e3a0`](https://github.com/nodejs/node/commit/93ee36e3a0)] - **benchmark**: 将 count 重命名为 n (Rafael Gonzaga) [#54271](https://github.com/nodejs/node/pull/54271)
* \[[`f2971b6f0b`](https://github.com/nodejs/node/commit/f2971b6f0b)] - **benchmark**: 将 assert() 改为 assert.ok() (Rafael Gonzaga) [#54254](https://github.com/nodejs/node/pull/54254)
* \[[`f48f2c212c`](https://github.com/nodejs/node/commit/f48f2c212c)] - **benchmark**: 在 CLI 中支持 --help (Aviv Keller) [#53358](https://github.com/nodejs/node/pull/53358)
* \[[`0309b0520b`](https://github.com/nodejs/node/commit/0309b0520b)] - **benchmark**: 移除 force 选项，因为 force 默认为 true (Yelim Koo) [#54203](https://github.com/nodejs/node/pull/54203)
* \[[`b6e8305b2d`](https://github.com/nodejs/node/commit/b6e8305b2d)] - **benchmark**: 使用 assert.ok 而不是 assert (Rafael Gonzaga) [#54176](https://github.com/nodejs/node/pull/54176)
* \[[`90c660d26a`](https://github.com/nodejs/node/commit/90c660d26a)] - **benchmark**: 添加 require-esm 基准测试 (Joyee Cheung) [#52166](https://github.com/nodejs/node/pull/52166)
* \[[`1b8584b52e`](https://github.com/nodejs/node/commit/1b8584b52e)] - **benchmark,doc**: 为 perf 添加 CPU scaling governor (Rafael Gonzaga) [#54723](https://github.com/nodejs/node/pull/54723)
* \[[`0b9161b330`](https://github.com/nodejs/node/commit/0b9161b330)] - **benchmark,doc**: 在脚本列表中提及 bar.R (Rafael Gonzaga) [#54722](https://github.com/nodejs/node/pull/54722)
* \[[`84bf93b7ea`](https://github.com/nodejs/node/commit/84bf93b7ea)] - **buffer**: 允许在 from 中使用无效编码 (Robert Nagy) [#54533](https://github.com/nodejs/node/pull/54533)
* \[[`d04246a0d7`](https://github.com/nodejs/node/commit/d04246a0d7)] - **buffer**: 优化常见编码的 byteLength (Robert Nagy) [#54342](https://github.com/nodejs/node/pull/54342)
* \[[`f36831f694`](https://github.com/nodejs/node/commit/f36831f694)] - **buffer**: 优化 createFromString (Robert Nagy) [#54324](https://github.com/nodejs/node/pull/54324)
* \[[`f5f40c8088`](https://github.com/nodejs/node/commit/f5f40c8088)] - **buffer**: 针对常见编码进行优化 (Robert Nagy) [#54319](https://github.com/nodejs/node/pull/54319)
* \[[`76c37703be`](https://github.com/nodejs/node/commit/76c37703be)] - **buffer**: 为 blob bytes 方法添加 JSDoc (Roberto Simonini) [#54117](https://github.com/nodejs/node/pull/54117)
* \[[`3012d31404`](https://github.com/nodejs/node/commit/3012d31404)] - **buffer**: 使用更快的整数参数检查 (Robert Nagy) [#54089](https://github.com/nodejs/node/pull/54089)
* \[[`3505782801`](https://github.com/nodejs/node/commit/3505782801)] - **buffer**: 使 indexOf(byte) 更快 (Tobias Nießen) [#53455](https://github.com/nodejs/node/pull/53455)
* \[[`d285fc1f68`](https://github.com/nodejs/node/commit/d285fc1f68)] - **build**: 将 clang-format 升级到 v18 (Aviv Keller) [#53957](https://github.com/nodejs/node/pull/53957)
* \[[`d288ec3b0a`](https://github.com/nodejs/node/commit/d288ec3b0a)] - **build**: 修复冲突的 V8 对象打印标志 (Daeyeon Jeong) [#54785](https://github.com/nodejs/node/pull/54785)
* \[[`e862eecac9`](https://github.com/nodejs/node/commit/e862eecac9)] - **build**: 在收集核心覆盖率时不要使用代码缓存构建 (Joyee Cheung) [#54633](https://github.com/nodejs/node/pull/54633)
* \[[`f7a606eb96`](https://github.com/nodejs/node/commit/f7a606eb96)] - **build**: 关闭 `-Wrestrict` (Richard Lau) [#54737](https://github.com/nodejs/node/pull/54737)
* \[[`71ca2665e4`](https://github.com/nodejs/node/commit/71ca2665e4)] - **build**: 回收 macOS GHA 运行器上的磁盘空间 (jakecastelli) [#54658](https://github.com/nodejs/node/pull/54658)
* \[[`82d8051c39`](https://github.com/nodejs/node/commit/82d8051c39)] - **build**: 如果 obj.target 目录不存在，则不要清理它 (Joyee Cheung) [#54337](https://github.com/nodejs/node/pull/54337)
* \[[`6e550b1f26`](https://github.com/nodejs/node/commit/6e550b1f26)] - **build**: 将 `ruff` 更新到 `0.5.2` (Aviv Keller) [#53909](https://github.com/nodejs/node/pull/53909)
* \[[`e2ea7b26d7`](https://github.com/nodejs/node/commit/e2ea7b26d7)] - **build**: 修复 ./configure --help 格式错误 (Zhenwei Jin) [#53066](https://github.com/nodejs/node/pull/53066)
* \[[`eb2402d569`](https://github.com/nodejs/node/commit/eb2402d569)] - **build**: 支持使用共享 uvwasi 库构建 (Pooja D P) [#43987](https://github.com/nodejs/node/pull/43987)
* \[[`45732314d4`](https://github.com/nodejs/node/commit/45732314d4)] - **build**: 将 V8 警告 cflags 与 BUILD.gn 同步 (Michaël Zasso) [#52873](https://github.com/nodejs/node/pull/52873)
* \[[`6e0a2bb54c`](https://github.com/nodejs/node/commit/6e0a2bb54c)] - **build**: 统一 Clang 检查 (Michaël Zasso) [#52873](https://github.com/nodejs/node/pull/52873)
* \[[`3f78d4eb28`](https://github.com/nodejs/node/commit/3f78d4eb28)] - **cli**: 为 `NODE_OPTIONS` 添加可用的 `--expose-gc` 标志 (Juan José) [#53078](https://github.com/nodejs/node/pull/53078)
* \[[`a110409b2a`](https://github.com/nodejs/node/commit/a110409b2a)] - **console**: 使用 validateOneOf 验证 colorMode (HEESEUNG) [#54245](https://github.com/nodejs/node/pull/54245)
* \[[`231ab788ea`](https://github.com/nodejs/node/commit/231ab788ea)] - **crypto**: 在 {Sign,Verify}Final 中拒绝 dh、x25519、x448 (Huáng Jùnliàng) [#53774](https://github.com/nodejs/node/pull/53774)
* \[[`a5984e4570`](https://github.com/nodejs/node/commit/a5984e4570)] - **crypto**: 在加载不支持的 pkcs12 时返回更清晰的错误 (Tim Perry) [#54485](https://github.com/nodejs/node/pull/54485)
* \[[`f287cd77bd`](https://github.com/nodejs/node/commit/f287cd77bd)] - **crypto**: 移除未使用的 `kHashTypes` 内部项 (Antoine du Hamel) [#54627](https://github.com/nodejs/node/pull/54627)
* \[[`1fc904f8c4`](https://github.com/nodejs/node/commit/1fc904f8c4)] - **deps**: 更新 cjs-module-lexer 到 1.4.1 (Node.js GitHub Bot) [#54846](https://github.com/nodejs/node/pull/54846)
* \[[`95b55c39b1`](https://github.com/nodejs/node/commit/95b55c39b1)] - **deps**: 更新 simdutf 到 5.5.0 (Node.js GitHub Bot) [#54434](https://github.com/nodejs/node/pull/54434)
* \[[`cf6ded5dd3`](https://github.com/nodejs/node/commit/cf6ded5dd3)] - **deps**: 更新 cjs-module-lexer 到 1.4.0 (Node.js GitHub Bot) [#54713](https://github.com/nodejs/node/pull/54713)
* \[[`7f8edce3f1`](https://github.com/nodejs/node/commit/7f8edce3f1)] - **deps**: 更新 c-ares 到 v1.33.1 (Node.js GitHub Bot) [#54549](https://github.com/nodejs/node/pull/54549)
* \[[`9a4a7b7ecc`](https://github.com/nodejs/node/commit/9a4a7b7ecc)] - **deps**: 更新 undici 到 6.19.8 (Node.js GitHub Bot) [#54456](https://github.com/nodejs/node/pull/54456)
* \[[`87ca1d7fee`](https://github.com/nodejs/node/commit/87ca1d7fee)] - **deps**: 更新 simdutf 到 5.3.4 (Node.js GitHub Bot) [#54312](https://github.com/nodejs/node/pull/54312)
* \[[`d3a743f182`](https://github.com/nodejs/node/commit/d3a743f182)] - **deps**: 更新 zlib 到 1.3.0.1-motley-71660e1 (Node.js GitHub Bot) [#53464](https://github.com/nodejs/node/pull/53464)
* \[[`926981aa9f`](https://github.com/nodejs/node/commit/926981aa9f)] - **deps**: 更新 zlib 到 1.3.0.1-motley-c2469fd (Node.js GitHub Bot) [#53464](https://github.com/nodejs/node/pull/53464)
* \[[`654c8d1fdc`](https://github.com/nodejs/node/commit/654c8d1fdc)] - **deps**: 更新 zlib 到 1.3.0.1-motley-68e57e6 (Node.js GitHub Bot) [#53464](https://github.com/nodejs/node/pull/53464)
* \[[`2477e79172`](https://github.com/nodejs/node/commit/2477e79172)] - **deps**: 更新 zlib 到 1.3.0.1-motley-8b7eff8 (Node.js GitHub Bot) [#53464](https://github.com/nodejs/node/pull/53464)
* \[[`3d8113faf5`](https://github.com/nodejs/node/commit/3d8113faf5)] - **deps**: 更新 zlib 到 1.3.0.1-motley-e432200 (Node.js GitHub Bot) [#53464](https://github.com/nodejs/node/pull/53464)
* \[[`ac294e3db4`](https://github.com/nodejs/node/commit/ac294e3db4)] - **deps**: 更新 zlib 到 1.3.0.1-motley-887bb57 (Node.js GitHub Bot) [#53464](https://github.com/nodejs/node/pull/53464)
* \[[`239588b968`](https://github.com/nodejs/node/commit/239588b968)] - **deps**: 更新 c-ares 到 v1.33.0 (Node.js GitHub Bot) [#54198](https://github.com/nodejs/node/pull/54198)
* \[[`6e7de37ed3`](https://github.com/nodejs/node/commit/6e7de37ed3)] - **deps**: 更新 undici 到 6.19.7 (Node.js GitHub Bot) [#54286](https://github.com/nodejs/node/pull/54286)
* \[[`38aa9d6ea9`](https://github.com/nodejs/node/commit/38aa9d6ea9)] - **deps**: 更新 acorn 到 8.12.1 (Node.js GitHub Bot) [#53465](https://github.com/nodejs/node/pull/53465)
* \[[`d30145f663`](https://github.com/nodejs/node/commit/d30145f663)] - **deps**: 更新 undici 到 6.19.5 (Node.js GitHub Bot) [#54076](https://github.com/nodejs/node/pull/54076)
* \[[`c169d9c12b`](https://github.com/nodejs/node/commit/c169d9c12b)] - **deps**: 更新 simdutf 到 5.3.1 (Node.js GitHub Bot) [#54196](https://github.com/nodejs/node/pull/54196)
* \[[`92f3447957`](https://github.com/nodejs/node/commit/92f3447957)] - **doc**: 将缺失的 EventSource 文档添加到 globals 中 (Matthew Aitken) [#55022](https://github.com/nodejs/node/pull/55022)
* \[[`2879ce9681`](https://github.com/nodejs/node/commit/2879ce9681)] - **doc**: 修复损坏的 Android 构建链接 (Niklas Wenzel) [#54922](https://github.com/nodejs/node/pull/54922)
* \[[`096623b59a`](https://github.com/nodejs/node/commit/096623b59a)] - **doc**: 为 aduh95 添加支持链接 (Antoine du Hamel) [#54866](https://github.com/nodejs/node/pull/54866)
* \[[`1dfd238781`](https://github.com/nodejs/node/commit/1dfd238781)] - **doc**: 运行 license-builder (github-actions\[bot]) [#54854](https://github.com/nodejs/node/pull/54854)
* \[[`a6c748fffb`](https://github.com/nodejs/node/commit/a6c748fffb)] - **doc**: 为全局可访问 API 添加实验性标志 (Chengzhong Wu) [#54330](https://github.com/nodejs/node/pull/54330)
* \[[`d48a22fa14`](https://github.com/nodejs/node/commit/d48a22fa14)] - **doc**: 将 `ERR_INVALID_ADDRESS` 添加到 `errors.md` (Aviv Keller) [#54661](https://github.com/nodejs/node/pull/54661)
* \[[`4a840cecfa`](https://github.com/nodejs/node/commit/4a840cecfa)] - **doc**: 为 mcollina 添加支持链接 (Matteo Collina) [#54786](https://github.com/nodejs/node/pull/54786)
* \[[`ec22d86512`](https://github.com/nodejs/node/commit/ec22d86512)] - **doc**: 将 `--conditions` CLI 标志标记为稳定 (Guy Bedford) [#54209](https://github.com/nodejs/node/pull/54209)
* \[[`77c702ca07`](https://github.com/nodejs/node/commit/77c702ca07)] - **doc**: 修复 recognizing-contributors 中的拼写错误 (Tobias Nießen) [#54822](https://github.com/nodejs/node/pull/54822)
* \[[`62953ef9fb`](https://github.com/nodejs/node/commit/62953ef9fb)] - **doc**: 澄清 `--max-old-space-size` 和 `--max-semi-space-size` 的单位 (Alexandre ABRIOUX) [#54477](https://github.com/nodejs/node/pull/54477)
* \[[`e2bab0f2b2`](https://github.com/nodejs/node/commit/e2bab0f2b2)] - **doc**: 在相关章节中将 --allow-fs-read 替换为 --allow-fs-write (M1CK431) [#54427](https://github.com/nodejs/node/pull/54427)
* \[[`9cbfd5b33a`](https://github.com/nodejs/node/commit/9cbfd5b33a)] - **doc**: 为 marco-ippolito 添加支持链接 (Marco Ippolito) [#54789](https://github.com/nodejs/node/pull/54789)
* \[[`53167b29ef`](https://github.com/nodejs/node/commit/53167b29ef)] - **doc**: 修复拼写错误 (Michael Dawson) [#54640](https://github.com/nodejs/node/pull/54640)
* \[[`87f78a35f7`](https://github.com/nodejs/node/commit/87f78a35f7)] - **doc**: 修复 webcrypto.md 中 AES-GCM 的反引号 (Filip Skokan) [#54621](https://github.com/nodejs/node/pull/54621)
* \[[`7c83c15221`](https://github.com/nodejs/node/commit/7c83c15221)] - **doc**: 添加关于 os.tmpdir() 覆盖的文档 (Joyee Cheung) [#54613](https://github.com/nodejs/node/pull/54613)
* \[[`4bfd832d70`](https://github.com/nodejs/node/commit/4bfd832d70)] - **doc**: 为 anonrig 添加支持我链接 (Yagiz Nizipli) [#54611](https://github.com/nodejs/node/pull/54611)
* \[[`22a103e5ec`](https://github.com/nodejs/node/commit/22a103e5ec)] - **doc**: 为来自 TCP socket 的 REPL 添加警告提示 (Rafael Gonzaga) [#54594](https://github.com/nodejs/node/pull/54594)
* \[[`b6374c24e1`](https://github.com/nodejs/node/commit/b6374c24e1)] - **doc**: 修复 styleText 描述中的拼写错误 (Rafael Gonzaga) [#54616](https://github.com/nodejs/node/pull/54616)
* \[[`2f5b98ee1f`](https://github.com/nodejs/node/commit/2f5b98ee1f)] - **doc**: 添加 getHeapStatistics() 属性描述 (Benji Marinacci) [#54584](https://github.com/nodejs/node/pull/54584)
* \[[`482302b99b`](https://github.com/nodejs/node/commit/482302b99b)] - **doc**: 修复关于包含覆盖文件的信息 (Aviv Keller) [#54527](https://github.com/nodejs/node/pull/54527)
* \[[`b3708e7df4`](https://github.com/nodejs/node/commit/b3708e7df4)] - **doc**: 支持协作者 - 会议宣讲扩散 (Michael Dawson) [#54508](https://github.com/nodejs/node/pull/54508)
* \[[`c86fe23012`](https://github.com/nodejs/node/commit/c86fe23012)] - **doc**: 添加关于 shasum 生成失败的说明 (Marco Ippolito) [#54487](https://github.com/nodejs/node/pull/54487)
* \[[`d53e6cf755`](https://github.com/nodejs/node/commit/d53e6cf755)] - **doc**: 修复 module.md 中的大小写 (shallow-beach) [#54488](https://github.com/nodejs/node/pull/54488)
* \[[`cdc6713f18`](https://github.com/nodejs/node/commit/cdc6713f18)] - **doc**: 为 node:https 添加 esm 示例 (Alfredo González) [#54399](https://github.com/nodejs/node/pull/54399)
* \[[`1ac1fe4e65`](https://github.com/nodejs/node/commit/1ac1fe4e65)] - **doc**: 修复 max header size 的错误描述 (Egawa Ryo) [#54125](https://github.com/nodejs/node/pull/54125)
* \[[`244542b720`](https://github.com/nodejs/node/commit/244542b720)] - **doc**: 添加 git node security --cleanup (Rafael Gonzaga) [#54381](https://github.com/nodejs/node/pull/54381)
* \[[`69fb71f54c`](https://github.com/nodejs/node/commit/69fb71f54c)] - **doc**: 添加关于权限模型弱点的说明 (Tobias Nießen) [#54268](https://github.com/nodejs/node/pull/54268)
* \[[`83b2cb908b`](https://github.com/nodejs/node/commit/83b2cb908b)] - **doc**: 添加 `--watch-preserve-output` 的加入版本信息 (Théo LUDWIG) [#54328](https://github.com/nodejs/node/pull/54328)
* \[[`460fb49483`](https://github.com/nodejs/node/commit/460fb49483)] - **doc**: 将 Current release 中的 v19 提及替换掉 (Rafael Gonzaga) [#54361](https://github.com/nodejs/node/pull/54361)
* \[[`994b46a160`](https://github.com/nodejs/node/commit/994b46a160)] - **doc**: 更正 peformance 条目类型 (Jason Zhang) [#54263](https://github.com/nodejs/node/pull/54263)
* \[[`f142e668cb`](https://github.com/nodejs/node/commit/f142e668cb)] - **doc**: 修复 sea 文档中的方法名拼写错误 (Eliyah Sundström) [#54027](https://github.com/nodejs/node/pull/54027)
* \[[`9529a30dba`](https://github.com/nodejs/node/commit/9529a30dba)] - **doc**: 将 process.nextTick 标记为遗留 (Marco Ippolito) [#51280](https://github.com/nodejs/node/pull/51280)
* \[[`7e25fabb91`](https://github.com/nodejs/node/commit/7e25fabb91)] - **doc**: 为 node:http2 添加 esm 示例 (Alfredo González) [#54292](https://github.com/nodejs/node/pull/54292)
* \[[`6a4f05e384`](https://github.com/nodejs/node/commit/6a4f05e384)] - **doc**: 明确提及 node:fs 模块限制 (Rafael Gonzaga) [#54269](https://github.com/nodejs/node/pull/54269)
* \[[`53f5c54997`](https://github.com/nodejs/node/commit/53f5c54997)] - **doc**: 警告 Windows 构建 bug (Jason Zhang) [#54217](https://github.com/nodejs/node/pull/54217)
* \[[`07bde054f3`](https://github.com/nodejs/node/commit/07bde054f3)] - **doc**: 在 `tracingChannel.traceCallback` 中使某些参数可选 (Deokjin Kim) [#54068](https://github.com/nodejs/node/pull/54068)
* \[[`62bf03b5f1`](https://github.com/nodejs/node/commit/62bf03b5f1)] - **doc**: 为 node:dns 添加 esm 示例 (Alfredo González) [#54172](https://github.com/nodejs/node/pull/54172)
* \[[`fb2b19184b`](https://github.com/nodejs/node/commit/fb2b19184b)] - **doc**: 将 KevinEady 添加为 triager (Chengzhong Wu) [#54179](https://github.com/nodejs/node/pull/54179)
* \[[`24976bfba0`](https://github.com/nodejs/node/commit/24976bfba0)] - **doc**: 为 node:console 添加 esm 示例 (Alfredo González) [#54108](https://github.com/nodejs/node/pull/54108)
* \[[`4e7edc40f7`](https://github.com/nodejs/node/commit/4e7edc40f7)] - **doc**: 修复 sea assets 示例 (Sadzurami) [#54192](https://github.com/nodejs/node/pull/54192)
* \[[`322b5d91e1`](https://github.com/nodejs/node/commit/322b5d91e1)] - **doc**: 为安全维护者公司添加链接 (Aviv Keller) [#52981](https://github.com/nodejs/node/pull/52981)
* \[[`6ab271510e`](https://github.com/nodejs/node/commit/6ab271510e)] - **doc**: 将 `onread` 选项从 `socket.connect()` 移到 `new net.socket()` (sendoru) [#54194](https://github.com/nodejs/node/pull/54194)
* \[[`39c30ea08f`](https://github.com/nodejs/node/commit/39c30ea08f)] - **doc**: 为 Myles Borins 转移发布密钥 (Richard Lau) [#54059](https://github.com/nodejs/node/pull/54059)
* \[[`e9fc54804a`](https://github.com/nodejs/node/commit/e9fc54804a)] - **doc**: 更新从源码构建 node 的说明 (Liran Tal) [#53768](https://github.com/nodejs/node/pull/53768)
* \[[`f131dc625a`](https://github.com/nodejs/node/commit/f131dc625a)] - **doc**: 为 blob.bytes() 方法添加文档 (jaexxin) [#54114](https://github.com/nodejs/node/pull/54114)
* \[[`8d41bb900b`](https://github.com/nodejs/node/commit/8d41bb900b)] - **doc**: 为自定义测试报告器示例补充缺失的换行 (Eddie Abbondanzio) [#54152](https://github.com/nodejs/node/pull/54152)
* \[[`2acaeaba77`](https://github.com/nodejs/node/commit/2acaeaba77)] - **doc**: 更新 `README.md` 中的 Triagers 列表 (Antoine du Hamel) [#54138](https://github.com/nodejs/node/pull/54138)
* \[[`fff8eb2792`](https://github.com/nodejs/node/commit/fff8eb2792)] - **doc**: 扩展故障排查部分 (Liran Tal) [#53808](https://github.com/nodejs/node/pull/53808)
* \[[`402121520f`](https://github.com/nodejs/node/commit/402121520f)] - **doc**: 澄清跨平台 SEA 生成的 `useCodeCache` 设置 (Yelim Koo) [#53994](https://github.com/nodejs/node/pull/53994)
* \[[`272484b8b2`](https://github.com/nodejs/node/commit/272484b8b2)] - **doc**: 测试 CLI 选项 (Aras Abbasi) [#51623](https://github.com/nodejs/node/pull/51623)
* \[[`c4d0ca4710`](https://github.com/nodejs/node/commit/c4d0ca4710)] - **doc, build**: 修正构建文档 (Aviv Keller) [#54899](https://github.com/nodejs/node/pull/54899)
* \[[`2e3e17748b`](https://github.com/nodejs/node/commit/2e3e17748b)] - **doc, child\_process**: 添加 esm 片段 (Aviv Keller) [#53616](https://github.com/nodejs/node/pull/53616)
* \[[`c40b4b4f27`](https://github.com/nodejs/node/commit/c40b4b4f27)] - **doc, meta**: 修复 `onboarding.md` 中损坏的链接 (Aviv Keller) [#54886](https://github.com/nodejs/node/pull/54886)
* \[[`beff587b94`](https://github.com/nodejs/node/commit/beff587b94)] - **doc, meta**: 在 `BUILDING.md` 中补上缺失的 `,` (Aviv Keller) [#54409](https://github.com/nodejs/node/pull/54409)
* \[[`c114585430`](https://github.com/nodejs/node/commit/c114585430)] - **doc, meta**: 用到密钥的链接替换命令 (Aviv Keller) [#53745](https://github.com/nodejs/node/pull/53745)
* \[[`0843077a99`](https://github.com/nodejs/node/commit/0843077a99)] - **doc, test**: 简化 test README 表格 (Aviv Keller) [#53971](https://github.com/nodejs/node/pull/53971)
* \[[`2df7bc0e32`](https://github.com/nodejs/node/commit/2df7bc0e32)] - **doc,tools**: 强制使用 `node:` 前缀 (Antoine du Hamel) [#53950](https://github.com/nodejs/node/pull/53950)
* \[[`0dd4639391`](https://github.com/nodejs/node/commit/0dd4639391)] - **esm**: 修复 `import.meta.resolve` 中对 `URL` 实例的支持 (Antoine du Hamel) [#54690](https://github.com/nodejs/node/pull/54690)
* \[[`f0c55e206d`](https://github.com/nodejs/node/commit/f0c55e206d)] - **fs**: 重构 rimraf 以避免使用 primordials (Yagiz Nizipli) [#54834](https://github.com/nodejs/node/pull/54834)
* \[[`f568384bbd`](https://github.com/nodejs/node/commit/f568384bbd)] - **fs**: 重构 handleTimestampsAndMode 以移除冗余调用 (HEESEUNG) [#54369](https://github.com/nodejs/node/pull/54369)
* \[[`2fb7cc9715`](https://github.com/nodejs/node/commit/2fb7cc9715)] - **fs**: 修复类型定义 (Yagiz Nizipli) [#53626](https://github.com/nodejs/node/pull/53626)
* \[[`596940cfa0`](https://github.com/nodejs/node/commit/596940cfa0)] - **http**: 降低 keep-alive 超时上的竞态条件发生概率 (jazelly) [#54863](https://github.com/nodejs/node/pull/54863)
* \[[`6e13a7ba02`](https://github.com/nodejs/node/commit/6e13a7ba02)] - **http**: 移除 prototype primordials (Antoine du Hamel) [#53698](https://github.com/nodejs/node/pull/53698)
* \[[`99f96eb3f7`](https://github.com/nodejs/node/commit/99f96eb3f7)] - **http2**: 移除 prototype primordials (Antoine du Hamel) [#53696](https://github.com/nodejs/node/pull/53696)
* \[[`41f5eacc1a`](https://github.com/nodejs/node/commit/41f5eacc1a)] - **https**: 仅在适当时使用默认 ALPNProtocols (Brian White) [#54411](https://github.com/nodejs/node/pull/54411)
* \[[`59a39520e1`](https://github.com/nodejs/node/commit/59a39520e1)] - **(SEMVER-MINOR)** **inspector**: 支持 `Network.loadingFailed` 事件 (Kohei Ueno) [#54246](https://github.com/nodejs/node/pull/54246)
* \[[`d1007fb1a9`](https://github.com/nodejs/node/commit/d1007fb1a9)] - **inspector**: 提供详细信息以修复 DevTools 前端错误 (Kohei Ueno) [#54156](https://github.com/nodejs/node/pull/54156)
* \[[`3b93507949`](https://github.com/nodejs/node/commit/3b93507949)] - **(SEMVER-MINOR)** **inspector**: 为网络检查添加初始支持 (Kohei Ueno) [#53593](https://github.com/nodejs/node/pull/53593)
* \[[`fc37b801c8`](https://github.com/nodejs/node/commit/fc37b801c8)] - **lib**: 移除不必要的 async (jakecastelli) [#54829](https://github.com/nodejs/node/pull/54829)
* \[[`d86f24787b`](https://github.com/nodejs/node/commit/d86f24787b)] - **lib**: 使 abort_controller 中的 WeakRef 更安全 (jazelly) [#54791](https://github.com/nodejs/node/pull/54791)
* \[[`77c59224e5`](https://github.com/nodejs/node/commit/77c59224e5)] - **lib**: 添加关于移除 `node:sys` 模块的说明 (Rafael Gonzaga) [#54743](https://github.com/nodejs/node/pull/54743)
* \[[`b8c06dce02`](https://github.com/nodejs/node/commit/b8c06dce02)] - **lib**: 确保 fixed_queue 中没有 holey array (Jason Zhang) [#54537](https://github.com/nodejs/node/pull/54537)
* \[[`b85c8ce1fc`](https://github.com/nodejs/node/commit/b85c8ce1fc)] - **lib**: 重构 SubtleCrypto 实验性警告 (Filip Skokan) [#54620](https://github.com/nodejs/node/pull/54620)
* \[[`e84812c1b5`](https://github.com/nodejs/node/commit/e84812c1b5)] - **lib**: 尊重 styleText 的终端能力 (Rafael Gonzaga) [#54389](https://github.com/nodejs/node/pull/54389)
* \[[`c004abaf17`](https://github.com/nodejs/node/commit/c004abaf17)] - **lib**: 使用 primordials 函数替换展开运算符 (YoonSoo\_Shin) [#54053](https://github.com/nodejs/node/pull/54053)
* \[[`b79aeabc4d`](https://github.com/nodejs/node/commit/b79aeabc4d)] - **lib**: 避免 for of 循环并移除 zlib 中不必要的变量 (YoonSoo\_Shin) [#54258](https://github.com/nodejs/node/pull/54258)
* \[[`f4085363c6`](https://github.com/nodejs/node/commit/f4085363c6)] - **lib**: 修复 webstream adapters 中未处理的错误 (Fedor Indutny) [#54206](https://github.com/nodejs/node/pull/54206)
* \[[`1ad857e748`](https://github.com/nodejs/node/commit/1ad857e748)] - **lib**: 修复 internal/streams 中注释的拼写错误 (YoonSoo\_Shin) [#54093](https://github.com/nodejs/node/pull/54093)
* \[[`02b36cbd2d`](https://github.com/nodejs/node/commit/02b36cbd2d)] - **(SEMVER-MINOR)** **lib**: 添加 EventSource Client (Aras Abbasi) [#51575](https://github.com/nodejs/node/pull/51575)
* \[[`afbf2c0530`](https://github.com/nodejs/node/commit/afbf2c0530)] - **lib,permission**: 支持将 Buffer 传给 permission.has (Rafael Gonzaga) [#54104](https://github.com/nodejs/node/pull/54104)
* \[[`54af47395d`](https://github.com/nodejs/node/commit/54af47395d)] - **meta**: 将 peter-evans/create-pull-request 从 6.1.0 升级到 7.0.1 (dependabot\[bot]) [#54820](https://github.com/nodejs/node/pull/54820)
* \[[`a0c10f2ed9`](https://github.com/nodejs/node/commit/a0c10f2ed9)] - **meta**: 将 `Windows ARM64` 添加到 flaky-tests 列表 (Aviv Keller) [#54693](https://github.com/nodejs/node/pull/54693)
* \[[`27b06880e1`](https://github.com/nodejs/node/commit/27b06880e1)] - **meta**: 将 actions/setup-python 从 5.1.1 升级到 5.2.0 (Rich Trott) [#54691](https://github.com/nodejs/node/pull/54691)
* \[[`8747af1037`](https://github.com/nodejs/node/commit/8747af1037)] - **meta**: 将 sccache 更新到 v0.8.1 (Aviv Keller) [#54720](https://github.com/nodejs/node/pull/54720)
* \[[`3f753d87a6`](https://github.com/nodejs/node/commit/3f753d87a6)] - **meta**: 将 step-security/harden-runner 从 2.9.0 升级到 2.9.1 (dependabot\[bot]) [#54704](https://github.com/nodejs/node/pull/54704)
* \[[`6f103ae25d`](https://github.com/nodejs/node/commit/6f103ae25d)] - **meta**: 将 actions/upload-artifact 从 4.3.4 升级到 4.4.0 (dependabot\[bot]) [#54703](https://github.com/nodejs/node/pull/54703)
* \[[`3e6a9bb04e`](https://github.com/nodejs/node/commit/3e6a9bb04e)] - **meta**: 将 github/codeql-action 从 3.25.15 升级到 3.26.6 (dependabot\[bot]) [#54702](https://github.com/nodejs/node/pull/54702)
* \[[`c666ebc4e4`](https://github.com/nodejs/node/commit/c666ebc4e4)] - **meta**: 修复 `SECURITY.md` 中的链接 (Aviv Keller) [#54696](https://github.com/nodejs/node/pull/54696)
* \[[`4d361b3bed`](https://github.com/nodejs/node/commit/4d361b3bed)] - **meta**: 修复 `contributing` codeowners (Aviv Keller) [#54641](https://github.com/nodejs/node/pull/54641)
* \[[`36931aa183`](https://github.com/nodejs/node/commit/36931aa183)] - **meta**: 提醒用户在 bug 报告中使用受支持的版本 (Aviv Keller) [#54481](https://github.com/nodejs/node/pull/54481)
* \[[`cf283d9ca7`](https://github.com/nodejs/node/commit/cf283d9ca7)] - **meta**: 当 `vcbuild.bat` 更新时运行 coverage-windows (Aviv Keller) [#54412](https://github.com/nodejs/node/pull/54412)
* \[[`67ca397c9f`](https://github.com/nodejs/node/commit/67ca397c9f)] - **meta**: 添加 test-permission-\* CODEOWNERS (Rafael Gonzaga) [#54267](https://github.com/nodejs/node/pull/54267)
* \[[`b61a2f5b79`](https://github.com/nodejs/node/commit/b61a2f5b79)] - **meta**: 将一位或多位协作者移入 emeritus (Node.js GitHub Bot) [#54210](https://github.com/nodejs/node/pull/54210)
* \[[`dd8ab83667`](https://github.com/nodejs/node/commit/dd8ab83667)] - **meta**: 为 lib/internal/modules 文件夹添加 module 标签 (Aviv Keller) [#52858](https://github.com/nodejs/node/pull/52858)
* \[[`db78978d17`](https://github.com/nodejs/node/commit/db78978d17)] - **meta**: 将 `actions/upload-artifact` 从 4.3.3 升级到 4.3.4 (dependabot\[bot]) [#54166](https://github.com/nodejs/node/pull/54166)
* \[[`ca808dd9e5`](https://github.com/nodejs/node/commit/ca808dd9e5)] - **meta**: 将 `actions/download-artifact` 从 4.1.7 升级到 4.1.8 (dependabot\[bot]) [#54167](https://github.com/nodejs/node/pull/54167)
* \[[`a35d980146`](https://github.com/nodejs/node/commit/a35d980146)] - **meta**: 将 actions/setup-python 从 5.1.0 升级到 5.1.1 (dependabot\[bot]) [#54165](https://github.com/nodejs/node/pull/54165)
* \[[`3a103c3a17`](https://github.com/nodejs/node/commit/3a103c3a17)] - **meta**: 将 `step-security/harden-runner` 从 2.8.1 升级到 2.9.0 (dependabot\[bot]) [#54169](https://github.com/nodejs/node/pull/54169)
* \[[`775ebbe0e8`](https://github.com/nodejs/node/commit/775ebbe0e8)] - **meta**: 将 `actions/setup-node` 从 4.0.2 升级到 4.0.3 (dependabot\[bot]) [#54170](https://github.com/nodejs/node/pull/54170)
* \[[`7d5dd6f1d1`](https://github.com/nodejs/node/commit/7d5dd6f1d1)] - **meta**: 将 `github/codeql-action` 从 3.25.11 升级到 3.25.15 (dependabot\[bot]) [#54168](https://github.com/nodejs/node/pull/54168)
* \[[`80dd38dde3`](https://github.com/nodejs/node/commit/80dd38dde3)] - **meta**: 将 `ossf/scorecard-action` 从 2.3.3 升级到 2.4.0 (dependabot\[bot]) [#54171](https://github.com/nodejs/node/pull/54171)
* \[[`90b632ee02`](https://github.com/nodejs/node/commit/90b632ee02)] - **module**: 在无类型包检测时发出警告 (Geoffrey Booth) [#52168](https://github.com/nodejs/node/pull/52168)
* \[[`3011927aab`](https://github.com/nodejs/node/commit/3011927aab)] - **node-api**: 添加外部缓冲区创建基准测试 (Chengzhong Wu) [#54877](https://github.com/nodejs/node/pull/54877)
* \[[`7611093e11`](https://github.com/nodejs/node/commit/7611093e11)] - **node-api**: 添加对 UTF-8 和 Latin-1 属性键的支持 (Mert Can Altin) [#52984](https://github.com/nodejs/node/pull/52984)
* \[[`d65a8f377c`](https://github.com/nodejs/node/commit/d65a8f377c)] - **node-api**: 移除 RefBase 和 CallbackWrapper (Vladimir Morozov) [#53590](https://github.com/nodejs/node/pull/53590)
* \[[`309cb1cbd2`](https://github.com/nodejs/node/commit/309cb1cbd2)] - **path**: 从 `posix.extname` 中移除 `StringPrototypeCharCodeAt` (Aviv Keller) [#54546](https://github.com/nodejs/node/pull/54546)
* \[[`2859b4ba9a`](https://github.com/nodejs/node/commit/2859b4ba9a)] - **path**: 将 `posix.join` 改为使用数组 (Wiyeong Seo) [#54331](https://github.com/nodejs/node/pull/54331)
* \[[`c61cee2138`](https://github.com/nodejs/node/commit/c61cee2138)] - **path**: 修复 Windows 上的相对路径 (Hüseyin Açacak) [#53991](https://github.com/nodejs/node/pull/53991)
* \[[`329be5cc35`](https://github.com/nodejs/node/commit/329be5cc35)] - **path**: 在 `validateString` 中使用正确的名称 (Benjamin Pasero) [#53669](https://github.com/nodejs/node/pull/53669)
* \[[`a9837267cb`](https://github.com/nodejs/node/commit/a9837267cb)] - **repl**: 在错误可恢复时避免将 'npm' 解释为命令 (Shima Ryuhei) [#54848](https://github.com/nodejs/node/pull/54848)
* \[[`d6a2317961`](https://github.com/nodejs/node/commit/d6a2317961)] - **repl**: 文档弃用在没有 `new` 的情况下实例化 `node:repl` 类 (Aviv Keller) [#54842](https://github.com/nodejs/node/pull/54842)
* \[[`7f09d983f3`](https://github.com/nodejs/node/commit/7f09d983f3)] - **sea**: 在使用 snapshot 时不要设置 code cache 标志 (Joyee Cheung) [#54120](https://github.com/nodejs/node/pull/54120)
* \[[`85542b094c`](https://github.com/nodejs/node/commit/85542b094c)] - **src**: 为 Environment 添加 Cleanable 类 (Gabriel Schulhof) [#54880](https://github.com/nodejs/node/pull/54880)
* \[[`8422064127`](https://github.com/nodejs/node/commit/8422064127)] - **src**: 移除冗余的 AESCipherMode (Tobias Nießen) [#54438](https://github.com/nodejs/node/pull/54438)
* \[[`342c32483a`](https://github.com/nodejs/node/commit/342c32483a)] - **src**: 正确处理 `permission.cc` 中的错误 (Michaël Zasso) [#54541](https://github.com/nodejs/node/pull/54541)
* \[[`90ff714699`](https://github.com/nodejs/node/commit/90ff714699)] - **src**: 从错误构造函数返回 `v8::Object` (Michaël Zasso) [#54541](https://github.com/nodejs/node/pull/54541)
* \[[`872856cfcb`](https://github.com/nodejs/node/commit/872856cfcb)] - **src**: 提升 `buffer.transcode` 性能 (Yagiz Nizipli) [#54153](https://github.com/nodejs/node/pull/54153)
* \[[`91936ebd12`](https://github.com/nodejs/node/commit/91936ebd12)] - **src**: 在内部 worker 中跳过 inspector 等待 (Chengzhong Wu) [#54219](https://github.com/nodejs/node/pull/54219)
* \[[`9759049427`](https://github.com/nodejs/node/commit/9759049427)] - **src**: 处理 OpenSSL 意外版本情况 (Shelley Vohr) [#54038](https://github.com/nodejs/node/pull/54038)
* \[[`87167fa248`](https://github.com/nodejs/node/commit/87167fa248)] - **src**: 使用 `args.This()` 代替 `Holder` (Michaël Zasso) [#53474](https://github.com/nodejs/node/pull/53474)
* \[[`b05c56e4be`](https://github.com/nodejs/node/commit/b05c56e4be)] - **src**: 简化 `size() == 0` 检查 (Yagiz Nizipli) [#53440](https://github.com/nodejs/node/pull/53440)
* \[[`d53e53699c`](https://github.com/nodejs/node/commit/d53e53699c)] - **src**: 修复 worker 中的 execArgv (theanarkh) [#53029](https://github.com/nodejs/node/pull/53029)
* \[[`21776a34b5`](https://github.com/nodejs/node/commit/21776a34b5)] - **src**: 确保将 `argv` 传递给 worker threads (theanarkh) [#52827](https://github.com/nodejs/node/pull/52827)
* \[[`3aaae68ec8`](https://github.com/nodejs/node/commit/3aaae68ec8)] - **(SEMVER-MINOR)** **src,lib**: 添加 performance.uvMetricsInfo (Rafael Gonzaga) [#54413](https://github.com/nodejs/node/pull/54413)
* \[[`ef1c0d7def`](https://github.com/nodejs/node/commit/ef1c0d7def)] - **src,permission**: 处理 pm 上的 process.chdir (Rafael Gonzaga) [#53175](https://github.com/nodejs/node/pull/53175)
* \[[`0c32918eef`](https://github.com/nodejs/node/commit/0c32918eef)] - **stream**: 将 stream 改为使用索引而不是 `for...of` (Wiyeong Seo) [#54474](https://github.com/nodejs/node/pull/54474)
* \[[`337cd412b5`](https://github.com/nodejs/node/commit/337cd412b5)] - **stream**: 使 WritableStream 上的 pendingcb 检查保持向后兼容 (jakecastelli) [#54142](https://github.com/nodejs/node/pull/54142)
* \[[`713fc0c9eb`](https://github.com/nodejs/node/commit/713fc0c9eb)] - **stream**: 当在 getIterator 中满足条件时抛出 TypeError (jakecastelli) [#53825](https://github.com/nodejs/node/pull/53825)
* \[[`9686153616`](https://github.com/nodejs/node/commit/9686153616)] - **stream**: 修复 compression/decompressionStream 的 util.inspect (Mert Can Altin) [#52283](https://github.com/nodejs/node/pull/52283)
* \[[`76110b0b43`](https://github.com/nodejs/node/commit/76110b0b43)] - **test**: 为 OpenSSL32 调整 test-tls-junk-server (Michael Dawson) [#54926](https://github.com/nodejs/node/pull/54926)
* \[[`4092889371`](https://github.com/nodejs/node/commit/4092889371)] - **test**: 为 OpenSSL32 调整 tls 测试 (Michael Dawson) [#54909](https://github.com/nodejs/node/pull/54909)
* \[[`5d48543a16`](https://github.com/nodejs/node/commit/5d48543a16)] - **test**: 修复 test-http2-socket-close.js (Hüseyin Açacak) [#54900](https://github.com/nodejs/node/pull/54900)
* \[[`8048c2eaed`](https://github.com/nodejs/node/commit/8048c2eaed)] - **test**: 改进 test-internal-fs-syncwritestream (Sunghoon) [#54671](https://github.com/nodejs/node/pull/54671)
* \[[`597bc14c90`](https://github.com/nodejs/node/commit/597bc14c90)] - **test**: 去除 test-dns 的不稳定性 (Luigi Pinca) [#54902](https://github.com/nodejs/node/pull/54902)
* \[[`a9fc8d9cfa`](https://github.com/nodejs/node/commit/a9fc8d9cfa)] - **test**: 为 OpenSSL32 修复 test-tls-dhe 测试 (Michael Dawson) [#54903](https://github.com/nodejs/node/pull/54903)
* \[[`1b3b4f4a9f`](https://github.com/nodejs/node/commit/1b3b4f4a9f)] - **test**: 为 `util-parse-env` 使用正确的文件命名语法 (Aviv Keller) [#53705](https://github.com/nodejs/node/pull/53705)
* \[[`9db46b5ea3`](https://github.com/nodejs/node/commit/9db46b5ea3)] - **test**: 添加缺失的 await (Luigi Pinca) [#54828](https://github.com/nodejs/node/pull/54828)
* \[[`124f715679`](https://github.com/nodejs/node/commit/124f715679)] - **test**: 将更多 url 测试迁移到 `node:test` (Yagiz Nizipli) [#54636](https://github.com/nodejs/node/pull/54636)
* \[[`d2ec96150a`](https://github.com/nodejs/node/commit/d2ec96150a)] - **test**: 在 `test-runner-run` 中去除颜色字符 (Giovanni Bucci) [#54552](https://github.com/nodejs/node/pull/54552)
* \[[`747d9ae72e`](https://github.com/nodejs/node/commit/747d9ae72e)] - **test**: 去除 test-http2-misbehaving-multiplex 的不稳定性 (Luigi Pinca) [#54872](https://github.com/nodejs/node/pull/54872)
* \[[`7b7687eadc`](https://github.com/nodejs/node/commit/7b7687eadc)] - **test**: 移除 test-http2-misbehaving-multiplex 中的死代码 (Luigi Pinca) [#54860](https://github.com/nodejs/node/pull/54860)
* \[[`60f5f5426d`](https://github.com/nodejs/node/commit/60f5f5426d)] - **test**: 降低 test-esm-loader-hooks-inspect-wait 的不稳定性 (Luigi Pinca) [#54827](https://github.com/nodejs/node/pull/54827)
* \[[`f5e77385c5`](https://github.com/nodejs/node/commit/f5e77385c5)] - **test**: 减小 test-worker-arraybuffer-zerofill 中的分配大小 (James M Snell) [#54839](https://github.com/nodejs/node/pull/54839)
* \[[`f26cf09d6b`](https://github.com/nodejs/node/commit/f26cf09d6b)] - **test**: 为 OpenSSL32 修复 test-tls-client-mindhsize (Michael Dawson) [#54739](https://github.com/nodejs/node/pull/54739)
* \[[`c6f9afec94`](https://github.com/nodejs/node/commit/c6f9afec94)] - **test**: 使用平台超时 (jakecastelli) [#54591](https://github.com/nodejs/node/pull/54591)
* \[[`8f49b7c3ee`](https://github.com/nodejs/node/commit/8f49b7c3ee)] - **test**: 减少 test-fs-existssync-false 中的 fs 调用 (Yagiz Nizipli) [#54815](https://github.com/nodejs/node/pull/54815)
* \[[`e2c69c9844`](https://github.com/nodejs/node/commit/e2c69c9844)] - **test**: 移动 test-http-server-request-timeouts-mixed (James M Snell) [#54841](https://github.com/nodejs/node/pull/54841)
* \[[`f7af8ca021`](https://github.com/nodejs/node/commit/f7af8ca021)] - **test**: 修复 clang 下 CauseSegfault 的 volatile 问题 (Ivan Trubach) [#54325](https://github.com/nodejs/node/pull/54325)
* \[[`d1bae5ede5`](https://github.com/nodejs/node/commit/d1bae5ede5)] - **test**: 将 `test-worker-arraybuffer-zerofill` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`b5b5cc811f`](https://github.com/nodejs/node/commit/b5b5cc811f)] - **test**: 将 `test-http-server-request-timeouts-mixed` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`9808feecac`](https://github.com/nodejs/node/commit/9808feecac)] - **test**: 将 `test-single-executable-application-empty` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`97d41c62e3`](https://github.com/nodejs/node/commit/97d41c62e3)] - **test**: 将 `test-macos-app-sandbox` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`57ae68001c`](https://github.com/nodejs/node/commit/57ae68001c)] - **test**: 将 `test-fs-utimes` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`38afc4da03`](https://github.com/nodejs/node/commit/38afc4da03)] - **test**: 将 `test-runner-run-watch` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`68e19748a6`](https://github.com/nodejs/node/commit/68e19748a6)] - **test**: 将 `test-writewrap` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`e8cb03d530`](https://github.com/nodejs/node/commit/e8cb03d530)] - **test**: 将 `test-async-context-frame` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`3a56517220`](https://github.com/nodejs/node/commit/3a56517220)] - **test**: 将 `test-esm-loader-hooks-inspect-wait` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`c98cd1227d`](https://github.com/nodejs/node/commit/c98cd1227d)] - **test**: 将 `test-http2-large-file` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`16176a6323`](https://github.com/nodejs/node/commit/16176a6323)] - **test**: 将 `test-runner-watch-mode-complex` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`eed0537533`](https://github.com/nodejs/node/commit/eed0537533)] - **test**: 将 `test-performance-function` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`d0f208d2e9`](https://github.com/nodejs/node/commit/d0f208d2e9)] - **test**: 将 `test-debugger-heap-profiler` 标记为 flaky (Yagiz Nizipli) [#54802](https://github.com/nodejs/node/pull/54802)
* \[[`68891a6363`](https://github.com/nodejs/node/commit/68891a6363)] - **test**: 修复路径包含 `'` 时的 `test-process-load-env-file` (Antoine du Hamel) [#54511](https://github.com/nodejs/node/pull/54511)
* \[[`4f82673139`](https://github.com/nodejs/node/commit/4f82673139)] - **test**: 因 macOS 问题重构 fs-watch 测试 (Santiago Gimeno) [#54498](https://github.com/nodejs/node/pull/54498)
* \[[`3606c53fdc`](https://github.com/nodejs/node/commit/3606c53fdc)] - **test**: 重构 `test-esm-type-field-errors` (Giovanni Bucci) [#54368](https://github.com/nodejs/node/pull/54368)
* \[[`99566aea97`](https://github.com/nodejs/node/commit/99566aea97)] - **test**: 改进子进程工具的输出 (Joyee Cheung) [#54622](https://github.com/nodejs/node/pull/54622)
* \[[`ed2377c1a1`](https://github.com/nodejs/node/commit/ed2377c1a1)] - **test**: 为 OpenSSL32 修复 test-tls-client-auth 测试 (Michael Dawson) [#54610](https://github.com/nodejs/node/pull/54610)
* \[[`d2a7e45946`](https://github.com/nodejs/node/commit/d2a7e45946)] - **test**: 更新 OpenSSL 3.2 的 TLS 测试 (Richard Lau) [#54612](https://github.com/nodejs/node/pull/54612)
* \[[`a50bbca78a`](https://github.com/nodejs/node/commit/a50bbca78a)] - **test**: 增大 ca2-cert.pem 的密钥长度 (Michael Dawson) [#54599](https://github.com/nodejs/node/pull/54599)
* \[[`d7ac3262de`](https://github.com/nodejs/node/commit/d7ac3262de)] - **test**: 更新 test-assert-typedarray-deepequal 以使用 node:test (James M Snell) [#54585](https://github.com/nodejs/node/pull/54585)
* \[[`916a73cd8f`](https://github.com/nodejs/node/commit/916a73cd8f)] - **test**: 更新 test-assert 以使用 node:test (James M Snell) [#54585](https://github.com/nodejs/node/pull/54585)
* \[[`10bea1cef5`](https://github.com/nodejs/node/commit/10bea1cef5)] - **test**: 将 ongc 和 gcutil 合并到 gc.js 中 (tannal) [#54355](https://github.com/nodejs/node/pull/54355)
* \[[`f145982436`](https://github.com/nodejs/node/commit/f145982436)] - **test**: 迁移若干测试到使用 node:test (James M Snell) [#54582](https://github.com/nodejs/node/pull/54582)
* \[[`229e102d20`](https://github.com/nodejs/node/commit/229e102d20)] - **test**: 修复 Windows 下的嵌入测试 (Vladimir Morozov) [#53659](https://github.com/nodejs/node/pull/53659)
* \[[`fcf82adef0`](https://github.com/nodejs/node/commit/fcf82adef0)] - **test**: 在 test-cli-permission 测试中使用相对路径 (sendoru) [#54188](https://github.com/nodejs/node/pull/54188)
* \[[`4c219b0235`](https://github.com/nodejs/node/commit/4c219b0235)] - **test**: 修复未清除的超时 (Isaac-yz-Liu) [#54242](https://github.com/nodejs/node/pull/54242)
* \[[`e446517a41`](https://github.com/nodejs/node/commit/e446517a41)] - **test**: 重构 `test-runner-module-mocking` (Antoine du Hamel) [#54233](https://github.com/nodejs/node/pull/54233)
* \[[`782a6a05ef`](https://github.com/nodejs/node/commit/782a6a05ef)] - **test**: 使用 assert.{s,deepS}trictEqual() (Luigi Pinca) [#54208](https://github.com/nodejs/node/pull/54208)
* \[[`d478db7adc`](https://github.com/nodejs/node/commit/d478db7adc)] - **test**: 将 test-structuredclone-jstransferable 设为非 flaky (Stefan Stojanovic) [#54115](https://github.com/nodejs/node/pull/54115)
* \[[`c8587ec90d`](https://github.com/nodejs/node/commit/c8587ec90d)] - **test**: 更新 streams 的 WPT 测试 (devstone) [#54129](https://github.com/nodejs/node/pull/54129)
* \[[`dbc26c2971`](https://github.com/nodejs/node/commit/dbc26c2971)] - **test**: 修复测试中的拼写错误 (Sonny) [#54137](https://github.com/nodejs/node/pull/54137)
* \[[`17b7ec4df3`](https://github.com/nodejs/node/commit/17b7ec4df3)] - **test**: 添加初始拉取延迟和原型污染防护测试 (Sonny) [#54061](https://github.com/nodejs/node/pull/54061)
* \[[`931ff4367a`](https://github.com/nodejs/node/commit/931ff4367a)] - **test**: 更新 WPT 测试 (Mert Can Altin) [#53814](https://github.com/nodejs/node/pull/53814)
* \[[`1c1bd7ce52`](https://github.com/nodejs/node/commit/1c1bd7ce52)] - **test**: 更新 `url` web-platform tests (Yagiz Nizipli) [#53472](https://github.com/nodejs/node/pull/53472)
* \[[`b048eaea5c`](https://github.com/nodejs/node/commit/b048eaea5c)] - **test_runner**: 重新实现 `assert.ok` 以允许解析堆栈 (Aviv Keller) [#54776](https://github.com/nodejs/node/pull/54776)
* \[[`c981e61155`](https://github.com/nodejs/node/commit/c981e61155)] - **test_runner**: 改进代码覆盖率清理 (Colin Ihrig) [#54856](https://github.com/nodejs/node/pull/54856)
* \[[`4f421b37da`](https://github.com/nodejs/node/commit/4f421b37da)] - **test_runner**: 为 `timers.enable()` 使用 validateStringArray (Deokjin Kim) [#49534](https://github.com/nodejs/node/pull/49534)
* \[[`27da75ae22`](https://github.com/nodejs/node/commit/27da75ae22)] - **test_runner**: 不暴露内部加载器 (Antoine du Hamel) [#54106](https://github.com/nodejs/node/pull/54106)
* \[[`56cbc80d28`](https://github.com/nodejs/node/commit/56cbc80d28)] - **test_runner**: 使 mock_loader 不会混淆 CJS 和 ESM 解析 (Sung Ye In) [#53846](https://github.com/nodejs/node/pull/53846)
* \[[`8fd951f7c7`](https://github.com/nodejs/node/commit/8fd951f7c7)] - **test_runner**: 移除过时注释 (Colin Ihrig) [#54146](https://github.com/nodejs/node/pull/54146)
* \[[`65b6fec3ba`](https://github.com/nodejs/node/commit/65b6fec3ba)] - **test_runner**: 即使测试被中止也运行 after hooks (Colin Ihrig) [#54151](https://github.com/nodejs/node/pull/54151)
* \[[`c0b4c8284c`](https://github.com/nodejs/node/commit/c0b4c8284c)] - **test_runner**: 为 dot reporter 添加颜色 (Giovanni) [#53450](https://github.com/nodejs/node/pull/53450)
* \[[`3000e5df91`](https://github.com/nodejs/node/commit/3000e5df91)] - **test_runner**: 支持模块 mock 中的模块检测 (Geoffrey Booth) [#53642](https://github.com/nodejs/node/pull/53642)
* \[[`f789f4c92d`](https://github.com/nodejs/node/commit/f789f4c92d)] - **(SEMVER-MINOR)** **test_runner**: 支持模块 mocking (Colin Ihrig) [#52848](https://github.com/nodejs/node/pull/52848)
* \[[`82d1c36f51`](https://github.com/nodejs/node/commit/82d1c36f51)] - **test_runner**: 使用 dot reporter 显示失败测试的堆栈跟踪 (Mihir Bhansali) [#52655](https://github.com/nodejs/node/pull/52655)
* \[[`5358601e31`](https://github.com/nodejs/node/commit/5358601e31)] - **timers**: 避免生成 holey internal arrays (Gürgün Dayıoğlu) [#54771](https://github.com/nodejs/node/pull/54771)
* \[[`b6ed97c66d`](https://github.com/nodejs/node/commit/b6ed97c66d)] - **timers**: 为 scheduler.wait 文档化 ref 选项 (Paolo Insogna) [#54605](https://github.com/nodejs/node/pull/54605)
* \[[`f524b8a28b`](https://github.com/nodejs/node/commit/f524b8a28b)] - **timers**: 修复验证 (Paolo Insogna) [#54404](https://github.com/nodejs/node/pull/54404)
* \[[`bc020f7cb3`](https://github.com/nodejs/node/commit/bc020f7cb3)] - **(SEMVER-MINOR)** **tls**: 添加 `allowPartialTrustChain` 标志 (Anna Henningsen) [#54790](https://github.com/nodejs/node/pull/54790)
* \[[`d0e6f9168e`](https://github.com/nodejs/node/commit/d0e6f9168e)] - **tls**: 移除 prototype primordials (Antoine du Hamel) [#53699](https://github.com/nodejs/node/pull/53699)
* \[[`f5c65d0be6`](https://github.com/nodejs/node/commit/f5c65d0be6)] - **tools**: 将 readability/fn_size 添加到过滤器 (Rafael Gonzaga) [#54744](https://github.com/nodejs/node/pull/54744)
* \[[`a47bb9b2c2`](https://github.com/nodejs/node/commit/a47bb9b2c2)] - **tools**: 添加用于合并和 rebase PR 的实用脚本 (Antoine du Hamel) [#54656](https://github.com/nodejs/node/pull/54656)
* \[[`fe3155cefa`](https://github.com/nodejs/node/commit/fe3155cefa)] - **tools**: 移除 readability/fn_size 规则 (Rafael Gonzaga) [#54663](https://github.com/nodejs/node/pull/54663)
* \[[`d6b9cc3acd`](https://github.com/nodejs/node/commit/d6b9cc3acd)] - **tools**: 移除未使用的 python 文件 (Aviv Keller) [#53928](https://github.com/nodejs/node/pull/53928)
* \[[`b5fbe9609c`](https://github.com/nodejs/node/commit/b5fbe9609c)] - **tools**: 从 c-ares 许可证中移除头部 (Aviv Keller) [#54335](https://github.com/nodejs/node/pull/54335)
* \[[`a7fdc608c6`](https://github.com/nodejs/node/commit/a7fdc608c6)] - **tools**: 在 windows 上查找 pyenv 路径 (Marco Ippolito) [#54314](https://github.com/nodejs/node/pull/54314)
* \[[`f90688cd5b`](https://github.com/nodejs/node/commit/f90688cd5b)] - **tools**: 使 undici updater 从 src 构建 wasm (Michael Dawson) [#54128](https://github.com/nodejs/node/pull/54128)
* \[[`a033dff2f2`](https://github.com/nodejs/node/commit/a033dff2f2)] - **tty**: 用值初始化 winSize 数组 (Michaël Zasso) [#54281](https://github.com/nodejs/node/pull/54281)
* \[[`e635e0956c`](https://github.com/nodejs/node/commit/e635e0956c)] - **typings**: 将 TypedArray 修复为全局类型 (1ilsang) [#54063](https://github.com/nodejs/node/pull/54063)
* \[[`b5bf08f31e`](https://github.com/nodejs/node/commit/b5bf08f31e)] - **typings**: 更正 `SafePromisePrototypeFinally` 的参数类型 (Wuli) [#54727](https://github.com/nodejs/node/pull/54727)
* \[[`628ae4bde5`](https://github.com/nodejs/node/commit/628ae4bde5)] - **typings**: 添加 util.styleText 类型定义 (Rafael Gonzaga) [#54252](https://github.com/nodejs/node/pull/54252)
* \[[`cc37401ea5`](https://github.com/nodejs/node/commit/cc37401ea5)] - **typings**: 添加缺失的 binding 函数 `writeFileUtf8()` (Jungku Lee) [#54110](https://github.com/nodejs/node/pull/54110)
* \[[`728c3fd6f1`](https://github.com/nodejs/node/commit/728c3fd6f1)] - **url**: 修改 pathToFileURL 以处理扩展 UNC 路径 (Early Riser) [#54262](https://github.com/nodejs/node/pull/54262)
* \[[`b25563dfcb`](https://github.com/nodejs/node/commit/b25563dfcb)] - **url**: 使用 ObjectAssign 改进 resolveObject (Early Riser) [#54092](https://github.com/nodejs/node/pull/54092)
* \[[`eededd1ca8`](https://github.com/nodejs/node/commit/eededd1ca8)] - **url**: 使 URL.parse 可枚举 (Filip Skokan) [#53720](https://github.com/nodejs/node/pull/53720)
* \[[`4eb0749b6c`](https://github.com/nodejs/node/commit/4eb0749b6c)] - **(SEMVER-MINOR)** **url**: 实现更安全的 URL 解析 parse 方法 (Ali Hassan) [#52280](https://github.com/nodejs/node/pull/52280)
* \[[`9e1c2293bf`](https://github.com/nodejs/node/commit/9e1c2293bf)] - **vm**: 加强模块类型检查 (Chengzhong Wu) [#52162](https://github.com/nodejs/node/pull/52162)
* \[[`2d90340cb3`](https://github.com/nodejs/node/commit/2d90340cb3)] - **(SEMVER-MINOR)** **vm**: 通过 vm.constants.DONT_CONTEXTIFY 引入原生上下文 (Joyee Cheung) [#54394](https://github.com/nodejs/node/pull/54394)
* \[[`4644d05ab5`](https://github.com/nodejs/node/commit/4644d05ab5)] - **zlib**: 弃用不使用 new 实例化类的方式 (Yagiz Nizipli) [#54708](https://github.com/nodejs/node/pull/54708)
* \[[`ecdf6dd444`](https://github.com/nodejs/node/commit/ecdf6dd444)] - **zlib**: 简化验证器 (Yagiz Nizipli) [#54442](https://github.com/nodejs/node/pull/54442)

<a id="20.17.0"></a>

## 2024-08-21，版本 20.17.0 'Iron'（LTS），@marco-ippolito

### 模块：支持 require() 同步 ESM 图

此版本在标志 `--experimental-require-module` 下新增了对同步 ESM 图的 `require()` 支持。

如果启用了 `--experimental-require-module`，并且由 `require()` 加载的 ECMAScript
模块满足以下要求：

* 在最近的 package.json 中通过 `"type": "module"` 字段，或通过 .mjs 扩展名，明确标记为 ES 模块。
* 完全同步（不包含顶层 await）。

`require()` 将把请求的模块作为 ES 模块加载，并返回模块命名空间对象。在这种情况下，它类似于动态
`import()`，但会同步运行并直接返回命名空间对象。

由 Joyee Cheung 贡献，见 [#51977](https://github.com/nodejs/node/pull/51977)

### path：新增 `matchesGlob` 方法

现在可以通过 `path.matchesGlob(path, pattern)` 方法针对单个路径测试 glob 模式。

由 Aviv Keller 贡献，见 [#52881](https://github.com/nodejs/node/pull/52881)

### stream：公开 DuplexPair API

函数 `duplexPair` 返回一个包含两个项的数组，
每一项都是一个连接到另一端的 `Duplex` 流：

```js
const [ sideA, sideB ] = duplexPair();
```

写入一个流的内容会在另一个流上变为可读。它提供了类似于网络连接的行为，
即客户端写入的数据会被服务器读出，反之亦然。

由 Austin Wright 贡献，见 [#34111](https://github.com/nodejs/node/pull/34111)

### 其他值得注意的变更

* \[[`8e64c02b19`](https://github.com/nodejs/node/commit/8e64c02b19)] - **(SEMVER-MINOR)** **http**: 新增诊断通道 `http.client.request.error`（Kohei Ueno） [#54054](https://github.com/nodejs/node/pull/54054)
* \[[`ae30674991`](https://github.com/nodejs/node/commit/ae30674991)] - **meta**: 将 jake 添加为协作者（jakecastelli） [#54004](https://github.com/nodejs/node/pull/54004)
* \[[`4a3ecbfc9b`](https://github.com/nodejs/node/commit/4a3ecbfc9b)] - **(SEMVER-MINOR)** **stream**: 为 `ReadableStreamBYOBReader.read` 实现 `min` 选项（Mattias Buelens） [#50888](https://github.com/nodejs/node/pull/50888)

### 提交

* \[[`b3a2726cbc`](https://github.com/nodejs/node/commit/b3a2726cbc)] - **assert**: 在 innerOk 中使用 isError 而不是 instanceof（Pietro Marchini） [#53980](https://github.com/nodejs/node/pull/53980)
* \[[`c7e4c3daf4`](https://github.com/nodejs/node/commit/c7e4c3daf4)] - **benchmark**: 添加 cpSync 基准测试（Yagiz Nizipli） [#53612](https://github.com/nodejs/node/pull/53612)
* \[[`a52de8c5ff`](https://github.com/nodejs/node/commit/a52de8c5ff)] - **bootstrap**: 使用 `console.log` 打印 `--help` 信息（Jacob Hummer） [#51463](https://github.com/nodejs/node/pull/51463)
* \[[`61b90e7c5e`](https://github.com/nodejs/node/commit/61b90e7c5e)] - **build**: 将 gcovr 更新到 7.2 并更新 codecov 配置（Benjamin E. Coe） [#54019](https://github.com/nodejs/node/pull/54019)
* \[[`a9c04eaa27`](https://github.com/nodejs/node/commit/a9c04eaa27)] - **build**: 确保在 64 位上启用 v8\_pointer\_compression\_sandbox（Shelley Vohr） [#53884](https://github.com/nodejs/node/pull/53884)
* \[[`342a663d7a`](https://github.com/nodejs/node/commit/342a663d7a)] - **build**: 在更新 codecov 时触发 coverage CI（Yagiz Nizipli） [#53929](https://github.com/nodejs/node/pull/53929)
* \[[`5727b4d129`](https://github.com/nodejs/node/commit/5727b4d129)] - **build**: 更新 codecov 覆盖率构建计数（Yagiz Nizipli） [#53929](https://github.com/nodejs/node/pull/53929)
* \[[`977af25870`](https://github.com/nodejs/node/commit/977af25870)] - **build**: 禁用 test-asan 工作流（Michaël Zasso） [#53844](https://github.com/nodejs/node/pull/53844)
* \[[`04798fb104`](https://github.com/nodejs/node/commit/04798fb104)] - **build**: 修复 GN 构建下 c-ares 的构建警告（Cheng） [#53750](https://github.com/nodejs/node/pull/53750)
* \[[`5ec5e78574`](https://github.com/nodejs/node/commit/5ec5e78574)] - **build**: 修复 GN 下 mac 构建中 c-ares 的构建错误（Cheng） [#53687](https://github.com/nodejs/node/pull/53687)
* \[[`3d8721f0a4`](https://github.com/nodejs/node/commit/3d8721f0a4)] - **build**: 为 AIX 添加特定版本的库路径（Richard Lau） [#53585](https://github.com/nodejs/node/pull/53585)
* \[[`ffb0bd344d`](https://github.com/nodejs/node/commit/ffb0bd344d)] - **build, tools**: 去掉 `r2dir` 前面的 `/`（Richard Lau） [#53951](https://github.com/nodejs/node/pull/53951)
* \[[`a2d74f4c31`](https://github.com/nodejs/node/commit/a2d74f4c31)] - **build,tools**: 简化 shasum 签名的上传（Michaël Zasso） [#53892](https://github.com/nodejs/node/pull/53892)
* \[[`993bb3b6e7`](https://github.com/nodejs/node/commit/993bb3b6e7)] - **child\_process**: 修复不完整的原型污染加固（Liran Tal） [#53781](https://github.com/nodejs/node/pull/53781)
* \[[`137a2e5766`](https://github.com/nodejs/node/commit/137a2e5766)] - **cli**: 记录 `--inspect` 端口 `0` 的行为（Aviv Keller） [#53782](https://github.com/nodejs/node/pull/53782)
* \[[`820e6e1737`](https://github.com/nodejs/node/commit/820e6e1737)] - **cli**: 更新 `node.1` 以反映 Atom 的退役（Aviv Keller） [#53734](https://github.com/nodejs/node/pull/53734)
* \[[`fa0e8d7b3b`](https://github.com/nodejs/node/commit/fa0e8d7b3b)] - **crypto**: 避免使用 std::function（Tobias Nießen） [#53683](https://github.com/nodejs/node/pull/53683)
* \[[`460240c368`](https://github.com/nodejs/node/commit/460240c368)] - **crypto**: 让 deriveBits 的长度参数变为可选且可为 null（Filip Skokan） [#53601](https://github.com/nodejs/node/pull/53601)
* \[[`ceb1d5e00a`](https://github.com/nodejs/node/commit/ceb1d5e00a)] - **crypto**: 避免取得 OpenSSL 对象的所有权（Tobias Nießen） [#53460](https://github.com/nodejs/node/pull/53460)
* \[[`44268c27eb`](https://github.com/nodejs/node/commit/44268c27eb)] - **deps**: 将 corepack 更新到 0.29.3（Node.js GitHub Bot） [#54072](https://github.com/nodejs/node/pull/54072)
* \[[`496975ece0`](https://github.com/nodejs/node/commit/496975ece0)] - **deps**: 将 c-ares 更新到 v1.32.3（Node.js GitHub Bot） [#54020](https://github.com/nodejs/node/pull/54020)
* \[[`5eea419349`](https://github.com/nodejs/node/commit/5eea419349)] - **deps**: 将 c-ares 更新到 v1.32.2（Node.js GitHub Bot） [#53865](https://github.com/nodejs/node/pull/53865)
* \[[`8c8e3688c5`](https://github.com/nodejs/node/commit/8c8e3688c5)] - **deps**: 将 googletest 更新到 4b21f1a（Node.js GitHub Bot） [#53842](https://github.com/nodejs/node/pull/53842)
* \[[`78f6b34c77`](https://github.com/nodejs/node/commit/78f6b34c77)] - **deps**: 将 minimatch 更新到 10.0.1（Node.js GitHub Bot） [#53841](https://github.com/nodejs/node/pull/53841)
* \[[`398f7acca3`](https://github.com/nodejs/node/commit/398f7acca3)] - **deps**: 将 corepack 更新到 0.29.2（Node.js GitHub Bot） [#53838](https://github.com/nodejs/node/pull/53838)
* \[[`fa8f99d90b`](https://github.com/nodejs/node/commit/fa8f99d90b)] - **deps**: 将 simdutf 更新到 5.3.0（Node.js GitHub Bot） [#53837](https://github.com/nodejs/node/pull/53837)
* \[[`a19b28336b`](https://github.com/nodejs/node/commit/a19b28336b)] - **deps**: 将 ada 更新到 2.9.0（Node.js GitHub Bot） [#53748](https://github.com/nodejs/node/pull/53748)
* \[[`2f66c7e707`](https://github.com/nodejs/node/commit/2f66c7e707)] - **deps**: 将 npm 升级到 10.8.2（npm 团队） [#53799](https://github.com/nodejs/node/pull/53799)
* \[[`2a2620e7c0`](https://github.com/nodejs/node/commit/2a2620e7c0)] - **deps**: 将 googletest 更新到 34ad51b（Node.js GitHub Bot） [#53157](https://github.com/nodejs/node/pull/53157)
* \[[`c01ce60ce7`](https://github.com/nodejs/node/commit/c01ce60ce7)] - **deps**: 将 googletest 更新到 305e5a2（Node.js GitHub Bot） [#53157](https://github.com/nodejs/node/pull/53157)
* \[[`832328ea01`](https://github.com/nodejs/node/commit/832328ea01)] - **deps**: 将 c-ares 更新到 v1.32.1（Node.js GitHub Bot） [#53753](https://github.com/nodejs/node/pull/53753)
* \[[`878e9a4ae7`](https://github.com/nodejs/node/commit/878e9a4ae7)] - **deps**: 将 minimatch 更新到 9.0.5（Node.js GitHub Bot） [#53646](https://github.com/nodejs/node/pull/53646)
* \[[`4647e6b5c5`](https://github.com/nodejs/node/commit/4647e6b5c5)] - **deps**: 将 c-ares 更新到 v1.32.0（Node.js GitHub Bot） [#53722](https://github.com/nodejs/node/pull/53722)
* \[[`30310bf887`](https://github.com/nodejs/node/commit/30310bf887)] - **doc**: 将 cluster CJS 示例中的 numCPUs require 移到文件顶部（Alfredo González） [#53932](https://github.com/nodejs/node/pull/53932)
* \[[`36170eddca`](https://github.com/nodejs/node/commit/36170eddca)] - **doc**: 将安全发布流程更新为自动化流程（Rafael Gonzaga） [#53877](https://github.com/nodejs/node/pull/53877)
* \[[`55f5e76ba7`](https://github.com/nodejs/node/commit/55f5e76ba7)] - **doc**: 修复 technical-priorities.md 中的拼写错误（YoonSoo\_Shin） [#54094](https://github.com/nodejs/node/pull/54094)
* \[[`1c0ccc0ca8`](https://github.com/nodejs/node/commit/1c0ccc0ca8)] - **doc**: 修复 diagnostic tooling support tiers 文档中的拼写错误（Taejin Kim） [#54058](https://github.com/nodejs/node/pull/54058)
* \[[`6a5120ff0f`](https://github.com/nodejs/node/commit/6a5120ff0f)] - **doc**: 将 GeoffreyBooth 移入 TSC 常规成员（Geoffrey Booth） [#54047](https://github.com/nodejs/node/pull/54047)
* \[[`ead05aad2a`](https://github.com/nodejs/node/commit/ead05aad2a)] - **doc**: 修复 recognizing-contributors 中的拼写错误（Marco Ippolito） [#53990](https://github.com/nodejs/node/pull/53990)
* \[[`25e59aebac`](https://github.com/nodejs/node/commit/25e59aebac)] - **doc**: 更新 boxstarter README（Aviv Keller） [#53785](https://github.com/nodejs/node/pull/53785)
* \[[`a3183fb927`](https://github.com/nodejs/node/commit/a3183fb927)] - **doc**: 为 `module.builtinModules` 添加仅前缀模块的信息（Grigory） [#53954](https://github.com/nodejs/node/pull/53954)
* \[[`89599e025f`](https://github.com/nodejs/node/commit/89599e025f)] - **doc**: 移除 `scroll-behavior: smooth;`（Cloyd Lau） [#53942](https://github.com/nodejs/node/pull/53942)
* \[[`139c62e40c`](https://github.com/nodejs/node/commit/139c62e40c)] - **doc**: 将 --test-coverage-{ex,in}clude 移到正确位置（Colin Ihrig） [#53926](https://github.com/nodejs/node/pull/53926)
* \[[`233aba90ea`](https://github.com/nodejs/node/commit/233aba90ea)] - **doc**: 为新文件更新 `api_assets` README（Aviv Keller） [#53676](https://github.com/nodejs/node/pull/53676)
* \[[`44a1cbe98a`](https://github.com/nodejs/node/commit/44a1cbe98a)] - **doc**: 将 MattiasBuelens 添加为协作者（Mattias Buelens） [#53895](https://github.com/nodejs/node/pull/53895)
* \[[`f5280ddbc5`](https://github.com/nodejs/node/commit/f5280ddbc5)] - **doc**: 修复两位协作者的 GitHub 句柄大小写（Antoine du Hamel） [#53857](https://github.com/nodejs/node/pull/53857)
* \[[`9224e3eef1`](https://github.com/nodejs/node/commit/9224e3eef1)] - **doc**: 更新 release-post nodejs.org 脚本（Rafael Gonzaga） [#53762](https://github.com/nodejs/node/pull/53762)
* \[[`f87eed8de4`](https://github.com/nodejs/node/commit/f87eed8de4)] - **doc**: 将 MylesBorins 转为荣誉成员（Myles Borins） [#53760](https://github.com/nodejs/node/pull/53760)
* \[[`32ac80ae8d`](https://github.com/nodejs/node/commit/32ac80ae8d)] - **doc**: 将 Rafael 添加到上一次安全发布中（Rafael Gonzaga） [#53769](https://github.com/nodejs/node/pull/53769)
* \[[`e71aa7e98b`](https://github.com/nodejs/node/commit/e71aa7e98b)] - **doc**: 在示例中使用 mock.callCount()（Sébastien Règne） [#53754](https://github.com/nodejs/node/pull/53754)
* \[[`f64db24312`](https://github.com/nodejs/node/commit/f64db24312)] - **doc**: 澄清更新中明文的真实性（Tobias Nießen） [#53784](https://github.com/nodejs/node/pull/53784)
* \[[`51e736ac83`](https://github.com/nodejs/node/commit/51e736ac83)] - **doc**: 添加支持我链接选项（Michael Dawson） [#53312](https://github.com/nodejs/node/pull/53312)
* \[[`9804731d0f`](https://github.com/nodejs/node/commit/9804731d0f)] - **doc**: 将 `scroll-padding-top` 更新为 4rem（Cloyd Lau） [#53662](https://github.com/nodejs/node/pull/53662)
* \[[`229f7f8b8a`](https://github.com/nodejs/node/commit/229f7f8b8a)] - **doc**: 在 pm 中提及 v8.setFlagsFromString（Rafael Gonzaga） [#53731](https://github.com/nodejs/node/pull/53731)
* \[[`98d59aa929`](https://github.com/nodejs/node/commit/98d59aa929)] - **doc**: 移除最后一个 \<pre> 标签（Claudio W） [#53741](https://github.com/nodejs/node/pull/53741)
* \[[`60ee41df08`](https://github.com/nodejs/node/commit/60ee41df08)] - **doc**: 将投票成员和常规 TSC 从 spotlight 中排除（Michael Dawson） [#53694](https://github.com/nodejs/node/pull/53694)
* \[[`c3536cfa99`](https://github.com/nodejs/node/commit/c3536cfa99)] - **doc**: 修复面向近期 Git 版本的发布指南（Michaël Zasso） [#53709](https://github.com/nodejs/node/pull/53709)
* \[[`3b632e1871`](https://github.com/nodejs/node/commit/3b632e1871)] - **doc**: 在 assert 文档示例中要求使用 `node:process`（Alfredo González） [#53702](https://github.com/nodejs/node/pull/53702)
* \[[`754090c110`](https://github.com/nodejs/node/commit/754090c110)] - **doc**: 在 permissions 的通配符部分添加额外说明（jakecastelli） [#53664](https://github.com/nodejs/node/pull/53664)
* \[[`4346de7267`](https://github.com/nodejs/node/commit/4346de7267)] - **doc**: 标记 Node.js 22.0.0 的 NODE\_MODULE\_VERSION（Michaël Zasso） [#53650](https://github.com/nodejs/node/pull/53650)
* \[[`758178bd72`](https://github.com/nodejs/node/commit/758178bd72)] - **doc**: 将 node.module\_timer 包含到可用类别中（Vinicius Lourenço） [#53638](https://github.com/nodejs/node/pull/53638)
* \[[`e0d213df2b`](https://github.com/nodejs/node/commit/e0d213df2b)] - **doc**: 修复模块自定义钩子示例（Elliot Goodrich） [#53637](https://github.com/nodejs/node/pull/53637)
* \[[`43ac5a2441`](https://github.com/nodejs/node/commit/43ac5a2441)] - **doc**: 修复与 plan 和 TestContext 正确用法相关的文档（Emil Tayeb） [#53615](https://github.com/nodejs/node/pull/53615)
* \[[`5076f0d292`](https://github.com/nodejs/node/commit/5076f0d292)] - **doc**: 移除一些已不再适用的 news issue（Michael Dawson） [#53608](https://github.com/nodejs/node/pull/53608)
* \[[`c997dbef34`](https://github.com/nodejs/node/commit/c997dbef34)] - **doc**: 为来自 ambassadors 的 news 添加 issue（Michael Dawson） [#53607](https://github.com/nodejs/node/pull/53607)
* \[[`16d55f1d25`](https://github.com/nodejs/node/commit/16d55f1d25)] - **doc**: 为 os 添加 esm 示例（Leonardo Peixoto） [#53604](https://github.com/nodejs/node/pull/53604)
* \[[`156fc536f2`](https://github.com/nodejs/node/commit/156fc536f2)] - **doc**: 澄清 coverage reporter 的用法（Eliphaz Bouye） [#53523](https://github.com/nodejs/node/pull/53523)
* \[[`f8f247bc99`](https://github.com/nodejs/node/commit/f8f247bc99)] - **doc**: 记录新增的测试选项（Aviv Keller） [#53569](https://github.com/nodejs/node/pull/53569)
* \[[`73860aca56`](https://github.com/nodejs/node/commit/73860aca56)] - **doc**: 澄清 fs.exists() 对已存在的符号链接可能返回 false（Tobias Nießen） [#53566](https://github.com/nodejs/node/pull/53566)
* \[[`59c5c5c73e`](https://github.com/nodejs/node/commit/59c5c5c73e)] - **doc**: 注明 http.closeAllConnections 不包含已升级的套接字（Rob Hogan） [#53560](https://github.com/nodejs/node/pull/53560)
* \[[`1cd3c8eb27`](https://github.com/nodejs/node/commit/1cd3c8eb27)] - **doc**: 修复拼写错误（EhsanKhaki） [#53397](https://github.com/nodejs/node/pull/53397)
* \[[`3c5e593e2a`](https://github.com/nodejs/node/commit/3c5e593e2a)] - **doc, meta**: 将 PTAL 添加到术语表（Aviv Keller） [#53770](https://github.com/nodejs/node/pull/53770)
* \[[`f336e61257`](https://github.com/nodejs/node/commit/f336e61257)] - **doc, test**: tracing channel 的 hasSubscribers getter（Thomas Hunter II） [#52908](https://github.com/nodejs/node/pull/52908)
* \[[`4187b81439`](https://github.com/nodejs/node/commit/4187b81439)] - **doc, typings**: events.once 接受 symbol 事件类型（René） [#53542](https://github.com/nodejs/node/pull/53542)
* \[[`3cdf94d403`](https://github.com/nodejs/node/commit/3cdf94d403)] - **doc,tty**: 为 ReadStream 和 WriteStream 添加文档（jakecastelli） [#53567](https://github.com/nodejs/node/pull/53567)
* \[[`5d03f6fab7`](https://github.com/nodejs/node/commit/5d03f6fab7)] - **esm**: 将 hooks 测试与其他测试一起移动（Geoffrey Booth） [#53558](https://github.com/nodejs/node/pull/53558)
* \[[`490f15a99b`](https://github.com/nodejs/node/commit/490f15a99b)] - **fs**: 确保 fs 和 fs/promises 中 mkdtemp 的一致性（YieldRay） [#53776](https://github.com/nodejs/node/pull/53776)
* \[[`8e64c02b19`](https://github.com/nodejs/node/commit/8e64c02b19)] - **(SEMVER-MINOR)** **http**: 新增诊断通道 `http.client.request.error`（Kohei Ueno） [#54054](https://github.com/nodejs/node/pull/54054)
* \[[`0d70c79ebf`](https://github.com/nodejs/node/commit/0d70c79ebf)] - **lib**: 在 primordials 中使用 ObjectAssign 优化 copyError（HEESEUNG） [#53999](https://github.com/nodejs/node/pull/53999)
* \[[`a4ff2ac0f0`](https://github.com/nodejs/node/commit/a4ff2ac0f0)] - **lib**: 改进 cluster/primary 代码（Ehsan Khakifirooz） [#53756](https://github.com/nodejs/node/pull/53756)
* \[[`c667fbd988`](https://github.com/nodejs/node/commit/c667fbd988)] - **lib**: 改进 cjs 中未找到索引时的错误消息（Vinicius Lourenço） [#53859](https://github.com/nodejs/node/pull/53859)
* \[[`51ba566171`](https://github.com/nodejs/node/commit/51ba566171)] - **lib**: 在 source maps 中装饰异步堆栈跟踪（Chengzhong Wu） [#53860](https://github.com/nodejs/node/pull/53860)
* \[[`d012dd3d29`](https://github.com/nodejs/node/commit/d012dd3d29)] - **lib**: 从 permissions.js 中移除 path.resolve（Rafael Gonzaga） [#53729](https://github.com/nodejs/node/pull/53729)
* \[[`1e9ff50446`](https://github.com/nodejs/node/commit/1e9ff50446)] - **lib**: 为 PerformanceMeasure 添加 toJSON（theanarkh） [#53603](https://github.com/nodejs/node/pull/53603)
* \[[`3a2d8bffa5`](https://github.com/nodejs/node/commit/3a2d8bffa5)] - **lib**: 使用私有符号属性将 cjs loader 中的 WeakMap 转换掉（Chengzhong Wu） [#52095](https://github.com/nodejs/node/pull/52095)
* \[[`e326342bd7`](https://github.com/nodejs/node/commit/e326342bd7)] - **meta**: 为 js 子系统添加 `sqlite`（Alex Yang） [#53911](https://github.com/nodejs/node/pull/53911)
* \[[`bfabfb4d17`](https://github.com/nodejs/node/commit/bfbfb4d17)] - **meta**: 将 tsc 成员转为荣誉成员（Michael Dawson） [#54029](https://github.com/nodejs/node/pull/54029)
* \[[`ae30674991`](https://github.com/nodejs/node/commit/ae30674991)] - **meta**: 将 jake 添加为协作者（jakecastelli） [#54004](https://github.com/nodejs/node/pull/54004)
* \[[`6ca0cfc602`](https://github.com/nodejs/node/commit/6ca0cfc602)] - **meta**: 移除 hljs 的许可证（Aviv Keller） [#53970](https://github.com/nodejs/node/pull/53970)
* \[[`e6ba121e83`](https://github.com/nodejs/node/commit/e6ba121e83)] - **meta**: 让更多 bug 报告信息变为必填（Aviv Keller） [#53718](https://github.com/nodejs/node/pull/53718)
* \[[`1864cddd0c`](https://github.com/nodejs/node/commit/1864cddd0c)] - **meta**: 将 actions secrets 存储在环境变量中（Aviv Keller） [#53930](https://github.com/nodejs/node/pull/53930)
* \[[`c0b24e5071`](https://github.com/nodejs/node/commit/c0b24e5071)] - **meta**: 将 anonrig 移至 tsc 投票成员（Yagiz Nizipli） [#53888](https://github.com/nodejs/node/pull/53888)
* \[[`e60b089f7f`](https://github.com/nodejs/node/commit/e60b089f7f)] - **meta**: 移除 dep 更新器中的冗余日志（Aviv Keller） [#53783](https://github.com/nodejs/node/pull/53783)
* \[[`bff6995ec3`](https://github.com/nodejs/node/commit/bff6995ec3)] - **meta**: 更改 anonrig 的电子邮件地址（Yagiz Nizipli） [#53829](https://github.com/nodejs/node/pull/53829)
* \[[`c2bb46020a`](https://github.com/nodejs/node/commit/c2bb46020a)] - **meta**: 将 `node_sqlite.c` 添加到 PR 标签配置（Aviv Keller） [#53797](https://github.com/nodejs/node/pull/53797)
* \[[`b8d2bbc6d6`](https://github.com/nodejs/node/commit/b8d2bbc6d6)] - **meta**: 将一位或多位协作者转为荣誉成员（Node.js GitHub Bot） [#53758](https://github.com/nodejs/node/pull/53758)
* \[[`0ad4b7c1f7`](https://github.com/nodejs/node/commit/0ad4b7c1f7)] - **meta**: 在 commit-queue 评论中使用 HTML 实体（Aviv Keller） [#53744](https://github.com/nodejs/node/pull/53744)
* \[[`aa0c5c25d1`](https://github.com/nodejs/node/commit/aa0c5c25d1)] - **meta**: 将常规 TSC 成员转为荣誉成员（Michael Dawson） [#53693](https://github.com/nodejs/node/pull/53693)
* \[[`a5f5b4550b`](https://github.com/nodejs/node/commit/a5f5b4550b)] - **meta**: 将 codecov/codecov-action 从 4.4.1 升级到 4.5.0（dependabot\[bot]） [#53675](https://github.com/nodejs/node/pull/53675)
* \[[`f84e215c90`](https://github.com/nodejs/node/commit/f84e215c90)] - **meta**: 将 mozilla-actions/sccache-action 从 0.0.4 升级到 0.0.5（dependabot\[bot]） [#53674](https://github.com/nodejs/node/pull/53674)
* \[[`d5a9c249d3`](https://github.com/nodejs/node/commit/d5a9c249d3)] - **meta**: 将 github/codeql-action 从 3.25.7 升级到 3.25.11（dependabot\[bot]） [#53673](https://github.com/nodejs/node/pull/53673)
* \[[`39d6c780c8`](https://github.com/nodejs/node/commit/39d6c780c8)] - **meta**: 将 actions/checkout 从 4.1.6 升级到 4.1.7（dependabot\[bot]） [#53672](https://github.com/nodejs/node/pull/53672)
* \[[`bb6fe38a34`](https://github.com/nodejs/node/commit/bb6fe38a34)] - **meta**: 将 peter-evans/create-pull-request 从 6.0.5 升级到 6.1.0（dependabot\[bot]） [#53671](https://github.com/nodejs/node/pull/53671)
* \[[`5dcdfb5e6b`](https://github.com/nodejs/node/commit/5dcdfb5e6b)] - **meta**: 将 step-security/harden-runner 从 2.8.0 升级到 2.8.1（dependabot\[bot]） [#53670](https://github.com/nodejs/node/pull/53670)
* \[[`44d901a1c9`](https://github.com/nodejs/node/commit/44d901a1c9)] - **meta**: 将成员从 TSC 常规转为荣誉成员（Michael Dawson） [#53599](https://github.com/nodejs/node/pull/53599)
* \[[`0c91186afa`](https://github.com/nodejs/node/commit/0c91186afa)] - **meta**: 警告绕过弃用周期（Benjamin Gruenbaum） [#53513](https://github.com/nodejs/node/pull/53513)
* \[[`bcd08bef60`](https://github.com/nodejs/node/commit/bcd08bef60)] - **meta**: 防止在版本管理中对 issue 的常量引用（Aviv Keller） [#53564](https://github.com/nodejs/node/pull/53564)
* \[[`7625dc4927`](https://github.com/nodejs/node/commit/7625dc4927)] - **module**: 修复由 require() 和 import() 加载的子模块（Joyee Cheung） [#52487](https://github.com/nodejs/node/pull/52487)
* \[[`6c4f4772e3`](https://github.com/nodejs/node/commit/6c4f4772e3)] - **module**: 整理代码和注释（Jacob Smith） [#52437](https://github.com/nodejs/node/pull/52437)
* \[[`51b88faeac`](https://github.com/nodejs/node/commit/51b88faeac)] - **module**: 禁止从 require(esm) 中出现 CJS <-> ESM 循环边界（Joyee Cheung） [#52264](https://github.com/nodejs/node/pull/52264)
* \[[`4dae68ced4`](https://github.com/nodejs/node/commit/4dae68ced4)] - **module**: 为内置加载器集中处理 SourceTextModule 编译（Joyee Cheung） [#52291](https://github.com/nodejs/node/pull/52291)
* \[[`cad46afc07`](https://github.com/nodejs/node/commit/cad46afc07)] - **(SEMVER-MINOR)** **module**: 支持 require() 同步 ESM 图（Joyee Cheung） [#51977](https://github.com/nodejs/node/pull/51977)
* \[[`ac58c829a1`](https://github.com/nodejs/node/commit/ac58c829a1)] - **node-api**: 添加 property keys 基准测试（Chengzhong Wu） [#54012](https://github.com/nodejs/node/pull/54012)
* \[[`e6a4104bd1`](https://github.com/nodejs/node/commit/e6a4104bd1)] - **node-api**: 将 nogc 重命名为 basic（Gabriel Schulhof） [#53830](https://github.com/nodejs/node/pull/53830)
* \[[`57b8b8e18e`](https://github.com/nodejs/node/commit/57b8b8e18e)] - **(SEMVER-MINOR)** **path**: 添加 `matchesGlob` 方法（Aviv Keller） [#52881](https://github.com/nodejs/node/pull/52881)
* \[[`bf6aa53299`](https://github.com/nodejs/node/commit/bf6aa53299)] - **process**: 统一实验性警告消息（Aviv Keller） [#53704](https://github.com/nodejs/node/pull/53704)
* \[[`2a3ae16e62`](https://github.com/nodejs/node/commit/2a3ae16e62)] - **src**: 公开带参数的 LookupAndCompile（Shelley Vohr） [#53886](https://github.com/nodejs/node/pull/53886)
* \[[`0109f9c961`](https://github.com/nodejs/node/commit/0109f9c961)] - **src**: 简化 AESCipherTraits::AdditionalConfig（Tobias Nießen） [#53890](https://github.com/nodejs/node/pull/53890)
* \[[`6bafe8a457`](https://github.com/nodejs/node/commit/6bafe8a457)] - **src**: 修复 -Wshadow 警告（Shelley Vohr） [#53885](https://github.com/nodejs/node/pull/53885)
* \[[`4c36d6c47a`](https://github.com/nodejs/node/commit/4c36d6c47a)] - **src**: 修复基于文件的 Blob 的 slice 之上的 slice（Josh Lee） [#53972](https://github.com/nodejs/node/pull/53972)
* \[[`848c2d59fb`](https://github.com/nodejs/node/commit/848c2d59fb)] - **src**: 缓存不变量代码移动（Rafael Gonzaga） [#53879](https://github.com/nodejs/node/pull/53879)
* \[[`acaf5dd1cd`](https://github.com/nodejs/node/commit/acaf5dd1cd)] - **src**: 避免在 ImportJWKAsymmetricKey 中使用 strcmp（Tobias Nießen） [#53813](https://github.com/nodejs/node/pull/53813)
* \[[`b71250aaf9`](https://github.com/nodejs/node/commit/b71250aaf9)] - **src**: 在 node-file 中用 ToLocal 替换 ToLocalChecked 的用法（James M Snell） [#53869](https://github.com/nodejs/node/pull/53869)
* \[[`aff9a5339a`](https://github.com/nodejs/node/commit/aff9a5339a)] - **src**: 修复 env-file 标志以忽略引号前的空格（Mohit Malhotra） [#53786](https://github.com/nodejs/node/pull/53786)
* \[[`e352a4ef27`](https://github.com/nodejs/node/commit/e352a4ef27)] - **src**: 更新对规范章节的过时引用（Tobias Nießen） [#53832](https://github.com/nodejs/node/pull/53832)
* \[[`1a4da22a60`](https://github.com/nodejs/node/commit/1a4da22a60)] - **src**: 在 ManagedEVPPKey 中使用 Maybe\<void>（Tobias Nießen） [#53811](https://github.com/nodejs/node/pull/53811)
* \[[`0c24b91bd2`](https://github.com/nodejs/node/commit/0c24b91bd2)] - **src**: 修复 ExportJWKAsymmetricKey 中的错误处理（Tobias Nießen） [#53767](https://github.com/nodejs/node/pull/53767)
* \[[`81cd84c716`](https://github.com/nodejs/node/commit/81cd84c716)] - **src**: 在 node::crypto::error 中使用 Maybe\<void>（Tobias Nießen） [#53766](https://github.com/nodejs/node/pull/53766)
* \[[`8135f3616d`](https://github.com/nodejs/node/commit/8135f3616d)] - **src**: 修复 node.h 中的拼写错误（Daeyeon Jeong） [#53759](https://github.com/nodejs/node/pull/53759)
* \[[`e6d735a997`](https://github.com/nodejs/node/commit/e6d735a997)] - **src**: 记录 Node.js context embedder data（Joyee Cheung） [#53611](https://github.com/nodejs/node/pull/53611)
* \[[`584beaa2ed`](https://github.com/nodejs/node/commit/584beaa2ed)] - **src**: 对复制进 snapshot 的数据进行零初始化（Joyee Cheung） [#53563](https://github.com/nodejs/node/pull/53563)
* \[[`ef5dabd8c6`](https://github.com/nodejs/node/commit/ef5dabd8c6)] - **src**: 修复传入 '--inspect-brk' 时的 Worker 终止问题（Daeyeon Jeong） [#53724](https://github.com/nodejs/node/pull/53724)
* \[[`62f4f6f48e`](https://github.com/nodejs/node/commit/62f4f6f48e)] - **src**: 移除 ArrayBufferAllocator::Reallocate 覆盖（Shu-yu Guo） [#52910](https://github.com/nodejs/node/pull/52910)
* \[[`a6dd8643fa`](https://github.com/nodejs/node/commit/a6dd8643fa)] - **src**: 减少 C++ 中 CLI 选项不必要的序列化（Joyee Cheung） [#52451](https://github.com/nodejs/node/pull/52451)
* \[[`31fdb881cf`](https://github.com/nodejs/node/commit/31fdb881cf)] - **src,lib**: 公开 getCategoryEnabledBuffer 以在 node.http 中使用（Vinicius Lourenço） [#53602](https://github.com/nodejs/node/pull/53602)
* \[[`2eea8502e1`](https://github.com/nodejs/node/commit/2eea8502e1)] - **src,test**: 进一步清理对 osx 的引用（Daniel Bayley） [#53820](https://github.com/nodejs/node/pull/53820)
* \[[`7c21bb99a5`](https://github.com/nodejs/node/commit/7c21bb99a5)] - **(SEMVER-MINOR)** **stream**: 公开 DuplexPair API（Austin Wright） [#34111](https://github.com/nodejs/node/pull/34111)
* \[[`56299f7309`](https://github.com/nodejs/node/commit/56299f7309)] - **stream**: 改善 inspector 的易用性（Benjamin Gruenbaum） [#53800](https://github.com/nodejs/node/pull/53800)
* \[[`9b82b15230`](https://github.com/nodejs/node/commit/9b82b15230)] - **stream**: 更新 async iterator return() 方法中的进行中 promise（Mattias Buelens） [#52657](https://github.com/nodejs/node/pull/52657)
* \[[`4a3ecbfc9b`](https://github.com/nodejs/node/commit/4a3ecbfc9b)] - **(SEMVER-MINOR)** **stream**: 为 `ReadableStreamBYOBReader.read` 实现 `min` 选项（Mattias Buelens） [#50888](https://github.com/nodejs/node/pull/50888)
* \[[`bd996bf694`](https://github.com/nodejs/node/commit/bd996bf694)] - **test**: 不要在退出码测试中吞掉 uncaughtException 错误（Meghan Denny） [#54039](https://github.com/nodejs/node/pull/54039)
* \[[`77761af077`](https://github.com/nodejs/node/commit/77761af077)] - **test**: 将共享模块移动到 `test/common`（Rich Trott） [#54042](https://github.com/nodejs/node/pull/54042)
* \[[`bec88ce138`](https://github.com/nodejs/node/commit/bec88ce138)] - **test**: 使用更准确的可用磁盘空间估算跳过 sea 测试（Chengzhong Wu） [#53996](https://github.com/nodejs/node/pull/53996)
* \[[`9a98ad47cd`](https://github.com/nodejs/node/commit/9a98ad47cd)] - **test**: 移除不必要的 console 日志（KAYYY） [#53812](https://github.com/nodejs/node/pull/53812)
* \[[`364d09cf0a`](https://github.com/nodejs/node/commit/364d09cf0a)] - **test**: 为计时器健壮性添加注释并重命名测试（Rich Trott） [#54008](https://github.com/nodejs/node/pull/54008)
* \[[`5c5093dc0a`](https://github.com/nodejs/node/commit/5c5093dc0a)] - **test**: 添加针对单参数计时器的测试以提高覆盖率（Carlos Espa） [#54007](https://github.com/nodejs/node/pull/54007)
* \[[`43ede1ae0b`](https://github.com/nodejs/node/commit/43ede1ae0b)] - **test**: 将 'test/parallel/test-sqlite.js' 标记为不稳定（Colin Ihrig） [#54031](https://github.com/nodejs/node/pull/54031)
* \[[`0ad783cb42`](https://github.com/nodejs/node/commit/0ad783cb42)] - **test**: 将 test-pipe-file-to-http 标记为不稳定（jakecastelli） [#53751](https://github.com/nodejs/node/pull/53751)
* \[[`f2b4fd3544`](https://github.com/nodejs/node/commit/f2b4fd3544)] - **test**: 在 Windows 上比较路径时不考虑大小写（Early Riser） [#53993](https://github.com/nodejs/node/pull/53993)
* \[[`2e69e5f4d2`](https://github.com/nodejs/node/commit/2e69e5f4d2)] - **test**: 在大型调试构建中跳过 sea 测试（Chengzhong Wu） [#53918](https://github.com/nodejs/node/pull/53918)
* \[[`56c26fe6e5`](https://github.com/nodejs/node/commit/56c26fe6e5)] - **test**: 在 IBM i 上跳过 --title 检查（Abdirahim Musse） [#53952](https://github.com/nodejs/node/pull/53952)
* \[[`6d0b8ded00`](https://github.com/nodejs/node/commit/6d0b8ded00)] - **test**: 降低 `test-assert-esm-cjs-message-verify` 的不稳定性（Antoine du Hamel） [#53967](https://github.com/nodejs/node/pull/53967)
* \[[`edb75aebd7`](https://github.com/nodejs/node/commit/edb75aebd7)] - **test**: 在 `assertSnapshot` 中使用 env 里的 `PYTHON` 可执行文件（Antoine du Hamel） [#53938](https://github.com/nodejs/node/pull/53938)
* \[[`be94e470a6`](https://github.com/nodejs/node/commit/be94e470a6)] - **test**: 解决 test-blob-file-backed 的不稳定问题（Luigi Pinca） [#53920](https://github.com/nodejs/node/pull/53920)
* \[[`c2b0dcd165`](https://github.com/nodejs/node/commit/c2b0dcd165)] - **test**: 将 inspector-async-hook-setup-at-inspect-brk 取消设置并标记为不稳定（Abdirahim Musse） [#53692](https://github.com/nodejs/node/pull/53692)
* \[[`6dc18981ac`](https://github.com/nodejs/node/commit/6dc18981ac)] - **test**: 在 pummel 测试中使用 python3 而不是 python（Mathis Wiehl） [#53057](https://github.com/nodejs/node/pull/53057)
* \[[`662bf524e1`](https://github.com/nodejs/node/commit/662bf524e1)] - **test**: 不要在 snapshot 测试中假定 cwd（Antoine du Hamel） [#53146](https://github.com/nodejs/node/pull/53146)
* \[[`a07526702a`](https://github.com/nodejs/node/commit/a07526702a)] - **test**: 修复 OpenSSL 版本检查（Richard Lau） [#53503](https://github.com/nodejs/node/pull/53503)
* \[[`2b70018d11`](https://github.com/nodejs/node/commit/2b70018d11)] - **test**: 重构并为 http-request-end 添加断言（jakecastelli） [#53411](https://github.com/nodejs/node/pull/53411)
* \[[`c0262c1561`](https://github.com/nodejs/node/commit/c0262c1561)] - **test_runner**: 切换到内部 readline 接口（Emil Tayeb） [#54000](https://github.com/nodejs/node/pull/54000)
* \[[`fb7342246c`](https://github.com/nodejs/node/commit/fb7342246c)] - **test_runner**: 不要在 mock 的 clearTimeout() 上抛错（Aksinya Bykova） [#54005](https://github.com/nodejs/node/pull/54005)
* \[[`367f9e77f3`](https://github.com/nodejs/node/commit/367f9e77f3)] - **test_runner**: 在运行后清理全局事件监听器（Eddie Abbondanzio） [#53878](https://github.com/nodejs/node/pull/53878)
* \[[`206c668ee7`](https://github.com/nodejs/node/commit/206c668ee7)] - **test_runner**: 从 run() 中移除 plan 选项（Colin Ihrig） [#53834](https://github.com/nodejs/node/pull/53834)
* \[[`8660d481e5`](https://github.com/nodejs/node/commit/8660d481e5)] - **tls**: 为 tls.Socket 添加 setKeyCert()（Brian White） [#53636](https://github.com/nodejs/node/pull/53636)
* \[[`9c5beabd83`](https://github.com/nodejs/node/commit/9c5beabd83)] - **tools**: 修复无效提交工作流中的 `SLACK_TITLE`（Antoine du Hamel） [#53912](https://github.com/nodejs/node/pull/53912)
* \[[`4dedf2aead`](https://github.com/nodejs/node/commit/4dedf2aead)] - **tools**: 更新 lint-md-dependencies（Node.js GitHub Bot） [#53840](https://github.com/nodejs/node/pull/53840)
* \[[`642d5c5d30`](https://github.com/nodejs/node/commit/642d5c5d30)] - **tools**: 使用 v8\_features.json 填充 config.gypi（Cheng） [#53749](https://github.com/nodejs/node/pull/53749)
* \[[`031206544d`](https://github.com/nodejs/node/commit/031206544d)] - **tools**: 将 lint-md-dependencies 更新到 unified\@11.0.5（Node.js GitHub Bot） [#53555](https://github.com/nodejs/node/pull/53555)
* \[[`8404421ea6`](https://github.com/nodejs/node/commit/8404421ea6)] - **tools**: 用 SnapshotBuilder 替换对 NodeMainInstance 的引用（codediverdev） [#53544](https://github.com/nodejs/node/pull/53544)
* \[[`2d8490fed5`](https://github.com/nodejs/node/commit/2d8490fed5)] - **typings**: 添加 `fs_dir` 类型（Yagiz Nizipli） [#53631](https://github.com/nodejs/node/pull/53631)
* \[[`325eae0b3f`](https://github.com/nodejs/node/commit/325eae0b3f)] - **url**: 修复拼写错误（KAYYY） [#53827](https://github.com/nodejs/node/pull/53827)
* \[[`7fc45f5e3f`](https://github.com/nodejs/node/commit/7fc45f5e3f)] - **url**: 减少不必要的字符串拷贝（Yagiz Nizipli） [#53628](https://github.com/nodejs/node/pull/53628)
* \[[`1d961facf1`](https://github.com/nodejs/node/commit/1d961facf1)] - **url**: 补充 `URL.parse()` 缺失的文档（Yagiz Nizipli） [#53733](https://github.com/nodejs/node/pull/53733)
* \[[`ce877c6d0f`](https://github.com/nodejs/node/commit/ce877c6d0f)] - **util**: 修复在发出 new Buffer() 弃用警告 #53075 时崩溃的问题（Aras Abbasi） [#53089](https://github.com/nodejs/node/pull/53089)
* \[[`d6d04279ca`](https://github.com/nodejs/node/commit/d6d04279ca)] - **worker**: 允许在 env 设置中复制 NODE\_OPTIONS（Joyee Cheung） [#53596](https://github.com/nodejs/node/pull/53596)

<a id="20.16.0"></a>

## 2024-07-24, 版本 20.16.0 'Iron' (LTS), @marco-ippolito

### process: 添加 process.getBuiltinModule(id)

`process.getBuiltinModule(id)` 提供了一种通过全局可用函数加载内置模块的方式。需要支持其他环境的 ES Modules 可以在 Node.js 中运行时，使用它有条件地加载 Node.js 内置模块，而无需处理在非 Node.js 环境中 `import` 可能抛出的解析错误，也无需使用动态 `import()`——后者要么会把模块变成异步模块，要么会把同步 API 变成异步 API。

```mjs
if (globalThis.process?.getBuiltinModule) {
  // 在 Node.js 中运行时，使用 Node.js 的 fs 模块。
  const fs = globalThis.process.getBuiltinModule('fs');
  // 如果加载用户模块需要 `require()`，请使用 createRequire()
  const module = globalThis.process.getBuiltinModule('module');
  const require = module.createRequire(import.meta.url);
  const foo = require('foo');
}
```

如果 `id` 指定了当前 Node.js 进程中可用的内置模块，则 `process.getBuiltinModule(id)` 方法返回对应的内置模块。如果 `id` 不对应任何内置模块，则返回 `undefined`。

`process.getBuiltinModule(id)` 接受 `module.isBuiltin(id)` 能识别的内置模块 ID。

即使用户修改了 `require.cache`，使得 `require(id)` 返回其他内容，`process.getBuiltinModule(id)` 返回的引用也始终指向与 `id` 对应的内置模块。

由 Joyee Cheung 在 [#52762](https://github.com/nodejs/node/pull/52762) 中贡献

### 文档：仅在文档中弃用基于 OpenSSL 引擎的 API

OpenSSL 3 已弃用对自定义引擎的支持，并建议切换到其新的提供者模型。
`https.request()`、`tls.createSecureContext()` 和 `tls.createServer()` 的 `clientCertEngine` 选项；`tls.createSecureContext()` 的 `privateKeyEngine` 和 `privateKeyIdentifier`；以及 `crypto.setEngine()` 都依赖于 OpenSSL 的这一功能。

由 Richard Lau 在 [#53329](https://github.com/nodejs/node/pull/53329) 中贡献

### inspector：修复在 Debugger.setAsyncCallStackDepth 中禁用异步钩子

`Debugger.setAsyncCallStackDepth` 之前错误地调用了启用函数。因此，在使用 Chrome DevTools 进行性能分析时，收到深度为 0 的 `Debugger.setAsyncCallStackDepth` 后，异步钩子不会被正确关闭。

由 Joyee Cheung 在 [#53473](https://github.com/nodejs/node/pull/53473) 中贡献

### 其他值得注意的变更

* \[[`09e2191432`](https://github.com/nodejs/node/commit/09e2191432)] - **(SEMVER-MINOR)** **buffer**: 为 Blob 添加 .bytes() 方法 (Matthew Aitken) [#53221](https://github.com/nodejs/node/pull/53221)
* \[[`394e00f41c`](https://github.com/nodejs/node/commit/394e00f41c)] - **(SEMVER-MINOR)** **doc**: 添加 context.assert 文档 (Colin Ihrig) [#53169](https://github.com/nodejs/node/pull/53169)
* \[[`a8601efa5e`](https://github.com/nodejs/node/commit/a8601efa5e)] - **(SEMVER-MINOR)** **doc**: 改进关于内置模块的说明 (Joyee Cheung) [#52762](https://github.com/nodejs/node/pull/52762)
* \[[`5e76c258f7`](https://github.com/nodejs/node/commit/5e76c258f7)] - **doc**: 将 StefanStojanovic 添加到协作者中 (StefanStojanovic) [#53118](https://github.com/nodejs/node/pull/53118)
* \[[`5e694026f1`](https://github.com/nodejs/node/commit/5e694026f1)] - **doc**: 将 Marco Ippolito 添加到 TSC 中 (Rafael Gonzaga) [#53008](https://github.com/nodejs/node/pull/53008)
* \[[`f3ba1eb72f`](https://github.com/nodejs/node/commit/f3ba1eb72f)] - **(SEMVER-MINOR)** **net**: 添加新的 net.server.listen 跟踪通道 (Paolo Insogna) [#53136](https://github.com/nodejs/node/pull/53136)
* \[[`2bcce3255b`](https://github.com/nodejs/node/commit/2bcce3255b)] - **(SEMVER-MINOR)** **src,permission**: --allow-wasi 与阻止 WASI exec (Rafael Gonzaga) [#53124](https://github.com/nodejs/node/pull/53124)
* \[[`a03a4c7bdd`](https://github.com/nodejs/node/commit/a03a4c7bdd)] - **(SEMVER-MINOR)** **test_runner**: 添加 context.fullName (Colin Ihrig) [#53169](https://github.com/nodejs/node/pull/53169)
* \[[`69b828f5a5`](https://github.com/nodejs/node/commit/69b828f5a5)] - **(SEMVER-MINOR)** **util**: 为 parseArgs 支持布尔类型参数的 `--no-` 形式 (Zhenwei Jin) [#53107](https://github.com/nodejs/node/pull/53107)

### 提交

* \[[`76fd0ea92e`](https://github.com/nodejs/node/commit/76fd0ea92e)] - **assert,util**: 当两者都包含相同引用时修正比较 (Daniel Lemire) [#53431](https://github.com/nodejs/node/pull/53431)
* \[[`65308b6692`](https://github.com/nodejs/node/commit/65308b6692)] - **benchmark**: 修复 permission 类别的 API 限制 (Ryan Tsien) [#51528](https://github.com/nodejs/node/pull/51528)
* \[[`1e2bc2c2d0`](https://github.com/nodejs/node/commit/1e2bc2c2d0)] - **benchmark**: 修复 napi/ref addon (Michaël Zasso) [#53233](https://github.com/nodejs/node/pull/53233)
* \[[`09e2191432`](https://github.com/nodejs/node/commit/09e2191432)] - **(SEMVER-MINOR)** **buffer**: 为 Blob 添加 .bytes() 方法 (Matthew Aitken) [#53221](https://github.com/nodejs/node/pull/53221)
* \[[`e1951a4804`](https://github.com/nodejs/node/commit/e1951a4804)] - **build**: 修复 NINJA_ARGS 之前的空格 (jakecastelli) [#53181](https://github.com/nodejs/node/pull/53181)
* \[[`76f3bb3460`](https://github.com/nodejs/node/commit/76f3bb3460)] - **build**: 在 out 目录中生成 binlog (Chengzhong Wu) [#53325](https://github.com/nodejs/node/pull/53325)
* \[[`eded0c187b`](https://github.com/nodejs/node/commit/eded0c187b)] - **build**: 支持 python 3.13 (Chengzhong Wu) [#53190](https://github.com/nodejs/node/pull/53190)
* \[[`1e57c67fdb`](https://github.com/nodejs/node/commit/1e57c67fdb)] - **build**: 将 ruff 更新到 v0.4.5 (Yagiz Nizipli) [#53180](https://github.com/nodejs/node/pull/53180)
* \[[`28e71ede63`](https://github.com/nodejs/node/commit/28e71ede63)] - **build**: 在 `test-ci-js` 目标中添加 `--skip-tests` (Antoine du Hamel) [#53105](https://github.com/nodejs/node/pull/53105)
* \[[`bb06778a65`](https://github.com/nodejs/node/commit/bb06778a65)] - **build**: 修复 GN 构建中的 embedtest 构建问题 (Cheng) [#53145](https://github.com/nodejs/node/pull/53145)
* \[[`117ff5f139`](https://github.com/nodejs/node/commit/117ff5f139)] - **build**: 对 'help' 使用更宽泛的检测 (Aviv Keller) [#53045](https://github.com/nodejs/node/pull/53045)
* \[[`9aa896e7f5`](https://github.com/nodejs/node/commit/9aa896e7f5)] - **build**: 修复将 -j 传递给 ninja 的问题 (Tobias Nießen) [#53088](https://github.com/nodejs/node/pull/53088)
* \[[`acdbc78955`](https://github.com/nodejs/node/commit/acdbc78955)] - **build**: 在 Android 上遇到不受支持的主机 OS 时退出 (Mohammed Keyvanzadeh) [#52882](https://github.com/nodejs/node/pull/52882)
* \[[`bf3d94478e`](https://github.com/nodejs/node/commit/bf3d94478e)] - **build**: 修复 `--enable-d8` 构建 (Richard Lau) [#53106](https://github.com/nodejs/node/pull/53106)
* \[[`99da7d7237`](https://github.com/nodejs/node/commit/99da7d7237)] - **build**: 在 GN 构建中的 config.gypi 中设置 "clang" (Cheng) [#53004](https://github.com/nodejs/node/pull/53004)
* \[[`9446278f03`](https://github.com/nodejs/node/commit/9446278f03)] - **crypto**: 改进 GetECGroupBits 签名 (Tobias Nießen) [#53364](https://github.com/nodejs/node/pull/53364)
* \[[`dc2a4af68d`](https://github.com/nodejs/node/commit/dc2a4af68d)] - **crypto**: 修复 "memory limit exceeded" 的传播 (Tobias Nießen) [#53300](https://github.com/nodejs/node/pull/53300)
* \[[`c5174f5e60`](https://github.com/nodejs/node/commit/c5174f5e60)] - **deps**: 将 c-ares 更新到 v1.31.0 (Node.js GitHub Bot) [#53554](https://github.com/nodejs/node/pull/53554)
* \[[`28e932dc7a`](https://github.com/nodejs/node/commit/28e932dc7a)] - **deps**: 将 undici 更新到 6.19.2 (Node.js GitHub Bot) [#53468](https://github.com/nodejs/node/pull/53468)
* \[[`e4f9c663c4`](https://github.com/nodejs/node/commit/e4f9c663c4)] - **deps**: 将 undici 更新到 6.19.1 (Node.js GitHub Bot) [#53468](https://github.com/nodejs/node/pull/53468)
* \[[`171dc50fdc`](https://github.com/nodejs/node/commit/171dc50fdc)] - **deps**: 将 undici 更新到 6.19.1 (Node.js GitHub Bot) [#53468](https://github.com/nodejs/node/pull/53468)
* \[[`6bb6a9100d`](https://github.com/nodejs/node/commit/6bb6a9100d)] - **deps**: 将 undici 更新到 6.19.0 (Node.js GitHub Bot) [#53468](https://github.com/nodejs/node/pull/53468)
* \[[`815d71b4cd`](https://github.com/nodejs/node/commit/815d71b4cd)] - **deps**: 将 acorn-walk 更新到 8.3.3 (Node.js GitHub Bot) [#53466](https://github.com/nodejs/node/pull/53466)
* \[[`8b5f1d765a`](https://github.com/nodejs/node/commit/8b5f1d765a)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-209717d (Node.js GitHub Bot) [#53156](https://github.com/nodejs/node/pull/53156)
* \[[`fc73da6f50`](https://github.com/nodejs/node/commit/fc73da6f50)] - **deps**: 将 c-ares 更新到 v1.30.0 (Node.js GitHub Bot) [#53416](https://github.com/nodejs/node/pull/53416)
* \[[`a6b803abd6`](https://github.com/nodejs/node/commit/a6b803abd6)] - **deps**: 将 undici 更新到 6.18.2 (Node.js GitHub Bot) [#53255](https://github.com/nodejs/node/pull/53255)
* \[[`0f235535bb`](https://github.com/nodejs/node/commit/0f235535bb)] - **deps**: 将 ada 更新到 2.8.0 (Node.js GitHub Bot) [#53254](https://github.com/nodejs/node/pull/53254)
* \[[`63407269a8`](https://github.com/nodejs/node/commit/63407269a8)] - **deps**: 将 corepack 更新到 0.28.2 (Node.js GitHub Bot) [#53253](https://github.com/nodejs/node/pull/53253)
* \[[`7a126e8773`](https://github.com/nodejs/node/commit/7a126e8773)] - **deps**: 将 c-ares 更新到 1.29.0 (Node.js GitHub Bot) [#53155](https://github.com/nodejs/node/pull/53155)
* \[[`0c8fcceefa`](https://github.com/nodejs/node/commit/0c8fcceefa)] - **deps**: 将 npm 升级到 10.8.1 (npm 团队) [#53207](https://github.com/nodejs/node/pull/53207)
* \[[`23866979f2`](https://github.com/nodejs/node/commit/23866979f2)] - **deps**: 将 undici 更新到 6.18.1 (Node.js GitHub Bot) [#53073](https://github.com/nodejs/node/pull/53073)
* \[[`4987a00142`](https://github.com/nodejs/node/commit/4987a00142)] - **deps**: 将 undici 更新到 6.18.0 (Node.js GitHub Bot) [#53073](https://github.com/nodejs/node/pull/53073)
* \[[`af226d0d9c`](https://github.com/nodejs/node/commit/af226d0d9c)] - **deps**: 将 undici 更新到 6.17.0 (Node.js GitHub Bot) [#53034](https://github.com/nodejs/node/pull/53034)
* \[[`c9c6bf8bfb`](https://github.com/nodejs/node/commit/c9c6bf8bfb)] - **deps**: 将 undici 更新到 6.16.1 (Node.js GitHub Bot) [#52948](https://github.com/nodejs/node/pull/52948)
* \[[`b32b62d590`](https://github.com/nodejs/node/commit/b32b62d590)] - **deps**: 将 undici 更新到 6.15.0 (Matthew Aitken) [#52763](https://github.com/nodejs/node/pull/52763)
* \[[`6e6641bea2`](https://github.com/nodejs/node/commit/6e6641bea2)] - **deps**: 将 googletest 更新到 33af80a (Node.js GitHub Bot) [#53053](https://github.com/nodejs/node/pull/53053)
* \[[`aa96fbe03e`](https://github.com/nodejs/node/commit/aa96fbe03e)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-4f653ff (Node.js GitHub Bot) [#53052](https://github.com/nodejs/node/pull/53052)
* \[[`ba3310ded5`](https://github.com/nodejs/node/commit/ba3310ded5)] - **deps**: 将 npm 升级到 10.8.0 (npm 团队) [#53014](https://github.com/nodejs/node/pull/53014)
* \[[`8537a2aecf`](https://github.com/nodejs/node/commit/8537a2aecf)] - **doc**: 建议不要使用 libuv node-api 函数 (Michael Dawson) [#53521](https://github.com/nodejs/node/pull/53521)
* \[[`c13600f0db`](https://github.com/nodejs/node/commit/c13600f0db)] - **doc**: 为 deps 的 PR 添加额外指导 (Michael Dawson) [#53499](https://github.com/nodejs/node/pull/53499)
* \[[`7c3edd952e`](https://github.com/nodejs/node/commit/7c3edd952e)] - **doc**: 仅在 all.html 上应用 content-visibility (Filip Skokan) [#53510](https://github.com/nodejs/node/pull/53510)
* \[[`ac5be14ed8`](https://github.com/nodejs/node/commit/ac5be14ed8)] - **doc**: 更新 options.filter 返回类型的描述 (Zhenwei Jin) [#52742](https://github.com/nodejs/node/pull/52742)
* \[[`cac300e351`](https://github.com/nodejs/node/commit/cac300e351)] - **doc**: 移除 first timer 徽章 (Aviv Keller) [#53338](https://github.com/nodejs/node/pull/53338)
* \[[`feb61459fd`](https://github.com/nodejs/node/commit/feb61459fd)] - **doc**: 将 Buffer.from(string) 添加到使用 buffer pool 的函数中 (Christian Bates-White) [#52801](https://github.com/nodejs/node/pull/52801)
* \[[`9e0a6e938b`](https://github.com/nodejs/node/commit/9e0a6e938b)] - **doc**: 为 ambassadors 项目添加初始文本 (Michael Dawson) [#52857](https://github.com/nodejs/node/pull/52857)
* \[[`55ac53cb0b`](https://github.com/nodejs/node/commit/55ac53cb0b)] - **doc**: 为流事件发出定义更多情况 (Aviv Keller) [#53317](https://github.com/nodejs/node/pull/53317)
* \[[`7128e0f9c9`](https://github.com/nodejs/node/commit/7128e0f9c9)] - **doc**: 从安全信息中移除对 policy model 的提及 (Aviv Keller) [#53249](https://github.com/nodejs/node/pull/53249)
* \[[`3e290433df`](https://github.com/nodejs/node/commit/3e290433df)] - **doc**: 修正模块 `load` hook API 中的错误 (István Donkó) [#53349](https://github.com/nodejs/node/pull/53349)
* \[[`3445c08144`](https://github.com/nodejs/node/commit/3445c08144)] - **doc**: 仅在文档中弃用基于 OpenSSL 引擎的 API (Richard Lau) [#53329](https://github.com/nodejs/node/pull/53329)
* \[[`a3e8cda019`](https://github.com/nodejs/node/commit/a3e8cda019)] - **doc**: 将 --heap-prof 和相关标志标记为稳定 (Joyee Cheung) [#53343](https://github.com/nodejs/node/pull/53343)
* \[[`0b9daaae4d`](https://github.com/nodejs/node/commit/0b9daaae4d)] - **doc**: 将 --cpu-prof 和相关标志标记为稳定 (Joyee Cheung) [#53343](https://github.com/nodejs/node/pull/53343)
* \[[`daf91834f6`](https://github.com/nodejs/node/commit/daf91834f6)] - **doc**: 从 man page 中移除 IRC (Tobias Nießen) [#53344](https://github.com/nodejs/node/pull/53344)
* \[[`4246c8fa31`](https://github.com/nodejs/node/commit/4246c8fa31)] - **doc**: 修复 `static-analysis.md` 中损坏的链接 (Richard Lau) [#53345](https://github.com/nodejs/node/pull/53345)
* \[[`955b98a0e4`](https://github.com/nodejs/node/commit/955b98a0e4)] - **doc**: 移除 PATTERN_KEY_COMPARE 中键不包含 "\*" 的情况 (Maarten Zuidhoorn) [#53215](https://github.com/nodejs/node/pull/53215)
* \[[`7832b1815f`](https://github.com/nodejs/node/commit/7832b1815f)] - **doc**: 为 fs.cp 回调添加 err 参数 (Feng Yu) [#53234](https://github.com/nodejs/node/pull/53234)
* \[[`01533df87f`](https://github.com/nodejs/node/commit/01533df87f)] - **doc**: 为 fs.copyFile 回调添加 `err` 参数 (Feng Yu) [#53234](https://github.com/nodejs/node/pull/53234)
* \[[`b081bc7d5e`](https://github.com/nodejs/node/commit/b081bc7d5e)] - **doc**: 为 Electron 32 保留 128 (Keeley Hammond) [#53203](https://github.com/nodejs/node/pull/53203)
* \[[`6b8460b560`](https://github.com/nodejs/node/commit/6b8460b560)] - **doc**: 为 macOS 使用 -jn 标志的 ninjia 构建添加说明 (jakecastelli) [#53187](https://github.com/nodejs/node/pull/53187)
* \[[`394e00f41c`](https://github.com/nodejs/node/commit/394e00f41c)] - **(SEMVER-MINOR)** **doc**: 添加 context.assert 文档 (Colin Ihrig) [#53169](https://github.com/nodejs/node/pull/53169)
* \[[`c143d61d0e`](https://github.com/nodejs/node/commit/c143d61d0e)] - **doc**: 为 HTTP 包含 ESM import (Aviv Keller) [#53165](https://github.com/nodejs/node/pull/53165)
* \[[`a8601efa5e`](https://github.com/nodejs/node/commit/a8601efa5e)] - **(SEMVER-MINOR)** **doc**: 改进关于内置模块的说明 (Joyee Cheung) [#52762](https://github.com/nodejs/node/pull/52762)
* \[[`560392de3d`](https://github.com/nodejs/node/commit/560392de3d)] - **doc**: 修复 SECURITY.md 中轻微的语法和风格问题 (Rich Trott) [#53168](https://github.com/nodejs/node/pull/53168)
* \[[`9f8e34323d`](https://github.com/nodejs/node/commit/9f8e34323d)] - **doc**: 提及使用 fd 时不会强制执行 pm (Rafael Gonzaga) [#53125](https://github.com/nodejs/node/pull/53125)
* \[[`3ac775b015`](https://github.com/nodejs/node/commit/3ac775b015)] - **doc**: 修复 `esm.md` 中的格式 (Pop Moore) [#53170](https://github.com/nodejs/node/pull/53170)
* \[[`41b08bdcf7`](https://github.com/nodejs/node/commit/41b08bdcf7)] - **doc**: 修复 `timers.tick()` 示例中的错误变量名 (Deokjin Kim) [#53147](https://github.com/nodejs/node/pull/53147)
* \[[`698ea7aa5a`](https://github.com/nodejs/node/commit/698ea7aa5a)] - **doc**: 修复 `context.plan()` 示例中的错误函数名 (Deokjin Kim) [#53140](https://github.com/nodejs/node/pull/53140)
* \[[`a99359d79d`](https://github.com/nodejs/node/commit/a99359d79d)] - **doc**: 为 Windows 用户和符号链接添加说明 (Aviv Keller) [#53117](https://github.com/nodejs/node/pull/53117)
* \[[`61ec2af292`](https://github.com/nodejs/node/commit/61ec2af292)] - **doc**: 将所有 TLS-PSK 文档移动到其专门章节 (Alba Mendez) [#35717](https://github.com/nodejs/node/pull/35717)
* \[[`5e76c258f7`](https://github.com/nodejs/node/commit/5e76c258f7)] - **doc**: 将 StefanStojanovic 添加到协作者中 (StefanStojanovic) [#53118](https://github.com/nodejs/node/pull/53118)
* \[[`1dc406ba62`](https://github.com/nodejs/node/commit/1dc406ba62)] - **doc**: 改进 --built-in-modules-path 的 ninja 构建 (jakecastelli) [#53007](https://github.com/nodejs/node/pull/53007)
* \[[`2854585662`](https://github.com/nodejs/node/commit/2854585662)] - **doc**: 避免锚点跳转时被导航栏遮挡 (Cloyd Lau) [#45131](https://github.com/nodejs/node/pull/45131)
* \[[`3f432f829f`](https://github.com/nodejs/node/commit/3f432f829f)] - **doc**: 移除 pull requests 中不可用的 youtube 链接 (Deokjin Kim) [#52982](https://github.com/nodejs/node/pull/52982)
* \[[`5e694026f1`](https://github.com/nodejs/node/commit/5e694026f1)] - **doc**: 将 Marco Ippolito 添加到 TSC 中 (Rafael Gonzaga) [#53008](https://github.com/nodejs/node/pull/53008)
* \[[`231e44043e`](https://github.com/nodejs/node/commit/231e44043e)] - **doc**: 在 `timers.enable()` 中添加缺失的受支持计时器值 (Deokjin Kim) [#52969](https://github.com/nodejs/node/pull/52969)
* \[[`b8944f6938`](https://github.com/nodejs/node/commit/b8944f6938)] - **doc, http**: 添加 `rejectNonStandardBodyWrites` 选项，明确其行为 (jakecastelli) [#53396](https://github.com/nodejs/node/pull/53396)
* \[[`0354584738`](https://github.com/nodejs/node/commit/0354584738)] - **doc, meta**: 整理 Node-API 贡献指南 (Aviv Keller) [#53243](https://github.com/nodejs/node/pull/53243)
* \[[`9ae3719c4e`](https://github.com/nodejs/node/commit/9ae3719c4e)] - **doc, meta**: 在 CONTRIBUTING.md 中使用 markdown 而不是 HTML (Aviv Keller) [#53235](https://github.com/nodejs/node/pull/53235)
* \[[`621e073c96`](https://github.com/nodejs/node/commit/621e073c96)] - **fs**: 在设置 watch 时，如果被监视文件被移除，不要崩溃 (Matteo Collina) [#53452](https://github.com/nodejs/node/pull/53452)
* \[[`f00ee1c377`](https://github.com/nodejs/node/commit/f00ee1c377)] - **fs**: 修复 cp 目录/非目录不匹配的错误消息 (Mathis Wiehl) [#53150](https://github.com/nodejs/node/pull/53150)
* \[[`655b960418`](https://github.com/nodejs/node/commit/655b960418)] - **http2**: 当与 promisify 一起使用时，拒绝失败的 http2.connect (ehsankhfr) [#53475](https://github.com/nodejs/node/pull/53475)
* \[[`eb0b68bb29`](https://github.com/nodejs/node/commit/eb0b68bb29)] - **inspector**: 修复在 Debugger.setAsyncCallStackDepth 中禁用异步钩子 (Joyee Cheung) [#53473](https://github.com/nodejs/node/pull/53473)
* \[[`1c0b89be4c`](https://github.com/nodejs/node/commit/1c0b89be4c)] - **lib**: 修复注释中的拼写错误 (codediverdev) [#53543](https://github.com/nodejs/node/pull/53543)
* \[[`55922d9cb0`](https://github.com/nodejs/node/commit/55922d9cb0)] - **lib**: 移除未使用的代码 (theanarkh) [#53463](https://github.com/nodejs/node/pull/53463)
* \[[`06374ef96b`](https://github.com/nodejs/node/commit/06374ef96b)] - **lib**: 修复 `Symbol` 的命名约定 (Deokjin Kim) [#53387](https://github.com/nodejs/node/pull/53387)
* \[[`d1a780039a`](https://github.com/nodejs/node/commit/d1a780039a)] - **lib**: 修复定时器泄漏 (theanarkh) [#53337](https://github.com/nodejs/node/pull/53337)
* \[[`8689ce4b41`](https://github.com/nodejs/node/commit/8689ce4b41)] - **lib**: 修复 validateUint32 的误导性参数 (Tobias Nießen) [#53307](https://github.com/nodejs/node/pull/53307)
* \[[`57d7bbf624`](https://github.com/nodejs/node/commit/57d7bbf624)] - **lib**: 修复 fetch 全局函数的名称 (Gabriel Bota) [#53227](https://github.com/nodejs/node/pull/53227)
* \[[`23f086c363`](https://github.com/nodejs/node/commit/23f086c363)] - **lib**: 当 socket 关闭时不要调用回调 (theanarkh) [#52829](https://github.com/nodejs/node/pull/52829)
* \[[`f325c54c80`](https://github.com/nodejs/node/commit/f325c54c80)] - **meta**: 在 PR 中使用正确的 workflow 来源 (Aviv Keller) [#53490](https://github.com/nodejs/node/pull/53490)
* \[[`8172412dbe`](https://github.com/nodejs/node/commit/8172412dbe)] - **meta**: 将一个或多个协作者转为 emeritus (Node.js GitHub Bot) [#53480](https://github.com/nodejs/node/pull/53480)
* \[[`01b61d65d3`](https://github.com/nodejs/node/commit/01b61d65d3)] - **meta**: 修复依赖更新中的拼写错误 (Aviv Keller) [#53471](https://github.com/nodejs/node/pull/53471)
* \[[`12f5737cd3`](https://github.com/nodejs/node/commit/12f5737cd3)] - **meta**: 将 step-security/harden-runner 从 2.7.1 升级到 2.8.0 (dependabot[bot]) [#53245](https://github.com/nodejs/node/pull/53245)
* \[[`102e4eee3c`](https://github.com/nodejs/node/commit/102e4eee3c)] - **meta**: 将 ossf/scorecard-action 从 2.3.1 升级到 2.3.3 (dependabot[bot]) [#53248](https://github.com/nodejs/node/pull/53248)
* \[[`5ba185580d`](https://github.com/nodejs/node/commit/5ba185580d)] - **meta**: 将 actions/checkout 从 4.1.4 升级到 4.1.6 (dependabot[bot]) [#53247](https://github.com/nodejs/node/pull/53247)
* \[[`9d186cce2b`](https://github.com/nodejs/node/commit/9d186cce2b)] - **meta**: 将 github/codeql-action 从 3.25.3 升级到 3.25.7 (dependabot[bot]) [#53246](https://github.com/nodejs/node/pull/53246)
* \[[`29ab74009e`](https://github.com/nodejs/node/commit/29ab74009e)] - **meta**: 将 codecov/codecov-action 从 4.3.1 升级到 4.4.1 (dependabot[bot]) [#53244](https://github.com/nodejs/node/pull/53244)
* \[[`bd4b593f30`](https://github.com/nodejs/node/commit/bd4b593f30)] - **meta**: 从 devcontainer 中移除 `initializeCommand` (Aviv Keller) [#53137](https://github.com/nodejs/node/pull/53137)
* \[[`61b1f573cf`](https://github.com/nodejs/node/commit/61b1f573cf)] - **meta**: 将一个或多个协作者转为 emeritus (Node.js GitHub Bot) [#53065](https://github.com/nodejs/node/pull/53065)
* \[[`f3ba1eb72f`](https://github.com/nodejs/node/commit/f3ba1eb72f)] - **(SEMVER-MINOR)** **net**: 添加新的 net.server.listen 跟踪通道 (Paolo Insogna) [#53136](https://github.com/nodejs/node/pull/53136)
* \[[`67333a5796`](https://github.com/nodejs/node/commit/67333a5796)] - **(SEMVER-MINOR)** **process**: 添加 process.getBuiltinModule(id) (Joyee Cheung) [#52762](https://github.com/nodejs/node/pull/52762)
* \[[`092aa09eb3`](https://github.com/nodejs/node/commit/092aa09eb3)] - **repl**: 修复没有值的 await 对象模式 (Luke Haas) [#53331](https://github.com/nodejs/node/pull/53331)
* \[[`554d25f526`](https://github.com/nodejs/node/commit/554d25f526)] - **src**: 在预执行期间重置 `process.versions` (Richard Lau) [#53444](https://github.com/nodejs/node/pull/53444)
* \[[`a0879ad628`](https://github.com/nodejs/node/commit/a0879ad628)] - **src**: 修复动态链接的 OpenSSL 版本 (Richard Lau) [#53456](https://github.com/nodejs/node/pull/53456)
* \[[`91c05f34de`](https://github.com/nodejs/node/commit/91c05f34de)] - **src**: 从 StringEncoder 中移除 `SetEncoding` (Yagiz Nizipli) [#53441](https://github.com/nodejs/node/pull/53441)
* \[[`4f49384be5`](https://github.com/nodejs/node/commit/4f49384be5)] - **src**: 修复 env.cc 中的拼写错误 (EhsanKhaki) [#53418](https://github.com/nodejs/node/pull/53418)
* \[[`9730d1e186`](https://github.com/nodejs/node/commit/9730d1e186)] - **src**: 避免使用 strcmp，改用 operator== (Tobias Nießen) [#53439](https://github.com/nodejs/node/pull/53439)
* \[[`436ad8ceb9`](https://github.com/nodejs/node/commit/436ad8ceb9)] - **src**: 在可用时打印 v8::OOMDetails::detail (Joyee Cheung) [#53360](https://github.com/nodejs/node/pull/53360)
* \[[`f773b289eb`](https://github.com/nodejs/node/commit/f773b289eb)] - **src**: 修复 IPv6 的 IsIPAddress (Hüseyin Açacak) [#53400](https://github.com/nodejs/node/pull/53400)
* \[[`7705efd860`](https://github.com/nodejs/node/commit/7705efd860)] - **src**: 修复 permission inspector 崩溃 (theanarkh) [#53389](https://github.com/nodejs/node/pull/53389)
* \[[`260d8d9ae1`](https://github.com/nodejs/node/commit/260d8d9ae1)] - **src**: 在回溯中于 Windows 上使用 __FUNCSIG__ (Joyee Cheung) [#53135](https://github.com/nodejs/node/pull/53135)
* \[[`3b79e9c24e`](https://github.com/nodejs/node/commit/3b79e9c24e)] - **src**: 修复 external module env 和 kDisableNodeOptionsEnv (Rafael Gonzaga) [#52905](https://github.com/nodejs/node/pull/52905)
* \[[`32839c63cb`](https://github.com/nodejs/node/commit/32839c63cb)] - **src**: 减少不必要的 `GetCwd` 调用 (Yagiz Nizipli) [#53064](https://github.com/nodejs/node/pull/53064)
* \[[`840dd092ce`](https://github.com/nodejs/node/commit/840dd092ce)] - **src**: 改进 node::Dotenv 声明 (Tobias Nießen) [#52973](https://github.com/nodejs/node/pull/52973)
* \[[`2bcce3255b`](https://github.com/nodejs/node/commit/2bcce3255b)] - **(SEMVER-MINOR)** **src,permission**: --allow-wasi 与阻止 WASI exec (Rafael Gonzaga) [#53124](https://github.com/nodejs/node/pull/53124)
* \[[`e092c62a22`](https://github.com/nodejs/node/commit/e092c62a22)] - **stream**: 更新过时的 highwatermark 文档 (Jay Kim) [#53494](https://github.com/nodejs/node/pull/53494)
* \[[`71af3e8172`](https://github.com/nodejs/node/commit/71af3e8172)] - **stream**: 在 writable 中支持 dispose (Benjamin Gruenbaum) [#48547](https://github.com/nodejs/node/pull/48547)
* \[[`33a15be32f`](https://github.com/nodejs/node/commit/33a15be32f)] - **stream**: 当 pendingcb 为 0 时应调用回调 (jakecastelli) [#53438](https://github.com/nodejs/node/pull/53438)
* \[[`1b46ebbf69`](https://github.com/nodejs/node/commit/1b46ebbf69)] - **stream**: 确保会调用 `_destroy` (jakecastelli) [#53213](https://github.com/nodejs/node/pull/53213)
* \[[`9f95d41947`](https://github.com/nodejs/node/commit/9f95d41947)] - **stream**: 防止在 highWaterMark 设为 0 时流意外暂停 (jakecastelli) [#53261](https://github.com/nodejs/node/pull/53261)
* \[[`d02651c9d6`](https://github.com/nodejs/node/commit/d02651c9d6)] - **stream**: 对 writable 条件做微优化 (Orgad Shaneh) [#53189](https://github.com/nodejs/node/pull/53189)
* \[[`324070c410`](https://github.com/nodejs/node/commit/324070c410)] - **stream**: 修复 writable 中的内存使用回退问题 (Orgad Shaneh) [#53188](https://github.com/nodejs/node/pull/53188)
* \[[`48138afd35`](https://github.com/nodejs/node/commit/48138afd35)] - **stream**: 修复 webstreams (Mattias Buelens) [#51168](https://github.com/nodejs/node/pull/51168)
* \[[`24f078a22b`](https://github.com/nodejs/node/commit/24f078a22b)] - **test**: 将 `test-benchmark-crypto` 标记为 flaky (Antoine du Hamel) [#52955](https://github.com/nodejs/node/pull/52955)
* \[[`0d69ce3474`](https://github.com/nodejs/node/commit/0d69ce3474)] - **test**: 为 `test-node-output-errors` 扩展环境变量 (Richard Lau) [#53535](https://github.com/nodejs/node/pull/53535)
* \[[`1aaaad8518`](https://github.com/nodejs/node/commit/1aaaad8518)] - **test**: 更新 encoding web-platform tests (Yagiz Nizipli) [#53477](https://github.com/nodejs/node/pull/53477)
* \[[`54e0ba8771`](https://github.com/nodejs/node/commit/54e0ba8771)] - **test**: 检查运行时 OpenSSL 版本 (Richard Lau) [#53456](https://github.com/nodejs/node/pull/53456)
* \[[`059e47c320`](https://github.com/nodejs/node/commit/059e47c320)] - **test**: 更新 OpenSSL 3.0.14 的测试 (Richard Lau) [#53373](https://github.com/nodejs/node/pull/53373)
* \[[`49e6f33021`](https://github.com/nodejs/node/commit/49e6f33021)] - **test**: 修复 test-http-server-keepalive-req-gc (Etienne Pierre-doray) [#53292](https://github.com/nodejs/node/pull/53292)
* \[[`292d13a289`](https://github.com/nodejs/node/commit/292d13a289)] - **test**: 更新 OpenSSL 3.2 的 TLS 测试 (Richard Lau) [#53384](https://github.com/nodejs/node/pull/53384)
* \[[`82017c90bb`](https://github.com/nodejs/node/commit/82017c90bb)] - **test**: 修复在未编译引擎支持时的测试 (Richard Lau) [#53232](https://github.com/nodejs/node/pull/53232)
* \[[`a54090b385`](https://github.com/nodejs/node/commit/a54090b385)] - **test**: 更新 OpenSSL >= 3.2 的 TLS 追踪测试 (Richard Lau) [#53229](https://github.com/nodejs/node/pull/53229)
* \[[`3a1693421d`](https://github.com/nodejs/node/commit/3a1693421d)] - **test**: 修复 Windows 原生测试套件 (Stefan Stojanovic) [#53173](https://github.com/nodejs/node/pull/53173)
* \[[`2b07d01272`](https://github.com/nodejs/node/commit/2b07d01272)] - **test**: 在 `ps` 不可用时跳过 `test-setproctitle` (Antoine du Hamel) [#53104](https://github.com/nodejs/node/pull/53104)
* \[[`0051d1c83d`](https://github.com/nodejs/node/commit/0051d1c83d)] - **test**: 增加分配量，以便测试失败 (Adam Majer) [#53099](https://github.com/nodejs/node/pull/53099)
* \[[`048cbe3304`](https://github.com/nodejs/node/commit/048cbe3304)] - **test**: 从 test-tls-socket-close 中移除 timers (Luigi Pinca) [#53019](https://github.com/nodejs/node/pull/53019)
* \[[`8653d9223e`](https://github.com/nodejs/node/commit/8653d9223e)] - **test**: 将 `.substr` 替换为 `.slice` (Antoine du Hamel) [#53070](https://github.com/nodejs/node/pull/53070)
* \[[`d74bda4241`](https://github.com/nodejs/node/commit/d74bda4241)] - **test**: 将 AbortController 添加到 knownGlobals (Luigi Pinca) [#53020](https://github.com/nodejs/node/pull/53020)
* \[[`f29e1e9838`](https://github.com/nodejs/node/commit/f29e1e9838)] - **test**: 跳过不稳定的 shadow realm gc 测试 (Chengzhong Wu) [#52855](https://github.com/nodejs/node/pull/52855)
* \[[`dfa498697e`](https://github.com/nodejs/node/commit/dfa498697e)] - **test,doc**: 启用 Windows 上运行 embedtest (Vladimir Morozov) [#52646](https://github.com/nodejs/node/pull/52646)
* \[[`0381817f1d`](https://github.com/nodejs/node/commit/0381817f1d)] - **test_runner**: 使用 source map 计算已执行行 (Moshe Atlow) [#53315](https://github.com/nodejs/node/pull/53315)
* \[[`9d3699b5b0`](https://github.com/nodejs/node/commit/9d3699b5b0)] - **test_runner**: 处理 watch 模式下的文件重命名和删除 (jakecastelli) [#53114](https://github.com/nodejs/node/pull/53114)
* \[[`9a36258ca0`](https://github.com/nodejs/node/commit/9a36258ca0)] - **test_runner**: 重构为使用 `validateInteger` 的最小/最大值 (Deokjin Kim) [#53148](https://github.com/nodejs/node/pull/53148)
* \[[`a03a4c7bdd`](https://github.com/nodejs/node/commit/a03a4c7bdd)] - **(SEMVER-MINOR)** **test_runner**: 添加 context.fullName (Colin Ihrig) [#53169](https://github.com/nodejs/node/pull/53169)
* \[[`a72157077a`](https://github.com/nodejs/node/commit/a72157077a)] - **test_runner**: 修复 t.assert 方法 (Colin Ihrig) [#53049](https://github.com/nodejs/node/pull/53049)
* \[[`ba764db9ab`](https://github.com/nodejs/node/commit/ba764db9ab)] - **test_runner**: 避免在找不到 coverage 行时出错 (Moshe Atlow) [#53000](https://github.com/nodejs/node/pull/53000)
* \[[`3a4a0ebd06`](https://github.com/nodejs/node/commit/3a4a0ebd06)] - **test_runner,doc**: 使文档与实际 stdout/stderr 行为保持一致 (Moshe Atlow) [#53131](https://github.com/nodejs/node/pull/53131)
* \[[`6e6646bdd5`](https://github.com/nodejs/node/commit/6e6646bdd5)] - **tls**: 检查 SSL_CTX_set_*_proto_version 的结果 (Tobias Nießen) [#53459](https://github.com/nodejs/node/pull/53459)
* \[[`2aceed4297`](https://github.com/nodejs/node/commit/2aceed4297)] - **tls**: 避免接管 OpenSSL 对象的所有权 (Tobias Nießen) [#53436](https://github.com/nodejs/node/pull/53436)
* \[[`faa5cac18c`](https://github.com/nodejs/node/commit/faa5cac18c)] - **tls**: 使用 SSL_get_peer_tmp_key (Tobias Nießen) [#53366](https://github.com/nodejs/node/pull/53366)
* \[[`68fcbb635e`](https://github.com/nodejs/node/commit/68fcbb635e)] - **tls**: 修复负 sessionTimeout 的处理 (Tobias Nießen) [#53002](https://github.com/nodejs/node/pull/53002)
* \[[`61a1c43ef1`](https://github.com/nodejs/node/commit/61a1c43ef1)] - **tools**: 修复对 test runner 输出的跳过检测 (Richard Lau) [#53545](https://github.com/nodejs/node/pull/53545)
* \[[`53a7b6e1c0`](https://github.com/nodejs/node/commit/53a7b6e1c0)] - **tools**: 修复 c-ares 更新脚本 (Marco Ippolito) [#53414](https://github.com/nodejs/node/pull/53414)
* \[[`3bd5f46a15`](https://github.com/nodejs/node/commit/3bd5f46a15)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#53158](https://github.com/nodejs/node/pull/53158)
* \[[`daab9e170f`](https://github.com/nodejs/node/commit/daab9e170f)] - **tools**: 在 Corepack 代码经过审查之前不要运行它 (Antoine du Hamel) [#53405](https://github.com/nodejs/node/pull/53405)
* \[[`d18a67f937`](https://github.com/nodejs/node/commit/d18a67f937)] - **tools**: 在 GitHub actions 上使用 Ubuntu 24.04 和 Clang (Michaël Zasso) [#53212](https://github.com/nodejs/node/pull/53212)
* \[[`e9b7a52848`](https://github.com/nodejs/node/commit/e9b7a52848)] - **tools**: 当 lib 中相关文件被更改时，在 PR 上添加 stream 标签 (jakecastelli) [#53269](https://github.com/nodejs/node/pull/53269)
* \[[`04d78dd56d`](https://github.com/nodejs/node/commit/04d78dd56d)] - **tools**: 从 make-v8 脚本中移除 no-goma 参数 (Michaël Zasso) [#53336](https://github.com/nodejs/node/pull/53336)
* \[[`37e725a500`](https://github.com/nodejs/node/commit/37e725a500)] - **tools**: 使用 sccache Github action (Moshe Atlow) [#53316](https://github.com/nodejs/node/pull/53316)
* \[[`2a1fde7e32`](https://github.com/nodejs/node/commit/2a1fde7e32)] - **tools**: 更新 Type Error 的错误消息 (Aviv Keller) [#53047](https://github.com/nodejs/node/pull/53047)
* \[[`8f5fb4192d`](https://github.com/nodejs/node/commit/8f5fb4192d)] - _**Revert**_ "**tools**: add --certify-safe to nci-ci" (Antoine du Hamel) [#53098](https://github.com/nodejs/node/pull/53098)
* \[[`69b828f5a5`](https://github.com/nodejs/node/commit/69b828f5a5)] - **(SEMVER-MINOR)** **util**: 为 parseArgs 支持布尔类型参数的 `--no-` 形式 (Zhenwei Jin) [#53107](https://github.com/nodejs/node/pull/53107)
* \[[`1a2f3ab4f5`](https://github.com/nodejs/node/commit/1a2f3ab4f5)] - **watch**: 修复变量命名 (jakecastelli) [#53101](https://github.com/nodejs/node/pull/53101)

<a id="20.15.1"></a>

## 2024-07-08，版本 20.15.1 'Iron'（LTS），@RafaelGSS

这是一个安全发布。

### 重要变更

* CVE-2024-36138 - 绕过 CVE-2024-27980 的不完整修复（高）
* CVE-2024-22020 - 通过 data URL 绕过网络导入限制（中）
* CVE-2024-22018 - fs.lstat 绕过权限模型（低）
* CVE-2024-36137 - fs.fchown/fchmod 绕过权限模型（低）
* CVE-2024-37372 - 权限模型错误处理 UNC 路径（低）

### 提交

* \[[`60e184a6e4`](https://github.com/nodejs/node/commit/60e184a6e4)] - **lib,esm**: 处理通过 data: 绕过网络导入（RafaelGSS）[nodejs-private/node-private#522](https://github.com/nodejs-private/node-private/pull/522)
* \[[`025cbd6936`](https://github.com/nodejs/node/commit/025cbd6936)] - **lib,permission**: 支持 fs.lstat（RafaelGSS）[nodejs-private/node-private#486](https://github.com/nodejs-private/node-private/pull/486)
* \[[`d38ea17341`](https://github.com/nodejs/node/commit/d38ea17341)] - **lib,permission**: 在启用 pm 时禁用 fchmod/fchown（RafaelGSS）[nodejs-private/node-private#584](https://github.com/nodejs-private/node-private/pull/584)
* \[[`1ba624cd3b`](https://github.com/nodejs/node/commit/1ba624cd3b)] - **src**: 处理 cmd 检查中的宽松扩展名（RafaelGSS）[nodejs-private/node-private#596](https://github.com/nodejs-private/node-private/pull/596)
* \[[`2524d00c3d`](https://github.com/nodejs/node/commit/2524d00c3d)] - **src,permission**: 修复 UNC 路径解析（RafaelGSS）[nodejs-private/node-private#581](https://github.com/nodejs-private/node-private/pull/581)
* \[[`484cb0f13c`](https://github.com/nodejs/node/commit/484cb0f13c)] - **src,permission**: 在 fs\_permission 上解析路径（Rafael Gonzaga）[#52761](https://github.com/nodejs/node/pull/52761)

<a id="20.15.0"></a>

## 2024-06-20，版本 20.15.0 'Iron'（LTS），@marco-ippolito

### test\_runner：支持测试计划

现在可以统计测试中预期运行的断言和子测试数量。如果实际运行的断言和子测试数量与预期不符，测试将失败。

```js
test('top level test', (t) => {
  t.plan(2);
  t.assert.ok('some relevant assertion here');
  t.subtest('subtest', () => {});
});
```

由 Colin Ihrig 在 [#52860](https://github.com/nodejs/node/pull/52860) 中贡献

### inspector：引入 `--inspect-wait` 标志

此版本引入了 `--inspect-wait` 标志，它允许调试器等待连接。此标志适用于希望从一开始就调试代码的场景。不同于会在第一行中断的 `--inspect-brk`，该标志会等待调试器连接，然后在会话建立后立即运行代码。

由 Kohei Ueno 在 [#52734](https://github.com/nodejs/node/pull/52734) 中贡献

### zlib：暴露 zlib.crc32()

此版本将 zlib 中的 crc32() 函数暴露给用户层。

它会计算数据的 32 位循环冗余校验和。如果指定了
value，则将其用作校验和的起始值，
否则使用 0 作为起始值。

CRC 算法用于计算校验和并检测数据传输中的
错误。它不适合用于加密认证。

```js
const zlib = require('node:zlib');
const { Buffer } = require('node:buffer');

let crc = zlib.crc32('hello');  // 907060870
crc = zlib.crc32('world', crc);  // 4192936109

crc = zlib.crc32(Buffer.from('hello', 'utf16le'));  // 1427272415
crc = zlib.crc32(Buffer.from('world', 'utf16le'), crc);  // 4150509955
```

由 Joyee Cheung 在 [#52692](https://github.com/nodejs/node/pull/52692) 中贡献

### cli：允许在受限 vmem 中使用 --disable-wasm-trap-handler 运行 wasm

默认情况下，Node.js 会启用基于 trap-handler 的 WebAssembly 边界
检查。因此，V8 不需要在从 WebAssembly 编译的代码中插入内联边界检查，
这可以显著加快 WebAssembly
执行速度，但此优化需要分配
一个很大的虚拟内存笼（当前为 10GB）。如果 Node.js 进程
由于系统配置或硬件限制而无法访问足够大的虚拟内存地址空间，
用户将无法运行任何涉及在该
虚拟内存笼中分配的 WebAssembly，并会看到内存不足错误。

```console
$ ulimit -v 5000000
$ node -p "new WebAssembly.Memory({ initial: 10, maximum: 100 });"
[eval]:1
new WebAssembly.Memory({ initial: 10, maximum: 100 });
^

RangeError: WebAssembly.Memory(): could not allocate memory
    at [eval]:1:1
    at runScriptInThisContext (node:internal/vm:209:10)
    at node:internal/process/execution:118:14
    at [eval]-wrapper:6:24
    at runScript (node:internal/process/execution:101:62)
    at evalScript (node:internal/process/execution:136:3)
    at node:internal/main/eval_string:49:3

```

`--disable-wasm-trap-handler` 会禁用此优化，这样当用户的 Node.js
进程可用的虚拟内存地址空间低于 V8 WebAssembly 内存笼所需空间时，
用户至少仍然可以运行 WebAssembly（但性能会较差）。

由 Joyee Cheung 在 [#52766](https://github.com/nodejs/node/pull/52766) 中贡献

### 其他重要变更

* \[[`12512c3d0e`](https://github.com/nodejs/node/commit/12512c3d0e)] - **doc**: 将 pimterry 添加为协作者（Tim Perry）[#52874](https://github.com/nodejs/node/pull/52874)
* \[[`9d485b40bb`](https://github.com/nodejs/node/commit/9d485b40bb)] - **(SEMVER-MINOR)** **tools**: 修复 tools/test.py 中的 get\_asan\_state()（Joyee Cheung）[#52766](https://github.com/nodejs/node/pull/52766)
* \[[`e98c305f52`](https://github.com/nodejs/node/commit/e98c305f52)] - **(SEMVER-MINOR)** **tools**: 支持 max\_virtual\_memory 测试配置（Joyee Cheung）[#52766](https://github.com/nodejs/node/pull/52766)
* \[[`dce0300896`](https://github.com/nodejs/node/commit/dce0300896)] - **(SEMVER-MINOR)** **tools**: 在测试状态文件中支持 !=（Joyee Cheung）[#52766](https://github.com/nodejs/node/pull/52766)

### 提交

* \[[`227093bfec`](https://github.com/nodejs/node/commit/227093bfec)] - **assert**: 为更多 Error 类型添加深度相等检查（Zhenwei Jin）[#51805](https://github.com/nodejs/node/pull/51805)
* \[[`184cfe5a71`](https://github.com/nodejs/node/commit/184cfe5a71)] - **benchmark**: 从 `start-cli-version` 中过滤掉不存在的依赖项（Adam Majer）[#51746](https://github.com/nodejs/node/pull/51746)
* \[[`8b3e83bb53`](https://github.com/nodejs/node/commit/8b3e83bb53)] - **buffer**: 更快的 atob（Daniel Lemire）[#52443](https://github.com/nodejs/node/pull/52443)
* \[[`8d628c3255`](https://github.com/nodejs/node/commit/8d628c3255)] - **buffer**: 使用 size\_t 而不是 uint32\_t 以避免段错误（Xavier Stouder）[#48033](https://github.com/nodejs/node/pull/48033)
* \[[`16ae2b2933`](https://github.com/nodejs/node/commit/16ae2b2933)] - **buffer**: 删除将索引设置为整数值的行（Zhenwei Jin）[#52588](https://github.com/nodejs/node/pull/52588)
* \[[`48c15d0dcd`](https://github.com/nodejs/node/commit/48c15d0dcd)] - **build**: 删除参数组的已弃用调用（Mohammed Keyvanzadeh）[#52913](https://github.com/nodejs/node/pull/52913)
* \[[`1be8232d17`](https://github.com/nodejs/node/commit/1be8232d17)] - **build**: 在 GN 构建中移除 base64 依赖（Cheng）[#52856](https://github.com/nodejs/node/pull/52856)
* \[[`918962d6e7`](https://github.com/nodejs/node/commit/918962d6e7)] - **build**: 在 GN 构建中将 simdjson 设为公共依赖（Cheng）[#52755](https://github.com/nodejs/node/pull/52755)
* \[[`5215b6fd8e`](https://github.com/nodejs/node/commit/5215b6fd8e)] - **build, tools**: 构建完成后将发布资源复制到 staging R2 存储桶（flakey5）[#51394](https://github.com/nodejs/node/pull/51394)
* \[[`473fa73857`](https://github.com/nodejs/node/commit/473fa73857)] - **(SEMVER-MINOR)** **cli**: 允许在受限 vmem 中使用 --disable-wasm-trap-handler 运行 wasm（Joyee Cheung）[#52766](https://github.com/nodejs/node/pull/52766)
* \[[`954d2aded4`](https://github.com/nodejs/node/commit/954d2aded4)] - **cluster**: 将 `forEach` 替换为 `for-of` 循环（Jérôme Benoit）[#50317](https://github.com/nodejs/node/pull/50317)
* \[[`794e450ea7`](https://github.com/nodejs/node/commit/794e450ea7)] - **console**: 为 console error 和 warn 添加颜色（Jithil P Ponnan）[#51629](https://github.com/nodejs/node/pull/51629)
* \[[`0fb7c18f10`](https://github.com/nodejs/node/commit/0fb7c18f10)] - **crypto**: 修复重复的 switch-case 返回值（Mustafa Ateş UZUN）[#49030](https://github.com/nodejs/node/pull/49030)
* \[[`cd1415c8b2`](https://github.com/nodejs/node/commit/cd1415c8b2)] - _**回退**_ "**crypto**: 使 Uint8Array 的 timingSafeEqual 更快"（Tobias Nießen）[#53390](https://github.com/nodejs/node/pull/53390)
* \[[`b774544bb1`](https://github.com/nodejs/node/commit/b774544bb1)] - **deps**: 启用 simdjson、simdutf、ada 的取消捆绑（Daniel Lemire）[#52924](https://github.com/nodejs/node/pull/52924)
* \[[`da4dbfc5fd`](https://github.com/nodejs/node/commit/da4dbfc5fd)] - **doc**: 移除对 AUTHORS 文件的引用（Marco Ippolito）[#52960](https://github.com/nodejs/node/pull/52960)
* \[[`2f3f2ff8af`](https://github.com/nodejs/node/commit/2f3f2ff8af)] - **doc**: 使用最新样式更新 hljs（Aviv Keller）[#52911](https://github.com/nodejs/node/pull/52911)
* \[[`3a1d17a9b1`](https://github.com/nodejs/node/commit/3a1d17a9b1)] - **doc**: 提到构建文档的更快方式（Alex Crawford）[#52937](https://github.com/nodejs/node/pull/52937)
* \[[`be309bd19d`](https://github.com/nodejs/node/commit/be309bd19d)] - **doc**: 提到 push.followTags 配置（Rafael Gonzaga）[#52906](https://github.com/nodejs/node/pull/52906)
* \[[`e62c6e2684`](https://github.com/nodejs/node/commit/e62c6e2684)] - **doc**: 记录带 `end` 选项的 pipeline（Alois Klink）[#48970](https://github.com/nodejs/node/pull/48970)
* \[[`af27225cf6`](https://github.com/nodejs/node/commit/af27225cf6)] - **doc**: 为 `execFileSync` 方法添加示例并引用 stdio（Evan Shortiss）[#39412](https://github.com/nodejs/node/pull/39412)
* \[[`086626f9b1`](https://github.com/nodejs/node/commit/086626f9b1)] - **doc**: 为 http server.close 等添加示例和说明（mary marchini）[#49091](https://github.com/nodejs/node/pull/49091)
* \[[`3aa3337a00`](https://github.com/nodejs/node/commit/3aa3337a00)] - **doc**: 修复 `dns.lookup` 中 family `0` 和 `all` 的描述（Adam Jones）[#51653](https://github.com/nodejs/node/pull/51653)
* \[[`585f2a2e7f`](https://github.com/nodejs/node/commit/585f2a2e7f)] - **doc**: 更新 `fs.realpath` 文档（sinkhaha）[#48170](https://github.com/nodejs/node/pull/48170)
* \[[`4bf3d44e1d`](https://github.com/nodejs/node/commit/4bf3d44e1d)] - **doc**: 为清晰起见更新 fs read 文档（Mert Can Altin）[#52453](https://github.com/nodejs/node/pull/52453)
* \[[`ae5d47dde3`](https://github.com/nodejs/node/commit/ae5d47dde3)] - **doc**: watermark 字符串行为（Benjamin Gruenbaum）[#52842](https://github.com/nodejs/node/pull/52842)
* \[[`1e429d10d3`](https://github.com/nodejs/node/commit/1e429d10d3)] - **doc**: 排除带 baking-for-lts 的提交（Marco Ippolito）[#52896](https://github.com/nodejs/node/pull/52896)
* \[[`3df3e37cdb`](https://github.com/nodejs/node/commit/3df3e37cdb)] - **doc**: 在 release key bash 命令旁添加姓名（Aviv Keller）[#52878](https://github.com/nodejs/node/pull/52878)
* \[[`12512c3d0e`](https://github.com/nodejs/node/commit/12512c3d0e)] - **doc**: 将 pimterry 添加为协作者（Tim Perry）[#52874](https://github.com/nodejs/node/pull/52874)
* \[[`97e0fef019`](https://github.com/nodejs/node/commit/97e0fef019)] - **doc**: 为 GLOSSARY.md 添加更多定义（Aviv Keller）[#52798](https://github.com/nodejs/node/pull/52798)
* \[[`91fadac162`](https://github.com/nodejs/node/commit/91fadac162)] - **doc**: 让文档对新手更友好、更具描述性（Serkan Özel）[#38056](https://github.com/nodejs/node/pull/38056)
* \[[`a3b20126fd`](https://github.com/nodejs/node/commit/a3b20126fd)] - **doc**: 在 API 文档中添加 OpenSSL 错误（John Lamp）[#34213](https://github.com/nodejs/node/pull/34213)
* \[[`9587ae9b5b`](https://github.com/nodejs/node/commit/9587ae9b5b)] - **doc**: 简化 `branch-diff` 命令的复制粘贴（Antoine du Hamel）[#52757](https://github.com/nodejs/node/pull/52757)
* \[[`6ea72a53c3`](https://github.com/nodejs/node/commit/6ea72a53c3)] - **doc**: 将 test\_runner 添加到子系统中（Raz Luvaton）[#52774](https://github.com/nodejs/node/pull/52774)
* \[[`972eafd983`](https://github.com/nodejs/node/commit/972eafd983)] - **events**: 更新 MaxListenersExceededWarning 消息日志（sinkhaha）[#51921](https://github.com/nodejs/node/pull/51921)
* \[[`74753ed1fe`](https://github.com/nodejs/node/commit/74753ed1fe)] - **events**: 为 `Event.stopImmediatePropagation` 添加停止传播标志（Mickael Meausoone）[#39463](https://github.com/nodejs/node/pull/39463)
* \[[`75dd009649`](https://github.com/nodejs/node/commit/75dd009649)] - **events**: 用 CustomEvent 替换 NodeCustomEvent（Feng Yu）[#43876](https://github.com/nodejs/node/pull/43876)
* \[[`7d38c2e012`](https://github.com/nodejs/node/commit/7d38c2e012)] - **fs**: 保持 fs.promises.readFile 读取直到到达 EOF（Zhenwei Jin）[#52178](https://github.com/nodejs/node/pull/52178)
* \[[`8cb13120d3`](https://github.com/nodejs/node/commit/8cb13120d3)] - **(SEMVER-MINOR)** **inspector**: 引入 `--inspect-wait` 标志（Kohei Ueno）[#52734](https://github.com/nodejs/node/pull/52734)
* \[[`d5ab1de1fd`](https://github.com/nodejs/node/commit/d5ab1de1fd)] - **meta**: 将 `@anonrig` 调整为 TSC 正式成员（Yagiz Nizipli）[#52932](https://github.com/nodejs/node/pull/52932)
* \[[`f82d086e90`](https://github.com/nodejs/node/commit/f82d086e90)] - **path**: 修复 Windows 上的 toNamespacedPath（Hüseyin Açacak）[#52915](https://github.com/nodejs/node/pull/52915)
* \[[`121ea13b50`](https://github.com/nodejs/node/commit/121ea13b50)] - **process**: 改进 event-loop（Aras Abbasi）[#52108](https://github.com/nodejs/node/pull/52108)
* \[[`eceac784aa`](https://github.com/nodejs/node/commit/eceac784aa)] - **repl**: 修复在没有 inspector 时破坏性的自动补全（Nitzan Uziely）[#40661](https://github.com/nodejs/node/pull/40661)
* \[[`89a910be82`](https://github.com/nodejs/node/commit/89a910be82)] - **src**: 修复 `inspector.waitForDebugger` 中 Worker 的终止问题（Daeyeon Jeong）[#52527](https://github.com/nodejs/node/pull/52527)
* \[[`033f985e8a`](https://github.com/nodejs/node/commit/033f985e8a)] - **src**: 使用 `S_ISDIR` 检查文件是否为目录（theanarkh）[#52164](https://github.com/nodejs/node/pull/52164)
* \[[`95128399f8`](https://github.com/nodejs/node/commit/95128399f8)] - **src**: 允许阻止调试信号处理器启动（Shelley Vohr）[#46681](https://github.com/nodejs/node/pull/46681)
* \[[`b162aeae9e`](https://github.com/nodejs/node/commit/b162aeae9e)] - **src**: 修复拼写错误 Unabled -> Unable（Simon Siefke）[#52820](https://github.com/nodejs/node/pull/52820)
* \[[`2dcbf1894a`](https://github.com/nodejs/node/commit/2dcbf1894a)] - **src**: 避免未使用变量 'error' 警告（Michaël Zasso）[#52886](https://github.com/nodejs/node/pull/52886)
* \[[`978ee0a635`](https://github.com/nodejs/node/commit/978ee0a635)] - **src**: 仅在主线程中应用修复（Paolo Insogna）[#52702](https://github.com/nodejs/node/pull/52702)
* \[[`8fc52b38c6`](https://github.com/nodejs/node/commit/8fc52b38c6)] - **src**: 修复测试中的局部边界情况（Paolo Insogna）[#52702](https://github.com/nodejs/node/pull/52702)
* \[[`d02907ecc4`](https://github.com/nodejs/node/commit/d02907ecc4)] - **src**: 移除 node.cc 中 posix 保护下放置错误的 windows 代码（Ali Hassan）[#52545](https://github.com/nodejs/node/pull/52545)
* \[[`af29120fa7`](https://github.com/nodejs/node/commit/af29120fa7)] - **stream**: 在非 `objectMode` 时使用 `ByteLengthQueuingStrategy`（Jason）[#48847](https://github.com/nodejs/node/pull/48847)
* \[[`a5f3dd137c`](https://github.com/nodejs/node/commit/a5f3dd137c)] - **string_decoder**: 在写入过长缓冲区时抛出错误（zhenweijin）[#52215](https://github.com/nodejs/node/pull/52215)
* \[[`65fa95d57d`](https://github.com/nodejs/node/commit/65fa95d57d)] - **test**: 添加 `Debugger.setInstrumentationBreakpoint` 已知问题（Konstantin Ulitin）[#31137](https://github.com/nodejs/node/pull/31137)
* \[[`0513e07805`](https://github.com/nodejs/node/commit/0513e07805)] - **test**: 使用 `for-of` 代替 `forEach`（Gibby Free）[#49790](https://github.com/nodejs/node/pull/49790)
* \[[`1d01325928`](https://github.com/nodejs/node/commit/1d01325928)] - **test**: 验证请求负载是否一致上传（Austin Wright）[#34066](https://github.com/nodejs/node/pull/34066)
* \[[`7dda156872`](https://github.com/nodejs/node/commit/7dda156872)] - **test**: 为原生/js 字符串转换添加模糊测试器（Adam Korczynski）[#51120](https://github.com/nodejs/node/pull/51120)
* \[[`5fb829b340`](https://github.com/nodejs/node/commit/5fb829b340)] - **test**: 为 `ClientHelloParser` 添加模糊测试器（AdamKorcz）[#51088](https://github.com/nodejs/node/pull/51088)
* \[[`cc74bf789f`](https://github.com/nodejs/node/commit/cc74bf789f)] - **test**: 通过初始化进程修复损坏的 env 模糊测试器（AdamKorcz）[#51080](https://github.com/nodejs/node/pull/51080)
* \[[`800b6f65cf`](https://github.com/nodejs/node/commit/800b6f65cf)] - **test**: 在 `test-stream-pipe-unpipe-stream` 中替换 `forEach()`（Dario）[#50786](https://github.com/nodejs/node/pull/50786)
* \[[`d08c9a6a31`](https://github.com/nodejs/node/commit/d08c9a6a31)] - **test**: 测试变换流上的 pipeline `end`（Alois Klink）[#48970](https://github.com/nodejs/node/pull/48970)
* \[[`0be8123ede`](https://github.com/nodejs/node/commit/0be8123ede)] - **test**: 提高 lib/readline.js 的覆盖率（Rongjian Zhang）[#38646](https://github.com/nodejs/node/pull/38646)
* \[[`410224415c`](https://github.com/nodejs/node/commit/410224415c)] - **test**: 在测试文件中将 for each 更新为 for of（lyannel）[#50308](https://github.com/nodejs/node/pull/50308)
* \[[`556e9a2127`](https://github.com/nodejs/node/commit/556e9a2127)] - **test**: 将 `test-http-server-request-timeouts-mixed` 移至 sequential（Madhuri）[#45722](https://github.com/nodejs/node/pull/45722)
* \[[`0638274c07`](https://github.com/nodejs/node/commit/0638274c07)] - **test**: 修复 DNS cancel 测试（Szymon Marczak）[#44432](https://github.com/nodejs/node/pull/44432)
* \[[`311bdc62bd`](https://github.com/nodejs/node/commit/311bdc62bd)] - **test**: 为 `executionAsyncResource` 添加 http agent（psj-tar-gz）[#34966](https://github.com/nodejs/node/pull/34966)
* \[[`6001b164ab`](https://github.com/nodejs/node/commit/6001b164ab)] - **test**: 减少 test-worker-stdio 的内存使用（Adam Majer）[#37769](https://github.com/nodejs/node/pull/37769)
* \[[`986bfa26e9`](https://github.com/nodejs/node/commit/986bfa26e9)] - **test**: 添加 common.expectRequiredModule()（Joyee Cheung）[#52868](https://github.com/nodejs/node/pull/52868)
* \[[`2246d4fd1e`](https://github.com/nodejs/node/commit/2246d4fd1e)] - **test**: 为动态 openssl 进行 crypto-rsa-dsa 测试（Michael Dawson）[#52781](https://github.com/nodejs/node/pull/52781)
* \[[`1dce5dea0b`](https://github.com/nodejs/node/commit/1dce5dea0b)] - **test**: 在简陋终端上跳过部分 console 测试（Adam Majer）[#37770](https://github.com/nodejs/node/pull/37770)
* \[[`0addeb240c`](https://github.com/nodejs/node/commit/0addeb240c)] - **test**: 跳过 v8-updates/test-linux-perf-logger（Michaël Zasso）[#52821](https://github.com/nodejs/node/pull/52821)
* \[[`56e19e38f3`](https://github.com/nodejs/node/commit/56e19e38f3)] - **test**: 删除 test-crypto-timing-safe-equal-benchmarks（Rafael Gonzaga）[#52751](https://github.com/nodejs/node/pull/52751)
* \[[`0c5e58958c`](https://github.com/nodejs/node/commit/0c5e58958c)] - **test, crypto**: 在断言中使用正确的对象（响马）[#51820](https://github.com/nodejs/node/pull/51820)
* \[[`d54aa47ec1`](https://github.com/nodejs/node/commit/d54aa47ec1)] - **(SEMVER-MINOR)** **test_runner**: 支持测试计划（Colin Ihrig）[#52860](https://github.com/nodejs/node/pull/52860)
* \[[`0289a023a5`](https://github.com/nodejs/node/commit/0289a023a5)] - **test_runner**: 修复 watch 模式竞态条件（Moshe Atlow）[#52954](https://github.com/nodejs/node/pull/52954)
* \[[`cf817e192e`](https://github.com/nodejs/node/commit/cf817e192e)] - **test_runner**: 保留重复执行时的 hook promise（Moshe Atlow）[#52791](https://github.com/nodejs/node/pull/52791)
* \[[`de541235fe`](https://github.com/nodejs/node/commit/de541235fe)] - **tools**: 修复 v8-update 工作流（Michaël Zasso）[#52957](https://github.com/nodejs/node/pull/52957)
* \[[`f6290bc327`](https://github.com/nodejs/node/commit/f6290bc327)] - **tools**: 为 nci-ci 添加 --certify-safe（Matteo Collina）[#52940](https://github.com/nodejs/node/pull/52940)
* \[[`0830b3115d`](https://github.com/nodejs/node/commit/0830b3115d)] - **tools**: 修复文档更新操作（Marco Ippolito）[#52890](https://github.com/nodejs/node/pull/52890)
* \[[`9d485b40bb`](https://github.com/nodejs/node/commit/9d485b40bb)] - **(SEMVER-MINOR)** **tools**: 修复 tools/test.py 中的 get\_asan\_state()（Joyee Cheung）[#52766](https://github.com/nodejs/node/pull/52766)
* \[[`e98c305f52`](https://github.com/nodejs/node/commit/e98c305f52)] - **(SEMVER-MINOR)** **tools**: 支持 max\_virtual\_memory 测试配置（Joyee Cheung）[#52766](https://github.com/nodejs/node/pull/52766)
* \[[`dce0300896`](https://github.com/nodejs/node/commit/dce0300896)] - **(SEMVER-MINOR)** **tools**: 在测试状态文件中支持 !=（Joyee Cheung）[#52766](https://github.com/nodejs/node/pull/52766)
* \[[`57006001ec`](https://github.com/nodejs/node/commit/57006001ec)] - **tools**: 为 ESLint v9 准备自定义规则（Michaël Zasso）[#52889](https://github.com/nodejs/node/pull/52889)
* \[[`403a4a7557`](https://github.com/nodejs/node/commit/403a4a7557)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.17.2（Node.js GitHub Bot）[#52836](https://github.com/nodejs/node/pull/52836)
* \[[`01eff5860e`](https://github.com/nodejs/node/commit/01eff5860e)] - **tools**: 更新 `gr2m/create-or-update-pull-request-action`（Antoine du Hamel）[#52843](https://github.com/nodejs/node/pull/52843)
* \[[`514f01ed59`](https://github.com/nodejs/node/commit/514f01ed59)] - **tools**: 使用 sccache GitHub action（Michaël Zasso）[#52839](https://github.com/nodejs/node/pull/52839)
* \[[`8f8fb91927`](https://github.com/nodejs/node/commit/8f8fb91927)] - **tools**: 为 V8 更新工作流指定 commit-message（Antoine du Hamel）[#52844](https://github.com/nodejs/node/pull/52844)
* \[[`b83fbf8709`](https://github.com/nodejs/node/commit/b83fbf8709)] - **tools**: 修复 V8 更新工作流（Antoine du Hamel）[#52822](https://github.com/nodejs/node/pull/52822)
* \[[`be9d6f2176`](https://github.com/nodejs/node/commit/be9d6f2176)] - **url,tools,benchmark**: 替换已弃用的 `substr()`（Jungku Lee）[#51546](https://github.com/nodejs/node/pull/51546)
* \[[`7603a51d45`](https://github.com/nodejs/node/commit/7603a51d45)] - **util**: 修复带 `Symbol.toPrimitive` 的 `%s` 格式行为（Chenyu Yang）[#50992](https://github.com/nodejs/node/pull/50992)
* \[[`d7eba50cf3`](https://github.com/nodejs/node/commit/d7eba50cf3)] - **util**: 改进 `isInsideNodeModules`（uzlopak）[#52147](https://github.com/nodejs/node/pull/52147)
* \[[`4ae4f7e517`](https://github.com/nodejs/node/commit/4ae4f7e517)] - **watch**: 允许监听分组变更（Matthieu Sieben）[#52722](https://github.com/nodejs/node/pull/52722)
* \[[`1ff8f318c0`](https://github.com/nodejs/node/commit/1ff8f318c0)] - **watch**: 在 watch 模式中启用 passthrough ipc（Zack）[#50890](https://github.com/nodejs/node/pull/50890)
* \[[`739adf90b1`](https://github.com/nodejs/node/commit/739adf90b1)] - **watch**: 修复参数解析（Moshe Atlow）[#52760](https://github.com/nodejs/node/pull/52760)
* \[[`5161d95c30`](https://github.com/nodejs/node/commit/5161d95c30)] - **(SEMVER-MINOR)** **zlib**: 暴露 zlib.crc32()（Joyee Cheung）[#52692](https://github.com/nodejs/node/pull/52692)

<a id="20.14.0"></a>

## 2024-05-28，版本 20.14.0 'Iron'（LTS），@marco-ippolito

### 重要变更

* \[[`28d2baa17c`](https://github.com/nodejs/node/commit/28d2baa17c)] - **src,permission**: 在异步 API 上抛出异步错误 (Rafael Gonzaga) [#52730](https://github.com/nodejs/node/pull/52730)
* \[[`77e2bf029a`](https://github.com/nodejs/node/commit/77e2bf029a)] - **(SEMVER-MINOR)** **test\_runner**: 支持强制退出 (Colin Ihrig) [#52038](https://github.com/nodejs/node/pull/52038)

### 提交

* \[[`e3ad05d8b0`](https://github.com/nodejs/node/commit/e3ad05d8b0)] - **deps**: V8: cherry-pick 500de8bd371b (Richard Lau) [#52676](https://github.com/nodejs/node/pull/52676)
* \[[`053282e661`](https://github.com/nodejs/node/commit/053282e661)] - **deps**: V8: 回移植 c4be0a97f981 (Richard Lau) [#52183](https://github.com/nodejs/node/pull/52183)
* \[[`200dadb879`](https://github.com/nodejs/node/commit/200dadb879)] - **deps**: V8: cherry-pick f8d5e576b814 (Richard Lau) [#52183](https://github.com/nodejs/node/pull/52183)
* \[[`f5cd125e02`](https://github.com/nodejs/node/commit/f5cd125e02)] - **deps**: 将 googletest 更新到 fa6de7f (Node.js GitHub Bot) [#52949](https://github.com/nodejs/node/pull/52949)
* \[[`bbbfd7f4e1`](https://github.com/nodejs/node/commit/bbbfd7f4e1)] - **deps**: 将 corepack 更新到 0.28.1 (Node.js GitHub Bot) [#52946](https://github.com/nodejs/node/pull/52946)
* \[[`7ba30a57a6`](https://github.com/nodejs/node/commit/7ba30a57a6)] - **deps**: 将 simdutf 更新到 5.2.8 (Node.js GitHub Bot) [#52727](https://github.com/nodejs/node/pull/52727)
* \[[`b21a480a28`](https://github.com/nodejs/node/commit/b21a480a28)] - **deps**: 将 simdutf 更新到 5.2.6 (Node.js GitHub Bot) [#52727](https://github.com/nodejs/node/pull/52727)
* \[[`6cfad60d97`](https://github.com/nodejs/node/commit/6cfad60d97)] - **deps**: 将 googletest 更新到 2d16ed0 (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`34708d1429`](https://github.com/nodejs/node/commit/34708d1429)] - **deps**: 将 googletest 更新到 d83fee1 (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`c1d3e558e8`](https://github.com/nodejs/node/commit/c1d3e558e8)] - **deps**: 将 googletest 更新到 5a37b51 (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`69959d0fca`](https://github.com/nodejs/node/commit/69959d0fca)] - **deps**: 将 googletest 更新到 5197b1a (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`c8305f6057`](https://github.com/nodejs/node/commit/c8305f6057)] - **deps**: 将 googletest 更新到 eff443c (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`760b788704`](https://github.com/nodejs/node/commit/760b788704)] - **deps**: 将 googletest 更新到 c231e6f (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`301541cc8f`](https://github.com/nodejs/node/commit/301541cc8f)] - **deps**: 将 googletest 更新到 e4fdb87 (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`981d57e401`](https://github.com/nodejs/node/commit/981d57e401)] - **deps**: 将 googletest 更新到 5df0241 (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`a1817f534d`](https://github.com/nodejs/node/commit/a1817f534d)] - **deps**: 将 googletest 更新到 b75ecf1 (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`42070ca189`](https://github.com/nodejs/node/commit/42070ca189)] - **deps**: 将 googletest 更新到 4565741 (Node.js GitHub Bot) [#51657](https://github.com/nodejs/node/pull/51657)
* \[[`edc3e5d056`](https://github.com/nodejs/node/commit/edc3e5d056)] - **deps**: 将 uvwasi 更新到 0.0.21 (Node.js GitHub Bot) [#52863](https://github.com/nodejs/node/pull/52863)
* \[[`26b1231ffb`](https://github.com/nodejs/node/commit/26b1231ffb)] - **deps**: 升级 npm 到 10.7.0 (npm 团队) [#52767](https://github.com/nodejs/node/pull/52767)
* \[[`e6d9fbece2`](https://github.com/nodejs/node/commit/e6d9fbece2)] - **doc**: 更新 process.versions 属性 (ishabi) [#52736](https://github.com/nodejs/node/pull/52736)
* \[[`8c1f837c0a`](https://github.com/nodejs/node/commit/8c1f837c0a)] - **doc**: 删除 mac 上使用 mold 以加快构建的做法 (Cong Zhang) [#52252](https://github.com/nodejs/node/pull/52252)
* \[[`d9c5114694`](https://github.com/nodejs/node/commit/d9c5114694)] - **doc**: 修正语法错误 (codershiba) [#52808](https://github.com/nodejs/node/pull/52808)
* \[[`b350f435b7`](https://github.com/nodejs/node/commit/b350f435b7)] - **meta**: 为 legendecas 添加 mailmap 条目 (Chengzhong Wu) [#52795](https://github.com/nodejs/node/pull/52795)
* \[[`61f9f12eff`](https://github.com/nodejs/node/commit/61f9f12eff)] - **meta**: 将 actions/checkout 从 4.1.1 升级到 4.1.4 (dependabot\[bot]) [#52787](https://github.com/nodejs/node/pull/52787)
* \[[`ac563667d6`](https://github.com/nodejs/node/commit/ac563667d6)] - **meta**: 将 github/codeql-action 从 3.24.9 升级到 3.25.3 (dependabot\[bot]) [#52786](https://github.com/nodejs/node/pull/52786)
* \[[`70611d7924`](https://github.com/nodejs/node/commit/70611d7924)] - **meta**: 将 actions/upload-artifact 从 4.3.1 升级到 4.3.3 (dependabot\[bot]) [#52785](https://github.com/nodejs/node/pull/52785)
* \[[`30482ea273`](https://github.com/nodejs/node/commit/30482ea273)] - **meta**: 将 actions/download-artifact 从 4.1.4 升级到 4.1.7 (dependabot\[bot]) [#52784](https://github.com/nodejs/node/pull/52784)
* \[[`d1607cdebb`](https://github.com/nodejs/node/commit/d1607cdebb)] - **meta**: 将 codecov/codecov-action 从 4.1.1 升级到 4.3.1 (dependabot\[bot]) [#52783](https://github.com/nodejs/node/pull/52783)
* \[[`21f1b6bfc3`](https://github.com/nodejs/node/commit/21f1b6bfc3)] - **meta**: 将 step-security/harden-runner 从 2.7.0 升级到 2.7.1 (dependabot\[bot]) [#52782](https://github.com/nodejs/node/pull/52782)
* \[[`0c6019a222`](https://github.com/nodejs/node/commit/0c6019a222)] - **meta**: 规范化正则表达式 (Aviv Keller) [#52693](https://github.com/nodejs/node/pull/52693)
* \[[`28d2baa17c`](https://github.com/nodejs/node/commit/28d2baa17c)] - **src,permission**: 在异步 API 上抛出异步错误 (Rafael Gonzaga) [#52730](https://github.com/nodejs/node/pull/52730)
* \[[`cffd2cc0c9`](https://github.com/nodejs/node/commit/cffd2cc0c9)] - _**Revert**_ "**stream**: revert fix cloned webstreams not being unref'd" (Marco Ippolito) [#53144](https://github.com/nodejs/node/pull/53144)
* \[[`3dd96f1fab`](https://github.com/nodejs/node/commit/3dd96f1fab)] - **stream**: 使用 "transformer.cancel" 实现 TransformStream 清理 (Debadree Chatterjee) [#50126](https://github.com/nodejs/node/pull/50126)
* \[[`8e7e778e01`](https://github.com/nodejs/node/commit/8e7e778e01)] - **test**: 跳过 v8-updates/test-linux-perf (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`f8e18869e9`](https://github.com/nodejs/node/commit/f8e18869e9)] - **test**: 将 always-opt 标志替换为 alway-turbofan (Michaël Zasso) [#50115](https://github.com/nodejs/node/pull/50115)
* \[[`a501860d63`](https://github.com/nodejs/node/commit/a501860d63)] - **test\_runner**: 不要为每个测试等待同一个 promise (Colin Ihrig) [#52185](https://github.com/nodejs/node/pull/52185)
* \[[`e2ae4367f4`](https://github.com/nodejs/node/commit/e2ae4367f4)] - **test\_runner**: 在微任务中运行顶层测试 (Colin Ihrig) [#52092](https://github.com/nodejs/node/pull/52092)
* \[[`77e2bf029a`](https://github.com/nodejs/node/commit/77e2bf029a)] - **(SEMVER-MINOR)** **test\_runner**: 支持强制退出 (Colin Ihrig) [#52038](https://github.com/nodejs/node/pull/52038)
* \[[`b7bc63565e`](https://github.com/nodejs/node/commit/b7bc63565e)] - **test\_runner**: 在运行测试套件时忽略 todo 标志 (Colin Ihrig) [#52117](https://github.com/nodejs/node/pull/52117)
* \[[`be587e3ae3`](https://github.com/nodejs/node/commit/be587e3ae3)] - **test\_runner**: 为测试位置使用路径 (Colin Ihrig) [#52010](https://github.com/nodejs/node/pull/52010)
* \[[`743281ab25`](https://github.com/nodejs/node/commit/743281ab25)] - **test\_runner**: 支持源映射后的测试位置 (Colin Ihrig) [#52010](https://github.com/nodejs/node/pull/52010)
* \[[`4051316d95`](https://github.com/nodejs/node/commit/4051316d95)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.17.0 (Node.js GitHub Bot) [#52729](https://github.com/nodejs/node/pull/52729)

<a id="20.13.1"></a>

## 2024-05-09，版本 20.13.1 'Iron'（LTS），@marco-ippolito

### 回退 "tools: install npm PowerShell scripts on Windows"

由于 Windows 上 npm 安装出现回归，此提交回退了在 Windows 上安装 npm PowerShell 脚本的更改。

### 提交

* \[[`b7d80802cc`](https://github.com/nodejs/node/commit/b7d80802cc)] - _**Revert**_ "**tools**: install npm PowerShell scripts on Windows" (marco-ippolito) [#52897](https://github.com/nodejs/node/pull/52897)

<a id="20.13.0"></a>

## 2024-05-07，版本 20.13.0 'Iron'（LTS），@marco-ippolito

### buffer：提升 `base64` 和 `base64url` 性能

`base64` 和 `base64url` 编码与解码函数的性能已显著提升。

由 Yagiz Nizipli 贡献，见 [#52428](https://github.com/nodejs/node/pull/52428)

### crypto：弃用隐式缩短的 GCM 标签

此版本引入了仅文档层面的弃用：当用户未指定 `authTagLength` 选项时，不应使用短于密码块大小的 GCM 认证标签。

由 Tobias Nießen 贡献，见 [#52345](https://github.com/nodejs/node/pull/52345)

### events,doc：将 CustomEvent 标记为稳定

从此版本起，`CustomEvent` 已被标记为稳定。

由 Daeyeon Jeong 贡献，见 [#52618](https://github.com/nodejs/node/pull/52618)

### fs：为 fs/promises 添加堆栈跟踪

fs 中的同步函数会抛出带有堆栈跟踪的错误，这有助于调试。但 fs/promises 中的函数抛出的错误没有堆栈跟踪。此提交通过调用 `Error.captureStacktrace` 并重新抛出错误来添加堆栈跟踪。

由 翠 / green 贡献，见 [#49849](https://github.com/nodejs/node/pull/49849)

### report：添加 `--report-exclude-network` 选项

新增选项 `--report-exclude-network`，也可通过 `report.excludeNetwork` 使用，它允许用户在诊断报告中排除网络接口。在某些系统上，这可能导致生成报告需要几分钟，因此可以使用此选项来优化。

由 Ethan Arrowood 贡献，见 [#51645](https://github.com/nodejs/node/pull/51645)

### src：将 uv\_get\_available\_memory 添加到 report 和 process

从此版本起，可以通过调用 `process.getAvailableMemory()` 获取系统中的可用内存。

由 theanarkh 贡献，见 [#52023](https://github.com/nodejs/node/pull/52023)

### stream：支持类型数组

此提交为 streams 添加了对类型数组的支持。

由 IlyasShabi 贡献，见 [#51866](https://github.com/nodejs/node/pull/51866)

### util：在 util.styleText 中支持格式数组

现在可以向 `util.styleText` 传入一个格式字符串数组，以将多个格式应用于同一文本。

```js
console.log(util.styleText(['underline', 'italic'], '我的斜体下划线消息'));
```

由 Marco Ippolito 贡献，见 [#52040](https://github.com/nodejs/node/pull/52040)

### v8：实现用于内存泄漏回归测试的 v8.queryObjects()

这类似于 Chromium DevTools 控制台提供的 queryObjects() 控制台 API。它可用于在一次完整垃圾回收后，在堆中搜索其原型链上包含匹配构造函数的对象，这对于内存泄漏回归测试很有用。
为避免令人意外的结果，用户应避免在其实现不受自己控制的构造函数上，或在可被应用程序中其他方调用的构造函数上使用此 API。

为避免意外泄漏，此 API 不会返回找到对象的原始引用。默认情况下，它返回找到的对象数量。如果 options.format 为 'summary'，则返回一个数组，其中包含每个对象的简短字符串表示。此 API 提供的可见性类似于堆快照提供的可见性，同时用户可以节省序列化和解析的成本，并在搜索期间直接过滤目标对象。

我们一直在内部测试套件中使用此 API，它在 CI 中比其他任何泄漏回归测试策略都更稳定。现在有了公开实现，我们就可以改用公开 API 了。

```js
const { queryObjects } = require('node:v8');
class A { foo = 'bar'; }
console.log(queryObjects(A)); // 0
let a = new A();
console.log(queryObjects(A)); // 1
// [ "A { foo: 'bar' }" ]
console.log(queryObjects(A, { format: 'summary' }));

// 释放对象。
a = null;
// 再次搜索。queryObjects() 会包含一次完整垃圾回收
// 因此 a 应该会消失。
console.log(queryObjects(A)); // 0

class B extends A { bar = 'qux'; }
// 子类 B 的原型在其原型链上包含 A 的原型
// 因此这个原型对象也会显示出来。
console.log(queryObjects(A, { format: 'summary' })); // [ A {}' ]
```

由 Joyee Cheung 贡献，见 [#51927](https://github.com/nodejs/node/pull/51927)

### watch：标记为稳定

从此版本起，Watch 模式被视为稳定。
在 watch 模式下，所监视文件的更改会导致 Node.js 进程重启。

由 Moshe Atlow 贡献，见 [#52074](https://github.com/nodejs/node/pull/52074)

### 其他重要变更

* \[[`f8ad30048d`](https://github.com/nodejs/node/commit/f8ad30048d)] - **benchmark**: 添加 AbortSignal.abort 基准测试 (Raz Luvaton) [#52408](https://github.com/nodejs/node/pull/52408)
* \[[`3b41da9a56`](https://github.com/nodejs/node/commit/3b41da9a56)] - **(SEMVER-MINOR)** **deps**: 将 simdutf 更新到 5.0.0 (Daniel Lemire) [#52138](https://github.com/nodejs/node/pull/52138)
* \[[`0a08c4a7b3`](https://github.com/nodejs/node/commit/0a08c4a7b3)] - **(SEMVER-MINOR)** **deps**: 将 undici 更新到 6.3.0 (Node.js GitHub Bot) [#51462](https://github.com/nodejs/node/pull/51462)
* \[[`f1b7bda4f5`](https://github.com/nodejs/node/commit/f1b7bda4f5)] - **(SEMVER-MINOR)** **deps**: 将 undici 更新到 6.2.1 (Node.js GitHub Bot) [#51278](https://github.com/nodejs/node/pull/51278)
* \[[`4acca8ed84`](https://github.com/nodejs/node/commit/4acca8ed84)] - **(SEMVER-MINOR)** **dns**: 添加 order 选项并支持 ipv6first (Paolo Insogna) [#52492](https://github.com/nodejs/node/pull/52492)
* \[[`cc67720ff9`](https://github.com/nodejs/node/commit/cc67720ff9)] - **doc**: 更新发布用 gpg keyserver (marco-ippolito) [#52257](https://github.com/nodejs/node/pull/52257)
* \[[`c2def7df96`](https://github.com/nodejs/node/commit/c2def7df96)] - **doc**: 为 marco-ippolito 添加发布密钥 (marco-ippolito) [#52257](https://github.com/nodejs/node/pull/52257)
* \[[`807c89cb26`](https://github.com/nodejs/node/commit/807c89cb26)] - **doc**: 添加 UlisesGascon 作为协作者 (Ulises Gascón) [#51991](https://github.com/nodejs/node/pull/51991)
* \[[`5e78a20ef9`](https://github.com/nodejs/node/commit/5e78a20ef9)] - **(SEMVER-MINOR)** **doc**: 弃用 fs.Stats 公共构造函数 (Marco Ippolito) [#51879](https://github.com/nodejs/node/pull/51879)
* \[[`722fe64ff7`](https://github.com/nodejs/node/commit/722fe64ff7)] - **(SEMVER-MINOR)** **lib, url**: 为路径解析添加 `windows` 选项 (Aviv Keller) [#52509](https://github.com/nodejs/node/pull/52509)
* \[[`d116fa1568`](https://github.com/nodejs/node/commit/d116fa1568)] - **(SEMVER-MINOR)** **net**: 为 autoSelectFamilyAttemptTimeout 添加 CLI 选项 (Paolo Insogna) [#52474](https://github.com/nodejs/node/pull/52474)
* \[[`6af7b78b0d`](https://github.com/nodejs/node/commit/6af7b78b0d)] - **(SEMVER-MINOR)** **src**: 为 snapshot FromBlob 添加 `string_view` 重载 (Anna Henningsen) [#52595](https://github.com/nodejs/node/pull/52595)
* \[[`b3a11b574b`](https://github.com/nodejs/node/commit/b3a11b574b)] - **(SEMVER-MINOR)** **src**: 为 Environment 添加 preload 函数 (Cheng Zhao) [#51539](https://github.com/nodejs/node/pull/51539)
* \[[`41646d9c9e`](https://github.com/nodejs/node/commit/41646d9c9e)] - **(SEMVER-MINOR)** **test\_runner**: 添加 suite() (Colin Ihrig) [#52127](https://github.com/nodejs/node/pull/52127)
* \[[`fc9ba17f6c`](https://github.com/nodejs/node/commit/fc9ba17f6c)] - **(SEMVER-MINOR)** **test\_runner**: 添加 `test:complete` 事件以反映执行顺序 (Moshe Atlow) [#51909](https://github.com/nodejs/node/pull/51909)

### 提交

* \[[`6fdd748b21`](https://github.com/nodejs/node/commit/6fdd748b21)] - **benchmark**: 减小 blob 的缓冲区大小 (Debadree Chatterjee) [#52548](https://github.com/nodejs/node/pull/52548)
* \[[`2274d0c868`](https://github.com/nodejs/node/commit/2274d0c868)] - **benchmark**: 继承 stdio/stderr 而不是使用 pipe (Ali Hassan) [#52456](https://github.com/nodejs/node/pull/52456)
* \[[`0300598315`](https://github.com/nodejs/node/commit/0300598315)] - **benchmark**: 为 spawn stdio 配置添加 ipc 支持 (Ali Hassan) [#52456](https://github.com/nodejs/node/pull/52456)
* \[[`f8ad30048d`](https://github.com/nodejs/node/commit/f8ad30048d)] - **benchmark**: 添加 AbortSignal.abort 基准测试 (Raz Luvaton) [#52408](https://github.com/nodejs/node/pull/52408)
* \[[`7508d48736`](https://github.com/nodejs/node/commit/7508d48736)] - **benchmark**: 有条件地使用带 taskset 的 spawn 进行 CPU 绑核 (Ali Hassan) [#52253](https://github.com/nodejs/node/pull/52253)
* \[[`ea8e72e185`](https://github.com/nodejs/node/commit/ea8e72e185)] - **benchmark**: 添加 toNamespacedPath 基准测试 (Rafael Gonzaga) [#52236](https://github.com/nodejs/node/pull/52236)
* \[[`c00715cc1e`](https://github.com/nodejs/node/commit/c00715cc1e)] - **benchmark**: 添加 style-text 基准测试 (Rafael Gonzaga) [#52004](https://github.com/nodejs/node/pull/52004)
* \[[`1c1a6935ee`](https://github.com/nodejs/node/commit/1c1a6935ee)] - **buffer**: 为 isUtf8 添加缺失的 ARG_TYPE(ArrayBuffer) (Jungku Lee) [#52477](https://github.com/nodejs/node/pull/52477)
* \[[`1b2aff7dce`](https://github.com/nodejs/node/commit/1b2aff7dce)] - **buffer**: 提升 `base64` 和 `base64url` 性能 (Yagiz Nizipli) [#52428](https://github.com/nodejs/node/pull/52428)
* \[[`328bded5ab`](https://github.com/nodejs/node/commit/328bded5ab)] - **buffer**: 提升 `btoa` 性能 (Yagiz Nizipli) [#52427](https://github.com/nodejs/node/pull/52427)
* \[[`e67bc34326`](https://github.com/nodejs/node/commit/e67bc34326)] - **buffer**: 在 `atob` 实现中使用 simdutf (Yagiz Nizipli) [#52381](https://github.com/nodejs/node/pull/52381)
* \[[`5abddb45d8`](https://github.com/nodejs/node/commit/5abddb45d8)] - **build**: 修复 node.gyp 中的拼写错误 (Michaël Zasso) [#52719](https://github.com/nodejs/node/pull/52719)
* \[[`7d1f304f5e`](https://github.com/nodejs/node/commit/7d1f304f5e)] - **build**: 修复 Windows 上共享模式的头文件安装 (Segev Finer) [#52442](https://github.com/nodejs/node/pull/52442)
* \[[`6826bbf267`](https://github.com/nodejs/node/commit/6826bbf267)] - **build**: 修复非 arm 机器上的 arm64 交叉编译 bug (Mahdi Sharifi) [#52559](https://github.com/nodejs/node/pull/52559)
* \[[`6e85bc431a`](https://github.com/nodejs/node/commit/6e85bc431a)] - **build**: 临时禁用 ubsan (Rafael Gonzaga) [#52560](https://github.com/nodejs/node/pull/52560)
* \[[`297368a1ed`](https://github.com/nodejs/node/commit/297368a1ed)] - **build**: 修复 arm64 交叉编译 (Michaël Zasso) [#51256](https://github.com/nodejs/node/pull/51256)
* \[[`93bddb598f`](https://github.com/nodejs/node/commit/93bddb598f)] - **build,tools**: 添加 test-ubsan CI (Rafael Gonzaga) [#46297](https://github.com/nodejs/node/pull/46297)
* \[[`20bb16582f`](https://github.com/nodejs/node/commit/20bb16582f)] - **build,tools,node-api**: 修复在 Windows Debug 下构建 node-api 测试 (Vladimir Morozov) [#52632](https://github.com/nodejs/node/pull/52632)
* \[[`9af15cfff1`](https://github.com/nodejs/node/commit/9af15cfff1)] - **child_process**: 使用内部的 addAbortListener (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`a4847c4619`](https://github.com/nodejs/node/commit/a4847c4619)] - **crypto**: 简化 Safe\*Print 中的断言 (David Benjamin) [#49709](https://github.com/nodejs/node/pull/49709)
* \[[`0ec4d9d734`](https://github.com/nodejs/node/commit/0ec4d9d734)] - **crypto**: 在 BoringSSL 中启用 NODE\_EXTRA\_CA\_CERTS (Shelley Vohr) [#52217](https://github.com/nodejs/node/pull/52217)
* \[[`03e05b092c`](https://github.com/nodejs/node/commit/03e05b092c)] - **crypto**: 废弃隐式缩短的 GCM 标签 (Tobias Nießen) [#52345](https://github.com/nodejs/node/pull/52345)
* \[[`0f784c96ba`](https://github.com/nodejs/node/commit/0f784c96ba)] - **crypto**: 让 Uint8Array 的 timingSafeEqual 更快 (Tobias Nießen) [#52341](https://github.com/nodejs/node/pull/52341)
* \[[`739958e472`](https://github.com/nodejs/node/commit/739958e472)] - **crypto**: 在 Sign/Verify 原型中拒绝 Ed25519/Ed448 (Filip Skokan) [#52340](https://github.com/nodejs/node/pull/52340)
* \[[`197b61f210`](https://github.com/nodejs/node/commit/197b61f210)] - **crypto**: 在 subtle.sign 和 subtle.verify 中校验 RSA-PSS saltLength (Filip Skokan) [#52262](https://github.com/nodejs/node/pull/52262)
* \[[`a6eede33f3`](https://github.com/nodejs/node/commit/a6eede33f3)] - **crypto**: 修复 `crypto.hash` 中的 `input` 校验 (Antoine du Hamel) [#52070](https://github.com/nodejs/node/pull/52070)
* \[[`bfa4986e5d`](https://github.com/nodejs/node/commit/bfa4986e5d)] - **deps**: 将 corepack 更新到 0.28.0 (Node.js GitHub Bot) [#52616](https://github.com/nodejs/node/pull/52616)
* \[[`70546698d7`](https://github.com/nodejs/node/commit/70546698d7)] - **deps**: 将 ada 更新到 2.7.8 (Node.js GitHub Bot) [#52517](https://github.com/nodejs/node/pull/52517)
* \[[`a135027f84`](https://github.com/nodejs/node/commit/a135027f84)] - **deps**: 将 icu 更新到 75.1 (Node.js GitHub Bot) [#52573](https://github.com/nodejs/node/pull/52573)
* \[[`c96f1043d4`](https://github.com/nodejs/node/commit/c96f1043d4)] - **deps**: 将 undici 更新到 6.13.0 (Node.js GitHub Bot) [#52493](https://github.com/nodejs/node/pull/52493)
* \[[`9c330b610b`](https://github.com/nodejs/node/commit/9c330b610b)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-7d77fb7 (Node.js GitHub Bot) [#52516](https://github.com/nodejs/node/pull/52516)
* \[[`7e5bbeebab`](https://github.com/nodejs/node/commit/7e5bbeebab)] - **deps**: 将 nghttp2 更新到 1.61.0 (Node.js GitHub Bot) [#52395](https://github.com/nodejs/node/pull/52395)
* \[[`b42a4735d9`](https://github.com/nodejs/node/commit/b42a4735d9)] - **deps**: 将 minimatch 更新到 9.0.4 (Node.js GitHub Bot) [#52524](https://github.com/nodejs/node/pull/52524)
* \[[`d34fd21bc2`](https://github.com/nodejs/node/commit/d34fd21bc2)] - **deps**: 将 simdutf 更新到 5.2.4 (Node.js GitHub Bot) [#52473](https://github.com/nodejs/node/pull/52473)
* \[[`ecc180f830`](https://github.com/nodejs/node/commit/ecc180f830)] - **deps**: 将 npm 升级到 10.5.2 (npm team) [#52458](https://github.com/nodejs/node/pull/52458)
* \[[`606c183344`](https://github.com/nodejs/node/commit/606c183344)] - **deps**: 将 simdutf 更新到 5.2.3 (Yagiz Nizipli) [#52381](https://github.com/nodejs/node/pull/52381)
* \[[`0a103e99fe`](https://github.com/nodejs/node/commit/0a103e99fe)] - **deps**: 将 npm 升级到 10.5.1 (npm team) [#52351](https://github.com/nodejs/node/pull/52351)
* \[[`cce861e670`](https://github.com/nodejs/node/commit/cce861e670)] - **deps**: 将 c-ares 更新到 1.28.1 (Node.js GitHub Bot) [#52285](https://github.com/nodejs/node/pull/52285)
* \[[`5258b547ea`](https://github.com/nodejs/node/commit/5258b547ea)] - **deps**: 将 undici 更新到 6.11.1 (Node.js GitHub Bot) [#52328](https://github.com/nodejs/node/pull/52328)
* \[[`923a77c80a`](https://github.com/nodejs/node/commit/923a77c80a)] - **deps**: 将 undici 更新到 6.10.2 (Node.js GitHub Bot) [#52227](https://github.com/nodejs/node/pull/52227)
* \[[`bd3c6a231c`](https://github.com/nodejs/node/commit/bd3c6a231c)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-24c07df (Node.js GitHub Bot) [#52199](https://github.com/nodejs/node/pull/52199)
* \[[`3b41da9a56`](https://github.com/nodejs/node/commit/3b41da9a56)] - **(SEMVER-MINOR)** **deps**: 将 simdutf 更新到 5.0.0 (Daniel Lemire) [#52138](https://github.com/nodejs/node/pull/52138)
* \[[`d6f9ca385c`](https://github.com/nodejs/node/commit/d6f9ca385c)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-24342f6 (Node.js GitHub Bot) [#52123](https://github.com/nodejs/node/pull/52123)
* \[[`f5512897b0`](https://github.com/nodejs/node/commit/f5512897b0)] - **deps**: 将 corepack 更新到 0.26.0 (Node.js GitHub Bot) [#52027](https://github.com/nodejs/node/pull/52027)
* \[[`d891275178`](https://github.com/nodejs/node/commit/d891275178)] - **deps**: 将 ada 更新到 2.7.7 (Node.js GitHub Bot) [#52028](https://github.com/nodejs/node/pull/52028)
* \[[`18838f2db3`](https://github.com/nodejs/node/commit/18838f2db3)] - **deps**: 将 simdutf 更新到 4.0.9 (Node.js GitHub Bot) [#51655](https://github.com/nodejs/node/pull/51655)
* \[[`503c034abc`](https://github.com/nodejs/node/commit/503c034abc)] - **deps**: 将 undici 更新到 6.6.2 (Node.js GitHub Bot) [#51667](https://github.com/nodejs/node/pull/51667)
* \[[`256bcba52e`](https://github.com/nodejs/node/commit/256bcba52e)] - **deps**: 将 undici 更新到 6.6.0 (Node.js GitHub Bot) [#51630](https://github.com/nodejs/node/pull/51630)
* \[[`7a1e321d95`](https://github.com/nodejs/node/commit/7a1e321d95)] - **deps**: 将 undici 更新到 6.4.0 (Node.js GitHub Bot) [#51527](https://github.com/nodejs/node/pull/51527)
* \[[`dde9e08224`](https://github.com/nodejs/node/commit/dde9e08224)] - **deps**: 将 ngtcp2 更新到 1.1.0 (Node.js GitHub Bot) [#51319](https://github.com/nodejs/node/pull/51319)
* \[[`0a08c4a7b3`](https://github.com/nodejs/node/commit/0a08c4a7b3)] - **(SEMVER-MINOR)** **deps**: 将 undici 更新到 6.3.0 (Node.js GitHub Bot) [#51462](https://github.com/nodejs/node/pull/51462)
* \[[`f1b7bda4f5`](https://github.com/nodejs/node/commit/f1b7bda4f5)] - **(SEMVER-MINOR)** **deps**: 将 undici 更新到 6.2.1 (Node.js GitHub Bot) [#51278](https://github.com/nodejs/node/pull/51278)
* \[[`ecadd638cd`](https://github.com/nodejs/node/commit/ecadd638cd)] - **deps**: V8：移除对不存在标志的引用 (Richard Lau) [#52256](https://github.com/nodejs/node/pull/52256)
* \[[`27d364491f`](https://github.com/nodejs/node/commit/27d364491f)] - **dgram**: 使用内部的 addAbortListener (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`b94d11935a`](https://github.com/nodejs/node/commit/b94d11935a)] - **diagnostics_channel**: 提前退出 tracing channel 的 trace 方法 (Stephen Belanger) [#51915](https://github.com/nodejs/node/pull/51915)
* \[[`4acca8ed84`](https://github.com/nodejs/node/commit/4acca8ed84)] - **(SEMVER-MINOR)** **dns**: 添加 order 选项并支持 ipv6first (Paolo Insogna) [#52492](https://github.com/nodejs/node/pull/52492)
* \[[`bcc06ac5a9`](https://github.com/nodejs/node/commit/bcc06ac5a9)] - **doc**: 移除对 pm 的相对限制 (Rafael Gonzaga) [#52648](https://github.com/nodejs/node/pull/52648)
* \[[`4d5ef4f7af`](https://github.com/nodejs/node/commit/4d5ef4f7af)] - **doc**: 修复导致重复代码块的 info string (Mathieu Leenhardt) [#52660](https://github.com/nodejs/node/pull/52660)
* \[[`d5a316f5ea`](https://github.com/nodejs/node/commit/d5a316f5ea)] - **doc**: 运行 license-builder (github-actions\[bot]) [#52631](https://github.com/nodejs/node/pull/52631)
* \[[`d7434fe411`](https://github.com/nodejs/node/commit/d7434fe411)] - **doc**: 废弃 --experimental-policy (RafaelGSS) [#52602](https://github.com/nodejs/node/pull/52602)
* \[[`02a83d89f7`](https://github.com/nodejs/node/commit/02a83d89f7)] - **doc**: 添加 contributor spotlight program 的信息 (Michael Dawson) [#52598](https://github.com/nodejs/node/pull/52598)
* \[[`a905eaace1`](https://github.com/nodejs/node/commit/a905eaace1)] - **doc**: 更正 http 文档中不安全的 URL 示例 (Malte Legenhausen) [#52555](https://github.com/nodejs/node/pull/52555)
* \[[`69c21a6522`](https://github.com/nodejs/node/commit/69c21a6522)] - **doc**: 将 U+00A0 替换为 U+0020 (Luigi Pinca) [#52590](https://github.com/nodejs/node/pull/52590)
* \[[`5df34c7d0a`](https://github.com/nodejs/node/commit/5df34c7d0a)] - **doc**: 按字母顺序排序选项 (Luigi Pinca) [#52589](https://github.com/nodejs/node/pull/52589)
* \[[`b49464bc9d`](https://github.com/nodejs/node/commit/b49464bc9d)] - **doc**: 更正 stream.finished 的变更 (KaKa) [#52551](https://github.com/nodejs/node/pull/52551)
* \[[`4d051ba89b`](https://github.com/nodejs/node/commit/4d051ba89b)] - **doc**: 将 RedYetiDev 添加到 triage 团队 (Aviv Keller) [#52556](https://github.com/nodejs/node/pull/52556)
* \[[`4ed55bf16c`](https://github.com/nodejs/node/commit/4ed55bf16c)] - **doc**: 修复 markdown lint 更新中检测到的问题 (Rich Trott) [#52566](https://github.com/nodejs/node/pull/52566)
* \[[`a8bc40fd07`](https://github.com/nodejs/node/commit/a8bc40fd07)] - **doc**: 更新 test runner 的覆盖率限制 (Moshe Atlow) [#52515](https://github.com/nodejs/node/pull/52515)
* \[[`17d5ba9fed`](https://github.com/nodejs/node/commit/17d5ba9fed)] - **doc**: 将 lint-js-fix 添加到 BUILDING.md (jakecastelli) [#52290](https://github.com/nodejs/node/pull/52290)
* \[[`88adbd0991`](https://github.com/nodejs/node/commit/88adbd0991)] - **doc**: 从 BUILDING.md 中移除 Internet Explorer 提及 (Rich Trott) [#52455](https://github.com/nodejs/node/pull/52455)
* \[[`e8cb29d66d`](https://github.com/nodejs/node/commit/e8cb29d66d)] - **doc**: 适配即将更严格的 .md lint 检查 (Rich Trott) [#52454](https://github.com/nodejs/node/pull/52454)
* \[[`e2ea984c7b`](https://github.com/nodejs/node/commit/e2ea984c7b)] - **doc**: 将 Rafael 添加到 steward 列表 (Rafael Gonzaga) [#52452](https://github.com/nodejs/node/pull/52452)
* \[[`93d684097a`](https://github.com/nodejs/node/commit/93d684097a)] - **doc**: 更正 C++ 风格指南中的命名约定 (Mohammed Keyvanzadeh) [#52424](https://github.com/nodejs/node/pull/52424)
* \[[`b9bdb947ac`](https://github.com/nodejs/node/commit/b9bdb947ac)] - **doc**: 将 `process.execArg` 示例更新得更实用 (Jacob Smith) [#52412](https://github.com/nodejs/node/pull/52412)
* \[[`f3f67ff84a`](https://github.com/nodejs/node/commit/f3f67ff84a)] - **doc**: 指出 http(s).globalAgent 的默认值 (mathis-west-1) [#52392](https://github.com/nodejs/node/pull/52392)
* \[[`392a0d310e`](https://github.com/nodejs/node/commit/392a0d310e)] - **doc**: 更新 `build_with_cmake` 的位置 (Emmanuel Ferdman) [#52356](https://github.com/nodejs/node/pull/52356)
* \[[`3ad62f1cc7`](https://github.com/nodejs/node/commit/3ad62f1cc7)] - **doc**: 为 Electron 31 预留 125 (Shelley Vohr) [#52379](https://github.com/nodejs/node/pull/52379)
* \[[`bfd4c7844b`](https://github.com/nodejs/node/commit/bfd4c7844b)] - **doc**: 统一使用 "index" 的复数形式 (Rich Trott) [#52373](https://github.com/nodejs/node/pull/52373)
* \[[`6f31cc8361`](https://github.com/nodejs/node/commit/6f31cc8361)] - **doc**: 将 Rafael 添加到 sec release stewards (Rafael Gonzaga) [#52354](https://github.com/nodejs/node/pull/52354)
* \[[`c55a3be789`](https://github.com/nodejs/node/commit/c55a3be789)] - **doc**: 补充 events.on 缺失的选项文档 (Chemi Atlow) [#52080](https://github.com/nodejs/node/pull/52080)
* \[[`1a843f7c6d`](https://github.com/nodejs/node/commit/1a843f7c6d)] - **doc**: 添加缺失的空格 (Augustin Mauroy) [#52360](https://github.com/nodejs/node/pull/52360)
* \[[`8ee20d8693`](https://github.com/nodejs/node/commit/8ee20d8693)] - **doc**: 添加关于 vcpkg 导致 Windows 构建失败的提示 (Cong Zhang) [#52181](https://github.com/nodejs/node/pull/52181)
* \[[`a86705c113`](https://github.com/nodejs/node/commit/a86705c113)] - **doc**: 将 "below" 替换为 "following" (Rich Trott) [#52315](https://github.com/nodejs/node/pull/52315)
* \[[`f3e8d1159a`](https://github.com/nodejs/node/commit/f3e8d1159a)] - **doc**: 修复邮件模式，使其用 `<<` 包裹而不是单个 `<` (Raz Luvaton) [#52284](https://github.com/nodejs/node/pull/52284)
* \[[`cc67720ff9`](https://github.com/nodejs/node/commit/cc67720ff9)] - **doc**: 更新发布用 gpg keyserver (marco-ippolito) [#52257](https://github.com/nodejs/node/pull/52257)
* \[[`c2def7df96`](https://github.com/nodejs/node/commit/c2def7df96)] - **doc**: 为 marco-ippolito 添加发布密钥 (marco-ippolito) [#52257](https://github.com/nodejs/node/pull/52257)
* \[[`2509f3be18`](https://github.com/nodejs/node/commit/2509f3be18)] - **doc**: 修复 HTML 版本中箭头的垂直对齐 (Akash Yeole) [#52193](https://github.com/nodejs/node/pull/52193)
* \[[`2abaea3cdc`](https://github.com/nodejs/node/commit/2abaea3cdc)] - **doc**: 将 TSC 成员从正式成员移至 emeritus (Michael Dawson) [#52209](https://github.com/nodejs/node/pull/52209)
* \[[`65618a3d7b`](https://github.com/nodejs/node/commit/65618a3d7b)] - **doc**: 添加解释 todo 测试的章节 (Colin Ihrig) [#52204](https://github.com/nodejs/node/pull/52204)
* \[[`bf0ed95b04`](https://github.com/nodejs/node/commit/bf0ed95b04)] - **doc**: 编辑 `ChildProcess` 的 `'message'` 事件文档 (theanarkh) [#52154](https://github.com/nodejs/node/pull/52154)
* \[[`3d67b6b5e8`](https://github.com/nodejs/node/commit/3d67b6b5e8)] - **doc**: 在加速章节中添加 mold (Cong Zhang) [#52179](https://github.com/nodejs/node/pull/52179)
* \[[`8ba308a838`](https://github.com/nodejs/node/commit/8ba308a838)] - **doc**: 更正 http 事件顺序 (wh0) [#51464](https://github.com/nodejs/node/pull/51464)
* \[[`9771f41069`](https://github.com/nodejs/node/commit/9771f41069)] - **doc**: 将 gabrielschulhof 移至 TSC emeritus (Gabriel Schulhof) [#52192](https://github.com/nodejs/node/pull/52192)
* \[[`72bd2b0d62`](https://github.com/nodejs/node/commit/72bd2b0d62)] - **doc**: 修复 `--env-file` 中定义值所允许引号的文档 (Gabriel Bota) [#52157](https://github.com/nodejs/node/pull/52157)
* \[[`4f19203dfb`](https://github.com/nodejs/node/commit/4f19203dfb)] - **doc**: 澄清 NODE\_OPTIONS 中支持的内容 (Michael Dawson) [#52076](https://github.com/nodejs/node/pull/52076)
* \[[`5bce596838`](https://github.com/nodejs/node/commit/5bce596838)] - **doc**: 修复 maintaining-dependencies.md 中的拼写错误 (RoboSchmied) [#52160](https://github.com/nodejs/node/pull/52160)
* \[[`f5241e20cc`](https://github.com/nodejs/node/commit/f5241e20cc)] - **doc**: 添加 contains module syntax 规范 (Geoffrey Booth) [#52059](https://github.com/nodejs/node/pull/52059)
* \[[`bda3cdea86`](https://github.com/nodejs/node/commit/bda3cdea86)] - **doc**: 优化关于 Unix 抽象套接字的文档 (theanarkh) [#52043](https://github.com/nodejs/node/pull/52043)
* \[[`8d7d6eff81`](https://github.com/nodejs/node/commit/8d7d6eff81)] - **doc**: 更新 pnpm 链接 (Superchupu) [#52113](https://github.com/nodejs/node/pull/52113)
* \[[`af7c55f62d`](https://github.com/nodejs/node/commit/af7c55f62d)] - **doc**: 从 crypto 中移除歧视性语言 (Jamie King) [#52063](https://github.com/nodejs/node/pull/52063)
* \[[`f8362b0a5a`](https://github.com/nodejs/node/commit/f8362b0a5a)] - **doc**: 更新协作者邮箱 (Ruy Adorno) [#52088](https://github.com/nodejs/node/pull/52088)
* \[[`48cbd5f71e`](https://github.com/nodejs/node/commit/48cbd5f71e)] - **doc**: 说明移除 npm 不是目标 (Geoffrey Booth) [#51951](https://github.com/nodejs/node/pull/51951)
* \[[`0ef2708131`](https://github.com/nodejs/node/commit/0ef2708131)] - **doc**: 在 RafaelGSS steward 列表中提及 NodeSource (Rafael Gonzaga) [#52057](https://github.com/nodejs/node/pull/52057)
* \[[`a6473a89be`](https://github.com/nodejs/node/commit/a6473a89be)] - **doc**: 从 crypto.hash() 的 data 参数类型中移除 ArrayBuffer (fengmk2) [#52069](https://github.com/nodejs/node/pull/52069)
* \[[`ae7a11c787`](https://github.com/nodejs/node/commit/ae7a11c787)] - **doc**: 将一些常用标签前置 (Michael Dawson) [#52006](https://github.com/nodejs/node/pull/52006)
* \[[`01aaddde3c`](https://github.com/nodejs/node/commit/01aaddde3c)] - **doc**: 说明 `const c2 = vm.createContext(c1); c1 === c2` 为 true (Daniel Kaplan) [#51960](https://github.com/nodejs/node/pull/51960)
* \[[`912145fac4`](https://github.com/nodejs/node/commit/912145fac4)] - **doc**: 澄清 moderation issues 的用途 (Antoine du Hamel) [#51990](https://github.com/nodejs/node/pull/51990)
* \[[`807c89cb26`](https://github.com/nodejs/node/commit/807c89cb26)] - **doc**: 添加 UlisesGascon 作为协作者 (Ulises Gascón) [#51991](https://github.com/nodejs/node/pull/51991)
* \[[`53ff3e5682`](https://github.com/nodejs/node/commit/53ff3e5682)] - **doc**: 废弃 hmac 公共构造函数 (Marco Ippolito) [#51881](https://github.com/nodejs/node/pull/51881)
* \[[`5e78a20ef9`](https://github.com/nodejs/node/commit/5e78a20ef9)] - **(SEMVER-MINOR)** **doc**: 废弃 fs.Stats 公共构造函数 (Marco Ippolito) [#51879](https://github.com/nodejs/node/pull/51879)
* \[[`7bfb0b43e6`](https://github.com/nodejs/node/commit/7bfb0b43e6)] - **events**: 为一致性重命名 high 和 low watermark (Chemi Atlow) [#52080](https://github.com/nodejs/node/pull/52080)
* \[[`5e6967359b`](https://github.com/nodejs/node/commit/5e6967359b)] - **events**: 提取 addAbortListener 供内部安全使用 (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`6930205272`](https://github.com/nodejs/node/commit/6930205272)] - **events**: 在 `on` 中从 signal 移除 abort listener (Neal Beeken) [#51091](https://github.com/nodejs/node/pull/51091)
* \[[`235ab4f99f`](https://github.com/nodejs/node/commit/235ab4f99f)] - **events,doc**: 将 CustomEvent 标记为稳定 (Daeyeon Jeong) [#52618](https://github.com/nodejs/node/pull/52618)
* \[[`ca5b827148`](https://github.com/nodejs/node/commit/ca5b827148)] - **fs**: 修复 read / readSync 的位置偏移类型 (Ruy Adorno) [#52603](https://github.com/nodejs/node/pull/52603)
* \[[`e7d0d804b2`](https://github.com/nodejs/node/commit/e7d0d804b2)] - **fs**: 修复在 Linux 上删除文件时递归 fs.watch 崩溃的问题 (Matteo Collina) [#52349](https://github.com/nodejs/node/pull/52349)
* \[[`c5fd193d6b`](https://github.com/nodejs/node/commit/c5fd193d6b)] - **fs**: 重构 maybeCallback 函数 (Yagiz Nizipli) [#52129](https://github.com/nodejs/node/pull/52129)
* \[[`0a9910c2c1`](https://github.com/nodejs/node/commit/0a9910c2c1)] - **fs**: 修复 readFileSync utf8 快速路径中的边界情况 (Richard Lau) [#52101](https://github.com/nodejs/node/pull/52101)
* \[[`51d7cd5de8`](https://github.com/nodejs/node/commit/51d7cd5de8)] - **fs**: 在 `fchown` 中校验来自 cpp 的 fd (Yagiz Nizipli) [#52051](https://github.com/nodejs/node/pull/52051)
* \[[`33ad86c2be`](https://github.com/nodejs/node/commit/33ad86c2be)] - **fs**: 在 `close` 中校验来自 cpp 的 fd (Yagiz Nizipli) [#52051](https://github.com/nodejs/node/pull/52051)
* \[[`34667c0a7e`](https://github.com/nodejs/node/commit/34667c0a7e)] - **fs**: 校验来自 cpp 的文件模式 (Yagiz Nizipli) [#52050](https://github.com/nodejs/node/pull/52050)
* \[[`c530520be3`](https://github.com/nodejs/node/commit/c530520be3)] - **fs**: 为 fs/promises 添加堆栈跟踪 (翠 / green) [#49849](https://github.com/nodejs/node/pull/49849)
* \[[`edecd464b9`](https://github.com/nodejs/node/commit/edecd464b9)] - **fs,permission**: 统一 buffers 的处理方式 (Tobias Nießen) [#52348](https://github.com/nodejs/node/pull/52348)
* \[[`3bcd68337e`](https://github.com/nodejs/node/commit/3bcd68337e)] - **http2**: 修复在使用 `allowHTTP1=true` 时 CPU 占用过高的问题 (Eugene) [#52713](https://github.com/nodejs/node/pull/52713)
* \[[`e01015996a`](https://github.com/nodejs/node/commit/e01015996a)] - **http2**: 修复 h2-over-h2 连接代理问题 (Tim Perry) [#52368](https://github.com/nodejs/node/pull/52368)
* \[[`9f88736860`](https://github.com/nodejs/node/commit/9f88736860)] - **http2**: 使用内部的 addAbortListener (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`acd7758959`](https://github.com/nodejs/node/commit/acd7758959)] - **lib**: 使用预定义变量代替位运算 (Deokjin Kim) [#52580](https://github.com/nodejs/node/pull/52580)
* \[[`18ae7a46f6`](https://github.com/nodejs/node/commit/18ae7a46f6)] - **lib**: 重构 fetch 方法中 undici 的懒加载 (Victor Chen) [#52275](https://github.com/nodejs/node/pull/52275)
* \[[`64c2c2a7ac`](https://github.com/nodejs/node/commit/64c2c2a7ac)] - **lib**: 用替代方案取代字符串原型的使用 (Aviv Keller) [#52440](https://github.com/nodejs/node/pull/52440)
* \[[`ee11b5315c`](https://github.com/nodejs/node/commit/ee11b5315c)] - **lib**: 当未传入文件时，为 .load .save 添加正确的错误消息 (Thomas Mauran) [#52225](https://github.com/nodejs/node/pull/52225)
* \[[`e5521b537f`](https://github.com/nodejs/node/commit/e5521b537f)] - **lib**: 修复 \_refreshLine 的类型错误 (Jackson Tian) [#52133](https://github.com/nodejs/node/pull/52133)
* \[[`d5d6e041c8`](https://github.com/nodejs/node/commit/d5d6e041c8)] - **lib**: 在调用 listen 两次时只触发一次 listening 事件 (theanarkh) [#52119](https://github.com/nodejs/node/pull/52119)
* \[[`d33fc36784`](https://github.com/nodejs/node/commit/d33fc36784)] - **lib**: 确保在 http server 中清除旧定时器 (theanarkh) [#52118](https://github.com/nodejs/node/pull/52118)
* \[[`ea4905c0f5`](https://github.com/nodejs/node/commit/ea4905c0f5)] - **lib**: 修复 cluster worker 中使用 handle 的 listen (theanarkh) [#52056](https://github.com/nodejs/node/pull/52056)
* \[[`8fd8130507`](https://github.com/nodejs/node/commit/8fd8130507)] - **lib, doc**: 将 readme.md 重命名为 README.md (Aviv Keller) [#52471](https://github.com/nodejs/node/pull/52471)
* \[[`722fe64ff7`](https://github.com/nodejs/node/commit/722fe64ff7)] - **(SEMVER-MINOR)** **lib, url**: 为 path 解析添加 `windows` 选项 (Aviv Keller) [#52509](https://github.com/nodejs/node/pull/52509)
* \[[`26691e6032`](https://github.com/nodejs/node/commit/26691e6032)] - **meta**: 将一个或多个协作者移至 emeritus (Node.js GitHub Bot) [#52633](https://github.com/nodejs/node/pull/52633)
* \[[`befb90dc83`](https://github.com/nodejs/node/commit/befb90dc83)] - **meta**: 将一个或多个协作者移至 emeritus (Node.js GitHub Bot) [#52457](https://github.com/nodejs/node/pull/52457)
* \[[`22b7167e72`](https://github.com/nodejs/node/commit/22b7167e72)] - **meta**: 将 actions/download-artifact 从 4.1.3 升级到 4.1.4 (dependabot\[bot]) [#52314](https://github.com/nodejs/node/pull/52314)
* \[[`4dafd3ede2`](https://github.com/nodejs/node/commit/4dafd3ede2)] - **meta**: 将 rtCamp/action-slack-notify 从 2.2.1 升级到 2.3.0 (dependabot\[bot]) [#52313](https://github.com/nodejs/node/pull/52313)
* \[[`2760db7640`](https://github.com/nodejs/node/commit/2760db7640)] - **meta**: 将 github/codeql-action 从 3.24.6 升级到 3.24.9 (dependabot\[bot]) [#52312](https://github.com/nodejs/node/pull/52312)
* \[[`542aaf9ca9`](https://github.com/nodejs/node/commit/542aaf9ca9)] - **meta**: 将 actions/cache 从 4.0.1 升级到 4.0.2 (dependabot\[bot]) [#52311](https://github.com/nodejs/node/pull/52311)
* \[[`df330998d9`](https://github.com/nodejs/node/commit/df330998d9)] - **meta**: 将 actions/setup-python 从 5.0.0 升级到 5.1.0 (dependabot\[bot]) [#52310](https://github.com/nodejs/node/pull/52310)
* \[[`5f40fe0cc2`](https://github.com/nodejs/node/commit/5f40fe0cc2)] - **meta**: 将 codecov/codecov-action 从 4.1.0 升级到 4.1.1 (dependabot\[bot]) [#52308](https://github.com/nodejs/node/pull/52308)
* \[[`481420f25c`](https://github.com/nodejs/node/commit/481420f25c)] - **meta**: 将一个或多个协作者移至 emeritus (Node.js GitHub Bot) [#52300](https://github.com/nodejs/node/pull/52300)
* \[[`3121949f85`](https://github.com/nodejs/node/commit/3121949f85)] - **meta**: 将 Codecov 上传 token 传递给 codecov action (Michaël Zasso) [#51982](https://github.com/nodejs/node/pull/51982)
* \[[`882a64e639`](https://github.com/nodejs/node/commit/882a64e639)] - **module**: 修复 detect-module 在仅 cjs 错误时未重试为 esm (Geoffrey Booth) [#52024](https://github.com/nodejs/node/pull/52024)
* \[[`5fcc1d32a8`](https://github.com/nodejs/node/commit/5fcc1d32a8)] - **module**: 重构 ESM loader 初始化和入口点处理 (Joyee Cheung) [#51999](https://github.com/nodejs/node/pull/51999)
* \[[`d116fa1568`](https://github.com/nodejs/node/commit/d116fa1568)] - **(SEMVER-MINOR)** **net**: 为 autoSelectFamilyAttemptTimeout 添加 CLI 选项 (Paolo Insogna) [#52474](https://github.com/nodejs/node/pull/52474)
* \[[`37abad86ae`](https://github.com/nodejs/node/commit/37abad86ae)] - **net**: 使用内部的 addAbortListener (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`a920489a1f`](https://github.com/nodejs/node/commit/a920489a1f)] - **node-api**: 修复 Coverity 报告的问题 (Michael Dawson) [#52584](https://github.com/nodejs/node/pull/52584)
* \[[`0a225a4b40`](https://github.com/nodejs/node/commit/0a225a4b40)] - **node-api**: 在外部类型标签被设置时复制它们 (Niels Martignène) [#52426](https://github.com/nodejs/node/pull/52426)
* \[[`f9d95674be`](https://github.com/nodejs/node/commit/f9d95674be)] - **node-api**: 让 tsfn 再次接受 napi_finalize (Gabriel Schulhof) [#51801](https://github.com/nodejs/node/pull/51801)
* \[[`72aabe1139`](https://github.com/nodejs/node/commit/72aabe1139)] - **perf_hooks**: 降低 createHistogram 的开销 (Vinícius Lourenço) [#50074](https://github.com/nodejs/node/pull/50074)
* \[[`fb601c3a94`](https://github.com/nodejs/node/commit/fb601c3a94)] - **readline**: 使用内部的 addAbortListener (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`29f09f05f7`](https://github.com/nodejs/node/commit/29f09f05f7)] - **(SEMVER-MINOR)** **report**: 添加 `--report-exclude-network` 选项 (Ethan Arrowood) [#51645](https://github.com/nodejs/node/pull/51645)
* \[[`7e6d923f5b`](https://github.com/nodejs/node/commit/7e6d923f5b)] - **src**: 在使用 v8::EmbedderGraph::V8Node 之前转换为 v8::Value (Joyee Cheung) [#52638](https://github.com/nodejs/node/pull/52638)
* \[[`6af7b78b0d`](https://github.com/nodejs/node/commit/6af7b78b0d)] - **(SEMVER-MINOR)** **src**: 为 snapshot FromBlob 添加 `string_view` 重载 (Anna Henningsen) [#52595](https://github.com/nodejs/node/pull/52595)
* \[[`27491e55c1`](https://github.com/nodejs/node/commit/27491e55c1)] - **src**: 移除 env file 解析中的正则表达式使用 (IlyasShabi) [#52406](https://github.com/nodejs/node/pull/52406)
* \[[`b05e639e27`](https://github.com/nodejs/node/commit/b05e639e27)] - **src**: 修复 loadEnvFile 的 ENOENT 错误 (mathis-west-1) [#52438](https://github.com/nodejs/node/pull/52438)
* \[[`1b4d2814d1`](https://github.com/nodejs/node/commit/1b4d2814d1)] - **src**: 更新 node_revert.h 中的分支名 (Tobias Nießen) [#52390](https://github.com/nodejs/node/pull/52390)
* \[[`7e35a169ea`](https://github.com/nodejs/node/commit/7e35a169ea)] - **src**: 停止使用 `v8::BackingStore::Reallocate` (Michaël Zasso) [#52292](https://github.com/nodejs/node/pull/52292)
* \[[`2449d2606a`](https://github.com/nodejs/node/commit/2449d2606a)] - **src**: 修复 coverity 报告的 move after use 问题 (Michael Dawson) [#52141](https://github.com/nodejs/node/pull/52141)
* \[[`b33eff887d`](https://github.com/nodejs/node/commit/b33eff887d)] - **(SEMVER-MINOR)** **src**: 添加 C++ ProcessEmitWarningSync() (Joyee Cheung) [#51977](https://github.com/nodejs/node/pull/51977)
* \[[`f2c7408927`](https://github.com/nodejs/node/commit/f2c7408927)] - **src**: 让 process.constrainedMemory() 始终返回一个数字 (Chengzhong Wu) [#52039](https://github.com/nodejs/node/pull/52039)
* \[[`7f575c886b`](https://github.com/nodejs/node/commit/7f575c886b)] - **(SEMVER-MINOR)** **src**: 为 report 和 process 添加 uv_get_available_memory (theanarkh) [#52023](https://github.com/nodejs/node/pull/52023)
* \[[`e161e62313`](https://github.com/nodejs/node/commit/e161e62313)] - **src**: 为内置 CJS 加载器使用专用例程编译函数 (Joyee Cheung) [#52016](https://github.com/nodejs/node/pull/52016)
* \[[`07322b490f`](https://github.com/nodejs/node/commit/07322b490f)] - **src**: 修复 Blob\[De]serializer 中读取空 string views 的问题 (Joyee Cheung) [#52000](https://github.com/nodejs/node/pull/52000)
* \[[`e216192390`](https://github.com/nodejs/node/commit/e216192390)] - **src**: 重构出 FormatErrorMessage 以进行错误格式化 (Joyee Cheung) [#51999](https://github.com/nodejs/node/pull/51999)
* \[[`b3a11b574b`](https://github.com/nodejs/node/commit/b3a11b574b)] - **(SEMVER-MINOR)** **src**: 为 Environment 预加载函数 (Cheng Zhao) [#51539](https://github.com/nodejs/node/pull/51539)
* \[[`09bd367ef6`](https://github.com/nodejs/node/commit/09bd367ef6)] - **stream**: 让 Duplex 继承 Writable 的 destroy (Luigi Pinca) [#52318](https://github.com/nodejs/node/pull/52318)
* \[[`0b853a7576`](https://github.com/nodejs/node/commit/0b853a7576)] - **(SEMVER-MINOR)** **stream**: 支持 typed arrays (IlyasShabi) [#51866](https://github.com/nodejs/node/pull/51866)
* \[[`f8209ffe45`](https://github.com/nodejs/node/commit/f8209ffe45)] - **stream**: 在构造 `ERR_MULTIPLE_CALLBACK` 时添加 `new` (haze) [#52110](https://github.com/nodejs/node/pull/52110)
* \[[`8442457117`](https://github.com/nodejs/node/commit/8442457117)] - **stream**: 使用内部的 addAbortListener (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`8d20b641a2`](https://github.com/nodejs/node/commit/8d20b641a2)] - _**Revert**_ "**stream**: 修复 cloned webstreams 未被 unref 的问题" (Matteo Collina) [#51491](https://github.com/nodejs/node/pull/51491)
* \[[`a923adffab`](https://github.com/nodejs/node/commit/a923adffab)] - **test**: 将 `test-error-serdes` 标记为 flaky (Antoine du Hamel) [#52739](https://github.com/nodejs/node/pull/52739)
* \[[`d4f1803f0b`](https://github.com/nodejs/node/commit/d4f1803f0b)] - **test**: 将测试标记为 flaky (Michael Dawson) [#52671](https://github.com/nodejs/node/pull/52671)
* \[[`1e88e042c2`](https://github.com/nodejs/node/commit/1e88e042c2)] - **test**: 在 IBM i 上跳过 test-fs-watch-recursive-delete.js (Abdirahim Musse) [#52645](https://github.com/nodejs/node/pull/52645)
* \[[`6da558af8b`](https://github.com/nodejs/node/commit/6da558af8b)] - **test**: 确保所有 worker 服务器都已就绪 (Luigi Pinca) [#52563](https://github.com/nodejs/node/pull/52563)
* \[[`c871fadb85`](https://github.com/nodejs/node/commit/c871fadb85)] - **test**: 修复 test-tls-ticket-cluster.js (Hüseyin Açacak) [#52431](https://github.com/nodejs/node/pull/52431)
* \[[`b6cb74d775`](https://github.com/nodejs/node/commit/b6cb74d775)] - **test**: 为 windows 拆分 wasi poll 测试 (Hüseyin Açacak) [#52538](https://github.com/nodejs/node/pull/52538)
* \[[`4ad159bb75`](https://github.com/nodejs/node/commit/4ad159bb75)] - **test**: 为 assertIsArray http2 util 编写测试 (Sinan Sonmez (Chaush)) [#52511](https://github.com/nodejs/node/pull/52511)
* \[[`1f7a28cbe7`](https://github.com/nodejs/node/commit/1f7a28cbe7)] - **test**: 修复使用 require 的 watch 测试未测试 pid 的问题 (Raz Luvaton) [#52353](https://github.com/nodejs/node/pull/52353)
* \[[`5b758b93d5`](https://github.com/nodejs/node/commit/5b758b93d5)] - **test**: 简化 ASan 构建检查 (Michaël Zasso) [#52430](https://github.com/nodejs/node/pull/52430)
* \[[`375c3db5ea`](https://github.com/nodejs/node/commit/375c3db5ea)] - **test**: 修复 overlapped-checker 中的 Windows 编译器警告 (Michaël Zasso) [#52405](https://github.com/nodejs/node/pull/52405)
* \[[`a1dd92cdee`](https://github.com/nodejs/node/commit/a1dd92cdee)] - **test**: 为 skip+todo 组合添加测试 (Colin Ihrig) [#52204](https://github.com/nodejs/node/pull/52204)
* \[[`8a0b721930`](https://github.com/nodejs/node/commit/8a0b721930)] - **test**: 修复不正确的测试 fixture (Colin Ihrig) [#52185](https://github.com/nodejs/node/pull/52185)
* \[[`dd1f761f3b`](https://github.com/nodejs/node/commit/dd1f761f3b)] - **test**: 添加缺失的 cctest/test_path.cc (Yagiz Nizipli) [#52148](https://github.com/nodejs/node/pull/52148)
* \[[`6da446d9e1`](https://github.com/nodejs/node/commit/6da446d9e1)] - **test**: 添加 `spawnSyncAndAssert` 工具函数 (Antoine du Hamel) [#52132](https://github.com/nodejs/node/pull/52132)
* \[[`d7bfb4e8d8`](https://github.com/nodejs/node/commit/d7bfb4e8d8)] - **test**: 降低 test-runner-output.mjs 的不稳定性 (Colin Ihrig) [#52146](https://github.com/nodejs/node/pull/52146)
* \[[`e4981b3d75`](https://github.com/nodejs/node/commit/e4981b3d75)] - **test**: 添加使用 `--print` 与 promises 的测试 (Antoine du Hamel) [#52137](https://github.com/nodejs/node/pull/52137)
* \[[`5cc540078e`](https://github.com/nodejs/node/commit/5cc540078e)] - **test**: 将 test-emit-after-on-destroyed 取消标记为 flaky (Abdirahim Musse) [#51995](https://github.com/nodejs/node/pull/51995)
* \[[`b9eb0035dd`](https://github.com/nodejs/node/commit/b9eb0035dd)] - **test**: 跳过动态链接 OpenSSL 的测试 (Richard Lau) [#52542](https://github.com/nodejs/node/pull/52542)
* \[[`32014f5601`](https://github.com/nodejs/node/commit/32014f5601)] - **test**: 避免性能函数上的 v8 deadcode (Vinícius Lourenço) [#50074](https://github.com/nodejs/node/pull/50074)
* \[[`29d2011f51`](https://github.com/nodejs/node/commit/29d2011f51)] - **test_runner**: 改进测试 hook 的错误处理 (Alex Yang) [#52401](https://github.com/nodejs/node/pull/52401)
* \[[`9497097fb3`](https://github.com/nodejs/node/commit/9497097fb3)] - **test_runner**: 修复在自身回调中清除最终超时 (Ben Richeson) [#52332](https://github.com/nodejs/node/pull/52332)
* \[[`0f690f0b9e`](https://github.com/nodejs/node/commit/0f690f0b9e)] - **test_runner**: 修复递归运行 (Moshe Atlow) [#52322](https://github.com/nodejs/node/pull/52322)
* \[[`34ab1a36ee`](https://github.com/nodejs/node/commit/34ab1a36ee)] - **test_runner**: 在 spec reporter 中无错误时隐藏换行 (Moshe Atlow) [#52297](https://github.com/nodejs/node/pull/52297)
* \[[`379535abe3`](https://github.com/nodejs/node/commit/379535abe3)] - **test_runner**: 禁用 TestsStream 上的 highWatermark (Colin Ihrig) [#52287](https://github.com/nodejs/node/pull/52287)
* \[[`35588cff39`](https://github.com/nodejs/node/commit/35588cff39)] - **test_runner**: 按正确顺序运行 afterEach hooks (Colin Ihrig) [#52239](https://github.com/nodejs/node/pull/52239)
* \[[`5cd3df8fe1`](https://github.com/nodejs/node/commit/5cd3df8fe1)] - **test_runner**: 简化测试结束时间跟踪 (Colin Ihrig) [#52182](https://github.com/nodejs/node/pull/52182)
* \[[`07e4a42e4b`](https://github.com/nodejs/node/commit/07e4a42e4b)] - **test_runner**: 简化测试开始时间跟踪 (Colin Ihrig) [#52182](https://github.com/nodejs/node/pull/52182)
* \[[`caec996831`](https://github.com/nodejs/node/commit/caec996831)] - **test_runner**: 在 watch 模式排空时发出诊断信息 (Moshe Atlow) [#52130](https://github.com/nodejs/node/pull/52130)
* \[[`41646d9c9e`](https://github.com/nodejs/node/commit/41646d9c9e)] - **(SEMVER-MINOR)** **test_runner**: 添加 suite() (Colin Ihrig) [#52127](https://github.com/nodejs/node/pull/52127)
* \[[`fd1489a623`](https://github.com/nodejs/node/commit/fd1489a623)] - **test_runner**: 为被跳过的测试跳过 each hooks (Colin Ihrig) [#52115](https://github.com/nodejs/node/pull/52115)
* \[[`73b38bfa9e`](https://github.com/nodejs/node/commit/73b38bfa9e)] - **test_runner**: 移除冗余的 report 调用 (Colin Ihrig) [#52089](https://github.com/nodejs/node/pull/52089)
* \[[`68187c4d9e`](https://github.com/nodejs/node/commit/68187c4d9e)] - **test_runner**: 使用内部的 addAbortListener (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`61e7ae05ef`](https://github.com/nodejs/node/commit/61e7ae05ef)] - **test_runner**: 在报告覆盖率时使用 source maps (Moshe Atlow) [#52060](https://github.com/nodejs/node/pull/52060)
* \[[`e64a25af61`](https://github.com/nodejs/node/commit/e64a25af61)] - **test_runner**: 处理未定义的测试位置 (Colin Ihrig) [#52036](https://github.com/nodejs/node/pull/52036)
* \[[`590decf202`](https://github.com/nodejs/node/commit/590decf202)] - **test_runner**: 避免覆盖根开始时间 (Colin Ihrig) [#52020](https://github.com/nodejs/node/pull/52020)
* \[[`a4cbb61c65`](https://github.com/nodejs/node/commit/a4cbb61c65)] - **test_runner**: 在异步错误时中止未完成测试 (Colin Ihrig) [#51996](https://github.com/nodejs/node/pull/51996)
* \[[`a223ca4868`](https://github.com/nodejs/node/commit/a223ca4868)] - **test_runner**: 如果测试已开始则立即运行 before hook (Moshe Atlow) [#52003](https://github.com/nodejs/node/pull/52003)
* \[[`956ee74c7e`](https://github.com/nodejs/node/commit/956ee74c7e)] - **test_runner**: 添加对 null 和 date 值输出的支持 (Malthe Borch) [#51920](https://github.com/nodejs/node/pull/51920)
* \[[`fc9ba17f6c`](https://github.com/nodejs/node/commit/fc9ba17f6c)] - **(SEMVER-MINOR)** **test_runner**: 添加 `test:complete` 事件以反映执行顺序 (Moshe Atlow) [#51909](https://github.com/nodejs/node/pull/51909)
* \[[`d5ac979aeb`](https://github.com/nodejs/node/commit/d5ac979aeb)] - **test_runner**: 为 tap reporter 格式化覆盖率报告 (Pulkit Gupta) [#51119](https://github.com/nodejs/node/pull/51119)
* \[[`c925bc18dc`](https://github.com/nodejs/node/commit/c925bc18dc)] - **tools**: 在 `find-inactive-collaborators` 中考虑共同作者 (Antoine du Hamel) [#52669](https://github.com/nodejs/node/pull/52669)
* \[[`1d37e772ec`](https://github.com/nodejs/node/commit/1d37e772ec)] - **tools**: 修复 mkssldef 中无效的转义序列 (Michaël Zasso) [#52624](https://github.com/nodejs/node/pull/52624)
* \[[`5b22fc3a81`](https://github.com/nodejs/node/commit/5b22fc3a81)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.15.0 (Node.js GitHub Bot) [#52617](https://github.com/nodejs/node/pull/52617)
* \[[`9cf47bb2f1`](https://github.com/nodejs/node/commit/9cf47bb2f1)] - **tools**: 更新 lint-md-dependencies (Rich Trott) [#52581](https://github.com/nodejs/node/pull/52581)
* \[[`c0c60d13c0`](https://github.com/nodejs/node/commit/c0c60d13c0)] - **tools**: 修复 osx-entitlements.plist 的标题空格 (Jackson Tian) [#52561](https://github.com/nodejs/node/pull/52561)
* \[[`7c349d7819`](https://github.com/nodejs/node/commit/7c349d7819)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.14.2 vfile-reporter\@8.1.1 (Node.js GitHub Bot) [#52518](https://github.com/nodejs/node/pull/52518)
* \[[`b4d703297b`](https://github.com/nodejs/node/commit/b4d703297b)] - **tools**: 格式化时使用 stylistic ESLint 插件 (Michaël Zasso) [#50714](https://github.com/nodejs/node/pull/50714)
* \[[`c6813360c2`](https://github.com/nodejs/node/commit/c6813360c2)] - **tools**: 更新 minimatch index 路径 (Marco Ippolito) [#52523](https://github.com/nodejs/node/pull/52523)
* \[[`8464c0253c`](https://github.com/nodejs/node/commit/8464c0253c)] - **tools**: 为 README 列表添加 lint 工具 (Antoine du Hamel) [#52476](https://github.com/nodejs/node/pull/52476)
* \[[`55a3fbc842`](https://github.com/nodejs/node/commit/55a3fbc842)] - **tools**: 将 inactive 限制改为 12 个月 (Yagiz Nizipli) [#52425](https://github.com/nodejs/node/pull/52425)
* \[[`74a171f130`](https://github.com/nodejs/node/commit/74a171f130)] - **tools**: 更新 stale bot 消息 (Wes Todd) [#52423](https://github.com/nodejs/node/pull/52423)
* \[[`b2a3dcec2a`](https://github.com/nodejs/node/commit/b2a3dcec2a)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.14.0 (Node.js GitHub Bot) [#52398](https://github.com/nodejs/node/pull/52398)
* \[[`f71a777e6e`](https://github.com/nodejs/node/commit/f71a777e6e)] - **tools**: 将 Ruff 更新到 v0.3.4 (Michaël Zasso) [#52302](https://github.com/nodejs/node/pull/52302)
* \[[`e3e0c68f8f`](https://github.com/nodejs/node/commit/e3e0c68f8f)] - **tools**: 在 ubuntu-latest 上运行 test-ubsan (Michaël Zasso) [#52375](https://github.com/nodejs/node/pull/52375)
* \[[`893b5aac31`](https://github.com/nodejs/node/commit/893b5aac31)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.13.2 (Node.js GitHub Bot) [#52286](https://github.com/nodejs/node/pull/52286)
* \[[`049cca419e`](https://github.com/nodejs/node/commit/049cca419e)] - _**Revert**_ "**tools**: 仅在源代码变更时运行 `build-windows` 工作流" (Michaël Zasso) [#52320](https://github.com/nodejs/node/pull/52320)
* \[[`b3dfc62cee`](https://github.com/nodejs/node/commit/b3dfc62cee)] - **tools**: 在 GitHub Actions 工作流中使用 Python 3.12 (Michaël Zasso) [#52301](https://github.com/nodejs/node/pull/52301)
* \[[`c7238d0c04`](https://github.com/nodejs/node/commit/c7238d0c04)] - **tools**: 允许本地更新 llhttp (Paolo Insogna) [#52085](https://github.com/nodejs/node/pull/52085)
* \[[`c39f15cafd`](https://github.com/nodejs/node/commit/c39f15cafd)] - **tools**: 在 Windows 上安装 npm PowerShell 脚本 (Luke Karrys) [#52009](https://github.com/nodejs/node/pull/52009)
* \[[`b36fea064a`](https://github.com/nodejs/node/commit/b36fea064a)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.13.0 (Node.js GitHub Bot) [#52122](https://github.com/nodejs/node/pull/52122)
* \[[`a5204eb915`](https://github.com/nodejs/node/commit/a5204eb915)] - **tools**: 修复 js2c.cc 中 Coverity 报告的错误 (Michael Dawson) [#52142](https://github.com/nodejs/node/pull/52142)
* \[[`cef4b7ef3d`](https://github.com/nodejs/node/commit/cef4b7ef3d)] - **tools**: 使 ubsan 工作流与 asan 保持同步 (Michaël Zasso) [#52152](https://github.com/nodejs/node/pull/52152)
* \[[`d406976bbe`](https://github.com/nodejs/node/commit/d406976bbe)] - **tools**: 将 github\_reporter 更新到 1.7.0 (Node.js GitHub Bot) [#52121](https://github.com/nodejs/node/pull/52121)
* \[[`fb100a2ac8`](https://github.com/nodejs/node/commit/fb100a2ac8)] - **tools**: 移除 gyp-next 的 .github 文件夹 (Marco Ippolito) [#52064](https://github.com/nodejs/node/pull/52064)
* \[[`5f1e7a0de2`](https://github.com/nodejs/node/commit/5f1e7a0de2)] - **tools**: 将 gyp-next 更新到 0.16.2 (Node.js GitHub Bot) [#52062](https://github.com/nodejs/node/pull/52062)
* \[[`1f1253446b`](https://github.com/nodejs/node/commit/1f1253446b)] - **tools**: 为 FreeBSD 将 manpage 安装到 share/man (Po-Chuan Hsieh) [#51791](https://github.com/nodejs/node/pull/51791)
* \[[`4b8b92fccc`](https://github.com/nodejs/node/commit/4b8b92fccc)] - **tools**: 自动化 gyp-next 更新 (Marco Ippolito) [#52014](https://github.com/nodejs/node/pull/52014)
* \[[`1ec9e58692`](https://github.com/nodejs/node/commit/1ec9e58692)] - **typings**: 修复无效的 JSDoc 声明 (Yagiz Nizipli) [#52659](https://github.com/nodejs/node/pull/52659)
* \[[`2d6b19970b`](https://github.com/nodejs/node/commit/2d6b19970b)] - **(SEMVER-MINOR)** **util**: 支持 util.styleText 中的格式数组 (Marco Ippolito) [#52040](https://github.com/nodejs/node/pull/52040)
* \[[`d30cccdf8c`](https://github.com/nodejs/node/commit/d30cccdf8c)] - **(SEMVER-MINOR)** **v8**: 实现用于内存泄漏回归测试的 v8.queryObjects() (Joyee Cheung) [#51927](https://github.com/nodejs/node/pull/51927)
* \[[`7f3b7fdeff`](https://github.com/nodejs/node/commit/7f3b7fdeff)] - **watch**: 修复某些 node 参数未传递给被监视进程的问题 (Raz Luvaton) [#52358](https://github.com/nodejs/node/pull/52358)
* \[[`8ba6f9bc9a`](https://github.com/nodejs/node/commit/8ba6f9bc9a)] - **watch**: 使用内部的 addAbortListener (Chemi Atlow) [#52081](https://github.com/nodejs/node/pull/52081)
* \[[`5a922232da`](https://github.com/nodejs/node/commit/5a922232da)] - **watch**: 标记为稳定 (Moshe Atlow) [#52074](https://github.com/nodejs/node/pull/52074)
* \[[`508e968a5f`](https://github.com/nodejs/node/commit/508e968a5f)] - **watch**: 批量重启文件 (Moshe Atlow) [#51992](https://github.com/nodejs/node/pull/51992)

<a id="20.12.2"></a>

## 2024-04-10, 版本 20.12.2 'Iron'（LTS），@RafaelGSS

这是一个安全发布。

### 重要变更

* CVE-2024-27980 - 在 Windows 上未启用 shell 选项时，通过 `child_process.spawn` 的 args 参数进行命令注入

### 提交

* \[[`69ffc6d50d`](https://github.com/nodejs/node/commit/69ffc6d50d)] - **src**: 禁止直接启动 .bat 和 .cmd 文件（Ben Noordhuis）[nodejs-private/node-private#563](https://github.com/nodejs-private/node-private/pull/563)

<a id="20.12.1"></a>

## 2024-04-03, 版本 20.12.1 'Iron'（LTS），@RafaelGSS

这是一个安全发布

### 重要变更

* CVE-2024-27983 - node::http2::Http2Session::\~Http2Session() 中的断言失败会导致 HTTP/2 服务器崩溃 -（高）
* CVE-2024-27982 - 通过 Content Length 混淆进行 HTTP 请求走私 -（中）
* llhttp 版本 9.2.1
* undici 版本 5.28.4

### 提交

* \[[`bd8f10a257`](https://github.com/nodejs/node/commit/bd8f10a257)] - **deps**: 将 undici 更新到 v5.28.4（Matteo Collina）[nodejs-private/node-private#576](https://github.com/nodejs-private/node-private/pull/576)
* \[[`5e34540a96`](https://github.com/nodejs/node/commit/5e34540a96)] - **http**: 默认不允许在请求头中使用 OBS 折叠（Paolo Insogna）[nodejs-private/node-private#557](https://github.com/nodejs-private/node-private/pull/557)
* \[[`ba1ae6d188`](https://github.com/nodejs/node/commit/ba1ae6d188)] - **src**: 确保在销毁会话时关闭流（Anna Henningsen）[nodejs-private/node-private#561](https://github.com/nodejs-private/node-private/pull/561)

<a id="20.12.0"></a>

## 2024-03-26, 版本 20.12.0 'Iron'（LTS），@richardlau

### 重要变更

#### crypto: 实现 crypto.hash()

此补丁引入了一个辅助函数 crypto.hash()，它可以一次性从输入计算摘要。对于可直接获取（非流式）且较小的输入（<= 5MB），它比基于对象的 createHash() 快 1.2-2 倍，同时由于不会创建中间对象，内存开销更低。

```js
const crypto = require('node:crypto');

// 对字符串进行哈希，并将结果作为十六进制编码字符串返回。
const string = 'Node.js';
// 10b3493287f831e81a438811a1ffba01f8cec4b7
console.log(crypto.hash('sha1', string));
```

由 Joyee Cheung 在 [#51044](https://github.com/nodejs/node/pull/51044) 中贡献。

#### 加载和解析环境变量

* `process.loadEnvFile(path)`：
  * 使用此函数加载 `.env` 文件。如果未指定路径，它会自动加载当前目录中的 .env 文件。示例：`process.loadEnvFile()`。
  * 通过指定路径加载特定的 .env 文件。示例：`process.loadEnvFile('./development.env')`。

* `util.parseEnv(content)`：
  * 使用此函数解析一个包含环境变量赋值的现有字符串。
  * 示例用法：`require('node:util').parseEnv('HELLO=world')`。

由 Yagiz Nizipli 在 [#51476](https://github.com/nodejs/node/pull/51476) 中贡献。

#### 新的连接尝试事件

在 `net.createConnection` 流程中新增了三个事件：

* `connectionAttempt`：当建立新的连接尝试时触发。在 Happy Eyeballs 场景下，这可能会触发多次。
* `connectionAttemptFailed`：当连接尝试失败时触发。在 Happy Eyeballs 场景下，这可能会触发多次。
* `connectionAttemptTimeout`：当连接尝试超时时触发。在 Happy Eyeballs 场景下，最后一次尝试不会触发该事件。如果未使用 Happy Eyeballs，则完全不会触发该事件。

此外，修复了一个旧 bug：在前一次连接尝试失败且用户销毁连接之后，仍可能启动新的连接尝试。
这会导致断言失败。

由 Paolo Insogna 在 [#51045](https://github.com/nodejs/node/pull/51045) 中贡献。

#### 权限模型变更

Node.js 20.12.0 包含对实验性权限模型的多项修复，以及两个新的 semver-minor 提交。
我们新增了 `--allow-addons` 标志，以便在使用权限模型时启用 addon 的使用。

```console
$ node --experimental-permission --allow-addons
```

由 Rafael Gonzaga 在 [#51183](https://github.com/nodejs/node/pull/51183) 中贡献

此外，现在通过 `--allow-fs-*` 标志支持相对路径。
因此，在此版本中可以使用：

```console
$ node --experimental-permission --allow-fs-read=./index.js
```

仅为应用程序入口点授予读权限。

由 Rafael Gonzaga 和 Carlos Espa 在 [#50758](https://github.com/nodejs/node/pull/50758) 中贡献。

#### sea: 支持嵌入资源

用户现在可以通过在配置中添加一个键路径字典作为 `assets` 字段来包含资源。在构建时，Node.js 会从指定路径读取资源并将其打包到准备 blob 中。在生成的可执行文件中，用户可以使用 `sea.getAsset()` 和 `sea.getAssetAsBlob()` API 获取这些资源。

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/blob.blob",
  "assets": {
    "a.jpg": "/path/to/a.jpg",
    "b.txt": "/path/to/b.txt"
  }
}
```

单文件可执行应用可以按如下方式访问资源：

```cjs
const { getAsset } = require('node:sea');
// 返回 ArrayBuffer 中数据的副本
const image = getAsset('a.jpg');
// 返回从资源中以 UTF8 解码得到的字符串。
const text = getAsset('b.txt', 'utf8');
// 返回一个不进行拷贝、包含该资源的 Blob。
const blob = getAssetAsBlob('a.jpg');
```

由 Joyee Cheung 在 [#50960](https://github.com/nodejs/node/pull/50960) 中贡献。

#### 通过 `--build-snapshot-config` 标志支持可配置快照

我们新增了 `--build-snapshot-config` 标志，用于通过自定义 JSON 配置文件配置快照。

```console
$ node --build-snapshot-config=/path/to/myconfig.json
```

使用此标志时，通过命令行提供的额外脚本文件
不会被执行，而是会被解释为普通的命令行参数。

这些更改由 Joyee Cheung 和 Anna Henningsen 在 [#50453](https://github.com/nodejs/node/pull/50453) 中贡献

#### 文本样式

* `util.styleText(format, text)`：此函数会根据传入的 `format` 返回格式化文本。

新增了一个基于 `util.inspect.colors` 的文本格式化 API，使你能够用不同颜色（如红色、蓝色等）以及强调样式（斜体、粗体等）为文本添加样式。

```cjs
const { styleText } = require('node:util');
const errorMessage = styleText('red', 'Error! Error!');
console.log(errorMessage);
```

由 Rafael Gonzaga 在 [#51850](https://github.com/nodejs/node/pull/51850) 中贡献。

#### vm: 支持使用默认加载器处理动态 import()

此补丁增加了在所有接受 `importModuleDynamically` 选项的 vm API 中使用 `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER` 作为该选项的支持，但 `vm.SourceTextModule` 除外。这使用户可以在不需要自定义加载过程的情况下，快捷地在编译后的代码中支持动态 `import()`，同时不会丢失编译缓存。当该 `import()`  वास्तव通过此选项由默认加载器处理时，我们会发出实验性警告，而不是要求使用 `--experimental-vm-modules`。

```js
const { Script, constants } = require('node:vm');
const { resolve } = require('node:path');
const { writeFileSync } = require('node:fs');

// 将 test.js 和 test.txt 写入当前正在运行的脚本所在目录。
writeFileSync(resolve(__dirname, 'test.mjs'),
              'export const filename = "./test.json";');
writeFileSync(resolve(__dirname, 'test.json'),
              '{"hello": "world"}');

// 编译一个脚本，使其加载 test.mjs，然后再加载 test.json，
// 就像脚本位于同一目录中一样。
const script = new Script(
  `(async function() {
    const { filename } = await import('./test.mjs');
    return import(filename, { with: { type: 'json' } })
  })();`,
  {
    filename: resolve(__dirname, 'test-with-default.js'),
    importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER,
  });

// { default: { hello: 'world' } }
script.runInThisContext().then(console.log);
```

由 Joyee Cheung 在 [#51244](https://github.com/nodejs/node/pull/51244) 中贡献。

#### 根证书更新至 NSS 3.98

新增证书：

* Telekom Security TLS ECC Root 2020
* Telekom Security TLS RSA Root 2023

移除证书：

* Security Communication Root CA

#### 依赖更新

* acorn 更新到 8.11.3。
* ada 更新到 2.7.6。
* base64 更新到 0.5.2。
* brotli 更新到 1.1.0。
* c-ares 更新到 1.27.0。
* corepack 更新到 0.25.2。
* ICU 更新到 74.2。包括 CLDR 44.1 和 Unicode 15.1。
* nghttp2 更新到 1.60.0。
* npm 更新到 10.5.0。修复了一个信号未传递给子进程的回归问题。
* simdutf8 更新到 4.0.8。
* 时区更新到 2024a。
* zlib 更新到 1.3.0.1-motley-40e35a7。

#### 其他重要变更

* \[[`4f49e9d000`](https://github.com/nodejs/node/commit/4f49e9d000)] - **(SEMVER-MINOR)** **build**: 构建选项以设置头文件的本地位置（Michael Dawson）[#51525](https://github.com/nodejs/node/pull/51525)
* \[[`ccdb01187b`](https://github.com/nodejs/node/commit/ccdb01187b)] - **doc**: 将 zcbenz 添加为协作者（Cheng Zhao）[#51812](https://github.com/nodejs/node/pull/51812)
* \[[`481af53aea`](https://github.com/nodejs/node/commit/481af53aea)] - **doc**: 将 lemire 添加为协作者（Daniel Lemire）[#51572](https://github.com/nodejs/node/pull/51572)
* \[[`5ba4d96525`](https://github.com/nodejs/node/commit/5ba4d96525)] - **(SEMVER-MINOR)** **http2**: 为 appendHeader 添加 h2 兼容支持（Tim Perry）[#51412](https://github.com/nodejs/node/pull/51412)
* \[[`0861498e8b`](https://github.com/nodejs/node/commit/0861498e8b)] - **(SEMVER-MINOR)** **http2**: 添加服务器握手工具（snek）[#51172](https://github.com/nodejs/node/pull/51172)
* \[[`6b08d006ee`](https://github.com/nodejs/node/commit/6b08d006ee)] - **(SEMVER-MINOR)** **http2**: 接收 customsettings（Marten Richter）[#51323](https://github.com/nodejs/node/pull/51323)
* \[[`7894989bf0`](https://github.com/nodejs/node/commit/7894989bf0)] - **(SEMVER-MINOR)** **lib**: 将 encodingsMap 移动到 internal/util（Joyee Cheung）[#51044](https://github.com/nodejs/node/pull/51044)
* \[[`a58c98ea85`](https://github.com/nodejs/node/commit/a58c98ea85)] - **(SEMVER-MINOR)** **src**: 在 BlobDeserializer 中更好地打印字符串内容（Joyee Cheung）[#50960](https://github.com/nodejs/node/pull/50960)
* \[[`c3c0a3ee5c`](https://github.com/nodejs/node/commit/c3c0a3ee5c)] - **(SEMVER-MINOR)** **src**: 支持 .env 文件的多行值（IlyasShabi）[#51289](https://github.com/nodejs/node/pull/51289)
* \[[`2a921966c6`](https://github.com/nodejs/node/commit/2a921966c6)] - **(SEMVER-MINOR)** **src**: 不要强制转换 dotenv 路径（Tobias Nießen）[#51425](https://github.com/nodejs/node/pull/51425)
* \[[`0dee86f295`](https://github.com/nodejs/node/commit/0dee86f295)] - **(SEMVER-MINOR)** **src**: 支持可配置快照（Joyee Cheung）[#50453](https://github.com/nodejs/node/pull/50453)
* \[[`ade6614067`](https://github.com/nodejs/node/commit/ade6614067)] - **(SEMVER-MINOR)** **stream**: 为 webstreams 压缩添加 `deflate-raw` 格式支持（Damian Krzeminski）[#50097](https://github.com/nodejs/node/pull/50097)
* \[[`fe922f05e4`](https://github.com/nodejs/node/commit/fe922f05e4)] - **(SEMVER-MINOR)** **timers**: 导出 timers.promises（Marco Ippolito）[#51246](https://github.com/nodejs/node/pull/51246)

### 提交

* \[[`cbda4e9fc5`](https://github.com/nodejs/node/commit/cbda4e9fc5)] - **assert,crypto**: 使 KeyObject 和 CryptoKey 可用于相等性测试 (Filip Skokan) [#50897](https://github.com/nodejs/node/pull/50897)
* \[[`92fca59647`](https://github.com/nodejs/node/commit/92fca59647)] - **async\_hooks,inspector**: 在不使用 async\_wrap 的情况下实现 inspector API (Gabriel Bota) [#51501](https://github.com/nodejs/node/pull/51501)
* \[[`029ca982dc`](https://github.com/nodejs/node/commit/029ca982dc)] - **benchmark**: 更新 benchmark/async\_hooks/async-local- 的迭代次数 (Lei Shi) [#51420](https://github.com/nodejs/node/pull/51420)
* \[[`350e9fee8d`](https://github.com/nodejs/node/commit/350e9fee8d)] - **benchmark**: 更新 benchmark/domain/domain-fn-args.js 的迭代次数 (Lei Shi) [#51408](https://github.com/nodejs/node/pull/51408)
* \[[`40fda97deb`](https://github.com/nodejs/node/commit/40fda97deb)] - **benchmark**: 更新 assert/deepequal-typedarrays.js 的迭代次数 (Lei Shi) [#51419](https://github.com/nodejs/node/pull/51419)
* \[[`1b2e3b7049`](https://github.com/nodejs/node/commit/1b2e3b7049)] - **benchmark**: 更新 benchmark/assert/deepequal-map.js 的迭代次数 (Lei Shi) [#51416](https://github.com/nodejs/node/pull/51416)
* \[[`7639259203`](https://github.com/nodejs/node/commit/7639259203)] - **benchmark**: 将 startup.js 重命名为 startup-core.js (Joyee Cheung) [#51669](https://github.com/nodejs/node/pull/51669)
* \[[`4be33b5577`](https://github.com/nodejs/node/commit/4be33b5577)] - **benchmark**: 移除对未随发布包含的工具的依赖 (Adam Majer) [#51146](https://github.com/nodejs/node/pull/51146)
* \[[`bd03a154a9`](https://github.com/nodejs/node/commit/bd03a154a9)] - **benchmark**: 更新 benchmark/perf\_hooks 中的迭代次数 (Lei Shi) [#50869](https://github.com/nodejs/node/pull/50869)
* \[[`19b943b909`](https://github.com/nodejs/node/commit/19b943b909)] - **benchmark**: 更新 benchmark/crypto/aes-gcm-throughput.js 中的迭代次数 (Lei Shi) [#50929](https://github.com/nodejs/node/pull/50929)
* \[[`278c990dea`](https://github.com/nodejs/node/commit/278c990dea)] - **benchmark**: 更新 benchmark/crypto/randomBytes.js 中的迭代次数和大小 (Lei Shi) [#50868](https://github.com/nodejs/node/pull/50868)
* \[[`443d4fcff3`](https://github.com/nodejs/node/commit/443d4fcff3)] - **benchmark**: 添加 undici websocket 基准测试 (Chenyu Yang) [#50586](https://github.com/nodejs/node/pull/50586)
* \[[`3ab6143380`](https://github.com/nodejs/node/commit/3ab6143380)] - **benchmark**: 添加 create-hash 基准测试 (Joyee Cheung) [#51026](https://github.com/nodejs/node/pull/51026)
* \[[`6a8ff09332`](https://github.com/nodejs/node/commit/6a8ff09332)] - **benchmark**: 更新 benchmark/util/text-decoder.js 中的迭代次数和长度 (Lei Shi) [#50938](https://github.com/nodejs/node/pull/50938)
* \[[`22b53bc1fa`](https://github.com/nodejs/node/commit/22b53bc1fa)] - **benchmark**: 更新 benchmark/util/type-check.js 的迭代次数 (Lei Shi) [#50937](https://github.com/nodejs/node/pull/50937)
* \[[`f56bda5109`](https://github.com/nodejs/node/commit/f56bda5109)] - **benchmark**: 更新 benchmark/util/normalize-encoding.js 中的迭代次数 (Lei Shi) [#50934](https://github.com/nodejs/node/pull/50934)
* \[[`4fc83e1ce3`](https://github.com/nodejs/node/commit/4fc83e1ce3)] - **benchmark**: 更新 benchmark/util/inspect-array.js 中的迭代次数 (Lei Shi) [#50933](https://github.com/nodejs/node/pull/50933)
* \[[`0edddcfc19`](https://github.com/nodejs/node/commit/0edddcfc19)] - **benchmark**: 更新 benchmark/util/format.js 中的迭代次数 (Lei Shi) [#50932](https://github.com/nodejs/node/pull/50932)
* \[[`f109961fd1`](https://github.com/nodejs/node/commit/f109961fd1)] - **benchmark**: 更新 benchmark/crypto/hkdf.js 中的迭代次数 (Lei Shi) [#50866](https://github.com/nodejs/node/pull/50866)
* \[[`1e923f11f2`](https://github.com/nodejs/node/commit/1e923f11f2)] - **benchmark**: 更新 benchmark/crypto/get-ciphers.js 中的迭代次数 (Lei Shi) [#50863](https://github.com/nodejs/node/pull/50863)
* \[[`f13643da06`](https://github.com/nodejs/node/commit/f13643da06)] - **benchmark**: 更新 `util.inspect` 的迭代次数 (kylo5aby) [#50651](https://github.com/nodejs/node/pull/50651)
* \[[`03b19cbd2a`](https://github.com/nodejs/node/commit/03b19cbd2a)] - **bootstrap**: 改进对不支持的快照内置项的警告 (Joyee Cheung) [#50944](https://github.com/nodejs/node/pull/50944)
* \[[`51ea5b60a9`](https://github.com/nodejs/node/commit/51ea5b60a9)] - **build**: 修复 GN 中 arm64 主机交叉编译问题 (Cheng Zhao) [#51903](https://github.com/nodejs/node/pull/51903)
* \[[`9f5547afa2`](https://github.com/nodejs/node/commit/9f5547afa2)] - _**Revert**_ "**build**: 为 node-core-utils 提供变通方案" (Richard Lau) [#51975](https://github.com/nodejs/node/pull/51975)
* \[[`58255e73ae`](https://github.com/nodejs/node/commit/58255e73ae)] - **build**: 在 `Makefile` 中遵循 `NODE` 环境变量 (Antoine du Hamel) [#51743](https://github.com/nodejs/node/pull/51743)
* \[[`0a7419bf0b`](https://github.com/nodejs/node/commit/0a7419bf0b)] - _**Revert**_ "**build**: 修复 GN 构建中 cares 的警告" (Luigi Pinca) [#51865](https://github.com/nodejs/node/pull/51865)
* \[[`4118174b85`](https://github.com/nodejs/node/commit/4118174b85)] - **build**: 为兼容 Android 移除 `librt` 库链接 (BuShe Pie) [#51632](https://github.com/nodejs/node/pull/51632)
* \[[`012da16b85`](https://github.com/nodejs/node/commit/012da16b85)] - **build**: 在 GN 构建中不再依赖 gn\_helpers (Cheng Zhao) [#51439](https://github.com/nodejs/node/pull/51439)
* \[[`93fcf52990`](https://github.com/nodejs/node/commit/93fcf52990)] - **build**: 修复 GN 构建中 cares 的警告 (Cheng Zhao) [#51687](https://github.com/nodejs/node/pull/51687)
* \[[`2176495455`](https://github.com/nodejs/node/commit/2176495455)] - **build**: 修复使用 GN 构建 js2c (Cheng Zhao) [#51818](https://github.com/nodejs/node/pull/51818)
* \[[`d6e702f885`](https://github.com/nodejs/node/commit/d6e702f885)] - **build**: 在 JS2C 中将非 ASCII 的 Latin1 字符编码为一个字节 (Joyee Cheung) [#51605](https://github.com/nodejs/node/pull/51605)
* \[[`4f49e9d000`](https://github.com/nodejs/node/commit/4f49e9d000)] - **(SEMVER-MINOR)** **build**: 增加构建选项以设置头文件的本地位置 (Michael Dawson) [#51525](https://github.com/nodejs/node/pull/51525)
* \[[`8e84aad0ef`](https://github.com/nodejs/node/commit/8e84aad0ef)] - **build**: 使用 macOS m1 机器进行测试 (Yagiz Nizipli) [#51620](https://github.com/nodejs/node/pull/51620)
* \[[`5fce1a17e2`](https://github.com/nodejs/node/commit/5fce1a17e2)] - **build**: 删除 `%config%` 链接前进行检查 (liudonghua) [#51437](https://github.com/nodejs/node/pull/51437)
* \[[`46d6dce1a8`](https://github.com/nodejs/node/commit/46d6dce1a8)] - **build**: 增加 github 中的并行执行数 (Yagiz Nizipli) [#51554](https://github.com/nodejs/node/pull/51554)
* \[[`8b3ead1f3e`](https://github.com/nodejs/node/commit/8b3ead1f3e)] - **build**: 移除 node.gni 中的版权头 (Cheng Zhao) [#51535](https://github.com/nodejs/node/pull/51535)
* \[[`d8b86ad363`](https://github.com/nodejs/node/commit/d8b86ad363)] - **build**: 更新 ngtcp2 的 GN 构建文件 (Cheng Zhao) [#51313](https://github.com/nodejs/node/pull/51313)
* \[[`ba0ffddd2d`](https://github.com/nodejs/node/commit/ba0ffddd2d)] - **build**: 修复 VScode “Reopen in Container” 问题 (Serg Kryvonos) [#51271](https://github.com/nodejs/node/pull/51271)
* \[[`8b97e2e0a7`](https://github.com/nodejs/node/commit/8b97e2e0a7)] - **build**: 为 V8 构建添加 `-flax-vector-conversions` (Michaël Zasso) [#51257](https://github.com/nodejs/node/pull/51257)
* \[[`bd528c7dc0`](https://github.com/nodejs/node/commit/bd528c7dc0)] - **build**: 修复 GN 构建中来自 uv 的警告 (Cheng Zhao) [#51069](https://github.com/nodejs/node/pull/51069)
* \[[`ffe467b062`](https://github.com/nodejs/node/commit/ffe467b062)] - **build,tools**: 使 addons 测试在 GN 下可运行 (Cheng Zhao) [#50737](https://github.com/nodejs/node/pull/50737)
* \[[`448d67109a`](https://github.com/nodejs/node/commit/448d67109a)] - **(SEMVER-MINOR)** **crypto**: 实现 crypto.hash() (Joyee Cheung) [#51044](https://github.com/nodejs/node/pull/51044)
* \[[`48959dd2b4`](https://github.com/nodejs/node/commit/48959dd2b4)] - **crypto**: 将根证书更新到 NSS 3.98 (Node.js GitHub Bot) [#51794](https://github.com/nodejs/node/pull/51794)
* \[[`68e8b2c492`](https://github.com/nodejs/node/commit/68e8b2c492)] - **crypto**: 对哈希使用 EVP\_MD\_fetch 并缓存 EVP\_MD (Joyee Cheung) [#51034](https://github.com/nodejs/node/pull/51034)
* \[[`adb5d69621`](https://github.com/nodejs/node/commit/adb5d69621)] - **crypto**: 更新 CryptoKey 符号属性 (Filip Skokan) [#50897](https://github.com/nodejs/node/pull/50897)
* \[[`df0213fd3d`](https://github.com/nodejs/node/commit/df0213fd3d)] - **deps**: 将 nghttp2 更新到 1.60.0 (Node.js GitHub Bot) [#51948](https://github.com/nodejs/node/pull/51948)
* \[[`208dd887a5`](https://github.com/nodejs/node/commit/208dd887a5)] - **deps**: 将 npm 升级到 10.5.0 (npm team) [#51913](https://github.com/nodejs/node/pull/51913)
* \[[`587e70e1ee`](https://github.com/nodejs/node/commit/587e70e1ee)] - **deps**: 将 corepack 更新到 0.25.2 (Node.js GitHub Bot) [#51810](https://github.com/nodejs/node/pull/51810)
* \[[`38343c4857`](https://github.com/nodejs/node/commit/38343c4857)] - **deps**: 将 c-ares 更新到 1.27.0 (Node.js GitHub Bot) [#51846](https://github.com/nodejs/node/pull/51846)
* \[[`c9974f621c`](https://github.com/nodejs/node/commit/c9974f621c)] - **deps**: 将 c-ares 更新到 1.26.0 (Node.js GitHub Bot) [#51582](https://github.com/nodejs/node/pull/51582)
* \[[`0aa18e1a1c`](https://github.com/nodejs/node/commit/0aa18e1a1c)] - **deps**: 将 googletest 更新到 6a59382 (Node.js GitHub Bot) [#51580](https://github.com/nodejs/node/pull/51580)
* \[[`f871bc6ddc`](https://github.com/nodejs/node/commit/f871bc6ddc)] - **deps**: 将 nghttp2 更新到 1.59.0 (Node.js GitHub Bot) [#51581](https://github.com/nodejs/node/pull/51581)
* \[[`94f8ee8717`](https://github.com/nodejs/node/commit/94f8ee8717)] - **deps**: 将 corepack 更新到 0.24.1 (Node.js GitHub Bot) [#51459](https://github.com/nodejs/node/pull/51459)
* \[[`c23ce06e6b`](https://github.com/nodejs/node/commit/c23ce06e6b)] - **deps**: 将 ada 更新到 2.7.6 (Node.js GitHub Bot) [#51542](https://github.com/nodejs/node/pull/51542)
* \[[`372ce69de1`](https://github.com/nodejs/node/commit/372ce69de1)] - **deps**: 将 ada 更新到 2.7.5 (Node.js GitHub Bot) [#51542](https://github.com/nodejs/node/pull/51542)
* \[[`133719b2c9`](https://github.com/nodejs/node/commit/133719b2c9)] - **deps**: 将 googletest 更新到 7c07a86 (Node.js GitHub Bot) [#51458](https://github.com/nodejs/node/pull/51458)
* \[[`35675aa07f`](https://github.com/nodejs/node/commit/35675aa07f)] - **deps**: 将 acorn-walk 更新到 8.3.2 (Node.js GitHub Bot) [#51457](https://github.com/nodejs/node/pull/51457)
* \[[`ca73f55a22`](https://github.com/nodejs/node/commit/ca73f55a22)] - **deps**: 将 base64 更新到 0.5.2 (Node.js GitHub Bot) [#51455](https://github.com/nodejs/node/pull/51455)
* \[[`c9dad18191`](https://github.com/nodejs/node/commit/c9dad18191)] - **deps**: 使用 C11 支持编译 c-ares (Michaël Zasso) [#51410](https://github.com/nodejs/node/pull/51410)
* \[[`a727fa73ee`](https://github.com/nodejs/node/commit/a727fa73ee)] - **deps**: 将 npm 升级到 10.3.0 (npm team) [#51431](https://github.com/nodejs/node/pull/51431)
* \[[`834bbfd039`](https://github.com/nodejs/node/commit/834bbfd039)] - **deps**: 将 c-ares 更新到 1.25.0 (Node.js GitHub Bot) [#51385](https://github.com/nodejs/node/pull/51385)
* \[[`4c8fa3e7c2`](https://github.com/nodejs/node/commit/4c8fa3e7c2)] - **deps**: 将 uvwasi 更新到 0.0.20 并修复测试 (Michael Dawson) [#51355](https://github.com/nodejs/node/pull/51355)
* \[[`bd183ef2af`](https://github.com/nodejs/node/commit/bd183ef2af)] - **deps**: 将 nghttp3/\*\*/.deps 添加到 .gitignore (Luigi Pinca) [#51400](https://github.com/nodejs/node/pull/51400)
* \[[`1d8169995c`](https://github.com/nodejs/node/commit/1d8169995c)] - **deps**: 将 corepack 更新到 0.24.0 (Node.js GitHub Bot) [#51318](https://github.com/nodejs/node/pull/51318)
* \[[`4dfbbb8789`](https://github.com/nodejs/node/commit/4dfbbb8789)] - **deps**: 将 acorn 更新到 8.11.3 (Node.js GitHub Bot) [#51317](https://github.com/nodejs/node/pull/51317)
* \[[`7d60877fa3`](https://github.com/nodejs/node/commit/7d60877fa3)] - **deps**: 将 brotli 更新到 1.1.0 (Node.js GitHub Bot) [#50804](https://github.com/nodejs/node/pull/50804)
* \[[`1b99a3f0af`](https://github.com/nodejs/node/commit/1b99a3f0af)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-40e35a7 (Node.js GitHub Bot) [#51274](https://github.com/nodejs/node/pull/51274)
* \[[`2270285839`](https://github.com/nodejs/node/commit/2270285839)] - **deps**: 将 simdutf 更新到 4.0.8 (Node.js GitHub Bot) [#51000](https://github.com/nodejs/node/pull/51000)
* \[[`61d1535d84`](https://github.com/nodejs/node/commit/61d1535d84)] - **deps**: V8: 选择性回移植 de611e69ad51 (Keyhan Vakil) [#51200](https://github.com/nodejs/node/pull/51200)
* \[[`04323fd595`](https://github.com/nodejs/node/commit/04323fd595)] - **deps**: 将 googletest 更新到 530d5c8 (Node.js GitHub Bot) [#51191](https://github.com/nodejs/node/pull/51191)
* \[[`454b4f8d7e`](https://github.com/nodejs/node/commit/454b4f8d7e)] - **deps**: 将 acorn-walk 更新到 8.3.1 (Node.js GitHub Bot) [#50457](https://github.com/nodejs/node/pull/50457)
* \[[`cc693eb908`](https://github.com/nodejs/node/commit/cc693eb908)] - **deps**: 将 acorn-walk 更新到 8.3.0 (Node.js GitHub Bot) [#50457](https://github.com/nodejs/node/pull/50457)
* \[[`09519c6655`](https://github.com/nodejs/node/commit/09519c6655)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-dd5fc13 (Node.js GitHub Bot) [#51105](https://github.com/nodejs/node/pull/51105)
* \[[`a2f39e9168`](https://github.com/nodejs/node/commit/a2f39e9168)] - **deps**: V8: 选择性回移植 0fd478bcdabd (Joyee Cheung) [#50572](https://github.com/nodejs/node/pull/50572)
* \[[`1aaf156ea7`](https://github.com/nodejs/node/commit/1aaf156ea7)] - **deps**: 将 zlib 更新到 1.3-22124f5 (Node.js GitHub Bot) [#50910](https://github.com/nodejs/node/pull/50910)
* \[[`3f4e254047`](https://github.com/nodejs/node/commit/3f4e254047)] - **deps**: 将 googletest 更新到 76bb2af (Node.js GitHub Bot) [#50555](https://github.com/nodejs/node/pull/50555)
* \[[`702684c008`](https://github.com/nodejs/node/commit/702684c008)] - **deps**: 将 googletest 更新到 b10fad3 (Node.js GitHub Bot) [#50555](https://github.com/nodejs/node/pull/50555)
* \[[`4ee7f29657`](https://github.com/nodejs/node/commit/4ee7f29657)] - **deps**: 将时区数据更新到 2024a (Michaël Zasso) [#51723](https://github.com/nodejs/node/pull/51723)
* \[[`452d74c8b6`](https://github.com/nodejs/node/commit/452d74c8b6)] - **deps**: 将 icu 更新到 74.2 (Michaël Zasso) [#51723](https://github.com/nodejs/node/pull/51723)
* \[[`e6fc5a5ee1`](https://github.com/nodejs/node/commit/e6fc5a5ee1)] - **deps**: 将时区数据更新到 2023d (Node.js GitHub Bot) [#51461](https://github.com/nodejs/node/pull/51461)
* \[[`4ee0f8306b`](https://github.com/nodejs/node/commit/4ee0f8306b)] - **deps**: 将 icu 更新到 74.1 (Node.js GitHub Bot) [#50515](https://github.com/nodejs/node/pull/50515)
* \[[`cb49f31480`](https://github.com/nodejs/node/commit/cb49f31480)] - **deps**: 选择性回移植 libuv/libuv\@d09441c (Richard Lau) [#51976](https://github.com/nodejs/node/pull/51976)
* \[[`ea50540c5e`](https://github.com/nodejs/node/commit/ea50540c5e)] - _**Revert**_ "**deps**: V8: 选择性回移植 13192d6e10fa" (kxxt) [#51495](https://github.com/nodejs/node/pull/51495)
* \[[`6fd1617ab4`](https://github.com/nodejs/node/commit/6fd1617ab4)] - **doc**: 添加分发政策 (Geoffrey Booth) [#51918](https://github.com/nodejs/node/pull/51918)
* \[[`fc0b389006`](https://github.com/nodejs/node/commit/fc0b389006)] - **doc**: 修复示例的实际结果与文档不一致的问题（events）(Deokjin Kim) [#51925](https://github.com/nodejs/node/pull/51925)
* \[[`93d6d66339`](https://github.com/nodejs/node/commit/93d6d66339)] - **doc**: 澄清 Corepack 威胁模型 (Antoine du Hamel) [#51917](https://github.com/nodejs/node/pull/51917)
* \[[`276d1d1d65`](https://github.com/nodejs/node/commit/276d1d1d65)] - **doc**: 为 crypto.hash() 添加稳定性索引 (Joyee Cheung) [#51978](https://github.com/nodejs/node/pull/51978)
* \[[`473af948b5`](https://github.com/nodejs/node/commit/473af948b5)] - **doc**: 移除会破坏句子的多余反引号 (JounQin) [#51904](https://github.com/nodejs/node/pull/51904)
* \[[`b52b249b05`](https://github.com/nodejs/node/commit/b52b249b05)] - **doc**: 将 node-api/node-addon-api 团队链接更新到共享项目新闻 (Ulises Gascón) [#51877](https://github.com/nodejs/node/pull/51877)
* \[[`a74c373ea4`](https://github.com/nodejs/node/commit/a74c373ea4)] - **doc**: 将 website 团队加入共享项目新闻 (Ulises Gascón) [#49002](https://github.com/nodejs/node/pull/49002)
* \[[`b7ce547d41`](https://github.com/nodejs/node/commit/b7ce547d41)] - **doc**: 更新 Event Loop 的指南链接 (Shrujal Shah) [#51874](https://github.com/nodejs/node/pull/51874)
* \[[`3dfee7ee33`](https://github.com/nodejs/node/commit/3dfee7ee33)] - **doc**: 将 `ExperimentalWarnings` 改为 `ExperimentalWarning` (Ameet Kaustav) [#51741](https://github.com/nodejs/node/pull/51741)
* \[[`740d0679e7`](https://github.com/nodejs/node/commit/740d0679e7)] - **doc**: 将 Paolo 加入 TSC 成员 (Michael Dawson) [#51825](https://github.com/nodejs/node/pull/51825)
* \[[`3240a2f349`](https://github.com/nodejs/node/commit/3240a2f349)] - **doc**: 为 Electron 30 预留 123 (Keeley Hammond) [#51803](https://github.com/nodejs/node/pull/51803)
* \[[`597e3db0f9`](https://github.com/nodejs/node/commit/597e3db0f9)] - **doc**: 添加关于 GPG\_TTY 的说明 (Rafael Gonzaga) [#51806](https://github.com/nodejs/node/pull/51806)
* \[[`ccdb01187b`](https://github.com/nodejs/node/commit/ccdb01187b)] - **doc**: 将 zcbenz 添加为协作者 (Cheng Zhao) [#51812](https://github.com/nodejs/node/pull/51812)
* \[[`3a3de00437`](https://github.com/nodejs/node/commit/3a3de00437)] - **doc**: 添加 stewards 条目 (Rafael Gonzaga) [#51760](https://github.com/nodejs/node/pull/51760)
* \[[`06b882d2fa`](https://github.com/nodejs/node/commit/06b882d2fa)] - **doc**: 更新 2023 年技术优先事项 (Jean Burellier) [#47523](https://github.com/nodejs/node/pull/47523)
* \[[`9a68b47fe1`](https://github.com/nodejs/node/commit/9a68b47fe1)] - **doc**: 将 isWebAssemblyCompiledModule 标记为生命周期结束 (Marco Ippolito) [#51442](https://github.com/nodejs/node/pull/51442)
* \[[`8016628710`](https://github.com/nodejs/node/commit/8016628710)] - **doc**: 修复 `globals.md` 的介绍部分 (Antoine du Hamel) [#51742](https://github.com/nodejs/node/pull/51742)
* \[[`9ddbe4523f`](https://github.com/nodejs/node/commit/9ddbe4523f)] - **doc**: 为更好地生成 JSON 而更新 (Dmitry Semigradsky) [#51592](https://github.com/nodejs/node/pull/51592)
* \[[`140cf26d47`](https://github.com/nodejs/node/commit/140cf26d47)] - **doc**: 编写 GN 构建文档 (Cheng Zhao) [#51676](https://github.com/nodejs/node/pull/51676)
* \[[`ecfb3f18b3`](https://github.com/nodejs/node/commit/ecfb3f18b3)] - **doc**: 修复未捕获异常示例 (Gabriel Schulhof) [#51638](https://github.com/nodejs/node/pull/51638)
* \[[`b3157a08bf`](https://github.com/nodejs/node/commit/b3157a08bf)] - **doc**: 澄清测试套件完成时 `after` 钩子的执行 (Ognjen Jevremović) [#51523](https://github.com/nodejs/node/pull/51523)
* \[[`1dae1873d9`](https://github.com/nodejs/node/commit/1dae1873d9)] - **doc**: 修复 `dns.lookup` 和 `dnsPromises.lookup` 的描述 (Duncan Chiu) [#51517](https://github.com/nodejs/node/pull/51517)
* \[[`50df052087`](https://github.com/nodejs/node/commit/50df052087)] - **doc**: 注明 path.normalize 与 POSIX 的行为不一致 (Tobias Nießen) [#51513](https://github.com/nodejs/node/pull/51513)
* \[[`481af53aea`](https://github.com/nodejs/node/commit/481af53aea)] - **doc**: 将 lemire 添加为协作者 (Daniel Lemire) [#51572](https://github.com/nodejs/node/pull/51572)
* \[[`dec0d5d19a`](https://github.com/nodejs/node/commit/dec0d5d19a)] - **doc**: 修复历史上的 experimental fetch 标志 (Kenrick) [#51506](https://github.com/nodejs/node/pull/51506)
* \[[`96c480b1a1`](https://github.com/nodejs/node/commit/96c480b1a1)] - **doc**: 修复 connectionAttempt 参数的类型 (Rafael Gonzaga) [#51490](https://github.com/nodejs/node/pull/51490)
* \[[`76968ab112`](https://github.com/nodejs/node/commit/76968ab112)] - **doc**: 移除对已解决的 child\_process v8 问题的引用 (Ian Kerins) [#51467](https://github.com/nodejs/node/pull/51467)
* \[[`bdd3a2a9fd`](https://github.com/nodejs/node/commit/bdd3a2a9fd)] - **doc**: 更新拼写错误 (Aranđel Šarenac) [#51475](https://github.com/nodejs/node/pull/51475)
* \[[`3532f5587c`](https://github.com/nodejs/node/commit/3532f5587c)] - **doc**: 添加有关 inspector 断点的说明 (Chengzhong Wu) [#51417](https://github.com/nodejs/node/pull/51417)
* \[[`0dffb9f049`](https://github.com/nodejs/node/commit/0dffb9f049)] - **doc**: 在 `offboarding.md` 中添加链接 (Antoine du Hamel) [#51440](https://github.com/nodejs/node/pull/51440)
* \[[`58d2442f0f`](https://github.com/nodejs/node/commit/58d2442f0f)] - **doc**: 修复拼写错误 (u9g) [#51454](https://github.com/nodejs/node/pull/51454)
* \[[`a09f440dbd`](https://github.com/nodejs/node/commit/a09f440dbd)] - **doc**: 添加安全回退检查 (Michael Dawson) [#51376](https://github.com/nodejs/node/pull/51376)
* \[[`401837bfc4`](https://github.com/nodejs/node/commit/401837bfc4)] - **doc**: 修复一些 policy scope 的拼写错误 (Tim Kuijsten) [#51234](https://github.com/nodejs/node/pull/51234)
* \[[`f301f829ba`](https://github.com/nodejs/node/commit/f301f829ba)] - **doc**: 改进子测试文档 (Marco Ippolito) [#51379](https://github.com/nodejs/node/pull/51379)
* \[[`1e40f552fd`](https://github.com/nodejs/node/commit/1e40f552fd)] - **doc**: 在 `child_process.md` 中补充缺失的单词 (Joseph Joy) [#50370](https://github.com/nodejs/node/pull/50370)
* \[[`42b4f0f5ab`](https://github.com/nodejs/node/commit/42b4f0f5ab)] - **doc**: 修复警告小节的对齐问题 (James M Snell) [#51374](https://github.com/nodejs/node/pull/51374)
* \[[`b5bc597871`](https://github.com/nodejs/node/commit/b5bc597871)] - **doc**: GN 文件应使用 Node 的许可证 (Cheng Zhao) [#50694](https://github.com/nodejs/node/pull/50694)
* \[[`01a41041d6`](https://github.com/nodejs/node/commit/01a41041d6)] - **doc**: 改进 localWindowSize 事件描述 (Davy Landman) [#51071](https://github.com/nodejs/node/pull/51071)
* \[[`63aa27df10`](https://github.com/nodejs/node/commit/63aa27df10)] - **doc**: 将 `--jitless` 标记为实验性 (Antoine du Hamel) [#51247](https://github.com/nodejs/node/pull/51247)
* \[[`c8233912e9`](https://github.com/nodejs/node/commit/c8233912e9)] - **doc**: 运行 license-builder (github-actions\[bot]) [#51199](https://github.com/nodejs/node/pull/51199)
* \[[`9e360df521`](https://github.com/nodejs/node/commit/9e360df521)] - **doc**: 修复 pm 中的限制和已知问题 (Rafael Gonzaga) [#51184](https://github.com/nodejs/node/pull/51184)
* \[[`52d8222d32`](https://github.com/nodejs/node/commit/52d8222d32)] - **doc**: 在 Threat Model 中提到 node:wasi (Rafael Gonzaga) [#51211](https://github.com/nodejs/node/pull/51211)
* \[[`cb3270e4c8`](https://github.com/nodejs/node/commit/cb3270e4c8)] - **doc**: 移除模糊的“considered” (Rich Trott) [#51207](https://github.com/nodejs/node/pull/51207)
* \[[`979e183e0c`](https://github.com/nodejs/node/commit/979e183e0c)] - **doc**: 在自定义测试运行器示例中设置退出码 (Matteo Collina) [#51056](https://github.com/nodejs/node/pull/51056)
* \[[`eaadebb1f4`](https://github.com/nodejs/node/commit/eaadebb1f4)] - **doc**: 从 `maintaining-dependencies.md` 中移除版本号 (Antoine du Hamel) [#51195](https://github.com/nodejs/node/pull/51195)
* \[[`256db6e056`](https://github.com/nodejs/node/commit/256db6e056)] - **doc**: 提到 pm 中对原生 addon 的限制 (Rafael Gonzaga) [#51185](https://github.com/nodejs/node/pull/51185)
* \[[`2a61602ab2`](https://github.com/nodejs/node/commit/2a61602ab2)] - **doc**: 更正 stats.isDirectory 行为说明 (Nick Reilingh) [#50946](https://github.com/nodejs/node/pull/50946)
* \[[`184b8bea5b`](https://github.com/nodejs/node/commit/184b8bea5b)] - **doc**: 修复 `TestsStream` 的父类 (Jungku Lee) [#51181](https://github.com/nodejs/node/pull/51181)
* \[[`c61597ffe4`](https://github.com/nodejs/node/commit/c61597ffe4)] - **(SEMVER-MINOR)** **doc**: 为 --build-snapshot-config 添加文档 (Anna Henningsen) [#50453](https://github.com/nodejs/node/pull/50453)
* \[[`b88170d602`](https://github.com/nodejs/node/commit/b88170d602)] - **doc**: 运行 license-builder (github-actions\[bot]) [#51111](https://github.com/nodejs/node/pull/51111)
* \[[`f2b4626ab8`](https://github.com/nodejs/node/commit/f2b4626ab8)] - **doc**: 弃用 hash 构造函数 (Marco Ippolito) [#51077](https://github.com/nodejs/node/pull/51077)
* \[[`6c241550cd`](https://github.com/nodejs/node/commit/6c241550cd)] - **doc**: 添加关于 `--experimental-detect-module` 的说明 (Shubherthi Mitra) [#51089](https://github.com/nodejs/node/pull/51089)
* \[[`8ee30ea900`](https://github.com/nodejs/node/commit/8ee30ea900)] - **doc**: 更正 tracingChannel.traceCallback() (Gerhard Stöbich) [#51068](https://github.com/nodejs/node/pull/51068)
* \[[`1cd27b6eff`](https://github.com/nodejs/node/commit/1cd27b6eff)] - **doc**: 在 pbkdf2Key 中使用 length 参数 (Tobias Nießen) [#51066](https://github.com/nodejs/node/pull/51066)
* \[[`09ad974537`](https://github.com/nodejs/node/commit/09ad974537)] - **doc**: 为 `dirent.path` 添加弃用提示 (Antoine du Hamel) [#51059](https://github.com/nodejs/node/pull/51059)
* \[[`1113e58f87`](https://github.com/nodejs/node/commit/1113e58f87)] - **doc**: 弃用 `dirent.path` (Antoine du Hamel) [#51020](https://github.com/nodejs/node/pull/51020)
* \[[`37979d750e`](https://github.com/nodejs/node/commit/37979d750e)] - **doc**: 补充关于 `--input-type` 的更多细节 (Shubham Pandey) [#50796](https://github.com/nodejs/node/pull/50796)
* \[[`3ff00e1e79`](https://github.com/nodejs/node/commit/3ff00e1e79)] - **doc**: 添加当 CVE 未发布时的处理流程 (Rafael Gonzaga) [#50945](https://github.com/nodejs/node/pull/50945)
* \[[`0930be6bd5`](https://github.com/nodejs/node/commit/0930be6bd5)] - **doc**: 修复 esm 解析算法中的一些错误 (Christopher Jeffrey (JJ)) [#50898](https://github.com/nodejs/node/pull/50898)
* \[[`ddc7964b03`](https://github.com/nodejs/node/commit/ddc7964b03)] - **doc**: 为 Electron 29 预留 121 (Shelley Vohr) [#50957](https://github.com/nodejs/node/pull/50957)
* \[[`625fd69b76`](https://github.com/nodejs/node/commit/625fd69b76)] - **doc**: 运行 license-builder (github-actions\[bot]) [#50926](https://github.com/nodejs/node/pull/50926)
* \[[`f18269607a`](https://github.com/nodejs/node/commit/f18269607a)] - **doc**: 记录仅限 non-node\_modules 运行时的弃用 (Joyee Cheung) [#50748](https://github.com/nodejs/node/pull/50748)
* \[[`5f8e7a0fdb`](https://github.com/nodejs/node/commit/5f8e7a0fdb)] - **doc**: 添加 Unix 抽象套接字文档 (theanarkh) [#50904](https://github.com/nodejs/node/pull/50904)
* \[[`e0598787e0`](https://github.com/nodejs/node/commit/e0598787e0)] - **doc**: 移除深色主题下页面加载时的闪烁 (Dima Demakov) [#50942](https://github.com/nodejs/node/pull/50942)
* \[[`2a7047d933`](https://github.com/nodejs/node/commit/2a7047d933)] - **doc,crypto**: 进一步澄清 RSA\_PKCS1\_PADDING 支持 (Tobias Nießen) [#51799](https://github.com/nodejs/node/pull/51799)
* \[[`31c4ba4dfd`](https://github.com/nodejs/node/commit/31c4ba4dfd)] - **doc,crypto**: 添加变更日志并说明已禁用的 RSA\_PKCS1\_PADDING (Filip Skokan) [#51782](https://github.com/nodejs/node/pull/51782)
* \[[`90da41548f`](https://github.com/nodejs/node/commit/90da41548f)] - **doc,module**: 澄清 hook 链的执行顺序 (Jacob Smith) [#51884](https://github.com/nodejs/node/pull/51884)
* \[[`bb7d7f3d1c`](https://github.com/nodejs/node/commit/bb7d7f3d1c)] - **errors**: 修复 SystemError 的堆栈跟踪 (uzlopak) [#49956](https://github.com/nodejs/node/pull/49956)
* \[[`db7459b57b`](https://github.com/nodejs/node/commit/db7459b57b)] - **errors**: 改进 hideStackFrames (Aras Abbasi) [#49990](https://github.com/nodejs/node/pull/49990)
* \[[`a6b3569121`](https://github.com/nodejs/node/commit/a6b3569121)] - **esm**: 改进从 `data:` URL 调用 `import.meta.resolve` 时的错误信息 (Antoine du Hamel) [#49516](https://github.com/nodejs/node/pull/49516)
* \[[`38f4000905`](https://github.com/nodejs/node/commit/38f4000905)] - **esm**: 修复无效模块说明符的提示信息 (Antoine du Hamel) [#51223](https://github.com/nodejs/node/pull/51223)
* \[[`e39e37bbd5`](https://github.com/nodejs/node/commit/e39e37bbd5)] - **esm**: 修复错误消息中的 hook 名称 (Bruce MacNaughton) [#50466](https://github.com/nodejs/node/pull/50466)
* \[[`d9b5cd533c`](https://github.com/nodejs/node/commit/d9b5cd533c)] - **events**: 在 cancelBubble 中不调用 stopPropagation (mert.altin) [#50405](https://github.com/nodejs/node/pull/50405)
* \[[`287a02c4b2`](https://github.com/nodejs/node/commit/287a02c4b2)] - **fs**: 在 fs/promises 中懒加载 rimraf (Joyee Cheung) [#51617](https://github.com/nodejs/node/pull/51617)
* \[[`bbd1351ef0`](https://github.com/nodejs/node/commit/bbd1351ef0)] - **fs**: 移除 Linux 上递归 watch 的竞态条件 (Matteo Collina) [#51406](https://github.com/nodejs/node/pull/51406)
* \[[`1b7ccec5a7`](https://github.com/nodejs/node/commit/1b7ccec5a7)] - **fs**: 更新 `filehandle.createWriteStream` 和 `appendFile` 的 jsdoc (Jungku Lee) [#51494](https://github.com/nodejs/node/pull/51494)
* \[[`25056f5024`](https://github.com/nodejs/node/commit/25056f5024)] - **fs**: 修复 Windows 上长路径的 fs.promises.realpath (翠 / green) [#51032](https://github.com/nodejs/node/pull/51032)
* \[[`a8fd01a5a2`](https://github.com/nodejs/node/commit/a8fd01a5a2)] - **fs**: 使 fh.read() 中的 offset、position 和 length 参数可选 (Pulkit Gupta) [#51087](https://github.com/nodejs/node/pull/51087)
* \[[`721557c6d8`](https://github.com/nodejs/node/commit/721557c6d8)] - **fs**: 为 `readSync` 添加缺失的 jsdoc 参数 (Yagiz Nizipli) [#51225](https://github.com/nodejs/node/pull/51225)
* \[[`3ce9aacfcd`](https://github.com/nodejs/node/commit/3ce9aacfcd)] - **fs**: 移除 `internalModuleReadJSON` 绑定 (Yagiz Nizipli) [#51224](https://github.com/nodejs/node/pull/51224)
* \[[`65df2c6787`](https://github.com/nodejs/node/commit/65df2c6787)] - **fs**: 提升 buffer 前缀的 mkdtemp 性能 (Yagiz Nizipli) [#51078](https://github.com/nodejs/node/pull/51078)
* \[[`6705b48012`](https://github.com/nodejs/node/commit/6705b48012)] - **fs**: 在 c++ 中同步校验 fd (Yagiz Nizipli) [#51027](https://github.com/nodejs/node/pull/51027)
* \[[`afd5d67f89`](https://github.com/nodejs/node/commit/afd5d67f89)] - **fs**: 从 c++ 抛出 fchownSync 错误 (Yagiz Nizipli) [#51075](https://github.com/nodejs/node/pull/51075)
* \[[`bac982bce5`](https://github.com/nodejs/node/commit/bac982bce5)] - **fs**: 更新 createReadStream 和 createWriteStream 的 jsdoc 参数 (Jungku Lee) [#51063](https://github.com/nodejs/node/pull/51063)
* \[[`6764f0c9a8`](https://github.com/nodejs/node/commit/6764f0c9a8)] - **fs**: 改进 readvSync 的错误性能 (IlyasShabi) [#50100](https://github.com/nodejs/node/pull/50100)
* \[[`0225fce776`](https://github.com/nodejs/node/commit/0225fce776)] - **(SEMVER-MINOR)** **fs**: 引入 `dirent.parentPath` (Antoine du Hamel) [#50976](https://github.com/nodejs/node/pull/50976)
* \[[`4adea6c405`](https://github.com/nodejs/node/commit/4adea6c405)] - **fs,test**: 为 fs.watch 添加 URL 到字符串支持 (Rafael Gonzaga) [#51346](https://github.com/nodejs/node/pull/51346)
* \[[`6bf148e12b`](https://github.com/nodejs/node/commit/6bf148e12b)] - **http**: 修复 doc 与实现之间 `close` 返回值不一致的问题 (kylo5aby) [#51797](https://github.com/nodejs/node/pull/51797)
* \[[`66318602d0`](https://github.com/nodejs/node/commit/66318602d0)] - **http**: 使用 setHeaders 时拆分 set-cookie (Marco Ippolito) [#51649](https://github.com/nodejs/node/pull/51649)
* \[[`f7b53d05bd`](https://github.com/nodejs/node/commit/f7b53d05bd)] - **http**: 移除误导性的警告 (Luigi Pinca) [#51204](https://github.com/nodejs/node/pull/51204)
* \[[`9062d30600`](https://github.com/nodejs/node/commit/9062d30600)] - **http**: 不覆盖用户提供的 options 对象 (KuthorX) [#33633](https://github.com/nodejs/node/pull/33633)
* \[[`4e38dee4ee`](https://github.com/nodejs/node/commit/4e38dee4ee)] - **http**: 处理多值 content-disposition 头 (Arsalan Ahmad) [#50977](https://github.com/nodejs/node/pull/50977)
* \[[`b560bfbb84`](https://github.com/nodejs/node/commit/b560bfbb84)] - **http2**: 当 allowHTTP1 为 true 时关闭空闲连接 (xsbchen) [#51569](https://github.com/nodejs/node/pull/51569)
* \[[`5ba4d96525`](https://github.com/nodejs/node/commit/5ba4d96525)] - **(SEMVER-MINOR)** **http2**: 为 appendHeader 添加 h2 兼容支持 (Tim Perry) [#51412](https://github.com/nodejs/node/pull/51412)
* \[[`0861498e8b`](https://github.com/nodejs/node/commit/0861498e8b)] - **(SEMVER-MINOR)** **http2**: 添加服务器握手工具 (snek) [#51172](https://github.com/nodejs/node/pull/51172)
* \[[`6b08d006ee`](https://github.com/nodejs/node/commit/6b08d006ee)] - **(SEMVER-MINOR)** **http2**: 接收 customsettings (Marten Richter) [#51323](https://github.com/nodejs/node/pull/51323)
* \[[`23414a6120`](https://github.com/nodejs/node/commit/23414a6120)] - **http2**: 添加额外的 http/2 设置 (Marten Richter) [#49025](https://github.com/nodejs/node/pull/49025)
* \[[`3fe59ba224`](https://github.com/nodejs/node/commit/3fe59ba224)] - **inspector**: 添加 NodeRuntime.waitingForDebugger 事件 (mary marchini) [#51560](https://github.com/nodejs/node/pull/51560)
* \[[`44f05e0d30`](https://github.com/nodejs/node/commit/44f05e0d30)] - **lib**: 确保关闭 net server (theanarkh) [#51929](https://github.com/nodejs/node/pull/51929)
* \[[`3be5ff9c45`](https://github.com/nodejs/node/commit/3be5ff9c45)] - **lib**: 如果 udp socket 在 lookup 前关闭则直接返回 (theanarkh) [#51914](https://github.com/nodejs/node/pull/51914)
* \[[`dcbf88f4c7`](https://github.com/nodejs/node/commit/dcbf88f4c7)] - **lib**: 考虑快照序列化回调中的 cwd 访问 (Anna Henningsen) [#51901](https://github.com/nodejs/node/pull/51901)
* \[[`da8fa484f8`](https://github.com/nodejs/node/commit/da8fa484f8)] - **lib**: 修复 http 客户端 socket 路径 (theanarkh) [#51900](https://github.com/nodejs/node/pull/51900)
* \[[`55011d2c71`](https://github.com/nodejs/node/commit/55011d2c71)] - **lib**: 仅在需要时为内置模块构建 ESM 门面 (Joyee Cheung) [#51669](https://github.com/nodejs/node/pull/51669)
* \[[`7894989bf0`](https://github.com/nodejs/node/commit/7894989bf0)] - **(SEMVER-MINOR)** **lib**: 将 encodingsMap 移至 internal/util (Joyee Cheung) [#51044](https://github.com/nodejs/node/pull/51044)
* \[[`9082cc557d`](https://github.com/nodejs/node/commit/9082cc557d)] - **lib**: 在构建时不访问 process.noDeprecation (Joyee Cheung) [#51447](https://github.com/nodejs/node/pull/51447)
* \[[`6679e6b616`](https://github.com/nodejs/node/commit/6679e6b616)] - **lib**: 为用户 ESM 执行添加断言 (Joyee Cheung) [#51748](https://github.com/nodejs/node/pull/51748)
* \[[`d6e8d03afc`](https://github.com/nodejs/node/commit/d6e8d03afc)] - **lib**: 在快照构建时创建全局 console 属性 (Joyee Cheung) [#51700](https://github.com/nodejs/node/pull/51700)
* \[[`bd2a3c10ae`](https://github.com/nodejs/node/commit/bd2a3c10ae)] - **lib**: 在内置快照中定义 FormData、fetch 等 (Joyee Cheung) [#51598](https://github.com/nodejs/node/pull/51598)
* \[[`da79876ef0`](https://github.com/nodejs/node/commit/da79876ef0)] - **lib**: 允许在 afterEach 中检查测试结果 (Tim Stableford) [#51485](https://github.com/nodejs/node/pull/51485)
* \[[`bff7e3cf7a`](https://github.com/nodejs/node/commit/bff7e3cf7a)] - **lib**: 移除不必要的 refreshHrtimeBuffer() (Joyee Cheung) [#51446](https://github.com/nodejs/node/pull/51446)
* \[[`562947e012`](https://github.com/nodejs/node/commit/562947e012)] - **lib**: 修复 `--frozen-intrinsics` 与 `--jitless` 的配合使用 (Antoine du Hamel) [#51248](https://github.com/nodejs/node/pull/51248)
* \[[`7b83ef749e`](https://github.com/nodejs/node/commit/7b83ef749e)] - **lib**: 将函数声明移到循环外 (Sanjaiyan Parthipan) [#51242](https://github.com/nodejs/node/pull/51242)
* \[[`0a85b0fd9d`](https://github.com/nodejs/node/commit/0a85b0fd9d)] - **lib**: 降低 `SafePromiseAllSettledReturnVoid` 调用的开销 (Antoine du Hamel) [#51243](https://github.com/nodejs/node/pull/51243)
* \[[`f4d7f0498e`](https://github.com/nodejs/node/commit/f4d7f0498e)] - **lib**: 暴露默认的 prepareStackTrace (Chengzhong Wu) [#50827](https://github.com/nodejs/node/pull/50827)
* \[[`5c7a9c8d4a`](https://github.com/nodejs/node/commit/5c7a9c8d4a)] - **lib**: 不要将 Windows 驱动器字母解析为 scheme (华) [#50580](https://github.com/nodejs/node/pull/50580)
* \[[`9da6384f5a`](https://github.com/nodejs/node/commit/9da6384f5a)] - **lib**: 重构 diagnostics\_channel 中对 validateFunction 的使用 (Deokjin Kim) [#50955](https://github.com/nodejs/node/pull/50955)
* \[[`be3205ae24`](https://github.com/nodejs/node/commit/be3205ae24)] - **lib**: 简化 process.binding() 处理 (Joyee Cheung) [#50773](https://github.com/nodejs/node/pull/50773)
* \[[`f4987eb91e`](https://github.com/nodejs/node/commit/f4987eb91e)] - **lib,permission**: 处理 fs.symlink 中的 buffer (Rafael Gonzaga) [#51212](https://github.com/nodejs/node/pull/51212)
* \[[`861e040b40`](https://github.com/nodejs/node/commit/861e040b40)] - **lib,src**: 从模块中提取 sourceMappingURL (unbyte) [#51690](https://github.com/nodejs/node/pull/51690)
* \[[`8a082754e0`](https://github.com/nodejs/node/commit/8a082754e0)] - **lib,src**: 用 `toWellFormed()` 替换 toUSVString (Yagiz Nizipli) [#47342](https://github.com/nodejs/node/pull/47342)
* \[[`3badc1139c`](https://github.com/nodejs/node/commit/3badc1139c)] - **(SEMVER-MINOR)** **lib,src,permission**: 将 path.resolve 移植到 C++ (Rafael Gonzaga) [#50758](https://github.com/nodejs/node/pull/50758)
* \[[`4b3cc3ce18`](https://github.com/nodejs/node/commit/4b3cc3ce18)] - **loader**: 加快 moduleProvider 使用的行长度计算 (Mudit) [#50969](https://github.com/nodejs/node/pull/50969)
* \[[`960d67c51f`](https://github.com/nodejs/node/commit/960d67c51f)] - **meta**: 将 github/codeql-action 从 3.23.2 升级到 3.24.6 (dependabot\[bot]) [#51942](https://github.com/nodejs/node/pull/51942)
* \[[`1783b93af2`](https://github.com/nodejs/node/commit/1783b93af2)] - **meta**: 将 actions/upload-artifact 从 4.3.0 升级到 4.3.1 (dependabot\[bot]) [#51941](https://github.com/nodejs/node/pull/51941)
* \[[`1db603db2f`](https://github.com/nodejs/node/commit/1db603db2f)] - **meta**: 将 codecov/codecov-action 从 4.0.1 升级到 4.1.0 (dependabot\[bot]) [#51940](https://github.com/nodejs/node/pull/51940)
* \[[`2ddec64d5a`](https://github.com/nodejs/node/commit/2ddec64d5a)] - **meta**: 将 actions/cache 从 4.0.0 升级到 4.0.1 (dependabot\[bot]) [#51939](https://github.com/nodejs/node/pull/51939)
* \[[`92490421be`](https://github.com/nodejs/node/commit/92490421be)] - **meta**: 将 actions/download-artifact 从 4.1.1 升级到 4.1.3 (dependabot\[bot]) [#51938](https://github.com/nodejs/node/pull/51938)
* \[[`f3fa2b72b8`](https://github.com/nodejs/node/commit/f3fa2b72b8)] - **meta**: 将 actions/setup-node 从 4.0.1 升级到 4.0.2 (dependabot\[bot]) [#51937](https://github.com/nodejs/node/pull/51937)
* \[[`a62b042e83`](https://github.com/nodejs/node/commit/a62b042e83)] - **meta**: 将一名或多名协作者移至 emeritus (Node.js GitHub Bot) [#51726](https://github.com/nodejs/node/pull/51726)
* \[[`491f9f9902`](https://github.com/nodejs/node/commit/491f9f9902)] - **meta**: 将 codecov/codecov-action 从 3.1.4 升级到 4.0.1 (dependabot\[bot]) [#51648](https://github.com/nodejs/node/pull/51648)
* \[[`2765077a47`](https://github.com/nodejs/node/commit/2765077a47)] - **meta**: 将 actions/download-artifact 从 4.1.0 升级到 4.1.1 (dependabot\[bot]) [#51644](https://github.com/nodejs/node/pull/51644)
* \[[`152a07b854`](https://github.com/nodejs/node/commit/152a07b854)] - **meta**: 将 actions/upload-artifact 从 4.0.0 升级到 4.3.0 (dependabot\[bot]) [#51643](https://github.com/nodejs/node/pull/51643)
* \[[`53826920fb`](https://github.com/nodejs/node/commit/53826920fb)] - **meta**: 将 step-security/harden-runner 从 2.6.1 升级到 2.7.0 (dependabot\[bot]) [#51641](https://github.com/nodejs/node/pull/51641)
* \[[`3d1dc9b030`](https://github.com/nodejs/node/commit/3d1dc9b030)] - **meta**: 将 actions/cache 从 3.3.2 升级到 4.0.0 (dependabot\[bot]) [#51640](https://github.com/nodejs/node/pull/51640)
* \[[`287bdf6bda`](https://github.com/nodejs/node/commit/287bdf6bda)] - **meta**: 将 github/codeql-action 从 3.22.12 升级到 3.23.2 (dependabot\[bot]) [#51639](https://github.com/nodejs/node/pull/51639)
* \[[`90068fb0f1`](https://github.com/nodejs/node/commit/90068fb0f1)] - **meta**: 为 lemire 添加 .mailmap 条目 (Daniel Lemire) [#51600](https://github.com/nodejs/node/pull/51600)
* \[[`f91786bd70`](https://github.com/nodejs/node/commit/f91786bd70)] - **meta**: 将 security-wg 设为 deps 文件夹的 codeowner (Marco Ippolito) [#51529](https://github.com/nodejs/node/pull/51529)
* \[[`e51221be8d`](https://github.com/nodejs/node/commit/e51221be8d)] - **meta**: 将一名或多名协作者移至 emeritus (Node.js GitHub Bot) [#51468](https://github.com/nodejs/node/pull/51468)
* \[[`4a8a012c6d`](https://github.com/nodejs/node/commit/4a8a012c6d)] - **meta**: 将 RaisinTen 移至 emeritus 并移出战略计划 (Darshan Sen) [#51411](https://github.com/nodejs/node/pull/51411)
* \[[`e9276bab3f`](https://github.com/nodejs/node/commit/e9276bab3f)] - **meta**: 添加 .temp 和 .lock 标签到忽略列表 (Rafael Gonzaga) [#51343](https://github.com/nodejs/node/pull/51343)
* \[[`ae6fecbc8d`](https://github.com/nodejs/node/commit/ae6fecbc8d)] - **meta**: 将 actions/setup-python 从 4.7.1 升级到 5.0.0 (dependabot\[bot]) [#51335](https://github.com/nodejs/node/pull/51335)
* \[[`f4be49a618`](https://github.com/nodejs/node/commit/f4be49a618)] - **meta**: 将 actions/setup-node 从 4.0.0 升级到 4.0.1 (dependabot\[bot]) [#51334](https://github.com/nodejs/node/pull/51334)
* \[[`e24aa7ced1`](https://github.com/nodejs/node/commit/e24aa7ced1)] - **meta**: 将 github/codeql-action 从 2.22.8 升级到 3.22.12 (dependabot\[bot]) [#51333](https://github.com/nodejs/node/pull/51333)
* \[[`287c2bcf56`](https://github.com/nodejs/node/commit/287c2bcf56)] - **meta**: 将 actions/stale 从 8.0.0 升级到 9.0.0 (dependabot\[bot]) [#51332](https://github.com/nodejs/node/pull/51332)
* \[[`1cad0dfaff`](https://github.com/nodejs/node/commit/1cad0dfaff)] - **meta**: 将一名或多名协作者移至 emeritus (Node.js GitHub Bot) [#51329](https://github.com/nodejs/node/pull/51329)
* \[[`eef64b782e`](https://github.com/nodejs/node/commit/eef64b782e)] - **meta**: 在 SECURITY.md 变更时通知 tsc (Rafael Gonzaga) [#51259](https://github.com/nodejs/node/pull/51259)
* \[[`95a880f728`](https://github.com/nodejs/node/commit/95a880f728)] - **meta**: 将 artifact actions 更新到 v4 (Michaël Zasso) [#51219](https://github.com/nodejs/node/pull/51219)
* \[[`59805f6879`](https://github.com/nodejs/node/commit/59805f6879)] - **meta**: 将 step-security/harden-runner 从 2.6.0 升级到 2.6.1 (dependabot\[bot]) [#50999](https://github.com/nodejs/node/pull/50999)
* \[[`d74e0b97c3`](https://github.com/nodejs/node/commit/d74e0b97c3)] - **meta**: 将 github/codeql-action 从 2.22.5 升级到 2.22.8 (dependabot\[bot]) [#50998](https://github.com/nodejs/node/pull/50998)
* \[[`91cd9183d1`](https://github.com/nodejs/node/commit/91cd9183d1)] - **meta**: 将一名或多名协作者移至 emeritus (Node.js GitHub Bot) [#50931](https://github.com/nodejs/node/pull/50931)
* \[[`c621491aba`](https://github.com/nodejs/node/commit/c621491aba)] - **module**: 修复内置模块导出 `default` 键时的崩溃 (Antoine du Hamel) [#51481](https://github.com/nodejs/node/pull/51481)
* \[[`43a8d3e984`](https://github.com/nodejs/node/commit/43a8d3e984)] - **module**: 修复 `--preserve-symlinks-main` (per4uk) [#51312](https://github.com/nodejs/node/pull/51312)
* \[[`d8da197f86`](https://github.com/nodejs/node/commit/d8da197f86)] - **module**: 将 CJS exports 缓存移至 internal/modules/cjs/loader (Joyee Cheung) [#51157](https://github.com/nodejs/node/pull/51157)
* \[[`5fc10ca4d6`](https://github.com/nodejs/node/commit/5fc10ca4d6)] - **module**: 在 `commonjs` 翻译器中加载 source map (Hiroki Osame) [#51033](https://github.com/nodejs/node/pull/51033)
* \[[`43e9f0bc65`](https://github.com/nodejs/node/commit/43e9f0bc65)] - **module**: 在 register 选项中记录 `parentURL` (Hiroki Osame) [#51039](https://github.com/nodejs/node/pull/51039)
* \[[`870ef5a73f`](https://github.com/nodejs/node/commit/870ef5a73f)] - **net**: 修复在 lookup 处理器中调用 destroy 时的 connect 崩溃 (theanarkh) [#51826](https://github.com/nodejs/node/pull/51826)
* \[[`caf71e05a6`](https://github.com/nodejs/node/commit/caf71e05a6)] - **net**: 修复 dns 文档中的 IPv4 示例 (Aras Abbasi) [#51377](https://github.com/nodejs/node/pull/51377)
* \[[`58a636be0e`](https://github.com/nodejs/node/commit/58a636be0e)] - **(SEMVER-MINOR)** **net**: 添加连接尝试事件 (Paolo Insogna) [#51045](https://github.com/nodejs/node/pull/51045)
* \[[`06a29f830a`](https://github.com/nodejs/node/commit/06a29f830a)] - **node-api**: 使 napi\_get\_buffer\_info 检查传入的 buffer 是否有效 (Janrupf) [#51571](https://github.com/nodejs/node/pull/51571)
* \[[`0fb98438e4`](https://github.com/nodejs/node/commit/0fb98438e4)] - **node-api**: 将 NAPI\_EXPERIMENTAL 定义移至 gyp 文件 (Gabriel Schulhof) [#51254](https://github.com/nodejs/node/pull/51254)
* \[[`242139fb98`](https://github.com/nodejs/node/commit/242139fb98)] - **node-api**: 优化 napi\_set\_property 以提升性能 (Mert Can Altın) [#50282](https://github.com/nodejs/node/pull/50282)
* \[[`dc3d70c040`](https://github.com/nodejs/node/commit/dc3d70c040)] - **node-api**: 在不使用 v8::Private 的情况下为外部值打类型标签 (Chengzhong Wu) [#51149](https://github.com/nodejs/node/pull/51149)
* \[[`0ac070ccb7`](https://github.com/nodejs/node/commit/0ac070ccb7)] - **node-api**: 通过类型系统将 nogc API 与其余 API 分离 (Gabriel Schulhof) [#50060](https://github.com/nodejs/node/pull/50060)
* \[[`de65cada70`](https://github.com/nodejs/node/commit/de65cada70)] - **node-api**: 引入实验性特性标志 (Gabriel Schulhof) [#50991](https://github.com/nodejs/node/pull/50991)
* \[[`e192ba18cd`](https://github.com/nodejs/node/commit/e192ba18cd)] - **perf\_hooks**: 改进 performance milestone 的 time origin 时间戳 (IlyasShabi) [#51713](https://github.com/nodejs/node/pull/51713)
* \[[`f94336f95a`](https://github.com/nodejs/node/commit/f94336f95a)] - **repl**: 修复忽略 `NO_COLORS` 环境变量的问题 (Moshe Atlow) [#51568](https://github.com/nodejs/node/pull/51568)
* \[[`e08649caa0`](https://github.com/nodejs/node/commit/e08649caa0)] - **repl**: 修复 prepareStackTrace 的 frames 数组顺序 (Chengzhong Wu) [#50827](https://github.com/nodejs/node/pull/50827)
* \[[`07614072f1`](https://github.com/nodejs/node/commit/07614072f1)] - **sea**: 更新稳定性索引 (Joyee Cheung) [#51774](https://github.com/nodejs/node/pull/51774)
* \[[`eea0d74454`](https://github.com/nodejs/node/commit/eea0d74454)] - **(SEMVER-MINOR)** **sea**: 支持 sea.getRawAsset() (Joyee Cheung) [#50960](https://github.com/nodejs/node/pull/50960)
* \[[`db0efa3f40`](https://github.com/nodejs/node/commit/db0efa3f40)] - **(SEMVER-MINOR)** **sea**: 支持嵌入资源 (Joyee Cheung) [#50960](https://github.com/nodejs/node/pull/50960)
* \[[`9b164c6eec`](https://github.com/nodejs/node/commit/9b164c6eec)] - **src**: 修复 --disable-single-executable-application (Joyee Cheung) [#51808](https://github.com/nodejs/node/pull/51808)
* \[[`306c1d35e5`](https://github.com/nodejs/node/commit/306c1d35e5)] - **src**: 简化在 C++ 端直接查询环境变量 (Joyee Cheung) [#51829](https://github.com/nodejs/node/pull/51829)
* \[[`696063a47c`](https://github.com/nodejs/node/commit/696063a47c)] - **src**: 在快照序列化前停止 profiler 和 inspector (Joyee Cheung) [#51815](https://github.com/nodejs/node/pull/51815)
* \[[`be40c8286c`](https://github.com/nodejs/node/commit/be40c8286c)] - **src**: 简化 embedder 入口点执行 (Joyee Cheung) [#51557](https://github.com/nodejs/node/pull/51557)
* \[[`90391ff256`](https://github.com/nodejs/node/commit/90391ff256)] - **src**: 在快照构建器中提前编译代码 (Joyee Cheung) [#51672](https://github.com/nodejs/node/pull/51672)
* \[[`3875fa1dc5`](https://github.com/nodejs/node/commit/3875fa1dc5)] - **src**: 在访问字符串前检查是否为空 (Cheng Zhao) [#51665](https://github.com/nodejs/node/pull/51665)
* \[[`a58c98ea85`](https://github.com/nodejs/node/commit/a58c98ea85)] - **(SEMVER-MINOR)** **src**: 在 BlobDeserializer 中更好地打印字符串内容 (Joyee Cheung) [#50960](https://github.com/nodejs/node/pull/50960)
* \[[`62707a9d27`](https://github.com/nodejs/node/commit/62707a9d27)] - **src**: 修复 configurable globalThis 的 vm bug (F. Hinkelmann) [#51602](https://github.com/nodejs/node/pull/51602)
* \[[`c3c0a3ee5c`](https://github.com/nodejs/node/commit/c3c0a3ee5c)] - **(SEMVER-MINOR)** **src**: 支持 .env 文件的多行值 (IlyasShabi) [#51289](https://github.com/nodejs/node/pull/51289)
* \[[`dc8fe9ebf4`](https://github.com/nodejs/node/commit/dc8fe9ebf4)] - **(SEMVER-MINOR)** **src**: 添加 `process.loadEnvFile` 和 `util.parseEnv` (Yagiz Nizipli) [#51476](https://github.com/nodejs/node/pull/51476)
* \[[`a5afad2a4d`](https://github.com/nodejs/node/commit/a5afad2a4d)] - **src**: 正确终止环境变量中的双引号 (Marco Ippolito) [#51510](https://github.com/nodejs/node/pull/51510)
* \[[`2a921966c6`](https://github.com/nodejs/node/commit/2a921966c6)] - **(SEMVER-MINOR)** **src**: 不要对 dotenv 路径进行强制转换 (Tobias Nießen) [#51425](https://github.com/nodejs/node/pull/51425)
* \[[`50ec55c268`](https://github.com/nodejs/node/commit/50ec55c268)] - **src**: 重构 `GetCreationContext` 调用 (Jungku Lee) [#51367](https://github.com/nodejs/node/pull/51367)
* \[[`2e65389922`](https://github.com/nodejs/node/commit/2e65389922)] - **src**: 不要越界读取字符串 (Cheng Zhao) [#51358](https://github.com/nodejs/node/pull/51358)
* \[[`a653531089`](https://github.com/nodejs/node/commit/a653531089)] - **src**: 避免 fs\_permission 中的字符串遮蔽 (Shelley Vohr) [#51123](https://github.com/nodejs/node/pull/51123)
* \[[`c190a057ff`](https://github.com/nodejs/node/commit/c190a057ff)] - **src**: 避免在 FreeEnvironment 时清空平台任务 (Chengzhong Wu) [#51290](https://github.com/nodejs/node/pull/51290)
* \[[`00227674f5`](https://github.com/nodejs/node/commit/00227674f5)] - **src**: 为 Histogram 添加快速 API (James M Snell) [#51296](https://github.com/nodejs/node/pull/51296)
* \[[`4733c8e4df`](https://github.com/nodejs/node/commit/4733c8e4df)] - **src**: 重构 `GetCreationContext` 调用 (Yagiz Nizipli) [#51287](https://github.com/nodejs/node/pull/51287)
* \[[`d76e16bb47`](https://github.com/nodejs/node/commit/d76e16bb47)] - **src**: 在销毁 IsolateData 前进入 isolate (Ben Noordhuis) [#51138](https://github.com/nodejs/node/pull/51138)
* \[[`4ffdd37d2c`](https://github.com/nodejs/node/commit/4ffdd37d2c)] - **src**: 消除 histogram.cc 中的重复代码 (James M Snell) [#51263](https://github.com/nodejs/node/pull/51263)
* \[[`2ce8b974a0`](https://github.com/nodejs/node/commit/2ce8b974a0)] - **src**: 修复 trace event 的 Unix 抽象套接字路径 (theanarkh) [#50858](https://github.com/nodejs/node/pull/50858)
* \[[`9b25268cb8`](https://github.com/nodejs/node/commit/9b25268cb8)] - **src**: 使用 BignumPointer 并使用 BN\_clear\_free (James M Snell) [#50454](https://github.com/nodejs/node/pull/50454)
* \[[`a80f660343`](https://github.com/nodejs/node/commit/a80f660343)] - **src**: 使用 simdutf::utf8\_length\_from\_latin1 实现 FastByteLengthUtf8 (Daniel Lemire) [#50840](https://github.com/nodejs/node/pull/50840)
* \[[`0dee86f295`](https://github.com/nodejs/node/commit/0dee86f295)] - **(SEMVER-MINOR)** **src**: 支持可配置快照 (Joyee Cheung) [#50453](https://github.com/nodejs/node/pull/50453)
* \[[`90b5ed1d1d`](https://github.com/nodejs/node/commit/90b5ed1d1d)] - **src**: 实现 countObjectsWithPrototype (Joyee Cheung) [#50572](https://github.com/nodejs/node/pull/50572)
* \[[`9365e129ed`](https://github.com/nodejs/node/commit/9365e129ed)] - **src**: 注册 udp\_wrap 外部引用 (Joyee Cheung) [#50943](https://github.com/nodejs/node/pull/50943)
* \[[`b05d496b6c`](https://github.com/nodejs/node/commit/b05d496b6c)] - **src**: 注册 spawn\_sync 外部引用 (Joyee Cheung) [#50943](https://github.com/nodejs/node/pull/50943)
* \[[`642fb44982`](https://github.com/nodejs/node/commit/642fb44982)] - **src**: 注册 process\_wrap 外部引用 (Joyee Cheung) [#50943](https://github.com/nodejs/node/pull/50943)
* \[[`c7c9e81a1a`](https://github.com/nodejs/node/commit/c7c9e81a1a)] - **src**: 修复 coverity 报告的双重释放问题 (Michael Dawson) [#51046](https://github.com/nodejs/node/pull/51046)
* \[[`358793e28e`](https://github.com/nodejs/node/commit/358793e28e)] - **src**: 移除 `node_file.cc` 中未使用的头文件 (Jungku Lee) [#50927](https://github.com/nodejs/node/pull/50927)
* \[[`c705b73a74`](https://github.com/nodejs/node/commit/c705b73a74)] - **src**: 实现 --trace-promises (Joyee Cheung) [#50899](https://github.com/nodejs/node/pull/50899)
* \[[`97aa67f006`](https://github.com/nodejs/node/commit/97aa67f006)] - **src**: 修复动态链接的 zlib 版本 (Richard Lau) [#51007](https://github.com/nodejs/node/pull/51007)
* \[[`d6f46a44f2`](https://github.com/nodejs/node/commit/d6f46a44f2)] - **src**: 使 ModifyCodeGenerationFromStrings 更健壮 (Joyee Cheung) [#50763](https://github.com/nodejs/node/pull/50763)
* \[[`362135a1f9`](https://github.com/nodejs/node/commit/362135a1f9)] - **src**: 在 ESM 语法检测中禁用未捕获异常中止 (Yagiz Nizipli) [#50987](https://github.com/nodejs/node/pull/50987)
* \[[`d82b0d4320`](https://github.com/nodejs/node/commit/d82b0d4320)] - **src**: 修复带有 tail \[\[noreturn]] abort 的回溯 (Chengzhong Wu) [#50849](https://github.com/nodejs/node/pull/50849)
* \[[`6df3e31bff`](https://github.com/nodejs/node/commit/6df3e31bff)] - **src**: 将 MKSNAPSHOT 调试日志打印到 stderr (Joyee Cheung) [#50759](https://github.com/nodejs/node/pull/50759)
* \[[`fd5efac176`](https://github.com/nodejs/node/commit/fd5efac176)] - **(SEMVER-MINOR)** **src,permission**: 添加 --allow-addon 标志 (Rafael Gonzaga) [#51183](https://github.com/nodejs/node/pull/51183)
* \[[`b616f6fa06`](https://github.com/nodejs/node/commit/b616f6fa06)] - **src,stream**: 改进 WriteString (ywave620) [#51155](https://github.com/nodejs/node/pull/51155)
* \[[`16d8cd5b22`](https://github.com/nodejs/node/commit/16d8cd5b22)] - **stream**: 不要延迟一个 microtick 才构造 (Matteo Collina) [#52005](https://github.com/nodejs/node/pull/52005)
* \[[`7931c3bbc8`](https://github.com/nodejs/node/commit/7931c3bbc8)] - **stream**: 修复 eventNames() 不应返回未定义事件的问题 (IlyasShabi) [#51331](https://github.com/nodejs/node/pull/51331)
* \[[`d0a6f3515d`](https://github.com/nodejs/node/commit/d0a6f3515d)] - **stream**: 修复克隆后的 webstreams 未正确 unref 的问题 (tsctx) [#51526](https://github.com/nodejs/node/pull/51526)
* \[[`8750070a47`](https://github.com/nodejs/node/commit/8750070a47)] - **stream**: 修复调用 clearBuffer 时 fd 为空的问题 (kylo5aby) [#50994](https://github.com/nodejs/node/pull/50994)
* \[[`ade6614067`](https://github.com/nodejs/node/commit/ade6614067)] - **(SEMVER-MINOR)** **stream**: 为 webstreams compression 添加对 `deflate-raw` 格式的支持 (Damian Krzeminski) [#50097](https://github.com/nodejs/node/pull/50097)
* \[[`905c48fc6e`](https://github.com/nodejs/node/commit/905c48fc6e)] - **test**: 为 test\_runner after hook 添加回归测试 (Colin Ihrig) [#51998](https://github.com/nodejs/node/pull/51998)
* \[[`60f008b65e`](https://github.com/nodejs/node/commit/60f008b65e)] - **test**: 降低 `test-runner-output` 的不稳定性 (Antoine du Hamel) [#51952](https://github.com/nodejs/node/pull/51952)
* \[[`0ad88f6a5c`](https://github.com/nodejs/node/commit/0ad88f6a5c)] - **test**: 修复 flaky 的 http-chunk-extensions-limit 测试 (Ethan Arrowood) [#51943](https://github.com/nodejs/node/pull/51943)
* \[[`3f85c7ac97`](https://github.com/nodejs/node/commit/3f85c7ac97)] - **test**: 移除 flaky 标记 (Luigi Pinca) [#51736](https://github.com/nodejs/node/pull/51736)
* \[[`f37648ee5c`](https://github.com/nodejs/node/commit/f37648ee5c)] - **test**: 当 SEA 生成失败时跳过 SEA 测试 (Joyee Cheung) [#51887](https://github.com/nodejs/node/pull/51887)
* \[[`136b6a998b`](https://github.com/nodejs/node/commit/136b6a998b)] - **test**: 修复 js-native-api/test\_cannot\_run\_js 中不可靠的假设 (Joyee Cheung) [#51898](https://github.com/nodejs/node/pull/51898)
* \[[`d90594aefa`](https://github.com/nodejs/node/commit/d90594aefa)] - **test**: 去除 test-http2-large-write-multiple-requests 的 flaky 问题 (Joyee Cheung) [#51863](https://github.com/nodejs/node/pull/51863)
* \[[`a0b36e33d1`](https://github.com/nodejs/node/commit/a0b36e33d1)] - **test**: 修复 test-debugger-profile 以适配覆盖率生成 (Joyee Cheung) [#51816](https://github.com/nodejs/node/pull/51816)
* \[[`dd0f164ca3`](https://github.com/nodejs/node/commit/dd0f164ca3)] - **test**: 修复 test-bootstrap-modules 以适配覆盖率生成 (Joyee Cheung) [#51816](https://github.com/nodejs/node/pull/51816)
* \[[`e4c7d62496`](https://github.com/nodejs/node/commit/e4c7d62496)] - **test**: 确保递归 fs watch 测试中的延迟 (Joyee Cheung) [#51842](https://github.com/nodejs/node/pull/51842)
* \[[`963d7d7dea`](https://github.com/nodejs/node/commit/963d7d7dea)] - **test**: 修复 test-child-process-fork-net (Joyee Cheung) [#51841](https://github.com/nodejs/node/pull/51841)
* \[[`dd708d337e`](https://github.com/nodejs/node/commit/dd708d337e)] - **test**: 拆分 wasi 测试 (Joyee Cheung) [#51836](https://github.com/nodejs/node/pull/51836)
* \[[`853b48d905`](https://github.com/nodejs/node/commit/853b48d905)] - **test**: 移除 test-fs-stat-bigint 的 flaky 标记 (Luigi Pinca) [#51735](https://github.com/nodejs/node/pull/51735)
* \[[`fdc7d751de`](https://github.com/nodejs/node/commit/fdc7d751de)] - **test**: 在 loong64 上跳过 test-http-correct-hostname (Shi Pujin) [#51663](https://github.com/nodejs/node/pull/51663)
* \[[`c33f860d2b`](https://github.com/nodejs/node/commit/c33f860d2b)] - **test**: 移除 test-cli-node-options 的 flaky 标记 (Luigi Pinca) [#51716](https://github.com/nodejs/node/pull/51716)
* \[[`f528e965f6`](https://github.com/nodejs/node/commit/f528e965f6)] - **test**: 移除 test-domain-error-types 的 flaky 标记 (Luigi Pinca) [#51717](https://github.com/nodejs/node/pull/51717)
* \[[`7e3ee828f1`](https://github.com/nodejs/node/commit/7e3ee828f1)] - **test**: 修复 `internet/test-inspector-help-page` (Richard Lau) [#51693](https://github.com/nodejs/node/pull/51693)
* \[[`170278c25d`](https://github.com/nodejs/node/commit/170278c25d)] - **test**: 移除 flaky 测试的重复条目 (Luigi Pinca) [#51654](https://github.com/nodejs/node/pull/51654)
* \[[`d0d5bd0e54`](https://github.com/nodejs/node/commit/d0d5bd0e54)] - **test**: 移除 test-crypto-keygen 的 flaky 标记 (Luigi Pinca) [#51567](https://github.com/nodejs/node/pull/51567)
* \[[`bca6dcca0b`](https://github.com/nodejs/node/commit/bca6dcca0b)] - **test**: 移除 test-fs-rmdir-recursive 的 flaky 标记 (Luigi Pinca) [#51566](https://github.com/nodejs/node/pull/51566)
* \[[`af3f229d6b`](https://github.com/nodejs/node/commit/af3f229d6b)] - **test**: 移除 asserts 的 common.expectsError 调用 (Paulo Chaves) [#51504](https://github.com/nodejs/node/pull/51504)
* \[[`f6fcd200e6`](https://github.com/nodejs/node/commit/f6fcd200e6)] - **test**: 将 test-http2-large-file 标记为 flaky (Michaël Zasso) [#51549](https://github.com/nodejs/node/pull/51549)
* \[[`1d8e65a230`](https://github.com/nodejs/node/commit/1d8e65a230)] - **test**: 在 SourceTextModule 内存泄漏测试中使用 checkIfCollectableByCounting (Joyee Cheung) [#51512](https://github.com/nodejs/node/pull/51512)
* \[[`713afed6b0`](https://github.com/nodejs/node/commit/713afed6b0)] - **test**: 移除 test-file-write-stream4 的 flaky 标记 (Luigi Pinca) [#51472](https://github.com/nodejs/node/pull/51472)
* \[[`292d0174df`](https://github.com/nodejs/node/commit/292d0174df)] - **test**: 为 fs-write 添加 URL 测试 (Rafael Gonzaga) [#51352](https://github.com/nodejs/node/pull/51352)
* \[[`954e2f2f58`](https://github.com/nodejs/node/commit/954e2f2f58)] - **test**: 移除 asserts 中不需要的 common.expectsError (Andrés Morelos) [#51353](https://github.com/nodejs/node/pull/51353)
* \[[`f2dfe0fa80`](https://github.com/nodejs/node/commit/f2dfe0fa80)] - **test**: 为 51586 添加回归测试 (Matteo Collina) [#51491](https://github.com/nodejs/node/pull/51491)
* \[[`6ee5f50789`](https://github.com/nodejs/node/commit/6ee5f50789)] - **test**: 修复 ppc64 SEA 测试的 flaky 条件 (Richard Lau) [#51422](https://github.com/nodejs/node/pull/51422)
* \[[`06a6eef9a4`](https://github.com/nodejs/node/commit/06a6eef9a4)] - **test**: 用 for...of 替换 forEach() (Alexander Jones) [#50608](https://github.com/nodejs/node/pull/50608)
* \[[`a98102a6de`](https://github.com/nodejs/node/commit/a98102a6de)] - **test**: 用 for...of 替换 forEach (Ospite Privilegiato) [#50787](https://github.com/nodejs/node/pull/50787)
* \[[`e9080a94d3`](https://github.com/nodejs/node/commit/e9080a94d3)] - **test**: 用 for of 替换 foreach (lucacapocci94-dev) [#50790](https://github.com/nodejs/node/pull/50790)
* \[[`42b162b06d`](https://github.com/nodejs/node/commit/42b162b06d)] - **test**: 用 for...of 替换 forEach() (Jia) [#50610](https://github.com/nodejs/node/pull/50610)
* \[[`cab7737f7e`](https://github.com/nodejs/node/commit/cab7737f7e)] - **test**: 修复 `test-fs-readfile-tostring-fail` 中写入大小不一致的问题 (Jungku Lee) [#51141](https://github.com/nodejs/node/pull/51141)
* \[[`15731b4b2f`](https://github.com/nodejs/node/commit/15731b4b2f)] - **test**: 替换 test-http-server-multiheaders2 中的 forEach (Marco Mac) [#50794](https://github.com/nodejs/node/pull/50794)
* \[[`9cedaa62fa`](https://github.com/nodejs/node/commit/9cedaa62fa)] - **test**: 在 test-webcrypto-export-import-ec 中用 for...of 替换 forEach (Chiara Ricciardi) [#51249](https://github.com/nodejs/node/pull/51249)
* \[[`7f301e04be`](https://github.com/nodejs/node/commit/7f301e04be)] - **test**: 在 test-http-hostname-typechecking.js 中改用 for of 循环 (Luca Del Puppo) [#50782](https://github.com/nodejs/node/pull/50782)
* \[[`6e62e649df`](https://github.com/nodejs/node/commit/6e62e649df)] - **test**: 在 arm 上跳过 test-watch-mode-inspect (Michael Dawson) [#51210](https://github.com/nodejs/node/pull/51210)
* \[[`c3c2b2b041`](https://github.com/nodejs/node/commit/c3c2b2b041)] - **test**: 在文件 test-trace-events-net.js 中用 for...of 替换 forEach (Ianna83) [#50789](https://github.com/nodejs/node/pull/50789)
* \[[`55c423ba4f`](https://github.com/nodejs/node/commit/55c423ba4f)] - **test**: 在 test/parallel/test-util-log.js 中用 for...of 替换 forEach() (Edoardo Dusi) [#50783](https://github.com/nodejs/node/pull/50783)
* \[[`8ac05cf3c4`](https://github.com/nodejs/node/commit/8ac05cf3c4)] - **test**: 在 test-trace-events-api.js 中用 for...of 替换 forEach (Andrea Pavone) [#50784](https://github.com/nodejs/node/pull/50784)
* \[[`d10d39e8ba`](https://github.com/nodejs/node/commit/d10d39e8ba)] - **test**: 在 test-v8-serders.js 中用 for...of 替换 forEach (Mattia Iannone) [#50791](https://github.com/nodejs/node/pull/50791)
* \[[`576adc5e5b`](https://github.com/nodejs/node/commit/576adc5e5b)] - **test**: 为 pm 中的 fs-read 添加 URL 测试 (Rafael Gonzaga) [#51213](https://github.com/nodejs/node/pull/51213)
* \[[`996cef51b7`](https://github.com/nodejs/node/commit/996cef51b7)] - **test**: 在 test-esm-loader-resolve-type.mjs 中使用 tmpdir.refresh() (Luigi Pinca) [#51206](https://github.com/nodejs/node/pull/51206)
* \[[`8f2d982342`](https://github.com/nodejs/node/commit/8f2d982342)] - **test**: 在 test-esm-json.mjs 中使用 tmpdir.refresh() (Luigi Pinca) [#51205](https://github.com/nodejs/node/pull/51205)
* \[[`efd6630143`](https://github.com/nodejs/node/commit/efd6630143)] - **test**: 修复 worker\*.test-free-called 的不稳定性 (Jithil P Ponnan) [#51013](https://github.com/nodejs/node/pull/51013)
* \[[`54a29ee506`](https://github.com/nodejs/node/commit/54a29ee506)] - **test**: 去除 test-diagnostics-channel-memory-leak 的 flaky 问题 (Joyee Cheung) [#50572](https://github.com/nodejs/node/pull/50572)
* \[[`6319ea6183`](https://github.com/nodejs/node/commit/6319ea6183)] - **test**: 在快照中测试 child\_process 的同步方法 (Joyee Cheung) [#50943](https://github.com/nodejs/node/pull/50943)
* \[[`50df4aee2b`](https://github.com/nodejs/node/commit/50df4aee2b)] - **test**: 处理相对的 https 重定向 (Richard Lau) [#51121](https://github.com/nodejs/node/pull/51121)
* \[[`9f88f40cae`](https://github.com/nodejs/node/commit/9f88f40cae)] - **test**: 修复测试运行器彩色输出测试 (Moshe Atlow) [#51064](https://github.com/nodejs/node/pull/51064)
* \[[`a1feae24cb`](https://github.com/nodejs/node/commit/a1feae24cb)] - **test**: 正确解析 embedtest 二进制文件路径 (Cheng Zhao) [#50276](https://github.com/nodejs/node/pull/50276)
* \[[`a4f1805c92`](https://github.com/nodejs/node/commit/a4f1805c92)] - **test**: 在正则表达式中转义 cwd (Jérémy Lal) [#50980](https://github.com/nodejs/node/pull/50980)
* \[[`1c28db8116`](https://github.com/nodejs/node/commit/1c28db8116)] - **test**: 在 test-webcrypto-export-import-cfrg.js 中将 forEach 替换为 for.. (Angelo Parziale) [#50785](https://github.com/nodejs/node/pull/50785)
* \[[`a4f505213e`](https://github.com/nodejs/node/commit/a4f505213e)] - **test**: 在 SEA 测试中记录更多信息 (Joyee Cheung) [#50759](https://github.com/nodejs/node/pull/50759)
* \[[`c91b817a5c`](https://github.com/nodejs/node/commit/c91b817a5c)] - **test**: 在测试中整合 utf8 文本 fixtures (Joyee Cheung) [#50732](https://github.com/nodejs/node/pull/50732)
* \[[`26a06b093b`](https://github.com/nodejs/node/commit/26a06b093b)] - **test**: 给 test-shadow-realm-gc-\* 中的 GC 更多时间 (Joyee Cheung) [#50735](https://github.com/nodejs/node/pull/50735)
* \[[`e8f5735149`](https://github.com/nodejs/node/commit/e8f5735149)] - **test**: 在 Windows 上测试代理对字符文件名 (Mert Can Altın) [#51800](https://github.com/nodejs/node/pull/51800)
* \[[`1ab9ff46a5`](https://github.com/nodejs/node/commit/1ab9ff46a5)] - **test**: 在 Windows ARM 上将 test-wasi 标记为 flaky (Joyee Cheung) [#51834](https://github.com/nodejs/node/pull/51834)
* \[[`1c47da1453`](https://github.com/nodejs/node/commit/1c47da1453)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#51533](https://github.com/nodejs/node/pull/51533)
* \[[`91c8624608`](https://github.com/nodejs/node/commit/91c8624608)] - **test\_runner**: 在隔离环境中序列化 'expected' 和 'actual' (Malthe Borch) [#51851](https://github.com/nodejs/node/pull/51851)
* \[[`cea90dcfe3`](https://github.com/nodejs/node/commit/cea90dcfe3)] - **test\_runner**: 为 mocked timers 添加 ref 方法 (Marco Ippolito) [#51809](https://github.com/nodejs/node/pull/51809)
* \[[`9ff0df1793`](https://github.com/nodejs/node/commit/9ff0df1793)] - **test\_runner**: 检查超时是否已被自身回调清除 (Ben Richeson) [#51673](https://github.com/nodejs/node/pull/51673)
* \[[`34ecd1e36b`](https://github.com/nodejs/node/commit/34ecd1e36b)] - **test\_runner**: 修复测试对象被错误传递给 setup() (Pulkit Gupta) [#50982](https://github.com/nodejs/node/pull/50982)
* \[[`da17a2538e`](https://github.com/nodejs/node/commit/da17a2538e)] - **test\_runner**: 修复当 before 抛出错误时运行 after hook (Pulkit Gupta) [#51062](https://github.com/nodejs/node/pull/51062)
* \[[`b8f0ea6f60`](https://github.com/nodejs/node/commit/b8f0ea6f60)] - **test\_runner**: 修复 test runner 中文件为 undefined 时的无限循环 (Pulkit Gupta) [#51047](https://github.com/nodejs/node/pull/51047)
* \[[`fe922f05e4`](https://github.com/nodejs/node/commit/fe922f05e4)] - **(SEMVER-MINOR)** **timers**: 导出 timers.promises (Marco Ippolito) [#51246](https://github.com/nodejs/node/pull/51246)
* \[[`f4ac7baf85`](https://github.com/nodejs/node/commit/f4ac7baf85)] - **tools**: 修复使用共享模式安装 node (Cheng Zhao) [#51910](https://github.com/nodejs/node/pull/51910)
* \[[`f07605fa7b`](https://github.com/nodejs/node/commit/f07605fa7b)] - **tools**: 将 eslint 更新到 8.57.0 (Node.js GitHub Bot) [#51867](https://github.com/nodejs/node/pull/51867)
* \[[`d16b235fca`](https://github.com/nodejs/node/commit/d16b235fca)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.12.0 (Node.js GitHub Bot) [#51795](https://github.com/nodejs/node/pull/51795)
* \[[`d27e811a01`](https://github.com/nodejs/node/commit/d27e811a01)] - **tools**: 修复 js2c 中缺失的 \[\[fallthrough]] (Cheng Zhao) [#51845](https://github.com/nodejs/node/pull/51845)
* \[[`7eb69308da`](https://github.com/nodejs/node/commit/7eb69308da)] - **tools**: 禁用自动化 libuv 更新 (Rafael Gonzaga) [#51775](https://github.com/nodejs/node/pull/51775)
* \[[`1f15af425c`](https://github.com/nodejs/node/commit/1f15af425c)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.10.0 (Node.js GitHub Bot) [#51720](https://github.com/nodejs/node/pull/51720)
* \[[`c7ae13e6bc`](https://github.com/nodejs/node/commit/c7ae13e6bc)] - **tools**: 将 github\_reporter 更新到 1.6.0 (Node.js GitHub Bot) [#51658](https://github.com/nodejs/node/pull/51658)
* \[[`0fb079bd85`](https://github.com/nodejs/node/commit/0fb079bd85)] - **tools**: 仅在源代码变更时运行 `build-windows` 工作流 (Antoine du Hamel) [#51596](https://github.com/nodejs/node/pull/51596)
* \[[`c2538e31fa`](https://github.com/nodejs/node/commit/c2538e31fa)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.6 (Node.js GitHub Bot) [#51583](https://github.com/nodejs/node/pull/51583)
* \[[`e02dbf074b`](https://github.com/nodejs/node/commit/e02dbf074b)] - **tools**: 修复 loong64 构建 (Shi Pujin) [#51401](https://github.com/nodejs/node/pull/51401)
* \[[`ce49cb6656`](https://github.com/nodejs/node/commit/ce49cb6656)] - **tools**: 将 normalizeTD text 默认值设为空字符串 (Marco Ippolito) [#51543](https://github.com/nodejs/node/pull/51543)
* \[[`e8dc5ac552`](https://github.com/nodejs/node/commit/e8dc5ac552)] - **tools**: 在 V8 构建中限制与 ninja 的并行度 (Richard Lau) [#51473](https://github.com/nodejs/node/pull/51473)
* \[[`97470b179b`](https://github.com/nodejs/node/commit/97470b179b)] - **tools**: 不要向 C 编译器传递无效标志 (Michaël Zasso) [#51409](https://github.com/nodejs/node/pull/51409)
* \[[`59af1d7923`](https://github.com/nodejs/node/commit/59af1d7923)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.5 (Node.js GitHub Bot) [#51460](https://github.com/nodejs/node/pull/51460)
* \[[`6385c7ad57`](https://github.com/nodejs/node/commit/6385c7ad57)] - **tools**: 将 inspector\_protocol 更新到 83b1154 (Kohei Ueno) [#51309](https://github.com/nodejs/node/pull/51309)
* \[[`5235aaf299`](https://github.com/nodejs/node/commit/5235aaf299)] - **tools**: 将 github\_reporter 更新到 1.5.4 (Node.js GitHub Bot) [#51395](https://github.com/nodejs/node/pull/51395)
* \[[`4ce2ecb1ce`](https://github.com/nodejs/node/commit/4ce2ecb1ce)] - **tools**: 修复 brotli 更新脚本中的版本解析 (Richard Lau) [#51373](https://github.com/nodejs/node/pull/51373)
* \[[`86102078f5`](https://github.com/nodejs/node/commit/86102078f5)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.4 (Node.js GitHub Bot) [#51396](https://github.com/nodejs/node/pull/51396)
* \[[`e658208159`](https://github.com/nodejs/node/commit/e658208159)] - **tools**: 移除 openssl v1 更新脚本 (Marco Ippolito) [#51378](https://github.com/nodejs/node/pull/51378)
* \[[`4372f6a5b8`](https://github.com/nodejs/node/commit/4372f6a5b8)] - **tools**: 移除已弃用的 python api (Alex Yang) [#49731](https://github.com/nodejs/node/pull/49731)
* \[[`2b24059e53`](https://github.com/nodejs/node/commit/2b24059e53)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.2 (Node.js GitHub Bot) [#51320](https://github.com/nodejs/node/pull/51320)
* \[[`1da2e8d15e`](https://github.com/nodejs/node/commit/1da2e8d15e)] - **tools**: 修复 dep\_updaters 目录更新 (Michaël Zasso) [#51294](https://github.com/nodejs/node/pull/51294)
* \[[`b264dda7f2`](https://github.com/nodejs/node/commit/b264dda7f2)] - **tools**: 将 inspector\_protocol 更新到 c488ba2 (cola119) [#51293](https://github.com/nodejs/node/pull/51293)
* \[[`fdb07d5418`](https://github.com/nodejs/node/commit/fdb07d5418)] - **tools**: 将 inspector\_protocol 更新到 9b4a4aa (cola119) [#51293](https://github.com/nodejs/node/pull/51293)
* \[[`6863fb84a6`](https://github.com/nodejs/node/commit/6863fb84a6)] - **tools**: 将 inspector\_protocol 更新到 2f51e05 (cola119) [#51293](https://github.com/nodejs/node/pull/51293)
* \[[`6b85f5c6e0`](https://github.com/nodejs/node/commit/6b85f5c6e0)] - **tools**: 将 inspector\_protocol 更新到 d7b099b (cola119) [#51293](https://github.com/nodejs/node/pull/51293)
* \[[`cf029ca24f`](https://github.com/nodejs/node/commit/cf029ca24f)] - **tools**: 将 inspector\_protocol 更新到 912eb68 (cola119) [#51293](https://github.com/nodejs/node/pull/51293)
* \[[`af119447f5`](https://github.com/nodejs/node/commit/af119447f5)] - **tools**: 将 inspector\_protocol 更新到 547c5b8 (cola119) [#51293](https://github.com/nodejs/node/pull/51293)
* \[[`5a72506823`](https://github.com/nodejs/node/commit/5a72506823)] - **tools**: 将 inspector\_protocol 更新到 ca525fc (cola119) [#51293](https://github.com/nodejs/node/pull/51293)
* \[[`c7aa3976f9`](https://github.com/nodejs/node/commit/c7aa3976f9)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.1 (Node.js GitHub Bot) [#51276](https://github.com/nodejs/node/pull/51276)
* \[[`8e02d08a82`](https://github.com/nodejs/node/commit/8e02d08a82)] - **tools**: 检查当前时区版本 (Marco Ippolito) [#51178](https://github.com/nodejs/node/pull/51178)
* \[[`fa1e88775d`](https://github.com/nodejs/node/commit/fa1e88775d)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.0 (Node.js GitHub Bot) [#51193](https://github.com/nodejs/node/pull/51193)
* \[[`04c0bf9cc5`](https://github.com/nodejs/node/commit/04c0bf9cc5)] - **tools**: 将 eslint 更新到 8.56.0 (Node.js GitHub Bot) [#51194](https://github.com/nodejs/node/pull/51194)
* \[[`e896cbd0d5`](https://github.com/nodejs/node/commit/e896cbd0d5)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.7.0 (Node.js GitHub Bot) [#51106](https://github.com/nodejs/node/pull/51106)
* \[[`c7350c2083`](https://github.com/nodejs/node/commit/c7350c2083)] - **tools**: 将 doc 更新为 highlight.js\@11.9.0 unified\@11.0.4 (Node.js GitHub Bot) [#50459](https://github.com/nodejs/node/pull/50459)
* \[[`00dfabf8fb`](https://github.com/nodejs/node/commit/00dfabf8fb)] - **tools**: 将 eslint 更新到 8.55.0 (Node.js GitHub Bot) [#51025](https://github.com/nodejs/node/pull/51025)
* \[[`f91d56157b`](https://github.com/nodejs/node/commit/f91d56157b)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.6.1 (Node.js GitHub Bot) [#51022](https://github.com/nodejs/node/pull/51022)
* \[[`450163cf9b`](https://github.com/nodejs/node/commit/450163cf9b)] - **tools**: 为更新 release 链接工作流添加触发器 (Moshe Atlow) [#50974](https://github.com/nodejs/node/pull/50974)
* \[[`b1442024ea`](https://github.com/nodejs/node/commit/b1442024ea)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.5.2 (Node.js GitHub Bot) [#50913](https://github.com/nodejs/node/pull/50913)
* \[[`6fc6a62daf`](https://github.com/nodejs/node/commit/6fc6a62daf)] - **tools**: 修复当前版本检查 (Marco Ippolito) [#50951](https://github.com/nodejs/node/pull/50951)
* \[[`bc6bdda8b1`](https://github.com/nodejs/node/commit/bc6bdda8b1)] - **tools**: 修复 update-icu.sh (Michaël Zasso) [#51723](https://github.com/nodejs/node/pull/51723)
* \[[`a7a4cce75d`](https://github.com/nodejs/node/commit/a7a4cce75d)] - **typings**: lib/internal/vm.js (Geoffrey Booth) [#50112](https://github.com/nodejs/node/pull/50112)
* \[[`6375540507`](https://github.com/nodejs/node/commit/6375540507)] - **typings**: 修复 `internal/modules/esm/hooks` 中的 JSDoc (Alex Yang) [#50887](https://github.com/nodejs/node/pull/50887)
* \[[`4bc8e98d7c`](https://github.com/nodejs/node/commit/4bc8e98d7c)] - **url**: 在更新 URLSearchParams 时不要立即更新 URL (Matt Cowley) [#51520](https://github.com/nodejs/node/pull/51520)
* \[[`2acbcbd8ad`](https://github.com/nodejs/node/commit/2acbcbd8ad)] - **url**: 当 revokeObjectURL 的参数长度为 0 时抛出错误 (DylanTet) [#50433](https://github.com/nodejs/node/pull/50433)
* \[[`c50134615e`](https://github.com/nodejs/node/commit/c50134615e)] - **(SEMVER-MINOR)** **util**: 为文本格式化添加 styleText API (Rafael Gonzaga) [#51850](https://github.com/nodejs/node/pull/51850)
* \[[`f79ac336ad`](https://github.com/nodejs/node/commit/f79ac336ad)] - **util**: 向错误传递 invalidSubtypeIndex 而不是 trimmedSubtype (Gaurish Sethia) [#51264](https://github.com/nodejs/node/pull/51264)
* \[[`c3b89c310f`](https://github.com/nodejs/node/commit/c3b89c310f)] - **util**: 改进 function areSimilarFloatArrays 的性能 (Liu Jia) [#51040](https://github.com/nodejs/node/pull/51040)
* \[[`5202995b48`](https://github.com/nodejs/node/commit/5202995b48)] - **vm**: 在 JS 层使用私有符号直接实现 isContext() (Joyee Cheung) [#51685](https://github.com/nodejs/node/pull/51685)
* \[[`0211a3d65f`](https://github.com/nodejs/node/commit/0211a3d65f)] - **(SEMVER-MINOR)** **vm**: 支持使用默认加载器处理动态 import() (Joyee Cheung) [#51244](https://github.com/nodejs/node/pull/51244)
* \[[`07fc077c5d`](https://github.com/nodejs/node/commit/07fc077c5d)] - **vm**: 显式使用 v8::DeserializeInternalFieldsCallback (Joyee Cheung) [#50984](https://github.com/nodejs/node/pull/50984)
* \[[`5183e3a4b1`](https://github.com/nodejs/node/commit/5183e3a4b1)] - **watch**: 澄清 fileName 参数可以为 null (Luigi Pinca) [#51305](https://github.com/nodejs/node/pull/51305)
* \[[`63bf8a66df`](https://github.com/nodejs/node/commit/63bf8a66df)] - **watch**: 修复 Windows 系统上的空 `fileName` (vnc5) [#49891](https://github.com/nodejs/node/pull/49891)
* \[[`07da4e9b58`](https://github.com/nodejs/node/commit/07da4e9b58)] - **watch**: 修复传入 --watch=true 标志时的无限循环 (Pulkit Gupta) [#51160](https://github.com/nodejs/node/pull/51160)

<a id="20.11.1"></a>

## 2024-02-14，版本 20.11.1 'Iron'（LTS），由 @marco-ippolito 准备，@RafaelGSS

### 重要变更

这是一个安全更新。

### 重要变更

* CVE-2024-21892 - 通过 Linux capabilities 进行代码注入和权限提升 - (高)
* CVE-2024-22019 - http: 读取未处理的 HTTP 请求且 chunk 扩展无限制会导致 DoS 攻击 - (高)
* CVE-2024-21896 - 通过 monkey-patching Buffer 内部实现进行路径遍历 - (高)
* CVE-2024-22017 - 由于 io\_uring，setuid() 无法放弃所有权限 - (高)
* CVE-2023-46809 - Node.js 易受 Marvin 攻击（针对 PKCS#1 v1.5 填充的 Bleichenbacher 攻击的时间变体） - (中)
* CVE-2024-21891 - 由于路径遍历序列清理不当导致多种权限模型绕过 - (中)
* CVE-2024-21890 - 在 --allow-fs-read 和 --allow-fs-write 中对通配符处理不当 (中)
* CVE-2024-22025 - fetch() brotli 解码中因资源耗尽导致的拒绝服务 - (中)
* undici 版本 5.28.3
* libuv 版本 1.48.0
* OpenSSL 版本 3.0.13+quic1

### 提交

* \[[`7079c062bb`](https://github.com/nodejs/node/commit/7079c062bb)] - **crypto**: 对 privateDecrypt 禁用 PKCS#1 填充 (Michael Dawson) [nodejs-private/node-private#525](https://github.com/nodejs-private/node-private/pull/525)
* \[[`186a6e1ffb`](https://github.com/nodejs/node/commit/186a6e1ffb)] - **deps**: 修复 GHSA-f74f-cvh7-c6q6/CVE-2024-24806 (Santiago Gimeno) [#51737](https://github.com/nodejs/node/pull/51737)
* \[[`686da19abb`](https://github.com/nodejs/node/commit/686da19abb)] - **deps**: 默认禁用 libuv 中的 io\_uring 支持 (Tobias Nießen) [nodejs-private/node-private#529](https://github.com/nodejs-private/node-private/pull/529)
* \[[`f7b44bfbce`](https://github.com/nodejs/node/commit/f7b44bfbce)] - **deps**: 更新 openssl-3.0.13+quic1 的 archs 文件 (Node.js GitHub Bot) [#51614](https://github.com/nodejs/node/pull/51614)
* \[[`7a30fecea2`](https://github.com/nodejs/node/commit/7a30fecea2)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.13+quic1 (Node.js GitHub Bot) [#51614](https://github.com/nodejs/node/pull/51614)
* \[[`480fc169a8`](https://github.com/nodejs/node/commit/480fc169a8)] - **fs**: 在 possiblyTransformPath 中防范被修改的 Buffer 内部实现 (Tobias Nießen) [nodejs-private/node-private#497](https://github.com/nodejs-private/node-private/pull/497)
* \[[`77ac7c3153`](https://github.com/nodejs/node/commit/77ac7c3153)] - **http**: 添加最大 chunk 扩展大小 (Paolo Insogna) [nodejs-private/node-private#519](https://github.com/nodejs-private/node-private/pull/519)
* \[[`ed7d149675`](https://github.com/nodejs/node/commit/ed7d149675)] - **lib**: 使用缓存的 fs 内部实现抵御路径遍历 (RafaelGSS) [nodejs-private/node-private#516](https://github.com/nodejs-private/node-private/pull/516)
* \[[`89bd5fc38f`](https://github.com/nodejs/node/commit/89bd5fc38f)] - **lib**: 将 undici 更新至 v5.28.3 (Matteo Collina) [nodejs-private/node-private#539](https://github.com/nodejs-private/node-private/pull/539)
* \[[`d01dd4291d`](https://github.com/nodejs/node/commit/d01dd4291d)] - **permission**: 修复 children > 1 时的通配符 (Rafael Gonzaga) [#51209](https://github.com/nodejs/node/pull/51209)
* \[[`40ff37dfcc`](https://github.com/nodejs/node/commit/40ff37dfcc)] - **src**: 修复 node::credentials 中的 HasOnly(capability) (Tobias Nießen) [nodejs-private/node-private#505](https://github.com/nodejs-private/node-private/pull/505)
* \[[`3f6addd590`](https://github.com/nodejs/node/commit/3f6addd590)] - **src,deps**: 如果启用 io\_uring，则禁用 setuid() 等 (Tobias Nießen) [nodejs-private/node-private#529](https://github.com/nodejs-private/node-private/pull/529)
* \[[`d6da413aa4`](https://github.com/nodejs/node/commit/d6da413aa4)] - **test,doc**: 澄清通配符用法 (RafaelGSS) [nodejs-private/node-private#517](https://github.com/nodejs-private/node-private/pull/517)
* \[[`c213910aea`](https://github.com/nodejs/node/commit/c213910aea)] - **zlib**: 如果输出缓冲区已满则暂停流 (Matteo Collina) [nodejs-private/node-private#541](https://github.com/nodejs-private/node-private/pull/541)

<a id="20.11.0"></a>

## 2024-01-09，版本 20.11.0 'Iron'（LTS），@UlisesGascon

### 重要变更

* \[[`833190fe7c`](https://github.com/nodejs/node/commit/833190fe7c)] - **crypto**: 将根证书更新为 NSS 3.95 (Node.js GitHub Bot) [#50805](https://github.com/nodejs/node/pull/50805)
* \[[`a541b78bdb`](https://github.com/nodejs/node/commit/a541b78bdb)] - **doc**: 将 MrJithil 添加为协作者 (Jithil P Ponnan) [#50666](https://github.com/nodejs/node/pull/50666)
* \[[`d4be8fad83`](https://github.com/nodejs/node/commit/d4be8fad83)] - **doc**: 将 Ethan-Arrowood 添加为协作者 (Ethan Arrowood) [#50393](https://github.com/nodejs/node/pull/50393)
* \[[`c1a196c897`](https://github.com/nodejs/node/commit/c1a196c897)] - **(SEMVER-MINOR)** **esm**: 添加 import.meta.dirname 和 import.meta.filename (James Sumners) [#48740](https://github.com/nodejs/node/pull/48740)
* \[[`aa3209b880`](https://github.com/nodejs/node/commit/aa3209b880)] - **fs**: 为 writeFileSync utf8 添加 C++ 快速路径 (CanadaHonk) [#49884](https://github.com/nodejs/node/pull/49884)
* \[[`8e886a2fff`](https://github.com/nodejs/node/commit/8e886a2fff)] - **(SEMVER-MINOR)** **module**: 移除 useCustomLoadersIfPresent 标志 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`21ab3c0f0b`](https://github.com/nodejs/node/commit/21ab3c0f0b)] - **(SEMVER-MINOR)** **module**: 在 shadow realm 中引导模块加载器 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`29d91b13e3`](https://github.com/nodejs/node/commit/29d91b13e3)] - **(SEMVER-MINOR)** **src**: 添加 `--disable-warning` 选项 (Ethan Arrowood) [#50661](https://github.com/nodejs/node/pull/50661)
* \[[`11b3e470db`](https://github.com/nodejs/node/commit/11b3e470db)] - **(SEMVER-MINOR)** **src**: 创建每个 isolate 的代理环境模板 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`621c4d66c2`](https://github.com/nodejs/node/commit/621c4d66c2)] - **(SEMVER-MINOR)** **src**: 将 process binding 数据设为弱引用 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`139d6c8d3b`](https://github.com/nodejs/node/commit/139d6c8d3b)] - **stream**: 为 Readable 缓冲区使用 Array (Robert Nagy) [#50341](https://github.com/nodejs/node/pull/50341)
* \[[`6206957e8d`](https://github.com/nodejs/node/commit/6206957e8d)] - **stream**: 优化创建过程 (Robert Nagy) [#50337](https://github.com/nodejs/node/pull/50337)
* \[[`e64378643d`](https://github.com/nodejs/node/commit/e64378643d)] - **(SEMVER-MINOR)** **test_runner**: 添加内置 lcov 报告器 (Phil Nash) [#50018](https://github.com/nodejs/node/pull/50018)
* \[[`4a830c2d9d`](https://github.com/nodejs/node/commit/4a830c2d9d)] - **(SEMVER-MINOR)** **test_runner**: 将 Date 添加到支持的 mock API 中 (Lucas Santos) [#48638](https://github.com/nodejs/node/pull/48638)
* \[[`842dc01def`](https://github.com/nodejs/node/commit/842dc01def)] - **(SEMVER-MINOR)** **test_runner, cli**: 添加 --test-timeout 标志 (Shubham Pandey) [#50443](https://github.com/nodejs/node/pull/50443)

### 提交

* \[[`e40a559ab1`](https://github.com/nodejs/node/commit/e40a559ab1)] - **benchmark**: 更新 benchmark/util/splice-one.js 中的迭代次数 (Liu Jia) [#50698](https://github.com/nodejs/node/pull/50698)
* \[[`00f7a5d26f`](https://github.com/nodejs/node/commit/00f7a5d26f)] - **benchmark**: 将迭代次数增加到合适的值 (Lei Shi) [#50766](https://github.com/nodejs/node/pull/50766)
* \[[`be6ad3f375`](https://github.com/nodejs/node/commit/be6ad3f375)] - **benchmark**: 重写 import.meta 基准测试 (Joyee Cheung) [#50683](https://github.com/nodejs/node/pull/50683)
* \[[`9857364129`](https://github.com/nodejs/node/commit/9857364129)] - **benchmark**: 添加 misc/startup-cli-version 基准测试 (Joyee Cheung) [#50684](https://github.com/nodejs/node/pull/50684)
* \[[`22d729e7f5`](https://github.com/nodejs/node/commit/22d729e7f5)] - **benchmark**: 从 require-builtins fixture 中移除 punycode (Joyee Cheung) [#50689](https://github.com/nodejs/node/pull/50689)
* \[[`4cf10a149a`](https://github.com/nodejs/node/commit/4cf10a149a)] - **benchmark**: 更改 benchmark/es/string-concatenations.js 中的迭代次数 (Liu Jia) [#50585](https://github.com/nodejs/node/pull/50585)
* \[[`15c2ed93a8`](https://github.com/nodejs/node/commit/15c2ed93a8)] - **benchmark**: 添加编码相关的基准测试 (Aras Abbasi) [#50348](https://github.com/nodejs/node/pull/50348)
* \[[`8a896428ca`](https://github.com/nodejs/node/commit/8a896428ca)] - **benchmark**: 为 Readable.from 添加更多场景 (Raz Luvaton) [#50351](https://github.com/nodejs/node/pull/50351)
* \[[`dbe6c5f354`](https://github.com/nodejs/node/commit/dbe6c5f354)] - **benchmark**: 在 IBMi 上跳过 test-benchmark-os (Michael Dawson) [#50286](https://github.com/nodejs/node/pull/50286)
* \[[`179b4b6e62`](https://github.com/nodejs/node/commit/179b4b6e62)] - **benchmark**: 将 permission-fs-read 移动到 permission-processhas-fs-read (Aki Hasegawa-Johnson) [#49770](https://github.com/nodejs/node/pull/49770)
* \[[`32d65c001d`](https://github.com/nodejs/node/commit/32d65c001d)] - **buffer**: 提升 Buffer.equals 性能 (kylo5aby) [#50621](https://github.com/nodejs/node/pull/50621)
* \[[`80ea83757e`](https://github.com/nodejs/node/commit/80ea83757e)] - **build**: 为 simdjson 添加 GN 配置 (Cheng Zhao) [#50831](https://github.com/nodejs/node/pull/50831)
* \[[`904e645bcd`](https://github.com/nodejs/node/commit/904e645bcd)] - **build**: 添加启用 Maglev 的配置标志 (Keyhan Vakil) [#50692](https://github.com/nodejs/node/pull/50692)
* \[[`019efa8a5a`](https://github.com/nodejs/node/commit/019efa8a5a)] - **build**: 修复 deps/base64 的 GN 配置 (Cheng Zhao) [#50696](https://github.com/nodejs/node/pull/50696)
* \[[`a645d5ac54`](https://github.com/nodejs/node/commit/a645d5ac54)] - **build**: 禁用标志 v8\_scriptormodule\_legacy\_lifetime (Chengzhong Wu) [#50616](https://github.com/nodejs/node/pull/50616)
* \[[`8705058b09`](https://github.com/nodejs/node/commit/8705058b09)] - **build**: 添加 GN 构建文件 (Cheng Zhao) [#47637](https://github.com/nodejs/node/pull/47637)
* \[[`0a5e9c12cf`](https://github.com/nodejs/node/commit/0a5e9c12cf)] - **build**: 修复使用 Python 3.12 构建的问题 (Luigi Pinca) [#50582](https://github.com/nodejs/node/pull/50582)
* \[[`ff5713dd43`](https://github.com/nodejs/node/commit/ff5713dd43)] - **build**: 支持 Python 3.12 (Shi Pujin) [#50209](https://github.com/nodejs/node/pull/50209)
* \[[`cfd50f229a`](https://github.com/nodejs/node/commit/cfd50f229a)] - **build**: 修复仅有 python3 时的构建问题 (Cheng Zhao) [#48462](https://github.com/nodejs/node/pull/48462)
* \[[`833190fe7c`](https://github.com/nodejs/node/commit/833190fe7c)] - **crypto**: 将根证书更新到 NSS 3.95 (Node.js GitHub Bot) [#50805](https://github.com/nodejs/node/pull/50805)
* \[[`54c46dae9e`](https://github.com/nodejs/node/commit/54c46dae9e)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-5daffc7 (Node.js GitHub Bot) [#50803](https://github.com/nodejs/node/pull/50803)
* \[[`0be84e5a28`](https://github.com/nodejs/node/commit/0be84e5a28)] - **deps**: 将 undici 更新到 5.27.2 (Node.js GitHub Bot) [#50813](https://github.com/nodejs/node/pull/50813)
* \[[`ec67890824`](https://github.com/nodejs/node/commit/ec67890824)] - **deps**: V8: 选取提交 0f9ebbc672c7 (Chengzhong Wu) [#50867](https://github.com/nodejs/node/pull/50867)
* \[[`bc2ebb972b`](https://github.com/nodejs/node/commit/bc2ebb972b)] - **deps**: V8: 选取提交 13192d6e10fa (Levi Zim) [#50552](https://github.com/nodejs/node/pull/50552)
* \[[`656135d70a`](https://github.com/nodejs/node/commit/656135d70a)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-dfc48fc (Node.js GitHub Bot) [#50456](https://github.com/nodejs/node/pull/50456)
* \[[`41ee4bcc5d`](https://github.com/nodejs/node/commit/41ee4bcc5d)] - **deps**: 将 ada 更新到 2.7.4 (Node.js GitHub Bot) [#50815](https://github.com/nodejs/node/pull/50815)
* \[[`a40948b5c5`](https://github.com/nodejs/node/commit/a40948b5c5)] - **deps**: 将 minimatch 更新到 9.0.3 (Node.js GitHub Bot) [#50806](https://github.com/nodejs/node/pull/50806)
* \[[`7be1222c4a`](https://github.com/nodejs/node/commit/7be1222c4a)] - **deps**: 将 simdutf 更新到 4.0.4 (Node.js GitHub Bot) [#50772](https://github.com/nodejs/node/pull/50772)
* \[[`68e7d49db6`](https://github.com/nodejs/node/commit/68e7d49db6)] - **deps**: 将 npm 升级到 10.2.4 (npm team) [#50751](https://github.com/nodejs/node/pull/50751)
* \[[`3d82d38336`](https://github.com/nodejs/node/commit/3d82d38336)] - **deps**: 正确转义 Python 字符串 (Michaël Zasso) [#50695](https://github.com/nodejs/node/pull/50695)
* \[[`d3870ac957`](https://github.com/nodejs/node/commit/d3870ac957)] - **deps**: 将 base64 更新到 0.5.1 (Node.js GitHub Bot) [#50629](https://github.com/nodejs/node/pull/50629)
* \[[`4b219b6ece`](https://github.com/nodejs/node/commit/4b219b6ece)] - **deps**: 将 corepack 更新到 0.23.0 (Node.js GitHub Bot) [#50563](https://github.com/nodejs/node/pull/50563)
* \[[`6c41b50922`](https://github.com/nodejs/node/commit/6c41b50922)] - **deps**: 将 nghttp2 更新到 1.58.0 (Node.js GitHub Bot) [#50441](https://github.com/nodejs/node/pull/50441)
* \[[`3beee0ae8f`](https://github.com/nodejs/node/commit/3beee0ae8f)] - **deps**: 将 acorn 更新到 8.11.2 (Node.js GitHub Bot) [#50460](https://github.com/nodejs/node/pull/50460)
* \[[`220916fa93`](https://github.com/nodejs/node/commit/220916fa93)] - **deps**: 将 undici 更新到 5.27.0 (Node.js GitHub Bot) [#50463](https://github.com/nodejs/node/pull/50463)
* \[[`f9960b3545`](https://github.com/nodejs/node/commit/f9960b3545)] - **deps**: 将 googletest 更新到 116b7e5 (Node.js GitHub Bot) [#50324](https://github.com/nodejs/node/pull/50324)
* \[[`d5c16f897a`](https://github.com/nodejs/node/commit/d5c16f897a)] - **dns**: 使用有效数组调用 handle.setServers() (Luigi Pinca) [#50811](https://github.com/nodejs/node/pull/50811)
* \[[`1bd6537c97`](https://github.com/nodejs/node/commit/1bd6537c97)] - **doc**: 推荐受支持的 Python 版本 (Luigi Pinca) [#50407](https://github.com/nodejs/node/pull/50407)
* \[[`402e257520`](https://github.com/nodejs/node/commit/402e257520)] - **doc**: 更新 v21.1.0 中的值得注意的变更 (Joyee Cheung) [#50388](https://github.com/nodejs/node/pull/50388)
* \[[`032535e270`](https://github.com/nodejs/node/commit/032535e270)] - **doc**: 使 api 和其他文档中的主题保持一致 (Dima Demakov) [#50877](https://github.com/nodejs/node/pull/50877)
* \[[`d53842683f`](https://github.com/nodejs/node/commit/d53842683f)] - **doc**: 在 `primordials.md` 中添加关于 `instanceof` 的章节 (Antoine du Hamel) [#50874](https://github.com/nodejs/node/pull/50874)
* \[[`fe315055a7`](https://github.com/nodejs/node/commit/fe315055a7)] - **doc**: 更新电子邮件以反映所属机构 (Yagiz Nizipli) [#50856](https://github.com/nodejs/node/pull/50856)
* \[[`e14f661950`](https://github.com/nodejs/node/commit/e14f661950)] - **doc**: shard 不支持 watch 模式 (Pulkit Gupta) [#50640](https://github.com/nodejs/node/pull/50640)
* \[[`b3d015de71`](https://github.com/nodejs/node/commit/b3d015de71)] - **doc**: 去除不必要的 `eslint-skip` 注释 (Antoine du Hamel) [#50829](https://github.com/nodejs/node/pull/50829)
* \[[`168cbf9cb9`](https://github.com/nodejs/node/commit/168cbf9cb9)] - **doc**: 为 isWebAssemblyCompiledModule 创建弃用代码 (Marco Ippolito) [#50486](https://github.com/nodejs/node/pull/50486)
* \[[`30baacba41`](https://github.com/nodejs/node/commit/30baacba41)] - **doc**: 将 CanadaHonk 添加为 triagers (CanadaHonk) [#50848](https://github.com/nodejs/node/pull/50848)
* \[[`e6e7cbceac`](https://github.com/nodejs/node/commit/e6e7cbceac)] - **doc**: 修复 `--allow-fs-\*` 中的拼写错误 (Tobias Nießen) [#50845](https://github.com/nodejs/node/pull/50845)
* \[[`e22ce9586f`](https://github.com/nodejs/node/commit/e22ce9586f)] - **doc**: 更新 x509.keyUsage 的 Crypto API 文档 (Daniel Meechan) [#50603](https://github.com/nodejs/node/pull/50603)
* \[[`549d4422b7`](https://github.com/nodejs/node/commit/549d4422b7)] - **doc**: 修复 fs.writeFileSync 返回值文档 (Ryan Zimmerman) [#50760](https://github.com/nodejs/node/pull/50760)
* \[[`3c79e3cdba`](https://github.com/nodejs/node/commit/3c79e3cdba)] - **doc**: 更新 `PerformanceEntry` 中的 print results(detail) (Jungku Lee) [#50723](https://github.com/nodejs/node/pull/50723)
* \[[`aeaf96d06e`](https://github.com/nodejs/node/commit/aeaf96d06e)] - **doc**: 修复 `Buffer.allocUnsafe` 文档 (Mert Can Altın) [#50686](https://github.com/nodejs/node/pull/50686)
* \[[`347e1dd06a`](https://github.com/nodejs/node/commit/347e1dd06a)] - **doc**: 运行 license-builder (github-actions\[bot]) [#50691](https://github.com/nodejs/node/pull/50691)
* \[[`a541b78bdb`](https://github.com/nodejs/node/commit/a541b78bdb)] - **doc**: 将 MrJithil 添加为 collaborators (Jithil P Ponnan) [#50666](https://github.com/nodejs/node/pull/50666)
* \[[`90f415dd61`](https://github.com/nodejs/node/commit/90f415dd61)] - **doc**: 修复 fs.md 中的拼写错误 (fwio) [#50570](https://github.com/nodejs/node/pull/50570)
* \[[`e2388151ba`](https://github.com/nodejs/node/commit/e2388151ba)] - **doc**: 补充 `subtle.encrypt` 中缺失的参数说明 (Deokjin Kim) [#50578](https://github.com/nodejs/node/pull/50578)
* \[[`39cc013465`](https://github.com/nodejs/node/commit/39cc013465)] - **doc**: 更新 pm 文档以包含 resource (Ranieri Innocenti Spada) [#50601](https://github.com/nodejs/node/pull/50601)
* \[[`ba6d427c23`](https://github.com/nodejs/node/commit/ba6d427c23)] - **doc**: 更正 v20.6.0 changelog 中的署名 (Jacob Smith) [#50564](https://github.com/nodejs/node/pull/50564)
* \[[`1b2dab8254`](https://github.com/nodejs/node/commit/1b2dab8254)] - **doc**: 调整 `console.table` 行左对齐 (Jungku Lee) [#50553](https://github.com/nodejs/node/pull/50553)
* \[[`5d48ef7778`](https://github.com/nodejs/node/commit/5d48ef7778)] - **doc**: 为链接添加下划线 (Rich Trott) [#50481](https://github.com/nodejs/node/pull/50481)
* \[[`5e6057c9d2`](https://github.com/nodejs/node/commit/5e6057c9d2)] - **doc**: 删除重复词 (Gerhard Stöbich) [#50475](https://github.com/nodejs/node/pull/50475)
* \[[`64bf2fd4ee`](https://github.com/nodejs/node/commit/64bf2fd4ee)] - **doc**: 修复 `webstreams.md` 中的拼写错误 (André Santos) [#50426](https://github.com/nodejs/node/pull/50426)
* \[[`cca55b8414`](https://github.com/nodejs/node/commit/cca55b8414)] - **doc**: 添加关于 Node-API 版本 >=9 的信息 (Michael Dawson) [#50168](https://github.com/nodejs/node/pull/50168)
* \[[`d4be8fad83`](https://github.com/nodejs/node/commit/d4be8fad83)] - **doc**: 将 Ethan-Arrowood 添加为 collaborators (Ethan Arrowood) [#50393](https://github.com/nodejs/node/pull/50393)
* \[[`0b311838f6`](https://github.com/nodejs/node/commit/0b311838f6)] - **doc**: 修复 `releases.md` 中的目录 (Bryce Seefieldt) [#50372](https://github.com/nodejs/node/pull/50372)
* \[[`843d5f84ca`](https://github.com/nodejs/node/commit/843d5f84ca)] - **esm**: 当 `load` 返回空值 `source` 时回退到 `getSource` (Antoine du Hamel) [#50825](https://github.com/nodejs/node/pull/50825)
* \[[`8d5469c84b`](https://github.com/nodejs/node/commit/8d5469c84b)] - **esm**: 当格式为 `commonjs` 时不调用 `getSource` (Francesco Trotta) [#50465](https://github.com/nodejs/node/pull/50465)
* \[[`b48cf314d3`](https://github.com/nodejs/node/commit/b48cf314d3)] - **esm**: 在 `--default-type=module` 下默认加载时绕过 CJS loader (Antoine du Hamel) [#50004](https://github.com/nodejs/node/pull/50004)
* \[[`c1a196c897`](https://github.com/nodejs/node/commit/c1a196c897)] - **(SEMVER-MINOR)** **esm**: 添加 import.meta.dirname 和 import.meta.filename (James Sumners) [#48740](https://github.com/nodejs/node/pull/48740)
* \[[`435f9c9276`](https://github.com/nodejs/node/commit/435f9c9276)] - **fs**: 对带 utf8 编码的 writeFileSync 使用默认的 w 标志 (Murilo Kakazu) [#50990](https://github.com/nodejs/node/pull/50990)
* \[[`aa3209b880`](https://github.com/nodejs/node/commit/aa3209b880)] - **fs**: 为 writeFileSync utf8 添加 C++ 快速路径 (CanadaHonk) [#49884](https://github.com/nodejs/node/pull/49884)
* \[[`05e25e0230`](https://github.com/nodejs/node/commit/05e25e0230)] - **fs**: 提升同步 `lstat`+`fstat` 的错误性能 (CanadaHonk) [#49868](https://github.com/nodejs/node/pull/49868)
* \[[`f94a24cb4b`](https://github.com/nodejs/node/commit/f94a24cb4b)] - **fs**: 提升 `rmdirSync` 的错误性能 (CanadaHonk) [#49846](https://github.com/nodejs/node/pull/49846)
* \[[`cada22e2a4`](https://github.com/nodejs/node/commit/cada22e2a4)] - **fs**: 修复 void 函数不应返回的问题 (Jungku Lee) [#50769](https://github.com/nodejs/node/pull/50769)
* \[[`ba40b2e33e`](https://github.com/nodejs/node/commit/ba40b2e33e)] - **fs**: 在 copyFile 中替换已弃用的 `path._makeLong` (CanadaHonk) [#50844](https://github.com/nodejs/node/pull/50844)
* \[[`d1b6bd660a`](https://github.com/nodejs/node/commit/d1b6bd660a)] - **fs**: 更新 `readdir` 的 jsdoc 参数 (Jungku Lee) [#50448](https://github.com/nodejs/node/pull/50448)
* \[[`11412e863a`](https://github.com/nodejs/node/commit/11412e863a)] - **fs**: 不在 cpSync 内部抛出错误 (Yagiz Nizipli) [#50185](https://github.com/nodejs/node/pull/50185)
* \[[`868a464c15`](https://github.com/nodejs/node/commit/868a464c15)] - **fs,url**: 将 `FromNamespacedPath` 移动到 `node_url` (Yagiz Nizipli) [#50090](https://github.com/nodejs/node/pull/50090)
* \[[`de7fe08c7b`](https://github.com/nodejs/node/commit/de7fe08c7b)] - **fs,url**: 重构 `FileURLToPath` 方法 (Yagiz Nizipli) [#50090](https://github.com/nodejs/node/pull/50090)
* \[[`186e6e0395`](https://github.com/nodejs/node/commit/186e6e0395)] - **fs,url**: 将 `FileURLToPath` 移动到 node\_url (Yagiz Nizipli) [#50090](https://github.com/nodejs/node/pull/50090)
* \[[`aea7fe54af`](https://github.com/nodejs/node/commit/aea7fe54af)] - **inspector**: 使用私有字段代替 symbols (Yagiz Nizipli) [#50776](https://github.com/nodejs/node/pull/50776)
* \[[`48dbde71d8`](https://github.com/nodejs/node/commit/48dbde71d8)] - **lib**: 为 navigator.userAgent 使用 primordials (Aras Abbasi) [#50467](https://github.com/nodejs/node/pull/50467)
* \[[`fa220cac87`](https://github.com/nodejs/node/commit/fa220cac87)] - **lib**: 移除已弃用的字符串方法 (Jithil P Ponnan) [#50592](https://github.com/nodejs/node/pull/50592)
* \[[`f1cf1c385f`](https://github.com/nodejs/node/commit/f1cf1c385f)] - **lib**: 修复 assert 在 ESM 和 CJS 中显示 diff 消息的问题 (Jithil P Ponnan) [#50634](https://github.com/nodejs/node/pull/50634)
* \[[`3844af288f`](https://github.com/nodejs/node/commit/3844af288f)] - **lib**: 使 event 静态属性不可写且可配置 (Muthukumar) [#50425](https://github.com/nodejs/node/pull/50425)
* \[[`0a0b416d6c`](https://github.com/nodejs/node/commit/0a0b416d6c)] - **lib**: 避免在 nodeprecation 标志下进行内存分配 (Vinicius Lourenço) [#50231](https://github.com/nodejs/node/pull/50231)
* \[[`e7551d5770`](https://github.com/nodejs/node/commit/e7551d5770)] - **lib**: 将 console.table 行左对齐 (Jithil P Ponnan) [#50135](https://github.com/nodejs/node/pull/50135)
* \[[`0c85cebdf2`](https://github.com/nodejs/node/commit/0c85cebdf2)] - **meta**: 根据 Node.js charter 澄清提名流程 (Matteo Collina) [#50834](https://github.com/nodejs/node/pull/50834)
* \[[`f4070dd8d4`](https://github.com/nodejs/node/commit/f4070dd8d4)] - **meta**: 澄清 bug 复现建议 (Antoine du Hamel) [#50882](https://github.com/nodejs/node/pull/50882)
* \[[`2ddeead436`](https://github.com/nodejs/node/commit/2ddeead436)] - **meta**: 将 cjihrig 移动为 TSC 正式成员 (Colin Ihrig) [#50816](https://github.com/nodejs/node/pull/50816)
* \[[`34a789d9be`](https://github.com/nodejs/node/commit/34a789d9be)] - **meta**: 将 web-standards 添加为 WPTs 所有者 (Filip Skokan) [#50636](https://github.com/nodejs/node/pull/50636)
* \[[`40bbffa266`](https://github.com/nodejs/node/commit/40bbffa266)] - **meta**: 将 github/codeql-action 从 2.21.9 升级到 2.22.5 (dependabot\[bot]) [#50513](https://github.com/nodejs/node/pull/50513)
* \[[`c49553631d`](https://github.com/nodejs/node/commit/c49553631d)] - **meta**: 将 step-security/harden-runner 从 2.5.1 升级到 2.6.0 (dependabot\[bot]) [#50512](https://github.com/nodejs/node/pull/50512)
* \[[`99df0138b0`](https://github.com/nodejs/node/commit/99df0138b0)] - **meta**: 将 ossf/scorecard-action 从 2.2.0 升级到 2.3.1 (dependabot\[bot]) [#50509](https://github.com/nodejs/node/pull/50509)
* \[[`9db6227ac6`](https://github.com/nodejs/node/commit/9db6227ac6)] - **meta**: 修复 collaborators 列表中的间距 (Antoine du Hamel) [#50641](https://github.com/nodejs/node/pull/50641)
* \[[`2589a5a566`](https://github.com/nodejs/node/commit/2589a5a566)] - **meta**: 将 actions/setup-python 从 4.7.0 升级到 4.7.1 (dependabot\[bot]) [#50510](https://github.com/nodejs/node/pull/50510)
* \[[`5a86661a95`](https://github.com/nodejs/node/commit/5a86661a95)] - **meta**: 将 crypto 添加为 crypto 和 webcrypto 文档所有者 (Filip Skokan) [#50579](https://github.com/nodejs/node/pull/50579)
* \[[`ac8d2b9cc2`](https://github.com/nodejs/node/commit/ac8d2b9cc2)] - **meta**: 将 actions/setup-node 从 3.8.1 升级到 4.0.0 (dependabot\[bot]) [#50514](https://github.com/nodejs/node/pull/50514)
* \[[`bee2c0cf11`](https://github.com/nodejs/node/commit/bee2c0cf11)] - **meta**: 将 actions/checkout 从 4.1.0 升级到 4.1.1 (dependabot\[bot]) [#50511](https://github.com/nodejs/node/pull/50511)
* \[[`91a0944e5f`](https://github.com/nodejs/node/commit/91a0944e5f)] - **meta**: 将 <ethan.arrowood@vercel.com> 添加到 mailmap (Ethan Arrowood) [#50491](https://github.com/nodejs/node/pull/50491)
* \[[`8d3cf8c4ee`](https://github.com/nodejs/node/commit/8d3cf8c4ee)] - **meta**: 将 web-standards 添加为 web api 可见性所有者 (Chengzhong Wu) [#50418](https://github.com/nodejs/node/pull/50418)
* \[[`807c12de36`](https://github.com/nodejs/node/commit/807c12de36)] - **meta**: 提及其他值得注意的变更章节 (Rafael Gonzaga) [#50309](https://github.com/nodejs/node/pull/50309)
* \[[`21ab3c0f0b`](https://github.com/nodejs/node/commit/21ab3c0f0b)] - **(SEMVER-MINOR)** **module**: 在 shadow realm 中引导模块加载器 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`8e886a2fff`](https://github.com/nodejs/node/commit/8e886a2fff)] - **(SEMVER-MINOR)** **module**: 移除 useCustomLoadersIfPresent 标志 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`77e8361213`](https://github.com/nodejs/node/commit/77e8361213)] - **module**: 顺序执行 `--import` (Antoine du Hamel) [#50474](https://github.com/nodejs/node/pull/50474)
* \[[`fffc4951ac`](https://github.com/nodejs/node/commit/fffc4951ac)] - **module**: 在获取 json module 时在 accept header 中添加 application/json (Marco Ippolito) [#50119](https://github.com/nodejs/node/pull/50119)
* \[[`f808e7a650`](https://github.com/nodejs/node/commit/f808e7a650)] - **net**: 检查 pipe 模式和路径 (theanarkh) [#50770](https://github.com/nodejs/node/pull/50770)
* \[[`cf3a4c5b84`](https://github.com/nodejs/node/commit/cf3a4c5b84)] - **node-api**: 将公共代码提炼到宏中 (Gabriel Schulhof) [#50664](https://github.com/nodejs/node/pull/50664)
* \[[`a7d8f6b529`](https://github.com/nodejs/node/commit/a7d8f6b529)] - **perf\_hooks**: 使用 fast API calls 实现 performance.now() (Joyee Cheung) [#50492](https://github.com/nodejs/node/pull/50492)
* \[[`076dc7540b`](https://github.com/nodejs/node/commit/076dc7540b)] - **permission**: 如果目标是相对路径，则不创建符号链接 (Tobias Nießen) [#49156](https://github.com/nodejs/node/pull/49156)
* \[[`43160dcd2d`](https://github.com/nodejs/node/commit/43160dcd2d)] - **permission**: 将 const 函数标记为 const (Tobias Nießen) [#50705](https://github.com/nodejs/node/pull/50705)
* \[[`7a661d7ad9`](https://github.com/nodejs/node/commit/7a661d7ad9)] - **permission**: 解决 coverity 警告 (Michael Dawson) [#50215](https://github.com/nodejs/node/pull/50215)
* \[[`b2b4132c3e`](https://github.com/nodejs/node/commit/b2b4132c3e)] - **src**: 正确遍历 import attributes 数组 (Michaël Zasso) [#50703](https://github.com/nodejs/node/pull/50703)
* \[[`11b3e470db`](https://github.com/nodejs/node/commit/11b3e470db)] - **(SEMVER-MINOR)** **src**: 创建每个 isolate 的 proxy env 模板 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`d00412a083`](https://github.com/nodejs/node/commit/d00412a083)] - **(SEMVER-MINOR)** **src**: 为每个 isolate 创建 fs\_dir 属性 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`14cc3b9b90`](https://github.com/nodejs/node/commit/14cc3b9b90)] - **(SEMVER-MINOR)** **src**: 为每个 isolate 创建 worker 属性 (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`621c4d66c2`](https://github.com/nodejs/node/commit/621c4d66c2)] - **(SEMVER-MINOR)** **src**: 使 process binding data 变为 weak (Chengzhong Wu) [#48655](https://github.com/nodejs/node/pull/48655)
* \[[`07a4e94e84`](https://github.com/nodejs/node/commit/07a4e94e84)] - **src**: 断言 BN_bn2binpad 的返回值 (Tobias Nießen) [#50860](https://github.com/nodejs/node/pull/50860)
* \[[`158db2d61e`](https://github.com/nodejs/node/commit/158db2d61e)] - **src**: 修复 coverity 警告 (Michael Dawson) [#50846](https://github.com/nodejs/node/pull/50846)
* \[[`94363bb3fd`](https://github.com/nodejs/node/commit/94363bb3fd)] - **src**: 修复与即将发布的 V8 12.1 APIs 的兼容性 (Cheng Zhao) [#50709](https://github.com/nodejs/node/pull/50709)
* \[[`29d91b13e3`](https://github.com/nodejs/node/commit/29d91b13e3)] - **(SEMVER-MINOR)** **src**: 添加 `--disable-warning` 选项 (Ethan Arrowood) [#50661](https://github.com/nodejs/node/pull/50661)
* \[[`f054c337f8`](https://github.com/nodejs/node/commit/f054c337f8)] - **src**: 在使用 isolates 之前添加 IsolateScopes (Keyhan Vakil) [#50680](https://github.com/nodejs/node/pull/50680)
* \[[`d08eb382cd`](https://github.com/nodejs/node/commit/d08eb382cd)] - **src**: 避免在 FSPermission::Apply 中复制字符串 (Tobias Nießen) [#50662](https://github.com/nodejs/node/pull/50662)
* \[[`6620df1c05`](https://github.com/nodejs/node/commit/6620df1c05)] - **src**: 移除 RadixTree 中错误的默认参数 (Tobias Nießen) [#50736](https://github.com/nodejs/node/pull/50736)
* \[[`436c3aef15`](https://github.com/nodejs/node/commit/436c3aef15)] - **src**: 修复 JSONParser 泄漏内部 V8 scopes 的问题 (Keyhan Vakil) [#50688](https://github.com/nodejs/node/pull/50688)
* \[[`6f46d31018`](https://github.com/nodejs/node/commit/6f46d31018)] - **src**: 如果文件未找到，则返回 --env-file 错误 (Ardi Nugraha) [#50588](https://github.com/nodejs/node/pull/50588)
* \[[`3d43fd359c`](https://github.com/nodejs/node/commit/3d43fd359c)] - **src**: 避免静默地转换为有符号/无符号 int (Tobias Nießen) [#50663](https://github.com/nodejs/node/pull/50663)
* \[[`c253e39b56`](https://github.com/nodejs/node/commit/c253e39b56)] - **src**: 处理来自 uv_pipe_connect2() 的错误 (Deokjin Kim) [#50657](https://github.com/nodejs/node/pull/50657)
* \[[`3a9713bb5a`](https://github.com/nodejs/node/commit/3a9713bb5a)] - **src**: 在 DumpJavaScriptBacktrace() 中使用 v8::Isolate::TryGetCurrent() (Joyee Cheung) [#50518](https://github.com/nodejs/node/pull/50518)
* \[[`94f8a925a8`](https://github.com/nodejs/node/commit/94f8a925a8)] - **src**: 在 C++ 断言中打印更多信息 (Joyee Cheung) [#50242](https://github.com/nodejs/node/pull/50242)
* \[[`23f830616b`](https://github.com/nodejs/node/commit/23f830616b)] - **src**: 在单元外隐藏 node::credentials::HasOnly (Tobias Nießen) [#50450](https://github.com/nodejs/node/pull/50450)
* \[[`b7ecb0a390`](https://github.com/nodejs/node/commit/b7ecb0a390)] - **src**: readiterable 条目可能为空 (Matthew Aitken) [#50398](https://github.com/nodejs/node/pull/50398)
* \[[`4ef1d68715`](https://github.com/nodejs/node/commit/4ef1d68715)] - **src**: 在原生层实现 structuredClone (Joyee Cheung) [#50330](https://github.com/nodejs/node/pull/50330)
* \[[`9346f15138`](https://github.com/nodejs/node/commit/9346f15138)] - **src**: 在 FromFilePath() 中使用 find 代替逐字符查找 (Daniel Lemire) [#50288](https://github.com/nodejs/node/pull/50288)
* \[[`8414fb4d2a`](https://github.com/nodejs/node/commit/8414fb4d2a)] - **src**: 在 zlib version 中添加提交哈希简写 (Jithil P Ponnan) [#50158](https://github.com/nodejs/node/pull/50158)
* \[[`a878e3abb0`](https://github.com/nodejs/node/commit/a878e3abb0)] - **stream**: 修复 ReadableStream.from 的可枚举性 (Mattias Buelens) [#50779](https://github.com/nodejs/node/pull/50779)
* \[[`95ed4ffc1e`](https://github.com/nodejs/node/commit/95ed4ffc1e)] - **stream**: 修复 ReadableStream.prototype.values 的可枚举性 (Mattias Buelens) [#50779](https://github.com/nodejs/node/pull/50779)
* \[[`4cf155ca0c`](https://github.com/nodejs/node/commit/4cf155ca0c)] - **stream**: 为 Compression Streams 添加 Symbol.toStringTag (Filip Skokan) [#50712](https://github.com/nodejs/node/pull/50712)
* \[[`6012e3e781`](https://github.com/nodejs/node/commit/6012e3e781)] - **stream**: 修复 Writable.destroy 性能回退 (Robert Nagy) [#50478](https://github.com/nodejs/node/pull/50478)
* \[[`dd5206820c`](https://github.com/nodejs/node/commit/dd5206820c)] - **stream**: 预分配 \_events (Robert Nagy) [#50428](https://github.com/nodejs/node/pull/50428)
* \[[`829b82ed0f`](https://github.com/nodejs/node/commit/829b82ed0f)] - **stream**: 移除不再相关的注释 (Robert Nagy) [#50446](https://github.com/nodejs/node/pull/50446)
* \[[`98ae1b4132`](https://github.com/nodejs/node/commit/98ae1b4132)] - **stream**: 使用位字段表示 construct/destroy (Robert Nagy) [#50408](https://github.com/nodejs/node/pull/50408)
* \[[`08a0c6c56c`](https://github.com/nodejs/node/commit/08a0c6c56c)] - **stream**: 改善 from 性能 (Raz Luvaton) [#50359](https://github.com/nodejs/node/pull/50359)
* \[[`59f7316b8f`](https://github.com/nodejs/node/commit/59f7316b8f)] - **stream**: 避免调用 listenerCount (Robert Nagy) [#50357](https://github.com/nodejs/node/pull/50357)
* \[[`9d52430eb9`](https://github.com/nodejs/node/commit/9d52430eb9)] - **stream**: readable 使用位图访问器 (Robert Nagy) [#50350](https://github.com/nodejs/node/pull/50350)
* \[[`139d6c8d3b`](https://github.com/nodejs/node/commit/139d6c8d3b)] - **stream**: 为 Readable buffer 使用 Array (Robert Nagy) [#50341](https://github.com/nodejs/node/pull/50341)
* \[[`6206957e8d`](https://github.com/nodejs/node/commit/6206957e8d)] - **stream**: 优化创建过程 (Robert Nagy) [#50337](https://github.com/nodejs/node/pull/50337)
* \[[`f87921de3b`](https://github.com/nodejs/node/commit/f87921de3b)] - **stream**: 重构 writable 的 \_write (Robert Nagy) [#50198](https://github.com/nodejs/node/pull/50198)
* \[[`b338f3d3c2`](https://github.com/nodejs/node/commit/b338f3d3c2)] - **stream**: 避免为 defaultEncoding 使用 getter (Robert Nagy) [#50203](https://github.com/nodejs/node/pull/50203)
* \[[`1862235a26`](https://github.com/nodejs/node/commit/1862235a26)] - **test**: 修复 v8 未标准化字母数字路径的消息 (Jithil P Ponnan) [#50730](https://github.com/nodejs/node/pull/50730)
* \[[`7c28a4ca8f`](https://github.com/nodejs/node/commit/7c28a4ca8f)] - **test**: 修复 c-ares 更新到 1.21.0+ 后的 dns 测试失败 (Brad House) [#50743](https://github.com/nodejs/node/pull/50743)
* \[[`4544593d31`](https://github.com/nodejs/node/commit/4544593d31)] - **test**: 用 for of 替换 forEach (Conor Watson) [#50594](https://github.com/nodejs/node/pull/50594)
* \[[`96143a3293`](https://github.com/nodejs/node/commit/96143a3293)] - **test**: 在 test-webcrypto-sign-verify-ecdsa.js 中将 forEach 替换为 for (Alessandro Di Nisio) [#50795](https://github.com/nodejs/node/pull/50795)
* \[[`107b5e63c5`](https://github.com/nodejs/node/commit/107b5e63c5)] - **test**: 在 test-https-simple.js 中用 for 替换 foreach (Shikha Mehta) [#49793](https://github.com/nodejs/node/pull/49793)
* \[[`9b2e5e9db4`](https://github.com/nodejs/node/commit/9b2e5e9db4)] - **test**: 添加关于未解决规范问题的注释 (Mattias Buelens) [#50779](https://github.com/nodejs/node/pull/50779)
* \[[`edce637c1a`](https://github.com/nodejs/node/commit/edce637c1a)] - **test**: 添加关于 type owning 的 readable streams 的注释 (Mattias Buelens) [#50779](https://github.com/nodejs/node/pull/50779)
* \[[`641044670b`](https://github.com/nodejs/node/commit/641044670b)] - **test**: 在 test-url-relative 中用 for-of 替换 forEach (vitosorriso) [#50788](https://github.com/nodejs/node/pull/50788)
* \[[`75ee78438c`](https://github.com/nodejs/node/commit/75ee78438c)] - **test**: 在 test-tls-getprotocol.js 中用 for ... of 替换 forEach() (Steve Goode) [#50600](https://github.com/nodejs/node/pull/50600)
* \[[`24f9d3fbeb`](https://github.com/nodejs/node/commit/24f9d3fbeb)] - **test**: 为 encoding 启用 idlharness 测试 (Mattias Buelens) [#50778](https://github.com/nodejs/node/pull/50778)
* \[[`a9d290956e`](https://github.com/nodejs/node/commit/a9d290956e)] - **test**: 在 whatwg-encoding-custom-interop 中替换 forEach (Honza Machala) [#50607](https://github.com/nodejs/node/pull/50607)
* \[[`6584dd80f7`](https://github.com/nodejs/node/commit/6584dd80f7)] - **test**: 用 for-loop 替换 forEach() (Jan) [#50596](https://github.com/nodejs/node/pull/50596)
* \[[`be54a22869`](https://github.com/nodejs/node/commit/be54a22869)] - **test**: 改进 test-bootstrap-modules.js (Joyee Cheung) [#50708](https://github.com/nodejs/node/pull/50708)
* \[[`660e70e73b`](https://github.com/nodejs/node/commit/660e70e73b)] - **test**: 如果磁盘空间 < 120MB，则跳过 parallel/test-macos-app-sandbox (Joyee Cheung) [#50764](https://github.com/nodejs/node/pull/50764)
* \[[`5712c41122`](https://github.com/nodejs/node/commit/5712c41122)] - **test**: 用 for 替换 foreach (Markus Muschol) [#50599](https://github.com/nodejs/node/pull/50599)
* \[[`49e5f47b1c`](https://github.com/nodejs/node/commit/49e5f47b1c)] - **test**: 测试 streambase 已经有一个消费者 (Jithil P Ponnan) [#48059](https://github.com/nodejs/node/pull/48059)
* \[[`bb7d764c8e`](https://github.com/nodejs/node/commit/bb7d764c8e)] - **test**: 在 path extname 中将 forEach 改为 for...of (Kyriakos Markakis) [#50667](https://github.com/nodejs/node/pull/50667)
* \[[`4d28ced079`](https://github.com/nodejs/node/commit/4d28ced079)] - **test**: 用 for...of 替换 forEach (Ryan Williams) [#50611](https://github.com/nodejs/node/pull/50611)
* \[[`92a153ecde`](https://github.com/nodejs/node/commit/92a153ecde)] - **test**: 将 message v8 测试从 Python 迁移到 JS (Joshua LeMay) [#50421](https://github.com/nodejs/node/pull/50421)
* \[[`a376284d8a`](https://github.com/nodejs/node/commit/a376284d8a)] - **test**: 使用解构访问设置值 (Honza Jedlička) [#50609](https://github.com/nodejs/node/pull/50609)
* \[[`7b9b1fba27`](https://github.com/nodejs/node/commit/7b9b1fba27)] - **test**: 用 for .. of 替换 forEach() (Evgenia Blajer) [#50605](https://github.com/nodejs/node/pull/50605)
* \[[`9397b2da7e`](https://github.com/nodejs/node/commit/9397b2da7e)] - **test**: 在 test-readline-keys.js 中用 for ... of 替换 forEach() (William Liang) [#50604](https://github.com/nodejs/node/pull/50604)
* \[[`9043ba4cfb`](https://github.com/nodejs/node/commit/9043ba4cfb)] - **test**: 在 test-http2-single-headers.js 中用 for ... of 替换 forEach() (spiritualized) [#50606](https://github.com/nodejs/node/pull/50606)
* \[[`9f911d31f6`](https://github.com/nodejs/node/commit/9f911d31f6)] - **test**: 用 forEach 替换 for of (john-mcinall) [#50602](https://github.com/nodejs/node/pull/50602)
* \[[`8a5f36fe74`](https://github.com/nodejs/node/commit/8a5f36fe74)] - **test**: 移除未使用文件 (James Sumners) [#50528](https://github.com/nodejs/node/pull/50528)
* \[[`9950203340`](https://github.com/nodejs/node/commit/9950203340)] - **test**: 用 for of 替换 forEach (Kevin Kühnemund) [#50597](https://github.com/nodejs/node/pull/50597)
* \[[`03ba28f102`](https://github.com/nodejs/node/commit/03ba28f102)] - **test**: 用 for of 替换 forEach (CorrWu) [#49785](https://github.com/nodejs/node/pull/49785)
* \[[`ea61261b54`](https://github.com/nodejs/node/commit/ea61261b54)] - **test**: 用 for \[...] of 替换 forEach (Gabriel Bota) [#50615](https://github.com/nodejs/node/pull/50615)
* \[[`4349790913`](https://github.com/nodejs/node/commit/4349790913)] - **test**: 添加 WPT 报告测试时长 (Filip Skokan) [#50574](https://github.com/nodejs/node/pull/50574)
* \[[`7cacddfcc1`](https://github.com/nodejs/node/commit/7cacddfcc1)] - **test**: 在 test-global.js 中用 for ... of 循环替换 forEach() (Kajol) [#49772](https://github.com/nodejs/node/pull/49772)
* \[[`889f58d07f`](https://github.com/nodejs/node/commit/889f58d07f)] - **test**: 跳过 test-diagnostics-channel-memory-leak.js (Joyee Cheung) [#50327](https://github.com/nodejs/node/pull/50327)
* \[[`41644ee071`](https://github.com/nodejs/node/commit/41644ee071)] - **test**: 改进 `.env` 上的 `UV_THREADPOOL_SIZE` 测试 (Yagiz Nizipli) [#49213](https://github.com/nodejs/node/pull/49213)
* \[[`1db44b9a53`](https://github.com/nodejs/node/commit/1db44b9a53)] - **test**: 识别 wpt 完成错误 (Chengzhong Wu) [#50429](https://github.com/nodejs/node/pull/50429)
* \[[`ecfc951ddc`](https://github.com/nodejs/node/commit/ecfc951ddc)] - **test**: 报告 wpt 测试结果错误 (Chengzhong Wu) [#50429](https://github.com/nodejs/node/pull/50429)
* \[[`deb0351d95`](https://github.com/nodejs/node/commit/deb0351d95)] - **test**: 用 forEach() 替换 for...of (Ram) [#49794](https://github.com/nodejs/node/pull/49794)
* \[[`f885dfe5e3`](https://github.com/nodejs/node/commit/f885dfe5e3)] - **test**: 在 test-trace-events-http 中用 for...of 替换 forEach() (Chand) [#49795](https://github.com/nodejs/node/pull/49795)
* \[[`9dc63c56db`](https://github.com/nodejs/node/commit/9dc63c56db)] - **test**: 在 test-fs-realpath-buffer-encoding 中用 forEach 替换 for...of (Niya Shiyas) [#49804](https://github.com/nodejs/node/pull/49804)
* \[[`600d1260da`](https://github.com/nodejs/node/commit/600d1260da)] - **test**: 修复 LoongArch 设备上 test-cpu-prof-dir-worker.js 的超时问题 (Shi Pujin) [#50363](https://github.com/nodejs/node/pull/50363)
* \[[`099f5cfa0a`](https://github.com/nodejs/node/commit/099f5cfa0a)] - **test**: 修复 vm 断言中实际值和期望值的顺序 (Chengzhong Wu) [#50371](https://github.com/nodejs/node/pull/50371)
* \[[`a31f9bfe01`](https://github.com/nodejs/node/commit/a31f9bfe01)] - **test**: v8: 添加 test-linux-perf-logger 测试套件 (Luke Albao) [#50352](https://github.com/nodejs/node/pull/50352)
* \[[`6c59114947`](https://github.com/nodejs/node/commit/6c59114947)] - **test**: 确保检测到从不完成的 promises (Antoine du Hamel) [#50318](https://github.com/nodejs/node/pull/50318)
* \[[`9830ae4bf7`](https://github.com/nodejs/node/commit/9830ae4bf7)] - **test_runner**: 为各种 mock timer 问题添加测试 (Mika Fischer) [#50384](https://github.com/nodejs/node/pull/50384)
* \[[`2c72ed85fb`](https://github.com/nodejs/node/commit/2c72ed85fb)] - **test_runner**: 将 abortSignal 传递给测试文件 (Moshe Atlow) [#50630](https://github.com/nodejs/node/pull/50630)
* \[[`c33a84af11`](https://github.com/nodejs/node/commit/c33a84af11)] - **test_runner**: 用 for of 替换 forEach (Tom Haddad) [#50595](https://github.com/nodejs/node/pull/50595)
* \[[`29c68a22bb`](https://github.com/nodejs/node/commit/29c68a22bb)] - **test_runner**: 输出套件错误 (Moshe Atlow) [#50361](https://github.com/nodejs/node/pull/50361)
* \[[`e64378643d`](https://github.com/nodejs/node/commit/e64378643d)] - **(SEMVER-MINOR)** **test_runner**: 添加内置 lcov 报告器 (Phil Nash) [#50018](https://github.com/nodejs/node/pull/50018)
* \[[`4aaaff413b`](https://github.com/nodejs/node/commit/4aaaff413b)] - **test_runner**: 测试 mock promisified timers 的返回值 (Mika Fischer) [#50331](https://github.com/nodejs/node/pull/50331)
* \[[`4a830c2d9d`](https://github.com/nodejs/node/commit/4a830c2d9d)] - **(SEMVER-MINOR)** **test_runner**: 将 Date 添加到支持的 mock APIs 中 (Lucas Santos) [#48638](https://github.com/nodejs/node/pull/48638)
* \[[`842dc01def`](https://github.com/nodejs/node/commit/842dc01def)] - **(SEMVER-MINOR)** **test_runner, cli**: 添加 --test-timeout 标志 (Shubham Pandey) [#50443](https://github.com/nodejs/node/pull/50443)
* \[[`613a9072b7`](https://github.com/nodejs/node/commit/613a9072b7)] - **tls**: 修复在设置 cert 和 key 之前设置 cipher 的顺序 (Kumar Rishav) [#50186](https://github.com/nodejs/node/pull/50186)
* \[[`d905c61e16`](https://github.com/nodejs/node/commit/d905c61e16)] - **tls**: 对 `options.SNICallback` 使用 `validateFunction` (Deokjin Kim) [#50530](https://github.com/nodejs/node/pull/50530)
* \[[`c8d6dd58e7`](https://github.com/nodejs/node/commit/c8d6dd58e7)] - **tools**: 添加 macOS notarization verification 步骤 (Ulises Gascón) [#50833](https://github.com/nodejs/node/pull/50833)
* \[[`c9bd0b0c0f`](https://github.com/nodejs/node/commit/c9bd0b0c0f)] - **tools**: 使用 macOS keychain 对发布版进行 notarization (Ulises Gascón) [#50715](https://github.com/nodejs/node/pull/50715)
* \[[`932a5d7b2c`](https://github.com/nodejs/node/commit/932a5d7b2c)] - **tools**: 将 eslint 更新到 8.54.0 (Node.js GitHub Bot) [#50809](https://github.com/nodejs/node/pull/50809)
* \[[`d7114d97be`](https://github.com/nodejs/node/commit/d7114d97be)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.5.0 (Node.js GitHub Bot) [#50807](https://github.com/nodejs/node/pull/50807)
* \[[`93085cf844`](https://github.com/nodejs/node/commit/93085cf844)] - **tools**: 添加用于更新发布链接的工作流 (Michaël Zasso) [#50710](https://github.com/nodejs/node/pull/50710)
* \[[`66764c5d04`](https://github.com/nodejs/node/commit/66764c5d04)] - **tools**: 在 dep_updaters 中识别 GN 文件 (Cheng Zhao) [#50693](https://github.com/nodejs/node/pull/50693)
* \[[`2a451e176a`](https://github.com/nodejs/node/commit/2a451e176a)] - **tools**: 移除未使用文件 (Ulises Gascon) [#50622](https://github.com/nodejs/node/pull/50622)
* \[[`8ce6403230`](https://github.com/nodejs/node/commit/8ce6403230)] - **tools**: 更改 minimatch 安装策略 (Marco Ippolito) [#50476](https://github.com/nodejs/node/pull/50476)
* \[[`97778e2e77`](https://github.com/nodejs/node/commit/97778e2e77)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.3.1 (Node.js GitHub Bot) [#50675](https://github.com/nodejs/node/pull/50675)
* \[[`797f6a9ba8`](https://github.com/nodejs/node/commit/797f6a9ba8)] - **tools**: 添加 macOS notarization stapler (Ulises Gascón) [#50625](https://github.com/nodejs/node/pull/50625)
* \[[`8fa1319352`](https://github.com/nodejs/node/commit/8fa1319352)] - **tools**: 将 eslint 更新到 8.53.0 (Node.js GitHub Bot) [#50559](https://github.com/nodejs/node/pull/50559)
* \[[`592f57970f`](https://github.com/nodejs/node/commit/592f57970f)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.3.0 (Node.js GitHub Bot) [#50556](https://github.com/nodejs/node/pull/50556)
* \[[`2fd78fc39e`](https://github.com/nodejs/node/commit/2fd78fc39e)] - **tools**: 在文件变更前比较 ICU 校验和 (Michaël Zasso) [#50522](https://github.com/nodejs/node/pull/50522)
* \[[`631d710fc4`](https://github.com/nodejs/node/commit/631d710fc4)] - **tools**: 改进 update acorn-walk 脚本 (Marco Ippolito) [#50473](https://github.com/nodejs/node/pull/50473)
* \[[`33fd2af2ab`](https://github.com/nodejs/node/commit/33fd2af2ab)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.2.0 (Node.js GitHub Bot) [#50496](https://github.com/nodejs/node/pull/50496)
* \[[`22b7a74838`](https://github.com/nodejs/node/commit/22b7a74838)] - **tools**: 将 gyp-next 更新到 v0.16.1 (Michaël Zasso) [#50380](https://github.com/nodejs/node/pull/50380)
* \[[`f5ccab5005`](https://github.com/nodejs/node/commit/f5ccab5005)] - **tools**: 跳过 tools/gyp 上的 ruff (Michaël Zasso) [#50380](https://github.com/nodejs/node/pull/50380)
* \[[`408fd90508`](https://github.com/nodejs/node/commit/408fd90508)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.1.5 unified\@11.0.4 (Node.js GitHub Bot) [#50461](https://github.com/nodejs/node/pull/50461)
* \[[`685f936ccd`](https://github.com/nodejs/node/commit/685f936ccd)] - **tools**: 在依赖安装中避免 npm install (Marco Ippolito) [#50413](https://github.com/nodejs/node/pull/50413)
* \[[`7d43c5a094`](https://github.com/nodejs/node/commit/7d43c5a094)] - _**Revert**_ "**tools**: update doc dependencies" (Richard Lau) [#50414](https://github.com/nodejs/node/pull/50414)
* \[[`8fd67c2e3e`](https://github.com/nodejs/node/commit/8fd67c2e3e)] - **tools**: 更新文档依赖 (Node.js GitHub Bot) [#49988](https://github.com/nodejs/node/pull/49988)
* \[[`586becb507`](https://github.com/nodejs/node/commit/586becb507)] - **tools**: 仅在相关文件上运行 coverage CI (Antoine du Hamel) [#50349](https://github.com/nodejs/node/pull/50349)
* \[[`2d06eea6c5`](https://github.com/nodejs/node/commit/2d06eea6c5)] - **tools**: 将 eslint 更新到 8.52.0 (Node.js GitHub Bot) [#50326](https://github.com/nodejs/node/pull/50326)
* \[[`6a897baf16`](https://github.com/nodejs/node/commit/6a897baf16)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#50190](https://github.com/nodejs/node/pull/50190)
* \[[`e6e7f39b9e`](https://github.com/nodejs/node/commit/e6e7f39b9e)] - **util**: 提升 normalizeEncoding 的性能 (kylo5aby) [#50721](https://github.com/nodejs/node/pull/50721)
* \[[`3b6b1afa47`](https://github.com/nodejs/node/commit/3b6b1afa47)] - **v8,tools**: 暴露必要的 V8 defines (Cheng Zhao) [#50820](https://github.com/nodejs/node/pull/50820)
* \[[`2664012617`](https://github.com/nodejs/node/commit/2664012617)] - **vm**: 允许带有 referrer realm 的动态导入 (Chengzhong Wu) [#50360](https://github.com/nodejs/node/pull/50360)
* \[[`c6c0a74b54`](https://github.com/nodejs/node/commit/c6c0a74b54)] - **wasi**: 记录安全沙箱状态 (Guy Bedford) [#50396](https://github.com/nodejs/node/pull/50396)
* \[[`989814093e`](https://github.com/nodejs/node/commit/989814093e)] - **win,tools**: 将 Windows 签名升级到 smctl (Stefan Stojanovic) [#50956](https://github.com/nodejs/node/pull/50956)

<a id="20.10.0"></a>

## 2023-11-22，版本 20.10.0 'Iron'（LTS），@targos

### 显著变更

#### 用于切换模块默认值的 `--experimental-default-type` 标志

新的标志 `--experimental-default-type` 可用于切换 Node.js 使用的默认
模块系统。已经显式定义为 ES
模块或 CommonJS 的输入（例如通过 `package.json` 中的 `"type"` 字段、`.mjs`/`.cjs`
文件扩展名或 `--input-type` 标志指定的输入）不受影响。当前隐式为 CommonJS 的内容在
`--experimental-default-type=module` 下将改为按 ES 模块解释：

* 通过 `--eval` 或 STDIN 提供的字符串输入，如果未指定 `--input-type`。

* 以 `.js` 结尾或没有扩展名的文件，如果同一文件夹或任意父文件夹中没有
  `package.json` 文件。

* 以 `.js` 结尾或没有扩展名的文件，如果最近的父级
  `package.json` 字段中没有 `type` 字段；除非该文件夹位于
  `node_modules` 文件夹内。

此外，如果传入了 `--experimental-wasm-modules`，且文件包含 “magic bytes”
Wasm 头部，则无扩展名文件会被解释为 Wasm。

由 Geoffrey Booth 贡献，见 [#49869](https://github.com/nodejs/node/pull/49869)。

#### 在歧义 JavaScript 中检测 ESM 语法

新的标志 `--experimental-detect-module` 可用于在能检测到 ES
模块语法时自动运行 ES 模块。对于“歧义”文件，即
没有 `type` 字段的 `package.json` 的 `.js` 文件或无扩展名文件，Node.js
会解析文件以检测 ES 模块语法；如果检测到，则将该文件作为 ES 模块运行，否则将其作为 CommonJS 模块运行。对通过
`--eval` 或 `STDIN` 提供的字符串输入也同样适用。

我们希望在未来版本的 Node.js 中默认启用检测。检测会增加启动时间，因此我们鼓励所有人——尤其是包
作者——在 `package.json` 中添加 `type` 字段，即使是默认的
`"type": "commonjs"` 也应添加。存在 `type` 字段，或使用 `.mjs`、`.cjs`
等显式扩展名，将会退出检测。

由 Geoffrey Booth 贡献，见 [#50096](https://github.com/nodejs/node/pull/50096)。

#### 文件系统函数中的新的 `flush` 选项

在写入文件时，数据可能不会立即刷新到
永久存储。这会导致后续读取操作看到过期数据。
此 PR 为 `fs.writeFile` 系列函数添加了 `'flush'` 选项，它会在成功写入操作结束时
强制刷新数据。

由 Colin Ihrig 贡献，见 [#50009](https://github.com/nodejs/node/pull/50009) 和 [#50095](https://github.com/nodejs/node/pull/50095)。

#### 实验性的 WebSocket 客户端

添加了 `--experimental-websocket` 标志，用于新增一个 [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
全局对象，符合 [WHATWG 标准化定义](https://websockets.spec.whatwg.org/#the-websocket-interface)。

由 Matthew Aitken 贡献，见 [#49830](https://github.com/nodejs/node/pull/49830)。

#### vm：修复 vm.Script 的 V8 编译缓存支持

此前，自 v16.x 起，使用 `vm.Script`
重复编译相同源代码时，在为 `vm.Script` 添加 `importModuleDynamically` 支持后，
将不再命中 V8 编译缓存，导致
性能回退，并阻碍用户（尤其是 Jest 用户）从
v16.x 升级。

近期的修复使得在未使用 `--experimental-vm-modules` 时，即使存在
`importModuleDynamically` 选项，`vm.Script` 也可以再次命中编译缓存，
因此受性能回退影响的用户现在可以升级了。与此同时，相关工作也在持续进行，
以为 `vm.CompileFunction` 启用编译缓存支持。

由 Joyee Cheung 贡献，见 [#49950](https://github.com/nodejs/node/pull/49950)
和 [#50137](https://github.com/nodejs/node/pull/50137)。

#### 其他显著变更

* \[[`21453ae555`](https://github.com/nodejs/node/commit/21453ae555)] - **(SEMVER-MINOR)** **deps**: 将 uvwasi 更新到 0.0.19（Node.js GitHub Bot） [#49908](https://github.com/nodejs/node/pull/49908)
* \[[`ee65e44c31`](https://github.com/nodejs/node/commit/ee65e44c31)] - **esm**: 使用 import attributes 代替 import assertions（Antoine du Hamel） [#50140](https://github.com/nodejs/node/pull/50140)
* \[[`ffdc357167`](https://github.com/nodejs/node/commit/ffdc357167)] - **(SEMVER-MINOR)** **stream**: 允许将流类传递给 `stream.compose`（Alex Yang） [#50187](https://github.com/nodejs/node/pull/50187)
* \[[`4861ad6431`](https://github.com/nodejs/node/commit/4861ad6431)] - **stream**: 提升可读流读取性能（Raz Luvaton） [#50173](https://github.com/nodejs/node/pull/50173)
* \[[`4b27087b30`](https://github.com/nodejs/node/commit/4b27087b30)] - **stream**: 优化 Writable（Robert Nagy） [#50012](https://github.com/nodejs/node/pull/50012)
* \[[`709c6c0cab`](https://github.com/nodejs/node/commit/709c6c0cab)] - **(SEMVER-MINOR)** **test_runner, cli**: 添加 --test-concurrency 标志（Colin Ihrig） [#49996](https://github.com/nodejs/node/pull/49996)
* \[[`57efd5292c`](https://github.com/nodejs/node/commit/57efd5292c)] - **(SEMVER-MINOR)** **vm**: 使用 import attributes 代替 import assertions（Antoine du Hamel） [#50141](https://github.com/nodejs/node/pull/50141)

### 提交

* \[[`73757a5f42`](https://github.com/nodejs/node/commit/73757a5f42)] - **benchmark**: 修复 fs 基准测试中的竞态条件（Vinicius Lourenço） [#50035](https://github.com/nodejs/node/pull/50035)
* \[[`23269717bb`](https://github.com/nodejs/node/commit/23269717bb)] - **benchmark**: 为 accessSync 基准测试添加预热（Rafael Gonzaga） [#50073](https://github.com/nodejs/node/pull/50073)
* \[[`88611d199a`](https://github.com/nodejs/node/commit/88611d199a)] - **benchmark**: 改进 blob,file 基准测试配置（Vinícius Lourenço） [#49730](https://github.com/nodejs/node/pull/49730)
* \[[`b70757476c`](https://github.com/nodejs/node/commit/b70757476c)] - **benchmark**: 为 blob 添加新的基准测试（Vinícius Lourenço） [#49730](https://github.com/nodejs/node/pull/49730)
* \[[`458d9a82e3`](https://github.com/nodejs/node/commit/458d9a82e3)] - **buffer**: 删除 fromString 中不必要的赋值（Tobias Nießen） [#50199](https://github.com/nodejs/node/pull/50199)
* \[[`878c0b332e`](https://github.com/nodejs/node/commit/878c0b332e)] - **build**: 修复使用 Python 3.9 的 IBM i 构建（Richard Lau） [#48056](https://github.com/nodejs/node/pull/48056)
* \[[`773320e1de`](https://github.com/nodejs/node/commit/773320e1de)] - **crypto**: 确保 SubtleCrypto.importKey 中椭圆曲线上的点有效（Filip Skokan） [#50234](https://github.com/nodejs/node/pull/50234)
* \[[`edb0ffd7d4`](https://github.com/nodejs/node/commit/edb0ffd7d4)] - **crypto**: 使用 X509_ALGOR 访问器，而不是直接访问 X509_ALGOR（David Benjamin） [#50057](https://github.com/nodejs/node/pull/50057)
* \[[`3f98c06dbb`](https://github.com/nodejs/node/commit/3f98c06dbb)] - **crypto**: 处理 SharedArrayBuffer 被禁用的情况（Shelley Vohr） [#50034](https://github.com/nodejs/node/pull/50034)
* \[[`55485ff1cc`](https://github.com/nodejs/node/commit/55485ff1cc)] - **crypto**: 在加载无效 PFX 数据时返回清晰的错误（Tim Perry） [#49566](https://github.com/nodejs/node/pull/49566)
* \[[`68ec1e5eeb`](https://github.com/nodejs/node/commit/68ec1e5eeb)] - **deps**: 将 npm 升级到 10.2.3（npm 团队） [#50531](https://github.com/nodejs/node/pull/50531)
* \[[`b00c11ad7c`](https://github.com/nodejs/node/commit/b00c11ad7c)] - **deps**: V8: cherry-pick d90d4533b053（Michaël Zasso） [#50077](https://github.com/nodejs/node/pull/50077)
* \[[`e63aef91b4`](https://github.com/nodejs/node/commit/e63aef91b4)] - **deps**: V8: cherry-pick f7d000a7ae7b（Luke Albao） [#50077](https://github.com/nodejs/node/pull/50077)
* \[[`4b243b553a`](https://github.com/nodejs/node/commit/4b243b553a)] - **deps**: V8: cherry-pick 9721082687c9（Shi Pujin） [#50077](https://github.com/nodejs/node/pull/50077)
* \[[`9d3cdcbebf`](https://github.com/nodejs/node/commit/9d3cdcbebf)] - **deps**: V8: cherry-pick 840650f2ff4e（Michaël Zasso） [#50077](https://github.com/nodejs/node/pull/50077)
* \[[`0c40b513fd`](https://github.com/nodejs/node/commit/0c40b513fd)] - **deps**: V8: cherry-pick a1efa5343880（Michaël Zasso） [#50077](https://github.com/nodejs/node/pull/50077)
* \[[`68cddd79f7`](https://github.com/nodejs/node/commit/68cddd79f7)] - **deps**: 更新 openssl-3.0.12+quic1 的 archs 文件（Node.js GitHub Bot） [#50411](https://github.com/nodejs/node/pull/50411)
* \[[`3308189180`](https://github.com/nodejs/node/commit/3308189180)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.12+quic1（Node.js GitHub Bot） [#50411](https://github.com/nodejs/node/pull/50411)
* \[[`b61707e535`](https://github.com/nodejs/node/commit/b61707e535)] - **deps**: 将 ada 更新到 2.7.2（Node.js GitHub Bot） [#50338](https://github.com/nodejs/node/pull/50338)
* \[[`1aecf0c17b`](https://github.com/nodejs/node/commit/1aecf0c17b)] - **deps**: 将 corepack 更新到 0.22.0（Node.js GitHub Bot） [#50325](https://github.com/nodejs/node/pull/50325)
* \[[`f5924f174c`](https://github.com/nodejs/node/commit/f5924f174c)] - **deps**: 将 c-ares 更新到 1.20.1（Node.js GitHub Bot） [#50082](https://github.com/nodejs/node/pull/50082)
* \[[`b705e19a95`](https://github.com/nodejs/node/commit/b705e19a95)] - **deps**: 将 c-ares 更新到 1.20.0（Node.js GitHub Bot） [#50082](https://github.com/nodejs/node/pull/50082)
* \[[`f72cbb7e02`](https://github.com/nodejs/node/commit/f72cbb7e02)] - **deps**: V8: cherry-pick 25902244ad1a（Joyee Cheung） [#50156](https://github.com/nodejs/node/pull/50156)
* \[[`6547bd2493`](https://github.com/nodejs/node/commit/6547bd2493)] - **deps**: V8: cherry-pick ea996ad04a68（Antoine du Hamel） [#50183](https://github.com/nodejs/node/pull/50183)
* \[[`16fd730e95`](https://github.com/nodejs/node/commit/16fd730e95)] - **deps**: V8: cherry-pick a0fd3209dda8（Antoine du Hamel） [#50183](https://github.com/nodejs/node/pull/50183)
* \[[`614c3620c3`](https://github.com/nodejs/node/commit/614c3620c3)] - **deps**: 将 corepack 更新到 0.21.0（Node.js GitHub Bot） [#50088](https://github.com/nodejs/node/pull/50088)
* \[[`545aa74ae2`](https://github.com/nodejs/node/commit/545aa74ae2)] - **deps**: 将 simdutf 更新到 3.2.18（Node.js GitHub Bot） [#50091](https://github.com/nodejs/node/pull/50091)
* \[[`9302806c0a`](https://github.com/nodejs/node/commit/9302806c0a)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-fef5869（Node.js GitHub Bot） [#50085](https://github.com/nodejs/node/pull/50085)
* \[[`03bf5c5d9a`](https://github.com/nodejs/node/commit/03bf5c5d9a)] - **deps**: 将 googletest 更新到 2dd1c13（Node.js GitHub Bot） [#50081](https://github.com/nodejs/node/pull/50081)
* \[[`cd8e90690b`](https://github.com/nodejs/node/commit/cd8e90690b)] - **deps**: 将 googletest 更新到 e47544a（Node.js GitHub Bot） [#49982](https://github.com/nodejs/node/pull/49982)
* \[[`40672cfe53`](https://github.com/nodejs/node/commit/40672cfe53)] - **deps**: 将 ada 更新到 2.6.10（Node.js GitHub Bot） [#49984](https://github.com/nodejs/node/pull/49984)
* \[[`34c7eb0eb2`](https://github.com/nodejs/node/commit/34c7eb0eb2)] - **deps**: 修复对未声明函数 'ntohl' 和 'htons' 的调用（MatteoBax） [#49979](https://github.com/nodejs/node/pull/49979)
* \[[`03654b44b6`](https://github.com/nodejs/node/commit/03654b44b6)] - **deps**: 将 ada 更新到 2.6.9（Node.js GitHub Bot） [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`4c740b1dd8`](https://github.com/nodejs/node/commit/4c740b1dd8)] - **deps**: 将 ada 更新到 2.6.8（Node.js GitHub Bot） [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`759cf5a760`](https://github.com/nodejs/node/commit/759cf5a760)] - **deps**: 将 ada 更新到 2.6.7（Node.js GitHub Bot） [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`31a4e9781a`](https://github.com/nodejs/node/commit/31a4e9781a)] - **deps**: 将 ada 更新到 2.6.5（Node.js GitHub Bot） [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`2ca867f2ab`](https://github.com/nodejs/node/commit/2ca867f2ab)] - **deps**: 将 ada 更新到 2.6.3（Node.js GitHub Bot） [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`21453ae555`](https://github.com/nodejs/node/commit/21453ae555)] - **(SEMVER-MINOR)** **deps**: 将 uvwasi 更新到 0.0.19（Node.js GitHub Bot） [#49908](https://github.com/nodejs/node/pull/49908)
* \[[`7ca1228be8`](https://github.com/nodejs/node/commit/7ca1228be8)] - **deps**: V8: cherry-pick 8ec2651fbdd8（Abdirahim Musse） [#49862](https://github.com/nodejs/node/pull/49862)
* \[[`3cc41d253c`](https://github.com/nodejs/node/commit/3cc41d253c)] - **deps**: 将 npm 升级到 10.2.0（npm 团队） [#50027](https://github.com/nodejs/node/pull/50027)
* \[[`61b4afb7dd`](https://github.com/nodejs/node/commit/61b4afb7dd)] - **deps**: 将 undici 更新到 5.26.4（Node.js GitHub Bot） [#50274](https://github.com/nodejs/node/pull/50274)
* \[[`ea28738336`](https://github.com/nodejs/node/commit/ea28738336)] - **doc**: 将 loong64 信息添加到平台列表（Shi Pujin） [#50086](https://github.com/nodejs/node/pull/50086)
* \[[`00c12b7a20`](https://github.com/nodejs/node/commit/00c12b7a20)] - **doc**: 更新发布流程中的 LTS 步骤（Richard Lau） [#50299](https://github.com/nodejs/node/pull/50299)
* \[[`a9ba29ba10`](https://github.com/nodejs/node/commit/a9ba29ba10)] - **doc**: 修复发布流程目录（Richard Lau） [#50216](https://github.com/nodejs/node/pull/50216)
* \[[`4b5033519e`](https://github.com/nodejs/node/commit/4b5033519e)] - **doc**: 更新 api `stream.compose`（Alex Yang） [#50206](https://github.com/nodejs/node/pull/50206)
* \[[`d4659e2080`](https://github.com/nodejs/node/commit/d4659e2080)] - **doc**: 将 ReflectConstruct 添加到已知性能问题中（Vinicius Lourenço） [#50111](https://github.com/nodejs/node/pull/50111)
* \[[`ffa94612fd`](https://github.com/nodejs/node/commit/ffa94612fd)] - **doc**: 修复 dgram 文档中的拼写错误（Peter Johnson） [#50211](https://github.com/nodejs/node/pull/50211)
* \[[`f37b577b14`](https://github.com/nodejs/node/commit/f37b577b14)] - **doc**: 修复 H4ad 协作者排序（Vinicius Lourenço） [#50218](https://github.com/nodejs/node/pull/50218)
* \[[`c75264b1f9`](https://github.com/nodejs/node/commit/c75264b1f9)] - **doc**: 将 H4ad 添加到协作者中（Vinícius Lourenço） [#50217](https://github.com/nodejs/node/pull/50217)
* \[[`5025e24ac7`](https://github.com/nodejs/node/commit/5025e24ac7)] - **doc**: 更新 release-stewards 中的最后一个 sec-release（Rafael Gonzaga） [#50179](https://github.com/nodejs/node/pull/50179)
* \[[`63379313d5`](https://github.com/nodejs/node/commit/63379313d5)] - **doc**: 添加保持主分支同步的命令（Rafael Gonzaga） [#50102](https://github.com/nodejs/node/pull/50102)
* \[[`85de4b8254`](https://github.com/nodejs/node/commit/85de4b8254)] - **doc**: 将 loong64 添加到架构列表中（Shi Pujin） [#50172](https://github.com/nodejs/node/pull/50172)
* \[[`ff8e1b860e`](https://github.com/nodejs/node/commit/ff8e1b860e)] - **doc**: 更新安全发布流程（Michael Dawson） [#50166](https://github.com/nodejs/node/pull/50166)
* \[[`33470d965c`](https://github.com/nodejs/node/commit/33470d965c)] - **doc**: 改进 ccache 说明（Chengzhong Wu） [#50133](https://github.com/nodejs/node/pull/50133)
* \[[`7b97c44e2a`](https://github.com/nodejs/node/commit/7b97c44e2a)] - **doc**: 将 danielleadams 调整为 TSC 非投票成员（Danielle Adams） [#50142](https://github.com/nodejs/node/pull/50142)
* \[[`3d03ca9f31`](https://github.com/nodejs/node/commit/3d03ca9f31)] - **doc**: 修复 `fs.readdir` `recursive` 选项的描述（RamdohokarAngha） [#48902](https://github.com/nodejs/node/pull/48902)
* \[[`aab045ec4b`](https://github.com/nodejs/node/commit/aab045ec4b)] - **doc**: 提及在环境变量设置前读取的文件（Rafael Gonzaga） [#50072](https://github.com/nodejs/node/pull/50072)
* \[[`26a7608a24`](https://github.com/nodejs/node/commit/26a7608a24)] - **doc**: 将权限模型移至 Active Development（Rafael Gonzaga） [#50068](https://github.com/nodejs/node/pull/50068)
* \[[`d7bbf7f2c4`](https://github.com/nodejs/node/commit/d7bbf7f2c4)] - **doc**: 添加获取补丁版次和主版本的命令（Rafael Gonzaga） [#50067](https://github.com/nodejs/node/pull/50067)
* \[[`9830165e34`](https://github.com/nodejs/node/commit/9830165e34)] - **doc**: 在 fs 中使用更精确的 promise 术语（Benjamin Gruenbaum） [#50029](https://github.com/nodejs/node/pull/50029)
* \[[`585cbb211d`](https://github.com/nodejs/node/commit/585cbb211d)] - **doc**: 在 test runner 中使用更精确的术语（Benjamin Gruenbaum） [#50028](https://github.com/nodejs/node/pull/50028)
* \[[`2862f07124`](https://github.com/nodejs/node/commit/2862f07124)] - **doc**: 澄清如何运行示例的说明文字（Anshul Sinha） [#39020](https://github.com/nodejs/node/pull/39020)
* \[[`fe47c8ad91`](https://github.com/nodejs/node/commit/fe47c8ad91)] - **doc**: 为 Electron 28 保留 119（David Sanders） [#50020](https://github.com/nodejs/node/pull/50020)
* \[[`36ecd2c588`](https://github.com/nodejs/node/commit/36ecd2c588)] - **doc**: 更新协作者代词（Tierney Cyren） [#50005](https://github.com/nodejs/node/pull/50005)
* \[[`315d82a73e`](https://github.com/nodejs/node/commit/315d82a73e)] - **doc**: 更新 Abstract Modules Records 规范链接（Rich Trott） [#49961](https://github.com/nodejs/node/pull/49961)
* \[[`f63a92bb6c`](https://github.com/nodejs/node/commit/f63a92bb6c)] - **doc**: 更新 Windows 构建文档（Claudio W） [#49767](https://github.com/nodejs/node/pull/49767)
* \[[`ad17126501`](https://github.com/nodejs/node/commit/ad17126501)] - **doc**: 更新 CHANGELOG_V20 中关于 vm 修复的内容（Joyee Cheung） [#49951](https://github.com/nodejs/node/pull/49951)
* \[[`24458e2ac3`](https://github.com/nodejs/node/commit/24458e2ac3)] - **doc**: 记录危险的符号链接行为（Tobias Nießen） [#49154](https://github.com/nodejs/node/pull/49154)
* \[[`337a676d1f`](https://github.com/nodejs/node/commit/337a676d1f)] - **doc**: 为 API 文档添加主 ARIA 地标（Rich Trott） [#49882](https://github.com/nodejs/node/pull/49882)
* \[[`959ef7ac6b`](https://github.com/nodejs/node/commit/959ef7ac6b)] - **doc**: 为文档目录添加导航 ARIA 地标（Rich Trott） [#49882](https://github.com/nodejs/node/pull/49882)
* \[[`a60fbf2ab3`](https://github.com/nodejs/node/commit/a60fbf2ab3)] - **doc**: 将 Node.js 19 标记为生命周期结束（Richard Lau） [#48283](https://github.com/nodejs/node/pull/48283)
* \[[`c255575699`](https://github.com/nodejs/node/commit/c255575699)] - **errors**: 提升 determine-specific-type 的性能（Aras Abbasi） [#49696](https://github.com/nodejs/node/pull/49696)
* \[[`e66991e6b2`](https://github.com/nodejs/node/commit/e66991e6b2)] - **errors**: 改进 errors.js 中的 formatList（Aras Abbasi） [#49642](https://github.com/nodejs/node/pull/49642)
* \[[`c71e548b65`](https://github.com/nodejs/node/commit/c71e548b65)] - **errors**: 提升实例化性能（Aras Abbasi） [#49654](https://github.com/nodejs/node/pull/49654)
* \[[`3b867e4256`](https://github.com/nodejs/node/commit/3b867e4256)] - **esm**: 在检测文件格式时不要给出错误提示（Antoine du Hamel） [#50314](https://github.com/nodejs/node/pull/50314)
* \[[`a589a1a905`](https://github.com/nodejs/node/commit/a589a1a905)] - **(SEMVER-MINOR)** **esm**: 在歧义 JavaScript 中检测 ESM 语法（Geoffrey Booth） [#50096](https://github.com/nodejs/node/pull/50096)
* \[[`c64490e9aa`](https://github.com/nodejs/node/commit/c64490e9aa)] - **esm**: 改进对 ESM 语法的检查（Geoffrey Booth） [#50127](https://github.com/nodejs/node/pull/50127)
* \[[`ee65e44c31`](https://github.com/nodejs/node/commit/ee65e44c31)] - **esm**: 使用 import attributes 代替 import assertions（Antoine du Hamel） [#50140](https://github.com/nodejs/node/pull/50140)
* \[[`4de838fdeb`](https://github.com/nodejs/node/commit/4de838fdeb)] - **esm**: 在 --default-type 下绕过 CommonJS 加载器（Geoffrey Booth） [#49986](https://github.com/nodejs/node/pull/49986)
* \[[`27e02b633d`](https://github.com/nodejs/node/commit/27e02b633d)] - **esm**: 在模块作用域中取消对无扩展名 JavaScript 和 wasm 的标记限制（Geoffrey Booth） [#49974](https://github.com/nodejs/node/pull/49974)
* \[[`1e762ddf63`](https://github.com/nodejs/node/commit/1e762ddf63)] - **esm**: 提升 `getFormatOfExtensionlessFile` 速度（Yagiz Nizipli） [#49965](https://github.com/nodejs/node/pull/49965)
* \[[`112cc7f9f2`](https://github.com/nodejs/node/commit/112cc7f9f2)] - **esm**: 改进内部函数的 JSDoc 注释（Antoine du Hamel） [#49959](https://github.com/nodejs/node/pull/49959)
* \[[`c48cd84188`](https://github.com/nodejs/node/commit/c48cd84188)] - **esm**: 修复使用 file: URL 的 JSON 文件上的缓存冲突（Antoine du Hamel） [#49887](https://github.com/nodejs/node/pull/49887)
* \[[`dc80ccef25`](https://github.com/nodejs/node/commit/dc80ccef25)] - **esm**: 用于切换模块默认值的 --experimental-default-type 标志（Geoffrey Booth） [#49869](https://github.com/nodejs/node/pull/49869)
* \[[`01039795a2`](https://github.com/nodejs/node/commit/01039795a2)] - **esm**: 模块代码需要使用大括号（Geoffrey Booth） [#49657](https://github.com/nodejs/node/pull/49657)
* \[[`e49ebf8f9a`](https://github.com/nodejs/node/commit/e49ebf8f9a)] - **fs**: 提升 `readSync` 的错误性能（Jungku Lee） [#50033](https://github.com/nodejs/node/pull/50033)
* \[[`eb33f70260`](https://github.com/nodejs/node/commit/eb33f70260)] - **fs**: 提升 `fsyncSync` 的错误性能（Jungku Lee） [#49880](https://github.com/nodejs/node/pull/49880)
* \[[`8d0edc6399`](https://github.com/nodejs/node/commit/8d0edc6399)] - **fs**: 提升 `mkdirSync` 的错误性能（CanadaHonk） [#49847](https://github.com/nodejs/node/pull/49847)
* \[[`36df27509e`](https://github.com/nodejs/node/commit/36df27509e)] - **fs**: 提升 `realpathSync` 的错误性能（Yagiz Nizipli） [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`4242cb7d7f`](https://github.com/nodejs/node/commit/4242cb7d7f)] - **fs**: 提升 `lchownSync` 的错误性能（Yagiz Nizipli） [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`89e7878e44`](https://github.com/nodejs/node/commit/89e7878e44)] - **fs**: 提升 `symlinkSync` 的错误性能（Yagiz Nizipli） [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`af6a0611fe`](https://github.com/nodejs/node/commit/af6a0611fe)] - **fs**: 提升 `readlinkSync` 的错误性能（Yagiz Nizipli） [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`12cda31c52`](https://github.com/nodejs/node/commit/12cda31c52)] - **fs**: 提升 `mkdtempSync` 的错误性能（Yagiz Nizipli） [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`9dba771acb`](https://github.com/nodejs/node/commit/9dba771acb)] - **fs**: 提升 `linkSync` 的错误性能（Yagiz Nizipli） [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`ea7902de13`](https://github.com/nodejs/node/commit/ea7902de13)] - **fs**: 提升 `chownSync` 的错误性能（Yagiz Nizipli） [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`39f31a38cf`](https://github.com/nodejs/node/commit/39f31a38cf)] - **fs**: 提升 `renameSync` 的错误性能（Yagiz Nizipli） [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`35164fa466`](https://github.com/nodejs/node/commit/35164fa466)] - **(SEMVER-MINOR)** **fs**: 为 appendFile() 函数添加 flush 选项（Colin Ihrig） [#50095](https://github.com/nodejs/node/pull/50095)
* \[[`06aa4b9fe9`](https://github.com/nodejs/node/commit/06aa4b9fe9)] - **fs**: 提升 `readdirSync` 的错误性能（Yagiz Nizipli） [#50131](https://github.com/nodejs/node/pull/50131)
* \[[`b5aecebcd6`](https://github.com/nodejs/node/commit/b5aecebcd6)] - **fs**: 修复 `unlinkSync` 类型定义（Yagiz Nizipli） [#49859](https://github.com/nodejs/node/pull/49859)
* \[[`6ddea07225`](https://github.com/nodejs/node/commit/6ddea07225)] - **fs**: 提升同步 `chmod`+`fchmod` 的错误性能（CanadaHonk） [#49859](https://github.com/nodejs/node/pull/49859)
* \[[`841367078e`](https://github.com/nodejs/node/commit/841367078e)] - **fs**: 提升同步 `*times` 的错误性能（CanadaHonk） [#49864](https://github.com/nodejs/node/pull/49864)
* \[[`eb52f73e3e`](https://github.com/nodejs/node/commit/eb52f73e3e)] - **fs**: 提升 writevSync 的错误性能（IlyasShabi） [#50038](https://github.com/nodejs/node/pull/50038)
* \[[`d1aa62f1f5`](https://github.com/nodejs/node/commit/d1aa62f1f5)] - **fs**: 为 createWriteStream() 添加 flush 选项（Colin Ihrig） [#50093](https://github.com/nodejs/node/pull/50093)
* \[[`57eb06edff`](https://github.com/nodejs/node/commit/57eb06edff)] - **fs**: 提升 `ftruncateSync` 的错误性能（André Alves） [#50032](https://github.com/nodejs/node/pull/50032)
* \[[`22e3eb659a`](https://github.com/nodejs/node/commit/22e3eb659a)] - **fs**: 为 writeFile() 函数添加 flush 选项（Colin Ihrig） [#50009](https://github.com/nodejs/node/pull/50009)
* \[[`d7132d9214`](https://github.com/nodejs/node/commit/d7132d9214)] - **fs**: 提升 `fdatasyncSync` 的错误性能（Jungku Lee） [#49898](https://github.com/nodejs/node/pull/49898)
* \[[`bc2c0410d3`](https://github.com/nodejs/node/commit/bc2c0410d3)] - **fs**: 从同步分支抛出错误，而不是使用单独实现（Joyee Cheung） [#49913](https://github.com/nodejs/node/pull/49913)
* \[[`f46bcf1749`](https://github.com/nodejs/node/commit/f46bcf1749)] - **http**: 重构以使 servername 选项规范化可测试（Rongjian Zhang） [#38733](https://github.com/nodejs/node/pull/38733)
* \[[`1bfcf817af`](https://github.com/nodejs/node/commit/1bfcf817af)] - **http2**: 允许流在 goaway 之后平稳完成（Michael Lumish） [#50202](https://github.com/nodejs/node/pull/50202)
* \[[`5c66ec9e66`](https://github.com/nodejs/node/commit/5c66ec9e66)] - **inspector**: 简化 dispatchProtocolMessage（Daniel Lemire） [#49780](https://github.com/nodejs/node/pull/49780)
* \[[`251ae1dd72`](https://github.com/nodejs/node/commit/251ae1dd72)] - **lib**: 提升 validateStringArray 和 validateBooleanArray 的性能（Aras Abbasi） [#49756](https://github.com/nodejs/node/pull/49756)
* \[[`d9c791a508`](https://github.com/nodejs/node/commit/d9c791a508)] - **lib**: 修复 compileFunction 在负数情况下抛出范围错误的问题（Jithil P Ponnan） [#49855](https://github.com/nodejs/node/pull/49855)
* \[[`24cbc550c2`](https://github.com/nodejs/node/commit/24cbc550c2)] - **lib**: 降低 validateObject 的开销（Vinicius Lourenço） [#49928](https://github.com/nodejs/node/pull/49928)
* \[[`b80e9497f3`](https://github.com/nodejs/node/commit/b80e9497f3)] - **lib**: 让 fetch 变为同步并返回 Promise（Matthew Aitken） [#49936](https://github.com/nodejs/node/pull/49936)
* \[[`d9eda6761b`](https://github.com/nodejs/node/commit/d9eda6761b)] - **lib**: 修复 `primordials` 类型定义（Sam Verschueren） [#49895](https://github.com/nodejs/node/pull/49895)
* \[[`3e0d47c1f4`](https://github.com/nodejs/node/commit/3e0d47c1f4)] - **lib**: 更新 `HTTPRequestOptions` 的 jsdoc 参数（Jungku Lee） [#49872](https://github.com/nodejs/node/pull/49872)
* \[[`a01050dec4`](https://github.com/nodejs/node/commit/a01050dec4)] - **(SEMVER-MINOR)** **lib**: 添加 WebSocket 客户端（Matthew Aitken） [#49830](https://github.com/nodejs/node/pull/49830)
* \[[`5bca8feed2`](https://github.com/nodejs/node/commit/5bca8feed2)] - **lib,test**: 不要硬编码 Buffer.kMaxLength（Michaël Zasso） [#49876](https://github.com/nodejs/node/pull/49876)
* \[[`e8ebed7a24`](https://github.com/nodejs/node/commit/e8ebed7a24)] - **meta**: 将 Trott 调整为 TSC 正式成员（Rich Trott） [#50297](https://github.com/nodejs/node/pull/50297)
* \[[`27e957cea8`](https://github.com/nodejs/node/commit/27e957cea8)] - **meta**: 为卸任流程向 TSC 发送提醒（Tobias Nießen） [#50147](https://github.com/nodejs/node/pull/50147)
* \[[`fab39062d5`](https://github.com/nodejs/node/commit/fab39062d5)] - **meta**: 将 actions/upload-artifact 从 3.1.2 升级到 3.1.3（dependabot[bot]） [#50000](https://github.com/nodejs/node/pull/50000)
* \[[`46ec82496c`](https://github.com/nodejs/node/commit/46ec82496c)] - **meta**: 将 actions/cache 从 3.3.1 升级到 3.3.2（dependabot[bot]） [#50003](https://github.com/nodejs/node/pull/50003)
* \[[`a634fb431e`](https://github.com/nodejs/node/commit/a634fb431e)] - **meta**: 将 github/codeql-action 从 2.21.5 升级到 2.21.9（dependabot[bot]） [#50002](https://github.com/nodejs/node/pull/50002)
* \[[`c221f72911`](https://github.com/nodejs/node/commit/c221f72911)] - **meta**: 将 actions/checkout 从 3.6.0 升级到 4.1.0（dependabot[bot]） [#50001](https://github.com/nodejs/node/pull/50001)
* \[[`d356e5e395`](https://github.com/nodejs/node/commit/d356e5e395)] - **meta**: 用新名称更新 website 团队（Rich Trott） [#49883](https://github.com/nodejs/node/pull/49883)
* \[[`2ff4e71452`](https://github.com/nodejs/node/commit/2ff4e71452)] - **module**: 将 helpers 移出 cjs loader（Geoffrey Booth） [#49912](https://github.com/nodejs/node/pull/49912)
* \[[`142ac3f82d`](https://github.com/nodejs/node/commit/142ac3f82d)] - **module, esm**: modules 文件的 jsdoc（Geoffrey Booth） [#49523](https://github.com/nodejs/node/pull/49523)
* \[[`e2f0ef2a60`](https://github.com/nodejs/node/commit/e2f0ef2a60)] - **node-api**: 更新头文件以更好地支持 wasm（Toyo Li） [#49037](https://github.com/nodejs/node/pull/49037)
* \[[`db2a07fcd6`](https://github.com/nodejs/node/commit/db2a07fcd6)] - **node-api**: 直接从 GC 运行 finalizers（Vladimir Morozov） [#42651](https://github.com/nodejs/node/pull/42651)
* \[[`c25716be8b`](https://github.com/nodejs/node/commit/c25716be8b)] - **os**: 缓存 homedir，移除 getCheckedFunction（Aras Abbasi） [#50037](https://github.com/nodejs/node/pull/50037)
* \[[`e8f024b4db`](https://github.com/nodejs/node/commit/e8f024b4db)] - **perf_hooks**: 降低新的用户计时的开销（Vinicius Lourenço） [#49914](https://github.com/nodejs/node/pull/49914)
* \[[`a517be0a5a`](https://github.com/nodejs/node/commit/a517be0a5a)] - **perf_hooks**: 降低 performance observer entry list 的开销（Vinicius Lourenço） [#50008](https://github.com/nodejs/node/pull/50008)
* \[[`42e49ec381`](https://github.com/nodejs/node/commit/42e49ec381)] - **perf_hooks**: 降低新的资源计时的开销（Vinicius Lourenço） [#49837](https://github.com/nodejs/node/pull/49837)
* \[[`c99e51ed1b`](https://github.com/nodejs/node/commit/c99e51ed1b)] - **src**: 使用 --predictable 生成默认快照（Joyee Cheung） [#48749](https://github.com/nodejs/node/pull/48749)
* \[[`47164e238f`](https://github.com/nodejs/node/commit/47164e238f)] - **src**: 修复 ALPN 回调中的 TLSWrap 生命周期 bug（Ben Noordhuis） [#49635](https://github.com/nodejs/node/pull/49635)
* \[[`e1df69e73e`](https://github.com/nodejs/node/commit/e1df69e73e)] - **src**: 将 node_options 中的端口设为 uint16_t（Yagiz Nizipli） [#49151](https://github.com/nodejs/node/pull/49151)
* \[[`1eb2af29b4`](https://github.com/nodejs/node/commit/1eb2af29b4)] - **src**: 命名 scoped lock（Mohammed Keyvanzadeh） [#50010](https://github.com/nodejs/node/pull/50010)
* \[[`5131fde655`](https://github.com/nodejs/node/commit/5131fde655)] - **src**: 对 `uv_os_getenv` 使用精确返回值（Yagiz Nizipli） [#49149](https://github.com/nodejs/node/pull/49149)
* \[[`ba169be5ca`](https://github.com/nodejs/node/commit/ba169be5ca)] - **src**: 将 `node_file.h` 中的 const 变量移到 `node_file.cc`（Jungku Lee） [#49688](https://github.com/nodejs/node/pull/49688)
* \[[`5a2351d3ab`](https://github.com/nodejs/node/commit/5a2351d3ab)] - **src**: 移除未使用的变量（Michaël Zasso） [#49665](https://github.com/nodejs/node/pull/49665)
* \[[`f2f993a32f`](https://github.com/nodejs/node/commit/f2f993a32f)] - **stream**: 简化 prefinish（Robert Nagy） [#50204](https://github.com/nodejs/node/pull/50204)
* \[[`6d7274e3ca`](https://github.com/nodejs/node/commit/6d7274e3ca)] - **stream**: 缩小 readable bitmap details 的作用域（Robert Nagy） [#49963](https://github.com/nodejs/node/pull/49963)
* \[[`ffdc357167`](https://github.com/nodejs/node/commit/ffdc357167)] - **(SEMVER-MINOR)** **stream**: 允许向 `stream.compose` 传递流类（Alex Yang） [#50187](https://github.com/nodejs/node/pull/50187)
* \[[`4861ad6431`](https://github.com/nodejs/node/commit/4861ad6431)] - **stream**: 从 push 和 unshift 调用辅助函数（Raz Luvaton） [#50173](https://github.com/nodejs/node/pull/50173)
* \[[`e60b3ab31b`](https://github.com/nodejs/node/commit/e60b3ab31b)] - **stream**: 为 bitmap 状态使用私有符号（Robert Nagy） [#49993](https://github.com/nodejs/node/pull/49993)
* \[[`ecbfb23f6b`](https://github.com/nodejs/node/commit/ecbfb23f6b)] - **stream**: 延迟分配 back pressure buffer（Robert Nagy） [#50013](https://github.com/nodejs/node/pull/50013)
* \[[`88c739bef4`](https://github.com/nodejs/node/commit/88c739bef4)] - **stream**: 避免同步流的不必要 drain（Robert Nagy） [#50014](https://github.com/nodejs/node/pull/50014)
* \[[`4b27087b30`](https://github.com/nodejs/node/commit/4b27087b30)] - **stream**: 优化 Writable（Robert Nagy） [#50012](https://github.com/nodejs/node/pull/50012)
* \[[`def55f80a1`](https://github.com/nodejs/node/commit/def55f80a1)] - **stream**: 避免 writable 热路径中的 tick（Robert Nagy） [#49966](https://github.com/nodejs/node/pull/49966)
* \[[`35ec93115d`](https://github.com/nodejs/node/commit/35ec93115d)] - **stream**: writable state bitmap（Robert Nagy） [#49899](https://github.com/nodejs/node/pull/49899)
* \[[`6e0f0fafe4`](https://github.com/nodejs/node/commit/6e0f0fafe4)] - **test**: 使用 ppc 和 ppc64 跳过 PowerPC 上的 SEA 测试（Joyee Cheung） [#50828](https://github.com/nodejs/node/pull/50828)
* \[[`a528bbceca`](https://github.com/nodejs/node/commit/a528bbceca)] - **test**: 将 PowerPC 上的 SEA 测试标记为 flaky（Joyee Cheung） [#50750](https://github.com/nodejs/node/pull/50750)
* \[[`4e34f9a26e`](https://github.com/nodejs/node/commit/4e34f9a26e)] - **test**: 放宽与共享 OpenSSL 的版本检查（Luigi Pinca） [#50505](https://github.com/nodejs/node/pull/50505)
* \[[`41ca1132eb`](https://github.com/nodejs/node/commit/41ca1132eb)] - **test**: 修复 OpenSSL 3.x 的 crypto-dh 错误消息（Kerem Kat） [#50395](https://github.com/nodejs/node/pull/50395)
* \[[`a6a05e8a88`](https://github.com/nodejs/node/commit/a6a05e8a88)] - **test**: 修复针对 zlib 1.3 版本的测试套件（Dominique Leuenberger） [#50364](https://github.com/nodejs/node/pull/50364)
* \[[`8dd895e574`](https://github.com/nodejs/node/commit/8dd895e574)] - **test**: 在 test-process-env 中用 for..of 替换 forEach（Niya Shiyas） [#49825](https://github.com/nodejs/node/pull/49825)
* \[[`81886c66d1`](https://github.com/nodejs/node/commit/81886c66d1)] - **test**: 在 test-http-url 中用 for..of 替换 forEach（Niya Shiyas） [#49840](https://github.com/nodejs/node/pull/49840)
* \[[`7d8a18b257`](https://github.com/nodejs/node/commit/7d8a18b257)] - **test**: 改进 watch mode 测试（Moshe Atlow） [#50319](https://github.com/nodejs/node/pull/50319)
* \[[`baa04b79ca`](https://github.com/nodejs/node/commit/baa04b79ca)] - **test**: 将 `test-watch-mode-inspect` 标记为 flaky（Yagiz Nizipli） [#50259](https://github.com/nodejs/node/pull/50259)
* \[[`3d9130bc2e`](https://github.com/nodejs/node/commit/3d9130bc2e)] - _**Revert**_ "**test**: 将 `test-esm-loader-resolve-type` 标记为 flaky"（Antoine du Hamel） [#50315](https://github.com/nodejs/node/pull/50315)
* \[[`72626f9a35`](https://github.com/nodejs/node/commit/72626f9a35)] - **test**: 在 test-http-perf_hooks.js 中用 for..of 替换 forEach（Niya Shiyas） [#49818](https://github.com/nodejs/node/pull/49818)
* \[[`379a7255e8`](https://github.com/nodejs/node/commit/379a7255e8)] - **test**: 在 test-net-isipv4.js 中用 for..of 替换 forEach（Niya Shiyas） [#49822](https://github.com/nodejs/node/pull/49822)
* \[[`b55fcd75da`](https://github.com/nodejs/node/commit/b55fcd75da)] - **test**: 修复 `test-esm-loader-resolve-type` 的不稳定性（Antoine du Hamel） [#50273](https://github.com/nodejs/node/pull/50273)
* \[[`0134af3eeb`](https://github.com/nodejs/node/commit/0134af3eeb)] - **test**: 在 test-http2-server 中用 forEach 替换为 for..of（Niya Shiyas） [#49819](https://github.com/nodejs/node/pull/49819)
* \[[`8c15281d06`](https://github.com/nodejs/node/commit/8c15281d06)] - **test**: 在 test-http2-client-destroy.js 中用 forEach 替换为 for..of（Niya Shiyas） [#49820](https://github.com/nodejs/node/pull/49820)
* \[[`c37a75a898`](https://github.com/nodejs/node/commit/c37a75a898)] - **test**: 更新 `url` Web 平台测试（Yagiz Nizipli） [#50264](https://github.com/nodejs/node/pull/50264)
* \[[`ab5985d0e9`](https://github.com/nodejs/node/commit/ab5985d0e9)] - **test**: 将 `test-emit-after-on-destroyed` 标记为 flaky（Yagiz Nizipli） [#50246](https://github.com/nodejs/node/pull/50246)
* \[[`50181a19b8`](https://github.com/nodejs/node/commit/50181a19b8)] - **test**: 将 inspector async stack 测试标记为 flaky（Yagiz Nizipli） [#50244](https://github.com/nodejs/node/pull/50244)
* \[[`b9e0fed995`](https://github.com/nodejs/node/commit/b9e0fed995)] - **test**: 将 test-worker-nearheaplimit-deadlock 标记为 flaky（StefanStojanovic） [#50277](https://github.com/nodejs/node/pull/50277)
* \[[`2cfc4007d1`](https://github.com/nodejs/node/commit/2cfc4007d1)] - **test**: 将 `test-cli-node-options` 标记为 flaky（Yagiz Nizipli） [#50296](https://github.com/nodejs/node/pull/50296)
* \[[`788714b28f`](https://github.com/nodejs/node/commit/788714b28f)] - **test**: 减少请求和解析器数量（Luigi Pinca） [#50240](https://github.com/nodejs/node/pull/50240)
* \[[`0dce19c8f6`](https://github.com/nodejs/node/commit/0dce19c8f6)] - **test**: 将 crypto-timing 测试标记为 flaky（Yagiz Nizipli） [#50232](https://github.com/nodejs/node/pull/50232)
* \[[`5d4b5ff1b8`](https://github.com/nodejs/node/commit/5d4b5ff1b8)] - **test**: 将 `test-structuredclone-*` 标记为 flaky（Yagiz Nizipli） [#50261](https://github.com/nodejs/node/pull/50261)
* \[[`5c56081d67`](https://github.com/nodejs/node/commit/5c56081d67)] - **test**: 修复 `test-loaders-workers-spawned` 的不稳定性（Antoine du Hamel） [#50251](https://github.com/nodejs/node/pull/50251)
* \[[`3441e1982d`](https://github.com/nodejs/node/commit/3441e1982d)] - **test**: 提高 diagnostics_channel 的代码覆盖率（Jithil P Ponnan） [#50053](https://github.com/nodejs/node/pull/50053)
* \[[`696ba93329`](https://github.com/nodejs/node/commit/696ba93329)] - **test**: 将 `test-esm-loader-resolve-type` 标记为 flaky（Yagiz Nizipli） [#50226](https://github.com/nodejs/node/pull/50226)
* \[[`8b260c5d6d`](https://github.com/nodejs/node/commit/8b260c5d6d)] - **test**: 将 inspector async hook 测试标记为 flaky（Yagiz Nizipli） [#50252](https://github.com/nodejs/node/pull/50252)
* \[[`f3296d25e8`](https://github.com/nodejs/node/commit/f3296d25e8)] - **test**: 在 IBM i 上跳过 test-benchmark-os.js（Abdirahim Musse） [#50208](https://github.com/nodejs/node/pull/50208)
* \[[`fefe17b02e`](https://github.com/nodejs/node/commit/fefe17b02e)] - **test**: 将并行 http server 测试标记为 flaky（Yagiz Nizipli） [#50227](https://github.com/nodejs/node/pull/50227)
* \[[`228c87f329`](https://github.com/nodejs/node/commit/228c87f329)] - **test**: 将 test-worker-nearheaplimit-deadlock 标记为 flaky（Stefan Stojanovic） [#50238](https://github.com/nodejs/node/pull/50238)
* \[[`c2c2506eab`](https://github.com/nodejs/node/commit/c2c2506eab)] - **test**: 将 `test-runner-watch-mode` 标记为 flaky（Yagiz Nizipli） [#50221](https://github.com/nodejs/node/pull/50221)
* \[[`16a07983d4`](https://github.com/nodejs/node/commit/16a07983d4)] - **test**: 将 sea snapshot 测试标记为 flaky（Yagiz Nizipli） [#50223](https://github.com/nodejs/node/pull/50223)
* \[[`7cd406a0b8`](https://github.com/nodejs/node/commit/7cd406a0b8)] - **test**: 修复 defect path traversal 测试（Tobias Nießen） [#50124](https://github.com/nodejs/node/pull/50124)
* \[[`1cf3f8da32`](https://github.com/nodejs/node/commit/1cf3f8da32)] - **test**: 在 test-net-isipv6.js 中用 for..of 替换 forEach（Niya Shiyas） [#49823](https://github.com/nodejs/node/pull/49823)
* \[[`214997a99e`](https://github.com/nodejs/node/commit/214997a99e)] - **test**: 减少 test-heapdump-shadowrealm.js 中的重复次数（Chengzhong Wu） [#50104](https://github.com/nodejs/node/pull/50104)
* \[[`9d836516e6`](https://github.com/nodejs/node/commit/9d836516e6)] - **test**: 在 test-parse-args.mjs 中用 forEach 替换为 for..of（Niya Shiyas） [#49824](https://github.com/nodejs/node/pull/49824)
* \[[`fee8b24603`](https://github.com/nodejs/node/commit/fee8b24603)] - **test**: 在 test-net-perf_hooks 中用 for of 替换 forEach()（Narcisa Codreanu） [#49831](https://github.com/nodejs/node/pull/49831)
* \[[`4c58b92ba8`](https://github.com/nodejs/node/commit/4c58b92ba8)] - **test**: 将 forEach 改为 for...of（Tiffany Lastimosa） [#49799](https://github.com/nodejs/node/pull/49799)
* \[[`01b01527d7`](https://github.com/nodejs/node/commit/01b01527d7)] - **test**: 更新已移动的 `test-wasm-web-api` 的跳过规则（Richard Lau） [#49958](https://github.com/nodejs/node/pull/49958)
* \[[`179e293103`](https://github.com/nodejs/node/commit/179e293103)] - _**Revert**_ "**test**: 将 test-runner-output 标记为 flaky"（Luigi Pinca） [#49905](https://github.com/nodejs/node/pull/49905)
* \[[`829eb99afd`](https://github.com/nodejs/node/commit/829eb99afd)] - **test**: 区分 AIX 和 IBM i（Richard Lau） [#48056](https://github.com/nodejs/node/pull/48056)
* \[[`126407d438`](https://github.com/nodejs/node/commit/126407d438)] - **test**: 修复 test-perf-hooks 的不稳定性（Joyee Cheung） [#49892](https://github.com/nodejs/node/pull/49892)
* \[[`393fd5b7c9`](https://github.com/nodejs/node/commit/393fd5b7c9)] - **test**: 将消息错误测试从 Python 迁移到 JS（Yiyun Lei） [#49721](https://github.com/nodejs/node/pull/49721)
* \[[`5dfe4236f8`](https://github.com/nodejs/node/commit/5dfe4236f8)] - **test**: 修复 edge snapshot 堆栈跟踪（Geoffrey Booth） [#49659](https://github.com/nodejs/node/pull/49659)
* \[[`d164e537bf`](https://github.com/nodejs/node/commit/d164e537bf)] - **test,crypto**: 更新 WebCryptoAPI WPT（Filip Skokan） [#50039](https://github.com/nodejs/node/pull/50039)
* \[[`55a03fedae`](https://github.com/nodejs/node/commit/55a03fedae)] - **test_runner**: 为 FileTests 添加测试位置（Colin Ihrig） [#49999](https://github.com/nodejs/node/pull/49999)
* \[[`10b35cfb6e`](https://github.com/nodejs/node/commit/10b35cfb6e)] - **test_runner**: 用 else 替换多余的 if（Colin Ihrig） [#49943](https://github.com/nodejs/node/pull/49943)
* \[[`27558c4314`](https://github.com/nodejs/node/commit/27558c4314)] - **test_runner**: 捕获 reporter 错误（Moshe Atlow） [#49646](https://github.com/nodejs/node/pull/49646)
* \[[`709c6c0cab`](https://github.com/nodejs/node/commit/709c6c0cab)] - **(SEMVER-MINOR)** **test_runner, cli**: 添加 --test-concurrency 标志（Colin Ihrig） [#49996](https://github.com/nodejs/node/pull/49996)
* \[[`64ef108dd9`](https://github.com/nodejs/node/commit/64ef108dd9)] - **test_runner,test**: 修复不稳定的 test-runner-cli-concurrency.js（Colin Ihrig） [#50108](https://github.com/nodejs/node/pull/50108)
* \[[`d2def152d9`](https://github.com/nodejs/node/commit/d2def152d9)] - **tls**: 减少 TLS 'close' 事件监听器警告（Tim Perry） [#50136](https://github.com/nodejs/node/pull/50136)
* \[[`294b650f5c`](https://github.com/nodejs/node/commit/294b650f5c)] - **tls**: 处理原始 socket 被销毁的情况（Luigi Pinca） [#49980](https://github.com/nodejs/node/pull/49980)
* \[[`52b5693949`](https://github.com/nodejs/node/commit/52b5693949)] - **tls**: ciphers 允许 bang 语法（Chemi Atlow） [#49712](https://github.com/nodejs/node/pull/49712)
* \[[`05ee35028b`](https://github.com/nodejs/node/commit/05ee35028b)] - **tools**: 更新 `update-uncidi.sh` 和 `acorn_version.h` 中的注释（Jungku Lee） [#50175](https://github.com/nodejs/node/pull/50175)
* \[[`35b160e6a3`](https://github.com/nodejs/node/commit/35b160e6a3)] - **tools**: 重构 checkimports.py（Mohammed Keyvanzadeh） [#50011](https://github.com/nodejs/node/pull/50011)
* \[[`b959d36b77`](https://github.com/nodejs/node/commit/b959d36b77)] - **tools**: 修复引用 dep_updaters 脚本的注释（Keksonoid） [#50165](https://github.com/nodejs/node/pull/50165)
* \[[`bd5d5331b0`](https://github.com/nodejs/node/commit/bd5d5331b0)] - **tools**: 移除 no-return-await lint 规则（翠 / green） [#50118](https://github.com/nodejs/node/pull/50118)
* \[[`b9adf3d66e`](https://github.com/nodejs/node/commit/b9adf3d66e)] - **tools**: 更新 lint-md-dependencies（Node.js GitHub Bot） [#50083](https://github.com/nodejs/node/pull/50083)
* \[[`4978bdc4ec`](https://github.com/nodejs/node/commit/4978bdc4ec)] - **tools**: 将 eslint 更新到 8.51.0（Node.js GitHub Bot） [#50084](https://github.com/nodejs/node/pull/50084)
* \[[`e323a367fd`](https://github.com/nodejs/node/commit/e323a367fd)] - **tools**: 移除 genv8constants.py（Ben Noordhuis） [#50023](https://github.com/nodejs/node/pull/50023)
* \[[`1cc6cbff26`](https://github.com/nodejs/node/commit/1cc6cbff26)] - **tools**: 将 eslint 更新到 8.50.0（Node.js GitHub Bot） [#49989](https://github.com/nodejs/node/pull/49989)
* \[[`924231be2a`](https://github.com/nodejs/node/commit/924231be2a)] - **tools**: 更新 lint-md-dependencies（Node.js GitHub Bot） [#49983](https://github.com/nodejs/node/pull/49983)
* \[[`732b5661ea`](https://github.com/nodejs/node/commit/732b5661ea)] - **tools**: 为生成的 API 目录添加导航 ARIA 地标（Rich Trott） [#49882](https://github.com/nodejs/node/pull/49882)
* \[[`353a14278e`](https://github.com/nodejs/node/commit/353a14278e)] - **tools**: 将 github_reporter 更新到 1.5.3（Node.js GitHub Bot） [#49877](https://github.com/nodejs/node/pull/49877)
* \[[`0aaab45d7c`](https://github.com/nodejs/node/commit/0aaab45d7c)] - **tools**: 提升 macOS notarization 过程输出的可读性（Ulises Gascón） [#50389](https://github.com/nodejs/node/pull/50389)
* \[[`ad326033e2`](https://github.com/nodejs/node/commit/ad326033e2)] - **tools**: 移除未使用的 `version` 函数（Ulises Gascón） [#50390](https://github.com/nodejs/node/pull/50390)
* \[[`2f32472544`](https://github.com/nodejs/node/commit/2f32472544)] - **tools**: 放弃对使用 gon 进行 osx notarization 的支持（Ulises Gascón） [#50291](https://github.com/nodejs/node/pull/50291)
* \[[`3b1c15aeb0`](https://github.com/nodejs/node/commit/3b1c15aeb0)] - **tools**: 在未来版本中使用 osx notarytool（Ulises Gascon） [#48701](https://github.com/nodejs/node/pull/48701)
* \[[`0ddb87ede3`](https://github.com/nodejs/node/commit/0ddb87ede3)] - **typings**: 在类型中使用 `Symbol.dispose` 和 `Symbol.asyncDispose`（Niklas Mollenhauer） [#50123](https://github.com/nodejs/node/pull/50123)
* \[[`bf5b2115a0`](https://github.com/nodejs/node/commit/bf5b2115a0)] - **util**: 从基准测试中移除内部 mime 函数（Aras Abbasi） [#50201](https://github.com/nodejs/node/pull/50201)
* \[[`ac02cdb0ad`](https://github.com/nodejs/node/commit/ac02cdb0ad)] - **util**: 延迟解析 mime 参数（Aras Abbasi） [#49889](https://github.com/nodejs/node/pull/49889)
* \[[`9853fd96df`](https://github.com/nodejs/node/commit/9853fd96df)] - **vm**: 在未使用 --experimental-vm-modules 时，拒绝 importModuleDynamically（Joyee Cheung） [#50137](https://github.com/nodejs/node/pull/50137)
* \[[`3697c19c80`](https://github.com/nodejs/node/commit/3697c19c80)] - **vm**: 使用 compileFunction 和 Script 的内部版本（Joyee Cheung） [#50137](https://github.com/nodejs/node/pull/50137)
* \[[`56bbc30a44`](https://github.com/nodejs/node/commit/56bbc30a44)] - **vm**: 在 vm.compileFunction 中统一 host-defined option 的生成（Joyee Cheung） [#50137](https://github.com/nodejs/node/pull/50137)
* \[[`57efd5292c`](https://github.com/nodejs/node/commit/57efd5292c)] - **(SEMVER-MINOR)** **vm**: 使用 import attributes 代替 import assertions（Antoine du Hamel） [#50141](https://github.com/nodejs/node/pull/50141)
* \[[`17581c2716`](https://github.com/nodejs/node/commit/17581c2716)] - **vm**: 当未设置 importModuleDynamically 时使用默认 HDO（Joyee Cheung） [#49950](https://github.com/nodejs/node/pull/49950)
* \[[`65e18aa8e7`](https://github.com/nodejs/node/commit/65e18aa8e7)] - **wasi**: 处理 Coverity 警告（Michael Dawson） [#49866](https://github.com/nodejs/node/pull/49866)
* \[[`5b695d6a8d`](https://github.com/nodejs/node/commit/5b695d6a8d)] - **wasi**: 修复 ibmi 的 wasi 测试（Michael Dawson） [#49953](https://github.com/nodejs/node/pull/49953)
* \[[`b86e1f5cbd`](https://github.com/nodejs/node/commit/b86e1f5cbd)] - **(SEMVER-MINOR)** **wasi**: 为最新 uvwasi 版本所需的更新（Michael Dawson） [#49908](https://github.com/nodejs/node/pull/49908)
* \[[`b4d149b4d6`](https://github.com/nodejs/node/commit/b4d149b4d6)] - **worker**: 处理来自不同上下文的分离 `MessagePort`（Juan José） [#49150](https://github.com/nodejs/node/pull/49150)
* \[[`f564ed4e05`](https://github.com/nodejs/node/commit/f564ed4e05)] - **zlib**: 修复 Android 上对 cpu-features.h 的发现（MatteoBax） [#49828](https://github.com/nodejs/node/pull/49828)

<a id="20.9.0"></a>

## 2023-10-24，版本 20.9.0 'Iron'（LTS），@richardlau

### 重要变更

此版本标志着 Node.js 20.x 过渡到长期支持（LTS），代号为 'Iron'。20.x 发布线现在进入“Active LTS”阶段，并将保持这一状态直到 2024 年 10 月。此后，它将进入“Maintenance”阶段，直到 2026 年 4 月生命结束。

### 已知问题

通过 `NODE_V8_COVERAGE` 环境变量收集代码覆盖率可能会导致挂起。这不被认为是 Node.js 20 中的回归问题（有些报告来自 Node.js 18）。有关更多信息，包括一些可能的解决方法，请参见问题 [#49344](https://github.com/nodejs/node/issues/49344)。

<a id="20.8.1"></a>

## 2023-10-13，版本 20.8.1（Current），@RafaelGSS

这是一个安全发布。

### 重要变更

以下 CVE 已在此版本中修复：

* [CVE-2023-44487](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-44487)：`nghttp2` 安全发布（高）
* [CVE-2023-45143](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-45143)：`undici` 安全发布（高）
* [CVE-2023-39332](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-39332)：通过存储在 Uint8Array 中的路径进行路径遍历（高）
* [CVE-2023-39331](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-39331)：权限模型未能正确防护路径遍历（高）
* [CVE-2023-38552](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-38552)：根据策略执行的完整性检查可被绕过（中）
* [CVE-2023-39333](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-39333)：通过 WebAssembly 导出名称进行代码注入（低）

有关每个漏洞的更详细信息，请参阅博客文章 [2023 年 10 月安全发布](https://nodejs.org/en/blog/vulnerability/october-2023-security-releases/)。

### 提交

* \[[`c86883e844`](https://github.com/nodejs/node/commit/c86883e844)] - **deps**：将 nghttp2 更新到 1.57.0（James M Snell） [#50121](https://github.com/nodejs/node/pull/50121)
* \[[`2860631359`](https://github.com/nodejs/node/commit/2860631359)] - **deps**：将 undici 更新到 v5.26.3（Matteo Collina） [#50153](https://github.com/nodejs/node/pull/50153)
* \[[`cd37838bf8`](https://github.com/nodejs/node/commit/cd37838bf8)] - **lib**：允许 deps 需要 `node` 前缀模块（Matthew Aitken） [#50047](https://github.com/nodejs/node/pull/50047)
* \[[`f5c90b2951`](https://github.com/nodejs/node/commit/f5c90b2951)] - **module**：修复通过导出名称进行的代码注入（Tobias Nießen） [nodejs-private/node-private#461](https://github.com/nodejs-private/node-private/pull/461)
* \[[`fa5dae1944`](https://github.com/nodejs/node/commit/fa5dae1944)] - **permission**：修复 Uint8Array 路径遍历（Tobias Nießen） [nodejs-private/node-private#456](https://github.com/nodejs-private/node-private/pull/456)
* \[[`cd35275111`](https://github.com/nodejs/node/commit/cd35275111)] - **permission**：改进路径遍历防护（Tobias Nießen） [nodejs-private/node-private#456](https://github.com/nodejs-private/node-private/pull/456)
* \[[`a4cb7fc7c0`](https://github.com/nodejs/node/commit/a4cb7fc7c0)] - **policy**：使用防篡改完整性检查函数（Tobias Nießen） [nodejs-private/node-private#462](https://github.com/nodejs-private/node-private/pull/462)

<a id="20.8.0"></a>

## 2023-09-28，版本 20.8.0（Current），@ruyadorno

### 重要变更

#### 流性能改进

对可写流和可读流的性能改进，将创建和销毁性能提升了 ±15%，并减少了 Node.js 中每个流占用的内存开销

由 Benjamin Gruenbaum 在 [#49745](https://github.com/nodejs/node/pull/49745) 和 Raz Luvaton 在 [#49834](https://github.com/nodejs/node/pull/49834) 贡献。

对可读 Web 流的性能改进，将可读流 async iterator 消费性能提升了 ±140%，并将可读流 `pipeTo` 消费性能提升了 ±60%

由 Raz Luvaton 在 [#49662](https://github.com/nodejs/node/pull/49662) 和 [#49690](https://github.com/nodejs/node/pull/49690) 贡献。

#### 使用 `importModuleDynamically` 选项重构 `vm` API 中的内存管理

此次重构解决了一系列长期存在的内存泄漏和 use-after-free 问题，涉及以下支持 `importModuleDynamically` 的 API：

* `vm.Script`
* `vm.compileFunction`
* `vm.SyntheticModule`
* `vm.SourceTextModule`

这应能帮助受影响的用户从旧版本 Node.js 升级。

由 Joyee Cheung 在 [#48510](https://github.com/nodejs/node/pull/48510) 贡献。

#### 其他重要变更

* \[[`32d4d29d02`](https://github.com/nodejs/node/commit/32d4d29d02)] - **deps**：添加 v8::Object::SetInternalFieldForNodeCore()（Joyee Cheung） [#49874](https://github.com/nodejs/node/pull/49874)
* \[[`0e686d096b`](https://github.com/nodejs/node/commit/0e686d096b)] - **doc**：弃用 `fs.F_OK`、`fs.R_OK`、`fs.W_OK`、`fs.X_OK`（Livia Medeiros） [#49683](https://github.com/nodejs/node/pull/49683)
* \[[`a5dd057540`](https://github.com/nodejs/node/commit/a5dd057540)] - **doc**：弃用 `util.toUSVString`（Yagiz Nizipli） [#49725](https://github.com/nodejs/node/pull/49725)
* \[[`7b6a73172f`](https://github.com/nodejs/node/commit/7b6a73172f)] - **doc**：弃用对返回 promise 的函数调用 `promisify`（Antoine du Hamel） [#49647](https://github.com/nodejs/node/pull/49647)
* \[[`1beefd5f16`](https://github.com/nodejs/node/commit/1beefd5f16)] - **esm**：将所有 hooks 设为 release candidate（Geoffrey Booth） [#49597](https://github.com/nodejs/node/pull/49597)
* \[[`b0ce78a75b`](https://github.com/nodejs/node/commit/b0ce78a75b)] - **module**：修复 SourceTextModule 和 ContextifySript 中的泄漏（Joyee Cheung） [#48510](https://github.com/nodejs/node/pull/48510)
* \[[`4e578f8ab1`](https://github.com/nodejs/node/commit/4e578f8ab1)] - **module**：修复 vm.SyntheticModule 的泄漏（Joyee Cheung） [#48510](https://github.com/nodejs/node/pull/48510)
* \[[`69e4218772`](https://github.com/nodejs/node/commit/69e4218772)] - **module**：在 WeakMap 中使用 symbol 来管理 host defined options（Joyee Cheung） [#48510](https://github.com/nodejs/node/pull/48510)
* \[[`14ece0aa76`](https://github.com/nodejs/node/commit/14ece0aa76)] - **(SEMVER-MINOR)** **src**：允许嵌入器覆盖 NODE_MODULE_VERSION（Cheng Zhao） [#49279](https://github.com/nodejs/node/pull/49279)
* \[[`9fd67fbff0`](https://github.com/nodejs/node/commit/9fd67fbff0)] - **stream**：在 writable state 中使用 bitmap（Raz Luvaton） [#49834](https://github.com/nodejs/node/pull/49834)
* \[[`0ccd4638ac`](https://github.com/nodejs/node/commit/0ccd4638ac)] - **stream**：在 readable state 中使用 bitmap（Benjamin Gruenbaum） [#49745](https://github.com/nodejs/node/pull/49745)
* \[[`7c5e322346`](https://github.com/nodejs/node/commit/7c5e322346)] - **stream**：改进 webstream readable async iterator 性能（Raz Luvaton） [#49662](https://github.com/nodejs/node/pull/49662)
* \[[`80b342cc38`](https://github.com/nodejs/node/commit/80b342cc38)] - **(SEMVER-MINOR)** **test_runner**：在 `run` 中接受 `testOnly`（Moshe Atlow） [#49753](https://github.com/nodejs/node/pull/49753)
* \[[`17a05b141d`](https://github.com/nodejs/node/commit/17a05b141d)] - **(SEMVER-MINOR)** **test_runner**：添加 junit reporter（Moshe Atlow） [#49614](https://github.com/nodejs/node/pull/49614)

### 提交

* \[[`4879e3fbbe`](https://github.com/nodejs/node/commit/4879e3fbbe)] - **benchmark**：为 ReadableStreams 的 read() 添加基准测试（Debadree Chatterjee） [#49622](https://github.com/nodejs/node/pull/49622)
* \[[`78a6c73157`](https://github.com/nodejs/node/commit/78a6c73157)] - **benchmark**：通过减少 chunk 数量来缩短 pipe-to 时间（Raz Luvaton） [#49577](https://github.com/nodejs/node/pull/49577)
* \[[`4126a6e4c9`](https://github.com/nodejs/node/commit/4126a6e4c9)] - **benchmark**：修复 webstream pipe-to（Raz Luvaton） [#49552](https://github.com/nodejs/node/pull/49552)
* \[[`6010a91825`](https://github.com/nodejs/node/commit/6010a91825)] - **bootstrap**：不要为快照展开 argv1（Joyee Cheung） [#49506](https://github.com/nodejs/node/pull/49506)
* \[[`8480280c4b`](https://github.com/nodejs/node/commit/8480280c4b)] - **bootstrap**：在编译代码缓存时只使用 isolate snapshot（Joyee Cheung） [#49288](https://github.com/nodejs/node/pull/49288)
* \[[`b30754aa87`](https://github.com/nodejs/node/commit/b30754aa87)] - **build**：使用 node 可执行文件运行 embedtest（Joyee Cheung） [#49506](https://github.com/nodejs/node/pull/49506)
* \[[`31db0b8e2b`](https://github.com/nodejs/node/commit/31db0b8e2b)] - **build**：在 configure.py 中添加 --write-snapshot-as-array-literals（Joyee Cheung） [#49312](https://github.com/nodejs/node/pull/49312)
* \[[`6fcb51d3ba`](https://github.com/nodejs/node/commit/6fcb51d3ba)] - **debugger**：使用 `internal/url.URL` 而不是 `url.parse`（LiviaMedeiros） [#49590](https://github.com/nodejs/node/pull/49590)
* \[[`32d4d29d02`](https://github.com/nodejs/node/commit/32d4d29d02)] - **deps**：添加 v8::Object::SetInternalFieldForNodeCore()（Joyee Cheung） [#49874](https://github.com/nodejs/node/pull/49874)
* \[[`ad37cadc3f`](https://github.com/nodejs/node/commit/ad37cadc3f)] - **deps**：V8：回移植 de9a5de2274f（Joyee Cheung） [#49703](https://github.com/nodejs/node/pull/49703)
* \[[`cdd1c66222`](https://github.com/nodejs/node/commit/cdd1c66222)] - **deps**：V8：cherry-pick b33bf2dfd261（Joyee Cheung） [#49703](https://github.com/nodejs/node/pull/49703)
* \[[`61d18d6473`](https://github.com/nodejs/node/commit/61d18d6473)] - **deps**：将 undici 更新到 5.24.0（Node.js GitHub Bot） [#49559](https://github.com/nodejs/node/pull/49559)
* \[[`b8a4fef393`](https://github.com/nodejs/node/commit/b8a4fef393)] - **deps**：从 uv.gyp 中移除 pthread-fixes.c（Ben Noordhuis） [#49744](https://github.com/nodejs/node/pull/49744)
* \[[`6c86c0683c`](https://github.com/nodejs/node/commit/6c86c0683c)] - **deps**：将 googletest 更新到 d1467f5（Node.js GitHub Bot） [#49676](https://github.com/nodejs/node/pull/49676)
* \[[`1424404742`](https://github.com/nodejs/node/commit/1424404742)] - **deps**：将 nghttp2 更新到 1.56.0（Node.js GitHub Bot） [#49582](https://github.com/nodejs/node/pull/49582)
* \[[`15b54ff95d`](https://github.com/nodejs/node/commit/15b54ff95d)] - **deps**：将 googletest 更新到 8a6feab（Node.js GitHub Bot） [#49463](https://github.com/nodejs/node/pull/49463)
* \[[`2ceab877c2`](https://github.com/nodejs/node/commit/2ceab877c2)] - **deps**：将 corepack 更新到 0.20.0（Node.js GitHub Bot） [#49464](https://github.com/nodejs/node/pull/49464)
* \[[`4814872ddc`](https://github.com/nodejs/node/commit/4814872ddc)] - **doc**：修正 `DEP0176` 编号（LiviaMedeiros） [#49858](https://github.com/nodejs/node/pull/49858)
* \[[`0e686d096b`](https://github.com/nodejs/node/commit/0e686d096b)] - **doc**：弃用 `fs.F_OK`、`fs.R_OK`、`fs.W_OK`、`fs.X_OK`（Livia Medeiros） [#49683](https://github.com/nodejs/node/pull/49683)
* \[[`5877c403a2`](https://github.com/nodejs/node/commit/5877c403a2)] - **doc**：添加 mertcanaltin 作为 triager（mert.altin） [#49826](https://github.com/nodejs/node/pull/49826)
* \[[`864fe56432`](https://github.com/nodejs/node/commit/864fe56432)] - **doc**：将 `git node backport` 的方式加入回移植指南（Raz Luvaton） [#49760](https://github.com/nodejs/node/pull/49760)
* \[[`e0f93492d5`](https://github.com/nodejs/node/commit/e0f93492d5)] - **doc**：改进有关 ICU 数据回退的文档（Joyee Cheung） [#49666](https://github.com/nodejs/node/pull/49666)
* \[[`a5dd057540`](https://github.com/nodejs/node/commit/a5dd057540)] - **doc**：弃用 `util.toUSVString`（Yagiz Nizipli） [#49725](https://github.com/nodejs/node/pull/49725)
* \[[`774c1cfd52`](https://github.com/nodejs/node/commit/774c1cfd52)] - **doc**：为 `util.promisify` 示例添加缺失的函数调用（Jungku Lee） [#49719](https://github.com/nodejs/node/pull/49719)
* \[[`fe78a34845`](https://github.com/nodejs/node/commit/fe78a34845)] - **doc**：更新 `mimeParams.set()` 示例的输出（Deokjin Kim） [#49718](https://github.com/nodejs/node/pull/49718)
* \[[`4175ea33bd`](https://github.com/nodejs/node/commit/4175ea33bd)] - **doc**：为示例补充缺失的带 numericSeparator 的 `inspect`（Deokjin Kim） [#49717](https://github.com/nodejs/node/pull/49717)
* \[[`3a88571972`](https://github.com/nodejs/node/commit/3a88571972)] - **doc**：修正历史注释（Antoine du Hamel） [#49701](https://github.com/nodejs/node/pull/49701)
* \[[`db4ab1ccbb`](https://github.com/nodejs/node/commit/db4ab1ccbb)] - **doc**：补充 `import.meta.resolve` 缺失的历史信息（Antoine du Hamel） [#49700](https://github.com/nodejs/node/pull/49700)
* \[[`a304d1ee19`](https://github.com/nodejs/node/commit/a304d1ee19)] - **doc**：将维护 deps 的说明链接到 pull-request.md（Marco Ippolito） [#49716](https://github.com/nodejs/node/pull/49716)
* \[[`35294486ad`](https://github.com/nodejs/node/commit/35294486ad)] - **doc**：修复 `events` 中的打印结果（Jungku Lee） [#49548](https://github.com/nodejs/node/pull/49548)
* \[[`9f0b0e15c9`](https://github.com/nodejs/node/commit/9f0b0e15c9)] - **doc**：按字母顺序排列 cli.md 各节（Geoffrey Booth） [#49668](https://github.com/nodejs/node/pull/49668)
* \[[`7b6a73172f`](https://github.com/nodejs/node/commit/7b6a73172f)] - **doc**：弃用对返回 promise 的函数调用 `promisify`（Antoine du Hamel） [#49647](https://github.com/nodejs/node/pull/49647)
* \[[`d316b32fff`](https://github.com/nodejs/node/commit/d316b32fff)] - **doc**：更新 `corepack.md` 以适配 0.20.0 的变更（Antoine du Hamel） [#49486](https://github.com/nodejs/node/pull/49486)
* \[[`c2eac7dc7c`](https://github.com/nodejs/node/commit/c2eac7dc7c)] - **doc**：从 performance initiative 中移除 `@anonrig`（Yagiz Nizipli） [#49641](https://github.com/nodejs/node/pull/49641)
* \[[`3d839fbf87`](https://github.com/nodejs/node/commit/3d839fbf87)] - **doc**：将 Node.js 16 标记为生命结束（Richard Lau） [#49651](https://github.com/nodejs/node/pull/49651)
* \[[`53fb5aead8`](https://github.com/nodejs/node/commit/53fb5aead8)] - **doc**：保存 JS flavor 的用户偏好（Vidar Eldøy） [#49526](https://github.com/nodejs/node/pull/49526)
* \[[`e3594d5658`](https://github.com/nodejs/node/commit/e3594d5658)] - **doc**：更新 `node:process` 警告的文档（Shubham Pandey） [#49517](https://github.com/nodejs/node/pull/49517)
* \[[`8e033c3963`](https://github.com/nodejs/node/commit/8e033c3963)] - **doc**：重命名可能引起混淆的变量和 CSS 类（Antoine du Hamel） [#49536](https://github.com/nodejs/node/pull/49536)
* \[[`d0e0eb4bb3`](https://github.com/nodejs/node/commit/d0e0eb4bb3)] - **doc**：更新过时的历史信息（Antoine du Hamel） [#49530](https://github.com/nodejs/node/pull/49530)
* \[[`b4724e2e3a`](https://github.com/nodejs/node/commit/b4724e2e3a)] - **doc**：补上一个右括号（Sébastien Règne） [#49525](https://github.com/nodejs/node/pull/49525)
* \[[`0471c5798e`](https://github.com/nodejs/node/commit/0471c5798e)] - **doc**：在 addons.md 中将 GetInternalField() 返回类型转换为 v8::Value（Joyee Cheung） [#49439](https://github.com/nodejs/node/pull/49439)
* \[[`9f8bea3dda`](https://github.com/nodejs/node/commit/9f8bea3dda)] - **doc**：修复 child_process 中 input 选项的文档（Ariel Weiss） [#49481](https://github.com/nodejs/node/pull/49481)
* \[[`f3fea92f8a`](https://github.com/nodejs/node/commit/f3fea92f8a)] - **doc**：修复 `test.run` 代码示例中缺失的导入（Oshri Asulin） [#49489](https://github.com/nodejs/node/pull/49489)
* \[[`e426b77b67`](https://github.com/nodejs/node/commit/e426b77b67)] - **doc**：修复 fs.createWriteStream highWaterMark 选项的文档（Mert Can Altın） [#49456](https://github.com/nodejs/node/pull/49456)
* \[[`2b119108ff`](https://github.com/nodejs/node/commit/2b119108ff)] - **doc**：更新 node.js 网站的发布者说明（Claudio W） [#49427](https://github.com/nodejs/node/pull/49427)
* \[[`b9d4a80183`](https://github.com/nodejs/node/commit/b9d4a80183)] - **doc**：编辑 `import.meta.resolve` 文档（Antoine du Hamel） [#49247](https://github.com/nodejs/node/pull/49247)
* \[[`f67433f666`](https://github.com/nodejs/node/commit/f67433f666)] - **doc,tools**：切换到 `@node-core/utils`（Michaël Zasso） [#49851](https://github.com/nodejs/node/pull/49851)
* \[[`142e256fc5`](https://github.com/nodejs/node/commit/142e256fc5)] - **errors**：改进 errors.js 中的 classRegExp（Uzlopak） [#49643](https://github.com/nodejs/node/pull/49643)
* \[[`6377f1bce2`](https://github.com/nodejs/node/commit/6377f1bce2)] - **errors**：在更多错误消息中使用 `determineSpecificType`（Antoine du Hamel） [#49580](https://github.com/nodejs/node/pull/49580)
* \[[`05f0fcb4c4`](https://github.com/nodejs/node/commit/05f0fcb4c4)] - **esm**：识别导入带有无效主机的 url 的父级（Jacob Smith） [#49736](https://github.com/nodejs/node/pull/49736)
* \[[`8a6f5fb8f3`](https://github.com/nodejs/node/commit/8a6f5fb8f3)] - **esm**：修复 `import.meta.resolve` 的返回类型（Antoine du Hamel） [#49698](https://github.com/nodejs/node/pull/49698)
* \[[`a6140f1b8c`](https://github.com/nodejs/node/commit/a6140f1b8c)] - **esm**：更新 loaders 警告（Geoffrey Booth） [#49633](https://github.com/nodejs/node/pull/49633)
* \[[`521a9327e0`](https://github.com/nodejs/node/commit/521a9327e0)] - **esm**：修复 `register` 中对 `URL` 实例的支持（Antoine du Hamel） [#49655](https://github.com/nodejs/node/pull/49655)
* \[[`3a9ea0925a`](https://github.com/nodejs/node/commit/3a9ea0925a)] - **esm**：澄清 ERR_REQUIRE_ESM 错误（Daniel Compton） [#49521](https://github.com/nodejs/node/pull/49521)
* \[[`1beefd5f16`](https://github.com/nodejs/node/commit/1beefd5f16)] - **esm**：将所有 hooks 设为 release candidate（Geoffrey Booth） [#49597](https://github.com/nodejs/node/pull/49597)
* \[[`be48267888`](https://github.com/nodejs/node/commit/be48267888)] - **esm**：移除 `Module.register` 的返回值（Antoine du Hamel） [#49529](https://github.com/nodejs/node/pull/49529)
* \[[`e74a075124`](https://github.com/nodejs/node/commit/e74a075124)] - **esm**：重构 test-esm-loader-resolve-type（Geoffrey Booth） [#49493](https://github.com/nodejs/node/pull/49493)
* \[[`17823b3533`](https://github.com/nodejs/node/commit/17823b3533)] - **esm**：重构 test-esm-named-exports（Geoffrey Booth） [#49493](https://github.com/nodejs/node/pull/49493)
* \[[`f34bd15ac1`](https://github.com/nodejs/node/commit/f34bd15ac1)] - **esm**：重构 mocking 测试（Geoffrey Booth） [#49465](https://github.com/nodejs/node/pull/49465)
* \[[`ec323bbd99`](https://github.com/nodejs/node/commit/ec323bbd99)] - **fs**：在 node_file 中替换 `SetMethodNoSideEffect`（CanadaHonk） [#49857](https://github.com/nodejs/node/pull/49857)
* \[[`6acf800123`](https://github.com/nodejs/node/commit/6acf800123)] - **fs**：提升 `unlinkSync` 的错误性能（CanadaHonk） [#49856](https://github.com/nodejs/node/pull/49856)
* \[[`31702c9403`](https://github.com/nodejs/node/commit/31702c9403)] - **fs**：改进带文件描述符的 `readFileSync`（Yagiz Nizipli） [#49691](https://github.com/nodejs/node/pull/49691)
* \[[`835f9fe7b9`](https://github.com/nodejs/node/commit/835f9fe7b9)] - **fs**：修复文件描述符验证器（Yagiz Nizipli） [#49752](https://github.com/nodejs/node/pull/49752)
* \[[`b618fe262f`](https://github.com/nodejs/node/commit/b618fe262f)] - **fs**：提升 `opendirSync` 的错误性能（Yagiz Nizipli） [#49705](https://github.com/nodejs/node/pull/49705)
* \[[`938471ef55`](https://github.com/nodejs/node/commit/938471ef55)] - **fs**：提升同步方法的错误性能（Yagiz Nizipli） [#49593](https://github.com/nodejs/node/pull/49593)
* \[[`db3fc6d087`](https://github.com/nodejs/node/commit/db3fc6d087)] - **fs**：修复在未知文件类型下的 readdir 和 opendir 递归（William Marlow） [#49603](https://github.com/nodejs/node/pull/49603)
* \[[`0f020ed22d`](https://github.com/nodejs/node/commit/0f020ed22d)] - **gyp**：将 cctest 文件名放入变量（Cheng Zhao） [#49178](https://github.com/nodejs/node/pull/49178)
* \[[`0ce1e94d12`](https://github.com/nodejs/node/commit/0ce1e94d12)] - **lib**：更新 `WHATWG API` 中的编码集（Jungku Lee） [#49610](https://github.com/nodejs/node/pull/49610)
* \[[`efd6815a7a`](https://github.com/nodejs/node/commit/efd6815a7a)] - **lib**：修复 `internalBinding` 类型定义（Yagiz Nizipli） [#49742](https://github.com/nodejs/node/pull/49742)
* \[[`1287d5b74e`](https://github.com/nodejs/node/commit/1287d5b74e)] - **lib**：允许 'blob.stream()' 使用 byob reader（Debadree Chatterjee） [#49713](https://github.com/nodejs/node/pull/49713)
* \[[`bbc710522d`](https://github.com/nodejs/node/commit/bbc710522d)] - **lib**：在执行前重置 cwd 缓存（Maël Nison） [#49684](https://github.com/nodejs/node/pull/49684)
* \[[`f62d649e4d`](https://github.com/nodejs/node/commit/f62d649e4d)] - **lib**：使用内部 `fileURLToPath`（Deokjin Kim） [#49558](https://github.com/nodejs/node/pull/49558)
* \[[`e515046941`](https://github.com/nodejs/node/commit/e515046941)] - **lib**：使用内部 `pathToFileURL`（Livia Medeiros） [#49553](https://github.com/nodejs/node/pull/49553)
* \[[`00608e8070`](https://github.com/nodejs/node/commit/00608e8070)] - **lib**：在 freeze_intrinsics.js 中检查 SharedArrayBuffer 可用性（Milan Burda） [#49482](https://github.com/nodejs/node/pull/49482)
* \[[`8bfbe7079c`](https://github.com/nodejs/node/commit/8bfbe7079c)] - **meta**：修复 linter 错误（Antoine du Hamel） [#49755](https://github.com/nodejs/node/pull/49755)
* \[[`58f7a9e096`](https://github.com/nodejs/node/commit/58f7a9e096)] - **meta**：添加 primordials 战略计划（Benjamin Gruenbaum） [#49706](https://github.com/nodejs/node/pull/49706)
* \[[`5366027756`](https://github.com/nodejs/node/commit/5366027756)] - **meta**：将 github/codeql-action 从 2.21.2 升级到 2.21.5（dependabot[bot]） [#49438](https://github.com/nodejs/node/pull/49438)
* \[[`fe26b74082`](https://github.com/nodejs/node/commit/fe26b74082)] - **meta**：将 rtCamp/action-slack-notify 从 2.2.0 升级到 2.2.1（dependabot[bot]） [#49437](https://github.com/nodejs/node/pull/49437)
* \[[`b0ce78a75b`](https://github.com/nodejs/node/commit/b0ce78a75b)] - **module**：修复 SourceTextModule 和 ContextifySript 中的泄漏（Joyee Cheung） [#48510](https://github.com/nodejs/node/pull/48510)
* \[[`4e578f8ab1`](https://github.com/nodejs/node/commit/4e578f8ab1)] - **module**：修复 vm.SyntheticModule 的泄漏（Joyee Cheung） [#48510](https://github.com/nodejs/node/pull/48510)
* \[[`69e4218772`](https://github.com/nodejs/node/commit/69e4218772)] - **module**：在 WeakMap 中使用 symbol 来管理 host defined options（Joyee Cheung） [#48510](https://github.com/nodejs/node/pull/48510)
* \[[`96874e8fbc`](https://github.com/nodejs/node/commit/96874e8fbc)] - **node-api**：默认启用未捕获异常策略（Chengzhong Wu） [#49313](https://github.com/nodejs/node/pull/49313)
* \[[`b931aeadfd`](https://github.com/nodejs/node/commit/b931aeadfd)] - **perf_hooks**：降低 new performance_entries 的开销（Vinicius Lourenço） [#49803](https://github.com/nodejs/node/pull/49803)
* \[[`ad043bac31`](https://github.com/nodejs/node/commit/ad043bac31)] - **process**：为 heapsnapshot-signal 添加自定义目录支持（Jithil P Ponnan） [#47854](https://github.com/nodejs/node/pull/47854)
* \[[`8a7c10194c`](https://github.com/nodejs/node/commit/8a7c10194c)] - **repl**：不要在 .load 中累积多余缩进（Daniel X Moore） [#49461](https://github.com/nodejs/node/pull/49461)
* \[[`10a2adeed5`](https://github.com/nodejs/node/commit/10a2adeed5)] - **src**：在无法初始化 ICU 数据时改进错误消息（Joyee Cheung） [#49666](https://github.com/nodejs/node/pull/49666)
* \[[`ce37688bac`](https://github.com/nodejs/node/commit/ce37688bac)] - **src**：移除不必要的 todo（Rafael Gonzaga） [#49227](https://github.com/nodejs/node/pull/49227)
* \[[`f611583b71`](https://github.com/nodejs/node/commit/f611583b71)] - **src**：使用 SNAPSHOT_SERDES 记录快照序列化/反序列化（Joyee Cheung） [#49637](https://github.com/nodejs/node/pull/49637)
* \[[`a597cb8457`](https://github.com/nodejs/node/commit/a597cb8457)] - **src**：将 Pipe 移植到 uv_pipe_bind2、uv_pipe_connect2（Geoff Goodman） [#49667](https://github.com/nodejs/node/pull/49667)
* \[[`fb21062338`](https://github.com/nodejs/node/commit/fb21062338)] - **src**：显式设置 --rehash-snapshot（Joyee Cheung） [#49556](https://github.com/nodejs/node/pull/49556)
* \[[`14ece0aa76`](https://github.com/nodejs/node/commit/14ece0aa76)] - **(SEMVER-MINOR)** **src**：允许嵌入器覆盖 NODE_MODULE_VERSION（Cheng Zhao） [#49279](https://github.com/nodejs/node/pull/49279)
* \[[`4b5e23c71b`](https://github.com/nodejs/node/commit/4b5e23c71b)] - **src**：仅设置一次 ModuleWrap internal fields（Joyee Cheung） [#49391](https://github.com/nodejs/node/pull/49391)
* \[[`2d3f5c7cab`](https://github.com/nodejs/node/commit/2d3f5c7cab)] - **src**：修复 fs_type_to_name 默认值（Mustafa Ateş Uzun） [#49239](https://github.com/nodejs/node/pull/49239)
* \[[`cfbcb1059c`](https://github.com/nodejs/node/commit/cfbcb1059c)] - **src**：修复 StreamResource 上的注释（rogertyang） [#49193](https://github.com/nodejs/node/pull/49193)
* \[[`39fb83ad16`](https://github.com/nodejs/node/commit/39fb83ad16)] - **src**：不要依赖 internal field 默认值为 undefined（Joyee Cheung） [#49413](https://github.com/nodejs/node/pull/49413)
* \[[`9fd67fbff0`](https://github.com/nodejs/node/commit/9fd67fbff0)] - **stream**：在 writable state 中使用 bitmap（Raz Luvaton） [#49834](https://github.com/nodejs/node/pull/49834)
* \[[`0ccd4638ac`](https://github.com/nodejs/node/commit/0ccd4638ac)] - **stream**：在 readable state 中使用 bitmap（Benjamin Gruenbaum） [#49745](https://github.com/nodejs/node/pull/49745)
* \[[`b29d927010`](https://github.com/nodejs/node/commit/b29d927010)] - **stream**：改进 readable webstream 的 `pipeTo`（Raz Luvaton） [#49690](https://github.com/nodejs/node/pull/49690)
* \[[`7c5e322346`](https://github.com/nodejs/node/commit/7c5e322346)] - **stream**：改进 webstream readable async iterator 性能（Raz Luvaton） [#49662](https://github.com/nodejs/node/pull/49662)
* \[[`be211ef818`](https://github.com/nodejs/node/commit/be211ef818)] - **test**：消除 test-vm-contextified-script-leak 的不稳定性（Joyee Cheung） [#49710](https://github.com/nodejs/node/pull/49710)
* \[[`355f10dab2`](https://github.com/nodejs/node/commit/355f10dab2)] - **test**：在 vm 泄漏测试中使用 checkIfCollectable（Joyee Cheung） [#49671](https://github.com/nodejs/node/pull/49671)
* \[[`17cfc531aa`](https://github.com/nodejs/node/commit/17cfc531aa)] - **test**：在 test/common/gc.js 中添加 checkIfCollectable（Joyee Cheung） [#49671](https://github.com/nodejs/node/pull/49671)
* \[[`e49a573752`](https://github.com/nodejs/node/commit/e49a573752)] - **test**：增加 os setPriority、getPriority 的测试覆盖（Wael） [#38771](https://github.com/nodejs/node/pull/38771)
* \[[`5f02711522`](https://github.com/nodejs/node/commit/5f02711522)] - **test**：消除 test-runner-output 的不稳定性（Moshe Atlow） [#49878](https://github.com/nodejs/node/pull/49878)
* \[[`cd9754d6a7`](https://github.com/nodejs/node/commit/cd9754d6a7)] - **test**：将 test-runner-output 标记为 flaky（Joyee Cheung） [#49854](https://github.com/nodejs/node/pull/49854)
* \[[`5ad00424dd`](https://github.com/nodejs/node/commit/5ad00424dd)] - **test**：使用 mustSucceed 代替 mustCall（SiddharthDevulapalli） [#49788](https://github.com/nodejs/node/pull/49788)
* \[[`3db9b40081`](https://github.com/nodejs/node/commit/3db9b40081)] - **test**：将 test-readline-async-iterators 重构为基准测试（Shubham Pandey） [#49237](https://github.com/nodejs/node/pull/49237)
* \[[`2cc5ad7859`](https://github.com/nodejs/node/commit/2cc5ad7859)] - _**Revert**_ "**test**：将 test-http-regr-gh-2928 标记为 flaky"（Luigi Pinca） [#49708](https://github.com/nodejs/node/pull/49708)
* \[[`e5185b053c`](https://github.com/nodejs/node/commit/e5185b053c)] - **test**：为 `fs.access` 常量使用 `fs.constants`（Livia Medeiros） [#49685](https://github.com/nodejs/node/pull/49685)
* \[[`b9e5b43462`](https://github.com/nodejs/node/commit/b9e5b43462)] - **test**：消除 test-http-regr-gh-2928 的不稳定性（Luigi Pinca） [#49574](https://github.com/nodejs/node/pull/49574)
* \[[`1fffda504e`](https://github.com/nodejs/node/commit/1fffda504e)] - **test**：修复 embedtest 中的参数计算（Joyee Cheung） [#49506](https://github.com/nodejs/node/pull/49506)
* \[[`6e56f2db52`](https://github.com/nodejs/node/commit/6e56f2db52)] - **test**：在 Windows 上跳过 test-child-process-stdio-reuse-readable-stdio（Joyee Cheung） [#49621](https://github.com/nodejs/node/pull/49621)
* \[[`ab3afb330d`](https://github.com/nodejs/node/commit/ab3afb330d)] - **test**：将 test-runner-watch-mode 标记为 flaky（Joyee Cheung） [#49627](https://github.com/nodejs/node/pull/49627)
* \[[`185d9b50db`](https://github.com/nodejs/node/commit/185d9b50db)] - **test**：消除 test-tls-socket-close 的不稳定性（Luigi Pinca） [#49575](https://github.com/nodejs/node/pull/49575)
* \[[`c70c74a9e6`](https://github.com/nodejs/node/commit/c70c74a9e6)] - **test**：在 test-cli-syntax-require.js 失败时显示更多信息（Joyee Cheung） [#49561](https://github.com/nodejs/node/pull/49561)
* \[[`ed7c6d1114`](https://github.com/nodejs/node/commit/ed7c6d1114)] - **test**：将 test-http-regr-gh-2928 标记为 flaky（Joyee Cheung） [#49565](https://github.com/nodejs/node/pull/49565)
* \[[`3599eebab9`](https://github.com/nodejs/node/commit/3599eebab9)] - **test**：在 sea 测试中使用 spawnSyncAndExitWithoutError（Joyee Cheung） [#49543](https://github.com/nodejs/node/pull/49543)
* \[[`f79b153e89`](https://github.com/nodejs/node/commit/f79b153e89)] - **test**：在 test/common/sea.js 中使用 spawnSyncAndExitWithoutError（Joyee Cheung） [#49543](https://github.com/nodejs/node/pull/49543)
* \[[`c079c73769`](https://github.com/nodejs/node/commit/c079c73769)] - **test**：在 test-heapdump-shadowrealm.js 中使用 setImmediate()（Joyee Cheung） [#49573](https://github.com/nodejs/node/pull/49573)
* \[[`667a92493c`](https://github.com/nodejs/node/commit/667a92493c)] - **test**：在 Windows 上跳过 test-child-process-pipe-dataflow.js（Joyee Cheung） [#49563](https://github.com/nodejs/node/pull/49563)
* \[[`91af0a9a3c`](https://github.com/nodejs/node/commit/91af0a9a3c)] - _**Revert**_ "**test**：忽略复制的 entry_point.c"（Chengzhong Wu） [#49515](https://github.com/nodejs/node/pull/49515)
* \[[`567afc71b8`](https://github.com/nodejs/node/commit/567afc71b8)] - **test**：避免复制测试源文件（Chengzhong Wu） [#49515](https://github.com/nodejs/node/pull/49515)
* \[[`ced25a976d`](https://github.com/nodejs/node/commit/ced25a976d)] - **test**：增加 `Module.register` 和 `initialize` hook 的覆盖率（Antoine du Hamel） [#49532](https://github.com/nodejs/node/pull/49532)
* \[[`be02fbdb8a`](https://github.com/nodejs/node/commit/be02fbdb8a)] - **test**：隔离 `globalPreload` 测试（Geoffrey Booth） [#49545](https://github.com/nodejs/node/pull/49545)
* \[[`f214428845`](https://github.com/nodejs/node/commit/f214428845)] - **test**：拆分 test-crypto-dh 以避免 CI 中慢机器超时（Joyee Cheung） [#49492](https://github.com/nodejs/node/pull/49492)
* \[[`3987094569`](https://github.com/nodejs/node/commit/3987094569)] - **test**：使 `test-dotenv-node-options` 不受语言区域影响（Livia Medeiros） [#49470](https://github.com/nodejs/node/pull/49470)
* \[[`34c1741792`](https://github.com/nodejs/node/commit/34c1741792)] - **test**：为 `node:fs` 中的 urlstrings 用法添加测试（Livia Medeiros） [#49471](https://github.com/nodejs/node/pull/49471)
* \[[`c3c6c4f007`](https://github.com/nodejs/node/commit/c3c6c4f007)] - **test**：增强 test-worker-prof 的健壮性（Joyee Cheung） [#49274](https://github.com/nodejs/node/pull/49274)
* \[[`843df1a4da`](https://github.com/nodejs/node/commit/843df1a4da)] - **test,crypto**：更新 WebCryptoAPI WPT（Filip Skokan） [#49714](https://github.com/nodejs/node/pull/49714)
* \[[`80b342cc38`](https://github.com/nodejs/node/commit/80b342cc38)] - **(SEMVER-MINOR)** **test_runner**：在 `run` 中接受 `testOnly`（Moshe Atlow） [#49753](https://github.com/nodejs/node/pull/49753)
* \[[`76865515b9`](https://github.com/nodejs/node/commit/76865515b9)] - **test_runner**：在没有位置参数时修复 test runner watch mode（Moshe Atlow） [#49578](https://github.com/nodejs/node/pull/49578)
* \[[`17a05b141d`](https://github.com/nodejs/node/commit/17a05b141d)] - **(SEMVER-MINOR)** **test_runner**：添加 junit reporter（Moshe Atlow） [#49614](https://github.com/nodejs/node/pull/49614)
* \[[`5672e38457`](https://github.com/nodejs/node/commit/5672e38457)] - **test_runner**：为 mock.js 添加 jsdocs（Caio Borghi） [#49555](https://github.com/nodejs/node/pull/49555)
* \[[`b4d42a8f2b`](https://github.com/nodejs/node/commit/b4d42a8f2b)] - **test_runner**：修复无效的 timer 调用（Erick Wendel） [#49477](https://github.com/nodejs/node/pull/49477)
* \[[`f755e6786b`](https://github.com/nodejs/node/commit/f755e6786b)] - **test_runner**：为 MockTimers 添加 jsdocs（Erick Wendel） [#49476](https://github.com/nodejs/node/pull/49476)
* \[[`e7285d4bf0`](https://github.com/nodejs/node/commit/e7285d4bf0)] - **test_runner**：修复 typescript 覆盖率（Moshe Atlow） [#49406](https://github.com/nodejs/node/pull/49406)
* \[[`07a2e29bf3`](https://github.com/nodejs/node/commit/07a2e29bf3)] - **tools**：支持手动更新 @reporters/github（Moshe Atlow） [#49871](https://github.com/nodejs/node/pull/49871)
* \[[`5ac6722031`](https://github.com/nodejs/node/commit/5ac6722031)] - **tools**：跳过 tools/node_modules 上的 ruff（Moshe Atlow） [#49838](https://github.com/nodejs/node/pull/49838)
* \[[`462228bd24`](https://github.com/nodejs/node/commit/462228bd24)] - **tools**：修复 uvwasi 更新器（Michael Dawson） [#49682](https://github.com/nodejs/node/pull/49682)
* \[[`ff81bfb958`](https://github.com/nodejs/node/commit/ff81bfb958)] - **tools**：将 lint-md-dependencies 更新到 rollup@3.29.2（Node.js GitHub Bot） [#49679](https://github.com/nodejs/node/pull/49679)
* \[[`08ffc6344c`](https://github.com/nodejs/node/commit/08ffc6344c)] - **tools**：限制内部代码使用公开的 `url` 模块（LiviaMedeiros） [#49590](https://github.com/nodejs/node/pull/49590)
* \[[`728ebf6c97`](https://github.com/nodejs/node/commit/728ebf6c97)] - **tools**：将 eslint 更新到 8.49.0（Node.js GitHub Bot） [#49586](https://github.com/nodejs/node/pull/49586)
* \[[`20d038ffb1`](https://github.com/nodejs/node/commit/20d038ffb1)] - **tools**：将 lint-md-dependencies 更新到 rollup@3.29.0 unified@11.0.3（Node.js GitHub Bot） [#49584](https://github.com/nodejs/node/pull/49584)
* \[[`210c15bd12`](https://github.com/nodejs/node/commit/210c15bd12)] - **tools**：允许在 js2c 中传入 config.gypi 的绝对路径（Cheng Zhao） [#49162](https://github.com/nodejs/node/pull/49162)
* \[[`e341efe173`](https://github.com/nodejs/node/commit/e341efe173)] - **tools**：正确配置 never-stale 标签（Michaël Zasso） [#49498](https://github.com/nodejs/node/pull/49498)
* \[[`a8a8a498ce`](https://github.com/nodejs/node/commit/a8a8a498ce)] - **tools**：更新文档依赖（Node.js GitHub Bot） [#49467](https://github.com/nodejs/node/pull/49467)
* \[[`ac06607f9e`](https://github.com/nodejs/node/commit/ac06607f9e)] - **typings**：修复 `ExportedHooks` 中缺失的属性（Antoine du Hamel） [#49567](https://github.com/nodejs/node/pull/49567)
* \[[`097b59807a`](https://github.com/nodejs/node/commit/097b59807a)] - **url**：改进无效 url 的性能（Yagiz Nizipli） [#49692](https://github.com/nodejs/node/pull/49692)
* \[[`7c2060cfac`](https://github.com/nodejs/node/commit/7c2060cfac)] - **util**：添加内部 util 函数 `getCwdSafe`（João Lenon） [#48434](https://github.com/nodejs/node/pull/48434)
* \[[`c23c60f545`](https://github.com/nodejs/node/commit/c23c60f545)] - **zlib**：禁用 CRC32 SIMD 优化（Luigi Pinca） [#49511](https://github.com/nodejs/node/pull/49511)

<a id="20.7.0"></a>

## 2023-09-18，版本 20.7.0（当前），@UlisesGascon

### 显著变更

* \[[`022f1b70c1`](https://github.com/nodejs/node/commit/022f1b70c1)] - **src**: 支持多个 `--env-file` 声明 (Yagiz Nizipli) [#49542](https://github.com/nodejs/node/pull/49542)
* \[[`4a1d1cad61`](https://github.com/nodejs/node/commit/4a1d1cad61)] - **crypto**: 将根证书更新为 NSS 3.93 (Node.js GitHub Bot) [#49341](https://github.com/nodejs/node/pull/49341)
* \[[`a1a65f593c`](https://github.com/nodejs/node/commit/a1a65f593c)] - **deps**: 将 npm 升级到 10.1.0 (npm team) [#49570](https://github.com/nodejs/node/pull/49570)
* \[[`6c2480cad9`](https://github.com/nodejs/node/commit/6c2480cad9)] - **(SEMVER-MINOR)** **deps**: 将 npm 升级到 10.0.0 (npm team) [#49423](https://github.com/nodejs/node/pull/49423)
* \[[`bef900e56b`](https://github.com/nodejs/node/commit/bef900e56b)] - **doc**: 移动并重命名 loaders 部分 (Geoffrey Booth) [#49261](https://github.com/nodejs/node/pull/49261)
* \[[`db4ce8a593`](https://github.com/nodejs/node/commit/db4ce8a593)] - **doc**: 为 Ulises Gascon 添加发布密钥 (Ulises Gascón) [#49196](https://github.com/nodejs/node/pull/49196)
* \[[`11c85ffa98`](https://github.com/nodejs/node/commit/11c85ffa98)] - **(SEMVER-MINOR)** **lib**: 添加用于检测是否启用 source-maps 的 API (翠 / green) [#46391](https://github.com/nodejs/node/pull/46391)
* \[[`ec51e25ed7`](https://github.com/nodejs/node/commit/ec51e25ed7)] - **src,permission**: 添加多个 allow-fs-\* 标志 (Carlos Espa) [#49047](https://github.com/nodejs/node/pull/49047)
* \[[`efdc95fbc0`](https://github.com/nodejs/node/commit/efdc95fbc0)] - **(SEMVER-MINOR)** **test_runner**: 暴露测试的位置 (Colin Ihrig) [#48975](https://github.com/nodejs/node/pull/48975)

### 提交

* \[[`e84515594e`](https://github.com/nodejs/node/commit/e84515594e)] - **benchmark**: 使用 `tmpdir.resolve()` (Livia Medeiros) [#49137](https://github.com/nodejs/node/pull/49137)
* \[[`f37444e896`](https://github.com/nodejs/node/commit/f37444e896)] - **bootstrap**: 从反序列化的 isolate 构建代码缓存 (Joyee Cheung) [#49099](https://github.com/nodejs/node/pull/49099)
* \[[`af6dc1754d`](https://github.com/nodejs/node/commit/af6dc1754d)] - **bootstrap**: 不要在未完成初始化的 isolate 中生成代码缓存 (Joyee Cheung) [#49108](https://github.com/nodejs/node/pull/49108)
* \[[`cade5716df`](https://github.com/nodejs/node/commit/cade5716df)] - **build**: 如果需要，为 `compile_commands.json` 文件添加符号链接 (Juan José) [#49260](https://github.com/nodejs/node/pull/49260)
* \[[`34a2590b05`](https://github.com/nodejs/node/commit/34a2590b05)] - **build**: 扩大我们运行互联网测试的范围 (Michael Dawson) [#49218](https://github.com/nodejs/node/pull/49218)
* \[[`f637fd46ab`](https://github.com/nodejs/node/commit/f637fd46ab)] - **build**: 修复拼写错误 `libray` -> `library` (configure.py) (michalbiesek) [#49106](https://github.com/nodejs/node/pull/49106)
* \[[`ef3d8dd493`](https://github.com/nodejs/node/commit/ef3d8dd493)] - **crypto**: 移除 webcrypto EdDSA 密钥检查和属性 (Filip Skokan) [#49408](https://github.com/nodejs/node/pull/49408)
* \[[`4a1d1cad61`](https://github.com/nodejs/node/commit/4a1d1cad61)] - **crypto**: 将根证书更新为 NSS 3.93 (Node.js GitHub Bot) [#49341](https://github.com/nodejs/node/pull/49341)
* \[[`7eb10a38ea`](https://github.com/nodejs/node/commit/7eb10a38ea)] - **crypto**: 移除 getDefaultEncoding() (Tobias Nießen) [#49170](https://github.com/nodejs/node/pull/49170)
* \[[`772496c030`](https://github.com/nodejs/node/commit/772496c030)] - **crypto**: 移除 DiffieHellman 的默认编码 (Tobias Nießen) [#49169](https://github.com/nodejs/node/pull/49169)
* \[[`c795083232`](https://github.com/nodejs/node/commit/c795083232)] - **crypto**: 移除 Hash/Hmac 的默认编码 (Tobias Nießen) [#49167](https://github.com/nodejs/node/pull/49167)
* \[[`08197aa010`](https://github.com/nodejs/node/commit/08197aa010)] - **crypto**: 移除 sign/verify 的默认编码 (Tobias Nießen) [#49145](https://github.com/nodejs/node/pull/49145)
* \[[`a1a65f593c`](https://github.com/nodejs/node/commit/a1a65f593c)] - **deps**: 将 npm 升级到 10.1.0 (npm team) [#49570](https://github.com/nodejs/node/pull/49570)
* \[[`6c2480cad9`](https://github.com/nodejs/node/commit/6c2480cad9)] - **(SEMVER-MINOR)** **deps**: 将 npm 升级到 10.0.0 (npm team) [#49423](https://github.com/nodejs/node/pull/49423)
* \[[`84195d9584`](https://github.com/nodejs/node/commit/84195d9584)] - **deps**: 在 uv.gyp 中添加缺失的 thread-common.c (Santiago Gimeno) [#49410](https://github.com/nodejs/node/pull/49410)
* \[[`5b70b68b3d`](https://github.com/nodejs/node/commit/5b70b68b3d)] - **deps**: V8: 选择性回合并 eadaef581c29 (Adam Majer) [#49401](https://github.com/nodejs/node/pull/49401)
* \[[`fe34d632e8`](https://github.com/nodejs/node/commit/fe34d632e8)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-f5fd0ad (Node.js GitHub Bot) [#49252](https://github.com/nodejs/node/pull/49252)
* \[[`db4ce8a593`](https://github.com/nodejs/node/commit/db4ce8a593)] - **doc**: 为 Ulises Gascon 添加发布密钥 (Ulises Gascón) [#49196](https://github.com/nodejs/node/pull/49196)
* \[[`e5f3a694cf`](https://github.com/nodejs/node/commit/e5f3a694cf)] - **doc**: 修复 node-api 调用示例 (Chengzhong Wu) [#49395](https://github.com/nodejs/node/pull/49395)
* \[[`021345a724`](https://github.com/nodejs/node/commit/021345a724)] - **doc**: 为 Diagnostics WG 添加新闻议题 (Michael Dawson) [#49306](https://github.com/nodejs/node/pull/49306)
* \[[`f82347266b`](https://github.com/nodejs/node/commit/f82347266b)] - **doc**: 澄清 policy 预期 (Rafael Gonzaga) [#48947](https://github.com/nodejs/node/pull/48947)
* \[[`73cfd9c895`](https://github.com/nodejs/node/commit/73cfd9c895)] - **doc**: 为 `StringDecoder` 中的示例添加打印结果 (Jungku Lee) [#49326](https://github.com/nodejs/node/pull/49326)
* \[[`63ab591416`](https://github.com/nodejs/node/commit/63ab591416)] - **doc**: 更新对 NIST SP 800-131A 的过时引用 (Tobias Nießen) [#49316](https://github.com/nodejs/node/pull/49316)
* \[[`935dfe2afd`](https://github.com/nodejs/node/commit/935dfe2afd)] - **doc**: 在 `MockTimers` 中将块代码的类型改为 `cjs` (Deokjin Kim) [#49309](https://github.com/nodejs/node/pull/49309)
* \[[`7c0cd2fb87`](https://github.com/nodejs/node/commit/7c0cd2fb87)] - **doc**: 更新 `fs.cp` 的 `options.filter` 描述 (Shubham Pandey) [#49289](https://github.com/nodejs/node/pull/49289)
* \[[`f72e79ea67`](https://github.com/nodejs/node/commit/f72e79ea67)] - **doc**: 将 riscv64 添加到架构列表 (Stewart X Addison) [#49284](https://github.com/nodejs/node/pull/49284)
* \[[`d19c710064`](https://github.com/nodejs/node/commit/d19c710064)] - **doc**: 避免使用“当前不推荐” (Tobias Nießen) [#49300](https://github.com/nodejs/node/pull/49300)
* \[[`ae656101c0`](https://github.com/nodejs/node/commit/ae656101c0)] - **doc**: 更新 module hooks 文档 (Geoffrey Booth) [#49265](https://github.com/nodejs/node/pull/49265)
* \[[`fefbdb92f2`](https://github.com/nodejs/node/commit/fefbdb92f2)] - **doc**: 修改 `StringDecoder` 中 end()、write() 的参数描述 (Jungku Lee) [#49285](https://github.com/nodejs/node/pull/49285)
* \[[`59e66a1ebe`](https://github.com/nodejs/node/commit/59e66a1ebe)] - **doc**: 在发布文档中使用 NODE_API_SUPPORTED_VERSION_MAX (Cheng Zhao) [#49268](https://github.com/nodejs/node/pull/49268)
* \[[`ac3b88449b`](https://github.com/nodejs/node/commit/ac3b88449b)] - **doc**: 修复 `stream.finished` 文档中的拼写错误 (Antoine du Hamel) [#49271](https://github.com/nodejs/node/pull/49271)
* \[[`7428ebf6c3`](https://github.com/nodejs/node/commit/7428ebf6c3)] - **doc**: 更新 `WHATWG API` 中 `percent_encode` 集合的描述 (Jungku Lee) [#49258](https://github.com/nodejs/node/pull/49258)
* \[[`bef900e56b`](https://github.com/nodejs/node/commit/bef900e56b)] - **doc**: 移动并重命名 loaders 部分 (Geoffrey Booth) [#49261](https://github.com/nodejs/node/pull/49261)
* \[[`a22e0d9696`](https://github.com/nodejs/node/commit/a22e0d9696)] - **doc**: 澄清 n-api 中对 Uint8Array 的使用 (Fedor Indutny) [#48742](https://github.com/nodejs/node/pull/48742)
* \[[`1704f24cb9`](https://github.com/nodejs/node/commit/1704f24cb9)] - **doc**: 为 `module.register` 添加签名 (Geoffrey Booth) [#49251](https://github.com/nodejs/node/pull/49251)
* \[[`5a363bb01b`](https://github.com/nodejs/node/commit/5a363bb01b)] - **doc**: 说明自定义加载器中 `import.meta.resolve` 不可用 (Jacob Smith) [#49242](https://github.com/nodejs/node/pull/49242)
* \[[`8101f2b259`](https://github.com/nodejs/node/commit/8101f2b259)] - **doc**: 文档中使用与代码中相同的名称 (Hyunjin Kim) [#49216](https://github.com/nodejs/node/pull/49216)
* \[[`edf278d60d`](https://github.com/nodejs/node/commit/edf278d60d)] - **doc**: 在 PR 模板中添加 notable-change 标签说明 (Rafael Gonzaga) [#49188](https://github.com/nodejs/node/pull/49188)
* \[[`3df2251a6a`](https://github.com/nodejs/node/commit/3df2251a6a)] - **doc**: 为安全发布流程添加 h1 摘要 (Rafael Gonzaga) [#49112](https://github.com/nodejs/node/pull/49112)
* \[[`9fcd99a744`](https://github.com/nodejs/node/commit/9fcd99a744)] - **doc**: 默认更新为 semver-minor 发布 (Rafael Gonzaga) [#49175](https://github.com/nodejs/node/pull/49175)
* \[[`777931f499`](https://github.com/nodejs/node/commit/777931f499)] - **doc**: 修复 napi_async_init 中的措辞 (Tobias Nießen) [#49180](https://github.com/nodejs/node/pull/49180)
* \[[`f45c8e10c0`](https://github.com/nodejs/node/commit/f45c8e10c0)] - **doc,test**: 在权限模型中添加已知的路径解析问题 (Tobias Nießen) [#49155](https://github.com/nodejs/node/pull/49155)
* \[[`a6cfea3f74`](https://github.com/nodejs/node/commit/a6cfea3f74)] - **esm**: 对齐同步和异步加载实现 (Antoine du Hamel) [#49152](https://github.com/nodejs/node/pull/49152)
* \[[`9fac310b33`](https://github.com/nodejs/node/commit/9fac310b33)] - **fs**: 在 openAsBlob() 中添加 options 参数描述 (Yeseul Lee) [#49308](https://github.com/nodejs/node/pull/49308)
* \[[`92772a8175`](https://github.com/nodejs/node/commit/92772a8175)] - **fs**: 移除 readableWebStream() 中的冗余代码 (Deokjin Kim) [#49298](https://github.com/nodejs/node/pull/49298)
* \[[`88ba79b083`](https://github.com/nodejs/node/commit/88ba79b083)] - **fs**: 确保写入整个缓冲区 (Robert Nagy) [#49211](https://github.com/nodejs/node/pull/49211)
* \[[`11c85ffa98`](https://github.com/nodejs/node/commit/11c85ffa98)] - **(SEMVER-MINOR)** **lib**: 添加用于检测是否启用 source-maps 的 API (翠 / green) [#46391](https://github.com/nodejs/node/pull/46391)
* \[[`c12711ebfe`](https://github.com/nodejs/node/commit/c12711ebfe)] - **lib**: 在 JS WeakRef 之上实现 WeakReference (Joyee Cheung) [#49053](https://github.com/nodejs/node/pull/49053)
* \[[`9a0891f88d`](https://github.com/nodejs/node/commit/9a0891f88d)] - **meta**: 将 step-security/harden-runner 从 2.5.0 升级到 2.5.1 (dependabot[bot]) [#49435](https://github.com/nodejs/node/pull/49435)
* \[[`ae67f41ef1`](https://github.com/nodejs/node/commit/ae67f41ef1)] - **meta**: 将 actions/checkout 从 3.5.3 升级到 3.6.0 (dependabot[bot]) [#49436](https://github.com/nodejs/node/pull/49436)
* \[[`71b4411fb2`](https://github.com/nodejs/node/commit/71b4411fb2)] - **meta**: 将 actions/setup-node 从 3.7.0 升级到 3.8.1 (dependabot[bot]) [#49434](https://github.com/nodejs/node/pull/49434)
* \[[`83b7d3a395`](https://github.com/nodejs/node/commit/83b7d3a395)] - **meta**: 从 CODEOWNERS 中移除 modules 团队 (Benjamin Gruenbaum) [#49412](https://github.com/nodejs/node/pull/49412)
* \[[`81ff68c45c`](https://github.com/nodejs/node/commit/81ff68c45c)] - **meta**: 将一位或多位协作者转为 emeritus (Node.js GitHub Bot) [#49264](https://github.com/nodejs/node/pull/49264)
* \[[`ab975233cc`](https://github.com/nodejs/node/commit/ab975233cc)] - **meta**: 修改 GH 模板时提及 nodejs/tsc (Rafael Gonzaga) [#49189](https://github.com/nodejs/node/pull/49189)
* \[[`ceaa5494de`](https://github.com/nodejs/node/commit/ceaa5494de)] - **meta**: 将 test/reporters 添加到 codeowners (Chemi Atlow) [#49186](https://github.com/nodejs/node/pull/49186)
* \[[`de0a51b7cf`](https://github.com/nodejs/node/commit/de0a51b7cf)] - **net**: 提升 isIPv4 和 isIPv6 的性能 (Uzlopak) [#49568](https://github.com/nodejs/node/pull/49568)
* \[[`8d0913bf95`](https://github.com/nodejs/node/commit/8d0913bf95)] - **net**: 在 JS Socket Stream 中使用断言，以便将来捕获竞态 (Tim Perry) [#49400](https://github.com/nodejs/node/pull/49400)
* \[[`2486836a7d`](https://github.com/nodejs/node/commit/2486836a7d)] - **net**: 修复由于 JS Stream Sockets 同时 close/shutdown 导致的崩溃 (Tim Perry) [#49400](https://github.com/nodejs/node/pull/49400)
* \[[`7a808340cd`](https://github.com/nodejs/node/commit/7a808340cd)] - **node-api**: 修复 node_api.h 中的编译器警告 (Michael Graeb) [#49103](https://github.com/nodejs/node/pull/49103)
* \[[`30f26a99f4`](https://github.com/nodejs/node/commit/30f26a99f4)] - **permission**: 在调用 mkdtemp 时确保解析路径 (RafaelGSS) [nodejs-private/node-private#440](https://github.com/nodejs-private/node-private/pull/440)
* \[[`5051c75a5b`](https://github.com/nodejs/node/commit/5051c75a5b)] - **policy**: 修复路径到 URL 的转换 (Antoine du Hamel) [#49133](https://github.com/nodejs/node/pull/49133)
* \[[`173aed4757`](https://github.com/nodejs/node/commit/173aed4757)] - **report**: 修复最近的 coverity 警告 (Michael Dawson) [#48954](https://github.com/nodejs/node/pull/48954)
* \[[`d7ff78b442`](https://github.com/nodejs/node/commit/d7ff78b442)] - **sea**: 使用反序列化的 isolate 生成代码缓存 (Joyee Cheung) [#49226](https://github.com/nodejs/node/pull/49226)
* \[[`022f1b70c1`](https://github.com/nodejs/node/commit/022f1b70c1)] - **src**: 支持多个 `--env-file` 声明 (Yagiz Nizipli) [#49542](https://github.com/nodejs/node/pull/49542)
* \[[`154b1c2115`](https://github.com/nodejs/node/commit/154b1c2115)] - **src**: 不要覆盖来自 .env 文件的环境变量 (Phil Nash) [#49424](https://github.com/nodejs/node/pull/49424)
* \[[`dc4de1c69b`](https://github.com/nodejs/node/commit/dc4de1c69b)] - **src**: 修改空字符串的代码 (pluris) [#49336](https://github.com/nodejs/node/pull/49336)
* \[[`701c46f967`](https://github.com/nodejs/node/commit/701c46f967)] - **src**: 移除未使用的 PromiseWrap 相关代码 (Joyee Cheung) [#49335](https://github.com/nodejs/node/pull/49335)
* \[[`4a094dc7af`](https://github.com/nodejs/node/commit/4a094dc7af)] - **src**: 将 IsAnyByteSource 重命名为 IsAnyBufferSource (Tobias Nießen) [#49346](https://github.com/nodejs/node/pull/49346)
* \[[`55d6649175`](https://github.com/nodejs/node/commit/55d6649175)] - **src**: 支持在 RAIIIsolate 中进行快照反序列化 (Joyee Cheung) [#49226](https://github.com/nodejs/node/pull/49226)
* \[[`dc092864ef`](https://github.com/nodejs/node/commit/dc092864ef)] - **src**: 移除 node_perf 中未使用的函数 `GetName()` (Jungku Lee) [#49244](https://github.com/nodejs/node/pull/49244)
* \[[`f2552a410e`](https://github.com/nodejs/node/commit/f2552a410e)] - **src**: 使用 ARES_SUCCESS 而不是 0 (Jungku Lee) [#49048](https://github.com/nodejs/node/pull/49048)
* \[[`4a9ae31519`](https://github.com/nodejs/node/commit/4a9ae31519)] - **src**: 如果 `DomainToUnicode` 的参数为空则添加条件判断 (Jungku Lee) [#49097](https://github.com/nodejs/node/pull/49097)
* \[[`f460362cdf`](https://github.com/nodejs/node/commit/f460362cdf)] - **src**: 移除 C++ WeakReference 实现 (Joyee Cheung) [#49053](https://github.com/nodejs/node/pull/49053)
* \[[`2a35383b3e`](https://github.com/nodejs/node/commit/2a35383b3e)] - **src**: 在适用的地方使用按 realm 分隔的 GetBindingData() (Joyee Cheung) [#49007](https://github.com/nodejs/node/pull/49007)
* \[[`184bbddcf5`](https://github.com/nodejs/node/commit/184bbddcf5)] - **src**: 添加按 realm 分隔的 GetBindingData() 方法 (Joyee Cheung) [#49007](https://github.com/nodejs/node/pull/49007)
* \[[`e9946885f9`](https://github.com/nodejs/node/commit/e9946885f9)] - **src**: 序列化两个 BaseObject 插槽 (Joyee Cheung) [#48996](https://github.com/nodejs/node/pull/48996)
* \[[`ec51e25ed7`](https://github.com/nodejs/node/commit/ec51e25ed7)] - **src,permission**: 添加多个 allow-fs-\* 标志 (Carlos Espa) [#49047](https://github.com/nodejs/node/pull/49047)
* \[[`8aac95de4b`](https://github.com/nodejs/node/commit/8aac95de4b)] - **stream**: 通过减少 `ReflectConstruct` 的使用提升 tee 性能 (Raz Luvaton) [#49546](https://github.com/nodejs/node/pull/49546)
* \[[`0eea7fd8fb`](https://github.com/nodejs/node/commit/0eea7fd8fb)] - **stream**: 当构造函数是 Buffer 时使用 Buffer.from (Matthew Aitken) [#49250](https://github.com/nodejs/node/pull/49250)
* \[[`b961d9bd52`](https://github.com/nodejs/node/commit/b961d9bd52)] - **stream**: 为 map 操作符添加 `highWaterMark` (Raz Luvaton) [#49249](https://github.com/nodejs/node/pull/49249)
* \[[`ca1384166d`](https://github.com/nodejs/node/commit/ca1384166d)] - **test**: 修复 embedtest 中注释的警告 (Jungku Lee) [#49416](https://github.com/nodejs/node/pull/49416)
* \[[`2a35782809`](https://github.com/nodejs/node/commit/2a35782809)] - **test**: 简化 test-crypto-dh-group-setters (Tobias Nießen) [#49404](https://github.com/nodejs/node/pull/49404)
* \[[`6740f3c209`](https://github.com/nodejs/node/commit/6740f3c209)] - **test**: 验证使用绝对路径字符串的动态 import 调用 (Chengzhong Wu) [#49275](https://github.com/nodejs/node/pull/49275)
* \[[`6ed47bd8fb`](https://github.com/nodejs/node/commit/6ed47bd8fb)] - **test**: 缩短 crypto keygen 测试中的长度 (Joyee Cheung) [#49221](https://github.com/nodejs/node/pull/49221)
* \[[`4faa30c553`](https://github.com/nodejs/node/commit/4faa30c553)] - **test**: 拆分 JWK 异步椭圆曲线 keygen 测试 (Joyee Cheung) [#49221](https://github.com/nodejs/node/pull/49221)
* \[[`e04a2603d8`](https://github.com/nodejs/node/commit/e04a2603d8)] - **test**: 拆分 test-crypto-keygen.js (Joyee Cheung) [#49221](https://github.com/nodejs/node/pull/49221)
* \[[`0d23c1d4ce`](https://github.com/nodejs/node/commit/0d23c1d4ce)] - **test**: 重命名 test-crypto-modp1-error (Tobias Nießen) [#49348](https://github.com/nodejs/node/pull/49348)
* \[[`48e41569e2`](https://github.com/nodejs/node/commit/48e41569e2)] - **test**: 将消息 source map 测试从 Python 迁移到 JS (Yiyun Lei) [#49238](https://github.com/nodejs/node/pull/49238)
* \[[`a11e64e09c`](https://github.com/nodejs/node/commit/a11e64e09c)] - **test**: 修复 NodeCryptoEnv 中的编译器警告 (Tobias Nießen) [#49206](https://github.com/nodejs/node/pull/49206)
* \[[`345543938f`](https://github.com/nodejs/node/commit/345543938f)] - **test**: 处理 EUNATCH (Abdirahim Musse) [#48050](https://github.com/nodejs/node/pull/48050)
* \[[`e391f4b197`](https://github.com/nodejs/node/commit/e391f4b197)] - **test**: 使用 `tmpdir.resolve()` (Livia Medeiros) [#49136](https://github.com/nodejs/node/pull/49136)
* \[[`910378f93f`](https://github.com/nodejs/node/commit/910378f93f)] - **test**: 降低 `test-esm-loader-hooks` 的不稳定性 (Antoine du Hamel) [#49248](https://github.com/nodejs/node/pull/49248)
* \[[`4a85f70462`](https://github.com/nodejs/node/commit/4a85f70462)] - **test**: 添加 spawnSyncAndExit() 和 spawnSyncAndExitWithoutError() (Joyee Cheung) [#49200](https://github.com/nodejs/node/pull/49200)
* \[[`9610008b79`](https://github.com/nodejs/node/commit/9610008b79)] - **test**: 让 test-perf-hooks 更加稳健并支持 workers (Joyee Cheung) [#49197](https://github.com/nodejs/node/pull/49197)
* \[[`dc8fff9a75`](https://github.com/nodejs/node/commit/dc8fff9a75)] - **test**: 在 test-v8-serialize-leak 中使用 gcUntil() (Joyee Cheung) [#49168](https://github.com/nodejs/node/pull/49168)
* \[[`ca9f801332`](https://github.com/nodejs/node/commit/ca9f801332)] - **test**: 使 WeakReference 测试更稳健 (Joyee Cheung) [#49053](https://github.com/nodejs/node/pull/49053)
* \[[`de103a4686`](https://github.com/nodejs/node/commit/de103a4686)] - **test**: 添加 UV_THREADPOOL_SIZE 影响的测试 (Tobias Nießen) [#49165](https://github.com/nodejs/node/pull/49165)
* \[[`47d24f144b`](https://github.com/nodejs/node/commit/47d24f144b)] - **test**: 在快照测试中使用 expectSyncExit{WithErrors} (Joyee Cheung) [#49020](https://github.com/nodejs/node/pull/49020)
* \[[`c441f5a097`](https://github.com/nodejs/node/commit/c441f5a097)] - **test**: 添加 expectSyncExitWithoutError() 和 expectSyncExit() 工具 (Joyee Cheung) [#49020](https://github.com/nodejs/node/pull/49020)
* \[[`4d184b5251`](https://github.com/nodejs/node/commit/4d184b5251)] - **test**: 移除 test_runner fixtures 中的 --no-warnings 标志 (Raz Luvaton) [#48989](https://github.com/nodejs/node/pull/48989)
* \[[`25e967a90b`](https://github.com/nodejs/node/commit/25e967a90b)] - **test**: 重新排列 test files fixtures 以便更好理解 (Raz Luvaton) [#48787](https://github.com/nodejs/node/pull/48787)
* \[[`fac56dbcc0`](https://github.com/nodejs/node/commit/fac56dbcc0)] - **test,benchmark**: 使用 `tmpdir.fileURL()` (Livia Medeiros) [#49138](https://github.com/nodejs/node/pull/49138)
* \[[`36763fa532`](https://github.com/nodejs/node/commit/36763fa532)] - **test_runner**: 保留原始属性描述符 (Erick Wendel) [#49433](https://github.com/nodejs/node/pull/49433)
* \[[`40e9fcdbea`](https://github.com/nodejs/node/commit/40e9fcdbea)] - **test_runner**: 添加对 setImmediate 的支持 (Erick Wendel) [#49397](https://github.com/nodejs/node/pull/49397)
* \[[`23216f1935`](https://github.com/nodejs/node/commit/23216f1935)] - **test_runner**: 将覆盖的行、函数和分支报告给 reporters (Phil Nash) [#49320](https://github.com/nodejs/node/pull/49320)
* \[[`283f2806b1`](https://github.com/nodejs/node/commit/283f2806b1)] - **test_runner**: 将 spec reporter 暴露为可 new 的函数 (Chemi Atlow) [#49184](https://github.com/nodejs/node/pull/49184)
* \[[`546ad5f770`](https://github.com/nodejs/node/commit/546ad5f770)] - **test_runner**: 重新引入更早运行全局 after() 钩子 (Colin Ihrig) [#49116](https://github.com/nodejs/node/pull/49116)
* \[[`efdc95fbc0`](https://github.com/nodejs/node/commit/efdc95fbc0)] - **(SEMVER-MINOR)** **test_runner**: 暴露测试的位置 (Colin Ihrig) [#48975](https://github.com/nodejs/node/pull/48975)
* \[[`4bc0a8fe99`](https://github.com/nodejs/node/commit/4bc0a8fe99)] - **test_runner**: 修复全局 after 未导致测试失败的问题 (Raz Luvaton) [#48913](https://github.com/nodejs/node/pull/48913)
* \[[`08738b2664`](https://github.com/nodejs/node/commit/08738b2664)] - **test_runner**: 修复 *Each 钩子中的超时导致后续测试失败的问题 (Raz Luvaton) [#48925](https://github.com/nodejs/node/pull/48925)
* \[[`c2f1830f66`](https://github.com/nodejs/node/commit/c2f1830f66)] - **test_runner**: 清理测试超时中止监听器 (Raz Luvaton) [#48915](https://github.com/nodejs/node/pull/48915)
* \[[`75333f38b2`](https://github.com/nodejs/node/commit/75333f38b2)] - **test_runner**: 修复在不存在全局测试时未调用 global before 的问题 (Raz Luvaton) [#48877](https://github.com/nodejs/node/pull/48877)
* \[[`b28b85adf8`](https://github.com/nodejs/node/commit/b28b85adf8)] - **tls**: 移除 onConnectSecure() 中的冗余代码 (Deokjin Kim) [#49457](https://github.com/nodejs/node/pull/49457)
* \[[`83fc4dccbc`](https://github.com/nodejs/node/commit/83fc4dccbc)] - **tls**: 重构以使用 validateFunction (Deokjin Kim) [#49422](https://github.com/nodejs/node/pull/49422)
* \[[`8949cc79dd`](https://github.com/nodejs/node/commit/8949cc79dd)] - **tls**: 确保在底层 wrap 关闭时 TLS Sockets 也会关闭 (Tim Perry) [#49327](https://github.com/nodejs/node/pull/49327)
* \[[`1df56e6f01`](https://github.com/nodejs/node/commit/1df56e6f01)] - **tools**: 将 eslint 更新到 8.48.0 (Node.js GitHub Bot) [#49343](https://github.com/nodejs/node/pull/49343)
* \[[`ef50ec5b57`](https://github.com/nodejs/node/commit/ef50ec5b57)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#49342](https://github.com/nodejs/node/pull/49342)
* \[[`9a8fb4fc34`](https://github.com/nodejs/node/commit/9a8fb4fc34)] - **tools**: 移除 v8_dump_build_config action (Cheng Zhao) [#49301](https://github.com/nodejs/node/pull/49301)
* \[[`91b2d4314b`](https://github.com/nodejs/node/commit/91b2d4314b)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#49253](https://github.com/nodejs/node/pull/49253)
* \[[`b51946ebdd`](https://github.com/nodejs/node/commit/b51946ebdd)] - **tools**: 修复 github reporter 被多次追加的问题 (Moshe Atlow) [#49199](https://github.com/nodejs/node/pull/49199)
* \[[`ae40cb1612`](https://github.com/nodejs/node/commit/ae40cb1612)] - **url**: 将 `pathToFileURL(path)` 参数验证为字符串 (LiviaMedeiros) [#49161](https://github.com/nodejs/node/pull/49161)
* \[[`e787673dcf`](https://github.com/nodejs/node/commit/e787673dcf)] - **url**: 处理空的 unicode 主机名 (Yagiz Nizipli) [#49396](https://github.com/nodejs/node/pull/49396)
* \[[`6ee74be87f`](https://github.com/nodejs/node/commit/6ee74be87f)] - **vm**: 直接将 MicrotaskQueue 存储在 ContextifyContext 中 (Joyee Cheung) [#48982](https://github.com/nodejs/node/pull/48982)
* \[[`0179c6dc8f`](https://github.com/nodejs/node/commit/0179c6dc8f)] - **worker**: 防止用户篡改众所周知的原型 (Antoine du Hamel) [#49270](https://github.com/nodejs/node/pull/49270)

<a id="20.6.1"></a>

## 2023-09-08, 版本 20.6.1（当前），@RafaelGSS

### 提交

* \[[`8acbe6d8e8`](https://github.com/nodejs/node/commit/8acbe6d8e8)] - **esm**: 修复从 ESM 加载 CJS 模块的问题（Antoine du Hamel） [#49500](https://github.com/nodejs/node/pull/49500)

<a id="20.6.0"></a>

## 2023-09-04, 版本 20.6.0（当前），@juanarbol，由 @UlisesGascon 准备

### 重要变更

#### 内置 `.env` 文件支持

从 Node.js v20.6.0 开始，Node.js 支持使用 `.env` 文件来配置环境变量。

你的配置文件应遵循 INI 文件格式，每一行包含一个环境变量的键值对。
要使用预定义配置初始化你的 Node.js 应用，请使用以下 CLI 命令：`node --env-file=config.env index.js`。

例如，当你的应用初始化后，你可以使用 `process.env.PASSWORD` 访问以下环境变量：

```text
PASSWORD=nodejs
```

除了环境变量之外，此更改还允许你直接在 `.env` 文件中定义 `NODE_OPTIONS`，无需再将其包含在 `package.json` 中。

此特性由 Yagiz Nizipli 在 [#48890](https://github.com/nodejs/node/pull/48890) 中贡献。

#### `import.meta.resolve` 取消标记

在 ES 模块中，[`import.meta.resolve(specifier)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve) 可用于获取 `specifier` 解析到的绝对 URL 字符串，类似于 CommonJS 中的 `require.resolve`。这使 Node.js 与浏览器和其他服务端运行时保持一致。

此特性由 Guy Bedford 在 <https://github.com/nodejs/node/pull/49028> 中贡献

#### 新的 `node:module` API `register` 用于模块自定义钩子；新增 `initialize` 钩子

`node:module` 上新增了一个 `register` API，用于指定一个导出模块自定义钩子的文件，并向这些钩子传递数据，以及与它们建立通信通道。此前“定义带有钩子的文件”这部分由标志 `--experimental-loader` 处理，但当钩子在 20.0.0 中迁移到专用线程后，就需要一种在主（应用）线程与钩子线程之间通信的方法。现在可以在主线程中调用 `register` 并传递数据，包括 `MessageChannel` 实例。

我们鼓励用户迁移到使用 [`--import`](https://nodejs.org/api/cli.html#--importmodule) 与 `register` 的方式，例如：

```bash
node --import ./file-that-calls-register.js ./app.js
```

使用 `--import` 可确保在任何应用代码运行之前注册自定义钩子，甚至包括入口点。

此特性由 João Lenon 和 Jacob Smith 在 <https://github.com/nodejs/node/pull/46826> 中贡献，Izaak Schroeder 和 Jacob Smith 在 <https://github.com/nodejs/node/pull/48842> 和 <https://github.com/nodejs/node/pull/48559> 中贡献

#### 模块自定义 `load` 钩子现在可以支持 CommonJS

模块自定义钩子的作者现在可以在 `load` 钩子中同时处理 ES 模块和 CommonJS 源代码。这对通过 `import` 或 `require` 引用的 CommonJS 模块都适用，只要[应用程序的主入口点由 ES 模块加载器处理](https://nodejs.org/api/cli.html#program-entry-point)（例如入口点是 ES 模块文件，或者传入了 `--import` 标志）。这将简化 Node.js 模块加载过程的自定义，因为包作者可以在不依赖 `require.extensions` 等已弃用 API 的情况下自定义更多 Node.js 行为。

此特性由 Antoine du Hamel 在 <https://github.com/nodejs/node/pull/47999> 中贡献

#### Node.js C++ addon 现在对 cppgc（Oilpan）提供实验性支持，这是 V8 中的一个 C++ 垃圾回收库。

现在当 Node.js 启动时，它会确保有一个 `v8::CppHeap` 挂接到 V8 isolate 上。这使用户能够使用 V8 中的 `<cppgc/*>` 头文件在 `v8::CppHeap` 中分配对象，而这些头文件现在也包含在 addon 可用的 Node.js 头文件中。请注意，由于 Node.js 只捆绑了来自 V8 的 cppgc 库，[ABI 稳定性](https://nodejs.org/en/docs/guides/abi-stability#abi-stability-in-nodejs)目前不保证在 semver 的 minor 和 patch 更新中保持不变，但我们预计 ABI 不会频繁破坏，因为它已在 Chromium 中稳定并经过多年实战检验。当 cppgc 在内部和外部获得足够采用时，我们可能会考虑将其纳入 ABI 稳定性保证。

为了帮助 addon 作者创建 V8 的垃圾回收器能够感知的 JavaScript 到 C++ 引用，`node.h` 中新增了一个辅助函数 [`node::SetCppgcReference(isolate, js_object, cppgc_object)`](https://github.com/nodejs/node/blob/v20.6.0/test/addons/cppgc-object/binding.cc)。V8 未来可能提供原生替代方案，从而替换这个 Node.js 特定的辅助函数。目前，用户可以使用此 API，避免必须硬编码 JavaScript 包装对象的布局。有关如何在统一堆中创建可被垃圾回收的 C++ 对象并将其包装为 JavaScript 对象的示例，可在 [Node.js addon 测试](https://github.com/nodejs/node/blob/v20.6.0/test/addons/cppgc-object/binding.cc)中找到。

现有的 `node::ObjectWrap` 辅助工具仍可继续使用，而基于 cppgc 的对象管理作为替代方案，具有 [V8 关于 Oilpan 的博客文章](https://v8.dev/blog/oilpan-library)中提到的一些优势。

此特性由 Daryl Haresign 和 Joyee Cheung 在 <https://github.com/nodejs/node/pull/48660> 和 <https://github.com/nodejs/node/pull/45704> 中贡献。

#### 其他重要变更

* \[[`d6862b085c`](https://github.com/nodejs/node/commit/d6862b085c)] - **deps**: V8: 反向挑选 93275031284c（Joyee Cheung） [#48660](https://github.com/nodejs/node/pull/48660)
* \[[`00fc8bb8b3`](https://github.com/nodejs/node/commit/00fc8bb8b3)] - **doc**: 将 rluvaton 添加为协作者（Raz Luvaton） [#49215](https://github.com/nodejs/node/pull/49215)
* \[[`d649339abd`](https://github.com/nodejs/node/commit/d649339abd)] - **doc**: 添加新的 TSC 成员（Michael Dawson） [#48841](https://github.com/nodejs/node/pull/48841)
* \[[`67f9896247`](https://github.com/nodejs/node/commit/67f9896247)] - **(SEMVER-MINOR)** **inspector**: open 添加 `SymbolDispose`（Chemi Atlow） [#48765](https://github.com/nodejs/node/pull/48765)
* \[[`5aef593db3`](https://github.com/nodejs/node/commit/5aef593db3)] - **module**: 实现 `register` 工具（João Lenon） [#46826](https://github.com/nodejs/node/pull/46826)

### 提交

* \[[`771abcb5da`](https://github.com/nodejs/node/commit/771abcb5da)] - **benchmark**: 为 test\_runner 添加基准测试（Raz Luvaton） [#48931](https://github.com/nodejs/node/pull/48931)
* \[[`6b27bb0dab`](https://github.com/nodejs/node/commit/6b27bb0dab)] - **benchmark**: 添加 pm 启动基准测试（Rafael Gonzaga） [#48905](https://github.com/nodejs/node/pull/48905)
* \[[`1f35c0ca55`](https://github.com/nodejs/node/commit/1f35c0ca55)] - **child\_process**: 加强对原型污染的防护（Livia Medeiros） [#48726](https://github.com/nodejs/node/pull/48726)
* \[[`d6862b085c`](https://github.com/nodejs/node/commit/d6862b085c)] - **deps**: V8: 反向挑选 93275031284c（Joyee Cheung） [#48660](https://github.com/nodejs/node/pull/48660)
* \[[`f71e383948`](https://github.com/nodejs/node/commit/f71e383948)] - **deps**: 将 simdutf 更新到 3.2.17（Node.js GitHub Bot） [#49019](https://github.com/nodejs/node/pull/49019)
* \[[`e14f0456ae`](https://github.com/nodejs/node/commit/e14f0456ae)] - **deps**: 将 googletest 更新到 7e33b6a（Node.js GitHub Bot） [#49034](https://github.com/nodejs/node/pull/49034)
* \[[`bfaa0fb500`](https://github.com/nodejs/node/commit/bfaa0fb500)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-526382e（Node.js GitHub Bot） [#49033](https://github.com/nodejs/node/pull/49033)
* \[[`b79c652c85`](https://github.com/nodejs/node/commit/b79c652c85)] - **deps**: 将 undici 更新到 5.23.0（Node.js GitHub Bot） [#49021](https://github.com/nodejs/node/pull/49021)
* \[[`6ead86145c`](https://github.com/nodejs/node/commit/6ead86145c)] - **deps**: 将 googletest 更新到 c875c4e（Node.js GitHub Bot） [#48964](https://github.com/nodejs/node/pull/48964)
* \[[`4b0e50501e`](https://github.com/nodejs/node/commit/4b0e50501e)] - **deps**: 将 ada 更新到 2.6.0（Node.js GitHub Bot） [#48896](https://github.com/nodejs/node/pull/48896)
* \[[`d960ee0ba3`](https://github.com/nodejs/node/commit/d960ee0ba3)] - **deps**: 将 npm 升级到 9.8.1（npm 团队） [#48838](https://github.com/nodejs/node/pull/48838)
* \[[`d92b0139ca`](https://github.com/nodejs/node/commit/d92b0139ca)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-61dc0bd（Node.js GitHub Bot） [#48788](https://github.com/nodejs/node/pull/48788)
* \[[`2a7835c376`](https://github.com/nodejs/node/commit/2a7835c376)] - **deps**: V8: 反向挑选 9f4b7699f68e（Joyee Cheung） [#48830](https://github.com/nodejs/node/pull/48830)
* \[[`c8e17829ac`](https://github.com/nodejs/node/commit/c8e17829ac)] - **deps**: V8: 反向挑选 c1a54d5ffcd1（Joyee Cheung） [#48830](https://github.com/nodejs/node/pull/48830)
* \[[`318e075b6f`](https://github.com/nodejs/node/commit/318e075b6f)] - **deps**: 将 googletest 更新到 cc36671（Node.js GitHub Bot） [#48789](https://github.com/nodejs/node/pull/48789)
* \[[`114e088267`](https://github.com/nodejs/node/commit/114e088267)] - **diagnostics\_channel**: 修复最后一个订阅者移除问题（Gabriel Schulhof） [#48933](https://github.com/nodejs/node/pull/48933)
* \[[`00fc8bb8b3`](https://github.com/nodejs/node/commit/00fc8bb8b3)] - **doc**: 将 rluvaton 添加为协作者（Raz Luvaton） [#49215](https://github.com/nodejs/node/pull/49215)
* \[[`21949c45b6`](https://github.com/nodejs/node/commit/21949c45b6)] - **doc**: 为 `WebStreams` 中的示例添加打印结果（Jungku Lee） [#49143](https://github.com/nodejs/node/pull/49143)
* \[[`032107a6fe`](https://github.com/nodejs/node/commit/032107a6fe)] - **doc**: 修复 webstreams 中的 `Type` 标注（Deokjin Kim） [#49121](https://github.com/nodejs/node/pull/49121)
* \[[`91d41e7c5a`](https://github.com/nodejs/node/commit/91d41e7c5a)] - **doc**: 修复 `initialize()` 文档中的标志名称（Antoine du Hamel） [#49158](https://github.com/nodejs/node/pull/49158)
* \[[`aa4caf810e`](https://github.com/nodejs/node/commit/aa4caf810e)] - **doc**: 使 `NODE_VERSION_IS_RELEASE` 的回退说明更清晰（Rafael Gonzaga） [#49114](https://github.com/nodejs/node/pull/49114)
* \[[`f888a1dbe3`](https://github.com/nodejs/node/commit/f888a1dbe3)] - **doc**: 更新 process.binding 的弃用文本（Tobias Nießen） [#49086](https://github.com/nodejs/node/pull/49086)
* \[[`89fa3faf92`](https://github.com/nodejs/node/commit/89fa3faf92)] - **doc**: 更新为最新安全发布版本（Rafael Gonzaga） [#49085](https://github.com/nodejs/node/pull/49085)
* \[[`3d36e7a941`](https://github.com/nodejs/node/commit/3d36e7a941)] - **doc**: 为 `node inspect` 的 `--port` 标志添加说明（Michael Bianco） [#48785](https://github.com/nodejs/node/pull/48785)
* \[[`e9d9ca12a3`](https://github.com/nodejs/node/commit/e9d9ca12a3)] - **doc**: 补上缺失的句号（Rich Trott） [#49094](https://github.com/nodejs/node/pull/49094)
* \[[`7e7b554de0`](https://github.com/nodejs/node/commit/7e7b554de0)] - **doc**: 在 http.md 中添加 ESM 示例（btea） [#47763](https://github.com/nodejs/node/pull/47763)
* \[[`48f8ccfd54`](https://github.com/nodejs/node/commit/48f8ccfd54)] - **doc**: 详细说明 Ctrl-Y 和 Meta-Y 的按键操作（Ray） [#43529](https://github.com/nodejs/node/pull/43529)
* \[[`195885c8f8`](https://github.com/nodejs/node/commit/195885c8f8)] - **doc**: 为测试运行器事件详情添加 `"type"`（Phil Nash） [#49014](https://github.com/nodejs/node/pull/49014)
* \[[`6ce25f8415`](https://github.com/nodejs/node/commit/6ce25f8415)] - **doc**: 为 Electron 27 预留 118（David Sanders） [#49023](https://github.com/nodejs/node/pull/49023)
* \[[`9c26c0f296`](https://github.com/nodejs/node/commit/9c26c0f296)] - **doc**: 澄清 Windows 上 worker 线程中 `process.env` 的使用（Daeyeon Jeong） [#49008](https://github.com/nodejs/node/pull/49008)
* \[[`7186e02aa0`](https://github.com/nodejs/node/commit/7186e02aa0)] - **doc**: 删除对 v14 的提及（Rafael Gonzaga） [#49005](https://github.com/nodejs/node/pull/49005)
* \[[`9641ac6c65`](https://github.com/nodejs/node/commit/9641ac6c65)] - **doc**: 在安全发布流程中去掉 github actions 检查（Rafael Gonzaga） [#48978](https://github.com/nodejs/node/pull/48978)
* \[[`f3d62abb19`](https://github.com/nodejs/node/commit/f3d62abb19)] - **doc**: 改进 joinDuplicateHeaders 的定义（Matteo Bianchi） [#48859](https://github.com/nodejs/node/pull/48859)
* \[[`0db104a08b`](https://github.com/nodejs/node/commit/0db104a08b)] - **doc**: 修复 `events.addAbortListener` 第二个参数名称（Deokjin Kim） [#48922](https://github.com/nodejs/node/pull/48922)
* \[[`5173c559b7`](https://github.com/nodejs/node/commit/5173c559b7)] - **doc**: 为自定义 reporter 示例添加新的 reporter 事件（Chemi Atlow） [#48903](https://github.com/nodejs/node/pull/48903)
* \[[`660da785e6`](https://github.com/nodejs/node/commit/660da785e6)] - **doc**: 运行 license-builder（github-actions\[bot]） [#48898](https://github.com/nodejs/node/pull/48898)
* \[[`092f9fe92a`](https://github.com/nodejs/node/commit/092f9fe92a)] - **doc**: 在测试文档中将 duration 改为 duration_ms（Ardi_Nugraha） [#48892](https://github.com/nodejs/node/pull/48892)
* \[[`5e4730858d`](https://github.com/nodejs/node/commit/5e4730858d)] - **doc**: 改进 requireHostHeader（Guido Penta） [#48860](https://github.com/nodejs/node/pull/48860)
* \[[`045e3c549a`](https://github.com/nodejs/node/commit/045e3c549a)] - **doc**: 添加支持 Node-api 9 的 18.x 版本（Michael Dawson） [#48876](https://github.com/nodejs/node/pull/48876)
* \[[`c20d35df34`](https://github.com/nodejs/node/commit/c20d35df34)] - **doc**: 包含实验特性评估（Rafael Gonzaga） [#48824](https://github.com/nodejs/node/pull/48824)
* \[[`d649339abd`](https://github.com/nodejs/node/commit/d649339abd)] - **doc**: 添加新的 TSC 成员（Michael Dawson） [#48841](https://github.com/nodejs/node/pull/48841)
* \[[`aeac327f2b`](https://github.com/nodejs/node/commit/aeac327f2b)] - **doc**: 重构 node-api 支持矩阵（Michael Dawson） [#48774](https://github.com/nodejs/node/pull/48774)
* \[[`388c7d9232`](https://github.com/nodejs/node/commit/388c7d9232)] - **doc**: 在 `async_hooks.executionAsyncId()` 示例中声明 `path`（Deokjin Kim） [#48556](https://github.com/nodejs/node/pull/48556)
* \[[`fe20528c8e`](https://github.com/nodejs/node/commit/fe20528c8e)] - **doc**: 去掉末尾的句号以减少歧义（Jason） [#48719](https://github.com/nodejs/node/pull/48719)
* \[[`e69c8e173f`](https://github.com/nodejs/node/commit/e69c8e173f)] - **doc**: 使用 nodejs-social 替代 nodejs/tweet（Rafael Gonzaga） [#48769](https://github.com/nodejs/node/pull/48769)
* \[[`ea547849fd`](https://github.com/nodejs/node/commit/ea547849fd)] - **doc**: 扩展通过 squash 和 rebase 合并 PR 的说明（Chengzhong Wu） [#48751](https://github.com/nodejs/node/pull/48751)
* \[[`31442b96a5`](https://github.com/nodejs/node/commit/31442b96a5)] - **esm**: 修复 `globalPreload` 警告（Antoine du Hamel） [#49069](https://github.com/nodejs/node/pull/49069)
* \[[`eb1215878b`](https://github.com/nodejs/node/commit/eb1215878b)] - **esm**: 取消对 import.meta.resolve 的标记（Guy Bedford） [#49028](https://github.com/nodejs/node/pull/49028)
* \[[`57b24a34e6`](https://github.com/nodejs/node/commit/57b24a34e6)] - **esm**: import.meta.resolve 精确模块未找到错误应返回（Guy Bedford） [#49038](https://github.com/nodejs/node/pull/49038)
* \[[`f23b2a3066`](https://github.com/nodejs/node/commit/f23b2a3066)] - **esm**: 防止 `ERR_UNSUPPORTED_DIR_IMPORT` 受原型污染影响（Antoine du Hamel） [#49060](https://github.com/nodejs/node/pull/49060)
* \[[`386e826a56`](https://github.com/nodejs/node/commit/386e826a56)] - **esm**: 添加 `initialize` 钩子，并与 `register` 集成（Izaak Schroeder） [#48842](https://github.com/nodejs/node/pull/48842)
* \[[`74a2e1e0ab`](https://github.com/nodejs/node/commit/74a2e1e0ab)] - **esm**: 修复拼写错误 `parentUrl` -> `parentURL`（Antoine du Hamel） [#48999](https://github.com/nodejs/node/pull/48999)
* \[[`0a4f7c669a`](https://github.com/nodejs/node/commit/0a4f7c669a)] - **esm**: 取消 `Module.register` 的标记并允许嵌套 loader 的 `import()`（Izaak Schroeder） [#48559](https://github.com/nodejs/node/pull/48559)
* \[[`a5597470ce`](https://github.com/nodejs/node/commit/a5597470ce)] - **esm**: 恢复 `globalPreload` 测试并修复失败项（Antoine du Hamel） [#48779](https://github.com/nodejs/node/pull/48779)
* \[[`d568600b42`](https://github.com/nodejs/node/commit/d568600b42)] - **events**: 移除 event target 的弱监听器（Raz Luvaton） [#48952](https://github.com/nodejs/node/pull/48952)
* \[[`3d942d9842`](https://github.com/nodejs/node/commit/3d942d9842)] - **fs**: 修复 readdir 递归同步与回调版本（Ethan Arrowood） [#48698](https://github.com/nodejs/node/pull/48698)
* \[[`c14ff69d69`](https://github.com/nodejs/node/commit/c14ff69d69)] - **fs**: 在 NUL 字符错误消息中提及 `URL`（LiviaMedeiros） [#48828](https://github.com/nodejs/node/pull/48828)
* \[[`d634d781d7`](https://github.com/nodejs/node/commit/d634d781d7)] - **fs**: 让 `mkdtemp` 接受 buffer 和 URL（LiviaMedeiros） [#48828](https://github.com/nodejs/node/pull/48828)
* \[[`4515a285a4`](https://github.com/nodejs/node/commit/4515a285a4)] - **fs**: 移除冗余的 `nullCheck`（Livia Medeiros） [#48826](https://github.com/nodejs/node/pull/48826)
* \[[`742597b14a`](https://github.com/nodejs/node/commit/742597b14a)] - **http**: 在 listen 时启动连接检查间隔（Paolo Insogna） [#48611](https://github.com/nodejs/node/pull/48611)
* \[[`67f9896247`](https://github.com/nodejs/node/commit/67f9896247)] - **(SEMVER-MINOR)** **inspector**: open 添加 `SymbolDispose`（Chemi Atlow） [#48765](https://github.com/nodejs/node/pull/48765)
* \[[`b66a3c1c96`](https://github.com/nodejs/node/commit/b66a3c1c96)] - **lib**: 修复 data URLs 中的 MIME 过度匹配（André Alves） [#49104](https://github.com/nodejs/node/pull/49104)
* \[[`dca8678a22`](https://github.com/nodejs/node/commit/dca8678a22)] - **lib**: 修复在 Blob.stream() 的 source.pull() 中于 return 前添加 resolve()（bellbind） [#48935](https://github.com/nodejs/node/pull/48935)
* \[[`420b85c00f`](https://github.com/nodejs/node/commit/420b85c00f)] - **lib**: 移除传给 toASCII 的无效参数（Yagiz Nizipli） [#48878](https://github.com/nodejs/node/pull/48878)
* \[[`a12ce11b09`](https://github.com/nodejs/node/commit/a12ce11b09)] - **lib,permission**: 在启用 pm 时移除 repl 自动补全（Rafael Gonzaga） [#48920](https://github.com/nodejs/node/pull/48920)
* \[[`458eaf5e75`](https://github.com/nodejs/node/commit/458eaf5e75)] - **meta**: 将 github/codeql-action 从 2.20.1 升级到 2.21.2（dependabot\[bot]） [#48986](https://github.com/nodejs/node/pull/48986)
* \[[`4f88cb10e0`](https://github.com/nodejs/node/commit/4f88cb10e0)] - **meta**: 将 step-security/harden-runner 从 2.4.1 升级到 2.5.0（dependabot\[bot]） [#48985](https://github.com/nodejs/node/pull/48985)
* \[[`22fc2a6ec6`](https://github.com/nodejs/node/commit/22fc2a6ec6)] - **meta**: 将 actions/setup-node 从 3.6.0 升级到 3.7.0（dependabot\[bot]） [#48984](https://github.com/nodejs/node/pull/48984)
* \[[`40103adabd`](https://github.com/nodejs/node/commit/40103adabd)] - **meta**: 将 actions/setup-python 从 4.6.1 升级到 4.7.0（dependabot\[bot]） [#48983](https://github.com/nodejs/node/pull/48983)
* \[[`84c0c6848c`](https://github.com/nodejs/node/commit/84c0c6848c)] - **meta**: 为 atlowChemi 添加 mailmap 条目（Chemi Atlow） [#48810](https://github.com/nodejs/node/pull/48810)
* \[[`1a6e9450b8`](https://github.com/nodejs/node/commit/1a6e9450b8)] - **module**: 让 CJS 从 ESM 加载器中加载（Antoine du Hamel） [#47999](https://github.com/nodejs/node/pull/47999)
* \[[`a5322c4b4a`](https://github.com/nodejs/node/commit/a5322c4b4a)] - **module**: 确保成功的 import 返回相同结果（Antoine du Hamel） [#46662](https://github.com/nodejs/node/pull/46662)
* \[[`5aef593db3`](https://github.com/nodejs/node/commit/5aef593db3)] - **module**: 实现 `register` 工具（João Lenon） [#46826](https://github.com/nodejs/node/pull/46826)
* \[[`015c4f788d`](https://github.com/nodejs/node/commit/015c4f788d)] - **node-api**: 避免宏重定义（Tobias Nießen） [#48879](https://github.com/nodejs/node/pull/48879)
* \[[`53ee98566b`](https://github.com/nodejs/node/commit/53ee98566b)] - **permission**: 将 PrintTree 移至未命名命名空间（Tobias Nießen） [#48874](https://github.com/nodejs/node/pull/48874)
* \[[`30ea480135`](https://github.com/nodejs/node/commit/30ea480135)] - **permission**: 修复 PrintTree 中的数据类型（Tobias Nießen） [#48770](https://github.com/nodejs/node/pull/48770)
* \[[`8380800375`](https://github.com/nodejs/node/commit/8380800375)] - **readline**: 添加粘贴括号模式（Jakub Jankiewicz） [#47150](https://github.com/nodejs/node/pull/47150)
* \[[`bc009d0c10`](https://github.com/nodejs/node/commit/bc009d0c10)] - **sea**: 添加对仅 V8 字节码缓存的支持（Darshan Sen） [#48191](https://github.com/nodejs/node/pull/48191)
* \[[`f2f4ce9e29`](https://github.com/nodejs/node/commit/f2f4ce9e29)] - **src**: 使用有效的 cppgc wrapper id 推导非 cppgc id（Joyee Cheung） [#48660](https://github.com/nodejs/node/pull/48660)
* \[[`bf7ff369f6`](https://github.com/nodejs/node/commit/bf7ff369f6)] - **src**: 添加内置 `.env` 文件支持（Yagiz Nizipli） [#48890](https://github.com/nodejs/node/pull/48890)
* \[[`8d6948f8e2`](https://github.com/nodejs/node/commit/8d6948f8e2)] - **src**: 移除 `GenerateSingleExecutableBlob()` 中的重复代码（Jungku Lee） [#49119](https://github.com/nodejs/node/pull/49119)
* \[[`b030004cee`](https://github.com/nodejs/node/commit/b030004cee)] - **src**: 重构 snapshot builder 中的向量写入（Joyee Cheung） [#48851](https://github.com/nodejs/node/pull/48851)
* \[[`497df8288d`](https://github.com/nodejs/node/commit/497df8288d)] - **src**: 增加重载 fast api 函数的能力（Yagiz Nizipli） [#48993](https://github.com/nodejs/node/pull/48993)
* \[[`e5b0dfa359`](https://github.com/nodejs/node/commit/e5b0dfa359)] - **src**: 移除 `uv_handle_type` 的冗余代码（Jungku Lee） [#49061](https://github.com/nodejs/node/pull/49061)
* \[[`f126b9e3d1`](https://github.com/nodejs/node/commit/f126b9e3d1)] - **src**: 现代化 use-equals-default 的写法（Jason） [#48735](https://github.com/nodejs/node/pull/48735)
* \[[`db4370fc3e`](https://github.com/nodejs/node/commit/db4370fc3e)] - **src**: 避免在 BuiltinLoader::GetBuiltinIds 中复制字符串（Yagiz Nizipli） [#48721](https://github.com/nodejs/node/pull/48721)
* \[[`9d13503c4e`](https://github.com/nodejs/node/commit/9d13503c4e)] - **src**: 修复 callback_queue.h 缺失头文件（Jason） [#48733](https://github.com/nodejs/node/pull/48733)
* \[[`6c389df3aa`](https://github.com/nodejs/node/commit/6c389df3aa)] - **src**: 将 v8::Object::GetInternalField() 的返回值转换为 v8::Value（Joyee Cheung） [#48943](https://github.com/nodejs/node/pull/48943)
* \[[`7b9adff0be`](https://github.com/nodejs/node/commit/7b9adff0be)] - **src**: 不要将用户输入传给格式化字符串（Antoine du Hamel） [#48973](https://github.com/nodejs/node/pull/48973)
* \[[`e0fdb7b092`](https://github.com/nodejs/node/commit/e0fdb7b092)] - **src**: 移除 ContextEmbedderIndex::kBindingDataStoreIndex（Joyee Cheung） [#48836](https://github.com/nodejs/node/pull/48836)
* \[[`578c3d1e14`](https://github.com/nodejs/node/commit/578c3d1e14)] - **src**: 使用 ARES_SUCCESS 而不是 0（Hyunjin Kim） [#48834](https://github.com/nodejs/node/pull/48834)
* \[[`ed23426aac`](https://github.com/nodejs/node/commit/ed23426aac)] - **src**: 将 performance milestone 的时间起点保存在 AliasedArray 中（Joyee Cheung） [#48708](https://github.com/nodejs/node/pull/48708)
* \[[`5dec186663`](https://github.com/nodejs/node/commit/5dec186663)] - **src**: 支持单文件可执行应用中的 snapshot（Joyee Cheung） [#46824](https://github.com/nodejs/node/pull/46824)
* \[[`d759d4f631`](https://github.com/nodejs/node/commit/d759d4f631)] - **src**: 移除不必要的临时对象创建（Jason） [#48734](https://github.com/nodejs/node/pull/48734)
* \[[`409cc692db`](https://github.com/nodejs/node/commit/409cc692db)] - **src**: 修复 realm 上的 nullptr 访问（Jan Olaf Krems） [#48802](https://github.com/nodejs/node/pull/48802)
* \[[`07d0fd61b1`](https://github.com/nodejs/node/commit/07d0fd61b1)] - **src**: 移除 OnScopeLeaveImpl 的移动赋值重载（Jason） [#48732](https://github.com/nodejs/node/pull/48732)
* \[[`41cc3efa23`](https://github.com/nodejs/node/commit/41cc3efa23)] - **src**: 使用 string_view 创建 utf-8 字符串（Yagiz Nizipli） [#48722](https://github.com/nodejs/node/pull/48722)
* \[[`62a46d9335`](https://github.com/nodejs/node/commit/62a46d9335)] - **src,permission**: 在启用 pm 时默认限制（Rafael Gonzaga） [#48907](https://github.com/nodejs/node/pull/48907)
* \[[`099159ce04`](https://github.com/nodejs/node/commit/099159ce04)] - **src,tools**: 初始化 cppgc（Daryl Haresign） [#48660](https://github.com/nodejs/node/pull/48660)
* \[[`600c08d197`](https://github.com/nodejs/node/commit/600c08d197)] - **stream**: 改进 WebStreams 性能（Raz Luvaton） [#49089](https://github.com/nodejs/node/pull/49089)
* \[[`609b25fa99`](https://github.com/nodejs/node/commit/609b25fa99)] - **stream**: 实现 ReadableStream.from（Debadree Chatterjee） [#48395](https://github.com/nodejs/node/pull/48395)
* \[[`750cca2738`](https://github.com/nodejs/node/commit/750cca2738)] - **test**: 使用 `tmpdir.resolve()`（Livia Medeiros） [#49128](https://github.com/nodejs/node/pull/49128)
* \[[`6595367649`](https://github.com/nodejs/node/commit/6595367649)] - **test**: 使用 `tmpdir.resolve()`（Livia Medeiros） [#49127](https://github.com/nodejs/node/pull/49127)
* \[[`661b055e75`](https://github.com/nodejs/node/commit/661b055e75)] - **test**: 在 fs 测试中使用 `tmpdir.resolve()`（Livia Medeiros） [#49126](https://github.com/nodejs/node/pull/49126)
* \[[`b3c56d206f`](https://github.com/nodejs/node/commit/b3c56d206f)] - **test**: 在 fs 测试中使用 `tmpdir.resolve()`（Livia Medeiros） [#49125](https://github.com/nodejs/node/pull/49125)
* \[[`3ddb155d16`](https://github.com/nodejs/node/commit/3ddb155d16)] - **test**: 修复 test_async.c 中的断言消息（Tobias Nießen） [#49146](https://github.com/nodejs/node/pull/49146)
* \[[`1d17c1032d`](https://github.com/nodejs/node/commit/1d17c1032d)] - **test**: 重构 `test-esm-loader-hooks` 以便更容易调试（Antoine du Hamel） [#49131](https://github.com/nodejs/node/pull/49131)
* \[[`13bd7a0293`](https://github.com/nodejs/node/commit/13bd7a0293)] - **test**: 添加 `tmpdir.resolve()`（Livia Medeiros） [#49079](https://github.com/nodejs/node/pull/49079)
* \[[`89b1bce56d`](https://github.com/nodejs/node/commit/89b1bce56d)] - **test**: 文档化 `fixtures.fileURL()`（Livia Medeiros） [#49083](https://github.com/nodejs/node/pull/49083)
* \[[`2fcb855c76`](https://github.com/nodejs/node/commit/2fcb855c76)] - **test**: 降低 `test-esm-loader-hooks` 的不稳定性（Antoine du Hamel） [#49105](https://github.com/nodejs/node/pull/49105)
* \[[`7816e040df`](https://github.com/nodejs/node/commit/7816e040df)] - **test**: 稳定 inspector-open-dispose 测试（Chemi Atlow） [#49000](https://github.com/nodejs/node/pull/49000)
* \[[`e70e9747e4`](https://github.com/nodejs/node/commit/e70e9747e4)] - **test**: 在 assertSnapshot 中打印创建缺失 snapshot 的说明（Raz Luvaton） [#48914](https://github.com/nodejs/node/pull/48914)
* \[[`669ac03520`](https://github.com/nodejs/node/commit/669ac03520)] - **test**: 添加 `tmpdir.fileURL()`（Livia Medeiros） [#49040](https://github.com/nodejs/node/pull/49040)
* \[[`b945d7be35`](https://github.com/nodejs/node/commit/b945d7be35)] - **test**: 使用 `spawn` 和 `spawnPromisified` 代替 `exec`（Antoine du Hamel） [#48991](https://github.com/nodejs/node/pull/48991)
* \[[`b3a7427583`](https://github.com/nodejs/node/commit/b3a7427583)] - **test**: 重构 `test-node-output-errors`（Antoine du Hamel） [#48992](https://github.com/nodejs/node/pull/48992)
* \[[`6c3e5c4d69`](https://github.com/nodejs/node/commit/6c3e5c4d69)] - **test**: 在合适时使用 `fixtures.fileURL`（Antoine du Hamel） [#48990](https://github.com/nodejs/node/pull/48990)
* \[[`9138b78bcb`](https://github.com/nodejs/node/commit/9138b78bcb)] - **test**: 验证错误代码而不是消息（Antoine du Hamel） [#48972](https://github.com/nodejs/node/pull/48972)
* \[[`b4ca4a6f80`](https://github.com/nodejs/node/commit/b4ca4a6f80)] - **test**: 修复 cwd 包含空格或反斜杠时的 snapshot 测试（Antoine du Hamel） [#48959](https://github.com/nodejs/node/pull/48959)
* \[[`d4398d458c`](https://github.com/nodejs/node/commit/d4398d458c)] - **test**: 按 ASCII 顺序排列 `common.mjs`（Antoine du Hamel） [#48960](https://github.com/nodejs/node/pull/48960)
* \[[`b5991f5250`](https://github.com/nodejs/node/commit/b5991f5250)] - **test**: 修复测试中的一些假设（Antoine du Hamel） [#48958](https://github.com/nodejs/node/pull/48958)
* \[[`62e23f83f9`](https://github.com/nodejs/node/commit/62e23f83f9)] - **test**: 改进 internal/worker/io.js 覆盖率（Yoshiki Kurihara） [#42387](https://github.com/nodejs/node/pull/42387)
* \[[`314bd6095c`](https://github.com/nodejs/node/commit/314bd6095c)] - **test**: 修复 `es-module/test-esm-initialization`（Antoine du Hamel） [#48880](https://github.com/nodejs/node/pull/48880)
* \[[`3680a66df4`](https://github.com/nodejs/node/commit/3680a66df4)] - **test**: 在 url.parse 中验证带逗号的 host（Yagiz Nizipli） [#48878](https://github.com/nodejs/node/pull/48878)
* \[[`24c3742372`](https://github.com/nodejs/node/commit/24c3742372)] - **test**: 删除 test-net-bytes-per-incoming-chunk-overhead（Michaël Zasso） [#48811](https://github.com/nodejs/node/pull/48811)
* \[[`e01cce50f5`](https://github.com/nodejs/node/commit/e01cce50f5)] - **test**: 跳过带指针压缩的实验性测试（Colin Ihrig） [#48738](https://github.com/nodejs/node/pull/48738)
* \[[`d5e93b1074`](https://github.com/nodejs/node/commit/d5e93b1074)] - **test**: 修复 x86 上的 test-string-decode.js 间歇性失败（Stefan Stojanovic） [#48750](https://github.com/nodejs/node/pull/48750)
* \[[`9136667d7d`](https://github.com/nodejs/node/commit/9136667d7d)] - **test\_runner**: 不要为 todo 测试设置退出码（Moshe Atlow） [#48929](https://github.com/nodejs/node/pull/48929)
* \[[`52c94908c0`](https://github.com/nodejs/node/commit/52c94908c0)] - **test\_runner**: 修复 spec reporter 中的 todo 和 only（Moshe Atlow） [#48929](https://github.com/nodejs/node/pull/48929)
* \[[`5ccfb8d515`](https://github.com/nodejs/node/commit/5ccfb8d515)] - **test\_runner**: 在 TAP reporter 中展开错误消息（Colin Ihrig） [#48942](https://github.com/nodejs/node/pull/48942)
* \[[`fa19b0ed05`](https://github.com/nodejs/node/commit/fa19b0ed05)] - **test\_runner**: 添加 `__proto__` null（Raz Luvaton） [#48663](https://github.com/nodejs/node/pull/48663)
* \[[`65d23940bf`](https://github.com/nodejs/node/commit/65d23940bf)] - **test\_runner**: 修复 describe 中异步回调未被 await 的问题（Raz Luvaton） [#48856](https://github.com/nodejs/node/pull/48856)
* \[[`4bd5e55b43`](https://github.com/nodejs/node/commit/4bd5e55b43)] - **test\_runner**: 修复 test\_runner `test:fail` 事件类型（Ethan Arrowood） [#48854](https://github.com/nodejs/node/pull/48854)
* \[[`41058beed8`](https://github.com/nodejs/node/commit/41058beed8)] - **test\_runner**: 在测试结束时调用 abort（Raz Luvaton） [#48827](https://github.com/nodejs/node/pull/48827)
* \[[`821b11a59f`](https://github.com/nodejs/node/commit/821b11a59f)] - **tls**: 修复双 TLS 的 bug（rogertyang） [#48969](https://github.com/nodejs/node/pull/48969)
* \[[`4439327e73`](https://github.com/nodejs/node/commit/4439327e73)] - **tools**: 更新 lint-md-dependencies（Node.js GitHub Bot） [#49122](https://github.com/nodejs/node/pull/49122)
* \[[`21dc844309`](https://github.com/nodejs/node/commit/21dc844309)] - **tools**: 在 actions 中使用 spec reporter（Moshe Atlow） [#49129](https://github.com/nodejs/node/pull/49129)
* \[[`3471758696`](https://github.com/nodejs/node/commit/3471758696)] - **tools**: 在 github actions 中运行时使用 @reporters/github（Moshe Atlow） [#49129](https://github.com/nodejs/node/pull/49129)
* \[[`95a6e7661e`](https://github.com/nodejs/node/commit/95a6e7661e)] - **tools**: 将 @reporters/github 添加到 tools（Moshe Atlow） [#49129](https://github.com/nodejs/node/pull/49129)
* \[[`995cbf93eb`](https://github.com/nodejs/node/commit/995cbf93eb)] - **tools**: 将 eslint 更新到 8.47.0（Node.js GitHub Bot） [#49124](https://github.com/nodejs/node/pull/49124)
* \[[`ed065bc56e`](https://github.com/nodejs/node/commit/ed065bc56e)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@3.27.2（Node.js GitHub Bot） [#49035](https://github.com/nodejs/node/pull/49035)
* \[[`a5f37178ad`](https://github.com/nodejs/node/commit/a5f37178ad)] - **tools**: 限制自动启动的 CI 数量（Antoine du Hamel） [#49067](https://github.com/nodejs/node/pull/49067)
* \[[`c1bd680f89`](https://github.com/nodejs/node/commit/c1bd680f89)] - **tools**: 将 eslint 更新到 8.46.0（Node.js GitHub Bot） [#48966](https://github.com/nodejs/node/pull/48966)
* \[[`e09a6b4821`](https://github.com/nodejs/node/commit/e09a6b4821)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@3.27.0（Node.js GitHub Bot） [#48965](https://github.com/nodejs/node/pull/48965)
* \[[`0cd2393bd9`](https://github.com/nodejs/node/commit/0cd2393bd9)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@3.26.3（Node.js GitHub Bot） [#48888](https://github.com/nodejs/node/pull/48888)
* \[[`41929a2906`](https://github.com/nodejs/node/commit/41929a2906)] - **tools**: 将 lint-md-dependencies 更新为 @rollup/plugin-commonjs\@25.0.3（Node.js GitHub Bot） [#48791](https://github.com/nodejs/node/pull/48791)
* \[[`1761bdfbd9`](https://github.com/nodejs/node/commit/1761bdfbd9)] - **tools**: 将 eslint 更新到 8.45.0（Node.js GitHub Bot） [#48793](https://github.com/nodejs/node/pull/48793)
* \[[`b82f05cc4b`](https://github.com/nodejs/node/commit/b82f05cc4b)] - **typings**: 更新 `child_process` 中 `cwd` 的 JSDoc（LiviaMedeiros） [#49029](https://github.com/nodejs/node/pull/49029)
* \[[`be7b511255`](https://github.com/nodejs/node/commit/be7b511255)] - **typings**: 将 JSDoc 与实际实现同步（Hyunjin Kim） [#48853](https://github.com/nodejs/node/pull/48853)
* \[[`45c860035d`](https://github.com/nodejs/node/commit/45c860035d)] - **url**: 为 V8 fast api 方法 `canParse` 添加重载（Yagiz Nizipli） [#48993](https://github.com/nodejs/node/pull/48993)
* \[[`60d614157b`](https://github.com/nodejs/node/commit/60d614157b)] - **url**: 通过检查 `path` 修复 `isURL` 检测（Zhuo Zhang） [#48928](https://github.com/nodejs/node/pull/48928)
* \[[`b12c3b5240`](https://github.com/nodejs/node/commit/b12c3b5240)] - **url**: 确保 getter 访问不会修改可观察符号（Antoine du Hamel） [#48897](https://github.com/nodejs/node/pull/48897)
* \[[`30fb7b7535`](https://github.com/nodejs/node/commit/30fb7b7535)] - **url**: 减少 `pathToFileURL` 的 cpp 调用（Yagiz Nizipli） [#48709](https://github.com/nodejs/node/pull/48709)
* \[[`c3dbd0c1e4`](https://github.com/nodejs/node/commit/c3dbd0c1e4)] - **util**: 使用 `primordials.ArrayPrototypeIndexOf` 代替可变方法（DaisyDogs07） [#48586](https://github.com/nodejs/node/pull/48586)
* \[[`b79b2927ca`](https://github.com/nodejs/node/commit/b79b2927ca)] - **watch**: 降低 debounce 频率（Moshe Atlow） [#48926](https://github.com/nodejs/node/pull/48926)
* \[[`a12996298e`](https://github.com/nodejs/node/commit/a12996298e)] - **watch**: 使用 debounce 代替 throttle（Moshe Atlow） [#48926](https://github.com/nodejs/node/pull/48926)

<a id="20.5.1"></a>

## 2023-08-09，版本 20.5.1（当前），@RafaelGSS

这是一个安全发布版本。

### 重要变更

以下 CVE 已在此版本中修复：

* [CVE-2023-32002](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-32002)：可通过 Module._load 绕过策略（高）
* [CVE-2023-32558](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-32558)：process.binding() 可通过路径遍历绕过权限模型（高）
* [CVE-2023-32004](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-32004)：可在 Buffer 中指定路径遍历序列从而绕过权限模型（高）
* [CVE-2023-32006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-32006)：可通过 module.constructor.createRequire 绕过策略（中）
* [CVE-2023-32559](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-32559)：可通过 process.binding 绕过策略（中）
* [CVE-2023-32005](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-32005)：fs.statfs 可绕过权限模型（低）
* [CVE-2023-32003](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-32003)：fs.mkdtemp() 和 fs.mkdtempSync() 可绕过权限模型（低）
* OpenSSL 安全发布
  * [OpenSSL 安全公告 7 月 14 日](https://mta.openssl.org/pipermail/openssl-announce/2023-July/000264.html)。
  * [OpenSSL 安全公告 7 月 19 日](https://mta.openssl.org/pipermail/openssl-announce/2023-July/000265.html)。
  * [OpenSSL 安全公告 7 月 31 日](https://mta.openssl.org/pipermail/openssl-announce/2023-July/000267.html)

有关每个漏洞的更详细信息，请参阅博客文章 [2023 年 8 月安全发布](https://nodejs.org/en/blog/vulnerability/august-2023-security-releases/)。

### 提交

* \[[`92300b51b4`](https://github.com/nodejs/node/commit/92300b51b4)] - **deps**: 为 openssl-3.0.10+quic1 更新 archs 文件（Node.js GitHub Bot） [#49036](https://github.com/nodejs/node/pull/49036)
* \[[`559698abf2`](https://github.com/nodejs/node/commit/559698abf2)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.10+quic1（Node.js GitHub Bot） [#49036](https://github.com/nodejs/node/pull/49036)
* \[[`1bf3429e8e`](https://github.com/nodejs/node/commit/1bf3429e8e)] - **lib,permission**: 在启用 pm 时限制 process.binding（RafaelGSS） [nodejs-private/node-private#438](https://github.com/nodejs-private/node-private/pull/438)
* \[[`98a83a67e6`](https://github.com/nodejs/node/commit/98a83a67e6)] - **permission**: 在调用 mkdtemp 时确保解析路径（RafaelGSS） [nodejs-private/node-private#464](https://github.com/nodejs-private/node-private/pull/464)
* \[[`1f0cde466b`](https://github.com/nodejs/node/commit/1f0cde466b)] - **permission**: 处理 fs 调用中的 buffer 路径（RafaelGSS） [nodejs-private/node-private#439](https://github.com/nodejs-private/node-private/pull/439)
* \[[`bd094d60ea`](https://github.com/nodejs/node/commit/bd094d60ea)] - **permission**: 处理 fstatfs 并添加支持 pm 的列表（RafaelGSS） [nodejs-private/node-private#441](https://github.com/nodejs-private/node-private/pull/441)
* \[[`7337d21484`](https://github.com/nodejs/node/commit/7337d21484)] - **policy**: 处理 Module.constructor 和 main.extensions 绕过（RafaelGSS） [nodejs-private/node-private#417](https://github.com/nodejs-private/node-private/pull/417)
* \[[`cf348ec640`](https://github.com/nodejs/node/commit/cf348ec640)] - **policy**: 在启用时禁用 process.binding()（Tobias Nießen） [nodejs-private/node-private#397](https://github.com/nodejs-private/node-private/pull/397)

<a id="20.5.0"></a>

## 2023-07-18，版本 20.5.0（当前），@juanarbol

### 重要变更

* \[[`45be29d89f`](https://github.com/nodejs/node/commit/45be29d89f)] - **doc**: 将 atlowChemi 添加为协作者（atlowChemi） [#48757](https://github.com/nodejs/node/pull/48757)
* \[[`a316808136`](https://github.com/nodejs/node/commit/a316808136)] - **(SEMVER-MINOR)** **events**: 允许安全地向 abortSignal 添加监听器（Chemi Atlow） [#48596](https://github.com/nodejs/node/pull/48596)
* \[[`986b46a567`](https://github.com/nodejs/node/commit/986b46a567)] - **fs**: 为 readFileSync utf-8 添加快速路径（Yagiz Nizipli） [#48658](https://github.com/nodejs/node/pull/48658)
* \[[`0ef73ff6f0`](https://github.com/nodejs/node/commit/0ef73ff6f0)] - **(SEMVER-MINOR)** **test_runner**: 添加 shards 支持（Raz Luvaton） [#48639](https://github.com/nodejs/node/pull/48639)

### 提交

* \[[`eb0aba59b8`](https://github.com/nodejs/node/commit/eb0aba59b8)] - **bootstrap**: 为 Symbol.{dispose,asyncDispose} 使用正确的描述符（Jordan Harband） [#48703](https://github.com/nodejs/node/pull/48703)
* \[[`e2d0195dcf`](https://github.com/nodejs/node/commit/e2d0195dcf)] - **bootstrap**: 使用标志 kNoBrowserGlobals 隐藏实验性的 web 全局对象（Chengzhong Wu） [#48545](https://github.com/nodejs/node/pull/48545)
* \[[`67a1018389`](https://github.com/nodejs/node/commit/67a1018389)] - **build**: 不要将目标工具链标志传递给主机工具链（Ivan Trubach） [#48597](https://github.com/nodejs/node/pull/48597)
* \[[`7d843bb942`](https://github.com/nodejs/node/commit/7d843bb942)] - **child_process**: 使用 addAbortListener（atlowChemi） [#48550](https://github.com/nodejs/node/pull/48550)
* \[[`4e08160f8c`](https://github.com/nodejs/node/commit/4e08160f8c)] - **child_process**: 支持 `Symbol.dispose`（Moshe Atlow） [#48551](https://github.com/nodejs/node/pull/48551)
* \[[`ef7728bf36`](https://github.com/nodejs/node/commit/ef7728bf36)] - **deps**: 将 nghttp2 更新到 1.55.1（Node.js GitHub Bot） [#48790](https://github.com/nodejs/node/pull/48790)
* \[[`1454f02499`](https://github.com/nodejs/node/commit/1454f02499)] - **deps**: 将 nghttp2 更新到 1.55.0（Node.js GitHub Bot） [#48746](https://github.com/nodejs/node/pull/48746)
* \[[`fa94debf46`](https://github.com/nodejs/node/commit/fa94debf46)] - **deps**: 将 minimatch 更新到 9.0.3（Node.js GitHub Bot） [#48704](https://github.com/nodejs/node/pull/48704)
* \[[`c73cfcc144`](https://github.com/nodejs/node/commit/c73cfcc144)] - **deps**: 将 acorn 更新到 8.10.0（Node.js GitHub Bot） [#48713](https://github.com/nodejs/node/pull/48713)
* \[[`b7a076a052`](https://github.com/nodejs/node/commit/b7a076a052)] - **deps**: V8：cherry-pick cb00db4dba6c（Keyhan Vakil） [#48671](https://github.com/nodejs/node/pull/48671)
* \[[`150e15536b`](https://github.com/nodejs/node/commit/150e15536b)] - **deps**: 将 npm 升级到 9.8.0（npm 团队） [#48665](https://github.com/nodejs/node/pull/48665)
* \[[`c47b2cbd35`](https://github.com/nodejs/node/commit/c47b2cbd35)] - **dgram**: socket 添加 `asyncDispose`（atlowChemi） [#48717](https://github.com/nodejs/node/pull/48717)
* \[[`002ce31cca`](https://github.com/nodejs/node/commit/002ce31cca)] - **dgram**: 使用 addAbortListener（atlowChemi） [#48550](https://github.com/nodejs/node/pull/48550)
* \[[`45be29d89f`](https://github.com/nodejs/node/commit/45be29d89f)] - **doc**: 将 atlowChemi 添加为协作者（atlowChemi） [#48757](https://github.com/nodejs/node/pull/48757)
* \[[`69b55d2261`](https://github.com/nodejs/node/commit/69b55d2261)] - **doc**: 修复 http.md 和 https.md 中的歧义（an5er） [#48692](https://github.com/nodejs/node/pull/48692)
* \[[`caccb051c7`](https://github.com/nodejs/node/commit/caccb051c7)] - **doc**: 澄清 transform._transform() 回调参数逻辑（Rafael Sofi-zada） [#48680](https://github.com/nodejs/node/pull/48680)
* \[[`999ae0c8c3`](https://github.com/nodejs/node/commit/999ae0c8c3)] - **doc**: 修复在 Windows 中复制 node 可执行文件的问题（Yoav Vainrich） [#48624](https://github.com/nodejs/node/pull/48624)
* \[[`7daefaeb44`](https://github.com/nodejs/node/commit/7daefaeb44)] - **doc**: 去掉 v20 changelog 中的 \<b>（Rafael Gonzaga） [#48649](https://github.com/nodejs/node/pull/48649)
* \[[`dd7ea3e1df`](https://github.com/nodejs/node/commit/dd7ea3e1df)] - **doc**: 提及 git node release prepare（Rafael Gonzaga） [#48644](https://github.com/nodejs/node/pull/48644)
* \[[`cc7809df21`](https://github.com/nodejs/node/commit/cc7809df21)] - **esm**: 修复旧版 main 解析中的弃用提示发出（Antoine du Hamel） [#48664](https://github.com/nodejs/node/pull/48664)
* \[[`67b13d1dba`](https://github.com/nodejs/node/commit/67b13d1dba)] - **events**: 修复 listenerCount 不比较包装监听器的 bug（yuzheng14） [#48592](https://github.com/nodejs/node/pull/48592)
* \[[`a316808136`](https://github.com/nodejs/node/commit/a316808136)] - **(SEMVER-MINOR)** **events**: 允许安全地向 abortSignal 添加监听器（Chemi Atlow） [#48596](https://github.com/nodejs/node/pull/48596)
* \[[`986b46a567`](https://github.com/nodejs/node/commit/986b46a567)] - **fs**: 为 readFileSync utf-8 添加快速路径（Yagiz Nizipli） [#48658](https://github.com/nodejs/node/pull/48658)
* \[[`e4333ac41f`](https://github.com/nodejs/node/commit/e4333ac41f)] - **http2**: 使用 addAbortListener（atlowChemi） [#48550](https://github.com/nodejs/node/pull/48550)
* \[[`4a0b66e4f9`](https://github.com/nodejs/node/commit/4a0b66e4f9)] - **http2**: 在 AbortController signal 上发送 RST code 8（Devraj Mehta） [#48573](https://github.com/nodejs/node/pull/48573)
* \[[`1295c76fce`](https://github.com/nodejs/node/commit/1295c76fce)] - **lib**: 使用 addAbortListener（atlowChemi） [#48550](https://github.com/nodejs/node/pull/48550)
* \[[`dff6c25a36`](https://github.com/nodejs/node/commit/dff6c25a36)] - **meta**: 将 actions/checkout 从 3.5.2 升级到 3.5.3（dependabot[bot]） [#48625](https://github.com/nodejs/node/pull/48625)
* \[[`b5cb69ceaa`](https://github.com/nodejs/node/commit/b5cb69ceaa)] - **meta**: 将 step-security/harden-runner 从 2.4.0 升级到 2.4.1（dependabot[bot]） [#48626](https://github.com/nodejs/node/pull/48626)
* \[[`332e480b46`](https://github.com/nodejs/node/commit/332e480b46)] - **meta**: 将 ossf/scorecard-action 从 2.1.3 升级到 2.2.0（dependabot[bot]） [#48628](https://github.com/nodejs/node/pull/48628)
* \[[`25c5a0aaee`](https://github.com/nodejs/node/commit/25c5a0aaee)] - **meta**: 将 github/codeql-action 从 2.3.6 升级到 2.20.1（dependabot[bot]） [#48627](https://github.com/nodejs/node/pull/48627)
* \[[`6406f50ab1`](https://github.com/nodejs/node/commit/6406f50ab1)] - **module**: 添加 SourceMap.lineLengths（Isaac Z. Schlueter） [#48461](https://github.com/nodejs/node/pull/48461)
* \[[`cfa69bd48c`](https://github.com/nodejs/node/commit/cfa69bd48c)] - **net**: server 添加 `asyncDispose`（atlowChemi） [#48717](https://github.com/nodejs/node/pull/48717)
* \[[`ac11264cc5`](https://github.com/nodejs/node/commit/ac11264cc5)] - **net**: 使用 addAbortListener（atlowChemi） [#48550](https://github.com/nodejs/node/pull/48550)
* \[[`82d6b13bf6`](https://github.com/nodejs/node/commit/82d6b13bf6)] - **permission**: 在插入 fs 节点时添加调试日志（Rafael Gonzaga） [#48677](https://github.com/nodejs/node/pull/48677)
* \[[`f4333b1cdd`](https://github.com/nodejs/node/commit/f4333b1cdd)] - **permission**: v8.writeHeapSnapshot 和 process.report（Rafael Gonzaga） [#48564](https://github.com/nodejs/node/pull/48564)
* \[[`f691dca6c9`](https://github.com/nodejs/node/commit/f691dca6c9)] - **readline**: 使用 addAbortListener（atlowChemi） [#48550](https://github.com/nodejs/node/pull/48550)
* \[[`227e6bd898`](https://github.com/nodejs/node/commit/227e6bd898)] - **src**: 在 `fs.readFileSync` 失败操作时传递 syscall（Yagiz Nizipli） [#48815](https://github.com/nodejs/node/pull/48815)
* \[[`a9a4b73653`](https://github.com/nodejs/node/commit/a9a4b73653)] - **src**: 使 BaseObject 迭代顺序确定化（Joyee Cheung） [#48702](https://github.com/nodejs/node/pull/48702)
* \[[`d99ea4845a`](https://github.com/nodejs/node/commit/d99ea4845a)] - **src**: 移除 CompileFunction 的 kEagerCompile（Keyhan Vakil） [#48671](https://github.com/nodejs/node/pull/48671)
* \[[`df363d0010`](https://github.com/nodejs/node/commit/df363d0010)] - **src**: 取消 X509 getter 实现的重复（Tobias Nießen） [#48563](https://github.com/nodejs/node/pull/48563)
* \[[`9cf2e1f55b`](https://github.com/nodejs/node/commit/9cf2e1f55b)] - **src,lib**: 减少 esm 旧版 main resolve 的 C++ 调用次数（Vinicius Lourenço） [#48325](https://github.com/nodejs/node/pull/48325)
* \[[`daeb21dde9`](https://github.com/nodejs/node/commit/daeb21dde9)] - **stream**: 修复在 pipe 到满的 sink 时的死锁（Robert Nagy） [#48691](https://github.com/nodejs/node/pull/48691)
* \[[`5a382d02d6`](https://github.com/nodejs/node/commit/5a382d02d6)] - **stream**: 使用 addAbortListener（atlowChemi） [#48550](https://github.com/nodejs/node/pull/48550)
* \[[`6e82077dd4`](https://github.com/nodejs/node/commit/6e82077dd4)] - **test**: 修复 test-net-throttle 的不稳定性（Luigi Pinca） [#48599](https://github.com/nodejs/node/pull/48599)
* \[[`d378b2c822`](https://github.com/nodejs/node/commit/d378b2c822)] - **test**: 将 test-net-throttle 移至并行执行（Luigi Pinca） [#48599](https://github.com/nodejs/node/pull/48599)
* \[[`dfa0aee5bf`](https://github.com/nodejs/node/commit/dfa0aee5bf)] - _**Revert**_ "**test**: remove test-crypto-keygen flaky designation"（Luigi Pinca） [#48652](https://github.com/nodejs/node/pull/48652)
* \[[`0ef73ff6f0`](https://github.com/nodejs/node/commit/0ef73ff6f0)] - **(SEMVER-MINOR)** **test_runner**: 添加 shards 支持（Raz Luvaton） [#48639](https://github.com/nodejs/node/pull/48639)
* \[[`e2442bb7ef`](https://github.com/nodejs/node/commit/e2442bb7ef)] - **timers**: 支持 Symbol.dispose（Moshe Atlow） [#48633](https://github.com/nodejs/node/pull/48633)
* \[[`4398ade426`](https://github.com/nodejs/node/commit/4398ade426)] - **tools**: 使用 Python 3 运行 fetch_deps.py（Richard Lau） [#48729](https://github.com/nodejs/node/pull/48729)
* \[[`38ce95d054`](https://github.com/nodejs/node/commit/38ce95d054)] - **tools**: 将 doc 更新为 unist-util-select@5.0.0 unist-util-visit@5.0.0（Node.js GitHub Bot） [#48714](https://github.com/nodejs/node/pull/48714)
* \[[`b25e78a998`](https://github.com/nodejs/node/commit/b25e78a998)] - **tools**: 将 lint-md-dependencies 更新为 rollup@3.26.2（Node.js GitHub Bot） [#48705](https://github.com/nodejs/node/pull/48705)
* \[[`a1f4ff7c59`](https://github.com/nodejs/node/commit/a1f4ff7c59)] - **tools**: 将 eslint 更新到 8.44.0（Node.js GitHub Bot） [#48632](https://github.com/nodejs/node/pull/48632)
* \[[`42dc6eb698`](https://github.com/nodejs/node/commit/42dc6eb698)] - **tools**: 将 lint-md-dependencies 更新为 rollup@3.26.0（Node.js GitHub Bot） [#48631](https://github.com/nodejs/node/pull/48631)
* \[[`07bfcc45ab`](https://github.com/nodejs/node/commit/07bfcc45ab)] - **url**: 修复 v8 优化时 `canParse` 取值为 false 的问题（Yagiz Nizipli） [#48817](https://github.com/nodejs/node/pull/48817)

<a id="20.4.0"></a>

## 2023-07-05，版本 20.4.0（当前），@RafaelGSS

### 显著变更

#### Mock Timers

这项新功能使开发者能够为依赖时间的功能编写更可靠、更可预测的测试。
它包含 `MockTimers`，能够模拟 `globals`、`node:timers` 和 `node:timers/promises` 中的 `setTimeout`、`setInterval`。

该功能提供了一个简单的 API，用于推进时间、启用特定计时器以及释放所有计时器。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();
  // 可选择要模拟的内容
  context.mock.timers.enable(['setTimeout']);
  const nineSecs = 9000;
  setTimeout(fn, nineSecs);

  const threeSeconds = 3000;
  context.mock.timers.tick(threeSeconds);
  context.mock.timers.tick(threeSeconds);
  context.mock.timers.tick(threeSeconds);

  assert.strictEqual(fn.mock.callCount(), 1);
});
```

此功能由 Erick Wendel 在 [#47775](https://github.com/nodejs/node/pull/47775) 中贡献。

#### 支持显式资源管理提案

Node 正在为其资源添加对[显式资源管理](https://github.com/tc39/proposal-explicit-resource-management)
提案的支持，使 TypeScript/babel 用户可以使用 `using`/`await using`，同时
V8 对其他所有人也提供支持的道路正在推进中。

此功能由 Moshe Atlow 和 Benjamin Gruenbaum 在 [#48518](https://github.com/nodejs/node/pull/48518) 中贡献。

#### 其他显著变更

* \[[`fe333d2584`](https://github.com/nodejs/node/commit/fe333d2584)] - **crypto**: 将根证书更新为 NSS 3.90（Node.js GitHub Bot） [#48416](https://github.com/nodejs/node/pull/48416)
* \[[`60c2ea4e79`](https://github.com/nodejs/node/commit/60c2ea4e79)] - **doc**: 将 vmoroz 加入协作者（Vladimir Morozov） [#48527](https://github.com/nodejs/node/pull/48527)
* \[[`5cacdf9e6b`](https://github.com/nodejs/node/commit/5cacdf9e6b)] - **doc**: 将 kvakil 加入协作者（Keyhan Vakil） [#48449](https://github.com/nodejs/node/pull/48449)
* \[[`504d1d7bdc`](https://github.com/nodejs/node/commit/504d1d7bdc)] - **(SEMVER-MINOR)** **tls**: 为动态 ALPN 协商添加 ALPNCallback 服务器选项（Tim Perry） [#45190](https://github.com/nodejs/node/pull/45190)

### 提交

* \[[`8a611a387f`](https://github.com/nodejs/node/commit/8a611a387f)] - **benchmark**: 添加 bar.R（Rafael Gonzaga） [#47729](https://github.com/nodejs/node/pull/47729)
* \[[`12fa716cf9`](https://github.com/nodejs/node/commit/12fa716cf9)] - **benchmark**: 重构 crypto oneshot（Filip Skokan） [#48267](https://github.com/nodejs/node/pull/48267)
* \[[`d6ecbde592`](https://github.com/nodejs/node/commit/d6ecbde592)] - **benchmark**: 添加 crypto.create\*Key（Filip Skokan） [#48284](https://github.com/nodejs/node/pull/48284)
* \[[`e60b6dedd8`](https://github.com/nodejs/node/commit/e60b6dedd8)] - **bootstrap**: 统一 snapshot builder 和 embedder 入口点（Joyee Cheung） [#48242](https://github.com/nodejs/node/pull/48242)
* \[[`40662957b1`](https://github.com/nodejs/node/commit/40662957b1)] - **bootstrap**: 简化 source map handlers 的初始化（Joyee Cheung） [#48304](https://github.com/nodejs/node/pull/48304)
* \[[`6551538079`](https://github.com/nodejs/node/commit/6551538079)] - **build**: 修复 `configure --link-module`（Richard Lau） [#48522](https://github.com/nodejs/node/pull/48522)
* \[[`f7f32089e7`](https://github.com/nodejs/node/commit/f7f32089e7)] - **build**: 同步 libuv 头文件变更（Jiawen Geng） [#48429](https://github.com/nodejs/node/pull/48429)
* \[[`f60205c915`](https://github.com/nodejs/node/commit/f60205c915)] - **build**: 更新用于关闭陈旧 PR 的 action（Michael Dawson） [#48196](https://github.com/nodejs/node/pull/48196)
* \[[`4f4d0b802e`](https://github.com/nodejs/node/commit/4f4d0b802e)] - **child\_process**: 提升 Linux 上的 spawn 性能（Keyhan Vakil） [#48523](https://github.com/nodejs/node/pull/48523)
* \[[`fe333d2584`](https://github.com/nodejs/node/commit/fe333d2584)] - **crypto**: 将根证书更新为 NSS 3.90（Node.js GitHub Bot） [#48416](https://github.com/nodejs/node/pull/48416)
* \[[`89aaf16237`](https://github.com/nodejs/node/commit/89aaf16237)] - **crypto**: 移除 OpenSSL 3 的 OPENSSL\_FIPS 守卫（Richard Lau） [#48392](https://github.com/nodejs/node/pull/48392)
* \[[`6199e1946c`](https://github.com/nodejs/node/commit/6199e1946c)] - **deps**: 升级到 libuv 1.46.0（Santiago Gimeno） [#48618](https://github.com/nodejs/node/pull/48618)
* \[[`1b2b930fda`](https://github.com/nodejs/node/commit/1b2b930fda)] - **deps**: 在 openssl gypi 中添加 loong64 配置（Shi Pujin） [#48043](https://github.com/nodejs/node/pull/48043)
* \[[`ba8d048929`](https://github.com/nodejs/node/commit/ba8d048929)] - **deps**: 将 acorn 更新到 8.9.0（Node.js GitHub Bot） [#48484](https://github.com/nodejs/node/pull/48484)
* \[[`d96f921d06`](https://github.com/nodejs/node/commit/d96f921d06)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-f81f385（Node.js GitHub Bot） [#48541](https://github.com/nodejs/node/pull/48541)
* \[[`ed1d047e8f`](https://github.com/nodejs/node/commit/ed1d047e8f)] - **deps**: 将 googletest 更新到 ec4fed9（Node.js GitHub Bot） [#48538](https://github.com/nodejs/node/pull/48538)
* \[[`f43d718c67`](https://github.com/nodejs/node/commit/f43d718c67)] - **deps**: 将 minimatch 更新到 9.0.2（Node.js GitHub Bot） [#48542](https://github.com/nodejs/node/pull/48542)
* \[[`2f66147cbf`](https://github.com/nodejs/node/commit/2f66147cbf)] - **deps**: 将 corepack 更新到 0.19.0（Node.js GitHub Bot） [#48540](https://github.com/nodejs/node/pull/48540)
* \[[`d91b0fde73`](https://github.com/nodejs/node/commit/d91b0fde73)] - **deps**: V8: cherry-pick 1a782f6543ae（Keyhan Vakil） [#48523](https://github.com/nodejs/node/pull/48523)
* \[[`112335e342`](https://github.com/nodejs/node/commit/112335e342)] - **deps**: 将 corepack 更新到 0.18.1（Node.js GitHub Bot） [#48483](https://github.com/nodejs/node/pull/48483)
* \[[`2b141c413f`](https://github.com/nodejs/node/commit/2b141c413f)] - **deps**: 将 icu 更新到 73.2（Node.js GitHub Bot） [#48502](https://github.com/nodejs/node/pull/48502)
* \[[`188b34d4a1`](https://github.com/nodejs/node/commit/188b34d4a1)] - **deps**: 将 npm 升级到 9.7.2（npm team） [#48514](https://github.com/nodejs/node/pull/48514)
* \[[`bf0444b5d9`](https://github.com/nodejs/node/commit/bf0444b5d9)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-3ca9f16（Node.js GitHub Bot） [#48413](https://github.com/nodejs/node/pull/48413)
* \[[`b339d80a56`](https://github.com/nodejs/node/commit/b339d80a56)] - **deps**: 将 npm 升级到 9.7.1（npm team） [#48378](https://github.com/nodejs/node/pull/48378)
* \[[`4132931b87`](https://github.com/nodejs/node/commit/4132931b87)] - **deps**: 将 simdutf 更新到 3.2.14（Node.js GitHub Bot） [#48344](https://github.com/nodejs/node/pull/48344)
* \[[`8cd56c1e85`](https://github.com/nodejs/node/commit/8cd56c1e85)] - **deps**: 将 ada 更新到 2.5.1（Node.js GitHub Bot） [#48319](https://github.com/nodejs/node/pull/48319)
* \[[`78cffcd645`](https://github.com/nodejs/node/commit/78cffcd645)] - **deps**: 将 zlib 更新到 982b036（Node.js GitHub Bot） [#48327](https://github.com/nodejs/node/pull/48327)
* \[[`6d00c2e33b`](https://github.com/nodejs/node/commit/6d00c2e33b)] - **doc**: 修复选项顺序（Luigi Pinca） [#48617](https://github.com/nodejs/node/pull/48617)
* \[[`7ad2d3a5d1`](https://github.com/nodejs/node/commit/7ad2d3a5d1)] - **doc**: 更新安全发布值守人员（Rafael Gonzaga） [#48569](https://github.com/nodejs/node/pull/48569)
* \[[`cc3a056fdd`](https://github.com/nodejs/node/commit/cc3a056fdd)] - **doc**: 更新 describe 的返回类型（Shrujal Shah） [#48572](https://github.com/nodejs/node/pull/48572)
* \[[`99ae0b98af`](https://github.com/nodejs/node/commit/99ae0b98af)] - **doc**: 运行 license-builder（github-actions\[bot]） [#48552](https://github.com/nodejs/node/pull/48552)
* \[[`9750d8205c`](https://github.com/nodejs/node/commit/9750d8205c)] - **doc**: 添加 ReadableStream 中 autoAllocateChunkSize 的描述（Debadree Chatterjee） [#48004](https://github.com/nodejs/node/pull/48004)
* \[[`417927bb41`](https://github.com/nodejs/node/commit/417927bb41)] - **doc**: 修复 `watch` 结果中的 `filename` 类型（Dmitry Semigradsky） [#48032](https://github.com/nodejs/node/pull/48032)
* \[[`ca2ae86bd7`](https://github.com/nodejs/node/commit/ca2ae86bd7)] - **doc**: 从 MIMEType 构造函数中拆出 `mime` 和 `MIMEParams`（Dmitry Semigradsky） [#47950](https://github.com/nodejs/node/pull/47950)
* \[[`bda1228135`](https://github.com/nodejs/node/commit/bda1228135)] - **doc**: 更新 security-release-process.md（Rafael Gonzaga） [#48504](https://github.com/nodejs/node/pull/48504)
* \[[`60c2ea4e79`](https://github.com/nodejs/node/commit/60c2ea4e79)] - **doc**: 将 vmoroz 加入协作者（Vladimir Morozov） [#48527](https://github.com/nodejs/node/pull/48527)
* \[[`37bc0eac4a`](https://github.com/nodejs/node/commit/37bc0eac4a)] - **doc**: 改进 inspector.close() 的描述（mary marchini） [#48494](https://github.com/nodejs/node/pull/48494)
* \[[`2a403cdad5`](https://github.com/nodejs/node/commit/2a403cdad5)] - **doc**: 在 export 条件中链接到 Runtime Keys（Jacob Hummer） [#48408](https://github.com/nodejs/node/pull/48408)
* \[[`e2d579e644`](https://github.com/nodejs/node/commit/e2d579e644)] - **doc**: 更新 fs flags 文档（sinkhaha） [#48463](https://github.com/nodejs/node/pull/48463)
* \[[`38bf290115`](https://github.com/nodejs/node/commit/38bf290115)] - **doc**: 修订 `error.md` 的介绍（Antoine du Hamel） [#48423](https://github.com/nodejs/node/pull/48423)
* \[[`641a2e9c6d`](https://github.com/nodejs/node/commit/641a2e9c6d)] - **doc**: 将 preveen-stack 加入 triagers（Preveen P） [#48387](https://github.com/nodejs/node/pull/48387)
* \[[`4ab5e8d2e3`](https://github.com/nodejs/node/commit/4ab5e8d2e3)] - **doc**: 明确测试事件中 file 为 undefined 的情况（Moshe Atlow） [#48451](https://github.com/nodejs/node/pull/48451)
* \[[`5cacdf9e6b`](https://github.com/nodejs/node/commit/5cacdf9e6b)] - **doc**: 将 kvakil 加入协作者（Keyhan Vakil） [#48449](https://github.com/nodejs/node/pull/48449)
* \[[`b9c643e3ef`](https://github.com/nodejs/node/commit/b9c643e3ef)] - **doc**: 添加有关 TSFN dispatch 的额外信息（Michael Dawson） [#48367](https://github.com/nodejs/node/pull/48367)
* \[[`17a0e1d1bf`](https://github.com/nodejs/node/commit/17a0e1d1bf)] - **doc**: 添加来自 security wg 的新闻链接（Michael Dawson） [#48396](https://github.com/nodejs/node/pull/48396)
* \[[`3a62994a4f`](https://github.com/nodejs/node/commit/3a62994a4f)] - **doc**: 修复 events.md 中的拼写错误（Darshan Sen） [#48436](https://github.com/nodejs/node/pull/48436)
* \[[`e10a4cdf68`](https://github.com/nodejs/node/commit/e10a4cdf68)] - **doc**: 运行 license-builder（github-actions\[bot]） [#48336](https://github.com/nodejs/node/pull/48336)
* \[[`19fde638fd`](https://github.com/nodejs/node/commit/19fde638fd)] - **fs**: 如果 writeSync 失败，则以错误调用回调（killa） [#47949](https://github.com/nodejs/node/pull/47949)
* \[[`4cad9fd8bd`](https://github.com/nodejs/node/commit/4cad9fd8bd)] - **fs**: 移除不需要的 return 语句（Luigi Pinca） [#48526](https://github.com/nodejs/node/pull/48526)
* \[[`d367b73f43`](https://github.com/nodejs/node/commit/d367b73f43)] - **fs**: 使用 kResistStopPropagation（Chemi Atlow） [#48521](https://github.com/nodejs/node/pull/48521)
* \[[`e50c3169af`](https://github.com/nodejs/node/commit/e50c3169af)] - **fs, stream**: 初步支持 `Symbol.dispose` 和 `Symbol.asyncDispose`（Moshe Atlow） [#48518](https://github.com/nodejs/node/pull/48518)
* \[[`7d8a0b6eb7`](https://github.com/nodejs/node/commit/7d8a0b6eb7)] - **http**: 在清理时将 joinDuplicateHeaders 属性置为 null（Luigi Pinca） [#48608](https://github.com/nodejs/node/pull/48608)
* \[[`94ebb02f59`](https://github.com/nodejs/node/commit/94ebb02f59)] - **http**: 服务器添加 async dispose（atlowChemi） [#48548](https://github.com/nodejs/node/pull/48548)
* \[[`c6a69e31a3`](https://github.com/nodejs/node/commit/c6a69e31a3)] - **http**: 移除测试中无用的三元表达式（geekreal） [#48481](https://github.com/nodejs/node/pull/48481)
* \[[`2f0f40328f`](https://github.com/nodejs/node/commit/2f0f40328f)] - **http**: 修复启动时处理 timers headers 和 request 的问题（Franciszek Koltuniuk） [#48291](https://github.com/nodejs/node/pull/48291)
* \[[`5378ad8ab1`](https://github.com/nodejs/node/commit/5378ad8ab1)] - **http2**: 服务器添加 `asyncDispose`（atlowChemi） [#48548](https://github.com/nodejs/node/pull/48548)
* \[[`97a58c5970`](https://github.com/nodejs/node/commit/97a58c5970)] - **https**: 服务器添加 `asyncDispose`（atlowChemi） [#48548](https://github.com/nodejs/node/pull/48548)
* \[[`40ae6eb6aa`](https://github.com/nodejs/node/commit/40ae6eb6aa)] - **https**: 修复服务器关闭时连接检查间隔未清除的问题（Nitzan Uziely） [#48383](https://github.com/nodejs/node/pull/48383)
* \[[`15530fea4c`](https://github.com/nodejs/node/commit/15530fea4c)] - **lib**: 合并 cjs 和 esm package json 读取缓存（Yagiz Nizipli） [#48477](https://github.com/nodejs/node/pull/48477)
* \[[`32bda81c31`](https://github.com/nodejs/node/commit/32bda81c31)] - **lib**: 减少 `makeRequireFunction` 上的 url getter 调用（Yagiz Nizipli） [#48492](https://github.com/nodejs/node/pull/48492)
* \[[`0da03f01ba`](https://github.com/nodejs/node/commit/0da03f01ba)] - **lib**: 移除 check\_syntax 中重复的 requires（Yagiz Nizipli） [#48508](https://github.com/nodejs/node/pull/48508)
* \[[`97b00c347d`](https://github.com/nodejs/node/commit/97b00c347d)] - **lib**: 添加强制处理已停止事件的选项（Chemi Atlow） [#48301](https://github.com/nodejs/node/pull/48301)
* \[[`fe16749649`](https://github.com/nodejs/node/commit/fe16749649)] - **lib**: 修复 repl 与 pm 一起使用时的输出消息（Rafael Gonzaga） [#48438](https://github.com/nodejs/node/pull/48438)
* \[[`8c2c02d28a`](https://github.com/nodejs/node/commit/8c2c02d28a)] - **lib**: 仅在提供了任意信号时才创建 weakRef（Chemi Atlow） [#48448](https://github.com/nodejs/node/pull/48448)
* \[[`b6ae411ea9`](https://github.com/nodejs/node/commit/b6ae411ea9)] - **lib**: 移除对 bufferBinding.zeroFill 的过时删除（Chengzhong Wu） [#47881](https://github.com/nodejs/node/pull/47881)
* \[[`562b3d4856`](https://github.com/nodejs/node/commit/562b3d4856)] - **lib**: 将 web global 引导移动到预期文件（Chengzhong Wu） [#47881](https://github.com/nodejs/node/pull/47881)
* \[[`f9c0d5acac`](https://github.com/nodejs/node/commit/f9c0d5acac)] - **lib**: 修复 blob.stream() 导致 promise 挂起的问题（Debadree Chatterjee） [#48232](https://github.com/nodejs/node/pull/48232)
* \[[`0162a0f5bf`](https://github.com/nodejs/node/commit/0162a0f5bf)] - **lib**: 添加对继承的自定义检查方法的支持（Antoine du Hamel） [#48306](https://github.com/nodejs/node/pull/48306)
* \[[`159ab6627a`](https://github.com/nodejs/node/commit/159ab6627a)] - **lib**: 减少 http2 origins 上的 URL 调用（Yagiz Nizipli） [#48338](https://github.com/nodejs/node/pull/48338)
* \[[`f0709fdc59`](https://github.com/nodejs/node/commit/f0709fdc59)] - **module**: 添加 SourceMap.findOrigin（Isaac Z. Schlueter） [#47790](https://github.com/nodejs/node/pull/47790)
* \[[`4ec2d925b1`](https://github.com/nodejs/node/commit/4ec2d925b1)] - **module**: 减少 esm/load.js 中的 url 调用（Yagiz Nizipli） [#48337](https://github.com/nodejs/node/pull/48337)
* \[[`2c363971cc`](https://github.com/nodejs/node/commit/2c363971cc)] - **net**: 改进网络 family 自动选择句柄处理（Paolo Insogna） [#48464](https://github.com/nodejs/node/pull/48464)
* \[[`dbf9e9ffc8`](https://github.com/nodejs/node/commit/dbf9e9ffc8)] - **node-api**: 提供 napi\_define\_properties 快速路径（Gabriel Schulhof） [#48440](https://github.com/nodejs/node/pull/48440)
* \[[`87ad657777`](https://github.com/nodejs/node/commit/87ad657777)] - **node-api**: 实现外部字符串（Gabriel Schulhof） [#48339](https://github.com/nodejs/node/pull/48339)
* \[[`4efa6807ea`](https://github.com/nodejs/node/commit/4efa6807ea)] - **permission**: 处理带有子节点的末端节点情况（Rafael Gonzaga） [#48531](https://github.com/nodejs/node/pull/48531)
* \[[`84fe811108`](https://github.com/nodejs/node/commit/84fe811108)] - **repl**: 在静态导入错误消息中显示动态导入变体（Hemanth HM） [#48129](https://github.com/nodejs/node/pull/48129)
* \[[`bdcc037470`](https://github.com/nodejs/node/commit/bdcc037470)] - **report**: 在未进入任何上下文时禁用 js 栈（Chengzhong Wu） [#48495](https://github.com/nodejs/node/pull/48495)
* \[[`97bd9ccd04`](https://github.com/nodejs/node/commit/97bd9ccd04)] - **src**: 修复 AsyncHooks 中未初始化字段访问的问题（Jan Olaf Krems） [#48566](https://github.com/nodejs/node/pull/48566)
* \[[`404958fc96`](https://github.com/nodejs/node/commit/404958fc96)] - **src**: 修复与不必要复制相关的 Coverity 问题（Yagiz Nizipli） [#48565](https://github.com/nodejs/node/pull/48565)
* \[[`c4b8edea24`](https://github.com/nodejs/node/commit/c4b8edea24)] - **src**: 重构 util 中的 `SplitString`（Yagiz Nizipli） [#48491](https://github.com/nodejs/node/pull/48491)
* \[[`5bc13a4772`](https://github.com/nodejs/node/commit/5bc13a4772)] - **src**: 回退 IS\_RELEASE（Rafael Gonzaga） [#48505](https://github.com/nodejs/node/pull/48505)
* \[[`4971e46051`](https://github.com/nodejs/node/commit/4971e46051)] - **src**: 为 `guessHandleType` 添加 V8 fast api（Yagiz Nizipli） [#48349](https://github.com/nodejs/node/pull/48349)
* \[[`954e46e792`](https://github.com/nodejs/node/commit/954e46e792)] - **src**: 为 `guessHandleType` 返回 uint32（Yagiz Nizipli） [#48349](https://github.com/nodejs/node/pull/48349)
* \[[`05009675da`](https://github.com/nodejs/node/commit/05009675da)] - **src**: 使 realm binding data store 变为弱引用（Chengzhong Wu） [#47688](https://github.com/nodejs/node/pull/47688)
* \[[`120ac74352`](https://github.com/nodejs/node/commit/120ac74352)] - **src**: 移除别名 buffer weak callback（Chengzhong Wu） [#47688](https://github.com/nodejs/node/pull/47688)
* \[[`6591826e99`](https://github.com/nodejs/node/commit/6591826e99)] - **src**: 在 osx 上处理 wasm 越界时将正确触发 SIGBUS（Congcong Cai） [#46561](https://github.com/nodejs/node/pull/46561)
* \[[`1b84ddeec2`](https://github.com/nodejs/node/commit/1b84ddeec2)] - **src**: 直接实现 constants binding（Joyee Cheung） [#48186](https://github.com/nodejs/node/pull/48186)
* \[[`06d49c1f10`](https://github.com/nodejs/node/commit/06d49c1f10)] - **src**: 在不进行特殊处理的情况下实现 natives binding（Joyee Cheung） [#48186](https://github.com/nodejs/node/pull/48186)
* \[[`325441abf5`](https://github.com/nodejs/node/commit/325441abf5)] - **src**: 在 dns queries 中添加缺失的 to_ascii 方法（Daniel Lemire） [#48354](https://github.com/nodejs/node/pull/48354)
* \[[`84d0eb74b8`](https://github.com/nodejs/node/commit/84d0eb74b8)] - **stream**: 修复 pipeline 过早结束的问题（Robert Nagy） [#48435](https://github.com/nodejs/node/pull/48435)
* \[[`3df7368735`](https://github.com/nodejs/node/commit/3df7368735)] - **test**: 为 test-runner-cli 添加缺失的断言（Moshe Atlow） [#48593](https://github.com/nodejs/node/pull/48593)
* \[[`07eb310b0d`](https://github.com/nodejs/node/commit/07eb310b0d)] - **test**: 移除 test-crypto-keygen 的 flaky 标记（Luigi Pinca） [#48575](https://github.com/nodejs/node/pull/48575)
* \[[`75aa0a7682`](https://github.com/nodejs/node/commit/75aa0a7682)] - **test**: 移除 test-timers-immediate-queue 的 flaky 标记（Luigi Pinca） [#48575](https://github.com/nodejs/node/pull/48575)
* \[[`a9756f3126`](https://github.com/nodejs/node/commit/a9756f3126)] - **test**: 为 mock timers 添加 Symbol.dispose 支持（Benjamin Gruenbaum） [#48549](https://github.com/nodejs/node/pull/48549)
* \[[`0f912a7248`](https://github.com/nodejs/node/commit/0f912a7248)] - **test**: 将 test-child-process-stdio-reuse-readable-stdio 标记为 flaky（Luigi Pinca） [#48537](https://github.com/nodejs/node/pull/48537)
* \[[`30f4bc4985`](https://github.com/nodejs/node/commit/30f4bc4985)] - **test**: 使 cctest 中的 IsolateData 变为 per-isolate（Joyee Cheung） [#48450](https://github.com/nodejs/node/pull/48450)
* \[[`407ce3fdcb`](https://github.com/nodejs/node/commit/407ce3fdcb)] - **test**: 在包含 node_api.h 之前定义 NAPI_VERSION（Chengzhong Wu） [#48376](https://github.com/nodejs/node/pull/48376)
* \[[`24a8fa95f0`](https://github.com/nodejs/node/commit/24a8fa95f0)] - **test**: 移除传给 `mustNotCall()` 的不必要 noop 函数参数（Antoine du Hamel） [#48513](https://github.com/nodejs/node/pull/48513)
* \[[`09af579775`](https://github.com/nodejs/node/commit/09af579775)] - **test**: 在 IBMi 上跳过 test-runner-watch-mode（Moshe Atlow） [#48473](https://github.com/nodejs/node/pull/48473)
* \[[`77cb1ee0b2`](https://github.com/nodejs/node/commit/77cb1ee0b2)] - **test**: 为 std::find 添加缺失的 \<algorithm> 包含（Sam James） [#48380](https://github.com/nodejs/node/pull/48380)
* \[[`7c790ca03c`](https://github.com/nodejs/node/commit/7c790ca03c)] - **test**: 修复 flaky 的 test-watch-mode（Moshe Atlow） [#48147](https://github.com/nodejs/node/pull/48147)
* \[[`1398829746`](https://github.com/nodejs/node/commit/1398829746)] - **test**: 修复在不支持 IPv6 的内核上 `test-net-autoselectfamily` 的问题（Livia Medeiros） [#48265](https://github.com/nodejs/node/pull/48265)
* \[[`764119ba4b`](https://github.com/nodejs/node/commit/764119ba4b)] - **test**: 更新 url web-platform tests（Yagiz Nizipli） [#48319](https://github.com/nodejs/node/pull/48319)
* \[[`f1ead59629`](https://github.com/nodejs/node/commit/f1ead59629)] - **test**: 忽略复制的 entry\_point.c（Luigi Pinca） [#48297](https://github.com/nodejs/node/pull/48297)
* \[[`fc5d1bddcb`](https://github.com/nodejs/node/commit/fc5d1bddcb)] - **test**: 重构 test-gc-http-client-timeout（Luigi Pinca） [#48292](https://github.com/nodejs/node/pull/48292)
* \[[`46a3d068a0`](https://github.com/nodejs/node/commit/46a3d068a0)] - **test**: 更新 encoding web-platform tests（Yagiz Nizipli） [#48320](https://github.com/nodejs/node/pull/48320)
* \[[`141e5aad83`](https://github.com/nodejs/node/commit/141e5aad83)] - **test**: 更新 FileAPI web-platform tests（Yagiz Nizipli） [#48322](https://github.com/nodejs/node/pull/48322)
* \[[`83cfc67099`](https://github.com/nodejs/node/commit/83cfc67099)] - **test**: 更新 user-timing web-platform tests（Yagiz Nizipli） [#48321](https://github.com/nodejs/node/pull/48321)
* \[[`2c56835a33`](https://github.com/nodejs/node/commit/2c56835a33)] - **test_runner**: 修复 `test` 简写的返回类型（Shocker） [#48555](https://github.com/nodejs/node/pull/48555)
* \[[`7d01c8894a`](https://github.com/nodejs/node/commit/7d01c8894a)] - **(SEMVER-MINOR)** **test_runner**: 添加 fakeTimers 的初始草案（Erick Wendel） [#47775](https://github.com/nodejs/node/pull/47775)
* \[[`de4f14c249`](https://github.com/nodejs/node/commit/de4f14c249)] - **test_runner**: 添加 enqueue 和 dequeue 事件（Moshe Atlow） [#48428](https://github.com/nodejs/node/pull/48428)
* \[[`5ebe3a4ea7`](https://github.com/nodejs/node/commit/5ebe3a4ea7)] - **test_runner**: 使 `--test-name-pattern` 递归匹配（Moshe Atlow） [#48382](https://github.com/nodejs/node/pull/48382)
* \[[`93bf447308`](https://github.com/nodejs/node/commit/93bf447308)] - **test_runner**: 为提高可读性重构 coverage report 输出（Damien Seguin） [#47791](https://github.com/nodejs/node/pull/47791)
* \[[`504d1d7bdc`](https://github.com/nodejs/node/commit/504d1d7bdc)] - **(SEMVER-MINOR)** **tls**: 为动态 ALPN 协商添加 ALPNCallback 服务器选项（Tim Perry） [#45190](https://github.com/nodejs/node/pull/45190)
* \[[`203c3cf4ca`](https://github.com/nodejs/node/commit/203c3cf4ca)] - **tools**: 更新 lint-md-dependencies（Node.js GitHub Bot） [#48544](https://github.com/nodejs/node/pull/48544)
* \[[`333907b19d`](https://github.com/nodejs/node/commit/333907b19d)] - **tools**: 加速 js2c 输出的编译（Keyhan Vakil） [#48160](https://github.com/nodejs/node/pull/48160)
* \[[`10bd5f4d97`](https://github.com/nodejs/node/commit/10bd5f4d97)] - **tools**: 更新 lint-md-dependencies（Node.js GitHub Bot） [#48486](https://github.com/nodejs/node/pull/48486)
* \[[`52de27b9fe`](https://github.com/nodejs/node/commit/52de27b9fe)] - **tools**: 固定 ruff 版本号（Rich Trott） [#48505](https://github.com/nodejs/node/pull/48505)
* \[[`4345526644`](https://github.com/nodejs/node/commit/4345526644)] - **tools**: 用 perl 替换 sed（Luigi Pinca） [#48499](https://github.com/nodejs/node/pull/48499)
* \[[`6c590835f3`](https://github.com/nodejs/node/commit/6c590835f3)] - **tools**: 自动更新 openssl v16（Marco Ippolito） [#48377](https://github.com/nodejs/node/pull/48377)
* \[[`90b5335338`](https://github.com/nodejs/node/commit/90b5335338)] - **tools**: 将 eslint 更新到 8.43.0（Node.js GitHub Bot） [#48487](https://github.com/nodejs/node/pull/48487)
* \[[`cd83530a11`](https://github.com/nodejs/node/commit/cd83530a11)] - **tools**: 将 doc 更新到 to-vfile\@8.0.0（Node.js GitHub Bot） [#48485](https://github.com/nodejs/node/pull/48485)
* \[[`e500b439bd`](https://github.com/nodejs/node/commit/e500b439bd)] - **tools**: 为 to-vfile 8.0.0 准备 tools/doc（Rich Trott） [#48485](https://github.com/nodejs/node/pull/48485)
* \[[`d623616813`](https://github.com/nodejs/node/commit/d623616813)] - **tools**: 更新 lint-md-dependencies（Node.js GitHub Bot） [#48417](https://github.com/nodejs/node/pull/48417)
* \[[`a2e107dde4`](https://github.com/nodejs/node/commit/a2e107dde4)] - **tools**: 更新 create-or-update-pull-request-action（Richard Lau） [#48398](https://github.com/nodejs/node/pull/48398)
* \[[`8009e2c3be`](https://github.com/nodejs/node/commit/8009e2c3be)] - **tools**: 更新 eslint-plugin-jsdoc（Richard Lau） [#48393](https://github.com/nodejs/node/pull/48393)
* \[[`10385c8565`](https://github.com/nodejs/node/commit/10385c8565)] - **tools**: 为外部依赖添加版本更新（Andrea Fassina） [#48081](https://github.com/nodejs/node/pull/48081)
* \[[`b1cef81b18`](https://github.com/nodejs/node/commit/b1cef81b18)] - **tools**: 将 eslint 更新到 8.42.0（Node.js GitHub Bot） [#48328](https://github.com/nodejs/node/pull/48328)
* \[[`0923dc0b8e`](https://github.com/nodejs/node/commit/0923dc0b8e)] - **tools**: 禁用 jsdoc/no-defaults 规则（Luigi Pinca） [#48328](https://github.com/nodejs/node/pull/48328)
* \[[`b03146da85`](https://github.com/nodejs/node/commit/b03146da85)] - **typings**: 移除未使用的 primordials（Yagiz Nizipli） [#48509](https://github.com/nodejs/node/pull/48509)
* \[[`e9c9d187b9`](https://github.com/nodejs/node/commit/e9c9d187b9)] - **typings**: 修复 ESM loader modules 中的 JSDoc（Antoine du Hamel） [#48424](https://github.com/nodejs/node/pull/48424)
* \[[`fafe651d23`](https://github.com/nodejs/node/commit/fafe651d23)] - **url**: 使其符合 origin getter 规范变更（Yagiz Nizipli） [#48319](https://github.com/nodejs/node/pull/48319)

<a id="20.3.1"></a>

## 2023-06-20，版本 20.3.1（当前），@RafaelGSS

这是一个安全更新。

### 重要变更

此版本修复了以下 CVE：

* [CVE-2023-30581](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30581)：`mainModule.__proto__` 绕过实验性策略机制（高）
* [CVE-2023-30584](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30584)：实验性权限模型中的路径遍历绕过（高）
* [CVE-2023-30587](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30587)：通过 Node.js Inspector 绕过实验性权限模型（高）
* [CVE-2023-30582](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30582)：权限模型不足导致可未经授权监视文件（中）
* [CVE-2023-30583](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30583)：通过 fs.openAsBlob() 绕过实验性权限模型（中）
* [CVE-2023-30585](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30585)：在 Node.js 安装程序修复过程中通过恶意注册表项篡改提升权限（中）
* [CVE-2023-30586](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30586)：通过任意 OpenSSL 引擎绕过实验性权限模型（中）
* [CVE-2023-30588](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30588)：由于 x509 证书中的无效公钥信息导致进程中断（中）
* [CVE-2023-30589](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30589)：通过由 CR 分隔的空头部进行 HTTP 请求走私（中）
* [CVE-2023-30590](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-30590)：在设置私钥后 DiffieHellman 不生成密钥（中）
* OpenSSL 安全更新
  * [OpenSSL 安全公告 3 月 28 日](https://www.openssl.org/news/secadv/20230328.txt).
  * [OpenSSL 安全公告 4 月 20 日](https://www.openssl.org/news/secadv/20230420.txt).
  * [OpenSSL 安全公告 5 月 30 日](https://www.openssl.org/news/secadv/20230530.txt)

有关每个漏洞的更详细信息，请参阅博客文章 [2023 年 6 月安全发布](https://nodejs.org/en/blog/vulnerability/june-2023-security-releases/)。

### 提交

* \[[`dac08dafc9`](https://github.com/nodejs/node/commit/dac08dafc9)] - **crypto**：优雅处理带有无效 SPKI 的证书（Tobias Nießen）[nodejs-private/node-private#393](https://github.com/nodejs-private/node-private/pull/393)
* \[[`d274c3babc`](https://github.com/nodejs/node/commit/d274c3babc)] - **crypto,https,tls**：如果已启用权限则禁用引擎（Tobias Nießen）[nodejs-private/node-private#409](https://github.com/nodejs-private/node-private/pull/409)
* \[[`5621c1de38`](https://github.com/nodejs/node/commit/5621c1de38)] - **deps**：为 openssl-3.0.9-quic1 更新 archs 文件（Node.js GitHub Bot）[#48402](https://github.com/nodejs/node/pull/48402)
* \[[`771caa9f1c`](https://github.com/nodejs/node/commit/771caa9f1c)] - **deps**：将 openssl 源码升级到 quictls/openssl-3.0.9-quic1（Node.js GitHub Bot）[#48402](https://github.com/nodejs/node/pull/48402)
* \[[`0459bf9c99`](https://github.com/nodejs/node/commit/0459bf9c99)] - **doc,test**：澄清 DH generateKeys 的行为（Tobias Nießen）[nodejs-private/node-private#426](https://github.com/nodejs-private/node-private/pull/426)
* \[[`27e20501aa`](https://github.com/nodejs/node/commit/27e20501aa)] - **http**：禁用通过空头部进行的请求走私（Paolo Insogna）[nodejs-private/node-private#427](https://github.com/nodejs-private/node-private/pull/427)
* \[[`9c17e335f1`](https://github.com/nodejs/node/commit/9c17e335f1)] - **msi**：不要创建 AppData\Roaming\npm（Tobias Nießen）[nodejs-private/node-private#408](https://github.com/nodejs-private/node-private/pull/408)
* \[[`b51124c637`](https://github.com/nodejs/node/commit/b51124c637)] - **permission**：处理 fs 路径遍历（RafaelGSS）[nodejs-private/node-private#403](https://github.com/nodejs-private/node-private/pull/403)
* \[[`ebc5927adc`](https://github.com/nodejs/node/commit/ebc5927adc)] - **permission**：处理 fs.openAsBlob（RafaelGSS）[nodejs-private/node-private#405](https://github.com/nodejs-private/node-private/pull/405)
* \[[`c39a43bff5`](https://github.com/nodejs/node/commit/c39a43bff5)] - **permission**：处理 fs.watchFile（RafaelGSS）[nodejs-private/node-private#404](https://github.com/nodejs-private/node-private/pull/404)
* \[[`d0a8264ec9`](https://github.com/nodejs/node/commit/d0a8264ec9)] - **policy**：处理 mainModule.__proto__ 绕过（RafaelGSS）[nodejs-private/node-private#416](https://github.com/nodejs-private/node-private/pull/416)
* \[[`3df13d5a79`](https://github.com/nodejs/node/commit/3df13d5a79)] - **src,permission**：在启用 pm 时限制 inspector（RafaelGSS）[nodejs-private/node-private#410](https://github.com/nodejs-private/node-private/pull/410)

<a id="20.3.0"></a>

## 2023-06-08，版本 20.3.0（当前），@targos

### 重要变更

* \[[`bfcb3d1d9a`](https://github.com/nodejs/node/commit/bfcb3d1d9a)] - **deps**：升级到 libuv 1.45.0，包括 Linux 上文件系统操作的显著性能改进（Santiago Gimeno）[#48078](https://github.com/nodejs/node/pull/48078)
* \[[`5094d1b292`](https://github.com/nodejs/node/commit/5094d1b292)] - **doc**：将 Ruy Adorno 加入 TSC 成员列表（Michael Dawson）[#48172](https://github.com/nodejs/node/pull/48172)
* \[[`2f5dbca690`](https://github.com/nodejs/node/commit/2f5dbca690)] - **doc**：将 Node.js 14 标记为生命周期结束（Richard Lau）[#48023](https://github.com/nodejs/node/pull/48023)
* \[[`b1828b325e`](https://github.com/nodejs/node/commit/b1828b325e)] - **(SEMVER-MINOR)** **lib**：实现 `AbortSignal.any()`（Chemi Atlow）[#47821](https://github.com/nodejs/node/pull/47821)
* \[[`f380953103`](https://github.com/nodejs/node/commit/f380953103)] - **module**：更改默认解析器，使其在未知 scheme 上不抛出错误（Gil Tayar）[#47824](https://github.com/nodejs/node/pull/47824)
* \[[`a94f87ed99`](https://github.com/nodejs/node/commit/a94f87ed99)] - **(SEMVER-MINOR)** **node-api**：定义版本 9（Chengzhong Wu）[#48151](https://github.com/nodejs/node/pull/48151)
* \[[`9e2b13dfa7`](https://github.com/nodejs/node/commit/9e2b13dfa7)] - **stream**：弃用 `asIndexedPairs`（Chemi Atlow）[#48102](https://github.com/nodejs/node/pull/48102)

### 提交

* \[[`35c96156d1`](https://github.com/nodejs/node/commit/35c96156d1)] - **benchmark**：使用 `cluster.isPrimary` 代替 `cluster.isMaster`（Deokjin Kim）[#48002](https://github.com/nodejs/node/pull/48002)
* \[[`3e6e3abf32`](https://github.com/nodejs/node/commit/3e6e3abf32)] - **bootstrap**：在不受支持的操作中抛出 ERR_NOT_SUPPORTED_IN_SNAPSHOT（Joyee Cheung）[#47887](https://github.com/nodejs/node/pull/47887)
* \[[`c480559347`](https://github.com/nodejs/node/commit/c480559347)] - **bootstrap**：将 is_building_snapshot 状态放入 IsolateData（Joyee Cheung）[#47887](https://github.com/nodejs/node/pull/47887)
* \[[`50c0a15535`](https://github.com/nodejs/node/commit/50c0a15535)] - **build**：在启用 lite mode 时设置 v8_enable_webassembly=false（Cheng Shao）[#48248](https://github.com/nodejs/node/pull/48248)
* \[[`4562805cf6`](https://github.com/nodejs/node/commit/4562805cf6)] - **build**：加快 mksnapshot 输出的编译速度（Keyhan Vakil）[#48162](https://github.com/nodejs/node/pull/48162)
* \[[`8b89f13933`](https://github.com/nodejs/node/commit/8b89f13933)] - **build**：添加关闭过时 PR 的操作（Michael Dawson）[#48051](https://github.com/nodejs/node/pull/48051)
* \[[`5d92202220`](https://github.com/nodejs/node/commit/5d92202220)] - **build**：用 js2c.cc 替换 js2c.py（Joyee Cheung）[#46997](https://github.com/nodejs/node/pull/46997)
* \[[`6cf2adc36e`](https://github.com/nodejs/node/commit/6cf2adc36e)] - **cluster**：使用 ObjectPrototypeHasOwnProperty（Daeyeon Jeong）[#48141](https://github.com/nodejs/node/pull/48141)
* \[[`f564b03c38`](https://github.com/nodejs/node/commit/f564b03c38)] - **crypto**：在 crypto_context.cc 中使用 OpenSSL 自带的内存 BIO（GauriSpears）[#47160](https://github.com/nodejs/node/pull/47160)
* \[[`ac8dd61fc3`](https://github.com/nodejs/node/commit/ac8dd61fc3)] - **crypto**：移除 cipher 的默认编码（Tobias Nießen）[#47998](https://github.com/nodejs/node/pull/47998)
* \[[`15c2de4407`](https://github.com/nodejs/node/commit/15c2de4407)] - **crypto**：在设置 OPENSSL_NO_ENGINE 时修复 setEngine()（Tobias Nießen）[#47977](https://github.com/nodejs/node/pull/47977)
* \[[`9e2dd5b5e2`](https://github.com/nodejs/node/commit/9e2dd5b5e2)] - **deps**：将 zlib 更新到 337322d（Node.js GitHub Bot）[#48218](https://github.com/nodejs/node/pull/48218)
* \[[`bfcb3d1d9a`](https://github.com/nodejs/node/commit/bfcb3d1d9a)] - **deps**：升级到 libuv 1.45.0（Santiago Gimeno）[#48078](https://github.com/nodejs/node/pull/48078)
* \[[`13930f092f`](https://github.com/nodejs/node/commit/13930f092f)] - **deps**：将 ada 更新到 2.5.0（Node.js GitHub Bot）[#48223](https://github.com/nodejs/node/pull/48223)
* \[[`3047caebec`](https://github.com/nodejs/node/commit/3047caebec)] - **deps**：为 c-ares 设置 `CARES_RANDOM_FILE`（Richard Lau）[#48156](https://github.com/nodejs/node/pull/48156)
* \[[`0db79a0872`](https://github.com/nodejs/node/commit/0db79a0872)] - **deps**：将 histogram 更新到 0.11.8（Marco Ippolito）[#47742](https://github.com/nodejs/node/pull/47742)
* \[[`99af6716f5`](https://github.com/nodejs/node/commit/99af6716f5)] - **deps**：将 histogram 更新到 0.11.7（Marco Ippolito）[#47742](https://github.com/nodejs/node/pull/47742)
* \[[`d4922bc985`](https://github.com/nodejs/node/commit/d4922bc985)] - **deps**：将 c-ares 更新到 1.19.1（Node.js GitHub Bot）[#48115](https://github.com/nodejs/node/pull/48115)
* \[[`f6ccdb289f`](https://github.com/nodejs/node/commit/f6ccdb289f)] - **deps**：将 simdutf 更新到 3.2.12（Node.js GitHub Bot）[#48118](https://github.com/nodejs/node/pull/48118)
* \[[`3ed0afc778`](https://github.com/nodejs/node/commit/3ed0afc778)] - **deps**：将 minimatch 更新到 9.0.1（Node.js GitHub Bot）[#48094](https://github.com/nodejs/node/pull/48094)
* \[[`df7540fb73`](https://github.com/nodejs/node/commit/df7540fb73)] - **deps**：将 ada 更新到 2.4.2（Node.js GitHub Bot）[#48092](https://github.com/nodejs/node/pull/48092)
* \[[`07df5c48e8`](https://github.com/nodejs/node/commit/07df5c48e8)] - **deps**：将 corepack 更新到 0.18.0（Node.js GitHub Bot）[#48091](https://github.com/nodejs/node/pull/48091)
* \[[`d95a5bb559`](https://github.com/nodejs/node/commit/d95a5bb559)] - **deps**：将 uvwasi 更新到 0.0.18（Node.js GitHub Bot）[#47866](https://github.com/nodejs/node/pull/47866)
* \[[`443477e041`](https://github.com/nodejs/node/commit/443477e041)] - **deps**：将 uvwasi 更新到 0.0.17（Node.js GitHub Bot）[#47866](https://github.com/nodejs/node/pull/47866)
* \[[`03f67d6d6d`](https://github.com/nodejs/node/commit/03f67d6d6d)] - **deps**：将 npm 升级到 9.6.7（npm team）[#48062](https://github.com/nodejs/node/pull/48062)
* \[[`d3e3a911fd`](https://github.com/nodejs/node/commit/d3e3a911fd)] - **deps**：将 nghttp2 更新到 1.53.0（Node.js GitHub Bot）[#47997](https://github.com/nodejs/node/pull/47997)
* \[[`f7c4daaf67`](https://github.com/nodejs/node/commit/f7c4daaf67)] - **deps**：将 ada 更新到 2.4.1（Node.js GitHub Bot）[#48036](https://github.com/nodejs/node/pull/48036)
* \[[`c6a752560d`](https://github.com/nodejs/node/commit/c6a752560d)] - **deps**：将 loongarch64 添加到 openssl Makefile 并生成 openssl-loongarch64（Shi Pujin）[#46401](https://github.com/nodejs/node/pull/46401)
* \[[`d194241716`](https://github.com/nodejs/node/commit/d194241716)] - **deps**：将 undici 更新到 5.22.1（Node.js GitHub Bot）[#47994](https://github.com/nodejs/node/pull/47994)
* \[[`02e919f4a2`](https://github.com/nodejs/node/commit/02e919f4a2)] - **deps,test**：将 postject 更新到 1.0.0-alpha.6（Node.js GitHub Bot）[#48072](https://github.com/nodejs/node/pull/48072)
* \[[`2c19f596ad`](https://github.com/nodejs/node/commit/2c19f596ad)] - **doc**：澄清传给 Buffer.from() 的数组参数（Bryan English）[#48274](https://github.com/nodejs/node/pull/48274)
* \[[`d681e5f456`](https://github.com/nodejs/node/commit/d681e5f456)] - **doc**：记录 node:test run() 的 watch 选项（Moshe Atlow）[#48256](https://github.com/nodejs/node/pull/48256)
* \[[`96e54ddbca`](https://github.com/nodejs/node/commit/96e54ddbca)] - **doc**：为 Electron 26 保留 117（Calvin）[#48245](https://github.com/nodejs/node/pull/48245)
* \[[`9aff8c7818`](https://github.com/nodejs/node/commit/9aff8c7818)] - **doc**：更新 FIPS 支持文档（Richard Lau）[#48194](https://github.com/nodejs/node/pull/48194)
* \[[`8c5338648f`](https://github.com/nodejs/node/commit/8c5338648f)] - **doc**：改进 stdio 选项文档（Kumar Arnav）[#48110](https://github.com/nodejs/node/pull/48110)
* \[[`11918d705f`](https://github.com/nodejs/node/commit/11918d705f)] - **doc**：更新 Buffer.allocUnsafe 描述（sinkhaha）[#48183](https://github.com/nodejs/node/pull/48183)
* \[[`2b51ee5e22`](https://github.com/nodejs/node/commit/2b51ee5e22)] - **doc**：使用 website 团队更新 codeowners（Claudio Wunder）[#48197](https://github.com/nodejs/node/pull/48197)
* \[[`360df25d04`](https://github.com/nodejs/node/commit/360df25d04)] - **doc**：修复指向新目录 doc/contributing/maintaining 的损坏链接（Andrea Fassina）[#48205](https://github.com/nodejs/node/pull/48205)
* \[[`13e95e21a4`](https://github.com/nodejs/node/commit/13e95e21a4)] - **doc**：将 atlowChemi 添加到 triagers（Chemi Atlow）[#48104](https://github.com/nodejs/node/pull/48104)
* \[[`5f83ce530f`](https://github.com/nodejs/node/commit/5f83ce530f)] - **doc**：修复 readline completer 函数部分中的拼写错误（Vadym）[#48188](https://github.com/nodejs/node/pull/48188)
* \[[`3c82165d27`](https://github.com/nodejs/node/commit/3c82165d27)] - **doc**：移除 keygen 的损坏链接（Rich Trott）[#48176](https://github.com/nodejs/node/pull/48176)
* \[[`0ca90a1e6d`](https://github.com/nodejs/node/commit/0ca90a1e6d)] - **doc**：添加 `auto` 内联高度以防止抖动/闪烁（Daniel Holbert）[#48195](https://github.com/nodejs/node/pull/48195)
* \[[`f117855092`](https://github.com/nodejs/node/commit/f117855092)] - **doc**：在 SEA 文档中添加版本信息（Antoine du Hamel）[#48173](https://github.com/nodejs/node/pull/48173)
* \[[`5094d1b292`](https://github.com/nodejs/node/commit/5094d1b292)] - **doc**：将 Ruy 加入 TSC 成员列表（Michael Dawson）[#48172](https://github.com/nodejs/node/pull/48172)
* \[[`39d8140227`](https://github.com/nodejs/node/commit/39d8140227)] - **doc**：更新 socket.remote* 属性文档（Saba Kharanauli）[#48139](https://github.com/nodejs/node/pull/48139)
* \[[`5497c13efe`](https://github.com/nodejs/node/commit/5497c13efe)] - **doc**：更新 TLSv1.3-PSK 过时部分（Tobias Nießen）[#48123](https://github.com/nodejs/node/pull/48123)
* \[[`281dfaf727`](https://github.com/nodejs/node/commit/281dfaf727)] - **doc**：改进 HMAC 密钥建议（Tobias Nießen）[#48121](https://github.com/nodejs/node/pull/48121)
* \[[`bd311b6c70`](https://github.com/nodejs/node/commit/bd311b6c70)] - **doc**：澄清 mkdir() 的递归行为（Stephen Odogwu）[#48109](https://github.com/nodejs/node/pull/48109)
* \[[`5b061c8922`](https://github.com/nodejs/node/commit/5b061c8922)] - **doc**：修复 crypto legacy streams API 部分中的拼写错误（Tobias Nießen）[#48122](https://github.com/nodejs/node/pull/48122)
* \[[`10ccb2bd81`](https://github.com/nodejs/node/commit/10ccb2bd81)] - **doc**：更新 SEA 源链接（Rich Trott）[#48080](https://github.com/nodejs/node/pull/48080)
* \[[`415bf7f532`](https://github.com/nodejs/node/commit/415bf7f532)] - **doc**：澄清 tty.isRaw（Roberto Vidal）[#48055](https://github.com/nodejs/node/pull/48055)
* \[[`0ac4b33c76`](https://github.com/nodejs/node/commit/0ac4b33c76)] - **doc**：修正 Windows 终端的换行（Alex Schwartz）[#48083](https://github.com/nodejs/node/pull/48083)
* \[[`f30ba5c320`](https://github.com/nodejs/node/commit/f30ba5c320)] - **doc**：修复 Windows 代码片段标签（Antoine du Hamel）[#48100](https://github.com/nodejs/node/pull/48100)
* \[[`12fef9b68c`](https://github.com/nodejs/node/commit/12fef9b68c)] - **doc**：统一 fenced code snippet 标志（Antoine du Hamel）[#48082](https://github.com/nodejs/node/pull/48082)
* \[[`13f163eace`](https://github.com/nodejs/node/commit/13f163eace)] - **doc**：为 HMAC generateKey 使用安全密钥长度（Tobias Nießen）[#48052](https://github.com/nodejs/node/pull/48052)
* \[[`1e3e7c9f33`](https://github.com/nodejs/node/commit/1e3e7c9f33)] - **doc**：更新损坏的 EVP_BytesToKey 链接（Rich Trott）[#48064](https://github.com/nodejs/node/pull/48064)
* \[[`5917ba1838`](https://github.com/nodejs/node/commit/5917ba1838)] - **doc**：更新损坏的 spkac 链接（Rich Trott）[#48063](https://github.com/nodejs/node/pull/48063)
* \[[`0e4a3b7db1`](https://github.com/nodejs/node/commit/0e4a3b7db1)] - **doc**：记录 node-api 版本流程（Chengzhong Wu）[#47972](https://github.com/nodejs/node/pull/47972)
* \[[`85bbaa94ea`](https://github.com/nodejs/node/commit/85bbaa94ea)] - **doc**：更新 process.versions 属性（Saba Kharanauli）[#48019](https://github.com/nodejs/node/pull/48019)
* \[[`7660eb591a`](https://github.com/nodejs/node/commit/7660eb591a)] - **doc**：修复 binding 函数中的拼写错误（Deokjin Kim）[#48003](https://github.com/nodejs/node/pull/48003)
* \[[`2f5dbca690`](https://github.com/nodejs/node/commit/2f5dbca690)] - **doc**：将 Node.js 14 标记为生命周期结束（Richard Lau）[#48023](https://github.com/nodejs/node/pull/48023)
* \[[`3b94a739f2`](https://github.com/nodejs/node/commit/3b94a739f2)] - **doc**：澄清 CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED（Tobias Nießen）[#47976](https://github.com/nodejs/node/pull/47976)
* \[[`9e381cfa89`](https://github.com/nodejs/node/commit/9e381cfa89)] - **doc**：添加权限模型限制的小标题（Tobias Nießen）[#47989](https://github.com/nodejs/node/pull/47989)
* \[[`802db923e0`](https://github.com/nodejs/node/commit/802db923e0)] - **doc,vm**：澄清 vm.compileFunction() 中 cachedData 的用法（Darshan Sen）[#48193](https://github.com/nodejs/node/pull/48193)
* \[[`11a3434810`](https://github.com/nodejs/node/commit/11a3434810)] - **esm**：移除 `import` 内部方法对数组的支持（Antoine du Hamel）[#48296](https://github.com/nodejs/node/pull/48296)
* \[[`3b00f3afef`](https://github.com/nodejs/node/commit/3b00f3afef)] - **esm**：处理返回 nullish 值的 `globalPreload` 钩子（Antoine du Hamel）[#48249](https://github.com/nodejs/node/pull/48249)
* \[[`3c7846d7e1`](https://github.com/nodejs/node/commit/3c7846d7e1)] - **esm**：处理 loader 线程抛出的更多错误类型（Antoine du Hamel）[#48247](https://github.com/nodejs/node/pull/48247)
* \[[`60ce2bcabc`](https://github.com/nodejs/node/commit/60ce2bcabc)] - **http**：在没有 body 的 HEAD 请求上发送隐式头部（Matteo Collina）[#48108](https://github.com/nodejs/node/pull/48108)
* \[[`72de4e7170`](https://github.com/nodejs/node/commit/72de4e7170)] - **lib**：不要为整个文件禁用 lint 规则（Antoine du Hamel）[#48299](https://github.com/nodejs/node/pull/48299)
* \[[`10cc60fc91`](https://github.com/nodejs/node/commit/10cc60fc91)] - **lib**：使用现有的 `isWindows` 变量（sinkhaha）[#48134](https://github.com/nodejs/node/pull/48134)
* \[[`a90010aae9`](https://github.com/nodejs/node/commit/a90010aae9)] - **lib**：为非 TTY 流支持 FORCE_COLOR（Moshe Atlow）[#48034](https://github.com/nodejs/node/pull/48034)
* \[[`b1828b325e`](https://github.com/nodejs/node/commit/b1828b325e)] - **(SEMVER-MINOR)** **lib**：实现 AbortSignal.any()（Chemi Atlow）[#47821](https://github.com/nodejs/node/pull/47821)
* \[[`8f1b86961f`](https://github.com/nodejs/node/commit/8f1b86961f)] - **meta**：将 github/codeql-action 从 2.3.3 升级到 2.3.6（dependabot[bot]）[#48287](https://github.com/nodejs/node/pull/48287)
* \[[`1b87ccdf70`](https://github.com/nodejs/node/commit/1b87ccdf70)] - **meta**：将 actions/setup-python 从 4.6.0 升级到 4.6.1（dependabot[bot]）[#48286](https://github.com/nodejs/node/pull/48286)
* \[[`10715aea26`](https://github.com/nodejs/node/commit/10715aea26)] - **meta**：将 codecov/codecov-action 从 3.1.3 升级到 3.1.4（dependabot[bot]）[#48285](https://github.com/nodejs/node/pull/48285)
* \[[`79f73778ab`](https://github.com/nodejs/node/commit/79f73778ab)] - **meta**：移除 dont-land-on-v14 的自动标签（Shrujal Shah）[#48031](https://github.com/nodejs/node/pull/48031)
* \[[`9c5711f3ea`](https://github.com/nodejs/node/commit/9c5711f3ea)] - **meta**：将一个或多个协作者移至 emeritus（Node.js GitHub Bot）[#48010](https://github.com/nodejs/node/pull/48010)
* \[[`6d6bf3ee52`](https://github.com/nodejs/node/commit/6d6bf3ee52)] - **module**：减少 URL 初始化次数（Yagiz Nizipli）[#48272](https://github.com/nodejs/node/pull/48272)
* \[[`f380953103`](https://github.com/nodejs/node/commit/f380953103)] - **module**：更改默认解析器，使其在未知 scheme 上不抛出错误（Gil Tayar）[#47824](https://github.com/nodejs/node/pull/47824)
* \[[`950185b0c0`](https://github.com/nodejs/node/commit/950185b0c0)] - **net**：修复 autoSelectFamily 的地址迭代（Fedor Indutny）[#48258](https://github.com/nodejs/node/pull/48258)
* \[[`5ddca72e62`](https://github.com/nodejs/node/commit/5ddca72e62)] - **net**：修复 family 自动选择的 SSL 连接处理（Paolo Insogna）[#48189](https://github.com/nodejs/node/pull/48189)
* \[[`750e53ca3c`](https://github.com/nodejs/node/commit/750e53ca3c)] - **net**：修复 family 自动选择的超时处理（Paolo Insogna）[#47860](https://github.com/nodejs/node/pull/47860)
* \[[`a94f87ed99`](https://github.com/nodejs/node/commit/a94f87ed99)] - **(SEMVER-MINOR)** **node-api**：定义版本 9（Chengzhong Wu）[#48151](https://github.com/nodejs/node/pull/48151)
* \[[`e834979818`](https://github.com/nodejs/node/commit/e834979818)] - **node-api**：添加状态 napi_cannot_run_js（Gabriel Schulhof）[#47986](https://github.com/nodejs/node/pull/47986)
* \[[`eafe0c3ec6`](https://github.com/nodejs/node/commit/eafe0c3ec6)] - **node-api**：对所有类型的 napi_ref 均为实验性（Vladimir Morozov）[#47975](https://github.com/nodejs/node/pull/47975)
* \[[`9a034746f5`](https://github.com/nodejs/node/commit/9a034746f5)] - **src**：在 src README.md 中添加 Realm 文档（Chengzhong Wu）[#47932](https://github.com/nodejs/node/pull/47932)
* \[[`b8f4070f71`](https://github.com/nodejs/node/commit/b8f4070f71)] - **src**：在 openssl 配置后检查 node_extra_ca_certs（Raghu Saxena）[#48159](https://github.com/nodejs/node/pull/48159)
* \[[`0347a18056`](https://github.com/nodejs/node/commit/0347a18056)] - **src**：在 node_sea.h 中包含缺失的头文件（Joyee Cheung）[#48152](https://github.com/nodejs/node/pull/48152)
* \[[`45c3782c20`](https://github.com/nodejs/node/commit/45c3782c20)] - **src**：移除 SecretKeyGenTraits 中的 INT_MAX 断言（Tobias Nießen）[#48053](https://github.com/nodejs/node/pull/48053)
* \[[`b25e7045ad`](https://github.com/nodejs/node/commit/b25e7045ad)] - **src**：避免在 binding 模板中访问原型（Joyee Cheung）[#47913](https://github.com/nodejs/node/pull/47913)
* \[[`33aa373eec`](https://github.com/nodejs/node/commit/33aa373eec)] - **src**：为 SEA blobs 使用 Blob{Des|S}erializer（Joyee Cheung）[#47962](https://github.com/nodejs/node/pull/47962)
* \[[`9e2b13dfa7`](https://github.com/nodejs/node/commit/9e2b13dfa7)] - **stream**：弃用 asIndexedPairs（Chemi Atlow）[#48102](https://github.com/nodejs/node/pull/48102)
* \[[`96c323dee2`](https://github.com/nodejs/node/commit/96c323dee2)] - **test**：将 test-child-process-pipe-dataflow 标记为不稳定（Moshe Atlow）[#48334](https://github.com/nodejs/node/pull/48334)
* \[[`9875885357`](https://github.com/nodejs/node/commit/9875885357)] - **test**：适配 OpenSSL 3.1 的测试（OttoHollmann）[#47859](https://github.com/nodejs/node/pull/47859)
* \[[`3440d7c6bf`](https://github.com/nodejs/node/commit/3440d7c6bf)] - **test**：修复 test-vm-timeout-escape-nexttick 的不稳定性（Santiago Gimeno）[#48078](https://github.com/nodejs/node/pull/48078)
* \[[`215b2bc72c`](https://github.com/nodejs/node/commit/215b2bc72c)] - **test**：修复 zlib 版本正则表达式（Luigi Pinca）[#48227](https://github.com/nodejs/node/pull/48227)
* \[[`e12ee59d26`](https://github.com/nodejs/node/commit/e12ee59d26)] - **test**：在 s_client 中使用较低的安全级别（Luigi Pinca）[#48192](https://github.com/nodejs/node/pull/48192)
* \[[`1dabc7390c`](https://github.com/nodejs/node/commit/1dabc7390c)] - _**Revert**_ "**test**：取消跳过 negative-settimeout.any.js WPT"（Filip Skokan）[#48182](https://github.com/nodejs/node/pull/48182)
* \[[`c1c4796a86`](https://github.com/nodejs/node/commit/c1c4796a86)] - **test**：将 test_cannot_run_js 标记为不稳定（Keyhan Vakil）[#48181](https://github.com/nodejs/node/pull/48181)
* \[[`8c49d74002`](https://github.com/nodejs/node/commit/8c49d74002)] - **test**：修复不稳定的 test-runner-watch-mode（Moshe Atlow）[#48144](https://github.com/nodejs/node/pull/48144)
* \[[`6388766862`](https://github.com/nodejs/node/commit/6388766862)] - **test**：在 IBM i 上跳过 test-http-pipeline-flood（Abdirahim Musse）[#48048](https://github.com/nodejs/node/pull/48048)
* \[[`8d2a3b1952`](https://github.com/nodejs/node/commit/8d2a3b1952)] - **test**：在 WPT 中忽略辅助文件（Filip Skokan）[#48079](https://github.com/nodejs/node/pull/48079)
* \[[`7a96d825fd`](https://github.com/nodejs/node/commit/7a96d825fd)] - **test**：移动 `test-cluster-primary-error` 不稳定测试（Yagiz Nizipli）[#48039](https://github.com/nodejs/node/pull/48039)
* \[[`a80dd3a8b3`](https://github.com/nodejs/node/commit/a80dd3a8b3)] - **test**：修复 suite signal（Benjamin Gruenbaum）[#47800](https://github.com/nodejs/node/pull/47800)
* \[[`a41cfd183f`](https://github.com/nodejs/node/commit/a41cfd183f)] - **test**：修复解析测试标志（Daeyeon Jeong）[#48012](https://github.com/nodejs/node/pull/48012)
* \[[`4d4e506f2b`](https://github.com/nodejs/node/commit/4d4e506f2b)] - **test,doc,sea**：在 ppc64 上运行 SEA 测试（Darshan Sen）[#48111](https://github.com/nodejs/node/pull/48111)
* \[[`44411fc40c`](https://github.com/nodejs/node/commit/44411fc40c)] - **test_runner**：在 suites 上应用 `runOnly`（Moshe Atlow）[#48279](https://github.com/nodejs/node/pull/48279)
* \[[`3f259b7a30`](https://github.com/nodejs/node/commit/3f259b7a30)] - **test_runner**：发出 `test:watch:drained` 事件（Moshe Atlow）[#48259](https://github.com/nodejs/node/pull/48259)
* \[[`c9f8e8c562`](https://github.com/nodejs/node/commit/c9f8e8c562)] - **test_runner**：在 abortSignal 被中止时停止 watch 模式（Moshe Atlow）[#48259](https://github.com/nodejs/node/pull/48259)
* \[[`f3268d64cb`](https://github.com/nodejs/node/commit/f3268d64cb)] - **test_runner**：修复全局 after hook（Moshe Atlow）[#48231](https://github.com/nodejs/node/pull/48231)
* \[[`15336c3139`](https://github.com/nodejs/node/commit/15336c3139)] - **test_runner**：移除 coverage 中冗余的检查（Colin Ihrig）[#48070](https://github.com/nodejs/node/pull/48070)
* \[[`750d3e8606`](https://github.com/nodejs/node/commit/750d3e8606)] - **test_runner**：将 FORCE_COLOR 传递给子进程（Moshe Atlow）[#48057](https://github.com/nodejs/node/pull/48057)
* \[[`3278542243`](https://github.com/nodejs/node/commit/3278542243)] - **test_runner**：不要在 `test:stdout` 上拆分行（Moshe Atlow）[#48057](https://github.com/nodejs/node/pull/48057)
* \[[`027c531766`](https://github.com/nodejs/node/commit/027c531766)] - **test_runner**：修复测试反序列化边界情况（Moshe Atlow）[#48106](https://github.com/nodejs/node/pull/48106)
* \[[`2b797a6d39`](https://github.com/nodejs/node/commit/2b797a6d39)] - **test_runner**：将 stderr 和 stdout 格式化委托给 reporter（Shiba）[#48045](https://github.com/nodejs/node/pull/48045)
* \[[`23d310bee8`](https://github.com/nodejs/node/commit/23d310bee8)] - **test_runner**：将点状报告显示为与终端宽度一样宽（Raz Luvaton）[#48038](https://github.com/nodejs/node/pull/48038)
* \[[`fd2620dcf1`](https://github.com/nodejs/node/commit/fd2620dcf1)] - **tls**：在 happy eyeballs 连接上重新应用 servername（Fedor Indutny）[#48255](https://github.com/nodejs/node/pull/48255)
* \[[`62f847d0b3`](https://github.com/nodejs/node/commit/62f847d0b3)] - **tools**：更新 rollup lint-md-dependencies（Node.js GitHub Bot）[#48329](https://github.com/nodejs/node/pull/48329)
* \[[`3e97826a66`](https://github.com/nodejs/node/commit/3e97826a66)] - _**Revert**_ "**tools**：当更新工作流失败时打开 issue"（Marco Ippolito）[#48312](https://github.com/nodejs/node/pull/48312)
* \[[`5f08bfe35f`](https://github.com/nodejs/node/commit/5f08bfe35f)] - **tools**：不要将 base64 config.h 加入 gitignore（Ben Noordhuis）[#48174](https://github.com/nodejs/node/pull/48174)
* \[[`ded0e2d755`](https://github.com/nodejs/node/commit/ded0e2d755)] - **tools**：更新 LICENSE 和 license-builder.sh（Santiago Gimeno）[#48078](https://github.com/nodejs/node/pull/48078)
* \[[`07aa264366`](https://github.com/nodejs/node/commit/07aa264366)] - **tools**：自动更新 histogram（Marco Ippolito）[#48171](https://github.com/nodejs/node/pull/48171)
* \[[`1416b75eaa`](https://github.com/nodejs/node/commit/1416b75eaa)] - **tools**：使用 shasum 而不是 sha256sum（Luigi Pinca）[#48229](https://github.com/nodejs/node/pull/48229)
* \[[`b81e9d9b7b`](https://github.com/nodejs/node/commit/b81e9d9b7b)] - **tools**：统一 `dep_updaters` 脚本（Antoine du Hamel）[#48201](https://github.com/nodejs/node/pull/48201)
* \[[`a60bc41e53`](https://github.com/nodejs/node/commit/a60bc41e53)] - **tools**：deps 更新时对 github api 请求进行身份验证（Andrea Fassina）[#48200](https://github.com/nodejs/node/pull/48200)
* \[[`7478ed014e`](https://github.com/nodejs/node/commit/7478ed014e)] - **tools**：按字母顺序排列依赖作业（Luca）[#48184](https://github.com/nodejs/node/pull/48184)
* \[[`568a705799`](https://github.com/nodejs/node/commit/568a705799)] - **tools**：重构 v8_pch 配置（Michaël Zasso）[#47364](https://github.com/nodejs/node/pull/47364)
* \[[`801573ba46`](https://github.com/nodejs/node/commit/801573ba46)] - **tools**：记录并验证 sha256sum（Andrea Fassina）[#48088](https://github.com/nodejs/node/pull/48088)
* \[[`db62325e18`](https://github.com/nodejs/node/commit/db62325e18)] - **tools**：当更新工作流失败时打开 issue（Marco Ippolito）[#48018](https://github.com/nodejs/node/pull/48018)
* \[[`ad8a68856d`](https://github.com/nodejs/node/commit/ad8a68856d)] - **tools**：按字母顺序排列 CODEOWNERS（Rich Trott）[#48124](https://github.com/nodejs/node/pull/48124)
* \[[`4cf5a9edaf`](https://github.com/nodejs/node/commit/4cf5a9edaf)] - **tools**：在 zlib 更新中使用最新的上游提交（Andrea Fassina）[#48054](https://github.com/nodejs/node/pull/48054)
* \[[`8d93af381b`](https://github.com/nodejs/node/commit/8d93af381b)] - **tools**：将 security-wg 添加为 dep updaters 负责人（Marco Ippolito）[#48113](https://github.com/nodejs/node/pull/48113)
* \[[`5325be1d99`](https://github.com/nodejs/node/commit/5325be1d99)] - **tools**：将 js2c.py 移植到 C++（Joyee Cheung）[#46997](https://github.com/nodejs/node/pull/46997)
* \[[`6c60d90277`](https://github.com/nodejs/node/commit/6c60d90277)] - **tools**：修复 npm 安装时的竞态条件（Tobias Nießen）[#48101](https://github.com/nodejs/node/pull/48101)
* \[[`0ab840a58f`](https://github.com/nodejs/node/commit/0ab840a58f)] - **tools**：将 7 个 Node.js 补丁重新应用到 cpplint.py（Rich Trott）[#48098](https://github.com/nodejs/node/pull/48098)
* \[[`a298193378`](https://github.com/nodejs/node/commit/a298193378)] - **tools**：将 cpplint 更新到 1.6.1（Yagiz Nizipli）[#48098](https://github.com/nodejs/node/pull/48098)
* \[[`f6725751b7`](https://github.com/nodejs/node/commit/f6725751b7)] - **tools**：将 eslint 更新到 8.41.0（Node.js GitHub Bot）[#48097](https://github.com/nodejs/node/pull/48097)
* \[[`6539361f4e`](https://github.com/nodejs/node/commit/6539361f4e)] - **tools**：更新 lint-md-dependencies（Node.js GitHub Bot）[#48096](https://github.com/nodejs/node/pull/48096)
* \[[`5d94dbb951`](https://github.com/nodejs/node/commit/5d94dbb951)] - **tools**：将 doc 更新为 remark-parse@10.0.2（Node.js GitHub Bot）[#48095](https://github.com/nodejs/node/pull/48095)
* \[[`2226088048`](https://github.com/nodejs/node/commit/2226088048)] - **tools**：添加调试日志（Marco Ippolito）[#48060](https://github.com/nodejs/node/pull/48060)
* \[[`0c8c383583`](https://github.com/nodejs/node/commit/0c8c383583)] - **tools**：修复 zconf.h 路径（Luigi Pinca）[#48089](https://github.com/nodejs/node/pull/48089)
* \[[`6adaf4c648`](https://github.com/nodejs/node/commit/6adaf4c648)] - **tools**：将 remark-preset-lint-node 更新到 4.0.0（Node.js GitHub Bot）[#47995](https://github.com/nodejs/node/pull/47995)
* \[[`92b3334231`](https://github.com/nodejs/node/commit/92b3334231)] - **url**：整理文档的垂直对齐（Robin Ury）[#48037](https://github.com/nodejs/node/pull/48037)
* \[[`ebb6536775`](https://github.com/nodejs/node/commit/ebb6536775)] - **url**：直接调用 `ada::can_parse`（Yagiz Nizipli）[#47919](https://github.com/nodejs/node/pull/47919)
* \[[`ed4514294a`](https://github.com/nodejs/node/commit/ed4514294a)] - **vm**：正确处理定义 symbol 属性（Nicolas DUBIEN）[#47572](https://github.com/nodejs/node/pull/47572)

<a id="20.2.0"></a>

## 2023-05-16，版本 20.2.0（当前），@targos

### 重要变更

* \[[`c092df9094`](https://github.com/nodejs/node/commit/c092df9094)] - **doc**: 将 ovflowd 添加为协作者 (Claudio Wunder) [#47844](https://github.com/nodejs/node/pull/47844)
* \[[`4197a9a5a0`](https://github.com/nodejs/node/commit/4197a9a5a0)] - **(SEMVER-MINOR)** **http**: 在 HTTP 规范不允许时禁止向正文写入 (Gerrard Lindsay) [#47732](https://github.com/nodejs/node/pull/47732)
* \[[`c4596b9ce7`](https://github.com/nodejs/node/commit/c4596b9ce7)] - **(SEMVER-MINOR)** **sea**: 添加禁用实验性 SEA 警告的选项 (Darshan Sen) [#47588](https://github.com/nodejs/node/pull/47588)
* \[[`17befe008c`](https://github.com/nodejs/node/commit/17befe008c)] - **(SEMVER-MINOR)** **test\_runner**: 为 `test` 添加 `skip`、`todo` 和 `only` 简写 (Chemi Atlow) [#47909](https://github.com/nodejs/node/pull/47909)
* \[[`a0634d7f89`](https://github.com/nodejs/node/commit/a0634d7f89)] - **(SEMVER-MINOR)** **url**: 为 `URLSearchParams` 的 `has` 和 `delete` 方法添加 `value` 参数 (Sankalp Shubham) [#47885](https://github.com/nodejs/node/pull/47885)

### 提交

* \[[`456fca0d9c`](https://github.com/nodejs/node/commit/456fca0d9c)] - **bootstrap**: 分别初始化 bindings 的每个 isolate 属性 (Joyee Cheung) [#47768](https://github.com/nodejs/node/pull/47768)
* \[[`d6d12bf978`](https://github.com/nodejs/node/commit/d6d12bf978)] - **bootstrap**: 在 mksnapshot 调试日志中记录 isolate 数据信息 (Joyee Cheung) [#47768](https://github.com/nodejs/node/pull/47768)
* \[[`e457d89a1b`](https://github.com/nodejs/node/commit/e457d89a1b)] - **buffer**: 合并 `buf.copy` 中对 sourceStart 范围的检查 (Deokjin Kim) [#47758](https://github.com/nodejs/node/pull/47758)
* \[[`00668fcfb4`](https://github.com/nodejs/node/commit/00668fcfb4)] - **child\_process**: 在子进程中止时使用 signal.reason (Debadree Chatterjee) [#47817](https://github.com/nodejs/node/pull/47817)
* \[[`d7993474ea`](https://github.com/nodejs/node/commit/d7993474ea)] - **crypto**: 移除 scrypt 的默认编码 (Tobias Nießen) [#47943](https://github.com/nodejs/node/pull/47943)
* \[[`09fb74a7cc`](https://github.com/nodejs/node/commit/09fb74a7cc)] - **crypto**: 修复 webcrypto 在 usages 为空时导入 private/secret 的问题 (Filip Skokan) [#47877](https://github.com/nodejs/node/pull/47877)
* \[[`e9c6ee74f3`](https://github.com/nodejs/node/commit/e9c6ee74f3)] - **crypto**: 移除 pbkdf2 的默认编码 (Tobias Nießen) [#47869](https://github.com/nodejs/node/pull/47869)
* \[[`b7f13a8679`](https://github.com/nodejs/node/commit/b7f13a8679)] - **deps**: 将 simdutf 更新到 3.2.9 (Node.js GitHub Bot) [#47983](https://github.com/nodejs/node/pull/47983)
* \[[`b16f6da153`](https://github.com/nodejs/node/commit/b16f6da153)] - **deps**: V8: 选择性回移植 5f025d1ca2ca (Michaël Zasso) [#47610](https://github.com/nodejs/node/pull/47610)
* \[[`99f8fcab45`](https://github.com/nodejs/node/commit/99f8fcab45)] - **deps**: V8: 选择性回移植 a8a11a87cb72 (Michaël Zasso) [#47610](https://github.com/nodejs/node/pull/47610)
* \[[`c2b14b4c78`](https://github.com/nodejs/node/commit/c2b14b4c78)] - **deps**: 将 ada 更新到 2.4.0 (Node.js GitHub Bot) [#47922](https://github.com/nodejs/node/pull/47922)
* \[[`cad42e7a56`](https://github.com/nodejs/node/commit/cad42e7a56)] - **deps**: V8: 选择性回移植 1b471b796022 (Lu Yahan) [#47399](https://github.com/nodejs/node/pull/47399)
* \[[`7b2f17ca59`](https://github.com/nodejs/node/commit/7b2f17ca59)] - **deps**: 将 npm 升级到 9.6.6 (npm team) [#47862](https://github.com/nodejs/node/pull/47862)
* \[[`d23b1af562`](https://github.com/nodejs/node/commit/d23b1af562)] - **deps**: 将 ada 更新到 2.3.1 (Node.js GitHub Bot) [#47893](https://github.com/nodejs/node/pull/47893)
* \[[`72340c98fb`](https://github.com/nodejs/node/commit/72340c98fb)] - **dgram**: 将宏转换为模板 (Tobias Nießen) [#47891](https://github.com/nodejs/node/pull/47891)
* \[[`9be922892f`](https://github.com/nodejs/node/commit/9be922892f)] - **dns**: 直接从 c++ 调用 `ada::idna::to_ascii` (Yagiz Nizipli) [#47920](https://github.com/nodejs/node/pull/47920)
* \[[`4a1e97156a`](https://github.com/nodejs/node/commit/4a1e97156a)] - **doc**: 为 cluster 添加缺失的 deprecated 块 (Tobias Nießen) [#47981](https://github.com/nodejs/node/pull/47981)
* \[[`13118a19ee`](https://github.com/nodejs/node/commit/13118a19ee)] - **doc**: 更新 global 的描述 (Tobias Nießen) [#47969](https://github.com/nodejs/node/pull/47969)
* \[[`372796440b`](https://github.com/nodejs/node/commit/372796440b)] - **doc**: 更新 measure memory 拒绝信息 (Yash Ladha) [#41639](https://github.com/nodejs/node/pull/41639)
* \[[`7ecc6740e4`](https://github.com/nodejs/node/commit/7ecc6740e4)] - **doc**: 修复指向 TC39 import attributes 提案的损坏链接 (Rich Trott) [#47954](https://github.com/nodejs/node/pull/47954)
* \[[`b9771c95c7`](https://github.com/nodejs/node/commit/b9771c95c7)] - **doc**: 修复损坏链接 (Rich Trott) [#47953](https://github.com/nodejs/node/pull/47953)
* \[[`6f5ba92e61`](https://github.com/nodejs/node/commit/6f5ba92e61)] - **doc**: 移除损坏链接 (Rich Trott) [#47942](https://github.com/nodejs/node/pull/47942)
* \[[`c9ffc555f1`](https://github.com/nodejs/node/commit/c9ffc555f1)] - **doc**: 记录 make lint-md-clean (Matteo Collina) [#47926](https://github.com/nodejs/node/pull/47926)
* \[[`7ed99e8ba5`](https://github.com/nodejs/node/commit/7ed99e8ba5)] - **doc**: 将 global 对象标记为遗留 (Mert Can Altın) [#47819](https://github.com/nodejs/node/pull/47819)
* \[[`bf39f2d252`](https://github.com/nodejs/node/commit/bf39f2d252)] - **doc**: ntfs 连接点必须链接到目录 (Ben Noordhuis) [#47907](https://github.com/nodejs/node/pull/47907)
* \[[`4dfc3890d8`](https://github.com/nodejs/node/commit/4dfc3890d8)] - **doc**: 改进 `permission.has` 的描述 (Daeyeon Jeong) [#47875](https://github.com/nodejs/node/pull/47875)
* \[[`93f1aa2856`](https://github.com/nodejs/node/commit/93f1aa2856)] - **doc**: 修复参数名称 (Dmitry Semigradsky) [#47853](https://github.com/nodejs/node/pull/47853)
* \[[`9a362aa2fb`](https://github.com/nodejs/node/commit/9a362aa2fb)] - **doc**: 将 FreeBSD 支持版本更新为 12.4 (Michaël Zasso) [#47838](https://github.com/nodejs/node/pull/47838)
* \[[`89c70dc6e6`](https://github.com/nodejs/node/commit/89c70dc6e6)] - **doc**: 为 pm 添加 experimental 稳定性标记 (Rafael Gonzaga) [#47890](https://github.com/nodejs/node/pull/47890)
* \[[`f96fb2eee7`](https://github.com/nodejs/node/commit/f96fb2eee7)] - **doc**: 在 stewards 中将 Matteo 替换为 Rafael (Rafael Gonzaga) [#47841](https://github.com/nodejs/node/pull/47841)
* \[[`1666a146e3`](https://github.com/nodejs/node/commit/1666a146e3)] - **doc**: 添加 valgrind suppression 细节 (Kevin Eady) [#47760](https://github.com/nodejs/node/pull/47760)
* \[[`e53e8231ff`](https://github.com/nodejs/node/commit/e53e8231ff)] - **doc**: 替换 README 中的 EOL 版本 (Tobias Nießen) [#47833](https://github.com/nodejs/node/pull/47833)
* \[[`c092df9094`](https://github.com/nodejs/node/commit/c092df9094)] - **doc**: 将 ovflowd 添加为协作者 (Claudio Wunder) [#47844](https://github.com/nodejs/node/pull/47844)
* \[[`f7106765b3`](https://github.com/nodejs/node/commit/f7106765b3)] - **doc**: 更新 BUILDING.md 中 previous versions 的链接 (Tobias Nießen) [#47835](https://github.com/nodejs/node/pull/47835)
* \[[`811b43c215`](https://github.com/nodejs/node/commit/811b43c215)] - **doc,test**: 更新 v8.startupSnapshot 文档并测试示例 (Joyee Cheung) [#47468](https://github.com/nodejs/node/pull/47468)
* \[[`1ec640ac70`](https://github.com/nodejs/node/commit/1ec640ac70)] - **esm**: 不在主线程上使用 `'beforeExit'` (Antoine du Hamel) [#47964](https://github.com/nodejs/node/pull/47964)
* \[[`106dc612d6`](https://github.com/nodejs/node/commit/106dc612d6)] - **fs**: 将 readdir 递归算法改为迭代式 (Ethan Arrowood) [#47650](https://github.com/nodejs/node/pull/47650)
* \[[`a0da2348a8`](https://github.com/nodejs/node/commit/a0da2348a8)] - **fs**: 将 fs\_use\_promises\_symbol 移动到 per-isolate symbols (Joyee Cheung) [#47768](https://github.com/nodejs/node/pull/47768)
* \[[`4197a9a5a0`](https://github.com/nodejs/node/commit/4197a9a5a0)] - **(SEMVER-MINOR)** **http**: 在 HTTP 规范不允许时禁止向正文写入 (Gerrard Lindsay) [#47732](https://github.com/nodejs/node/pull/47732)
* \[[`a4d6543598`](https://github.com/nodejs/node/commit/a4d6543598)] - **http2**: 改进 nghttp2 错误回调 (Tobias Nießen) [#47840](https://github.com/nodejs/node/pull/47840)
* \[[`a4fed6c580`](https://github.com/nodejs/node/commit/a4fed6c580)] - **lib**: 更新注释 (sinkhaha) [#47884](https://github.com/nodejs/node/pull/47884)
* \[[`fd8bec7b2b`](https://github.com/nodejs/node/commit/fd8bec7b2b)] - **meta**: 将 step-security/harden-runner 从 2.3.1 升级到 2.4.0 (Rich Trott) [#47980](https://github.com/nodejs/node/pull/47980)
* \[[`f5b4b6d5dc`](https://github.com/nodejs/node/commit/f5b4b6d5dc)] - **meta**: 将 github/codeql-action 从 2.3.2 升级到 2.3.3 (Rich Trott) [#47979](https://github.com/nodejs/node/pull/47979)
* \[[`c05c0a2359`](https://github.com/nodejs/node/commit/c05c0a2359)] - **meta**: 将 actions/setup-python 从 4.5.0 升级到 4.6.0 (Rich Trott) [#47968](https://github.com/nodejs/node/pull/47968)
* \[[`2a3d6d97cb`](https://github.com/nodejs/node/commit/2a3d6d97cb)] - **meta**: 为 permission.js 添加 security-wg ping (Rafael Gonzaga) [#47941](https://github.com/nodejs/node/pull/47941)
* \[[`6c158e8dd1`](https://github.com/nodejs/node/commit/6c158e8dd1)] - **meta**: 将 step-security/harden-runner 从 2.2.1 升级到 2.3.1 (dependabot\[bot]) [#47808](https://github.com/nodejs/node/pull/47808)
* \[[`f7a8094d37`](https://github.com/nodejs/node/commit/f7a8094d37)] - **meta**: 将 actions/setup-python 从 4.5.0 升级到 4.6.0 (dependabot\[bot]) [#47806](https://github.com/nodejs/node/pull/47806)
* \[[`0f58e48792`](https://github.com/nodejs/node/commit/0f58e48792)] - **meta**: 将 actions/checkout 从 3.3.0 升级到 3.5.2 (dependabot\[bot]) [#47805](https://github.com/nodejs/node/pull/47805)
* \[[`652b06dd82`](https://github.com/nodejs/node/commit/652b06dd82)] - **meta**: 删除 scorecard workflow 中多余的空格 (Mestery) [#47805](https://github.com/nodejs/node/pull/47805)
* \[[`9f06eaccaf`](https://github.com/nodejs/node/commit/9f06eaccaf)] - **meta**: 将 github/codeql-action 从 2.2.9 升级到 2.3.2 (dependabot\[bot]) [#47809](https://github.com/nodejs/node/pull/47809)
* \[[`977fd7cf35`](https://github.com/nodejs/node/commit/977fd7cf35)] - **meta**: 将 codecov/codecov-action 从 3.1.1 升级到 3.1.3 (dependabot\[bot]) [#47807](https://github.com/nodejs/node/pull/47807)
* \[[`c19385c154`](https://github.com/nodejs/node/commit/c19385c154)] - **module**: 重构以在 CJS 模块加载器中使用 `normalizeRequirableId` (Darshan Sen) [#47896](https://github.com/nodejs/node/pull/47896)
* \[[`739113f2fc`](https://github.com/nodejs/node/commit/739113f2fc)] - **module**: 阻止在无 scheme 的情况下 require `test/reporters` (Moshe Atlow) [#47831](https://github.com/nodejs/node/pull/47831)
* \[[`f489c6710c`](https://github.com/nodejs/node/commit/f489c6710c)] - **(NODE-API-SEMVER-MAJOR)** **node-api**: 获取 addon 使用的 Node API 版本 (Vladimir Morozov) [#45715](https://github.com/nodejs/node/pull/45715)
* \[[`7222f9d74b`](https://github.com/nodejs/node/commit/7222f9d74b)] - **path**: 指示错误的 resolve() 参数索引 (sosoba) [#47660](https://github.com/nodejs/node/pull/47660)
* \[[`7dd32f1536`](https://github.com/nodejs/node/commit/7dd32f1536)] - **permission**: 移除未使用的函数声明 (Deokjin Kim) [#47957](https://github.com/nodejs/node/pull/47957)
* \[[`af86625a05`](https://github.com/nodejs/node/commit/af86625a05)] - **permission**: 仅对 fs permission 将引用解析为绝对路径 (Daeyeon Jeong) [#47930](https://github.com/nodejs/node/pull/47930)
* \[[`1625ae11fe`](https://github.com/nodejs/node/commit/1625ae11fe)] - **quic**: 处理最近的 Coverity 警告 (Michael Dawson) [#47753](https://github.com/nodejs/node/pull/47753)
* \[[`c4596b9ce7`](https://github.com/nodejs/node/commit/c4596b9ce7)] - **(SEMVER-MINOR)** **sea**: 添加禁用实验性 SEA 警告的选项 (Darshan Sen) [#47588](https://github.com/nodejs/node/pull/47588)
* \[[`1a7fc186bc`](https://github.com/nodejs/node/commit/1a7fc186bc)] - **sea**: 允许使用 "node:" 前缀 require 核心模块 (Darshan Sen) [#47779](https://github.com/nodejs/node/pull/47779)
* \[[`786a1c5398`](https://github.com/nodejs/node/commit/786a1c5398)] - **src**: 去重 X509Certificate::Fingerprint\* (Tobias Nießen) [#47978](https://github.com/nodejs/node/pull/47978)
* \[[`060c1d502b`](https://github.com/nodejs/node/commit/060c1d502b)] - **src**: 停止复制代码缓存，第二部分 (Keyhan Vakil) [#47958](https://github.com/nodejs/node/pull/47958)
* \[[`1aec718619`](https://github.com/nodejs/node/commit/1aec718619)] - **(SEMVER-MINOR)** **src**: 添加 cjs\_module\_lexer\_version base64\_version (Jithil P Ponnan) [#45629](https://github.com/nodejs/node/pull/45629)
* \[[`0c06bfd8dc`](https://github.com/nodejs/node/commit/0c06bfd8dc)] - **src**: 将 BlobSerializerDeserializer 移动到单独的头文件 (Darshan Sen) [#47933](https://github.com/nodejs/node/pull/47933)
* \[[`bd553e7521`](https://github.com/nodejs/node/commit/bd553e7521)] - **src**: 将 SKIP\_CHECK\_SIZE 重命名为 SKIP\_CHECK\_STRLEN (Tobias Nießen) [#47845](https://github.com/nodejs/node/pull/47845)
* \[[`190596c189`](https://github.com/nodejs/node/commit/190596c189)] - **src**: 为源代码注册外部引用 (Keyhan Vakil) [#47055](https://github.com/nodejs/node/pull/47055)
* \[[`4293cc47f4`](https://github.com/nodejs/node/commit/4293cc47f4)] - **src**: 支持 V8 实验性共享值用于消息传递 (Shu-yu Guo) [#47706](https://github.com/nodejs/node/pull/47706)
* \[[`9bc5d78f0c`](https://github.com/nodejs/node/commit/9bc5d78f0c)] - **src**: 为 Fingerprint512 注册外部引用 (Tobias Nießen) [#47892](https://github.com/nodejs/node/pull/47892)
* \[[`a11507e23b`](https://github.com/nodejs/node/commit/a11507e23b)] - **src**: 停止复制代码缓存 (Keyhan Vakil) [#47144](https://github.com/nodejs/node/pull/47144)
* \[[`515c9b8de6`](https://github.com/nodejs/node/commit/515c9b8de6)] - **src**: 澄清 `Permission::Apply` 中的参数名称 (Daeyeon Jeong) [#47874](https://github.com/nodejs/node/pull/47874)
* \[[`c4217613f5`](https://github.com/nodejs/node/commit/c4217613f5)] - **src**: 修复从使用 `openAsBlob` 创建的 Blob 创建 ArrayBuffer 的问题 (Daeyeon Jeong) [#47691](https://github.com/nodejs/node/pull/47691)
* \[[`4bc17fd67b`](https://github.com/nodejs/node/commit/4bc17fd67b)] - **src**: 避免对 Utf8Value 使用 strcmp() (Tobias Nießen) [#47827](https://github.com/nodejs/node/pull/47827)
* \[[`d358317f70`](https://github.com/nodejs/node/commit/d358317f70)] - **src**: 直接从 realm 获取 binding data store (Joyee Cheung) [#47437](https://github.com/nodejs/node/pull/47437)
* \[[`b04d51a0b5`](https://github.com/nodejs/node/commit/b04d51a0b5)] - **src**: 优先使用 string 和 vector 的 data accessor (Mohammed Keyvanzadeh) [#47750](https://github.com/nodejs/node/pull/47750)
* \[[`2952cc576c`](https://github.com/nodejs/node/commit/2952cc576c)] - **src**: 添加 per-isolate 的 SetFastMethod 和 Set\[Fast]MethodNoSideEffect (Joyee Cheung) [#47768](https://github.com/nodejs/node/pull/47768)
* \[[`010d2ecf94`](https://github.com/nodejs/node/commit/010d2ecf94)] - **test**: 将 test-esm-loader-http-imports 标记为 flaky (Tobias Nießen) [#47987](https://github.com/nodejs/node/pull/47987)
* \[[`bb33c74c07`](https://github.com/nodejs/node/commit/bb33c74c07)] - **test**: 添加 getRandomValues 返回长度 (Jithil P Ponnan) [#46357](https://github.com/nodejs/node/pull/46357)
* \[[`6e019586f7`](https://github.com/nodejs/node/commit/6e019586f7)] - **test**: 取消跳过 negative-settimeout.any.js WPT (Filip Skokan) [#47946](https://github.com/nodejs/node/pull/47946)
* \[[`8f547afe5f`](https://github.com/nodejs/node/commit/8f547afe5f)] - **test**: 为一个负向 import 测试使用合适的 usages (Filip Skokan) [#47878](https://github.com/nodejs/node/pull/47878)
* \[[`7e34f77518`](https://github.com/nodejs/node/commit/7e34f77518)] - **test**: 修复 webcrypto wrap unwrap 测试 (Filip Skokan) [#47876](https://github.com/nodejs/node/pull/47876)
* \[[`30f4f35244`](https://github.com/nodejs/node/commit/30f4f35244)] - **test**: 修复路径包含 node 版本时的输出测试 (Moshe Atlow) [#47843](https://github.com/nodejs/node/pull/47843)
* \[[`54607bfd68`](https://github.com/nodejs/node/commit/54607bfd68)] - **test**: 降低 WPT 并发度 (Filip Skokan) [#47834](https://github.com/nodejs/node/pull/47834)
* \[[`17945a2495`](https://github.com/nodejs/node/commit/17945a2495)] - **test**: 将一个 pseudo\_tty 测试迁移为使用 assertSnapshot (Moshe Atlow) [#47803](https://github.com/nodejs/node/pull/47803)
* \[[`c9233679e8`](https://github.com/nodejs/node/commit/c9233679e8)] - **test**: 修复进程退出但 workers 仍在运行时的 WPT 状态 (Filip Skokan) [#47826](https://github.com/nodejs/node/pull/47826)
* \[[`34bfb69b5b`](https://github.com/nodejs/node/commit/34bfb69b5b)] - **test**: 将消息测试迁移为使用 assertSnapshot (Moshe Atlow) [#47498](https://github.com/nodejs/node/pull/47498)
* \[[`d25c785c2a`](https://github.com/nodejs/node/commit/d25c785c2a)] - **test**: 在 signal-handler abort 测试中允许 SIGBUS (Michaël Zasso) [#47851](https://github.com/nodejs/node/pull/47851)
* \[[`aa2c7e00d7`](https://github.com/nodejs/node/commit/aa2c7e00d7)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#47921](https://github.com/nodejs/node/pull/47921)
* \[[`da27542058`](https://github.com/nodejs/node/commit/da27542058)] - **test\_runner**: 使用 v8.serialize 而不是 TAP (Moshe Atlow) [#47867](https://github.com/nodejs/node/pull/47867)
* \[[`17befe008c`](https://github.com/nodejs/node/commit/17befe008c)] - **(SEMVER-MINOR)** **test\_runner**: 为 `test` 添加简写 (Chemi Atlow) [#47909](https://github.com/nodejs/node/pull/47909)
* \[[`42db1d50a0`](https://github.com/nodejs/node/commit/42db1d50a0)] - **test\_runner**: 修复 test hooks 的顺序 (Phil Nash) [#47931](https://github.com/nodejs/node/pull/47931)
* \[[`d81c54e3a8`](https://github.com/nodejs/node/commit/d81c54e3a8)] - **test\_runner**: 从覆盖率中省略无法访问的文件 (Colin Ihrig) [#47850](https://github.com/nodejs/node/pull/47850)
* \[[`a4e261e910`](https://github.com/nodejs/node/commit/a4e261e910)] - **tools**: nghttp3 的调试日志 (Marco Ippolito) [#47992](https://github.com/nodejs/node/pull/47992)
* \[[`f6ff318d4c`](https://github.com/nodejs/node/commit/f6ff318d4c)] - **tools**: 自动化 icu-small 更新 (Marco Ippolito) [#47727](https://github.com/nodejs/node/pull/47727)
* \[[`706c305381`](https://github.com/nodejs/node/commit/706c305381)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@3.21.5 (Node.js GitHub Bot) [#47903](https://github.com/nodejs/node/pull/47903)
* \[[`e22c686ca9`](https://github.com/nodejs/node/commit/e22c686ca9)] - **tools**: 将 eslint 更新到 8.40.0 (Node.js GitHub Bot) [#47906](https://github.com/nodejs/node/pull/47906)
* \[[`36f7cfac93`](https://github.com/nodejs/node/commit/36f7cfac93)] - **tools**: 将 eslint 更新到 8.39.0 (Node.js GitHub Bot) [#47789](https://github.com/nodejs/node/pull/47789)
* \[[`7323902a40`](https://github.com/nodejs/node/commit/7323902a40)] - **tools**: 修复 jsdoc lint (Moshe Atlow) [#47789](https://github.com/nodejs/node/pull/47789)
* \[[`a0634d7f89`](https://github.com/nodejs/node/commit/a0634d7f89)] - **(SEMVER-MINOR)** **url**: 为 has 和 delete 方法添加 value 参数 (Sankalp Shubham) [#47885](https://github.com/nodejs/node/pull/47885)
* \[[`1b06c1e003`](https://github.com/nodejs/node/commit/1b06c1e003)] - **url**: 改进 `isURL` 检测 (Yagiz Nizipli) [#47886](https://github.com/nodejs/node/pull/47886)
* \[[`2bd869d20c`](https://github.com/nodejs/node/commit/2bd869d20c)] - **vm**: 修复在 context 的 globalThis 上设置 __proto__ 时的崩溃 (Feng Yu) [#47939](https://github.com/nodejs/node/pull/47939)
* \[[`e6685f9e82`](https://github.com/nodejs/node/commit/e6685f9e82)] - **vm,lib**: 重构 microtaskQueue 赋值逻辑 (Khaidi Chu) [#47765](https://github.com/nodejs/node/pull/47765)
* \[[`47fea13dac`](https://github.com/nodejs/node/commit/47fea13dac)] - **worker**: 支持更多（序列化/反序列化）错误的场景 (Moshe Atlow) [#47925](https://github.com/nodejs/node/pull/47925)
* \[[`6f3876c035`](https://github.com/nodejs/node/commit/6f3876c035)] - **worker**: 在由 worker 启动的 worker 中使用快照 (Joyee Cheung) [#47731](https://github.com/nodejs/node/pull/47731)

<a id="20.1.0"></a>

## 2023-05-03，版本 20.1.0（当前），@targos

### 重要变更

* \[[`5e99598639`](https://github.com/nodejs/node/commit/5e99598639)] - **assert**：弃用 `CallTracker`（Moshe Atlow）[#47740](https://github.com/nodejs/node/pull/47740)
* \[[`2d97c89c6f`](https://github.com/nodejs/node/commit/2d97c89c6f)] - **crypto**：将根证书更新为 NSS 3.89（Node.js GitHub Bot）[#47659](https://github.com/nodejs/node/pull/47659)
* \[[`ce8820e292`](https://github.com/nodejs/node/commit/ce8820e292)] - **(SEMVER-MINOR)** **dns**：公开 `getDefaultResultOrder`（btea）[#46973](https://github.com/nodejs/node/pull/46973)
* \[[`9d30f469aa`](https://github.com/nodejs/node/commit/9d30f469aa)] - **doc**：将 KhafraDev 添加为协作者（Matthew Aitken）[#47510](https://github.com/nodejs/node/pull/47510)
* \[[`439ea47a77`](https://github.com/nodejs/node/commit/439ea47a77)] - **(SEMVER-MINOR)** **fs**：为 `readdir` 和 `opendir` 添加 `recursive` 选项（Ethan Arrowood）[#41439](https://github.com/nodejs/node/pull/41439)
* \[[`a54e898dc8`](https://github.com/nodejs/node/commit/a54e898dc8)] - **(SEMVER-MINOR)** **fs**：添加对 `mode` 标志的支持，以指定 `cp` 方法的复制行为（Tetsuharu Ohzeki）[#47084](https://github.com/nodejs/node/pull/47084)
* \[[`4fa773964b`](https://github.com/nodejs/node/commit/4fa773964b)] - **(SEMVER-MINOR)** **http**：为 `http.createServer` 添加 `highWaterMark` 选项（HinataKah0）[#47405](https://github.com/nodejs/node/pull/47405)
* \[[`2b411f4b42`](https://github.com/nodejs/node/commit/2b411f4b42)] - **(SEMVER-MINOR)** **stream**：在 `compose` 中保留对象模式（Raz Luvaton）[#47413](https://github.com/nodejs/node/pull/47413)
* \[[`5327483f31`](https://github.com/nodejs/node/commit/5327483f31)] - **(SEMVER-MINOR)** **test\_runner**：为 `run` API 添加 `testNamePatterns`（Chemi Atlow）[#47628](https://github.com/nodejs/node/pull/47628)
* \[[`bdd02a467d`](https://github.com/nodejs/node/commit/bdd02a467d)] - **(SEMVER-MINOR)** **test\_runner**：在测试上执行 `before` 钩子（Chemi Atlow）[#47586](https://github.com/nodejs/node/pull/47586)
* \[[`0e70c187bc`](https://github.com/nodejs/node/commit/0e70c187bc)] - **(SEMVER-MINOR)** **test\_runner**：支持合并覆盖率报告（Colin Ihrig）[#47686](https://github.com/nodejs/node/pull/47686)
* \[[`75c1d1b66e`](https://github.com/nodejs/node/commit/75c1d1b66e)] - **(SEMVER-MINOR)** **wasi**：默认将 `returnOnExit` 设为 true（Michael Dawson）[#47390](https://github.com/nodejs/node/pull/47390)

### 提交

* \[[`33d1bd3e02`](https://github.com/nodejs/node/commit/33d1bd3e02)] - **assert**：弃用 callTracker（Moshe Atlow）[#47740](https://github.com/nodejs/node/pull/47740)
* \[[`6d87355e83`](https://github.com/nodejs/node/commit/6d87355e83)] - **benchmark**：新增 eventtarget 创建基准测试（Rafael Gonzaga）[#47774](https://github.com/nodejs/node/pull/47774)
* \[[`40324a1dea`](https://github.com/nodejs/node/commit/40324a1dea)] - **benchmark**：区分 whatwg 和 legacy url（Yagiz Nizipli）[#47377](https://github.com/nodejs/node/pull/47377)
* \[[`936d7cb069`](https://github.com/nodejs/node/commit/936d7cb069)] - **benchmark**：为 `defaultResolve` 添加基准测试（Antoine du Hamel）[#47543](https://github.com/nodejs/node/pull/47543)
* \[[`202042ee93`](https://github.com/nodejs/node/commit/202042ee93)] - **bootstrap**：在 snapshot 脚本中支持带命名空间的内置模块（Joyee Cheung）[#47467](https://github.com/nodejs/node/pull/47467)
* \[[`30af5cee55`](https://github.com/nodejs/node/commit/30af5cee55)] - **build**：路径使用 pathlib（Mohammed Keyvanzadeh）[#47581](https://github.com/nodejs/node/pull/47581)
* \[[`089c9c51e9`](https://github.com/nodejs/node/commit/089c9c51e9)] - **build**：重构 configure.py（Mohammed Keyvanzadeh）[#47667](https://github.com/nodejs/node/pull/47667)
* \[[`5b851c8074`](https://github.com/nodejs/node/commit/5b851c8074)] - **build**：添加 devcontainer 配置（Tierney Cyren）[#40825](https://github.com/nodejs/node/pull/40825)
* \[[`35e8b3b467`](https://github.com/nodejs/node/commit/35e8b3b467)] - **build**：将 ossf/scorecard-action 从 2.1.2 升级到 2.1.3（dependabot\[bot]）[#47367](https://github.com/nodejs/node/pull/47367)
* \[[`78c08243df`](https://github.com/nodejs/node/commit/78c08243df)] - **build**：用 ruff 替换 Python linter flake8（Christian Clauss）[#47519](https://github.com/nodejs/node/pull/47519)
* \[[`2d97c89c6f`](https://github.com/nodejs/node/commit/2d97c89c6f)] - **crypto**：将根证书更新为 NSS 3.89（Node.js GitHub Bot）[#47659](https://github.com/nodejs/node/pull/47659)
* \[[`420feb41cf`](https://github.com/nodejs/node/commit/420feb41cf)] - **crypto**：移除 randomBytes 中的 INT\_MAX 限制（Tobias Nießen）[#47559](https://github.com/nodejs/node/pull/47559)
* \[[`6046779dd9`](https://github.com/nodejs/node/commit/6046779dd9)] - **deps**：禁用 V8 并发 sparkplug 编译（Michaël Zasso）[#47450](https://github.com/nodejs/node/pull/47450)
* \[[`00d461e93f`](https://github.com/nodejs/node/commit/00d461e93f)] - **deps**：V8：cherry-pick c5ab3e4f0c5a（Richard Lau）[#47736](https://github.com/nodejs/node/pull/47736)
* \[[`d08dd8069f`](https://github.com/nodejs/node/commit/d08dd8069f)] - **deps**：将 ada 更新到 2.3.0（Node.js GitHub Bot）[#47737](https://github.com/nodejs/node/pull/47737)
* \[[`996245976b`](https://github.com/nodejs/node/commit/996245976b)] - **deps**：将 undici 更新到 5.22.0（Node.js GitHub Bot）[#47679](https://github.com/nodejs/node/pull/47679)
* \[[`f3ee3126df`](https://github.com/nodejs/node/commit/f3ee3126df)] - **deps**：将 ada 更新到 2.2.0（Node.js GitHub Bot）[#47678](https://github.com/nodejs/node/pull/47678)
* \[[`1391d3b9ff`](https://github.com/nodejs/node/commit/1391d3b9ff)] - **deps**：添加 minimatch 作为依赖项（Moshe Atlow）[#47499](https://github.com/nodejs/node/pull/47499)
* \[[`315454350d`](https://github.com/nodejs/node/commit/315454350d)] - **deps**：将 ada 更新到 2.1.0（Node.js GitHub Bot）[#47598](https://github.com/nodejs/node/pull/47598)
* \[[`7f7735cad9`](https://github.com/nodejs/node/commit/7f7735cad9)] - **deps**：更新 ICU 到 73.1 版本（Steven R. Loomis）[#47456](https://github.com/nodejs/node/pull/47456)
* \[[`13105c12b7`](https://github.com/nodejs/node/commit/13105c12b7)] - **deps**：将 V8 修补到 11.3.244.8（Michaël Zasso）[#47536](https://github.com/nodejs/node/pull/47536)
* \[[`ede69d272a`](https://github.com/nodejs/node/commit/ede69d272a)] - **deps**：将 undici 更新到 5.21.2（Node.js GitHub Bot）[#47508](https://github.com/nodejs/node/pull/47508)
* \[[`64b5a5f872`](https://github.com/nodejs/node/commit/64b5a5f872)] - **deps**：将 simdutf 更新到 3.2.8（Node.js GitHub Bot）[#47507](https://github.com/nodejs/node/pull/47507)
* \[[`2664536796`](https://github.com/nodejs/node/commit/2664536796)] - **deps**：V8：cherry-pick 8e10685ff918（Jiawen Geng）[#47440](https://github.com/nodejs/node/pull/47440)
* \[[`ba9ec91f0e`](https://github.com/nodejs/node/commit/ba9ec91f0e)] - **deps**：将 undici 更新到 5.21.1（Node.js GitHub Bot）[#47488](https://github.com/nodejs/node/pull/47488)
* \[[`ce8820e292`](https://github.com/nodejs/node/commit/ce8820e292)] - **(SEMVER-MINOR)** **dns**：公开 getDefaultResultOrder（btea）[#46973](https://github.com/nodejs/node/pull/46973)
* \[[`4c26e28c33`](https://github.com/nodejs/node/commit/4c26e28c33)] - **doc**：为 deps 创建维护文件夹（Marco Ippolito）[#47589](https://github.com/nodejs/node/pull/47589)
* \[[`aa0ef3eabd`](https://github.com/nodejs/node/commit/aa0ef3eabd)] - **doc**：修复 --allow-\* CLI 标志引用（Tobias Nießen）[#47804](https://github.com/nodejs/node/pull/47804)
* \[[`98603b6fd3`](https://github.com/nodejs/node/commit/98603b6fd3)] - **doc**：澄清 fs 权限仅影响 fs 模块（Tobias Nießen）[#47782](https://github.com/nodejs/node/pull/47782)
* \[[`3befe5dac9`](https://github.com/nodejs/node/commit/3befe5dac9)] - **doc**：在 Windows 上添加复制 node 可执行文件指南（XLor）[#47781](https://github.com/nodejs/node/pull/47781)
* \[[`98450d9892`](https://github.com/nodejs/node/commit/98450d9892)] - **doc**：将 MoLow 从 Triagers 中移除（Moshe Atlow）[#47792](https://github.com/nodejs/node/pull/47792)
* \[[`d75036410d`](https://github.com/nodejs/node/commit/d75036410d)] - **doc**：修复 webstreams.md 中的拼写错误（Christian Takle）[#47766](https://github.com/nodejs/node/pull/47766)
* \[[`ceba37a74f`](https://github.com/nodejs/node/commit/ceba37a74f)] - **doc**：将 BethGriggs 移动为 regular member（Rich Trott）[#47776](https://github.com/nodejs/node/pull/47776)
* \[[`b954ea9781`](https://github.com/nodejs/node/commit/b954ea9781)] - **doc**：在 SEA 中标明二进制签名仅适用于 macOS 和 Windows（Xuguang Mei）[#47722](https://github.com/nodejs/node/pull/47722)
* \[[`26bccbcd10`](https://github.com/nodejs/node/commit/26bccbcd10)] - **doc**：将 addaleax 移动到 TSC emeriti（Anna Henningsen）[#47752](https://github.com/nodejs/node/pull/47752)
* \[[`20b0de242f`](https://github.com/nodejs/node/commit/20b0de242f)] - **doc**：添加 Node.js core 新闻链接（Michael Dawson）[#47704](https://github.com/nodejs/node/pull/47704)
* \[[`5709133dc7`](https://github.com/nodejs/node/commit/5709133dc7)] - **doc**：修复 `permissions.md` 中的一个拼写错误（Daeyeon Jeong）[#47730](https://github.com/nodejs/node/pull/47730)
* \[[`c5c40a89f2`](https://github.com/nodejs/node/commit/c5c40a89f2)] - **doc**：async\_hooks 异步内容示例添加 mjs 代码（btea）[#47401](https://github.com/nodejs/node/pull/47401)
* \[[`a1403a8df2`](https://github.com/nodejs/node/commit/a1403a8df2)] - **doc**：澄清 test runner 的并发模型（Tobias Nießen）[#47642](https://github.com/nodejs/node/pull/47642)
* \[[`c0c23fbe42`](https://github.com/nodejs/node/commit/c0c23fbe42)] - **doc**：修复 `fs.openAsBlob` 中的一个拼写错误（Daeyeon Jeong）[#47693](https://github.com/nodejs/node/pull/47693)
* \[[`4cef98812d`](https://github.com/nodejs/node/commit/4cef98812d)] - **doc**：修复拼写错误（Mohammed Keyvanzadeh）[#47685](https://github.com/nodejs/node/pull/47685)
* \[[`f30ef242ef`](https://github.com/nodejs/node/commit/f30ef242ef)] - **doc**：修复 ASan 的大小写（Mohammed Keyvanzadeh）[#47676](https://github.com/nodejs/node/pull/47676)
* \[[`78a3503406`](https://github.com/nodejs/node/commit/78a3503406)] - **doc**：修复 SECURITY.md 中的拼写错误（Mohammed Keyvanzadeh）[#47677](https://github.com/nodejs/node/pull/47677)
* \[[`9101630e05`](https://github.com/nodejs/node/commit/9101630e05)] - **doc**：更新 buffer 的错误代码（Deokjin Kim）[#47617](https://github.com/nodejs/node/pull/47617)
* \[[`183f0c3e79`](https://github.com/nodejs/node/commit/183f0c3e79)] - **doc**：更改 `Buffer.copyBytesFrom` 示例中的 offset（Deokjin Kim）[#47606](https://github.com/nodejs/node/pull/47606)
* \[[`d11ff4bc53`](https://github.com/nodejs/node/commit/d11ff4bc53)] - **doc**：改进 fs 权限说明（Tobias Nießen）[#47596](https://github.com/nodejs/node/pull/47596)
* \[[`b58920c3a9`](https://github.com/nodejs/node/commit/b58920c3a9)] - **doc**：从标题中移除 markdown 链接（Tobias Nießen）[#47585](https://github.com/nodejs/node/pull/47585)
* \[[`c36634e880`](https://github.com/nodejs/node/commit/c36634e880)] - **doc**：修正 `WASI` 构造函数的历史顺序（Antoine du Hamel）[#47611](https://github.com/nodejs/node/pull/47611)
* \[[`d3fadd889d`](https://github.com/nodejs/node/commit/d3fadd889d)] - **doc**：修复 release-post 脚本位置（Rafael Gonzaga）[#47517](https://github.com/nodejs/node/pull/47517)
* \[[`2a0bbe7883`](https://github.com/nodejs/node/commit/2a0bbe7883)] - **doc**：修复 webcrypto 元数据中的拼写错误（Tobias Nießen）[#47595](https://github.com/nodejs/node/pull/47595)
* \[[`b0b16ee9f6`](https://github.com/nodejs/node/commit/b0b16ee9f6)] - **doc**：添加来自 uvwasi 团队的新闻链接（Michael Dawson）[#47531](https://github.com/nodejs/node/pull/47531)
* \[[`7ca416af15`](https://github.com/nodejs/node/commit/7ca416af15)] - **doc**：在 ESM 示例中添加缺失的 setEncoding 调用（Anna Henningsen）[#47558](https://github.com/nodejs/node/pull/47558)
* \[[`f9abd59b41`](https://github.com/nodejs/node/commit/f9abd59b41)] - **doc**：更新 Node.js 20 版本使用的 darwin-x64 工具链（Michaël Zasso）[#47546](https://github.com/nodejs/node/pull/47546)
* \[[`0dc508070f`](https://github.com/nodejs/node/commit/0dc508070f)] - **doc**：修复 Hooks caveat 中的分裂不定式（Jacob Smith）[#47550](https://github.com/nodejs/node/pull/47550)
* \[[`4046280475`](https://github.com/nodejs/node/commit/4046280475)] - **doc**：修复 util.types.isNativeError() 中的拼写错误（Julian Dax）[#47532](https://github.com/nodejs/node/pull/47532)
* \[[`9d30f469aa`](https://github.com/nodejs/node/commit/9d30f469aa)] - **doc**：将 KhafraDev 添加为协作者（Matthew Aitken）[#47510](https://github.com/nodejs/node/pull/47510)
* \[[`537c17ec48`](https://github.com/nodejs/node/commit/537c17ec48)] - **doc**：创建 maintaining-brotli.md（Marco Ippolito）[#47380](https://github.com/nodejs/node/pull/47380)
* \[[`09ff9eafd9`](https://github.com/nodejs/node/commit/09ff9eafd9)] - **doc,fs**：更新 fs.stat() 方法的描述（Mert Can Altın）[#47654](https://github.com/nodejs/node/pull/47654)
* \[[`185d6090cd`](https://github.com/nodejs/node/commit/185d6090cd)] - **doc,test**：修复 test() 的 concurrency 选项（Tobias Nießen）[#47734](https://github.com/nodejs/node/pull/47734)
* \[[`a793cf401d`](https://github.com/nodejs/node/commit/a793cf401d)] - **esm**：重命名 `URLCanParse` 以保持一致性（Antoine du Hamel）[#47668](https://github.com/nodejs/node/pull/47668)
* \[[`fbb6b72f87`](https://github.com/nodejs/node/commit/fbb6b72f87)] - **esm**：移除对已弃用 hooks 的支持（Antoine du Hamel）[#47580](https://github.com/nodejs/node/pull/47580)
* \[[`c150976c4f`](https://github.com/nodejs/node/commit/c150976c4f)] - **esm**：在 eval 时初始化 `import.meta`（Antoine du Hamel）[#47551](https://github.com/nodejs/node/pull/47551)
* \[[`55f70f6395`](https://github.com/nodejs/node/commit/55f70f6395)] - **esm**：将 loader 线程中的 `process.exit` 传播到主线程（Antoine du Hamel）[#47548](https://github.com/nodejs/node/pull/47548)
* \[[`269482f61f`](https://github.com/nodejs/node/commit/269482f61f)] - **esm**：避免访问 urls 的惰性 getter（Yagiz Nizipli）[#47542](https://github.com/nodejs/node/pull/47542)
* \[[`889add68e5`](https://github.com/nodejs/node/commit/889add68e5)] - **esm**：在验证 urls 时避免 try/catch（Yagiz Nizipli）[#47541](https://github.com/nodejs/node/pull/47541)
* \[[`439ea47a77`](https://github.com/nodejs/node/commit/439ea47a77)] - **(SEMVER-MINOR)** **fs**：为 readdir 和 opendir 添加 recursive 选项（Ethan Arrowood）[#41439](https://github.com/nodejs/node/pull/41439)
* \[[`a54e898dc8`](https://github.com/nodejs/node/commit/a54e898dc8)] - **(SEMVER-MINOR)** **fs**：添加对 mode 标志的支持，以指定复制行为（Tetsuharu Ohzeki）[#47084](https://github.com/nodejs/node/pull/47084)
* \[[`96f93cc500`](https://github.com/nodejs/node/commit/96f93cc500)] - **(SEMVER-MINOR)** **http**：移除 assignSocket 中的内部错误（Matteo Collina）[#47723](https://github.com/nodejs/node/pull/47723)
* \[[`4fa773964b`](https://github.com/nodejs/node/commit/4fa773964b)] - **(SEMVER-MINOR)** **http**：在 http.createServer 中添加 highWaterMark 选项（HinataKah0）[#47405](https://github.com/nodejs/node/pull/47405)
* \[[`94a5abb1e0`](https://github.com/nodejs/node/commit/94a5abb1e0)] - **inspector**：为 Session 添加提示（theanarkh）[#47195](https://github.com/nodejs/node/pull/47195)
* \[[`21ff33127a`](https://github.com/nodejs/node/commit/21ff33127a)] - **lib**：改进 esm resolve 性能（Yagiz Nizipli）[#46652](https://github.com/nodejs/node/pull/46652)
* \[[`b8bdaf86c4`](https://github.com/nodejs/node/commit/b8bdaf86c4)] - **lib**：禁止基于文件的 blob 克隆（James M Snell）[#47574](https://github.com/nodejs/node/pull/47574)
* \[[`e8bc03b372`](https://github.com/nodejs/node/commit/e8bc03b372)] - **lib**：在 EventTarget 中使用 webidl DOMString 转换器（Matthew Aitken）[#47514](https://github.com/nodejs/node/pull/47514)
* \[[`91e4a7cdee`](https://github.com/nodejs/node/commit/91e4a7cdee)] - **loader**：在 loader worker 中将默认 loader 用作级联 loader（Joyee Cheung）[#47620](https://github.com/nodejs/node/pull/47620)
* \[[`d5089fe00a`](https://github.com/nodejs/node/commit/d5089fe00a)] - **meta**：修复 dependabot 提交信息（Mestery）[#47810](https://github.com/nodejs/node/pull/47810)
* \[[`92794400ce`](https://github.com/nodejs/node/commit/92794400ce)] - **meta**：在 startup 测试更改时 ping nodejs/startup（Joyee Cheung）[#47771](https://github.com/nodejs/node/pull/47771)
* \[[`8d43689077`](https://github.com/nodejs/node/commit/8d43689077)] - **meta**：为 KhafraDev 添加 mailmap 条目（Rich Trott）[#47512](https://github.com/nodejs/node/pull/47512)
* \[[`4d02901935`](https://github.com/nodejs/node/commit/4d02901935)] - **node-api**：测试向 napi\_define\_class 传递 NULL（Gabriel Schulhof）[#47567](https://github.com/nodejs/node/pull/47567)
* \[[`568256dca0`](https://github.com/nodejs/node/commit/568256dca0)] - **node-api**：测试向 number APIs 传递 NULL（Gabriel Schulhof）[#47549](https://github.com/nodejs/node/pull/47549)
* \[[`12f0fa386d`](https://github.com/nodejs/node/commit/12f0fa386d)] - **node-api**：移除未使用的 mark\_arraybuffer\_as\_untransferable（Chengzhong Wu）[#47557](https://github.com/nodejs/node/pull/47557)
* \[[`e8ea83416a`](https://github.com/nodejs/node/commit/e8ea83416a)] - **quic**：添加更多 QUIC 实现（James M Snell）[#47494](https://github.com/nodejs/node/pull/47494)
* \[[`af227b159d`](https://github.com/nodejs/node/commit/af227b159d)] - **readline**：修复最后一行没有换行符的问题（Ian Harris）[#47317](https://github.com/nodejs/node/pull/47317)
* \[[`e948bec969`](https://github.com/nodejs/node/commit/e948bec969)] - **src**：避免在 fs\_permission 中复制字符串（Yagiz Nizipli）[#47746](https://github.com/nodejs/node/pull/47746)
* \[[`dc43ce7706`](https://github.com/nodejs/node/commit/dc43ce7706)] - **src**：用 ada::idna 替换 idna 函数（Yagiz Nizipli）[#47735](https://github.com/nodejs/node/pull/47735)
* \[[`1f9e7ce7e8`](https://github.com/nodejs/node/commit/1f9e7ce7e8)] - **src**：修复 quic/sessionticket.cc 注释中的拼写错误（Tobias Nießen）[#47754](https://github.com/nodejs/node/pull/47754)
* \[[`2acb57b777`](https://github.com/nodejs/node/commit/2acb57b777)] - **src**：将 fatal error 函数标记为 noreturn（Chengzhong Wu）[#47695](https://github.com/nodejs/node/pull/47695)
* \[[`4431df7481`](https://github.com/nodejs/node/commit/4431df7481)] - **src**：拆分 BlobSerializer/BlobDeserializer（Joyee Cheung）[#47458](https://github.com/nodejs/node/pull/47458)
* \[[`bf9a52cb3d`](https://github.com/nodejs/node/commit/bf9a52cb3d)] - **src**：防止在 publish 后更改 FunctionTemplateInfo（Shelley Vohr）[#46979](https://github.com/nodejs/node/pull/46979)
* \[[`872e6706ca`](https://github.com/nodejs/node/commit/872e6706ca)] - **src**：为 url canParse 添加 v8 fast api（Matthew Aitken）[#47552](https://github.com/nodejs/node/pull/47552)
* \[[`cfafe431f2`](https://github.com/nodejs/node/commit/cfafe431f2)] - **src**：使 binding data 中的 AliasedBuffers 变为弱引用（Joyee Cheung）[#47354](https://github.com/nodejs/node/pull/47354)
* \[[`cf48db0034`](https://github.com/nodejs/node/commit/cf48db0034)] - **src**：使用 v8::Boolean(b) 代替 b ? True() : False()（Tobias Nießen）[#47554](https://github.com/nodejs/node/pull/47554)
* \[[`ba255eda37`](https://github.com/nodejs/node/commit/ba255eda37)] - **src**：修复 process.env 访问器错误消息中的拼写错误（Moritz Raho）[#47014](https://github.com/nodejs/node/pull/47014)
* \[[`daf0c78232`](https://github.com/nodejs/node/commit/daf0c78232)] - **src**：将 static const string\_view 替换为 static constexpr（Daniel Lemire）[#47524](https://github.com/nodejs/node/pull/47524)
* \[[`57e7ed7f47`](https://github.com/nodejs/node/commit/57e7ed7f47)] - **src**：修复长度超过 INT\_MAX 时的 CSPRNG（Tobias Nießen）[#47515](https://github.com/nodejs/node/pull/47515)
* \[[`cda36bfd8f`](https://github.com/nodejs/node/commit/cda36bfd8f)] - **src**：在 node\_builtins.cc 中使用正确的变量（Michaël Zasso）[#47343](https://github.com/nodejs/node/pull/47343)
* \[[`adc1601ccd`](https://github.com/nodejs/node/commit/adc1601ccd)] - **src**：精简 stream\_base-inl.h（lilsweetcaligula）[#46972](https://github.com/nodejs/node/pull/46972)
* \[[`f88132f1b8`](https://github.com/nodejs/node/commit/f88132f1b8)] - **stream**：防止使用生成器函数时 pipeline 卡住（Debadree Chatterjee）[#47712](https://github.com/nodejs/node/pull/47712)
* \[[`2b411f4b42`](https://github.com/nodejs/node/commit/2b411f4b42)] - **(SEMVER-MINOR)** **stream**：在 compose 中保留对象模式（Raz Luvaton）[#47413](https://github.com/nodejs/node/pull/47413)
* \[[`159cf02920`](https://github.com/nodejs/node/commit/159cf02920)] - **test**：重构以在 timers 中使用 `getEventListeners`（Deokjin Kim）[#47759](https://github.com/nodejs/node/pull/47759)
* \[[`97a3d39b8f`](https://github.com/nodejs/node/commit/97a3d39b8f)] - **test**：添加并使用 tmpdir.hasEnoughSpace()（Tobias Nießen）[#47767](https://github.com/nodejs/node/pull/47767)
* \[[`5bb7b26bb5`](https://github.com/nodejs/node/commit/5bb7b26bb5)] - **test**：移除 test runner 测试名称中的空格（Tobias Nießen）[#47733](https://github.com/nodejs/node/pull/47733)
* \[[`84fa9fd725`](https://github.com/nodejs/node/commit/84fa9fd725)] - **test**：重构 WPTRunner 并启用并行 WPT 执行（Filip Skokan）[#47635](https://github.com/nodejs/node/pull/47635)
* \[[`9d3768eb01`](https://github.com/nodejs/node/commit/9d3768eb01)] - _**Revert**_ "**test**：再次并行运行 WPT 文件"（Filip Skokan）[#47627](https://github.com/nodejs/node/pull/47627)
* \[[`826f4041d1`](https://github.com/nodejs/node/commit/826f4041d1)] - **test**：将 test-cluster-primary-error 在 asan 上标记为 flaky（Yagiz Nizipli）[#47422](https://github.com/nodejs/node/pull/47422)
* \[[`e5251e31eb`](https://github.com/nodejs/node/commit/e5251e31eb)] - **test\_runner**：修复在 `--experimental-loader` 下使用 `--require`（Moshe Atlow）[#47751](https://github.com/nodejs/node/pull/47751)
* \[[`6ee5e42c73`](https://github.com/nodejs/node/commit/6ee5e42c73)] - **(SEMVER-MINOR)** **test\_runner**：支持合并覆盖率报告（Colin Ihrig）[#47686](https://github.com/nodejs/node/pull/47686)
* \[[`f8581e7629`](https://github.com/nodejs/node/commit/f8581e7629)] - **test\_runner**：移除无操作验证（Colin Ihrig）[#47687](https://github.com/nodejs/node/pull/47687)
* \[[`40b38797c5`](https://github.com/nodejs/node/commit/40b38797c5)] - **test\_runner**：修复 test runner 并发（Moshe Atlow）[#47675](https://github.com/nodejs/node/pull/47675)
* \[[`2d7cac0c5b`](https://github.com/nodejs/node/commit/2d7cac0c5b)] - **test\_runner**：修复测试计数（Moshe Atlow）[#47675](https://github.com/nodejs/node/pull/47675)
* \[[`5a9b71a52e`](https://github.com/nodejs/node/commit/5a9b71a52e)] - **test\_runner**：修复嵌套钩子（Moshe Atlow）[#47648](https://github.com/nodejs/node/pull/47648)
* \[[`5327483f31`](https://github.com/nodejs/node/commit/5327483f31)] - **(SEMVER-MINOR)** **test\_runner**：为 run api 添加 testNamePatterns（Chemi Atlow）[#47628](https://github.com/nodejs/node/pull/47628)
* \[[`b6fb7914ca`](https://github.com/nodejs/node/commit/b6fb7914ca)] - **test\_runner**：支持对未命名函数的覆盖率统计（Colin Ihrig）[#47652](https://github.com/nodejs/node/pull/47652)
* \[[`1f120a396f`](https://github.com/nodejs/node/commit/1f120a396f)] - **test\_runner**：将覆盖率收集移至 root.postRun()（Colin Ihrig）[#47651](https://github.com/nodejs/node/pull/47651)
* \[[`bdd02a467d`](https://github.com/nodejs/node/commit/bdd02a467d)] - **(SEMVER-MINOR)** **test\_runner**：在测试上执行 before 钩子（Chemi Atlow）[#47586](https://github.com/nodejs/node/pull/47586)
* \[[`ec24abaa03`](https://github.com/nodejs/node/commit/ec24abaa03)] - **test\_runner**：避免在摘要中报告失败测试的父级（Moshe Atlow）[#47579](https://github.com/nodejs/node/pull/47579)
* \[[`4203057740`](https://github.com/nodejs/node/commit/4203057740)] - **test\_runner**：修复 spec 跳过检测（Moshe Atlow）[#47537](https://github.com/nodejs/node/pull/47537)
* \[[`57c69987ba`](https://github.com/nodejs/node/commit/57c69987ba)] - **tls**：在 server.addContext() 中接受 SecureContext 对象（HinataKah0）[#47570](https://github.com/nodejs/node/pull/47570)
* \[[`c620eb80a0`](https://github.com/nodejs/node/commit/c620eb80a0)] - **tools**：将 doc 更新到 highlight.js\@11.8.0（Node.js GitHub Bot）[#47786](https://github.com/nodejs/node/pull/47786)
* \[[`326c3f1593`](https://github.com/nodejs/node/commit/326c3f1593)] - **tools**：在 v8.gyp 文件中添加缺失的 LoongArch64 定义（Sun Haiyong）[#47641](https://github.com/nodejs/node/pull/47641)
* \[[`8d1588acdc`](https://github.com/nodejs/node/commit/8d1588acdc)] - **tools**：将 lint-md-dependencies 更新为 rollup\@3.21.1（Node.js GitHub Bot）[#47787](https://github.com/nodejs/node/pull/47787)
* \[[`226e5b83ee`](https://github.com/nodejs/node/commit/226e5b83ee)] - **tools**：将 update-npm 移至 dep updaters（Marco Ippolito）[#47619](https://github.com/nodejs/node/pull/47619)
* \[[`9d0bef6c0a`](https://github.com/nodejs/node/commit/9d0bef6c0a)] - **tools**：修复 update-v8-patch 缓存（Marco Ippolito）[#47725](https://github.com/nodejs/node/pull/47725)
* \[[`63e8c95a66`](https://github.com/nodejs/node/commit/63e8c95a66)] - **tools**：自动更新 v8 patch（Marco Ippolito）[#47594](https://github.com/nodejs/node/pull/47594)
* \[[`d2994e52d3`](https://github.com/nodejs/node/commit/d2994e52d3)] - **tools**：修复 update-cjs-module-lexer 中的跳过消息（Tobias Nießen）[#47701](https://github.com/nodejs/node/pull/47701)
* \[[`ccf9c37b43`](https://github.com/nodejs/node/commit/ccf9c37b43)] - **tools**：将 lint-md-dependencies 更新为 @rollup/plugin-commonjs\@24.1.0（Node.js GitHub Bot）[#47577](https://github.com/nodejs/node/pull/47577)
* \[[`0887fa0464`](https://github.com/nodejs/node/commit/0887fa0464)] - **tools**：保持 PR 标题/描述为最新状态（Tobias Nießen）[#47621](https://github.com/nodejs/node/pull/47621)
* \[[`b8927ddf16`](https://github.com/nodejs/node/commit/b8927ddf16)] - **tools**：修复更新根证书（Richard Lau）[#47607](https://github.com/nodejs/node/pull/47607)
* \[[`87cae0cb59`](https://github.com/nodejs/node/commit/87cae0cb59)] - **tools**：更新 PR label 配置（Mohammed Keyvanzadeh）[#47593](https://github.com/nodejs/node/pull/47593)
* \[[`c17f2688b8`](https://github.com/nodejs/node/commit/c17f2688b8)] - _**Revert**_ "**tools**：确保失败的 daily wpt 运行仍然生成报告"（Filip Skokan）[#47627](https://github.com/nodejs/node/pull/47627)
* \[[`fbe7d73234`](https://github.com/nodejs/node/commit/fbe7d73234)] - **tools**：为 uvwasi 脚本添加执行权限（Mert Can Altın）[#47600](https://github.com/nodejs/node/pull/47600)
* \[[`e3f4ff439e`](https://github.com/nodejs/node/commit/e3f4ff439e)] - **tools**：添加 googletest 更新脚本（Tobias Nießen）[#47482](https://github.com/nodejs/node/pull/47482)
* \[[`7c552e650a`](https://github.com/nodejs/node/commit/7c552e650a)] - **tools**：添加使用特定 tool id 运行 workflow 的选项（Michaël Zasso）[#47591](https://github.com/nodejs/node/pull/47591)
* \[[`1509312170`](https://github.com/nodejs/node/commit/1509312170)] - **tools**：自动更新 zlib（Marco Ippolito）[#47417](https://github.com/nodejs/node/pull/47417)
* \[[`6af7f1ee03`](https://github.com/nodejs/node/commit/6af7f1ee03)] - **tools**：自动添加 url 和 whatwg-url 标签（Yagiz Nizipli）[#47545](https://github.com/nodejs/node/pull/47545)
* \[[`ff73c05d54`](https://github.com/nodejs/node/commit/ff73c05d54)] - **tools**：为 benchmark 更改添加 performance 标签（Yagiz Nizipli）[#47545](https://github.com/nodejs/node/pull/47545)
* \[[`9e3e0b0a84`](https://github.com/nodejs/node/commit/9e3e0b0a84)] - **tools**：自动更新 uvwasi 依赖（Ranieri Innocenti Spada）[#47509](https://github.com/nodejs/node/pull/47509)
* \[[`233b628f22`](https://github.com/nodejs/node/commit/233b628f22)] - **tools**：添加缺失的固定依赖（Mateo Nunez）[#47346](https://github.com/nodejs/node/pull/47346)
* \[[`e4d95859f5`](https://github.com/nodejs/node/commit/e4d95859f5)] - **tools**：自动更新 ngtcp2 和 nghttp3（Marco Ippolito）[#47402](https://github.com/nodejs/node/pull/47402)
* \[[`2e8338126b`](https://github.com/nodejs/node/commit/2e8338126b)] - **tools**：将 update-undici.sh 移至 dep_updaters 并创建维护 md（Marco Ippolito）[#47380](https://github.com/nodejs/node/pull/47380)
* \[[`8712eafc87`](https://github.com/nodejs/node/commit/8712eafc87)] - **typings**：修复 tsconfig 中的语法错误（Mohammed Keyvanzadeh）[#47584](https://github.com/nodejs/node/pull/47584)
* \[[`e4b6b79f18`](https://github.com/nodejs/node/commit/e4b6b79f18)] - **url**：减少 revokeObjectURL 的 cpp 调用（Yagiz Nizipli）[#47728](https://github.com/nodejs/node/pull/47728)
* \[[`9aae76727f`](https://github.com/nodejs/node/commit/9aae76727f)] - **url**：处理不带 base 参数的 URL.canParse（Yagiz Nizipli）[#47547](https://github.com/nodejs/node/pull/47547)
* \[[`180d365439`](https://github.com/nodejs/node/commit/180d365439)] - **url**：验证 URL 构造函数参数长度（Matthew Aitken）[#47513](https://github.com/nodejs/node/pull/47513)
* \[[`4839fc4369`](https://github.com/nodejs/node/commit/4839fc4369)] - **url**：验证 canParse 中的参数长度（Matthew Aitken）[#47513](https://github.com/nodejs/node/pull/47513)
* \[[`606523d37e`](https://github.com/nodejs/node/commit/606523d37e)] - **v8**：修复 ERR\_NOT\_BUILDING\_SNAPSHOT 不是构造函数的问题（Chengzhong Wu）[#47721](https://github.com/nodejs/node/pull/47721)
* \[[`75c1d1b66e`](https://github.com/nodejs/node/commit/75c1d1b66e)] - **(SEMVER-MINOR)** **wasi**：默认将 returnOnExit 设为 true（Michael Dawson）[#47390](https://github.com/nodejs/node/pull/47390)

<a id="20.0.0"></a>

## 2023-04-18, 版本 20.0.0（当前），@RafaelGSS

我们很高兴地宣布 Node.js 20 正式发布！亮点包括全新的 Node.js 权限模型、
同步的 `import.meta.resolve`、稳定的 test\_runner、V8 JavaScript 引擎更新至 11.3、Ada 更新至 2.0，
以及更多内容！

提醒一下，Node.js 20 将于 10 月进入长期支持（LTS），但在此之前，它将在接下来的六个月里保持“当前”版本。
我们鼓励你探索此最新版本提供的新特性和优势，并评估它们对你的应用程序可能产生的影响。

### 重要变更

#### 权限模型

Node.js 现在有一个名为权限模型的实验性功能。
它允许开发者在程序执行期间限制对特定资源的访问，例如文件系统操作、
子进程创建以及工作线程创建。
该 API 位于标志 `--experimental-permission` 之后，启用后将限制对所有可用权限的访问。
通过使用此功能，开发者可以阻止其应用程序访问或修改敏感数据，或运行潜在有害的代码。
有关权限模型的更多信息，请参阅 [Node.js 文档](https://nodejs.org/api/permissions.html#process-based-permissions)。

权限模型由 Rafael Gonzaga 在 [#44004](https://github.com/nodejs/node/pull/44004) 中贡献。

#### 通过专用线程运行自定义 ESM loader hooks

通过 loader 提供的 ESM hooks（`--experimental-loader=foo.mjs`）现在会在一个与主线程隔离的专用线程中运行。
这为 loader 提供了独立的作用域，并确保 loader 与应用代码之间不会相互污染。

**同步的 `import.meta.resolve()`**

为了与浏览器行为保持一致，此函数现在会同步返回。
尽管如此，用户自定义 loader 的 `resolve` hooks 仍然可以定义为 async 函数（或者如果作者更愿意，也可以是 sync 函数）。
即使加载了异步的 `resolve` hooks，`import.meta.resolve` 对应用代码仍然会同步返回。

由 Anna Henningsen、Antoine du Hamel、Geoffrey Booth、Guy Bedford、Jacob Smith 和 Michaël Zasso 在 [#44710](https://github.com/nodejs/node/pull/44710) 中贡献

#### V8 11.3

V8 引擎已更新到 11.3 版本，这是 Chromium 113 的一部分。
此版本为 JavaScript API 带来了三个新特性：

* [String.prototype.isWellFormed 和 toWellFormed](https://chromestatus.com/feature/5200195346759680)
* [按副本更改 Array 和 TypedArray 的方法](https://chromestatus.com/feature/5068609911521280)
* [Resizable ArrayBuffer 和 growable SharedArrayBuffer](https://chromestatus.com/feature/4668361878274048)
* [带有集合表示法 + 字符串属性的 RegExp v 标志](https://chromestatus.com/feature/5144156542861312)
* [WebAssembly Tail Call](https://chromestatus.com/feature/5423405012615168)

V8 的更新由 Michaël Zasso 在 [#47251](https://github.com/nodejs/node/pull/47251) 中贡献。

#### 稳定的 Test Runner

Node.js 的最新更新版本 20 对 test\_runner 模块包含了一项重要变更。该模块在最近的更新后已被标记为稳定。
此前，test\_runner 模块处于实验状态，但这一变更将其标记为可用于生产环境的稳定模块。

由 Colin Ihrig 在 [#46983](https://github.com/nodejs/node/pull/46983) 中贡献

#### Ada 2.0

Node.js v20 搭载了最新版本的 URL 解析器 Ada。此次更新为 URL 解析带来了显著的性能提升，
包括对 `node:url` 中 `url.domainToASCII` 和 `url.domainToUnicode` 函数的增强。

Ada 2.0 已集成到 Node.js 代码库中，确保应用的所有部分都能受益于
改进后的性能。此外，Ada 2.0 相较于前代 Ada 1.0.4 具有显著的性能提升，
同时也消除了 URL 主机名解析对 ICU 的依赖。

由 Yagiz Nizipli 和 Daniel Lemire 在 [#47339](https://github.com/nodejs/node/pull/47339) 中贡献

#### 构建单文件可执行应用现在需要注入一个 Blob

构建单文件可执行应用现在需要注入一个由
Node.js 从 JSON 配置准备好的 blob，而不是注入原始 JS 文件。
这为在 SEA（Single Executable Apps）中嵌入多个可共存资源提供了可能性。

由 Joyee Cheung 在 [#47125](https://github.com/nodejs/node/pull/47125) 中贡献

#### Web Crypto API

Web Crypto API 函数的参数现在会按照其 WebIDL 定义进行强制转换和验证，就像其他 Web Crypto API 实现一样。
这进一步提升了与其他 Web Crypto API 实现之间的互操作性。

此更改由 Filip Skokan 在 [#46067](https://github.com/nodejs/node/pull/46067) 中完成。

#### 官方支持 ARM64 Windows

Node.js 现在包含 ARM64 Windows 的二进制文件，支持在该平台上原生运行。
MSI、zip/7z 安装包以及可执行文件均可在 Node.js 下载站点获取，与所有其他平台一致。
CI 系统也已更新，所有变更现在都已在 ARM64 Windows 上完成全面测试，以防止回归并确保兼容性。

ARM64 Windows 已由 Stefan Stojanovic 在 [#47233](https://github.com/nodejs/node/pull/47233) 中升级为二级支持。

#### 现在必须指定 WASI 版本

当调用 `new WASI()` 时，version 选项现在是必需的，且没有默认值。
任何依赖 version 默认值的代码都需要更新，以请求一个特定版本。

此更改由 Michael Dawson 在 [#47391](https://github.com/nodejs/node/pull/47391) 中完成。

#### 废弃与移除

* \[[`3bed5f11e0`](https://github.com/nodejs/node/commit/3bed5f11e0)] - **(SEMVER-MAJOR)** **url**: 运行时废弃带有无效端口的 url.parse()（Rich Trott） [#45526](https://github.com/nodejs/node/pull/45526)

`url.parse()` 接受端口不是数字的 URL。这种行为在遇到意外输入时可能导致主机名欺骗。
未来版本的 Node.js 中，这些 URL 将抛出错误，因为 WHATWG URL API 已经如此。
从 Node.js 20 开始，这些 URL 会导致 `url.parse()` 发出警告。

### Semver-Major 提交

* \[[`9fafb0a090`](https://github.com/nodejs/node/commit/9fafb0a090)] - **(SEMVER-MAJOR)** **async\_hooks**: 弃用 AsyncResource.bind asyncResource 属性（James M Snell） [#46432](https://github.com/nodejs/node/pull/46432)
* \[[`1948d37595`](https://github.com/nodejs/node/commit/1948d37595)] - **(SEMVER-MAJOR)** **buffer**: 使用 validateNumber 检查 INSPECT\_MAX\_BYTES（Umuoy） [#46599](https://github.com/nodejs/node/pull/46599)
* \[[`7bc0e6a4e7`](https://github.com/nodejs/node/commit/7bc0e6a4e7)] - **(SEMVER-MAJOR)** **buffer**: 将 File 从实验性功能升级并作为全局对象暴露（Khafra） [#47153](https://github.com/nodejs/node/pull/47153)
* \[[`671ffd7825`](https://github.com/nodejs/node/commit/671ffd7825)] - **(SEMVER-MAJOR)** **buffer**: 使用 `validateNumber` 的最小值/最大值（Deokjin Kim） [#45796](https://github.com/nodejs/node/pull/45796)
* \[[`ab1614d280`](https://github.com/nodejs/node/commit/ab1614d280)] - **(SEMVER-MAJOR)** **build**: 将 embedder 字符串重置为 "-node.0"（Michaël Zasso） [#47251](https://github.com/nodejs/node/pull/47251)
* \[[`c1bcdbcf79`](https://github.com/nodejs/node/commit/c1bcdbcf79)] - **(SEMVER-MAJOR)** **build**: 对早于 10.1 的 gcc 版本发出警告（Richard Lau） [#46806](https://github.com/nodejs/node/pull/46806)
* \[[`649f68fc1e`](https://github.com/nodejs/node/commit/649f68fc1e)] - **(SEMVER-MAJOR)** **build**: 将 embedder 字符串重置为 "-node.0"（Yagiz Nizipli） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`9374700d7a`](https://github.com/nodejs/node/commit/9374700d7a)] - **(SEMVER-MAJOR)** **crypto**: 移除 DEFAULT\_ENCODING（Tobias Nießen） [#47182](https://github.com/nodejs/node/pull/47182)
* \[[`1640aeb680`](https://github.com/nodejs/node/commit/1640aeb680)] - **(SEMVER-MAJOR)** **crypto**: 移除过时的 SSL\_OP\_\* 常量（Tobias Nießen） [#47073](https://github.com/nodejs/node/pull/47073)
* \[[`c2e4b1fa9a`](https://github.com/nodejs/node/commit/c2e4b1fa9a)] - **(SEMVER-MAJOR)** **crypto**: 移除 ALPN\_ENABLED（Tobias Nießen） [#47028](https://github.com/nodejs/node/pull/47028)
* \[[`3ef38c4bd7`](https://github.com/nodejs/node/commit/3ef38c4bd7)] - **(SEMVER-MAJOR)** **crypto**: 在 WebCryptoAPI 中使用 WebIDL 转换器（Filip Skokan） [#46067](https://github.com/nodejs/node/pull/46067)
* \[[`08af023b1f`](https://github.com/nodejs/node/commit/08af023b1f)] - **(SEMVER-MAJOR)** **crypto**: 运行时废弃被替换的 rsa-pss 密钥生成参数（Filip Skokan） [#45653](https://github.com/nodejs/node/pull/45653)
* \[[`7eb0ac3cb6`](https://github.com/nodejs/node/commit/7eb0ac3cb6)] - **(SEMVER-MAJOR)** **deps**: 修补 V8 以支持在 win-arm64 上编译（Michaël Zasso） [#47251](https://github.com/nodejs/node/pull/47251)
* \[[`a7c129f286`](https://github.com/nodejs/node/commit/a7c129f286)] - **(SEMVER-MAJOR)** **deps**: 屏蔽无关的 V8 警告（Michaël Zasso） [#47251](https://github.com/nodejs/node/pull/47251)
* \[[`6f5655a18e`](https://github.com/nodejs/node/commit/6f5655a18e)] - **(SEMVER-MAJOR)** **deps**: 始终将 V8\_EXPORT\_PRIVATE 定义为无操作（Michaël Zasso） [#47251](https://github.com/nodejs/node/pull/47251)
* \[[`f226350fcb`](https://github.com/nodejs/node/commit/f226350fcb)] - **(SEMVER-MAJOR)** **deps**: 将 V8 更新到 11.3.244.4（Michaël Zasso） [#47251](https://github.com/nodejs/node/pull/47251)
* \[[`d6dae7420e`](https://github.com/nodejs/node/commit/d6dae7420e)] - **(SEMVER-MAJOR)** **deps**: V8: 选取 f1c888e7093e 的补丁（Michaël Zasso） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`56c436533e`](https://github.com/nodejs/node/commit/56c436533e)] - **(SEMVER-MAJOR)** **deps**: 修复 Windows 上使用 MSVC 的 V8 构建（Michaël Zasso） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`51ab98c71b`](https://github.com/nodejs/node/commit/51ab98c71b)] - **(SEMVER-MAJOR)** **deps**: 屏蔽无关的 V8 警告（Michaël Zasso） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`9f84d3eea8`](https://github.com/nodejs/node/commit/9f84d3eea8)] - **(SEMVER-MAJOR)** **deps**: V8: 为 MSVC 修复 v8-cppgc.h（Jiawen Geng） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`f2318cd4b5`](https://github.com/nodejs/node/commit/f2318cd4b5)] - **(SEMVER-MAJOR)** **deps**: 修复带有内联方法的 V8 构建问题（Jiawen Geng） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`16e03e7968`](https://github.com/nodejs/node/commit/16e03e7968)] - **(SEMVER-MAJOR)** **deps**: 将 V8 更新到 10.9.194.4（Yagiz Nizipli） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`6473f5e7f7`](https://github.com/nodejs/node/commit/6473f5e7f7)] - **(SEMVER-MAJOR)** **doc**: 更新 Node.js 20 发布所使用的工具链（Richard Lau） [#47352](https://github.com/nodejs/node/pull/47352)
* \[[`cc18fd9608`](https://github.com/nodejs/node/commit/cc18fd9608)] - **(SEMVER-MAJOR)** **events**: 重构为使用 `validateNumber`（Deokjin Kim） [#45770](https://github.com/nodejs/node/pull/45770)
* \[[`ff92b40ffc`](https://github.com/nodejs/node/commit/ff92b40ffc)] - **(SEMVER-MAJOR)** **http**: 在发送未声明长度的主体后关闭连接（Tim Perry） [#46333](https://github.com/nodejs/node/pull/46333)
* \[[`2a29df6464`](https://github.com/nodejs/node/commit/2a29df6464)] - **(SEMVER-MAJOR)** **http**: 即使移除了 Connection 头，也保持 HTTP/1.1 连接存活（Tim Perry） [#46331](https://github.com/nodejs/node/pull/46331)
* \[[`391dc74a10`](https://github.com/nodejs/node/commit/391dc74a10)] - **(SEMVER-MAJOR)** **http**: 如果 http.Server 的 options 是数组则抛出错误（Deokjin Kim） [#46283](https://github.com/nodejs/node/pull/46283)
* \[[`ed3604cd64`](https://github.com/nodejs/node/commit/ed3604cd64)] - **(SEMVER-MAJOR)** **http**: 服务器检查 Host 头，以满足 RFC 7230 5.4 要求（wwwzbwcom） [#45597](https://github.com/nodejs/node/pull/45597)
* \[[`88d71dc301`](https://github.com/nodejs/node/commit/88d71dc301)] - **(SEMVER-MAJOR)** **lib**: 重构为使用 `validateNumber` 的最小值/最大值（Deokjin Kim） [#45772](https://github.com/nodejs/node/pull/45772)
* \[[`e4d641f02a`](https://github.com/nodejs/node/commit/e4d641f02a)] - **(SEMVER-MAJOR)** **lib**: 重构为在 http2 中使用验证器（Debadree Chatterjee） [#46174](https://github.com/nodejs/node/pull/46174)
* \[[`0f3e531096`](https://github.com/nodejs/node/commit/0f3e531096)] - **(SEMVER-MAJOR)** **lib**: 提高 readline async iterator 的性能（Thiago Oliveira Santos） [#41276](https://github.com/nodejs/node/pull/41276)
* \[[`5b5898ac86`](https://github.com/nodejs/node/commit/5b5898ac86)] - **(SEMVER-MAJOR)** **lib,src**: 按照 todos 更新退出码（Debadree Chatterjee） [#45841](https://github.com/nodejs/node/pull/45841)
* \[[`55321bafd1`](https://github.com/nodejs/node/commit/55321bafd1)] - **(SEMVER-MAJOR)** **net**: 默认启用 autoSelectFamily（Paolo Insogna） [#46790](https://github.com/nodejs/node/pull/46790)
* \[[`2d0d99733b`](https://github.com/nodejs/node/commit/2d0d99733b)] - **(SEMVER-MAJOR)** **process**: 移除 `process.exit()`、`process.exitCode` 的整数强制转换（Daeyeon Jeong） [#43716](https://github.com/nodejs/node/pull/43716)
* \[[`dc06df31b6`](https://github.com/nodejs/node/commit/dc06df31b6)] - **(SEMVER-MAJOR)** **readline**: 重构为使用 `validateNumber`（Deokjin Kim） [#45801](https://github.com/nodejs/node/pull/45801)
* \[[`295b2f3ff4`](https://github.com/nodejs/node/commit/295b2f3ff4)] - **(SEMVER-MAJOR)** **src**: 将 NODE\_MODULE\_VERSION 更新为 115（Michaël Zasso） [#47251](https://github.com/nodejs/node/pull/47251)
* \[[`3803b028dd`](https://github.com/nodejs/node/commit/3803b028dd)] - **(SEMVER-MAJOR)** **src**: 让 SEA 和 embedder script 共享通用代码路径（Anna Henningsen） [#46825](https://github.com/nodejs/node/pull/46825)
* \[[`e8bddac3e9`](https://github.com/nodejs/node/commit/e8bddac3e9)] - **(SEMVER-MAJOR)** **src**: 应用 ABI 破坏性的 API 简化（Anna Henningsen） [#46705](https://github.com/nodejs/node/pull/46705)
* \[[`f84de0ad4c`](https://github.com/nodejs/node/commit/f84de0ad4c)] - **(SEMVER-MAJOR)** **src**: 对进程初始化标志枚举使用 uint32\_t（Anna Henningsen） [#46427](https://github.com/nodejs/node/pull/46427)
* \[[`a6242772ec`](https://github.com/nodejs/node/commit/a6242772ec)] - **(SEMVER-MAJOR)** **src**: 修复 ArrayBuffer::Detach 弃用问题（Michaël Zasso） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`dd5c39a808`](https://github.com/nodejs/node/commit/dd5c39a808)] - **(SEMVER-MAJOR)** **src**: 将 NODE\_MODULE\_VERSION 更新为 112（Yagiz Nizipli） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`63eca7fec0`](https://github.com/nodejs/node/commit/63eca7fec0)] - **(SEMVER-MAJOR)** **stream**: 验证 readable defaultEncoding（Marco Ippolito） [#46430](https://github.com/nodejs/node/pull/46430)
* \[[`9e7093f416`](https://github.com/nodejs/node/commit/9e7093f416)] - **(SEMVER-MAJOR)** **stream**: 验证 writable defaultEncoding（Marco Ippolito） [#46322](https://github.com/nodejs/node/pull/46322)
* \[[`fb91ee4f26`](https://github.com/nodejs/node/commit/fb91ee4f26)] - **(SEMVER-MAJOR)** **test**: 放宽 trace-gc-flag 测试的严格程度（Yagiz Nizipli） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`eca618071e`](https://github.com/nodejs/node/commit/eca618071e)] - **(SEMVER-MAJOR)** **test**: 根据 V8 更新调整 test-v8-stats（Michaël Zasso） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`c03354d3e0`](https://github.com/nodejs/node/commit/c03354d3e0)] - **(SEMVER-MAJOR)** **test**: 针对多个 res.writeHead 和 res.getHeader 的测试用例（Marco Ippolito） [#45508](https://github.com/nodejs/node/pull/45508)
* \[[`c733cc0c7f`](https://github.com/nodejs/node/commit/c733cc0c7f)] - **(SEMVER-MAJOR)** **test\_runner**: 将模块标记为稳定（Colin Ihrig） [#46983](https://github.com/nodejs/node/pull/46983)
* \[[`7ce223273d`](https://github.com/nodejs/node/commit/7ce223273d)] - **(SEMVER-MAJOR)** **tools**: 更新 V8 gypfiles 以适配 11.1（Michaël Zasso） [#47251](https://github.com/nodejs/node/pull/47251)
* \[[`ca4bd3023e`](https://github.com/nodejs/node/commit/ca4bd3023e)] - **(SEMVER-MAJOR)** **tools**: 更新 V8 gypfiles 以适配 11.0（Michaël Zasso） [#47251](https://github.com/nodejs/node/pull/47251)
* \[[`58b06a269a`](https://github.com/nodejs/node/commit/58b06a269a)] - **(SEMVER-MAJOR)** **tools**: 更新 V8 gypfiles（Michaël Zasso） [#45579](https://github.com/nodejs/node/pull/45579)
* \[[`027841c964`](https://github.com/nodejs/node/commit/027841c964)] - **(SEMVER-MAJOR)** **url**: 使用私有属性进行 brand check（Yagiz Nizipli） [#46904](https://github.com/nodejs/node/pull/46904)
* \[[`3bed5f11e0`](https://github.com/nodejs/node/commit/3bed5f11e0)] - **(SEMVER-MAJOR)** **url**: 运行时废弃带有无效端口的 url.parse()（Rich Trott） [#45526](https://github.com/nodejs/node/pull/45526)
* \[[`7c76fddf25`](https://github.com/nodejs/node/commit/7c76fddf25)] - **(SEMVER-MAJOR)** **util,doc**: 将 parseArgs() 标记为稳定（Colin Ihrig） [#46718](https://github.com/nodejs/node/pull/46718)
* \[[`4b52727976`](https://github.com/nodejs/node/commit/4b52727976)] - **(SEMVER-MAJOR)** **wasi**: 使 version 变为必需项（Michael Dawson） [#47391](https://github.com/nodejs/node/pull/47391)

### Semver-Minor 提交

* \[[`d4b440bfac`](https://github.com/nodejs/node/commit/d4b440bfac)] - **(SEMVER-MINOR)** **fs**: 为 readableWebStream() 实现 byob 模式（Debadree Chatterjee） [#46933](https://github.com/nodejs/node/pull/46933)
* \[[`00c222593e`](https://github.com/nodejs/node/commit/00c222593e)] - **(SEMVER-MINOR)** **src,process**: 添加权限模型（Rafael Gonzaga） [#44004](https://github.com/nodejs/node/pull/44004)
* \[[`978b57d750`](https://github.com/nodejs/node/commit/978b57d750)] - **(SEMVER-MINOR)** **wasi**: 不再需要 flag 来启用 wasi（Michael Dawson） [#47286](https://github.com/nodejs/node/pull/47286)

### Semver-Patch 提交

* \[[`e50c6b9a22`](https://github.com/nodejs/node/commit/e50c6b9a22)] - **bootstrap**: 不为 snapshot 入口点展开 process.argv\[1]（Joyee Cheung） [#47466](https://github.com/nodejs/node/pull/47466)
* \[[`c81e1143e4`](https://github.com/nodejs/node/commit/c81e1143e4)] - **bootstrap**: 通过一个 binding 将内部 loaders 存储在 C++ 中（Joyee Cheung） [#47215](https://github.com/nodejs/node/pull/47215)
* \[[`8e673bdb84`](https://github.com/nodejs/node/commit/8e673bdb84)] - **build**: 在 setup 中添加 node-core-utils（Jiawen Geng） [#47442](https://github.com/nodejs/node/pull/47442)
* \[[`5b561d72a6`](https://github.com/nodejs/node/commit/5b561d72a6)] - **build**: 同步 cares 源码变更（Jiawen Geng） [#47359](https://github.com/nodejs/node/pull/47359)
* \[[`8e6ee53e4e`](https://github.com/nodejs/node/commit/8e6ee53e4e)] - **build**: 移除不存在的构建文件（Jiawen Geng） [#47361](https://github.com/nodejs/node/pull/47361)
* \[[`9a4d21d1d9`](https://github.com/nodejs/node/commit/9a4d21d1d9)] - **build, deps, tools**: 避免过度 LTO（Konstantin Demin） [#47313](https://github.com/nodejs/node/pull/47313)
* \[[`48c01485cd`](https://github.com/nodejs/node/commit/48c01485cd)] - **crypto**: 对 scrypt keylen 用 CHECK 替代 THROW（Tobias Nießen） [#47407](https://github.com/nodejs/node/pull/47407)
* \[[`4c1a27716b`](https://github.com/nodejs/node/commit/4c1a27716b)] - **crypto**: 为 AES-KW 包裹的 JWKs 重新添加 padding（Filip Skokan） [#46563](https://github.com/nodejs/node/pull/46563)
* \[[`b66eb15d12`](https://github.com/nodejs/node/commit/b66eb15d12)] - **deps**: 将 simdutf 更新到 3.2.7（Node.js GitHub Bot） [#47473](https://github.com/nodejs/node/pull/47473)
* \[[`3fc11477ba`](https://github.com/nodejs/node/commit/3fc11477ba)] - **deps**: 将 corepack 更新到 0.17.2（Node.js GitHub Bot） [#47474](https://github.com/nodejs/node/pull/47474)
* \[[`c1776531ab`](https://github.com/nodejs/node/commit/c1776531ab)] - **deps**: 将 npm 升级到 9.6.4（npm team） [#47432](https://github.com/nodejs/node/pull/47432)
* \[[`e7ca09f310`](https://github.com/nodejs/node/commit/e7ca09f310)] - **deps**: 将 zlib 更新到上游 5edb52d4（Luigi Pinca） [#47151](https://github.com/nodejs/node/pull/47151)
* \[[`88387ccd12`](https://github.com/nodejs/node/commit/88387ccd12)] - **deps**: 将 ada 更新到 2.0.0（Node.js GitHub Bot） [#47339](https://github.com/nodejs/node/pull/47339)
* \[[`9f468cc37e`](https://github.com/nodejs/node/commit/9f468cc37e)] - **deps**: 选取 Windows ARM64 的 openssl 修复补丁（Richard Lau） [#46570](https://github.com/nodejs/node/pull/46570)
* \[[`eeab210b1b`](https://github.com/nodejs/node/commit/eeab210b1b)] - **deps**: 更新 quictls/openssl-3.0.8+quic 的 archs 文件（RafaelGSS） [#46570](https://github.com/nodejs/node/pull/46570)
* \[[`d93d7716c7`](https://github.com/nodejs/node/commit/d93d7716c7)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.8+quic（RafaelGSS） [#46571](https://github.com/nodejs/node/pull/46571)
* \[[`0f69ec4dd7`](https://github.com/nodejs/node/commit/0f69ec4dd7)] - **deps**: 将 V8 修补到 10.9.194.9（Michaël Zasso） [#45995](https://github.com/nodejs/node/pull/45995)
* \[[`5890d09644`](https://github.com/nodejs/node/commit/5890d09644)] - **deps**: 将 V8 修补到 10.9.194.6（Michaël Zasso） [#45748](https://github.com/nodejs/node/pull/45748)
* \[[`c02a7e7e93`](https://github.com/nodejs/node/commit/c02a7e7e93)] - **diagnostics\_channel**: 修复在订阅者数降为零时的引用计数 bug（Stephen Belanger） [#47520](https://github.com/nodejs/node/pull/47520)
* \[[`c7ad5bb37d`](https://github.com/nodejs/node/commit/c7ad5bb37d)] - **doc**: 关于处理非预期破坏性变更的信息（Michael Dawson） [#47426](https://github.com/nodejs/node/pull/47426)
* \[[`7d2d40ed0d`](https://github.com/nodejs/node/commit/7d2d40ed0d)] - **doc**: 添加性能倡议（Yagiz Nizipli） [#47424](https://github.com/nodejs/node/pull/47424)
* \[[`d56c0f7318`](https://github.com/nodejs/node/commit/d56c0f7318)] - **doc**: 不创建备份文件（Luigi Pinca） [#47151](https://github.com/nodejs/node/pull/47151)
* \[[`412d27b65b`](https://github.com/nodejs/node/commit/412d27b65b)] - **doc**: 将 MoLow 加入 TSC（Colin Ihrig） [#47436](https://github.com/nodejs/node/pull/47436)
* \[[`f131cca0c0`](https://github.com/nodejs/node/commit/f131cca0c0)] - **doc**: 为 Electron 25 保留 116（Keeley Hammond） [#47375](https://github.com/nodejs/node/pull/47375)
* \[[`1022c6f424`](https://github.com/nodejs/node/commit/1022c6f424)] - **doc**: 添加实验性阶段（Geoffrey Booth） [#46100](https://github.com/nodejs/node/pull/46100)
* \[[`42d3d74717`](https://github.com/nodejs/node/commit/42d3d74717)] - **doc**: 澄清 Node.js 16.19.0 的发布说明（Richard Lau） [#45846](https://github.com/nodejs/node/pull/45846)
* \[[`533c6512da`](https://github.com/nodejs/node/commit/533c6512da)] - **doc**: 澄清 Node.js 14.21.2 的发布说明（Richard Lau） [#45846](https://github.com/nodejs/node/pull/45846)
* \[[`97165fc1a6`](https://github.com/nodejs/node/commit/97165fc1a6)] - **doc**: 修复 Node.js 16.19.0 的文档元数据（Richard Lau） [#45863](https://github.com/nodejs/node/pull/45863)
* \[[`a266b8b702`](https://github.com/nodejs/node/commit/a266b8b702)] - **doc**: 添加 Electron 23 和 24 的注册编号（Keeley Hammond） [#45661](https://github.com/nodejs/node/pull/45661)
* \[[`2613a9ced9`](https://github.com/nodejs/node/commit/2613a9ced9)] - **esm**: 将 hook 执行移动到单独线程（Jacob Smith） [#44710](https://github.com/nodejs/node/pull/44710)
* \[[`841f6b3abf`](https://github.com/nodejs/node/commit/841f6b3abf)] - **esm**: 提高边缘情况的测试覆盖率（Antoine du Hamel） [#47033](https://github.com/nodejs/node/pull/47033)
* \[[`0d575fe61a`](https://github.com/nodejs/node/commit/0d575fe61a)] - **gyp**: 将文件名放入变量（Cheng Zhao） [#46965](https://github.com/nodejs/node/pull/46965)
* \[[`41b186722c`](https://github.com/nodejs/node/commit/41b186722c)] - **lib**: 区分带有扩展属性 "Exposed" 的 webidl 接口（Chengzhong Wu） [#46809](https://github.com/nodejs/node/pull/46809)
* \[[`9b7db62276`](https://github.com/nodejs/node/commit/9b7db62276)] - **lib**: experimental policy 下的 makeRequireFunction 补丁（RafaelGSS） [nodejs-private/node-private#358](https://github.com/nodejs-private/node-private/pull/358)
* \[[`d43b532789`](https://github.com/nodejs/node/commit/d43b532789)] - **lib**: 重构为使用 `validateBuffer`（Deokjin Kim） [#46489](https://github.com/nodejs/node/pull/46489)
* \[[`9a76a2521b`](https://github.com/nodejs/node/commit/9a76a2521b)] - **meta**: 在权限模型变更时 ping security-wg 团队（Rafael Gonzaga） [#47483](https://github.com/nodejs/node/pull/47483)
* \[[`a4dadde1ba`](https://github.com/nodejs/node/commit/a4dadde1ba)] - **meta**: 在 src/node\_realm\* 变更时 ping startup 和 realm 团队（Joyee Cheung） [#47448](https://github.com/nodejs/node/pull/47448)
* \[[`631c3ef3de`](https://github.com/nodejs/node/commit/631c3ef3de)] - **module**: 在运行时减少 CJS 模块加载器初始化工作（Joyee Cheung） [#47194](https://github.com/nodejs/node/pull/47194)
* \[[`8bcf0a42f7`](https://github.com/nodejs/node/commit/8bcf0a42f7)] - **permission**: 修复 chmod、chown 并改进 fs 覆盖（Rafael Gonzaga） [#47529](https://github.com/nodejs/node/pull/47529)
* \[[`54d17ff4b5`](https://github.com/nodejs/node/commit/54d17ff4b5)] - **permission**: 支持 fs.mkdtemp（Rafael Gonzaga） [#47470](https://github.com/nodejs/node/pull/47470)
* \[[`b441b5dc65`](https://github.com/nodejs/node/commit/b441b5dc65)] - **permission**: 删除 process.permission.deny（Rafael Gonzaga） [#47335](https://github.com/nodejs/node/pull/47335)
* \[[`aa30e16716`](https://github.com/nodejs/node/commit/aa30e16716)] - **permission**: 修复 fs 中的一些漏洞（Tobias Nießen） [#47091](https://github.com/nodejs/node/pull/47091)
* \[[`1726da9300`](https://github.com/nodejs/node/commit/1726da9300)] - **permission**: 为 loader 检查添加路径分隔符（Rafael Gonzaga） [#47030](https://github.com/nodejs/node/pull/47030)
* \[[`b164038c86`](https://github.com/nodejs/node/commit/b164038c86)] - **permission**: 修复 spawnSync 权限检查（RafaelGSS） [#46975](https://github.com/nodejs/node/pull/46975)
* \[[`af91400886`](https://github.com/nodejs/node/commit/af91400886)] - **policy**: mainModule.require 上的 makeRequireFunction（RafaelGSS） [nodejs-private/node-private#358](https://github.com/nodejs-private/node-private/pull/358)
* \[[`f8b4e26aee`](https://github.com/nodejs/node/commit/f8b4e26aee)] - **quic**: 添加更多 QUIC 实现（James M Snell） [#47348](https://github.com/nodejs/node/pull/47348)
* \[[`d65ae9f678`](https://github.com/nodejs/node/commit/d65ae9f678)] - **quic**: 添加额外的 quic 实现工具（James M Snell） [#47289](https://github.com/nodejs/node/pull/47289)
* \[[`9b104be502`](https://github.com/nodejs/node/commit/9b104be502)] - **quic**: 在 move 后不要解引用 shared\_ptr（Tobias Nießen） [#47294](https://github.com/nodejs/node/pull/47294)
* \[[`09a4bb152f`](https://github.com/nodejs/node/commit/09a4bb152f)] - **quic**: 添加多个内部工具（James M Snell） [#47263](https://github.com/nodejs/node/pull/47263)
* \[[`2bde0059ca`](https://github.com/nodejs/node/commit/2bde0059ca)] - **sea**: 在 SEA 中使用 JSON 配置和 blob 内容（Joyee Cheung） [#47125](https://github.com/nodejs/node/pull/47125)
* \[[`78c7475493`](https://github.com/nodejs/node/commit/78c7475493)] - **src**: 允许 simdutf::convert\_\* 函数返回零（Daniel Lemire） [#47471](https://github.com/nodejs/node/pull/47471)
* \[[`5250947a53`](https://github.com/nodejs/node/commit/5250947a53)] - **src**: 在 heap snapshot 中正确跟踪 ShadowRealm 原生对象（Joyee Cheung） [#47389](https://github.com/nodejs/node/pull/47389)
* \[[`8059764621`](https://github.com/nodejs/node/commit/8059764621)] - **src**: 使用内部字段来确定对象是否为 BaseObject（Joyee Cheung） [#47217](https://github.com/nodejs/node/pull/47217)
* \[[`698508afa8`](https://github.com/nodejs/node/commit/698508afa8)] - **src**: 在 shadow realm 中引导准备堆栈跟踪回调（Chengzhong Wu） [#47107](https://github.com/nodejs/node/pull/47107)
* \[[`e6b4d30a2f`](https://github.com/nodejs/node/commit/e6b4d30a2f)] - **src**: 在 shadow realm 中引导 Web \[Exposed=\*] API（Chengzhong Wu） [#46809](https://github.com/nodejs/node/pull/46809)
* \[[`3646a66044`](https://github.com/nodejs/node/commit/3646a66044)] - **src**: 修复 heap snapshot 中 AliasedBuffer 的内存归因（Joyee Cheung） [#46817](https://github.com/nodejs/node/pull/46817)
* \[[`8b2126f63f`](https://github.com/nodejs/node/commit/8b2126f63f)] - **src**: 将 AliasedBuffer 实现移动到 -inl.h（Joyee Cheung） [#46817](https://github.com/nodejs/node/pull/46817)
* \[[`3abbc3829a`](https://github.com/nodejs/node/commit/3abbc3829a)] - **src**: 修复 permission.cc 中无用的调用（Tobias Nießen） [#46833](https://github.com/nodejs/node/pull/46833)
* \[[`7b1e153530`](https://github.com/nodejs/node/commit/7b1e153530)] - **src**: 简化退出码访问（Daeyeon Jeong） [#45125](https://github.com/nodejs/node/pull/45125)
* \[[`7359b92a41`](https://github.com/nodejs/node/commit/7359b92a41)] - **test**: 移除 test-release-npm 上不必要的状态检查（RafaelGSS） [#47516](https://github.com/nodejs/node/pull/47516)
* \[[`a5a5d2fb7e`](https://github.com/nodejs/node/commit/a5a5d2fb7e)] - **test**: 将 test/parallel/test-file-write-stream4 标记为 flaky（Yagiz Nizipli） [#47423](https://github.com/nodejs/node/pull/47423)
* \[[`81ad73a205`](https://github.com/nodejs/node/commit/81ad73a205)] - **test**: 移除未使用的回调变量（angellovc） [#47167](https://github.com/nodejs/node/pull/47167)
* \[[`757a586ead`](https://github.com/nodejs/node/commit/757a586ead)] - **test**: 将 test runner 消息测试迁移到 snapshot（Moshe Atlow） [#47392](https://github.com/nodejs/node/pull/47392)
* \[[`86f890539f`](https://github.com/nodejs/node/commit/86f890539f)] - **test**: 从 known_issues.status 中移除过时条目（Richard Lau） [#47454](https://github.com/nodejs/node/pull/47454)
* \[[`1f3773d0c1`](https://github.com/nodejs/node/commit/1f3773d0c1)] - **test**: 将更多 inspector 顺序测试移至并行（Joyee Cheung） [#47412](https://github.com/nodejs/node/pull/47412)
* \[[`617b8d44c6`](https://github.com/nodejs/node/commit/617b8d44c6)] - **test**: 在 test-inspector-enabled 中使用随机端口（Joyee Cheung） [#47412](https://github.com/nodejs/node/pull/47412)
* \[[`ade0170c4f`](https://github.com/nodejs/node/commit/ade0170c4f)] - **test**: 在 test-inspector-debug-brk-flag 中使用随机端口（Joyee Cheung） [#47412](https://github.com/nodejs/node/pull/47412)
* \[[`1a78632cd3`](https://github.com/nodejs/node/commit/1a78632cd3)] - **test**: 在 NodeInstance.startViaSignal() 中使用随机端口（Joyee Cheung） [#47412](https://github.com/nodejs/node/pull/47412)
* \[[`23f66b137e`](https://github.com/nodejs/node/commit/23f66b137e)] - **test**: 将 test-shadow-realm-gc.js 移至 known_issues（Joyee Cheung） [#47355](https://github.com/nodejs/node/pull/47355)
* \[[`9dfd0394c5`](https://github.com/nodejs/node/commit/9dfd0394c5)] - **test**: 移除无用的 WPT 初始化脚本（Khafra） [#47221](https://github.com/nodejs/node/pull/47221)
* \[[`1cfe058778`](https://github.com/nodejs/node/commit/1cfe058778)] - **test**: 修复 test-permission-deny-fs-wildcard (win32)（Tobias Nießen） [#47095](https://github.com/nodejs/node/pull/47095)
* \[[`b8ef1b476e`](https://github.com/nodejs/node/commit/b8ef1b476e)] - **test**: 为带权限模型的自定义 loader hooks 添加覆盖测试（Antoine du Hamel） [#46977](https://github.com/nodejs/node/pull/46977)
* \[[`4a7c3e9c50`](https://github.com/nodejs/node/commit/4a7c3e9c50)] - **test**: 修复权限符号链接测试中的文件路径（Livia Medeiros） [#46859](https://github.com/nodejs/node/pull/46859)
* \[[`10005de6a8`](https://github.com/nodejs/node/commit/10005de6a8)] - **tools**: 让 `js2c.py` 可用于其他构建系统（Cheng Zhao） [#46930](https://github.com/nodejs/node/pull/46930)
* \[[`1e2f9aca72`](https://github.com/nodejs/node/commit/1e2f9aca72)] - **tools**: 将 update-acorn.sh 移至 dep\_updaters 并创建维护文档（Marco Ippolito） [#47382](https://github.com/nodejs/node/pull/47382)
* \[[`174662a463`](https://github.com/nodejs/node/commit/174662a463)] - **tools**: 将 eslint 更新到 8.38.0（Node.js GitHub Bot） [#47475](https://github.com/nodejs/node/pull/47475)
* \[[`a58ca61f35`](https://github.com/nodejs/node/commit/a58ca61f35)] - **tools**: 将 eslint 更新到 8.38.0（Node.js GitHub Bot） [#47475](https://github.com/nodejs/node/pull/47475)
* \[[`37d12730ab`](https://github.com/nodejs/node/commit/37d12730ab)] - **tools**: 自动更新 cjs-module-lexer 依赖（Marco Ippolito） [#47446](https://github.com/nodejs/node/pull/47446)
* \[[`4fbfa3c9f2`](https://github.com/nodejs/node/commit/4fbfa3c9f2)] - **tools**: 修复 notify-on-push Slack 消息（Antoine du Hamel） [#47453](https://github.com/nodejs/node/pull/47453)
* \[[`b1f2ff1242`](https://github.com/nodejs/node/commit/b1f2ff1242)] - **tools**: 将 lint-md-dependencies 更新为 @rollup/plugin-node-resolve\@15.0.2（Node.js GitHub Bot） [#47431](https://github.com/nodejs/node/pull/47431)
* \[[`26b2584b84`](https://github.com/nodejs/node/commit/26b2584b84)] - **tools**: 添加根证书更新脚本（Richard Lau） [#47425](https://github.com/nodejs/node/pull/47425)
* \[[`553b052648`](https://github.com/nodejs/node/commit/553b052648)] - **tools**: 移除 `Makefile` 中单个测试套件的目标（Antoine du Hamel） [#46892](https://github.com/nodejs/node/pull/46892)
* \[[`747ff43e5b`](https://github.com/nodejs/node/commit/747ff43e5b)] - **url**: 为 URLSearchParams 提供更复杂的 brand check（Timothy Gu） [#47414](https://github.com/nodejs/node/pull/47414)
* \[[`e727eb066f`](https://github.com/nodejs/node/commit/e727eb066f)] - **url**: 不将对象用作哈希映射（Timothy Gu） [#47415](https://github.com/nodejs/node/pull/47415)
* \[[`81c7875eb7`](https://github.com/nodejs/node/commit/81c7875eb7)] - **url**: 取消解析主机名时对 ICU 的要求（Yagiz Nizipli） [#47339](https://github.com/nodejs/node/pull/47339)
* \[[`a4895df94a`](https://github.com/nodejs/node/commit/a4895df94a)] - **url**: 使用 ada::url\_aggregator 解析 urls（Yagiz Nizipli） [#47339](https://github.com/nodejs/node/pull/47339)
