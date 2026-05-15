# 静态分析

该项目使用 Coverity 扫描 Node.js 源代码，并报告 C/C++ 代码库中的潜在
问题。

已被添加到 [Node.js coverity 项目][] 的人员，当有新的问题报告时可以收到电子邮件，
并且还可以通过 <https://scan9.scan.coverity.com/reports.htm> 查看所有当前问题。

任何协作者都可以通过在 [build][] 仓库中创建一个标题为
`Please add me to coverity` 的 issue 来申请加入 Node.js coverity 项目。
具有管理员权限的 build WG 成员将会验证请求者是否是 nodejs/node 项目仓库中
[协作者部分][] 所列出的现有协作者。验证通过后，请求者将被添加到 coverity 项目中。

[Node.js coverity 项目]: https://scan.coverity.com/projects/node-js
[build]: https://github.com/nodejs/build
[协作者部分]: https://github.com/nodejs/node#collaborators
