# Fetch

Undici 暴露了一个 `fetch()` 方法，用于从网络获取资源。

相关文档和示例可在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 上查阅。

## FormData

该 API 按照标准实现，相关文档可在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData) 上查阅。

如果向 FormData 构造函数传递了除 `undefined` 以外的任何参数，将抛出错误。其他参数将被忽略。

当您将 `FormData` 用作请求体时，请确保 `fetch` 和 `FormData` 来自同一实现。使用内置的全局 `FormData` 配合内置的全局 `fetch()`，或使用 `undici` 的 `FormData` 配合 `undici.fetch()`。

如果您希望已安装的 `undici` 包提供全局对象，请调用 [`install()`](/docs/api/GlobalInstallation.md)，这样 `fetch`、`Headers`、`Response`、`Request` 和 `FormData` 将作为一个匹配的集合一起安装。

## Response

该 API 按照标准实现，相关文档可在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response) 上查阅。

## Request

该 API 按照标准实现，相关文档可在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Request) 上查阅。

## Headers

该 API 按照标准实现，相关文档可在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Headers) 上查阅。

# Body Mixins

`Response` 和 `Request` 的 body 继承了 body mixin 方法。这些方法包括：

- [`.arrayBuffer()`](https://fetch.spec.whatwg.org/#dom-body-arraybuffer)
- [`.blob()`](https://fetch.spec.whatwg.org/#dom-body-blob)
- [`.bytes()`](https://fetch.spec.whatwg.org/#dom-body-bytes)
- [`.formData()`](https://fetch.spec.whatwg.org/#dom-body-formdata)
- [`.json()`](https://fetch.spec.whatwg.org/#dom-body-json)
- [`.text()`](https://fetch.spec.whatwg.org/#dom-body-text)

关于 `.formData()` 在服务器环境中的实用性和性能，目前存在持续讨论。建议为解析 `multipart/form-data` 类型的 body 使用专门的库，例如 [Busboy](https://www.npmjs.com/package/busboy) 或 [@fastify/busboy](https://www.npmjs.com/package/@fastify/busboy)。

以下示例代码展示了如何将这些库与 fetch 集成：

```mjs
import { Busboy } from '@fastify/busboy'
import { Readable } from 'node:stream'

const response = await fetch('...')
const busboy = new Busboy({
  headers: {
    'content-type': response.headers.get('content-type')
  }
})

Readable.fromWeb(response.body).pipe(busboy)
```
