# 维护 merve

[merve](https://github.com/nodejs/node/tree/HEAD/deps/merve) 依赖在 Node.js 的 ESM 实现中用于检测 CommonJS 模块的命名导出。

它在 [`node:internal/modules/esm/translators`](https://github.com/nodejs/node/blob/HEAD/lib/internal/modules/esm/translators.js) 中使用，并通过一个内部绑定暴露。

## 更新 merve

`tools/dep_updaters/update-merve.sh` 脚本自动化了 merve 依赖的更新。它会从 GitHub 获取最新发布版本，并更新 `deps/merve` 目录中的文件。

要手动更新 merve：

* 查看 [merve releases][] 是否有新版本。
* 下载最新的单头文件发布版本。
* 替换 `deps/merve` 中的文件（保留 `merve.gyp`）。
* 更新 [doc/api/esm.md](../../api/esm.md) 末尾列表中指向 merve 的链接，使其指向更新后的版本。
* 创建一个 PR，添加 `deps/merve` 中被修改的文件。

如果需要为 Node.js 对 merve 进行更新，首先将这些更新提交到 [anonrig/merve][]，
请求发布一个新版本，然后在可用后拉取更新后的版本。

[anonrig/merve]: https://github.com/anonrig/merve
[merve releases]: https://github.com/anonrig/merve/releases
