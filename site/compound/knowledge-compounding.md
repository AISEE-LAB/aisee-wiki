---
title: 知识如何复利
permalink: /compound/knowledge-compounding/
createTime: 2026/05/30 00:00:00
---

# 知识如何复利

工程知识不会因为一次问题被解决就自动复利。只有当解决过程被写成可检索、可验证、可更新的结构化文档时，下一次相似问题才会变得更便宜。

Compound Engineering 里的 `/ce-compound` 和 `/ce-compound-refresh` 负责这条链路：前者捕获刚解决的问题，后者维护已经沉淀的知识，避免它们随着代码、流程和团队约定变化而漂移。

## 核心结论

知识复利有三个条件：

- 及时：问题刚解决时记录，调查路径、失败尝试和根因还清楚。
- 结构化：写入 `docs/solutions/`，带 frontmatter、problem_type、module、component、tags 等可检索字段。
- 可刷新：当代码、路径、约定或解决方案变化时，用 refresh 更新、合并、替换或删除旧知识。

如果只把经验留在聊天记录、PR 评论或脑海里，它不会自动进入下一次 Agent 的上下文，也不会被后续检索命中。

## 知识复利闭环

<FlowExplainer
  mode="timeline"
  eyebrow="Knowledge Compounding"
  title="从一次解决到团队资产"
  description="知识复利从刚解决的问题开始：提取上下文和解法，写成带 frontmatter 的 solution doc，让未来 research 命中；当知识过期时，再用 refresh 维护它。"
  :stages="[
    {
      id: 'solve',
      title: '解决问题',
      description: '先有真实问题、调查路径和验证过的解决方案。',
      items: [
        {
          id: 'fresh-context',
          title: 'fresh context',
          description: '症状、失败尝试、根因、修复和验证还在上下文里。',
          status: 'active',
          accent: '新鲜',
        },
      ],
    },
    {
      id: 'compound',
      title: '写入知识库',
      description: '把一次解决整理成结构化 solution doc。',
      items: [
        {
          id: 'ce-compound',
          title: '/ce-compound',
          description: '提取问题、方案、frontmatter、分类、相关文档和可发现性。',
          status: 'default',
          accent: '沉淀',
        },
        {
          id: 'solution-doc',
          title: 'docs/solutions',
          description: '按 problem_type 分类，使用 YAML frontmatter 支持未来检索。',
          status: 'default',
          accent: '结构',
        },
      ],
    },
    {
      id: 'reuse',
      title: '未来复用',
      description: '下次计划、实现或评审前，research agents 可以命中过往经验。',
      items: [
        {
          id: 'future-search',
          title: 'future search',
          description: '按 module、component、tags、symptoms、root_cause 或 problem_type 检索。',
          status: 'done',
          accent: '可发现',
        },
      ],
    },
    {
      id: 'refresh',
      title: '持续刷新',
      description: '知识随着系统变化被更新，而不是静静过期。',
      items: [
        {
          id: 'ce-refresh',
          title: '/ce-compound-refresh',
          description: '检查漂移、重复、过期、重叠和替代方案。',
          status: 'risk',
          accent: '维护',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'fresh-context',
      to: 'ce-compound',
      label: '趁上下文新鲜',
      type: 'next',
    },
    {
      from: 'ce-compound',
      to: 'solution-doc',
      label: '结构化写入',
      type: 'depends',
    },
    {
      from: 'solution-doc',
      to: 'future-search',
      label: '未来可检索',
      type: 'next',
    },
    {
      from: 'future-search',
      to: 'ce-refresh',
      label: '发现漂移时刷新',
      type: 'gate',
    },
    {
      from: 'ce-refresh',
      to: 'solution-doc',
      label: '更新知识库',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '刚解决',
      description: '上下文最完整',
    },
    {
      status: 'done',
      label: '可复用',
      description: '未来能被发现',
    },
    {
      status: 'risk',
      label: '防漂移',
      description: '持续维护准确性',
    },
  ]"
/>

这条闭环的重点是：solution doc 不是复盘纪念品，而是未来 research、plan、review 和 debugging 的输入。

## `/ce-compound` 负责捕获刚解决的问题

`/ce-compound` 适合在问题刚解决后使用。此时上下文最完整：你还记得症状是什么，哪些尝试无效，真正根因是什么，最后的修复为什么成立。

它要产出的不是聊天摘要，而是一篇可复用的 solution doc：

| 内容 | 作用 |
|---|---|
| Problem / Context | 说明这个问题或知识从哪里来。 |
| Symptoms / Applies When | 帮未来检索判断“我现在的问题是不是同一类”。 |
| What Didn't Work | 避免团队重复走失败路径。 |
| Solution / Guidance | 记录真正可执行的修复或实践。 |
| Why This Works | 解释根因和机制，避免只记住表面操作。 |
| Prevention / When to Apply | 把一次修复变成未来约束。 |
| Related | 连接相关 issue、docs、pattern 或旧 learning。 |

一次解决如果没有这些结构，未来很难复用。只记“当时改了某个文件”不够，下一次问题可能出现在不同文件，但根因相同。

## `docs/solutions/` 的结构

`docs/solutions/` 是知识复利的存放位置。它不是普通文章目录，而是面向检索和维护的知识库。

每篇 solution doc 都应带 YAML frontmatter。核心字段包括：

| 字段 | 作用 |
|---|---|
| `module` | 标记影响的模块或领域。 |
| `date` | 记录文档创建日期，便于判断时效。 |
| `problem_type` | 决定它属于 bug track 还是 knowledge track。 |
| `component` | 标记涉及的组件类型。 |
| `severity` | 帮未来判断风险级别。 |
| `tags` | 提供额外搜索关键词。 |
| `category` | 对应 `docs/solutions/` 下的分类目录。 |

这些字段的价值不在于“文档更正式”，而在于它们能被 research agent 快速过滤。未来有人做相似任务时，可以先按 `module`、`tags`、`problem_type` 或 `component` 找到相关知识，而不是从长篇聊天记录里猜。

## Bug Track 和 Knowledge Track

`problem_type` 决定一篇 solution doc 属于哪条轨道。

| Track | 适合记录 | 典型 `problem_type` | 关键字段 |
|---|---|---|---|
| Bug track | 已诊断并修复的缺陷、失败、错误。 | `build_error`、`test_failure`、`runtime_error`、`performance_issue`、`security_issue`、`ui_bug`、`logic_error` | `symptoms`、`root_cause`、`resolution_type` |
| Knowledge track | 实践、模式、约定、工具决策、流程改进、文档缺口。 | `best_practice`、`documentation_gap`、`workflow_issue`、`developer_experience`、`architecture_pattern`、`design_pattern`、`tooling_decision`、`convention` | `applies_when` 可选，重点是 guidance 和适用条件 |

这一区分很重要。Bug track 需要明确症状、根因和修复类型；knowledge track 更关注在什么场景下应该采用某个实践。把两者混在一起，会让未来检索结果变得含糊。

## 分类和可发现性

`problem_type` 还会映射到目录分类。例如：

| `problem_type` | 目录 |
|---|---|
| `build_error` | `docs/solutions/build-errors/` |
| `test_failure` | `docs/solutions/test-failures/` |
| `runtime_error` | `docs/solutions/runtime-errors/` |
| `performance_issue` | `docs/solutions/performance-issues/` |
| `documentation_gap` | `docs/solutions/documentation-gaps/` |
| `architecture_pattern` | `docs/solutions/architecture-patterns/` |
| `tooling_decision` | `docs/solutions/tooling-decisions/` |
| `convention` | `docs/solutions/conventions/` |

目录只是第一层索引。真正的可发现性来自组合字段：标题、module、component、tags、symptoms、root_cause、applies_when 和正文中的具体文件或概念。

好的 solution doc 应该让未来维护者通过不同入口都能找到它：有人搜错误症状，有人搜模块名，有人搜工作流，有人搜 problem_type。

## `/ce-compound-refresh` 防止知识漂移

知识写下来以后不会永远正确。代码会重构，文件会移动，框架会升级，团队约定会改变，旧 learning 可能开始误导人。

`/ce-compound-refresh` 负责维护这些文档。它会把候选文档和当前代码库、相关文档、重叠知识进行对照，然后做分类：

| 结果 | 含义 | 默认动作 |
|---|---|---|
| Keep | 仍然准确且有用。 | 不改文件，只报告它仍可信。 |
| Update | 核心方案仍正确，但路径、命名、引用或示例漂移。 | 原地更新。 |
| Consolidate | 多篇文档高度重叠且都正确。 | 合并到 canonical doc，删除被吸收文档。 |
| Replace | 旧方案已经误导，但有更好的新方案。 | 写入可信替代，移除旧文档。 |
| Delete | 文档不再有用、适用或独立。 | 删除文件，保留 git 历史。 |

Refresh 的原则是“让文档匹配现实”，不是让代码迁就旧文档。旧知识如果不维护，会比没有知识更危险，因为它会让未来 Agent 和维护者带着错误前提工作。

## 与 Research Agents 的关系

`/ce-compound` 写入知识，research agents 读取知识。

| 阶段 | 发生什么 |
|---|---|
| 解决后 | `/ce-compound` 把问题和解法写入 `docs/solutions/`。 |
| 下一次计划前 | `ce-learnings-researcher` 搜索相关 learnings，提醒团队不要重复踩坑。 |
| 下一次评审中 | review 流程可以把既有 solution 作为已知模式或风险提示。 |
| 发现冲突时 | 如果旧 learning 和当前代码或新解法冲突，触发 refresh 维护。 |

这就是知识复利的实际工作方式：不是每次都重新研究，而是先找团队已经付过成本的经验。

## 知识库示例

当前项目已有 `docs/solutions/documentation-gaps/openspec-column-content-playbook.md`，它记录了 OpenSpec 内容从占位页建设为系统正文时的收尾流程。

它属于 knowledge track：

| 字段 | 示例含义 |
|---|---|
| `problem_type: documentation_gap` | 记录的是文档内容建设经验，不是运行时 bug。 |
| `component: documentation` | 影响对象是文档内容和站点结构。 |
| `applies_when` | 标明什么时候需要使用这条经验。 |
| `tags` | 让未来关于 OpenSpec、VuePress、教程内容、archive gate 的工作能命中它。 |

这个例子说明，`docs/solutions/` 不只记录代码缺陷。流程、文档、工具、设计和协作经验，只要未来可复用，都可以成为 knowledge track。

## 常见误区

| 误区 | 问题 | 更好的做法 |
|---|---|---|
| 只写聊天总结 | 缺少可检索字段，未来难以命中。 | 写成带 frontmatter 的 solution doc。 |
| 只写最终方案 | 未来会重复尝试无效路径。 | 记录 What Didn't Work 或 Context。 |
| 把所有经验都写成 best practice | 分类太宽，搜索价值下降。 | 优先使用更窄的 `problem_type`。 |
| 从不刷新旧文档 | 旧知识会漂移，甚至误导实现。 | 发现路径、方案或约定变化时运行 refresh。 |
| 保留重复文档 | 两篇相似文档会慢慢互相矛盾。 | 明确 canonical doc，必要时 consolidate。 |
| 写入未验证猜测 | 下一次会把猜测当事实。 | 只沉淀已验证方案，推测写成风险或 open question。 |

知识复利不是“多写文档”。它要求每一篇文档都能被找到、被相信、被更新。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
