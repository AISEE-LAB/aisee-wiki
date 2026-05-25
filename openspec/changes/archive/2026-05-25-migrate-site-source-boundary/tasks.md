## 1. 迁移站点源目录

- [x] 1.1 盘点 `docs/` 下公开站点源码与协作产物目录，确认迁移清单不包含 `docs/requirements/`、`docs/ui-content/`、`docs/tech-context/`、`docs/split/`、`docs/reflect/`、`docs/learnings/`
- [x] 1.2 创建 `site/` 并迁移当前 VuePress 源码，包括 `.vuepress/`、`README.md`、`en/README.md`、现有示例公开页面和公开静态资源
- [x] 1.3 确认 `site/.vuepress/config.ts`、`site/README.md`、`site/en/README.md` 存在
- [x] 1.4 确认 `docs/` 下协作产物目录仍保留在 `site/` 之外

## 2. 更新站点命令

- [x] 2.1 更新 `package.json` 中 `docs:dev`，使其以 `site` 作为 VuePress targetDir
- [x] 2.2 更新 `package.json` 中 `docs:dev-clean`，使其以 `site` 作为 VuePress targetDir，并保留 `--clean-cache --clean-temp`
- [x] 2.3 更新 `package.json` 中 `docs:build`，使其以 `site` 作为 VuePress targetDir，并保留 `--clean-cache --clean-temp`
- [x] 2.4 更新 `package.json` 中 `docs:preview`，使其预览 `site/.vuepress/dist`
- [x] 2.5 确认 `package-lock.json` 保持存在且未因本 change 被删除

## 3. 补充仓库说明

- [x] 3.1 更新 README 或贡献说明，明确 `site/` 是公开站点源目录
- [x] 3.2 更新 README 或贡献说明，明确 `docs/` 是需求、UI 内容规格、技术上下文、拆分产物、复盘和学习沉淀目录
- [x] 3.3 更新 README 或贡献说明，明确协作产物转为公开站点页面前需要审阅、改写，并清理私有本地路径或敏感内容
- [x] 3.4 说明 `docs:*` 命令名为兼容保留，实际站点源目录已迁移为 `site/`

## 4. 验证

- [x] 4.1 运行 `openspec validate "migrate-site-source-boundary" --strict`
- [x] 4.2 运行静态路径检查，确认命令不再把 `docs/` 作为 VuePress 源目录，且预览路径不再指向 `docs/.vuepress/dist`
- [x] 4.3 检查 `docs/requirements/`、`docs/ui-content/`、`docs/tech-context/`、`docs/split/`、`docs/reflect/`、`docs/learnings/` 均未被迁入 `site/`
- [x] 4.4 在环境允许时运行 `pnpm docs:build`；若未运行，记录原因和剩余风险
