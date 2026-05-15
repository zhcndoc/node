# io.js 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>v3</th>
<th>v2</th>
<th>v1</th>
</tr>
<tr>
<td valign="top">
<a href="#3.3.1">3.3.1</a><br/>
<a href="#3.3.0">3.3.0</a><br/>
<a href="#3.2.0">3.2.0</a><br/>
<a href="#3.1.0">3.1.0</a><br/>
<a href="#3.0.0">3.0.0</a><br/>
</td>
<td valign="top">
<a href="#2.5.0">2.5.0</a><br/>
<a href="#2.4.0">2.4.0</a><br/>
<a href="#2.3.4">2.3.4</a><br/>
<a href="#2.3.3">2.3.3</a><br/>
<a href="#2.3.2">2.3.2</a><br/>
<a href="#2.3.1">2.3.1</a><br/>
<a href="#2.3.0">2.3.0</a><br/>
<a href="#2.2.1">2.2.1</a><br/>
<a href="#2.2.0">2.2.0</a><br/>
<a href="#2.1.0">2.1.0</a><br/>
<a href="#2.0.2">2.0.2</a><br/>
<a href="#2.0.1">2.0.1</a><br/>
<a href="#2.0.0">2.0.0</a><br/>
</td>
<td valign="top">
<a href="#1.8.4">1.8.4</a><br/>
<a href="#1.8.3">1.8.3</a><br/>
<a href="#1.8.2">1.8.2</a><br/>
<a href="#1.8.1">1.8.1</a><br/>
<a href="#1.7.1">1.7.1</a><br/>
<a href="#1.7.0">1.7.0</a><br/>
<a href="#1.6.4">1.6.4</a><br/>
<a href="#1.6.3">1.6.3</a><br/>
<a href="#1.6.2">1.6.2</a><br/>
<a href="#1.6.1">1.6.1</a><br/>
<a href="#1.6.0">1.6.0</a><br/>
<a href="#1.5.1">1.5.1</a><br/>
<a href="#1.5.0">1.5.0</a><br/>
<a href="#1.4.3">1.4.3</a><br/>
<a href="#1.4.2">1.4.2</a><br/>
<a href="#1.4.1">1.4.1</a><br/>
<a href="#1.4.1">1.4.0</a><br/>
<a href="#1.3.0">1.3.0</a><br/>
<a href="#1.2.0">1.2.0</a><br/>
<a href="#1.1.0">1.1.0</a><br/>
<a href="#1.0.4">1.0.4</a><br/>
<a href="#1.0.3">1.0.3</a><br/>
<a href="#1.0.2">1.0.2</a><br/>
<a href="#1.0.1">1.0.1</a><br/>
<a href="#1.0.0">1.0.0</a><br/>
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
  * [4.x](CHANGELOG_V4.md)
  * [0.12.x](CHANGELOG_V012.md)
  * [0.10.x](CHANGELOG_V010.md)
  * [Archive](CHANGELOG_ARCHIVE.md)

<a id="3.3.1"></a>

## 2015-09-15，io.js 版本 3.3.1 @rvagg

### 显著变化

* **buffer**: 修复了一个导致崩溃的小错误（Michaël Zasso） [#2635](https://github.com/nodejs/node/pull/2635),
* **child\_process**: 修复导致崩溃的错误（Evan Lucas） [#2727](https://github.com/nodejs/node/pull/2727)
* **crypto**: 替换 rwlocks 的使用，在 Windows XP / 2003 上不安全（Ben Noordhuis） [#2723](https://github.com/nodejs/node/pull/2723)
* **libuv**: 从 1.7.3 升级到 1.7.4（Saúl Ibarra Corretgé） [#2817](https://github.com/nodejs/node/pull/2817)
* **node**: 修复 Windows 上错误的 `process.release.libUrl`（Rod Vagg） [#2699](https://github.com/nodejs/node/pull/2699)
* **node-gyp**: 提升到 v3.0.3，该版本改进了对 Node.js 和 io.js v0.10 到 v4+ 的支持（Rod Vagg） [#2700](https://github.com/nodejs/node/pull/2700)
* **npm**: 从 2.13.3 升级到 2.14.3，包含一个安全更新，详情参见 <https://github.com/npm/npm/releases/tag/v2.14.2>，（Kat Marchán） [#2696](https://github.com/nodejs/node/pull/2696)。
* **timers**: 通过移植 0.12 的实现提升了定时器性能，并包含一些小修复（Jeremiah Senkpiel） [#2540](https://github.com/nodejs/node/pull/2540),（Julien Gilli） [nodejs/node-v0.x-archive#8751](https://github.com/nodejs/node-v0.x-archive/pull/8751) [nodejs/node-v0.x-archive#8905](https://github.com/nodejs/node-v0.x-archive/pull/8905)

### 已知问题

完整且最新的已知问题列表见 <https://github.com/nodejs/io.js/labels/confirmed-bug>。

* 当前版本的 V8 无法正确处理某些计算属性简写对象属性的用法。例如 `[{ [prop]: val }]` 会求值为 `[{}]`。 [#2507](https://github.com/nodejs/node/issues/2507)
* 在 `beforeExit` 期间运行的未引用定时器仍有一些问题尚待解决。参见 [#1264](https://github.com/nodejs/io.js/issues/1264)。
* REPL 中的代理对会冻结终端。 [#690](https://github.com/nodejs/io.js/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这个回归问题在 1.0.2 中引入，参见 [#760](https://github.com/nodejs/io.js/issues/760)。
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/io.js/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会传递 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/io.js/issues/1435)。

### 提交

* \[[`b73ff52fe6`](https://github.com/nodejs/node/commit/b73ff52fe6)] - **bindings**: 在读取模块结构后关闭（Fedor Indutny） [#2792](https://github.com/nodejs/node/pull/2792)
* \[[`aa1140e59a`](https://github.com/nodejs/node/commit/aa1140e59a)] - **buffer**: SlowBuffer 只接受有效的数值（Michaël Zasso） [#2635](https://github.com/nodejs/node/pull/2635)
* \[[`574475d56e`](https://github.com/nodejs/node/commit/574475d56e)] - **build**: 清理生成的 tap 文件（Sakthipriyan Vairamani） [#2837](https://github.com/nodejs/node/pull/2837)
* \[[`aa0001271e`](https://github.com/nodejs/node/commit/aa0001271e)] - **build**: 在单个会话中对 staging 执行远程命令（Rod Vagg） [#2717](https://github.com/nodejs/node/pull/2717)
* \[[`1428661095`](https://github.com/nodejs/node/commit/1428661095)] - **build**: 修复 v8\_enable\_handle\_zapping 覆盖问题（Karl Skomski） [#2731](https://github.com/nodejs/node/pull/2731)
* \[[`5a51edd718`](https://github.com/nodejs/node/commit/5a51edd718)] - **build**: 添加带内置 leakcheck 的 --enable-asan（Karl Skomski） [#2376](https://github.com/nodejs/node/pull/2376)
* \[[`618caa5de0`](https://github.com/nodejs/node/commit/618caa5de0)] - **child\_process**: 即使 stdio.fd 为 0 也使用它（Evan Lucas） [#2727](https://github.com/nodejs/node/pull/2727)
* \[[`7be4e49cb6`](https://github.com/nodejs/node/commit/7be4e49cb6)] - **child\_process**: 检查 execFile 和 fork 参数（James M Snell） [#2667](https://github.com/nodejs/node/pull/2667)
* \[[`7f5d6e72c6`](https://github.com/nodejs/node/commit/7f5d6e72c6)] - **cluster**: 允许共享重复使用的 dgram 套接字（Fedor Indutny） [#2548](https://github.com/nodejs/node/pull/2548)
* \[[`e68c7ec498`](https://github.com/nodejs/node/commit/e68c7ec498)] - **contextify**: 初始化期间忽略 getter（Fedor Indutny） [nodejs/io.js#2091](https://github.com/nodejs/io.js/pull/2091)
* \[[`610fa964aa`](https://github.com/nodejs/node/commit/610fa964aa)] - **cpplint**: 使其可以在 git 仓库外运行（Ben Noordhuis） [#2710](https://github.com/nodejs/node/pull/2710)
* \[[`4237373dd7`](https://github.com/nodejs/node/commit/4237373dd7)] - **crypto**: 用简单互斥锁替换 rwlocks（Ben Noordhuis） [#2723](https://github.com/nodejs/node/pull/2723)
* \[[`777eb00306`](https://github.com/nodejs/node/commit/777eb00306)] - **deps**: 在 npm 中升级到 node-gyp\@3.0.3（Kat Marchán） [#2822](https://github.com/nodejs/node/pull/2822)
* \[[`b729ad384b`](https://github.com/nodejs/node/commit/b729ad384b)] - **deps**: 升级到 npm 2.14.3（Kat Marchán） [#2822](https://github.com/nodejs/node/pull/2822)
* \[[`b09fde761c`](https://github.com/nodejs/node/commit/b09fde761c)] - **deps**: 将 libuv 更新到 1.7.4 版本（Saúl Ibarra Corretgé） [#2817](https://github.com/nodejs/node/pull/2817)
* \[[`4cf225daad`](https://github.com/nodejs/node/commit/4cf225daad)] - **deps**: 提升 node-gyp v3.0.0（Rod Vagg） [#2700](https://github.com/nodejs/node/pull/2700)
* \[[`118f48c0f3`](https://github.com/nodejs/node/commit/118f48c0f3)] - **deps**: 在 npm 测试期间创建 .npmrc（Kat Marchán） [#2696](https://github.com/nodejs/node/pull/2696)
* \[[`b3fee8e6a6`](https://github.com/nodejs/node/commit/b3fee8e6a6)] - **deps**: 升级到 npm 2.14.2（Kat Marchán） [#2696](https://github.com/nodejs/node/pull/2696)
* \[[`4593539b92`](https://github.com/nodejs/node/commit/4593539b92)] - **deps**: 从 v8 上游回移 75e43a6（saper） [#2636](https://github.com/nodejs/node/pull/2636)
* \[[`2d1438cfe0`](https://github.com/nodejs/node/commit/2d1438cfe0)] - **doc**: 修复 repl.markdown 中损坏的链接（Danny Nemer） [#2827](https://github.com/nodejs/node/pull/2827)
* \[[`9dd9c85a48`](https://github.com/nodejs/node/commit/9dd9c85a48)] - **doc**: 修复 README 中的拼写错误（Ionică Bizău） [#2852](https://github.com/nodejs/node/pull/2852)
* \[[`476125d403`](https://github.com/nodejs/node/commit/476125d403)] - **doc**: 将 tunniclm 加为协作者（Mike Tunnicliffe） [#2826](https://github.com/nodejs/node/pull/2826)
* \[[`0603a92d48`](https://github.com/nodejs/node/commit/0603a92d48)] - **doc**: 修复 stream 和 process 文档中的两个错误（Jeremiah Senkpiel） [#2549](https://github.com/nodejs/node/pull/2549)
* \[[`da2902ddfd`](https://github.com/nodejs/node/commit/da2902ddfd)] - **doc**: 为保持一致性，使用“Calls”而不是“Executes”（Minwoo Jung） [#2800](https://github.com/nodejs/node/pull/2800)
* \[[`5e93bc4fba`](https://github.com/nodejs/node/commit/5e93bc4fba)] - **doc**: 为保持一致性，使用美式英语（Anne-Gaelle Colom） [#2784](https://github.com/nodejs/node/pull/2784)
* \[[`3ee7fbcefd`](https://github.com/nodejs/node/commit/3ee7fbcefd)] - **doc**: 为保持一致性，使用第三人称单数（Anne-Gaelle Colom） [#2765](https://github.com/nodejs/node/pull/2765)
* \[[`4fdccb9eb7`](https://github.com/nodejs/node/commit/4fdccb9eb7)] - **doc**: 修复 Assertion Testing 文档中的逗号拼接错误（Rich Trott） [#2728](https://github.com/nodejs/node/pull/2728)
* \[[`28c2d310d6`](https://github.com/nodejs/node/commit/28c2d310d6)] - **doc**: 更新 AUTHORS 列表（Rod Vagg）
* \[[`324c073fb9`](https://github.com/nodejs/node/commit/324c073fb9)] - **doc**: 添加 2015-09-02 TSC 会议纪要（Rod Vagg） [#2674](https://github.com/nodejs/node/pull/2674)
* \[[`8929445686`](https://github.com/nodejs/node/commit/8929445686)] - **doc**: 更新 url 文档以考虑转义（Jeremiah Senkpiel） [#2605](https://github.com/nodejs/node/pull/2605)
* \[[`512dad6883`](https://github.com/nodejs/node/commit/512dad6883)] - **doc**: 按用户名重新排序协作者（Johan Bergström） [#2322](https://github.com/nodejs/node/pull/2322)
* \[[`8372ea2ca5`](https://github.com/nodejs/node/commit/8372ea2ca5)] - **doc,test**: 在 Windows 中启用递归文件监视（Sakthipriyan Vairamani） [#2649](https://github.com/nodejs/node/pull/2649)
* \[[`daf6c533cc`](https://github.com/nodejs/node/commit/daf6c533cc)] - **events,lib**: 不需要 EE#listenerCount()（Jeremiah Senkpiel） [#2661](https://github.com/nodejs/node/pull/2661)
* \[[`d8371a801e`](https://github.com/nodejs/node/commit/d8371a801e)] - **http\_server**: 修复 socket 关闭后的恢复（Fedor Indutny） [#2824](https://github.com/nodejs/node/pull/2824)
* \[[`7f7d4fdddd`](https://github.com/nodejs/node/commit/7f7d4fdddd)] - **node-gyp**: 提升到 3.0.1，下载 url 的小修复（Rod Vagg） [#2737](https://github.com/nodejs/node/pull/2737)
* \[[`91cee73294`](https://github.com/nodejs/node/commit/91cee73294)] - **src**: 使用 ZCtxt 作为 v8::Isolates 的来源（Roman Klauke） [#2547](https://github.com/nodejs/node/pull/2547)
* \[[`ac98e13b95`](https://github.com/nodejs/node/commit/ac98e13b95)] - **src**: 为 Windows 的 process.release.libUrl 将 ia32 改为 x86（Rod Vagg） [#2699](https://github.com/nodejs/node/pull/2699)
* \[[`ca6c3223e1`](https://github.com/nodejs/node/commit/ca6c3223e1)] - **src**: 在 windows 上使用标准符合的 snprintf（Karl Skomski） [#2404](https://github.com/nodejs/node/pull/2404)
* \[[`b028978a53`](https://github.com/nodejs/node/commit/b028978a53)] - **src**: 修复长异常行的缓冲区溢出（Karl Skomski） [#2404](https://github.com/nodejs/node/pull/2404)
* \[[`e73eafd7e7`](https://github.com/nodejs/node/commit/e73eafd7e7)] - **src**: 修复 ExternString 中的内存泄漏（Karl Skomski） [#2402](https://github.com/nodejs/node/pull/2402)
* \[[`d370306de1`](https://github.com/nodejs/node/commit/d370306de1)] - **src**: 仅在 argc > 1 时设置 v8 标志（Evan Lucas） [#2646](https://github.com/nodejs/node/pull/2646)
* \[[`ed087836af`](https://github.com/nodejs/node/commit/ed087836af)] - **streams**: 将 LazyTransform 重构到 internal/（Brendan Ashworth） [#2566](https://github.com/nodejs/node/pull/2566)
* \[[`993c22fe0e`](https://github.com/nodejs/node/commit/993c22fe0e)] - **test**: 移除被禁用的测试（Rich Trott） [#2841](https://github.com/nodejs/node/pull/2841)
* \[[`1474f29d1f`](https://github.com/nodejs/node/commit/1474f29d1f)] - **test**: 拆分互联网 dns 测试（Rich Trott） [#2802](https://github.com/nodejs/node/pull/2802)
* \[[`601a97622b`](https://github.com/nodejs/node/commit/601a97622b)] - **test**: 增加 armv6 的 dgram 超时（Rich Trott） [#2808](https://github.com/nodejs/node/pull/2808)
* \[[`1dad19ba81`](https://github.com/nodejs/node/commit/1dad19ba81)] - **test**: 移除 test-dns.js 中有效主机名检查（Rich Trott） [#2785](https://github.com/nodejs/node/pull/2785)
* \[[`f3d5891a3f`](https://github.com/nodejs/node/commit/f3d5891a3f)] - **test**: 期望 FreeBSD 上 test\_lookup\_ipv6\_hint 报错（Rich Trott） [#2724](https://github.com/nodejs/node/pull/2724)
* \[[`2ffb21baf1`](https://github.com/nodejs/node/commit/2ffb21baf1)] - **test**: 修复在 require 之前使用 `common` 的问题（Rod Vagg） [#2685](https://github.com/nodejs/node/pull/2685)
* \[[`b2c5479a14`](https://github.com/nodejs/node/commit/b2c5479a14)] - **test**: 重构以消除不稳定测试（Rich Trott） [#2609](https://github.com/nodejs/node/pull/2609)
* \[[`fcfd15f8f9`](https://github.com/nodejs/node/commit/fcfd15f8f9)] - **test**: 将 eval\_messages 标记为不稳定（Alexis Campailla） [#2648](https://github.com/nodejs/node/pull/2648)
* \[[`1865cad7ae`](https://github.com/nodejs/node/commit/1865cad7ae)] - **test**: 将 test-vm-syntax-error-stderr 标记为不稳定（João Reis） [#2662](https://github.com/nodejs/node/pull/2662)
* \[[`b0014ecd27`](https://github.com/nodejs/node/commit/b0014ecd27)] - **test**: 将 test-repl-persistent-history 标记为不稳定（João Reis） [#2659](https://github.com/nodejs/node/pull/2659)
* \[[`74ff9bc86c`](https://github.com/nodejs/node/commit/74ff9bc86c)] - **timers**: 对 _unrefActive 的小修复和改进（Jeremiah Senkpiel） [#2540](https://github.com/nodejs/node/pull/2540)
* \[[`5d14a6eca7`](https://github.com/nodejs/node/commit/5d14a6eca7)] - **timers**: 在遍历 unref 列表时不要修改它（Julien Gilli） [#2540](https://github.com/nodejs/node/pull/2540)
* \[[`6e744c58f2`](https://github.com/nodejs/node/commit/6e744c58f2)] - **timers**: 避免在 _unrefActive 中进行线性扫描。（Julien Gilli） [#2540](https://github.com/nodejs/node/pull/2540)
* \[[`07fbf835ad`](https://github.com/nodejs/node/commit/07fbf835ad)] - **tools**: 以写入二进制模式打开 `test.tap` 文件（Sakthipriyan Vairamani） [#2837](https://github.com/nodejs/node/pull/2837)
* \[[`6d9198f7f1`](https://github.com/nodejs/node/commit/6d9198f7f1)] - **tools**: 添加缺失的 tick processor polyfill（Matt Loring） [#2694](https://github.com/nodejs/node/pull/2694)
* \[[`7b16597527`](https://github.com/nodejs/node/commit/7b16597527)] - **tools**: 修复 test-tick-processor 中的不稳定性（Matt Loring） [#2694](https://github.com/nodejs/node/pull/2694)
* \[[`ef83029356`](https://github.com/nodejs/node/commit/ef83029356)] - **tools**: 移除 TAP 结果中的连字符（Sakthipriyan Vairamani） [#2718](https://github.com/nodejs/node/pull/2718)
* \[[`ac45ef9157`](https://github.com/nodejs/node/commit/ac45ef9157)] - **win,msi**: 修复文档快捷方式 url（Brian White） [#2781](https://github.com/nodejs/node/pull/2781)

<a id="3.3.0"></a>

## 2015-09-02，版本 3.3.0，@rvagg

### 重要变更

* **build**: 在 `configure` 中添加一个 `--link-module` 选项，可用于将额外的 JavaScript 模块打包进构建后的二进制文件中（Bradley Meck） [#2497](https://github.com/nodejs/node/pull/2497)
* **docs**: 合并来自 joyent/node 的未完成文档更新（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* **http\_parser**: 通过让 `http.Server` 消耗来自其 `net.Socket` 的所有初始数据并直接解析，而无需进入 JavaScript，显著提升性能。`net.Socket` 上任何 `'data'` 监听器都会导致数据被“移交”回 JavaScript，从而抵消任何性能收益。（Fedor Indutny） [#2355](https://github.com/nodejs/node/pull/2355)
* **libuv**: 升级到 1.7.3（从 1.6.1 升级），详情请参见 [ChangeLog](https://github.com/libuv/libuv/blob/v1.x/ChangeLog)（Saúl Ibarra Corretgé） [#2310](https://github.com/nodejs/node/pull/2310)
* **V8**: 升级到 4.4.63.30（从 4.4.63.26 升级）（Michaël Zasso） [#2482](https://github.com/nodejs/node/pull/2482)

### 已知问题

完整且最新的已知问题列表请参见 <https://github.com/nodejs/io.js/labels/confirmed-bug>。

* 当前版本的 V8 对某些计算属性对象简写属性的用法处理不正确。例如 `[{ [prop]: val }]` 会求值为 `[{}]`。 [#2507](https://github.com/nodejs/node/issues/2507)
* 仍有一些在 `beforeExit` 期间运行的未引用定时器问题有待解决。参见 [#1264](https://github.com/nodejs/io.js/issues/1264)。
* REPL 中的代理对可能会使终端冻结。 [#690](https://github.com/nodejs/io.js/issues/690)
* `process.send()` 并不像文档所述那样是同步的，这是在 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/io.js/issues/760)。
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/io.js/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 URL 的认证部分，参见 [#1435](https://github.com/nodejs/io.js/issues/1435)。

### 提交

* \[[`1a531b4e44`](https://github.com/nodejs/node/commit/1a531b4e44)] - **(SEMVER-MINOR)** 在 ./configure 中引入 --link-module（Bradley Meck） [#2497](https://github.com/nodejs/node/pull/2497)
* \[[`d2f314c190`](https://github.com/nodejs/node/commit/d2f314c190)] - **build**: 修复发布上传时损坏的 chmod 调用（Rod Vagg） [#2645](https://github.com/nodejs/node/pull/2645)
* \[[`3172e9c541`](https://github.com/nodejs/node/commit/3172e9c541)] - **build**: 在上传前设置文件权限（Rod Vagg） [#2623](https://github.com/nodejs/node/pull/2623)
* \[[`a860d7fae1`](https://github.com/nodejs/node/commit/a860d7fae1)] - **build**: 在新服务器上更改暂存目录（Rod Vagg） [#2623](https://github.com/nodejs/node/pull/2623)
* \[[`50c0baa8d7`](https://github.com/nodejs/node/commit/50c0baa8d7)] - **build**: 将 'doc' 目录重命名为 'docs' 以便上传（Rod Vagg） [#2623](https://github.com/nodejs/node/pull/2623)
* \[[`0a0577cf5f`](https://github.com/nodejs/node/commit/0a0577cf5f)] - **build**: 修复 vcbuild.bat build-release 的错误 cherry-pick（Rod Vagg） [#2625](https://github.com/nodejs/node/pull/2625)
* \[[`34de90194b`](https://github.com/nodejs/node/commit/34de90194b)] - **build**: 仅在非空时定义 NODE\_V8\_OPTIONS（Evan Lucas） [#2532](https://github.com/nodejs/node/pull/2532)
* \[[`944174b189`](https://github.com/nodejs/node/commit/944174b189)] - **build**: 让 ci 在 test/addons 中测试 addons（Ben Noordhuis） [#2428](https://github.com/nodejs/node/pull/2428)
* \[[`e955f9a1b0`](https://github.com/nodejs/node/commit/e955f9a1b0)] - **crypto**: 使用 OPENSSL\_cleanse 销毁数据。（Сковорода Никита Андреевич） [#2575](https://github.com/nodejs/node/pull/2575)
* \[[`395d736b9d`](https://github.com/nodejs/node/commit/395d736b9d)] - **debugger**: 使用严格相等比较（Minwoo Jung） [#2558](https://github.com/nodejs/node/pull/2558)
* \[[`1d0e5210a8`](https://github.com/nodejs/node/commit/1d0e5210a8)] - **deps**: 将 libuv 升级到 1.7.3（Saúl Ibarra Corretgé） [#2310](https://github.com/nodejs/node/pull/2310)
* \[[`34ef53364f`](https://github.com/nodejs/node/commit/34ef53364f)] - **deps**: 将 V8 更新到 4.4.63.30（Michaël Zasso） [#2482](https://github.com/nodejs/node/pull/2482)
* \[[`23579a5f4a`](https://github.com/nodejs/node/commit/23579a5f4a)] - **doc**: 添加 2015-08-12 的 TSC 会议纪要（Rod Vagg） [#2438](https://github.com/nodejs/node/pull/2438)
* \[[`0cc59299a4`](https://github.com/nodejs/node/commit/0cc59299a4)] - **doc**: 添加 2015-08-26 的 TSC 会议纪要（Rod Vagg） [#2591](https://github.com/nodejs/node/pull/2591)
* \[[`6efa96e33a`](https://github.com/nodejs/node/commit/6efa96e33a)] - **doc**: 将 CHANGELOG.md 与 joyent/node 的 ChangeLog 合并（Minqi Pan） [#2536](https://github.com/nodejs/node/pull/2536)
* \[[`f75d54607b`](https://github.com/nodejs/node/commit/f75d54607b)] - **doc**: 阐明在没有 worker 时 cluster 的行为（Jeremiah Senkpiel） [#2606](https://github.com/nodejs/node/pull/2606)
* \[[`8936302121`](https://github.com/nodejs/node/commit/8936302121)] - **doc**: buffer.markdown 中的小幅说明（Сковорода Никита Андреевич） [#2574](https://github.com/nodejs/node/pull/2574)
* \[[`0db0e53753`](https://github.com/nodejs/node/commit/0db0e53753)] - **doc**: 将 @jasnell 和 @sam-github 添加到发布团队（Rod Vagg） [#2455](https://github.com/nodejs/node/pull/2455)
* \[[`c16e100593`](https://github.com/nodejs/node/commit/c16e100593)] - **doc**: 将发布团队重组到单独的章节（Rod Vagg） [#2455](https://github.com/nodejs/node/pull/2455)
* \[[`e3e00143fd`](https://github.com/nodejs/node/commit/e3e00143fd)] - **doc**: 修复 modules.markdown 中错误的合并（James M Snell）
* \[[`2f62455880`](https://github.com/nodejs/node/commit/2f62455880)] - **doc**: 进一步的小幅修正和改进（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`3bd08aac4b`](https://github.com/nodejs/node/commit/3bd08aac4b)] - **doc**: 修正 crypto.markdown 中的轻微语法问题（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`f707189370`](https://github.com/nodejs/node/commit/f707189370)] - **doc**: 轻微语法更新（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`6c98cf0266`](https://github.com/nodejs/node/commit/6c98cf0266)] - **doc**: 删除 globals.markdown 中重复的语句（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`48e6ccf8c2`](https://github.com/nodejs/node/commit/48e6ccf8c2)] - **doc**: 从文档中删除 'dudes'（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`b5d68f8076`](https://github.com/nodejs/node/commit/b5d68f8076)] - **doc**: 更新 child\_process.markdown 中的时态（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`242e3fe3ba`](https://github.com/nodejs/node/commit/242e3fe3ba)] - **doc**: 修正 worker.id 的类型（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`ea9ee15c21`](https://github.com/nodejs/node/commit/ea9ee15c21)] - **doc**: socket.bind() 的 port 是可选的（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`0ff6657a50`](https://github.com/nodejs/node/commit/0ff6657a50)] - **doc**: 修复 fs 文档中的轻微类型和语法问题（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`94d83c04f2`](https://github.com/nodejs/node/commit/94d83c04f2)] - **doc**: 更新 net.markdown 中的参数名称（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`04111ce40f`](https://github.com/nodejs/node/commit/04111ce40f)] - **doc**: domain.markdown 中的小错误（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`c9fdd1bbbf`](https://github.com/nodejs/node/commit/c9fdd1bbbf)] - **doc**: 修复 net.markdown 中的错字（缺少逗号）（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`27c07b3f8e`](https://github.com/nodejs/node/commit/27c07b3f8e)] - **doc**: 更新 fs.markdown 中 fs.exists 的描述（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`52018e73d9`](https://github.com/nodejs/node/commit/52018e73d9)] - **doc**: 对 'close' 事件进行说明（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`f6d3b87a25`](https://github.com/nodejs/node/commit/f6d3b87a25)] - **doc**: 改进 stream.markdown 中的措辞（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`b5da89431a`](https://github.com/nodejs/node/commit/b5da89431a)] - **doc**: 更新 path.extname 文档（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`1d4ea609db`](https://github.com/nodejs/node/commit/1d4ea609db)] - **doc**: 对 modules.markdown 做一些说明性补充（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`c888985591`](https://github.com/nodejs/node/commit/c888985591)] - **doc**: 清理 repl.markdown 中的代码风格（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`105b493595`](https://github.com/nodejs/node/commit/105b493595)] - **doc**: 修正 cluster.markdown 中的语法（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`51b86ccac7`](https://github.com/nodejs/node/commit/51b86ccac7)] - **doc**: 阐明 module.parent 只会被设置一次（James M Snell） [#2378](https://github.com/nodejs/node/pull/2378)
* \[[`d2ffecba2d`](https://github.com/nodejs/node/commit/d2ffecba2d)] - **doc**: 添加内部模块说明（Jeremiah Senkpiel） [#2523](https://github.com/nodejs/node/pull/2523)
* \[[`b36debd5cb`](https://github.com/nodejs/node/commit/b36debd5cb)] - **env**: 引入 `KickNextTick`（Fedor Indutny） [#2355](https://github.com/nodejs/node/pull/2355)
* \[[`1bc446863f`](https://github.com/nodejs/node/commit/1bc446863f)] - **http\_parser**: 消耗 StreamBase 实例（Fedor Indutny） [#2355](https://github.com/nodejs/node/pull/2355)
* \[[`ce04b735cc`](https://github.com/nodejs/node/commit/ce04b735cc)] - **src**: 仅在长度 > 0 时在 Buffer::Compare 中执行 memcmp（Karl Skomski） [#2544](https://github.com/nodejs/node/pull/2544)
* \[[`31823e37c7`](https://github.com/nodejs/node/commit/31823e37c7)] - **src**: 对 getsockname/getpeername 代码进行 DRY 重构（Ben Noordhuis） [#956](https://github.com/nodejs/node/pull/956)
* \[[`13fd96dda3`](https://github.com/nodejs/node/commit/13fd96dda3)] - **src**: node\_http\_parser 中缺少 Exception::Error（Jeremiah Senkpiel） [#2550](https://github.com/nodejs/node/pull/2550)
* \[[`42e075ae02`](https://github.com/nodejs/node/commit/42e075ae02)] - **test**: 提高 stringbytes 测试的性能（Trevor Norris） [#2544](https://github.com/nodejs/node/pull/2544)
* \[[`fc726399fd`](https://github.com/nodejs/node/commit/fc726399fd)] - **test**: 取消将 test-process-argv-0.js 标记为易波动测试（Rich Trott） [#2613](https://github.com/nodejs/node/pull/2613)
* \[[`7727ba1394`](https://github.com/nodejs/node/commit/7727ba1394)] - **test**: 进行 lint 和重构以避免 autocrlf 问题（Roman Reiss） [#2494](https://github.com/nodejs/node/pull/2494)
* \[[`c56aa829f0`](https://github.com/nodejs/node/commit/c56aa829f0)] - **test**: 使用 tmpDir 代替 fixturesDir（Sakthipriyan Vairamani） [#2583](https://github.com/nodejs/node/pull/2583)
* \[[`5e65181ea4`](https://github.com/nodejs/node/commit/5e65181ea4)] - **test**: 正确处理失败情况（Sakthipriyan Vairamani） [#2206](https://github.com/nodejs/node/pull/2206)
* \[[`c48b95e847`](https://github.com/nodejs/node/commit/c48b95e847)] - **test**: 易波动测试的初始列表（Alexis Campailla） [#2424](https://github.com/nodejs/node/pull/2424)
* \[[`94e88498ba`](https://github.com/nodejs/node/commit/94e88498ba)] - **test**: 通过环境变量向 test-ci 传递参数（Alexis Campailla） [#2424](https://github.com/nodejs/node/pull/2424)
* \[[`09987c7a1c`](https://github.com/nodejs/node/commit/09987c7a1c)] - **test**: 在 test-ci 中支持易波动测试（Alexis Campailla） [#2424](https://github.com/nodejs/node/pull/2424)
* \[[`08b83c8b45`](https://github.com/nodejs/node/commit/08b83c8b45)] - **test**: 添加测试配置模板（Alexis Campailla） [#2424](https://github.com/nodejs/node/pull/2424)
* \[[`8f8ab6fa57`](https://github.com/nodejs/node/commit/8f8ab6fa57)] - **test**: runner 在易波动测试时应返回 0（Alexis Campailla） [#2424](https://github.com/nodejs/node/pull/2424)
* \[[`0cfd3be9c6`](https://github.com/nodejs/node/commit/0cfd3be9c6)] - **test**: runner 对易波动测试的支持（Alexis Campailla） [#2424](https://github.com/nodejs/node/pull/2424)
* \[[`3492d2d4c6`](https://github.com/nodejs/node/commit/3492d2d4c6)] - **test**: 让 test-process-argv-0 更健壮（Rich Trott） [#2541](https://github.com/nodejs/node/pull/2541)
* \[[`a96cc31710`](https://github.com/nodejs/node/commit/a96cc31710)] - **test**: 加快 test-child-process-spawnsync.js（Rich Trott） [#2542](https://github.com/nodejs/node/pull/2542)
* \[[`856baf4c67`](https://github.com/nodejs/node/commit/856baf4c67)] - **test**: 使 spawnSync() 测试更健壮（Rich Trott） [#2535](https://github.com/nodejs/node/pull/2535)
* \[[`3aa6bbb648`](https://github.com/nodejs/node/commit/3aa6bbb648)] - **tools**: 更新 release.sh 以适配新网站（Rod Vagg） [#2623](https://github.com/nodejs/node/pull/2623)
* \[[`f2f0fe45ff`](https://github.com/nodejs/node/commit/f2f0fe45ff)] - **tools**: 让 addon 抓取器打印文件名（Ben Noordhuis） [#2428](https://github.com/nodejs/node/pull/2428)
* \[[`bb24c4a418`](https://github.com/nodejs/node/commit/bb24c4a418)] - **win,msi**: 修正安装路径注册表键（João Reis） [#2565](https://github.com/nodejs/node/pull/2565)
* \[[`752977b888`](https://github.com/nodejs/node/commit/752977b888)] - **win,msi**: 将 InstallScope 更改为 perMachine（João Reis） [#2565](https://github.com/nodejs/node/pull/2565)

<a id="3.2.0"></a>

## 2015-08-25，版本 3.2.0，@rvagg

### 重要变更

* **events**: 添加了 `EventEmitter#listenerCount(event)`，作为 `EventEmitter.listenerCount(emitter, event)` 的替代；后者现已在文档中标记为已弃用。(Sakthipriyan Vairamani) [#2349](https://github.com/nodejs/node/pull/2349)
* **module**: 修复了当前工作目录不存在时预加载模块的错误。(Bradley Meck) [#2353](https://github.com/nodejs/node/pull/2353)
* **node**: 在不传递 V8 标志时，启动时间现在大约快 5%。(Evan Lucas) [#2483](https://github.com/nodejs/node/pull/2483)
* **repl**: Tab 补全现在对数组的支持更好了。(James M Snell) [#2409](https://github.com/nodejs/node/pull/2409)
* **string\_bytes**: 修复了 UCS2 编码处理中的一次未对齐写入。(Fedor Indutny) [#2480](https://github.com/nodejs/node/pull/2480)
* **tls**: 新增了 `--tls-cipher-list` 标志，可用于覆盖内置的默认密码套件列表。(James M Snell) [#2412](https://github.com/nodejs/node/pull/2412) _注意：建议使用内置的密码套件列表，因为它经过精心挑选，以反映当前的安全最佳实践和风险缓解。_

### 已知问题

有关已知问题的完整且最新列表，请参见 <https://github.com/nodejs/io.js/labels/confirmed-bug>。

* 当前版本的 V8 不能正确处理某些计算对象简写属性的用法。例如：`[{ [prop]: val }]` 的求值结果为 `[{}]`。[#2507](https://github.com/nodejs/node/issues/2507)
* `beforeExit` 期间运行的一些未被引用的定时器问题仍有待解决。参见 [#1264](https://github.com/nodejs/io.js/issues/1264)。
* REPL 中的代理对可能会冻结终端。[#690](https://github.com/nodejs/io.js/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/io.js/issues/760)。
* 在 DNS 查询进行中调用 `dns.setServers()`，如果断言失败，可能导致进程崩溃。[#894](https://github.com/nodejs/io.js/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会传递 url 的认证部分，参见 [#1435](https://github.com/nodejs/io.js/issues/1435)。

### 提交

* \[[`1cd794f129`](https://github.com/nodejs/node/commit/1cd794f129)] - **buffer**: 重新应用 07c0667 (Fedor Indutny) [#2487](https://github.com/nodejs/node/pull/2487)
* \[[`156781dedd`](https://github.com/nodejs/node/commit/156781dedd)] - **build**: 在 android-configure 中使用所需平台 (Evan Lucas) [#2501](https://github.com/nodejs/node/pull/2501)
* \[[`77075ec906`](https://github.com/nodejs/node/commit/77075ec906)] - **crypto**: 修复 ExportChallenge 中的内存 {分配/释放} (Karl Skomski) [#2359](https://github.com/nodejs/node/pull/2359)
* \[[`cb30414d9e`](https://github.com/nodejs/node/commit/cb30414d9e)] - **doc**: 从 master 同步 CHANGELOG.md (Roman Reiss) [#2524](https://github.com/nodejs/node/pull/2524)
* \[[`9330f5ef45`](https://github.com/nodejs/node/commit/9330f5ef45)] - **doc**: 使弃用项保持一致 (Sakthipriyan Vairamani) [#2450](https://github.com/nodejs/node/pull/2450)
* \[[`09437e0146`](https://github.com/nodejs/node/commit/09437e0146)] - **doc**: 修复 tls\_wrap.cc 和 \_http\_client.js 中的注释 (Minwoo Jung) [#2489](https://github.com/nodejs/node/pull/2489)
* \[[`c9867fed29`](https://github.com/nodejs/node/commit/c9867fed29)] - **doc**: 在 http.markdown 中记录 response.finished (hackerjs) [#2414](https://github.com/nodejs/node/pull/2414)
* \[[`7f23a83c42`](https://github.com/nodejs/node/commit/7f23a83c42)] - **doc**: 更新 AUTHORS 列表 (Rod Vagg) [#2505](https://github.com/nodejs/node/pull/2505)
* \[[`cd0c362f67`](https://github.com/nodejs/node/commit/cd0c362f67)] - **doc**: 更新 AUTHORS 列表 (Rod Vagg) [#2318](https://github.com/nodejs/node/pull/2318)
* \[[`2c7b9257ea`](https://github.com/nodejs/node/commit/2c7b9257ea)] - **doc**: 添加 TSC 会议纪要 2015-07-29 (Rod Vagg) [#2437](https://github.com/nodejs/node/pull/2437)
* \[[`aaefde793e`](https://github.com/nodejs/node/commit/aaefde793e)] - **doc**: 添加 TSC 会议纪要 2015-08-19 (Rod Vagg) [#2460](https://github.com/nodejs/node/pull/2460)
* \[[`51ef9106f5`](https://github.com/nodejs/node/commit/51ef9106f5)] - **doc**: 添加 TSC 会议纪要 2015-06-03 (Rod Vagg) [#2453](https://github.com/nodejs/node/pull/2453)
* \[[`7130b4cf1d`](https://github.com/nodejs/node/commit/7130b4cf1d)] - **doc**: 修复指向原始合并仓库的链接 (Rod Vagg) [#2454](https://github.com/nodejs/node/pull/2454)
* \[[`14f2aee1df`](https://github.com/nodejs/node/commit/14f2aee1df)] - **doc**: 修复 TSC 会议中指向原始 gh issues 的链接 (Rod Vagg) [#2454](https://github.com/nodejs/node/pull/2454)
* \[[`87a9ef0a40`](https://github.com/nodejs/node/commit/87a9ef0a40)] - **doc**: 为 TSC 会议纪要添加音频录音链接 (Rod Vagg) [#2454](https://github.com/nodejs/node/pull/2454)
* \[[`f5cf24afbc`](https://github.com/nodejs/node/commit/f5cf24afbc)] - **doc**: 添加 TSC 会议纪要 2015-07-22 (Rod Vagg) [#2436](https://github.com/nodejs/node/pull/2436)
* \[[`3f821b96eb`](https://github.com/nodejs/node/commit/3f821b96eb)] - **doc**: 修复 node.js 注释中的拼写错误 (Jacob Edelman) [#2391](https://github.com/nodejs/node/pull/2391)
* \[[`3e6a6fcdd6`](https://github.com/nodejs/node/commit/3e6a6fcdd6)] - **(SEMVER-MINOR)** **events**: 弃用静态 listenerCount 函数 (Sakthipriyan Vairamani) [#2349](https://github.com/nodejs/node/pull/2349)
* \[[`023386c852`](https://github.com/nodejs/node/commit/023386c852)] - **fs**: 用具体错误消息替换 bad\_args 宏 (Roman Klauke) [#2495](https://github.com/nodejs/node/pull/2495)
* \[[`d1c27b2e29`](https://github.com/nodejs/node/commit/d1c27b2e29)] - **module**: 修复 cwd 为 ENOENT 时的模块预加载 (Bradley Meck) [#2353](https://github.com/nodejs/node/pull/2353)
* \[[`5d7486941b`](https://github.com/nodejs/node/commit/5d7486941b)] - **repl**: 从 repl tab 补全列表中过滤整数键 (James M Snell) [#2409](https://github.com/nodejs/node/pull/2409)
* \[[`7f02443a9a`](https://github.com/nodejs/node/commit/7f02443a9a)] - **repl**: 不要在 NODE\_REPL\_HISTORY\_FILE 上抛出 ENOENT (Todd Kennedy) [#2451](https://github.com/nodejs/node/pull/2451)
* \[[`56a2ae9cef`](https://github.com/nodejs/node/commit/56a2ae9cef)] - **src**: 改进启动时间 (Evan Lucas) [#2483](https://github.com/nodejs/node/pull/2483)
* \[[`14653c7429`](https://github.com/nodejs/node/commit/14653c7429)] - **stream**: 重命名一个命名不佳的函数 (Ben Noordhuis) [#2479](https://github.com/nodejs/node/pull/2479)
* \[[`1c6e014bfa`](https://github.com/nodejs/node/commit/1c6e014bfa)] - **stream**: 对 high water mark 计算进行微优化 (Ben Noordhuis) [#2479](https://github.com/nodejs/node/pull/2479)
* \[[`f1f4b4c46d`](https://github.com/nodejs/node/commit/f1f4b4c46d)] - **stream**: 修复注释中相差 16 倍的错误 (Ben Noordhuis) [#2479](https://github.com/nodejs/node/pull/2479)
* \[[`2d3f09bd76`](https://github.com/nodejs/node/commit/2d3f09bd76)] - **stream_base**: 多项改进 (Fedor Indutny) [#2351](https://github.com/nodejs/node/pull/2351)
* \[[`c1ce423b35`](https://github.com/nodejs/node/commit/c1ce423b35)] - **string\_bytes**: 修复 UCS2 中未对齐写入 (Fedor Indutny) [#2480](https://github.com/nodejs/node/pull/2480)
* \[[`e4d0e86165`](https://github.com/nodejs/node/commit/e4d0e86165)] - **test**: 重构 test-https-simple.js (Rich Trott) [#2433](https://github.com/nodejs/node/pull/2433)
* \[[`0ea5c8d737`](https://github.com/nodejs/node/commit/0ea5c8d737)] - **test**: 移除 test-timers-first-fire (João Reis) [#2458](https://github.com/nodejs/node/pull/2458)
* \[[`536c3d0537`](https://github.com/nodejs/node/commit/536c3d0537)] - **test**: 在 test-net-connect-timeout 中使用保留 IP (Rich Trott) [#2257](https://github.com/nodejs/node/pull/2257)
* \[[`5df06fd8df`](https://github.com/nodejs/node/commit/5df06fd8df)] - **test**: 在关键字后添加空格 (Brendan Ashworth)
* \[[`e714b5620e`](https://github.com/nodejs/node/commit/e714b5620e)] - **test**: 移除不可达代码 (Michaël Zasso) [#2289](https://github.com/nodejs/node/pull/2289)
* \[[`3579f3a2a4`](https://github.com/nodejs/node/commit/3579f3a2a4)] - **test**: 禁止不可达代码 (Michaël Zasso) [#2289](https://github.com/nodejs/node/pull/2289)
* \[[`3545e236fc`](https://github.com/nodejs/node/commit/3545e236fc)] - **test**: 减少 test-net-keepalive 中的超时时间 (Brendan Ashworth) [#2429](https://github.com/nodejs/node/pull/2429)
* \[[`b60e690023`](https://github.com/nodejs/node/commit/b60e690023)] - **test**: 改进 test-net-server-pause-on-connect (Brendan Ashworth) [#2429](https://github.com/nodejs/node/pull/2429)
* \[[`11d1b8fcaf`](https://github.com/nodejs/node/commit/11d1b8fcaf)] - **test**: 改进 test-net-pingpong (Brendan Ashworth) [#2429](https://github.com/nodejs/node/pull/2429)
* \[[`5fef5c6562`](https://github.com/nodejs/node/commit/5fef5c6562)] - **(SEMVER-MINOR)** **tls**: 添加 --tls-cipher-list 命令行开关 (James M Snell) [#2412](https://github.com/nodejs/node/pull/2412)
* \[[`d9b70f9cbf`](https://github.com/nodejs/node/commit/d9b70f9cbf)] - **tls**: 处理 checkServerIndentity 中的空证书 (Mike Atkins) [#2343](https://github.com/nodejs/node/pull/2343)
* \[[`4f8e34c202`](https://github.com/nodejs/node/commit/4f8e34c202)] - **tools**: 为 check-imports.sh 添加许可证说明 (James M Snell) [#2386](https://github.com/nodejs/node/pull/2386)
* \[[`b76b9197f9`](https://github.com/nodejs/node/commit/b76b9197f9)] - **tools**: 在 eslint 中启用 space-after-keywords (Brendan Ashworth)
* \[[`64a8f30a70`](https://github.com/nodejs/node/commit/64a8f30a70)] - **tools**: 修复生成文档中的锚点 (Sakthipriyan Vairamani) [#2491](https://github.com/nodejs/node/pull/2491)
* \[[`22e344ea10`](https://github.com/nodejs/node/commit/22e344ea10)] - **win**: 修复 3.9 之前版本 WiX 的自定义操作 (João Reis) [#2365](https://github.com/nodejs/node/pull/2365)
* \[[`b5bd3ebfc8`](https://github.com/nodejs/node/commit/b5bd3ebfc8)] - **win**: 修复 Visual Studio != 2013 上的自定义操作 (Julien Gilli) [#2365](https://github.com/nodejs/node/pull/2365)

<a id="3.1.0"></a>

## 2015-08-18，版本 3.1.0，@Fishrock123

### 重要变更

* **buffer**：修复了几个较大的内存泄漏（Ben Noordhuis） [#2352](https://github.com/nodejs/node/pull/2352)。
* **crypto**：
  * 修复了几个较小的内存泄漏（Karl Skomski） [#2375](https://github.com/nodejs/node/pull/2375)。
  * 签名现在会检查 OpenSSL 错误（Minqi Pan） [#2342](https://github.com/nodejs/node/pull/2342)。**请注意，这可能会暴露用户代码中此前被隐藏的错误。**
* **intl**：使用 small-icu 的 Intl 支持现已在构建中默认启用（Steven R. Loomis） [#2264](https://github.com/nodejs/node/pull/2264)。
  * 现在可以使用 [`String#normalize()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) 进行 Unicode 规范化。
  * [`Intl`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl) 对象以及各种 `String` 和 `Number` 方法都已提供，但仅支持英语区域设置。
  * 如需支持所有区域设置，必须使用 [full-icu](https://github.com/nodejs/node#build-with-full-icu-support-all-locales-supported-by-icu) 构建 node。
* **tls**：修复了因一次错误合并导致的 tls 吞吐量大幅下降问题（Fedor Indutny） [#2381](https://github.com/nodejs/node/pull/2381)。
* **tools**：v8 tick processor 现在随 node 一起打包提供（Matt Loring） [#2090](https://github.com/nodejs/node/pull/2090)。
  * 这可以通过运行带有 `--perf` 的 node 来生成性能分析输出，然后在输出文件上运行对应平台的脚本来使用，脚本位于 [tools/v8-prof](https://github.com/nodejs/node/tree/master/tools/v8-prof)。
* **util**：`util.inspect(obj)` 现在在对象存在构造函数时会打印该构造函数名称（Christopher Monsanto） [#1935](https://github.com/nodejs/io.js/pull/1935)。

### 已知问题

请参见 <https://github.com/nodejs/io.js/labels/confirmed-bug> 获取已知问题的完整且最新列表。

* `beforeExit` 期间运行未引用的定时器仍有一些问题尚待解决。参见 [#1264](https://github.com/nodejs/io.js/issues/1264)。
* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/io.js/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/io.js/issues/760)。
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会因断言失败导致进程崩溃。 [#894](https://github.com/nodejs/io.js/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会传递 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/io.js/issues/1435)。

### 提交

* \[[`3645dc62ed`](https://github.com/nodejs/node/commit/3645dc62ed)] - **build**：绕过 ICU <56 中的 VS2015 问题（Steven R. Loomis） [#2283](https://github.com/nodejs/node/pull/2283)
* \[[`1f12e03266`](https://github.com/nodejs/node/commit/1f12e03266)] - **(SEMVER-MINOR)** **build**：intl：从 joyent/node 收敛而来（Steven R. Loomis） [#2264](https://github.com/nodejs/node/pull/2264)
* \[[`071640abdd`](https://github.com/nodejs/node/commit/071640abdd)] - **build**：Intl：将 ICU4C 从 54 升级到 55（Steven R. Loomis） [#2293](https://github.com/nodejs/node/pull/2293)
* \[[`07a88b0c8b`](https://github.com/nodejs/node/commit/07a88b0c8b)] - **build**：更新清单以包含 Windows 10（Lucien Greathouse） [#2332](https://github.com/nodejs/io.js/pull/2332)
* \[[`0bb099f444`](https://github.com/nodejs/node/commit/0bb099f444)] - **build**：在安装前缀中尽早展开 \~（Ben Noordhuis） [#2307](https://github.com/nodejs/io.js/pull/2307)
* \[[`7fe6dd8f5d`](https://github.com/nodejs/node/commit/7fe6dd8f5d)] - **crypto**：在签名时检查 OpenSSL 错误（Minqi Pan） [#2342](https://github.com/nodejs/node/pull/2342)
* \[[`605f6ee904`](https://github.com/nodejs/node/commit/605f6ee904)] - **crypto**：修复 PBKDF2Request 中的内存泄漏（Karl Skomski） [#2375](https://github.com/nodejs/node/pull/2375)
* \[[`ba6eb8af12`](https://github.com/nodejs/node/commit/ba6eb8af12)] - **crypto**：修复 ECDH::SetPrivateKey 中的内存泄漏（Karl Skomski） [#2375](https://github.com/nodejs/node/pull/2375)
* \[[`6a16368611`](https://github.com/nodejs/node/commit/6a16368611)] - **crypto**：修复 PublicKeyCipher::Cipher 中的内存泄漏（Karl Skomski） [#2375](https://github.com/nodejs/node/pull/2375)
* \[[`a760a87803`](https://github.com/nodejs/node/commit/a760a87803)] - **crypto**：修复 SafeX509ExtPrint 中的内存泄漏（Karl Skomski） [#2375](https://github.com/nodejs/node/pull/2375)
* \[[`f45487cd6e`](https://github.com/nodejs/node/commit/f45487cd6e)] - **crypto**：修复 SetDHParam 中的内存泄漏（Karl Skomski） [#2375](https://github.com/nodejs/node/pull/2375)
* \[[`2ff183dd86`](https://github.com/nodejs/node/commit/2ff183dd86)] - **doc**：更新 README.md 中的 FIPS 说明（Michael Dawson） [#2278](https://github.com/nodejs/node/pull/2278)
* \[[`6483bc2e8f`](https://github.com/nodejs/node/commit/6483bc2e8f)] - **doc**：澄清 fs.watchFile() 的选项（Rich Trott） [#2425](https://github.com/nodejs/node/pull/2425)
* \[[`e76822f454`](https://github.com/nodejs/node/commit/e76822f454)] - **doc**：从 v0.12 中挑选出的多项文档更新（James M Snell） [#2302](https://github.com/nodejs/io.js/pull/2302)
* \[[`1738c9680b`](https://github.com/nodejs/node/commit/1738c9680b)] - **net**：确保 Socket 报告的地址是当前地址（Ryan Graham） [#2095](https://github.com/nodejs/io.js/pull/2095)
* \[[`844d3f0e3e`](https://github.com/nodejs/node/commit/844d3f0e3e)] - **path**：比较时使用 '===' 而不是 '=='（Sam Stites） [#2388](https://github.com/nodejs/node/pull/2388)
* \[[`7118b8a882`](https://github.com/nodejs/node/commit/7118b8a882)] - **path**：移除死代码，改用单元测试（Nathan Woltman） [#2282](https://github.com/nodejs/io.js/pull/2282)
* \[[`34f2cfa806`](https://github.com/nodejs/node/commit/34f2cfa806)] - **src**：Buffer malloc 失败时提供更好的错误消息（Karl Skomski） [#2422](https://github.com/nodejs/node/pull/2422)
* \[[`b196c1da3c`](https://github.com/nodejs/node/commit/b196c1da3c)] - **src**：修复 DLOpen 中的内存泄漏（Karl Skomski） [#2375](https://github.com/nodejs/node/pull/2375)
* \[[`d1307b2995`](https://github.com/nodejs/node/commit/d1307b2995)] - **src**：不要在 require() 快速路径中使用 fopen()（Ben Noordhuis） [#2377](https://github.com/nodejs/node/pull/2377)
* \[[`455ec570d1`](https://github.com/nodejs/node/commit/455ec570d1)] - **src**：将 Buffer::Use() 重命名为 Buffer::New()（Ben Noordhuis） [#2352](https://github.com/nodejs/node/pull/2352)
* \[[`fd63e1ce2b`](https://github.com/nodejs/node/commit/fd63e1ce2b)] - **src**：引入内部的 Buffer::Copy() 函数（Ben Noordhuis） [#2352](https://github.com/nodejs/node/pull/2352)
* \[[`5586ceca13`](https://github.com/nodejs/node/commit/5586ceca13)] - **src**：将内部函数移出 node_buffer.h（Ben Noordhuis） [#2352](https://github.com/nodejs/node/pull/2352)
* \[[`bff9bcddb6`](https://github.com/nodejs/node/commit/bff9bcddb6)] - **src**：清理内存泄漏（Ben Noordhuis） [#2352](https://github.com/nodejs/node/pull/2352)
* \[[`ccf12df4f3`](https://github.com/nodejs/node/commit/ccf12df4f3)] - **(SEMVER-MINOR)** **src**：向 v8 统计信息添加 total_available_size（Roman Klauke） [#2348](https://github.com/nodejs/io.js/pull/2348)
* \[[`194eeb841b`](https://github.com/nodejs/node/commit/194eeb841b)] - **test**：从 addon 测试中移除 Isolate::GetCurrent()（Ben Noordhuis） [#2427](https://github.com/nodejs/node/pull/2427)
* \[[`46cdb2f6e2`](https://github.com/nodejs/node/commit/46cdb2f6e2)] - **test**：为 addon 测试添加 lint（Ben Noordhuis） [#2427](https://github.com/nodejs/node/pull/2427)
* \[[`850c794882`](https://github.com/nodejs/node/commit/850c794882)] - **test**：重构 test-fs-watchfile.js（Rich Trott） [#2393](https://github.com/nodejs/node/pull/2393)
* \[[`a3160c0a33`](https://github.com/nodejs/node/commit/a3160c0a33)] - **test**：修正 'childProcess' 的拼写（muddletoes） [#2389](https://github.com/nodejs/node/pull/2389)
* \[[`e51f90d747`](https://github.com/nodejs/node/commit/e51f90d747)] - **test**：增加运行测试子集的选项（João Reis） [#2260](https://github.com/nodejs/io.js/pull/2260)
* \[[`cc46d3bca3`](https://github.com/nodejs/node/commit/cc46d3bca3)] - **test**：澄清 dropMembership() 调用（Rich Trott） [#2062](https://github.com/nodejs/io.js/pull/2062)
* \[[`0ee4df9c7a`](https://github.com/nodejs/node/commit/0ee4df9c7a)] - **test**：使 listen-fd-cluster/server 更健壮（Sam Roberts） [#1944](https://github.com/nodejs/io.js/pull/1944)
* \[[`cf9ba81398`](https://github.com/nodejs/node/commit/cf9ba81398)] - **test**：处理简单 http 测试中的时序问题（Gireesh Punathil） [#2294](https://github.com/nodejs/io.js/pull/2294)
* \[[`cbb75c4f86`](https://github.com/nodejs/node/commit/cbb75c4f86)] - **tls**：修复在错误合并后出现的吞吐量问题（Fedor Indutny） [#2381](https://github.com/nodejs/node/pull/2381)
* \[[`94b765f409`](https://github.com/nodejs/node/commit/94b765f409)] - **tls**：修复对重用会话的检查（Fedor Indutny） [#2312](https://github.com/nodejs/io.js/pull/2312)
* \[[`e83a41ad65`](https://github.com/nodejs/node/commit/e83a41ad65)] - **tls**：引入内部 `onticketkeycallback`（Fedor Indutny） [#2312](https://github.com/nodejs/io.js/pull/2312)
* \[[`fb0f5d733f`](https://github.com/nodejs/node/commit/fb0f5d733f)] - **(SEMVER-MINOR)** **tools**：无需构建 v8 即可运行 tick processor（Matt Loring） [#2090](https://github.com/nodejs/node/pull/2090)
* \[[`7606bdb897`](https://github.com/nodejs/node/commit/7606bdb897)] - **(SEMVER-MINOR)** **util**：在检查对象时显示构造函数（Christopher Monsanto） [#1935](https://github.com/nodejs/io.js/pull/1935)

<a id="3.0.0"></a>

## 2015-08-04，版本 3.0.0，@rvagg

### 重要变更

* **buffer**：
  * 由于 V8 的变更，必须在 V8 的 `Uint8Array` 之上重新实现 `Buffer`。我们已尽一切努力将性能影响降到最低，但 `Buffer` 的实例化速度仍可测地变慢。在某些情况下访问操作可能更快，但确切的性能表现以及相较于之前版本的差异将取决于应用中如何使用 `Buffer`。（Trevor Norris） [#1825](https://github.com/nodejs/node/pull/1825)。
  * `Buffer` 现在可以将 `ArrayBuffer` 作为构造函数参数（Trevor Norris） [#2002](https://github.com/nodejs/node/pull/2002)。
  * 当向 `Buffer.concat()` 传入单个 buffer 时，将返回一个新的、复制过的 `Buffer` 对象；之前的行为是返回原始 `Buffer` 对象（Sakthipriyan Vairamani） [#1937](https://github.com/nodejs/node/pull/1937)。
* **build**：已向核心添加 PPC 支持，以便在 pLinux BE 和 LE 上编译（AIX 支持即将到来）（Michael Dawson） [#2124](https://github.com/nodejs/node/pull/2124)。
* **dgram**：如果在 `socket.send()` 内部发生错误且已提供回调，则错误只会作为第一个参数传递给回调，不会在 `socket` 对象上触发；之前的行为是两者都会发生（Matteo Collina & Chris Dickinson） [#1796](https://github.com/nodejs/node/pull/1796)
* **freelist**：弃用未文档化的 `freelist` 核心模块（Sakthipriyan Vairamani） [#2176](https://github.com/nodejs/node/pull/2176)。
* **http**：
  * 状态码现在均使用官方 [IANA 名称](https://www.iana.org/assignments/http-status-codes)，符合 [RFC7231](https://tools.ietf.org/html/rfc7231)，例如 `http.STATUS_CODES[414]` 现在返回 `'URI Too Long'`，而不是 `'Request-URI Too Large'`（jomo） [#1470](https://github.com/nodejs/node/pull/1470)。
  * 对 HTTP agent 调用 `.getName()` 时不再返回末尾冒号，HTTPS agents 也不再在字符串中部额外返回一个冒号（Brendan Ashworth） [#1617](https://github.com/nodejs/node/pull/1617)。
* **node**：
  * `NODE_MODULE_VERSION` 已提升到 `45`，以反映 ABI 的破坏性变化（Rod Vagg） [#2096](https://github.com/nodejs/node/pull/2096)。
  * 引入新的 `process.release` 对象，其中包含值为 `'io.js'` 的 `name` 属性，以及包含相关资源 URL 的 `sourceUrl`、`headersUrl` 和 `libUrl`（仅 Windows）属性；这是为了供 node-gyp 使用（Rod Vagg） [#2154](https://github.com/nodejs/node/pull/2154)。
  * io.js 中捆绑的 node-gyp 版本现在会下载并使用来自 iojs.org 的头文件 tar 包进行原生插件编译，而不是使用完整源码；希望这只是一个临时的浮动补丁，并且很快会向上游提交到 node-gyp（Rod Vagg） [#2066](https://github.com/nodejs/node/pull/2066)。
* **repl**：现在默认启用持久化历史记录。历史文件位于 \~/.node\_repl\_history，可通过新的环境变量 `NODE_REPL_HISTORY` 覆盖。这取代了之前的 `NODE_REPL_HISTORY_FILE` 变量。此外，为了更好地处理文件损坏，文件格式已改为纯文本。（Jeremiah Senkpiel） [#2224](https://github.com/nodejs/node/pull/2224)。
* **smalloc**：`smalloc` 模块已被移除，因为由于 V8 的变更，已不再能够提供该 API（Ben Noordhuis） [#2022](https://github.com/nodejs/node/pull/2022)。
* **tls**：添加 `server.getTicketKeys()` 和 `server.setTicketKeys()` 方法，用于 [TLS 会话密钥](https://www.ietf.org/rfc/rfc5077.txt)轮换（Fedor Indutny） [#2227](https://github.com/nodejs/node/pull/2227)。
* **v8**：升级到 4.4.63.26
  * ES6：启用[计算属性名](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)
  * ES6：`Array` 现在可以在 strict mode 下被继承
  * ES6：在 staging 中实现[剩余参数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters)，使用 `--harmony-rest-parameters` 命令行标志
  * ES6：在 staging 中实现[展开运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)，使用 `--harmony-spreadcalls` 命令行标志
  * 移除了 `SetIndexedPropertiesToExternalArrayData` 及相关 API，迫使 `Buffer` 基于 `Uint8Array` 重新实现
  * 为可能有值或可能没有值的对象引入 `Maybe` 和 `MaybeLocal` C++ API。
  * 增加了对 PPC 的支持

另请参见 <https://github.com/nodejs/node/wiki/Breaking-Changes#300-from-2x> 获取破坏性变更摘要（SEMVER-MAJOR）。

### 已知问题

请参见 <https://github.com/nodejs/node/labels/confirmed-bug> 获取已知问题的完整且最新列表。

* `beforeExit` 期间运行未引用的定时器仍有一些问题尚待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)。
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会因断言失败导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会传递 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`60a974d200`](https://github.com/nodejs/node/commit/60a974d200)] - **buffer**：修复缺少的 null/undefined 检查（Trevor Norris） [#2195](https://github.com/nodejs/node/pull/2195)
* \[[`e6ab2d92bc`](https://github.com/nodejs/node/commit/e6ab2d92bc)] - **buffer**：修复出错时未返回的问题（Trevor Norris） [#2225](https://github.com/nodejs/node/pull/2225)
* \[[`1057d1186b`](https://github.com/nodejs/node/commit/1057d1186b)] - **buffer**：将 internal/buffer_new\.js 重命名为 buffer.js（Ben Noordhuis） [#2022](https://github.com/nodejs/node/pull/2022)
* \[[`4643b8b667`](https://github.com/nodejs/node/commit/4643b8b667)] - **(SEMVER-MINOR)** **buffer**：允许将 ArrayBuffer 作为 Buffer 参数（Trevor Norris） [#2002](https://github.com/nodejs/node/pull/2002)
* \[[`e5ada116cd`](https://github.com/nodejs/node/commit/e5ada116cd)] - **buffer**：从 rebase 中进行的小幅清理（Trevor Norris） [#2003](https://github.com/nodejs/node/pull/2003)
* \[[`b625ab4242`](https://github.com/nodejs/node/commit/b625ab4242)] - **buffer**：修复 kMaxLength 的使用（Trevor Norris） [#2003](https://github.com/nodejs/node/pull/2003)
* \[[`eea66e2a7b`](https://github.com/nodejs/node/commit/eea66e2a7b)] - **(SEMVER-MAJOR)** **buffer**：修复向 concat 传入单个 buffer 的情况（Sakthipriyan Vairamani） [#1937](https://github.com/nodejs/node/pull/1937)
* \[[`8664084166`](https://github.com/nodejs/node/commit/8664084166)] - **buffer**：对原生 API 做进一步修改（Trevor Norris） [#1825](https://github.com/nodejs/node/pull/1825)
* \[[`36f78f4c1c`](https://github.com/nodejs/node/commit/36f78f4c1c)] - **buffer**：将 API 切换为返回 MaybeLocal\<T>（Trevor Norris） [#1825](https://github.com/nodejs/node/pull/1825)
* \[[`571ec13841`](https://github.com/nodejs/node/commit/571ec13841)] - **buffer**：切换为使用 Maybe\<T> API（Trevor Norris） [#1825](https://github.com/nodejs/node/pull/1825)
* \[[`d75f5c8d0e`](https://github.com/nodejs/node/commit/d75f5c8d0e)] - **buffer**：完成 FreeCallback 的实现（Trevor Norris） [#1825](https://github.com/nodejs/node/pull/1825)
* \[[`63da0dfd3a`](https://github.com/nodejs/node/commit/63da0dfd3a)] - **buffer**：实现由 Uint8Array 支持的 Buffer（Trevor Norris） [#1825](https://github.com/nodejs/node/pull/1825)
* \[[`23be6ca189`](https://github.com/nodejs/node/commit/23be6ca189)] - **buffer**：允许 ARGS_THIS 接受名称（Trevor Norris） [#1825](https://github.com/nodejs/node/pull/1825)
* \[[`971de5e417`](https://github.com/nodejs/node/commit/971de5e417)] - **build**：为 i18n 支持准备 Windows 安装程序（Frederic Hemberger） [#2247](https://github.com/nodejs/node/pull/2247)
* \[[`2ba8b23661`](https://github.com/nodejs/node/commit/2ba8b23661)] - **build**：在 configure 中重新加入 'x86' 选项（Rod Vagg） [#2233](https://github.com/nodejs/node/pull/2233)
* \[[`b4226e797a`](https://github.com/nodejs/node/commit/b4226e797a)] - **build**：为启用 PPC 支持所做的首批更新（Michael Dawson） [#2124](https://github.com/nodejs/node/pull/2124)
* \[[`24dd016deb`](https://github.com/nodejs/node/commit/24dd016deb)] - **build**：在 Windows 上生成符号映射文件（Ali Ijaz Sheikh） [#2243](https://github.com/nodejs/node/pull/2243)
* \[[`423d8944ce`](https://github.com/nodejs/node/commit/423d8944ce)] - **cluster**：不要无条件设置 --debug-port（cjihrig） [#1949](https://github.com/nodejs/node/pull/1949)
* \[[`fa98b97171`](https://github.com/nodejs/node/commit/fa98b97171)] - **cluster**：在 rr 模式中添加 handle ref/unref 占位实现（Ben Noordhuis） [#2274](https://github.com/nodejs/node/pull/2274)
* \[[`944f68046c`](https://github.com/nodejs/node/commit/944f68046c)] - **crypto**：移除 randomBytes() 上的 kMaxLength（Trevor Norris） [#1825](https://github.com/nodejs/node/pull/1825)
* \[[`3d3c687012`](https://github.com/nodejs/node/commit/3d3c687012)] - **deps**：将 V8 更新到 4.4.63.26（Michaël Zasso） [#2220](https://github.com/nodejs/node/pull/2220)
* \[[`3aad4fa89a`](https://github.com/nodejs/node/commit/3aad4fa89a)] - **deps**：将 v8 升级到 4.4.63.12（Ben Noordhuis） [#2092](https://github.com/nodejs/node/pull/2092)
* \[[`70d1f32f56`](https://github.com/nodejs/node/commit/70d1f32f56)] - **(SEMVER-MAJOR)** **deps**：将 v8 更新到 4.4.63.9（Ben Noordhuis） [#2022](https://github.com/nodejs/node/pull/2022)
* \[[`deb7ee93a7`](https://github.com/nodejs/node/commit/deb7ee93a7)] - **deps**：从 v8 上游回移植 7b24219346（Rod Vagg） [#1805](https://github.com/nodejs/node/pull/1805)
* \[[`d58e780504`](https://github.com/nodejs/node/commit/d58e780504)] - **(SEMVER-MAJOR)** **deps**：将 v8 更新到 4.3.61.21（Chris Dickinson） [iojs/io.js#1632](https://github.com/iojs/io.js/pull/1632)
* \[[`2a63cf612b`](https://github.com/nodejs/node/commit/2a63cf612b)] - **deps**：使 node-gyp 可与 io.js 协同工作（cjihrig） [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`bf63266460`](https://github.com/nodejs/node/commit/bf63266460)] - **deps**：升级到 npm 2.13.3（Kat Marchán） [#2284](https://github.com/nodejs/node/pull/2284)
* \[[`ef2c8cd4ec`](https://github.com/nodejs/node/commit/ef2c8cd4ec)] - **(SEMVER-MAJOR)** **dgram**：使 send 回调充当 "error" 事件处理器（Matteo Collina） [#1796](https://github.com/nodejs/node/pull/1796)
* \[[`3da057fef6`](https://github.com/nodejs/node/commit/3da057fef6)] - **(SEMVER-MAJOR)** **dgram**：使 send 回调充当 "error" 事件处理器（Chris Dickinson） [#1796](https://github.com/nodejs/node/pull/1796)
* \[[`df1994fe53`](https://github.com/nodejs/node/commit/df1994fe53)] - _**Revert**_ "**dns**：移除 FreeBSD 上的 AI_V4MAPPED 提示标志"（cjihrig） [iojs/io.js#1555](https://github.com/iojs/io.js/pull/1555)
* \[[`1721968b22`](https://github.com/nodejs/node/commit/1721968b22)] - **doc**：记录 repl 持久化历史变更（Jeremiah Senkpiel） [#2224](https://github.com/nodejs/node/pull/2224)
* \[[`d12df7f159`](https://github.com/nodejs/node/commit/d12df7f159)] - **doc**：更新手册页中的 v8 标志（Michaël Zasso） [iojs/io.js#1701](https://github.com/iojs/io.js/pull/1701)
* \[[`d168d01b04`](https://github.com/nodejs/node/commit/d168d01b04)] - **doc**：正确地继承自 EventEmitter（Sakthipriyan Vairamani） [#2168](https://github.com/nodejs/node/pull/2168)
* \[[`500f2538cc`](https://github.com/nodejs/node/commit/500f2538cc)] - **doc**：是 listener，不是 "an" listener（Sam Roberts） [#1025](https://github.com/nodejs/node/pull/1025)
* \[[`54627a919d`](https://github.com/nodejs/node/commit/54627a919d)] - **doc**：server close 事件没有参数（Sam Roberts） [#1025](https://github.com/nodejs/node/pull/1025)
* \[[`ed85c95a9c`](https://github.com/nodejs/node/commit/ed85c95a9c)] - **doc,test**：记录不存在文件的行为（Sakthipriyan Vairamani） [#2169](https://github.com/nodejs/node/pull/2169)
* \[[`2965442308`](https://github.com/nodejs/node/commit/2965442308)] - **(SEMVER-MAJOR)** **http**：修复 agent.getName() 并添加测试（Brendan Ashworth） [#1617](https://github.com/nodejs/node/pull/1617)
* \[[`2d9456e3e6`](https://github.com/nodejs/node/commit/2d9456e3e6)] - **(SEMVER-MAJOR)** **http**：使用官方 IANA 状态码（jomo） [#1470](https://github.com/nodejs/node/pull/1470)
* \[[`11e4249227`](https://github.com/nodejs/node/commit/11e4249227)] - **(SEMVER-MAJOR)** **http_server**：`prefinish` 与 `finish`（Fedor Indutny） [#1411](https://github.com/nodejs/node/pull/1411)
* \[[`9bc2e26720`](https://github.com/nodejs/node/commit/9bc2e26720)] - **net**：不要在 FreeBSD 上设置 V4MAPPED（Julien Gilli） [iojs/io.js#1555](https://github.com/iojs/io.js/pull/1555)
* \[[`ba9ccf227e`](https://github.com/nodejs/node/commit/ba9ccf227e)] - **node**：移除多余的 --use-old-buffer（Rod Vagg） [#2275](https://github.com/nodejs/node/pull/2275)
* \[[`ef65321083`](https://github.com/nodejs/node/commit/ef65321083)] - **(SEMVER-MAJOR)** **node**：不要覆盖错误的 `message`/`stack`（Fedor Indutny） [#2108](https://github.com/nodejs/node/pull/2108)
* \[[`9f727f5e03`](https://github.com/nodejs/node/commit/9f727f5e03)] - **node-gyp**：检测 x.y.z-rc.n 格式的 RC 构建（Rod Vagg） [#2171](https://github.com/nodejs/node/pull/2171)
* \[[`e52f963632`](https://github.com/nodejs/node/commit/e52f963632)] - **node-gyp**：下载用于编译的头文件 tar 包（Rod Vagg） [#2066](https://github.com/nodejs/node/pull/2066)
* \[[`902c9ca51d`](https://github.com/nodejs/node/commit/902c9ca51d)] - **node-gyp**：使其感知 nightly、next-nightly 和 rc（Rod Vagg） [#2066](https://github.com/nodejs/node/pull/2066)
* \[[`4cffaa3f55`](https://github.com/nodejs/node/commit/4cffaa3f55)] - **(SEMVER-MINOR)** **readline**：允许输入中包含制表符（Rich Trott） [#1761](https://github.com/nodejs/node/pull/1761)
* \[[`ed6c249104`](https://github.com/nodejs/node/commit/ed6c249104)] - **(SEMVER-MAJOR)** **repl**：以纯文本方式持久化历史记录（Jeremiah Senkpiel） [#2224](https://github.com/nodejs/node/pull/2224)
* \[[`f7d5e4c618`](https://github.com/nodejs/node/commit/f7d5e4c618)] - **(SEMVER-MINOR)** **repl**：默认持久化到 \~/.node_repl_history（Jeremiah Senkpiel） [#2224](https://github.com/nodejs/node/pull/2224)
* \[[`ea05e760cd`](https://github.com/nodejs/node/commit/ea05e760cd)] - **repl**：不要覆盖 RegExp.$ 属性（Sakthipriyan Vairamani） [#2137](https://github.com/nodejs/node/pull/2137)
* \[[`d20093246b`](https://github.com/nodejs/node/commit/d20093246b)] - **src**：在 arm 上禁用向量 IC（Michaël Zasso） [#2220](https://github.com/nodejs/node/pull/2220)
* \[[`04fd4fad46`](https://github.com/nodejs/node/commit/04fd4fad46)] - **(SEMVER-MINOR)** **src**：引入 process.release 对象（Rod Vagg） [#2154](https://github.com/nodejs/node/pull/2154)
* \[[`9d34bd1147`](https://github.com/nodejs/node/commit/9d34bd1147)] - **src**：将 NODE_MODULE_VERSION 增加到 45（Rod Vagg） [#2096](https://github.com/nodejs/node/pull/2096)
* \[[`ceee8d2807`](https://github.com/nodejs/node/commit/ceee8d2807)] - **test**：为持久化 repl 历史添加测试（Jeremiah Senkpiel） [#2224](https://github.com/nodejs/node/pull/2224)
* \[[`8e1a8ffe24`](https://github.com/nodejs/node/commit/8e1a8ffe24)] - **test**：移除两个过时的 pummel 测试（Ben Noordhuis） [#2022](https://github.com/nodejs/node/pull/2022)
* \[[`ae731ec0fa`](https://github.com/nodejs/node/commit/ae731ec0fa)] - **test**：不要使用 arguments.callee（Ben Noordhuis） [#2022](https://github.com/nodejs/node/pull/2022)
* \[[`21d31c08e7`](https://github.com/nodejs/node/commit/21d31c08e7)] - **test**：移除过时的 harmony 标志（Chris Dickinson）
* \[[`64cf71195c`](https://github.com/nodejs/node/commit/64cf71195c)] - **test**：将主机名改为无效名称（Sakthipriyan Vairamani） [#2287](https://github.com/nodejs/node/pull/2287)
* \[[`80a1cf7425`](https://github.com/nodejs/node/commit/80a1cf7425)] - **test**：修复消息并使用 return 跳过测试（Sakthipriyan Vairamani） [#2290](https://github.com/nodejs/node/pull/2290)
* \[[`d5ab92bcc1`](https://github.com/nodejs/node/commit/d5ab92bcc1)] - **test**：统一使用 common.isWindows（Sakthipriyan Vairamani） [#2269](https://github.com/nodejs/node/pull/2269)
* \[[`bc733f7065`](https://github.com/nodejs/node/commit/bc733f7065)] - **test**：修复 fs.readFile('/dev/stdin') 测试（Ben Noordhuis） [#2265](https://github.com/nodejs/node/pull/2265)
* \[[`3cbb5870e5`](https://github.com/nodejs/node/commit/3cbb5870e5)] - **tools**：向测试运行器公开 skip 输出（Johan Bergström） [#2130](https://github.com/nodejs/node/pull/2130)
* \[[`3b021efe11`](https://github.com/nodejs/node/commit/3b021efe11)] - **vm**：修复符号访问（Domenic Denicola） [#1773](https://github.com/nodejs/node/pull/1773)
* \[[`7b81e4ba36`](https://github.com/nodejs/node/commit/7b81e4ba36)] - **vm**：移除不必要的访问检查（Domenic Denicola） [#1773](https://github.com/nodejs/node/pull/1773)
* \[[`659dadd410`](https://github.com/nodejs/node/commit/659dadd410)] - **vm**：修复 sandbox 属性的属性描述符（Domenic Denicola） [#1773](https://github.com/nodejs/node/pull/1773)
* \[[`9bac1dbae9`](https://github.com/nodejs/node/commit/9bac1dbae9)] - **win,node-gyp**：默认启用 delay-load hook（Bert Belder） [iojs/io.js#1433](https://github.com/iojs/io.js/pull/1433)

<a id="2.5.0"></a>

## 2015-07-28，版本 2.5.0，@cjihrig

### 重大变更

* **https**: Agent 中的 TLS 会话会被复用（Fedor Indutny）[#2228](https://github.com/nodejs/node/pull/2228)
* **src**: base64 解码现在快 50%（Ben Noordhuis）[#2193](https://github.com/nodejs/node/pull/2193)
* **npm**: 已升级到 v2.13.2，发布说明可见于 <https://github.com/npm/npm/releases/tag/v2.13.2>（Kat Marchán）[#2241](https://github.com/nodejs/node/pull/2241)。

### 已知问题

请参阅 <https://github.com/nodejs/node/labels/confirmed-bug> 获取完整且最新的已知问题列表。

* 同时使用多个 REPL 实例可能会导致部分 REPL 历史记录损坏或丢失。 [#1634](https://github.com/nodejs/node/issues/1634)
* `beforeExit` 期间运行未被引用的定时器仍有一些问题有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会使终端冻结。 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)。
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`bf2cd225a8`](https://github.com/nodejs/node/commit/bf2cd225a8)] - **process**: 在 SIGWINCH 时调整 stderr 大小 (Jeremiah Senkpiel) [#2231](https://github.com/nodejs/node/pull/2231)
* \[[`99d9d7e716`](https://github.com/nodejs/node/commit/99d9d7e716)] - **benchmark**: 添加剩余的 path 基准测试并进行优化 (Nathan Woltman) [#2103](https://github.com/nodejs/node/pull/2103)
* \[[`66fc8ca22b`](https://github.com/nodejs/node/commit/66fc8ca22b)] - **(SEMVER-MINOR)** **cluster**: 在 cluster master 上发出 'message' 事件 (Sam Roberts) [#861](https://github.com/nodejs/node/pull/861)
* \[[`eb35968de7`](https://github.com/nodejs/node/commit/eb35968de7)] - **crypto**: 修复旧版 SNICallback (Fedor Indutny) [#1720](https://github.com/nodejs/node/pull/1720)
* \[[`fef190cea6`](https://github.com/nodejs/node/commit/fef190cea6)] - **deps**: 使 node-gyp 可与 io.js 协同工作 (cjihrig) [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`b73a7465c5`](https://github.com/nodejs/node/commit/b73a7465c5)] - **deps**: 升级到 npm 2.13.2 (Kat Marchán) [#2241](https://github.com/nodejs/node/pull/2241)
* \[[`0a7bf81d2f`](https://github.com/nodejs/node/commit/0a7bf81d2f)] - **deps**: 将 V8 更新到 4.2.77.21 (Ali Ijaz Sheikh) [#2238](https://github.com/nodejs/node/issues/2238)
* \[[`73cdcdd581`](https://github.com/nodejs/node/commit/73cdcdd581)] - **deps**: 使 node-gyp 可与 io.js 协同工作 (cjihrig) [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`04893a736d`](https://github.com/nodejs/node/commit/04893a736d)] - **deps**: 升级到 npm 2.13.1 (Kat Marchán) [#2210](https://github.com/nodejs/node/pull/2210)
* \[[`a3c1b9720e`](https://github.com/nodejs/node/commit/a3c1b9720e)] - **doc**: 为 cjihrig 添加 GPG 指纹 (cjihrig) [#2217](https://github.com/nodejs/node/pull/2217)
* \[[`d9f857df3b`](https://github.com/nodejs/node/commit/d9f857df3b)] - **doc**: 关于自定义 inspect 函数的说明 (Sakthipriyan Vairamani) [#2142](https://github.com/nodejs/node/pull/2142)
* \[[`4ef2b5fbfb`](https://github.com/nodejs/node/commit/4ef2b5fbfb)] - **doc**: 用 console.error 替换 util.debug (Yosuke Furukawa) [#2214](https://github.com/nodejs/node/pull/2214)
* \[[`b612f085ec`](https://github.com/nodejs/node/commit/b612f085ec)] - **doc**: 添加 joaocgreis 为协作者 (João Reis) [#2208](https://github.com/nodejs/node/pull/2208)
* \[[`6b85d5a4b3`](https://github.com/nodejs/node/commit/6b85d5a4b3)] - **doc**: 添加 2015-07-15 的 TSC 会议纪要 (Rod Vagg) [#2191](https://github.com/nodejs/node/pull/2191)
* \[[`c7d8b09162`](https://github.com/nodejs/node/commit/c7d8b09162)] - **doc**: 在测试核心模块更改前重新编译 (Phillip Johnsen) [#2051](https://github.com/nodejs/node/pull/2051)
* \[[`9afee6785e`](https://github.com/nodejs/node/commit/9afee6785e)] - **http**: 在使用 this.connection 前先检查它 (Sakthipriyan Vairamani) [#2172](https://github.com/nodejs/node/pull/2172)
* \[[`2ca5a3db47`](https://github.com/nodejs/node/commit/2ca5a3db47)] - **https**: 在 Agent 中复用 TLS 会话 (Fedor Indutny) [#2228](https://github.com/nodejs/node/pull/2228)
* \[[`fef87fee1d`](https://github.com/nodejs/node/commit/fef87fee1d)] - **(SEMVER-MINOR)** **lib,test**: 添加 freelist 弃用提示和测试 (Sakthipriyan Vairamani) [#2176](https://github.com/nodejs/node/pull/2176)
* \[[`503b089dd8`](https://github.com/nodejs/node/commit/503b089dd8)] - **net**: 不要在套接字被立即销毁时抛出异常 (Evan Lucas) [#2251](https://github.com/nodejs/node/pull/2251)
* \[[`93660c8b8e`](https://github.com/nodejs/node/commit/93660c8b8e)] - **node**: 移除错误的函数调用和检查 (Trevor Norris) [#2157](https://github.com/nodejs/node/pull/2157)
* \[[`afd7e37ee0`](https://github.com/nodejs/node/commit/afd7e37ee0)] - **repl**: 更好地处理空行 (Sakthipriyan Vairamani) [#2163](https://github.com/nodejs/node/pull/2163)
* \[[`81ea52aa01`](https://github.com/nodejs/node/commit/81ea52aa01)] - **repl**: 改进行续写处理 (Sakthipriyan Vairamani) [#2163](https://github.com/nodejs/node/pull/2163)
* \[[`30edb5aee9`](https://github.com/nodejs/node/commit/30edb5aee9)] - **repl**: 防止 REPL 在继承属性下崩溃 (Sakthipriyan Vairamani) [#2163](https://github.com/nodejs/node/pull/2163)
* \[[`77fa385e5d`](https://github.com/nodejs/node/commit/77fa385e5d)] - **repl**: 修复无效 REPL 关键字错误中的 `undefined` (Sakthipriyan Vairamani) [#2163](https://github.com/nodejs/node/pull/2163)
* \[[`8fd3ce100e`](https://github.com/nodejs/node/commit/8fd3ce100e)] - **src**: 使 base64 解码快 50% (Ben Noordhuis) [#2193](https://github.com/nodejs/node/pull/2193)
* \[[`c786d6341d`](https://github.com/nodejs/node/commit/c786d6341d)] - **test**: 不要使用公网 IP 进行超时测试 (Rich Trott) [#2057](https://github.com/nodejs/node/pull/2057)
* \[[`4e78cd71c0`](https://github.com/nodejs/node/commit/4e78cd71c0)] - **test**: 在测试 IPv6 之前先跳过相关部分 (Sakthipriyan Vairamani) [#2226](https://github.com/nodejs/node/pull/2226)
* \[[`ac70bc8240`](https://github.com/nodejs/node/commit/ac70bc8240)] - **test**: 修复 valgrind 未初始化内存警告 (Ben Noordhuis) [#2193](https://github.com/nodejs/node/pull/2193)
* \[[`ac7d3fa0d9`](https://github.com/nodejs/node/commit/ac7d3fa0d9)] - **test**: 在 Win 上为 s_client 选项添加 -no\_rand\_screen (Shigeki Ohtsu) [#2209](https://github.com/nodejs/node/pull/2209)
* \[[`79c865a53f`](https://github.com/nodejs/node/commit/79c865a53f)] - **test**: 在跳过测试时将 process.exit 改为 return (Sakthipriyan Vairamani) [#2109](https://github.com/nodejs/node/pull/2109)
* \[[`69298d36cf`](https://github.com/nodejs/node/commit/69298d36cf)] - **test**: 为 TAP 解析格式化跳过消息 (Sakthipriyan Vairamani) [#2109](https://github.com/nodejs/node/pull/2109)
* \[[`543dabb609`](https://github.com/nodejs/node/commit/543dabb609)] - **timers**: 提升 Timer.now() 性能 (Ben Noordhuis) [#2256](https://github.com/nodejs/node/pull/2256)
* \[[`3663b124e6`](https://github.com/nodejs/node/commit/3663b124e6)] - **timers**: 移除未使用的 Timer.again() (Ben Noordhuis) [#2256](https://github.com/nodejs/node/pull/2256)
* \[[`bcce5cf9bb`](https://github.com/nodejs/node/commit/bcce5cf9bb)] - **timers**: 移除未使用的 Timer.getRepeat() (Ben Noordhuis) [#2256](https://github.com/nodejs/node/pull/2256)
* \[[`f2c83bd202`](https://github.com/nodejs/node/commit/f2c83bd202)] - **timers**: 移除未使用的 Timer.setRepeat() (Ben Noordhuis) [#2256](https://github.com/nodejs/node/pull/2256)
* \[[`e11fc67225`](https://github.com/nodejs/node/commit/e11fc67225)] - **(SEMVER-MINOR)** **tls**: 添加 `getTicketKeys()`/`setTicketKeys()` (Fedor Indutny) [#2227](https://github.com/nodejs/node/pull/2227)
* \[[`68b06e94e3`](https://github.com/nodejs/node/commit/68b06e94e3)] - **tools**: 在 test-npm 中使用本地或指定的 $NODE (Jeremiah Senkpiel) [#1984](https://github.com/nodejs/node/pull/1984)
* \[[`ab479659c7`](https://github.com/nodejs/node/commit/ab479659c7)] - **util**: 延迟创建调试上下文 (Ali Ijaz Sheikh) [#2248](https://github.com/nodejs/node/pull/2248)
* \[[`6391f4d2fd`](https://github.com/nodejs/node/commit/6391f4d2fd)] - **util**: 移除 is* 函数中的冗余检查 (Sakthipriyan Vairamani) [#2179](https://github.com/nodejs/node/pull/2179)
* \[[`b148c0dff3`](https://github.com/nodejs/node/commit/b148c0dff3)] - **win,node-gyp**: 默认启用 delay-load hook (Bert Belder) [iojs/io.js#1433](https://github.com/iojs/io.js/pull/1433)
* \[[`f90f1e75bb`](https://github.com/nodejs/node/commit/f90f1e75bb)] - **win,node-gyp**: 默认启用 delay-load hook (Bert Belder) [iojs/io.js#1433](https://github.com/iojs/io.js/pull/1433)

<a id="2.4.0"></a>

## 2015-07-17，版本 2.4.0，@Fishrock123

### 重大变更

* **src**: 新增 `--track-heap-objects` 标志，用于跟踪堆快照中的堆对象分配 (Bradley Meck) [#2135](https://github.com/nodejs/node/pull/2135).
* **readline**: 修复了一个在 keypress 事件处理器抛出异常时会影响 repl 的冻结问题 (Alex Kocharin) [#2107](https://github.com/nodejs/node/pull/2107).
* **npm**: 已升级到 v2.13.0，发布说明可见于 <https://github.com/npm/npm/releases/tag/v2.13.0> (Forrest L Norvell) [#2152](https://github.com/nodejs/node/pull/2152).

### 已知问题

请参阅 <https://github.com/nodejs/node/labels/confirmed-bug> 获取完整且最新的已知问题列表。

* `beforeExit` 期间运行未被引用的定时器仍有一些问题有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会使终端冻结。 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)。
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`f95f9ef6ea`](https://github.com/nodejs/node/commit/f95f9ef6ea)] - **build**: 始终对 tar-headers 使用 prefix=/ (Rod Vagg) [#2082](https://github.com/nodejs/node/pull/2082)
* \[[`12bc397207`](https://github.com/nodejs/node/commit/12bc397207)] - **build**: 运行-ci makefile 规则 (Alexis Campailla) [#2134](https://github.com/nodejs/node/pull/2134)
* \[[`84012c99e0`](https://github.com/nodejs/node/commit/84012c99e0)] - **build**: 修复 vcbuild 合并问题 (Alexis Campailla) [#2131](https://github.com/nodejs/node/pull/2131)
* \[[`47e2c5c828`](https://github.com/nodejs/node/commit/47e2c5c828)] - **build**: 如果调用了 clean，则尽早退出 (Johan Bergström) [#2127](https://github.com/nodejs/node/pull/2127)
* \[[`5acad6b163`](https://github.com/nodejs/node/commit/5acad6b163)] - **child\_process**: 修复参数注释 (Roman Reiss) [#2161](https://github.com/nodejs/node/pull/2161)
* \[[`3c4121c418`](https://github.com/nodejs/node/commit/3c4121c418)] - **deps**: 使 node-gyp 可与 io.js 协同工作 (cjihrig) [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`938cc757bb`](https://github.com/nodejs/node/commit/938cc757bb)] - **deps**: 升级到 npm 2.13.0 (Forrest L Norvell) [#2152](https://github.com/nodejs/node/pull/2152)
* \[[`6f306e0ed2`](https://github.com/nodejs/node/commit/6f306e0ed2)] - **doc**: 添加 targos 为协作者 (Michaël Zasso) [#2200](https://github.com/nodejs/node/pull/2200)
* \[[`c019d9a239`](https://github.com/nodejs/node/commit/c019d9a239)] - **doc**: 添加 thefourtheye 为协作者 (Sakthipriyan Vairamani) [#2199](https://github.com/nodejs/node/pull/2199)
* \[[`4e92dbc26b`](https://github.com/nodejs/node/commit/4e92dbc26b)] - **doc**: 添加来自合并项目的 TSC 成员 (Jeremiah Senkpiel) [#2085](https://github.com/nodejs/node/pull/2085)
* \[[`6c3aabf455`](https://github.com/nodejs/node/commit/6c3aabf455)] - **doc**: 添加 2015-07-08 的 TSC 会议纪要 (Rod Vagg) [#2184](https://github.com/nodejs/node/pull/2184)
* \[[`30a0d47d51`](https://github.com/nodejs/node/commit/30a0d47d51)] - **doc**: 添加 2015-07-01 的 TSC 会议纪要 (Rod Vagg) [#2132](https://github.com/nodejs/node/pull/2132)
* \[[`23efb05cc3`](https://github.com/nodejs/node/commit/23efb05cc3)] - **doc**: 记录 fs.watchFile 在 ENOENT 下的行为 (Brendan Ashworth) [#2093](https://github.com/nodejs/node/pull/2093)
* \[[`65963ec26f`](https://github.com/nodejs/node/commit/65963ec26f)] - **doc,test**: path 模块中的空字符串 (Sakthipriyan Vairamani) [#2106](https://github.com/nodejs/node/pull/2106)
* \[[`0ab81e6f58`](https://github.com/nodejs/node/commit/0ab81e6f58)] - **docs**: 链接到更新的 v8 文档 (Jeremiah Senkpiel) [#2196](https://github.com/nodejs/node/pull/2196)
* \[[`1afc0c9e86`](https://github.com/nodejs/node/commit/1afc0c9e86)] - **fs**: 修复监听器类型错误时的报错 (Brendan Ashworth) [#2093](https://github.com/nodejs/node/pull/2093)
* \[[`2ba84606a6`](https://github.com/nodejs/node/commit/2ba84606a6)] - **path**: 断言 path.join() 参数长度一致 (Phillip Johnsen) [#2159](https://github.com/nodejs/node/pull/2159)
* \[[`bd01603201`](https://github.com/nodejs/node/commit/bd01603201)] - **readline**: 修复 `keypress` 事件抛出时的冻结问题 (Alex Kocharin) [#2107](https://github.com/nodejs/node/pull/2107)
* \[[`59f6b5da2a`](https://github.com/nodejs/node/commit/59f6b5da2a)] - **repl**: 防止使用 Proxy 进行 tab 补全时崩溃 (Sakthipriyan Vairamani) [#2120](https://github.com/nodejs/node/pull/2120)
* \[[`cf14a2427c`](https://github.com/nodejs/node/commit/cf14a2427c)] - **(SEMVER-MINOR)** **src**: 添加 --track-heap-objects (Bradley Meck) [#2135](https://github.com/nodejs/node/pull/2135)
* \[[`2b4b600660`](https://github.com/nodejs/node/commit/2b4b600660)] - **test**: 修复 test-debug-port-from-cmdline (João Reis) [#2186](https://github.com/nodejs/node/pull/2186)
* \[[`d4ceb16da2`](https://github.com/nodejs/node/commit/d4ceb16da2)] - **test**: 正确清理临时目录 (Roman Reiss) [#2164](https://github.com/nodejs/node/pull/2164)
* \[[`842eb5b853`](https://github.com/nodejs/node/commit/842eb5b853)] - **test**: 为 dgram.setTTL 添加测试 (Evan Lucas) [#2121](https://github.com/nodejs/node/pull/2121)
* \[[`cff7300a57`](https://github.com/nodejs/node/commit/cff7300a57)] - **win,node-gyp**: 默认启用 delay-load hook (Bert Belder) [iojs/io.js#1433](https://github.com/iojs/io.js/pull/1433)

<a id="2.3.4"></a>

## 2015-07-09，版本 2.3.4，@Fishrock123

### 重大变更

* **openssl**: 升级到 1.0.2d，修复 CVE-2015-1793（Alternate Chains 证书伪造）(Shigeki Ohtsu) [#2141](https://github.com/nodejs/node/pull/2141)。
* **npm**: 已升级到 v2.12.1，发布说明可见 <https://github.com/npm/npm/releases/tag/v2.12.0> 和 <https://github.com/npm/npm/releases/tag/v2.12.1> (Kat Marchán) [#2112](https://github.com/nodejs/node/pull/2112)。

### 已知问题

完整且最新的已知问题列表请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归，参见 [#760](https://github.com/nodejs/node/issues/760)。
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会导致进程因断言失败而崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`0d15161c24`](https://github.com/nodejs/node/commit/0d15161c24)] - **benchmark**: 为 #1778 添加一些路径基准测试 (Nathan Woltman) [#1778](https://github.com/nodejs/node/pull/1778)
* \[[`c70e68fa32`](https://github.com/nodejs/node/commit/c70e68fa32)] - **deps**: 更新 deps/openssl/conf/arch/\*/opensslconf.h (Shigeki Ohtsu) [#2141](https://github.com/nodejs/node/pull/2141)
* \[[`ca93f7f2e6`](https://github.com/nodejs/node/commit/ca93f7f2e6)] - **deps**: 将 openssl 源码升级到 1.0.2d (Shigeki Ohtsu) [#2141](https://github.com/nodejs/node/pull/2141)
* \[[`b18c841ec1`](https://github.com/nodejs/node/commit/b18c841ec1)] - **deps**: 使 node-gyp 可与 io.js 一起工作 (cjihrig) [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`863cdbdd08`](https://github.com/nodejs/node/commit/863cdbdd08)] - **deps**: 升级到 npm 2.12.1 (Kat Marchán) [#2112](https://github.com/nodejs/node/pull/2112)
* \[[`84b3915764`](https://github.com/nodejs/node/commit/84b3915764)] - **doc**: 记录当前发布流程 (Rod Vagg) [#2099](https://github.com/nodejs/node/pull/2099)
* \[[`46140334cd`](https://github.com/nodejs/node/commit/46140334cd)] - **doc**: 更新 AUTHORS 列表 (Rod Vagg) [#2100](https://github.com/nodejs/node/pull/2100)
* \[[`bca53dce76`](https://github.com/nodejs/node/commit/bca53dce76)] - **path**: 为性能和一致性进行重构 (Nathan Woltman) [#1778](https://github.com/nodejs/node/pull/1778)
* \[[`6bef15afe7`](https://github.com/nodejs/node/commit/6bef15afe7)] - **src**: 从 process 中移除 traceSyncIO 属性 (Bradley Meck) [#2143](https://github.com/nodejs/node/pull/2143)
* \[[`2ba1740ba1`](https://github.com/nodejs/node/commit/2ba1740ba1)] - **test**: 添加缺失的 crypto 检查 (Johan Bergström) [#2129](https://github.com/nodejs/node/pull/2129)
* \[[`180fd392ca`](https://github.com/nodejs/node/commit/180fd392ca)] - **test**: 重构 test-repl-tab-complete (Sakthipriyan Vairamani) [#2122](https://github.com/nodejs/node/pull/2122)
* \[[`fb05c8e27d`](https://github.com/nodejs/node/commit/fb05c8e27d)] - _**回退**_ "**test**: 为缺失的 `close`/`finish` 事件添加测试" (Fedor Indutny)
* \[[`9436a860cb`](https://github.com/nodejs/node/commit/9436a860cb)] - **test**: 为缺失的 `close`/`finish` 事件添加测试 (Mark Plomer) [iojs/io.js#1373](https://github.com/iojs/io.js/pull/1373)
* \[[`ee3ce2ed88`](https://github.com/nodejs/node/commit/ee3ce2ed88)] - **tools**: 将 v8 的 gdbinit 安装到 $PREFIX/share (Ali Ijaz Sheikh) [#2123](https://github.com/nodejs/node/pull/2123)
* \[[`dd523c75da`](https://github.com/nodejs/node/commit/dd523c75da)] - **win,node-gyp**: 默认启用 delay-load hook (Bert Belder) [iojs/io.js#1433](https://github.com/iojs/io.js/pull/1433)

<a id="1.8.4"></a>

## 2015-07-09，版本 1.8.4，@Fishrock123

**维护版本**

### 重大变更

* **openssl**: 升级到 1.0.2d，修复 CVE-2015-1793（Alternate Chains 证书伪造） [#2141](https://github.com/nodejs/node/pull/2141)。

### 已知问题

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会导致进程因断言失败而崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* readline: split escapes 处理不正确，参见 [#1403](https://github.com/nodejs/node/issues/1403)

### 提交

* \[[`c70e68fa32`](https://github.com/nodejs/node/commit/c70e68fa32)] - **deps**: 更新 deps/openssl/conf/arch/\*/opensslconf.h (Shigeki Ohtsu) [#2141](https://github.com/nodejs/node/pull/2141)
* \[[`ca93f7f2e6`](https://github.com/nodejs/node/commit/ca93f7f2e6)] - **deps**: 将 openssl 源码升级到 1.0.2d (Shigeki Ohtsu) [#2141](https://github.com/nodejs/node/pull/2141)

<a id="2.3.3"></a>

## 2015-07-04，版本 2.3.3，@Fishrock123

### 重大变更

* **deps**: 修复了 utf8 解码器中的越界写入。**这是一个重要的安全更新**，因为它可被用于发起拒绝服务攻击。

### 已知问题

完整且最新的已知问题列表请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归，参见 [#760](https://github.com/nodejs/node/issues/760)。
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会导致进程因断言失败而崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

## 提交

* \[[`030f8045c7`](https://github.com/nodejs/node/commit/030f8045c7)] - **deps**: 修复 utf8 解码器中的越界写入 (Fedor Indutny)
* \[[`0f09b8db28`](https://github.com/nodejs/node/commit/0f09b8db28)] - **doc**: 不建议将 domains 用于错误处理 (Benjamin Gruenbaum) [#2056](https://github.com/nodejs/node/pull/2056)
* \[[`9cd44bb2b6`](https://github.com/nodejs/node/commit/9cd44bb2b6)] - **util**: 在弃用消息前添加 '(node) ' 前缀 (Sakthipriyan Vairamani) [#1892](https://github.com/nodejs/node/pull/1892)

<a id="1.8.3"></a>

## 2015-07-04，版本 1.8.3，@rvagg

**维护版本**

## 重大变更

* **v8**: 修复了 utf8 解码器中的越界写入。**这是一个重要的安全更新**，因为它可被用于发起拒绝服务攻击。
* **openssl**: 升级到 1.0.2b 和 1.0.2c，引入 DHE 中间人防护（Logjam）并修复导致无限循环的畸形 ECParameters（CVE-2015-1788）。完整详情请参见 [安全公告](https://www.openssl.org/news/secadv_20150611.txt)。(Shigeki Ohtsu) [#1950](https://github.com/nodejs/node/pull/1950) [#1958](https://github.com/nodejs/node/pull/1958)
* **build**:
  * 增加了使用 Microsoft Visual C++ 2015 编译的支持
  * 开始随二进制文件一起构建和分发仅包含头文件的 tar 包

### 已知问题

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会导致进程因断言失败而崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* readline: split escapes 处理不正确，参见 [#1403](https://github.com/nodejs/node/issues/1403)

### 提交

* \[[`d8f260d33b`](https://github.com/nodejs/node/commit/d8f260d33b)] - **build**: 为仅头文件 tar 添加 tar-headers 目标 (Rod Vagg) [#1975](https://github.com/nodejs/node/pull/1975)
* \[[`00ba429674`](https://github.com/nodejs/node/commit/00ba429674)] - **build**: 更新 io.js 的构建目标 (Rod Vagg) [#1938](https://github.com/nodejs/node/pull/1938)
* \[[`39e2207ff1`](https://github.com/nodejs/node/commit/39e2207ff1)] - **build**: 修复 cherry-pick 失误，修正注释措辞 (Rod Vagg) [#2036](https://github.com/nodejs/node/pull/2036)
* \[[`561919a67a`](https://github.com/nodejs/node/commit/561919a67a)] - **build**: 增加 MSVS 2015 支持 (Rod Vagg) [#2036](https://github.com/nodejs/node/pull/2036)
* \[[`8e1134c04c`](https://github.com/nodejs/node/commit/8e1134c04c)] - **build**: 从 Windows 上的 test-ci 中移除 lint (Johan Bergström) [#2004](https://github.com/nodejs/node/pull/2004)
* \[[`e52e99085e`](https://github.com/nodejs/node/commit/e52e99085e)] - **build**: 不在 test-ci 中运行 lint (Johan Bergström) [#1965](https://github.com/nodejs/node/pull/1965)
* \[[`c5d1ec7fea`](https://github.com/nodejs/node/commit/c5d1ec7fea)] - **build**: 简化已构建二进制文件的执行方式 (Johan Bergström) [#1955](https://github.com/nodejs/node/pull/1955)
* \[[`2ce147551a`](https://github.com/nodejs/node/commit/2ce147551a)] - **build,win**: 在生成项目之前设置环境变量 (Alexis Campailla) [joyent/node#20109](https://github.com/joyent/node/pull/20109)
* \[[`78de5f85f2`](https://github.com/nodejs/node/commit/78de5f85f2)] - **deps**: 修复 utf8 解码器中的越界写入 (Ben Noordhuis)
* \[[`83ee07b6be`](https://github.com/nodejs/node/commit/83ee07b6be)] - **deps**: 将所有 openssl 头文件复制到 include 目录 (Shigeki Ohtsu) [#2016](https://github.com/nodejs/node/pull/2016)
* \[[`a97125520d`](https://github.com/nodejs/node/commit/a97125520d)] - **deps**: 将 UPGRADING.md 文档更新为 openssl-1.0.2c (Shigeki Ohtsu) [#1958](https://github.com/nodejs/node/pull/1958)
* \[[`0e2d068e0b`](https://github.com/nodejs/node/commit/0e2d068e0b)] - **deps**: 替换 openssl 中的所有头文件 (Shigeki Ohtsu) [#1958](https://github.com/nodejs/node/pull/1958)
* \[[`310b8d1120`](https://github.com/nodejs/node/commit/310b8d1120)] - **deps**: 为 openssl s_client 添加 -no_rand_screen (Shigeki Ohtsu) [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`a472946747`](https://github.com/nodejs/node/commit/a472946747)] - **deps**: 修复 x86_win32 中 openssl 的 asm 构建错误 (Shigeki Ohtsu) [nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`b2467e3ebf`](https://github.com/nodejs/node/commit/b2467e3ebf)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误 (Fedor Indutny) [nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`e548abb800`](https://github.com/nodejs/node/commit/e548abb800)] - **deps**: 将 openssl 源码升级到 1.0.2c (Shigeki Ohtsu) [#1958](https://github.com/nodejs/node/pull/1958)
* \[[`1feaa68e85`](https://github.com/nodejs/node/commit/1feaa68e85)] - **deps**: 为 openssl-1.0.2b 更新 asm 文件 (Shigeki Ohtsu) [#1950](https://github.com/nodejs/node/pull/1950)
* \[[`151720fae7`](https://github.com/nodejs/node/commit/151720fae7)] - **deps**: 替换 openssl 中的所有头文件 (Shigeki Ohtsu) [#1950](https://github.com/nodejs/node/pull/1950)
* \[[`139da6a02a`](https://github.com/nodejs/node/commit/139da6a02a)] - **deps**: 为 openssl s_client 添加 -no_rand_screen (Shigeki Ohtsu) [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`283642827a`](https://github.com/nodejs/node/commit/283642827a)] - **deps**: 修复 x86_win32 中 openssl 的 asm 构建错误 (Shigeki Ohtsu) [nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`d593b552de`](https://github.com/nodejs/node/commit/d593b552de)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误 (Fedor Indutny) [nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`2a3367a4bd`](https://github.com/nodejs/node/commit/2a3367a4bd)] - **deps**: 将 openssl 源码升级到 1.0.2b (Shigeki Ohtsu) [#1950](https://github.com/nodejs/node/pull/1950)
* \[[`5c29c0c519`](https://github.com/nodejs/node/commit/5c29c0c519)] - **openssl**: 修复 win32 应用中的按键要求 (Shigeki Ohtsu) [nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`2cd7f73d9f`](https://github.com/nodejs/node/commit/2cd7f73d9f)] - **openssl**: 修复 win32 应用中的按键要求 (Shigeki Ohtsu) [nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`c65484a74d`](https://github.com/nodejs/node/commit/c65484a74d)] - **tls**: 使服务器在低于 1024 位时不使用 DHE (Shigeki Ohtsu) [#1739](https://github.com/nodejs/node/pull/1739)
* \[[`77f518403f`](https://github.com/nodejs/node/commit/77f518403f)] - **win,node-gyp**: 使 delay-load hook 符合 C89 标准 (Sharat M R) [TooTallNate/node-gyp#616](https://github.com/TooTallNate/node-gyp/pull/616)

<a id="2.3.2"></a>

## 2015-07-01，版本 2.3.2，@rvagg

### 重要变更

* **build**:
  * 新增对使用 Microsoft Visual C++ 2015 进行编译的支持
  * 开始随二进制文件一起构建并分发仅包含头文件的 tar 包

### 已知问题

请参见 <https://github.com/nodejs/node/labels/confirmed-bug> 获取已知问题的完整且最新列表。

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所说的那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

## 提交

* \[[`9180140231`](https://github.com/nodejs/node/commit/9180140231)] - **\_stream\_wrap**: 防止 TLS 中 use after free（Fedor Indutny） [#1910](https://github.com/nodejs/node/pull/1910)
* \[[`05a73c0f25`](https://github.com/nodejs/node/commit/05a73c0f25)] - **benchmark**: 使并发请求可配置（Rich Trott） [#2068](https://github.com/nodejs/node/pull/2068)
* \[[`f52d73352e`](https://github.com/nodejs/node/commit/f52d73352e)] - **benchmark**: 修复 README 中的拼写错误（Rich Trott） [#2067](https://github.com/nodejs/node/pull/2067)
* \[[`1cd9eeb556`](https://github.com/nodejs/node/commit/1cd9eeb556)] - **buffer**: 防止因错误的 proto 导致中止（Trevor Norris） [#2012](https://github.com/nodejs/node/pull/2012)
* \[[`8350f3a3a2`](https://github.com/nodejs/node/commit/8350f3a3a2)] - **buffer**: 优化 Buffer#toString()（Ben Noordhuis） [#2027](https://github.com/nodejs/node/pull/2027)
* \[[`628a3ab093`](https://github.com/nodejs/node/commit/628a3ab093)] - **build**: 为仅包含头文件的 tar 添加 tar-headers 目标（Rod Vagg） [#1975](https://github.com/nodejs/node/pull/1975)
* \[[`dcbb9e1da6`](https://github.com/nodejs/node/commit/dcbb9e1da6)] - **build**: 更新 io.js 的构建目标（Rod Vagg） [#1938](https://github.com/nodejs/node/pull/1938)
* \[[`c87c34c242`](https://github.com/nodejs/node/commit/c87c34c242)] - **build**: 修复 cherry-pick 的失误，修正文档注释措辞（Rod Vagg） [#2036](https://github.com/nodejs/node/pull/2036)
* \[[`4208dc4fef`](https://github.com/nodejs/node/commit/4208dc4fef)] - **build**: 添加 MSVS 2015 支持（Rod Vagg） [#2036](https://github.com/nodejs/node/pull/2036)
* \[[`834a365113`](https://github.com/nodejs/node/commit/834a365113)] - **build**: darwin 上默认启用 DTrace（Evan Lucas） [#2019](https://github.com/nodejs/node/pull/2019)
* \[[`c0c0d73269`](https://github.com/nodejs/node/commit/c0c0d73269)] - **build,win**: 在生成项目之前设置环境变量（Alexis Campailla） [joyent/node#20109](https://github.com/joyent/node/pull/20109)
* \[[`9e890fe8b4`](https://github.com/nodejs/node/commit/9e890fe8b4)] - **crypto**: 修复 verify 出错时的 VerifyCallback（Shigeki Ohtsu） [#2064](https://github.com/nodejs/node/pull/2064)
* \[[`1f371e3988`](https://github.com/nodejs/node/commit/1f371e3988)] - **deps**: 将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） [#2016](https://github.com/nodejs/node/pull/2016)
* \[[`c370bd3aea`](https://github.com/nodejs/node/commit/c370bd3aea)] - **doc**: 使缩写 1MM 更清晰（Ivan Yan） [#2053](https://github.com/nodejs/node/pull/2053)
* \[[`54d5437566`](https://github.com/nodejs/node/commit/54d5437566)] - **doc**: 添加测试 iojs 构建的示例命令（Jimmy Hsu） [#850](https://github.com/nodejs/node/pull/850)
* \[[`f1f1b7e597`](https://github.com/nodejs/node/commit/f1f1b7e597)] - **doc**: 添加 2015-06-17 的 TSC 会议纪要（Rod Vagg） [#2048](https://github.com/nodejs/node/pull/2048)
* \[[`dbd5dc932d`](https://github.com/nodejs/node/commit/dbd5dc932d)] - **doc**: 明确 benchmark/README.md 中的先决条件（Jeremiah Senkpiel） [#2034](https://github.com/nodejs/node/pull/2034)
* \[[`50dbc8e143`](https://github.com/nodejs/node/commit/50dbc8e143)] - **doc**: 添加 2015-05-27 的 TSC 会议纪要（Rod Vagg） [#2037](https://github.com/nodejs/node/pull/2037)
* \[[`941ad362a7`](https://github.com/nodejs/node/commit/941ad362a7)] - **doc**: 归档 io.js TC 会议纪要（Rod Vagg）
* \[[`644b2eaa89`](https://github.com/nodejs/node/commit/644b2eaa89)] - **doc**: 将 tc-meetings 重命名为 tsc-meetings（Rod Vagg）
* \[[`1330ee3b27`](https://github.com/nodejs/node/commit/1330ee3b27)] - **doc**: 添加 2015-05-13 TC 会议纪要（Rod Vagg） [#1700](https://github.com/nodejs/node/pull/1700)
* \[[`392e8fd64e`](https://github.com/nodejs/node/commit/392e8fd64e)] - **doc**: 将 @shigeki 和 @mscdex 加入 TC（Rod Vagg） [#2008](https://github.com/nodejs/node/pull/2008)
* \[[`af249fa8a1`](https://github.com/nodejs/node/commit/af249fa8a1)] - **net**: 在 nextTick 中包装 connect（Evan Lucas） [#2054](https://github.com/nodejs/node/pull/2054)
* \[[`7f63449fde`](https://github.com/nodejs/node/commit/7f63449fde)] - **net**: 修复 dnsopts 的调试（Evan Lucas） [#2059](https://github.com/nodejs/node/pull/2059)
* \[[`eabed2f518`](https://github.com/nodejs/node/commit/eabed2f518)] - **repl**: 移除过时的 TODO（Rich Trott） [#2081](https://github.com/nodejs/node/pull/2081)
* \[[`a198c68b56`](https://github.com/nodejs/node/commit/a198c68b56)] - **repl**: 使 “Unexpected token” 错误可恢复（Julien Gilli） [#2052](https://github.com/nodejs/node/pull/2052)
* \[[`d735b2c6ef`](https://github.com/nodejs/node/commit/d735b2c6ef)] - **repl**: 修复非全局上下文的制表符补全（Sangmin Yoon） [#2052](https://github.com/nodejs/node/pull/2052)
* \[[`8cee8f54fc`](https://github.com/nodejs/node/commit/8cee8f54fc)] - **src**: 去除 stdin 对 `_readableState.reading` 的操作（Chris Dickinson） [#454](https://github.com/nodejs/node/pull/454)
* \[[`856c11f8c8`](https://github.com/nodejs/node/commit/856c11f8c8)] - **test**: 清理已失效的禁用测试（Rich Trott） [#2045](https://github.com/nodejs/node/pull/2045)
* \[[`4d5089e181`](https://github.com/nodejs/node/commit/4d5089e181)] - **test**: 不要吞掉 OpenSSL 支持错误（Rich Trott） [#2042](https://github.com/nodejs/node/pull/2042)
* \[[`06721fe005`](https://github.com/nodejs/node/commit/06721fe005)] - **test**: 修复 test-repl-tab-complete.js（cjihrig） [#2052](https://github.com/nodejs/node/pull/2052)
* \[[`8e9089ac35`](https://github.com/nodejs/node/commit/8e9089ac35)] - **test**: 检查 Windows 上的错误（Rich Trott） [#2035](https://github.com/nodejs/node/pull/2035)
* \[[`776a65ebcd`](https://github.com/nodejs/node/commit/776a65ebcd)] - **test**: 移除过时的 TODO 注释（Rich Trott） [#2033](https://github.com/nodejs/node/pull/2033)
* \[[`bdfeb798ad`](https://github.com/nodejs/node/commit/bdfeb798ad)] - **test**: 移除过时的 TODO 注释（Rich Trott） [#2032](https://github.com/nodejs/node/pull/2032)
* \[[`58e914f9bc`](https://github.com/nodejs/node/commit/58e914f9bc)] - **tools**: 修复 gyp 以便在没有 XCode 的 MacOSX 上工作（Shigeki Ohtsu） [iojs/io.js#1325](https://github.com/iojs/io.js/pull/1325)
* \[[`99cbbc0a13`](https://github.com/nodejs/node/commit/99cbbc0a13)] - **tools**: 将 gyp 更新到 25ed9ac（Ben Noordhuis） [#2074](https://github.com/nodejs/node/pull/2074)
* \[[`e3f9335c40`](https://github.com/nodejs/node/commit/e3f9335c40)] - **tools**: 重新启用 comma-spacing 代码检查规则（Roman Reiss） [#2072](https://github.com/nodejs/node/pull/2072)
* \[[`d91e10b3bd`](https://github.com/nodejs/node/commit/d91e10b3bd)] - **tools**: 将 eslint 更新到 0.24.0（Roman Reiss） [#2072](https://github.com/nodejs/node/pull/2072)
* \[[`6c61ca5325`](https://github.com/nodejs/node/commit/6c61ca5325)] - **url**: 修复注释中的拼写错误（Rich Trott） [#2071](https://github.com/nodejs/node/pull/2071)
* \[[`1a51f0058c`](https://github.com/nodejs/node/commit/1a51f0058c)] - **v8**: 从上游 cherry-pick JitCodeEvent 补丁（Ben Noordhuis） [#2075](https://github.com/nodejs/node/pull/2075)

<a id="2.3.1"></a>

## 2015-06-23，版本 2.3.1，@rvagg

### 重要变更

* **module**：在 `require()` 期间执行的系统调用次数再次显著减少（见 v2.2.0 中的 [#1801](https://github.com/nodejs/node/pull/1801) 了解之前的工作），这应当会带来性能提升（Pierre Inglebert） [#1920](https://github.com/nodejs/node/pull/1920)。
* **npm**：
  * 升级到 [v2.11.2](https://github.com/npm/npm/releases/tag/v2.11.2)（Rebecca Turner） [#1956](https://github.com/nodejs/node/pull/1956)。
  * 升级到 [v2.11.3](https://github.com/npm/npm/releases/tag/v2.11.3)（Forrest L Norvell） [#2018](https://github.com/nodejs/node/pull/2018)。
* **zlib**：发现一个 bug：如果 zlib 解压的最后一部分导致缓冲区超过 `0x3fffffff` 字节（约 1GiB）的最大长度，进程会中止。这种情况可能只会在缓冲式解压（而非流式）期间出现。现在已修复，改为抛出 `RangeError`（Michaël Zasso） [#1811](https://github.com/nodejs/node/pull/1811)。

### 已知问题

请参见 <https://github.com/nodejs/node/labels/confirmed-bug> 获取已知问题的完整且最新列表。

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所说的那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

## 提交

* \[[`e56758a5e0`](https://github.com/nodejs/node/commit/e56758a5e0)] - **async-wrap**: 添加 provider id 和 object info 回调 (Trevor Norris) [#1896](https://github.com/nodejs/node/pull/1896)
* \[[`d5637e67c9`](https://github.com/nodejs/node/commit/d5637e67c9)] - **buffer**: 修复与 util 的循环依赖 (Brendan Ashworth) [#1988](https://github.com/nodejs/node/pull/1988)
* \[[`c5353d7c62`](https://github.com/nodejs/node/commit/c5353d7c62)] - **build**: 在 Windows 上从 test-ci 中移除 lint (Johan Bergström) [#2004](https://github.com/nodejs/node/pull/2004)
* \[[`c207e8d223`](https://github.com/nodejs/node/commit/c207e8d223)] - **build**: 修复 configure 中 pkg-config 输出解析 (Ben Noordhuis) [#1986](https://github.com/nodejs/node/pull/1986)
* \[[`8d8a26e8f7`](https://github.com/nodejs/node/commit/8d8a26e8f7)] - **build**: 不要从 test-ci 运行 lint (Johan Bergström) [#1965](https://github.com/nodejs/node/pull/1965)
* \[[`1ec53c044d`](https://github.com/nodejs/node/commit/1ec53c044d)] - **build**: 简化已构建二进制文件的执行 (Johan Bergström) [#1955](https://github.com/nodejs/node/pull/1955)
* \[[`3beb880716`](https://github.com/nodejs/node/commit/3beb880716)] - **crypto**: 为 CNNIC 白名单添加证书检查 (Shigeki Ohtsu) [#1895](https://github.com/nodejs/node/pull/1895)
* \[[`48c0fb8b1a`](https://github.com/nodejs/node/commit/48c0fb8b1a)] - **deps**: 使 node-gyp 可与 io.js 协同工作 (cjihrig) [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`6a359b1ce9`](https://github.com/nodejs/node/commit/6a359b1ce9)] - **deps**: 升级到 npm 2.11.3 (Forrest L Norvell) [#2018](https://github.com/nodejs/node/pull/2018)
* \[[`6aab2f3b9a`](https://github.com/nodejs/node/commit/6aab2f3b9a)] - **deps**: 使 node-gyp 可与 io.js 协同工作 (cjihrig) [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`3e12561b55`](https://github.com/nodejs/node/commit/3e12561b55)] - **deps**: 升级到 npm 2.11.2 (Rebecca Turner) [#1956](https://github.com/nodejs/node/pull/1956)
* \[[`8ac50819b6`](https://github.com/nodejs/node/commit/8ac50819b6)] - **doc**: 为 README.md 添加安全部分 (Rod Vagg) [#1948](https://github.com/nodejs/node/pull/1948)
* \[[`1f93b63b11`](https://github.com/nodejs/node/commit/1f93b63b11)] - **doc**: 将信息改为与 gitconfig 中相同 (Christian Tellnes) [#2000](https://github.com/nodejs/node/pull/2000)
* \[[`0cf94e6856`](https://github.com/nodejs/node/commit/0cf94e6856)] - **doc**: 在协作者指南中提及 CI (Rich Trott) [#1995](https://github.com/nodejs/node/pull/1995)
* \[[`7a3006efe4`](https://github.com/nodejs/node/commit/7a3006efe4)] - **doc**: 为协作者指南添加 TOC 链接 (Rich Trott) [#1994](https://github.com/nodejs/node/pull/1994)
* \[[`30638b150f`](https://github.com/nodejs/node/commit/30638b150f)] - **doc**: 添加 TSC 会议记录 2015-06-10 (Bert Belder) [#1943](https://github.com/nodejs/node/pull/1943)
* \[[`c4ec04136b`](https://github.com/nodejs/node/commit/c4ec04136b)] - **doc**: 重新格式化 authors 部分 (Johan Bergström) [#1966](https://github.com/nodejs/node/pull/1966)
* \[[`96165f9be2`](https://github.com/nodejs/node/commit/96165f9be2)] - **doc**: 对 modules API 文档做了轻微澄清 (Сковорода Никита Андреевич) [#1983](https://github.com/nodejs/node/pull/1983)
* \[[`5c2707c1b2`](https://github.com/nodejs/node/commit/5c2707c1b2)] - **doc**: benchmark/README.md 文本校对 (Rich Trott) [#1970](https://github.com/nodejs/node/pull/1970)
* \[[`74fdf732d0`](https://github.com/nodejs/node/commit/74fdf732d0)] - **doc**: 校对 COLLABORATOR\_GUIDE.md (Rich Trott) [#1964](https://github.com/nodejs/node/pull/1964)
* \[[`5fe6e83640`](https://github.com/nodejs/node/commit/5fe6e83640)] - **doc**: 校对 GOVERNANCE.md (Rich Trott) [#1963](https://github.com/nodejs/node/pull/1963)
* \[[`428526544c`](https://github.com/nodejs/node/commit/428526544c)] - **doc**: 添加 ChALkeR 作为协作者 (Сковорода Никита Андреевич) [#1927](https://github.com/nodejs/node/pull/1927)
* \[[`5dfe0d5d61`](https://github.com/nodejs/node/commit/5dfe0d5d61)] - **doc**: 移除无关的 SEMVER-MINOR 和 MAJOR (Rod Vagg)
* \[[`fb8811d95e`](https://github.com/nodejs/node/commit/fb8811d95e)] - **lib,test**: 修复空白字符问题 (Roman Reiss) [#1971](https://github.com/nodejs/node/pull/1971)
* \[[`a4f4909f3d`](https://github.com/nodejs/node/commit/a4f4909f3d)] - **module**: 修复 Windows 上长路径的 stat (Michaël Zasso) [#2013](https://github.com/nodejs/node/pull/2013)
* \[[`a71ee93afe`](https://github.com/nodejs/node/commit/a71ee93afe)] - **module**: 减少 require 搜索期间的系统调用 (Pierre Inglebert) [#1920](https://github.com/nodejs/node/pull/1920)
* \[[`671e64ac73`](https://github.com/nodejs/node/commit/671e64ac73)] - **module**: 允许 Windows 上 require 使用长路径 (Michaël Zasso)
* \[[`061342a500`](https://github.com/nodejs/node/commit/061342a500)] - **net**: 延迟读取，直到可以添加监听器 (James Hartig) [#1496](https://github.com/nodejs/node/pull/1496)
* \[[`5d2b846d11`](https://github.com/nodejs/node/commit/5d2b846d11)] - **test**: 断言 tmp 和 fixture 目录不同 (Rich Trott) [#2015](https://github.com/nodejs/node/pull/2015)
* \[[`b0990ef45d`](https://github.com/nodejs/node/commit/b0990ef45d)] - **test**: 确认符号链接 (Rich Trott) [#2014](https://github.com/nodejs/node/pull/2014)
* \[[`3ba4f71fc4`](https://github.com/nodejs/node/commit/3ba4f71fc4)] - **test**: 尽早检查结果 (Rich Trott) [#2007](https://github.com/nodejs/node/pull/2007)
* \[[`0abcf44d6b`](https://github.com/nodejs/node/commit/0abcf44d6b)] - **test**: 添加 Buffer slice UTF-8 测试 (Rich Trott) [#1989](https://github.com/nodejs/node/pull/1989)
* \[[`88c1831ff4`](https://github.com/nodejs/node/commit/88c1831ff4)] - **test**: tmpdir 创建失败时应使测试失败 (Rich Trott) [#1976](https://github.com/nodejs/node/pull/1976)
* \[[`52a822d944`](https://github.com/nodejs/node/commit/52a822d944)] - **test**: 修复 test-cluster-worker-disconnect (Santiago Gimeno) [#1919](https://github.com/nodejs/node/pull/1919)
* \[[`7c79490bfb`](https://github.com/nodejs/node/commit/7c79490bfb)] - **test**: 仅为需要的测试刷新 tmpDir (Rich Trott) [#1954](https://github.com/nodejs/node/pull/1954)
* \[[`88d7904c0b`](https://github.com/nodejs/node/commit/88d7904c0b)] - **test**: 移除测试重复 (Rich Trott) [#1874](https://github.com/nodejs/node/pull/1874)
* \[[`91dfb5e094`](https://github.com/nodejs/node/commit/91dfb5e094)] - **tools**: 使 test-npm 在没有全局 npm 的情况下也能工作 (Jeremiah Senkpiel) [#1926](https://github.com/nodejs/node/pull/1926)
* \[[`3777f41562`](https://github.com/nodejs/node/commit/3777f41562)] - **tools**: 在 eslint 中启用与空白字符相关的规则 (Roman Reiss) [#1971](https://github.com/nodejs/node/pull/1971)
* \[[`626432d843`](https://github.com/nodejs/node/commit/626432d843)] - **util**: 不要重复 isBuffer (Brendan Ashworth) [#1988](https://github.com/nodejs/node/pull/1988)
* \[[`1d79f572f1`](https://github.com/nodejs/node/commit/1d79f572f1)] - **util**: 将 deprecate() 移到内部模块 (Brendan Ashworth) [#1988](https://github.com/nodejs/node/pull/1988)
* \[[`4b4b1760b5`](https://github.com/nodejs/node/commit/4b4b1760b5)] - **v8**: 从上游 cherry-pick uclibc 构建补丁 (Ben Noordhuis) [#1974](https://github.com/nodejs/node/pull/1974)
* \[[`5d0cee46bb`](https://github.com/nodejs/node/commit/5d0cee46bb)] - **vm**: 移除不必要的 HandleScopes (Ben Noordhuis) [#2001](https://github.com/nodejs/node/pull/2001)
* \[[`0ecf9457b5`](https://github.com/nodejs/node/commit/0ecf9457b5)] - **win,node-gyp**: 默认启用 delay-load hook (Bert Belder) [iojs/io.js#1433](https://github.com/iojs/io.js/pull/1433)
* \[[`953b3e75e8`](https://github.com/nodejs/node/commit/953b3e75e8)] - **win,node-gyp**: 默认启用 delay-load hook (Bert Belder) [iojs/io.js#1433](https://github.com/iojs/io.js/pull/1433)
* \[[`3806d875d3`](https://github.com/nodejs/node/commit/3806d875d3)] - **zlib**: 防止 zlibBuffer 中出现未捕获异常 (Michaël Zasso) [#1811](https://github.com/nodejs/node/pull/1811)

<a id="2.3.0"></a>

## 2015-06-13，版本 2.3.0，@rvagg

### 显著变更

* **libuv**: 已升级到 1.6.0 和 1.6.1，详情请参见[完整变更日志](https://github.com/libuv/libuv/blob/60e515d9e6f3d86c0eedad583805201f32ea3aed/ChangeLog#L1-L36)。(Saúl Ibarra Corretgé) [#1905](https://github.com/nodejs/node/pull/1905) [#1889](https://github.com/nodejs/node/pull/1889)。主要内容包括：
  * 修复 TTY 在 OS X 上被阻塞的问题
  * 修复 UDP send 回调不应为同步的问题
  * 添加 `uv_os_homedir()`（已公开为 `os.homedir()`，见下文）
* **npm**: 详情请参见完整[发布说明](https://github.com/npm/npm/releases/tag/v2.11.1)。(Kat Marchán) [#1899](https://github.com/nodejs/node/pull/1899)。要点：
  * 使用 GIT\_SSH\_COMMAND（从 Git 2.3 起可用）
* **openssl**：
  * 升级到 1.0.2b 和 1.0.2c，新增 DHE 中间人攻击防护（Logjam），并修复了导致无限循环的畸形 ECParameters（CVE-2015-1788）。完整详情请参见[安全公告](https://www.openssl.org/news/secadv_20150611.txt)。(Shigeki Ohtsu) [#1950](https://github.com/nodejs/node/pull/1950) [#1958](https://github.com/nodejs/node/pull/1958)
  * 支持 OpenSSL 的 [FIPS](https://en.wikipedia.org/wiki/Federal_Information_Processing_Standards) 模式，说明请参见 [README](https://github.com/nodejs/node#building-iojs-with-fips-compliant-openssl)。(Fedor Indutny) [#1890](https://github.com/nodejs/node/pull/1890)
* **os**: 添加 `os.homedir()` 方法。(Colin Ihrig) [#1791](https://github.com/nodejs/node/pull/1791)
* **smalloc**: 将整个模块标记为弃用。(Vladimir Kurchatkin) [#1822](https://github.com/nodejs/node/pull/1822)
* 新增协作者：
  * Alex Kocharin ([@rlidwka](https://github.com/rlidwka))
  * Christopher Monsanto ([@monsanto](https://github.com/monsanto))
  * Ali Ijaz Sheikh ([@ofrobots](https://github.com/ofrobots))
  * Oleg Elifantiev ([@Olegas](https://github.com/Olegas))
  * Domenic Denicola ([@domenic](https://github.com/domenic))
  * Rich Trott ([@Trott](https://github.com/Trott))

### 已知问题

完整且最新的已知问题列表请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* `beforeExit` 期间运行未引用定时器的一些问题仍待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所说的那样是同步的，这是在 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及 [#774](https://github.com/nodejs/node/issues/774) 中的修复。
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会因断言失败而导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

## 提交

* \[[`9c0a1b8cfc`](https://github.com/nodejs/node/commit/9c0a1b8cfc)] - **cluster**: 在断开连接前等待服务器关闭（Oleg Elifantiev） [#1400](https://github.com/nodejs/node/pull/1400)
* \[[`0f68377f69`](https://github.com/nodejs/node/commit/0f68377f69)] - **crypto**: 支持 OpenSSL 的 FIPS 模式（Fedor Indutny） [#1890](https://github.com/nodejs/node/pull/1890)
* \[[`38d1afc24d`](https://github.com/nodejs/node/commit/38d1afc24d)] - **(SEMVER-MINOR)** **crypto**: 添加 getCurves() 以获取受支持的 EC（Brian White） [#1914](https://github.com/nodejs/node/pull/1914)
* \[[`a4dbf45b59`](https://github.com/nodejs/node/commit/a4dbf45b59)] - **crypto**: 更新根证书（Ben Noordhuis） [#1833](https://github.com/nodejs/node/pull/1833)
* \[[`81029c639a`](https://github.com/nodejs/node/commit/81029c639a)] - **debugger**: 改进 ESRCH 错误消息（Jackson Tian） [#1863](https://github.com/nodejs/node/pull/1863)
* \[[`2a7fd0ad32`](https://github.com/nodejs/node/commit/2a7fd0ad32)] - **deps**: 将 UPGRADING.md 文档更新为 openssl-1.0.2c（Shigeki Ohtsu） [#1958](https://github.com/nodejs/node/pull/1958)
* \[[`6b3df929e0`](https://github.com/nodejs/node/commit/6b3df929e0)] - **deps**: 替换 openssl 中的所有头文件（Shigeki Ohtsu） [#1958](https://github.com/nodejs/node/pull/1958)
* \[[`664a659696`](https://github.com/nodejs/node/commit/664a659696)] - **deps**: 为 openssl s_client 添加 -no_rand_screen（Shigeki Ohtsu） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`42a8de2ac6`](https://github.com/nodejs/node/commit/42a8de2ac6)] - **deps**: 修复 openssl 在 x86_win32 中的 asm 构建错误（Shigeki Ohtsu） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`c66c3d9fa3`](https://github.com/nodejs/node/commit/c66c3d9fa3)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`86737cf0a0`](https://github.com/nodejs/node/commit/86737cf0a0)] - **deps**: 将 openssl 源码升级到 1.0.2c（Shigeki Ohtsu） [#1958](https://github.com/nodejs/node/pull/1958)
* \[[`94804969b7`](https://github.com/nodejs/node/commit/94804969b7)] - **deps**: 为 openssl-1.0.2b 更新 asm 文件（Shigeki Ohtsu） [#1950](https://github.com/nodejs/node/pull/1950)
* \[[`38444915e0`](https://github.com/nodejs/node/commit/38444915e0)] - **deps**: 替换 openssl 中的所有头文件（Shigeki Ohtsu） [#1950](https://github.com/nodejs/node/pull/1950)
* \[[`f62b613252`](https://github.com/nodejs/node/commit/f62b613252)] - **deps**: 为 openssl s_client 添加 -no_rand_screen（Shigeki Ohtsu） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`f624d0122c`](https://github.com/nodejs/node/commit/f624d0122c)] - **deps**: 修复 openssl 在 x86_win32 中的 asm 构建错误（Shigeki Ohtsu） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`dcd67cc8d7`](https://github.com/nodejs/node/commit/dcd67cc8d7)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`c21b24decf`](https://github.com/nodejs/node/commit/c21b24decf)] - **deps**: 将 openssl 源码升级到 1.0.2b（Shigeki Ohtsu） [#1950](https://github.com/nodejs/node/pull/1950)
* \[[`2dc819b09a`](https://github.com/nodejs/node/commit/2dc819b09a)] - **deps**: 使 node-gyp 可与 io.js 一起工作（cjihrig） [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`f41b7f12b5`](https://github.com/nodejs/node/commit/f41b7f12b5)] - **deps**: 升级到 npm 2.11.1（Kat Marchán） [#1899](https://github.com/nodejs/node/pull/1899)
* \[[`a5bd466440`](https://github.com/nodejs/node/commit/a5bd466440)] - **deps**: 将 libuv 更新到 1.6.1 版本（Saúl Ibarra Corretgé） [#1905](https://github.com/nodejs/node/pull/1905)
* \[[`aa33db3238`](https://github.com/nodejs/node/commit/aa33db3238)] - **deps**: 将 libuv 更新到 1.6.0 版本（Saúl Ibarra Corretgé） [#1889](https://github.com/nodejs/node/pull/1889)
* \[[`0ee497f0b4`](https://github.com/nodejs/node/commit/0ee497f0b4)] - **deps**: 为 openssl s_client 添加 -no_rand_screen（Shigeki Ohtsu） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`b5cd2f0986`](https://github.com/nodejs/node/commit/b5cd2f0986)] - **dgram**: 部分回退 18d457b（Saúl Ibarra Corretgé） [#1889](https://github.com/nodejs/node/pull/1889)
* \[[`a3cc43d0a4`](https://github.com/nodejs/node/commit/a3cc43d0a4)] - **doc**: 添加 Trott 为协作者（Rich Trott） [#1962](https://github.com/nodejs/node/pull/1962)
* \[[`cf5020fc02`](https://github.com/nodejs/node/commit/cf5020fc02)] - **doc**: 添加 domenic 为协作者（Domenic Denicola） [#1942](https://github.com/nodejs/node/pull/1942)
* \[[`11ed5f31ab`](https://github.com/nodejs/node/commit/11ed5f31ab)] - **doc**: 添加 Olegas 为协作者（Oleg Elifantiev） [#1930](https://github.com/nodejs/node/pull/1930)
* \[[`f500e1833b`](https://github.com/nodejs/node/commit/f500e1833b)] - **doc**: 添加 ofrobots 为协作者（Ali Ijaz Sheikh）
* \[[`717724611a`](https://github.com/nodejs/node/commit/717724611a)] - **doc**: 添加 monsanto 为协作者（Christopher Monsanto） [#1932](https://github.com/nodejs/node/pull/1932)
* \[[`7192b6688c`](https://github.com/nodejs/node/commit/7192b6688c)] - **doc**: 添加 rlidwka 为协作者（Alex Kocharin） [#1929](https://github.com/nodejs/node/pull/1929)
* \[[`9f3a03f0d4`](https://github.com/nodejs/node/commit/9f3a03f0d4)] - **doc**: 添加对 crypto.getCurves() 的引用（Roman Reiss） [#1918](https://github.com/nodejs/node/pull/1918)
* \[[`ff39ecb914`](https://github.com/nodejs/node/commit/ff39ecb914)] - **doc**: 删除逗号拼接错误（Rich Trott） [#1900](https://github.com/nodejs/node/pull/1900)
* \[[`deb8b87dc9`](https://github.com/nodejs/node/commit/deb8b87dc9)] - **doc**: 添加关于可用 ECC 曲线的说明（Ryan Petschek） [#1913](https://github.com/nodejs/node/pull/1913)
* \[[`89a5b9040e`](https://github.com/nodejs/node/commit/89a5b9040e)] - **doc**: 修复 http.IncomingMessage.socket 文档（Сковорода Никита Андреевич） [#1867](https://github.com/nodejs/node/pull/1867)
* \[[`d29034b34b`](https://github.com/nodejs/node/commit/d29034b34b)] - **doc**: 调整变更日志以澄清 `client` 回退（Rod Vagg） [#1859](https://github.com/nodejs/node/pull/1859)
* \[[`a79dece8ad`](https://github.com/nodejs/node/commit/a79dece8ad)] - **docs**: 为同步 fs 函数添加返回值（Tyler Anton） [#1770](https://github.com/nodejs/node/pull/1770)
* \[[`1cb72c14c4`](https://github.com/nodejs/node/commit/1cb72c14c4)] - **docs**: 删除未使用/重复的 css 文件（Robert Kowalski） [#1770](https://github.com/nodejs/node/pull/1770)
* \[[`53a4eb3198`](https://github.com/nodejs/node/commit/53a4eb3198)] - **fs**: 使 SyncWriteStream 不可枚举（Sakthipriyan Vairamani） [#1870](https://github.com/nodejs/node/pull/1870)
* \[[`a011c3243f`](https://github.com/nodejs/node/commit/a011c3243f)] - **fs**: 小幅重构（Sakthipriyan Vairamani） [#1870](https://github.com/nodejs/node/pull/1870)
* \[[`8841132f30`](https://github.com/nodejs/node/commit/8841132f30)] - **fs**: 移除 inStatWatchers 并使用 Map 进行查找（Sakthipriyan Vairamani） [#1870](https://github.com/nodejs/node/pull/1870)
* \[[`67a11b9bcc`](https://github.com/nodejs/node/commit/67a11b9bcc)] - **fs**: 移除不必要的 nullCheckCallNT（Sakthipriyan Vairamani） [#1870](https://github.com/nodejs/node/pull/1870)
* \[[`09f2a67bd8`](https://github.com/nodejs/node/commit/09f2a67bd8)] - **fs**: 改进错误消息描述（Sakthipriyan Vairamani） [#1870](https://github.com/nodejs/node/pull/1870)
* \[[`2dcef83b5f`](https://github.com/nodejs/node/commit/2dcef83b5f)] - **fs**: 使用 binding 中的 `kMaxLength`（Vladimir Kurchatkin） [#1903](https://github.com/nodejs/node/pull/1903)
* \[[`353e26e3c7`](https://github.com/nodejs/node/commit/353e26e3c7)] - **(SEMVER-MINOR)** **fs**: 为 Stream 方法添加字符串编码选项（Yosuke Furukawa） [#1845](https://github.com/nodejs/node/pull/1845)
* \[[`8357c5084b`](https://github.com/nodejs/node/commit/8357c5084b)] - **fs**: 为 fs.createWriteStream 设置编码（Yosuke Furukawa） [#1844](https://github.com/nodejs/node/pull/1844)
* \[[`02c345020a`](https://github.com/nodejs/node/commit/02c345020a)] - **gitignore**: 不要忽略 debug npm 模块（Kat Marchán） [#1908](https://github.com/nodejs/node/pull/1908)
* \[[`b5b8ff117c`](https://github.com/nodejs/node/commit/b5b8ff117c)] - **lib**: 不要使用全局 Buffer（Roman Reiss） [#1794](https://github.com/nodejs/node/pull/1794)
* \[[`a251657058`](https://github.com/nodejs/node/commit/a251657058)] - **node**: 尽快将 promises 标记为已处理（Vladimir Kurchatkin） [#1952](https://github.com/nodejs/node/pull/1952)
* \[[`2eb170874a`](https://github.com/nodejs/node/commit/2eb170874a)] - **openssl**: 修复 win32 应用中的按键要求（Shigeki Ohtsu） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`a130132c8f`](https://github.com/nodejs/node/commit/a130132c8f)] - **openssl**: 修复 win32 应用中的按键要求（Shigeki Ohtsu） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`6e78e5feaa`](https://github.com/nodejs/node/commit/6e78e5feaa)] - **(SEMVER-MINOR)** **os**: 添加 homedir()（cjihrig） [#1791](https://github.com/nodejs/node/pull/1791)
* \[[`d9e250295b`](https://github.com/nodejs/node/commit/d9e250295b)] - _**Revert**_ "**readline**: 允许输入中的制表符"（Jeremiah Senkpiel） [#1961](https://github.com/nodejs/node/pull/1961)
* \[[`4b3d493c4b`](https://github.com/nodejs/node/commit/4b3d493c4b)] - **readline**: 允许输入中的制表符（Rich Trott） [#1761](https://github.com/nodejs/node/pull/1761)
* \[[`6d95f4ff92`](https://github.com/nodejs/node/commit/6d95f4ff92)] - **(SEMVER-MINOR)** **smalloc**: 弃用整个模块（Vladimir Kurchatkin） [#1822](https://github.com/nodejs/node/pull/1822)
* \[[`8c71a9241d`](https://github.com/nodejs/node/commit/8c71a9241d)] - **src**: 隐藏 InitializeICUDirectory 符号（Ben Noordhuis） [#1815](https://github.com/nodejs/node/pull/1815)
* \[[`5b6f575c1f`](https://github.com/nodejs/node/commit/5b6f575c1f)] - _**Revert**_ "**src**: 添加 getopt 参数解析器"（Evan Lucas） [#1862](https://github.com/nodejs/node/pull/1862)
* \[[`c0e7bf2d8c`](https://github.com/nodejs/node/commit/c0e7bf2d8c)] - **src**: 添加 getopt 参数解析器（Evan Lucas） [#1804](https://github.com/nodejs/node/pull/1804)
* \[[`8ea6844d26`](https://github.com/nodejs/node/commit/8ea6844d26)] - **test**: 为 REPL 中保存失败添加测试（Rich Trott） [#1818](https://github.com/nodejs/node/pull/1818)
* \[[`03ce84dfa1`](https://github.com/nodejs/node/commit/03ce84dfa1)] - **test**: 修复 cluster-worker-wait-server-close 竞态条件（Sam Roberts） [#1953](https://github.com/nodejs/node/pull/1953)
* \[[`a6b8ee19b8`](https://github.com/nodejs/node/commit/a6b8ee19b8)] - **test**: 在 common.js 中创建临时目录（Rich Trott） [#1877](https://github.com/nodejs/node/pull/1877)
* \[[`ff8202c6f4`](https://github.com/nodejs/node/commit/ff8202c6f4)] - **test**: 修复未声明变量访问（Roman Reiss） [#1794](https://github.com/nodejs/node/pull/1794)
* \[[`d9ddd7d345`](https://github.com/nodejs/node/commit/d9ddd7d345)] - **test**: 删除 TODO 注释（Rich Trott） [#1820](https://github.com/nodejs/node/pull/1820)
* \[[`6537fd4b55`](https://github.com/nodejs/node/commit/6537fd4b55)] - **test**: 删除 TODO（Rich Trott） [#1875](https://github.com/nodejs/node/pull/1875)
* \[[`a804026c9b`](https://github.com/nodejs/node/commit/a804026c9b)] - **test**: 修复损坏的 FreeBSD 测试（Santiago Gimeno） [#1881](https://github.com/nodejs/node/pull/1881)
* \[[`43a82f8a71`](https://github.com/nodejs/node/commit/43a82f8a71)] - **test**: 修复 test-sync-io-option（Evan Lucas） [#1840](https://github.com/nodejs/node/pull/1840)
* \[[`4ed25f664d`](https://github.com/nodejs/node/commit/4ed25f664d)] - **test**: 为 tls-server-verify 添加 -no_rand_screen（Shigeki Ohtsu） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`4cf323d23d`](https://github.com/nodejs/node/commit/4cf323d23d)] - **test**: 为加速而在 tls-server-verify 中终止子进程（Shigeki Ohtsu） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`e6ccdcc1fe`](https://github.com/nodejs/node/commit/e6ccdcc1fe)] - **test**: 改进 tls-server-verify 的控制台输出（João Reis） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`975e5956f0`](https://github.com/nodejs/node/commit/975e5956f0)] - **test**: 并行运行 tls-server-verify 服务器（João Reis） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`b18604ba2c`](https://github.com/nodejs/node/commit/b18604ba2c)] - **test**: 并行运行 tls-server-verify 客户端（João Reis） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`f78c722df5`](https://github.com/nodejs/node/commit/f78c722df5)] - **test**: 移除对 'iojs' 的硬编码引用（Rod Vagg） [#1882](https://github.com/nodejs/node/pull/1882)
* \[[`bd99e8de8e`](https://github.com/nodejs/node/commit/bd99e8de8e)] - **test**: 增加 maxConnections 的测试覆盖（Rich Trott） [#1855](https://github.com/nodejs/node/pull/1855)
* \[[`b9267189a5`](https://github.com/nodejs/node/commit/b9267189a5)] - **test**: 修复 test-child-process-stdout-flush-exit（Santiago Gimeno） [#1868](https://github.com/nodejs/node/pull/1868)
* \[[`d20f018dcf`](https://github.com/nodejs/node/commit/d20f018dcf)] - **test**: 放宽检测无限循环的条件（Yosuke Furukawa） [#1857](https://github.com/nodejs/node/pull/1857)
* \[[`e0e96acc6f`](https://github.com/nodejs/node/commit/e0e96acc6f)] - **test**: 移除 smalloc 插件测试（Ben Noordhuis） [#1835](https://github.com/nodejs/node/pull/1835)
* \[[`8704c58fc4`](https://github.com/nodejs/node/commit/8704c58fc4)] - **test**: 移除不需要的注释任务（Rich Trott） [#1858](https://github.com/nodejs/node/pull/1858)
* \[[`8732977536`](https://github.com/nodejs/node/commit/8732977536)] - **tls**: 修复对未定义 `cb` 的引用（Fedor Indutny） [#1951](https://github.com/nodejs/node/pull/1951)
* \[[`75930bb38c`](https://github.com/nodejs/node/commit/75930bb38c)] - **tls**: 防止 use-after-free（Fedor Indutny） [#1702](https://github.com/nodejs/node/pull/1702)
* \[[`5795e835a1`](https://github.com/nodejs/node/commit/5795e835a1)] - **tls**: 在异步操作期间于关闭时发出错误（Fedor Indutny） [#1702](https://github.com/nodejs/node/pull/1702)
* \[[`59d9734e21`](https://github.com/nodejs/node/commit/59d9734e21)] - **tls_wrap**: 在 DestroySSL 中调用已排队的回调（Fedor Indutny） [#1702](https://github.com/nodejs/node/pull/1702)
* \[[`6e4d30286d`](https://github.com/nodejs/node/commit/6e4d30286d)] - **tools**: 启用/添加额外的 eslint 规则（Roman Reiss） [#1794](https://github.com/nodejs/node/pull/1794)
* \[[`098354a9f8`](https://github.com/nodejs/node/commit/098354a9f8)] - **tools**: 更新 certdata.txt（Ben Noordhuis） [#1833](https://github.com/nodejs/node/pull/1833)
* \[[`a2d921d6a0`](https://github.com/nodejs/node/commit/a2d921d6a0)] - **tools**: 自定义 mk-ca-bundle.pl（Ben Noordhuis） [#1833](https://github.com/nodejs/node/pull/1833)
* \[[`5be9efca40`](https://github.com/nodejs/node/commit/5be9efca40)] - **tools**: 将 mk-ca-bundle.pl 更新到上游 HEAD（Ben Noordhuis） [#1833](https://github.com/nodejs/node/pull/1833)
* \[[`1baba0580d`](https://github.com/nodejs/node/commit/1baba0580d)] - **tools**: 修复复制 deps/npm 内容的问题（thefourtheye） [#1853](https://github.com/nodejs/node/pull/1853)
* \[[`628845b816`](https://github.com/nodejs/node/commit/628845b816)] - **(SEMVER-MINOR)** **util**: 引入 `printDeprecationMessage` 函数（Vladimir Kurchatkin） [#1822](https://github.com/nodejs/node/pull/1822)
* \[[`91d0a8b19c`](https://github.com/nodejs/node/commit/91d0a8b19c)] - **win,node-gyp**: 默认启用 delay-load hook（Bert Belder） [iojs/io.js#1433](https://github.com/iojs/io.js/pull/1433)

<a id="2.2.1"></a>

## 2015-06-01，版本 2.2.1，@rvagg

### 重要变更

* **http**：撤销将 `IncomingMessage` 的 `client` 属性移动到其原型上的改动。尽管没有文档说明，但这个属性在实际使用中被当作“自有属性”依赖，最典型的是 [request](https://github.com/request/request)，而 npm 正在使用它。（Michaël Zasso） [#1852](https://github.com/nodejs/node/pull/1852)。

### 已知问题

请参见 <https://github.com/nodejs/node/labels/confirmed-bug> 以获取完整且最新的已知问题列表。

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会传递 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`c5a1009903`](https://github.com/nodejs/node/commit/c5a1009903)] - **build**：避免向构建标志传递空字符串（Johan Bergström） [#1789](https://github.com/nodejs/node/pull/1789)
* \[[`5d83401086`](https://github.com/nodejs/node/commit/5d83401086)] - **doc**：将 SEMVER-MINOR 标记加到预加载模块修复 2.2.0 上（Rod Vagg）
* \[[`4d6b768e5d`](https://github.com/nodejs/node/commit/4d6b768e5d)] - **http**：撤销对 client 属性的弃用处理（Michaël Zasso） [#1852](https://github.com/nodejs/node/pull/1852)

<a id="2.2.0"></a>

## 2015-05-31，版本 2.2.0，@rvagg

### 重要变更

* **node**：通过用更适合此使用场景且不会创建那么多供垃圾回收器清理对象的内部变体，替换 `fs.statSync()` 和 `fs.readFileSync()` 的使用，从而加速 `require()`。主要有两点收益：典型应用的启动时间显著提升，以及通过几乎消除成千上万的异常事件来改善调试器的启动时间。（Ben Noordhuis） [#1801](https://github.com/nodejs/node/pull/1801)。
* **node**：预加载模块（`-r` 或 `--require`）的解析现在遵循标准的 `require()` 规则，而不只是解析路径，因此现在可以在 node_modules 中预加载模块。（Ali Ijaz Sheikh） [#1812](https://github.com/nodejs/node/pull/1812)。
* **npm**：npm 升级到 v2.11.0。为 `preversion`、`version` 和 `postversion` 生命周期事件新增了钩子，还包括一些与 SPDX 相关的许可证变更和许可证文件纳入。完整详情请参见 [发布说明](https://github.com/npm/npm/releases/tag/v2.11.0)。

### 已知问题

请参见 <https://github.com/nodejs/node/labels/confirmed-bug> 以获取完整且最新的已知问题列表。

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会传递 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`a77c330c32`](https://github.com/nodejs/node/commit/a77c330c32)] - **(SEMVER-MINOR)** **child_process**：暴露 ChildProcess 构造函数（Evan Lucas） [#1760](https://github.com/nodejs/node/pull/1760)
* \[[`3a1bc067d4`](https://github.com/nodejs/node/commit/3a1bc067d4)] - _**Revert**_ “**core**：将 PROVIDER 类型设为 Persistent 类 id”（Ben Noordhuis） [#1827](https://github.com/nodejs/node/pull/1827)
* \[[`f9fd554500`](https://github.com/nodejs/node/commit/f9fd554500)] - **deps**：使 node-gyp 可与 io.js 配合工作（cjihrig） [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`c1afa53648`](https://github.com/nodejs/node/commit/c1afa53648)] - **deps**：将 npm 升级到 2.11.0（Forrest L Norvell） [iojs/io.js#1829](https://github.com/iojs/io.js/pull/1829)
* \[[`ff794498e7`](https://github.com/nodejs/node/commit/ff794498e7)] - **doc**：`fs.*File()` 也接受编码字符串（Rich Trott） [#1806](https://github.com/nodejs/node/pull/1806)
* \[[`98649fd31a`](https://github.com/nodejs/node/commit/98649fd31a)] - **doc**：为 AtExit 钩子添加文档（Steve Sharp） [#1014](https://github.com/nodejs/node/pull/1014)
* \[[`eb1856dfd1`](https://github.com/nodejs/node/commit/eb1856dfd1)] - **doc**：澄清 fs.watch 及相关 API 的稳定性（Rich Trott） [#1775](https://github.com/nodejs/node/pull/1775)
* \[[`a74c2c9458`](https://github.com/nodejs/node/commit/a74c2c9458)] - **doc**：说明 url 解码行为（Josh Gummersall） [#1731](https://github.com/nodejs/node/pull/1731)
* \[[`ba76a9d872`](https://github.com/nodejs/node/commit/ba76a9d872)] - **doc**：从 CHANGELOG 中移除错误的 semver-major 条目（Rod Vagg） [#1782](https://github.com/nodejs/node/pull/1782)
* \[[`a6a3f8c78d`](https://github.com/nodejs/node/commit/a6a3f8c78d)] - **doc**：修复 changelog 中的 s/2.0.3/2.1.0（Rod Vagg）
* \[[`2c686fd3ce`](https://github.com/nodejs/node/commit/2c686fd3ce)] - **http**：刷新已存储的 header（Vladimir Kurchatkin） [#1695](https://github.com/nodejs/node/pull/1695)
* \[[`1eec5f091a`](https://github.com/nodejs/node/commit/1eec5f091a)] - **http**：简化代码并移除未使用的属性（Brian White） [#1572](https://github.com/nodejs/node/pull/1572)
* \[[`1bbf8d0720`](https://github.com/nodejs/node/commit/1bbf8d0720)] - **lib**：加速 require()，第 2 阶段（Ben Noordhuis） [#1801](https://github.com/nodejs/node/pull/1801)
* \[[`b14fd1a720`](https://github.com/nodejs/node/commit/b14fd1a720)] - **lib**：加速 require()，第 1 阶段（Ben Noordhuis） [#1801](https://github.com/nodejs/node/pull/1801)
* \[[`5abd4ac079`](https://github.com/nodejs/node/commit/5abd4ac079)] - **lib**：简化 nextTick() 的使用（Brian White） [#1612](https://github.com/nodejs/node/pull/1612)
* \[[`5759722cfa`](https://github.com/nodejs/node/commit/5759722cfa)] - **(SEMVER-MINOR)** **src**：修复预加载模块的模块搜索路径（Ali Ijaz Sheikh） [#1812](https://github.com/nodejs/node/pull/1812)
* \[[`a65762cab6`](https://github.com/nodejs/node/commit/a65762cab6)] - **src**：移除旧代码（Brendan Ashworth） [#1819](https://github.com/nodejs/node/pull/1819)
* \[[`93a44d5228`](https://github.com/nodejs/node/commit/93a44d5228)] - **src**：修复在 -e 下 deferred events 不起作用的问题（Ben Noordhuis） [#1793](https://github.com/nodejs/node/pull/1793)
* \[[`8059393934`](https://github.com/nodejs/node/commit/8059393934)] - **test**：检查 net.Server.listen() 返回的错误类型（Rich Trott） [#1821](https://github.com/nodejs/node/pull/1821)
* \[[`4e90c82cdb`](https://github.com/nodejs/node/commit/4e90c82cdb)] - **test**：添加 heap profiler 附加组件回归测试（Ben Noordhuis） [#1828](https://github.com/nodejs/node/pull/1828)
* \[[`6dfca71af0`](https://github.com/nodejs/node/commit/6dfca71af0)] - **test**：不要对自动生成的 test/addons/doc-\*/ 进行 lint（Ben Noordhuis） [#1793](https://github.com/nodejs/node/pull/1793)
* \[[`c2b8b30836`](https://github.com/nodejs/node/commit/c2b8b30836)] - **test**：移除多余的版权声明（Ben Noordhuis） [#1793](https://github.com/nodejs/node/pull/1793)
* \[[`280fb01daf`](https://github.com/nodejs/node/commit/280fb01daf)] - **test**：修复 addons 测试中的弃用警告（Ben Noordhuis） [#1793](https://github.com/nodejs/node/pull/1793)
* \[[`8606793999`](https://github.com/nodejs/node/commit/8606793999)] - **tools**：向 logger 传递常量而不是字符串（Johan Bergström） [#1842](https://github.com/nodejs/node/pull/1842)
* \[[`fbd2b59716`](https://github.com/nodejs/node/commit/fbd2b59716)] - **tools**：在 .eslintrc 中添加 objectLiteralShorthandProperties（Evan Lucas） [#1760](https://github.com/nodejs/node/pull/1760)
* \[[`53e98cc1b4`](https://github.com/nodejs/node/commit/53e98cc1b4)] - **win,node-gyp**：默认启用 delay-load hook（Bert Belder） [#1763](https://github.com/nodejs/node/pull/1763)

<a id="2.1.0"></a>

## 2015-05-24，版本 2.1.0，@rvagg

### 重要变更

* **crypto**：Diffie-Hellman 密钥交换（DHE）参数（`'dhparams'`）现在必须为 1024 位或更长，否则会抛出错误。如果你提供少于 2048 位的参数，控制台还会打印警告。有关这一安全问题的更多背景，请参见 <https://weakdh.org/>。（Shigeki Ohtsu） [#1739](https://github.com/nodejs/node/pull/1739)。
* **node**：新的 `--trace-sync-io` 命令行标志会在每次使用同步 API 时打印警告和堆栈跟踪。可用于追踪可能拖慢应用程序的同步调用。（Trevor Norris） [#1707](https://github.com/nodejs/node/pull/1707)。
* **node**：为了支持方法链式调用，`'net'`、`'dgram'`、`'http'`、`'https'` 和 `'tls'` 中使用的 `setTimeout()`、`setKeepAlive()`、`setNoDelay()`、`ref()` 和 `unref()` 方法现在返回当前实例而不是 `undefined`（Roman Reiss & Evan Lucas） [#1699](https://github.com/nodejs/node/pull/1699) [#1768](https://github.com/nodejs/node/pull/1768) [#1779](https://github.com/nodejs/node/pull/1779)。
* **npm**：升级到 v2.10.1，发布说明可在 <https://github.com/npm/npm/releases/tag/v2.10.1> 和 <https://github.com/npm/npm/releases/tag/v2.10.0> 中找到。
* **util**：对于传给 `util.format()` 的单个字符串参数这一常见场景，性能有显著提升（约 35%），而 `console.log()` 会使用它（Сковорода Никита Андреевич） [#1749](https://github.com/nodejs/node/pull/1749)。

### 已知问题

请参见 <https://github.com/nodejs/node/labels/confirmed-bug> 以获取完整且最新的已知问题列表。

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会传递 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`9da168b71f`](https://github.com/nodejs/node/commit/9da168b71f)] - **buffer**：优化 Buffer.byteLength（Brendan Ashworth） [#1713](https://github.com/nodejs/node/pull/1713)
* \[[`2b1c01c2cc`](https://github.com/nodejs/node/commit/2b1c01c2cc)] - **build**：为共享库重构 pkg-config（Johan Bergström） [#1603](https://github.com/nodejs/node/pull/1603)
* \[[`3c44100558`](https://github.com/nodejs/node/commit/3c44100558)] - **core**：将 PROVIDER 类型设为 Persistent 类 id（Trevor Norris） [#1730](https://github.com/nodejs/node/pull/1730)
* \[[`c1de6d249e`](https://github.com/nodejs/node/commit/c1de6d249e)] - **(SEMVER-MINOR)** **core**：实现用于跟踪同步 io 的运行时标志（Trevor Norris） [#1707](https://github.com/nodejs/node/pull/1707)
* \[[`9e7099fa4e`](https://github.com/nodejs/node/commit/9e7099fa4e)] - **deps**：使 node-gyp 可与 io.js 配合工作（cjihrig） [iojs/io.js#990](https://github.com/iojs/io.js/pull/990)
* \[[`c54d057598`](https://github.com/nodejs/node/commit/c54d057598)] - **deps**：升级到 npm 2.10.1（Rebecca Turner） [#1763](https://github.com/nodejs/node/pull/1763)
* \[[`367ffd167d`](https://github.com/nodejs/node/commit/367ffd167d)] - **doc**：更新 AUTHORS 列表（Rod Vagg） [#1776](https://github.com/nodejs/node/pull/1776)
* \[[`2bb2f06b3e`](https://github.com/nodejs/node/commit/2bb2f06b3e)] - **doc**：修复 CONTRIBUTING.md 中的拼写错误（Rich Trott） [#1755](https://github.com/nodejs/node/pull/1755)
* \[[`515afc6367`](https://github.com/nodejs/node/commit/515afc6367)] - **doc**：在 url.format 中忽略 path（Maurice Butler） [#1753](https://github.com/nodejs/node/pull/1753)
* \[[`f0a8bc3f84`](https://github.com/nodejs/node/commit/f0a8bc3f84)] - **doc**：修复 CHANGELOG 中的拼写（Felipe Batista）
* \[[`86dd244d9b`](https://github.com/nodejs/node/commit/86dd244d9b)] - **doc**：为 child_process.fork() 和 .exec() 添加说明（Rich Trott） [#1718](https://github.com/nodejs/node/pull/1718)
* \[[`066274794c`](https://github.com/nodejs/node/commit/066274794c)] - **doc**：将链接从 iojs/io.js 更新为 nodejs/io.js（Frederic Hemberger） [#1715](https://github.com/nodejs/node/pull/1715)
* \[[`cb381fe3e0`](https://github.com/nodejs/node/commit/cb381fe3e0)] - **(SEMVER-MINOR)** **net**：让 setNoDelay 和 setKeepAlive 返回 this（Roman Reiss） [#1779](https://github.com/nodejs/node/pull/1779)
* \[[`85d9983009`](https://github.com/nodejs/node/commit/85d9983009)] - **net**：在 connect 之前持久化 net.Socket 选项（Evan Lucas） [#1518](https://github.com/nodejs/node/pull/1518)
* \[[`39dde3222e`](https://github.com/nodejs/node/commit/39dde3222e)] - **(SEMVER-MINOR)** **net,dgram**：让 ref 和 unref 方法返回 this（Roman Reiss） [#1768](https://github.com/nodejs/node/pull/1768)
* \[[`5773438913`](https://github.com/nodejs/node/commit/5773438913)] - **test**：修复 jslint 错误（Michaël Zasso） [#1743](https://github.com/nodejs/node/pull/1743)
* \[[`867631986f`](https://github.com/nodejs/node/commit/867631986f)] - **test**：修复 test-sync-io-option（Santiago Gimeno） [#1734](https://github.com/nodejs/node/pull/1734)
* \[[`f29762f4dd`](https://github.com/nodejs/node/commit/f29762f4dd)] - **test**：为测试启用 lint（Roman Reiss） [#1721](https://github.com/nodejs/node/pull/1721)
* \[[`2a71f02988`](https://github.com/nodejs/node/commit/2a71f02988)] - **tls**：在握手完成前发生的错误也要发出（Malte-Thorben Bruns） [#1769](https://github.com/nodejs/node/pull/1769)
* \[[`80342f649d`](https://github.com/nodejs/node/commit/80342f649d)] - **tls**：使用 `.destroy(err)` 代替 destroy+emit（Fedor Indutny） [#1711](https://github.com/nodejs/node/pull/1711)
* \[[`9b35be5810`](https://github.com/nodejs/node/commit/9b35be5810)] - **tls**：使服务器在少于 1024 位时不使用 DHE（Shigeki Ohtsu） [#1739](https://github.com/nodejs/node/pull/1739)
* \[[`214d02040e`](https://github.com/nodejs/node/commit/214d02040e)] - **util**：加速字符串格式化的常见场景（Сковорода Никита Андреевич） [#1749](https://github.com/nodejs/node/pull/1749)
* \[[`d144e96fbf`](https://github.com/nodejs/node/commit/d144e96fbf)] - **win,node-gyp**：默认启用 delay-load hook（Bert Belder） [#1763](https://github.com/nodejs/node/pull/1763)
* \[[`0d6d3dda95`](https://github.com/nodejs/node/commit/0d6d3dda95)] - **win,node-gyp**：使 delay-load hook 符合 C89 标准（Sharat M R） [TooTallNate/node-gyp#616](https://github.com/TooTallNate/node-gyp/pull/616)

<a id="1.8.2"></a>

## 2015-05-17，版本 1.8.2，@rvagg

**维护版本**

## 重要变更

* **crypto**: 显著减少 TLS 的内存使用量（Fedor Indutny & Сковорода Никита Андреевич） [#1529](https://github.com/nodejs/node/pull/1529)
* **npm**: 将 npm 升级到 2.9.0。详情请参阅 [v2.8.4](https://github.com/npm/npm/releases/tag/v2.8.4) 和 [v2.9.0](https://github.com/npm/npm/releases/tag/v2.9.0) 的发布说明。摘要：
  * 添加对默认 author 字段的支持，使 `npm init -y` 无需用户输入即可工作 (@othiym23) [npm/npm/d8eee6cf9d](https://github.com/npm/npm/commit/d8eee6cf9d2ff7aca68dfaed2de76824a3e0d9)
  * 在 `npm outdated` 和 `npm update` 中包含本地模块 (@ArnaudRinquin) [npm/npm#7426](https://github.com/npm/npm/issues/7426)
  * `npm version` 中版本号前使用的前缀现在可通过 `tag-version-prefix` 配置 (@kkragenbrink) [npm/npm#8014](https://github.com/npm/npm/issues/8014)

### 已知问题

* `beforeExit` 期间运行未被引用的定时器的一些问题仍待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所述那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)，修复见 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败而导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* readline: 分离的转义序列会被错误处理，参见 [#1403](https://github.com/nodejs/node/issues/1403)

### 提交

* \[[`5404cbc745`](https://github.com/nodejs/node/commit/5404cbc745)] - **buffer**: 修复在没有参数时 `copy()` 的段错误 (Trevor Norris) [nodejs/node#1520](https://github.com/nodejs/node/pull/1520)
* \[[`65dd10e9c0`](https://github.com/nodejs/node/commit/65dd10e9c0)] - **build**: 从 test-ci 中移除 -J (Rod Vagg) [nodejs/node#1544](https://github.com/nodejs/node/pull/1544)
* \[[`74060bb60e`](https://github.com/nodejs/node/commit/74060bb60e)] - **crypto**: 跟踪 SSL 结构的外部内存 (Fedor Indutny) [nodejs/node#1529](https://github.com/nodejs/node/pull/1529)
* \[[`f10f379240`](https://github.com/nodejs/node/commit/f10f379240)] - **deps**: 使 node-gyp 可与 io.js 配合工作 (cjihrig) [nodejs/node#990](https://github.com/nodejs/node/pull/990)
* \[[`ba0e744c2c`](https://github.com/nodejs/node/commit/ba0e744c2c)] - **deps**: 将 npm 升级到 2.9.0 (Forrest L Norvell) [nodejs/node#1583](https://github.com/nodejs/node/pull/1583)
* \[[`b3a7da1091`](https://github.com/nodejs/node/commit/b3a7da1091)] - **deps**: 将 http\_parser 更新到 2.5.0 (Fedor Indutny) [nodejs/node#1517](https://github.com/nodejs/node/pull/1517)
* \[[`4030545af6`](https://github.com/nodejs/node/commit/4030545af6)] - **fs**: 在 fs.write 时验证 fd (Julian Duque) [#1553](https://github.com/nodejs/node/pull/1553)
* \[[`898d423820`](https://github.com/nodejs/node/commit/898d423820)] - **string\_decoder**: 不缓存 Buffer.isEncoding (Brian White) [nodejs/node#1548](https://github.com/nodejs/node/pull/1548)
* \[[`32a6dbcf23`](https://github.com/nodejs/node/commit/32a6dbcf23)] - **test**: 为 ARMv6 延长超时时间 (Rod Vagg) [nodejs/node#1554](https://github.com/nodejs/node/pull/1554)
* \[[`5896fe5cd3`](https://github.com/nodejs/node/commit/5896fe5cd3)] - **test**: 调整 Makefile/test-ci，添加到 vcbuild.bat (Rod Vagg) [nodejs/node#1530](https://github.com/nodejs/node/pull/1530)
* \[[`b72e4bc596`](https://github.com/nodejs/node/commit/b72e4bc596)] - **tls**: 立即销毁 singleUse 上下文 (Fedor Indutny) [nodejs/node#1529](https://github.com/nodejs/node/pull/1529)
* \[[`1cfc455dc5`](https://github.com/nodejs/node/commit/1cfc455dc5)] - **tls**: 为 singleUse socket 清空 SSL\_CTX freelist (Fedor Indutny) [nodejs/node#1529](https://github.com/nodejs/node/pull/1529)
* \[[`7ada680519`](https://github.com/nodejs/node/commit/7ada680519)] - **tls**: 在 SSL 不再使用时销毁它 (Fedor Indutny) [nodejs/node#1529](https://github.com/nodejs/node/pull/1529)
* \[[`71274b0263`](https://github.com/nodejs/node/commit/71274b0263)] - **tls\_wrap**: 当 options.host 为空时使用 localhost (Guilherme Souza) [nodejs/node#1493](https://github.com/nodejs/node/pull/1493)
* \[[`0eb74a8b6c`](https://github.com/nodejs/node/commit/0eb74a8b6c)] - **win,node-gyp**: 允许可选地重命名 node.exe/iojs.exe (Bert Belder) [nodejs/node#1266](https://github.com/nodejs/node/pull/1266)

<a id="2.0.2"></a>

## 2015-05-15，版本 2.0.2，@Fishrock123

### 重要变更

* **win,node-gyp**: Windows 插件的 delay-load hook 现已默认正确启用，在 2.0.0 的发布版本中它错误地默认关闭了 (Bert Belder) [#1433](https://github.com/nodejs/node/pull/1433)
* **os**: `tmpdir()` 末尾斜杠的剥离逻辑已改进，以修复临时目录位于 '/' 时的问题。同时也会考虑操作系统使用的是哪一种斜杠。 (cjihrig) [#1673](https://github.com/nodejs/node/pull/1673)
* **tls**: 默认 cipher 已更新为使用 gcm 和 aes128 (Mike MacCana) [#1660](https://github.com/nodejs/node/pull/1660)
* **build**: 根据 v8 团队的建议，v8 snapshots 已默认重新启用，因为之前的安全问题已经得到解决。这应当会为启动和 vm 上下文创建带来一些性能提升。 (Trevor Norris) [#1663](https://github.com/nodejs/node/pull/1663)
* **src**: 修复在 `--require` 之前使用其他标志时 preload 模块无法工作的问题 (Yosuke Furukawa) [#1694](https://github.com/nodejs/node/pull/1694)
* **dgram**: 修复 `send()` 的回调不是异步调用的问题 (Yosuke Furukawa) [#1313](https://github.com/nodejs/node/pull/1313)
* **readline**: emitKeys 现在会持续缓冲数据，直到有足够的数据进行解析。这修复了分离转义序列解析的问题。 (Alex Kocharin) [#1601](https://github.com/nodejs/node/pull/1601)
* **cluster**: 现在能正确地向 `cluser.worker` 发出 'disconnect' 事件 (Oleg Elifantiev) [#1386](https://github.com/nodejs/node/pull/1386)
* **events**: 未捕获错误现在会提供一些上下文信息 (Evan Lucas) [#1654](https://github.com/nodejs/node/pull/1654)

### 已知问题

完整且最新的已知问题列表请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* `beforeExit` 期间运行未被引用的定时器的一些问题仍待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所述那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)，修复见 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败而导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`8a0e5295b4`](https://github.com/nodejs/node/commit/8a0e5295b4)] - **build**: 在 Windows 上的路径使用反斜杠 (Johan Bergström) [#1698](https://github.com/nodejs/node/pull/1698)
* \[[`20c9a52227`](https://github.com/nodejs/node/commit/20c9a52227)] - **build**: 将 --with-intl 移到 intl optgroup (Johan Bergström) [#1680](https://github.com/nodejs/node/pull/1680)
* \[[`36cdc7c8ac`](https://github.com/nodejs/node/commit/36cdc7c8ac)] - **build**: 重新启用 V8 snapshots (Trevor Norris) [#1663](https://github.com/nodejs/node/pull/1663)
* \[[`5883a59b21`](https://github.com/nodejs/node/commit/5883a59b21)] - **cluster**: disconnect 事件未正确发出 (Oleg Elifantiev) [#1386](https://github.com/nodejs/node/pull/1386)
* \[[`0f850f7ae7`](https://github.com/nodejs/node/commit/0f850f7ae7)] - **deps**: 在 c-ares 中提供 TXT chunk 信息 (Fedor Indutny)
* \[[`7e1c0e75ed`](https://github.com/nodejs/node/commit/7e1c0e75ed)] - **deps**: 与上游 bagder/c-ares\@bba4dc5 同步 (Ben Noordhuis) [#1678](https://github.com/nodejs/node/pull/1678)
* \[[`18d457bd34`](https://github.com/nodejs/node/commit/18d457bd34)] - **dgram**: 异步调用 send 回调 (Yosuke Furukawa) [#1313](https://github.com/nodejs/node/pull/1313)
* \[[`8b9a1537ad`](https://github.com/nodejs/node/commit/8b9a1537ad)] - **events**: 为未处理的错误提供更好的错误信息 (Evan Lucas) [#1654](https://github.com/nodejs/node/pull/1654)
* \[[`19ffb5cf1c`](https://github.com/nodejs/node/commit/19ffb5cf1c)] - **lib**: 修复 eslint 风格问题 (Yosuke Furukawa) [#1539](https://github.com/nodejs/node/pull/1539)
* \[[`76937051f8`](https://github.com/nodejs/node/commit/76937051f8)] - **os**: 改进 tmpdir() 末尾斜杠剥离逻辑 (cjihrig) [#1673](https://github.com/nodejs/node/pull/1673)
* \[[`aed6bce906`](https://github.com/nodejs/node/commit/aed6bce906)] - **readline**: 将 emitKeys 变为流式解析器 (Alex Kocharin) [#1601](https://github.com/nodejs/node/pull/1601)
* \[[`0a461e5360`](https://github.com/nodejs/node/commit/0a461e5360)] - **src**: 修复与先前标志一起使用时的 preload (Yosuke Furukawa) [#1694](https://github.com/nodejs/node/pull/1694)
* \[[`931a0d4634`](https://github.com/nodejs/node/commit/931a0d4634)] - **src**: 为 v8.setFlagsFromString() 添加类型检查 (Roman Klauke) [#1652](https://github.com/nodejs/node/pull/1652)
* \[[`08d08668c9`](https://github.com/nodejs/node/commit/08d08668c9)] - **src,deps**: 用 LoadLibraryW 替换 LoadLibrary (Cheng Zhao) [#226](https://github.com/nodejs/node/pull/226)
* \[[`4e2f999a62`](https://github.com/nodejs/node/commit/4e2f999a62)] - **test**: 修复无限循环检测 (Yosuke Furukawa) [#1681](https://github.com/nodejs/node/pull/1681)
* \[[`5755fc099f`](https://github.com/nodejs/node/commit/5755fc099f)] - **tls**: 将默认 cipher 更新为使用 gcm 和 aes128 (Mike MacCana) [#1660](https://github.com/nodejs/node/pull/1660)
* \[[`966acb9916`](https://github.com/nodejs/node/commit/966acb9916)] - **tools**: 在 Windows 上将 closure\_linter 移除并改用 eslint (Yosuke Furukawa) [#1685](https://github.com/nodejs/node/pull/1685)
* \[[`c58264e58b`](https://github.com/nodejs/node/commit/c58264e58b)] - **tools**: 使 eslint 可在子目录中工作 (Roman Reiss) [#1686](https://github.com/nodejs/node/pull/1686)
* \[[`0b21ab13b7`](https://github.com/nodejs/node/commit/0b21ab13b7)] - **tools**: 将 `make test-npm` 重构为 test-npm.sh (Jeremiah Senkpiel) [#1662](https://github.com/nodejs/node/pull/1662)
* \[[`f07b3b600b`](https://github.com/nodejs/node/commit/f07b3b600b)] - **tools**: 将 eslint 的 comma-spacing 设置为 'warn' (Roman Reiss) [#1672](https://github.com/nodejs/node/pull/1672)
* \[[`f9dd34d301`](https://github.com/nodejs/node/commit/f9dd34d301)] - **tools**: 用 eslint 替换 closure-linter (Yosuke Furukawa) [#1539](https://github.com/nodejs/node/pull/1539)
* \[[`64d3210c98`](https://github.com/nodejs/node/commit/64d3210c98)] - **win,node-gyp**: 默认启用 delay-load hook (Bert Belder) [#1667](https://github.com/nodejs/node/issues/1667)

<a id="2.0.2"></a>

## 2015-05-07，版本 2.0.1，@rvagg

### 重要变更

* **async\_wrap**:（Trevor Norris）[#1614](https://github.com/nodejs/node/pull/1614)
  * 现在可以按 provider 进行过滤
  * 位标志已被移除，并改为在 binding 对象上调用方法
  * _请注意，这是一个不稳定 API，因此功能新增和破坏性变更不会改变 io.js 的语义化版本号_
* **libuv**：解决了 io.js 中的多个问题：
  * [#862](https://github.com/nodejs/node/issues/862) 防止使用无效的 stdio 文件描述符创建子进程
  * [#1397](https://github.com/nodejs/node/issues/1397) 修复 Windows 上 fs.access(W\_OK) 的 EPERM 错误
  * [#1621](https://github.com/nodejs/node/issues/1621) 修复与打包的 libuv 相关的构建错误
  * [#1512](https://github.com/nodejs/node/issues/1512) 应该能正确修复 Windows 终止错误
* **addons**：`NODE_DEPRECATED` 宏在使用较旧编译器编译 addon 时会导致问题，这个问题现在应该已解决（Ben Noordhuis）[#1626](https://github.com/nodejs/node/pull/1626)
* **V8**：将 V8 从 4.2.77.18 升级到 4.2.77.20，并包含一些小修复，包括一个阻止 FreeBSD 上构建的 bug

### 已知问题

有关已知问题的完整且最新列表，请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* 在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所述那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)，修复见 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* readline：split escapes 处理不正确，参见 [#1403](https://github.com/nodejs/node/issues/1403)

### 提交

* \[[`7dde95a8bd`](https://github.com/nodejs/node/commit/7dde95a8bd)] - **async-wrap**: 在 init 中移除 before/after 调用（Trevor Norris）[#1614](https://github.com/nodejs/node/pull/1614)
* \[[`bd42ba056a`](https://github.com/nodejs/node/commit/bd42ba056a)] - **async-wrap**: 使用函数设置标志（Trevor Norris）[#1614](https://github.com/nodejs/node/pull/1614)
* \[[`4b2c786449`](https://github.com/nodejs/node/commit/4b2c786449)] - **async-wrap**: 将 PROVIDER 作为 init 的第一个参数传入（Trevor Norris）[#1614](https://github.com/nodejs/node/pull/1614)
* \[[`84bf609fd2`](https://github.com/nodejs/node/commit/84bf609fd2)] - **async-wrap**: 不要不必要地调用 init 回调（Trevor Norris）[#1614](https://github.com/nodejs/node/pull/1614)
* \[[`04cc03b029`](https://github.com/nodejs/node/commit/04cc03b029)] - **deps**: 将 libuv 更新到 1.5.0（Saúl Ibarra Corretgé）[#1646](https://github.com/nodejs/node/pull/1646)
* \[[`b16d9c28e8`](https://github.com/nodejs/node/commit/b16d9c28e8)] - **deps**: 将 v8 升级到 4.2.77.20（Ben Noordhuis）[#1639](https://github.com/nodejs/node/pull/1639)
* \[[`9ec3109272`](https://github.com/nodejs/node/commit/9ec3109272)] - **doc**: 添加 2015-04-29 TC 会议纪要（Rod Vagg）[#1585](https://github.com/nodejs/node/pull/1585)
* \[[`2c7206254c`](https://github.com/nodejs/node/commit/2c7206254c)] - **doc**: 修复 readme.md 中的拼写错误（AQNOUCH Mohammed）[#1643](https://github.com/nodejs/node/pull/1643)
* \[[`71dc7152ee`](https://github.com/nodejs/node/commit/71dc7152ee)] - **doc**: 修复 CHANGELOG 中的 PR 链接（Brian White）[#1624](https://github.com/nodejs/node/pull/1624)
* \[[`b97b96d05a`](https://github.com/nodejs/node/commit/b97b96d05a)] - **install**: 修复 NameError（thefourtheye）[#1628](https://github.com/nodejs/node/pull/1628)
* \[[`6ccbe75384`](https://github.com/nodejs/node/commit/6ccbe75384)] - **js\_stream**: 修复 DoWrite 中的 buffer 索引（Shigeki Ohtsu）[#1635](https://github.com/nodejs/node/pull/1635)
* \[[`c43855c49c`](https://github.com/nodejs/node/commit/c43855c49c)] - **src**: 在 Windows 上导出 ParseEncoding 函数（Ivan Kozik）[#1596](https://github.com/nodejs/node/pull/1596)
* \[[`8315b22390`](https://github.com/nodejs/node/commit/8315b22390)] - **src**: 修复过于严格的 cpplint 空白警告（Ben Noordhuis）[#1640](https://github.com/nodejs/node/pull/1640)
* \[[`b712af79a7`](https://github.com/nodejs/node/commit/b712af79a7)] - **src**: 修复旧编译器下的 NODE\_DEPRECATED 宏（Ben Noordhuis）[#1626](https://github.com/nodejs/node/pull/1626)
* \[[`2ed10f1349`](https://github.com/nodejs/node/commit/2ed10f1349)] - **src**: 修复 Buffer::New() 调用中的轻微低效问题（Ben Noordhuis）[#1577](https://github.com/nodejs/node/pull/1577)
* \[[`f696c9efab`](https://github.com/nodejs/node/commit/f696c9efab)] - **src**: 修复已弃用的 Buffer::New() 用法（Ben Noordhuis）[#1577](https://github.com/nodejs/node/pull/1577)
* \[[`0c8f13df8f`](https://github.com/nodejs/node/commit/0c8f13df8f)] - **tools**: 移除未使用的 GuessWordSize 函数（thefourtheye）[#1638](https://github.com/nodejs/node/pull/1638)

<a id="2.0.0"></a>

## 2015-05-04，版本 2.0.0，@rvagg

### 破坏性变更

完整详情见 <https://github.com/nodejs/node/wiki/Breaking-Changes#200-from-1x>

* V8 升级到 4.2，C++ API 有少量变更
* `os.tmpdir()` 现在在所有平台上保持跨平台一致，不再返回带有尾部斜杠的路径
* 虽然这不是一个 _破坏性变更_，但 `'smalloc'` 模块已被弃用，以应对未来升级到 V8 4.4 后它将变得无法支持。更多信息请参见 [#1451](https://github.com/nodejs/node/issues/1451)。

_注：在发布前，一个新的 `'url'` 模块版本已被回退，因为当时认为它对 npm 生态系统造成破坏的潜在风险过大，在发布之前还需要进行更多兼容性工作。更多信息请参见 [#1602](https://github.com/nodejs/node/pull/1602)。_

### 重要变更

* **crypto**：TLS 的内存使用显著减少（Fedor Indutny & Сковорода Никита Андреевич）[#1529](https://github.com/nodejs/node/pull/1529)
* **net**：`socket.connect()` 现在接受一个 `'lookup'` 选项，用于自定义 DNS 解析机制，默认使用 `dns.lookup()`（Evan Lucas）[#1505](https://github.com/nodejs/node/pull/1505)
* **npm**：将 npm 升级到 2.9.0。详情请参见 [v2.8.4](https://github.com/npm/npm/releases/tag/v2.8.4) 和 [v2.9.0](https://github.com/npm/npm/releases/tag/v2.9.0) 的发布说明。重要内容：
  * 添加对默认 author 字段的支持，使 `npm init -y` 无需用户输入即可工作（@othiym23）[npm/npm/d8eee6cf9d](https://github.com/npm/npm/commit/d8eee6cf9d2ff7aca68dfaed2de76824a3e0d9af)
  * 在 `npm outdated` 和 `npm update` 中包含本地模块（@ArnaudRinquin）[npm/npm#7426](https://github.com/npm/npm/issues/7426)
  * `npm version` 中版本号前使用的前缀现在可以通过 `tag-version-prefix` 配置（@kkragenbrink）[npm/npm#8014](https://github.com/npm/npm/issues/8014)
* **os**：`os.tmpdir()` 现在在所有平台上保持跨平台一致，并且不再在任何平台上返回带有尾部斜杠的路径（Christian Tellnes）[#747](https://github.com/nodejs/node/pull/747)
* **process**：
  * `process.nextTick()` 的性能在整个基准测试套件中提升了 2-42%，值得注意的是它在核心中被大量使用（Brian White）[#1571](https://github.com/nodejs/node/pull/1571)
  * 新增 `process.geteuid()`、`process.seteuid(id)`、`process.getegid()` 和 `process.setegid(id)` 方法，允许获取和设置进程的有效 UID 和 GID（Evan Lucas）[#1536](https://github.com/nodejs/node/pull/1536)
* **repl**：
  * 如果设置了 `NODE_REPL_HISTORY_FILE` 环境变量并指向用户可访问的文件，REPL 历史可以跨会话持久保存，`NODE_REPL_HISTORY_SIZE` 可设置最大历史条目数，默认值为 `1000`（Chris Dickinson）[#1513](https://github.com/nodejs/node/pull/1513)
  * 可以使用 `NODE_REPL_MODE` 环境变量将 REPL 置于三种模式之一：`sloppy`、`strict` 或 `magic`（默认）；新的 `magic` 模式会自动在严格模式下运行“仅限严格模式”的语句（Chris Dickinson）[#1513](https://github.com/nodejs/node/pull/1513)
* **smalloc**：由于 V8 4.4 将带来的变更会使其无法使用，`'smalloc'` 模块已被弃用
* **util**：添加对 Promise、Map 和 Set 的检查支持（Christopher Monsanto）[#1471](https://github.com/nodejs/node/pull/1471)
* **V8**：升级到 4.2.77.18，完整详情见 [ChangeLog](https://chromium.googlesource.com/v8/v8/+/refs/heads/4.2.77/ChangeLog)。重要内容：
  * Class 已从 staging 中移出；`class` 关键字现在可在严格模式下无需标志即可使用
  * 对象字面量增强已从 staging 中移出；简写方法和属性语法现在可用（`{ method() { }, property }`）
  * Rest 参数（`function(...args) {}`）已在 staging 中实现，并受 `--harmony-rest-parameters` 标志控制
  * 计算属性名（`{['foo'+'bar']:'bam'}`）已在 staging 中实现，并受 `--harmony-computed-property-names` 标志控制
  * Unicode 转义（`'\u{xxxx}'`）已在 staging 中实现，并受 `--harmony_unicode` 标志以及用于正则表达式的 `--harmony_unicode_regexps` 标志控制
* **Windows**：
  * 修复了 Windows 上随机终止进程的问题（Fedor Indutny）[#1512](https://github.com/nodejs/node/issues/1512) / [#1563](https://github.com/nodejs/node/pull/1563)
  * 为修复进程命名（iojs.exe / node.exe）问题而引入的 delay-load hook 已针对原生 add-on 变为可选退出。若原生 add-on 遇到问题，应在其 binding.gyp 中包含 `'win_delay_load_hook': 'false'` 以禁用此特性。（Bert Belder）[#1433](https://github.com/nodejs/node/pull/1433)
* **Governance**：
  * Rod Vagg（@rvagg）被加入技术委员会（TC）
  * Jeremiah Senkpiel（@Fishrock123）被加入技术委员会（TC）

### 已知问题

有关已知问题的完整且最新列表，请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* 在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所述那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)，修复见 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* readline：split escapes 处理不正确，参见 [#1403](https://github.com/nodejs/node/issues/1403)

### 提交

* \[[`5404cbc745`](https://github.com/nodejs/node/commit/5404cbc745)] - **buffer**: 修复零参数时 copy() 的段错误（Trevor Norris）[#1520](https://github.com/nodejs/node/pull/1520)
* \[[`3d3083b91f`](https://github.com/nodejs/node/commit/3d3083b91f)] - **buffer**: 对 Buffer.concat 方法做了小幅改进（Jackson Tian）[#1437](https://github.com/nodejs/node/pull/1437)
* \[[`e67542ae17`](https://github.com/nodejs/node/commit/e67542ae17)] - **build**: 在使用 clang 构建时禁用 -Og（Ben Noordhuis）[#1609](https://github.com/nodejs/node/pull/1609)
* \[[`78f4b038f8`](https://github.com/nodejs/node/commit/78f4b038f8)] - **build**: 在 -Og 下启用调试安全优化（Ben Noordhuis）[#1569](https://github.com/nodejs/node/pull/1569)
* \[[`a5dcff827a`](https://github.com/nodejs/node/commit/a5dcff827a)] - **build**: 在 configure 输出中使用选项组（Johan Bergström）[#1533](https://github.com/nodejs/node/pull/1533)
* \[[`2a3c8c187e`](https://github.com/nodejs/node/commit/2a3c8c187e)] - **build**: 从 test-ci 中移除 -J（Rod Vagg）[#1544](https://github.com/nodejs/node/pull/1544)
* \[[`e6874dd0f9`](https://github.com/nodejs/node/commit/e6874dd0f9)] - **crypto**: 跟踪 SSL 结构的外部内存（Fedor Indutny）[#1529](https://github.com/nodejs/node/pull/1529)
* \[[`935c9d3fa7`](https://github.com/nodejs/node/commit/935c9d3fa7)] - **deps**: 使 node-gyp 可与 io.js 一起工作（cjihrig）[#990](https://github.com/nodejs/node/pull/990)
* \[[`56e4255382`](https://github.com/nodejs/node/commit/56e4255382)] - **deps**: 将 npm 升级到 2.9.0（Forrest L Norvell）[#1573](https://github.com/nodejs/node/pull/1573)
* \[[`509b59ea7c`](https://github.com/nodejs/node/commit/509b59ea7c)] - **deps**: 重新启用 v8 postmortem 调试（Ben Noordhuis）[#1232](https://github.com/nodejs/node/pull/1232)
* \[[`01652c7709`](https://github.com/nodejs/node/commit/01652c7709)] - **deps**: 将 v8 升级到 4.2.77.18（Chris Dickinson）[#1506](https://github.com/nodejs/node/pull/1506)
* \[[`01e6632d70`](https://github.com/nodejs/node/commit/01e6632d70)] - **deps**: 将 v8 升级到 4.2.77.15（Ben Noordhuis）[#1399](https://github.com/nodejs/node/pull/1399)
* \[[`db4ded5903`](https://github.com/nodejs/node/commit/db4ded5903)] - **deps**: 重新启用 v8 postmortem 调试（Ben Noordhuis）[#1232](https://github.com/nodejs/node/pull/1232)
* \[[`36cd5fb9d2`](https://github.com/nodejs/node/commit/36cd5fb9d2)] - **(SEMVER-MAJOR)** **deps**: 将 v8 升级到 4.2.77.13（Ben Noordhuis）[#1232](https://github.com/nodejs/node/pull/1232)
* \[[`b3a7da1091`](https://github.com/nodejs/node/commit/b3a7da1091)] - **deps**: 将 http\_parser 更新到 2.5.0（Fedor Indutny）[#1517](https://github.com/nodejs/node/pull/1517)
* \[[`ac1fb39ce8`](https://github.com/nodejs/node/commit/ac1fb39ce8)] - **doc**: 将 rvagg 加入 TC（Rod Vagg）[#1613](https://github.com/nodejs/node/pull/1613)
* \[[`dacc1fa35c`](https://github.com/nodejs/node/commit/dacc1fa35c)] - **doc**: 更新 AUTHORS 列表（Rod Vagg）[#1586](https://github.com/nodejs/node/pull/1586)
* \[[`2a3a1909ab`](https://github.com/nodejs/node/commit/2a3a1909ab)] - **doc**: 在 child.stdio 示例中添加 require() 行（Nick Raienko）[#1504](https://github.com/nodejs/node/pull/1504)
* \[[`02388dbf40`](https://github.com/nodejs/node/commit/02388dbf40)] - **doc**: 修复一些交叉引用（Alexander Gromnitsky）[#1584](https://github.com/nodejs/node/pull/1584)
* \[[`57c4cc26e2`](https://github.com/nodejs/node/commit/57c4cc26e2)] - **doc**: 添加 2015-04-22 TC 会议纪要（Rod Vagg）[#1556](https://github.com/nodejs/node/pull/1556)
* \[[`b4ad5d7050`](https://github.com/nodejs/node/commit/b4ad5d7050)] - **doc**: 改进 http.request 和 https.request 的 opts（Roman Reiss）[#1551](https://github.com/nodejs/node/pull/1551)
* \[[`7dc8eec0a6`](https://github.com/nodejs/node/commit/7dc8eec0a6)] - **doc**: 弃用 smalloc 模块（Ben Noordhuis）[#1566](https://github.com/nodejs/node/pull/1566)
* \[[`1bcdf46ca7`](https://github.com/nodejs/node/commit/1bcdf46ca7)] - **doc**: 添加 2015-04-15 TC 会议纪要（Rod Vagg）[#1498](https://github.com/nodejs/node/pull/1498)
* \[[`391cae3595`](https://github.com/nodejs/node/commit/391cae3595)] - **doc**: 将已知问题添加到 v1.7.0/1.7.1 CHANGELOG（Yosuke Furukawa）[#1473](https://github.com/nodejs/node/pull/1473)
* \[[`e55fdc47a7`](https://github.com/nodejs/node/commit/e55fdc47a7)] - **doc**: 修复 util.deprecate 示例（Nick Raienko）[#1535](https://github.com/nodejs/node/pull/1535)
* \[[`5178f93bc0`](https://github.com/nodejs/node/commit/5178f93bc0)] - **doc**: 将 Addon API（NAN）加入工作组列表（Julian Duque）[#1523](https://github.com/nodejs/node/pull/1523)
* \[[`f3cc50f811`](https://github.com/nodejs/node/commit/f3cc50f811)] - **doc**: 添加 2015-04-08 TC 会议纪要（Rod Vagg）[#1497](https://github.com/nodejs/node/pull/1497)
* \[[`bb254b533b`](https://github.com/nodejs/node/commit/bb254b533b)] - **doc**: 将分支更新为 master（Roman Reiss）[#1511](https://github.com/nodejs/node/pull/1511)
* \[[`22aafa5597`](https://github.com/nodejs/node/commit/22aafa5597)] - **doc**: 将 Fishrock123 加入 TC（Jeremiah Senkpiel）[#1507](https://github.com/nodejs/node/pull/1507)
* \[[`b16a328ede`](https://github.com/nodejs/node/commit/b16a328ede)] - **doc**: 在 child.kill 示例中添加空格（Nick Raienko）[#1503](https://github.com/nodejs/node/pull/1503)
* \[[`26327757f8`](https://github.com/nodejs/node/commit/26327757f8)] - **doc**: 更新 AUTHORS 列表（Rod Vagg）[#1476](https://github.com/nodejs/node/pull/1476)
* \[[`f9c681cf62`](https://github.com/nodejs/node/commit/f9c681cf62)] - **fs**: 验证 fs.write 中的 fd（Julian Duque）[#1553](https://github.com/nodejs/node/pull/1553)
* \[[`801b47acc5`](https://github.com/nodejs/node/commit/801b47acc5)] - **gitignore**: 忽略 xcode 工作区和项目（Roman Klauke）[#1562](https://github.com/nodejs/node/pull/1562)
* \[[`d5ce47e433`](https://github.com/nodejs/node/commit/d5ce47e433)] - **(SEMVER-MINOR)** **lib**: 弃用 smalloc 模块（Ben Noordhuis）[#1564](https://github.com/nodejs/node/pull/1564)
* \[[`7384ca83f9`](https://github.com/nodejs/node/commit/7384ca83f9)] - **module**: 从 Module.globalPaths 中移除 ''（Chris Yip）[#1488](https://github.com/nodejs/node/pull/1488)
* \[[`b4f5898395`](https://github.com/nodejs/node/commit/b4f5898395)] - **net**: 确保 Write/ShutdownWrap 引用 handle（Fedor Indutny）[#1590](https://github.com/nodejs/node/pull/1590)
* \[[`4abe2fa1cf`](https://github.com/nodejs/node/commit/4abe2fa1cf)] - **(SEMVER-MINOR)** **net**: 为 Socket.prototype.connect 添加 lookup 选项（Evan Lucas）[#1505](https://github.com/nodejs/node/pull/1505)
* \[[`1bef717476`](https://github.com/nodejs/node/commit/1bef717476)] - **(SEMVER-MINOR)** **net**: 清理 connect 逻辑（Evan Lucas）[#1505](https://github.com/nodejs/node/pull/1505)
* \[[`c7782c0af8`](https://github.com/nodejs/node/commit/c7782c0af8)] - **node**: 改进 nextTick 性能（Brian White）[#1571](https://github.com/nodejs/node/pull/1571)
* \[[`b57cc51d8d`](https://github.com/nodejs/node/commit/b57cc51d8d)] - **(SEMVER-MAJOR)** **os**: 从 os.tmpdir() 中移除尾部斜杠（Christian Tellnes）[#747](https://github.com/nodejs/node/pull/747)
* \[[`ca219b00d1`](https://github.com/nodejs/node/commit/ca219b00d1)] - **repl**: 修复 a+ fd 在读取时清空文件的问题（Chris Dickinson）[#1605](https://github.com/nodejs/node/pull/1605)
* \[[`051d482b15`](https://github.com/nodejs/node/commit/051d482b15)] - **repl**: 通过正确代理 repl 修复 _debugger（Chris Dickinson）[#1605](https://github.com/nodejs/node/pull/1605)
* \[[`2e2fce0502`](https://github.com/nodejs/node/commit/2e2fce0502)] - **repl**: 修复持久化历史和环境变量名（Roman Reiss）[#1593](https://github.com/nodejs/node/pull/1593)
* \[[`ea5195ccaf`](https://github.com/nodejs/node/commit/ea5195ccaf)] - **repl**: 不要为非终端 repl 保存历史（Fedor Indutny）[#1575](https://github.com/nodejs/node/pull/1575)
* \[[`0450ce7db2`](https://github.com/nodejs/node/commit/0450ce7db2)] - **repl**: 添加模式检测、CLI 持久化历史（Chris Dickinson）[#1513](https://github.com/nodejs/node/pull/1513)
* \[[`c1b9913e1f`](https://github.com/nodejs/node/commit/c1b9913e1f)] - **(SEMVER-MAJOR)** **src**: 由于 V8 API 提升 NODE\_MODULE\_VERSION（Rod Vagg）[#1532](https://github.com/nodejs/node/pull/1532)
* \[[`279f6116aa`](https://github.com/nodejs/node/commit/279f6116aa)] - **src**: 修复 -Wmissing-field-initializers 警告（Ben Noordhuis）[#1606](https://github.com/nodejs/node/pull/1606)
* \[[`73062521a4`](https://github.com/nodejs/node/commit/73062521a4)] - **src**: 弃用 smalloc 公共函数（Ben Noordhuis）[#1565](https://github.com/nodejs/node/pull/1565)
* \[[`ccb199af17`](https://github.com/nodejs/node/commit/ccb199af17)] - **src**: 修复弃用警告（Ben Noordhuis）[#1565](https://github.com/nodejs/node/pull/1565)
* \[[`609fa0de03`](https://github.com/nodejs/node/commit/609fa0de03)] - **src**: 修复 NODE\_DEPRECATED 宏（Ben Noordhuis）[#1565](https://github.com/nodejs/node/pull/1565)
* \[[`3c92ca2b5c`](https://github.com/nodejs/node/commit/3c92ca2b5c)] - **(SEMVER-MINOR)** **src**: 增加获取/设置有效 uid/gid 的能力（Evan Lucas）[#1536](https://github.com/nodejs/node/pull/1536)
* \[[`30b7349176`](https://github.com/nodejs/node/commit/30b7349176)] - **stream\_base**: 在 stream 实现中分发 reqs（Fedor Indutny）[#1563](https://github.com/nodejs/node/pull/1563)
* \[[`0fa6c4a6fc`](https://github.com/nodejs/node/commit/0fa6c4a6fc)] - **string\_decoder**: 不要缓存 Buffer.isEncoding（Brian White）[#1548](https://github.com/nodejs/node/pull/1548)
* \[[`f9b226c1c1`](https://github.com/nodejs/node/commit/f9b226c1c1)] - **test**: 为 ARMv6 延长超时时间（Rod Vagg）[#1554](https://github.com/nodejs/node/pull/1554)
* \[[`bfae8236b1`](https://github.com/nodejs/node/commit/bfae8236b1)] - **test**: 修复 test-net-dns-custom-lookup 测试断言（Evan Lucas）[#1531](https://github.com/nodejs/node/pull/1531)
* \[[`547213913b`](https://github.com/nodejs/node/commit/547213913b)] - **test**: 调整 Makefile/test-ci，添加到 vcbuild.bat（Rod Vagg）[#1530](https://github.com/nodejs/node/pull/1530)
* \[[`550c2638c0`](https://github.com/nodejs/node/commit/550c2638c0)] - **tls**: 对异步 SNI/OCSP 使用 `SSL_set_cert_cb`（Fedor Indutny）[#1464](https://github.com/nodejs/node/pull/1464)
* \[[`1787416376`](https://github.com/nodejs/node/commit/1787416376)] - **tls**: 立即销毁 singleUse 上下文（Fedor Indutny）[#1529](https://github.com/nodejs/node/pull/1529)
* \[[`2684c902c4`](https://github.com/nodejs/node/commit/2684c902c4)] - **tls**: 为 singleUse socket 清空 SSL\_CTX freelist（Fedor Indutny）[#1529](https://github.com/nodejs/node/pull/1529)
* \[[`2d241b3b82`](https://github.com/nodejs/node/commit/2d241b3b82)] - **tls**: 在 SSL 不再使用时销毁它（Fedor Indutny）[#1529](https://github.com/nodejs/node/pull/1529)
* \[[`f7620fb96d`](https://github.com/nodejs/node/commit/f7620fb96d)] - **tls\_wrap**: 解除 TLSWrap 和 SecureContext 对象的链接（Сковорода Никита Андреевич）[#1580](https://github.com/nodejs/node/pull/1580)
* \[[`a7d74633f2`](https://github.com/nodejs/node/commit/a7d74633f2)] - **tls\_wrap**: 当 options.host 为空时使用 localhost（Guilherme Souza）[#1493](https://github.com/nodejs/node/pull/1493)
* \[[`702997c1f0`](https://github.com/nodejs/node/commit/702997c1f0)] - _**Revert**_ "**url**: 大幅提升 url 模块性能"（Rod Vagg）[#1602](https://github.com/nodejs/node/pull/1602)
* \[[`0daed24883`](https://github.com/nodejs/node/commit/0daed24883)] - _**Revert**_ "**url**: 在所有 setter 代码路径上删除 href 缓存"（Rod Vagg）[#1602](https://github.com/nodejs/node/pull/1602)
* \[[`0f39ef4ca1`](https://github.com/nodejs/node/commit/0f39ef4ca1)] - _**Revert**_ "**url**: 修复将某些值视为非空的处理"（Rod Vagg）[#1602](https://github.com/nodejs/node/pull/1602)
* \[[`66877216bd`](https://github.com/nodejs/node/commit/66877216bd)] - **url**: 修复将某些值视为非空的处理（Petka Antonov）[#1589](https://github.com/nodejs/node/pull/1589)
* \[[`dbdd81a91b`](https://github.com/nodejs/node/commit/dbdd81a91b)] - **url**: 在所有 setter 代码路径上删除 href 缓存（Petka Antonov）[#1589](https://github.com/nodejs/node/pull/1589)
* \[[`3fd7fc429c`](https://github.com/nodejs/node/commit/3fd7fc429c)] - **url**: 大幅提升 url 模块性能（Petka Antonov）[#1561](https://github.com/nodejs/node/pull/1561)
* \[[`bf7ac08dd0`](https://github.com/nodejs/node/commit/bf7ac08dd0)] - **util**: 添加 Map 和 Set 检查支持（Christopher Monsanto）[#1471](https://github.com/nodejs/node/pull/1471)
* \[[`30e83d2e84`](https://github.com/nodejs/node/commit/30e83d2e84)] - **win,node-gyp**: 允许可选地将 node.exe/iojs.exe 重命名（Bert Belder）[#1266](https://github.com/nodejs/node/pull/1266)
* \[[`3bda6cbfa4`](https://github.com/nodejs/node/commit/3bda6cbfa4)] - **(SEMVER-MAJOR)** **win,node-gyp**: 默认启用 delay-load hook（Bert Belder）[#1433](https://github.com/nodejs/node/pull/1433)

<a id="1.8.1"></a>

## 2015-04-20，版本 1.8.1，@chrisdickinson

### 重要变更

* **NOTICE**：由于发布工具存在问题，跳过了 v1.8.0。
  详情请参见 [#1436](https://github.com/nodejs/node/issues/1436)。
* **build**：支持将 io.js 构建为静态库（Marat Abdullin） [#1341](https://github.com/nodejs/node/pull/1341)
* **deps**：将 openssl 升级到 1.0.2a（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
  * 使用 crypto API 时，用户应能看到性能提升。
    详情请参见 [这里](https://github.com/nodejs/node/wiki/Crypto-Performance-Notes-for-OpenSSL-1.0.2a-on-iojs-v1.8.0)。
* **npm**：将 npm 升级到 2.8.3。详情请参见[发行说明](https://github.com/npm/npm/releases/tag/v2.8.3)。包含改进的 git 支持。摘要：
  * [`387f889`](https://github.com/npm/npm/commit/387f889c0e8fb617d9cc9a42ed0a3ec49424ab5d)
    [#7961](https://github.com/npm/npm/issues/7961) 确保托管的 git SSH
    URL 在存储到 `npm-shrinkwrap.json` 的 `resolved` 字段时始终具有有效的协议。
    （[@othiym23](https://github.com/othiym23))
  * [`394c2f5`](https://github.com/npm/npm/commit/394c2f5a1227232c0baf42fbba1402aafe0d6ffb)
    将检查托管 Git 提供方的顺序改为 `git:`、
    `git+https:`，然后是 `git+ssh:`（原先是 `git:`、`git+ssh:`，然后是 `git+https:`），
    目的是从最可能成功到最不可能成功，以减少令人困惑的错误信息。
    （[@othiym23](https://github.com/othiym23))
  * [`431c3bf`](https://github.com/npm/npm/commit/431c3bf6cdec50f9f0c735f478cb2f3f337d3313)
    [#7699](https://github.com/npm/npm/issues/7699) `npm-registry-client@6.3.2`：
    登录时不要随 HTTP GET 请求发送 body。
    （[@smikes](https://github.com/smikes))
  * [`15efe12`](https://github.com/npm/npm/commit/15efe124753257728a0ddc64074fa5a4b9c2eb30)
    [#7872](https://github.com/npm/npm/issues/7872) 使用新版
    `hosted-git-info` 传递 git URL 中嵌入的凭据。测试它。
    多测试几次。（[@othiym23](https://github.com/othiym23))
  * [`b027319`](https://github.com/npm/npm/commit/b0273190c71eba14395ddfdd1d9f7ba625297523)
    [#7920](https://github.com/npm/npm/issues/7920) 带有
    `peerDependencies` 的作用域包会将 `peerDependencies` 安装到错误的
    目录中。（[@ewie](https://github.com/ewie))
  * [`6b0f588`](https://github.com/npm/npm/commit/6b0f58877f37df9904490ffbaaad33862bd36dce)
    [#7867](https://github.com/npm/npm/issues/7867) 使用用户提供的 git 简写和 git
    URL。支持新的 `hosted-git-info` 快捷语法。
    将简写保存到 `package.json` 中。在受底层托管
    提供方支持时，按 `git:`、`git+ssh:` 和
    `git+https:` 的顺序尝试克隆。（[@othiym23](https://github.com/othiym23))
* **src**：允许将多个参数传递给 process.nextTick（Trevor Norris） [#1077](https://github.com/nodejs/node/pull/1077)
* **module**：`require('.')` 与 `NODE_PATH` 的交互已恢复并弃用。此功能
  将在后续移除。（Roman Reiss） [#1363](https://github.com/nodejs/node/pull/1363)

### 已知问题

* 关于在 `beforeExit` 期间运行未被引用的定时器的一些问题仍有待解决。请参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` 并不像文档所示那样是同步的，这是在 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会导致进程在断言失败时崩溃 [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` 在两个完整主机之间解析时可能会传递 url 的 auth 部分，详见 [#1435](https://github.com/nodejs/node/issues/1435)。
* readline：分割的转义序列会被错误处理，详见 [#1403](https://github.com/nodejs/node/issues/1403)

### 提交

* \[[`53ed89d927`](https://github.com/nodejs/node/commit/53ed89d927)] - _**Revert**_ "**build**: use %PYTHON% instead of python"（Rod Vagg） [#1475](https://github.com/nodejs/node/pull/1475)
* \[[`f23b96352b`](https://github.com/nodejs/node/commit/f23b96352b)] - **src**：将 NODE\_MODULE\_VERSION 回退到 43（Chris Dickinson） [#1460](https://github.com/nodejs/node/pull/1460)
* \[[`431673ebd1`](https://github.com/nodejs/node/commit/431673ebd1)] - **buffer**：byteLength 中空字符串的快速路径（Jackson Tian） [#1441](https://github.com/nodejs/node/pull/1441)
* \[[`1b22bad35f`](https://github.com/nodejs/node/commit/1b22bad35f)] - **build**：修复共享库标志的逻辑（Jeremiah Senkpiel） [#1454](https://github.com/nodejs/node/pull/1454)
* \[[`91943a99d5`](https://github.com/nodejs/node/commit/91943a99d5)] - **build**：使用 %PYTHON% 代替 python（Rod Vagg） [#1444](https://github.com/nodejs/node/pull/1444)
* \[[`c7769d417b`](https://github.com/nodejs/node/commit/c7769d417b)] - **build**：公开 xz 压缩级别（Johan Bergström） [#1428](https://github.com/nodejs/node/pull/1428)
* \[[`a530b2baf1`](https://github.com/nodejs/node/commit/a530b2baf1)] - **build**：修复 configure 中的错误信息（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`92dfb794f9`](https://github.com/nodejs/node/commit/92dfb794f9)] - **build**：在 arm64 上启用 ssl 支持（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`7de0dcde83`](https://github.com/nodejs/node/commit/7de0dcde83)] - **deps**：使 node-gyp 可与 io.js 协同工作（cjihrig） [#990](https://github.com/nodejs/node/pull/990)
* \[[`4870213f9e`](https://github.com/nodejs/node/commit/4870213f9e)] - **deps**：将 npm 升级到 2.8.3（Forrest L Norvell）
* \[[`49bb7ded2c`](https://github.com/nodejs/node/commit/49bb7ded2c)] - **deps**：修复 npm 中 git 大小写敏感性问题（Chris Dickinson） [#1456](https://github.com/nodejs/node/pull/1456)
* \[[`4830b4bce8`](https://github.com/nodejs/node/commit/4830b4bce8)] - **deps**：添加升级 openssl 的文档（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`11bec72c87`](https://github.com/nodejs/node/commit/11bec72c87)] - **deps**：更新 openssl-1.0.2a 的 asm 文件（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`53924d8ebe`](https://github.com/nodejs/node/commit/53924d8ebe)] - **deps**：更新 openssl-1.0.2a 的 asm Makefile（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`418e839456`](https://github.com/nodejs/node/commit/418e839456)] - **deps**：更新 openssl-1.0.2a 的 openssl.gyp/gypi（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`02f12ab666`](https://github.com/nodejs/node/commit/02f12ab666)] - **deps**：更新 1.0.2a 的 opensslconf.h（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`eb7a23595f`](https://github.com/nodejs/node/commit/eb7a23595f)] - **deps**：为 opensslconf.h 添加 x32 和 arm64 支持（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`033a663127`](https://github.com/nodejs/node/commit/033a663127)] - **deps**：替换 openssl 中的所有头文件（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`ae8831f240`](https://github.com/nodejs/node/commit/ae8831f240)] - **deps**：回移植 alt cert chains 1 的 openssl 补丁（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`71316c46d9`](https://github.com/nodejs/node/commit/71316c46d9)] - **deps**：修复 x86\_win32 中 openssl 的 asm 构建错误（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`d293a4f096`](https://github.com/nodejs/node/commit/d293a4f096)] - **deps**：修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`e4872d7405`](https://github.com/nodejs/node/commit/e4872d7405)] - **deps**：将 openssl 升级到 1.0.2a（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`a1c9ef3142`](https://github.com/nodejs/node/commit/a1c9ef3142)] - **deps, build**：添加对较旧汇编器的支持（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`76f219c128`](https://github.com/nodejs/node/commit/76f219c128)] - **doc**：记录使用 git 强制推送（Johan Bergström） [#1420](https://github.com/nodejs/node/pull/1420)
* \[[`12e51d56c1`](https://github.com/nodejs/node/commit/12e51d56c1)] - **doc**：添加 Addon API WG（Rod Vagg） [#1226](https://github.com/nodejs/node/pull/1226)
* \[[`7956a13dad`](https://github.com/nodejs/node/commit/7956a13dad)] - **http**：在逻辑上遵守 maxSockets（fengmk2） [#1242](https://github.com/nodejs/node/pull/1242)
* \[[`5b844e140b`](https://github.com/nodejs/node/commit/5b844e140b)] - **module**：修复样式（Roman Reiss） [#1453](https://github.com/nodejs/node/pull/1453)
* \[[`3ad82c335d`](https://github.com/nodejs/node/commit/3ad82c335d)] - **(SEMVER-MINOR)** **module**：在 require('.') 中处理 NODE\_PATH（Roman Reiss） [#1363](https://github.com/nodejs/node/pull/1363)
* \[[`cd60ff0328`](https://github.com/nodejs/node/commit/cd60ff0328)] - **net**：将 fd 添加到 listen2 调试信息中（Jackson Tian） [#1442](https://github.com/nodejs/node/pull/1442)
* \[[`10e31ba56c`](https://github.com/nodejs/node/commit/10e31ba56c)] - **(SEMVER-MINOR)** **node**：允许向 nextTick 传递多个参数（Trevor Norris） [#1077](https://github.com/nodejs/node/pull/1077)
* \[[`116c54692a`](https://github.com/nodejs/node/commit/116c54692a)] - **openssl**：修复 win32 上应用程序中的按键要求（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`62f5f4cec9`](https://github.com/nodejs/node/commit/62f5f4cec9)] - **src**：移除 Buffer 中重复的 byteLength（Jackson Tian） [#1438](https://github.com/nodejs/node/pull/1438)
* \[[`51d0808c90`](https://github.com/nodejs/node/commit/51d0808c90)] - **stream**：移除重复表达式（Yazhong Liu） [#1444](https://github.com/nodejs/node/pull/1444)
* \[[`deb9d23d7b`](https://github.com/nodejs/node/commit/deb9d23d7b)] - **test**：修复 openssl-1.0.2a 的错误信息检查（Shigeki Ohtsu） [#1389](https://github.com/nodejs/node/pull/1389)
* \[[`ca8c9ec2c8`](https://github.com/nodejs/node/commit/ca8c9ec2c8)] - **win,node-gyp**：可选择允许将 node.exe/iojs.exe 重命名（Bert Belder） [#1266](https://github.com/nodejs/node/pull/1266)

<a id="1.7.1"></a>

## 2015-04-14，版本 1.7.1，@rvagg

### 重要变更

* **build**：发布构建的 Makefile 中存在一个语法错误，导致 1.7.0 处于无法运行状态并且未发布。（Rod Vagg） [#1421](https://github.com/nodejs/node/pull/1421)。

### 已知问题

* `beforeExit` 期间运行的未引用定时器仍有一些问题有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 正如文档所示，`process.send()` 并不是同步的；这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)，修复见 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行时调用 `dns.setServers()` 可能会因断言失败而导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* readline：分离的转义序列处理不正确，参见 [#1403](https://github.com/nodejs/node/issues/1403)

### 提交

* \[[`aee86a21f2`](https://github.com/nodejs/node/commit/aee86a21f2)] - **build**：修复 RELEASE 检查（Rod Vagg） [#1421](https://github.com/nodejs/node/pull/1421)

<a id="1.7.0"></a>

## 2015-04-14，版本 1.7.0，@rvagg

### 重要变更

* **C++ API**：Fedor Indutny 为 V8 贡献了一个功能，已回移植到 io.js 捆绑的 V8 中。`SealHandleScope` 允许 C++ 插件作者“封闭”一个 `HandleScope`，以防止其中进一步产生意外分配。目前仅对 io.js 的调试构建启用。此功能帮助发现了 [#1075](https://github.com/nodejs/node/issues/1075) 中的内存泄漏，并且现在已在 io.js 的根 `HandleScope` 上启用。（Fedor Indutny） [#1395](https://github.com/nodejs/node/pull/1395)。
* **ARM**：此版本包含大量工作，以改善 ARM 构建和测试的支持状态。io.js CI 集群的 ARMv6、ARMv7 和 ARMv8 构建服务器现在都（大多）报告构建和测试通过。
  * ARMv8 64 位（AARCH64）现在已得到正确支持，包括一个回移植的 libuv 修复，该修复曾错误地检测 `epoll_wait()` 的存在。（Ben Noordhuis） [#1365](https://github.com/nodejs/node/pull/1365)。
  * ARMv6：[#1376](https://github.com/nodejs/node/issues/1376) 报告了 ARMv6（包括 Raspberry Pi）上 `Math.exp()` 的一个问题。罪魁祸首是在使用 V8 的“fast math”功能时，为 ARMv6 生成了错误的代码。默认情况下，所有 ARMv6 变体都已启用 `--nofast_math` 以避免此问题，如需可使用 `--fast_math` 重新开启 fast math。（Ben Noordhuis） [#1398](https://github.com/nodejs/node/pull/1398)。
  * 测试：已针对更慢的平台（识别为 ARMv6 和 ARMv7）专门调整了超时时间。（Roman Reiss） [#1366](https://github.com/nodejs/node/pull/1366)。
* **npm**：将 npm 升级到 2.7.6。详情请参见 [发行说明](https://github.com/npm/npm/releases/tag/v2.7.6)。摘要：
  * [`b747593`](https://github.com/npm/npm/commit/b7475936f473f029e6a027ba1b16277523747d0b)[#7630](https://github.com/npm/npm/issues/7630) 不要把所有 git 失败都自动记录为错误。`maybeGithub` 需要能够在不记录日志的情况下失败，以支持其回退逻辑。（[@othiym23](https://github.com/othiym23)）
  * [`78005eb`](https://github.com/npm/npm/commit/78005ebb6f4103c20f077669c3929b7ea46a4c0d)[#7743](https://github.com/npm/npm/issues/7743) 始终为传递给 `npm run-script` 的参数加引号。这使得构建系统等可以在使用 `npm run-script <script> -- <arguments>` 作为参数传递给 `run-scripts` 时安全地转义 glob 模式。这个更改很难测试，如果最终证明会破坏用户的功能，可能会被回退或移至 `npm@3`。（[@mantoni](https://github.com/mantoni)）
  * [`da015ee`](https://github.com/npm/npm/commit/da015eee45f6daf384598151d06a9b57ffce136e)[#7074](https://github.com/npm/npm/issues/7074) `read-package-json@1.3.3`：`read-package-json` 不再缓存 `package.json` 文件，这以极小的性能损失换来了消除大量令人头疼的竞态条件。有关残酷细节请参见 [#7074](https://github.com/npm/npm/issues/7074)。（[@othiym23](https://github.com/othiym23)）

### 已知问题

* `beforeExit` 期间运行的未引用定时器仍有一些问题有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 正如文档所示，`process.send()` 并不是同步的；这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760)，修复见 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行时调用 `dns.setServers()` 可能会因断言失败而导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)
* readline：分离的转义序列处理不正确，参见 [#1403](https://github.com/nodejs/node/issues/1403)

### 提交

* \[[`d2b62a4973`](https://github.com/nodejs/node/commit/d2b62a4973)] - **benchmark**：不要在非 HTTP 基准测试中检查 wrk（Jackson Tian） [#1368](https://github.com/nodejs/node/pull/1368)
* \[[`fd90b33b94`](https://github.com/nodejs/node/commit/fd90b33b94)] - **build**：验证传递给 configure 的选项（Johan Bergström） [#1335](https://github.com/nodejs/node/pull/1335)
* \[[`04b02f5e34`](https://github.com/nodejs/node/commit/04b02f5e34)] - **build**：移除已弃用的标志（Johan Bergström） [#1407](https://github.com/nodejs/node/pull/1407)
* \[[`39d395c966`](https://github.com/nodejs/node/commit/39d395c966)] - **build**：修复 rpm 构建的细微改动（Dan Varga） [#1408](https://github.com/nodejs/node/pull/1408)
* \[[`f9a2d31b32`](https://github.com/nodejs/node/commit/f9a2d31b32)] - **build**：简化获取发布版本（Johan Bergström） [#1405](https://github.com/nodejs/node/pull/1405)
* \[[`cd38a4af8f`](https://github.com/nodejs/node/commit/cd38a4af8f)] - **build**：支持将 io.js 构建为静态库（Marat Abdullin） [#1341](https://github.com/nodejs/node/pull/1341)
* \[[`d726a177ed`](https://github.com/nodejs/node/commit/d726a177ed)] - **build**：移除针对共享 V8 的构建（Johan Bergström） [#1331](https://github.com/nodejs/node/pull/1331)
* \[[`a5244d3a39`](https://github.com/nodejs/node/commit/a5244d3a39)] - **(SEMVER-MINOR)** **deps**：从 v8 上游回移植 1f8555（Fedor Indutny） [#1395](https://github.com/nodejs/node/pull/1395)
* \[[`09d4a286ea`](https://github.com/nodejs/node/commit/09d4a286ea)] - **deps**：使 node-gyp 可与 io.js 一起工作（cjihrig） [#990](https://github.com/nodejs/node/pull/990)
* \[[`cc8376ae67`](https://github.com/nodejs/node/commit/cc8376ae67)] - **deps**：将 npm 升级到 2.7.6（Forrest L Norvell） [#1390](https://github.com/nodejs/node/pull/1390)
* \[[`5b0e5755a0`](https://github.com/nodejs/node/commit/5b0e5755a0)] - **deps**：为各架构生成 opensslconf.h（Shigeki Ohtsu） [#1377](https://github.com/nodejs/node/pull/1377)
* \[[`7d14aa0222`](https://github.com/nodejs/node/commit/7d14aa0222)] - **deps**：添加用于生成 opensslconf.h 的 Makefile（Shigeki Ohtsu） [#1377](https://github.com/nodejs/node/pull/1377)
* \[[`29a3301461`](https://github.com/nodejs/node/commit/29a3301461)] - **deps**：让 opensslconf.h 包含每个目标架构（Shigeki Ohtsu） [#1377](https://github.com/nodejs/node/pull/1377)
* \[[`93a1a07ef4`](https://github.com/nodejs/node/commit/93a1a07ef4)] - **doc**：从 http.request 中移除 keepAlive 选项（Jeremiah Senkpiel） [#1392](https://github.com/nodejs/node/pull/1392)
* \[[`3ad6ea7c38`](https://github.com/nodejs/node/commit/3ad6ea7c38)] - **doc**：移除 `end` 监听器中的冗余参数。（Alex Yursha） [#1387](https://github.com/nodejs/node/pull/1387)
* \[[`2bc3532461`](https://github.com/nodejs/node/commit/2bc3532461)] - **doc**：记录 Console 类（Jackson Tian） [#1388](https://github.com/nodejs/node/pull/1388)
* \[[`69bc1382b7`](https://github.com/nodejs/node/commit/69bc1382b7)] - **doc**：正确缩进 http.Agent 的 keepAlive 选项（Jeremiah Senkpiel） [#1384](https://github.com/nodejs/node/pull/1384)
* \[[`b464d467a2`](https://github.com/nodejs/node/commit/b464d467a2)] - **doc**：更新 COLLABORATOR_GUIDE 中的 curl 用法（Roman Reiss） [#1382](https://github.com/nodejs/node/pull/1382)
* \[[`61c0e7b70f`](https://github.com/nodejs/node/commit/61c0e7b70f)] - **doc**：更新 CONTRIBUTING 链接。（Andrew Crites） [#1380](https://github.com/nodejs/node/pull/1380)
* \[[`8d467e521c`](https://github.com/nodejs/node/commit/8d467e521c)] - **doc**：添加 2015-03-18 的 TC 会议纪要（Rod Vagg） [#1370](https://github.com/nodejs/node/pull/1370)
* \[[`8ba9c4a7c2`](https://github.com/nodejs/node/commit/8ba9c4a7c2)] - **doc**：添加 2015-04-01 的 TC 会议纪要（Rod Vagg） [#1371](https://github.com/nodejs/node/pull/1371)
* \[[`48facf93ad`](https://github.com/nodejs/node/commit/48facf93ad)] - **doc**：更新 AUTHORS 列表（Rod Vagg） [#1372](https://github.com/nodejs/node/pull/1372)
* \[[`1219e7466c`](https://github.com/nodejs/node/commit/1219e7466c)] - **lib**：减少 process.binding() 调用次数（Brendan Ashworth） [#1367](https://github.com/nodejs/node/pull/1367)
* \[[`264a8f3a1b`](https://github.com/nodejs/node/commit/264a8f3a1b)] - **linux**：修复 arm64 上的 epoll_pwait() 回退方案（Ben Noordhuis） [#1365](https://github.com/nodejs/node/pull/1365)
* \[[`f0bf6bb024`](https://github.com/nodejs/node/commit/f0bf6bb024)] - **readline**：修复不使用 new 调用构造函数的问题（Alex Kocharin） [#1385](https://github.com/nodejs/node/pull/1385)
* \[[`ff74931107`](https://github.com/nodejs/node/commit/ff74931107)] - **smalloc**：不跟踪外部内存（Fedor Indutny） [#1375](https://github.com/nodejs/node/pull/1375)
* \[[`a07c69113a`](https://github.com/nodejs/node/commit/a07c69113a)] - **(SEMVER-MINOR)** **src**：使用全局的 SealHandleScope（Fedor Indutny） [#1395](https://github.com/nodejs/node/pull/1395)
* \[[`a4d88475fa`](https://github.com/nodejs/node/commit/a4d88475fa)] - **src**：仅在 armv6 上禁用 fast math（Ben Noordhuis） [#1398](https://github.com/nodejs/node/pull/1398)
* \[[`e306c78f83`](https://github.com/nodejs/node/commit/e306c78f83)] - **src**：在 arm 上禁用 fast math（Ben Noordhuis） [#1398](https://github.com/nodejs/node/pull/1398)
* \[[`7049d7b474`](https://github.com/nodejs/node/commit/7049d7b474)] - **test**：增加 ARM 上的超时时间（Roman Reiss） [#1366](https://github.com/nodejs/node/pull/1366)
* \[[`3066f2c0c3`](https://github.com/nodejs/node/commit/3066f2c0c3)] - **test**：将 arm 机器上的测试超时翻倍（Ben Noordhuis） [#1357](https://github.com/nodejs/node/pull/1357)
* \[[`66db9241cb`](https://github.com/nodejs/node/commit/66db9241cb)] - **tools**：移除未使用的文件（Johan Bergström） [#1406](https://github.com/nodejs/node/pull/1406)
* \[[`8bc8bd4bc2`](https://github.com/nodejs/node/commit/8bc8bd4bc2)] - **tools**：添加到 install deps/openssl/config/archs（Shigeki Ohtsu） [#1377](https://github.com/nodejs/node/pull/1377)
* \[[`907aaf325a`](https://github.com/nodejs/node/commit/907aaf325a)] - **win,node-gyp**：可选地允许重命名 node.exe/iojs.exe（Bert Belder） [#1266](https://github.com/nodejs/node/pull/1266)
* \[[`372bf83818`](https://github.com/nodejs/node/commit/372bf83818)] - **zlib**：使常量保持只读（Jackson Tian） [#1361](https://github.com/nodejs/node/pull/1361)

<a id="1.6.4"></a>

## 2015-04-06，版本 1.6.4，@Fishrock123

### 显著变更

* **npm**：将 npm 升级到 2.7.5。详情参见 [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v275-2015-03-26)。包含两个重要的安全修复。摘要：
  * [`300834e`](https://github.com/npm/npm/commit/300834e91a4e2a95fb7fb59c309e7c3fc91d2312)
    `tar@2.0.0`：规范化指向提取根目录之外目标的符号链接。这可防止包含符号链接的软件包覆盖软件包预期路径之外的目标。感谢 [Tim
    Cuthbertson](http://gfxmonk.net/) 以及 [Lift
    Security](https://liftsecurity.io/) 团队与 npm 团队合作识别此问题。([@othiym23](https://github.com/othiym23))
  * [`0dc6875`](https://github.com/npm/npm/commit/0dc68757cffd5397c280bc71365d106523a5a052)
    `semver@4.3.2`：软件包版本长度不能超过 256 个字符。
    这可防止解析版本号时耗费指数级更多的时间和内存，从而导致潜在的拒绝服务。感谢 Lift Security 的 Adam Baldwin 提请我们注意此问题。([@isaacs](https://github.com/isaacs))
  * [`eab6184`](https://github.com/npm/npm/commit/eab618425c51e3aa4416da28dcd8ca4ba63aec41)
    [#7766](https://github.com/npm/npm/issues/7766) 最后一次微调，确保 GitHub 快捷方式可用于私有仓库。
    ([@iarna](https://github.com/iarna))
  * [`a840a13`](https://github.com/npm/npm/commit/a840a13bbf0330157536381ea8e58d0bd93b4c05)
    [#7746](https://github.com/npm/npm/issues/7746) 仅在确实存在需要修正的路径时修正 git URL 路径。([@othiym23](https://github.com/othiym23))
* **openssl**：已完成面向即将升级到 OpenSSL 1.0.2a 的初步工作 [#1325](https://github.com/nodejs/node/pull/1325)（Shigeki Ohtsu）。有关更多细节，请参见 [#589](https://github.com/nodejs/node/issues/589)。
* **timers**：修复了计时器未被引用时的一个轻微内存泄漏，以及一些相关的 timers 问题 [#1330](https://github.com/nodejs/node/pull/1330)（Fedor Indutny）。这似乎修复了在 [#1075](https://github.com/nodejs/node/issues/1075) 中报告的剩余泄漏。
* **android**：现在可以为 Android 及相关设备编译 io.js [#1307](https://github.com/nodejs/node/pull/1307)（Giovanny Andres Gongora Granada）。

### 已知问题

* `beforeExit` 期间运行的未引用计时器仍有一些问题待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`3a69b7689b`](https://github.com/io.js/io.js/commit/3a69b7689b)] - **benchmark**：添加 rsa/aes-gcm 性能测试 (Shigeki Ohtsu) [iojs/io.js#1325](https://github.com/nodejs/node/pull/1325)
* \[[`1c709f3aa9`](https://github.com/io.js/io.js/commit/1c709f3aa9)] - **benchmark**：添加/移除哈希算法 (Shigeki Ohtsu) [iojs/io.js#1325](https://github.com/nodejs/node/pull/1325)
* \[[`a081c7c522`](https://github.com/io.js/io.js/commit/a081c7c522)] - **benchmark**：修复 chunky 客户端基准测试执行问题 (Brian White) [iojs/io.js#1257](https://github.com/nodejs/node/pull/1257)
* \[[`65d4d25f52`](https://github.com/io.js/io.js/commit/65d4d25f52)] - **build**：Android 默认使用 armv7+vfpv3 (Giovanny Andres Gongora Granada) [iojs/io.js#1307](https://github.com/nodejs/node/pull/1307)
* \[[`6a134f7d70`](https://github.com/io.js/io.js/commit/6a134f7d70)] - **build**：避免从 pmake 传递私有标志 (Johan Bergström) [iojs/io.js#1334](https://github.com/nodejs/node/pull/1334)
* \[[`5094a0fde3`](https://github.com/io.js/io.js/commit/5094a0fde3)] - **build**：将 BSDmakefile 参数传递给 gmake (Johan Bergström) [iojs/io.js#1298](https://github.com/nodejs/node/pull/1298)
* \[[`f782824d48`](https://github.com/io.js/io.js/commit/f782824d48)] - **deps**：重构 openssl.gyp (Shigeki Ohtsu) [iojs/io.js#1325](https://github.com/nodejs/node/pull/1325)
* \[[`21f4fb6215`](https://github.com/io.js/io.js/commit/21f4fb6215)] - **deps**：将 gyp 更新到 e1c8fcf7 (Shigeki Ohtsu) [iojs/io.js#1325](https://github.com/nodejs/node/pull/1325)
* \[[`dac903f9b6`](https://github.com/io.js/io.js/commit/dac903f9b6)] - **deps**：使 node-gyp 与 io.js 配合工作 (cjihrig) [iojs/io.js#990](https://github.com/nodejs/node/pull/990)
* \[[`5eb983e0b3`](https://github.com/io.js/io.js/commit/5eb983e0b3)] - **deps**：将 npm 升级到 2.7.5 (Forrest L Norvell) [iojs/io.js#1337](https://github.com/nodejs/node/pull/1337)
* \[[`008078862e`](https://github.com/io.js/io.js/commit/008078862e)] - **deps**：检入 gtest，添加 util 单元测试 (Ben Noordhuis) [iojs/io.js#1199](https://github.com/nodejs/node/pull/1199)
* \[[`48d69cf1bb`](https://github.com/io.js/io.js/commit/48d69cf1bb)] - _**回退**_ "**doc**：修复 CHANGELOG.md 中的拼写错误" (Giovanny Andres Gongora Granada) [iojs/io.js#1349](https://github.com/nodejs/node/pull/1349)
* \[[`679596c848`](https://github.com/io.js/io.js/commit/679596c848)] - **doc**：添加 Docker WG (Peter Petrov) [iojs/io.js#1134](https://github.com/nodejs/node/pull/1134)
* \[[`d8578bad25`](https://github.com/io.js/io.js/commit/d8578bad25)] - **doc**：修复 COLLABORATOR_GUIDE.md 中的轻微拼写错误 (Kelsey) [iojs/io.js#1320](https://github.com/nodejs/node/pull/1320)
* \[[`bde2b3e397`](https://github.com/io.js/io.js/commit/bde2b3e397)] - **doc**：修复 CHANGELOG.md 中的拼写错误 (Giovanny Andres Gongora Granada) [iojs/io.js#1342](https://github.com/nodejs/node/pull/1342)
* \[[`8c6c376a94`](https://github.com/io.js/io.js/commit/8c6c376a94)] - **doc**：为 Fishrock123 添加 GPG 指纹 (Jeremiah Senkpiel) [iojs/io.js#1324](https://github.com/nodejs/node/pull/1324)
* \[[`ccbea18960`](https://github.com/io.js/io.js/commit/ccbea18960)] - **doc**：改进协作者 GPG 密钥的格式 (Jeremiah Senkpiel) [iojs/io.js#1324](https://github.com/nodejs/node/pull/1324)
* \[[`87053e8aee`](https://github.com/io.js/io.js/commit/87053e8aee)] - **doc**：为布尔变量 'true' 补回反引号 (Kohei TAKATA) [iojs/io.js#1338](https://github.com/nodejs/node/pull/1338)
* \[[`634e9629a0`](https://github.com/io.js/io.js/commit/634e9629a0)] - **doc**：添加 2015-03-04 TC 会议纪要 (Rod Vagg) [iojs/io.js#1123](https://github.com/nodejs/node/pull/1123)
* \[[`245ba1d658`](https://github.com/io.js/io.js/commit/245ba1d658)] - **doc**：修复 util.isObject 文档 (Jeremiah Senkpiel) [iojs/io.js#1295](https://github.com/nodejs/node/pull/1295)
* \[[`ad937752ee`](https://github.com/io.js/io.js/commit/ad937752ee)] - **doc,src**：移除对 --max-stack-size 的引用 (Aria Stewart) [iojs/io.js#1327](https://github.com/nodejs/node/pull/1327)
* \[[`15f058f609`](https://github.com/io.js/io.js/commit/15f058f609)] - **gyp**：修复在 python 2.6 下的构建 (Fedor Indutny) [iojs/io.js#1325](https://github.com/nodejs/node/pull/1325)
* \[[`4dc6ae2181`](https://github.com/io.js/io.js/commit/4dc6ae2181)] - **lib**：移除未使用的变量 (Brian White) [iojs/io.js#1290](https://github.com/nodejs/node/pull/1290)
* \[[`b6e22c4bd5`](https://github.com/io.js/io.js/commit/b6e22c4bd5)] - **src**：在预加载前设置 cluster 工作进程 (Ali Ijaz Sheikh) [iojs/io.js#1314](https://github.com/nodejs/node/pull/1314)
* \[[`4a801c211c`](https://github.com/io.js/io.js/commit/4a801c211c)] - **src**：弃用自研线程池，改用 libplatform (Ben Noordhuis) [iojs/io.js#1329](https://github.com/nodejs/node/pull/1329)
* \[[`f1e5a13516`](https://github.com/io.js/io.js/commit/f1e5a13516)] - **src**：将 MIN 定义包裹在 infdef 中 (Johan Bergström) [iojs/io.js#1322](https://github.com/nodejs/node/pull/1322)
* \[[`6f72d87c27`](https://github.com/io.js/io.js/commit/6f72d87c27)] - **test**：添加一个针对 unref'ed 计时器泄漏的测试 (Fedor Indutny) [iojs/io.js#1330](https://github.com/nodejs/node/pull/1330)
* \[[`416499c872`](https://github.com/io.js/io.js/commit/416499c872)] - **timers**：移除冗余代码 (Fedor Indutny) [iojs/io.js#1330](https://github.com/nodejs/node/pull/1330)
* \[[`d22b2a934a`](https://github.com/io.js/io.js/commit/d22b2a934a)] - **timers**：在 close 之后不要重启 interval (Fedor Indutny) [iojs/io.js#1330](https://github.com/nodejs/node/pull/1330)
* \[[`cca5efb086`](https://github.com/io.js/io.js/commit/cca5efb086)] - **timers**：当 unrefd 时不要关闭 interval timers (Julien Gilli)
* \[[`0e061975d7`](https://github.com/io.js/io.js/commit/0e061975d7)] - **timers**：修复 unref() 内存泄漏 (Trevor Norris) [iojs/io.js#1330](https://github.com/nodejs/node/pull/1330)
* \[[`ec7fbf2bb2`](https://github.com/io.js/io.js/commit/ec7fbf2bb2)] - **tools**：修复 openssl 头文件的安装源路径 (Oguz Bastemur) [iojs/io.js#1354](https://github.com/nodejs/node/pull/1354)
* \[[`644ece1f67`](https://github.com/io.js/io.js/commit/644ece1f67)] - **tools**：移除 gyp 测试目录 (Shigeki Ohtsu) [iojs/io.js#1350](https://github.com/nodejs/node/pull/1350)
* \[[`eb459c8151`](https://github.com/io.js/io.js/commit/eb459c8151)] - **tools**：修复 gyp 以便在没有 XCode 的 MacOSX 上工作 (Shigeki Ohtsu) [iojs/io.js#1325](https://github.com/nodejs/node/pull/1325)
* \[[`1e94057c05`](https://github.com/io.js/io.js/commit/1e94057c05)] - **url**：修复从非文件 URL 到文件 URL 的解析。(Jeffrey Jagoda) [iojs/io.js#1277](https://github.com/nodejs/node/pull/1277)
* \[[`382bd9d2e0`](https://github.com/io.js/io.js/commit/382bd9d2e0)] - **v8**：回移植 openbsd/amd64 构建修复 (Ben Noordhuis) [iojs/io.js#1318](https://github.com/nodejs/node/pull/1318)
* \[[`efadffe861`](https://github.com/io.js/io.js/commit/efadffe861)] - **win,node-gyp**：可选地允许将 node.exe/iojs.exe 重命名 (Bert Belder) [iojs/io.js#1266](https://github.com/nodejs/node/pull/1266)

<a id="1.6.3"></a>

## 2015-03-31, 版本 1.6.3, @rvagg

### 重要变更

* **fs**：在某些情况下，`fs.writeFileSync()` 以及追加模式下的 `fs.writeFile()` 和 `fs.writeFileSync()` 可能导致数据损坏，见 [#1058](https://github.com/nodejs/node/issues/1058)，已在 [#1063](https://github.com/nodejs/node/pull/1063) 中修复（Olov Lassus）。
* **iojs**：引入了一个“内部模块” API，允许核心代码仅在内部共享 JavaScript 模块，而无需将其暴露为公共 API，此功能仅供核心使用 [#848](https://github.com/nodejs/node/pull/848)（Vladimir Kurchatkin）。
* **timers**：修复了定时器的两个小问题：
  * `Timer#close()` 现在真正是幂等的 [#1288](https://github.com/nodejs/node/issues/1288)（Petka Antonov）。
  * `setTimeout()` 在回调执行期间调用 `unref()` 后，现在只会执行回调一次 [#1231](https://github.com/nodejs/node/pull/1231)（Roman Reiss）。
  * 注意：定时器代码仍有其他未解决的问题，例如 [#1152](https://github.com/nodejs/node/pull/1152)。
* **Windows**：为 Windows 上编译的插件添加了一个“延迟加载钩子”，应能缓解 io.js 中 Windows 用户在使用插件时可能遇到的一些问题 [#1251](https://github.com/nodejs/node/pull/1251)（Bert Belder）。
* **V8**：将 V8 小版本升级到 4.1.0.27，并包含错误修复。
* **npm**：将 npm 升级到 2.7.4。详情请参见 [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v274-2015-03-20)。摘要：
  * [`1549106`](https://github.com/npm/npm/commit/1549106f518000633915686f5f1ccc6afcf77f8f) [#7641](https://github.com/npm/npm/issues/7641) 由于 448efd0，运行 `npm shrinkwrap --dev` 会导致生产依赖不再包含在 `npm-shrinkwrap.json` 中。哎呀！（[@othiym23](https://github.com/othiym23)）
  * [`fb0ac26`](https://github.com/npm/npm/commit/fb0ac26eecdd76f6eaa4a96a865b7c6f52ce5aa5) [#7579](https://github.com/npm/npm/issues/7579) 仅当我们确定 npm 不负责这些文件和链接时，才阻止删除它们。这个改动很难概括，因为如果一切正常，你应该永远不会看到它；但如果你想了解更多背景，只需[阅读提交信息](https://github.com/npm/npm/commit/fb0ac26eecdd76f6eaa4a96a865b7c6f52ce5aa5)，里面把一切都解释清楚了。（[@othiym23](https://github.com/othiym23)）
  * [`051c473`](https://github.com/npm/npm/commit/051c4738486a826300f205b71590781ce7744f01) [#7552](https://github.com/npm/npm/issues/7552) 现在 `bundledDependencies` 会被正确包含在安装上下文中。这又是一个极其难以概括的 bug，同样地，如果你对细节感兴趣，我建议你[阅读提交信息](https://github.com/npm/npm/commit/051c4738486a826300f205b71590781ce7744f01)。简洁地说，这修复了 `ember-cli` 的许多使用场景。（[@othiym23](https://github.com/othiym23)）
  * [`fe1bc38`](https://github.com/npm/npm/commit/fe1bc387a14475e373557de669e03d9d006d3173)[#7672](https://github.com/npm/npm/issues/7672) `npm-registry-client@3.1.2`：通过更正属性名来修复客户端证书处理。（[@atamon](https://github.com/atamon)）
  * [`89ce829`](https://github.com/npm/npm/commit/89ce829a00b526d0518f5cd855c323bffe182af0)[#7630](https://github.com/npm/npm/issues/7630) `hosted-git-info@1.5.3`：确保 GitHub 简写的处理方式一致的第 3 部分。（[@othiym23](https://github.com/othiym23)）
  * [`63313eb`](https://github.com/npm/npm/commit/63313eb0c37891c355546fd1093010c8a0c3cd81)[#7630](https://github.com/npm/npm/issues/7630) `realize-package-specifier@2.2.0`：确保 GitHub 简写的处理方式一致的第 2 部分。（[@othiym23](https://github.com/othiym23)）
  * [`3ed41bf`](https://github.com/npm/npm/commit/3ed41bf64a1bb752bb3155c74dd6ffbbd28c89c9)[#7630](https://github.com/npm/npm/issues/7630) `npm-package-arg@3.1.1`：确保 GitHub 简写的处理方式一致的第 1 部分。（[@othiym23](https://github.com/othiym23)）

### 已知问题

* 定时器和 `unref()` 仍存在一些问题有待解决。见 [#1152](https://github.com/nodejs/node/pull/1152)。
* 可能仍存在一些小的内存泄漏，但尚未被正确识别，详情见 [#1075](https://github.com/nodejs/node/issues/1075)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归问题，见 [#760](https://github.com/nodejs/node/issues/760) 以及 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会导致进程在断言失败时崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`7dd5e824be`](https://github.com/nodejs/node/commit/7dd5e824be)] - **assert**：简化测试缓冲区相等性的逻辑 (Alex Yursha) [#1171](https://github.com/nodejs/node/pull/1171)
* \[[`a2ea16838f`](https://github.com/nodejs/node/commit/a2ea16838f)] - **debugger**：不要在远程模式下启动子进程 (Jackson Tian) [#1282](https://github.com/nodejs/node/pull/1282)
* \[[`2752da4b64`](https://github.com/nodejs/node/commit/2752da4b64)] - **deps**：使 node-gyp 可与 io.js 一起工作 (cjihrig) [#990](https://github.com/nodejs/node/pull/990)
* \[[`f166cdecf1`](https://github.com/nodejs/node/commit/f166cdecf1)] - **deps**：将 npm 升级到 2.7.4 (Forrest L Norvell)
* \[[`318d9d8fd7`](https://github.com/nodejs/node/commit/318d9d8fd7)] - **deps**：将 v8 升级到 4.1.0.27 (Ben Noordhuis) [#1289](https://github.com/nodejs/node/pull/1289)
* \[[`269e46be37`](https://github.com/nodejs/node/commit/269e46be37)] - **deps**：使 node-gyp 可与 io.js 一起工作 (cjihrig) [#990](https://github.com/nodejs/node/pull/990)
* \[[`b542fb94a4`](https://github.com/nodejs/node/commit/b542fb94a4)] - **deps**：将 npm 升级到 2.7.3 (Forrest L Norvell) [#1219](https://github.com/nodejs/node/pull/1219)
* \[[`73de13511d`](https://github.com/nodejs/node/commit/73de13511d)] - **doc**：在 WORKING\_GROUPS.md 中添加 WG 链接并修正细微问题 (Farrin Reid) [#1113](https://github.com/nodejs/node/pull/1113)
* \[[`19641b17be`](https://github.com/nodejs/node/commit/19641b17be)] - **doc**：将侧边栏滚动解耦 (Roman Reiss) [#1274](https://github.com/nodejs/node/pull/1274)
* \[[`dbccf8d3ed`](https://github.com/nodejs/node/commit/dbccf8d3ed)] - **doc**：修复功能标志中的拼写错误 (Phillip Lamplugh) [#1286](https://github.com/nodejs/node/pull/1286)
* \[[`5e609e9324`](https://github.com/nodejs/node/commit/5e609e9324)] - _**Revert**_ "**doc**：澄清真实姓名要求" (Jeremiah Senkpiel) [#1276](https://github.com/nodejs/node/pull/1276)
* \[[`45814216ee`](https://github.com/nodejs/node/commit/45814216ee)] - **doc**：修复格式文档中的不一致之处 (Brendan Ashworth) [#1255](https://github.com/nodejs/node/pull/1255)
* \[[`4e9bf93e9c`](https://github.com/nodejs/node/commit/4e9bf93e9c)] - **doc**：澄清真实姓名要求 (Roman Reiss) [#1250](https://github.com/nodejs/node/pull/1250)
* \[[`e84dd5f651`](https://github.com/nodejs/node/commit/e84dd5f651)] - **doc**：记录 repl 按需模块加载 (Roman Reiss) [#1249](https://github.com/nodejs/node/pull/1249)
* \[[`c9207f7fc2`](https://github.com/nodejs/node/commit/c9207f7fc2)] - **fs**：修复 writeFile 和 writeFileSync 中的数据损坏 (Olov Lassus) [#1063](https://github.com/nodejs/node/pull/1063)
* \[[`2db758c562`](https://github.com/nodejs/node/commit/2db758c562)] - **iojs**：引入内部模块 (Vladimir Kurchatkin) [#848](https://github.com/nodejs/node/pull/848)
* \[[`36f017afaf`](https://github.com/nodejs/node/commit/36f017afaf)] - **js2c**：修复 Windows 上的模块 id 生成 (Ben Noordhuis) [#1281](https://github.com/nodejs/node/pull/1281)
* \[[`1832743e18`](https://github.com/nodejs/node/commit/1832743e18)] - **lib**：为 errors lib/\*.js 补上缺失的 `new` (Mayhem) [#1246](https://github.com/nodejs/node/pull/1246)
* \[[`ea37ac04f4`](https://github.com/nodejs/node/commit/ea37ac04f4)] - **src**：在与子进程的关闭竞争中忽略 ENOTCONN (Ben Noordhuis) [#1214](https://github.com/nodejs/node/pull/1214)
* \[[`f06b16f2e9`](https://github.com/nodejs/node/commit/f06b16f2e9)] - **src**：修复 preload-modules 中的小内存泄漏 (Ali Ijaz Sheikh) [#1265](https://github.com/nodejs/node/pull/1265)
* \[[`2903410aa8`](https://github.com/nodejs/node/commit/2903410aa8)] - **src**：不要延迟加载定时器全局对象 (Ben Noordhuis) [#1280](https://github.com/nodejs/node/pull/1280)
* \[[`2e5b87a147`](https://github.com/nodejs/node/commit/2e5b87a147)] - **src**：移除不必要的环境查找 (Ben Noordhuis) [#1238](https://github.com/nodejs/node/pull/1238)
* \[[`7e88a9322c`](https://github.com/nodejs/node/commit/7e88a9322c)] - **src**：使访问器免受上下文混淆影响 (Ben Noordhuis) [#1238](https://github.com/nodejs/node/pull/1238)
* \[[`c8fa8ccdbc`](https://github.com/nodejs/node/commit/c8fa8ccdbc)] - **streams**：对 `_stream_wrap` 使用 strict (Brendan Ashworth) [#1279](https://github.com/nodejs/node/pull/1279)
* \[[`8a945814dd`](https://github.com/nodejs/node/commit/8a945814dd)] - **string_decoder**：优化 write() (Brian White) [#1209](https://github.com/nodejs/node/pull/1209)
* \[[`8d1c87ea0a`](https://github.com/nodejs/node/commit/8d1c87ea0a)] - **test**：修复 parallel/test-vm-debug-context 中的竞态 (Ben Noordhuis) [#1294](https://github.com/nodejs/node/pull/1294)
* \[[`955c1508da`](https://github.com/nodejs/node/commit/955c1508da)] - **test**：减少 sequential/test-fs-watch 的不稳定性 (Roman Reiss) [#1275](https://github.com/nodejs/node/pull/1275)
* \[[`77c2da10fd`](https://github.com/nodejs/node/commit/77c2da10fd)] - **timers**：使 Timer.close 幂等 (Petka Antonov) [#1288](https://github.com/nodejs/node/pull/1288)
* \[[`776b73b243`](https://github.com/nodejs/node/commit/776b73b243)] - **timers**：清理 interval 处理逻辑 (Jeremiah Senkpiel) [#1272](https://github.com/nodejs/node/pull/1272)
* \[[`caf0b36de3`](https://github.com/nodejs/node/commit/caf0b36de3)] - **timers**：确保 setTimeout 回调只运行一次 (Roman Reiss) [#1231](https://github.com/nodejs/node/pull/1231)
* \[[`2ccc8f3970`](https://github.com/nodejs/node/commit/2ccc8f3970)] - **tls_wrap**：修复这个极其愚蠢的泄漏 (Fedor Indutny) [#1244](https://github.com/nodejs/node/pull/1244)
* \[[`e74b5d278c`](https://github.com/nodejs/node/commit/e74b5d278c)] - **tls_wrap**：修复 SSL 错误时的 BIO 泄漏 (Fedor Indutny) [#1244](https://github.com/nodejs/node/pull/1244)
* \[[`ba93c583bc`](https://github.com/nodejs/node/commit/ba93c583bc)] - **win,node-gyp**：可选地允许重命名 node.exe/iojs.exe (Bert Belder) [#1266](https://github.com/nodejs/node/pull/1266)
* \[[`08acf1352c`](https://github.com/nodejs/node/commit/08acf1352c)] - **win,node-gyp**：使延迟加载钩子可选 (Bert Belder) [#1266](https://github.com/nodejs/node/pull/1266)
* \[[`3d46fefe0c`](https://github.com/nodejs/node/commit/3d46fefe0c)] - **win,node-gyp**：允许重命名 node.exe/iojs.exe (Bert Belder) [#1251](https://github.com/nodejs/node/pull/1251)

<a id="1.6.2"></a>

## 2015-03-23，版本 1.6.2，@rvagg

### 重要变更

* **Windows**：在改进 Windows 支持状态方面持续进行的工作再次使完整测试套件顺利通过。正如 v1.4.2 的发布说明中所提到的，CI 系统和配置问题阻止其正确报告 Windows 测试中的问题，CI 和代码库中的问题似乎已经完全解决。
* **FreeBSD**：发现了一个影响 io.js/Node.js 的 [内核 bug](https://lists.freebsd.org/pipermail/freebsd-current/2015-March/055043.html)，并已引入补丁以防止它给 io.js 带来问题（Fedor Indutny） [#1218](https://github.com/nodejs/node/pull/1218)。
* **module**：现在可以使用 `require('.')`，而不必使用 `require('./')`，这被视为一个 bug 修复（Michaël Zasso） [#1185](https://github.com/nodejs/node/pull/1185)。
* **v8**：更新到 4.1.0.25，包含对 `--max_old_space_size` 值高于 `4096` 的补丁以及 Solaris 支持，这两项都已包含在 io.js 中。

### 已知问题

* 可能仍然存在少量内存泄漏，但尚未被正确识别，详情见 [#1075](https://github.com/nodejs/node/issues/1075)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所述那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 及修复 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败而导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`fe4434b77a`](https://github.com/nodejs/node/commit/fe4434b77a)] - **deps**：将 v8 升级到 4.1.0.25 (Johan Bergström) [#1224](https://github.com/nodejs/node/pull/1224)
* \[[`d8f383ba3f`](https://github.com/nodejs/node/commit/d8f383ba3f)] - **doc**：更新 AUTHORS 列表 (Rod Vagg) [#1234](https://github.com/nodejs/node/pull/1234)
* \[[`bc9c1a5a7b`](https://github.com/nodejs/node/commit/bc9c1a5a7b)] - **doc**：修复 CHANGELOG 中的拼写错误 (Mathieu Darse) [#1230](https://github.com/nodejs/node/pull/1230)
* \[[`99c79f8d41`](https://github.com/nodejs/node/commit/99c79f8d41)] - **doc**：在空上下文中调用 js 函数 (Ben Noordhuis) [#1125](https://github.com/nodejs/node/pull/1125)
* \[[`55abf34be5`](https://github.com/nodejs/node/commit/55abf34be5)] - **doc**：不要使用 `using namespace v8` (Ben Noordhuis) [#1125](https://github.com/nodejs/node/pull/1125)
* \[[`c4e1b82120`](https://github.com/nodejs/node/commit/c4e1b82120)] - **doc**：将 v8::Handle\<T> 替换为 v8::Local\<T> (Ben Noordhuis) [#1125](https://github.com/nodejs/node/pull/1125)
* \[[`2f1b78347c`](https://github.com/nodejs/node/commit/2f1b78347c)] - **doc**：移除不必要的 v8::HandleScopes (Ben Noordhuis) [#1125](https://github.com/nodejs/node/pull/1125)
* \[[`409d413363`](https://github.com/nodejs/node/commit/409d413363)] - **doc**：移除对 v8::Isolate::GetCurrent() 的使用 (Ben Noordhuis) [#1125](https://github.com/nodejs/node/pull/1125)
* \[[`33fea6ed5f`](https://github.com/nodejs/node/commit/33fea6ed5f)] - **lib**：不要惩罚 setInterval() 的常见用法 (Ben Noordhuis) [#1221](https://github.com/nodejs/node/pull/1221)
* \[[`31da9758a0`](https://github.com/nodejs/node/commit/31da9758a0)] - **lib**：不要惩罚 setTimeout() 的常见用法 (Ben Noordhuis) [#1221](https://github.com/nodejs/node/pull/1221)
* \[[`6fc5e95354`](https://github.com/nodejs/node/commit/6fc5e95354)] - **module**：允许 `require('.')` (Michaël Zasso) [#1185](https://github.com/nodejs/node/pull/1185)
* \[[`9ae1a61214`](https://github.com/nodejs/node/commit/9ae1a61214)] - **node**：确保 streams2 不会对 stdin 调用 `.end()` (Fedor Indutny) [#1233](https://github.com/nodejs/node/pull/1233)
* \[[`b64983d77c`](https://github.com/nodejs/node/commit/b64983d77c)] - **src**：在 FreeBSD 上将信号处理器重置为 SIG\_DFL (Fedor Indutny) [#1218](https://github.com/nodejs/node/pull/1218)
* \[[`9705a34e96`](https://github.com/nodejs/node/commit/9705a34e96)] - **test**：移动 sequential/test-signal-unregister (Ben Noordhuis) [#1227](https://github.com/nodejs/node/pull/1227)
* \[[`10a9c00563`](https://github.com/nodejs/node/commit/10a9c00563)] - **test**：修复 signal 测试中的时序问题 (Ben Noordhuis) [#1227](https://github.com/nodejs/node/pull/1227)
* \[[`999fbe9d96`](https://github.com/nodejs/node/commit/999fbe9d96)] - **test**：修复 crypto-binary-default 中错误的 crypto 检查 (Brendan Ashworth) [#1141](https://github.com/nodejs/node/pull/1141)
* \[[`2b3b2d392f`](https://github.com/nodejs/node/commit/2b3b2d392f)] - **test**：添加 setTimeout/setInterval 多参数测试 (Ben Noordhuis) [#1221](https://github.com/nodejs/node/pull/1221)
* \[[`849319a260`](https://github.com/nodejs/node/commit/849319a260)] - **util**：检查 util.inherits 的输入 (Connor Peet) [#1240](https://github.com/nodejs/node/pull/1240)
* \[[`cf081a4712`](https://github.com/nodejs/node/commit/cf081a4712)] - **vm**：修复 debug 上下文中致命错误导致的崩溃 (Ben Noordhuis) [#1229](https://github.com/nodejs/node/pull/1229)

<a id="1.6.1"></a>

## 2015-03-20，版本 1.6.1，@rvagg

### 重要变更

* **path**：`path.resolve()` 新增的类型检查 [#1153](https://github.com/nodejs/node/pull/1153) 发现了一些在实际环境中被依赖的边缘情况，最显著的是 `path.dirname(undefined)`。`path.dirname()`、`path.basename()` 和 `path.extname()` 的类型检查已放宽（Colin Ihrig） [#1216](https://github.com/nodejs/node/pull/1216)。
* **querystring**：`querystring.parse()` 和 `querystring.stringify()` 的内部优化 [#847](https://github.com/nodejs/node/pull/847) 阻止了 `Number` 字面量通过 `querystring.escape()` [#1208](https://github.com/nodejs/node/issues/1208) 被正确转换，暴露了测试套件中的一个盲点。该 bug 和相关测试现已修复（Jeremiah Senkpiel） [#1213](https://github.com/nodejs/node/pull/1213)。

### 已知问题

* 可能仍存在与 TLS 相关的内存泄漏，详情见 [#1075](https://github.com/nodejs/node/issues/1075)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所述那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 及修复 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败而导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`3b9eab9779`](https://github.com/nodejs/node/commit/3b9eab9779)] - **build**：使 check aliases 测试 (Johan Bergström) [#1211](https://github.com/nodejs/node/pull/1211)
* \[[`4c731042d4`](https://github.com/nodejs/node/commit/4c731042d4)] - **configure**：在 os x 上默认使用 cc 和 c++ (Ben Noordhuis) [#1210](https://github.com/nodejs/node/pull/1210)
* \[[`8de78e470d`](https://github.com/nodejs/node/commit/8de78e470d)] - **path**：减少部分方法的类型检查 (cjihrig) [#1216](https://github.com/nodejs/node/pull/1216)
* \[[`c9aec2b716`](https://github.com/nodejs/node/commit/c9aec2b716)] - **querystring**：修复损坏的 stringifyPrimitive (Jeremiah Senkpiel) [#1213](https://github.com/nodejs/node/pull/1213)
* \[[`a89f5c2156`](https://github.com/nodejs/node/commit/a89f5c2156)] - **querystring**：正确解析数字 (Jeremiah Senkpiel) [#1213](https://github.com/nodejs/node/pull/1213)
* \[[`2034137385`](https://github.com/nodejs/node/commit/2034137385)] - **smalloc**：不要混用 malloc() 和 new char\[] (Ben Noordhuis) [#1205](https://github.com/nodejs/node/pull/1205)

<a id="1.6.0"></a>

## 2015-03-19，版本 1.6.0，@chrisdickinson

### 重要变更

* **node**：可使用新的 `-r` 或 `--require` 命令行选项在启动时预加载模块（Ali Ijaz Sheikh） [#881](https://github.com/nodejs/node/pull/881)。
* **querystring**：`parse()` 和 `stringify()` 现在更快了（Brian White） [#847](https://github.com/nodejs/node/pull/847)。
* **http**：`http.ClientRequest#flush()` 方法已被弃用，并替换为 `http.ClientRequest#flushHeaders()`，以匹配 Node.js v0.12 中的同一变更，参见 [joyent/node#9048](https://github.com/joyent/node/pull/9048)（Yosuke Furukawa） [#1156](https://github.com/nodejs/node/pull/1156)。
* **net**：允许 `server.listen()` 接受 `port` 的 `String` 类型选项，例如 `{ port: "1234" }`，以匹配从 [joyent/node#9268](https://github.com/joyent/node/pull/9268) 起 `net.connect()` 接受同类选项的行为（Ben Noordhuis） [#1116](https://github.com/nodejs/node/pull/1116)。
* **tls**：继续修复报告中的内存泄漏问题，不过在相关用例中似乎仍有一个轻微泄漏，进展请关注 [#1075](https://github.com/nodejs/node/issues/1075)。
* **v8**：回移一个修复，用于处理当使用高于 `4096` 的 `--max_old_space_size` 值时发生的整数溢出（Ben Noordhuis） [#1166](https://github.com/nodejs/node/pull/1166)。
* **platforms**：io.js CI 系统现在报告 **FreeBSD** 和 **SmartOS**（_Solaris_）通过。
* **npm**：将 npm 升级到 2.7.1。详情见 [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v271-2015-03-05)。摘要：
  * [`6823807`](https://github.com/npm/npm/commit/6823807bba) [#7121](https://github.com/npm/npm/issues/7121) 对 Git 依赖执行 `npm install --save` 时，保存传入的 URL，而不是用于克隆远程仓库的临时目录。修复了在 shrinkwrapping 时使用 Git 依赖的问题。在此过程中，重写了 Git 依赖缓存代码。又一次。没有更多单字母变量名，工作流程也清晰得多。([@othiym23](https://github.com/othiym23))
  * [`abdd040`](https://github.com/npm/npm/commit/abdd040da9) read-package-json\@1.3.2：当遇到 JSON 解析错误时，通过使用比 JSON.parse 更宽容的 JSON 解析器，提供更有帮助的错误消息。([@smikes](https://github.com/smikes))
  * [`c56cfcd`](https://github.com/npm/npm/commit/c56cfcd79c) [#7525](https://github.com/npm/npm/issues/7525) `npm dedupe` 处理 scoped 包。([@KidkArolis](https://github.com/KidkArolis))
  * [`4ef1412`](https://github.com/npm/npm/commit/4ef1412d00) [#7075](https://github.com/npm/npm/issues/7075) 如果你尝试将一个发布版本标记为有效的 semver 范围，`npm publish` 和 `npm tag` 会提前报错，而不是继续执行。([@smikes](https://github.com/smikes))

### 已知问题

* 可能仍存在与 TLS 相关的内存泄漏，详情见 [#1075](https://github.com/nodejs/node/issues/1075)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所述那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 及修复 [#774](https://github.com/nodejs/node/issues/774)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败而导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`a84ea66b35`](https://github.com/nodejs/node/commit/a84ea66b35)] - **deps**：升级到 openssl-1.0.1m (Shigeki Ohtsu) [#1206](https://github.com/nodejs/node/pull/1206)
* \[[`3bc445f6c2`](https://github.com/nodejs/node/commit/3bc445f6c2)] - **doc**：修复损坏的协作者 github 链接 (Aleksanteri Negru-Vode) [#1204](https://github.com/nodejs/node/pull/1204)
* \[[`813a536126`](https://github.com/nodejs/node/commit/813a536126)] - **buffer**：移除重复代码 (Thorsten Lorenz) [#1144](https://github.com/nodejs/node/pull/1144)
* \[[`1514b82355`](https://github.com/nodejs/node/commit/1514b82355)] - **(SEMVER-MINOR) src**：添加用于预加载模块的 -r/--require 标志 (Ali Ijaz Sheikh) [#881](https://github.com/nodejs/node/pull/881)
* \[[`f600111d82`](https://github.com/nodejs/node/commit/f600111d82)] - **test**：缓存惰性属性，修正一些样式细节 (Rod Vagg) [#1196](https://github.com/nodejs/node/pull/1196)
* \[[`3038b8ee6a`](https://github.com/nodejs/node/commit/3038b8ee6a)] - **test**：tls-wrap-timeout.js 中的双重超时 (Fedor Indutny) [#1201](https://github.com/nodejs/node/pull/1201)
* \[[`dd37fb4c48`](https://github.com/nodejs/node/commit/dd37fb4c48)] - **build**：移除 vcbuild.bat 中错误的参数 (Jeremiah Senkpiel) [#1198](https://github.com/nodejs/node/pull/1198)
* \[[`2b2e48a4b9`](https://github.com/nodejs/node/commit/2b2e48a4b9)] - **lib**：当 cwd 不存在时不要在 repl 中报错 (Ben Noordhuis) [#1194](https://github.com/nodejs/node/pull/1194)
* \[[`2c6f79c08c`](https://github.com/nodejs/node/commit/2c6f79c08c)] - **src**：当 cwd 不存在时不要在启动时报错 (Ben Noordhuis) [#1194](https://github.com/nodejs/node/pull/1194)
* \[[`c15e81afdd`](https://github.com/nodejs/node/commit/c15e81afdd)] - **test**：引入对 FreeBSD jail 的识别 (Johan Bergström) [#1167](https://github.com/nodejs/node/pull/1167)
* \[[`fe0f015c51`](https://github.com/nodejs/node/commit/fe0f015c51)] - **src**：修复 32 位上的 crypto bio 整数回绕 (Ben Noordhuis) [#1192](https://github.com/nodejs/node/pull/1192)
* \[[`2b63bcd247`](https://github.com/nodejs/node/commit/2b63bcd247)] - **doc**：添加 yosuke-furukawa 作为协作者 (Yosuke Furukawa) [#1183](https://github.com/nodejs/node/pull/1183)
* \[[`69350baaef`](https://github.com/nodejs/node/commit/69350baaef)] - **doc**：更新 CONTRIBUTING.md 中的测试部分 (Ben Noordhuis) [#1181](https://github.com/nodejs/node/pull/1181)
* \[[`3c8ae2d934`](https://github.com/nodejs/node/commit/3c8ae2d934)] - **doc**：添加 petkaantonov 作为协作者 (Petka Antonov) [#1179](https://github.com/nodejs/node/pull/1179)
* \[[`92c1ad97c0`](https://github.com/nodejs/node/commit/92c1ad97c0)] - **doc**：添加 silverwind 作为协作者 (Roman Reiss) [#1176](https://github.com/nodejs/node/pull/1176)
* \[[`14c74d5326`](https://github.com/nodejs/node/commit/14c74d5326)] - **doc**：添加 jbergstroem 作为协作者 (Johan Bergström) [#1175](https://github.com/nodejs/node/pull/1175)
* \[[`8b2363d2fd`](https://github.com/nodejs/node/commit/8b2363d2fd)] - **configure**：使用 gcc 和 g++ 作为 CC 和 CXX 默认值 (Ben Noordhuis) [#1174](https://github.com/nodejs/node/pull/1174)
* \[[`08ec897f82`](https://github.com/nodejs/node/commit/08ec897f82)] - **doc**：修复 buffer 模块文档中的拼写错误 (Alex Yursha) [#1169](https://github.com/nodejs/node/pull/1169)
* \[[`c638dad567`](https://github.com/nodejs/node/commit/c638dad567)] - **benchmark**：添加输出格式选项 \[csv] (Brendan Ashworth) [#777](https://github.com/nodejs/node/pull/777)
* \[[`97d8d4928d`](https://github.com/nodejs/node/commit/97d8d4928d)] - **benchmark**：添加 plot\_csv R 绘图脚本 (Brendan Ashworth) [#777](https://github.com/nodejs/node/pull/777)
* \[[`22793da485`](https://github.com/nodejs/node/commit/22793da485)] - **v8**：修复 --max\_old\_space\_size=4096 的整数溢出 (Ben Noordhuis) [#1166](https://github.com/nodejs/node/pull/1166)
* \[[`b2e00e38dc`](https://github.com/nodejs/node/commit/b2e00e38dc)] - **(SEMVER-MINOR) http**：添加 flushHeaders 并弃用 flush (Yosuke Furukawa) [#1156](https://github.com/nodejs/node/pull/1156)
* \[[`68d4bed2fd`](https://github.com/nodejs/node/commit/68d4bed2fd)] - **make**：从 cpplint 排除项中移除 node\_dtrace (Julien Gilli) [joyent/node#8741](https://github.com/joyent/node/pull/8741)
* \[[`30666f22ca`](https://github.com/nodejs/node/commit/30666f22ca)] - **net**：使用缓存的 peername 来解析远程字段 (James Hartig) [joyent/node#9366](https://github.com/joyent/node/pull/9366)
* \[[`e6e616fdcb`](https://github.com/nodejs/node/commit/e6e616fdcb)] - **doc**：修复 Windows 上的 `\\` 拼写错误 (Steven Vercruysse) [joyent/node#9412](https://github.com/joyent/node/pull/9412)
* \[[`89bf6c05e9`](https://github.com/nodejs/node/commit/89bf6c05e9)] - **build**：允许自定义 PackageMaker 路径 (Julien Gilli) [joyent/node#9377](https://github.com/joyent/node/pull/9377)
* \[[`f58e59649d`](https://github.com/nodejs/node/commit/f58e59649d)] - **lib**：移除损坏的 NODE\_MODULE\_CONTEXTS 特性 (Ben Noordhuis) [#1162](https://github.com/nodejs/node/pull/1162)
* \[[`2551c1d2ca`](https://github.com/nodejs/node/commit/2551c1d2ca)] - **src**：对 heapTotal/heapUsed 使用 Number::New() (Ben Noordhuis) [#1148](https://github.com/nodejs/node/pull/1148)
* \[[`4f394998ba`](https://github.com/nodejs/node/commit/4f394998ba)] - **src**：出错时不要重复创建 js 字符串 (Ben Noordhuis) [#1148](https://github.com/nodejs/node/pull/1148)
* \[[`eb995d6822`](https://github.com/nodejs/node/commit/eb995d6822)] - **path**：为 path 输入添加类型检查 (cjihrig) [#1153](https://github.com/nodejs/node/pull/1153)
* \[[`a28945b128`](https://github.com/nodejs/node/commit/a28945b128)] - **doc**：反映新的 require('events') 行为 (Alex Yursha) [#975](https://github.com/nodejs/node/pull/975)
* \[[`85a92a37ef`](https://github.com/nodejs/node/commit/85a92a37ef)] - **querystring**：优化 parse 和 stringify (Brian White) [#847](https://github.com/nodejs/node/pull/847)
* \[[`65d0a8eca8`](https://github.com/nodejs/node/commit/65d0a8eca8)] - **deps**：使 node-gyp 能与 io.js 一起工作 (cjihrig) [#990](https://github.com/nodejs/node/pull/990)
* \[[`7d0baf1741`](https://github.com/nodejs/node/commit/7d0baf1741)] - **deps**：将 npm 升级到 2.7.1 (Forrest L Norvell) [#1142](https://github.com/nodejs/node/pull/1142)
* \[[`4eb8810a27`](https://github.com/nodejs/node/commit/4eb8810a27)] - **tls**：重新启用 TLSWrap 上的 `.writev()` (Fedor Indutny) [#1155](https://github.com/nodejs/node/pull/1155)
* \[[`e90ed790c3`](https://github.com/nodejs/node/commit/e90ed790c3)] - **tls**：修复 `DoWrite()` 错误上的泄漏 (Fedor Indutny) [#1154](https://github.com/nodejs/node/pull/1154)
* \[[`056ed4b0c9`](https://github.com/nodejs/node/commit/056ed4b0c9)] - **src**：回退 -r/--require 标志 (Chris Dickinson) [#1150](https://github.com/nodejs/node/pull/1150)
* \[[`7a5b023bac`](https://github.com/nodejs/node/commit/7a5b023bac)] - **doc**：修复 vm 模块示例 (FangDun Cai) [#1147](https://github.com/nodejs/node/pull/1147)
* \[[`7bde3f1a8f`](https://github.com/nodejs/node/commit/7bde3f1a8f)] - **(SEMVER-MINOR) src**：添加用于预加载模块的 -r/--require 标志 (Ali Ijaz Sheikh) [#881](https://github.com/nodejs/node/pull/881)
* \[[`53e200acc2`](https://github.com/nodejs/node/commit/53e200acc2)] - **test**：修复 test-http-content-length (Jeremiah Senkpiel) [#1145](https://github.com/nodejs/node/pull/1145)
* \[[`d8c4a932c9`](https://github.com/nodejs/node/commit/d8c4a932c9)] - **crypto**：为 cross cert 添加已弃用的 ValiCert CA (Shigeki Ohtsu) [#1135](https://github.com/nodejs/node/pull/1135)
* \[[`82f067e60b`](https://github.com/nodejs/node/commit/82f067e60b)] - **test**：修复 ext 命令为双引号形式 (Shigeki Ohtsu) [#1122](https://github.com/nodejs/node/pull/1122)
* \[[`5ecdc0314d`](https://github.com/nodejs/node/commit/5ecdc0314d)] - **test**：添加通过管道读取大文件的测试 (Santiago Gimeno) [#1074](https://github.com/nodejs/node/pull/1074)
* \[[`a6af709489`](https://github.com/nodejs/node/commit/a6af709489)] - **fs**：仅在读取常规文件时使用 stat.st\_size (Santiago Gimeno) [#1074](https://github.com/nodejs/node/pull/1074)
* \[[`0782c24993`](https://github.com/nodejs/node/commit/0782c24993)] - **test**：修复 readfile-zero-byte-liar 测试 (Santiago Gimeno) [#1074](https://github.com/nodejs/node/pull/1074)
* \[[`e2c9040995`](https://github.com/nodejs/node/commit/e2c9040995)] - **src**：在 debug 和 exit 时不要泄漏句柄 (Fedor Indutny) [#1133](https://github.com/nodejs/node/pull/1133)
* \[[`8c4f0df464`](https://github.com/nodejs/node/commit/8c4f0df464)] - **v8**：修复在 solaris 平台上的构建 (Johan Bergström) [#1079](https://github.com/nodejs/node/pull/1079)
* \[[`41c9daa143`](https://github.com/nodejs/node/commit/41c9daa143)] - **build**：修复 vcbuild.bat 中不正确的设置 (Bert Belder)
* \[[`07c066724c`](https://github.com/nodejs/node/commit/07c066724c)] - **buffer**：将块对齐到 8 字节边界 (Fedor Indutny) [#1126](https://github.com/nodejs/node/pull/1126)
* \[[`d33a647b4b`](https://github.com/nodejs/node/commit/d33a647b4b)] - **doc**：使 tools/update-authors.sh 跨平台 (Ben Noordhuis) [#1121](https://github.com/nodejs/node/pull/1121)
* \[[`8453fbc879`](https://github.com/nodejs/node/commit/8453fbc879)] - **https**：不要覆盖 servername 选项 (skenqbx) [#1110](https://github.com/nodejs/node/pull/1110)
* \[[`60dac07b06`](https://github.com/nodejs/node/commit/60dac07b06)] - **doc**：将 Malte-Thorben Bruns 添加到 .mailmap (Ben Noordhuis) [#1118](https://github.com/nodejs/node/pull/1118)
* \[[`480b48244f`](https://github.com/nodejs/node/commit/480b48244f)] - **(SEMVER-MINOR) lib**：允许 server.listen({ port: "1234" }) (Ben Noordhuis) [#1116](https://github.com/nodejs/node/pull/1116)
* \[[`80e14d736e`](https://github.com/nodejs/node/commit/80e14d736e)] - **doc**：将 checkServerIdentity 选项移到 tls.connect() (skenqbx) [#1107](https://github.com/nodejs/node/pull/1107)
* \[[`684a5878b6`](https://github.com/nodejs/node/commit/684a5878b6)] - **doc**：修复 url.markdown 中缺失的句号 (Ryuichi Okumura) [#1115](https://github.com/nodejs/node/pull/1115)
* \[[`8431fc53f1`](https://github.com/nodejs/node/commit/8431fc53f1)] - **tls_wrap**：在原型中代理句柄方法 (Fedor Indutny) [#1108](https://github.com/nodejs/node/pull/1108)
* \[[`8070b1ff99`](https://github.com/nodejs/node/commit/8070b1ff99)] - **buffer**：如果不存在则不要分配 .parent (Trevor Norris) [#1109](https://github.com/nodejs/node/pull/1109)

<a id="1.5.1"></a>

## 2015-03-09，版本 1.5.1，@rvagg

### 重要变更

* **tls**：本版本中已通过多个提交至少部分解决了报告的 TLS 内存泄漏问题。当前测试表明，_可能_ 仍然存在一些泄漏问题。在 [#1075](https://github.com/nodejs/node/issues/1075) 跟踪完整进展。
* **http**：修复了在 [joyent/node#9348](https://github.com/joyent/node/issues/9348) 和 [npm/npm#7349](https://github.com/npm/npm/issues/7349) 中报告的错误。在 `'error'` 事件触发时，未能完整读取待处理数据，导致在 `socket.destroy()` 上断言失败。（Fedor Indutny）[#1103](https://github.com/nodejs/node/pull/1103)

### 已知问题

* 可能仍存在与 TLS 相关的内存泄漏，详情见 [#1075](https://github.com/nodejs/node/issues/1075)。
* Windows 仍然报告一些轻微的测试失败，我们会继续优先处理所有这些问题。见 [#1005](https://github.com/nodejs/node/issues/1005)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所说的那样是同步的，这是 1.0.2 中引入的回归问题，见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()`，可能会因断言失败导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`030a92347d`](https://github.com/nodejs/node/commit/030a92347d)] - **benchmark**：chunky http client 基准测试变体（Rudi Cilibrasi）[#228](https://github.com/nodejs/node/pull/228)
* \[[`3b57819b58`](https://github.com/nodejs/node/commit/3b57819b58)] - **crypto**：修复 SafeX509ExtPrint 中的泄漏（Fedor Indutny）[#1087](https://github.com/nodejs/node/pull/1087)
* \[[`f8c893dd39`](https://github.com/nodejs/node/commit/f8c893dd39)] - **doc**：修复 util.markdown 中令人困惑的 markdown（Yazhong Liu）[#1097](https://github.com/nodejs/node/pull/1097)
* \[[`e763220f66`](https://github.com/nodejs/node/commit/e763220f66)] - **doc**：更新 clang 版本先决条件（Brendan Ashworth）[#1094](https://github.com/nodejs/node/pull/1094)
* \[[`0f7c8ebeea`](https://github.com/nodejs/node/commit/0f7c8ebeea)] - **doc**：在 net 文档中将冠词 “an” 替换为 “a”（Evan Lucas）[#1093](https://github.com/nodejs/node/pull/1093)
* \[[`cf565b5516`](https://github.com/nodejs/node/commit/cf565b5516)] - **fs**：修复 `.write()` 未将非字符串值强制转换的问题（Jeremiah Senkpiel）[#1102](https://github.com/nodejs/node/pull/1102)
* \[[`1a3ca8223e`](https://github.com/nodejs/node/commit/1a3ca8223e)] - **http_client**：确保在出错时套接字为空（Fedor Indutny）[#1103](https://github.com/nodejs/node/pull/1103)
* \[[`8670613d2d`](https://github.com/nodejs/node/commit/8670613d2d)] - **node_crypto_bio**：调整外部内存大小（Fedor Indutny）[#1085](https://github.com/nodejs/node/pull/1085)
* \[[`528d8786ff`](https://github.com/nodejs/node/commit/528d8786ff)] - **src**：修复 fs.writeSync 错误路径中的内存泄漏（Ben Noordhuis）[#1092](https://github.com/nodejs/node/pull/1092)
* \[[`648fc63cd1`](https://github.com/nodejs/node/commit/648fc63cd1)] - **src**：修复 src/node_file.cc 中 delete\[] 不匹配的问题（Ben Noordhuis）[#1092](https://github.com/nodejs/node/pull/1092)
* \[[`9f7c9811e2`](https://github.com/nodejs/node/commit/9f7c9811e2)] - **src**：添加缺失的 Context::Scope（Ben Noordhuis）[#1084](https://github.com/nodejs/node/pull/1084)
* \[[`fe36076c78`](https://github.com/nodejs/node/commit/fe36076c78)] - **stream_base**：WriteWrap::New/::Dispose（Fedor Indutny）[#1090](https://github.com/nodejs/node/pull/1090)
* \[[`7f4c95e160`](https://github.com/nodejs/node/commit/7f4c95e160)] - **tls**：不要泄漏 WriteWrap 对象（Fedor Indutny）[#1090](https://github.com/nodejs/node/pull/1090)
* \[[`4bd3620382`](https://github.com/nodejs/node/commit/4bd3620382)] - **url**：移除 url.parse 中多余的赋值（Alex Kocharin）[#1095](https://github.com/nodejs/node/pull/1095)

<a id="1.5.0"></a>

## 2015-03-06，版本 1.5.0，@rvagg

### 重要变更

* **buffer**：新增 `Buffer#indexOf()` 方法，参照 [`Array#indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 设计。可接受 String、Buffer 或 Number。字符串按 UTF8 解释。（Trevor Norris）[#561](https://github.com/nodejs/node/pull/561)
* **fs**：`'fs'` 方法中的 `options` 对象属性不再执行 `hasOwnProperty()` 检查，因此允许 options 对象具有可生效的原型属性。（Jonathan Ong）[#635](https://github.com/nodejs/node/pull/635)
* **tls**：PayPal 报告了一个很可能存在的 TLS 内存泄漏。**stream_wrap** 中最近的一些更改似乎是罪魁祸首。初始修复见 [#1078](https://github.com/nodejs/node/pull/1078)，你可以在 [#1075](https://github.com/nodejs/node/issues/1075) 跟踪修复该泄漏的进展（Fedor Indutny）。
* **npm**：将 npm 升级到 2.7.0。详情请参见 [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v270-2015-02-26)，其中解释了为什么这属于 semver-minor 而不是 semver-major。摘要：
  * [`145af65`](https://github.com/npm/npm/commit/145af6587f45de135cc876be2027ed818ed4ca6a)
    [#4887](https://github.com/npm/npm/issues/4887) 通过向 npm 传递
    `--node-gyp=/path/to/node-gyp` 选项，替代对 npm 内置的
    `node-gyp` 脚本的调用。可替换为 `pangyp` 或修改过的
    `node-gyp` 版本，以更好地与 io.js 协同工作，而无需修改
    npm 的代码！（[@ackalker](https://github.com/ackalker))
  * [`2f6a1df`](https://github.com/npm/npm/commit/2f6a1df3e1e3e0a3bc4abb69e40f59a64204e7aa)
    [#1999](https://github.com/npm/npm/issues/1999) 仅在未定义 `restart` 脚本时才运行 `stop` 和 `start`
    脚本（以及它们的 pre- 和 post- 脚本）。这使得更容易支持由 npm
    管理的服务进行优雅重启。（[@watilde](https://github.com/watilde) /
    [@scien](https://github.com/scien))
  * [`448efd0`](https://github.com/npm/npm/commit/448efd0eaa6f97af0889bf47efc543a1ea2f8d7e)
    [#2853](https://github.com/npm/npm/issues/2853) 为 `npm ls` 添加 `--dev` 和
    `--prod` 支持，以便按需仅列出生产或
    开发依赖树。
    （[@watilde](https://github.com/watilde))
  * [`a0a8777`](https://github.com/npm/npm/commit/a0a87777af8bee180e4e9321699f050c29ed5ac4)
    [#7463](https://github.com/npm/npm/issues/7463) 将 `npm run-script` 打印的列表拆分为生命周期脚本和通过 `npm
    run-script` 直接调用的脚本。（[@watilde](https://github.com/watilde))
  * [`a5edc17`](https://github.com/npm/npm/commit/a5edc17d5ef1435b468a445156a4a109df80f92b)
    [#6749](https://github.com/npm/npm/issues/6749) `init-package-json@1.3.1`：
    支持向 `npm init` 传递 scope，以便将包初始化为该 scope / 组织 / 团队的一部分。（[@watilde](https://github.com/watilde))
* **TC**：Colin Ihrig (@cjihrig) 因希望投入更多编码、减少会议而从 TC 辞职。

### 已知问题

* 可能存在与 TLS 相关的内存泄漏，详情见 [#1075](https://github.com/nodejs/node/issues/1075)。
* Windows 仍然报告一些轻微的测试失败，我们会继续优先处理所有这些问题。见 [#1005](https://github.com/nodejs/node/issues/1005)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所说的那样是同步的，这是 1.0.2 中引入的回归问题，见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()`，可能会因断言失败导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`b27931b0fe`](https://github.com/nodejs/node/commit/b27931b0fe)] - **benchmark**：修复 `wrk` 检查（Brian White）[#1076](https://github.com/nodejs/node/pull/1076)
* \[[`2b79052494`](https://github.com/nodejs/node/commit/2b79052494)] - **benchmark**：在运行基准测试前检查是否有 wrk（Johan Bergström）[#982](https://github.com/nodejs/node/pull/982)
* \[[`31421afe89`](https://github.com/nodejs/node/commit/31421afe89)] - **buffer**：重写 Buffer.concat 的错误消息（Chris Dickinson）[joyent/node#8723](https://github.com/joyent/node/pull/8723)
* \[[`78581c8d90`](https://github.com/nodejs/node/commit/78581c8d90)] - **(SEMVER-MINOR) buffer**：添加 indexOf() 方法（Trevor Norris）[#561](https://github.com/nodejs/node/pull/561)
* \[[`37bb1df7c4`](https://github.com/nodejs/node/commit/37bb1df7c4)] - **build**：从 io.js 中移除 mdb（Johan Bergström）[#1023](https://github.com/nodejs/node/pull/1023)
* \[[`726671cb0e`](https://github.com/nodejs/node/commit/726671cb0e)] - **build**：添加基础的 mips/mipsel 支持（Ben Noordhuis）[#1045](https://github.com/nodejs/node/pull/1045)
* \[[`a45d4f8fd6`](https://github.com/nodejs/node/commit/a45d4f8fd6)] - **build**：从树中移除 tools/wrk（Johan Bergström）[#982](https://github.com/nodejs/node/pull/982)
* \[[`dee07e2983`](https://github.com/nodejs/node/commit/dee07e2983)] - **deps**：使 node-gyp 可与 io.js 配合工作（cjihrig）[#990](https://github.com/nodejs/node/pull/990)
* \[[`fe14802fb7`](https://github.com/nodejs/node/commit/fe14802fb7)] - **deps**：将 npm 升级到 2.7.0（Forrest L Norvell）[#1080](https://github.com/nodejs/node/pull/1080)
* \[[`31142415de`](https://github.com/nodejs/node/commit/31142415de)] - **doc**：添加 2015-02-18 的 TC 会议纪要（Rod Vagg）[#1051](https://github.com/nodejs/node/pull/1051)
* \[[`6190a2236b`](https://github.com/nodejs/node/commit/6190a2236b)] - **doc**：将 cjihrig 从 TC 中移除（cjihrig）[#1056](https://github.com/nodejs/node/pull/1056)
* \[[`9741291fe9`](https://github.com/nodejs/node/commit/9741291fe9)] - **doc**：修复 child_process 的标题层级（Sam Roberts）[#1038](https://github.com/nodejs/node/pull/1038)
* \[[`c8110692a5`](https://github.com/nodejs/node/commit/c8110692a5)] - **doc**：为 querystring 添加说明（Robert Kowalski）[joyent/node#9259](https://github.com/joyent/node/pull/9259)
* \[[`8fb711e06c`](https://github.com/nodejs/node/commit/8fb711e06c)] - **doc**：修复 opts.decodeURIComponent 的默认值（h7lin）[joyent/node#9259](https://github.com/joyent/node/pull/9259)
* \[[`6433ad1eef`](https://github.com/nodejs/node/commit/6433ad1eef)] - **doc**：在 CHANGELOG 中添加缺失的换行符（Rod Vagg）
* \[[`555a7c48cf`](https://github.com/nodejs/node/commit/555a7c48cf)] - **events**：优化监听器数组克隆（Brian White）[#1050](https://github.com/nodejs/node/pull/1050)
* \[[`4d0329ebeb`](https://github.com/nodejs/node/commit/4d0329ebeb)] - **(SEMVER-MINOR) fs**：移除不必要的 .hasOwnProperty() 使用（Jonathan Ong）[#635](https://github.com/nodejs/node/pull/635)
* \[[`4874182065`](https://github.com/nodejs/node/commit/4874182065)] - **http**：尽可能发送 Content-Length（Christian Tellnes）[#1062](https://github.com/nodejs/node/pull/1062)
* \[[`08133f45c7`](https://github.com/nodejs/node/commit/08133f45c7)] - **http**：优化出站请求（Brendan Ashworth）[#605](https://github.com/nodejs/node/pull/605)
* \[[`dccb69a21a`](https://github.com/nodejs/node/commit/dccb69a21a)] - **js_stream**：修复实例泄漏（Fedor Indutny）[#1078](https://github.com/nodejs/node/pull/1078)
* \[[`4ddd6406ce`](https://github.com/nodejs/node/commit/4ddd6406ce)] - **lib**：避免在 Buffer#write() 中调用 .toLowerCase()（Ben Noordhuis）[#1048](https://github.com/nodejs/node/pull/1048)
* \[[`bbf54a554a`](https://github.com/nodejs/node/commit/bbf54a554a)] - **lib**：手工优化 Buffer 构造函数（Ben Noordhuis）[#1048](https://github.com/nodejs/node/pull/1048)
* \[[`9d2b89d06c`](https://github.com/nodejs/node/commit/9d2b89d06c)] - **net**：允许在 connect() 中使用端口 0（cjihrig）[joyent/node#9268](https://github.com/joyent/node/pull/9268)
* \[[`e0835c9cda`](https://github.com/nodejs/node/commit/e0835c9cda)] - **node**：提升 nextTick 的性能（Trevor Norris）[#985](https://github.com/nodejs/node/pull/985)
* \[[`8f5f12bb48`](https://github.com/nodejs/node/commit/8f5f12bb48)] - **smalloc**：从 C++ 导出常量（Vladimir Kurchatkin）[#920](https://github.com/nodejs/node/pull/920)
* \[[`0697f8b44d`](https://github.com/nodejs/node/commit/0697f8b44d)] - **smalloc**：在 js 中验证参数（Vladimir Kurchatkin）[#920](https://github.com/nodejs/node/pull/920)
* \[[`1640dedb3b`](https://github.com/nodejs/node/commit/1640dedb3b)] - **src**：修复 ucs-2 缓冲区编码回归问题（Ben Noordhuis）[#1042](https://github.com/nodejs/node/pull/1042)
* \[[`2eda2d6096`](https://github.com/nodejs/node/commit/2eda2d6096)] - **src**：修复外部字符串长度计算（Ben Noordhuis）[#1042](https://github.com/nodejs/node/pull/1042)
* \[[`4aea16f214`](https://github.com/nodejs/node/commit/4aea16f214)] - **src**：重命名一个令人困惑的局部变量（Ben Noordhuis）[#1042](https://github.com/nodejs/node/pull/1042)
* \[[`c9ee654290`](https://github.com/nodejs/node/commit/c9ee654290)] - **src**：简化 node::Utf8Value()（Ben Noordhuis）[#1042](https://github.com/nodejs/node/pull/1042)
* \[[`364cc7e08a`](https://github.com/nodejs/node/commit/364cc7e08a)] - **src**：移除 NODE_INVALID_UTF8 环境变量（Ben Noordhuis）[#1042](https://github.com/nodejs/node/pull/1042)
* \[[`826cde8661`](https://github.com/nodejs/node/commit/826cde8661)] - **src**：修复外部双字节字符串的垃圾回收启发式逻辑（Ben Noordhuis）[#1042](https://github.com/nodejs/node/pull/1042)
* \[[`f5b7e18243`](https://github.com/nodejs/node/commit/f5b7e18243)] - **src**：移除未使用的代码（Ben Noordhuis）[#1042](https://github.com/nodejs/node/pull/1042)
* \[[`4ae64b2626`](https://github.com/nodejs/node/commit/4ae64b2626)] - **src**：将 node 环境初始化从进程初始化中拆分出来（Petka Antonov）[#980](https://github.com/nodejs/node/pull/980)
* \[[`b150c9839e`](https://github.com/nodejs/node/commit/b150c9839e)] - **src**：修复 -Wempty-body 编译器警告（Ben Noordhuis）[#974](https://github.com/nodejs/node/pull/974)
* \[[`fb284e2e4d`](https://github.com/nodejs/node/commit/fb284e2e4d)] - **src**：修复 smalloc.cc 中的编译器警告（Ben Noordhuis）[#1055](https://github.com/nodejs/node/pull/1055)
* \[[`583a868bcd`](https://github.com/nodejs/node/commit/583a868bcd)] - **stream_wrap**：在 uv 回调中添加 HandleScope（Fedor Indutny）[#1078](https://github.com/nodejs/node/pull/1078)
* \[[`e2fb733a95`](https://github.com/nodejs/node/commit/e2fb733a95)] - **test**：简化 parallel/test-stringbytes-external（Ben Noordhuis）[#1042](https://github.com/nodejs/node/pull/1042)
* \[[`7b554b1a8f`](https://github.com/nodejs/node/commit/7b554b1a8f)] - **test**：不要在 domain 测试中生成子进程（Ben Noordhuis）[#974](https://github.com/nodejs/node/pull/974)
* \[[`b72fa03057`](https://github.com/nodejs/node/commit/b72fa03057)] - **test**：为 setHeader 中的 undefined 值添加测试（Ken Perkins）[#970](https://github.com/nodejs/node/pull/970)
* \[[`563771d8b1`](https://github.com/nodejs/node/commit/563771d8b1)] - **test**：将 host-headers 测试中的部分内容拆分为独立测试（Johan Bergström）[#1049](https://github.com/nodejs/node/pull/1049)
* \[[`671fbd5a9d`](https://github.com/nodejs/node/commit/671fbd5a9d)] - **test**：重构所有依赖 crypto 的测试（Johan Bergström）[#1049](https://github.com/nodejs/node/pull/1049)
* \[[`c7ad320472`](https://github.com/nodejs/node/commit/c7ad320472)] - **test**：检查 openssl cli 并在存在时提供路径（Johan Bergström）[#1049](https://github.com/nodejs/node/pull/1049)
* \[[`71776f9057`](https://github.com/nodejs/node/commit/71776f9057)] - **test**：移除未使用的 https 导入（Johan Bergström）[#1049](https://github.com/nodejs/node/pull/1049)
* \[[`3d5726c4ad`](https://github.com/nodejs/node/commit/3d5726c4ad)] - **test**：引入一个检查 crypto 是否可用的辅助函数（Johan Bergström）[#1049](https://github.com/nodejs/node/pull/1049)
* \[[`d0e7c359a7`](https://github.com/nodejs/node/commit/d0e7c359a7)] - **test**：不要假设 process.versions.openssl 总是可用（Johan Bergström）[#1049](https://github.com/nodejs/node/pull/1049)
* \[[`e1bf6709dc`](https://github.com/nodejs/node/commit/e1bf6709dc)] - **test**：修复 tls-inception 中的竞态问题（Fedor Indutny）[#1040](https://github.com/nodejs/node/pull/1040)
* \[[`fd3ea29902`](https://github.com/nodejs/node/commit/fd3ea29902)] - **test**：在 uid 为 0 时修复 test-fs-access（Johan Bergström）[#1037](https://github.com/nodejs/node/pull/1037)
* \[[`5abfa930b8`](https://github.com/nodejs/node/commit/5abfa930b8)] - **test**：使 destroyed-socket-write2.js 更健壮（Michael Dawson）[joyent/node#9270](https://github.com/joyent/node/pull/9270)
* \[[`1009130495`](https://github.com/nodejs/node/commit/1009130495)] - **tests**：修复 test-http-curl-chunk-problem 中的竞态（Julien Gilli）[joyent/node#9301](https://github.com/joyent/node/pull/9301)
* \[[`bd1bd7e38d`](https://github.com/nodejs/node/commit/bd1bd7e38d)] - **timer**：提升回调性能（Ruben Verborgh）[#406](https://github.com/nodejs/node/pull/406)
* \[[`7b3b8acfa6`](https://github.com/nodejs/node/commit/7b3b8acfa6)] - **tls**：接受空的 `net.Socket`s（Fedor Indutny）[#1046](https://github.com/nodejs/node/pull/1046)
* \[[`c09c90c1a9`](https://github.com/nodejs/node/commit/c09c90c1a9)] - **tls_wrap**：不要保留对父对象的持久引用（Fedor Indutny）[#1078](https://github.com/nodejs/node/pull/1078)
* \[[`3446ff417b`](https://github.com/nodejs/node/commit/3446ff417b)] - **tty**：不要向 handle 添加 `shutdown` 方法（Fedor Indutny）[#1073](https://github.com/nodejs/node/pull/1073)
* \[[`abb00cc915`](https://github.com/nodejs/node/commit/abb00cc915)] - **url**：对无效的 url.format 值抛出错误（Christian Tellnes）[#1036](https://github.com/nodejs/node/pull/1036)
* \[[`abd3ecfbd1`](https://github.com/nodejs/node/commit/abd3ecfbd1)] - **win,test**：修复 test-stdin-from-file（Bert Belder）[#1067](https://github.com/nodejs/node/pull/1067)

<a id="1.4.3"></a>

## 2015-03-02，版本 1.4.3，@rvagg

### 重要变更

* **stream**：修复了不支持 `writev()` 的平台上的问题，尤其是 Windows。1.4.1 中通过 [#926](https://github.com/nodejs/node/pull/926) 引入的变更破坏了这些平台上的部分功能，现已修复。 [#1008](https://github.com/nodejs/node/pull/1008)（Fedor Indutny）
* **arm**：我们已经开始具备 ARMv8 / ARM64 / AARCH64 支持的最初基础。要实现完整支持，还需要升级到 OpenSSL 1.0.2。 [#1028](https://github.com/nodejs/node/pull/1028)（Ben Noordhuis）
* 新增协作者：Julian Duque ([@julianduque](https://github.com/julianduque))

### 已知问题

* Windows 仍然报告一些小的测试失败，我们正在尽快处理所有这些问题。参见 [#1005](https://github.com/nodejs/node/issues/1005)。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()`，如果断言失败，可能会导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`ca3c50b789`](https://github.com/nodejs/node/commit/ca3c50b789)] - **build**：添加基本的 arm64 支持（Ben Noordhuis） [#1028](https://github.com/nodejs/node/pull/1028)
* \[[`08e89b1880`](https://github.com/nodejs/node/commit/08e89b1880)] - **doc**：更新 AUTHORS 列表（Rod Vagg） [#1018](https://github.com/nodejs/node/pull/1018)
* \[[`ea02d90cd0`](https://github.com/nodejs/node/commit/ea02d90cd0)] - **doc**：添加 julianduque 作为协作者（Julian Duque） [#1021](https://github.com/nodejs/node/pull/1021)
* \[[`dfe7a17784`](https://github.com/nodejs/node/commit/dfe7a17784)] - **doc**：修复 WORKING_GROUPS.md 中的拼写错误和来源（&! (bitandbang)） [#1022](https://github.com/nodejs/node/pull/1022)
* \[[`6d26990d32`](https://github.com/nodejs/node/commit/6d26990d32)] - **doc**：清理 net.Socket（Ryan Scheel） [#951](https://github.com/nodejs/node/pull/951)
* \[[`c380ac6e98`](https://github.com/nodejs/node/commit/c380ac6e98)] - **doc**：为已弃用的 AP 提供替代建议（Benjamin Gruenbaum） [#1007](https://github.com/nodejs/node/pull/1007)
* \[[`3d6440cf2a`](https://github.com/nodejs/node/commit/3d6440cf2a)] - **src**：修复 --without-ssl 构建（Ben Noordhuis） [#1027](https://github.com/nodejs/node/pull/1027)
* \[[`2b47fd2eb6`](https://github.com/nodejs/node/commit/2b47fd2eb6)] - **stream_base**：`.writev()` 的支持有限（Fedor Indutny） [#1008](https://github.com/nodejs/node/pull/1008)

<a id="1.4.2"></a>

## 2015-02-28，版本 1.4.2，@rvagg

### 重要变更

* **tls**：在 [#840](https://github.com/nodejs/node/pull/840) 中 TLSWrap 变更里引入的一个拼写错误只在 Windows 上表现为 bug，由于 Windows 构建脚本和 Windows CI 配置存在问题，未被 io.js CI 系统发现，见下方“已知问题”。已在 [#994](https://github.com/nodejs/node/pull/994) 和 [#1004](https://github.com/nodejs/node/pull/1004) 中修复。（Fedor Indutny）
* **npm**：将 npm 升级到 2.6.1。详情见 [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v260-2015-02-12)。摘要：
  * [`8b98f0e`](https://github.com/npm/npm/commit/8b98f0e709d77a8616c944aebd48ab726f726f76)
    [#4471](https://github.com/npm/npm/issues/4471) `npm outdated`（且仅 `npm outdated`）现在默认使用 `--depth=0`。这也带来了一个很好但意料之外的效果：使 `npm update -g` 以几乎所有人期望的方式工作。关于这些略微令人困惑的细节，请参见 [`--depth` 文档](https://github.com/npm/npm/blob/82f484672adb1a3caf526a8a48832789495bb43d/doc/misc/npm-config.md#depth)。
    （[@smikes](https://github.com/smikes))
  * [`aa79194`](https://github.com/npm/npm/commit/aa791942a9f3c8af6a650edec72a675deb7a7c6e)
    [#6565](https://github.com/npm/npm/issues/6565) 调整 `peerDependency` 弃用警告，加入需要更改的是哪个包上的哪个 peer dependency。（[@othiym23](https://github.com/othiym23))
  * [`5fa067f`](https://github.com/npm/npm/commit/5fa067fd47682ac3cdb12a2b009d8ca59b05f992)
    [#7171](https://github.com/npm/npm/issues/7171) 调整 `engineStrict` 弃用警告，加入是哪个 `package.json` 在使用它。
    （[@othiym23](https://github.com/othiym23))
* 新增协作者：
  * Robert Kowalski ([@robertkowalski](https://github.com/robertkowalski))
  * Christian Vaagland Tellnes ([@tellnes](https://github.com/tellnes))
  * Brian White ([@mscdex](https://github.com/mscdex))

### 已知问题

* Windows 支持仍有一些未解决的失败，由于人为、程序和 Jenkins 错误等多种因素，这些问题未被 io.js CI 系统正确捕获。详情与讨论见 [#1005](https://github.com/nodejs/node/issues/1005)。预计这些问题会尽快得到处理。
* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()`，如果断言失败，可能会导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`25da0742ee`](https://github.com/nodejs/node/commit/25da0742ee)] - **build**：改进 vcbuild.bat（Bert Belder） [#998](https://github.com/nodejs/node/pull/998)
* \[[`b8310cbd3e`](https://github.com/nodejs/node/commit/b8310cbd3e)] - **build**：将 tarball 大小减少 8-10%（Johan Bergström） [#961](https://github.com/nodejs/node/pull/961)
* \[[`58a612ea9d`](https://github.com/nodejs/node/commit/58a612ea9d)] - **deps**：使 node-gyp 可与 io.js 协同工作（cjihrig） [#990](https://github.com/nodejs/node/pull/990)
* \[[`2a2fe5c4f2`](https://github.com/nodejs/node/commit/2a2fe5c4f2)] - **deps**：将 npm 升级到 2.6.1（Forrest L Norvell） [#990](https://github.com/nodejs/node/pull/990)
* \[[`84ee2722a3`](https://github.com/nodejs/node/commit/84ee2722a3)] - **doc**：轻微的格式修复。（Tim Oxley） [#996](https://github.com/nodejs/node/pull/996)
* \[[`cf0306cd71`](https://github.com/nodejs/node/commit/cf0306cd71)] - **doc**：更新稳定性索引（Chris Dickinson） [#943](https://github.com/nodejs/node/pull/943)
* \[[`fb2439a699`](https://github.com/nodejs/node/commit/fb2439a699)] - **doc**：添加 robertkowalski 作为协作者（Robert Kowalski） [#977](https://github.com/nodejs/node/pull/977)
* \[[`f83d380647`](https://github.com/nodejs/node/commit/f83d380647)] - **doc**：更新 os.markdown（Benjamin Gruenbaum） [#976](https://github.com/nodejs/node/pull/976)
* \[[`ae7a23351f`](https://github.com/nodejs/node/commit/ae7a23351f)] - **doc**：添加 roadmap、i18n、tracing、evangelism 工作组（Mikeal Rogers） [#911](https://github.com/nodejs/node/pull/911)
* \[[`14174a95a5`](https://github.com/nodejs/node/commit/14174a95a5)] - **doc**：记录 roadmap、工作组（Mikeal Rogers）
* \[[`865ee313cf`](https://github.com/nodejs/node/commit/865ee313cf)] - **doc**：添加 tellnes 作为协作者（Christian Tellnes） [#973](https://github.com/nodejs/node/pull/973)
* \[[`01296923db`](https://github.com/nodejs/node/commit/01296923db)] - **doc**：添加 mscdex 作为协作者（Brian White） [#972](https://github.com/nodejs/node/pull/972)
* \[[`675cffb33e`](https://github.com/nodejs/node/commit/675cffb33e)] - **http**：不要把自动头部与其他头部混淆（Christian Tellnes） [#828](https://github.com/nodejs/node/pull/828)
* \[[`7887e119ed`](https://github.com/nodejs/node/commit/7887e119ed)] - **install**：新的性能计数器提供程序 GUID（Russell Dempsey）
* \[[`4d1fa2ca97`](https://github.com/nodejs/node/commit/4d1fa2ca97)] - **src**：添加对已定义宏 NOMINMAX 的检查（Pavel Medvedev） [#986](https://github.com/nodejs/node/pull/986)
* \[[`1ab7e80838`](https://github.com/nodejs/node/commit/1ab7e80838)] - **tls**：将 `handle.reading` 代理回父 handle（Fedor Indutny） [#1004](https://github.com/nodejs/node/pull/1004)
* \[[`755461219d`](https://github.com/nodejs/node/commit/755461219d)] - **tls**：修复拼写错误 `handle._reading` => `handle.reading`（Fedor Indutny） [#994](https://github.com/nodejs/node/pull/994)

<a id="1.4.1"></a>

## 2015-02-26，版本 1.4.1，@rvagg

_注意：版本 **1.4.0** 已经打标签并构建，但未发布。过程中发现了一个 libuv bug，因此发布被取消。该标签紧接在 [`a558cd0a61`](https://github.com/nodejs/node/commit/a558cd0a61) 之后，但后来已被移除。为了避免混淆，我们跳过到 1.4.1。_

### 重要变更

* **process** / **promises**：当 `Promise` 被拒绝且在事件循环的一轮内没有为该 `Promise` 绑定错误处理器时，现在会在 `process` 上发出 `'unhandledRejection'` 事件。当一个 `Promise` 被拒绝且为其绑定错误处理器的时间晚于事件循环一轮之后时，现在会发出 `'rejectionHandled'` 事件。更多细节请参见 [process](https://iojs.org/api/process.html) 文档。 [#758](https://github.com/nodejs/node/pull/758)（Petka Antonov）
* **streams**：现在可以将常规流作为 `tls.connect()` 的底层 socket 使用 [#926](https://github.com/nodejs/node/pull/926)（Fedor Indutny）
* **http**：当客户端中止 `http.ClientRequest` 时，会发出新的 `'abort'` 事件。 [#945](https://github.com/nodejs/node/pull/945)（Evan Lucas）
* **V8**：将 V8 升级到 4.1.0.21。包含一个受限制披露的修复，详情在解除限制后可见于 <https://code.google.com/p/chromium/issues/detail?id=430201>。此次升级中暂缓了一个破坏 ABI 的变更，可能会在 io.js 合并 V8 4.2 时一并包含。讨论见 [#952](https://github.com/nodejs/node/pull/952)。
* **npm**：将 npm 升级到 2.6.0。包含支持新 registry 和为 `npm@3` 做准备的特性。详情见 [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v260-2015-02-12)。摘要：
  * [`38c4825`](https://github.com/npm/npm/commit/38c48254d3d217b4babf5027cb39492be4052fc2) [#5068](https://github.com/npm/npm/issues/5068) 新增 logout 命令，并使其在基于 bearer 和基于 basic 的已认证客户端上都能发挥实际作用。([@othiym23](https://github.com/othiym23))
  * [`c8e08e6`](https://github.com/npm/npm/commit/c8e08e6d91f4016c80f572aac5a2080df0f78098) [#6565](https://github.com/npm/npm/issues/6565) 提示 `peerDependency` 行为正在变化，并在文档中添加说明。([@othiym23](https://github.com/othiym23))
  * [`7c81a5f`](https://github.com/npm/npm/commit/7c81a5f5f058941f635a92f22641ea68e79b60db) [#7171](https://github.com/npm/npm/issues/7171) 提示 `package.json` 中的 `engineStrict` 将在 npm 下一个主版本中被移除（很快就会到来！）。([@othiym23](https://github.com/othiym23))
* **libuv**：升级到 1.4.2。详情见 [libuv ChangeLog](https://github.com/libuv/libuv/blob/v1.x/ChangeLog)。

### 已知问题

* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所示那样是同步的，这是 1.0.2 中引入的回归问题，参见 [#760](https://github.com/nodejs/node/issues/760) 以及在 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()`，如果断言失败，可能会导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`8a1e22af3a`](https://github.com/nodejs/node/commit/8a1e22af3a)] - **benchmark**：将 execArgv 传递给基准测试进程（Petka Antonov） [#928](https://github.com/nodejs/node/pull/928)
* \[[`234e6916b8`](https://github.com/nodejs/node/commit/234e6916b8)] - **build**：修复错误引用（Johan Bergström） [#924](https://github.com/nodejs/node/pull/924)
* \[[`e00c938d24`](https://github.com/nodejs/node/commit/e00c938d24)] - **build**：使 test-ci 将 TAP 输出到 stdout 和日志（Rod Vagg） [#938](https://github.com/nodejs/node/pull/938)
* \[[`b2a0d8f65e`](https://github.com/nodejs/node/commit/b2a0d8f65e)] - **deps**：将 libuv 更新到 1.4.2（Ben Noordhuis） [#966](https://github.com/nodejs/node/pull/966)
* \[[`a558cd0a61`](https://github.com/nodejs/node/commit/a558cd0a61)] - **deps**：回滚 v8 abi 变更（Ben Noordhuis） [#952](https://github.com/nodejs/node/pull/952)
* \[[`54532a9761`](https://github.com/nodejs/node/commit/54532a9761)] - **deps**：修复 v8 中的 postmortem 支持（Fedor Indutny） [#706](https://github.com/nodejs/node/pull/706)
* \[[`78f4837926`](https://github.com/nodejs/node/commit/78f4837926)] - **deps**：将 v8 升级到 4.1.0.21（Ben Noordhuis） [#952](https://github.com/nodejs/node/pull/952)
* \[[`739fda16a9`](https://github.com/nodejs/node/commit/739fda16a9)] - **deps**：将 libuv 更新到 1.4.1（Ben Noordhuis） [#940](https://github.com/nodejs/node/pull/940)
* \[[`da730c76e9`](https://github.com/nodejs/node/commit/da730c76e9)] - **deps**：启用 node-gyp iojs.lib 下载校验和（Ben Noordhuis） [#918](https://github.com/nodejs/node/pull/918)
* \[[`97b424365a`](https://github.com/nodejs/node/commit/97b424365a)] - **deps**：让 node-gyp 在 Windows 上再次工作（Bert Belder）
* \[[`19e3d5e10a`](https://github.com/nodejs/node/commit/19e3d5e10a)] - **deps**：使 node-gyp 从 iojs.org 获取 tarball（Ben Noordhuis） [#343](https://github.com/nodejs/node/pull/343)
* \[[`1e2fa1537f`](https://github.com/nodejs/node/commit/1e2fa1537f)] - **deps**：将 npm 升级到 2.6.0（Forrest L Norvell） [#904](https://github.com/nodejs/node/pull/904)
* \[[`2e2cf81476`](https://github.com/nodejs/node/commit/2e2cf81476)] - **doc**：修复 process.stdout 对 console.log 的引用（Brendan Ashworth） [#964](https://github.com/nodejs/node/pull/964)
* \[[`2e63bad7eb`](https://github.com/nodejs/node/commit/2e63bad7eb)] - **doc**：修复提交列表中 SHA 的链接与格式（Tim Oxley） [#967](https://github.com/nodejs/node/pull/967)
* \[[`c5050d8e4d`](https://github.com/nodejs/node/commit/c5050d8e4d)] - **doc**：修复 tls.createServer 的 'dhparam' 描述（silverwind） [#968](https://github.com/nodejs/node/pull/968)
* \[[`06ee782f24`](https://github.com/nodejs/node/commit/06ee782f24)] - **doc**：记录 'unhandledRejection' 和 'rejectionHandled'（Benjamin Gruenbaum） [#946](https://github.com/nodejs/node/pull/946)
* \[[`b65dade102`](https://github.com/nodejs/node/commit/b65dade102)] - **doc**：为 io.js 更新 documentation.markdown。（Ryan Scheel） [#950](https://github.com/nodejs/node/pull/950)
* \[[`87e4bfd582`](https://github.com/nodejs/node/commit/87e4bfd582)] - **doc**：将 cluster worker.send() 链接到 child.send()（Sam Roberts） [#839](https://github.com/nodejs/node/pull/839)
* \[[`cb22bc9b8a`](https://github.com/nodejs/node/commit/cb22bc9b8a)] - **doc**：修复页脚尺寸（Jeremiah Senkpiel） [#860](https://github.com/nodejs/node/pull/860)
* \[[`3ab9b92e90`](https://github.com/nodejs/node/commit/3ab9b92e90)] - **doc**：修复 stream `_writev` 头部大小（René Kooi） [#916](https://github.com/nodejs/node/pull/916)
* \[[`4fcbb8aaaf`](https://github.com/nodejs/node/commit/4fcbb8aaaf)] - **doc**：API 文档页面使用 HTTPS URL（Shinnosuke Watanabe） [#913](https://github.com/nodejs/node/pull/913)
* \[[`329f364ea2`](https://github.com/nodejs/node/commit/329f364ea2)] - **doc**：修复 CHANGELOG 中的 PR 引用（Brian White） [#903](https://github.com/nodejs/node/pull/903)
* \[[`0ac57317aa`](https://github.com/nodejs/node/commit/0ac57317aa)] - **doc**：修复拼写错误，重述 CHANGELOG 中的 cipher 变更（Rod Vagg） [#902](https://github.com/nodejs/node/pull/902)
* \[[`1f40b2a636`](https://github.com/nodejs/node/commit/1f40b2a636)] - **fs**：为 makeCallback() 添加类型检查（cjihrig） [#866](https://github.com/nodejs/node/pull/866)
* \[[`c82e580a50`](https://github.com/nodejs/node/commit/c82e580a50)] - **fs**：正确处理传递给 truncate() 的 fd（Bruno Jouhier） [joyent/node#9161](https://github.com/joyent/node/pull/9161)
* \[[`2ca22aacbd`](https://github.com/nodejs/node/commit/2ca22aacbd)] - **(SEMVER-MINOR) http**：从 ClientRequest 发出 abort 事件（Evan Lucas） [#945](https://github.com/nodejs/node/pull/945)
* \[[`d8eb974a98`](https://github.com/nodejs/node/commit/d8eb974a98)] - **net**：使 Server.prototype.unref() 持久化（cjihrig） [#897](https://github.com/nodejs/node/pull/897)
* \[[`872702d9b7`](https://github.com/nodejs/node/commit/872702d9b7)] - **(SEMVER-MINOR) node**：实现未处理拒绝跟踪（Petka Antonov） [#758](https://github.com/nodejs/node/pull/758)
* \[[`b41dbc2737`](https://github.com/nodejs/node/commit/b41dbc2737)] - **readline**：使用原生 `codePointAt`（Vladimir Kurchatkin） [#825](https://github.com/nodejs/node/pull/825)
* \[[`26ebe9805e`](https://github.com/nodejs/node/commit/26ebe9805e)] - **smalloc**：扩展用户 API（Trevor Norris） [#905](https://github.com/nodejs/node/pull/905)
* \[[`e435a0114d`](https://github.com/nodejs/node/commit/e435a0114d)] - **src**：修复 resolveTxt 中偶发的 SIGSEGV（Evan Lucas） [#960](https://github.com/nodejs/node/pull/960)
* \[[`0af4c9ea74`](https://github.com/nodejs/node/commit/0af4c9ea74)] - **src**：修复 domains + --abort-on-uncaught-exception（Chris Dickinson） [#922](https://github.com/nodejs/node/pull/922)
* \[[`89e133a1d8`](https://github.com/nodejs/node/commit/89e133a1d8)] - **stream_base**：移除静态 JSMethod 声明（Fedor Indutny） [#957](https://github.com/nodejs/node/pull/957)
* \[[`b9686233fc`](https://github.com/nodejs/node/commit/b9686233fc)] - **stream_base**：引入 StreamBase（Fedor Indutny） [#840](https://github.com/nodejs/node/pull/840)
* \[[`1738c77835`](https://github.com/nodejs/node/commit/1738c77835)] - **(SEMVER-MINOR) streams**：引入 StreamWrap 和 JSStream（Fedor Indutny） [#926](https://github.com/nodejs/node/pull/926)
* \[[`506c7fd40b`](https://github.com/nodejs/node/commit/506c7fd40b)] - **test**：修复 stdio 测试中的无限 spawn 循环（Ben Noordhuis） [#948](https://github.com/nodejs/node/pull/948)
* \[[`a7bdce249c`](https://github.com/nodejs/node/commit/a7bdce249c)] - **test**：支持将测试输出写入文件（Johan Bergström） [#934](https://github.com/nodejs/node/pull/934)
* \[[`0df54303c1`](https://github.com/nodejs/node/commit/0df54303c1)] - **test**：common.js -> common（Brendan Ashworth） [#917](https://github.com/nodejs/node/pull/917)
* \[[`ed3b057e9f`](https://github.com/nodejs/node/commit/ed3b057e9f)] - **util**：在 format() 中正确处理 symbol（cjihrig） [#931](https://github.com/nodejs/node/pull/931)

<a id="1.3.0"></a>

## 2015-02-20，版本 1.3.0，@rvagg

### 显著变更

* **url**: `url.resolve('/path/to/file', '.')` 现在返回带有尾随斜杠的 `/path/to/`，`url.resolve('/', '.')` 返回 `/`。[#278](https://github.com/nodejs/node/issues/278)（Amir Saboury）
* **tls**: `tls` 和 `https` 使用的默认密码套件已更改为一种能在所有现代浏览器中实现完美前向保密（Perfect Forward Secrecy）的套件。此外，已排除不安全的 RC4 密码。如果你绝对需要 RC4，请指定你自己的密码套件。[#826](https://github.com/nodejs/node/issues/826)（Roman Reiss）

### 已知问题

* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所说的那样是同步的，这是 1.0.2 中引入的回归问题，见 [#760](https://github.com/nodejs/node/issues/760) 和 [#774](https://github.com/nodejs/node/issues/774) 中的修复
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃 [#894](https://github.com/nodejs/node/issues/894)

### 提交

* \[[`35ed79932c`](https://github.com/nodejs/node/commit/35ed79932c)] - **benchmark**: 添加一些 querystring 基准测试（Brian White） [#846](https://github.com/nodejs/node/pull/846)
* \[[`c6fd2c5e95`](https://github.com/nodejs/node/commit/c6fd2c5e95)] - **buffer**: 修复池偏移调整（Trevor Norris）
* \[[`36a779560a`](https://github.com/nodejs/node/commit/36a779560a)] - **buffer**: 在 binding 上暴露内部实现（Vladimir Kurchatkin） [#770](https://github.com/nodejs/node/pull/770)
* \[[`e63b51793b`](https://github.com/nodejs/node/commit/e63b51793b)] - **crypto**: 修复对共享库检查 ext 方法的问题（Shigeki Ohtsu） [#800](https://github.com/nodejs/node/pull/800)
* \[[`afdef70fcc`](https://github.com/nodejs/node/commit/afdef70fcc)] - **doc**: 更新 AUTHORS 列表（Rod Vagg） [#900](https://github.com/nodejs/node/pull/900)
* \[[`1bf91878e7`](https://github.com/nodejs/node/commit/1bf91878e7)] - **doc**: 添加 2015-02-04 TC 会议纪要（Rod Vagg） [#876](https://github.com/nodejs/node/pull/876)
* \[[`9e05c8d2fc`](https://github.com/nodejs/node/commit/9e05c8d2fc)] - **doc**: 删除关于共识的过时表述（Emily Rose）
* \[[`ed240f44f7`](https://github.com/nodejs/node/commit/ed240f44f7)] - **doc**: 记录 tls.connect 的 'ciphers' 选项（Roman Reiss） [#845](https://github.com/nodejs/node/pull/845)
* \[[`0555b3c785`](https://github.com/nodejs/node/commit/0555b3c785)] - **doc**: 修复拼写错误 miliseconds -> milliseconds（jigsaw） [#865](https://github.com/nodejs/node/pull/865)
* \[[`fc6507dd4e`](https://github.com/nodejs/node/commit/fc6507dd4e)] - **doc**: 在 README 中添加逗号以提高清晰度（Jimmy Hsu）
* \[[`f0296933f8`](https://github.com/nodejs/node/commit/f0296933f8)] - **doc**: 在 process 中将 `it's` 更正为 `its`（Charmander） [#837](https://github.com/nodejs/node/pull/837)
* \[[`e81731ad18`](https://github.com/nodejs/node/commit/e81731ad18)] - **doc**: 添加 geek 为协作者（Wyatt Preul） [#835](https://github.com/nodejs/node/pull/835)
* \[[`4ca7cca84a`](https://github.com/nodejs/node/commit/4ca7cca84a)] - **doc**: 修复 smalloc 中的语法问题（Debjeet Biswas） [joyent/node#9164](https://github.com/joyent/node/pull/9164)
* \[[`30dca66958`](https://github.com/nodejs/node/commit/30dca66958)] - **doc**: 修复代码语法（Dan Dascalescu） [joyent/node#9198](https://github.com/joyent/node/pull/9198)
* \[[`8c1df7a8a8`](https://github.com/nodejs/node/commit/8c1df7a8a8)] - **doc**: 为 assert() 使用正确的签名（Andrei Sedoi） [joyent/node#9003](https://github.com/joyent/node/pull/9003)
* \[[`ba40942ad2`](https://github.com/nodejs/node/commit/ba40942ad2)] - **doc**: 修复 timers.markdown 中的句子语法（Omer Wazir） [#815](https://github.com/nodejs/node/pull/815)
* \[[`789ff959be`](https://github.com/nodejs/node/commit/789ff959be)] - **doc**: 提高 mark 类的对比度（Omer Wazir） [#824](https://github.com/nodejs/node/pull/824)
* \[[`122a1758d1`](https://github.com/nodejs/node/commit/122a1758d1)] - **doc**: 为 firefox 提供更好的字体平滑（Jeremiah Senkpiel） [#820](https://github.com/nodejs/node/pull/820)
* \[[`982b143ab3`](https://github.com/nodejs/node/commit/982b143ab3)] - **doc**: 禁用字体连字（Roman Reiss） [#816](https://github.com/nodejs/node/pull/816)
* \[[`cb5560bd62`](https://github.com/nodejs/node/commit/cb5560bd62)] - **doc**: 正确关闭代码片段（Omer Wazir） [#814](https://github.com/nodejs/node/pull/814)
* \[[`c3c2fbdf83`](https://github.com/nodejs/node/commit/c3c2fbdf83)] - **doc**: 将 errors.md 中的 effect 改为 affect（Ryan Seys） [#799](https://github.com/nodejs/node/pull/799)
* \[[`b620129715`](https://github.com/nodejs/node/commit/b620129715)] - **doc**: 添加 sam-github 为协作者（Sam Roberts） [#791](https://github.com/nodejs/node/pull/791)
* \[[`e80f803298`](https://github.com/nodejs/node/commit/e80f803298)] - **doc**: 从贡献指南中移除 Caine 部分（Michaël Zasso） [#804](https://github.com/nodejs/node/pull/804)
* \[[`400d6e56f9`](https://github.com/nodejs/node/commit/400d6e56f9)] - **doc**: 修复 libuv 链接（Yosuke Furukawa） [#803](https://github.com/nodejs/node/pull/803)
* \[[`15d156e3ec`](https://github.com/nodejs/node/commit/15d156e3ec)] - **doc**: 修复 fs.appendFile 中的措辞（Rudolf Meijering） [#801](https://github.com/nodejs/node/pull/801)
* \[[`dbf75924f1`](https://github.com/nodejs/node/commit/dbf75924f1)] - **doc**: 更新错误链接（Chris Dickinson） [#793](https://github.com/nodejs/node/pull/793)
* \[[`7061669dba`](https://github.com/nodejs/node/commit/7061669dba)] - **events**: 优化监听器的添加和移除（Brian White） [#785](https://github.com/nodejs/node/pull/785)
* \[[`630f636334`](https://github.com/nodejs/node/commit/630f636334)] - **events**: 也将慢路径移到单独的函数中（Brian White） [#785](https://github.com/nodejs/node/pull/785)
* \[[`ecef87177a`](https://github.com/nodejs/node/commit/ecef87177a)] - **fs**: 确保 nullCheck() 回调是一个函数（cjihrig） [#887](https://github.com/nodejs/node/pull/887)
* \[[`6a2b204bbc`](https://github.com/nodejs/node/commit/6a2b204bbc)] - **module**: 替换 NativeModule.require（Herbert Vojčík） [joyent/node#9201](https://github.com/joyent/node/pull/9201)
* \[[`9b6b05556f`](https://github.com/nodejs/node/commit/9b6b05556f)] - **net**: 在父套接字中取消定时器引用（Fedor Indutny） [#891](https://github.com/nodejs/node/pull/891)
* \[[`cca8de6709`](https://github.com/nodejs/node/commit/cca8de6709)] - **net**: 移除 Server 构造函数中 arguments 的使用（cjihrig）
* \[[`0cff0521c3`](https://github.com/nodejs/node/commit/0cff0521c3)] - **net**: 对无效的 socket 超时抛出异常（cjihrig） [joyent/node#8884](https://github.com/joyent/node/pull/8884)
* \[[`b5f25a963c`](https://github.com/nodejs/node/commit/b5f25a963c)] - **src**: 确保文件描述符 0-2 有效（Ben Noordhuis） [#875](https://github.com/nodejs/node/pull/875)
* \[[`a956791f69`](https://github.com/nodejs/node/commit/a956791f69)] - **src**: 修复错误消息中的拼写错误（Ben Noordhuis） [#875](https://github.com/nodejs/node/pull/875)
* \[[`fb28c91074`](https://github.com/nodejs/node/commit/fb28c91074)] - **src**: 修复 add-on 构建，部分回退 8aed9d66（Ben Noordhuis） [#868](https://github.com/nodejs/node/pull/868)
* \[[`4bb3184d8d`](https://github.com/nodejs/node/commit/4bb3184d8d)] - **src**: 减少 AsyncWrap 的内存占用（Ben Noordhuis） [#667](https://github.com/nodejs/node/pull/667)
* \[[`7e779b4593`](https://github.com/nodejs/node/commit/7e779b4593)] - **src**: 移除已废弃的 queue.h 头文件（Ben Noordhuis） [#667](https://github.com/nodejs/node/pull/667)
* \[[`38dc0cd8f4`](https://github.com/nodejs/node/commit/38dc0cd8f4)] - **src**: 从 QUEUE 切换到 intrusive list（Ben Noordhuis） [#667](https://github.com/nodejs/node/pull/667)
* \[[`58eb00c693`](https://github.com/nodejs/node/commit/58eb00c693)] - **src**: 添加类型安全的 intrusive list（Ben Noordhuis） [#667](https://github.com/nodejs/node/pull/667)
* \[[`8aed9d6610`](https://github.com/nodejs/node/commit/8aed9d6610)] - **src**: 清理 `Isolate::GetCurrent()`（Vladimir Kurchatkin） [#807](https://github.com/nodejs/node/pull/807)
* \[[`7c22372303`](https://github.com/nodejs/node/commit/7c22372303)] - **src**: 移除尾随空白（Vladimir Kurchatkin） [#798](https://github.com/nodejs/node/pull/798)
* \[[`20f8e7f17a`](https://github.com/nodejs/node/commit/20f8e7f17a)] - **test**: 移除易失败的测试功能（Rod Vagg） [#812](https://github.com/nodejs/node/pull/812)
* \[[`30e340ad9d`](https://github.com/nodejs/node/commit/30e340ad9d)] - **test**: 修复 parallel/test-tls-getcipher（Roman Reiss） [#853](https://github.com/nodejs/node/pull/853)
* \[[`d53b636d94`](https://github.com/nodejs/node/commit/d53b636d94)] - **test**: 验证 spawn{Sync} 错误中的字段（cjihrig） [#838](https://github.com/nodejs/node/pull/838)
* \[[`3b1b4de903`](https://github.com/nodejs/node/commit/3b1b4de903)] - **test**: Timeout#unref() 不返回实例（Jan Schär） [joyent/node#9171](https://github.com/joyent/node/pull/9171)
* \[[`becb4e980e`](https://github.com/nodejs/node/commit/becb4e980e)] - **test**: 将 crypto 测试分散到单独的文件中（Brendan Ashworth） [#827](https://github.com/nodejs/node/pull/827)
* \[[`77f35861d0`](https://github.com/nodejs/node/commit/77f35861d0)] - **(SEMVER-MINOR) tls**: 更安全的默认设置（Roman Reiss） [#826](https://github.com/nodejs/node/pull/826)
* \[[`faa687b4be`](https://github.com/nodejs/node/commit/faa687b4be)] - **url**: 使用 . 和 .. 解析 URL（Amir Saboury） [#278](https://github.com/nodejs/node/pull/278)

<a id="1.2.0"></a>

## 2015-02-10，版本 1.2.0，@rvagg

### 显著变更

* **stream**:
  * 更简单的流构建，详情见 [readable-stream/issues#102](https://github.com/nodejs/readable-stream/issues/102)。这将 streams 基础对象扩展为使其构造函数可以接受默认实现方法，从而减少实现自定义流所需的样板代码。与 core 中这一变更相匹配的新版 readable-stream 最终会发布。(@sonewman)
* **dns**:
  * `lookup()` 现在支持 `'all'` 布尔选项，默认为 `false`，但启用后将使该方法返回某个地址解析出的 _所有_ 名称数组，见 [#744](https://github.com/nodejs/node/pull/744) (@silverwind)
* **assert**:
  * 在 `deepEqual()` 中移除 `prototype` 属性比较，被视为修复 bug，见 [#636](https://github.com/nodejs/node/pull/636) (@vkurchatkin)
  * 引入 `deepStrictEqual()` 方法，它与 `deepEqual()` 类似，但会对原始值执行严格相等检查，见 [#639](https://github.com/nodejs/node/pull/639) (@vkurchatkin)
* **tracing**:
  * 在使用 `--with-lttng` 选项编译时添加 [LTTng](http://lttng.org/)（Linux Trace Toolkit Next Generation）。埋点与 DTrace 和 ETW 可用的埋点一致。 [#702](https://github.com/nodejs/node/pull/702) (@thekemkid)
* **docs**:
  * 大量文档更新，见各个单独提交
  * 新增 **Errors** 页面，讨论 JavaScript 错误、V8 细节以及 io.js 特定的错误详情。(@chrisdickinson)
* **npm** 升级到 2.5.1，简短更新日志：
  * [npm/0e8d473](https://github.com/npm/npm/commit/0e8d4736a1cbdda41ae8eba8a02c7ff7ce80c2ff) [#7281](https://github.com/npm/npm/issues/7281) `npm-registry-mock@1.0.0`: 清理 API，设置 `connection: close`，使测试在 io.js 1.1.x 上通过。
    ([@robertkowalski](https://github.com/robertkowalski))
  * [npm/f9313a0](https://github.com/npm/npm/commit/f9313a066c9889a0ee898d8a35676e40b8101e7f)
    [#7226](https://github.com/npm/npm/issues/7226) 确保所有请求设置都被复制到 agent 上。
    ([@othiym23](https://github.com/othiym23))
  * [npm/fec4c96](https://github.com/npm/npm/commit/fec4c967ee235030bf31393e8605e9e2811f4a39)
    允许 `--no-proxy` 覆盖环境中的 `HTTP_PROXY` 设置。
    ([@othiym23](https://github.com/othiym23))
  * [npm/9d61e96](https://github.com/npm/npm/commit/9d61e96fb1f48687a85c211e4e0cd44c7f95a38e)
    `npm outdated --long` 现在包含一列用于显示依赖类型。
    ([@watilde](https://github.com/watilde))
* **libuv** 升级到 1.4.0，见 [libuv ChangeLog](https://github.com/libuv/libuv/blob/v1.x/ChangeLog)
* 新增协作者：
  * Aleksey Smolenchuk (@lxe)
  * Shigeki Ohtsu (@shigeki)

### 已知问题

* REPL 中的代理对可能会冻结终端 [#690](https://github.com/nodejs/node/issues/690)
* 无法将 io.js 构建为静态库 [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` 并不像文档所说的那样是同步的，这是 1.0.2 中引入的回归问题，见 [#760](https://github.com/nodejs/node/issues/760) 和 [#774](https://github.com/nodejs/node/issues/774) 中的修复，该修复应会出现在下一个补丁版本中。

### 提交

* \[[`7e2235a`](https://github.com/nodejs/node/commit/7e2235aebb067b84974e001f9fa4d83f45b7c9dd)] - doc: 添加错误文档（Chris Dickinson）
* \[[`d832be4`](https://github.com/nodejs/node/commit/d832be4aa3c68c29017339a65593f62cb73179bc)] - doc: 更新 AUTHORS 列表（Rod Vagg）
* \[[`aea9b89`](https://github.com/nodejs/node/commit/aea9b89b5c2e3fb9fdbd96c7483eb1f60d09a39e)] - doc: 添加 shigeki 为协作者（Shigeki Ohtsu）
* \[[`e653080`](https://github.com/nodejs/node/commit/e65308053c871352be948b9001737df01aad1965)] - fs: 改进 `readFile` 性能（Vladimir Kurchatkin）
* \[[`9681fca`](https://github.com/nodejs/node/commit/9681fcacf0fd477f999a52f6ff4151d4125d49d0)] - deps: 将 libuv 更新到 1.4.0（Saúl Ibarra Corretgé）
* \[[`5e825d1`](https://github.com/nodejs/node/commit/5e825d1073b57a87fc9a77751ed3e21c86970082)] - tracing: 为 linux 上的 tracing 添加 lttng 支持（Glen Keane）
* \[[`b677b84`](https://github.com/nodejs/node/commit/b677b844fc1de328a0f2b0151bdfc045cb5d0c81)] - events: 优化各种函数（Brian White）
* \[[`c86e383`](https://github.com/nodejs/node/commit/c86e383c41f35b17ba79cc1c6dbfff674214177d)] - test: 修复与共享 openssl 相关的测试失败（Shigeki Ohtsu）
* \[[`1151016`](https://github.com/nodejs/node/commit/1151016d0a13dcb5973f602d0717c2da6abca551)] - doc: 修复 crypto 中的拼写错误（Haoliang Gao）
* \[[`7c56868`](https://github.com/nodejs/node/commit/7c568684b834a6a3c4d15bb29d2f95cf76773cb8)] - doc: 更改 crypto.publicDecrypt 的顺序（Haoliang Gao）
* \[[`3f473ef`](https://github.com/nodejs/node/commit/3f473ef141fdc7059928ebc4542b00e2f126ab07)] - assert: 引入 `deepStrictEqual`（Vladimir Kurchatkin）
* \[[`828d19a`](https://github.com/nodejs/node/commit/828d19a1f696840acf43b70125b85b0d61ff5056)] - doc: 修复 dns.lookup 选项示例（Roman Reiss）
* \[[`90d2b35`](https://github.com/nodejs/node/commit/90d2b352810bc352620e61e0dacc8573faf11dfb)] - doc: 更新过时的 process.versions 输出（Ben Noordhuis）
* \[[`789bbb9`](https://github.com/nodejs/node/commit/789bbb91d3eb30fa2a51e9b064592d6a461a6fe5)] - doc: 更新 API 文档中的 node.js 引用（Ben Noordhuis）
* \[[`c22e5ac`](https://github.com/nodejs/node/commit/c22e5ace846f93b4531a39b0e055f89a46598f63)] - https: 更简单的参数检查（Michaël Zasso）
* \[[`b9d3928`](https://github.com/nodejs/node/commit/b9d3928f80992a812795a974cbae02288fc5049c)] - util: 简化 `isPrimitive`（Vladimir Kurchatkin）
* \[[`2c3121c`](https://github.com/nodejs/node/commit/2c3121c606967f8595d671601493e623a7157385)] - benchmark: 增加 eventemitter 的迭代次数（Ben Noordhuis）
* \[[`633a990`](https://github.com/nodejs/node/commit/633a9908487efadda6a86026a36d5325a28805c6)] - dns: 允许 dns.lookup() 返回所有地址（Roman Reiss）
* \[[`1cd1d7a`](https://github.com/nodejs/node/commit/1cd1d7a182c2d16c28c778ddcd72bbeac6bc5c75)] - buffer: 不比较相同的 buffers（Vladimir Kurchatkin）
* \[[`847b9d2`](https://github.com/nodejs/node/commit/847b9d212a404e5906ea9f366c458332c0318c53)] - benchmark: 添加更多 EventEmitter 基准测试（Brian White）
* \[[`96597bc`](https://github.com/nodejs/node/commit/96597bc5927c57737c3bea943dd163d69ac76a96)] - doc: 添加 lxe 为协作者（Aleksey Smolenchuk）
* \[[`7a301e2`](https://github.com/nodejs/node/commit/7a301e29de1e4ab5f39165beb6d0b41435c221dd)] - deps: 让 node-gyp 在 windows 上再次可用（Bert Belder）
* \[[`b188a34`](https://github.com/nodejs/node/commit/b188a3459d9d8a6d0c5fd391f1aefba281407083)] - deps: 让 node-gyp 从 iojs.org 获取 tarball（Ben Noordhuis）
* \[[`af1bf49`](https://github.com/nodejs/node/commit/af1bf49852b7a8bcc9b9b6dd718edea0b18e3cb6)] - deps: 将 npm 升级到 2.5.1（Forrest L Norvell）
* \[[`9dc9ec3`](https://github.com/nodejs/node/commit/9dc9ec3ce6ba6f3dd4020e00f5863e207fa08a75)] - lib: 让 debug 客户端连接到 127.0.0.1（Ben Noordhuis）
* \[[`e7573f9`](https://github.com/nodejs/node/commit/e7573f9111f6b85c599ec225714d76e08ec8a4dc)] - assert: 不比较对象的 `prototype` 属性（Vladimir Kurchatkin）
* \[[`8d11799`](https://github.com/nodejs/node/commit/8d1179952aefaa0086ff5540671cfd6ff612594b)] - asyncwrap: 修复 nullptr 父级检查（Trevor Norris）
* \[[`62512bb`](https://github.com/nodejs/node/commit/62512bb29cd000dd5ce848258c10f3211f153bd5)] - test: 接受 EPROTONOSUPPORT ipv6 错误（Ben Noordhuis）
* \[[`05f4dff`](https://github.com/nodejs/node/commit/05f4dff97519ada5d3149a16ca9e5a04df948a61)] - asyncwrap: 修复早期返回的构造条件（Trevor Norris）
* \[[`10277d2`](https://github.com/nodejs/node/commit/10277d2e57ee7fe9e0e3f63f10b9ea521e86e7f0)] - docs: 包括对新 crypto 方法的提及（Calvin Metcalf）
* \[[`9a8f186`](https://github.com/nodejs/node/commit/9a8f18613da4956c963377e2ad55cdd3dabc32aa)] - child\_process: 添加调试和错误详情（Zach Bruggeman）
* \[[`6f7a978`](https://github.com/nodejs/node/commit/6f7a9784eaef82a1aa6cf53bbbd7224c446876a0)] - crypto: 在 TLS 方法返回时清除错误（Fedor Indutny）
* \[[`50daee7`](https://github.com/nodejs/node/commit/50daee7243a3f987e1a28d93c43f913471d6885a)] - stream: 更简单的流构建（Sam Newman）
* \[[`e0730ee`](https://github.com/nodejs/node/commit/e0730eeaa5231841a7eba080c8170e41278c3c52)] - benchmark: 允许通过更细粒度的过滤器进行比较（Brian White）
* \[[`96ffcb9`](https://github.com/nodejs/node/commit/96ffcb9a210a2fa1248ae5931290193573512a96)] - src: 降低 CPU profiler 开销（Ben Noordhuis）
* \[[`3e675e4`](https://github.com/nodejs/node/commit/3e675e44b59f1be8e5581de000f3cb17ef747c14)] - benchmark: 不使用模板字符串（Evan Lucas）
* \[[`8ac8b76`](https://github.com/nodejs/node/commit/8ac8b760ac74e5a6938a49e563406716804672cb)] - doc: 简化纯共识寻求（Mikeal Rogers）
* \[[`0a54b6a`](https://github.com/nodejs/node/commit/0a54b6a134a6815e30d1f78f8c8612d4a00399ad)] - doc: 更新 streams wg 宪章（Chris Dickinson）
* \[[`b8ead4a`](https://github.com/nodejs/node/commit/b8ead4a23f8b0717204878235d61cfce3f3fdd30)] - 根据 PR 中的反馈进行调整。（Mikeal Rogers）
* \[[`3af7f30`](https://github.com/nodejs/node/commit/3af7f30a7cceb1e418e5cd26c65a8ec5cc589d09)] - 工作组的初始文档。（Mikeal Rogers）
* \[[`513724e`](https://github.com/nodejs/node/commit/513724efcc42ed150391915050fe60402f8dd48d)] - doc: 为 chrisdickinson 添加 GPG 指纹（Chris Dickinson）
* \[[`4168198`](https://github.com/nodejs/node/commit/41681983921d323da79b6d45e4ae0f8edb541e18)] - doc: 添加 2015-01-28 TC 会议纪要（Rod Vagg）

<a id="1.1.0"></a>

## 2015-02-03，版本 1.1.0，@chrisdickinson

### 主要变化

* debug：修复 v8 事后调试。
* crypto：publicEncrypt 现在支持受密码保护的私钥。
* crypto：哈希函数速度提升约 30%。
* crypto：新增 privateEncrypt/publicDecrypt 函数。
* errors
  * 通过 util.inspect 提供更好的格式化
  * 来自 fs 的错误信息更具描述性。这需要提升 `NODE_MODULE_VERSION`。
  * 来自 http.setHeader 的错误信息更具描述性
* 依赖更新：
  * npm：升级到 2.4.1
  * http-parser：回退到 2.3.0
  * libuv：更新到 1.3.0
  * v8：更新到 4.1.0.14
* http.request：现在会遵守 options 上继承的属性
* 为 buffers 添加可迭代接口（`for (let byte of buffer.values()) { }`）
* fs：修复 `fs.createReadStream` 上的 fd 泄漏。详情见 497fd72。
* installer：在 Windows 上，安装后发出 WM\_SETTINGCHANGE，以便让其他正在运行的进程感知 PATH 的变化。
* 新增协作者：
  * Vladimir Kurchatkin (@vkurchatkin)
  * Micleușanu Nicu (@micnic)

### 已知问题

* REPL 中的代理对可能会冻结终端 (<https://github.com/nodejs/node/issues/690>)
* 无法将 io.js 构建为静态库 (<https://github.com/nodejs/node/issues/686>)

### 提交

* \[[`df48faf`](https://github.com/nodejs/node/commit/df48fafa92c4ff0caee54c2f7fa214073cbd787e)] - tools：添加发布工具和文档，移除旧工具（Rod Vagg）
* \[[`14684d3`](https://github.com/nodejs/node/commit/14684d3d67ad7c04bec7b63377343dab3e389470)] - v8abbr：ASCIISTRINGTAG => ONEBYTESTRINGTAG（Fedor Indutny）
* \[[`6a5d731`](https://github.com/nodejs/node/commit/6a5d731f602b547074f4367a7eb3964395080c94)] - gyp：启用 postmortem 支持，修复 dtrace 路径（Fedor Indutny）
* \[[`8b88ff8`](https://github.com/nodejs/node/commit/8b88ff85f106eed03bf677b9ab3b842f4edbdc6b)] - deps：修复 v8 中的 postmortem 支持（Fedor Indutny）
* \[[`d0b0bb4`](https://github.com/nodejs/node/commit/d0b0bb4ae00f596042bebe1ae61ae685bfbebf7d)] - dtrace：修复未使用探针的移除（Glen Keane）
* \[[`3e67d7e`](https://github.com/nodejs/node/commit/3e67d7e46b80c90faa360d1d0e44dacc444e8e4f)] - http：用 \[].slice() 替换 util.\_extend()（Jonathan Ong）
* \[[`89dd8e0`](https://github.com/nodejs/node/commit/89dd8e062f462106a6f7d3e92e9d18906445f851)] - benchmark：清理 common.js（Brendan Ashworth）
* \[[`6561274`](https://github.com/nodejs/node/commit/6561274d2377d9fd9c55fa3ce2eb2e53c14d898e)] - crypto：支持 publicEncrypt 中的密码（Calvin Metcalf）
* \[[`e9eb2ec`](https://github.com/nodejs/node/commit/e9eb2ec1c491e82dda27fe07d0eaf14ff569351b)] - process：修复取消监听信号时的回归问题（Sam Roberts）
* \[[`233e333`](https://github.com/nodejs/node/commit/233e333b183edeea6b740911061c7dc526078260)] - events：消除事件排序中的不确定性（Sam Roberts）
* \[[`d75fecf`](https://github.com/nodejs/node/commit/d75fecf6fd7a1ef9d3d84a70ab832e7c062f5880)] - src：移除未使用的 dtrace 探针（Glen Keane）
* \[[`8c0742f`](https://github.com/nodejs/node/commit/8c0742f43759d35da99f2475f81a026c2818c66a)] - net：检查 close 回调是否为函数（Yosuke Furukawa）
* \[[`207e48c`](https://github.com/nodejs/node/commit/207e48c93459da5e47f2efd408cfad6328bb0e25)] - dgram：检查 close 回调是否为函数（Yosuke Furukawa）
* \[[`6ac8bdc`](https://github.com/nodejs/node/commit/6ac8bdc0aba5f60f4b4f2da5abd36d664062aa40)] - lib：减少 util.is\*() 的使用（cjihrig）
* \[[`bce7a26`](https://github.com/nodejs/node/commit/bce7a2608eb198eee6ecd7991062efd6daeeb440)] - deps：使 node-gyp 在 windows 上重新可用（Bert Belder）
* \[[`1bdd74d`](https://github.com/nodejs/node/commit/1bdd74d20a3c979d51929a1039824d90abca2cdb)] - deps：让 node-gyp 从 iojs.org 获取 tarball（Ben Noordhuis）
* \[[`faf34ff`](https://github.com/nodejs/node/commit/faf34ffbd321f4657bd99fb82931e1c9a4dda6af)] - deps：将 npm 升级到 2.4.1（Forrest L Norvell）
* \[[`40e29dc`](https://github.com/nodejs/node/commit/40e29dcbbf33d919f5cc0cbab5fa65a282adb04b)] - assert：使用 util.inspect() 创建错误消息（cjihrig）
* \[[`bc2c85c`](https://github.com/nodejs/node/commit/bc2c85ceef7ac034830e4a4357d0aef69cd6e386)] - fs：改进错误消息（Bert Belder）
* \[[`0767c2f`](https://github.com/nodejs/node/commit/0767c2feb1cb6921acd18be3392d331e093b2b4c)] - lib：修复 Buffer 构造函数中的最大大小检查（Ben Noordhuis）
* \[[`65b1e4f`](https://github.com/nodejs/node/commit/65b1e4f56f1f49dccd19b65dee2856df05b06c89)] - dgram：隐式绑定应为独占（Sam Roberts）
* \[[`083c421`](https://github.com/nodejs/node/commit/083c421b5ca08576897b5da396085a462010780e)] - benchmark：移除 http 选项中的多余空格（Brendan Ashworth）
* \[[`e17e6fb`](https://github.com/nodejs/node/commit/e17e6fb2faa04193eddf8062fbd49f1612b4dbff)] - util：为 Utf8Value 使用栈上缓冲区（Fedor Indutny）
* \[[`3d4e96f`](https://github.com/nodejs/node/commit/3d4e96f3ceea1d30b4affb66133016a3c2811005)] - crypto：在 HashUpdate 中使用栈上存储（Fedor Indutny）
* \[[`aca2011`](https://github.com/nodejs/node/commit/aca20112519decef44474a2ee9936049e2a38b67)] - string\_bytes：引入 InlineDecoder（Fedor Indutny）
* \[[`c6367e7`](https://github.com/nodejs/node/commit/c6367e7f2a68b2418a98dfe9e829f17f62ba403a)] - node：加速 ParseEncoding（Fedor Indutny）
* \[[`7604e6d`](https://github.com/nodejs/node/commit/7604e6decc441a1110567e98f20f7ee122179d54)] - docs：添加关于 crypto 中默认填充的说明（Calvin Metcalf）
* \[[`cf3e908`](https://github.com/nodejs/node/commit/cf3e908b70dfb345711cbca6c8e5373d085b05ea)] - http：更具描述性的 setHeader 错误（Qasim Zaidi）
* \[[`cbc1262`](https://github.com/nodejs/node/commit/cbc1262bd952a6c52937abe47a0af625965fba65)] - deps：将 v8 升级到 4.1.0.14（Ben Noordhuis）
* \[[`00f822f`](https://github.com/nodejs/node/commit/00f822f276c08465db3f6c70f154e9f28cc372d6)] - doc：将 micnic 添加为协作者（Micleusanu Nicu）
* \[[`514b1d9`](https://github.com/nodejs/node/commit/514b1d964b2e67d0594c6a44a22fbc29fe71454b)] - doc：向 benchmark/README.md 添加更多信息（Fishrock123）
* \[[`097fde7`](https://github.com/nodejs/node/commit/097fde7129a3acc660beb372cecd9daf1164a7f2)] - deps：将 libuv 更新到 1.3.0（Saúl Ibarra Corretgé）
* \[[`6ad236c`](https://github.com/nodejs/node/commit/6ad236c9b6a344a88ec2f1f173d5f920984b77b7)] - build：配置格式化，添加最终消息（Roman Reiss）
* \[[`dd47a8c`](https://github.com/nodejs/node/commit/dd47a8c78547db14ea0c7fc2f3375e8c9cb1a129)] - src：在启动时设置默认信号处理方式（Ben Noordhuis）
* \[[`63ae1d2`](https://github.com/nodejs/node/commit/63ae1d203aba94b9a35400acdf00ff968fb6eb05)] - src：重构早期调试信号处理（Ben Noordhuis）
* \[[`5756f92`](https://github.com/nodejs/node/commit/5756f92f464fd0f2d04dd05bc30b350010885f74)] - src：更早执行平台相关初始化（Ben Noordhuis）
* \[[`24bd4e0`](https://github.com/nodejs/node/commit/24bd4e055562d8eb8a0d8db907c1715cc37e90b4)] - test：添加 http upgrade header 回归测试（Ben Noordhuis）
* \[[`6605096`](https://github.com/nodejs/node/commit/660509694cfd4de59df0548eabbe18c97d75c63a)] - deps：将 http\_parser 回退到 2.3.0（Ben Noordhuis）
* \[[`90ddb46`](https://github.com/nodejs/node/commit/90ddb46d522c37d2bc2eb68a6e0c9d52f9fbba42)] - crypto：移除对 this.\_readableState 的使用（Calvin Metcalf）
* \[[`45d8d9f`](https://github.com/nodejs/node/commit/45d8d9f8262983d7d6434f4500b4e88b63052cd5)] - buffer：实现 `iterable` 接口（Vladimir Kurchatkin）
* \[[`3cbb5cd`](https://github.com/nodejs/node/commit/3cbb5cdfdb621baec5dc3a2ac505be37f1718086)] - console：允许将 Object.prototype 字段作为标签（cjihrig）
* \[[`87e62bd`](https://github.com/nodejs/node/commit/87e62bd4c87e8674e3d1c432506e9b4991784ee2)] - crypto：实现 privateEncrypt/publicDecrypt（Fedor Indutny）
* \[[`b50fea4`](https://github.com/nodejs/node/commit/b50fea4d490278b291321e6b96c49cf20bee1552)] - watchdog：修复提前轮询返回时的超时问题（Saúl Ibarra Corretgé）
* \[[`b5166cb`](https://github.com/nodejs/node/commit/b5166cb7d269cd1bf90d1768f82767b05b9ac1f8)] - benchmark：添加 bench-(url & events) make 目标（Yosuke Furukawa）
* \[[`5843ae8`](https://github.com/nodejs/node/commit/5843ae8dfba5db83f2c04ed2db847049cbd2ab0d)] - 回滚“doc：澄清 fs.symlink 和 fs.symlinkSync 参数”（Bert Belder）
* \[[`668bde8`](https://github.com/nodejs/node/commit/668bde8ac0d16382cbc98c904d8b5f55fd9fd9f0)] - win,msi：安装后广播 WM\_SETTINGCHANGE（Mathias Küsel）
* \[[`69ce064`](https://github.com/nodejs/node/commit/69ce0641dc6a84c90ffdd0906790cd945f1c3629)] - build：在 distclean 时移除产物（Johan Bergström）
* \[[`1953886`](https://github.com/nodejs/node/commit/1953886126a2ab3e7291a73767ee4302a391a208)] - test：fs.createReadStream().destroy() fd 泄漏（Rod Vagg）
* \[[`497fd72`](https://github.com/nodejs/node/commit/497fd72e21d2d1216e8457928d1a8082349fd0e5)] - fs：修复 ReadStream.destroy() 中的 fd 泄漏（Alex Kocharin）
* \[[`8b09ae7`](https://github.com/nodejs/node/commit/8b09ae76f1d854a0db579fc0737df4809ce6087d)] - doc：为 http\_parser/libuv 升级添加链接（Michael Hart）
* \[[`683e096`](https://github.com/nodejs/node/commit/683e09603e3418ed13333bac05876cb7d52453f5)] - src：移除过多的许可证声明模板（Aleksey Smolenchuk）
* \[[`5c7ab96`](https://github.com/nodejs/node/commit/5c7ab96b90d1ab35e03e32a249d50e7651dee6ef)] - doc：修复 net.Server.listen 绑定行为（Andres Suarez）
* \[[`84b05d4`](https://github.com/nodejs/node/commit/84b05d48d943e5b5e88485be129755277bedd1cb)] - doc：更新 writable streams 默认编码（Johnny Ray Austin）
* \[[`1855267`](https://github.com/nodejs/node/commit/18552677d7e4468b093f28e721d1c02ce001b558)] - doc：修复 streams 文档中的轻微语法错误（ttrfwork）
* \[[`4f68369`](https://github.com/nodejs/node/commit/4f68369643cbbbcc6b12028091bb8064e89ce02d)] - build：禁用 v8 snapshots（Ben Noordhuis）
* \[[`c0a9d1b`](https://github.com/nodejs/node/commit/c0a9d1bc74e1aa5ed1f5a934509c1984142e0eab)] - versions：添加 http-parser patchlevel（Johan Bergström）
* \[[`7854811`](https://github.com/nodejs/node/commit/785481149d59fddead9007d469e2578204f24cfb)] - child\_process：克隆 spawn options 参数（cjihrig）
* \[[`88aaff9`](https://github.com/nodejs/node/commit/88aaff9aa6dd2aa2baadaf9b8d5f08e89fb77402)] - deps：将 http\_parser 更新到 2.4.2（Fedor Indutny）
* \[[`804ab7e`](https://github.com/nodejs/node/commit/804ab7ebaaf5d87499e3cbce03184f064264dd2a)] - doc：将 seishun 添加为协作者（Nikolai Vavilov）
* \[[`301a968`](https://github.com/nodejs/node/commit/301a968a40152c1ad3562482b4044458a13ebc4f)] - child\_process：移除冗余条件（Vladimir Kurchatkin）
* \[[`06cfff9`](https://github.com/nodejs/node/commit/06cfff935012ed2826cac56284cea982630cbc27)] - http：不再费心复制 options（Jonathan Ong）
* \[[`55c222c`](https://github.com/nodejs/node/commit/55c222ceba8e2b22fb5639082906faace520ec4e)] - doc：将 vkurchatkin 添加为协作者（Vladimir Kurchatkin）
* \[[`50ac4b7`](https://github.com/nodejs/node/commit/50ac4b7e2a823f92f0e102b804ec73f00eacb216)] - 正在处理 1.0.5（Rod Vagg）
* \[[`d1fc9c6`](https://github.com/nodejs/node/commit/d1fc9c6caec68883401fe601d99f3a69fee52556)] - 2015-01-24 io.js v1.0.4 发布（Rod Vagg）

<a id="1.0.4"></a>

## 2015-01-24，版本 1.0.4，@rvagg

### 重要变更

* npm 升级到 2.3.0，修复了 Windows 上“uid is undefined”错误
* crypto.pseudoRandomBytes() 现在是 crypto.randomBytes() 的别名
  如果没有足够的熵来生成安全
  值，它将阻塞。详情见 <https://github.com/nodejs/node/commit/e5e5980>。
* 为 V8 打补丁以正确检测 ARMv6；二进制文件现在再次可在
  ARMv6（树莓派等）上工作
* V8 的小版本升级，从 4.1.0.7 到 4.1.0.12
* 'punycode' 核心模块的稳定性级别从 2-Unstable 提升到
  3-Stable
* 新增协作者：
  * Thorsten Lorenz (@thlorenz)
  * Stephen Belanger (@qard)
  * Jeremiah Senkpiel (@fishrock123)
  * Evan Lucas (@evanlucas)
  * Brendan Ashworth (@brendanashworth)

### 提交

* \[[`bb766d2`](https://github.com/nodejs/node/commit/bb766d2c47e8a416ce9f1e4f693f124afe857c1a)] - doc: 更新 node 中的 "net" 部分以反映 io.js 的变更 (Andres Suarez)
* \[[`73ddaa6`](https://github.com/nodejs/node/commit/73ddaa629c145af1632ac67d5d7d3a2abeabdf24)] - tools: 移除旧的 updateAuthors.awk 脚本 (Rod Vagg)
* \[[`6230bf9`](https://github.com/nodejs/node/commit/6230bf9b79a6c451d678693004d52249fe9c1702)] - doc: 更新 AUTHORS 列表 (Rod Vagg)
* \[[`33186fa`](https://github.com/nodejs/node/commit/33186fa7d89aef988e5cf24801de891d325afd7d)] - doc: 添加 brendanashworth 为协作者 (Brendan Ashworth)
* \[[`8f9502a`](https://github.com/nodejs/node/commit/8f9502a20a8851cfbf5f6181a52813baec23fe0f)] - doc: 添加 evanlucas 为协作者 (Evan Lucas)
* \[[`35a4f11`](https://github.com/nodejs/node/commit/35a4f1107eeab39f9cd0e5b9abe6a314e1f6ddd7)] - doc: 将 all.markdown 按字母顺序排序 (Brendan Ashworth)
* \[[`a0831c5`](https://github.com/nodejs/node/commit/a0831c580d50b54fd4add58071341b3b7ec83499)] - doc: 添加 Fishrock123 为协作者 (Fishrock123)
* \[[`5412487`](https://github.com/nodejs/node/commit/54124874dcc7eee1e8909cf2056c7f69722be4aa)] - doc: 添加 qard 为协作者 (Stephen Belanger)
* \[[`8b55048`](https://github.com/nodejs/node/commit/8b55048d670d22d4e6d93710fe039d576a2b71bc)] - deps: 使 node-gyp 在 windows 上再次可用 (Bert Belder)
* \[[`82227f3`](https://github.com/nodejs/node/commit/82227f35110dcefa5a02e068a78dc3eb4aa0d3bc)] - deps: 使 node-gyp 从 iojs.org 获取 tarball (Ben Noordhuis)
* \[[`f5b35db`](https://github.com/nodejs/node/commit/f5b35dbda45c466eda888a4451591c66e8671faf)] - deps: 将 npm 升级到 2.3.0 (Forrest L Norvell)
* \[[`f3fed51`](https://github.com/nodejs/node/commit/f3fed5193caaac151acd555a7523068ee269801c)] - doc: 将 thlorenz 添加到协作者列表 (Thorsten Lorenz)
* \[[`8de89ec`](https://github.com/nodejs/node/commit/8de89ec465d8f1e31521e0b888c19b0a3309cd88)] - lib: 将默认地址逻辑移到 `net._listen2` (Vladimir Kurchatkin)
* \[[`3143d73`](https://github.com/nodejs/node/commit/3143d732f6efd82da76e9c53ad192ac14071bf70)] - test: 删除 parallel/test-process-active-wraps (Ben Noordhuis)
* \[[`4f95b5d`](https://github.com/nodejs/node/commit/4f95b5d8253ef64e3673b9fa178c41dc8109b72b)] - test: 修复 parallel/test-http-destroyed-socket-write2 (Ben Noordhuis)
* \[[`5ba307a`](https://github.com/nodejs/node/commit/5ba307a97879342ff81aa813ffd7da46b6411b1c)] - test: 修复 parallel/test-dgram-error-message-address (Ben Noordhuis)
* \[[`f4c536b`](https://github.com/nodejs/node/commit/f4c536b749735a0240da08386d6784767f95cb5d)] - debugger: 不要覆盖模块绑定 (Vladimir Kurchatkin)
* \[[`40ffed8`](https://github.com/nodejs/node/commit/40ffed8f3f4392d6e110769ca06d86d6295fc645)] - stream: 如果省略，则使用 nop 作为 write() 回调 (cjihrig)
* \[[`df0d790`](https://github.com/nodejs/node/commit/df0d790107edf635dc233f3338b3c2e68db58cc7)] - doc: dns.lookupService 的标题级别不正确 (Icer Liang)
* \[[`8b1db9c`](https://github.com/nodejs/node/commit/8b1db9c0a7dc39261218a0fac2dd6cf4fbb6a7b4)] - doc: 在文档中注明缺失的接口 (Todd Kennedy)
* \[[`2928ac6`](https://github.com/nodejs/node/commit/2928ac68e524bb5cacd522507bac0a147d01cd75)] - doc: 将 punycode API 的稳定性提升为 'stable' (Ben Noordhuis)
* \[[`328e67b`](https://github.com/nodejs/node/commit/328e67b58bc6dbcbed8ec452e6903ea6f121dc59)] - doc: 添加 2015-01-21 TC 会议纪要 (Rod Vagg)
* \[[`e5e5980`](https://github.com/nodejs/node/commit/e5e598060eb43faf2142184d523a04f0ca2d95c3)] - lib,src: 使 pseudoRandomBytes 成为 randomBytes 的别名 (Calvin Metcalf)
* \[[`c6cd460`](https://github.com/nodejs/node/commit/c6cd46041c70794d89634da380555fb613c2e0ab)] - configure: 移除未使用的 arm\_neon 变量 (Ben Noordhuis)
* \[[`7d9d756`](https://github.com/nodejs/node/commit/7d9d7560cfbd24172ede690e74cedbb4b26e32c9)] - configure: 在 armv6 上禁用 vfpv3 (Ben Noordhuis)
* \[[`297cadb`](https://github.com/nodejs/node/commit/297cadbab6a37fa4f14811452e4621770a321371)] - deps: 修复 v8 armv6 运行时检测 (Ben Noordhuis)
* \[[`d481bb6`](https://github.com/nodejs/node/commit/d481bb68c4f2cf01ec7d26dcc91862b265b7effa)] - doc: 更明确地说明 crypto.pseudoRandomBytes 文档 (Calvin Metcalf)
* \[[`7d46247`](https://github.com/nodejs/node/commit/7d462479f6aad374fab90dd10bb07a8097f750aa)] - src: 在 `iojs --help` 消息中将 s/node/io.js/ (Ben Noordhuis)
* \[[`069c0df`](https://github.com/nodejs/node/commit/069c0dfb1cbfeb7c9c66a30f1fb5f065a9e22ee6)] - deps: 将 v8 升级到 4.1.0.12 (Ben Noordhuis)
* \[[`ada2a43`](https://github.com/nodejs/node/commit/ada2a4308c5a70728d01ea7447c0a7a153a9b703)] - doc: 添加 2015-01-13 TC 会议纪要 (Rod Vagg)
* \[[`60402b9`](https://github.com/nodejs/node/commit/60402b924b4b38196a658a023fad945421710457)] - docs: 移除 changelog 中不正确的条目 (Bert Belder)
* \[[`8b98096`](https://github.com/nodejs/node/commit/8b98096c921f8a210b05aed64e0b2f1440667a7c)] - fs: 使 fs.access() 标志为只读 (Jackson Tian)
* \[[`804e7aa`](https://github.com/nodejs/node/commit/804e7aa9ab0b34fa88709ef0980b960abca5e059)] - lib: 使用 const 定义常量 (cjihrig)
* \[[`803883b`](https://github.com/nodejs/node/commit/803883bb1a701da12c285fd735233eed7627eada)] - v8: 修复模板字面量 NULL 指针解引用 (Ben Noordhuis)
* \[[`5435cf2`](https://github.com/nodejs/node/commit/5435cf2f1619721745c7a8ac06b4f833d0b80d25)] - v8: 优化 `getHeapStatistics` (Vladimir Kurchatkin)
* \[[`5d01463`](https://github.com/nodejs/node/commit/5d014637b618af7eac6ab0fce8d67884598c7b35)] - benchmark: 将分数打印到小数点后五位 (Yosuke Furukawa)
* \[[`752585d`](https://github.com/nodejs/node/commit/752585db6355ead7e6484f321e053b8d543c0a67)] - src: 消除 clang 警告 (Trevor Norris)
* \[[`22e1aea`](https://github.com/nodejs/node/commit/22e1aea8a025b6439493dec4d44afe4c9f454c86)] - src: 在 node::Init 中设置 node\_is\_initialized (Cheng Zhao)
* \[[`668420d`](https://github.com/nodejs/node/commit/668420d1f7685f49843bbf81ee3b4733a1989852)] - src: 清理 node_file.cc 中未使用的宏 (Ben Noordhuis)
* \[[`52f624e`](https://github.com/nodejs/node/commit/52f624e72a419d3fd7f7f8ccc2d22ebdb0ba4fff)] - src: 重命名 node_crypto.cc 中的 ASSERT 宏 (Ben Noordhuis)
* \[[`e95cfe1`](https://github.com/nodejs/node/commit/e95cfe14e343c5abed96a8d3cb9397c0c84abecc)] - src: 添加 ASSERT_EQ 风格宏 (Ben Noordhuis)
* \[[`ee9cd00`](https://github.com/nodejs/node/commit/ee9cd004d8a211871439fc77c0696b79c5d0e52d)] - lib: 修复 EventEmitter#on() 滥用导致的 TypeError (Ben Noordhuis)
* \[[`77d6807`](https://github.com/nodejs/node/commit/77d68070dafe56b5593ad92759a57c64de6b4cf1)] - test: 修复 event-emitter-get-max-listeners 风格 (Ben Noordhuis)
* \[[`767ee73`](https://github.com/nodejs/node/commit/767ee7348624803e6f90cf111df8b917fac442fc)] - test: 去除版权模板文本 (Ben Noordhuis)
* \[[`86eda17`](https://github.com/nodejs/node/commit/86eda173b16b6ece9712e066661a0ac5db6795e8)] - fs: 使用 const 定义常量 (cjihrig)

<a id="1.0.3"></a>

## 2015-01-20，版本 1.0.3，@rvagg

### 重要变更

* V8 从 3.31 升级到 4.1，这不是一次重大升级，版本号“4.1”表示朝着 Chrome 41 进行跟踪。3.31 分支现在不再跟踪稳定版发布。
* 重新启用 Windows XP / 2003 支持
* npm 升级到 2.2.0
* 改进了对 FreeBSD 的支持

### 已知问题

* ARMv6 构建仍然无法工作，此问题在 V8 中被搁置，见 issue #283
* 模板字符串会导致 V8 4.1 崩溃，<https://codereview.chromium.org/857433004>，另见 issue #333

### 提交

* \[[`9419e1f`](https://github.com/nodejs/node/commit/9419e1fb698e1a9319fec5c4777686d62fad4a51)] - src: 修复检查与错误之间的不一致 (toastynerd)
* \[[`03ee4d8`](https://github.com/nodejs/node/commit/03ee4d854744e83f99bc5857b98f75139c448564)] - fs: 在包含空字节的路径上添加错误代码 (cjihrig)
* \[[`e2558f0`](https://github.com/nodejs/node/commit/e2558f02dfb671fc74f5768d4401a826efb5c117)] - net: 修复 connect() 中的错误详情 (cjihrig)
* \[[`4af5746`](https://github.com/nodejs/node/commit/4af5746993a6b91c88973b6debcee19c6cd35185)] - win,build: 移除重复定义 (Bert Belder)
* \[[`e8d0850`](https://github.com/nodejs/node/commit/e8d08503c7821e8c92e9fa236ed7328e9bdfe62a)] - win: 恢复 xp/2k3 支持 (Bert Belder)
* \[[`4dd22b9`](https://github.com/nodejs/node/commit/4dd22b946ebfec81a7c4a61aa9c6ed528e317802)] - cluster: 避免在 worker 中启用调试器时发生竞态 (Timothy J Fontaine)
* \[[`6b91c78`](https://github.com/nodejs/node/commit/6b91c78e201948937a4524027a6778aa7f82fb0a)] - test: 重新合入来自 [`11c1bae`](https://github.com/nodejs/node/commit/11c1bae734dae3a017f2c4f3f71b5e679a9ddfa6) 的更改 (Ben Noordhuis)
* \[[`992a1e7`](https://github.com/nodejs/node/commit/992a1e7f5f87606276af8504c2d57cc5a966830a)] - test: debug-signal-cluster 不应存在竞态 (Timothy J Fontaine)
* \[[`cdf0df1`](https://github.com/nodejs/node/commit/cdf0df13d85391b3b8ac36fa5b70da7f21072619)] - test: 临时回退来自 [`11c1bae`](https://github.com/nodejs/node/commit/11c1bae734dae3a017f2c4f3f71b5e679a9ddfa6) 的更改 (Ben Noordhuis)
* \[[`1ea607c`](https://github.com/nodejs/node/commit/1ea607cb299b0bb59d7d557e01b21b3c615d689e)] - test: 移动 sequential/test-debug-port-from-cmdline (Ben Noordhuis)
* \[[`2f33e00`](https://github.com/nodejs/node/commit/2f33e00d716d692e84b02768430664fd92298c98)] - test: 修复 test-debug-port-from-cmdline.js (Julien Gilli)
* \[[`b7365c1`](https://github.com/nodejs/node/commit/b7365c15597253e906590045aa6f3f07f6e76b52)] - repl: 使 REPL 支持多行模板字面量 (Xiaowei Li)
* \[[`2253d30`](https://github.com/nodejs/node/commit/2253d30d9cbba42abc1faa183e4480cac69c4222)] - build: 移除未使用的变量 (Johan Bergström)
* \[[`ab04a43`](https://github.com/nodejs/node/commit/ab04a434761cf66d107481d58798f36d3cb49d46)] - doc: 在 README 的 make install 中添加可选的 sudo (Glen Keane)
* \[[`1b1cd1c`](https://github.com/nodejs/node/commit/1b1cd1c3f8e21b34a8e1355e545057a661acaa15)] - build: 缩短 configurate 脚本在标准输出上的打印内容 (Roman Reiss)
* \[[`d566ded`](https://github.com/nodejs/node/commit/d566ded26b996c27afeb7fc208709bb6096bfa13)] - deps: 修复 V8 调试器错误 (Jay Jaeho Lee)
* \[[`6f36630`](https://github.com/nodejs/node/commit/6f36630f55efcbe5954a52ac22bbb0a378020e98)] - doc: 修复 util.isBuffer 示例 (Thomas Jensen)
* \[[`3abfb56`](https://github.com/nodejs/node/commit/3abfb56f9b012da0d1e1deaec1529ea7384a0a71)] - benchmark: 在内部 API 更改后修复 tcp 基准测试 (Yosuke Furukawa)
* \[[`50177fb`](https://github.com/nodejs/node/commit/50177fb13cae68067845cca7622798eb7a34f8e9)] - benchmark: 阻止 v8 基准测试覆盖 RegExp (Ben Noordhuis)
* \[[`1952219`](https://github.com/nodejs/node/commit/19522197ef28275344ad2f1e0799ce8106276ec1)] - deps: 使 node-gyp 在 windows 上再次可用 (Bert Belder)
* \[[`a28de9b`](https://github.com/nodejs/node/commit/a28de9bd3684f54379ccf101f62656771002205d)] - deps: 使 node-gyp 从 iojs.org 获取 tarball (Ben Noordhuis)
* \[[`9dc8f59`](https://github.com/nodejs/node/commit/9dc8f59fea5a294df039f70e523be2d45aef1324)] - deps: 将 npm 升级到 2.2.0 (Forrest L Norvell)
* \[[`e8ad773`](https://github.com/nodejs/node/commit/e8ad773b56a94fad2cd8a454453a7214a8ce92d1)] - src: 再次移除 --noharmony\_classes (Ben Noordhuis)
* \[[`334020e`](https://github.com/nodejs/node/commit/334020e016a72952a9a3b3f7e9179145c7e167ad)] - deps: 修复 FreeBSD 上的 v8 构建 (Fedor Indutny)
* \[[`5e7ebc7`](https://github.com/nodejs/node/commit/5e7ebc7af6d08d4e31cf66f4ae22d29c688ef814)] - deps: 将 v8 升级到 4.1.0.7 (Ben Noordhuis)
* \[[`ea7750b`](https://github.com/nodejs/node/commit/ea7750bddd8051f39fa538905e05f9bf1d1afa5f)] - benchmark: 为 benchmark 添加过滤选项 (Yosuke Furukawa)
* \[[`4764eef`](https://github.com/nodejs/node/commit/4764eef9b2efdf17cafeb4ec40898c6669a84e3b)] - doc: 修正标点 (Brenard Cubacub)
* \[[`de224d6`](https://github.com/nodejs/node/commit/de224d6e6c9381e71ffee965dbda928802cc438e)] - configure: 移除 --ninja 开关 (Ben Noordhuis)
* \[[`48774ec`](https://github.com/nodejs/node/commit/48774ec027a28cca17656659d316bb7ed8d6f33c)] - configure: 为旧编译器打印警告 (Ben Noordhuis)
* \[[`daf9562`](https://github.com/nodejs/node/commit/daf9562d918b7926186471cd0db60cec2f72547a)] - doc: 在 usage 消息中将 node 改为 iojs (Jongyeol Choi)
* \[[`3fde649`](https://github.com/nodejs/node/commit/3fde64937a3a0c8ed941ee97b07e1828b392a672)] - build: 将 tools/gflags 添加到 PYTHONPATH (Shigeki Ohtsu)
* \[[`8b22df1`](https://github.com/nodejs/node/commit/8b22df15ae0e3499b2e057ffd8a6f65cbf978da3)] - doc: 添加 python-gflags LICENSE 块 (Shigeki Ohtsu)
* \[[`6242229`](https://github.com/nodejs/node/commit/62422297f52523d2214136cd5514e2453197e3e8)] - tools: 添加 python-gflags 模块 (Shigeki Ohtsu)

<a id="1.0.2"></a>

## 2015-01-16，版本 1.0.2，@rvagg

### 重要变更

* Windows 安装程序修复
* Windows 版捆绑的 node-gyp 修复
* [http\_parser v2.4.1 升级](https://github.com/joyent/http-parser/compare/v2.3...v2.4.1)
* [libuv v1.2.1 升级](https://github.com/libuv/libuv/compare/v1.2.0...v1.2.1)

### 提交

* \[[`265cb76`](https://github.com/nodejs/node/commit/265cb76517d81408afb72506c778f0c0b889f4dc)] - build: 为 OS X 添加新的安装程序配置 (Rod Vagg)
* \[[`8cf6079`](https://github.com/nodejs/node/commit/8cf6079a6a7f5d1afb06606b7c51acf9b1a046a0)] - doc: 更新 AUTHORS 列表 (Rod Vagg)
* \[[`c80a944`](https://github.com/nodejs/node/commit/c80a9449b309f9c52a5910b7ac6ba0c84ee1b6f6)] - doc: 在 CHANGELOG.md 中添加 http keepalive 行为 (Isaac Z. Schlueter)
* \[[`9b81c3e`](https://github.com/nodejs/node/commit/9b81c3e77ffd733645956129a38fdc2fddd08b50)] - doc: 修正作者署名 (Tom Hughes)
* \[[`fd30eb2`](https://github.com/nodejs/node/commit/fd30eb21526bdaa5aabb15523b0a766e0cbbe535)] - src: 修复 jslint 错误 (Yosuke Furukawa)
* \[[`946eabd`](https://github.com/nodejs/node/commit/946eabd18f623b438e17164b14c98066f7054168)] - tools: 将 closure linter 更新到 2.3.17 (Yosuke Furukawa)
* \[[`9e62ae4`](https://github.com/nodejs/node/commit/9e62ae4304a0bee3aec8c5fb743eb17d78b1cd35)] - \_debug\_agent: 使用 `readableObjectMode` 选项 (Vladimir Kurchatkin)
* \[[`eec4c81`](https://github.com/nodejs/node/commit/eec4c8168be1f0a01db3576ae99f7756eea01151)] - doc: 修正 LICENSE 中用于 RTF 生成的格式 (Rod Vagg)
* \[[`e789103`](https://github.com/nodejs/node/commit/e7891034c269dccf8d6264acc4b7421e19a905f6)] - doc: 修复语法高亮 js 的 404 问题 (Phil Hughes)
* \[[`ca039b4`](https://github.com/nodejs/node/commit/ca039b4616915b95130ba5ee5a2cf9f5c768645e)] - src: 为 OpenBSD 定义 AI\_V4MAPPED (Aaron Bieber)
* \[[`753fcaa`](https://github.com/nodejs/node/commit/753fcaa27066b34a99ee1c02b43a32744fc92a3c)] - doc: 通过 end 事件扩展示例中的 http.request 用法 (Michal Tehnik)
* \[[`8440cac`](https://github.com/nodejs/node/commit/8440cacb100ae83c2b2c02e82a87c73a66380c21)] - src: 修复帮助信息中的文档 URL (Shigeki Ohtsu)
* \[[`24def66`](https://github.com/nodejs/node/commit/24def662936ae8c15770ede0344cd7a7402a63ef)] - win,msi: 提示旧版 io.js 需要手动卸载 (Bert Belder)
* \[[`59d9361`](https://github.com/nodejs/node/commit/59d93613d8e1e8507b5c8462c52dd3cbda98e99b)] - win,msi: 更改 UpgradeCode (Bert Belder)
* \[[`5de334c`](https://github.com/nodejs/node/commit/5de334c23096492014a097ff487f07ad8eaee6d2)] - deps: 让 node-gyp 在 Windows 上再次可用 (Bert Belder)
* \[[`07bd05b`](https://github.com/nodejs/node/commit/07bd05ba332e078c1ba76635921f5448a3e884cf)] - deps: 将 libuv 更新到 1.2.1 (Saúl Ibarra Corretgé)
* \[[`e177377`](https://github.com/nodejs/node/commit/e177377a4bc0cdbaecb8b17a58e57c73b4ca0090)] - doc: 在 Punycode 文档中将 io.js 与 Node 并列提及 (Mathias Bynens)
* \[[`598efcb`](https://github.com/nodejs/node/commit/598efcbe7f4d795622f038e0ba28c7b119927a14)] - deps: 将 http\_parser 更新到 2.4.1 (Fedor Indutny)
* \[[`3dd7ebb`](https://github.com/nodejs/node/commit/3dd7ebb0ba181960fb6d7131e11243a6ec85458d)] - doc: 更新 CHANGELOG 中的 cluster 条目 (Ben Noordhuis)
* \[[`0c5de1f`](https://github.com/nodejs/node/commit/0c5de1ff813de9661d33cb9aefc4a9540b58b147)] - doc: 修复 double smalloc 示例 (Mathias Buus)

<a id="1.0.1"></a>

## 2015-01-14，版本 1.0.1，@rvagg

由于 1.0.0 发布时构建工作线程的 git reflog 过期，需要重新构建

* doc: 改进写作风格一致性 (Rui Marinho)
* win,msi: 修正文档网站链接 (Bert Belder)

***

<a id="1.0.0"></a>
以下是与当前 _稳定_ 版 Node.js 发布 v0.10.35 相比，io.js v1.0.0 发布中面向用户的变更摘要。在 v1.0.0 发布时，最新的 _不稳定_ 版 Node.js 发布是 v0.11.14，距离 v0.11.15 发布已取得了很大进展。io.js 代码库继承了 [joyent/node](https://github.com/joyent/node) 仓库 v0.11 分支中的大部分变更，因此可以看作是对 v0.11 的扩展。

## 从 Node.js v0.10.35 到 io.js v1.0.0 的变更摘要

### 通用

* io.js 捆绑的 V8 JavaScript 引擎进行了大幅升级，从 Node.js v0.10.35 中的 3.14.5.9 版、Node.js v0.11.14 中的 3.26.33 版升级到 io.js v1.0.0 的 3.31.74.1 版。这带来了许多修复和性能改进，以及对新 ES6 语言特性的额外支持！有关更多信息，请查看 [io.js ES6 页面](https://iojs.org/es6.html)。
* 其他捆绑技术也已升级：
  * c-ares：1.9.0-DEV 到 1.10.0-DEV
  * http\_parser：1.0 到 2.3
  * libuv：0.10.30 到 1.2.0
  * npm：1.4.28 到 2.1.18
  * openssl：1.0.1j 到 1.0.1k
  * punycode：1.2.0 到 1.3.2。
* 所有平台上的性能和稳定性均有所提升。

### buffer

<https://iojs.org/api/buffer.html>

* 新增 `buf.writeUIntLE`、`buf.writeUIntBE`、`buf.writeIntLE`、`buf.writeIntBE`、`buf.readUIntLE`、`buf.readUIntBE`、`buf.readIntLE` 和 `buf.readIntBE` 方法，可读写最多 6 字节的值。
* 新增 `Buffer.compare()`，用于对两个 Buffer 实例执行 `memcmp()`。实例本身也有一个 `compare()`。
* 新增 `buffer.equals()`，通过内容检查 Buffer 是否相等。
* 新增 `new Buffer(otherBuffer)` 构造函数。
* 调整了 `SlowBuffer` 的语义。
* 更新了 `buffer.toJSON()` 的输出，使其不再与数组相同。现在它是一个专门标记为 buffer 的对象，可通过将其传入 `Buffer` 构造函数（新的重载）来恢复。

### child\_process

<https://iojs.org/api/child_process.html>

* 为 `child_process.exec` 添加了 `shell` 选项。
* 为子进程函数添加了同步对应方法：`child_process.spawnSync`、`child_process.execSync` 和 `child_process.execFileSync`。
* 为任何 `ENOENT` 错误添加了路径，便于调试。

### console

<https://iojs.org/api/console.html>

* 为 `console.dir` 添加了 `options` 参数。

### cluster

<https://iojs.org/api/cluster.html>

* 更新 `cluster`，默认在非 Windows 平台上使用轮询负载均衡。不过调度策略是可配置的。
* `--debug` 已支持 cluster 感知。
* 修复了许多 bug。

### crypto

<https://iojs.org/api/crypto.html>

* 为 `DiffieHellman` 添加了自定义生成器值支持（为向后兼容默认为 2）。
* 添加了自定义 pbkdf2 摘要方法支持。
* 添加了基于椭圆曲线的 Diffie-Hellman 支持。
* 添加了为部分或全部 OpenSSL 功能加载并设置引擎的支持。
* 添加了在 `Sign.sign()` 中传入用于解密签名密钥的口令的支持。
* 添加了所有接受私钥口令的方法对私钥口令的支持。
* 添加了 RSA 公钥/私钥加密/解密功能支持。
* 添加了在使用 AES-GCM 等密码时设置和获取认证标签以及设置附加认证数据的支持。

### dgram

<https://iojs.org/api/dgram.html>

* 添加了接收空 UDP 数据包的支持。

### dns

<https://iojs.org/api/dns.html>

* 添加了 `dns.resolveSoa`、`dns.getServers` 和 `dns.setServers` 方法。
* 在可用时，错误消息中添加了 `hostname`。
* 改进了错误处理的一致性。

### events

<https://iojs.org/api/events.html>

* 为 `EventEmitter.setMaxListeners` 添加了链式调用支持。
* 更新 `require('events')` 以返回 `EventEmitter` 构造函数，从而可以像 `var EventEmitter = require('events')` 一样使用该模块，而不是 `var EventEmitter = require('events').EventEmitter`。

### fs

<https://iojs.org/api/fs.html>

* 添加了 `fs.access`，并已弃用 `fs.exists`。请仔细阅读文档。
* 在设置 `NODE_DEBUG` 环境变量时，添加了更详细的错误信息和方法调用位置详情，以便于调试。
* 为 `fs.watch` 添加了递归子目录支持选项（仅限 OS X）。
* 修复了缺少回调时只是打印错误而不是抛出错误的问题。

### http

<https://iojs.org/api/http.html>

* 添加了让 `response.write` 和 `response.end` 接收回调的支持，以便知道操作何时完成。
* 添加了对 308 状态码的支持（见 RFC 7238）。
* 添加了 `http.METHODS` 数组，列出解析器支持的 HTTP 方法。
* 添加了 `request.flush` 方法。
* 添加了 `response.getHeader('header')` 方法，可在头信息刷新前使用。
* 添加了 `response.statusMessage` 属性。
* 添加了客户端 Keep-Alive 行为。在请求选项中设置 `keepAlive:true` 可无限期复用连接。
* 在传入消息中添加了 `rawHeaders` 和 `rawTrailers` 成员。
* 移除了 `DELETE` 和 `OPTIONS` 的默认分块编码。

### net

<https://iojs.org/api/net.html>

* 更改了 `net.Server.listen`：当省略绑定地址时，先尝试 IPv6，IPv4 作为回退。

### os

<https://iojs.org/api/os.html>

* 为 `os.networkInterfaces` 方法输出添加了 IPv6 地址的 MAC 地址、网络掩码和作用域 ID。
* 更新了 Windows 上的 `os.tmpdir`，在确定临时目录位置时使用 `%SystemRoot%` 或 `%WINDIR%` 环境变量，而不是硬编码的 `c:\windows`。

### path

<https://iojs.org/api/path.html>

* 添加了 `path.isAbsolute` 和 `path.parse` 方法。
* 添加了 `path.win32` 和 `path.posix` 对象，其中包含各种 `path` 函数的特定平台版本。
* 改进了 `path.join` 性能。

### process

<https://iojs.org/api/process.html>

* 添加了 `beforeExit` 事件。
* 添加了 `process.mainModule` 和 `process.exitCode`。

### querystring

<https://iojs.org/api/querystring.html>

* 添加了在字符串化或解析 querystring 时传入自定义版本 `encodeURIComponent` 和 `decodeURIComponent` 的能力。
* 修复了边界情况下 query string 格式的若干问题。

### smalloc

<https://iojs.org/api/smalloc.html>

`smalloc` 是一个新的核心模块，用于在 JavaScript 中进行（外部）原始内存的分配/释放/复制。

### streams

<https://iojs.org/api/stream.html>

streams 的变化不像从 streams1 到 streams2 的过渡那样剧烈：它们是对现有理念的改进，应该会让 API 对人类而言稍微不那么意外、对计算机而言更快一些。整体上，这些变化被称为“streams3”，但这些变化对大多数 stream 使用者和实现者来说基本不会明显感受到。

#### 可读流

“流动”和“非流动”模式之间的区分得到了细化。进入“流动”模式不再是不可逆操作——可以从“流动”模式返回到“非流动”模式。此外，这两种模式现在通过同一套机制流转，而不是替换方法。每当数据作为 `.read` 调用的结果返回时，该数据也会在 `"data"` 事件上触发。

与之前一样，为 `"readable"` 或 `"data"` 事件添加监听器会使流开始流动；将其管道到另一个流也是如此。

#### 可写流

`Writable` 流新增了对底层资源进行“批量写入”的能力。对于 stream 实现者来说，可以通过指定一个 [\_writev](https://iojs.org/api/stream.html#stream_writable_writev_chunks_callback) 方法来表明流支持批量写入。批量写入会在两种情况下发生：

1. 当一个支持批量写入的流正在清空其已缓冲写请求的积压时，
2. 或者终端用户使用了新的 `.cork()` 和 `.uncork()` API 方法时。

`.cork` 和 `.uncork` 允许终端用户将可写流的缓冲行为与施加背压分开控制。`.cork` 表示流应接受新的写入（直到 `highWaterMark`），而 `.uncork` 会重置该行为，并尝试将所有已缓冲写入批量写入到底层资源。

**目前**实现了 `_writev` 的唯一核心流 API 是 `net.Socket`。

除了批量写入相关的变化之外，对非批量写入流（例如 `fs.WriteStream`）重复进行小写入的性能也已大幅提升。将高吞吐量日志流管道到磁盘的用户应该会看到性能改进。

有关 streams3 如何交互的详细概览，请[参阅此图](https://cloud.githubusercontent.com/assets/37303/5728694/f9a3e300-9b20-11e4-9e14-a6938b3327f0.png)。

### timers

<https://iojs.org/api/timers.html>

* 移除了 `process.maxTickDepth`，允许无限制地递归使用 `process.nextTick`。
* 更新了 `setImmediate`，使其在事件循环的每一轮处理完整队列，而不是每个队列只处理一个。

### tls

<https://iojs.org/api/tls.html>

* 为 `getPeerCertificate` 添加了 `detailed` 布尔标志，以返回详细证书信息（包含原始 DER 字节）。
* 添加了 `renegotiate(options, callback)` 方法用于会话重新协商。
* 添加了 `setMaxSendFragment` 方法，用于调整 TLS 分片大小。
* 为 DH 密码套件添加了 `dhparam` 选项。
* 为 TLS ticket AES 加密密钥设置添加了 `ticketKeys` 选项。
* 添加了异步 OCSP stapling 回调。
* 添加了异步会话存储事件。
* 添加了异步 SNI 回调。
* 添加了多密钥服务器支持（例如 ECDSA+RSA 服务器）。
* 为 `checkServerIdentity` 添加了可选回调，供用户层进行手动证书验证。
* 添加了对 ECDSA/ECDHE 密码套件的支持。
* 用 C++ 实现了 TLS 流，提升了性能。
* 将 `createCredentials` 移至 `tls` 并重命名为 `createSecureContext`。
* 移除了 SSLv2 和 SSLv3 支持。

### url

<https://iojs.org/api/url.html>

* 改进了某些字符的转义。
* 改进了解析速度。

### util

<https://iojs.org/api/util.html>

* 添加了 `util.debuglog`。
* 添加了大量新的类型测试方法。参见[文档](https://iojs.org/api/util.html)。
* 更新了 `util.format`，带来若干变化：
  * `-0` 现在会按其本身显示，而不是显示为 `0`。
  * 任何 `instanceof Error` 的内容现在都会被格式化为错误。
  * JavaScript 对象中的循环引用现在可由 `%j` 说明符处理。
  * 现在允许自定义 `inspect` 函数返回一个对象。
  * 自定义 `inspect` 函数现在会接收传递给 `util.inspect` 的任何参数。

## v8

<https://iojs.org/api/v8.html>

`v8` 是一个用于直接与 V8 引擎交互的新核心模块。

### vm

<https://iojs.org/api/vm.html>

`vm` 模块已被重写，以便基于优秀的 [Contextify](https://github.com/brianmcd/contextify) 原生模块更好地工作。Contextify 的所有功能现在都已进入核心，并且有所改进！

* 添加了 `vm.isContext(object)` 方法，用于判断 `object` 是否已被 contextify。
* 添加了 `vm.runInDebugContext(code)` 方法，用于在 V8 调试上下文中编译并执行 `code`。
* 更新了 `vm.createContext(sandbox)`，将 sandbox “contextify”，使其适合作为 `vm` 脚本的全局对象使用，然后返回它。它不再创建单独的上下文对象。
* 更新了大多数 `vm` 和 `vm.Script` 方法，使其接受 `options` 对象，从而允许你配置脚本超时、错误显示行为，有时还可以配置文件名（用于堆栈跟踪）。
* 更新了提供的 sandbox 对象，使其直接作为全局对象使用，移除了在提供的 sandbox 对象与 `vm` 模块运行的脚本内部出现的全局对象之间来回复制属性时容易出错的问题。

有关更多信息，请参阅上面链接的 `vm` 文档。

### zlib

<https://iojs.org/api/zlib.html>

* 添加了对 `zlib.flush` 的支持，可指定特定的 flush 方法（默认为 `Z_FULL_FLUSH`）。
* 添加了对 `zlib.params` 的支持，可在 deflate 时动态更新压缩级别和策略。
* 添加了 zlib 方法的同步版本。

### C++ API Changes

<https://iojs.org/api/addons.html>

通常建议你使用 [NAN](https://github.com/rvagg/nan) 作为你的 addon 的兼容层。这也有助于应对未来 V8 和 Node/io.js C++ API 的变化。以下大多数变更都已经由 NAN 特定的封装器处理了。

#### V8 highlights

* 暴露的方法签名已从 `Handle<Value> Method(const Arguments& args)` 更改为 `void Method(const v8::FunctionCallbackInfo<Value>& args)`；新引入的 `FunctionCallbackInfo` 还通过 `args.GetReturnValue().Set(value)` 传递返回值，而不是 `scope.Close(value)`，`Arguments` 已被移除。
* 暴露的 setter 签名已从 `void Setter(Local<String> property, Local<Value> value, const v8::AccessorInfo& args)` `void Setter(Local<String> property, Local<Value> value, const v8::PropertyCallbackInfo<void>& args)`.
* 暴露的 getter 签名已从 `void Getter(Local<String> property, Local<Value> value, const v8::AccessorInfo& args)` `void Getter(Local<String> property, Local<Value> value, const v8::PropertyCallbackInfo<Value>& args)`.
* 暴露的属性 setter 签名已从 `Handle<Value> Setter(Local<String> property, Local<Value> value, const v8::AccessorInfo& args)` `void Setter(Local<String> property, Local<Value> value, const v8::PropertyCallbackInfo<Value>& args)`.
* 暴露的属性 getter 签名已从 `Handle<Value> Getter(Local<String> property, Local<Value> value, const v8::AccessorInfo& args)` `void Getter(Local<String> property, Local<Value> value, const v8::PropertyCallbackInfo<Value>& args)`.
* 属性枚举器、属性删除器、属性查询、索引 getter、索引 setter、索引枚举器、索引删除器、索引查询也做了类似更改。
* 现在在 C++ 中实例化的 V8 对象需要将 `Isolate*` 参数作为第一个参数。在大多数情况下，直接传入 `v8::Isolate::GetCurrent()` 即可，例如 `Date::New(Isolate::GetCurrent(), time)` 或 `String::NewFromUtf8(Isolate::GetCurrent(), "foobar")`。
* `HandleScope scope` 现在需要一个 `Isolate*` 参数，即 `HandleScope scope(isolate)`；在大多数情况下，`v8::Isolate::GetCurrent()` 都可以。
* `Locker` 和 `Unlocker` 也做了类似更改。
* 需要“逃逸”出作用域的 V8 对象应使用 `EscapableHandleScope` 而不是 `HandleScope`，并且应使用 `scope.Escape(value)` 返回。
* 异常现在通过 `isolate->ThrowException(ExceptionObject)` 从 isolate 中抛出。
* `Context::GetCurrent()` 现在必须在 isolate 上调用，例如 `Isolate::GetCurrent()->GetCurrentContext()`。
* `String::NewSymbol()` 已被移除，请改用普通字符串。
* `String::New()` 已被移除，请改用 `String::NewFromUtf8()`。
* `Persistent` 对象不再继承自 `Handle`，也不能再用另一个对象来实例化。相反，应直接声明 `Persistent`，例如 `Persistent<Type> handle`，然后通过 `handle.Reset(isolate, value)` 为其赋值一个 `Local`。要从 `Persistent` 获取 `Local`，必须将其作为参数进行实例化，即 `Local::New(Isolate*, Persistent)`。

#### Node / io.js

* 更新了 `node::Buffer::New()`，使其直接返回 `Handle`，因此你不再需要获取 `handle_` 属性。
* 更新了 `node::MakeCallback()`，要求将 `Isolate*` 作为第一个参数。一般情况下，`Isolate::GetCurrent()` 在这里是可以的。
