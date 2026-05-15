# Node.js 核心开发标志

这些标志专门用于 Node.js 核心开发，不适用于通用
应用程序使用。

> \[!NOTE]
> 这些 API 不受语义化版本控制规则约束，并且可以在任何版本的 Node.js 中被更改或移除

## 命令行接口（CLI）

### 标志

#### `--debug-arraybuffer-allocations`

启用 `ArrayBuffer` 分配的调试。

#### `--experimental-quic`

启用 QUIC 协议（开发中）

#### `--expose-internals`

允许使用 `internal/*` 模块，从而可以访问 Node.js 内部功能。

#### `--inspect-brk-node[=[host:]port]`

在 Node.js 应用代码开始时暂停执行，等待调试器连接到指定的
`host` 和 `port`。这对于调试应用启动问题很有用。如果未提供 `host` 和 `port`，
则默认为 `127.0.0.1:9229`。

#### `--node-snapshot`

启用 Node.js 快照的使用，可能会提升启动性能。

#### `--test-udp-no-try-send`

用于在不尝试发送数据的情况下测试 UDP 功能。

#### `--trace-promises`

启用 promise 的跟踪，用于调试和性能分析。

#### `--verify-base-objects`

允许出于调试目的验证基础对象。
