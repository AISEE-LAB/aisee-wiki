---
title: Spec 粒度设计
permalink: /openspec/spec-granularity/
createTime: 2026/05/29 00:00:00
---

# Spec 粒度设计

OpenSpec 的 spec 不是越大越完整，也不是越细越专业。合适的 spec 粒度，应该让行为边界清楚、变更容易审查、并行 change 不容易互相踩踏。

这篇讨论如何决定 spec 的边界。这里的“项目级、模块级、能力级”不是强制目录层级，而是三种判断尺度：一个行为约束到底应该放在全局约束里、某个业务领域里，还是某个独立能力里。

## 核心结论

Spec 粒度的核心问题是：谁会依赖这条行为，谁会维护这条行为，谁会因为这条行为变化而受到影响。

| 粒度 | 适合记录 | 不适合记录 |
|---|---|---|
| 项目级 | 跨多个模块都必须遵守的全局行为约束。 | 某个页面、接口或小功能的细节。 |
| 模块级 | 一个业务领域或技术边界内的稳定行为。 | 横跨多个模块的统一规则。 |
| 能力级 | 可以长期独立维护和理解的具体行为。 | 需要统一维护的领域规则。 |

一个实用判断是：如果未来某个 change 修改这条行为，审查者能不能快速知道应该看哪个 spec。如果答案是否定的，粒度通常需要调整。

## 粒度关系图

<FlowExplainer
  mode="timeline"
  eyebrow="Spec granularity"
  title="从全局约束到独立能力"
  description="Spec 的边界应该顺着行为影响范围收敛：跨域规则放在更高层，领域行为放在模块边界内，独立能力放在可长期维护的位置。"
  :stages="[
    {
      id: 'project',
      title: '项目级',
      description: '跨多个区域共同遵守。',
      items: [
        {
          id: 'project-spec',
          title: '全局约束',
          description: '例如审计规则、权限原则、兼容性约束、数据治理。',
          status: 'active',
          accent: '影响全局',
        },
      ],
    },
    {
      id: 'module',
      title: '模块级',
      description: '围绕一个领域或边界维护。',
      items: [
        {
          id: 'module-spec',
          title: '领域行为',
          description: '例如报表、订单、搜索、通知、计费。',
          status: 'default',
          accent: '稳定边界',
        },
      ],
    },
    {
      id: 'capability',
      title: '能力级',
      description: '可以被长期独立维护。',
      items: [
        {
          id: 'capability-spec',
          title: '具体能力',
          description: '例如 CSV 导出、筛选保存、批量邀请、搜索高亮。',
          status: 'risk',
          accent: '独立维护',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'project-spec',
      to: 'module-spec',
      label: '全局规则约束领域行为',
      type: 'depends',
    },
    {
      from: 'module-spec',
      to: 'capability-spec',
      label: '领域边界决定能力归属',
      type: 'depends',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '全局约束',
      description: '改动影响面最大',
    },
    {
      status: 'default',
      label: '领域边界',
      description: '长期维护主体',
    },
    {
      status: 'risk',
      label: '独立能力',
      description: '适合长期维护',
    },
  ]"
/>

这张图不是要求你建立三层目录。OpenSpec 官方概念里，spec 通常按 domain、feature area、component 或 bounded context 组织。项目级、模块级、能力级只是帮助你判断：这条行为应该由多大的边界承载。

## 先看行为归属

拆 spec 时，不要先问“目录怎么分”，而要先问行为属于谁。

如果一条 requirement 描述的是所有模块都要遵守的规则，它就不适合塞进某个局部能力。例如：

```text
所有写操作都必须记录审计日志。
```

这类规则影响多个领域和多个实现位置，更接近项目级约束。它不应该被隐藏在某个具体页面或局部能力 spec 里。

如果一条 requirement 只描述某个领域的稳定行为，它应该放在该领域 spec 中。例如：

```text
系统必须允许用户在报表列表中按时间范围筛选数据。
```

这条行为属于报表领域。未来增加导出、保存筛选条件、批量操作时，都可以回到报表 spec 里判断是否保持一致。

如果一条 requirement 描述的是某个长期存在、边界清楚、可以独立理解的能力，就可以考虑能力级 spec。例如：

```text
系统必须允许用户导出当前筛选条件下的 CSV 文件。
```

这条行为足够独立，可以单独写 requirement 和 scenario，也容易被单独维护。是否要把它提升为主 `specs/` 里的独立 capability，还要看它是不是一个长期能力，而不只是这一次 change 的交付单元。

## 三种粒度怎么选

### 项目级：约束跨模块规则

项目级 spec 适合记录全局行为和长期边界。它通常回答：

- 哪些规则所有模块都必须遵守。
- 哪些行为会影响站点、平台或系统的整体一致性。
- 哪些约束一旦变化，会牵动多个领域。

适合项目级的例子：

| 类型 | 示例 |
|---|---|
| 审计规则 | 所有写操作都必须记录审计日志。 |
| 权限原则 | 敏感操作必须检查当前用户权限。 |
| 兼容性约束 | 公共 API 必须保持向后兼容，破坏性变更必须显式声明。 |
| 数据治理 | 用户数据导出必须遵守脱敏或保留期规则。 |

项目级 spec 不应该变成所有需求的总仓库。如果一个 requirement 只影响一个领域，把它放进项目级 spec 会让后续审查变慢。

### 模块级：承载稳定领域

模块级 spec 适合记录一个领域内长期稳定的行为边界。这里的“模块”可以是业务域、前端区域、服务组件或数据管道，不一定等于代码目录。

适合模块级的情况：

- 多个能力共享同一组概念或状态。
- 多个 change 会持续修改同一领域。
- 行为需要被该领域的维护者长期理解。
- 场景之间存在明显的业务或技术关联。

例如报表模块可以包含筛选、排序、分页、导出、权限可见性等 requirements。它们可以分属不同 change，但长期都围绕“报表列表如何工作”这个领域维护。

模块级 spec 的风险是边界过大。如果一个 spec 里同时出现报表、通知、计费、用户管理等互不相关的 requirements，说明它已经退化成需求仓库，而不是行为契约。

### 能力级：承载独立行为

能力级 spec 适合描述边界清楚、长期存在、可以独立理解的行为。它通常回答：

- 这个能力触发条件是什么。
- 用户或下游系统能观察到什么结果。
- 成功、失败、边界状态如何表现。
- 它是否值得作为一个长期 capability 被单独维护。

例如“导出当前筛选结果”“保存搜索条件”“批量邀请成员”都可以有独立 requirement 和 scenario。如果这些行为会被长期演进、复用或反复修改，就适合作为独立 capability 维护。

能力级 spec 的风险是过细。如果你为每个按钮、每个字段、每个内部函数都创建独立 spec，审查者会在大量碎片中迷失。能力级的边界应该按可观察行为划分，而不是按 UI 元素或代码函数划分。

这里要和 change 拆分区分开：一次 change 可以只修改一个能力，也可以同时修改多个能力；但“这次是否单独交付”不自动等于“主 specs 是否必须拆成独立 capability”。

## 过粗的风险

Spec 过粗时，最明显的问题是审查成本上升。

| 表现 | 后果 |
|---|---|
| 一个 spec 承载多个互不相关领域 | change 很难判断应该修改哪里。 |
| requirement 写成大段业务说明 | scenario 无法直接验收。 |
| 所有行为都放在一个总 spec | 并行 change 容易冲突，归档时难合并。 |
| 全局约束和局部能力混在一起 | 维护者看不出行为的真实影响范围。 |

过粗的 spec 会让 OpenSpec 退回到“长文档管理”。它看起来完整，但不能有效支持 change 审查和实现验证。

一个修正办法是按影响范围切分：跨模块规则保留在项目级，领域行为下沉到模块级，长期独立演进的行为再拆到能力级。

## 过细的风险

Spec 过细时，问题不是写得不够认真，而是维护成本超过了收益。

| 表现 | 后果 |
|---|---|
| 每个 UI 控件都有独立 spec | requirement 之间缺少上下文，读者难以理解整体行为。 |
| 每个内部函数都有 spec | spec 变成实现文档，代码重构会频繁牵动规范。 |
| 一个完整能力被拆成太多小 spec | change 需要同时改多个文件，审查路径变长。 |
| 场景只覆盖微小步骤 | 验收时看不到用户真正关心的结果。 |

过细的 spec 容易让团队为了维护规范而维护规范。判断是否过细，可以问：这条 requirement 是否代表一个可观察行为？如果只是内部步骤，它更适合进入 design 或 tasks。

## 与并行 change 的关系

Spec 粒度会直接影响并行 change。

当粒度过粗时，多个 change 容易同时修改同一个大 spec。即使它们改的是不同能力，归档时也会发生合并冲突，审查者还需要理解整份大 spec 的上下文。

当粒度过细时，一个 change 可能需要修改很多 spec。每个 delta spec 看起来都很小，但整体审查成本反而变高，也更容易漏掉跨文件一致性。

合适的粒度应该让多数 change 命中一个主要 spec，必要时再引用少量相关 spec。可以用下面的经验判断：

| 并行场景 | 粒度建议 |
|---|---|
| 多个 change 长期独立修改同一领域下的不同能力 | 考虑把主 spec 继续拆到能力级，减少归档时对同一主 spec 的竞争。 |
| 多个 change 修改完全不同领域 | 拆成不同领域 spec，减少归档冲突。 |
| 一个 change 同时修改多个领域 | 在 proposal 和 design 中明确跨域影响，不要强行塞进单一 spec。 |
| 一个全局规则影响多个模块 | 使用项目级 spec，并让各模块 spec 遵守该约束。 |

这也是为什么 spec 边界不是一次定死的。随着系统演进，某些能力会从模块 spec 中拆出来，某些过细的 spec 也可能合并回领域 spec。

delta spec 在这里承担的是另一层职责：它描述某次 change 对主 spec 的增量修改，而不是替代主 spec 的长期边界设计。主 spec 负责“系统长期如何组织能力”，delta spec 负责“这次 change 改了什么行为”。

## 命名和目录建议

OpenSpec 的主 specs 通常放在：

```text
openspec/specs/<capability>/spec.md
```

这里的 `<capability>` 应该使用稳定、可读、能表达行为边界的名称。不要把它写成一次性任务名，也不要写成内部实现名。

| 命名方式 | 评价 |
|---|---|
| `auth`、`reports`、`notifications` | 好，表达稳定领域。 |
| `csv-export`、`saved-filters` | 可以，适合独立能力。 |
| `fix-report-bug` | 不好，像 change 名，不像长期 spec。 |
| `ExportService` | 不好，绑定内部实现。 |

如果一个 spec 名称读起来像“当前这次要改什么”，它可能更适合作为 change 名。如果它读起来像“系统长期支持什么行为”，它更适合作为 spec 名。

## 审查清单

拆分或调整 spec 前，可以用这张清单检查：

| 问题 | 判断 |
|---|---|
| 这条行为影响几个领域？ | 影响越广，越不应该藏在局部能力里。 |
| 谁会长期维护它？ | 维护主体清晰，spec 边界才稳定。 |
| 未来 change 会怎么修改它？ | 多数 change 应该命中一个主要 spec。 |
| 它是否是可观察行为？ | 如果只是内部步骤，应移到 design 或 tasks。 |
| 拆分后是否更容易审查？ | 如果只是文件更多但理解更慢，就不是好拆分。 |

Spec 粒度没有一次到位的答案。好的粒度来自持续归档和复盘：每次 change 完成后，观察 spec 是否仍然容易理解、容易修改、容易验证。

## 参考资料

- [OpenSpec Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
- [OpenSpec Workflows](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
- [OpenSpec conventions spec](https://github.com/Fission-AI/OpenSpec/blob/main/openspec/specs/openspec-conventions/spec.md)
