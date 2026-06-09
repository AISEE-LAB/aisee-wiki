# Doc Change: update-site-logo-assets

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：全站
- 涉及页面：全站公开页面（通过全局配置共享）
- 涉及导航/侧边栏：否
- 涉及站点配置：是

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| `site/.vuepress/config.ts` | favicon 仍使用 `https://theme-plume.vuejs.press/favicon-32x32.png`。 | 站点品牌入口仍依赖第三方远程默认图标，不符合 AISEE 自有品牌接入目标。 |
| `site/.vuepress/plume.config.ts` | `logo` 与中英文 `profile.avatar` 仍使用 Plume 默认远程图片。 | 顶部站点标识和侧边 profile 头像尚未切换为 AISEE 品牌资产。 |
| `site/.vuepress/theme/styles/custom.css` | 主题 brand 变量仍保留一组旧的青灰色注释值。 | 组件强调色与当前 AISEE logo 的蓝青紫品牌方向不一致，品牌识别有割裂感。 |
| `site/.vuepress/theme/components/` | 多个首页、资源页和通用 UI 组件仍使用组件内硬编码颜色。 | 即使主题 brand token 已更新，这些组件也不会自动跟随，首页与资源页会继续保留旧色。 |
| 站点静态品牌资产 | `site/.vuepress/public/` 目前没有 AISEE logo 专用目录。 | 无法通过稳定站内路径复用品牌素材，也不应直接引用维护者本地绝对路径。 |
| 项目基线文档 | `openspec/project-docs.md` 已记录图片/附件和 SEO/统计基线。 | 尚未记录站点品牌资产目录和 favicon/logo 的使用约定。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 新增 | 品牌静态资源目录 | `site/.vuepress/public/brand/` | 新增 AISEE logo 静态资源目录，保存无字与带字 SVG。 |
| 修改 | VuePress 顶层配置 | `site/.vuepress/config.ts` | 将 favicon 切换为本地无字 SVG。 |
| 修改 | Plume 主题配置 | `site/.vuepress/plume.config.ts` | 将 `logo` 与中英文 `profile.avatar` 切换为本地 AISEE 品牌资源。 |
| 修改 | 主题品牌色变量 | `site/.vuepress/theme/styles/custom.css` | 将主题 brand token 同步为从 AISEE logo 提炼出的主品牌色，并放大导航栏带字版 logo。 |
| 修改 | 主题组件配色 | `site/.vuepress/theme/components/` | 将首页、资源页和通用 UI 组件从硬编码配色切换为品牌 token 与语义 token。 |
| 修改 | 项目基线 | `openspec/project-docs.md` | 记录品牌资产目录与 favicon/logo 使用约定。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| 全站配置 | 站点维护者 | 品牌资产目录、品牌色 token 与全局引用规则 | 本地 `brand/` 目录；favicon 使用无字版本；导航栏使用带字版；组件强调色基于 logo 主品牌色 | 品牌规范手册、重设计方案、PWA 图标矩阵 |

## Site Impact

- 导航：不变。
- 侧边栏：不变。
- 路由：不变。
- frontmatter：不变。
- 标签/分类：不变。
- 搜索影响：无。
- 多语言影响：中英文 locale 共用相同的站点品牌资源。
- 构建/部署影响：生产构建将打包本地品牌 SVG 资源；站点不再依赖默认远程 favicon 和默认远程 logo 图片；主题 brand token 会影响按钮、链接、选中态等使用主题变量的组件强调色。

## Validation

- [ ] 页面路径可访问。
- [ ] 导航/侧边栏入口正确。
- [ ] 内链有效。
- [ ] 代码块、命令或示例已检查。
- [ ] 文档站构建或预览检查通过。
- [ ] 需要时已截图或人工预览。
- [ ] 静态资源路径与配置引用一致。
- [ ] 构建产物中已包含本地品牌资源引用。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新或确认无需更新。
- [x] 栏目结构已更新或确认无需更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新或确认无需更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A。本 change 改变全站品牌资源基线，需要回写 `openspec/project-docs.md`。
