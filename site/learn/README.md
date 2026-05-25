---
title: 学习路径
permalink: /learn/
createTime: 2026/05/25 00:00:00
---

# AI Coding 学习路径

这条路径给第一次系统学习 AI Coding 的开发者：先建立正确认知，再把本地环境和 Codex 跑通，最后理解 Agent 为什么需要 Memory、Skill、MCP、Tool 和 Hook。

<ClientOnly>
  <LearningFlow variant="overview" />
</ClientOnly>

::: tip 适合谁
- 用过 AI 写代码，但经常觉得输出不稳定的人。
- 想把 Codex、Claude、Gemini、GLM 等工具放进真实项目的人。
- 准备把 AI Coding 变成团队流程，而不是一次性聊天技巧的人。
:::

## 认知入门

| 文章 | 解决的问题 | 读完能得到什么 |
|---|---|---|
| [AI Coding 到底改变了什么](/learn/ai-coding-intro/) | AI Coding 和普通补全、聊天生成有什么区别 | 建立“我在管理一个会写代码的执行者”的心智模型 |
| [AI 编程工具与模型怎么选](/learn/tools-and-models/) | 工具和模型太多，应该从哪里开始 | 用任务类型选择 Codex、Claude、Gemini、GLM 等工具 |

## 工具上手

| 文章 | 解决的问题 | 读完能得到什么 |
|---|---|---|
| [给 AI 准备运行环境](/learn/dev-environment/) | AI 为什么需要 Git、Node、Python、终端和浏览器 | 能验证本地环境是否足够让 Agent 工作 |
| [Codex 安装、配置与第一次运行](/learn/codex-setup/) | Codex 打开项目后应该看什么 | 理解项目读取、命令执行、diff 和权限边界 |
| [第一个 AI Coding 项目：复刻一个网站](/learn/first-ai-coding-project/) | 如何用小项目练出协作闭环 | 能分模块完成一个 PC + 移动端可看的页面 |

## Agent 进阶

| 文章 | 解决的问题 | 读完能得到什么 |
|---|---|---|
| [Agent 是怎么工作的](/learn/agent-basics/) | Agent 和聊天模型有什么本质区别 | 理解目标、上下文、工具、验证之间的循环 |
| [Memory：让 Agent 带着上下文持续工作](/learn/agent-memory/) | 全局记忆、项目记忆、项目规则和会话上下文如何区分 | 能判断哪些信息该写进项目规则或 memory |
| [Skill：把经验封装成可复用能力](/learn/skills/) | 什么时候该把经验沉淀成 skill | 会识别重复流程、模板、脚本和触发条件 |
| [MCP：让 Agent 连接外部能力](/learn/mcp/) | MCP 和普通工具调用是什么关系 | 理解连接外部系统时的权限和审计边界 |
| [Tool：Agent 真正执行动作的接口](/learn/agent-tools/) | Agent 如何读文件、改代码、跑命令 | 能监督 tool 调用输入、输出和风险 |
| [Hook：在关键节点加上自动检查和约束](/learn/hooks/) | 如何让 Agent 不忘规则、不漏验证 | 知道哪些生命周期节点适合加自动检查 |
| [Agent 的核心组成如何配合](/learn/agent-components/) | Memory、Skill、MCP、Tool、Hook 如何分工 | 用 Codex 智能体串起完整工作流 |

## 学完以后

你应该能让 AI 阅读项目结构、解释技术栈、给出启动方式、谨慎修改文件、运行最小验证、查看 diff 并提交清晰结果。下一步可以进入 [OpenSpec](/openspec/)、[Compound](/compound/)、[aisee](/aisee/) 和 [工作流](/workflows/) 相关内容，把单次协作升级为可复用工程流程。

下一篇：[AI Coding 到底改变了什么](/learn/ai-coding-intro/)
