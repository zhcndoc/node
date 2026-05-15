# 维护 OpenSSL

OpenSSL 会由 [update-openssl-action][] 自动更新。
在 `tools/dep_updaters` 中还有一个脚本可用于更新它。
本文档描述了如何手动更新 `deps/openssl/`。

## 要求

* Linux 环境。
* `perl` 仅测试了 Perl 5 版本。
* `nasm`（<https://www.nasm.us/>）需要 2.11 或更高版本。
* GNU `as`，来自 binutils。需要 2.26 或更高版本。

## 0. 检查要求

```console
% perl -v

This is perl 5, version 22, subversion 1 (v5.22.1) built for
x86_64-linux-gnu-thread-multi
(with 60 registered patches, see perl -V for more detail)

% as --version
GNU assembler (GNU Binutils for Ubuntu) 2.26.1
Copyright (C) 2015 Free Software Foundation, Inc.
...
% nasm -v
NASM version 2.11.08
```

## 1. 获取并解压新的 OpenSSL 源码

从 <https://github.com/openssl/openssl/tree/openssl-3.0.16> 获取新的源码，
并将所有文件复制到 `deps/openssl/openssl` 中。然后添加所有文件并提交它们。
（上面的链接和分支会随着每个新的 OpenSSL 版本发布而变化）。

```bash
git clone https://github.com/openssl/openssl
cd openssl
cd ../node/deps/openssl
rm -rf openssl
cp -R ../../../openssl openssl
rm -rf openssl/.git*
git add --all openssl
git commit openssl
```

```text
deps: 将 openssl 源码升级到 openssl-3.0.16

通过以下方式更新 deps/openssl/openssl 中的所有源码：
    $ git clone git@github.com:openssl/openssl.git
    $ cd openssl
    $ git checkout openssl-3.0.16
    $ cd ../node/deps/openssl
    $ rm -rf openssl
    $ cp -R ../../../openssl openssl
    $ rm -rf openssl/.git*
    $ git add --all openssl
    $ git commit openssl
```

## 2. 在 `deps/openssl/config` 目录中执行 `make`

使用 `make` 重新生成 `deps/openssl/config/archs/` 中所有与平台相关的文件：

```bash
# 在非 Linux 机器上
make gen-openssl

# 在 Linux 机器上
make -C deps/openssl/config clean
make -C deps/openssl/config
```

修正 32 位 Windows 汇编器指令。这将允许这些提交被 cherry-pick 到仍然在 32 位 Windows 上提供二进制文件的较旧发布分支。

```bash
make -C deps/openssl/config clean
# 编辑 deps/openssl/openssl/crypto/perlasm/x86asm.pl，将
# #ifdef 改为 %ifdef，以使其与 32 位 Windows 上的 nasm 兼容。
# 参见：https://github.com/nodejs/node/pull/43603#issuecomment-1170670844
# 参考：https://github.com/openssl/openssl/issues/18459
```

## 3. 检查差异

检查差异以确保更新正确。即使 openssl 源码没有更新，`buildinf.h` 文件也会被更新，因为其中包含时间戳数据。

```bash
git diff -- deps/openssl
```

_注意_：在 Windows 上，OpenSSL Configure 会生成一个可用于 `nmake` 命令的 `makefile`。上面第 2 步中的 `make` 命令使用的是手动创建的 `Makefile_VC-WIN64A` 和 `Makefile_VC-WIN32`。当 Windows 中的源文件或构建选项更新时，需要手动修改这两个 Makefile。如果你不确定，请向 @shigeki 询问详情。

## 4. 提交并进行测试

更新所有依赖架构的文件。提交前不要忘记在文件发生变更时执行 git add 或删除文件：

```bash
git add deps/openssl/config/archs
git add deps/openssl/openssl
git commit
```

提交信息可以写成如下形式（其中 openssl 版本设置为相应的值）：

```text
deps: 为 openssl-3.0.16 更新 archs 文件

在 OpenSSL 源码更新后，所有配置文件都需要通过以下方式重新生成并提交：
    $ make -C deps/openssl/config
    $ git add deps/openssl/config/archs
    $ git add deps/openssl/openssl
    $ git commit
```

最后，构建 Node.js 并运行测试。

[update-openssl-action]: ../../../.github/workflows/update-openssl.yml
