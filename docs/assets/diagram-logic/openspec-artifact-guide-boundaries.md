# OpenSpec Artifact 写法指南图逻辑

## 表达目标

说明 `proposal.md`、delta spec、`design.md`、`tasks.md` 的职责边界。重点不是展示命令顺序，而是让读者理解四类 artifact 分别回答什么问题，以及为什么不能互相替代。

## 读者视角

读者已经看过 OpenSpec 基础工作流，知道一次 change 从 propose 到 archive 推进。现在需要掌握每个 artifact 的写法和审查标准。

## 图类型

使用 `FlowExplainer` timeline 模式。图形呈现为职责接力：意图范围 -> 行为约束 -> 实现判断 -> 执行验证。

## 节点

- Intent：proposal，回答为什么做、做什么、不做什么。
- Behavior：delta spec，回答行为如何变化。
- Decision：design，回答怎么做、为什么这样做、风险是什么。
- Execution：tasks，回答如何执行和验证。

## 连线

- proposal -> delta spec：范围决定行为变化。
- delta spec -> design：行为约束设计。
- design -> tasks：方案拆成任务。

## 不展示内容

- 不展示 OpenSpec change 之前的上游需求、内容或技术规划链路。
- 不展开 `/opsx:*` 命令。
- 不把某一个项目 schema 的顺序写成 OpenSpec 唯一顺序。

## 组件选择

使用已有 `FlowExplainer`。它能表达 artifact 之间的依赖关系，同时不会引入额外静态图片资源。
