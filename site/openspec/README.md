---
title: OpenSpec
permalink: /openspec/
createTime: 2026/05/23 11:01:52
---

# OpenSpec

OpenSpec 是一种面向 AI coding assistants 的轻量级 spec-driven development framework。它的核心作用，是在代码实现之前建立可审查的规范层，让人和 AI 先对齐“要构建什么、为什么构建、哪些行为会变化、如何判断完成”。

OpenSpec 不是把需求文档搬进仓库，也不是把开发流程变成固定阶段。它更像一套围绕 `openspec/` 目录工作的协作约定：当前系统行为放在 specs 中，待实施变更放在 changes 中，变更完成后再归档并更新事实源。

## 为什么需要 OpenSpec

AI 可以快速生成代码，但如果需求、边界和验收标准只存在于聊天记录里，协作很容易出现几个问题：

- 变更目标说不清，Agent 开始实现后不断补问或自行假设。
- 需求范围在实现过程中漂移，最后很难判断哪些改动属于本次任务。
- 现有系统行为没有被记录，新需求容易破坏已有约束。
- 多个线程、多个 Agent 或多名协作者参与时，缺少共同事实源。
- 代码改完以后，只能看到 diff，却看不到当时为什么这么设计。

OpenSpec 试图解决的不是“让 AI 写得更快”，而是“让 AI 按可验证的工程事实工作”。它把意图、行为变化、设计判断和执行任务沉淀为文件，方便审查、修改、实现和归档。

## 核心概念

OpenSpec 的基础模型可以先从四类对象理解：

| 概念 | 作用 |
|---|---|
| `specs/` | 当前系统行为的事实源，描述系统现在应该如何工作。 |
| `changes/` | 待实施或正在实施的变更，每个 change 使用独立目录保存上下文。 |
| artifacts | change 内部的工作文件，例如 proposal、spec、design、tasks。 |
| archive | 已完成 change 的归档位置，用来保留历史上下文并更新主 specs。 |

一个典型目录结构如下：

```text
openspec/
├── specs/      # 当前系统行为的事实源
└── changes/    # 待实施或正在实施的变更
```

`specs/` 不是未来计划，而是当前系统行为的基线。`changes/` 不是临时草稿堆，而是每次变更的工作空间。一次变更通常会包含这些 artifacts：

| Artifact | 主要回答的问题 |
|---|---|
| `proposal.md` | 为什么要做、改什么、不改什么、影响范围是什么。 |
| `spec.md` | 行为如何变化，通常以 ADDED、MODIFIED、REMOVED 等方式描述。 |
| `design.md` | 技术方案、架构判断、取舍和风险。 |
| `tasks.md` | 可以逐项执行和验证的任务清单。 |

当 change 完成并 archive 后，delta spec 会合入主 specs，change 文件夹会进入 archive，保留当时的 proposal、design、tasks 和变更上下文。这样项目留下的不只是“代码已经改了”，还包括“当时为什么这么改、怎么判断完成、哪些行为被更新”。

## 工作方式概览

OpenSpec 的工作流通常围绕一次 change 展开：

<FlowExplainer
  mode="timeline"
  eyebrow="OpenSpec workflow"
  title="从变更意图到规范归档"
  description="一次 OpenSpec change 会把意图、行为变化、技术判断、执行任务和归档记录放在同一条可审查链路中。"
  :stages="[
    {
      id: 'define',
      title: '定义变更',
      description: '先把目标和行为变化写清楚。',
      items: [
        {
          id: 'proposal',
          title: 'proposal',
          description: '说明为什么做、改什么、不改什么，以及影响范围。',
          status: 'active',
          accent: '意图与范围',
        },
        {
          id: 'delta-spec',
          title: 'delta spec',
          description: '描述相对当前 specs 的 ADDED、MODIFIED 或 REMOVED 行为。',
          status: 'active',
          accent: '行为变化',
        },
      ],
    },
    {
      id: 'plan',
      title: '设计任务',
      description: '把行为变化转成可执行方案。',
      items: [
        {
          id: 'design',
          title: 'design',
          description: '记录技术方案、架构判断、风险和取舍。',
          status: 'default',
          accent: '技术判断',
        },
        {
          id: 'tasks',
          title: 'tasks',
          description: '拆成可以逐项执行和验证的任务清单。',
          status: 'default',
          accent: '执行清单',
        },
      ],
    },
    {
      id: 'deliver',
      title: '实现验证',
      description: '按任务实现，并确认结果符合 spec。',
      items: [
        {
          id: 'implement',
          title: 'implement',
          description: '基于 artifacts 修改代码、配置或文档。',
          status: 'risk',
          accent: '实现',
        },
        {
          id: 'verify',
          title: 'verify',
          description: '运行测试、构建、检查或人工审查，确认行为没有偏离。',
          status: 'risk',
          accent: '验证 gate',
        },
      ],
    },
    {
      id: 'archive',
      title: '归档演进',
      description: '完成后更新事实源并保留历史。',
      items: [
        {
          id: 'archive-node',
          title: 'archive',
          description: '合并 delta specs，移动 change 目录，保留 proposal、design 和 tasks。',
          status: 'done',
          accent: '事实源更新',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'delta-spec',
      to: 'design',
      label: '行为变化决定设计边界',
      type: 'depends',
    },
    {
      from: 'tasks',
      to: 'implement',
      label: '任务清单进入实现',
      type: 'next',
    },
    {
      from: 'verify',
      to: 'archive-node',
      label: '验证通过后归档',
      type: 'gate',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '定义重点',
      description: '需要先被人和 AI 对齐',
    },
    {
      status: 'risk',
      label: '验证重点',
      description: '必须用检查结果确认',
    },
    {
      status: 'done',
      label: '完成状态',
      description: '归档后成为历史事实',
    },
  ]"
/>

```text
propose -> specs -> design -> tasks -> implement -> verify -> archive
```

这条线不是瀑布式阶段门。OpenSpec 的官方理念强调 fluid 和 iterative：实现过程中发现理解有误，可以回头修正 proposal、spec、design 或 tasks。关键要求不是“必须按死顺序走完”，而是每个重要判断都能回到对应 artifact 中被审查。

Archive 是工作流的收口动作。归档时，变更中的 delta specs 会被合并到主 specs，change 目录会移动到 `changes/archive/`，成为后续审计和理解历史决策的依据。

## 学习路线

建议按下面的顺序学习 OpenSpec：

1. [OpenSpec 是什么：AI 编程时代为什么需要规范层](/openspec/what-is-openspec/)
2. [OpenSpec 心智模型：specs、changes、artifacts 与 archive](/openspec/mental-model/)
3. [OpenSpec 基础工作流：从 propose 到 archive](/openspec/workflow/)
4. [Artifact 写法指南：proposal、spec、design、tasks 分别怎么写](/openspec/artifact-guide/)
5. [Spec 粒度设计：项目级、模块级、能力级如何划分](/openspec/spec-granularity/)
6. [Delta Spec 深度解析：ADDED、MODIFIED、REMOVED 怎么写](/openspec/delta-spec/)
7. [OpenSpec Schema 是什么：artifact DAG、模板和门禁](/openspec/schema/)
8. [OpenSpec 的适用边界：什么时候该用，什么时候不该用](/openspec/boundaries/)

这个顺序先建立概念模型，再进入操作方法，最后讨论扩展和边界。对于第一次接触 OpenSpec 的读者，不建议从 schema 或命令速查开始。

## 适用边界

OpenSpec 适合用于需要明确行为变化、协作边界和验收标准的工作：

- 新功能、重要修复、跨模块重构、架构调整。
- 需要让 AI assistant 在较长上下文中持续协作的任务。
- 需要多人审查变更意图和实现范围的任务。
- 需要保留设计判断和历史原因的任务。

OpenSpec 不适合被滥用到所有小改动中：

- 简单错别字、无行为影响的文案修正。
- 已经完全明确且风险很低的局部调整。
- 还处于纯探索阶段、尚未形成可验证变更目标的想法。
- 与代码或系统行为无关的泛泛项目管理记录。

判断是否需要 OpenSpec，可以看一个问题：如果只看最终代码 diff，未来的人是否还能理解这次变更的目标、边界、行为影响和验收标准？如果答案是否定的，就值得把它放进 OpenSpec change。

## 术语速览

| 术语 | 说明 |
|---|---|
| Spec | 对当前系统行为或变更后行为的结构化描述。 |
| Change | 一次待实施或正在实施的变更工作单元。 |
| Delta spec | 描述某次 change 相对当前 specs 的行为变化。 |
| Artifact | OpenSpec change 中承载上下文的文件，如 proposal、design、tasks。 |
| Archive | 完成变更后的归档记录，同时推动 specs 演进。 |
| Schema | 用来定义 artifact 顺序、模板和工作流约束的扩展机制。 |

## 参考资料

- [OpenSpec GitHub 仓库](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec Getting Started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)
- [OpenSpec Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
- [OpenSpec Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
