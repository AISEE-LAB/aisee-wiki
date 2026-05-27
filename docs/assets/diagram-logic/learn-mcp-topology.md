# MCP Topology Diagram Logic

**日期：** 2026-05-27
**类型：** ctx

## 摘要

`/learn/mcp/` 的主图改成一张真正的连接关系图，重点表达 MCP 作为连接层的作用：Agent 并不是直接接触浏览器、Figma、文档或数据库，而是通过 MCP Client / Server 接入这些外部能力。

## 详情

- 表达目标：让初学者一眼看懂 MCP 不是 Agent 本体、不是单个 Tool，而是外部能力接入层。
- 读者上下文：已经读过 `agent-basics`、`agent-memory`、`skills`，开始理解 Agent 的不同组成部分。
- 图类型：静态关系图 / 竖向拓扑图。
- 节点：
  - Agent
  - MCP Client
  - MCP Server
  - Browser
  - Figma
  - Docs / PDF
  - Database
  - Internal Systems
  - Tool / Resource / Prompt 能力条
  - 边界说明卡
- 主阅读路径：`Agent -> MCP Client -> MCP Server`
- 次级理解一：`MCP Server -> Tool / Resource / Prompt` 作为右侧说明卡，不压在主线上
- 次级理解二：`MCP Server -> 外部系统示例`
- 风险提示：通过单独边界卡强调“读写分离、测试生产分离、审计和密钥管理”
- 故意不展示：协议细节、SDK、JSON schema、具体实现命令
- 版式选择：主线改为竖向，同时把“暴露能力类型”移出主线，避免所有连线汇在同一个交点上导致混乱。
- 组件选择：使用 Excalidraw 源文件导出 SVG。这里连接关系本身就是主信息，静态关系图比卡片组件更直接。

## 引用

- `site/learn/mcp.md`
- `site/.vuepress/public/diagrams/learn/agent-loop.excalidraw`
