---
title: AISEE Plugin
description: 说明 AISEE Plugin 在 OpenSpec 协作链路中的职责边界，以及前置澄清、change authoring、context pack、契约读取与归档校验的组织方式。
permalink: /aisee/aisee-plugin/
createTime: 2026/06/08 12:30:00
---

# AISEE Plugin

AISEE Plugin 是 AISEE 主线中的插件子栏目，用于说明 Aisee Plugin 在 OpenSpec 协作链路中的职责边界。它关注的不是单个命令列表，而是需求澄清、change authoring、上下文组织、契约读取、验证校验和知识复用如何围绕同一个 change 协同工作。

在这一链路中，边界需要先明确：

- **OpenSpec 仍然是唯一规范事实源**：长期事实放在 `openspec/specs/` 和当前 `openspec/changes/`。
- **AISEE Plugin 负责把事实组织得更适合 AI 执行**：把需求、UI 内容、架构约束、schema、ID、context pack 和 evidence 链接起来。
- **Compound Engineering 负责工程执行与复利**：实现、调试、review、测试、提交、复盘和知识沉淀仍由 Compound 或其他 coding agent 承接。

## 它解决什么问题

只靠聊天记录推进 AI Coding，常见会遇到这些问题：

| 问题 | 典型后果 | AISEE Plugin 的回应 |
|---|---|---|
| 需求和验收条件散在聊天里 | Agent 自行补全假设，change 边界漂移 | 用 `aisee:srs`、`aisee:ui-content`、`aisee:architecture` 先澄清输入 |
| 需求文档写完就直接实现 | change artifact 不完整，review 无法对照事实源 | 用 `aisee:change-plan` 和 `aisee:change-author` 衔接 OpenSpec |
| AI 需要很多上下文才能安全执行 | prompt 越写越长，且容易漏掉关键约束 | 用 `aisee context pack` 生成目标化最小上下文 |
| 跨仓库接口信息难共享 | 前后端各自复制接口说明，口径漂移 | 用只读 contract 服务按需读取 manifest、summary、section |
| 一次经验只留在聊天记录 | 下次重复踩坑 | 用 reflect、knowledge curate、archive guard 建立可复用闭环 |

## 主线链路

```text
用户意图
  -> SRS / UI Content / Architecture
  -> Change Plan
  -> OpenSpec Change Authoring
  -> Context Pack / Contract Read
  -> Implementation / Review / Test
  -> Verify / Archive Guard
```

这条链路强调的是“让 AI 在工程事实附近工作”，而不是把插件命令堆成一张长清单。

## 这一栏怎么读

| 页面 | 适合谁 | 读完后应获得什么 |
|---|---|---|
| [从意图到 Change](/aisee/aisee-plugin/from-intent-to-change/) | 需求还很模糊，想把想法收束为可实施 change 的读者 | 知道前置澄清、change planning 和 authoring 的顺序 |
| [Schema Packs 与 Authoring](/aisee/aisee-plugin/schema-packs-and-authoring/) | 不确定该选哪个 schema、artifact 怎么补的读者 | 知道 schema 选择边界和 authoring 重点 |
| [Context Packs 与 Contracts](/aisee/aisee-plugin/context-packs-and-contracts/) | 想让实现交接更稳定，或需要跨仓库协作的读者 | 知道 context pack 和 contract serve 的正确定位 |
| [Team Knowledge Guardrails](/aisee/aisee-plugin/team-knowledge-guardrails/) | 想跨项目复用经验，但不想制造第二事实源的读者 | 知道 reflect、curate、query 的边界 |
| [Verify 与 Archive Guard](/aisee/aisee-plugin/verify-and-archive-guard/) | 想判断 change 何时可归档的读者 | 知道 verify、evidence、accepted risk 和 archive gate 的要求 |

## 核心能力版图

| 能力 | 代表对象 | 作用 | 不做什么 |
|---|---|---|---|
| 前置澄清 | `aisee:srs`、`aisee:ui-content`、`aisee:architecture` | 把模糊需求整理成可审查输入 | 不替代 OpenSpec change artifact |
| Change 规划 | `aisee:change-plan`、`aisee:change-author` | 选择 schema、拆分 change、补 artifact | 不绕过 `openspec validate` |
| 上下文总线 | `aisee doctor`、`aisee context pack`、`aisee flow inspect` | 给实现、verify、review 提供机器可读上下文 | 不生成第二份长期事实文档 |
| 契约读取 | `aisee contract serve` | 为跨仓库协作暴露只读 contract 视图 | 不是 mock backend，不是 API gateway |
| 团队知识 | `aisee knowledge query`、`aisee:reflect`、`aisee:knowledge-curate` | 复用少量经审查经验 | 不自动把所有文档搬进 team knowledge |
| 归档门禁 | `aisee:verify`、`aisee:archive-guard` | 检查 evidence、tasks、contracts、validate 是否闭环 | 不替代 archive 本身 |

## 先记住三条原则

1. **前置文档不是最终事实源**：SRS、UI Content、Architecture 是 change planning 输入，不是 baseline。
2. **Context pack 是读取入口，不是新文档**：发现缺口时要回写当前 change artifact，而不是把 JSON 输出当长期记录。
3. **Archive guard 不是形式步骤**：如果 evidence、tasks、Required contracts 还没闭环，就不该继续归档。

## 下一步

- 想先把模糊需求整理成 change：读 [从意图到 Change](/aisee/aisee-plugin/from-intent-to-change/)
- 想确认 schema 和 artifacts：读 [Schema Packs 与 Authoring](/aisee/aisee-plugin/schema-packs-and-authoring/)
- 想知道实现前要给 Agent 准备哪些上下文：读 [Context Packs 与 Contracts](/aisee/aisee-plugin/context-packs-and-contracts/)
