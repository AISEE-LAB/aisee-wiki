# OpenSpec README 工作流图逻辑

## 表达目标

在 `/openspec/` 栏目首页用一张轻量流程图说明 OpenSpec change 从提出到归档的基本闭环，帮助读者先建立整体顺序，再阅读后续专题。

## 读者视角

读者已经知道 AI Coding 和 Agent 基础，但未必理解 OpenSpec 中 proposal、spec、design、tasks、archive 的关系。

## 图类型

使用站点已有 `FlowExplainer` 组件。该图是文档内结构化流程图，不生成独立 SVG/PNG。

## 节点

- 定义变更：proposal 和 delta spec，负责说明为什么改、改什么、行为如何变化。
- 设计任务：design 和 tasks，负责记录技术判断并拆成可执行清单。
- 实现验证：implement 和 verify，负责按任务实现并确认行为符合 spec。
- 归档演进：archive，负责合并 delta specs、移动 change 目录并保留历史上下文。

## 连线

- proposal / delta spec -> design / tasks：行为变化决定设计和任务边界。
- design / tasks -> implement / verify：按任务实现并验证。
- implement / verify -> archive：通过验证后归档，更新事实源。

## 不展示内容

- 不展示 aisee 的 SRS、UI 内容规格、技术上下文等上游链路。
- 不展示 Compound、Harness 或其他执行增强流程。
- 不展示具体 CLI 命令参数，以免栏目首页变成命令手册。

## 组件选择

选择 `FlowExplainer`，因为站点已经注册该组件，适合表达阶段、节点、状态和关系说明，并且有移动端降级能力。
