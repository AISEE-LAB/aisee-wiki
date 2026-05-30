---
title: 多智能体评审边界
permalink: /compound/review-boundaries/
createTime: 2026/05/30 00:00:00
---

# 多智能体评审边界

多智能体评审应该按风险使用。它适合处理跨模块、权限、数据、安全、性能、用户关键路径和高不确定性任务；但如果所有改动都走完整评审，流程会变慢，噪声也会变多。

边界意识很重要：多智能体能扩大风险覆盖，但不能替代产品取舍、组织决策、设计系统授权和人对风险的最终接受。

## 核心结论

选择评审强度时，先看两件事：

- 这次变更的失败代价有多高。
- 当前事实源是否足够清楚。

如果失败代价高，或者事实源不清楚，就值得引入更多视角。如果只是低风险、局部、可回滚的小改动，轻量评审或普通检查通常更合适。

## 选择路径

<FlowExplainer
  mode="timeline"
  eyebrow="Review Boundaries"
  title="按风险选择评审强度"
  description="多智能体评审不是默认全开。先判断变更是否会影响关键路径、数据、安全或范围，再决定使用 no review、lightweight、document review 还是 full review。"
  :stages="[
    {
      id: 'scope',
      title: '先看影响面',
      description: '影响面决定是否需要多视角覆盖。',
      items: [
        {
          id: 'small-change',
          title: '局部低风险',
          description: '文案、轻量样式、无行为变化、容易回滚。',
          status: 'done',
          accent: '轻量',
        },
        {
          id: 'wide-change',
          title: '跨模块或关键路径',
          description: '触达权限、数据、API、迁移、支付、用户主流程。',
          status: 'risk',
          accent: '完整',
        },
      ],
    },
    {
      id: 'source',
      title: '再看事实源',
      description: '事实源越不清楚，越应该先审文档或补研究。',
      items: [
        {
          id: 'clear-source',
          title: '事实源清楚',
          description: 'spec、plan、设计稿、验收和测试边界明确。',
          status: 'default',
          accent: '可执行',
        },
        {
          id: 'unclear-source',
          title: '事实源不清',
          description: '目标、范围、验收、设计状态或技术约束仍然模糊。',
          status: 'risk',
          accent: '先审文档',
        },
      ],
    },
    {
      id: 'review-mode',
      title: '选择模式',
      description: '不同风险对应不同评审成本。',
      items: [
        {
          id: 'no-review',
          title: 'no review',
          description: '无需启动额外评审，只做基础验证。',
          status: 'done',
          accent: '跳过',
        },
        {
          id: 'lightweight',
          title: 'lightweight review',
          description: '快速检查 diff、构建、链接、截图或关键断言。',
          status: 'default',
          accent: '轻审',
        },
        {
          id: 'document-review',
          title: 'document review',
          description: '实现前先审 requirements、plan、spec 或设计决策。',
          status: 'risk',
          accent: '前置',
        },
        {
          id: 'full-review',
          title: 'full review',
          description: '启用多 persona、research、design 或 deployment 视角。',
          status: 'active',
          accent: '完整',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'small-change',
      to: 'lightweight',
      label: '低风险走轻量',
      type: 'next',
    },
    {
      from: 'wide-change',
      to: 'full-review',
      label: '高风险走完整',
      type: 'gate',
    },
    {
      from: 'unclear-source',
      to: 'document-review',
      label: '先补事实源',
      type: 'depends',
    },
    {
      from: 'clear-source',
      to: 'lightweight',
      label: '事实清楚可简化',
      type: 'next',
    },
    {
      from: 'document-review',
      to: 'full-review',
      label: '实现后再验风险',
      type: 'next',
    },
  ]"
  :legend="[
    {
      status: 'done',
      label: '低风险',
      description: '不扩大流程',
    },
    {
      status: 'risk',
      label: '需前置',
      description: '先补事实或边界',
    },
    {
      status: 'active',
      label: '高风险',
      description: '完整多视角覆盖',
    },
  ]"
/>

这套选择路径的目标，是让 review 成本和风险相匹配。低风险任务不要被流程拖慢，高风险任务也不要只靠单一视角放行。

## 选择矩阵

| 模式 | 适合场景 | 不适合场景 | 输出 |
|---|---|---|---|
| No review | 纯格式、无行为变化、已经有自动化校验覆盖的小改动。 | 影响用户行为、权限、数据或公共 API。 | 构建、格式、链接或最小验证结果。 |
| Lightweight review | 局部样式、文案、低风险文档、小范围组件调整。 | 跨模块行为、状态复杂、回滚成本高。 | 少量人工检查点或快速 code review。 |
| Document review | requirements、plan、spec、proposal、设计决策还没稳定。 | 已经进入实现且事实源明确的小修。 | 自洽性、范围、可行性、验收和 open questions。 |
| Full multi-agent review | 跨模块、权限、数据、安全、迁移、性能、用户关键路径。 | 低风险小改、临时草稿、已被自动化完整覆盖的机械修改。 | 分 persona findings、置信度、去重、路由和人工决策项。 |
| Specialized review | UI、Figma、迁移、发布、框架版本、组织上下文等专项风险。 | 没有相关风险信号时全量启用。 | 设计差异、部署清单、官方文档约束或研究摘要。 |

矩阵不是静态规则。真正的判断点是：这次 review 能否发现自动化测试、普通人工检查或单 Agent 容易遗漏的风险。

## 适合完整 review 的场景

完整多智能体评审适合失败代价高、影响面广或认知负载大的任务。

| 场景 | 为什么值得完整 review |
|---|---|
| 跨模块改动 | 一个 reviewer 很容易只看自己熟悉的模块，漏掉边界影响。 |
| Auth / 权限 / 安全 | 安全问题通常不是语法错误，而是信任边界和异常路径错误。 |
| 数据迁移 / backfill | 需要同时看 schema、部署顺序、回滚、验证和生产数据风险。 |
| API / SDK / 类型契约 | 兼容性、版本、序列化和客户端行为需要专项视角。 |
| 性能和可靠性 | 需要关注复杂度、缓存、重试、超时、队列和退化路径。 |
| 用户关键路径 | 正确性、交互状态、可访问性和监控都可能影响真实用户。 |
| 大型 plan 或 requirements | 实现前就可能存在范围、可行性和验收风险。 |
| 外部依赖或第三方 API | 版本、弃用、限流、认证和安全边界需要事实核对。 |

这类场景中，多智能体的价值是把注意力分给不同风险维度，而不是让同一个通用 reviewer 试图一次看完所有问题。

## 适合轻量 review 的场景

轻量评审适合影响有限、回滚容易、事实源清楚的任务。

| 场景 | 建议检查 |
|---|---|
| 文案修正 | 链接、标题层级、术语一致性、构建结果。 |
| 局部样式调整 | 目标截图、移动端是否溢出、亮暗主题是否可读。 |
| 小范围文档补充 | frontmatter、permalink、侧边栏、事实源和构建。 |
| 明确 bug 的窄修 | 复现用例、修复点、回归测试。 |
| 机械替换 | 搜索范围、生成结果、格式检查和最小测试。 |

轻量不等于不负责。它的意思是用更小的检查集覆盖真实风险，而不是启动一整套与任务无关的角色。

## 先做文档 review 的场景

有些问题不应该等到代码阶段再审。只要事实源不清，先做文档评审通常更便宜。

| 信号 | 为什么先审文档 |
|---|---|
| 目标不清 | 代码写完也无法判断是否解决了正确问题。 |
| 范围边界模糊 | 实现容易不断扩张，review 时也无法判断哪些改动必要。 |
| 验收标准缺失 | 测试只能证明代码运行，不能证明需求完成。 |
| 设计状态缺失 | UI 实现阶段只能猜 loading、empty、error、移动端等状态。 |
| 安全或数据风险未写 | 实现末期才补信任边界和迁移策略，返工成本高。 |
| Open questions 未分级 | 阻塞问题和可延后问题混在一起，执行会被打断。 |

文档 review 的目标是把不确定性提前暴露。它不要求所有问题立刻解决，但必须区分“实现前必须确认”和“可以作为后续风险跟踪”。

## 不适合自动判断的内容

多智能体可以提出 evidence，但这些判断不能交给 Agent 自动决定。

| 判断类型 | 为什么不能自动决定 |
|---|---|
| 产品方向 | 需要目标用户、业务优先级和机会成本判断。 |
| 范围取舍 | 可能影响路线图、发布时间和团队承诺。 |
| 风险接受 | 安全、数据、迁移和发布风险需要责任主体确认。 |
| 品牌和设计系统例外 | 需要设计系统、品牌规范或真实用户研究支撑。 |
| 组织约束 | 可能来自排期、协作关系、合规、客户承诺或支持策略。 |
| 事实源冲突 | 低优先级来源不能自动覆盖已生效 spec 或项目文档。 |

这里的边界不是“Agent 不聪明”，而是责任边界。Agent 可以整理证据、提出选项、标出风险，但不能替团队承担决策后果。

## 过度 review 的代价

多智能体评审不是越多越好。过度使用会带来真实成本：

| 成本 | 具体表现 |
|---|---|
| 噪声增加 | 低相关 reviewer 产出大量边缘建议。 |
| 决策疲劳 | 用户需要处理太多低价值 finding。 |
| 交付变慢 | 小改动也进入复杂流程，反馈周期拉长。 |
| 责任模糊 | 团队把产品或范围取舍误交给 review 输出。 |
| 事实漂移 | 外部资料、旧会话或历史讨论压过当前项目事实源。 |

如果一项 review 的大部分输出都被忽略，通常不是用户不重视质量，而是评审强度选错了。

## 最小可用规则

可以用下面这组规则快速判断：

| 问题 | 选择 |
|---|---|
| 只是无行为变化的小改动吗？ | No review 或 lightweight review。 |
| 事实源、范围或验收还不清楚吗？ | 先做 document review。 |
| 涉及权限、数据、安全、迁移、支付或关键路径吗？ | Full multi-agent review。 |
| 涉及 UI、Figma 或设计系统对齐吗？ | 加 design review。 |
| 需要历史、组织或外部事实吗？ | 加 research agents。 |
| finding 需要产品、范围或风险取舍吗？ | 交回 human decision gate。 |

这组规则足够覆盖大多数日常工程任务。真正复杂的任务，可以在执行中逐步升级评审强度，而不是一开始就把所有角色全部打开。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
