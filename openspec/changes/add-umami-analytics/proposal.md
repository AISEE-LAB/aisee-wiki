# Proposal: add-umami-analytics

## 背景与问题

- 当前问题：站点已具备 SEO、sitemap、robots 和 LLM 索引基线，但还没有访问统计，无法观察公开文档站的页面访问趋势与基础流量。
- 触发原因：维护者要求接入 Umami 访问统计，并优先使用 VuePress 官方插件能力，而不是手写裸脚本。
- 关联基线：openspec/project-docs.md

## 目标

- 为站点接入 Umami 访问统计，使用维护者提供的 `website-id` 和自托管 `script.js` 地址。
- 优先使用 `@vuepress/plugin-umami-analytics` 官方插件，让统计覆盖首屏访问和 VuePress SPA 路由切换。
- 将统计限制在生产域名 `aisee.wiki` 与 `www.aisee.wiki`，避免本地开发和预览流量污染正式数据。
- 回写项目基线，记录当前访问统计接入方式和配置边界。

## 不在范围

- 不接入第二套统计服务，如 Google Analytics、Plausible 或百度统计。
- 不新增自定义事件埋点、转化漏斗、按钮点击跟踪或数据看板页面。
- 不修改 Cloudflare Pages、DNS、反向代理或 Umami 服务端部署。
- 不在各页面 frontmatter 单独加统计代码。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | 全站 | 统计脚本作用于全站公开页面。 |
| 页面 | N/A | 不改具体页面正文。 |
| 导航/侧边栏 | N/A | 不改导航和侧边栏。 |
| 路由/frontmatter | N/A | 不改 permalink 或页面 frontmatter。 |
| 站点配置 | `site/.vuepress/config.ts`、`package.json`、`pnpm-lock.yaml` | 新增 Umami 插件依赖并在 VuePress 顶层插件配置中启用。 |

## 成功标准

- [ ] 已安装 `@vuepress/plugin-umami-analytics` 并纳入项目依赖。
- [ ] `site/.vuepress/config.ts` 启用 Umami 插件，配置维护者提供的 `website-id` 与脚本地址。
- [ ] 统计仅在 `aisee.wiki` 与 `www.aisee.wiki` 域名下自动启用，不污染本地和预览访问。
- [ ] 不在 `head` 中手写重复的统计脚本标签。
- [ ] 文档站构建通过。
- [ ] 归档前已处理 openspec/project-docs.md 回写。

## 约束与假设

- [ASSUMPTION] 生产公开域名当前包括 `aisee.wiki` 与 `www.aisee.wiki`，访问统计仅对这两个域名启用。
- [ASSUMPTION] 维护者提供的脚本地址 `https://um.zerseager.com/script.js` 和 `website-id` 有效且可直接用于生产统计。
- [DOC-GAP] 当前未定义任何自定义事件、下载统计或转化目标；后续如需事件级埋点，应另起 change。
- [SITE-CONFIG-IMPACT] 本 change 仅影响 VuePress 顶层插件配置和构建产物中注入的统计脚本。
