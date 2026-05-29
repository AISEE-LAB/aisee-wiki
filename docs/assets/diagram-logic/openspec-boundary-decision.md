# OpenSpec Boundary Decision 图稿逻辑

**图源：** `site/.vuepress/public/diagrams/openspec/boundary-decision.excalidraw`
**展示：** `site/.vuepress/public/diagrams/openspec/boundary-decision.svg`
**页面：** `site/openspec/boundaries.md`

## 表达目标

帮助读者快速判断一个任务是否值得创建 OpenSpec change。图要表达 OpenSpec 的适用边界：不是所有工作都进入 OpenSpec，只有行为变化、审查需求、设计风险或长期事实源价值足够时才进入。

## 读者上下文

读者已经理解 OpenSpec 的 specs、changes、artifacts、delta spec 和 schema。本图用于边界篇，帮助读者把前面概念落到日常取舍。

## 图类型

静态 Excalidraw 决策流，使用 `DiagramFigure` 嵌入。

## 节点和角色

- 输入任务：任意准备处理的变更、修复、重构或文档工作。
- 目标收敛判断：目标、非目标和影响范围是否已经基本清楚。
- 行为变化判断：是否改变用户或系统可观察行为。
- 审查或事实源判断：是否需要明确设计取舍、验证证据，或沉淀为长期事实源。
- OpenSpec change：适合创建 proposal、spec、design、tasks。
- 轻量记录：Issue、提交信息、PR 描述、测试、代码注释。
- 暂先探索：调研笔记、讨论记录，等目标收敛后再建 change。

## 边和标签

- 输入任务 -> 目标收敛：先问目标是否已经清楚。
- 目标收敛否 -> 暂先探索：目标未收敛时先不进入 OpenSpec。
- 目标收敛是 -> 行为变化：继续判断是否改变行为。
- 行为变化否 -> 轻量记录：小修小补不进入完整 change。
- 行为变化是 -> 审查或事实源：继续判断是否值得规范化。
- 审查或事实源是 -> OpenSpec change：需要完整上下文和长期基线。
- 审查或事实源否 -> 轻量记录。

## 主阅读路径

从“待处理任务”开始，沿着三个菱形判断自上而下阅读。读者能看到 OpenSpec 的门槛：目标收敛、行为变化、审查或事实源价值。

## 分支和回路

图中保留“暂先探索”分支，但不画回路。正文说明探索收敛后可以重新进入判断流程。

## 不展示内容

- 不展示其他栏目、工具或组织工作流的边界。
- 不展示具体 OpenSpec 命令。
- 不展示所有工程材料，只保留轻量记录的典型代表。

## 组件选择

使用 `DiagramFigure` 默认 `fit` 模式。图采用纵向标准流程图，主路径自上而下，分支横向进入处理结果，节点数量控制在正文宽度内。
