---
title: Team Knowledge Guardrails
permalink: /aisee/aisee-plugin/team-knowledge-guardrails/
createTime: 2026/06/08 12:30:00
---

# Team Knowledge Guardrails

Team knowledge 是 Aisee Plugin 的实验性能力，用于跨项目复用少量经审查的工程经验。当前适合本地试用和工作流 dogfood，不建议作为公开稳定 contract 依赖。

## 定位

Team knowledge 提供 guardrail retrieval：在实现、review、verify 等阶段按需检索少量相关经验，提醒当前任务可能涉及的约定、风险或实践。它不替代 OpenSpec specs、active changes、baseline 或当前项目的人工决策。

## 当前可用能力

| 能力 | 说明 |
|---|---|
| 配置检查 | 通过 `aisee knowledge inspect`、`doctor`、`check` 检查本地配置、path 和 card / pack。 |
| 本地 scaffold | 通过 `aisee knowledge scaffold --dest <path> --update-config --json` 创建 team knowledge 仓库骨架。 |
| 同步与索引 | 通过 `install`、`update`、`index` 同步或构建本地 cache。 |
| 查询 | 通过 `aisee knowledge query ... --json` 或 `--from-change <change>` 检索少量 guardrails。 |
| Context pack 注入 | 通过 `aisee context pack --knowledge` 将少量 matches 注入实现上下文。 |
| 候选沉淀 | 通过 `aisee:reflect` 生成项目内 reusable knowledge candidates。 |
| 批量整理 | 通过 `aisee:knowledge-curate` 审查候选并生成 card drafts。 |
| 批量提升 | 通过 `aisee knowledge promote-batch` 将已审查 drafts 写入 team knowledge worktree。 |

## 不承担的职责

- 不自动把项目经验写入 team knowledge。
- 不自动创建分支、提交、合并或 PR。
- 不默认读取完整 card 正文。
- 不直接扫描 `knowledge/cards/**/*.md` 作为 AI 上下文。
- 不把 `docs/solutions/`、memory 或 reflect 文档整库迁移到其他项目。

## 推荐使用方式

业务项目只 pin 需要的 packs：

```yaml
repo: git@example.com:org/aisee-team-knowledge.git
path: .aisee/team-knowledge
ref: v0.1.0
packs:
  - web-app
retrieval:
  max_cards: 3
  include_project_candidates: true
```

查询前先检查配置：

```bash
aisee knowledge inspect --json
aisee knowledge doctor --json
aisee knowledge check --json
```

基于当前 change 查询：

```bash
aisee knowledge query --from-change <change> --for ce-work --json
```

## 沉淀流程

知识沉淀默认由用户主动触发：

```text
aisee:reflect
  -> aisee/docs/reflect/knowledge-candidates/
  -> aisee:knowledge-curate
  -> 用户确认
  -> aisee knowledge promote-batch
  -> 人工 review diff
```

写入 team knowledge repo、创建分支、提交、合并或 PR 前，需要用户再次明确授权。

## 稳定性说明

外部 `aisee-plugin` 文档将该能力标记为实验性。公开稳定前仍需补齐更多真实 card packs、stale card refresh 工作流，以及可选的 semantic rerank 或 MCP 包装；这些能力不改变 Git + card / pack 的事实源模型。
