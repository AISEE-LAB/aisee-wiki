---
title: 从意图到 Change
permalink: /aisee/aisee-plugin/from-intent-to-change/
createTime: 2026/06/08 12:30:00
---

# 从意图到 Change

AISEE Plugin 的第一层价值，不是帮你更快写代码，而是帮你在实现前把模糊想法收束成一个可验证的 OpenSpec change。

## 为什么不能直接从聊天进入实现

当需求还停留在“帮我加这个功能”这种描述时，Agent 往往会自己补全：

- 哪些范围算本次 change；
- 哪些行为是必须保持不变的；
- 哪些页面、接口、数据或测试需要一起改；
- 什么叫“完成”。

这些补全如果没有进入事实源，就会把实现、review 和 verify 都带偏。

## 推荐顺序

```text
aisee:srs
  -> aisee:ui-content（有界面时）
  -> aisee:design-spec / design-assets（有视觉输入时）
  -> aisee:architecture
  -> aisee:change-plan
  -> /opsx:new <change> --schema <schema>
  -> aisee:change-author
```

## 每一步各写什么

| 步骤 | 作用 | 应该写什么 | 不应该写什么 |
|---|---|---|---|
| `aisee:srs` | 澄清业务目标、范围、验收标准 | 功能需求、非功能需求、成功标准 | 代码路径、任务清单 |
| `aisee:ui-content` | 把页面内容、状态、操作与权限写清楚 | 页面内容、状态、前端数据需求 | 视觉规范、组件选型 |
| `aisee:architecture` | 固化技术事实、边界与风险 | 依赖、约束、共享能力、风险 | 当前 change 的实现步骤 |
| `aisee:change-plan` | 把输入拆成可独立交付的 change | change list、依赖、schema 建议 | 直接代替 OpenSpec artifact |
| `aisee:change-author` | 按 schema 补齐 change artifacts | proposal、doc-change、tasks 或 app schema artifacts | 再复制一遍前置文档全文 |

## 一个好 change 长什么样

一个 AI 友好的 change，至少要满足这四件事：

1. **可以独立 validate**：不依赖“等另外两三个 change 一起完成再说”。
2. **可以独立验收**：读者或 reviewer 能明确看到本 change 解决了什么。
3. **可以独立归档**：tasks、evidence、review 结果都能闭环。
4. **失败时影响可控**：不会因为一个 change 太大，把多个不同问题绑在一起。

## 什么时候该停下来

出现下面任一情况，不应该继续推进实现：

| 信号 | 为什么要停 |
|---|---|
| 还说不清“这次不改什么” | 范围容易继续扩张 |
| UI 内容和技术约束互相冲突 | change 会在实现阶段反复返工 |
| 一个 change 想同时覆盖多个独立结果 | 无法独立验证和归档 |
| 读到一半发现缺关键输入 | 应先回到 SRS / UI / Architecture 补齐 |

## 和 OpenSpec 的分工

这里最容易误解的点是：Aisee 不替代 OpenSpec。

- **Aisee 负责把输入整理好**，并把它们转换成更容易 author 的 change。
- **OpenSpec 负责保存当前 change 的规范事实**，例如 proposal、spec、tasks、doc-change。

因此，正确路径是：

```text
前置输入
  -> Aisee 结构化
  -> OpenSpec change
  -> 实现 / review / verify
```

而不是：

```text
前置输入
  -> 直接实现
  -> 聊天记录代替 artifact
```

## 适合文档站的最小闭环

对这个文档站来说，常见路径会更轻一些：

```text
栏目目标
  -> 内容缺口判断
  -> /opsx:new <change> --schema aisee-docsite-driven
  -> proposal.md
  -> doc-change.md
  -> tasks.md
  -> 写正文 / 改导航 / 跑构建
```

重点不是生成更多文件，而是让“改哪些页面、为什么改、如何验证”在执行前就清晰。
