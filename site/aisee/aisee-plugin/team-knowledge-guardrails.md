---
title: Team Knowledge Guardrails
permalink: /aisee/aisee-plugin/team-knowledge-guardrails/
createTime: 2026/06/08 12:30:00
---

# Team Knowledge Guardrails

Team knowledge 是 Aisee 里最容易被误解的部分。很多团队一看到“知识库复用”，就会本能地把所有 docs、solutions、memory 和 reflect 都搬进一个大仓库。Aisee 刻意不这么做。

## 它到底是什么

Team knowledge 的目标很窄：

> 跨项目复用少量、经审查、可定位的工程经验。

它更像 guardrail 卡片，而不是万能问答库。

## 它不是什么

- 不是 OpenSpec specs 的替代品；
- 不是项目 memory 的跨项目复制；
- 不是把 `docs/solutions/` 整库同步出去；
- 不是 AI 可随意搜索的全量知识仓库；
- 不是稳定的“事实源二号位”。

## 推荐闭环

```text
aisee:reflect
  -> 生成项目内 knowledge candidates
  -> aisee:knowledge-curate
  -> 用户确认
  -> promote-batch 写入 team repo
```

这个顺序很重要，因为它把“当前项目的候选经验”和“团队级可复用规则”明确隔开了。

## 为什么要先 reflect 再 curate

因为很多经验一开始只是“这次任务里的局部判断”，并不一定适合推广。直接写入 team knowledge 容易引入三类噪声：

- 只适用于单一项目的临时约定；
- 含有敏感路径、内部命名或上下文；
- 和现有卡片重复，甚至相互矛盾。

curate 的作用就是做这层筛选、去敏和泛化。

## 查询时要克制

推荐调用方式：

```bash
aisee knowledge query --from-change <change> --for ce-work --json
```

理想结果是：

- 返回很少量的 matches；
- 每条都与当前任务的风险面直接相关；
- 起提醒作用，而不是覆盖当前 change 事实。

## 什么时候不该查

| 场景 | 原因 |
|---|---|
| 当前 change 本身还没写清楚 | 先补 change，别拿 team knowledge 代替规范 |
| 想靠 team knowledge 决定业务需求 | 需求应来自当前项目事实，不来自跨项目经验 |
| 想把整个知识仓库喂给 Agent | 会制造噪声并放大错配风险 |

## 对维护者最有价值的判断

当你看到一条“经验”时，先问这三个问题：

1. 它是稳定规则，还是当前项目的一次性决策？
2. 它能泛化成跨项目指导吗？
3. 它如果过时，谁来刷新？

如果三个问题都答不稳，就先留在当前项目的 reflect 或 solutions 里，不要急着提升到 team knowledge。
