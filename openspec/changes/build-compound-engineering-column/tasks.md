# Tasks: build-compound-engineering-column

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [x] 1.1 核对事实源：`EveryInc/compound-engineering-plugin` 官方 README、公开文档、插件源码中的 `SKILL.md` 和 agents 说明；记录正文口径，避免把版本、数量和命令细节写成永久事实。
- [x] 1.2 改写 `site/compound/README.md`，将栏目首页升级为“Compound Engineering（工程复利）”，包含定位、核心循环、分组入口和事实源说明。
- [x] 1.3 新增 `site/compound/what-is-compound-engineering.md`，解释方法论、插件、skill、agent、`/ce-compound` 的层级关系，以及工程复利与一次性代码生成的区别。
- [x] 1.4 新增 `site/compound/workflow-loop.md`，说明 `ce-strategy -> ce-ideate -> ce-brainstorm -> ce-plan -> ce-work -> ce-code-review/ce-debug -> ce-compound -> ce-product-pulse` 的闭环。
- [x] 1.5 新增 `site/compound/strategy-brainstorm-plan.md`，说明定义与计划阶段如何把模糊想法转成 requirements、plan、implementation units 和验证边界。
- [x] 1.6 新增 `site/compound/work-debug-review.md`，说明 `ce-work`、`ce-debug`、`ce-code-review`、`ce-simplify-code`、`ce-optimize`、`ce-polish-beta` 的职责边界和协作顺序。
- [x] 1.7 新增 `site/compound/multi-agent-review.md`，说明多智能体评审的价值、单 Agent 容易遗漏的风险、并行审查与综合输出的基础模型。
- [x] 1.8 新增 `site/compound/reviewer-personas.md`，拆解 correctness、security、performance、maintainability、testing、scope、simplicity、project standards 等 reviewer personas 的关注点和边界。
- [x] 1.9 新增 `site/compound/document-review-agents.md`，说明 coherence、feasibility、product lens、scope guardian、security lens、adversarial document reviewer 等文档评审智能体如何前置发现风险。
- [x] 1.10 新增 `site/compound/design-review-agents.md`，说明 `ce-design-lens-reviewer`、`ce-design-implementation-reviewer`、`ce-design-iterator`、`ce-figma-design-sync` 等设计/UI 评审与同步能力。
- [x] 1.11 新增 `site/compound/research-agents.md`，说明 repo、session、Slack、web、issue、learnings research 等研究型 agents 如何补足上下文，并明确事实源优先级和隐私边界。
- [x] 1.12 新增 `site/compound/agent-orchestration.md`，作为多智能体关系总览，说明 orchestrator/dispatcher、parallel agents、dedup、confidence gate、final synthesis 和 human decision gate 如何协作。
- [x] 1.13 新增 `site/compound/review-boundaries.md`，说明多智能体评审的适用边界、轻量/完整/文档 review 选择矩阵，以及哪些判断必须人工负责。
- [x] 1.14 新增 `site/compound/knowledge-compounding.md`，说明 `/ce-compound`、`/ce-compound-refresh`、`docs/solutions/`、YAML frontmatter、problem_type、discoverability check 和 refresh 机制。
- [x] 1.15 新增 `site/compound/with-openspec.md`，说明 Compound Engineering、OpenSpec 和工程流程的职责边界、组合路径和典型使用顺序。
- [x] 1.16 正文不手写主题已提供的前后篇导航；必要的关系说明放在正文或侧边栏分组中。
- [x] 1.17 每篇正文至少加入一种结构化视觉表达：循环图、层级图、对比矩阵、persona 矩阵、证据拓扑、关系图、边界决策树、检查清单或卡片组。
- [x] 1.18 检查所有正文不暴露机器绝对路径、不复制插件内部长 prompt、不泄露私密会话或组织上下文。

## 2. 站点结构与配置

- [x] 2.1 更新 `site/.vuepress/collections/compound.ts`，将 `compoundCollection` title 调整为 `Compound Engineering` 或等价展示名，并改为分组侧边栏。
- [x] 2.2 侧边栏按 doc-change.md 的分组组织：栏目首页、总览、定义与计划、执行与质量、多智能体、知识、关系；保持 `README.md` 为栏目首页。
- [x] 2.3 为新增中文页面设置稳定 frontmatter：`title`、`permalink`、`createTime`；permalink 必须与侧边栏链接一致。
- [x] 2.4 检查 `site/en/compound/README.md` 是否需要补充稳定英文占位或中文入口；不要求完整英文正文，但不得新增死链。
- [x] 2.5 优先复用现有 `FlowExplainer`、Markdown 表格、提示块、卡片和已有图示组件表达核心循环和关系图。
- [x] 2.6 如现有组件不足以表达多智能体关系，新增轻量组件或图示资产；实现中未新增组件或图示资产，复用现有 Markdown、表格和 `FlowExplainer` 可满足表达。
- [x] 2.7 如新增图示资产，将资源放在站点公开资源目录或项目约定图示目录，正文使用稳定站内路径，不引用机器绝对路径；实现中未新增图示资产。
- [x] 2.8 不新增全站标签体系、不新增顶层导航、不新增外部运行时依赖，除非实现阶段发现现有组件确实无法满足表达且需记录原因。

## 3. 事实源与引用核对

- [x] 3.1 核对官方 README 的 Core Workflow、Research & Context、Git Workflow、Workflow Utilities、Review & Quality、Agents 分组，正文按方法论转译而不是复制清单。
- [x] 3.2 核对公开文档和插件源码中的 skills/agents 信息；正文不写安装版本、缓存路径或当前数量，易变信息以官方 README 和对应插件源码为准。
- [x] 3.3 核对 `ce-compound` 和 `ce-compound-refresh` 的知识库结构、frontmatter、problem_type、refresh 机制，确保 `knowledge-compounding` 不误写为泛泛复盘文章。
- [x] 3.4 核对多智能体相关 agents 名称和角色，不把内部 prompt 或实现细节完整搬进公开正文。
- [x] 3.5 检查所有外部链接是否必要、可访问，并避免把非官方社区解释写成插件官方能力。

## 4. 验证

- [x] 4.1 检查 `/compound/` 和 13 个新增中文页面路径可访问。
- [x] 4.2 检查 Compound 中文侧边栏分组、栏目首页入口和页面顺序正确。
- [x] 4.3 检查文章间内链，以及指向 `/openspec/`、`/workflows/`、`/resources/glossary/` 的跨栏目链接。
- [x] 4.4 检查代码块、命令、示例和事实源说明，避免危险命令或未解释的高风险操作。
- [x] 4.5 检查每篇正文都有结构化视觉表达，不是纯文字长文；多智能体关系页必须包含关系图；设计/UI 评审页必须说明 design lens 与 design implementation review 的边界。
- [x] 4.6 如新增组件或图示资产，进行预览或截图检查，确认桌面和移动端不溢出、不遮挡，亮暗主题可读；实现中未新增组件或图示资产。
- [x] 4.7 运行 `pnpm docs:build` 或项目确认的等效文档站构建检查。
- [x] 4.8 如构建失败，修复与本 change 相关的问题；若失败来自无关既有问题，记录风险和复现命令。

## 5. Archive Gate

- [x] 5.1 完成 doc-change.md 中的 Archive Updates。
- [x] 5.2 更新 `openspec/project-docs.md`，记录 Compound Engineering 栏目状态、页面清单、阅读路径、内容缺口和写作约定。
- [x] 5.3 确认验证结果已记录。
- [x] 5.4 确认本 change 可归档。
