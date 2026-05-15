# 死后分析支持

死后分析元数据是在最终构建中存在的常量，调试器和其他工具可以使用它们在分析软件内存时导航内部结构（无论是运行中的进程还是 core dump）。Node.js 在其构建中为 V8 和 Node.js 内部结构提供了这些元数据。

## V8 死后分析元数据

V8 会为所有死后分析常量添加 `v8dbg_` 前缀，它们允许检查堆上的对象以及对象属性和引用。V8 使用脚本（`deps/v8/tools/gen-postmortem-metadata.py`）生成这些符号，而 Node.js 会始终在最终构建中包含这些常量。

## Node.js 调试符号

Node.js 会为所有死后分析常量添加 `nodedbg_` 前缀，它们通过提供检查 Node.js 特定结构的方法来补充 V8 常量，例如 `node::Environment`、`node::BaseObject` 及其派生类、`src/utils.h` 中的类等。这些常量在 `src/node_postmortem_metadata.cc` 中声明，其中大多数会在编译时计算。

### 计算类成员的偏移量

引用类成员在内存中偏移量的 Node.js 常量是在编译时计算的。  
因此，这些类成员必须位于距类起始位置的固定偏移处。这在大多数情况下不是问题，但这也意味着这些成员应始终位于类定义中任何模板成员之后。

例如，如果我们想为 `ReqWrap::req_wrap_queue_` 添加一个带偏移量的常量，那么它应该定义在 `ReqWrap::req_` 之后，因为 `sizeof(req_)` 取决于 T 的类型，这意味着类定义应如下所示：

```cpp
template <typename T>
class ReqWrap : public AsyncWrap {
 private:
  // req_wrap_queue_ 在任何模板成员之前，这使它位于距类起始位置的
  // 固定偏移处
  ListNode<ReqWrap> req_wrap_queue_;

  T req_;
};
```

而不是：

```cpp
template <typename T>
class ReqWrap : public AsyncWrap {
 private:
  T req_;

  // req_wrap_queue_ 位于一个模板成员之后，这意味着它不会处于距
  // 类起始位置的固定偏移处
  ListNode<ReqWrap> req_wrap_queue_;
};
```

在 `test/cctest/test_node_postmortem_metadata.cc` 中还有一些测试，用来确保所有 Node.js 死后分析元数据都被正确计算。

## 工具和参考资料

* [llnode](https://github.com/nodejs/llnode)：LLDB 插件
* [`mdb_v8`](https://github.com/joyent/mdb_v8)：mdb 插件
* [nodejs/post-mortem](https://github.com/nodejs/post-mortem)：Node.js
  死后分析工作组
