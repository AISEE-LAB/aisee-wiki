---
title: OpenSpec 心智模型
permalink: /openspec/mental-model/
createTime: 2026/05/28 00:00:00
---

# OpenSpec 心智模型

学习 OpenSpec 时，最重要的不是先记命令，而是先理解它的对象关系：什么是当前事实，什么是待实施变化，什么是历史记录。

OpenSpec 的核心心智模型可以压缩成一句话：

> `specs/` 保存当前系统行为，`changes/` 保存待实施变化，`archive/` 保存已完成变化的历史上下文。

这三个位置的职责不同，权威性也不同。理解这一点，后面再看 proposal、delta spec、design、tasks、archive 就不会混乱。

## 一张图看整体关系

<FlowExplainer
  mode="timeline"
  eyebrow="Mental model"
  title="当前事实、待变更工作区与历史归档"
  description="OpenSpec 把当前行为、待实施变化和历史记录分开放置。变更先在 changes 中被审查和验证，完成后再更新主 specs 并进入 archive。"
  :stages="[
    {
      id: 'current',
      title: '当前事实源',
      description: '系统现在应该如何工作。',
      items: [
        {
          id: 'specs',
          title: 'openspec/specs/',
          description: '按领域记录当前系统行为，是后续变更的基线。',
          status: 'done',
          accent: '当前事实',
        },
      ],
    },
    {
      id: 'change',
      title: '变更工作区',
      description: '某次待实施变化的独立上下文。',
      items: [
        {
          id: 'proposal',
          title: 'proposal',
          description: '说明为什么做、做什么、不做什么。',
          status: 'active',
          accent: '范围',
        },
        {
          id: 'delta',
          title: 'delta specs',
          description: '描述相对当前 specs 的行为变化。',
          status: 'active',
          accent: '变化',
        },
        {
          id: 'design-tasks',
          title: 'design / tasks',
          description: '记录技术判断，并拆成可执行任务。',
          status: 'default',
          accent: '执行',
        },
      ],
    },
    {
      id: 'verify',
      title: '实现验证',
      description: '代码实现必须回到 change artifacts 检查。',
      items: [
        {
          id: 'implementation',
          title: 'implementation / verification',
          description: '实现、测试、构建或人工检查确认行为符合 spec。',
          status: 'risk',
          accent: '验证 gate',
        },
      ],
    },
    {
      id: 'history',
      title: '历史归档',
      description: '完成后更新事实源并保留变更过程。',
      items: [
        {
          id: 'archive',
          title: 'changes/archive/',
          description: '保存完成后的 proposal、design、tasks 和变更上下文。',
          status: 'done',
          accent: '历史证据',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'specs',
      to: 'delta',
      label: '以当前行为为基线描述变化',
      type: 'depends',
    },
    {
      from: 'design-tasks',
      to: 'implementation',
      label: '按 artifacts 实现和验证',
      type: 'gate',
    },
    {
      from: 'implementation',
      to: 'archive',
      label: '验证通过后归档并更新事实源',
      type: 'feedback',
    },
  ]"
  :legend="[
    {
      status: 'done',
      label: '事实源',
      description: '当前或历史事实',
    },
    {
      status: 'active',
      label: '待审查',
      description: '变更中的关键约束',
    },
    {
      status: 'risk',
      label: '验证点',
      description: '需要测试或人工确认',
    },
  ]"
/>

这张图里最关键的箭头，是从 `changes/` 回到 `specs/` 的那一步。变更不是一开始就污染当前事实源，而是在独立工作区里被讨论、实现和验证。只有完成后，delta specs 才合入主 specs。

## `specs/`：当前系统行为的事实源

`openspec/specs/` 描述系统当前应该如何工作。官方 Concepts 文档把 specs 定义为 source of truth：它们记录的是当前行为，而不是未来愿望。

一个 spec 通常按领域组织，例如：

```text
openspec/specs/
├── auth/
│   └── spec.md
├── payments/
│   └── spec.md
└── notifications/
    └── spec.md
```

每个 spec 关注一个行为领域。它应该写“系统必须表现出什么行为”，而不是写“某个类应该怎么实现”。好的 spec 通常包含 requirement 和 scenario：requirement 描述行为要求，scenario 给出可验证例子。

可以把 `specs/` 理解成项目的当前行为契约。后续 change 要改变系统时，必须先知道当前契约是什么。

## `changes/`：待实施变化的工作区

`openspec/changes/` 保存尚未完成的变更。每个 change 是一个独立目录：

```text
openspec/changes/
└── add-export-report/
    ├── proposal.md
    ├── design.md
    ├── tasks.md
    └── specs/
        └── report-export/
            └── spec.md
```

这个目录不是临时垃圾桶，而是一次变更的工作空间。它把变更相关的意图、行为变化、技术判断和执行任务放在一起，让人和 AI 可以围绕同一组 artifacts 协作。

这种分离带来三个好处：

- 变更可以先被审查，不会立即改变主 specs。
- 多个 change 可以并行存在，各自说明自己的范围和影响。
- 变更完成后可以整体归档，保留当时的上下文。

## Artifacts：change 里的上下文文件

OpenSpec change 通常包含几类 artifacts。不同 schema 可以调整顺序和模板，但它们的职责边界应该保持清楚。

| Artifact | 负责什么 | 不负责什么 |
|---|---|---|
| `proposal.md` | 说明背景、目标、范围、非目标和影响 | 不写详细实现步骤 |
| delta spec | 描述行为如何相对当前 specs 变化 | 不写内部代码结构 |
| `design.md` | 记录技术方案、架构判断、取舍和风险 | 不替代行为规格 |
| `tasks.md` | 把实现和验证拆成可执行清单 | 不重新定义需求范围 |

这里最容易混淆的是 spec 和 design。spec 讲行为，design 讲实现判断。比如“用户可以导出 CSV”属于 spec；“使用现有报表查询服务生成 CSV”属于 design。

## Delta spec：为什么不直接改主 spec

OpenSpec 使用 delta-based approach 来处理已有系统的变更。换句话说，change 中的 spec 通常不是重新描述整个系统，而是描述本次变化：

- `ADDED`：新增行为。
- `MODIFIED`：修改已有行为。
- `REMOVED`：移除已有行为。

这样做的好处是：review 时可以聚焦“这次到底变了什么”。如果一开始就直接改主 specs，审查者很难区分哪些是现有事实、哪些是新变化、哪些只是重写措辞。

当 change 完成并归档后，delta spec 才会合并进主 specs。那一刻，变化才成为新的当前事实。

## Archive：完成后的历史证据

Archive 的意义不是“把旧文件挪走”，而是保留一次变更的上下文。

完成后的 change 目录通常会进入：

```text
openspec/changes/archive/
```

主 specs 会更新为新的当前行为；归档目录则保留当时的 proposal、design、tasks 和 delta 信息。未来有人追问“为什么这个行为是这样设计的”，就可以回到 archive 查到当时的意图和取舍。

这比只看 Git diff 更有解释力。Git diff 告诉你代码变了什么，OpenSpec archive 告诉你当时为什么这样变。

## 权威性顺序

写作和审查 OpenSpec 时，可以用下面的权威性顺序判断信息位置：

| 位置 | 权威性 | 用途 |
|---|---|---|
| `openspec/specs/` | 当前行为事实源 | 判断系统现在应该如何工作 |
| `openspec/changes/<change>/` | 待实施变更事实源 | 判断本次准备改什么、如何验证 |
| `openspec/changes/archive/` | 历史事实源 | 理解过去为什么这样改 |
| 聊天记录 / 临时笔记 | 辅助上下文 | 可以启发讨论，但不应作为最终事实 |

这不是说聊天记录没有价值，而是说聊天记录需要被整理进合适的 artifact，才适合成为工程协作的依据。

## 一个小例子

假设当前系统已有报表页面，但没有导出功能。此时：

1. 当前行为写在 `openspec/specs/report/spec.md`：报表如何查询、展示、分页。
2. 新建 change：`openspec/changes/add-report-export/`。
3. `proposal.md` 说明为什么要加导出、导出哪些数据、不支持哪些格式。
4. delta spec 用 `ADDED` 描述“用户可以导出当前筛选条件下的 CSV”。
5. `design.md` 记录是否复用现有查询服务、如何处理大数据量。
6. `tasks.md` 拆出接口、按钮、权限、测试和构建检查。
7. 实现验证通过后 archive，导出行为合入主 specs。

这个过程看起来比直接让 AI “加个导出按钮”多几步，但每一步都减少了歧义。

## 常见误区

| 误区 | 问题 | 更好的做法 |
|---|---|---|
| 把 `specs/` 当计划清单 | 会混淆当前行为和未来想法 | 未来变化先进入 `changes/` |
| 在 spec 里写实现细节 | 会让行为契约和技术方案耦合 | 行为写 spec，方案写 design |
| 在 tasks 里重新定义需求 | 会让执行清单覆盖 proposal/spec | tasks 只拆执行和验证 |
| 完成后不 archive | 主 specs 不更新，历史上下文也丢失 | 验证通过后归档并更新基线 |

## 参考资料

- [OpenSpec Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
- [OpenSpec Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
- [OpenSpec conventions spec](https://github.com/Fission-AI/OpenSpec/blob/main/openspec/specs/openspec-conventions/spec.md)
