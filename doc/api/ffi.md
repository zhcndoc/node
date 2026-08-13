# FFI

<!--introduced_in=v26.1.0-->

<!-- YAML
added: v26.1.0
-->

> 稳定性：1 - 实验性

<!-- source_link=lib/ffi.js -->

`node:ffi` 模块为从 JavaScript 加载动态库并调用原生符号提供了一种实验性的外部函数接口（FFI）。

此 API 不安全。传入无效指针、使用错误的符号签名，或在内存被释放后访问其内容，可能导致进程崩溃或破坏内存。

要使用它：

```mjs
import ffi from 'node:ffi';
```

```cjs
const ffi = require('node:ffi');
```

在启用 FFI 支持的构建中，该模块仅在 `node:` 方案下可用，并且需要通过 `--experimental-ffi` 标志进行启用。

通过捆绑的 `libffi` 在 `libffi` 提供兼容的静态后端的平台上，可以使用 `node:ffi` 支持构建 Node.js；或者在使用共享 `libffi` 的情况下通过 `--shared-ffi` 配置标志启用。
非官方的 GN 构建不支持 `node:ffi`。

捆绑的 libffi 不支持以下目标平台：

* `s390x`。
* `mips`、`mipsel` 和 `mips64el` 在 FreeBSD、Linux 和
  OpenBSD 之外的目标平台上。
* `ppc64` 在 Android、CloudABI、iOS、OpenHarmony、OS/400、Solaris 和 Windows 上。

在使用[权限模型][]时，除非提供 [`--allow-ffi`][] 标志，否则将限制 FFI API。

## 概览

`node:ffi` 模块提供两组 API：

* 动态库 API：用于加载库、解析符号以及创建可调用的 JavaScript 包装器。
* 原始内存辅助工具：通过指针读取和写入基本值，将指针转换为 JavaScript 字符串、`Buffer` 实例和 `ArrayBuffer` 实例，并将数据复制回原生内存。

## 类型名称

FFI 签名使用字符串类型名称。

支持的类型名称：

* `void`
* `char`
* `i8`, `int8`
* `u8`, `uint8`, `bool`
* `i16`, `int16`
* `u16`, `uint16`
* `i32`, `int32`
* `u32`, `uint32`
* `i64`, `int64`
* `u64`, `uint64`
* `f32`, `float`, `float32`
* `f64`, `double`, `float64`
* `pointer`, `ptr`
* `string`, `str`
* `buffer`
* `arraybuffer`
* `function`

这些类型名称也作为常量暴露在 `ffi.types` 上：

* `ffi.types.VOID` = `'void'`
* `ffi.types.POINTER` = `'pointer'`
* `ffi.types.BUFFER` = `'buffer'`
* `ffi.types.ARRAY_BUFFER` = `'arraybuffer'`
* `ffi.types.FUNCTION` = `'function'`
* `ffi.types.BOOL` = `'bool'`
* `ffi.types.CHAR` = `'char'`
* `ffi.types.STRING` = `'string'`
* `ffi.types.FLOAT` = `'float'`
* `ffi.types.DOUBLE` = `'double'`
* `ffi.types.INT_8` = `'int8'`
* `ffi.types.UINT_8` = `'uint8'`
* `ffi.types.INT_16` = `'int16'`
* `ffi.types.UINT_16` = `'uint16'`
* `ffi.types.INT_32` = `'int32'`
* `ffi.types.UINT_32` = `'uint32'`
* `ffi.types.INT_64` = `'int64'`
* `ffi.types.UINT_64` = `'uint64'`
* `ffi.types.FLOAT_32` = `'float32'`
* `ffi.types.FLOAT_64` = `'float64'`

类似指针的类型（`pointer`、`string`、`buffer`、`arraybuffer` 和 `function`）都会作为指针传递给原生层。

当 `Buffer`、`ArrayBuffer` 或类型化数组值作为类似指针的参数传入时，Node.js 会在原生调用期间借用它们底层内存的一个原始指针。调用方必须确保底层存储在整个调用过程中保持有效且稳定。

在原生调用处于活动状态时（包括通过 FFI 回调等可重入 JavaScript 进行的操作），调整、转移、分离或以其他方式使该底层存储失效都不受支持且是危险的。这样做可能导致进程崩溃、产生不正确的输出，或破坏内存。

`char` 类型遵循平台 C ABI。在普通 C `char` 为有符号的那些平台上，它表现得如同 `i8`；否则表现得如同 `u8`。

`bool` 类型会以 8 位无符号整数的形式进行封送（marshaled）。传入诸如 `0` 和 `1` 这类数值；不接受 JavaScript 的 `true` 和 `false`。

在优化的 Fast FFI 调用中，`pointer`、`ptr` 和 `function` 参数接受原始指针 `bigint` 值。对于类似指针的参数，`null`、`undefined`、字符串、`Buffer`、类型化数组、`DataView` 和 `ArrayBuffer` 值会在调用优化后的原生包装器之前先在 JavaScript 侧进行转换。

优化后的 Fast FFI 调用最多支持 8 个函数参数，但具体限制取决于架构和参数类型，因为每个参数都必须适配平台跳板所使用的寄存器。整数和指针参数在 AArch64 上最多为 7 个，在 x86-64 上最多为 6 个，而浮点参数在两者上都最多可用 8 个。超过这些限制的函数，包括任何参数多于 8 个的函数，都会改用通用 FFI 调用路径。

## 签名对象

函数和回调用签名对象来描述。

签名对象可以包含以下属性，两者都是可选的：

* `return` {string} 一个指定函数或回调返回类型的 [类型名称][type names]。**默认值：** `'void'`。
* `arguments` {string\[]} 一个指定函数或回调参数类型列表的 [类型名称][] 数组。**默认值：** `[]`。

```js
const signature = {
  return: 'i32',
  arguments: ['i32', 'i32'],
};
```

## `ffi.suffix`

<!-- YAML
added: v26.1.0
-->

* {字符串}

当前平台的原生共享库后缀：

* macOS：`'dylib'`
* 类 Unix 平台：`'so'`
* Windows：`'dll'`

可使用此属性构建可移植的库路径：

```cjs
const { suffix } = require('node:ffi');

const path = `libsqlite3.${suffix}`;
```

## `ffi.dlopen(path[, definitions])`

<!-- YAML
added: v26.1.0
-->

* `path` {string|null} 动态库的路径，或使用 `null` 从当前进程映像中解析符号。
* `definitions` {Object} 要立即解析的符号定义。
* 返回：{Object}

加载一个动态库并解析所请求的函数定义。

在 Windows 上不支持传入 `null`。

当省略 `definitions` 时，在显式解析符号之前，`functions` 会作为空对象返回。

返回的对象包含：

* `lib` {DynamicLibrary}：已加载的库句柄。
* `functions` {Object}：所请求符号的可调用包装器。

返回的对象也实现了显式资源管理协议，因此可以与 [`using`][] 声明一起使用。释放返回的对象会关闭库句柄。

```mjs
import { dlopen, suffix } from 'node:ffi';

{
  using handle = dlopen(`./mylib.${suffix}`, {
    add_i32: { arguments: ['i32', 'i32'], return: 'i32' },
  });
  console.log(handle.functions.add_i32(20, 22));
} // 这会自动调用 handle.lib.close()。
```

```mjs
import { dlopen, suffix } from 'node:ffi';

const { lib, functions } = dlopen(`./mylib.${suffix}`, {
  add_i32: { arguments: ['i32', 'i32'], return: 'i32' },
  string_length: { arguments: ['pointer'], return: 'u64' },
});

console.log(functions.add_i32(20, 22));
```

```cjs
const { dlopen, suffix } = require('node:ffi');

const { lib, functions } = dlopen(`./mylib.${suffix}`, {
  add_i32: { arguments: ['i32', 'i32'], return: 'i32' },
  string_length: { arguments: ['pointer'], return: 'u64' },
});

console.log(functions.add_i32(20, 22));
```

## `ffi.dlclose(handle)`

<!-- YAML
added: v26.1.0
-->

* `handle` {DynamicLibrary}

关闭一个动态库。

这相当于调用 `handle.close()`。

## `ffi.dlsym(handle, symbol)`

<!-- YAML
added: v26.1.0
-->

* `handle` {DynamicLibrary}
* `symbol` {string}
* 返回：{bigint}

从已加载的库中解析符号地址。

这等价于调用 `handle.getSymbol(symbol)`。

## 类：`DynamicLibrary`

<!-- YAML
added: v26.1.0
-->

表示一个已加载的动态库。

### `new DynamicLibrary(path)`

* `path` {string|null} 动态库的路径，或使用 `null` 从当前进程映像中解析符号。

加载动态库，但不会急切解析任何函数。

在 Windows 上不支持传入 `null`。

```cjs
const { DynamicLibrary, suffix } = require('node:ffi');

const lib = new DynamicLibrary(`./mylib.${suffix}`);
```

### `library.path`

* {string}

用于加载该库的路径。

### `library.functions`

* {Object}

包含先前已解析函数包装器的对象。

### `library.symbols`

* {Object}

包含先前已解析的符号地址（作为 `bigint` 值）的对象。

### `library.close()`

关闭库句柄。

`DynamicLibrary` 实现了显式资源管理协议，因此可以使用 [`using`][] 声明来管理库实例。离开包含作用域时会自动调用 `library.close()`。

```mjs
import { DynamicLibrary, suffix } from 'node:ffi';

{
  using lib = new DynamicLibrary(`./mylib.${suffix}`);
  // 在此处使用 `lib`；代码块退出时会调用 `lib.close()`。
}
```

多次调用 `library.close()`（或多次释放该库）不会产生任何效果。

在库关闭后：

* 已解析的函数包装器会变为无效。
* 进一步的符号与函数解析将抛出异常。
* 已注册的回调将被失效。

关闭库不会使之前导出的回调指针变得安全可复用。Node.js 不会跟踪或撤销已经交给原生代码的回调指针。

如果原生代码在 `library.close()` 之后或在 `library.unregisterCallback(pointer)` 之后仍持有回调指针，那么调用该指针将产生未定义行为，不被允许且很危险：它可能导致进程崩溃、产生不正确的输出，或破坏内存。原生代码必须在库关闭之前，或在回调被取消注册之前停止使用回调地址。

从库的某个活动回调内部调用 `library.close()` 不受支持且危险。回调必须在库被关闭之前返回。

### `library[Symbol.dispose]()` 

<!-- YAML
added: v26.1.0
-->

调用 `library.close()`。这允许 `DynamicLibrary` 实例与 [`using`][] 声明一起使用，以便在包含作用域退出时自动清理。对于已经关闭的库，这是一个空操作。

### `library.getFunction(name, signature)`

* `name` {string}
* `signature` {Object}
* 返回：{Function}

解析一个符号并返回一个可调用的 JavaScript 包装器。

返回的函数具有一个 `.pointer` 属性，其中包含原生函数地址（作为 `bigint`）。

如果同一个符号已经解析过，再次使用不同的签名请求它会抛出异常。使用相同的签名再次请求它会返回同一个函数，从 [`library.functions`][] 中读取它也是如此。

```cjs
const { DynamicLibrary, suffix } = require('node:ffi');

const lib = new DynamicLibrary(`./mylib.${suffix}`);
const add = lib.getFunction('add_i32', {
  arguments: ['i32', 'i32'],
  return: 'i32',
});

console.log(add(20, 22));
console.log(add.pointer);
```

### `library.getFunctions([definitions])`

* `definitions` {Object}
* 返回：{Object}

当提供 `definitions` 时，会解析每个具名符号并返回一个包含可调用包装器的对象。

当省略 `definitions` 时，会为该库中已经解析过的所有函数返回包装器。

### `library.getSymbol(name)`

* `name` {string}
* 返回：{bigint}

解析一个符号，并将其原生地址作为 `bigint` 返回。

### `library.getSymbols()`

* 返回：{Object}

返回一个包含所有先前已解析符号地址的对象。

### `library.registerCallback([signature,] callback)`

* `signature` {Object}
* `callback` {Function}
* 返回：{bigint}

创建一个由 JavaScript 函数支撑的原生回调指针。

当省略 `signature` 时，回调使用默认的 `void ()` 签名。

返回值是回调指针地址（作为 `bigint`）。它可以传递给期望回调指针的原生函数。

```cjs
const { DynamicLibrary, suffix } = require('node:ffi');

const lib = new DynamicLibrary(`./mylib.${suffix}`);

const callback = lib.registerCallback(
  { arguments: ['i32'], return: 'i32' },
  (value) => value * 2,
);
```

回调受以下限制：

* 它们必须在创建它们的同一系统线程上被调用。
* 它们不能抛出异常。
* 它们不能返回 promise。
* 它们必须返回与声明的返回类型兼容的值。
* 在运行时，它们不能对其所属库调用 `library.close()`。
* 在运行时，它们不能自行注销。

在回调内部关闭其所属库，或在回调执行时从内部对当前执行的回调进行注销，不受支持且危险。这样做可能导致进程崩溃、产生不正确的输出，或破坏内存。

### `library.unregisterCallback(pointer)`

* `pointer` {bigint}

释放一个先前由 `library.registerCallback()` 创建的回调。

对当前正在执行的回调调用 `library.unregisterCallback(pointer)` 不受支持且危险。回调必须在被注销前返回。

在 `library.unregisterCallback(pointer)` 返回之后，从原生代码调用该回调指针将产生未定义行为，不被允许且很危险：它可能导致进程崩溃、产生不正确的输出，或破坏内存。

### `library.refCallback(pointer)`

* `pointer` {bigint}

强引用由 JavaScript 持有的回调。

如果回调函数在之前调用 `library.unrefCallback(pointer)` 后已经被垃圾回收，则抛出 `ERR_INVALID_ARG_VALUE`，因为已被回收的函数无法再次建立引用。

### `library.unrefCallback(pointer)`

* `pointer` {bigint}

允许该回调被 JavaScript 以弱引用的方式持有。

如果该回调函数随后被垃圾回收，那么后续的原生调用将变成空操作（no-op）。在返回给原生代码之前，非 `void` 的返回值会被初始化为零。

如果回调函数已经被垃圾回收，则抛出 `ERR_INVALID_ARG_VALUE`。

## 调用原生函数

参数转换取决于声明的 FFI 类型。

对于 8 位、16 位和 32 位整数类型以及浮点类型，请传入与声明类型匹配的
JavaScript `number` 值。

对于 64 位整数类型（`i64` 和 `u64`），请传入 JavaScript `bigint` 值。

指针类参数：

* `null` 和 `undefined` 会作为空指针传入。
* `string` 值会被复制为临时的 NUL 终止 UTF-8 字符串，持续时间仅为该调用期间。
* `Buffer`、类型化数组（typed arrays）以及 `DataView` 实例会传入指向其底层内存的指针。
* `ArrayBuffer` 会传入指向其底层内存的指针。
* `bigint` 值会以原始指针地址的形式传入。

指针返回值将以 `bigint` 地址形式暴露。

## 原语内存访问辅助函数

以下辅助函数在原生指针处读取和写入原语值，且可以选择带字节偏移：

* `ffi.getInt8(pointer[, offset])`
* `ffi.getUint8(pointer[, offset])`
* `ffi.getInt16(pointer[, offset])`
* `ffi.getUint16(pointer[, offset])`
* `ffi.getInt32(pointer[, offset])`
* `ffi.getUint32(pointer[, offset])`
* `ffi.getInt64(pointer[, offset])`
* `ffi.getUint64(pointer[, offset])`
* `ffi.getFloat32(pointer[, offset])`
* `ffi.getFloat64(pointer[, offset])`
* `ffi.setInt8(pointer, offset, value)`
* `ffi.setUint8(pointer, offset, value)`
* `ffi.setInt16(pointer, offset, value)`
* `ffi.setUint16(pointer, offset, value)`
* `ffi.setInt32(pointer, offset, value)`
* `ffi.setUint32(pointer, offset, value)`
* `ffi.setInt64(pointer, offset, value)`
* `ffi.setUint64(pointer, offset, value)`
* `ffi.setFloat32(pointer, offset, value)`
* `ffi.setFloat64(pointer, offset, value)`

这些辅助函数执行直接的内存读取和写入。`pointer` 必须是一个
`bigint`，指向有效的可读或可写的原生内存。若提供 `offset`，则将其解释为相对于
`pointer` 的字节偏移。

用于读取的辅助函数会对 8 位、16 位和 32 位整数类型以及浮点类型返回 JavaScript 的
`number` 值。对于 64 位整数类型，它们返回 `bigint` 值。

用于写入的辅助函数需要显式的字节偏移，并在写入内存之前将提供的 JavaScript 值
与目标原生类型进行校验。
对于 `setInt64()` 和 `setUint64()`，直接接受 `bigint` 值；
数值输入必须是 JavaScript 安全整数范围内的整数。

```cjs
const {
  getInt32,
  setInt32,
} = require('node:ffi');

setInt32(ptr, 0, 42);
console.log(getInt32(ptr, 0));
```

与本模块中的其他“原始内存”辅助函数一样，这些 API 不会跟踪
所有权、边界或生命周期。传入无效指针、使用错误的偏移，或通过已经过期的指针写入，
都可能破坏内存或导致进程崩溃。

## 读取 NUL 终止的 UTF-8 字符串

<!-- YAML
added: v26.1.0
-->

* 偏移量 {bigint}
* 返回值: {string|null}

从原生内存读取一个 NUL 终止的 UTF-8 字符串。

如果 偏移量 为 0，则返回 null。

此函数不会验证 偏移量 是否指向可读取的内存，也不会验证其指向的数据是否以 NUL 终止。
传入无效指针、指向已释放内存的指针，或指向不包含终止 NUL 字节的字节序列，
可能读取到无关的内存、导致进程崩溃，或产生截断/乱码的输出。

```cjs
const { toString } = require('node:ffi');

const value = toString(ptr);
```

## 从原生内存创建 Buffer

<!-- YAML
added: v26.1.0
-->

* `pointer` {bigint}
* `length` {number}
* `copy` {boolean} 当 `false` 时，创建零拷贝视图。**默认：** `true`。
* 返回: {Buffer}

从原生内存创建一个 Buffer。

当 `copy` 为 `true` 时，返回的 `Buffer` 拥有其自身拷贝的内存。
当 `copy` 为 `false` 时，返回的 `Buffer` 将直接引用原始的原生内存。

使用 `copy: false` 是一个零拷贝“逃生通道”。返回的 `Buffer` 是对外部内存的可写视图，
因此在 JavaScript 中的写入会直接更新原始的原生内存。
调用者必须保证：

* `pointer` 在返回的 `Buffer` 的整个生命周期内保持有效。
* `length` 始终位于已分配的原生区域范围内。
* 当 JavaScript 仍在使用 `Buffer` 时，不会有原生代码释放或重新分配该内存用途。
* 必须遵守内存保护。例如，只读内存页不得写入。

如果无法满足这些保证，读取或写入 `Buffer` 可能会破坏内存或导致进程崩溃。

## 从原生内存创建 ArrayBuffer

<!-- YAML
added: v26.1.0
-->

* `pointer` {bigint}
* `length` {number}
* `copy` {boolean} 当 `false` 时，创建零拷贝视图。**默认：** `true`。
* 返回: {ArrayBuffer}

从原生内存创建一个 ArrayBuffer。

当 `copy` 为 `true` 时，返回的 `ArrayBuffer` 包含已拷贝的字节。
当 `copy` 为 `false` 时，返回的 `ArrayBuffer` 直接引用原始的原生内存。

此处同样适用为
[`ffi.toBuffer(pointer, length, copy)`][] 描述的生命周期和边界要求。
当 `copy: false` 时，返回的 `ArrayBuffer` 是对外部内存的零拷贝视图，
且仅在该内存保持已分配、布局不变且对整个暴露范围都有效时才是安全的。

## 将字符串复制到原生内存

<!-- YAML
added: v26.1.0
-->

* `string` {string}
* `pointer` {bigint}
* `length` {number}
* `encoding` {string} **默认：** `'utf8'`。

将一个 JavaScript 字符串复制到原生内存，并追加一个结尾 NUL 终止符。

`length` 必须足以容纳完整的已编码字符串以及后续的 NUL 终止符。
对于 UTF-16 和 UCS-2 编码，结尾终止符使用两个零字节。

`pointer` 必须指向可写的原生内存，并且可用存储至少为 `length` 字节。
此函数不会自行分配内存。

`string` 必须是一个 JavaScript 字符串。`encoding` 必须是一个字符串。

## `ffi.exportBuffer(buffer, pointer, length)`

<!-- YAML
added: v26.1.0
-->

* `buffer` {Buffer}
* `pointer` {bigint}
* `length` {number}

将字节从一个 `Buffer` 复制到原生内存。

`length` 至少必须等于 `buffer.length`。

`pointer` 必须指向可写的原生内存，并且可用存储至少为 `length` 字节。
此函数不会自行分配内存。

`buffer` 必须是一个 Node.js `Buffer`。

## `ffi.exportArrayBuffer(arrayBuffer, pointer, length)`

<!-- YAML
added: v26.1.0
-->

* `arrayBuffer` {ArrayBuffer}
* `pointer` {bigint}
* `length` {number}

将 `ArrayBuffer` 中的字节复制到本机内存。

`length` 必须至少等于 `arrayBuffer.byteLength`。

`pointer` 必须指向可写的本机内存，并且可用存储空间必须至少为 `length` 个字节。
此函数不会自行分配内存。

## `ffi.exportArrayBufferView(arrayBufferView, pointer, length)`

<!-- YAML
added: v26.1.0
-->

* `arrayBufferView` {ArrayBufferView}
* `pointer` {bigint}
* `length` {number}

将字节从一个 `ArrayBufferView` 复制到原生内存。

`length` 至少必须等于 `arrayBufferView.byteLength`。

`pointer` 必须指向可写的原生内存，并且可用存储至少为 `length` 字节。
此函数不会自行分配内存。

## `ffi.getRawPointer(source)`

<!-- YAML
added: v26.1.0
-->

* `source` {Buffer|ArrayBuffer|SharedArrayBuffer|ArrayBufferView}
* 返回值：{bigint}

返回由 JavaScript 管理的字节存储的原始内存地址。

这不安全且危险。如果底层内存被分离、重新调整大小、传递到别处或以其他方式失效，返回的指针可能会变得无效。
使用过期指针可能导致内存损坏或进程崩溃。

## `ffi.getCurrentEventLoop()`

<!-- YAML
added: v26.6.0
-->

* 返回：{bigint}

返回当前线程的 `uv_loop_t` 地址，类型为 `bigint`。

返回的地址对应当前 Node.js 环境。在主线程中，这就是主线程事件循环。在工作线程中，这就是该工作线程的事件循环。

这不安全且危险。返回的指针仅在当前环境的生命周期内有效。在环境退出后使用它，或者从假定不同线程或生命周期的原生代码中使用它，都可能导致进程崩溃或内存损坏。

## 安全说明

`node:ffi` 模块不会跟踪指针有效性、内存所有权或原生对象的生命周期。

特别是：

* 不要从已释放的内存中读取或写入。
* 原生内存释放后，不要在零拷贝视图上继续使用。
* 不要为原生符号声明不正确的签名。
* 当原生代码可能仍会调用回调时，不要取消注册回调。
* 不要在调用 `library.close()` 后，或在调用 `library.unregisterCallback(pointer)` 后再调用回调指针。
* 不要假设未定义的回调行为不会崩溃进程、产生错误输出或破坏内存。
* 不要假设指针返回值意味着所有权；调用者是否必须释放该返回地址完全取决于原生 API。

作为一般规则，除非必须要零拷贝访问，否则请优先使用拷贝值，并在原生侧保持回调和指针生命周期的显式管理。

[权限模型]: permissions.md#permission-model
[`--allow-ffi`]: cli.md#--allow-ffi
[`ffi.toBuffer(pointer, length, copy)`]: #ffitobufferpointer-length-copy
[`library.functions`]: #libraryfunctions
[`using`]: https://tc39.es/proposal-explicit-resource-management/#sec-using-declarations
[类型名称]: #type-names。
