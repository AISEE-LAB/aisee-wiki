---
title: 多智能体评审是什么
permalink: /compound/multi-agent-review/
createTime: 2026/05/30 00:00:00
---

# 多智能体评审是什么

多智能体评审的价值不是“让更多 AI 多说几遍”，而是把注意力按风险维度分配给不同 reviewer，再由主流程合并、去重、筛掉低置信噪声，最后形成可执行的发现。

如果没有分工和综合，多智能体只会制造更多文本。真正有用的多智能体评审需要回答三个问题：谁看什么，发现如何合并，哪些结论必须回到人和项目事实源。

## 核心结论

单个 Agent review 容易把注意力集中在少数显眼问题上。例如它可能抓住一个边界条件，却漏掉测试断言太弱；也可能指出代码复杂度，却没有意识到权限边界被放宽。

Compound Engineering 的多智能体评审把 review 拆成多个专业视角。代码评审可以有 correctness、testing、security、performance、maintainability、project standards 等 reviewer；文档评审可以关注 coherence、feasibility、scope、security、product 或 adversarial 视角；设计与 UI 评审还会关注设计决策、交互状态、实现对齐和视觉质量。

这不是为了让所有 Agent 都给意见，而是让每个 Agent 只对自己擅长的风险负责。

## 基本模型

<FlowExplainer
  mode="timeline"
  eyebrow="Multi-agent Review"
  title="同一份变更，多种风险视角"
  description="多智能体评审先确定审查对象，再分派给不同 reviewer，并把结果经过置信度、去重和人工判断后变成可执行结论。"
  :stages="[
    {
      id: 'scope',
      title: '确定对象',
      description: '先明确评审的是 diff、计划、文档、设计稿还是 UI 实现。',
      items: [
        {
          id: 'review-target',
          title: 'review target',
          description: '同一个对象进入多个风险视角，而不是每个 Agent 自己猜范围。',
          status: 'active',
          accent: '范围',
        },
      ],
    },
    {
      id: 'dispatch',
      title: '并行视角',
      description: '按风险类型选择 reviewer。',
      items: [
        {
          id: 'code-reviewers',
          title: 'code reviewers',
          description: '检查 correctness、testing、security、maintainability 等代码风险。',
          status: 'risk',
          accent: '代码',
        },
        {
          id: 'doc-reviewers',
          title: 'document reviewers',
          description: '检查 plan、proposal、spec、requirements 中的矛盾和缺口。',
          status: 'risk',
          accent: '文档',
        },
        {
          id: 'design-reviewers',
          title: 'design / UI reviewers',
          description: '检查设计决策、交互状态、实现对齐和视觉质量。',
          status: 'risk',
          accent: '设计',
        },
      ],
    },
    {
      id: 'merge',
      title: '综合发现',
      description: '把多个 reviewer 的输出转成一份可执行结果。',
      items: [
        {
          id: 'dedup',
          title: 'dedup + confidence gate',
          description: '合并重复发现，过滤证据不足或低置信结论。',
          status: 'default',
          accent: '筛选',
        },
        {
          id: 'synthesis',
          title: 'final synthesis',
          description: '按严重度、责任归属和下一步动作整理输出。',
          status: 'done',
          accent: '结论',
        },
      ],
    },
    {
      id: 'decision',
      title: '人工判断',
      description: '把需要产品、架构、安全或发布取舍的结论交回人。',
      items: [
        {
          id: 'human-gate',
          title: 'human decision gate',
          description: '项目事实源和人工决策优先于 Agent 推断。',
          status: 'done',
          accent: '门禁',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'review-target',
      to: 'code-reviewers',
      label: '同一对象分派视角',
      type: 'depends',
    },
    {
      from: 'review-target',
      to: 'doc-reviewers',
      label: '按对象选择 reviewer',
      type: 'depends',
    },
    {
      from: 'review-target',
      to: 'design-reviewers',
      label: 'UI 任务加入设计视角',
      type: 'depends',
    },
    {
      from: 'code-reviewers',
      to: 'dedup',
      label: '提交 findings',
      type: 'next',
    },
    {
      from: 'dedup',
      to: 'synthesis',
      label: '合并成报告',
      type: 'next',
    },
    {
      from: 'synthesis',
      to: 'human-gate',
      label: '需要判断时交回人',
      type: 'gate',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '范围',
      description: '先明确审查对象',
    },
    {
      status: 'risk',
      label: '风险视角',
      description: '不同 reviewer 看不同风险',
    },
    {
      status: 'done',
      label: '结论',
      description: '综合后进入行动',
    },
  ]"
/>

这张图里的重点是“同一个对象进入多个视角”。如果每个 Agent 都按自己的理解重新定义范围，最后合并出来的就不是评审，而是一组互相不对齐的评论。

## 单 Agent 容易漏什么

单 Agent review 最大的问题不是能力差，而是注意力有限。一次 diff、一个 plan 或一份 spec 里可能同时存在行为、测试、安全、性能、范围、可维护性和设计体验风险。一个视角很难稳定覆盖所有维度。

| 容易遗漏的风险 | 为什么会漏 |
|---|---|
| 行为边界 | Agent 盯住主路径后，容易忽略空状态、错误状态、权限状态和并发状态。 |
| 测试质量 | 有测试不等于测试有效，弱断言和只测实现细节很容易被忽略。 |
| 安全和数据 | 权限、输入、数据暴露、迁移和回滚风险不一定出现在代码最显眼处。 |
| 范围漂移 | 实现顺手改了相邻行为，但 review 只看“能不能工作”。 |
| 可维护性 | 新抽象、重复逻辑和耦合问题短期不报错，长期才变贵。 |
| UI 体验 | 页面能渲染不等于交互状态、视觉层次和设计对齐都成立。 |
| 文档矛盾 | proposal、plan、spec 之间的冲突，代码 review 阶段才发现就太晚。 |

多智能体评审的目标，就是把这些“容易漏”的风险提前分配给对应视角。

## 多 persona 如何拆分注意力

Reviewer persona 不是职位，也不是一组漂亮名字。它应该代表一个清晰的风险责任。

| Persona 类型 | 主要看什么 | 不负责什么 |
|---|---|---|
| Correctness | 行为是否正确，边界和状态是否覆盖。 | 不评价产品方向是否值得做。 |
| Testing | 是否有足够测试证明关键行为。 | 不用测试数量替代测试质量。 |
| Security | 权限、输入、数据暴露和敏感边界。 | 不把所有代码风格问题都包装成安全问题。 |
| Maintainability | 复杂度、重复、命名、耦合和抽象边界。 | 不为了“更优雅”改变已确认行为。 |
| Document Review | proposal、plan、spec 是否自洽、可执行、范围清楚。 | 不替代业务负责人确认取舍。 |
| Design / UI Review | 设计决策、交互状态、Figma 对齐、低质量生成痕迹。 | 不把个人审美当成产品事实。 |
| Research | 补仓库、历史、issue、知识库或外部事实。 | 不把检索结果直接当最终判断。 |

后续文章会分别展开代码 reviewer personas、文档评审、设计/UI 评审和 research agents。这里先建立关系：它们不是彼此替代，而是围绕同一个变更对象补足不同证据。

## 并行审查之后必须综合

多智能体评审不能停在“每个 Agent 各写一段”。真正有价值的是综合阶段。

综合阶段至少要做四件事：

| 步骤 | 目的 |
|---|---|
| 去重 | 多个 reviewer 可能发现同一个根因，最终报告不应重复轰炸读者。 |
| 置信度过滤 | 没有证据、只靠猜测或无法定位的发现，不应和高置信问题放在同一层级。 |
| 严重度排序 | 先处理会导致破坏、安全、数据、生产或关键路径风险的问题。 |
| 行动归属 | 区分可以自动修、需要开发者修、需要产品/设计/安全人工判断的事项。 |

这里的综合者很重要。它不只是摘要器，而是风险协调者：要知道哪些发现互相重复，哪些是同一根因的不同表现，哪些虽然合理但超出了本次范围。

## 哪些任务值得使用

多智能体评审有成本。它适合用在风险和复用价值高的任务上，而不是每个 typo 都拉满流程。

| 任务类型 | 建议 |
|---|---|
| 跨模块行为变更 | 值得使用多视角代码 review。 |
| 权限、安全、支付、数据迁移 | 应加入 security、data、reliability 等专业视角。 |
| Proposal、plan、spec 仍有不确定性 | 在实现前做文档评审。 |
| UI 页面、设计系统、Figma 对齐 | 加入设计与 UI 评审视角。 |
| 涉及历史背景或组织决策 | 先让 research agents 补上下文。 |
| 小文案、局部样式、明确 typo | 通常不需要完整多智能体评审。 |

选择多智能体评审时，关键不是“越多越好”，而是“风险是否需要不同视角”。多余的 reviewer 会增加噪声，缺少关键 reviewer 会留下盲区。

## 人和事实源仍然优先

多智能体评审不能替代项目事实源。对于本站这样的 OpenSpec 驱动项目，`proposal.md`、delta specs、`design.md`、`tasks.md` 和项目规则仍然是判断依据。Reviewer 的发现如果和事实源冲突，不能直接改代码，而应先标记冲突并回到对应 artifact。

同样，以下判断必须交给人或项目规则：

- 产品方向和范围取舍。
- 安全、隐私、合规和发布风险的最终接受。
- 品牌、设计系统和用户体验标准。
- 组织上下文、历史承诺和团队优先级。
- 是否为了短期交付接受某个残余风险。

多智能体评审最好的位置，是把风险更早、更清楚地摆到人面前，而不是替人做所有决定。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
