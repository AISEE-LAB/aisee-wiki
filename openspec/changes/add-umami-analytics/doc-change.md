# Doc Change: add-umami-analytics

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：全站
- 涉及页面：全站公开页面（通过全局配置注入）
- 涉及导航/侧边栏：否
- 涉及站点配置：是

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| `site/.vuepress/config.ts` | 已配置 Plume 主题、SEO、sitemap、LLM 索引和 favicon。 | 尚未启用访问统计插件，站点没有统一的流量采集入口。 |
| 统计脚本接入方式 | 维护者已提供 Umami `<script>` 标签。 | 如果直接手写进 `head`，只能保证脚本加载，不能清晰表达 VuePress SPA 路由统计边界，也容易与后续插件接入重复。 |
| 项目基线文档 | `openspec/project-docs.md` 已记录 SEO、LLM 索引和导航结构。 | 尚未记录访问统计的接入方式和“不要手写重复脚本”的约束。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 修改 | VuePress 顶层配置 | `site/.vuepress/config.ts` | 引入并启用 `@vuepress/plugin-umami-analytics`，配置 `id`、`link`、`hostUrl` 和 `domains`。 |
| 修改 | 项目依赖 | `package.json`、`pnpm-lock.yaml` | 新增 Umami 官方 VuePress 插件依赖。 |
| 修改 | 文档基线 | `openspec/project-docs.md` | 记录访问统计当前基线和配置约束。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| 全站配置 | 站点维护者 | 统计接入方式、域名范围和插件边界 | 使用 VuePress Umami 官方插件；限制 `aisee.wiki` 与 `www.aisee.wiki`；不重复手写脚本 | 自定义事件、业务漏斗、看板 UI |

## Site Impact

- 导航：不变。
- 侧边栏：不变。
- 路由：不变。
- frontmatter：不变。
- 标签/分类：不变。
- 搜索影响：无。
- 多语言影响：中英文页面共用同一套全局统计配置。
- 构建/部署影响：生产构建会通过插件向页面注入 Umami 统计脚本；本地开发不应计入正式域名统计，正式统计仅对 `aisee.wiki` 与 `www.aisee.wiki` 生效。

## Validation

- [ ] 页面路径可访问。
- [ ] 导航/侧边栏入口正确。
- [ ] 内链有效。
- [ ] 代码块、命令或示例已检查。
- [ ] 文档站构建或预览检查通过。
- [ ] 需要时已截图或人工预览。
- [ ] 依赖安装后锁文件与配置一致。
- [ ] 构建产物中存在 Umami 脚本地址或对应注入配置。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新或确认无需更新。
- [x] 栏目结构已更新或确认无需更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新或确认无需更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A。本 change 改变全站长期配置基线，需要回写 `openspec/project-docs.md`。
