# Doc Change: strengthen-ai-engineering-bridge

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：AI Engineering
- 涉及页面：`/ai-engineering/`、`/ai-engineering/traditional-vs-ai-engineering/`、新增 `/ai-engineering/from-traditional-flow-to-aisee/`、OpenSpec 正文中的机械式“下一步阅读”段落
- 涉及导航/侧边栏：是
- 涉及站点配置：否

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| AI Engineering 首页 | 已说明 AI 增强软件工程、三条主线和方法版图 | 桥接定位不够明确，读者不容易理解它和 `指南`、`AISEE` 的区别与顺序。 |
| 传统 vs AI 文章 | 已有五维对照和基本闭环 | 仍偏摘要，没有充分展开传统研发流程各环节在 AI 参与后如何变化。 |
| 结合方式 | 文章中提到 OpenSpec、Compound、AISEE | 缺少一篇专门说明如何把传统 Issue/PR/Review/CI 流程迁移到 Spec / Harness / Compound 的文章。 |
| AI Engineering 侧边栏 | 已有“方法基础 / 三条主线”分组 | 新增迁移文章后需要进入清晰阅读顺序。 |
| 正文导读块 | 部分页面末尾包含“下一步阅读”或同类链接列表 | 文档站已有导航和侧边栏能力，正文中重复导读会造成页面噪声。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 修改 | AI Engineering 首页 | `site/ai-engineering/README.md` | 强化栏目定位：`指南` 解决上手，AI Engineering 解释范式变化，`AISEE` 承接落地。 |
| 修改 | 传统 vs AI 文章 | `site/ai-engineering/traditional-vs-ai-engineering.md` | 扩展需求、设计、开发、测试、评审、知识沉淀等环节对照，并说明如何结合。 |
| 新增 | 从传统研发流程到 AISEE 工作流 | `site/ai-engineering/from-traditional-flow-to-aisee.md` | 新增文章，解释 Issue/PR/Review/CI 如何映射到 Spec / Harness / Compound。 |
| 修改 | AI Engineering collection | `site/.vuepress/collections/ai-engineering.ts` | 新增文章进入侧边栏。 |
| 修改 | 冗余导读块 | `site/ai-engineering/*.md`、`site/openspec/*.md` | 删除不承担必要语义引导的“下一步阅读 / 继续阅读 / 方法路线”式链接列表。 |
| 修改 | 文档基线 | `openspec/project-docs.md` | 归档前回写页面清单和内容缺口。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/ai-engineering/` | 已完成 AI Coding 入门或正在评估工程方法的人 | AI Engineering 是 `指南` 与 `AISEE` 之间的解释层 | 传统工程和 AI 增强工程的核心差异；阅读顺序 | 不写成工具教程，不替代 AISEE Plugin 说明 |
| `/ai-engineering/traditional-vs-ai-engineering/` | 想理解范式变化的工程师 | 传统研发环节在 AI 参与后如何变化 | 需求、设计、开发、测试、评审、知识沉淀对照 | 不宣称传统工程失效 |
| `/ai-engineering/from-traditional-flow-to-aisee/` | 想落地 AISEE 工作流的团队维护者 | 从 Issue/PR/Review/CI 到 Spec/Harness/Compound 的迁移路径 | 分阶段迁移、最小落地方式、不要一次性重构全流程 | 不编造真实团队案例 |

## Site Impact

- 导航：不影响顶栏。
- 侧边栏：AI Engineering 中文侧边栏新增迁移文章。
- 路由：新增 `/ai-engineering/from-traditional-flow-to-aisee/`。
- frontmatter：新增页面包含 `title`、`permalink`、`createTime`。
- 标签/分类：不新增标签体系。
- 搜索影响：新增文章进入站内搜索。
- 多语言影响：不补英文完整正文。
- 构建/部署影响：仅影响 Markdown 和 collection 配置。
- 写作约定影响：正文不再放置纯目录式“下一步阅读”链接块；必要文章链接应放在具体语义句子中。

## Validation

- [x] 页面路径可访问。
- [x] 导航/侧边栏入口正确。
- [x] 内链有效。
- [x] 代码块、命令或示例已检查。
- [x] 文档站构建或预览检查通过。
- [x] 需要时已截图或人工预览。

验证记录：

- `pnpm docs:build` 通过；保留既有 `@vueuse/core` Rolldown `INVALID_ANNOTATION` 警告。
- 已检查生成产物：`/ai-engineering/`、`/ai-engineering/traditional-vs-ai-engineering/`、`/ai-engineering/from-traditional-flow-to-aisee/`。
- 已扫描 `site/ai-engineering` 和 `site/openspec`，确认无 `下一步阅读`、`继续阅读`、`方法路线`、`如何进入 AISEE` 这类机械导读块。
- 已检查生成产物：`/ai-engineering/from-traditional-flow-to-aisee/`、`/openspec/schema/`。
- `openspec status --change strengthen-ai-engineering-bridge --json` 显示 `aisee-docsite-driven` 的 proposal、doc-change、tasks 均为 done。
- `openspec validate strengthen-ai-engineering-bridge --strict` 不适用于本 schema，因该命令按默认 delta spec 规则要求 `specs/` delta；本 change 是文档站 artifact 驱动变更。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新。
- [x] 栏目结构已更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A。本 change 新增 AI Engineering 页面并调整栏目定位，必须回写。
