---
title: 文档评审智能体
permalink: /compound/document-review-agents/
createTime: 2026/05/30 00:00:00
---

# 文档评审智能体

文档评审智能体的价值，是把风险前移到 proposal、requirements、plan、spec 阶段。等代码已经写完再发现目标矛盾、范围失控或计划不可执行，成本通常已经高了。

在 Compound Engineering 中，`ce-doc-review` 面向 requirements 和 plan 文档做多视角评审。它不是语法润色工具，也不是把文档改得更长；它要找的是会让后续实现、评审或验收出错的结构性问题。

## 核心结论

代码评审回答“这组变更有没有风险”，文档评审回答“这组变更开始之前，目标、范围、计划和约束是否已经说清楚”。

文档评审适合检查：

- requirements 是否真的说明了要解决什么问题。
- plan 是否能被执行者接手，而不是只给出愿望。
- proposal、spec、design、tasks 是否互相一致。
- 是否有安全、设计、产品、范围或可行性风险被藏在文档里。
- 哪些问题必须在实现前确认，哪些可以作为后续 open questions。

这类评审越早做越便宜。文档里一句模糊的“支持管理员配置权限”，到了实现阶段可能变成权限模型、审计、UI、API 和测试的一整串返工。

## 文档评审模型

<FlowExplainer
  mode="timeline"
  eyebrow="Document Review"
  title="把风险前移到实现之前"
  description="文档评审先识别文档类型，再用多个 reviewer 检查自洽性、可执行性、范围、安全、产品和设计风险，最后把结论回写到文档或 OpenSpec artifacts。"
  :stages="[
    {
      id: 'classify',
      title: '识别文档',
      description: '先判断这是 requirements、plan，还是 OpenSpec artifacts。',
      items: [
        {
          id: 'document-type',
          title: 'document type',
          description: '不同文档承担不同职责，不能用同一套问题审。',
          status: 'active',
          accent: '类型',
        },
      ],
    },
    {
      id: 'core-review',
      title: '基础评审',
      description: '所有文档都需要先过自洽性和可执行性。',
      items: [
        {
          id: 'coherence',
          title: 'coherence reviewer',
          description: '检查目标、要求、边界和结论是否互相矛盾。',
          status: 'risk',
          accent: '自洽',
        },
        {
          id: 'feasibility',
          title: 'feasibility reviewer',
          description: '检查计划是否能执行，是否缺关键依赖或验证。',
          status: 'risk',
          accent: '可行',
        },
      ],
    },
    {
      id: 'conditional-review',
      title: '条件视角',
      description: '按文档内容加入产品、范围、安全、设计和反向挑战视角。',
      items: [
        {
          id: 'product',
          title: 'product lens',
          description: '挑战问题 framing、优先级、机会成本和目标一致性。',
          status: 'default',
          accent: '产品',
        },
        {
          id: 'scope',
          title: 'scope guardian',
          description: '检查范围漂移、优先级混乱和非目标缺失。',
          status: 'default',
          accent: '范围',
        },
        {
          id: 'security-design',
          title: 'security / design lens',
          description: '检查信任边界、数据风险、UI/UX 决策和交互缺口。',
          status: 'default',
          accent: '专项',
        },
      ],
    },
    {
      id: 'write-back',
      title: '回写事实源',
      description: '把有效发现转成文档修正、open questions 或人工确认项。',
      items: [
        {
          id: 'artifact-update',
          title: 'artifact update',
          description: '回到 proposal、spec、design、tasks 或 requirements 中修正。',
          status: 'done',
          accent: '回写',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'document-type',
      to: 'coherence',
      label: '按职责审查',
      type: 'depends',
    },
    {
      from: 'coherence',
      to: 'feasibility',
      label: '先自洽再看执行',
      type: 'next',
    },
    {
      from: 'feasibility',
      to: 'scope',
      label: '发现范围风险',
      type: 'gate',
    },
    {
      from: 'scope',
      to: 'artifact-update',
      label: '结论回写文档',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '识别',
      description: '先明确文档职责',
    },
    {
      status: 'risk',
      label: '基础风险',
      description: '自洽性和可执行性',
    },
    {
      status: 'done',
      label: '回写',
      description: '修正文档或提出确认项',
    },
  ]"
/>

这套模型的关键，是先判断文档类型。requirements 文档负责“what”，plan 文档负责“how”，OpenSpec artifacts 又有 proposal、spec、design、tasks 的职责边界。混着审会产生很多噪声。

## 为什么文档也需要多视角 review

文档的问题经常不是错别字，而是“看起来合理，实际无法执行”。

| 文档风险 | 代码阶段会变成什么问题 |
|---|---|
| 目标和需求不一致 | 实现做完后才发现没有解决原问题。 |
| 范围边界不清 | diff 越改越大，review 时无法判断哪些改动必要。 |
| 验收标准模糊 | 测试只能证明代码跑过，不能证明需求完成。 |
| 计划缺依赖 | 实现中途才发现接口、数据、权限或设计稿缺失。 |
| 风险没有写出 | 安全、迁移、发布或回滚问题进入最后一刻。 |
| Open questions 没分级 | 阻塞问题和可延后问题混在一起。 |

文档评审把这些问题提前暴露。它不保证计划一定正确，但能让不确定性更早出现。

## Reviewer 分工

`ce-doc-review` 的 reviewer 可以分为基础视角和条件视角。

| Reviewer | 触发方式 | 主要看什么 | 典型 finding |
|---|---|---|---|
| Coherence | 默认 | 文档内部是否自洽，目标、范围、要求和结论是否冲突。 | 成功标准要求 A，但 scope 又把 A 排除。 |
| Feasibility | 默认 | 计划是否可执行，是否缺依赖、顺序或验证。 | implementation unit 没有测试目标，也没有可验收输出。 |
| Product Lens | 有可挑战的产品/目标判断 | 问题 framing、优先级、机会成本和目标-需求一致性。 | 需求列表没有服务于声明的核心目标。 |
| Scope Guardian | 范围复杂或优先级多 | 范围漂移、P0/P1 混乱、非目标缺失。 | nice-to-have 被写成必须项，且没有解释取舍。 |
| Security Lens | 涉及 auth、数据、API、集成 | 信任边界、权限、敏感数据和第三方风险。 | plan 新增外部回调，但没有说明认证和重放保护。 |
| Design Lens | 涉及 UI、流程、交互 | 用户流程、状态、响应式、可访问性和设计决策缺口。 | 表单只写提交成功，没有错误、空状态和加载状态。 |
| Adversarial Document Reviewer | 高风险或存在挑战面 | 压测文档前提、隐含假设、替代方案和反常路径。 | plan 没有 origin，直接把未经验证的需求当事实。 |

这些 reviewer 不应互相抢职责。比如 product lens 不负责写 UI 细节，security lens 不负责整理文档结构，scope guardian 不应把所有扩展都判为错误。

## Requirements 和 Plan 的审法不同

Requirements 和 plan 都是文档，但不能用同一套问题审。

| 文档类型 | 应重点检查 | 不应强求 |
|---|---|---|
| Requirements | 问题、用户、关键流程、成功标准、范围边界、待确认问题。 | 不要求写文件清单、技术方案或测试路径。 |
| Plan | 实施单元、依赖、技术决策、风险、验证、handoff。 | 不重新争论已经确认的产品前提。 |
| Proposal | 为什么做、做什么、不做什么、影响范围。 | 不塞入实现细节。 |
| Spec | 行为变化、场景、验收和边界条件。 | 不写成任务列表。 |
| Design | 方案、取舍、接口、数据流和风险。 | 不替代需求本身。 |
| Tasks | 可执行清单、顺序和验证要求。 | 不承担战略或产品论证。 |

如果文档评审没有先识别文档职责，就会出现两类错误：对 requirements 强求技术细节，或对 plan 重新挑战已经确认的产品方向。

## 如何回写到 OpenSpec artifacts

对 OpenSpec 驱动项目，文档评审的有效发现应回写到对应 artifact，而不是只停留在聊天记录或 review 报告里。

| 发现类型 | 回写位置 |
|---|---|
| 为什么做不清楚、非目标缺失 | `proposal.md` |
| 行为场景缺失、验收不明确 | delta specs |
| 技术方案、接口、数据流或风险不清 | `design.md` |
| 实施步骤、依赖和验证不完整 | `tasks.md` |
| 需求本身仍模糊 | requirements / brainstorm 文档 |
| 需要人工决策但暂未确认 | Open Questions 或 tasks 中的阻塞项 |

如果 review 发现和已生效 artifact 冲突，不能直接按 reviewer 建议改实现。正确做法是标记冲突，先更新事实源，再进入实现或执行同步。

## 人类必须确认什么

文档评审可以指出问题，但不能替代所有决策。

以下内容必须由人或项目事实源确认：

- 产品目标、优先级和机会成本。
- 用户体验、品牌规范和设计系统取舍。
- 安全、隐私、合规、发布和残余风险接受。
- 跨团队依赖、组织承诺和历史背景。
- 是否改变 OpenSpec change 的范围。

一个好的文档 review 不会假装这些问题已经被解决。它会把阻塞问题和可延后问题分开，让人更容易做判断。

## 常见误区

| 误区 | 问题 | 更好的做法 |
|---|---|---|
| 把文档 review 当润色 | 只改文字，不发现矛盾和风险。 | 先审职责、范围、可执行性，再改表达。 |
| 所有 reviewer 都看全部内容 | 输出重复，读者不知道谁负责什么。 | 按风险选择 reviewer，保留清晰边界。 |
| plan 阶段重新争论全部需求 | 让执行前置工作失去意义。 | 只在 plan 超出 origin 或缺少 origin 时挑战前提。 |
| 把 open questions 都留给实现 | 实现阶段才发现阻塞问题。 | 区分阻塞、可延后和人工确认项。 |
| review 结论不回写 | 下次仍然重复同样问题。 | 把有效发现写回 requirements 或 OpenSpec artifacts。 |

文档评审的目标，是让实现开始时更少猜测，而不是让文档显得更完整。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
