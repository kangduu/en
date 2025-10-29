# 分支策略说明

以下为本项目推荐的分支流程，以确保多人协作时代码结构清晰、发布可控。

## 分支类型

- `main`（或 `master`）

  - 永远保持可部署、稳定状态。
  - 所有上线版本最终合并到此。
  - 严格保护，不允许直接在此开发。

- `develop`

  - 团队日常开发集成分支。
  - 所有 feature／bugfix 分支合并至此。
  - 功能完成、经过测试后，再由此合并至 `main`。

- 功能分支（Feature）

  - 命名建议：`feature/xxx`。
  - 从 `develop` 切出，开发完成后 PR 合并回 `develop`。

- 修复分支（Bugfix／Hotfix）

  - 命名建议：`bugfix/xxx`、`hotfix/xxx`。
  - 从 `develop`（或在紧急情况下从 `main`）切出。
  - 修复完成后合并至 `develop` 和 `main`。

- 发布分支（可选）
  - 命名建议：`release/v1.0.0`。
  - 用于准备发布：修复、测试、版本号更新。
  - 发布后合并至 `main` 和 `develop`，然后删除该分支。

## 合并流程

1. 开发人员在 `feature/xxx` 分支上工作。
2. 完成后发起 PR → 目标分支为 `develop`。
3. 审核 + CI 通过 → 合并回 `develop`。
4. 当 `develop` 达到可发布状态时，发起 PR → 目标分支为 `main`。
5. 合并至 `main` 后，创建 tag（例如 `v1.0.0`）并部署。
6. 删除已合并的 feature／bugfix 分支，保持仓库整洁。

## 分支保护建议

- 对 `main` 分支启用保护规则：禁止直接 push，必须经 PR + 审核 + CI 通过。
- 对 `develop` 分支也建议启用保护规则：至少 PR + 审核。
- 对 feature／bugfix 分支通常不设置严格保护。

## 分支命名规范示例

- feature/login-page
- bugfix/api-error-handling
- hotfix/v1.0.1–critical-fix
- release/v1.1.0

## 注意事项

- 在切分支前务必同步远程 `develop` 分支最新状态。
- 合并时注意解决冲突并确保 CI 测试通过。
- 删除远程已合并分支，让仓库结构保持清晰。
