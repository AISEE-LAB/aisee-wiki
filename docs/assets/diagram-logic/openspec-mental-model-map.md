# OpenSpec 心智模型图逻辑

## 表达目标

说明 OpenSpec 的核心心智模型：`specs/` 是当前事实源，`changes/` 是待实施变更工作区，`archive/` 是完成后的历史记录。读者应能理解为什么变更先写在 changes 中，而不是直接修改主 specs。

## 读者视角

读者已经读过“OpenSpec 是什么”，知道 OpenSpec 是规范层，但还不清楚目录和 artifacts 的权威关系。

## 图类型

使用 `FlowExplainer` 组件，采用 timeline 模式。该图强调状态流转和事实权威变化，而不是完整命令流程。

## 节点

- 当前事实源：`openspec/specs/`，记录当前系统行为。
- 变更工作区：`openspec/changes/<change>/`，包含 proposal、delta spec、design、tasks。
- 实现验证：代码实现和验证反馈，用于确认 change 是否成立。
- 历史归档：`openspec/changes/archive/`，保留完成后的 change 上下文。

## 连线

- specs -> changes：变更以当前行为为基线。
- changes -> implement/verify：实现和验证依据 change artifacts。
- verify -> specs/archive：验证通过后，delta specs 合入主 specs，change 进入 archive。

## 不展示内容

- 不展示完整 SRS、aisee 或 Compound 链路。
- 不展示具体 CLI 命令参数。
- 不展示 schema 扩展细节。

## 组件选择

使用已有 `FlowExplainer`，因为它支持阶段、节点、状态和关系说明，并且已经通过移动端检查。
