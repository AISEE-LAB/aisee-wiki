---
title: Artifact 写法指南
permalink: /openspec/artifact-guide/
createTime: 2026/05/28 00:00:00
---

# Artifact 写法指南

OpenSpec change 里的 artifact 不是把同一件事写四遍。`proposal.md`、delta spec、`design.md`、`tasks.md` 分别承担不同职责：先说明意图，再约束行为，再记录实现判断，最后拆成可执行工作。

这篇聚焦四类常见 artifact 的写法边界，只回答一个问题：当你已经准备创建 OpenSpec change 时，每个 artifact 应该写什么，不应该写什么。

## 核心结论

判断 artifact 是否写对，可以看它回答的问题是否清晰：

| Artifact | 回答的问题 | 不应该承担 |
|---|---|---|
| `proposal.md` | 为什么做、做什么、不做什么、影响哪里。 | 具体代码步骤、内部实现细节。 |
| delta spec | 行为如何变化，什么场景必须成立。 | 技术方案、类名、函数名、组件拆分。 |
| `design.md` | 准备怎么实现，关键取舍和风险是什么。 | 重新定义需求或偷偷扩大范围。 |
| `tasks.md` | 如何拆成可执行、可检查的工作项。 | 抽象口号、没有验证方式的待办。 |

默认 `spec-driven` schema 常见顺序是：

```text
proposal -> specs -> design -> tasks
```

这里的 `specs` 指 change 目录下的 delta specs，而不是直接修改主 `openspec/specs/`。artifact 顺序由 schema 决定，自定义 schema 可以调整、裁剪或替换 artifact；顺序可以变，职责边界不应混乱。

## 职责边界图

<FlowExplainer
  mode="timeline"
  eyebrow="OpenSpec artifacts"
  title="四类 artifact 的职责接力"
  description="一次 change 里，每个 artifact 都把前一个判断转成下一类可审查材料。重点不是文件数量，而是意图、行为、设计和执行之间不互相替代。"
  :stages="[
    {
      id: 'intent',
      title: '意图范围',
      description: '先确认这次 change 是否值得做。',
      items: [
        {
          id: 'proposal',
          title: 'proposal',
          description: '记录背景、目标、非目标、影响范围和成功标准。',
          status: 'active',
          accent: '为什么 / 做什么',
        },
      ],
    },
    {
      id: 'behavior',
      title: '行为约束',
      description: '把范围转成可验证行为。',
      items: [
        {
          id: 'spec',
          title: 'delta spec',
          description: '用 requirement 和 scenario 描述 ADDED、MODIFIED 或 REMOVED 行为。',
          status: 'active',
          accent: '行为变化',
        },
      ],
    },
    {
      id: 'decision',
      title: '实现判断',
      description: '说明方案为什么这样做。',
      items: [
        {
          id: 'design',
          title: 'design',
          description: '记录架构影响、技术取舍、约束、风险和验证重点。',
          status: 'risk',
          accent: '怎么做 / 为什么',
        },
      ],
    },
    {
      id: 'execution',
      title: '执行验证',
      description: '把判断拆成可推进清单。',
      items: [
        {
          id: 'tasks',
          title: 'tasks',
          description: '列出实现、测试、文档、迁移和验证任务。',
          status: 'default',
          accent: '做完如何检查',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'proposal',
      to: 'spec',
      label: '范围决定行为变化',
      type: 'depends',
    },
    {
      from: 'spec',
      to: 'design',
      label: '行为约束设计',
      type: 'depends',
    },
    {
      from: 'design',
      to: 'tasks',
      label: '方案拆成任务',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '定义重点',
      description: '先让范围和行为可审查',
    },
    {
      status: 'risk',
      label: '判断重点',
      description: '记录风险和取舍',
    },
    {
      status: 'default',
      label: '执行重点',
      description: '进入实现和验证',
    },
  ]"
/>

这张图表达的是职责依赖，不是不可回退的阶段门。实现时发现行为场景缺失，要回到 spec；发现方案与代码现状冲突，要更新 design；发现任务拆分不利于执行，要调整 tasks。

## 写 proposal：先把范围说清楚

`proposal.md` 是 change 的入口。它的读者不是编译器，而是即将审查、实现或接手这次变更的人。

一个可用的 proposal 至少应该包含：

- 背景：为什么现在要做。
- 目标：本次 change 要达成什么结果。
- 非目标：哪些内容明确不在本次范围。
- 影响范围：涉及哪些能力、页面、接口、数据、配置或文档。
- 成功标准：什么条件下可以认为 change 完成。

好的 proposal 会降低后续争议。比如“新增导出能力”太宽，“为报表列表增加当前筛选结果的 CSV 导出，不包含后台异步导出和权限模型重构”就清楚很多。

proposal 不应该提前写成任务清单。下面这种写法会让 scope 和 execution 混在一起：

```text
1. 新增 ExportService
2. 修改 ReportPage
3. 增加 downloadCsv 方法
```

这些内容如果成立，应该进入 design 或 tasks。proposal 更应该先说明为什么需要导出、导出哪些数据、哪些导出场景不做、对现有报表行为有什么影响。

## 写 spec：把行为变成可验证场景

change 内的 spec 通常是 delta spec，用来描述相对当前 `openspec/specs/` 的变化。它关注系统外显行为，不关注内部代码结构。

常见结构是：

```markdown
## ADDED Requirements

### Requirement: 用户可以导出当前筛选结果

系统必须允许有权限的用户导出当前筛选条件下的报表数据。

#### Scenario: 导出当前筛选条件下的 CSV

- **WHEN** 用户在报表列表中设置筛选条件
- **AND** 用户点击导出
- **THEN** 系统生成只包含当前筛选结果的 CSV 文件
```

这里的重点是 requirement 和 scenario。好的 scenario 应该能被实现、测试或人工验收直接对照。

spec 不应该写内部实现：

```text
新增 ExportService 类，并在 ReportController 中调用 buildCsv。
```

这句话没有说明用户可观察行为，也无法独立判断是否满足需求。它应该移到 design，或者拆成 tasks。

## 写 design：记录实现判断和风险

`design.md` 用来解释“准备怎么做”和“为什么这样做”。它不是每次都要很长，但只要 change 涉及架构边界、数据流、迁移、安全、性能或兼容性，就应该留下设计判断。

一个实用的 design 可以覆盖：

- 上下文：现有系统如何工作，哪些约束不能破坏。
- 方案：准备采用什么实现路径。
- 取舍：为什么不用其他方案。
- 数据和接口影响：哪些模型、接口、事件、配置会变化。
- 风险：哪些假设需要验证，哪些地方可能返工。
- 验证重点：实现完成后应该重点检查什么。

design 的边界也很重要。它不能替代 spec，也不能暗中改变 proposal 的范围。如果写 design 时发现原来的行为目标不合理，应该回到 proposal 或 spec 更新，而不是在 design 里直接改需求。

例如，下面这类内容适合放在 design：

```text
导出复用现有报表查询条件构造器，避免导出结果和页面列表口径不一致。
暂不引入异步任务队列，因为当前数据量上限可以在同步响应内完成。
风险：大筛选结果可能导致响应时间过长，需要补充最大行数限制。
```

它解释了实现路径、取舍和风险，但没有把用户行为写成内部类名清单。

## 写 tasks：拆成能执行和验收的清单

`tasks.md` 是进入实现的操作面。它应该让人和 AI 都能按项推进，并在每项完成后知道如何检查。

有效任务通常有几个特征：

- 动词明确：新增、修改、复用、补充、验证、迁移。
- 粒度可执行：一项任务最好能在一次上下文中完成。
- 覆盖完整：实现、测试、文档、配置、迁移和验证不要漏。
- 可打勾：完成标准能被观察，而不是主观感受。

不好的任务：

```markdown
- [ ] 完成导出功能
- [ ] 优化代码
- [ ] 测试一下
```

更好的任务：

```markdown
- [ ] 在报表列表增加导出入口，并沿用现有筛选条件状态。
- [ ] 复用报表查询条件生成 CSV 数据源，确保列表和导出口径一致。
- [ ] 增加导出权限检查，未授权用户不能触发导出。
- [ ] 补充当前筛选导出的测试或人工验证步骤。
- [ ] 运行报表相关测试和文档站构建检查。
```

tasks 不需要重复 proposal 的背景，也不需要复制完整 spec。它应该指向可以完成的工作，并保留必要验证。

## 顺序可以调整，职责不能混用

OpenSpec 的 artifact 顺序由 schema 决定。默认 `spec-driven` flow 里，常见顺序是 proposal、specs、design、tasks，其中 specs 指 change 下的 delta specs。自定义 schema 可以调整、裁剪或替换 artifact；具体如何扩展，应该放到 Schema 章节再讨论。

这些变体本身没有问题。真正需要避免的是职责混用：

| 混用方式 | 问题 |
|---|---|
| proposal 里写大量文件修改步骤 | 审查者看不清真正目标和非目标。 |
| spec 里写类名、函数名、组件名 | 行为约束变成实现方案，验收标准变弱。 |
| design 里改变需求范围 | 变更目标绕过 proposal 和 spec 审查。 |
| tasks 里只有大口号 | 实现时无法判断进度，也无法恢复上下文。 |

如果一个 artifact 写着写着开始回答另一个 artifact 的问题，通常应该停下来，把内容移到正确位置。

## 审查清单

提交 implementation 前，可以用这张清单快速检查：

| 检查项 | 判断标准 |
|---|---|
| proposal 是否清楚 | 能否看出为什么做、做什么、不做什么、完成标准是什么。 |
| spec 是否可验证 | 是否有 requirement 和 scenario，是否描述用户或系统可观察行为。 |
| design 是否解释取舍 | 是否记录关键方案、约束、风险和验证重点。 |
| tasks 是否可执行 | 是否能逐项打勾，是否包含测试、构建或人工验证。 |
| artifact 是否一致 | proposal、spec、design、tasks 是否描述同一个 change，没有互相冲突。 |

审查的重点不是文字是否漂亮，而是未来的人和 AI 是否能根据这些文件继续推进，并判断实现是否偏离。

## 参考资料

- [OpenSpec Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
- [OpenSpec Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
- [OpenSpec conventions spec](https://github.com/Fission-AI/OpenSpec/blob/main/openspec/specs/openspec-conventions/spec.md)
