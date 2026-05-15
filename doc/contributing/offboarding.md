# 离任

本文档是在协作者成为荣誉协作者或离开项目时需要执行事项的检查清单。

* 将该协作者从 [`@nodejs/collaborators`][] 团队中移除。
* 发起一个快速通道拉取请求，将该协作者移至 README.md 中的荣誉协作者名单。
* 确定该协作者属于哪些 GitHub 团队。与该协作者协商后，确定应从哪些团队中将其移除。
  * 某些团队还可能需要通过拉取请求将该协作者从团队列表中移除。例如，如果有人被从 @nodejs/build 中移除，也应从 <https://github.com/nodejs/build> 仓库中的 Build WG README.md 文件里将其移除。
  * 如有疑问，尤其是在无法联系到该协作者时，请将其从所有团队中移除。之后再加回来也很容易，因此我们会优先考虑隐私和安全。
* 将其从 [`@nodejs`](https://github.com/orgs/nodejs/people) GitHub 组织中移除，除非他们因协作者之外的其他原因而成为该组织成员。
* 在 nodejs/build 仓库中 [提交一个 issue](https://github.com/nodejs/build/issues/new)，标题为 `Remove Collaborator from Coverity`，请求将该协作者从 Node.js coverity 项目中移除，前提是他们拥有访问权限。

[`@nodejs/collaborators`]: https://github.com/orgs/nodejs/teams/collaborators/members
