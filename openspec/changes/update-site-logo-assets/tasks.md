# Tasks: update-site-logo-assets

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [x] 1.1 在项目基线文档中记录站点品牌资产的存放路径。
- [x] 1.2 记录 favicon 使用无字 logo、本地配置不依赖默认远程品牌图的约定。

## 2. 站点结构与配置

- [x] 2.1 将维护者提供的无字与带字 logo 复制到 `site/.vuepress/public/brand/`。
- [x] 2.2 在 `site/.vuepress/config.ts` 中将 favicon 切换为本地无字 SVG。
- [x] 2.3 在 `site/.vuepress/plume.config.ts` 中将站点 logo 与中英文 `profile.avatar` 切换为本地 AISEE 品牌资源。
- [x] 2.4 不修改导航、侧边栏、permalink、页面 frontmatter 或正文内容。

## 3. 验证

- [x] 3.1 运行 `pnpm docs:build`。
- [x] 3.2 检查静态资源文件是否已进入站点目录。
- [x] 3.3 抽查构建产物，确认 favicon/logo 已引用本地品牌资源。
- [x] 3.4 检查现有 SEO、统计与页面构建未被品牌资源替换破坏。

## 4. Archive Gate

- [x] 4.1 完成 doc-change.md 中的 Archive Updates。
- [x] 4.2 更新 openspec/project-docs.md，记录品牌资源当前基线。
- [x] 4.3 确认验证结果已记录。
- [x] 4.4 确认本 change 可归档。
