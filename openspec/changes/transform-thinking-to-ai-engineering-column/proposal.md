# Proposal: transform-thinking-to-ai-engineering-column

## 背景与问题

- 当前问题：站点定位是 AI 时代的软件工程和 AI-Enhanced Software Engineering，但现有 `thinking` 栏目仍叫“观点文章”，且只有占位页，无法解释传统软件工程与 AI 增强软件工程的差异，也不能承接首页的 `Spec First / Harness Better / Compound Knowledge` 主线。
- 触发原因：维护者确认不希望继续把该栏目作为博客或随笔区，而是希望直接改造成正式的方法论基础栏目。
- 关联基线：openspec/project-docs.md

## 目标

- 将 `thinking` 栏目改造为 `AI Engineering` 方法论基础栏目，中文展示名为 `AI Engineering`，路由改为 `/ai-engineering/`。
- 将 collection 从 post/blog 形态改为 doc 形态，不再暴露博客文章、标签、归档、分类入口。
- 新增首批中文基础文章，解释传统软件工程与 AI 增强软件工程的变化、延续和本站方法论三主线。
- 在首页、导航、英文入口和基线文档中同步新的栏目定位。
- 保留英文 `/en/ai-engineering/` 入口占位，不在本轮重写完整英文正文。

## 不在范围

- 不在本 change 中重写 OpenSpec、Compound、AISEE 和学习路径正文。
- 不新增博客系统、评论系统、标签体系或文章归档。
- 不提供传统软件工程教材式百科内容。
- 不把 AI Engineering 写成泛泛行业趋势文章；正文必须服务本站方法论。
- 不补完整英文文章。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | `/ai-engineering/` | 新增 AI Engineering 方法论基础栏目，替代 `/thinking/`。 |
| 页面 | `site/ai-engineering/README.md` | 栏目首页，总览 AI 时代软件工程的变化和阅读路径。 |
| 页面 | `site/ai-engineering/*.md` | 新增 6 篇中文基础文章。 |
| 页面 | `site/en/ai-engineering/README.md` | 英文稳定入口，指向中文栏目。 |
| 删除/迁移 | `site/thinking/`、`site/en/thinking/` | 移除旧“观点文章 / Thinking”占位页。 |
| 导航/侧边栏 | `site/.vuepress/ia.ts`、`navbar.ts`、collections | 顶部导航改为 `学习路径 / AI Engineering / OpenSpec / Compound / AISEE / 推荐资源`；AI Engineering 使用 doc collection。 |
| 首页 | `HomePage.vue` | 内容地图和推荐路径加入 AI Engineering。 |
| 基线 | `openspec/project-docs.md` | 更新栏目结构、页面清单、阅读路径和术语约定。 |

## 成功标准

- [ ] 顶部导航展示 `AI Engineering`，并指向 `/ai-engineering/`。
- [ ] `/thinking/` 和 `/en/thinking/` 不再作为公开栏目生成。
- [ ] `/ai-engineering/` 有正式栏目首页，不再是博客占位页。
- [ ] 中文首批正文至少覆盖：传统与 AI 增强软件工程差异、没有改变的工程原则、从 Prompt 到 Spec、从 Tool 到 Harness、从经验到复利、工程师新职责。
- [ ] AI Engineering 侧边栏按“总览 / 方法基础 / 三条主线 / 角色变化”或等价结构组织。
- [ ] `/en/ai-engineering/` 作为英文稳定入口可访问，且不承诺完整英文正文已完成。
- [ ] 首页和基线文档中的栏目定位已同步。
- [ ] `pnpm docs:build` 通过。

## 约束与假设

- [ASSUMPTION] 当前站点仍处于建设期，可以直接把 `/thinking/` 路由迁移为 `/ai-engineering/`，不保留旧博客路由。
- [ASSUMPTION] 中文正文优先完成；英文栏目保持入口可用，后续单独重写。
- [DOC-GAP] `openspec/project-docs.md` 尚未记录 AI Engineering 栏目的正式页面清单和阅读路径。
- [SITE-CONFIG-IMPACT] `thinkingCollection` 需要从 post collection 改为 doc collection，并更新 `collections.ts` 导入导出。
