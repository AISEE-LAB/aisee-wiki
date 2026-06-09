# Proposal: update-site-logo-assets

## 背景与问题

- 当前问题：站点仍使用 Plume 默认远程 logo 与远程 favicon，没有接入 AISEE 自有品牌资产。
- 触发原因：维护者已提供官方 logo 素材目录，并明确要求 favicon 使用不带文字版本，其他位置按站点场景合理使用。
- 关联基线：openspec/project-docs.md

## 目标

- 将维护者提供的 AISEE logo 资产复制到站点静态资源目录，避免运行时依赖本地绝对路径或外部远程品牌资源。
- 使用不带文字 logo 作为站点 favicon。
- 在不影响现有导航结构和页面内容的前提下，将站点 logo 与 profile avatar 切换为本地 AISEE 品牌资产。
- 将主题 brand token 同步为从 logo 提炼出的主品牌色，提升站点组件与品牌资产的一致性。
- 调整仓库根 README 的首屏结构与简介文案，使其与当前品牌、站点定位和 GitHub 仓库入口保持一致，并采用中文优先的单 README 入口。
- 补充 MIT LICENSE，并完善 README 的读者入口、项目关系、贡献方式与协议说明。
- 回写项目基线，记录站点品牌资产的存放路径与 favicon/logo 使用约定。

## 不在范围

- 不重设计 logo、导航结构、首页布局或其他组件布局。
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
| 站点配置 | `site/.vuepress/config.ts`、`site/.vuepress/plume.config.ts`、`site/.vuepress/public/brand/`、`site/.vuepress/theme/styles/custom.css` | 引入本地品牌 SVG 资产、更新全局配置引用，并同步主题 brand token。 |
| 仓库元信息 | `README.md`、`LICENSE` | 调整仓库首页简介、品牌展示与入口链接，补充 MIT 协议，采用中文优先单 README 入口，并反映“方法论与实践文档站”定位。 |

## 成功标准

- [ ] 已将维护者提供的 AISEE logo 素材复制到站点静态资源目录。
- [ ] `site/.vuepress/config.ts` 使用本地无字 SVG 作为 favicon。
- [ ] `site/.vuepress/plume.config.ts` 使用本地 AISEE logo 资产替换默认站点 logo 与 profile avatar。
- [ ] `site/.vuepress/theme/styles/custom.css` 的品牌色变量已同步为基于 AISEE logo 提炼的主题 token。
- [ ] 仓库根 `README.md` 已更新为与站点品牌和方法论定位一致的首屏简介，并作为中文优先默认入口。
- [ ] 仓库根 `LICENSE` 已补充为 MIT 协议，README 已包含协议说明。
- [ ] 站点不再依赖 Plume 默认远程品牌图片。
- [ ] 文档站构建通过。
- [ ] 归档前已处理 openspec/project-docs.md 回写。

## 约束与假设

- [ASSUMPTION] 维护者提供的 `/Users/fengliang/Documents/DATA-SYNC/0-哲思亿佳-资料/15-AISEE/0-logo/` 为当前可用品牌素材来源。
- [ASSUMPTION] 不带文字 SVG 更适合作为 favicon、站点 logo 与 profile avatar 的小尺寸展示；带文字 SVG 本次保留为站点静态资产备用，不强制接入当前 UI。
- [ASSUMPTION] 主题品牌色只提炼 logo 的主蓝、亮青和深紫作为 brand token，不直接把整条渐变或黄绿色段大面积用于通用组件。
- [DOC-GAP] 当前未定义完整品牌规范（如最小尺寸、安全边距、亮暗背景适配规则）；后续如需系统化品牌规范，应另起 change。
- [SITE-CONFIG-IMPACT] 本 change 仅影响全局品牌资源路径与站点配置，不改变正文内容和信息架构。
