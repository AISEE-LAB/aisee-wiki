---
title: Compound Engineering 是什么
permalink: /compound/what-is-compound-engineering/
createTime: 2026/05/30 00:00:00
---

# Compound Engineering 是什么

Compound Engineering 是一种把 AI 工程工作变成可复用资产的协作方法。它关注的不是“这次 Agent 有没有把代码写出来”，而是这次工作结束后，团队是否留下了更清晰的策略、计划、评审经验、调试路径、解决方案文档和结果反馈。

换句话说，Compound Engineering 试图让工程工作产生复利：第一次解决问题时会投入更多上下文整理和验证成本，但这些成本不会一次性消失，而会沉淀为后续任务可以继续使用的知识、流程和判断依据。

## 核心结论

Compound Engineering 不是某一个命令，也不是单纯的代码生成工具集合。它更像一条工程链路：先把方向和问题定义清楚，再让 Agent 按计划执行，随后用多视角评审降低风险，最后把解决过程沉淀为团队知识。

官方 README 中的 `compound-engineering-plugin` 是这套方法在 AI coding agent 场景里的工具化实现。它提供一组 skills 和 agents，覆盖策略、构思、需求澄清、计划、执行、调试、评审、知识沉淀、结果回看等环节。

## 层级关系

理解 Compound Engineering 时，先把几个容易混在一起的概念分开。

<FlowExplainer
  mode="timeline"
  eyebrow="Compound Engineering"
  title="从方法论到一次命令"
  description="Compound Engineering 是方法论，插件是工具化实现，skill 和 agent 是具体能力，命令只是触发其中一个能力的入口。"
  :stages="[
    {
      id: 'method',
      title: '方法论',
      description: '定义工程复利的工作方式。',
      items: [
        {
          id: 'compound-engineering',
          title: 'Compound Engineering',
          description: '把策略、计划、执行、评审、知识沉淀和结果回看组织成闭环。',
          status: 'active',
          accent: '协作系统',
        },
      ],
    },
    {
      id: 'plugin',
      title: '工具实现',
      description: '把方法论落到 agent 可执行能力中。',
      items: [
        {
          id: 'plugin-node',
          title: 'compound-engineering-plugin',
          description: '提供 skills、agents、工作流入口和协作约定。',
          status: 'default',
          accent: '工具集',
        },
      ],
    },
    {
      id: 'capability',
      title: '能力单元',
      description: '围绕不同任务阶段拆分能力。',
      items: [
        {
          id: 'skills',
          title: 'skills',
          description: '例如 strategy、brainstorm、plan、work、debug、review、compound。',
          status: 'default',
          accent: '可触发流程',
        },
        {
          id: 'agents',
          title: 'agents',
          description: '例如 reviewer、document reviewer、researcher、design reviewer。',
          status: 'risk',
          accent: '专业视角',
        },
      ],
    },
    {
      id: 'command',
      title: '命令入口',
      description: '一次具体调用只覆盖链路中的一段。',
      items: [
        {
          id: 'ce-compound',
          title: '/ce-compound',
          description: '把刚解决的问题写成结构化知识，属于知识沉淀环节。',
          status: 'done',
          accent: '沉淀命令',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'compound-engineering',
      to: 'plugin-node',
      label: '方法论被工具化',
      type: 'next',
    },
    {
      from: 'plugin-node',
      to: 'skills',
      label: '插件提供技能入口',
      type: 'depends',
    },
    {
      from: 'skills',
      to: 'ce-compound',
      label: '命令触发具体环节',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '方法层',
      description: '决定工作方式',
    },
    {
      status: 'risk',
      label: '审查层',
      description: '降低遗漏风险',
    },
    {
      status: 'done',
      label: '沉淀层',
      description: '形成可复用知识',
    },
  ]"
/>

这也是为什么本站使用 “Compound Engineering” 作为栏目名，而不是直接把栏目叫做 `/ce-compound`。后者只是知识沉淀入口；前者覆盖完整工程协作链路。

## 复利发生在哪里

工程复利不是一句口号。它至少体现在四类资产上。

| 资产 | 具体留下什么 | 下次如何复用 |
|---|---|---|
| 策略资产 | 产品目标、用户、指标、工作轨道、取舍原则。 | 新任务不必重新解释方向，可以直接判断是否偏离目标。 |
| 计划资产 | 需求澄清、边界、风险、实施单元、验证方式。 | Agent 和人都能基于同一份计划继续执行或审查。 |
| 评审资产 | correctness、security、design、scope、testing 等维度的发现。 | 后续类似变更可以提前检查同类风险。 |
| 知识资产 | 问题、症状、根因、解决方案、预防方式。 | 下次遇到相似问题时，可以先搜索已有 solution，而不是重新摸索。 |

如果一次工作只交付了代码，但没有留下任何上下文、判断和可复用知识，它就没有产生多少复利。相反，如果一次修复让后续同类问题更快定位、更少返工、更容易 review，它就是 Compound Engineering 想要的结果。

## 它和普通 AI Coding 有什么不同

普通 AI Coding 很容易变成一次性协作：用户描述需求，Agent 修改代码，构建通过后结束。这个过程可以很快，但长期看会丢掉很多信息。

Compound Engineering 更强调任务前后都有结构化动作：

| 对比点 | 一次性 AI Coding | Compound Engineering |
|---|---|---|
| 起点 | 直接让 Agent 改代码。 | 先确认目标、上下文、范围和验证方式。 |
| 执行 | 关注当前 diff 能否工作。 | 关注计划、执行、调试和验证是否形成闭环。 |
| 评审 | 主要依赖一个人或一个 Agent 看结果。 | 按风险维度引入多视角评审。 |
| 结束 | 合并代码或完成任务。 | 把关键经验沉淀到知识库，并用结果信号反哺后续工作。 |
| 长期价值 | 聊天记录和 diff 很快失去上下文。 | 策略、计划、评审和 solution 可以继续被检索和复用。 |

这并不意味着所有任务都要变复杂。低风险文案、小范围样式、明确的 typo 修复，不需要完整链路。Compound Engineering 更适合那些会改变行为、牵涉多个模块、需要多人审查，或未来很可能重复出现的问题。

## `/ce-compound` 在哪里

`/ce-compound` 的位置在“知识沉淀”阶段。它适合在一个问题刚被解决、上下文还新鲜时使用，把解决过程整理成结构化文档。

它通常回答这些问题：

- 问题是什么，用户或开发者能观察到什么症状。
- 哪些尝试没有奏效，为什么。
- 真正的根因是什么。
- 最终怎么修复，为什么这个方案有效。
- 以后如何预防、如何测试、如何搜索到这条经验。

因此，`/ce-compound` 很重要，但它不是 Compound Engineering 的全部。没有上游的策略和计划，没有执行过程的验证，没有评审阶段的风险发现，知识沉淀也会缺少可信来源。

## 什么时候值得使用

可以用下面几个问题判断是否值得采用更完整的 Compound Engineering 链路：

- 这次工作是否会影响用户关键路径、数据、安全、权限、性能或发布稳定性？
- 是否需要把模糊想法先变成可执行计划？
- 是否需要多个专业视角审查，而不是只看“代码能不能跑”？
- 这类问题未来是否还会出现，是否值得写成可搜索知识？
- 如果几周后回看，只看最终 diff 是否不足以解释当时的判断？

如果多个问题的答案是“是”，就值得把这次工作纳入 Compound Engineering 的方式来处理。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)

