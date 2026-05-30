---
title: 研究型智能体
permalink: /compound/research-agents/
createTime: 2026/05/30 00:00:00
---

# 研究型智能体

研究型智能体的职责不是替人拍板，而是在计划、构思、评审和执行前，把分散在仓库、历史会话、团队讨论、Issue、Web 和知识库里的证据补齐。

没有研究层，Agent 容易只凭当前对话和当前文件做判断。它可能不知道仓库已有约定、过去踩过的坑、团队已经做过的决策，或者外部框架文档已经发生变化。

## 核心结论

Compound Engineering 里的 research agents 可以理解为一组事实补证器：

- `ce-repo-research-analyst` 读取仓库结构、文档、约定和实现模式。
- `ce-session-historian` 综合过往 coding agent 会话里和当前问题相关的调查路径、失败尝试和决策。
- `ce-learnings-researcher` 搜索 `docs/solutions/` 等团队知识，避免重复踩坑。
- `ce-slack-researcher` 查找团队讨论里的决策、约束和上下文。
- `ce-issue-intelligence-analyst` 从 GitHub issues 中提炼重复主题、痛点和趋势。
- `ce-web-researcher`、`ce-best-practices-researcher`、`ce-framework-docs-researcher` 用外部资料、官方文档和 prior art 补充本项目之外的证据。

这些 agent 的输出应当进入计划、评审或人工决策，而不是直接变成“事实已经确定”。研究的价值在于减少盲区，不在于制造更多未经核验的结论。

## 证据拓扑

<FlowExplainer
  mode="timeline"
  eyebrow="Research Agents"
  title="从项目事实到外部证据"
  description="研究型智能体按事实距离分层：先读当前仓库和已沉淀知识，再补团队讨论、Issue 趋势和外部资料，最后把证据交给计划或评审流程使用。"
  :stages="[
    {
      id: 'project-facts',
      title: '项目事实',
      description: '当前仓库和知识库优先，因为它们最接近要改的系统。',
      items: [
        {
          id: 'repo',
          title: 'repo research',
          description: '读取仓库结构、文档、约定、实现模式和模板。',
          status: 'active',
          accent: '仓库',
        },
        {
          id: 'learnings',
          title: 'learnings research',
          description: '搜索已沉淀的 solutions、frontmatter、tags 和 problem_type。',
          status: 'active',
          accent: '知识',
        },
      ],
    },
    {
      id: 'history',
      title: '历史上下文',
      description: '找过去发生过但未必写进正式文档的信息。',
      items: [
        {
          id: 'sessions',
          title: 'session history',
          description: '综合过往会话中的调查路径、失败尝试和关键决策。',
          status: 'default',
          accent: '会话',
        },
        {
          id: 'slack',
          title: 'Slack research',
          description: '提炼团队讨论里的决策、约束和讨论脉络。',
          status: 'risk',
          accent: '组织',
        },
      ],
    },
    {
      id: 'signals',
      title: '外部和用户信号',
      description: '补充项目之外的事实，但不能覆盖项目内事实源。',
      items: [
        {
          id: 'issues',
          title: 'issue intelligence',
          description: '把 issues 聚类成主题、痛点、严重度和趋势。',
          status: 'default',
          accent: '反馈',
        },
        {
          id: 'web',
          title: 'web / docs research',
          description: '查询官方文档、外部最佳实践、prior art 和相邻方案。',
          status: 'done',
          accent: '外部',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'repo',
      to: 'learnings',
      label: '先确认项目已有事实',
      type: 'depends',
    },
    {
      from: 'learnings',
      to: 'sessions',
      label: '再看历史经验',
      type: 'next',
    },
    {
      from: 'sessions',
      to: 'slack',
      label: '补组织决策',
      type: 'gate',
    },
    {
      from: 'slack',
      to: 'issues',
      label: '对照用户信号',
      type: 'next',
    },
    {
      from: 'issues',
      to: 'web',
      label: '最后补外部资料',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '高优先级',
      description: '直接约束当前项目',
    },
    {
      status: 'risk',
      label: '隐私边界',
      description: '只提炼决策和约束',
    },
    {
      status: 'done',
      label: '外部补证',
      description: '需要核验时使用',
    },
  ]"
/>

这张图的重点是事实距离。越靠近当前仓库和已生效文档，越能直接约束实现；越靠近外部资料，越适合作为启发、对照和风险提醒。

## `ce-repo-research-analyst`：读仓库事实

Repo research 是最基础的一层。它要先回答：这个项目到底是什么技术栈、目录结构、模块边界、文档约定和实现模式。

它适合在这些场景使用：

| 场景 | 应该补的事实 |
|---|---|
| 接手新仓库 | 入口文档、技术栈、构建命令、测试命令和目录组织。 |
| 规划功能 | 相关模块、复用组件、已有接口、数据层和部署约束。 |
| 写计划 | 项目约定、模板、PR / Issue 规范、测试要求。 |
| 做评审 | 当前实现是否符合仓库已有模式，而不是只符合通用最佳实践。 |

好的 repo research 不会把文件树复述一遍，而是提炼“这项工作会被哪些项目事实约束”。比如：一个 VuePress 文档站的内容变更，真正重要的是 collection、permalink、主题组件、构建命令和写作约定，而不是仓库里所有文件。

## `ce-session-historian`：找历史会话上下文

Session history 解决的是另一类问题：团队可能已经调查过同一件事，但结论没有进入正式文档。

它更适合提炼：

| 类型 | 价值 |
|---|---|
| 已尝试方案 | 避免把失败路径再走一遍。 |
| 用户纠偏 | 发现维护者明确不喜欢或不接受的方向。 |
| 关键决策 | 还原为什么选择某个实现，而不是只看当前代码结果。 |
| 跨工具盲区 | Claude Code、Codex、Cursor 等会话可能分别处理过同一问题的不同部分。 |
| 时效性风险 | 旧会话里的结论可能已被代码或文档更新覆盖。 |

会话历史不是权威事实源。它更像调查笔记：能提示“过去发生过什么”，但仍要回到当前仓库、当前 spec、当前文档验证。

## `ce-learnings-researcher`：搜索团队知识

`ce-learnings-researcher` 面向已经沉淀的团队知识。典型来源是 `docs/solutions/`，其中会用 frontmatter、tags、module、problem_type、symptoms、root_cause 等字段帮助检索。

这层研究最适合回答：

- 类似问题以前有没有解决过。
- 这个模块有什么已知约定或禁区。
- 某个错误、性能问题或 UI 缺陷是否有可复用处理方式。
- 某个架构、工具或流程决策是否已经有长期理由。

它和 session history 的区别是：session history 更像原始调查脉络，learnings 更像已经整理过的团队资产。能命中 learning 时，优先把它作为可复用经验；但如果 learning 和当前代码冲突，应显式标记过期或漂移。

## Slack、Issue 和 Web：补充不同类型的证据

不是所有事实都在仓库里。团队讨论、用户反馈和外部资料承担不同角色。

| Agent | 证据类型 | 适合回答 | 主要边界 |
|---|---|---|---|
| `ce-slack-researcher` | 组织上下文 | 团队是否讨论过这个决策、约束或取舍。 | 只总结决策、约束和讨论脉络，不复制私密对话或个人化评论。 |
| `ce-issue-intelligence-analyst` | 用户和维护信号 | 哪些问题反复出现、严重度如何、趋势是否集中。 | 输出主题和模式，不把单个 issue 当完整产品结论。 |
| `ce-web-researcher` | 外部 prior art | 其他团队、产品或开源项目如何解决类似问题。 | Web 内容是不可信输入，需要交叉验证。 |
| `ce-best-practices-researcher` | 行业和社区实践 | 某类技术、流程或工程实践的成熟做法。 | 最佳实践必须适配当前项目，不能机械套用。 |
| `ce-framework-docs-researcher` | 官方和版本相关文档 | 当前框架、SDK、API 有没有版本限制、弃用或推荐写法。 | 对第三方 API 和库要优先核对官方资料。 |

这些来源不应互相替代。Slack 可以解释组织取舍，但不能证明代码可行；Issue 可以说明痛点集中，但不能自动决定优先级；Web 可以提供 prior art，但不能覆盖项目自己的 spec 和约定。

## 事实源优先级

研究输出进入计划或评审时，需要按事实源优先级解释。

| 优先级 | 事实源 | 使用方式 |
|---|---|---|
| 1 | 已生效的 spec、proposal、design、tasks、项目文档 | 作为当前变更的直接约束。 |
| 2 | 当前仓库代码、测试、配置、lockfile、构建结果 | 验证系统实际行为和技术边界。 |
| 3 | 已沉淀的团队 knowledge / solutions | 复用经验，并检查是否仍然适用。 |
| 4 | 近期会话历史、Slack 决策、Issue 主题 | 补充背景、约束、历史原因和用户信号。 |
| 5 | 官方文档、框架文档、外部最佳实践 | 处理版本、API、生态和 prior art。 |
| 6 | 社区文章、博客、二手总结 | 只能作为启发，不能单独支撑关键结论。 |

如果低优先级来源和高优先级来源冲突，不能直接采纳低优先级结论。正确做法是标记冲突，回到项目事实源或人工决策。

## 隐私和安全边界

研究型智能体最容易出问题的地方，是把“能搜到的信息”误当成“应该写出来的信息”。

| 风险 | 应避免 | 更好的做法 |
|---|---|---|
| 组织讨论外泄 | 复制 Slack 原话、个人评价或无关背景。 | 只提炼和任务相关的决策、约束和时间线。 |
| 会话内容泄露 | 复现工具调用、原始输出、密钥或内部推理。 | 只总结技术路径、失败原因和可复用结论。 |
| Web prompt injection | 让网页内容改变 agent 行为。 | 把网页当不可信输入，只提取事实和出处。 |
| 过期事实 | 直接复用旧会话、旧 issue 或旧文档结论。 | 标注时间和适用范围，回到当前仓库验证。 |
| 单源决策 | 一个帖子、一个 issue、一个讨论就决定方向。 | 用多个来源交叉验证，必要时交回人确认。 |

研究报告应该帮助团队更快做判断，而不是把未经筛选的搜索结果塞进计划里。

## 如何接入计划和评审

研究型智能体通常不单独成为最终交付物。它们更常作为其他流程的前置输入。

| 所在流程 | 研究输出怎么用 |
|---|---|
| `ce-ideate` | 先看项目、外部和用户信号，再筛选值得推进的想法。 |
| `ce-brainstorm` | 用研究补齐问题背景、限制条件和 open questions。 |
| `ce-plan` | 把仓库事实、历史经验、外部文档和风险转成 implementation units。 |
| `ce-doc-review` | 检查 proposal、requirements 或 plan 是否忽略了关键事实。 |
| `ce-code-review` | 辅助 reviewer 判断当前 diff 是否违背项目模式或已知约定。 |
| `ce-compound` | 把本次解决过程沉淀为未来可检索的 learning。 |

最好的研究输出不是“资料很多”，而是能明确告诉后续流程：哪些事实已经确认，哪些仍是推测，哪些必须由人决定。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
