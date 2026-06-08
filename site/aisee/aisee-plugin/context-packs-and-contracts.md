---
title: Context Packs 与 Contracts
permalink: /aisee/aisee-plugin/context-packs-and-contracts/
createTime: 2026/06/08 12:30:00
---

# Context Packs 与 Contracts

Aisee CLI 的定位，不是再造一套规范系统，而是做 **OpenSpec change 的上下文总线**。它把当前 change 里真正需要的信息，以更适合 AI 消费的方式整理出来。

## Context pack 是什么

可以把它理解为：

```text
当前 change 的最小可执行读物
```

它通常汇总：

- 当前 change 与 schema；
- 必读 artifacts；
- 允许修改的路径与测试路径；
- 关键 ID、source-map、evidence 位置；
- 针对具体消费方的最小字段集。

## 为什么不能直接把所有文档扔给 Agent

因为 AI 的问题往往不是“上下文不够大”，而是“上下文不够准”。整仓库搜索会带来两个问题：

- 把无关历史和当前 change 混在一起；
- 让实现范围逐渐失控。

context pack 的价值就在于先做一次**上下文裁剪**。

## 常见消费目标

| 目标 | 需要什么 | 典型用途 |
|---|---|---|
| `ce-work` | 当前 change、路径、任务、验证命令 | 进入实现 |
| `ce-code-review` | 目标、diff 对照点、风险面 | 聚焦 review |
| `aisee-verify` | tasks、evidence、Required artifacts | 做 verify 检查 |
| `archive-guard` | validate 结果、risk、review/test/manual evidence | 判断是否可归档 |

## 正确使用方式

```bash
aisee context pack --change <change> --for ce-work --json
aisee context pack --change <change> --for aisee-verify --json
```

使用时要记住三条规则：

1. **只消费当前目标需要的字段**。
2. **不要把 pack 输出复制成长期文档**。
3. **发现缺口时，回写当前 OpenSpec artifact**。

## Contract serve 解决什么问题

当前后端、BFF、前端或 SDK 分属不同仓库时，最麻烦的问题不是“接口文档有没有”，而是：

- 谁拥有 contract source；
- 消费方该读哪一段；
- 如何避免把整份接口说明复制到另一个仓库。

只读 contract 服务的推荐模式是：

```text
provider 仓库维护 contract source
  -> 暴露 manifest / summary / section
  -> consumer 按需读取
```

## 为什么它不是 mock backend

`aisee contract serve` 只负责暴露当前 contract 的只读视图：

- 可以读 manifest；
- 可以读 change summary；
- 可以按 section 拉取一小段内容；
- 不能替代真实 API；
- 不能充当 gateway；
- 不能变成第二份事实源。

## 最小读取模型

推荐按这个顺序读：

1. `manifest`：先知道有哪些契约可读。
2. `summary`：再判断这次 change 需要哪些段落。
3. `section`：最后只拉取实现当前任务真正需要的部分。

这个顺序的价值在于：**先定位，再读取，而不是一次灌满上下文**。

## 对文档站意味着什么

即使是文档站项目，也能借用同样的原则：

- 进入写作前，先读取当前 change 的 `proposal/doc-change/tasks`。
- 不要因为要写一页文档，就把全站所有栏目都重新扫一遍。
- 内链、导航、构建验证等也应该由最小上下文驱动，而不是靠记忆猜。
