# Proposal: build-compound-engineering-column

## 背景与问题

- 当前问题：`/compound/` 目前只是占位入口，尚未解释 Compound Engineering 的方法论定位、工程复利循环、compound-engineering-plugin 的技能分组，以及它与 OpenSpec、工程流程栏目的关系。读者容易把“Compound”误解为单个 `/ce-compound` 知识沉淀命令，而不是一套从策略、计划、执行、评审到知识沉淀和结果回看的工程协作系统。
- 触发原因：维护者确认需要结合 `EveryInc/compound-engineering-plugin` 官方 README、公开文档、插件源码和本站其他栏目风格，重新规划 Compound 栏目；栏目需要分组，多智能体评审需要拆成多篇文章，并补一篇说明多类智能体之间关系的总览文章。
- 关联基线：openspec/project-docs.md

## 目标

- 将 `/compound/` 从占位入口升级为 **Compound Engineering（工程复利）** 方法论栏目首页；路由继续保持 `/compound/`，展示名和正文明确“Compound Engineering”而非单个 `/ce-compound` skill。
- 按工程循环组织栏目分组，而不是照搬插件 README 的技能清单；建议分为“总览 / 定义与计划 / 执行与质量 / 评审质量 / 知识复利 / 团队信号 / 工具化实践”。
- 新增首批中文正文，建立从概念、核心循环、定义与计划、执行评审、多智能体、知识沉淀到 OpenSpec 关系的阅读路径。
- 将多智能体评审拆成独立文章：多智能体评审概念、Reviewer Personas、文档评审智能体、设计/UI 评审智能体、Research Agents、多智能体协作关系、评审边界；其中协作关系文章负责解释 dispatcher、并行、去重、置信度门禁和综合输出如何配合。
- 明确 Compound Engineering 与 OpenSpec 的边界：OpenSpec 提供 spec-first 事实源和变更边界，Compound Engineering 提供工程执行、评审、反馈和知识复利链路。
- 参考官方 README、公开文档和插件源码，介绍 skills 与 agents 的能力地图，但正文不写成插件 API 手册、版本发布说明或命令大全。
- 每篇正文至少包含一种结构化视觉表达，例如循环图、关系图、分组卡片、对比矩阵、流程组件、检查清单或多智能体分工图。

## 不在范围

- 不在本 change 中重写英文 `/en/compound/` 完整正文；英文页面可保持简要占位或补充稳定入口。
- 不在本 change 中安装、升级或修改 compound-engineering-plugin。
- 不在本 change 中生成实时版本追踪、完整 changelog 解读、价格/计费说明或跨平台安装评测。
- 不在本 change 中为每一个 `ce-*` skill 都写独立深度教程；首批重点建立方法论主线和高优先级文章。
- 不在本 change 中替代 `/workflows/` 栏目的具体端到端流程演练；Compound 栏目可链接工程流程，但不承载所有操作手册。
- 不在本 change 中直接修改 OpenSpec 或学习路径栏目正文，除非为避免死链进行必要内链补充。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | `/compound/` | 展示名建议调整为“Compound Engineering（工程复利）”，说明方法论定位、核心循环、分组阅读路径和与其他栏目的关系。 |
| 页面 | `/compound/`、`/compound/what-is-compound-engineering/`、`/compound/workflow-loop/`、`/compound/strategy-brainstorm-plan/`、`/compound/work-debug-review/`、`/compound/multi-agent-review/`、`/compound/reviewer-personas/`、`/compound/document-review-agents/`、`/compound/design-review-agents/`、`/compound/research-agents/`、`/compound/agent-orchestration/`、`/compound/review-boundaries/`、`/compound/knowledge-compounding/`、`/compound/with-openspec/` | 首批中文正文和多智能体拆分文章。若实现阶段发现篇幅过大，可在 doc-change/tasks 中分 P0/P1 交付，但不得丢失已确认的信息架构。 |
| 导航/侧边栏 | `site/.vuepress/collections/compound.ts` | 将 Compound 中文侧边栏从单页入口改为分组结构，保持 `README.md` 为栏目首页；英文 collection 可继续只保留 README。 |
| 路由/frontmatter | 中文 Compound 页面 frontmatter | 新增页面必须提供稳定 `title`、`permalink`、`createTime`，permalink 与侧边栏链接一致。 |
| 站点配置 | 可能涉及复用或新增视觉组件 | 优先复用现有 `FlowExplainer`、Markdown 表格、提示块、卡片和已有图示组件；如需新增多智能体关系图组件，应保持轻量并通过构建验证。 |

## 成功标准

- [ ] `/compound/` 首页已改写为 Compound Engineering（工程复利）栏目首页，清楚说明“Compound Engineering”与单个 `/ce-compound` skill 的区别。
- [ ] 中文侧边栏按“总览 / 定义与计划 / 执行与质量 / 评审质量 / 知识复利 / 关系”或等价结构分组，且页面顺序符合读者学习路径。
- [ ] 首批中文正文已创建或改写，并达到可发布内容，不是占位页或纯大纲。
- [ ] 多智能体评审已拆成多篇文章，至少覆盖多智能体评审概念、Reviewer Personas、文档评审智能体、设计/UI 评审智能体、Research Agents、协作关系和适用边界。
- [ ] `agent-orchestration` 或等价页面说明多类 agents 之间的关系，包括任务分派、并行、去重、置信度门禁、综合输出和人工判断边界。
- [ ] `knowledge-compounding` 页面说明 `/ce-compound`、`/ce-compound-refresh`、`docs/solutions/`、frontmatter、problem_type 和知识刷新如何让一次解决变成团队资产。
- [ ] `with-openspec` 页面说明 Compound Engineering、OpenSpec 和工程流程的职责边界和组合方式，避免方法论重复或互相覆盖。
- [ ] 正文参考官方 README、公开文档和插件源码时，标注事实源口径；涉及版本、技能数量、命令名称等易变信息时使用“以官方 README 和对应插件源码为准”的表述。
- [ ] 每篇正文至少包含一种结构化视觉表达，不出现连续纯文字长文。
- [ ] 所有新增页面 permalink、侧边栏链接和栏目首页入口正确；正文不手写主题已提供的上一篇/下一篇导航。
- [ ] `pnpm docs:build` 或项目确认的等效文档站构建检查通过。
- [ ] 归档前已处理 `openspec/project-docs.md` 回写，记录 Compound 栏目状态、页面清单、阅读路径、内容缺口和写作约定。

## 约束与假设

- [ASSUMPTION] 中文正文优先完成；英文 `/en/compound/` 暂不要求同步完整重写，只需保持入口可访问且无死链。
- [ASSUMPTION] 本 change 的主要事实源包括 `EveryInc/compound-engineering-plugin` 官方 README、公开文档、插件源码中的 skills 与 agents 说明，以及本站现有 OpenSpec / 学习路径栏目风格。
- [ASSUMPTION] 栏目名称采用“Compound Engineering（工程复利）”，路由继续使用 `/compound/`，避免破坏既有链接。
- [DOC-GAP] 当前 `openspec/project-docs.md` 尚未记录 Compound 栏目的正式页面清单、阅读路径和内容边界，归档前需要回写。
- [DOC-GAP] `site/compound/README.md` 目前为占位页，`site/.vuepress/collections/compound.ts` 目前只包含 `README.md`，缺少分组侧边栏。
- [SITE-CONFIG-IMPACT] 若新增视觉组件或图示资产，需要检查 VuePress/Plume 构建、移动端布局、亮暗主题可读性和资源路径；优先复用现有组件，避免为单页引入重依赖。
