# Project Docs Baseline

> 本文件是文档站长期基线，记录归档后的当前状态。
> 每个 aisee-docsite-driven change 归档前，应回写本文件，或在 doc-change.md 写明无需回写的原因。

## 1. 文档站定位

- 文档站名称：AI SEE Wiki
- 目标读者：正在学习 AI Coding、Agent 工程化协作、OpenSpec / Compound / AISEE 工作流的开发者和团队维护者。
- 核心用途：沉淀 AI Engineering 指南路径、工程方法论、工作流说明和可复用实践。
- 内容边界：优先提供可执行、可验证、可复用的工程文档；不做实时模型排行榜、价格表或未经核对的第三方安装方案。

## 2. 栏目结构

| 栏目 | 路径 | 定位 | 状态 | 说明 |
|---|---|---|---|---|
| 指南 | `/learn/` | AI Coding 入门到 Agent 进阶的指南入口 | active | 按“认知入门 / 工具上手 / Agent 进阶”组织 12 篇正文，作为 Codex 和 Agent 基础主入口；公开展示名从“学习路径”调整为“指南”。 |
| AI Engineering | `/ai-engineering/` | AI 时代软件工程的方法论基础栏目 | active | 作为指南与 AISEE 主线实践之间的解释层，说明传统软件工程与 AI 增强软件工程的差异、延续、迁移方式，以及 Spec First、Harness Better、Compound Knowledge 三条主线为什么成立。 |
| AISEE | `/aisee/` | 从 AISEE 工作流视角介绍 AISEE Plugin、OpenSpec 与 Compound Engineering 的主线入口 | active | 顶栏 `AISEE` 展示二级菜单，直接进入 AISEE Plugin、OpenSpec、Compound Engineering；侧边栏包含相同三个子栏目；OpenSpec 和 Compound Engineering 是独立开源项目，本站在这里做深度介绍和组合实践说明，不暗示归属关系。 |
| OpenSpec | `/openspec/` | AI Engineering 的规范层与事实源方法论栏目 | active | 保留独立路由和 collection，作为 AISEE 栏目下的深度子栏目入口；按“栏目首页 / 作用 / 模型 / 用法 / 扩展 / 边界”组织中文正文。 |
| Compound Engineering | `/compound/` | AI Engineering 的工程复利方法论栏目 | active | 保留独立路由和 collection，作为 AISEE 栏目下的深度子栏目入口；按“总览 / 定义与计划 / 执行与质量 / 多智能体 / 知识 / 关系”组织中文正文。 |
| 开源项目 | `/projects/` | AISEE 团队自有或主导开源项目清单与项目介绍 | active | 展示团队自有项目、项目状态、仓库入口、文档入口和后续路线；不混入外部推荐资源。 |
| 推荐资源 | `/resources/` | AI Coding 推荐项目、工具和方法论资源目录 | active | 以精选推荐为主，展示 AI Coding、Agent 工程化、Skill、MCP、Spec-driven、UI/UX Skill 和代码上下文相关资源；不再作为模板、术语表、命令速查和检查清单的泛资源中心。 |

## 3. 页面清单

| 页面 | 路径 | 栏目 | 内容摘要 | 状态 | 后续动作 |
|---|---|---|---|---|---|
| 指南 | `/learn/` | 指南 | AI Coding 指南首页，汇总三类路径、12 篇正文和后续方法论入口。 | active | 后续链接 AI Engineering 和 AISEE 深度路径。 |
| AI Coding 到底改变了什么 | `/learn/ai-coding-intro/` | 指南 | 从补全、生成到 Agent 的发展，说明工程师角色变化和 AI 擅长/不擅长边界。 | active | 可补充更多课堂练习案例。 |
| AI 编程工具与模型怎么选 | `/learn/tools-and-models/` | 指南 | 介绍工具形态、模型能力维度、Codex/Claude/Gemini/GLM 推荐定位和选择矩阵。 | active | 定期核对官方文档，避免价格/额度过期。 |
| 给 AI 准备运行环境 | `/learn/runtime-setup/` | 指南 | 说明 Git、Node.js、Python、终端、编辑器、浏览器等基础环境及验证清单。 | active | 后续可拆 Windows/macOS/Linux 详细教程。 |
| Codex 安装、配置与第一次运行 | `/learn/codex-setup/` | 指南 | 作为本站 Codex 主入口，讲项目读取、命令执行、diff、权限边界和安全任务。 | active | Codex 产品入口变化时必须更新。 |
| 第一个 AI Coding 项目：复刻一个网站 | `/learn/first-ai-project/` | 指南 | 用自拟品牌复刻网站首页，训练选参考、拆模块、预览、修复和提交。 | active | 可追加完整示例仓库或演示截图。 |
| Agent 是怎么工作的 | `/learn/agent-basics/` | 指南 | 解释 Agent 的目标、上下文、工具、环境、约束和验证循环。 | active | 后续与具体 Agent 框架文章互链。 |
| Memory：让 Agent 带着上下文持续工作 | `/learn/agent-memory/` | 指南 | 区分当前会话、项目规则、项目记忆和全局记忆，并以 Codex 工作流举例。 | active | 后续可补 memory 沉淀规范。 |
| Skill：把经验封装成可复用能力 | `/learn/skills/` | 指南 | 说明 Skill 的触发、流程、模板、脚本和适用边界。 | active | 后续可链接项目内 skill 创建教程。 |
| MCP：让 Agent 连接外部能力 | `/learn/mcp/` | 指南 | 说明 MCP client/server、tool/resource/prompt 和外部系统连接边界。 | active | 后续可补 MCP 配置实战。 |
| Tool：Agent 真正执行动作的接口 | `/learn/tool-calls/` | 指南 | 说明工具调用闭环、常见工具类型和风险控制。 | active | 后续可补 shell/browser/git 工具专题。 |
| Hook：在关键节点加上自动检查和约束 | `/learn/hooks/` | 指南 | 说明 Hook 在任务开始、工具调用、修改后、提交前、归档前的检查作用。 | active | 后续可补 Codex hook 配置示例。 |
| Agent 的核心组成如何配合 | `/learn/agent-orchestration/` | 指南 | 以 Codex 智能体为例串起 Memory、Skill、MCP、Tool、Hook 的分工。 | active | 后续作为 OpenSpec/Compound/AISEE 进阶入口。 |
| AI Engineering | `/ai-engineering/` | AI Engineering | 方法论基础栏目首页，说明 AI Engineering 是指南与 AISEE 之间的解释层，并对比传统工程和 AI 增强工程的核心问题、三条主线和推荐阅读顺序。 | active | 后续可补英文完整正文和真实团队采用案例。 |
| 传统软件工程和 AI 增强软件工程有什么不同 | `/ai-engineering/traditional-vs-ai-engineering/` | AI Engineering | 对比传统工程和 AI 增强工程在任务分工、上下文、交付物、验证、团队协作、知识复用和研发流程环节上的差异。 | active | 后续可补真实团队迁移案例。 |
| 从传统研发流程到 AISEE 工作流 | `/ai-engineering/from-traditional-flow-to-aisee/` | AI Engineering | 说明如何从传统 Issue、PR、Review、CI 流程迁移到 Spec Layer、Harness Layer、Verification Gate 和 Compound Layer。 | active | 后续可补真实团队落地案例和示例 change。 |
| AI 没有改变什么 | `/ai-engineering/what-does-not-change/` | AI Engineering | 说明需求、设计、测试、评审、架构判断和安全边界没有消失，反而因 AI 被放大。 | active | 后续可补检查清单和反例。 |
| 从 Prompt 到 Spec | `/ai-engineering/prompt-to-spec/` | AI Engineering | 说明 prompt 适合启动对话，但重要工程判断应进入可审查、可验证、可归档的 spec。 | active | 后续可与 OpenSpec 实战互链。 |
| 从 Tool 到 Harness | `/ai-engineering/tool-to-harness/` | AI Engineering | 说明 Tool 解决动作问题，Harness 解决上下文、权限、Hook、验证和沉淀边界。 | active | 后续可与 AISEE 工程流程互链。 |
| 从经验到复利 | `/ai-engineering/experience-to-compounding/` | AI Engineering | 说明一次解决如何通过 solution docs、review findings、memory、skill 和 template 变成团队复利。 | active | 后续可补 `docs/solutions/` 真实案例。 |
| 工程师在 AI 时代的新职责 | `/ai-engineering/engineer-role/` | AI Engineering | 说明工程师从单纯实现者转向目标定义、上下文组织、执行监督、验证设计、风险判断和知识沉淀。 | active | 后续可补个人能力路径。 |
| OpenSpec | `/openspec/` | OpenSpec | OpenSpec 栏目首页，说明定位、能力地图、核心对象、工作方式、阅读顺序、适用边界和术语速览。 | active | 后续可补英文完整正文和真实项目演练。 |
| OpenSpec 是什么 | `/openspec/what-is-openspec/` | OpenSpec | 解释 AI 编程时代为什么需要规范层，说明 OpenSpec 如何把临时上下文变成可审查的工程事实。 | active | 后续可补更多团队协作案例。 |
| OpenSpec 心智模型 | `/openspec/mental-model/` | OpenSpec | 说明 `openspec/specs/`、`openspec/changes/`、artifacts、delta spec 和 archive 的对象关系。 | active | 后续可补可交互关系图。 |
| OpenSpec 基础工作流 | `/openspec/workflow/` | OpenSpec | 说明从 propose 到 archive 的基础动作、阶段输入输出、验证节点和归档含义。 | active | 后续可结合 workflows 栏目补端到端执行案例。 |
| Artifact 写法指南 | `/openspec/artifact-guide/` | OpenSpec | 说明 proposal、spec、design、tasks 的职责、写法、顺序边界、常见误区和审查清单。 | active | 后续可整理为模板速查页。 |
| Spec 粒度设计 | `/openspec/spec-granularity/` | OpenSpec | 说明项目级、模块级、能力级 spec 的划分原则、过粗/过细风险和并行 change 影响。 | active | 后续可补更多大型项目拆分示例。 |
| Delta Spec 深度解析 | `/openspec/delta-spec/` | OpenSpec | 说明 delta spec 的作用、ADDED/MODIFIED/REMOVED 语义、与主 specs 的关系和归档后的事实源更新。 | active | 后续可补 requirement 重命名专题。 |
| OpenSpec Schema 是什么 | `/openspec/schema/` | OpenSpec | 说明 schema 如何定义 artifact DAG、模板、apply gate 和项目级工作流扩展，并引用本站 `aisee-docsite-driven` 示例。 | active | 后续可补 schema pack 创建教程。 |
| OpenSpec 的适用边界 | `/openspec/boundaries/` | OpenSpec | 说明什么时候适合创建 OpenSpec change，什么时候只需要 Issue、普通文档、测试或代码注释，并提供纵向判断流程图。 | active | 后续可补真实团队推广策略。 |
| Compound Engineering | `/compound/` | Compound Engineering | 栏目首页，说明 Compound Engineering 不是单个 `/ce-compound`，而是策略、计划、执行、评审、知识沉淀和结果回看的工程复利链路。 | active | 后续可补英文完整正文和端到端实践案例。 |
| Compound Engineering 是什么 | `/compound/what-is-compound-engineering/` | Compound Engineering | 定义方法论、插件、skill、agent 和 `/ce-compound` 的层级关系，并对比一次性 AI Coding 与工程复利。 | active | 后续可补更多团队协作案例。 |
| 工程复利核心循环 | `/compound/workflow-loop/` | Compound Engineering | 说明从 strategy、ideate、brainstorm、plan 到 work、debug、review、compound、product pulse 的闭环。 | active | 后续可链接真实工程流程演练。 |
| 策略、构思与计划 | `/compound/strategy-brainstorm-plan/` | Compound Engineering | 说明方向锚点、想法筛选、需求澄清、计划拆分和 OpenSpec 衔接边界。 | active | 后续可补计划样例和模板速查。 |
| 执行、调试与评审 | `/compound/work-debug-review/` | Compound Engineering | 说明 `ce-work`、`ce-debug`、`ce-code-review`、`ce-simplify-code`、`ce-optimize`、`ce-polish-beta` 的职责边界。 | active | 后续可补端到端执行案例。 |
| 多智能体评审是什么 | `/compound/multi-agent-review/` | Compound Engineering | 说明单 Agent 容易遗漏的风险、多 persona 价值、并行审查、去重综合和适用任务类型。 | active | 后续可补真实 review 输出解读。 |
| Reviewer Personas | `/compound/reviewer-personas/` | Compound Engineering | 拆解 correctness、testing、security、API、data、performance、reliability、maintainability、scope、project standards 等 reviewer 分工。 | active | 后续可补更多语言/框架专项 persona。 |
| 文档评审智能体 | `/compound/document-review-agents/` | Compound Engineering | 说明 coherence、feasibility、product lens、scope guardian、security lens、design lens、adversarial document review 如何前置发现文档风险。 | active | 后续可补 proposal / plan review 示例。 |
| 设计与 UI 评审智能体 | `/compound/design-review-agents/` | Compound Engineering | 说明 design lens、design implementation review、design iterator、Figma sync 在方案、实现、打磨和同步中的分工。 | active | 后续可补浏览器截图对比案例。 |
| 研究型智能体 | `/compound/research-agents/` | Compound Engineering | 说明 repo、session、learnings、Slack、issue、web、best practices、framework docs 等研究型 agents 如何补证据并遵守事实源优先级。 | active | 后续可补组织上下文和隐私边界案例。 |
| 多智能体如何协作 | `/compound/agent-orchestration/` | Compound Engineering | 说明 orchestrator、dispatcher、parallel agents、confidence gate、dedup、routing 和 human decision gate 如何把多视角输出收敛为行动。 | active | 后续可补真实多 agent review 流水线示例。 |
| 多智能体评审边界 | `/compound/review-boundaries/` | Compound Engineering | 说明 no review、lightweight review、document review、full multi-agent review 和 specialized review 的选择边界。 | active | 后续可补更多高/低风险任务示例。 |
| 知识如何复利 | `/compound/knowledge-compounding/` | Compound Engineering | 说明 `/ce-compound`、`/ce-compound-refresh`、`docs/solutions/`、frontmatter、problem_type、bug/knowledge track 和 refresh 机制。 | active | 后续可补更多 `docs/solutions/` 示例。 |
| 与 OpenSpec 如何配合 | `/compound/with-openspec/` | Compound Engineering | 说明 OpenSpec 作为规范事实源，Compound Engineering 作为工程执行、评审、沉淀和反馈层，两者如何组合使用。 | active | 后续可补完整 OpenSpec + Compound 工程案例。 |
| AISEE | `/aisee/` | AISEE | 从 AISEE 工作流视角介绍 AISEE Plugin、OpenSpec 与 Compound Engineering，明确 OpenSpec 和 Compound Engineering 是独立开源项目。 | active | 后续补齐 AISEE Plugin、skills、schema pack、context pack 和 Compound handoff 正文。 |
| AISEE Plugin | `/aisee/aisee-plugin/` | AISEE | 承载围绕 OpenSpec 的前置澄清、schema-aware change authoring、context pack、契约读取、团队知识 guardrails 与 verify/archive 门禁说明。 | active | 后续可补真实端到端 change 演练与更多英文正文。 |
| 开源项目 | `/projects/` | 开源项目 | AISEE 团队自有或主导开源项目栏目首页，使用卡片式项目看板展示当前公开仓库、项目状态、仓库入口和与推荐资源的边界。 | active | 当前已收录 `aisee-plugin`、`skills-for-chinese`；后续有新增公开仓库时继续补充。 |
| AI Coding 推荐资源 | `/resources/` | 推荐资源 | 按分类展示精选 AI Coding 开源项目、工具、Agent/Harness、Skill、MCP、UI/UX 和方法论资源。 | active | 后续可按英文读者语境重写 `/en/resources/`，并定期复核资源有效性。 |

## 4. 内容缺口

| 缺口 | 关联栏目 | 优先级 | 原因 | 建议动作 |
|---|---|---|---|---|
| AISEE、OpenSpec、Compound Engineering 深度指南尚未串成完整后续课程 | 指南 | P1 | `/learn/` 已建立入门指南，但后续方法论正文仍分散。 | 新建独立 change 规划方法论指南路径和跨栏目导读。 |
| 开源项目详情页和长期路线仍未补齐 | 开源项目 | P2 | `/projects/` 已补当前公开仓库卡片，但每个项目的独立文档、使用示例和长期路线还未展开。 | 后续按项目成熟度补详情页、路线图或更细粒度入口。 |
| AI Engineering 英文完整正文尚未建设 | AI Engineering | P1 | 本轮只建设中文方法论基础正文，英文入口保持稳定占位。 | 后续独立 change 按英文读者语境重写 AI Engineering 栏目。 |
| AI Engineering 缺少真实团队采用案例 | AI Engineering / AISEE 工程流程 | P2 | 当前正文已有传统流程到 AISEE 工作流的通用迁移框架，但尚未展示真实团队如何落地、验证和复盘。 | 后续补团队采用案例、示例 change 或端到端演练，并与 AISEE Plugin 串联。 |
| OpenSpec 英文完整正文尚未建设 | OpenSpec | P1 | 本轮只更新英文入口，未重写英文专题正文。 | 后续独立 change 按英文读者语境重写 OpenSpec 栏目。 |
| Compound 英文完整正文尚未建设 | Compound Engineering | P1 | 本轮只建设中文正文，英文入口保持稳定占位。 | 后续独立 change 按英文读者语境重写 Compound 栏目。 |
| OpenSpec 缺少完整真实项目演练 | OpenSpec / AISEE 工程流程 | P1 | 栏目已解释概念、写法和边界，但尚未把一次真实 change 从 propose 跑到 archive。 | 后续放入 `/aisee/aisee-plugin/` 或 OpenSpec 实战页，避免替代 AISEE SRS 链路。 |
| Compound 缺少端到端工程复利演练 | Compound Engineering / AISEE 工程流程 | P1 | 栏目已解释方法论、角色、边界和知识沉淀，但尚未把一次真实任务从 brainstorm / plan 跑到 work / review / compound。 | 后续放入 `/aisee/aisee-plugin/` 或 Compound 实战页，避免把栏目正文写成操作日志。 |
| OpenSpec artifact 模板和命令速查尚未独立整理 | OpenSpec / 后续独立资源页 | P2 | 当前正文已有写法原则，但缺少可复制模板和短命令清单；推荐资源栏目已收束为精选项目和方法论资源。 | 后续另起 change 规划模板、检查清单和命令速查，不默认塞回推荐资源栏目。 |
| Compound skill / agent 命令速查尚未独立整理 | Compound Engineering / 后续独立资源页 | P2 | 当前栏目按方法论转译插件能力，未复制完整命令清单和版本行为；推荐资源栏目不承载命令大全。 | 后续另起 change 整理稳定速查，并明确以官方 README 和插件源码为准。 |
| 术语表和阅读路径已从推荐资源栏目移除 | 推荐资源 | P2 | 推荐资源已聚焦推荐内容，旧术语表和阅读路径占位页不再符合栏目定位。 | 如仍需要术语表或阅读路径，后续单独规划栏目或页面，并重新加入导航。 |
| Codex 产品入口和安装方式可能快速变化 | 指南 | P1 | Codex App、CLI、IDE 和账号/额度属于高频变化信息。 | 定期核对 OpenAI 官方文档，必要时更新 `/learn/codex-setup/`。 |
| Agent 进阶页面偏概念入门，缺少动手配置样例 | 指南 | P2 | 本 change 目标是建立认知和主线，未覆盖 MCP/Hook/Skill 详细实操。 | 后续按 Skill、MCP、Hook 分别补实战文章。 |
| 页面级 description 尚未覆盖全部正文 | 全站 SEO | P2 | 首页、栏目首页和英文入口已有页面级描述；部分普通正文仍由 Plume 自动摘要生成 SEO 描述。 | 后续在正文稳定后逐页补 `description`，优先覆盖高流量和分享入口页面。 |

## 5. 阅读路径

| 读者/场景 | 推荐入口 | 推荐顺序 | 说明 |
|---|---|---|---|
| AI Coding 新手 | `/learn/` | `/learn/ai-coding-intro/` → `/learn/tools-and-models/` → `/learn/runtime-setup/` → `/learn/codex-setup/` → `/learn/first-ai-project/` → `/ai-engineering/` → `/aisee/` | 先建立认知，再跑通 Codex 和第一个页面项目；之后理解 AI Engineering 方法论基础，再从 AISEE 进入插件、OpenSpec 和 Compound Engineering 主线。 |
| 想理解 AI 时代软件工程 | `/ai-engineering/` | `/ai-engineering/traditional-vs-ai-engineering/` → `/ai-engineering/from-traditional-flow-to-aisee/` → `/ai-engineering/what-does-not-change/` → `/ai-engineering/engineer-role/` → `/ai-engineering/prompt-to-spec/` → `/ai-engineering/tool-to-harness/` → `/ai-engineering/experience-to-compounding/` → `/aisee/` | 先理解传统软件工程和 AI 增强软件工程的差异，再看传统 Issue、PR、Review、CI 如何迁移到 AISEE 工作流，最后进入 AISEE 栏目理解 AISEE Plugin、OpenSpec 和 Compound Engineering 如何组合。 |
| 已会用工具但效果不稳定 | `/learn/codex-setup/` | `/learn/codex-setup/` → `/learn/first-ai-project/` → `/learn/agent-basics/` → `/learn/agent-memory/` | 重点补上下文、权限、diff、验证和任务拆分。 |
| 想理解 Agent 工程化 | `/learn/agent-basics/` | `/learn/agent-basics/` → `/learn/agent-memory/` → `/learn/skills/` → `/learn/mcp/` → `/learn/tool-calls/` → `/learn/hooks/` → `/learn/agent-orchestration/` | 逐一理解 Agent 的核心组成，再看它们如何配合。 |
| 想把 AI 协作变成可审查 change | `/openspec/` | `/openspec/what-is-openspec/` → `/openspec/mental-model/` → `/openspec/workflow/` → `/openspec/artifact-guide/` → `/openspec/spec-granularity/` → `/openspec/delta-spec/` → `/openspec/schema/` → `/openspec/boundaries/` | 先建立规范层心智模型，再学习工作流、artifact 写法、粒度、delta spec、schema 和适用边界。 |
| 准备写第一个 OpenSpec change | `/openspec/workflow/` | `/openspec/workflow/` → `/openspec/artifact-guide/` → `/openspec/delta-spec/` → `/openspec/boundaries/` | 重点理解 propose、spec、design、tasks、verify、archive 的职责和取舍。 |
| 想理解 AI 工程复利 | `/compound/` | `/compound/what-is-compound-engineering/` → `/compound/workflow-loop/` → `/compound/strategy-brainstorm-plan/` → `/compound/work-debug-review/` → `/compound/knowledge-compounding/` | 先理解方法论和核心循环，再看定义计划、执行质量和知识复利。 |
| 想理解多智能体评审 | `/compound/multi-agent-review/` | `/compound/multi-agent-review/` → `/compound/reviewer-personas/` → `/compound/document-review-agents/` → `/compound/design-review-agents/` → `/compound/research-agents/` → `/compound/agent-orchestration/` → `/compound/review-boundaries/` | 先理解多视角价值，再拆角色、文档/设计/研究能力、协作机制和适用边界。 |
| 想理解 AISEE 主线实践 | `/aisee/` | `/aisee/` → `/aisee/aisee-plugin/` → `/openspec/` → `/compound/` | AISEE 栏目从插件与工作流视角串起 OpenSpec 和 Compound Engineering，但不暗示它们属于 AISEE 自有项目。 |
| 想把 OpenSpec 和 Compound 组合使用 | `/aisee/` | `/openspec/what-is-openspec/` → `/compound/workflow-loop/` → `/compound/with-openspec/` → `/compound/review-boundaries/` | OpenSpec 负责事实源和变更边界，Compound 负责执行、评审、沉淀和反馈；AISEE 负责把二者放入可执行工作流。 |
| 想了解 AISEE 团队项目 | `/projects/` | `/projects/` → 具体项目页或仓库入口 | 团队项目和外部推荐资源分开呈现，避免混淆来源和维护责任。 |

## 6. 术语与写作约定

| 术语 | 推荐写法 | 避免写法 | 说明 |
|---|---|---|---|
| AI Coding | AI Coding / AI 编程 | “AI 替你写代码” | 强调协作、上下文和验证，不制造替代工程师的误解。 |
| AI Engineering | AI Engineering / AI 增强软件工程 | AI 工具教程 / 博客观点 | 强调 AI 参与软件交付后，规范、执行环境、验证和知识复用的工程组织方式。 |
| Codex | Codex / Codex App / Codex CLI | 未核对的安装入口或平台支持 | 涉及安装、账号、额度、平台时以 OpenAI 官方文档为准。 |
| Memory | 当前会话、项目规则、项目记忆、全局记忆 | 把 memory 当事实真理 | Memory 是辅助上下文，必须被当前项目事实校验。 |
| Skill | Skill / 可复用能力 | 普通 prompt | Skill 通常包含触发条件、步骤、资源、脚本或模板。 |
| MCP | MCP / 连接层 | 把 MCP 等同 Agent | MCP 连接外部能力，Agent 还需要模型、上下文和执行循环。 |
| Tool | Tool / 工具调用 | 任意自动操作 | Tool 是动作接口，需要权限和结果审查。 |
| Hook | Hook / 生命周期检查点 | 万能自动化系统 | Hook 适合明确、重复、高风险或易遗漏的检查。 |
| OpenSpec | OpenSpec / 规范层 / 事实源 | 把 OpenSpec 写成万能项目管理工具 | OpenSpec 聚焦系统行为、变更意图、设计判断、任务清单和归档历史。 |
| specs | `openspec/specs/` / 主 specs | 把未完成计划提前写进主 specs | 主 specs 表示当前已经成立的行为事实。 |
| changes | `openspec/changes/` / change 工作区 | 把 change 当普通任务列表 | change 承载一次待实施、可审查、可验证的行为变化。 |
| artifact | artifact / proposal / spec / design / tasks | 把 artifact 混写成同一份说明 | 各 artifact 可被 schema 调整顺序，但职责边界应清楚。 |
| delta spec | delta spec / 变更 spec | 直接复制主 spec 再改 | delta spec 描述相对当前事实的 ADDED、MODIFIED、REMOVED 行为变化。 |
| schema | OpenSpec schema / artifact DAG / 模板 / 门禁 | 把 schema 当业务规范 | schema 扩展工作流组织方式，不替代 specs、changes 和 archive 的基本职责。 |
| AISEE Plugin | AISEE Plugin / aisee plugin | 把 OpenSpec 或 Compound Engineering 写成 AISEE 自有项目 | AISEE Plugin 是 AISEE 工作流的插件和命令入口；OpenSpec 和 Compound Engineering 是独立开源项目，本站在 AISEE 栏目下做组合实践说明。 |
| Compound Engineering | Compound Engineering / 工程复利 | 把 Compound 写成单个 `/ce-compound` 命令 | Compound Engineering 是策略、计划、执行、评审、调试、知识沉淀和结果回看的协作系统。 |
| `/ce-compound` | `/ce-compound` / 知识沉淀 skill | 把 `/ce-compound` 等同 Compound Engineering 全部 | `/ce-compound` 只负责把刚解决的问题写入结构化知识库。 |
| 多智能体评审 | 多智能体评审 / reviewer personas | 把多智能体写成越多越好 | 应按风险选择 reviewer，并通过置信度、去重和人工决策 gate 控制噪声。 |
| Research Agents | research agents / 研究型智能体 | 把研究结果当最终事实 | 研究型智能体负责补证据，不能覆盖已生效 spec、项目文档或人工决策。 |
| `docs/solutions/` | `docs/solutions/` / solution docs | 普通复盘文章目录 | 它是可检索、可刷新、带 frontmatter 的团队知识库。 |
| 开源项目 | 开源项目 / Open Source | 推荐资源、外部项目榜单 | 开源项目栏目只展示 AISEE 团队自有或主导的项目清单和介绍。 |
| 推荐资源 | 推荐资源 / Recommended Resources | 泛资源中心 | 推荐资源只展示精选 AI Coding 相关项目、工具和方法论参考；模板、命令速查、术语表和检查清单应另行规划。 |

## 7. 站点结构约定

- 导航：顶层导航为 `首页 / 指南 / AI Engineering / AISEE / 开源项目 / 推荐资源`；英文为 `Home / Guides / AI Engineering / AISEE / Open Source / Recommended Resources`。
- 导航：`AISEE` 顶栏项不是普通链接，而是二级菜单；中文和英文菜单项均为 `AISEE Plugin`、`OpenSpec`、`Compound Engineering`，分别进入 `/aisee/aisee-plugin/`、`/openspec/`、`/compound/` 及英文 locale 对应路径。
- 导航：`/learn/` 路由保留，公开展示名为“指南 / Guides”。
- 导航：AI Engineering 是正式顶层栏目，位于指南之后、AISEE 之前；旧 `/thinking/` 不再作为公开栏目。
- 导航：OpenSpec 和 Compound Engineering 不再作为顶栏平级入口，但 `/openspec/`、`/compound/` 路由和 collection 保持可访问。
- 侧边栏：AI Engineering 中文栏目按“方法基础 / 三条主线”分组，方法基础包含传统与 AI 增强、从传统流程到 AISEE、AI 没有改变什么、工程师新职责；页面保持平铺路由 `/ai-engineering/<slug>/`。
- 侧边栏：指南中文栏目按“认知入门 / 工具上手 / Agent 进阶”分组，`README.md` 保持栏目首页。
- 侧边栏：OpenSpec 中文栏目按“栏目首页 / 作用 / 模型 / 用法 / 扩展 / 边界”分组，页面保持平铺路由 `/openspec/<slug>/`。
- 侧边栏：Compound 中文栏目按“栏目首页 / 总览 / 定义与计划 / 执行与质量 / 多智能体 / 知识 / 关系”分组，页面保持平铺路由 `/compound/<slug>/`。
- 侧边栏：AISEE 栏目侧边栏不显示独立“栏目首页”分组，直接从 `AISEE Plugin` 的 `总览 / 前置澄清与规划 / 上下文与执行 / 验证与沉淀` 分组开始；不在该侧边栏内继续混排 `OpenSpec` 和 `Compound Engineering` 分组，跨栏目进入由顶栏、正文链接或各自独立栏目承担。
- 侧边栏：开源项目中文和英文栏目只保留 `README.md`，主路由保持 `/projects/` 和 `/en/projects/`。
- 侧边栏：推荐资源中文和英文栏目只保留 `README.md`，主路由保持 `/resources/` 和 `/en/resources/`；不再公开 demo、preview、foo/bar 示例页。
- frontmatter：指南正文包含 `title`、`permalink`、`createTime`。
- frontmatter：OpenSpec 中文正文包含 `title`、`permalink`、`createTime`，permalink 与侧边栏链接保持一致。
- frontmatter：Compound 中文正文包含 `title`、`permalink`、`createTime`，permalink 与侧边栏链接保持一致。
- frontmatter：开源项目栏目首页包含 `title`、`permalink`、`createTime`。
- 标签/分类：指南作为 doc collection，不为本 change 新增标签体系。
- 标签/分类：OpenSpec 作为 doc collection，不新增标签体系。
- 标签/分类：Compound Engineering 作为 doc collection，不新增标签体系。
- 多语言：中文正文优先；英文 `/en/learn/`、`/en/ai-engineering/` 和 `/en/openspec/` 保持入口可用并指向中文稳定内容，后续再按英文读者语境完整重写。
- 多语言：英文 `/en/compound/` 暂保留稳定占位入口，后续再按英文读者语境完整重写。
- 多语言：英文 `/en/projects/` 暂保留开源项目入口，后续在项目清单确认后补完整英文说明。
- 多语言：英文 `/en/resources/` 暂保留推荐资源入口，指向中文推荐资源目录；后续再按英文读者语境完整重写。
- 图片/附件：工具/模型 logo 使用 LobeHub Icons 静态 SVG/CDN；交互式关系图优先使用 Vue Flow；禁止引用本地绝对路径和未经授权商业截图。
- 图片/附件：OpenSpec 复杂静态图保留 `.excalidraw` 源文件，导出 SVG 放在 `site/.vuepress/public/diagrams/openspec/`，正文通过 `DiagramFigure` 引用站点内路径。
- 代码块/命令示例：安装、账号、平台、价格、额度等易变信息必须标注“以官方文档为准”；危险 Git/删除/上传/生产操作必须有风险说明。
- 代码块/命令示例：Compound Engineering 正文优先讲方法论和职责边界，不复制插件内部长 prompt，不在公开正文暴露本地绝对路径或本地安装版本口径。
- 正文导读：不要在普通正文末尾放置纯目录式“下一步阅读 / 继续阅读 / 方法路线”链接块；文档站导航、侧边栏和搜索已承担页面发现能力。只有当链接承担当前段落的必要语义引导时，才在正文句子中加入文章链接。
- SEO：生产域名在 Plume 配置中使用 `https://aisee.wiki`；`hostname` 必须配置在 `site/.vuepress/config.ts` 的 `plumeTheme` 顶层，不放入 `plume.config.ts`。
- SEO：站点依赖 Plume 内置 SEO 和 sitemap 能力生成 Open Graph、JSON-LD、`sitemap.xml` 和 `robots.txt`；不要在 `site/.vuepress/public/robots.txt` 手写重复规则。
- LLM 索引：站点启用 Plume 内置 `llmstxt`，`locale: 'all'` 覆盖中文和英文，生产构建生成 `/llms.txt`、`/llms-full.txt`、`/en/llms.txt` 和 `/en/llms-full.txt`。
- LLM 交互：站点通过 `site/.vuepress/client.ts` 引入 Plume `PageContextMenu`，挂载在 `doc-title-after` slot，用于在文档页标题旁提供复制页面、查看 Markdown 和打开 LLM 工具入口；该能力依赖生产构建中的 `llmstxt` 产物。
- frontmatter：核心首页、栏目首页和英文入口应维护页面级 `description`；普通正文可暂由 Plume 自动摘要兜底，正文稳定后再逐页补充。

## 8. 归档记录

| 日期 | Change | 归档后基线变化 | 备注 |
|---|---|---|---|
| 2026-05-25 | `build-ai-coding-learning-path` | `/learn/` 升级为 AI Coding 学习路径，新增 12 篇中文正文、Vue Flow 路线图、LobeHub logo 网格和分组侧边栏。 | 构建通过；后续归档时同步到正式 specs。 |
| 2026-05-29 | `build-openspec-column-content` | `/openspec/` 升级为 OpenSpec 方法论栏目，新增 8 篇中文专题正文、分组侧边栏、英文占位入口、阅读路径入口和 Excalidraw/SVG 图示资产。 | 构建通过后可归档；英文完整正文、真实项目演练和模板速查留待后续 change。 |
| 2026-05-30 | `build-compound-engineering-column` | `/compound/` 升级为 Compound Engineering 方法论栏目，新增 13 篇中文专题正文、分组侧边栏，并建立与 OpenSpec 的组合关系说明。 | 构建通过后可归档；英文完整正文、端到端工程复利演练和命令速查留待后续 change。 |
| 2026-06-01 | `cleanup-demo-preview-and-recommendations` | 删除公开 demo、blog preview 和资源旧占位页；资源栏目展示名收束为“推荐资源 / Recommended Resources”，主路由继续使用 `/resources/`。 | 构建通过后可归档；术语表、模板、命令速查和检查清单如有需要应另起 change。 |
| 2026-06-01 | `transform-thinking-to-ai-engineering-column` | 将旧“观点文章 / Thinking”改造为 `AI Engineering` 方法论基础栏目，新增 6 篇中文基础正文，并从 post/blog collection 改为 doc collection。 | 构建通过后可归档；英文完整正文和真实团队采用案例留待后续 change。 |
| 2026-06-08 | `restructure-aisee-navigation` | 顶栏调整为“指南 / AI Engineering / AISEE / 开源项目 / 推荐资源”；AISEE 顶栏项改为二级菜单，收束 AISEE Plugin、OpenSpec、Compound Engineering 三个入口；新增 `/projects/`。 | OpenSpec 和 Compound Engineering 保留独立路由，但不再作为顶栏平级入口；团队项目清单待维护者补充。 |
| 2026-06-08 | `strengthen-ai-engineering-bridge` | 强化 AI Engineering 作为指南与 AISEE 之间的解释层，补充传统软件工程与 AI 增强软件工程的研发环节对照，并新增 `/ai-engineering/from-traditional-flow-to-aisee/`；清理正文中重复文档站导航能力的“下一步阅读”类链接块。 | 构建通过后可归档；真实团队落地案例和英文完整正文留待后续 change。 |
| 2026-06-08 | `enhance-plume-seo-indexing` | 按 Plume 最佳实践配置 `hostname: 'https://aisee.wiki'` 和 `llmstxt: { locale: 'all' }`，启用 SEO、sitemap、robots 与中英文 LLM 友好索引；核心入口页补充页面级 `description`。 | 构建通过；普通正文的页面级 description 可后续继续细化。 |
