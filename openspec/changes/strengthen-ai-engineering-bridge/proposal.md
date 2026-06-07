# Proposal: strengthen-ai-engineering-bridge

## 背景与问题

- 当前问题：`AI Engineering` 栏目已经解释部分方法论，但整体仍偏概念摘要，没有充分讲透传统软件工程与 AI 增强软件工程的差异，也没有清楚说明读者如何从 `指南` 过渡到 `AISEE` 主线实践。
- 触发原因：维护者确认 `AI Engineering` 不应与 `指南` 合并，但需要承担“指南”和 `AISEE` 之间的解释层：说明为什么传统研发流程在 AI 参与后需要重组，以及如何结合 AISEE Plugin、OpenSpec、Compound Engineering 落地。
- 关联基线：openspec/project-docs.md

## 目标

- 强化 `AI Engineering` 栏目首页，明确它是 `指南` 和 `AISEE` 之间的桥接栏目。
- 强化 `traditional-vs-ai-engineering.md`，从需求、设计、开发、测试、评审、知识沉淀等环节讲清传统工程和 AI 增强工程的差异。
- 新增一篇文章说明如何从传统研发流程迁移到 AISEE 工作流，串起 Issue/PR/Review/CI 与 Spec / Harness / Compound 的对应关系。
- 更新 AI Engineering collection 侧边栏，使新增文章纳入清晰阅读顺序。
- 清理正文中由文档站导航已经承载的机械式“下一步阅读”链接块，只保留必要的语义引导链接。
- 更新项目文档基线和验证记录。

## 不在范围

- 不合并 `AI Engineering` 与 `指南` 栏目。
- 不改变顶栏、AISEE 下拉菜单或 `/aisee/` 栏目结构。
- 不重写 OpenSpec、Compound Engineering、AISEE Plugin 的深度正文。
- 不新增未确认的真实团队案例或项目数据。
- 不补英文完整正文。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | `AI Engineering` | 强化栏目定位为“指南到 AISEE 的解释层”。 |
| 页面 | `site/ai-engineering/README.md`、`site/ai-engineering/traditional-vs-ai-engineering.md`、新增迁移文章 | 补传统 vs AI 差异、结合方式和迁移路径。 |
| 页面 | `site/openspec/*.md` | 清理机械式“下一步阅读”段落，避免正文重复文档站导航能力。 |
| 导航/侧边栏 | `site/.vuepress/collections/ai-engineering.ts` | 新增文章进入侧边栏阅读顺序。 |
| 路由/frontmatter | `/ai-engineering/from-traditional-flow-to-aisee/` | 新增中文正文页面。 |
| 站点配置 | N/A | 不改顶栏和全局 IA。 |

## 成功标准

- [ ] 目标页面或栏目内容已补齐。
- [ ] 涉及的导航、侧边栏或路由入口正确。
- [ ] 相关链接和引用已检查。
- [ ] 文档站构建或预览检查通过。
- [ ] 归档前已处理 openspec/project-docs.md 回写。

## 约束与假设

- [ASSUMPTION] `AI Engineering` 保留顶层栏目，定位为方法论解释层，不承担工具教程职责。
- [ASSUMPTION] 新增文章使用 `/ai-engineering/from-traditional-flow-to-aisee/` 路由。
- [DOC-GAP] 真实团队迁移案例和项目指标尚未提供，本 change 只写通用迁移框架和判断规则。
- [SITE-CONFIG-IMPACT] 本 change 只影响 AI Engineering collection 侧边栏，不影响顶栏。
