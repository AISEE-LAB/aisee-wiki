---
title: 从 Tool 到 Harness
permalink: /ai-engineering/tool-to-harness/
createTime: 2026/06/01 00:00:00
---

# 从 Tool 到 Harness

Tool 让 AI 能做事，Harness 决定 AI 如何安全、稳定、可审查地做事。

如果只有工具，Agent 可以读文件、改代码、跑命令、访问浏览器或调用外部服务；但如果没有 harness，这些能力会变成一组松散的权限，难以控制范围、记录结果和拦截风险。

## Tool 解决动作问题

Tool 的问题很直接：模型本身只能生成文本，不能天然观察和改变工程环境。

| Tool 类型 | 能力 | 风险 |
|---|---|---|
| 文件工具 | 读写代码、文档和配置 | 越界修改、覆盖用户改动 |
| Shell | 安装依赖、启动服务、运行测试 | 删除文件、泄露环境、影响系统状态 |
| 浏览器 | 预览页面、检查 UI、操作网站 | 误操作登录态或外部系统 |
| Git | 查看 diff、提交、切分支 | 提交无关改动、破坏历史 |
| MCP | 连接 Figma、数据库、文档、内部系统 | 权限和隐私边界不清 |

Tool 让 Agent 从“建议”进入“执行”。也正因为如此，Tool 必须被约束。

## Harness 解决边界问题

Harness 是围绕 Agent 执行建立的一组边界和检查机制。它不只是某个框架，而是一种工程组织方式。

| Harness 元素 | 作用 |
|---|---|
| 项目规则 | 告诉 Agent 当前项目的工作方式和禁区 |
| Memory | 复用长期有效的上下文和偏好 |
| Skill | 把稳定流程封装为可重复触发的能力 |
| MCP | 以受控方式连接外部系统 |
| Hook | 在关键生命周期节点注入检查和约束 |
| 权限模型 | 决定哪些动作可以自动执行，哪些必须确认 |
| 验证命令 | 让结果能被测试、构建或截图检查 |

## 从工具列表到执行环境

```text
Tool list
  -> 允许哪些动作
  -> 在什么上下文里动作
  -> 哪些动作要拦截
  -> 如何观察结果
  -> 如何把经验沉淀
  -> Harness
```

因此，工程化重点不只是列出 Tool，而是把 Memory、Skill、MCP、Hook 和验证边界组合成可控执行环境。

## 判断一个 harness 是否可靠

| 问题 | 好的答案 |
|---|---|
| Agent 从哪里读取规则？ | 项目文件、OpenSpec artifacts、memory 索引，而不是只靠当前 prompt。 |
| Agent 可以改哪里？ | 有明确范围、diff 审查和用户确认。 |
| Agent 可以跑什么命令？ | 有权限边界，高风险命令必须解释影响。 |
| Agent 如何验证？ | 有最小构建、测试、预览或检查命令。 |
| Agent 如何学习？ | 可沉淀为 memory、skill 或 solution docs。 |

## 工作流承接

[AISEE Plugin](/aisee/workflows/) 将 harness 思路落到项目协作：先整理需求和技术上下文，再规划 change，随后由 OpenSpec 和 Compound Engineering 承接实现、验证和沉淀。

AI 增强软件工程不是“给 AI 更多工具”，而是让 AI 在一个可理解、可限制、可验证的环境里工作。
