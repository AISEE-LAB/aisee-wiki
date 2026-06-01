# Doc Change: cleanup-demo-preview-and-recommendations

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：推荐资源、Demo、Blog preview
- 涉及页面：`/resources/`、`/en/resources/`、`/demo/`、`/en/demo/`、`/blog/*preview*`、`/en/blog/*preview*`
- 涉及导航/侧边栏：是
- 涉及站点配置：否

## Current Gap

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| 资源栏目命名 | 中文导航为“资源中心”，英文为 “Resources”。 | 当前页面实际是 AI Coding 推荐资源目录，命名仍暗示模板、术语、命令和检查清单集合。 |
| 资源首页 | `site/resources/README.md` 只渲染资源组件。 | 缺少公开页面定位说明；标题仍偏“目录”而不是“推荐”。 |
| 英文资源入口 | `site/en/resources/README.md` 承诺 templates、schema pack、command references、checklists、glossary 等。 | 与“主要展示推荐内容”的新定位不一致。 |
| Demo 页面 | `site/demo/`、`site/en/demo/` 生成 foo/bar 示例页。 | 正式文档站不应暴露框架示例。 |
| Blog preview 页面 | `site/blog/preview/`、`site/en/blog/preview/` 生成 Markdown 和自定义组件示例页。 | 示例页会稀释站点主题，也容易进入搜索索引。 |
| 资源旧子页 | glossary、reading-path 和重复 ai-coding-resources 页面仍存在。 | 与推荐资源单一定位不一致，且 `/resources/ai-coding-resources/` 与 `/resources/` 重复。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 修改 | 信息架构命名 | `site/.vuepress/ia.ts` | 将资源栏目中文名改为“推荐资源”，英文名改为 “Recommended Resources”。 |
| 修改 | 首页资源文案 | `site/.vuepress/theme/components/HomePage.vue` | 更新内容地图和 CTA，强调推荐资源而非泛资源中心。 |
| 修改 | 资源 collection | `site/.vuepress/collections/resources.ts` | 中文/英文 collection title 改为推荐资源，英文侧边栏只保留首页。 |
| 修改 | 中文推荐资源首页 | `site/resources/README.md` | 更新 title，并增加简短定位、更新日期和组件入口。 |
| 修改 | 英文推荐资源首页 | `site/en/resources/README.md` | 改为英文推荐资源占位入口，指向中文推荐资源。 |
| 删除 | Demo 示例页 | `site/demo/`、`site/en/demo/` | 移除公开 demo 页面。 |
| 删除 | Blog preview 示例页 | `site/blog/preview/`、`site/en/blog/preview/` | 移除公开 preview 示例页面。 |
| 删除 | 资源旧占位/重复页 | `site/resources/glossary.md`、`site/resources/reading-path.md`、`site/resources/ai-coding-resources.md`、`site/en/resources/glossary.md`、`site/en/resources/reading-path.md` | 推荐资源栏目只保留推荐资源首页。 |
| 修改 | 残留内链 | 英文入口页、流程示例等 | 去除指向已删除资源子页的链接。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/resources/` | 想快速发现 AI Coding 推荐项目、工具和方法论资源的读者。 | 推荐资源列表和分类卡片。 | 推荐定位、更新日期、资源组件。 | 模板库、命令速查、术语表、阅读路径、实时排行榜。 |
| `/en/resources/` | 英文读者和英文导航入口。 | 说明英文推荐资源内容尚未完整重写，并指向中文推荐资源。 | 推荐资源定位、中文入口。 | 英文完整资源目录、术语表或阅读路径链接。 |

## Site Impact

- 导航：中文顶部导航显示“推荐资源”，英文显示 “Recommended Resources”。
- 侧边栏：资源栏目中文和英文均只保留 `README.md`。
- 路由：保留 `/resources/` 和 `/en/resources/`；删除旧示例和旧资源子页后不再生成对应页面。
- 搜索影响：demo/preview/foo/bar/旧资源占位页不再进入本地搜索索引。
- 多语言影响：英文资源入口仍是简短入口，不提供完整英文推荐目录。
- 构建/部署影响：删除页面后需要运行 `pnpm docs:build` 验证。

## Validation

- [x] `/resources/` 可访问并展示推荐资源。
- [x] `/en/resources/` 可访问且无旧资源子页链接。
- [x] 顶部导航和首页文案使用新名称。
- [x] `rg` 检查不再有公开 demo/preview 示例页面。
- [x] `pnpm docs:build` 通过；仍有 `@vueuse/core` 上游 Rolldown pure annotation 警告。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新。
- [x] 栏目结构已更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A
