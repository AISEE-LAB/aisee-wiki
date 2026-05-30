---
title: 策略、构思与计划
permalink: /compound/strategy-brainstorm-plan/
createTime: 2026/05/30 00:00:00
---

# 策略、构思与计划

计划不是为了让 Agent 少问问题，而是为了让人和 Agent 对目标、边界、风险和验证形成同一份上下文。

在 Compound Engineering 中，定义与计划阶段要解决的不是“马上怎么改代码”，而是先判断方向是否值得做、想法是否足够清晰、需求是否可以交给后续执行，以及计划是否已经具备可验证边界。

## 核心结论

`ce-strategy`、`ce-ideate`、`ce-brainstorm` 和 `ce-plan` 可以看成一条从“方向”到“实施单元”的转化链路：

- `ce-strategy` 提供长期产品锚点，避免每次任务都重新解释目标。
- `ce-ideate` 发散并筛选想法，避免过早锁死在第一个方案。
- `ce-brainstorm` 把一个选中的想法澄清成 right-sized requirements。
- `ce-plan` 把 requirements 转成 implementation units、风险、依赖和验证方式。

这四步不是每次都要全量使用。它们的价值在于：当任务还不够清楚时，不要直接把模糊输入推给执行 Agent。

## 从模糊想法到可执行计划

<FlowExplainer
  mode="timeline"
  eyebrow="Define & Plan"
  title="定义与计划如何收敛"
  description="定义与计划阶段把方向、想法、需求和计划逐层收敛，直到后续执行者可以知道要做什么、不做什么、按什么标准验证。"
  :stages="[
    {
      id: 'strategy',
      title: '策略锚点',
      description: '先判断这件事是否符合长期方向。',
      items: [
        {
          id: 'ce-strategy',
          title: 'ce-strategy',
          description: '记录目标问题、方法、用户、关键指标和工作轨道。',
          status: 'active',
          accent: '方向',
        },
      ],
    },
    {
      id: 'ideation',
      title: '构思筛选',
      description: '先发散，再批判性地筛出值得推进的方向。',
      items: [
        {
          id: 'ce-ideate',
          title: 'ce-ideate',
          description: '生成多个候选想法，解释为什么保留或淘汰。',
          status: 'default',
          accent: '选择',
        },
      ],
    },
    {
      id: 'requirements',
      title: '需求澄清',
      description: '把一个想法说清楚，而不是把多个可能性混在一起。',
      items: [
        {
          id: 'ce-brainstorm',
          title: 'ce-brainstorm',
          description: '通过问答形成足够支撑计划的 requirements。',
          status: 'default',
          accent: '范围',
        },
      ],
    },
    {
      id: 'plan',
      title: '计划拆解',
      description: '把需求转成后续执行可以接手的工作边界。',
      items: [
        {
          id: 'ce-plan',
          title: 'ce-plan',
          description: '拆出 implementation units、依赖、风险和验证方式。',
          status: 'done',
          accent: '交付',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'ce-strategy',
      to: 'ce-ideate',
      label: '方向约束构思',
      type: 'depends',
    },
    {
      from: 'ce-ideate',
      to: 'ce-brainstorm',
      label: '选择一个想法深入',
      type: 'next',
    },
    {
      from: 'ce-brainstorm',
      to: 'ce-plan',
      label: '需求进入计划',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '方向判断',
      description: '决定是否值得推进',
    },
    {
      status: 'default',
      label: '范围澄清',
      description: '减少执行时猜测',
    },
    {
      status: 'done',
      label: '计划交付',
      description: '形成可执行边界',
    },
  ]"
/>

这条链路的核心不是产物数量，而是逐步减少不必要的猜测：先不让战略问题混进需求文档，也不让需求问题拖到实现阶段才暴露。

## `ce-strategy`：长期锚点，不是功能计划

`ce-strategy` 关注的是产品为什么存在、服务谁、如何判断成功，以及团队当前投入在哪些工作轨道。它适合在新产品、新方向或方向漂移明显时使用。

它不应该写成 backlog，也不应该把功能列表伪装成战略。好的 strategy 更像一份短而稳定的判断依据：

| 维度 | 应回答的问题 | 不应变成 |
|---|---|---|
| 目标问题 | 产品主要解决什么痛点？ | 泛泛的愿景口号。 |
| 方法 | 为什么选择这条路径？ | 所有可能功能的集合。 |
| 用户 | 谁会从中获得明确价值？ | “所有用户”这种无边界描述。 |
| 指标 | 用什么信号判断方向有效？ | 临时任务进度表。 |
| 工作轨道 | 当前集中在哪些方向投入？ | 细到 issue 级别的排期。 |

当后续进入 `ce-ideate`、`ce-brainstorm` 或 `ce-plan` 时，strategy 的作用是提供方向约束：哪些想法符合方向，哪些看似合理但会分散投入。

## `ce-ideate`：先发散，再淘汰

`ce-ideate` 的位置在 brainstorm 之前。它回答的是“哪些想法值得进一步探索”，不是“这个想法应该具体怎么做”。

这一步的价值在于把生成和批判分开：先尽量产生候选方向，再明确淘汰理由，最后只把少数幸存想法交给 brainstorm。否则团队很容易把第一个看起来可实现的方案带进计划，后面再发现它并不是最高价值路径。

可以用下面的矩阵判断一个想法是否值得进入下一步：

| 判断维度 | 好信号 | 风险信号 |
|---|---|---|
| 与策略一致 | 能清楚指向 strategy 中的目标问题或工作轨道。 | 只是“也许有用”，但和当前方向关系弱。 |
| 用户证据 | 有现有反馈、行为、痛点或可观察需求。 | 只来自内部想象，用户是谁也不明确。 |
| 复杂度 | 可以用较小范围验证核心价值。 | 一开始就要求大范围重构或长期承诺。 |
| 可学习性 | 即使失败，也能带回明确判断。 | 做完只知道“做了”，不知道学到了什么。 |

`ce-ideate` 输出的重点不是数量，而是筛选逻辑。被淘汰的想法也有价值，因为它们记录了为什么现在不做。

## `ce-brainstorm`：把一个想法说清楚

`ce-brainstorm` 处理的是选中一个方向之后，需求仍然不够清楚的阶段。它通过对话把问题、用户、范围、成功标准和非目标澄清出来。

这里最重要的边界是：brainstorm 回答 **what**，不是 **how**。它可以讨论用户行为、产品决策、验收例子和范围取舍，但不应该默认写数据库 schema、接口路径、文件结构或执行命令。

一份足够好的 requirements 至少应该让后续计划不再发明产品行为：

| Requirements 应包含 | 作用 |
|---|---|
| 问题框架 | 说明为什么值得做，以及现在的痛点是什么。 |
| 目标用户或场景 | 避免 Agent 把抽象用户需求扩写成泛化功能。 |
| 关键流程 | 说明用户或系统会经历哪些主要状态。 |
| 成功标准 | 让后续验证有判断依据。 |
| 范围边界 | 明确哪些内容不在本轮解决。 |
| 待确认问题 | 区分阻塞问题和可延后问题。 |

如果 brainstorm 产物无法回答“什么算完成”，计划阶段就会被迫补产品判断；这通常意味着定义阶段还没有收敛。

## `ce-plan`：把需求变成执行边界

`ce-plan` 的职责是回答 **how**：如何拆解、依赖哪些现有模式、风险在哪里、需要哪些测试或检查，以及执行顺序是什么。

好的 plan 不只是任务列表。它应该让执行者知道：

- 每个 implementation unit 解决哪个需求。
- 哪些文件、模块或边界可能受影响。
- 哪些设计决策已经确定，为什么这样选。
- 哪些风险需要先验证。
- 哪些测试、构建、浏览器检查或人工审查能支撑完成判断。

可以把 plan 看成 requirements 和执行之间的契约。

| Plan 内容 | 它防止的问题 |
|---|---|
| Scope boundary | 执行时顺手扩大范围。 |
| Implementation units | 大任务混成一团，无法分段验证。 |
| Dependencies | 后续才发现前置条件缺失。 |
| Risk notes | 明知有风险却没有缓解动作。 |
| Verification | 只看 diff，不知道是否满足要求。 |
| Handoff notes | 下一个 Agent 或人接手时重新猜上下文。 |

如果计划里只有“实现 A、实现 B、测试一下”，它还不够支撑稳定执行。计划应该暴露判断，而不是把判断留给执行阶段临场补。

## 与 OpenSpec 的衔接边界

Compound Engineering 的定义与计划阶段和 OpenSpec 很容易组合，但二者职责不同。

| 内容 | Compound Engineering 定义与计划 | OpenSpec artifacts |
|---|---|---|
| 方向判断 | strategy 和 ideation 判断是否值得推进。 | 通常不承担长期产品战略。 |
| 需求澄清 | brainstorm 形成 right-sized requirements。 | `proposal.md` 说明为什么做、做什么、不做什么。 |
| 行为约束 | requirements 说明用户行为和成功标准。 | delta specs 描述正式行为变化和验收场景。 |
| 技术计划 | plan 拆 implementation units、风险和验证。 | `design.md` 和 `tasks.md` 记录方案、任务与验证。 |
| 执行依据 | 给 `ce-work`、review 或人工实现提供上下文。 | 作为项目内 change 的规范事实源。 |

在本站项目里，如果一次工作会改变稳定行为、站点结构、公开内容边界或后续维护规则，应优先落到 OpenSpec change 中。Compound Engineering 的 brainstorm 和 plan 可以作为前置输入，但不能替代已经生效的 OpenSpec artifacts。

## 什么时候不需要完整定义链路

不是每个任务都需要 strategy、ideation、brainstorm、plan 全部走一遍。

| 任务状态 | 更合适的做法 |
|---|---|
| 只是文案 typo 或小范围格式修正 | 直接修改并验证，不需要完整定义链路。 |
| 方向清楚，但需求含糊 | 跳过 strategy，从 brainstorm 开始。 |
| 需求清楚，但实现复杂 | 直接进入 plan。 |
| 有明确 OpenSpec change | 以 OpenSpec artifacts 为事实源，必要时补 plan 细节。 |
| 产品方向已经漂移 | 回到 strategy，不要用 plan 掩盖方向问题。 |
| 想法很多但不知道选哪个 | 先 ideate，再选一个进入 brainstorm。 |

定义链路的目的不是增加仪式感，而是在最便宜的时候发现错误。如果问题是方向错了，越早发现越便宜；如果只是实现细节不清，计划阶段解决就够了。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
