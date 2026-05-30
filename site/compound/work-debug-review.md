---
title: 执行、调试与评审
permalink: /compound/work-debug-review/
createTime: 2026/05/30 00:00:00
---

# 执行、调试与评审

执行、调试和评审不是同一个动作。它们分别处理三类风险：计划能否落地、问题根因是否找准、变更风险是否被覆盖。

在 Compound Engineering 中，`ce-work`、`ce-debug`、`ce-code-review`、`ce-simplify-code`、`ce-optimize` 和 `ce-polish-beta` 都位于执行与质量阶段附近，但它们不应该混成一个“让 Agent 改完代码”的动作。

## 核心结论

计划进入执行后，最容易出错的地方不是“Agent 不会写代码”，而是职责混淆：

- 把执行当调试：没有复现和根因，就直接试修。
- 把调试当评审：修好了当前症状，却没有检查其他风险。
- 把评审当执行：发现问题很多，但没有回到计划或实现闭环。
- 把优化当补救：没有指标和基线，就把主观调整叫优化。

Compound Engineering 的执行与质量链路要把这些动作拆开：先按计划交付，再用调试解决根因，用评审覆盖风险，用简化、优化和 UI polishing 收敛质量。

## 执行链路总览

<FlowExplainer
  mode="timeline"
  eyebrow="Build & Quality"
  title="从计划到可交付结果"
  description="执行与质量阶段把计划转成变更，再通过调试、评审、简化、优化和浏览器体验检查收敛风险。"
  :stages="[
    {
      id: 'execute',
      title: '按计划执行',
      description: '把计划中的边界、单元和验证带进实现。',
      items: [
        {
          id: 'ce-work',
          title: 'ce-work',
          description: '读取 plan 或任务描述，按范围执行并保持验证节奏。',
          status: 'active',
          accent: '执行',
        },
      ],
    },
    {
      id: 'diagnose',
      title: '调查根因',
      description: '当出现失败或异常时，先解释因果链，再修复。',
      items: [
        {
          id: 'ce-debug',
          title: 'ce-debug',
          description: '从症状、复现、假设和证据走到根因与修复。',
          status: 'risk',
          accent: '根因',
        },
      ],
    },
    {
      id: 'review',
      title: '覆盖风险',
      description: '让不同视角检查当前 diff 的质量缺口。',
      items: [
        {
          id: 'ce-code-review',
          title: 'ce-code-review',
          description: '用多 persona review correctness、testing、security、maintainability 等风险。',
          status: 'risk',
          accent: '评审',
        },
      ],
    },
    {
      id: 'refine',
      title: '收敛质量',
      description: '在行为成立后处理复杂度、指标和浏览器体验。',
      items: [
        {
          id: 'ce-simplify-code',
          title: 'ce-simplify-code',
          description: '在不改变行为的前提下减少复杂度和重复。',
          status: 'done',
          accent: '简化',
        },
        {
          id: 'ce-optimize',
          title: 'ce-optimize',
          description: '围绕可测指标迭代实验，而不是凭感觉调参。',
          status: 'done',
          accent: '指标',
        },
        {
          id: 'ce-polish-beta',
          title: 'ce-polish-beta',
          description: '面向前端体验，用浏览器反馈推动可感知质量改进。',
          status: 'done',
          accent: '体验',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'ce-work',
      to: 'ce-debug',
      label: '失败时先找根因',
      type: 'gate',
    },
    {
      from: 'ce-work',
      to: 'ce-code-review',
      label: '完成后接受评审',
      type: 'next',
    },
    {
      from: 'ce-code-review',
      to: 'ce-simplify-code',
      label: '风险可控后简化',
      type: 'depends',
    },
    {
      from: 'ce-debug',
      to: 'ce-work',
      label: '修复回到执行验证',
      type: 'feedback',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '执行',
      description: '把计划落成变更',
    },
    {
      status: 'risk',
      label: '质量门',
      description: '处理根因和风险',
    },
    {
      status: 'done',
      label: '收敛',
      description: '减少复杂度并提升结果',
    },
  ]"
/>

这条链路不是线性瀑布。调试可能把工作拉回计划，评审可能要求补测试，优化可能暴露需求指标不清。关键是让每个动作有明确职责，而不是用一个“大执行”动作吞掉所有判断。

## `ce-work`：按计划执行，不重新发明计划

`ce-work` 的重点是把 plan、spec 或明确任务描述转成实际变更。它应该优先继承已有计划里的 scope boundaries、implementation units、files、test scenarios 和 verification，而不是在执行时重新定义产品行为。

如果输入只是一个裸需求，`ce-work` 可以先做轻量扫描并按复杂度判断是否直接改、列任务，或建议回到 brainstorm / plan。但对跨模块、行为变化、安全、权限、数据、迁移等任务，直接执行通常风险过高。

| 输入状态 | 合适动作 |
|---|---|
| 有明确 plan 或 OpenSpec artifacts | 按事实源执行，遇到冲突回到对应 artifact。 |
| 小范围、低风险、行为清楚 | 可以直接实现并运行最小验证。 |
| 范围大、决策多、影响面广 | 先补 brainstorm、plan 或 OpenSpec change。 |
| 实现中发现计划不成立 | 暂停并修正计划，不把新范围偷偷塞进 diff。 |

执行阶段的质量不只看“有没有改完”，还要看有没有保持范围、验证和可追踪性。

## `ce-debug`：先找根因，再谈修复

`ce-debug` 适合在出现错误、测试失败、线上症状、复现不稳定或多次修复失败时使用。它的核心纪律是：没有完整因果链之前，不急着修。

调试应当从症状开始，但不能停在症状：

| 阶段 | 关键问题 | 输出 |
|---|---|---|
| 症状 | 用户、测试或系统实际看到了什么？ | 明确问题陈述。 |
| 复现 | 能否稳定触发，环境条件是什么？ | 复现步骤或不可复现说明。 |
| 追踪 | 有效状态在哪里第一次变坏？ | 数据流、调用链、边界观察。 |
| 假设 | 哪个原因最可能解释所有现象？ | 带证据的根因假设。 |
| 验证 | 这个假设是否能预测其他现象？ | 被验证或被推翻的预测。 |
| 修复 | 如何消除根因，而不是遮住症状？ | 最小修复和回归验证。 |

调试和执行的分界很重要：`ce-work` 可以完成计划内实现；`ce-debug` 负责解释为什么某个行为失败。没有这个分界，Agent 很容易进入“试一个补丁看看”的循环。

## `ce-code-review`：用多视角覆盖风险

`ce-code-review` 的价值不是给代码打分，而是把注意力拆给不同 reviewer personas。一个 reviewer 很容易只盯 correctness，另一个可能只看测试；多视角 review 的目的就是降低这种盲区。

在代码评审阶段，至少应区分这些风险：

| 风险维度 | 典型问题 |
|---|---|
| Correctness | 边界条件、状态转换、错误传播、行为回归。 |
| Testing | 关键路径没测、断言太弱、测试只覆盖实现细节。 |
| Security | 权限、输入、公开接口、敏感数据和越权风险。 |
| Maintainability | 复杂度、耦合、重复、死代码、抽象边界。 |
| Performance / Reliability | N+1、缓存、重试、超时、后台任务和稳定性。 |
| Project standards | 是否符合项目规则、命名、路径、文档和 portability 约定。 |

评审发现不等于自动修改。低风险、确定性的修复可以直接处理；涉及行为、权限、数据、发布和产品取舍的发现，应回到计划、spec 或人工判断。

## 简化、优化和 polishing 的位置

`ce-simplify-code`、`ce-optimize` 和 `ce-polish-beta` 都在执行后段，但它们关注的质量不同。

| 能力 | 适合什么时候用 | 不适合替代什么 |
|---|---|---|
| `ce-simplify-code` | 行为已经成立，但代码显得重复、绕、难读或偏离项目模式。 | 不替代需求澄清，也不为了少几行改变行为。 |
| `ce-optimize` | 有明确指标、基线和可测目标，例如性能、搜索质量、构建时间、提示效果。 | 不替代主观判断；没有指标时不应伪装成优化。 |
| `ce-polish-beta` | 前端功能能跑，但需要真实浏览器里的体验检查和迭代。 | 不替代产品验收、设计规范或可访问性判断。 |

这些动作最好发生在基础行为已经可信之后。否则，简化可能把错误行为整理得更漂亮，优化可能把错误指标推得更高，polish 可能掩盖核心流程没有成立。

## 什么时候回到计划或 OpenSpec

执行中发现新事实很正常，关键是不要把它们偷偷埋进实现。

| 发现的问题 | 应该回到哪里 |
|---|---|
| 目标用户、成功标准或非目标不清 | 回到 brainstorm 或 requirements。 |
| 实现路径和原 plan 不一致 | 更新 plan 或设计说明。 |
| 行为变化超出原范围 | 更新 OpenSpec proposal / specs。 |
| 验证方式不足以证明完成 | 更新 tasks 或 verification。 |
| bug 暴露了设计假设错误 | 回到 plan 或重新做方案判断。 |
| 评审发现权限、数据或发布风险 | 暂停合并，补设计、测试和人工确认。 |

这不是流程倒退，而是把执行中学到的新事实写回事实源。Compound Engineering 的复利恰恰来自这里：一次执行不只产生代码，也让后续计划、评审和知识沉淀更可靠。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
