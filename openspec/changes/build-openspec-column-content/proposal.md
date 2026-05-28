# Proposal: build-openspec-column-content

## 背景与问题

- 当前问题：`/openspec/` 目前只有栏目占位说明，尚未系统解释 OpenSpec 的定位、能力模型、核心 artifacts、日常用法、扩展方式和适用边界，无法承接 `/learn/` 学习路径中的进阶入口。
- 触发原因：维护者确认 OpenSpec 栏目应聚焦“OpenSpec 的能力、扩展、作用和用法”，不应把“从 SRS 到 OpenSpec Change 的完整链路”作为本栏目主线；该链路更适合后续放入 `/aisee/` 或 `/workflows/`。
- 关联基线：openspec/project-docs.md

## 目标

- 将 `/openspec/` 建设为 OpenSpec 方法论主栏目，清晰说明 OpenSpec 在 AI Engineering 中作为规范层与事实源的作用。
- 按“作用 / 模型 / 用法 / 扩展 / 边界”组织中文内容层次，让读者先理解为什么需要 OpenSpec，再理解 specs、changes、artifacts、archive 等对象，最后进入 workflow、写法、schema 扩展和适用边界。
- 完成 OpenSpec 栏目首页和首批中文正文，正文应覆盖官方 OpenSpec 核心概念，并结合 AI SEE Wiki 的工程语境解释，而不是只写命令清单。
- 更新 OpenSpec 栏目的侧边栏和阅读路径，使 `/learn/`、`/workflows/`、`/resources/` 能稳定链接到 OpenSpec 深度内容。
- 为后续 Compound、aisee、workflows 栏目留下清晰边界：OpenSpec 讲规范层自身，aisee 讲上游需求链路和 skill 机制，workflows 讲端到端执行流程。

## 不在范围

- 不在本 change 中编写 Compound Engineering、Harness 或 aisee skill 生态专题正文。
- 不在本 change 中把“从 SRS 到 OpenSpec Change 的完整链路”放入 OpenSpec 主栏目；该主题可在后续 `/aisee/` 或 `/workflows/` change 中处理。
- 不在本 change 中完成英文 OpenSpec 栏目完整正文，英文页可继续保持占位或最小同步说明。
- 不新增后端服务、数据库、在线编辑器、实时协作能力或运行时 API。
- 不引入新的全站信息架构，不调整 OpenSpec 以外栏目的核心定位。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | `/openspec/` | 将占位栏目升级为 OpenSpec 深度栏目，按“作用 / 模型 / 用法 / 扩展 / 边界”组织内容。 |
| 页面 | OpenSpec 中文栏目首页和专题正文 | 计划新增或补齐 `what-is-openspec`、`mental-model`、`workflow`、`artifact-guide`、`spec-granularity`、`delta-spec`、`schema`、`boundaries` 等页面，具体清单在 `doc-change.md` 固化。 |
| 导航/侧边栏 | OpenSpec collection sidebar | 将 OpenSpec 侧边栏从单页占位改为分组阅读结构；顶层导航保持既有 `/openspec/` 入口。 |
| 路由/frontmatter | `/openspec/<slug>/` | 新增页面需要包含 `title`、`permalink`、`createTime`，slug 应短、稳定、可读。 |
| 站点配置 | OpenSpec collection 配置 | 仅在需要时更新 `site/.vuepress/collections/openspec.ts`；不改全站主题或构建基础配置。 |

## 成功标准

- [ ] `/openspec/` 栏目首页已从占位页升级为可阅读的栏目导览，包含 OpenSpec 定位、能力地图、分层阅读顺序和跨栏目边界说明。
- [ ] OpenSpec 中文正文至少覆盖“作用 / 模型 / 用法 / 扩展 / 边界”五层中的核心页面，并解释 specs、changes、proposal、delta spec、design、tasks、archive、schema 等关键概念。
- [ ] 文章内容明确区分 OpenSpec 自身能力、aisee 上游链路、Compound/Agent 执行增强和 workflows 端到端流程，不把 SRS 链路作为本栏目主线。
- [ ] OpenSpec 侧边栏按“作用 / 模型 / 用法 / 扩展 / 边界”分组，页面路径可访问，内链指向存在页面或明确的栏目入口。
- [ ] 涉及流程或对象关系的文章使用 Mermaid、现有流程讲解组件或等价结构化表达说明关系。
- [ ] 相关链接和引用已检查，不公开维护者本地绝对路径或未整理私有资料。
- [ ] 文档站构建或等效预览检查通过。
- [ ] 归档前已处理 `openspec/project-docs.md` 回写，记录 OpenSpec 栏目结构、页面清单、内容状态和后续缺口。

## 约束与假设

- [ASSUMPTION] OpenSpec 栏目第一期以中文正文为主，英文 `/en/openspec/` 不在本 change 中完整重写。
- [ASSUMPTION] OpenSpec 官方仓库和官网文档是解释核心概念、目录模型、artifact 流程和约定的主要事实源；AI SEE Wiki 项目内 OpenSpec artifacts 用作本站实践例子。
- [DOC-GAP] `openspec/project-docs.md` 当前只记录 `/learn/` 栏目基线，尚未记录 OpenSpec 栏目页面清单和内容状态；本 change 归档前必须回写。
- [DOC-GAP] OpenSpec 栏目现有页面只有占位内容，尚未建立可复用术语口径和文章间阅读路径。
- [SITE-CONFIG-IMPACT] 需要更新 OpenSpec collection sidebar；预计不需要改顶层导航、主题配置或构建脚本。
