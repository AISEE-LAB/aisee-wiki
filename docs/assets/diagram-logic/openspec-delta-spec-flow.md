# OpenSpec Delta Spec Flow 图稿逻辑

**图源：** `site/.vuepress/public/diagrams/openspec/delta-spec-flow.excalidraw`
**展示：** `site/.vuepress/public/diagrams/openspec/delta-spec-flow.svg`
**页面：** `site/openspec/delta-spec.md`

## 表达目标

说明 delta spec 如何在一次 OpenSpec change 中承接当前事实源、描述行为变化，并在完成后通过 sync/archive 回写到主 `openspec/specs/`。

## 读者上下文

读者已经理解 OpenSpec 的基础对象：`openspec/specs/` 是当前系统行为事实源，`openspec/changes/` 是待实施或正在实施的变更工作区。此图用于帮助读者进一步理解 delta spec 与主 spec 的关系。

## 图类型

使用现有 `FlowExplainer` 组件表达四段式流程，不新增静态图片或新视觉组件。

## 节点和角色

- 当前 facts：主 `openspec/specs/`，代表当前系统行为。
- change workspace：`openspec/changes/<change>/specs/`，承载本次行为变化。
- delta semantics：`ADDED`、`MODIFIED`、`REMOVED`，分别表达新增、修改、移除。
- implementation check：实现和验证，用于确认变化真实落地。
- sync/archive：把已完成变化合并回主 specs，并保留 change 历史。

## 边和标签

- 当前 facts -> change workspace：从现有行为出发写增量。
- change workspace -> delta semantics：用明确变更语义表达差异。
- delta semantics -> implementation check：实现必须对齐行为变化。
- implementation check -> sync/archive：验证后再回写事实源。
- sync/archive -> 当前 facts：主 specs 变成新的事实源。

## 主阅读路径

读者先看到主 spec 是基线，再看到 delta spec 不复制整份主 spec，而是只描述这次 change 对行为的影响。最后理解归档后的主 specs 才是新的事实源。

## 分支和回路

图中保留一个回流关系：如果实现或验证发现 delta spec 不准确，应回到 delta spec 修正，而不是让实现绕过行为约束。

## 不展示内容

- 不展示 OpenSpec schema 自定义 DAG，避免和后续 Schema 章节混淆。
- 不展示 aisee 上游需求链路，避免把 OpenSpec 教程写成项目内部流程。
- 不展示具体 CLI 命令细节，命令只在正文中作为辅助说明。

## 组件选择

采用 `FlowExplainer` 的 timeline 模式。该组件已在 OpenSpec 栏目其他文章中使用，风格一致，且不会引入页面横向溢出风险。
