# 使用 Dev Containers 开发 Node.js

Node.js 在 [DockerHub](https://hub.docker.com/r/nodejs/devcontainer) 上为
[Dev Containers](https://containers.dev/) 发布了一个[夜间镜像]，可用于启动一个
预装构建依赖项并预生成构建缓存的开发容器。

当你需要测试主分支的一些更改，并且**不需要**更改 V8 头文件（这种情况很少见）时，使用夜间镜像可以让你从干净的安装快速编译你的更改，而无需从头开始编译整个代码库，特别是 V8。

Dev Container 还允许你在不同的操作系统中测试你的更改，并可以安全地使用你正在进行中的 Node.js 分支来测试错误报告中的第三方代码，且这些代码与你的工作处于隔离环境。

有许多命令行工具、IDE 和服务[支持 Dev Containers](https://containers.dev/supporting)。
其中，[Visual Studio Code (VS Code)](https://code.visualstudio.com/) 是一个非常流行的选项。
本指南将引导你完成使用 VS Code 设置 Node.js 开发 Dev Container 的步骤。
你应该能够在使用通用类似步骤的其他工具和服务中使用相同的 [`nodejs/devcontainer:nightly` 镜像](https://hub.docker.com/r/nodejs/devcontainer)。

## 先决条件

在开始之前，请确保你的机器上安装了以下内容：

* [Docker](https://www.docker.com/get-started)
* [Visual Studio Code](https://code.visualstudio.com/)
* [VS Code 的 Dev Containers 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)。

## 设置 Dev Container

### 1. 克隆 Node.js 仓库

如果你还没有克隆 Node.js 仓库，请将其克隆到本地机器。

```bash
git clone https://github.com/nodejs/node.git
```

或者，如果你正在设置 git 仓库以作为拉取请求提交更改，请参考[此指南](./pull-requests.md#setting-up-your-local-environment)。

### 2. 在 VS Code 中打开仓库

启动 VS Code 并打开克隆的 Node.js 仓库。

### 3. 启动 Dev Container

* 按下 `Ctrl+Shift+P` 或 `Cmd+Shift+P` 打开命令面板。
* 输入 `Dev Containers: Reopen in Container` 并选择它。
* 从下拉菜单中选择适当的 Dev Container 配置。此仓库中的基础配置为 `Node.js Dev Container`，位于
  [`.devcontainer/base/devcontainer.json`](../../.devcontainer/base/devcontainer.json)，VS Code 应会自动检测到它。

### 4. 等待容器构建完成

VS Code 会根据配置文件构建 Dev Container。这可能需要一些时间，具体取决于你的网络连接和系统性能。

Dev Container 构建完成后，它将自动启动。默认情况下，它将运行 `git restore-mtime` 以还原工作目录中文件的修改时间，
以保持构建缓存有效，你将在终端中看到类似以下内容：

```text
Running the postCreateCommand from devcontainer.json...

[10136 ms] Start: Run in container: /bin/sh -c git restore-mtime
```

这可能需要几秒钟。请等待其完成后再打开新终端。

### 5. 构建你的更改

Dev Container 启动后，你可以在 VS Code 中打开终端并运行构建命令。默认情况下，
你的本地仓库已挂载到容器内的一个检出目录中，因此你所做的任何更改都会反映在容器环境中。

在 Dev Container 中，必要的依赖项已经安装，Node.js 已经编译完成，因此将存在可用的缓存。
为了获得更好的开发者体验，Dev Container 中使用的构建工具是 `ninja`，而不是 `make`。
有关使用 `ninja` 构建 Node.js 的更多详细信息，请参阅[使用 Ninja 构建 Node.js](./building-node-with-ninja.md)。

```bash
./configure --ninja
ninja -C out/Release
```

只要你的本地检出与夜间镜像中的主分支没有太大差异，构建过程应该是增量的并且速度较快。

### 6. 离开容器

当你完成在 Dev Container 中的工作时，再次打开命令面板并选择
`Dev Containers: Reopen Folder locally` 以返回到你的本地开发环境。

## 自定义 Dev Container

默认配置位于
[`.devcontainer/base/devcontainer.json`](../../.devcontainer/base/devcontainer.json)，它与官方的
[Node.js 夜间 Dev Container 镜像](https://github.com/nodejs/devcontainer)配对。
此配置受版本控制。你可以创建一个个人配置，方法是：在 `.devcontainer/` 目录中创建一个新目录，
并在该目录中添加一个 `devcontainer.json` 文件（例如，`.devcontainer/local/devcontainer.json`），
然后配置 VS Code 使用它。

## 重建 Dev Container

Docker 会缓存已下载的 Dev Container 镜像。如果你想拉取一个新的夜间镜像，
可以在主机终端中运行以下命令：

```bash
docker pull nodejs/devcontainer:nightly
```

默认配置会创建一个卷，以在 Dev Container 重启之间缓存构建输出。如果你想清除构建缓存，
可以通过删除名为 `node-devcontainer-cache` 的卷来实现：

```bash
docker volume rm node-devcontainer-cache
```

要在 VS Code 中重建 Dev Container，请打开命令面板并选择
`Dev Containers: Rebuild and Reopen in Container`。

## 进一步阅读

* 如果你想提议更改官方 Node.js 夜间 Dev Container 镜像，欢迎在
  [nodejs/devcontainer](https://github.com/nodejs/devcontainer) 提交反馈。
  在那里，你可以找到 Dockerfile 和自动化夜间工作流程。
* [Visual Studio Code Dev Containers 文档](https://code.visualstudio.com/docs/remote/containers)
* [GitHub 对 Dev Containers 的介绍](https://docs.github.com/en/codespaces/setting-up你的项目用于 codespaces/添加 dev container 配置/介绍到 dev containers)
* [Dev Containers 规范](https://containers.dev/implementors/spec/)
