---
title: Team Knowledge Guardrails
permalink: /aisee/aisee-plugin/team-knowledge-guardrails/
createTime: 2026/06/08 12:30:00
---

# Team Knowledge Guardrails

Team knowledge 是 Aisee Plugin 的实验性能力，用于跨项目复用少量经审查的工程经验。当前适合本地试用和内部工作流验证，不建议作为公开稳定 contract 依赖。远程仓库同步、promote-batch 和本地 scaffold 已可用；PR 自动化和 MCP 服务仍未稳定。

## 定位

Team knowledge 提供 guardrail retrieval：在实现、review、verify 等阶段按需检索少量相关经验，提醒当前任务可能涉及的约定、风险或实践。

它不负责：

- 替代 OpenSpec specs、active changes 或 baseline；
- 保存完整项目 memory；
- 复制 `docs/solutions/` 正文；
- 做通用知识问答；
- 作为向量库或缓存事实源。

OpenSpec/current change facts 的优先级始终高于 team knowledge。Team knowledge card 只能作为经审查的 guardrail，不能覆盖当前 change artifacts、source-map、tasks、contracts 或人工决策。

## 仓库模型

Team knowledge 推荐使用独立仓库。可通过 `aisee knowledge scaffold --dest <path> --json` 生成初始骨架：

```text
aisee-team-knowledge/
  AGENTS.md
  README.md
  knowledge/
    cards/
      frontend/
      backend/
      cli/
      openspec/
      security/
      testing/
    packs/
      web-app.yaml
      backend-service.yaml
      openspec.yaml
      aisee-plugin.yaml
    deprecated/
  schemas/
    knowledge-card.schema.json
    knowledge-pack.schema.json
  docs/
    authoring-guide.md
    review-policy.md
  indexes/
    lexical-index.json
    vector-index/
```

持久事实来源是 `knowledge/cards/**` 和 `knowledge/packs/**`。`indexes/**` 是可删除、可重建缓存，不能成为事实源。

## 项目配置

业务项目通过 `aisee/knowledge.yaml` pin 需要的 packs：

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

V1 以本地 `path` 为主；`repo` 和 `ref` 记录来源与人工同步依据。当前 CLI 支持 `aisee knowledge install --json` 和 `aisee knowledge update --json` 同步本地 Git checkout；同步命令默认拒绝 dirty checkout，避免覆盖人工编辑的 card 或 pack。

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

## 读取模型

CLI 负责 retrieval 的边界控制：

1. 读项目配置。
2. 读 pack manifest。
3. 读 pack 声明的 card frontmatter。
4. 做 status、pack、schema、phase、surface、stack 硬过滤。
5. 对通过过滤的候选做 lexical scoring。
6. 按需做 semantic rerank。
7. 执行 project-local / team knowledge 去重。
8. 输出 top N guardrails。

Skill 和 AI 提示不得直接扫描 `knowledge/cards/**/*.md`。所有调用都应通过：

```bash
aisee knowledge query ...
```

默认输出最多 3 条 matches。Semantic matching 只能作用于硬过滤后的候选集，不能绕过 pack、status、phase、surface、stack 和 risk signals 做全库召回。

## 查询方式

查询前先检查配置：

```bash
aisee knowledge inspect --json
aisee knowledge doctor --json
aisee knowledge check --json
```

按阶段和场景查询：

```bash
aisee knowledge query --phase implementation --surface cli --query "public CLI JSON" --json
```

基于当前 change 查询：

```bash
aisee knowledge query --from-change <change> --for ce-work --json
```

在 context pack 中显式启用：

```bash
aisee context pack --change <change> --for ce-work --knowledge --json
```

## 沉淀流程

知识沉淀分三层：

```text
aisee:reflect
  -> 生成项目内 reusable knowledge candidate
  -> aisee:knowledge-curate
  -> 批量去敏、泛化、去重、补边界并产出 card drafts
  -> 用户确认
  -> aisee knowledge promote-batch
  -> 写入本地 team knowledge worktree
  -> 人工 review diff
```

`aisee knowledge promote-batch --curation <path> --team-path <path> --pack <id> --json` 只负责把已审查 draft 写入本地 team knowledge worktree，并可幂等更新 pack。它不自动创建分支、commit、push、merge 或 PR。

写入 team knowledge repo、创建分支、提交、合并或 PR 前，需要用户再次明确授权。

## 与 Compound 的边界

`ce-compound` 继续记录具体工程问题和解决方案。Team knowledge card 可以引用 solution 作为 evidence，但不复制 solution 正文。

`ce-compound-refresh` 继续维护 `docs/solutions/`。Team knowledge refresh 是后续独立流程，不混入 Compound refresh。

## 不承担的职责

- 不自动把项目经验写入 team knowledge。
- 不自动创建分支、提交、合并或 PR。
- 不默认读取完整 card 正文。
- 不直接扫描 `knowledge/cards/**/*.md` 作为 AI 上下文。
- 不把 `docs/solutions/`、memory 或 reflect 文档整库迁移到其他项目。
- 不让索引、cache、向量检索或 AI 摘要成为事实源。

## 稳定性说明

外部 `aisee-plugin` 文档将该能力标记为实验性。公开稳定前仍需补齐更多真实 card packs、stale card refresh 工作流，以及可选的 semantic rerank 或 MCP 包装；这些能力不改变 Git + card / pack 的事实源模型。
