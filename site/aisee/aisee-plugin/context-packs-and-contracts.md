---
title: Context Packs 与 Contracts
permalink: /aisee/aisee-plugin/context-packs-and-contracts/
createTime: 2026/06/08 12:30:00
---

# Context Packs 与 Contracts

Aisee CLI 提供两类上下文读取能力：`context pack` 面向实现、验证和审查生成 JSON context view；`contract` 命令面向跨仓库协作暴露只读契约上下文。二者都从当前项目文件、OpenSpec artifacts 和 Aisee metadata 派生信息，不构成新的规范事实源。

## Context pack 的定位

`aisee context pack` 是面向 OpenSpec change 的上下文读取层。它以当前 change 为唯一入口，读取 OpenSpec metadata、Aisee 补充信息、source-map、ID registry 和 evidence 入口，输出面向特定消费目标的 JSON。

它不承担以下职责：

- 不替代 `openspec validate`。
- 不判断 OpenSpec spec delta、baseline merge 或 artifact schema 合法性。
- 不把 proposal、spec、tasks、design 或 contracts 的自由文本解释为业务事实。
- 不从全项目自由搜索后推导当前 change 范围。

## 事实来源

| 来源 | 作用 |
|---|---|
| OpenSpec artifacts / Markdown | 当前 change 的内容事实源。 |
| `aisee/registry/id-registry.json` | ID 分配和生命周期事实源。 |
| `aisee/registry/sources.json` | change 外部 Aisee 产物来源登记事实源。 |
| `aisee/cache/context-index.json` | 可删除、可重建缓存，不是事实源。 |

Context pack 默认只包含 `parsed` 和 `derived` 两类信息。`parsed` 来自 metadata scan、Aisee 补充文件或可用 OpenSpec CLI 输出；`derived` 来自 source-map、ID registry、文件关系和校验规则。AI 生成摘要默认关闭，只有显式启用时才进入 `generated` 字段。

## JSON envelope

所有 target 共用同一类顶层结构：

```json
{
  "schema_version": "1.0",
  "target": "ce-work",
  "change": {
    "id": "add-auth-login",
    "path": "openspec/changes/add-auth-login",
    "schema": "aisee-app-spec-driven",
    "status": "authored"
  },
  "facts": {
    "parsed": {},
    "derived": {}
  },
  "generated": null,
  "gaps": [],
  "guardrails": [],
  "evidence": {},
  "meta": {}
}
```

关键字段的边界：

| 字段 | 说明 |
|---|---|
| `target` | 明确消费目标，例如 `ce-work`、`aisee-verify`、`ce-doc-review`、`ce-code-review`。 |
| `change` | 当前 change 的标识、路径、schema 和状态。 |
| `facts.parsed` | 从 metadata scan、OpenSpec CLI 输出或 Aisee 补充文件得到的事实。 |
| `facts.derived` | 从 source-map、ID registry、文件关系和轻量校验规则推导的信息。 |
| `generated` | 默认 `null`；生成摘要不具备权威性。 |
| `gaps` | 缺口和断链，不是自动补齐结果。 |
| `guardrails` | 执行限制和禁止越界项。 |
| `evidence` | validate、review、test、manual verification 等记录入口。 |
| `meta` | 命令、时间、工具版本、解析置信度和错误。 |

## Target 规则

| Target | 用途 |
|---|---|
| `ce-work` | 面向实现阶段，只输出当前 change 的可执行上下文，包括 allowed paths、suggested order、forbidden scope 和 workflow candidates。 |
| `aisee-verify` | 面向一致性诊断，检查 artifacts、traceability、tasks、contracts、implementation、review 和 tests。 |
| `ce-doc-review` | 面向文档审核，暴露 schema artifact DAG、缺失 artifact、ID trace、source-map gaps 和 open questions。 |
| `ce-code-review` | 面向实现后代码审查，携带 implementation、tests、task state 和 evidence 入口。 |

对 `ce-work`，有 blocker gap 时不应进入实现；无 blocker 且路径和 tasks 清楚时，才适合进入 implementation bridge 或执行阶段。对 `aisee-verify`，failed validate 或 failed test evidence 应作为 blocker 输出。

## Gap 语义

Context pack 使用统一 gap 对象：

```json
{
  "code": "SOURCE_MAP_GAP",
  "severity": "blocker",
  "message": "tasks references auth:API-001 but source-map has no code path",
  "owner_artifact": "source-map.md",
  "related_ids": ["auth:API-001"],
  "suggested_fix": "Update source-map.md with code and test paths before ce-work"
}
```

Severity 只使用三类：

| Severity | 含义 |
|---|---|
| `blocker` | 不应进入下一阶段。 |
| `risk` | 可以继续，但需要记录接受理由或验证要求。 |
| `info` | 提示，不阻断。 |

常见 gap code 包括 `MISSING_ARTIFACT`、`SOURCE_MAP_GAP`、`ID_REGISTRY_GAP`、`TRACE_GAP`、`TASK_GAP`、`CONTRACT_GAP`、`SPEC_DRIFT`、`VALIDATE_FAILED`、`REVIEW_BLOCKER`、`TEST_EVIDENCE_MISSING`。

## Contract service

`aisee contract` 适用于前后端分仓、BFF、SDK 或独立契约仓库等协作场景。推荐由契约提供方维护 contract source，并通过只读接口暴露：

```bash
aisee contract manifest --json
aisee contract summary --change <change> --json
aisee contract serve --host 127.0.0.1 --port 8765
```

消费方按需读取：

```bash
curl http://127.0.0.1:8765/manifest
curl http://127.0.0.1:8765/changes/<change>/summary
curl "http://127.0.0.1:8765/changes/<change>/contracts/service-contract/sections/<section>?max_chars=4000"
```

## 契约读取模型

| 层级 | 作用 |
|---|---|
| manifest | 了解可读取的契约来源和变更范围。 |
| summary | 判断当前 change 需要读取哪些契约段落。 |
| section | 读取实现当前任务所需的局部内容，并通过 `max_chars` 控制上下文大小。 |

Contract service 不是 mock backend，不是 API gateway，也不应暴露源码、密钥、环境变量或全仓库搜索结果。局域网访问必须显式开启 `--host 0.0.0.0`。

## 与 OpenSpec 的关系

Context pack 和 contract service 都是读取层能力。它们按消费目标组织上下文，但不能覆盖当前 OpenSpec change、baseline specs、source-map 或人工决策。

需要长期保留的结论，应回写到对应 artifact、registry、source-map 或归档后的 baseline。
