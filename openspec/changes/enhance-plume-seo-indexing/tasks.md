# Tasks: enhance-plume-seo-indexing

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [x] 1.1 为中文首页、英文首页、中文栏目首页、英文栏目入口补充页面级 `description` frontmatter。
- [x] 1.2 确认新增描述与当前公开正文一致，不承诺未完成的英文完整正文、仓库 URL、部署状态或项目清单。

## 2. 站点结构与配置

- [x] 2.1 按 Plume 官方最佳实践在 `site/.vuepress/config.ts` 中配置 `hostname: 'https://aisee.wiki'`，启用主题内置 SEO 与 sitemap 能力。
- [x] 2.2 在 `site/.vuepress/config.ts` 中启用 `llmstxt: { locale: 'all' }`，覆盖中英文页面。
- [x] 2.3 依赖 Plume SEO 插件生成 `robots.txt`，不在 public 目录手写重复规则。
- [x] 2.4 不修改导航、侧边栏、permalink、Cloudflare Pages、GitHub 仓库或预览 URL。

## 3. 验证

- [x] 3.1 运行 `pnpm docs:build`。
- [x] 3.2 检查构建产物包含 `site/.vuepress/dist/sitemap.xml`、`robots.txt`、`llms.txt`、`llms-full.txt`。
- [x] 3.3 抽查首页和至少一篇正文页面 head，确认生成 `og:*`、JSON-LD 或等价 Plume SEO 元信息。
- [x] 3.4 检查 Plume 生成的 `robots.txt` 内容和 sitemap 地址。

## 4. Archive Gate

- [x] 4.1 完成 doc-change.md 中的 Archive Updates。
- [x] 4.2 更新 openspec/project-docs.md，记录 SEO、sitemap、robots 和 LLMs.txt 当前基线。
- [x] 4.3 确认验证结果已记录。
- [x] 4.4 确认本 change 可归档。
