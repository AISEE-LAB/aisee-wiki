# Tasks: strengthen-ai-engineering-bridge

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [x] 1.1 更新 `site/ai-engineering/README.md`，明确 AI Engineering 是指南与 AISEE 主线实践之间的解释层。
- [x] 1.2 强化 `site/ai-engineering/traditional-vs-ai-engineering.md`，补充传统研发流程与 AI 增强工程的环节对照。
- [x] 1.3 新增 `site/ai-engineering/from-traditional-flow-to-aisee.md`，说明如何从 Issue / PR / Review / CI 迁移到 Spec / Harness / Verification / Compound。
- [x] 1.4 统一相关页面中的公开栏目名称，使用“指南”和“AISEE”。
- [x] 1.5 删除正文中由文档站导航已承载的机械式“下一步阅读 / 继续阅读 / 方法路线”链接块。

## 2. 站点结构与配置

- [x] 2.1 更新 `site/.vuepress/collections/ai-engineering.ts`，把新增文章接入 AI Engineering 侧边栏。
- [x] 2.2 检查新增页面 frontmatter、permalink 和侧边栏链接一致。

## 3. 验证

- [x] 3.1 检查相关页面路径可访问。
- [x] 3.2 检查导航、侧边栏和内链。
- [x] 3.3 检查代码块、命令、图片或引用。
- [x] 3.4 运行文档站构建、预览或等效检查。

## 4. Archive Gate

- [x] 4.1 完成 doc-change.md 中的 Archive Updates。
- [x] 4.2 更新 `openspec/project-docs.md`，或在 doc-change.md 写明无需回写的原因。
- [x] 4.3 确认验证结果已记录。
- [x] 4.4 确认本 change 可归档。
