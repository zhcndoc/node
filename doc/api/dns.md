# DNS

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/dns.js -->

`node:dns` 模块启用名称解析。例如，使用它来查找主机名的 IP 地址。

虽然以 [域名系统 (DNS)][] 命名，但它并不总是使用 DNS 协议进行查找。[`dns.lookup()`][] 使用操作系统设施来执行名称解析。它可能不需要执行任何网络通信。要像同一系统上的其他应用程序那样执行名称解析，请使用 [`dns.lookup()`][]。

```mjs
import dns from 'node:dns';

dns.lookup('example.org', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
// 地址："2606:2800:21f:cb07:6820:80da:af6b:8b2c" 家族：IPv6
```

```cjs
const dns = require('node:dns');

dns.lookup('example.org', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
// 地址："2606:2800:21f:cb07:6820:80da:af6b:8b2c" 家族：IPv6
```

`node:dns` 模块中的所有其他功能连接到实际的 DNS 服务器以执行名称解析。它们将始终使用网络来执行 DNS 查询。这些功能不使用 [`dns.lookup()`][] 使用的同一组配置文件（例如 `/etc/hosts`）。使用这些功能始终执行 DNS 查询，绕过其他名称解析设施。

```mjs
import dns from 'node:dns';

dns.resolve4('archive.org', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});
```

```cjs
const dns = require('node:dns');

dns.resolve4('archive.org', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});
```

有关更多信息，请参阅 [实现注意事项部分][]。

## 类：`dns.Resolver`

<!-- YAML
added: v8.3.0
-->

DNS 请求的独立解析器。

创建新解析器使用默认服务器设置。使用 [`resolver.setServers()`][`dns.setServers()`] 设置解析器使用的服务器不会影响其他解析器：

```mjs
import { Resolver } from 'node:dns';
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// 此请求将使用 4.4.4.4 的服务器，独立于全局设置。
resolver.resolve4('example.org', (err, addresses) => {
  // ...
});
```

```cjs
const { Resolver } = require('node:dns');
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// 此请求将使用 4.4.4.4 的服务器，独立于全局设置。
resolver.resolve4('example.org', (err, addresses) => {
  // ...
});
```

`node:dns` 模块中的以下方法可用：

* [`resolver.getServers()`][`dns.getServers()`]
* [`resolver.resolve()`][`dns.resolve()`]
* [`resolver.resolve4()`][`dns.resolve4()`]
* [`resolver.resolve6()`][`dns.resolve6()`]
* [`resolver.resolveAny()`][`dns.resolveAny()`]
* [`resolver.resolveCaa()`][`dns.resolveCaa()`]
* [`resolver.resolveCname()`][`dns.resolveCname()`]
* [`resolver.resolveMx()`][`dns.resolveMx()`]
* [`resolver.resolveNaptr()`][`dns.resolveNaptr()`]
* [`resolver.resolveNs()`][`dns.resolveNs()`]
* [`resolver.resolvePtr()`][`dns.resolvePtr()`]
* [`resolver.resolveSoa()`][`dns.resolveSoa()`]
* [`resolver.resolveSrv()`][`dns.resolveSrv()`]
* [`resolver.resolveTlsa()`][`dns.resolveTlsa()`]
* [`resolver.resolveTxt()`][`dns.resolveTxt()`]
* [`resolver.reverse()`][`dns.reverse()`]
* [`resolver.setServers()`][`dns.setServers()`]

### `Resolver([options])`

<!-- YAML
added: v8.3.0
changes:
  - version:
      - v16.7.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/39610
    description: "`options` 对象现在接受 `tries` 选项。"
  - version: v12.18.3
    pr-url: https://github.com/nodejs/node/pull/33472
    description: "构造函数现在接受 `options` 对象。唯一支持的选项是 `timeout`。"
-->

创建一个新的解析器。

* `options` {Object}
  * `timeout` {integer} 查询超时时间（毫秒），或 `-1` 使用默认超时。
  * `tries` {integer} 解析器在放弃之前尝试联系每个名称服务器的次数。**默认值：** `4`
  * `maxTimeout` {integer} 最大重试超时时间（毫秒）。**默认值：** `0`，禁用。

### `resolver.cancel()`

<!-- YAML
added: v8.3.0
-->

取消此解析器发出的所有未完成的 DNS 查询。相应的回调将被调用，并带有代码为 `ECANCELLED` 的错误。

### `resolver.setLocalAddress([ipv4][, ipv6])`

<!-- YAML
added:
  - v15.1.0
  - v14.17.0
-->

* `ipv4` {string} IPv4 地址的字符串表示。**默认值：** `'0.0.0.0'`
* `ipv6` {string} IPv6 地址的字符串表示。**默认值：** `'::0'`

解析器实例将从指定的 IP 地址发送其请求。这允许程序在多宿主系统上使用时指定出站接口。

如果未指定 v4 或 v6 地址，则将其设置为默认值，操作系统将自动选择一个本地地址。

解析器在向 IPv4 DNS 服务器发出请求时将使用 v4 本地地址，在向 IPv6 DNS 服务器发出请求时将使用 v6 本地地址。解析请求的 `rrtype` 对使用的本地地址没有影响。

## `dns.getServers()`

<!-- YAML
added: v0.11.3
-->

* 返回：{string\[]}

返回当前配置用于 DNS 解析的 IP 地址字符串数组，格式符合 [RFC 5952][]。如果使用自定义端口，字符串将包含端口部分。

```json
[
  "8.8.8.8",
  "2001:4860:4860::8888",
  "8.8.8.8:1053",
  "[2001:4860:4860::8888]:1053",
]
```

## `dns.lookup(hostname[, options], callback)`

<!-- YAML
added: v0.1.90
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52492
    description: "`verbatim` 选项现已弃用，建议改用新的 `order` 选项。"
  - version: v18.4.0
    pr-url: https://github.com/nodejs/node/pull/43054
    description: "为了与 `node:net` 兼容，传入选项对象时，`family` 选项可以是字符串 `'IPv4'` 或字符串 `'IPv6'`。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传入无效回调函数时，现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/39987
    description: "`verbatim` 选项现在默认为 `true`。"
  - version: v8.5.0
    pr-url: https://github.com/nodejs/node/pull/14731
    description: "现已支持 `verbatim` 选项。"
  - version: v1.2.0
    pr-url: https://github.com/nodejs/node/pull/744
    description: "现已支持 `all` 选项。"
-->

* `hostname` {string}
* `options` {integer | Object}
  * `family` {integer|string} 记录家族。必须是 `4`、`6` 或 `0`。出于向后兼容原因，`'IPv4'` 和 `'IPv6'` 分别被解释为 `4` 和 `6`。值 `0` 表示返回 IPv4 或 IPv6 地址。如果将值 `0` 与 `{ all: true }` 一起使用（见下文），则会根据系统的 DNS 解析器返回 IPv4 和 IPv6 地址中的一个或两个。
  * `hints` {number} 一个或多个 [受支持的 `getaddrinfo` 标志][]。可以通过按位 `OR` 组合它们的值来传递多个标志。
  * `all` {boolean} 当为 `true` 时，回调将以数组形式返回所有解析出的地址。否则，返回单个地址。**默认值：** `false`。
  * `order` {string} 当为 `verbatim` 时，返回的解析地址不排序。当为 `ipv4first` 时，返回的解析地址会将 IPv4 地址排在 IPv6 地址之前。当为 `ipv6first` 时，返回的解析地址会将 IPv6 地址排在 IPv4 地址之前。**默认值：** `verbatim`（地址不会重新排序）。默认值可通过 [`dns.setDefaultResultOrder()`][] 或 [`--dns-result-order`][] 配置。
  * `verbatim` {boolean} 当为 `true` 时，回调按 DNS 解析器返回的顺序接收 IPv4 和 IPv6 地址。当为 `false` 时，IPv4 地址排在 IPv6 地址之前。
    此选项将弃用，改用 `order`。当两者都指定时，`order` 优先。新代码应仅使用 `order`。
    **默认值：** `true`（地址不会重新排序）。默认值可通过 [`dns.setDefaultResultOrder()`][] 或 [`--dns-result-order`][] 配置。
* `callback` {Function}
  * `err` {Error}
  * `address` {string} IPv4 或 IPv6 地址的字符串表示。当 `options.all` 为 `true` 时不提供。
  * `family` {integer} `4` 或 `6`，表示 `address` 的家族；如果该地址不是 IPv4 或 IPv6 地址，则为 `0`。`0` 很可能表示操作系统使用的名称解析服务存在 bug。当 `options.all` 为 `true` 时不提供。
  * `addresses` {Object\[]} 当 `options.all` 为 `true` 时，地址对象数组。每个对象具有以下属性：
    * `address` {string} IPv4 或 IPv6 地址的字符串表示。
    * `family` {integer} `4` 或 `6`，表示 `address` 的家族。

将主机名（例如 `'nodejs.org'`) 解析为找到的第一个 A (IPv4) 或 AAAA (IPv6) 记录。所有 `option` 属性都是可选的。如果 `options` 是整数，则它必须是 `4` 或 `6` – 如果未提供 `options`，则如果找到，返回 IPv4 或 IPv6 地址，或两者。

当 `all` 选项设置为 `true` 时，`callback` 的参数变为 `(err, addresses)`，其中 `addresses` 是具有 `address` 和 `family` 属性的对象数组。

出错时，`err` 是一个 [`Error`][] 对象，其中 `err.code` 是错误代码。请记住，`err.code` 不仅在主机名不存在时设置为 `'ENOTFOUND'`，而且在查找以其他方式失败时（例如没有可用的文件描述符）也会设置为 `'ENOTFOUND'`。

`dns.lookup()` 不一定与 DNS 协议有任何关系。实现使用操作系统设施，可以将名称与地址关联，反之亦然。此实现可能对任何 Node.js 程序的行为产生微妙但重要的后果。在使用 `dns.lookup()` 之前，请花些时间查阅 [实现注意事项部分][]。

示例用法：

```mjs
import dns from 'node:dns';
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.org', options, (err, address, family) =>
  console.log('address: %j family: IPv%s', address, family));
// 地址："2606:2800:21f:cb07:6820:80da:af6b:8b2c" 家族：IPv6

// 当 options.all 为 true 时，结果将是一个数组。
options.all = true;
dns.lookup('example.org', options, (err, addresses) =>
  console.log('addresses: %j', addresses));
// 地址：[{"address":"2606:2800:21f:cb07:6820:80da:af6b:8b2c","family":6}]
```

```cjs
const dns = require('node:dns');
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.org', options, (err, address, family) =>
  console.log('address: %j family: IPv%s', address, family));
// 地址："2606:2800:21f:cb07:6820:80da:af6b:8b2c" 家族：IPv6

// 当 options.all 为 true 时，结果将是一个数组。
options.all = true;
dns.lookup('example.org', options, (err, addresses) =>
  console.log('addresses: %j', addresses));
// 地址：[{"address":"2606:2800:21f:cb07:6820:80da:af6b:8b2c","family":6}]
```

如果此方法作为其 [`util.promisify()`][] 版本调用，且 `all` 未设置为 `true`，则它返回一个 `Promise`，对应一个具有 `address` 和 `family` 属性的 `Object`。

### 支持的 getaddrinfo 标志

<!-- YAML
changes:
  - version:
     - v13.13.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32183
    description: "新增对 `dns.ALL` 标志的支持。"
-->

以下标志可以作为提示传递给 [`dns.lookup()`][]。

* `dns.ADDRCONFIG`：将返回的地址类型限制为系统上配置的非环回地址类型。例如，仅当当前系统配置了至少一个 IPv4 地址时，才返回 IPv4 地址。
* `dns.V4MAPPED`：如果指定了 IPv6 家族，但未找到 IPv6 地址，则返回 IPv4 映射的 IPv6 地址。某些操作系统不支持（例如 FreeBSD 10.1）。
* `dns.ALL`：如果指定了 `dns.V4MAPPED`，则返回解析的 IPv6 地址以及 IPv4 映射的 IPv6 地址。

## `dns.lookupService(address, port, callback)`

<!-- YAML
added: v0.11.14
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `address` {string}
* `port` {number}
* `callback` {Function}
  * `err` {Error}
  * `hostname` {string} 例如 `example.com`
  * `service` {string} 例如 `http`

使用操作系统底层的 `getnameinfo` 实现将给定的 `address` 和 `port` 解析为主机名和服务。

如果 `address` 不是有效的 IP 地址，将抛出 `TypeError`。
`port` 将被强制转换为数字。如果它不是合法的端口，将抛出 `TypeError`。

出错时，`err` 是一个 [`Error`][] 对象，其中 `err.code` 是错误代码。

```mjs
import dns from 'node:dns';
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
  console.log(hostname, service);
  // 打印：localhost ssh
});
```

```cjs
const dns = require('node:dns');
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
  console.log(hostname, service);
  // 打印：localhost ssh
});
```

如果此方法以其 [`util.promisify()`][] 版本被调用，它返回一个 `Promise`，用于一个具有 `hostname` 和 `service` 属性的 `Object`。

## `dns.resolve(hostname[, rrtype], callback)`

<!-- YAML
added: v0.1.27
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string} 要解析的主机名。
* `rrtype` {string} 资源记录类型。**默认：** `'A'`。
* `callback` {Function}
  * `err` {Error}
  * `records` {string\[] | Object\[] | Object}

使用 DNS 协议将主机名（例如 `'nodejs.org'）解析为资源记录数组。`callback` 函数具有参数 `(err, records)`。成功时，`records` 将是一个资源记录数组。单个结果的类型和结构因 `rrtype` 而异：

| `rrtype`  | `records` 包含             | 结果类型 | 简写方法         |
| --------- | ------------------------------ | ----------- | ------------------------ |
| `'A'`     | IPv4 地址（默认）       | {string}    | [`dns.resolve4()`][]     |
| `'AAAA'`  | IPv6 地址                 | {string}    | [`dns.resolve6()`][]     |
| `'ANY'`   | 任何记录                    | {Object}    | [`dns.resolveAny()`][]   |
| `'CAA'`   | CA 授权记录       | {Object}    | [`dns.resolveCaa()`][]   |
| `'CNAME'` | 规范名称记录         | {string}    | [`dns.resolveCname()`][] |
| `'MX'`    | 邮件交换记录          | {Object}    | [`dns.resolveMx()`][]    |
| `'NAPTR'` | 名称授权指针记录 | {Object}    | [`dns.resolveNaptr()`][] |
| `'NS'`    | 名称服务器记录            | {string}    | [`dns.resolveNs()`][]    |
| `'PTR'`   | 指针记录                | {string}    | [`dns.resolvePtr()`][]   |
| `'SOA'`   | 授权起始记录     | {Object}    | [`dns.resolveSoa()`][]   |
| `'SRV'`   | 服务记录                | {Object}    | [`dns.resolveSrv()`][]   |
| `'TLSA'`  | 证书关联       | {Object}    | [`dns.resolveTlsa()`][]  |
| `'TXT'`   | 文本记录                   | {string\[]} | [`dns.resolveTxt()`][]   |

出错时，`err` 是一个 [`Error`][] 对象，其中 `err.code` 是 [DNS 错误代码][] 之一。

## `dns.resolve4(hostname[, options], callback)`

<!-- YAML
added: v0.1.16
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/9296
    description: "此方法现在支持传递 `options`，特别是 `options.ttl`。"
-->

* `hostname` {string} 要解析的主机名。
* `options` {Object}
  * `ttl` {boolean} 获取每条记录的生存时间值 (TTL)。
    当为 `true` 时，回调接收一个
    `{ address: '1.2.3.4', ttl: 60 }` 对象数组而不是字符串数组，
    其中 TTL 以秒为单位表示。
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[] | Object\[]}

使用 DNS 协议来解析 `hostname` 的 IPv4 地址（`A` 记录）。传递给 `callback` 函数的 `addresses` 参数
将包含一个 IPv4 地址数组（例如
`['74.125.79.104', '74.125.79.105', '74.125.79.106']`）。

## `dns.resolve6(hostname[, options], callback)`

<!-- YAML
added: v0.1.16
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/9296
    description: "此方法现在支持传递 `options`，特别是 `options.ttl`。"
-->

* `hostname` {string} 要解析的主机名。
* `options` {Object}
  * `ttl` {boolean} 获取每条记录的生存时间值 (TTL)。
    当为 `true` 时，回调接收一个
    `{ address: '0:1:2:3:4:5:6:7', ttl: 60 }` 对象数组而不是字符串数组，
    其中 TTL 以秒为单位表示。
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[] | Object\[]}

使用 DNS 协议解析 `hostname` 的 IPv6 地址（`AAAA` 记录）。传递给 `callback` 函数的 `addresses` 参数将包含一个 IPv6 地址数组。

## `dns.resolveAny(hostname, callback)`

<!-- YAML
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `ret` {Object\[]}

使用 DNS 协议解析所有记录（也称为 `ANY` 或 `*` 查询）。传递给 `callback` 函数的 `ret` 参数将是一个包含各种类型记录的数组。每个对象都有一个 `type` 属性，指示当前记录的类型。根据 `type` 的不同，对象上还将存在其他属性：

| 类型      | 属性                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `'A'`     | `address`/`ttl`                                                                                                                                  |
| `'AAAA'`  | `address`/`ttl`                                                                                                                                  |
| `'CAA'`   | 参见 [`dns.resolveCaa()`][]                                                                                                                  |
| `'CNAME'` | `value`                                                                                                                                          |
| `'MX'`    | 参见 [`dns.resolveMx()`][]                                                                                                                   |
| `'NAPTR'` | 参见 [`dns.resolveNaptr()`][]                                                                                                                |
| `'NS'`    | `value`                                                                                                                                          |
| `'PTR'`   | `value`                                                                                                                                          |
| `'SOA'`   | 参见 [`dns.resolveSoa()`][]                                                                                                                  |
| `'SRV'`   | 参见 [`dns.resolveSrv()`][]                                                                                                                  |
| `'TLSA'`  | 参见 [`dns.resolveTlsa()`][]                                                                                                                 |
| `'TXT'`   | 此类型的记录包含一个名为 `entries` 的数组属性，参见 [`dns.resolveTxt()`][]，例如 `{ entries: ['...'], type: 'TXT' }` |

以下是传递给回调的 `ret` 对象示例：

```js
[ { type: 'A', address: '127.0.0.1', ttl: 299 },
  { type: 'CNAME', value: 'example.com' },
  { type: 'MX', exchange: 'alt4.aspmx.l.example.com', priority: 50 },
  { type: 'NS', value: 'ns1.example.com' },
  { type: 'TXT', entries: [ 'v=spf1 include:_spf.example.com ~all' ] },
  { type: 'SOA',
    nsname: 'ns1.example.com',
    hostmaster: 'admin.example.com',
    serial: 156696742,
    refresh: 900,
    retry: 900,
    expire: 1800,
    minttl: 60 } ];
```

DNS 服务器运营商可以选择不响应 `ANY` 查询。最好调用单独的方法，如 [`dns.resolve4()`][]、[`dns.resolveMx()`][] 等。更多详情，请参阅 [RFC 8482][]。

## `dns.resolveCname(hostname, callback)`

<!-- YAML
added: v0.3.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[]}

使用 DNS 协议解析 `hostname` 的 `CNAME` 记录。传递给 `callback` 函数的 `addresses` 参数将包含一个可用于 `hostname` 的规范名称记录数组（例如 `['bar.example.com']`）。

## `dns.resolveCaa(hostname, callback)`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `records` {Object\[]}

使用 DNS 协议解析 `hostname` 的 `CAA` 记录。传递给 `callback` 函数的
`addresses` 参数将包含一个可用于 `hostname` 的证书颁发机构授权记录数组
（例如 `[{critical: 0, iodef:
'mailto:pki@example.com'}, {critical: 128, issue: 'pki.example.com'}]`）。

## `dns.resolveMx(hostname, callback)`

<!-- YAML
added: v0.1.27
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {Object\[]}

使用 DNS 协议解析 `hostname` 的邮件交换记录（`MX` 记录）。传递给 `callback` 函数的 `addresses` 参数将
包含一个对象数组，每个对象都包含 `priority` 和 `exchange`
属性（例如 `[{priority: 10, exchange: 'mx.example.com'}, ...]`）。

## `dns.resolveNaptr(hostname, callback)`

<!-- YAML
added: v0.9.12
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {Object\[]}

使用 DNS 协议解析 `hostname` 的基于正则表达式的记录（`NAPTR`
记录）。传递给 `callback`
函数的 `addresses` 参数将包含一个具有以下属性的对象数组：

* `flags`
* `service`
* `regexp`
* `replacement`
* `order`
* `preference`

```js
({
  flags: 's',
  service: 'SIP+D2U',
  regexp: '',
  replacement: '_sip._udp.example.com',
  order: 30,
  preference: 100,
});
```

## `dns.resolveNs(hostname, callback)`

<!-- YAML
added: v0.1.90
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[]}

使用 DNS 协议解析 `hostname` 的名称服务器记录（`NS` 记录）。传递给 `callback` 函数的 `addresses` 参数将
包含一个可用于 `hostname` 的名称服务器记录数组
（例如 `['ns1.example.com', 'ns2.example.com']`）。

## `dns.resolvePtr(hostname, callback)`

<!-- YAML
added: v6.0.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {string\[]}

使用 DNS 协议解析 `hostname` 的指针记录（`PTR` 记录）。传递给 `callback` 函数的 `addresses` 参数将
是一个包含回复记录的字符串数组。

## `dns.resolveSoa(hostname, callback)`

<!-- YAML
added: v0.11.10
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递无效回调给 `callback` 参数现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `address` {Object}

使用 DNS 协议解析 `hostname` 的授权起始记录（`SOA` 记录）。传递给 `callback` 函数的 `address` 参数将
是一个具有以下属性的对象：

* `nsname`
* `hostmaster`
* `serial`
* `refresh`
* `retry`
* `expire`
* `minttl`

```js
({
  nsname: 'ns.example.com',
  hostmaster: 'root.example.com',
  serial: 2013101809,
  refresh: 10000,
  retry: 2400,
  expire: 604800,
  minttl: 3600,
});
```

## `dns.resolveSrv(hostname, callback)`

<!-- YAML
added: v0.1.27
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `addresses` {Object\[]}

使用 DNS 协议解析 `hostname` 的服务记录（`SRV` 记录）。传递给 `callback` 函数的 `addresses` 参数将
是一个具有以下属性的对象数组：

* `priority`
* `weight`
* `port`
* `name`

```js
({
  priority: 10,
  weight: 5,
  port: 21223,
  name: 'service.example.com',
});
```

## `dns.resolveTlsa(hostname, callback)`

<!-- YAML
added:
  - v23.9.0
  - v22.15.0
-->

<!--lint disable no-undefined-references list-item-bullet-indent-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `records` {Object\[]}

<!--lint enable no-undefined-references list-item-bullet-indent-->

使用 DNS 协议解析 `hostname` 的证书关联（`TLSA` 记录）。传递给 `callback` 函数的 `records` 参数是一个
具有以下属性的对象数组：

* `certUsage`
* `selector`
* `match`
* `data`

```js
({
  certUsage: 3,
  selector: 1,
  match: 1,
  data: [ArrayBuffer],
});
```

## `dns.resolveTxt(hostname, callback)`

<!-- YAML
added: v0.1.27
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `hostname` {string}
* `callback` {Function}
  * `err` {Error}
  * `records` {string\[]}

使用 DNS 协议解析 `hostname` 的文本查询（`TXT` 记录）。传递给 `callback` 函数的 `records` 参数是一个
可用于 `hostname` 的文本记录的二维数组（例如
`[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ]`）。每个子数组包含一条记录的 TXT 块。根据用例，这些块可以连接在一起或
单独处理。

## `dns.reverse(ip, callback)`

<!-- YAML
added: v0.1.16
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/64268
    description: 反向查询不再查阅 hosts 文件。
-->

* `ip` {string}
* `callback` {Function}
  * `err` {Error}
  * `hostnames` {string\[]}

执行反向 DNS 查询，将 IPv4 或 IPv6 地址解析为一个
主机名数组。

出错时，`err` 是一个 [`Error`][] 对象，其中 `err.code` 是
[DNS 错误代码][] 之一。

## `dns.setDefaultResultOrder(order)`

<!-- YAML
added:
  - v16.4.0
  - v14.18.0
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52492
    description: "现在支持 `ipv6first` 值。"
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/39987
    description: "默认值已更改为 `verbatim`。"
-->

* `order` {string} 必须是 `'ipv4first'`、`'ipv6first'` 或 `'verbatim'`。

设置 [`dns.lookup()`][] 和
[`dnsPromises.lookup()`][] 中 `order` 的默认值。该值可以是：

* `ipv4first`：将默认 `order` 设置为 `ipv4first`。
* `ipv6first`：将默认 `order` 设置为 `ipv6first`。
* `verbatim`：将默认 `order` 设置为 `verbatim`。

默认值是 `verbatim`，并且 [`dns.setDefaultResultOrder()`][] 的优先级高于 [`--dns-result-order`][]。当使用 [工作线程][] 时，
主线程中的 [`dns.setDefaultResultOrder()`][] 不会影响工作线程中的默认
dns 顺序。

## `dns.getDefaultResultOrder()`

<!-- YAML
added:
  - v20.1.0
  - v18.17.0
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52492
    description: "现在支持 `ipv6first` 值。"
-->

获取 [`dns.lookup()`][] 和
[`dnsPromises.lookup()`][] 中 `order` 的默认值。该值可以是：

* `ipv4first`：`order` 默认为 `ipv4first`。
* `ipv6first`：`order` 默认为 `ipv6first`。
* `verbatim`：`order` 默认为 `verbatim`。

## `dns.setServers(servers)`

<!-- YAML
added: v0.11.3
-->

* `servers` {string\[]} [RFC 5952][] 格式的地址数组

设置执行 DNS
解析时要使用的服务器的 IP 地址和端口。`servers` 参数是一个 [RFC 5952][] 格式的
地址数组。如果端口是 IANA 默认 DNS 端口 (53)，则可以省略。

```js
dns.setServers([
  '8.8.8.8',
  '[2001:4860:4860::8888]',
  '8.8.8.8:1053',
  '[2001:4860:4860::8888]:1053',
]);
```

如果提供了无效地址，将抛出错误。

DNS 查询进行时不得调用 `dns.setServers()` 方法。

[`dns.setServers()`][] 方法仅影响 [`dns.resolve()`][]、
`dns.resolve*()` 和 [`dns.reverse()`][]（具体而言 _不_ 影响
[`dns.lookup()`][]）。

此方法的工作方式很像
[resolve.conf](https://man7.org/linux/man-pages/man5/resolv.conf.5.html)。
也就是说，如果尝试使用提供的第一个服务器解析导致
`NOTFOUND` 错误，则 `resolve()` 方法将 _不_ 尝试使用提供的后续服务器进行解析。仅当较早的服务器超时或导致其他错误时，才会使用备用 DNS 服务器。

## DNS Promise API

<!-- YAML
added: v10.6.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/32953
    description: "作为 `require('dns/promises')` 暴露。"
  - version:
    - v11.14.0
    - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/26592
    description: 此 API 不再是实验性的。
-->

`dns.promises` API 提供了一组替代的异步 DNS 方法，
它们返回 `Promise` 对象而不是使用回调。该 API 可通过
`require('node:dns').promises` 或 `require('node:dns/promises')` 访问。

### 类：`dnsPromises.Resolver`

<!-- YAML
added: v10.6.0
-->

DNS 请求的独立解析器。

创建新的解析器使用默认服务器设置。使用
[`resolver.setServers()`][`dnsPromises.setServers()`] 设置解析器使用的服务器
不会影响其他解析器：

```mjs
import { Resolver } from 'node:dns/promises';
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// 此请求将使用 4.4.4.4 处的服务器，独立于全局设置。
const addresses = await resolver.resolve4('example.org');
```

```cjs
const { Resolver } = require('node:dns').promises;
const resolver = new Resolver();
resolver.setServers(['4.4.4.4']);

// 此请求将使用 4.4.4.4 处的服务器，独立于全局设置。
resolver.resolve4('example.org').then((addresses) => {
  // ...
});

// 或者，同样的代码也可以使用 async-await 风格编写。
(async function() {
  const addresses = await resolver.resolve4('example.org');
})();
```

`dnsPromises` API 中提供以下方法：

* [`resolver.getServers()`][`dnsPromises.getServers()`]
* [`resolver.resolve()`][`dnsPromises.resolve()`]
* [`resolver.resolve4()`][`dnsPromises.resolve4()`]
* [`resolver.resolve6()`][`dnsPromises.resolve6()`]
* [`resolver.resolveAny()`][`dnsPromises.resolveAny()`]
* [`resolver.resolveCaa()`][`dnsPromises.resolveCaa()`]
* [`resolver.resolveCname()`][`dnsPromises.resolveCname()`]
* [`resolver.resolveMx()`][`dnsPromises.resolveMx()`]
* [`resolver.resolveNaptr()`][`dnsPromises.resolveNaptr()`]
* [`resolver.resolveNs()`][`dnsPromises.resolveNs()`]
* [`resolver.resolvePtr()`][`dnsPromises.resolvePtr()`]
* [`resolver.resolveSoa()`][`dnsPromises.resolveSoa()`]
* [`resolver.resolveSrv()`][`dnsPromises.resolveSrv()`]
* [`resolver.resolveTlsa()`][`dnsPromises.resolveTlsa()`]
* [`resolver.resolveTxt()`][`dnsPromises.resolveTxt()`]
* [`resolver.reverse()`][`dnsPromises.reverse()`]
* [`resolver.setServers()`][`dnsPromises.setServers()`]

### `resolver.cancel()`

<!-- YAML
added:
  - v15.3.0
  - v14.17.0
-->

取消此解析器发出的所有未完成的 DNS 查询。相应的
Promise 将被拒绝，并带有代码为 `ECANCELLED` 的错误。

### `dnsPromises.getServers()`

<!-- YAML
added: v10.6.0
-->

* 返回：{string\[]}

返回一个 IP 地址字符串数组，格式符合 [RFC 5952][]，
当前配置用于 DNS 解析。如果使用了自定义端口，字符串将包含端口
部分。

```json
[
  "8.8.8.8",
  "2001:4860:4860::8888",
  "8.8.8.8:1053",
  "[2001:4860:4860::8888]:1053"
]
```

### `dnsPromises.lookup(hostname[, options])`

<!-- YAML
added: v10.6.0
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52492
    description: "现在已弃用 `verbatim` 选项，推荐使用新的 `order` 选项。"
-->

* `hostname` {string}
* `options` {integer | Object}
  * `family` {integer} 记录族。必须是 `4`、`6` 或 `0`。值
    `0` 表示返回 IPv4 或 IPv6 地址中的任意一种。如果值
    `0` 与 `{ all: true }`（见下文）一起使用，则根据系统的 DNS
    解析器，返回 IPv4 和 IPv6 地址中的一种或两种。**默认值：** `0`。
  * `hints` {number} 一个或多个[受支持的 `getaddrinfo` 标志][]
    。可以通过按位 `OR` 运算这些标志的值来传递多个标志。
  * `all` {boolean} 当为 `true` 时，`Promise` 将解析为数组中的所有地址。
    否则，返回单个地址。**默认值：** `false`。
  * `order` {string} 当为 `verbatim` 时，`Promise` 将按照 DNS 解析器返回
    IPv4 和 IPv6 地址的顺序进行解析。当为 `ipv4first` 时，IPv4 地址
    会排在 IPv6 地址之前。当为 `ipv6first` 时，IPv6 地址会排在 IPv4
    地址之前。
    **默认值：** `verbatim`（地址不会重新排序）。
    默认值可通过 [`dns.setDefaultResultOrder()`][] 或
    [`--dns-result-order`][] 进行配置。新代码应使用 `{ order: 'verbatim' }`。
  * `verbatim` {boolean} 当为 `true` 时，`Promise` 将按照 DNS 解析器返回
    IPv4 和 IPv6 地址的顺序进行解析。当为 `false` 时，IPv4 地址会排在
    IPv6 地址之前。
    此选项将被弃用，改用 `order`。同时指定两者时，`order` 的优先级更高。
    新代码应仅使用 `order`。
    **默认值：** `true`（地址不会重新排序）。默认值可通过
    [`dns.setDefaultResultOrder()`][] 或 [`--dns-result-order`][] 进行配置。

将主机名（例如 `'nodejs.org'）解析为找到的第一个 A (IPv4) 或
AAAA (IPv6) 记录。所有 `option` 属性都是可选的。如果 `options` 是
整数，则它必须是 `4` 或 `6` – 如果未提供 `options`，则
返回找到的 IPv4 或 IPv6 地址，或两者。

将 `all` 选项设置为 `true` 时，`Promise` 解析为 `addresses`，
它是一个具有 `address` 和 `family` 属性的对象数组。

出错时，`Promise` 被 [`Error`][] 对象拒绝，其中 `err.code`
是错误代码。
请记住，`err.code` 不仅会在主机名不存在时设置为 `'ENOTFOUND'`，
而且在查找以其他方式失败时（例如没有可用的文件描述符）也会设置。

[`dnsPromises.lookup()`][] 不一定与 DNS
协议有任何关系。实现使用操作系统设施，可以
将名称与地址关联，反之亦然。此实现可能对任何 Node.js 程序的行为产生
微妙但重要的后果。在使用 `dnsPromises.lookup()` 之前，
请花些时间咨询[实现注意事项部分][]。

示例用法：

```mjs
import dns from 'node:dns';
const dnsPromises = dns.promises;
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

await dnsPromises.lookup('example.org', options).then((result) => {
  console.log('address: %j family: IPv%s', result.address, result.family);
  // 地址: "2606:2800:21f:cb07:6820:80da:af6b:8b2c" 族: IPv6
});

// 当 options.all 为 true 时，结果将是一个数组。
options.all = true;
await dnsPromises.lookup('example.org', options).then((result) => {
  console.log('addresses: %j', result);
  // 地址: [{"address":"2606:2800:21f:cb07:6820:80da:af6b:8b2c","family":6}]
});
```

```cjs
const dns = require('node:dns');
const dnsPromises = dns.promises;
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

dnsPromises.lookup('example.org', options).then((result) => {
  console.log('address: %j family: IPv%s', result.address, result.family);
  // 地址: "2606:2800:21f:cb07:6820:80da:af6b:8b2c" 族: IPv6
});

// 当 options.all 为 true 时，结果将是一个数组。
options.all = true;
dnsPromises.lookup('example.org', options).then((result) => {
  console.log('addresses: %j', result);
  // 地址: [{"address":"2606:2800:21f:cb07:6820:80da:af6b:8b2c","family":6}]
});
```

### `dnsPromises.lookupService(address, port)`

<!-- YAML
added: v10.6.0
-->

* `address` {string}
* `port` {number}

使用操作系统的底层 `getnameinfo` 实现
将给定的 `address` 和 `port` 解析为主机名和服务。

如果 `address` 不是有效的 IP 地址，将抛出 `TypeError`。
`port` 将被强制转换为数字。如果它不是合法端口，将抛出 `TypeError`。

出错时，`Promise` 被 [`Error`][] 对象拒绝，其中 `err.code`
是错误代码。

```mjs
import dnsPromises from 'node:dns/promises';
const result = await dnsPromises.lookupService('127.0.0.1', 22);

console.log(result.hostname, result.service); // 输出：localhost ssh
```

```cjs
const dnsPromises = require('node:dns').promises;
dnsPromises.lookupService('127.0.0.1', 22).then((result) => {
  console.log(result.hostname, result.service);
  // 输出：localhost ssh
});
```

### `dnsPromises.resolve(hostname[, rrtype])`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string} 要解析的主机名。
* `rrtype` {string} 资源记录类型。**默认值：** `'A'`。

使用 DNS 协议将主机名（例如 `'nodejs.org'）解析为
资源记录数组。成功时，`Promise` 解析为
资源记录数组。单个结果的类型和结构因
`rrtype` 而异：

| `rrtype`  | `records` 包含             | 结果类型 | 简写方法                 |
| --------- | ------------------------------ | ----------- | -------------------------------- |
| `'A'`     | IPv4 地址 (默认)       | {string}    | [`dnsPromises.resolve4()`][]     |
| `'AAAA'`  | IPv6 地址                 | {string}    | [`dnsPromises.resolve6()`][]     |
| `'ANY'`   | 任何记录                    | {Object}    | [`dnsPromises.resolveAny()`][]   |
| `'CAA'`   | CA 授权记录       | {Object}    | [`dnsPromises.resolveCaa()`][]   |
| `'CNAME'` | 规范名称记录         | {string}    | [`dnsPromises.resolveCname()`][] |
| `'MX'`    | 邮件交换记录          | {Object}    | [`dnsPromises.resolveMx()`][]    |
| `'NAPTR'` | 名称授权指针记录 | {Object}    | [`dnsPromises.resolveNaptr()`][] |
| `'NS'`    | 名称服务器记录            | {string}    | [`dnsPromises.resolveNs()`][]    |
| `'PTR'`   | 指针记录                | {string}    | [`dnsPromises.resolvePtr()`][]   |
| `'SOA'`   | 授权起始记录     | {Object}    | [`dnsPromises.resolveSoa()`][]   |
| `'SRV'`   | 服务记录                | {Object}    | [`dnsPromises.resolveSrv()`][]   |
| `'TLSA'`  | 证书关联       | {Object}    | [`dnsPromises.resolveTlsa()`][]  |
| `'TXT'`   | 文本记录                   | {string\[]} | [`dnsPromises.resolveTxt()`][]   |

出错时，`Promise` 被 [`Error`][] 对象拒绝，其中 `err.code`
是 [DNS 错误代码][] 之一。

### `dnsPromises.resolve4(hostname[, options])`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string} 要解析的主机名。
* `options` {Object}
  * `ttl` {boolean} 检索每条记录的生存时间值 (TTL)。
    为 `true` 时，`Promise` 解析为一个
    `{ address: '1.2.3.4', ttl: 60 }` 对象数组，而不是字符串数组，
    TTL 以秒为单位表示。

使用 DNS 协议解析 `hostname` 的 IPv4 地址（`A` 记录）。成功时，`Promise` 解析为 IPv4
地址数组（例如 `['74.125.79.104', '74.125.79.105', '74.125.79.106']`）。

### `dnsPromises.resolve6(hostname[, options])`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string} 要解析的主机名。
* `options` {Object}
  * `ttl` {boolean} 检索每条记录的生存时间值 (TTL)。
    为 `true` 时，`Promise` 解析为一个
    `{ address: '0:1:2:3:4:5:6:7', ttl: 60 }` 对象数组，而不是
    字符串数组，TTL 以秒为单位表示。

使用 DNS 协议解析 `hostname` 的 IPv6 地址（`AAAA` 记录）。成功时，`Promise` 解析为 IPv6
地址数组。

### `dnsPromises.resolveAny(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析所有记录（也称为 `ANY` 或 `*` 查询）。
成功时，`Promise` 解析为包含各种类型
记录的数组。每个对象都有一个 `type` 属性，指示当前记录的类型。根据 `type`，对象上还将存在
其他属性：

| 类型      | 属性                                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'A'`     | `address`/`ttl`                                                                                                                                          |
| `'AAAA'`  | `address`/`ttl`                                                                                                                                          |
| `'CAA'`   | 参考 [`dnsPromises.resolveCaa()`][]                                                                                                                  |
| `'CNAME'` | `value`                                                                                                                                                  |
| `'MX'`    | 参考 [`dnsPromises.resolveMx()`][]                                                                                                                   |
| `'NAPTR'` | 参考 [`dnsPromises.resolveNaptr()`][]                                                                                                                |
| `'NS'`    | `value`                                                                                                                                                  |
| `'PTR'`   | `value`                                                                                                                                                  |
| `'SOA'`   | 参考 [`dnsPromises.resolveSoa()`][]                                                                                                                  |
| `'SRV'`   | 参考 [`dnsPromises.resolveSrv()`][]                                                                                                                  |
| `'TLSA'`  | 参考 [`dnsPromises.resolveTlsa()`][]                                                                                                                 |
| `'TXT'`   | 此类型的记录包含一个名为 `entries` 的数组属性，参考 [`dnsPromises.resolveTxt()`][]，例如 `{ entries: ['...'], type: 'TXT' }` |

以下是结果对象的示例：

```js
[ { type: 'A', address: '127.0.0.1', ttl: 299 },
  { type: 'CNAME', value: 'example.com' },
  { type: 'MX', exchange: 'alt4.aspmx.l.example.com', priority: 50 },
  { type: 'NS', value: 'ns1.example.com' },
  { type: 'TXT', entries: [ 'v=spf1 include:_spf.example.com ~all' ] },
  { type: 'SOA',
    nsname: 'ns1.example.com',
    hostmaster: 'admin.example.com',
    serial: 156696742,
    refresh: 900,
    retry: 900,
    expire: 1800,
    minttl: 60 } ];
```

### `dnsPromises.resolveCaa(hostname)`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的 `CAA` 记录。成功时，
`Promise` 解析为一个对象数组，包含可用于 `hostname` 的
证书颁发机构授权记录
（例如 `[{critical: 0, iodef: 'mailto:pki@example.com'},{critical: 128, issue:
'pki.example.com'}]`）。

### `dnsPromises.resolveCname(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的 `CNAME` 记录。成功时，
`Promise` 解析为可用于
`hostname` 的规范名称记录数组（例如 `['bar.example.com']`)。

### `dnsPromises.resolveMx(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的邮件交换记录（`MX` 记录）。成功时，`Promise` 解析为一个对象
数组，每个对象都包含 `priority` 和 `exchange` 属性（例如
`[{priority: 10, exchange: 'mx.example.com'}, ...]`)。

### `dnsPromises.resolveNaptr(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的基于正则表达式的记录（`NAPTR`
记录）。成功时，`Promise` 解析为一个具有以下属性的对象
数组：

* `flags`
* `service`
* `regexp`
* `replacement`
* `order`
* `preference`

```js
({
  flags: 's',
  service: 'SIP+D2U',
  regexp: '',
  replacement: '_sip._udp.example.com',
  order: 30,
  preference: 100,
});
```

### `dnsPromises.resolveNs(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的名称服务器记录（`NS` 记录）。成功时，`Promise` 解析为可用于 `hostname` 的名称服务器
记录数组（例如
`['ns1.example.com', 'ns2.example.com']`)。

### `dnsPromises.resolvePtr(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的指针记录（`PTR` 记录）。成功时，`Promise` 解析为包含
回复记录的字符串数组。

### `dnsPromises.resolveSoa(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的授权起始记录（`SOA` 记录）。成功时，`Promise` 解析为具有
以下属性的对象：

* `nsname`
* `hostmaster`
* `serial`
* `refresh`
* `retry`
* `expire`
* `minttl`

```js
({
  nsname: 'ns.example.com',
  hostmaster: 'root.example.com',
  serial: 2013101809,
  refresh: 10000,
  retry: 2400,
  expire: 604800,
  minttl: 3600,
});
```

### `dnsPromises.resolveSrv(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的服务记录（`SRV` 记录）。成功时，`Promise` 解析为具有
以下属性的对象数组：

* `priority`
* `weight`
* `port`
* `name`

```js
({
  priority: 10,
  weight: 5,
  port: 21223,
  name: 'service.example.com',
});
```

### `dnsPromises.resolveTlsa(hostname)`

<!-- YAML
added:
  - v23.9.0
  - v22.15.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的证书关联（`TLSA` 记录）。成功时，`Promise` 解析为具有
这些属性的对象数组：

* `certUsage`
* `selector`
* `match`
* `data`

```js
({
  certUsage: 3,
  selector: 1,
  match: 1,
  data: [ArrayBuffer],
});
```

### `dnsPromises.resolveTxt(hostname)`

<!-- YAML
added: v10.6.0
-->

* `hostname` {string}

使用 DNS 协议解析 `hostname` 的文本查询（`TXT` 记录）。成功时，`Promise` 解析为可用于 `hostname` 的文本记录的二维
数组（例如
`[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ]`）。每个子数组包含一条记录的 TXT 块。根据用例，这些块可以连接在一起或
单独处理。

### `dnsPromises.reverse(ip)`

<!-- YAML
added: v10.6.0
-->

* `ip` {string}

执行反向 DNS 查询，将 IPv4 或 IPv6 地址解析为
主机名数组。

出错时，`Promise` 被 [`Error`][] 对象拒绝，其中 `err.code`
是 [DNS 错误代码][] 之一。

### `dnsPromises.setDefaultResultOrder(order)`

<!-- YAML
added:
  - v16.4.0
  - v14.18.0
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52492
    description: "现在支持 `ipv6first` 值。"
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/39987
    description: "默认值已更改为 `verbatim`。"
-->

* `order` {string} 必须是 `'ipv4first'`、`'ipv6first'` 或 `'verbatim'`。

设置 [`dns.lookup()`][] 和
[`dnsPromises.lookup()`][] 中 `order` 的默认值。该值可以是：

* `ipv4first`：将默认 `order` 设置为 `ipv4first`。
* `ipv6first`：将默认 `order` 设置为 `ipv6first`。
* `verbatim`：将默认 `order` 设置为 `verbatim`。

默认值是 `verbatim`，并且 [`dnsPromises.setDefaultResultOrder()`][] 的
优先级高于 [`--dns-result-order`][]。当使用 [工作线程][] 时，
主线程中的 [`dnsPromises.setDefaultResultOrder()`][] 不会影响
工作线程中的默认 dns 顺序。

### `dnsPromises.getDefaultResultOrder()`

<!-- YAML
added:
  - v20.1.0
  - v18.17.0
-->

获取 `dnsOrder` 的值。

### `dnsPromises.setServers(servers)`

<!-- YAML
added: v10.6.0
-->

* `servers` {string\[]} [RFC 5952][] 格式的地址数组

设置执行 DNS 解析时要使用的服务器的 IP 地址和端口。`servers` 参数是一个 [RFC 5952][] 格式的地址数组。如果端口是 IANA 默认 DNS 端口 (53)，则可以省略。

```js
dnsPromises.setServers([
  '8.8.8.8',
  '[2001:4860:4860::8888]',
  '8.8.8.8:1053',
  '[2001:4860:4860::8888]:1053',
]);
```

如果提供了无效地址，将抛出错误。

DNS 查询进行时不得调用 `dnsPromises.setServers()` 方法。

此方法的工作方式很像
[resolve.conf](https://man7.org/linux/man-pages/man5/resolv.conf.5.html)。
也就是说，如果尝试使用提供的第一个服务器解析导致
`NOTFOUND` 错误，则 `resolve()` 方法将 _不_ 尝试使用提供的后续服务器进行解析。仅当较早的服务器超时或导致其他错误时，才会使用备用 DNS 服务器。

## 错误代码

每个 DNS 查询都可以返回以下错误代码之一：

* `dns.NODATA`：DNS 服务器返回了一个没有数据的答案。
* `dns.FORMERR`：DNS 服务器声称查询格式错误。
* `dns.SERVFAIL`：DNS 服务器返回一般性失败。
* `dns.NOTFOUND`：未找到域名。
* `dns.NOTIMP`：DNS 服务器未实现请求的操作。
* `dns.REFUSED`：DNS 服务器拒绝查询。
* `dns.BADQUERY`：DNS 查询格式错误。
* `dns.BADNAME`：主机名格式错误。
* `dns.BADFAMILY`：不支持的地址族。
* `dns.BADRESP`：DNS 响应格式错误。
* `dns.CONNREFUSED`：无法联系 DNS 服务器。
* `dns.TIMEOUT`：联系 DNS 服务器时超时。
* `dns.EOF`：文件结束。
* `dns.FILE`：读取文件时出错。
* `dns.NOMEM`：内存不足。
* `dns.DESTRUCTION`：通道正在被销毁。
* `dns.BADSTR`：字符串格式错误。
* `dns.BADFLAGS`：指定了非法标志。
* `dns.NONAME`：给定的主机名不是数字。
* `dns.BADHINTS`：指定了非法的提示标志。
* `dns.NOTINITIALIZED`：尚未执行 c-ares 库初始化。
* `dns.LOADIPHLPAPI`：加载 `iphlpapi.dll` 时出错。
* `dns.ADDRGETNETWORKPARAMS`：找不到 `GetNetworkParams` 函数。
* `dns.CANCELLED`：DNS 查询已取消。

`dnsPromises` API 也导出上述错误代码，例如，`dnsPromises.NODATA`。

## 实现注意事项

尽管 [`dns.lookup()`][] 和各种 `dns.resolve*()/dns.reverse()` 函数具有将网络名称与网络地址关联（或反之亦然）的相同目标，但它们的行为截然不同。这些差异可能会对 Node.js 程序的行为产生微妙但显著的影响。

### `dns.lookup()`

在底层，[`dns.lookup()`][] 使用与大多数其他程序相同的操作系统设施。例如，[`dns.lookup()`][] 几乎总是以与 `ping` 命令相同的方式解析给定名称。在大多数类 POSIX 操作系统上，可以通过更改 nsswitch.conf(5) 和/或 resolv.conf(5) 中的设置来修改 [`dns.lookup()`][] 函数的行为，但更改这些文件将更改在同一操作系统上运行的所有其他程序的行为。

虽然从 JavaScript 的角度来看，对 `dns.lookup()` 的调用是异步的，但它是作为在 libuv 线程池上运行的对 getaddrinfo(3) 的同步调用实现的。这可能会对某些应用程序产生意想不到的负面性能影响，请参阅 [`UV_THREADPOOL_SIZE`][] 文档以获取更多信息。

各种网络 API 将在内部调用 `dns.lookup()` 来解析主机名。如果这是一个问题，请考虑使用 `dns.resolve()` 将主机名解析为地址，并使用地址而不是主机名。此外，某些网络 API（例如 [`socket.connect()`][] 和 [`dgram.createSocket()`][]）允许替换默认解析器 `dns.lookup()`。

### `dns.resolve()`、`dns.resolve*()` 和 `dns.reverse()`

这些函数的实现方式与 [`dns.lookup()`][] 截然不同。它们不使用 getaddrinfo(3)，并且总是通过网络执行 DNS 查询。此网络通信始终是异步完成的，并且不使用 libuv 的线程池。

因此，这些函数不会对发生在 libuv 线程池上的其他处理产生与 [`dns.lookup()`][] 可能产生的相同的负面影响。

它们不使用与 [`dns.lookup()`][] 使用的同一组配置文件。例如，它们不使用来自 `/etc/hosts` 的配置。

[DNS 错误代码]: #error-codes
[域名系统 (DNS)]: https://en.wikipedia.org/wiki/Domain_Name_System
[实现注意事项部分]: #implementation-considerations
[RFC 5952]: https://tools.ietf.org/html/rfc5952#section-6
[RFC 8482]: https://tools.ietf.org/html/rfc8482
[`--dns-result-order`]: cli.md#--dns-result-orderorder
[`Error`]: errors.md#class-error
[`UV_THREADPOOL_SIZE`]: cli.md#uv_threadpool_sizesize
[`dgram.createSocket()`]: dgram.md#dgramcreatesocketoptions-callback
[`dns.getServers()`]: #dnsgetservers
[`dns.lookup()`]: #dnslookuphostname-options-callback
[`dns.resolve()`]: #dnsresolvehostname-rrtype-callback
[`dns.resolve4()`]: #dnsresolve4hostname-options-callback
[`dns.resolve6()`]: #dnsresolve6hostname-options-callback
[`dns.resolveAny()`]: #dnsresolveanyhostname-callback
[`dns.resolveCaa()`]: #dnsresolvecaahostname-callback
[`dns.resolveCname()`]: #dnsresolvecnamehostname-callback
[`dns.resolveMx()`]: #dnsresolvemxhostname-callback
[`dns.resolveNaptr()`]: #dnsresolvenaptrhostname-callback
[`dns.resolveNs()`]: #dnsresolvenshostname-callback
[`dns.resolvePtr()`]: #dnsresolveptrhostname-callback
[`dns.resolveSoa()`]: #dnsresolvesoahostname-callback
[`dns.resolveSrv()`]: #dnsresolvesrvhostname-callback
[`dns.resolveTlsa()`]: #dnsresolvetlsahostname-callback
[`dns.resolveTxt()`]: #dnsresolvetxthostname-callback
[`dns.reverse()`]: #dnsreverseip-callback
[`dns.setDefaultResultOrder()`]: #dnssetdefaultresultorderorder
[`dns.setServers()`]: #dnssetserversservers
[`dnsPromises.getServers()`]: #dnspromisesgetservers
[`dnsPromises.lookup()`]: #dnspromiseslookuphostname-options
[`dnsPromises.resolve()`]: #dnspromisesresolvehostname-rrtype
[`dnsPromises.resolve4()`]: #dnspromisesresolve4hostname-options
[`dnsPromises.resolve6()`]: #dnspromisesresolve6hostname-options
[`dnsPromises.resolveAny()`]: #dnspromisesresolveanyhostname
[`dnsPromises.resolveCaa()`]: #dnspromisesresolvecaahostname
[`dnsPromises.resolveCname()`]: #dnspromisesresolvecnamehostname
[`dnsPromises.resolveMx()`]: #dnspromisesresolvemxhostname
[`dnsPromises.resolveNaptr()`]: #dnspromisesresolvenaptrhostname
[`dnsPromises.resolveNs()`]: #dnspromisesresolvenshostname
[`dnsPromises.resolvePtr()`]: #dnspromisesresolveptrhostname
[`dnsPromises.resolveSoa()`]: #dnspromisesresolvesoahostname
[`dnsPromises.resolveSrv()`]: #dnspromisesresolvesrvhostname
[`dnsPromises.resolveTlsa()`]: #dnspromisesresolvetlsahostname
[`dnsPromises.resolveTxt()`]: #dnspromisesresolvetxthostname
[`dnsPromises.reverse()`]: #dnspromisesreverseip
[`dnsPromises.setDefaultResultOrder()`]: #dnspromisessetdefaultresultorderorder
[`dnsPromises.setServers()`]: #dnspromisessetserversservers
[`socket.connect()`]: net.md#socketconnectoptions-connectlistener
[`util.promisify()`]: util.md#utilpromisifyoriginal
[支持的 getaddrinfo 标志]: #supported-getaddrinfo-flags
[工作线程]: worker_threads.md】【。
