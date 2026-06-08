---
title: Verify 与 Archive Guard
permalink: /aisee/aisee-plugin/verify-and-archive-guard/
createTime: 2026/06/08 12:30:00
---

# Verify 与 Archive Guard

AISEE Plugin 的最后一道价值，不是“帮你点一下 archive”，而是阻止一个看起来做完、实际上证据还没闭环的 change 被过早归档。

## Verify 检查什么

`aisee:verify` 关注的是当前 change 有没有形成基本闭环：

- schema artifacts 是否存在；
- Required contracts 是否补齐；
- `tasks.md` 或 apply tracks 是否真的完成；
- `openspec validate` 是否通过；
- review / test / manual evidence 是否足够；
- 是否还有 blocker 没回写。

它的结论应该是：

```text
哪些地方已经闭环
哪些地方还缺证据
哪些风险需要升级处理
```

而不是一句抽象的“看起来差不多”。

## Archive guard 再多做一层什么

Archive guard 不是 verify 的重复，而是**归档前的最终门禁**。它重点看：

- 当前 change 是否真的满足 archive 条件；
- accepted risk 是否有 owner、理由和后续处理方式；
- 还有没有“明知没做完但准备先归档”的情况。

## 最低证据清单

不同项目会有差异，但至少应该能回答：

| 问题 | 证据来自哪里 |
|---|---|
| 这个 change 真按目标完成了吗？ | artifacts、diff、人工核对 |
| 相关验证跑了吗？ | 测试、构建、预览、截图、命令输出 |
| review 发现处理了吗？ | review 记录、修复结果、残余风险 |
| 还有哪些没做？ | tasks、accepted risk、follow-up |

## 常见误区

### 1. `openspec validate` 过了就归档

`validate` 只说明 change 结构合法，不等于实现、测试、review 都已经闭环。

### 2. 证据只留在聊天里

聊天记录不是好证据，因为：

- 不稳定；
- 难检索；
- 很难和具体 change 一一对应。

更可靠的方式，是把结果回写到 tasks、apply tracks、review 记录或可追溯的 evidence 路径。

### 3. 把 accepted risk 当成免责区

accepted risk 不是“先忽略再说”，而是必须明确：

- 谁接受；
- 为什么接受；
- 影响范围是什么；
- 后续怎么收敛。

## 文档站 change 的实际检查

对这个仓库而言，verify / archive guard 通常至少要覆盖：

- 页面路径可访问；
- 顶栏和侧边栏入口正确；
- 内链没有 stale link；
- `pnpm docs:build` 通过；
- 如果是关键首页或栏目页，最好有人眼预览。

## 一句原则

如果你还不能清楚回答“我们凭什么说它完成了”，那就还不该 archive。
