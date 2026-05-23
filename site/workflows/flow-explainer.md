---
title: 可复用流程讲解组件示例
permalink: /workflows/flow-explainer/
createTime: 2026/05/23 18:20:00
---

# 可复用流程讲解组件示例

本页是流程讲解组件的基础示例，用于验证组件形态并给后续文章提供写法参考。它不是 P0/P1 正文，也不代表 OpenSpec、Compound 或 aisee 的完整教程已经完成。

<FlowExplainer
  eyebrow="流程组件"
  title="从需求到可归档 change 的最小闭环"
  description="这个示例把 aisee 前置材料、OpenSpec artifacts、实现验证和复盘归档放在同一条静态流程里。后续正文可以替换阶段、节点和连接关系，复用同一个组件。"
  :stages="[
    {
      id: 'inputs',
      title: '输入澄清',
      description: '先把模糊需求转为可讨论的上下文。',
      items: [
        {
          id: 'srs',
          title: 'SRS',
          description: '确认目标用户、范围、功能需求和待确认事项。',
          status: 'done',
          accent: '需求契约',
          href: '/learn/',
        },
        {
          id: 'tech-context',
          title: '技术上下文',
          description: '整理技术栈、边界、共享前置和高风险区域。',
          status: 'done',
          accent: '技术约束',
        },
      ],
    },
    {
      id: 'openspec',
      title: 'OpenSpec change',
      description: '把工作纳入规范事实源，先设计再实现。',
      items: [
        {
          id: 'proposal',
          title: 'proposal / specs',
          description: '说明为什么做、要改变什么，以及可测试的需求场景。',
          status: 'active',
          accent: 'Spec-first',
          href: '/openspec/',
          highlight: true,
        },
        {
          id: 'design-tasks',
          title: 'design / tasks',
          description: '记录技术决策，并拆成可跟踪的实现任务。',
          status: 'active',
          accent: '实现边界',
        },
      ],
    },
    {
      id: 'delivery',
      title: '实现与复盘',
      description: '按任务交付代码，再把经验沉淀回知识资产。',
      items: [
        {
          id: 'apply-verify',
          title: 'apply / verify',
          description: '实现任务，运行最小相关验证，确认行为符合 spec。',
          status: 'risk',
          accent: '验证 gate',
          href: '/workflows/',
        },
        {
          id: 'archive',
          title: 'archive / reflect',
          description: '归档完成 change，并把可复用经验沉淀为后续资产。',
          status: 'default',
          accent: '知识复利',
          href: '/resources/',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'srs',
      to: 'proposal',
      label: '需求输入进入 OpenSpec 事实源',
      type: 'depends',
    },
    {
      from: 'proposal',
      to: 'design-tasks',
      label: 'spec 决定设计和任务边界',
      type: 'next',
    },
    {
      from: 'design-tasks',
      to: 'apply-verify',
      label: '按任务实现并进入质量检查',
      type: 'gate',
    },
    {
      from: 'apply-verify',
      to: 'archive',
      label: '通过验证后归档并复盘',
      type: 'feedback',
    },
  ]"
  :legend="[
    {
      status: 'done',
      label: '已完成',
      description: '已有稳定输入或产物',
    },
    {
      status: 'active',
      label: '当前重点',
      description: '需要维护者重点协作',
    },
    {
      status: 'risk',
      label: '验证 gate',
      description: '必须用检查或人工评审确认',
    },
  ]"
/>

## 长流程模式

当阶段超过 4 个时，组件会自动从横向 lane 切换为纵向 timeline，避免长流程在桌面端被挤压。内容作者也可以显式设置 `mode="timeline"`。

<FlowExplainer
  mode="timeline"
  eyebrow="长流程示例"
  title="aisee 到 OpenSpec 的扩展链路"
  description="这个示例用于展示长流程的阅读形态。阶段按纵向时间线排列，每个阶段内部仍然可以放多个节点。"
  :stages="[
    {
      id: 'requirement',
      title: '需求澄清',
      description: '把想法整理为可以评审的需求边界。',
      items: [
        {
          id: 'srs-long',
          title: 'aisee:srs',
          description: '整理目标、范围、功能需求、假设和待确认事项。',
          status: 'done',
          accent: '需求规格',
        },
      ],
    },
    {
      id: 'ui-content',
      title: '页面内容',
      description: '把需求转换成页面、元素、状态和操作。',
      items: [
        {
          id: 'ui-content-long',
          title: 'aisee:ui-content',
          description: '定义页面内容和跨页面交互，不提前替代视觉设计。',
          status: 'default',
          accent: '界面内容',
        },
      ],
    },
    {
      id: 'technical-context',
      title: '技术上下文',
      description: '确认技术栈事实、共享前置和风险。',
      items: [
        {
          id: 'tech-context-long',
          title: 'aisee:tech-context',
          description: '提取架构边界、现有能力和实现约束。',
          status: 'default',
          accent: '技术约束',
        },
      ],
    },
    {
      id: 'split',
      title: 'Change 拆分',
      description: '按依赖、规模和可并行边界拆分工作。',
      items: [
        {
          id: 'split-long',
          title: 'aisee:split',
          description: '输出 change 清单、依赖图和每个 change 的范围。',
          status: 'active',
          accent: '拆分策略',
        },
      ],
    },
    {
      id: 'artifacts',
      title: 'OpenSpec artifacts',
      description: '为选中的 change 补齐规范、设计和任务。',
      items: [
        {
          id: 'artifacts-long',
          title: 'proposal / specs / design / tasks',
          description: '把实现前需要确认的事实写入规范事实源。',
          status: 'active',
          accent: 'Spec-first',
        },
      ],
    },
    {
      id: 'delivery-long',
      title: '实现与归档',
      description: '实现、验证、复盘并归档 change。',
      items: [
        {
          id: 'delivery-node-long',
          title: 'apply / verify / archive',
          description: '用任务清单驱动实现，用验证结果关闭变更。',
          status: 'risk',
          accent: '质量 gate',
        },
      ],
    },
  ]"
/>

## Markdown 使用方式

组件通过 Markdown 直接传入结构化数据。后续文章可以保留 `title`、`description`、`stages`、`connections` 和 `legend` 的形状，只替换具体阶段与节点。

```vue
<FlowExplainer
  mode="auto"
  title="流程标题"
  description="流程说明"
  :stages="[
    {
      id: 'stage-id',
      title: '阶段标题',
      description: '阶段说明',
      items: [
        {
          id: 'node-id',
          title: '节点标题',
          description: '节点说明',
          status: 'active',
          accent: '强调标签',
          href: '/openspec/',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'node-id',
      to: 'next-node-id',
      label: '关系说明',
      type: 'next',
    },
  ]"
/>
```

## 下一步

- [OpenSpec](/openspec/)
- [Compound](/compound/)
- [aisee](/aisee/)
- [资源中心](/resources/)
