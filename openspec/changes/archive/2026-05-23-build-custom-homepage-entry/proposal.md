## Why

当前中文和英文首页仍使用 Plume 初始化的默认 home/hero 配置，展示的是 Theme Plume 示例内容，无法承载 AI SEE Wiki 的核心主张。站点已经建立正式信息架构，需要一个自定义长首页入口，用来表达“AI 时代的软件工程方法论”，并把读者引导到 OpenSpec、Compound Engineering、aisee 工作机制和推荐学习路径。

## What Changes

- **BREAKING**: 替换 `site/README.md` 和 `site/en/README.md` 中的 Plume 默认首页配置，不再使用 Theme Plume 示例 hero、示例行动按钮或示例文案作为正式首页。
- 建立中文自定义长首页入口，首屏表达 AI SEE Wiki 的价值主张：AI 增强软件工程、方法论驾驭工具、Spec-first、Harness、验证闭环和知识复利。
- 建立英文首页的对应结构和占位表达，保持 `/en/` 入口与中文首页的栏目关系一致；完整英文正文可由后续 i18n 内容 change 深化。
- 在首页提供清晰的核心入口：学习路径、OpenSpec、Compound Engineering、aisee 工作机制、工程流程、资源中心。
- 在首页建立内容槽位：AI 增强的工程领域、工具越强越需要方法论、三条核心主线、推荐学习路径、开放协作入口。
- 使用 `docs/design-assets/` 下的首页视觉参考、开发视觉 brief 和 clean SVG 装饰素材作为实现参考，但不把参考图当最终设计稿逐像素复刻。
- 为后续首页内容深度讨论保留可替换区域，不把最终文案、最终视觉稿、复杂动效或流程讲解组件纳入本 change。

## Capabilities

### New Capabilities

- `custom-homepage-entry`: 定义 AI SEE Wiki 自定义中英文首页入口的可观察行为，包括默认首页替换、核心价值主张、长页面内容槽位、正式栏目入口和视觉资产使用边界。

### Modified Capabilities

- 无。

## Impact

- 影响 `site/README.md` 和 `site/en/README.md` 首页内容。
- 可能影响 `site/.vuepress/` 下与首页布局、样式、客户端组件或静态资源引用相关的配置。
- 可能引用 `docs/design-assets/assets/` 中已沉淀的首页参考素材，或将确认可公开使用的素材复制到 `site/.vuepress/public/` 等发布源目录。
- 不引入后端、数据库、API、鉴权、搜索服务、运行时写入或外部集成。
- 不包含首页最终完整文案、英文完整正文、P0/P1 文章正文、可复用流程讲解组件、Cloudflare Pages 配置、SEO/sitemap/LLMs.txt 生产配置。
