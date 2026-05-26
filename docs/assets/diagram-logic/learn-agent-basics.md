# Agent Basics Diagram Logic

**日期：** 2026-05-26
**类型：** ctx

## 摘要

`/learn/agent-basics/` 的主图不再只画单一路径流程，而是改成 “Chat 回答” 与 “Agent 执行闭环” 的对比板，帮助读者先理解为什么会从聊天模型走向 Agent。

## 详情

- 表达目标：让初学者一眼看懂 Chat 和 Agent 的根本差异，不是“模型更强”，而是“任务是否进入执行闭环”。
- 读者上下文：已经完成 `/learn/ai-coding-intro/` 和 `/learn/tools-and-models/`，知道 AI Coding 已经不只是补全和聊天。
- 图类型：对比式流程板，而不是横向大流程图。
- 左侧路径：`用户目标 -> 模型回答 -> 输出结束`
- 右侧路径：`用户目标 -> 装载上下文 -> 模型计划 -> 执行 Tool -> 观察结果 -> 验证 / 输出`
- 主阅读路径：先左后右，对比“回答到此结束”与“结果继续回写再迭代”。
- 分支与回路：Agent 路径从 `观察结果` 返回 `模型计划`，形成下一轮。
- 故意不展示：MCP、Hook、Skill 等更进阶概念，避免在基础页里抢主线。
- 组件选择：使用 Vue 组件而不是继续维护旧 SVG。原因是这张图更像结构化对比板，组件更容易控制宽度、文案、移动端和目录区域安全。

## 引用

- `site/learn/agent-basics.md`
- `site/.vuepress/public/diagrams/learn/agent-loop.excalidraw`
