# Proposal: update-site-logo-assets

## 背景与问题

- 当前问题：站点仍使用 Plume 默认远程 logo 与远程 favicon，没有接入 AISEE 自有品牌资产。
- 触发原因：维护者已提供官方 logo 素材目录，并明确要求 favicon 使用不带文字版本，其他位置按站点场景合理使用。
- 关联基线：openspec/project-docs.md

## 目标

- 将维护者提供的 AISEE logo 资产复制到站点静态资源目录，避免运行时依赖本地绝对路径或外部远程品牌资源。
- 使用不带文字 logo 作为站点 favicon。
- 在不影响现有导航结构和页面内容的前提下，将站点 logo 与 profile avatar 切换为本地 AISEE 品牌资产。
- 回写项目基线，记录站点品牌资产的存放路径与 favicon/logo 使用约定。

## 不在范围

- 不重设计 logo、配色、导航结构、首页布局或其他视觉样式。
- 不新增 PNG、ICO、Apple Touch Icon、PWA manifest 或浏览器多尺寸图标管线。
- 不修改页面正文、栏目结构、侧边栏、SEO 文案或统计配置。
- 不处理品牌规范文档、品牌延展物料或社交分享图。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | 全站 | 全站共享站点 logo、favicon 与 profile avatar。 |
| 页面 | N/A | 不改具体页面正文。 |
| 导航/侧边栏 | N/A | 不改导航信息架构，仅替换站点视觉资产。 |
| 路由/frontmatter | N/A | 不改 permalink 与 frontmatter。 |
| 站点配置 | `site/.vuepress/config.ts`、`site/.vuepress/plume.config.ts`、`site/.vuepress/public/brand/` | 引入本地品牌 SVG 资产并更新全局配置引用。 |

## 成功标准

- [ ] 已将维护者提供的 AISEE logo 素材复制到站点静态资源目录。
- [ ] `site/.vuepress/config.ts` 使用本地无字 SVG 作为 favicon。
- [ ] `site/.vuepress/plume.config.ts` 使用本地 AISEE logo 资产替换默认站点 logo 与 profile avatar。
- [ ] 站点不再依赖 Plume 默认远程品牌图片。
- [ ] 文档站构建通过。
- [ ] 归档前已处理 openspec/project-docs.md 回写。

## 约束与假设

- [ASSUMPTION] 维护者提供的 `/Users/fengliang/Documents/DATA-SYNC/0-哲思亿佳-资料/15-AISEE/0-logo/` 为当前可用品牌素材来源。
- [ASSUMPTION] 不带文字 SVG 更适合作为 favicon、站点 logo 与 profile avatar 的小尺寸展示；带文字 SVG 本次保留为站点静态资产备用，不强制接入当前 UI。
- [DOC-GAP] 当前未定义完整品牌规范（如最小尺寸、安全边距、亮暗背景适配规则）；后续如需系统化品牌规范，应另起 change。
- [SITE-CONFIG-IMPACT] 本 change 仅影响全局品牌资源路径与站点配置，不改变正文内容和信息架构。
