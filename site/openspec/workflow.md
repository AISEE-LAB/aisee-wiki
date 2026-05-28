---
title: OpenSpec 基础工作流
permalink: /openspec/workflow/
createTime: 2026/05/28 00:00:00
---

# OpenSpec 基础工作流

OpenSpec 的基础工作流通常可以概括为：

```text
propose -> specs -> design -> tasks -> implement -> verify -> archive
```

但这不是传统瀑布流程。OpenSpec 官方 workflows 文档强调的是 actions, not phases：这些步骤表示你可以执行的动作和依赖关系，而不是把工作锁死在某个阶段里。

这篇讲清楚一次 change 从提出到归档时，每一步要解决什么问题、产生什么 artifact、什么时候需要回头修正。

## 核心结论

OpenSpec 工作流的目标，是让一次变更在实现前有清晰意图，在实现中有可检查依据，在完成后有可追踪历史。

每一步都应该回答一个具体问题：

| 动作 | 回答的问题 | 典型产物 |
|---|---|---|
| propose | 为什么做，做什么，不做什么？ | `proposal.md` |
| specs | 行为如何变化？ | delta specs |
| design | 准备怎么实现，风险是什么？ | `design.md` |
| tasks | 如何拆成可执行和可验证的工作？ | `tasks.md` |
| implement | 是否按 artifacts 修改了系统？ | 代码、配置、文档变更 |
| verify | 实现是否符合 artifacts？ | 测试、构建、审查结果 |
| archive | 完成后如何更新事实源并保留历史？ | 主 specs 更新、change 归档 |

这条链路的重点不是“文件齐全”，而是每个 artifact 都承担清晰职责。

## 工作流总览

<FlowExplainer
  mode="timeline"
  eyebrow="OpenSpec workflow"
  title="从提出变更到归档事实"
  description="OpenSpec 工作流是一组可迭代动作：先定义变更，再形成行为约束和执行计划，最后通过验证和归档把变化沉淀为事实源。"
  :stages="[
    {
      id: 'define',
      title: '定义变更',
      description: '先让变更范围可审查。',
      items: [
        {
          id: 'proposal',
          title: 'propose',
          description: '说明背景、目标、范围、非目标和影响。',
          status: 'active',
          accent: '意图',
        },
        {
          id: 'specs',
          title: 'specs',
          description: '用 delta specs 描述本次行为变化。',
          status: 'active',
          accent: '行为',
        },
      ],
    },
    {
      id: 'plan',
      title: '设计任务',
      description: '把行为变化转为可执行工作。',
      items: [
        {
          id: 'design',
          title: 'design',
          description: '记录方案、风险、取舍和架构影响。',
          status: 'default',
          accent: '判断',
        },
        {
          id: 'tasks',
          title: 'tasks',
          description: '拆成可以逐项完成和验证的清单。',
          status: 'default',
          accent: '执行',
        },
      ],
    },
    {
      id: 'build',
      title: '实现验证',
      description: '按 artifacts 修改系统，并检查是否偏离。',
      items: [
        {
          id: 'implement',
          title: 'implement',
          description: '修改代码、配置或文档。',
          status: 'risk',
          accent: '变更',
        },
        {
          id: 'verify',
          title: 'verify',
          description: '检查完整性、正确性和设计一致性。',
          status: 'risk',
          accent: 'gate',
        },
      ],
    },
    {
      id: 'close',
      title: '归档收口',
      description: '把完成的变化变成新的事实源。',
      items: [
        {
          id: 'archive',
          title: 'archive',
          description: '合并 specs，移动 change，保留历史上下文。',
          status: 'done',
          accent: '完成',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'proposal',
      to: 'specs',
      label: '范围决定行为变化',
      type: 'depends',
    },
    {
      from: 'specs',
      to: 'design',
      label: '行为约束设计',
      type: 'depends',
    },
    {
      from: 'tasks',
      to: 'implement',
      label: '任务进入实现',
      type: 'next',
    },
    {
      from: 'verify',
      to: 'archive',
      label: '验证通过后归档',
      type: 'gate',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '定义重点',
      description: '需要先对齐',
    },
    {
      status: 'risk',
      label: '验证重点',
      description: '需要证据',
    },
    {
      status: 'done',
      label: '完成状态',
      description: '进入事实源',
    },
  ]"
/>

图里虽然画成一条线，但实际工作可以回头。比如实现时发现 design 不符合代码现状，就应该更新 design；验证时发现 spec 场景缺失，就应该补 spec，而不是让实现强行通过。

## 1. Propose：先定义为什么做

Propose 阶段的目标，是把“想改什么”变成可审查的变更意图。

一个好的 `proposal.md` 至少应该说明：

- 背景：为什么现在要做。
- 目标：本次 change 具体要达成什么。
- 非目标：哪些内容明确不在范围内。
- 影响：涉及哪些能力、页面、接口、数据或流程。
- 成功标准：什么条件下可以认为这个 change 完成。

Proposal 不应该写成实现任务清单。它回答的是“这件事值不值得做、范围是否清楚”，不是“第一步改哪个文件”。

如果 proposal 写不清，通常说明问题还在探索阶段。这时适合继续调查、缩小范围，或者先拆出一个更小的 change。

## 2. Specs：描述行为如何变化

Specs 阶段的目标，是把变更意图转成可验证行为。

在 change 里写的 spec 通常是 delta spec，也就是描述相对当前 `openspec/specs/` 的变化。常见语义包括：

- `ADDED`：新增一个行为要求。
- `MODIFIED`：修改已有行为要求。
- `REMOVED`：移除已有行为要求。

Spec 应该尽量用 requirement 和 scenario 表达，而不是写内部实现。比如：

```text
Requirement: 用户可以导出当前筛选结果
Scenario: 导出当前筛选条件下的 CSV
```

这比“新增 ExportService 类”更适合放在 spec 里。后者属于实现方案，应该进入 design。

## 3. Design：记录实现判断

Design 阶段不是每次都要写很长，但当 change 涉及技术取舍、架构边界、数据流、安全或性能风险时，`design.md` 很重要。

Design 应该记录：

- 技术方案：准备怎么实现。
- 取舍：为什么选择这个方案，而不是另一个方案。
- 约束：必须遵守哪些项目现状、兼容性、安全或性能要求。
- 风险：哪些地方需要验证，哪些地方可能返工。
- 影响面：会碰到哪些模块、接口、配置或部署环节。

Design 不应该重新定义需求。如果 design 发现 proposal 或 spec 不合理，应该回头更新前面的 artifact，而不是在 design 里偷偷改变范围。

## 4. Tasks：拆成可执行清单

Tasks 阶段把前面的判断转成执行计划。好的 `tasks.md` 应该让人和 AI 都能按项推进，并且知道每项完成后如何验证。

任务清单应该具备几个特征：

- 每一项有明确动作，不是抽象口号。
- 覆盖实现、测试、文档、配置和迁移等必要工作。
- 包含最小相关验证，而不是只写“完成开发”。
- 可以逐项打勾，方便恢复上下文。

例如，“实现导出功能”太粗；“新增导出按钮”“复用报表查询条件生成 CSV”“补充权限检查”“运行构建和导出相关测试”更容易执行和检查。

## 5. Implement：按 artifacts 修改系统

实现阶段不是“照着 tasks 机械改文件”。实现过程中会遇到真实代码反馈：旧接口和预期不一致、测试暴露了边界、设计方案过重或过轻、某个 scenario 没有覆盖异常情况。

这时有两类正确动作：

- 如果只是执行细节变化，更新 tasks 或实现即可。
- 如果目标、行为或设计判断变化，应该回头更新 proposal、spec 或 design。

OpenSpec 的价值就在这里：它允许你在实现中学习，但要求学习结果回到 artifacts 中，而不是只留在聊天记录里。

## 6. Verify：检查实现是否符合 artifacts

Verify 阶段检查的不是“有没有跑过命令”，而是实现是否和 artifacts 一致。

可以从三个维度检查：

| 维度 | 检查问题 |
|---|---|
| 完整性 | tasks 是否完成，spec 场景是否有对应实现或测试。 |
| 正确性 | 实现是否满足 spec 意图，边界和错误状态是否处理。 |
| 一致性 | 代码结构是否反映 design，命名和模式是否符合项目约定。 |

验证可以是自动测试、构建、静态检查、浏览器预览、人工审查，或者它们的组合。关键是验证结果要能支撑“这个 change 可以归档”的判断。

## 7. Archive：把完成的变化变成历史事实

Archive 是 change 的收口动作。它通常做两件事：

- 将 delta specs 合并到主 `openspec/specs/`，更新当前事实源。
- 将完成的 change 移动到 `openspec/changes/archive/`，保留历史上下文。

Archive 不只是整理文件。它回答的是：这次变化已经完成了吗？完成后的系统事实是否已经更新？未来的人是否能理解当时为什么这么改？

如果 tasks 没完成、spec 没同步、验证结果不清楚，就不应该草率 archive。

## 工作流不是单行道

OpenSpec 最容易被误解成“先写完所有文档，再写代码”。更准确的理解是：OpenSpec 让每个动作都有位置。

几种常见回退是合理的：

| 发现的问题 | 应该回到哪里 |
|---|---|
| 实现时发现目标范围不合理 | `proposal.md` |
| 测试时发现遗漏了行为场景 | delta spec |
| 代码现状推翻了原方案 | `design.md` |
| 任务拆分过粗或漏了验证 | `tasks.md` |

这种回退不是失败，而是把实现过程中学到的事实沉淀回规范层。

## 常见误区

| 误区 | 问题 | 更好的做法 |
|---|---|---|
| 一开始就追求 artifact 完美 | 会让工作停在文档打磨里 | 先让关键判断可审查，再迭代补强 |
| tasks 完成就等于 change 完成 | 可能 spec 或 design 仍然不一致 | 完成前做 verify |
| archive 只是移动文件 | 会忽略主 specs 更新和历史解释 | 把归档当成事实源收口 |
| 实现中发现问题但不更新 artifacts | 会让文档和代码漂移 | 把新事实写回对应 artifact |

## 下一步阅读

理解工作流之后，下一篇应该深入每个 artifact 的写法：proposal、spec、design、tasks 分别应该写什么、不应该写什么，以及如何避免职责混淆。

## 参考资料

- [OpenSpec Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
- [OpenSpec Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
- [OpenSpec conventions spec](https://github.com/Fission-AI/OpenSpec/blob/main/openspec/specs/openspec-conventions/spec.md)
