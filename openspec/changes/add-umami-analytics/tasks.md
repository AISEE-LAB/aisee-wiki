# Tasks: add-umami-analytics

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [x] 1.1 在项目基线文档中记录站点当前使用 Umami 作为访问统计方案。
- [x] 1.2 记录配置边界：访问统计通过官方插件统一注入，不在 `head` 中手写重复脚本。

## 2. 站点结构与配置

- [x] 2.1 安装 `@vuepress/plugin-umami-analytics` 并更新锁文件。
- [x] 2.2 在 `site/.vuepress/config.ts` 中启用 Umami 插件，配置 `id`、`link`、`hostUrl` 和 `domains`。
- [x] 2.3 限制统计只在生产域名 `aisee.wiki` 与 `www.aisee.wiki` 下生效。
- [x] 2.4 不修改导航、侧边栏、permalink、页面 frontmatter 或部署配置。

## 3. 验证

- [x] 3.1 运行 `pnpm docs:build`。
- [x] 3.2 检查依赖安装结果与锁文件更新。
- [x] 3.3 抽查构建产物，确认注入 Umami 脚本地址或等价配置。
- [x] 3.4 检查现有 SEO、LLM 索引和页面构建未被统计插件破坏。

## 4. Archive Gate

- [x] 4.1 完成 doc-change.md 中的 Archive Updates。
- [x] 4.2 更新 openspec/project-docs.md，记录访问统计当前基线。
- [x] 4.3 确认验证结果已记录。
- [x] 4.4 确认本 change 可归档。
