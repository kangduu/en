# 仓库权限与协作流程说明

## 团队角色与权限

- 仓库拥有者（Owner）
  - 管理仓库设置、访问权限、分支保护。
- 开发团队成员（Developers）
  - 有写（Write）权限：可创建分支、推送、发起 PR。
  - 无管理（Admin）权限，不能更改仓库设置。
- 审核／合并人员（Reviewer/Maintainer）
  - 拥有 Merge 权限或是受限推送权限，可审核 PR、合并至关键分支。

## 分支保护设置

- `main` 分支：
  - 必须通过 Pull Request 合并。
  - 至少一位代码审核。
  - CI 测试必须通过。
  - 禁止 force-push，禁止分支删除。
- `develop` 分支：
  - 同样通过 PR 合并。
  - 建议至少一位审核。
- 对于其他分支（feature/bugfix）：
  - 可由开发人员自由切出和推送。

## 邀请新成员流程

1. 在 GitHub 仓库 → Settings → Access → Invite People。
2. 输入成员 GitHub 用户名，授予 “Write” 权限。
3. 成员接受邀请后，即可参与本仓库。
4. 新成员加入后，请通知其查看本 CONTRIBUTING.md 、BRANCHING.md 及本权限说明文档。

## 日常操作建议

- 每次新增开发成员或变更角色，请同步更新此文档及 GitHub 访问权限设置。
- 定期检查分支保护规则，确保关键分支仍处于受控状态。
- 禁止将 Admin 权限随意授予每位开发，以防误操作。
