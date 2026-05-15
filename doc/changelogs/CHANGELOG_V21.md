# Node.js 21 更新日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>当前</th>
</tr>
<tr>
<td>
<a href="#21.7.3">21.7.3</a><br/>
<a href="#21.7.2">21.7.2</a><br/>
<a href="#21.7.1">21.7.1</a><br/>
<a href="#21.7.0">21.7.0</a><br/>
<a href="#21.6.2">21.6.2</a><br/>
<a href="#21.6.1">21.6.1</a><br/>
<a href="#21.6.0">21.6.0</a><br/>
<a href="#21.5.0">21.5.0</a><br/>
<a href="#21.4.0">21.4.0</a><br/>
<a href="#21.3.0">21.3.0</a><br/>
<a href="#21.2.0">21.2.0</a><br/>
<a href="#21.1.0">21.1.0</a><br/>
<a href="#21.0.0">21.0.0</a><br/>
</td>
</tr>
</table>

* 其他版本
  * [26.x](CHANGELOG_V26.md)
  * [25.x](CHANGELOG_V25.md)
  * [24.x](CHANGELOG_V24.md)
  * [23.x](CHANGELOG_V23.md)
  * [22.x](CHANGELOG_V22.md)
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
  * [存档](CHANGELOG_ARCHIVE.md)

<a id="21.7.3"></a>

## 2024-04-10，版本 21.7.3（当前），@RafaelGSS

这是一个安全更新。

### 重要变更

* CVE-2024-27980 - 在 Windows 上未启用 shell 选项时，通过 `child_process.spawn` 的 args 参数进行命令注入

### 提交

* \[[`9095c914ed`](https://github.com/nodejs/node/commit/9095c914ed)] - **src**: 禁止直接启动 .bat 和 .cmd 文件（Ben Noordhuis）[nodejs-private/node-private#562](https://github.com/nodejs-private/node-private/pull/562)

<a id="21.7.2"></a>

## 2024-04-03，版本 21.7.2（当前），@RafaelGSS，由 @marco-ippolito 准备

这是一个安全更新。

### 重要变更

* CVE-2024-27983 - node::http2::Http2Session::\~Http2Session() 中断言失败，导致 HTTP/2 服务器崩溃 -（高）
* CVE-2024-27982 - 通过内容长度混淆进行 HTTP 请求走私 -（中）
* llhttp 版本 9.2.1
* undici 版本 6.11.1

### 提交

* \[[`3dfc10c851`](https://github.com/nodejs/node/commit/3dfc10c851)] - **deps**: 将 undici 更新到 6.11.1（Node.js GitHub Bot）[#52328](https://github.com/nodejs/node/pull/52328)
* \[[`aceea1c5e7`](https://github.com/nodejs/node/commit/aceea1c5e7)] - **deps**: 将 undici 更新到 6.10.2（Node.js GitHub Bot）[#52227](https://github.com/nodejs/node/pull/52227)
* \[[`5f0f96b275`](https://github.com/nodejs/node/commit/5f0f96b275)] - **deps**: 将 llhttp 更新到 9.2.0（Node.js GitHub Bot）[#51719](https://github.com/nodejs/node/pull/51719)
* \[[`1a65e98e22`](https://github.com/nodejs/node/commit/1a65e98e22)] - **http**: 默认不允许在 headers 中使用 OBS fold（Paolo Insogna）[nodejs-private/node-private#556](https://github.com/nodejs-private/node-private/pull/556)
* \[[`3bd39fb474`](https://github.com/nodejs/node/commit/3bd39fb474)] - **src**: 确保在销毁 session 时关闭流（RafaelGSS）[nodejs-private/node-private#561](https://github.com/nodejs-private/node-private/pull/561)

<a id="21.7.1"></a>

## 2024-03-08，版本 21.7.1（当前），@targos

### 重要变更

此版本回退了 [#51389](https://github.com/nodejs/node/pull/51389)，该变更已在 Node.js 21.7.0 中上线。文档中已说明，即使测试没有子测试，`t.after()` 钩子也会运行。该钩子可用于清理测试本身。

### 提交

* \[[`0dfe810ac7`](https://github.com/nodejs/node/commit/0dfe810ac7)] - **benchmark**: 更新 benchmark/async\_hooks/async-local- 的迭代次数（Lei Shi）[#51420](https://github.com/nodejs/node/pull/51420)
* \[[`625c9e0ac9`](https://github.com/nodejs/node/commit/625c9e0ac9)] - **benchmark**: 更新 benchmark/domain/domain-fn-args.js 的迭代次数（Lei Shi）[#51408](https://github.com/nodejs/node/pull/51408)
* \[[`7ff3551bad`](https://github.com/nodejs/node/commit/7ff3551bad)] - **build**: 修复 GN 中 arm64 主机交叉编译（Cheng Zhao）[#51903](https://github.com/nodejs/node/pull/51903)
* \[[`fd86ea8b71`](https://github.com/nodejs/node/commit/fd86ea8b71)] - _**回退**_ "**build**: node-core-utils 的临时解决方案"（Richard Lau）[#51975](https://github.com/nodejs/node/pull/51975)
* \[[`23c32ab3a7`](https://github.com/nodejs/node/commit/23c32ab3a7)] - **build**: 在 `Makefile` 中遵循 `NODE` 环境变量（Antoine du Hamel）[#51743](https://github.com/nodejs/node/pull/51743)
* \[[`9617adc064`](https://github.com/nodejs/node/commit/9617adc064)] - _**回退**_ "**build**: 修复 GN 构建中 cares 的警告"（Luigi Pinca）[#51865](https://github.com/nodejs/node/pull/51865)
* \[[`5864534095`](https://github.com/nodejs/node/commit/5864534095)] - **deps**: 将 nghttp2 更新到 1.60.0（Node.js GitHub Bot）[#51948](https://github.com/nodejs/node/pull/51948)
* \[[`fcf235d623`](https://github.com/nodejs/node/commit/fcf235d623)] - **doc**: 为分发添加策略（Geoffrey Booth）[#51918](https://github.com/nodejs/node/pull/51918)
* \[[`87d2acc8b1`](https://github.com/nodejs/node/commit/87d2acc8b1)] - **doc**: 修复 events 中示例的实际结果不同的问题（Deokjin Kim）[#51925](https://github.com/nodejs/node/pull/51925)
* \[[`5908c121c6`](https://github.com/nodejs/node/commit/5908c121c6)] - **doc**: 明确 Corepack 威胁模型（Antoine du Hamel）[#51917](https://github.com/nodejs/node/pull/51917)
* \[[`20e0ba3b94`](https://github.com/nodejs/node/commit/20e0ba3b94)] - **doc,module**: 明确钩子链执行顺序（Jacob Smith）[#51884](https://github.com/nodejs/node/pull/51884)
* \[[`4d997971ac`](https://github.com/nodejs/node/commit/4d997971ac)] - **lib**: 确保关闭 net server（theanarkh）[#51929](https://github.com/nodejs/node/pull/51929)
* \[[`fcc6d54aa3`](https://github.com/nodejs/node/commit/fcc6d54aa3)] - **lib**: 如果 udp socket 在 lookup 前关闭则直接返回（theanarkh）[#51914](https://github.com/nodejs/node/pull/51914)
* \[[`10aaabd158`](https://github.com/nodejs/node/commit/10aaabd158)] - **meta**: 将 github/codeql-action 从 3.23.2 升级到 3.24.6（dependabot\[bot]）[#51942](https://github.com/nodejs/node/pull/51942)
* \[[`78f38a0143`](https://github.com/nodejs/node/commit/78f38a0143)] - **meta**: 将 actions/upload-artifact 从 4.3.0 升级到 4.3.1（dependabot\[bot]）[#51941](https://github.com/nodejs/node/pull/51941)
* \[[`42ca5452c4`](https://github.com/nodejs/node/commit/42ca5452c4)] - **meta**: 将 codecov/codecov-action 从 4.0.1 升级到 4.1.0（dependabot\[bot]）[#51940](https://github.com/nodejs/node/pull/51940)
* \[[`015a157375`](https://github.com/nodejs/node/commit/015a157375)] - **meta**: 将 actions/cache 从 4.0.0 升级到 4.0.1（dependabot\[bot]）[#51939](https://github.com/nodejs/node/pull/51939)
* \[[`e476cb4a32`](https://github.com/nodejs/node/commit/e476cb4a32)] - **meta**: 将 actions/download-artifact 从 4.1.1 升级到 4.1.3（dependabot\[bot]）[#51938](https://github.com/nodejs/node/pull/51938)
* \[[`67e8001790`](https://github.com/nodejs/node/commit/67e8001790)] - **meta**: 将 actions/setup-node 从 4.0.1 升级到 4.0.2（dependabot\[bot]）[#51937](https://github.com/nodejs/node/pull/51937)
* \[[`50343636e8`](https://github.com/nodejs/node/commit/50343636e8)] - **src**: 修复 --disable-single-executable-application（Joyee Cheung）[#51808](https://github.com/nodejs/node/pull/51808)
* \[[`a48c9ca0db`](https://github.com/nodejs/node/commit/a48c9ca0db)] - **stream**: 不要通过一个 microtick 延迟构造（Matteo Collina）[#52005](https://github.com/nodejs/node/pull/52005)
* \[[`bee3b364f9`](https://github.com/nodejs/node/commit/bee3b364f9)] - **test**: 为 test_runner after 钩子添加回归测试（Colin Ihrig）[#51998](https://github.com/nodejs/node/pull/51998)
* \[[`fff7f48f50`](https://github.com/nodejs/node/commit/fff7f48f50)] - **test**: 降低 `test-runner-output` 的不稳定性（Antoine du Hamel）[#51952](https://github.com/nodejs/node/pull/51952)
* \[[`57ba8f5acb`](https://github.com/nodejs/node/commit/57ba8f5acb)] - **test**: 修复 flaky 的 http-chunk-extensions-limit 测试（Ethan Arrowood）[#51943](https://github.com/nodejs/node/pull/51943)
* \[[`9d2c03990a`](https://github.com/nodejs/node/commit/9d2c03990a)] - **test**: 移除 flaky 标记（Luigi Pinca）[#51736](https://github.com/nodejs/node/pull/51736)
* \[[`e992af81d3`](https://github.com/nodejs/node/commit/e992af81d3)] - **test**: 当 SEA 生成失败时跳过 SEA 测试（Joyee Cheung）[#51887](https://github.com/nodejs/node/pull/51887)
* \[[`85aa6ca850`](https://github.com/nodejs/node/commit/85aa6ca850)] - _**回退**_ "**test_runner**: 当测试为空时不要调用 after 钩子"（Colin Ihrig）[#51998](https://github.com/nodejs/node/pull/51998)

<a id="21.7.0"></a>

## 2024-03-06，版本 21.7.0（当前），@RafaelGSS，由 @marco-ippolito 准备

### 文本样式

* `util.styleText(format, text)`：此函数会根据传入的 `format` 返回格式化文本。

一个新的 API 已创建，用于基于 `util.inspect.colors` 格式化文本，使你可以用不同颜色（例如红色、蓝色等）以及强调样式（斜体、粗体等）来设置文本样式。

```cjs
const { styleText } = require('node:util');
const errorMessage = styleText('red', 'Error! Error!');
console.log(errorMessage);
```

由 Rafael Gonzaga 和 Hemanth HM 贡献，见 [#51850](https://github.com/nodejs/node/pull/51850)。

### 加载和解析环境变量

* `process.loadEnvFile(path)`：
  * 使用此函数加载 `.env` 文件。如果未指定路径，它会自动加载当前目录中的 .env 文件。示例：`process.loadEnvFile()`。
  * 通过指定路径加载特定的 .env 文件。示例：`process.loadEnvFile('./development.env')`。

* `util.parseEnv(content)`：
  * 使用此函数解析一个包含环境变量赋值的现有字符串。
  * 示例用法：`require('node:util').parseEnv('HELLO=world')`。

由 Yagiz Nizipli 贡献，见 [#51476](https://github.com/nodejs/node/pull/51476)

### 支持 `.env` 文件中的多行值

Node.js 21.7.0 现在支持 .env 文件中的多行值：

```text
MULTI_LINE="HELLO
WORLD"
```

由 Ilyas Shabi 贡献 [#51289](https://github.com/nodejs/node/pull/51289)

### sea：支持嵌入资源

用户现在可以通过在配置中添加一个键路径字典作为 `assets` 字段来包含资源。在构建时，Node.js 会从指定路径读取资源，并将其打包到准备 blob 中。在生成的可执行文件中，用户可以使用 `sea.getAsset()` 和 `sea.getAssetAsBlob()` API 获取这些资源。

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

单文件可执行应用可以按如下方式访问这些资源：

```cjs
const { getAsset } = require('node:sea');
// 以 ArrayBuffer 的形式返回数据副本
const image = getAsset('a.jpg');
// 返回从资源中以 UTF8 解码的字符串。
const text = getAsset('b.txt', 'utf8');
// 返回一个包含该资源且不进行拷贝的 Blob。
const blob = getAssetAsBlob('a.jpg');
```

由 Joyee Cheung 贡献，见 [#50960](https://github.com/nodejs/node/pull/50960)

### vm：支持使用默认加载器处理动态 import()

此补丁增加了支持，将 `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER` 作为所有接受 `importModuleDynamically` 选项的 vm API 中的 `importModuleDynamically` 选项使用，但 `vm.SourceTextModule` 除外。这让用户在不需要自定义加载过程时，可以通过快捷方式在已编译代码中支持动态 `import()`，且不会丢失编译缓存。我们会在 `import()` 实际通过此选项由默认加载器处理时发出实验性警告，而不要求使用 `--experimental-vm-modules`。

```js
const { Script, constants } = require('node:vm');
const { resolve } = require('node:path');
const { writeFileSync } = require('node:fs');

// 将 test.js 和 test.txt 写入当前正在运行的脚本所在的目录。
writeFileSync(resolve(__dirname, 'test.mjs'),
              'export const filename = "./test.json";');
writeFileSync(resolve(__dirname, 'test.json'),
              '{"hello": "world"}');

// 编译一个脚本，使其先加载 test.mjs，随后加载 test.json，
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

由 Joyee Cheung 贡献，见 [#51244](https://github.com/nodejs/node/pull/51244)

### crypto：实现 crypto.hash()

此补丁引入了一个辅助函数 crypto.hash()，可一次性从输入计算摘要。对于较小的输入（<= 5MB），如果数据已可直接获取（不是流式传输），其速度可比基于对象的 createHash() 快 1.2 到 2 倍，并且由于不会创建中间对象，内存开销更小。

```js
const crypto = require('node:crypto');

// 对字符串进行哈希，并将结果作为十六进制编码字符串返回。
const string = 'Node.js';
// 10b3493287f831e81a438811a1ffba01f8cec4b7
console.log(crypto.hash('sha1', string));
```

由 Joyee Cheung 贡献，见 [#51044](https://github.com/nodejs/node/pull/51044)

### 其他重要变更

* \[[`8ae0eeb7f4`](https://github.com/nodejs/node/commit/8ae0eeb7f4)] - **(SEMVER-MINOR)** **build**: 构建选项，用于设置头文件的本地位置（Michael Dawson）[#51525](https://github.com/nodejs/node/pull/51525)
* \[[`496776cc78`](https://github.com/nodejs/node/commit/496776cc78)] - **crypto**: 将根证书更新到 NSS 3.98（Node.js GitHub Bot）[#51794](https://github.com/nodejs/node/pull/51794)
* \[[`a8c9e6f7e9`](https://github.com/nodejs/node/commit/a8c9e6f7e9)] - **doc**: 将 zcbenz 添加为协作者（Cheng Zhao）[#51812](https://github.com/nodejs/node/pull/51812)
* \[[`adbf2d3837`](https://github.com/nodejs/node/commit/adbf2d3837)] - **doc**: 将 lemire 添加为协作者（Daniel Lemire）[#51572](https://github.com/nodejs/node/pull/51572)
* \[[`4b1c6839f4`](https://github.com/nodejs/node/commit/4b1c6839f4)] - **(SEMVER-MINOR)** **http2**: 为 appendHeader 添加 h2 兼容支持（Tim Perry）[#51412](https://github.com/nodejs/node/pull/51412)
* \[[`d8aa2bac0b`](https://github.com/nodejs/node/commit/d8aa2bac0b)] - **(SEMVER-MINOR)** **http2**: 添加服务器握手工具（snek）[#51172](https://github.com/nodejs/node/pull/51172)
* \[[`b9275d9039`](https://github.com/nodejs/node/commit/b9275d9039)] - **(SEMVER-MINOR)** **http2**: 接收 customsettings（Marten Richter）[#51323](https://github.com/nodejs/node/pull/51323)
* \[[`5a2d2daad5`](https://github.com/nodejs/node/commit/5a2d2daad5)] - **(SEMVER-MINOR)** **lib**: 将 encodingsMap 移动到 internal/util（Joyee Cheung）[#51044](https://github.com/nodejs/node/pull/51044)
* \[[`e8d9065262`](https://github.com/nodejs/node/commit/e8d9065262)] - **(SEMVER-MINOR)** **sea**: 支持 sea.getRawAsset()（Joyee Cheung）[#50960](https://github.com/nodejs/node/pull/50960)
* \[[`47186fbad5`](https://github.com/nodejs/node/commit/47186fbad5)] - **(SEMVER-MINOR)** **src**: 在 BlobDeserializer 中更好地打印字符串内容（Joyee Cheung）[#50960](https://github.com/nodejs/node/pull/50960)
* \[[`119e045053`](https://github.com/nodejs/node/commit/119e045053)] - **(SEMVER-MINOR)** **src**: 不要强制转换 dotenv 路径（Tobias Nießen）[#51425](https://github.com/nodejs/node/pull/51425)
* \[[`9ab353af00`](https://github.com/nodejs/node/commit/9ab353af00)] - **(SEMVER-MINOR)** **stream**: 为 `ReadableStreamBYOBReader.read` 实现 `min` 选项（Mattias Buelens）[#50888](https://github.com/nodejs/node/pull/50888)

### 提交

* \[[`4ddb9b33d5`](https://github.com/nodejs/node/commit/4ddb9b33d5)] - **async\_hooks,inspector**: 在不使用 async\_wrap 的情况下实现 inspector API (Gabriel Bota) [#51501](https://github.com/nodejs/node/pull/51501)
* \[[`7e06c11f55`](https://github.com/nodejs/node/commit/7e06c11f55)] - **benchmark**: 更新 assert/deepequal-typedarrays.js 的迭代次数 (Lei Shi) [#51419](https://github.com/nodejs/node/pull/51419)
* \[[`72be232006`](https://github.com/nodejs/node/commit/72be232006)] - **benchmark**: 更新 benchmark/assert/deepequal-map.js 的迭代次数 (Lei Shi) [#51416](https://github.com/nodejs/node/pull/51416)
* \[[`92e7c310cb`](https://github.com/nodejs/node/commit/92e7c310cb)] - **benchmark**: 将 startup.js 重命名为 startup-core.js (Joyee Cheung) [#51669](https://github.com/nodejs/node/pull/51669)
* \[[`c9ada533a2`](https://github.com/nodejs/node/commit/c9ada533a2)] - **build**: 移除 Android 兼容性所需的 `librt` 库链接 (BuShe Pie) [#51632](https://github.com/nodejs/node/pull/51632)
* \[[`86ac787889`](https://github.com/nodejs/node/commit/86ac787889)] - **build**: 在 GN 构建中不依赖 gn\_helpers (Cheng Zhao) [#51439](https://github.com/nodejs/node/pull/51439)
* \[[`9be6b7ccf0`](https://github.com/nodejs/node/commit/9be6b7ccf0)] - **build**: 修复 GN 构建中 cares 的警告 (Cheng Zhao) [#51687](https://github.com/nodejs/node/pull/51687)
* \[[`d1a8c2e989`](https://github.com/nodejs/node/commit/d1a8c2e989)] - **build**: 修复使用 GN 构建 js2c (Cheng Zhao) [#51818](https://github.com/nodejs/node/pull/51818)
* \[[`9840715dc0`](https://github.com/nodejs/node/commit/9840715dc0)] - **build**: 在 JS2C 中将非 ASCII 的 Latin1 字符编码为一个字节 (Joyee Cheung) [#51605](https://github.com/nodejs/node/pull/51605)
* \[[`8ae0eeb7f4`](https://github.com/nodejs/node/commit/8ae0eeb7f4)] - **(SEMVER-MINOR)** **build**: 构建选项以设置头文件的本地位置 (Michael Dawson) [#51525](https://github.com/nodejs/node/pull/51525)
* \[[`1999719877`](https://github.com/nodejs/node/commit/1999719877)] - **build**: 使用 macOS m1 机器进行测试 (Yagiz Nizipli) [#51620](https://github.com/nodejs/node/pull/51620)
* \[[`85f63f3d7d`](https://github.com/nodejs/node/commit/85f63f3d7d)] - **build**: 在移除 %config% 链接前进行检查 (liudonghua) [#51437](https://github.com/nodejs/node/pull/51437)
* \[[`cc37959232`](https://github.com/nodejs/node/commit/cc37959232)] - **build**: 增加 github 中的并行执行数 (Yagiz Nizipli) [#51554](https://github.com/nodejs/node/pull/51554)
* \[[`2921d55121`](https://github.com/nodejs/node/commit/2921d55121)] - **build**: 移除 node.gni 中的版权头 (Cheng Zhao) [#51535](https://github.com/nodejs/node/pull/51535)
* \[[`9da0926396`](https://github.com/nodejs/node/commit/9da0926396)] - **build**: 更新 ngtcp2 的 GN 构建文件 (Cheng Zhao) [#51313](https://github.com/nodejs/node/pull/51313)
* \[[`59117317f3`](https://github.com/nodejs/node/commit/59117317f3)] - **build,tools**: 使 addons 测试可与 GN 一起工作 (Cheng Zhao) [#50737](https://github.com/nodejs/node/pull/50737)
* \[[`78c226281c`](https://github.com/nodejs/node/commit/78c226281c)] - **(SEMVER-MINOR)** **crypto**: 实现 crypto.hash() (Joyee Cheung) [#51044](https://github.com/nodejs/node/pull/51044)
* \[[`496776cc78`](https://github.com/nodejs/node/commit/496776cc78)] - **crypto**: 将根证书更新到 NSS 3.98 (Node.js GitHub Bot) [#51794](https://github.com/nodejs/node/pull/51794)
* \[[`17c554f1ca`](https://github.com/nodejs/node/commit/17c554f1ca)] - **crypto**: 对哈希使用 EVP\_MD\_fetch 并缓存 EVP\_MD (Joyee Cheung) [#51034](https://github.com/nodejs/node/pull/51034)
* \[[`014cc53541`](https://github.com/nodejs/node/commit/014cc53541)] - **deps**: 将 npm 升级到 10.5.0 (npm team) [#51913](https://github.com/nodejs/node/pull/51913)
* \[[`4ebb944800`](https://github.com/nodejs/node/commit/4ebb944800)] - **deps**: 将 undici 更新到 6.6.2 (Michaël Zasso) [#51667](https://github.com/nodejs/node/pull/51667)
* \[[`3b29dff0ed`](https://github.com/nodejs/node/commit/3b29dff0ed)] - **deps**: 将 ngtcp2 更新到 1.3.0 (Node.js GitHub Bot) [#51796](https://github.com/nodejs/node/pull/51796)
* \[[`28c0ffb363`](https://github.com/nodejs/node/commit/28c0ffb363)] - **deps**: 将 simdjson 更新到 3.7.0 (Daniel Lemire) [#51859](https://github.com/nodejs/node/pull/51859)
* \[[`58b1403693`](https://github.com/nodejs/node/commit/58b1403693)] - **deps**: 将 corepack 更新到 0.25.2 (Node.js GitHub Bot) [#51810](https://github.com/nodejs/node/pull/51810)
* \[[`c7083720cc`](https://github.com/nodejs/node/commit/c7083720cc)] - **deps**: 将 c-ares 更新到 1.27.0 (Node.js GitHub Bot) [#51846](https://github.com/nodejs/node/pull/51846)
* \[[`6d2699d40b`](https://github.com/nodejs/node/commit/6d2699d40b)] - **deps**: 将时区数据更新到 2024a (Michaël Zasso) [#51723](https://github.com/nodejs/node/pull/51723)
* \[[`8d2222714d`](https://github.com/nodejs/node/commit/8d2222714d)] - **deps**: 将 icu 更新到 74.2 (Michaël Zasso) [#51723](https://github.com/nodejs/node/pull/51723)
* \[[`c3dbd7cccd`](https://github.com/nodejs/node/commit/c3dbd7cccd)] - **deps**: 将 c-ares 更新到 1.26.0 (Node.js GitHub Bot) [#51582](https://github.com/nodejs/node/pull/51582)
* \[[`dfc3811056`](https://github.com/nodejs/node/commit/dfc3811056)] - **deps**: 将 googletest 更新到 6a59382 (Node.js GitHub Bot) [#51580](https://github.com/nodejs/node/pull/51580)
* \[[`8235c2676e`](https://github.com/nodejs/node/commit/8235c2676e)] - **deps**: 将 nghttp2 更新到 1.59.0 (Node.js GitHub Bot) [#51581](https://github.com/nodejs/node/pull/51581)
* \[[`2ad665e24f`](https://github.com/nodejs/node/commit/2ad665e24f)] - **deps**: V8: 挑选提交 efb1133eb894 (Joyee Cheung) [#51551](https://github.com/nodejs/node/pull/51551)
* \[[`e5db8d416f`](https://github.com/nodejs/node/commit/e5db8d416f)] - **deps**: 将 corepack 更新到 0.24.1 (Node.js GitHub Bot) [#51459](https://github.com/nodejs/node/pull/51459)
* \[[`fe597de72e`](https://github.com/nodejs/node/commit/fe597de72e)] - **deps**: 将 ada 更新到 2.7.6 (Node.js GitHub Bot) [#51542](https://github.com/nodejs/node/pull/51542)
* \[[`5aca6f54f9`](https://github.com/nodejs/node/commit/5aca6f54f9)] - **deps**: 将 ada 更新到 2.7.5 (Node.js GitHub Bot) [#51542](https://github.com/nodejs/node/pull/51542)
* \[[`8f63f6ff57`](https://github.com/nodejs/node/commit/8f63f6ff57)] - **deps**: 将 ngtcp2 更新到 1.2.0 (Node.js GitHub Bot) [#51584](https://github.com/nodejs/node/pull/51584)
* \[[`a04aa36ce8`](https://github.com/nodejs/node/commit/a04aa36ce8)] - **deps**: 将 googletest 更新到 7c07a86 (Node.js GitHub Bot) [#51458](https://github.com/nodejs/node/pull/51458)
* \[[`4b1d25b68d`](https://github.com/nodejs/node/commit/4b1d25b68d)] - **deps**: 将 ngtcp2 更新到 1.1.0 (Node.js GitHub Bot) [#51319](https://github.com/nodejs/node/pull/51319)
* \[[`682f4f67b0`](https://github.com/nodejs/node/commit/682f4f67b0)] - **deps**: 将 acorn-walk 更新到 8.3.2 (Node.js GitHub Bot) [#51457](https://github.com/nodejs/node/pull/51457)
* \[[`365a9dc2cb`](https://github.com/nodejs/node/commit/365a9dc2cb)] - **deps**: 将时区数据更新到 2023d (Node.js GitHub Bot) [#51461](https://github.com/nodejs/node/pull/51461)
* \[[`40e8b362a2`](https://github.com/nodejs/node/commit/40e8b362a2)] - **deps**: 将 base64 更新到 0.5.2 (Node.js GitHub Bot) [#51455](https://github.com/nodejs/node/pull/51455)
* \[[`139a626264`](https://github.com/nodejs/node/commit/139a626264)] - **deps**: 使用 C11 支持编译 c-ares (Michaël Zasso) [#51410](https://github.com/nodejs/node/pull/51410)
* \[[`1cc37c4355`](https://github.com/nodejs/node/commit/1cc37c4355)] - **deps**: 将 npm 升级到 10.3.0 (npm team) [#51431](https://github.com/nodejs/node/pull/51431)
* \[[`942e10f5b5`](https://github.com/nodejs/node/commit/942e10f5b5)] - **deps**: 将 c-ares 更新到 1.25.0 (Node.js GitHub Bot) [#51385](https://github.com/nodejs/node/pull/51385)
* \[[`17cb4af5a9`](https://github.com/nodejs/node/commit/17cb4af5a9)] - **deps**: 将 uvwasi 更新到 0.0.20 并修正测试 (Michael Dawson) [#51355](https://github.com/nodejs/node/pull/51355)
* \[[`76582e434c`](https://github.com/nodejs/node/commit/76582e434c)] - **deps**: 将 nghttp3/\*\*/.deps 添加到 .gitignore (Luigi Pinca) [#51400](https://github.com/nodejs/node/pull/51400)
* \[[`4a889e8ea3`](https://github.com/nodejs/node/commit/4a889e8ea3)] - **doc**: 为 crypto.hash() 添加稳定性索引 (Joyee Cheung) [#51978](https://github.com/nodejs/node/pull/51978)
* \[[`3fdaeba9e6`](https://github.com/nodejs/node/commit/3fdaeba9e6)] - **doc**: 移除破坏句子的多余反引号 (JounQin) [#51904](https://github.com/nodejs/node/pull/51904)
* \[[`58747734a2`](https://github.com/nodejs/node/commit/58747734a2)] - **doc**: 将 node-api/node-addon-api team 链接更新为 sharing project news (Ulises Gascón) [#51877](https://github.com/nodejs/node/pull/51877)
* \[[`2cdfe35437`](https://github.com/nodejs/node/commit/2cdfe35437)] - **doc**: 添加 website team 到 sharing project news (Ulises Gascón) [#49002](https://github.com/nodejs/node/pull/49002)
* \[[`db30428f06`](https://github.com/nodejs/node/commit/db30428f06)] - **doc**: 更新 Event Loop 的指南链接 (Shrujal Shah) [#51874](https://github.com/nodejs/node/pull/51874)
* \[[`a5a17a18e3`](https://github.com/nodejs/node/commit/a5a17a18e3)] - **doc**: 将 `ExperimentalWarnings` 改为 `ExperimentalWarning` (Ameet Kaustav) [#51741](https://github.com/nodejs/node/pull/51741)
* \[[`32d92aca1f`](https://github.com/nodejs/node/commit/32d92aca1f)] - **doc**: 将 Paolo 添加到 TSC 成员中 (Michael Dawson) [#51825](https://github.com/nodejs/node/pull/51825)
* \[[`2de1e85268`](https://github.com/nodejs/node/commit/2de1e85268)] - **doc**: 为 Electron 30 保留 123 (Keeley Hammond) [#51803](https://github.com/nodejs/node/pull/51803)
* \[[`ad8cefcbf1`](https://github.com/nodejs/node/commit/ad8cefcbf1)] - **doc**: 增加对 GPG\_TTY 的提及 (Rafael Gonzaga) [#51806](https://github.com/nodejs/node/pull/51806)
* \[[`a8c9e6f7e9`](https://github.com/nodejs/node/commit/a8c9e6f7e9)] - **doc**: 将 zcbenz 添加到 collaborators (Cheng Zhao) [#51812](https://github.com/nodejs/node/pull/51812)
* \[[`4e0c79bea9`](https://github.com/nodejs/node/commit/4e0c79bea9)] - **doc**: 为 stewards 添加条目 (Rafael Gonzaga) [#51760](https://github.com/nodejs/node/pull/51760)
* \[[`7fa30812ea`](https://github.com/nodejs/node/commit/7fa30812ea)] - **doc**: 更新 2023 年技术优先事项 (Jean Burellier) [#47523](https://github.com/nodejs/node/pull/47523)
* \[[`af6b5b1722`](https://github.com/nodejs/node/commit/af6b5b1722)] - **doc**: 标记 isWebAssemblyCompiledModule 为生命周期结束 (Marco Ippolito) [#51442](https://github.com/nodejs/node/pull/51442)
* \[[`a62f69ecad`](https://github.com/nodejs/node/commit/a62f69ecad)] - **doc**: 修复 `globals.md` 的介绍 (Antoine du Hamel) [#51742](https://github.com/nodejs/node/pull/51742)
* \[[`519dc8aad6`](https://github.com/nodejs/node/commit/519dc8aad6)] - **doc**: 为更好的 json 生成进行更新 (Dmitry Semigradsky) [#51592](https://github.com/nodejs/node/pull/51592)
* \[[`1b45ca4e38`](https://github.com/nodejs/node/commit/1b45ca4e38)] - **doc**: 为 GN 构建编写文档 (Cheng Zhao) [#51676](https://github.com/nodejs/node/pull/51676)
* \[[`37182c4c1f`](https://github.com/nodejs/node/commit/37182c4c1f)] - **doc**: 修复未捕获异常示例 (Gabriel Schulhof) [#51638](https://github.com/nodejs/node/pull/51638)
* \[[`c9be260b7d`](https://github.com/nodejs/node/commit/c9be260b7d)] - **doc**: 澄清测试套件完成时 `after` 钩子的执行 (Ognjen Jevremović) [#51523](https://github.com/nodejs/node/pull/51523)
* \[[`8c0a257021`](https://github.com/nodejs/node/commit/8c0a257021)] - **doc**: 修复 `dns.lookup` 和 `dnsPromises.lookup` 的描述 (Duncan Chiu) [#51517](https://github.com/nodejs/node/pull/51517)
* \[[`177e13cb0d`](https://github.com/nodejs/node/commit/177e13cb0d)] - **doc**: 指出 path.normalize 偏离 POSIX (Tobias Nießen) [#51513](https://github.com/nodejs/node/pull/51513)
* \[[`adbf2d3837`](https://github.com/nodejs/node/commit/adbf2d3837)] - **doc**: 将 lemire 添加到 collaborators (Daniel Lemire) [#51572](https://github.com/nodejs/node/pull/51572)
* \[[`fd2a3cef57`](https://github.com/nodejs/node/commit/fd2a3cef57)] - **doc**: 修复历史上的 experimental fetch 标志 (Kenrick) [#51506](https://github.com/nodejs/node/pull/51506)
* \[[`1d40a0067a`](https://github.com/nodejs/node/commit/1d40a0067a)] - **doc**: 修复 connectionAttempt 参数类型 (Rafael Gonzaga) [#51490](https://github.com/nodejs/node/pull/51490)
* \[[`d3b78051ce`](https://github.com/nodejs/node/commit/d3b78051ce)] - **doc**: 移除对已解决的 child_process v8 问题的引用 (Ian Kerins) [#51467](https://github.com/nodejs/node/pull/51467)
* \[[`2bf371886a`](https://github.com/nodejs/node/commit/2bf371886a)] - **doc**: 更新拼写错误 (Aranđel Šarenac) [#51475](https://github.com/nodejs/node/pull/51475)
* \[[`10f95283c6`](https://github.com/nodejs/node/commit/10f95283c6)] - **doc**: 添加关于 inspector 断点的说明 (Chengzhong Wu) [#51417](https://github.com/nodejs/node/pull/51417)
* \[[`4ea194ab33`](https://github.com/nodejs/node/commit/4ea194ab33)] - **doc**: 在 `offboarding.md` 中添加链接 (Antoine du Hamel) [#51440](https://github.com/nodejs/node/pull/51440)
* \[[`fc5629616b`](https://github.com/nodejs/node/commit/fc5629616b)] - **doc**: 修复拼写错误 (u9g) [#51454](https://github.com/nodejs/node/pull/51454)
* \[[`70e88cf159`](https://github.com/nodejs/node/commit/70e88cf159)] - **doc**: 添加安全回退检查 (Michael Dawson) [#51376](https://github.com/nodejs/node/pull/51376)
* \[[`74d4e382a7`](https://github.com/nodejs/node/commit/74d4e382a7)] - **doc**: 修复一些 policy scope 的拼写错误 (Tim Kuijsten) [#51234](https://github.com/nodejs/node/pull/51234)
* \[[`d7658ca6a2`](https://github.com/nodejs/node/commit/d7658ca6a2)] - **doc**: 改进子测试文档 (Marco Ippolito) [#51379](https://github.com/nodejs/node/pull/51379)
* \[[`c18a813638`](https://github.com/nodejs/node/commit/c18a813638)] - **doc**: 在 `child_process.md` 中添加缺失的词语 (Joseph Joy) [#50370](https://github.com/nodejs/node/pull/50370)
* \[[`fabd5c4b21`](https://github.com/nodejs/node/commit/fabd5c4b21)] - **doc**: 修正警告小节的对齐 (James M Snell) [#51374](https://github.com/nodejs/node/pull/51374)
* \[[`80c750c8c1`](https://github.com/nodejs/node/commit/80c750c8c1)] - **doc,crypto**: 进一步澄清 RSA\_PKCS1\_PADDING 支持 (Tobias Nießen) [#51799](https://github.com/nodejs/node/pull/51799)
* \[[`b53919d988`](https://github.com/nodejs/node/commit/b53919d988)] - **doc,crypto**: 添加变更日志并说明已禁用的 RSA\_PKCS1\_PADDING (Filip Skokan) [#51782](https://github.com/nodejs/node/pull/51782)
* \[[`08832e76d3`](https://github.com/nodejs/node/commit/08832e76d3)] - **esm**: 改进从 `data:` URL 调用 `import.meta.resolve` 时的错误信息 (Antoine du Hamel) [#49516](https://github.com/nodejs/node/pull/49516)
* \[[`78f818069a`](https://github.com/nodejs/node/commit/78f818069a)] - **events**: 在 cancelBubble 中不调用 stopPropagation (mert.altin) [#50405](https://github.com/nodejs/node/pull/50405)
* \[[`f130a33438`](https://github.com/nodejs/node/commit/f130a33438)] - _**Revert**_ "**fs**: 移除 `esm` 包的 workaround" (Jeremy Meng) [#50907](https://github.com/nodejs/node/pull/50907)
* \[[`5a8af3d362`](https://github.com/nodejs/node/commit/5a8af3d362)] - **fs**: 在 fs/promises 中延迟加载 rimraf (Joyee Cheung) [#51617](https://github.com/nodejs/node/pull/51617)
* \[[`15a7f2103b`](https://github.com/nodejs/node/commit/15a7f2103b)] - **fs**: 移除 Linux 上递归 watch 的竞态条件 (Matteo Collina) [#51406](https://github.com/nodejs/node/pull/51406)
* \[[`d8bb4b2c1e`](https://github.com/nodejs/node/commit/d8bb4b2c1e)] - **fs**: 更新 `filehandle.createWriteStream` 和 `appendFile` 的 jsdoc (Jungku Lee) [#51494](https://github.com/nodejs/node/pull/51494)
* \[[`e8fffebdd3`](https://github.com/nodejs/node/commit/e8fffebdd3)] - **fs,test**: 为 fs.watch 添加 URL 到字符串转换 (Rafael Gonzaga) [#51346](https://github.com/nodejs/node/pull/51346)
* \[[`ec17fd73cc`](https://github.com/nodejs/node/commit/ec17fd73cc)] - **http**: 修复文档与实现之间 `close` 返回值不匹配的问题 (kylo5aby) [#51797](https://github.com/nodejs/node/pull/51797)
* \[[`b8e7a87aa9`](https://github.com/nodejs/node/commit/b8e7a87aa9)] - **http**: 在使用 setHeaders 时拆分 set-cookie (Marco Ippolito) [#51649](https://github.com/nodejs/node/pull/51649)
* \[[`682951af60`](https://github.com/nodejs/node/commit/682951af60)] - **http2**: 当 allowHTTP1 为 true 时关闭空闲连接 (xsbchen) [#51569](https://github.com/nodejs/node/pull/51569)
* \[[`4b1c6839f4`](https://github.com/nodejs/node/commit/4b1c6839f4)] - **(SEMVER-MINOR)** **http2**: 为 appendHeader 添加 h2 兼容支持 (Tim Perry) [#51412](https://github.com/nodejs/node/pull/51412)
* \[[`d8aa2bac0b`](https://github.com/nodejs/node/commit/d8aa2bac0b)] - **(SEMVER-MINOR)** **http2**: 添加服务器握手工具 (snek) [#51172](https://github.com/nodejs/node/pull/51172)
* \[[`b9275d9039`](https://github.com/nodejs/node/commit/b9275d9039)] - **(SEMVER-MINOR)** **http2**: 接收 customsettings (Marten Richter) [#51323](https://github.com/nodejs/node/pull/51323)
* \[[`58e2015a03`](https://github.com/nodejs/node/commit/58e2015a03)] - **inspector**: 添加 NodeRuntime.waitingForDebugger 事件 (mary marchini) [#51560](https://github.com/nodejs/node/pull/51560)
* \[[`af32d433ee`](https://github.com/nodejs/node/commit/af32d433ee)] - **lib**: 考虑 snapshot 序列化回调中的 cwd 访问 (Anna Henningsen) [#51901](https://github.com/nodejs/node/pull/51901)
* \[[`1edbc7d353`](https://github.com/nodejs/node/commit/1edbc7d353)] - **lib**: 修复 http 客户端 socket 路径 (theanarkh) [#51900](https://github.com/nodejs/node/pull/51900)
* \[[`4dfc9e092e`](https://github.com/nodejs/node/commit/4dfc9e092e)] - **lib**: 仅在需要时为内建模块构建 ESM 门面 (Joyee Cheung) [#51669](https://github.com/nodejs/node/pull/51669)
* \[[`5a2d2daad5`](https://github.com/nodejs/node/commit/5a2d2daad5)] - **(SEMVER-MINOR)** **lib**: 将 encodingsMap 移到 internal/util (Joyee Cheung) [#51044](https://github.com/nodejs/node/pull/51044)
* \[[`eb1089ab17`](https://github.com/nodejs/node/commit/eb1089ab17)] - **lib**: 在构建时不访问 process.noDeprecation (Joyee Cheung) [#51447](https://github.com/nodejs/node/pull/51447)
* \[[`614ca327c8`](https://github.com/nodejs/node/commit/614ca327c8)] - **lib**: 为用户 ESM 执行添加断言 (Joyee Cheung) [#51748](https://github.com/nodejs/node/pull/51748)
* \[[`77ae03f723`](https://github.com/nodejs/node/commit/77ae03f723)] - **lib**: 在 snapshot 构建时创建全局 console 属性 (Joyee Cheung) [#51700](https://github.com/nodejs/node/pull/51700)
* \[[`7f698f064e`](https://github.com/nodejs/node/commit/7f698f064e)] - **lib**: 在内置 snapshot 中定义 FormData、fetch 等 (Joyee Cheung) [#51598](https://github.com/nodejs/node/pull/51598)
* \[[`4b583bfcc5`](https://github.com/nodejs/node/commit/4b583bfcc5)] - **lib**: 允许从 afterEach 检查测试结果 (Tim Stableford) [#51485](https://github.com/nodejs/node/pull/51485)
* \[[`ec60639cc0`](https://github.com/nodejs/node/commit/ec60639cc0)] - **lib**: 移除不必要的 refreshHrtimeBuffer() (Joyee Cheung) [#51446](https://github.com/nodejs/node/pull/51446)
* \[[`8dc3f91eb4`](https://github.com/nodejs/node/commit/8dc3f91eb4)] - **lib,src**: 从模块中提取 sourceMappingURL (unbyte) [#51690](https://github.com/nodejs/node/pull/51690)
* \[[`84c71fa895`](https://github.com/nodejs/node/commit/84c71fa895)] - **meta**: 将一位或多位协作者移至 emeritus (Node.js GitHub Bot) [#51726](https://github.com/nodejs/node/pull/51726)
* \[[`e5c52a2a6b`](https://github.com/nodejs/node/commit/e5c52a2a6b)] - **meta**: 将 codecov/codecov-action 从 3.1.4 升级到 4.0.1 (dependabot\[bot]) [#51648](https://github.com/nodejs/node/pull/51648)
* \[[`16aa6e5341`](https://github.com/nodejs/node/commit/16aa6e5341)] - **meta**: 将 actions/download-artifact 从 4.1.0 升级到 4.1.1 (dependabot\[bot]) [#51644](https://github.com/nodejs/node/pull/51644)
* \[[`97825603ae`](https://github.com/nodejs/node/commit/97825603ae)] - **meta**: 将 actions/upload-artifact 从 4.0.0 升级到 4.3.0 (dependabot\[bot]) [#51643](https://github.com/nodejs/node/pull/51643)
* \[[`51f0d80876`](https://github.com/nodejs/node/commit/51f0d80876)] - **meta**: 将 step-security/harden-runner 从 2.6.1 升级到 2.7.0 (dependabot\[bot]) [#51641](https://github.com/nodejs/node/pull/51641)
* \[[`97e3cb5844`](https://github.com/nodejs/node/commit/97e3cb5844)] - **meta**: 将 actions/cache 从 3.3.2 升级到 4.0.0 (dependabot\[bot]) [#51640](https://github.com/nodejs/node/pull/51640)
* \[[`dcf5f28d68`](https://github.com/nodejs/node/commit/dcf5f28d68)] - **meta**: 将 github/codeql-action 从 3.22.12 升级到 3.23.2 (dependabot\[bot]) [#51639](https://github.com/nodejs/node/pull/51639)
* \[[`c4a28b2211`](https://github.com/nodejs/node/commit/c4a28b2211)] - **meta**: 为 lemire 添加 .mailmap 条目 (Daniel Lemire) [#51600](https://github.com/nodejs/node/pull/51600)
* \[[`dbf44744ba`](https://github.com/nodejs/node/commit/dbf44744ba)] - **meta**: 将 security-wg 设为 deps 文件夹的 codeowner (Marco Ippolito) [#51529](https://github.com/nodejs/node/pull/51529)
* \[[`16fea71d08`](https://github.com/nodejs/node/commit/16fea71d08)] - **meta**: 将一位或多位协作者移至 emeritus (Node.js GitHub Bot) [#51468](https://github.com/nodejs/node/pull/51468)
* \[[`015c4dcacf`](https://github.com/nodejs/node/commit/015c4dcacf)] - **meta**: 将 RaisinTen 移至 emeritus 并从 strategic initiatives 中移除 (Darshan Sen) [#51411](https://github.com/nodejs/node/pull/51411)
* \[[`e942dc1d0c`](https://github.com/nodejs/node/commit/e942dc1d0c)] - **meta**: 添加 .temp 和 .lock 标签到忽略列表 (Rafael Gonzaga) [#51343](https://github.com/nodejs/node/pull/51343)
* \[[`595542e330`](https://github.com/nodejs/node/commit/595542e330)] - **meta**: 将 actions/setup-python 从 4.7.1 升级到 5.0.0 (dependabot\[bot]) [#51335](https://github.com/nodejs/node/pull/51335)
* \[[`6c3ba73d03`](https://github.com/nodejs/node/commit/6c3ba73d03)] - **meta**: 将 actions/setup-node 从 4.0.0 升级到 4.0.1 (dependabot\[bot]) [#51334](https://github.com/nodejs/node/pull/51334)
* \[[`e4f9f0a260`](https://github.com/nodejs/node/commit/e4f9f0a260)] - **meta**: 将 github/codeql-action 从 2.22.8 升级到 3.22.12 (dependabot\[bot]) [#51333](https://github.com/nodejs/node/pull/51333)
* \[[`77598c3a8e`](https://github.com/nodejs/node/commit/77598c3a8e)] - **meta**: 将 actions/stale 从 8.0.0 升级到 9.0.0 (dependabot\[bot]) [#51332](https://github.com/nodejs/node/pull/51332)
* \[[`22a11c32c0`](https://github.com/nodejs/node/commit/22a11c32c0)] - **meta**: 将一位或多位协作者移至 emeritus (Node.js GitHub Bot) [#51329](https://github.com/nodejs/node/pull/51329)
* \[[`391aeb1996`](https://github.com/nodejs/node/commit/391aeb1996)] - **module**: 修复内建模块导出 `default` 键时的崩溃 (Antoine du Hamel) [#51481](https://github.com/nodejs/node/pull/51481)
* \[[`615b0ae307`](https://github.com/nodejs/node/commit/615b0ae307)] - **module**: 修复 `--preserve-symlinks-main` (per4uk) [#51312](https://github.com/nodejs/node/pull/51312)
* \[[`c6cc3ed3b4`](https://github.com/nodejs/node/commit/c6cc3ed3b4)] - **net**: 修复在 lookup 处理程序中调用 destroy 时的 connect 崩溃 (theanarkh) [#51826](https://github.com/nodejs/node/pull/51826)
* \[[`63e0ceb48f`](https://github.com/nodejs/node/commit/63e0ceb48f)] - **net**: 修复 dns 文档中的 IPv4 示例 (Aras Abbasi) [#51377](https://github.com/nodejs/node/pull/51377)
* \[[`bc6f33d8d1`](https://github.com/nodejs/node/commit/bc6f33d8d1)] - **node-api**: 让 napi\_get\_buffer\_info 检查传入的 buffer 是否有效 (Janrupf) [#51571](https://github.com/nodejs/node/pull/51571)
* \[[`5b94ff44ec`](https://github.com/nodejs/node/commit/5b94ff44ec)] - **node-api**: 将 NAPI\_EXPERIMENTAL 定义移到 gyp 文件中 (Gabriel Schulhof) [#51254](https://github.com/nodejs/node/pull/51254)
* \[[`66c11f31c3`](https://github.com/nodejs/node/commit/66c11f31c3)] - **node-api**: 优化 napi\_set\_property 的性能 (Mert Can Altın) [#50282](https://github.com/nodejs/node/pull/50282)
* \[[`cb621863c6`](https://github.com/nodejs/node/commit/cb621863c6)] - **perf\_hooks**: 改进 performance milestone 的 time origin 时间戳 (IlyasShabi) [#51713](https://github.com/nodejs/node/pull/51713)
* \[[`4d06d80675`](https://github.com/nodejs/node/commit/4d06d80675)] - **quic**: 对 Endpoint 进行多项额外清理与修复 (James M Snell) [#51310](https://github.com/nodejs/node/pull/51310)
* \[[`3e579ab2fd`](https://github.com/nodejs/node/commit/3e579ab2fd)] - **repl**: 修复忽略 `NO_COLORS` 环境变量的问题 (Moshe Atlow) [#51568](https://github.com/nodejs/node/pull/51568)
* \[[`7ceb6d6700`](https://github.com/nodejs/node/commit/7ceb6d6700)] - **sea**: 更新稳定性索引 (Joyee Cheung) [#51774](https://github.com/nodejs/node/pull/51774)
* \[[`e8d9065262`](https://github.com/nodejs/node/commit/e8d9065262)] - **(SEMVER-MINOR)** **sea**: 支持 sea.getRawAsset() (Joyee Cheung) [#50960](https://github.com/nodejs/node/pull/50960)
* \[[`cea5295c16`](https://github.com/nodejs/node/commit/cea5295c16)] - **(SEMVER-MINOR)** **sea**: 支持嵌入资源 (Joyee Cheung) [#50960](https://github.com/nodejs/node/pull/50960)
* \[[`7543e774bd`](https://github.com/nodejs/node/commit/7543e774bd)] - **src**: 简化在 C++ 层直接查询环境变量 (Joyee Cheung) [#51829](https://github.com/nodejs/node/pull/51829)
* \[[`8f10543c58`](https://github.com/nodejs/node/commit/8f10543c58)] - **src**: 在快照序列化前停止分析器和 inspector (Joyee Cheung) [#51815](https://github.com/nodejs/node/pull/51815)
* \[[`ccc76bbfd7`](https://github.com/nodejs/node/commit/ccc76bbfd7)] - **src**: 简化 embedder 入口点的执行 (Joyee Cheung) [#51557](https://github.com/nodejs/node/pull/51557)
* \[[`0c41210865`](https://github.com/nodejs/node/commit/0c41210865)] - **src**: 在快照构建器中提前编译代码 (Joyee Cheung) [#51672](https://github.com/nodejs/node/pull/51672)
* \[[`2a46dc7b86`](https://github.com/nodejs/node/commit/2a46dc7b86)] - **src**: 在访问字符串前检查是否为空 (Cheng Zhao) [#51665](https://github.com/nodejs/node/pull/51665)
* \[[`47186fbad5`](https://github.com/nodejs/node/commit/47186fbad5)] - **(SEMVER-MINOR)** **src**: 在 BlobDeserializer 中更好地打印字符串内容 (Joyee Cheung) [#50960](https://github.com/nodejs/node/pull/50960)
* \[[`6603d32ce3`](https://github.com/nodejs/node/commit/6603d32ce3)] - **src**: 修复可配置 globalThis 的 vm bug (F. Hinkelmann) [#51602](https://github.com/nodejs/node/pull/51602)
* \[[`c7912c3d5a`](https://github.com/nodejs/node/commit/c7912c3d5a)] - **(SEMVER-MINOR)** **src**: 支持 .env 文件的多行值 (IlyasShabi) [#51289](https://github.com/nodejs/node/pull/51289)
* \[[`b8ae5c27c6`](https://github.com/nodejs/node/commit/b8ae5c27c6)] - **(SEMVER-MINOR)** **src**: 添加 `process.loadEnvFile` 和 `util.parseEnv` (Yagiz Nizipli) [#51476](https://github.com/nodejs/node/pull/51476)
* \[[`e3a63843f2`](https://github.com/nodejs/node/commit/e3a63843f2)] - **src**: 正确终止环境变量中的双引号 (Marco Ippolito) [#51510](https://github.com/nodejs/node/pull/51510)
* \[[`119e045053`](https://github.com/nodejs/node/commit/119e045053)] - **(SEMVER-MINOR)** **src**: 不要强制转换 dotenv 路径 (Tobias Nießen) [#51425](https://github.com/nodejs/node/pull/51425)
* \[[`b271cc5b16`](https://github.com/nodejs/node/commit/b271cc5b16)] - **src**: 重构 `GetCreationContext` 调用 (Jungku Lee) [#51367](https://github.com/nodejs/node/pull/51367)
* \[[`36e42aa570`](https://github.com/nodejs/node/commit/36e42aa570)] - **src**: 不要读取字符串越界内容 (Cheng Zhao) [#51358](https://github.com/nodejs/node/pull/51358)
* \[[`8ea7d79082`](https://github.com/nodejs/node/commit/8ea7d79082)] - **src**: 避免 fs\_permission 中被遮蔽的字符串 (Shelley Vohr) [#51123](https://github.com/nodejs/node/pull/51123)
* \[[`5b06af7814`](https://github.com/nodejs/node/commit/5b06af7814)] - **stream**: 修复 eventNames() 不返回未定义事件的问题 (IlyasShabi) [#51331](https://github.com/nodejs/node/pull/51331)
* \[[`438b7fd049`](https://github.com/nodejs/node/commit/438b7fd049)] - **stream**: 修复克隆的 webstreams 没有正确 unref 的问题 (tsctx) [#51526](https://github.com/nodejs/node/pull/51526)
* \[[`9ab353af00`](https://github.com/nodejs/node/commit/9ab353af00)] - **(SEMVER-MINOR)** **stream**: 为 `ReadableStreamBYOBReader.read` 实现 `min` 选项 (Mattias Buelens) [#50888](https://github.com/nodejs/node/pull/50888)
* \[[`17ab5ae570`](https://github.com/nodejs/node/commit/17ab5ae570)] - **test**: 修复 js-native-api/test\_cannot\_run\_js 中不可靠的假设 (Joyee Cheung) [#51898](https://github.com/nodejs/node/pull/51898)
* \[[`e2c51385c7`](https://github.com/nodejs/node/commit/e2c51385c7)] - **test**: 测试 Windows 上的代理对字符文件名 (Mert Can Altın) [#51800](https://github.com/nodejs/node/pull/51800)
* \[[`049e5f5e8c`](https://github.com/nodejs/node/commit/049e5f5e8c)] - **test**: 减少 test-http2-large-write-multiple-requests 的偶发失败 (Joyee Cheung) [#51863](https://github.com/nodejs/node/pull/51863)
* \[[`2bf03ee678`](https://github.com/nodejs/node/commit/2bf03ee678)] - **test**: 修复用于覆盖率生成的 test-debugger-profile (Joyee Cheung) [#51816](https://github.com/nodejs/node/pull/51816)
* \[[`d47a95f3b1`](https://github.com/nodejs/node/commit/d47a95f3b1)] - **test**: 修复用于覆盖率生成的 test-bootstrap-modules (Joyee Cheung) [#51816](https://github.com/nodejs/node/pull/51816)
* \[[`c0918f082f`](https://github.com/nodejs/node/commit/c0918f082f)] - **test**: 确保递归 fs watch 测试中的延迟 (Joyee Cheung) [#51842](https://github.com/nodejs/node/pull/51842)
* \[[`1f6551dda2`](https://github.com/nodejs/node/commit/1f6551dda2)] - **test**: 修复 test-child-process-fork-net (Joyee Cheung) [#51841](https://github.com/nodejs/node/pull/51841)
* \[[`f845a16c58`](https://github.com/nodejs/node/commit/f845a16c58)] - **test**: 拆分 wasi 测试 (Joyee Cheung) [#51836](https://github.com/nodejs/node/pull/51836)
* \[[`275cea0fdb`](https://github.com/nodejs/node/commit/275cea0fdb)] - **test**: 将 test-wasi 标记为在 Windows ARM 上不稳定 (Joyee Cheung) [#51834](https://github.com/nodejs/node/pull/51834)
* \[[`2fb620cd00`](https://github.com/nodejs/node/commit/2fb620cd00)] - **test**: 移除 test-fs-stat-bigint 的 flaky 标记 (Luigi Pinca) [#51735](https://github.com/nodejs/node/pull/51735)
* \[[`b046712e86`](https://github.com/nodejs/node/commit/b046712e86)] - **test**: 在 loong64 上跳过 test-http-correct-hostname (Shi Pujin) [#51663](https://github.com/nodejs/node/pull/51663)
* \[[`83f581d4c1`](https://github.com/nodejs/node/commit/83f581d4c1)] - **test**: 增加 zlib-brotli-16gb 的平台超时时间 (Rafael Gonzaga) [#51792](https://github.com/nodejs/node/pull/51792)
* \[[`ea08350c83`](https://github.com/nodejs/node/commit/ea08350c83)] - **test**: 移除 test-cli-node-options 的 flaky 标记 (Luigi Pinca) [#51716](https://github.com/nodejs/node/pull/51716)
* \[[`9d3a014f67`](https://github.com/nodejs/node/commit/9d3a014f67)] - **test**: 移除 test-domain-error-types 的 flaky 标记 (Luigi Pinca) [#51717](https://github.com/nodejs/node/pull/51717)
* \[[`d7563a5448`](https://github.com/nodejs/node/commit/d7563a5448)] - **test**: 修复 `internet/test-inspector-help-page` (Richard Lau) [#51693](https://github.com/nodejs/node/pull/51693)
* \[[`e9299255ca`](https://github.com/nodejs/node/commit/e9299255ca)] - **test**: 移除 flaky 测试的重复条目 (Luigi Pinca) [#51654](https://github.com/nodejs/node/pull/51654)
* \[[`a8ac337250`](https://github.com/nodejs/node/commit/a8ac337250)] - **test**: 移除 test-crypto-keygen 的 flaky 标记 (Luigi Pinca) [#51567](https://github.com/nodejs/node/pull/51567)
* \[[`c820166e4b`](https://github.com/nodejs/node/commit/c820166e4b)] - **test**: 移除 test-fs-rmdir-recursive 的 flaky 标记 (Luigi Pinca) [#51566](https://github.com/nodejs/node/pull/51566)
* \[[`db88bf185f`](https://github.com/nodejs/node/commit/db88bf185f)] - **test**: 移除用于断言的 common.expectsError 调用 (Paulo Chaves) [#51504](https://github.com/nodejs/node/pull/51504)
* \[[`fc0c1309b2`](https://github.com/nodejs/node/commit/fc0c1309b2)] - **test**: 将 test-http2-large-file 标记为 flaky (Michaël Zasso) [#51549](https://github.com/nodejs/node/pull/51549)
* \[[`c88f0b6db9`](https://github.com/nodejs/node/commit/c88f0b6db9)] - **test**: 在 SourceTextModule 泄漏测试中使用 checkIfCollectableByCounting (Joyee Cheung) [#51512](https://github.com/nodejs/node/pull/51512)
* \[[`d4d07f4a44`](https://github.com/nodejs/node/commit/d4d07f4a44)] - **test**: 移除 test-file-write-stream4 的 flaky 标记 (Luigi Pinca) [#51472](https://github.com/nodejs/node/pull/51472)
* \[[`7420a7d2f8`](https://github.com/nodejs/node/commit/7420a7d2f8)] - **test**: 为 fs-write 添加 URL 测试 (Rafael Gonzaga) [#51352](https://github.com/nodejs/node/pull/51352)
* \[[`28c2bf3e42`](https://github.com/nodejs/node/commit/28c2bf3e42)] - **test**: 移除断言中不需要的 common.expectsError (Andrés Morelos) [#51353](https://github.com/nodejs/node/pull/51353)
* \[[`9dfb36fbe5`](https://github.com/nodejs/node/commit/9dfb36fbe5)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#51533](https://github.com/nodejs/node/pull/51533)
* \[[`e4d4bc6f9a`](https://github.com/nodejs/node/commit/e4d4bc6f9a)] - **test\_runner**: 在隔离环境中序列化 'expected' 和 'actual' (Malthe Borch) [#51851](https://github.com/nodejs/node/pull/51851)
* \[[`5f9491237c`](https://github.com/nodejs/node/commit/5f9491237c)] - **test\_runner**: 为 mock timers 添加 ref 方法 (Marco Ippolito) [#51809](https://github.com/nodejs/node/pull/51809)
* \[[`af5875c6e8`](https://github.com/nodejs/node/commit/af5875c6e8)] - **test\_runner**: 检查超时是否被自身回调清除 (Ben Richeson) [#51673](https://github.com/nodejs/node/pull/51673)
* \[[`e0789fbc8a`](https://github.com/nodejs/node/commit/e0789fbc8a)] - **test\_runner**: 当测试为空时不调用 after 钩子 (Marco Ippolito) [#51389](https://github.com/nodejs/node/pull/51389)
* \[[`27f8549903`](https://github.com/nodejs/node/commit/27f8549903)] - **tools**: 修复在 shared mode 下安装 node (Cheng Zhao) [#51910](https://github.com/nodejs/node/pull/51910)
* \[[`71a809bd43`](https://github.com/nodejs/node/commit/71a809bd43)] - **tools**: 将 eslint 更新到 8.57.0 (Node.js GitHub Bot) [#51867](https://github.com/nodejs/node/pull/51867)
* \[[`20effe638a`](https://github.com/nodejs/node/commit/20effe638a)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.12.0 (Node.js GitHub Bot) [#51795](https://github.com/nodejs/node/pull/51795)
* \[[`6c0a3b9c0d`](https://github.com/nodejs/node/commit/6c0a3b9c0d)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.12.0 (Node.js GitHub Bot) [#51795](https://github.com/nodejs/node/pull/51795)
* \[[`03f926ddca`](https://github.com/nodejs/node/commit/03f926ddca)] - **tools**: 修复 js2c 中缺失的 \[\[fallthrough]] (Cheng Zhao) [#51845](https://github.com/nodejs/node/pull/51845)
* \[[`b502be1d09`](https://github.com/nodejs/node/commit/b502be1d09)] - **tools**: 禁用自动化 libuv 更新 (Rafael Gonzaga) [#51775](https://github.com/nodejs/node/pull/51775)
* \[[`787fb32557`](https://github.com/nodejs/node/commit/787fb32557)] - **tools**: 修复 update-icu.sh (Michaël Zasso) [#51723](https://github.com/nodejs/node/pull/51723)
* \[[`ba22c614c1`](https://github.com/nodejs/node/commit/ba22c614c1)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.10.0 (Node.js GitHub Bot) [#51720](https://github.com/nodejs/node/pull/51720)
* \[[`751821fa21`](https://github.com/nodejs/node/commit/751821fa21)] - **tools**: 将 github\_reporter 更新到 1.6.0 (Node.js GitHub Bot) [#51658](https://github.com/nodejs/node/pull/51658)
* \[[`5fe493d0e4`](https://github.com/nodejs/node/commit/5fe493d0e4)] - **tools**: 仅在源代码变更时运行 `build-windows` 工作流 (Antoine du Hamel) [#51596](https://github.com/nodejs/node/pull/51596)
* \[[`e1b9655bdc`](https://github.com/nodejs/node/commit/e1b9655bdc)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.6 (Node.js GitHub Bot) [#51583](https://github.com/nodejs/node/pull/51583)
* \[[`d8e1058f18`](https://github.com/nodejs/node/commit/d8e1058f18)] - **tools**: 修复 loong64 构建 (Shi Pujin) [#51401](https://github.com/nodejs/node/pull/51401)
* \[[`e0eeebc960`](https://github.com/nodejs/node/commit/e0eeebc960)] - **tools**: 将 normalizeTD 文本默认值设为空字符串 (Marco Ippolito) [#51543](https://github.com/nodejs/node/pull/51543)
* \[[`81fd7d1ca9`](https://github.com/nodejs/node/commit/81fd7d1ca9)] - **tools**: 在 V8 构建中用 ninja 限制并行度 (Richard Lau) [#51473](https://github.com/nodejs/node/pull/51473)
* \[[`e88a301e98`](https://github.com/nodejs/node/commit/e88a301e98)] - **tools**: 不要向 C 编译器传递无效标志 (Michaël Zasso) [#51409](https://github.com/nodejs/node/pull/51409)
* \[[`129d3b3293`](https://github.com/nodejs/node/commit/129d3b3293)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.5 (Node.js GitHub Bot) [#51460](https://github.com/nodejs/node/pull/51460)
* \[[`f3845de204`](https://github.com/nodejs/node/commit/f3845de204)] - **tools**: 更新 inspector_protocol 到 83b1154 (Kohei Ueno) [#51309](https://github.com/nodejs/node/pull/51309)
* \[[`58901d08fd`](https://github.com/nodejs/node/commit/58901d08fd)] - **tools**: 将 github_reporter 更新到 1.5.4 (Node.js GitHub Bot) [#51395](https://github.com/nodejs/node/pull/51395)
* \[[`29492e2c88`](https://github.com/nodejs/node/commit/29492e2c88)] - **tools**: 修复 brotli 更新脚本中的版本解析 (Richard Lau) [#51373](https://github.com/nodejs/node/pull/51373)
* \[[`17593d95ba`](https://github.com/nodejs/node/commit/17593d95ba)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.9.4 (Node.js GitHub Bot) [#51396](https://github.com/nodejs/node/pull/51396)
* \[[`35f33d3a31`](https://github.com/nodejs/node/commit/35f33d3a31)] - **tools**: 移除 openssl v1 更新脚本 (Marco Ippolito) [#51378](https://github.com/nodejs/node/pull/51378)
* \[[`83b3aa838b`](https://github.com/nodejs/node/commit/83b3aa838b)] - **tools**: 移除已弃用的 python API (Alex Yang) [#49731](https://github.com/nodejs/node/pull/49731)
* \[[`adb2c36f0f`](https://github.com/nodejs/node/commit/adb2c36f0f)] - **typings**: lib/internal/vm.js (Geoffrey Booth) [#50112](https://github.com/nodejs/node/pull/50112)
* \[[`407341e25c`](https://github.com/nodejs/node/commit/407341e25c)] - **url**: 在更新 URLSearchParams 时不要立即更新 URL (Matt Cowley) [#51520](https://github.com/nodejs/node/pull/51520)
* \[[`88e08bbe80`](https://github.com/nodejs/node/commit/88e08bbe80)] - **(SEMVER-MINOR)** **util**: 为文本格式化添加 styleText API (Rafael Gonzaga) [#51850](https://github.com/nodejs/node/pull/51850)
* \[[`ba444a949d`](https://github.com/nodejs/node/commit/ba444a949d)] - **vm**: 直接在 JS 层使用私有 symbol 实现 isContext() (Joyee Cheung) [#51685](https://github.com/nodejs/node/pull/51685)
* \[[`4c508269cd`](https://github.com/nodejs/node/commit/4c508269cd)] - **(SEMVER-MINOR)** **vm**: 支持使用默认加载器处理动态 import() (Joyee Cheung) [#51244](https://github.com/nodejs/node/pull/51244)

<a id="21.6.2"></a>

## 2024-02-14，版本 21.6.2（当前），@RafaelGSS

### 显著变更

这是一个安全发布。

### 显著变更

* CVE-2024-21892 - 通过 Linux capabilities 进行代码注入和权限提升 -（高）
* CVE-2024-22019 - http: 读取带有无界 chunk 扩展的未处理 HTTP 请求允许 DoS 攻击 -（高）
* CVE-2024-21896 - 通过 monkey-patching Buffer 内部实现进行路径遍历 -（高）
* CVE-2024-22017 - 由于 io\_uring，setuid() 未能移除所有权限 -（高）
* CVE-2023-46809 - Node.js 易受 Marvin Attack 影响（针对 PKCS#1 v1.5 填充的 Bleichenbacher 攻击的时间变体） -（中）
* CVE-2024-21891 - 由于路径遍历序列净化不当导致多种权限模型绕过 -（中）
* CVE-2024-21890 - 在 --allow-fs-read 和 --allow-fs-write 中对通配符处理不当（中）
* CVE-2024-22025 - fetch() brotli 解码中的资源耗尽导致拒绝服务 -（中）
* undici 版本 5.28.3
* libuv 版本 1.48.0
* OpenSSL 版本 3.0.13+quic1

### 提交

* \[[`8344719369`](https://github.com/nodejs/node/commit/8344719369)] - **crypto**: 为 privateDecrypt 禁用 PKCS#1 padding（Michael Dawson）[nodejs-private/node-private#525](https://github.com/nodejs-private/node-private/pull/525)
* \[[`d093600ac4`](https://github.com/nodejs/node/commit/d093600ac4)] - **deps**: 为 openssl-3.0.13+quic1 更新 archs 文件（Node.js GitHub Bot）[#51614](https://github.com/nodejs/node/pull/51614)
* \[[`6cd930e5e8`](https://github.com/nodejs/node/commit/6cd930e5e8)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.13+quic1（Node.js GitHub Bot）[#51614](https://github.com/nodejs/node/pull/51614)
* \[[`9590c15d3d`](https://github.com/nodejs/node/commit/9590c15d3d)] - **deps**: 将 libuv 升级到 1.48.0（Santiago Gimeno）[#51698](https://github.com/nodejs/node/pull/51698)
* \[[`666096298c`](https://github.com/nodejs/node/commit/666096298c)] - **deps**: 默认禁用 libuv 中的 io\_uring 支持（Tobias Nießen）[nodejs-private/node-private#528](https://github.com/nodejs-private/node-private/pull/528)
* \[[`a4edd22e30`](https://github.com/nodejs/node/commit/a4edd22e30)] - **fs**: 防止 possiblyTransformPath 中被修改的 Buffer 内部实现（Tobias Nießen）[nodejs-private/node-private#497](https://github.com/nodejs-private/node-private/pull/497)
* \[[`6155a1ffaf`](https://github.com/nodejs/node/commit/6155a1ffaf)] - **http**: 添加最大 chunk 扩展大小（Paolo Insogna）[nodejs-private/node-private#518](https://github.com/nodejs-private/node-private/pull/518)
* \[[`777509495e`](https://github.com/nodejs/node/commit/777509495e)] - **lib**: 使用缓存 fs 内部实现来防止路径遍历（RafaelGSS）[nodejs-private/node-private#516](https://github.com/nodejs-private/node-private/pull/516)
* \[[`9d2ac2b3fc`](https://github.com/nodejs/node/commit/9d2ac2b3fc)] - **lib**: 将 undici 更新到 v5.28.3（Matteo Collina）[nodejs-private/node-private#538](https://github.com/nodejs-private/node-private/pull/538)
* \[[`208b3940c7`](https://github.com/nodejs/node/commit/208b3940c7)] - **src**: 修复 node::credentials 中的 HasOnly(capability)（Tobias Nießen）[nodejs-private/node-private#505](https://github.com/nodejs-private/node-private/pull/505)
* \[[`fc2454f29c`](https://github.com/nodejs/node/commit/fc2454f29c)] - **src,deps**: 如果启用 io\_uring，则禁用 setuid() 等（Tobias Nießen）[nodejs-private/node-private#528](https://github.com/nodejs-private/node-private/pull/528)
* \[[`ef3eea20be`](https://github.com/nodejs/node/commit/ef3eea20be)] - **test,doc**: 澄清通配符用法（RafaelGSS）[nodejs-private/node-private#517](https://github.com/nodejs-private/node-private/pull/517)
* \[[`8547196964`](https://github.com/nodejs/node/commit/8547196964)] - **zlib**: 如果输出缓冲区已满则暂停流（Matteo Collina）[nodejs-private/node-private#540](https://github.com/nodejs-private/node-private/pull/540)

<a id="21.6.1"></a>

## 2024-01-22，版本 21.6.1（当前），@RafaelGSS

### 显著变更

此版本修复了 `undici` 使用 WebStreams 时的一个 bug

### 提交

* \[[`662ac95729`](https://github.com/nodejs/node/commit/662ac95729)] - _**Revert**_ "**stream**: 修复未 unref 的已克隆 webstreams"（Matteo Collina）[#51491](https://github.com/nodejs/node/pull/51491)
* \[[`1b8bba8aee`](https://github.com/nodejs/node/commit/1b8bba8aee)] - **test**: 为 51586 添加回归测试（Matteo Collina）[#51491](https://github.com/nodejs/node/pull/51491)

<a id="21.6.0"></a>

## 2024-01-15，版本 21.6.0（当前），@RafaelGSS

### 新的连接尝试事件

在 `net.createConnection` 流程中新增了三个事件：

* `connectionAttempt`: 在建立新的连接尝试时触发。在 Happy Eyeballs 的情况下，这可能会触发多次。
* `connectionAttemptFailed`: 在连接尝试失败时触发。在 Happy Eyeballs 的情况下，这可能会触发多次。
* `connectionAttemptTimeout`: 在连接尝试超时时触发。在 Happy Eyeballs 的情况下，最后一次尝试不会触发此事件。如果未使用 Happy Eyeballs，则完全不会触发。

此外，还修复了一个先前的 bug：在前一次连接失败且连接被用户销毁后，可能会启动新的连接尝试。
这会导致断言失败。

由 Paolo Insogna 贡献于 [#51045](https://github.com/nodejs/node/pull/51045)。

### 权限模型的变更

Node.js 21.6.0 为实验性的权限模型带来了若干修复，以及两个新的 semver-minor 提交。
我们新增了一个标志 `--allow-addons`，用于在使用 Permission Model 时启用 addon 的使用。

```console
node --experimental-permission --allow-addons
```

由 Rafael Gonzaga 贡献于 [#51183](https://github.com/nodejs/node/pull/51183)

现在通过 `--allow-fs-*` 标志也支持相对路径。
因此，在此版本中可以使用：

```console
node --experimental-permission --allow-fs-read=./index.js
```

来仅授予应用程序入口点的读取权限。

由 Rafael Gonzaga 和 Carlos Espa 贡献于 [#50758](https://github.com/nodejs/node/pull/50758)

### 通过 `--build-snapshot-config` 标志支持可配置快照

我们新增了一个 `--build-snapshot-config` 标志，用于通过自定义 JSON 配置文件配置快照。

```console
node --build-snapshot-config=/path/to/myconfig.json
```

使用此标志时，命令行提供的附加脚本文件将不会被执行，而是会被解释为普通的命令行参数。

这些更改由 Joyee Cheung 和 Anna Henningsen 在 [#50453](https://github.com/nodejs/node/pull/50453) 中贡献。

### 其他显著变更

* \[[`c31ed51373`](https://github.com/nodejs/node/commit/c31ed51373)] - **(SEMVER-MINOR)** **timers**: 导出 timers.promises（Marco Ippolito）[#51246](https://github.com/nodejs/node/pull/51246)

### 提交

* \[[`13a1241b83`](https://github.com/nodejs/node/commit/13a1241b83)] - **assert,crypto**: 使 KeyObject 和 CryptoKey 可进行相等性测试（Filip Skokan）[#50897](https://github.com/nodejs/node/pull/50897)
* \[[`4dcc5114aa`](https://github.com/nodejs/node/commit/4dcc5114aa)] - **benchmark**: 移除对未随版本发布工具的依赖（Adam Majer）[#51146](https://github.com/nodejs/node/pull/51146)
* \[[`2eb41f86b3`](https://github.com/nodejs/node/commit/2eb41f86b3)] - **build**: 修复 VScode “Reopen in Container”（Serg Kryvonos）[#51271](https://github.com/nodejs/node/pull/51271)
* \[[`e03ac83c19`](https://github.com/nodejs/node/commit/e03ac83c19)] - **build**: 修复 arm64 交叉编译（Michaël Zasso）[#51256](https://github.com/nodejs/node/pull/51256)
* \[[`cd61fce34e`](https://github.com/nodejs/node/commit/cd61fce34e)] - **build**: 为 V8 构建添加 `-flax-vector-conversions`（Michaël Zasso）[#51257](https://github.com/nodejs/node/pull/51257)
* \[[`e5017a522e`](https://github.com/nodejs/node/commit/e5017a522e)] - **crypto**: 更新 CryptoKey 符号属性（Filip Skokan）[#50897](https://github.com/nodejs/node/pull/50897)
* \[[`c0d2e8be11`](https://github.com/nodejs/node/commit/c0d2e8be11)] - **deps**: 将 corepack 更新到 0.24.0（Node.js GitHub Bot）[#51318](https://github.com/nodejs/node/pull/51318)
* \[[`24a9a72492`](https://github.com/nodejs/node/commit/24a9a72492)] - **deps**: 将 acorn 更新到 8.11.3（Node.js GitHub Bot）[#51317](https://github.com/nodejs/node/pull/51317)
* \[[`e53cbb22c2`](https://github.com/nodejs/node/commit/e53cbb22c2)] - **deps**: 更新 ngtcp2 和 nghttp3（James M Snell）[#51291](https://github.com/nodejs/node/pull/51291)
* \[[`f00f1204f1`](https://github.com/nodejs/node/commit/f00f1204f1)] - **deps**: 将 brotli 更新到 1.1.0（Node.js GitHub Bot）[#50804](https://github.com/nodejs/node/pull/50804)
* \[[`a41dca0c51`](https://github.com/nodejs/node/commit/a41dca0c51)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-40e35a7（Node.js GitHub Bot）[#51274](https://github.com/nodejs/node/pull/51274)
* \[[`efa12a89c6`](https://github.com/nodejs/node/commit/efa12a89c6)] - **deps**: 将 simdutf 更新到 4.0.8（Node.js GitHub Bot）[#51000](https://github.com/nodejs/node/pull/51000)
* \[[`25eba3d20b`](https://github.com/nodejs/node/commit/25eba3d20b)] - **deps**: V8: cherry-pick de611e69ad51（Keyhan Vakil）[#51200](https://github.com/nodejs/node/pull/51200)
* \[[`a07d6e23e4`](https://github.com/nodejs/node/commit/a07d6e23e4)] - **deps**: 将 simdjson 更新到 3.6.3（Node.js GitHub Bot）[#51104](https://github.com/nodejs/node/pull/51104)
* \[[`6d1bfcb2dd`](https://github.com/nodejs/node/commit/6d1bfcb2dd)] - **deps**: 将 googletest 更新到 530d5c8（Node.js GitHub Bot）[#51191](https://github.com/nodejs/node/pull/51191)
* \[[`75e5615c43`](https://github.com/nodejs/node/commit/75e5615c43)] - **deps**: 将 acorn-walk 更新到 8.3.1（Node.js GitHub Bot）[#50457](https://github.com/nodejs/node/pull/50457)
* \[[`3ecc7dcc00`](https://github.com/nodejs/node/commit/3ecc7dcc00)] - **deps**: 将 acorn-walk 更新到 8.3.0（Node.js GitHub Bot）[#50457](https://github.com/nodejs/node/pull/50457)
* \[[`e2f8d741c8`](https://github.com/nodejs/node/commit/e2f8d741c8)] - **deps**: 将 zlib 更新到 1.3.0.1-motley-dd5fc13（Node.js GitHub Bot）[#51105](https://github.com/nodejs/node/pull/51105)
* \[[`4a5d3bda72`](https://github.com/nodejs/node/commit/4a5d3bda72)] - **doc**: GN 文件应使用 Node 的许可证（Cheng Zhao）[#50694](https://github.com/nodejs/node/pull/50694)
* \[[`84127514ba`](https://github.com/nodejs/node/commit/84127514ba)] - **doc**: 改进 localWindowSize 事件描述（Davy Landman）[#51071](https://github.com/nodejs/node/pull/51071)
* \[[`8ee882a49c`](https://github.com/nodejs/node/commit/8ee882a49c)] - **doc**: 将 `--jitless` 标记为实验性（Antoine du Hamel）[#51247](https://github.com/nodejs/node/pull/51247)
* \[[`876743ece1`](https://github.com/nodejs/node/commit/876743ece1)] - **doc**: 运行 license-builder（github-actions\[bot]）[#51199](https://github.com/nodejs/node/pull/51199)
* \[[`ec6fcff009`](https://github.com/nodejs/node/commit/ec6fcff009)] - **doc**: 修复 pm 中的限制和已知问题（Rafael Gonzaga）[#51184](https://github.com/nodejs/node/pull/51184)
* \[[`c13a5c0373`](https://github.com/nodejs/node/commit/c13a5c0373)] - **doc**: 在 Threat Model 中提及 node:wasi（Rafael Gonzaga）[#51211](https://github.com/nodejs/node/pull/51211)
* \[[`4b19e62444`](https://github.com/nodejs/node/commit/4b19e62444)] - **doc**: 移除含糊的 “considered”（Rich Trott）[#51207](https://github.com/nodejs/node/pull/51207)
* \[[`5453abd6ad`](https://github.com/nodejs/node/commit/5453abd6ad)] - **doc**: 在自定义测试运行器示例中设置退出码（Matteo Collina）[#51056](https://github.com/nodejs/node/pull/51056)
* \[[`f9d4e07faf`](https://github.com/nodejs/node/commit/f9d4e07faf)] - **doc**: 从 `maintaining-dependencies.md` 中移除版本信息（Antoine du Hamel）[#51195](https://github.com/nodejs/node/pull/51195)
* \[[`df8927a073`](https://github.com/nodejs/node/commit/df8927a073)] - **doc**: 提及原生 addon 在 pm 中受限（Rafael Gonzaga）[#51185](https://github.com/nodejs/node/pull/51185)
* \[[`e636d83914`](https://github.com/nodejs/node/commit/e636d83914)] - **doc**: 更正关于 stats.isDirectory 行为的说明（Nick Reilingh）[#50946](https://github.com/nodejs/node/pull/50946)
* \[[`1c71435c2a`](https://github.com/nodejs/node/commit/1c71435c2a)] - **doc**: 修复 `TestsStream` 父类（Jungku Lee）[#51181](https://github.com/nodejs/node/pull/51181)
* \[[`2c227b0d64`](https://github.com/nodejs/node/commit/2c227b0d64)] - **doc**: 修复 simdjson 错误链接（Marco Ippolito）[#51177](https://github.com/nodejs/node/pull/51177)
* \[[`efa13e1943`](https://github.com/nodejs/node/commit/efa13e1943)] - **(SEMVER-MINOR)** **doc**: 为 --build-snapshot-config 添加文档（Anna Henningsen）[#50453](https://github.com/nodejs/node/pull/50453)
* \[[`941aedc6fc`](https://github.com/nodejs/node/commit/941aedc6fc)] - **errors**: 修复 SystemError 的堆栈跟踪（uzlopak）[#49956](https://github.com/nodejs/node/pull/49956)
* \[[`47548d9e61`](https://github.com/nodejs/node/commit/47548d9e61)] - **esm**: 修复无效模块说明符的提示（Antoine du Hamel）[#51223](https://github.com/nodejs/node/pull/51223)
* \[[`091098f40a`](https://github.com/nodejs/node/commit/091098f40a)] - **fs**: 修复 Windows 上长路径的 fs.promises.realpath（翠 / green）[#51032](https://github.com/nodejs/node/pull/51032)
* \[[`e5a8fa01aa`](https://github.com/nodejs/node/commit/e5a8fa01aa)] - **fs**: 使 fh.read() 中的 offset、position 和 length 参数可选（Pulkit Gupta）[#51087](https://github.com/nodejs/node/pull/51087)
* \[[`c87e5d51cc`](https://github.com/nodejs/node/commit/c87e5d51cc)] - **fs**: 为 `readSync` 添加缺失的 jsdoc 参数（Yagiz Nizipli）[#51225](https://github.com/nodejs/node/pull/51225)
* \[[`e24249cf37`](https://github.com/nodejs/node/commit/e24249cf37)] - **fs**: 移除 `internalModuleReadJSON` 绑定（Yagiz Nizipli）[#51224](https://github.com/nodejs/node/pull/51224)
* \[[`7421467812`](https://github.com/nodejs/node/commit/7421467812)] - **fs**: 提升 buffer 前缀的 mkdtemp 性能（Yagiz Nizipli）[#51078](https://github.com/nodejs/node/pull/51078)
* \[[`5b229d775f`](https://github.com/nodejs/node/commit/5b229d775f)] - **fs**: 在 c++ 中同步验证 fd（Yagiz Nizipli）[#51027](https://github.com/nodejs/node/pull/51027)
* \[[`c7a135962d`](https://github.com/nodejs/node/commit/c7a135962d)] - **http**: 移除误导性警告（Luigi Pinca）[#51204](https://github.com/nodejs/node/pull/51204)
* \[[`a325746ff4`](https://github.com/nodejs/node/commit/a325746ff4)] - **http**: 不覆盖用户提供的 options 对象（KuthorX）[#33633](https://github.com/nodejs/node/pull/33633)
* \[[`89eee7763f`](https://github.com/nodejs/node/commit/89eee7763f)] - **http2**: 额外的 http/2 设置（Marten Richter）[#49025](https://github.com/nodejs/node/pull/49025)
* \[[`624142947f`](https://github.com/nodejs/node/commit/624142947f)] - **lib**: 修复将 `--frozen-intrinsics` 与 `--jitless` 一起使用的问题（Antoine du Hamel）[#51248](https://github.com/nodejs/node/pull/51248)
* \[[`8f845eb001`](https://github.com/nodejs/node/commit/8f845eb001)] - **lib**: 将函数声明移到循环外部（Sanjaiyan Parthipan）[#51242](https://github.com/nodejs/node/pull/51242)
* \[[`ed7305e49b`](https://github.com/nodejs/node/commit/ed7305e49b)] - **lib**: 降低 `SafePromiseAllSettledReturnVoid` 调用的开销（Antoine du Hamel）[#51243](https://github.com/nodejs/node/pull/51243)
* \[[`291265ce27`](https://github.com/nodejs/node/commit/291265ce27)] - **lib**: 暴露默认 prepareStackTrace（Chengzhong Wu）[#50827](https://github.com/nodejs/node/pull/50827)
* \[[`8ff6bc45ca`](https://github.com/nodejs/node/commit/8ff6bc45ca)] - **lib,permission**: 处理 fs.symlink 上的 buffer（Rafael Gonzaga）[#51212](https://github.com/nodejs/node/pull/51212)
* \[[`416b4f8063`](https://github.com/nodejs/node/commit/416b4f8063)] - **(SEMVER-MINOR)** **lib,src,permission**: 将 path.resolve 移植到 C++（Rafael Gonzaga）[#50758](https://github.com/nodejs/node/pull/50758)
* \[[`6648a5c576`](https://github.com/nodejs/node/commit/6648a5c576)] - **meta**: 在 SECURITY.md 变更时通知 tsc（Rafael Gonzaga）[#51259](https://github.com/nodejs/node/pull/51259)
* \[[`83a99ccedd`](https://github.com/nodejs/node/commit/83a99ccedd)] - **meta**: 将 artifact actions 更新到 v4（Michaël Zasso）[#51219](https://github.com/nodejs/node/pull/51219)
* \[[`b621ada69a`](https://github.com/nodejs/node/commit/b621ada69a)] - **module**: 将 CJS exports 缓存移动到 internal/modules/cjs/loader（Joyee Cheung）[#51157](https://github.com/nodejs/node/pull/51157)
* \[[`e4be5b60f0`](https://github.com/nodejs/node/commit/e4be5b60f0)] - **(SEMVER-MINOR)** **net**: 添加连接尝试事件（Paolo Insogna）[#51045](https://github.com/nodejs/node/pull/51045)
* \[[`3a492056e2`](https://github.com/nodejs/node/commit/3a492056e2)] - **node-api**: 使用 v8::Private 为外部值添加类型标签（Chengzhong Wu）[#51149](https://github.com/nodejs/node/pull/51149)
* \[[`b2135ae7dc`](https://github.com/nodejs/node/commit/b2135ae7dc)] - **node-api**: 通过类型系统将 nogc APIs 与其他 API 分离（Gabriel Schulhof）[#50060](https://github.com/nodejs/node/pull/50060)
* \[[`8f4325dcd5`](https://github.com/nodejs/node/commit/8f4325dcd5)] - **permission**: 修复 children > 1 时的通配符问题（Rafael Gonzaga）[#51209](https://github.com/nodejs/node/pull/51209)
* \[[`7ecf99404e`](https://github.com/nodejs/node/commit/7ecf99404e)] - **quic**: 更新 quic 实现以使用最新的 ngtcp2/nghttp3（James M Snell）[#51291](https://github.com/nodejs/node/pull/51291)
* \[[`5b32e21f3b`](https://github.com/nodejs/node/commit/5b32e21f3b)] - **quic**: 添加 quic internalBinding，优化 Endpoint，添加类型（James M Snell）[#51112](https://github.com/nodejs/node/pull/51112)
* \[[`3310095bea`](https://github.com/nodejs/node/commit/3310095bea)] - **repl**: 修复 prepareStackTrace frames 数组顺序（Chengzhong Wu）[#50827](https://github.com/nodejs/node/pull/50827)
* \[[`a0ff00b526`](https://github.com/nodejs/node/commit/a0ff00b526)] - **src**: 避免在 FreeEnvironment 时耗尽平台任务（Chengzhong Wu）[#51290](https://github.com/nodejs/node/pull/51290)
* \[[`115e0585cd`](https://github.com/nodejs/node/commit/115e0585cd)] - **src**: 为 Histogram 添加快速 API（James M Snell）[#51296](https://github.com/nodejs/node/pull/51296)
* \[[`29b81576c6`](https://github.com/nodejs/node/commit/29b81576c6)] - **src**: 重构 `GetCreationContext` 调用（Yagiz Nizipli）[#51287](https://github.com/nodejs/node/pull/51287)
* \[[`54dd978400`](https://github.com/nodejs/node/commit/54dd978400)] - **src**: 在析构 IsolateData 之前进入 isolate（Ben Noordhuis）[#51138](https://github.com/nodejs/node/pull/51138)
* \[[`864ecb0dfa`](https://github.com/nodejs/node/commit/864ecb0dfa)] - **src**: 不要将所有以 node_modules 结尾的路径都视为 node_modules（Michaël Zasso）[#51269](https://github.com/nodejs/node/pull/51269)
* \[[`df31c8114c`](https://github.com/nodejs/node/commit/df31c8114c)] - **src**: 消除 histogram.cc 中的重复代码（James M Snell）[#51263](https://github.com/nodejs/node/pull/51263)
* \[[`17c73e6d0c`](https://github.com/nodejs/node/commit/17c73e6d0c)] - **src**: 修复 trace event 的 Unix 抽象 socket 路径（theanarkh）[#50858](https://github.com/nodejs/node/pull/50858)
* \[[`96d64edc94`](https://github.com/nodejs/node/commit/96d64edc94)] - **src**: 使用 BignumPointer 并使用 BN\_clear\_free（James M Snell）[#50454](https://github.com/nodejs/node/pull/50454)
* \[[`8a2dd93a14`](https://github.com/nodejs/node/commit/8a2dd93a14)] - **src**: 使用 simdutf::utf8\_length\_from\_latin1 实现 FastByteLengthUtf8（Daniel Lemire）[#50840](https://github.com/nodejs/node/pull/50840)
* \[[`e54ddf898f`](https://github.com/nodejs/node/commit/e54ddf898f)] - **(SEMVER-MINOR)** **src**: 支持可配置快照（Joyee Cheung）[#50453](https://github.com/nodejs/node/pull/50453)
* \[[`a69c7d7bc3`](https://github.com/nodejs/node/commit/a69c7d7bc3)] - **(SEMVER-MINOR)** **src,permission**: 添加 --allow-addon 标志（Rafael Gonzaga）[#51183](https://github.com/nodejs/node/pull/51183)
* \[[`e7925e66fc`](https://github.com/nodejs/node/commit/e7925e66fc)] - **src,stream**: 改进 WriteString（ywave620）[#51155](https://github.com/nodejs/node/pull/51155)
* \[[`82de6603af`](https://github.com/nodejs/node/commit/82de6603af)] - **stream**: 修复代码风格（Mattias Buelens）[#51168](https://github.com/nodejs/node/pull/51168)
* \[[`e443953656`](https://github.com/nodejs/node/commit/e443953656)] - **stream**: 修复已克隆 webstreams 未被 unref 的问题（James M Snell）[#51255](https://github.com/nodejs/node/pull/51255)
* \[[`757a84c9ea`](https://github.com/nodejs/node/commit/757a84c9ea)] - **test**: 修复 ppc64 SEA 测试中的不稳定条件（Richard Lau）[#51422](https://github.com/nodejs/node/pull/51422)
* \[[`85ee2f7255`](https://github.com/nodejs/node/commit/85ee2f7255)] - **test**: 将 forEach() 替换为 for...of（Alexander Jones）[#50608](https://github.com/nodejs/node/pull/50608)
* \[[`549e4b4142`](https://github.com/nodejs/node/commit/549e4b4142)] - **test**: 将 forEach 替换为 for...of（Ospite Privilegiato）[#50787](https://github.com/nodejs/node/pull/50787)
* \[[`ef44f9bef2`](https://github.com/nodejs/node/commit/ef44f9bef2)] - **test**: 将 foreach 替换为 for of（lucacapocci94-dev）[#50790](https://github.com/nodejs/node/pull/50790)
* \[[`652af45485`](https://github.com/nodejs/node/commit/652af45485)] - **test**: 将 forEach() 替换为 for...of（Jia）[#50610](https://github.com/nodejs/node/pull/50610)
* \[[`684dd9db2f`](https://github.com/nodejs/node/commit/684dd9db2f)] - **test**: 修复 `test-fs-readfile-tostring-fail` 中写入大小不一致的问题（Jungku Lee）[#51141](https://github.com/nodejs/node/pull/51141)
* \[[`aaf710f535`](https://github.com/nodejs/node/commit/aaf710f535)] - **test**: 替换 test-http-server-multiheaders2 中的 forEach（Marco Mac）[#50794](https://github.com/nodejs/node/pull/50794)
* \[[`57c64550cc`](https://github.com/nodejs/node/commit/57c64550cc)] - **test**: 在 test-webcrypto-export-import-ec 中将 forEach 替换为 for-of（Chiara Ricciardi）[#51249](https://github.com/nodejs/node/pull/51249)
* \[[`88e865181b`](https://github.com/nodejs/node/commit/88e865181b)] - **test**: 在 test-http-hostname-typechecking.js 中改用 for of 循环（Luca Del Puppo）[#50782](https://github.com/nodejs/node/pull/50782)
* \[[`3db376f67a`](https://github.com/nodejs/node/commit/3db376f67a)] - **test**: 在 arm 上跳过 test-watch-mode-inspect（Michael Dawson）[#51210](https://github.com/nodejs/node/pull/51210)
* \[[`38232d1c52`](https://github.com/nodejs/node/commit/38232d1c52)] - **test**: 在文件 test-trace-events-net.js 中将 forEach 替换为 for of（Ianna83）[#50789](https://github.com/nodejs/node/pull/50789)
* \[[`f1cb58355a`](https://github.com/nodejs/node/commit/f1cb58355a)] - **test**: 在 test/parallel/test-util-log.js 中将 forEach() 替换为 for...of（Edoardo Dusi）[#50783](https://github.com/nodejs/node/pull/50783)
* \[[`9bfd84c117`](https://github.com/nodejs/node/commit/9bfd84c117)] - **test**: 在 test-trace-events-api.js 中将 forEach 替换为 for of（Andrea Pavone）[#50784](https://github.com/nodejs/node/pull/50784)
* \[[`7e9834915a`](https://github.com/nodejs/node/commit/7e9834915a)] - **test**: 在 test-v8-serders.js 中将 forEach 替换为 for-of（Mattia Iannone）[#50791](https://github.com/nodejs/node/pull/50791)
* \[[`b6f232e841`](https://github.com/nodejs/node/commit/b6f232e841)] - **test**: 为 pm 中的 fs-read 添加 URL 测试（Rafael Gonzaga）[#51213](https://github.com/nodejs/node/pull/51213)
* \[[`8a2178c5f5`](https://github.com/nodejs/node/commit/8a2178c5f5)] - **test**: 在 test-esm-loader-resolve-type.mjs 中使用 tmpdir.refresh()（Luigi Pinca）[#51206](https://github.com/nodejs/node/pull/51206)
* \[[`7e9a0b192a`](https://github.com/nodejs/node/commit/7e9a0b192a)] - **test**: 在 test-esm-json.mjs 中使用 tmpdir.refresh()（Luigi Pinca）[#51205](https://github.com/nodejs/node/pull/51205)
* \[[`d7c2572fe0`](https://github.com/nodejs/node/commit/d7c2572fe0)] - **test**: 修复 worker\*.test-free-called 中的不稳定性（Jithil P Ponnan）[#51013](https://github.com/nodejs/node/pull/51013)
* \[[`979cebc955`](https://github.com/nodejs/node/commit/979cebc955)] - **test_runner**: 修复测试对象被错误传递给 setup() 的问题（Pulkit Gupta）[#50982](https://github.com/nodejs/node/pull/50982)
* \[[`63db82abe6`](https://github.com/nodejs/node/commit/63db82abe6)] - **test_runner**: 修复 before 抛出错误时仍运行 after hook 的问题（Pulkit Gupta）[#51062](https://github.com/nodejs/node/pull/51062)
* \[[`c31ed51373`](https://github.com/nodejs/node/commit/c31ed51373)] - **(SEMVER-MINOR)** **timers**: 导出 timers.promises（Marco Ippolito）[#51246](https://github.com/nodejs/node/pull/51246)
* \[[`fc10f889eb`](https://github.com/nodejs/node/commit/fc10f889eb)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.9.2（Node.js GitHub Bot）[#51320](https://github.com/nodejs/node/pull/51320)
* \[[`d5a5f12d15`](https://github.com/nodejs/node/commit/d5a5f12d15)] - **tools**: 修复 dep\_updaters 目录更新（Michaël Zasso）[#51294](https://github.com/nodejs/node/pull/51294)
* \[[`bdcb5ed510`](https://github.com/nodejs/node/commit/bdcb5ed510)] - **tools**: 将 inspector\_protocol 更新到 c488ba2（cola119）[#51293](https://github.com/nodejs/node/pull/51293)
* \[[`69a46add77`](https://github.com/nodejs/node/commit/69a46add77)] - **tools**: 将 inspector\_protocol 更新到 9b4a4aa（cola119）[#51293](https://github.com/nodejs/node/pull/51293)
* \[[`e325f49d19`](https://github.com/nodejs/node/commit/e325f49d19)] - **tools**: 将 inspector\_protocol 更新到 2f51e05（cola119）[#51293](https://github.com/nodejs/node/pull/51293)
* \[[`60d804851b`](https://github.com/nodejs/node/commit/60d804851b)] - **tools**: 将 inspector\_protocol 更新到 d7b099b（cola119）[#51293](https://github.com/nodejs/node/pull/51293)
* \[[`d18168489f`](https://github.com/nodejs/node/commit/d18168489f)] - **tools**: 将 inspector\_protocol 更新到 912eb68（cola119）[#51293](https://github.com/nodejs/node/pull/51293)
* \[[`ef4f46fc39`](https://github.com/nodejs/node/commit/ef4f46fc39)] - **tools**: 将 inspector\_protocol 更新到 547c5b8（cola119）[#51293](https://github.com/nodejs/node/pull/51293)
* \[[`c3126fc016`](https://github.com/nodejs/node/commit/c3126fc016)] - **tools**: 将 inspector\_protocol 更新到 ca525fc（cola119）[#51293](https://github.com/nodejs/node/pull/51293)
* \[[`917d887dde`](https://github.com/nodejs/node/commit/917d887dde)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.9.1（Node.js GitHub Bot）[#51276](https://github.com/nodejs/node/pull/51276)
* \[[`37594918e0`](https://github.com/nodejs/node/commit/37594918e0)] - **tools**: 检查 timezone 当前版本（Marco Ippolito）[#51178](https://github.com/nodejs/node/pull/51178)
* \[[`d0d2faf899`](https://github.com/nodejs/node/commit/d0d2faf899)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.9.0（Node.js GitHub Bot）[#51193](https://github.com/nodejs/node/pull/51193)
* \[[`c96ef6533c`](https://github.com/nodejs/node/commit/c96ef6533c)] - **tools**: 将 eslint 更新到 8.56.0（Node.js GitHub Bot）[#51194](https://github.com/nodejs/node/pull/51194)
* \[[`f4f781d493`](https://github.com/nodejs/node/commit/f4f781d493)] - **util**: 将 invalidSubtypeIndex 传给错误，而不是 trimmedSubtype（Gaurish Sethia）[#51264](https://github.com/nodejs/node/pull/51264)
* \[[`867b484429`](https://github.com/nodejs/node/commit/867b484429)] - **watch**: 澄清 fileName 参数可以为 null（Luigi Pinca）[#51305](https://github.com/nodejs/node/pull/51305)
* \[[`56e8969b65`](https://github.com/nodejs/node/commit/56e8969b65)] - **watch**: 修复 Windows 系统上的 null `fileName`（vnc5）[#49891](https://github.com/nodejs/node/pull/49891)
* \[[`3f4fd6efbb`](https://github.com/nodejs/node/commit/3f4fd6efbb)] - **watch**: 修复传入 --watch=true 标志时的无限循环（Pulkit Gupta）[#51160](https://github.com/nodejs/node/pull/51160)

<a id="21.5.0"></a>

## 2023-12-19，版本 21.5.0（当前），@RafaelGSS

### 重要变更

* \[[`0dd53da722`](https://github.com/nodejs/node/commit/0dd53da722)] - **(SEMVER-MINOR)** **deps**: 添加 simdjson (Yagiz Nizipli) [#50322](https://github.com/nodejs/node/pull/50322)
* \[[`9f54987fbc`](https://github.com/nodejs/node/commit/9f54987fbc)] -  **module**: 将 config 与 `package_json_reader` 合并 (Yagiz Nizipli) [#50322](https://github.com/nodejs/node/pull/50322)
* \[[`45e4f82912`](https://github.com/nodejs/node/commit/45e4f82912)] -  **src**: 将 package resolver 移至 c++ (Yagiz Nizipli) [#50322](https://github.com/nodejs/node/pull/50322)

#### 弃用

* \[[`26ed4ad01f`](https://github.com/nodejs/node/commit/26ed4ad01f)] - **doc**: 弃用 hash 构造函数 (Marco Ippolito) [#51077](https://github.com/nodejs/node/pull/51077)
* \[[`58ca66a1a7`](https://github.com/nodejs/node/commit/58ca66a1a7)] - **doc**: 弃用 `dirent.path` (Antoine du Hamel) [#51020](https://github.com/nodejs/node/pull/51020)

### 提交

* \[[`1bbdbdfbeb`](https://github.com/nodejs/node/commit/1bbdbdfbeb)] - **benchmark**: 更新 benchmark/perf\_hooks 中的迭代次数 (Lei Shi) [#50869](https://github.com/nodejs/node/pull/50869)
* \[[`087fb0908e`](https://github.com/nodejs/node/commit/087fb0908e)] - **benchmark**: 更新 benchmark/crypto/aes-gcm-throughput.js 中的迭代次数 (Lei Shi) [#50929](https://github.com/nodejs/node/pull/50929)
* \[[`53b16c71fb`](https://github.com/nodejs/node/commit/53b16c71fb)] - **benchmark**: 更新 benchmark/crypto/randomBytes.js 中的迭代次数和大小 (Lei Shi) [#50868](https://github.com/nodejs/node/pull/50868)
* \[[`38fd0ca753`](https://github.com/nodejs/node/commit/38fd0ca753)] - **benchmark**: 添加 undici websocket 基准测试 (Chenyu Yang) [#50586](https://github.com/nodejs/node/pull/50586)
* \[[`b148c43244`](https://github.com/nodejs/node/commit/b148c43244)] - **benchmark**: 添加 create-hash 基准测试 (Joyee Cheung) [#51026](https://github.com/nodejs/node/pull/51026)
* \[[`fdd8c18f96`](https://github.com/nodejs/node/commit/fdd8c18f96)] - **benchmark**: 更新 benchmark/util/text-decoder.js 中的迭代次数和长度 (Lei Shi) [#50938](https://github.com/nodejs/node/pull/50938)
* \[[`a9972057ac`](https://github.com/nodejs/node/commit/a9972057ac)] - **benchmark**: 更新 benchmark/util/type-check.js 的迭代次数 (Lei Shi) [#50937](https://github.com/nodejs/node/pull/50937)
* \[[`b80bb1329b`](https://github.com/nodejs/node/commit/b80bb1329b)] - **benchmark**: 更新 benchmark/util/normalize-encoding.js 中的迭代次数 (Lei Shi) [#50934](https://github.com/nodejs/node/pull/50934)
* \[[`dbee03d646`](https://github.com/nodejs/node/commit/dbee03d646)] - **benchmark**: 更新 benchmark/util/inspect-array.js 中的迭代次数 (Lei Shi) [#50933](https://github.com/nodejs/node/pull/50933)
* \[[`f2d83a3a84`](https://github.com/nodejs/node/commit/f2d83a3a84)] - **benchmark**: 更新 benchmark/util/format.js 中的迭代次数 (Lei Shi) [#50932](https://github.com/nodejs/node/pull/50932)
* \[[`2581fce553`](https://github.com/nodejs/node/commit/2581fce553)] - **bootstrap**: 改进对不支持的内置模块快照警告的提示 (Joyee Cheung) [#50944](https://github.com/nodejs/node/pull/50944)
* \[[`735bad3694`](https://github.com/nodejs/node/commit/735bad3694)] - **build**: 修复 gn 构建中来自 uv 的警告 (Cheng Zhao) [#51069](https://github.com/nodejs/node/pull/51069)
* \[[`8da9d969f9`](https://github.com/nodejs/node/commit/8da9d969f9)] - **deps**: V8: 反向移植 0fd478bcdabd (Joyee Cheung) [#50572](https://github.com/nodejs/node/pull/50572)
* \[[`429fbb37c1`](https://github.com/nodejs/node/commit/429fbb37c1)] - **deps**: 将 simdjson 更新到 v3.6.2 (Yagiz Nizipli) [#50986](https://github.com/nodejs/node/pull/50986)
* \[[`9950103253`](https://github.com/nodejs/node/commit/9950103253)] - **deps**: 将 zlib 更新到 1.3-22124f5 (Node.js GitHub Bot) [#50910](https://github.com/nodejs/node/pull/50910)
* \[[`0b61823e8b`](https://github.com/nodejs/node/commit/0b61823e8b)] - **deps**: 将 undici 更新到 5.28.2 (Node.js GitHub Bot) [#51024](https://github.com/nodejs/node/pull/51024)
* \[[`95d8a273cc`](https://github.com/nodejs/node/commit/95d8a273cc)] - **deps**: 从 libuv 上游反向移植 bfbe4e38d7 (Abdirahim Musse) [#50650](https://github.com/nodejs/node/pull/50650)
* \[[`06038a489e`](https://github.com/nodejs/node/commit/06038a489e)] - **deps**: 将 libuv 更新到 1.47.0 (Node.js GitHub Bot) [#50650](https://github.com/nodejs/node/pull/50650)
* \[[`0dd53da722`](https://github.com/nodejs/node/commit/0dd53da722)] - **(SEMVER-MINOR)** **deps**: 添加 simdjson (Yagiz Nizipli) [#50322](https://github.com/nodejs/node/pull/50322)
* \[[`04eaa5cdd7`](https://github.com/nodejs/node/commit/04eaa5cdd7)] - **doc**: 运行 license-builder (github-actions\[bot]) [#51111](https://github.com/nodejs/node/pull/51111)
* \[[`26ed4ad01f`](https://github.com/nodejs/node/commit/26ed4ad01f)] - **doc**: 弃用 hash 构造函数 (Marco Ippolito) [#51077](https://github.com/nodejs/node/pull/51077)
* \[[`637ffce4c4`](https://github.com/nodejs/node/commit/637ffce4c4)] - **doc**: 添加关于 `--experimental-detect-module` 的说明 (Shubherthi Mitra) [#51089](https://github.com/nodejs/node/pull/51089)
* \[[`838179b096`](https://github.com/nodejs/node/commit/838179b096)] - **doc**: 更正 tracingChannel.traceCallback() (Gerhard Stöbich) [#51068](https://github.com/nodejs/node/pull/51068)
* \[[`539bee4f0a`](https://github.com/nodejs/node/commit/539bee4f0a)] - **doc**: 在 pbkdf2Key 中使用 length 参数 (Tobias Nießen) [#51066](https://github.com/nodejs/node/pull/51066)
* \[[`c45a9a3187`](https://github.com/nodejs/node/commit/c45a9a3187)] - **doc**: 为 `dirent.path` 添加弃用说明 (Antoine du Hamel) [#51059](https://github.com/nodejs/node/pull/51059)
* \[[`58ca66a1a7`](https://github.com/nodejs/node/commit/58ca66a1a7)] - **doc**: 弃用 `dirent.path` (Antoine du Hamel) [#51020](https://github.com/nodejs/node/pull/51020)
* \[[`c2b6edf9ab`](https://github.com/nodejs/node/commit/c2b6edf9ab)] - **esm**: 修复错误消息中的 hook 名称 (Bruce MacNaughton) [#50466](https://github.com/nodejs/node/pull/50466)
* \[[`35e8f26f07`](https://github.com/nodejs/node/commit/35e8f26f07)] - **fs**: 从 c++ 抛出 fchownSync 错误 (Yagiz Nizipli) [#51075](https://github.com/nodejs/node/pull/51075)
* \[[`c3c8237089`](https://github.com/nodejs/node/commit/c3c8237089)] - **fs**: 更新 createReadStream 和 createWriteStream 的 jsdoc 参数 (Jungku Lee) [#51063](https://github.com/nodejs/node/pull/51063)
* \[[`3f7f3ce8c9`](https://github.com/nodejs/node/commit/3f7f3ce8c9)] - **fs**: 改善 readvSync 的错误性能 (IlyasShabi) [#50100](https://github.com/nodejs/node/pull/50100)
* \[[`7f95926f17`](https://github.com/nodejs/node/commit/7f95926f17)] - **http**: 处理多值 content-disposition 头 (Arsalan Ahmad) [#50977](https://github.com/nodejs/node/pull/50977)
* \[[`7a8a2d5632`](https://github.com/nodejs/node/commit/7a8a2d5632)] - **lib**: 不将 Windows 驱动器字母解析为 scheme (华) [#50580](https://github.com/nodejs/node/pull/50580)
* \[[`aa2be4bb76`](https://github.com/nodejs/node/commit/aa2be4bb76)] - **module**: 在 `commonjs` 转译器中加载源映射 (Hiroki Osame) [#51033](https://github.com/nodejs/node/pull/51033)
* \[[`c0e5e74876`](https://github.com/nodejs/node/commit/c0e5e74876)] - **module**: 在 register 选项中记录 `parentURL` (Hiroki Osame) [#51039](https://github.com/nodejs/node/pull/51039)
* \[[`4eedf5e694`](https://github.com/nodejs/node/commit/4eedf5e694)] - **module**: 修复最近引入的 coverity 警告 (Michael Dawson) [#50843](https://github.com/nodejs/node/pull/50843)
* \[[`9f54987fbc`](https://github.com/nodejs/node/commit/9f54987fbc)] -  **module**: 将 config 与 `package_json_reader` 合并 (Yagiz Nizipli) [#50322](https://github.com/nodejs/node/pull/50322)
* \[[`5f95dca638`](https://github.com/nodejs/node/commit/5f95dca638)] - **node-api**: 引入实验性功能标志 (Gabriel Schulhof) [#50991](https://github.com/nodejs/node/pull/50991)
* \[[`3fb7fc909e`](https://github.com/nodejs/node/commit/3fb7fc909e)] - **quic**: 更多实现细节 (James M Snell) [#48244](https://github.com/nodejs/node/pull/48244)
* \[[`fa25e069fc`](https://github.com/nodejs/node/commit/fa25e069fc)] - **src**: 实现 countObjectsWithPrototype (Joyee Cheung) [#50572](https://github.com/nodejs/node/pull/50572)
* \[[`abe90527e4`](https://github.com/nodejs/node/commit/abe90527e4)] - **src**: 注册 udp\_wrap 外部引用 (Joyee Cheung) [#50943](https://github.com/nodejs/node/pull/50943)
* \[[`84e2f51d14`](https://github.com/nodejs/node/commit/84e2f51d14)] - **src**: 注册 spawn\_sync 外部引用 (Joyee Cheung) [#50943](https://github.com/nodejs/node/pull/50943)
* \[[`2cfee53d7b`](https://github.com/nodejs/node/commit/2cfee53d7b)] - **src**: 注册 process\_wrap 外部引用 (Joyee Cheung) [#50943](https://github.com/nodejs/node/pull/50943)
* \[[`9b7f79a8bd`](https://github.com/nodejs/node/commit/9b7f79a8bd)] - **src**: 修复 coverity 报告的 double free (Michael Dawson) [#51046](https://github.com/nodejs/node/pull/51046)
* \[[`fc5503246e`](https://github.com/nodejs/node/commit/fc5503246e)] - **src**: 移除 `node_file.cc` 中未使用的头文件 (Jungku Lee) [#50927](https://github.com/nodejs/node/pull/50927)
* \[[`c3abdc58af`](https://github.com/nodejs/node/commit/c3abdc58af)] - **src**: 实现 --trace-promises (Joyee Cheung) [#50899](https://github.com/nodejs/node/pull/50899)
* \[[`f90fc83e97`](https://github.com/nodejs/node/commit/f90fc83e97)] - **src**: 修复动态链接的 zlib 版本 (Richard Lau) [#51007](https://github.com/nodejs/node/pull/51007)
* \[[`9bf144379f`](https://github.com/nodejs/node/commit/9bf144379f)] - **src**: 省略 package.json main 字段的布尔值 (Yagiz Nizipli) [#50965](https://github.com/nodejs/node/pull/50965)
* \[[`45e4f82912`](https://github.com/nodejs/node/commit/45e4f82912)] -  **src**: 将 package resolver 移至 c++ (Yagiz Nizipli) [#50322](https://github.com/nodejs/node/pull/50322)
* \[[`71acd36778`](https://github.com/nodejs/node/commit/71acd36778)] - **stream**: 使用 "transformer.cancel" 实现 TransformStream 清理 (Debadree Chatterjee) [#50126](https://github.com/nodejs/node/pull/50126)
* \[[`5112306064`](https://github.com/nodejs/node/commit/5112306064)] - **stream**: 在调用 clearBuffer 时修复 fd 为空的问题 (kylo5aby) [#50994](https://github.com/nodejs/node/pull/50994)
* \[[`ed070755ec`](https://github.com/nodejs/node/commit/ed070755ec)] - **test**: 消除 test-diagnostics-channel-memory-leak 的不稳定性 (Joyee Cheung) [#50572](https://github.com/nodejs/node/pull/50572)
* \[[`aee01ff1b4`](https://github.com/nodejs/node/commit/aee01ff1b4)] - **test**: 在快照中测试 child\_process 的同步方法 (Joyee Cheung) [#50943](https://github.com/nodejs/node/pull/50943)
* \[[`cc949869a3`](https://github.com/nodejs/node/commit/cc949869a3)] - **test**: 处理相对 https 重定向 (Richard Lau) [#51121](https://github.com/nodejs/node/pull/51121)
* \[[`048349ed4c`](https://github.com/nodejs/node/commit/048349ed4c)] - **test**: 修复测试运行器彩色输出测试 (Moshe Atlow) [#51064](https://github.com/nodejs/node/pull/51064)
* \[[`7f5291d783`](https://github.com/nodejs/node/commit/7f5291d783)] - **test**: 正确解析 embedtest 二进制文件路径 (Cheng Zhao) [#50276](https://github.com/nodejs/node/pull/50276)
* \[[`4ddd0daf5f`](https://github.com/nodejs/node/commit/4ddd0daf5f)] - **test**: 在正则表达式中转义 cwd (Jérémy Lal) [#50980](https://github.com/nodejs/node/pull/50980)
* \[[`3ccd5faabb`](https://github.com/nodejs/node/commit/3ccd5faabb)] - **test_runner**: 为 tap 报告器格式化覆盖率报告 (Pulkit Gupta) [#51119](https://github.com/nodejs/node/pull/51119)
* \[[`d5c9adf3df`](https://github.com/nodejs/node/commit/d5c9adf3df)] - **test_runner**: 修复在 test runner 中 files 未定义时的无限循环 (Pulkit Gupta) [#51047](https://github.com/nodejs/node/pull/51047)
* \[[`328a41701c`](https://github.com/nodejs/node/commit/328a41701c)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.7.0 (Node.js GitHub Bot) [#51106](https://github.com/nodejs/node/pull/51106)
* \[[`297cb6f5c2`](https://github.com/nodejs/node/commit/297cb6f5c2)] - **tools**: 将 doc 更新为 highlight.js\@11.9.0、unified\@11.0.4 (Node.js GitHub Bot) [#50459](https://github.com/nodejs/node/pull/50459)
* \[[`4705023343`](https://github.com/nodejs/node/commit/4705023343)] - **tools**: 修复 simdjson 更新器 (Yagiz Nizipli) [#50986](https://github.com/nodejs/node/pull/50986)
* \[[`c9841583db`](https://github.com/nodejs/node/commit/c9841583db)] - **tools**: 将 eslint 更新到 8.55.0 (Node.js GitHub Bot) [#51025](https://github.com/nodejs/node/pull/51025)
* \[[`2b4671125e`](https://github.com/nodejs/node/commit/2b4671125e)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.6.1 (Node.js GitHub Bot) [#51022](https://github.com/nodejs/node/pull/51022)
* \[[`cd891b37f6`](https://github.com/nodejs/node/commit/cd891b37f6)] - **util**: 提高 function areSimilarFloatArrays 的性能 (Liu Jia) [#51040](https://github.com/nodejs/node/pull/51040)
* \[[`e178a43509`](https://github.com/nodejs/node/commit/e178a43509)] - **vm**: 显式使用 v8::DeserializeInternalFieldsCallback (Joyee Cheung) [#50984](https://github.com/nodejs/node/pull/50984)
* \[[`fd028e146f`](https://github.com/nodejs/node/commit/fd028e146f)] - **win,tools**: 升级 Windows 签名到 smctl (Stefan Stojanovic) [#50956](https://github.com/nodejs/node/pull/50956)

<a id="21.4.0"></a>

## 2023-12-05，版本 21.4.0（当前），@targos

### 重要变更

此版本修复了 v21.3.0 中引入的一个回归问题，该问题会导致 `fs.writeFileSync`
方法在以 `'utf8'` 编码、未指定标志选项，并且目标文件尚不存在时调用会抛出异常。

* \[[`32acafeeb6`](https://github.com/nodejs/node/commit/32acafeeb6)] - **(SEMVER-MINOR)** **fs**: 引入 `dirent.parentPath`（Antoine du Hamel）[#50976](https://github.com/nodejs/node/pull/50976)
* \[[`724548674d`](https://github.com/nodejs/node/commit/724548674d)] - **fs**: 对使用 utf8 编码的 writeFileSync 使用默认的 w 标志（Murilo Kakazu）[#50990](https://github.com/nodejs/node/pull/50990)

### 提交

* \[[`b24ee15fb2`](https://github.com/nodejs/node/commit/b24ee15fb2)] - **benchmark**: 更新 benchmark/crypto/hkdf.js 中的迭代次数（Lei Shi）[#50866](https://github.com/nodejs/node/pull/50866)
* \[[`f79b54e60e`](https://github.com/nodejs/node/commit/f79b54e60e)] - **benchmark**: 更新 benchmark/crypto/get-ciphers.js 中的迭代次数（Lei Shi）[#50863](https://github.com/nodejs/node/pull/50863)
* \[[`dc049acbbb`](https://github.com/nodejs/node/commit/dc049acbbb)] - **benchmark**: 更新 `util.inspect` 的迭代次数（kylo5aby）[#50651](https://github.com/nodejs/node/pull/50651)
* \[[`d7c562ae38`](https://github.com/nodejs/node/commit/d7c562ae38)] - **deps**: 将 googletest 更新到 76bb2af（Node.js GitHub Bot）[#50555](https://github.com/nodejs/node/pull/50555)
* \[[`59a45ddbef`](https://github.com/nodejs/node/commit/59a45ddbef)] - **deps**: 将 googletest 更新到 b10fad3（Node.js GitHub Bot）[#50555](https://github.com/nodejs/node/pull/50555)
* \[[`099ebdb781`](https://github.com/nodejs/node/commit/099ebdb781)] - **deps**: 将 undici 更新到 5.28.1（Node.js GitHub Bot）[#50975](https://github.com/nodejs/node/pull/50975)
* \[[`4b1bed04f7`](https://github.com/nodejs/node/commit/4b1bed04f7)] - **deps**: 将 undici 更新到 5.28.0（Node.js GitHub Bot）[#50915](https://github.com/nodejs/node/pull/50915)
* \[[`b281e98b1e`](https://github.com/nodejs/node/commit/b281e98b1e)] - **doc**: 添加关于 `--input-type` 的更多细节（Shubham Pandey）[#50796](https://github.com/nodejs/node/pull/50796)
* \[[`b7036f2028`](https://github.com/nodejs/node/commit/b7036f2028)] - **doc**: 添加当 CVE 未发布时的处理流程（Rafael Gonzaga）[#50945](https://github.com/nodejs/node/pull/50945)
* \[[`7adf239af0`](https://github.com/nodejs/node/commit/7adf239af0)] - **doc**: 修复 esm 解析算法中的一些错误（Christopher Jeffrey (JJ)）[#50898](https://github.com/nodejs/node/pull/50898)
* \[[`759ebcaead`](https://github.com/nodejs/node/commit/759ebcaead)] - **doc**: 为 Electron 29 保留 121（Shelley Vohr）[#50957](https://github.com/nodejs/node/pull/50957)
* \[[`cedc3427fa`](https://github.com/nodejs/node/commit/cedc3427fa)] - **doc**: 运行 license-builder（github-actions\[bot]）[#50926](https://github.com/nodejs/node/pull/50926)
* \[[`30a6f19769`](https://github.com/nodejs/node/commit/30a6f19769)] - **doc**: 记录非仅 node_modules 运行时弃用（Joyee Cheung）[#50748](https://github.com/nodejs/node/pull/50748)
* \[[`eecab883f0`](https://github.com/nodejs/node/commit/eecab883f0)] - **doc**: 添加 Unix 抽象套接字文档（theanarkh）[#50904](https://github.com/nodejs/node/pull/50904)
* \[[`ec74b93b38`](https://github.com/nodejs/node/commit/ec74b93b38)] - **doc**: 移除深色主题下页面加载时的闪烁（Dima Demakov）[#50942](https://github.com/nodejs/node/pull/50942)
* \[[`724548674d`](https://github.com/nodejs/node/commit/724548674d)] - **fs**: 对使用 utf8 编码的 writeFileSync 使用默认的 w 标志（Murilo Kakazu）[#50990](https://github.com/nodejs/node/pull/50990)
* \[[`32acafeeb6`](https://github.com/nodejs/node/commit/32acafeeb6)] - **(SEMVER-MINOR)** **fs**: 引入 `dirent.parentPath`（Antoine du Hamel）[#50976](https://github.com/nodejs/node/pull/50976)
* \[[`c1ee506454`](https://github.com/nodejs/node/commit/c1ee506454)] - **fs**: 移除 `esm` 包的变通处理（Yagiz Nizipli）[#50907](https://github.com/nodejs/node/pull/50907)
* \[[`1cf087dfb3`](https://github.com/nodejs/node/commit/1cf087dfb3)] - **lib**: 重构以在 diagnostics_channel 中使用 validateFunction（Deokjin Kim）[#50955](https://github.com/nodejs/node/pull/50955)
* \[[`c37d18d5e1`](https://github.com/nodejs/node/commit/c37d18d5e1)] - **lib**: 简化 process.binding() 的处理（Joyee Cheung）[#50773](https://github.com/nodejs/node/pull/50773)
* \[[`246cf73631`](https://github.com/nodejs/node/commit/246cf73631)] - **lib,src**: 用 `toWellFormed()` 替换 toUSVString（Yagiz Nizipli）[#47342](https://github.com/nodejs/node/pull/47342)
* \[[`9bc79173a0`](https://github.com/nodejs/node/commit/9bc79173a0)] - **loader**: 加快 moduleProvider 使用的行长度计算（Mudit）[#50969](https://github.com/nodejs/node/pull/50969)
* \[[`812ab9e4f8`](https://github.com/nodejs/node/commit/812ab9e4f8)] - **meta**: 将 step-security/harden-runner 从 2.6.0 升级到 2.6.1（dependabot\[bot]）[#50999](https://github.com/nodejs/node/pull/50999)
* \[[`1dbe1af19a`](https://github.com/nodejs/node/commit/1dbe1af19a)] - **meta**: 将 github/codeql-action 从 2.22.5 升级到 2.22.8（dependabot\[bot]）[#50998](https://github.com/nodejs/node/pull/50998)
* \[[`bed1b93f8a`](https://github.com/nodejs/node/commit/bed1b93f8a)] - **meta**: 将一个或多个协作者移至名誉成员（Node.js GitHub Bot）[#50931](https://github.com/nodejs/node/pull/50931)
* \[[`1e7d101428`](https://github.com/nodejs/node/commit/1e7d101428)] - **src**: 使 ModifyCodeGenerationFromStrings 更健壮（Joyee Cheung）[#50763](https://github.com/nodejs/node/pull/50763)
* \[[`709ac479eb`](https://github.com/nodejs/node/commit/709ac479eb)] - **src**: 禁用 ESM 语法检测的未捕获异常中止（Yagiz Nizipli）[#50987](https://github.com/nodejs/node/pull/50987)
* \[[`f6ff11c9f9`](https://github.com/nodejs/node/commit/f6ff11c9f9)] - **src**: 修复 tail `[[noreturn]]` abort 的回溯（Chengzhong Wu）[#50849](https://github.com/nodejs/node/pull/50849)
* \[[`74f5a1cbc9`](https://github.com/nodejs/node/commit/74f5a1cbc9)] - **src**: 将 MKSNAPSHOT 调试日志输出到 stderr（Joyee Cheung）[#50759](https://github.com/nodejs/node/pull/50759)
* \[[`3a1c664a97`](https://github.com/nodejs/node/commit/3a1c664a97)] - **test**: 将 forEach 替换为 for.. test-webcrypto-export-import-cfrg.js（Angelo Parziale）[#50785](https://github.com/nodejs/node/pull/50785)
* \[[`ac3a6eefe3`](https://github.com/nodejs/node/commit/ac3a6eefe3)] - **test**: 在 SEA 测试中记录更多信息（Joyee Cheung）[#50759](https://github.com/nodejs/node/pull/50759)
* \[[`94462d42f5`](https://github.com/nodejs/node/commit/94462d42f5)] - **test**: 合并测试中的 utf8 文本 fixture（Joyee Cheung）[#50732](https://github.com/nodejs/node/pull/50732)
* \[[`8e1a70a347`](https://github.com/nodejs/node/commit/8e1a70a347)] - **tools**: 添加触发器以更新发布链接工作流（Moshe Atlow）[#50974](https://github.com/nodejs/node/pull/50974)
* \[[`ca10cbb774`](https://github.com/nodejs/node/commit/ca10cbb774)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.5.2（Node.js GitHub Bot）[#50913](https://github.com/nodejs/node/pull/50913)
* \[[`1e40c4a366`](https://github.com/nodejs/node/commit/1e40c4a366)] - **tools**: 修复当前版本检查（Marco Ippolito）[#50951](https://github.com/nodejs/node/pull/50951)
* \[[`3faed331e1`](https://github.com/nodejs/node/commit/3faed331e1)] - **typings**: 修复 `internal/modules/esm/hooks` 中的 JSDoc（Alex Yang）[#50887](https://github.com/nodejs/node/pull/50887)
* \[[`6a087ceffa`](https://github.com/nodejs/node/commit/6a087ceffa)] - **url**: 当 revokeObjectURL 的参数长度为 0 时抛出错误（DylanTet）[#50433](https://github.com/nodejs/node/pull/50433)

<a id="21.3.0"></a>

## 2023-11-30，版本 21.3.0（当前），@RafaelGSS

### 重要变更

#### 新的 `--disable-warning` 标志

此版本新增了一个 `--disable-warning` 选项，允许用户按代码
（即 DEP0025）或类型（即 DeprecationWarning、ExperimentalWarning）禁用特定警告。

该选项与现有的 `--warnings` 和 `--no-warnings` 配合使用。

例如，下面的脚本在使用
`node --disable-warning=DEP0025` 执行时不会发出 DEP0025 `require('node:sys')` 警告：

```mjs
import sys from 'node:sys';
```

由 Ethan-Arrowood 贡献，见 [#50661](https://github.com/nodejs/node/pull/50661)

#### 将根证书更新到 NSS 3.95

这是来自 NSS 3.95 的 [certdata.txt](https://hg.mozilla.org/projects/nss/raw-file/NSS_3_95_RTM/lib/ckfw/builtins/certdata.txt)，发布于 2023-11-16。

这也是将随 Firefox 121 一同发布的 NSS 版本，
发布日期为 2023-12-19。

新增证书：

* TrustAsia Global Root CA G3
* TrustAsia Global Root CA G4
* CommScope Public Trust ECC Root-01
* CommScope Public Trust ECC Root-02
* CommScope Public Trust RSA Root-01
* CommScope Public Trust RSA Root-02

移除证书：

* Autoridad de Certificacion Firmaprofesional CIF A62634068

#### 使用 UTF-8 字符串加速 fs.writeFileSync

通过在 C++ 中主要为 UTF8 编码字符串数据实现高效的快速路径，增强了 writeFileSync 功能。
此外，通过利用改进后的 writeFileSync 功能，优化了 `appendFileSync` 方法。
出于简洁性和性能考虑，当前实现仅支持字符串数据，
因为基准测试结果对为此目的使用 Buffer 的有效性提出了担忧。
未来可能会探索进一步优化和扩展，但目前重点是最大化字符串数据操作的效率。

由 CanadaHonk 贡献，见 [#49884](https://github.com/nodejs/node/pull/49884)。

#### 其他重要变更

* \[[`c7a7493ca2`](https://github.com/nodejs/node/commit/c7a7493ca2)] - **(SEMVER-MINOR)** **module**: 在 shadow realm 中引导模块加载器（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`bc3f7b5401`](https://github.com/nodejs/node/commit/bc3f7b5401)] - **(SEMVER-MINOR)** **module**: 移除 useCustomLoadersIfPresent 标志（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`aadff07e59`](https://github.com/nodejs/node/commit/aadff07e59)] - **(SEMVER-MINOR)** **src**: 创建每个 isolate 的代理环境模板（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`91aa9dd23a`](https://github.com/nodejs/node/commit/91aa9dd23a)] - **(SEMVER-MINOR)** **src**: 创建每个 isolate 的 fs_dir 属性（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`5c5834190a`](https://github.com/nodejs/node/commit/5c5834190a)] - **(SEMVER-MINOR)** **src**: 创建每个 isolate 的 worker 属性（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`4a1ce45181`](https://github.com/nodejs/node/commit/4a1ce45181)] - **(SEMVER-MINOR)** **src**: 将 process binding 数据设为弱引用（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)

### 提交

* \[[`4a20912279`](https://github.com/nodejs/node/commit/4a20912279)] - **benchmark**: 更新 benchmark/util/splice-one.js 中的迭代次数（Liu Jia）[#50698](https://github.com/nodejs/node/pull/50698)
* \[[`36380eb53d`](https://github.com/nodejs/node/commit/36380eb53d)] - **benchmark**: 将迭代次数增加到合适的值（Lei Shi）[#50766](https://github.com/nodejs/node/pull/50766)
* \[[`23f56d8bb3`](https://github.com/nodejs/node/commit/23f56d8bb3)] - **benchmark**: 重写 import.meta 基准测试（Joyee Cheung）[#50683](https://github.com/nodejs/node/pull/50683)
* \[[`f7245d73d9`](https://github.com/nodejs/node/commit/f7245d73d9)] - **benchmark**: 添加 misc/startup-cli-version 基准测试（Joyee Cheung）[#50684](https://github.com/nodejs/node/pull/50684)
* \[[`c81d2acfe0`](https://github.com/nodejs/node/commit/c81d2acfe0)] - **benchmark**: 从 require-builtins fixture 中移除 punycode（Joyee Cheung）[#50689](https://github.com/nodejs/node/pull/50689)
* \[[`5849f09874`](https://github.com/nodejs/node/commit/5849f09874)] - **build**: 为 simdjson 添加 GN 配置（Cheng Zhao）[#50831](https://github.com/nodejs/node/pull/50831)
* \[[`12605e8f7d`](https://github.com/nodejs/node/commit/12605e8f7d)] - **build**: 添加启用 Maglev 的配置标志（Keyhan Vakil）[#50692](https://github.com/nodejs/node/pull/50692)
* \[[`43da9ea9e5`](https://github.com/nodejs/node/commit/43da9ea9e5)] - **build**: 修复 deps/base64 的 GN 配置（Cheng Zhao）[#50696](https://github.com/nodejs/node/pull/50696)
* \[[`465f75b58a`](https://github.com/nodejs/node/commit/465f75b58a)] - **build**: 禁用标志 v8_scriptormodule_legacy_lifetime（Chengzhong Wu）[#50616](https://github.com/nodejs/node/pull/50616)
* \[[`d2c0dfb1b7`](https://github.com/nodejs/node/commit/d2c0dfb1b7)] - **crypto**: 将根证书更新到 NSS 3.95（Node.js GitHub Bot）[#50805](https://github.com/nodejs/node/pull/50805)
* \[[`8d3a1d8911`](https://github.com/nodejs/node/commit/8d3a1d8911)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-5daffc7（Node.js GitHub Bot）[#50803](https://github.com/nodejs/node/pull/50803)
* \[[`e02f304de7`](https://github.com/nodejs/node/commit/e02f304de7)] - **deps**: V8：cherry-pick 0f9ebbc672c7（Chengzhong Wu）[#50867](https://github.com/nodejs/node/pull/50867)
* \[[`c31ad5ceaa`](https://github.com/nodejs/node/commit/c31ad5ceaa)] - **deps**: 将 icu 更新到 74.1（Node.js GitHub Bot）[#50515](https://github.com/nodejs/node/pull/50515)
* \[[`3ff2bda34e`](https://github.com/nodejs/node/commit/3ff2bda34e)] - **deps**: 将 ada 更新到 2.7.4（Node.js GitHub Bot）[#50815](https://github.com/nodejs/node/pull/50815)
* \[[`221f02df6d`](https://github.com/nodejs/node/commit/221f02df6d)] - **deps**: 将 undici 更新到 5.27.2（Node.js GitHub Bot）[#50813](https://github.com/nodejs/node/pull/50813)
* \[[`ee69c613a2`](https://github.com/nodejs/node/commit/ee69c613a2)] - **deps**: 将 minimatch 更新到 9.0.3（Node.js GitHub Bot）[#50806](https://github.com/nodejs/node/pull/50806)
* \[[`00dab30fd2`](https://github.com/nodejs/node/commit/00dab30fd2)] - **deps**: V8：cherry-pick 475c8cdf9a95（Keyhan Vakil）[#50680](https://github.com/nodejs/node/pull/50680)
* \[[`a0c01b23b4`](https://github.com/nodejs/node/commit/a0c01b23b4)] - **deps**: 将 simdutf 更新到 4.0.4（Node.js GitHub Bot）[#50772](https://github.com/nodejs/node/pull/50772)
* \[[`071e46ae56`](https://github.com/nodejs/node/commit/071e46ae56)] - **deps**: 将 npm 升级到 10.2.4（npm 团队）[#50751](https://github.com/nodejs/node/pull/50751)
* \[[`5d28f8d18f`](https://github.com/nodejs/node/commit/5d28f8d18f)] - **deps**: 正确转义 Python 字符串（Michaël Zasso）[#50695](https://github.com/nodejs/node/pull/50695)
* \[[`3731f836ed`](https://github.com/nodejs/node/commit/3731f836ed)] - **deps**: V8：cherry-pick 8f0b94671ddb（Lu Yahan）[#50654](https://github.com/nodejs/node/pull/50654)
* \[[`6dfe1023c3`](https://github.com/nodejs/node/commit/6dfe1023c3)] - **dns**: 使用有效数组调用 handle.setServers()（Luigi Pinca）[#50811](https://github.com/nodejs/node/pull/50811)
* \[[`2f13db475e`](https://github.com/nodejs/node/commit/2f13db475e)] - **doc**: 使 API 和其他文档中的主题保持一致（Dima Demakov）[#50877](https://github.com/nodejs/node/pull/50877)
* \[[`8c4976b732`](https://github.com/nodejs/node/commit/8c4976b732)] - **doc**: 在 `primordials.md` 中添加关于 `instanceof` 的章节（Antoine du Hamel）[#50874](https://github.com/nodejs/node/pull/50874)
* \[[`6485687642`](https://github.com/nodejs/node/commit/6485687642)] - **doc**: 更新电子邮件以反映所属信息（Yagiz Nizipli）[#50856](https://github.com/nodejs/node/pull/50856)
* \[[`bc31375a09`](https://github.com/nodejs/node/commit/bc31375a09)] - **doc**: watch 模式下不支持 shard（Pulkit Gupta）[#50640](https://github.com/nodejs/node/pull/50640)
* \[[`08c3b0ab20`](https://github.com/nodejs/node/commit/08c3b0ab20)] - **doc**: 去除不必要的 `eslint-skip` 注释（Antoine du Hamel）[#50829](https://github.com/nodejs/node/pull/50829)
* \[[`98fb1faff1`](https://github.com/nodejs/node/commit/98fb1faff1)] - **doc**: 为 isWebAssemblyCompiledModule 创建弃用代码（Marco Ippolito）[#50486](https://github.com/nodejs/node/pull/50486)
* \[[`e116fcdb01`](https://github.com/nodejs/node/commit/e116fcdb01)] - **doc**: 将 CanadaHonk 加入 triagers（CanadaHonk）[#50848](https://github.com/nodejs/node/pull/50848)
* \[[`a37d9ee1e3`](https://github.com/nodejs/node/commit/a37d9ee1e3)] - **doc**: 修复 --allow-fs-* 中的拼写错误（Tobias Nießen）[#50845](https://github.com/nodejs/node/pull/50845)
* \[[`8468daf1a9`](https://github.com/nodejs/node/commit/8468daf1a9)] - **doc**: 更新 x509.keyUsage 的 Crypto API 文档（Daniel Meechan）[#50603](https://github.com/nodejs/node/pull/50603)
* \[[`b4935dde60`](https://github.com/nodejs/node/commit/b4935dde60)] - **doc**: 修复 fs.writeFileSync 返回值文档（Ryan Zimmerman）[#50760](https://github.com/nodejs/node/pull/50760)
* \[[`ead9879a04`](https://github.com/nodejs/node/commit/ead9879a04)] - **doc**: 更新 `PerformanceEntry` 中的输出结果（详细）（Jungku Lee）[#50723](https://github.com/nodejs/node/pull/50723)
* \[[`6b7403c5df`](https://github.com/nodejs/node/commit/6b7403c5df)] - **doc**: 修复 `Buffer.allocUnsafe` 文档（Mert Can Altın）[#50686](https://github.com/nodejs/node/pull/50686)
* \[[`713fdf1fc3`](https://github.com/nodejs/node/commit/713fdf1fc3)] - **doc**: 运行 license-builder（github-actions\[bot]）[#50691](https://github.com/nodejs/node/pull/50691)
* \[[`50f336c06f`](https://github.com/nodejs/node/commit/50f336c06f)] - **esm**: 当 load 返回 nullish 的 `source` 时回退到 `getSource`（Antoine du Hamel）[#50825](https://github.com/nodejs/node/pull/50825)
* \[[`bd58870556`](https://github.com/nodejs/node/commit/bd58870556)] - **esm**: 当 format 为 `commonjs` 时不调用 `getSource`（Francesco Trotta）[#50465](https://github.com/nodejs/node/pull/50465)
* \[[`e59268a076`](https://github.com/nodejs/node/commit/e59268a076)] - **fs**: 为 writeFileSync utf8 添加 C++ 快速路径（CanadaHonk）[#49884](https://github.com/nodejs/node/pull/49884)
* \[[`483200f68f`](https://github.com/nodejs/node/commit/483200f68f)] - **fs**: 改进 `rmdirSync` 的错误性能（CanadaHonk）[#49846](https://github.com/nodejs/node/pull/49846)
* \[[`e4e0add0de`](https://github.com/nodejs/node/commit/e4e0add0de)] - **fs**: 修复 glob 返回重复项的问题（Moshe Atlow）[#50881](https://github.com/nodejs/node/pull/50881)
* \[[`45b2bb09f2`](https://github.com/nodejs/node/commit/45b2bb09f2)] - **fs**: 修复 void 函数不应返回值的问题（Jungku Lee）[#50769](https://github.com/nodejs/node/pull/50769)
* \[[`492e3e30b7`](https://github.com/nodejs/node/commit/492e3e30b7)] - **fs**: 在 copyFile 中替换已弃用的 `path._makeLong`（CanadaHonk）[#50844](https://github.com/nodejs/node/pull/50844)
* \[[`9dc4cde75b`](https://github.com/nodejs/node/commit/9dc4cde75b)] - **fs**: 改进同步 `lstat`+`fstat` 的错误性能（CanadaHonk）[#49868](https://github.com/nodejs/node/pull/49868)
* \[[`c3eee590be`](https://github.com/nodejs/node/commit/c3eee590be)] - **inspector**: 使用私有字段替代符号（Yagiz Nizipli）[#50776](https://github.com/nodejs/node/pull/50776)
* \[[`1a0069b13d`](https://github.com/nodejs/node/commit/1a0069b13d)] - **meta**: 根据 Node.js charter 澄清提名流程（Matteo Collina）[#50834](https://github.com/nodejs/node/pull/50834)
* \[[`65a811a86d`](https://github.com/nodejs/node/commit/65a811a86d)] - **meta**: 澄清关于 bug 复现的建议（Antoine du Hamel）[#50882](https://github.com/nodejs/node/pull/50882)
* \[[`5811a59016`](https://github.com/nodejs/node/commit/5811a59016)] - **meta**: 将 cjihrig 调整为 TSC 正式成员（Colin Ihrig）[#50816](https://github.com/nodejs/node/pull/50816)
* \[[`c7a7493ca2`](https://github.com/nodejs/node/commit/c7a7493ca2)] - **(SEMVER-MINOR)** **module**: 在 shadow realm 中引导模块加载器（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`bc3f7b5401`](https://github.com/nodejs/node/commit/bc3f7b5401)] - **(SEMVER-MINOR)** **module**: 移除 useCustomLoadersIfPresent 标志（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`9197b0f2fc`](https://github.com/nodejs/node/commit/9197b0f2fc)] - **net**: 检查 pipe 模式和路径（theanarkh）[#50770](https://github.com/nodejs/node/pull/50770)
* \[[`673de300b4`](https://github.com/nodejs/node/commit/673de300b4)] - **node-api**: 将通用代码提取到宏中（Gabriel Schulhof）[#50664](https://github.com/nodejs/node/pull/50664)
* \[[`aebe2fc702`](https://github.com/nodejs/node/commit/aebe2fc702)] - **perf_hooks**: 使用快速 API 调用实现 performance.now()（Joyee Cheung）[#50492](https://github.com/nodejs/node/pull/50492)
* \[[`3fdecc4a8b`](https://github.com/nodejs/node/commit/3fdecc4a8b)] - **permission**: 若目标为相对路径则不创建符号链接（Tobias Nießen）[#49156](https://github.com/nodejs/node/pull/49156)
* \[[`27a4f58640`](https://github.com/nodejs/node/commit/27a4f58640)] - **permission**: 将 const 函数标记为 const（Tobias Nießen）[#50705](https://github.com/nodejs/node/pull/50705)
* \[[`feb8ff9427`](https://github.com/nodejs/node/commit/feb8ff9427)] - **src**: 断言 BN_bn2binpad 的返回值（Tobias Nießen）[#50860](https://github.com/nodejs/node/pull/50860)
* \[[`fd9195d750`](https://github.com/nodejs/node/commit/fd9195d750)] - **src**: 修复 Coverity 警告（Michael Dawson）[#50846](https://github.com/nodejs/node/pull/50846)
* \[[`adcab85c0c`](https://github.com/nodejs/node/commit/adcab85c0c)] - **src**: 修复与即将到来的 V8 12.1 API 的兼容性（Cheng Zhao）[#50709](https://github.com/nodejs/node/pull/50709)
* \[[`79ef39b8c8`](https://github.com/nodejs/node/commit/79ef39b8c8)] - **(SEMVER-MINOR)** **src**: 添加 `--disable-warning` 选项（Ethan Arrowood）[#50661](https://github.com/nodejs/node/pull/50661)
* \[[`faf6a04ba6`](https://github.com/nodejs/node/commit/faf6a04ba6)] - **src**: 在使用 isolate 之前添加 IsolateScopes（Keyhan Vakil）[#50680](https://github.com/nodejs/node/pull/50680)
* \[[`eacf4ba485`](https://github.com/nodejs/node/commit/eacf4ba485)] - **src**: 正确遍历 import attributes 数组（Michaël Zasso）[#50703](https://github.com/nodejs/node/pull/50703)
* \[[`0fb35b6a67`](https://github.com/nodejs/node/commit/0fb35b6a67)] - **src**: 避免在 FSPermission::Apply 中复制字符串（Tobias Nießen）[#50662](https://github.com/nodejs/node/pull/50662)
* \[[`83ad272fa6`](https://github.com/nodejs/node/commit/83ad272fa6)] - **src**: 移除 RadixTree 中错误的默认参数（Tobias Nießen）[#50736](https://github.com/nodejs/node/pull/50736)
* \[[`2e8e237ce2`](https://github.com/nodejs/node/commit/2e8e237ce2)] - **src**: 修复 JSONParser 泄漏内部 V8 作用域的问题（Keyhan Vakil）[#50688](https://github.com/nodejs/node/pull/50688)
* \[[`0d3aa725cf`](https://github.com/nodejs/node/commit/0d3aa725cf)] - **src**: 如果文件未找到则返回错误 --env-file（Ardi Nugraha）[#50588](https://github.com/nodejs/node/pull/50588)
* \[[`aadff07e59`](https://github.com/nodejs/node/commit/aadff07e59)] - **(SEMVER-MINOR)** **src**: 创建每个 isolate 的代理环境模板（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`91aa9dd23a`](https://github.com/nodejs/node/commit/91aa9dd23a)] - **(SEMVER-MINOR)** **src**: 创建每个 isolate 的 fs_dir 属性（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`5c5834190a`](https://github.com/nodejs/node/commit/5c5834190a)] - **(SEMVER-MINOR)** **src**: 创建每个 isolate 的 worker 属性（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`4a1ce45181`](https://github.com/nodejs/node/commit/4a1ce45181)] - **(SEMVER-MINOR)** **src**: 将 process binding 数据设为弱引用（Chengzhong Wu）[#48655](https://github.com/nodejs/node/pull/48655)
* \[[`8746073664`](https://github.com/nodejs/node/commit/8746073664)] - **src**: 避免无声地转换为有符号/无符号整数（Tobias Nießen）[#50663](https://github.com/nodejs/node/pull/50663)
* \[[`57587de1fa`](https://github.com/nodejs/node/commit/57587de1fa)] - **src**: 处理来自 uv_pipe_connect2() 的错误（Deokjin Kim）[#50657](https://github.com/nodejs/node/pull/50657)
* \[[`e5cce004e8`](https://github.com/nodejs/node/commit/e5cce004e8)] - **stream**: 修复 ReadableStream.from 的可枚举性（Mattias Buelens）[#50779](https://github.com/nodejs/node/pull/50779)
* \[[`4522e229c0`](https://github.com/nodejs/node/commit/4522e229c0)] - **stream**: 修复 ReadableStream.prototype.values 的可枚举性（Mattias Buelens）[#50779](https://github.com/nodejs/node/pull/50779)
* \[[`2e0abed973`](https://github.com/nodejs/node/commit/2e0abed973)] - **stream**: 在 zlib 错误上返回预期的 Error 类（Filip Skokan）[#50712](https://github.com/nodejs/node/pull/50712)
* \[[`a275155e81`](https://github.com/nodejs/node/commit/a275155e81)] - **stream**: 为 Compression Streams 添加 Symbol.toStringTag（Filip Skokan）[#50712](https://github.com/nodejs/node/pull/50712)
* \[[`146ad9cab0`](https://github.com/nodejs/node/commit/146ad9cab0)] - **stream**: 按照 WebIDL 定义处理 compression web stream 格式（Filip Skokan）[#50631](https://github.com/nodejs/node/pull/50631)
* \[[`087cffc7c2`](https://github.com/nodejs/node/commit/087cffc7c2)] - **test**: 修复 v8 未正常规范化字母数字路径的消息（Jithil P Ponnan）[#50730](https://github.com/nodejs/node/pull/50730)
* \[[`7de900a442`](https://github.com/nodejs/node/commit/7de900a442)] - **test**: 修复 c-ares 更新到 1.21.0+ 后 dns 测试用例失败的问题（Brad House）[#50743](https://github.com/nodejs/node/pull/50743)
* \[[`b1b6c44712`](https://github.com/nodejs/node/commit/b1b6c44712)] - **test**: 用 for of 替换 forEach（Conor Watson）[#50594](https://github.com/nodejs/node/pull/50594)
* \[[`7f44164ad4`](https://github.com/nodejs/node/commit/7f44164ad4)] - **test**: 在 test-webcrypto-sign-verify-ecdsa.js 中将 forEach 替换为 for（Alessandro Di Nisio）[#50795](https://github.com/nodejs/node/pull/50795)
* \[[`9d76de1993`](https://github.com/nodejs/node/commit/9d76de1993)] - **test**: 在 test-https-simple.js 中将 foreach 替换为 for in（Shikha Mehta）[#49793](https://github.com/nodejs/node/pull/49793)
* \[[`ce8fc56ee4`](https://github.com/nodejs/node/commit/ce8fc56ee4)] - **test**: 添加关于未解决规范问题的说明（Mattias Buelens）[#50779](https://github.com/nodejs/node/pull/50779)
* \[[`628a12ac18`](https://github.com/nodejs/node/commit/628a12ac18)] - **test**: 添加关于拥有 type 的可读流的说明（Mattias Buelens）[#50779](https://github.com/nodejs/node/pull/50779)
* \[[`82f0882ce0`](https://github.com/nodejs/node/commit/82f0882ce0)] - **test**: 在 test-url-relative 中将 forEach 替换为 for-of（vitosorriso）[#50788](https://github.com/nodejs/node/pull/50788)
* \[[`3b7998305d`](https://github.com/nodejs/node/commit/3b7998305d)] - **test**: 在 test-tls-getprotocol.js 中将 forEach() 替换为 for ... of（Steve Goode）[#50600](https://github.com/nodejs/node/pull/50600)
* \[[`0e4d25eb5c`](https://github.com/nodejs/node/commit/0e4d25eb5c)] - **test**: 在 console WPT 状态中使用 requires 而不是 flaky（Filip Skokan）[#50812](https://github.com/nodejs/node/pull/50812)
* \[[`221952a88e`](https://github.com/nodejs/node/commit/221952a88e)] - **test**: 使用 ppc 和 ppc64 在 PowerPC 上跳过 SEA 测试（Joyee Cheung）[#50828](https://github.com/nodejs/node/pull/50828)
* \[[`0e3b714069`](https://github.com/nodejs/node/commit/0e3b714069)] - **test**: 为 encoding 启用 idlharness 测试（Mattias Buelens）[#50778](https://github.com/nodejs/node/pull/50778)
* \[[`c8d4cd68b4`](https://github.com/nodejs/node/commit/c8d4cd68b4)] - **test**: 在 whatwg-encoding-custom-interop 中替换 forEach（Honza Machala）[#50607](https://github.com/nodejs/node/pull/50607)
* \[[`f25637b5c9`](https://github.com/nodejs/node/commit/f25637b5c9)] - **test**: 更新用于 WebIDL 测试的 WPT 文件（Filip Skokan）[#50712](https://github.com/nodejs/node/pull/50712)
* \[[`f2e0fce389`](https://github.com/nodejs/node/commit/f2e0fce389)] - **test**: 将 forEach() 替换为 for-loop（Jan）[#50596](https://github.com/nodejs/node/pull/50596)
* \[[`4b26f14a53`](https://github.com/nodejs/node/commit/4b26f14a53)] - **test**: 改进 test-bootstrap-modules.js（Joyee Cheung）[#50708](https://github.com/nodejs/node/pull/50708)
* \[[`28d78de0dd`](https://github.com/nodejs/node/commit/28d78de0dd)] - **test**: 如果磁盘空间 < 120MB，则跳过 parallel/test-macos-app-sandbox（Joyee Cheung）[#50764](https://github.com/nodejs/node/pull/50764)
* \[[`4088b750e7`](https://github.com/nodejs/node/commit/4088b750e7)] - **test**: 将 SEA 测试标记为在 PowerPC 上不稳定（Joyee Cheung）[#50750](https://github.com/nodejs/node/pull/50750)
* \[[`6475cee6a4`](https://github.com/nodejs/node/commit/6475cee6a4)] - **test**: 为 test-shadow-realm-gc-* 中的 GC 留出更多时间（Joyee Cheung）[#50735](https://github.com/nodejs/node/pull/50735)
* \[[`0e8275b610`](https://github.com/nodejs/node/commit/0e8275b610)] - **test**: 将 foreach 替换为 for（Markus Muschol）[#50599](https://github.com/nodejs/node/pull/50599)
* \[[`377deded59`](https://github.com/nodejs/node/commit/377deded59)] - **test**: 测试 streambase 是否已经有消费者（Jithil P Ponnan）[#48059](https://github.com/nodejs/node/pull/48059)
* \[[`342a83e728`](https://github.com/nodejs/node/commit/342a83e728)] - **test**: 在 path extname 中将 forEach 改为 for...of（Kyriakos Markakis）[#50667](https://github.com/nodejs/node/pull/50667)
* \[[`75265e491d`](https://github.com/nodejs/node/commit/75265e491d)] - **test**: 将 forEach 替换为 for...of（Ryan Williams）[#50611](https://github.com/nodejs/node/pull/50611)
* \[[`982b57651b`](https://github.com/nodejs/node/commit/982b57651b)] - **test**: 将 message v8 测试从 Python 迁移到 JS（Joshua LeMay）[#50421](https://github.com/nodejs/node/pull/50421)
* \[[`7ebc8c2aed`](https://github.com/nodejs/node/commit/7ebc8c2aed)] - **test,stream**: 启用 compression WPTs（Filip Skokan）[#50631](https://github.com/nodejs/node/pull/50631)
* \[[`0bd694ab64`](https://github.com/nodejs/node/commit/0bd694ab64)] - **test_runner**: 为各种 mock timer 问题添加测试（Mika Fischer）[#50384](https://github.com/nodejs/node/pull/50384)
* \[[`dee8039c9b`](https://github.com/nodejs/node/commit/dee8039c9b)] - **tls**: 修复在设置 cert 和 key 之前设置 cipher 的顺序（Kumar Rishav）[#50186](https://github.com/nodejs/node/pull/50186)
* \[[`5de30531b8`](https://github.com/nodejs/node/commit/5de30531b8)] - **tools**: 添加 macOS 公证验证步骤（Ulises Gascón）[#50833](https://github.com/nodejs/node/pull/50833)
* \[[`a12d9e03f2`](https://github.com/nodejs/node/commit/a12d9e03f2)] - **tools**: 使用 macOS keychain 对发布版本进行公证（Ulises Gascón）[#50715](https://github.com/nodejs/node/pull/50715)
* \[[`f21637717f`](https://github.com/nodejs/node/commit/f21637717f)] - **tools**: 将 eslint 更新到 8.54.0（Node.js GitHub Bot）[#50809](https://github.com/nodejs/node/pull/50809)
* \[[`daa933d93a`](https://github.com/nodejs/node/commit/daa933d93a)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.5.0（Node.js GitHub Bot）[#50807](https://github.com/nodejs/node/pull/50807)
* \[[`52830b71cc`](https://github.com/nodejs/node/commit/52830b71cc)] - **tools**: 添加更新发布链接的工作流（Michaël Zasso）[#50710](https://github.com/nodejs/node/pull/50710)
* \[[`db8ce5bbdd`](https://github.com/nodejs/node/commit/db8ce5bbdd)] - **tools**: 在 dep_updaters 中识别 GN 文件（Cheng Zhao）[#50693](https://github.com/nodejs/node/pull/50693)
* \[[`5ef6729b66`](https://github.com/nodejs/node/commit/5ef6729b66)] - **tools**: 移除未使用的文件（Ulises Gascon）[#50622](https://github.com/nodejs/node/pull/50622)
* \[[`c49483820a`](https://github.com/nodejs/node/commit/c49483820a)] - **tools**: 更改 minimatch 安装策略（Marco Ippolito）[#50476](https://github.com/nodejs/node/pull/50476)
* \[[`0d556d9a59`](https://github.com/nodejs/node/commit/0d556d9a59)] - **tools**: 将 lint-md-dependencies 更新到 rollup\@4.3.1（Node.js GitHub Bot）[#50675](https://github.com/nodejs/node/pull/50675)
* \[[`eaa4c14e6b`](https://github.com/nodejs/node/commit/eaa4c14e6b)] - **util**: 改进 normalizeEncoding 的性能（kylo5aby）[#50721](https://github.com/nodejs/node/pull/50721)
* \[[`a5d959b765`](https://github.com/nodejs/node/commit/a5d959b765)] - **v8,tools**: 暴露必要的 V8 定义（Cheng Zhao）[#50820](https://github.com/nodejs/node/pull/50820)

<a id="21.2.0"></a>

## 2023-11-14，版本 21.2.0（当前），@targos

### 重要变更

* \[[`e25c65ee2f`](https://github.com/nodejs/node/commit/e25c65ee2f)] - **doc**: 将 MrJithil 添加为协作者 (Jithil P Ponnan) [#50666](https://github.com/nodejs/node/pull/50666)
* \[[`f2366573f9`](https://github.com/nodejs/node/commit/f2366573f9)] - **doc**: 将 Ethan-Arrowood 添加为协作者 (Ethan Arrowood) [#50393](https://github.com/nodejs/node/pull/50393)
* \[[`eac9cc5fcb`](https://github.com/nodejs/node/commit/eac9cc5fcb)] - **(SEMVER-MINOR)** **esm**: 添加 import.meta.dirname 和 import.meta.filename (James Sumners) [#48740](https://github.com/nodejs/node/pull/48740)
* \[[`7e151114b1`](https://github.com/nodejs/node/commit/7e151114b1)] - **fs**: 为 fs/promises 添加堆栈跟踪 (翠 / green) [#49849](https://github.com/nodejs/node/pull/49849)
* \[[`6dbb280733`](https://github.com/nodejs/node/commit/6dbb280733)] - **(SEMVER-MINOR)** **lib**: 添加 `--no-experimental-global-navigator` CLI 标志 (Antoine du Hamel) [#50562](https://github.com/nodejs/node/pull/50562)
* \[[`03c730b931`](https://github.com/nodejs/node/commit/03c730b931)] - **(SEMVER-MINOR)** **lib**: 添加 navigator.language 和 navigator.languages (Aras Abbasi) [#50303](https://github.com/nodejs/node/pull/50303)
* \[[`f932f4c518`](https://github.com/nodejs/node/commit/f932f4c518)] - **(SEMVER-MINOR)** **lib**: 添加 navigator.platform (Aras Abbasi) [#50385](https://github.com/nodejs/node/pull/50385)
* \[[`91f37d1dc3`](https://github.com/nodejs/node/commit/91f37d1dc3)] - **(SEMVER-MINOR)** **stream**: 为 webstreams 压缩添加对 `deflate-raw` 格式的支持 (Damian Krzeminski) [#50097](https://github.com/nodejs/node/pull/50097)
* \[[`65850a67c7`](https://github.com/nodejs/node/commit/65850a67c7)] - **stream**: 为 Readable 缓冲区使用 Array (Robert Nagy) [#50341](https://github.com/nodejs/node/pull/50341)
* \[[`e433fa54b7`](https://github.com/nodejs/node/commit/e433fa54b7)] - **stream**: 优化创建过程 (Robert Nagy) [#50337](https://github.com/nodejs/node/pull/50337)
* \[[`c9b92bba58`](https://github.com/nodejs/node/commit/c9b92bba58)] - **(SEMVER-MINOR)** **test_runner**: 新增内置 lcov 报告器 (Phil Nash) [#50018](https://github.com/nodejs/node/pull/50018)
* \[[`f6c496563e`](https://github.com/nodejs/node/commit/f6c496563e)] - **(SEMVER-MINOR)** **test_runner**: 将 Date 添加到支持的 mock API 中 (Lucas Santos) [#48638](https://github.com/nodejs/node/pull/48638)
* \[[`05e8b6ef20`](https://github.com/nodejs/node/commit/05e8b6ef20)] - **(SEMVER-MINOR)** **test_runner, cli**: 添加 --test-timeout 标志 (Shubham Pandey) [#50443](https://github.com/nodejs/node/pull/50443)

### 提交

* \[[`065d8844c5`](https://github.com/nodejs/node/commit/065d8844c5)] - **benchmark**: 更改 benchmark/es/string-concatenations.js 中的迭代次数 (Liu Jia) [#50585](https://github.com/nodejs/node/pull/50585)
* \[[`3f37ed9f0f`](https://github.com/nodejs/node/commit/3f37ed9f0f)] - **benchmark**: 为编码添加基准测试 (Aras Abbasi) [#50348](https://github.com/nodejs/node/pull/50348)
* \[[`c4b6e1e9e4`](https://github.com/nodejs/node/commit/c4b6e1e9e4)] - **benchmark**: 为 Readable.from 添加更多用例 (Raz Luvaton) [#50351](https://github.com/nodejs/node/pull/50351)
* \[[`2006b57a9a`](https://github.com/nodejs/node/commit/2006b57a9a)] - **benchmark**: 在 IBMi 上跳过 test-benchmark-os (Michael Dawson) [#50286](https://github.com/nodejs/node/pull/50286)
* \[[`800206b04a`](https://github.com/nodejs/node/commit/800206b04a)] - **benchmark**: 将 permission-fs-read 移动到 permission-processhas-fs-read (Aki Hasegawa-Johnson) [#49770](https://github.com/nodejs/node/pull/49770)
* \[[`3bedaf9405`](https://github.com/nodejs/node/commit/3bedaf9405)] - **buffer**: 提升 Buffer.equals 性能 (kylo5aby) [#50621](https://github.com/nodejs/node/pull/50621)
* \[[`b9f3613908`](https://github.com/nodejs/node/commit/b9f3613908)] - **build**: 添加 GN 构建文件 (Cheng Zhao) [#47637](https://github.com/nodejs/node/pull/47637)
* \[[`22eb0257d8`](https://github.com/nodejs/node/commit/22eb0257d8)] - **build**: 修复在 Python 3.12 下构建的问题 (Luigi Pinca) [#50582](https://github.com/nodejs/node/pull/50582)
* \[[`642c057299`](https://github.com/nodejs/node/commit/642c057299)] - **build**: 支持 Python 3.12 (Shi Pujin) [#50209](https://github.com/nodejs/node/pull/50209)
* \[[`54ebfc10cb`](https://github.com/nodejs/node/commit/54ebfc10cb)] - **build**: 修复仅有 python3 时的构建问题 (Cheng Zhao) [#48462](https://github.com/nodejs/node/pull/48462)
* \[[`5073a3e16d`](https://github.com/nodejs/node/commit/5073a3e16d)] - **deps**: 将 base64 更新到 0.5.1 (Node.js GitHub Bot) [#50629](https://github.com/nodejs/node/pull/50629)
* \[[`f70a59f4fa`](https://github.com/nodejs/node/commit/f70a59f4fa)] - **deps**: 将 corepack 更新到 0.23.0 (Node.js GitHub Bot) [#50563](https://github.com/nodejs/node/pull/50563)
* \[[`78b3432be5`](https://github.com/nodejs/node/commit/78b3432be5)] - **deps**: V8: cherry-pick 13192d6e10fa (Levi Zim) [#50552](https://github.com/nodejs/node/pull/50552)
* \[[`93e3cc3907`](https://github.com/nodejs/node/commit/93e3cc3907)] - **deps**: 将 npm 升级到 10.2.3 (npm team) [#50531](https://github.com/nodejs/node/pull/50531)
* \[[`189e5e5326`](https://github.com/nodejs/node/commit/189e5e5326)] - **deps**: 将 nghttp2 更新到 1.58.0 (Node.js GitHub Bot) [#50441](https://github.com/nodejs/node/pull/50441)
* \[[`57bfe53095`](https://github.com/nodejs/node/commit/57bfe53095)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-dfc48fc (Node.js GitHub Bot) [#50456](https://github.com/nodejs/node/pull/50456)
* \[[`1e6922e67a`](https://github.com/nodejs/node/commit/1e6922e67a)] - **deps**: 将 V8 补丁更新到 11.8.172.17 (Michaël Zasso) [#50292](https://github.com/nodejs/node/pull/50292)
* \[[`28453ff966`](https://github.com/nodejs/node/commit/28453ff966)] - **deps**: 将 acorn 更新到 8.11.2 (Node.js GitHub Bot) [#50460](https://github.com/nodejs/node/pull/50460)
* \[[`0a793a2566`](https://github.com/nodejs/node/commit/0a793a2566)] - **deps**: 将 undici 更新到 5.27.0 (Node.js GitHub Bot) [#50463](https://github.com/nodejs/node/pull/50463)
* \[[`a90c6d669c`](https://github.com/nodejs/node/commit/a90c6d669c)] - **deps**: 为 openssl-3.0.12+quic1 更新 archs 文件 (Node.js GitHub Bot) [#50411](https://github.com/nodejs/node/pull/50411)
* \[[`a64217c116`](https://github.com/nodejs/node/commit/a64217c116)] - **deps**: 将 openssl 源码升级到 quictls/openssl-3.0.12+quic1 (Node.js GitHub Bot) [#50411](https://github.com/nodejs/node/pull/50411)
* \[[`62515e118c`](https://github.com/nodejs/node/commit/62515e118c)] - **deps**: 将 llhttp 更新到 9.1.3 (Node.js GitHub Bot) [#50080](https://github.com/nodejs/node/pull/50080)
* \[[`d6f49c7bdc`](https://github.com/nodejs/node/commit/d6f49c7bdc)] - **deps**: 将 googletest 更新到 116b7e5 (Node.js GitHub Bot) [#50324](https://github.com/nodejs/node/pull/50324)
* \[[`e25c65ee2f`](https://github.com/nodejs/node/commit/e25c65ee2f)] - **doc**: 将 MrJithil 添加为协作者 (Jithil P Ponnan) [#50666](https://github.com/nodejs/node/pull/50666)
* \[[`8be0efd68f`](https://github.com/nodejs/node/commit/8be0efd68f)] - **doc**: 修复 fs.md 中的拼写错误 (fwio) [#50570](https://github.com/nodejs/node/pull/50570)
* \[[`a656bf2dee`](https://github.com/nodejs/node/commit/a656bf2dee)] - **doc**: 补充 `subtle.encrypt` 中缺失的参数说明 (Deokjin Kim) [#50578](https://github.com/nodejs/node/pull/50578)
* \[[`4cbe44ed6f`](https://github.com/nodejs/node/commit/4cbe44ed6f)] - **doc**: 更新 pm 文档以包含资源 (Ranieri Innocenti Spada) [#50601](https://github.com/nodejs/node/pull/50601)
* \[[`479c1ea9fe`](https://github.com/nodejs/node/commit/479c1ea9fe)] - **doc**: 更正 v20.6.0 changelog 中的署名 (Jacob Smith) [#50564](https://github.com/nodejs/node/pull/50564)
* \[[`1668798902`](https://github.com/nodejs/node/commit/1668798902)] - **doc**: 调整 `console.table` 行左对齐 (Jungku Lee) [#50553](https://github.com/nodejs/node/pull/50553)
* \[[`886fc48f87`](https://github.com/nodejs/node/commit/886fc48f87)] - **doc**: 为链接添加下划线 (Rich Trott) [#50481](https://github.com/nodejs/node/pull/50481)
* \[[`98cfa3a72b`](https://github.com/nodejs/node/commit/98cfa3a72b)] - **doc**: 推荐受支持的 Python 版本 (Luigi Pinca) [#50407](https://github.com/nodejs/node/pull/50407)
* \[[`921e36ece9`](https://github.com/nodejs/node/commit/921e36ece9)] - **doc**: 删除重复词 (Gerhard Stöbich) [#50475](https://github.com/nodejs/node/pull/50475)
* \[[`43074ee21c`](https://github.com/nodejs/node/commit/43074ee21c)] - **doc**: 修复 `webstreams.md` 中的拼写错误 (André Santos) [#50426](https://github.com/nodejs/node/pull/50426)
* \[[`0b11bf16e8`](https://github.com/nodejs/node/commit/0b11bf16e8)] - **doc**: 更新 v21.1.0 中的重要变更 (Joyee Cheung) [#50388](https://github.com/nodejs/node/pull/50388)
* \[[`d62e81229c`](https://github.com/nodejs/node/commit/d62e81229c)] - **doc**: 添加关于 Node-API 版本 >=9 的信息 (Michael Dawson) [#50168](https://github.com/nodejs/node/pull/50168)
* \[[`f2366573f9`](https://github.com/nodejs/node/commit/f2366573f9)] - **doc**: 将 Ethan-Arrowood 添加为协作者 (Ethan Arrowood) [#50393](https://github.com/nodejs/node/pull/50393)
* \[[`d9f92bc042`](https://github.com/nodejs/node/commit/d9f92bc042)] - **doc**: 修复 `releases.md` 中的目录 (Bryce Seefieldt) [#50372](https://github.com/nodejs/node/pull/50372)
* \[[`14e3675b13`](https://github.com/nodejs/node/commit/14e3675b13)] - **errors**: 改进 hideStackFrames (Aras Abbasi) [#49990](https://github.com/nodejs/node/pull/49990)
* \[[`09c02ed26b`](https://github.com/nodejs/node/commit/09c02ed26b)] - **esm**: 在 `--default-type=module` 下默认加载时绕过 CJS 加载器 (Antoine du Hamel) [#50004](https://github.com/nodejs/node/pull/50004)
* \[[`eac9cc5fcb`](https://github.com/nodejs/node/commit/eac9cc5fcb)] - **(SEMVER-MINOR)** **esm**: 添加 import.meta.dirname 和 import.meta.filename (James Sumners) [#48740](https://github.com/nodejs/node/pull/48740)
* \[[`44f19ce394`](https://github.com/nodejs/node/commit/44f19ce394)] - **fs**: 更新 `readdir` 的 jsdoc 参数 (Jungku Lee) [#50448](https://github.com/nodejs/node/pull/50448)
* \[[`7e151114b1`](https://github.com/nodejs/node/commit/7e151114b1)] - **fs**: 为 fs/promises 添加堆栈跟踪 (翠 / green) [#49849](https://github.com/nodejs/node/pull/49849)
* \[[`3e7226a12f`](https://github.com/nodejs/node/commit/3e7226a12f)] - **fs**: 不在 cpSync 内部抛出错误 (Yagiz Nizipli) [#50185](https://github.com/nodejs/node/pull/50185)
* \[[`67cbe1b80f`](https://github.com/nodejs/node/commit/67cbe1b80f)] - **fs,url**: 将 `FromNamespacedPath` 移到 `node_url` (Yagiz Nizipli) [#50090](https://github.com/nodejs/node/pull/50090)
* \[[`b4db32e9cb`](https://github.com/nodejs/node/commit/b4db32e9cb)] - **fs,url**: 重构 `FileURLToPath` 方法 (Yagiz Nizipli) [#50090](https://github.com/nodejs/node/pull/50090)
* \[[`4345ee2ede`](https://github.com/nodejs/node/commit/4345ee2ede)] - **fs,url**: 将 `FileURLToPath` 移到 node\_url (Yagiz Nizipli) [#50090](https://github.com/nodejs/node/pull/50090)
* \[[`ed293fc520`](https://github.com/nodejs/node/commit/ed293fc520)] - **lib**: 移除已弃用的字符串方法 (Jithil P Ponnan) [#50592](https://github.com/nodejs/node/pull/50592)
* \[[`363bc46b92`](https://github.com/nodejs/node/commit/363bc46b92)] - **lib**: 修复 assert 在 ESM 和 CJS 中显示 diff 消息的问题 (Jithil P Ponnan) [#50634](https://github.com/nodejs/node/pull/50634)
* \[[`5fa40bea9e`](https://github.com/nodejs/node/commit/5fa40bea9e)] - **lib**: 使 event 的静态属性不可写且不可配置 (Muthukumar) [#50425](https://github.com/nodejs/node/pull/50425)
* \[[`6dbb280733`](https://github.com/nodejs/node/commit/6dbb280733)] - **(SEMVER-MINOR)** **lib**: 添加 `--no-experimental-global-navigator` CLI 标志 (Antoine du Hamel) [#50562](https://github.com/nodejs/node/pull/50562)
* \[[`03c730b931`](https://github.com/nodejs/node/commit/03c730b931)] - **(SEMVER-MINOR)** **lib**: 添加 navigator.language 和 navigator.languages (Aras Abbasi) [#50303](https://github.com/nodejs/node/pull/50303)
* \[[`f932f4c518`](https://github.com/nodejs/node/commit/f932f4c518)] - **(SEMVER-MINOR)** **lib**: 添加 navigator.platform (Aras Abbasi) [#50385](https://github.com/nodejs/node/pull/50385)
* \[[`c9bd0c5000`](https://github.com/nodejs/node/commit/c9bd0c5000)] - **lib**: 对 navigator.userAgent 使用 primordials (Aras Abbasi) [#50467](https://github.com/nodejs/node/pull/50467)
* \[[`6dabe7cf60`](https://github.com/nodejs/node/commit/6dabe7cf60)] - **lib**: 避免在 nodeprecation 标志上进行内存分配 (Vinicius Lourenço) [#50231](https://github.com/nodejs/node/pull/50231)
* \[[`3615a61ac8`](https://github.com/nodejs/node/commit/3615a61ac8)] - **lib**: 将 console.table 行左对齐 (Jithil P Ponnan) [#50135](https://github.com/nodejs/node/pull/50135)
* \[[`9e7131ffda`](https://github.com/nodejs/node/commit/9e7131ffda)] - **meta**: 将 web-standards 添加为 WPT 所有者 (Filip Skokan) [#50636](https://github.com/nodejs/node/pull/50636)
* \[[`dedfb5ab26`](https://github.com/nodejs/node/commit/dedfb5ab26)] - **meta**: 将 github/codeql-action 从 2.21.9 升级到 2.22.5 (dependabot[bot]) [#50513](https://github.com/nodejs/node/pull/50513)
* \[[`4e83036d89`](https://github.com/nodejs/node/commit/4e83036d89)] - **meta**: 将 step-security/harden-runner 从 2.5.1 升级到 2.6.0 (dependabot[bot]) [#50512](https://github.com/nodejs/node/pull/50512)
* \[[`4bf9cffa95`](https://github.com/nodejs/node/commit/4bf9cffa95)] - **meta**: 将 ossf/scorecard-action 从 2.2.0 升级到 2.3.1 (dependabot[bot]) [#50509](https://github.com/nodejs/node/pull/50509)
* \[[`49cce7634b`](https://github.com/nodejs/node/commit/49cce7634b)] - **meta**: 修复协作者列表中的间距 (Antoine du Hamel) [#50641](https://github.com/nodejs/node/pull/50641)
* \[[`12e54e360c`](https://github.com/nodejs/node/commit/12e54e360c)] - **meta**: 将 actions/setup-python 从 4.7.0 升级到 4.7.1 (dependabot[bot]) [#50510](https://github.com/nodejs/node/pull/50510)
* \[[`85a527e6e0`](https://github.com/nodejs/node/commit/85a527e6e0)] - **meta**: 将 crypto 添加为 crypto 和 webcrypto 文档所有者 (Filip Skokan) [#50579](https://github.com/nodejs/node/pull/50579)
* \[[`ff9b3bdf34`](https://github.com/nodejs/node/commit/ff9b3bdf34)] - **meta**: 将 actions/setup-node 从 3.8.1 升级到 4.0.0 (dependabot[bot]) [#50514](https://github.com/nodejs/node/pull/50514)
* \[[`840303078f`](https://github.com/nodejs/node/commit/840303078f)] - **meta**: 将 actions/checkout 从 4.1.0 升级到 4.1.1 (dependabot[bot]) [#50511](https://github.com/nodejs/node/pull/50511)
* \[[`c9e6e4e739`](https://github.com/nodejs/node/commit/c9e6e4e739)] - **meta**: 将 <ethan.arrowood@vercel.com> 添加到 mailmap (Ethan Arrowood) [#50491](https://github.com/nodejs/node/pull/50491)
* \[[`d94010b745`](https://github.com/nodejs/node/commit/d94010b745)] - **meta**: 将 web-standards 添加为 web api 可见性所有者 (Chengzhong Wu) [#50418](https://github.com/nodejs/node/pull/50418)
* \[[`e008336b17`](https://github.com/nodejs/node/commit/e008336b17)] - **meta**: 提及其他重要变更部分 (Rafael Gonzaga) [#50309](https://github.com/nodejs/node/pull/50309)
* \[[`3606a0a848`](https://github.com/nodejs/node/commit/3606a0a848)] - **module**: 顺序执行 `--import` (Antoine du Hamel) [#50474](https://github.com/nodejs/node/pull/50474)
* \[[`667d245e75`](https://github.com/nodejs/node/commit/667d245e75)] - **module**: 在获取 json 模块时在 accept header 中添加 application/json (Marco Ippolito) [#50119](https://github.com/nodejs/node/pull/50119)
* \[[`905ca00cbc`](https://github.com/nodejs/node/commit/905ca00cbc)] - **perf\_hooks**: 降低 createHistogram 的开销 (Vinícius Lourenço) [#50074](https://github.com/nodejs/node/pull/50074)
* \[[`7c35055c8e`](https://github.com/nodejs/node/commit/7c35055c8e)] - **permission**: 处理 coverity 警告 (Michael Dawson) [#50215](https://github.com/nodejs/node/pull/50215)
* \[[`b740324f7c`](https://github.com/nodejs/node/commit/b740324f7c)] - **src**: 在 DumpJavaScriptBacktrace() 中使用 v8::Isolate::TryGetCurrent() (Joyee Cheung) [#50518](https://github.com/nodejs/node/pull/50518)
* \[[`6e20e083dd`](https://github.com/nodejs/node/commit/6e20e083dd)] - **src**: 在 C++ 断言中打印更多信息 (Joyee Cheung) [#50242](https://github.com/nodejs/node/pull/50242)
* \[[`9f55dfc266`](https://github.com/nodejs/node/commit/9f55dfc266)] - **src**: 将 node::credentials::HasOnly 限制在 unit 外部不可见 (Tobias Nießen) [#50450](https://github.com/nodejs/node/pull/50450)
* \[[`4eb74a2c24`](https://github.com/nodejs/node/commit/4eb74a2c24)] - **src**: readiterable 条目可能为空 (Matthew Aitken) [#50398](https://github.com/nodejs/node/pull/50398)
* \[[`5b453d45d6`](https://github.com/nodejs/node/commit/5b453d45d6)] - **src**: 在原生层实现 structuredClone (Joyee Cheung) [#50330](https://github.com/nodejs/node/pull/50330)
* \[[`f1d79b3cbb`](https://github.com/nodejs/node/commit/f1d79b3cbb)] - **src**: 在 FromFilePath() 中使用 find 代替逐字符查找 (Daniel Lemire) [#50288](https://github.com/nodejs/node/pull/50288)
* \[[`541bdf1e92`](https://github.com/nodejs/node/commit/541bdf1e92)] - **src**: 在 zlib 版本中添加提交哈希简写 (Jithil P Ponnan) [#50158](https://github.com/nodejs/node/pull/50158)
* \[[`91f37d1dc3`](https://github.com/nodejs/node/commit/91f37d1dc3)] - **(SEMVER-MINOR)** **stream**: 为 webstreams 压缩添加对 `deflate-raw` 格式的支持 (Damian Krzeminski) [#50097](https://github.com/nodejs/node/pull/50097)
* \[[`360f5d9088`](https://github.com/nodejs/node/commit/360f5d9088)] - **stream**: 修复 Writable.destroy 性能回退 (Robert Nagy) [#50478](https://github.com/nodejs/node/pull/50478)
* \[[`0116ae7601`](https://github.com/nodejs/node/commit/0116ae7601)] - **stream**: 预分配 \_events (Robert Nagy) [#50428](https://github.com/nodejs/node/pull/50428)
* \[[`2c0d88e83e`](https://github.com/nodejs/node/commit/2c0d88e83e)] - **stream**: 删除不再相关的注释 (Robert Nagy) [#50446](https://github.com/nodejs/node/pull/50446)
* \[[`03c4ff760d`](https://github.com/nodejs/node/commit/03c4ff760d)] - **stream**: 对 construct/destroy 使用位字段 (Robert Nagy) [#50408](https://github.com/nodejs/node/pull/50408)
* \[[`e20b272d46`](https://github.com/nodejs/node/commit/e20b272d46)] - **stream**: 改进 from 性能 (Raz Luvaton) [#50359](https://github.com/nodejs/node/pull/50359)
* \[[`893024cb7c`](https://github.com/nodejs/node/commit/893024cb7c)] - **stream**: 避免调用 listenerCount (Robert Nagy) [#50357](https://github.com/nodejs/node/pull/50357)
* \[[`586ec48e5f`](https://github.com/nodejs/node/commit/586ec48e5f)] - **stream**: readable 使用 bitmap 访问器 (Robert Nagy) [#50350](https://github.com/nodejs/node/pull/50350)
* \[[`65850a67c7`](https://github.com/nodejs/node/commit/65850a67c7)] - **stream**: 为 Readable 缓冲区使用 Array (Robert Nagy) [#50341](https://github.com/nodejs/node/pull/50341)
* \[[`e433fa54b7`](https://github.com/nodejs/node/commit/e433fa54b7)] - **stream**: 优化创建过程 (Robert Nagy) [#50337](https://github.com/nodejs/node/pull/50337)
* \[[`f56ae67c7b`](https://github.com/nodejs/node/commit/f56ae67c7b)] - **stream**: 重构 writable \_write (Robert Nagy) [#50198](https://github.com/nodejs/node/pull/50198)
* \[[`766bd9c8cc`](https://github.com/nodejs/node/commit/766bd9c8cc)] - **stream**: 避免 defaultEncoding 的 getter (Robert Nagy) [#50203](https://github.com/nodejs/node/pull/50203)
* \[[`8be718a0bd`](https://github.com/nodejs/node/commit/8be718a0bd)] - **test**: 使用解构访问设置值 (Honza Jedlička) [#50609](https://github.com/nodejs/node/pull/50609)
* \[[`b701567a46`](https://github.com/nodejs/node/commit/b701567a46)] - **test**: 将 forEach() 替换为 for .. of (Evgenia Blajer) [#50605](https://github.com/nodejs/node/pull/50605)
* \[[`e978fd4375`](https://github.com/nodejs/node/commit/e978fd4375)] - **test**: 在 test-readline-keys.js 中将 forEach() 替换为 for ... of (William Liang) [#50604](https://github.com/nodejs/node/pull/50604)
* \[[`bc92be4ca9`](https://github.com/nodejs/node/commit/bc92be4ca9)] - **test**: 在 test-http2-single-headers.js 中将 forEach() 替换为 for ... of (spiritualized) [#50606](https://github.com/nodejs/node/pull/50606)
* \[[`864cd32003`](https://github.com/nodejs/node/commit/864cd32003)] - **test**: 将 forEach 替换为 for of (john-mcinall) [#50602](https://github.com/nodejs/node/pull/50602)
* \[[`2fdcf5c3da`](https://github.com/nodejs/node/commit/2fdcf5c3da)] - **test**: 删除未使用的文件 (James Sumners) [#50528](https://github.com/nodejs/node/pull/50528)
* \[[`2eeda3f09b`](https://github.com/nodejs/node/commit/2eeda3f09b)] - **test**: 将 forEach 替换为 for of (Kevin Kühnemund) [#50597](https://github.com/nodejs/node/pull/50597)
* \[[`1d52a57cba`](https://github.com/nodejs/node/commit/1d52a57cba)] - **test**: 将 forEach 替换为 for of (CorrWu) [#49785](https://github.com/nodejs/node/pull/49785)
* \[[`52b517f4ec`](https://github.com/nodejs/node/commit/52b517f4ec)] - **test**: 将 forEach 替换为 for \[...] of (Gabriel Bota) [#50615](https://github.com/nodejs/node/pull/50615)
* \[[`931e1e756a`](https://github.com/nodejs/node/commit/931e1e756a)] - **test**: 放宽与共享 OpenSSL 的版本检查 (Luigi Pinca) [#50505](https://github.com/nodejs/node/pull/50505)
* \[[`6ed8fbf612`](https://github.com/nodejs/node/commit/6ed8fbf612)] - **test**: 添加 WPT 报告测试持续时间 (Filip Skokan) [#50574](https://github.com/nodejs/node/pull/50574)
* \[[`7c7be517b4`](https://github.com/nodejs/node/commit/7c7be517b4)] - **test**: 在 test-global.js 中将 forEach() 替换为 for ... of 循环 (Kajol) [#49772](https://github.com/nodejs/node/pull/49772)
* \[[`de46a346ab`](https://github.com/nodejs/node/commit/de46a346ab)] - **test**: 跳过 test-diagnostics-channel-memory-leak.js (Joyee Cheung) [#50327](https://github.com/nodejs/node/pull/50327)
* \[[`8487cac24c`](https://github.com/nodejs/node/commit/8487cac24c)] - **test**: 改进 `.env` 上的 `UV_THREADPOOL_SIZE` 测试 (Yagiz Nizipli) [#49213](https://github.com/nodejs/node/pull/49213)
* \[[`ee751102a4`](https://github.com/nodejs/node/commit/ee751102a4)] - **test**: 识别 wpt 完成错误 (Chengzhong Wu) [#50429](https://github.com/nodejs/node/pull/50429)
* \[[`7e3eb02252`](https://github.com/nodejs/node/commit/7e3eb02252)] - **test**: 报告有错误的 wpt 测试结果 (Chengzhong Wu) [#50429](https://github.com/nodejs/node/pull/50429)
* \[[`90833a89a9`](https://github.com/nodejs/node/commit/90833a89a9)] - **test**: 将 forEach() 替换为 for...of (Ram) [#49794](https://github.com/nodejs/node/pull/49794)
* \[[`f40435d143`](https://github.com/nodejs/node/commit/f40435d143)] - **test**: 在 test-trace-events-http 中将 forEach() 替换为 for...of (Chand) [#49795](https://github.com/nodejs/node/pull/49795)
* \[[`f70a2dd70d`](https://github.com/nodejs/node/commit/f70a2dd70d)] - **test**: 修复与 zlib 版本 1.3 的测试套件兼容性 (Dominique Leuenberger) [#50364](https://github.com/nodejs/node/pull/50364)
* \[[`d24de129a7`](https://github.com/nodejs/node/commit/d24de129a7)] - **test**: 在 test-fs-realpath-buffer-encoding 中将 forEach 替换为 for...of (Niya Shiyas) [#49804](https://github.com/nodejs/node/pull/49804)
* \[[`2b6d283265`](https://github.com/nodejs/node/commit/2b6d283265)] - **test**: 修复 LoongArch 设备上 test-cpu-prof-dir-worker.js 的超时问题 (Shi Pujin) [#50363](https://github.com/nodejs/node/pull/50363)
* \[[`bd5b61fa6c`](https://github.com/nodejs/node/commit/bd5b61fa6c)] - **test**: 修复 OpenSSL 3.x 的 crypto-dh 错误消息 (Kerem Kat) [#50395](https://github.com/nodejs/node/pull/50395)
* \[[`aa86c78a9a`](https://github.com/nodejs/node/commit/aa86c78a9a)] - **test**: 修复 vm 断言中 actual 和 expected 的顺序 (Chengzhong Wu) [#50371](https://github.com/nodejs/node/pull/50371)
* \[[`ab9cad8107`](https://github.com/nodejs/node/commit/ab9cad8107)] - **test**: v8: 添加 test-linux-perf-logger 测试套件 (Luke Albao) [#50352](https://github.com/nodejs/node/pull/50352)
* \[[`31cd05c39f`](https://github.com/nodejs/node/commit/31cd05c39f)] - **test**: 确保能检测到永远不完成的 promise (Antoine du Hamel) [#50318](https://github.com/nodejs/node/pull/50318)
* \[[`ad316419dd`](https://github.com/nodejs/node/commit/ad316419dd)] - **test**: 避免 performance 函数上的 v8 deadcode (Vinícius Lourenço) [#50074](https://github.com/nodejs/node/pull/50074)
* \[[`01bed64cbb`](https://github.com/nodejs/node/commit/01bed64cbb)] - **test_runner**: 将 abortSignal 传递给测试文件 (Moshe Atlow) [#50630](https://github.com/nodejs/node/pull/50630)
* \[[`ae4a7ba991`](https://github.com/nodejs/node/commit/ae4a7ba991)] - **test_runner**: 将 forEach 替换为 for of (Tom Haddad) [#50595](https://github.com/nodejs/node/pull/50595)
* \[[`913e4b9173`](https://github.com/nodejs/node/commit/913e4b9173)] - **test_runner**: 输出测试套件的错误 (Moshe Atlow) [#50361](https://github.com/nodejs/node/pull/50361)
* \[[`c9b92bba58`](https://github.com/nodejs/node/commit/c9b92bba58)] - **(SEMVER-MINOR)** **test_runner**: 新增内置 lcov 报告器 (Phil Nash) [#50018](https://github.com/nodejs/node/pull/50018)
* \[[`e2c3b015cd`](https://github.com/nodejs/node/commit/e2c3b015cd)] - **test_runner**: 测试 mocked promisified timers 的返回值 (Mika Fischer) [#50331](https://github.com/nodejs/node/pull/50331)
* \[[`f6c496563e`](https://github.com/nodejs/node/commit/f6c496563e)] - **(SEMVER-MINOR)** **test_runner**: 将 Date 添加到支持的 mock API 中 (Lucas Santos) [#48638](https://github.com/nodejs/node/pull/48638)
* \[[`05e8b6ef20`](https://github.com/nodejs/node/commit/05e8b6ef20)] - **(SEMVER-MINOR)** **test_runner, cli**: 添加 --test-timeout 标志 (Shubham Pandey) [#50443](https://github.com/nodejs/node/pull/50443)
* \[[`b71c8c447e`](https://github.com/nodejs/node/commit/b71c8c447e)] - **tls**: 为 `options.SNICallback` 使用 `validateFunction` (Deokjin Kim) [#50530](https://github.com/nodejs/node/pull/50530)
* \[[`5fcd67a8ea`](https://github.com/nodejs/node/commit/5fcd67a8ea)] - **tools**: 添加 macOS notarization stapler (Ulises Gascón) [#50625](https://github.com/nodejs/node/pull/50625)
* \[[`253e206fe9`](https://github.com/nodejs/node/commit/253e206fe9)] - **tools**: 将 eslint 更新到 8.53.0 (Node.js GitHub Bot) [#50559](https://github.com/nodejs/node/pull/50559)
* \[[`f5e1c95447`](https://github.com/nodejs/node/commit/f5e1c95447)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.3.0 (Node.js GitHub Bot) [#50556](https://github.com/nodejs/node/pull/50556)
* \[[`257e22073e`](https://github.com/nodejs/node/commit/257e22073e)] - **tools**: 在文件更改前比较 ICU 校验和 (Michaël Zasso) [#50522](https://github.com/nodejs/node/pull/50522)
* \[[`aa8feea5f1`](https://github.com/nodejs/node/commit/aa8feea5f1)] - **tools**: 改进 update acorn-walk 脚本 (Marco Ippolito) [#50473](https://github.com/nodejs/node/pull/50473)
* \[[`c0206bf44c`](https://github.com/nodejs/node/commit/c0206bf44c)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.2.0 (Node.js GitHub Bot) [#50496](https://github.com/nodejs/node/pull/50496)
* \[[`02dec645f3`](https://github.com/nodejs/node/commit/02dec645f3)] - **tools**: 提升 macOS notarization 流程输出的可读性 (Ulises Gascón) [#50389](https://github.com/nodejs/node/pull/50389)
* \[[`52e7b6d29a`](https://github.com/nodejs/node/commit/52e7b6d29a)] - **tools**: 将 gyp-next 更新到 v0.16.1 (Michaël Zasso) [#50380](https://github.com/nodejs/node/pull/50380)
* \[[`9fc29c909b`](https://github.com/nodejs/node/commit/9fc29c909b)] - **tools**: 跳过 tools/gyp 上的 ruff (Michaël Zasso) [#50380](https://github.com/nodejs/node/pull/50380)
* \[[`ec7005abff`](https://github.com/nodejs/node/commit/ec7005abff)] - **tools**: 将 lint-md-dependencies 更新为 rollup\@4.1.5 unified\@11.0.4 (Node.js GitHub Bot) [#50461](https://github.com/nodejs/node/pull/50461)
* \[[`aed590035f`](https://github.com/nodejs/node/commit/aed590035f)] - **tools**: 移除未使用的 `version` 函数 (Ulises Gascón) [#50390](https://github.com/nodejs/node/pull/50390)
* \[[`f7590481f2`](https://github.com/nodejs/node/commit/f7590481f2)] - **tools**: 避免在依赖安装中执行 npm install (Marco Ippolito) [#50413](https://github.com/nodejs/node/pull/50413)
* \[[`92d64035c6`](https://github.com/nodejs/node/commit/92d64035c6)] - _**Revert**_ "**tools**: update doc dependencies" (Richard Lau) [#50414](https://github.com/nodejs/node/pull/50414)
* \[[`90c9dd3e0e`](https://github.com/nodejs/node/commit/90c9dd3e0e)] - **tools**: 更新文档依赖 (Node.js GitHub Bot) [#49988](https://github.com/nodejs/node/pull/49988)
* \[[`f210915681`](https://github.com/nodejs/node/commit/f210915681)] - **tools**: 仅在相关文件上运行覆盖率 CI (Antoine du Hamel) [#50349](https://github.com/nodejs/node/pull/50349)
* \[[`5ccdda4004`](https://github.com/nodejs/node/commit/5ccdda4004)] - **tools**: 将 eslint 更新到 8.52.0 (Node.js GitHub Bot) [#50326](https://github.com/nodejs/node/pull/50326)
* \[[`bd4634874c`](https://github.com/nodejs/node/commit/bd4634874c)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#50190](https://github.com/nodejs/node/pull/50190)
* \[[`773cfa59bb`](https://github.com/nodejs/node/commit/773cfa59bb)] - **vm**: 允许带有引用者 realm 的动态 import (Chengzhong Wu) [#50360](https://github.com/nodejs/node/pull/50360)
* \[[`2f86d50e70`](https://github.com/nodejs/node/commit/2f86d50e70)] - **wasi**: 记录安全沙箱状态 (Guy Bedford) [#50396](https://github.com/nodejs/node/pull/50396)

<a id="21.1.0"></a>

## 2023-10-24，版本 21.1.0（当前），@targos

### 重要变更

#### 自动检测并运行 ESM 语法

新的标志 `--experimental-detect-module` 可用于在检测到语法时自动运行
ES 模块。对于“有歧义”的文件，即 `.js` 文件或无扩展名文件，且没有带有 `type` 字段的 `package.json`，Node.js
会解析该文件以检测 ES 模块语法；如果找到，则将该文件作为 ES 模块运行，否则将其作为 CommonJS 模块运行。
同样也适用于通过 `--eval` 或 `STDIN` 输入的字符串。

我们希望在未来版本的 Node.js 中默认启用检测。检测会增加启动时间，因此我们鼓励所有人——尤其是包
作者——在 `package.json` 中添加 `type` 字段，即使是默认的
`"type": "commonjs"` 也一样。存在 `type` 字段，或使用显式扩展名
如 `.mjs` 或 `.cjs`，将会避免检测。

由 Geoffrey Booth 贡献于 [#50096](https://github.com/nodejs/node/pull/50096)。

### vm：修复 vm.Script 的 V8 编译缓存支持

此前，使用 `vm.Script` 对同一源码重复编译在 v16.x 之后不再命中 V8 编译缓存，因为当
`importModuleDynamically` 支持被添加到 `vm.Script` 时，导致了性能回退，从而阻碍用户（尤其是 Jest 用户）从
v16.x 升级。

v21.1.0 中的最新修复允许在未使用 `--experimental-vm-modules` 时，即使存在 `importModuleDynamically` 选项，
`vm.Script` 也能再次命中编译缓存，这样受性能回退影响的用户现在就可以升级了。当前还在持续推进
为 `vm.CompileFunction` 启用编译缓存支持。

由 Joyee Cheung 贡献于 [#50137](https://github.com/nodejs/node/pull/50137)。

#### 其他重要变更

* \[[`3729e33358`](https://github.com/nodejs/node/commit/3729e33358)] - **doc**: 将 H4ad 添加到协作者中 (Vinícius Lourenço) [#50217](https://github.com/nodejs/node/pull/50217)
* \[[`18862e4d5d`](https://github.com/nodejs/node/commit/18862e4d5d)] - **(SEMVER-MINOR)** **fs**: 为 `appendFile()` 函数添加 `flush` 选项 (Colin Ihrig) [#50095](https://github.com/nodejs/node/pull/50095)
* \[[`5a52c518ef`](https://github.com/nodejs/node/commit/5a52c518ef)] - **(SEMVER-MINOR)** **lib**: 添加 `navigator.userAgent` (Yagiz Nizipli) [#50200](https://github.com/nodejs/node/pull/50200)
* \[[`789372a072`](https://github.com/nodejs/node/commit/789372a072)] - **(SEMVER-MINOR)** **stream**: 允许将 stream 类传递给 `stream.compose` (Alex Yang) [#50187](https://github.com/nodejs/node/pull/50187)
* \[[`f3a9ea0bc4`](https://github.com/nodejs/node/commit/f3a9ea0bc4)] - **stream**: 提升可读流读取性能 (Raz Luvaton) [#50173](https://github.com/nodejs/node/pull/50173)

### 提交

* \[[`9cd68b9083`](https://github.com/nodejs/node/commit/9cd68b9083)] - **buffer**: 移除 fromString 中不必要的赋值 (Tobias Nießen) [#50199](https://github.com/nodejs/node/pull/50199)
* \[[`a362c276ec`](https://github.com/nodejs/node/commit/a362c276ec)] - **crypto**: 确保 SubtleCrypto.importKey 中椭圆曲线上的点有效 (Filip Skokan) [#50234](https://github.com/nodejs/node/pull/50234)
* \[[`f4da308f8d`](https://github.com/nodejs/node/commit/f4da308f8d)] - **deps**: V8：cherry-pick f7d000a7ae7b (Luke Albao) [#50302](https://github.com/nodejs/node/pull/50302)
* \[[`269e268c38`](https://github.com/nodejs/node/commit/269e268c38)] - **deps**: 将 ada 更新到 2.7.2 (Node.js GitHub Bot) [#50338](https://github.com/nodejs/node/pull/50338)
* \[[`03a31ce41e`](https://github.com/nodejs/node/commit/03a31ce41e)] - **deps**: 将 corepack 更新到 0.22.0 (Node.js GitHub Bot) [#50325](https://github.com/nodejs/node/pull/50325)
* \[[`000531781b`](https://github.com/nodejs/node/commit/000531781b)] - **deps**: 将 undici 更新到 5.26.4 (Node.js GitHub Bot) [#50274](https://github.com/nodejs/node/pull/50274)
* \[[`f050668c14`](https://github.com/nodejs/node/commit/f050668c14)] - **deps**: 将 c-ares 更新到 1.20.1 (Node.js GitHub Bot) [#50082](https://github.com/nodejs/node/pull/50082)
* \[[`ba258b682b`](https://github.com/nodejs/node/commit/ba258b682b)] - **deps**: 将 c-ares 更新到 1.20.0 (Node.js GitHub Bot) [#50082](https://github.com/nodejs/node/pull/50082)
* \[[`571f7ef1fa`](https://github.com/nodejs/node/commit/571f7ef1fa)] - **deps**: 将 V8 补丁升级到 11.8.172.15 (Michaël Zasso) [#50114](https://github.com/nodejs/node/pull/50114)
* \[[`943047e800`](https://github.com/nodejs/node/commit/943047e800)] - **deps**: V8：cherry-pick 25902244ad1a (Joyee Cheung) [#50156](https://github.com/nodejs/node/pull/50156)
* \[[`db2a1cf1cb`](https://github.com/nodejs/node/commit/db2a1cf1cb)] - **doc**: 修复 `navigator.hardwareConcurrency` 示例 (Tobias Nießen) [#50278](https://github.com/nodejs/node/pull/50278)
* \[[`6e537aeb44`](https://github.com/nodejs/node/commit/6e537aeb44)] - **doc**: 说明如何禁用 navigator (Geoffrey Booth) [#50310](https://github.com/nodejs/node/pull/50310)
* \[[`c40de82d62`](https://github.com/nodejs/node/commit/c40de82d62)] - **doc**: 将 loong64 信息添加到平台列表中 (Shi Pujin) [#50086](https://github.com/nodejs/node/pull/50086)
* \[[`1c21a1880b`](https://github.com/nodejs/node/commit/1c21a1880b)] - **doc**: 更新发布流程中的 LTS 步骤 (Richard Lau) [#50299](https://github.com/nodejs/node/pull/50299)
* \[[`2473aa3672`](https://github.com/nodejs/node/commit/2473aa3672)] - **doc**: 修复发布流程目录 (Richard Lau) [#50216](https://github.com/nodejs/node/pull/50216)
* \[[`ce9d84eae3`](https://github.com/nodejs/node/commit/ce9d84eae3)] - **doc**: 更新 api `stream.compose` (Alex Yang) [#50206](https://github.com/nodejs/node/pull/50206)
* \[[`dacee4d9b5`](https://github.com/nodejs/node/commit/dacee4d9b5)] - **doc**: 将 ReflectConstruct 添加到已知性能问题中 (Vinicius Lourenço) [#50111](https://github.com/nodejs/node/pull/50111)
* \[[`82363be2ac`](https://github.com/nodejs/node/commit/82363be2ac)] - **doc**: 修复 dgram 文档中的拼写错误 (Peter Johnson) [#50211](https://github.com/nodejs/node/pull/50211)
* \[[`8c1a46c751`](https://github.com/nodejs/node/commit/8c1a46c751)] - **doc**: 修复 H4ad 协作者排序 (Vinicius Lourenço) [#50218](https://github.com/nodejs/node/pull/50218)
* \[[`3729e33358`](https://github.com/nodejs/node/commit/3729e33358)] - **doc**: 将 H4ad 添加到协作者中 (Vinícius Lourenço) [#50217](https://github.com/nodejs/node/pull/50217)
* \[[`bac872cbd0`](https://github.com/nodejs/node/commit/bac872cbd0)] - **doc**: 使用最新一次 sec-release 更新 release-stewards (Rafael Gonzaga) [#50179](https://github.com/nodejs/node/pull/50179)
* \[[`06b7724f14`](https://github.com/nodejs/node/commit/06b7724f14)] - **doc**: 添加保持主分支同步的命令 (Rafael Gonzaga) [#50102](https://github.com/nodejs/node/pull/50102)
* \[[`47633ab086`](https://github.com/nodejs/node/commit/47633ab086)] - **doc**: 将 loong64 添加到架构列表中 (Shi Pujin) [#50172](https://github.com/nodejs/node/pull/50172)
* \[[`1f40ca1b91`](https://github.com/nodejs/node/commit/1f40ca1b91)] - **doc**: 更新安全发布流程 (Michael Dawson) [#50166](https://github.com/nodejs/node/pull/50166)
* \[[`998feda118`](https://github.com/nodejs/node/commit/998feda118)] - **esm**: 在检测文件格式时不要给出错误提示 (Antoine du Hamel) [#50314](https://github.com/nodejs/node/pull/50314)
* \[[`e375063e01`](https://github.com/nodejs/node/commit/e375063e01)] - **(SEMVER-MINOR)** **esm**: 在有歧义的 JavaScript 中检测 ESM 语法 (Geoffrey Booth) [#50096](https://github.com/nodejs/node/pull/50096)
* \[[`c76eb27971`](https://github.com/nodejs/node/commit/c76eb27971)] - **esm**: 改进对 ESM 语法的检查 (Geoffrey Booth) [#50127](https://github.com/nodejs/node/pull/50127)
* \[[`7740bf820c`](https://github.com/nodejs/node/commit/7740bf820c)] - **esm**: 重命名与 import attributes 相关的错误代码 (Antoine du Hamel) [#50181](https://github.com/nodejs/node/pull/50181)
* \[[`0cc176ef25`](https://github.com/nodejs/node/commit/0cc176ef25)] - **fs**: 提升 `readSync` 的错误性能 (Jungku Lee) [#50033](https://github.com/nodejs/node/pull/50033)
* \[[`5942edb774`](https://github.com/nodejs/node/commit/5942edb774)] - **fs**: 提升 `fsyncSync` 的错误性能 (Jungku Lee) [#49880](https://github.com/nodejs/node/pull/49880)
* \[[`6ec5abadc0`](https://github.com/nodejs/node/commit/6ec5abadc0)] - **fs**: 提升 `mkdirSync` 的错误性能 (CanadaHonk) [#49847](https://github.com/nodejs/node/pull/49847)
* \[[`c5ff000cb1`](https://github.com/nodejs/node/commit/c5ff000cb1)] - **fs**: 提升 `realpathSync` 的错误性能 (Yagiz Nizipli) [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`6eeaa02f5c`](https://github.com/nodejs/node/commit/6eeaa02f5c)] - **fs**: 提升 `lchownSync` 的错误性能 (Yagiz Nizipli) [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`dc9ac8d41c`](https://github.com/nodejs/node/commit/dc9ac8d41c)] - **fs**: 提升 `symlinkSync` 的错误性能 (Yagiz Nizipli) [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`bc6f279261`](https://github.com/nodejs/node/commit/bc6f279261)] - **fs**: 提升 `readlinkSync` 的错误性能 (Yagiz Nizipli) [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`275987841e`](https://github.com/nodejs/node/commit/275987841e)] - **fs**: 提升 `mkdtempSync` 的错误性能 (Yagiz Nizipli) [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`81f15274e2`](https://github.com/nodejs/node/commit/81f15274e2)] - **fs**: 提升 `linkSync` 的错误性能 (Yagiz Nizipli) [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`f766c04856`](https://github.com/nodejs/node/commit/f766c04856)] - **fs**: 提升 `chownSync` 的错误性能 (Yagiz Nizipli) [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`610036c67d`](https://github.com/nodejs/node/commit/610036c67d)] - **fs**: 提升 `renameSync` 的错误性能 (Yagiz Nizipli) [#49962](https://github.com/nodejs/node/pull/49962)
* \[[`18862e4d5d`](https://github.com/nodejs/node/commit/18862e4d5d)] - **(SEMVER-MINOR)** **fs**: 为 appendFile() 函数添加 flush 选项 (Colin Ihrig) [#50095](https://github.com/nodejs/node/pull/50095)
* \[[`3f8cbb15cb`](https://github.com/nodejs/node/commit/3f8cbb15cb)] - **http2**: 允许流在 goaway 后优雅完成 (Michael Lumish) [#50202](https://github.com/nodejs/node/pull/50202)
* \[[`1464eba1a0`](https://github.com/nodejs/node/commit/1464eba1a0)] - **lib**: 提升 validateStringArray 和 validateBooleanArray 的性能 (Aras Abbasi) [#49756](https://github.com/nodejs/node/pull/49756)
* \[[`5a52c518ef`](https://github.com/nodejs/node/commit/5a52c518ef)] - **(SEMVER-MINOR)** **lib**: 添加 `navigator.userAgent` (Yagiz Nizipli) [#50200](https://github.com/nodejs/node/pull/50200)
* \[[`b6021ab8f6`](https://github.com/nodejs/node/commit/b6021ab8f6)] - **lib**: 降低 blob clone 的开销 (Vinicius Lourenço) [#50110](https://github.com/nodejs/node/pull/50110)
* \[[`be19d9baa1`](https://github.com/nodejs/node/commit/be19d9baa1)] - **meta**: 将 Trott 调整为 TSC 正式成员 (Rich Trott) [#50297](https://github.com/nodejs/node/pull/50297)
* \[[`91e373f8e9`](https://github.com/nodejs/node/commit/91e373f8e9)] - **node-api**: 在代理处理器上返回 napi\_exception\_pending (Chengzhong Wu) [#48607](https://github.com/nodejs/node/pull/48607)
* \[[`531a3ae4b5`](https://github.com/nodejs/node/commit/531a3ae4b5)] - **stream**: 简化 prefinish (Robert Nagy) [#50204](https://github.com/nodejs/node/pull/50204)
* \[[`514ac86579`](https://github.com/nodejs/node/commit/514ac86579)] - **stream**: 缩小 readable bitmap 细节的作用域 (Robert Nagy) [#49963](https://github.com/nodejs/node/pull/49963)
* \[[`789372a072`](https://github.com/nodejs/node/commit/789372a072)] - **(SEMVER-MINOR)** **stream**: 允许将 stream 类传递给 `stream.compose` (Alex Yang) [#50187](https://github.com/nodejs/node/pull/50187)
* \[[`f3a9ea0bc4`](https://github.com/nodejs/node/commit/f3a9ea0bc4)] - **stream**: 在 push 和 unshift 中调用辅助函数 (Raz Luvaton) [#50173](https://github.com/nodejs/node/pull/50173)
* \[[`a9ca7b32e7`](https://github.com/nodejs/node/commit/a9ca7b32e7)] - **test**: 改进 watch 模式测试 (Moshe Atlow) [#50319](https://github.com/nodejs/node/pull/50319)
* \[[`63b7059efd`](https://github.com/nodejs/node/commit/63b7059efd)] - **test**: 将 `test-watch-mode-inspect` 标记为 flaky (Yagiz Nizipli) [#50259](https://github.com/nodejs/node/pull/50259)
* \[[`7f87084b05`](https://github.com/nodejs/node/commit/7f87084b05)] - _**回退**_ "**test**: 将 `test-esm-loader-resolve-type` 标记为 flaky" (Antoine du Hamel) [#50315](https://github.com/nodejs/node/pull/50315)
* \[[`4d390e2de4`](https://github.com/nodejs/node/commit/4d390e2de4)] - **test**: 在 test-http-perf\_hooks.js 中将 forEach 替换为 for..of (Niya Shiyas) [#49818](https://github.com/nodejs/node/pull/49818)
* \[[`67c599ec39`](https://github.com/nodejs/node/commit/67c599ec39)] - **test**: 在 test-net-isipv4.js 中将 forEach 替换为 for..of (Niya Shiyas) [#49822](https://github.com/nodejs/node/pull/49822)
* \[[`19d3ce2494`](https://github.com/nodejs/node/commit/19d3ce2494)] - **test**: 修复 `test-esm-loader-resolve-type` 的不稳定性 (Antoine du Hamel) [#50273](https://github.com/nodejs/node/pull/50273)
* \[[`2d8d6c5701`](https://github.com/nodejs/node/commit/2d8d6c5701)] - **test**: 在 test-http2-server 中将 forEach 替换为 for..of (Niya Shiyas) [#49819](https://github.com/nodejs/node/pull/49819)
* \[[`af31d51e5a`](https://github.com/nodejs/node/commit/af31d51e5a)] - **test**: 在 test-http2-client-destroy.js 中将 forEach 替换为 for..of (Niya Shiyas) [#49820](https://github.com/nodejs/node/pull/49820)
* \[[`465ad2a5ce`](https://github.com/nodejs/node/commit/465ad2a5ce)] - **test**: 更新 `url` Web 平台测试 (Yagiz Nizipli) [#50264](https://github.com/nodejs/node/pull/50264)
* \[[`3b80a6894c`](https://github.com/nodejs/node/commit/3b80a6894c)] - **test**: 将 `test-emit-after-on-destroyed` 标记为 flaky (Yagiz Nizipli) [#50246](https://github.com/nodejs/node/pull/50246)
* \[[`57adbdd156`](https://github.com/nodejs/node/commit/57adbdd156)] - **test**: 将 inspector async stack 测试标记为 flaky (Yagiz Nizipli) [#50244](https://github.com/nodejs/node/pull/50244)
* \[[`6507f66404`](https://github.com/nodejs/node/commit/6507f66404)] - **test**: 将 test-worker-nearheaplimit-deadlock 标记为 flaky (StefanStojanovic) [#50277](https://github.com/nodejs/node/pull/50277)
* \[[`21a6ba548d`](https://github.com/nodejs/node/commit/21a6ba548d)] - **test**: 将 `test-cli-node-options` 标记为 flaky (Yagiz Nizipli) [#50296](https://github.com/nodejs/node/pull/50296)
* \[[`c55f8f30cb`](https://github.com/nodejs/node/commit/c55f8f30cb)] - **test**: 减少请求和解析器数量 (Luigi Pinca) [#50240](https://github.com/nodejs/node/pull/50240)
* \[[`5129bedfa2`](https://github.com/nodejs/node/commit/5129bedfa2)] - **test**: 将 crypto-timing 测试标记为 flaky (Yagiz Nizipli) [#50232](https://github.com/nodejs/node/pull/50232)
* \[[`9bc5ab5e07`](https://github.com/nodejs/node/commit/9bc5ab5e07)] - **test**: 将 `test-structuredclone-*` 标记为 flaky (Yagiz Nizipli) [#50261](https://github.com/nodejs/node/pull/50261)
* \[[`317e447ddc`](https://github.com/nodejs/node/commit/317e447ddc)] - **test**: 修复 `test-loaders-workers-spawned` 的不稳定性 (Antoine du Hamel) [#50251](https://github.com/nodejs/node/pull/50251)
* \[[`0c710daae2`](https://github.com/nodejs/node/commit/0c710daae2)] - **test**: 提高 diagnostics\_channel 的代码覆盖率 (Jithil P Ponnan) [#50053](https://github.com/nodejs/node/pull/50053)
* \[[`7c6e4d7ec3`](https://github.com/nodejs/node/commit/7c6e4d7ec3)] - **test**: 将 `test-esm-loader-resolve-type` 标记为 flaky (Yagiz Nizipli) [#50226](https://github.com/nodejs/node/pull/50226)
* \[[`c8744909b0`](https://github.com/nodejs/node/commit/c8744909b0)] - **test**: 将 inspector async hook 测试标记为 flaky (Yagiz Nizipli) [#50252](https://github.com/nodejs/node/pull/50252)
* \[[`3e38001739`](https://github.com/nodejs/node/commit/3e38001739)] - **test**: 在 IBM i 上跳过 test-benchmark-os.js (Abdirahim Musse) [#50208](https://github.com/nodejs/node/pull/50208)
* \[[`dd66fdfb7b`](https://github.com/nodejs/node/commit/dd66fdfb7b)] - **test**: 将并发 http server 测试标记为 flaky (Yagiz Nizipli) [#50227](https://github.com/nodejs/node/pull/50227)
* \[[`a38d1311bf`](https://github.com/nodejs/node/commit/a38d1311bf)] - **test**: 将 test-worker-nearheaplimit-deadlock 标记为 flaky (Stefan Stojanovic) [#50238](https://github.com/nodejs/node/pull/50238)
* \[[`8efb75fd80`](https://github.com/nodejs/node/commit/8efb75fd80)] - **test**: 将 `test-runner-watch-mode` 标记为 flaky (Yagiz Nizipli) [#50221](https://github.com/nodejs/node/pull/50221)
* \[[`143ddded74`](https://github.com/nodejs/node/commit/143ddded74)] - **test**: 将 sea snapshot 测试标记为 flaky (Yagiz Nizipli) [#50223](https://github.com/nodejs/node/pull/50223)
* \[[`ae905a8f35`](https://github.com/nodejs/node/commit/ae905a8f35)] - **test**: 修复 defect path traversal 测试 (Tobias Nießen) [#50124](https://github.com/nodejs/node/pull/50124)
* \[[`ce27ee701b`](https://github.com/nodejs/node/commit/ce27ee701b)] - **tls**: 减少 TLS 'close' 事件监听器警告 (Tim Perry) [#50136](https://github.com/nodejs/node/pull/50136)
* \[[`ab4bae8e1f`](https://github.com/nodejs/node/commit/ab4bae8e1f)] - **tools**: 放弃对使用 gon 进行 osx notarization 的支持 (Ulises Gascón) [#50291](https://github.com/nodejs/node/pull/50291)
* \[[`5df3d5abcc`](https://github.com/nodejs/node/commit/5df3d5abcc)] - **tools**: 更新 `update-uncidi.sh` 和 `acorn_version.h` 中的注释 (Jungku Lee) [#50175](https://github.com/nodejs/node/pull/50175)
* \[[`bf7b94f0b3`](https://github.com/nodejs/node/commit/bf7b94f0b3)] - **tools**: 重构 checkimports.py (Mohammed Keyvanzadeh) [#50011](https://github.com/nodejs/node/pull/50011)
* \[[`5dc454a837`](https://github.com/nodejs/node/commit/5dc454a837)] - **util**: 从基准测试中移除内部 mime 函数 (Aras Abbasi) [#50201](https://github.com/nodejs/node/pull/50201)
* \[[`8f7eb15603`](https://github.com/nodejs/node/commit/8f7eb15603)] - **vm**: 使用 import attributes 代替 import assertions (Antoine du Hamel) [#50141](https://github.com/nodejs/node/pull/50141)
* \[[`dda33c2bf1`](https://github.com/nodejs/node/commit/dda33c2bf1)] - **vm**: 在未使用 --experimental-vm-modules 时于 importModuleDynamically 中拒绝 (Joyee Cheung) [#50137](https://github.com/nodejs/node/pull/50137)
* \[[`3999362c59`](https://github.com/nodejs/node/commit/3999362c59)] - **vm**: 使用 compileFunction 和 Script 的内部版本 (Joyee Cheung) [#50137](https://github.com/nodejs/node/pull/50137)
* \[[`a54179f0e0`](https://github.com/nodejs/node/commit/a54179f0e0)] - **vm**: 统一 vm.compileFunction 中 host-defined 选项的生成 (Joyee Cheung) [#50137](https://github.com/nodejs/node/pull/50137)
* \[[`87be790fa9`](https://github.com/nodejs/node/commit/87be790fa9)] - **worker**: 处理来自不同上下文的已分离 `MessagePort` (Juan José) [#49150](https://github.com/nodejs/node/pull/49150)

<a id="21.0.0"></a>

## 2023-10-17, 版本 21.0.0（当前），@RafaelGSS 和 @targos

我们很高兴地宣布 Node.js 21 发布！亮点包括将 V8 JavaScript 引擎更新到 11.8、
将 `fetch` 和 `WebStreams` 设为稳定版，一个新的实验性标志可将歧义代码
从 CommonJS 解释为 ES 模块（`--experimental-default-type`），以及对测试运行器的许多更新，更多内容还包括！

当 Node.js 20 在本月晚些时候进入长期支持（LTS）时，Node.js 21 将取代 Node.js 20 成为我们的“当前”发布线。
按照发布计划，Node.js 21 在接下来的 6 个月内将保持为“当前”版本，直到 2024 年 4 月。

### 其他值得注意的变更

* \[[`740ca5423a`](https://github.com/nodejs/node/commit/740ca5423a)] - **doc**: 将 fetch/webstreams 从实验性提升为稳定版 (Steven) [#45684](https://github.com/nodejs/node/pull/45684)
* \[[`85301803e1`](https://github.com/nodejs/node/commit/85301803e1)] - **esm**: `--experimental-default-type` 标志，用于切换模块默认类型 (Geoffrey Booth) [#49869](https://github.com/nodejs/node/pull/49869)
* \[[`705e623ac4`](https://github.com/nodejs/node/commit/705e623ac4)] - **esm**: 移除 `globalPreload` 钩子（已被 `initialize` 取代） (Jacob Smith) [#49144](https://github.com/nodejs/node/pull/49144)
* \[[`e01c1d700d`](https://github.com/nodejs/node/commit/e01c1d700d)] - **fs**: 为 writeFile() 函数添加 flush 选项 (Colin Ihrig) [#50009](https://github.com/nodejs/node/pull/50009)
* \[[`1948dce707`](https://github.com/nodejs/node/commit/1948dce707)] - **(SEMVER-MAJOR)** **fs**: 添加 globSync 实现 (Moshe Atlow) [#47653](https://github.com/nodejs/node/pull/47653)
* \[[`e28dbe1c2b`](https://github.com/nodejs/node/commit/e28dbe1c2b)] - **(SEMVER-MINOR)** **lib**: 添加 WebSocket 客户端 (Matthew Aitken) [#49830](https://github.com/nodejs/node/pull/49830)
* \[[`95b8f5dcab`](https://github.com/nodejs/node/commit/95b8f5dcab)] - **stream**: 优化 Writable (Robert Nagy) [#50012](https://github.com/nodejs/node/pull/50012)
* \[[`7cd4e70948`](https://github.com/nodejs/node/commit/7cd4e70948)] - **(SEMVER-MAJOR)** **test_runner**: 支持传入 glob 模式 (Moshe Atlow) [#47653](https://github.com/nodejs/node/pull/47653)
* \[[`1d220b55ac`](https://github.com/nodejs/node/commit/1d220b55ac)] - **vm**: 当未设置 importModuleDynamically 时使用默认 HDO (Joyee Cheung) [#49950](https://github.com/nodejs/node/pull/49950)

### Semver-Major 提交

* \[[`ac2a68c76b`](https://github.com/nodejs/node/commit/ac2a68c76b)] - **(SEMVER-MAJOR)** **build**: 放弃对 Visual Studio 2019 的支持 (Michaël Zasso) [#49051](https://github.com/nodejs/node/pull/49051)
* \[[`4e3983031a`](https://github.com/nodejs/node/commit/4e3983031a)] - **(SEMVER-MAJOR)** **build**: 提升支持的 macOS 和 Xcode 版本 (Michaël Zasso) [#49164](https://github.com/nodejs/node/pull/49164)
* \[[`5a0777776d`](https://github.com/nodejs/node/commit/5a0777776d)] - **(SEMVER-MAJOR)** **crypto**: 不要覆盖 \_writableState.defaultEncoding (Tobias Nießen) [#49140](https://github.com/nodejs/node/pull/49140)
* \[[`162a0652ab`](https://github.com/nodejs/node/commit/162a0652ab)] - **(SEMVER-MAJOR)** **deps**: 将最低 ICU 版本提升到 73 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`17a74ddd3d`](https://github.com/nodejs/node/commit/17a74ddd3d)] - **(SEMVER-MAJOR)** **deps**: 将 V8 更新到 11.8.172.13 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`e9ff81016d`](https://github.com/nodejs/node/commit/e9ff81016d)] - **(SEMVER-MAJOR)** **deps**: 将 llhttp 更新到 9.1.2 (Paolo Insogna) [#48981](https://github.com/nodejs/node/pull/48981)
* \[[`7ace5aba75`](https://github.com/nodejs/node/commit/7ace5aba75)] - **(SEMVER-MAJOR)** **events**: 校验 `on` 和 `once` 的选项 (Deokjin Kim) [#46018](https://github.com/nodejs/node/pull/46018)
* \[[`b3ec13d449`](https://github.com/nodejs/node/commit/b3ec13d449)] - **(SEMVER-MAJOR)** **fs**: 调整读取方法中 `position` 的校验 (Livia Medeiros) [#42835](https://github.com/nodejs/node/pull/42835)
* \[[`1948dce707`](https://github.com/nodejs/node/commit/1948dce707)] - **(SEMVER-MAJOR)** **fs**: 添加 globSync 实现 (Moshe Atlow) [#47653](https://github.com/nodejs/node/pull/47653)
* \[[`d68d0eacaa`](https://github.com/nodejs/node/commit/d68d0eacaa)] - **(SEMVER-MAJOR)** **http**: 在 corking 时减少分块响应中的部分数量 (Robert Nagy) [#50167](https://github.com/nodejs/node/pull/50167)
* \[[`c5b0b894ed`](https://github.com/nodejs/node/commit/c5b0b894ed)] - **(SEMVER-MAJOR)** **lib**: 将 URL/URLSearchParams 标记为不可克隆且不可转移 (Chengzhong Wu) [#47497](https://github.com/nodejs/node/pull/47497)
* \[[`3205b1936a`](https://github.com/nodejs/node/commit/3205b1936a)] - **(SEMVER-MAJOR)** **lib**: 移除 package reader 的 aix 目录特殊处理 (Yagiz Nizipli) [#48605](https://github.com/nodejs/node/pull/48605)
* \[[`b40f0c3074`](https://github.com/nodejs/node/commit/b40f0c3074)] - **(SEMVER-MAJOR)** **lib**: 添加 `navigator.hardwareConcurrency` (Yagiz Nizipli) [#47769](https://github.com/nodejs/node/pull/47769)
* \[[`4b08c4c047`](https://github.com/nodejs/node/commit/4b08c4c047)] - **(SEMVER-MAJOR)** **lib**: 在运行时弃用 punycode (Yagiz Nizipli) [#47202](https://github.com/nodejs/node/pull/47202)
* \[[`3ce51ae9c0`](https://github.com/nodejs/node/commit/3ce51ae9c0)] - **(SEMVER-MAJOR)** **module**: 统一 ESM 和 CJS 之间的错误代码 (Antoine du Hamel) [#48606](https://github.com/nodejs/node/pull/48606)
* \[[`7202859402`](https://github.com/nodejs/node/commit/7202859402)] - **(SEMVER-MAJOR)** **net**: 不再将 `server.maxConnections=0` 视为 `Infinity` (ignoramous) [#48276](https://github.com/nodejs/node/pull/48276)
* \[[`c15bafdaf4`](https://github.com/nodejs/node/commit/c15bafdaf4)] - **(SEMVER-MAJOR)** **net**: 仅在连接时延后 `_final` 调用 (Jason Zhang) [#47385](https://github.com/nodejs/node/pull/47385)
* \[[`6ffacbf0f9`](https://github.com/nodejs/node/commit/6ffacbf0f9)] - **(SEMVER-MAJOR)** **node-api**: 重命名内部 NAPI_VERSION 定义 (Chengzhong Wu) [#48501](https://github.com/nodejs/node/pull/48501)
* \[[`11af089b14`](https://github.com/nodejs/node/commit/11af089b14)] - **(SEMVER-MAJOR)** **src**: 将 NODE_MODULE_VERSION 更新为 120 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`d920b7c94b`](https://github.com/nodejs/node/commit/d920b7c94b)] - **(SEMVER-MAJOR)** **src**: 在克隆不可序列化对象时抛出 DOMException (Chengzhong Wu) [#47839](https://github.com/nodejs/node/pull/47839)
* \[[`64549731b6`](https://github.com/nodejs/node/commit/64549731b6)] - **(SEMVER-MAJOR)** **src**: 在转移不可转移对象时抛出 DataCloneError (Chengzhong Wu) [#47604](https://github.com/nodejs/node/pull/47604)
* \[[`dac8de689b`](https://github.com/nodejs/node/commit/dac8de689b)] - **(SEMVER-MAJOR)** **stream**: 为策略使用私有属性 (Yagiz Nizipli) [#47218](https://github.com/nodejs/node/pull/47218)
* \[[`1fa084ecdf`](https://github.com/nodejs/node/commit/1fa084ecdf)] - **(SEMVER-MAJOR)** **stream**: 为编码使用私有属性 (Yagiz Nizipli) [#47218](https://github.com/nodejs/node/pull/47218)
* \[[`4e93247079`](https://github.com/nodejs/node/commit/4e93247079)] - **(SEMVER-MAJOR)** **stream**: 为压缩使用私有属性 (Yagiz Nizipli) [#47218](https://github.com/nodejs/node/pull/47218)
* \[[`527589b755`](https://github.com/nodejs/node/commit/527589b755)] - **(SEMVER-MAJOR)** **test_runner**: 禁止在 `run` 选项中使用数组 (Raz Luvaton) [#49935](https://github.com/nodejs/node/pull/49935)
* \[[`7cd4e70948`](https://github.com/nodejs/node/commit/7cd4e70948)] - **(SEMVER-MAJOR)** **test_runner**: 支持传入 glob 模式 (Moshe Atlow) [#47653](https://github.com/nodejs/node/pull/47653)
* \[[`2ef170254b`](https://github.com/nodejs/node/commit/2ef170254b)] - **(SEMVER-MAJOR)** **tls**: 对 `options.minDHSize` 使用 `validateNumber` (Deokjin Kim) [#49973](https://github.com/nodejs/node/pull/49973)
* \[[`092fb9f541`](https://github.com/nodejs/node/commit/092fb9f541)] - **(SEMVER-MAJOR)** **tls**: 对 `options.checkServerIdentity` 使用 validateFunction (Deokjin Kim) [#49896](https://github.com/nodejs/node/pull/49896)
* \[[`ccca547e28`](https://github.com/nodejs/node/commit/ccca547e28)] - **(SEMVER-MAJOR)** **util**: 在运行时弃用对返回 `Promise` 的函数进行 `promisify` (Antoine du Hamel) [#49609](https://github.com/nodejs/node/pull/49609)
* \[[`4038cf0513`](https://github.com/nodejs/node/commit/4038cf0513)] - **(SEMVER-MAJOR)** **vm**: 冻结 `dependencySpecifiers` 数组 (Antoine du Hamel) [#49720](https://github.com/nodejs/node/pull/49720)

### Semver-Minor 提交

* \[[`3227d7327c`](https://github.com/nodejs/node/commit/3227d7327c)] - **(SEMVER-MINOR)** **deps**: 将 uvwasi 更新到 0.0.19 (Node.js GitHub Bot) [#49908](https://github.com/nodejs/node/pull/49908)
* \[[`e28dbe1c2b`](https://github.com/nodejs/node/commit/e28dbe1c2b)] - **(SEMVER-MINOR)** **lib**: 添加 WebSocket 客户端 (Matthew Aitken) [#49830](https://github.com/nodejs/node/pull/49830)
* \[[`9f9c58212e`](https://github.com/nodejs/node/commit/9f9c58212e)] - **(SEMVER-MINOR)** **test_runner, cli**: 添加 --test-concurrency 标志 (Colin Ihrig) [#49996](https://github.com/nodejs/node/pull/49996)
* \[[`d37b0d267f`](https://github.com/nodejs/node/commit/d37b0d267f)] - **(SEMVER-MINOR)** **wasi**: 更新以适配最新的 uvwasi 版本 (Michael Dawson) [#49908](https://github.com/nodejs/node/pull/49908)

### Semver-Patch 提交

* \[[`33c87ec096`](https://github.com/nodejs/node/commit/33c87ec096)] - **benchmark**: 修复 fs 基准测试中的竞态条件 (Vinicius Lourenço) [#50035](https://github.com/nodejs/node/pull/50035)
* \[[`3c0ec61c4b`](https://github.com/nodejs/node/commit/3c0ec61c4b)] - **benchmark**: 为 accessSync 基准测试添加预热 (Rafael Gonzaga) [#50073](https://github.com/nodejs/node/pull/50073)
* \[[`1a839f388e`](https://github.com/nodejs/node/commit/1a839f388e)] - **benchmark**: 改进 blob,file 基准测试的配置 (Vinícius Lourenço) [#49730](https://github.com/nodejs/node/pull/49730)
* \[[`86fe5a80f3`](https://github.com/nodejs/node/commit/86fe5a80f3)] - **benchmark**: 为 blob 添加新的基准测试 (Vinícius Lourenço) [#49730](https://github.com/nodejs/node/pull/49730)
* \[[`6322d4f587`](https://github.com/nodejs/node/commit/6322d4f587)] - **build**: 修复在 Python 3.9 下的 IBM i 构建 (Richard Lau) [#48056](https://github.com/nodejs/node/pull/48056)
* \[[`17c55d176b`](https://github.com/nodejs/node/commit/17c55d176b)] - **build**: 将 embedder 字符串重置为 "-node.0" (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`f10928f926`](https://github.com/nodejs/node/commit/f10928f926)] - **crypto**: 使用 X509_ALGOR 访问器，而不是直接访问 X509_ALGOR (David Benjamin) [#50057](https://github.com/nodejs/node/pull/50057)
* \[[`136a96722a`](https://github.com/nodejs/node/commit/136a96722a)] - **crypto**: 考虑 SharedArrayBuffer 被禁用的情况 (Shelley Vohr) [#50034](https://github.com/nodejs/node/pull/50034)
* \[[`17b9925393`](https://github.com/nodejs/node/commit/17b9925393)] - **crypto**: 在加载无效 PFX 数据时返回清晰的错误 (Tim Perry) [#49566](https://github.com/nodejs/node/pull/49566)
* \[[`ca25d564c6`](https://github.com/nodejs/node/commit/ca25d564c6)] - **deps**: 将 npm 升级到 10.2.0 (npm team) [#50027](https://github.com/nodejs/node/pull/50027)
* \[[`f23a9353ae`](https://github.com/nodejs/node/commit/f23a9353ae)] - **deps**: 将 corepack 更新到 0.21.0 (Node.js GitHub Bot) [#50088](https://github.com/nodejs/node/pull/50088)
* \[[`ceedb3a509`](https://github.com/nodejs/node/commit/ceedb3a509)] - **deps**: 将 simdutf 更新到 3.2.18 (Node.js GitHub Bot) [#50091](https://github.com/nodejs/node/pull/50091)
* \[[`0522ac086c`](https://github.com/nodejs/node/commit/0522ac086c)] - **deps**: 将 zlib 更新到 1.2.13.1-motley-fef5869 (Node.js GitHub Bot) [#50085](https://github.com/nodejs/node/pull/50085)
* \[[`4f8c5829da`](https://github.com/nodejs/node/commit/4f8c5829da)] - **deps**: 将 googletest 更新到 2dd1c13 (Node.js GitHub Bot) [#50081](https://github.com/nodejs/node/pull/50081)
* \[[`588784ea30`](https://github.com/nodejs/node/commit/588784ea30)] - **deps**: 将 undici 更新到 5.25.4 (Node.js GitHub Bot) [#50025](https://github.com/nodejs/node/pull/50025)
* \[[`c9eef0c3c4`](https://github.com/nodejs/node/commit/c9eef0c3c4)] - **deps**: 将 googletest 更新到 e47544a (Node.js GitHub Bot) [#49982](https://github.com/nodejs/node/pull/49982)
* \[[`23cb478398`](https://github.com/nodejs/node/commit/23cb478398)] - **deps**: 将 ada 更新到 2.6.10 (Node.js GitHub Bot) [#49984](https://github.com/nodejs/node/pull/49984)
* \[[`61411bb323`](https://github.com/nodejs/node/commit/61411bb323)] - **deps**: 修复对未声明函数 'ntohl' 和 'htons' 的调用 (MatteoBax) [#49979](https://github.com/nodejs/node/pull/49979)
* \[[`49cf182e30`](https://github.com/nodejs/node/commit/49cf182e30)] - **deps**: 将 ada 更新到 2.6.9 (Node.js GitHub Bot) [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`ceb6df0f22`](https://github.com/nodejs/node/commit/ceb6df0f22)] - **deps**: 将 ada 更新到 2.6.8 (Node.js GitHub Bot) [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`b73e18b5dc`](https://github.com/nodejs/node/commit/b73e18b5dc)] - **deps**: 将 ada 更新到 2.6.7 (Node.js GitHub Bot) [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`baf2256617`](https://github.com/nodejs/node/commit/baf2256617)] - **deps**: 将 ada 更新到 2.6.5 (Node.js GitHub Bot) [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`a20a328a9b`](https://github.com/nodejs/node/commit/a20a328a9b)] - **deps**: 将 ada 更新到 2.6.3 (Node.js GitHub Bot) [#49340](https://github.com/nodejs/node/pull/49340)
* \[[`3838b579e4`](https://github.com/nodejs/node/commit/3838b579e4)] - **deps**: V8：回选 8ec2651fbdd8 (Abdirahim Musse) [#49862](https://github.com/nodejs/node/pull/49862)
* \[[`668437ccad`](https://github.com/nodejs/node/commit/668437ccad)] - **deps**: V8：回选 b60a03df4ceb (Joyee Cheung) [#49491](https://github.com/nodejs/node/pull/49491)
* \[[`f970087147`](https://github.com/nodejs/node/commit/f970087147)] - **deps**: V8：回移植 93b1a74cbc9b (Joyee Cheung) [#49419](https://github.com/nodejs/node/pull/49419)
* \[[`4531c154e5`](https://github.com/nodejs/node/commit/4531c154e5)] - **deps**: V8：回选 8ec2651fbdd8 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`9ad0e2cacc`](https://github.com/nodejs/node/commit/9ad0e2cacc)] - **deps**: V8：回选 89b3702c92b0 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`dfc9c86868`](https://github.com/nodejs/node/commit/dfc9c86868)] - **deps**: V8：回选 de9a5de2274f (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`186b36efba`](https://github.com/nodejs/node/commit/186b36efba)] - **deps**: V8：回选 b5b5d6c31bb0 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`867586ce95`](https://github.com/nodejs/node/commit/867586ce95)] - **deps**: V8：回选 93b1a74cbc9b (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`4ad3479ba7`](https://github.com/nodejs/node/commit/4ad3479ba7)] - **deps**: V8：回选 1a3ecc2483b2 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`660f902f16`](https://github.com/nodejs/node/commit/660f902f16)] - **deps**: 修补 V8 以避免重复的 zlib 符号 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`f7c1d410ad`](https://github.com/nodejs/node/commit/f7c1d410ad)] - **deps**: 从 V8 中移除对 C++20 特性的使用 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`9c4030bfb9`](https://github.com/nodejs/node/commit/9c4030bfb9)] - **deps**: 避免与 ASan 发生编译错误 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`5f05cc15e6`](https://github.com/nodejs/node/commit/5f05cc15e6)] - **deps**: 禁用 V8 并发 sparkplug 编译 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`42cd952dbd`](https://github.com/nodejs/node/commit/42cd952dbd)] - **deps**: 消除无关的 V8 警告 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`88cf90f9c4`](https://github.com/nodejs/node/commit/88cf90f9c4)] - **deps**: 始终将 V8_EXPORT_PRIVATE 定义为无操作 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`8609915951`](https://github.com/nodejs/node/commit/8609915951)] - **doc**: 改进 ccache 说明 (Chengzhong Wu) [#50133](https://github.com/nodejs/node/pull/50133)
* \[[`91d21324a9`](https://github.com/nodejs/node/commit/91d21324a9)] - **doc**: 将 danielleadams 调整为 TSC 无投票权成员 (Danielle Adams) [#50142](https://github.com/nodejs/node/pull/50142)
* \[[`34fa7043a2`](https://github.com/nodejs/node/commit/34fa7043a2)] - **doc**: 修复 `fs.readdir` `recursive` 选项的描述 (RamdohokarAngha) [#48902](https://github.com/nodejs/node/pull/48902)
* \[[`81e4d2ec2f`](https://github.com/nodejs/node/commit/81e4d2ec2f)] - **doc**: 提及在环境设置前读取的文件 (Rafael Gonzaga) [#50072](https://github.com/nodejs/node/pull/50072)
* \[[`0ce37ed8e9`](https://github.com/nodejs/node/commit/0ce37ed8e9)] - **doc**: 将权限模型移至活跃开发阶段 (Rafael Gonzaga) [#50068](https://github.com/nodejs/node/pull/50068)
* \[[`3c430212c3`](https://github.com/nodejs/node/commit/3c430212c3)] - **doc**: 添加获取补丁版 minor 和 major 的命令 (Rafael Gonzaga) [#50067](https://github.com/nodejs/node/pull/50067)
* \[[`e43bf4c31d`](https://github.com/nodejs/node/commit/e43bf4c31d)] - **doc**: 在 fs 中使用更精确的 Promise 术语 (Benjamin Gruenbaum) [#50029](https://github.com/nodejs/node/pull/50029)
* \[[`d3a5f1fb5f`](https://github.com/nodejs/node/commit/d3a5f1fb5f)] - **doc**: 在测试运行器中使用更精确的术语 (Benjamin Gruenbaum) [#50028](https://github.com/nodejs/node/pull/50028)
* \[[`24dea2348d`](https://github.com/nodejs/node/commit/24dea2348d)] - **doc**: 澄清如何运行示例的说明文字 (Anshul Sinha) [#39020](https://github.com/nodejs/node/pull/39020)
* \[[`f3ed57bd8b`](https://github.com/nodejs/node/commit/f3ed57bd8b)] - **doc**: 为 Electron 28 保留 119 (David Sanders) [#50020](https://github.com/nodejs/node/pull/50020)
* \[[`85c09f178c`](https://github.com/nodejs/node/commit/85c09f178c)] - **doc**: 更新协作者代词 (Tierney Cyren) [#50005](https://github.com/nodejs/node/pull/50005)
* \[[`099e2f7bce`](https://github.com/nodejs/node/commit/099e2f7bce)] - **doc**: 更新 Abstract Modules Records 规范链接 (Rich Trott) [#49961](https://github.com/nodejs/node/pull/49961)
* \[[`47b2883673`](https://github.com/nodejs/node/commit/47b2883673)] - **doc**: 更新 Windows 构建文档 (Claudio W) [#49767](https://github.com/nodejs/node/pull/49767)
* \[[`7b624c30b2`](https://github.com/nodejs/node/commit/7b624c30b2)] - **doc**: 更新 CHANGELOG_V20 中关于 vm 修复的内容 (Joyee Cheung) [#49951](https://github.com/nodejs/node/pull/49951)
* \[[`1dc0667aa6`](https://github.com/nodejs/node/commit/1dc0667aa6)] - **doc**: 记录危险的符号链接行为 (Tobias Nießen) [#49154](https://github.com/nodejs/node/pull/49154)
* \[[`bc056c2426`](https://github.com/nodejs/node/commit/bc056c2426)] - **doc**: 在 API 文档中添加主 ARIA 地标 (Rich Trott) [#49882](https://github.com/nodejs/node/pull/49882)
* \[[`f416a0f555`](https://github.com/nodejs/node/commit/f416a0f555)] - **doc**: 在文档目录中添加导航 ARIA 地标 (Rich Trott) [#49882](https://github.com/nodejs/node/pull/49882)
* \[[`740ca5423a`](https://github.com/nodejs/node/commit/740ca5423a)] - **doc**: 将 fetch/webstreams 从实验性提升为稳定版 (Steven) [#45684](https://github.com/nodejs/node/pull/45684)
* \[[`f802aa0645`](https://github.com/nodejs/node/commit/f802aa0645)] - **doc**: 修复 “partial” 拼写错误 (Colin Ihrig) [#48657](https://github.com/nodejs/node/pull/48657)
* \[[`6fda81d4f5`](https://github.com/nodejs/node/commit/6fda81d4f5)] - **doc**: 提及 `Navigator` 是部分实现 (Moshe Atlow) [#48656](https://github.com/nodejs/node/pull/48656)
* \[[`6aa2aeedcb`](https://github.com/nodejs/node/commit/6aa2aeedcb)] - **doc**: 将 Node.js 19 标记为生命周期结束 (Richard Lau) [#48283](https://github.com/nodejs/node/pull/48283)
* \[[`0ee9c83ffc`](https://github.com/nodejs/node/commit/0ee9c83ffc)] - **errors**: 提升 determine-specific-type 的性能 (Aras Abbasi) [#49696](https://github.com/nodejs/node/pull/49696)
* \[[`4f84a3d200`](https://github.com/nodejs/node/commit/4f84a3d200)] - **errors**: 改进 errors.js 中的 formatList (Aras Abbasi) [#49642](https://github.com/nodejs/node/pull/49642)
* \[[`cc725a653a`](https://github.com/nodejs/node/commit/cc725a653a)] - **errors**: 提升实例化性能 (Aras Abbasi) [#49654](https://github.com/nodejs/node/pull/49654)
* \[[`d1ef6aa2db`](https://github.com/nodejs/node/commit/d1ef6aa2db)] - **esm**: 使用 import attributes 代替 import assertions (Antoine du Hamel) [#50140](https://github.com/nodejs/node/pull/50140)
* \[[`19b470f866`](https://github.com/nodejs/node/commit/19b470f866)] - **esm**: 在 --default-type 下绕过 CommonJS loader (Geoffrey Booth) [#49986](https://github.com/nodejs/node/pull/49986)
* \[[`9c683204db`](https://github.com/nodejs/node/commit/9c683204db)] - **esm**: 取消无后缀 JavaScript 和 wasm 在模块作用域中的标记限制 (Geoffrey Booth) [#49974](https://github.com/nodejs/node/pull/49974)
* \[[`05be31d5de`](https://github.com/nodejs/node/commit/05be31d5de)] - **esm**: 提升 `getFormatOfExtensionlessFile` 速度 (Yagiz Nizipli) [#49965](https://github.com/nodejs/node/pull/49965)
* \[[`aadfea4979`](https://github.com/nodejs/node/commit/aadfea4979)] - **esm**: 改进内部函数的 JSDoc 注解 (Antoine du Hamel) [#49959](https://github.com/nodejs/node/pull/49959)
* \[[`7f0e36af52`](https://github.com/nodejs/node/commit/7f0e36af52)] - **esm**: 修复使用 file: URL 的 JSON 文件上的缓存冲突 (Antoine du Hamel) [#49887](https://github.com/nodejs/node/pull/49887)
* \[[`85301803e1`](https://github.com/nodejs/node/commit/85301803e1)] - **esm**: `--experimental-default-type` 标志，用于切换模块默认类型 (Geoffrey Booth) [#49869](https://github.com/nodejs/node/pull/49869)
* \[[`f42a103991`](https://github.com/nodejs/node/commit/f42a103991)] - **esm**: 模块代码要求使用花括号 (Geoffrey Booth) [#49657](https://github.com/nodejs/node/pull/49657)
* \[[`705e623ac4`](https://github.com/nodejs/node/commit/705e623ac4)] - **esm**: 移除 `globalPreload` 钩子（已被 `initialize` 取代） (Jacob Smith) [#49144](https://github.com/nodejs/node/pull/49144)
* \[[`18a818744f`](https://github.com/nodejs/node/commit/18a818744f)] - **fs**: 提升 `readdirSync` 的错误性能 (Yagiz Nizipli) [#50131](https://github.com/nodejs/node/pull/50131)
* \[[`d3985296a9`](https://github.com/nodejs/node/commit/d3985296a9)] - **fs**: 修复 `unlinkSync` 类型定义 (Yagiz Nizipli) [#49859](https://github.com/nodejs/node/pull/49859)
* \[[`6bc7fa7906`](https://github.com/nodejs/node/commit/6bc7fa7906)] - **fs**: 提升同步 `chmod`+`fchmod` 的错误性能 (CanadaHonk) [#49859](https://github.com/nodejs/node/pull/49859)
* \[[`6bd77db41f`](https://github.com/nodejs/node/commit/6bd77db41f)] - **fs**: 提升同步 `*times` 的错误性能 (CanadaHonk) [#49864](https://github.com/nodejs/node/pull/49864)
* \[[`bf0f0789da`](https://github.com/nodejs/node/commit/bf0f0789da)] - **fs**: 提升 writevSync 的错误性能 (IlyasShabi) [#50038](https://github.com/nodejs/node/pull/50038)
* \[[`8a49735bae`](https://github.com/nodejs/node/commit/8a49735bae)] - **fs**: 为 createWriteStream() 添加 flush 选项 (Colin Ihrig) [#50093](https://github.com/nodejs/node/pull/50093)
* \[[`ed49722a8a`](https://github.com/nodejs/node/commit/ed49722a8a)] - **fs**: 提升 `ftruncateSync` 的错误性能 (André Alves) [#50032](https://github.com/nodejs/node/pull/50032)
* \[[`e01c1d700d`](https://github.com/nodejs/node/commit/e01c1d700d)] - **fs**: 为 writeFile() 函数添加 flush 选项 (Colin Ihrig) [#50009](https://github.com/nodejs/node/pull/50009)
* \[[`f7a160d5b4`](https://github.com/nodejs/node/commit/f7a160d5b4)] - **fs**: 提升 `fdatasyncSync` 的错误性能 (Jungku Lee) [#49898](https://github.com/nodejs/node/pull/49898)
* \[[`813713f211`](https://github.com/nodejs/node/commit/813713f211)] - **fs**: 从同步分支抛出错误，而不是使用单独实现 (Joyee Cheung) [#49913](https://github.com/nodejs/node/pull/49913)
* \[[`b866e38192`](https://github.com/nodejs/node/commit/b866e38192)] - **http**: 重构以使 servername 选项规范化可测试 (Rongjian Zhang) [#38733](https://github.com/nodejs/node/pull/38733)
* \[[`2990390359`](https://github.com/nodejs/node/commit/2990390359)] - **inspector**: 简化 dispatchProtocolMessage (Daniel Lemire) [#49780](https://github.com/nodejs/node/pull/49780)
* \[[`d4c5fe488e`](https://github.com/nodejs/node/commit/d4c5fe488e)] - **lib**: 修复 compileFunction 在负数时抛出范围错误的问题 (Jithil P Ponnan) [#49855](https://github.com/nodejs/node/pull/49855)
* \[[`589ac5004c`](https://github.com/nodejs/node/commit/589ac5004c)] - **lib**: 更快的内部 createBlob (Vinícius Lourenço) [#49730](https://github.com/nodejs/node/pull/49730)
* \[[`952cf0d17a`](https://github.com/nodejs/node/commit/952cf0d17a)] - **lib**: 降低 validateObject 的开销 (Vinicius Lourenço) [#49928](https://github.com/nodejs/node/pull/49928)
* \[[`fa250fdec1`](https://github.com/nodejs/node/commit/fa250fdec1)] - **lib**: 使 fetch 同步并返回 Promise (Matthew Aitken) [#49936](https://github.com/nodejs/node/pull/49936)
* \[[`1b96975f27`](https://github.com/nodejs/node/commit/1b96975f27)] - **lib**: 修复 `primordials` 类型定义 (Sam Verschueren) [#49895](https://github.com/nodejs/node/pull/49895)
* \[[`6aa7101960`](https://github.com/nodejs/node/commit/6aa7101960)] - **lib**: 更新 `HTTPRequestOptions` 的 JSDoc 参数 (Jungku Lee) [#49872](https://github.com/nodejs/node/pull/49872)
* \[[`a4fdb1abe0`](https://github.com/nodejs/node/commit/a4fdb1abe0)] - **lib,test**: 不要硬编码 Buffer.kMaxLength (Michaël Zasso) [#49876](https://github.com/nodejs/node/pull/49876)
* \[[`fd21429ef5`](https://github.com/nodejs/node/commit/fd21429ef5)] - **lib**: 更新始终开启的 Atomics API 的使用方式 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`bac85be22d`](https://github.com/nodejs/node/commit/bac85be22d)] - **meta**: 为卸任 ping TSC (Tobias Nießen) [#50147](https://github.com/nodejs/node/pull/50147)
* \[[`609b13e6c2`](https://github.com/nodejs/node/commit/609b13e6c2)] - **meta**: 将 actions/upload-artifact 从 3.1.2 升级到 3.1.3 (dependabot[bot]) [#50000](https://github.com/nodejs/node/pull/50000)
* \[[`3825464ef4`](https://github.com/nodejs/node/commit/3825464ef4)] - **meta**: 将 actions/cache 从 3.3.1 升级到 3.3.2 (dependabot[bot]) [#50003](https://github.com/nodejs/node/pull/50003)
* \[[`49f0f9ca11`](https://github.com/nodejs/node/commit/49f0f9ca11)] - **meta**: 将 github/codeql-action 从 2.21.5 升级到 2.21.9 (dependabot[bot]) [#50002](https://github.com/nodejs/node/pull/50002)
* \[[`f156427244`](https://github.com/nodejs/node/commit/f156427244)] - **meta**: 将 actions/checkout 从 3.6.0 升级到 4.1.0 (dependabot[bot]) [#50001](https://github.com/nodejs/node/pull/50001)
* \[[`0fe673c7e6`](https://github.com/nodejs/node/commit/0fe673c7e6)] - **meta**: 更新网站团队的新名称 (Rich Trott) [#49883](https://github.com/nodejs/node/pull/49883)
* \[[`51f4ff2450`](https://github.com/nodejs/node/commit/51f4ff2450)] - **module**: 将 helpers 移出 cjs loader (Geoffrey Booth) [#49912](https://github.com/nodejs/node/pull/49912)
* \[[`7517c9f95b`](https://github.com/nodejs/node/commit/7517c9f95b)] - **module, esm**: modules 文件的 jsdoc (Geoffrey Booth) [#49523](https://github.com/nodejs/node/pull/49523)
* \[[`b55adfb4f1`](https://github.com/nodejs/node/commit/b55adfb4f1)] - **node-api**: 更新头文件以更好地支持 wasm (Toyo Li) [#49037](https://github.com/nodejs/node/pull/49037)
* \[[`b38e312486`](https://github.com/nodejs/node/commit/b38e312486)] - **node-api**: 直接从 GC 运行 finalizers (Vladimir Morozov) [#42651](https://github.com/nodejs/node/pull/42651)
* \[[`0f0dd1a493`](https://github.com/nodejs/node/commit/0f0dd1a493)] - **os**: 缓存 homedir，移除 getCheckedFunction (Aras Abbasi) [#50037](https://github.com/nodejs/node/pull/50037)
* \[[`0e507d30ac`](https://github.com/nodejs/node/commit/0e507d30ac)] - **perf_hooks**: 降低新的 user timings 的开销 (Vinicius Lourenço) [#49914](https://github.com/nodejs/node/pull/49914)
* \[[`328bdac7f0`](https://github.com/nodejs/node/commit/328bdac7f0)] - **perf_hooks**: 降低 performance observer entry list 的开销 (Vinicius Lourenço) [#50008](https://github.com/nodejs/node/pull/50008)
* \[[`e6e320ecc7`](https://github.com/nodejs/node/commit/e6e320ecc7)] - **perf_hooks**: 降低新的 resource timings 的开销 (Vinicius Lourenço) [#49837](https://github.com/nodejs/node/pull/49837)
* \[[`971af4b211`](https://github.com/nodejs/node/commit/971af4b211)] - **quic**: 修复 quic/session.cc 中的 Coverity 警告 (Michael Dawson) [#49865](https://github.com/nodejs/node/pull/49865)
* \[[`546797f2b1`](https://github.com/nodejs/node/commit/546797f2b1)] - **quic**: 防止复制 ngtcp2_cid (Tobias Nießen) [#48561](https://github.com/nodejs/node/pull/48561)
* \[[`ac6f594c97`](https://github.com/nodejs/node/commit/ac6f594c97)] - **quic**: 处理新的 Coverity 警告 (Michael Dawson) [#48384](https://github.com/nodejs/node/pull/48384)
* \[[`4ee8ef269b`](https://github.com/nodejs/node/commit/4ee8ef269b)] - **quic**: 防止复制 ngtcp2_cid_token (Tobias Nießen) [#48370](https://github.com/nodejs/node/pull/48370)
* \[[`6d2811fbf2`](https://github.com/nodejs/node/commit/6d2811fbf2)] - **quic**: 添加额外的实现 (James M Snell) [#47927](https://github.com/nodejs/node/pull/47927)
* \[[`0b3fcfcf35`](https://github.com/nodejs/node/commit/0b3fcfcf35)] - **quic**: 修复 endpoint.h 中的拼写错误 (Tobias Nießen) [#47911](https://github.com/nodejs/node/pull/47911)
* \[[`76044c4e2b`](https://github.com/nodejs/node/commit/76044c4e2b)] - **quic**: 添加额外的 QUIC 实现 (James M Snell) [#47603](https://github.com/nodejs/node/pull/47603)
* \[[`78a15702dd`](https://github.com/nodejs/node/commit/78a15702dd)] - **src**: 避免将 JSTransferable 包装对象设为弱引用 (Chengzhong Wu) [#50026](https://github.com/nodejs/node/pull/50026)
* \[[`387e2929fe`](https://github.com/nodejs/node/commit/387e2929fe)] - **src**: 使用 --predictable 生成默认快照 (Joyee Cheung) [#48749](https://github.com/nodejs/node/pull/48749)
* \[[`1643adf771`](https://github.com/nodejs/node/commit/1643adf771)] - **src**: 修复 ALPN 回调中的 TLSWrap 生命周期 bug (Ben Noordhuis) [#49635](https://github.com/nodejs/node/pull/49635)
* \[[`66776d8665`](https://github.com/nodejs/node/commit/66776d8665)] - **src**: 将 node_options 中的 port 设置为 uint16_t (Yagiz Nizipli) [#49151](https://github.com/nodejs/node/pull/49151)
* \[[`55ff64001a`](https://github.com/nodejs/node/commit/55ff64001a)] - **src**: 命名作用域锁 (Mohammed Keyvanzadeh) [#50010](https://github.com/nodejs/node/pull/50010)
* \[[`b903a710f4`](https://github.com/nodejs/node/commit/b903a710f4)] - **src**: 对 `uv_os_getenv` 使用精确的返回值 (Yagiz Nizipli) [#49149](https://github.com/nodejs/node/pull/49149)
* \[[`43500fa646`](https://github.com/nodejs/node/commit/43500fa646)] - **src**: 将 `node_file.h` 中的 const 变量移到 `node_file.cc` (Jungku Lee) [#49688](https://github.com/nodejs/node/pull/49688)
* \[[`36ab510da7`](https://github.com/nodejs/node/commit/36ab510da7)] - **src**: 移除未使用的变量 (Michaël Zasso) [#49665](https://github.com/nodejs/node/pull/49665)
* \[[`23d65e7281`](https://github.com/nodejs/node/commit/23d65e7281)] - **src**: 将 `IS_RELEASE` 回退为 0 (Rafael Gonzaga) [#49084](https://github.com/nodejs/node/pull/49084)
* \[[`38dee8a1c0`](https://github.com/nodejs/node/commit/38dee8a1c0)] - **src**: 区分 HTML transferable 和 cloneable (Chengzhong Wu) [#47956](https://github.com/nodejs/node/pull/47956)
* \[[`586fcff061`](https://github.com/nodejs/node/commit/586fcff061)] - **src**: 修复 Coverity 报告的逻辑死代码 (Mohammed Keyvanzadeh) [#48589](https://github.com/nodejs/node/pull/48589)
* \[[`7f2c810814`](https://github.com/nodejs/node/commit/7f2c810814)] - **src,tools**: 初始化 cppgc (Daryl Haresign) [#45704](https://github.com/nodejs/node/pull/45704)
* \[[`aad8002b88`](https://github.com/nodejs/node/commit/aad8002b88)] - **stream**: 为 bitmap 状态使用私有符号 (Robert Nagy) [#49993](https://github.com/nodejs/node/pull/49993)
* \[[`a85e4186e5`](https://github.com/nodejs/node/commit/a85e4186e5)] - **stream**: 降低转移开销 (Vinicius Lourenço) [#50107](https://github.com/nodejs/node/pull/50107)
* \[[`e9bda11761`](https://github.com/nodejs/node/commit/e9bda11761)] - **stream**: 延迟分配背压缓冲区 (Robert Nagy) [#50013](https://github.com/nodejs/node/pull/50013)
* \[[`557044af40`](https://github.com/nodejs/node/commit/557044af40)] - **stream**: 避免同步流不必要的 drain (Robert Nagy) [#50014](https://github.com/nodejs/node/pull/50014)
* \[[`95b8f5dcab`](https://github.com/nodejs/node/commit/95b8f5dcab)] - **stream**: 优化 Writable (Robert Nagy) [#50012](https://github.com/nodejs/node/pull/50012)
* \[[`5de25deeb9`](https://github.com/nodejs/node/commit/5de25deeb9)] - **stream**: 避免 writable 热路径中的 tick (Robert Nagy) [#49966](https://github.com/nodejs/node/pull/49966)
* \[[`53b5545672`](https://github.com/nodejs/node/commit/53b5545672)] - **stream**: writable 状态位图 (Robert Nagy) [#49899](https://github.com/nodejs/node/pull/49899)
* \[[`d4e99b1a66`](https://github.com/nodejs/node/commit/d4e99b1a66)] - **stream**: 移除 asIndexedPairs (Chemi Atlow) [#48150](https://github.com/nodejs/node/pull/48150)
* \[[`41e4174945`](https://github.com/nodejs/node/commit/41e4174945)] - **test**: 在 test-net-isipv6.js 中用 for..of 替换 forEach (Niya Shiyas) [#49823](https://github.com/nodejs/node/pull/49823)
* \[[`f0e720a7fa`](https://github.com/nodejs/node/commit/f0e720a7fa)] - **test**: 添加 EOVERFLOW 作为允许的错误 (Abdirahim Musse) [#50128](https://github.com/nodejs/node/pull/50128)
* \[[`224f3ae974`](https://github.com/nodejs/node/commit/224f3ae974)] - **test**: 减少 test-heapdump-shadowrealm.js 中的重复次数 (Chengzhong Wu) [#50104](https://github.com/nodejs/node/pull/50104)
* \[[`76004f3e56`](https://github.com/nodejs/node/commit/76004f3e56)] - **test**: 在 test-parse-args.mjs 中用 for..of 替换 forEach (Niya Shiyas) [#49824](https://github.com/nodejs/node/pull/49824)
* \[[`fce8fbadcd`](https://github.com/nodejs/node/commit/fce8fbadcd)] - **test**: 在 test-process-env 中用 for..of 替换 forEach (Niya Shiyas) [#49825](https://github.com/nodejs/node/pull/49825)
* \[[`24492476a7`](https://github.com/nodejs/node/commit/24492476a7)] - **test**: 在 test-http-url 中用 for..of 替换 forEach (Niya Shiyas) [#49840](https://github.com/nodejs/node/pull/49840)
* \[[`2fe511ba23`](https://github.com/nodejs/node/commit/2fe511ba23)] - **test**: 在 test-net-perf_hooks 中用 for of 替换 forEach() (Narcisa Codreanu) [#49831](https://github.com/nodejs/node/pull/49831)
* \[[`42c37f28e6`](https://github.com/nodejs/node/commit/42c37f28e6)] - **test**: 将 forEach 改为 for...of (Tiffany Lastimosa) [#49799](https://github.com/nodejs/node/pull/49799)
* \[[`6c9625dca4`](https://github.com/nodejs/node/commit/6c9625dca4)] - **test**: 更新已移动的 `test-wasm-web-api` 的跳过规则 (Richard Lau) [#49958](https://github.com/nodejs/node/pull/49958)
* \[[`f05d6d090c`](https://github.com/nodejs/node/commit/f05d6d090c)] - _**Revert**_ "**test**: 将 test-runner-output 标记为易 flake" (Luigi Pinca) [#49905](https://github.com/nodejs/node/pull/49905)
* \[[`035e06317a`](https://github.com/nodejs/node/commit/035e06317a)] - **test**: 区分 AIX 和 IBM i (Richard Lau) [#48056](https://github.com/nodejs/node/pull/48056)
* \[[`4d0aeed4a6`](https://github.com/nodejs/node/commit/4d0aeed4a6)] - **test**: 消除 test-perf-hooks.js 的不稳定性 (Joyee Cheung) [#49892](https://github.com/nodejs/node/pull/49892)
* \[[`853f57239c`](https://github.com/nodejs/node/commit/853f57239c)] - **test**: 将消息错误测试从 Python 迁移到 JS (Yiyun Lei) [#49721](https://github.com/nodejs/node/pull/49721)
* \[[`a71e3a65bb`](https://github.com/nodejs/node/commit/a71e3a65bb)] - **test**: 修复 edge snapshot 堆栈跟踪 (Geoffrey Booth) [#49659](https://github.com/nodejs/node/pull/49659)
* \[[`6b76b7782c`](https://github.com/nodejs/node/commit/6b76b7782c)] - **test**: 跳过 v8-updates/test-linux-perf (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`c13c98dd38`](https://github.com/nodejs/node/commit/c13c98dd38)] - **test**: 在 SmartOS 上跳过 test-tick-processor-arguments (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`738aa304b3`](https://github.com/nodejs/node/commit/738aa304b3)] - **test**: 适配 REPL 测试以配合 V8 更改 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`de5c009252`](https://github.com/nodejs/node/commit/de5c009252)] - **test**: 适配 test-fs-write 以配合 V8 内部更改 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`8c36168b42`](https://github.com/nodejs/node/commit/8c36168b42)] - **test**: 更新用于禁用 SharedArrayBuffer 的标志 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`6ccb15f7ef`](https://github.com/nodejs/node/commit/6ccb15f7ef)] - **test**: 使调试器测试适配 V8 11.4 (Philip Pfaffe) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`c5de3b49e8`](https://github.com/nodejs/node/commit/c5de3b49e8)] - **test,crypto**: 更新 WebCryptoAPI WPT (Filip Skokan) [#50039](https://github.com/nodejs/node/pull/50039)
* \[[`4b35a9cfda`](https://github.com/nodejs/node/commit/4b35a9cfda)] - **test_runner**: 为 FileTests 添加测试位置 (Colin Ihrig) [#49999](https://github.com/nodejs/node/pull/49999)
* \[[`c935d4c8fa`](https://github.com/nodejs/node/commit/c935d4c8fa)] - **test_runner**: 用 else 替换多余的 if (Colin Ihrig) [#49943](https://github.com/nodejs/node/pull/49943)
* \[[`a4c7f81241`](https://github.com/nodejs/node/commit/a4c7f81241)] - **test_runner**: 捕获 reporter 错误 (Moshe Atlow) [#49646](https://github.com/nodejs/node/pull/49646)
* \[[`bb52656fc6`](https://github.com/nodejs/node/commit/bb52656fc6)] - _**Revert**_ "**test_runner**: 更早运行全局 after() 钩子" (Joyee Cheung) [#49110](https://github.com/nodejs/node/pull/49110)
* \[[`6346bdc526`](https://github.com/nodejs/node/commit/6346bdc526)] - **test_runner**: 更早运行全局 after() 钩子 (Colin Ihrig) [#49059](https://github.com/nodejs/node/pull/49059)
* \[[`0d8faf2952`](https://github.com/nodejs/node/commit/0d8faf2952)] - **test_runner,test**: 修复不稳定的 test-runner-cli-concurrency.js (Colin Ihrig) [#50108](https://github.com/nodejs/node/pull/50108)
* \[[`b1ada0ad55`](https://github.com/nodejs/node/commit/b1ada0ad55)] - **tls**: 处理原始 socket 被销毁的情况 (Luigi Pinca) [#49980](https://github.com/nodejs/node/pull/49980)
* \[[`fae1af0a75`](https://github.com/nodejs/node/commit/fae1af0a75)] - **tls**: ciphers 允许 bang 语法 (Chemi Atlow) [#49712](https://github.com/nodejs/node/pull/49712)
* \[[`766198b9e1`](https://github.com/nodejs/node/commit/766198b9e1)] - **tools**: 修复引用 dep_updaters 脚本的注释 (Keksonoid) [#50165](https://github.com/nodejs/node/pull/50165)
* \[[`760b5dd259`](https://github.com/nodejs/node/commit/760b5dd259)] - **tools**: 移除 no-return-await lint 规则 (翠 / green) [#50118](https://github.com/nodejs/node/pull/50118)
* \[[`a0a5b751fb`](https://github.com/nodejs/node/commit/a0a5b751fb)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#50083](https://github.com/nodejs/node/pull/50083)
* \[[`69fb55e6b9`](https://github.com/nodejs/node/commit/69fb55e6b9)] - **tools**: 将 eslint 更新到 8.51.0 (Node.js GitHub Bot) [#50084](https://github.com/nodejs/node/pull/50084)
* \[[`f73650ea52`](https://github.com/nodejs/node/commit/f73650ea52)] - **tools**: 移除 genv8constants.py (Ben Noordhuis) [#50023](https://github.com/nodejs/node/pull/50023)
* \[[`581434e54f`](https://github.com/nodejs/node/commit/581434e54f)] - **tools**: 将 eslint 更新到 8.50.0 (Node.js GitHub Bot) [#49989](https://github.com/nodejs/node/pull/49989)
* \[[`344d3c4b7c`](https://github.com/nodejs/node/commit/344d3c4b7c)] - **tools**: 更新 lint-md-dependencies (Node.js GitHub Bot) [#49983](https://github.com/nodejs/node/pull/49983)
* \[[`7f06c270c6`](https://github.com/nodejs/node/commit/7f06c270c6)] - **tools**: 为生成的 API ToC 添加导航 ARIA 地标 (Rich Trott) [#49882](https://github.com/nodejs/node/pull/49882)
* \[[`e97d25687b`](https://github.com/nodejs/node/commit/e97d25687b)] - **tools**: 在未来版本中使用 osx notarytool (Ulises Gascon) [#48701](https://github.com/nodejs/node/pull/48701)
* \[[`3f1936f698`](https://github.com/nodejs/node/commit/3f1936f698)] - **tools**: 将 github_reporter 更新到 1.5.3 (Node.js GitHub Bot) [#49877](https://github.com/nodejs/node/pull/49877)
* \[[`8568de3da6`](https://github.com/nodejs/node/commit/8568de3da6)] - **tools**: 将新的 V8 头文件添加到发行包 (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`86cb23d09f`](https://github.com/nodejs/node/commit/86cb23d09f)] - **tools**: 更新适用于 11.8 的 V8 gypfiles (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`9c6219c7e2`](https://github.com/nodejs/node/commit/9c6219c7e2)] - **tools**: 更新适用于 11.7 的 V8 gypfiles (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`73ddf50163`](https://github.com/nodejs/node/commit/73ddf50163)] - **tools**: 更新适用于 11.6 的 V8 gypfiles (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`817ef255ea`](https://github.com/nodejs/node/commit/817ef255ea)] - **tools**: 更新适用于 11.5 的 V8 gypfiles (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`f34a3a9861`](https://github.com/nodejs/node/commit/f34a3a9861)] - **tools**: 更新适用于 11.4 的 V8 gypfiles (Michaël Zasso) [#49639](https://github.com/nodejs/node/pull/49639)
* \[[`9df864ddeb`](https://github.com/nodejs/node/commit/9df864ddeb)] - **typings**: 在类型中使用 `Symbol.dispose` 和 `Symbol.asyncDispose` (Niklas Mollenhauer) [#50123](https://github.com/nodejs/node/pull/50123)
* \[[`54bb691c0b`](https://github.com/nodejs/node/commit/54bb691c0b)] - **util**: 延迟解析 mime 参数 (Aras Abbasi) [#49889](https://github.com/nodejs/node/pull/49889)
* \[[`1d220b55ac`](https://github.com/nodejs/node/commit/1d220b55ac)] - **vm**: 当未设置 importModuleDynamically 时使用默认 HDO (Joyee Cheung) [#49950](https://github.com/nodejs/node/pull/49950)
* \[[`c1a3a98560`](https://github.com/nodejs/node/commit/c1a3a98560)] - **wasi**: 处理 Coverity 警告 (Michael Dawson) [#49866](https://github.com/nodejs/node/pull/49866)
* \[[`9cb8eb7177`](https://github.com/nodejs/node/commit/9cb8eb7177)] - **wasi**: 修复 ibmi 的 wasi 测试 (Michael Dawson) [#49953](https://github.com/nodejs/node/pull/49953)
* \[[`16ac5e1ca8`](https://github.com/nodejs/node/commit/16ac5e1ca8)] - **zlib**: 修复在 android 上发现 cpu-features.h 的问题 (MatteoBax) [#49828](https://github.com/nodejs/node/pull/49828)
