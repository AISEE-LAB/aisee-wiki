# OpenSpec Schema DAG 图稿逻辑

**图源：** `site/.vuepress/public/diagrams/openspec/schema-dag.excalidraw`
**展示：** `site/.vuepress/public/diagrams/openspec/schema-dag.svg`
**页面：** `site/openspec/schema.md`

## 表达目标

说明 OpenSpec schema 如何定义 artifact 类型、依赖关系、模板和实施入口。图的重点是“schema 决定 change 工作区里可以生成哪些 artifact，以及它们之间如何解锁”，不是展示某个团队的全部流程。

## 读者上下文

读者已经看过 OpenSpec 基础工作流、artifact 写法、delta spec。此时需要理解：默认 workflow 不是写死在 OpenSpec 概念里，而是由 schema 描述；团队可以通过项目级 schema 定义不同 artifact 和依赖关系。

## 图类型

静态 Excalidraw DAG 图，使用 `DiagramFigure` 嵌入页面。

## 节点和角色

- `schema.yaml`：定义 artifact DAG。
- `proposal`：根 artifact，说明为什么做和做什么。
- `specs`：行为变化说明，依赖 proposal。
- `design`：实现判断，依赖 specs。
- `tasks`：执行清单，依赖 design。
- `templates/`：为每个 artifact 提供生成结构。
- `apply gate`：进入实施时检查需要哪些 artifact。

## 边和标签

- `schema.yaml -> proposal/specs/design/tasks`：定义 artifacts。
- `proposal -> specs`：范围解锁行为变化。
- `specs -> design`：行为约束设计判断。
- `design -> tasks`：方案约束执行任务。
- `tasks -> apply gate`：实施入口。
- `templates -> artifacts`：模板塑形生成内容。

## 主阅读路径

读者先看到 schema 是定义层，再沿着 proposal、specs/design、tasks 读出 artifact 依赖，最后看到 apply gate 说明 schema 也会影响实施入口。

## 分支和回路

图中不画复杂回路，只用虚线强调模板会影响 artifact 生成内容。正文补充说明：依赖是解锁关系，不是僵硬阶段门。

## 不展示内容

- 不展示 aisee-docsite-driven 的完整细节，避免主图变成项目内部流程。
- 不展示命令输出和 schema resolution 细节，留给正文说明。
- 不展示所有可选字段，只保留读者理解 schema 的必要概念。

## 组件选择

使用 `DiagramFigure` 的默认 `fit` 模式。图控制在正文宽度内，避免横向滚动。
