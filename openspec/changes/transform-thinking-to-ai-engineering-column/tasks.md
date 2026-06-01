# Tasks: transform-thinking-to-ai-engineering-column

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 栏目结构

- [x] 1.1 删除旧 `site/thinking/README.md` 和 `site/en/thinking/README.md`。
- [x] 1.2 新增 `site/ai-engineering/README.md` 和 `site/en/ai-engineering/README.md`。
- [x] 1.3 将 collection 从 post/blog 形态改为 doc collection：新增 `site/.vuepress/collections/ai-engineering.ts` 并更新 `collections.ts`。
- [x] 1.4 更新 `site/.vuepress/ia.ts`，将 `thinking` 改为 `ai-engineering`，展示名为 `AI Engineering`。
- [x] 1.5 更新 `site/.vuepress/navbar.ts` 顶栏顺序为 `learn / ai-engineering / openspec / compound / aisee / resources`，展示文案统一为 `AISEE`。
- [x] 1.6 更新首页内容地图和推荐路径，加入 AI Engineering。

## 2. 中文正文

- [x] 2.1 新增 `traditional-vs-ai-engineering.md`，解释传统软件工程与 AI 增强软件工程的变化。
- [x] 2.2 新增 `what-does-not-change.md`，解释 AI 没有改变、反而放大的工程原则。
- [x] 2.3 新增 `prompt-to-spec.md`，解释从 Prompt 到 Spec 的必要性。
- [x] 2.4 新增 `tool-to-harness.md`，解释从 Tool 到 Harness 的工程化边界。
- [x] 2.5 新增 `experience-to-compounding.md`，解释从经验到工程复利。
- [x] 2.6 新增 `engineer-role.md`，解释工程师在 AI 时代的新职责。
- [x] 2.7 每篇文章至少包含表格、流程、检查清单或结构化分组，避免成为纯观点散文。

## 3. 基线和内链

- [x] 3.1 更新 `openspec/project-docs.md` 的栏目结构，加入 AI Engineering。
- [x] 3.2 更新页面清单，记录 AI Engineering 首页和 6 篇正文。
- [x] 3.3 更新阅读路径，让 AI Engineering 位于学习路径之后、OpenSpec 之前。
- [x] 3.4 更新后续缺口，记录英文 AI Engineering 正文待补。
- [x] 3.5 检查并替换旧 `/thinking/`、`/en/thinking/` 内链。

## 4. 验证

- [x] 4.1 使用 `rg` 检查 `site/` 下不再有旧 thinking 公开 Markdown 页面。
- [x] 4.2 使用 `rg` 检查不再有指向 `/thinking/` 或 `/en/thinking/` 的站内链接。
- [x] 4.3 运行 `pnpm docs:build`，构建成功，渲染 57 页；仍有 `@vueuse/core` 上游 Rolldown pure annotation 警告。
- [x] 4.4 通过构建产物检查 `/ai-engineering/` 和 `/en/ai-engineering/` 已生成。

## 5. Archive Gate

- [x] 5.1 完成 doc-change.md 中的 Archive Updates。
- [x] 5.2 确认 `openspec/project-docs.md` 已回写。
- [x] 5.3 确认验证结果已记录。
- [x] 5.4 确认本 change 可归档。
