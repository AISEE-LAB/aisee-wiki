---
title: Verify 与 Archive Guard
permalink: /aisee/aisee-plugin/verify-and-archive-guard/
createTime: 2026/06/08 12:30:00
---

# Verify 与 Archive Guard

`aisee:verify` 和 `aisee:archive-guard` 用于归档前的一致性检查。它们不替代 OpenSpec 的 `validate` 和 `archive`，也不直接批准变更完成；它们输出缺口、风险和归档前需要处理的问题。

## Verify

实现后，推荐先运行 OpenSpec validate 和 Aisee 校验命令：

```bash
openspec validate <change>
aisee change verify-check <change> --json
aisee context pack --change <change> --for aisee-verify --json
```

`aisee:verify` 重点检查：

- schema artifacts 是否存在；
- Required=yes contracts 是否闭合；
- source-map、ID、代码路径、测试路径和 evidence 是否一致；
- `tasks.md` 或 apply tracks 是否真实完成；
- OpenSpec validate 是否通过；
- review、test、manual evidence 是否足够；
- 是否仍需要 Tier 2 review。

Verify 的输出是报告，不是 archive 审批。

## Archive Guard

Archive guard 在执行 `openspec archive <change>` 前使用：

```bash
aisee change archive-check <change> --json
```

`aisee:archive-guard` 关注：

- `openspec validate <change>` 是否通过；
- `aisee:verify` 是否无 blocker；
- apply tracks 是否关闭；
- review、test、manual evidence 是否满足当前 schema；
- accepted risk 是否有 owner、理由、影响范围和后续处理方式。

只有归档检查通过后，才进入 OpenSpec archive：

```bash
openspec archive <change>
```

## Evidence 要求

| 类型 | 说明 |
|---|---|
| 自动验证 | 测试、构建、lint、schema validate、链接检查等命令输出。 |
| 人工验证 | 预览、截图、交互检查、发布前核对等记录。 |
| Review evidence | 文档评审、代码评审、设计审查或专项检查结果。 |
| Accepted risk | 已知风险的 owner、理由、影响范围和后续处理方式。 |

Evidence 应能追溯到当前 change。仅保留在聊天记录中的结论不适合作为归档依据。

## 文档站场景

对本站的 `aisee-docsite-driven` change，归档前通常至少检查：

- 页面路径可访问；
- 顶栏和侧边栏入口正确；
- 内链没有 stale link；
- 代码块、命令或引用已核对；
- `pnpm docs:build` 通过；
- 需要时完成人工预览或截图检查；
- `openspec/project-docs.md` 已回写，或在 `doc-change.md` 写明无需回写原因。

## 边界

- `openspec validate` 检查结构合法性，不覆盖全部实现与证据质量。
- `aisee:verify` 输出问题和风险，不执行归档。
- `aisee:archive-guard` 判断归档前条件，不替代 `openspec archive`。
- 如果检查结果仍有 blocker，应先修复 blocker，再继续归档流程。
