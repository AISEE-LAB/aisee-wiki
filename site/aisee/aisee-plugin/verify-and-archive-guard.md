---
title: Verify 与 Archive Guard
permalink: /aisee/aisee-plugin/verify-and-archive-guard/
createTime: 2026/06/08 12:30:00
---

# Verify 与 Archive Guard

`aisee:verify` 和 `aisee:archive-guard` 是归档前的检查环节。前者用于发现当前 change 在 artifacts、实现、任务和 evidence 之间的不一致；后者用于判断是否具备执行 `openspec archive <change>` 的条件。

它们不替代 OpenSpec 的 `validate`、`archive`，也不把 Aisee CLI 输出变成第二份规范事实源。需要长期保留的结论，应回写到当前 change artifact、source-map、apply tracks、evidence 记录或归档后的 baseline。

## 检查顺序

推荐顺序如下：

```text
实现完成
  -> 更新 tasks.md 或 apply tracks
  -> 记录 test / review / manual evidence
  -> openspec validate <change>
  -> aisee change verify-check <change> --json
  -> aisee context pack --change <change> --for aisee-verify --json
  -> aisee change archive-check <change> --json
  -> openspec archive <change>
```

其中 `openspec archive <change>` 是最终动作。`verify-check` 和 `archive-check` 只输出检查结果，不执行归档。

## Verify

实现完成后，先运行结构合法性和一致性检查：

```bash
openspec validate <change>
aisee change verify-check <change> --json
aisee context pack --change <change> --for aisee-verify --json
```

`aisee:verify` 面向诊断报告，重点检查以下内容：

| 检查对象 | 说明 |
|---|---|
| Schema artifacts | 当前 schema 要求的 artifacts 是否存在，按需 artifacts 是否有 Required / N/A 判断。 |
| Contracts | `Required=yes` 的 ui、service、data 或其他 contract 是否补齐并闭合。 |
| Traceability | source-map、ID、代码路径、测试路径和 evidence 入口是否能相互对应。 |
| Task state | `tasks.md` 或 schema apply tracks 是否反映真实完成状态。 |
| OpenSpec validate | `openspec validate <change>` 是否通过。 |
| Evidence | test、review、manual verification 是否能支撑当前 change 的完成判断。 |
| Review gate | 公开 CLI、HTTP endpoint、API / service contract、schema、parser、路径读取、安全或隐私相关变更是否仍需要 Tier 2 review。 |

Verify 的输出是问题清单和风险判断，不是归档审批。存在 blocker 时，不应进入 archive guard。

## Gap severity

检查结果中的 gap 使用统一 severity：

| Severity | 处理方式 |
|---|---|
| `blocker` | 不进入下一阶段。先修复对应 artifact、实现、任务或 evidence。 |
| `risk` | 可以继续，但必须记录 owner、接受理由、影响范围和后续处理方式。 |
| `info` | 不阻断流程，但应保留在 JSON 输出或 evidence 中供审查。 |

常见 gap code 包括 `MISSING_ARTIFACT`、`SOURCE_MAP_GAP`、`ID_REGISTRY_GAP`、`TRACE_GAP`、`TASK_GAP`、`CONTRACT_GAP`、`SPEC_DRIFT`、`VALIDATE_FAILED`、`REVIEW_BLOCKER`、`TEST_EVIDENCE_MISSING`。

## Archive Guard

Archive guard 在执行 `openspec archive <change>` 前使用：

```bash
aisee change archive-check <change> --json
```

它检查的不是“是否开发完成”的主观判断，而是归档前条件是否满足：

| 条件 | 归档前要求 |
|---|---|
| Validate | `openspec validate <change>` 已通过。 |
| Verify | `aisee:verify` 无 blocker。 |
| Apply tracks | `tasks.md` 或 schema apply tracks 已关闭，且未留下未解释的 pending 项。 |
| Required contracts | `Required=yes` contracts 已闭合，`Required=no` 有明确 N/A 原因。 |
| Evidence | review、test、manual verification 足以支撑当前 change 的验收。 |
| Accepted risk | 已接受风险包含 owner、理由、影响范围和后续处理方式。 |

只有 archive guard 结果支持归档时，才执行：

```bash
openspec archive <change>
```

如果 archive guard 给出 blocker，应先修复 blocker，再重新运行 verify 和 archive check。不要用 `openspec archive` 跳过未处理的缺口。

## Evidence 要求

| 类型 | 说明 |
|---|---|
| 自动验证 | 测试、构建、lint、schema validate、链接检查等命令输出。 |
| 人工验证 | 预览、截图、交互检查、发布前核对等记录。 |
| Review evidence | 文档评审、代码评审、设计审查或专项检查结果。 |
| Accepted risk | 已知风险的 owner、理由、影响范围和后续处理方式。 |

Evidence 应能追溯到当前 change。仅保留在聊天记录中的结论不适合作为归档依据。对于无法自动验证的内容，应记录人工检查对象、检查方式、结果和限制。

## 文档站场景

对本站的 `aisee-docsite-driven` change，归档前通常至少检查：

- 页面路径和 permalink 与 `doc-change.md` 一致；
- 顶栏、侧边栏、面包屑和中英文入口没有 stale route；
- 正文内链、代码块、命令和外部事实引用已核对；
- `pnpm docs:build` 或等效构建检查通过；
- 需要时完成人工预览或截图检查；
- `openspec/project-docs.md` 已回写，或在 `doc-change.md` 写明无需回写原因；
- `doc-change.md` 的 Validation 和 Archive Updates 已更新。

这类 change 通常不需要 service contract、data model 或 Tier 2 code review。若文档变更涉及公开 CLI、配置语义或 schema 说明，则应额外核对对应事实源，避免文档与实现脱节。

## 边界

- `openspec validate` 检查结构合法性，不覆盖全部实现与证据质量。
- `aisee:verify` 输出问题、风险和 evidence 缺口，不执行归档。
- `aisee:archive-guard` 判断归档前条件，不替代人工判断和 `openspec archive`。
- 如果检查结果仍有 blocker，应先修复 blocker，再继续归档流程。
