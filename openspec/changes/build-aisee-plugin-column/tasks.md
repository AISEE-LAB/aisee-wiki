# Tasks: build-aisee-plugin-column

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [x] 1.1 新建 AISEE Plugin 中文栏目首页，明确 `/aisee/aisee-plugin/` 路由、职责边界、阅读顺序和核心链路。
- [x] 1.2 新建 AISEE Plugin 中文专题页：从意图到 change、schema packs 与 authoring、context packs 与 contracts、team knowledge guardrails、verify 与 archive guard。
- [x] 1.3 更新 AISEE 中文栏目首页 `site/aisee/README.md`，将入口与正文内链统一改为 `/aisee/aisee-plugin/`。
- [x] 1.4 更新英文 AISEE 入口与英文 AISEE Plugin 占位页，统一改为 `/en/aisee/aisee-plugin/`。
- [x] 1.5 更新 AI Engineering 等相关正文中的旧 `/aisee/workflows/` 内链。

## 2. 站点结构与配置

- [x] 2.1 更新 `site/.vuepress/navbar.ts` 与 `site/.vuepress/collections/aisee.ts`，统一 AISEE Plugin 新路由并补齐专题页侧边栏。
- [x] 2.2 删除或替换旧 `site/aisee/workflows/README.md` 与 `site/en/aisee/workflows/README.md` 公开入口，确保不再生成旧 workflow 路由。

## 3. 验证

- [x] 3.1 检查 `/aisee/`、`/aisee/aisee-plugin/`、`/en/aisee/`、`/en/aisee/aisee-plugin/` 路径可访问。
- [x] 3.2 检查导航、侧边栏和内链，确认仓库中不再有公开 `/aisee/workflows/` stale link。
- [x] 3.3 检查代码块、命令、图片或引用，确认命令口径与 `aisee-plugin` 仓库事实源一致。
- [x] 3.4 运行文档站构建、预览或等效检查。

## 4. Archive Gate

- [x] 4.1 完成 doc-change.md 中的 Archive Updates。
- [x] 4.2 更新 openspec/project-docs.md，或在 doc-change.md 写明无需回写的原因。
- [x] 4.3 确认验证结果已记录。
- [x] 4.4 确认本 change 可归档。
