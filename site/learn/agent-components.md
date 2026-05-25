---
title: Agent 的核心组成：Memory、Skill、MCP、Tool、Hook 如何配合
permalink: /learn/agent-components/
createTime: 2026/05/25 00:00:00
---

# Agent 的核心组成：Memory、Skill、MCP、Tool、Hook 如何配合

Memory、Skill、MCP、Tool、Hook 不是同一层能力。Memory 负责上下文，Skill 负责复用流程，MCP 负责连接外部能力，Tool 负责执行动作，Hook 负责生命周期检查和约束。

<ClientOnly>
  <LearningFlow variant="components" />
</ClientOnly>

## 五个概念的职责边界

| 概念 | 负责什么 | 不负责什么 |
|---|---|---|
| Memory | 保留和调取上下文、偏好、项目长期决策 | 不替代事实核查 |
| Skill | 复用稳定流程、模板、脚本和经验 | 不替代项目规则和验证 |
| MCP | 连接外部系统，把能力暴露给 Agent | 不等于无限授权 |
| Tool | 执行具体动作并返回结果 | 不判断业务最终正确性 |
| Hook | 在生命周期节点自动检查、注入、拦截 | 不替代人工判断 |

## 以 Codex 智能体为例

一次 Codex 任务通常这样流动：

1. 用户给出当前目标和约束。
2. Codex 读取当前会话、项目规则、项目文件和相关 memory。
3. 如果任务匹配某个 Skill，就按 Skill 的稳定流程工作。
4. 模型规划下一步，并通过 Tool 读文件、改文件、跑命令或查资料。
5. 如需连接外部系统，Tool 可能来自 MCP server。
6. Hook 在工具调用、修改后、提交前或归档前进行检查。
7. 最后输出结果、diff、验证和后续建议。

## 常见误解

| 误解 | 更准确的理解 |
|---|---|
| MCP 就是 Agent | MCP 是连接层，Agent 还需要模型、上下文、工具和控制循环 |
| Tool 等于 Skill | Tool 执行动作，Skill 封装流程 |
| Hook 能解决所有安全问题 | Hook 只能覆盖明确规则，仍需要权限设计和人工审查 |
| Memory 永远可靠 | Memory 会过期，必须被当前文件和官方文档校验 |
| Skill 只是更长 prompt | Skill 可以包含脚本、模板、资产和操作步骤 |

## 如何把它们放进工程流程

从单次 AI Coding 走向团队流程时，建议按这个顺序建设：先写项目规则，再沉淀 memory；先让 Tool 调用可审查，再接入 MCP；先手动验证关键流程，再用 Hook 自动化；最后把稳定流程做成 Skill。

下一步可以阅读 [OpenSpec](/openspec/)、[Compound](/compound/)、[aisee](/aisee/) 和 [工作流](/workflows/)。
