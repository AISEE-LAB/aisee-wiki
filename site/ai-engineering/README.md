---
title: AI Engineering
description: 解释 AI 增强软件工程的方法论基础，连接指南、OpenSpec、Compound Engineering 与 AISEE 主线实践。
permalink: /ai-engineering/
createTime: 2026/06/01 00:00:00
---

# AI Engineering

AI Engineering 不是“把 AI 接进开发工具”这么简单。它讨论的是：当 AI 可以阅读项目、修改代码、调用工具、运行命令、参与评审和沉淀知识时，软件工程的组织方式应该怎样变化。

这种组织方式可以称为 **AI 增强软件工程**。核心不是让 AI 替代工程师，而是让工程师用更明确的规范、更受控的执行环境和更可复用的知识体系，把 AI 纳入工程闭环。

在内容结构上，AI Engineering 处在两个栏目之间：

- [指南](/learn/) 解决基础认知，说明 Agent、Memory、Skill、MCP、Tool、Hook 分别是什么。
- AI Engineering 解释为什么这些能力会改变软件工程的组织方式。
- [AISEE](/aisee/) 进入主线实践，围绕 AISEE Plugin、OpenSpec 和 Compound Engineering 展开。

## 核心问题

| 问题 | 传统工程常见做法 | AI 增强后的变化 | 工程化回应 |
|---|---|---|---|
| 要做什么 | 需求、Issue、设计文档 | AI 会根据不完整上下文自行补全假设 | OpenSpec |
| 怎么执行 | 人读代码、写代码、跑测试 | Agent 会读写文件、跑命令、调用工具 | Harness / AISEE Plugin |
| 怎么判断完成 | 人 review、测试、验收 | 生成速度更快，错误也更容易被放大 | Review / Hook |
| 经验如何复用 | 文档、代码注释、团队记忆 | 聊天记录难检索，经验容易散掉 | Compound Engineering |

AI 让执行更快，但它不会自动带来更可靠的工程结果。真正需要调整的是：把原来依赖人的隐性判断、会议上下文和评审经验，转成 AI 也能读取、执行后也能被复核的工程材料。

## 和传统工程的关键差异

| 工程环节 | 传统工程重点 | AI 增强后的重点 |
|---|---|---|
| 需求 | 让团队理解要做什么 | 让人和 AI 都能看懂目标、范围和验收条件 |
| 设计 | 记录方案和取舍 | 把架构判断、边界和风险变成执行前上下文 |
| 开发 | 人按任务实现 | Agent 在明确任务、权限和文件范围内执行 |
| 测试 | 用测试和 QA 捕获问题 | 同时检查测试结果、命令输出、diff 和越界行为 |
| 评审 | 评审代码质量 | 评审需求理解、执行路径、生成内容和知识沉淀 |
| 沉淀 | 写文档或复盘 | 把可复用经验转成 solution docs、memory、skill 或模板 |

## 三条主线

1. **Spec First**：先把目标、范围、行为变化、设计判断和验收标准放进可审查的事实源。
2. **Harness Better**：让 AI 在有边界的环境中工作，明确工具、权限、上下文、Hook 和验证。
3. **Compound Knowledge**：把解决过程、评审经验、调试路径和团队约定沉淀为下一次可复用的资产。

## 方法版图

| 工程问题 | 方法回应 |
|---|---|
| 建立 AI Coding 基础认知 | [指南](/learn/) 提供 Agent、Memory、Skill、MCP、Tool 和 Hook 的基础模型。 |
| 把 AI 协作变成可审查 change | [OpenSpec](/openspec/) 固定目标、行为变化、设计判断和验收边界。 |
| 把计划、执行、评审和知识沉淀串成闭环 | [Compound Engineering](/compound/) 组织计划、调试、review 和 solution docs。 |
| 把需求、上下文、change 和验证串成工作流 | [AISEE Plugin](/aisee/workflows/) 串联 SRS、技术上下文、change 规划和验证。 |
| 引入外部项目和工具参考 | [推荐资源](/resources/) 聚合相关工具、项目和方法论资料。 |
