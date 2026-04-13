# 构建 Node.js

根据您需要的平台或功能，构建过程可能会有所不同。构建完二进制文件后，运行测试套件以确认二进制文件按预期工作是一个不错的后续步骤。

如果您可以重现测试失败，请在 [Node.js 问题跟踪器](https://github.com/nodejs/node/issues) 中搜索它，或提交一个新问题。

## 目录

* [支持的平台](#supported-platforms)
  * [输入](#input)
  * [策略](#strategy)
  * [平台列表](#platform-list)
  * [支持的工具链](#supported-toolchains)
  * [官方二进制平台和工具链](#official-binary-platforms-and-toolchains)
    * [OpenSSL 汇编支持](#openssl-asm-support)
  * [本文档的先前版本](#previous-versions-of-this-document)
* [在支持的平台上构建 Node.js](#building-nodejs-on-supported-platforms)
  * [先决条件](#prerequisites)
  * [Unix 和 macOS](#unix-and-macos)
    * [Unix 先决条件](#unix-prerequisites)
    * [macOS 先决条件](#macos-prerequisites)
    * [构建 Node.js](#building-nodejs-1)
    * [安装 Node.js](#installing-nodejs)
    * [运行测试](#running-tests)
    * [运行覆盖率](#running-coverage)
    * [构建文档](#building-the-documentation)
    * [构建调试版本](#building-a-debug-build)
    * [构建 ASan 版本](#building-an-asan-build)
    * [加速开发过程中的频繁重新构建](#speeding-up-frequent-rebuilds-when-developing)
      * [ccache](#ccache)
      * [从磁盘加载 JS 文件而不是嵌入](#loading-js-files-from-disk-instead-of-embedding)
    * [排查 Unix 和 macOS 构建问题](#troubleshooting-unix-and-macos-builds)
  * [Windows](#windows)
    * [Windows 先决条件](#windows-prerequisites)
      * [选项 1：手动安装](#option-1-manual-install)
      * [选项 2：使用 WinGet 自动安装](#option-2-automated-install-with-winget)
    * [构建 Node.js](#building-nodejs-2)
      * [使用 ccache](#using-ccache)
  * [Android](#android)
* [Intl (ECMA-402) 支持](#intl-ecma-402-support)
  * [使用完整的 ICU 支持构建（支持 ICU 的所有区域设置）](#build-with-full-icu-support-all-locales-supported-by-icu)
    * [Unix/macOS](#unixmacos)
    * [Windows](#windows-1)
  * [精简版：`small-icu`（仅限英语）支持](#trimmed-small-icu-english-only-support)
    * [Unix/macOS](#unixmacos-1)
    * [Windows](#windows-2)
  * [在没有 Intl 支持的情况下构建](#building-without-intl-support)
    * [Unix/macOS](#unixmacos-2)
    * [Windows](#windows-3)
  * [使用已安装的 ICU（仅限 Unix/macOS）](#use-existing-installed-icu-unixmacos-only)
  * [使用特定的 ICU 构建](#build-with-a-specific-icu)
    * [Unix/macOS](#unixmacos-3)
    * [Windows](#windows-4)
* [配置 OpenSSL 应用名称](#configure-openssl-appname)
* [使用符合 FIPS 标准的 OpenSSL 构建 Node.js](#building-nodejs-with-fips-compliant-openssl)
* [使用 Temporal 支持构建 Node.js](#building-nodejs-with-temporal-support)
* [使用外部核心模块构建 Node.js](#building-nodejs-with-external-core-modules)
  * [Unix/macOS](#unixmacos-4)
  * [Windows](#windows-5)
* [给 Node.js 的下游分发者的注意事项](#note-for-downstream-distributors-of-nodejs)

## 支持的平台

此支持的平台列表是当前分支/版本的。

### 输入

Node.js 依赖于 V8 和 libuv。我们采用了它们支持的平台的一个子集。

### 策略

有三个支持级别：

*   **Tier 1**：这些平台代表了大多数 Node.js 用户。Node.js 构建工作组维护基础设施以实现完整的测试覆盖。Tier 1 平台上的测试失败将阻止发布。
*   **Tier 2**：这些平台代表了较小的 Node.js 用户群体。Node.js 构建工作组维护基础设施以实现完整的测试覆盖。Tier 2 平台上的测试失败将阻止发布。基础设施问题可能会延迟这些平台的二进制文件发布。
*   **实验性**：可能无法编译或测试套件可能无法通过。核心团队不为这些平台发布版本。实验性平台上的测试失败不会阻止发布。欢迎为改进这些平台的支持做出贡献。

平台在主要版本系列之间可能会在不同级别之间移动。下表将反映这些变化。

### 平台列表

Node.js 的编译/执行支持取决于操作系统、架构和 libc 版本。下表列出了每个支持的组合的支持级别。还为 Tier 1 平台提供了[支持的编译工具链](#supported-toolchains)列表。

**对于生产应用程序，请仅在支持的平台上运行 Node.js。**

如果供应商已终止对某个平台版本的支持，Node.js 将不再支持该平台。换句话说，Node.js 不支持在生命周期结束 (EoL) 的平台上运行。无论下表中的条目如何，这都是如此。

| 操作系统   | 架构     | 版本                          | 支持类型   | 说明                                           |
| ---------- | -------- | ----------------------------- | -------- | ---------------------------------------------- |
| GNU/Linux  | x64      | 内核 >= 4.18[^1]，glibc >= 2.28 | Tier 1   | 例如 Ubuntu 20.04、Debian 10、RHEL 8           |
| GNU/Linux  | x64      | 内核 >= 3.10，musl >= 1.1.19    | 实验性   | 例如 Alpine 3.8                                |
| GNU/Linux  | x86      | 内核 >= 3.10，glibc >= 2.17     | 实验性   | 自 Node.js 10 起已降级                         |
| GNU/Linux  | arm64    | 内核 >= 4.18[^1]，glibc >= 2.28 | Tier 1   | 例如 Ubuntu 20.04、Debian 10、RHEL 8           |
| GNU/Linux  | armv7    | 内核 >= 4.18[^1]，glibc >= 2.28 | 实验性   | 自 Node.js 24 起已降级                         |
| GNU/Linux  | armv6    | 内核 >= 4.14，glibc >= 2.24     | 实验性   | 自 Node.js 12 起已降级                         |
| GNU/Linux  | ppc64le >=power9 | 内核 >= 4.18[^1]，glibc >= 2.28 | Tier 2   | 例如 Ubuntu 20.04、RHEL 8                      |
| GNU/Linux  | s390x >=z14 | 内核 >= 4.18[^1]，glibc >= 2.28 | Tier 2   | 例如 RHEL 8                                    |
| GNU/Linux  | loong64  | 内核 >= 5.19，glibc >= 2.36     | 实验性   |                                                |
| GNU/Linux  | riscv64  | 内核 >= 5.19，glibc >= 2.36     | 实验性   | GCC >= 14 或 Clang >= 19 用于原生构建[^7] |
| Windows    | x64      | >= Windows 10/Server 2016       | Tier 1   | [^2],[^3]                                      |
| Windows    | arm64    | >= Windows 10                   | Tier 2   |                                                |
| macOS      | x64      | >= 13.5                         | Tier 1   | 有关编译的说明请参阅 [^4]                       |
| macOS      | arm64    | >= 13.5                         | Tier 1   |                                                |
| SmartOS    | x64      | >= 18                           | Tier 2   |                                                |
| AIX        | ppc64be >=power9 | >= 7.2 TL04                     | Tier 2   |                                                |
| FreeBSD    | x64      | >= 13.2                         | 实验性   |                                                |
| OpenHarmony| arm64    | >= 5.0                          | 实验性   |                                                |

<!--lint disable final-definition-->

[^1]：较旧的内核版本可能可用。但是，官方 Node.js 发行版二进制文件是在 [RHEL 8 系统上构建的](#official-binary-platforms-and-toolchains)，内核版本为 4.18。

[^2]：在 Windows 上，在 `mintty` 等 Windows 终端模拟器中运行 Node.js 需要使用 [winpty](https://github.com/rprichard/winpty) 来使 tty 通道正常工作（例如 `winpty node.exe script.js`）。在 "Git bash" 中，如果您调用 node shell 别名（不带 `.exe` 后缀的 `node`），则会自动使用 `winpty`。

[^3]：不支持 Windows Subsystem for Linux (WSL)，但 GNU/Linux 构建过程和二进制文件应该可以工作。社区只会解决在原生 GNU/Linux 系统上重现的问题。仅在 WSL 上重现的问题应报告在 [WSL 问题跟踪器](https://github.com/Microsoft/WSL/issues) 中。在 WSL 中运行 Windows 二进制文件 (`node.exe`) 在没有 `stdio` 重定向等解决方法的情况下将无法工作。

[^4]：我们的 macOS 二进制文件以 13.5 为目标进行编译。编译需要 Xcode 16。

[^7]：原生 riscv64 构建需要 GCC >= 14 或 Clang >= 19，因为 V8 在 `deps/v8/src/base/cpu.cc` 中包含 `<riscv_vector.h>` 并使用 `target("arch=+v")`。GCC 13 的 `riscv_vector.h` 在没有 `-march=rv64gcv` 的情况下会出错，并且根本不支持 `target` 属性。从 x64 交叉编译不受影响（代码位于 `V8_HOST_ARCH_RISCV64` 之后）。

<!--lint enable final-definition-->

### 支持的工具链

根据主机平台的不同，工具链的选择也可能不同。

| 操作系统 | 编译器版本                                          |
| -------- | --------------------------------------------------- |
| Linux    | GCC >= 13.2 或 Clang >= 19.1                          |
| Windows  | Visual Studio 2022 或 2026，带有 Windows 11 SDK，在 64 位主机上 |
| macOS    | Xcode >= 16.4 (Apple LLVM >= 19)                      |

### 官方二进制平台和工具链

<https://nodejs.org/download/release/> 上的二进制文件是在以下环境中生成的：

| 二进制包      | 平台和工具链                                        |
| ------------- | --------------------------------------------------- |
| aix-ppc64     | AIX 7.2 TL04 on PPC64BE with GCC 12[^5]             |
| darwin-x64    | macOS 15, Xcode 16 with -mmacosx-version-min=13.5   |
| darwin-arm64 (and .pkg) | macOS 15 (arm64), Xcode 16 with -mmacosx-version-min=13.5 |
| linux-arm64   | RHEL 8 with Clang 19.1 and gcc-toolset-14-libatomic-devel[^6] |
| linux-ppc64le | RHEL 8 with Clang 19.1 and gcc-toolset-14-libatomic-devel[^6] |
| linux-s390x   | RHEL 8 with Clang 19.1 and gcc-toolset-14-libatomic-devel[^6] |
| linux-x64     | RHEL 8 with Clang 19.1 and gcc-toolset-14-libatomic-devel[^6] |
| win-arm64     | Windows Server 2022 (x64) with Visual Studio 2022   |
| win-x64       | Windows Server 2022 (x64) with Visual Studio 2022   |

从 Node.js 25 开始，官方 Linux 二进制文件链接了 `libatomic`，这些系统在执行时必须安装并提供 `libatomic` 运行时。`libatomic` 运行时的包名通常是 `libatomic` 或 `libatomic1`，具体取决于您的 Linux 发行版。

<!--lint disable final-definition-->

[^5]：在这些系统上生成的二进制文件需要 libstdc++12，可从 [AIX 工具箱][] 获取。

[^6]：在这些系统上生成的二进制文件与 glibc >= 2.28 和 libstdc++ >= 6.0.25 (`GLIBCXX_3.4.25`) 兼容。这些在原生支持 GCC 8.1 或更高版本的发行版上可用，例如 Debian 10、RHEL 8 和 Ubuntu 20.04。

<!--lint enable final-definition-->

#### OpenSSL 汇编支持

OpenSSL-1.1.1 在 x86\_64 和 ia32 上使用汇编支持需要以下汇编器版本。

使用 AVX-512：

*   gas (GNU 汇编器) 版本 2.26 或更高版本
*   Windows 上的 nasm 版本 2.11.8 或更高版本

AVX-512 在 OpenSSL-1.1.1 中被 Skylake-X 禁用。

使用 AVX2：

*   gas (GNU 汇编器) 版本 2.23 或更高版本
*   Xcode 版本 5.0 或更高版本
*   llvm 版本 3.3 或更高版本
*   Windows 上的 nasm 版本 2.10 或更高版本

请参阅 <https://docs.openssl.org/1.1.1/man3/OPENSSL_ia32cap/> 获取详细信息。

如果未安装上述任一版本进行编译，请使用带有 `--openssl-no-asm` 标志的 `configure`。否则，`configure` 将失败。

### 文档的先前版本

支持的平台和工具链会随着 Node.js 的每个主要版本而变化。本文档仅对当前 Node.js 主要版本有效。请参阅本文档的先前版本以了解旧版 Node.js：

*   [Node.js 24](https://github.com/nodejs/node/blob/v24.x/BUILDING.md)
*   [Node.js 22](https://github.com/nodejs/node/blob/v22.x/BUILDING.md)
*   [Node.js 20](https://github.com/nodejs/node/blob/v20.x/BUILDING.md)

## 在支持的平台上构建 Node.js

### 先决条件

*   [支持的 Python 版本][Python versions] 用于构建和测试。
*   内存：使用 4 个并行作业进行编译时，通常需要至少 8GB 的 RAM（例如：`make -j4`）

### Unix 和 macOS

#### Unix 先决条件

*   `gcc` 和 `g++` >= 13.2 或 `clang` 和 `clang++` >= 19.1
*   GNU Make 3.81 或更高版本
*   [支持的 Python 版本][Python versions]
    *   对于测试覆盖率，您的 Python 安装必须包含 pip。

可以通过以下方式通过 Linux 包管理器进行安装：

*   Nix, NixOS: `nix-shell`
*   Ubuntu, Debian: `sudo apt-get install python3 g++-12 gcc-12 make python3-pip`
*   Fedora: `sudo dnf install python3 gcc-c++ make python3-pip`
*   CentOS 和 RHEL: `sudo yum install python3 gcc-c++ make python3-pip`
*   OpenSUSE: `sudo zypper install python3 gcc-c++ make python3-pip`
*   Arch Linux, Manjaro: `sudo pacman -S python gcc make python-pip`

FreeBSD 和 OpenBSD 用户可能还需要安装 `libexecinfo`。

#### macOS 先决条件

*   Xcode Command Line Tools >= 16.4 for macOS
*   [支持的 Python 版本][Python versions]
    *   对于测试覆盖率，您的 Python 安装必须包含 pip。

macOS 用户可以通过运行 `xcode-select --install` 来安装 `Xcode Command Line Tools`。或者，如果您已经安装了完整的 Xcode，可以在菜单 `Xcode -> Open Developer Tool -> More Developer Tools...` 下找到它们。此步骤将安装 `clang`、`clang++` 和 `make`。

#### Nix 集成

如果您使用 Nix 和 direnv，可以使用以下命令开始：

```bash
echo 'use_nix --arg sharedLibDeps {} --argstr icu small' > .envrc
direnv allow .
make build-ci -j12
```

大多数依赖项可能在官方的 nixpkgs 缓存中可用，尽管对于某些依赖项我们必须偏离上游存储库，在这种情况下，这些依赖项将在本地构建，或者您可以使用项目的 Cachix 存储库：`cachix use nodejs`。有关更多信息，请参阅 <https://docs.cachix.org/>。

使用 `make build-ci` 是为了确保您使用的是 `CONFIG_FLAGS` 环境变量。您也可以手动指定它：

```bash
./configure $CONFIG_FLAGS
make -j12
```

传递 `--arg sharedLibDeps {}` 指示 direnv 和 Nix 生成使用捆绑的本地依赖项的环境。使用捆绑的依赖项可以使结果更接近官方二进制文件，但缺点是构建需要更长时间才能完成，因为您需要构建这些依赖项而不是使用来自 Nix 缓存的缓存依赖项。您可以省略该标志以使用所有共享依赖项，或仅指定某些依赖项：

```bash
cat -> .envrc <<'EOF'
use nix --arg sharedLibDeps '{
  inherit (import ./tools/nix/sharedLibDeps.nix {})
    openssl
    zlib
  ;
}'
EOF
```

传递 `--argstr icu small` 指示 direnv 和 Nix 在 `CONFIG_FLAGS` 环境变量中传递 `--with-intl=small`。如果省略此项，将使用 Nix 缓存中预先构建的 ICU，这应该会大大加快编译时间。

`direnv` 的使用是完全可选的，您也可以直接使用 `nix-shell`，例如，您可以使用以下命令构建用于基准测试目的的二进制文件：

```bash
# 传递 `--arg loadJSBuiltinsDynamically false` 以指示编译器嵌入 JS 核心文件，使其不再受本地更改的影响
# （对于获得有用的基准测试结果是必需的）。
# 传递 `--arg devTools '[]' --arg benchmarkTools '[]'` 因为我们不需要
# 这些来构建 node。
nix-shell \
  --arg loadJSBuiltinsDynamically false \
  --arg devTools '[]' --arg benchmarkTools '[]' \
  --run 'make build-ci -j12'

mv out/Release/node ./node_old

# ...
# 进行本地更改，然后重新构建 node

nix-shell \
  --arg loadJSBuiltinsDynamically false \
  --arg devTools '[]' --arg benchmarkTools '[]' \
  --run 'make build-ci -j12'

nix-shell --pure --run './node benchmark/compare.js --old ./node_old  --new ./node http | Rscript benchmark/compare.R'
```

还有其他属性可以传递，请参阅 `shell.nix` 文件了解更多详细信息。

#### 构建 Node.js

如果您的构建目录路径包含空格，构建可能会失败。

要构建 Node.js：

```bash
./configure
make -j4
```

> \[!IMPORTANT]
> 如果在此过程中遇到编译错误，例如
> `error: no matching conversion for functional-style cast from 'unsigned int' to 'TypeIndex'`
> 请确保使用与 C++20 兼容的 `g++` 或 `clang` 版本。

我们可以使用 [Ninja](https://ninja-build.org/) 来加速构建。有关更多信息，请参阅
[使用 Ninja 构建 Node.js](doc/contributing/building-node-with-ninja.md)。

`-j4` 选项将导致 `make` 运行 4 个并发编译作业，这可能会减少构建时间。有关更多信息，请参阅
[GNU Make 文档](https://www.gnu.org/software/make/manual/html_node/Parallel.html)。

上述要求 `python` 解析为受支持的 Python 版本。请参阅 [先决条件](#prerequisites)。

构建完成后，设置 [防火墙规则](tools/macos-firewall.sh) 可以避免在运行测试时弹出接受入站网络连接的提示。

在 macOS 上运行以下脚本将为 `out` 目录中的 `node` 可执行文件和项目根目录中的符号链接 `node` 添加防火墙规则。

```bash
sudo ./tools/macos-firewall.sh
```

#### 安装 Node.js

要将此版本的 Node.js 安装到系统目录：

```bash
[sudo] make install
```

#### 运行测试

要验证构建：

```bash
make test-only
```

此时，您已准备好进行代码更改并重新运行测试。

如果您在提交拉取请求之前运行测试，请使用：

```bash
make -j4 test
```

`make -j4 test` 会对代码库进行全面检查，包括文档测试。

要运行 linter，请使用 `make lint`/`vcbuild lint`。它将对 JavaScript、C++ 和 Markdown 文件进行 lint。

要修复可自动修复的 JavaScript linting 错误，请使用 `make lint-js-fix`。

如果您正在更新测试并希望在单个测试文件中运行测试（例如 `test/parallel/test-stream2-transform.js`）：

```bash
tools/test.py test/parallel/test-stream2-transform.js
```

您可以通过提供子系统的名称来执行给定子系统的整个测试套件：

```bash
tools/test.py child-process
```

您还可以执行测试套件目录（例如 `test/message`）中的测试：

```bash
tools/test.py test/message
```

您可以使用通配符 `*` 来执行与特定命名模式匹配的测试。例如，要运行 `test/parallel` 下所有名称以 `test-stream-` 开头的测试：

```bash
tools/test.py test/parallel/test-stream-*
tools/test.py parallel/test-stream-*  # 可以省略 test/ 前缀
# 在某些 shell 环境中，您可能需要引用模式
tools/test.py "test/parallel/test-stream-*"
```

通配符 `*` 可用于路径的任何部分。例如，要运行名称以 `test-inspector-` 开头的所有测试，无论它们位于哪个目录：

```bash
# 匹配 test/sequential/test-inspector-*, test/parallel/test-inspector-*,
# test/known_issues/test-inspector-*, 等。
tools/test.py "test/*/test-inspector-*"
tools/test.py "*/test-inspector-*"  # 可以省略 test/ 前缀
```

如果您想检查其他选项，请参阅帮助，使用 `--help` 选项：

```bash
tools/test.py --help
```

> 注意：在 Windows 上，您应该使用 `python3` 可执行文件。
> 示例：`python3 tools/test.py test/message`

您通常可以直接使用 node 运行测试：

```bash
./node test/parallel/test-stream2-transform.js
```

> Info: `./node` 指向您的本地 Node.js 构建。

请记住，如果您更改了 `lib` 或 `src` 目录中的代码，请在运行测试之间使用 `make -j4` 重新编译。

测试会尝试检测对 IPv6 的支持，并在适当时排除 IPv6 测试。如果您的主接口具有 IPv6 地址，那么您的环回接口也必须启用 '::1'。对于 Ubuntu 上的一些默认安装，似乎并非如此。要在 Ubuntu 上为环回接口启用 '::1'：

```bash
sudo sysctl -w net.ipv6.conf.lo.disable_ipv6=0
```

如果您使用的 IDE 配置文件存在，可以使用
[node-code-ide-configs](https://github.com/nodejs/node-code-ide-configs)
来运行/调试测试。

#### 运行覆盖率

确保您添加或更改的任何代码都由测试覆盖是良好的实践。您可以通过运行启用覆盖率的测试套件来做到这一点：

```bash
./configure --coverage
make coverage
```

详细的覆盖率报告将写入 JavaScript 覆盖率的 `coverage/index.html` 和 C++ 覆盖率的 `coverage/cxxcoverage.html`。

如果您只想运行 JavaScript 测试，则无需运行第一个命令（`./configure --coverage`）。运行 `make coverage-run-js` 以独立于 C++ 测试套件执行 JavaScript 测试：

```bash
make coverage-run-js
```

如果您正在更新测试并希望为单个测试文件收集覆盖率（例如 `test/parallel/test-stream2-transform.js`）：

```bash
make coverage-clean
NODE_V8_COVERAGE=coverage/tmp tools/test.py test/parallel/test-stream2-transform.js
make coverage-report-js
```

您可以通过提供子系统的名称来收集给定子系统的整个测试套件的覆盖率：

```bash
make coverage-clean
NODE_V8_COVERAGE=coverage/tmp tools/test.py --mode=release child-process
make coverage-report-js
```

`make coverage` 命令会将一些工具下载到项目根目录。生成覆盖率报告后进行清理：

```bash
make coverage-clean
```

#### 构建文档

要构建文档：

这将首先构建 Node.js（如果需要），然后使用它来构建文档：

```bash
make doc
```

如果您已有 Node.js 构建，则只需构建文档：

```bash
NODE=/path/to/node make doc-only
```

要阅读 man 页：

```bash
man doc/node.1
```

如果您希望在浏览器中阅读完整文档，请运行以下命令。

```bash
make docserve
```

这将启动一个静态文件服务器，并提供一个 URL，您可以在其中本地浏览文档。

如果您乐于使用操作系统关联的默认浏览器程序查看文档，请运行以下命令。

```bash
make docopen
```

这将使用默认浏览器打开一个文件 URL，其中包含所有可浏览 HTML 文档的单页版本。

```bash
make docclean
```

这将清理先前构建的文档。

要测试 Node.js 是否已正确构建：

```bash
./node -e "console.log('Hello from Node.js ' + process.version)"
```

#### 构建调试版本

如果您遇到 JS 堆栈跟踪提供的信息不足的问题，或者怀疑错误发生在 JS 虚拟机之外，您可以尝试构建一个启用了调试的二进制文件：

```bash
./configure --debug
make -j4
```

使用 `./configure --debug` 的 `make` 会生成两个二进制文件：常规发行版在 `out/Release/node` 中，调试二进制文件在 `out/Debug/node` 中。运行 `make install` 时，实际上只安装发行版版本。

要将调试版本与所有正常依赖项一起使用，请覆盖安装目录中的发行版版本：

```bash
make install PREFIX=/opt/node-debug/
cp -a -f out/Debug/node /opt/node-debug/node
```

使用调试二进制文件时，崩溃时会生成核心转储。这些核心转储在提供相应的原始调试二进制文件和系统信息时对于调试很有用。

读取核心转储需要使用在捕获核心转储的同一平台上构建的 `gdb`（即，在 64 位系统上构建的 `node` 需要 64 位 `gdb`，在 Linux 上构建的 `node` 需要 Linux `gdb`），否则您会收到类似 `not in executable format: File format not recognized` 的错误。

从核心转储生成回溯的示例：

```bash
$ gdb /opt/node-debug/node core.node.8.1535359906
(gdb) backtrace
```

#### 构建 ASan 版本

[ASan](https://github.com/google/sanitizers) 可以帮助检测各种内存相关错误。ASan 构建目前仅在 Linux 上受支持。
如果您想在 Windows 或 macOS 上进行检查，或者想在 Linux 上使用一致的工具链，可以尝试 [Docker](https://www.docker.com/products/docker-desktop/)
（使用像 `gengjiawen/node-build:2020-02-14` 这样的镜像）。

`--debug` 不是必需的，并且会减慢构建和测试速度，但如果 ASan 遇到问题，它可以显示清晰的堆栈跟踪。

```bash
./configure --debug --enable-asan && make -j4
make test-only
```

#### 开发时加速频繁重建

##### ccache

提示：`ccache` 工具被广泛使用，通常可以正常工作。
如果您遇到任何困难，请考虑禁用 `mold` 作为故障排除步骤。

如果您计划频繁重建 Node.js，尤其是在使用多个分支的情况下，安装 `ccache` 可以大大缩短构建时间。设置方法如下：

在 GNU/Linux 上：

提示：`mold` 可以加速链接过程，该过程无法缓存，您可能需要安装最新版本，而不是 apt 版本。

```bash
sudo apt install ccache mold   # for Debian/Ubuntu, included in most Linux distros
export CC="ccache gcc"         # add to your .profile
export CXX="ccache g++"        # add to your .profile
export LDFLAGS="-fuse-ld=mold" # add to your .profile
```

参考资料：

1.  <https://ccache.dev/performance.html>
2.  <https://github.com/rui314/mold>

在 macOS 上：

```bash
brew install ccache            # see https://brew.sh
export CC="ccache cc"          # add to ~/.zshrc or other shell config file
export CXX="ccache c++"        # add to ~/.zshrc or other shell config file
```

##### 从磁盘加载 JS 文件而不是嵌入

当仅修改 `lib` 中的 JS 层时，可以在不修改可执行文件的情况下从外部加载它：

```bash
./configure --node-builtin-modules-path "$(pwd)"
```

生成的二进制文件将不包含任何 JS 文件，并将尝试从指定目录加载它们。Visual Studio Code 的 JS 调试器自 2020 年 11 月版本以来支持此配置，并允许设置断点。

#### 故障排除 Unix 和 macOS 构建

过时的构建有时会导致构建过程中出现 `file not found` 错误。
可以通过 `make distclean` 来解决此问题以及其他一些问题。
`distclean` 配方会积极删除构建产物。您需要重新构建（`make -j4`）。由于所有构建产物都已被删除，因此此重新构建可能比之前的构建花费更多时间。此外，`distclean` 会删除存储 `./configure` 结果的文件。如果您使用了非默认选项（例如 `--debug`）运行了 `./configure`，则需要在调用 `make -j4` 之前再次运行它。

如果在编译过程中收到 `nodejs g++ fatal error compilation terminated cc1plus` 错误，这很可能是内存问题，您应该提供更多 RAM 或创建交换空间来满足工具链要求，或者减少并行构建任务的数量（`-j<n>`）。

### Windows

#### 提示

如果遇到与 zlib.lib(zlib1.dll) 相关的符号重定义链接错误，即使您从未手动安装过它，您可能也需要禁用 vcpkg 集成，因为 vcpkg 现在是 CLion 和 Visual Studio 的一部分。

```powershell
# 查找您的 vcpkg
# 仔细检查 vcpkg 是否安装了相关文件
vcpkg owns zlib.lib
vcpkg owns zlib1.dll
vcpkg integrate remove
```

参考资料：

1.  <https://github.com/nodejs/node/issues/24448>
2.  <https://github.com/microsoft/vcpkg/issues/37518> / <https://github.com/microsoft/vcpkg/discussions/37546>
3.  [vcpkg](https://github.com/microsoft/vcpkg/)

#### Windows 先决条件

##### 选项 1：手动安装

*   按照 [在 Windows 上使用 Python][] 中的说明安装当前[Python 版本][Python downloads]。
*   从[Visual Studio 下载](https://visualstudio.microsoft.com/downloads/)中选择并下载 Visual Studio Community Edition 2026，或者下载
    [Visual Studio 2026 生成工具](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2026)，
    然后进行安装。
    生成工具版本具有所有版本中最低的磁盘空间要求。
    也可以选择 Professional 或 Enterprise 版本。
*   在安装 Visual Studio 期间，选择“使用 C++ 进行桌面开发”工作负载。
    从 Node.js 24.0.0 开始，需要在 Windows 上编译 ClangCL。
    要安装它，请选择以下两个可选组件：
    *   适用于 Windows 的 C++ Clang 编译器 (Microsoft.VisualStudio.Component.VC.Llvm.Clang)
    *   LLVM (clang-cl) 工具集的 MSBuild 支持 (Microsoft.VisualStudio.Component.VC.Llvm.ClangToolset)
*   作为 Visual Studio 2026 的替代方案，从
    [Evergreen bootstrappers](https://learn.microsoft.com/en-us/visualstudio/releases/2022/release-history#evergreen-bootstrappers)
    表中下载 Visual Studio 2022 当前通道版本 17.4，并按照上述相同的说明和可选组件选择进行安装。
*   某些测试所需的基本 Unix 工具，
    [Git for Windows](https://git-scm.com/download/win) 包含 Git Bash
    以及可以包含在全局 `PATH` 中的工具。
*   [NetWide Assembler](https://www.nasm.us/)，用于 OpenSSL 汇编器模块。
    如果未安装在默认位置，则需要将其手动添加到 `PATH`。使用 `openssl-no-asm` 选项构建不需要此项，针对 ARM64 Windows 的构建也不需要。

安装任何 Visual Studio 版本后，您可以使用 Visual Studio Installer 的“修改”/“单个组件”选项卡添加可选组件。

构建 MSI 安装程序包所需的可选组件：

*   .NET SDK 单个组件 (Microsoft.NetCore.Component.SDK)

为 Windows on ARM64 编译所需的可选组件：

*   适用于 ARM64/ARM64EC 的 MSVC 生成工具 (Microsoft.VisualStudio.Component.VC.Tools.ARM64)
*   适用于 ARM64 的 C++ ATL (Microsoft.VisualStudio.Component.VC.ATL.ARM64)

注意：目前我们仅支持使用 Visual Studio 提供的 Clang 进行编译。

使用 ClangCL 进行构建时，如果 `vcbuild.bat` 的输出显示组件未安装，即使 Visual Studio Installer 显示它们已安装，也请尝试先卸载组件，然后重新安装它们。

##### 选项 2：使用 WinGet 自动安装

[WinGet 配置文件](./.configurations) 可用于轻松安装 Node.js 开发所需的所有先决条件。这些文件将安装以下
[WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/) 包：

*   Git for Windows，并将 `git` 和 Unix 工具添加到 `PATH`
*   `Python 3.14`
*   `Visual Studio 2022`（生成工具、Community、Professional 或 Enterprise 版本）以及
    “使用 C++ 进行桌面开发”工作负载，Clang 和 ClangToolset 可选组件
*   `NetWide Assembler`

以下所需状态配置 (DSC) 文件可用：

| 版本      | DSC 配置                                                                                |
| --------- | ------------------------------------------------------------------------------------------------ |
| 生成工具  | [configuration.vsBuildTools.dsc.yaml](./.configurations/configuration.vsBuildTools.dsc.yaml)     |
| Community | [configuration.dsc.yaml](./.configurations/configuration.dsc.yaml)                               |
| Professional | [configuration.vsProfessional.dsc.yaml](./.configurations/configuration.vsProfessional.dsc.yaml) |
| Enterprise   | [configuration.vsEnterprise.dsc.yaml](./.configurations/configuration.vsEnterprise.dsc.yaml)     |

在 PowerShell 终端中使用 [winget configure](https://learn.microsoft.com/en-us/windows/package-manager/winget/configure#configure-subcommands)
和上述 DSC 文件之一来安装 Node.js 先决条件。
例如，使用 Visual Studio Community Edition 的 DSC 文件，执行以下命令行：

```powershell
winget configure .\.configurations\configuration.dsc.yaml
```

要为 MSI 或 ARM64 构建添加可选组件，请参阅 [选项 1：手动安装](#option-1-manual-install)。

#### 构建 Node.js

*   请记住，首先使用 Git 命令克隆 Node.js 存储库，然后进入 Git 创建的目录；如果您还没有这样做
    ```powershell
    git clone https://github.com/nodejs/node.git
    cd node
    ```

> \[!TIP]
> 如果您是从 Windows 计算机构建的，符号链接默认是禁用的，可以通过使用 `-c core.symlinks=true` 标志克隆来启用它们。
>
> ```powershell
> git clone -c core.symlinks=true <repository_url>
> ```

*   如果您的构建目录路径包含空格或非 ASCII 字符，
    构建可能会失败。

要开始构建过程：

```powershell
.\vcbuild
```

要运行测试：

```powershell
.\vcbuild test
```

要测试 Node.js 是否已正确构建：

```powershell
Release\node -e "console.log('Hello from Node.js', process.version)"
```

> \[!TIP]
> 在 Windows 上，创建符号链接需要启用 [开发者模式][] 或
> 以管理员身份运行命令。依赖于创建符号链接的测试可能会因 EPERM 错误而失败，如果不允许创建符号链接。

##### 使用 ccache：

遵循 <https://github.com/ccache/ccache/wiki/MS-Visual-Studio>，您应该会注意到 obj 文件会比正常的大。

首先，安装 ccache。假设 ccache 安装在 `c:\ccache`（您可以在其中找到 `ccache.exe`），请使用以下命令将 `c:\ccache\ccache.exe` 复制到 `c:\ccache\cl.exe`。

```powershell
cp c:\ccache\ccache.exe c:\ccache\cl.exe
```

使用较新版本的 Visual Studio 时，可能需要将副本命名为 `clang-cl.exe`。如果 `vcbuild.bat` 的输出提示缺少 `clang-cl.exe`，请按以下方式复制：

```powershell
cp c:\ccache\ccache.exe c:\ccache\clang-cl.exe
```

构建 Node.js 时，通过以下选项提供 ccache 的路径：

```powershell
.\vcbuild.bat ccache c:\ccache\
```

这样可以在来回切换分支时实现近乎即时的重建（如果这些分支已使用缓存构建）。

要将其与 ClangCL 一起使用，请运行以下命令：

```powershell
.\vcbuild.bat clang-cl ccache c:\ccache\
```

### Android

Android 不是受支持的平台。欢迎提供改进 Android 构建的补丁。当前的持续集成环境中没有在 Android 上进行测试。鼓励那些致力于改进 Android 构建、测试和支持的人员参与。

确保您已下载并解压缩了
[Android NDK](https://developer.android.com/ndk)
到某个文件夹中。然后运行：

```bash
./android-configure <Android NDK 路径> <Android SDK 版本> <目标架构>
make -j4
```

Android SDK 版本应至少为 24（Android 7.0），目标架构支持 \[arm, arm64/aarch64, x86, x86_64]。

## `Intl` (ECMA-402) 支持

[Intl](doc/api/intl.md) 支持默认启用。

### 使用完整的 ICU 支持构建（支持 ICU 的所有区域设置）

这是默认选项。

#### Unix/macOS

```bash
./configure --with-intl=full-icu
```

#### Windows

```powershell
.\vcbuild full-icu
```

### 精简版：`small-icu`（仅限英语）支持

在此配置中，仅包含英语数据，但支持完整的 `Intl` (ECMA-402) API。它不需要下载任何依赖项即可运行。您可以在运行时添加完整数据。

#### Unix/macOS

```bash
./configure --with-intl=small-icu
```

#### Windows

```powershell
.\vcbuild small-icu
```

### 不带 Intl 支持构建

`Intl` 对象将不可用，其他一些 API 如 `String.normalize` 也将不可用。

#### Unix/macOS

```bash
./configure --without-intl
```

#### Windows

```powershell
.\vcbuild without-intl
```

### 使用已安装的 ICU（仅限 Unix/macOS）

```bash
pkg-config --modversion icu-i18n && ./configure --with-intl=system-icu
```

如果您正在交叉编译，您的 `pkg-config` 必须能够提供一个适用于您的主机和目标环境的路径。

### 使用特定的 ICU 构建

您可以在 [ICU 主页](https://icu.unicode.org/download) 上找到其他 ICU 版本。
下载名为 `icu4c-**##.#**-src.tgz`（或 `.zip`）的文件。

要检查最低推荐的 ICU 版本，请运行 `./configure --help` 并查看 `--with-icu-source` 选项的帮助。如果在配置过程中 ICU 版本过旧，将打印警告。

#### Unix/macOS

从已解压的 ICU：

```bash
./configure --with-intl=[small-icu,full-icu] --with-icu-source=/path/to/icu
```

从本地 ICU 压缩包：

```bash
./configure --with-intl=[small-icu,full-icu] --with-icu-source=/path/to/icu.tgz
```

从压缩包 URL：

```bash
./configure --with-intl=full-icu --with-icu-source=http://url/to/icu.tgz
```

#### Windows

首先将最新的 ICU 解压到 `deps/icu`
[icu4c-**##.#**-src.tgz](https://icu.unicode.org/download)（或 `.zip`）
作为 `deps/icu`（您将拥有：`deps/icu/source/...`）

```powershell
.\vcbuild full-icu
```

### 配置 OpenSSL appname

Node.js 可以通过指定环境变量 `OPENSSL_CONF` 或使用命令行选项 `--openssl-conf` 来使用 OpenSSL 配置文件，如果两者都未指定，则默认读取默认的 OpenSSL 配置文件 `openssl.cnf`。Node.js 只会读取一个默认名为 `nodejs_conf` 的部分，但可以使用以下配置选项覆盖此名称：

```bash
./configure --openssl-conf-name=<some_conf_name>
```

## 使用符合 FIPS 标准的 OpenSSL 构建 Node.js

Node.js 支持通过 [OpenSSL 的 provider 模型](https://docs.openssl.org/3.0/man7/crypto/#OPENSSL-PROVIDERS) 与 OpenSSL 3 进行静态或动态链接时的 FIPS 支持。
无需重新构建 Node.js 即可启用 FIPS 支持。

有关如何在 Node.js 中启用 FIPS 支持的更多信息，请参阅 [FIPS 模式](doc/api/crypto.md#fips-mode)。

## 构建支持 Temporal 的 Node.js

当与 [temporal\_rs](https://github.com/boa-dev/temporal) 的某个版本进行静态或动态链接时，Node.js 支持 [Temporal](https://github.com/tc39/proposal-temporal) API。

要构建支持 Temporal 的 Node.js，需要 Rust 工具链：

* rustc >= 1.82（带 LLVM >= 19）
* cargo >= 1.82

## 构建包含外部核心模块的 Node.js

在构建 Node.js 时，可以指定一个或多个 JavaScript 文本文件，将它们作为内置模块打包到二进制文件中。

### Unix/macOS

此命令将使 `/root/myModule.js` 可通过 `require('/root/myModule')` 访问，并将 `./myModule2.js` 可通过 `require('myModule2')` 访问。

```bash
./configure --link-module '/root/myModule.js' --link-module './myModule2.js'
```

### Windows

要使 `./myModule.js` 可通过 `require('myModule')` 访问，并将 `./myModule2.js` 可通过 `require('myModule2')` 访问：

```powershell
.\vcbuild link-module './myModule.js' link-module './myModule2.js'
```

## 构建以在运行时使用共享依赖项

默认情况下，Node.js 的构建方式是将所有依赖项都打包到 Node.js 二进制文件中。这提供了一个包含其依赖项的正确版本的所有依赖项的单一二进制文件。

然而，一些 Node.js 发行版更倾向于管理依赖项。
提供了许多 `configure` 选项来支持此用例。

* 对于包含原生代码的依赖项，第一组选项允许 Node.js 构建，以便它在运行时使用共享库，而不是将依赖项构建并包含在 Node.js 二进制文件中。这些选项位于 `configure` 帮助的 `Shared libraries` 部分（运行 `./configure --help` 获取完整列表）。它们提供了启用共享库使用、设置共享库名称以及设置包含包含文件和共享库文件的路径的能力。

* 对于包含 JavaScript 代码（包括 WASM）的依赖项，第二组选项允许 Node.js 二进制文件构建，以便它在运行时加载依赖项的 JavaScript，而不是将其构建到 Node.js 二进制文件中。这些选项位于 `configure` 帮助的 `Shared builtins` 部分（运行 `./configure --help` 获取完整列表）。它们提供了设置用于运行时依赖项的外部 JavaScript 文件的路径的能力。

任何使用这些选项进行分发的发行版都有责任：

* 确保运行时可用的共享依赖项与 Node.js 二进制文件期望的匹配。不匹配可能导致崩溃或意外行为。
* 完全测试 Node.js 在使用外部依赖项时是否按预期运行。Node.js 项目 CI 中对这些非默认选项的测试覆盖可能很少或没有。

## 对 Node.js 下游分发者的注意事项

Node.js 生态系统依赖于主版本内的 ABI 兼容性。
为了保持 ABI 兼容性，要求分发的 Node.js 构建必须针对与 Node.js 为给定 `NODE_MODULE_VERSION`（位于 `src/node_version.h`）发布的依赖项相同或相似（不破坏其 ABI 兼容性）的版本进行构建。

当 Node.js 构建（意图分发）时，其 ABI 与官方 Node.js 构建不兼容（例如，使用 ABI 不兼容的依赖项版本），请通过在注册表 <https://github.com/nodejs/node/blob/HEAD/doc/abi_version_registry.json> 上打开拉取请求来保留并使用自定义 `NODE_MODULE_VERSION`。

[AIX toolbox]: https://www.ibm.com/support/pages/aix-toolbox-open-source-software-overview
[Developer Mode]: https://learn.microsoft.com/en-us/windows/advanced-settings/developer-mode
[Python downloads]: https://www.python.org/downloads/
[Python versions]: https://devguide.python.org/versions/
[Using Python on Windows]: https://docs.python.org/3/using/windows.html
