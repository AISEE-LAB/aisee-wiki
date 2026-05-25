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

## 3. 页面清单

| 页面 | 路径 | 栏目 | 内容摘要 | 状态 | 后续动作 |
|---|---|---|---|---|---|
| 学习路径 | `/learn/` | 学习路径 | AI Coding 学习路线首页，汇总三类路径、12 篇正文和后续方法论入口。 | active | 后续链接 OpenSpec、Compound、aisee 深度路径。 |
| AI Coding 到底改变了什么 | `/learn/ai-coding-intro/` | 学习路径 | 从补全、生成到 Agent 的发展，说明工程师角色变化和 AI 擅长/不擅长边界。 | active | 可补充更多课堂练习案例。 |
| AI 编程工具与模型怎么选 | `/learn/tools-and-models/` | 学习路径 | 介绍工具形态、模型能力维度、Codex/Claude/Gemini/GLM 推荐定位和选择矩阵。 | active | 定期核对官方文档，避免价格/额度过期。 |
| 给 AI 准备运行环境 | `/learn/dev-environment/` | 学习路径 | 说明 Git、Node.js、Python、终端、编辑器、浏览器等基础环境及验证清单。 | active | 后续可拆 Windows/macOS/Linux 详细教程。 |
| Codex 安装、配置与第一次运行 | `/learn/codex-setup/` | 学习路径 | 作为本站 Codex 主入口，讲项目读取、命令执行、diff、权限边界和安全任务。 | active | Codex 产品入口变化时必须更新。 |
| 第一个 AI Coding 项目：复刻一个网站 | `/learn/first-ai-coding-project/` | 学习路径 | 用自拟品牌复刻网站首页，训练选参考、拆模块、预览、修复和提交。 | active | 可追加完整示例仓库或演示截图。 |
| Agent 是怎么工作的 | `/learn/agent-basics/` | 学习路径 | 解释 Agent 的目标、上下文、工具、环境、约束和验证循环。 | active | 后续与具体 Agent 框架文章互链。 |
| Memory：让 Agent 带着上下文持续工作 | `/learn/agent-memory/` | 学习路径 | 区分当前会话、项目规则、项目记忆和全局记忆，并以 Codex 工作流举例。 | active | 后续可补 memory 沉淀规范。 |
| Skill：把经验封装成可复用能力 | `/learn/skills/` | 学习路径 | 说明 Skill 的触发、流程、模板、脚本和适用边界。 | active | 后续可链接项目内 skill 创建教程。 |
| MCP：让 Agent 连接外部能力 | `/learn/mcp/` | 学习路径 | 说明 MCP client/server、tool/resource/prompt 和外部系统连接边界。 | active | 后续可补 MCP 配置实战。 |
| Tool：Agent 真正执行动作的接口 | `/learn/agent-tools/` | 学习路径 | 说明工具调用闭环、常见工具类型和风险控制。 | active | 后续可补 shell/browser/git 工具专题。 |
| Hook：在关键节点加上自动检查和约束 | `/learn/hooks/` | 学习路径 | 说明 Hook 在任务开始、工具调用、修改后、提交前、归档前的检查作用。 | active | 后续可补 Codex hook 配置示例。 |
| Agent 的核心组成如何配合 | `/learn/agent-components/` | 学习路径 | 以 Codex 智能体为例串起 Memory、Skill、MCP、Tool、Hook 的分工。 | active | 后续作为 OpenSpec/Compound/aisee 进阶入口。 |

## 4. 内容缺口

| 缺口 | 关联栏目 | 优先级 | 原因 | 建议动作 |
|---|---|---|---|---|
| OpenSpec、Compound、aisee 深度学习路径尚未串成完整后续课程 | 学习路径 | P1 | `/learn/` 已建立入门路径，但后续方法论正文仍分散。 | 新建独立 change 规划方法论学习路径和跨栏目导读。 |
| Codex 产品入口和安装方式可能快速变化 | 学习路径 | P1 | Codex App、CLI、IDE 和账号/额度属于高频变化信息。 | 定期核对 OpenAI 官方文档，必要时更新 `/learn/codex-setup/`。 |
| Agent 进阶页面偏概念入门，缺少动手配置样例 | 学习路径 | P2 | 本 change 目标是建立认知和主线，未覆盖 MCP/Hook/Skill 详细实操。 | 后续按 Skill、MCP、Hook 分别补实战文章。 |

## 5. 阅读路径

| 读者/场景 | 推荐入口 | 推荐顺序 | 说明 |
|---|---|---|---|
| AI Coding 新手 | `/learn/` | `/learn/ai-coding-intro/` → `/learn/tools-and-models/` → `/learn/dev-environment/` → `/learn/codex-setup/` → `/learn/first-ai-coding-project/` | 先建立认知，再跑通 Codex 和第一个页面项目。 |
| 已会用工具但效果不稳定 | `/learn/codex-setup/` | `/learn/codex-setup/` → `/learn/first-ai-coding-project/` → `/learn/agent-basics/` → `/learn/agent-memory/` | 重点补上下文、权限、diff、验证和任务拆分。 |
| 想理解 Agent 工程化 | `/learn/agent-basics/` | `/learn/agent-basics/` → `/learn/agent-memory/` → `/learn/skills/` → `/learn/mcp/` → `/learn/agent-tools/` → `/learn/hooks/` → `/learn/agent-components/` | 逐一理解 Agent 的核心组成，再看它们如何配合。 |

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

## 7. 站点结构约定

- 导航：不为学习路径新增顶层导航，继续使用现有 `/learn/` 入口。
- 侧边栏：学习路径中文栏目按“认知入门 / 工具上手 / Agent 进阶”分组，`README.md` 保持栏目首页。
- frontmatter：学习路径正文包含 `title`、`permalink`、`createTime`。
- 标签/分类：学习路径作为 doc collection，不为本 change 新增标签体系。
- 多语言：中文正文优先；英文 `/en/learn/` 保持占位并指向中文学习路径，后续再完整翻译。
- 图片/附件：工具/模型 logo 使用 LobeHub Icons 静态 SVG/CDN；交互式关系图优先使用 Vue Flow；禁止引用本地绝对路径和未经授权商业截图。
- 代码块/命令示例：安装、账号、平台、价格、额度等易变信息必须标注“以官方文档为准”；危险 Git/删除/上传/生产操作必须有风险说明。

## 8. 归档记录

| 日期 | Change | 归档后基线变化 | 备注 |
|---|---|---|---|
| 2026-05-25 | `build-ai-coding-learning-path` | `/learn/` 升级为 AI Coding 学习路径，新增 12 篇中文正文、Vue Flow 路线图、LobeHub logo 网格和分组侧边栏。 | 构建通过；后续归档时同步到正式 specs。 |
