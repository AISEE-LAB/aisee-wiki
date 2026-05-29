---
title: Delta Spec 深度解析
permalink: /openspec/delta-spec/
createTime: 2026/05/29 00:00:00
---

# Delta Spec 深度解析

Delta spec 是 OpenSpec change 里最容易被误解的文件。它不是把主 spec 复制一份再改，也不是实现计划，而是用结构化方式说明：相对当前 `openspec/specs/`，这次 change 准备新增、修改或移除哪些行为。

这篇只讨论通用 OpenSpec 语境下的 delta spec：它解决什么问题，`ADDED`、`MODIFIED`、`REMOVED` 怎么写，和主 specs 如何衔接，以及归档后事实源如何更新。

## 核心结论

理解 delta spec，要先分清两类 spec：

| 文件位置 | 表达对象 | 生命周期 |
|---|---|---|
| `openspec/specs/<capability>/spec.md` | 当前系统已经成立的行为事实。 | 长期维护，作为后续 change 的基线。 |
| `openspec/changes/<change>/specs/<capability>/spec.md` | 某次 change 对当前行为的增量修改。 | 随 change 存在，归档后合并回主 specs。 |

Delta spec 的价值在于让审查者只看变化本身，而不是在一整份 spec 里找差异。它应该回答三个问题：

- 这次新增了什么行为。
- 这次改变了什么已有行为。
- 这次移除了什么已有行为。

有些 OpenSpec 约定还支持 `RENAMED Requirements`，用于 requirement 标题重命名。它更像一种辅助语义：当行为内容也变化时，仍应在 `MODIFIED` 下写出新的完整 requirement。本文先讲最常用的 `ADDED`、`MODIFIED`、`REMOVED`，重命名可以在掌握这三类之后再处理。

如果一个 delta spec 读完后仍然看不出“当前行为会怎样变化”，它就没有完成职责。

## 工作机制图

<ClientOnly>
  <DiagramFigure
    src="/diagrams/openspec/delta-spec-flow.svg"
    title="Delta spec 工作流图"
    caption="主 specs 是当前事实源；change 中的 delta spec 只描述本次 ADDED、MODIFIED、REMOVED 行为；实现验证通过后，变化通过 sync/archive 回写主 specs，成为下一次 change 的基线。"
  />
</ClientOnly>

<FlowExplainer
  mode="timeline"
  eyebrow="Delta spec"
  title="从当前事实到新的事实源"
  description="Delta spec 站在当前 specs 之上描述本次行为变化。实现和验证通过后，变化才会回写主 specs，成为新的事实源。"
  :stages="[
    {
      id: 'current',
      title: '当前事实',
      description: '先知道系统现在如何工作。',
      items: [
        {
          id: 'main-specs',
          title: 'main specs',
          description: '主 openspec/specs/ 描述当前已成立行为。',
          status: 'default',
          accent: '基线',
        },
      ],
    },
    {
      id: 'change',
      title: '增量变化',
      description: '只写这次 change 的行为差异。',
      items: [
        {
          id: 'added',
          title: 'ADDED',
          description: '新增以前不存在的 requirement。',
          status: 'active',
          accent: '新增行为',
        },
        {
          id: 'modified',
          title: 'MODIFIED',
          description: '替换或调整已有 requirement。',
          status: 'active',
          accent: '修改行为',
        },
        {
          id: 'removed',
          title: 'REMOVED',
          description: '移除不再成立的 requirement。',
          status: 'risk',
          accent: '移除行为',
        },
      ],
    },
    {
      id: 'verify',
      title: '实现验证',
      description: '确认代码、配置或文档确实符合变化。',
      items: [
        {
          id: 'implementation',
          title: 'implementation',
          description: '实现应满足 delta spec 中的场景。',
          status: 'risk',
          accent: '对齐行为',
        },
      ],
    },
    {
      id: 'archive',
      title: '事实更新',
      description: '完成后把变化合并回主 specs。',
      items: [
        {
          id: 'sync-archive',
          title: 'sync / archive',
          description: '主 specs 更新，change 进入历史记录。',
          status: 'done',
          accent: '新基线',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'main-specs',
      to: 'added',
      label: '以当前行为为基线',
      type: 'depends',
    },
    {
      from: 'change',
      to: 'implementation',
      label: '三类变化都约束实现',
      type: 'gate',
    },
    {
      from: 'implementation',
      to: 'sync-archive',
      label: '验证后回写事实源',
      type: 'next',
    },
    {
      from: 'implementation',
      to: 'change',
      label: '发现偏差时修正 delta',
      type: 'feedback',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '变化语义',
      description: '审查重点',
    },
    {
      status: 'risk',
      label: '需要谨慎',
      description: '影响已有行为',
    },
    {
      status: 'done',
      label: '完成后',
      description: '成为新的事实源',
    },
  ]"
/>

这张图强调的是事实源更新关系。Delta spec 不应该长期替代主 specs；它在 change 期间说明变化，完成后通过 sync 或 archive 合并回主 specs。下面的结构化拆解只是帮助理解图中的节点关系。

## 为什么需要 delta spec

如果每次 change 都直接修改主 `openspec/specs/`，团队会遇到几个问题：

| 问题 | 影响 |
|---|---|
| 审查者看不出变化范围 | 需要把整份 spec 和历史版本做 diff。 |
| 并行 change 互相污染 | 未完成的行为可能提前进入事实源。 |
| 实现前后的判断混在一起 | 不容易区分“计划变化”和“当前事实”。 |
| 归档历史变弱 | 未来很难追溯某条 requirement 为什么出现或变化。 |

Delta spec 把“计划中的行为变化”放在 change 目录中。这样主 specs 继续代表当前事实，change 目录代表待审查的变化。这个分离，是 OpenSpec 支持 brownfield 项目和并行工作的关键。

## ADDED：新增行为

`ADDED Requirements` 用于描述以前不存在、这次 change 准备新增的行为。

适合 `ADDED` 的情况：

- 新增用户可观察能力。
- 新增系统对外承诺。
- 新增错误处理、权限约束或边界行为。
- 新增某个长期需要维护的场景。

示例：

```markdown
## ADDED Requirements

### Requirement: 用户可以导出当前筛选结果

系统必须允许有权限的用户导出当前筛选条件下的报表数据。

#### Scenario: 导出当前筛选结果

- **GIVEN** 用户拥有报表导出权限
- **AND** 用户在报表列表中设置了筛选条件
- **WHEN** 用户触发导出
- **THEN** 系统生成只包含当前筛选结果的 CSV 文件
```

这里新增的是行为承诺：有权限用户可以导出当前筛选结果。至于是否新增按钮、复用哪个查询函数、CSV 如何生成，应该放到 design 或 tasks，而不是写在 delta spec 里。

## MODIFIED：修改已有行为

`MODIFIED Requirements` 用于描述已有 requirement 的行为变化。它不是写一句“把 30 分钟改成 15 分钟”就结束，而是要让归档后的主 spec 能表达完整的新行为。

适合 `MODIFIED` 的情况：

- 已有规则的阈值、条件或结果变化。
- 已有场景增加新的前置条件。
- 已有错误状态、权限判断或兼容性承诺发生变化。
- 已有能力的行为口径需要重定义。

示例：

```markdown
## MODIFIED Requirements

### Requirement: 会话空闲超时

系统必须在用户连续 15 分钟没有活动后使会话失效。

Previously: 系统在用户连续 30 分钟没有活动后使会话失效。

#### Scenario: 空闲超时后重新认证

- **GIVEN** 用户已经登录
- **WHEN** 用户连续 15 分钟没有活动
- **THEN** 系统使当前会话失效
- **AND** 用户必须重新认证后才能继续操作
```

`MODIFIED` 最常见的错误，是只写差异片段，不写变化后的完整行为。归档时，OpenSpec 需要知道新的 requirement 应该是什么；审查者也需要直接看到新行为，而不是靠猜测拼起来。

## REMOVED：移除行为

`REMOVED Requirements` 用于描述不再成立的行为。移除行为通常比新增行为更敏感，因为它可能影响已有用户、集成方或测试。

适合 `REMOVED` 的情况：

- 废弃旧能力。
- 删除旧兼容路径。
- 移除过时的配置、入口或场景。
- 明确某个原有承诺不再成立。

示例：

```markdown
## REMOVED Requirements

### Requirement: 记住登录状态

系统不再支持用户通过“记住我”保持长期登录状态。

Reason: 该行为被更严格的会话安全策略替代。
```

`REMOVED` 应该说明原因，尤其是涉及兼容性、安全或用户工作流时。只写“删除旧逻辑”不够，因为那是实现动作，不是行为变化。

## 与主 spec 的关系

主 spec 是当前事实源，delta spec 是计划变化。两者不能混用。

| 场景 | 应该怎么做 |
|---|---|
| 创建新 change | 在 `openspec/changes/<change>/specs/` 写 delta spec。 |
| change 还未实现 | 不要把计划行为提前写入主 `openspec/specs/`。 |
| 实现发现行为目标不准确 | 更新 delta spec，使它反映新的行为判断。 |
| change 完成并验证 | 通过 sync/archive 把 delta 合并进主 specs。 |
| 归档后继续演进 | 新建或更新另一个 change，基于新的主 specs 写 delta。 |

这也是为什么 delta spec 不能写成“临时需求备忘”。它最终会影响主 specs，所以写作时就要按长期行为契约的质量要求来写。

## 一个 change 可以有多个 delta spec

一次 change 可能影响多个 capability。此时不要强行把所有变化塞进一个 delta spec，而应该按受影响的主 spec 边界拆分。

例如，一个“导出报表”change 可能同时影响：

```text
openspec/changes/add-report-export/specs/reports/spec.md
openspec/changes/add-report-export/specs/permissions/spec.md
openspec/changes/add-report-export/specs/audit/spec.md
```

其中 `reports` 描述导出行为，`permissions` 描述权限约束，`audit` 描述审计记录。它们属于同一次 change，但分别对应不同的长期行为边界。

反过来，如果一个 change 只影响一个 capability，也不要为了显得完整而拆出多个空洞 spec。delta spec 的拆分应该跟行为影响范围一致。

## 常见误区

| 误区 | 为什么有问题 |
|---|---|
| 复制整份主 spec 再改 | 审查者很难看出真正变化，归档时也容易覆盖无关内容。 |
| 只写实现步骤 | spec 失去行为约束作用，变成 tasks 或 design 的替代品。 |
| `MODIFIED` 只写一句差异 | 归档后新 requirement 不完整，审查者也难以判断边界。 |
| `REMOVED` 不说明原因 | 未来无法理解为什么删除已有行为。 |
| 把 requirement 重命名硬写成删除再新增 | 历史关系容易断开；如果当前约定支持 `RENAMED`，应显式表达 from/to。 |
| 把一次 change 的交付边界当成主 spec 边界 | change 可以是临时工作单元，主 spec 应该表达长期行为组织。 |

写 delta spec 时，可以反复问一个问题：归档后，这段内容能不能自然成为主 spec 的一部分？如果不能，说明它可能写成了实现说明、任务清单或临时备注。

## 审查清单

提交或实现前，可以用这张清单检查 delta spec：

| 检查项 | 判断标准 |
|---|---|
| 是否基于当前主 specs | 能看出它修改的是哪个现有能力或新增哪个能力。 |
| 变更语义是否明确 | `ADDED`、`MODIFIED`、`REMOVED` 没有混用；如支持 `RENAMED`，重命名关系要清楚。 |
| requirement 是否完整 | 归档后可以直接成为主 spec 的 requirement。 |
| scenario 是否可验证 | 能被测试、构建、人工验收或审查直接对照。 |
| 是否避免实现细节 | 没有把类名、函数名、文件修改步骤写成行为要求。 |
| 是否覆盖兼容影响 | 修改或移除已有行为时说明了影响和原因。 |

Delta spec 写得越清楚，后续 design、tasks、实现和 verify 就越少靠猜。

## 下一步阅读

理解 delta spec 后，下一篇适合继续看 OpenSpec Schema：为什么有些团队会扩展 artifact DAG、模板和门禁，以及 schema 如何改变 artifact 顺序但不应该打乱职责边界。

## 参考资料

- [OpenSpec Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
- [OpenSpec Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
- [OpenSpec conventions spec](https://github.com/Fission-AI/OpenSpec/blob/main/openspec/specs/openspec-conventions/spec.md)
