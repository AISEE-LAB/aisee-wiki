---
title: MCP：让 Agent 连接外部能力
permalink: /learn/mcp/
createTime: 2026/05/25 00:00:00
---

# MCP：让 Agent 连接外部能力

MCP 是 Agent 连接外部工具、数据和服务的桥梁，让模型能在受控接口下使用外部能力。

<ClientOnly>
  <LearningFlow variant="mcp" />
</ClientOnly>

## 为什么 Agent 需要 MCP

模型本身不能天然访问你的浏览器、Figma、数据库、文档系统或企业内部工具。MCP 通过标准化的 server/client 方式，把外部能力暴露给 Agent。

## 基本角色

| 角色 | 作用 |
|---|---|
| MCP Client | Agent 所在应用，负责连接 MCP server |
| MCP Server | 把外部系统能力包装成可调用接口 |
| Tool | 让 Agent 执行动作，例如查数据、读设计、操作浏览器 |
| Resource | 让 Agent 读取外部上下文，例如文件、文档、记录 |
| Prompt | 提供可复用的任务模板或上下文入口 |

## 典型场景

- 浏览器：打开页面、点击、截图、验证 UI。
- Figma：读取设计稿、资产和组件信息。
- 数据库：查询开发或测试数据。
- 文档：读取需求、规格、表格、PDF。
- 企业内部系统：工单、监控、发布、知识库。

::: warning MCP 不是无限授权
连接能力不等于可以随便操作。权限、审计、数据范围、密钥管理和误操作恢复，都需要在工具配置和项目规则里明确。
:::

## MCP 与 Tool 的关系

MCP 常用于提供 Tool，但 Tool 不一定都来自 MCP。比如本地 Shell、文件编辑、apply patch 也可以是 Agent 的工具；MCP 更像连接外部系统的标准桥梁。
