# Tasks: cleanup-demo-preview-and-recommendations

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容和页面清理

- [x] 1.1 删除 `site/demo/` 与 `site/en/demo/` 下的公开示例页面。
- [x] 1.2 删除 `site/blog/preview/` 与 `site/en/blog/preview/` 下的公开 preview 示例页面。
- [x] 1.3 删除中文资源旧占位页和重复页：`site/resources/glossary.md`、`site/resources/reading-path.md`、`site/resources/ai-coding-resources.md`。
- [x] 1.4 删除英文资源旧占位页：`site/en/resources/glossary.md`、`site/en/resources/reading-path.md`。
- [x] 1.5 检查并移除指向已删除页面的内链。

## 2. 推荐资源定位统一

- [x] 2.1 将信息架构中的资源栏目中文名改为“推荐资源”，英文名改为 “Recommended Resources”。
- [x] 2.2 更新首页内容地图、推荐路径和资源 CTA 文案，强调推荐资源定位。
- [x] 2.3 更新 `resourcesCollection` 与 `resourcesEnCollection` 标题，并让英文资源侧边栏只保留首页。
- [x] 2.4 更新 `site/resources/README.md`：title 改为“AI Coding 推荐资源”，正文增加简短定位和更新日期，再展示资源组件。
- [x] 2.5 更新 `site/en/resources/README.md`：title 改为 “Recommended Resources”，说明英文资源页尚未完整重写，并指向中文推荐资源。

## 3. 基线更新

- [x] 3.1 更新 `openspec/project-docs.md` 的栏目结构，记录“推荐资源”定位。
- [x] 3.2 更新页面清单，加入 `/resources/`，并移除或不再提及 demo/preview 与旧资源子页。
- [x] 3.3 更新内容缺口，记录术语表、模板、命令速查和检查清单需要后续独立规划。
- [x] 3.4 更新归档记录，记录本次清理和命名调整。

## 4. 验证

- [x] 4.1 使用 `rg` 检查 `site/` 下不再存在 demo/preview 公开 Markdown 页面。
- [x] 4.2 使用 `rg` 检查不再有指向已删除资源子页的 Markdown 内链。
- [x] 4.3 运行 `pnpm docs:build`。
- [x] 4.4 记录构建结果和任何非阻塞警告：构建成功，渲染 59 页；仍有 `@vueuse/core` 上游 Rolldown pure annotation 警告。

## 5. Archive Gate

- [x] 5.1 完成 doc-change.md 中的 Archive Updates。
- [x] 5.2 确认 `openspec/project-docs.md` 已回写。
- [x] 5.3 确认验证结果已记录。
- [x] 5.4 确认本 change 可归档。
