---
title: AISEE Plugin
description: 说明 AISEE Plugin 在 OpenSpec 项目中的职责边界，以及需求澄清、change authoring、context pack、契约读取和归档校验的组织方式。
permalink: /aisee/aisee-plugin/
createTime: 2026/06/08 12:30:00
---

# AISEE Plugin

AISEE Plugin 是面向 OpenSpec 项目的 AI 软件工程插件。它提供一组 skills、schema packs、CLI 上下文工具和校验规则，用于在 OpenSpec change 生命周期内组织需求输入、UI 内容、技术上下文、实现交接和验证证据。

AISEE Plugin 不替代 OpenSpec。OpenSpec 仍然负责规范状态机、active changes、baseline specs、validate 和 archive。AISEE Plugin 的职责是在 OpenSpec 周围补充结构化输入、schema-aware authoring、机器可读 context pack、稳定 ID 追踪、契约读取和归档前检查。

## 状态与前提

| 项目 | 说明 |
|---|---|
| 当前状态 | `aisee-plugin` 仓库标注为 early alpha；兼容治理仍在完善中。 |
| 运行前提 | 需要 Python 3.10+、Git、Node.js 和 OpenSpec CLI。 |
| OpenSpec | 需要单独安装；AISEE Plugin 不内置或替代 OpenSpec。 |
| Compound Engineering | 可作为实现、审查、测试消费方；不是使用 AISEE Plugin 的必需依赖。 |
| 本栏目范围 | 中文正文优先说明概念、边界和使用判断；英文页面暂保持稳定入口。 |

## 核心边界

| 对象 | 职责 |
|---|---|
| OpenSpec | 管理规范状态机、change artifacts、baseline specs、validate 和 archive。 |
| AISEE Plugin | 提供需求澄清、上下文整理、schema pack、context pack、ID 追踪、contract 读取和 verify / archive guard。 |
| Aisee CLI | 读取 OpenSpec 与 Aisee metadata，输出 JSON context view；这些输出不是第二份规范事实源。 |
| Compound Engineering | 可作为实现、审查、测试和知识沉淀的消费方；不是 AISEE Plugin 的必需依赖。 |

## 能力范围

| 能力 | 主要入口 | 说明 |
|---|---|---|
| 需求澄清 | `aisee:srs` | 将业务目标、范围、功能需求、非功能需求和验收标准整理为规划输入。 |
| UI 内容规格 | `aisee:ui-content` | 描述页面内容、状态、操作、权限可见性和前端数据需求，不承担视觉设计职责。 |
| 技术上下文 | `aisee:architecture` | 记录技术事实、架构边界、平台约束、共享约定和风险。 |
| Change 规划 | `aisee:change-plan` | 将已确认输入映射为可独立交付的 OpenSpec changes，并给出 schema 建议。 |
| Change authoring | `aisee:change-author` | 按目标 schema 的 artifact DAG 补齐当前 change 的文档。 |
| Schema packs | `aisee schemas install` | 提供 app、device、docsite、infra、security、quick-fix、quick-research、collaboration 等 schema。 |
| Context packs | `aisee context pack` | 为实现、验证和 review 生成面向目标的 JSON 上下文视图。 |
| 契约读取 | `aisee contract` | 以 manifest、summary、section 的方式暴露只读契约上下文，支持跨仓库协作。 |
| 团队知识 | `aisee knowledge`、`aisee:reflect`、`aisee:knowledge-curate` | 按需检索或整理经审查的工程经验；不作为规范事实源。 |
| 验证与归档检查 | `aisee:verify`、`aisee:archive-guard` | 检查 artifacts、tasks、source-map、测试和 review evidence 是否满足归档前要求。 |

## 推荐工作顺序

<FlowExplainer
  mode="timeline"
  eyebrow="Aisee plugin"
  title="从输入整理到归档检查"
  description="Aisee Plugin 当前文档推荐先整理需求和上下文，再进入 OpenSpec change authoring，随后为实现、验证和归档提供目标化上下文与检查。"
  :stages="[
    {
      id: 'prepare',
      title: '整理输入',
      description: '把需求、页面内容和技术约束写成规划输入。',
      items: [
        {
          id: 'srs',
          title: 'aisee:srs',
          description: '整理业务目标、范围、功能需求、非功能需求和验收标准。',
          status: 'active',
          accent: '需求输入',
        },
        {
          id: 'ui-architecture',
          title: 'ui-content / architecture',
          description: '按需补充页面内容、交互状态、技术事实、约束和风险。',
          status: 'active',
          accent: '上下文输入',
        },
      ],
    },
    {
      id: 'author',
      title: '创建 Change',
      description: '把已确认输入转换为 OpenSpec change。',
      items: [
        {
          id: 'change-plan',
          title: 'aisee:change-plan',
          description: '拆分可独立交付的 changes，并给出 schema 建议。',
          status: 'default',
          accent: 'change 边界',
        },
        {
          id: 'change-author',
          title: 'aisee:change-author',
          description: '按目标 schema 的 artifact DAG 补齐当前 change 文档。',
          status: 'default',
          accent: 'artifact authoring',
        },
      ],
    },
    {
      id: 'handoff',
      title: '实现交接',
      description: '为实现、审查和测试提供当前 change 的目标化上下文。',
      items: [
        {
          id: 'context-pack',
          title: 'aisee context pack',
          description: '读取 OpenSpec 与 Aisee metadata，输出 JSON context view。',
          status: 'default',
          accent: 'context view',
        },
        {
          id: 'implementation',
          title: 'implementation / review / test',
          description: '由 coding agent 或人工开发承接实现、审查和验证。',
          status: 'risk',
          accent: '执行与证据',
        },
      ],
    },
    {
      id: 'verify',
      title: '验证归档',
      description: '在 archive 前检查 artifacts、tasks、evidence 和风险记录。',
      items: [
        {
          id: 'verify-check',
          title: 'aisee:verify',
          description: '检查当前 change 是否存在 artifact、contract、task 和 evidence 缺口。',
          status: 'risk',
          accent: 'verify report',
        },
        {
          id: 'archive-guard',
          title: 'aisee:archive-guard',
          description: '归档前检查 validate、apply tracks、evidence 和 accepted risk。',
          status: 'risk',
          accent: 'archive gate',
        },
        {
          id: 'archive',
          title: 'openspec archive',
          description: '由 OpenSpec 完成已验证 change 的归档。',
          status: 'done',
          accent: 'baseline 更新',
        },
      ],
    },
  ]"
  :connections="[
    {
      from: 'srs',
      to: 'change-plan',
      label: '已确认输入用于规划 change',
      type: 'depends',
    },
    {
      from: 'change-author',
      to: 'context-pack',
      label: '已 authored change 生成目标化上下文',
      type: 'next',
    },
    {
      from: 'implementation',
      to: 'verify-check',
      label: '实现和验证结果作为 evidence 进入检查',
      type: 'gate',
    },
    {
      from: 'archive-guard',
      to: 'archive',
      label: '通过归档检查后再执行 archive',
      type: 'gate',
    },
  ]"
/>

这条顺序来自 Aisee Plugin 当前文档中的推荐流程。具体项目可以根据变更规模、schema 类型和风险面裁剪步骤；小型修复不需要展开完整 app schema。

## 使用约束

- SRS、UI Content、Design Spec 和 Architecture 是 change planning 的输入，不是 OpenSpec baseline。
- Context pack 是从当前 artifacts 派生的上下文视图，不应复制为长期规范文档。
- Contract service 提供只读契约上下文，不是 mock backend，也不是 API gateway。
- Team knowledge 只提供少量经审查的 guardrails，不能覆盖当前项目的 specs、changes 或人工决策。
- `aisee:verify` 和 `aisee:archive-guard` 只做检查与风险提示；最终归档仍由 `openspec archive <change>` 完成。

## 阅读顺序

| 页面 | 主题 |
|---|---|
| [从意图到 Change](/aisee/aisee-plugin/from-intent-to-change/) | 前置输入如何进入 OpenSpec change。 |
| [Schema Packs 与 Authoring](/aisee/aisee-plugin/schema-packs-and-authoring/) | schema 选择、artifact DAG 与 authoring 边界。 |
| [Context Packs 与 Contracts](/aisee/aisee-plugin/context-packs-and-contracts/) | context pack、contract service 和跨仓库读取方式。 |
| [Team Knowledge Guardrails](/aisee/aisee-plugin/team-knowledge-guardrails/) | team knowledge 的检索、整理和写入边界。 |
| [Verify 与 Archive Guard](/aisee/aisee-plugin/verify-and-archive-guard/) | verify、archive guard、evidence 和 accepted risk。 |
