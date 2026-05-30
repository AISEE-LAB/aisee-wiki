---
title: AI Coding 资源目录
permalink: /resources/ai-coding-resources/
createTime: 2026/05/30 20:30:00
---

# AI Coding 资源目录

这份目录来自维护者 GitHub stars 的公开仓库导出。原始表格包含 259 个 star 仓库，其中有一部分是 AI Coding、Agent、Skill、MCP、设计辅助和代码上下文相关资源，也有不少生图、视频、通用前端模板、代理工具、笔记应用和普通开发工具。

这里不做“全部收录”，也不按 star 数排行。资源中心只保留能帮助读者理解 AI Coding 工程生态的项目，并按工程用途组织。

## 收录标准

一个仓库进入这份目录，通常至少满足下面一条：

- 它能解释 AI Coding 的工作方式，例如 spec-driven、context engineering、agent harness、多 agent 协作或 review workflow。
- 它能增强 coding agent 的能力，例如 Skill、MCP server、浏览器自动化、代码上下文图谱、记忆或观测。
- 它能改善 AI 生成前端、设计稿、技术图示或文档产出的质量。
- 它是面向 AI Coding 学习、训练或团队能力建设的公开资料。

没有进入目录，不代表仓库没有价值；通常只是它不适合本站资源中心的当前主题。

<AiCodingResourceBoard />

## 怎么读

如果你刚开始学习 AI Coding，先看“学习资料与训练场”，再回到本站的 [学习路径](/learn/) 补齐 Agent、Skill、MCP、Tool 和 Hook 的基础概念。

如果你已经会用 Codex、Claude Code、Cursor 或类似工具，但觉得效果不稳定，优先看“方法论与工作流”“Skill、Prompt 与上下文工程”“代码上下文、记忆与观测”。这三类资源解决的不是“换一个更强工具”，而是让 Agent 拥有更稳定的任务边界、项目上下文和反馈回路。

如果你的主要问题是 UI 产出质量差，直接看“UI/UX、设计与可视化”。`ui-ux-pro-max-skill`、`impeccable`、`awesome-design-md`、`taste-skill`、`gsap-skills` 和 `fireworks-tech-graph` 属于这类资源，它们和普通 UI 素材站不同，重点是让 coding agent 学会设计判断、设计系统、动效和技术表达。

## 暂不收录

这次筛选中有一些仓库虽然包含 AI、prompt、agent 或自动化关键词，但暂不进入主目录：

- 纯生图、视频、PPT prompt 集，除非它们直接服务 AI Coding、技术文档或工程图示。
- 通用 SaaS boilerplate、admin 模板、笔记应用、代理工具、普通终端工具和常规前端组件库。
- 账号共享、中转服务、key 自动化、绕过平台限制、泄露 system prompt 或合规风险高的项目。
- 价格、额度、安装入口和账号策略变化很快的工具说明。
- 只因 star 数高但与 AI Coding 工程实践关系弱的仓库。

这份目录会优先保持“可解释生态坐标”的质量，而不是追求数量。

## 更新口径

资源目录的来源是公开 GitHub 仓库信息和维护者人工筛选。仓库描述、官网、可用性和活跃度可能变化；涉及安装、账号、价格、额度或平台限制时，请以项目官方 README、官网或文档为准。

本页不替代真实选型。正式用于团队流程前，建议至少检查：

- 仓库是否仍活跃维护。
- license 是否允许你的使用场景。
- 是否需要访问私有代码、浏览器登录态、token 或生产环境。
- 是否会把敏感上下文发送给第三方服务。
- 是否能被你的项目规则、OpenSpec artifacts、测试和 review gate 约束。
