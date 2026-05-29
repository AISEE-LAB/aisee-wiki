---
title: OpenSpec 栏目内容建设收尾流程
date: 2026-05-29
category: documentation-gaps
module: OpenSpec 栏目
problem_type: documentation_gap
component: documentation
severity: medium
applies_when:
  - "需要把一个教程栏目从占位页建设为可发布的系统正文"
  - "需要用 OpenSpec 管理文档站内容 change 并完成 archive gate"
  - "需要同时处理正文、侧边栏、阅读路径、图示资产和项目文档基线"
tags: [openspec, documentation, vuepress, tutorial-content, archive-gate]
---

# OpenSpec 栏目内容建设收尾流程

## Context

`build-openspec-column-content` 解决的是一个文档栏目从占位到可发布的问题。`/openspec/` 原本只有极短定位和入口链接，无法承接 `/learn/` 之后的进阶阅读，也没有把 OpenSpec 的作用、模型、用法、扩展和边界讲清楚。

这类工作不能只靠“逐篇写文章”。如果只完成正文，侧边栏、阅读路径、英文入口、图示资源、项目文档基线和 archive gate 很容易缺漏。最终完成的路径是：先用 `aisee-docsite-driven` change 固化范围，再逐篇提交正文，最后集中做栏目级收尾检查并归档。

## Guidance

把教程栏目建设拆成三个层次，而不是把所有工作混在一篇文章里。

第一层是内容范围。先在 change artifacts 中明确本栏目讲什么、不讲什么。OpenSpec 栏目的边界是“OpenSpec 自身的能力、扩展、作用和用法”，不是“从 SRS 到 OpenSpec Change 的完整链路”。这个边界必须写进栏目首页或边界页，否则后续文章会滑向 aisee 或 workflows 的主题。

第二层是页面序列。按照读者理解顺序建立固定结构：

1. 栏目首页：定位、能力地图和推荐阅读顺序。
2. 作用层：OpenSpec 是什么。
3. 模型层：`specs`、`changes`、artifacts、archive。
4. 用法层：workflow、artifact guide、spec granularity、delta spec。
5. 扩展层：schema。
6. 边界层：什么时候适合或不适合使用 OpenSpec。

第三层是发布收尾。正文完成后，需要单独做栏目级检查：

- 侧边栏分组是否和内容结构一致。
- 每篇 frontmatter 是否包含 `title`、`permalink`、`createTime`。
- 页面是否保持平铺路由 `/openspec/<slug>/`。
- 内链是否指向已存在页面。
- 图示是否有可维护源文件，并导出到 `site/.vuepress/public/`。
- `/learn/`、`/resources/reading-path/`、`/workflows/` 是否升级到具体 OpenSpec 页面。
- 英文入口是否说明中文内容优先建设，而不是暗示英文正文已经完成。
- `openspec/project-docs.md` 是否回写栏目结构、页面清单、阅读路径、内容状态和后续缺口。
- `doc-change.md` 的 Validation 和 Archive Updates 是否同步完成。
- `tasks.md` 是否记录实际验证命令和结果。

图示资产要 source-first 维护。边界页的流程图最初出现了流程图符号和排版问题，后续修正为纵向标准流程图：主路径自上而下，判断节点使用菱形，分支横向进入处理结果。修正时应改 `.excalidraw` 源文件，再导出 SVG，不直接修导出物。

## Why This Matters

教程栏目建设的风险不是“少写一段内容”，而是栏目作为系统失去一致性。读者进入一个方法论栏目时，需要知道阅读顺序、每篇文章的边界、下一步该去哪里，以及哪些内容还没完成。

OpenSpec 对这种内容工作有两个价值：

- 它把栏目建设看成一个可验证 change，而不是一串聊天指令。
- 它强制 archive 前回写长期事实源，避免站点基线停留在旧状态。

这次收尾后，OpenSpec CLI 返回 `37/37` tasks complete，`state: all_done`；change 被归档到 `openspec/changes/archive/2026-05-29-build-openspec-column-content/`。这比只提交正文更可靠，因为后续维护者可以从 archived artifacts 看到当时为什么这么组织栏目。

## When to Apply

- 新增或重写一个教程栏目，而不是只改一篇文章。
- 栏目需要跨多个页面、侧边栏、阅读路径和静态资源协同更新。
- 内容有明确边界，容易和相邻栏目混淆。
- 文档站有长期基线文件，需要在归档前回写。
- 图示需要长期维护，不能只保留导出的 SVG。

## Examples

### 推荐的 change 任务结构

```markdown
## 2. 中文页面写作

- [x] 栏目首页
- [x] 作用层页面
- [x] 模型层页面
- [x] 用法层页面
- [x] 扩展层页面
- [x] 边界层页面
- [x] 逐篇内容质量检查

## 3. 站点结构与配置

- [x] 更新 sidebar 分组
- [x] 确认平铺路由和 frontmatter
- [x] 更新英文入口和阅读路径
- [x] 确认图示资源发布路径

## 6. Archive Gate

- [x] 完成 doc-change.md Archive Updates
- [x] 回写 openspec/project-docs.md
- [x] 记录验证结果
- [x] 确认可归档
```

### 图示维护约定

```text
docs/assets/diagram-logic/<diagram>.md
site/.vuepress/public/diagrams/<section>/<diagram>.excalidraw
site/.vuepress/public/diagrams/<section>/<diagram>.svg
```

逻辑文档说明图要表达什么，`.excalidraw` 是可维护源文件，`.svg` 只是站点展示产物。

### 收尾验证命令

```bash
git diff --check
pnpm docs:build
openspec instructions apply --change "<change-name>" --json
```

如果页面包含关键图示或侧边栏调整，再用本地预览打开对应页面做人工截图检查。

## Related

- `openspec/changes/archive/2026-05-29-build-openspec-column-content/`
- `openspec/project-docs.md`
- `site/openspec/`
- `docs/assets/diagram-logic/openspec-boundary-decision.md`
