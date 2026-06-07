# Tasks: restructure-aisee-navigation

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [x] 1.1 更新 `site/aisee/README.md`：将 AISEE 栏目定位为从 AISEE 工作流视角介绍 `AISEE Plugin / OpenSpec / Compound Engineering` 的主线入口，并明确 OpenSpec 与 Compound Engineering 是独立开源项目。
- [x] 1.2 更新 `site/en/aisee/README.md`：同步英文入口定位，避免暗示 OpenSpec 或 Compound Engineering 属于 AISEE 自有项目。
- [x] 1.3 新增 `site/projects/README.md`：建立“开源项目”栏目首页，说明栏目只展示 AISEE 团队自有或主导开源项目，并与“推荐资源”区分。
- [x] 1.4 新增 `site/en/projects/README.md`：建立英文 `Open Source` 入口，说明英文内容可后续补齐。
- [x] 1.5 更新 `site/learn/README.md` 和 `site/en/learn/README.md` 的标题、frontmatter 或首屏文案，将公开展示名从“学习路径 / Learn”收束为“指南 / Guides”，保留 `/learn/` 路由。
- [x] 1.6 更新首页内容地图、推荐路径、CTA 或栏目说明，使其匹配 `指南 / AISEE / 开源项目 / 推荐资源` 的新边界。

## 2. 站点结构与配置

- [x] 2.1 更新 `site/.vuepress/ia.ts`：`learn` 展示名改为 `指南 / Guides`，新增 `projects`，更新 `aisee` 和 `resources` 的 role。
- [x] 2.2 更新 `site/.vuepress/navbar.ts`：顶栏调整为 `首页 / 指南 / AI Engineering / AISEE / 开源项目 / 推荐资源`，其中 `AISEE` 展示 `AISEE Plugin / OpenSpec / Compound Engineering` 二级菜单；英文 locale 对应调整为 `Home / Guides / AI Engineering / AISEE / Open Source / Recommended Resources`。
- [x] 2.3 新增 `site/.vuepress/collections/projects.ts`，并在 `site/.vuepress/collections.ts` 中注册中英文 projects collection。
- [x] 2.4 更新 `site/.vuepress/collections/learn.ts`：collection title 改为 `指南 / Guides`，必要时同步侧边栏分组文案。
- [x] 2.5 更新 `site/.vuepress/collections/aisee.ts`：侧边栏改为 `AISEE Plugin`、`OpenSpec`、`Compound Engineering` 三个子栏目入口，移除 `/aisee/workflows/flow-explainer/` stale 链接。
- [x] 2.6 保留 `/openspec/`、`/compound/` 现有路由和 collection，使外部链接、站内搜索和直接访问不受破坏。
- [x] 2.7 检查中文和英文 frontmatter：新增页面包含 `title`、`permalink`、`createTime`，并关闭不需要的默认信息时按现有栏目风格处理。

## 3. 验证

- [x] 3.1 检查 `/learn/`、`/aisee/`、`/projects/`、`/openspec/`、`/compound/`、`/resources/` 及英文对应入口可访问。
- [x] 3.2 检查顶栏 AISEE 二级菜单、AISEE 侧边栏、Projects 侧边栏和首页栏目入口。
- [x] 3.3 检查不再存在指向 `/aisee/workflows/flow-explainer/` 的公开内链。
- [x] 3.4 检查新增项目栏目没有混入外部推荐资源，推荐资源栏目没有改成团队项目列表。
- [x] 3.5 运行 `pnpm docs:build`。

## 4. Archive Gate

- [x] 4.1 完成 doc-change.md 中的 Archive Updates。
- [x] 4.2 更新 openspec/project-docs.md，或在 doc-change.md 写明无需回写的原因。
- [x] 4.3 确认验证结果已记录。
- [x] 4.4 确认本 change 可归档。
