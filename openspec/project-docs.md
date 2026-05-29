# Project Docs Baseline

> 本文件是文档站长期基线，记录归档后的当前状态。
> 每个 aisee-docsite-driven change 归档前，应回写本文件，或在 doc-change.md 写明无需回写的原因。

## 1. 文档站定位

- 文档站名称：AI SEE Wiki
- 目标读者：正在学习 AI Coding、Agent 工程化协作、OpenSpec / Compound / aisee 工作流的开发者和团队维护者。
- 核心用途：沉淀 AI Engineering 学习路径、工程方法论、工作流说明和可复用实践。
- 内容边界：优先提供可执行、可验证、可复用的工程文档；不做实时模型排行榜、价格表或未经核对的第三方安装方案。

## 2. 栏目结构

| 栏目 | 路径 | 定位 | 状态 | 说明 |
|---|---|---|---|---|
| 学习路径 | `/learn/` | AI Coding 入门到 Agent 进阶的主路径 | active | 按“认知入门 / 工具上手 / Agent 进阶”组织 12 篇正文，作为 Codex 和 Agent 基础主入口。 |
| OpenSpec | `/openspec/` | AI Engineering 的规范层与事实源方法论栏目 | active | 按“栏目首页 / 作用 / 模型 / 用法 / 扩展 / 边界”组织中文正文，说明 OpenSpec 的作用、对象模型、artifact 写法、schema 扩展和适用边界。 |

## 3. 页面清单

| 页面 | 路径 | 栏目 | 内容摘要 | 状态 | 后续动作 |
|---|---|---|---|---|---|
| 学习路径 | `/learn/` | 学习路径 | AI Coding 学习路线首页，汇总三类路径、12 篇正文和后续方法论入口。 | active | 后续链接 OpenSpec、Compound、aisee 深度路径。 |
| AI Coding 到底改变了什么 | `/learn/ai-coding-intro/` | 学习路径 | 从补全、生成到 Agent 的发展，说明工程师角色变化和 AI 擅长/不擅长边界。 | active | 可补充更多课堂练习案例。 |
| AI 编程工具与模型怎么选 | `/learn/tools-and-models/` | 学习路径 | 介绍工具形态、模型能力维度、Codex/Claude/Gemini/GLM 推荐定位和选择矩阵。 | active | 定期核对官方文档，避免价格/额度过期。 |
| 给 AI 准备运行环境 | `/learn/runtime-setup/` | 学习路径 | 说明 Git、Node.js、Python、终端、编辑器、浏览器等基础环境及验证清单。 | active | 后续可拆 Windows/macOS/Linux 详细教程。 |
| Codex 安装、配置与第一次运行 | `/learn/codex-setup/` | 学习路径 | 作为本站 Codex 主入口，讲项目读取、命令执行、diff、权限边界和安全任务。 | active | Codex 产品入口变化时必须更新。 |
| 第一个 AI Coding 项目：复刻一个网站 | `/learn/first-ai-project/` | 学习路径 | 用自拟品牌复刻网站首页，训练选参考、拆模块、预览、修复和提交。 | active | 可追加完整示例仓库或演示截图。 |
| Agent 是怎么工作的 | `/learn/agent-basics/` | 学习路径 | 解释 Agent 的目标、上下文、工具、环境、约束和验证循环。 | active | 后续与具体 Agent 框架文章互链。 |
| Memory：让 Agent 带着上下文持续工作 | `/learn/agent-memory/` | 学习路径 | 区分当前会话、项目规则、项目记忆和全局记忆，并以 Codex 工作流举例。 | active | 后续可补 memory 沉淀规范。 |
| Skill：把经验封装成可复用能力 | `/learn/skills/` | 学习路径 | 说明 Skill 的触发、流程、模板、脚本和适用边界。 | active | 后续可链接项目内 skill 创建教程。 |
| MCP：让 Agent 连接外部能力 | `/learn/mcp/` | 学习路径 | 说明 MCP client/server、tool/resource/prompt 和外部系统连接边界。 | active | 后续可补 MCP 配置实战。 |
| Tool：Agent 真正执行动作的接口 | `/learn/tool-calls/` | 学习路径 | 说明工具调用闭环、常见工具类型和风险控制。 | active | 后续可补 shell/browser/git 工具专题。 |
| Hook：在关键节点加上自动检查和约束 | `/learn/hooks/` | 学习路径 | 说明 Hook 在任务开始、工具调用、修改后、提交前、归档前的检查作用。 | active | 后续可补 Codex hook 配置示例。 |
| Agent 的核心组成如何配合 | `/learn/agent-orchestration/` | 学习路径 | 以 Codex 智能体为例串起 Memory、Skill、MCP、Tool、Hook 的分工。 | active | 后续作为 OpenSpec/Compound/aisee 进阶入口。 |
| OpenSpec | `/openspec/` | OpenSpec | OpenSpec 栏目首页，说明定位、能力地图、核心对象、工作方式、阅读顺序、适用边界和术语速览。 | active | 后续可补英文完整正文和真实项目演练。 |
| OpenSpec 是什么 | `/openspec/what-is-openspec/` | OpenSpec | 解释 AI 编程时代为什么需要规范层，说明 OpenSpec 如何把临时上下文变成可审查的工程事实。 | active | 后续可补更多团队协作案例。 |
| OpenSpec 心智模型 | `/openspec/mental-model/` | OpenSpec | 说明 `openspec/specs/`、`openspec/changes/`、artifacts、delta spec 和 archive 的对象关系。 | active | 后续可补可交互关系图。 |
| OpenSpec 基础工作流 | `/openspec/workflow/` | OpenSpec | 说明从 propose 到 archive 的基础动作、阶段输入输出、验证节点和归档含义。 | active | 后续可结合 workflows 栏目补端到端执行案例。 |
| Artifact 写法指南 | `/openspec/artifact-guide/` | OpenSpec | 说明 proposal、spec、design、tasks 的职责、写法、顺序边界、常见误区和审查清单。 | active | 后续可整理为模板速查页。 |
| Spec 粒度设计 | `/openspec/spec-granularity/` | OpenSpec | 说明项目级、模块级、能力级 spec 的划分原则、过粗/过细风险和并行 change 影响。 | active | 后续可补更多大型项目拆分示例。 |
| Delta Spec 深度解析 | `/openspec/delta-spec/` | OpenSpec | 说明 delta spec 的作用、ADDED/MODIFIED/REMOVED 语义、与主 specs 的关系和归档后的事实源更新。 | active | 后续可补 requirement 重命名专题。 |
| OpenSpec Schema 是什么 | `/openspec/schema/` | OpenSpec | 说明 schema 如何定义 artifact DAG、模板、apply gate 和项目级工作流扩展，并引用本站 `aisee-docsite-driven` 示例。 | active | 后续可补 schema pack 创建教程。 |
| OpenSpec 的适用边界 | `/openspec/boundaries/` | OpenSpec | 说明什么时候适合创建 OpenSpec change，什么时候只需要 Issue、普通文档、测试或代码注释，并提供纵向判断流程图。 | active | 后续可补真实团队推广策略。 |

## 4. 内容缺口

| 缺口 | 关联栏目 | 优先级 | 原因 | 建议动作 |
|---|---|---|---|---|
| OpenSpec、Compound、aisee 深度学习路径尚未串成完整后续课程 | 学习路径 | P1 | `/learn/` 已建立入门路径，但后续方法论正文仍分散。 | 新建独立 change 规划方法论学习路径和跨栏目导读。 |
| OpenSpec 英文完整正文尚未建设 | OpenSpec | P1 | 本轮只更新英文入口，未重写英文专题正文。 | 后续独立 change 按英文读者语境重写 OpenSpec 栏目。 |
| OpenSpec 缺少完整真实项目演练 | OpenSpec / 工程流程 | P1 | 栏目已解释概念、写法和边界，但尚未把一次真实 change 从 propose 跑到 archive。 | 后续放入 `/workflows/` 或 OpenSpec 实战页，避免替代 aisee SRS 链路。 |
| OpenSpec artifact 模板和命令速查尚未独立整理 | OpenSpec / 资源中心 | P2 | 当前正文已有写法原则，但缺少可复制模板和短命令清单。 | 后续在资源中心或 OpenSpec 子页补模板、检查清单和命令速查。 |
| Codex 产品入口和安装方式可能快速变化 | 学习路径 | P1 | Codex App、CLI、IDE 和账号/额度属于高频变化信息。 | 定期核对 OpenAI 官方文档，必要时更新 `/learn/codex-setup/`。 |
| Agent 进阶页面偏概念入门，缺少动手配置样例 | 学习路径 | P2 | 本 change 目标是建立认知和主线，未覆盖 MCP/Hook/Skill 详细实操。 | 后续按 Skill、MCP、Hook 分别补实战文章。 |

## 5. 阅读路径

| 读者/场景 | 推荐入口 | 推荐顺序 | 说明 |
|---|---|---|---|
| AI Coding 新手 | `/learn/` | `/learn/ai-coding-intro/` → `/learn/tools-and-models/` → `/learn/runtime-setup/` → `/learn/codex-setup/` → `/learn/first-ai-project/` | 先建立认知，再跑通 Codex 和第一个页面项目。 |
| 已会用工具但效果不稳定 | `/learn/codex-setup/` | `/learn/codex-setup/` → `/learn/first-ai-project/` → `/learn/agent-basics/` → `/learn/agent-memory/` | 重点补上下文、权限、diff、验证和任务拆分。 |
| 想理解 Agent 工程化 | `/learn/agent-basics/` | `/learn/agent-basics/` → `/learn/agent-memory/` → `/learn/skills/` → `/learn/mcp/` → `/learn/tool-calls/` → `/learn/hooks/` → `/learn/agent-orchestration/` | 逐一理解 Agent 的核心组成，再看它们如何配合。 |
| 想把 AI 协作变成可审查 change | `/openspec/` | `/openspec/what-is-openspec/` → `/openspec/mental-model/` → `/openspec/workflow/` → `/openspec/artifact-guide/` → `/openspec/spec-granularity/` → `/openspec/delta-spec/` → `/openspec/schema/` → `/openspec/boundaries/` | 先建立规范层心智模型，再学习工作流、artifact 写法、粒度、delta spec、schema 和适用边界。 |
| 准备写第一个 OpenSpec change | `/openspec/workflow/` | `/openspec/workflow/` → `/openspec/artifact-guide/` → `/openspec/delta-spec/` → `/openspec/boundaries/` | 重点理解 propose、spec、design、tasks、verify、archive 的职责和取舍。 |

## 6. 术语与写作约定

| 术语 | 推荐写法 | 避免写法 | 说明 |
|---|---|---|---|
| AI Coding | AI Coding / AI 编程 | “AI 替你写代码” | 强调协作、上下文和验证，不制造替代工程师的误解。 |
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

## 7. 站点结构约定

- 导航：不为学习路径新增顶层导航，继续使用现有 `/learn/` 入口。
- 侧边栏：学习路径中文栏目按“认知入门 / 工具上手 / Agent 进阶”分组，`README.md` 保持栏目首页。
- 侧边栏：OpenSpec 中文栏目按“栏目首页 / 作用 / 模型 / 用法 / 扩展 / 边界”分组，页面保持平铺路由 `/openspec/<slug>/`。
- frontmatter：学习路径正文包含 `title`、`permalink`、`createTime`。
- frontmatter：OpenSpec 中文正文包含 `title`、`permalink`、`createTime`，permalink 与侧边栏链接保持一致。
- 标签/分类：学习路径作为 doc collection，不为本 change 新增标签体系。
- 标签/分类：OpenSpec 作为 doc collection，不新增标签体系。
- 多语言：中文正文优先；英文 `/en/learn/` 和 `/en/openspec/` 保持入口可用并指向中文稳定内容，后续再按英文读者语境完整重写。
- 图片/附件：工具/模型 logo 使用 LobeHub Icons 静态 SVG/CDN；交互式关系图优先使用 Vue Flow；禁止引用本地绝对路径和未经授权商业截图。
- 图片/附件：OpenSpec 复杂静态图保留 `.excalidraw` 源文件，导出 SVG 放在 `site/.vuepress/public/diagrams/openspec/`，正文通过 `DiagramFigure` 引用站点内路径。
- 代码块/命令示例：安装、账号、平台、价格、额度等易变信息必须标注“以官方文档为准”；危险 Git/删除/上传/生产操作必须有风险说明。

## 8. 归档记录

| 日期 | Change | 归档后基线变化 | 备注 |
|---|---|---|---|
| 2026-05-25 | `build-ai-coding-learning-path` | `/learn/` 升级为 AI Coding 学习路径，新增 12 篇中文正文、Vue Flow 路线图、LobeHub logo 网格和分组侧边栏。 | 构建通过；后续归档时同步到正式 specs。 |
| 2026-05-29 | `build-openspec-column-content` | `/openspec/` 升级为 OpenSpec 方法论栏目，新增 8 篇中文专题正文、分组侧边栏、英文占位入口、阅读路径入口和 Excalidraw/SVG 图示资产。 | 构建通过后可归档；英文完整正文、真实项目演练和模板速查留待后续 change。 |
