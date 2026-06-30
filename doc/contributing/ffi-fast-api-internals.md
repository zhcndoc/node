# FFI Fast API 内部实现

本文档描述了 `node:ffi` Fast API
路径的内部实现。它面向正在开发 FFI 实现的贡献者，而不是
面向公共 API 的用户。

Fast API 路径是 FFI 调用的一层优化，适用于那些签名可以
由 V8 Fast API 元数据和生成的本地中转函数表示的调用。它
不会取代通用的 libffi 路径。相反，Node.js 会为每种签名创建
可用的最快可调用实现，并在不支持的调用形态、已优化失效的 V8 调用，
以及必须与公共 FFI API 保持一致的校验行为中保留通用路径可用。

## 目标

Fast API 的实现围绕以下目标设计：

* 将高频的标量 FFI 调用从通用 `v8::FunctionCallbackInfo` 路径中移出。
* 避免对常见的数值和类指针签名进行每次调用分配。
* 保留公共 `node:ffi` 行为和错误形状。
* 将字符串生命周期管理保留在 JavaScript 中，在那里可以显式
  拥有临时缓冲区。
* 将 SharedBuffer 和 Fast API 路由保持分离，并由 `lib/ffi.js` 组合
  这两层包装。
* 使用按签名生成的本地代码，而不是在中转函数内部使用运行时循环。
* 当可执行内存、平台中转函数支持或签名资格不可用时，能够平滑回退。

## 主要文件

实现分散在以下文件中：

* `src/ffi/fast.h` 声明了 Fast API 类型模型、元数据容器、
  检测查询和平台 trampoline 钩子。
* `src/ffi/fast.cc` 将公开的 FFI 类型名称映射到 Fast API 类型，创建 V8
  `CFunctionInfo` 元数据，检查 JIT 内存支持和签名适用性，
  并提供生成 trampoline 所用的缓冲区转换辅助函数。
* `src/ffi/jit_memory.{h,cc}` 执行运行时可执行内存自检，
  用于决定当前进程是否允许使用生成的 trampoline。
* `src/ffi/types.{h,cc}` 解析公开的 FFI 签名并实现
  `IsFastCallEligible()`，用于拒绝当前 Fast API trampoline 无法表示的签名。
* `src/ffi/platforms/*.cc` 包含平台 trampoline 生成器。这些
  文件遵循 `node_ffi_create_fast_trampoline()` 暴露的约定，并
  以 `node_ffi_free_fast_trampoline()` 释放代码。
* `src/node_ffi.cc` 决定函数获得的是 Fast API 可调用对象、
  SharedBuffer 可调用对象还是通用可调用对象，并附加 JavaScript 包装器使用的隐藏元数据。
* `src/node_ffi.h` 将 `FastFFIMetadata` 对象存储在 `FFIFunctionInfo` 中，以便 V8
  元数据和生成的可执行代码能与 JavaScript 函数一起保持存活。
* `lib/ffi.js` 是公共模块包装器。它补丁 `DynamicLibrary` 方法
  并组合 SharedBuffer 和 Fast API 包装器。
* `lib/internal/ffi/fast-api.js` 为 Fast API 调用执行 JavaScript 侧指针转换。
* `lib/internal/ffi-shared-buffer.js` 仅包含 SharedBuffer 特有的
  参数打包和结果拆包。

## 原生元数据创建

`DynamicLibrary::CreateFunction()` 会为每个生成的 JavaScript 函数创建一个 `FFIFunctionInfo`。该对象持有已解析的 `FFIFunction`，通过内部字段保持所属的 `DynamicLibrary` 对象存活，并拥有任何已优化的调用元数据。

创建流程如下：

1. 调用 `CreateFastFFIMetadata(*fn)`。
2. 如果创建了 Fast API 元数据，则使用一个同时包含常规回调和 Fast API `v8::CFunction` 的 V8 `FunctionTemplate` 绑定该 JavaScript 函数。
3. 如果无法创建 Fast API 元数据，则对符合条件的签名尝试 SharedBuffer 路径。
4. 如果两种优化路径都不适用，则绑定通用的 `InvokeFunction` 路径。

从 `CreateFastFFIMetadata()` 返回 `nullptr` 并不是一个公共签名错误。这只表示当前的 Fast API 实现无法优化该签名，或者无法安全地分配可执行的 trampoline 内存。随后调用方会回退到另一种调用策略。

## 运行时支持检测

Fast API 路径需要平台 trampoline 生成器和可执行内存。`IsFastCallSupported()` 是对此的粗粒度进程级查询。它仅在受支持的架构上且 `IsJitMemorySupported()` 成功时返回 true。

`IsJitMemorySupported()` 会运行一次性的自检：

* 映射一个可写的匿名页面。
* 为当前架构写入一条最小返回指令。
* 在需要时刷新指令缓存。
* 尝试使用 `mprotect(PROT_READ |
  PROT_EXEC)` 将页面转换为可读/可执行。
* 取消映射该页面，并使用 `std::call_once` 缓存最终结果。

该探测有意不执行生成的指令。执行新写入的能力探测代码可能会在阻止生成代码的系统上终止进程。真正的 trampoline 生成器在创建可调用 trampoline 时会执行相同的从可写到可执行的转换，并在被拒绝时回退。Windows 使用 `VirtualAlloc`、`VirtualProtect` 和 `FlushInstructionCache` 进行相同的探测。

## 签名资格

`IsFastCallEligible()` 会在原生代码生成之前拒绝签名。这
将不受支持的情况挡在跳板发射器之外，并让
`CreateFastFFIMetadata()` 能够干净地返回 `nullptr`。

资格要求：

* 支持的平台发射器：AArch64、x86\_64 SysV、Win64 x64、PPC64LE
  ELFv2、LoongArch64、RISC-V 64 或 s390x。
* 返回类型必须是数值、指针或 `void`。
* 参数类型必须是数值或指针。`void` 不能作为参数。
* 不能有 `function` 类型的参数或返回值。
* 最多八个公开参数，符合 V8 的快速调用上限。
* `fn.args` 和 `fn.arg_type_names` 长度必须匹配。
* 寄存器压力必须能适配当前的跳板生成器。

AArch64 的资格规则与 `src/ffi/platforms/arm64.cc` 一致：

* `x0` 被 V8 的接收者占用，因此用户 GP 参数会从 `x1..x7` 开始到达。
* FP 参数使用 `v0..v7`。
* `buffer` 和 `arraybuffer` 参数使用 `v8::Local<v8::Value>` 加上
  `FastApiCallbackOptions`，因此会额外消耗一个 GP 槽位。
* 缓冲区形状的参数不能与 FP 参数共存，因为辅助函数调用
  需要保留 FP 状态。
* 有效 GP 数量最多为 7，FP 数量最多为 8。

x86\_64 SysV 的资格规则与 `src/ffi/platforms/x64.cc` 一致：

* `rdi` 被 V8 的接收者占用，留下 `rsi`、`rdx`、`rcx`、`r8` 和
  `r9` 用于传入的 GP 参数。
* 标量签名最多可从调用方栈中再加载一个用户 GP 参数
  到目标 ABI 的第六个 GP 寄存器中，因此有效上限为 6 个 GP
  参数。
* FP 参数使用 `xmm0..xmm7`。
* 缓冲区形状的参数使用辅助函数调用并且保持仅寄存器传递，因此
  传入的 GP 数量上限为 5，且缓冲区形状的参数不能与 FP 参数共存。

Win64 x64 的资格规则与 `src/ffi/platforms/x64.cc` 中保守的 Windows 发射器一致：

* JavaScript 接收者占用第一个位置寄存器槽位。
* 公共参数从位置 1..3 平移到位置 0..2。
* 整数和 FP 参数按照它们在 Win64 中的位置寄存器槽位处理。
* 当前只有最多三个公共参数的仅标量、仅寄存器签名符合资格。
* 缓冲区形状的参数和通过栈传递的参数会回退。

PPC64LE 的资格规则与 `src/ffi/platforms/ppc64.cc` 一致：

* `r3` 被 V8 的接收者占用，因此用户 GP 参数会从 `r4..r10` 开始到达。
* FP 参数使用 FPR，并且不会因接收者槽位而平移。
* 生成的跳板只平移 GP 寄存器，并通过 `ctr` 尾分支到
  目标，其中在 ELFv2 全局入口中目标地址位于 `r12`。
* 当前只有仅标量、仅寄存器签名符合资格。
* 缓冲区形状的参数、通过栈传递的参数、窄返回值以及 PPC64BE
  平台会回退。AIX/PPC64BE 有意不作为当前
  Fast FFI 跳板工作的目标，因为其 ABI/链接形态需要单独设计。

LoongArch64 的资格规则与 `src/ffi/platforms/loong64.cc` 一致：

* `a0` 被 V8 的接收者占用，因此用户 GP 参数会从 `a1..a7` 开始到达。
* FP 参数使用 `fa0..fa7`，并且不会因接收者槽位而平移。
* 生成的跳板只平移 GP 寄存器，并通过 `jirl` 尾分支到
  目标。
* 当前只有仅标量、仅寄存器签名符合资格。
* 缓冲区形状的参数、通过栈传递的参数以及窄返回值会回退。

RISC-V 64 的资格规则与 `src/ffi/platforms/riscv64.cc` 一致：

* `a0` 被 V8 的接收者占用，因此用户 GP 参数会从 `a1..a7` 开始到达。
* FP 参数使用 `fa0..fa7`，并且不会因接收者槽位而平移。
* 生成的跳板只平移 GP 寄存器，并通过 `jalr` 尾分支到
  目标。
* 当前只有仅标量、仅寄存器签名符合资格。
* 缓冲区形状的参数、通过栈传递的参数以及窄返回值会回退。

s390x 的资格规则与 `src/ffi/platforms/s390x.cc` 一致：

* `r2` 被 V8 的接收者占用，因此用户 GP 参数会从 `r3..r6` 开始到达。
* FP 参数使用 `f0`、`f2`、`f4` 和 `f6`，并且不会因接收者
  槽位而平移。
* 生成的跳板只平移 GP 寄存器，并通过 `br` 尾分支到
  目标。
* 当前只有仅标量、仅寄存器签名符合资格。
* 缓冲区形状的参数、通过栈传递的参数以及窄返回值会回退。

原生跳板生成器仍然会重复执行它自己的寄存器检查。资格函数
是早期的集中式拒绝点；生成器中的检查则是针对直接或未来调用方的防御措施。

## FastFFIType

内部的 `FastFFIType` 枚举故意比公开的 FFI 类型
范围更小。它描述了生成的 trampoline 知道如何直接
进行 marshaling 的 ABI 类别：

* `kVoid`
* `kBool`
* 有符号和无符号的 8 位、16 位、32 位和 64 位整数
* `kFloat32`
* `kFloat64`
* `kPointer`
* `kBuffer`

公开别名会在 `FastScalarTypeFromName()` 和
`FastArgTypeFromName()` 中被标准化。

`pointer`、`ptr`、`string`、`str`、`buffer` 和 `arraybuffer` 都表示
目标 ABI 边界上的指针大小本地值。它们的区别在于
在调用目标函数之前，如何接受并转换 JavaScript 值。`function` 对于通用 FFI 接口来说是指针大小的，但当前
Fast API 资格检查会拒绝它，因此会回退。

## V8 CFunction 元数据

`CreateFastFFIMetadata()` 会创建一个 `FastFFIMetadata` 对象。该对象拥有：

* `FastFFITrampoline trampoline`，由 V8 调用的可执行桥接。
* `std::vector<v8::CTypeInfo> arg_info`，V8 类型列表。
* `std::unique_ptr<v8::CFunctionInfo> c_function_info`，V8 签名对象。
* `v8::CFunction c_function`，附加到 `FunctionTemplate` 的句柄。

元数据对象必须拥有 `arg_info` 和 `c_function_info`，因为 V8 会在其中保存
指针。函数仍然存活时销毁或移动这些存储
都会让 V8 持有悬空指针。

第一个 V8 参数始终是 JavaScript 接收者。因此，
`CreateFastFFIMetadata()` 会在
公开 FFI 参数之前预置一个 `v8::CTypeInfo::Type::kV8Value` 条目。

如果任何参数或返回值需要 64 位整数或指针，V8
`CFunctionInfo` 就会配置为 BigInt 表示。这样可以避免
指针大小值和 64 位整数的精度损失。

缓冲区形状的参数还需要一个额外的
`CTypeInfo::kCallbackOptionsType` 条目，这样 `node_ffi_fast_buffer_data()` 才能在转换失败时
通过 `FastApiCallbackOptions` 抛出错误。

## 生成的跳板

生成的跳板将 V8 的快速 API 调用约定桥接到库符号所期望的本地 ABI。其职责如下：

* 将传入的 V8 快速 API 参数移动到目标本地函数期望的寄存器中。
* 在 V8 扩展 8 位和 16 位整数参数后，将其缩窄。
* 将 `kBuffer` 参数从 V8 值转换为 backing-store 指针。
* 调用目标符号或尾跳转到目标符号。
* 在 V8 观察到之前，规范化窄整数返回值。
* 使用平台 ABI 将控制权返回给 V8。

跳板按每个签名生成。它不会在运行时借助元数据表循环遍历参数。代码生成器在发出指令时可能会循环，但生成的代码是针对该签名专门定制的直线型桥接。

可执行内存会先分配为可写，填充指令后，按平台要求刷新指令缓存，然后标记为可执行。`FastFFIMetadata` 会在 JavaScript 函数被收集时，通过 `node_ffi_free_fast_trampoline()` 释放该内存。清理操作是幂等的，并且对部分初始化的元数据也是安全的。

## 缓冲区和 ArrayBuffer 参数

快速 API 缓冲区参数在内部表示为 `FastFFIType::kBuffer`。在 V8 元数据中，它们被描述为 `v8::Local<v8::Value>`，而不是 `uint64_t`。这使生成的跳板能够接收原始 JavaScript 对象，并在调用本地目标之前立即调用 `node_ffi_fast_buffer_data()`。

`node_ffi_fast_buffer_data()` 接受：

* `Buffer` 以及其他 ArrayBuffer 视图
* `ArrayBuffer`
* `SharedArrayBuffer`

对于视图，指针是 backing store 加上 `byteOffset`。对于 ArrayBuffer 和 SharedArrayBuffer，指针是 backing store 的起始位置。

无效值会导致辅助函数通过 `FastApiCallbackOptions` 抛出异常，并返回一个哨兵值。生成的跳板会检查该哨兵值，并在不调用本地目标的情况下返回零。这样可以防止在 JavaScript 校验失败后，本地代码观察到无效指针。

## 指针类参数

指针类公共类型包括 `pointer`、`ptr`、`string` 和 `str`。它们在标量 Fast API 签名中表示为原始无符号指针值。

`lib/internal/ffi/fast-api.js` 中的 JavaScript 包装器会在进入标量 Fast API 函数之前，将可接受的非 BigInt 值转换为其他形式：

* `null` 和 `undefined` 会变为 `0n`。
* 字符串会变为临时的以 NUL 结尾的 UTF-8 缓冲区。
* 基于 Buffer 和 ArrayBuffer 的值会变为后备存储指针。

将这些转换保留在 JavaScript 中，可以保持公共 FFI 语义，并使临时对象的生命周期保持显式。

## 字符串参数

字符串转换有意保留在 JavaScript 中。`string`、`str` 或指针类参数接受的字符串，会被编码为一个带有尾随 NUL 字节的临时 Buffer。该 Buffer 的指针会传递给标量 Fast API 函数。

每个拥有的 `DynamicLibrary` 都会保留一个隐藏的字符串转换条目数组。每个参数索引都会获得一个可复用条目。如果同一个字符串再次传入相同的参数索引，包装器会复用现有的已编码缓冲区和指针。这是一种单条目复用策略，而不是无限缓存。缓冲区会在需要时增长，并由 `DynamicLibrary` 对象保持存活。

这种设计避免了原生生命周期歧义。生成的跳板函数从不分配临时字符串存储，也从不需要猜测转换后字符串的指针应当保持存活多长时间。

## 指针签名的辅助缓冲区调用

一个单一的类指针函数可以通过两种不同的方式高效调用：

* 使用标量指针值，例如 `BigInt`、`null`，或字符串转换后的
  指针。
* 使用内存对象，例如 `Buffer`、类型数组、`DataView`、
  `ArrayBuffer` 或 `SharedArrayBuffer`。

这两种情况需要不同的 V8 Fast API 表示。标量情况
使用 `uint64_t`/BigInt 形状的参数。内存对象情况使用
`v8::Local<v8::Value>` 参数，因此生成的中转桥接代码可以提取
后备存储指针。

对于单态的单参数类指针签名，原生代码可以在隐藏的
`kFastBufferInvoke` 符号下附加一个辅助函数。这个辅助
函数使用克隆出来的签名，其中类指针参数在 Fast API 元数据中被描述为
`buffer`，同时仍然调用相同的原生
目标符号。

JavaScript 包装器仅在运行时参数是 Buffer 或带 ArrayBuffer 后备存储的内存时才会分派到这个辅助函数。其他指针输入使用
主标量 Fast API 函数。

这样可以让这两种重要的调用形态都保持快速。用缓冲区形状的函数替换主标量 Fast
API 函数会简化机制，但这会迫使 BigInt、null 以及字符串转换后的指针调用走上更慢的回退路径。保留这两个入口点可以为两种指针表示形式都维持性能。

## 隐藏符号

原生代码使用按 isolate 分配的符号，将内部元数据附加到原始生成函数上。这些符号通过 `internalBinding('ffi')` 导出，不属于公共 API。

SharedBuffer 元数据使用：

* `kSbSharedBuffer`
* `kSbInvokeSlow`
* `kSbArguments`
* `kSbReturn`

Fast API 元数据使用：

* `kFastArguments`
* `kFastBufferInvoke`

这两组设计上是分开的。SharedBuffer 包装器不应需要 Fast API 元数据，Fast API 包装器也不应需要 SharedBuffer 元数据。`lib/ffi.js` 是组合层，它会读取这两组信息并决定应用哪种包装器。

## JavaScript 包装器路由

`lib/ffi.js` 会补丁原生的 `DynamicLibrary` 方法，这些方法会暴露生成的函数：

* `DynamicLibrary.prototype.getFunction`
* `DynamicLibrary.prototype.getFunctions`
* `DynamicLibrary.prototype.functions` 访问器

这三条路径都会在将函数返回给用户代码之前调用 `wrapFFIFunction()`。

`wrapFFIFunction()` 会按以下顺序应用包装器：

1. 当调用方没有传入显式签名时，例如通过 `functions` 访问器，恢复隐藏的 SharedBuffer 或 Fast API 参数元数据。
2. 为原始 Fast API 函数初始化 Fast API 缓冲区元数据。
3. 尝试 `wrapWithSharedBuffer()`。
4. 如果 SharedBuffer 未应用，再尝试 `wrapWithRawPointerConversions()`。
5. 如果不需要包装器，则返回原始的未修改函数。

这种顺序将 SharedBuffer 特定行为保留在 `lib/internal/ffi-shared-buffer.js` 中，将 Fast API 指针转换行为保留在 `lib/internal/ffi/fast-api.js` 中，并将公共包装器编排保留在 `lib/ffi.js` 中。

Fast API 原始指针转换包装器专门为 1、2 和 3 个参数的情况做了特化，以避免在常见调用形态下分配剩余参数。更大的签名在转换所需的参数索引后，会使用通用的 `ReflectApply()` 路径。

## SharedBuffer 回退

SharedBuffer 仍然是一个独立的优化路径，适用于不使用
Fast API 但仍然可以避免按参数原生转换开销的签名。SharedBuffer
包装器将参数写入固定的 8 字节槽位布局，调用一个不带 JavaScript
参数的原生函数，并从
槽位零读取返回值。

使用 SharedBuffer 的指针签名会在
`kSbInvokeSlow` 下附加一个慢速调用器。该包装器对 BigInt 和空值
指针值使用 SharedBuffer 路径，并对需要通用原生转换路径的值回退到慢速调用器。

Fast API 和 SharedBuffer 是相互独立的。一个函数要么使用 Fast API
路径，要么使用 SharedBuffer 路径，要么使用通用路径，作为其主要原生可调用入口。
`lib/ffi.js` 仅组合所需的 JavaScript 包装器，以保持公开的
参数行为。

## 通用回退行为

每个 Fast API 函数也都会绑定传统的原生回调。
当某个 JavaScript 调用点不符合 Fast API 路径条件时，V8 可以调用该回调。
当元数据创建拒绝某个签名时，Node.js 也会直接使用通用路径。

通用路径仍然负责完整的校验和公开错误兼容性。Fast 包装器应当对它们在 JavaScript 中执行的转换匹配这些错误。

## 参数数量和签名限制

Fast API 路径有意只支持一组有限的签名。这样可以让 V8 元数据、包装器专门化以及生成的跳板保持简单且可预测。超出该范围的签名会回退到 SharedBuffer 或通用路径。

重要限制如下：

* 在 ABI 特定寄存器检查之前，公共参数最多为 8 个。
* 当前 AArch64 跳板中不允许栈参数。
* 当前 x86\_64 SysV 跳板中最多允许 1 个从栈加载的标量 GP 参数。
* 当前 Win64 x64 跳板中不允许栈参数或缓冲区形状参数。
* 当前 PPC64LE 跳板中不允许栈参数、缓冲区形状参数或窄返回值。
* 当前 LoongArch64、RISC-V 64 和 s390x 跳板中不允许栈参数、缓冲区形状参数或窄返回值。
* 不允许混合使用缓冲区形状参数和 FP 参数。
* Fast API 路径中不允许使用 `function` 参数或返回类型。

Linux x86 和 armv7 是实验性的 Node.js 平台，但当前的 Fast FFI 跳板模型仍然仅支持 64 位。它们继续使用 SharedBuffer 或通用 libffi 回退路径。Linux s390x 是 Node.js 的二级平台，但该目标当前未启用内置 FFI；如果使用 `--shared-ffi` 构建，则仅使用标量寄存器的 Fast API FFI 可以使用 s390x 发射器。AIX PPC64BE 有意未被此实现覆盖。

这些是优化边界，而不是公共 FFI 签名边界。用户代码仍然可以通过回退路径调用受支持的公共 FFI 签名。

## 包装器元数据保留

JavaScript 包装器会保留选定的公共函数元数据：

* `name`
* `length`
* `pointer`

`pointer` 属性会镜像原始函数的指针描述符，因此读取或重新赋值它的用户
代码在通过包装器时仍可正常工作。内部以 Symbol 作为键的元数据不会转发到包装器。
