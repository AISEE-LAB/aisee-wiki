---
title: 工程流程
permalink: /aisee/workflows/
createTime: 2026/05/23 11:01:52
---

# 工程流程

工程流程把 OpenSpec、Compound、Harness 和 AISEE 连接成可执行链路。重点不是描述工具清单，而是说明一次 AI 增强工程任务如何从需求进入事实源、在受控环境中执行、经过验证后沉淀为可复用经验。

## 核心链路

```text
需求澄清
  -> 上下文整理
  -> change 规划
  -> 受控执行
  -> 验证与评审
  -> 归档与知识沉淀
```

## 方法关系

| 环节 | 主要作用 |
|---|---|
| AISEE | 整理需求、上下文、change 拆分和 handoff。 |
| OpenSpec | 固化目标、行为变化、设计判断和验收边界。 |
| Harness | 约束 Agent 的上下文、工具、权限、Hook 和验证命令。 |
| Compound | 承接计划、执行、评审、调试、复盘和知识复利。 |

## 相关方法

- [OpenSpec 基础工作流](/openspec/workflow/)
- [OpenSpec 的适用边界](/openspec/boundaries/)
- [Compound](/compound/)
