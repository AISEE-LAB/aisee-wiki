---
title: 多智能体如何协作
permalink: /compound/agent-orchestration/
createTime: 2026/05/30 00:00:00
---

# 多智能体如何协作

多智能体协作不是把更多 Agent 叫来一起说话。它真正解决的问题是：如何把同一项工程任务拆给合适的 reviewer、researcher 或 fixer，再把它们的输出过滤成少量可行动结论。

如果没有编排层，多智能体只会制造噪声：重复发现、低置信建议、互相矛盾的判断、无法落地的“最佳实践”，以及没人负责的后续动作。

## 核心结论

Compound Engineering 的多智能体协作可以看成一条流水线：

1. Orchestrator 先确定任务类型、范围、意图和事实源。
2. Dispatcher 按风险选择合适的 agents，而不是把所有 agents 全部派出去。
3. Parallel agents 各自按专业视角返回结构化发现或研究摘要。
4. Synthesis 层做 schema 校验、置信度门禁、去重、交叉印证、冲突处理和排序。
5. Routing 层把结论分成可自动修、需确认、需人工判断、只作提示等不同后续动作。
6. Human decision gate 负责产品取舍、范围变更、风险接受和事实源冲突。

这条链路的目标不是“AI 自己决定一切”，而是让人看到经过筛选、可追溯、可执行的结论。

## 协作链路

<FlowExplainer
  mode="timeline"
  eyebrow="Agent Orchestration"
  title="从任务输入到可执行结论"
  description="多智能体协作需要先定范围，再按风险选择 agents，随后把并行输出经过置信度、去重、冲突和路由处理，最后交给人工决策或自动修复。"
  :stages="[
    {
      id: 'scope',
      title: '确定范围',
      description: '先知道要评审什么、为什么改、哪些事实源有效。',
      items: [
        {
          id: 'orchestrator',
          title: 'orchestrator',
          description: '解析 diff、document、plan、PR 元数据、任务意图和约束。',
          status: 'active',
          accent: '范围',
        },
      ],
    },
    {
      id: 'dispatch',
      title: '选择团队',
      description: '按任务风险选择 always-on 和 conditional agents。',
      items: [
        {
          id: 'dispatcher',
          title: 'dispatcher',
          description: '选择 reviewer、document reviewer、researcher、design agent 或 workflow agent。',
          status: 'default',
          accent: '分派',
        },
        {
          id: 'parallel-agents',
          title: 'parallel agents',
          description: '用有界并行运行，避免无限扩张和上下文噪声。',
          status: 'default',
          accent: '并行',
        },
      ],
    },
    {
      id: 'synthesis',
      title: '综合过滤',
      description: '把多个输出合成少量可行动 findings。',
      items: [
        {
          id: 'confidence',
          title: 'confidence gate',
          description: '低置信发现被降级或抑制，高置信发现进入行动层。',
          status: 'risk',
          accent: '置信度',
        },
        {
          id: 'dedup',
          title: 'dedup / merge',
          description: '合并重复发现，保留独立 reviewer 的交叉印证。',
          status: 'risk',
          accent: '去重',
        },
      ],
    },
    {
      id: 'route',
      title: '路由结论',
      description: '按风险和可修复性决定下一步。',
      items: [
        {
          id: 'routing',
          title: 'routing',
          description: '区分自动修复、需确认修复、人工判断和提示性观察。',
          status: 'done',
          accent: '行动',
        },
        {
          id: 'human-gate',
          title: 'human decision gate',
          description: '产品取舍、范围变更和风险接受必须由人确认。',
          status: 'done',
          accent: '决策',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'orchestrator',
      to: 'dispatcher',
      label: '范围决定团队',
      type: 'depends',
    },
    {
      from: 'dispatcher',
      to: 'parallel-agents',
      label: '有界并行',
      type: 'next',
    },
    {
      from: 'parallel-agents',
      to: 'confidence',
      label: '输出先过门禁',
      type: 'gate',
    },
    {
      from: 'confidence',
      to: 'dedup',
      label: '再去重和合并',
      type: 'next',
    },
    {
      from: 'dedup',
      to: 'routing',
      label: '综合为行动',
      type: 'next',
    },
    {
      from: 'routing',
      to: 'human-gate',
      label: '高风险交回人',
      type: 'gate',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '范围',
      description: '决定后续所有选择',
    },
    {
      status: 'risk',
      label: '降噪',
      description: '过滤重复和低置信输出',
    },
    {
      status: 'done',
      label: '交付',
      description: '转成行动或决策',
    },
  ]"
/>

这条链路里，真正重要的是“综合过滤”和“路由”。没有这两层，并行 agents 只是并行地产生文本；有了这两层，多个视角才能变成可执行的工程判断。

## Orchestrator：先定任务边界

Orchestrator 负责把“我要 review / plan / research / polish”这样的请求，转成可分派的工作上下文。

| 输入 | Orchestrator 要确定什么 |
|---|---|
| 代码 diff | 变更范围、文件列表、基线、意图、是否有 plan、是否有 untracked 文件。 |
| 文档 | 文档类型、目标、origin、是否是 requirements、plan 或 OpenSpec artifact。 |
| 设计任务 | 目标页面、Figma / 设计规范、实现截图、交互状态和同步目标。 |
| 研究任务 | 需要本项目事实、团队上下文、Issue 趋势，还是外部文档。 |

这一步做错，后面的 agent 选得再多也没用。比如一个纯文档计划，不应该用运行时性能 reviewer 反复挑实现细节；一个权限相关 diff，也不应该只跑轻量评审。

## Dispatcher：按风险选择 agents

Dispatcher 的职责不是“全量派发”，而是“选对视角”。

| 任务信号 | 应选择的 agent 类型 |
|---|---|
| 所有代码评审 | correctness、testing、maintainability、project standards 等基础 reviewer。 |
| Auth、权限、外部输入、敏感数据 | security、reliability、adversarial 等风险 reviewer。 |
| API、类型签名、版本契约 | api contract reviewer。 |
| 数据迁移、schema、backfill | data migration reviewer、deployment verification。 |
| requirements / plan / spec | coherence、feasibility、scope、product、security lens、design lens。 |
| UI / Figma / 前端体验 | design lens、design implementation、design iterator、Figma sync。 |
| 上下文不足 | repo、learnings、session、Slack、issue、web research。 |

分派规则应该随任务变化。小范围文案或低风险样式改动，不需要完整多智能体队伍；跨权限、数据、迁移、支付、用户关键路径的改动，则值得拉起更多条件 reviewer。

## Parallel Agents：并行不是投票

并行 agents 的价值在于独立检查，而不是投票表决。

每个 agent 应该只对自己的风险维度负责：

| Agent 类型 | 应输出 | 不应输出 |
|---|---|---|
| Reviewer persona | 具体文件、行号、风险、证据、置信度和建议修复。 | 泛泛质量建议或超出职责的产品判断。 |
| Document reviewer | 文档 section、矛盾、缺口、可行性风险和回写建议。 | 语法润色清单或无证据的偏好。 |
| Research agent | 事实来源、证据摘要、适用范围和不确定性。 | 未核验的结论或私密上下文原文。 |
| Design agent | 设计决策缺口、实现偏差、状态遗漏和可观察 UI 问题。 | 主观审美投票。 |

并行的前提是职责清楚。职责不清时，多个 agent 会围着同一个问题重复输出，反而让主流程更难判断。

## Synthesis：把输出变成 findings

Synthesis 层负责把多个 agent 的原始输出变成可阅读、可排序、可追踪的 findings。它通常需要做几件事：

| 步骤 | 作用 |
|---|---|
| Schema 校验 | 丢弃缺字段、枚举错误或格式不合格的输出。 |
| Confidence gate | 按置信度锚点过滤低可信发现，把中等可信发现降为提示或待确认。 |
| Dedup / merge | 合并同一文件、同一区域或同一文档 section 的重复发现。 |
| Cross-agent promotion | 多个独立 reviewer 指向同一问题时，提高该 finding 的可信度。 |
| Contradiction handling | reviewer 意见相反时，不强行合并成单一结论，而是交给人工判断。 |
| Sorting | 按 P0-P3、错误类型、置信度和文档顺序排序。 |

这也是为什么多智能体评审不能只看“原始 agent 输出”。未经综合的输出只是一堆观察；综合后的 findings 才是可处理队列。

## Routing：结论必须有去处

一个 finding 是否重要，和它应该由谁处理，是两件事。

| 路由类型 | 含义 | 示例 |
|---|---|---|
| 自动修复 | 证据强、修复机械、风险低。 | 错误引用、明显遗漏、与同文档其他 section 不一致。 |
| 需确认修复 | 修复方向清楚，但会影响行为、合同、权限或范围。 | API 契约变化、安全控制、迁移策略。 |
| 人工判断 | 需要产品、设计、业务或组织取舍。 | 是否缩小范围、是否接受风险、是否改变需求。 |
| 提示观察 | 有参考价值，但不足以阻塞或驱动修改。 | 低风险可维护性提醒、可能的后续优化。 |
| 发布/运维项 | 不一定要改代码，但必须进入发布检查。 | 迁移验证、回滚、监控、Go/No-Go 清单。 |

如果一个 finding 没有路由，它就只是评论。好的 orchestration 会明确：谁处理、何时处理、是否需要验证、是否需要人工确认。

## Human Decision Gate：人负责不可自动化的判断

多智能体可以降低遗漏，但不能替代责任主体。

必须交回人的判断包括：

- 产品方向、优先级和机会成本。
- 是否接受某个安全、数据、迁移或发布风险。
- 是否修改已生效的 spec、proposal、plan 或设计稿。
- 是否为了可访问性、品牌或真实用户需求偏离 Figma。
- 多个 reviewer 证据冲突时采用哪条路径。
- 低优先级改动是否值得进入当前范围。

Agent 可以把证据和选项整理好，但不能把组织责任伪装成自动结论。

## 各类 agents 的关系

多智能体分组之间不是上下级关系，而是围绕同一任务的不同证据通道。

| 分组 | 在协作链路中的位置 | 主要产出 |
|---|---|---|
| Reviewer Personas | 代码 diff 的风险扫描层。 | P0-P3 findings、测试缺口、可维护性和安全风险。 |
| 文档评审智能体 | 实现前的计划和需求审查层。 | 文档矛盾、scope 风险、可行性缺口和回写建议。 |
| 设计与 UI 评审智能体 | 用户体验、设计决策和实现对齐层。 | 设计决策缺口、Figma 偏差、状态遗漏和 UI polish 建议。 |
| 研究型智能体 | 事实补证层。 | 仓库事实、历史经验、团队讨论、Issue 趋势和外部文档摘要。 |
| Workflow agents | 后续处理层。 | PR 评论修复、部署检查、Figma 同步、产品信号报告。 |

同一项任务可能同时使用多个分组。例如，一个新 UI 功能的 plan，可以先用 research 补上下文，再用 doc review 检查计划，再用 design lens 查交互缺口，最后代码完成后用 reviewer personas 和 design implementation review 验证实现。

## 常见失败模式

| 失败模式 | 结果 | 修正方式 |
|---|---|---|
| 所有 agents 全量派发 | 成本高、噪声大、低相关 finding 多。 | 按任务风险选择条件 agents。 |
| 没有置信度门禁 | 低证据建议进入主报告，用户难以判断。 | 使用 confidence gate 和交叉印证。 |
| 只去重不保留 reviewer 来源 | 丢失“多个独立视角都发现同一问题”的信号。 | 合并重复 finding，同时保留 reviewer 列表。 |
| 把冲突强行合并 | 把真实取舍伪装成确定结论。 | 把冲突标成 manual / human decision。 |
| 没有路由 | Review 报告看完就结束。 | 每个 finding 都要有 owner、下一步和验证要求。 |
| 研究输出覆盖事实源 | 外部资料或历史会话压过当前 spec。 | 按事实源优先级处理冲突。 |

多智能体协作的成熟度，不取决于 agent 数量，而取决于是否能把多视角输出收敛成少量高质量决策。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
