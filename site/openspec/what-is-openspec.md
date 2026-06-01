---
title: OpenSpec 是什么
permalink: /openspec/what-is-openspec/
createTime: 2026/05/28 00:00:00
---

# OpenSpec 是什么

OpenSpec 是一种轻量级 spec-driven development framework，面向人和 AI coding assistants 的协作。它把变更意图、行为约束、设计判断和执行任务放进仓库里的结构化文件，让代码实现之前先有可审查的规范层。

这篇先回答一个基础问题：为什么在 AI 可以直接写代码的时代，还需要 OpenSpec 这样的规范层？

## 核心结论

OpenSpec 的核心价值不是“多写几份文档”，而是把 AI 协作中的临时上下文变成工程事实。

在没有规范层时，一次 AI Coding 任务通常依赖聊天记录、用户口头补充、Agent 当前记忆和最终代码 diff。它可以很快，但不稳定：目标容易漂移，边界容易遗失，后来的人很难知道为什么这么改。

OpenSpec 提供的是另一种工作方式：

- 当前系统行为放在 `openspec/specs/`，作为事实源。
- 待实施变更放在 `openspec/changes/`，作为独立工作空间。
- 每个 change 用 proposal、spec、design、tasks 等 artifacts 记录为什么改、改什么、怎么做、怎么验收。
- 完成后 archive，既更新当前 specs，也保留历史上下文。

因此，OpenSpec 更像是 AI Engineering 中的“规范层”，而不是传统意义上的需求文档库。

## 为什么聊天记录不够

AI Coding 的入口经常是一句话：

```text
帮我加一个导出功能。
```

这句话对人来说可能够用，因为人会主动追问、判断上下文、记住隐含约束。但 Agent 进入项目后会做更多动作：读文件、改代码、运行命令、修复报错、继续推断下一步。如果目标、边界和验收标准只存在于聊天里，几个风险会迅速放大。

| 风险 | 表现 |
|---|---|
| 目标漂移 | 一开始只想加导出按钮，最后顺手改了权限、接口和 UI 结构。 |
| 边界缺失 | Agent 不知道哪些模块不能碰，哪些行为必须保持兼容。 |
| 验收模糊 | 代码能跑不代表行为正确，也不代表满足原始意图。 |
| 历史不可追踪 | 几周后只能看到 diff，很难理解当时为什么这样设计。 |

OpenSpec 要解决的就是这些“不在代码里、但决定代码是否正确”的问题。

## 规范层在哪里

OpenSpec 位于临时意图和代码实现之间。它把模糊输入整理成可审查的 artifacts，再让实现和验证回到这些 artifacts 上。

<FlowExplainer
  mode="timeline"
  eyebrow="Spec layer"
  title="从临时意图到工程事实"
  description="OpenSpec 不替代聊天、代码或测试，而是在它们之间建立一层可审查、可归档的规范事实。"
  :stages="[
    {
      id: 'intent',
      title: '临时意图',
      description: '需求最初可能来自聊天、Issue、会议或临时想法。',
      items: [
        {
          id: 'chat',
          title: 'chat / issue',
          description: '表达目标，但通常缺少完整边界和验收标准。',
          status: 'risk',
          accent: '上下文易丢失',
        },
      ],
    },
    {
      id: 'spec-layer',
      title: '规范层',
      description: 'OpenSpec 把意图整理成可审查 artifacts。',
      items: [
        {
          id: 'proposal',
          title: 'proposal',
          description: '说明为什么做、改什么、不改什么。',
          status: 'active',
          accent: '意图与范围',
        },
        {
          id: 'spec-design-tasks',
          title: 'spec / design / tasks',
          description: '分别约束行为变化、技术判断和执行步骤。',
          status: 'active',
          accent: '规范事实',
        },
      ],
    },
    {
      id: 'implementation',
      title: '实现验证',
      description: '代码实现必须回到规范层检查。',
      items: [
        {
          id: 'code',
          title: 'code / tests',
          description: '修改代码、配置、文档，并通过测试、构建或人工审查验证。',
          status: 'default',
          accent: '工程反馈',
        },
      ],
    },
    {
      id: 'history',
      title: '事实沉淀',
      description: '完成后更新当前事实源，保留历史上下文。',
      items: [
        {
          id: 'specs-archive',
          title: 'specs / archive',
          description: '主 specs 记录当前行为，archive 保留当次变更的原因和过程。',
          status: 'done',
          accent: '长期资产',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'chat',
      to: 'proposal',
      label: '临时意图进入可审查规范',
      type: 'depends',
    },
    {
      from: 'spec-design-tasks',
      to: 'code',
      label: '规范约束实现和验证',
      type: 'gate',
    },
    {
      from: 'code',
      to: 'specs-archive',
      label: '验证通过后沉淀事实源',
      type: 'feedback',
    },
  ]"
  :legend="[
    {
      status: 'risk',
      label: '易漂移',
      description: '需要转成明确规范',
    },
    {
      status: 'active',
      label: '规范层',
      description: '人和 AI 共同审查',
    },
    {
      status: 'done',
      label: '长期事实',
      description: '服务后续变更',
    },
  ]"
/>

这张图表达的是职责位置：聊天负责提出意图，OpenSpec 负责形成规范，代码和测试负责实现反馈，archive 负责保留历史。

## OpenSpec 不是什么

理解 OpenSpec 时，先排除几个常见误解。

### 不是更长的 prompt

Prompt 仍然是一次对话输入。OpenSpec artifacts 是仓库中的工程文件，可以被 review、修改、提交、归档，也可以被后续任务继续读取。它们不是为了让一句提示词更复杂，而是为了让项目事实更稳定。

### 不是传统大需求文档

OpenSpec 不要求把所有业务背景、访谈记录、竞品分析和产品叙事都写进 spec。OpenSpec spec 更关注可验证行为：系统应该做什么、边界是什么、异常如何处理、哪些约束不能破坏。

### 不是代码质量工具

OpenSpec 可以说明行为和验收标准，但不能替代测试、代码评审、安全审查、性能分析和发布门禁。它让“应该验证什么”更清楚，不负责自动证明“实现一定正确”。

### 不是所有任务都要用的仪式

如果只是修一个错别字、改一个无行为影响的文案、调整一个低风险局部样式，直接修改可能更合适。OpenSpec 的投入应该和变更风险、协作复杂度、历史价值成比例。

## 它和传统开发流程有什么不同

OpenSpec 不是把瀑布流程搬到 AI Coding 中。官方文档强调的是 fluid、iterative 和 brownfield fit：artifact 有依赖关系，但不是把人锁在某个阶段里；实现过程中发现问题，可以回头修改 proposal、spec、design 或 tasks。

更重要的是，OpenSpec 特别适合已有项目。很多 AI Coding 任务不是从零构建新系统，而是在已有代码、已有行为、已有约束中修改一部分能力。这个时候，最关键的不是“生成一份漂亮方案”，而是说明当前行为是什么、这次变化是什么、哪些行为不应该被破坏。

## 什么时候值得使用

可以用下面几个问题判断是否需要 OpenSpec：

- 这次变更是否会改变用户可观察行为、接口契约、权限、安全边界或数据流？
- 是否需要多人、多个 Agent 或多个上下文窗口参与？
- 是否需要先讨论方案，再开始修改代码？
- 如果几周后回看，只看代码 diff 是否无法解释当时的目标和取舍？
- 这次变更是否需要归档为团队后续判断的依据？

如果答案中有多个“是”，就值得创建一个 OpenSpec change。

## 常见误区

| 误区 | 更准确的理解 |
|---|---|
| OpenSpec 会拖慢 AI Coding | 它会增加前置表达，但减少返工、误改和审查成本。 |
| spec 写得越详细越好 | spec 应聚焦可验证行为，技术细节应放到 design 或 tasks。 |
| 有了 OpenSpec 就不用测试 | OpenSpec 定义预期，测试和审查验证实现。 |
| 只有大团队才需要 | 个人项目也会遇到上下文丢失和历史难追踪，只是使用粒度可以更轻。 |

## 下一步阅读

读完这篇后，可以回到 [OpenSpec 总览](/openspec/) 对照整体学习路线。下一篇会展开 OpenSpec 的心智模型：`specs`、`changes`、artifacts 和 archive 到底如何配合。

## 参考资料

- [OpenSpec GitHub 仓库](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
- [OpenSpec Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
- [OpenSpec conventions spec](https://github.com/Fission-AI/OpenSpec/blob/main/openspec/specs/openspec-conventions/spec.md)
