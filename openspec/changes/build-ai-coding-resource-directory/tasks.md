# Tasks: build-ai-coding-resource-directory

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [x] 1.1 从维护者 GitHub stars Excel 与公开 GitHub 元数据中筛选 AI Coding 相关资源，去除明显非本站范围、合规风险高或与 AI Coding 关系弱的仓库。
- [x] 1.2 将 `site/resources/README.md` 改为推荐资源默认页，公开页面保留简短定位说明、更新日期和资源组件。
- [x] 1.3 在资源目录中覆盖方法论与工作流、Coding Agent / Harness、Skill / Prompt / Context Engineering、MCP / Tool Use / Browser Automation、代码上下文与观测、UI/UX 与设计、学习资料等分类。
- [x] 1.4 确保 `nextlevelbuilder/ui-ux-pro-max-skill`、`pbakaus/impeccable`、`VoltAgent/awesome-design-md`、`nexu-io/open-design`、`safishamsi/graphify` 等复核后确认的资源不会遗漏。
- [x] 1.5 更新 `site/resources/README.md`，移除入口页说明和其他文章入口。

## 2. 站点结构与配置

- [x] 2.1 新增 `site/.vuepress/theme/components/AiCodingResourceBoard.vue`，用宽屏结构化卡片呈现分类资源、用途摘要、推荐标签、GitHub 链接和官网链接。
- [x] 2.2 更新 `site/.vuepress/client.ts` 注册 `AiCodingResourceBoard`。
- [x] 2.3 更新 `site/.vuepress/collections/resources.ts`，中文推荐资源侧边栏只保留默认页。
- [x] 2.4 确认推荐资源默认页 frontmatter 包含 `title`、`permalink`、`date`，并关闭默认阅读时间、页面日期、侧边栏和右侧目录；路由为 `/resources/`。
- [x] 2.5 如使用外部 logo/icon，优先使用稳定公开 URL；无法可靠确认时使用文本、标签或 GitHub owner avatar，避免下载或提交未授权商业截图。

## 3. 验证

- [x] 3.1 检查 `/resources/` 页面路径可访问并默认展示推荐资源目录。
- [x] 3.2 检查推荐资源侧边栏不再展示其他中文资源文章入口。
- [x] 3.3 检查页面没有本地绝对路径、私有 token、账号信息、价格/额度承诺或未经验证安装命令。
- [x] 3.4 运行 `pnpm docs:build` 或等效文档站构建检查。
- [x] 3.5 如启动本地预览，检查资源卡片在桌面和移动宽度下不溢出、不遮挡、不依赖运行时远程 API，并确认桌面端使用宽屏资源布局。

## 4. Archive Gate

- [x] 4.1 完成 doc-change.md 中的 Archive Updates。
- [x] 4.2 更新 openspec/project-docs.md，或在 doc-change.md 写明无需回写的原因。
- [x] 4.3 确认验证结果已记录。
- [x] 4.4 确认本 change 可归档。
