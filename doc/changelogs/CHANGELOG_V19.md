# Node.js 19 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>当前</th>
</tr>
<tr>
<td>
<b><a href="#19.9.0">19.9.0</a></b><br/>
<a href="#19.8.1">19.8.1</a><br/>
<a href="#19.8.0">19.8.0</a><br/>
<a href="#19.7.0">19.7.0</a><br/>
<a href="#19.6.1">19.6.1</a><br/>
<a href="#19.6.0">19.6.0</a><br/>
<a href="#19.5.0">19.5.0</a><br/>
<a href="#19.4.0">19.4.0</a><br/>
<a href="#19.3.0">19.3.0</a><br/>
<a href="#19.2.0">19.2.0</a><br/>
<a href="#19.1.0">19.1.0</a><br/>
<a href="#19.0.1">19.0.1</a><br/>
<a href="#19.0.0">19.0.0</a><br/>
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
  * [0.10.x](CHANGELOG_V010.md)
  * [io.js](CHANGELOG_IOJS.md)
  * [归档](CHANGELOG_ARCHIVE.md)

<a id="19.9.0"></a>

## 2023-04-10，版本 19.9.0（当前），@RafaelGSS

### 重要变更

#### diagnostic\_channel 中的 Tracing Channel

`TracingChannel` 添加了一个新的高性能通道，用于发布有关函数执行时序和用途的追踪数据。

由 Stephen Belanger 贡献，见 [#44943](https://github.com/nodejs/node/pull/44943)

#### 新的 URL.canParse API

向 URL 新增了一个 API。`URL.canParse` 会根据 WHATWG URL 规范检查带有可选基础值的 `input` 是否可以被正确解析。

```js
const isValid = URL.canParse('/foo', 'https://example.org/'); // 真
const isNotValid = URL.canParse('/foo'); // 假
```

由 Khafra 贡献，见 [#47179](https://github.com/nodejs/node/pull/47179)

#### 其他重要变更

events:

* (SEMVER-MINOR) 添加 getMaxListeners 方法（Khafra） <https://github.com/nodejs/node/pull/47039>
  msi:
* (SEMVER-MINOR) 迁移到 WiX4（Stefan Stojanovic） <https://github.com/nodejs/node/pull/45943>
  node-api:
* (SEMVER-MINOR) 弃用 napi\_module\_register（Vladimir Morozov） <https://github.com/nodejs/node/pull/46319>
  stream:
* (SEMVER-MINOR) 为默认 highWaterMark 添加 setter 和 getter（Robert Nagy） <https://github.com/nodejs/node/pull/46929>
  test\_runner:
* (SEMVER-MINOR) 暴露 reporter 供 run api 使用（Chemi Atlow） <https://github.com/nodejs/node/pull/47238>

### 提交

* \[[`2cea7d8141`](https://github.com/nodejs/node/commit/2cea7d8141)] - **benchmark**: 修复无效的 requirementsURL（Deokjin Kim） [#47378](https://github.com/nodejs/node/pull/47378)
* \[[`6a4076a188`](https://github.com/nodejs/node/commit/6a4076a188)] - **benchmark**: 降低 URL.canParse 的运行次数（Khafra） [#47351](https://github.com/nodejs/node/pull/47351)
* \[[`23a69d9279`](https://github.com/nodejs/node/commit/23a69d9279)] - **buffer**: 修复在有许多 chunks 时的 blob 范围错误（Khafra） [#47320](https://github.com/nodejs/node/pull/47320)
* \[[`e3d98c3e7a`](https://github.com/nodejs/node/commit/e3d98c3e7a)] - **buffer**: 在 File 中使用私有属性进行品牌检查（Khafra） [#47154](https://github.com/nodejs/node/pull/47154)
* \[[`9dc6aef98d`](https://github.com/nodejs/node/commit/9dc6aef98d)] - **build**: 将 github/codeql-action 从 2.2.6 升级到 2.2.9（dependabot\[bot]） [#47366](https://github.com/nodejs/node/pull/47366)
* \[[`910d2967f1`](https://github.com/nodejs/node/commit/910d2967f1)] - **build**: 将 stale action 从 v7 更新到 v8（Rich Trott） [#47357](https://github.com/nodejs/node/pull/47357)
* \[[`666df20ad9`](https://github.com/nodejs/node/commit/666df20ad9)] - **build**: 移除 Python pip 的 `--no-user` 选项（Christian Clauss） [#47372](https://github.com/nodejs/node/pull/47372)
* \[[`3970537bb4`](https://github.com/nodejs/node/commit/3970537bb4)] - **build**: 避免使用 pipes 库（Mohammed Keyvanzadeh） [#47271](https://github.com/nodejs/node/pull/47271)
* \[[`254a03b2eb`](https://github.com/nodejs/node/commit/254a03b2eb)] - **crypto**: 统一 checkPrime 检查的验证逻辑（Tobias Nießen） [#47165](https://github.com/nodejs/node/pull/47165)
* \[[`8e1e9edc57`](https://github.com/nodejs/node/commit/8e1e9edc57)] - **deps**: 将时区更新到 2023c（Node.js GitHub Bot） [#47302](https://github.com/nodejs/node/pull/47302)
* \[[`30c043c2b9`](https://github.com/nodejs/node/commit/30c043c2b9)] - **deps**: 将时区更新到 2023b（Node.js GitHub Bot） [#47256](https://github.com/nodejs/node/pull/47256)
* \[[`40be01bc9c`](https://github.com/nodejs/node/commit/40be01bc9c)] - **deps**: 将 simdutf 更新到 3.2.3（Node.js GitHub Bot） [#47331](https://github.com/nodejs/node/pull/47331)
* \[[`4b09222569`](https://github.com/nodejs/node/commit/4b09222569)] - **deps**: 将 npm 升级到 9.6.3（npm team） [#47325](https://github.com/nodejs/node/pull/47325)
* \[[`2a6c23ea5e`](https://github.com/nodejs/node/commit/2a6c23ea5e)] - **deps**: 将 corepack 更新到 0.17.1（Node.js GitHub Bot） [#47156](https://github.com/nodejs/node/pull/47156)
* \[[`06b718363d`](https://github.com/nodejs/node/commit/06b718363d)] - **deps**: V8：挑选提交 3e4952cb2a59（Richard Lau） [#47236](https://github.com/nodejs/node/pull/47236)
* \[[`7e24498d81`](https://github.com/nodejs/node/commit/7e24498d81)] - **deps**: 将 npm 升级到 9.6.2（npm team） [#47108](https://github.com/nodejs/node/pull/47108)
* \[[`7a4beaa182`](https://github.com/nodejs/node/commit/7a4beaa182)] - **deps**: V8：挑选提交 215ccd593edb（Joyee Cheung） [#47212](https://github.com/nodejs/node/pull/47212)
* \[[`8a69929f23`](https://github.com/nodejs/node/commit/8a69929f23)] - **deps**: V8：挑选提交 975ff4dbfd1b（Debadree Chatterjee） [#47209](https://github.com/nodejs/node/pull/47209)
* \[[`10569de53f`](https://github.com/nodejs/node/commit/10569de53f)] - **deps**: 挑选 win/arm64/clang 修复（Cheng Zhao） [#47011](https://github.com/nodejs/node/pull/47011)
* \[[`ff6070eb1d`](https://github.com/nodejs/node/commit/ff6070eb1d)] - **deps**: V8：挑选提交 cb30b8e17429（Darshan Sen） [#47307](https://github.com/nodejs/node/pull/47307)
* \[[`0bbce034f9`](https://github.com/nodejs/node/commit/0bbce034f9)] - **doc**: 添加关于 os.cpus() 返回空列表的说明（codedokode） [#47363](https://github.com/nodejs/node/pull/47363)
* \[[`f8511e0b27`](https://github.com/nodejs/node/commit/f8511e0b27)] - **doc**: 澄清报告只会在活跃版本上进行评估（Rafael Gonzaga） [#47341](https://github.com/nodejs/node/pull/47341)
* \[[`863b4d9c5b`](https://github.com/nodejs/node/commit/863b4d9c5b)] - **doc**: 从 Security release stewards 中移除 Vladimir de Turckheim（Vladimir de Turckheim） [#47318](https://github.com/nodejs/node/pull/47318)
* \[[`2192b5b163`](https://github.com/nodejs/node/commit/2192b5b163)] - **doc**: 在 `process.report.getReport'` 的示例中添加 util 导入（Deokjin Kim） [#47298](https://github.com/nodejs/node/pull/47298)
* \[[`1c21fbfa9a`](https://github.com/nodejs/node/commit/1c21fbfa9a)] - **doc**: 没有 context 选项的 vm.SourceTextModule()（Axel Kittenberger） [#47295](https://github.com/nodejs/node/pull/47295)
* \[[`89445fbea9`](https://github.com/nodejs/node/commit/89445fbea9)] - **doc**: 将 win arm64 设为 tier 2 平台（Stefan Stojanovic） [#47233](https://github.com/nodejs/node/pull/47233)
* \[[`296577a549`](https://github.com/nodejs/node/commit/296577a549)] - **doc**: 记录分享项目新闻的流程（Michael Dawson） [#47189](https://github.com/nodejs/node/pull/47189)
* \[[`e29a1462c7`](https://github.com/nodejs/node/commit/e29a1462c7)] - **doc**: 修订 assert.CallTracker 的示例（Deokjin Kim） [#47252](https://github.com/nodejs/node/pull/47252)
* \[[`bac893adbe`](https://github.com/nodejs/node/commit/bac893adbe)] - **doc**: 修复 SECURITY.md 中的拼写错误（Rich Trott） [#47282](https://github.com/nodejs/node/pull/47282)
* \[[`0949f238d1`](https://github.com/nodejs/node/commit/0949f238d1)] - **doc**: 在 cli 文档中使用串行逗号（Tobias Nießen） [#47262](https://github.com/nodejs/node/pull/47262)
* \[[`71246247a9`](https://github.com/nodejs/node/commit/71246247a9)] - **doc**: 改进 Error.captureStackTrace() 的示例（Julian Dax） [#46886](https://github.com/nodejs/node/pull/46886)
* \[[`0b2ba441b2`](https://github.com/nodejs/node/commit/0b2ba441b2)] - **doc**: 澄清调用 destroy() 后的 http 错误事件（Zach Bjornson） [#46903](https://github.com/nodejs/node/pull/46903)
* \[[`a21459e0d5`](https://github.com/nodejs/node/commit/a21459e0d5)] - **doc**: 更新 AbortController 示例的输出（Deokjin Kim） [#47227](https://github.com/nodejs/node/pull/47227)
* \[[`7a2090c14c`](https://github.com/nodejs/node/commit/7a2090c14c)] - **doc**: 在主要版本发布时取消一周一次的分支同步（Rafael Gonzaga） [#47149](https://github.com/nodejs/node/pull/47149)
* \[[`eb4de0043d`](https://github.com/nodejs/node/commit/eb4de0043d)] - **doc**: 修复协作者指南中的语法错误（Mohammed Keyvanzadeh） [#47245](https://github.com/nodejs/node/pull/47245)
* \[[`908798ae19`](https://github.com/nodejs/node/commit/908798ae19)] - **doc**: 更新 stream.reduce 的并发说明（Raz Luvaton） [#47166](https://github.com/nodejs/node/pull/47166)
* \[[`36c118bc92`](https://github.com/nodejs/node/commit/36c118bc92)] - **doc**: 移除 PBKDF2 文档中对 DEFAULT\_ENCODING 的使用（Tobias Nießen） [#47181](https://github.com/nodejs/node/pull/47181)
* \[[`7ec87fd5ce`](https://github.com/nodejs/node/commit/7ec87fd5ce)] - **doc**: 修复 async\_context.md 中的拼写错误（Shubham Sharma） [#47155](https://github.com/nodejs/node/pull/47155)
* \[[`a03aaba996`](https://github.com/nodejs/node/commit/a03aaba996)] - **doc**: 更新协作者指南以反映 TSC 变更（Rich Trott） [#47126](https://github.com/nodejs/node/pull/47126)
* \[[`c45a6977ec`](https://github.com/nodejs/node/commit/c45a6977ec)] - **doc**: 澄清 `fs.create{Read,Write}Stream` 支持 `AbortSignal`（Antoine du Hamel） [#47122](https://github.com/nodejs/node/pull/47122)
* \[[`82c7757177`](https://github.com/nodejs/node/commit/82c7757177)] - **doc**: 改进 util.types.isNativeError() 的文档（Julian Dax） [#46840](https://github.com/nodejs/node/pull/46840)
* \[[`8f9b9c17d5`](https://github.com/nodejs/node/commit/8f9b9c17d5)] - **doc**: 将 startup performance initiative 重命名为 startup snapshot (#47111)（Joyee Cheung）
* \[[`c08995e897`](https://github.com/nodejs/node/commit/c08995e897)] - **doc**: 表明 `name` 不再是可选参数（Daniel Roe） [#47102](https://github.com/nodejs/node/pull/47102)
* \[[`316d626e61`](https://github.com/nodejs/node/commit/316d626e61)] - **doc**: 修复“维护依赖项”标题中的拼写错误（Keyhan Vakil） [#47082](https://github.com/nodejs/node/pull/47082)
* \[[`a4b1a7761f`](https://github.com/nodejs/node/commit/a4b1a7761f)] - **esm**: 在可能的情况下跳过从 file: URL 到路径的转换（Antoine du Hamel） [#46305](https://github.com/nodejs/node/pull/46305)
* \[[`c5cd6b7f3b`](https://github.com/nodejs/node/commit/c5cd6b7f3b)] - **(SEMVER-MINOR)** **events**: 添加 getMaxListeners 方法（Khafra） [#47039](https://github.com/nodejs/node/pull/47039)
* \[[`2c2b07ce5f`](https://github.com/nodejs/node/commit/2c2b07ce5f)] - **fs**: 在写入时使从空文件创建的 blob 失效（Debadree Chatterjee） [#47199](https://github.com/nodejs/node/pull/47199)
* \[[`e33dfce401`](https://github.com/nodejs/node/commit/e33dfce401)] - **inspector**: 在 inspector 中记录响应和请求以便调试（Joyee Cheung） [#46941](https://github.com/nodejs/node/pull/46941)
* \[[`f6ec81dc05`](https://github.com/nodejs/node/commit/f6ec81dc05)] - **inspector**: 修复 session.disconnect 崩溃（theanarkh） [#46942](https://github.com/nodejs/node/pull/46942)
* \[[`a738164fed`](https://github.com/nodejs/node/commit/a738164fed)] - **lib**: 在原型中定义 Event.isTrusted（Santiago Gimeno） [#46974](https://github.com/nodejs/node/pull/46974)
* \[[`7d37dcdd9a`](https://github.com/nodejs/node/commit/7d37dcdd9a)] - **(SEMVER-MINOR)** **lib**: 向 diagnostics\_channel 添加 tracing channel（Stephen Belanger） [#44943](https://github.com/nodejs/node/pull/44943)
* \[[`16d3dfa0aa`](https://github.com/nodejs/node/commit/16d3dfa0aa)] - **meta**: 修复 notable-change 注释标签的 url（Filip Skokan） [#47300](https://github.com/nodejs/node/pull/47300)
* \[[`2c95f6e18b`](https://github.com/nodejs/node/commit/2c95f6e18b)] - **meta**: 澄清威胁模型以解释 JSON.parse 的情况（Matteo Collina） [#47276](https://github.com/nodejs/node/pull/47276)
* \[[`22b9acdbf8`](https://github.com/nodejs/node/commit/22b9acdbf8)] - **meta**: 更新协作者讨论页面的链接（Michaël Zasso） [#47211](https://github.com/nodejs/node/pull/47211)
* \[[`dc024d930a`](https://github.com/nodejs/node/commit/dc024d930a)] - **meta**: 在添加 notable change 标签时自动请求说明（Danielle Adams） [#47078](https://github.com/nodejs/node/pull/47078)
* \[[`54195357f3`](https://github.com/nodejs/node/commit/54195357f3)] - **meta**: 将 TSC 投票成员移至普通成员（Node.js GitHub Bot） [#47180](https://github.com/nodejs/node/pull/47180)
* \[[`a3bffbaa11`](https://github.com/nodejs/node/commit/a3bffbaa11)] - **meta**: 将 TSC 投票成员移至普通成员资格（Node.js GitHub Bot） [#46985](https://github.com/nodejs/node/pull/46985)
* \[[`d2a6aa6ecd`](https://github.com/nodejs/node/commit/d2a6aa6ecd)] - **meta**: 更新 GOVERNANCE.md 以反映 TSC 章程变更（Rich Trott） [#47126](https://github.com/nodejs/node/pull/47126)
* \[[`b0aad345bf`](https://github.com/nodejs/node/commit/b0aad345bf)] - **meta**: 在 bug 模板中询问预期行为的原因（Ben Noordhuis） [#47049](https://github.com/nodejs/node/pull/47049)
* \[[`c03e79b141`](https://github.com/nodejs/node/commit/c03e79b141)] - **(SEMVER-MINOR)** **msi**: 迁移到 WiX4（Stefan Stojanovic） [#45943](https://github.com/nodejs/node/pull/45943)
* \[[`ca981be2b9`](https://github.com/nodejs/node/commit/ca981be2b9)] - **(SEMVER-MINOR)** **node-api**: 弃用 napi\_module\_register（Vladimir Morozov） [#46319](https://github.com/nodejs/node/pull/46319)
* \[[`77f7200cce`](https://github.com/nodejs/node/commit/77f7200cce)] - **node-api**: 将类型标记扩展到 externals（Gabriel Schulhof） [#47141](https://github.com/nodejs/node/pull/47141)
* \[[`55f3d215b8`](https://github.com/nodejs/node/commit/55f3d215b8)] - **node-api**: 记录 node-api 关闭终结流程（Chengzhong Wu） [#45903](https://github.com/nodejs/node/pull/45903)
* \[[`b3fe2ba59b`](https://github.com/nodejs/node/commit/b3fe2ba59b)] - **node-api**: 验证清理钩子的顺序（Chengzhong Wu） [#46692](https://github.com/nodejs/node/pull/46692)
* \[[`d6a12328a6`](https://github.com/nodejs/node/commit/d6a12328a6)] - **repl**: 在按下 ESCAPE 键时保留预览（Xuguang Mei） [#46878](https://github.com/nodejs/node/pull/46878)
* \[[`33b0906640`](https://github.com/nodejs/node/commit/33b0906640)] - **sea**: 修复 asan 检测到的内存泄漏（Darshan Sen） [#47309](https://github.com/nodejs/node/pull/47309)
* \[[`069515153f`](https://github.com/nodejs/node/commit/069515153f)] - **src**: 移除 `std::shared_ptr<T>::unique()` 的使用（Darshan Sen） [#47315](https://github.com/nodejs/node/pull/47315)
* \[[`4405fc879a`](https://github.com/nodejs/node/commit/4405fc879a)] - **src**: 使用更严格的编译期指导（Tobias Nießen） [#46509](https://github.com/nodejs/node/pull/46509)
* \[[`bbde68e5de`](https://github.com/nodejs/node/commit/bbde68e5de)] - **src**: 移除 crypto\_x509.cc 中未使用的变量（Michaël Zasso） [#47344](https://github.com/nodejs/node/pull/47344)
* \[[`7a80312e19`](https://github.com/nodejs/node/commit/7a80312e19)] - **src**: 不要重置嵌入器信号处理器（Dmitry Vyukov） [#47188](https://github.com/nodejs/node/pull/47188)
* \[[`d0a5e7e342`](https://github.com/nodejs/node/commit/d0a5e7e342)] - **src**: 修复最近引入的若干 Coverity 问题（Michael Dawson） [#47240](https://github.com/nodejs/node/pull/47240)
* \[[`0a4ff2f9a0`](https://github.com/nodejs/node/commit/0a4ff2f9a0)] - **src**: 用 CHECK 替换不可能的 THROW（Tobias Nießen） [#47168](https://github.com/nodejs/node/pull/47168)
* \[[`2fd0f79963`](https://github.com/nodejs/node/commit/2fd0f79963)] - **src**: 修复 externalized builtin code 的重复（Keyhan Vakil） [#47079](https://github.com/nodejs/node/pull/47079)
* \[[`36a026bf44`](https://github.com/nodejs/node/commit/36a026bf44)] - **src**: 移除关于 return\_code\_cache 的无用注释（Keyhan Vakil） [#47083](https://github.com/nodejs/node/pull/47083)
* \[[`aefe26692c`](https://github.com/nodejs/node/commit/aefe26692c)] - **src**: 移除 SSL\_CTX\_get\_tlsext\_ticket\_keys 的保护代码（Tobias Nießen） [#47068](https://github.com/nodejs/node/pull/47068)
* \[[`90f4e16350`](https://github.com/nodejs/node/commit/90f4e16350)] - **src**: 修复 clang 14 链接器错误（Keyhan Vakil） [#47057](https://github.com/nodejs/node/pull/47057)
* \[[`b0809a73da`](https://github.com/nodejs/node/commit/b0809a73da)] - **src,http2**: 确保在帧未发送时进行清理（ywave620） [#47244](https://github.com/nodejs/node/pull/47244)
* \[[`1fc62c7b35`](https://github.com/nodejs/node/commit/1fc62c7b35)] - **(SEMVER-MINOR)** **stream**: 为默认 highWaterMark 添加 setter 和 getter (#46929)（Robert Nagy） [#46929](https://github.com/nodejs/node/pull/46929)
* \[[`b8c6ceddd5`](https://github.com/nodejs/node/commit/b8c6ceddd5)] - **stream**: 暴露 stream 符号（Robert Nagy） [#45671](https://github.com/nodejs/node/pull/45671)
* \[[`f37825660c`](https://github.com/nodejs/node/commit/f37825660c)] - **stream**: 在 finished 时不要等待 take 中的下一个项（Raz Luvaton） [#47132](https://github.com/nodejs/node/pull/47132)
* \[[`8eceaaeb4d`](https://github.com/nodejs/node/commit/8eceaaeb4d)] - **test**: 修复不稳定的 test-watch-mode-inspect（Moshe Atlow） [#47403](https://github.com/nodejs/node/pull/47403)
* \[[`db95ed0b1b`](https://github.com/nodejs/node/commit/db95ed0b1b)] - **test**: 将带有 --port=0 的 debugger 测试移至并行执行（Joyee Cheung） [#47274](https://github.com/nodejs/node/pull/47274)
* \[[`041885ebd0`](https://github.com/nodejs/node/commit/041885ebd0)] - **test**: 在不必使用 9229 的 debugger 测试中使用 --port=0（Joyee Cheung） [#47274](https://github.com/nodejs/node/pull/47274)
* \[[`130420b9e1`](https://github.com/nodejs/node/commit/130420b9e1)] - **test**: 并行运行 doctool 测试（Joyee Cheung） [#47273](https://github.com/nodejs/node/pull/47273)
* \[[`4b4336c34e`](https://github.com/nodejs/node/commit/4b4336c34e)] - **test**: 验证 tracePromise 不会执行 runStores（Stephen Belanger） [#47349](https://github.com/nodejs/node/pull/47349)
* \[[`54261f3294`](https://github.com/nodejs/node/commit/54261f3294)] - **test**: 再次并行运行 WPT 文件（Filip Skokan） [#47283](https://github.com/nodejs/node/pull/47283)
* \[[`e2eb0543be`](https://github.com/nodejs/node/commit/e2eb0543be)] - **test**: 更新 wasm/jsapi WPT（Michaël Zasso） [#47210](https://github.com/nodejs/node/pull/47210)
* \[[`d341d0389f`](https://github.com/nodejs/node/commit/d341d0389f)] - **test**: 跳过 ARM 上的 test-wasm-web-api（Michaël Zasso） [#47299](https://github.com/nodejs/node/pull/47299)
* \[[`567573b16a`](https://github.com/nodejs/node/commit/567573b16a)] - **test**: 跳过 instantiateStreaming-bad-imports WPT（Michaël Zasso） [#47292](https://github.com/nodejs/node/pull/47292)
* \[[`45e7b10287`](https://github.com/nodejs/node/commit/45e7b10287)] - **test**: 修复 checkPrime 的“checks”验证测试（Tobias Nießen） [#47139](https://github.com/nodejs/node/pull/47139)
* \[[`5749dfae70`](https://github.com/nodejs/node/commit/5749dfae70)] - **test**: 更新 URL web-platform-tests（Yagiz Nizipli） [#47135](https://github.com/nodejs/node/pull/47135)
* \[[`49981b93d2`](https://github.com/nodejs/node/commit/49981b93d2)] - **test**: 降低 test-http-remove-header-stays-removed.js 的不稳定性（Debadree Chatterjee） [#46855](https://github.com/nodejs/node/pull/46855)
* \[[`6772aa652a`](https://github.com/nodejs/node/commit/6772aa652a)] - **test**: 修复 test-child-process-exec-cwd（Stefan Stojanovic） [#47235](https://github.com/nodejs/node/pull/47235)
* \[[`41a69e772b`](https://github.com/nodejs/node/commit/41a69e772b)] - **test**: 跳过 win arm64 上有问题的测试（Stefan Stojanovic） [#47020](https://github.com/nodejs/node/pull/47020)
* \[[`7bcfd18f2c`](https://github.com/nodejs/node/commit/7bcfd18f2c)] - **test**: 将 test-http-max-sockets 标记为 win32 上的不稳定测试（Tobias Nießen） [#47134](https://github.com/nodejs/node/pull/47134)
* \[[`b96808b3e2`](https://github.com/nodejs/node/commit/b96808b3e2)] - **test,crypto**: 更新 WebCryptoAPI WPT（Filip Skokan） [#47222](https://github.com/nodejs/node/pull/47222)
* \[[`65955f1e46`](https://github.com/nodejs/node/commit/65955f1e46)] - **test,crypto**: 更新 WebCryptoAPI WPT（Filip Skokan） [#47131](https://github.com/nodejs/node/pull/47131)
* \[[`bc6511a243`](https://github.com/nodejs/node/commit/bc6511a243)] - **test\_runner**: 仅在可用颜色时为错误着色（Moshe Atlow） [#47394](https://github.com/nodejs/node/pull/47394)
* \[[`463361e625`](https://github.com/nodejs/node/commit/463361e625)] - **test\_runner**: 当所有测试都通过时隐藏失败测试标题（Moshe Atlow） [#47370](https://github.com/nodejs/node/pull/47370)
* \[[`eb837ce80d`](https://github.com/nodejs/node/commit/eb837ce80d)] - **test\_runner**: 将 AssertError 的 expected 和 actual 转为字符串（Moshe Atlow） [#47088](https://github.com/nodejs/node/pull/47088)
* \[[`6b87f29000`](https://github.com/nodejs/node/commit/6b87f29000)] - **test\_runner**: 为 spec reporter 添加代码覆盖率支持（Pulkit Gupta） [#46674](https://github.com/nodejs/node/pull/46674)
* \[[`bd4697a2a3`](https://github.com/nodejs/node/commit/bd4697a2a3)] - **test\_runner**: 暴露 reporter 供 run api 使用（Chemi Atlow） [#47238](https://github.com/nodejs/node/pull/47238)
* \[[`3e7f8e8482`](https://github.com/nodejs/node/commit/3e7f8e8482)] - **test\_runner**: 在摘要之后报告失败的测试（HinataKah0） [#47164](https://github.com/nodejs/node/pull/47164)
* \[[`4530582767`](https://github.com/nodejs/node/commit/4530582767)] - **test\_runner**: 统计嵌套测试（Moshe Atlow） [#47094](https://github.com/nodejs/node/pull/47094)
* \[[`5a43586554`](https://github.com/nodejs/node/commit/5a43586554)] - **test\_runner**: 接受 \x1b 作为转义符号（Debadree Chatterjee） [#47050](https://github.com/nodejs/node/pull/47050)
* \[[`a5ebc896f1`](https://github.com/nodejs/node/commit/a5ebc896f1)] - **test\_runner**: 支持在 NODE\_OPTIONS 中定义测试 reporter（Steve Herzog） [#46688](https://github.com/nodejs/node/pull/46688)
* \[[`a65fe5c29a`](https://github.com/nodejs/node/commit/a65fe5c29a)] - **tools**: 修复 update-openssl.yml 的比较版本（Marco Ippolito） [#47384](https://github.com/nodejs/node/pull/47384)
* \[[`760e13c58d`](https://github.com/nodejs/node/commit/760e13c58d)] - **tools**: 确保失败的每日 WPT 运行仍会生成报告（Filip Skokan） [#47376](https://github.com/nodejs/node/pull/47376)
* \[[`9c975f79f0`](https://github.com/nodejs/node/commit/9c975f79f0)] - **tools**: 使用 ref\_name 获取推送所在分支（Debadree Chatterjee） [#47358](https://github.com/nodejs/node/pull/47358)
* \[[`b1d6a15028`](https://github.com/nodejs/node/commit/b1d6a15028)] - **tools**: 为 Slack 消息添加一个 at here 标签（Debadree Chatterjee） [#47358](https://github.com/nodejs/node/pull/47358)
* \[[`c340de6d51`](https://github.com/nodejs/node/commit/c340de6d51)] - **tools**: 禁用 Codecov 提交状态（Michaël Zasso） [#47306](https://github.com/nodejs/node/pull/47306)
* \[[`034082f0e5`](https://github.com/nodejs/node/commit/034082f0e5)] - **tools**: 将 eslint 更新到 8.37.0（Node.js GitHub Bot） [#47333](https://github.com/nodejs/node/pull/47333)
* \[[`03b6650c81`](https://github.com/nodejs/node/commit/03b6650c81)] - **tools**: 修复 duration\_ms 使其单位为毫秒（Moshe Atlow） [#44490](https://github.com/nodejs/node/pull/44490)
* \[[`30c667ec3a`](https://github.com/nodejs/node/commit/30c667ec3a)] - **tools**: 自动更新 brotli（Marco Ippolito） [#47205](https://github.com/nodejs/node/pull/47205)
* \[[`83791e5459`](https://github.com/nodejs/node/commit/83791e5459)] - **tools**: 修复 nghttp2 路径中的拼写错误（Marco Ippolito） [#47330](https://github.com/nodejs/node/pull/47330)
* \[[`53e8dad64a`](https://github.com/nodejs/node/commit/53e8dad64a)] - **tools**: 添加 scorecard 工作流（Mateo Nunez） [#47254](https://github.com/nodejs/node/pull/47254)
* \[[`2499677d0b`](https://github.com/nodejs/node/commit/2499677d0b)] - **tools**: 按哈希固定 auto-start-ci.yml 的 actions（Gabriela Gutierrez） [#46820](https://github.com/nodejs/node/pull/46820)
* \[[`98f64ee724`](https://github.com/nodejs/node/commit/98f64ee724)] - **tools**: 标准化 base64 更新（Marco Ippolito） [#47201](https://github.com/nodejs/node/pull/47201)
* \[[`c1ef1fde8f`](https://github.com/nodejs/node/commit/c1ef1fde8f)] - **tools**: 更新 codecov 分支（Rich Trott） [#47285](https://github.com/nodejs/node/pull/47285)
* \[[`9ecf2a4144`](https://github.com/nodejs/node/commit/9ecf2a4144)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.20.2（Node.js GitHub Bot） [#47255](https://github.com/nodejs/node/pull/47255)
* \[[`def7e3d908`](https://github.com/nodejs/node/commit/def7e3d908)] - **tools**: 将 Windows 数字签名升级为 SHA256（Tobias Nießen） [#47206](https://github.com/nodejs/node/pull/47206)
* \[[`0b78ac53ad`](https://github.com/nodejs/node/commit/0b78ac53ad)] - **tools**: 标准化 update-llhttp.sh（Marco Ippolito） [#47198](https://github.com/nodejs/node/pull/47198)
* \[[`deb80b1c46`](https://github.com/nodejs/node/commit/deb80b1c46)] - **tools**: 添加将代码示例复制到剪贴板的按钮（jakecastelli） [#46928](https://github.com/nodejs/node/pull/46928)
* \[[`6dca79f1ce`](https://github.com/nodejs/node/commit/6dca79f1ce)] - **tools**: 标准化 update-nghttp2.sh（Marco Ippolito） [#47197](https://github.com/nodejs/node/pull/47197)
* \[[`0c613c9347`](https://github.com/nodejs/node/commit/0c613c9347)] - **tools**: 修复 Slack 通知 action（Antoine du Hamel） [#47237](https://github.com/nodejs/node/pull/47237)
* \[[`3f49da5113`](https://github.com/nodejs/node/commit/3f49da5113)] - **tools**: 在无效提交落地时向 Slack 发送通知（Antoine du Hamel） [#47178](https://github.com/nodejs/node/pull/47178)
* \[[`337123d657`](https://github.com/nodejs/node/commit/337123d657)] - **tools**: 更新每日 WPT actions 摘要（Filip Skokan） [#47138](https://github.com/nodejs/node/pull/47138)
* \[[`78ce8d3469`](https://github.com/nodejs/node/commit/78ce8d3469)] - **tools**: 允许测试 tap 输出包含 Unicode 字符（Moshe Atlow） [#47175](https://github.com/nodejs/node/pull/47175)
* \[[`8850dacc88`](https://github.com/nodejs/node/commit/8850dacc88)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.19.1（Node.js GitHub Bot） [#47045](https://github.com/nodejs/node/pull/47045)
* \[[`d1ca5b6d47`](https://github.com/nodejs/node/commit/d1ca5b6d47)] - **tools**: 使 update-ada.sh 与其他脚本保持一致（Tony Gorez） [#47044](https://github.com/nodejs/node/pull/47044)
* \[[`b58d52301e`](https://github.com/nodejs/node/commit/b58d52301e)] - **tools**: 将 eslint 更新到 8.36.0（Node.js GitHub Bot） [#47046](https://github.com/nodejs/node/pull/47046)
* \[[`d78bef8a1f`](https://github.com/nodejs/node/commit/d78bef8a1f)] - **tools,meta**: 更新 README 和 tools 以反映 TSC 章程的变化（Rich Trott） [#47126](https://github.com/nodejs/node/pull/47126)
* \[[`d243115f41`](https://github.com/nodejs/node/commit/d243115f41)] - **url**: 改进 URLSearchParams 创建性能（Yagiz Nizipli） [#47190](https://github.com/nodejs/node/pull/47190)
* \[[`461ef04f87`](https://github.com/nodejs/node/commit/461ef04f87)] - **url**: 为 `url.parse()` 添加 pending-deprecation（Yagiz Nizipli） [#47203](https://github.com/nodejs/node/pull/47203)
* \[[`ef62e5a59e`](https://github.com/nodejs/node/commit/ef62e5a59e)] - **(SEMVER-MINOR)** **url**: 实现 URL.canParse（Khafra） [#47179](https://github.com/nodejs/node/pull/47179)
* \[[`0b565e8f62`](https://github.com/nodejs/node/commit/0b565e8f62)] - **url**: 允许扩展用户提供的 URL 对象（Antoine du Hamel） [#46989](https://github.com/nodejs/node/pull/46989)
* \[[`cbb362736b`](https://github.com/nodejs/node/commit/cbb362736b)] - **util**: 修复在 `cause` 的 getter 抛出异常时检查错误的行为（Antoine du Hamel） [#47163](https://github.com/nodejs/node/pull/47163)
* \[[`9537672511`](https://github.com/nodejs/node/commit/9537672511)] - **vm**: 正确处理在任意值上定义属性（Nicolas DUBIEN） [#46615](https://github.com/nodejs/node/pull/46615)
* \[[`75669e98bf`](https://github.com/nodejs/node/commit/75669e98bf)] - **watch**: 修复带等号的 watch 路径（Moshe Atlow） [#47369](https://github.com/nodejs/node/pull/47369)

<a id="19.8.1"></a>

## 2023-03-15, 版本 19.8.1 (当前), @targos

### 重要变更

此版本包含对 v19.8.0 中引入的一个变更的单次回退，
该变更会导致应用崩溃。

修复：<https://github.com/nodejs/node/issues/47096>

### 提交

* \[[`f7c8aa4cf1`](https://github.com/nodejs/node/commit/f7c8aa4cf1)] - _**回退**_ "**vm**: 修复在使用 importModuleDynamically 时 vm.compileFunction 中的泄漏" (Michaël Zasso) [#47101](https://github.com/nodejs/node/pull/47101)

<a id="19.8.0"></a>

## 2023-03-14, 版本 19.8.0 (当前), @targos

### 重要变更

* \[[`2fece54ca1`](https://github.com/nodejs/node/commit/2fece54ca1)] - **(SEMVER-MINOR)** **buffer**: 添加 `Buffer.copyBytesFrom(...)` (James M Snell) [#46500](https://github.com/nodejs/node/pull/46500)
* \[[`2eb887549a`](https://github.com/nodejs/node/commit/2eb887549a)] - **(SEMVER-MINOR)** **events**: 为 `listenerCount` 添加 `listener` 参数 (Paolo Insogna) [#46523](https://github.com/nodejs/node/pull/46523)
* \[[`c1651bea41`](https://github.com/nodejs/node/commit/c1651bea41)] - **(SEMVER-MINOR)** **lib**: 添加 `AsyncLocalStorage.bind()` 和 `.snapshot()` (flakey5) [#46387](https://github.com/nodejs/node/pull/46387)
* \[[`36f36b99b0`](https://github.com/nodejs/node/commit/36f36b99b0)] - **(SEMVER-MINOR)** **src**: 添加 `fs.openAsBlob` 以支持基于文件的 Blob (James M Snell) [#45258](https://github.com/nodejs/node/pull/45258)
* \[[`bb9b1c637d`](https://github.com/nodejs/node/commit/bb9b1c637d)] - **(SEMVER-MINOR)** **tls**: 支持自动 DHE (Tobias Nießen) [#46978](https://github.com/nodejs/node/pull/46978)
* \[[`1e20b05acd`](https://github.com/nodejs/node/commit/1e20b05acd)] - **(SEMVER-MINOR)** **url**: 实现 `URLSearchParams` 的 `size` getter (James M Snell) [#46308](https://github.com/nodejs/node/pull/46308)
* \[[`60e5f45141`](https://github.com/nodejs/node/commit/60e5f45141)] - **(SEMVER-MINOR)** **wasi**: 在创建 WASI 时添加对版本的支持 (Michael Dawson) [#46469](https://github.com/nodejs/node/pull/46469)
* \[[`a646a22d0f`](https://github.com/nodejs/node/commit/a646a22d0f)] - **(SEMVER-MINOR)** **worker**: 在 inspector 和 trace\_events 中添加对 worker 名称的支持 (Debadree Chatterjee) [#46832](https://github.com/nodejs/node/pull/46832)
* \[[`bd5ef380a5`](https://github.com/nodejs/node/commit/bd5ef380a5)] - **doc**: 将 marco-ippolito 添加到协作者中 (Marco Ippolito) [#46816](https://github.com/nodejs/node/pull/46816)

### 提交

* \[[`e11f08e2c2`](https://github.com/nodejs/node/commit/e11f08e2c2)] - **assert**: 修复 try catch 块中 assert(0) 的异常消息 (hidecology) [#46760](https://github.com/nodejs/node/pull/46760)
* \[[`a38de61e87`](https://github.com/nodejs/node/commit/a38de61e87)] - **assert**: 移除已弃用的 getFunction() 用法 (Ruben Bridgewater) [#46661](https://github.com/nodejs/node/pull/46661)
* \[[`e07c9b82b7`](https://github.com/nodejs/node/commit/e07c9b82b7)] - **assert,util**: 回退递归性的破坏性变更 (Ruben Bridgewater) [#46593](https://github.com/nodejs/node/pull/46593)
* \[[`7f85a2cb6f`](https://github.com/nodejs/node/commit/7f85a2cb6f)] - **assert,util**: 提升深度相等比较性能 (Ruben Bridgewater) [#46593](https://github.com/nodejs/node/pull/46593)
* \[[`7cfd31a753`](https://github.com/nodejs/node/commit/7cfd31a753)] - **benchmark**: 添加一个用于 URLSearchParams 创建和 toString() 的基准测试 (Debadree Chatterjee) [#46810](https://github.com/nodejs/node/pull/46810)
* \[[`258d5f7b3c`](https://github.com/nodejs/node/commit/258d5f7b3c)] - **benchmark**: 用文件树结构说明替换文档中的表格 (Theodor Steiner) [#46991](https://github.com/nodejs/node/pull/46991)
* \[[`0617c5e81b`](https://github.com/nodejs/node/commit/0617c5e81b)] - **benchmark**: 稳定 encode 基准测试 (Joyee Cheung) [#46658](https://github.com/nodejs/node/pull/46658)
* \[[`04166fe2fa`](https://github.com/nodejs/node/commit/04166fe2fa)] - **benchmark**: 拆分 `Buffer.byteLength` 基准测试 (Joyee Cheung) [#46616](https://github.com/nodejs/node/pull/46616)
* \[[`760a35144f`](https://github.com/nodejs/node/commit/760a35144f)] - **benchmark**: 添加 EventTarget 添加和移除的基准测试 (Debadree Chatterjee) [#46779](https://github.com/nodejs/node/pull/46779)
* \[[`9890eaa23d`](https://github.com/nodejs/node/commit/9890eaa23d)] - **benchmark**: 修复 worker 启动基准测试 (Joyee Cheung) [#46680](https://github.com/nodejs/node/pull/46680)
* \[[`86b36212f6`](https://github.com/nodejs/node/commit/86b36212f6)] - **benchmark**: 为保证正确性而重构 assert 基准测试 (Ruben Bridgewater) [#46593](https://github.com/nodejs/node/pull/46593)
* \[[`cc74821477`](https://github.com/nodejs/node/commit/cc74821477)] - **bootstrap**: 在环境创建失败期间打印堆栈跟踪 (Joyee Cheung) [#46533](https://github.com/nodejs/node/pull/46533)
* \[[`2fece54ca1`](https://github.com/nodejs/node/commit/2fece54ca1)] - **(SEMVER-MINOR)** **buffer**: 添加 Buffer.copyBytesFrom(...) (James M Snell) [#46500](https://github.com/nodejs/node/pull/46500)
* \[[`b3e1034660`](https://github.com/nodejs/node/commit/b3e1034660)] - **buffer**: 为 `Buffer.byteLength` 的实现使用 v8 fast API 调用 (Joyee Cheung) [#46616](https://github.com/nodejs/node/pull/46616)
* \[[`4b3b009afd`](https://github.com/nodejs/node/commit/4b3b009afd)] - **build**: 修复 Arm64 的 Visual Studio 安装检测 (Radek Bartoň) [#46420](https://github.com/nodejs/node/pull/46420)
* \[[`d4899b2b75`](https://github.com/nodejs/node/commit/d4899b2b75)] - **build,test**: 为 IBM i 添加正确的支持 (Xu Meng) [#46739](https://github.com/nodejs/node/pull/46739)
* \[[`81592ff073`](https://github.com/nodejs/node/commit/81592ff073)] - **child\_process**: 在源文件中添加尾随逗号 (Antoine du Hamel) [#46758](https://github.com/nodejs/node/pull/46758)
* \[[`16bbbacba8`](https://github.com/nodejs/node/commit/16bbbacba8)] - **cluster**: 在源文件中添加尾随逗号 (Antoine du Hamel) [#46695](https://github.com/nodejs/node/pull/46695)
* \[[`2b7eb56e9b`](https://github.com/nodejs/node/commit/2b7eb56e9b)] - **debugger**: 改进 watch 和 unwatch 的验证与文档 (Eungyu Lee) [#46947](https://github.com/nodejs/node/pull/46947)
* \[[`afbd818669`](https://github.com/nodejs/node/commit/afbd818669)] - **debugger**: 添加一个命令，用于设置要检查上下文的行 (Eungyu Lee) [#46812](https://github.com/nodejs/node/pull/46812)
* \[[`83b529ff27`](https://github.com/nodejs/node/commit/83b529ff27)] - **debugger**: 在源文件中添加尾随逗号 (Antoine du Hamel) [#46714](https://github.com/nodejs/node/pull/46714)
* \[[`84f5a1f942`](https://github.com/nodejs/node/commit/84f5a1f942)] - **deps**: 将 undici 更新到 5.21.0 (Node.js GitHub Bot) [#47063](https://github.com/nodejs/node/pull/47063)
* \[[`fb1ac98900`](https://github.com/nodejs/node/commit/fb1ac98900)] - **deps**: 将 simdutf 更新到 3.2.2 (Node.js GitHub Bot) [#46841](https://github.com/nodejs/node/pull/46841)
* \[[`7ab7f97c4e`](https://github.com/nodejs/node/commit/7ab7f97c4e)] - **deps**: 将 uvwasi 更新到 v0.0.16 (Michael Dawson) [#46434](https://github.com/nodejs/node/pull/46434)
* \[[`b825e2db65`](https://github.com/nodejs/node/commit/b825e2db65)] - **deps**: 将 ada 更新到 1.0.4 (Node.js GitHub Bot) [#46853](https://github.com/nodejs/node/pull/46853)
* \[[`8b1afe3f45`](https://github.com/nodejs/node/commit/8b1afe3f45)] - **deps**: 将 corepack 更新到 0.17.0 (Node.js GitHub Bot) [#46842](https://github.com/nodejs/node/pull/46842)
* \[[`151fb60b28`](https://github.com/nodejs/node/commit/151fb60b28)] - **deps**: 将 simdutf 更新到 3.2.1 (Node.js GitHub Bot) [#46800](https://github.com/nodejs/node/pull/46800)
* \[[`92f2f1910e`](https://github.com/nodejs/node/commit/92f2f1910e)] - **deps**: 将 npm 升级到 9.5.1 (npm team) [#46783](https://github.com/nodejs/node/pull/46783)
* \[[`4e18e0a43a`](https://github.com/nodejs/node/commit/4e18e0a43a)] - **deps**: 将 ada 更新到 1.0.3 (Node.js GitHub Bot) [#46784](https://github.com/nodejs/node/pull/46784)
* \[[`68dde38c8e`](https://github.com/nodejs/node/commit/68dde38c8e)] - **deps**: 将 nghttp2 更新到 1.52.0 (Michaël Zasso) [#46636](https://github.com/nodejs/node/pull/46636)
* \[[`d9069e7614`](https://github.com/nodejs/node/commit/d9069e7614)] - **deps**: 修复 Android 的 libuv (Julian Dropmann) [#46746](https://github.com/nodejs/node/pull/46746)
* \[[`c786ed3ecc`](https://github.com/nodejs/node/commit/c786ed3ecc)] - **deps**: V8: cherry-pick 90be99fab31c (Michaël Zasso) [#46646](https://github.com/nodejs/node/pull/46646)
* \[[`fb146ee741`](https://github.com/nodejs/node/commit/fb146ee741)] - **deps**: 将 simdutf 更新到 3.2.0 (Node.js GitHub Bot) [#46621](https://github.com/nodejs/node/pull/46621)
* \[[`adff278c47`](https://github.com/nodejs/node/commit/adff278c47)] - **deps,test**: 将 postject 更新到 1.0.0-alpha.5 (Node.js GitHub Bot) [#46934](https://github.com/nodejs/node/pull/46934)
* \[[`247dfb7d73`](https://github.com/nodejs/node/commit/247dfb7d73)] - **dgram**: 修复在关闭的 udp socket 上触发未处理异常导致进程中止的问题 (Ramana Venkata) [#46770](https://github.com/nodejs/node/pull/46770)
* \[[`c310a32857`](https://github.com/nodejs/node/commit/c310a32857)] - **doc**: 移除剩余的 SSL\_OP\_NETSCAPE\_\*\_BUG (Tobias Nießen) [#47066](https://github.com/nodejs/node/pull/47066)
* \[[`89f31a1c7f`](https://github.com/nodejs/node/commit/89f31a1c7f)] - **doc**: 修复 test.md 中的拼写错误 (Victor Hiairrassary) [#47053](https://github.com/nodejs/node/pull/47053)
* \[[`94882f579f`](https://github.com/nodejs/node/commit/94882f579f)] - **doc**: 修订支持级别限定条件 (Gireesh Punathil) [#42805](https://github.com/nodejs/node/pull/42805)
* \[[`cbdaaf6197`](https://github.com/nodejs/node/commit/cbdaaf6197)] - **doc**: 修复 esm loaders 示例中的拼写错误 (Ruy Adorno) [#47015](https://github.com/nodejs/node/pull/47015)
* \[[`17d3eb02f7`](https://github.com/nodejs/node/commit/17d3eb02f7)] - **doc**: 为 man page 添加缺失的 test runner 标志 (Colin Ihrig) [#46982](https://github.com/nodejs/node/pull/46982)
* \[[`5f0f1c4197`](https://github.com/nodejs/node/commit/5f0f1c4197)] - **doc**: 修复 `node:diagnostics_channel` 的历史信息 (Thomas Hunter II) [#46984](https://github.com/nodejs/node/pull/46984)
* \[[`67e20f53cd`](https://github.com/nodejs/node/commit/67e20f53cd)] - **doc**: 修复 url 中未定义 myUrl 的问题 (Youngmin Yoo) [#46968](https://github.com/nodejs/node/pull/46968)
* \[[`f903ea502c`](https://github.com/nodejs/node/commit/f903ea502c)] - **doc**: 移除无用的 SSL\_OP\_\* 选项 (Tobias Nießen) [#46954](https://github.com/nodejs/node/pull/46954)
* \[[`5fdd3f454f`](https://github.com/nodejs/node/commit/5fdd3f454f)] - **doc**: 修复 TLS dhparam 选项的描述 (Tobias Nießen) [#46949](https://github.com/nodejs/node/pull/46949)
* \[[`ba5ff15b38`](https://github.com/nodejs/node/commit/ba5ff15b38)] - **doc**: 提升 fs 代码示例质量 (jakecastelli) [#46948](https://github.com/nodejs/node/pull/46948)
* \[[`6f18b947be`](https://github.com/nodejs/node/commit/6f18b947be)] - **doc**: 修复 http2 中未定义目标服务器端口的问题 (Deokjin Kim) [#46940](https://github.com/nodejs/node/pull/46940)
* \[[`1b555ae72d`](https://github.com/nodejs/node/commit/1b555ae72d)] - **doc**: 在 http2 中使用大于 1024 的数字作为端口 (Deokjin Kim) [#46938](https://github.com/nodejs/node/pull/46938)
* \[[`07036cf1af`](https://github.com/nodejs/node/commit/07036cf1af)] - **doc**: 为 Juan Arboleda 添加发布密钥 (Juan José) [#46922](https://github.com/nodejs/node/pull/46922)
* \[[`553fd5b90a`](https://github.com/nodejs/node/commit/553fd5b90a)] - **doc**: 修复指向 SSL\_CTX\_set\_options 的链接 (Tobias Nießen) [#46953](https://github.com/nodejs/node/pull/46953)
* \[[`282bf29884`](https://github.com/nodejs/node/commit/282bf29884)] - **doc**: 修复 fs 中缺失的导入 (jakecastelli) [#46907](https://github.com/nodejs/node/pull/46907)
* \[[`f9739a85cb`](https://github.com/nodejs/node/commit/f9739a85cb)] - **doc**: 增加推迟公开安全发布的请求 (Michael Dawson) [#46702](https://github.com/nodejs/node/pull/46702)
* \[[`92a61388de`](https://github.com/nodejs/node/commit/92a61388de)] - **doc**: 修复 stream iterator helpers 示例 (Benjamin Gruenbaum) [#46897](https://github.com/nodejs/node/pull/46897)
* \[[`8aca3cf410`](https://github.com/nodejs/node/commit/8aca3cf410)] - **doc**: 为 `node:test` 添加历史信息 (Antoine du Hamel) [#46851](https://github.com/nodejs/node/pull/46851)
* \[[`c0b6413086`](https://github.com/nodejs/node/commit/c0b6413086)] - **doc**: 调整导入顺序 (jakecastelli) [#46847](https://github.com/nodejs/node/pull/46847)
* \[[`9d2532e2bb`](https://github.com/nodejs/node/commit/9d2532e2bb)] - **doc**: 使用解构导入 (jakecastelli) [#46847](https://github.com/nodejs/node/pull/46847)
* \[[`48cf9845fe`](https://github.com/nodejs/node/commit/48cf9845fe)] - **doc**: 在单文件可执行文档中补充关于签名二进制文件的步骤 (Darshan Sen) [#46764](https://github.com/nodejs/node/pull/46764)
* \[[`bd5ef380a5`](https://github.com/nodejs/node/commit/bd5ef380a5)] - **doc**: 将 marco-ippolito 添加到协作者中 (Marco Ippolito) [#46816](https://github.com/nodejs/node/pull/46816)
* \[[`60d1a4887f`](https://github.com/nodejs/node/commit/60d1a4887f)] - **doc**: 说明如何使用 tls.DEFAULT\_CIPHERS (Andreas Martens) [#46482](https://github.com/nodejs/node/pull/46482)
* \[[`00edc50874`](https://github.com/nodejs/node/commit/00edc50874)] - **doc**: 添加关于性能分析和堆快照的文档 (cola119) [#46787](https://github.com/nodejs/node/pull/46787)
* \[[`fc319d6a4f`](https://github.com/nodejs/node/commit/fc319d6a4f)] - **doc**: 在自定义 reporter 示例中添加 test:coverage 事件 (Richie McColl) [#46752](https://github.com/nodejs/node/pull/46752)
* \[[`1b3a25ef22`](https://github.com/nodejs/node/commit/1b3a25ef22)] - **doc**: 为 .toWeb() 参数补充上下文 (Debadree Chatterjee) [#46617](https://github.com/nodejs/node/pull/46617)
* \[[`88057dda3b`](https://github.com/nodejs/node/commit/88057dda3b)] - **doc**: 为最近的发布补充安全 steward (Michael Dawson) [#46701](https://github.com/nodejs/node/pull/46701)
* \[[`d627164819`](https://github.com/nodejs/node/commit/d627164819)] - **doc**: 澄清 semver-minor 重要变更的处理方式 (Beth Griggs) [#46592](https://github.com/nodejs/node/pull/46592)
* \[[`7806cae4fa`](https://github.com/nodejs/node/commit/7806cae4fa)] - **doc**: 维护 nghttp2 (Marco Ippolito) [#46539](https://github.com/nodejs/node/pull/46539)
* \[[`dd66c48a74`](https://github.com/nodejs/node/commit/dd66c48a74)] - **doc**: 为 NodeEventTarget 添加 emit (Deokjin Kim) [#46356](https://github.com/nodejs/node/pull/46356)
* \[[`458671daeb`](https://github.com/nodejs/node/commit/458671daeb)] - **doc,test**: 扩展 single-executables 支持的平台列表 (Darshan Sen) [#47026](https://github.com/nodejs/node/pull/47026)
* \[[`18f0398242`](https://github.com/nodejs/node/commit/18f0398242)] - **esm**: 允许 resolve 返回 import assertions (Geoffrey Booth) [#46153](https://github.com/nodejs/node/pull/46153)
* \[[`5eb5be8c71`](https://github.com/nodejs/node/commit/5eb5be8c71)] - **esm**: 将 hooks 处理移入单独的类 (Geoffrey Booth) [#45869](https://github.com/nodejs/node/pull/45869)
* \[[`9d4d916fe8`](https://github.com/nodejs/node/commit/9d4d916fe8)] - **esm**: 修复 import assertion 警告 (Antoine du Hamel) [#46971](https://github.com/nodejs/node/pull/46971)
* \[[`2c621d6e3a`](https://github.com/nodejs/node/commit/2c621d6e3a)] - **esm**: 在使用 import assertions 时添加运行时警告 (Antoine du Hamel) [#46901](https://github.com/nodejs/node/pull/46901)
* \[[`1a23eab614`](https://github.com/nodejs/node/commit/1a23eab614)] - **events**: 在源文件中添加尾随逗号 (Antoine du Hamel) [#46759](https://github.com/nodejs/node/pull/46759)
* \[[`2eb887549a`](https://github.com/nodejs/node/commit/2eb887549a)] - **(SEMVER-MINOR)** **events**: 为 `listenerCount` 添加 `listener` 参数 (Paolo Insogna) [#46523](https://github.com/nodejs/node/pull/46523)
* \[[`4c12e6eeeb`](https://github.com/nodejs/node/commit/4c12e6eeeb)] - **fs**: 在源文件中添加尾随逗号 (Antoine du Hamel) [#46696](https://github.com/nodejs/node/pull/46696)
* \[[`774eb1995c`](https://github.com/nodejs/node/commit/774eb1995c)] - **http**: 在添加 noop 事件时使用 listenerCount (Paolo Insogna) [#46769](https://github.com/nodejs/node/pull/46769)
* \[[`aac5c28091`](https://github.com/nodejs/node/commit/aac5c28091)] - **http**: 正确计算严格内容长度 (Robert Nagy) [#46601](https://github.com/nodejs/node/pull/46601)
* \[[`e08514e337`](https://github.com/nodejs/node/commit/e08514e337)] - **http**: 修复对 "Link" 头的验证 (Steve Herzog) [#46466](https://github.com/nodejs/node/pull/46466)
* \[[`6f9cb982a1`](https://github.com/nodejs/node/commit/6f9cb982a1)] - **http**: 统一头部处理方式 (Marco Ippolito) [#46528](https://github.com/nodejs/node/pull/46528)
* \[[`05614f8cf6`](https://github.com/nodejs/node/commit/05614f8cf6)] - **lib**: 强制使用尾随逗号 (Antoine du Hamel) [#46881](https://github.com/nodejs/node/pull/46881)
* \[[`5c7fc9290e`](https://github.com/nodejs/node/commit/5c7fc9290e)] - **lib**: 为所有公共 core 模块添加尾随逗号 (Antoine du Hamel) [#46848](https://github.com/nodejs/node/pull/46848)
* \[[`08bf01593f`](https://github.com/nodejs/node/commit/08bf01593f)] - **lib**: 修复 BroadcastChannel 初始化位置 (Shelley Vohr) [#46864](https://github.com/nodejs/node/pull/46864)
* \[[`4e1865126c`](https://github.com/nodejs/node/commit/4e1865126c)] - **lib**: 将内部模块声明重命名为 internal bindings (okmttdhr, okp) [#46663](https://github.com/nodejs/node/pull/46663)
* \[[`f914bfff7d`](https://github.com/nodejs/node/commit/f914bfff7d)] - **lib**: 为更多内部文件添加尾随逗号 (Antoine du Hamel) [#46811](https://github.com/nodejs/node/pull/46811)
* \[[`281f176ba4`](https://github.com/nodejs/node/commit/281f176ba4)] - **lib**: 修复 DOMException 在懒加载后的属性描述符 (Filip Skokan) [#46799](https://github.com/nodejs/node/pull/46799)
* \[[`1c6a92b543`](https://github.com/nodejs/node/commit/1c6a92b543)] - **lib**: 将 punycode 更新到 2.3.0 (Yagiz Nizipli) [#46719](https://github.com/nodejs/node/pull/46719)
* \[[`7b5c00aacd`](https://github.com/nodejs/node/commit/7b5c00aacd)] - **lib**: 在 `internal/perf` 中添加尾随逗号 (Antoine du Hamel) [#46697](https://github.com/nodejs/node/pull/46697)
* \[[`c1651bea41`](https://github.com/nodejs/node/commit/c1651bea41)] - **(SEMVER-MINOR)** **lib**: 添加 AsyncLocalStorage.bind() 和 .snapshot() (flakey5) [#46387](https://github.com/nodejs/node/pull/46387)
* \[[`345c8c343b`](https://github.com/nodejs/node/commit/345c8c343b)] - **lib,src**: 修复注释中的一些拼写错误 (Tobias Nießen) [#46835](https://github.com/nodejs/node/pull/46835)
* \[[`4219c1e893`](https://github.com/nodejs/node/commit/4219c1e893)] - **meta**: 添加 single-executable 标签和代码所有者 (Joyee Cheung) [#47004](https://github.com/nodejs/node/pull/47004)
* \[[`b199acd95c`](https://github.com/nodejs/node/commit/b199acd95c)] - **meta**: 移除 AUTHORS 文件 (Rich Trott) [#46845](https://github.com/nodejs/node/pull/46845)
* \[[`c7f056cbe2`](https://github.com/nodejs/node/commit/c7f056cbe2)] - **meta**: 移除不必要的入门步骤 (Rich Trott) [#46793](https://github.com/nodejs/node/pull/46793)
* \[[`4e0b93222c`](https://github.com/nodejs/node/commit/4e0b93222c)] - **meta**: 更新 url 实现的 CODEOWNERS (Yagiz Nizipli) [#46775](https://github.com/nodejs/node/pull/46775)
* \[[`9d63ac2724`](https://github.com/nodejs/node/commit/9d63ac2724)] - **meta**: 更新 AUTHORS (Node.js GitHub Bot) [#46726](https://github.com/nodejs/node/pull/46726)
* \[[`40a7b0b993`](https://github.com/nodejs/node/commit/40a7b0b993)] - **net**: 修复 'setDefaultAutoSelectFamilyAttemptTimeout' 中值的设置 (Deokjin Kim) [#47012](https://github.com/nodejs/node/pull/47012)
* \[[`e0d098bd21`](https://github.com/nodejs/node/commit/e0d098bd21)] - **net**: 重构 autoSelectFamily 实现 (Paolo Insogna) [#46587](https://github.com/nodejs/node/pull/46587)
* \[[`58b1f33bd7`](https://github.com/nodejs/node/commit/58b1f33bd7)] - **node-api**: 为 async works 添加 \_\_wasm32\_\_ 守卫 (Chengzhong Wu) [#46633](https://github.com/nodejs/node/pull/46633)
* \[[`e5b8597f78`](https://github.com/nodejs/node/commit/e5b8597f78)] - **os**: 提升网络接口性能 (Ruben Bridgewater) [#46598](https://github.com/nodejs/node/pull/46598)
* \[[`d3d76c33ea`](https://github.com/nodejs/node/commit/d3d76c33ea)] - **punycode**: 添加待弃用标记 (Antoine du Hamel) [#46719](https://github.com/nodejs/node/pull/46719)
* \[[`56dbb15e7c`](https://github.com/nodejs/node/commit/56dbb15e7c)] - **repl**: 移除 lastInputPreview 的条件检查 (Duy Mac Van) [#46857](https://github.com/nodejs/node/pull/46857)
* \[[`c7d4ff3f72`](https://github.com/nodejs/node/commit/c7d4ff3f72)] - **repl**: 修复由于共享使用 lineEnding RegExp 导致的 .load 无限循环 (Theodor Steiner) [#46742](https://github.com/nodejs/node/pull/46742)
* \[[`4f2bf8c384`](https://github.com/nodejs/node/commit/4f2bf8c384)] - **repl**: 在源文件中添加尾随逗号 (Antoine du Hamel) [#46757](https://github.com/nodejs/node/pull/46757)
* \[[`ed31316c2e`](https://github.com/nodejs/node/commit/ed31316c2e)] - **src**: 在 node::url 中使用 std::array 传递 argv (Anna Henningsen) [#47035](https://github.com/nodejs/node/pull/47035)
* \[[`815d2af34d`](https://github.com/nodejs/node/commit/815d2af34d)] - **src**: 移除 TLSEXT\_TYPE\_alpn 守卫 (Tobias Nießen) [#46956](https://github.com/nodejs/node/pull/46956)
* \[[`b051ac7220`](https://github.com/nodejs/node/commit/b051ac7220)] - **src**: 移除对 SSL\_OP\_SINGLE\_DH\_USE 的使用 (Tobias Nießen) [#46955](https://github.com/nodejs/node/pull/46955)
* \[[`9e65996d16`](https://github.com/nodejs/node/commit/9e65996d16)] - **src**: 移除 encoding 中未使用的 `v8::Uint32Array` (Yagiz Nizipli) [#47003](https://github.com/nodejs/node/pull/47003)
* \[[`6b60f38676`](https://github.com/nodejs/node/commit/6b60f38676)] - **src**: 为 encodeInto 结果使用 AliasedUint32Array (Joyee Cheung) [#46658](https://github.com/nodejs/node/pull/46658)
* \[[`dcba3a0673`](https://github.com/nodejs/node/commit/dcba3a0673)] - **src**: 将 encoding bindings 移到新的 binding 中 (Joyee Cheung) [#46658](https://github.com/nodejs/node/pull/46658)
* \[[`6740679965`](https://github.com/nodejs/node/commit/6740679965)] - **src**: 修复负的 nodeTiming milestone 值 (Chengzhong Wu) [#46588](https://github.com/nodejs/node/pull/46588)
* \[[`074692a6f0`](https://github.com/nodejs/node/commit/074692a6f0)] - **src**: 修复缺失的尾随 , (Cheng Zhao) [#46909](https://github.com/nodejs/node/pull/46909)
* \[[`32bd38fb05`](https://github.com/nodejs/node/commit/32bd38fb05)] - **src**: 使 util.h 自包含 (Joyee Cheung) [#46817](https://github.com/nodejs/node/pull/46817)
* \[[`0d9c345f4d`](https://github.com/nodejs/node/commit/0d9c345f4d)] - **src**: 移除 OptionsParser 中的遮蔽变量 (Shelley Vohr) [#46672](https://github.com/nodejs/node/pull/46672)
* \[[`578a2c53a5`](https://github.com/nodejs/node/commit/578a2c53a5)] - **src**: 不要在 Realm 中直接跟踪 BaseObjects (Joyee Cheung) [#46470](https://github.com/nodejs/node/pull/46470)
* \[[`9fab228115`](https://github.com/nodejs/node/commit/9fab228115)] - **src**: 修复终止过程中涉及的 cb 作用域 bug (ywave620) [#45596](https://github.com/nodejs/node/pull/45596)
* \[[`c0fcad3827`](https://github.com/nodejs/node/commit/c0fcad3827)] - **src**: 使用数组以加快 binding 数据查找速度 (Joyee Cheung) [#46620](https://github.com/nodejs/node/pull/46620)
* \[[`973287a462`](https://github.com/nodejs/node/commit/973287a462)] - **src**: 按 realm 划分的 binding 数据 (Chengzhong Wu) [#46556](https://github.com/nodejs/node/pull/46556)
* \[[`ad5f42d1e9`](https://github.com/nodejs/node/commit/ad5f42d1e9)] - **src**: 添加 SetFastMethodNoSideEffect() (Joyee Cheung) [#46619](https://github.com/nodejs/node/pull/46619)
* \[[`518b890f59`](https://github.com/nodejs/node/commit/518b890f59)] - _**回退**_ "**src**: 让 http2 streams 在 session 关闭后结束" (Rich Trott) [#46721](https://github.com/nodejs/node/pull/46721)
* \[[`19b5d0750c`](https://github.com/nodejs/node/commit/19b5d0750c)] - **src**: 为 report 及相关代码使用 string\_view (Anna Henningsen) [#46723](https://github.com/nodejs/node/pull/46723)
* \[[`36f36b99b0`](https://github.com/nodejs/node/commit/36f36b99b0)] - **(SEMVER-MINOR)** **src**: 更新 Blob 实现以使用 DataQueue / 基于文件的 Blob (James M Snell) [#45258](https://github.com/nodejs/node/pull/45258)
* \[[`9b6270afe2`](https://github.com/nodejs/node/commit/9b6270afe2)] - **(SEMVER-MINOR)** **src**: 实现 DataQueue (James M Snell) [#45258](https://github.com/nodejs/node/pull/45258)
* \[[`d48ed95a66`](https://github.com/nodejs/node/commit/d48ed95a66)] - **(SEMVER-MINOR)** **src, lib**: 修复 DataQueue/Blob 的 lint 和格式问题 (James M Snell) [#45258](https://github.com/nodejs/node/pull/45258)
* \[[`f8866812fd`](https://github.com/nodejs/node/commit/f8866812fd)] - **stream**: 允许在 compose() 中使用 webstreams (Debadree Chatterjee) [#46675](https://github.com/nodejs/node/pull/46675)
* \[[`4ad48d9cb9`](https://github.com/nodejs/node/commit/4ad48d9cb9)] - **stream**: 始终通过 nextTick 延迟 construct 回调 (Matteo Collina) [#46818](https://github.com/nodejs/node/pull/46818)
* \[[`93e91f3dde`](https://github.com/nodejs/node/commit/93e91f3dde)] - **stream**: 修复在 view.byteOffset != 0 时 respondWithNewView() 的错误 (Debadree Chatterjee) [#46465](https://github.com/nodejs/node/pull/46465)
* \[[`1f386570af`](https://github.com/nodejs/node/commit/1f386570af)] - **stream**: 修复 pipeline 回调未在已结束流上调用的问题 (Debadree Chatterjee) [#46600](https://github.com/nodejs/node/pull/46600)
* \[[`c972612c9d`](https://github.com/nodejs/node/commit/c972612c9d)] - **test**: 修复 test-runner reporter 测试中的不稳定性 (Moshe Atlow) [#45930](https://github.com/nodejs/node/pull/45930)
* \[[`11509a4a2d`](https://github.com/nodejs/node/commit/11509a4a2d)] - **test**: 将 `test-tls-autoselectfamily-servername` 移到 `test/internet` (Antoine du Hamel) [#47029](https://github.com/nodejs/node/pull/47029)
* \[[`9556d98054`](https://github.com/nodejs/node/commit/9556d98054)] - **test**: 如果 IPv6 不可用则回退到 IPv4 (Abdirahim Musse) [#47017](https://github.com/nodejs/node/pull/47017)
* \[[`5b81689efa`](https://github.com/nodejs/node/commit/5b81689efa)] - **test**: 简化 test-tls-ecdh-multiple (Tobias Nießen) [#46963](https://github.com/nodejs/node/pull/46963)
* \[[`c8d528e979`](https://github.com/nodejs/node/commit/c8d528e979)] - **test**: 更新 WPT 资源、common、streams、FileAPI、broadcastchannel (Filip Skokan) [#46912](https://github.com/nodejs/node/pull/46912)
* \[[`acfd9b8879`](https://github.com/nodejs/node/commit/acfd9b8879)] - **test**: 提高 lib/dns 的测试覆盖率 (Anderson Paiva) [#46910](https://github.com/nodejs/node/pull/46910)
* \[[`21153f164d`](https://github.com/nodejs/node/commit/21153f164d)] - **test**: 简化 test-tls-ecdh-auto (Tobias Nießen) [#46911](https://github.com/nodejs/node/pull/46911)
* \[[`e5b8896186`](https://github.com/nodejs/node/commit/e5b8896186)] - **test**: 将 testPath 从 CWD 移到临时目录 (Livia Medeiros) [#46890](https://github.com/nodejs/node/pull/46890)
* \[[`db2ace1f94`](https://github.com/nodejs/node/commit/db2ace1f94)] - **test**: 如果无法更改，则假定私有端口从 1024 开始 (KrayzeeKev) [#46536](https://github.com/nodejs/node/pull/46536)
* \[[`0e45470fd3`](https://github.com/nodejs/node/commit/0e45470fd3)] - **test**: 更新 url 的 web-platform tests (Xuguang Mei) [#46860](https://github.com/nodejs/node/pull/46860)
* \[[`6fa142d8f8`](https://github.com/nodejs/node/commit/6fa142d8f8)] - **test**: 将 socket 从 CWD 移到临时目录 (Livia Medeiros) [#46863](https://github.com/nodejs/node/pull/46863)
* \[[`df155b8fd5`](https://github.com/nodejs/node/commit/df155b8fd5)] - **test**: 修复 SEA 测试中对 Ubuntu 的 os-release 检查 (Anna Henningsen) [#46838](https://github.com/nodejs/node/pull/46838)
* \[[`e585a11fd5`](https://github.com/nodejs/node/commit/e585a11fd5)] - **test**: 修复 test-net-connect-reset-until-connected (Vita Batrla) [#46781](https://github.com/nodejs/node/pull/46781)
* \[[`f21ed3a63f`](https://github.com/nodejs/node/commit/f21ed3a63f)] - **test**: 简化 test-tls-alert (Tobias Nießen) [#46805](https://github.com/nodejs/node/pull/46805)
* \[[`e5fa7a139a`](https://github.com/nodejs/node/commit/e5fa7a139a)] - **test**: 在没有 META title 时修复 WPT 标题 (Filip Skokan) [#46804](https://github.com/nodejs/node/pull/46804)
* \[[`bd097ca4bf`](https://github.com/nodejs/node/commit/bd097ca4bf)] - **test**: 更新 encoding WPT (Filip Skokan) [#46802](https://github.com/nodejs/node/pull/46802)
* \[[`3ab1aabb3f`](https://github.com/nodejs/node/commit/3ab1aabb3f)] - **test**: 移除无用的 WPT 初始化脚本 (Filip Skokan) [#46801](https://github.com/nodejs/node/pull/46801)
* \[[`323415535b`](https://github.com/nodejs/node/commit/323415535b)] - **test**: 从 WPT 中移除无用的 require('../common') (Filip Skokan) [#46796](https://github.com/nodejs/node/pull/46796)
* \[[`76a9634305`](https://github.com/nodejs/node/commit/76a9634305)] - **test**: 隔离 hr-time 特定的 WPT 全局初始化 (Filip Skokan) [#46795](https://github.com/nodejs/node/pull/46795)
* \[[`3daf508993`](https://github.com/nodejs/node/commit/3daf508993)] - **test**: 停止伪造 performance idlharness (Filip Skokan) [#46794](https://github.com/nodejs/node/pull/46794)
* \[[`e52ad92b08`](https://github.com/nodejs/node/commit/e52ad92b08)] - **test**: 移除无法到达的 return (jakecastelli) [#46807](https://github.com/nodejs/node/pull/46807)
* \[[`9c7a2e30fb`](https://github.com/nodejs/node/commit/9c7a2e30fb)] - **test**: 修复 test-v8-collect-gc-profile-in-worker.js (theanarkh) [#46735](https://github.com/nodejs/node/pull/46735)
* \[[`a92be13dad`](https://github.com/nodejs/node/commit/a92be13dad)] - **test**: 改进 test-tls-dhe 中的控制流 (Tobias Nießen) [#46751](https://github.com/nodejs/node/pull/46751)
* \[[`4e9915e383`](https://github.com/nodejs/node/commit/4e9915e383)] - **test**: 包含 strace openat 测试 (Rafael Gonzaga) [#46150](https://github.com/nodejs/node/pull/46150)
* \[[`2c4f670c6b`](https://github.com/nodejs/node/commit/2c4f670c6b)] - **test**: 修复 IBM i 上的 IPv6 检查 (Abdirahim Musse) [#46546](https://github.com/nodejs/node/pull/46546)
* \[[`b2cfcf9cd8`](https://github.com/nodejs/node/commit/b2cfcf9cd8)] - **test**: 修复默认 WPT 标题 (Filip Skokan) [#46778](https://github.com/nodejs/node/pull/46778)
* \[[`f4cdc6f20f`](https://github.com/nodejs/node/commit/f4cdc6f20f)] - **test**: 移除 OpenSSL 1.0.2 错误消息兼容性 (Tobias Nießen) [#46709](https://github.com/nodejs/node/pull/46709)
* \[[`d5784c79bc`](https://github.com/nodejs/node/commit/d5784c79bc)] - **test**: 修复不稳定的 test-watch-mode-files\_watcher (Moshe Atlow) [#46738](https://github.com/nodejs/node/pull/46738)
* \[[`abba45e120`](https://github.com/nodejs/node/commit/abba45e120)] - **test**: 移除过时的 util.isDeepStrictEqual 测试 (Ruben Bridgewater) [#46593](https://github.com/nodejs/node/pull/46593)
* \[[`3401315e4e`](https://github.com/nodejs/node/commit/3401315e4e)] - **test**: 在 test-tls-dhe 中使用较新的 OpenSSL 特性 (Tobias Nießen) [#46708](https://github.com/nodejs/node/pull/46708)
* \[[`95bbd0f7d6`](https://github.com/nodejs/node/commit/95bbd0f7d6)] - **test**: 更新 url 的 web-platform tests (Yagiz Nizipli) [#46547](https://github.com/nodejs/node/pull/46547)
* \[[`13f14a5efa`](https://github.com/nodejs/node/commit/13f14a5efa)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#47010](https://github.com/nodejs/node/pull/47010)
* \[[`5e31599c26`](https://github.com/nodejs/node/commit/5e31599c26)] - **test\_runner**: 在 TTY 环境中默认使用 spec reporter (Moshe Atlow) [#46969](https://github.com/nodejs/node/pull/46969)
* \[[`18146fc8c1`](https://github.com/nodejs/node/commit/18146fc8c1)] - **test\_runner**: 处理未绑定到测试的错误 (Colin Ihrig) [#46962](https://github.com/nodejs/node/pull/46962)
* \[[`7960ccb61e`](https://github.com/nodejs/node/commit/7960ccb61e)] - **test\_runner**: 如果 harness 未完成引导则抛出错误 (Colin Ihrig) [#46962](https://github.com/nodejs/node/pull/46962)
* \[[`b832d77500`](https://github.com/nodejs/node/commit/b832d77500)] - **test\_runner**: 跟踪引导过程 (Colin Ihrig) [#46962](https://github.com/nodejs/node/pull/46962)
* \[[`debc0adcf0`](https://github.com/nodejs/node/commit/debc0adcf0)] - **test\_runner**: 避免在 describe 中重复运行测试两次 (Moshe Atlow) [#46888](https://github.com/nodejs/node/pull/46888)
* \[[`0923cbcfe6`](https://github.com/nodejs/node/commit/0923cbcfe6)] - **test\_runner**: 修复从 YAML 提取错误后的重建问题 (Moshe Atlow) [#46872](https://github.com/nodejs/node/pull/46872)
* \[[`ecf714e1d5`](https://github.com/nodejs/node/commit/ecf714e1d5)] - **test\_runner**: 在 watch 模式下重置计数 (Moshe Atlow) [#46577](https://github.com/nodejs/node/pull/46577)
* \[[`6d32a16319`](https://github.com/nodejs/node/commit/6d32a16319)] - **test\_runner**: 在运行测试前引导 reporters (Moshe Atlow) [#46737](https://github.com/nodejs/node/pull/46737)
* \[[`ffa86f7fa9`](https://github.com/nodejs/node/commit/ffa86f7fa9)] - **test\_runner**: 发出仅限测试的诊断警告 (Richie McColl) [#46540](https://github.com/nodejs/node/pull/46540)
* \[[`3a1a7fa741`](https://github.com/nodejs/node/commit/3a1a7fa741)] - **test\_runner**: 在使用 `--test` 运行时将 TAP 输出展平 (Moshe Atlow) [#46440](https://github.com/nodejs/node/pull/46440)
* \[[`069ff1cc63`](https://github.com/nodejs/node/commit/069ff1cc63)] - **test\_runner**: 移除 root 跟踪集合 (Colin Ihrig) [#46961](https://github.com/nodejs/node/pull/46961)
* \[[`4b7198c3cb`](https://github.com/nodejs/node/commit/4b7198c3cb)] - **test\_runner**: 为 root test 提供一个 harness 引用 (Colin Ihrig) [#46962](https://github.com/nodejs/node/pull/46962)
* \[[`762dc7cb7a`](https://github.com/nodejs/node/commit/762dc7cb7a)] - **test\_runner**: 对齐 it 和 test 的行为 (Moshe Atlow) [#46889](https://github.com/nodejs/node/pull/46889)
* \[[`aa41f27d53`](https://github.com/nodejs/node/commit/aa41f27d53)] - **test\_runner**: 添加 `describe.only` 和 `it.only` 简写形式 (Richie McColl) [#46604](https://github.com/nodejs/node/pull/46604)
* \[[`dfe529b709`](https://github.com/nodejs/node/commit/dfe529b709)] - **test\_runner**: 更好地处理异步引导错误 (Colin Ihrig) [#46720](https://github.com/nodejs/node/pull/46720)
* \[[`320ddc0a0c`](https://github.com/nodejs/node/commit/320ddc0a0c)] - **test\_runner**: 集中处理 CLI 选项 (Colin Ihrig) [#46707](https://github.com/nodejs/node/pull/46707)
* \[[`66016e2a29`](https://github.com/nodejs/node/commit/66016e2a29)] - **test\_runner**: 在 spec reporter 输出中显示被跳过的测试 (Richie McColl) [#46651](https://github.com/nodejs/node/pull/46651)
* \[[`25069a60c7`](https://github.com/nodejs/node/commit/25069a60c7)] - **timers**: 使用 V8 fast API 调用 (Joyee Cheung) [#46579](https://github.com/nodejs/node/pull/46579)
* \[[`bb9b1c637d`](https://github.com/nodejs/node/commit/bb9b1c637d)] - **(SEMVER-MINOR)** **tls**: 支持自动 DHE (Tobias Nießen) [#46978](https://github.com/nodejs/node/pull/46978)
* \[[`4df008457d`](https://github.com/nodejs/node/commit/4df008457d)] - **tls**: 在源文件中添加尾随逗号 (Antoine du Hamel) [#46715](https://github.com/nodejs/node/pull/46715)
* \[[`36c48eab31`](https://github.com/nodejs/node/commit/36c48eab31)] - **tools**: 为每日 WPT 报告工作流添加步骤摘要 (Filip Skokan) [#46763](https://github.com/nodejs/node/pull/46763)
* \[[`12a561875b`](https://github.com/nodejs/node/commit/12a561875b)] - **tools**: 将 undici WPT 添加到每日 WPT 报告中 (Filip Skokan) [#46763](https://github.com/nodejs/node/pull/46763)
* \[[`0f1ecbccca`](https://github.com/nodejs/node/commit/0f1ecbccca)] - **tools**: 在 daily wpt 中不使用缓存的 node 版本 (Filip Skokan) [#47024](https://github.com/nodejs/node/pull/47024)
* \[[`2e7ba3159b`](https://github.com/nodejs/node/commit/2e7ba3159b)] - **tools**: 自动化 cares 更新 (Marco Ippolito) [#46993](https://github.com/nodejs/node/pull/46993)
* \[[`8723844f29`](https://github.com/nodejs/node/commit/8723844f29)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.18.0 (Node.js GitHub Bot) [#46935](https://github.com/nodejs/node/pull/46935)
* \[[`f4a59b723d`](https://github.com/nodejs/node/commit/f4a59b723d)] - **tools**: 添加用于更新 OpenSSL 依赖的自动化 (Facundo Tuesca) [#45605](https://github.com/nodejs/node/pull/45605)
* \[[`ecce6475b9`](https://github.com/nodejs/node/commit/ecce6475b9)] - **tools**: 重构 dep\_updaters (Tony Gorez) [#46488](https://github.com/nodejs/node/pull/46488)
* \[[`132fc45d16`](https://github.com/nodejs/node/commit/132fc45d16)] - **tools**: 修复 daily wpt nightly 版本选择 (Filip Skokan) [#46891](https://github.com/nodejs/node/pull/46891)
* \[[`078600c130`](https://github.com/nodejs/node/commit/078600c130)] - **tools**: 将 eslint 更新到 8.35.0 (Node.js GitHub Bot) [#46854](https://github.com/nodejs/node/pull/46854)
* \[[`724f9d61a3`](https://github.com/nodejs/node/commit/724f9d61a3)] - **tools**: 创建 llhttp 更新操作 (Marco Ippolito) [#46766](https://github.com/nodejs/node/pull/46766)
* \[[`f558797744`](https://github.com/nodejs/node/commit/f558797744)] - **tools**: 修复使用全局 `DOMException` 时的 linter 消息 (Antoine du Hamel) [#46822](https://github.com/nodejs/node/pull/46822)
* \[[`f4cbe4ea4b`](https://github.com/nodejs/node/commit/f4cbe4ea4b)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.17.3 (Node.js GitHub Bot) [#46843](https://github.com/nodejs/node/pull/46843)
* \[[`4b91420307`](https://github.com/nodejs/node/commit/4b91420307)] - **tools**: 将每日 WPT 报告同时上传到 staging 和 production (Filip Skokan) [#46803](https://github.com/nodejs/node/pull/46803)
* \[[`2f09d3f9a1`](https://github.com/nodejs/node/commit/2f09d3f9a1)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.17.2 (Node.js GitHub Bot) [#46771](https://github.com/nodejs/node/pull/46771)
* \[[`f6bd145768`](https://github.com/nodejs/node/commit/f6bd145768)] - **tools**: 对 node-api 测试的 c 文件运行 format-cpp (Chengzhong Wu) [#46694](https://github.com/nodejs/node/pull/46694)
* \[[`694659cecb`](https://github.com/nodejs/node/commit/694659cecb)] - **tools**: 清理 daily-wpt-fyi.yml 中的 WPT 引用 (Filip Skokan) [#46740](https://github.com/nodejs/node/pull/46740)
* \[[`1756830e36`](https://github.com/nodejs/node/commit/1756830e36)] - **tools**: 在 coverage-linux 中使用按提交哈希固定的 actions (Gabriela Gutierrez) [#46294](https://github.com/nodejs/node/pull/46294)
* \[[`25ccaa7b3a`](https://github.com/nodejs/node/commit/25ccaa7b3a)] - **tools**: 修复 Python 工具中的正则表达式字符串 (Jan Osusky) [#46671](https://github.com/nodejs/node/pull/46671)
* \[[`dd400341ad`](https://github.com/nodejs/node/commit/dd400341ad)] - **tools**: 修正路径 (Marco Ippolito) [#46700](https://github.com/nodejs/node/pull/46700)
* \[[`a560a78962`](https://github.com/nodejs/node/commit/a560a78962)] - **tools**: 更新 nghttp2 action (Marco Ippolito) [#46700](https://github.com/nodejs/node/pull/46700)
* \[[`2ff9b20c3c`](https://github.com/nodejs/node/commit/2ff9b20c3c)] - **tools**: 更新 nghttp2 时保留 config.h (Marco Ippolito) [#46698](https://github.com/nodejs/node/pull/46698)
* \[[`6ff0b801f1`](https://github.com/nodejs/node/commit/6ff0b801f1)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.17.1 (Node.js GitHub Bot) [#46712](https://github.com/nodejs/node/pull/46712)
* \[[`b7e027af4d`](https://github.com/nodejs/node/commit/b7e027af4d)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.17.0 (Node.js GitHub Bot) [#46712](https://github.com/nodejs/node/pull/46712)
* \[[`617b5b106a`](https://github.com/nodejs/node/commit/617b5b106a)] - **tools**: 更新 daily checkout 使用的 wpt.fyi 引用 (Filip Skokan) [#46730](https://github.com/nodejs/node/pull/46730)
* \[[`63a83b4451`](https://github.com/nodejs/node/commit/63a83b4451)] - **typings**: 改进 `primordials` 类型定义 (Antoine du Hamel) [#46970](https://github.com/nodejs/node/pull/46970)
* \[[`1fa6352853`](https://github.com/nodejs/node/commit/1fa6352853)] - **url**: 卸载 `URLSearchParams` 初始化 (Yagiz Nizipli) [#46867](https://github.com/nodejs/node/pull/46867)
* \[[`e754277a44`](https://github.com/nodejs/node/commit/e754277a44)] - **url**: 修复 node:url::SetArgs() 中的数组越界 (Yagiz Nizipli) [#47001](https://github.com/nodejs/node/pull/47001)
* \[[`b1747feb57`](https://github.com/nodejs/node/commit/b1747feb57)] - **url**: 将 `formatUrl` 方法设置为无副作用 (Yagiz Nizipli) [#46884](https://github.com/nodejs/node/pull/46884)
* \[[`b8560ec8cc`](https://github.com/nodejs/node/commit/b8560ec8cc)] - **url**: 移除对 `FunctionPrototypeBind` 的不必要调用 (Antoine du Hamel) [#46870](https://github.com/nodejs/node/pull/46870)
* \[[`f8765be197`](https://github.com/nodejs/node/commit/f8765be197)] - **url**: 移除 url 中未使用的 `kFormat` (Yagiz Nizipli) [#46867](https://github.com/nodejs/node/pull/46867)
* \[[`b10fe5856b`](https://github.com/nodejs/node/commit/b10fe5856b)] - **url**: 改进 `isURLThis` 检测 (Yagiz Nizipli) [#46866](https://github.com/nodejs/node/pull/46866)
* \[[`1e20b05acd`](https://github.com/nodejs/node/commit/1e20b05acd)] - **(SEMVER-MINOR)** **url**: 实现 URLSearchParams 的 size getter (James M Snell) [#46308](https://github.com/nodejs/node/pull/46308)
* \[[`5a3ad8763b`](https://github.com/nodejs/node/commit/5a3ad8763b)] - **url**: 简化并改进 url 格式化 (Yagiz Nizipli) [#46736](https://github.com/nodejs/node/pull/46736)
* \[[`a52405599c`](https://github.com/nodejs/node/commit/a52405599c)] - **url**: 通过移除 host 提升性能 (Yagiz Nizipli) [#46547](https://github.com/nodejs/node/pull/46547)
* \[[`9d55a5e5bb`](https://github.com/nodejs/node/commit/9d55a5e5bb)] - **url**: 修复 url 规范兼容性问题 (Yagiz Nizipli) [#46547](https://github.com/nodejs/node/pull/46547)
* \[[`77b4aca2cc`](https://github.com/nodejs/node/commit/77b4aca2cc)] - **vm**: 修复在使用 importModuleDynamically 时 vm.compileFunction 中的泄漏 (Joyee Cheung) [#46785](https://github.com/nodejs/node/pull/46785)
* \[[`b2a80d788a`](https://github.com/nodejs/node/commit/b2a80d788a)] - **wasi**: 添加 wasi sock\_accept stub (Michael Dawson) [#46434](https://github.com/nodejs/node/pull/46434)
* \[[`60e5f45141`](https://github.com/nodejs/node/commit/60e5f45141)] - **(SEMVER-MINOR)** **wasi**: 在创建 WASI 时添加对版本的支持 (Michael Dawson) [#46469](https://github.com/nodejs/node/pull/46469)
* \[[`a646a22d0f`](https://github.com/nodejs/node/commit/a646a22d0f)] - **(SEMVER-MINOR)** **worker**: 在 inspector 和 trace\_events 中添加对 worker 名称的支持 (Debadree Chatterjee) [#46832](https://github.com/nodejs/node/pull/46832)

<a id="19.7.0"></a>

## 2023-02-21，版本 19.7.0（当前），@MylesBorins

### 重大变更

* \[[`60a612607e`](https://github.com/nodejs/node/commit/60a612607e)] - **deps**: 将 npm 升级到 9.5.0 (npm team) [#46673](https://github.com/nodejs/node/pull/46673)
* \[[`7d6c27eab1`](https://github.com/nodejs/node/commit/7d6c27eab1)] - **deps**: 添加 ada 作为依赖 (Yagiz Nizipli) [#46410](https://github.com/nodejs/node/pull/46410)
* \[[`a79a8bf85a`](https://github.com/nodejs/node/commit/a79a8bf85a)] - **doc**: 将 debadree25 添加为协作者 (Debadree Chatterjee) [#46716](https://github.com/nodejs/node/pull/46716)
* \[[`0c2c322ee6`](https://github.com/nodejs/node/commit/0c2c322ee6)] - **doc**: 将 deokjinkim 添加为协作者 (Deokjin Kim) [#46444](https://github.com/nodejs/node/pull/46444)
* \[[`9b23309f53`](https://github.com/nodejs/node/commit/9b23309f53)] - **doc,lib,src,test**: 重命名 --test-coverage (Colin Ihrig) [#46017](https://github.com/nodejs/node/pull/46017)
* \[[`8590eb4830`](https://github.com/nodejs/node/commit/8590eb4830)] - **(SEMVER-MINOR)** **lib**: 添加 aborted() 工具函数 (Debadree Chatterjee) [#46494](https://github.com/nodejs/node/pull/46494)
* \[[`164bfe82cc`](https://github.com/nodejs/node/commit/164bfe82cc)] - **(SEMVER-MINOR)** **src**: 添加对单文件可执行应用的初始支持 (Darshan Sen) [#45038](https://github.com/nodejs/node/pull/45038)
* \[[`f3908411fd`](https://github.com/nodejs/node/commit/f3908411fd)] - **(SEMVER-MINOR)** **src**: 允许在 node::Stop() 中可选终止 Isolate (Shelley Vohr) [#46583](https://github.com/nodejs/node/pull/46583)
* \[[`c34bac2fed`](https://github.com/nodejs/node/commit/c34bac2fed)] - **(SEMVER-MINOR)** **src**: 在 embedder snapshot API 中允许使用 blob 以及 `FILE*` (Anna Henningsen) [#46491](https://github.com/nodejs/node/pull/46491)
* \[[`683a1f8f3e`](https://github.com/nodejs/node/commit/683a1f8f3e)] - **(SEMVER-MINOR)** **src**: 允许通过 embedder API 进行快照 (Anna Henningsen) [#45888](https://github.com/nodejs/node/pull/45888)
* \[[`658d2f4710`](https://github.com/nodejs/node/commit/658d2f4710)] - **(SEMVER-MINOR)** **src**: 将 build\_snapshot 设为每个 Isolate 的选项，而不是全局选项 (Anna Henningsen) [#45888](https://github.com/nodejs/node/pull/45888)
* \[[`6801d3753c`](https://github.com/nodejs/node/commit/6801d3753c)] - **(SEMVER-MINOR)** **src**: 为 embedder API 添加快照支持 (Anna Henningsen) [#45888](https://github.com/nodejs/node/pull/45888)
* \[[`e77d538d32`](https://github.com/nodejs/node/commit/e77d538d32)] - **(SEMVER-MINOR)** **src**: 允许 embedder 控制代码生成策略 (Shelley Vohr) [#46368](https://github.com/nodejs/node/pull/46368)
* \[[`633d3f292d`](https://github.com/nodejs/node/commit/633d3f292d)] - **(SEMVER-MINOR)** **stream**: 为 ReadableStream 和 WritableStream 添加中止信号 (Debadree Chatterjee) [#46273](https://github.com/nodejs/node/pull/46273)
* \[[`6119289251`](https://github.com/nodejs/node/commit/6119289251)] - **test_runner**: 添加初始代码覆盖率支持 (Colin Ihrig) [#46017](https://github.com/nodejs/node/pull/46017)
* \[[`a51fe3c663`](https://github.com/nodejs/node/commit/a51fe3c663)] - **url**: 用 ada 替换 url-parser (Yagiz Nizipli) [#46410](https://github.com/nodejs/node/pull/46410)

### 提交

* \[[`731a7ae9da`](https://github.com/nodejs/node/commit/731a7ae9da)] - **async_hooks**: 添加 async local storage 传播基准测试 (Chengzhong Wu) [#46414](https://github.com/nodejs/node/pull/46414)
* \[[`05ad792a07`](https://github.com/nodejs/node/commit/05ad792a07)] - **async_hooks**: 移除实验性的 onPropagate 选项 (James M Snell) [#46386](https://github.com/nodejs/node/pull/46386)
* \[[`6b21170b10`](https://github.com/nodejs/node/commit/6b21170b10)] - **benchmark**: 在 `benchmark/path` 中添加尾随逗号 (Antoine du Hamel) [#46628](https://github.com/nodejs/node/pull/46628)
* \[[`4b89ec409f`](https://github.com/nodejs/node/commit/4b89ec409f)] - **benchmark**: 在 `benchmark/http` 中添加尾随逗号 (Antoine du Hamel) [#46609](https://github.com/nodejs/node/pull/46609)
* \[[`ff95eb7386`](https://github.com/nodejs/node/commit/ff95eb7386)] - **benchmark**: 在 `benchmark/crypto` 中添加尾随逗号 (Antoine du Hamel) [#46553](https://github.com/nodejs/node/pull/46553)
* \[[`638d9b8d4b`](https://github.com/nodejs/node/commit/638d9b8d4b)] - **benchmark**: 在 `benchmark/url` 中添加尾随逗号 (Antoine du Hamel) [#46551](https://github.com/nodejs/node/pull/46551)
* \[[`7524871a9b`](https://github.com/nodejs/node/commit/7524871a9b)] - **benchmark**: 在 `benchmark/http2` 中添加尾随逗号 (Antoine du Hamel) [#46552](https://github.com/nodejs/node/pull/46552)
* \[[`9d9b3f856f`](https://github.com/nodejs/node/commit/9d9b3f856f)] - **benchmark**: 在 `benchmark/process` 中添加尾随逗号 (Antoine du Hamel) [#46481](https://github.com/nodejs/node/pull/46481)
* \[[`6c69ad6d43`](https://github.com/nodejs/node/commit/6c69ad6d43)] - **benchmark**: 在 `benchmark/misc` 中添加尾随逗号 (Antoine du Hamel) [#46474](https://github.com/nodejs/node/pull/46474)
* \[[`7f8b292bee`](https://github.com/nodejs/node/commit/7f8b292bee)] - **benchmark**: 在 `benchmark/buffers` 中添加尾随逗号 (Antoine du Hamel) [#46473](https://github.com/nodejs/node/pull/46473)
* \[[`897e3c2782`](https://github.com/nodejs/node/commit/897e3c2782)] - **benchmark**: 在 `benchmark/module` 中添加尾随逗号 (Antoine du Hamel) [#46461](https://github.com/nodejs/node/pull/46461)
* \[[`7760d40c04`](https://github.com/nodejs/node/commit/7760d40c04)] - **benchmark**: 在 `benchmark/net` 中添加尾随逗号 (Antoine du Hamel) [#46439](https://github.com/nodejs/node/pull/46439)
* \[[`8b88d605ca`](https://github.com/nodejs/node/commit/8b88d605ca)] - **benchmark**: 在 `benchmark/util` 中添加尾随逗号 (Antoine du Hamel) [#46438](https://github.com/nodejs/node/pull/46438)
* \[[`2c8c9f978d`](https://github.com/nodejs/node/commit/2c8c9f978d)] - **benchmark**: 在 `benchmark/async_hooks` 中添加尾随逗号 (Antoine du Hamel) [#46424](https://github.com/nodejs/node/pull/46424)
* \[[`b364b9bd60`](https://github.com/nodejs/node/commit/b364b9bd60)] - **benchmark**: 在 `benchmark/fs` 中添加尾随逗号 (Antoine du Hamel) [#46426](https://github.com/nodejs/node/pull/46426)
* \[[`e15ddba7e7`](https://github.com/nodejs/node/commit/e15ddba7e7)] - **build**: 添加用于 `--without-intl` 覆盖率的 GitHub Action (Rich Trott) [#37954](https://github.com/nodejs/node/pull/37954)
* \[[`c781a48097`](https://github.com/nodejs/node/commit/c781a48097)] - **build**: 在禁用 intl 时不要禁用 inspector (Rich Trott) [#37954](https://github.com/nodejs/node/pull/37954)
* \[[`b4deb2fcd5`](https://github.com/nodejs/node/commit/b4deb2fcd5)] - **crypto**: 不要默认假定 FIPS 已禁用 (Michael Dawson) [#46532](https://github.com/nodejs/node/pull/46532)
* \[[`60a612607e`](https://github.com/nodejs/node/commit/60a612607e)] - **deps**: 将 npm 升级到 9.5.0 (npm team) [#46673](https://github.com/nodejs/node/pull/46673)
* \[[`6c997035fc`](https://github.com/nodejs/node/commit/6c997035fc)] - **deps**: 将 corepack 更新到 0.16.0 (Node.js GitHub Bot) [#46710](https://github.com/nodejs/node/pull/46710)
* \[[`2ed3875eee`](https://github.com/nodejs/node/commit/2ed3875eee)] - **deps**: 将 undici 更新到 5.20.0 (Node.js GitHub Bot) [#46711](https://github.com/nodejs/node/pull/46711)
* \[[`20cb13bf7f`](https://github.com/nodejs/node/commit/20cb13bf7f)] - **deps**: 将 ada 更新到 v1.0.1 (Yagiz Nizipli) [#46550](https://github.com/nodejs/node/pull/46550)
* \[[`c0983cfc06`](https://github.com/nodejs/node/commit/c0983cfc06)] - **deps**: 将 `postject-api.h` 和 `LICENSE` 复制到 `deps` 文件夹 (Darshan Sen) [#46582](https://github.com/nodejs/node/pull/46582)
* \[[`7d6c27eab1`](https://github.com/nodejs/node/commit/7d6c27eab1)] - **deps**: 添加 ada 作为依赖 (Yagiz Nizipli) [#46410](https://github.com/nodejs/node/pull/46410)
* \[[`7e7e2d037b`](https://github.com/nodejs/node/commit/7e7e2d037b)] - **deps**: 将 c-ares 更新到 1.19.0 (Michaël Zasso) [#46415](https://github.com/nodejs/node/pull/46415)
* \[[`a79a8bf85a`](https://github.com/nodejs/node/commit/a79a8bf85a)] - **doc**: 将 debadree25 添加为协作者 (Debadree Chatterjee) [#46716](https://github.com/nodejs/node/pull/46716)
* \[[`6a8b04d709`](https://github.com/nodejs/node/commit/6a8b04d709)] - **doc**: 将 bcoe 移至 emeriti (Benjamin Coe) [#46703](https://github.com/nodejs/node/pull/46703)
* \[[`a0a6ee0f54`](https://github.com/nodejs/node/commit/a0a6ee0f54)] - **doc**: 为文档添加 response.strictContentLength (Marco Ippolito) [#46627](https://github.com/nodejs/node/pull/46627)
* \[[`ffdd64dce3`](https://github.com/nodejs/node/commit/ffdd64dce3)] - **doc**: 从 `streamConsumers.text` 示例中移除未使用的函数 (Deokjin Kim) [#46581](https://github.com/nodejs/node/pull/46581)
* \[[`c771d66864`](https://github.com/nodejs/node/commit/c771d66864)] - **doc**: 修复 test runner 示例 (Richie McColl) [#46565](https://github.com/nodejs/node/pull/46565)
* \[[`375bb22df9`](https://github.com/nodejs/node/commit/375bb22df9)] - **doc**: 更新测试并发描述 / 默认值 (richiemccoll) [#46457](https://github.com/nodejs/node/pull/46457)
* \[[`a7beac04ba`](https://github.com/nodejs/node/commit/a7beac04ba)] - **doc**: 为 test 命令补充可执行文件信息 (Tony Gorez) [#44347](https://github.com/nodejs/node/pull/44347)
* \[[`aef57cd290`](https://github.com/nodejs/node/commit/aef57cd290)] - **doc**: 修正 `requestTimeout` 默认值的位置错误 (Deokjin Kim) [#46423](https://github.com/nodejs/node/pull/46423)
* \[[`0c2c322ee6`](https://github.com/nodejs/node/commit/0c2c322ee6)] - **doc**: 将 deokjinkim 添加为协作者 (Deokjin Kim) [#46444](https://github.com/nodejs/node/pull/46444)
* \[[`31d3e3c486`](https://github.com/nodejs/node/commit/31d3e3c486)] - **doc**: 修复 -C 标志的用法 (三咲智子 Kevin Deng) [#46388](https://github.com/nodejs/node/pull/46388)
* \[[`905a6756a3`](https://github.com/nodejs/node/commit/905a6756a3)] - **doc**: 添加关于主要版本轮换的说明 (Rafael Gonzaga) [#46436](https://github.com/nodejs/node/pull/46436)
* \[[`33a98c42fa`](https://github.com/nodejs/node/commit/33a98c42fa)] - **doc**: 基于讨论更新威胁模型 (Michael Dawson) [#46373](https://github.com/nodejs/node/pull/46373)
* \[[`9b23309f53`](https://github.com/nodejs/node/commit/9b23309f53)] - **doc,lib,src,test**: 重命名 --test-coverage (Colin Ihrig) [#46017](https://github.com/nodejs/node/pull/46017)
* \[[`f192b83800`](https://github.com/nodejs/node/commit/f192b83800)] - **esm**: 各种测试重构 (Geoffrey Booth) [#46631](https://github.com/nodejs/node/pull/46631)
* \[[`7f2cdd36cf`](https://github.com/nodejs/node/commit/7f2cdd36cf)] - **http**: 添加关于 clientError 事件的说明 (Paolo Insogna) [#46584](https://github.com/nodejs/node/pull/46584)
* \[[`d8c527f24f`](https://github.com/nodejs/node/commit/d8c527f24f)] - **http**: 使用预构建向量调用 v8::Array::New() (Joyee Cheung) [#46447](https://github.com/nodejs/node/pull/46447)
* \[[`fa600fe003`](https://github.com/nodejs/node/commit/fa600fe003)] - **lib**: 在 `internal/process` 中添加尾随逗号 (Antoine du Hamel) [#46687](https://github.com/nodejs/node/pull/46687)
* \[[`4aebee63f0`](https://github.com/nodejs/node/commit/4aebee63f0)] - **lib**: 在禁用共享数组缓冲区时使用 workers 不要崩溃 (Ruben Bridgewater) [#41023](https://github.com/nodejs/node/pull/41023)
* \[[`a740908588`](https://github.com/nodejs/node/commit/a740908588)] - **lib**: 删除 module findPath 中未使用的参数 (sinkhaha) [#45371](https://github.com/nodejs/node/pull/45371)
* \[[`8b46c763d9`](https://github.com/nodejs/node/commit/8b46c763d9)] - **lib**: 在更多文件中强制使用尾随逗号 (Antoine du Hamel) [#46655](https://github.com/nodejs/node/pull/46655)
* \[[`aae0020e27`](https://github.com/nodejs/node/commit/aae0020e27)] - **lib**: 在函数中强制使用尾随逗号 (Antoine du Hamel) [#46629](https://github.com/nodejs/node/pull/46629)
* \[[`da9ebaf138`](https://github.com/nodejs/node/commit/da9ebaf138)] - **lib**: 预声明 Event.isTrusted 属性描述符 (Santiago Gimeno) [#46527](https://github.com/nodejs/node/pull/46527)
* \[[`35570e970e`](https://github.com/nodejs/node/commit/35570e970e)] - **lib**: 加强 `AbortSignal.prototype.throwIfAborted` 的实现 (Antoine du Hamel) [#46521](https://github.com/nodejs/node/pull/46521)
* \[[`8590eb4830`](https://github.com/nodejs/node/commit/8590eb4830)] - **(SEMVER-MINOR)** **lib**: 添加 aborted() 工具函数 (Debadree Chatterjee) [#46494](https://github.com/nodejs/node/pull/46494)
* \[[`5d1a729f76`](https://github.com/nodejs/node/commit/5d1a729f76)] - **meta**: 更新 AUTHORS (Node.js GitHub Bot) [#46624](https://github.com/nodejs/node/pull/46624)
* \[[`cb9b9ad879`](https://github.com/nodejs/node/commit/cb9b9ad879)] - **meta**: 将一个或多个协作者移至 emeritus (Node.js GitHub Bot) [#46513](https://github.com/nodejs/node/pull/46513)
* \[[`17b82c85d9`](https://github.com/nodejs/node/commit/17b82c85d9)] - **meta**: 更新 AUTHORS (Node.js GitHub Bot) [#46504](https://github.com/nodejs/node/pull/46504)
* \[[`bb14a2b098`](https://github.com/nodejs/node/commit/bb14a2b098)] - **meta**: 将一个或多个协作者移至 emeritus (Node.js GitHub Bot) [#46411](https://github.com/nodejs/node/pull/46411)
* \[[`152a3c7d1d`](https://github.com/nodejs/node/commit/152a3c7d1d)] - **process**: 按排序打印版本信息 (Himself65) [#46428](https://github.com/nodejs/node/pull/46428)
* \[[`164bfe82cc`](https://github.com/nodejs/node/commit/164bfe82cc)] - **(SEMVER-MINOR)** **src**: 添加对单文件可执行应用的初始支持 (Darshan Sen) [#45038](https://github.com/nodejs/node/pull/45038)
* \[[`f3908411fd`](https://github.com/nodejs/node/commit/f3908411fd)] - **(SEMVER-MINOR)** **src**: 允许在 node::Stop() 中可选终止 Isolate (Shelley Vohr) [#46583](https://github.com/nodejs/node/pull/46583)
* \[[`bdba600d32`](https://github.com/nodejs/node/commit/bdba600d32)] - **src**: 从 node\_string.cc 中移除 icu 的使用 (Yagiz Nizipli) [#46548](https://github.com/nodejs/node/pull/46548)
* \[[`31fb2e22a0`](https://github.com/nodejs/node/commit/31fb2e22a0)] - **src**: 为 SnapshotData::ToFile() 添加 fflush() (Anna Henningsen) [#46531](https://github.com/nodejs/node/pull/46531)
* \[[`c34bac2fed`](https://github.com/nodejs/node/commit/c34bac2fed)] - **(SEMVER-MINOR)** **src**: 在 embedder snapshot API 中允许使用 blob 以及 `FILE*` (Anna Henningsen) [#46491](https://github.com/nodejs/node/pull/46491)
* \[[`c3325bfc0d`](https://github.com/nodejs/node/commit/c3325bfc0d)] - **src**: 使 BaseObjects 中的边名称在堆快照中更具描述性 (Joyee Cheung) [#46492](https://github.com/nodejs/node/pull/46492)
* \[[`3c5db8f419`](https://github.com/nodejs/node/commit/3c5db8f419)] - **src**: 避免在出错时泄漏 snapshot fp (Tobias Nießen) [#46497](https://github.com/nodejs/node/pull/46497)
* \[[`1a808a4aad`](https://github.com/nodejs/node/commit/1a808a4aad)] - **src**: 检查 ftell() 的返回值 (Tobias Nießen) [#46495](https://github.com/nodejs/node/pull/46495)
* \[[`f72f643549`](https://github.com/nodejs/node/commit/f72f643549)] - **src**: 从主线程中移除未使用的 include (Yagiz Nizipli) [#46471](https://github.com/nodejs/node/pull/46471)
* \[[`60c2a863da`](https://github.com/nodejs/node/commit/60c2a863da)] - **src**: 使用 string_view 而不是 std::string& (Yagiz Nizipli) [#46471](https://github.com/nodejs/node/pull/46471)
* \[[`f35f6d2218`](https://github.com/nodejs/node/commit/f35f6d2218)] - **src**: 使用 simdutf 的 utf8 到 utf16 转换，而不是 icu (Yagiz Nizipli) [#46471](https://github.com/nodejs/node/pull/46471)
* \[[`00b81c7afe`](https://github.com/nodejs/node/commit/00b81c7afe)] - **src**: 在字符计数中用 simdutf 替换 icu (Yagiz Nizipli) [#46472](https://github.com/nodejs/node/pull/46472)
* \[[`683a1f8f3e`](https://github.com/nodejs/node/commit/683a1f8f3e)] - **(SEMVER-MINOR)** **src**: 允许通过 embedder API 进行快照 (Anna Henningsen) [#45888](https://github.com/nodejs/node/pull/45888)
* \[[`658d2f4710`](https://github.com/nodejs/node/commit/658d2f4710)] - **(SEMVER-MINOR)** **src**: 将 build\_snapshot 设为每个 Isolate 的选项，而不是全局选项 (Anna Henningsen) [#45888](https://github.com/nodejs/node/pull/45888)
* \[[`6801d3753c`](https://github.com/nodejs/node/commit/6801d3753c)] - **(SEMVER-MINOR)** **src**: 为 embedder API 添加快照支持 (Anna Henningsen) [#45888](https://github.com/nodejs/node/pull/45888)
* \[[`95065c3185`](https://github.com/nodejs/node/commit/95065c3185)] - **src**: 为 crypto::SecureContext 添加额外的实用函数 (James M Snell) [#45912](https://github.com/nodejs/node/pull/45912)
* \[[`efc59d0843`](https://github.com/nodejs/node/commit/efc59d0843)] - **src**: 添加 KeyObjectHandle::HasInstance (James M Snell) [#45912](https://github.com/nodejs/node/pull/45912)
* \[[`a8a2d0e2b1`](https://github.com/nodejs/node/commit/a8a2d0e2b1)] - **src**: 为 crypto_common 添加 GetCurrentCipherName/Version (James M Snell) [#45912](https://github.com/nodejs/node/pull/45912)
* \[[`6cf860d3d6`](https://github.com/nodejs/node/commit/6cf860d3d6)] - **src**: 使用 std::vector sink 支持快照 I/O (Joyee Cheung) [#46463](https://github.com/nodejs/node/pull/46463)
* \[[`e77d538d32`](https://github.com/nodejs/node/commit/e77d538d32)] - **(SEMVER-MINOR)** **src**: 允许 embedder 控制代码生成策略 (Shelley Vohr) [#46368](https://github.com/nodejs/node/pull/46368)
* \[[`7756438c81`](https://github.com/nodejs/node/commit/7756438c81)] - **stream**: 在 webstream 源文件中添加尾随逗号 (Antoine du Hamel) [#46685](https://github.com/nodejs/node/pull/46685)
* \[[`6b64a945c6`](https://github.com/nodejs/node/commit/6b64a945c6)] - **stream**: 在 stream 源文件中添加尾随逗号 (Antoine du Hamel) [#46686](https://github.com/nodejs/node/pull/46686)
* \[[`633d3f292d`](https://github.com/nodejs/node/commit/633d3f292d)] - **(SEMVER-MINOR)** **stream**: 为 ReadableStream 和 WritableStream 添加中止信号 (Debadree Chatterjee) [#46273](https://github.com/nodejs/node/pull/46273)
* \[[`f91260b32a`](https://github.com/nodejs/node/commit/f91260b32a)] - **stream**: 重构为使用 `validateAbortSignal` (Antoine du Hamel) [#46520](https://github.com/nodejs/node/pull/46520)
* \[[`6bf7388b62`](https://github.com/nodejs/node/commit/6bf7388b62)] - **stream**: 允许传输可读字节流 (MrBBot) [#45955](https://github.com/nodejs/node/pull/45955)
* \[[`c2068537fa`](https://github.com/nodejs/node/commit/c2068537fa)] - **stream**: 为 webstreams 添加 pipeline() (Debadree Chatterjee) [#46307](https://github.com/nodejs/node/pull/46307)
* \[[`4cf4b41c56`](https://github.com/nodejs/node/commit/4cf4b41c56)] - **stream**: 为 webstreams 的 finished() 添加中止信号支持 (Debadree Chatterjee) [#46403](https://github.com/nodejs/node/pull/46403)
* \[[`b844a09fa5`](https://github.com/nodejs/node/commit/b844a09fa5)] - **stream**: 在 TransformStream 初始化期间不要访问 Object.prototype.type (Debadree Chatterjee) [#46389](https://github.com/nodejs/node/pull/46389)
* \[[`6ad01fd7b5`](https://github.com/nodejs/node/commit/6ad01fd7b5)] - **test**: 修复在不支持 IPv6 的内核上的 `test-net-autoselectfamily` (Livia Medeiros) [#45856](https://github.com/nodejs/node/pull/45856)
* \[[`2239e24306`](https://github.com/nodejs/node/commit/2239e24306)] - **test**: 修复 test-snapshot-dns-lookup\* 中的断言 (Tobias Nießen) [#46618](https://github.com/nodejs/node/pull/46618)
* \[[`c4ca98e786`](https://github.com/nodejs/node/commit/c4ca98e786)] - **test**: 覆盖 OpenSSL 中的 publicExponent 验证 (Tobias Nießen) [#46632](https://github.com/nodejs/node/pull/46632)
* \[[`e60d3f2b1d`](https://github.com/nodejs/node/commit/e60d3f2b1d)] - **test**: 为变体和生成 WPT 报告添加 WPTRunner 支持 (Filip Skokan) [#46498](https://github.com/nodejs/node/pull/46498)
* \[[`217f2f6e2a`](https://github.com/nodejs/node/commit/217f2f6e2a)] - **test**: 在 `test/pummel` 中添加尾随逗号 (Antoine du Hamel) [#46610](https://github.com/nodejs/node/pull/46610)
* \[[`641e1771c8`](https://github.com/nodejs/node/commit/641e1771c8)] - **test**: 在编码 WPT 中启用 api-invalid-label.any.js (Filip Skokan) [#46506](https://github.com/nodejs/node/pull/46506)
* \[[`89aa161173`](https://github.com/nodejs/node/commit/89aa161173)] - **test**: 修复当测试记录数字时 tap 解析器失败的问题 (Pulkit Gupta) [#46056](https://github.com/nodejs/node/pull/46056)
* \[[`faba8d4a30`](https://github.com/nodejs/node/commit/faba8d4a30)] - **test**: 在 `test/js-native-api` 中添加尾随逗号 (Antoine du Hamel) [#46385](https://github.com/nodejs/node/pull/46385)
* \[[`d556ccdd26`](https://github.com/nodejs/node/commit/d556ccdd26)] - **test**: 使更多 crypto 测试可与 BoringSSL 配合工作 (Shelley Vohr) [#46429](https://github.com/nodejs/node/pull/46429)
* \[[`c7f29b24a6`](https://github.com/nodejs/node/commit/c7f29b24a6)] - **test**: 在 `test/known_issues` 中添加尾随逗号 (Antoine du Hamel) [#46408](https://github.com/nodejs/node/pull/46408)
* \[[`a66e7ca6c5`](https://github.com/nodejs/node/commit/a66e7ca6c5)] - **test**: 在 `test/internet` 中添加尾随逗号 (Antoine du Hamel) [#46407](https://github.com/nodejs/node/pull/46407)
* \[[`0f75633086`](https://github.com/nodejs/node/commit/0f75633086)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#46575](https://github.com/nodejs/node/pull/46575)
* \[[`ddf5002782`](https://github.com/nodejs/node/commit/ddf5002782)] - **test_runner**: 正确解析非 ASCII 字符 (Mert Can Altın) [#45736](https://github.com/nodejs/node/pull/45736)
* \[[`5b748114d2`](https://github.com/nodejs/node/commit/5b748114d2)] - **test_runner**: 允许在 describe 中嵌套 test (Moshe Atlow) [#46544](https://github.com/nodejs/node/pull/46544)
* \[[`c526f9f70a`](https://github.com/nodejs/node/commit/c526f9f70a)] - **test_runner**: 修复缺失的测试诊断信息 (Moshe Atlow) [#46450](https://github.com/nodejs/node/pull/46450)
* \[[`b31aabb101`](https://github.com/nodejs/node/commit/b31aabb101)] - **test_runner**: 使用 --test 运行时不再省略顶层诊断信息 (Pulkit Gupta) [#46441](https://github.com/nodejs/node/pull/46441)
* \[[`6119289251`](https://github.com/nodejs/node/commit/6119289251)] - **test_runner**: 添加初始代码覆盖率支持 (Colin Ihrig) [#46017](https://github.com/nodejs/node/pull/46017)
* \[[`6f24f0621e`](https://github.com/nodejs/node/commit/6f24f0621e)] - **timers**: 清理 timers/promises 中不再相关的 TODO (James M Snell) [#46499](https://github.com/nodejs/node/pull/46499)
* \[[`1cd22e7d19`](https://github.com/nodejs/node/commit/1cd22e7d19)] - **tools**: 修复 `prefer-primordials` lint 规则中的 bug (Antoine du Hamel) [#46659](https://github.com/nodejs/node/pull/46659)
* \[[`87df34ac28`](https://github.com/nodejs/node/commit/87df34ac28)] - **tools**: 修复 update-ada 脚本 (Yagiz Nizipli) [#46550](https://github.com/nodejs/node/pull/46550)
* \[[`f62b58a623`](https://github.com/nodejs/node/commit/f62b58a623)] - **tools**: 添加每日同步的 wpt.fyi 报告上传 (Filip Skokan) [#46498](https://github.com/nodejs/node/pull/46498)
* \[[`803f00aa32`](https://github.com/nodejs/node/commit/803f00aa32)] - **tools**: 将 eslint 更新到 8.34.0 (Node.js GitHub Bot) [#46625](https://github.com/nodejs/node/pull/46625)
* \[[`f87216bdb2`](https://github.com/nodejs/node/commit/f87216bdb2)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@3.15.0 和 to-vfile\@7.2.4 (Node.js GitHub Bot) [#46623](https://github.com/nodejs/node/pull/46623)
* \[[`8ee9e48560`](https://github.com/nodejs/node/commit/8ee9e48560)] - **tools**: 将 doc 更新为 remark-html\@15.0.2 和 to-vfile\@7.2.4 (Node.js GitHub Bot) [#46622](https://github.com/nodejs/node/pull/46622)
* \[[`148c5d9239`](https://github.com/nodejs/node/commit/148c5d9239)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@3.13.0 和 vfile-reporter\@7.0.5 (Node.js GitHub Bot) [#46503](https://github.com/nodejs/node/pull/46503)
* \[[`51c6c61a58`](https://github.com/nodejs/node/commit/51c6c61a58)] - **tools**: 更新 ESLint 自定义规则，不再使用已弃用的格式 (Antoine du Hamel) [#46460](https://github.com/nodejs/node/pull/46460)
* \[[`a51fe3c663`](https://github.com/nodejs/node/commit/a51fe3c663)] - **url**: 用 ada 替换 url-parser (Yagiz Nizipli) [#46410](https://github.com/nodejs/node/pull/46410)
* \[[`129c9e7180`](https://github.com/nodejs/node/commit/129c9e7180)] - **url**: 移除未使用的 `URL::ToFilePath()` (Yagiz Nizipli) [#46487](https://github.com/nodejs/node/pull/46487)
* \[[`9a604d67c3`](https://github.com/nodejs/node/commit/9a604d67c3)] - **url**: 移除未使用的 `URL::toObject` (Yagiz Nizipli) [#46486](https://github.com/nodejs/node/pull/46486)
* \[[`d6fbebda54`](https://github.com/nodejs/node/commit/d6fbebda54)] - **url**: 移除未使用的 `setURLConstructor` 函数 (Yagiz Nizipli) [#46485](https://github.com/nodejs/node/pull/46485)
* \[[`17b3ee33c2`](https://github.com/nodejs/node/commit/17b3ee33c2)] - **vm**: 正确支持全局对象上的符号 (Nicolas DUBIEN) [#46458](https://github.com/nodejs/node/pull/46458)

<a id="19.6.1"></a>

## 2023-02-16，版本 19.6.1（当前），@RafaelGSS

这是一个安全发布。

### 重要变更

本次发布修复了以下 CVE：

* **[CVE-2023-23919](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-23919)**：OpenSSL 错误未从错误栈中清除（中等）
* **[CVE-2023-23918](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-23918)**：可通过 `process.mainModule.require` 绕过实验性策略（高）
* **[CVE-2023-23920](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-23920)**：通过 ICU\_DATA 环境变量不安全地加载 ICU 数据（低）

关于每个漏洞的更详细信息，可以在 [2023 年 2 月安全发布](https://nodejs.org/en/blog/vulnerability/february-2023-security-releases/) 博客文章中找到。

此安全发布包含 OpenSSL 安全更新，如最近的
[OpenSSL 安全公告](https://www.openssl.org/news/secadv/20230207.txt) 中所述，以及 `undici` 安全更新。

### 提交

* \[[`97d9d55d2f`](https://github.com/nodejs/node/commit/97d9d55d2f)] - **构建**：使用 ICU\_NO\_USER\_DATA\_OVERRIDE 构建 ICU（RafaelGSS）[nodejs-private/node-private#374](https://github.com/nodejs-private/node-private/pull/374)
* \[[`8ac90e6372`](https://github.com/nodejs/node/commit/8ac90e6372)] - **crypto**：在无效 ca 证书时清除 OpenSSL 错误（RafaelGSS）[nodejs-private/node-private#368](https://github.com/nodejs-private/node-private/pull/368)
* \[[`10a4c47e3a`](https://github.com/nodejs/node/commit/10a4c47e3a)] - **依赖**：将 undici 更新到 5.19.1（Node.js GitHub Bot）[#46634](https://github.com/nodejs/node/pull/46634)
* \[[`b10fc75e4a`](https://github.com/nodejs/node/commit/b10fc75e4a)] - **依赖**：将 undici 更新到 5.18.0（Node.js GitHub Bot）[#46502](https://github.com/nodejs/node/pull/46502)
* \[[`e9b64ea8b9`](https://github.com/nodejs/node/commit/e9b64ea8b9)] - **依赖**：将 undici 更新到 5.17.1（Node.js GitHub Bot）[#46502](https://github.com/nodejs/node/pull/46502)
* \[[`66a24cec47`](https://github.com/nodejs/node/commit/66a24cec47)] - **依赖**：为 openssl 回移 Windows ARM64 修复（Richard Lau）[#46573](https://github.com/nodejs/node/pull/46573)
* \[[`d8559aa6f5`](https://github.com/nodejs/node/commit/d8559aa6f5)] - **依赖**：更新 quictls/openssl-3.0.8+quic 的 archs 文件（RafaelGSS）[#46573](https://github.com/nodejs/node/pull/46573)
* \[[`dc477f547d`](https://github.com/nodejs/node/commit/dc477f547d)] - **依赖**：升级 openssl 源码到 quictls/openssl-3.0.8+quic（RafaelGSS）[#46573](https://github.com/nodejs/node/pull/46573)
* \[[`2aae197670`](https://github.com/nodejs/node/commit/2aae197670)] - **lib**：在实验性策略下修补 makeRequireFunction（RafaelGSS）[nodejs-private/node-private#358](https://github.com/nodejs-private/node-private/pull/358)
* \[[`6d17b693ec`](https://github.com/nodejs/node/commit/6d17b693ec)] - **policy**：在 mainModule.require 中使用 makeRequireFunction（RafaelGSS）[nodejs-private/node-private#358](https://github.com/nodejs-private/node-private/pull/358)

<a id="19.6.0"></a>

## 2023-02-02，版本 19.6.0（当前），@ruyadorno

### 重要变更

#### ESM：在解析后续加载器时利用加载器

加载器现在也会应用于后续加载器，例如：`--experimental-loader ts-node --experimental-loader loader-written-in-typescript`。

#### 将 npm 升级到 9.4.0

新增了 `--install-strategy=linked` 选项，用于类似 pnpm 的安装方式。

#### 其他重要变更

* \[[`a7c9daa497`](https://github.com/nodejs/node/commit/a7c9daa497)] - **(SEMVER-MINOR)** **fs**：添加 statfs() 函数（Colin Ihrig）[#46358](https://github.com/nodejs/node/pull/46358)
* \[[`34d70ce615`](https://github.com/nodejs/node/commit/34d70ce615)] - **(SEMVER-MINOR)** **vm**：为 vm.compileFunction 暴露 cachedDataRejected（Anna Henningsen）[#46320](https://github.com/nodejs/node/pull/46320)
* \[[`b4ac794923`](https://github.com/nodejs/node/commit/b4ac794923)] - **(SEMVER-MINOR)** **v8**：支持 gc 配置文件（theanarkh）[#46255](https://github.com/nodejs/node/pull/46255)
* \[[`d52f60009a`](https://github.com/nodejs/node/commit/d52f60009a)] - **(SEMVER-MINOR)** **src,lib**：为 process 添加 constrainedMemory API（theanarkh）[#46218](https://github.com/nodejs/node/pull/46218)
* \[[`5ad6c2088e`](https://github.com/nodejs/node/commit/5ad6c2088e)] - **(SEMVER-MINOR)** **buffer**：添加 isAscii 方法（Yagiz Nizipli）[#46046](https://github.com/nodejs/node/pull/46046)
* \[[`fbdc3f7316`](https://github.com/nodejs/node/commit/fbdc3f7316)] - **(SEMVER-MINOR)** **test_runner**：添加报告器（Moshe Atlow）[#45712](https://github.com/nodejs/node/pull/45712)

### 提交

* \[[`524eec70e2`](https://github.com/nodejs/node/commit/524eec70e2)] - **benchmark**：添加尾随逗号（Antoine du Hamel）[#46370](https://github.com/nodejs/node/pull/46370)
* \[[`f318a85408`](https://github.com/nodejs/node/commit/f318a85408)] - **benchmark**：移除 buffer 基准测试的冗余（Brian White）[#45735](https://github.com/nodejs/node/pull/45735)
* \[[`6186b3ea14`](https://github.com/nodejs/node/commit/6186b3ea14)] - **benchmark**：引入基准测试组合过滤（Brian White）[#45735](https://github.com/nodejs/node/pull/45735)
* \[[`5ad6c2088e`](https://github.com/nodejs/node/commit/5ad6c2088e)] - **(SEMVER-MINOR)** **buffer**：添加 isAscii 方法（Yagiz Nizipli）[#46046](https://github.com/nodejs/node/pull/46046)
* \[[`8c6c4338a6`](https://github.com/nodejs/node/commit/8c6c4338a6)] - **build**：在 Windows 上导出更多 OpenSSL 符号（Mohamed Akram）[#45486](https://github.com/nodejs/node/pull/45486)
* \[[`d795d93901`](https://github.com/nodejs/node/commit/d795d93901)] - **build**：修复 MSVC 2022 Release 编译（Vladimir Morozov (REDMOND)）[#46228](https://github.com/nodejs/node/pull/46228)
* \[[`8e363cf8e8`](https://github.com/nodejs/node/commit/8e363cf8e8)] - **crypto**：在 `crypto_util.h` 中包含 `hmac.h`（Adam Langley）[#46279](https://github.com/nodejs/node/pull/46279)
* \[[`c1f3e13c65`](https://github.com/nodejs/node/commit/c1f3e13c65)] - **deps**：将 acorn 更新到 8.8.2（Node.js GitHub Bot）[#46363](https://github.com/nodejs/node/pull/46363)
* \[[`813b160bd7`](https://github.com/nodejs/node/commit/813b160bd7)] - **deps**：将 npm 升级到 9.4.0（npm 团队）[#46353](https://github.com/nodejs/node/pull/46353)
* \[[`9c2f3cea70`](https://github.com/nodejs/node/commit/9c2f3cea70)] - **deps**：将 undici 更新到 5.15.0（Node.js GitHub Bot）[#46213](https://github.com/nodejs/node/pull/46213)
* \[[`312e10c1e3`](https://github.com/nodejs/node/commit/312e10c1e3)] - **deps**：更新到 uvwasi 0.0.15（Colin Ihrig）[#46253](https://github.com/nodejs/node/pull/46253)
* \[[`c7024eec16`](https://github.com/nodejs/node/commit/c7024eec16)] - **doc**：更正文档发布流程中 macOS 的 `sed` 命令（Juan José）[#46397](https://github.com/nodejs/node/pull/46397)
* \[[`996bac044b`](https://github.com/nodejs/node/commit/996bac044b)] - **doc**：在 finished() 和 Duplex.from() 参数中包含 webstreams（Debadree Chatterjee）[#46312](https://github.com/nodejs/node/pull/46312)
* \[[`891d18d55c`](https://github.com/nodejs/node/commit/891d18d55c)] - **doc**：将字符串作为 `textEncoder.encode` 的输入传入（Deokjin Kim）[#46421](https://github.com/nodejs/node/pull/46421)
* \[[`968db213f8`](https://github.com/nodejs/node/commit/968db213f8)] - **doc**：为 session.post 函数添加提示（theanarkh）[#46354](https://github.com/nodejs/node/pull/46354)
* \[[`a64d7f4e31`](https://github.com/nodejs/node/commit/a64d7f4e31)] - **doc**：为 socket.destroySoon() 添加文档（Luigi Pinca）[#46337](https://github.com/nodejs/node/pull/46337)
* \[[`975788899f`](https://github.com/nodejs/node/commit/975788899f)] - **doc**：修复提交信息中将 test 误写为 deps 的问题（Tony Gorez）[#46313](https://github.com/nodejs/node/pull/46313)
* \[[`1d44017f52`](https://github.com/nodejs/node/commit/1d44017f52)] - **doc**：添加 v8 fast api 贡献指南（Yagiz Nizipli）[#46199](https://github.com/nodejs/node/pull/46199)
* \[[`e2698c05fb`](https://github.com/nodejs/node/commit/e2698c05fb)] - **doc**：修复一个小的拼写错误（0xflotus）[#46186](https://github.com/nodejs/node/pull/46186)
* \[[`f39fb8c001`](https://github.com/nodejs/node/commit/f39fb8c001)] - **doc**：将 webstreams 中的一些参数标记为可选（Deokjin Kim）[#46269](https://github.com/nodejs/node/pull/46269)
* \[[`7a9af38128`](https://github.com/nodejs/node/commit/7a9af38128)] - **doc**：更新 `events.getEventListeners` 示例的输出（Deokjin Kim）[#46268](https://github.com/nodejs/node/pull/46268)
* \[[`729642f30b`](https://github.com/nodejs/node/commit/729642f30b)] - **esm**：删除 preload mock 测试（Geoffrey Booth）[#46402](https://github.com/nodejs/node/pull/46402)
* \[[`7aac21e90a`](https://github.com/nodejs/node/commit/7aac21e90a)] - **esm**：在解析后续加载器时利用加载器（Maël Nison）[#43772](https://github.com/nodejs/node/pull/43772)
* \[[`a7c9daa497`](https://github.com/nodejs/node/commit/a7c9daa497)] - **(SEMVER-MINOR)** **fs**：添加 statfs() 函数（Colin Ihrig）[#46358](https://github.com/nodejs/node/pull/46358)
* \[[`1ec6270efa`](https://github.com/nodejs/node/commit/1ec6270efa)] - **http**：`res.setHeaders` 的首个实现（Marco Ippolito）[#46109](https://github.com/nodejs/node/pull/46109)
* \[[`d4370259e9`](https://github.com/nodejs/node/commit/d4370259e9)] - **inspector**：允许在设置了 `NODE_V8_COVERAGE` 时打开 inspector（Moshe Atlow）[#46113](https://github.com/nodejs/node/pull/46113)
* \[[`b966ef9a42`](https://github.com/nodejs/node/commit/b966ef9a42)] - **lib**：移除不必要的 ObjectGetValueSafe（Chengzhong Wu）[#46335](https://github.com/nodejs/node/pull/46335)
* \[[`2b06d66289`](https://github.com/nodejs/node/commit/2b06d66289)] - **lib**：缓存已解析的 source map 以减少内存占用（Chengzhong Wu）[#46225](https://github.com/nodejs/node/pull/46225)
* \[[`c38673df91`](https://github.com/nodejs/node/commit/c38673df91)] - **meta**：更新 AUTHORS（Node.js GitHub Bot）[#46399](https://github.com/nodejs/node/pull/46399)
* \[[`c10e602547`](https://github.com/nodejs/node/commit/c10e602547)] - **meta**：更新 AUTHORS（Node.js GitHub Bot）[#46303](https://github.com/nodejs/node/pull/46303)
* \[[`9dc026b14a`](https://github.com/nodejs/node/commit/9dc026b14a)] - **meta**：添加 .mailmap 条目（Rich Trott）[#46303](https://github.com/nodejs/node/pull/46303)
* \[[`7c514574f7`](https://github.com/nodejs/node/commit/7c514574f7)] - **meta**：将 evanlucas 转为 emeritus（Evan Lucas）[#46274](https://github.com/nodejs/node/pull/46274)
* \[[`3a3a6d87f1`](https://github.com/nodejs/node/commit/3a3a6d87f1)] - **module**：移动测试报告器加载逻辑（Geoffrey Booth）[#45923](https://github.com/nodejs/node/pull/45923)
* \[[`4ae2492a33`](https://github.com/nodejs/node/commit/4ae2492a33)] - **readline**：修复回车符检测（Antoine du Hamel）[#46306](https://github.com/nodejs/node/pull/46306)
* \[[`43cad78b7a`](https://github.com/nodejs/node/commit/43cad78b7a)] - **src**：在关闭 libuv 之前停止跟踪代理（Santiago Gimeno）[#46380](https://github.com/nodejs/node/pull/46380)
* \[[`360a3f3094`](https://github.com/nodejs/node/commit/360a3f3094)] - **src**：去除 ParseIPv4Host 中的浮点运算（Tobias Nießen）[#46326](https://github.com/nodejs/node/pull/46326)
* \[[`e7b507a8cf`](https://github.com/nodejs/node/commit/e7b507a8cf)] - **src**：使用 UNREACHABLE 代替 CHECK(falsy)（Tobias Nießen）[#46317](https://github.com/nodejs/node/pull/46317)
* \[[`4c59b60ee8`](https://github.com/nodejs/node/commit/4c59b60ee8)] - **src**：添加对 ETW 栈回溯的支持（José Dapena Paz）[#46203](https://github.com/nodejs/node/pull/46203)
* \[[`640d111f95`](https://github.com/nodejs/node/commit/640d111f95)] - **src**：重构 node\_url.cc 中的 EndsInANumber，并添加 IsIPv4NumberValid（Miguel Teixeira）[#46227](https://github.com/nodejs/node/pull/46227)
* \[[`fb7bee2b6e`](https://github.com/nodejs/node/commit/fb7bee2b6e)] - **src**：修复在命令行参数错误时的 C++ 异常（Ben Noordhuis）[#46290](https://github.com/nodejs/node/pull/46290)
* \[[`18c95ec4bd`](https://github.com/nodejs/node/commit/18c95ec4bd)] - **src**：移除无法到达的 UNREACHABLE（Tobias Nießen）[#46281](https://github.com/nodejs/node/pull/46281)
* \[[`35bf93b01a`](https://github.com/nodejs/node/commit/35bf93b01a)] - **src**：用 simdutf 实现替换自定义 ASCII 校验（Anna Henningsen）[#46271](https://github.com/nodejs/node/pull/46271)
* \[[`8307a4bbcd`](https://github.com/nodejs/node/commit/8307a4bbcd)] - **src**：用 static\_assert 替换不可达代码（Tobias Nießen）[#46250](https://github.com/nodejs/node/pull/46250)
* \[[`7cf0da020a`](https://github.com/nodejs/node/commit/7cf0da020a)] - **src**：使用显式的 C++17 fallthrough（Tobias Nießen）[#46251](https://github.com/nodejs/node/pull/46251)
* \[[`d52f60009a`](https://github.com/nodejs/node/commit/d52f60009a)] - **(SEMVER-MINOR)** **src,lib**：为 process 添加 constrainedMemory API（theanarkh）[#46218](https://github.com/nodejs/node/pull/46218)
* \[[`2e5e7a9261`](https://github.com/nodejs/node/commit/2e5e7a9261)] - **stream**：从 stream duplexify 中移除 brandchecks（Debadree Chatterjee）[#46315](https://github.com/nodejs/node/pull/46315)
* \[[`9675863461`](https://github.com/nodejs/node/commit/9675863461)] - **stream**：修复将可读流作为 async iterator 函数的问题（Erick Wendel）[#46147](https://github.com/nodejs/node/pull/46147)
* \[[`232bdd5d16`](https://github.com/nodejs/node/commit/232bdd5d16)] - **test**：在 `test/node-api` 中添加尾随逗号（Antoine du Hamel）[#46384](https://github.com/nodejs/node/pull/46384)
* \[[`4cc081815d`](https://github.com/nodejs/node/commit/4cc081815d)] - **test**：在 `test/message` 中添加尾随逗号（Antoine du Hamel）[#46372](https://github.com/nodejs/node/pull/46372)
* \[[`b83c5d9deb`](https://github.com/nodejs/node/commit/b83c5d9deb)] - **test**：在 `test/pseudo-tty` 中添加尾随逗号（Antoine du Hamel）[#46371](https://github.com/nodejs/node/pull/46371)
* \[[`8a45c9d231`](https://github.com/nodejs/node/commit/8a45c9d231)] - **test**：修复有无 `--test` 时的 tap 转义（Pulkit Gupta）[#46311](https://github.com/nodejs/node/pull/46311)
* \[[`367dc41299`](https://github.com/nodejs/node/commit/367dc41299)] - **test**：为 loong64 将 common.bits 设为 64（Shi Pujin）[#45383](https://github.com/nodejs/node/pull/45383)
* \[[`7385edc7d0`](https://github.com/nodejs/node/commit/7385edc7d0)] - **test**：修复 s390x zlib 测试用例（Adam Majer）[#46367](https://github.com/nodejs/node/pull/46367)
* \[[`d5d837bdee`](https://github.com/nodejs/node/commit/d5d837bdee)] - **test**：修复 logInTimeout 不是函数的问题（theanarkh）[#46348](https://github.com/nodejs/node/pull/46348)
* \[[`a1d79546ac`](https://github.com/nodejs/node/commit/a1d79546ac)] - **test**：避免直接调用 sysctl（Adam Majer）[#46366](https://github.com/nodejs/node/pull/46366)
* \[[`747f3689e0`](https://github.com/nodejs/node/commit/747f3689e0)] - **test**：避免残留子进程（Richard Lau）[#46276](https://github.com/nodejs/node/pull/46276)
* \[[`940484b7aa`](https://github.com/nodejs/node/commit/940484b7aa)] - **test**：为带回车符的 readline 添加失败测试（Alec Mev）[#46075](https://github.com/nodejs/node/pull/46075)
* \[[`d13116a719`](https://github.com/nodejs/node/commit/d13116a719)] - **test,crypto**：为 wrap/unwrap 测试添加 CFRG 曲线向量（Filip Skokan）[#46406](https://github.com/nodejs/node/pull/46406)
* \[[`398a7477b3`](https://github.com/nodejs/node/commit/398a7477b3)] - **test,crypto**：更新 WebCryptoAPI WPT（Filip Skokan）[#46267](https://github.com/nodejs/node/pull/46267)
* \[[`8b473affe8`](https://github.com/nodejs/node/commit/8b473affe8)] - **test_runner**：将内置报告器设为内部实现（Colin Ihrig）[#46092](https://github.com/nodejs/node/pull/46092)
* \[[`a49e17e22b`](https://github.com/nodejs/node/commit/a49e17e22b)] - **test_runner**：在测试运行器事件中报告 `file`（Moshe Atlow）[#46030](https://github.com/nodejs/node/pull/46030)
* \[[`fbdc3f7316`](https://github.com/nodejs/node/commit/fbdc3f7316)] - **test_runner**：添加报告器（Moshe Atlow）[#45712](https://github.com/nodejs/node/pull/45712)
* \[[`6579de8c47`](https://github.com/nodejs/node/commit/6579de8c47)] - **tools**：将 eslint 更新到 8.33.0（Node.js GitHub Bot）[#46400](https://github.com/nodejs/node/pull/46400)
* \[[`bf62da55ad`](https://github.com/nodejs/node/commit/bf62da55ad)] - **tools**：将 doc 依赖更新为 unist-util-select\@4.0.3、unist-util-visit\@4.1.2（Node.js GitHub Bot）[#46364](https://github.com/nodejs/node/pull/46364)
* \[[`b0acf55197`](https://github.com/nodejs/node/commit/b0acf55197)] - **tools**：将 lint-md-dependencies 更新为 rollup\@3.12.0（Node.js GitHub Bot）[#46398](https://github.com/nodejs/node/pull/46398)
* \[[`88b904cf24`](https://github.com/nodejs/node/commit/88b904cf24)] - **tools**：要求更多尾随逗号（Antoine du Hamel）[#46346](https://github.com/nodejs/node/pull/46346)
* \[[`4440b3ef87`](https://github.com/nodejs/node/commit/4440b3ef87)] - **tools**：更新 lint-md-dependencies（Node.js GitHub Bot）[#46302](https://github.com/nodejs/node/pull/46302)
* \[[`e75faff4bd`](https://github.com/nodejs/node/commit/e75faff4bd)] - **tools**：允许 icutrim.py 在 python2 上运行（Michael Dawson）[#46263](https://github.com/nodejs/node/pull/46263)
* \[[`e460d16d73`](https://github.com/nodejs/node/commit/e460d16d73)] - **url**：重构为使用更多 primordials（Antoine du Hamel）[#45966](https://github.com/nodejs/node/pull/45966)
* \[[`b4ac794923`](https://github.com/nodejs/node/commit/b4ac794923)] - **(SEMVER-MINOR)** **v8**：支持 gc 配置文件（theanarkh）[#46255](https://github.com/nodejs/node/pull/46255)
* \[[`34d70ce615`](https://github.com/nodejs/node/commit/34d70ce615)] - **(SEMVER-MINOR)** **vm**：为 vm.compileFunction 暴露 cachedDataRejected（Anna Henningsen）[#46320](https://github.com/nodejs/node/pull/46320)

<a id="19.5.0"></a>

## 2023-01-24，版本 19.5.0（当前），@RafaelGSS

### 重要变更

* **http**:
  * （SEMVER-MINOR）合并授权头（Marco Ippolito）[#45982](https://github.com/nodejs/node/pull/45982)
* **lib:**:
  * 为 Duplex.from() 添加 webstreams（Debadree Chatterjee）[#46190](https://github.com/nodejs/node/pull/46190)
* **stream**:
  * 为 ReadableStream 和 WritableStream 实现 finished()（Debadree Chatterjee）[#46205](https://github.com/nodejs/node/pull/46205)

### 提交

* \[[`def36946da`](https://github.com/nodejs/node/commit/def36946da)] - **assert**: 移除 `assert.snapshot`（Moshe Atlow）[#46112](https://github.com/nodejs/node/pull/46112)
* \[[`e1c56ec3fd`](https://github.com/nodejs/node/commit/e1c56ec3fd)] - **benchmark,tools**: 使用 os.availableParallelism()（Deokjin Kim）[#46003](https://github.com/nodejs/node/pull/46003)
* \[[`370f621d4d`](https://github.com/nodejs/node/commit/370f621d4d)] - **build**: 添加额外的分号检查（Jiawen Geng）[#46194](https://github.com/nodejs/node/pull/46194)
* \[[`476c6f892d`](https://github.com/nodejs/node/commit/476c6f892d)] - **crypto**: 在没有可用算法时避免挂起（Richard Lau）[#46237](https://github.com/nodejs/node/pull/46237)
* \[[`8b22310940`](https://github.com/nodejs/node/commit/8b22310940)] - **(SEMVER-MINOR)** **crypto**: 添加 CryptoKey Symbol.toStringTag（Filip Skokan）[#46042](https://github.com/nodejs/node/pull/46042)
* \[[`78be87b9f9`](https://github.com/nodejs/node/commit/78be87b9f9)] - **crypto**: 为 cipher update/final 方法添加编码验证（vitpavlenko）[#45990](https://github.com/nodejs/node/pull/45990)
* \[[`dc0cdaa101`](https://github.com/nodejs/node/commit/dc0cdaa101)] - **crypto**: 确保为 chacha20-poly1305 设置认证标签（Ben Noordhuis）[#46185](https://github.com/nodejs/node/pull/46185)
* \[[`1146f02dc5`](https://github.com/nodejs/node/commit/1146f02dc5)] - **crypto**: 在 KeyObject 的 asymmetricKeyDetails 中返回正确的位长度（Filip Skokan）[#46106](https://github.com/nodejs/node/pull/46106)
* \[[`961710bb72`](https://github.com/nodejs/node/commit/961710bb72)] - **(SEMVER-MINOR)** **crypto**: 添加 KeyObject Symbol.toStringTag（Filip Skokan）[#46043](https://github.com/nodejs/node/pull/46043)
* \[[`9cfdac6c82`](https://github.com/nodejs/node/commit/9cfdac6c82)] - **deps**: V8：cherry-pick e39af94dd18e（Lu Yahan）[#46142](https://github.com/nodejs/node/pull/46142)
* \[[`26cde8efb7`](https://github.com/nodejs/node/commit/26cde8efb7)] - **deps**: 将 simdutf 更新到 3.1.0（Node.js GitHub Bot）[#46257](https://github.com/nodejs/node/pull/46257)
* \[[`3f9fb37130`](https://github.com/nodejs/node/commit/3f9fb37130)] - **deps**: cherry-pick simdutf 补丁（Jiawen Geng）[#46194](https://github.com/nodejs/node/pull/46194)
* \[[`4ff2822836`](https://github.com/nodejs/node/commit/4ff2822836)] - **deps**: 将 googletest 升级到 2023.01.13（Jiawen Geng）[#46198](https://github.com/nodejs/node/pull/46198)
* \[[`49556247d2`](https://github.com/nodejs/node/commit/49556247d2)] - **deps**: 将 /deps/\*\*/.github/ 添加到 .gitignore（Luigi Pinca）[#46091](https://github.com/nodejs/node/pull/46091)
* \[[`0c4df83e0d`](https://github.com/nodejs/node/commit/0c4df83e0d)] - **deps**: 将 simdutf 版本添加到元数据（Mike Roth）[#46145](https://github.com/nodejs/node/pull/46145)
* \[[`69aafc3ddd`](https://github.com/nodejs/node/commit/69aafc3ddd)] - **deps**: 将 simdutf 更新到 2.1.0（Node.js GitHub Bot）[#46128](https://github.com/nodejs/node/pull/46128)
* \[[`a266daccb5`](https://github.com/nodejs/node/commit/a266daccb5)] - **deps**: 将 corepack 更新到 0.15.3（Node.js GitHub Bot）[#46037](https://github.com/nodejs/node/pull/46037)
* \[[`6cd70573eb`](https://github.com/nodejs/node/commit/6cd70573eb)] - **deps**: 将 npm 升级到 9.3.1（npm team）[#46242](https://github.com/nodejs/node/pull/46242)
* \[[`679aae2da8`](https://github.com/nodejs/node/commit/679aae2da8)] - **deps**: 将 npm 升级到 9.3.0（npm team）[#46193](https://github.com/nodejs/node/pull/46193)
* \[[`38dd5061f2`](https://github.com/nodejs/node/commit/38dd5061f2)] - **dgram**: 将旧 handle 状态同步到新 handle（theanarkh）[#46041](https://github.com/nodejs/node/pull/46041)
* \[[`e36af49b35`](https://github.com/nodejs/node/commit/e36af49b35)] - **doc**: 修复 `NodeEventTarget` 的参数不匹配问题（Deokjin Kim）[#45678](https://github.com/nodejs/node/pull/45678)
* \[[`58b836f7c4`](https://github.com/nodejs/node/commit/58b836f7c4)] - **doc**: 更新 events API 示例，使其代码可运行（Deokjin Kim）[#45760](https://github.com/nodejs/node/pull/45760)
* \[[`5c350298b4`](https://github.com/nodejs/node/commit/5c350298b4)] - **doc**: 在 tls 文档中添加关于 secureContext 可用性的说明（Tim Gerk）[#46224](https://github.com/nodejs/node/pull/46224)
* \[[`90924ce198`](https://github.com/nodejs/node/commit/90924ce198)] - **doc**: 添加有关协作期望的说明（Michael Dawson）[#46121](https://github.com/nodejs/node/pull/46121)
* \[[`2d328355d4`](https://github.com/nodejs/node/commit/2d328355d4)] - **doc**: 更新以匹配已更改的 `--dns-result-order` 默认值（Mordy Tikotzky）[#46148](https://github.com/nodejs/node/pull/46148)
* \[[`1015a606b7`](https://github.com/nodejs/node/commit/1015a606b7)] - **doc**: 添加 Node-API 媒体链接（Kevin Eady）[#46189](https://github.com/nodejs/node/pull/46189)
* \[[`6e355efcff`](https://github.com/nodejs/node/commit/6e355efcff)] - **doc**: 更新 http.setMaxIdleHTTPParsers 的参数（Debadree Chatterjee）[#46168](https://github.com/nodejs/node/pull/46168)
* \[[`f18ab9405a`](https://github.com/nodejs/node/commit/f18ab9405a)] - **doc**: 使用 “file system” 而不是 “filesystem”（Rich Trott）[#46178](https://github.com/nodejs/node/pull/46178)
* \[[`1b45713b00`](https://github.com/nodejs/node/commit/1b45713b00)] - **doc**: https 更新默认请求超时（Marco Ippolito）[#46184](https://github.com/nodejs/node/pull/46184)
* \[[`4c88721e2f`](https://github.com/nodejs/node/commit/4c88721e2f)] - **doc**: 将 readableStream.pipeTo 的 options 设为可选（Deokjin Kim）[#46180](https://github.com/nodejs/node/pull/46180)
* \[[`538c53f010`](https://github.com/nodejs/node/commit/538c53f010)] - **doc**: 将 PerformanceObserver.supportedEntryTypes 添加到文档中（theanarkh）[#45962](https://github.com/nodejs/node/pull/45962)
* \[[`eef7489d24`](https://github.com/nodejs/node/commit/eef7489d24)] - **doc**: duplex 和 readable 的未捕获异常警告（Marco Ippolito）[#46135](https://github.com/nodejs/node/pull/46135)
* \[[`686fe585b5`](https://github.com/nodejs/node/commit/686fe585b5)] - **doc**: 从 `maintaining-v8` 中移除过时章节（Antoine du Hamel）[#46137](https://github.com/nodejs/node/pull/46137)
* \[[`2e826ad528`](https://github.com/nodejs/node/commit/2e826ad528)] - **doc**: 修正 TLS 文档中的 (EC)DHE 注释（Tobias Nießen）[#46114](https://github.com/nodejs/node/pull/46114)
* \[[`2e22b29add`](https://github.com/nodejs/node/commit/2e22b29add)] - **doc**: 修复 ERR\_TLS\_RENEGOTIATION\_DISABLED 文本（Tobias Nießen）[#46122](https://github.com/nodejs/node/pull/46122)
* \[[`e222a2f1d1`](https://github.com/nodejs/node/commit/e222a2f1d1)] - **doc**: 修复 SECURITY.md 中的拼写（Vaishno Chaitanya）[#46124](https://github.com/nodejs/node/pull/46124)
* \[[`7718e82f0d`](https://github.com/nodejs/node/commit/7718e82f0d)] - **doc**: 在子进程中，abort controller 会发出 error（Debadree Chatterjee）[#46072](https://github.com/nodejs/node/pull/46072)
* \[[`76408bc1ed`](https://github.com/nodejs/node/commit/76408bc1ed)] - **doc**: 修复 `event.cancelBubble` 文档（Deokjin Kim）[#45986](https://github.com/nodejs/node/pull/45986)
* \[[`82023f2570`](https://github.com/nodejs/node/commit/82023f2570)] - **doc**: 更新 inspector 中示例的输出（Deokjin Kim）[#46073](https://github.com/nodejs/node/pull/46073)
* \[[`a42fc512b6`](https://github.com/nodejs/node/commit/a42fc512b6)] - **doc**: 添加个人代词选项（Filip Skokan）[#46118](https://github.com/nodejs/node/pull/46118)
* \[[`fafae5955d`](https://github.com/nodejs/node/commit/fafae5955d)] - **doc**: 说明如何运行 ncu-ci citgm（Rafael Gonzaga）[#46090](https://github.com/nodejs/node/pull/46090)
* \[[`e1fd2f24d9`](https://github.com/nodejs/node/commit/e1fd2f24d9)] - **doc**: 包含更新发布的可选步骤（Rafael Gonzaga）[#46089](https://github.com/nodejs/node/pull/46089)
* \[[`1996e610fd`](https://github.com/nodejs/node/commit/1996e610fd)] - **doc**: 描述 `Symbol.for` 的参数（Deokjin Kim）[#46019](https://github.com/nodejs/node/pull/46019)
* \[[`b002330216`](https://github.com/nodejs/node/commit/b002330216)] - **doc,crypto**: 修复 WebCryptoAPI 导入 keyData 和导出返回值（Filip Skokan）[#46076](https://github.com/nodejs/node/pull/46076)
* \[[`fa3e0c86c7`](https://github.com/nodejs/node/commit/fa3e0c86c7)] - **esm**: 将 `importAssertions` 标记为必需（Antoine du Hamel）[#46164](https://github.com/nodejs/node/pull/46164)
* \[[`f85a8e4c59`](https://github.com/nodejs/node/commit/f85a8e4c59)] - **events**: 为 Event 添加 `initEvent`（Deokjin Kim）[#46069](https://github.com/nodejs/node/pull/46069)
* \[[`5bdfaae680`](https://github.com/nodejs/node/commit/5bdfaae680)] - **events**: 将 `event.returnvalue` 的状态改为 legacy（Deokjin Kim）[#46175](https://github.com/nodejs/node/pull/46175)
* \[[`ad7846fe97`](https://github.com/nodejs/node/commit/ad7846fe97)] - **events**: 将 `event.cancelBubble` 的状态改为 legacy（Deokjin Kim）[#46146](https://github.com/nodejs/node/pull/46146)
* \[[`5304c89682`](https://github.com/nodejs/node/commit/5304c89682)] - **events**: 将 `event.srcElement` 的状态改为 legacy（Deokjin Kim）[#46085](https://github.com/nodejs/node/pull/46085)
* \[[`3dcdab3f16`](https://github.com/nodejs/node/commit/3dcdab3f16)] - **events**: 在监听器之前检查 signal（Deokjin Kim）[#46054](https://github.com/nodejs/node/pull/46054)
* \[[`907d67de76`](https://github.com/nodejs/node/commit/907d67de76)] - **http**: 重构为使用 `validateHeaderName`（Deokjin Kim）[#46143](https://github.com/nodejs/node/pull/46143)
* \[[`ae5141cb8a`](https://github.com/nodejs/node/commit/ae5141cb8a)] - **http**: 当 statusmessage 为 undefined 时，writeHead 不要覆盖 headers（Marco Ippolito）[#46173](https://github.com/nodejs/node/pull/46173)
* \[[`6e7f9fbc1d`](https://github.com/nodejs/node/commit/6e7f9fbc1d)] - **http**: 重构为对 maxTotalSockets 使用 validateNumber 的最小值（Deokjin Kim）[#46115](https://github.com/nodejs/node/pull/46115)
* \[[`069a30bc4e`](https://github.com/nodejs/node/commit/069a30bc4e)] - **(SEMVER-MINOR)** **http**: 合并授权头（Marco Ippolito）[#45982](https://github.com/nodejs/node/pull/45982)
* \[[`68cde4cbcc`](https://github.com/nodejs/node/commit/68cde4cbcc)] - **lib**: 为 Duplex.from() 添加 webstreams（Debadree Chatterjee）[#46190](https://github.com/nodejs/node/pull/46190)
* \[[`4d73ea708b`](https://github.com/nodejs/node/commit/4d73ea708b)] - **lib**: 在 webstreams 中使用 kEmptyObject 并更新 JSDoc（Deokjin Kim）[#46183](https://github.com/nodejs/node/pull/46183)
* \[[`1cfa2e6762`](https://github.com/nodejs/node/commit/1cfa2e6762)] - **lib**: 重构为使用 validate 函数（Deokjin Kim）[#46101](https://github.com/nodejs/node/pull/46101)
* \[[`2eb87f23c9`](https://github.com/nodejs/node/commit/2eb87f23c9)] - **lib**: 在 webstreams 上重用无效状态错误（Rafael Gonzaga）[#46086](https://github.com/nodejs/node/pull/46086)
* \[[`8684dae8d9`](https://github.com/nodejs/node/commit/8684dae8d9)] - **lib**: 修复对 console 内部 intrinsic 的错误使用（Colin Ihrig）[#46044](https://github.com/nodejs/node/pull/46044)
* \[[`d044ed1d3e`](https://github.com/nodejs/node/commit/d044ed1d3e)] - **meta**: 更新 AUTHORS（Node.js GitHub Bot）[#46215](https://github.com/nodejs/node/pull/46215)
* \[[`5261560757`](https://github.com/nodejs/node/commit/5261560757)] - **meta**: 更新 AUTHORS（Node.js GitHub Bot）[#46130](https://github.com/nodejs/node/pull/46130)
* \[[`1b557bbee8`](https://github.com/nodejs/node/commit/1b557bbee8)] - **meta**: 更新 `CODEOWNERS` 中的注释，以更好地反映当前政策（Antoine du Hamel）[#45944](https://github.com/nodejs/node/pull/45944)
* \[[`54896ab011`](https://github.com/nodejs/node/commit/54896ab011)] - **module**: 修复意外的变异（Antoine du Hamel）[#46108](https://github.com/nodejs/node/pull/46108)
* \[[`bd98e5baba`](https://github.com/nodejs/node/commit/bd98e5baba)] - **node-api**: 消除 napi_add_finalizer 的歧义（Chengzhong Wu）[#45401](https://github.com/nodejs/node/pull/45401)
* \[[`f0508894d6`](https://github.com/nodejs/node/commit/f0508894d6)] - **perf_hooks**: 修复在 createHistogram 中检查 `options.figures` 范围的问题（Deokjin Kim）[#45999](https://github.com/nodejs/node/pull/45999)
* \[[`e482d5e42d`](https://github.com/nodejs/node/commit/e482d5e42d)] - **src**: 修复 simdutf 的字节序（Yagiz Nizipli）[#46257](https://github.com/nodejs/node/pull/46257)
* \[[`e2c47cdfad`](https://github.com/nodejs/node/commit/e2c47cdfad)] - **src**: 使 BuiltinLoader 线程安全且非全局化（Anna Henningsen）[#45942](https://github.com/nodejs/node/pull/45942)
* \[[`36ae3ccff3`](https://github.com/nodejs/node/commit/36ae3ccff3)] - **src**: 用 static_assert 替换不可达代码（Tobias Nießen）[#46209](https://github.com/nodejs/node/pull/46209)
* \[[`9d55a1f9a1`](https://github.com/nodejs/node/commit/9d55a1f9a1)] - **src**: 将 kMaxDigestMultiplier 隐藏在 HKDF 实现之外（Tobias Nießen）[#46206](https://github.com/nodejs/node/pull/46206)
* \[[`d3d62ed82c`](https://github.com/nodejs/node/commit/d3d62ed82c)] - **src**: 区分 env 停止标志（Chengzhong Wu）[#45907](https://github.com/nodejs/node/pull/45907)
* \[[`e85f76686c`](https://github.com/nodejs/node/commit/e85f76686c)] - **src**: 在 abort 后移除 return（Shelley Vohr）[#46172](https://github.com/nodejs/node/pull/46172)
* \[[`7dc9a53b18`](https://github.com/nodejs/node/commit/7dc9a53b18)] - **src**: 移除不必要的分号（Shelley Vohr）[#46171](https://github.com/nodejs/node/pull/46171)
* \[[`28af831d5a`](https://github.com/nodejs/node/commit/28af831d5a)] - **src**: 使用 simdutf 将外部化 builtins 转换为 UTF-16（Anna Henningsen）[#46119](https://github.com/nodejs/node/pull/46119)
* \[[`e8eaa490af`](https://github.com/nodejs/node/commit/e8eaa490af)] - **src**: 为内存信息名称使用常量字符串（Chengzhong Wu）[#46087](https://github.com/nodejs/node/pull/46087)
* \[[`f4559a1354`](https://github.com/nodejs/node/commit/f4559a1354)] - **src**: 修复 node_snapshotable.cc 中的拼写错误（Vadim）[#46103](https://github.com/nodejs/node/pull/46103)
* \[[`ca8ff08a5c`](https://github.com/nodejs/node/commit/ca8ff08a5c)] - **src**: 保持 PipeWrap::Open 函数与 TCPWrap 一致（theanarkh）[#46064](https://github.com/nodejs/node/pull/46064)
* \[[`a936eaeb34`](https://github.com/nodejs/node/commit/a936eaeb34)] - **src**: 加快 process.getActiveResourcesInfo() 的速度（Darshan Sen）[#46014](https://github.com/nodejs/node/pull/46014)
* \[[`5cf595659f`](https://github.com/nodejs/node/commit/5cf595659f)] - **src,lib**: 在 cluster rr 模式下，handle 会保持事件循环存活（theanarkh）[#46161](https://github.com/nodejs/node/pull/46161)
* \[[`18695595e1`](https://github.com/nodejs/node/commit/18695595e1)] - **stream**: 修复 pipeline 对目标端多次调用 end 的问题（Debadree Chatterjee）[#46226](https://github.com/nodejs/node/pull/46226)
* \[[`e5f53b51f0`](https://github.com/nodejs/node/commit/e5f53b51f0)] - **stream**: 为 ReadableStream 和 WritableStream 实现 finished()（Debadree Chatterjee）[#46205](https://github.com/nodejs/node/pull/46205)
* \[[`2f23f17f93`](https://github.com/nodejs/node/commit/2f23f17f93)] - **test**: 降低 `fs-write-optional-params` 的不稳定性（LiviaMedeiros）[#46238](https://github.com/nodejs/node/pull/46238)
* \[[`255f177108`](https://github.com/nodejs/node/commit/255f177108)] - **test**: 在 `fs.write` 中启用更多 bad buffer 情况（Deokjin Kim）[#46236](https://github.com/nodejs/node/pull/46236)
* \[[`c09b2036c7`](https://github.com/nodejs/node/commit/c09b2036c7)] - **test**: 将 postject 更新到 1.0.0-alpha.4（Node.js GitHub Bot）[#46212](https://github.com/nodejs/node/pull/46212)
* \[[`4ac5c7180f`](https://github.com/nodejs/node/commit/4ac5c7180f)] - **test**: 重构以避免加载器修改全局对象（Michaël Zasso）[#46220](https://github.com/nodejs/node/pull/46220)
* \[[`bbf9da8e2c`](https://github.com/nodejs/node/commit/bbf9da8e2c)] - **test**: 改进 WHATWG `TextDecoder` 的测试覆盖率（Juan José）[#45241](https://github.com/nodejs/node/pull/45241)
* \[[`4f491d368c`](https://github.com/nodejs/node/commit/4f491d368c)] - **test**: 添加修复，使测试在 42 端口不受特权限制时退出（Suyash Nayan）[#45904](https://github.com/nodejs/node/pull/45904)
* \[[`6e2f7228f3`](https://github.com/nodejs/node/commit/6e2f7228f3)] - **test**: 使用 `os.availableParallelism()`（Deokjin Kim）[#46003](https://github.com/nodejs/node/pull/46003)
* \[[`c77b0da512`](https://github.com/nodejs/node/commit/c77b0da512)] - **test**: 修复 flaky 的 test-runner-exit-code.js（Colin Ihrig）[#46138](https://github.com/nodejs/node/pull/46138)
* \[[`f309e2acb6`](https://github.com/nodejs/node/commit/f309e2acb6)] - **test**: 更新 Web Events WPT（Deokjin Kim）[#46051](https://github.com/nodejs/node/pull/46051)
* \[[`0f60bc9bbc`](https://github.com/nodejs/node/commit/0f60bc9bbc)] - **test**: 为 event lib 中的 once() 添加测试（Jonathan Diaz）[#46126](https://github.com/nodejs/node/pull/46126)
* \[[`8a8b18678a`](https://github.com/nodejs/node/commit/8a8b18678a)] - **test,esm**: 验证动态 import 的更多边缘情况（Antoine du Hamel）[#46059](https://github.com/nodejs/node/pull/46059)
* \[[`4d3743938f`](https://github.com/nodejs/node/commit/4d3743938f)] - **test_runner**: 更新注释以符合 eslint no-fallthrough 规则（Antoine du Hamel）[#46258](https://github.com/nodejs/node/pull/46258)
* \[[`653b108fdc`](https://github.com/nodejs/node/commit/653b108fdc)] - **tools**: 将 eslint 更新到 8.32.0（Node.js GitHub Bot）[#46258](https://github.com/nodejs/node/pull/46258)
* \[[`a4b0c916e0`](https://github.com/nodejs/node/commit/a4b0c916e0)] - **tools**: 更新 lint-md-dependencies（Node.js GitHub Bot）[#46214](https://github.com/nodejs/node/pull/46214)
* \[[`f4465e656d`](https://github.com/nodejs/node/commit/f4465e656d)] - **tools**: 修复 update-undici 中的宏名称（Almeida）[#46217](https://github.com/nodejs/node/pull/46217)
* \[[`1aa4534c6f`](https://github.com/nodejs/node/commit/1aa4534c6f)] - **tools**: 添加更新 postject 依赖的自动化（Darshan Sen）[#46157](https://github.com/nodejs/node/pull/46157)
* \[[`c150b312cd`](https://github.com/nodejs/node/commit/c150b312cd)] - **tools**: 更新 create-or-update-pull-request-action（Michaël Zasso）[#46169](https://github.com/nodejs/node/pull/46169)
* \[[`c68a043400`](https://github.com/nodejs/node/commit/c68a043400)] - **tools**: 将 eslint 更新到 8.31.0（Node.js GitHub Bot）[#46131](https://github.com/nodejs/node/pull/46131)
* \[[`ac90e419d1`](https://github.com/nodejs/node/commit/ac90e419d1)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@3.9.1（Node.js GitHub Bot）[#46129](https://github.com/nodejs/node/pull/46129)
* \[[`750fcf84eb`](https://github.com/nodejs/node/commit/750fcf84eb)] - **tools**: 将 update-eslint.sh 移动到 dep_updaters/（Luigi Pinca）[#46088](https://github.com/nodejs/node/pull/46088)
* \[[`2e8750a18c`](https://github.com/nodejs/node/commit/2e8750a18c)] - **tools**: 使 update-eslint.sh 可与 npm\@9 一起工作（Luigi Pinca）[#46088](https://github.com/nodejs/node/pull/46088)
* \[[`e90a3a6eff`](https://github.com/nodejs/node/commit/e90a3a6eff)] - **tools**: 修复 lint 规则建议（Colin Ihrig）[#46044](https://github.com/nodejs/node/pull/46044)
* \[[`0985ef8bfb`](https://github.com/nodejs/node/commit/0985ef8bfb)] - **tools**: 将 `ArrayPrototypeConcat` 添加到需要避免的 primordials 列表中（Antoine du Hamel）[#44445](https://github.com/nodejs/node/pull/44445)
* \[[`ed69a3af92`](https://github.com/nodejs/node/commit/ed69a3af92)] - **tools**: 添加 `prefer-proto` 规则（Jordan Harband）[#46083](https://github.com/nodejs/node/pull/46083)
* \[[`4c1c20fae2`](https://github.com/nodejs/node/commit/4c1c20fae2)] - **trace_events**: 重构为使用 `validateStringArray`（Deokjin Kim）[#46012](https://github.com/nodejs/node/pull/46012)
* \[[`6c8a81d2dc`](https://github.com/nodejs/node/commit/6c8a81d2dc)] - **vm**: 重构为使用 validate 函数（Deokjin Kim）[#46176](https://github.com/nodejs/node/pull/46176)

<a id="19.4.0"></a>

## 2023-01-06，版本 19.4.0（当前），@RafaelGSS

### 显著变更

* **buffer**:
  * （SEMVER-MINOR）添加 buffer.isUtf8 用于 utf8 校验（Yagiz Nizipli） [#45947](https://github.com/nodejs/node/pull/45947)
* **http**:
  * （SEMVER-MINOR）改进超时默认值处理（Paolo Insogna） [#45778](https://github.com/nodejs/node/pull/45778)
* **net**:
  * 添加 autoSelectFamily 全局 getter 和 setter（Paolo Insogna） [#45777](https://github.com/nodejs/node/pull/45777)
* **os**:
  * （SEMVER-MINOR）添加 availableParallelism()（Colin Ihrig） [#45895](https://github.com/nodejs/node/pull/45895)
* **util**:
  * 为 text-decoder fatal 标志添加快速路径（Yagiz Nizipli） [#45803](https://github.com/nodejs/node/pull/45803)

### 提交

* \[[`54b748acc0`](https://github.com/nodejs/node/commit/54b748acc0)] - **async\_hooks**: 重构为使用 `validateObject`（Deokjin Kim） [#46004](https://github.com/nodejs/node/pull/46004)
* \[[`cf2ff81f26`](https://github.com/nodejs/node/commit/cf2ff81f26)] - **benchmark**: 包含 webstreams 基准测试（Rafael Gonzaga） [#45876](https://github.com/nodejs/node/pull/45876)
* \[[`6e3d7f8c2d`](https://github.com/nodejs/node/commit/6e3d7f8c2d)] - **bootstrap**: 优化内置快照中加载的模块（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`d181b76374`](https://github.com/nodejs/node/commit/d181b76374)] - **bootstrap**: 使 CJS 加载器可被快照化（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`508e830765`](https://github.com/nodejs/node/commit/508e830765)] - **bootstrap**: 将 event\_target 包含到内置快照中（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`dd77c05480`](https://github.com/nodejs/node/commit/dd77c05480)] - **bootstrap**: 支持在快照中使用 module\_wrap 绑定（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`fbe399c75c`](https://github.com/nodejs/node/commit/fbe399c75c)] - **(SEMVER-MINOR)** **buffer**: 添加 buffer.isUtf8 用于 utf8 校验（Yagiz Nizipli） [#45947](https://github.com/nodejs/node/pull/45947)
* \[[`233a66f937`](https://github.com/nodejs/node/commit/233a66f937)] - **build**: 修复从 powershell 进行 arm64 交叉编译的问题（Stefan Stojanovic） [#45890](https://github.com/nodejs/node/pull/45890)
* \[[`e7b98a3da2`](https://github.com/nodejs/node/commit/e7b98a3da2)] - **build**: 添加禁用共享只读堆的选项（Anna Henningsen） [#45887](https://github.com/nodejs/node/pull/45887)
* \[[`777c551edf`](https://github.com/nodejs/node/commit/777c551edf)] - **crypto**: 确保导出的 webcrypto EC 密钥使用未压缩点格式（Ben Noordhuis） [#46021](https://github.com/nodejs/node/pull/46021)
* \[[`f7dba5bef7`](https://github.com/nodejs/node/commit/f7dba5bef7)] - **crypto**: 修复 globalThis.crypto 的 this 检查（Filip Skokan） [#45857](https://github.com/nodejs/node/pull/45857)
* \[[`56f3ad101b`](https://github.com/nodejs/node/commit/56f3ad101b)] - **crypto**: 修复 CryptoKey 原型 WPT（Filip Skokan） [#45857](https://github.com/nodejs/node/pull/45857)
* \[[`c9747f1140`](https://github.com/nodejs/node/commit/c9747f1140)] - **crypto**: 使用 globalThis.crypto 而不是 require('crypto').webcrypto（Filip Skokan） [#45817](https://github.com/nodejs/node/pull/45817)
* \[[`6eede72241`](https://github.com/nodejs/node/commit/6eede72241)] - **crypto**: 修复 CryptoKey 的 WebIDL 一致性问题（Filip Skokan） [#45855](https://github.com/nodejs/node/pull/45855)
* \[[`c9802862b7`](https://github.com/nodejs/node/commit/c9802862b7)] - **crypto**: 修复在未传入参数时调用 getRandomValues 的错误（Filip Skokan） [#45854](https://github.com/nodejs/node/pull/45854)
* \[[`3d09754186`](https://github.com/nodejs/node/commit/3d09754186)] - **debugger**: 重构 lib/internal/debugger/inspect.js 中的 console（Debadree Chatterjee） [#45847](https://github.com/nodejs/node/pull/45847)
* \[[`fdda2ff53b`](https://github.com/nodejs/node/commit/fdda2ff53b)] - **deps**: V8：cherry-pick 30861a39323d（Aaron Friel） [#45851](https://github.com/nodejs/node/pull/45851)
* \[[`71bf513062`](https://github.com/nodejs/node/commit/71bf513062)] - **deps**: 将 V8 补丁更新到 10.8.168.25（Michaël Zasso） [#45996](https://github.com/nodejs/node/pull/45996)
* \[[`0552b13232`](https://github.com/nodejs/node/commit/0552b13232)] - **deps**: 将 simdutf 更新到 2.0.9（Node.js GitHub Bot） [#45975](https://github.com/nodejs/node/pull/45975)
* \[[`e73be1b3b9`](https://github.com/nodejs/node/commit/e73be1b3b9)] - **deps**: 更新到 uvwasi 0.0.14（Colin Ihrig） [#45970](https://github.com/nodejs/node/pull/45970)
* \[[`e4323f01c1`](https://github.com/nodejs/node/commit/e4323f01c1)] - **deps**: 修复 updater github workflow 任务（Yagiz Nizipli） [#45972](https://github.com/nodejs/node/pull/45972)
* \[[`05fee67238`](https://github.com/nodejs/node/commit/05fee67238)] - _**Revert**_ "**deps**: 在 benchmark ci 中为 simutf 禁用 avx512"（Yagiz Nizipli） [#45948](https://github.com/nodejs/node/pull/45948)
* \[[`98fc94a444`](https://github.com/nodejs/node/commit/98fc94a444)] - **deps**: 在 benchmark ci 中为 simutf 禁用 avx512（Yagiz Nizipli） [#45803](https://github.com/nodejs/node/pull/45803)
* \[[`344c5ec0ea`](https://github.com/nodejs/node/commit/344c5ec0ea)] - **deps**: 添加 simdutf 依赖（Yagiz Nizipli） [#45803](https://github.com/nodejs/node/pull/45803)
* \[[`7bdad948c8`](https://github.com/nodejs/node/commit/7bdad948c8)] - **deps**: V8：回移植 8ca9f77d0f7c（Anna Henningsen） [#45871](https://github.com/nodejs/node/pull/45871)
* \[[`29f90cf5af`](https://github.com/nodejs/node/commit/29f90cf5af)] - **deps**: 将时区数据更新到 2022g（Node.js GitHub Bot） [#45731](https://github.com/nodejs/node/pull/45731)
* \[[`99fec0bf64`](https://github.com/nodejs/node/commit/99fec0bf64)] - **deps**: 将 undici 更新到 5.14.0（Node.js GitHub Bot） [#45812](https://github.com/nodejs/node/pull/45812)
* \[[`faee973fa7`](https://github.com/nodejs/node/commit/faee973fa7)] - **deps**: V8：cherry-pick bc831f8ba33b（Yagiz Nizipli） [#45788](https://github.com/nodejs/node/pull/45788)
* \[[`e2944109c6`](https://github.com/nodejs/node/commit/e2944109c6)] - **deps**: V8：cherry-pick bf0bd4868dde（Michaël Zasso） [#45908](https://github.com/nodejs/node/pull/45908)
* \[[`e113d169ee`](https://github.com/nodejs/node/commit/e113d169ee)] - **doc**: 更新 isUtf8 描述（Yagiz Nizipli） [#45973](https://github.com/nodejs/node/pull/45973)
* \[[`9e16406066`](https://github.com/nodejs/node/commit/9e16406066)] - **doc**: 按字母顺序排序 http.createServer() 选项（Luigi Pinca） [#45680](https://github.com/nodejs/node/pull/45680)
* \[[`49253e1a8f`](https://github.com/nodejs/node/commit/49253e1a8f)] - **doc**: 在 timers 和 tls 的错误示例中使用 console.error（Deokjin Kim） [#46002](https://github.com/nodejs/node/pull/46002)
* \[[`8be1b666a7`](https://github.com/nodejs/node/commit/8be1b666a7)] - **doc**: 修复 `url.protocol` 示例的错误输出（Deokjin Kim） [#45954](https://github.com/nodejs/node/pull/45954)
* \[[`9251dce8b2`](https://github.com/nodejs/node/commit/9251dce8b2)] - **doc**: 在 async\_context 和 cluster 中使用 `os.availableParallelism()`（Deokjin Kim） [#45979](https://github.com/nodejs/node/pull/45979)
* \[[`952e03ae66`](https://github.com/nodejs/node/commit/952e03ae66)] - **doc**: 将 EventEmitterAsyncResource 的 `options` 设为可选（Deokjin Kim） [#45985](https://github.com/nodejs/node/pull/45985)
* \[[`71cc3b3712`](https://github.com/nodejs/node/commit/71cc3b3712)] - **doc**: 在战略计划文档中替换 single executable champion（Darshan Sen） [#45956](https://github.com/nodejs/node/pull/45956)
* \[[`eaf6b63637`](https://github.com/nodejs/node/commit/eaf6b63637)] - **doc**: 更新 repl 中示例的错误消息（Deokjin Kim） [#45920](https://github.com/nodejs/node/pull/45920)
* \[[`d8b5b7da75`](https://github.com/nodejs/node/commit/d8b5b7da75)] - **doc**: 修复 packages.md 中的拼写错误（Eric Mutta） [#45957](https://github.com/nodejs/node/pull/45957)
* \[[`4457e051c9`](https://github.com/nodejs/node/commit/4457e051c9)] - **doc**: 从 `url.hostname` 示例中移除端口（Deokjin Kim） [#45927](https://github.com/nodejs/node/pull/45927)
* \[[`908f4fab52`](https://github.com/nodejs/node/commit/908f4fab52)] - **doc**: 展示 http 中示例的输出（Deokjin Kim） [#45915](https://github.com/nodejs/node/pull/45915)
* \[[`faf5c23084`](https://github.com/nodejs/node/commit/faf5c23084)] - **(SEMVER-MINOR)** **doc**: 为 os.cpus() 添加并行度说明（Colin Ihrig） [#45895](https://github.com/nodejs/node/pull/45895)
* \[[`9ed547b73c`](https://github.com/nodejs/node/commit/9ed547b73c)] - **doc**: 修复 `url.password` 示例的错误输出（Deokjin Kim） [#45928](https://github.com/nodejs/node/pull/45928)
* \[[`a89f8c1337`](https://github.com/nodejs/node/commit/a89f8c1337)] - **doc**: 修复 `deprecations.md` 中的部分历史记录条目（Antoine du Hamel） [#45891](https://github.com/nodejs/node/pull/45891)
* \[[`cf30fca23f`](https://github.com/nodejs/node/commit/cf30fca23f)] - **doc**: 为 NODE\_MODULE 添加提示（theanarkh） [#45797](https://github.com/nodejs/node/pull/45797)
* \[[`d500445aec`](https://github.com/nodejs/node/commit/d500445aec)] - **doc**: 降低发布期间误合并的可能性（Richard Lau） [#45864](https://github.com/nodejs/node/pull/45864)
* \[[`e229f060e3`](https://github.com/nodejs/node/commit/e229f060e3)] - **doc**: 为 webcrypto rsaOaepParams 添加反引号（Filip Skokan） [#45883](https://github.com/nodejs/node/pull/45883)
* \[[`dfa58c1947`](https://github.com/nodejs/node/commit/dfa58c1947)] - **doc**: 移除发布清理步骤（Michaël Zasso） [#45858](https://github.com/nodejs/node/pull/45858)
* \[[`b93a9670a8`](https://github.com/nodejs/node/commit/b93a9670a8)] - **doc**: 在文档中添加 stream/promises 的 pipeline 和 finished（Marco Ippolito） [#45832](https://github.com/nodejs/node/pull/45832)
* \[[`c86f4a17d6`](https://github.com/nodejs/node/commit/c86f4a17d6)] - **doc**: 移除 Juan Jose keys（Rafael Gonzaga） [#45827](https://github.com/nodejs/node/pull/45827)
* \[[`c37a119f90`](https://github.com/nodejs/node/commit/c37a119f90)] - **doc**: 移除最后一个使用 require('crypto').webcrypto 的示例（Filip Skokan） [#45819](https://github.com/nodejs/node/pull/45819)
* \[[`7e047dfcbb`](https://github.com/nodejs/node/commit/7e047dfcbb)] - **doc**: 修复 util 中示例的错误输出（Deokjin Kim） [#45825](https://github.com/nodejs/node/pull/45825)
* \[[`8046e0ef53`](https://github.com/nodejs/node/commit/8046e0ef53)] - **errors**: 重构为使用一个格式化列表字符串的方法（Daeyeon Jeong） [#45793](https://github.com/nodejs/node/pull/45793)
* \[[`2d49e0e635`](https://github.com/nodejs/node/commit/2d49e0e635)] - **esm**: 重写 loader hooks 测试（Geoffrey Booth） [#46016](https://github.com/nodejs/node/pull/46016)
* \[[`47cc0e4bdb`](https://github.com/nodejs/node/commit/47cc0e4bdb)] - **events**: 修复违反符号命名约定的问题（Deokjin Kim） [#45978](https://github.com/nodejs/node/pull/45978)
* \[[`22a66cff66`](https://github.com/nodejs/node/commit/22a66cff66)] - **fs**: 重构为使用 `validateInteger`（Deokjin Kim） [#46008](https://github.com/nodejs/node/pull/46008)
* \[[`bc43922949`](https://github.com/nodejs/node/commit/bc43922949)] - **http**: 将注释中的 `var` 替换为 `const`（Deokjin Kim） [#45951](https://github.com/nodejs/node/pull/45951)
* \[[`7ea72ee421`](https://github.com/nodejs/node/commit/7ea72ee421)] - **(SEMVER-MINOR)** **http**: 改进超时默认值处理（Paolo Insogna） [#45778](https://github.com/nodejs/node/pull/45778)
* \[[`7f1daedf4c`](https://github.com/nodejs/node/commit/7f1daedf4c)] - **lib**: 更新 `getOwnPropertyValueOrDefault` 的 JSDoc（Deokjin Kim） [#46010](https://github.com/nodejs/node/pull/46010)
* \[[`28f9089b83`](https://github.com/nodejs/node/commit/28f9089b83)] - **lib**: 将 `kEmptyObject` 用作 options 的默认值（Deokjin Kim） [#46011](https://github.com/nodejs/node/pull/46011)
* \[[`f6c6673ec4`](https://github.com/nodejs/node/commit/f6c6673ec4)] - **lib**: 在 modules/run\_main.js 中延迟加载依赖（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`e529ea4144`](https://github.com/nodejs/node/commit/e529ea4144)] - **lib**: 在 source\_map\_cache.js 中延迟加载依赖（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`943852ab83`](https://github.com/nodejs/node/commit/943852ab83)] - **lib**: 向 internal/util 添加 getLazy() 方法（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`25d0a94453`](https://github.com/nodejs/node/commit/25d0a94453)] - **meta**: 更新 AUTHORS（Node.js GitHub Bot） [#46040](https://github.com/nodejs/node/pull/46040)
* \[[`0a70316ecc`](https://github.com/nodejs/node/commit/0a70316ecc)] - **meta**: 更新 AUTHORS（Node.js GitHub Bot） [#45968](https://github.com/nodejs/node/pull/45968)
* \[[`86e30fcb4d`](https://github.com/nodejs/node/commit/86e30fcb4d)] - **meta**: 将 `nodejs/loaders` 添加到 CODEOWNERS（Geoffrey Booth） [#45940](https://github.com/nodejs/node/pull/45940)
* \[[`e95695654d`](https://github.com/nodejs/node/commit/e95695654d)] - **meta**: 将 `nodejs/test_runner` 添加到 CODEOWNERS（Antoine du Hamel） [#45935](https://github.com/nodejs/node/pull/45935)
* \[[`353dab5bdf`](https://github.com/nodejs/node/commit/353dab5bdf)] - **meta**: 更新 AUTHORS（Node.js GitHub Bot） [#45899](https://github.com/nodejs/node/pull/45899)
* \[[`0b3512f690`](https://github.com/nodejs/node/commit/0b3512f690)] - **modules**: 将回调和条件移至 modules/esm/utils.js（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`c6ab449d1b`](https://github.com/nodejs/node/commit/c6ab449d1b)] - **modules**: 将 modules/cjs/helpers.js 移至 modules/helpers.js（Joyee Cheung） [#45849](https://github.com/nodejs/node/pull/45849)
* \[[`4d62b099b4`](https://github.com/nodejs/node/commit/4d62b099b4)] - **net**: 处理 socket.write(cb) 边缘情况（Santiago Gimeno） [#45922](https://github.com/nodejs/node/pull/45922)
* \[[`8e6b8dbb41`](https://github.com/nodejs/node/commit/8e6b8dbb41)] - **net**: 添加 autoSelectFamily 全局 getter 和 setter（Paolo Insogna） [#45777](https://github.com/nodejs/node/pull/45777)
* \[[`f3bb6a38ae`](https://github.com/nodejs/node/commit/f3bb6a38ae)] - **node-api**: 泛化 finalizer 的第二次回调传递（Chengzhong Wu） [#44141](https://github.com/nodejs/node/pull/44141)
* \[[`d71883e271`](https://github.com/nodejs/node/commit/d71883e271)] - **(SEMVER-MINOR)** **os**: 添加 availableParallelism()（Colin Ihrig） [#45895](https://github.com/nodejs/node/pull/45895)
* \[[`4c0850539a`](https://github.com/nodejs/node/commit/4c0850539a)] - **process,worker**: 确保 exit() 之后的代码无效（ywave620） [#45620](https://github.com/nodejs/node/pull/45620)
* \[[`24cae6b4a3`](https://github.com/nodejs/node/commit/24cae6b4a3)] - **repl**: 提高针对原型污染的健壮性（Antoine du Hamel） [#45604](https://github.com/nodejs/node/pull/45604)
* \[[`af25c95b22`](https://github.com/nodejs/node/commit/af25c95b22)] - **src**: 修复 `node_file.cc` 中的拼写错误（Vadim） [#45998](https://github.com/nodejs/node/pull/45998)
* \[[`261d6d0726`](https://github.com/nodejs/node/commit/261d6d0726)] - **src**: 修复 Windows 上 OnStreamRead 的崩溃问题（Santiago Gimeno） [#45878](https://github.com/nodejs/node/pull/45878)
* \[[`6c5b7e660b`](https://github.com/nodejs/node/commit/6c5b7e660b)] - **src**: 添加 worker 按 isolate 的绑定初始化（Chengzhong Wu） [#45547](https://github.com/nodejs/node/pull/45547)
* \[[`db535b6caa`](https://github.com/nodejs/node/commit/db535b6caa)] - **src**: 定义按 isolate 的内部绑定注册回调（Chengzhong Wu） [#45547](https://github.com/nodejs/node/pull/45547)
* \[[`ded87f6dc4`](https://github.com/nodejs/node/commit/ded87f6dc4)] - **src**: 修复从 addon 创建 `Isolate`s 的问题（Anna Henningsen） [#45885](https://github.com/nodejs/node/pull/45885)
* \[[`c2ed0ccb28`](https://github.com/nodejs/node/commit/c2ed0ccb28)] - **src**: 在 FastStringKey 实现中使用 string\_view（Anna Henningsen） [#45914](https://github.com/nodejs/node/pull/45914)
* \[[`b995138b96`](https://github.com/nodejs/node/commit/b995138b96)] - **src**: 尽可能使用 CreateEnvironment，而不是内联其代码（Anna Henningsen） [#45886](https://github.com/nodejs/node/pull/45886)
* \[[`4454f5fd71`](https://github.com/nodejs/node/commit/4454f5fd71)] - **src**: 修复溢出检查中的 UB（Ben Noordhuis） [#45882](https://github.com/nodejs/node/pull/45882)
* \[[`27d3201502`](https://github.com/nodejs/node/commit/27d3201502)] - **src**: 在用于 exec\_path 之前检查 args 的大小（A. Wilcox） [#45902](https://github.com/nodejs/node/pull/45902)
* \[[`2f898f2983`](https://github.com/nodejs/node/commit/2f898f2983)] - **src**: 修复 tls 证书根存储的数据竞争（Ben Noordhuis） [#45767](https://github.com/nodejs/node/pull/45767)
* \[[`eff92a61b9`](https://github.com/nodejs/node/commit/eff92a61b9)] - **src**: 将 undici 和 acorn 添加到 `process.versions`（Debadree Chatterjee） [#45621](https://github.com/nodejs/node/pull/45621)
* \[[`ab22a8ff4b`](https://github.com/nodejs/node/commit/ab22a8ff4b)] - **stream**: 重构为使用 `validateFunction`（Deokjin Kim） [#46007](https://github.com/nodejs/node/pull/46007)
* \[[`0858956f5f`](https://github.com/nodejs/node/commit/0858956f5f)] - **stream**: 修复 JSDoc 中的拼写错误（Deokjin Kim） [#45991](https://github.com/nodejs/node/pull/45991)
* \[[`2807efaea6`](https://github.com/nodejs/node/commit/2807efaea6)] - **test**: 使用 `process.hrtime.bigint` 代替 `process.hrtime`（Deokjin Kim） [#45877](https://github.com/nodejs/node/pull/45877)
* \[[`0f5a145973`](https://github.com/nodejs/node/commit/0f5a145973)] - **test**: 输出失败的 JS/parallel 测试（Geoffrey Booth） [#45960](https://github.com/nodejs/node/pull/45960)
* \[[`c6c094702b`](https://github.com/nodejs/node/commit/c6c094702b)] - **test**: 拆分并行的 fs-watch-recursive 测试（Yagiz Nizipli） [#45865](https://github.com/nodejs/node/pull/45865)
* \[[`97a8e055be`](https://github.com/nodejs/node/commit/97a8e055be)] - **test**: 将所有 WebCryptoAPI 全局对象添加到 WPTRunner 的 loadLazyGlobals 中（Filip Skokan） [#45857](https://github.com/nodejs/node/pull/45857)
* \[[`95ce16d8d9`](https://github.com/nodejs/node/commit/95ce16d8d9)] - **test**: 修复在 --node-builtin-modules-path 下损坏的测试（Geoffrey Booth） [#45894](https://github.com/nodejs/node/pull/45894)
* \[[`97868befe7`](https://github.com/nodejs/node/commit/97868befe7)] - **test**: 修复 mock.method 以支持类实例（Erick Wendel） [#45608](https://github.com/nodejs/node/pull/45608)
* \[[`71056daf76`](https://github.com/nodejs/node/commit/71056daf76)] - **test**: 将 encoding wpt 更新到最新（Yagiz Nizipli） [#45850](https://github.com/nodejs/node/pull/45850)
* \[[`10367c4cae`](https://github.com/nodejs/node/commit/10367c4cae)] - **test**: 将 url wpt 更新到最新（Yagiz Nizipli） [#45852](https://github.com/nodejs/node/pull/45852)
* \[[`53f02cf631`](https://github.com/nodejs/node/commit/53f02cf631)] - **test**: 添加 CryptoKey 传输测试（Filip Skokan） [#45811](https://github.com/nodejs/node/pull/45811)
* \[[`5de08ef275`](https://github.com/nodejs/node/commit/5de08ef275)] - **test**: 向 fixtures 添加 postject（Darshan Sen） [#45298](https://github.com/nodejs/node/pull/45298)
* \[[`fea122d51e`](https://github.com/nodejs/node/commit/fea122d51e)] - **test**: 启用 idlharness WebCryptoAPI WPTs（Filip Skokan） [#45822](https://github.com/nodejs/node/pull/45822)
* \[[`3c2ce5635e`](https://github.com/nodejs/node/commit/3c2ce5635e)] - **test**: 移除对 --experimental-global-webcrypto 标志的使用（Filip Skokan） [#45816](https://github.com/nodejs/node/pull/45816)
* \[[`b5e124537e`](https://github.com/nodejs/node/commit/b5e124537e)] - **test,crypto**: 更新 WebCryptoAPI WPT（Filip Skokan） [#45860](https://github.com/nodejs/node/pull/45860)
* \[[`7ae24abd7b`](https://github.com/nodejs/node/commit/7ae24abd7b)] - **test\_runner**: 使用 os.availableParallelism()（Colin Ihrig） [#45969](https://github.com/nodejs/node/pull/45969)
* \[[`c5004d42af`](https://github.com/nodejs/node/commit/c5004d42af)] - **test\_runner**: 如果测试主体抛出错误则运行 t.after()（Colin Ihrig） [#45870](https://github.com/nodejs/node/pull/45870)
* \[[`bdbb676bee`](https://github.com/nodejs/node/commit/bdbb676bee)] - **test\_runner**: 解析 yaml（Moshe Atlow） [#45815](https://github.com/nodejs/node/pull/45815)
* \[[`ca9b9b9ce6`](https://github.com/nodejs/node/commit/ca9b9b9ce6)] - **tls**: 不要将致命 TLS 警报视为 EOF（David Benjamin） [#44563](https://github.com/nodejs/node/pull/44563)
* \[[`d08a574ecf`](https://github.com/nodejs/node/commit/d08a574ecf)] - **tls**: 修复 TLS close\_notify 的重入问题（David Benjamin） [#44563](https://github.com/nodejs/node/pull/44563)
* \[[`0f0d22a63e`](https://github.com/nodejs/node/commit/0f0d22a63e)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.9.0（Node.js GitHub Bot） [#46039](https://github.com/nodejs/node/pull/46039)
* \[[`5a8d125fc4`](https://github.com/nodejs/node/commit/5a8d125fc4)] - **tools**: 将 doc 更新到 unist-util-select\@4.0.2（Node.js GitHub Bot） [#46038](https://github.com/nodejs/node/pull/46038)
* \[[`54776ffe80`](https://github.com/nodejs/node/commit/54776ffe80)] - **tools**: 在 promotion 脚本中添加 release host 变量（Ruy Adorno） [#45913](https://github.com/nodejs/node/pull/45913)
* \[[`f968fdb78a`](https://github.com/nodejs/node/commit/f968fdb78a)] - **tools**: 为 `AUTHORS` 更新自动化添加 url（Antoine du Hamel） [#45971](https://github.com/nodejs/node/pull/45971)
* \[[`7c518cbac1`](https://github.com/nodejs/node/commit/7c518cbac1)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.8.1（Node.js GitHub Bot） [#45967](https://github.com/nodejs/node/pull/45967)
* \[[`1282f7f656`](https://github.com/nodejs/node/commit/1282f7f656)] - **tools**: 更新 GitHub workflow action（Mohammed Keyvanzadeh） [#45937](https://github.com/nodejs/node/pull/45937)
* \[[`f446af78e9`](https://github.com/nodejs/node/commit/f446af78e9)] - **tools**: 更新 lint-md 依赖（Node.js GitHub Bot） [#45813](https://github.com/nodejs/node/pull/45813)
* \[[`794611ade9`](https://github.com/nodejs/node/commit/794611ade9)] - **tools**: 强制在 `tools/` 中使用尾随逗号（Antoine du Hamel） [#45889](https://github.com/nodejs/node/pull/45889)
* \[[`124c2b32d9`](https://github.com/nodejs/node/commit/124c2b32d9)] - **tools**: 修复错误的版本历史顺序（Fabien Michel） [#45728](https://github.com/nodejs/node/pull/45728)
* \[[`27cf389c22`](https://github.com/nodejs/node/commit/27cf389c22)] - **tools**: 将 eslint 更新到 8.29.0（Node.js GitHub Bot） [#45733](https://github.com/nodejs/node/pull/45733)
* \[[`ae842a40b5`](https://github.com/nodejs/node/commit/ae842a40b5)] - **util**: 为 text-decoder fatal 标志添加快速路径（Yagiz Nizipli） [#45803](https://github.com/nodejs/node/pull/45803)
* \[[`389cc3e1d6`](https://github.com/nodejs/node/commit/389cc3e1d6)] - **vm**: 重构为使用 `validateStringArray`（Deokjin Kim） [#46020](https://github.com/nodejs/node/pull/46020)
* \[[`7bd6a2c258`](https://github.com/nodejs/node/commit/7bd6a2c258)] - **wasi**: 快速调用（snek） [#43697](https://github.com/nodejs/node/pull/43697)

<a id="19.3.0"></a>

## 2022-12-14, 版本 19.3.0（当前）, @targos

### 重要变更

#### 将 npm 更新到 9.2.0

基于我们已经建立的关于集成 [`npm` 和 `node`](https://github.com/npm/cli/wiki/Integrating-with-node) 的指南列表，
下面按组列出了这些破坏性变更，并说明它们为什么符合上面链接的指南。
请注意，所有破坏性变更都在 [9.0.0](https://github.com/npm/cli/releases/tag/v9.0.0) 中完成。
自 `npm@9.0.0` 之后的所有后续小版本和补丁版本都不包含任何破坏性变更。

##### Engines

> 说明：`npm@9` 所支持的 node engines 使得在任何 `14` 或 `16` 的 LTS 版本中将 `npm@9` 作为默认版本都是安全的，以及 `18.0.0` 及以上的任何版本

* `npm` 现在与以下适用于 node 的 semver 范围兼容：`^14.17.0 || ^16.13.0 || >=18.0.0`

##### Filesystem

> 说明：以 root 身份运行时，之前版本的 npm 会尝试代表用户自动管理文件所有权。该行为在许多情况下都有问题，因此已被移除，改为允许用户自行管理其文件系统权限

* `npm` 将不再尝试修改其创建的文件的所有权。

##### Auth

> 说明：对于因用户具有不受支持的 auth 配置而抛出的任何错误，修复说明中将显示 `npm config fix`，这将允许用户自动修复其 auth 配置。

* 配置文件中存在未限定到特定 registry 的 auth 相关设置已不再受支持，并会抛出错误。

##### Login

> 说明：默认的 `auth-type` 已更改，用户可以通过 `npm config set auth-type=legacy` 回到旧行为。`login` 和 `adduser` 也已分离，使每个命令更符合其名称，而不再互为别名。

* 旧的 auth 类型 `sso`、`saml` 和 `legacy` 已合并为 `"legacy"`。
* `auth-type` 的默认值为 `"web"`
* `login` 和 `adduser` 现在是独立的命令，会向 registry 发送不同的数据。
* `auth-type` 配置值 `web` 和 `legacy` 只会尝试各自对应的方法，
  npm 不再会把它们都尝试一遍并等待看哪个不会失败。

##### Tarball Packing

> 说明：以前在打包时使用多个 ignore/allow 列表属于未定义行为，而现在在打包 tarball 时，操作顺序已被严格定义，这使其更容易遵循，并且只会影响依赖此前未定义行为的用户。

* `npm pack` 在应用 ignore 规则时现在遵循严格的操作顺序。
  如果 `package.json` 中存在 `files` 数组，那么来自根目录的 `.gitignore`
  和 `.npmignore` 文件中的规则将被忽略。

##### Display/Debug/Timing Info

> 说明：这些变更主要涉及向终端显示信息，包括 timing 和 debug 日志信息。我们不认为这些变更会破坏任何现有工作流。

* 从 git URL 生成的链接现在将使用 `HEAD` 而不是 `master` 作为默认 ref。
* `timing` 已不再是 `--loglevel` 的有效值。
* `--timing` 将不受 `--loglevel` 影响显示 timing 信息，但 `--silent` 时除外。
* 使用 `--timing` 标志运行时，`npm` 现在会将 timing 数据写入一个文件，
  该文件与 debug 日志数据并列存放，遵循 `logs-dir` 选项，并回退到 `<CACHE>/_logs/` 目录，
  而不是直接写入缓存目录中。
* timing 文件数据不再是按行分隔的 JSON，而是每次运行都会创建一个唯一命名的 `<ID>-timing.json` 文件，其中 `<ID>` 部分
  与 debug 日志相同。
* `npm` 现在会在 stdout 上输出一些 json 错误。此前 `npm` 会将
  所有 json 格式的错误输出到 stderr，这使得解析变得困难，因为 stderr 流中通常已经写入了日志。

##### Config/Command 弃用或移除

> 说明：`install-links` 是列表中唯一一个会影响包安装的配置或命令。我们在预发布期间针对这一变更修复了若干问题。它也只会应用于在没有 package-lock.json 文件的情况下创建的新包树。任何带有现有 lock 文件的安装都不会被更改。

* 将布尔类型的安装标志弃用，改为使用 `--install-strategy`。
* `npm config set` 将不再接受已弃用或无效的配置选项。
* `install-links` 配置默认为 `"true"`。
* `node-version` 配置已被移除。
* `npm-version` 配置已被移除。
* `npm access` 子命令已重命名。
* `npm birthday` 已被移除。
* `npm set-script` 已被移除。
* `npm bin` 已被移除（请使用 `npx` 或 `npm exec` 来执行二进制文件）。

#### 其他重要变更

* \[[`03db415540`](https://github.com/nodejs/node/commit/03db415540)] - **build**: 默认禁用 v8 快照压缩 (Joyee Cheung) [#45716](https://github.com/nodejs/node/pull/45716)
* \[[`9f51b9e50d`](https://github.com/nodejs/node/commit/9f51b9e50d)] - **doc**: 为 headers/trailers 设置器添加仅文档级弃用说明 (Rich Trott) [#45697](https://github.com/nodejs/node/pull/45697)
* \[[`b010820c4e`](https://github.com/nodejs/node/commit/b010820c4e)] - **doc**: 将 Rafael Gonzaga 加入 TSC (Michael Dawson) [#45691](https://github.com/nodejs/node/pull/45691)
* \[[`b8b13dccd9`](https://github.com/nodejs/node/commit/b8b13dccd9)] - **(SEMVER-MINOR)** **net**: 添加 autoSelectFamily 和 autoSelectFamilyAttemptTimeout 选项 (Paolo Insogna) [#44731](https://github.com/nodejs/node/pull/44731)
* \[[`5d7cd363ab`](https://github.com/nodejs/node/commit/5d7cd363ab)] - **(SEMVER-MINOR)** **src**: 添加 uvwasi 版本 (Jithil P Ponnan) [#45639](https://github.com/nodejs/node/pull/45639)
* \[[`4165dcddf0`](https://github.com/nodejs/node/commit/95af851a25)] - **(SEMVER-MINOR)** **test_runner**: 添加 t.after() 钩子 (Colin Ihrig) [#45792](https://github.com/nodejs/node/pull/45792)
* \[[`d1bd7796ad`](https://github.com/nodejs/node/commit/d1bd7796ad)] - **(SEMVER-MINOR)** **test_runner**: 不为 runHook() 使用符号 (Colin Ihrig) [#45792](https://github.com/nodejs/node/pull/45792)
* \[[`691f58e76c`](https://github.com/nodejs/node/commit/691f58e76c)] - **tls**: 移除 trustcor 根 CA 证书 (Ben Noordhuis) [#45776](https://github.com/nodejs/node/pull/45776)

### 提交

* \[[`382efdf460`](https://github.com/nodejs/node/commit/382efdf460)] - **benchmark**: 为 text-encoder 添加多种输入 (Yagiz Nizipli) [#45787](https://github.com/nodejs/node/pull/45787)
* \[[`102c2dc071`](https://github.com/nodejs/node/commit/102c2dc071)] - **benchmark**: 使基准测试可在较旧版本的 Node.js 中运行 (Joyee Cheung) [#45746](https://github.com/nodejs/node/pull/45746)
* \[[`e2caf7ced9`](https://github.com/nodejs/node/commit/e2caf7ced9)] - **bootstrap**: 惰性加载非必要模块 (Joyee Cheung) [#45659](https://github.com/nodejs/node/pull/45659)
* \[[`49840d443c`](https://github.com/nodejs/node/commit/49840d443c)] - **buffer**: 移除不必要的惰性加载 (Antoine du Hamel) [#45807](https://github.com/nodejs/node/pull/45807)
* \[[`17847683dc`](https://github.com/nodejs/node/commit/17847683dc)] - **buffer**: 使 decodeUTF8 参数更宽松 (Yagiz Nizipli) [#45610](https://github.com/nodejs/node/pull/45610)
* \[[`03db415540`](https://github.com/nodejs/node/commit/03db415540)] - **build**: 默认禁用 v8 快照压缩 (Joyee Cheung) [#45716](https://github.com/nodejs/node/pull/45716)
* \[[`95a23e24f3`](https://github.com/nodejs/node/commit/95a23e24f3)] - **build**: 为 android 添加 python 3.11 支持 (Mohammed Keyvanzadeh) [#45765](https://github.com/nodejs/node/pull/45765)
* \[[`09bc89daba`](https://github.com/nodejs/node/commit/09bc89daba)] - **build**: 重构 zlib 的 gyp 文件 (Richard Lau) [#45589](https://github.com/nodejs/node/pull/45589)
* \[[`b5b56b6b45`](https://github.com/nodejs/node/commit/b5b56b6b45)] - **crypto**: 简化内部模块的惰性加载 (Antoine du Hamel) [#45809](https://github.com/nodejs/node/pull/45809)
* \[[`2e4d37e3f0`](https://github.com/nodejs/node/commit/2e4d37e3f0)] - **crypto**: 修复 CipherBase Update 的 int32 溢出 (Marco Ippolito) [#45769](https://github.com/nodejs/node/pull/45769)
* \[[`573eab9235`](https://github.com/nodejs/node/commit/573eab9235)] - **crypto**: 重构 ArrayBuffer 到 bigint 的转换工具函数 (Antoine du Hamel) [#45567](https://github.com/nodejs/node/pull/45567)
* \[[`845f805490`](https://github.com/nodejs/node/commit/845f805490)] - **crypto**: 重构 verify 可接受密钥用途函数 (Filip Skokan) [#45569](https://github.com/nodejs/node/pull/45569)
* \[[`7cc9998737`](https://github.com/nodejs/node/commit/7cc9998737)] - **crypto**: 修复 ECDH webcrypto 公共 CryptoKey 用途 (Filip Skokan) [#45569](https://github.com/nodejs/node/pull/45569)
* \[[`d030963f37`](https://github.com/nodejs/node/commit/d030963f37)] - **crypto**: 验证 CFRG webcrypto JWK 导入的 "d" 和 "x" 是一对 (Filip Skokan) [#45569](https://github.com/nodejs/node/pull/45569)
* \[[`9cd106efdc`](https://github.com/nodejs/node/commit/9cd106efdc)] - **crypto**: 对 CFRG webcrypto raw 和 jwk 导入密钥检查使用 DataError (Filip Skokan) [#45569](https://github.com/nodejs/node/pull/45569)
* \[[`9e2e3de6ce`](https://github.com/nodejs/node/commit/9e2e3de6ce)] - **crypto**: 对 webcrypto keyData 导入失败使用 DataError (Filip Skokan) [#45569](https://github.com/nodejs/node/pull/45569)
* \[[`40037b4e79`](https://github.com/nodejs/node/commit/40037b4e79)] - **crypto**: 修复 X25519 和 X448 webcrypto 公共 CryptoKey 用途 (Filip Skokan) [#45569](https://github.com/nodejs/node/pull/45569)
* \[[`de2b6b97b9`](https://github.com/nodejs/node/commit/de2b6b97b9)] - **crypto**: 确保导入私有 CFRG webcrypto 密钥时存在 "x" (Filip Skokan) [#45569](https://github.com/nodejs/node/pull/45569)
* \[[`75dbce9a07`](https://github.com/nodejs/node/commit/75dbce9a07)] - **deps**: 将 npm 升级到 9.2.0 (npm 团队) [#45780](https://github.com/nodejs/node/pull/45780)
* \[[`677eb62bf2`](https://github.com/nodejs/node/commit/677eb62bf2)] - **deps**: 将 npm 升级到 9.1.3 (npm 团队) [#45693](https://github.com/nodejs/node/pull/45693)
* \[[`1d823a6d30`](https://github.com/nodejs/node/commit/1d823a6d30)] - _**撤销**_ "**deps**: 修复缺少 SIMD 特性的 CPU 上的 zlib 编译" (Luigi Pinca) [#45589](https://github.com/nodejs/node/pull/45589)
* \[[`6b15994597`](https://github.com/nodejs/node/commit/6b15994597)] - **deps**: 将 undici 更新到 5.13.0 (Node.js GitHub Bot) [#45634](https://github.com/nodejs/node/pull/45634)
* \[[`fbd2d27789`](https://github.com/nodejs/node/commit/fbd2d27789)] - **deps**: 将 corepack 更新到 0.15.2 (Node.js GitHub Bot) [#45635](https://github.com/nodejs/node/pull/45635)
* \[[`60c9ac5178`](https://github.com/nodejs/node/commit/60c9ac5178)] - **deps**: 将 nghttp2 更新到 1.51.0 (Yagiz Nizipli) [#45537](https://github.com/nodejs/node/pull/45537)
* \[[`c8421204b0`](https://github.com/nodejs/node/commit/c8421204b0)] - **deps**: 将 V8 补丁升级到 10.8.168.21 (Michaël Zasso) [#45749](https://github.com/nodejs/node/pull/45749)
* \[[`c5277417c9`](https://github.com/nodejs/node/commit/c5277417c9)] - **diagnostics\_channel**: 修复 diagnostics channel 内存泄漏 (theanarkh) [#45633](https://github.com/nodejs/node/pull/45633)
* \[[`8a90f5c784`](https://github.com/nodejs/node/commit/8a90f5c784)] - **doc**: `buffer.fill` 空值 (Marco Ippolito) [#45794](https://github.com/nodejs/node/pull/45794)
* \[[`9d6af617ea`](https://github.com/nodejs/node/commit/9d6af617ea)] - **doc**: 添加 fs.cp 的 filter 选项参数 (MURAKAMI Masahiko) [#45739](https://github.com/nodejs/node/pull/45739)
* \[[`8c728d2f02`](https://github.com/nodejs/node/commit/8c728d2f02)] - **doc**: 将 `native module` 重新消歧为 `addon` (Daeyeon Jeong) [#45673](https://github.com/nodejs/node/pull/45673)
* \[[`7718ff82a4`](https://github.com/nodejs/node/commit/7718ff82a4)] - **doc**: 在 crypto 和 events 的错误场景中使用 console.error (emirgoren) [#45640](https://github.com/nodejs/node/pull/45640)
* \[[`029060e6e4`](https://github.com/nodejs/node/commit/029060e6e4)] - **doc**: 修复 events 中示例的实际结果不同的问题 (Deokjin Kim) [#45656](https://github.com/nodejs/node/pull/45656)
* \[[`9f51b9e50d`](https://github.com/nodejs/node/commit/9f51b9e50d)] - **doc**: 为 headers/trailers 设置器添加仅文档级弃用说明 (Rich Trott) [#45697](https://github.com/nodejs/node/pull/45697)
* \[[`801fe30488`](https://github.com/nodejs/node/commit/801fe30488)] - **doc**: 添加关于 API 文档如何发布的细节 (Michael Dawson) [#45626](https://github.com/nodejs/node/pull/45626)
* \[[`e124e2a6ee`](https://github.com/nodejs/node/commit/e124e2a6ee)] - **doc**: 在 child_process 和 dgram 的错误场景中使用 console.error (Deokjin Kim) [#45690](https://github.com/nodejs/node/pull/45690)
* \[[`1b920287b6`](https://github.com/nodejs/node/commit/1b920287b6)] - **doc**: 将 streaming 指南移至 doc/contributing (Michael Dawson) [#45582](https://github.com/nodejs/node/pull/45582)
* \[[`b010820c4e`](https://github.com/nodejs/node/commit/b010820c4e)] - **doc**: 将 Rafael 加入 tsc (Michael Dawson) [#45691](https://github.com/nodejs/node/pull/45691)
* \[[`4fb7cf88e2`](https://github.com/nodejs/node/commit/4fb7cf88e2)] - **doc**: 补充 debugger 中缺失的一行 (Deokjin Kim) [#45632](https://github.com/nodejs/node/pull/45632)
* \[[`c0df265fea`](https://github.com/nodejs/node/commit/c0df265fea)] - **doc**: 修复 stream 中示例的实际结果不同的问题 (Deokjin Kim) [#45619](https://github.com/nodejs/node/pull/45619)
* \[[`027e738064`](https://github.com/nodejs/node/commit/027e738064)] - **doc**: 为 eventTarget.removeEventListener 添加 `options` 参数 (Deokjin Kim) [#45667](https://github.com/nodejs/node/pull/45667)
* \[[`23ff5057b2`](https://github.com/nodejs/node/commit/23ff5057b2)] - **doc**: 定义 "react-native" 社区条件 (Alex Hunt) [#45367](https://github.com/nodejs/node/pull/45367)
* \[[`2e767bf18b`](https://github.com/nodejs/node/commit/2e767bf18b)] - **doc**: 将 os.machine() 文档移动到排序后的位置 (Colin Ihrig) [#45647](https://github.com/nodejs/node/pull/45647)
* \[[`aabfdef861`](https://github.com/nodejs/node/commit/aabfdef861)] - **doc**: 在 fs、https、net 和 process 的错误场景中使用 console.error (Deokjin Kim) [#45606](https://github.com/nodejs/node/pull/45606)
* \[[`3a02d50d35`](https://github.com/nodejs/node/commit/3a02d50d35)] - **doc**: 添加指向包含社交流程文档的链接 (Michael Dawson) [#45584](https://github.com/nodejs/node/pull/45584)
* \[[`e4316124fa`](https://github.com/nodejs/node/commit/e4316124fa)] - **fs**: 修复 `nonNativeWatcher` 监视包含现有文件的文件夹 (Moshe Atlow) [#45500](https://github.com/nodejs/node/pull/45500)
* \[[`d272faa54d`](https://github.com/nodejs/node/commit/d272faa54d)] - **fs**: 修复 `nonNativeWatcher` 对 `StatWatchers` 的泄漏 (Moshe Atlow) [#45501](https://github.com/nodejs/node/pull/45501)
* \[[`d64e773168`](https://github.com/nodejs/node/commit/d64e773168)] - **http**: 使 `OutgoingMessage` 更像流 (Robert Nagy) [#45672](https://github.com/nodejs/node/pull/45672)
* \[[`ed8ae88f30`](https://github.com/nodejs/node/commit/ed8ae88f30)] - **lib**: 移除 `internal/encoding` 中不必要的惰性加载 (Antoine du Hamel) [#45810](https://github.com/nodejs/node/pull/45810)
* \[[`302c5240c5`](https://github.com/nodejs/node/commit/302c5240c5)] - **lib**: 允许 Writeable.toWeb() 作用于 http.Outgoing 消息 (Debadree Chatterjee) [#45642](https://github.com/nodejs/node/pull/45642)
* \[[`e8745083b9`](https://github.com/nodejs/node/commit/e8745083b9)] - **lib**: 检查 `EventTarget` 函数中的参数数量 (Deokjin Kim) [#45668](https://github.com/nodejs/node/pull/45668)
* \[[`9f7bb5ce0e`](https://github.com/nodejs/node/commit/9f7bb5ce0e)] - **lib**: 将 `native module` 重新消歧为 `binding` (Daeyeon Jeong) [#45673](https://github.com/nodejs/node/pull/45673)
* \[[`353339a552`](https://github.com/nodejs/node/commit/353339a552)] - **lib**: 将 `native module` 重新消歧为 `builtin module` (Daeyeon Jeong) [#45673](https://github.com/nodejs/node/pull/45673)
* \[[`99410efd19`](https://github.com/nodejs/node/commit/99410efd19)] - **lib**: 新增 SuiteContext 类 (Debadree Chatterjee) [#45687](https://github.com/nodejs/node/pull/45687)
* \[[`a79f37a0a7`](https://github.com/nodejs/node/commit/a79f37a0a7)] - **lib**: 补充问题中 `removeEventListener` 的缺失类型 (Deokjin Kim) [#45676](https://github.com/nodejs/node/pull/45676)
* \[[`e0750467e8`](https://github.com/nodejs/node/commit/e0750467e8)] - **meta**: 更新 AUTHORS (Node.js GitHub Bot) [#45814](https://github.com/nodejs/node/pull/45814)
* \[[`376f3468b9`](https://github.com/nodejs/node/commit/376f3468b9)] - **meta**: 更新 AUTHORS (Node.js GitHub Bot) [#45732](https://github.com/nodejs/node/pull/45732)
* \[[`a6e2cf2d6f`](https://github.com/nodejs/node/commit/a6e2cf2d6f)] - **meta**: 为 Stefan Stojanovic 添加 .mailmap 条目 (Rich Trott) [#45703](https://github.com/nodejs/node/pull/45703)
* \[[`eb9a383d2a`](https://github.com/nodejs/node/commit/eb9a383d2a)] - **meta**: 更新 nstepien 的 AUTHORS 信息 (Nicolas Stepien) [#45692](https://github.com/nodejs/node/pull/45692)
* \[[`049ef342c6`](https://github.com/nodejs/node/commit/049ef342c6)] - **meta**: 更新 AUTHORS (Node.js GitHub Bot) [#45637](https://github.com/nodejs/node/pull/45637)
* \[[`b9c2fc7623`](https://github.com/nodejs/node/commit/b9c2fc7623)] - **net**: 检查 `autoSelectFamilyAttemptTimeout` 是否为正数 (Deokjin Kim) [#45740](https://github.com/nodejs/node/pull/45740)
* \[[`b8b13dccd9`](https://github.com/nodejs/node/commit/b8b13dccd9)] - **(SEMVER-MINOR)** **net**: 添加 autoSelectFamily 和 autoSelectFamilyAttemptTimeout 选项 (Paolo Insogna) [#44731](https://github.com/nodejs/node/pull/44731)
* \[[`6962ef0df1`](https://github.com/nodejs/node/commit/6962ef0df1)] - **readline**: 提高对原型被篡改的健壮性 (Antoine du Hamel) [#45614](https://github.com/nodejs/node/pull/45614)
* \[[`7892e23e68`](https://github.com/nodejs/node/commit/7892e23e68)] - **repl**: 在没有标志的情况下不要在全局对象上定义 `wasi` (Kohei Ueno) [#45595](https://github.com/nodejs/node/pull/45595)
* \[[`349b4f8817`](https://github.com/nodejs/node/commit/349b4f8817)] - **src**: 新增内部 isArrayBufferDetached (Yagiz Nizipli) [#45568](https://github.com/nodejs/node/pull/45568)
* \[[`5d7cd363ab`](https://github.com/nodejs/node/commit/5d7cd363ab)] - **(SEMVER-MINOR)** **src**: 添加 uvwasi 版本 (Jithil P Ponnan) [#45639](https://github.com/nodejs/node/pull/45639)
* \[[`8a03684018`](https://github.com/nodejs/node/commit/8a03684018)] - **src**: 简化 NodeBIO::GetMethod 初始化 (Anna Henningsen) [#45799](https://github.com/nodejs/node/pull/45799)
* \[[`b35ebebc0e`](https://github.com/nodejs/node/commit/b35ebebc0e)] - **src**: 使 structuredClone 可用于 process.env (Ben Noordhuis) [#45698](https://github.com/nodejs/node/pull/45698)
* \[[`81ab54035f`](https://github.com/nodejs/node/commit/81ab54035f)] - **src**: 将生成的 `snapshot_data` 标记为 `const` (Anna Henningsen) [#45786](https://github.com/nodejs/node/pull/45786)
* \[[`79edf257bb`](https://github.com/nodejs/node/commit/79edf257bb)] - **src**: 清理对原生模块消歧的处理 (Michael Dawson) [#45665](https://github.com/nodejs/node/pull/45665)
* \[[`c9cba2e873`](https://github.com/nodejs/node/commit/c9cba2e873)] - **src**: 在 node\_i18n 中使用 `enum class` 替代 `enum` (Deokjin Kim) [#45646](https://github.com/nodejs/node/pull/45646)
* \[[`818028caba`](https://github.com/nodejs/node/commit/818028caba)] - **src**: 将内部模块声明重命名为 internal bindings (Chengzhong Wu) [#45551](https://github.com/nodejs/node/pull/45551)
* \[[`2fbe2f9f0a`](https://github.com/nodejs/node/commit/2fbe2f9f0a)] - **src,lib**: 将来自 `util` binding 的、作为常量使用的属性分组 (Daeyeon Jeong) [#45539](https://github.com/nodejs/node/pull/45539)
* \[[`56eee72abb`](https://github.com/nodejs/node/commit/56eee72abb)] - **stream**: 使用 structuredClone 代替 v8 (Yagiz Nizipli) [#45611](https://github.com/nodejs/node/pull/45611)
* \[[`b297dd5393`](https://github.com/nodejs/node/commit/b297dd5393)] - **test**: 移除不稳定的 parallel/test-process-wrap 测试 (Ben Noordhuis) [#45806](https://github.com/nodejs/node/pull/45806)
* \[[`924f6ab3a1`](https://github.com/nodejs/node/commit/924f6ab3a1)] - **test**: 在 `test-bootstrap-modules` 中按字母顺序排列列表 (Antoine du Hamel) [#45808](https://github.com/nodejs/node/pull/45808)
* \[[`5c4475dab9`](https://github.com/nodejs/node/commit/5c4475dab9)] - **test**: 修复测试名称中包含换行时无效的 TAP 输出 (Pulkit Gupta) [#45742](https://github.com/nodejs/node/pull/45742)
* \[[`4c51c5c97a`](https://github.com/nodejs/node/commit/4c51c5c97a)] - **test**: 修复 report-fatalerror 中的 `-Wunused-variable` 警告 (Santiago Gimeno) [#45747](https://github.com/nodejs/node/pull/45747)
* \[[`764725040c`](https://github.com/nodejs/node/commit/764725040c)] - **test**: 修复 test-watch-mode (Stefan Stojanovic) [#45585](https://github.com/nodejs/node/pull/45585)
* \[[`cd36250fcb`](https://github.com/nodejs/node/commit/cd36250fcb)] - **test**: 修复 test-watch-mode-inspect (Stefan Stojanovic) [#45586](https://github.com/nodejs/node/pull/45586)
* \[[`b55bd6e8c1`](https://github.com/nodejs/node/commit/b55bd6e8c1)] - **test**: 修复 test/parallel 中的拼写错误 (Deokjin Kim) [#45583](https://github.com/nodejs/node/pull/45583)
* \[[`358e2fe217`](https://github.com/nodejs/node/commit/358e2fe217)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#45569](https://github.com/nodejs/node/pull/45569)
* \[[`424419c2b4`](https://github.com/nodejs/node/commit/424419c2b4)] - **test_runner**: 重构 `tap_lexer` 以使用更多 primordials (Antoine du Hamel) [#45744](https://github.com/nodejs/node/pull/45744)
* \[[`ffc0f3d7be`](https://github.com/nodejs/node/commit/ffc0f3d7be)] - **test_runner**: 重构 `tap_parser` 以使用更多 primordials (Antoine du Hamel) [#45745](https://github.com/nodejs/node/pull/45745)
* \[[`4165dcddf0`](https://github.com/nodejs/node/commit/4165dcddf0)] - **(SEMVER-MINOR)** **test_runner**: 添加 t.after() 钩子 (Colin Ihrig) [#45792](https://github.com/nodejs/node/pull/45792)
* \[[`d1bd7796ad`](https://github.com/nodejs/node/commit/d1bd7796ad)] - **(SEMVER-MINOR)** **test_runner**: 不为 runHook() 使用符号 (Colin Ihrig) [#45792](https://github.com/nodejs/node/pull/45792)
* \[[`6bc7b7e6f4`](https://github.com/nodejs/node/commit/6bc7b7e6f4)] - **test_runner**: 为 MockFunctionContext 添加 resetCalls (MURAKAMI Masahiko) [#45710](https://github.com/nodejs/node/pull/45710)
* \[[`3e485365ec`](https://github.com/nodejs/node/commit/3e485365ec)] - **test_runner**: 不要从 stderr 解析 TAP (Colin Ihrig) [#45618](https://github.com/nodejs/node/pull/45618)
* \[[`efc44567c9`](https://github.com/nodejs/node/commit/efc44567c9)] - **test_runner**: 为 MockTracker 添加 getter 和 setter (MURAKAMI Masahiko) [#45506](https://github.com/nodejs/node/pull/45506)
* \[[`c9cbd1d396`](https://github.com/nodejs/node/commit/c9cbd1d396)] - **test_runner**: 从错误信息中移除 stdout 和 stderr (Colin Ihrig) [#45592](https://github.com/nodejs/node/pull/45592)
* \[[`691f58e76c`](https://github.com/nodejs/node/commit/691f58e76c)] - **tls**: 移除 trustcor 根 CA 证书 (Ben Noordhuis) [#45776](https://github.com/nodejs/node/pull/45776)
* \[[`d384b73f76`](https://github.com/nodejs/node/commit/d384b73f76)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#45730](https://github.com/nodejs/node/pull/45730)
* \[[`324ae3d5dd`](https://github.com/nodejs/node/commit/324ae3d5dd)] - **tools**: 添加 GitHub token 权限以标记 flaky-test 问题 (Gabriela Gutierrez) [#45308](https://github.com/nodejs/node/pull/45308)
* \[[`418ae9be56`](https://github.com/nodejs/node/commit/418ae9be56)] - **tools**: 移除依赖漏洞检查器 (Facundo Tuesca) [#45675](https://github.com/nodejs/node/pull/45675)
* \[[`238fc64c38`](https://github.com/nodejs/node/commit/238fc64c38)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@3.4.0 (Node.js GitHub Bot) [#45638](https://github.com/nodejs/node/pull/45638)
* \[[`1b98f17876`](https://github.com/nodejs/node/commit/1b98f17876)] - **tools**: 将文档更新到 highlight.js\@11.7.0 (Node.js GitHub Bot) [#45636](https://github.com/nodejs/node/pull/45636)
* \[[`470384e7be`](https://github.com/nodejs/node/commit/470384e7be)] - **util**: 直接在 JS 层使用私有符号 (Joyee Cheung) [#45379](https://github.com/nodejs/node/pull/45379)
* \[[`cee6f382d8`](https://github.com/nodejs/node/commit/cee6f382d8)] - **watch**: 添加用于保留输出的 CLI 标志 (Debadree Chatterjee) [#45717](https://github.com/nodejs/node/pull/45717)

<a id="19.2.0"></a>

## 2022-11-29，版本 19.2.0（当前），@ruyadorno

### 重要变更

#### 时区更新

时区数据已更新至 2022f。其中包括斐济和墨西哥的夏令时（DST）变更。更多信息请参见 <https://mm.icann.org/pipermail/tz-announce/2022-October/000075.html>。

#### 其他重要变更

* **buffer**
  * （SEMVER-MINOR）引入 `File` 类（Khafra） [#45139](https://github.com/nodejs/node/pull/45139)
* **deps**
  * 将 V8 更新到 10.8.168.20（Michaël Zasso） [#45230](https://github.com/nodejs/node/pull/45230)
* **doc**
  * 废弃在 `url.parse` 中使用无效端口（Antoine du Hamel） [#45576](https://github.com/nodejs/node/pull/45576)
* **util**
  * 为 utf8 编码添加快速路径（Yagiz Nizipli） [#45412](https://github.com/nodejs/node/pull/45412)

### 提交

* \[[`7cff1e14ba`](https://github.com/nodejs/node/commit/7cff1e14ba)] - **(SEMVER-MINOR)** **async\_hooks**：添加停止传播的钩子（Gerhard Stöbich） [#45386](https://github.com/nodejs/node/pull/45386)
* \[[`f08f6a64a3`](https://github.com/nodejs/node/commit/f08f6a64a3)] - **benchmark**：添加 v8 序列化基准测试（Yagiz Nizipli） [#45476](https://github.com/nodejs/node/pull/45476)
* \[[`26ad54c1a2`](https://github.com/nodejs/node/commit/26ad54c1a2)] - **benchmark**：添加 text-encoder 基准测试（Yagiz Nizipli） [#45450](https://github.com/nodejs/node/pull/45450)
* \[[`6c56c9722b`](https://github.com/nodejs/node/commit/6c56c9722b)] - **(SEMVER-MINOR)** **buffer**：引入 File（Khafra） [#45139](https://github.com/nodejs/node/pull/45139)
* \[[`6e1e25d6dd`](https://github.com/nodejs/node/commit/6e1e25d6dd)] - **build**：避免重新定义宏（Michaël Zasso） [#45544](https://github.com/nodejs/node/pull/45544)
* \[[`5c9b2a7c82`](https://github.com/nodejs/node/commit/5c9b2a7c82)] - **build**：修复 cpp20 的 env.h（Jiawen Geng） [#45516](https://github.com/nodejs/node/pull/45516)
* \[[`54fd8a1966`](https://github.com/nodejs/node/commit/54fd8a1966)] - **build**：将嵌入器字符串重置为 "-node.0"（Michaël Zasso） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`0f3cf7e5ce`](https://github.com/nodejs/node/commit/0f3cf7e5ce)] - _**回退**_ "**build**：移除主机构建的预编译头和调试信息"（Stefan Stojanovic） [#45432](https://github.com/nodejs/node/pull/45432)
* \[[`62ef1eb4ff`](https://github.com/nodejs/node/commit/62ef1eb4ff)] - **build**：添加 --v8-disable-object-print 标志（MURAKAMI Masahiko） [#45458](https://github.com/nodejs/node/pull/45458)
* \[[`1ce2f56cf6`](https://github.com/nodejs/node/commit/1ce2f56cf6)] - **build**：使 gyp 中的脚本使用正确的 python 运行（Jiawen Geng） [#45435](https://github.com/nodejs/node/pull/45435)
* \[[`9ffe3c051a`](https://github.com/nodejs/node/commit/9ffe3c051a)] - **build,deps,src**：修复 Intel VTune 分析支持（Shi Lei） [#45248](https://github.com/nodejs/node/pull/45248)
* \[[`bd3accc7b2`](https://github.com/nodejs/node/commit/bd3accc7b2)] - **crypto**：在调用 X509\_check\_private\_key() 后清空 OpenSSL 错误队列（Filip Skokan） [#45495](https://github.com/nodejs/node/pull/45495)
* \[[`724addb293`](https://github.com/nodejs/node/commit/724addb293)] - **crypto**：更新根证书（Luigi Pinca） [#45490](https://github.com/nodejs/node/pull/45490)
* \[[`efe19eb7f5`](https://github.com/nodejs/node/commit/efe19eb7f5)] - **crypto**：在调用 X509\_verify() 后清空 OpenSSL 错误队列（Takuro Sato） [#45377](https://github.com/nodejs/node/pull/45377)
* \[[`f63ae525fa`](https://github.com/nodejs/node/commit/f63ae525fa)] - **deps**：V8：cherry-pick 2ada52cffbff（Michaël Zasso） [#45573](https://github.com/nodejs/node/pull/45573)
* \[[`43e002e3d4`](https://github.com/nodejs/node/commit/43e002e3d4)] - **deps**：将 base64 更新到 0.5.0（Facundo Tuesca） [#45509](https://github.com/nodejs/node/pull/45509)
* \[[`aaa4ac7735`](https://github.com/nodejs/node/commit/aaa4ac7735)] - **deps**：V8：cherry-pick 9df5ef70ff18（Yagiz Nizipli） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`e70c3090ff`](https://github.com/nodejs/node/commit/e70c3090ff)] - **deps**：V8：cherry-pick f1c888e7093e（Michaël Zasso） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`51eb323c50`](https://github.com/nodejs/node/commit/51eb323c50)] - **deps**：V8：cherry-pick 92a7385171bb（Michaël Zasso） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`1370b1a769`](https://github.com/nodejs/node/commit/1370b1a769)] - **deps**：修复 Windows 上使用 MSVC 的 V8 构建（Michaël Zasso） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`3cd6367e6a`](https://github.com/nodejs/node/commit/3cd6367e6a)] - **deps**：屏蔽无关的 V8 警告（Michaël Zasso） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`9348bdd28d`](https://github.com/nodejs/node/commit/9348bdd28d)] - **deps**：V8：修复 MSVC 的 v8-cppgc.h（Jiawen Geng） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`e9292544b0`](https://github.com/nodejs/node/commit/e9292544b0)] - **deps**：修复 V8 构建中内联方法的问题（Jiawen Geng） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`a3b9967553`](https://github.com/nodejs/node/commit/a3b9967553)] - **deps**：将 V8 更新到 10.8.168.20（Michaël Zasso） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`117efe98b0`](https://github.com/nodejs/node/commit/117efe98b0)] - **deps**：V8：cherry-pick 9df5ef70ff18（Yagiz Nizipli） [#45474](https://github.com/nodejs/node/pull/45474)
* \[[`628891d4dd`](https://github.com/nodejs/node/commit/628891d4dd)] - **deps**：将时区更新到 2022f（Node.js GitHub Bot） [#45289](https://github.com/nodejs/node/pull/45289)
* \[[`45ba14b3be`](https://github.com/nodejs/node/commit/45ba14b3be)] - **deps**：修复不带 SIMD 特性的 CPU 上 zlib 的编译（Anna Henningsen） [#45387](https://github.com/nodejs/node/pull/45387)
* \[[`c41e67fe1d`](https://github.com/nodejs/node/commit/c41e67fe1d)] - **deps**：将 zlib 更新到上游 8bbd6c31（Luigi Pinca） [#45387](https://github.com/nodejs/node/pull/45387)
* \[[`413bf9ad39`](https://github.com/nodejs/node/commit/413bf9ad39)] - **deps**：将 V8 补丁更新到 10.7.193.22（Michaël Zasso） [#45460](https://github.com/nodejs/node/pull/45460)
* \[[`ad8da86b3f`](https://github.com/nodejs/node/commit/ad8da86b3f)] - **deps**：将 acorn 更新到 8.8.1（Node.js GitHub Bot） [#45441](https://github.com/nodejs/node/pull/45441)
* \[[`17e6031bf0`](https://github.com/nodejs/node/commit/17e6031bf0)] - **deps**：V8：cherry-pick 031b98b25cba（Michaël Zasso） [#45375](https://github.com/nodejs/node/pull/45375)
* \[[`9e0e97c121`](https://github.com/nodejs/node/commit/9e0e97c121)] - **diagnostics\_channel**：内置通道应保持实验性（Stephen Belanger） [#45423](https://github.com/nodejs/node/pull/45423)
* \[[`44886e55e1`](https://github.com/nodejs/node/commit/44886e55e1)] - **diagnostics\_channel**：标记为稳定（Stephen Belanger） [#45290](https://github.com/nodejs/node/pull/45290)
* \[[`b6b5b51687`](https://github.com/nodejs/node/commit/b6b5b51687)] - **doc**：废弃在 `url.parse` 中使用无效端口（Antoine du Hamel） [#45576](https://github.com/nodejs/node/pull/45576)
* \[[`d805d5a894`](https://github.com/nodejs/node/commit/d805d5a894)] - **doc**：澄清 readableFlowing 中的变更（Kohei Ueno） [#45554](https://github.com/nodejs/node/pull/45554)
* \[[`015842f3d2`](https://github.com/nodejs/node/commit/015842f3d2)] - **doc**：在 http2 的错误案例中使用 console.error（Deokjin Kim） [#45577](https://github.com/nodejs/node/pull/45577)
* \[[`4345732900`](https://github.com/nodejs/node/commit/4345732900)] - **doc**：添加关于 fsPromise.constants 的版本说明（chlorine） [#45556](https://github.com/nodejs/node/pull/45556)
* \[[`16643dbb19`](https://github.com/nodejs/node/commit/16643dbb19)] - **doc**：补充 paramEncoding 缺失的文档（Tobias Nießen） [#45523](https://github.com/nodejs/node/pull/45523)
* \[[`246cd358b5`](https://github.com/nodejs/node/commit/246cd358b5)] - **doc**：修复威胁模型中的拼写错误（Tobias Nießen） [#45558](https://github.com/nodejs/node/pull/45558)
* \[[`5b1df22db0`](https://github.com/nodejs/node/commit/5b1df22db0)] - **doc**：添加 Node.js 威胁模型（Rafael Gonzaga） [#45223](https://github.com/nodejs/node/pull/45223)
* \[[`19d8493c92`](https://github.com/nodejs/node/commit/19d8493c92)] - **doc**：运行 license-builder（github-actions\[bot]） [#45553](https://github.com/nodejs/node/pull/45553)
* \[[`6f0bc097ea`](https://github.com/nodejs/node/commit/6f0bc097ea)] - **doc**：添加 async\_hooks 迁移说明（Geoffrey Booth） [#45335](https://github.com/nodejs/node/pull/45335)
* \[[`118de4b44c`](https://github.com/nodejs/node/commit/118de4b44c)] - **doc**：修复 modules.md 中的 RESOLVE\_ESM\_MATCH（翠 / green） [#45280](https://github.com/nodejs/node/pull/45280)
* \[[`4de67d1ef4`](https://github.com/nodejs/node/commit/4de67d1ef4)] - **doc**：为 os.machine() 添加 arm64（Carter Snook） [#45374](https://github.com/nodejs/node/pull/45374)
* \[[`1812a89c00`](https://github.com/nodejs/node/commit/1812a89c00)] - **doc**：添加 lint 规则以强制使用尾随逗号（Antoine du Hamel） [#45471](https://github.com/nodejs/node/pull/45471)
* \[[`4128c27f66`](https://github.com/nodejs/node/commit/4128c27f66)] - **doc**：在 `CHANGELOG.md` 中包含 v19.1.0（Rafael Gonzaga） [#45462](https://github.com/nodejs/node/pull/45462)
* \[[`94a6a97ec6`](https://github.com/nodejs/node/commit/94a6a97ec6)] - **doc**：调整措辞以消除别扭的排版（Konv） [#45398](https://github.com/nodejs/node/pull/45398)
* \[[`a6fe707b62`](https://github.com/nodejs/node/commit/a6fe707b62)] - **doc**：修复 maintaining-dependencies.md 中的拼写错误（Tobias Nießen） [#45428](https://github.com/nodejs/node/pull/45428)
* \[[`8906a4e58e`](https://github.com/nodejs/node/commit/8906a4e58e)] - **esm**：为 loader 添加 JSDoc 属性说明（Rich Trott） [#45370](https://github.com/nodejs/node/pull/45370)
* \[[`4e5ad9df50`](https://github.com/nodejs/node/commit/4e5ad9df50)] - **esm**：为 fetch 添加 JSDoc 属性说明（Rich Trott） [#45370](https://github.com/nodejs/node/pull/45370)
* \[[`2b760c339e`](https://github.com/nodejs/node/commit/2b760c339e)] - **fs**：修复 fs.rm 对循环符号链接的支持（Nathanael Ruf） [#45439](https://github.com/nodejs/node/pull/45439)
* \[[`e0a271e41b`](https://github.com/nodejs/node/commit/e0a271e41b)] - **gyp**：修复 aix 上的 v8 canary 构建（Vasili Skurydzin） [#45496](https://github.com/nodejs/node/pull/45496)
* \[[`eac26c0793`](https://github.com/nodejs/node/commit/eac26c0793)] - _**回退**_ "**http**：将 headers(Distinct)、trailers(Distinct) 的 setter 设为无操作"（Rich Trott） [#45527](https://github.com/nodejs/node/pull/45527)
* \[[`f208db70a0`](https://github.com/nodejs/node/commit/f208db70a0)] - **http**：为 ERR\_UNESCAPED\_CHARACTERS 添加调试日志（Aidan Temple） [#45420](https://github.com/nodejs/node/pull/45420)
* \[[`b72b2bab72`](https://github.com/nodejs/node/commit/b72b2bab72)] - **http**：添加 JSDoc 属性说明（Rich Trott） [#45370](https://github.com/nodejs/node/pull/45370)
* \[[`4c9159a830`](https://github.com/nodejs/node/commit/4c9159a830)] - **lib**：改进可转移 abort controller 执行（Yagiz Nizipli） [#45525](https://github.com/nodejs/node/pull/45525)
* \[[`5745bcbb41`](https://github.com/nodejs/node/commit/5745bcbb41)] - **lib**：改进 AbortController 创建耗时（Yagiz Nizipli） [#45525](https://github.com/nodejs/node/pull/45525)
* \[[`38767b42fb`](https://github.com/nodejs/node/commit/38767b42fb)] - **lib**：如果全局属性不再可配置，则不抛出错误（Antoine du Hamel） [#45344](https://github.com/nodejs/node/pull/45344)
* \[[`0d1b1c5df0`](https://github.com/nodejs/node/commit/0d1b1c5df0)] - **meta**：更新 AUTHORS（Node.js GitHub Bot） [#45531](https://github.com/nodejs/node/pull/45531)
* \[[`208ea1a58c`](https://github.com/nodejs/node/commit/208ea1a58c)] - **meta**：更新 VoltrexMaster 的用户名（Mohammed Keyvanzadeh） [#45503](https://github.com/nodejs/node/pull/45503)
* \[[`d13ea68ef6`](https://github.com/nodejs/node/commit/d13ea68ef6)] - **meta**：更新 AUTHORS（Node.js GitHub Bot） [#45443](https://github.com/nodejs/node/pull/45443)
* \[[`6704e7814f`](https://github.com/nodejs/node/commit/6704e7814f)] - **meta**：更主动地将成员移出团队（Rich Trott） [#45352](https://github.com/nodejs/node/pull/45352)
* \[[`6fdd202c57`](https://github.com/nodejs/node/commit/6fdd202c57)] - **module**：在 node schema 下 require.resolve.paths 返回 null（MURAKAMI Masahiko） [#45147](https://github.com/nodejs/node/pull/45147)
* \[[`38f1ede379`](https://github.com/nodejs/node/commit/38f1ede379)] - **node-api**：处理 coverity 警告（Michael Dawson） [#45563](https://github.com/nodejs/node/pull/45563)
* \[[`4a4f2802ec`](https://github.com/nodejs/node/commit/4a4f2802ec)] - **node-api**：声明 napi\_cleanup\_hook 类型（Chengzhong Wu） [#45391](https://github.com/nodejs/node/pull/45391)
* \[[`8ff16fd8c0`](https://github.com/nodejs/node/commit/8ff16fd8c0)] - **node-api**：修复立即执行的 napi\_remove\_wrap 测试（Chengzhong Wu） [#45406](https://github.com/nodejs/node/pull/45406)
* \[[`e7a5b3347b`](https://github.com/nodejs/node/commit/e7a5b3347b)] - **src**：处理 node\_file.cc 中的 coverity 警告（Michael Dawson） [#45565](https://github.com/nodejs/node/pull/45565)
* \[[`128c9f6fac`](https://github.com/nodejs/node/commit/128c9f6fac)] - **src**：在 node\_http2 中使用限定的 `std::move` 调用（Michaël Zasso） [#45555](https://github.com/nodejs/node/pull/45555)
* \[[`57bca94cb1`](https://github.com/nodejs/node/commit/57bca94cb1)] - **src**：避免未使用的变量和函数（Michaël Zasso） [#45542](https://github.com/nodejs/node/pull/45542)
* \[[`649b31f5e5`](https://github.com/nodejs/node/commit/649b31f5e5)] - **src**：补充 `std::all_of` 所需的缺失包含（Michaël Zasso） [#45541](https://github.com/nodejs/node/pull/45541)
* \[[`56f22ea47c`](https://github.com/nodejs/node/commit/56f22ea47c)] - **src**：在给定 `--v8-pool-size=0` 时设置合适的线程池大小（Daeyeon Jeong） [#45513](https://github.com/nodejs/node/pull/45513)
* \[[`cce9e11d2d`](https://github.com/nodejs/node/commit/cce9e11d2d)] - **src**：将 FsStatsOffset 和 kFsStatsBufferLength 移到 node\_file.h（Joyee Cheung） [#45498](https://github.com/nodejs/node/pull/45498)
* \[[`5e5bf0c236`](https://github.com/nodejs/node/commit/5e5bf0c236)] - **src**：在 isolate 终止时不运行任务（Santiago Gimeno） [#45444](https://github.com/nodejs/node/pull/45444)
* \[[`10e7c2a62c`](https://github.com/nodejs/node/commit/10e7c2a62c)] - **src**：移除未使用的 PackageConfig 类（Joyee Cheung） [#45478](https://github.com/nodejs/node/pull/45478)
* \[[`459d4481d4`](https://github.com/nodejs/node/commit/459d4481d4)] - **src**：将 --max-semi-space-size 添加到 NODE\_OPTIONS 允许的选项中（Emanuel Hoogeveen） [#44436](https://github.com/nodejs/node/pull/44436)
* \[[`a483d1291e`](https://github.com/nodejs/node/commit/a483d1291e)] - **src**：压缩实验性警告消息（Rich Trott） [#45424](https://github.com/nodejs/node/pull/45424)
* \[[`42507e68ab`](https://github.com/nodejs/node/commit/42507e68ab)] - **src,node-api**：更新 `napi_is_detached_arraybuffer`（Daeyeon Jeong） [#45538](https://github.com/nodejs/node/pull/45538)
* \[[`f720c5880e`](https://github.com/nodejs/node/commit/f720c5880e)] - **stream**：使用 ArrayBufferPrototypeGetByteLength（Yagiz Nizipli） [#45528](https://github.com/nodejs/node/pull/45528)
* \[[`c00258e24b`](https://github.com/nodejs/node/commit/c00258e24b)] - **stream**：为适配器添加 primordials（Yagiz Nizipli） [#45511](https://github.com/nodejs/node/pull/45511)
* \[[`5274a8f7db`](https://github.com/nodejs/node/commit/5274a8f7db)] - **stream**：在不会发出 close 时避免过早关闭（Robert Nagy） [#45301](https://github.com/nodejs/node/pull/45301)
* \[[`496912d722`](https://github.com/nodejs/node/commit/496912d722)] - **stream**：修复 `adapters.js` 中的拼写错误（#45515）（Kohei Ueno） [#45515](https://github.com/nodejs/node/pull/45515)
* \[[`8d96e2c723`](https://github.com/nodejs/node/commit/8d96e2c723)] - **stream**：为 utf8 添加快速路径（Yagiz Nizipli） [#45483](https://github.com/nodejs/node/pull/45483)
* \[[`c3fe9072c6`](https://github.com/nodejs/node/commit/c3fe9072c6)] - **test**：在 event 测试中添加尾随逗号（Rich Trott） [#45466](https://github.com/nodejs/node/pull/45466)
* \[[`bb4c293873`](https://github.com/nodejs/node/commit/bb4c293873)] - **test**：在 async-hooks 测试中添加尾随逗号（#45549）（Antoine du Hamel） [#45549](https://github.com/nodejs/node/pull/45549)
* \[[`731e8741b2`](https://github.com/nodejs/node/commit/731e8741b2)] - **test**：在 addons 测试中添加尾随逗号（#45548）（Antoine du Hamel） [#45548](https://github.com/nodejs/node/pull/45548)
* \[[`d6c68ce346`](https://github.com/nodejs/node/commit/d6c68ce346)] - **test**：在 `test/common` 中添加尾随逗号（#45550）（Antoine du Hamel） [#45550](https://github.com/nodejs/node/pull/45550)
* \[[`c9ba0b738d`](https://github.com/nodejs/node/commit/c9ba0b738d)] - **test**：修订关于代码的拉取请求指南文本（Rich Trott） [#45519](https://github.com/nodejs/node/pull/45519)
* \[[`076e9eeaeb`](https://github.com/nodejs/node/commit/076e9eeaeb)] - **test**：修复 test-trace-gc-flag（Tony Gorez） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`72f2df2802`](https://github.com/nodejs/node/commit/72f2df2802)] - **test**：根据 V8 更新调整 test-v8-stats（Michaël Zasso） [#45230](https://github.com/nodejs/node/pull/45230)
* \[[`b491504d77`](https://github.com/nodejs/node/commit/b491504d77)] - **test**：为 `structuredClone` 启用 WPT（Daeyeon Jeong） [#45482](https://github.com/nodejs/node/pull/45482)
* \[[`1277ffcb55`](https://github.com/nodejs/node/commit/1277ffcb55)] - **test**：添加 lint 规则以强制使用尾随逗号（Antoine du Hamel） [#45468](https://github.com/nodejs/node/pull/45468)
* \[[`45b54eec55`](https://github.com/nodejs/node/commit/45b54eec55)] - **test**：更新 \_jabber.\_tcp.google.com 的使用（Colin Ihrig） [#45451](https://github.com/nodejs/node/pull/45451)
* \[[`51213c24bd`](https://github.com/nodejs/node/commit/51213c24bd)] - **test**：添加用于验证发布版本 changelog 的测试（Richard Lau） [#45325](https://github.com/nodejs/node/pull/45325)
* \[[`00a3b5f7d5`](https://github.com/nodejs/node/commit/00a3b5f7d5)] - **test**：移除 test-worker-http2-stream-terminate 的 flaky 标记（Rich Trott） [#45438](https://github.com/nodejs/node/pull/45438)
* \[[`4fe5c4e167`](https://github.com/nodejs/node/commit/4fe5c4e167)] - **test**：修复 flaky 的 test-repl-sigint-nested-eval（Rich Trott） [#45354](https://github.com/nodejs/node/pull/45354)
* \[[`f79dd65333`](https://github.com/nodejs/node/commit/f79dd65333)] - **test**：添加一个测试以确保时区升级的正确性（Darshan Sen） [#45299](https://github.com/nodejs/node/pull/45299)
* \[[`016749ba5d`](https://github.com/nodejs/node/commit/016749ba5d)] - **test\_runner**：添加初始 TAP 解析器（Wassim Chegham） [#43525](https://github.com/nodejs/node/pull/43525)
* \[[`e9760b4ae8`](https://github.com/nodejs/node/commit/e9760b4ae8)] - **test\_runner**：支持 watch 模式（Moshe Atlow） [#45214](https://github.com/nodejs/node/pull/45214)
* \[[`160c88ec77`](https://github.com/nodejs/node/commit/160c88ec77)] - **tools**：让 test-asan 使用 ubuntu-20.04（Filip Skokan） [#45581](https://github.com/nodejs/node/pull/45581)
* \[[`81f63c2b28`](https://github.com/nodejs/node/commit/81f63c2b28)] - **tools**：将 eslint 更新到 8.28.0（Node.js GitHub Bot） [#45532](https://github.com/nodejs/node/pull/45532)
* \[[`f3f1aed01a`](https://github.com/nodejs/node/commit/f3f1aed01a)] - **tools**：添加用于更新 libuv 依赖的自动化流程（Facundo Tuesca） [#45362](https://github.com/nodejs/node/pull/45362)
* \[[`d4f30f07b3`](https://github.com/nodejs/node/commit/d4f30f07b3)] - **tools**：在 update-base64.sh 脚本中添加缺失步骤（Facundo Tuesca） [#45509](https://github.com/nodejs/node/pull/45509)
* \[[`cca20330cf`](https://github.com/nodejs/node/commit/cca20330cf)] - **tools**：更新 certdata.txt（Luigi Pinca） [#45490](https://github.com/nodejs/node/pull/45490)
* \[[`39e873139b`](https://github.com/nodejs/node/commit/39e873139b)] - **tools**：将当前版本包含在已发布版本列表中（Antoine du Hamel） [#45463](https://github.com/nodejs/node/pull/45463)
* \[[`8a34ef4897`](https://github.com/nodejs/node/commit/8a34ef4897)] - **tools**：将 lint-md-dependencies 更新到 rollup\@3.3.0（Node.js GitHub Bot） [#45442](https://github.com/nodejs/node/pull/45442)
* \[[`bb36acff42`](https://github.com/nodejs/node/commit/bb36acff42)] - **tools**：对于开放不足 2 天的、未走 fast-track 的 PR 不运行 CQ（Moshe Atlow） [#45407](https://github.com/nodejs/node/pull/45407)
* \[[`93bc2ba509`](https://github.com/nodejs/node/commit/93bc2ba509)] - **tools**：简化 .eslintrc.js（Rich Trott） [#45397](https://github.com/nodejs/node/pull/45397)
* \[[`b7f8a44c64`](https://github.com/nodejs/node/commit/b7f8a44c64)] - **tools**：简化 ESLint 配置中的正则表达式（Rich Trott） [#45399](https://github.com/nodejs/node/pull/45399)
* \[[`36bf87fabf`](https://github.com/nodejs/node/commit/36bf87fabf)] - **tools**：启用 jsdoc/require-property-description 规则（Rich Trott） [#45370](https://github.com/nodejs/node/pull/45370)
* \[[`7c6281a7d2`](https://github.com/nodejs/node/commit/7c6281a7d2)] - **tools**：在 GitHub Actions macOS 上动态确定并行度（Rich Trott） [#45350](https://github.com/nodejs/node/pull/45350)
* \[[`f441b04c11`](https://github.com/nodejs/node/commit/f441b04c11)] - **trace\_events**：添加新分类（theanarkh） [#45266](https://github.com/nodejs/node/pull/45266)
* \[[`6bdd2c3884`](https://github.com/nodejs/node/commit/6bdd2c3884)] - _**回退**_ "**url**：改进端口验证"（Rich Trott） [#45517](https://github.com/nodejs/node/pull/45517)
* \[[`bbba42fcb2`](https://github.com/nodejs/node/commit/bbba42fcb2)] - **url**：移除对 kFormat 不必要的对象调用（Yagiz Nizipli） [#45492](https://github.com/nodejs/node/pull/45492)
* \[[`7c79ba7b27`](https://github.com/nodejs/node/commit/7c79ba7b27)] - **util**：为 utf8 编码添加快速路径（Yagiz Nizipli） [#45412](https://github.com/nodejs/node/pull/45412)
* \[[`f86f90f839`](https://github.com/nodejs/node/commit/f86f90f839)] - **util**：提升文本解码器性能（Yagiz Nizipli） [#45388](https://github.com/nodejs/node/pull/45388)
* \[[`3263ceb21a`](https://github.com/nodejs/node/commit/3263ceb21a)] - **watch**：监视缺失的依赖项（Moshe Atlow） [#45348](https://github.com/nodejs/node/pull/45348)

<a id="19.1.0"></a>

## 2022-11-14，版本 19.1.0（当前），@RafaelGSS

### 重要变更

#### 支持在 Node.js 测试运行器中进行函数 Mock

`node:test` 模块支持在测试过程中通过顶层 `mock` 对象进行 Mock。

```js
test('spies on an object method', (t) => {
  const number = {
    value: 5,
    add(a) {
      return this.value + a;
    },
  };
  t.mock.method(number, 'add');

  assert.strictEqual(number.add(3), 8);
  assert.strictEqual(number.add.mock.calls.length, 1);
});
```

由 Colin Ihrig 贡献，见 [#45326](https://github.com/nodejs/node/pull/45326)

#### Linux 上 fs.watch 的递归支持

`fs.watch` 支持使用 `recursive: true` 选项进行递归监视。

```js
const watcher = fs.watch(testDirectory, { recursive: true });
watcher.on('change', function(event, filename) {
});
```

由 Yagiz Nizipli 贡献，见 [#45098](https://github.com/nodejs/node/pull/45098)

#### 其他重要变更

* **deps**
  * 将 ICU 更新到 72.1（Michaël Zasso） [#45068](https://github.com/nodejs/node/pull/45068)
* **doc**
  * 将 lukekarrys 添加为协作者（Luke Karrys） [#45180](https://github.com/nodejs/node/pull/45180)
  * 将 anonrig 添加为协作者（Yagiz Nizipli） [#45002](https://github.com/nodejs/node/pull/45002)
* **lib**
  * 移除 fetch 的实验性警告（Matteo Collina） [#45287](https://github.com/nodejs/node/pull/45287)
* **util**
  * （SEMVER-MINOR）添加 MIME 工具（Bradley Farias） [#21128](https://github.com/nodejs/node/pull/21128)
  * 提升 textdecoder 解码性能（Yagiz Nizipli） [#45294](https://github.com/nodejs/node/pull/45294)

### 提交

* \[[`c9cf399ec7`](https://github.com/nodejs/node/commit/c9cf399ec7)] - **benchmark**：为 text-decoder 基准添加参数（Yagiz Nizipli） [#45363](https://github.com/nodejs/node/pull/45363)
* \[[`79f6bb061d`](https://github.com/nodejs/node/commit/79f6bb061d)] - **benchmark**：修复 text-decoder 基准（Yagiz Nizipli） [#45363](https://github.com/nodejs/node/pull/45363)
* \[[`a27c994ced`](https://github.com/nodejs/node/commit/a27c994ced)] - **benchmark**：添加 blob 基准（Yagiz Nizipli） [#44990](https://github.com/nodejs/node/pull/44990)
* \[[`c45b6aee78`](https://github.com/nodejs/node/commit/c45b6aee78)] - **bootstrap**：合并主线程和 worker 线程的初始化（Joyee Cheung） [#44869](https://github.com/nodejs/node/pull/44869)
* \[[`33691208df`](https://github.com/nodejs/node/commit/33691208df)] - **buffer**：修复 `Blob` 构造函数中 options 的验证（Antoine du Hamel） [#45156](https://github.com/nodejs/node/pull/45156)
* \[[`7b938df296`](https://github.com/nodejs/node/commit/7b938df296)] - **build**：支持 Python 3.11（Luigi Pinca） [#45191](https://github.com/nodejs/node/pull/45191)
* \[[`75e0a2d109`](https://github.com/nodejs/node/commit/75e0a2d109)] - **build**：为 node-core-utils 提供兼容处理（Jiawen Geng） [#45199](https://github.com/nodejs/node/pull/45199)
* \[[`f598edbdf4`](https://github.com/nodejs/node/commit/f598edbdf4)] - **build**：修复使用 ICU 72.1 时的 icu-small 构建（Steven R. Loomis） [#45195](https://github.com/nodejs/node/pull/45195)
* \[[`29b9f4f90c`](https://github.com/nodejs/node/commit/29b9f4f90c)] - **build**：移除未使用的语言文件（Ben Noordhuis） [#45138](https://github.com/nodejs/node/pull/45138)
* \[[`3a1ee940d1`](https://github.com/nodejs/node/commit/3a1ee940d1)] - **build**：在 auto-start-ci 工作流中添加 GitHub token（Richard Lau） [#45185](https://github.com/nodejs/node/pull/45185)
* \[[`17349a2f42`](https://github.com/nodejs/node/commit/17349a2f42)] - **build**：恢复 Windows 资源文件（Richard Lau） [#45042](https://github.com/nodejs/node/pull/45042)
* \[[`24e24bd063`](https://github.com/nodejs/node/commit/24e24bd063)] - **build**：为时区更新 PR 添加版本信息（Darshan Sen） [#45021](https://github.com/nodejs/node/pull/45021)
* \[[`8d7aa53e6b`](https://github.com/nodejs/node/commit/8d7aa53e6b)] - **build,win**：向 configure 传递 `--debug-nghttp2`（Santiago Gimeno） [#45209](https://github.com/nodejs/node/pull/45209)
* \[[`b2e60480f3`](https://github.com/nodejs/node/commit/b2e60480f3)] - **child\_process**：验证参数中是否包含空字节（Darshan Sen） [#44782](https://github.com/nodejs/node/pull/44782)
* \[[`1f0edde412`](https://github.com/nodejs/node/commit/1f0edde412)] - **crypto**：使用 OperationError 处理更多 webcrypto 错误（Filip Skokan） [#45320](https://github.com/nodejs/node/pull/45320)
* \[[`13fb05e12b`](https://github.com/nodejs/node/commit/13fb05e12b)] - **crypto**：在 webcrypto 中处理不受支持的 AES 密码套件（Filip Skokan） [#45321](https://github.com/nodejs/node/pull/45321)
* \[[`c168cbfbb3`](https://github.com/nodejs/node/commit/c168cbfbb3)] - **deps**：V8：cherry-pick 56816d76c121（Shi Pujin） [#45353](https://github.com/nodejs/node/pull/45353)
* \[[`1432474abf`](https://github.com/nodejs/node/commit/1432474abf)] - **deps**：将 npm 升级到 8.19.3（npm team） [#45322](https://github.com/nodejs/node/pull/45322)
* \[[`f35d56200d`](https://github.com/nodejs/node/commit/f35d56200d)] - **deps**：将 corepack 更新到 0.15.1（Node.js GitHub Bot） [#45331](https://github.com/nodejs/node/pull/45331)
* \[[`44de2321aa`](https://github.com/nodejs/node/commit/44de2321aa)] - **deps**：将 V8 补丁更新到 10.7.193.20（Michaël Zasso） [#45228](https://github.com/nodejs/node/pull/45228)
* \[[`bfe3819f08`](https://github.com/nodejs/node/commit/bfe3819f08)] - **deps**：升级到 libuv 1.44.2（Luigi Pinca） [#42340](https://github.com/nodejs/node/pull/42340)
* \[[`0d41df96b3`](https://github.com/nodejs/node/commit/0d41df96b3)] - **deps**：将 corepack 更新到 0.15.0（Node.js GitHub Bot） [#45235](https://github.com/nodejs/node/pull/45235)
* \[[`0d241638ca`](https://github.com/nodejs/node/commit/0d241638ca)] - **deps**：将 undici 更新到 5.12.0（Node.js GitHub Bot） [#45236](https://github.com/nodejs/node/pull/45236)
* \[[`f58996188a`](https://github.com/nodejs/node/commit/f58996188a)] - _**Revert**_ "**deps**：使 V8 能在较旧的 glibc 上编译"（Michaël Zasso） [#45162](https://github.com/nodejs/node/pull/45162)
* \[[`8cda730e58`](https://github.com/nodejs/node/commit/8cda730e58)] - **deps**：将 ICU 更新到 72.1（Michaël Zasso） [#45068](https://github.com/nodejs/node/pull/45068)
* \[[`0a6ed6f710`](https://github.com/nodejs/node/commit/0a6ed6f710)] - _**Revert**_ "**deps**：V8：为 `Rtl*FunctionTable` 添加前向声明"（Michaël Zasso） [#45119](https://github.com/nodejs/node/pull/45119)
* \[[`2f7518ada2`](https://github.com/nodejs/node/commit/2f7518ada2)] - **deps**：更新时区数据（Node.js GitHub Bot） [#44950](https://github.com/nodejs/node/pull/44950)
* \[[`3bfba6df79`](https://github.com/nodejs/node/commit/3bfba6df79)] - **deps**：将 V8 补丁更新到 10.7.193.16（Michaël Zasso） [#45023](https://github.com/nodejs/node/pull/45023)
* \[[`b5baaa61b3`](https://github.com/nodejs/node/commit/b5baaa61b3)] - **dns**：修复端口验证（Antoine du Hamel） [#45135](https://github.com/nodejs/node/pull/45135)
* \[[`0e9bad97cc`](https://github.com/nodejs/node/commit/0e9bad97cc)] - **doc**：在分诊响应中允许考虑节假日（Michael Dawson） [#45267](https://github.com/nodejs/node/pull/45267)
* \[[`d4aabb9d3d`](https://github.com/nodejs/node/commit/d4aabb9d3d)] - **doc**：包含上一次安全发布日期（Juan José Arboleda） [#45368](https://github.com/nodejs/node/pull/45368)
* \[[`ba45373164`](https://github.com/nodejs/node/commit/ba45373164)] - **doc**：修正 Ashley 的邮箱（Michael Dawson） [#45364](https://github.com/nodejs/node/pull/45364)
* \[[`d5e5c75b13`](https://github.com/nodejs/node/commit/d5e5c75b13)] - **doc**：修复 test runner 的 only tests 小节标题（Colin Ihrig） [#45343](https://github.com/nodejs/node/pull/45343)
* \[[`a7c5f31c47`](https://github.com/nodejs/node/commit/a7c5f31c47)] - **doc**：运行 license-builder（github-actions\[bot]） [#45349](https://github.com/nodejs/node/pull/45349)
* \[[`3de125743e`](https://github.com/nodejs/node/commit/3de125743e)] - **doc**：为 timer.setInterval 添加更多信息（theanarkh） [#45232](https://github.com/nodejs/node/pull/45232)
* \[[`5a1252d9b4`](https://github.com/nodejs/node/commit/5a1252d9b4)] - **doc**：在稳定性概览表中使用模块名称（Filip Skokan） [#45312](https://github.com/nodejs/node/pull/45312)
* \[[`4d38bf2c5f`](https://github.com/nodejs/node/commit/4d38bf2c5f)] - **doc**：为示例添加 `node:` 前缀（Daeyeon Jeong） [#45328](https://github.com/nodejs/node/pull/45328)
* \[[`b4b6b95f48`](https://github.com/nodejs/node/commit/b4b6b95f48)] - **doc**：更新 Node.js core Slack 频道名称（Rich Trott） [#45293](https://github.com/nodejs/node/pull/45293)
* \[[`7d7e7c316b`](https://github.com/nodejs/node/commit/7d7e7c316b)] - **doc**：修复 “task\_processor.js” 的拼写错误（andreysoktoev） [#45257](https://github.com/nodejs/node/pull/45257)
* \[[`b9039a54af`](https://github.com/nodejs/node/commit/b9039a54af)] - **doc**：为与 `fetch` 相关的全局对象添加历史章节（Antoine du Hamel） [#45198](https://github.com/nodejs/node/pull/45198)
* \[[`d9163f1632`](https://github.com/nodejs/node/commit/d9163f1632)] - **doc**：澄清 `onboarding.md` 中的协作规范（Benjamin Gruenbaum） [#41930](https://github.com/nodejs/node/pull/41930)
* \[[`c179c1478b`](https://github.com/nodejs/node/commit/c179c1478b)] - **doc**：将 make lint 改为 make lint-md（RafaelGSS） [#45197](https://github.com/nodejs/node/pull/45197)
* \[[`58bec56fab`](https://github.com/nodejs/node/commit/58bec56fab)] - **doc**：为发布指南添加更多 LTS 更新步骤（Ruy Adorno） [#45177](https://github.com/nodejs/node/pull/45177)
* \[[`8f8d7e76ac`](https://github.com/nodejs/node/commit/8f8d7e76ac)] - **doc**：将 bmuenzenmeyer 添加为 triager（Brian Muenzenmeyer） [#45155](https://github.com/nodejs/node/pull/45155)
* \[[`de2df550f6`](https://github.com/nodejs/node/commit/de2df550f6)] - **doc**：更新 process.release（Filip Skokan） [#45170](https://github.com/nodejs/node/pull/45170)
* \[[`916e8760ba`](https://github.com/nodejs/node/commit/916e8760ba)] - **doc**：添加 triage 指南链接（Brian Muenzenmeyer） [#45154](https://github.com/nodejs/node/pull/45154)
* \[[`54d806853e`](https://github.com/nodejs/node/commit/54d806853e)] - **doc**：将 Node.js 12 标记为生命周期结束（Rafael Gonzaga） [#45186](https://github.com/nodejs/node/pull/45186)
* \[[`3a26347649`](https://github.com/nodejs/node/commit/3a26347649)] - **doc**：将 lukekarrys 添加为协作者（Luke Karrys） [#45180](https://github.com/nodejs/node/pull/45180)
* \[[`85cb4d795c`](https://github.com/nodejs/node/commit/85cb4d795c)] - **doc**：更新发布指南中将发布线标记为 LTS 的说明（Ruy Adorno） [#45101](https://github.com/nodejs/node/pull/45101)
* \[[`c23e023a2d`](https://github.com/nodejs/node/commit/c23e023a2d)] - **doc**：表述更明确并改为现在时（Ben Noordhuis） [#45120](https://github.com/nodejs/node/pull/45120)
* \[[`519002152b`](https://github.com/nodejs/node/commit/519002152b)] - **doc**：在发布指南中添加主版本说明（Ruy Adorno） [#45054](https://github.com/nodejs/node/pull/45054)
* \[[`809e8dcbd2`](https://github.com/nodejs/node/commit/809e8dcbd2)] - **doc**：修复维护 openssl 指南的 v14.x 链接（RafaelGSS） [#45071](https://github.com/nodejs/node/pull/45071)
* \[[`9d449d389d`](https://github.com/nodejs/node/commit/9d449d389d)] - **doc**：添加关于最新 GitHub release 的说明（Michaël Zasso） [#45111](https://github.com/nodejs/node/pull/45111)
* \[[`ee34a3a1bc`](https://github.com/nodejs/node/commit/ee34a3a1bc)] - **doc**：提及 v18.x openssl 维护指南（Rafael Gonzaga） [#45070](https://github.com/nodejs/node/pull/45070)
* \[[`3e4033a90d`](https://github.com/nodejs/node/commit/3e4033a90d)] - **doc**：修复“problematic” ASCII 字符的显示（John Gardner） [#44373](https://github.com/nodejs/node/pull/44373)
* \[[`533e38b0b8`](https://github.com/nodejs/node/commit/533e38b0b8)] - **doc**：将 Node.js v17.x 标记为 EOL（KaKa） [#45110](https://github.com/nodejs/node/pull/45110)
* \[[`93a34faa39`](https://github.com/nodejs/node/commit/93a34faa39)] - **doc**：更新 Node.js 16 的生命周期结束日期（Richard Lau） [#45103](https://github.com/nodejs/node/pull/45103)
* \[[`b4beddef79`](https://github.com/nodejs/node/commit/b4beddef79)] - **doc**：修复 parseArgs 默认值中的拼写错误（Tobias Nießen） [#45083](https://github.com/nodejs/node/pull/45083)
* \[[`e8103fd33b`](https://github.com/nodejs/node/commit/e8103fd33b)] - **doc**：更新安全 steward（Michael Dawson） [#45005](https://github.com/nodejs/node/pull/45005)
* \[[`5fbccae4f0`](https://github.com/nodejs/node/commit/5fbccae4f0)] - **doc**：修复 http 和 http2 的 writeEarlyHints() 参数（Fabian Meyer） [#45000](https://github.com/nodejs/node/pull/45000)
* \[[`d47f83251a`](https://github.com/nodejs/node/commit/d47f83251a)] - **doc**：运行 license-builder（github-actions\[bot]） [#45034](https://github.com/nodejs/node/pull/45034)
* \[[`e6bbc5033d`](https://github.com/nodejs/node/commit/e6bbc5033d)] - **doc**：改进测试 release 二进制文件的工作流（Rafael Gonzaga） [#45004](https://github.com/nodejs/node/pull/45004)
* \[[`f0c18f04f0`](https://github.com/nodejs/node/commit/f0c18f04f0)] - **doc**：修复 changelog 中的 undici 版本（Michael Dawson） [#44982](https://github.com/nodejs/node/pull/44982)
* \[[`ffba3218ec`](https://github.com/nodejs/node/commit/ffba3218ec)] - **doc**：为安全发布流程添加修复说明（Michael Dawson） [#44807](https://github.com/nodejs/node/pull/44807)
* \[[`edb92f4510`](https://github.com/nodejs/node/commit/edb92f4510)] - **doc**：将 anonrig 添加为协作者（Yagiz Nizipli） [#45002](https://github.com/nodejs/node/pull/45002)
* \[[`58334a38e8`](https://github.com/nodejs/node/commit/58334a38e8)] - **doc, async\_hooks**：改进并添加迁移提示（Gerhard Stöbich） [#45369](https://github.com/nodejs/node/pull/45369)
* \[[`7225a7d46b`](https://github.com/nodejs/node/commit/7225a7d46b)] - **doc, http**：添加 Uint8Array 作为允许的类型（Gerhard Stöbich） [#45167](https://github.com/nodejs/node/pull/45167)
* \[[`40a5e22328`](https://github.com/nodejs/node/commit/40a5e22328)] - **esm**：保护 ESM loader 免受原型污染（Antoine du Hamel） [#45175](https://github.com/nodejs/node/pull/45175)
* \[[`2e5d8e7239`](https://github.com/nodejs/node/commit/2e5d8e7239)] - **esm**：保护 ESM loader 免受原型污染（Antoine du Hamel） [#45044](https://github.com/nodejs/node/pull/45044)
* \[[`c3dd696081`](https://github.com/nodejs/node/commit/c3dd696081)] - **events**：添加 unique events 基准（Yagiz Nizipli） [#44657](https://github.com/nodejs/node/pull/44657)
* \[[`daff3b8b09`](https://github.com/nodejs/node/commit/daff3b8b09)] - **fs**：更新 todo 消息（Yagiz Nizipli） [#45265](https://github.com/nodejs/node/pull/45265)
* \[[`670def3d6f`](https://github.com/nodejs/node/commit/670def3d6f)] - **fs**：修复 cpSync 中的 opts.filter 问题（Tho） [#45143](https://github.com/nodejs/node/pull/45143)
* \[[`34bfef91a9`](https://github.com/nodejs/node/commit/34bfef91a9)] - **(SEMVER-MINOR)** **fs**：为 Linux 添加递归监视（Yagiz Nizipli） [#45098](https://github.com/nodejs/node/pull/45098)
* \[[`d89ca1b443`](https://github.com/nodejs/node/commit/d89ca1b443)] - **fs**：追踪更多 fs API（theanarkh） [#45095](https://github.com/nodejs/node/pull/45095)
* \[[`1a04881494`](https://github.com/nodejs/node/commit/1a04881494)] - **http**：将 headers(Distinct)、trailers(Distinct) 的 setter 设为无操作（Madhuri） [#45176](https://github.com/nodejs/node/pull/45176)
* \[[`8abc3f732a`](https://github.com/nodejs/node/commit/8abc3f732a)] - **http**：为常见 HTTP 头添加 priority（James M Snell） [#45045](https://github.com/nodejs/node/pull/45045)
* \[[`316354e3d3`](https://github.com/nodejs/node/commit/316354e3d3)] - **http2**：改进 session 关闭/销毁流程（Santiago Gimeno） [#45115](https://github.com/nodejs/node/pull/45115)
* \[[`1635140952`](https://github.com/nodejs/node/commit/1635140952)] - **http2**：修复 Http2Stream::diagnostic\_name() 崩溃（Santiago Gimeno） [#45123](https://github.com/nodejs/node/pull/45123)
* \[[`94b7f5338c`](https://github.com/nodejs/node/commit/94b7f5338c)] - **http2**：修复 debugStream 方法（Santiago Gimeno） [#45129](https://github.com/nodejs/node/pull/45129)
* \[[`3db37e7d1b`](https://github.com/nodejs/node/commit/3db37e7d1b)] - **inspector**：重构 `inspector/promises` 以提高健壮性（Antoine du Hamel） [#45041](https://github.com/nodejs/node/pull/45041)
* \[[`0478e4063f`](https://github.com/nodejs/node/commit/0478e4063f)] - **lib**：为 heap snapshot API 添加选项（Joyee Cheung） [#44989](https://github.com/nodejs/node/pull/44989)
* \[[`a8e901555a`](https://github.com/nodejs/node/commit/a8e901555a)] - **lib**：修复 JSDoc 问题（Rich Trott） [#45243](https://github.com/nodejs/node/pull/45243)
* \[[`74352842bc`](https://github.com/nodejs/node/commit/74352842bc)] - **lib**：使用 process.nextTick() 代替 setImmediate()（Luigi Pinca） [#42340](https://github.com/nodejs/node/pull/42340)
* \[[`9f3d2f6879`](https://github.com/nodejs/node/commit/9f3d2f6879)] - **lib**：移除 fetch 实验性警告（Matteo Collina） [#45287](https://github.com/nodejs/node/pull/45287)
* \[[`e2181e057b`](https://github.com/nodejs/node/commit/e2181e057b)] - **lib**：修复 eslint 的提前返回（RafaelGSS） [#45409](https://github.com/nodejs/node/pull/45409)
* \[[`d1726692ee`](https://github.com/nodejs/node/commit/d1726692ee)] - **lib**：修复转换分离的 buffer 源时的 TypeError（Kohei Ueno） [#44020](https://github.com/nodejs/node/pull/44020)
* \[[`d7470ad986`](https://github.com/nodejs/node/commit/d7470ad986)] - **lib**：修复 `AbortSignal.timeout` 参数验证（dnalborczyk） [#42856](https://github.com/nodejs/node/pull/42856)
* \[[`c7b7f2bec2`](https://github.com/nodejs/node/commit/c7b7f2bec2)] - **lib**：添加 lint 规则以防止 `Object.prototype.then` 污染（Antoine du Hamel） [#45061](https://github.com/nodejs/node/pull/45061)
* \[[`9ed9aa8233`](https://github.com/nodejs/node/commit/9ed9aa8233)] - **lib**：为 defineEventHandler 增加添加独立事件名的能力（James M Snell） [#45032](https://github.com/nodejs/node/pull/45032)
* \[[`8b4a41e23d`](https://github.com/nodejs/node/commit/8b4a41e23d)] - **lib**：修复 `pre_execution.js` 中的拼写错误（Antoine du Hamel） [#45039](https://github.com/nodejs/node/pull/45039)
* \[[`cc2393c9fe`](https://github.com/nodejs/node/commit/cc2393c9fe)] - **lib**：清理 streams.finished 调用的 promise 版本（Naor Tedgi (Abu Emma)） [#44862](https://github.com/nodejs/node/pull/44862)
* \[[`17ef1bbc8e`](https://github.com/nodejs/node/commit/17ef1bbc8e)] - **lib**：使 Blob 和 URL 上的属性可枚举（Khafra） [#44918](https://github.com/nodejs/node/pull/44918)
* \[[`8199841e9c`](https://github.com/nodejs/node/commit/8199841e9c)] - **lib**：为 early hint link 支持更多属性（Yagiz Nizipli） [#44874](https://github.com/nodejs/node/pull/44874)
* \[[`88c3bb609b`](https://github.com/nodejs/node/commit/88c3bb609b)] - **meta**：更新 AUTHORS（Node.js GitHub Bot） [#45333](https://github.com/nodejs/node/pull/45333)
* \[[`a866e8c163`](https://github.com/nodejs/node/commit/a866e8c163)] - **meta**：更新 README 中协作者的邮箱地址（Rich Trott） [#45251](https://github.com/nodejs/node/pull/45251)
* \[[`bfbfacad79`](https://github.com/nodejs/node/commit/bfbfacad79)] - **meta**：修复 README 中的邮箱地址拼写错误（Rich Trott） [#45250](https://github.com/nodejs/node/pull/45250)
* \[[`0d58bb9531`](https://github.com/nodejs/node/commit/0d58bb9531)] - **meta**：移除 dont-land-on-v12 的自动标记（Moshe Atlow） [#45233](https://github.com/nodejs/node/pull/45233)
* \[[`b41b5ba658`](https://github.com/nodejs/node/commit/b41b5ba658)] - **meta**：更新 AUTHORS（Node.js GitHub Bot） [#45238](https://github.com/nodejs/node/pull/45238)
* \[[`ad9a5bb61f`](https://github.com/nodejs/node/commit/ad9a5bb61f)] - **meta**：将一位协作者移至 emeritus（Rich Trott） [#45160](https://github.com/nodejs/node/pull/45160)
* \[[`ec8683052b`](https://github.com/nodejs/node/commit/ec8683052b)] - **meta**：将一位或多位协作者移至 emeritus（Node.js GitHub Bot） [#45036](https://github.com/nodejs/node/pull/45036)
* \[[`7900810fb3`](https://github.com/nodejs/node/commit/7900810fb3)] - **meta**：更新 AUTHORS（Node.js GitHub Bot） [#45020](https://github.com/nodejs/node/pull/45020)
* \[[`738144c311`](https://github.com/nodejs/node/commit/738144c311)] - **module**：确保从已删除目录中仍可进行相对 require（Bradley Farias） [#42384](https://github.com/nodejs/node/pull/42384)
* \[[`36acf8a13e`](https://github.com/nodejs/node/commit/36acf8a13e)] - **net**：从调试语句中移除 \_readableState（Rich Trott） [#45063](https://github.com/nodejs/node/pull/45063)
* \[[`aaca54c5c0`](https://github.com/nodejs/node/commit/aaca54c5c0)] - **node-api**：处理不支持外部 buffer 的情况（Michael Dawson） [#45181](https://github.com/nodejs/node/pull/45181)
* \[[`2105f099ea`](https://github.com/nodejs/node/commit/2105f099ea)] - **node-api,test**：修复 test\_reference\_double\_free 崩溃（Vladimir Morozov） [#44927](https://github.com/nodejs/node/pull/44927)
* \[[`2fcf851a91`](https://github.com/nodejs/node/commit/2fcf851a91)] - **os**：将 uid 和 gid 转为 32 位有符号整数（Luigi Pinca） [#42340](https://github.com/nodejs/node/pull/42340)
* \[[`dfe4237d77`](https://github.com/nodejs/node/commit/dfe4237d77)] - **perf\_hooks**：使 toStringTag 与其他 Web Performance 实现保持一致（Daeyeon Jeong） [#45157](https://github.com/nodejs/node/pull/45157)
* \[[`9d15da3341`](https://github.com/nodejs/node/commit/9d15da3341)] - **report**：添加更多内存信息（theanarkh） [#45254](https://github.com/nodejs/node/pull/45254)
* \[[`a2620acad7`](https://github.com/nodejs/node/commit/a2620acad7)] - **report**：添加 rss 和 user/kernel CPU 使用字段（theanarkh） [#45043](https://github.com/nodejs/node/pull/45043)
* \[[`66e1dc4979`](https://github.com/nodejs/node/commit/66e1dc4979)] - **report,doc**：定义 report 版本语义（Gireesh Punathil） [#45050](https://github.com/nodejs/node/pull/45050)
* \[[`86e22b4e19`](https://github.com/nodejs/node/commit/86e22b4e19)] - **src**：在 Environment 中跟踪上下文，而不是 AsyncHooks（Joyee Cheung） [#45282](https://github.com/nodejs/node/pull/45282)
* \[[`326d19af3d`](https://github.com/nodejs/node/commit/326d19af3d)] - **src**：解决与 inspector CVE 相关的 TODO（Tobias Nießen） [#45341](https://github.com/nodejs/node/pull/45341)
* \[[`4e45585ca2`](https://github.com/nodejs/node/commit/4e45585ca2)] - **src**：将 is\_release 恢复为 0（RafaelGSS） [#45315](https://github.com/nodejs/node/pull/45315)
* \[[`5d480118fb`](https://github.com/nodejs/node/commit/5d480118fb)] - **src**：在使用 `--debug-nghttp2` 时打印 nghttp2 日志（Santiago Gimeno） [#45209](https://github.com/nodejs/node/pull/45209)
* \[[`3e46ebda3c`](https://github.com/nodejs/node/commit/3e46ebda3c)] - **src**：追踪 threadpool 事件（theanarkh） [#44458](https://github.com/nodejs/node/pull/44458)
* \[[`97547bcd14`](https://github.com/nodejs/node/commit/97547bcd14)] - **src**：无锁化 init\_process\_flags（Jérémy Lal） [#45221](https://github.com/nodejs/node/pull/45221)
* \[[`42db84913b`](https://github.com/nodejs/node/commit/42db84913b)] - **src**：在 DisposePlatform 之前调用 uv\_library\_shutdown（theanarkh） [#45226](https://github.com/nodejs/node/pull/45226)
* \[[`aa4152a1b6`](https://github.com/nodejs/node/commit/aa4152a1b6)] - **src**：修复 `crypto.privateEncrypt` 首次调用失败的问题（liuxingbaoyu） [#42793](https://github.com/nodejs/node/pull/42793)
* \[[`243c141b69`](https://github.com/nodejs/node/commit/243c141b69)] - **src**：澄清 OptionEnvvarSettings 成员名称（Chengzhong Wu） [#45057](https://github.com/nodejs/node/pull/45057)
* \[[`5335e29ce7`](https://github.com/nodejs/node/commit/5335e29ce7)] - **src**：让 http2 流在 session 关闭后结束（Santiago Gimeno） [#45153](https://github.com/nodejs/node/pull/45153)
* \[[`8d5682266e`](https://github.com/nodejs/node/commit/8d5682266e)] - **src**：使用 `dup2` 重新映射无效文件描述符（Obiwac） [#44461](https://github.com/nodejs/node/pull/44461)
* \[[`4e14ed8878`](https://github.com/nodejs/node/commit/4e14ed8878)] - **src**：移除未使用的 `contextify_global_private_symbol`（Daeyeon Jeong） [#45128](https://github.com/nodejs/node/pull/45128)
* \[[`a8412f5677`](https://github.com/nodejs/node/commit/a8412f5677)] - **src**：禁止在 REPL 中运行 watch 模式（Moshe Atlow） [#45058](https://github.com/nodejs/node/pull/45058)
* \[[`162bf0ddff`](https://github.com/nodejs/node/commit/162bf0ddff)] - **src**：修复 test runner 覆盖率（Moshe Atlow） [#45055](https://github.com/nodejs/node/pull/45055)
* \[[`e5b1179630`](https://github.com/nodejs/node/commit/e5b1179630)] - **src**：优化 ALPN 回调（Ben Noordhuis） [#44875](https://github.com/nodejs/node/pull/44875)
* \[[`9dc21a1f86`](https://github.com/nodejs/node/commit/9dc21a1f86)] - **src**：简化 ALPN 代码，移除间接层（Ben Noordhuis） [#44875](https://github.com/nodejs/node/pull/44875)
* \[[`5fce8e3495`](https://github.com/nodejs/node/commit/5fce8e3495)] - **src**：在 cleanup\_queue.cc 中应用 iwyu（Shelley Vohr） [#44983](https://github.com/nodejs/node/pull/44983)
* \[[`824dcfc422`](https://github.com/nodejs/node/commit/824dcfc422)] - **src**：让 InitializeInspector() 返回 void（Joyee Cheung） [#44903](https://github.com/nodejs/node/pull/44903)
* \[[`7a31ae8ab1`](https://github.com/nodejs/node/commit/7a31ae8ab1)] - **src,lib**：从 v8 中获取已解析的 source map URL（Chengzhong Wu） [#44798](https://github.com/nodejs/node/pull/44798)
* \[[`ccb1c1e9a2`](https://github.com/nodejs/node/commit/ccb1c1e9a2)] - **stream**：添加 compose 运算符（Raz Luvaton） [#44937](https://github.com/nodejs/node/pull/44937)
* \[[`e60d9053bc`](https://github.com/nodejs/node/commit/e60d9053bc)] - **stream**：修复 duplexify 过早销毁（Robert Nagy） [#45133](https://github.com/nodejs/node/pull/45133)
* \[[`bc0ae3e74e`](https://github.com/nodejs/node/commit/bc0ae3e74e)] - **stream**：修复 Web streams 没有 Symbol.toStringTag（Jithil P Ponnan） [#45117](https://github.com/nodejs/node/pull/45117)
* \[[`1655532fd2`](https://github.com/nodejs/node/commit/1655532fd2)] - **stream**：不要从已关闭的 promise 中 push null #42694（David Halls） [#45026](https://github.com/nodejs/node/pull/45026)
* \[[`717db1d46a`](https://github.com/nodejs/node/commit/717db1d46a)] - **test**：如果磁盘空间不足则跳过 test-fs-largefile（Rich Trott） [#45339](https://github.com/nodejs/node/pull/45339)
* \[[`4a80aff16e`](https://github.com/nodejs/node/commit/4a80aff16e)] - **test**：修复捕获断言失败的问题（Pavel Horal） [#45222](https://github.com/nodejs/node/pull/45222)
* \[[`66e7821506`](https://github.com/nodejs/node/commit/66e7821506)] - **test**：延迟 invocation 检查（Luigi Pinca） [#42340](https://github.com/nodejs/node/pull/42340)
* \[[`43db0fbd49`](https://github.com/nodejs/node/commit/43db0fbd49)] - **test**：修复 test-socket-write-after-fin-error（Luigi Pinca） [#42340](https://github.com/nodejs/node/pull/42340)
* \[[`d5f4d98847`](https://github.com/nodejs/node/commit/d5f4d98847)] - **test**：缩短 `test-eventemitter-asyncresource.js`（Juan José） [#45146](https://github.com/nodejs/node/pull/45146)
* \[[`7428651100`](https://github.com/nodejs/node/commit/7428651100)] - **test**：将 test-debugger-pid 转为 async/await（Luke Karrys） [#45179](https://github.com/nodejs/node/pull/45179)
* \[[`f10f2c1121`](https://github.com/nodejs/node/commit/f10f2c1121)] - **test**：修复 small-icu 构建下的 textdecoder 测试（Richard Lau） [#45225](https://github.com/nodejs/node/pull/45225)
* \[[`eed799bd31`](https://github.com/nodejs/node/commit/eed799bd31)] - **test**：提升 `test-event-capture-rejections.js` 的测试覆盖率（Juan José） [#45148](https://github.com/nodejs/node/pull/45148)
* \[[`069747bfdd`](https://github.com/nodejs/node/commit/069747bfdd)] - **test**：修复 riscv 设备上 test-heap-prof.js 的超时（Yu Gu） [#42674](https://github.com/nodejs/node/pull/42674)
* \[[`ddb7df76de`](https://github.com/nodejs/node/commit/ddb7df76de)] - **test**：消除 test-http2-empty-frame-without-eof 的偶发失败（Santiago Gimeno） [#45212](https://github.com/nodejs/node/pull/45212)
* \[[`02ebde39d3`](https://github.com/nodejs/node/commit/02ebde39d3)] - **test**：在 watch-mode ipc 测试中使用 common/tmpdir（Richard Lau） [#45211](https://github.com/nodejs/node/pull/45211)
* \[[`f9bc40a1fc`](https://github.com/nodejs/node/commit/f9bc40a1fc)] - **test**：尽可能使用 uv\_sleep()（Santiago Gimeno） [#45124](https://github.com/nodejs/node/pull/45124)
* \[[`3c7ea23b8f`](https://github.com/nodejs/node/commit/3c7ea23b8f)] - **test**：修复 `test/parallel/test-fs-rm.js` 中的拼写错误（Tim Shilov） [#44882](https://github.com/nodejs/node/pull/44882)
* \[[`b39dcde056`](https://github.com/nodejs/node/commit/b39dcde056)] - **test**：从 test-inspect-address-in-use.js 中移除一个 snapshot blob（Daeyeon Jeong） [#45132](https://github.com/nodejs/node/pull/45132)
* \[[`fabed9bdc8`](https://github.com/nodejs/node/commit/fabed9bdc8)] - **test**：为 Module.\_stat 添加测试（Darshan Sen） [#44713](https://github.com/nodejs/node/pull/44713)
* \[[`2b3b291c97`](https://github.com/nodejs/node/commit/2b3b291c97)] - **test**：让 watch mode inspect 重复重启（Moshe Atlow） [#45060](https://github.com/nodejs/node/pull/45060)
* \[[`17e86e4188`](https://github.com/nodejs/node/commit/17e86e4188)] - **test**：移除 experimental-wasm-threads 标志（Michaël Zasso） [#45074](https://github.com/nodejs/node/pull/45074)
* \[[`f0480d68e9`](https://github.com/nodejs/node/commit/f0480d68e9)] - **test**：移除传给 `mustCall()` 的不必要 noop 函数参数（Antoine du Hamel） [#45047](https://github.com/nodejs/node/pull/45047)
* \[[`82e6043118`](https://github.com/nodejs/node/commit/82e6043118)] - **test**：将 test-watch-mode\* 在所有平台上标记为 flaky（Pierrick Bouvier） [#45049](https://github.com/nodejs/node/pull/45049)
* \[[`26a2ae2489`](https://github.com/nodejs/node/commit/26a2ae2489)] - **test**：包装缺失的 `common.mustCall`（Moshe Atlow） [#45064](https://github.com/nodejs/node/pull/45064)
* \[[`8662399cda`](https://github.com/nodejs/node/commit/8662399cda)] - **test**：移除 `--experimental-async-stack-tagging-api` 标志的提及（Simon） [#45051](https://github.com/nodejs/node/pull/45051)
* \[[`71b8d506ed`](https://github.com/nodejs/node/commit/71b8d506ed)] - **test**：改进 `test-repl-unsupported-option.js` 中的断言（Juan José） [#44953](https://github.com/nodejs/node/pull/44953)
* \[[`dbc696d363`](https://github.com/nodejs/node/commit/dbc696d363)] - **test**：移除传给 mustCall() 的不必要 noop 函数参数（Rich Trott） [#45027](https://github.com/nodejs/node/pull/45027)
* \[[`c1ca19fb06`](https://github.com/nodejs/node/commit/c1ca19fb06)] - **test**：更新 WPT 资源（Khaidi Chu） [#44948](https://github.com/nodejs/node/pull/44948)
* \[[`43677e5a34`](https://github.com/nodejs/node/commit/43677e5a34)] - **test**：在 `overlapped-checker` 不可用时跳过依赖它的测试（Antoine du Hamel） [#45015](https://github.com/nodejs/node/pull/45015)
* \[[`3519d74e87`](https://github.com/nodejs/node/commit/3519d74e87)] - **test**：提升 `os` 包的测试覆盖率（Juan José） [#44959](https://github.com/nodejs/node/pull/44959)
* \[[`ea0cfc9a83`](https://github.com/nodejs/node/commit/ea0cfc9a83)] - **test**：添加测试以提升 http2-compat-serverresponse 的覆盖率（Cesar Mario Diaz） [#44970](https://github.com/nodejs/node/pull/44970)
* \[[`482578682c`](https://github.com/nodejs/node/commit/482578682c)] - **test**：提升 `test-child-process-spawn-argv0.js` 的测试覆盖率（Juan José） [#44955](https://github.com/nodejs/node/pull/44955)
* \[[`a618dc3c3e`](https://github.com/nodejs/node/commit/a618dc3c3e)] - **test**：在必要时使用 CHECK 而不是 EXPECT（Tobias Nießen） [#44795](https://github.com/nodejs/node/pull/44795)
* \[[`c59d3b76e6`](https://github.com/nodejs/node/commit/c59d3b76e6)] - **test**：将 promises 重构为 async/await（Madhuri） [#44980](https://github.com/nodejs/node/pull/44980)
* \[[`36c5927c60`](https://github.com/nodejs/node/commit/36c5927c60)] - **test,crypto**：更新 WebCryptoAPI WPT（Filip Skokan） [#45165](https://github.com/nodejs/node/pull/45165)
* \[[`6158d740f3`](https://github.com/nodejs/node/commit/6158d740f3)] - **test\_runner**：支持函数 Mock（Colin Ihrig） [#45326](https://github.com/nodejs/node/pull/45326)
* \[[`920804dc46`](https://github.com/nodejs/node/commit/920804dc46)] - **test\_runner**：避免吞掉异步抛出的错误（MURAKAMI Masahiko） [#45264](https://github.com/nodejs/node/pull/45264)
* \[[`8e7f9de45e`](https://github.com/nodejs/node/commit/8e7f9de45e)] - **test\_runner**：修复 afterEach 在测试失败时不执行的问题（Jithil P Ponnan） [#45204](https://github.com/nodejs/node/pull/45204)
* \[[`0040030443`](https://github.com/nodejs/node/commit/0040030443)] - **test\_runner**：按顺序报告 tap 子测试（Moshe Atlow） [#45220](https://github.com/nodejs/node/pull/45220)
* \[[`afa8291c7c`](https://github.com/nodejs/node/commit/afa8291c7c)] - **test\_runner**：在 suite 上调用 {before,after}Each()（Colin Ihrig） [#45161](https://github.com/nodejs/node/pull/45161)
* \[[`ff174b0937`](https://github.com/nodejs/node/commit/ff174b0937)] - **test\_runner**：在 AssertionError YAML 中添加额外字段（Bryan English） [#44952](https://github.com/nodejs/node/pull/44952)
* \[[`bf868fdfab`](https://github.com/nodejs/node/commit/bf868fdfab)] - **(SEMVER-MINOR)** **tls**：为证书对象添加 "ca" 属性（Ben Noordhuis） [#44935](https://github.com/nodejs/node/pull/44935)
* \[[`e8075fd1f8`](https://github.com/nodejs/node/commit/e8075fd1f8)] - **tools**：添加自动化以更新 acorn 依赖（Facundo Tuesca） [#45357](https://github.com/nodejs/node/pull/45357)
* \[[`9aa305ff3e`](https://github.com/nodejs/node/commit/9aa305ff3e)] - **tools**：添加关于我们 API 工具链的文档（Claudio Wunder） [#45270](https://github.com/nodejs/node/pull/45270)
* \[[`76cbc07f9b`](https://github.com/nodejs/node/commit/76cbc07f9b)] - **tools**：允许脚本从任意位置运行（Luigi Pinca） [#45361](https://github.com/nodejs/node/pull/45361)
* \[[`aa875a4d6a`](https://github.com/nodejs/node/commit/aa875a4d6a)] - **tools**：将 eslint 更新到 8.27.0（Node.js GitHub Bot） [#45358](https://github.com/nodejs/node/pull/45358)
* \[[`4b71db13ae`](https://github.com/nodejs/node/commit/4b71db13ae)] - **tools**：将 eslint 更新到 8.26.0（Node.js GitHub Bot） [#45243](https://github.com/nodejs/node/pull/45243)
* \[[`63267dfefb`](https://github.com/nodejs/node/commit/63267dfefb)] - **tools**：将 lint-md-dependencies 更新为 rollup\@3.2.5（Node.js GitHub Bot） [#45332](https://github.com/nodejs/node/pull/45332)
* \[[`e275859138`](https://github.com/nodejs/node/commit/e275859138)] - **tools**：修复 stability index 生成（Antoine du Hamel） [#45346](https://github.com/nodejs/node/pull/45346)
* \[[`97fe8bacb1`](https://github.com/nodejs/node/commit/97fe8bacb1)] - **tools**：将 GitHub CI 上的 macOS 核心数增加到 3（Rich Trott） [#45340](https://github.com/nodejs/node/pull/45340)
* \[[`eda4ae51ca`](https://github.com/nodejs/node/commit/eda4ae51ca)] - **tools**：添加自动化以更新 base64 依赖（Facundo Tuesca） [#45300](https://github.com/nodejs/node/pull/45300)
* \[[`2ee052f794`](https://github.com/nodejs/node/commit/2ee052f794)] - **tools**：修复 `request-ci-failed` 评论（Antoine du Hamel） [#45291](https://github.com/nodejs/node/pull/45291)
* \[[`e118dd88fd`](https://github.com/nodejs/node/commit/e118dd88fd)] - **tools**：重构 shell 脚本中动态字符串的创建（Antoine du Hamel） [#45240](https://github.com/nodejs/node/pull/45240)
* \[[`ba89cea683`](https://github.com/nodejs/node/commit/ba89cea683)] - **tools**：更新 lint-md-dependencies（Node.js GitHub Bot） [#45237](https://github.com/nodejs/node/pull/45237)
* \[[`786f086800`](https://github.com/nodejs/node/commit/786f086800)] - **tools**：在 GitHub Actions 工作流中使用 Python 3.11（Luigi Pinca） [#45191](https://github.com/nodejs/node/pull/45191)
* \[[`0738d14fa4`](https://github.com/nodejs/node/commit/0738d14fa4)] - **tools**：修复 `request-ci-failed` 评论（Antoine du Hamel） [#45218](https://github.com/nodejs/node/pull/45218)
* \[[`49be13ccd8`](https://github.com/nodejs/node/commit/49be13ccd8)] - **tools**：保持 Emeriti 列表按字母顺序排序且不区分大小写（Rich Trott） [#45159](https://github.com/nodejs/node/pull/45159)
* \[[`6e30d2231b`](https://github.com/nodejs/node/commit/6e30d2231b)] - **tools**：将 actions/setup-python 更新到 v4（Yagiz Nizipli） [#45178](https://github.com/nodejs/node/pull/45178)
* \[[`a4158692d7`](https://github.com/nodejs/node/commit/a4158692d7)] - **tools**：为 RISC-V 更新 V8 gypfiles（Andreas Schwab） [#45149](https://github.com/nodejs/node/pull/45149)
* \[[`c43bc2169f`](https://github.com/nodejs/node/commit/c43bc2169f)] - **tools**：修复 GHA 上的 `create-or-update-pull-request-action` 哈希（Antoine du Hamel） [#45166](https://github.com/nodejs/node/pull/45166)
* \[[`2ccc03ec32`](https://github.com/nodejs/node/commit/2ccc03ec32)] - **tools**：更新 gr2m/create-or-update-pull-request-action（Luigi Pinca） [#45022](https://github.com/nodejs/node/pull/45022)
* \[[`a70b27629f`](https://github.com/nodejs/node/commit/a70b27629f)] - **tools**：不要在工作流中使用 set-output 命令（Luigi Pinca） [#45024](https://github.com/nodejs/node/pull/45024)
* \[[`025e616662`](https://github.com/nodejs/node/commit/025e616662)] - **tools**：更新 lint-md-dependencies（Node.js GitHub Bot） [#45019](https://github.com/nodejs/node/pull/45019)
* \[[`732f9a78d3`](https://github.com/nodejs/node/commit/732f9a78d3)] - **trace\_events**：修复 getCategories（theanarkh） [#45092](https://github.com/nodejs/node/pull/45092)
* \[[`1bc84ce52c`](https://github.com/nodejs/node/commit/1bc84ce52c)] - **url**：移除 url.parse() 中类似 WHATWG 的 \t \n \r（Rich Trott） [#45116](https://github.com/nodejs/node/pull/45116)
* \[[`84e7388160`](https://github.com/nodejs/node/commit/84e7388160)] - **url**：改进端口验证（Rich Trott） [#45012](https://github.com/nodejs/node/pull/45012)
* \[[`02cff4a3d3`](https://github.com/nodejs/node/commit/02cff4a3d3)] - **url**：提升 url.parse() 对 WHATWG URL 的兼容性（Rich Trott） [#45011](https://github.com/nodejs/node/pull/45011)
* \[[`89390a6be2`](https://github.com/nodejs/node/commit/89390a6be2)] - **util**：提升 text-decoder 性能（Yagiz Nizipli） [#45363](https://github.com/nodejs/node/pull/45363)
* \[[`0deed8daeb`](https://github.com/nodejs/node/commit/0deed8daeb)] - **util**：提升 textdecoder 解码性能（Yagiz Nizipli） [#45294](https://github.com/nodejs/node/pull/45294)
* \[[`d41f8ffc36`](https://github.com/nodejs/node/commit/d41f8ffc36)] - **(SEMVER-MINOR)** **util**：添加 MIME 工具（#21128）（Bradley Farias） [#21128](https://github.com/nodejs/node/pull/21128)

<a id="19.0.1"></a>

## 2022-11-04，版本 19.0.1（当前），@RafaelGSS

这是一个安全发布版本。

### 主要变更

本次发布修复了以下 CVE：

* **[CVE-2022-3602](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-3602)**：X.509 电子邮件地址 4 字节缓冲区溢出（高）
* **[CVE-2022-3786](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-3786)**：X.509 电子邮件地址可变长度缓冲区溢出（高）
* **[CVE-2022-43548](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-43548)**：通过无效八进制 IP 地址在 --inspect 中进行 DNS 重绑定（中）

关于每个漏洞的更详细信息，请参阅 [2022 年 11 月安全发布](https://nodejs.org/en/blog/vulnerability/november-2022-security-releases/) 博客文章。

### 提交

* \[[`e58e8d70a8`](https://github.com/nodejs/node/commit/e58e8d70a8)] - **deps**: 为 quictls/openssl-3.0.7+quic 更新 archs 文件（RafaelGSS） [#45286](https://github.com/nodejs/node/pull/45286)
* \[[`85f4548d57`](https://github.com/nodejs/node/commit/85f4548d57)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.7+quic（RafaelGSS） [#45286](https://github.com/nodejs/node/pull/45286)
* \[[`43403f56f7`](https://github.com/nodejs/node/commit/43403f56f7)] - **inspector**: 再次加强 IP 地址验证（Tobias Nießen） [nodejs-private/node-private#354](https://github.com/nodejs-private/node-private/pull/354)

<a id="19.0.0"></a>

## 2022-10-18，版本 19.0.0（当前），@RafaelGSS 和 @ruyadorno

Node.js 19 来了！亮点包括将 V8 JavaScript 引擎更新到 10.7、默认启用 HTTP(s)/1.1 KeepAlive，以及 ESM 解析调整。

当 Node.js 18 本月晚些时候进入长期支持（LTS）时，Node.js 19 将取代 Node.js 18，成为我们的“当前”发布线。
按照发布计划，Node.js 19 在接下来的 6 个月内都将是“当前”版本，直到 2023 年 4 月。

### 主要变更

#### 弃用和移除

* \[[`7dd2f41c73`](https://github.com/nodejs/node/commit/7dd2f41c73)] - **（SEMVER-MAJOR）** **module**：在运行时弃用 exports 双斜杠映射（Guy Bedford） [#44495](https://github.com/nodejs/node/pull/44495)
* \[[`ada2d053ae`](https://github.com/nodejs/node/commit/ada2d053ae)] - **（SEMVER-MAJOR）** **process**：在运行时弃用 `process.exit()` 中向整数的强制转换（Daeyeon Jeong） [#44711](https://github.com/nodejs/node/pull/44711)

#### 默认启用 HTTP(S)/1.1 KeepAlive

从本次发布开始，Node.js 默认将 `keepAlive` 设置为 true。这意味着任何传出的 HTTP(s) 连接都会自动使用 HTTP 1.1 Keep-Alive。默认等待窗口为 5 秒。
启用 keep-alive 将通过默认复用连接来提供更好的吞吐量。

此外，agent 现在能够解析服务器可能发送的响应 `Keep-Alive`。该标头会指示客户端应保持连接多长时间。
另一方面，Node.js HTTP 服务器现在会在调用 `close()` 时自动断开空闲客户端（这些客户端正在使用 HTTP Keep-Alive 来复用连接）。

默认情况下，Node.js HTTP(S)/1.1 请求可能会获得更好的吞吐量/性能。

由 Paolo Insogna 在 [#43522](https://github.com/nodejs/node/pull/43522) 中贡献

#### 已移除 DTrace/SystemTap/ETW 支持

主要原因是 Node.js 团队缺乏资源。在没有明确计划支持这些工具的情况下，维持这些支持持续更新的复杂性已被证明不值得。因此，Node.js 仓库中 [提出了一个 issue](https://github.com/nodejs/node/issues/44550)，以评估更好的支持方案，尤其是针对 `DTrace`。

由 Ben Noordhuis 在 [#43651](https://github.com/nodejs/node/pull/43651) 和 [#43652](https://github.com/nodejs/node/pull/43652) 中贡献

#### V8 10.7

V8 引擎已更新到 10.7 版本，它是 Chromium 107 的一部分。
此版本为 JavaScript API 带来了一个新特性：`Intl.NumberFormat`。

`Intl.NumberFormat` v3 API 是一个新的 [TC39 ECMA402 stage 3 提案](https://github.com/tc39/proposal-intl-numberformat-v3)
，用于扩展现有的 `Intl.NumberFormat`。

这次 V8 更新由 Michaël Zasso 在 [#44741](https://github.com/nodejs/node/pull/44741) 中贡献。

#### llhttp 8.1.0

llhttp 已更新到 8.1.0 版本。总体而言，此版本为 llhttp API 带来了许多更新，引入了新的回调，并允许所有回调都可暂停。

由 Paolo Insogna 在 [#44967](https://github.com/nodejs/node/pull/44967) 中贡献

#### 其他主要变更

* \[[`46a3afb579`](https://github.com/nodejs/node/commit/46a3afb579)] - **doc**：将 webcrypto 升级为稳定版（Filip Skokan） [#44897](https://github.com/nodejs/node/pull/44897)
* \[[`f594cc85b7`](https://github.com/nodejs/node/commit/f594cc85b7)] - **esm**：移除 specifier resolution 标志（Geoffrey Booth） [#44859](https://github.com/nodejs/node/pull/44859)

### Semver-Major 提交

* \[[`53f73d1cfe`](https://github.com/nodejs/node/commit/53f73d1cfe)] - **（SEMVER-MAJOR）** **build**：在 Windows 上启用 V8 的 trap handler（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`06aaf8a1c4`](https://github.com/nodejs/node/commit/06aaf8a1c4)] - **（SEMVER-MAJOR）** **build**：将 embedder string 重置为 "-node.0"（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`aa3a572e6b`](https://github.com/nodejs/node/commit/aa3a572e6b)] - **（SEMVER-MAJOR）** **build**：移除 dtrace 和 etw 支持（Ben Noordhuis） [#43652](https://github.com/nodejs/node/pull/43652)
* \[[`38f1e2793c`](https://github.com/nodejs/node/commit/38f1e2793c)] - **（SEMVER-MAJOR）** **build**：移除 systemtap 支持（Ben Noordhuis） [#43651](https://github.com/nodejs/node/pull/43651)
* \[[`2849283c4c`](https://github.com/nodejs/node/commit/2849283c4c)] - **（SEMVER-MAJOR）** **crypto**：移除非标准的 `webcrypto.Crypto.prototype.CryptoKey`（Antoine du Hamel） [#42083](https://github.com/nodejs/node/pull/42083)
* \[[`a1653ac715`](https://github.com/nodejs/node/commit/a1653ac715)] - **（SEMVER-MAJOR）** **crypto**：不允许在线程池中调用 setFips（Sergey Petushkov） [#43624](https://github.com/nodejs/node/pull/43624)
* \[[`fd36a8dadb`](https://github.com/nodejs/node/commit/fd36a8dadb)] - **（SEMVER-MAJOR）** **deps**：将 llhttp 更新到 8.1.0（Paolo Insogna） [#44967](https://github.com/nodejs/node/pull/44967)
* \[[`89ecdddaab`](https://github.com/nodejs/node/commit/89ecdddaab)] - **（SEMVER-MAJOR）** **deps**：将最低 ICU 版本提升到 71（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`66fe446efd`](https://github.com/nodejs/node/commit/66fe446efd)] - **（SEMVER-MAJOR）** **deps**：V8：cherry-pick 0cccb6f27d78（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`88ed027d57`](https://github.com/nodejs/node/commit/88ed027d57)] - **（SEMVER-MAJOR）** **deps**：V8：cherry-pick 7ddb8399f9f1（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`26c651c34e`](https://github.com/nodejs/node/commit/26c651c34e)] - **（SEMVER-MAJOR）** **deps**：V8：cherry-pick 1b3a4f0c34a1（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`c8ff2dfd11`](https://github.com/nodejs/node/commit/c8ff2dfd11)] - **（SEMVER-MAJOR）** **deps**：V8：cherry-pick b161a0823165（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`7a8fa2d517`](https://github.com/nodejs/node/commit/7a8fa2d517)] - **（SEMVER-MAJOR）** **deps**：修复在带有 MSVC 的 Windows 上构建 V8（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`83b0aaa800`](https://github.com/nodejs/node/commit/83b0aaa800)] - **（SEMVER-MAJOR）** **deps**：修复在 SmartOS 上构建 V8（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`7a952e8ea5`](https://github.com/nodejs/node/commit/7a952e8ea5)] - **（SEMVER-MAJOR）** **deps**：消除无关的 V8 警告（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`6bd756d7c6`](https://github.com/nodejs/node/commit/6bd756d7c6)] - **（SEMVER-MAJOR）** **deps**：将 V8 更新到 10.7.193.13（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`03fb789fb9`](https://github.com/nodejs/node/commit/03fb789fb9)] - **（SEMVER-MAJOR）** **events**：为 EventTarget 的 signal 添加空值检查（Masashi Hirano） [#43153](https://github.com/nodejs/node/pull/43153)
* \[[`a4fa526ddc`](https://github.com/nodejs/node/commit/a4fa526ddc)] - **（SEMVER-MAJOR）** **fs**：为 fsPromises.symlink() 添加目录自动检测（Livia Medeiros） [#42894](https://github.com/nodejs/node/pull/42894)
* \[[`bb4891d8d4`](https://github.com/nodejs/node/commit/bb4891d8d4)] - **（SEMVER-MAJOR）** **fs**：添加 validateBuffer 以改进错误信息（Hirotaka Tagawa / wafuwafu13） [#44769](https://github.com/nodejs/node/pull/44769)
* \[[`950a4411fa`](https://github.com/nodejs/node/commit/950a4411fa)] - **（SEMVER-MAJOR）** **fs**：在写入方法中移除向字符串的强制转换（Livia Medeiros） [#42796](https://github.com/nodejs/node/pull/42796)
* \[[`41a6d82968`](https://github.com/nodejs/node/commit/41a6d82968)] - **（SEMVER-MAJOR）** **fs**：加强 fs.readSync(buffer, options) 的类型检查（Livia Medeiros） [#42772](https://github.com/nodejs/node/pull/42772)
* \[[`2275faac2b`](https://github.com/nodejs/node/commit/2275faac2b)] - **（SEMVER-MAJOR）** **fs**：加强 fs.read(params, callback) 的类型检查（Livia Medeiros） [#42772](https://github.com/nodejs/node/pull/42772)
* \[[`29953a0b88`](https://github.com/nodejs/node/commit/29953a0b88)] - **（SEMVER-MAJOR）** **fs**：加强 filehandle.read(params) 的类型检查（Livia Medeiros） [#42772](https://github.com/nodejs/node/pull/42772)
* \[[`4267b92604`](https://github.com/nodejs/node/commit/4267b92604)] - **（SEMVER-MAJOR）** **http**：在全局 agent 中默认使用 Keep-Alive（Paolo Insogna） [#43522](https://github.com/nodejs/node/pull/43522)
* \[[`0324529e0f`](https://github.com/nodejs/node/commit/0324529e0f)] - **（SEMVER-MAJOR）** **inspector**：引入 inspector/promises API（Erick Wendel） [#44250](https://github.com/nodejs/node/pull/44250)
* \[[`80270994d6`](https://github.com/nodejs/node/commit/80270994d6)] - **（SEMVER-MAJOR）** **lib**：默认启用全局 CustomEvent（Daeyeon Jeong） [#44860](https://github.com/nodejs/node/pull/44860)
* \[[`f529f73bd7`](https://github.com/nodejs/node/commit/f529f73bd7)] - **（SEMVER-MAJOR）** **lib**：为事件处理器属性接收者添加品牌检查（Chengzhong Wu） [#44483](https://github.com/nodejs/node/pull/44483)
* \[[`6de2673a9f`](https://github.com/nodejs/node/commit/6de2673a9f)] - **（SEMVER-MAJOR）** **lib**：默认启用全局 WebCrypto（Antoine du Hamel） [#42083](https://github.com/nodejs/node/pull/42083)
* \[[`73ba8830d5`](https://github.com/nodejs/node/commit/73ba8830d5)] - **（SEMVER-MAJOR）** **lib**：在 AbortController 中使用私有字段（Joyee Cheung） [#43820](https://github.com/nodejs/node/pull/43820)
* \[[`7dd2f41c73`](https://github.com/nodejs/node/commit/7dd2f41c73)] - **（SEMVER-MAJOR）** **module**：在运行时弃用 exports 双斜杠映射（Guy Bedford） [#44495](https://github.com/nodejs/node/pull/44495)
* \[[`22c39b1ddd`](https://github.com/nodejs/node/commit/22c39b1ddd)] - **（SEMVER-MAJOR）** **path**：如果 `ext` 中未指定，`path.format` 将添加点号（theanarkh） [#44349](https://github.com/nodejs/node/pull/44349)
* \[[`587367d107`](https://github.com/nodejs/node/commit/587367d107)] - **（SEMVER-MAJOR）** **perf_hooks**：暴露 webperf 全局作用域接口（Chengzhong Wu） [#44483](https://github.com/nodejs/node/pull/44483)
* \[[`364c0e196c`](https://github.com/nodejs/node/commit/364c0e196c)] - **（SEMVER-MAJOR）** **perf_hooks**：修复 webperf idlharness（Chengzhong Wu） [#44483](https://github.com/nodejs/node/pull/44483)
* \[[`ada2d053ae`](https://github.com/nodejs/node/commit/ada2d053ae)] - **（SEMVER-MAJOR）** **process**：在运行时弃用 `process.exit()` 中向整数的强制转换（Daeyeon Jeong） [#44711](https://github.com/nodejs/node/pull/44711)
* \[[`e0ab8dd637`](https://github.com/nodejs/node/commit/e0ab8dd637)] - **（SEMVER-MAJOR）** **process**：使 process.config 只读（Sergey Petushkov） [#43627](https://github.com/nodejs/node/pull/43627)
* \[[`481a959adb`](https://github.com/nodejs/node/commit/481a959adb)] - **（SEMVER-MAJOR）** **readline**：从 `InterfaceConstructor` 中移除 `question` 方法（Antoine du Hamel） [#44606](https://github.com/nodejs/node/pull/44606)
* \[[`c9602ce212`](https://github.com/nodejs/node/commit/c9602ce212)] - **（SEMVER-MAJOR）** **src**：使用新的 v8::OOMErrorCallback API（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`19a70c11e4`](https://github.com/nodejs/node/commit/19a70c11e4)] - **（SEMVER-MAJOR）** **src**：改为重写 CreateJob，而不是 PostJob（Clemens Backes） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`fd52c62bee`](https://github.com/nodejs/node/commit/fd52c62bee)] - **（SEMVER-MAJOR）** **src**：使用 V8_ENABLE_SANDBOX 宏（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`c10988db44`](https://github.com/nodejs/node/commit/c10988db44)] - **（SEMVER-MAJOR）** **src**：使用未弃用的 V8 inspector API（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`3efe901dd6`](https://github.com/nodejs/node/commit/3efe901dd6)] - **（SEMVER-MAJOR）** **src**：将 NODE_MODULE_VERSION 更新为 111（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`77e585657f`](https://github.com/nodejs/node/commit/77e585657f)] - **（SEMVER-MAJOR）** **src**：将 embedder api overload 转为默认参数（Alena Khineika） [#43629](https://github.com/nodejs/node/pull/43629)
* \[[`dabda03ea9`](https://github.com/nodejs/node/commit/dabda03ea9)] - **（SEMVER-MAJOR）** **src**：按环境划分 time origin 值（Chengzhong Wu） [#43781](https://github.com/nodejs/node/pull/43781)
* \[[`2e49b99cc2`](https://github.com/nodejs/node/commit/2e49b99cc2)] - **（SEMVER-MAJOR）** **src,test**：禁用初始化时冻结 V8 标志（Clemens Backes） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`2b32985c62`](https://github.com/nodejs/node/commit/2b32985c62)] - **（SEMVER-MAJOR）** **stream**：对错误参数使用 null（Luigi Pinca） [#44312](https://github.com/nodejs/node/pull/44312)
* \[[`36805e8524`](https://github.com/nodejs/node/commit/36805e8524)] - **（SEMVER-MAJOR）** **test**：为 V8 更新调整 test-repl（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`96ef25793d`](https://github.com/nodejs/node/commit/96ef25793d)] - **（SEMVER-MAJOR）** **test**：使 test-repl-pretty-\*stack 适配 V8 变更（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`71c193e581`](https://github.com/nodejs/node/commit/71c193e581)] - **（SEMVER-MAJOR）** **test**：适配新的 JSON SyntaxError 消息（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`b5f1564880`](https://github.com/nodejs/node/commit/b5f1564880)] - **（SEMVER-MAJOR）** **test**：将 always-opt 标志重命名为 always-turbofan（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`1acf0339dd`](https://github.com/nodejs/node/commit/1acf0339dd)] - **（SEMVER-MAJOR）** **test**：修复新 V8 版本的 test-hash-seed（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)
* \[[`57ff476c33`](https://github.com/nodejs/node/commit/57ff476c33)] - **（SEMVER-MAJOR）** **test**：移除重复测试（Luigi Pinca） [#44051](https://github.com/nodejs/node/pull/44051)
* \[[`77def91bf9`](https://github.com/nodejs/node/commit/77def91bf9)] - **（SEMVER-MAJOR）** **tls,http2**：在 ALPN 不匹配时发送致命警报（Tobias Nießen） [#44031](https://github.com/nodejs/node/pull/44031)
* \[[`4860ad99b9`](https://github.com/nodejs/node/commit/4860ad99b9)] - **（SEMVER-MAJOR）** **tools**：更新 V8 10.7 的 gypfiles（Michaël Zasso） [#44741](https://github.com/nodejs/node/pull/44741)

### Semver-Minor 提交

* \[[`af0921d877`](https://github.com/nodejs/node/commit/af0921d877)] - **（SEMVER-MINOR）** **esm**：添加 `--import` 标志（Moshe Atlow） [#43942](https://github.com/nodejs/node/pull/43942)
* \[[`0633e9a0b5`](https://github.com/nodejs/node/commit/0633e9a0b5)] - **（SEMVER-MINOR）** **lib**：为 process 和 worker 添加诊断通道（theanarkh） [#44045](https://github.com/nodejs/node/pull/44045)
* \[[`ca5be26b31`](https://github.com/nodejs/node/commit/ca5be26b31)] - **（SEMVER-MINOR）** **src**：添加对外部共享 js builtins 的支持（Michael Dawson） [#44376](https://github.com/nodejs/node/pull/44376)
* \[[`e86a638305`](https://github.com/nodejs/node/commit/e86a638305)] - **（SEMVER-MINOR）** **src**：添加 Shadow Realm 的初始支持（Chengzhong Wu） [#42869](https://github.com/nodejs/node/pull/42869)
* \[[`71ca6d7d6a`](https://github.com/nodejs/node/commit/71ca6d7d6a)] - **（SEMVER-MINOR）** **util**：为 Set 和 Map 添加 `maxArrayLength` 选项（Kohei Ueno） [#43576](https://github.com/nodejs/node/pull/43576)

### Semver-Patch 提交

* \[[`78508028e3`](https://github.com/nodejs/node/commit/78508028e3)] - **bootstrap**：在 BuiltinLoader 中生成 bootstrapper 参数（Joyee Cheung） [#44488](https://github.com/nodejs/node/pull/44488)
* \[[`5291096ca2`](https://github.com/nodejs/node/commit/5291096ca2)] - **bootstrap**：在加载快照时检查更多元数据（Joyee Cheung） [#44132](https://github.com/nodejs/node/pull/44132)
* \[[`d0f73d383d`](https://github.com/nodejs/node/commit/d0f73d383d)] - **build**：更快，移除 -fno-omit-frame-pointer（Ben Noordhuis） [#44452](https://github.com/nodejs/node/pull/44452)
* \[[`214354fc9f`](https://github.com/nodejs/node/commit/214354fc9f)] - **crypto**：修复 webcrypto HMAC 在 deriveKey 和 generateKey 中的“获取密钥长度”（Filip Skokan） [#44917](https://github.com/nodejs/node/pull/44917)
* \[[`40a0757b21`](https://github.com/nodejs/node/commit/40a0757b21)] - **crypto**：移除 webcrypto HKDF 和 PBKDF2 默认应用的长度（Filip Skokan） [#44945](https://github.com/nodejs/node/pull/44945)
* \[[`eeec3eb16a`](https://github.com/nodejs/node/commit/eeec3eb16a)] - **crypto**：简化 webcrypto ECDH deriveBits（Filip Skokan） [#44946](https://github.com/nodejs/node/pull/44946)
* \[[`0be1c57281`](https://github.com/nodejs/node/commit/0be1c57281)] - **deps**：V8：cherry-pick c2792e58035f（Jiawen Geng） [#44961](https://github.com/nodejs/node/pull/44961)
* \[[`488474618c`](https://github.com/nodejs/node/commit/488474618c)] - **deps**：V8：cherry-pick c3dffe6e2bda（Michaël Zasso） [#44958](https://github.com/nodejs/node/pull/44958)
* \[[`34ba631a0b`](https://github.com/nodejs/node/commit/34ba631a0b)] - **deps**：V8：cherry-pick e7f0f26f5ef3（Michaël Zasso） [#44958](https://github.com/nodejs/node/pull/44958)
* \[[`690a837f4f`](https://github.com/nodejs/node/commit/690a837f4f)] - **deps**：V8：cherry-pick 3d59a3c2c164（Michaël Zasso） [#44958](https://github.com/nodejs/node/pull/44958)
* \[[`bab8b3aad6`](https://github.com/nodejs/node/commit/bab8b3aad6)] - **deps**：V8：cherry-pick 8b8703953616（Michaël Zasso） [#44958](https://github.com/nodejs/node/pull/44958)
* \[[`37e5152245`](https://github.com/nodejs/node/commit/37e5152245)] - **doc**：为最新的 v18.x 发布 changelog 添加主要变更（Danielle Adams） [#44996](https://github.com/nodejs/node/pull/44996)
* \[[`19a909902a`](https://github.com/nodejs/node/commit/19a909902a)] - **doc**：弃用 url.parse()（Rich Trott） [#44919](https://github.com/nodejs/node/pull/44919)
* \[[`6686d9000b`](https://github.com/nodejs/node/commit/6686d9000b)] - **doc**：修复 fs API 文档中的反引号（Livia Medeiros） [#44962](https://github.com/nodejs/node/pull/44962)
* \[[`46a3afb579`](https://github.com/nodejs/node/commit/46a3afb579)] - **doc**：将 webcrypto 升级为稳定版（Filip Skokan） [#44897](https://github.com/nodejs/node/pull/44897)
* \[[`6e3c55cc35`](https://github.com/nodejs/node/commit/6e3c55cc35)] - **doc**：修复 v16.17.1 安全发布 changelog（Ruy Adorno） [#44759](https://github.com/nodejs/node/pull/44759)
* \[[`77cb88b91c`](https://github.com/nodejs/node/commit/77cb88b91c)] - **doc**：将 `--import` 标记为实验性（Moshe Atlow） [#44067](https://github.com/nodejs/node/pull/44067)
* \[[`46dcfb3c7b`](https://github.com/nodejs/node/commit/46dcfb3c7b)] - **doc,crypto**：更新全局访问的 webcrypto 文档（Filip Skokan） [#44723](https://github.com/nodejs/node/pull/44723)
* \[[`f594cc85b7`](https://github.com/nodejs/node/commit/f594cc85b7)] - **esm**：移除 specifier resolution 标志（Geoffrey Booth） [#44859](https://github.com/nodejs/node/pull/44859)
* \[[`3c040348fe`](https://github.com/nodejs/node/commit/3c040348fe)] - _**Revert**_ "**esm**：将 `resolve` 钩子转换为同步"（Jacob Smith） [#43526](https://github.com/nodejs/node/pull/43526)
* \[[`90b634a5a5`](https://github.com/nodejs/node/commit/90b634a5a5)] - **esm**：将 `resolve` 钩子转换为同步（Jacob Smith） [#43363](https://github.com/nodejs/node/pull/43363)
* \[[`7c06eab1dc`](https://github.com/nodejs/node/commit/7c06eab1dc)] - _**Revert**_ "**http**：不泄漏错误监听器"（Luigi Pinca） [#44921](https://github.com/nodejs/node/pull/44921)
* \[[`464d1c1558`](https://github.com/nodejs/node/commit/464d1c1558)] - **lib**：在运行用户代码前重置 `RegExp` 静态属性（Antoine du Hamel） [#43741](https://github.com/nodejs/node/pull/43741)
* \[[`15f10515e3`](https://github.com/nodejs/node/commit/15f10515e3)] - **module**：修复 imports 字段的 segment 弃用问题（Guy Bedford） [#44883](https://github.com/nodejs/node/pull/44883)
* \[[`7cdf745fdd`](https://github.com/nodejs/node/commit/7cdf745fdd)] - **perf_hooks**：在 setResourceTimingBufferSize 中将 maxSize 转换为 IDL 值（Chengzhong Wu） [#44902](https://github.com/nodejs/node/pull/44902)
* \[[`be525d7d04`](https://github.com/nodejs/node/commit/be525d7d04)] - **src**：统一代码库中的退出码（Joyee Cheung） [#44746](https://github.com/nodejs/node/pull/44746)
* \[[`d5ce285c8b`](https://github.com/nodejs/node/commit/d5ce285c8b)] - **src**：重构 BaseObject 方法（Joyee Cheung） [#44796](https://github.com/nodejs/node/pull/44796)
* \[[`717465433c`](https://github.com/nodejs/node/commit/717465433c)] - **src**：使用 node::Realm 创建 BaseObject（Chengzhong Wu） [#44348](https://github.com/nodejs/node/pull/44348)
* \[[`45f2258f74`](https://github.com/nodejs/node/commit/45f2258f74)] - **src**：将 IS_RELEASE 恢复为 0（Bryan English） [#44758](https://github.com/nodejs/node/pull/44758)
* \[[`1f54fc25cb`](https://github.com/nodejs/node/commit/1f54fc25cb)] - **src**：在 SecretKeyGen 中使用自动内存管理（Tobias Nießen） [#44479](https://github.com/nodejs/node/pull/44479)
* \[[`7371d335ac`](https://github.com/nodejs/node/commit/7371d335ac)] - **src**：当 RAND_bytes() != 1 时使用 V8 熵源（Tobias Nießen） [#44493](https://github.com/nodejs/node/pull/44493)
* \[[`81d9cdb8cd`](https://github.com/nodejs/node/commit/81d9cdb8cd)] - **src**：引入 node::Realm（Chengzhong Wu） [#44179](https://github.com/nodejs/node/pull/44179)
* \[[`ad41c919df`](https://github.com/nodejs/node/commit/ad41c919df)] - **src**：移除 v8abbr.h（Tobias Nießen） [#44402](https://github.com/nodejs/node/pull/44402)
* \[[`fddc701d3c`](https://github.com/nodejs/node/commit/fddc701d3c)] - **src**：在快照中支持诊断通道（Joyee Cheung） [#44193](https://github.com/nodejs/node/pull/44193)
* \[[`d70aab663c`](https://github.com/nodejs/node/commit/d70aab663c)] - **src**：在快照中支持 WeakReference（Joyee Cheung） [#44193](https://github.com/nodejs/node/pull/44193)
* \[[`4ca398a617`](https://github.com/nodejs/node/commit/4ca398a617)] - **src**：遍历基础对象以准备快照（Joyee Cheung） [#44192](https://github.com/nodejs/node/pull/44192)
* \[[`8b0e5b19bd`](https://github.com/nodejs/node/commit/8b0e5b19bd)] - **src**：修复 v8 中 cppgc 的不兼容问题（Shelley Vohr） [#43521](https://github.com/nodejs/node/pull/43521)
* \[[`3fdf6cfad9`](https://github.com/nodejs/node/commit/3fdf6cfad9)] - **stream**：修复从 QueuingStrategies 返回的 `size` 函数（Daeyeon Jeong） [#44867](https://github.com/nodejs/node/pull/44867)
* \[[`331088f4a4`](https://github.com/nodejs/node/commit/331088f4a4)] - _**Revert**_ "**tools**：将 `tools/license2rtf` 重构为 ESM"（Richard Lau） [#43214](https://github.com/nodejs/node/pull/43214)
* \[[`30cb1bf8b8`](https://github.com/nodejs/node/commit/30cb1bf8b8)] - **tools**：将 `tools/license2rtf` 重构为 ESM（Feng Yu） [#43101](https://github.com/nodejs/node/pull/43101)
* \[[`a3ff4bfc66`](https://github.com/nodejs/node/commit/a3ff4bfc66)] - **url**：回退“验证 ipv4 部分长度”（Antoine du Hamel） [#42940](https://github.com/nodejs/node/pull/42940)
* \[[`87d0d7a069`](https://github.com/nodejs/node/commit/87d0d7a069)] - **url**：验证 ipv4 部分长度（Yagiz Nizipli） [#42915](https://github.com/nodejs/node/pull/42915)
* \[[`5b1bcf82f1`](https://github.com/nodejs/node/commit/5b1bcf82f1)] - **vm**：将 ContextifyContext 设为 BaseObject（Joyee Cheung） [#44796](https://github.com/nodejs/node/pull/44796)
