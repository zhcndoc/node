# Node.js 23 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>当前</th>
</tr>
<tr>
<td>
<a href="#23.11.1">23.11.1</a><br/>
<a href="#23.11.0">23.11.0</a><br/>
<a href="#23.10.0">23.10.0</a><br/>
<a href="#23.9.0">23.9.0</a><br/>
<a href="#23.8.0">23.8.0</a><br/>
<a href="#23.7.0">23.7.0</a><br/>
<a href="#23.6.1">23.6.1</a><br/>
<a href="#23.6.0">23.6.0</a><br/>
<a href="#23.5.0">23.5.0</a><br/>
<a href="#23.4.0">23.4.0</a><br/>
<a href="#23.3.0">23.3.0</a><br/>
<a href="#23.2.0">23.2.0</a><br/>
<a href="#23.1.0">23.1.0</a><br/>
<a href="#23.0.0">23.0.0</a><br/>
</td>
</tr>
</table>

* 其他版本
  * [26.x](CHANGELOG_V26.md)
  * [25.x](CHANGELOG_V25.md)
  * [24.x](CHANGELOG_V24.md)
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
  * [4.x](CHANGELOG_V4.md)
  * [0.12.x](CHANGELOG_V012.md)
  * [0.10.x](CHANGELOG_V010.md)
  * [io.js](CHANGELOG_IOJS.md)
  * [归档](CHANGELOG_ARCHIVE.md)

<a id="23.11.1"></a>

## 2025-05-14，版本 23.11.1（当前），@RafaelGSS

这是一个安全发布。

### 重要变更

src:

* (CVE-2025-23166) 修复异步加密操作中的错误处理

### 提交

* \[[`a271810ce2`](https://github.com/nodejs/node/commit/a271810ce2)] - **deps**: 将 c-ares 更新到 v1.34.5（Node.js GitHub Bot） [#57792](https://github.com/nodejs/node/pull/57792)
* \[[`a12107f0dd`](https://github.com/nodejs/node/commit/a12107f0dd)] - **(CVE-2025-23166)** **src**: 修复异步加密操作中的错误处理（RafaelGSS） [nodejs-private/node-private#688](https://github.com/nodejs-private/node-private/pull/688)

<a id="23.11.0"></a>

## 2025-04-01，版本 23.11.0（当前），@aduh95

### 重要变更

* \[[`64b086740a`](https://github.com/nodejs/node/commit/64b086740a)] - **(SEMVER-MINOR)** **assert**: 实现部分错误比较（Ruben Bridgewater） [#57370](https://github.com/nodejs/node/pull/57370)
* \[[`053cef70e0`](https://github.com/nodejs/node/commit/053cef70e0)] - **(SEMVER-MINOR)** **crypto**: 为 `crypto.diffieHellman` 添加可选回调（Filip Skokan） [#57274](https://github.com/nodejs/node/pull/57274)
* \[[`f8aff90235`](https://github.com/nodejs/node/commit/f8aff90235)] - **(SEMVER-MINOR)** **process**: 添加 `execve`（Paolo Insogna） [#56496](https://github.com/nodejs/node/pull/56496)
* \[[`4b04c92d7d`](https://github.com/nodejs/node/commit/4b04c92d7d)] - **(SEMVER-MINOR)** **sqlite**: 添加 `StatementSync.prototype.columns()`（Colin Ihrig） [#57490](https://github.com/nodejs/node/pull/57490)
* \[[`1b8d1d3a3a`](https://github.com/nodejs/node/commit/1b8d1d3a3a)] - **(SEMVER-MINOR)** **util**: 暴露 assertion 错误使用的 diff 函数（Giovanni Bucci） [#57462](https://github.com/nodejs/node/pull/57462)

### 提交

* \[[`7b72396c8b`](https://github.com/nodejs/node/commit/7b72396c8b)] - **assert**: 提升 partialDeepStrictEqual 性能（Ruben Bridgewater） [#57509](https://github.com/nodejs/node/pull/57509)
* \[[`64b086740a`](https://github.com/nodejs/node/commit/64b086740a)] - **(SEMVER-MINOR)** **assert**: 实现部分错误比较（Ruben Bridgewater） [#57370](https://github.com/nodejs/node/pull/57370)
* \[[`f694d7de0e`](https://github.com/nodejs/node/commit/f694d7de0e)] - **(SEMVER-MINOR)** **assert**: 改进 partialDeepStrictEqual（Ruben Bridgewater） [#57370](https://github.com/nodejs/node/pull/57370)
* \[[`80d9d5653f`](https://github.com/nodejs/node/commit/80d9d5653f)] - **(SEMVER-MINOR)** **assert,util**: 提升性能（Ruben Bridgewater） [#57370](https://github.com/nodejs/node/pull/57370)
* \[[`d52a71f832`](https://github.com/nodejs/node/commit/d52a71f832)] - **(SEMVER-MINOR)** **benchmark**: 调整 assert 运行时间（Ruben Bridgewater） [#57370](https://github.com/nodejs/node/pull/57370)
* \[[`7592cf4cd7`](https://github.com/nodejs/node/commit/7592cf4cd7)] - **(SEMVER-MINOR)** **benchmark**: 默认跳过运行某些 assert 基准测试（Ruben Bridgewater） [#57370](https://github.com/nodejs/node/pull/57370)
* \[[`e4cc54a746`](https://github.com/nodejs/node/commit/e4cc54a746)] - **(SEMVER-MINOR)** **benchmark**: 添加 assert partialDeepStrictEqual 基准测试（Ruben Bridgewater） [#57370](https://github.com/nodejs/node/pull/57370)
* \[[`de48407011`](https://github.com/nodejs/node/commit/de48407011)] - **build**: 修复 update-wpt 工作流（Jonas） [#57468](https://github.com/nodejs/node/pull/57468)
* \[[`52cd0954f9`](https://github.com/nodejs/node/commit/52cd0954f9)] - **cli**: 澄清 --cpu-prof-name 允许的值（Eugenio Ceschia） [#57433](https://github.com/nodejs/node/pull/57433)
* \[[`7611fc14de`](https://github.com/nodejs/node/commit/7611fc14de)] - **crypto**: 修复零长度数据时 privateDecrypt 的输出（Filip Skokan） [#57575](https://github.com/nodejs/node/pull/57575)
* \[[`cc42ee8fc7`](https://github.com/nodejs/node/commit/cc42ee8fc7)] - **crypto**: 确保 SubtleCrypto.importKey RSA 导入中的 JWK alg 与预期一致（Filip Skokan） [#57450](https://github.com/nodejs/node/pull/57450)
* \[[`053cef70e0`](https://github.com/nodejs/node/commit/053cef70e0)] - **(SEMVER-MINOR)** **crypto**: 为 crypto.diffieHellman 添加可选回调（Filip Skokan） [#57274](https://github.com/nodejs/node/pull/57274)
* \[[`1f08864fd7`](https://github.com/nodejs/node/commit/1f08864fd7)] - **debugger**: 修复 debugger repl 中普通对象 exec 的行为（Dario Piotrowicz） [#57498](https://github.com/nodejs/node/pull/57498)
* \[[`162b2828eb`](https://github.com/nodejs/node/commit/162b2828eb)] - **deps**: 将 undici 更新到 6.21.2（Matteo Collina） [#57442](https://github.com/nodejs/node/pull/57442)
* \[[`43bea6bb80`](https://github.com/nodejs/node/commit/43bea6bb80)] - **deps**: V8: 选取 c172ffc5bf54 的提交（Choongwoo Han） [#57437](https://github.com/nodejs/node/pull/57437)
* \[[`99f93afb9d`](https://github.com/nodejs/node/commit/99f93afb9d)] - **deps**: 将 ada 更新到 v3.2.1（Yagiz Nizipli） [#57429](https://github.com/nodejs/node/pull/57429)
* \[[`30e5658f12`](https://github.com/nodejs/node/commit/30e5658f12)] - **deps**: 将 googletest 更新到 0bdccf4（Node.js GitHub Bot） [#57380](https://github.com/nodejs/node/pull/57380)
* \[[`573467c070`](https://github.com/nodejs/node/commit/573467c070)] - **deps**: 将 acorn 更新到 8.14.1（Node.js GitHub Bot） [#57382](https://github.com/nodejs/node/pull/57382)
* \[[`affeaac0c7`](https://github.com/nodejs/node/commit/affeaac0c7)] - **doc**: 将 gurgunday 添加为 triager（Gürgün Dayıoğlu） [#57594](https://github.com/nodejs/node/pull/57594)
* \[[`4ed1a098f5`](https://github.com/nodejs/node/commit/4ed1a098f5)] - **doc**: 澄清 node-api adjust 函数的行为（Michael Dawson） [#57463](https://github.com/nodejs/node/pull/57463)
* \[[`921041b284`](https://github.com/nodejs/node/commit/921041b284)] - **doc**: 移除 Corepack 文档（Antoine du Hamel） [#57635](https://github.com/nodejs/node/pull/57635)
* \[[`99dbd8b391`](https://github.com/nodejs/node/commit/99dbd8b391)] - **doc**: 删除关于 `--require` 不支持 ES modules 的提及（Huáng Jùnliàng） [#57620](https://github.com/nodejs/node/pull/57620)
* \[[`8c76b2949e`](https://github.com/nodejs/node/commit/8c76b2949e)] - **doc**: 提到报告应与 Node.js 行为准则保持一致（Rafael Gonzaga） [#57607](https://github.com/nodejs/node/pull/57607)
* \[[`ee1c78a7a3`](https://github.com/nodejs/node/commit/ee1c78a7a3)] - **doc**: 添加说明，指出非常久未更新的 PR 应该关闭（Dario Piotrowicz） [#57541](https://github.com/nodejs/node/pull/57541)
* \[[`595e9e5ad6`](https://github.com/nodejs/node/commit/595e9e5ad6)] - **doc**: 将 bjohansebas 添加为 triager（Sebastian Beltran） [#57564](https://github.com/nodejs/node/pull/57564)
* \[[`3742d2a198`](https://github.com/nodejs/node/commit/3742d2a198)] - **doc**: 更新支持渠道（Claudio W.） [#57538](https://github.com/nodejs/node/pull/57538)
* \[[`717c44dead`](https://github.com/nodejs/node/commit/717c44dead)] - **doc**: 使稳定性标签更加一致（Antoine du Hamel） [#57516](https://github.com/nodejs/node/pull/57516)
* \[[`b4576a6f57`](https://github.com/nodejs/node/commit/b4576a6f57)] - **doc**: 移除 cryptoStream API 参考文档（Jonas） [#57579](https://github.com/nodejs/node/pull/57579)
* \[[`2c4f894036`](https://github.com/nodejs/node/commit/2c4f894036)] - **doc**: 修正模块解析伪代码（Marcel Laverdet） [#57080](https://github.com/nodejs/node/pull/57080)
* \[[`c45894f90c`](https://github.com/nodejs/node/commit/c45894f90c)] - **doc**: 为 `child_process.md` 中的 DEP0190 添加历史记录条目（Antoine du Hamel） [#57544](https://github.com/nodejs/node/pull/57544)
* \[[`c21068b696`](https://github.com/nodejs/node/commit/c21068b696)] - **doc**: 移除 `child_process.md` 中已弃用的模式（Antoine du Hamel） [#57568](https://github.com/nodejs/node/pull/57568)
* \[[`87e0dda352`](https://github.com/nodejs/node/commit/87e0dda352)] - **doc**: 将多个实验性 API 标记为稳定（James M Snell） [#57510](https://github.com/nodejs/node/pull/57510)
* \[[`d637763e4e`](https://github.com/nodejs/node/commit/d637763e4e)] - **doc**: 将 mertcanaltin 从 Triagers 中移除（Mert Can Altin） [#57531](https://github.com/nodejs/node/pull/57531)
* \[[`ee6025495d`](https://github.com/nodejs/node/commit/ee6025495d)] - **doc**: 在入门文档中建议关注 collaborators 仓库（Darshan Sen） [#57527](https://github.com/nodejs/node/pull/57527)
* \[[`706b64638b`](https://github.com/nodejs/node/commit/706b64638b)] - **doc**: 从入门文档中移除关于签证费用的提及（Darshan Sen） [#57526](https://github.com/nodejs/node/pull/57526)
* \[[`176d951bd0`](https://github.com/nodejs/node/commit/176d951bd0)] - **doc**: 弃用向 `spawn` 和 `execFile` 传递 `args`（Antoine du Hamel） [#57389](https://github.com/nodejs/node/pull/57389)
* \[[`5c05ba119b`](https://github.com/nodejs/node/commit/5c05ba119b)] - **doc**: 移除 `deprecations.md` 中的一些不一致之处（Antoine du Hamel） [#57512](https://github.com/nodejs/node/pull/57512)
* \[[`9d5be4bb8c`](https://github.com/nodejs/node/commit/9d5be4bb8c)] - **doc**: 运行 license-builder（github-actions\[bot]） [#57511](https://github.com/nodejs/node/pull/57511)
* \[[`273607edb4`](https://github.com/nodejs/node/commit/273607edb4)] - **doc**: 添加新的 writing-docs contributing md（Dario Piotrowicz） [#57502](https://github.com/nodejs/node/pull/57502)
* \[[`e28c723f24`](https://github.com/nodejs/node/commit/e28c723f24)] - **doc**: 向 Web Streams 文档添加 node.js streams 参考（Dario Piotrowicz） [#57393](https://github.com/nodejs/node/pull/57393)
* \[[`47296492ba`](https://github.com/nodejs/node/commit/47296492ba)] - **doc**: 替换无法正确渲染的 NOTE（Colin Ihrig） [#57484](https://github.com/nodejs/node/pull/57484)
* \[[`db9c37f792`](https://github.com/nodejs/node/commit/db9c37f792)] - **doc**: 更倾向于在 nodejs 仓库下签署提交（Rafael Gonzaga） [#57311](https://github.com/nodejs/node/pull/57311)
* \[[`e5e3987ae7`](https://github.com/nodejs/node/commit/e5e3987ae7)] - **doc**: 修正多个单词错误拆分的问题（letianpailove） [#57454](https://github.com/nodejs/node/pull/57454)
* \[[`91a824e43b`](https://github.com/nodejs/node/commit/91a824e43b)] - **doc**: 为 collaborator 提名添加审查指南（Antoine du Hamel） [#57449](https://github.com/nodejs/node/pull/57449)
* \[[`2a5fcb2172`](https://github.com/nodejs/node/commit/2a5fcb2172)] - **doc**: 修复 `url.md` 中的拼写错误（Allon Murienik） [#57467](https://github.com/nodejs/node/pull/57467)
* \[[`17ccf9282f`](https://github.com/nodejs/node/commit/17ccf9282f)] - **doc**: 添加 `--use-system-ca` 的历史信息（Darshan Sen） [#57432](https://github.com/nodejs/node/pull/57432)
* \[[`9adaaeb965`](https://github.com/nodejs/node/commit/9adaaeb965)] - **doc**: 从 tls.getCACertificates 文档中移除拼写错误的 YAML 片段（Darshan Sen） [#57459](https://github.com/nodejs/node/pull/57459)
* \[[`ee4e855f8e`](https://github.com/nodejs/node/commit/ee4e855f8e)] - **doc**: 修复 sqlite.md 中的拼写错误（Tobias Nießen） [#57473](https://github.com/nodejs/node/pull/57473)
* \[[`8cb3441443`](https://github.com/nodejs/node/commit/8cb3441443)] - **doc**: 明确提及任意代码执行是一种漏洞（Rafael Gonzaga） [#57426](https://github.com/nodejs/node/pull/57426)
* \[[`27f183ad03`](https://github.com/nodejs/node/commit/27f183ad03)] - **doc**: 更新 openssl 的 maintaining-openssl.md（Richard Lau） [#57413](https://github.com/nodejs/node/pull/57413)
* \[[`ca67145d60`](https://github.com/nodejs/node/commit/ca67145d60)] - **doc**: 在 `fs.md` 中添加缺失的 `deprecated` 徽章（Yukihiro Hasegawa） [#57384](https://github.com/nodejs/node/pull/57384)
* \[[`3687390510`](https://github.com/nodejs/node/commit/3687390510)] - **doc**: 修复 `process.md` 中的小拼写错误（Felix Rieseberg） [#57333](https://github.com/nodejs/node/pull/57333)
* \[[`097d9926e3`](https://github.com/nodejs/node/commit/097d9926e3)] - **doc**: 添加关于同步 nodejs-private 分支的说明（Rafael Gonzaga） [#57404](https://github.com/nodejs/node/pull/57404)
* \[[`5006627969`](https://github.com/nodejs/node/commit/5006627969)] - **fs**: 将 exclude 函数应用于根路径（Rich Trott） [#57420](https://github.com/nodejs/node/pull/57420)
* \[[`0583c3db92`](https://github.com/nodejs/node/commit/0583c3db92)] - **http**: 将 content-length 强制转换为 number（Marco Ippolito） [#57458](https://github.com/nodejs/node/pull/57458)
* \[[`2a580b9332`](https://github.com/nodejs/node/commit/2a580b9332)] - **lib**: 当将 inspector 绑定到公共 IP 时添加警告（Demian Parkhomenko） [#55736](https://github.com/nodejs/node/pull/55736)
* \[[`fda56b9837`](https://github.com/nodejs/node/commit/fda56b9837)] - **lib**: 限制 split 函数调用以防止数组长度过大（Gürgün Dayıoğlu） [#57501](https://github.com/nodejs/node/pull/57501)
* \[[`d5a26f6525`](https://github.com/nodejs/node/commit/d5a26f6525)] - **lib**: 使 getCallSites 的 sourceMap 选项真正变为可选（James M Snell） [#57388](https://github.com/nodejs/node/pull/57388)
* \[[`00a5b18043`](https://github.com/nodejs/node/commit/00a5b18043)] - **meta**: 为提名流程添加一些说明（James M Snell） [#57503](https://github.com/nodejs/node/pull/57503)
* \[[`d0c96c463c`](https://github.com/nodejs/node/commit/d0c96c463c)] - **meta**: 移除 collaborator 自我提名（Rich Trott） [#57537](https://github.com/nodejs/node/pull/57537)
* \[[`a9a93f31ee`](https://github.com/nodejs/node/commit/a9a93f31ee)] - **meta**: 编辑 collaborator 提名流程（Antoine du Hamel） [#57483](https://github.com/nodejs/node/pull/57483)
* \[[`0ca362f5f2`](https://github.com/nodejs/node/commit/0ca362f5f2)] - **meta**: 将 ovflowd 移至 emeritus（Claudio W.） [#57443](https://github.com/nodejs/node/pull/57443)
* \[[`f8aff90235`](https://github.com/nodejs/node/commit/f8aff90235)] - **(SEMVER-MINOR)** **process**: 添加 execve（Paolo Insogna） [#56496](https://github.com/nodejs/node/pull/56496)
* \[[`e8d4a31d4b`](https://github.com/nodejs/node/commit/e8d4a31d4b)] - **sqlite**: 添加对未知命名参数的支持（Colin Ihrig） [#57552](https://github.com/nodejs/node/pull/57552)
* \[[`5652da642d`](https://github.com/nodejs/node/commit/5652da642d)] - **sqlite**: 添加 DatabaseSync.prototype.isOpen（Colin Ihrig） [#57522](https://github.com/nodejs/node/pull/57522)
* \[[`5c976f16cd`](https://github.com/nodejs/node/commit/5c976f16cd)] - **sqlite**: 添加 DatabaseSync.prototype\[Symbol.dispose]\()（Colin Ihrig） [#57506](https://github.com/nodejs/node/pull/57506)
* \[[`4b04c92d7d`](https://github.com/nodejs/node/commit/4b04c92d7d)] - **(SEMVER-MINOR)** **sqlite**: 添加 StatementSync.prototype.columns()（Colin Ihrig） [#57490](https://github.com/nodejs/node/pull/57490)
* \[[`7f5e31645c`](https://github.com/nodejs/node/commit/7f5e31645c)] - **src**: 确保 primordials 只初始化一次（Chengzhong Wu） [#57519](https://github.com/nodejs/node/pull/57519)
* \[[`9611980f58`](https://github.com/nodejs/node/commit/9611980f58)] - **src**: 改进多个文件中的错误处理（James M Snell） [#57507](https://github.com/nodejs/node/pull/57507)
* \[[`3ddc5cd875`](https://github.com/nodejs/node/commit/3ddc5cd875)] - **src**: 缓存 urlpattern 属性（JonasBa） [#57465](https://github.com/nodejs/node/pull/57465)
* \[[`b9d9ee4da2`](https://github.com/nodejs/node/commit/b9d9ee4da2)] - **src**: 对 encoding\_binding.cc 进行少量清理（James M Snell） [#57448](https://github.com/nodejs/node/pull/57448)
* \[[`f8acf2dd2a`](https://github.com/nodejs/node/commit/f8acf2dd2a)] - **src**: 对 compile\_cache.cc 进行少量清理（James M Snell） [#57448](https://github.com/nodejs/node/pull/57448)
* \[[`6ee15c6509`](https://github.com/nodejs/node/commit/6ee15c6509)] - **src**: 使用宏定义 urlpattern 组件（JonasBa） [#57452](https://github.com/nodejs/node/pull/57452)
* \[[`4ab3c1690a`](https://github.com/nodejs/node/commit/4ab3c1690a)] - **src**: 进一步清理 crypto（James M Snell） [#57323](https://github.com/nodejs/node/pull/57323)
* \[[`5be80b1748`](https://github.com/nodejs/node/commit/5be80b1748)] - **src**: 进一步精简 ncrypto（James M Snell） [#57300](https://github.com/nodejs/node/pull/57300)
* \[[`6a13319a6e`](https://github.com/nodejs/node/commit/6a13319a6e)] - **src**: 清理 aliased_buffer.h（Mohammed Keyvanzadeh） [#57395](https://github.com/nodejs/node/pull/57395)
* \[[`3cff7f80bb`](https://github.com/nodejs/node/commit/3cff7f80bb)] - **src**: 在发生证书错误时建议使用 --use-system-ca（Aditi） [#57362](https://github.com/nodejs/node/pull/57362)
* \[[`3d372ad9f3`](https://github.com/nodejs/node/commit/3d372ad9f3)] - **test**: 将 urlpattern 的 WPT 更新到 6ceca69d26（Node.js GitHub Bot） [#57486](https://github.com/nodejs/node/pull/57486)
* \[[`481ea665af`](https://github.com/nodejs/node/commit/481ea665af)] - **test**: 为 buffer.indexOf 添加更多数字用例（Meghan Denny） [#57200](https://github.com/nodejs/node/pull/57200)
* \[[`27b01ed4e7`](https://github.com/nodejs/node/commit/27b01ed4e7)] - **test**: 针对 OpenSSL 3.5 更新 parallel/test-tls-dhe（Richard Lau） [#57477](https://github.com/nodejs/node/pull/57477)
* \[[`8f7debcf41`](https://github.com/nodejs/node/commit/8f7debcf41)] - **timers**: 通过改进参数处理优化定时器函数（Gürgün Dayıoğlu） [#57072](https://github.com/nodejs/node/pull/57072)
* \[[`d4abd9d3fb`](https://github.com/nodejs/node/commit/d4abd9d3fb)] - **timers**: 移除不必要的 _onTimeout 分配（Gürgün Dayıoğlu） [#57497](https://github.com/nodejs/node/pull/57497)
* \[[`f8f81c8ba2`](https://github.com/nodejs/node/commit/f8f81c8ba2)] - **timers**: 移除 insertGuarded 中未使用的参数（Gürgün Dayıoğlu） [#57251](https://github.com/nodejs/node/pull/57251)
* \[[`c4fdb27b51`](https://github.com/nodejs/node/commit/c4fdb27b51)] - **tls**: 移除 normalize 上不必要的类型检查（Yagiz Nizipli） [#57336](https://github.com/nodejs/node/pull/57336)
* \[[`ad5dcc5798`](https://github.com/nodejs/node/commit/ad5dcc5798)] - **tools**: 修复 WPT 更新 cron 字符串（Antoine du Hamel） [#57665](https://github.com/nodejs/node/pull/57665)
* \[[`7faa482588`](https://github.com/nodejs/node/commit/7faa482588)] - **tools**: 在已恢复的 issue 和 PR 上移除 stalled 标签（Rich Trott） [#57630](https://github.com/nodejs/node/pull/57630)
* \[[`e3bb26da2b`](https://github.com/nodejs/node/commit/e3bb26da2b)] - **tools**: 更新 sccache 以支持 GH 缓存更改（Michaël Zasso） [#57573](https://github.com/nodejs/node/pull/57573)
* \[[`f0c9f505d9`](https://github.com/nodejs/node/commit/f0c9f505d9)] - **tools**: 在 /tools/eslint 中将 @babel/helpers 从 7.26.9 升级到 7.26.10（dependabot\[bot]） [#57444](https://github.com/nodejs/node/pull/57444)
* \[[`a40ff1f646`](https://github.com/nodejs/node/commit/a40ff1f646)] - **url**: 修复 URLPattern 的构造函数错误消息（jakecastelli） [#57482](https://github.com/nodejs/node/pull/57482)
* \[[`f36bee4b89`](https://github.com/nodejs/node/commit/f36bee4b89)] - **util**: 在 enabled 为 false 时避免运行 debug（fengmk2） [#57494](https://github.com/nodejs/node/pull/57494)
* \[[`1b8d1d3a3a`](https://github.com/nodejs/node/commit/1b8d1d3a3a)] - **(SEMVER-MINOR)** **util**: 暴露 assertion 错误使用的 diff 函数（Giovanni Bucci） [#57462](https://github.com/nodejs/node/pull/57462)
* \[[`1f7b08a317`](https://github.com/nodejs/node/commit/1f7b08a317)] - **win,test**: 禁用在 ClangCL 下失败的测试用例（Stefan Stojanovic） [#57397](https://github.com/nodejs/node/pull/57397)

<a id="23.10.0"></a>

## 2025-03-13，版本 23.10.0（当前），@aduh95

### 重要变更

#### 引入 `--experimental-config-file`

随着测试运行器、SEA 以及其他需要大量标志的特性的引入，JSON 配置标志将大大改善开发者体验并提升采用率。

你可以使用一个包含以下内容的 `node.config.json`：

```json
{
  "$schema": "https://nodejs.org/dist/v23.10.0/docs/node-config-schema.json",
  "nodeOptions": {
    "test-coverage-lines": 80,
    "test-coverage-branches": 60
  }
}
```

你可以在不传递配置文件中定义的标志的情况下运行测试。

```bash
node --experimental-default-config-file --test --experimental-test-coverage
```

或者

```bash
node --experimental-config-file=node.config.json --test --experimental-test-coverage
```

Node.js 不会对用户提供的配置进行清理或校验，
因此只应始终使用受信任的配置文件。

由 Marco Ippolito 在 [#57016](https://github.com/nodejs/node/pull/57016)
和 [#57171](https://github.com/nodejs/node/pull/57171) 中贡献。

#### 其他重要变更

* \[[`323e3ac93c`](https://github.com/nodejs/node/commit/323e3ac93c)] - **crypto**: 将根证书更新为 NSS 3.108（Node.js GitHub Bot） [#57381](https://github.com/nodejs/node/pull/57381)
* \[[`6fd2ec6816`](https://github.com/nodejs/node/commit/6fd2ec6816)] - **doc**: 将 `@geeksilva97` 添加到协作者中（Edy Silva） [#57241](https://github.com/nodejs/node/pull/57241)
* \[[`d8937f1742`](https://github.com/nodejs/node/commit/d8937f1742)] - **(SEMVER-MINOR)** **src**: 创建 `THROW_ERR_OPTIONS_BEFORE_BOOTSTRAPPING`（Marco Ippolito） [#57016](https://github.com/nodejs/node/pull/57016)
* \[[`5054fc7941`](https://github.com/nodejs/node/commit/5054fc7941)] - **(SEMVER-MINOR)** **test\_runner**: 更改 ts 默认 glob（Marco Ippolito） [#57359](https://github.com/nodejs/node/pull/57359)
* \[[`75f11ae1cc`](https://github.com/nodejs/node/commit/75f11ae1cc)] - **(SEMVER-MINOR)** **tls**: 实现 `tls.getCACertificates()`（Joyee Cheung） [#57107](https://github.com/nodejs/node/pull/57107)
* \[[`a22c21ceb8`](https://github.com/nodejs/node/commit/a22c21ceb8)] - **(SEMVER-MINOR)** **v8**: 添加 `v8.getCppHeapStatistics()` 方法（Aditi） [#57146](https://github.com/nodejs/node/pull/57146)

### 提交

* \[[`2daee76b26`](https://github.com/nodejs/node/commit/2daee76b26)] - **assert**: 改进 myers diff 性能（Giovanni Bucci） [#57279](https://github.com/nodejs/node/pull/57279)
* \[[`2fbd3bbea7`](https://github.com/nodejs/node/commit/2fbd3bbea7)] - **build**: 修复与 V8 的 `depot_tools` 的兼容性（Richard Lau） [#57330](https://github.com/nodejs/node/pull/57330)
* \[[`6a2e4c5fc1`](https://github.com/nodejs/node/commit/6a2e4c5fc1)] - **build,win**: 在 ccache 下禁用 node pch（Stefan Stojanovic） [#57224](https://github.com/nodejs/node/pull/57224)
* \[[`323e3ac93c`](https://github.com/nodejs/node/commit/323e3ac93c)] - **crypto**: 将根证书更新为 NSS 3.108（Node.js GitHub Bot） [#57381](https://github.com/nodejs/node/pull/57381)
* \[[`906f23d0e7`](https://github.com/nodejs/node/commit/906f23d0e7)] - **crypto**: 在 --use-system-ca 中添加对中间证书的支持（Tim Jacomb） [#57164](https://github.com/nodejs/node/pull/57164)
* \[[`03cd7920c8`](https://github.com/nodejs/node/commit/03cd7920c8)] - **deps**: 将 simdjson 更新到 3.12.2（Node.js GitHub Bot） [#57084](https://github.com/nodejs/node/pull/57084)
* \[[`9e1fce9a5c`](https://github.com/nodejs/node/commit/9e1fce9a5c)] - **deps**: 更新 openssl-3.0.16 的 archs 文件（Node.js GitHub Bot） [#57335](https://github.com/nodejs/node/pull/57335)
* \[[`4056c1f83e`](https://github.com/nodejs/node/commit/4056c1f83e)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.16（Node.js GitHub Bot） [#57335](https://github.com/nodejs/node/pull/57335)
* \[[`b402799070`](https://github.com/nodejs/node/commit/b402799070)] - **deps**: 将 corepack 更新到 0.32.0（Node.js GitHub Bot） [#57265](https://github.com/nodejs/node/pull/57265)
* \[[`ce1cfff79a`](https://github.com/nodejs/node/commit/ce1cfff79a)] - **deps**: 将 amaro 更新到 0.4.1（marco-ippolito） [#57121](https://github.com/nodejs/node/pull/57121)
* \[[`0ac977d679`](https://github.com/nodejs/node/commit/0ac977d679)] - **deps**: 更新 ngtcp2 1.11.0 的 gyp 文件（Richard Lau） [#57225](https://github.com/nodejs/node/pull/57225)
* \[[`f34d78df1f`](https://github.com/nodejs/node/commit/f34d78df1f)] - **deps**: 将 ada 更新到 3.1.3（Node.js GitHub Bot） [#57222](https://github.com/nodejs/node/pull/57222)
* \[[`4fe9916701`](https://github.com/nodejs/node/commit/4fe9916701)] - **dns**: 删除使用公共变量的冗余代码（Deokjin Kim） [#57386](https://github.com/nodejs/node/pull/57386)
* \[[`1c271b162b`](https://github.com/nodejs/node/commit/1c271b162b)] - **doc**: 使 `util.getCallSites` 的第一个参数可选（Deokjin Kim） [#57387](https://github.com/nodejs/node/pull/57387)
* \[[`77668fffec`](https://github.com/nodejs/node/commit/77668fffec)] - **doc**: 修正文档注释中 `module.registerSync` 的用法（Timo Kössler） [#57328](https://github.com/nodejs/node/pull/57328)
* \[[`9b4f7aac69`](https://github.com/nodejs/node/commit/9b4f7aac69)] - **doc**: 将 Darshan 恢复为具有投票权的 TSC 成员（Michael Dawson） [#57402](https://github.com/nodejs/node/pull/57402)
* \[[`d44ccb319c`](https://github.com/nodejs/node/commit/d44ccb319c)] - **doc**: 修订 webcrypto.md 中的类型、接口和新增版本（Filip Skokan） [#57376](https://github.com/nodejs/node/pull/57376)
* \[[`f4de7cef01`](https://github.com/nodejs/node/commit/f4de7cef01)] - **doc**: 添加项目如何管理社交媒体的信息（Michael Dawson） [#57318](https://github.com/nodejs/node/pull/57318)
* \[[`792ef16921`](https://github.com/nodejs/node/commit/792ef16921)] - **doc**: 修订 `tsconfig.json` 说明（Steven） [#57353](https://github.com/nodejs/node/pull/57353)
* \[[`4e438c3fa3`](https://github.com/nodejs/node/commit/4e438c3fa3)] - **doc**: 在 getSystemErrorMessage 的示例中使用更清晰的名称（ikuma-t） [#57310](https://github.com/nodejs/node/pull/57310)
* \[[`5c9f1a40e4`](https://github.com/nodejs/node/commit/5c9f1a40e4)] - **doc**: 建议在 `tsconfig.json` 中设置 `noEmit: true`（Steven） [#57320](https://github.com/nodejs/node/pull/57320)
* \[[`e178acf9d8`](https://github.com/nodejs/node/commit/e178acf9d8)] - **doc**: 为每个安全拉取请求 ping nodejs/tsc（Rafael Gonzaga） [#57309](https://github.com/nodejs/node/pull/57309)
* \[[`fbe464e28c`](https://github.com/nodejs/node/commit/fbe464e28c)] - **doc**: 修正 Windows ccache 部分的位置（Stefan Stojanovic） [#57326](https://github.com/nodejs/node/pull/57326)
* \[[`3fe8eac0ba`](https://github.com/nodejs/node/commit/3fe8eac0ba)] - **doc**: 更新 node-api 版本矩阵（Chengzhong Wu） [#57287](https://github.com/nodejs/node/pull/57287)
* \[[`d2f49e7fcf`](https://github.com/nodejs/node/commit/d2f49e7fcf)] - **doc**: 在 ts 文档中推荐 `erasableSyntaxOnly`（Rob Palmer） [#57271](https://github.com/nodejs/node/pull/57271)
* \[[`03844d99f8`](https://github.com/nodejs/node/commit/03844d99f8)] - **doc**: 澄清 `path.isAbsolute` 并不是路径遍历缓解措施（Eric Fortis） [#57073](https://github.com/nodejs/node/pull/57073)
* \[[`0f8cd32986`](https://github.com/nodejs/node/commit/0f8cd32986)] - **doc**: 修复 DEP0174 描述的渲染问题（David Sanders） [#56835](https://github.com/nodejs/node/pull/56835)
* \[[`f95ecca71f`](https://github.com/nodejs/node/commit/f95ecca71f)] - **doc**: 将 1ilsang 加入 triage 团队（1ilsang） [#57183](https://github.com/nodejs/node/pull/57183)
* \[[`6fd2ec6816`](https://github.com/nodejs/node/commit/6fd2ec6816)] - **doc**: 将 @geeksilva97 添加到协作者中（Edy Silva） [#57241](https://github.com/nodejs/node/pull/57241)
* \[[`b74e0ff7d7`](https://github.com/nodejs/node/commit/b74e0ff7d7)] - **doc**: 补充缺失的 assert 返回类型（Colin Ihrig） [#57219](https://github.com/nodejs/node/pull/57219)
* \[[`83eed33562`](https://github.com/nodejs/node/commit/83eed33562)] - **doc**: 添加 streamResetBurst 和 streamResetRate（Sujal Raj） [#57195](https://github.com/nodejs/node/pull/57195)
* \[[`7f48811295`](https://github.com/nodejs/node/commit/7f48811295)] - **doc**: 向 node:util 添加 esm 示例（Alfredo González） [#56793](https://github.com/nodejs/node/pull/56793)
* \[[`5c20dcc166`](https://github.com/nodejs/node/commit/5c20dcc166)] - **esm**: 修复 CJS 模块上的 module.exports 导出（Guy Bedford） [#57366](https://github.com/nodejs/node/pull/57366)
* \[[`041a217a4d`](https://github.com/nodejs/node/commit/041a217a4d)] - **fs**: 修复 rmSync 错误代码（Paul Schwabauer） [#57103](https://github.com/nodejs/node/pull/57103)
* \[[`cea50b7f39`](https://github.com/nodejs/node/commit/cea50b7f39)] - **lib**: 优化优先队列（Gürgün Dayıoğlu） [#57100](https://github.com/nodejs/node/pull/57100)
* \[[`5204d495ae`](https://github.com/nodejs/node/commit/5204d495ae)] - **meta**: 将 codecov/codecov-action 从 5.3.1 升级到 5.4.0（dependabot[bot]） [#57257](https://github.com/nodejs/node/pull/57257)
* \[[`89599be988`](https://github.com/nodejs/node/commit/89599be988)] - **meta**: 将 github/codeql-action 从 3.28.8 升级到 3.28.10（dependabot[bot]） [#57254](https://github.com/nodejs/node/pull/57254)
* \[[`66cd3850bc`](https://github.com/nodejs/node/commit/66cd3850bc)] - **meta**: 将 ossf/scorecard-action 从 2.4.0 升级到 2.4.1（dependabot[bot]） [#57253](https://github.com/nodejs/node/pull/57253)
* \[[`6c22e446bc`](https://github.com/nodejs/node/commit/6c22e446bc)] - **meta**: 将 nodejs/config 设为代码所有者（Marco Ippolito） [#57237](https://github.com/nodejs/node/pull/57237)
* \[[`ee5ce5ccde`](https://github.com/nodejs/node/commit/ee5ce5ccde)] - **meta**: 将 RaisinTen 恢复为协作者、triagers 和 SEA champion（Darshan Sen） [#57292](https://github.com/nodejs/node/pull/57292)
* \[[`0b0c9cc0f5`](https://github.com/nodejs/node/commit/0b0c9cc0f5)] - **meta**: 将 actions/download-artifact 从 4.1.8 升级到 4.1.9（dependabot[bot]） [#57260](https://github.com/nodejs/node/pull/57260)
* \[[`e6a98af8bd`](https://github.com/nodejs/node/commit/e6a98af8bd)] - **meta**: 将 peter-evans/create-pull-request 从 7.0.6 升级到 7.0.7（dependabot[bot]） [#57259](https://github.com/nodejs/node/pull/57259)
* \[[`91394aaf3d`](https://github.com/nodejs/node/commit/91394aaf3d)] - **meta**: 将 step-security/harden-runner 从 2.10.4 升级到 2.11.0（dependabot[bot]） [#57258](https://github.com/nodejs/node/pull/57258)
* \[[`63dbbe7c91`](https://github.com/nodejs/node/commit/63dbbe7c91)] - **meta**: 将 actions/cache 从 4.2.0 升级到 4.2.2（dependabot[bot]） [#57256](https://github.com/nodejs/node/pull/57256)
* \[[`d5ccf174ad`](https://github.com/nodejs/node/commit/d5ccf174ad)] - **meta**: 将 actions/upload-artifact 从 4.6.0 升级到 4.6.1（dependabot[bot]） [#57255](https://github.com/nodejs/node/pull/57255)
* \[[`46b06be9a3`](https://github.com/nodejs/node/commit/46b06be9a3)] - **module**: 处理 require(esm) 中缓存的已链接异步任务（Joyee Cheung） [#57187](https://github.com/nodejs/node/pull/57187)
* \[[`718305db6f`](https://github.com/nodejs/node/commit/718305db6f)] - **module**: 添加动态的按文件区分的 ESM 警告（Mert Can Altin） [#56628](https://github.com/nodejs/node/pull/56628)
* \[[`4762f4ada5`](https://github.com/nodejs/node/commit/4762f4ada5)] - **net**: 验证 socket.connect 的非字符串 host（Daeyeon Jeong） [#57198](https://github.com/nodejs/node/pull/57198)
* \[[`d07bd79ac5`](https://github.com/nodejs/node/commit/d07bd79ac5)] - **net**: 用身份检查替换品牌检查（Yagiz Nizipli） [#57341](https://github.com/nodejs/node/pull/57341)
* \[[`a757f00747`](https://github.com/nodejs/node/commit/a757f00747)] - **net**: 当自定义查找解析为非字符串地址时发出错误（Edy Silva） [#57192](https://github.com/nodejs/node/pull/57192)
* \[[`984f7ef5bd`](https://github.com/nodejs/node/commit/984f7ef5bd)] - **readline**: 添加对 `Symbol.dispose` 的支持（Antoine du Hamel） [#57276](https://github.com/nodejs/node/pull/57276)
* \[[`21b6423b9b`](https://github.com/nodejs/node/commit/21b6423b9b)] - **sqlite**: 在 run() 中立即重置语句（Colin Ihrig） [#57350](https://github.com/nodejs/node/pull/57350)
* \[[`e80bbb7355`](https://github.com/nodejs/node/commit/e80bbb7355)] - **sqlite,test,doc**: 允许将 Buffer 和 URL 作为数据库位置（Edy Silva） [#56991](https://github.com/nodejs/node/pull/56991)
* \[[`3dc3207298`](https://github.com/nodejs/node/commit/3dc3207298)] - **src**: 不要向 std::string 构造函数传递 nullptr（Charles Kerr） [#57354](https://github.com/nodejs/node/pull/57354)
* \[[`5e51c62569`](https://github.com/nodejs/node/commit/5e51c62569)] - **src**: 修复 process 退出监听器未接收到未完成的 tla 代码（Dario Piotrowicz） [#56872](https://github.com/nodejs/node/pull/56872)
* \[[`bf788d9d86`](https://github.com/nodejs/node/commit/bf788d9d86)] - **src**: 重构 SubtleCrypto 算法和长度校验（Filip Skokan） [#57319](https://github.com/nodejs/node/pull/57319)
* \[[`37664e8485`](https://github.com/nodejs/node/commit/37664e8485)] - **src**: 修复 GN 构建中 node_config_file.h 的编译错误（Cheng） [#57210](https://github.com/nodejs/node/pull/57210)
* \[[`274c18a365`](https://github.com/nodejs/node/commit/274c18a365)] - **(SEMVER-MINOR)** **src**: 将默认配置设为 node.config.json（Marco Ippolito） [#57171](https://github.com/nodejs/node/pull/57171)
* \[[`433657de8c`](https://github.com/nodejs/node/commit/433657de8c)] - **src**: 配置文件标志使用命名空间（Marco Ippolito） [#57170](https://github.com/nodejs/node/pull/57170)
* \[[`d8937f1742`](https://github.com/nodejs/node/commit/d8937f1742)] - **(SEMVER-MINOR)** **src**: 创建 THROW_ERR_OPTIONS_BEFORE_BOOTSTRAPPING（Marco Ippolito） [#57016](https://github.com/nodejs/node/pull/57016)
* \[[`9fd217daa9`](https://github.com/nodejs/node/commit/9fd217daa9)] - **(SEMVER-MINOR)** **src**: 添加配置文件支持（Marco Ippolito） [#57016](https://github.com/nodejs/node/pull/57016)
* \[[`b17163b130`](https://github.com/nodejs/node/commit/b17163b130)] - **src**: 允许嵌入者自定义 OOMErrorHandler（Shelley Vohr） [#57325](https://github.com/nodejs/node/pull/57325)
* \[[`6f1c622466`](https://github.com/nodejs/node/commit/6f1c622466)] - **src**: 在 ProcessEmitWarningSync 中使用 Maybe<void>（Daeyeon Jeong） [#57250](https://github.com/nodejs/node/pull/57250)
* \[[`4d86a42aa4`](https://github.com/nodejs/node/commit/4d86a42aa4)] - **src**: 删除 src/quic 中冗余的限定符（Yagiz Nizipli） [#56967](https://github.com/nodejs/node/pull/56967)
* \[[`41ea5a2864`](https://github.com/nodejs/node/commit/41ea5a2864)] - **src**: 进一步改进错误处理（James M Snell） [#57264](https://github.com/nodejs/node/pull/57264)
* \[[`7a554d9bf3`](https://github.com/nodejs/node/commit/7a554d9bf3)] - **src**: 使用缓存的 `emit` v8::String（Daeyeon Jeong） [#57249](https://github.com/nodejs/node/pull/57249)
* \[[`b10ac9a958`](https://github.com/nodejs/node/commit/b10ac9a958)] - **src**: 重构 SubtleCrypto 算法和长度校验（Filip Skokan） [#57273](https://github.com/nodejs/node/pull/57273)
* \[[`90cd780ca6`](https://github.com/nodejs/node/commit/90cd780ca6)] - **src**: 做出更多错误处理改进（James M Snell） [#57262](https://github.com/nodejs/node/pull/57262)
* \[[`17c9e76722`](https://github.com/nodejs/node/commit/17c9e76722)] - **src**: 修正文档注释中的拼写错误（Antoine du Hamel） [#57291](https://github.com/nodejs/node/pull/57291)
* \[[`35c283a3f3`](https://github.com/nodejs/node/commit/35c283a3f3)] - **src**: 减少 sqlite 中的字符串分配（Yagiz Nizipli） [#57227](https://github.com/nodejs/node/pull/57227)
* \[[`185d1ffe93`](https://github.com/nodejs/node/commit/185d1ffe93)] - **src**: 改进 `node_messaging.cc` 中的错误处理（James M Snell） [#57211](https://github.com/nodejs/node/pull/57211)
* \[[`96b2bfb88c`](https://github.com/nodejs/node/commit/96b2bfb88c)] - **src**: 改进 `tty_wrap.cc` 中的错误处理（James M Snell） [#57211](https://github.com/nodejs/node/pull/57211)
* \[[`f845ad953e`](https://github.com/nodejs/node/commit/f845ad953e)] - **src**: 改进 `tcp_wrap.cc` 中的错误处理（James M Snell） [#57211](https://github.com/nodejs/node/pull/57211)
* \[[`350f62de6c`](https://github.com/nodejs/node/commit/350f62de6c)] - **src**: 修复 PathToFileURL 中的 ThrowInvalidURL 调用（Daniel M Brasil） [#57141](https://github.com/nodejs/node/pull/57141)
* \[[`936a9997b2`](https://github.com/nodejs/node/commit/936a9997b2)] - **src**: 改进 buffer 和 dotenv 中的错误处理（James M Snell） [#57189](https://github.com/nodejs/node/pull/57189)
* \[[`975e2a5c1d`](https://github.com/nodejs/node/commit/975e2a5c1d)] - **src**: 改进 module_wrap 中的错误处理（James M Snell） [#57188](https://github.com/nodejs/node/pull/57188)
* \[[`3d103ecfbe`](https://github.com/nodejs/node/commit/3d103ecfbe)] - **src**: 改进 spawn_sync 中的错误处理（James M Snell） [#57185](https://github.com/nodejs/node/pull/57185)
* \[[`98d328a1d6`](https://github.com/nodejs/node/commit/98d328a1d6)] - **src**: 检测字符串是否为单字节表示形式（theweipeng） [#56147](https://github.com/nodejs/node/pull/56147)
* \[[`15d7908656`](https://github.com/nodejs/node/commit/15d7908656)] - **stream**: 修复 WritableStream 中的 sizeAlgorithm 校验（Daeyeon Jeong） [#57280](https://github.com/nodejs/node/pull/57280)
* \[[`b866755299`](https://github.com/nodejs/node/commit/b866755299)] - **test**: 测试运行器运行计划（Pietro Marchini） [#57304](https://github.com/nodejs/node/pull/57304)
* \[[`e05e0e5772`](https://github.com/nodejs/node/commit/e05e0e5772)] - **test**: 将 urlpattern 的 WPT 更新到 3b6b19853a（Node.js GitHub Bot） [#57377](https://github.com/nodejs/node/pull/57377)
* \[[`36542b5611`](https://github.com/nodejs/node/commit/36542b5611)] - **test**: 将 WebCryptoAPI 的 WPT 更新到 edd42c005c（Node.js GitHub Bot） [#57365](https://github.com/nodejs/node/pull/57365)
* \[[`28792ee59a`](https://github.com/nodejs/node/commit/28792ee59a)] - **test**: 在 quic 下跳过 `test-config-json-schema`（Richard Lau） [#57225](https://github.com/nodejs/node/pull/57225)
* \[[`5a21fa4573`](https://github.com/nodejs/node/commit/5a21fa4573)] - **test**: 增加 node_config_file 的覆盖率（Marco Ippolito） [#57170](https://github.com/nodejs/node/pull/57170)
* \[[`99b2369142`](https://github.com/nodejs/node/commit/99b2369142)] - **test**: 简化 test-tls-connect-abort-controller.js（Yagiz Nizipli） [#57338](https://github.com/nodejs/node/pull/57338)
* \[[`4af2f7f9a8`](https://github.com/nodejs/node/commit/4af2f7f9a8)] - **test**: 在 `test-esm-import-meta` 中使用 `assert.match`（Antoine du Hamel） [#57290](https://github.com/nodejs/node/pull/57290)
* \[[`99abfb6172`](https://github.com/nodejs/node/commit/99abfb6172)] - **test**: 更新 compression wpt（Yagiz Nizipli） [#56960](https://github.com/nodejs/node/pull/56960)
* \[[`f8dde3a391`](https://github.com/nodejs/node/commit/f8dde3a391)] - **test**: 在 IBM i 上跳过 uv-thread-name（Abdirahim Musse） [#57299](https://github.com/nodejs/node/pull/57299)
* \[[`3bf546c317`](https://github.com/nodejs/node/commit/3bf546c317)] - _**Revert**_ "**test**: 临时移除 fs read-write 的资源检查"（Rafael Gonzaga） [#56906](https://github.com/nodejs/node/pull/56906)
* \[[`8d0f1a7dbf`](https://github.com/nodejs/node/commit/8d0f1a7dbf)] - **test**: module 语法应当抛出错误（Marco Ippolito） [#57121](https://github.com/nodejs/node/pull/57121)
* \[[`0fd3d91e3a`](https://github.com/nodejs/node/commit/0fd3d91e3a)] - **test**: 在 net、tls 中更多使用 common.mustNotCall（Meghan Denny） [#57246](https://github.com/nodejs/node/pull/57246)
* \[[`f803d6ca29`](https://github.com/nodejs/node/commit/f803d6ca29)] - **test**: 交换 assert.strictEqual() 参数（Luigi Pinca） [#57217](https://github.com/nodejs/node/pull/57217)
* \[[`eb3576fde0`](https://github.com/nodejs/node/commit/eb3576fde0)] - **test**: 在 buffer-bigint64 中断言写入返回值（Meghan Denny） [#57212](https://github.com/nodejs/node/pull/57212)
* \[[`a08981025a`](https://github.com/nodejs/node/commit/a08981025a)] - **test**: 允许嵌入者运行 async context frame 测试（Shelley Vohr） [#57193](https://github.com/nodejs/node/pull/57193)
* \[[`20c032ed98`](https://github.com/nodejs/node/commit/20c032ed98)] - **test**: 解决 test-net-write-fully-async-* 中的竞态条件（Matteo Collina） [#57022](https://github.com/nodejs/node/pull/57022)
* \[[`5054fc7941`](https://github.com/nodejs/node/commit/5054fc7941)] - **(SEMVER-MINOR)** **test\_runner**: 更改 ts 默认 glob（Marco Ippolito） [#57359](https://github.com/nodejs/node/pull/57359)
* \[[`0ad450f295`](https://github.com/nodejs/node/commit/0ad450f295)] - **timers**: 简化 compareTimersLists 函数（Gürgün Dayıoğlu） [#57110](https://github.com/nodejs/node/pull/57110)
* \[[`75f11ae1cc`](https://github.com/nodejs/node/commit/75f11ae1cc)] - **(SEMVER-MINOR)** **tls**: 实现 tls.getCACertificates()（Joyee Cheung） [#57107](https://github.com/nodejs/node/pull/57107)
* \[[`2b2267f203`](https://github.com/nodejs/node/commit/2b2267f203)] - **tools**: 添加 config 子空间（Marco Ippolito） [#57239](https://github.com/nodejs/node/pull/57239)
* \[[`8e64d38e91`](https://github.com/nodejs/node/commit/8e64d38e91)] - **tools**: 使用 import 而不是 require ESLint 插件（Michaël Zasso） [#57315](https://github.com/nodejs/node/pull/57315)
* \[[`2569e56b95`](https://github.com/nodejs/node/commit/2569e56b95)] - **tools**: 切回使用官方 OpenSSL（Richard Lau） [#57301](https://github.com/nodejs/node/pull/57301)
* \[[`fd49144378`](https://github.com/nodejs/node/commit/fd49144378)] - **tools**: 将 target abseil 提取到 abseil.gyp（Chengzhong Wu） [#57289](https://github.com/nodejs/node/pull/57289)
* \[[`77e1a85d24`](https://github.com/nodejs/node/commit/77e1a85d24)] - **tools**: 恢复使用 @stylistic/eslint-plugin-js v3（Joyee Cheung） [#57314](https://github.com/nodejs/node/pull/57314)
* \[[`2fa6e65262`](https://github.com/nodejs/node/commit/2fa6e65262)] - **tools**: 提供更多关于滚动更新 inspector_protocol 的细节（Chengzhong Wu） [#57167](https://github.com/nodejs/node/pull/57167)
* \[[`5788574cdf`](https://github.com/nodejs/node/commit/5788574cdf)] - **tools**: 在 /tools/eslint 中将 eslint 组升级，包含 5 项更新（dependabot[bot]） [#57261](https://github.com/nodejs/node/pull/57261)
* \[[`5955acadba`](https://github.com/nodejs/node/commit/5955acadba)] - **tools**: 移除 deps/zlib/GN-scraper.py（Chengzhong Wu） [#57238](https://github.com/nodejs/node/pull/57238)
* \[[`a22c21ceb8`](https://github.com/nodejs/node/commit/a22c21ceb8)] - **(SEMVER-MINOR)** **v8**: 添加 v8.getCppHeapStatistics() 方法（Aditi） [#57146](https://github.com/nodejs/node/pull/57146)
* \[[`17d4074114`](https://github.com/nodejs/node/commit/17d4074114)] - **win,build**: 添加启用 Control Flow Guard 的选项（Hüseyin Açacak） [#56605](https://github.com/nodejs/node/pull/56605)

<a id="23.9.0"></a>

## 2025-02-26，版本 23.9.0（当前），@targos

### 重大变更

* \[[`927d985aa0`](https://github.com/nodejs/node/commit/927d985aa0)] - **(SEMVER-MINOR)** **dns**: 添加 TLSA 记录查询和解析 (Rithvik Vibhu) [#52983](https://github.com/nodejs/node/pull/52983)
* \[[`0236fbf75a`](https://github.com/nodejs/node/commit/0236fbf75a)] - **(SEMVER-MINOR)** **process**: 添加 threadCpuUsage (Paolo Insogna) [#56467](https://github.com/nodejs/node/pull/56467)

### 提交

* \[[`f4a82fddb1`](https://github.com/nodejs/node/commit/f4a82fddb1)] - **benchmark**: 在 bench-openSync 中添加预热 (Elves Vieira) [#57051](https://github.com/nodejs/node/pull/57051)
* \[[`b384baa073`](https://github.com/nodejs/node/commit/b384baa073)] - **build**: 为长任务 markdown 格式化打印 'Formatting Markdown...' (1ilsang) [#57108](https://github.com/nodejs/node/pull/57108)
* \[[`fec2d50308`](https://github.com/nodejs/node/commit/fec2d50308)] - **build**: 添加 skip\_apidoc\_files 并包含 QUIC (RafaelGSS) [#56941](https://github.com/nodejs/node/pull/56941)
* \[[`5af35d1850`](https://github.com/nodejs/node/commit/5af35d1850)] - **build**: 修复 GN 构建失败 (Cheng) [#57013](https://github.com/nodejs/node/pull/57013)
* \[[`35f89aa66f`](https://github.com/nodejs/node/commit/35f89aa66f)] - **build**: 修复 uv 的 GN 构建 (Cheng) [#56955](https://github.com/nodejs/node/pull/56955)
* \[[`e26d4841d1`](https://github.com/nodejs/node/commit/e26d4841d1)] - **cli**: 允许在 NODE\_OPTIONS 中使用 --cpu-prof\* (Carlos Espa) [#57018](https://github.com/nodejs/node/pull/57018)
* \[[`b50fc42a99`](https://github.com/nodejs/node/commit/b50fc42a99)] - **crypto**: 支持在非 Windows 和非 macOS 上使用 --use-system-ca (Joyee Cheung) [#57009](https://github.com/nodejs/node/pull/57009)
* \[[`dfdaa92a37`](https://github.com/nodejs/node/commit/dfdaa92a37)] - **crypto**: 修复缺失的 OPENSSL\_NO\_ENGINE 保护 (Shelley Vohr) [#57012](https://github.com/nodejs/node/pull/57012)
* \[[`18ea88bcbe`](https://github.com/nodejs/node/commit/18ea88bcbe)] - **crypto**: 清理根证书并跳过 PEM 反序列化 (Joyee Cheung) [#56999](https://github.com/nodejs/node/pull/56999)
* \[[`8076284f9e`](https://github.com/nodejs/node/commit/8076284f9e)] - **deps**: 将 cjs-module-lexer 更新到 2.1.0 (Node.js GitHub Bot) [#57180](https://github.com/nodejs/node/pull/57180)
* \[[`8644cf3e5a`](https://github.com/nodejs/node/commit/8644cf3e5a)] - **deps**: 将 ngtcp2 更新到 1.11.0 (Node.js GitHub Bot) [#57179](https://github.com/nodejs/node/pull/57179)
* \[[`2aceca15d6`](https://github.com/nodejs/node/commit/2aceca15d6)] - **deps**: 将 sqlite 更新到 3.49.1 (Node.js GitHub Bot) [#57178](https://github.com/nodejs/node/pull/57178)
* \[[`8421021427`](https://github.com/nodejs/node/commit/8421021427)] - **deps**: 将 ada 更新到 3.1.0 (Node.js GitHub Bot) [#57083](https://github.com/nodejs/node/pull/57083)
* \[[`21d795a5f0`](https://github.com/nodejs/node/commit/21d795a5f0)] - **(SEMVER-MINOR)** **dns**: 添加 TLSA 记录查询和解析 (Rithvik Vibhu) [#52983](https://github.com/nodejs/node/pull/52983)
* \[[`455bf5a0a8`](https://github.com/nodejs/node/commit/455bf5a0a8)] - **doc**: 更新 filehandle.appendFile() 的选项 (Hasegawa-Yukihiro) [#56972](https://github.com/nodejs/node/pull/56972)
* \[[`f35bd869ee`](https://github.com/nodejs/node/commit/f35bd869ee)] - **doc**: 为 fs.watch 添加额外注意事项 (Michael Dawson) [#57150](https://github.com/nodejs/node/pull/57150)
* \[[`4413ce7ed3`](https://github.com/nodejs/node/commit/4413ce7ed3)] - **doc**: 修复 Windows 构建说明中的拼写错误 (Tim Jacomb) [#57158](https://github.com/nodejs/node/pull/57158)
* \[[`66614cfcf3`](https://github.com/nodejs/node/commit/66614cfcf3)] - **doc**: 修复 pull-requests.md 中的 web.libera.chat 链接 (Samuel Bronson) [#57076](https://github.com/nodejs/node/pull/57076)
* \[[`587112cb08`](https://github.com/nodejs/node/commit/587112cb08)] - **doc**: 从 performance hooks 示例中移除 buffered 标志 (Pavel Romanov) [#52607](https://github.com/nodejs/node/pull/52607)
* \[[`fdc8aeb8a0`](https://github.com/nodejs/node/commit/fdc8aeb8a0)] - **doc**: 修复 typescript 模块中的 'introduced\_in' 版本 (1ilsang) [#57109](https://github.com/nodejs/node/pull/57109)
* \[[`b6960499c8`](https://github.com/nodejs/node/commit/b6960499c8)] - **doc**: 修复 `SourceMap` 章节的链接和历史记录 (Antoine du Hamel) [#57098](https://github.com/nodejs/node/pull/57098)
* \[[`0de128ca97`](https://github.com/nodejs/node/commit/0de128ca97)] - **doc**: 添加 `module namespace object` 链接 (Dario Piotrowicz) [#57093](https://github.com/nodejs/node/pull/57093)
* \[[`5a74568320`](https://github.com/nodejs/node/commit/5a74568320)] - **doc**: 消歧伪代码语句 (Dario Piotrowicz) [#57092](https://github.com/nodejs/node/pull/57092)
* \[[`46df14ddcb`](https://github.com/nodejs/node/commit/46df14ddcb)] - **doc**: 更新 Windows 构建指南中的 clang-cl (Joyee Cheung) [#57087](https://github.com/nodejs/node/pull/57087)
* \[[`4b02fdc72f`](https://github.com/nodejs/node/commit/4b02fdc72f)] - **doc**: 更新 arm64 和 pkg 使用的 Xcode 版本 (Michaël Zasso) [#57104](https://github.com/nodejs/node/pull/57104)
* \[[`78d4e52a52`](https://github.com/nodejs/node/commit/78d4e52a52)] - **doc**: 修复指代模块时错误使用的冠词 (Dario Piotrowicz) [#57090](https://github.com/nodejs/node/pull/57090)
* \[[`ed5671f1bc`](https://github.com/nodejs/node/commit/ed5671f1bc)] - **doc**: 更新 `module.builtinModules` 相关句子 (Dario Piotrowicz) [#57089](https://github.com/nodejs/node/pull/57089)
* \[[`9de45cbac9`](https://github.com/nodejs/node/commit/9de45cbac9)] - **doc**: `modules.md`: 修复 `distance` 的定义 (Alexander “weej” Jones) [#57046](https://github.com/nodejs/node/pull/57046)
* \[[`a7e5ef9e01`](https://github.com/nodejs/node/commit/a7e5ef9e01)] - **doc**: 修复错误的动词形式 (Dario Piotrowicz) [#57091](https://github.com/nodejs/node/pull/57091)
* \[[`c02494f5fe`](https://github.com/nodejs/node/commit/c02494f5fe)] - **doc**: 修复 transpiler loader hooks 文档 (Joyee Cheung) [#57037](https://github.com/nodejs/node/pull/57037)
* \[[`5b2dfadd40`](https://github.com/nodejs/node/commit/5b2dfadd40)] - **doc**: 在测试文档中添加关于 `require('../common')` 的注释 (Aditi) [#56953](https://github.com/nodejs/node/pull/56953)
* \[[`50ba04e214`](https://github.com/nodejs/node/commit/50ba04e214)] - **doc**: 建议在新文件中编写测试并添加注释 (Joyee Cheung) [#57028](https://github.com/nodejs/node/pull/57028)
* \[[`6951133e1a`](https://github.com/nodejs/node/commit/6951133e1a)] - **doc**: 改进关于参数校验的文档 (Aditi) [#56954](https://github.com/nodejs/node/pull/56954)
* \[[`44dd8a5cc2`](https://github.com/nodejs/node/commit/44dd8a5cc2)] - **doc**: buffer: 修复 `Buffer.copyBytesFrom(` `offset` 选项中的拼写错误 (tpoisseau) [#57015](https://github.com/nodejs/node/pull/57015)
* \[[`c011271a70`](https://github.com/nodejs/node/commit/c011271a70)] - **doc**: 更新 cleanup 以信任 vuln db 自动化 (Rafael Gonzaga) [#57004](https://github.com/nodejs/node/pull/57004)
* \[[`a6b7bce3a0`](https://github.com/nodejs/node/commit/a6b7bce3a0)] - **doc**: 将稳定性索引移至历史部分之后以保持一致性 (Antoine du Hamel) [#56997](https://github.com/nodejs/node/pull/56997)
* \[[`3bc6d626b4`](https://github.com/nodejs/node/commit/3bc6d626b4)] - **doc**: 为 `filehandle.writeFile()` 选项添加 `signal` (Yukihiro Hasegawa) [#56804](https://github.com/nodejs/node/pull/56804)
* \[[`2990cc8616`](https://github.com/nodejs/node/commit/2990cc8616)] - **doc**: 运行 license-builder (github-actions\[bot]) [#56985](https://github.com/nodejs/node/pull/56985)
* \[[`40f3a516bf`](https://github.com/nodejs/node/commit/40f3a516bf)] - **fs**: 在提供 `throwIfNoEntry` 时处理 `fs.statSync` 中的 UV\_ENOTDIR (Juan José Arboleda) [#56996](https://github.com/nodejs/node/pull/56996)
* \[[`e10ef275e8`](https://github.com/nodejs/node/commit/e10ef275e8)] - **inspector**: 将事件参数转换为不含 json 的 protocol (Chengzhong Wu) [#57027](https://github.com/nodejs/node/pull/57027)
* \[[`d6234b4652`](https://github.com/nodejs/node/commit/d6234b4652)] - **inspector**: 在 inspector async hook 中跳过 promise hook (Joyee Cheung) [#57148](https://github.com/nodejs/node/pull/57148)
* \[[`aa817853cd`](https://github.com/nodejs/node/commit/aa817853cd)] - **lib**: 修复更多错误使用的 ERR\_INVALID\_ARG\_VALUE (James M Snell) [#57177](https://github.com/nodejs/node/pull/57177)
* \[[`e08d7d4e53`](https://github.com/nodejs/node/commit/e08d7d4e53)] - **lib**: 修复 assertEncoding 中错误的参数顺序 (James M Snell) [#57177](https://github.com/nodejs/node/pull/57177)
* \[[`f77069b4e0`](https://github.com/nodejs/node/commit/f77069b4e0)] - **meta**: 将 `actions/setup-python` 从 5.3.0 升级到 5.4.0 (dependabot\[bot]) [#56867](https://github.com/nodejs/node/pull/56867)
* \[[`35cdd9b9fe`](https://github.com/nodejs/node/commit/35cdd9b9fe)] - **meta**: 将 `peter-evans/create-pull-request` 从 7.0.5 升级到 7.0.6 (dependabot\[bot]) [#56866](https://github.com/nodejs/node/pull/56866)
* \[[`3d61604f2a`](https://github.com/nodejs/node/commit/3d61604f2a)] - **meta**: 将 `mozilla-actions/sccache-action` 从 0.0.6 升级到 0.0.7 (dependabot\[bot]) [#56865](https://github.com/nodejs/node/pull/56865)
* \[[`0dd0108fc5`](https://github.com/nodejs/node/commit/0dd0108fc5)] - **meta**: 将 `codecov/codecov-action` 从 5.0.7 升级到 5.3.1 (dependabot\[bot]) [#56864](https://github.com/nodejs/node/pull/56864)
* \[[`58d70369e3`](https://github.com/nodejs/node/commit/58d70369e3)] - **meta**: 将 `step-security/harden-runner` 从 2.10.2 升级到 2.10.4 (dependabot\[bot]) [#56863](https://github.com/nodejs/node/pull/56863)
* \[[`dfd42db739`](https://github.com/nodejs/node/commit/dfd42db739)] - **meta**: 将 `actions/cache` 从 4.1.2 升级到 4.2.0 (dependabot\[bot]) [#56862](https://github.com/nodejs/node/pull/56862)
* \[[`7f5f02ba2b`](https://github.com/nodejs/node/commit/7f5f02ba2b)] - **meta**: 将 `actions/stale` 从 9.0.0 升级到 9.1.0 (dependabot\[bot]) [#56860](https://github.com/nodejs/node/pull/56860)
* \[[`85ac02f8d3`](https://github.com/nodejs/node/commit/85ac02f8d3)] - **meta**: 将 `github/codeql-action` 从 3.27.5 升级到 3.28.8 (dependabot\[bot]) [#56859](https://github.com/nodejs/node/pull/56859)
* \[[`d62299b021`](https://github.com/nodejs/node/commit/d62299b021)] - **meta**: 为 SQLite 添加 CODEOWNERS (Colin Ihrig) [#57147](https://github.com/nodejs/node/pull/57147)
* \[[`2ec4ff17a6`](https://github.com/nodejs/node/commit/2ec4ff17a6)] - **meta**: 更新 jkrems 的姓氏 (Jan Martin) [#57006](https://github.com/nodejs/node/pull/57006)
* \[[`ad3c572027`](https://github.com/nodejs/node/commit/ad3c572027)] - **module**: 改进 require(esm) 中因异步性导致的错误消息 (Joyee Cheung) [#57126](https://github.com/nodejs/node/pull/57126)
* \[[`cc1cafd562`](https://github.com/nodejs/node/commit/cc1cafd562)] - **module**: 允许在同步 next hooks 中省略 context (Joyee Cheung) [#57056](https://github.com/nodejs/node/pull/57056)
* \[[`c6ddfa52fb`](https://github.com/nodejs/node/commit/c6ddfa52fb)] - **(SEMVER-MINOR)** **process**: 添加 threadCpuUsage (Paolo Insogna) [#56467](https://github.com/nodejs/node/pull/56467)
* \[[`ac35106625`](https://github.com/nodejs/node/commit/ac35106625)] - **sea**: 使用 disableExperimentalSEAWarning 选项抑制内置警告 (koooge) [#57086](https://github.com/nodejs/node/pull/57086)
* \[[`ef314dc773`](https://github.com/nodejs/node/commit/ef314dc773)] - **src**: 修复在 vm 上下文中调用 lazy getter 时的崩溃 (Chengzhong Wu) [#57168](https://github.com/nodejs/node/pull/57168)
* \[[`90a4de02b6`](https://github.com/nodejs/node/commit/90a4de02b6)] - **src**: 不要为 THROW\_ERR\_\* 格式化单个字符串参数 (Joyee Cheung) [#57126](https://github.com/nodejs/node/pull/57126)
* \[[`e0a91f631b`](https://github.com/nodejs/node/commit/e0a91f631b)] - **src**: 通过默认禁用的编译标志控制所有 quic (James M Snell) [#57142](https://github.com/nodejs/node/pull/57142)
* \[[`7dd326e3a7`](https://github.com/nodejs/node/commit/7dd326e3a7)] - **src**: 在 node\_blob 中移动而非复制 shared pointer (Michaël Zasso) [#57120](https://github.com/nodejs/node/pull/57120)
* \[[`e3127b89a2`](https://github.com/nodejs/node/commit/e3127b89a2)] - **src**: 在适当的地方用 OneByteString 替换 NewFromUtf8 (James M Snell) [#57096](https://github.com/nodejs/node/pull/57096)
* \[[`56f9fe7514`](https://github.com/nodejs/node/commit/56f9fe7514)] - **src**: 将 `defineLazyProperties` 移植到原生代码 (Antoine du Hamel) [#57081](https://github.com/nodejs/node/pull/57081)
* \[[`90875ba0ca`](https://github.com/nodejs/node/commit/90875ba0ca)] - **src**: 改进 node\_blob 中的错误处理 (James M Snell) [#57078](https://github.com/nodejs/node/pull/57078)
* \[[`5414eb48b5`](https://github.com/nodejs/node/commit/5414eb48b5)] - **src**: 改进多个文件中的错误处理 (James M Snell) [#56962](https://github.com/nodejs/node/pull/56962)
* \[[`286bb84188`](https://github.com/nodejs/node/commit/286bb84188)] - **src**: 修复访问空字符串的问题 (Cheng) [#57014](https://github.com/nodejs/node/pull/57014)
* \[[`fa26f83e5b`](https://github.com/nodejs/node/commit/fa26f83e5b)] - **src**: 在 IsolateData 析构函数中正确锁定 isolate (Joyee Cheung) [#57031](https://github.com/nodejs/node/pull/57031)
* \[[`7e2dac9fcc`](https://github.com/nodejs/node/commit/7e2dac9fcc)] - **src**: 添加自赋值 memcpy 检查 (Burkov Egor) [#56986](https://github.com/nodejs/node/pull/56986)
* \[[`d8e70dcaa6`](https://github.com/nodejs/node/commit/d8e70dcaa6)] - **src**: 改进 node::Dotenv 的裁剪处理 (Dario Piotrowicz) [#56983](https://github.com/nodejs/node/pull/56983)
* \[[`41f444fa78`](https://github.com/nodejs/node/commit/41f444fa78)] - **src**: 改进 string\_bytes/decoder 中的错误处理 (James M Snell) [#56978](https://github.com/nodejs/node/pull/56978)
* \[[`d0ee8c0a20`](https://github.com/nodejs/node/commit/d0ee8c0a20)] - **src**: 改进 process\_wrap 中的错误处理 (James M Snell) [#56977](https://github.com/nodejs/node/pull/56977)
* \[[`1a244177a3`](https://github.com/nodejs/node/commit/1a244177a3)] - **test**: 添加 doAppendAndCancel 测试 (Hasegawa-Yukihiro) [#56972](https://github.com/nodejs/node/pull/56972)
* \[[`51dff8b1ae`](https://github.com/nodejs/node/commit/51dff8b1ae)] - **test**: 修复 debug 模式下的 test-without-async-context-frame.mjs (Joyee Cheung) [#57034](https://github.com/nodejs/node/pull/57034)
* \[[`7c7e9f4d84`](https://github.com/nodejs/node/commit/7c7e9f4d84)] - **test**: 使 eval 快照比较更灵活 (Shelley Vohr) [#57020](https://github.com/nodejs/node/pull/57020)
* \[[`315244e59e`](https://github.com/nodejs/node/commit/315244e59e)] - **test**: 简化 test-http2-client-promisify-connect-error (Luigi Pinca) [#57144](https://github.com/nodejs/node/pull/57144)
* \[[`ccf496cff9`](https://github.com/nodejs/node/commit/ccf496cff9)] - **test**: 改进 test-http2-client-promisify-connect-error 的错误输出 (Antoine du Hamel) [#57135](https://github.com/nodejs/node/pull/57135)
* \[[`a588066518`](https://github.com/nodejs/node/commit/a588066518)] - **test**: 为 pjson "exports" 中未识别字段添加用例 (Jacob Smith) [#57026](https://github.com/nodejs/node/pull/57026)
* \[[`b369ad6e45`](https://github.com/nodejs/node/commit/b369ad6e45)] - **test**: 移除测试中不必要的 assert 引入 (Dario Piotrowicz) [#57008](https://github.com/nodejs/node/pull/57008)
* \[[`9b98ac6a81`](https://github.com/nodejs/node/commit/9b98ac6a81)] - **test**: 将 urlpattern 的 WPT 更新到 ef6d83d789 (Node.js GitHub Bot) [#56984](https://github.com/nodejs/node/pull/56984)
* \[[`0a82d27d28`](https://github.com/nodejs/node/commit/0a82d27d28)] - **test**: 减少 test-net-write-fully-async-buffer 的不稳定性 (Yagiz Nizipli) [#56971](https://github.com/nodejs/node/pull/56971)
* \[[`ab150d7781`](https://github.com/nodejs/node/commit/ab150d7781)] - **test**: 移除 macOS 测试中的不稳定性 (Yagiz Nizipli) [#56971](https://github.com/nodejs/node/pull/56971)
* \[[`ccb8c12712`](https://github.com/nodejs/node/commit/ccb8c12712)] - **test,crypto**: 使测试可在 BoringSSL 下工作 (Shelley Vohr) [#57021](https://github.com/nodejs/node/pull/57021)
* \[[`116c1fe84c`](https://github.com/nodejs/node/commit/116c1fe84c)] - **test_runner**: 重构 testPlan 计数器递增 (Pietro Marchini) [#56765](https://github.com/nodejs/node/pull/56765)
* \[[`2929fc6449`](https://github.com/nodejs/node/commit/2929fc6449)] - **test_runner**: 允许在快照键中使用特殊字符 (Carlos Espa) [#57017](https://github.com/nodejs/node/pull/57017)
* \[[`a025d7ba07`](https://github.com/nodejs/node/commit/a025d7ba07)] - **tools**: 也在 GitHub arm64 runners 上运行 Linux 测试 (Dennis Ameling) [#57162](https://github.com/nodejs/node/pull/57162)
* \[[`73a8514305`](https://github.com/nodejs/node/commit/73a8514305)] - **tools**: 统一文档中的 'introduced\_in' 检查 (1ilsang) [#57109](https://github.com/nodejs/node/pull/57109)
* \[[`6cdee545f6`](https://github.com/nodejs/node/commit/6cdee545f6)] - **tools**: 不要在 forks 上运行 major-release 工作流 (Rich Trott) [#57064](https://github.com/nodejs/node/pull/57064)
* \[[`1efd74b1b0`](https://github.com/nodejs/node/commit/1efd74b1b0)] - **tools**: 修复 update-root-certs.mjs 中的发布 URL 计算 (Joyee Cheung) [#56843](https://github.com/nodejs/node/pull/56843)
* \[[`a9112df8d3`](https://github.com/nodejs/node/commit/a9112df8d3)] - **tools**: 在 linter 中添加对 `import source` 语法的支持 (Antoine du Hamel) [#56992](https://github.com/nodejs/node/pull/56992)
* \[[`c6d6be2c3b`](https://github.com/nodejs/node/commit/c6d6be2c3b)] - **typings**: 修复 `ImportModuleDynamicallyCallback` 返回类型 (Chengzhong Wu) [#57160](https://github.com/nodejs/node/pull/57160)
* \[[`d922153cbf`](https://github.com/nodejs/node/commit/d922153cbf)] - **url**: 改进 urlpattern 正则性能 (Yagiz Nizipli) [#57136](https://github.com/nodejs/node/pull/57136)

<a id="23.8.0"></a>

## 2025-02-13，版本 23.8.0（当前），@targos

### 重要变更

#### 支持在 macOS 和 Windows 上使用系统 CA 证书存储

此版本新增了 `--use-system-ca` 命令行标志，它指示 Node.js
将系统存储中的受信任 CA 证书与
`--use-bundled-ca`、`--use-openssl-ca` 选项一起使用。

该选项目前仅适用于 macOS 和 Windows。

由 Tim Jacomb 贡献，见 [#56599](https://github.com/nodejs/node/pull/56599)
以及 Joyee Cheung 贡献，见 [#56833](https://github.com/nodejs/node/pull/56833)。

#### 引入 URL Pattern API

现在已提供 [URL Pattern API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API)
的实现。

`URLPattern` 构造函数从 `node:url` 模块导出，并将在 Node.js 24 中
作为全局对象可用。

由 Yagiz Nizipli 和 Daniel Lemire 贡献，见 [#56452](https://github.com/nodejs/node/pull/56452)。

#### 支持 zstd 压缩算法

Node.js 现在包含对 Zstandard（zstd）压缩算法的支持。
`node:zlib` 模块已添加多种用于 zstd 流压缩和解压缩的 API。

由 Jan Krems 贡献，见 [#52100](https://github.com/nodejs/node/pull/52100)。

#### Node.js 线程名称

Node.js 进程创建的线程现在会被命名，以改善调试体验。
Worker 线程将使用可以传递给 `Worker` 构造函数的 `name` 选项。

由 Rafael Gonzaga 贡献，见 [#56416](https://github.com/nodejs/node/pull/56416)。

#### 时区数据已更新至 2025a

包含的更改：

* 巴拉圭从 2024 年春季开始采用永久 -03。
* 改进菲律宾 1991 年之前的数据。

#### 其他重要变更

* \[[`39997867cf`](https://github.com/nodejs/node/commit/39997867cf)] - **(SEMVER-MINOR)** **sqlite**: 允许从用户定义函数返回 `ArrayBufferView`（René） [#56790](https://github.com/nodejs/node/pull/56790)

### 提交

* \[[`0ee9c34d63`](https://github.com/nodejs/node/commit/0ee9c34d63)] - **benchmark**: 为 URLPattern 添加简单的解析和测试基准（James M Snell） [#56882](https://github.com/nodejs/node/pull/56882)
* \[[`b3f2045d14`](https://github.com/nodejs/node/commit/b3f2045d14)] - **build**: 在 macOS 上通过 gyp 排除 libm 链接（deepak1556） [#56901](https://github.com/nodejs/node/pull/56901)
* \[[`e0dd9aefd6`](https://github.com/nodejs/node/commit/e0dd9aefd6)] - **build**: 移除 macOS 上对 libm 的显式链接调用（deepak1556） [#56901](https://github.com/nodejs/node/pull/56901)
* \[[`52399da780`](https://github.com/nodejs/node/commit/52399da780)] - **build**: 在 GN 构建中链接 Security.framework（Cheng） [#56895](https://github.com/nodejs/node/pull/56895)
* \[[`582b9221c9`](https://github.com/nodejs/node/commit/582b9221c9)] - **build**: 不要把命令放入 sources 变量（Cheng） [#56885](https://github.com/nodejs/node/pull/56885)
* \[[`ea61b956e9`](https://github.com/nodejs/node/commit/ea61b956e9)] - **build**: 为 <(python) 添加双引号（Luigi Pinca） [#56826](https://github.com/nodejs/node/pull/56826)
* \[[`14236ef778`](https://github.com/nodejs/node/commit/14236ef778)] - **build**: 添加构建选项 suppress\_all\_error\_on\_warn（Michael Dawson） [#56647](https://github.com/nodejs/node/pull/56647)
* \[[`dfd3f430f3`](https://github.com/nodejs/node/commit/dfd3f430f3)] - **build,win**: 启用 ccache（Stefan Stojanovic） [#56847](https://github.com/nodejs/node/pull/56847)
* \[[`3e207bd9ec`](https://github.com/nodejs/node/commit/3e207bd9ec)] - **(SEMVER-MINOR)** **crypto**: 支持 Windows 上的 --use-system-ca（Joyee Cheung） [#56833](https://github.com/nodejs/node/pull/56833)
* \[[`fe2694a992`](https://github.com/nodejs/node/commit/fe2694a992)] - **crypto**: 修复 --use-system-ca 中的 X509\* 泄漏（Joyee Cheung） [#56832](https://github.com/nodejs/node/pull/56832)
* \[[`60039a2c36`](https://github.com/nodejs/node/commit/60039a2c36)] - **crypto**: 添加获取 openssl 安全级别的 API（Michael Dawson） [#56601](https://github.com/nodejs/node/pull/56601)
* \[[`39a474f7c0`](https://github.com/nodejs/node/commit/39a474f7c0)] - **(SEMVER-MINOR)** **crypto**: 增加从 macOS 系统存储读取证书的支持（Tim Jacomb） [#56599](https://github.com/nodejs/node/pull/56599)
* \[[`144bee8067`](https://github.com/nodejs/node/commit/144bee8067)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-788cb3c（Node.js GitHub Bot） [#56655](https://github.com/nodejs/node/pull/56655)
* \[[`7fd39e3a79`](https://github.com/nodejs/node/commit/7fd39e3a79)] - **deps**: 将 sqlite 更新到 3.49.0（Node.js GitHub Bot） [#56654](https://github.com/nodejs/node/pull/56654)
* \[[`d698cb5434`](https://github.com/nodejs/node/commit/d698cb5434)] - **deps**: 将 amaro 更新到 0.3.2（marco-ippolito） [#56916](https://github.com/nodejs/node/pull/56916)
* \[[`dbd09067c0`](https://github.com/nodejs/node/commit/dbd09067c0)] - **deps**: V8: 反向挑选 9ab40592f697（Levi Zim） [#56781](https://github.com/nodejs/node/pull/56781)
* \[[`ee33ef3aa6`](https://github.com/nodejs/node/commit/ee33ef3aa6)] - **deps**: 将 cjs-module-lexer 更新到 2.0.0（Michael Dawson） [#56855](https://github.com/nodejs/node/pull/56855)
* \[[`c0542557d0`](https://github.com/nodejs/node/commit/c0542557d0)] - **deps**: 将时区数据更新到 2025a（Node.js GitHub Bot） [#56876](https://github.com/nodejs/node/pull/56876)
* \[[`d67cb1f9bb`](https://github.com/nodejs/node/commit/d67cb1f9bb)] - **deps**: 将 simdjson 更新到 3.12.0（Node.js GitHub Bot） [#56874](https://github.com/nodejs/node/pull/56874)
* \[[`70b04b4314`](https://github.com/nodejs/node/commit/70b04b4314)] - **deps**: 将 googletest 更新到 e235eb3（Node.js GitHub Bot） [#56873](https://github.com/nodejs/node/pull/56873)
* \[[`e11cda003f`](https://github.com/nodejs/node/commit/e11cda003f)] - **(SEMVER-MINOR)** **deps**: 将 ada 更新到 v3.0.1（Yagiz Nizipli） [#56452](https://github.com/nodejs/node/pull/56452)
* \[[`8743ef525d`](https://github.com/nodejs/node/commit/8743ef525d)] - **deps**: 将 simdjson 更新到 3.11.6（Node.js GitHub Bot） [#56250](https://github.com/nodejs/node/pull/56250)
* \[[`0f553e5575`](https://github.com/nodejs/node/commit/0f553e5575)] - **deps**: 将 amaro 更新到 0.3.1（Node.js GitHub Bot） [#56785](https://github.com/nodejs/node/pull/56785)
* \[[`380a8d8d2f`](https://github.com/nodejs/node/commit/380a8d8d2f)] - **(SEMVER-MINOR)** **deps,tools**: 添加 zstd 1.5.6（Jan Krems） [#52100](https://github.com/nodejs/node/pull/52100)
* \[[`66898a7c3b`](https://github.com/nodejs/node/commit/66898a7c3b)] - **doc**: 更新 stream.Readable.toWeb() 的历史记录（Jimmy Leung） [#56928](https://github.com/nodejs/node/pull/56928)
* \[[`9e29416e12`](https://github.com/nodejs/node/commit/9e29416e12)] - **doc**: 使指向全局类的 MDN 链接更一致（Antoine du Hamel） [#56924](https://github.com/nodejs/node/pull/56924)
* \[[`6bc270728a`](https://github.com/nodejs/node/commit/6bc270728a)] - **doc**: 使 `assert.md` 中指向全局类的 MDN 链接更一致（Antoine du Hamel） [#56920](https://github.com/nodejs/node/pull/56920)
* \[[`00da003171`](https://github.com/nodejs/node/commit/00da003171)] - **doc**: 使指向全局类的 MDN 链接更一致（Antoine du Hamel） [#56923](https://github.com/nodejs/node/pull/56923)
* \[[`d90198793a`](https://github.com/nodejs/node/commit/d90198793a)] - **doc**: 使 `util.md` 中指向全局类的 MDN 链接更一致（Antoine du Hamel） [#56922](https://github.com/nodejs/node/pull/56922)
* \[[`5f4377a759`](https://github.com/nodejs/node/commit/5f4377a759)] - **doc**: 使 `buffer.md` 中指向全局类的 MDN 链接更一致（Antoine du Hamel） [#56921](https://github.com/nodejs/node/pull/56921)
* \[[`7353266b50`](https://github.com/nodejs/node/commit/7353266b50)] - **doc**: 改进类型剥离文档（Marco Ippolito） [#56916](https://github.com/nodejs/node/pull/56916)
* \[[`888d2acc3a`](https://github.com/nodejs/node/commit/888d2acc3a)] - **doc**: 明确对可擦除 TS 语法的支持（Marco Ippolito） [#56916](https://github.com/nodejs/node/pull/56916)
* \[[`3c082d43bc`](https://github.com/nodejs/node/commit/3c082d43bc)] - **doc**: 更新安全发布后的流程（Rafael Gonzaga） [#56907](https://github.com/nodejs/node/pull/56907)
* \[[`f0bf35d3c5`](https://github.com/nodejs/node/commit/f0bf35d3c5)] - **doc**: 更新 websocket 链接，避免链接到自身（Chengzhong Wu） [#56897](https://github.com/nodejs/node/pull/56897)
* \[[`373dbb0e6c`](https://github.com/nodejs/node/commit/373dbb0e6c)] - **doc**: 将 `--env-file-if-exists` 标志标记为实验性（Juan José） [#56893](https://github.com/nodejs/node/pull/56893)
* \[[`d436888cc8`](https://github.com/nodejs/node/commit/d436888cc8)] - **doc**: 修复 `util.styleText` 的 cjs 示例中的拼写错误（Deokjin Kim） [#56769](https://github.com/nodejs/node/pull/56769)
* \[[`91638eeb4a`](https://github.com/nodejs/node/commit/91638eeb4a)] - **doc**: 澄清 sqlite 用户定义函数行为（René） [#56786](https://github.com/nodejs/node/pull/56786)
* \[[`bab9c4d331`](https://github.com/nodejs/node/commit/bab9c4d331)] - **events**: `getMaxListeners` 可检测 0 个监听器（Matthew Aitken） [#56807](https://github.com/nodejs/node/pull/56807)
* \[[`ccaf7fe737`](https://github.com/nodejs/node/commit/ccaf7fe737)] - **fs**: 使 `FileHandle.readableWebStream` 始终创建字节流（Ian Kerins） [#55461](https://github.com/nodejs/node/pull/55461)
* \[[`974cec7a0a`](https://github.com/nodejs/node/commit/974cec7a0a)] - **http**: 更加适应分代式 GC（ywave620） [#56767](https://github.com/nodejs/node/pull/56767)
* \[[`be00058712`](https://github.com/nodejs/node/commit/be00058712)] - **inspector**: 在 inspector 协议中添加 Network.Initiator（Chengzhong Wu） [#56805](https://github.com/nodejs/node/pull/56805)
* \[[`31293a4b09`](https://github.com/nodejs/node/commit/31293a4b09)] - **inspector**: 修复 GN 构建（Cheng） [#56798](https://github.com/nodejs/node/pull/56798)
* \[[`91a302356b`](https://github.com/nodejs/node/commit/91a302356b)] - **inspector**: 修复 Unicode 的 StringUtil::CharacterCount（Chengzhong Wu） [#56788](https://github.com/nodejs/node/pull/56788)
* \[[`3b305f25f2`](https://github.com/nodejs/node/commit/3b305f25f2)] - **lib**: 当未使用该标志时，从 builtinModules 中过滤掉 node:quic（James M Snell） [#56870](https://github.com/nodejs/node/pull/56870)
* \[[`f06ee4c54a`](https://github.com/nodejs/node/commit/f06ee4c54a)] - **meta**: 将 `actions/upload-artifact` 从 4.4.3 升级到 4.6.0（dependabot\[bot]） [#56861](https://github.com/nodejs/node/pull/56861)
* \[[`d230bc3b3c`](https://github.com/nodejs/node/commit/d230bc3b3c)] - **meta**: 将 `actions/setup-node` 从 4.1.0 升级到 4.2.0（dependabot\[bot]） [#56868](https://github.com/nodejs/node/pull/56868)
* \[[`d4ecfa745e`](https://github.com/nodejs/node/commit/d4ecfa745e)] - **meta**: 将一位或多位协作者移至 emeritus（Node.js GitHub Bot） [#56889](https://github.com/nodejs/node/pull/56889)
* \[[`698c56bb94`](https://github.com/nodejs/node/commit/698c56bb94)] - **meta**: 添加 @nodejs/url 作为 codeowner（Chengzhong Wu） [#56783](https://github.com/nodejs/node/pull/56783)
* \[[`a274b28857`](https://github.com/nodejs/node/commit/a274b28857)] - **module**: 修复 require.resolve() 在非字符串路径上的崩溃（Aditi） [#56942](https://github.com/nodejs/node/pull/56942)
* \[[`4e3052aeee`](https://github.com/nodejs/node/commit/4e3052aeee)] - **quic**: 修正错误的 LocalVector 使用（James M Snell） [#56564](https://github.com/nodejs/node/pull/56564)
* \[[`dfc61f7bb7`](https://github.com/nodejs/node/commit/dfc61f7bb7)] - **readline**: 修复中止时未解析的 promise（Daniel Venable） [#54030](https://github.com/nodejs/node/pull/54030)
* \[[`9e60501f5e`](https://github.com/nodejs/node/commit/9e60501f5e)] - **sqlite**: 修复与 backup() 相关的 Coverity 警告（Colin Ihrig） [#56961](https://github.com/nodejs/node/pull/56961)
* \[[`1913a4aabc`](https://github.com/nodejs/node/commit/1913a4aabc)] - **sqlite**: 恢复来自 #55373 的更改（Colin Ihrig） [#56908](https://github.com/nodejs/node/pull/56908)
* \[[`8410c955b7`](https://github.com/nodejs/node/commit/8410c955b7)] - **sqlite**: 修复由于过早 GC 导致 StatementSync 中的 use-after-free（Divy Srivastava） [#56840](https://github.com/nodejs/node/pull/56840)
* \[[`01d732d629`](https://github.com/nodejs/node/commit/01d732d629)] - **sqlite**: 处理冲突的 SQLite 和 JS 错误（Colin Ihrig） [#56787](https://github.com/nodejs/node/pull/56787)
* \[[`39997867cf`](https://github.com/nodejs/node/commit/39997867cf)] - **(SEMVER-MINOR)** **sqlite**: 允许从用户定义函数返回 `ArrayBufferView`（René） [#56790](https://github.com/nodejs/node/pull/56790)
* \[[`8dc637681a`](https://github.com/nodejs/node/commit/8dc637681a)] - **sqlite, test**: 暴露 sqlite 在线备份 API（Edy Silva） [#56253](https://github.com/nodejs/node/pull/56253)
* \[[`cfea53eccc`](https://github.com/nodejs/node/commit/cfea53eccc)] - **src**: 在 zlib 中使用 `args.This()`（Michaël Zasso） [#56988](https://github.com/nodejs/node/pull/56988)
* \[[`6b398d6d0b`](https://github.com/nodejs/node/commit/6b398d6d0b)] - **src**: 用内置实现替换 `SplitString`（Yagiz Nizipli） [#54990](https://github.com/nodejs/node/pull/54990)
* \[[`fbb32e0a08`](https://github.com/nodejs/node/commit/fbb32e0a08)] - **src**: 为 `NativeKeyObject` 添加 nullptr 处理（Burkov Egor） [#56900](https://github.com/nodejs/node/pull/56900)
* \[[`83ff7be9fd`](https://github.com/nodejs/node/commit/83ff7be9fd)] - **src**: 禁止复制/移动函数/构造函数（Yagiz Nizipli） [#56811](https://github.com/nodejs/node/pull/56811)
* \[[`63611d0331`](https://github.com/nodejs/node/commit/63611d0331)] - **src**: 添加对 `v8_inspector_headers` 的硬依赖（Chengzhong Wu） [#56805](https://github.com/nodejs/node/pull/56805)
* \[[`3d957d135c`](https://github.com/nodejs/node/commit/3d957d135c)] - **src**: 改进 `encoding_binding.cc` 中的错误处理（James M Snell） [#56915](https://github.com/nodejs/node/pull/56915)
* \[[`9e9ac3ccd8`](https://github.com/nodejs/node/commit/9e9ac3ccd8)] - **src**: 通过使用 `std::views::keys` 避免复制（Yagiz Nizipli） [#56080](https://github.com/nodejs/node/pull/56080)
* \[[`086cdc297a`](https://github.com/nodejs/node/commit/086cdc297a)] - **src**: 移除过时的 `NoArrayBufferZeroFillScope`（James M Snell） [#56913](https://github.com/nodejs/node/pull/56913)
* \[[`915d7aeb37`](https://github.com/nodejs/node/commit/915d7aeb37)] - **src**: 设置 signal inspector io 线程名称（RafaelGSS） [#56416](https://github.com/nodejs/node/pull/56416)
* \[[`f4b086d29d`](https://github.com/nodejs/node/commit/f4b086d29d)] - **src**: 为主线程和 v8 worker 设置线程名称（RafaelGSS） [#56416](https://github.com/nodejs/node/pull/56416)
* \[[`3579143630`](https://github.com/nodejs/node/commit/3579143630)] - **src**: 使用 worker.name 设置 worker 线程名称（RafaelGSS） [#56416](https://github.com/nodejs/node/pull/56416)
* \[[`736ff5de6d`](https://github.com/nodejs/node/commit/736ff5de6d)] - **src**: 为 inspector 使用默认线程名称（RafaelGSS） [#56416](https://github.com/nodejs/node/pull/56416)
* \[[`be8e2b4d8f`](https://github.com/nodejs/node/commit/be8e2b4d8f)] - **src**: 改进 `permission.cc` 中的错误处理（James M Snell） [#56904](https://github.com/nodejs/node/pull/56904)
* \[[`d6cf0911ee`](https://github.com/nodejs/node/commit/d6cf0911ee)] - **src**: 改进 `node_sqlite` 中的错误处理（James M Snell） [#56891](https://github.com/nodejs/node/pull/56891)
* \[[`521fed1bac`](https://github.com/nodejs/node/commit/521fed1bac)] - **src**: 通过移除 ToLocalChecked 改进 `node_os` 中的错误处理（James M Snell） [#56888](https://github.com/nodejs/node/pull/56888)
* \[[`c9a99df8e7`](https://github.com/nodejs/node/commit/c9a99df8e7)] - **src**: 改进 `node_url` 中的错误处理（James M Snell） [#56886](https://github.com/nodejs/node/pull/56886)
* \[[`5c82ef3ace`](https://github.com/nodejs/node/commit/5c82ef3ace)] - **src**: 为外部类型添加内存保留特性（Chengzhong Wu） [#56881](https://github.com/nodejs/node/pull/56881)
* \[[`edb194b2d5`](https://github.com/nodejs/node/commit/edb194b2d5)] - **src**: 防止 URLPattern 属性访问器在 this 非法时崩溃（James M Snell） [#56877](https://github.com/nodejs/node/pull/56877)
* \[[`9624049414`](https://github.com/nodejs/node/commit/9624049414)] - **src**: 引入更多 electron boringssl 调整（James M Snell） [#56858](https://github.com/nodejs/node/pull/56858)
* \[[`f8910e384d`](https://github.com/nodejs/node/commit/f8910e384d)] - **src**: 对 `node_url_pattern` 做出多项改进（James M Snell） [#56871](https://github.com/nodejs/node/pull/56871)
* \[[`94a0237b18`](https://github.com/nodejs/node/commit/94a0237b18)] - **src**: 清理一些过时的 crypto 方法（James M Snell） [#56792](https://github.com/nodejs/node/pull/56792)
* \[[`b240ca67b9`](https://github.com/nodejs/node/commit/b240ca67b9)] - **src**: 为 GroupOrderSize 添加 Bignum 检查（Burkov Egor） [#56702](https://github.com/nodejs/node/pull/56702)
* \[[`45692e9c7c`](https://github.com/nodejs/node/commit/45692e9c7c)] - **src, deps**: 移植 electron 的 boringssl 解决方法（James M Snell） [#56812](https://github.com/nodejs/node/pull/56812)
* \[[`a9d80d43cb`](https://github.com/nodejs/node/commit/a9d80d43cb)] - **(SEMVER-MINOR)** **src, quic**: 进一步完善 quic 实现（James M Snell） [#56328](https://github.com/nodejs/node/pull/56328)
* \[[`93d0beb6c8`](https://github.com/nodejs/node/commit/93d0beb6c8)] - **src,test**: 扩展 urlpattern 的测试覆盖并修复错误（James M Snell） [#56878](https://github.com/nodejs/node/pull/56878)
* \[[`5a9732e1d0`](https://github.com/nodejs/node/commit/5a9732e1d0)] - **test**: 改进调试器事件的超时持续时间（Yagiz Nizipli） [#56970](https://github.com/nodejs/node/pull/56970)
* \[[`60c8fc07ff`](https://github.com/nodejs/node/commit/60c8fc07ff)] - **test**: 移除对 cpuinfo 不必要的系统调用（Yagiz Nizipli） [#56968](https://github.com/nodejs/node/pull/56968)
* \[[`40cdf756e6`](https://github.com/nodejs/node/commit/40cdf756e6)] - **test**: 更新 webstorage wpt（Yagiz Nizipli） [#56963](https://github.com/nodejs/node/pull/56963)
* \[[`de77371a9e`](https://github.com/nodejs/node/commit/de77371a9e)] - **test**: 为 refresh() 直接执行 shell（Yagiz Nizipli） [#55051](https://github.com/nodejs/node/pull/55051)
* \[[`f4254b8e70`](https://github.com/nodejs/node/commit/f4254b8e70)] - **test**: 自动同步 wpt urlpattern 测试（Jonas） [#56949](https://github.com/nodejs/node/pull/56949)
* \[[`a473d3f57a`](https://github.com/nodejs/node/commit/a473d3f57a)] - **test**: 更新 amaro v0.3.2 的快照（Marco Ippolito） [#56916](https://github.com/nodejs/node/pull/56916)
* \[[`abca97f7e2`](https://github.com/nodejs/node/commit/abca97f7e2)] - **test**: 更换 jenkins reporter（Carlos Espa） [#56808](https://github.com/nodejs/node/pull/56808)
* \[[`7c9fa11127`](https://github.com/nodejs/node/commit/7c9fa11127)] - **test**: 修复 test-child-process-bad-stdio 中的竞态条件（Colin Ihrig） [#56845](https://github.com/nodejs/node/pull/56845)
* \[[`b8b6e68836`](https://github.com/nodejs/node/commit/b8b6e68836)] - **(SEMVER-MINOR)** **test**: 为 URLPattern 添加 WPT（Yagiz Nizipli） [#56452](https://github.com/nodejs/node/pull/56452)
* \[[`b6d3d52e20`](https://github.com/nodejs/node/commit/b6d3d52e20)] - **test**: 调整检查以使用 OpenSSL 安全级别（Michael Dawson） [#56819](https://github.com/nodejs/node/pull/56819)
* \[[`3beac87f92`](https://github.com/nodejs/node/commit/3beac87f92)] - **test**: test-crypto-scrypt.js 不需要 internals（Meghan Denny） [#56673](https://github.com/nodejs/node/pull/56673)
* \[[`3af23a10f3`](https://github.com/nodejs/node/commit/3af23a10f3)] - **test**: 将 `test-fs-cp` 标记为 flaky（Stefan Stojanovic） [#56799](https://github.com/nodejs/node/pull/56799)
* \[[`1146f48f67`](https://github.com/nodejs/node/commit/1146f48f67)] - **test**: 搜索 cctest 文件（Chengzhong Wu） [#56791](https://github.com/nodejs/node/pull/56791)
* \[[`86c199b25a`](https://github.com/nodejs/node/commit/86c199b25a)] - **test**: 将 test\_encoding\_binding.cc 转换为 JS 测试（Chengzhong Wu） [#56791](https://github.com/nodejs/node/pull/56791)
* \[[`bd5484717c`](https://github.com/nodejs/node/commit/bd5484717c)] - **test**: test-crypto-prime.js 不需要 internals（Meghan Denny） [#56675](https://github.com/nodejs/node/pull/56675)
* \[[`f5f54414e4`](https://github.com/nodejs/node/commit/f5f54414e4)] - **test**: 临时移除 fs read-write 的资源检查（Rafael Gonzaga） [#56789](https://github.com/nodejs/node/pull/56789)
* \[[`c8bd2ba0ad`](https://github.com/nodejs/node/commit/c8bd2ba0ad)] - **test**: 在 Windows 上将 test-without-async-context-frame 标记为 flaky（James M Snell） [#56753](https://github.com/nodejs/node/pull/56753)
* \[[`2c2e4a4ae0`](https://github.com/nodejs/node/commit/2c2e4a4ae0)] - **test**: 移除不必要的代码（Luigi Pinca） [#56784](https://github.com/nodejs/node/pull/56784)
* \[[`4606a5f79b`](https://github.com/nodejs/node/commit/4606a5f79b)] - **test**: 将 `test-esm-loader-hooks-inspect-wait` 标记为 flaky（Richard Lau） [#56803](https://github.com/nodejs/node/pull/56803)
* \[[`38c77e3462`](https://github.com/nodejs/node/commit/38c77e3462)] - **test**: 将 url 的 WPT 更新到 a23788b77a（Node.js GitHub Bot） [#56779](https://github.com/nodejs/node/pull/56779)
* \[[`50ebd5fd31`](https://github.com/nodejs/node/commit/50ebd5fd31)] - **test**: 移除 ci 中重复的错误 reporter（Carlos Espa） [#56739](https://github.com/nodejs/node/pull/56739)
* \[[`0c3ae25aec`](https://github.com/nodejs/node/commit/0c3ae25aec)] - **test_runner**: 在摘要中打印格式化错误（Pietro Marchini） [#56911](https://github.com/nodejs/node/pull/56911)
* \[[`b5a8a812fb`](https://github.com/nodejs/node/commit/b5a8a812fb)] - **tools**: 升级 eslint 版本（dependabot\[bot]） [#56869](https://github.com/nodejs/node/pull/56869)
* \[[`e1f86c1b9d`](https://github.com/nodejs/node/commit/e1f86c1b9d)] - **tools**: 移除 test-asan/ubsan 工作流（Michaël Zasso） [#56823](https://github.com/nodejs/node/pull/56823)
* \[[`405a6678b7`](https://github.com/nodejs/node/commit/405a6678b7)] - **tools**: 使用 Xcode 16.1 运行 macOS 测试工作流（Michaël Zasso） [#56831](https://github.com/nodejs/node/pull/56831)
* \[[`16529c130f`](https://github.com/nodejs/node/commit/16529c130f)] - **tools**: 更新 sccache 和 sccache-action（Michaël Zasso） [#56815](https://github.com/nodejs/node/pull/56815)
* \[[`fe004111ea`](https://github.com/nodejs/node/commit/fe004111ea)] - **tools**: 修复 inspector_protocol 的 license-builder（Michaël Zasso） [#56814](https://github.com/nodejs/node/pull/56814)
* \[[`bc97a90176`](https://github.com/nodejs/node/commit/bc97a90176)] - **(SEMVER-MINOR)** **url**: 添加 URLPattern 实现（Yagiz Nizipli） [#56452](https://github.com/nodejs/node/pull/56452)
* \[[`77294d8918`](https://github.com/nodejs/node/commit/77294d8918)] - **util**: 在 styleText 数组参数中强制使用 shouldColorize（Marco Ippolito） [#56722](https://github.com/nodejs/node/pull/56722)
* \[[`8e6c191601`](https://github.com/nodejs/node/commit/8e6c191601)] - **zlib**: 为 zstd 类使用现代类语法（Yagiz Nizipli） [#56965](https://github.com/nodejs/node/pull/56965)
* \[[`a3ca7f37a2`](https://github.com/nodejs/node/commit/a3ca7f37a2)] - **zlib**: 将所有 zstd 函数设为实验性（Yagiz Nizipli） [#56964](https://github.com/nodejs/node/pull/56964)
* \[[`4cc7907738`](https://github.com/nodejs/node/commit/4cc7907738)] - **(SEMVER-MINOR)** **zlib**: 添加 zstd 支持（Jan Krems） [#52100](https://github.com/nodejs/node/pull/52100)

<a id="23.7.0"></a>

## 2025-01-30, 版本 23.7.0（当前），@aduh95

### 重要变更

* \[[`36dd9ecc41`](https://github.com/nodejs/node/commit/36dd9ecc41)] - **crypto**: 将根证书更新为 NSS 3.107 (Node.js GitHub Bot) [#56566](https://github.com/nodejs/node/pull/56566)
* \[[`9414d3cbf1`](https://github.com/nodejs/node/commit/9414d3cbf1)] - **(SEMVER-MINOR)** **fs**: 允许 globs 中的 `exclude` 选项接受 glob 模式 (Daeyeon Jeong) [#56489](https://github.com/nodejs/node/pull/56489)
* \[[`9c5c3b3115`](https://github.com/nodejs/node/commit/9c5c3b3115)] - **(SEMVER-MINOR)** **module**: 添加 ERR\_UNSUPPORTED\_TYPESCRIPT\_SYNTAX (Marco Ippolito) [#56610](https://github.com/nodejs/node/pull/56610)
* \[[`1e201fd5fd`](https://github.com/nodejs/node/commit/1e201fd5fd)] - **(SEMVER-MINOR)** **sqlite**: 在 `StatementSync` 中支持 TypedArray 和 DataView (Alex Yang) [#56385](https://github.com/nodejs/node/pull/56385)
* \[[`48c813fb67`](https://github.com/nodejs/node/commit/48c813fb67)] - **(SEMVER-MINOR)** **src**: 添加 --disable-sigusr1 以防止 signal i/o 线程 (Rafael Gonzaga) [#56441](https://github.com/nodejs/node/pull/56441)
* \[[`cf16123785`](https://github.com/nodejs/node/commit/cf16123785)] - **(SEMVER-MINOR)** **src,worker**: 添加 isInternalWorker (Carlos Espa) [#56469](https://github.com/nodejs/node/pull/56469)
* \[[`13bdd9c961`](https://github.com/nodejs/node/commit/13bdd9c961)] - **(SEMVER-MINOR)** **test_runner**: 添加 TestContext.prototype.waitFor() (Colin Ihrig) [#56595](https://github.com/nodejs/node/pull/56595)
* \[[`00a1943858`](https://github.com/nodejs/node/commit/00a1943858)] - **(SEMVER-MINOR)** **test_runner**: 添加 t.assert.fileSnapshot() (Colin Ihrig) [#56459](https://github.com/nodejs/node/pull/56459)
* \[[`3143566045`](https://github.com/nodejs/node/commit/3143566045)] - **(SEMVER-MINOR)** **test_runner**: 添加 assert.register() API (Colin Ihrig) [#56434](https://github.com/nodejs/node/pull/56434)

### 提交

* \[[`334a3ac7c6`](https://github.com/nodejs/node/commit/334a3ac7c6)] - **assert**: 让 myers_diff 函数性能更好 (Giovanni Bucci) [#56303](https://github.com/nodejs/node/pull/56303)
* \[[`eb2bf460b7`](https://github.com/nodejs/node/commit/eb2bf460b7)] - **assert**: 使 partialDeepStrictEqual 可与 url 和 File 原型一起工作 (Giovanni Bucci) [#56231](https://github.com/nodejs/node/pull/56231)
* \[[`d184453b90`](https://github.com/nodejs/node/commit/d184453b90)] - **assert**: 在进行部分比较时显示 diff (Giovanni Bucci) [#56211](https://github.com/nodejs/node/pull/56211)
* \[[`4aa1afd607`](https://github.com/nodejs/node/commit/4aa1afd607)] - **benchmark**: 为 styleText 基准添加 validateStream (Rafael Gonzaga) [#56556](https://github.com/nodejs/node/pull/56556)
* \[[`8bbdb1203e`](https://github.com/nodejs/node/commit/8bbdb1203e)] - **child_process**: 修复解析长度字段被拆分的消息 (Maksim Gorkov) [#56106](https://github.com/nodejs/node/pull/56106)
* \[[`d83d89a08e`](https://github.com/nodejs/node/commit/d83d89a08e)] - **crypto**: 添加缺失的返回值检查 (Michael Dawson) [#56615](https://github.com/nodejs/node/pull/56615)
* \[[`36dd9ecc41`](https://github.com/nodejs/node/commit/36dd9ecc41)] - **crypto**: 将根证书更新为 NSS 3.107 (Node.js GitHub Bot) [#56566](https://github.com/nodejs/node/pull/56566)
* \[[`3915152c36`](https://github.com/nodejs/node/commit/3915152c36)] - **crypto**: 修复大缓冲区下 checkPrime 崩溃的问题 (Santiago Gimeno) [#56559](https://github.com/nodejs/node/pull/56559)
* \[[`c8d1dcb063`](https://github.com/nodejs/node/commit/c8d1dcb063)] - **crypto**: 修复忽略返回值的警告 (Cheng) [#56527](https://github.com/nodejs/node/pull/56527)
* \[[`1994eaaf52`](https://github.com/nodejs/node/commit/1994eaaf52)] - **crypto**: 使 generatePrime/checkPrime 可中断 (James M Snell) [#56460](https://github.com/nodejs/node/pull/56460)
* \[[`5f1ee05390`](https://github.com/nodejs/node/commit/5f1ee05390)] - **deps**: 将 corepack 更新到 0.31.0 (Node.js GitHub Bot) [#56795](https://github.com/nodejs/node/pull/56795)
* \[[`9cfac712b8`](https://github.com/nodejs/node/commit/9cfac712b8)] - **deps**: 将 inspector_protocol 移入 deps (Chengzhong Wu) [#56649](https://github.com/nodejs/node/pull/56649)
* \[[`b2ec816a31`](https://github.com/nodejs/node/commit/b2ec816a31)] - **deps**: libc++ 中的宏 ENODATA 已被弃用 (Cheng) [#56698](https://github.com/nodejs/node/pull/56698)
* \[[`edd9361499`](https://github.com/nodejs/node/commit/edd9361499)] - **deps**: 修复一些较小的 coverity 警告 (James M Snell) [#56612](https://github.com/nodejs/node/pull/56612)
* \[[`9ffe3ad4b1`](https://github.com/nodejs/node/commit/9ffe3ad4b1)] - **deps**: 将 libuv 更新到 1.50.0 (Node.js GitHub Bot) [#56616](https://github.com/nodejs/node/pull/56616)
* \[[`73ad3ca238`](https://github.com/nodejs/node/commit/73ad3ca238)] - **deps**: 将 amaro 更新到 0.3.0 (Node.js GitHub Bot) [#56568](https://github.com/nodejs/node/pull/56568)
* \[[`0657f6270a`](https://github.com/nodejs/node/commit/0657f6270a)] - **deps**: 将 amaro 更新到 0.2.2 (Node.js GitHub Bot) [#56568](https://github.com/nodejs/node/pull/56568)
* \[[`47fad8cbc0`](https://github.com/nodejs/node/commit/47fad8cbc0)] - **deps**: 将 simdutf 更新到 6.0.3 (Node.js GitHub Bot) [#56567](https://github.com/nodejs/node/pull/56567)
* \[[`c9a211ae29`](https://github.com/nodejs/node/commit/c9a211ae29)] - **diagnostics_channel**: 捕获 console 消息 (Stephen Belanger) [#56292](https://github.com/nodejs/node/pull/56292)
* \[[`cf5d2d6598`](https://github.com/nodejs/node/commit/cf5d2d6598)] - **doc**: 将 anatoli 调整为 emeritus (Michael Dawson) [#56592](https://github.com/nodejs/node/pull/56592)
* \[[`5dd08d10be`](https://github.com/nodejs/node/commit/5dd08d10be)] - **doc**: 修复可展开 TOC 的样式 (Antoine du Hamel) [#56755](https://github.com/nodejs/node/pull/56755)
* \[[`09fb3adf80`](https://github.com/nodejs/node/commit/09fb3adf80)] - **doc**: 添加“跳转到内容”按钮 (Antoine du Hamel) [#56750](https://github.com/nodejs/node/pull/56750)
* \[[`ad012ca1f3`](https://github.com/nodejs/node/commit/ad012ca1f3)] - **doc**: 改进可展开列表的可访问性 (Antoine du Hamel) [#56749](https://github.com/nodejs/node/pull/56749)
* \[[`38acdb57eb`](https://github.com/nodejs/node/commit/38acdb57eb)] - **doc**: 添加关于提交消息 trailer 的说明 (Dario Piotrowicz) [#56736](https://github.com/nodejs/node/pull/56736)
* \[[`f4a9b134c0`](https://github.com/nodejs/node/commit/f4a9b134c0)] - **doc**: 修复 util.styleText 示例代码中的拼写错误 (Robin Mehner) [#56720](https://github.com/nodejs/node/pull/56720)
* \[[`8a61aaa734`](https://github.com/nodejs/node/commit/8a61aaa734)] - **doc**: 修复 `WeakSet` 和 `WeakMap` 比较细节中的不一致之处 (Shreyans Pathak) [#56683](https://github.com/nodejs/node/pull/56683)
* \[[`4ade128184`](https://github.com/nodejs/node/commit/4ade128184)] - **doc**: 添加 RafaelGSS 作为最新的安全发布负责人 (Rafael Gonzaga) [#56682](https://github.com/nodejs/node/pull/56682)
* \[[`e1e1200b79`](https://github.com/nodejs/node/commit/e1e1200b79)] - **doc**: 澄清 `queueMicrotask()` 与 `process.nextTick()` 的 cjs/esm 差异 (Dario Piotrowicz) [#56659](https://github.com/nodejs/node/pull/56659)
* \[[`57a7b931fb`](https://github.com/nodejs/node/commit/57a7b931fb)] - **doc**: `WeakSet` 和 `WeakMap` 比较细节 (Shreyans Pathak) [#56648](https://github.com/nodejs/node/pull/56648)
* \[[`56b21489f4`](https://github.com/nodejs/node/commit/56b21489f4)] - **doc**: 提及 prepare --security (Rafael Gonzaga) [#56617](https://github.com/nodejs/node/pull/56617)
* \[[`67f39b597a`](https://github.com/nodejs/node/commit/67f39b597a)] - **doc**: 调整 ambassador 计划中转发内容的信息 (Michael Dawson) [#56589](https://github.com/nodejs/node/pull/56589)
* \[[`6381e0761d`](https://github.com/nodejs/node/commit/6381e0761d)] - **doc**: 为 ambassador 计划添加类型剥离 (Marco Ippolito) [#56598](https://github.com/nodejs/node/pull/56598)
* \[[`9bd438acd3`](https://github.com/nodejs/node/commit/9bd438acd3)] - **doc**: 改进内置快照的内部文档 (Joyee Cheung) [#56505](https://github.com/nodejs/node/pull/56505)
* \[[`f54118c84a`](https://github.com/nodejs/node/commit/f54118c84a)] - **doc**: 更正自定义 hook 类型并澄清说明 (Jacob Smith) [#56454](https://github.com/nodejs/node/pull/56454)
* \[[`6af5053153`](https://github.com/nodejs/node/commit/6af5053153)] - **doc**: 记录通过 CLI 打开 nodejs/bluesky PR 的方法 (Antoine du Hamel) [#56506](https://github.com/nodejs/node/pull/56506)
* \[[`4a77a9e1eb`](https://github.com/nodejs/node/commit/4a77a9e1eb)] - **doc**: 为 Permission Model 添加历史信息 (Antoine du Hamel) [#56707](https://github.com/nodejs/node/pull/56707)
* \[[`097b8b4889`](https://github.com/nodejs/node/commit/097b8b4889)] - **doc**: 为在权限模型下使用 `InternalWorker` 的功能添加说明 (Antoine du Hamel) [#56706](https://github.com/nodejs/node/pull/56706)
* \[[`f600466c73`](https://github.com/nodejs/node/commit/f600466c73)] - **doc**: 添加关于在权限模型下使用 npx 的章节 (Rafael Gonzaga) [#56539](https://github.com/nodejs/node/pull/56539)
* \[[`c2d5a0c629`](https://github.com/nodejs/node/commit/c2d5a0c629)] - **doc**: 更新 ubuntu-lts 的 gcc-version (Kunal Kumar) [#56553](https://github.com/nodejs/node/pull/56553)
* \[[`202af46793`](https://github.com/nodejs/node/commit/202af46793)] - **doc**: 修复选项中的括号 (Tobias Nießen) [#56563](https://github.com/nodejs/node/pull/56563)
* \[[`4e4b0c63d0`](https://github.com/nodejs/node/commit/4e4b0c63d0)] - **doc**: 修复 CLI 文档中 NO_COLOR 的位置 (Colin Ihrig) [#56525](https://github.com/nodejs/node/pull/56525)
* \[[`92eeeb98a5`](https://github.com/nodejs/node/commit/92eeeb98a5)] - **doc**: 将 CVE 到 EOL 的行纳入安全发布流程 (Rafael Gonzaga) [#56520](https://github.com/nodejs/node/pull/56520)
* \[[`233a6a93a1`](https://github.com/nodejs/node/commit/233a6a93a1)] - **doc**: 为 node:trace_events 添加 esm 示例 (Alfredo González) [#56514](https://github.com/nodejs/node/pull/56514)
* \[[`d9cff6c73f`](https://github.com/nodejs/node/commit/d9cff6c73f)] - **doc**: 为 Electron 35 保留 NMV 133 (Keeley Hammond) [#56513](https://github.com/nodejs/node/pull/56513)
* \[[`6047fd7c5c`](https://github.com/nodejs/node/commit/6047fd7c5c)] - **doc**: 为 Ambassador 添加推广文案 (Michael Dawson) [#56235](https://github.com/nodejs/node/pull/56235)
* \[[`a4045c9488`](https://github.com/nodejs/node/commit/a4045c9488)] - **doc**: 允许通过 GitHub UI 请求 TSC 审阅 (Antoine du Hamel) [#56493](https://github.com/nodejs/node/pull/56493)
* \[[`dd3f94873e`](https://github.com/nodejs/node/commit/dd3f94873e)] - **esm**: 修复 esm/loader 中指向 `ModuleJobBase` 的 jsdoc 类型引用 (Jacob Smith) [#56499](https://github.com/nodejs/node/pull/56499)
* \[[`9414d3cbf1`](https://github.com/nodejs/node/commit/9414d3cbf1)] - **(SEMVER-MINOR)** **fs**: 允许 globs 中的 `exclude` 选项接受 glob 模式 (Daeyeon Jeong) [#56489](https://github.com/nodejs/node/pull/56489)
* \[[`4202045673`](https://github.com/nodejs/node/commit/4202045673)] - **http2**: 当 HTTP2 主机是 IP 地址时省略服务器名称 (islandryu) [#56530](https://github.com/nodejs/node/pull/56530)
* \[[`f48a562776`](https://github.com/nodejs/node/commit/f48a562776)] - **inspector**: 滚动更新 inspector_protocol (Chengzhong Wu) [#56649](https://github.com/nodejs/node/pull/56649)
* \[[`9a954fbf4a`](https://github.com/nodejs/node/commit/9a954fbf4a)] - **inspector**: 添加 undici http 跟踪支持 (Chengzhong Wu) [#56488](https://github.com/nodejs/node/pull/56488)
* \[[`f185e8a34a`](https://github.com/nodejs/node/commit/f185e8a34a)] - **inspector**: 在响应数据被消费之前报告 loadingFinished (Chengzhong Wu) [#56372](https://github.com/nodejs/node/pull/56372)
* \[[`2fb007fdce`](https://github.com/nodejs/node/commit/2fb007fdce)] - **lib**: 允许跳过 node_modules 中的 source maps (Chengzhong Wu) [#56639](https://github.com/nodejs/node/pull/56639)
* \[[`2f69dc2659`](https://github.com/nodejs/node/commit/2f69dc2659)] - **meta**: 将一个或多个协作者移至 emeritus (Node.js GitHub Bot) [#56580](https://github.com/nodejs/node/pull/56580)
* \[[`0d869963e0`](https://github.com/nodejs/node/commit/0d869963e0)] - **meta**: 添加安全发布文档的 codeowners (Rafael Gonzaga) [#56521](https://github.com/nodejs/node/pull/56521)
* \[[`59510ab819`](https://github.com/nodejs/node/commit/59510ab819)] - **module**: 修复在 `.` 和 `..` 上使用 option paths 时错误的 `require.resolve` (Dario Piotrowicz) [#56735](https://github.com/nodejs/node/pull/56735)
* \[[`58d2dad67d`](https://github.com/nodejs/node/commit/58d2dad67d)] - **module**: 将 TypeScript 集成到编译缓存中 (Joyee Cheung) [#56629](https://github.com/nodejs/node/pull/56629)
* \[[`9f99a6acb5`](https://github.com/nodejs/node/commit/9f99a6acb5)] - **module**: 在处理 SWC 错误时使用更稳健的代码 (Antoine du Hamel) [#56646](https://github.com/nodejs/node/pull/56646)
* \[[`7347d34053`](https://github.com/nodejs/node/commit/7347d34053)] - **module**: 修复 load sync hook 链中的 URL 变更 (Vitalii Akimov) [#56402](https://github.com/nodejs/node/pull/56402)
* \[[`9c5c3b3115`](https://github.com/nodejs/node/commit/9c5c3b3115)] - **(SEMVER-MINOR)** **module**: 添加 ERR\_UNSUPPORTED\_TYPESCRIPT\_SYNTAX (Marco Ippolito) [#56610](https://github.com/nodejs/node/pull/56610)
* \[[`afd1f91a1e`](https://github.com/nodejs/node/commit/afd1f91a1e)] - **module**: 修复 cjs/loader 中 `format` 参数的 jsdoc (pacexy) [#56501](https://github.com/nodejs/node/pull/56501)
* \[[`86d783fa51`](https://github.com/nodejs/node/commit/86d783fa51)] - **module**: 重新抛出 amaro 错误消息 (Marco Ippolito) [#56568](https://github.com/nodejs/node/pull/56568)
* \[[`7b6df4a97a`](https://github.com/nodejs/node/commit/7b6df4a97a)] - **process**: 修复符号键并将新的 `node:process` 方法标记为实验性 (Antoine du Hamel) [#56517](https://github.com/nodejs/node/pull/56517)
* \[[`21362cc4f4`](https://github.com/nodejs/node/commit/21362cc4f4)] - **punycode**: 限制弃用警告的范围 (Colin Ihrig) [#56632](https://github.com/nodejs/node/pull/56632)
* \[[`93f60a1c15`](https://github.com/nodejs/node/commit/93f60a1c15)] - **sqlite**: 在构建时禁用 memstatus APIs (Colin Ihrig) [#56541](https://github.com/nodejs/node/pull/56541)
* \[[`1e201fd5fd`](https://github.com/nodejs/node/commit/1e201fd5fd)] - **(SEMVER-MINOR)** **sqlite**: 在 `StatementSync` 中支持 TypedArray 和 DataView (Alex Yang) [#56385](https://github.com/nodejs/node/pull/56385)
* \[[`3aca628a11`](https://github.com/nodejs/node/commit/3aca628a11)] - **sqlite**: 启用 SQL 数学函数 (Colin Ihrig) [#56447](https://github.com/nodejs/node/pull/56447)
* \[[`575251ae6a`](https://github.com/nodejs/node/commit/575251ae6a)] - **src**: 为 X509_STORE_new() 添加 nullptr 处理 (Burkov Egor) [#56700](https://github.com/nodejs/node/pull/56700)
* \[[`8fb03d8f43`](https://github.com/nodejs/node/commit/8fb03d8f43)] - **src**: 将更多 crypto 迁移到 ncrypto (James M Snell) [#56653](https://github.com/nodejs/node/pull/56653)
* \[[`55a0135261`](https://github.com/nodejs/node/commit/55a0135261)] - **src**: 为 RSACipherConfig 的 mode 字段添加默认值 (Burkov Egor) [#56701](https://github.com/nodejs/node/pull/56701)
* \[[`83c56da328`](https://github.com/nodejs/node/commit/83c56da328)] - **src**: 修复使用 GCC 15 的构建问题 (tjuhaszrh) [#56740](https://github.com/nodejs/node/pull/56740)
* \[[`872d68d87c`](https://github.com/nodejs/node/commit/872d68d87c)] - **src**: 修复通过 wstring 从 wchar_t 生成路径的问题 (yamachu) [#56696](https://github.com/nodejs/node/pull/56696)
* \[[`2b6a82dcea`](https://github.com/nodejs/node/commit/2b6a82dcea)] - **src**: 用 v8 选项替换 NoArrayBufferZeroFillScope (James M Snell) [#56658](https://github.com/nodejs/node/pull/56658)
* \[[`a5f9023297`](https://github.com/nodejs/node/commit/a5f9023297)] - **src**: 在使用 FSReqWrapSync 的路径中初始化它 (Michaël Zasso) [#56613](https://github.com/nodejs/node/pull/56613)
* \[[`90f70ed8dd`](https://github.com/nodejs/node/commit/90f70ed8dd)] - **src**: 使用 cppgc 管理 ContextifyContext (Joyee Cheung) [#56522](https://github.com/nodejs/node/pull/56522)
* \[[`0b1ac9653e`](https://github.com/nodejs/node/commit/0b1ac9653e)] - **src**: 处理重复授予的路径 (Rafael Gonzaga) [#56591](https://github.com/nodejs/node/pull/56591)
* \[[`33f5345002`](https://github.com/nodejs/node/commit/33f5345002)] - **src**: 更新 ncrypto 中的 ECKeyPointer (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
* \[[`c7b95fcf95`](https://github.com/nodejs/node/commit/c7b95fcf95)] - **src**: 更新 ncrypto 中的 ECPointPointer (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
* \[[`c008b15108`](https://github.com/nodejs/node/commit/c008b15108)] - **src**: 更新 ncrypto 中的 ECGroupPointer (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
* \[[`5673dc7de7`](https://github.com/nodejs/node/commit/5673dc7de7)] - **src**: 更新 ncrypto 中的 ECDASSigPointer 实现 (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
* \[[`87ba48b2c6`](https://github.com/nodejs/node/commit/87ba48b2c6)] - **src**: 清理更多供 ncrypto 使用的 crypto 内部实现 (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
* \[[`48c813fb67`](https://github.com/nodejs/node/commit/48c813fb67)] - **(SEMVER-MINOR)** **src**: 添加 --disable-sigusr1 以防止 signal i/o 线程 (Rafael Gonzaga) [#56441](https://github.com/nodejs/node/pull/56441)
* \[[`50c65eed78`](https://github.com/nodejs/node/commit/50c65eed78)] - **src**: 修复错误来源中未定义的脚本名称 (Chengzhong Wu) [#56502](https://github.com/nodejs/node/pull/56502)
* \[[`b3c66d2493`](https://github.com/nodejs/node/commit/b3c66d2493)] - **src**: 重构 --trace-env，以复用选项选择和处理逻辑 (Joyee Cheung) [#56293](https://github.com/nodejs/node/pull/56293)
* \[[`17d59efe3c`](https://github.com/nodejs/node/commit/17d59efe3c)] - **src**: 对 OneByteString 的使用做一些小清理 (James M Snell) [#56482](https://github.com/nodejs/node/pull/56482)
* \[[`3e6e0106f6`](https://github.com/nodejs/node/commit/3e6e0106f6)] - **src**: 将更多 crypto 实现细节移到 ncrypto 依赖中 (James M Snell) [#56421](https://github.com/nodejs/node/pull/56421)
* \[[`5e1ddd5d4c`](https://github.com/nodejs/node/commit/5e1ddd5d4c)] - **src**: 修复 node_file 中更多 ToLocalChecked 的使用 (James M Snell) [#56484](https://github.com/nodejs/node/pull/56484)
* \[[`aa3fd2f58f`](https://github.com/nodejs/node/commit/aa3fd2f58f)] - **src**: 做一些小的 ToLocalChecked 清理 (James M Snell) [#56483](https://github.com/nodejs/node/pull/56483)
* \[[`7dd8165b0b`](https://github.com/nodejs/node/commit/7dd8165b0b)] - **src**: 在快照构建器中正确加锁线程 (Joyee Cheung) [#56327](https://github.com/nodejs/node/pull/56327)
* \[[`edafab7248`](https://github.com/nodejs/node/commit/edafab7248)] - **src**: 在创建启动快照之前清空平台任务 (Chengzhong Wu) [#56403](https://github.com/nodejs/node/pull/56403)
* \[[`e1887d2c58`](https://github.com/nodejs/node/commit/e1887d2c58)] - **src**: 在更多地方使用 LocalVector (James M Snell) [#56457](https://github.com/nodejs/node/pull/56457)
* \[[`cf16123785`](https://github.com/nodejs/node/commit/cf16123785)] - **(SEMVER-MINOR)** **src,worker**: 添加 isInternalWorker (Carlos Espa) [#56469](https://github.com/nodejs/node/pull/56469)
* \[[`df78515664`](https://github.com/nodejs/node/commit/df78515664)] - **stream**: 修复 ReadableStreamBYOBReader.readIntoRequests 中的拼写错误 (Mattias Buelens) [#56560](https://github.com/nodejs/node/pull/56560)
* \[[`4ff79fb22a`](https://github.com/nodejs/node/commit/4ff79fb22a)] - **test**: 减少写入的 chunk 数量 (Luigi Pinca) [#56757](https://github.com/nodejs/node/pull/56757)
* \[[`2e7b7b7674`](https://github.com/nodejs/node/commit/2e7b7b7674)] - **test**: 修复无效的 common.mustSucceed() 用法 (Luigi Pinca) [#56756](https://github.com/nodejs/node/pull/56756)
* \[[`0af368ce5e`](https://github.com/nodejs/node/commit/0af368ce5e)] - **test**: 在 global setters 测试中使用严格模式 (Rich Trott) [#56742](https://github.com/nodejs/node/pull/56742)
* \[[`e49f3e944c`](https://github.com/nodejs/node/commit/e49f3e944c)] - **test**: 清理并简化 test-crypto-aes-wrap (James M Snell) [#56748](https://github.com/nodejs/node/pull/56748)
* \[[`85f7bbf4e4`](https://github.com/nodejs/node/commit/85f7bbf4e4)] - **test**: 不使用 common.isMainThread (Luigi Pinca) [#56768](https://github.com/nodejs/node/pull/56768)
* \[[`36b02bf1b1`](https://github.com/nodejs/node/commit/36b02bf1b1)] - **test**: 在 common/index 中将一些 require 设为延迟加载 (James M Snell) [#56715](https://github.com/nodejs/node/pull/56715)
* \[[`bcb35c3fb7`](https://github.com/nodejs/node/commit/bcb35c3fb7)] - **test**: 添加一个使用多字节路径并解析模块的测试 (yamachu) [#56696](https://github.com/nodejs/node/pull/56696)
* \[[`917f98b29c`](https://github.com/nodejs/node/commit/917f98b29c)] - **test**: 将更多 `global` 用法替换为 `globalThis` (James M Snell) [#56712](https://github.com/nodejs/node/pull/56712)
* \[[`bf34a49206`](https://github.com/nodejs/node/commit/bf34a49206)] - **test**: 使 common/index 略微不那么 Node.js 特定 (James M Snell) [#56712](https://github.com/nodejs/node/pull/56712)
* \[[`ef2ed71389`](https://github.com/nodejs/node/commit/ef2ed71389)] - **test**: 减少对重复的 common 测试工具的依赖 (James M Snell) [#56712](https://github.com/nodejs/node/pull/56712)
* \[[`e654c8b84a`](https://github.com/nodejs/node/commit/e654c8b84a)] - **test**: 简化 common/index.js (James M Snell) [#56712](https://github.com/nodejs/node/pull/56712)
* \[[`a62345e73b`](https://github.com/nodejs/node/commit/a62345e73b)] - **test**: 将 hasMultiLocalhost 移到 common/net (James M Snell) [#56716](https://github.com/nodejs/node/pull/56716)
* \[[`6edf04ee5e`](https://github.com/nodejs/node/commit/6edf04ee5e)] - **test**: 将与 crypto 相关的 common 工具移到 common/crypto (James M Snell) [#56714](https://github.com/nodejs/node/pull/56714)
* \[[`c7a132229f`](https://github.com/nodejs/node/commit/c7a132229f)] - **test**: 添加 env 文件的缺失测试 (Jonas) [#56642](https://github.com/nodejs/node/pull/56642)
* \[[`2a219eddf6`](https://github.com/nodejs/node/commit/2a219eddf6)] - **test**: 在 test-zlib-const 中强制使用严格模式 (Rich Trott) [#56689](https://github.com/nodejs/node/pull/56689)
* \[[`f885496d9c`](https://github.com/nodejs/node/commit/f885496d9c)] - **test**: 修复 ICU 74.2 的本地化数据 (Antoine du Hamel) [#56661](https://github.com/nodejs/node/pull/56661)
* \[[`eb3148fb5c`](https://github.com/nodejs/node/commit/eb3148fb5c)] - **test**: 使用 --permission 而不是 --experimental-permission (Rafael Gonzaga) [#56685](https://github.com/nodejs/node/pull/56685)
* \[[`86d7ba09c4`](https://github.com/nodejs/node/commit/86d7ba09c4)] - **test**: test-stream-compose.js 不需要 internals (Meghan Denny) [#56619](https://github.com/nodejs/node/pull/56619)
* \[[`676276889e`](https://github.com/nodejs/node/commit/676276889e)] - **test**: 为 gcUntil() 添加 maxCount 和 gcOptions (Joyee Cheung) [#56522](https://github.com/nodejs/node/pull/56522)
* \[[`5b7a012144`](https://github.com/nodejs/node/commit/5b7a012144)] - **test**: 在文件末尾添加换行 (Rafael Gonzaga) [#56588](https://github.com/nodejs/node/pull/56588)
* \[[`27cfec619f`](https://github.com/nodejs/node/commit/27cfec619f)] - **test**: 将 test-worker-prof 标记为在 smartos 上不稳定 (Joyee Cheung) [#56583](https://github.com/nodejs/node/pull/56583)
* \[[`7e58da68c1`](https://github.com/nodejs/node/commit/7e58da68c1)] - **test**: 更新 ts eval 快照 (Marco Ippolito) [#56568](https://github.com/nodejs/node/pull/56568)
* \[[`b1c54439ae`](https://github.com/nodejs/node/commit/b1c54439ae)] - **test**: 将 test-child-process-bad-stdio 更新为使用 node:test (Colin Ihrig) [#56562](https://github.com/nodejs/node/pull/56562)
* \[[`0d772a963e`](https://github.com/nodejs/node/commit/0d772a963e)] - **test**: 禁用与 OpenSSL 3.4.0 不兼容的测试 (Jelle van der Waa) [#56160](https://github.com/nodejs/node/pull/56160)
* \[[`6fa6d699ff`](https://github.com/nodejs/node/commit/6fa6d699ff)] - **test**: 使 test-crypto-hash 兼容 OpenSSL > 3.4.0 (Jelle van der Waa) [#56160](https://github.com/nodejs/node/pull/56160)
* \[[`90e12f2945`](https://github.com/nodejs/node/commit/90e12f2945)] - **test**: 澄清 fork 继承权限标志 (Rafael Gonzaga) [#56523](https://github.com/nodejs/node/pull/56523)
* \[[`323f96f7b3`](https://github.com/nodejs/node/commit/323f96f7b3)] - **test**: 为 node:test 添加仅错误报告器 (Carlos Espa) [#56438](https://github.com/nodejs/node/pull/56438)
* \[[`cbbcaf9108`](https://github.com/nodejs/node/commit/cbbcaf9108)] - **test**: 将 test-http-server-request-timeouts-mixed 标记为不稳定 (Joyee Cheung) [#56503](https://github.com/nodejs/node/pull/56503)
* \[[`295db19ba2`](https://github.com/nodejs/node/commit/295db19ba2)] - **test**: 为 OpenSSL 3.4 更新 tls-psk-circuit 中的错误代码 (sebastianas) [#56420](https://github.com/nodejs/node/pull/56420)
* \[[`f7563780a6`](https://github.com/nodejs/node/commit/f7563780a6)] - **test**: 更新编译后的 sqlite 测试以与其他测试保持一致 (Colin Ihrig) [#56446](https://github.com/nodejs/node/pull/56446)
* \[[`8feb2737e7`](https://github.com/nodejs/node/commit/8feb2737e7)] - **test**: 添加初始 test426 覆盖 (Chengzhong Wu) [#56436](https://github.com/nodejs/node/pull/56436)
* \[[`b9cd7895c0`](https://github.com/nodejs/node/commit/b9cd7895c0)] - **test**: 将 test-set-http-max-http-headers 更新为使用 node:test (Colin Ihrig) [#56439](https://github.com/nodejs/node/pull/56439)
* \[[`332ce548cb`](https://github.com/nodejs/node/commit/332ce548cb)] - **test**: 将 test-child-process-windows-hide 更新为使用 node:test (Colin Ihrig) [#56437](https://github.com/nodejs/node/pull/56437)
* \[[`e2668c0e00`](https://github.com/nodejs/node/commit/e2668c0e00)] - **test_runner**: 在 spec reporter 下只打印一次失败断言 (Pietro Marchini) [#56662](https://github.com/nodejs/node/pull/56662)
* \[[`f97cd5b02b`](https://github.com/nodejs/node/commit/f97cd5b02b)] - **test_runner**: 移除未使用的错误 (Pietro Marchini) [#56607](https://github.com/nodejs/node/pull/56607)
* \[[`13bdd9c961`](https://github.com/nodejs/node/commit/13bdd9c961)] - **(SEMVER-MINOR)** **test_runner**: 添加 TestContext.prototype.waitFor() (Colin Ihrig) [#56595](https://github.com/nodejs/node/pull/56595)
* \[[`00a1943858`](https://github.com/nodejs/node/commit/00a1943858)] - **(SEMVER-MINOR)** **test_runner**: 添加 t.assert.fileSnapshot() (Colin Ihrig) [#56459](https://github.com/nodejs/node/pull/56459)
* \[[`c4979ebfb2`](https://github.com/nodejs/node/commit/c4979ebfb2)] - **test_runner**: 运行单个测试文件基准 (Pietro Marchini) [#56479](https://github.com/nodejs/node/pull/56479)
* \[[`839a06e908`](https://github.com/nodejs/node/commit/839a06e908)] - **test_runner**: 在 enqueue dequeue 事件中区分测试类型 (Eddie Abbondanzio) [#54049](https://github.com/nodejs/node/pull/54049)
* \[[`3143566045`](https://github.com/nodejs/node/commit/3143566045)] - **(SEMVER-MINOR)** **test_runner**: 添加 assert.register() API (Colin Ihrig) [#56434](https://github.com/nodejs/node/pull/56434)
* \[[`3aa864904f`](https://github.com/nodejs/node/commit/3aa864904f)] - **test_runner**: 完成将快照测试标记为稳定 (Colin Ihrig) [#56425](https://github.com/nodejs/node/pull/56425)
* \[[`b7b0768cda`](https://github.com/nodejs/node/commit/b7b0768cda)] - **tls**: 修复 cryptoErrorListToException() 中的错误堆栈转换 (Joyee Cheung) [#56554](https://github.com/nodejs/node/pull/56554)
* \[[`8f59f5ba47`](https://github.com/nodejs/node/commit/8f59f5ba47)] - **tools**: 将文档更新到新版本 (Node.js GitHub Bot) [#56259](https://github.com/nodejs/node/pull/56259)
* \[[`ebf4527730`](https://github.com/nodejs/node/commit/ebf4527730)] - **tools**: 更新 inspector_protocol roller (Chengzhong Wu) [#56649](https://github.com/nodejs/node/pull/56649)
* \[[`649cf0c0f6`](https://github.com/nodejs/node/commit/649cf0c0f6)] - **tools**: 不要在缺少 `create-release-proposal.sh` 时抛出错误 (Antoine du Hamel) [#56704](https://github.com/nodejs/node/pull/56704)
* \[[`69cb44e315`](https://github.com/nodejs/node/commit/69cb44e315)] - **tools**: 修复 tools-deps-update (Daniel Lemire) [#56684](https://github.com/nodejs/node/pull/56684)
* \[[`02f36ca11b`](https://github.com/nodejs/node/commit/02f36ca11b)] - **tools**: 不要在缺少 `create-release-proposal.sh` 时抛出错误 (Antoine du Hamel) [#56695](https://github.com/nodejs/node/pull/56695)
* \[[`bcc1c65066`](https://github.com/nodejs/node/commit/bcc1c65066)] - **tools**: 修复 `lint-release-proposal` 工作流中的权限 (Antoine du Hamel) [#56614](https://github.com/nodejs/node/pull/56614)
* \[[`ab4cfef600`](https://github.com/nodejs/node/commit/ab4cfef600)] - **tools**: 移除 github reporter (Carlos Espa) [#56468](https://github.com/nodejs/node/pull/56468)
* \[[`477e674a2a`](https://github.com/nodejs/node/commit/477e674a2a)] - **tools**: 编辑 `create-release-proposal` 工作流 (Antoine du Hamel) [#56540](https://github.com/nodejs/node/pull/56540)
* \[[`5f6785b1cb`](https://github.com/nodejs/node/commit/5f6785b1cb)] - **tools**: 将提交列表验证作为 `lint-release-commit` 的一部分 (Antoine du Hamel) [#56291](https://github.com/nodejs/node/pull/56291)
* \[[`2a0fbd8731`](https://github.com/nodejs/node/commit/2a0fbd8731)] - **tools**: 修复 loong64 构建失败 (Xiao-Tao) [#56466](https://github.com/nodejs/node/pull/56466)
* \[[`aea088f79e`](https://github.com/nodejs/node/commit/aea088f79e)] - **tools**: 在 Python lint 中禁用不必要的规则忽略 (Rich Trott) [#56429](https://github.com/nodejs/node/pull/56429)
* \[[`7a0dd2d04f`](https://github.com/nodejs/node/commit/7a0dd2d04f)] - **tools**: 为 open dependabot PR 数量使用可配置值 (Antoine du Hamel) [#56427](https://github.com/nodejs/node/pull/56427)
* \[[`c249c9715a`](https://github.com/nodejs/node/commit/c249c9715a)] - **tools**: 在 /tools/eslint 中升级 eslint 组，包含 4 个更新 (dependabot\[bot]) [#56426](https://github.com/nodejs/node/pull/56426)
* \[[`a9d332a16f`](https://github.com/nodejs/node/commit/a9d332a16f)] - **util**: inspect: 不要在包含 Symbol 的 Error 堆栈上崩溃 (Jordan Harband) [#56573](https://github.com/nodejs/node/pull/56573)
* \[[`6a16012fd7`](https://github.com/nodejs/node/commit/6a16012fd7)] - **util**: inspect: 不要在 name 为正则表达式的 Error 上崩溃 (Jordan Harband) [#56574](https://github.com/nodejs/node/pull/56574)
* \[[`c7f16192f4`](https://github.com/nodejs/node/commit/c7f16192f4)] - **util**: 将 CallSite.column 重命名为 columnNumber (Chengzhong Wu) [#56584](https://github.com/nodejs/node/pull/56584)
* \[[`e652781934`](https://github.com/nodejs/node/commit/e652781934)] - **util**: inspect: 不要在检查名称为 `Symbol` 的函数时崩溃 (Jordan Harband) [#56572](https://github.com/nodejs/node/pull/56572)
* \[[`d066acfcf9`](https://github.com/nodejs/node/commit/d066acfcf9)] - **util**: 暴露 CallSite.scriptId (Chengzhong Wu) [#56551](https://github.com/nodejs/node/pull/56551)
* \[[`e1b0f44d19`](https://github.com/nodejs/node/commit/e1b0f44d19)] - **watch**: 为 --env-file-if-exists 重新加载 env 文件 (Jonas) [#56643](https://github.com/nodejs/node/pull/56643)
* \[[`538e19489f`](https://github.com/nodejs/node/commit/538e19489f)] - **worker**: 重构 stdio 以提升性能 (Matteo Collina) [#56630](https://github.com/nodejs/node/pull/56630)
* \[[`aab53e6965`](https://github.com/nodejs/node/commit/aab53e6965)] - **worker**: 在退出时刷新 stdout 和 stderr (Matteo Collina) [#56428](https://github.com/nodejs/node/pull/56428)

<a id="23.6.1"></a>

## 2025-01-21，版本 23.6.1（当前），@RafaelGSS

这是一个安全更新。

### 显著变更

* CVE-2025-23083 - src,loader,permission：在启用权限模型时，对 InternalWorker 的使用抛出错误（高）
* CVE-2025-23085 - src：修复在过早关闭和 ERR\_PROTO 时的 HTTP2 内存泄漏（中）
* CVE-2025-23084 - path：修复 Windows 上 normalize() 中的路径遍历问题（中）

依赖更新：

* CVE-2025-22150 - undici fetch() 中不够随机的值使用问题（中）

### 提交

* \[[`f2ad4d3af8`](https://github.com/nodejs/node/commit/f2ad4d3af8)] - **(CVE-2025-22150)** **deps**：将 undici 更新到 v6.21.1（Matteo Collina）[nodejs-private/node-private#654](https://github.com/nodejs-private/node-private/pull/654)
* \[[`0afc6f9600`](https://github.com/nodejs/node/commit/0afc6f9600)] - **(CVE-2025-23084)** **path**：修复 Windows 上 normalize() 中的路径遍历问题（RafaelGSS）[nodejs-private/node-private#555](https://github.com/nodejs-private/node-private/pull/555)
* \[[`3c7686163e`](https://github.com/nodejs/node/commit/3c7686163e)] - **(CVE-2025-23085)** **src**：修复在过早关闭和 ERR\_PROTO 时的 HTTP2 内存泄漏（RafaelGSS）[nodejs-private/node-private#650](https://github.com/nodejs-private/node-private/pull/650)
* \[[`51938f023a`](https://github.com/nodejs/node/commit/51938f023a)] - **(CVE-2025-23083)** **src,loader,permission**：在使用 InternalWorker 时抛出错误（RafaelGSS）[nodejs-private/node-private#629](https://github.com/nodejs-private/node-private/pull/629)

<a id="23.6.0"></a>

## 2025-01-07，版本 23.6.0（当前），@marco-ippolito

### 显著变更

#### 默认启用 --experimental-strip-types

此版本默认启用 `--experimental-strip-types` 标志。
Node.js 将能够在无需额外配置的情况下执行 TypeScript 文件：

```bash
node file.ts
```

支持的语法存在一些限制，文档见 <https://nodejs.org/api/typescript.html#type-stripping>
此功能仍处于实验阶段，后续可能会更改。

由 Marco Ippolito 在 [#56350](https://github.com/nodejs/node/pull/56350) 中贡献

### 其他显著变更

* \[[`c1023284c3`](https://github.com/nodejs/node/commit/c1023284c3)] - **(SEMVER-MINOR)** **lib**：为 STDIN eval 添加 TypeScript 支持（Marco Ippolito）[#56359](https://github.com/nodejs/node/pull/56359)
* \[[`8dc39e5e2e`](https://github.com/nodejs/node/commit/8dc39e5e2e)] - **(SEMVER-MINOR)** **process**：添加 process.ref() 和 process.unref() 方法（James M Snell）[#56400](https://github.com/nodejs/node/pull/56400)
* \[[`8b20cc212b`](https://github.com/nodejs/node/commit/8b20cc212b)] - **(SEMVER-MINOR)** **worker**：添加 eval ts 输入（Marco Ippolito）[#56394](https://github.com/nodejs/node/pull/56394)

### 提交

* \[[`7b4d288116`](https://github.com/nodejs/node/commit/7b4d288116)] - **assert**：当比较 \[0] 与 \[-0] 时，让 partialDeepStrictEqual 抛出错误（Giovanni）[#56237](https://github.com/nodejs/node/pull/56237)
* \[[`0ec2ed0a0b`](https://github.com/nodejs/node/commit/0ec2ed0a0b)] - **build**：修复 ngtcp2 的 GN 构建（Cheng）[#56300](https://github.com/nodejs/node/pull/56300)
* \[[`ab3e64630b`](https://github.com/nodejs/node/commit/ab3e64630b)] - **build**：在 GitHub Actions 上测试 macos-13（Michaël Zasso）[#56307](https://github.com/nodejs/node/pull/56307)
* \[[`46fb69daca`](https://github.com/nodejs/node/commit/46fb69daca)] - **build**：在 macOS 上使用 -fvisibility=hidden 构建 v8（Joyee Cheung）[#56275](https://github.com/nodejs/node/pull/56275)
* \[[`9d4930b993`](https://github.com/nodejs/node/commit/9d4930b993)] - **deps**：将 simdutf 更新到 5.7.2（Node.js GitHub Bot）[#56388](https://github.com/nodejs/node/pull/56388)
* \[[`6afe36397e`](https://github.com/nodejs/node/commit/6afe36397e)] - **deps**：将 amaro 更新到 0.2.1（Node.js GitHub Bot）[#56390](https://github.com/nodejs/node/pull/56390)
* \[[`195990a0ee`](https://github.com/nodejs/node/commit/195990a0ee)] - **deps**：将 googletest 更新到 7d76a23（Node.js GitHub Bot）[#56387](https://github.com/nodejs/node/pull/56387)
* \[[`b9c0852fc6`](https://github.com/nodejs/node/commit/b9c0852fc6)] - **deps**：将 googletest 更新到 e54519b（Node.js GitHub Bot）[#56370](https://github.com/nodejs/node/pull/56370)
* \[[`eaefd90128`](https://github.com/nodejs/node/commit/eaefd90128)] - **deps**：将 ngtcp2 更新到 1.10.0（Node.js GitHub Bot）[#56334](https://github.com/nodejs/node/pull/56334)
* \[[`06de0c65cf`](https://github.com/nodejs/node/commit/06de0c65cf)] - **deps**：将 simdutf 更新到 5.7.0（Node.js GitHub Bot）[#56332](https://github.com/nodejs/node/pull/56332)
* \[[`03df76cdec`](https://github.com/nodejs/node/commit/03df76cdec)] - **doc**：为管道传输 ReadableStream 添加示例（Gabriel Schulhof）[#56415](https://github.com/nodejs/node/pull/56415)
* \[[`38ce249b07`](https://github.com/nodejs/node/commit/38ce249b07)] - **doc**：扩展 `parseArg` 的 `default` 描述（Kevin Gibbons）[#54431](https://github.com/nodejs/node/pull/54431)
* \[[`ecc718cef2`](https://github.com/nodejs/node/commit/ecc718cef2)] - **doc**：在 `SECURITY.md` 中使用 `<ul>` 代替 `<ol>`（Antoine du Hamel）[#56346](https://github.com/nodejs/node/pull/56346)
* \[[`3db4809130`](https://github.com/nodejs/node/commit/3db4809130)] - **doc**：澄清 WASM 是受信任的（Matteo Collina）[#56345](https://github.com/nodejs/node/pull/56345)
* \[[`384ccbacd5`](https://github.com/nodejs/node/commit/384ccbacd5)] - **doc**：更新各版本发布所用的 macOS 和 Xcode 版本（Michaël Zasso）[#56337](https://github.com/nodejs/node/pull/56337)
* \[[`3943986e88`](https://github.com/nodejs/node/commit/3943986e88)] - **doc**：修复 `crc32` 文档（Kevin Toshihiro Uehara）[#55898](https://github.com/nodejs/node/pull/55898)
* \[[`710b8fc6ed`](https://github.com/nodejs/node/commit/710b8fc6ed)] - **doc**：为 SQLite Session Extension 添加变更日志条目（Bart Louwers）[#56318](https://github.com/nodejs/node/pull/56318)
* \[[`4c978b4d77`](https://github.com/nodejs/node/commit/4c978b4d77)] - **doc**：修复 `module.md` 中的链接（Antoine du Hamel）[#56283](https://github.com/nodejs/node/pull/56283)
* \[[`cdb631efe7`](https://github.com/nodejs/node/commit/cdb631efe7)] - **esm**：为 addon 模块添加实验性支持（Chengzhong Wu）[#55844](https://github.com/nodejs/node/pull/55844)
* \[[`db83d2f0ee`](https://github.com/nodejs/node/commit/db83d2f0ee)] - _**Revert**_ "**events**：为 validate 添加 hasEventListener 工具函数"（origranot）[#56282](https://github.com/nodejs/node/pull/56282)
* \[[`c2baae84ce`](https://github.com/nodejs/node/commit/c2baae84ce)] - **lib**：重构 execution.js（Marco Ippolito）[#56358](https://github.com/nodejs/node/pull/56358)
* \[[`c1023284c3`](https://github.com/nodejs/node/commit/c1023284c3)] - **(SEMVER-MINOR)** **lib**：为 STDIN eval 添加 TypeScript 支持（Marco Ippolito）[#56359](https://github.com/nodejs/node/pull/56359)
* \[[`e4b795ec4a`](https://github.com/nodejs/node/commit/e4b795ec4a)] - **lib**：优化内置帧上的 `prepareStackTrace`（Chengzhong Wu）[#56299](https://github.com/nodejs/node/pull/56299)
* \[[`d1b009b623`](https://github.com/nodejs/node/commit/d1b009b623)] - **lib**：抑制 source map 查找异常（Chengzhong Wu）[#56299](https://github.com/nodejs/node/pull/56299)
* \[[`c2837f0805`](https://github.com/nodejs/node/commit/c2837f0805)] - **meta**：将一位或多位协作者转为名誉成员（Node.js GitHub Bot）[#56342](https://github.com/nodejs/node/pull/56342)
* \[[`72336233f2`](https://github.com/nodejs/node/commit/72336233f2)] - **meta**：将 MoLow 调整为 TSC 正式成员（Moshe Atlow）[#56276](https://github.com/nodejs/node/pull/56276)
* \[[`4f77920a9d`](https://github.com/nodejs/node/commit/4f77920a9d)] - **module**：修复同步 `findPackageJSON` 中的异步解析错误（Jacob Smith）[#56382](https://github.com/nodejs/node/pull/56382)
* \[[`e5ba216501`](https://github.com/nodejs/node/commit/e5ba216501)] - **(SEMVER-MINOR)** **module**：取消对 --experimental-strip-types 的标记（Marco Ippolito）[#56350](https://github.com/nodejs/node/pull/56350)
* \[[`959f133a22`](https://github.com/nodejs/node/commit/959f133a22)] - **module**：支持带 ts 语法检测的 eval（Marco Ippolito）[#56285](https://github.com/nodejs/node/pull/56285)
* \[[`717cfa4fac`](https://github.com/nodejs/node/commit/717cfa4fac)] - **module**：使用 buffer.toString base64（Chengzhong Wu）[#56315](https://github.com/nodejs/node/pull/56315)
* \[[`c2f4d8d688`](https://github.com/nodejs/node/commit/c2f4d8d688)] - **node-api**：定义版本 10（Gabriel Schulhof）[#55676](https://github.com/nodejs/node/pull/55676)
* \[[`417a8ebdec`](https://github.com/nodejs/node/commit/417a8ebdec)] - **node-api**：从 napi\_module\_register 中移除已弃用属性（Vladimir Morozov）[#56162](https://github.com/nodejs/node/pull/56162)
* \[[`8dc39e5e2e`](https://github.com/nodejs/node/commit/8dc39e5e2e)] - **(SEMVER-MINOR)** **process**：添加 process.ref() 和 process.unref() 方法（James M Snell）[#56400](https://github.com/nodejs/node/pull/56400)
* \[[`d194f1ab5f`](https://github.com/nodejs/node/commit/d194f1ab5f)] - **sqlite**：向冲突解决处理程序传递冲突类型（Bart Louwers）[#56352](https://github.com/nodejs/node/pull/56352)
* \[[`29f5d70452`](https://github.com/nodejs/node/commit/29f5d70452)] - **src**：与其他小清理保持一致地使用 v8::LocalVector（James M Snell）[#56417](https://github.com/nodejs/node/pull/56417)
* \[[`2a5543b78e`](https://github.com/nodejs/node/commit/2a5543b78e)] - **src**：在 fs\_permission.cc 中使用 starts\_with（ishabi）[#55811](https://github.com/nodejs/node/pull/55811)
* \[[`3a3f5c9a64`](https://github.com/nodejs/node/commit/3a3f5c9a64)] - **stream**：验证 WritableStream 中未定义的 sizeAlgorithm（Jason Zhang）[#56067](https://github.com/nodejs/node/pull/56067)
* \[[`6e6f6b071a`](https://github.com/nodejs/node/commit/6e6f6b071a)] - **test**：添加 ts eval 快照（Marco Ippolito）[#56358](https://github.com/nodejs/node/pull/56358)
* \[[`8a87e39052`](https://github.com/nodejs/node/commit/8a87e39052)] - **test**：从快照中移除空行（Marco Ippolito）[#56358](https://github.com/nodejs/node/pull/56358)
* \[[`510649f617`](https://github.com/nodejs/node/commit/510649f617)] - **test**：在路径中使用不常见字符以确保测试更健壮（Antoine du Hamel）[#48409](https://github.com/nodejs/node/pull/48409)
* \[[`54f6d681a0`](https://github.com/nodejs/node/commit/54f6d681a0)] - **test**：移除 flaky 标记（Luigi Pinca）[#56369](https://github.com/nodejs/node/pull/56369)
* \[[`20ace0bb01`](https://github.com/nodejs/node/commit/20ace0bb01)] - **test**：移除 test-worker-arraybuffer-zerofill 的 flaky 标记（Luigi Pinca）[#56364](https://github.com/nodejs/node/pull/56364)
* \[[`b757e40525`](https://github.com/nodejs/node/commit/b757e40525)] - **test**：移除 test-net-write-fully-async-hex-string 的 flaky 标记（Luigi Pinca）[#56365](https://github.com/nodejs/node/pull/56365)
* \[[`64556baddc`](https://github.com/nodejs/node/commit/64556baddc)] - **test**：改进 abort signal drop 测试（Edy Silva）[#56339](https://github.com/nodejs/node/pull/56339)
* \[[`accbdad329`](https://github.com/nodejs/node/commit/accbdad329)] - **test**：在 win arm64 上启用 ts 测试（Marco Ippolito）[#56349](https://github.com/nodejs/node/pull/56349)
* \[[`4188ee00d1`](https://github.com/nodejs/node/commit/4188ee00d1)] - **test**：修复 test-watch-file-shared-dependency 的不稳定性（Luigi Pinca）[#56344](https://github.com/nodejs/node/pull/56344)
* \[[`079cee0609`](https://github.com/nodejs/node/commit/079cee0609)] - **test**：当 SQLite 不是由我们构建时跳过 `test-sqlite-extensions`（Antoine du Hamel）[#56341](https://github.com/nodejs/node/pull/56341)
* \[[`96a38044ee`](https://github.com/nodejs/node/commit/96a38044ee)] - **test**：增加 s390 上 eventloop 测试的自旋次数（Michael Dawson）[#56228](https://github.com/nodejs/node/pull/56228)
* \[[`c062ffc242`](https://github.com/nodejs/node/commit/c062ffc242)] - **test**：为 pipeline 添加覆盖率（jakecastelli）[#56278](https://github.com/nodejs/node/pull/56278)
* \[[`d4404f0d0e`](https://github.com/nodejs/node/commit/d4404f0d0e)] - **test**：将 message eval 测试从 Python 迁移到 JS（Yiyun Lei）[#50482](https://github.com/nodejs/node/pull/50482)
* \[[`9369942745`](https://github.com/nodejs/node/commit/9369942745)] - **test**：检查 typescript loader（Marco Ippolito）[#54657](https://github.com/nodejs/node/pull/54657)
* \[[`4930244484`](https://github.com/nodejs/node/commit/4930244484)] - **test**：移除 async-hooks/test-writewrap 的 flaky 标记（Luigi Pinca）[#56048](https://github.com/nodejs/node/pull/56048)
* \[[`7819bfec69`](https://github.com/nodejs/node/commit/7819bfec69)] - **test**：修复 test-esm-loader-hooks-inspect-brk 的不稳定性（Luigi Pinca）[#56050](https://github.com/nodejs/node/pull/56050)
* \[[`e9762bf005`](https://github.com/nodejs/node/commit/e9762bf005)] - **test**：为监听器添加测试用例（origranot）[#56282](https://github.com/nodejs/node/pull/56282)
* \[[`c1627e9d19`](https://github.com/nodejs/node/commit/c1627e9d19)] - **test**：使 `test-permission-sqlite-load-extension` 更健壮（Antoine du Hamel）[#56295](https://github.com/nodejs/node/pull/56295)
* \[[`97d854e1d5`](https://github.com/nodejs/node/commit/97d854e1d5)] - **test_runner,cli**：将测试隔离标记为稳定（Colin Ihrig）[#56298](https://github.com/nodejs/node/pull/56298)
* \[[`a4f336fdd4`](https://github.com/nodejs/node/commit/a4f336fdd4)] - **tools**：修复来自子目录的 `require-common-first` lint 规则（Antoine du Hamel）[#56325](https://github.com/nodejs/node/pull/56325)
* \[[`dc3dafcb50`](https://github.com/nodejs/node/commit/dc3dafcb50)] - **tools**：在打开发布提案时添加发布线路标签（Antoine du Hamel）[#56317](https://github.com/nodejs/node/pull/56317)
* \[[`2a5ac932ac`](https://github.com/nodejs/node/commit/2a5ac932ac)] - **url**：使用已解析路径将 UNC 路径转换为 URL（Antoine du Hamel）[#56302](https://github.com/nodejs/node/pull/56302)
* \[[`8b20cc212b`](https://github.com/nodejs/node/commit/8b20cc212b)] - **(SEMVER-MINOR)** **worker**：添加 eval ts 输入（Marco Ippolito）[#56394](https://github.com/nodejs/node/pull/56394)

<a id="23.5.0"></a>

## 2024-12-19，版本 23.5.0（当前），@aduh95

### 重要变更

#### WebCryptoAPI Ed25519 和 X25519 算法现已稳定

随着 Curve25519 合并进入
[Web Cryptography API Editor's Draft](https://w3c.github.io/webcrypto/)，
`Ed25519` 和 `X25519` 算法标识符现已稳定，使用时将不再
发出 ExperimentalWarning。

由 Filip Skokan 在 [#56142](https://github.com/nodejs/node/pull/56142) 中贡献。

#### 线程内 hooks 回归

此版本引入了 `module.registerHooks()`，用于注册模块加载器自定义 hooks，这些 hooks 会在同一线程中对所有由 `require()`、`import`
以及 `createRequire()` 返回的函数加载的模块运行，这使得它们
更容易迁移给 CJS monkey-patcher。

```mjs
import assert from 'node:assert';
import { registerHooks, createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';

writeFileSync('./bar.js', 'export const id = 123;', 'utf8');

registerHooks({
  resolve(specifier, context, nextResolve) {
    const replaced = specifier.replace('foo', 'bar');
    return nextResolve(replaced, context);
  },
  load(url, context, nextLoad) {
    const result = nextLoad(url, context);
    return {
      ...result,
      source: result.source.toString().replace('123', '456'),
    };
  },
});

// 检查它是否可与 require 一起工作。
const require = createRequire(import.meta.url);
const required = require('./foo.js');  // 由 resolve hook 重定向到 bar.js
assert.strictEqual(required.id, 456);  // 由 load hook 替换为 456

// 检查它是否可与 import 一起工作。
const imported = await import('./foo.js');  // 由 resolve hook 重定向到 bar.js
assert.strictEqual(imported.id, 456);  // 由 load hook 替换为 456
```

这与 `module.register()` hooks 形成互补——新的 hooks 在内部更合适，
并且覆盖了模块图中的所有角落；而 `module.register()` 之前无法在
线程内覆盖 `require()`，而且在移出线程后仍无法覆盖 `createRequire()`。

它们还会在与被加载模块相同的线程，以及注册 hooks 的同一线程中运行，
这意味着它们更容易调试（不再有 `console.log()` 丢失的问题），并且没有
困扰 `module.register()` hooks 的诸多死锁问题。新的 API 还直接接受函数，
因此中间层 loader 包更容易从 hooks 无法感知的文件中获取用户选项，
就像许多现有的 CJS monkey-patcher 所做的那样。

由 Joyee Cheung 在 [#55698](https://github.com/nodejs/node/pull/55698) 中贡献。

#### 其他值得注意的变更

* \[[`59cae91465`](https://github.com/nodejs/node/commit/59cae91465)] - **(SEMVER-MINOR)** **dgram**: 支持 udp 中的 blocklist (theanarkh) [#56087](https://github.com/nodejs/node/pull/56087)
* \[[`72f79b44ed`](https://github.com/nodejs/node/commit/72f79b44ed)] - **doc**: 使 util.styleText 稳定 (Rafael Gonzaga) [#56265](https://github.com/nodejs/node/pull/56265)
* \[[`b5a2c0777d`](https://github.com/nodejs/node/commit/b5a2c0777d)] - **(SEMVER-MINOR)** **module**: 将仅前缀模块添加到 `module.builtinModules` (Jordan Harband) [#56185](https://github.com/nodejs/node/pull/56185)
* \[[`9863d27566`](https://github.com/nodejs/node/commit/9863d27566)] - **(SEMVER-MINOR)** **module**: 仅在 --trace-require-module 下发出 require(esm) 警告 (Joyee Cheung) [#56194](https://github.com/nodejs/node/pull/56194)
* \[[`8e780bc5ae`](https://github.com/nodejs/node/commit/8e780bc5ae)] - **(SEMVER-MINOR)** **module**: 在 import(cjs) 的预解析中使用同步 hooks (Joyee Cheung) [#55698](https://github.com/nodejs/node/pull/55698)
* \[[`65bc8e847f`](https://github.com/nodejs/node/commit/65bc8e847f)] - **(SEMVER-MINOR)** **report**: 修复 report keys 中的拼写错误并提升版本 (Yuan-Ming Hsu) [#56068](https://github.com/nodejs/node/pull/56068)
* \[[`0ab36e1937`](https://github.com/nodejs/node/commit/0ab36e1937)] - **(SEMVER-MINOR)** **sqlite**: 将常量聚合到单个属性中 (Edigleysson Silva (Edy)) [#56213](https://github.com/nodejs/node/pull/56213)
* \[[`efcc5d90c5`](https://github.com/nodejs/node/commit/efcc5d90c5)] - **(SEMVER-MINOR)** **src,lib**: 使权限模型稳定 (Rafael Gonzaga) [#56201](https://github.com/nodejs/node/pull/56201)

### 提交

* \[[`2314e4916e`](https://github.com/nodejs/node/commit/2314e4916e)] - **assert**: 在 partialDeepStrictEqual 中让 Maps 进行部分比较 (Giovanni Bucci) [#56195](https://github.com/nodejs/node/pull/56195)
* \[[`cfbdff7b45`](https://github.com/nodejs/node/commit/cfbdff7b45)] - **assert**: 使 partialDeepStrictEqual 支持 ArrayBuffers (Giovanni Bucci) [#56098](https://github.com/nodejs/node/pull/56098)
* \[[`f264dd6d20`](https://github.com/nodejs/node/commit/f264dd6d20)] - **buffer**: 文档化 concat 的零填充 (Duncan) [#55562](https://github.com/nodejs/node/pull/55562)
* \[[`4831b87d83`](https://github.com/nodejs/node/commit/4831b87d83)] - **build**: 为 loongarch64 上的 'make binary' 正确设置 DESTCPU (吴小白) [#56271](https://github.com/nodejs/node/pull/56271)
* \[[`1497bb405e`](https://github.com/nodejs/node/commit/1497bb405e)] - **build**: 修复 d8 构建中缺失的 fp16 依赖 (Joyee Cheung) [#56266](https://github.com/nodejs/node/pull/56266)
* \[[`445c8c7489`](https://github.com/nodejs/node/commit/445c8c7489)] - **build**: 添加主要发布操作 (Rafael Gonzaga) [#56199](https://github.com/nodejs/node/pull/56199)
* \[[`f4faedfa69`](https://github.com/nodejs/node/commit/f4faedfa69)] - **build**: 修复 `PRODUCT_DIR_ABS` 的 C 字符串编码 (Anna Henningsen) [#56111](https://github.com/nodejs/node/pull/56111)
* \[[`6f49c8006c`](https://github.com/nodejs/node/commit/6f49c8006c)] - **build**: 使用变量表示 simdutf 路径 (Shelley Vohr) [#56196](https://github.com/nodejs/node/pull/56196)
* \[[`fcaa2c82a6`](https://github.com/nodejs/node/commit/fcaa2c82a6)] - **build**: 修复 macOS 上的 GN 构建 (Joyee Cheung) [#56141](https://github.com/nodejs/node/pull/56141)
* \[[`08e5309f4f`](https://github.com/nodejs/node/commit/08e5309f4f)] - _**Revert**_ "**build**: 避免使用 VS v17.12 编译" (Gerhard Stöbich) [#56151](https://github.com/nodejs/node/pull/56151)
* \[[`c2fb38cfdf`](https://github.com/nodejs/node/commit/c2fb38cfdf)] - **crypto**: 将 WebCryptoAPI Ed25519 和 X25519 算法提升为稳定版 (Filip Skokan) [#56142](https://github.com/nodejs/node/pull/56142)
* \[[`8658833884`](https://github.com/nodejs/node/commit/8658833884)] - **deps**: 将 nghttp3 更新到 1.6.0 (Node.js GitHub Bot) [#56258](https://github.com/nodejs/node/pull/56258)
* \[[`7c941d4610`](https://github.com/nodejs/node/commit/7c941d4610)] - **deps**: 将 simdutf 更新到 5.6.4 (Node.js GitHub Bot) [#56255](https://github.com/nodejs/node/pull/56255)
* \[[`4e9113eada`](https://github.com/nodejs/node/commit/4e9113eada)] - **deps**: 将 libuv 更新到 1.49.2 (Luigi Pinca) [#56224](https://github.com/nodejs/node/pull/56224)
* \[[`db6aba12e4`](https://github.com/nodejs/node/commit/db6aba12e4)] - **deps**: 将 c-ares 更新到 v1.34.4 (Node.js GitHub Bot) [#56256](https://github.com/nodejs/node/pull/56256)
* \[[`25bb462bc2`](https://github.com/nodejs/node/commit/25bb462bc2)] - **deps**: 在 Windows 上将 V8_PRESERVE_MOST 定义为 no-op (Stefan Stojanovic) [#56238](https://github.com/nodejs/node/pull/56238)
* \[[`54308c51bb`](https://github.com/nodejs/node/commit/54308c51bb)] - **deps**: 将 sqlite 更新到 3.47.2 (Node.js GitHub Bot) [#56178](https://github.com/nodejs/node/pull/56178)
* \[[`59cae91465`](https://github.com/nodejs/node/commit/59cae91465)] - **(SEMVER-MINOR)** **dgram**: 支持 udp 中的 blocklist (theanarkh) [#56087](https://github.com/nodejs/node/pull/56087)
* \[[`52c18e605e`](https://github.com/nodejs/node/commit/52c18e605e)] - **doc**: 修复浅色模式下的颜色对比问题 (Rich Trott) [#56272](https://github.com/nodejs/node/pull/56272)
* \[[`72f79b44ed`](https://github.com/nodejs/node/commit/72f79b44ed)] - **doc**: 使 util.styleText 稳定 (Rafael Gonzaga) [#56265](https://github.com/nodejs/node/pull/56265)
* \[[`0d08756d0c`](https://github.com/nodejs/node/commit/0d08756d0c)] - **doc**: 澄清 util.aborted 的资源使用 (Kunal Kumar) [#55780](https://github.com/nodejs/node/pull/55780)
* \[[`f94f21080b`](https://github.com/nodejs/node/commit/f94f21080b)] - **doc**: 为 node:repl 添加 esm 示例 (Alfredo González) [#55432](https://github.com/nodejs/node/pull/55432)
* \[[`7a10ef88d9`](https://github.com/nodejs/node/commit/7a10ef88d9)] - **doc**: 为 node:readline 添加 esm 示例 (Alfredo González) [#55335](https://github.com/nodejs/node/pull/55335)
* \[[`cc7a7c391b`](https://github.com/nodejs/node/commit/cc7a7c391b)] - **doc**: 将 'which' 改为 'that' 并添加逗号 (Selveter Senitro) [#56216](https://github.com/nodejs/node/pull/56216)
* \[[`c5b086250e`](https://github.com/nodejs/node/commit/c5b086250e)] - **doc**: 修复 winget 配置路径 (Alex Yang) [#56233](https://github.com/nodejs/node/pull/56233)
* \[[`71c38a24d4`](https://github.com/nodejs/node/commit/71c38a24d4)] - **doc**: 为 node:tls 添加 esm 示例 (Alfredo González) [#56229](https://github.com/nodejs/node/pull/56229)
* \[[`394fffbbde`](https://github.com/nodejs/node/commit/394fffbbde)] - **doc**: 为 node:perf_hooks 添加 esm 示例 (Alfredo González) [#55257](https://github.com/nodejs/node/pull/55257)
* \[[`7b2a6ee61e`](https://github.com/nodejs/node/commit/7b2a6ee61e)] - **doc**: `sea.getRawAsset(key)` 总是返回 ArrayBuffer (沈鸿飞) [#56206](https://github.com/nodejs/node/pull/56206)
* \[[`8092dcf27e`](https://github.com/nodejs/node/commit/8092dcf27e)] - **doc**: 更新发布的公告文档 (Rafael Gonzaga) [#56200](https://github.com/nodejs/node/pull/56200)
* \[[`2974667815`](https://github.com/nodejs/node/commit/2974667815)] - **doc**: 将博客链接更新为 /vulnerability (Rafael Gonzaga) [#56198](https://github.com/nodejs/node/pull/56198)
* \[[`f3b3ff85e0`](https://github.com/nodejs/node/commit/f3b3ff85e0)] - **doc**: 指出 import.meta 仅支持于 ES 模块中 (Anton Kastritskii) [#56186](https://github.com/nodejs/node/pull/56186)
* \[[`a9e67280e7`](https://github.com/nodejs/node/commit/a9e67280e7)] - **doc**: 添加大使信息 - Node.js 的优势 (Michael Dawson) [#56085](https://github.com/nodejs/node/pull/56085)
* \[[`e4922ab15f`](https://github.com/nodejs/node/commit/e4922ab15f)] - **doc**: 修复错误的样式指南链接 (Yuan-Ming Hsu) [#56181](https://github.com/nodejs/node/pull/56181)
* \[[`114a3e5a05`](https://github.com/nodejs/node/commit/114a3e5a05)] - **doc**: 修复 c++ addon hello world 示例 (Edigleysson Silva (Edy)) [#56172](https://github.com/nodejs/node/pull/56172)
* \[[`f1c2d2f65e`](https://github.com/nodejs/node/commit/f1c2d2f65e)] - **doc**: 更新博客 release-post 链接 (Ruy Adorno) [#56123](https://github.com/nodejs/node/pull/56123)
* \[[`d48b5224c0`](https://github.com/nodejs/node/commit/d48b5224c0)] - **doc**: 修复 module.md 标题 (Chengzhong Wu) [#56131](https://github.com/nodejs/node/pull/56131)
* \[[`4cc0493a0b`](https://github.com/nodejs/node/commit/4cc0493a0b)] - **fs**: 使 Callback `readdir()` 中对 `options` 的修改不影响结果 (LiviaMedeiros) [#56057](https://github.com/nodejs/node/pull/56057)
* \[[`8d485f1c09`](https://github.com/nodejs/node/commit/8d485f1c09)] - **fs**: 使 Promises `readdir()` 中对 `options` 的修改不影响结果 (LiviaMedeiros) [#56057](https://github.com/nodejs/node/pull/56057)
* \[[`595851b5ed`](https://github.com/nodejs/node/commit/595851b5ed)] - **fs,win**: 修复命名管道的 readdir (Hüseyin Açacak) [#56110](https://github.com/nodejs/node/pull/56110)
* \[[`075b36b7b4`](https://github.com/nodejs/node/commit/075b36b7b4)] - **http**: 为 http.request 添加 setDefaultHeaders 选项 (Tim Perry) [#56112](https://github.com/nodejs/node/pull/56112)
* \[[`febd969c46`](https://github.com/nodejs/node/commit/febd969c46)] - **http2**: 删除重复的代码块 (Vitaly Aminev) [#55915](https://github.com/nodejs/node/pull/55915)
* \[[`b0ebd23e52`](https://github.com/nodejs/node/commit/b0ebd23e52)] - **http2**: 支持 ALPNCallback 选项 (ZYSzys) [#56187](https://github.com/nodejs/node/pull/56187)
* \[[`f10239fde7`](https://github.com/nodejs/node/commit/f10239fde7)] - **lib**: 移除冗余的全局正则表达式 (Gürgün Dayıoğlu) [#56182](https://github.com/nodejs/node/pull/56182)
* \[[`fd55d3cbdd`](https://github.com/nodejs/node/commit/fd55d3cbdd)] - **lib**: 在已完成时清理持久化的 signals (Edigleysson Silva (Edy)) [#56001](https://github.com/nodejs/node/pull/56001)
* \[[`889094fdbc`](https://github.com/nodejs/node/commit/889094fdbc)] - **lib**: 在 node:v8 serdes 中处理 Float16Array (Bartek Iwańczuk) [#55996](https://github.com/nodejs/node/pull/55996)
* \[[`5aec513207`](https://github.com/nodejs/node/commit/5aec513207)] - **lib**: 禁用 AbortSignal 的默认内存泄漏警告 (Lenz Weber-Tronic) [#55816](https://github.com/nodejs/node/pull/55816)
* \[[`b5a2c0777d`](https://github.com/nodejs/node/commit/b5a2c0777d)] - **(SEMVER-MINOR)** **module**: 将仅前缀模块添加到 `module.builtinModules` (Jordan Harband) [#56185](https://github.com/nodejs/node/pull/56185)
* \[[`9863d27566`](https://github.com/nodejs/node/commit/9863d27566)] - **(SEMVER-MINOR)** **module**: 仅在 --trace-require-module 下发出 require(esm) 警告 (Joyee Cheung) [#56194](https://github.com/nodejs/node/pull/56194)
* \[[`5665e86da6`](https://github.com/nodejs/node/commit/5665e86da6)] - **module**: 防止主线程在 esm worker 结束前退出 (Shima Ryuhei) [#56183](https://github.com/nodejs/node/pull/56183)
* \[[`8e780bc5ae`](https://github.com/nodejs/node/commit/8e780bc5ae)] - **(SEMVER-MINOR)** **module**: 在 import(cjs) 的预解析中使用同步 hooks (Joyee Cheung) [#55698](https://github.com/nodejs/node/pull/55698)
* \[[`e5bb6c2303`](https://github.com/nodejs/node/commit/e5bb6c2303)] - **(SEMVER-MINOR)** **module**: 实现 module.registerHooks() (Joyee Cheung) [#55698](https://github.com/nodejs/node/pull/55698)
* \[[`f883bedceb`](https://github.com/nodejs/node/commit/f883bedceb)] - **node-api**: 允许在 finalizers 中使用 napi_delete_reference (Chengzhong Wu) [#55620](https://github.com/nodejs/node/pull/55620)
* \[[`65bc8e847f`](https://github.com/nodejs/node/commit/65bc8e847f)] - **(SEMVER-MINOR)** **report**: 修复 report keys 中的拼写错误并提升版本 (Yuan-Ming Hsu) [#56068](https://github.com/nodejs/node/pull/56068)
* \[[`a6f0cfa468`](https://github.com/nodejs/node/commit/a6f0cfa468)] - **sea**: 仅对主线程断言 snapshot main function (Joyee Cheung) [#56120](https://github.com/nodejs/node/pull/56120)
* \[[`0ab36e1937`](https://github.com/nodejs/node/commit/0ab36e1937)] - **(SEMVER-MINOR)** **sqlite**: 将常量聚合到单个属性中 (Edigleysson Silva (Edy)) [#56213](https://github.com/nodejs/node/pull/56213)
* \[[`4745798225`](https://github.com/nodejs/node/commit/4745798225)] - **sqlite**: 添加自定义函数支持 (Colin Ihrig) [#55985](https://github.com/nodejs/node/pull/55985)
* \[[`53cc0cc744`](https://github.com/nodejs/node/commit/53cc0cc744)] - **sqlite**: 支持 `db.loadExtension` (Alex Yang) [#53900](https://github.com/nodejs/node/pull/53900)
* \[[`3968599702`](https://github.com/nodejs/node/commit/3968599702)] - **src**: 修复过时的 js2c.cc 引用 (Chengzhong Wu) [#56133](https://github.com/nodejs/node/pull/56133)
* \[[`efcc5d90c5`](https://github.com/nodejs/node/commit/efcc5d90c5)] - **(SEMVER-MINOR)** **src,lib**: 使权限模型稳定 (Rafael Gonzaga) [#56201](https://github.com/nodejs/node/pull/56201)
* \[[`a4a83613cb`](https://github.com/nodejs/node/commit/a4a83613cb)] - **stream**: 在从队列填充后提交 pull-into descriptors (Mattias Buelens) [#56072](https://github.com/nodejs/node/pull/56072)
* \[[`3298ef4891`](https://github.com/nodejs/node/commit/3298ef4891)] - **test**: 移除 test-sqlite-statement-sync 的 flaky 标记 (Luigi Pinca) [#56051](https://github.com/nodejs/node/pull/56051)
* \[[`1d8cc6179d`](https://github.com/nodejs/node/commit/1d8cc6179d)] - **test**: 使用 --permission 代替 --experimental-permission (Rafael Gonzaga) [#56239](https://github.com/nodejs/node/pull/56239)
* \[[`5d252b7a67`](https://github.com/nodejs/node/commit/5d252b7a67)] - **test**: 移除 PPC 上 sea 测试的 exludes (Michael Dawson) [#56217](https://github.com/nodejs/node/pull/56217)
* \[[`8288f57724`](https://github.com/nodejs/node/commit/8288f57724)] - **test**: 修复 test-abortsignal-drop-settled-signals 的不稳定性 (Edigleysson Silva (Edy)) [#56197](https://github.com/nodejs/node/pull/56197)
* \[[`683cc15796`](https://github.com/nodejs/node/commit/683cc15796)] - **test**: 将 localizationd 数据从 `test-icu-env` 移到外部文件 (Livia Medeiros) [#55618](https://github.com/nodejs/node/pull/55618)
* \[[`a0c4a5f122`](https://github.com/nodejs/node/commit/a0c4a5f122)] - **test**: 将 url 的 WPT 更新到 6fa3fe8a92 (Node.js GitHub Bot) [#56136](https://github.com/nodejs/node/pull/56136)
* \[[`a0e3926285`](https://github.com/nodejs/node/commit/a0e3926285)] - **test**: 移除 `hasOpenSSL3x` 工具 (Antoine du Hamel) [#56164](https://github.com/nodejs/node/pull/56164)
* \[[`041a49094e`](https://github.com/nodejs/node/commit/041a49094e)] - **test**: 更新 streams wpt (Mattias Buelens) [#56072](https://github.com/nodejs/node/pull/56072)
* \[[`ea9a675f56`](https://github.com/nodejs/node/commit/ea9a675f56)] - **test_runner**: 默认从覆盖率中排除测试文件 (Pietro Marchini) [#56060](https://github.com/nodejs/node/pull/56060)
* \[[`118cd9998f`](https://github.com/nodejs/node/commit/118cd9998f)] - **tools**: 修复文档的 `node:` 强制要求 (Antoine du Hamel) [#56284](https://github.com/nodejs/node/pull/56284)
* \[[`c4c56daae8`](https://github.com/nodejs/node/commit/c4c56daae8)] - **tools**: 将 github_reporter 更新到 1.7.2 (Node.js GitHub Bot) [#56205](https://github.com/nodejs/node/pull/56205)
* \[[`78743b1533`](https://github.com/nodejs/node/commit/78743b1533)] - **tools**: 为 workflow 添加 REPLACEME 检查 (Mert Can Altin) [#56251](https://github.com/nodejs/node/pull/56251)
* \[[`002ee71d9b`](https://github.com/nodejs/node/commit/002ee71d9b)] - **tools**: 在发布提案中使用 `github.actor` 而不是 bot 用户名 (Antoine du Hamel) [#56232](https://github.com/nodejs/node/pull/56232)
* \[[`d25d16efeb`](https://github.com/nodejs/node/commit/d25d16efeb)] - _**Revert**_ "**tools**: 禁用自动 libuv 更新" (Luigi Pinca) [#56223](https://github.com/nodejs/node/pull/56223)
* \[[`b395e0c8c9`](https://github.com/nodejs/node/commit/b395e0c8c9)] - **tools**: 将 gyp-next 更新到 0.19.1 (Anna Henningsen) [#56111](https://github.com/nodejs/node/pull/56111)
* \[[`a5aaf31c50`](https://github.com/nodejs/node/commit/a5aaf31c50)] - **tools**: 修复 release proposal lint，以支持准备者超过 1 人 (Antoine du Hamel) [#56203](https://github.com/nodejs/node/pull/56203)
* \[[`fa667d609e`](https://github.com/nodejs/node/commit/fa667d609e)] - **tools**: 从 gyp 文件中移除 has_absl_stringify (Michaël Zasso) [#56157](https://github.com/nodejs/node/pull/56157)
* \[[`65b541e70e`](https://github.com/nodejs/node/commit/65b541e70e)] - **tools**: 为 `tools/icu/**` 启用 lint (Livia Medeiros) [#56176](https://github.com/nodejs/node/pull/56176)
* \[[`28a4b6ff58`](https://github.com/nodejs/node/commit/28a4b6ff58)] - **tools**: 在创建发布提案时使用 commit title 作为 PR 标题 (Antoine du Hamel) [#56165](https://github.com/nodejs/node/pull/56165)
* \[[`e20eef659f`](https://github.com/nodejs/node/commit/e20eef659f)] - **tools**: 将 gyp-next 更新到 0.19.0 (Node.js GitHub Bot) [#56158](https://github.com/nodejs/node/pull/56158)
* \[[`efcc829085`](https://github.com/nodejs/node/commit/efcc829085)] - **tools**: 将 /tools/eslint 中的 eslint 组提升 4 个更新 (dependabot\[bot]) [#56099](https://github.com/nodejs/node/pull/56099)
* \[[`5620b2be8a`](https://github.com/nodejs/node/commit/5620b2be8a)] - **tools**: 改进发布提案 PR 的创建 (Antoine du Hamel) [#56161](https://github.com/nodejs/node/pull/56161)
* \[[`3e17a8e78e`](https://github.com/nodejs/node/commit/3e17a8e78e)] - **util**: 加固更多内置类以防范 prototype pollution (Antoine du Hamel) [#56225](https://github.com/nodejs/node/pull/56225)
* \[[`13815417c7`](https://github.com/nodejs/node/commit/13815417c7)] - **util**: 修复 Latin1 解码以返回字符串输出 (Mert Can Altin) [#56222](https://github.com/nodejs/node/pull/56222)
* \[[`77397c5013`](https://github.com/nodejs/node/commit/77397c5013)] - **util**: 不再依赖可变的 `Object` 和 `Function` 的 `constructor` 属性 (Antoine du Hamel) [#56188](https://github.com/nodejs/node/pull/56188)
* \[[`84f98e0a74`](https://github.com/nodejs/node/commit/84f98e0a74)] - **v8,tools**: 暴露 experimental wasm revectorize 功能 (Yolanda-Chen) [#54896](https://github.com/nodejs/node/pull/54896)
* \[[`8325fa5c04`](https://github.com/nodejs/node/commit/8325fa5c04)] - **worker**: 修复 worker 在退出后加入时的崩溃问题 (Stephen Belanger) [#56191](https://github.com/nodejs/node/pull/56191)

<a id="23.4.0"></a>

## 2024-12-10, 版本 23.4.0（当前），@aduh95，由 @targos 准备

### 值得注意的变化

#### 引入实验性的 `assert.partialDeepStrictEqual`

有时，在编写测试时，我们希望验证某些特定属性是否存在，而额外键的存在对该特定测试并不那么重要。针对这种用例，我们现在可以使用
`assert.partialDeepStrictEqual`。对于已经在使用
`assert.deepStrictEqual` 的人来说，它应该很熟悉，主要区别在于它不要求 `actual` 参数中的所有属性都必须存在于 `expected` 参数中。

下面是一些用法示例：

```js
assert.partialDeepStrictEqual(
  { a: 1, b: 2, c: 3 },
  { a: 1, b: 2 },
);

assert.partialDeepStrictEqual(
  [1, 2, 3, 4],
  [2, 3],
);

assert.partialDeepStrictEqual(
  { a: { b: { c: 1, d: 2 } }, e: 3 },
  { a: { b: { c: 1 } } },
);

assert.partialDeepStrictEqual(
  { a: { b: { c: 1, d: 2 } }, e: 3 },
  { a: { b: { c: 1 } } },
);

assert.partialDeepStrictEqual(
  new Set([{ a: 1 }, { b: 1 }]),
  new Set([{ a: 1 }]),
);

assert.partialDeepStrictEqual(
  { a: new Set([{ a: 1 }, { b: 1 }]), b: new Map(), c: [1, 2, 3] },
  { a: new Set([{ a: 1 }]), c: [2] },
);
```

由 Giovanni Bucci 贡献于 [#54630](https://github.com/nodejs/node/pull/54630)。

#### 其他值得注意的变化

* \[[`816d37a187`](https://github.com/nodejs/node/commit/816d37a187)] - **(SEMVER-MINOR)** **cli**: 实现 `--trace-env` 和 `--trace-env-[js|native]-stack`（Joyee Cheung） [#55604](https://github.com/nodejs/node/pull/55604)
* \[[`59d6891872`](https://github.com/nodejs/node/commit/59d6891872)] - **doc**: 将 LJHarb 添加到协作者中（Jordan Harband） [#56132](https://github.com/nodejs/node/pull/56132)
* \[[`565b04a7be`](https://github.com/nodejs/node/commit/565b04a7be)] - **(SEMVER-MINOR)** **net**: 添加 `BlockList.isBlockList(value)`（James M Snell） [#56078](https://github.com/nodejs/node/pull/56078)
* \[[`c9698ed6a4`](https://github.com/nodejs/node/commit/c9698ed6a4)] - **(SEMVER-MINOR)** **net**: 在 `net.connect` 中支持 `blockList`（theanarkh） [#56075](https://github.com/nodejs/node/pull/56075)
* \[[`30d604180d`](https://github.com/nodejs/node/commit/30d604180d)] - **(SEMVER-MINOR)** **net**: 在 `net.Server` 中支持 `blockList`（theanarkh） [#56079](https://github.com/nodejs/node/pull/56079)
* \[[`9fba5e1df1`](https://github.com/nodejs/node/commit/9fba5e1df1)] - **(SEMVER-MINOR)** **net**: 添加 `SocketAddress.parse`（James M Snell） [#56076](https://github.com/nodejs/node/pull/56076)
* \[[`4cdb03201e`](https://github.com/nodejs/node/commit/4cdb03201e)] - **(SEMVER-MINOR)** **process**: 弃用 `features.{ipv6,uv}` 和 `features.tls_*`（René） [#55545](https://github.com/nodejs/node/pull/55545)
* \[[`efb9f05f59`](https://github.com/nodejs/node/commit/efb9f05f59)] - **(SEMVER-MINOR)** **sqlite**: 取消 `node:sqlite` 模块的标记（Colin Ihrig） [#55890](https://github.com/nodejs/node/pull/55890)
* \[[`d777d4a52d`](https://github.com/nodejs/node/commit/d777d4a52d)] - **(SEMVER-MINOR)** **sqlite**: 添加 `StatementSync.prototype.iterate` 方法（tpoisseau） [#54213](https://github.com/nodejs/node/pull/54213)

### 提交

* \[[`5b0ce376a2`](https://github.com/nodejs/node/commit/5b0ce376a2)] - **assert**: 优化两个 `Set` 的部分比较（Antoine du Hamel） [#55970](https://github.com/nodejs/node/pull/55970)
* \[[`a4f57f0293`](https://github.com/nodejs/node/commit/a4f57f0293)] - **(SEMVER-MINOR)** **assert**: 添加 partialDeepStrictEqual（Giovanni Bucci） [#54630](https://github.com/nodejs/node/pull/54630)
* \[[`1b81a7d003`](https://github.com/nodejs/node/commit/1b81a7d003)] - **build**: 允许覆盖 clang 的使用（Shelley Vohr） [#56016](https://github.com/nodejs/node/pull/56016)
* \[[`39c901307f`](https://github.com/nodejs/node/commit/39c901307f)] - **build**: 移除 create-release-proposal 的默认值（Rafael Gonzaga） [#56042](https://github.com/nodejs/node/pull/56042)
* \[[`7133c0459f`](https://github.com/nodejs/node/commit/7133c0459f)] - **build**: 避免使用 VS v17.12 编译（Stefan Stojanovic） [#55930](https://github.com/nodejs/node/pull/55930)
* \[[`ce53f1689f`](https://github.com/nodejs/node/commit/ce53f1689f)] - **build**: 在 GN 中将 node_arch 设置为 target_cpu（Shelley Vohr） [#55967](https://github.com/nodejs/node/pull/55967)
* \[[`2023b09d27`](https://github.com/nodejs/node/commit/2023b09d27)] - **build**: 添加创建发布提案的 action（Rafael Gonzaga） [#55690](https://github.com/nodejs/node/pull/55690)
* \[[`26ec99634c`](https://github.com/nodejs/node/commit/26ec99634c)] - **build**: 为 crypto 依赖路径使用变量（Shelley Vohr） [#55928](https://github.com/nodejs/node/pull/55928)
* \[[`f48e289580`](https://github.com/nodejs/node/commit/f48e289580)] - **build**: 修复 sqlite 的 GN 构建（Cheng） [#55912](https://github.com/nodejs/node/pull/55912)
* \[[`fffabca6b8`](https://github.com/nodejs/node/commit/fffabca6b8)] - **build**: 有条件地编译捆绑的 simdutf（Jakub Jirutka） [#55886](https://github.com/nodejs/node/pull/55886)
* \[[`d8eb83c5c5`](https://github.com/nodejs/node/commit/d8eb83c5c5)] - **build**: 有条件地编译捆绑的 simdjson（Jakub Jirutka） [#55886](https://github.com/nodejs/node/pull/55886)
* \[[`83e02dc482`](https://github.com/nodejs/node/commit/83e02dc482)] - **build**: 有条件地编译捆绑的 ada（Jakub Jirutka） [#55886](https://github.com/nodejs/node/pull/55886)
* \[[`816d37a187`](https://github.com/nodejs/node/commit/816d37a187)] - **(SEMVER-MINOR)** **cli**: 实现 --trace-env 和 --trace-env-\[js|native]-stack（Joyee Cheung） [#55604](https://github.com/nodejs/node/pull/55604)
* \[[`53c0f2f186`](https://github.com/nodejs/node/commit/53c0f2f186)] - **crypto**: 确保 CryptoKey usages 和 algorithm 是缓存对象（Filip Skokan） [#56108](https://github.com/nodejs/node/pull/56108)
* \[[`93d36bf1c8`](https://github.com/nodejs/node/commit/93d36bf1c8)] - **crypto**: 允许 SubtleCrypto.deriveBits 中出现 8 的非整数倍（Filip Skokan） [#55296](https://github.com/nodejs/node/pull/55296)
* \[[`8680b8030c`](https://github.com/nodejs/node/commit/8680b8030c)] - **deps**: 将 ngtcp2 更新到 1.9.1（Node.js GitHub Bot） [#56095](https://github.com/nodejs/node/pull/56095)
* \[[`78a2a6ca1e`](https://github.com/nodejs/node/commit/78a2a6ca1e)] - **deps**: 将 npm 升级到 10.9.2（npm team） [#56135](https://github.com/nodejs/node/pull/56135)
* \[[`52dfe5af4b`](https://github.com/nodejs/node/commit/52dfe5af4b)] - **deps**: 将 sqlite 更新到 3.47.1（Node.js GitHub Bot） [#56094](https://github.com/nodejs/node/pull/56094)
* \[[`3852b5c8d1`](https://github.com/nodejs/node/commit/3852b5c8d1)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-82a5fec（Node.js GitHub Bot） [#55980](https://github.com/nodejs/node/pull/55980)
* \[[`f99f95f62f`](https://github.com/nodejs/node/commit/f99f95f62f)] - **deps**: 将 corepack 更新到 0.30.0（Node.js GitHub Bot） [#55977](https://github.com/nodejs/node/pull/55977)
* \[[`96e846de89`](https://github.com/nodejs/node/commit/96e846de89)] - **deps**: 将 ngtcp2 更新到 1.9.0（Node.js GitHub Bot） [#55975](https://github.com/nodejs/node/pull/55975)
* \[[`d180a8aedb`](https://github.com/nodejs/node/commit/d180a8aedb)] - **deps**: 将 simdutf 更新到 5.6.3（Node.js GitHub Bot） [#55973](https://github.com/nodejs/node/pull/55973)
* \[[`288416a764`](https://github.com/nodejs/node/commit/288416a764)] - **deps**: 将 npm 升级到 10.9.1（npm team） [#55951](https://github.com/nodejs/node/pull/55951)
* \[[`cf3f7ac512`](https://github.com/nodejs/node/commit/cf3f7ac512)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-7e2e4d7（Node.js GitHub Bot） [#54432](https://github.com/nodejs/node/pull/54432)
* \[[`7768b3d054`](https://github.com/nodejs/node/commit/7768b3d054)] - **deps**: 将 simdjson 更新到 3.10.1（Node.js GitHub Bot） [#54678](https://github.com/nodejs/node/pull/54678)
* \[[`9c6103833b`](https://github.com/nodejs/node/commit/9c6103833b)] - **deps**: 将 simdutf 更新到 5.6.2（Node.js GitHub Bot） [#55889](https://github.com/nodejs/node/pull/55889)
* \[[`7b133d6220`](https://github.com/nodejs/node/commit/7b133d6220)] - **dgram**: 检查 udp 缓冲区大小以避免 fd 泄漏（theanarkh） [#56084](https://github.com/nodejs/node/pull/56084)
* \[[`e4529b8179`](https://github.com/nodejs/node/commit/e4529b8179)] - **doc**: 添加 report 版本和历史部分（Chengzhong Wu） [#56130](https://github.com/nodejs/node/pull/56130)
* \[[`718625a03a`](https://github.com/nodejs/node/commit/718625a03a)] - **doc**: 提及发布脚本的 `-a` 标志（Ruy Adorno） [#56124](https://github.com/nodejs/node/pull/56124)
* \[[`59d6891872`](https://github.com/nodejs/node/commit/59d6891872)] - **doc**: 将 LJHarb 添加到协作者中（Jordan Harband） [#56132](https://github.com/nodejs/node/pull/56132)
* \[[`d7ed32404a`](https://github.com/nodejs/node/commit/d7ed32404a)] - **doc**: 将 create-release-action 添加到流程中（Rafael Gonzaga） [#55993](https://github.com/nodejs/node/pull/55993)
* \[[`3b4ef93371`](https://github.com/nodejs/node/commit/3b4ef93371)] - **doc**: 将文件重命名为 advocacy-ambassador-program.md（Tobias Nießen） [#56046](https://github.com/nodejs/node/pull/56046)
* \[[`59e4087d5e`](https://github.com/nodejs/node/commit/59e4087d5e)] - **doc**: 添加 added 标签并修复 sqlite.md 中的拼写错误（Bart Louwers） [#56012](https://github.com/nodejs/node/pull/56012)
* \[[`a1b26608ae`](https://github.com/nodejs/node/commit/a1b26608ae)] - **doc**: 从示例代码中移除未使用的导入（Blended Bram） [#55570](https://github.com/nodejs/node/pull/55570)
* \[[`498f44ad73`](https://github.com/nodejs/node/commit/498f44ad73)] - **doc**: 为 releases 部分添加 FAQ（Rafael Gonzaga） [#55992](https://github.com/nodejs/node/pull/55992)
* \[[`d48348afaa`](https://github.com/nodejs/node/commit/d48348afaa)] - **doc**: 将历史条目移到类描述中（Luigi Pinca） [#55991](https://github.com/nodejs/node/pull/55991)
* \[[`96926ce13c`](https://github.com/nodejs/node/commit/96926ce13c)] - **doc**: 为 textEncoder.encodeInto() 添加历史条目（Luigi Pinca） [#55990](https://github.com/nodejs/node/pull/55990)
* \[[`e92d51d511`](https://github.com/nodejs/node/commit/e92d51d511)] - **doc**: 稍微改进 GN 构建文档（Shelley Vohr） [#55968](https://github.com/nodejs/node/pull/55968)
* \[[`6be3824d6f`](https://github.com/nodejs/node/commit/6be3824d6f)] - **doc**: 修复弃用代码（Filip Skokan） [#56018](https://github.com/nodejs/node/pull/56018)
* \[[`fa2b35d28d`](https://github.com/nodejs/node/commit/fa2b35d28d)] - **doc**: 移除一条令人困惑且过时的句子（Luigi Pinca） [#55988](https://github.com/nodejs/node/pull/55988)
* \[[`baed2763df`](https://github.com/nodejs/node/commit/baed2763df)] - **doc**: 弃用在 `fs.existsSync` 中传递无效类型（Carlos Espa） [#55892](https://github.com/nodejs/node/pull/55892)
* \[[`a3f7db6b6d`](https://github.com/nodejs/node/commit/a3f7db6b6d)] - **doc**: 为 PerformanceObserver.takeRecords() 添加文档（skyclouds2001） [#55786](https://github.com/nodejs/node/pull/55786)
* \[[`770572423b`](https://github.com/nodejs/node/commit/770572423b)] - **doc**: 将经过审核的课程添加到大使福利中（Matteo Collina） [#55934](https://github.com/nodejs/node/pull/55934)
* \[[`98f8f4a8a9`](https://github.com/nodejs/node/commit/98f8f4a8a9)] - **doc**: 按字母顺序排列 `node:crypto` API（Julian Gassner） [#55831](https://github.com/nodejs/node/pull/55831)
* \[[`1e0decb44c`](https://github.com/nodejs/node/commit/1e0decb44c)] - **doc**: 记录如何添加用于晋升的消息（Michael Dawson） [#55843](https://github.com/nodejs/node/pull/55843)
* \[[`ff48c29724`](https://github.com/nodejs/node/commit/ff48c29724)] - **doc**: 为 zlib 添加 esm 示例（Leonardo Peixoto） [#55946](https://github.com/nodejs/node/pull/55946)
* \[[`ccc5a6d552`](https://github.com/nodejs/node/commit/ccc5a6d552)] - **doc**: 记录在依赖中构建 wasm 的方法（Michael Dawson） [#55940](https://github.com/nodejs/node/pull/55940)
* \[[`c8bb8a6ac5`](https://github.com/nodejs/node/commit/c8bb8a6ac5)] - **doc**: 修复 CHANGELOG.md 中 Node.js 23 列（Richard Lau） [#55935](https://github.com/nodejs/node/pull/55935)
* \[[`9d078802ad`](https://github.com/nodejs/node/commit/9d078802ad)] - **doc**: 将 RedYetiDev 从 triagers 团队中移除（Aviv Keller） [#55947](https://github.com/nodejs/node/pull/55947)
* \[[`5a2a757119`](https://github.com/nodejs/node/commit/5a2a757119)] - **doc**: 为 node:timers 添加 esm 示例（Alfredo González） [#55857](https://github.com/nodejs/node/pull/55857)
* \[[`f711a48e15`](https://github.com/nodejs/node/commit/f711a48e15)] - **doc**: 修复 --allow-fs 中关于相对路径的提及（Rafael Gonzaga） [#55791](https://github.com/nodejs/node/pull/55791)
* \[[`219f5f2627`](https://github.com/nodejs/node/commit/219f5f2627)] - **doc**: 将 git node release --promote 包含到步骤中（Rafael Gonzaga） [#55835](https://github.com/nodejs/node/pull/55835)
* \[[`f9d25ed3e4`](https://github.com/nodejs/node/commit/f9d25ed3e4)] - **doc**: 为移除 import assertion 添加历史条目（Antoine du Hamel） [#55883](https://github.com/nodejs/node/pull/55883)
* \[[`efb9f05f59`](https://github.com/nodejs/node/commit/efb9f05f59)] - **(SEMVER-MINOR)** **doc,lib,src,test**: 取消 sqlite 模块的标记（Colin Ihrig） [#55890](https://github.com/nodejs/node/pull/55890)
* \[[`a37e5fe5f8`](https://github.com/nodejs/node/commit/a37e5fe5f8)] - **fs**: 延迟加载 ReadFileContext（Gürgün Dayıoğlu） [#55998](https://github.com/nodejs/node/pull/55998)
* \[[`9289374248`](https://github.com/nodejs/node/commit/9289374248)] - **http2**: 修复由过早移除监听器导致的内存泄漏（ywave620） [#55966](https://github.com/nodejs/node/pull/55966)
* \[[`49af1c33ac`](https://github.com/nodejs/node/commit/49af1c33ac)] - **lib**: 为 compileFunction 中的选项添加验证（Taejin Kim） [#56023](https://github.com/nodejs/node/pull/56023)
* \[[`8faf91846b`](https://github.com/nodejs/node/commit/8faf91846b)] - **lib**: 修复 `fs.readdir` 递归异步（Rafael Gonzaga） [#56041](https://github.com/nodejs/node/pull/56041)
* \[[`a2382303d7`](https://github.com/nodejs/node/commit/a2382303d7)] - **lib**: 重构代码以提高可读性（Pietro Marchini） [#55995](https://github.com/nodejs/node/pull/55995)
* \[[`30f26ba254`](https://github.com/nodejs/node/commit/30f26ba254)] - **lib**: 避免在带文件类型的递归 fs.readdir 中排除符号链接（Juan José） [#55714](https://github.com/nodejs/node/pull/55714)
* \[[`9b272ae339`](https://github.com/nodejs/node/commit/9b272ae339)] - **meta**: 将 github/codeql-action 从 3.27.0 升级到 3.27.5（dependabot[bot]） [#56103](https://github.com/nodejs/node/pull/56103)
* \[[`fb0e6ca68b`](https://github.com/nodejs/node/commit/fb0e6ca68b)] - **meta**: 将 actions/checkout 从 4.1.7 升级到 4.2.2（dependabot[bot]） [#56102](https://github.com/nodejs/node/pull/56102)
* \[[`0ab611513c`](https://github.com/nodejs/node/commit/0ab611513c)] - **meta**: 将 step-security/harden-runner 从 2.10.1 升级到 2.10.2（dependabot[bot]） [#56101](https://github.com/nodejs/node/pull/56101)
* \[[`ff4839b8ab`](https://github.com/nodejs/node/commit/ff4839b8ab)] - **meta**: 将 actions/setup-node 从 4.0.3 升级到 4.1.0（dependabot[bot]） [#56100](https://github.com/nodejs/node/pull/56100)
* \[[`f262207356`](https://github.com/nodejs/node/commit/f262207356)] - **meta**: 为 proposal action 添加 releasers 作为 CODEOWNERS（Rafael Gonzaga） [#56043](https://github.com/nodejs/node/pull/56043)
* \[[`b6005b3fac`](https://github.com/nodejs/node/commit/b6005b3fac)] - **module**: 将 require(esm) 中的求值拒绝标记为已处理（Joyee Cheung） [#56122](https://github.com/nodejs/node/pull/56122)
* \[[`b8ab5332a9`](https://github.com/nodejs/node/commit/b8ab5332a9)] - **module**: 移除 --experimental-default-type（Geoffrey Booth） [#56092](https://github.com/nodejs/node/pull/56092)
* \[[`4be5047030`](https://github.com/nodejs/node/commit/4be5047030)] - **module**: 当 require(esm) 来自 node_modules 时不发出警告（Joyee Cheung） [#55960](https://github.com/nodejs/node/pull/55960)
* \[[`c9698ed6a4`](https://github.com/nodejs/node/commit/c9698ed6a4)] - **(SEMVER-MINOR)** **net**: 支持在 net.connect 中使用 blocklist（theanarkh） [#56075](https://github.com/nodejs/node/pull/56075)
* \[[`9fba5e1df1`](https://github.com/nodejs/node/commit/9fba5e1df1)] - **(SEMVER-MINOR)** **net**: 添加 SocketAddress.parse（James M Snell） [#56076](https://github.com/nodejs/node/pull/56076)
* \[[`565b04a7be`](https://github.com/nodejs/node/commit/565b04a7be)] - **(SEMVER-MINOR)** **net**: 添加 net.BlockList.isBlockList(value)（James M Snell） [#56078](https://github.com/nodejs/node/pull/56078)
* \[[`30d604180d`](https://github.com/nodejs/node/commit/30d604180d)] - **(SEMVER-MINOR)** **net**: 为 net.Server 支持 blocklist（theanarkh） [#56079](https://github.com/nodejs/node/pull/56079)
* \[[`4cdb03201e`](https://github.com/nodejs/node/commit/4cdb03201e)] - **(SEMVER-MINOR)** **process**: 弃用 `features.{ipv6,uv}` 和 `features.tls_*`（René） [#55545](https://github.com/nodejs/node/pull/55545)
* \[[`d09e57b26d`](https://github.com/nodejs/node/commit/d09e57b26d)] - **quic**: 更新更多 QUIC 实现（James M Snell） [#55986](https://github.com/nodejs/node/pull/55986)
* \[[`1fb30d6e86`](https://github.com/nodejs/node/commit/1fb30d6e86)] - **quic**: 对 quic 实现进行多项更新（James M Snell） [#55971](https://github.com/nodejs/node/pull/55971)
* \[[`9e4f7aa808`](https://github.com/nodejs/node/commit/9e4f7aa808)] - **sqlite**: deps 包含 `sqlite3ext.h`（Alex Yang） [#56010](https://github.com/nodejs/node/pull/56010)
* \[[`d777d4a52d`](https://github.com/nodejs/node/commit/d777d4a52d)] - **(SEMVER-MINOR)** **sqlite**: 添加 `StatementSync.prototype.iterate` 方法（tpoisseau） [#54213](https://github.com/nodejs/node/pull/54213)
* \[[`66451bb9ba`](https://github.com/nodejs/node/commit/66451bb9ba)] - **src**: 在 SocketAddress 中使用 spaceship 运算符（James M Snell） [#56059](https://github.com/nodejs/node/pull/56059)
* \[[`ad9ebe417a`](https://github.com/nodejs/node/commit/ad9ebe417a)] - **src**: 为 env.cc 添加缺失的限定符（Yagiz Nizipli） [#56062](https://github.com/nodejs/node/pull/56062)
* \[[`56c4da240d`](https://github.com/nodejs/node/commit/56c4da240d)] - **src**: 在 process emit 函数中使用 std::string_view（Yagiz Nizipli） [#56086](https://github.com/nodejs/node/pull/56086)
* \[[`26ab8e9823`](https://github.com/nodejs/node/commit/26ab8e9823)] - **src**: 移除 async_wrap 中的死代码（Gerhard Stöbich） [#56065](https://github.com/nodejs/node/pull/56065)
* \[[`4dea44e468`](https://github.com/nodejs/node/commit/4dea44e468)] - **src**: 避免在 getV8FastApiCallCount 中复制（Yagiz Nizipli） [#56081](https://github.com/nodejs/node/pull/56081)
* \[[`b778a4fe46`](https://github.com/nodejs/node/commit/b778a4fe46)] - **src**: 修复 fd 检查（theanarkh） [#56000](https://github.com/nodejs/node/pull/56000)
* \[[`971f5f54df`](https://github.com/nodejs/node/commit/971f5f54df)] - **src**: 安全地移除 dotenv 的最后一行（Shima Ryuhei） [#55982](https://github.com/nodejs/node/pull/55982)
* \[[`497a9aea1c`](https://github.com/nodejs/node/commit/497a9aea1c)] - **src**: 修复 Windows 上的 kill 信号（Hüseyin Açacak） [#55514](https://github.com/nodejs/node/pull/55514)
* \[[`8a935489f9`](https://github.com/nodejs/node/commit/8a935489f9)] - **src,build**: 添加“不存在用户定义的 CTAD 推导指南”检查（Chengzhong Wu） [#56071](https://github.com/nodejs/node/pull/56071)
* \[[`5edb8d5919`](https://github.com/nodejs/node/commit/5edb8d5919)] - **test**: 移除 test-fs-utimes 的 flaky 标记（Luigi Pinca） [#56052](https://github.com/nodejs/node/pull/56052)
* \[[`046e642a80`](https://github.com/nodejs/node/commit/046e642a80)] - **test**: 确保 `cli.md` 按字母顺序排列（Antoine du Hamel） [#56025](https://github.com/nodejs/node/pull/56025)
* \[[`da354f46cd`](https://github.com/nodejs/node/commit/da354f46cd)] - **test**: 将 WebCryptoAPI 的 WPT 更新到 3e3374efde（Node.js GitHub Bot） [#56093](https://github.com/nodejs/node/pull/56093)
* \[[`9486c7ce4c`](https://github.com/nodejs/node/commit/9486c7ce4c)] - **test**: 将 WebCryptoAPI 的 WPT 更新到 76dfa54e5d（Node.js GitHub Bot） [#56093](https://github.com/nodejs/node/pull/56093)
* \[[`a8809fc0f5`](https://github.com/nodejs/node/commit/a8809fc0f5)] - **test**: 将 test-worker-arraybuffer-zerofill 移到 parallel（Luigi Pinca） [#56053](https://github.com/nodejs/node/pull/56053)
* \[[`6194435b9e`](https://github.com/nodejs/node/commit/6194435b9e)] - **test**: 将 url 的 WPT 更新到 67880a4eb83ca9aa732eec4b35a1971ff5bf37ff（Node.js GitHub Bot） [#55999](https://github.com/nodejs/node/pull/55999)
* \[[`f7567d46d8`](https://github.com/nodejs/node/commit/f7567d46d8)] - **test**: 使 HTTP/1.0 连接测试更稳健（Arne Keller） [#55959](https://github.com/nodejs/node/pull/55959)
* \[[`c157e026fc`](https://github.com/nodejs/node/commit/c157e026fc)] - **test**: 将 readdir 测试转换为使用 test runner（Thomas Chetwin） [#55750](https://github.com/nodejs/node/pull/55750)
* \[[`29362ce673`](https://github.com/nodejs/node/commit/29362ce673)] - **test**: 使 x509 crypto 测试可与 BoringSSL 配合工作（Shelley Vohr） [#55927](https://github.com/nodejs/node/pull/55927)
* \[[`493e16c852`](https://github.com/nodejs/node/commit/493e16c852)] - **test**: 修复优先级判断（Livia Medeiros） [#55908](https://github.com/nodejs/node/pull/55908)
* \[[`99858ceb9f`](https://github.com/nodejs/node/commit/99858ceb9f)] - **test,crypto**: 更新 WebCryptoAPI WPT（Filip Skokan） [#55997](https://github.com/nodejs/node/pull/55997)
* \[[`7c3a4d4bcd`](https://github.com/nodejs/node/commit/7c3a4d4bcd)] - **test_runner**: 重构 run() 中的 Promise 链（Colin Ihrig） [#55958](https://github.com/nodejs/node/pull/55958)
* \[[`95e8c4ef6c`](https://github.com/nodejs/node/commit/95e8c4ef6c)] - **test_runner**: 重构 Suite() 中的 build Promise（Colin Ihrig） [#55958](https://github.com/nodejs/node/pull/55958)
* \[[`c048865199`](https://github.com/nodejs/node/commit/c048865199)] - **test_runner**: 简化 hook 执行逻辑（Colin Ihrig） [#55963](https://github.com/nodejs/node/pull/55963)
* \[[`8197815fe8`](https://github.com/nodejs/node/commit/8197815fe8)] - **test_runner**: 将快照测试标记为稳定（Colin Ihrig） [#55897](https://github.com/nodejs/node/pull/55897)
* \[[`8a5d8c7669`](https://github.com/nodejs/node/commit/8a5d8c7669)] - **test_runner**: 将 context.plan() 标记为稳定（Colin Ihrig） [#55895](https://github.com/nodejs/node/pull/55895)
* \[[`790a2ca3b7`](https://github.com/nodejs/node/commit/790a2ca3b7)] - **tools**: 更新 `create-release-proposal` workflow（Antoine du Hamel） [#56054](https://github.com/nodejs/node/pull/56054)
* \[[`98ce4652e2`](https://github.com/nodejs/node/commit/98ce4652e2)] - **tools**: 修复 update-undici 脚本（Michaël Zasso） [#56069](https://github.com/nodejs/node/pull/56069)
* \[[`d6a6c8ace1`](https://github.com/nodejs/node/commit/d6a6c8ace1)] - **tools**: 允许从 forks 触发 `tools.yml`（Antoine du Hamel） [#56008](https://github.com/nodejs/node/pull/56008)
* \[[`cc96fce5eb`](https://github.com/nodejs/node/commit/cc96fce5eb)] - **tools**: 修复 nghttp3 更新脚本（Antoine du Hamel） [#56007](https://github.com/nodejs/node/pull/56007)
* \[[`2cd939cb95`](https://github.com/nodejs/node/commit/2cd939cb95)] - **tools**: 过滤发布密钥以减少交互（Antoine du Hamel） [#55950](https://github.com/nodejs/node/pull/55950)
* \[[`4b3919f1be`](https://github.com/nodejs/node/commit/4b3919f1be)] - **tools**: 更新 WPT updater（Antoine du Hamel） [#56003](https://github.com/nodejs/node/pull/56003)
* \[[`54c46b8464`](https://github.com/nodejs/node/commit/54c46b8464)] - **tools**: 为特定子系统添加 WPT updater（Mert Can Altin） [#54460](https://github.com/nodejs/node/pull/54460)
* \[[`32b1681b7f`](https://github.com/nodejs/node/commit/32b1681b7f)] - **tools**: 使用无 token 的 Codecov 上传（Michaël Zasso） [#55943](https://github.com/nodejs/node/pull/55943)
* \[[`475141e370`](https://github.com/nodejs/node/commit/475141e370)] - **tools**: 为发布提交提案添加 linter（Antoine du Hamel） [#55923](https://github.com/nodejs/node/pull/55923)
* \[[`d093820f64`](https://github.com/nodejs/node/commit/d093820f64)] - **tools**: 对 `doc/**/*.md` 中的 js 进行 lint（Livia Medeiros） [#55904](https://github.com/nodejs/node/pull/55904)
* \[[`72eb710f0f`](https://github.com/nodejs/node/commit/72eb710f0f)] - **tools**: 修复 riscv64 构建失败（Lu Yahan） [#52888](https://github.com/nodejs/node/pull/52888)
* \[[`882b70c83f`](https://github.com/nodejs/node/commit/882b70c83f)] - **tools**: 将 /tools/eslint 中的 cross-spawn 从 7.0.3 升级到 7.0.5（dependabot[bot]） [#55894](https://github.com/nodejs/node/pull/55894)
* \[[`9eccd7dba9`](https://github.com/nodejs/node/commit/9eccd7dba9)] - **util**: 为 Latin1 解码添加快速路径（Mert Can Altin） [#55275](https://github.com/nodejs/node/pull/55275)

<a id="23.3.0"></a>

## 2024-11-20，版本 23.3.0（当前），@RafaelGSS

### 显著变更

#### SQLite 会话扩展

实验性 `node:sqlite` 模块中增加了对 [SQLite 会话扩展](https://www.sqlite.org/sessionintro.html) 的基础支持。

```js
const sourceDb = new DatabaseSync(':memory:');
const targetDb = new DatabaseSync(':memory:');

sourceDb.exec('CREATE TABLE data(key INTEGER PRIMARY KEY, value TEXT)');
targetDb.exec('CREATE TABLE data(key INTEGER PRIMARY KEY, value TEXT)');

const session = sourceDb.createSession();

const insert = sourceDb.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
insert.run(1, 'hello');
insert.run(2, 'world');

const changeset = session.changeset();
targetDb.applyChangeset(changeset);
// 现在 changeset 已应用，targetDb 包含与 sourceDb 相同的数据。
```

对于在动态链接 SQLite 时的发行版维护者（使用 `--shared-sqlite`
标志）：现在需要在编译 SQLite 时定义 `SQLITE_ENABLE_SESSION` 和 `SQLITE_ENABLE_PREUPDATE_HOOK`。

由 Bart Louwers 在 [#54181](https://github.com/nodejs/node/pull/54181) 中贡献。

#### 其他显著变更

* \[[`5767b76c30`](https://github.com/nodejs/node/commit/5767b76c30)] - **文档**：对 semver-major 版本发布强制执行严格策略 (Rafael Gonzaga) [#55732](https://github.com/nodejs/node/pull/55732)
* \[[`ccb69bb8d5`](https://github.com/nodejs/node/commit/ccb69bb8d5)] - **(SEMVER-MINOR)** **src**：添加在 dr 时保留环境变量的 CLI 选项 (Rafael Gonzaga) [#55697](https://github.com/nodejs/node/pull/55697)
* \[[`d4e792643d`](https://github.com/nodejs/node/commit/d4e792643d)] - **(SEMVER-MINOR)** **util**：为 getCallSites 添加 sourcemap 支持 (Marco Ippolito) [#55589](https://github.com/nodejs/node/pull/55589)
* \[[`00e092bb4b`](https://github.com/nodejs/node/commit/00e092bb4b)] - **(SEMVER-MINOR)** **util**：修复 util.getCallSites 的复数形式 (Chengzhong Wu) [#55626](https://github.com/nodejs/node/pull/55626)

### 提交

* \[[`9862912d41`](https://github.com/nodejs/node/commit/9862912d41)] - **assert**：区分 `cause` 为 `undefined` 或缺失的情况 (Antoine du Hamel) [#55738](https://github.com/nodejs/node/pull/55738)
* \[[`32e5bbca95`](https://github.com/nodejs/node/commit/32e5bbca95)] - **benchmark**：添加 `test-reporters` (Aviv Keller) [#55757](https://github.com/nodejs/node/pull/55757)
* \[[`c2103354e6`](https://github.com/nodejs/node/commit/c2103354e6)] - **benchmark**：添加 `test_runner/mock-fn` (Aviv Keller) [#55771](https://github.com/nodejs/node/pull/55771)
* \[[`472d55e3e4`](https://github.com/nodejs/node/commit/472d55e3e4)] - **build**：在 GN 构建中实现 node\_use\_amaro 标志 (Cheng) [#55798](https://github.com/nodejs/node/pull/55798)
* \[[`77735674eb`](https://github.com/nodejs/node/commit/77735674eb)] - **build**：为 out/Makefile 的依赖项使用 glob (Richard Lau) [#55789](https://github.com/nodejs/node/pull/55789)
* \[[`bba7323d51`](https://github.com/nodejs/node/commit/bba7323d51)] - **build**：将 cpp lint 和格式化应用于 ncrypto (Aviv Keller) [#55362](https://github.com/nodejs/node/pull/55362)
* \[[`e0c222525e`](https://github.com/nodejs/node/commit/e0c222525e)] - **crypto**：允许 SubtleCrypto.deriveBits 中 HKDF 和 PBKDF2 的 length=0 (Filip Skokan) [#55866](https://github.com/nodejs/node/pull/55866)
* \[[`cad557ec53`](https://github.com/nodejs/node/commit/cad557ec53)] - **deps**：将 simdutf 更新到 5.6.1 (Node.js GitHub Bot) [#55850](https://github.com/nodejs/node/pull/55850)
* \[[`dc8aca3692`](https://github.com/nodejs/node/commit/dc8aca3692)] - **deps**：将 undici 更新到 6.21.0 (Node.js GitHub Bot) [#55851](https://github.com/nodejs/node/pull/55851)
* \[[`e0db9ede4f`](https://github.com/nodejs/node/commit/e0db9ede4f)] - **deps**：将 c-ares 更新到 v1.34.3 (Node.js GitHub Bot) [#55803](https://github.com/nodejs/node/pull/55803)
* \[[`e147935144`](https://github.com/nodejs/node/commit/e147935144)] - **deps**：将 icu 更新到 76.1 (Node.js GitHub Bot) [#55551](https://github.com/nodejs/node/pull/55551)
* \[[`e0ef65b8d5`](https://github.com/nodejs/node/commit/e0ef65b8d5)] - **文档**：移除无法正常工作的示例 (Antoine du Hamel) [#55856](https://github.com/nodejs/node/pull/55856)
* \[[`ec953bca09`](https://github.com/nodejs/node/commit/ec953bca09)] - **文档**：将 `node:sqlite` 添加到必需的 `node:` 前缀列表中 (翠 / green) [#55846](https://github.com/nodejs/node/pull/55846)
* \[[`1b863b96d5`](https://github.com/nodejs/node/commit/1b863b96d5)] - **文档**：添加 `-S` 标志发布准备示例 (Antoine du Hamel) [#55836](https://github.com/nodejs/node/pull/55836)
* \[[`a8311847d1`](https://github.com/nodejs/node/commit/a8311847d1)] - **文档**：澄清 UV\_THREADPOOL\_SIZE 环境变量的用法 (Preveen P) [#55832](https://github.com/nodejs/node/pull/55832)
* \[[`787e51e603`](https://github.com/nodejs/node/commit/787e51e603)] - **文档**：为安全发布添加显著变更说明 (Rafael Gonzaga) [#55830](https://github.com/nodejs/node/pull/55830)
* \[[`e56265cc18`](https://github.com/nodejs/node/commit/e56265cc18)] - **文档**：修复 `URL.prototype.toJSON` 的历史信息 (Antoine du Hamel) [#55818](https://github.com/nodejs/node/pull/55818)
* \[[`c5afdaf5cb`](https://github.com/nodejs/node/commit/c5afdaf5cb)] - **文档**：修正 max-semi-space-size 的表述 (Joe Bowbeer) [#55812](https://github.com/nodejs/node/pull/55812)
* \[[`65ffb2cae3`](https://github.com/nodejs/node/commit/65ffb2cae3)] - **文档**：更新 `import.meta.resolve` 的取消标记信息 (skyclouds2001) [#55810](https://github.com/nodejs/node/pull/55810)
* \[[`9aeb671677`](https://github.com/nodejs/node/commit/9aeb671677)] - **文档**：运行 license-builder (github-actions\[bot]) [#55813](https://github.com/nodejs/node/pull/55813)
* \[[`df5ea1a5b3`](https://github.com/nodejs/node/commit/df5ea1a5b3)] - **文档**：澄清 triager 角色 (Gireesh Punathil) [#55775](https://github.com/nodejs/node/pull/55775)
* \[[`aa12de0f03`](https://github.com/nodejs/node/commit/aa12de0f03)] - **文档**：按字母顺序排序 --report-exclude (Rafael Gonzaga) [#55788](https://github.com/nodejs/node/pull/55788)
* \[[`8576ca9897`](https://github.com/nodejs/node/commit/8576ca9897)] - **文档**：澄清移除实验性 API 不需要弃用处理 (Antoine du Hamel) [#55746](https://github.com/nodejs/node/pull/55746)
* \[[`5767b76c30`](https://github.com/nodejs/node/commit/5767b76c30)] - **文档**：对 semver-major 版本发布强制执行严格策略 (Rafael Gonzaga) [#55732](https://github.com/nodejs/node/pull/55732)
* \[[`1f2fcf1dc8`](https://github.com/nodejs/node/commit/1f2fcf1dc8)] - **文档**：为 JSON 模块稳定化添加历史条目 (Antoine du Hamel) [#55855](https://github.com/nodejs/node/pull/55855)
* \[[`83ba688d8f`](https://github.com/nodejs/node/commit/83ba688d8f)] - **esm**：修复 import.meta.resolve 崩溃 (Marco Ippolito) [#55777](https://github.com/nodejs/node/pull/55777)
* \[[`bdb6d12e7a`](https://github.com/nodejs/node/commit/bdb6d12e7a)] - **events**：为 validate 添加 hasEventListener 工具函数 (Sunghoon) [#55230](https://github.com/nodejs/node/pull/55230)
* \[[`d41cb49516`](https://github.com/nodejs/node/commit/d41cb49516)] - **fs**：防止不必要的 `dependencyOwners` 移除 (Carlos Espa) [#55565](https://github.com/nodejs/node/pull/55565)
* \[[`db0d648d8f`](https://github.com/nodejs/node/commit/db0d648d8f)] - **fs**：修复 opendir 递归模式的 bufferSize 选项 (Ethan Arrowood) [#55744](https://github.com/nodejs/node/pull/55744)
* \[[`693fda0802`](https://github.com/nodejs/node/commit/693fda0802)] - **lib**：移除未使用的文件 `fetch_module` (Michaël Zasso) [#55880](https://github.com/nodejs/node/pull/55880)
* \[[`156873303a`](https://github.com/nodejs/node/commit/156873303a)] - **lib**：在 webidl `type` 函数中优先使用 symbol 而不是 number (Antoine du Hamel) [#55737](https://github.com/nodejs/node/pull/55737)
* \[[`cfe28b161a`](https://github.com/nodejs/node/commit/cfe28b161a)] - **lib**：移除不必要的可选链 (Gürgün Dayıoğlu) [#55728](https://github.com/nodejs/node/pull/55728)
* \[[`bbb8f5914d`](https://github.com/nodejs/node/commit/bbb8f5914d)] - **lib**：在 timers 中使用 `Promise.withResolvers()` (Yagiz Nizipli) [#55720](https://github.com/nodejs/node/pull/55720)
* \[[`11e1bdd409`](https://github.com/nodejs/node/commit/11e1bdd409)] - **module**：整理代码字符串拼接 → 字符串模板 (Jacob Smith) [#55820](https://github.com/nodejs/node/pull/55820)
* \[[`9c99255468`](https://github.com/nodejs/node/commit/9c99255468)] - **permission**：在模块加载时忽略 internalModuleStat (Rafael Gonzaga) [#55797](https://github.com/nodejs/node/pull/55797)
* \[[`5a437c446f`](https://github.com/nodejs/node/commit/5a437c446f)] - **report**：修复带有 exclude-network 的 getReport libuv 中的网络查询 (Adrien Foulon) [#55602](https://github.com/nodejs/node/pull/55602)
* \[[`bcbba723de`](https://github.com/nodejs/node/commit/bcbba723de)] - **sqlite**：添加对 SQLite 会话扩展的支持 (Bart Louwers) [#54181](https://github.com/nodejs/node/pull/54181)
* \[[`49d55228de`](https://github.com/nodejs/node/commit/49d55228de)] - **src**：使用环境字符串创建 sqlite 结果 (Michaël Zasso) [#55785](https://github.com/nodejs/node/pull/55785)
* \[[`58d7a6ec10`](https://github.com/nodejs/node/commit/58d7a6ec10)] - _**Revert**_ "**src**：将 `String::Value` 迁移到 `String::ValueView`" (Michaël Zasso) [#55828](https://github.com/nodejs/node/pull/55828)
* \[[`16786a6df8`](https://github.com/nodejs/node/commit/16786a6df8)] - **src**：提升 `node:os` 的 userInfo 性能 (Yagiz Nizipli) [#55719](https://github.com/nodejs/node/pull/55719)
* \[[`ccb69bb8d5`](https://github.com/nodejs/node/commit/ccb69bb8d5)] - **(SEMVER-MINOR)** **src**：添加在 dr 时保留环境变量的 CLI 选项 (Rafael Gonzaga) [#55697](https://github.com/nodejs/node/pull/55697)
* \[[`770670c52c`](https://github.com/nodejs/node/commit/770670c52c)] - **test**：修复 permission fixtures 的 lint 问题 (Rafael Gonzaga) [#55819](https://github.com/nodejs/node/pull/55819)
* \[[`84c47478d0`](https://github.com/nodejs/node/commit/84c47478d0)] - **test**：改进子进程消息发送的测试覆盖率 (Juan José) [#55710](https://github.com/nodejs/node/pull/55710)
* \[[`e1f54e2527`](https://github.com/nodejs/node/commit/e1f54e2527)] - **test**：确保测试优先级不高于当前优先级 (Livia Medeiros) [#55739](https://github.com/nodejs/node/pull/55739)
* \[[`e1b42e7637`](https://github.com/nodejs/node/commit/e1b42e7637)] - **test**：为 fs\_permission 测试添加 buffer (Rafael Gonzaga) [#55734](https://github.com/nodejs/node/pull/55734)
* \[[`d1ad43e9ae`](https://github.com/nodejs/node/commit/d1ad43e9ae)] - **test**：改进 `ServerResponse` 的测试覆盖率 (Juan José) [#55711](https://github.com/nodejs/node/pull/55711)
* \[[`034505e037`](https://github.com/nodejs/node/commit/034505e037)] - **test_runner**：对已经被 mock 的 date 进行 mock 时抛出错误 (Aviv Keller) [#55858](https://github.com/nodejs/node/pull/55858)
* \[[`44324aa7e9`](https://github.com/nodejs/node/commit/44324aa7e9)] - **tools**：在 /tools/eslint 中将 @eslint/plugin-kit 从 0.2.0 升级到 0.2.3 (dependabot\[bot]) [#55875](https://github.com/nodejs/node/pull/55875)
* \[[`3cfacd3fbb`](https://github.com/nodejs/node/commit/3cfacd3fbb)] - **tools**：修复 commit-queue 的排除标签 (Richard Lau) [#55809](https://github.com/nodejs/node/pull/55809)
* \[[`8111a7655d`](https://github.com/nodejs/node/commit/8111a7655d)] - **tools**：让 commit-queue 检查 blocked 标签 (Marco Ippolito) [#55781](https://github.com/nodejs/node/pull/55781)
* \[[`419ea068fb`](https://github.com/nodejs/node/commit/419ea068fb)] - **tools**：从 eslint 配置中移除不存在的文件 (Aviv Keller) [#55772](https://github.com/nodejs/node/pull/55772)
* \[[`7814669377`](https://github.com/nodejs/node/commit/7814669377)] - **tools**：修复适用于 Node.js 18 的 c-ares 更新脚本 (Richard Lau) [#55717](https://github.com/nodejs/node/pull/55717)
* \[[`3a9733cc4f`](https://github.com/nodejs/node/commit/3a9733cc4f)] - **util**：不要将实验性特性标记为已弃用 (Antoine du Hamel) [#55740](https://github.com/nodejs/node/pull/55740)
* \[[`d4e792643d`](https://github.com/nodejs/node/commit/d4e792643d)] - **(SEMVER-MINOR)** **util**：为 getCallSites 添加 sourcemap 支持 (Marco Ippolito) [#55589](https://github.com/nodejs/node/pull/55589)
* \[[`00e092bb4b`](https://github.com/nodejs/node/commit/00e092bb4b)] - **(SEMVER-MINOR)** **util**：修复 util.getCallSites 的复数形式 (Chengzhong Wu) [#55626](https://github.com/nodejs/node/pull/55626)

<a id="23.2.0"></a>

## 2024-11-11，版本 23.2.0（当前），@aduh95

### 显著变更

#### 将根证书更新到 NSS 3.104

这是在 2024-10-01 随 Firefox 131.0 发布的 NSS 版本。

新增证书：

* FIRMAPROFESIONAL CA ROOT-A WEB
* TWCA CYBER Root CA
* SecureSign Root CA12
* SecureSign Root CA14
* SecureSign Root CA15

#### 其他显著变更

* \[[`fa61dced44`](https://github.com/nodejs/node/commit/fa61dced44)] - **doc**: 将 typescript 支持移至积极开发阶段 (Marco Ippolito) [#55536](https://github.com/nodejs/node/pull/55536)
* \[[`9dcca5441b`](https://github.com/nodejs/node/commit/9dcca5441b)] - **doc**: 将 jazelly 添加为协作者 (Jason Zhang) [#55531](https://github.com/nodejs/node/pull/55531)
* \[[`f628fc43cb`](https://github.com/nodejs/node/commit/f628fc43cb)] - **(SEMVER-MINOR)** **fs**: 使 `dirent.path` 可写 (Antoine du Hamel) [#55547](https://github.com/nodejs/node/pull/55547)
* \[[`25b1422337`](https://github.com/nodejs/node/commit/25b1422337)] - **(SEMVER-MINOR)** **http**: 添加诊断通道 `http.client.request.created` (Marco Ippolito) [#55586](https://github.com/nodejs/node/pull/55586)
* \[[`adda37f00c`](https://github.com/nodejs/node/commit/adda37f00c)] - **(SEMVER-MINOR)** **module**: 添加 `findPackageJSON` 工具函数 (Jacob Smith) [#55412](https://github.com/nodejs/node/pull/55412)
* \[[`69dd1e13c3`](https://github.com/nodejs/node/commit/69dd1e13c3)] - **(SEMVER-MINOR)** **module**: 添加 `module.stripTypeScriptTypes` (Marco Ippolito) [#55282](https://github.com/nodejs/node/pull/55282)

### 提交

* \[[`9dbb255efb`](https://github.com/nodejs/node/commit/9dbb255efb)] - **assert**: 修复 `cause` 不为 undefined 时错误上的 `deepStrictEqual` (Edigleysson Silva (Edy)) [#55406](https://github.com/nodejs/node/pull/55406)
* \[[`7af76ef0b3`](https://github.com/nodejs/node/commit/7af76ef0b3)] - **assert**: 修复打印简单 diff 时的字符串长度检查 (Giovanni Bucci) [#55474](https://github.com/nodejs/node/pull/55474)
* \[[`34483a299b`](https://github.com/nodejs/node/commit/34483a299b)] - **benchmark**: 添加 nodeTiming.uvmetricsinfo 基准测试 (RafaelGSS) [#55614](https://github.com/nodejs/node/pull/55614)
* \[[`b79e4835ab`](https://github.com/nodejs/node/commit/b79e4835ab)] - **build**: 使用 rclone 代替 aws CLI (Michaël Zasso) [#55617](https://github.com/nodejs/node/pull/55617)
* \[[`7ab1f46b8a`](https://github.com/nodejs/node/commit/7ab1f46b8a)] - **build**: 停止预编译 `lint-md` (Aviv Keller) [#55266](https://github.com/nodejs/node/pull/55266)
* \[[`4887214e23`](https://github.com/nodejs/node/commit/4887214e23)] - **build**: 修复使用系统 icu 76 构建的问题 (Michael Cho) [#55563](https://github.com/nodejs/node/pull/55563)
* \[[`f8df27aa5a`](https://github.com/nodejs/node/commit/f8df27aa5a)] - **build**: 修复 generate\_config\_gypi.py 中使用的 GN 参数 (Shelley Vohr) [#55530](https://github.com/nodejs/node/pull/55530)
* \[[`bb78904548`](https://github.com/nodejs/node/commit/bb78904548)] - **build**: 修复 sqlite 和 nghttp2 的 GN 构建 (Shelley Vohr) [#55529](https://github.com/nodejs/node/pull/55529)
* \[[`535f1b0d4c`](https://github.com/nodejs/node/commit/535f1b0d4c)] - **crypto**: 将根证书更新到 NSS 3.104 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
* \[[`9b351b0749`](https://github.com/nodejs/node/commit/9b351b0749)] - **crypto**: 修复 `RSA_PKCS1_PADDING` 错误消息 (Richard Lau) [#55629](https://github.com/nodejs/node/pull/55629)
* \[[`4b192daac0`](https://github.com/nodejs/node/commit/4b192daac0)] - **deps**: 将 acorn 更新到 8.14.0 (Node.js GitHub Bot) [#55699](https://github.com/nodejs/node/pull/55699)
* \[[`dfb764cbc6`](https://github.com/nodejs/node/commit/dfb764cbc6)] - **deps**: 将 sqlite 更新到 3.47.0 (Node.js GitHub Bot) [#55557](https://github.com/nodejs/node/pull/55557)
* \[[`3477492588`](https://github.com/nodejs/node/commit/3477492588)] - **deps**: 将 amaro 更新到 0.2.0 (Node.js GitHub Bot) [#55601](https://github.com/nodejs/node/pull/55601)
* \[[`3a1d490535`](https://github.com/nodejs/node/commit/3a1d490535)] - **deps**: 将 nghttp2 更新到 1.64.0 (Node.js GitHub Bot) [#55559](https://github.com/nodejs/node/pull/55559)
* \[[`50552fdc92`](https://github.com/nodejs/node/commit/50552fdc92)] - **deps**: 将 acorn 更新到 8.13.0 (Node.js GitHub Bot) [#55558](https://github.com/nodejs/node/pull/55558)
* \[[`1b82013f06`](https://github.com/nodejs/node/commit/1b82013f06)] - **deps**: 将 undici 更新到 6.20.1 (Node.js GitHub Bot) [#55503](https://github.com/nodejs/node/pull/55503)
* \[[`09060045b1`](https://github.com/nodejs/node/commit/09060045b1)] - **dns**: 停止使用已弃用的 `ares_query` (Aviv Keller) [#55430](https://github.com/nodejs/node/pull/55430)
* \[[`2d0914f337`](https://github.com/nodejs/node/commit/2d0914f337)] - **doc**: 合并 `CustomEvent` 的历史表 (Edigleysson Silva) [#55758](https://github.com/nodejs/node/pull/55758)
* \[[`cbe09b579f`](https://github.com/nodejs/node/commit/cbe09b579f)] - **doc**: 添加路径别名的 typescript 文档 (Carlos Espa) [#55766](https://github.com/nodejs/node/pull/55766)
* \[[`89aa83842a`](https://github.com/nodejs/node/commit/89aa83842a)] - **doc**: 在 `path.md` 中添加 esm 示例 (Aviv Keller) [#55745](https://github.com/nodejs/node/pull/55745)
* \[[`ee12431298`](https://github.com/nodejs/node/commit/ee12431298)] - **doc**: 统一使用 child process 一词 (Gireesh Punathil) [#55654](https://github.com/nodejs/node/pull/55654)
* \[[`20cb52d1d8`](https://github.com/nodejs/node/commit/20cb52d1d8)] - **doc**: 明确可用的 addon 选项 (Preveen P) [#55715](https://github.com/nodejs/node/pull/55715)
* \[[`bffbaa13a2`](https://github.com/nodejs/node/commit/bffbaa13a2)] - **doc**: 更新 `--max-semi-space-size` 的描述 (Joe Bowbeer) [#55495](https://github.com/nodejs/node/pull/55495)
* \[[`505ff199b6`](https://github.com/nodejs/node/commit/505ff199b6)] - **doc**: 修复损坏的 `PerformanceObserver` 代码示例 (Dom Harrington) [#54227](https://github.com/nodejs/node/pull/54227)
* \[[`b8ca9d89f4`](https://github.com/nodejs/node/commit/b8ca9d89f4)] - **doc**: 在按演示代码意图打开文件时添加写入标志 (robberfree) [#54626](https://github.com/nodejs/node/pull/54626)
* \[[`6662752b62`](https://github.com/nodejs/node/commit/6662752b62)] - **doc**: 添加关于 console 流行为的说明 (Gireesh Punathil) [#55616](https://github.com/nodejs/node/pull/55616)
* \[[`9743fa44ed`](https://github.com/nodejs/node/commit/9743fa44ed)] - **doc**: 移除 crypto.diffieHellman 中对 ECDH-ES 的提及 (Filip Skokan) [#55611](https://github.com/nodejs/node/pull/55611)
* \[[`5de2567644`](https://github.com/nodejs/node/commit/5de2567644)] - **doc**: 改进 c++ embedder API 文档 (Gireesh Punathil) [#55597](https://github.com/nodejs/node/pull/55597)
* \[[`f355054ec7`](https://github.com/nodejs/node/commit/f355054ec7)] - **doc**: 将 "MIT License" 首字母大写 (Aviv Keller) [#55575](https://github.com/nodejs/node/pull/55575)
* \[[`fa61dced44`](https://github.com/nodejs/node/commit/fa61dced44)] - **doc**: 将 typescript 支持移至积极开发阶段 (Marco Ippolito) [#55536](https://github.com/nodejs/node/pull/55536)
* \[[`f77bf65059`](https://github.com/nodejs/node/commit/f77bf65059)] - **doc**: 为类型剥离添加建议的 tsconfig (Marco Ippolito) [#55534](https://github.com/nodejs/node/pull/55534)
* \[[`f00ad27132`](https://github.com/nodejs/node/commit/f00ad27132)] - **doc**: 为 node:string_decoder 添加 esm 示例 (Alfredo González) [#55507](https://github.com/nodejs/node/pull/55507)
* \[[`9dcca5441b`](https://github.com/nodejs/node/commit/9dcca5441b)] - **doc**: 将 jazelly 添加为协作者 (Jason Zhang) [#55531](https://github.com/nodejs/node/pull/55531)
* \[[`f628fc43cb`](https://github.com/nodejs/node/commit/f628fc43cb)] - **(SEMVER-MINOR)** **fs**: 使 `dirent.path` 可写 (Antoine du Hamel) [#55547](https://github.com/nodejs/node/pull/55547)
* \[[`dd9b6833c7`](https://github.com/nodejs/node/commit/dd9b6833c7)] - _**Revert**_ "**fs,win**: 修复带有尾随斜杠的路径中的错误" (Rod Vagg) [#55527](https://github.com/nodejs/node/pull/55527)
* \[[`8d0526f1f4`](https://github.com/nodejs/node/commit/8d0526f1f4)] - **http**: 添加诊断通道 `http.server.response.created` (Marco Ippolito) [#55622](https://github.com/nodejs/node/pull/55622)
* \[[`25b1422337`](https://github.com/nodejs/node/commit/25b1422337)] - **(SEMVER-MINOR)** **http**: 添加诊断通道 `http.client.request.created` (Marco Ippolito) [#55586](https://github.com/nodejs/node/pull/55586)
* \[[`f92f20b930`](https://github.com/nodejs/node/commit/f92f20b930)] - **http**: 在 destroy 后不再发出 error (Robert Nagy) [#55457](https://github.com/nodejs/node/pull/55457)
* \[[`137aa5c9f6`](https://github.com/nodejs/node/commit/137aa5c9f6)] - **http2**: 修复客户端 async storage 持久化问题 (Orgad Shaneh) [#55460](https://github.com/nodejs/node/pull/55460)
* \[[`d1965f9f5b`](https://github.com/nodejs/node/commit/d1965f9f5b)] - **lib**: 实现 webidl 字典转换器并将其用于 structuredClone (Jason Zhang) [#55489](https://github.com/nodejs/node/pull/55489)
* \[[`bf552fa3cc`](https://github.com/nodejs/node/commit/bf552fa3cc)] - **lib**: 在 webidl `type` 函数中更偏好数字而不是字符串 (Jason Zhang) [#55489](https://github.com/nodejs/node/pull/55489)
* \[[`7bfd295416`](https://github.com/nodejs/node/commit/7bfd295416)] - **meta**: 将 actions/setup-python 从 5.2.0 升级到 5.3.0 (dependabot\[bot]) [#55688](https://github.com/nodejs/node/pull/55688)
* \[[`21e3b7b2f4`](https://github.com/nodejs/node/commit/21e3b7b2f4)] - **meta**: 将 actions/setup-node 从 4.0.4 升级到 4.1.0 (dependabot\[bot]) [#55687](https://github.com/nodejs/node/pull/55687)
* \[[`2ae8d3b2ff`](https://github.com/nodejs/node/commit/2ae8d3b2ff)] - **meta**: 将 rtCamp/action-slack-notify 从 2.3.0 升级到 2.3.2 (dependabot\[bot]) [#55686](https://github.com/nodejs/node/pull/55686)
* \[[`42e6c47086`](https://github.com/nodejs/node/commit/42e6c47086)] - **meta**: 将 actions/upload-artifact 从 4.4.0 升级到 4.4.3 (dependabot\[bot]) [#55685](https://github.com/nodejs/node/pull/55685)
* \[[`9042e9acc9`](https://github.com/nodejs/node/commit/9042e9acc9)] - **meta**: 将 actions/cache 从 4.0.2 升级到 4.1.2 (dependabot\[bot]) [#55684](https://github.com/nodejs/node/pull/55684)
* \[[`5c2e4729cc`](https://github.com/nodejs/node/commit/5c2e4729cc)] - **meta**: 将 actions/checkout 从 4.2.0 升级到 4.2.2 (dependabot\[bot]) [#55683](https://github.com/nodejs/node/pull/55683)
* \[[`d79c8bf7a1`](https://github.com/nodejs/node/commit/d79c8bf7a1)] - **meta**: 将 github/codeql-action 从 3.26.10 升级到 3.27.0 (dependabot\[bot]) [#55682](https://github.com/nodejs/node/pull/55682)
* \[[`d0ea9815f6`](https://github.com/nodejs/node/commit/d0ea9815f6)] - **meta**: 使 review-wanted 消息更简洁 (Aviv Keller) [#55607](https://github.com/nodejs/node/pull/55607)
* \[[`b1ca7ab0a1`](https://github.com/nodejs/node/commit/b1ca7ab0a1)] - **meta**: 在 review-wanted 中显示 PR/issue 标题 (Aviv Keller) [#55606](https://github.com/nodejs/node/pull/55606)
* \[[`19b1edfc5c`](https://github.com/nodejs/node/commit/19b1edfc5c)] - **module**: 简化 --inspect-brk 处理 (Joyee Cheung) [#55679](https://github.com/nodejs/node/pull/55679)
* \[[`869e88c6a8`](https://github.com/nodejs/node/commit/869e88c6a8)] - **module**: 简化 `findPackageJSON` 实现 (Antoine du Hamel) [#55543](https://github.com/nodejs/node/pull/55543)
* \[[`56c46ab686`](https://github.com/nodejs/node/commit/56c46ab686)] - **module**: 在 CommonJS 中统一 TypeScript 和 .mjs 处理 (Joyee Cheung) [#55590](https://github.com/nodejs/node/pull/55590)
* \[[`d3be3da6f8`](https://github.com/nodejs/node/commit/d3be3da6f8)] - **module**: 修复 require(esm) 多次触发 TLA 时抛出的错误 (Joyee Cheung) [#55520](https://github.com/nodejs/node/pull/55520)
* \[[`b3971bbf13`](https://github.com/nodejs/node/commit/b3971bbf13)] - **module**: 为 require(esm) 警告裁剪内部堆栈帧 (Joyee Cheung) [#55496](https://github.com/nodejs/node/pull/55496)
* \[[`a9e08cfe6d`](https://github.com/nodejs/node/commit/a9e08cfe6d)] - **module**: 允许重新导入之前 require 失败的 ESM (Joyee Cheung) [#55502](https://github.com/nodejs/node/pull/55502)
* \[[`adda37f00c`](https://github.com/nodejs/node/commit/adda37f00c)] - **(SEMVER-MINOR)** **module**: 添加 `findPackageJSON` 工具函数 (Jacob Smith) [#55412](https://github.com/nodejs/node/pull/55412)
* \[[`69dd1e13c3`](https://github.com/nodejs/node/commit/69dd1e13c3)] - **(SEMVER-MINOR)** **module**: 添加 module.stripTypeScriptTypes (Marco Ippolito) [#55282](https://github.com/nodejs/node/pull/55282)
* \[[`6ab59c81b6`](https://github.com/nodejs/node/commit/6ab59c81b6)] - **os**: 通过直接索引访问改进路径检查 (Mert Can Altin) [#55434](https://github.com/nodejs/node/pull/55434)
* \[[`038ac01d26`](https://github.com/nodejs/node/commit/038ac01d26)] - **path,win**: 修复 resolve 和 normalize 中的错误 (Hüseyin Açacak) [#55623](https://github.com/nodejs/node/pull/55623)
* \[[`7aa250afda`](https://github.com/nodejs/node/commit/7aa250afda)] - **sqlite**: 使用 MaybeLocal 改进错误处理 (Tobias Nießen) [#55571](https://github.com/nodejs/node/pull/55571)
* \[[`2ec4ae7c16`](https://github.com/nodejs/node/commit/2ec4ae7c16)] - **sqlite**: 添加 readOnly 选项 (Tobias Nießen) [#55567](https://github.com/nodejs/node/pull/55567)
* \[[`88c7f5b489`](https://github.com/nodejs/node/commit/88c7f5b489)] - **sqlite**: 重构 open 选项 (Tobias Nießen) [#55442](https://github.com/nodejs/node/pull/55442)
* \[[`7853462a61`](https://github.com/nodejs/node/commit/7853462a61)] - **src**: 为 container-overflow 提供变通方案 (Daniel Lemire) [#55591](https://github.com/nodejs/node/pull/55591)
* \[[`0302efe4b2`](https://github.com/nodejs/node/commit/0302efe4b2)] - **src**: 将更多与 key 相关的内容移至 ncrypto (James M Snell) [#55368](https://github.com/nodejs/node/pull/55368)
* \[[`d26dedf41d`](https://github.com/nodejs/node/commit/d26dedf41d)] - **src**: 重构 ECDHBitsJob 签名 (Filip Skokan) [#55610](https://github.com/nodejs/node/pull/55610)
* \[[`4c34891454`](https://github.com/nodejs/node/commit/4c34891454)] - **src**: 修复创建 NodeAresTask 失败时的 dns 崩溃 (theanarkh) [#55521](https://github.com/nodejs/node/pull/55521)
* \[[`467618418a`](https://github.com/nodejs/node/commit/467618418a)] - **src**: 在 NODE\_DEFINE\_CONSTANT 中使用 NewFromUtf8Literal (Charles Kerr) [#55581](https://github.com/nodejs/node/pull/55581)
* \[[`016baaebbe`](https://github.com/nodejs/node/commit/016baaebbe)] - **src**: 不在非 windows 平台上运行 IsWindowsBatchFile (Yagiz Nizipli) [#55560](https://github.com/nodejs/node/pull/55560)
* \[[`efa142c108`](https://github.com/nodejs/node/commit/efa142c108)] - **src**: 将 `String::Value` 迁移到 `String::ValueView` (Aviv Keller) [#55458](https://github.com/nodejs/node/pull/55458)
* \[[`cfa4d960c8`](https://github.com/nodejs/node/commit/cfa4d960c8)] - **src,lib**: 优化 nodeTiming.uvMetricsInfo (RafaelGSS) [#55614](https://github.com/nodejs/node/pull/55614)
* \[[`19da4de475`](https://github.com/nodejs/node/commit/19da4de475)] - **test**: 更新 `performance-timeline` wpt (RedYetiDev) [#55197](https://github.com/nodejs/node/pull/55197)
* \[[`10b68ed975`](https://github.com/nodejs/node/commit/10b68ed975)] - **test**: 在 FW watch 测试中忽略无关事件 (Carlos Espa) [#55605](https://github.com/nodejs/node/pull/55605)
* \[[`7d93c0c3ae`](https://github.com/nodejs/node/commit/7d93c0c3ae)] - **test**: 重构部分 esm 测试 (Antoine du Hamel) [#55472](https://github.com/nodejs/node/pull/55472)
* \[[`815e2524a6`](https://github.com/nodejs/node/commit/815e2524a6)] - **test**: 拆分 test-runner-mock-timers 测试 (Julian Gassner) [#55506](https://github.com/nodejs/node/pull/55506)
* \[[`6aa797de4e`](https://github.com/nodejs/node/commit/6aa797de4e)] - **test**: 移除不需要的监听器 (Luigi Pinca) [#55486](https://github.com/nodejs/node/pull/55486)
* \[[`649d767a40`](https://github.com/nodejs/node/commit/649d767a40)] - **test**: 提高 `pathToFileURL` 的覆盖率 (Antoine du Hamel) [#55493](https://github.com/nodejs/node/pull/55493)
* \[[`71cc20a3a5`](https://github.com/nodejs/node/commit/71cc20a3a5)] - **test**: 避免对大量元素调用 `apply()` (Livia Medeiros) [#55501](https://github.com/nodejs/node/pull/55501)
* \[[`2d19614020`](https://github.com/nodejs/node/commit/2d19614020)] - **test**: 提高 `http.OutgoingMessage.appendHeader()` 的测试覆盖率 (Juan José) [#55467](https://github.com/nodejs/node/pull/55467)
* \[[`aebf676569`](https://github.com/nodejs/node/commit/aebf676569)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#55703](https://github.com/nodejs/node/pull/55703)
* \[[`53a7d8e75b`](https://github.com/nodejs/node/commit/53a7d8e75b)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#55512](https://github.com/nodejs/node/pull/55512)
* \[[`0ea74f3d02`](https://github.com/nodejs/node/commit/0ea74f3d02)] - **test,crypto**: 使 crypto 测试可与 BoringSSL 一起工作 (Shelley Vohr) [#55491](https://github.com/nodejs/node/pull/55491)
* \[[`3234dc6100`](https://github.com/nodejs/node/commit/3234dc6100)] - **test_runner**: 直接将 `options` 传递给 `TestCoverage` (Aviv Keller) [#55578](https://github.com/nodejs/node/pull/55578)
* \[[`15028dd073`](https://github.com/nodejs/node/commit/15028dd073)] - **tools**: 将 ESLint 更新到 9.14.0 (dependabot\[bot]) [#55689](https://github.com/nodejs/node/pull/55689)
* \[[`961cbc9c0f`](https://github.com/nodejs/node/commit/961cbc9c0f)] - **tools**: 在 `lint-md` 中使用 `util.parseArgs` (Aviv Keller) [#55694](https://github.com/nodejs/node/pull/55694)
* \[[`8fc962f1af`](https://github.com/nodejs/node/commit/8fc962f1af)] - **tools**: 修复根证书更新器 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
* \[[`d0b2d6be84`](https://github.com/nodejs/node/commit/d0b2d6be84)] - **tools**: 压缩 daily-wpt-fyi.yml action 中的 jq 输出 (Filip Skokan) [#55695](https://github.com/nodejs/node/pull/55695)
* \[[`cba05cda38`](https://github.com/nodejs/node/commit/cba05cda38)] - **tools**: 在所有受支持的发布版本上运行每日 WPT.fyi 报告 (Filip Skokan) [#55619](https://github.com/nodejs/node/pull/55619)
* \[[`7ce7eab324`](https://github.com/nodejs/node/commit/7ce7eab324)] - **tools**: 更严格地检查 README 列表 (Antoine du Hamel) [#55625](https://github.com/nodejs/node/pull/55625)
* \[[`c2fcda45ca`](https://github.com/nodejs/node/commit/c2fcda45ca)] - **typings**: 修复 `ModulesBinding` 类型 (Antoine du Hamel) [#55549](https://github.com/nodejs/node/pull/55549)
* \[[`2b9928561d`](https://github.com/nodejs/node/commit/2b9928561d)] - **url**: 将 `pathToFileURL` 重构为原生实现 (Antoine du Hamel) [#55476](https://github.com/nodejs/node/pull/55476)
* \[[`4129bc72e2`](https://github.com/nodejs/node/commit/4129bc72e2)] - **util**: 不捕获循环 `@@toStringTag` 错误 (Aviv Keller) [#55544](https://github.com/nodejs/node/pull/55544)

<a id="23.1.0"></a>

## 2024-10-24，版本 23.1.0（当前），@aduh95

### 重要变更

#### `Buffer` 现在可与可调整大小的 `ArrayBuffer` 配合使用

当使用可调整大小的 `ArrayBuffer` 创建 `Buffer` 时，随着底层 `ArrayBuffer` 大小的变化，`Buffer` 的长度现在也会正确变化。

```js
const ab = new ArrayBuffer(10, { maxByteLength: 20 });
const buffer = Buffer.from(ab);
console.log(buffer.byteLength); // 10
ab.resize(15);
console.log(buffer.byteLength); // 15
ab.resize(5);
console.log(buffer.byteLength); // 5
```

由 James M Snell 贡献于 [#55377](https://github.com/nodejs/node/pull/55377)。

#### `MockTimers` 测试运行器 API 现已稳定

`MockTimers` 于 2023 年 4 月引入，刚刚达到 **稳定状态**。该
API 为在 Node.js 中模拟 `Date` 以及所有主要计时器提供了全面支持，包括
`setTimeout`、`setInterval` 和 `setImmediate`，适用于
`node:timers`、`node:timers/promises` 模块以及全局对象。经过数月的打磨，
开发者现在可以完全放心地依赖 `MockTimers` 来测试基于时间的操作，
从而更自信地控制 Node.js 应用中的异步行为。

使用初始 `Date` 对象作为时间设置的示例如下：

```mjs
import { mock } from 'node:test';
mock.timers.enable({ apis: ['Date'], now: new Date('1970-01-01') });
```

由 Erick Wendel 贡献于 [#55398](https://github.com/nodejs/node/pull/55398)。

#### JSON 模块和 import 属性现已稳定

这两个提案在 2024 年 10 月的会议上已达到 TC39 流程的第 4 阶段。Node.js 的实现已经完全符合这些提案所要求的语义。

由 Nicolò Ribaudo 通过 [#55333](https://github.com/nodejs/node/pull/55333) 贡献。

#### 其他重要变更

* \[[`4ba31b7f20`](https://github.com/nodejs/node/commit/4ba31b7f20)] - **(SEMVER-MINOR)** **assert**：让 `assertion_error` 使用 Myers diff 算法 (Giovanni Bucci) [#54862](https://github.com/nodejs/node/pull/54862)
* \[[`dcbc5fbe65`](https://github.com/nodejs/node/commit/dcbc5fbe65)] - **(SEMVER-MINOR)** **lib**：为 udp 添加 `UV_UDP_REUSEPORT` (theanarkh) [#55403](https://github.com/nodejs/node/pull/55403)
* \[[`ec867ac7ce`](https://github.com/nodejs/node/commit/ec867ac7ce)] - **(SEMVER-MINOR)** **net**：为 tcp 添加 `UV_TCP_REUSEPORT` (theanarkh) [#55408](https://github.com/nodejs/node/pull/55408)

### 提交

* \[[`4ba31b7f20`](https://github.com/nodejs/node/commit/4ba31b7f20)] - **(SEMVER-MINOR)** **assert**：让 assertion\_error 使用 Myers diff 算法 (Giovanni Bucci) [#54862](https://github.com/nodejs/node/pull/54862)
* \[[`fe667bea28`](https://github.com/nodejs/node/commit/fe667bea28)] - **assert**：修复 deepEqual 在 URL 上始终返回 true 的问题 (Xuguang Mei) [#50853](https://github.com/nodejs/node/pull/50853)
* \[[`aca03d9083`](https://github.com/nodejs/node/commit/aca03d9083)] - **benchmark**：为 run.js 添加 --runs 支持 (Rafael Gonzaga) [#55158](https://github.com/nodejs/node/pull/55158)
* \[[`c5abf50692`](https://github.com/nodejs/node/commit/c5abf50692)] - **benchmark**：调整 buffer-copy 的字节大小 (Rafael Gonzaga) [#55295](https://github.com/nodejs/node/pull/55295)
* \[[`d3618b2334`](https://github.com/nodejs/node/commit/d3618b2334)] - **benchmark**：调整 deepEqual object 的配置 (Rafael Gonzaga) [#55254](https://github.com/nodejs/node/pull/55254)
* \[[`c05582da3d`](https://github.com/nodejs/node/commit/c05582da3d)] - **(SEMVER-MINOR)** **buffer**：让 Buffer 可与可调整大小的 ArrayBuffer 配合使用 (James M Snell) [#55377](https://github.com/nodejs/node/pull/55377)
* \[[`194bb0fca5`](https://github.com/nodejs/node/commit/194bb0fca5)] - **build**：修复 cares/uv 依赖的 GN 构建 (Cheng) [#55477](https://github.com/nodejs/node/pull/55477)
* \[[`8eb5359592`](https://github.com/nodejs/node/commit/8eb5359592)] - **build**：修复 AIX 7.1 的卸载脚本 (Cloorc) [#55438](https://github.com/nodejs/node/pull/55438)
* \[[`32f7d5ad1c`](https://github.com/nodejs/node/commit/32f7d5ad1c)] - **build**：有条件地编译捆绑的 sqlite (Richard Lau) [#55409](https://github.com/nodejs/node/pull/55409)
* \[[`2147e496e7`](https://github.com/nodejs/node/commit/2147e496e7)] - **build**：整理 cares.gyp (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
* \[[`2beae50c77`](https://github.com/nodejs/node/commit/2beae50c77)] - **build**：同步 c-ares 源文件列表 (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
* \[[`f48d30eb9f`](https://github.com/nodejs/node/commit/f48d30eb9f)] - **build**：修复路径拼接 (Mohammed Keyvanzadeh) [#55387](https://github.com/nodejs/node/pull/55387)
* \[[`d42522eec5`](https://github.com/nodejs/node/commit/d42522eec5)] - **build**：修复 Makefile 中出现的 make 错误 (minkyu\_kim) [#55287](https://github.com/nodejs/node/pull/55287)
* \[[`52da293471`](https://github.com/nodejs/node/commit/52da293471)] - **cli**：为 `NODE_OPTIONS` 添加可用的 `--heap-prof` 标志 (Juan José) [#54259](https://github.com/nodejs/node/pull/54259)
* \[[`adead26815`](https://github.com/nodejs/node/commit/adead26815)] - **crypto**：显式包含 openssl/rand.h (Shelley Vohr) [#55425](https://github.com/nodejs/node/pull/55425)
* \[[`df2f1adf9e`](https://github.com/nodejs/node/commit/df2f1adf9e)] - **deps**：V8：挑选提交 f915fa4c9f41 (Chengzhong Wu) [#55484](https://github.com/nodejs/node/pull/55484)
* \[[`bfc10a975f`](https://github.com/nodejs/node/commit/bfc10a975f)] - **deps**：将 googletest 更新到 df1544b (Node.js GitHub Bot) [#55465](https://github.com/nodejs/node/pull/55465)
* \[[`45ef1809bd`](https://github.com/nodejs/node/commit/45ef1809bd)] - **deps**：将 c-ares 更新到 v1.34.2 (Node.js GitHub Bot) [#55463](https://github.com/nodejs/node/pull/55463)
* \[[`c2b5ebfeca`](https://github.com/nodejs/node/commit/c2b5ebfeca)] - **deps**：将 ada 更新到 2.9.1 (Node.js GitHub Bot) [#54679](https://github.com/nodejs/node/pull/54679)
* \[[`903863cafa`](https://github.com/nodejs/node/commit/903863cafa)] - **deps**：将 simdutf 更新到 5.6.0 (Node.js GitHub Bot) [#55379](https://github.com/nodejs/node/pull/55379)
* \[[`008fb5f7f4`](https://github.com/nodejs/node/commit/008fb5f7f4)] - **deps**：将 V8 补丁更新到 12.9.202.28 (Node.js GitHub Bot) [#55371](https://github.com/nodejs/node/pull/55371)
* \[[`8b282228ae`](https://github.com/nodejs/node/commit/8b282228ae)] - **deps**：将 c-ares 更新到 v1.34.1 (Node.js GitHub Bot) [#55369](https://github.com/nodejs/node/pull/55369)
* \[[`54d55f2337`](https://github.com/nodejs/node/commit/54d55f2337)] - _**Revert**_ "**deps**：默认禁用 libuv 中的 io\_uring 支持" (Santiago Gimeno) [#55114](https://github.com/nodejs/node/pull/55114)
* \[[`bfb3c621c4`](https://github.com/nodejs/node/commit/bfb3c621c4)] - **deps**：将 libuv 更新到 1.49.1 (Santiago Gimeno) [#55114](https://github.com/nodejs/node/pull/55114)
* \[[`055d2b8919`](https://github.com/nodejs/node/commit/055d2b8919)] - **deps**：将 amaro 更新到 0.1.9 (Node.js GitHub Bot) [#55348](https://github.com/nodejs/node/pull/55348)
* \[[`c028d21b44`](https://github.com/nodejs/node/commit/c028d21b44)] - **diagnostics\_channel**：修复在发布期间取消订阅的问题 (simon-id) [#55116](https://github.com/nodejs/node/pull/55116)
* \[[`b4b6ddb777`](https://github.com/nodejs/node/commit/b4b6ddb777)] - **dns**：遵循 order 选项 (Luigi Pinca) [#55392](https://github.com/nodejs/node/pull/55392)
* \[[`37352cef7f`](https://github.com/nodejs/node/commit/37352cef7f)] - **doc**：更改用于验证 SHASUMS256 的命令 (adriancuadrado) [#55420](https://github.com/nodejs/node/pull/55420)
* \[[`66bcf4c065`](https://github.com/nodejs/node/commit/66bcf4c065)] - **doc**：将双包发布文档移至单独仓库 (Joyee Cheung) [#55444](https://github.com/nodejs/node/pull/55444)
* \[[`04b41bda03`](https://github.com/nodejs/node/commit/04b41bda03)] - **doc**：添加关于 child\_process 中 stdio 流的说明 (Ederin (Ed) Igharoro) [#55322](https://github.com/nodejs/node/pull/55322)
* \[[`689d3a3e41`](https://github.com/nodejs/node/commit/689d3a3e41)] - **doc**：将 `isBigIntObject` 添加到文档中 (leviscar) [#55450](https://github.com/nodejs/node/pull/55450)
* \[[`784c825a27`](https://github.com/nodejs/node/commit/784c825a27)] - **doc**：移除 fs 中关于 `highWaterMark` 的过时说明 (Ian Kerins) [#55462](https://github.com/nodejs/node/pull/55462)
* \[[`1ec25e8573`](https://github.com/nodejs/node/commit/1ec25e8573)] - **doc**：将 Danielle Adams 的密钥移至旧 gpg 密钥 (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
* \[[`7d5bb097eb`](https://github.com/nodejs/node/commit/7d5bb097eb)] - **doc**：将 Bryan English 的密钥移至旧 gpg 密钥 (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
* \[[`2967471f67`](https://github.com/nodejs/node/commit/2967471f67)] - **doc**：将 Beth Griggs 的密钥移至旧 gpg 密钥 (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
* \[[`0be3a7505f`](https://github.com/nodejs/node/commit/0be3a7505f)] - **doc**：为 mocktimers 添加变更日志 (Erick Wendel) [#55398](https://github.com/nodejs/node/pull/55398)
* \[[`e15f779794`](https://github.com/nodejs/node/commit/e15f779794)] - **doc**：明确条件限制 (Jan Martin) [#55187](https://github.com/nodejs/node/pull/55187)
* \[[`c3f2216a7d`](https://github.com/nodejs/node/commit/c3f2216a7d)] - **doc**：添加 WinGet 构建说明 (Hüseyin Açacak) [#55356](https://github.com/nodejs/node/pull/55356)
* \[[`bdc2c3bb94`](https://github.com/nodejs/node/commit/bdc2c3bb94)] - **doc**：补充 buffer 文档中缺失的返回值 (Karl Horky) [#55273](https://github.com/nodejs/node/pull/55273)
* \[[`41f68f59af`](https://github.com/nodejs/node/commit/41f68f59af)] - **doc**：修复 ambasador Markdown 列表 (Rafael Gonzaga) [#55361](https://github.com/nodejs/node/pull/55361)
* \[[`bbd5318729`](https://github.com/nodejs/node/commit/bbd5318729)] - **esm**：在导入者不是文件时添加回退方案 (Antoine du Hamel) [#55471](https://github.com/nodejs/node/pull/55471)
* \[[`22d77773fd`](https://github.com/nodejs/node/commit/22d77773fd)] - **esm**：修复 `resolve` 钩子中 `importAssertion` 的不一致 (Wei Zhu) [#55365](https://github.com/nodejs/node/pull/55365)
* \[[`48bb87b059`](https://github.com/nodejs/node/commit/48bb87b059)] - **esm**：将 import 属性和 JSON 模块标记为稳定 (Nicolò Ribaudo) [#55333](https://github.com/nodejs/node/pull/55333)
* \[[`8ceefebaf2`](https://github.com/nodejs/node/commit/8ceefebaf2)] - **events**：优化 EventTarget.addEventListener (Robert Nagy) [#55312](https://github.com/nodejs/node/pull/55312)
* \[[`45f960cab6`](https://github.com/nodejs/node/commit/45f960cab6)] - **fs**：在 `glob` 期间将正确的路径传递给 `DirentFromStats` (Aviv Keller) [#55071](https://github.com/nodejs/node/pull/55071)
* \[[`d9494a7641`](https://github.com/nodejs/node/commit/d9494a7641)] - **fs**：在 Windows 路径上使用 `wstring` (jazelly) [#55171](https://github.com/nodejs/node/pull/55171)
* \[[`0f1d13e359`](https://github.com/nodejs/node/commit/0f1d13e359)] - **lib**：确保 FORCE\_COLOR 在非 TTY 环境中强制输出颜色 (Pietro Marchini) [#55404](https://github.com/nodejs/node/pull/55404)
* \[[`dcbc5fbe65`](https://github.com/nodejs/node/commit/dcbc5fbe65)] - **(SEMVER-MINOR)** **lib**：为 udp 添加 UV\_UDP\_REUSEPORT (theanarkh) [#55403](https://github.com/nodejs/node/pull/55403)
* \[[`714f272423`](https://github.com/nodejs/node/commit/714f272423)] - **lib**：移除用于字符检查的 startsWith/endsWith primordials (Gürgün Dayıoğlu) [#55407](https://github.com/nodejs/node/pull/55407)
* \[[`4e5c90bb41`](https://github.com/nodejs/node/commit/4e5c90bb41)] - **lib**：用 `Promise.withResolvers` 替换 `createDeferredPromise` 工具函数 (Yagiz Nizipli) [#54836](https://github.com/nodejs/node/pull/54836)
* \[[`db18aca47a`](https://github.com/nodejs/node/commit/db18aca47a)] - **lib**：在 cluster 模式运行时添加断开连接的标志 (theanarkh) [#54927](https://github.com/nodejs/node/pull/54927)
* \[[`dd848f2d1e`](https://github.com/nodejs/node/commit/dd848f2d1e)] - **lib**：test\_runner#mock:timers 遵循 timeout\_max 行为 (BadKey) [#55375](https://github.com/nodejs/node/pull/55375)
* \[[`a9473bb8e3`](https://github.com/nodejs/node/commit/a9473bb8e3)] - **lib**：在依赖的 signal 被 GC 后移除已完成的信号 (Edigleysson Silva (Edy)) [#55354](https://github.com/nodejs/node/pull/55354)
* \[[`07ad987aa1`](https://github.com/nodejs/node/commit/07ad987aa1)] - **lib**：在 JS 中将 transfer 序列转换为数组 (Jason Zhang) [#55317](https://github.com/nodejs/node/pull/55317)
* \[[`d54d3b24c3`](https://github.com/nodejs/node/commit/d54d3b24c3)] - **meta**：将一位或多位协作者移至 emeritus (Node.js GitHub Bot) [#55381](https://github.com/nodejs/node/pull/55381)
* \[[`12d709bd27`](https://github.com/nodejs/node/commit/12d709bd27)] - **meta**：为 /deps/ncrypto/\* 分配 CODEOWNERS (Filip Skokan) [#55426](https://github.com/nodejs/node/pull/55426)
* \[[`0130780eec`](https://github.com/nodejs/node/commit/0130780eec)] - **meta**：将通知 review-wanted 的颜色改为蓝色 (Rafael Gonzaga) [#55423](https://github.com/nodejs/node/pull/55423)
* \[[`335a507027`](https://github.com/nodejs/node/commit/335a507027)] - **meta**：将 codecov/codecov-action 从 4.5.0 升级到 4.6.0 (dependabot\[bot]) [#55222](https://github.com/nodejs/node/pull/55222)
* \[[`5ffc721d09`](https://github.com/nodejs/node/commit/5ffc721d09)] - **meta**：将 github/codeql-action 从 3.26.6 升级到 3.26.10 (dependabot\[bot]) [#55221](https://github.com/nodejs/node/pull/55221)
* \[[`d9fde2c45b`](https://github.com/nodejs/node/commit/d9fde2c45b)] - **meta**：将 step-security/harden-runner 从 2.9.1 升级到 2.10.1 (dependabot\[bot]) [#55220](https://github.com/nodejs/node/pull/55220)
* \[[`2c960a212e`](https://github.com/nodejs/node/commit/2c960a212e)] - **module**：在 require(esm) 警告中包含模块信息 (Joyee Cheung) [#55397](https://github.com/nodejs/node/pull/55397)
* \[[`a12dbf03d9`](https://github.com/nodejs/node/commit/a12dbf03d9)] - **module**：简化 node\_modules 检查下的 ts 处理 (Marco Ippolito) [#55440](https://github.com/nodejs/node/pull/55440)
* \[[`ec867ac7ce`](https://github.com/nodejs/node/commit/ec867ac7ce)] - **(SEMVER-MINOR)** **net**：为 tcp 添加 UV\_TCP\_REUSEPORT (theanarkh) [#55408](https://github.com/nodejs/node/pull/55408)
* \[[`9e320279a2`](https://github.com/nodejs/node/commit/9e320279a2)] - _**Revert**_ "**path**：修复 bug 和不一致" (Aviv Keller) [#55414](https://github.com/nodejs/node/pull/55414)
* \[[`1ce8928db3`](https://github.com/nodejs/node/commit/1ce8928db3)] - **sqlite**：在 stmt.all() 中缓存列名 (Fedor Indutny) [#55373](https://github.com/nodejs/node/pull/55373)
* \[[`cc775d314a`](https://github.com/nodejs/node/commit/cc775d314a)] - **src**：从 `Get/SetPrototype` 切换到 `Get/SetPrototypeV2` (Aviv Keller) [#55453](https://github.com/nodejs/node/pull/55453)
* \[[`89c96ade53`](https://github.com/nodejs/node/commit/89c96ade53)] - **src**：移除基于 icu 的 `ToASCII` 和 `ToUnicode` (Yagiz Nizipli) [#55156](https://github.com/nodejs/node/pull/55156)
* \[[`57dbbf8402`](https://github.com/nodejs/node/commit/57dbbf8402)] - **src**：修复 winapi\_strerror 错误字符串 (Hüseyin Açacak) [#55207](https://github.com/nodejs/node/pull/55207)
* \[[`a490bb8745`](https://github.com/nodejs/node/commit/a490bb8745)] - **src**：移除 uv\_\_node\_patch\_is\_using\_io\_uring (Santiago Gimeno) [#55114](https://github.com/nodejs/node/pull/55114)
* \[[`0da1632937`](https://github.com/nodejs/node/commit/0da1632937)] - **src,lib**：引入 `util.getSystemErrorMessage(err)` (Juan José) [#54075](https://github.com/nodejs/node/pull/54075)
* \[[`6764273127`](https://github.com/nodejs/node/commit/6764273127)] - **stream**：传递 AbortSignal 原因 (Marvin ROGER) [#55473](https://github.com/nodejs/node/pull/55473)
* \[[`4dc2791cdd`](https://github.com/nodejs/node/commit/4dc2791cdd)] - **test**：添加 repl 预览超时测试 (Chengzhong Wu) [#55484](https://github.com/nodejs/node/pull/55484)
* \[[`8634e054d4`](https://github.com/nodejs/node/commit/8634e054d4)] - **test**：让 test-node-output-v8-warning 更灵活 (Shelley Vohr) [#55401](https://github.com/nodejs/node/pull/55401)
* \[[`6c8564b55d`](https://github.com/nodejs/node/commit/6c8564b55d)] - **test**：修复 addons 和 node-api 测试假设 (Antoine du Hamel) [#55441](https://github.com/nodejs/node/pull/55441)
* \[[`94e863cdb7`](https://github.com/nodejs/node/commit/94e863cdb7)] - **test**：更新 webmessaging/broadcastchannel 的 wpt 测试 (devstone) [#55205](https://github.com/nodejs/node/pull/55205)
* \[[`c10c6715cd`](https://github.com/nodejs/node/commit/c10c6715cd)] - **test**：消除 `test-cluster-shared-handle-bind-privileged-port` 的不稳定性 (Aviv Keller) [#55378](https://github.com/nodejs/node/pull/55378)
* \[[`6f7379a048`](https://github.com/nodejs/node/commit/6f7379a048)] - **test**：修复 `test-fs-path-dir` 中无效的 `file:` URL (Antoine du Hamel) [#55454](https://github.com/nodejs/node/pull/55454)
* \[[`dd5a08d022`](https://github.com/nodejs/node/commit/dd5a08d022)] - **test**：更新 `console` wpt (Aviv Keller) [#55192](https://github.com/nodejs/node/pull/55192)
* \[[`9b7b4a6b25`](https://github.com/nodejs/node/commit/9b7b4a6b25)] - **test**：移除重复测试 (Luigi Pinca) [#55393](https://github.com/nodejs/node/pull/55393)
* \[[`eb2fab3da1`](https://github.com/nodejs/node/commit/eb2fab3da1)] - **test**：为 coverage 更新 test\_util.cc (minkyu\_kim) [#55291](https://github.com/nodejs/node/pull/55291)
* \[[`59923d137e`](https://github.com/nodejs/node/commit/59923d137e)] - **test**：更新 `compression` wpt (Aviv Keller) [#55191](https://github.com/nodejs/node/pull/55191)
* \[[`1b63a822ac`](https://github.com/nodejs/node/commit/1b63a822ac)] - **test,crypto**：更新 WebCryptoAPI WPT (Filip Skokan) [#55427](https://github.com/nodejs/node/pull/55427)
* \[[`97c6448f63`](https://github.com/nodejs/node/commit/97c6448f63)] - **test\_runner**：将 mockTimers 标记为稳定 (Erick Wendel) [#55398](https://github.com/nodejs/node/pull/55398)
* \[[`69ee56aacd`](https://github.com/nodejs/node/commit/69ee56aacd)] - **test\_runner**：为 mock timers 添加 scheduler.wait 支持 (Erick Wendel) [#55244](https://github.com/nodejs/node/pull/55244)
* \[[`d9f0407cf6`](https://github.com/nodejs/node/commit/d9f0407cf6)] - **test\_runner**：为 sourcemap 覆盖率要求 `--enable-source-maps` (Aviv Keller) [#55359](https://github.com/nodejs/node/pull/55359)
* \[[`2ac2c5a7e7`](https://github.com/nodejs/node/commit/2ac2c5a7e7)] - **tools**：更新 lint-md-dependencies (Node.js GitHub Bot) [#55470](https://github.com/nodejs/node/pull/55470)
* \[[`10f6b90f7d`](https://github.com/nodejs/node/commit/10f6b90f7d)] - **tools**：将 gyp-next 更新到 0.18.3 (Node.js GitHub Bot) [#55464](https://github.com/nodejs/node/pull/55464)
* \[[`65936a8bb6`](https://github.com/nodejs/node/commit/65936a8bb6)] - **tools**：添加同步 c-ares 源列表的脚本 (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
* \[[`1da4168486`](https://github.com/nodejs/node/commit/1da4168486)] - **tools**：为 `prefer-primordials` 规则添加 `polyfilled` 选项 (Antoine du Hamel) [#55318](https://github.com/nodejs/node/pull/55318)
* \[[`3b2b3a8df2`](https://github.com/nodejs/node/commit/3b2b3a8df2)] - **tools**：修复拼写错误 (Nathan Baulch) [#55061](https://github.com/nodejs/node/pull/55061)
* \[[`736c085a5d`](https://github.com/nodejs/node/commit/736c085a5d)] - **typings**：添加 `ArrayBufferPrototypeGetByteLength` 缺失的类型 (Wuli Zuo) [#55439](https://github.com/nodejs/node/pull/55439)
* \[[`7b3e38b855`](https://github.com/nodejs/node/commit/7b3e38b855)] - **url**：在 `pathToFileURL` 中正确处理“不安全”字符 (Antoine du Hamel) [#54545](https://github.com/nodejs/node/pull/54545)

<a id="23.0.0"></a>

## 2024-10-16，版本 23.0.0（当前），@RafaelGSS

我们很高兴地宣布 Node.js 23 正式发布！主要亮点包括：

* 默认启用 Node.js 应用程序的 `require(esm)`
* 移除对 Windows 32 位系统的支持
* 将 `node --run` 命令稳定化
* 对测试运行器的增强，包括对覆盖率文件的 glob 模式支持

当 Node.js 22 在本月晚些时候进入长期支持（LTS）时，Node.js 23 将取代 Node.js 22 成为“当前”发布线。
根据发布计划，Node.js 23 将在接下来的六个月内保持“当前”版本，直到 2025 年 4 月。

### 其他值得注意的变更

* \[[`7ad0cc3e57`](https://github.com/nodejs/node/commit/7ad0cc3e57)] - **(SEMVER-MAJOR)** **build**: 移除对 32 位 Windows 的支持 (Michaël Zasso) [#53184](https://github.com/nodejs/node/pull/53184)
* \[[`83eb4f2855`](https://github.com/nodejs/node/commit/83eb4f2855)] - **(SEMVER-MINOR)** **deps**: V8: cherry-pick cd10ad7cdbe5 (Joyee Cheung) [#52535](https://github.com/nodejs/node/pull/52535)
* \[[`b8493a5789`](https://github.com/nodejs/node/commit/b8493a5789)] - **doc**: 将 abmusse 添加为协作者 (Abdirahim Musse) [#55086](https://github.com/nodejs/node/pull/55086)
* \[[`7fab6e8885`](https://github.com/nodejs/node/commit/7fab6e8885)] - **(SEMVER-MAJOR)** **doc**: 在 AIX 上为 Node.js >=23 使用 gcc 12 (Richard Lau) [#54338](https://github.com/nodejs/node/pull/54338)
* \[[`d473606040`](https://github.com/nodejs/node/commit/d473606040)] - **(SEMVER-MINOR)** **lib**: 在触发事件之前将已中止状态传播到依赖信号 (jazelly) [#54826](https://github.com/nodejs/node/pull/54826)
* \[[`06206af181`](https://github.com/nodejs/node/commit/06206af181)] - **(SEMVER-MINOR)** **module**: 取消 `--experimental-require-module` 标记 (Joyee Cheung) [#55085](https://github.com/nodejs/node/pull/55085)
* \[[`0b9249e335`](https://github.com/nodejs/node/commit/0b9249e335)] - **(SEMVER-MINOR)** **module**: 实现 `"module-sync"` 导出条件 (Joyee Cheung) [#54648](https://github.com/nodejs/node/pull/54648)
* \[[`92a25abca9`](https://github.com/nodejs/node/commit/92a25abca9)] - **(SEMVER-MINOR)** **path**: 添加 `matchGlob` 方法 (Aviv Keller) [#52881](https://github.com/nodejs/node/pull/52881)
* \[[`12dd4c7575`](https://github.com/nodejs/node/commit/12dd4c7575)] - **src**: 将 node --run 标记为稳定 (Yagiz Nizipli) [#53763](https://github.com/nodejs/node/pull/53763)
* \[[`4174b73153`](https://github.com/nodejs/node/commit/4174b73153)] - **test**: 支持使用 glob 匹配覆盖率文件 (Aviv Keller) [#53553](https://github.com/nodejs/node/pull/53553)

### Semver-Major Commits

* \[[`764b13d75c`](https://github.com/nodejs/node/commit/764b13d75c)] - **(SEMVER-MAJOR)** **assert,util**: 更改 WeakMap 和 WeakSet 比较处理方式 (Cristian Barlutiu) [#53495](https://github.com/nodejs/node/pull/53495)
* \[[`3800d60c66`](https://github.com/nodejs/node/commit/3800d60c66)] - **(SEMVER-MAJOR)** **buffer**: 在写入超出 buffer 时抛出错误" (Robert Nagy) [#54588](https://github.com/nodejs/node/pull/54588)
* \[[`17fd32790a`](https://github.com/nodejs/node/commit/17fd32790a)] - **(SEMVER-MAJOR)** **buffer**: 使 File 可克隆 (Matthew Aitken) [#47613](https://github.com/nodejs/node/pull/47613)
* \[[`f68d7d2acc`](https://github.com/nodejs/node/commit/f68d7d2acc)] - **(SEMVER-MAJOR)** **build**: 将 embedder 字符串重置为 "-node.0" (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`9d0748c5df`](https://github.com/nodejs/node/commit/9d0748c5df)] - **(SEMVER-MAJOR)** **build**: 为 mksnapshot 禁用 ICF (Leszek Swirski) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`b7bcf3e121`](https://github.com/nodejs/node/commit/b7bcf3e121)] - **(SEMVER-MAJOR)** **build**: 在发行版中包含 v8-sandbox.h 头文件 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`1dfa3b8255`](https://github.com/nodejs/node/commit/1dfa3b8255)] - **(SEMVER-MAJOR)** **build**: 将 embedder 字符串重置为 "-node.0" (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`046343ea9d`](https://github.com/nodejs/node/commit/046343ea9d)] - **(SEMVER-MAJOR)** **build**: 对早于 12.2 的 GCC 版本发出警告 (Michaël Zasso) [#54081](https://github.com/nodejs/node/pull/54081)
* \[[`a5decd4c8d`](https://github.com/nodejs/node/commit/a5decd4c8d)] - **(SEMVER-MAJOR)** **build**: 放弃对 Windows <10 的实验性支持 (Michaël Zasso) [#54079](https://github.com/nodejs/node/pull/54079)
* \[[`7ad0cc3e57`](https://github.com/nodejs/node/commit/7ad0cc3e57)] - **(SEMVER-MAJOR)** **build**: 移除对 32 位 Windows 的支持 (Michaël Zasso) [#53184](https://github.com/nodejs/node/pull/53184)
* \[[`c7e42092f3`](https://github.com/nodejs/node/commit/c7e42092f3)] - **(SEMVER-MAJOR)** **build**: 使用 C++20 支持进行编译 (Michaël Zasso) [#45427](https://github.com/nodejs/node/pull/45427)
* \[[`e2b7e41e23`](https://github.com/nodejs/node/commit/e2b7e41e23)] - **(SEMVER-MAJOR)** **child_process**: 移除未使用的内部事件 (Rich Trott) [#53793](https://github.com/nodejs/node/pull/53793)
* \[[`4f1fe8a015`](https://github.com/nodejs/node/commit/4f1fe8a015)] - **(SEMVER-MAJOR)** **cli**: 移除已弃用的 V8 标志 (Omer Katz) [#54761](https://github.com/nodejs/node/pull/54761)
* \[[`8f37492b65`](https://github.com/nodejs/node/commit/8f37492b65)] - **(SEMVER-MAJOR)** **cli**: 将 --trace-atomics-wait 移至 eol (Marco Ippolito) [#52747](https://github.com/nodejs/node/pull/52747)
* \[[`f7e73cd1f2`](https://github.com/nodejs/node/commit/f7e73cd1f2)] - **(SEMVER-MAJOR)** **cli**: 移除 --no-experimental-global-customevent 标志 (Daeyeon Jeong) [#52723](https://github.com/nodejs/node/pull/52723)
* \[[`311504125f`](https://github.com/nodejs/node/commit/311504125f)] - **(SEMVER-MAJOR)** **cli**: 移除 --no-experimental-fetch 标志 (Filip Skokan) [#52611](https://github.com/nodejs/node/pull/52611)
* \[[`a30ae50860`](https://github.com/nodejs/node/commit/a30ae50860)] - **(SEMVER-MAJOR)** **cli**: 移除 --no-experimental-global-webcrypto 标志 (Filip Skokan) [#52564](https://github.com/nodejs/node/pull/52564)
* \[[`afe56aa58b`](https://github.com/nodejs/node/commit/afe56aa58b)] - **(SEMVER-MAJOR)** **crypto**: 在运行时弃用 crypto.fips (Yagiz Nizipli) [#55019](https://github.com/nodejs/node/pull/55019)
* \[[`33a6d1fe3a`](https://github.com/nodejs/node/commit/33a6d1fe3a)] - **(SEMVER-MAJOR)** **crypto**: 移除 ERR_CRYPTO_SCRYPT_INVALID_PARAMETER (Tobias Nießen) [#53305](https://github.com/nodejs/node/pull/53305)
* \[[`ff826069a8`](https://github.com/nodejs/node/commit/ff826069a8)] - **(SEMVER-MAJOR)** **crypto**: 将 DEP0182 移至运行时弃用 (Tobias Nießen) [#52552](https://github.com/nodejs/node/pull/52552)
* \[[`6e150f9527`](https://github.com/nodejs/node/commit/6e150f9527)] - **(SEMVER-MAJOR)** **deps**: V8: cherry-pick 97199f686e2f (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`1e16779fa1`](https://github.com/nodejs/node/commit/1e16779fa1)] - **(SEMVER-MAJOR)** **deps**: V8: cherry-pick 01a47f3ffff2 (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`762a440e68`](https://github.com/nodejs/node/commit/762a440e68)] - **(SEMVER-MAJOR)** **deps**: 修补 V8 以支持旧版本 Clang (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`95f2213eed`](https://github.com/nodejs/node/commit/95f2213eed)] - **(SEMVER-MAJOR)** **deps**: 始终将 V8_NODISCARD 定义为 no-op (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`09d997f181`](https://github.com/nodejs/node/commit/09d997f181)] - **(SEMVER-MAJOR)** **deps**: 修复 FP16 bitcasts.h (Stefan Stojanovic) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`1866363854`](https://github.com/nodejs/node/commit/1866363854)] - **(SEMVER-MAJOR)** **deps**: 修补 V8 以支持使用 MSVC 编译 (StefanStojanovic) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`6f4f22f84c`](https://github.com/nodejs/node/commit/6f4f22f84c)] - **(SEMVER-MAJOR)** **deps**: 修补 V8 以避免重复的 zlib 符号 (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`dfff61475e`](https://github.com/nodejs/node/commit/dfff61475e)] - **(SEMVER-MAJOR)** **deps**: 禁用 V8 并发 sparkplug 编译 (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`69ad89f8eb`](https://github.com/nodejs/node/commit/69ad89f8eb)] - **(SEMVER-MAJOR)** **deps**: 始终将 V8_EXPORT_PRIVATE 定义为 no-op (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`5ab3140dfb`](https://github.com/nodejs/node/commit/5ab3140dfb)] - **(SEMVER-MAJOR)** **deps**: 将 V8 更新到 12.9.202.18 (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`fba06eb34a`](https://github.com/nodejs/node/commit/fba06eb34a)] - **(SEMVER-MAJOR)** **deps**: 移除错误的 V8 DCHECK (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`5355603fb5`](https://github.com/nodejs/node/commit/5355603fb5)] - **(SEMVER-MAJOR)** **deps**: V8: cherry-pick 00e9eeb3fb2c (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`bcc1e2716c`](https://github.com/nodejs/node/commit/bcc1e2716c)] - **(SEMVER-MAJOR)** **deps**: V8: cherry-pick b1397772c70c (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`415bc750a5`](https://github.com/nodejs/node/commit/415bc750a5)] - **(SEMVER-MAJOR)** **deps**: V8: cherry-pick 35888fee7bba (Joyee Cheung) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`28f3e5c9d1`](https://github.com/nodejs/node/commit/28f3e5c9d1)] - **(SEMVER-MAJOR)** **deps**: 始终将 V8_NODISCARD 定义为 no-op (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`a41c381cde`](https://github.com/nodejs/node/commit/a41c381cde)] - **(SEMVER-MAJOR)** **deps**: 修复 FP16 bitcasts.h (Stefan Stojanovic) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`16c9348e60`](https://github.com/nodejs/node/commit/16c9348e60)] - **(SEMVER-MAJOR)** **deps**: V8: 回退 CL 5331688 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`dc4e702a45`](https://github.com/nodejs/node/commit/dc4e702a45)] - **(SEMVER-MAJOR)** **deps**: 修补 V8 以支持使用 MSVC 编译 (StefanStojanovic) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`f626acc328`](https://github.com/nodejs/node/commit/f626acc328)] - **(SEMVER-MAJOR)** **deps**: 消除内部 V8 弃用警告 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`ed187faa64`](https://github.com/nodejs/node/commit/ed187faa64)] - **(SEMVER-MAJOR)** **deps**: 修补 V8 以避免重复的 zlib 符号 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`ed029bded7`](https://github.com/nodejs/node/commit/ed029bded7)] - **(SEMVER-MAJOR)** **deps**: 避免与 ASan 的编译错误 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`e600de93cf`](https://github.com/nodejs/node/commit/e600de93cf)] - **(SEMVER-MAJOR)** **deps**: 禁用 V8 并发 sparkplug 编译 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`cc36db7c06`](https://github.com/nodejs/node/commit/cc36db7c06)] - **(SEMVER-MAJOR)** **deps**: 始终将 V8_EXPORT_PRIVATE 定义为 no-op (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`9d7cd9b864`](https://github.com/nodejs/node/commit/9d7cd9b864)] - **(SEMVER-MAJOR)** **deps**: 将 V8 更新到 12.8.374.13 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`4f70132972`](https://github.com/nodejs/node/commit/4f70132972)] - **(SEMVER-MAJOR)** **doc**: 反映官方二进制文件所使用的工具链 (Richard Lau) [#54967](https://github.com/nodejs/node/pull/54967)
* \[[`7fab6e8885`](https://github.com/nodejs/node/commit/7fab6e8885)] - **(SEMVER-MAJOR)** **doc**: 在 AIX 上为 Node.js >=23 使用 gcc 12 (Richard Lau) [#54338](https://github.com/nodejs/node/pull/54338)
* \[[`1d5ed725e9`](https://github.com/nodejs/node/commit/1d5ed725e9)] - **(SEMVER-MAJOR)** **esm**: 在 ESM CJS 包装器上导出 'module.exports' (Guy Bedford) [#53848](https://github.com/nodejs/node/pull/53848)
* \[[`d5c29ba12d`](https://github.com/nodejs/node/commit/d5c29ba12d)] - **(SEMVER-MAJOR)** **events**: 将 EventEmitterAsyncResource 字段设为私有 (Yagiz Nizipli) [#54889](https://github.com/nodejs/node/pull/54889)
* \[[`f202322ea4`](https://github.com/nodejs/node/commit/f202322ea4)] - **(SEMVER-MAJOR)** **fs**: 调整 `fs.symlink()` 中 `type` 的类型检查 (Livia Medeiros) [#49741](https://github.com/nodejs/node/pull/49741)
* \[[`15e7563062`](https://github.com/nodejs/node/commit/15e7563062)] - **(SEMVER-MAJOR)** **fs**: 在运行时弃用 `dirent.path` (Antoine du Hamel) [#51050](https://github.com/nodejs/node/pull/51050)
* \[[`00b2f07f9d`](https://github.com/nodejs/node/commit/00b2f07f9d)] - **(SEMVER-MAJOR)** **fs,win**: 修复带有尾随斜杠的路径中的错误 (Hüseyin Açacak) [#54160](https://github.com/nodejs/node/pull/54160)
* \[[`e973c3e94b`](https://github.com/nodejs/node/commit/e973c3e94b)] - **(SEMVER-MAJOR)** **lib**: 使用接口转换器验证信号 (Jason Zhang) [#54965](https://github.com/nodejs/node/pull/54965)
* \[[`a5a946d8a5`](https://github.com/nodejs/node/commit/a5a946d8a5)] - **(SEMVER-MAJOR)** **lib**: 在 webidl 中实现接口转换器 (Jason Zhang) [#54965](https://github.com/nodejs/node/pull/54965)
* \[[`6ed93b4d69`](https://github.com/nodejs/node/commit/6ed93b4d69)] - **(SEMVER-MAJOR)** **lib**: 暴露全局 CloseEvent (Matthew Aitken) [#53355](https://github.com/nodejs/node/pull/53355)
* \[[`52322aa42a`](https://github.com/nodejs/node/commit/52322aa42a)] - **(SEMVER-MAJOR)** **net**: 为 server listen 验证主机名 (Jason Zhang) [#54470](https://github.com/nodejs/node/pull/54470)
* \[[`efbba60e5b`](https://github.com/nodejs/node/commit/efbba60e5b)] - **(SEMVER-MAJOR)** **path**: 修复错误和不一致之处 (Hüseyin Açacak) [#54224](https://github.com/nodejs/node/pull/54224)
* \[[`c237eabf4c`](https://github.com/nodejs/node/commit/c237eabf4c)] - **(SEMVER-MAJOR)** **process**: 移除 `process.assert` (Aviv Keller) [#55035](https://github.com/nodejs/node/pull/55035)
* \[[`17a17164d6`](https://github.com/nodejs/node/commit/17a17164d6)] - **(SEMVER-MAJOR)** **src**: 将 NODE_MODULE_VERSION 更新为 131 (Michaël Zasso) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`f0134fa6c3`](https://github.com/nodejs/node/commit/f0134fa6c3)] - **(SEMVER-MAJOR)** **src**: 停止使用 `v8::FastApiCallbackOptions` 的已弃用字段 (Andreas Haas) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`0be79f4deb`](https://github.com/nodejs/node/commit/0be79f4deb)] - **(SEMVER-MAJOR)** **src**: 移除对基于 wrapper-descriptor 的 CppHeap 的依赖 (Joyee Cheung) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`525b3f22d1`](https://github.com/nodejs/node/commit/525b3f22d1)] - **(SEMVER-MAJOR)** **src**: 为 v8::TaskRunner 添加源位置 (François Doray) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`e945bd9525`](https://github.com/nodejs/node/commit/e945bd9525)] - **(SEMVER-MAJOR)** **src**: 将 NODE_MODULE_VERSION 更新为 129 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`bb8d2936ab`](https://github.com/nodejs/node/commit/bb8d2936ab)] - **(SEMVER-MAJOR)** **src**: 不再使用即将弃用的 V8 API (Igor Sheludko) [#53174](https://github.com/nodejs/node/pull/53174)
* \[[`75884678d7`](https://github.com/nodejs/node/commit/75884678d7)] - **(SEMVER-MAJOR)** **src**: 为 pipe_wrap.cc 中的 bind 添加 UV_PIPE_NO_TRUNCATE (theanarkh) [#52347](https://github.com/nodejs/node/pull/52347)
* \[[`922feb1ff5`](https://github.com/nodejs/node/commit/922feb1ff5)] - **(SEMVER-MAJOR)** **stream**: 在 pipeline 中不允许将数据管道传输到已关闭或已销毁的流 (jakecastelli) [#53241](https://github.com/nodejs/node/pull/53241)
* \[[`ffe0dc5b87`](https://github.com/nodejs/node/commit/ffe0dc5b87)] - **(SEMVER-MAJOR)** **string_decoder**: 重构编码校验 (Yagiz Nizipli) [#54957](https://github.com/nodejs/node/pull/54957)
* \[[`df9efba2ce`](https://github.com/nodejs/node/commit/df9efba2ce)] - **(SEMVER-MAJOR)** **test**: 为 V8 12.6 更新 v8-stats 测试 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`dbaef339aa`](https://github.com/nodejs/node/commit/dbaef339aa)] - **(SEMVER-MAJOR)** **test_runner**: 当未使用 --test 时仅检测测试 (Colin Ihrig) [#54881](https://github.com/nodejs/node/pull/54881)
* \[[`eb7e18fe94`](https://github.com/nodejs/node/commit/eb7e18fe94)] - **(SEMVER-MAJOR)** **test_runner**: 始终将 spec 设为默认报告器 (Colin Ihrig) [#54548](https://github.com/nodejs/node/pull/54548)
* \[[`0db38f0f99`](https://github.com/nodejs/node/commit/0db38f0f99)] - **(SEMVER-MAJOR)** **test_runner**: 将 lcov 报告器暴露为可实例化函数 (Chemi Atlow) [#52403](https://github.com/nodejs/node/pull/52403)
* \[[`f5ed3386fd`](https://github.com/nodejs/node/commit/f5ed3386fd)] - **(SEMVER-MAJOR)** **timers**: 如果 delay 为负数或 NaN，则发出警告 (jakecastelli) [#46678](https://github.com/nodejs/node/pull/46678)
* \[[`f666a1b754`](https://github.com/nodejs/node/commit/f666a1b754)] - **(SEMVER-MAJOR)** **tls**: 修复 'ERR_TLS_PSK_SET_IDENTIY_HINT_FAILED' 拼写错误 (Aviv Keller) [#52627](https://github.com/nodejs/node/pull/52627)
* \[[`c8c108f9b0`](https://github.com/nodejs/node/commit/c8c108f9b0)] - **(SEMVER-MAJOR)** **tools**: 为 AIX 上的 V8 添加额外的 include 目录 (Abdirahim Musse) [#54536](https://github.com/nodejs/node/pull/54536)
* \[[`64e8646618`](https://github.com/nodejs/node/commit/64e8646618)] - **(SEMVER-MAJOR)** **tools**: 将 V8 gypfiles 更新到 12.8 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`dc352a5ff2`](https://github.com/nodejs/node/commit/dc352a5ff2)] - **(SEMVER-MAJOR)** **tools**: 将 V8 gypfiles 更新到 12.7 (Richard Lau) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`8044051ce3`](https://github.com/nodejs/node/commit/8044051ce3)] - **(SEMVER-MAJOR)** **tools**: 将 V8 gypfiles 更新到 12.6 (Michaël Zasso) [#54077](https://github.com/nodejs/node/pull/54077)
* \[[`982f6ad516`](https://github.com/nodejs/node/commit/982f6ad516)] - **(SEMVER-MAJOR)** **util**: 将 util.log 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`1d817dcb52`](https://github.com/nodejs/node/commit/1d817dcb52)] - **(SEMVER-MAJOR)** **util**: 将 util.isPrimitive 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`72240942ed`](https://github.com/nodejs/node/commit/72240942ed)] - **(SEMVER-MAJOR)** **util**: 将 util.isFunction 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`dc379626ab`](https://github.com/nodejs/node/commit/dc379626ab)] - **(SEMVER-MAJOR)** **util**: 将 util.isError 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`b5cae4fea6`](https://github.com/nodejs/node/commit/b5cae4fea6)] - **(SEMVER-MAJOR)** **util**: 将 util.isDate 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`bd559e3e5a`](https://github.com/nodejs/node/commit/bd559e3e5a)] - **(SEMVER-MAJOR)** **util**: 将 util.isObject 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`d3068b9cfa`](https://github.com/nodejs/node/commit/d3068b9cfa)] - **(SEMVER-MAJOR)** **util**: 将 util.isRegExp 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`a59c7aeb27`](https://github.com/nodejs/node/commit/a59c7aeb27)] - **(SEMVER-MAJOR)** **util**: 将 util.isUndefined 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`05e72c939a`](https://github.com/nodejs/node/commit/05e72c939a)] - **(SEMVER-MAJOR)** **util**: 将 util.isSymbol 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`832a77c003`](https://github.com/nodejs/node/commit/832a77c003)] - **(SEMVER-MAJOR)** **util**: 将 util.isString 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`708f57ea49`](https://github.com/nodejs/node/commit/708f57ea49)] - **(SEMVER-MAJOR)** **util**: 将 util.isNumber 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`6ec403fe91`](https://github.com/nodejs/node/commit/6ec403fe91)] - **(SEMVER-MAJOR)** **util**: 将 util.isNullOrUndefined 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`7cd8bb26d1`](https://github.com/nodejs/node/commit/7cd8bb26d1)] - **(SEMVER-MAJOR)** **util**: 将 util.isNull 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`e32b0c1eab`](https://github.com/nodejs/node/commit/e32b0c1eab)] - **(SEMVER-MAJOR)** **util**: 将 util.isBuffer 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`be528ab11e`](https://github.com/nodejs/node/commit/be528ab11e)] - **(SEMVER-MAJOR)** **util**: 将 util.isBoolean 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`ac97a532f5`](https://github.com/nodejs/node/commit/ac97a532f5)] - **(SEMVER-MAJOR)** **util**: 将 util._extend 移至 eol (marco-ippolito) [#52744](https://github.com/nodejs/node/pull/52744)
* \[[`e225f00034`](https://github.com/nodejs/node/commit/e225f00034)] - **(SEMVER-MAJOR)** **zlib**: 移除 `zlib.bytesRead` (Yagiz Nizipli) [#55020](https://github.com/nodejs/node/pull/55020)

### Semver-Minor Commits

* \[[`90e3e5e173`](https://github.com/nodejs/node/commit/90e3e5e173)] - **(SEMVER-MINOR)** **crypto**: 添加 KeyObject.prototype.toCryptoKey (Filip Skokan) [#55262](https://github.com/nodejs/node/pull/55262)
* \[[`29f31c6a76`](https://github.com/nodejs/node/commit/29f31c6a76)] - **(SEMVER-MINOR)** **crypto**: 为 `validTo` 和 `validFrom` 添加 Date 字段 (Andrew Moon) [#54159](https://github.com/nodejs/node/pull/54159)
* \[[`83eb4f2855`](https://github.com/nodejs/node/commit/83eb4f2855)] - **(SEMVER-MINOR)** **deps**: V8: cherry-pick cd10ad7cdbe5 (Joyee Cheung) [#52535](https://github.com/nodejs/node/pull/52535)
* \[[`6c6562ce8b`](https://github.com/nodejs/node/commit/6c6562ce8b)] - **(SEMVER-MINOR)** **http2**: 将 nghttp2_option_set_stream_reset_rate_limit 作为选项暴露 (Maël Nison) [#54875](https://github.com/nodejs/node/pull/54875)
* \[[`d473606040`](https://github.com/nodejs/node/commit/d473606040)] - **(SEMVER-MINOR)** **lib**: 在触发事件之前将已中止状态传播到依赖信号 (jazelly) [#54826](https://github.com/nodejs/node/pull/54826)
* \[[`772b35bdc4`](https://github.com/nodejs/node/commit/772b35bdc4)] - **(SEMVER-MINOR)** **module**: 支持将入口点作为 url 加载 (RedYetiDev) [#54933](https://github.com/nodejs/node/pull/54933)
* \[[`06206af181`](https://github.com/nodejs/node/commit/06206af181)] - **(SEMVER-MINOR)** **module**: 取消 `--experimental-require-module` 标记 (Joyee Cheung) [#55085](https://github.com/nodejs/node/pull/55085)
* \[[`0b9249e335`](https://github.com/nodejs/node/commit/0b9249e335)] - **(SEMVER-MINOR)** **module**: 实现 `"module-sync"` 导出条件 (Joyee Cheung) [#54648](https://github.com/nodejs/node/pull/54648)
* \[[`62383cd113`](https://github.com/nodejs/node/commit/62383cd113)] - **(SEMVER-MINOR)** **module**: 实现 flushCompileCache() (Joyee Cheung) [#54971](https://github.com/nodejs/node/pull/54971)
* \[[`4dfed556ba`](https://github.com/nodejs/node/commit/4dfed556ba)] - **(SEMVER-MINOR)** **module**: 当向 enableCompileCache() 传入无效参数时抛出错误 (Joyee Cheung) [#54971](https://github.com/nodejs/node/pull/54971)
* \[[`9a73aa0d15`](https://github.com/nodejs/node/commit/9a73aa0d15)] - **(SEMVER-MINOR)** **module**: 将编译缓存写入临时文件，然后重命名 (Joyee Cheung) [#54971](https://github.com/nodejs/node/pull/54971)
* \[[`92a25abca9`](https://github.com/nodejs/node/commit/92a25abca9)] - **(SEMVER-MINOR)** **path**: 添加 `matchGlob` 方法 (Aviv Keller) [#52881](https://github.com/nodejs/node/pull/52881)
* \[[`b0f025208f`](https://github.com/nodejs/node/commit/b0f025208f)] - **(SEMVER-MINOR)** **process**: 添加 process.features.require_module (Joyee Cheung) [#55241](https://github.com/nodejs/node/pull/55241)
* \[[`bf11e5793b`](https://github.com/nodejs/node/commit/bf11e5793b)] - **(SEMVER-MINOR)** **test_runner**: 在 `run()` 中支持自定义参数 (Aviv Keller) [#55126](https://github.com/nodejs/node/pull/55126)
* \[[`059e08bb21`](https://github.com/nodejs/node/commit/059e08bb21)] - **(SEMVER-MINOR)** **test_runner**: 添加 'test:summary' 事件 (Colin Ihrig) [#54851](https://github.com/nodejs/node/pull/54851)
* \[[`f79fd03f41`](https://github.com/nodejs/node/commit/f79fd03f41)] - **(SEMVER-MINOR)** **test_runner**: 添加通过 run() 支持覆盖率 (Chemi Atlow) [#53937](https://github.com/nodejs/node/pull/53937)
* \[[`d2ad9b4fb6`](https://github.com/nodejs/node/commit/d2ad9b4fb6)] - **(SEMVER-MINOR)** **worker**: 添加 `markAsUncloneable` API (Jason Zhang) [#55234](https://github.com/nodejs/node/pull/55234)

### Semver-Patch Commits

* \[[`e1d8b4f038`](https://github.com/nodejs/node/commit/e1d8b4f038)] - **assert**: 在使用自定义消息进行深度比较数据时显示 diff（Giovanni） [#54759](https://github.com/nodejs/node/pull/54759)
* \[[`4eeeab09f0`](https://github.com/nodejs/node/commit/4eeeab09f0)] - **benchmark**: 重写 detect-esm-syntax 基准测试（Joyee Cheung） [#55238](https://github.com/nodejs/node/pull/55238)
* \[[`834316d541`](https://github.com/nodejs/node/commit/834316d541)] - **benchmark**: 为 process.has 基准添加 no-warnings（Rafael Gonzaga） [#55159](https://github.com/nodejs/node/pull/55159)
* \[[`00d4f8073c`](https://github.com/nodejs/node/commit/00d4f8073c)] - **benchmark**: 为 typescript 创建基准测试（Marco Ippolito） [#54904](https://github.com/nodejs/node/pull/54904)
* \[[`96ec7eede9`](https://github.com/nodejs/node/commit/96ec7eede9)] - **benchmark**: 添加 webstorage 基准测试（jakecastelli） [#55040](https://github.com/nodejs/node/pull/55040)
* \[[`29357cb0ef`](https://github.com/nodejs/node/commit/29357cb0ef)] - **benchmark**: 包含 ascii 到 fs/readfile（Rafael Gonzaga） [#54988](https://github.com/nodejs/node/pull/54988)
* \[[`53cba82e55`](https://github.com/nodejs/node/commit/53cba82e55)] - **benchmark**: 添加 dotenv 基准测试（Aviv Keller） [#54278](https://github.com/nodejs/node/pull/54278)
* \[[`4062b3fb43`](https://github.com/nodejs/node/commit/4062b3fb43)] - **buffer**: 在 `blob.slice` 中将边界值强制转换为 int（Antoine du Hamel） [#55141](https://github.com/nodejs/node/pull/55141)
* \[[`f805d0be95`](https://github.com/nodejs/node/commit/f805d0be95)] - **buffer**: 正确将原型应用于克隆的 `File` / `Blob`（Aviv Keller） [#55138](https://github.com/nodejs/node/pull/55138)
* \[[`da5887d8e9`](https://github.com/nodejs/node/commit/da5887d8e9)] - **buffer**: 提取 Blob 的 `.arrayBuffer()` 和 webidl 变更（Matthew Aitken） [#53372](https://github.com/nodejs/node/pull/53372)
* \[[`0d4387ebe2`](https://github.com/nodejs/node/commit/0d4387ebe2)] - **buffer**: 使用 simdutf convert\_latin1\_to\_utf8\_safe（Robert Nagy） [#54798](https://github.com/nodejs/node/pull/54798)
* \[[`ae1e2b53b7`](https://github.com/nodejs/node/commit/ae1e2b53b7)] - **build**: 修复 notify-on-review-wanted 操作（Rafael Gonzaga） [#55304](https://github.com/nodejs/node/pull/55304)
* \[[`22bc15764b`](https://github.com/nodejs/node/commit/22bc15764b)] - **build**: 在 coverage 工作流中包含 `.nycrc`（Wuli Zuo） [#55210](https://github.com/nodejs/node/pull/55210)
* \[[`28ffa4b751`](https://github.com/nodejs/node/commit/28ffa4b751)] - **build**: 修复 coverage 中无效的 json（jakecastelli） [#55179](https://github.com/nodejs/node/pull/55179)
* \[[`1398c04c47`](https://github.com/nodejs/node/commit/1398c04c47)] - **build**: 在 review-wanted 时通过 slack 通知（Rafael Gonzaga） [#55102](https://github.com/nodejs/node/pull/55102)
* \[[`b2c42dbcbb`](https://github.com/nodejs/node/commit/b2c42dbcbb)] - **build**: 为 Makefile 帮助信息添加更多内容（Aviv Keller） [#53381](https://github.com/nodejs/node/pull/53381)
* \[[`a1cd3c8777`](https://github.com/nodejs/node/commit/a1cd3c8777)] - **build**: 更新 ruff 并添加 `lint-py-fix`（Aviv Keller） [#54410](https://github.com/nodejs/node/pull/54410)
* \[[`6a6c957be7`](https://github.com/nodejs/node/commit/6a6c957be7)] - **build**: 移除 -v 标志以减少噪音（iwuliz） [#55025](https://github.com/nodejs/node/pull/55025)
* \[[`5f6bb7d007`](https://github.com/nodejs/node/commit/5f6bb7d007)] - **build**: 在 test-macOS 工作流的构建后显示可用磁盘空间（iwuliz） [#55025](https://github.com/nodejs/node/pull/55025)
* \[[`415b82d8b8`](https://github.com/nodejs/node/commit/415b82d8b8)] - **build**: 在 android-configure 中支持最高到 python 3.13（Aviv Keller） [#54529](https://github.com/nodejs/node/pull/54529)
* \[[`beb1892036`](https://github.com/nodejs/node/commit/beb1892036)] - **build**: 在 vcbuild.bat 中添加生成 compile\_commands.json 的选项（Segev Finer） [#52279](https://github.com/nodejs/node/pull/52279)
* \[[`81cc72996a`](https://github.com/nodejs/node/commit/81cc72996a)] - **build**: 修复 eslint makefile 目标（Aviv Keller） [#54999](https://github.com/nodejs/node/pull/54999)
* \[[`7e00be7650`](https://github.com/nodejs/node/commit/7e00be7650)] - _**Revert**_ "**build**: 将 clang-format 升级到 v18"（Chengzhong Wu） [#54994](https://github.com/nodejs/node/pull/54994)
* \[[`96e057093f`](https://github.com/nodejs/node/commit/96e057093f)] - **build**: 为 py 和 yml 打印 `Running XYZ linter...`（Aviv Keller） [#54386](https://github.com/nodejs/node/pull/54386)
* \[[`ab5e58bf29`](https://github.com/nodejs/node/commit/ab5e58bf29)] - _**Revert**_ "**build**: 仅生成指定构建类型文件"（Chengzhong Wu） [#53580](https://github.com/nodejs/node/pull/53580)
* \[[`6cb940a546`](https://github.com/nodejs/node/commit/6cb940a546)] - **build**: 仅生成指定构建类型文件（Chengzhong Wu） [#53511](https://github.com/nodejs/node/pull/53511)
* \[[`27f8d9e9d2`](https://github.com/nodejs/node/commit/27f8d9e9d2)] - **build,win**: 为 clang-cl 启用 pch（Stefan Stojanovic） [#55249](https://github.com/nodejs/node/pull/55249)
* \[[`bbf08c6a1b`](https://github.com/nodejs/node/commit/bbf08c6a1b)] - **build,win**: 添加 winget 配置以设置环境（Hüseyin Açacak） [#54729](https://github.com/nodejs/node/pull/54729)
* \[[`653b96527a`](https://github.com/nodejs/node/commit/653b96527a)] - **build,win**: 浮动 VS 17.11 编译补丁（Stefan Stojanovic） [#54970](https://github.com/nodejs/node/pull/54970)
* \[[`0c5fa57bc7`](https://github.com/nodejs/node/commit/0c5fa57bc7)] - **cli**: 确保 --run 具有正确的 pwd（Yagiz Nizipli） [#54949](https://github.com/nodejs/node/pull/54949)
* \[[`65768bca59`](https://github.com/nodejs/node/commit/65768bca59)] - **cli**: 修复端口范围错误的间距（Aviv Keller） [#54495](https://github.com/nodejs/node/pull/54495)
* \[[`2d77ba5d30`](https://github.com/nodejs/node/commit/2d77ba5d30)] - _**Revert**_ "**console**: 将 console error 和 warn 着色"（Aviv Keller） [#54677](https://github.com/nodejs/node/pull/54677)
* \[[`b64006c0ed`](https://github.com/nodejs/node/commit/b64006c0ed)] - **crypto**: 确保无效的 SubtleCrypto JWK 数据导入会产生 DataError（Filip Skokan） [#55041](https://github.com/nodejs/node/pull/55041)
* \[[`7a3027d563`](https://github.com/nodejs/node/commit/7a3027d563)] - **deps**: 将 undici 更新到 6.20.0（Node.js GitHub Bot） [#55329](https://github.com/nodejs/node/pull/55329)
* \[[`54b5ec94e0`](https://github.com/nodejs/node/commit/54b5ec94e0)] - **deps**: 将 V8 补丁更新到 12.9.202.26（Node.js GitHub Bot） [#55161](https://github.com/nodejs/node/pull/55161)
* \[[`20d8b85d34`](https://github.com/nodejs/node/commit/20d8b85d34)] - **deps**: 将 npm 升级到 10.9.0（npm team） [#55255](https://github.com/nodejs/node/pull/55255)
* \[[`fe45be207b`](https://github.com/nodejs/node/commit/fe45be207b)] - **deps**: V8：回移植 0d5d6e71bbb0（Yagiz Nizipli） [#55115](https://github.com/nodejs/node/pull/55115)
* \[[`5ff9b072b2`](https://github.com/nodejs/node/commit/5ff9b072b2)] - **deps**: 为 openssl-3.0.15+quic1 更新 archs 文件（Node.js GitHub Bot） [#55184](https://github.com/nodejs/node/pull/55184)
* \[[`302e6afe8c`](https://github.com/nodejs/node/commit/302e6afe8c)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.15+quic1（Node.js GitHub Bot） [#55184](https://github.com/nodejs/node/pull/55184)
* \[[`5f78e2c880`](https://github.com/nodejs/node/commit/5f78e2c880)] - **deps**: 将时区数据更新到 2024b（Node.js GitHub Bot） [#55056](https://github.com/nodejs/node/pull/55056)
* \[[`5ed3296051`](https://github.com/nodejs/node/commit/5ed3296051)] - **deps**: 将 V8 补丁更新到 12.9.202.19（Node.js GitHub Bot） [#55057](https://github.com/nodejs/node/pull/55057)
* \[[`a6ece28604`](https://github.com/nodejs/node/commit/a6ece28604)] - **deps**: 将 acorn-walk 更新到 8.3.4（Node.js GitHub Bot） [#54950](https://github.com/nodejs/node/pull/54950)
* \[[`a428b21066`](https://github.com/nodejs/node/commit/a428b21066)] - **deps**: 将 corepack 更新到 0.29.4（Node.js GitHub Bot） [#54845](https://github.com/nodejs/node/pull/54845)
* \[[`260f1f4608`](https://github.com/nodejs/node/commit/260f1f4608)] - **deps**: 将 V8 补丁更新到 12.8.374.33（Node.js GitHub Bot） [#54952](https://github.com/nodejs/node/pull/54952)
* \[[`b887942e6b`](https://github.com/nodejs/node/commit/b887942e6b)] - **deps**: 将 V8 补丁更新到 12.8.374.32（Node.js GitHub Bot） [#54884](https://github.com/nodejs/node/pull/54884)
* \[[`9087056060`](https://github.com/nodejs/node/commit/9087056060)] - **deps**: 将 V8 补丁更新到 12.8.374.31（Michaël Zasso） [#54682](https://github.com/nodejs/node/pull/54682)
* \[[`6bce6f69c6`](https://github.com/nodejs/node/commit/6bce6f69c6)] - _**Revert**_ "**deps**: 移除错误的 V8 DCHECK"（Michaël Zasso） [#54682](https://github.com/nodejs/node/pull/54682)
* \[[`0c771c35fa`](https://github.com/nodejs/node/commit/0c771c35fa)] - **deps**: 将 V8 补丁更新到 12.8.374.22（Node.js GitHub Bot） [#54435](https://github.com/nodejs/node/pull/54435)
* \[[`543d1a9cb9`](https://github.com/nodejs/node/commit/543d1a9cb9)] - **deps**: 为 openssl-3.0.14+quic1 更新 archs 文件（Node.js GitHub Bot） [#54336](https://github.com/nodejs/node/pull/54336)
* \[[`94d062bc78`](https://github.com/nodejs/node/commit/94d062bc78)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.14+quic1（Node.js GitHub Bot） [#54336](https://github.com/nodejs/node/pull/54336)
* \[[`8e33f20a64`](https://github.com/nodejs/node/commit/8e33f20a64)] - _**Revert**_ "**deps**: V8：cherry-pick 9ebca66a5740"（Joyee Cheung） [#53582](https://github.com/nodejs/node/pull/53582)
* \[[`4c730aed7f`](https://github.com/nodejs/node/commit/4c730aed7f)] - **deps**: V8：cherry-pick 9ebca66a5740（Chengzhong Wu） [#53522](https://github.com/nodejs/node/pull/53522)
* \[[`e9904fe49a`](https://github.com/nodejs/node/commit/e9904fe49a)] - **doc**: 编辑 onboarding 指南以说明何时需要添加 mailmap（Antoine du Hamel） [#55334](https://github.com/nodejs/node/pull/55334)
* \[[`acd698a5c8`](https://github.com/nodejs/node/commit/acd698a5c8)] - **doc**: 修正 outgoingMessage.setHeaders() 的返回类型（Jimmy Leung） [#55290](https://github.com/nodejs/node/pull/55290)
* \[[`d620755661`](https://github.com/nodejs/node/commit/d620755661)] - **doc**: 为 aduh95 添加 release key（Antoine du Hamel） [#55349](https://github.com/nodejs/node/pull/55349)
* \[[`4a3fffaf58`](https://github.com/nodejs/node/commit/4a3fffaf58)] - **doc**: 将 `ERR_INVALID_PERFORMANCE_MARK` 移到 legacy errors（Antoine du Hamel） [#55247](https://github.com/nodejs/node/pull/55247)
* \[[`e79ae1bf0c`](https://github.com/nodejs/node/commit/e79ae1bf0c)] - **doc**: 为 Electron 34 预留 132（Michaela Laurencin） [#55306](https://github.com/nodejs/node/pull/55306)
* \[[`33fe88a0b3`](https://github.com/nodejs/node/commit/33fe88a0b3)] - **doc**: 将 pmarchini 添加为 collaborators（Pietro Marchini） [#55331](https://github.com/nodejs/node/pull/55331)
* \[[`755b89772d`](https://github.com/nodejs/node/commit/755b89772d)] - **doc**: 修复使用 `AbortSignal` 的 `events.once()` 示例（Ivo Janssen） [#55144](https://github.com/nodejs/node/pull/55144)
* \[[`accb239272`](https://github.com/nodejs/node/commit/accb239272)] - **doc**: 添加 ambassador program 的 onboarding 细节（Marco Ippolito） [#55284](https://github.com/nodejs/node/pull/55284)
* \[[`a301596c41`](https://github.com/nodejs/node/commit/a301596c41)] - **doc**: 将 `ERR_NAPI_TSFN_START/STOP_IDLE_LOOP` 移到 legacy errors（Antoine du Hamel） [#55248](https://github.com/nodejs/node/pull/55248)
* \[[`32efeea0c0`](https://github.com/nodejs/node/commit/32efeea0c0)] - **doc**: 修复 autoSelectFamily 的初始默认值（Ihor Rohovets） [#55245](https://github.com/nodejs/node/pull/55245)
* \[[`cc9b9a7f70`](https://github.com/nodejs/node/commit/cc9b9a7f70)] - **doc**: 调整 onboarding 说明（Michael Dawson） [#55212](https://github.com/nodejs/node/pull/55212)
* \[[`c9cffb73b3`](https://github.com/nodejs/node/commit/c9cffb73b3)] - **doc**: 更新 test context.assert（Pietro Marchini） [#55186](https://github.com/nodejs/node/pull/55186)
* \[[`348d865652`](https://github.com/nodejs/node/commit/348d865652)] - **doc**: 更新 `require(ESM)` 历史和稳定性状态（Antoine du Hamel） [#55199](https://github.com/nodejs/node/pull/55199)
* \[[`14b53df33c`](https://github.com/nodejs/node/commit/14b53df33c)] - **doc**: 修复无序的错误锚点（Antoine du Hamel） [#55242](https://github.com/nodejs/node/pull/55242)
* \[[`dec10991e7`](https://github.com/nodejs/node/commit/dec10991e7)] - **doc**: 在实验性权限中提及 addons（Rafael Gonzaga） [#55166](https://github.com/nodejs/node/pull/55166)
* \[[`cebf21dfa5`](https://github.com/nodejs/node/commit/cebf21dfa5)] - **doc**: 在稳定性状态中使用正确的破折号（Antoine du Hamel） [#55200](https://github.com/nodejs/node/pull/55200)
* \[[`0f02810fc9`](https://github.com/nodejs/node/commit/0f02810fc9)] - **doc**: 修复 `test/README.md` 中的链接（Livia Medeiros） [#55165](https://github.com/nodejs/node/pull/55165)
* \[[`22b4b7c626`](https://github.com/nodejs/node/commit/22b4b7c626)] - **doc**: 修复拼写错误（Nathan Baulch） [#55066](https://github.com/nodejs/node/pull/55066)
* \[[`e6427e1d87`](https://github.com/nodejs/node/commit/e6427e1d87)] - **doc**: 向 node:net 添加 esm 示例（Alfredo González） [#55134](https://github.com/nodejs/node/pull/55134)
* \[[`6d1cd506b5`](https://github.com/nodejs/node/commit/6d1cd506b5)] - **doc**: 移除过时的 https 导入引用（Edigleysson Silva (Edy)） [#55111](https://github.com/nodejs/node/pull/55111)
* \[[`5368cdcf8a`](https://github.com/nodejs/node/commit/5368cdcf8a)] - **doc**: 移动 YAML changes element（sendoru） [#55112](https://github.com/nodejs/node/pull/55112)
* \[[`23743f63fb`](https://github.com/nodejs/node/commit/23743f63fb)] - **doc**: 移除 `process.md` 中随机的水平分隔线（Antoine du Hamel） [#55149](https://github.com/nodejs/node/pull/55149)
* \[[`18acff0d01`](https://github.com/nodejs/node/commit/18acff0d01)] - **doc**: 将 --env-file-if-exists=config 放在 --env-file=config 正下方（Edigleysson Silva (Edy)） [#55131](https://github.com/nodejs/node/pull/55131)
* \[[`fd787c96e1`](https://github.com/nodejs/node/commit/fd787c96e1)] - **doc**: 修复 `modules.md` 中的 require resolve 算法（chirsz） [#55117](https://github.com/nodejs/node/pull/55117)
* \[[`668e523392`](https://github.com/nodejs/node/commit/668e523392)] - **doc**: 更新样式指南（Aviv Keller） [#53223](https://github.com/nodejs/node/pull/53223)
* \[[`ae82b455d1`](https://github.com/nodejs/node/commit/ae82b455d1)] - **doc**: 为 `run()` 的 `globPatterns` 补上缺失的 `:`（Aviv Keller） [#55135](https://github.com/nodejs/node/pull/55135)
* \[[`7f480818b7`](https://github.com/nodejs/node/commit/7f480818b7)] - **doc**: 修正 stream.(promises.)finished 中的 `cleanup` 选项（René） [#55043](https://github.com/nodejs/node/pull/55043)
* \[[`b8493a5789`](https://github.com/nodejs/node/commit/b8493a5789)] - **doc**: 将 abmusse 添加为 collaborators（Abdirahim Musse） [#55086](https://github.com/nodejs/node/pull/55086)
* \[[`f20c42e964`](https://github.com/nodejs/node/commit/f20c42e964)] - **doc**: 添加关于 `--expose-internals` 的注释（Aviv Keller） [#52861](https://github.com/nodejs/node/pull/52861)
* \[[`1c61a83444`](https://github.com/nodejs/node/commit/1c61a83444)] - **doc**: 从 REPL 文档中移除 `parseREPLKeyword`（Aviv Keller） [#54749](https://github.com/nodejs/node/pull/54749)
* \[[`65362f0181`](https://github.com/nodejs/node/commit/65362f0181)] - **doc**: 为 globals 补充缺失的 EventSource 文档（Matthew Aitken） [#55022](https://github.com/nodejs/node/pull/55022)
* \[[`5e25c2a79a`](https://github.com/nodejs/node/commit/5e25c2a79a)] - **doc**: 涵盖 --experimental-test-module-mocks 标志（Jonathan Sharpe） [#55021](https://github.com/nodejs/node/pull/55021)
* \[[`99433a2d7a`](https://github.com/nodejs/node/commit/99433a2d7a)] - **doc**: 为 localStorage 和 sessionStorage 添加更多细节（Batuhan Tomo） [#53881](https://github.com/nodejs/node/pull/53881)
* \[[`b446a587ba`](https://github.com/nodejs/node/commit/b446a587ba)] - **doc**: 将 v21 标记为生命周期结束（Aviv Keller） [#54984](https://github.com/nodejs/node/pull/54984)
* \[[`5e87577b4f`](https://github.com/nodejs/node/commit/5e87577b4f)] - **doc**: 使用更新后的信息修改回移植指南（Aviv Keller） [#53746](https://github.com/nodejs/node/pull/53746)
* \[[`de47b3122a`](https://github.com/nodejs/node/commit/de47b3122a)] - **doc**: 为 `internal-api.md` 添加缺失的定义（Aviv Keller） [#53303](https://github.com/nodejs/node/pull/53303)
* \[[`421977cd48`](https://github.com/nodejs/node/commit/421977cd48)] - **doc**: 修复 `process.features` 的历史记录（Antoine du Hamel） [#54982](https://github.com/nodejs/node/pull/54982)
* \[[`305137faae`](https://github.com/nodejs/node/commit/305137faae)] - **doc**: 修复 callsite.lineNumber 的拼写错误（Rafael Gonzaga） [#54969](https://github.com/nodejs/node/pull/54969)
* \[[`7feff2434d`](https://github.com/nodejs/node/commit/7feff2434d)] - **doc**: 更新 externalizing deps 的文档（Michael Dawson） [#54792](https://github.com/nodejs/node/pull/54792)
* \[[`cb20c5b9f4`](https://github.com/nodejs/node/commit/cb20c5b9f4)] - **doc**: 添加 process.features 的文档（Marco Ippolito） [#54897](https://github.com/nodejs/node/pull/54897)
* \[[`24302c9fe9`](https://github.com/nodejs/node/commit/24302c9fe9)] - **doc**: 修复 CppgcMixin 文档中的拼写错误（Joyee Cheung） [#54762](https://github.com/nodejs/node/pull/54762)
* \[[`7327e44a05`](https://github.com/nodejs/node/commit/7327e44a05)] - **doc**: 对版本进行排序以修复 linter 错误（Rafael Gonzaga） [#54229](https://github.com/nodejs/node/pull/54229)
* \[[`fb852798dc`](https://github.com/nodejs/node/commit/fb852798dc)] - **esm**: 不要将 `"main"` 解释为 URL（Antoine du Hamel） [#55003](https://github.com/nodejs/node/pull/55003)
* \[[`8fd90938f9`](https://github.com/nodejs/node/commit/8fd90938f9)] - **esm**: 移除 --no-import-harmony-assertions（Shu-yu Guo） [#54890](https://github.com/nodejs/node/pull/54890)
* \[[`a9081b5391`](https://github.com/nodejs/node/commit/a9081b5391)] - **events**: 允许 null/undefined eventInitDict（Matthew Aitken） [#54643](https://github.com/nodejs/node/pull/54643)
* \[[`0de1cf004c`](https://github.com/nodejs/node/commit/0de1cf004c)] - **events**: 在分发时返回 `currentTarget`（Matthew Aitken） [#54642](https://github.com/nodejs/node/pull/54642)
* \[[`9f9069d313`](https://github.com/nodejs/node/commit/9f9069d313)] - **fs**: 修复 linter 问题（Antoine du Hamel） [#55353](https://github.com/nodejs/node/pull/55353)
* \[[`36ca010bef`](https://github.com/nodejs/node/commit/36ca010bef)] - **fs**: 在 `filehandle.createReadStream()` 中确认 `signal` 选项（Livia Medeiros） [#55148](https://github.com/nodejs/node/pull/55148)
* \[[`7fe5bcd29e`](https://github.com/nodejs/node/commit/7fe5bcd29e)] - **fs**: 在 cpSync 中正确检查子目录（Jason Zhang） [#55033](https://github.com/nodejs/node/pull/55033)
* \[[`090add7864`](https://github.com/nodejs/node/commit/090add7864)] - **fs**: 使用 `Array.fromAsync` 以声明式方式重构（Sonny） [#54644](https://github.com/nodejs/node/pull/54644)
* \[[`77ca5ca075`](https://github.com/nodejs/node/commit/77ca5ca075)] - **fs**: 将文件系统路径转换为 u8 字符串（Jason Zhang） [#54653](https://github.com/nodejs/node/pull/54653)
* \[[`cf2bce6386`](https://github.com/nodejs/node/commit/cf2bce6386)] - **fs**: 修复 rmsync 的回归问题（Yagiz Nizipli） [#53982](https://github.com/nodejs/node/pull/53982)
* \[[`7168295e7a`](https://github.com/nodejs/node/commit/7168295e7a)] - **fs**: 将 `rmSync` 实现移至 c++（Yagiz Nizipli） [#53617](https://github.com/nodejs/node/pull/53617)
* \[[`71785889c8`](https://github.com/nodejs/node/commit/71785889c8)] - **lib**: 更倾向于逻辑赋值（Aviv Keller） [#55044](https://github.com/nodejs/node/pull/55044)
* \[[`78f421de88`](https://github.com/nodejs/node/commit/78f421de88)] - **lib**: 修复当 specifier 包含 `"` 时的模块打印时机（Antoine du Hamel） [#55150](https://github.com/nodejs/node/pull/55150)
* \[[`d5eb9a378e`](https://github.com/nodejs/node/commit/d5eb9a378e)] - **lib**: 移除 `Symbol[Async]Dispose` polyfill（Michaël Zasso） [#55276](https://github.com/nodejs/node/pull/55276)
* \[[`4c045351c1`](https://github.com/nodejs/node/commit/4c045351c1)] - **lib**: 修复拼写错误（Nathan Baulch） [#55065](https://github.com/nodejs/node/pull/55065)
* \[[`574f2dd517`](https://github.com/nodejs/node/commit/574f2dd517)] - **lib**: 更倾向于可选链（Aviv Keller） [#55045](https://github.com/nodejs/node/pull/55045)
* \[[`76edde5cd0`](https://github.com/nodejs/node/commit/76edde5cd0)] - **lib**: 移除 lib/internal/idna.js（Yagiz Nizipli） [#55050](https://github.com/nodejs/node/pull/55050)
* \[[`7014e50ca3`](https://github.com/nodejs/node/commit/7014e50ca3)] - **lib**: REPL 应能在删除 Array.prototype 方法后继续运行（Jordan Harband） [#31457](https://github.com/nodejs/node/pull/31457)
* \[[`5c22d19f44`](https://github.com/nodejs/node/commit/5c22d19f44)] - **lib, tools**: 移除重复的 requires（Aviv Keller） [#54987](https://github.com/nodejs/node/pull/54987)
* \[[`24648b5769`](https://github.com/nodejs/node/commit/24648b5769)] - **lib,esm**: 处理通过 data: 绕过 network-import（Rafael Gonzaga） [#53764](https://github.com/nodejs/node/pull/53764)
* \[[`1d38bd1122`](https://github.com/nodejs/node/commit/1d38bd1122)] - **meta**: 将一位或多位 collaborators 移至 emeritus（Node.js GitHub Bot） [#55300](https://github.com/nodejs/node/pull/55300)
* \[[`98788dace6`](https://github.com/nodejs/node/commit/98788dace6)] - **meta**: 将 mozilla-actions/sccache-action 从 0.0.5 升级到 0.0.6（dependabot\[bot]） [#55225](https://github.com/nodejs/node/pull/55225)
* \[[`8de2695fe5`](https://github.com/nodejs/node/commit/8de2695fe5)] - **meta**: 将 actions/checkout 从 4.1.7 升级到 4.2.0（dependabot\[bot]） [#55224](https://github.com/nodejs/node/pull/55224)
* \[[`ccae9c0fef`](https://github.com/nodejs/node/commit/ccae9c0fef)] - **meta**: 将 actions/setup-node 从 4.0.3 升级到 4.0.4（dependabot\[bot]） [#55223](https://github.com/nodejs/node/pull/55223)
* \[[`fd4959c67a`](https://github.com/nodejs/node/commit/fd4959c67a)] - **meta**: 将 peter-evans/create-pull-request 从 7.0.1 升级到 7.0.5（dependabot\[bot]） [#55219](https://github.com/nodejs/node/pull/55219)
* \[[`c08bb75618`](https://github.com/nodejs/node/commit/c08bb75618)] - **meta**: 为 abmusse 添加 mailmap 条目（Abdirahim Musse） [#55182](https://github.com/nodejs/node/pull/55182)
* \[[`18800da280`](https://github.com/nodejs/node/commit/18800da280)] - **meta**: 添加关于 nightly releases 的更多信息（Aviv Keller） [#55084](https://github.com/nodejs/node/pull/55084)
* \[[`eda98728da`](https://github.com/nodejs/node/commit/eda98728da)] - **meta**: 在 collaborator guide 中将 `linux` 添加到 OS 标签（Aviv Keller） [#54986](https://github.com/nodejs/node/pull/54986)
* \[[`8aa57918c2`](https://github.com/nodejs/node/commit/8aa57918c2)] - **meta**: 移除从未使用的工作流触发器（Aviv Keller） [#54983](https://github.com/nodejs/node/pull/54983)
* \[[`c6ae161237`](https://github.com/nodejs/node/commit/c6ae161237)] - **meta**: 移除 ruff 中不需要的忽略规则（Aviv Keller） [#54360](https://github.com/nodejs/node/pull/54360)
* \[[`ccc7ce09f2`](https://github.com/nodejs/node/commit/ccc7ce09f2)] - **meta**: 移除 `build-windows.yml`（Aviv Keller） [#54662](https://github.com/nodejs/node/pull/54662)
* \[[`f88fe776ef`](https://github.com/nodejs/node/commit/f88fe776ef)] - **meta**: 添加指向替代 issue tracker 的链接（Aviv Keller） [#54401](https://github.com/nodejs/node/pull/54401)
* \[[`90f56dbad9`](https://github.com/nodejs/node/commit/90f56dbad9)] - **module**: 在未使用 amaro 编译时抛出 ERR\_NO\_TYPESCRIPT（Marco Ippolito） [#55332](https://github.com/nodejs/node/pull/55332)
* \[[`31a37e777d`](https://github.com/nodejs/node/commit/31a37e777d)] - **module**: 将 swc 错误包装为 ERR\_INVALID\_TYPESCRIPT\_SYNTAX（Marco Ippolito） [#55316](https://github.com/nodejs/node/pull/55316)
* \[[`3fb7426f83`](https://github.com/nodejs/node/commit/3fb7426f83)] - **module**: 单独检查 --experimental-require-module，而不是与检测逻辑混在一起（Joyee Cheung） [#55250](https://github.com/nodejs/node/pull/55250)
* \[[`bdd590be73`](https://github.com/nodejs/node/commit/bdd590be73)] - **module**: 使用 kNodeModulesRE 检测 node_modules（Joyee Cheung） [#55243](https://github.com/nodejs/node/pull/55243)
* \[[`5e4da33d97`](https://github.com/nodejs/node/commit/5e4da33d97)] - **module**: 为 `flushCompileCache` 添加内部类型定义（Jacob Smith） [#55226](https://github.com/nodejs/node/pull/55226)
* \[[`d24c7313f7`](https://github.com/nodejs/node/commit/d24c7313f7)] - **module**: 在 require(esm) 中支持 'module.exports' 互操作导出（Guy Bedford） [#54563](https://github.com/nodejs/node/pull/54563)
* \[[`12f92b04f4`](https://github.com/nodejs/node/commit/12f92b04f4)] - **module**: 移除重复导入（Aviv Keller） [#54942](https://github.com/nodejs/node/pull/54942)
* \[[`be4babb3c2`](https://github.com/nodejs/node/commit/be4babb3c2)] - **module**: 报告歧义模块中未完成的 TLA（Antoine du Hamel） [#54980](https://github.com/nodejs/node/pull/54980)
* \[[`3ac5b49d85`](https://github.com/nodejs/node/commit/3ac5b49d85)] - **module**: 重构 ESM 加载器，为添加未来的同步钩子做准备（Joyee Cheung） [#54769](https://github.com/nodejs/node/pull/54769)
* \[[`3c4ef343ee`](https://github.com/nodejs/node/commit/3c4ef343ee)] - **module**: 移除在 --import 下处理 CJS 入口点时的错误断言（Joyee Cheung） [#54592](https://github.com/nodejs/node/pull/54592)
* \[[`e35902cddb`](https://github.com/nodejs/node/commit/e35902cddb)] - **module**: 修复 .ts 和 .js 之间的不一致（Marco Ippolito） [#54461](https://github.com/nodejs/node/pull/54461)
* \[[`fdf838aee6`](https://github.com/nodejs/node/commit/fdf838aee6)] - **node-api**: 添加 napi\_create\_buffer\_from\_arraybuffer 方法（Mert Can Altin） [#54505](https://github.com/nodejs/node/pull/54505)
* \[[`87e7aeb672`](https://github.com/nodejs/node/commit/87e7aeb672)] - **os**: 对路径使用带早期返回的 const（Trivikram Kamat） [#54959](https://github.com/nodejs/node/pull/54959)
* \[[`e42ca5c1a9`](https://github.com/nodejs/node/commit/e42ca5c1a9)] - **path**: 移除 `posix.resolve` 中重复的条件运算符（Wiyeong Seo） [#54835](https://github.com/nodejs/node/pull/54835)
* \[[`04750afb1e`](https://github.com/nodejs/node/commit/04750afb1e)] - **perf_hooks**: 为 getEntriesByName 添加缺失的类型参数（Luke Taher） [#54767](https://github.com/nodejs/node/pull/54767)
* \[[`f98d9c125c`](https://github.com/nodejs/node/commit/f98d9c125c)] - **process**: 在 Amaro 不可用时修复 `process.features.typescript`（Antoine du Hamel） [#55323](https://github.com/nodejs/node/pull/55323)
* \[[`bbdfeebd9e`](https://github.com/nodejs/node/commit/bbdfeebd9e)] - **process**: 添加 `process.features.typescript`（Aviv Keller） [#54295](https://github.com/nodejs/node/pull/54295)
* \[[`cdae315706`](https://github.com/nodejs/node/commit/cdae315706)] - **quic**: 开始添加内部 quic js api（James M Snell） [#53256](https://github.com/nodejs/node/pull/53256)
* \[[`c6d20a034d`](https://github.com/nodejs/node/commit/c6d20a034d)] - **repl**: 在换行检测中捕获 `\v` 和 `\r`（Aviv Keller） [#54512](https://github.com/nodejs/node/pull/54512)
* \[[`09d10b50dc`](https://github.com/nodejs/node/commit/09d10b50dc)] - **sqlite**: 默认禁用 DQS 异常功能（Tobias Nießen） [#55297](https://github.com/nodejs/node/pull/55297)
* \[[`7af434fc19`](https://github.com/nodejs/node/commit/7af434fc19)] - **sqlite**: 将 sourceSQL 和 expandedSQL 设为字符串值属性（Tobias Nießen） [#54721](https://github.com/nodejs/node/pull/54721)
* \[[`a49abec6c3`](https://github.com/nodejs/node/commit/a49abec6c3)] - **sqlite**: 默认启用外键约束（Tobias Nießen） [#54777](https://github.com/nodejs/node/pull/54777)
* \[[`14353387eb`](https://github.com/nodejs/node/commit/14353387eb)] - **src**: 在 C++ 中实现 IsInsideNodeModules()（Joyee Cheung） [#55286](https://github.com/nodejs/node/pull/55286)
* \[[`18536d95e2`](https://github.com/nodejs/node/commit/18536d95e2)] - **src**: 应用 getCallSite 优化（RafaelGSS） [#55174](https://github.com/nodejs/node/pull/55174)
* \[[`317d2450f9`](https://github.com/nodejs/node/commit/317d2450f9)] - **src**: 现代化 likely/unlikely 提示（Yagiz Nizipli） [#55155](https://github.com/nodejs/node/pull/55155)
* \[[`33bbf3751b`](https://github.com/nodejs/node/commit/33bbf3751b)] - **src**: 在 snapshot 构建期间修正 Error.stackTraceLimit（Joyee Cheung） [#55121](https://github.com/nodejs/node/pull/55121)
* \[[`65fbc95949`](https://github.com/nodejs/node/commit/65fbc95949)] - **src**: 解析 --stack-trace-limit 并将其用于 --trace-\* 标志（Joyee Cheung） [#55121](https://github.com/nodejs/node/pull/55121)
* \[[`858bce5698`](https://github.com/nodejs/node/commit/858bce5698)] - **src**: 为 quic c++ 做适配以支持 c++20 的细微调整（James M Snell） [#53256](https://github.com/nodejs/node/pull/53256)
* \[[`ac53a5b29d`](https://github.com/nodejs/node/commit/ac53a5b29d)] - **src**: 将更多密钥处理移到 ncrypto（James M Snell） [#55108](https://github.com/nodejs/node/pull/55108)
* \[[`f5d454ac7e`](https://github.com/nodejs/node/commit/f5d454ac7e)] - **src**: 为 fast api 回调方法添加 receiver（Carlos Espa） [#54408](https://github.com/nodejs/node/pull/54408)
* \[[`b5fb2ff81e`](https://github.com/nodejs/node/commit/b5fb2ff81e)] - **src**: 修复拼写错误（Nathan Baulch） [#55064](https://github.com/nodejs/node/pull/55064)
* \[[`812806a757`](https://github.com/nodejs/node/commit/812806a757)] - **src**: 将更多内容迁移为使用 Maybe\<void>（James M Snell） [#54831](https://github.com/nodejs/node/pull/54831)
* \[[`84966703e0`](https://github.com/nodejs/node/commit/84966703e0)] - **src**: 使用高效列表跟踪 BaseObjects（Chengzhong Wu） [#55104](https://github.com/nodejs/node/pull/55104)
* \[[`02cdf7b809`](https://github.com/nodejs/node/commit/02cdf7b809)] - **src**: 将本地错误消息解码为 UTF-8（Joyee Cheung） [#55024](https://github.com/nodejs/node/pull/55024)
* \[[`6fb9f56994`](https://github.com/nodejs/node/commit/6fb9f56994)] - **src**: 更新 clang-tidy 并聚焦现代化（Yagiz Nizipli） [#53757](https://github.com/nodejs/node/pull/53757)
* \[[`773e7c67cf`](https://github.com/nodejs/node/commit/773e7c67cf)] - **src**: 在 path 为空时不要调用 path.back()（Cheng） [#55072](https://github.com/nodejs/node/pull/55072)
* \[[`c4681d55ae`](https://github.com/nodejs/node/commit/c4681d55ae)] - **src**: 将 evp 相关内容移到 ncrypto（James M Snell） [#54911](https://github.com/nodejs/node/pull/54911)
* \[[`5a966714c1`](https://github.com/nodejs/node/commit/5a966714c1)] - **src**: 回退 filesystem::path 更改（Yagiz Nizipli） [#55015](https://github.com/nodejs/node/pull/55015)
* \[[`12dd4c7575`](https://github.com/nodejs/node/commit/12dd4c7575)] - **src**: 将 node --run 标记为稳定（Yagiz Nizipli） [#53763](https://github.com/nodejs/node/pull/53763)
* \[[`8b8fc53c9a`](https://github.com/nodejs/node/commit/8b8fc53c9a)] - **src**: 不使用列表而直接清理每个 env handle（Chengzhong Wu） [#54993](https://github.com/nodejs/node/pull/54993)
* \[[`fd8c762fab`](https://github.com/nodejs/node/commit/fd8c762fab)] - **src**: 如果定义了 node posix credentials，则添加 unistd.h 导入（Jonas） [#54528](https://github.com/nodejs/node/pull/54528)
* \[[`d496d44145`](https://github.com/nodejs/node/commit/d496d44145)] - **src**: 移除设置 AF\_INET 的重复代码（He Yang） [#54939](https://github.com/nodejs/node/pull/54939)
* \[[`d2a4f92920`](https://github.com/nodejs/node/commit/d2a4f92920)] - **src**: 在不需要 bool 时使用 `Maybe<void>`（Michaël Zasso） [#54575](https://github.com/nodejs/node/pull/54575)
* \[[`8191e1f575`](https://github.com/nodejs/node/commit/8191e1f575)] - **src**: 提升 utf8 字符串生成性能（Yagiz Nizipli） [#54873](https://github.com/nodejs/node/pull/54873)
* \[[`9f5977fdac`](https://github.com/nodejs/node/commit/9f5977fdac)] - **src**: 使用 views 简化 string_bytes（Daniel Lemire） [#54876](https://github.com/nodejs/node/pull/54876)
* \[[`849db10fb3`](https://github.com/nodejs/node/commit/849db10fb3)] - **src**: 添加创建 cppgc 管理包装器的辅助工具（Joyee Cheung） [#52295](https://github.com/nodejs/node/pull/52295)
* \[[`4568df4c6d`](https://github.com/nodejs/node/commit/4568df4c6d)] - **src**: 在 heap utils 中支持 v8::Data（Joyee Cheung） [#52295](https://github.com/nodejs/node/pull/52295)
* \[[`4f1c27af8c`](https://github.com/nodejs/node/commit/4f1c27af8c)] - **src**: 正确处理 webstorage 中的错误（Michaël Zasso） [#54544](https://github.com/nodejs/node/pull/54544)
* \[[`c062b5242a`](https://github.com/nodejs/node/commit/c062b5242a)] - **src**: 使用正确方式传递 interceptor 错误信号（Michaël Zasso） [#54418](https://github.com/nodejs/node/pull/54418)
* \[[`097a52848e`](https://github.com/nodejs/node/commit/097a52848e)] - **src**: 不要保存临时字符串的 c_str（Cheng） [#53941](https://github.com/nodejs/node/pull/53941)
* \[[`3111ed7011`](https://github.com/nodejs/node/commit/3111ed7011)] - **stream**: 正确处理 decode stream 中的 undefined chunk（devstone） [#55153](https://github.com/nodejs/node/pull/55153)
* \[[`87a79cd8a1`](https://github.com/nodejs/node/commit/87a79cd8a1)] - **stream**: 将 null asyncIterator 视为 undefined（Jason Zhang） [#55119](https://github.com/nodejs/node/pull/55119)
* \[[`0e52836c35`](https://github.com/nodejs/node/commit/0e52836c35)] - **stream**: 将 stream prototype 设置为最近的可转移超类（Jason Zhang） [#55067](https://github.com/nodejs/node/pull/55067)
* \[[`82dab76d63`](https://github.com/nodejs/node/commit/82dab76d63)] - **test**: 在 Amaro 不可用时修复测试（Richard Lau） [#55320](https://github.com/nodejs/node/pull/55320)
* \[[`fdc23b2f6b`](https://github.com/nodejs/node/commit/fdc23b2f6b)] - **test**: 在 `test-runner-cli` 中使用更具信息量的错误（Antoine du Hamel） [#55321](https://github.com/nodejs/node/pull/55321)
* \[[`a05cb0d1b0`](https://github.com/nodejs/node/commit/a05cb0d1b0)] - **test**: 让 `test-loaders-workers-spawned` 更不易出现 flaky（Antoine du Hamel） [#55172](https://github.com/nodejs/node/pull/55172)
* \[[`6c92c1391a`](https://github.com/nodejs/node/commit/6c92c1391a)] - **test**: 为内部模块 stat 测试添加资源（RafaelGSS） [#55157](https://github.com/nodejs/node/pull/55157)
* \[[`1d95b79b66`](https://github.com/nodejs/node/commit/1d95b79b66)] - **test**: 将 coverage source map 测试移到新文件（Aviv Keller） [#55123](https://github.com/nodejs/node/pull/55123)
* \[[`2755551c3c`](https://github.com/nodejs/node/commit/2755551c3c)] - **test**: 为 strip-types 添加更多测试（Kevin Toshihiro Uehara） [#54929](https://github.com/nodejs/node/pull/54929)
* \[[`371ed85e4e`](https://github.com/nodejs/node/commit/371ed85e4e)] - **test**: 更新 wpt 测试以适配 encoding（devstone） [#55151](https://github.com/nodejs/node/pull/55151)
* \[[`99e0d0d218`](https://github.com/nodejs/node/commit/99e0d0d218)] - **test**: 添加 `escapePOSIXShell` 工具函数（Antoine du Hamel） [#55125](https://github.com/nodejs/node/pull/55125)
* \[[`56c1786475`](https://github.com/nodejs/node/commit/56c1786475)] - **test**: 移除 test-watch-mode 中不必要的 `await`（Wuli） [#55142](https://github.com/nodejs/node/pull/55142)
* \[[`28c7394319`](https://github.com/nodejs/node/commit/28c7394319)] - **test**: 修复拼写错误（Nathan Baulch） [#55063](https://github.com/nodejs/node/pull/55063)
* \[[`fbc6fcb018`](https://github.com/nodejs/node/commit/fbc6fcb018)] - **test**: 移除重复的测试描述（Christos Koutsiaris） [#54140](https://github.com/nodejs/node/pull/54140)
* \[[`66a2cb210a`](https://github.com/nodejs/node/commit/66a2cb210a)] - **test**: 消除 test/pummel/test-timers.js 的不稳定性（jakecastelli） [#55098](https://github.com/nodejs/node/pull/55098)
* \[[`9bb6a1a790`](https://github.com/nodejs/node/commit/9bb6a1a790)] - **test**: 消除 test-http-remove-header-stays-removed 的不稳定性（Luigi Pinca） [#55004](https://github.com/nodejs/node/pull/55004)
* \[[`0f7bdcc17f`](https://github.com/nodejs/node/commit/0f7bdcc17f)] - **test**: 修复 test-tls-junk-closes-server（Michael Dawson） [#55089](https://github.com/nodejs/node/pull/55089)
* \[[`2118e32d9b`](https://github.com/nodejs/node/commit/2118e32d9b)] - **test**: 修复路径包含空格时失败的更多测试（Antoine du Hamel） [#55088](https://github.com/nodejs/node/pull/55088)
* \[[`bdddc04dff`](https://github.com/nodejs/node/commit/bdddc04dff)] - **test**: 修复路径包含引号时的 `assertSnapshot`（Antoine du Hamel） [#55087](https://github.com/nodejs/node/pull/55087)
* \[[`7d0ce254e8`](https://github.com/nodejs/node/commit/7d0ce254e8)] - **test**: 修复路径包含 `%` 时的部分测试（Antoine du Hamel） [#55082](https://github.com/nodejs/node/pull/55082)
* \[[`61ad74fb0f`](https://github.com/nodejs/node/commit/61ad74fb0f)] - _**Revert**_ "**test**: 将 test-fs-watch-non-recursive 标记为 Windows 上的 flaky"（Luigi Pinca） [#55079](https://github.com/nodejs/node/pull/55079)
* \[[`02e8972169`](https://github.com/nodejs/node/commit/02e8972169)] - **test**: 移除 interval 并给 unsync 更多时间（Pietro Marchini） [#55006](https://github.com/nodejs/node/pull/55006)
* \[[`3c5ceff85f`](https://github.com/nodejs/node/commit/3c5ceff85f)] - **test**: 消除 test-inspector-strip-types 的不稳定性（Luigi Pinca） [#55058](https://github.com/nodejs/node/pull/55058)
* \[[`8b70e6bdee`](https://github.com/nodejs/node/commit/8b70e6bdee)] - **test**: 让 `test-runner-assert` 更健壮（Aviv Keller） [#55036](https://github.com/nodejs/node/pull/55036)
* \[[`2cec716c48`](https://github.com/nodejs/node/commit/2cec716c48)] - **test**: 更新 tls 测试以支持 OpenSSL32（Michael Dawson） [#55030](https://github.com/nodejs/node/pull/55030)
* \[[`1fcb128771`](https://github.com/nodejs/node/commit/1fcb128771)] - **test**: 不要假设 `process.execPath` 不包含空格（Antoine du Hamel） [#55028](https://github.com/nodejs/node/pull/55028)
* \[[`7ecc48d061`](https://github.com/nodejs/node/commit/7ecc48d061)] - **test**: 修复路径包含空格时的 `test-vm-context-dont-contextify`（Antoine du Hamel） [#55026](https://github.com/nodejs/node/pull/55026)
* \[[`cfe58cfdc4`](https://github.com/nodejs/node/commit/cfe58cfdc4)] - **test**: 为 OpenSSL32 调整 tls-set-ciphers（Michael Dawson） [#55016](https://github.com/nodejs/node/pull/55016)
* \[[`941635473d`](https://github.com/nodejs/node/commit/941635473d)] - **test**: 添加 `util.stripVTControlCharacters` 测试（RedYetiDev） [#54865](https://github.com/nodejs/node/pull/54865)
* \[[`b23d1c37b9`](https://github.com/nodejs/node/commit/b23d1c37b9)] - **test**: 提高 timer promises schedular 的覆盖率（Aviv Keller） [#53370](https://github.com/nodejs/node/pull/53370)
* \[[`a65e4418e5`](https://github.com/nodejs/node/commit/a65e4418e5)] - **test**: 从 common 中移除 getCallSite（RedYetiDev） [#54947](https://github.com/nodejs/node/pull/54947)
* \[[`5116578b8a`](https://github.com/nodejs/node/commit/5116578b8a)] - **test**: 移除未使用的 common 工具函数（RedYetiDev） [#54825](https://github.com/nodejs/node/pull/54825)
* \[[`a9677db91b`](https://github.com/nodejs/node/commit/a9677db91b)] - **test**: 消除 test-http-header-overflow 的不稳定性（Luigi Pinca） [#54978](https://github.com/nodejs/node/pull/54978)
* \[[`9be0057859`](https://github.com/nodejs/node/commit/9be0057859)] - **test**: 将 `soucre` 修正为 `source`（Aviv Keller） [#55038](https://github.com/nodejs/node/pull/55038)
* \[[`29b9c72b05`](https://github.com/nodejs/node/commit/29b9c72b05)] - **test**: 添加断言以验证测试假设（Michael Dawson） [#54997](https://github.com/nodejs/node/pull/54997)
* \[[`e35299ae62`](https://github.com/nodejs/node/commit/e35299ae62)] - **test**: 添加 runner watch mode 隔离测试（Pietro Marchini） [#54888](https://github.com/nodejs/node/pull/54888)
* \[[`2a1607cc2e`](https://github.com/nodejs/node/commit/2a1607cc2e)] - **test**: 修复无效的 wasm 测试（Aviv Keller） [#54935](https://github.com/nodejs/node/pull/54935)
* \[[`a6ed2148a0`](https://github.com/nodejs/node/commit/a6ed2148a0)] - **test**: 将 test-http-max-sockets 移至 parallel（Luigi Pinca） [#54977](https://github.com/nodejs/node/pull/54977)
* \[[`636b3432d3`](https://github.com/nodejs/node/commit/636b3432d3)] - **test**: 移除 test-http-max-sockets 的 flaky 标记（Luigi Pinca） [#54976](https://github.com/nodejs/node/pull/54976)
* \[[`291d90acbc`](https://github.com/nodejs/node/commit/291d90acbc)] - **test**: 重构 test-whatwg-webstreams-encoding，使其更短（David Dong） [#54569](https://github.com/nodejs/node/pull/54569)
* \[[`6dfa3e46d3`](https://github.com/nodejs/node/commit/6dfa3e46d3)] - **test**: 调整密钥长度以支持 OpenSSL32（Michael Dawson） [#54972](https://github.com/nodejs/node/pull/54972)
* \[[`f8b7a17146`](https://github.com/nodejs/node/commit/f8b7a17146)] - **test**: 更新测试以支持 OpenSSL32（Michael Dawson） [#54968](https://github.com/nodejs/node/pull/54968)
* \[[`b470e2fcb2`](https://github.com/nodejs/node/commit/b470e2fcb2)] - **test**: 更新 DOM events web platform tests（Matthew Aitken） [#54642](https://github.com/nodejs/node/pull/54642)
* \[[`9cbef482df`](https://github.com/nodejs/node/commit/9cbef482df)] - **test**: 更新多个 assert 测试以使用 node:test（James M Snell） [#54585](https://github.com/nodejs/node/pull/54585)
* \[[`259163802c`](https://github.com/nodejs/node/commit/259163802c)] - **test**: 验证 promise 版本 `setTimeout` 在 `NaN` 下的行为（Benjamin Gruenbaum） [#53622](https://github.com/nodejs/node/pull/53622)
* \[[`4174b73153`](https://github.com/nodejs/node/commit/4174b73153)] - **test**: 支持覆盖率文件的 glob 匹配（Aviv Keller） [#53553](https://github.com/nodejs/node/pull/53553)
* \[[`0e187e4a21`](https://github.com/nodejs/node/commit/0e187e4a21)] - **test,crypto**: 更新 WebCryptoAPI WPT（Filip Skokan） [#55029](https://github.com/nodejs/node/pull/55029)
* \[[`ccd4faf4bf`](https://github.com/nodejs/node/commit/ccd4faf4bf)] - _**Revert**_ "**test_runner**: 忽略覆盖率中未映射的行"（Aviv Keller） [#55339](https://github.com/nodejs/node/pull/55339)
* \[[`3a42085ee4`](https://github.com/nodejs/node/commit/3a42085ee4)] - **test_runner**: 忽略覆盖率中未映射的行（Edigleysson Silva (Edy)） [#55228](https://github.com/nodejs/node/pull/55228)
* \[[`9a9409ff1f`](https://github.com/nodejs/node/commit/9a9409ff1f)] - **test_runner**: 在无效 source map 时抛错（Aviv Keller） [#55055](https://github.com/nodejs/node/pull/55055)
* \[[`980b91a1ef`](https://github.com/nodejs/node/commit/980b91a1ef)] - **test_runner**: 断言 entry 是有效对象（Edigleysson Silva (Edy)） [#55231](https://github.com/nodejs/node/pull/55231)
* \[[`1c7795e52e`](https://github.com/nodejs/node/commit/1c7795e52e)] - **test_runner**: 为 run 添加 cwd 选项（Pietro Marchini） [#54705](https://github.com/nodejs/node/pull/54705)
* \[[`103b8439ca`](https://github.com/nodejs/node/commit/103b8439ca)] - **test_runner**: 避免在数组上使用展开运算符（Antoine du Hamel） [#55143](https://github.com/nodejs/node/pull/55143)
* \[[`27dab9d916`](https://github.com/nodejs/node/commit/27dab9d916)] - **test_runner**: 在默认 glob 中支持 typescript 文件（Aviv Keller） [#55081](https://github.com/nodejs/node/pull/55081)
* \[[`e32521a7b9`](https://github.com/nodejs/node/commit/e32521a7b9)] - **test_runner**: 在强制退出时关闭并刷新 destinations（Colin Ihrig） [#55099](https://github.com/nodejs/node/pull/55099)
* \[[`aac8ba7bd7`](https://github.com/nodejs/node/commit/aac8ba7bd7)] - **test_runner**: 修复对 URL 中包含引号的模块进行 mock（Antoine du Hamel） [#55083](https://github.com/nodejs/node/pull/55083)
* \[[`4f881790e9`](https://github.com/nodejs/node/commit/4f881790e9)] - **test_runner**: 在缺少 sourcemap source 时报告错误（Aviv Keller） [#55037](https://github.com/nodejs/node/pull/55037)
* \[[`b264cbe5e8`](https://github.com/nodejs/node/commit/b264cbe5e8)] - **test_runner**: 在父测试第二次打印时使用 `test:` 符号（RedYetiDev） [#54956](https://github.com/nodejs/node/pull/54956)
* \[[`0c8c107aaa`](https://github.com/nodejs/node/commit/0c8c107aaa)] - **test_runner**: 用 ansi reset 替换 ansi clear（Pietro Marchini） [#55013](https://github.com/nodejs/node/pull/55013)
* \[[`bb405210c5`](https://github.com/nodejs/node/commit/bb405210c5)] - **test_runner**: 支持 typescript 模块 mock（Marco Ippolito） [#54878](https://github.com/nodejs/node/pull/54878)
* \[[`50136a167d`](https://github.com/nodejs/node/commit/50136a167d)] - **test_runner**: 避免 coverage 报告中的部分文件名（Pietro Marchini） [#54379](https://github.com/nodejs/node/pull/54379)
* \[[`4988bb549e`](https://github.com/nodejs/node/commit/4988bb549e)] - **tools**: 强制 `errors.md` 中错误代码的排序（Antoine du Hamel） [#55324](https://github.com/nodejs/node/pull/55324)
* \[[`5a3da7b4e4`](https://github.com/nodejs/node/commit/5a3da7b4e4)] - **tools**: 强制错误不要记录在 legacy 部分（Aviv Keller） [#55218](https://github.com/nodejs/node/pull/55218)
* \[[`8dbca2d35b`](https://github.com/nodejs/node/commit/8dbca2d35b)] - **tools**: 将 gyp-next 更新到 0.18.2（Node.js GitHub Bot） [#55160](https://github.com/nodejs/node/pull/55160)
* \[[`b2161d3a13`](https://github.com/nodejs/node/commit/b2161d3a13)] - **tools**: 在 /tools/eslint 中将 eslint 组升级，包含 4 次更新（dependabot\[bot]) [#55227](https://github.com/nodejs/node/pull/55227)
* \[[`e7d27320c3`](https://github.com/nodejs/node/commit/e7d27320c3)] - **tools**: 仅在默认分支上检查 teams（Antoine du Hamel） [#55124](https://github.com/nodejs/node/pull/55124)
* \[[`e8127db032`](https://github.com/nodejs/node/commit/e8127db032)] - **tools**: 使 `choco install` 脚本更易读（Aviv Keller） [#54002](https://github.com/nodejs/node/pull/54002)
* \[[`779e6bdd5e`](https://github.com/nodejs/node/commit/779e6bdd5e)] - **tools**: 为 `lint-md` 将 Rollup 从 4.18.1 升级到 4.22.4（dependabot\[bot]) [#55093](https://github.com/nodejs/node/pull/55093)
* \[[`0257102299`](https://github.com/nodejs/node/commit/0257102299)] - **tools**: 解锁无关 DB 依赖的版本（Michaël Zasso） [#55042](https://github.com/nodejs/node/pull/55042)
* \[[`f43424ac2d`](https://github.com/nodejs/node/commit/f43424ac2d)] - **tools**: 移除 eslint require 规则中的冗余代码（Aviv Keller） [#54892](https://github.com/nodejs/node/pull/54892)
* \[[`6a52e81260`](https://github.com/nodejs/node/commit/6a52e81260)] - **tools**: 更新 license-builder 中 ICU 的错误消息（Aviv Keller） [#54742](https://github.com/nodejs/node/pull/54742)
* \[[`cde6dccb65`](https://github.com/nodejs/node/commit/cde6dccb65)] - **tools**: 将 js2c.cc 重构为使用 c++20（Yagiz Nizipli） [#54849](https://github.com/nodejs/node/pull/54849)
* \[[`59c7c55aad`](https://github.com/nodejs/node/commit/59c7c55aad)] - **tools**: 在 /tools/eslint 中将 eslint 组升级，包含 7 次更新（dependabot\[bot]) [#54821](https://github.com/nodejs/node/pull/54821)
* \[[`c6269cb069`](https://github.com/nodejs/node/commit/c6269cb069)] - **tools**: 修复 v8.gyp 中 abseil 文件的路径（Michaël Zasso） [#54659](https://github.com/nodejs/node/pull/54659)
* \[[`d17fefcd71`](https://github.com/nodejs/node/commit/d17fefcd71)] - **tools**: 将 github\_reporter 更新到 1.7.1（Node.js GitHub Bot） [#54951](https://github.com/nodejs/node/pull/54951)
* \[[`29a4fcf918`](https://github.com/nodejs/node/commit/29a4fcf918)] - **tty**: 修复终端颜色的链接（Aviv Keller） [#54596](https://github.com/nodejs/node/pull/54596)
* \[[`e42ad5e80c`](https://github.com/nodejs/node/commit/e42ad5e80c)] - **util**: 更新 ansi regex（Aviv Keller） [#54865](https://github.com/nodejs/node/pull/54865)
* \[[`b5aae52c71`](https://github.com/nodejs/node/commit/b5aae52c71)] - _**Revert**_ "**util**: 将 util._extend 移至 eol"（Marco Ippolito） [#53429](https://github.com/nodejs/node/pull/53429)
* \[[`deb5effe01`](https://github.com/nodejs/node/commit/deb5effe01)] - **v8**: 越界复制（Robert Nagy） [#55261](https://github.com/nodejs/node/pull/55261)
* \[[`3b0617dd19`](https://github.com/nodejs/node/commit/3b0617dd19)] - **vm**: 将 ContextifyScript 迁移到 cppgc（Joyee Cheung） [#52295](https://github.com/nodejs/node/pull/52295)
* \[[`35b8e5cb0c`](https://github.com/nodejs/node/commit/35b8e5cb0c)] - _**Revert**_ "**vm,src**: 添加 property query interceptors"（Michaël Zasso） [#53348](https://github.com/nodejs/node/pull/53348)
* \[[`d1f18b0bf1`](https://github.com/nodejs/node/commit/d1f18b0bf1)] - **vm,src**: 添加 property query interceptors（Michaël Zasso） [#53172](https://github.com/nodejs/node/pull/53172)
* \[[`89a2f565b7`](https://github.com/nodejs/node/commit/89a2f565b7)] - **watch**: 在优雅重启时保留输出（Théo LUDWIG） [#54323](https://github.com/nodejs/node/pull/54323)
* \[[`6b9413e41a`](https://github.com/nodejs/node/commit/6b9413e41a)] - **worker**: 在 close 后的 postMessage 中抛出 InvalidStateError（devstone） [#55206](https://github.com/nodejs/node/pull/55206)
* \[[`6031a4bc7c`](https://github.com/nodejs/node/commit/6031a4bc7c)] - **worker**: 更一致地处理 `--input-type`（Antoine du Hamel） [#54979](https://github.com/nodejs/node/pull/54979)
* \[[`5b3f3c5a3b`](https://github.com/nodejs/node/commit/5b3f3c5a3b)] - **zlib**: 从 c++ 抛出 brotli 初始化错误（Yagiz Nizipli） [#54698](https://github.com/nodejs/node/pull/54698)
* \[[`c42d8461b0`](https://github.com/nodejs/node/commit/c42d8461b0)] - **zlib**: 移除 prototype primordials 的使用（Yagiz Nizipli） [#54695](https://github.com/nodejs/node/pull/54695)
