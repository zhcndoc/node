# 在 Node.js 中维护 ICU

## 背景

Unicode 国际组件（[ICU4C][ICU]）既被 V8 使用，也被 Node.js 直接使用，以提供国际化功能。引自 icu-project.org：

> ICU 是一套成熟、被广泛使用的 C/C++ 和 Java 库，为软件应用程序提供 Unicode 和全球化支持。ICU 具有很强的可移植性，并能让应用程序在所有平台以及 C/C++ 和 Java 软件之间获得相同的结果。

如果 Node.js 配置为使用其内置 ICU，
它会使用 ICU 的一个严格子集，位于
[deps/icu-small](https://github.com/nodejs/node/tree/HEAD/deps/icu-small) 中。
关于 Node.js 可通过不同方式构建并支持 ICU 的详细说明，见 [api/intl.html](https://nodejs.org/api/intl.html)。

## 数据依赖

ICU 消耗并包含：

* 来自 [CLDR][] 的提取区域数据
* 提取的 [Unicode][] 数据。
* 时区（[tz][]）数据

这些项目的当前版本可以通过 `node -p process.versions` 查看：

```console
$ node -p process.versions

{
  …
  cldr: '35.1',
  icu: '64.2',
  tz: '2019a',
  unicode: '12.1'
}
```

### 时区数据

时区数据文件的更新独立于 ICU CLDR 数据。要应用时区数据文件修复，无需升级 ICU 及其主数据文件。

[IANA tzdata][tz] 项目会发布新版本，并通过
[`tz-announce`](https://mm.icann.org/pipermail/tz-announce/) 邮件列表进行公告。

Unicode 项目会接收新的发布并在 icu/icu-data 仓库中发布
[更新的时区数据文件](https://github.com/unicode-org/icu-data/tree/HEAD/tzdata/icunew)。

Node.js 的所有现代版本都使用时区数据文件的 44 版 ABI。

#### 示例：更新 ICU `.dat` 文件

* 解压 `deps/icu-small/source/data/in/icudt##l.dat.bz2`，其中 `##` 是
  ICU 主版本号。
* 克隆 icu/icu-data 仓库，并将最新的 `tzdata` 发布版 `le`
  文件复制到 `source/data/in` 目录。
* 按照上游 [ICU 说明](https://unicode-org.github.io/icu/userguide/datetime/timezone/)
  修补 ICU `.dat` 文件：
  > `for i in zoneinfo64.res windowsZones.res timezoneTypes.res metaZones.res;
  > do icupkg -a $i icudt*l.dat`
* 可选地，在使用 `icupkg -l` 时，验证上述文件列表中只包含一个文件。
* 可选地，使用 `icupkg -x` 提取每个文件，并验证 `shasum`
  与期望值匹配。
* 使用与第一步相同的文件名压缩 `.dat` 文件。
* 构建、测试，并验证 `process.versions.tz` 匹配目标版本。
* 创建一个新的次要版本发布。

## 发布计划

ICU 通常每年发布 >1 次，尤其会与 [Unicode][] 的主要发布同步。当前发布计划可在 [ICU][]
网站左侧边栏中查看。

### V8 依赖 ICU

由于 [Ecma402][] 支持所需的特性/修复要求，V8 会积极升级到新的 ICU 版本。所需的最低 ICU 版本在 V8 源码树中指定。如果 ICU 版本过旧，
V8 将无法编译。

```c
// deps/v8/src/objects/intl-objects.h
#define V8_MINIMUM_ICU_VERSION 65
```

Node.js 中的 V8 依赖于 Node.js 提供的 ICU 版本。

文件 `tools/icu/icu_versions.json` 包含 Node.js 当前已知可工作的 ICU 最低版本。这个版本应该
至少与 V8 的版本相同，这样用户就能更早发现自己的 ICU 版本过旧。Node.js 构建时会通过一个测试用例来验证这一点。

## 如何升级 ICU

> 脚本 `tools/dep_updaters/update-icu.sh` 会自动完成
> 这个过程。

* 确保你的 Node.js 工作区是干净的（`git status`
  应该足够）。
* 使用你想升级到的特定 [ICU 版本](http://site.icu-project.org/download)
  配置 Node.js，例如：

```bash
./configure \
    --with-intl=full-icu \
    --with-icu-source=https://github.com/unicode-org/icu/releases/download/release-67-1/icu4c-67_1-src.tgz
make
```

> _注意_，理论上，相应的 `vcbuild.bat` 命令也应该可用，
> 但下面的命令以 makefile 为中心。

* 如果需要针对 ICU 版本的特定更改，你可能需要在
  `tools/icu/icu-generic.gyp` 中做修改，或者向 `tools/icu/patches` 添加补丁文件。
  * 具体来说，请查看 `tools/icu/icu-generic.gyp` 中 `sources!` 里的列表，找出需要排除的文件。

* 验证 Node.js 构建是否正常：

```bash
make test-ci
```

同时运行

<!-- eslint-disable strict -->

```js
new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date(9E8));
```

……应该返回 `enero` 而不是 `January`。

* 现在，运行 shrink 工具以从 `deps/icu` 更新 `deps/icu-small`

> :warning: 不要修改 `deps/icu-small` 中的任何源代码！
> 参见下面关于 ICU 浮动补丁的部分。

```bash
python tools/icu/shrink-icu-src.py
```

* 现在，重新完整构建一次 Node.js 进行测试：

```bash
make -k distclean
./configure
make
```

* 测试这个新默认生成的 Node.js

<!-- eslint-disable strict -->

```js
process.versions.icu;
new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date(9E8));
```

（这应该会打印你更新后的 ICU 版本号，并再次输出 `enero`。）

你现在可以提交（`git add`）更新后的 `deps/icu-small` 了。

> :warning: 不要修改 `deps/icu-small` 中的任何源代码！
> 参见下面关于 ICU 浮动补丁的部分。

* 现在，重新构建 Node.js 许可证。

```bash
# 清理 - 删除 deps/icu
make clean
tools/license-builder.sh
```

* 更新 `tools/icu/current_ver.dep` 中完整 ICU 文件的 URL 和哈希。
  它应与第一步中使用的 ICU URL 一致。完成后，
  下面的命令应能使用 small ICU 构建。

```bash
# 清理
rm -rf out deps/icu deps/icu4c*
./configure --with-intl=small-icu --download=all
make
make test-ci
```

* 提交对 `deps/icu-small`、`tools/icu/current_ver.dep`
  和 `LICENSE` 文件的更改。

## ICU 的浮动补丁

浮动补丁在 `configure` 时应用。“patch” 文件
会替代原始源文件使用。补丁文件是完整的 `.cpp` 文件，用于替换原始内容。

补丁与特定 ICU 版本绑定。它们不会应用到
未来的 ICU 版本。我们假设你已经针对 [ICU][] 提交了 bug，
并且已经将修复上游合并，因此在后续 ICU
版本中就不再需要该补丁。

### 示例

例如，要为 ICU 版本 63 修补 `source/tools/toolutil/pkg_genc.cpp`：

```bash
# 转到你的 Node.js 源码目录
cd <node>

# 创建浮动补丁目录
mkdir -p tools/icu/patches/63

# 为要修补的文件创建子目录：
mkdir -p tools/icu/patches/63/source/tools/toolutil/

# 复制要修补的文件
cp deps/icu-small/source/tools/toolutil/pkg_genc.cpp \
tools/icu/patches/63/source/tools/toolutil/pkg_genc.cpp

# 对此文件进行任何修改：
(edit tools/icu/patches/63/source/tools/toolutil/pkg_genc.cpp )

# 测试
make clean && ./configure && make
```

你应该会看到类似这样的消息：

```console
INFO: Using floating patch "tools/icu/patches/63/source/tools/toolutil/pkg_genc.cpp" from "tools/icu"
```

### 清理

任何早于 `tools/icu/icu_versions.json` 中给定最小版本的补丁
都应该删除，因为它们将永远不会被使用。

### 为什么不直接修改 ICU 源码？

尤其考虑到上面提到的 V8 依赖，有时确实需要对 ICU 使用浮动
补丁。虽然直接修改 `deps/icu-small` 中的文件看起来更省事，
但这并不是正确的方法，原因如下：

1. **可重复性。** 考虑到合并新 ICU 版本的复杂性，
   按照本文前一节中的步骤操作，应该可以在不担心覆盖补丁的情况下
   重复执行。

2. **可验证性。** 考虑到一个 ICU PR 中会修改大量文件，
   下一次某些内容落地时，浮动补丁很容易被遗漏或完全丢失。

3. **兼容性。** 将 ICU 加载到 Node.js 中有多种方式
   （见顶部的 README.md）。如果只修改 `icu-small`，当用户以其他方式指定 ICU 源码时，
   该补丁就不会被应用。

[CLDR]: http://cldr.unicode.org/
[Ecma402]: https://github.com/tc39/ecma402
[ICU]: http://site.icu-project.org/
[Unicode]: https://home.unicode.org/
[tz]: https://www.iana.org/time-zones
