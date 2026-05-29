---
title: OpenSpec Schema 是什么
permalink: /openspec/schema/
createTime: 2026/05/29 00:00:00
---

# OpenSpec Schema 是什么

OpenSpec schema 不是业务规范本身，而是定义“一个 change 应该有哪些 artifacts、它们之间有什么依赖、用什么模板生成、什么时候可以进入实施”的工作流说明。

如果说 `openspec/specs/` 记录当前事实，`openspec/changes/` 承载一次变更，那么 schema 决定的是：这个变更工作区里应该出现哪些文件，以及这些文件怎样协作。

## 核心结论

Schema 解决的是工作流结构问题，不是替你决定业务需求。

| schema 定义 | 作用 | 不应该承担 |
|---|---|---|
| artifact 类型 | 规定 change 里有哪些文档或规格文件。 | 替代正文内容判断。 |
| artifact 依赖 | 规定哪些文件完成后才能生成下一类文件。 | 把团队锁死成瀑布流程。 |
| templates | 规定生成 artifact 时的结构和提示。 | 让所有项目写出一样的内容。 |
| apply / archive 规则 | 规定实施和归档前需要检查什么。 | 跳过真实验证或人工审查。 |

一个实用判断是：当团队反复发现默认 `proposal -> specs -> design -> tasks` 不够贴合工作方式时，才需要考虑 schema。否则先用默认 schema，把 spec 和 change 写清楚更重要。

## Schema DAG 图

<ClientOnly>
  <DiagramFigure
    src="/diagrams/openspec/schema-dag.svg"
    title="OpenSpec schema 定义 artifact DAG"
    caption="Schema 定义 artifacts、依赖关系、模板和实施入口。依赖表示哪些 artifact 会解锁后续工作，不代表所有团队都必须按僵硬阶段门推进。"
  />
</ClientOnly>

图里的 `spec-driven` 是 OpenSpec 内置默认 schema 的简化示意。OpenSpec CLI 对它的描述是 `proposal -> specs -> design -> tasks`。这里的顺序表达 artifact 的上下文依赖：先有变更意图，再写行为变化，再记录设计判断，最后拆成执行任务。

## Schema 定义什么

一个 schema 通常会定义 artifacts 列表。每个 artifact 至少需要回答几个问题：

- `id`：这个 artifact 的稳定标识是什么。
- `generates`：它会生成哪个文件或哪类文件。
- `requires`：它依赖哪些已完成 artifact。
- `template`：生成时使用哪个模板。
- `instruction`：生成时额外遵守哪些说明。

简化后的示例：

```yaml
name: spec-driven
artifacts:
  - id: proposal
    generates: proposal.md
    requires: []

  - id: specs
    generates: specs/**/*.md
    requires: [proposal]

  - id: design
    generates: design.md
    requires: [specs]

  - id: tasks
    generates: tasks.md
    requires: [design]
```

这段配置表达的是一张 DAG：`proposal` 是起点；`specs` 依赖 proposal；`design` 依赖行为变化；`tasks` 依赖设计判断。

## Artifact 依赖不是瀑布阶段

Schema 里的 `requires` 很容易被误解成“必须按死顺序开会审批”。更准确的理解是：它描述生成材料所需的上下文。

例如：

| 依赖关系 | 合理含义 |
|---|---|
| `specs` requires `proposal` | 先知道 change 范围，再写行为变化。 |
| `design` requires `specs` | 先知道行为如何变化，再做技术判断。 |
| `tasks` requires `design` | 任务应该受行为约束和实现判断共同影响。 |

这并不妨碍你在实现中回头修正 artifact。发现 spec 场景缺失，就回去补 spec；发现 design 过重，就更新 design；发现 tasks 拆分不合理，就调整 tasks。Schema 管的是“上下文依赖”，不是禁止学习和迭代。

## Templates 决定生成形状

Schema 里的模板会影响 AI 或工具生成 artifact 的结构。

例如一个 `proposal.md` 模板可以要求包含：

```markdown
## Why

## What Changes

## Impact
```

模板的价值是让团队稳定地得到可审查材料。它适合固化结构、问题清单、示例格式和写作边界。

模板不应该把一次 change 的真实内容写死。下面这种模板就不合适：

```markdown
## Implementation

Always create ExportService and ReportController changes.
```

它把特定实现方案塞进了通用模板。更好的模板应该提示“说明影响的接口、模块、数据和验证方式”，而不是预设所有 change 都改同一批文件。

## Apply gate 约束实施入口

Schema 除了定义 artifacts，也可以定义实施入口。常见形式是：

```yaml
apply:
  requires: [tasks]
  tracks: tasks.md
```

这表示进入 implementation 前，至少要有可执行的 `tasks.md`，并且实施进度主要跟踪这个文件。

Apply gate 的重点不是“有 tasks 就一定正确”，而是避免在上下文不完整时直接改系统。真正的正确性仍然要靠 spec、design、测试、构建、人工审查和 archive 前验证。

## 什么时候需要自定义 schema

大多数团队不需要一开始就自定义 schema。默认 `spec-driven` 已经覆盖常见 feature work。

适合自定义 schema 的情况：

| 场景 | 为什么可能需要 |
|---|---|
| 团队有稳定的前置研究阶段 | 需要在 proposal 前增加 research artifact。 |
| 工作对象不是代码功能 | 例如文档站、知识库、运维流程、数据治理。 |
| 审查需要额外材料 | 例如安全评审、迁移计划、发布检查清单。 |
| 默认 artifact 太重或太轻 | 需要裁剪、合并或增加 artifact。 |
| 多个项目需要复用同一流程 | 希望把模板和依赖关系版本化。 |

不适合自定义 schema 的情况：

- 只是某一次 change 比较特殊。
- 只是想绕过 proposal、spec 或 review。
- 团队还没有稳定工作方式，只是在探索。
- 默认 schema 的内容没写好，却试图用新 schema 解决写作质量问题。

Schema 是沉淀稳定流程的工具，不是逃避规范的捷径。

## AI SEE Wiki 的 schema 示例

本站使用的 schema 是项目级 `aisee-docsite-driven`，位于：

```text
openspec/schemas/aisee-docsite-driven/schema.yaml
```

它是一个文档站场景的示例。它没有把默认 `spec-driven` 的 `specs`、`design` 原样套到每次文档变更里，而是把文档站需要审查的内容拆成：

| Artifact | 文件 | 职责 |
|---|---|---|
| `proposal` | `proposal.md` | 说明为什么改、改哪些内容、不改什么、成功标准。 |
| `doc-change` | `doc-change.md` | 描述本次文档差异、页面影响、导航影响、归档回写要求。 |
| `tasks` | `tasks.md` | 把文档差异转成写作、配置、链接、构建和归档清单。 |

它的依赖关系可以概括为：

```text
proposal -> doc-change -> tasks -> apply
```

这个例子说明了 schema 的正确用途：不是改变 OpenSpec 的核心概念，而是把 artifact DAG 调整到工作对象上。对于文档站，最关键的不是“某个业务能力的 delta spec”，而是“本次页面和站点结构如何变化、归档时如何回写文档基线”。

## Schema 与项目配置的关系

OpenSpec 还有 `openspec/config.yaml`。它常用于设置默认 schema、注入项目上下文和 artifact 规则。

两者可以这样区分：

| 对象 | 解决的问题 |
|---|---|
| `openspec/config.yaml` | 当前项目默认用哪个 schema，以及给 AI 注入哪些项目规则。 |
| `openspec/schemas/<name>/schema.yaml` | 某个 workflow 具体有哪些 artifacts、依赖和模板。 |
| `openspec/schemas/<name>/templates/` | 每类 artifact 生成时的结构模板。 |

项目配置更像“这个项目怎么使用 OpenSpec”；schema 更像“这类工作流怎么组织 artifacts”。

## 使用和验证 schema

常见操作包括：

```bash
# 查看可用 schemas
openspec schemas

# 从默认 schema fork 一份项目级 schema
openspec schema fork spec-driven my-workflow

# 创建一个新的项目级 schema
openspec schema init research-first

# 验证 schema 结构和模板
openspec schema validate my-workflow

# 查看 schema 来自项目、用户目录还是内置包
openspec schema which my-workflow
```

验证 schema 时，重点检查：

- `schema.yaml` 语法是否正确。
- artifact id 是否稳定可读。
- `requires` 是否形成无环 DAG。
- 引用的模板是否存在。
- apply / archive 相关要求是否和团队流程一致。

这些检查能保证 schema 可用，但不能保证内容质量。内容质量仍然来自具体 artifacts 是否写清楚。

## 常见误区

| 误区 | 为什么有问题 |
|---|---|
| 一开始就设计复杂 schema | 团队还没形成稳定流程，schema 很快会变成负担。 |
| 用 schema 替代 spec 写作 | schema 只定义文件和依赖，不定义业务行为本身。 |
| 把 `requires` 当成僵硬审批流程 | 依赖是上下文解锁关系，不是禁止迭代。 |
| 在模板里写死具体实现方案 | 模板会污染所有 change，导致不同场景被迫套用同一方案。 |
| 忘记验证 schema | 模板路径、循环依赖或 artifact id 问题会影响后续生成。 |

好的 schema 应该让团队少解释流程，多审查内容。如果 schema 让大家花更多时间理解流程本身，它就可能过度设计了。

## 审查清单

设计或调整 schema 前，可以用这张清单检查：

| 检查项 | 判断标准 |
|---|---|
| 是否有稳定重复流程 | 至少多个 change 会复用同一 artifact 结构。 |
| artifact 职责是否清楚 | 每个 artifact 都回答不同问题，没有互相替代。 |
| 依赖是否必要 | `requires` 反映真实上下文需求，而不是形式主义顺序。 |
| 模板是否通用 | 模板约束结构和质量，不写死一次性实现。 |
| gate 是否可验证 | apply / archive 前置要求能被检查。 |
| 是否保留 OpenSpec 核心边界 | schema 扩展 workflow，不改变 specs、changes、archive 的基本职责。 |

## 下一步阅读

理解 schema 后，下一篇适合看 OpenSpec 的适用边界：哪些工作值得进入 OpenSpec，哪些只需要轻量记录；OpenSpec、aisee、Compound 和端到端 workflows 应该如何分工。

## 参考资料

- [OpenSpec Concepts](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
- [OpenSpec Customization](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md)
- [OpenSpec CLI](https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md)
- [OpenSpec opsx](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)
