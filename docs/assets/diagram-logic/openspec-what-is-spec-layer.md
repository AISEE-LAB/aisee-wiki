# OpenSpec 是什么：规范层图逻辑

## 表达目标

说明 OpenSpec 在 AI Coding 协作中的位置：它不是聊天提示词，也不是代码实现本身，而是位于意图和实现之间的可审查规范层。

## 读者视角

读者已经理解 AI Coding 的基础闭环，但容易把 OpenSpec 理解成“更长的 prompt”或“需求文档模板”。图需要帮助读者看到 OpenSpec 如何把临时对话转成可维护工程事实。

## 图类型

使用站点已有 `FlowExplainer` 组件，采用 `timeline` 模式。该图是页面内结构化流程图，不生成独立图片资产。

## 节点

- 临时意图：聊天、Issue、口头说明、零散上下文。
- 规范层：proposal、spec、design、tasks。
- 实现验证：代码变更、测试、构建、人工审查。
- 事实沉淀：specs 与 archive。

## 连线

- 临时意图进入规范层：从模糊目标变成可审查对象。
- 规范层约束实现验证：实现必须回到 spec 和 tasks 检查。
- 事实沉淀反哺后续变更：当前 specs 成为下一次 change 的基线。

## 不展示内容

- 不展示完整 SRS 到 OpenSpec Change 的上游链路。
- 不展示具体 CLI 命令。
- 不展示 Compound、Harness 或 aisee 的完整流程。

## 组件选择

选择 `FlowExplainer`，因为该组件已经支持阶段、节点、状态、关系说明和移动端降级，适合表达规范层的位置关系。
