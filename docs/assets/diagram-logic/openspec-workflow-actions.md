# OpenSpec 基础工作流图逻辑

## 表达目标

说明 OpenSpec 从 propose 到 archive 的基础工作流。重点不是命令清单，而是每个动作的输入、输出和检查点。

## 读者视角

读者已经理解 OpenSpec 的规范层价值和目录心智模型，下一步需要知道一次 change 如何实际推进。

## 图类型

使用 `FlowExplainer` timeline 模式。图要体现工作流是可迭代动作链，不是不可回退的阶段门。

## 节点

- Define：propose 和 delta specs。
- Decide：design 和 tasks。
- Build：implement 和 verification。
- Close：sync/archive。

## 连线

- propose -> delta specs：范围决定行为变化。
- delta specs -> design/tasks：行为变化决定实现方案和任务边界。
- implement/verify -> design/specs：发现偏差时回头修正 artifacts。
- verify -> archive：验证通过后归档。

## 不展示内容

- 不展开 `/opsx:*` 命令大全。
- 不展示 aisee 上游 SRS 链路。
- 不展示 schema 扩展细节。

## 组件选择

使用已有 `FlowExplainer`，因为它可以通过 connection type 表达依赖、验证和回流。
