# 用法和示例

<!--introduced_in=v0.10.0-->

<!--type=misc-->

## 用法

`node [options] [V8 options] [script.js | -e "script" | - ] [arguments]`

请参阅 [命令行选项][] 文档以获取更多信息。

## 示例

一个使用 Node.js 编写的[Web 服务器][]示例，它响应
`'Hello, World!'`：

首先，确保已下载并安装 Node.js。有关进一步的安装信息，请参阅
[安装 Node.js][]。

现在，创建一个名为 `projects` 的空项目文件夹，然后进入该文件夹。

Linux 和 Mac：

```bash
mkdir ~/projects
cd ~/projects
```

Windows CMD：

```powershell
mkdir %USERPROFILE%\projects
cd %USERPROFILE%\projects
```

Windows PowerShell：

```powershell
mkdir $env:USERPROFILE\projects
cd $env:USERPROFILE\projects
```

接下来，在 `projects` 文件夹中创建一个新源文件，并将其命名为 `hello-world.js`。

在任何首选文本编辑器中打开 `hello-world.js` 并粘贴以下内容：

```js
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

保存文件。然后，在终端窗口中，要运行 `hello-world.js` 文件，请输入：

```bash
node hello-world.js
```

终端中应出现如下输出：

```console
Server running at http://127.0.0.1:3000/
```

现在，打开任何首选 Web 浏览器并访问 `http://127.0.0.1:3000`。

如果浏览器显示字符串 `Hello, World!`，则表示
服务器正常运行。

[命令行选项]: cli.md#options
[安装 Node.js]: https://nodejs.org/en/download
[Web 服务器]: http.md。
