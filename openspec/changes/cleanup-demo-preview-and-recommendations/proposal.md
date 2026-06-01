# Proposal: cleanup-demo-preview-and-recommendations

## 背景与问题

- 当前问题：站点仍生成 VuePress demo、blog preview、foo/bar 等示例页面；资源栏目展示名仍叫“资源中心”，但当前公开内容的实际定位已经变成 AI Coding 推荐资源目录。
- 触发原因：维护者要求清理 demo/preview，并统一资源栏目定位，明确该栏目主要展示推荐内容；资源中心名称可以调整。
- 关联基线：openspec/project-docs.md

## 目标

- 从公开站点源码中移除 demo、blog preview 和示例 foo/bar 页面，避免框架示例进入正式文档站。
- 将资源栏目展示名统一为“推荐资源”，英文为 “Recommended Resources”，保留 `/resources/` 与 `/en/resources/` 路由。
- 让资源栏目首页明确表达“精选推荐”定位，而不是模板、术语表、命令速查、检查清单等泛资源中心。
- 移除或取消暴露与推荐资源定位不一致的旧资源占位页和重复资源页。

## 不在范围

- 不新增新的推荐资源数据源、排序算法、评分系统或后端同步能力。
- 不重写全部英文栏目正文。
- 不改变 `/resources/` 主路由，避免破坏已有入口。
- 不处理 AISEE、Thinking 等其他内容占位页。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | `/resources/`、`/en/resources/` | 展示名改为“推荐资源 / Recommended Resources”。 |
| 页面 | `site/resources/README.md`、`site/en/resources/README.md` | 首页文案改为推荐资源定位。 |
| 页面 | `site/demo/`、`site/en/demo/`、`site/blog/preview/`、`site/en/blog/preview/` | 删除公开 demo 和 preview 示例页面。 |
| 页面 | `site/resources/glossary.md`、`site/resources/reading-path.md`、`site/resources/ai-coding-resources.md` 及英文旧资源子页 | 移除旧占位页或重复推荐页，资源栏目只保留推荐资源首页。 |
| 导航/侧边栏 | `site/.vuepress/ia.ts`、`site/.vuepress/collections/resources.ts`、首页组件 | 更新栏目名称、描述和 CTA 文案。 |
| 路由/frontmatter | `/resources/`、`/en/resources/` | 保留稳定主路由，更新 title。 |
| 站点配置 | N/A | 不新增依赖，不改构建工具。 |

## 成功标准

- [ ] 公开站点不再生成 demo、foo/bar、blog preview 示例页面。
- [ ] 顶部导航、首页内容地图、首页 CTA、中文/英文资源 collection 名称统一为“推荐资源 / Recommended Resources”。
- [ ] `/resources/` 默认展示 AI Coding 推荐资源目录，并有简短定位说明。
- [ ] `/en/resources/` 表达英文推荐资源入口，不再承诺模板、术语表、命令速查等泛资源中心内容。
- [ ] 相关内链不再指向已删除的资源旧占位页。
- [ ] `pnpm docs:build` 通过。
- [ ] 归档前已处理 `openspec/project-docs.md` 回写。

## 约束与假设

- [ASSUMPTION] 本次只是改变栏目展示定位，主路由 `/resources/` 保持不变。
- [ASSUMPTION] 术语表、阅读路径、命令速查、模板和检查清单后续如需要，应作为独立 change 重新规划，不继续放在当前推荐资源栏目下。
- [DOC-GAP] `openspec/project-docs.md` 需要补充推荐资源栏目正式定位和页面状态。
- [SITE-CONFIG-IMPACT] 删除 Markdown 页面会减少 VuePress 生成页面数量；需要构建验证确认无遗留链接。
