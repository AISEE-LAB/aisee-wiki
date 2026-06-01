---
title: AI Engineering
permalink: /ai-engineering/
createTime: 2026/06/01 00:00:00
---

# AI Engineering

AI Engineering 不是“把 AI 接进开发工具”这么简单。它讨论的是：当 AI 可以阅读项目、修改代码、调用工具、运行命令、参与评审和沉淀知识时，软件工程的组织方式应该怎样变化。

这种组织方式可以称为 **AI 增强软件工程**。核心不是让 AI 替代工程师，而是让工程师用更明确的规范、更受控的执行环境和更可复用的知识体系，把 AI 纳入工程闭环。

## 核心问题

| 问题 | 传统工程常见做法 | AI 增强后的挑战 | 工程化回应 |
|---|---|---|---|
| 要做什么 | 需求、Issue、设计文档 | AI 会根据不完整上下文自行补全假设 | OpenSpec |
| 怎么执行 | 人读代码、写代码、跑测试 | Agent 会读写文件、跑命令、调用工具 | Harness / AISEE |
| 怎么判断完成 | 人 review、测试、验收 | 生成速度更快，错误也更容易被放大 | Review / Hook |
| 经验如何复用 | 文档、代码注释、团队记忆 | 聊天记录难检索，经验容易散掉 | Compound |

## 三条主线

1. **Spec First**：先把目标、范围、行为变化、设计判断和验收标准放进可审查的事实源。
2. **Harness Better**：让 AI 在有边界的环境中工作，明确工具、权限、上下文、Hook 和验证。
3. **Compound Knowledge**：把解决过程、评审经验、调试路径和团队约定沉淀为下一次可复用的资产。

## 方法路线

1. [传统软件工程和 AI 增强软件工程有什么不同](/ai-engineering/traditional-vs-ai-engineering/)
2. [AI 没有改变什么](/ai-engineering/what-does-not-change/)
3. [工程师在 AI 时代的新职责](/ai-engineering/engineer-role/)
4. [从 Prompt 到 Spec](/ai-engineering/prompt-to-spec/)
5. [从 Tool 到 Harness](/ai-engineering/tool-to-harness/)
6. [从经验到复利](/ai-engineering/experience-to-compounding/)

## 方法版图

| 工程问题 | 方法回应 |
|---|---|
| 建立 AI Coding 基础认知 | [学习路径](/learn/) 提供 Agent、Memory、Skill、MCP、Tool 和 Hook 的基础模型。 |
| 把 AI 协作变成可审查 change | [OpenSpec](/openspec/) 固定目标、行为变化、设计判断和验收边界。 |
| 把计划、执行、评审和知识沉淀串成闭环 | [Compound](/compound/) 组织计划、调试、review 和 solution docs。 |
| 把需求、上下文、change 和验证串成工作流 | [AISEE](/aisee/) 串联 SRS、技术上下文、change 规划和验证。 |
| 引入外部项目和工具参考 | [推荐资源](/resources/) 聚合相关工具、项目和方法论资料。 |
