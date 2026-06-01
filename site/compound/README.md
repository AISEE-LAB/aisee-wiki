---
title: Compound Engineering
permalink: /compound/
createTime: 2026/05/23 11:01:52
---

# Compound Engineering

Compound Engineering 是一套面向 AI Coding 的工程复利方法：不只让 Agent 完成一次代码修改，而是把策略、计划、执行、评审、调试、知识沉淀和结果回看串成一条能反复复用的工作链路。

这里的 Compound 不是单指 `/ce-compound`。`/ce-compound` 只是知识沉淀环节的一个 skill；Compound Engineering 指的是更完整的协作系统。它关心的问题是：一次工程工作结束后，下一次类似工作能不能更快、更稳、更容易被审查。

## 为什么需要工程复利

AI 可以很快写代码，但如果每次任务都只留下最终 diff，团队很快会遇到几个问题：

- 需求为什么这样拆、方案为什么这样取舍，只留在聊天记录里。
- Agent 做过哪些尝试、哪些判断被否定，后来的人很难复用。
- Review 发现的问题没有沉淀，下次类似问题还会重新踩一遍。
- 修复完成后没有结构化知识库，团队经验无法被后续 Agent 检索。
- 用户结果和工程动作断开，只知道“做了什么”，不知道“有没有改善”。

Compound Engineering 的目标不是增加流程重量，而是让每个关键动作都产生后续可复用的资产：策略上下文、需求澄清、执行计划、评审发现、调试路径、解决方案文档和结果信号。

## 核心循环

<FlowExplainer
  mode="timeline"
  eyebrow="Compound loop"
  title="从一次任务到团队资产"
  description="Compound Engineering 把 AI 工程任务组织成可回看的循环：先定义方向，再执行交付，随后评审修正、沉淀知识，并用结果信号反哺下一轮。"
  :stages="[
    {
      id: 'define',
      title: '定义',
      description: '把模糊想法变成清晰上下文。',
      items: [
        {
          id: 'strategy',
          title: 'strategy',
          description: '用产品目标、用户、指标和工作轨道提供长期锚点。',
          status: 'active',
          accent: '方向',
        },
        {
          id: 'brainstorm-plan',
          title: 'brainstorm / plan',
          description: '通过澄清、拆分和计划，把工作转成可执行单元。',
          status: 'active',
          accent: '范围',
        },
      ],
    },
    {
      id: 'deliver',
      title: '交付',
      description: '让 Agent 按计划完成可验证修改。',
      items: [
        {
          id: 'work',
          title: 'work',
          description: '按计划读取项目、修改文件、运行验证，并保持范围可控。',
          status: 'default',
          accent: '执行',
        },
        {
          id: 'debug',
          title: 'debug',
          description: '从症状、复现、假设和证据追到根因。',
          status: 'risk',
          accent: '根因',
        },
      ],
    },
    {
      id: 'review',
      title: '评审',
      description: '用代码、文档、设计、研究和范围视角降低遗漏风险。',
      items: [
        {
          id: 'implementation-review',
          title: 'implementation review',
          description: '从正确性、安全、性能、测试覆盖、可维护性等维度审查实现风险。',
          status: 'risk',
          accent: '实现质量',
        },
        {
          id: 'plan-review',
          title: 'plan / doc review',
          description: '在需求、方案、计划或规范阶段提前发现矛盾、缺口和范围风险。',
          status: 'risk',
          accent: '前置检查',
        },
        {
          id: 'design-review',
          title: 'design / UI review',
          description: '检查设计决策、交互状态、UI 质量，以及实现是否贴合设计稿或设计规范。',
          status: 'risk',
          accent: '体验',
        },
        {
          id: 'research-review',
          title: 'research agents',
          description: '从仓库、历史会话、Issue、Web 或团队知识中补足判断证据。',
          status: 'default',
          accent: '证据',
        },
        {
          id: 'scope-standards',
          title: 'scope / standards',
          description: '检查范围漂移、项目规则、发布风险和团队约定是否被破坏。',
          status: 'risk',
          accent: '边界',
        },
      ],
    },
    {
      id: 'compound',
      title: '沉淀',
      description: '把解决过的问题变成可搜索知识。',
      items: [
        {
          id: 'solution-doc',
          title: 'compound',
          description: '把问题、根因、方案和预防方式写入结构化知识库。',
          status: 'done',
          accent: '知识资产',
        },
        {
          id: 'refresh',
          title: 'refresh',
          description: '定期处理过期、重复或漂移的经验文档。',
          status: 'done',
          accent: '保持有效',
        },
      ],
    },
    {
      id: 'pulse',
      title: '回看',
      description: '把用户结果和工程判断接回下一轮。',
      items: [
        {
          id: 'product-pulse',
          title: 'product pulse',
          description: '从使用、性能、错误和后续动作回看交付效果。',
          status: 'default',
          accent: '结果信号',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'strategy',
      to: 'brainstorm-plan',
      label: '长期方向约束本次范围',
      type: 'depends',
    },
    {
      from: 'brainstorm-plan',
      to: 'work',
      label: '计划进入执行',
      type: 'next',
    },
    {
      from: 'work',
      to: 'implementation-review',
      label: '实现后进入风险审查',
      type: 'gate',
    },
    {
      from: 'debug',
      to: 'solution-doc',
      label: '根因和修复沉淀为知识',
      type: 'feedback',
    },
    {
      from: 'solution-doc',
      to: 'product-pulse',
      label: '交付结果进入回看',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '定义重点',
      description: '需要先和人对齐',
    },
    {
      status: 'risk',
      label: '风险重点',
      description: '需要证据和审查',
    },
    {
      status: 'done',
      label: '沉淀重点',
      description: '服务后续复用',
    },
  ]"
/>

这条循环不是要求每个小改动都走完整流程。真正的判断标准是风险和复用价值：如果一次工作会影响用户关键路径、跨模块行为、安全/数据边界，或者以后很可能再次遇到，就值得把它放进更完整的 Compound Engineering 链路。

## 内容结构

内容按工程循环组织，而不是照搬插件命令清单。

| 分组 | 关注问题 | 相关内容 |
|---|---|---|
| 总览 | Compound Engineering 是什么，为什么它不是单个 `/ce-compound` 命令。 | [Compound Engineering 是什么](/compound/what-is-compound-engineering/)、[工程复利核心循环](/compound/workflow-loop/) |
| 定义与计划 | 模糊想法如何变成可执行计划。 | [策略、构思与计划](/compound/strategy-brainstorm-plan/) |
| 执行与质量 | 计划如何进入执行、调试、评审和优化。 | [执行、调试与评审](/compound/work-debug-review/)、[多智能体评审边界](/compound/review-boundaries/) |
| 多智能体 | 多个 reviewer、document reviewer、design reviewer 和 research agents 如何分工。 | [多智能体评审](/compound/multi-agent-review/)、[Reviewer Personas](/compound/reviewer-personas/)、[文档评审智能体](/compound/document-review-agents/)、[设计与 UI 评审智能体](/compound/design-review-agents/)、[研究型智能体](/compound/research-agents/)、[多智能体如何协作](/compound/agent-orchestration/) |
| 知识 | 一次解决如何沉淀为团队知识资产。 | [知识如何复利](/compound/knowledge-compounding/) |
| 关系 | Compound Engineering 如何与 OpenSpec 配合。 | [与 OpenSpec 如何配合](/compound/with-openspec/) |

这组内容共同建立方法模型：把 Compound Engineering 视为一套围绕 AI 工程任务的复利循环，而不是一组孤立命令。

## 参考口径

本文参考了 `EveryInc/compound-engineering-plugin` 的官方 README。该 README 将插件描述为能让每次工程工作更容易的 AI-powered development tools，并把 skills 按 Core Workflow、Research & Context、Git Workflow、Workflow Utilities、Review & Quality 等分组。

插件能力会随版本演进。这里引用相对稳定的方法论和职责边界；涉及安装方式、命令名称、skill/agent 数量或具体行为时，请以官方 README、公开文档和插件源码为准。
