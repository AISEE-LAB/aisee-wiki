# Proposal: restructure-aisee-navigation

## 背景与问题

- 当前问题：站点顶栏同时放置 `AISEE`、`OpenSpec`、`Compound Engineering`，三者关系缺少统一入口；`学习路径` 的栏目名偏课程化，不够像文档站的入门指南；站点还缺少一个专门介绍 AISEE 团队自有开源项目的栏目，导致团队项目和外部推荐资源边界不够清楚。
- 触发原因：维护者确认希望将 `OpenSpec` 和 `Compound Engineering` 放入 `AISEE` 栏目中，与 `AISEE Plugin` 作为三个子栏目呈现；同时新增团队开源项目栏目，并将 `学习路径` 改为更合适的 `指南`。
- 关联基线：openspec/project-docs.md

## 目标

- 将顶栏调整为更清晰的信息架构：`首页 / 指南 / AI Engineering / AISEE / 开源项目 / 推荐资源`，其中 `AISEE` 是二级菜单入口。
- 将 `AISEE` 作为主线实践入口，包含 `AISEE Plugin`、`OpenSpec`、`Compound Engineering` 三个子栏目。
- 点击顶栏 `AISEE` 时展示二级菜单，用户可直接进入 `AISEE Plugin`、`OpenSpec` 或 `Compound Engineering`。
- 在 `AISEE` 栏目总览页明确说明：OpenSpec 和 Compound Engineering 是独立开源项目，本站在 AISEE 工作流视角下做深度介绍和组合实践说明，不暗示项目归属。
- 将原 `学习路径` 栏目改名为 `指南`，英文对应 `Guides`，保留既有入门、环境、工具和 Agent 基础内容。
- 新增 `开源项目` 栏目，用于展示 AISEE 团队自有或主导的开源项目清单和项目介绍，并与外部 `推荐资源` 区分。
- 更新中英文导航、侧边栏、首页入口、栏目描述和站点基线文档，使新的栏目定位一致。

## 不在范围

- 不重写 OpenSpec、Compound Engineering、AI Engineering 现有正文体系。
- 不把 OpenSpec 或 Compound Engineering 表述为 AISEE 自有项目、子项目或官方生态。
- 不新增真实项目详情页的完整正文；若项目清单信息不足，可以先建立栏目入口、定位说明和占位结构。
- 不调整推荐资源的筛选数据、分类体系或资源卡片内容。
- 不处理站点部署、搜索、评论、CI/CD 或主题升级。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | `learn`、`aisee`、`openspec`、`compound`、`projects`、`resources` | `learn` 展示名改为 `指南`；新增 `projects`；`OpenSpec` 和 `Compound Engineering` 从顶栏平级入口收束到 `AISEE` 栏目下。 |
| 页面 | `site/aisee/README.md`、`site/en/aisee/README.md`、`site/projects/README.md`、`site/en/projects/README.md`、相关栏目首页 | 更新 AISEE 总览定位；新增团队开源项目栏目首页；按需调整指南页标题和描述。 |
| 导航/侧边栏 | `site/.vuepress/navbar.ts`、`site/.vuepress/ia.ts`、`site/.vuepress/collections.ts`、相关 collection 配置 | 顶栏只保留新版栏目；AISEE 顶栏项展示 AISEE Plugin、OpenSpec、Compound Engineering 二级菜单；AISEE 侧边栏包含相同入口；新增 Projects collection；移除 stale 链接。 |
| 路由/frontmatter | `/learn/`、`/aisee/`、`/projects/`、`/resources/`、英文 locale 对应路径 | 既有 `/learn/` 路由可以保留，仅调整栏目名；新增 `/projects/` 与 `/en/projects/`。 |
| 站点配置 | VuePress Plume collection / navbar / IA 配置 | 需要保证中英文导航、集合顺序和首页入口一致。 |

## 成功标准

- [ ] 目标页面或栏目内容已补齐。
- [ ] 涉及的导航、侧边栏或路由入口正确。
- [ ] 相关链接和引用已检查。
- [ ] 文档站构建或预览检查通过。
- [ ] 归档前已处理 openspec/project-docs.md 回写。

## 约束与假设

- [ASSUMPTION] `指南` 只是展示名调整，路由继续使用 `/learn/`，避免破坏既有链接。
- [ASSUMPTION] 新栏目中文名使用 `开源项目`，英文名使用 `Open Source`，路由使用 `/projects/`。
- [DOC-GAP] AISEE 团队自有开源项目的正式清单、仓库 URL、成熟度和项目描述仍需维护者补充；本 change 可以先建立栏目边界和入口结构。
- [SITE-CONFIG-IMPACT] 本 change 会影响导航、collection、侧边栏、首页内容地图、英文 locale 和 `openspec/project-docs.md`。
