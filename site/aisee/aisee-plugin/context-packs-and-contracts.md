---
title: Context Packs 与 Contracts
permalink: /aisee/aisee-plugin/context-packs-and-contracts/
createTime: 2026/06/08 12:30:00
---

# Context Packs 与 Contracts

Aisee CLI 提供两类与上下文读取相关的能力：`context pack` 面向实现、验证和审查生成 JSON context view；`contract` 命令面向跨仓库协作暴露只读契约上下文。二者都从当前项目文件和 OpenSpec artifacts 派生信息，不构成新的规范事实源。

## Context pack

`aisee context pack` 用于为特定消费目标生成当前 change 的上下文视图。它通常包含：

- 当前 change 与 schema metadata；
- 必读 artifacts；
- 允许修改的代码路径和测试路径；
- source-map、ID、evidence 位置；
- 目标消费方需要的字段。

常见调用方式：

```bash
aisee context pack --change <change> --for ce-work --json
aisee context pack --change <change> --for aisee-verify --json
aisee context pack --change <change> --for ce-code-review --json
```

## 消费目标

| 目标 | 用途 |
|---|---|
| `ce-work` | 为实现阶段提供当前 change、路径、任务和验证命令。 |
| `aisee-verify` | 为 verify 阶段提供 artifacts、tasks、evidence 和 Required 状态。 |
| `ce-code-review` | 为代码审查提供目标、风险面和对照上下文。 |

使用 context pack 时，应只消费当前目标需要的字段。发现缺口时，应回写当前 OpenSpec artifact、apply tracks、source-map 或 registry，而不是修改 context pack 输出。

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

## 读取模型

| 层级 | 作用 |
|---|---|
| manifest | 了解可读取的契约来源和变更范围。 |
| summary | 判断当前 change 需要读取哪些契约段落。 |
| section | 读取实现当前任务所需的局部内容，并通过 `max_chars` 控制上下文大小。 |

Contract service 不是 mock backend，不是 API gateway，也不应暴露源码、密钥、环境变量或全仓库搜索结果。

## 与 OpenSpec 的关系

Context pack 和 contract service 都是读取层能力。它们可以帮助 AI 或开发者获得更小、更明确的上下文，但不能覆盖当前 OpenSpec change、baseline specs、source-map 或人工决策。

需要长期保留的结论，应回写到对应 artifact 或归档后的 baseline。
