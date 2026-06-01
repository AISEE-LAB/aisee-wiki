---
title: 与 OpenSpec 如何配合
permalink: /compound/with-openspec/
createTime: 2026/05/30 00:00:00
---

# 与 OpenSpec 如何配合

OpenSpec 和 Compound Engineering 不是竞争关系。它们约束的是 AI 工程协作的两个不同层面：OpenSpec 管规范事实源和变更边界，Compound Engineering 管计划、执行、评审、调试、知识沉淀和结果回看。

如果只用 OpenSpec，规范可能很清楚，但执行、评审和知识沉淀仍然需要后续链路承接。如果只用 Compound Engineering，执行反馈链路可能很顺，但重大变更仍然需要一个可审查、可归档的事实源。

## 核心结论

两者的职责可以这样划分：

- OpenSpec 回答“这次变更的事实源是什么”。
- Compound Engineering 回答“如何把这次工程工作计划好、执行好、评审好、沉淀好”。

它们可以组合使用，也可以按任务风险单独使用。关键是不要让某一层替代另一层：评审不能替代 spec，spec 不能替代执行验证，知识沉淀也不能替代归档后的事实源更新。

## 组合路径

<FlowExplainer
  mode="timeline"
  eyebrow="OpenSpec + Compound"
  title="从规范事实到工程复利"
  description="OpenSpec 先固化变更的事实源，Compound Engineering 再承接执行、评审、调试和知识沉淀；完成后回到 OpenSpec archive 更新长期事实。"
  :stages="[
    {
      id: 'shape',
      title: '问题成形',
      description: '先把目标、范围和约束整理到可以审查的程度。',
      items: [
        {
          id: 'ce-brainstorm-plan',
          title: 'brainstorm / plan',
          description: '当需求仍模糊时，先澄清问题、范围、计划和验证边界。',
          status: 'active',
          accent: '澄清',
        },
      ],
    },
    {
      id: 'spec',
      title: '规范事实源',
      description: '把确认后的变更边界放进 OpenSpec。',
      items: [
        {
          id: 'openspec-change',
          title: 'OpenSpec change',
          description: 'proposal、spec、design、tasks 记录为什么做、改什么、怎么做、如何验收。',
          status: 'risk',
          accent: '事实源',
        },
      ],
    },
    {
      id: 'delivery',
      title: '执行与质量',
      description: '基于事实源进入实现、调试和评审。',
      items: [
        {
          id: 'ce-work-debug',
          title: 'ce-work / ce-debug',
          description: '按计划执行，遇到问题从症状追到根因。',
          status: 'default',
          accent: '执行',
        },
        {
          id: 'ce-review',
          title: 'ce-code-review / ce-doc-review',
          description: '用多视角审查实现、文档、设计和研究证据。',
          status: 'risk',
          accent: '评审',
        },
      ],
    },
    {
      id: 'compound',
      title: '沉淀归档',
      description: '把一次工程工作变成下一次的资产。',
      items: [
        {
          id: 'ce-compound',
          title: 'ce-compound',
          description: '把问题、根因、方案和预防方式写入 docs/solutions。',
          status: 'done',
          accent: '知识',
        },
        {
          id: 'archive',
          title: 'OpenSpec archive',
          description: '完成后更新主事实源，并保留变更历史。',
          status: 'done',
          accent: '收口',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'ce-brainstorm-plan',
      to: 'openspec-change',
      label: '计划成熟后固化',
      type: 'depends',
    },
    {
      from: 'openspec-change',
      to: 'ce-work-debug',
      label: '事实源约束执行',
      type: 'next',
    },
    {
      from: 'ce-work-debug',
      to: 'ce-review',
      label: '实现进入评审',
      type: 'gate',
    },
    {
      from: 'ce-review',
      to: 'ce-compound',
      label: '经验沉淀为知识',
      type: 'feedback',
    },
    {
      from: 'ce-compound',
      to: 'archive',
      label: '知识和规范分别收口',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '澄清层',
      description: '把问题说清楚',
    },
    {
      status: 'risk',
      label: '事实与质量',
      description: '需要审查和验证',
    },
    {
      status: 'done',
      label: '复利层',
      description: '留下可复用资产',
    },
  ]"
/>

这条路径不是固定流程。它表达的是职责顺序：先把问题说清楚，再固化事实源，再执行和评审，最后沉淀知识和归档。

## 职责边界

| 方法 | 主要职责 | 产物 | 不负责什么 |
|---|---|---|---|
| OpenSpec | 规范层、事实源、变更边界、验收标准。 | `proposal.md`、delta specs、`design.md`、`tasks.md`、archive。 | 不直接替代实现、调试、代码评审和结果回看。 |
| Compound Engineering | 工程执行、计划、评审、调试、优化、知识复利和产品信号。 | requirements、plan、review findings、solution docs、pulse report。 | 不替代已生效 spec，也不自动决定产品取舍。 |

最容易混淆的是 OpenSpec 和 Compound Engineering。OpenSpec 是规范层，告诉 Agent 什么是本次变更的事实源；Compound Engineering 是工程协作层，告诉 Agent 如何把一次工作做完、审好、沉淀好。

## 什么时候先 OpenSpec

当任务已经明确要改变系统行为，或者需要多人 / 多 Agent 在同一事实源上协作时，应该先进入 OpenSpec。

| 场景 | 为什么先 OpenSpec |
|---|---|
| 新功能 | 需要先明确行为、范围、验收和不做什么。 |
| 跨模块重构 | 需要把影响范围、迁移策略和风险写清楚。 |
| 权限、数据、安全、支付 | 需要可审查的信任边界和验收标准。 |
| 长周期任务 | 聊天上下文不可靠，需要文件级事实源。 |
| 多人 / 多线程协作 | 必须让所有参与者看同一份 proposal、spec、design 和 tasks。 |

在这种路径下，Compound Engineering 更适合作为执行和质量层：用 `ce-work` 执行任务，用 `ce-code-review` / `ce-doc-review` 审查风险，用 `ce-compound` 沉淀过程经验。

## 什么时候先 Compound

当问题还不清楚、想法还在探索，或者团队需要先把方向和计划说清楚时，可以先用 Compound Engineering 的定义与计划能力。

| 场景 | 适合先用什么 |
|---|---|
| 只有模糊想法 | `ce-brainstorm` 帮助澄清目标、用户、范围和 open questions。 |
| 想比较多个方案 | `ce-ideate` 或 research agents 补 prior art、仓库事实和外部信号。 |
| 需要拆执行计划 | `ce-plan` 把 requirements 转成 implementation units 和验证边界。 |
| 只是低风险局部任务 | 直接用轻量执行和评审，不一定需要 OpenSpec change。 |

这不是绕过 OpenSpec。它只是承认：有些需求在进入规范层之前，还需要被澄清、批判性筛选和计划化。等目标和边界稳定后，再把它转成 OpenSpec change。

## 典型组合方式

| 任务类型 | 推荐组合 | 判断依据 |
|---|---|---|
| 需求已清楚的新功能 | OpenSpec -> `ce-work` -> `ce-code-review` -> archive / `ce-compound` | 先固化规范，再执行和沉淀。 |
| 需求仍模糊 | `ce-brainstorm` / `ce-plan` -> OpenSpec -> Compound 执行评审 | 先澄清，再进入事实源。 |
| 文档站内容建设 | OpenSpec doc change -> 分篇写作 -> `pnpm docs:build` -> project-docs 回写 | 文档工作也需要 change 范围和 archive gate。 |
| UI 功能 | 内容规格 / design lens -> OpenSpec 或 plan -> `ce-work` -> design implementation review | 先明确页面内容和状态，再验证实现。 |
| 线上问题修复 | `ce-debug` -> 必要时 OpenSpec -> `ce-code-review` -> `ce-compound` | 先找根因；若行为或范围变化大，再补规范层。 |
| 已解决问题沉淀 | `ce-compound` | 把一次解决写成未来可检索的 solution。 |

这些组合不是互斥模板。真实工作中，可能先从 debug 开始，发现是需求边界缺失，再回到 OpenSpec 更新 spec；也可能先从 OpenSpec 开始，执行中发现需要 research agents 补事实。

## 什么时候只用其中一个

不是所有任务都需要 OpenSpec 和 Compound Engineering 一起上场。

| 只用什么 | 适合场景 |
|---|---|
| 只用 OpenSpec | 需要更新规范、归档历史或审查变更边界，但实现不在当前任务内。 |
| 只用 Compound Engineering | 低风险执行、调试、评审、知识沉淀或外部研究，不需要建立新 spec。 |

判断标准仍然是风险和事实源。如果任务会改变系统行为并影响多人协作，优先补 OpenSpec；如果只是把已经明确的任务执行好、审好、沉淀好，Compound Engineering 就足够。

## 常见误区

| 误区 | 问题 | 更好的做法 |
|---|---|---|
| 用 review 结果覆盖 spec | 评审只是发现风险，不能静默改变事实源。 | 先更新 OpenSpec artifacts，再继续实现。 |
| 把 OpenSpec 当执行脚本 | spec 说明事实和边界，不会替你调试和验证。 | 用 Compound 的 work、debug、review 承接执行。 |
| 每个任务都两者全用 | 小改动会被流程拖慢。 | 按风险选择最轻组合。 |
| 只沉淀聊天记录 | 后续 Agent 很难检索和验证。 | 用 `docs/solutions/` 或 project docs 形成长期资产。 |
| 完成实现后忘记 archive | 主事实源没有更新，历史上下文停在 change 里。 | 验证完成后回到 OpenSpec archive。 |

两者配合的目标，是让 AI 工程协作既有清晰事实源，也有高质量执行反馈，还能把经验留给下一次工作。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
- [OpenSpec](/openspec/)
