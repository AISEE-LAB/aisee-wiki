---
title: Schema Packs 与 Authoring
permalink: /aisee/aisee-plugin/schema-packs-and-authoring/
createTime: 2026/06/08 12:30:00
---

# Schema Packs 与 Authoring

Schema pack 决定一个 OpenSpec change 里需要哪些 artifacts、它们的依赖顺序，以及 authoring 时该强调什么。它不是业务规范本身，而是帮助 change 以一致方式落地的工作流骨架。

## 先选对 schema

| 场景 | 推荐 schema | 为什么 |
|---|---|---|
| 新功能、跨模块软件变更 | `aisee-app-spec-driven` | 需要 specs、source-map、按需 contracts 和 tasks 闭环 |
| 文档站、知识库、教程内容建设 | `aisee-docsite-driven` | 以页面、导航、内链和构建验证为核心交付物 |
| 单点低风险修复 | `quick-fix` | 避免为小问题生成过重 artifacts |
| 技术调研或方案比较 | `quick-research` | 重点是 findings 与 recommendation，不直接承诺实现 |
| 基础设施变更 | `infra-change` | 需要影响评估与回滚视角 |

对这个仓库，栏目建设默认应选 `aisee-docsite-driven`，不要因为内容里提到接口、图示或组件，就退回更重的 app schema。

## `aisee-docsite-driven` 的闭环

```text
proposal.md
  -> doc-change.md
  -> tasks.md
  -> apply
  -> verify
  -> archive
```

各自职责：

| Artifact | 回答什么问题 | 不该写什么 |
|---|---|---|
| `proposal.md` | 为什么改、改哪里、不改哪里、成功标准是什么 | 全站 inventory 或正文全文 |
| `doc-change.md` | 本次新增/修改/删除哪些页面与结构对象 | 无关栏目历史 |
| `tasks.md` | 写作、导航、验证、archive gate 的执行清单 | 重新抄一遍 proposal |

## Authoring 时最容易犯的错

### 1. 把 schema 当“越完整越好”

schema 的价值在于**合适**，不是越重越好。小修复强行走大 schema，只会制造噪声。

### 2. 把前置文档复制进 change

前置输入是 change 的来源，不应原样拷贝到 artifact 里。change 只保留当前这次变化必须用到的判断。

### 3. 不写 N/A 原因

当某个 artifact、contract 或站点结构不适用时，要明确写 N/A 原因。空模板和“以后可能会用到”都不是有效说明。

## 对文档站最关键的三项 authoring 判断

| 判断 | 要写清楚什么 |
|---|---|
| 页面差异 | 新增、修改、迁移、删除了哪些页面或路径 |
| 站点结构影响 | 顶栏、侧边栏、路由、frontmatter、搜索、多语言是否受影响 |
| 验证方式 | 页面可访问、内链、构建、人工预览如何检查 |

## 文档站示例

本站的 `AISEE Plugin` 栏目是 `aisee-docsite-driven` schema 的一个应用示例：

- 顶层 `/aisee/` 保持不变，这是栏目规范。
- 子入口从 `/aisee/workflows/` 改到 `/aisee/aisee-plugin/`，属于**路由与导航影响**。
- 新增多个专题页，属于**页面差异**。
- 必须更新 `openspec/project-docs.md`，属于**archive updates**。

## 一句话判断

如果你还在犹豫该写哪份 artifact，先问自己：

> 这是在描述“为什么与改什么”，还是在描述“怎么执行与怎么验证”？

- 前者优先落到 proposal / doc-change。
- 后者优先落到 tasks。
