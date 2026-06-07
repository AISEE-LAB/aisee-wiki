# Doc Change: restructure-aisee-navigation

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：学习路径、AISEE、OpenSpec、Compound Engineering、开源项目、推荐资源
- 涉及页面：`/learn/`、`/aisee/`、`/openspec/`、`/compound/`、`/projects/`、英文 locale 对应入口
- 涉及导航/侧边栏：是
- 涉及站点配置：是

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| 顶栏导航 | `学习路径 / AI Engineering / OpenSpec / Compound / AISEE / 推荐资源` 平级展示 | 维护者希望 OpenSpec 和 Compound Engineering 放入 AISEE 栏目中，与 AISEE Plugin 形成三个子栏目；AISEE 顶栏项应展示二级菜单，并直接进入对应子栏目。 |
| 学习路径 | 中文展示名为 `学习路径`，英文为 `Learn` | 命名偏课程路线，不够像文档站入口；维护者希望改为 `指南`。 |
| AISEE 栏目 | `/aisee/` 承载 AISEE 方法、插件与工作流入口；侧边栏仍包含 `流程讲解组件示例` stale 链接 | AISEE 栏目需要明确成为 AISEE Plugin、OpenSpec、Compound Engineering 的统一入口，同时避免暗示 OpenSpec 和 Compound Engineering 属于 AISEE 自有项目。 |
| OpenSpec / Compound Engineering | 各自拥有独立顶栏入口和 doc collection | 需要从顶栏平级入口收束到 AISEE 栏目下，但现有内容路由可保留，避免破坏已发布链接。 |
| 开源项目 | 当前无独立栏目 | 缺少 AISEE 团队自有或主导开源项目清单和项目介绍入口，容易与外部推荐资源混用。 |
| 推荐资源 | `/resources/` 已收束为精选外部资源目录 | 需要继续保持“外部推荐资源”定位，与新增“开源项目”栏目区分。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 新增 | 开源项目栏目首页 | `site/projects/README.md`、`site/en/projects/README.md` | 建立 AISEE 团队自有开源项目栏目入口，说明与推荐资源的区别；项目详情不足时先保留清单结构和待补信息。 |
| 新增 | Projects collection | `site/.vuepress/collections/projects.ts` | 新增中英文 doc collection，侧边栏先保留栏目首页。 |
| 修改 | IA 配置 | `site/.vuepress/ia.ts` | 将 `learn` 展示名改为 `指南 / Guides`；新增 `projects`；更新 `aisee` 定位。 |
| 修改 | 顶栏导航 | `site/.vuepress/navbar.ts` | 顶栏调整为 `首页 / 指南 / AI Engineering / AISEE / 开源项目 / 推荐资源`；`AISEE` 为二级菜单，包含 `AISEE Plugin`、`OpenSpec`、`Compound Engineering`，英文 locale 对应更新。 |
| 修改 | Collections 汇总 | `site/.vuepress/collections.ts` | 加入 projects collection；从顶栏移除不代表删除 collection，OpenSpec 和 Compound 仍可作为 doc collection 保持页面可访问。 |
| 修改 | AISEE 侧边栏 | `site/.vuepress/collections/aisee.ts` | 侧边栏收束为 `AISEE Plugin`、`OpenSpec`、`Compound Engineering` 三个子栏目入口，并移除已删除页面 stale 链接。 |
| 修改 | AISEE 栏目首页 | `site/aisee/README.md`、`site/en/aisee/README.md` | 首屏明确：本栏目从 AISEE 工作流视角介绍 AISEE Plugin、OpenSpec、Compound Engineering；OpenSpec 和 Compound Engineering 是独立开源项目。 |
| 修改 | 指南栏目展示 | `site/learn/README.md`、`site/en/learn/README.md`、collection title | 页面标题、栏目文案和入口名称从学习路径收束为指南；路由继续使用 `/learn/`。 |
| 修改 | 首页入口和内容地图 | `site/.vuepress/theme/components/HomePage.vue` 或相关首页内容配置 | 更新首页栏目地图、推荐路径和 CTA，匹配 `指南 / AISEE / 开源项目 / 推荐资源` 新定位。 |
| 修改 | 英文入口 | `site/en/aisee/README.md`、`site/en/projects/README.md`、相关 collection | 保持英文入口可访问，优先说明定位，不强行补完整英文专题正文。 |
| 修改 | 文档基线 | `openspec/project-docs.md` | 归档前回写栏目结构、页面清单、阅读路径、术语与站点结构约定。 |
| 删除 | AISEE stale 链接 | `site/.vuepress/collections/aisee.ts` | 删除指向 `/aisee/workflows/flow-explainer/` 的侧边栏入口。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/aisee/` | 想理解本站主线实践组合的读者 | AISEE Plugin、OpenSpec、Compound Engineering 的关系和组合使用边界 | 明确 OpenSpec / Compound Engineering 是独立开源项目；AISEE 栏目只是从本站实践视角做深度介绍 | 不宣称 OpenSpec 或 Compound Engineering 属于 AISEE 自有生态 |
| `/projects/` | 想了解 AISEE 团队自有项目的读者 | 团队开源项目清单、项目定位、状态、仓库入口和后续补充说明 | 与推荐资源的边界：团队资产 vs 外部精选 | 不放外部项目推荐榜单，不替代 `/resources/` |
| `/learn/` | AI Coding 新读者 | 从入门、环境、工具到 Agent 基础的指南入口 | 展示名改为 `指南`，保留原学习路线内容价值 | 不大规模重写所有教程正文 |
| `/resources/` | 想找外部参考资料的读者 | 精选外部项目、工具、文章和方法论资源 | 明确这是推荐资源，不是团队项目列表 | 不承载 AISEE 团队项目详情 |

## Site Impact

- 导航：中文顶栏改为 `首页 / 指南 / AI Engineering / AISEE / 开源项目 / 推荐资源`；英文顶栏改为 `Home / Guides / AI Engineering / AISEE / Open Source / Recommended Resources`；其中 `AISEE` 是二级菜单，不是普通链接。
- 侧边栏：AISEE 侧边栏新增或调整为 `AISEE Plugin / OpenSpec / Compound Engineering` 入口；OpenSpec 和 Compound Engineering 页面仍保持自身 collection 与路由可访问。
- 路由：`/learn/` 保留；新增 `/projects/` 和 `/en/projects/`；`/openspec/`、`/compound/` 不删除，避免破坏外部链接。
- frontmatter：新增 projects 首页需要 `title`、`permalink`、`createTime`；英文入口按现有 locale 习惯处理。
- 标签/分类：不新增标签体系。
- 搜索影响：新增 projects 页面会进入站内搜索；导航命名变化会影响搜索结果标题。
- 多语言影响：中文优先落地；英文入口同步导航和定位说明，但不在本 change 中补全所有英文正文。
- 构建/部署影响：仅影响静态文档站配置和 Markdown 页面；不涉及部署配置。

## Validation

- [ ] 页面路径可访问。
- [ ] 导航/侧边栏入口正确。
- [ ] 内链有效。
- [ ] 代码块、命令或示例已检查。
- [ ] 文档站构建或预览检查通过。
- [ ] 需要时已截图或人工预览。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新。
- [x] 栏目结构已更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A。本 change 改变长期栏目结构，必须回写。
