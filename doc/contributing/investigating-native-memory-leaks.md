# 使用 Valgrind 调查内存泄漏

由于过度消耗本地内存，Node.js 进程可能会耗尽内存。本地内存是指不受 V8 垃圾回收器管理的内存，它由 Node.js 运行时、其依赖项或本地 [addons](https://nodejs.org/docs/latest/api/n-api.html) 分配。

本指南提供了如何在 Linux 平台上使用 Valgrind 调查这些问题的信息。

## Valgrind

[Valgrind](https://valgrind.org/docs/manual/quick-start.html) 是 Linux 发行版中可用的一个工具，可用于调查内存使用情况，包括识别内存泄漏（已分配但未释放的内存）以及其他与内存相关的问题，例如重复释放内存。

使用 Valgrind 时：

* 要有耐心，在 Valgrind 下运行会由于执行的检查而显著减慢速度。
* 将测试用例缩减到最小可复现版本。由于速度变慢，运行最小测试用例非常重要，这样才能在合理时间内完成。

## 安装

在大多数情况下，它是可选软件包，必须显式安装。例如在 Debian/Ubuntu 上：

```bash
apt-get install valgrind
```

## 调用方式

Valgrind 最简单的调用方式是：

```bash
valgrind node test.js
```

输出如下：

```console
user1@minikube1:~/valgrind/node-addon-examples/1_hello_world/napi$ valgrind node test.js
==28993== Memcheck, a memory error detector
==28993== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28993== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info
==28993== Command: node test.js
==28993==
==28993== Use of uninitialised value of size 8
==28993==    at 0x12F2279: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0x12F3E9C: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0x12F3C77: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0xC7C9CF: v8::internal::(anonymous namespace)::Invoke(v8::internal::Isolate*, v8::internal::(anonymous namespace)::InvokeParams const&) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0xC7CE87: v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==    by 0xB4CF3A: v8::Function::Call(v8::Local<v8::Context>, v8::Local<v8::Value>, int, v8::Local<v8::Value>*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==28993==
--28993-- WARNING: unhandled amd64-linux syscall: 332
--28993-- You may be able to write your own handler.
--28993-- Read the file README_MISSING_SYSCALL_OR_IOCTL.
--28993-- Nevertheless we consider this a bug.  Please report
--28993-- it at http://valgrind.org/support/bug_reports.html.
==28993==
==28993== HEAP SUMMARY:
==28993==     in use at exit: 6,140 bytes in 23 blocks
==28993==   total heap usage: 12,888 allocs, 12,865 frees, 13,033,244 bytes allocated
==28993==
==28993== LEAK SUMMARY:
==28993==    definitely lost: 0 bytes in 0 blocks
==28993==    indirectly lost: 0 bytes in 0 blocks
==28993==      possibly lost: 304 bytes in 1 blocks
==28993==    still reachable: 5,836 bytes in 22 blocks
==28993==         suppressed: 0 bytes in 0 blocks
==28993== Rerun with --leak-check=full to see details of leaked memory
==28993==
==28993== For counts of detected and suppressed errors, rerun with: -v
==28993== Use --track-origins=yes to see where uninitialised values come
```

这表明 Node.js 并不是 _完全_ 干净的，因为进程关闭时仍有一些已分配但未释放的内存。通常在这方面做到完全干净是不切实际的/不值得。现代操作系统会在进程关闭后清理其内存，而为了获得干净的报告而尝试释放所有内存，可能会对代码复杂度和关闭时间产生负面影响。Node.js 做得相当不错，在关闭时只留下大约 6 KB 未释放。

## 一个明显的内存泄漏

泄漏可能会在本地 addon 中引入，下面是一个基于 [node-addon-examples](https://github.com/nodejs/node-addon-examples) 中“Hello world” addon 的简单泄漏示例。

在这个示例中，添加了一个循环，它会分配约 1 MiB 的内存但从不释放：

```cpp
void* malloc_holder = nullptr;
napi_value Method(napi_env env, napi_callback_info info) {
  napi_status status;
  napi_value world;
  status = napi_create_string_utf8(env, "world", 5, &world);
  assert(status == napi_ok);

  // 新的泄漏在这里
  for (int i=0; i < 1024; i++) {
    malloc_holder = malloc(1024);
  }

  return world;
}
```

在尝试制造内存泄漏时，需要确保编译器没有优化掉创建泄漏的代码。例如，如果将分配结果赋值给全局变量，或者赋值给之后会被读取的变量，编译器就不会连同 malloc 一起把它优化掉，Valgrind 也会正确报告内存泄漏。如果将上面示例中的 `malloc_holder` 改成局部变量，那么编译器可能会连同这些分配一起自由地移除它（因为它没有被使用），Valgrind 也就不会找到任何泄漏，因为它们在运行的代码中已经不存在了。

在这段代码上运行 Valgrind 会显示如下内容：

```console
user1@minikube1:~/valgrind/node-addon-examples/1_hello_world/napi$ valgrind node hello.js
==1504== Memcheck, a memory error detector
==1504== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1504== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info
==1504== Command: node hello.js
==1504==
==1504== Use of uninitialised value of size 8
==1504==    at 0x12F2279: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0x12F3E9C: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0x12F3C77: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0xC7C9CF: v8::internal::(anonymous namespace)::Invoke(v8::internal::Isolate*, v8::internal::(anonymous namespace)::InvokeParams const&) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0xC7CE87: v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==    by 0xB4CF3A: v8::Function::Call(v8::Local<v8::Context>, v8::Local<v8::Value>, int, v8::Local<v8::Value>*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==1504==
--1504-- WARNING: unhandled amd64-linux syscall: 332
--1504-- You may be able to write your own handler.
--1504-- Read the file README_MISSING_SYSCALL_OR_IOCTL.
--1504-- Nevertheless we consider this a bug.  Please report
--1504-- it at http://valgrind.org/support/bug_reports.html.
world
==1504==
==1504== HEAP SUMMARY:
==1504==     in use at exit: 1,008,003 bytes in 1,032 blocks
==1504==   total heap usage: 17,603 allocs, 16,571 frees, 18,306,103 bytes allocated
==1504==
==1504== LEAK SUMMARY:
==1504==    definitely lost: 996,064 bytes in 997 blocks
==1504==    indirectly lost: 0 bytes in 0 blocks
==1504==      possibly lost: 3,304 bytes in 4 blocks
==1504==    still reachable: 8,635 bytes in 31 blocks
==1504==                       of which reachable via heuristic:
==1504==                         multipleinheritance: 48 bytes in 1 blocks
==1504==         suppressed: 0 bytes in 0 blocks
==1504== Rerun with --leak-check=full to see details of leaked memory
==1504==
==1504== For counts of detected and suppressed errors, rerun with: -v
==1504== Use --track-origins=yes to see where uninitialised values come from
==1504== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

Valgrind 报告了一个问题，因为它显示 996,604 字节为 definitely lost，问题在于如何找到这些内存是在哪里分配的。下一步是按照输出中的建议重新运行，使用 `--leak-check=full`：

```bash
user1@minikube1:~/valgrind/node-addon-examples/1_hello_world/napi$ valgrind --leak-check=full node hello.js
==4174== Memcheck, a memory error detector
==4174== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4174== Using Valgrind-3.13.0 and LibVEX; rerun with -h for copyright info
==4174== Command: node hello.js
==4174==
==4174== Use of uninitialised value of size 8
==4174==    at 0x12F2279: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F3E9C: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F3C77: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xC7C9CF: v8::internal::(anonymous namespace)::Invoke(v8::internal::Isolate*, v8::internal::(anonymous namespace)::InvokeParams const&) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xC7CE87: v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xB4CF3A: v8::Function::Call(v8::Local<v8::Context>, v8::Local<v8::Value>, int, v8::Local<v8::Value>*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==
--4174-- WARNING: unhandled amd64-linux syscall: 332
--4174-- You may be able to write your own handler.
--4174-- Read the file README_MISSING_SYSCALL_OR_IOCTL.
--4174-- Nevertheless we consider this a bug.  Please report
--4174-- it at http://valgrind.org/support/bug_reports.html.
world
==4174==
==4174== HEAP SUMMARY:
==4174==     in use at exit: 1,008,003 bytes in 1,032 blocks
==4174==   total heap usage: 17,606 allocs, 16,574 frees, 18,305,977 bytes allocated
==4174==
==4174== 64 bytes in 1 blocks are definitely lost in loss record 17 of 35
==4174==    at 0x4C3017F: operator new(unsigned long) (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==4174==    by 0x9AEAD5: napi_module_register (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x4010732: call_init (dl-init.c:72)
==4174==    by 0x4010732: _dl_init (dl-init.c:119)
==4174==    by 0x40151FE: dl_open_worker (dl-open.c:522)
==4174==    by 0x5D052DE: _dl_catch_exception (dl-error-skeleton.c:196)
==4174==    by 0x40147C9: _dl_open (dl-open.c:605)
==4174==    by 0x4E3CF95: dlopen_doit (dlopen.c:66)
==4174==    by 0x5D052DE: _dl_catch_exception (dl-error-skeleton.c:196)
==4174==    by 0x5D0536E: _dl_catch_error (dl-error-skeleton.c:215)
==4174==    by 0x4E3D734: _dlerror_run (dlerror.c:162)
==4174==    by 0x4E3D050: dlopen@@GLIBC_2.2.5 (dlopen.c:87)
==4174==    by 0x9B29A0: node::binding::DLOpen(v8::FunctionCallbackInfo<v8::Value> const&)::{lambda(node::binding::DLib*)#1}::operator()(node::binding::DLib*) const (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==
==4174== 304 bytes in 1 blocks are possibly lost in loss record 27 of 35
==4174==    at 0x4C31B25: calloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==4174==    by 0x40134A6: allocate_dtv (dl-tls.c:286)
==4174==    by 0x40134A6: _dl_allocate_tls (dl-tls.c:530)
==4174==    by 0x5987227: allocate_stack (allocatestack.c:627)
==4174==    by 0x5987227: pthread_create@@GLIBC_2.2.5 (pthread_create.c:644)
==4174==    by 0xAAF9DC: node::inspector::Agent::Start(std::string const&, node::DebugOptions const&, std::shared_ptr<node::HostPort>, bool) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x9A8BE7: node::Environment::InitializeInspector(std::unique_ptr<node::inspector::ParentInspectorHandle, std::default_delete<node::inspector::ParentInspectorHandle> >) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xA1C9A5: node::NodeMainInstance::CreateMainEnvironment(int*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xA1CB42: node::NodeMainInstance::Run() (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x9ACB67: node::Start(int, char**) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x5BBFB96: (below main) (libc-start.c:310)
==4174==
==4174== 2,000 bytes in 2 blocks are possibly lost in loss record 33 of 35
==4174==    at 0x4C2FB0F: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==4174==    by 0x9794979: Method(napi_env__*, napi_callback_info__*) (in /home/user1/valgrind/node-addon-examples/1_hello_world/napi/build/Release/hello.node)
==4174==    by 0x98F764: v8impl::(anonymous namespace)::FunctionCallbackWrapper::Invoke(v8::FunctionCallbackInfo<v8::Value> const&) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xBA6FC8: v8::internal::MaybeHandle<v8::internal::Object> v8::internal::(anonymous namespace)::HandleApiCallHelper<false>(v8::internal::Isolate*, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::FunctionTemplateInfo>, v8::internal::Handle<v8::internal::Object>, v8::internal::BuiltinArguments) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xBA8DB6: v8::internal::Builtin_HandleApiCall(int, unsigned long*, v8::internal::Isolate*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x1376358: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==
==4174== 997,000 bytes in 997 blocks are definitely lost in loss record 35 of 35
==4174==    at 0x4C2FB0F: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==4174==    by 0x9794979: Method(napi_env__*, napi_callback_info__*) (in /home/user1/valgrind/node-addon-examples/1_hello_world/napi/build/Release/hello.node)
==4174==    by 0x98F764: v8impl::(anonymous namespace)::FunctionCallbackWrapper::Invoke(v8::FunctionCallbackInfo<v8::Value> const&) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xBA6FC8: v8::internal::MaybeHandle<v8::internal::Object> v8::internal::(anonymous namespace)::HandleApiCallHelper<false>(v8::internal::Isolate*, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::FunctionTemplateInfo>, v8::internal::Handle<v8::internal::Object>, v8::internal::BuiltinArguments) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xBA8DB6: v8::internal::Builtin_HandleApiCall(int, unsigned long*, v8::internal::Isolate*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x1376358: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==
==4174== LEAK SUMMARY:
==4174==    definitely lost: 997,064 bytes in 998 blocks
==4174==    indirectly lost: 0 bytes in 0 blocks
==4174==      possibly lost: 2,304 bytes in 3 blocks
==4174==    still reachable: 8,635 bytes in 31 blocks
==4174==                       of which reachable via heuristic:
==4174==                         multipleinheritance: 48 bytes in 1 blocks
==4174==         suppressed: 0 bytes in 0 blocks
==4174== Reachable blocks (those to which a pointer was found) are not shown.
==4174== To see them, rerun with: --leak-check=full --show-leak-kinds=all
==4174==
==4174== For counts of detected and suppressed errors, rerun with: -v
==4174== Use --track-origins=yes to see where uninitialised values come from
==4174== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```

这部分报告最有意思：

```console
==4174== 997,000 bytes in 997 blocks are definitely lost in loss record 35 of 35
==4174==    at 0x4C2FB0F: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==4174==    by 0x9794979: Method(napi_env__*, napi_callback_info__*) (in /home/user1/valgrind/node-addon-examples/1_hello_world/napi/build/Release/hello.node)
==4174==    by 0x98F764: v8impl::(anonymous namespace)::FunctionCallbackWrapper::Invoke(v8::FunctionCallbackInfo<v8::Value> const&) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xBA6FC8: v8::internal::MaybeHandle<v8::internal::Object> v8::internal::(anonymous namespace)::HandleApiCallHelper<false>(v8::internal::Isolate*, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::FunctionTemplateInfo>, v8::internal::Handle<v8::internal::Object>, v8::internal::BuiltinArguments) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xBA8DB6: v8::internal::Builtin_HandleApiCall(int, unsigned long*, v8::internal::Isolate*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x1376358: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
```

从堆栈跟踪中可以看出，泄漏来自一个本地 addon：

```console
==4174==    by 0x9794979: Method(napi_env__*, napi_callback_info__*) (in /home/user1/valgrind/node-addon-examples/1_hello_world/napi/build/Release/hello.node)
```

但我们无法看出本地 addon 中究竟是哪一处在分配这段内存。这是因为默认情况下该 addon 编译时没有包含 Valgrind 需要的调试符号，因此无法提供更多信息。

可以使用 Valgrind 的 suppression 功能，在未来的 Valgrind 运行中隐藏与 Node.js 本身相关的泄漏。

## 生成 Valgrind 抑制文件

Valgrind 使用抑制文件来隐藏在摘要中发现的问题。使用 `--gen-suppressions` 和
`--log-file` 标志生成一个带有内嵌抑制信息的日志文件：

```bash
valgrind --leak-check=full \
   --gen-suppressions=all \
   --log-file=./valgrind-out.txt \
   node hello.js
```

Valgrind 会将输出保存到指定的日志文件中。在摘要中的每个堆之后，
Valgrind 都会包含一条抑制记录：一种 Valgrind 可用于忽略特定内存问题的结构。
抑制记录可以保存到抑制文件中，Valgrind 随后可在后续执行中使用该文件来隐藏各种
内存错误。以下是前一次调用中抑制记录的示例：

```text
{
   <在此处插入一个抑制名称>
   Memcheck:Value8
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   obj:/home/kevin/.nvm/versions/node/v12.14.1/bin/node
   fun:_ZN2v88internal12_GLOBAL__N_16InvokeEPNS0_7IsolateERKNS1_12InvokeParamsE
   fun:_ZN2v88internal9Execution4CallEPNS0_7IsolateENS0_6HandleINS0_6ObjectEEES6_iPS6_
   fun:_ZN2v88Function4CallENS_5LocalINS_7ContextEEENS1_INS_5ValueEEEiPS5_
}
{
   <在此处插入一个抑制名称>
   Memcheck:Leak
   match-leak-kinds: definite
   fun:_Znwm
   fun:napi_module_register
   fun:call_init.part.0
   fun:call_init
   fun:_dl_init
   fun:_dl_catch_exception
   fun:dl_open_worker
   fun:_dl_catch_exception
   fun:_dl_open
   fun:dlopen_doit
   fun:_dl_catch_exception
   fun:_dl_catch_error
   fun:_dlerror_run
}
{
   <在此处插入一个抑制名称>
   Memcheck:Leak
   match-leak-kinds: possible
   fun:calloc
   fun:allocate_dtv
   fun:_dl_allocate_tls
   fun:allocate_stack
   fun:pthread_create@@GLIBC_2.2.5
   fun:_ZN4node9inspector5Agent5StartERKSsRKNS_12DebugOptionsESt10shared_ptrINS_8HostPortEEb
   fun:_ZN4node11Environment19InitializeInspectorESt10unique_ptrINS_9inspector21ParentInspectorHandleESt14default_deleteIS3_EE
   fun:_ZN4node16NodeMainInstance21CreateMainEnvironmentEPi
   fun:_ZN4node16NodeMainInstance3RunEv
   fun:_ZN4node5StartEiPPc
   fun:(below main)
}
```

创建一个文件（例如 `node-12.14.1.supp`）并写入这些抑制
记录的内容，然后使用之前创建的抑制文件运行 Valgrind：

```bash
valgrind --leak-check=full \
   --suppressions=./node-12.14.1.supp \
   node hello.js
```

现在，Valgrind 对被抑制问题的泄漏摘要中只会将其标记为
`suppressed`：

```console
==12471== HEAP SUMMARY:
==12471==     in use at exit: 8,067 bytes in 31 blocks
==12471==   total heap usage: 16,482 allocs, 16,451 frees, 17,255,689 bytes allocated
==12471==
==12471== LEAK SUMMARY:
==12471==    definitely lost: 0 bytes in 0 blocks
==12471==    indirectly lost: 0 bytes in 0 blocks
==12471==      possibly lost: 0 bytes in 0 blocks
==12471==    still reachable: 7,699 bytes in 29 blocks
==12471==                       of which reachable via heuristic:
==12471==                         multipleinheritance: 48 bytes in 1 blocks
==12471==         suppressed: 368 bytes in 2 blocks
```

## 启用调试符号以获取更多信息

内存泄漏可能位于 addon 中，也可能位于 Node.js 本身。以下各节
介绍了启用调试符号以获取更多信息所需的步骤。

### 原生 addons

要为安装时编译的所有 addons 启用调试符号，请使用：

```bash
npm install --debug
```

凡是 npm 未消费的选项都会传递给 node-gyp，因此
这些 addons 会以 debug 选项进行编译。

如果原生 addon 包含预构建二进制文件，你需要强制重新构建。

```bash
npm install --debug
npm rebuild
```

下一步是在重新构建后运行 Valgrind。这一次，泄漏位置的
信息会包含源文件名和行号：

```console
==18481== 997,000 bytes in 997 blocks are definitely lost in loss record 35 of 35
==18481==    at 0x4C2FB0F: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
>>>>> ==18481==    by 0x9794989: Method(napi_env__*, napi_callback_info__*) (hello.cc:13)  <<<<<
==18481==    by 0x98F764: v8impl::(anonymous namespace)::FunctionCallbackWrapper::Invoke(v8::FunctionCallbackInfo<v8::Value> const&) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0xBA6FC8: v8::internal::MaybeHandle<v8::internal::Object> v8::internal::(anonymous namespace)::HandleApiCallHelper<false>(v8::internal::  Isolate*, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::FunctionTemplateInfo>, v8::internal::Handle<v8::internal::Object>, v8::internal::BuiltinArguments) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0xBA8DB6: v8::internal::Builtin_HandleApiCall(int, unsigned long*, v8::internal::Isolate*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0x1376358: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==18481==    by 0x12F68A3: ??? (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
```

这个新输出让我们准确看到泄漏发生在 `hello.cc` 文件中的位置：

```cpp
  6 void* malloc_holder = nullptr;
  7 napi_value Method(napi_env env, napi_callback_info info) {
  8   napi_status status;
  9   napi_value world;
 10   status = napi_create_string_utf8(env, "world", 5, &world);
 11   assert(status == napi_ok);
 12   for (int i=0; i< 1000; i++) {
 13     malloc_holder = malloc(1000);  // <<<<<< 这里是我们分配未被释放的内存的地方
 14   }
 15   return world;
 16 }
```

### Node.js 二进制文件

如果泄漏不在 addon 中，而是在 Node.js 二进制文件本身中，
你可能需要自己编译 node 并开启调试符号。查看
Valgrind 报告的这个条目，在使用发布版二进制文件时我们看到：

```console
 ==4174== 304 bytes in 1 blocks are possibly lost in loss record 27 of 35
==4174==    at 0x4C31B25: calloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==4174==    by 0x40134A6: allocate_dtv (dl-tls.c:286)
==4174==    by 0x40134A6: _dl_allocate_tls (dl-tls.c:530)
==4174==    by 0x5987227: allocate_stack (allocatestack.c:627)
==4174==    by 0x5987227: pthread_create@@GLIBC_2.2.5 (pthread_create.c:644)
==4174==    by 0xAAF9DC: node::inspector::Agent::Start(std::string const&, node::DebugOptions const&, std::shared_ptr<node::HostPort>, bool) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x9A8BE7: node::Environment::InitializeInspector(std::unique_ptr<node::inspector::ParentInspectorHandle, std::default_delete<node::inspector::ParentInspectorHandle> >) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xA1C9A5: node::NodeMainInstance::CreateMainEnvironment(int*) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0xA1CB42: node::NodeMainInstance::Run() (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x9ACB67: node::Start(int, char**) (in /home/user1/valgrind/node-v12.14.1-linux-x64/bin/node)
==4174==    by 0x5BBFB96: (below main) (libc-start.c:310)
```

这给了我们一些可以查找的线索（`node::inspector::Agent::Start`）
但还不能定位到该函数内部的具体位置。我们得到的信息比你可能预期的更多
（或者比 addon 的默认情况更多），因为 Node.js 二进制文件使用 `-rdynamic`
导出了许多符号，以便 addons 可以使用它们。如果堆栈
信息已经足够让你追查到泄漏位置，那很好；
否则下一步就是编译一个 Node.js 的调试版本。

要在 Valgrind 中获取更多信息：

* 获取与你要调试的发布版本对应的 Node.js 源码。例如：

```bash
git clone https://github.com/nodejs/node.git
git checkout v12.14.1
```

* 使用启用 debug 的方式编译（更多信息请参见
  [构建调试版本](https://github.com/nodejs/node/blob/v12.14.1/BUILDING.md#building-a-debug-build)）。
  例如，在 \*nix 上：

```bash
./configure --debug
make -j4
```

* 确保运行的是你编译出的 Node.js 调试版本。使用
  `./configure --debug` 后，在执行 `make` 时会生成两个二进制文件。
  你必须使用位于 `out/Debug` 中的那个。

使用 Node.js 的调试构建运行 Valgrind 会显示：

```console
==44112== 592 bytes in 1 blocks are possibly lost in loss record 26 of 27
==44112==    at 0x4C2BF79: calloc (vg_replace_malloc.c:762)
==44112==    by 0x4012754: _dl_allocate_tls (in /usr/lib64/ld-2.17.so)
==44112==    by 0x586287B: pthread_create@@GLIBC_2.2.5 (in /usr/lib64/libpthread-2.17.so)
==44112==    by 0xFAB2D2: node::inspector::(anonymous namespace)::StartDebugSignalHandler() (inspector_agent.cc:140)
==44112==    by 0xFACB10: node::inspector::Agent::Start(std::string const&, node::DebugOptions const&, std::shared_ptr<node::HostPort>, bool) (inspector_agent.cc:777)
==44112==    by 0xE3A0BB: node::Environment::InitializeInspector(std::unique_ptr<node::inspector::ParentInspectorHandle, std::default_delete<node::inspector::ParentInspectorHandle> >) (node.cc:216)
==44112==    by 0xEE8F3E: node::NodeMainInstance::CreateMainEnvironment(int*) (node_main_instance.cc:222)
==44112==    by 0xEE8831: node::NodeMainInstance::Run() (node_main_instance.cc:108)
==44112==    by 0xE3CDEC: node::Start(int, char**) (node.cc:996)
==44112==    by 0x22D8BBF: main (node_main.cc:126)
```

现在我们可以看到导致分配的 Node.js 代码中的具体文件名和行号
（inspector\_agent.cc:140）。

我们可以检查那一行（以及其周围代码），以
找到内存泄漏的解决方案。
