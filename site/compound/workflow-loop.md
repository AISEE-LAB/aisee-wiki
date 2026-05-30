---
title: 工程复利核心循环
permalink: /compound/workflow-loop/
createTime: 2026/05/30 00:00:00
---

# 工程复利核心循环

Compound Engineering 的主线不是“从 prompt 到代码”的直线，而是从上游方向到用户结果的闭环。

这条闭环先回答为什么做、做什么、如何拆解，再进入执行、调试、评审和优化。任务结束后，它还会把解决过程写成可搜索知识，并用产品和工程结果反过来校准下一轮工作。

## 核心结论

如果一次 AI Coding 只把当前 diff 改完，它的价值很容易停在这次提交里。Compound Engineering 希望每次工程工作都留下下一次可以复用的东西：策略锚点、需求判断、计划边界、评审发现、调试路径、解决方案文档和结果信号。

官方 README 把 `ce-strategy` 到 `ce-product-pulse` 放在 Core Workflow 中：`ce-strategy` 作为上游锚点，`ce-product-pulse` 用用户结果和产品表现收口。中间的 skills 不是必须每次全量调用，而是按任务风险截取使用。

## 闭环总览

<FlowExplainer
  mode="timeline"
  eyebrow="Core Workflow"
  title="从方向到结果反馈"
  description="Compound Engineering 的核心循环把策略、构思、需求、计划、执行、质量、知识和结果反馈串成一条可回流的工程链路。"
  :stages="[
    {
      id: 'upstream',
      title: '上游定义',
      description: '先让方向和问题可判断。',
      items: [
        {
          id: 'strategy',
          title: 'ce-strategy',
          description: '沉淀产品目标、用户、指标和工作轨道。',
          status: 'active',
          accent: '方向',
        },
        {
          id: 'ideate',
          title: 'ce-ideate',
          description: '发散并筛选值得继续推进的想法。',
          status: 'default',
          accent: '构思',
        },
      ],
    },
    {
      id: 'planning',
      title: '需求到计划',
      description: '把模糊意图变成可执行边界。',
      items: [
        {
          id: 'brainstorm',
          title: 'ce-brainstorm',
          description: '通过问答形成 right-sized requirements。',
          status: 'default',
          accent: '澄清',
        },
        {
          id: 'plan',
          title: 'ce-plan',
          description: '拆出任务、风险、验证方式和执行顺序。',
          status: 'default',
          accent: '计划',
        },
      ],
    },
    {
      id: 'delivery',
      title: '执行质量',
      description: '把计划变成可验证结果。',
      items: [
        {
          id: 'work',
          title: 'ce-work',
          description: '按计划推进实现，并保持验证节奏。',
          status: 'risk',
          accent: '执行',
        },
        {
          id: 'review-debug',
          title: 'ce-code-review / ce-debug',
          description: '用评审找风险，用调试找根因。',
          status: 'risk',
          accent: '质量',
        },
        {
          id: 'optimize',
          title: 'ce-simplify-code / ce-optimize',
          description: '在行为成立后收敛复杂度或迭代指标。',
          status: 'risk',
          accent: '改进',
        },
      ],
    },
    {
      id: 'learning',
      title: '沉淀反馈',
      description: '把一次工作变成下一次的上下文。',
      items: [
        {
          id: 'compound',
          title: 'ce-compound',
          description: '把刚解决的问题写成结构化团队知识。',
          status: 'done',
          accent: '知识',
        },
        {
          id: 'pulse',
          title: 'ce-product-pulse',
          description: '回看用户体验、质量信号、错误和后续动作。',
          status: 'done',
          accent: '结果',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'strategy',
      to: 'brainstorm',
      label: '方向约束需求',
      type: 'depends',
    },
    {
      from: 'brainstorm',
      to: 'plan',
      label: '需求转为计划',
      type: 'next',
    },
    {
      from: 'plan',
      to: 'work',
      label: '计划进入执行',
      type: 'next',
    },
    {
      from: 'work',
      to: 'review-debug',
      label: '结果接受检查',
      type: 'depends',
    },
    {
      from: 'review-debug',
      to: 'compound',
      label: '经验沉淀',
      type: 'next',
    },
    {
      from: 'pulse',
      to: 'strategy',
      label: '结果反哺方向',
      type: 'feedback',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '方向层',
      description: '决定是否值得做',
    },
    {
      status: 'risk',
      label: '交付层',
      description: '处理实现和质量风险',
    },
    {
      status: 'done',
      label: '复利层',
      description: '沉淀知识和结果信号',
    },
  ]"
/>

这张图里的箭头不是强制流程。它表达的是：一次工程工作最好不要只停在“生成代码”，而要能回到更高层的问题，也能继续流向后续的知识和结果反馈。

## 上游定义：先回答方向问题

`ce-strategy` 的作用是建立长期锚点。它关心产品正在解决什么问题、面向谁、关键指标是什么、当前有哪些工作轨道。没有这个锚点，Agent 很容易把局部任务做对，却把整体方向做偏。

`ce-ideate` 适合放在更早的位置。它不是直接写实现方案，而是先发散可选方向，再批判性地筛出值得推进的想法。对复杂功能来说，这一步可以避免过早进入某个看似顺手、但价值不够明确的方案。

## 需求到计划：把模糊意图变成可执行边界

`ce-brainstorm` 处理的是需求尚不清楚的阶段。它通过互动问答把背景、用户、约束、非目标和验收方式整理出来，形成“刚好够用”的需求文档。

`ce-plan` 则把需求转成可执行计划。好的计划不只是任务列表，还应该说明实施单元、依赖关系、风险、验证方式和完成标准。这样人和 Agent 才能在同一份上下文里协作。

这一步和 OpenSpec 很容易配合：如果任务需要正式变更边界，可以把 brainstorm 和 plan 的产物转成 proposal、design、specs 和 tasks；如果只是轻量任务，也可以只保留足够清晰的计划。

## 执行质量：执行、调试、评审不是一件事

`ce-work` 关注把计划落成变更。它的重点是按步骤推进、保持上下文、运行验证，并在发现计划不成立时及时回到上游修正。

`ce-debug` 和 `ce-code-review` 处理的是两类不同风险：

| 能力 | 主要问题 | 典型输出 |
|---|---|---|
| `ce-debug` | 为什么出现这个错误，真正根因是什么。 | 复现路径、假设、证据、根因、修复和回归验证。 |
| `ce-code-review` | 这组变更是否还有遗漏风险。 | correctness、security、testing、maintainability 等维度的 findings。 |

`ce-simplify-code` 和 `ce-optimize` 通常更靠后。前者适合在行为成立后收敛复杂度、减少不必要抽象；后者适合有明确指标时做迭代优化。它们不应该替代基础验证，也不应该把未确认的目标包装成优化任务。

## 沉淀反馈：让这次工作服务下一次

`ce-compound` 适合在问题刚解决、上下文还新鲜时使用。它把症状、错误尝试、根因、修复、验证和预防方式写成结构化知识，让后续任务可以先搜索已有经验。

`ce-compound-refresh` 负责处理知识漂移。随着代码、架构、依赖和团队约定变化，旧 solution 可能过期、重复或不再准确；refresh 的意义就是让知识库继续可信。

`ce-product-pulse` 则从结果侧回看：用户实际经历了什么，质量、错误、使用和后续事项有什么信号。这个反馈不只属于产品复盘，也会影响下一轮 strategy、plan 和 engineering focus。

## 什么时候只截取一段

完整闭环适合高风险或高复用价值的工作，但不是所有任务都需要走满。

| 场景 | 推荐截取 |
|---|---|
| 方向不清、价值不明 | 从 `ce-strategy` 或 `ce-ideate` 开始。 |
| 想法明确，但边界和验收不清 | 使用 `ce-brainstorm` 和 `ce-plan`。 |
| 已有计划，需要稳定交付 | 从 `ce-work` 进入，并保留验证记录。 |
| 出现难复现 bug | 进入 `ce-debug`，先找根因再修复。 |
| 变更影响关键路径或跨模块 | 加上 `ce-code-review` 或更完整的多智能体评审。 |
| 问题未来可能复现 | 完成后使用 `ce-compound` 沉淀知识。 |
| 已上线，需要看结果 | 用 `ce-product-pulse` 回看用户和质量信号。 |

真正的判断标准不是命令数量，而是这次工作有哪些风险、哪些上下文未来值得复用。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
