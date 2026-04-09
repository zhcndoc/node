# Undici 模块 vs. Node.js 内置 Fetch

自 Node.js v18 起，Node.js 已内置由 undici 驱动的 `fetch()` 实现。本指南解释了 `undici` npm 包与内置 `fetch` 之间的关系，以及何时应安装其中一个而非依赖另一个。

## 背景

Node.js v18+ 中的 `fetch()`、`Request`、`Response`、`Headers` 和 `FormData` 全局变量由 undici 的一个版本提供，该版本已打包到 Node.js 本身中。您可以检查捆绑的版本：

```js
console.log(process.versions.undici); // 例如 "7.5.0"
```

当您从 npm 安装 undici 时，您将获得完整的库及其所有附加 API，并且可能获得比您的 Node.js 版本捆绑的更新版本。

## 保持来自同一实现的 `fetch` 和 `FormData`

当发送 `FormData` 主体时，请确保 `fetch` 和 `FormData` 来自同一实现。

使用以下模式之一：

### 内置全局变量

```js
const body = new FormData()
body.set('name', 'some')
body.set('someOtherProperty', '8000')

await fetch('https://example.com', {
  method: 'POST',
  body
})
```

### `undici` 模块导入

```js
import { fetch, FormData } from 'undici'

const body = new FormData()
body.set('name', 'some')
body.set('someOtherProperty', '8000')

await fetch('https://example.com', {
  method: 'POST',
  body
})
```

### `undici.install()` 全局变量

如果您希望安装的 `undici` 包提供全局变量，请调用 [`install()`](/docs/api/GlobalInstallation.md)：

```js
import { install } from 'undici'

install()

const body = new FormData()
body.set('name', 'some')
body.set('someOtherProperty', '8000')

await fetch('https://example.com', {
  method: 'POST',
  body
})
```

`install()` 会用 undici 版本的实现替换全局 `fetch`、`Headers`、`Response`、`Request` 和 `FormData`，还会安装 undici 的 `WebSocket`、`CloseEvent`、`ErrorEvent`、`MessageEvent` 和 `EventSource` 全局变量。

避免在同一请求中混合使用不同的实现，例如：

```js
import { fetch } from 'undici'

const body = new FormData()

await fetch('https://example.com', {
  method: 'POST',
  body
})
```

```js
import { FormData } from 'undici'

const body = new FormData()

await fetch('https://example.com', {
  method: 'POST',
  body
})
```

这些组合在不同 Node.js 和 undici 版本中可能会有不同的行为。使用匹配的对可以确保多部分处理是可预测的。

## 您不需要安装 undici 的情况

如果满足以下所有条件，您可以依赖内置全局变量并跳过将 undici 添加到依赖项：

- 您只需要标准的 Fetch API（`fetch`、`Request`、`Response`、`Headers`、`FormData`）。
- 您正在运行 Node.js v18 或更高版本。
- 您不依赖于在 Node.js 发行版捆绑的 undici 版本之后引入的功能或错误修复。
- 您希望零额外的运行时依赖项。
- 您希望与使用相同 Fetch API 表面的浏览器和其他运行时（Deno、Bun、Cloudflare Workers 等）跨平台互操作。

这在执行简单 HTTP 请求的应用程序或针对多个 JavaScript 运行时的库中很常见。

## 您应该安装 undici 的情况

当您需要标准 Fetch API 之外的功能时，请从 npm 安装 undici：

### 高级 HTTP API

undici 公开了 `request`、`stream`、`pipeline` 和 `connect` 方法，这些方法提供了比 `fetch` 更低的级别控制和显著更好的性能：

```js
import { request } from 'undici';

const { statusCode, headers, body } = await request('https://example.com');
const data = await body.json();
```

### 连接池和调度程序

`Client`、`Pool`、`BalancedPool`、`Agent` 及其配置选项可让您管理连接生命周期、keep-alive 行为、流水线深度和并发限制：

```js
import { Pool } from 'undici';

const pool = new Pool('https://example.com', { connections: 10 });
const { body } = await pool.request({ path: '/', method: 'GET' });
```

### 代理支持

`ProxyAgent` 和 `EnvHttpProxyAgent` 处理 HTTP(S) 代理。请注意，Node.js v22.21.0+ 和 v24.0.0+ 通过 `--use-env-proxy` 标志（或 `NODE_USE_ENV_PROXY=1`）为内置 `fetch` 支持基于环境变量的代理配置。但是，undici 的 `ProxyAgent` 仍然通过调度程序 API 提供编程控制：

```js
import { ProxyAgent, fetch } from 'undici';

const proxyAgent = new ProxyAgent('https://my-proxy.example.com:8080');
const response = await fetch('https://example.com', { dispatcher: proxyAgent });
```

### 测试和模拟

`MockAgent`、`MockClient` 和 `MockPool` 允许您拦截和模拟 HTTP 请求，而无需修补全局变量或依赖外部库：

```js
import { MockAgent, setGlobalDispatcher, fetch } from 'undici';

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);

const pool = mockAgent.get('https://example.com');
pool.intercept({ path: '/api' }).reply(200, { message: 'mocked' });
```

### 拦截器和中间件

自定义调度程序和拦截器（重试、重定向、缓存、DNS）为您提供了对请求如何处理进行细粒度控制。

### 比 Node.js 捆绑更新的版本

npm 包通常包含尚未进入 Node.js 发行版的功能、性能改进和错误修复。如果您需要特定的修复或功能，可以直接安装更新的版本。

## 版本兼容性

| Node.js 版本 | 捆绑的 undici 版本 | 备注 |
|---|---|---|
| v18.x | ~5.x | `fetch` 是实验性的（在早期 v18 中位于 `--experimental-fetch` 之后） |
| v20.x | ~6.x | `fetch` 是稳定的 |
| v22.x | ~6.x / ~7.x | `fetch` 是稳定的 |
| v24.x | ~7.x | `fetch` 是稳定的；通过 `--use-env-proxy` 支持环境代理 |

您始终可以通过 `process.versions.undici` 在运行时检查确切的捆绑版本。

从 npm 安装 undici 不会替换内置全局变量。如果您希望您的安装版本替换全局 `fetch` 和相关类，请使用 [`install()`](/docs/api/GlobalInstallation.md)。否则，直接从 `'undici'` 导入 `fetch`：

```js
import { fetch } from 'undici' // 使用您安装的版本，而不是内置版本
```

## 进一步阅读

- [API 参考：Fetch](/docs/api/Fetch.md)
- [API 参考：Client](/docs/api/Client.md)
- [API 参考：Pool](/docs/api/Pool.md)
- [API 参考：ProxyAgent](/docs/api/ProxyAgent.md)
- [API 参考：MockAgent](/docs/api/MockAgent.md)
- [API 参考：全局安装](/docs/api/GlobalInstallation.md)
