---
title: 设计与 UI 评审智能体
permalink: /compound/design-review-agents/
createTime: 2026/05/30 00:00:00
---

# 设计与 UI 评审智能体

设计与 UI 评审不是“看起来好不好”的主观评价。它要检查的是：设计决策、交互状态、视觉质量和实现对齐，是否真的支撑用户目标。

这类评审尤其适合前端页面、产品流程、设计系统组件、Figma 对齐和 AI 生成 UI。没有设计评审，Agent 很容易做出“能跑、能看，但不像一个认真设计过的产品”的界面。

## 核心结论

Compound Engineering 里的设计相关能力可以分成四层：

- `ce-design-lens-reviewer`：在 plan 或 requirements 阶段检查设计决策是否缺失。
- `ce-design-implementation-reviewer`：在 UI 写完后检查实现是否贴合 Figma、设计规范和交互状态。
- `ce-design-iterator`：当界面不够成熟时，用截图、分析、修改的循环做渐进打磨。
- `ce-figma-design-sync`：当目标是对齐 Figma 时，用设计截图、实现截图和具体差异推动同步修正。

它们不是同一个 reviewer 的不同名字。一个看“方案有没有设计风险”，一个看“实现有没有对齐设计”，一个做“迭代改进”，一个做“设计稿同步”。

## 设计评审链路

<FlowExplainer
  mode="timeline"
  eyebrow="Design Review"
  title="从方案设计到实现同步"
  description="设计与 UI 评审把风险拆到不同阶段：先检查计划是否缺设计决策，再检查实现是否贴合规范，最后通过迭代或 Figma 同步收敛视觉与交互质量。"
  :stages="[
    {
      id: 'plan',
      title: '方案阶段',
      description: '先确认交互和信息架构没有缺口。',
      items: [
        {
          id: 'design-lens',
          title: 'ce-design-lens-reviewer',
          description: '检查信息架构、用户流程、交互状态、响应式和 AI slop 风险。',
          status: 'active',
          accent: '设计决策',
        },
      ],
    },
    {
      id: 'implementation',
      title: '实现阶段',
      description: '页面写完后，检查实现和设计是否一致。',
      items: [
        {
          id: 'implementation-review',
          title: 'ce-design-implementation-reviewer',
          description: '比较 live UI 与 Figma / 设计规范的布局、颜色、间距、状态和响应式差异。',
          status: 'risk',
          accent: '实现对齐',
        },
      ],
    },
    {
      id: 'iterate',
      title: '迭代打磨',
      description: '当界面方向对但质感不够时，做小步改进。',
      items: [
        {
          id: 'iterator',
          title: 'ce-design-iterator',
          description: '用截图、分析、修改、再截图的循环逐步提升 UI。',
          status: 'default',
          accent: '打磨',
        },
      ],
    },
    {
      id: 'sync',
      title: '设计同步',
      description: '当目标是严格对齐设计稿时，进入同步修正。',
      items: [
        {
          id: 'figma-sync',
          title: 'ce-figma-design-sync',
          description: '从 Figma 和实现截图中定位差异，并推动代码修正。',
          status: 'done',
          accent: '同步',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'design-lens',
      to: 'implementation-review',
      label: '设计决策进入实现',
      type: 'depends',
    },
    {
      from: 'implementation-review',
      to: 'iterator',
      label: '实现可用后打磨',
      type: 'next',
    },
    {
      from: 'implementation-review',
      to: 'figma-sync',
      label: '需要严格对齐时同步',
      type: 'gate',
    },
  ]"
  :legend="[
    {
      status: 'active',
      label: '设计决策',
      description: '避免实现阶段猜交互',
    },
    {
      status: 'risk',
      label: '实现风险',
      description: '检查 UI 是否偏离设计',
    },
    {
      status: 'done',
      label: '收敛质量',
      description: '迭代或同步到可交付状态',
    },
  ]"
/>

这条链路的重点是阶段差异。计划阶段发现的是“还没定义清楚”，实现阶段发现的是“写出来和目标不一致”，迭代阶段处理的是“方向对，但还不够好”。

## `ce-design-lens-reviewer`：先看设计决策是否缺失

`ce-design-lens-reviewer` 常出现在文档评审里。它不做像素级视觉检查，而是看计划或 requirements 是否遗漏了会阻塞 UI 实现的设计决策。

它会关注：

| 维度 | 要检查的问题 |
|---|---|
| 信息架构 | 用户先看什么、后看什么？内容分组和导航模型是否清楚？ |
| 用户流程 | 入口、主路径、分支、退出和异常路径是否说明？ |
| 交互状态 | loading、empty、error、success、disabled、partial 等状态是否覆盖？ |
| 响应式与可访问性 | 是否说明移动端、键盘操作、读屏、触控目标等基本要求？ |
| 未决设计问题 | 是否出现“友好的界面”“支持筛选”这类无法直接实现的描述？ |
| AI slop 风险 | 是否只有通用卡片、渐变、图标圆圈，而没有产品特定的设计理由？ |

如果 plan 写了“用户可以筛选记录”，但没有说明筛选入口、空结果、清除条件、移动端布局和错误状态，design lens 就应该拦下来。否则实现者只能猜。

## `ce-design-implementation-reviewer`：检查实现是否贴合设计

`ce-design-implementation-reviewer` 更靠近实现后段。它通常比较 live UI 和 Figma / 设计规范，检查实际页面是否实现了设计意图。

它关注的不是“我更喜欢哪个”，而是可观察差异：

| 检查项 | 典型问题 |
|---|---|
| Layout | 主要区域宽度、对齐、层级、比例和响应式断点不一致。 |
| Spacing | padding、margin、gap、组件间距和设计稿偏离。 |
| Typography | 字号、字重、行高、字体 fallback、文字层级不一致。 |
| Color | 背景、文本、边框、状态色和设计 token 不匹配。 |
| Interaction states | hover、focus、active、disabled、loading 等状态缺失。 |
| Accessibility | 对比度、键盘焦点、语义和触控区域存在问题。 |

这类 reviewer 的输出应该具体到元素、现状、预期和影响。比如“按钮间距比设计稿大 12px，导致右侧操作区换行”，比“这个按钮看起来不太对”更有用。

## `ce-design-iterator`：用小步循环打磨界面

有些 UI 问题不是一次 review 能解决的。页面可能已经能用，但层级、节奏、留白、状态反馈或视觉重心还不够成熟。

`ce-design-iterator` 适合这种情况：先截取目标区域，再选择一两个最有影响的改动，修改后重新截图。它强调小步循环，而不是一次大改。

| 迭代原则 | 为什么重要 |
|---|---|
| 只截目标区域 | 避免整页截图带来无关噪声。 |
| 一次改一两个点 | 方便判断哪次改动真的改善了界面。 |
| 保留有效改动 | 不在每轮推翻前一轮已经成立的部分。 |
| 先结构后 polish | 先解决层级和布局，再处理动效、阴影、细节。 |
| 保持可访问性 | 视觉打磨不能牺牲可读性、对比度和键盘访问。 |

迭代打磨不应该变成无休止“再美一点”。如果已经找不到明确、可测、对用户有帮助的改进点，就该停。

## `ce-figma-design-sync`：把实现拉回设计稿

`ce-figma-design-sync` 适合目标很明确的场景：实现应该匹配 Figma。

它的工作方式通常是：

| 步骤 | 输出 |
|---|---|
| 读取设计 | 获取 Figma 节点、设计 token、截图和注释。 |
| 捕获实现 | 打开对应页面或组件，截图当前实现。 |
| 对比差异 | 标出布局、颜色、排版、间距、状态和响应式差异。 |
| 修正代码 | 用项目已有样式系统或设计 token 做精确修正。 |
| 再次验证 | 截图确认差异是否收敛。 |

这里要避免两个极端：一是“差不多就行”，导致设计系统被慢慢漂移；二是机械追求像素级一致，却忽略浏览器差异、动态内容和可访问性修正。同步的目标是实现设计意图，而不是盲目复制截图。

## 与产品、文档和代码评审的边界

设计评审和其他评审会重叠，但职责不同。

| 评审类型 | 主要问题 | 设计评审不应替代什么 |
|---|---|---|
| 产品评审 | 这个功能是否值得做，目标用户和价值是否成立。 | 不替产品负责人决定优先级。 |
| 文档评审 | plan / requirements 是否自洽、可执行、有边界。 | 不替文档 reviewer 检查所有 scope 和 feasibility。 |
| 代码评审 | 实现是否正确、安全、可维护、有测试。 | 不替 correctness 或 security reviewer 判断代码行为。 |
| 设计评审 | 用户流程、交互状态、视觉层级、实现对齐是否成立。 | 不把个人审美包装成工程事实。 |

设计评审最容易越界的地方，是把“我觉得不好看”当成 finding。可执行的设计 finding 应该说明：影响哪个用户行为、违反哪条设计规范、偏离哪个 Figma 节点，或遗漏哪个交互状态。

## 哪些判断必须交回人

设计与 UI 评审能发现很多问题，但不能替代以下判断：

- 品牌调性和设计系统是否允许某种表达。
- 某个交互取舍是否符合真实用户习惯。
- 是否为了可访问性有意偏离 Figma。
- 是否接受一个非关键像素差异以换取实现稳定性。
- 产品是否需要为某个边界状态提供完整体验。

这些判断不是 Agent 自己能定的。设计评审应把证据和选项摆出来，让产品、设计、工程负责人做取舍。

## 常见误区

| 误区 | 问题 | 更好的做法 |
|---|---|---|
| 把设计评审当审美投票 | 输出不可执行，容易变成个人偏好。 | 绑定用户行为、设计规范或实现差异。 |
| 只看静态截图 | 漏掉 hover、focus、loading、error、empty 等状态。 | 审查完整交互状态。 |
| 计划阶段不审设计 | 实现时才发现流程、状态和响应式没定义。 | 在 plan / requirements 中提前跑 design lens。 |
| Figma 对齐等同产品正确 | 页面像设计稿，但需求可能仍不成立。 | 把产品判断留给产品评审和事实源。 |
| 为 polish 大改结构 | 打磨阶段引入新行为和新风险。 | 小步迭代，保留已验证行为。 |

设计评审的目标不是让界面显得“更 AI 生成地漂亮”，而是让用户任务、交互状态和设计系统真正落到实现里。

## 参考资料

- [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
