# Doc Change: build-compound-engineering-column

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：`compound`
- 涉及页面：`/compound/`、`/compound/what-is-compound-engineering/`、`/compound/workflow-loop/`、`/compound/strategy-brainstorm-plan/`、`/compound/work-debug-review/`、`/compound/multi-agent-review/`、`/compound/reviewer-personas/`、`/compound/document-review-agents/`、`/compound/research-agents/`、`/compound/agent-orchestration/`、`/compound/review-boundaries/`、`/compound/knowledge-compounding/`、`/compound/with-openspec/`
- 涉及导航/侧边栏：是
- 涉及站点配置：是，取决于是否复用现有 `FlowExplainer` 或新增轻量图示组件

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| `site/compound/README.md` | 存在，但只是一页占位入口，标题为 `Compound`，正文只有一句栏目说明和少量入口链接。 | 没有解释 Compound Engineering 的方法论定位、核心循环、技能/智能体能力地图，也没有说明它与 `/ce-compound`、OpenSpec 的区别。 |
| `site/.vuepress/collections/compound.ts` | 中文 compound collection 只包含 `README.md`，title 为 `Compound`；英文 collection 也只包含 `README.md`。 | 缺少中文侧边栏分组，无法承载首批正文；栏目展示名也未体现“Compound Engineering（工程复利）”。 |
| `site/en/compound/README.md` | 英文占位页存在。 | 中文优先策略下可不写完整英文，但新增中文页面后英文入口不能产生死链或错误承诺。 |
| `openspec/project-docs.md` | 已记录学习路径和 OpenSpec 栏目状态。 | 尚未记录 Compound 栏目的正式页面清单、阅读路径、内容边界和写作约定。 |
| Compound Engineering 事实源 | 官方 README、公开文档和插件源码包含 skills、agents 和分类信息。 | 站内尚未把这些信息转成读者可理解的方法论文章；需要避免复制 README 命令清单，也要避免把动态版本信息写死。 |
| 多智能体评审内容 | 插件源码包含 reviewer、document reviewer、design/UI reviewer、research、workflow 等多类 agents。 | 如果只写一篇总览会过于拥挤；需要拆成概念、角色、文档评审、设计/UI 评审、研究智能体、协作关系和边界。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 修改 | Compound 栏目首页 | `site/compound/README.md` | 改写为“Compound Engineering（工程复利）”首页，包含定位、核心循环、栏目分组、首批文章入口、事实源说明和后续阅读路径。 |
| 新增 | Compound Engineering 是什么 | `site/compound/what-is-compound-engineering.md` | 定义 Compound Engineering，解释工程复利、方法论、插件和 `/ce-compound` 的区别。 |
| 新增 | 工程复利核心循环 | `site/compound/workflow-loop.md` | 说明从 `ce-strategy` 到 `ce-product-pulse` 的定义与计划、执行、评审、知识沉淀和结果回看闭环。 |
| 新增 | 策略、构思与计划 | `site/compound/strategy-brainstorm-plan.md` | 说明 `ce-strategy`、`ce-ideate`、`ce-brainstorm`、`ce-plan` 如何把模糊想法转成可执行计划。 |
| 新增 | 执行、调试与评审 | `site/compound/work-debug-review.md` | 说明 `ce-work`、`ce-debug`、`ce-code-review`、`ce-optimize` 的职责边界和协作顺序。 |
| 新增 | 多智能体评审是什么 | `site/compound/multi-agent-review.md` | 说明为什么单个 Agent 容易漏问题，以及多视角评审如何降低风险。 |
| 新增 | Reviewer Personas | `site/compound/reviewer-personas.md` | 拆解 correctness、security、performance、maintainability、testing、scope、simplicity 等 reviewer 角色。 |
| 新增 | 文档评审智能体 | `site/compound/document-review-agents.md` | 说明 coherence、feasibility、product、scope、security lens 等文档评审角色如何审 proposal、plan、spec 或说明文档。 |
| 新增 | 设计与 UI 评审智能体 | `site/compound/design-review-agents.md` | 说明 `ce-design-lens-reviewer`、`ce-design-implementation-reviewer`、`ce-design-iterator`、`ce-figma-design-sync` 等能力如何覆盖设计决策、交互状态、Figma 对齐和 UI 质量。 |
| 新增 | Research Agents | `site/compound/research-agents.md` | 说明 repo、session、Slack、web、issue、learnings 等研究型 agent 如何补足上下文。 |
| 新增 | 多智能体如何协作 | `site/compound/agent-orchestration.md` | 作为多智能体分组的关系总览，说明 dispatcher、并行、去重、置信度门禁、综合输出和人工判断边界。 |
| 新增 | 多智能体评审边界 | `site/compound/review-boundaries.md` | 说明什么时候值得上多智能体评审，什么时候过重，以及哪些结论必须人工判断。 |
| 新增 | 知识如何复利 | `site/compound/knowledge-compounding.md` | 说明 `/ce-compound`、`/ce-compound-refresh`、`docs/solutions/`、frontmatter、problem_type、refresh 机制和可发现性。 |
| 新增 | 与 OpenSpec 如何配合 | `site/compound/with-openspec.md` | 说明 Compound Engineering、OpenSpec 和工程流程的职责边界、组合路径和典型使用顺序。 |
| 修改 | Compound 中文侧边栏 | `site/.vuepress/collections/compound.ts` | 将 sidebar 从 `['README.md']` 改成分组结构，建议分为“总览 / 定义与计划 / 执行与质量 / 多智能体 / 知识 / 关系”。 |
| 可能修改 | Compound 英文入口 | `site/en/compound/README.md` | 仅在需要时补充“English content is being prepared”的稳定说明和中文入口，避免死链；不写完整英文正文。 |
| 可能新增 | 视觉组件或图示资产 | `site/.vuepress/components/`、`site/.vuepress/public/diagrams/compound/` | 优先复用 `FlowExplainer`；如 Markdown 难以表达多智能体关系，可新增轻量组件或图示资产。 |
| 修改 | 文档基线 | `openspec/project-docs.md` | 归档前回写 Compound 栏目状态、页面清单、阅读路径、内容缺口和写作约定。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/compound/` | 进入 Compound 栏目的读者 | Compound Engineering 栏目总览和阅读路径。 | “Compound Engineering（工程复利）”命名、核心循环图、分组入口、事实源说明、与 OpenSpec/workflows 的关系说明。 | 复制插件 README 的完整 skills 表；单独讲 `/ce-compound` 细节；手写主题已提供的上一篇/下一篇导航。 |
| `/compound/what-is-compound-engineering/` | 第一次听到 Compound Engineering 的读者 | Compound Engineering 是把工程工作组织成可复利链路的方法论和工具集合。 | 方法论、插件、skill、agent、`/ce-compound` 的区别；工程复利的判断标准；适用场景速览。 | 命令大全、版本 changelog、安装教程。 |
| `/compound/workflow-loop/` | 想理解整体链路的读者 | 从策略到结果回看的闭环，而不是单次代码生成。 | `ce-strategy`、`ce-ideate`、`ce-brainstorm`、`ce-plan`、`ce-work`、`ce-code-review`、`ce-debug`、`ce-compound`、`ce-product-pulse` 的位置；循环图。 | 每个 skill 的完整内部实现细节。 |
| `/compound/strategy-brainstorm-plan/` | 需求不清、想把想法变成计划的读者 | 定义与计划阶段把方向、问题、约束和计划写清楚。 | `STRATEGY.md`、ideation、interactive Q&A、right-sized requirements、plan handoff、适合进入 OpenSpec 的边界。 | 把 brainstorm 写成产品经理万能模板；把 plan 当不可变执行脚本。 |
| `/compound/work-debug-review/` | 准备交付真实代码任务的读者 | 执行、调试和评审分别解决不同风险。 | `ce-work` 执行计划、`ce-debug` 根因调查、`ce-code-review` 多视角评审、`ce-optimize` 迭代优化、何时进入下一步。 | 自动承诺“无需人工 review”；鼓励无验证执行。 |
| `/compound/multi-agent-review/` | 想理解多智能体价值的读者 | 多智能体评审用不同视角发现单 Agent 易漏的问题。 | 单 Agent 风险、多视角价值、分派与综合的基本模型、适用任务类型。 | 具体列完所有 reviewer；把多智能体写成越多越好。 |
| `/compound/reviewer-personas/` | 想知道代码评审角色分工的读者 | Reviewer personas 不是重复审查，而是按风险维度拆分注意力。 | correctness、security、performance、maintainability、testing、scope、simplicity、project standards 等角色；各自看什么、不看什么。 | 每个 agent 的完整 prompt；无法验证的泛泛质量口号。 |
| `/compound/document-review-agents/` | 写 proposal、plan、spec、需求文档的读者 | 文档评审智能体用于在实现前暴露矛盾、缺口和范围风险。 | coherence、feasibility、product lens、scope guardian、security lens、design lens、adversarial document review；适合评审哪些文档。 | 把文档评审等同语法润色；替代用户确认。 |
| `/compound/design-review-agents/` | 做 UI、前端实现或设计同步的读者 | 设计与 UI 评审智能体用于检查设计决策、交互状态、AI slop 风险和实现是否贴合设计稿。 | `ce-design-lens-reviewer`、`ce-design-implementation-reviewer`、`ce-design-iterator`、`ce-figma-design-sync` 的职责边界；Figma/设计规范对齐；与文档评审和代码评审的区别。 | 把设计评审写成审美偏好；把 Figma 对齐等同于产品正确性。 |
| `/compound/research-agents/` | 需要补上下文再决策的读者 | Research agents 负责从仓库、会话、Slack、Web、Issue、learnings 等来源补足证据。 | repo research、session history、Slack research、web research、issue intelligence、learnings research 的边界；事实源优先级。 | 泄露私有上下文；把研究结果当无需核验的事实。 |
| `/compound/agent-orchestration/` | 已读多智能体拆分文章、想看关系的读者 | 多类 agents 如何被分派、并行、去重、置信度过滤并汇总为可执行结论。 | dispatcher、parallel agents、confidence gate、dedup pipeline、final synthesis、human decision gate；一张关系图。 | 重复前面每篇细节；承诺自动合并所有结论。 |
| `/compound/review-boundaries/` | 担心流程过重的读者 | 多智能体评审应按风险使用，不是所有任务都需要。 | 适用/不适用矩阵；轻量 review、完整 review、文档 review 的选择规则；人工判断边界。 | 把小改动也强制拉进完整流程。 |
| `/compound/knowledge-compounding/` | 想把解决过的问题沉淀为团队资产的读者 | `/ce-compound` 把一次解决写入可搜索的 `docs/solutions/`，`ce-compound-refresh` 防止知识漂移。 | `docs/solutions/`、YAML frontmatter、module、tags、problem_type、bug track/knowledge track、refresh、discoverability check；与本站 `docs/solutions/` 实例的关系。 | 暴露私密会话；把未验证猜测写成团队知识。 |
| `/compound/with-openspec/` | 已学习 OpenSpec，想组合方法论的读者 | OpenSpec 负责规范事实源，Compound Engineering 负责执行反馈循环，工程流程承载具体操作演练。 | 职责表、组合顺序、何时先 OpenSpec、何时先 brainstorm/plan、何时沉淀 solution。 | 把二者写成互相替代；引入新的项目管理体系。 |

## Learning Path Categories

| 分组 | 页面 | 目标 |
|---|---|---|
| 总览 | `/compound/`、`/compound/what-is-compound-engineering/`、`/compound/workflow-loop/` | 先建立 Compound Engineering 的方法论定位和工程循环。 |
| 定义与计划 | `/compound/strategy-brainstorm-plan/` | 说明策略、构思、需求澄清和计划如何进入可执行状态。 |
| 执行与质量 | `/compound/work-debug-review/` | 说明执行、调试、评审和优化的交付链路。 |
| 多智能体 | `/compound/multi-agent-review/`、`/compound/reviewer-personas/`、`/compound/document-review-agents/`、`/compound/design-review-agents/`、`/compound/research-agents/`、`/compound/agent-orchestration/`、`/compound/review-boundaries/` | 拆解多智能体评审的角色、关系、协作方式和边界。 |
| 知识 | `/compound/knowledge-compounding/` | 说明知识沉淀、刷新和可发现性。 |
| 关系 | `/compound/with-openspec/` | 把 Compound Engineering 与 OpenSpec、工程流程串起来。 |

## Article Blueprints

### `/compound/` Compound Engineering（工程复利）

- 核心结论：Compound Engineering 不是单个命令，而是让每次工程工作都为下一次工作降低成本的协作系统。
- 建议结构：
  1. 这是什么：策略、计划、执行、评审、知识沉淀和结果回看的工程复利链路。
  2. 为什么叫复利：一次解决不只交付代码，还留下可复用策略、计划、review 经验和解决方案文档。
  3. 核心循环：定义与计划、执行与质量、评审质量、知识复利、团队信号。
  4. 栏目分组和阅读顺序。
  5. 与 OpenSpec、工程流程栏目的入口关系。
- 视觉要求：必须包含核心循环图或分组入口卡片。

### `/compound/what-is-compound-engineering/`

- 核心结论：Compound Engineering 是一套工程复利方法论，compound-engineering-plugin 是它在 AI coding agent 中的工具化实现，`/ce-compound` 只是知识沉淀环节。
- 建议结构：
  1. 方法论、插件、skill、agent 的层级关系。
  2. 工程复利与一次性代码生成的区别。
  3. 一次任务如何留下策略、计划、review、solution 和 outcome 信号。
  4. 适用场景和不适用场景速览。
- 视觉要求：使用层级图或对比矩阵区分 Method / Plugin / Skill / Agent / Command。

### `/compound/workflow-loop/`

- 核心结论：Compound Engineering 的主线是从方向定义到用户结果的闭环，而不是从 prompt 到代码的直线。
- 建议结构：
  1. 方向锚点：`ce-strategy`。
  2. 想法到计划：`ce-ideate`、`ce-brainstorm`、`ce-plan`。
  3. 执行与质量：`ce-work`、`ce-debug`、`ce-code-review`、`ce-simplify-code`、`ce-optimize`。
  4. 沉淀与反馈：`ce-compound`、`ce-compound-refresh`、`ce-product-pulse`。
  5. 什么时候从完整循环中截取一段使用。
- 视觉要求：优先复用 `FlowExplainer` 做循环或时间线。

### `/compound/strategy-brainstorm-plan/`

- 核心结论：计划不是为了让 Agent 少问问题，而是为了让人和 Agent 对目标、边界、风险和验证形成同一份上下文。
- 建议结构：
  1. `ce-strategy` 如何提供长期产品锚点。
  2. `ce-ideate` 如何发散并批判性筛选想法。
  3. `ce-brainstorm` 如何通过互动问答生成 right-sized requirements。
  4. `ce-plan` 如何把需求转成 implementation units、scope boundaries、verification。
  5. 与 OpenSpec proposal/design/tasks 的衔接边界。
- 视觉要求：使用“模糊想法 -> requirements -> plan -> implementation units”的转化图。

### `/compound/work-debug-review/`

- 核心结论：执行、调试和评审不是同一个动作；它们分别处理交付、根因和风险覆盖。
- 建议结构：
  1. `ce-work` 如何按计划执行并保持验证。
  2. `ce-debug` 如何从症状、假设、复现、根因到修复。
  3. `ce-code-review` 如何通过多 persona 找风险。
  4. `ce-simplify-code`、`ce-optimize`、`ce-polish-beta` 在交付后段的位置。
  5. 何时回到 plan 或 OpenSpec 更新范围。
- 视觉要求：使用执行链路图或职责边界表。

### `/compound/multi-agent-review/`

- 核心结论：多智能体评审的价值不是“更多 AI 输出”，而是把注意力按风险维度分配给不同 reviewer，再由主流程综合。
- 建议结构：
  1. 单 Agent review 容易遗漏什么。
  2. 多 persona 如何拆分注意力。
  3. 并行审查与去重综合的基本过程。
  4. 哪些任务值得用多智能体评审。
- 视觉要求：使用“同一 diff -> 多视角 reviewer -> 合并 findings”的流程图。

### `/compound/reviewer-personas/`

- 核心结论：Reviewer personas 应按风险维度工作，每个角色只对自己的专业风险负责。
- 建议结构：
  1. correctness / testing：行为正确和测试缺口。
  2. security / data integrity：安全、权限、数据风险。
  3. performance / reliability：性能和生产稳定性。
  4. maintainability / simplicity / scope：可维护性、简单性、范围漂移。
  5. project standards：项目规则和 AGENTS.md 合规。
- 视觉要求：使用 persona 矩阵，列出角色、关注点、典型发现、不是它负责的内容。

### `/compound/document-review-agents/`

- 核心结论：文档评审智能体把风险前移到 proposal、plan、spec、需求文档阶段。
- 建议结构：
  1. 为什么文档也需要多视角 review。
  2. coherence、feasibility、product lens、scope guardian、security lens、design lens、adversarial document reviewer 的分工。
  3. 文档 review 输出如何回写到计划或 OpenSpec artifacts。
  4. 人类确认哪些内容。
- 视觉要求：使用文档类型与 reviewer 对照表。

### `/compound/design-review-agents/`

- 核心结论：设计与 UI 评审不是“看起来好不好”的主观评价，而是检查设计决策、交互状态、视觉质量和实现对齐是否支撑用户目标。
- 建议结构：
  1. `ce-design-lens-reviewer` 如何在计划或方案阶段发现缺失的设计决策、交互状态和 AI slop 风险。
  2. `ce-design-implementation-reviewer` 如何检查 UI 实现是否匹配 Figma 或设计规范。
  3. `ce-design-iterator` 和 `ce-figma-design-sync` 在设计迭代与同步中的位置。
  4. 设计评审与产品评审、代码评审、文档评审的边界。
  5. 哪些 UI 判断必须回到真实用户、品牌规范或设计系统确认。
- 视觉要求：使用“方案设计 -> UI 实现 -> 设计对齐 -> 迭代同步”的流程图或角色矩阵。

### `/compound/research-agents/`

- 核心结论：研究型 agents 负责补证据，不负责替人做最终决策。
- 建议结构：
  1. repo research：读仓库事实。
  2. session history：找历史上下文。
  3. Slack / issue / web research：补组织和外部事实。
  4. learnings research：搜索 `docs/solutions/` 或团队知识。
  5. 事实源优先级和隐私边界。
- 视觉要求：使用证据来源拓扑图或事实源优先级表。

### `/compound/agent-orchestration/`

- 核心结论：多智能体协作需要分派、并行、去重、置信度门禁和主线综合，否则只会制造噪声。
- 建议结构：
  1. Orchestrator / dispatcher 的职责。
  2. 并行 agents 如何各自返回 findings。
  3. Dedup 和 confidence gate 如何减少重复和低置信发现。
  4. Final synthesis 如何转成可执行结论。
  5. 人工判断和项目事实如何压过 agent 输出。
- 视觉要求：必须包含多智能体关系图，展示 orchestrator、reviewers、researchers、document reviewers、dedup、final output 的关系。

### `/compound/review-boundaries/`

- 核心结论：多智能体评审应该按风险使用，过度使用会增加噪声和流程成本。
- 建议结构：
  1. 适合完整 review 的场景：跨模块、权限、数据、安全、性能、用户关键路径。
  2. 适合轻量 review 的场景：局部样式、文案、低风险文档。
  3. 不适合自动判断的场景：业务取舍、产品方向、组织约束。
  4. 选择矩阵：no review / lightweight / full review / document review。
- 视觉要求：使用适用边界矩阵或决策树。

### `/compound/knowledge-compounding/`

- 核心结论：解决问题后立刻写入结构化知识库，才能让下一次类似问题更快解决。
- 建议结构：
  1. `/ce-compound` 的目标：捕获刚解决的问题。
  2. `docs/solutions/` 的结构和 frontmatter。
  3. bug track 与 knowledge track 的 problem_type。
  4. `ce-compound-refresh` 如何处理过期、漂移或重复知识。
  5. 与本站已有 `docs/solutions/` 的示例关系。
- 视觉要求：使用“问题 -> 解决 -> solution doc -> future search -> refresh”的闭环图。

### `/compound/with-openspec/`

- 核心结论：三者不是竞争关系，而是在不同层面约束 AI 工程协作。
- 建议结构：
  1. OpenSpec：规范层、事实源、变更边界。
  2. Compound Engineering：工程执行、评审、反馈、知识复利。
  3. 工程流程：具体端到端操作演练。
  4. 典型组合路径：先 OpenSpec 再 ce-work；先 ce-brainstorm 再 OpenSpec；完成后 ce-compound。
  5. 什么时候只用其中一个。
- 视觉要求：使用职责边界表和组合路径图。

## Site Impact

- 导航：不新增顶层导航；继续沿用现有 `/compound/` 顶层栏目入口。
- 侧边栏：中文 `compoundCollection` 改为分组侧边栏，建议结构：
  - 栏目首页：`/compound/`
  - 总览：`what-is-compound-engineering`、`workflow-loop`
  - 定义与计划：`strategy-brainstorm-plan`
  - 执行与质量：`work-debug-review`
  - 多智能体：`multi-agent-review`、`reviewer-personas`、`document-review-agents`、`design-review-agents`、`research-agents`、`agent-orchestration`、`review-boundaries`
  - 知识：`knowledge-compounding`
  - 关系：`with-openspec`
- 路由：中文页面采用稳定 permalink：`/compound/<slug>/`。文件名与 slug 保持一致。
- frontmatter：所有新增中文页面必须包含 `title`、`permalink`、`createTime`；栏目首页 title 建议为 `Compound Engineering`。
- 标签/分类：Compound 作为 doc collection，本 change 不新增标签体系。
- 搜索影响：新增中文正文会进入站内搜索；标题应避免过长，便于侧边栏和搜索展示。
- 多语言影响：英文 `/en/compound/` 暂不写完整正文；如新增提示，应保持无死链，并说明中文正文优先。
- 构建/部署影响：Markdown 页面和侧边栏更新必须通过 `pnpm docs:build`；如新增组件或图示资产，还需检查 SSR/客户端兼容、移动端布局和亮暗主题可读性。

## Validation

- [x] `/compound/` 和 13 个新增中文页面路径可访问。
- [x] Compound 中文侧边栏分组、栏目首页入口和页面顺序正确。
- [x] 内链有效，尤其是指向 `/openspec/`、`/workflows/`、`/resources/glossary/` 的链接。
- [x] 代码块、命令或示例已检查，避免把当前插件版本的动态信息写成永久事实。
- [x] 官方 README、公开文档和插件源码中的 skills/agents 事实源口径已核对，并在正文中避免写死动态版本信息。
- [x] 每篇正文都包含结构化视觉表达，不是纯文字长文。
- [x] 多智能体分组至少包含概念、角色、文档评审、设计/UI 评审、研究、协作关系和边界七类内容。
- [x] `pnpm docs:build` 或项目确认的等效文档站构建检查通过。
- [x] 未新增组件或图示资产；本项无需额外预览或截图检查。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新。
- [x] 栏目结构已更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- 不适用；本 change 会改变正式栏目结构和页面清单，归档前必须回写 `openspec/project-docs.md`。
