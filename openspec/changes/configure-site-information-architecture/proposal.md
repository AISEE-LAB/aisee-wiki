## Why

站点源码已经迁移到 `site/`，但当前导航、collections 和示例页面仍沿用 Plume 初始化结构，读者会看到 blog/demo 等示例入口。需要先建立正式的信息架构和栏目入口，才能让后续自定义首页、中文正文、英文内容、skills 文档和资源中心基于稳定路由推进。

## What Changes

- **BREAKING**: 替换当前 demo/blog 示例导航，正式导航不得再把示例页面作为核心入口。
- 建立中文核心栏目入口，中文读者可见入口必须使用中文显示名；不得直接把 `learn`、`workflows`、`thinking`、`resources` 作为中文显示名。
- 建立中文栏目显示名与英文 slug 的映射关系，例如学习入口、OpenSpec、Compound、aisee、工程流程、观点文章、资源中心。
- 建立英文 `/en/` 下对应栏目入口，并保持与中文栏目一致的 slug 结构。
- 配置或调整 Plume collections，使正式栏目能按文档型内容、观点型内容和资源型内容组织；collections 按栏目拆分为独立配置文件，再由统一入口汇总。
- 建立资源中心入口、术语表入口和站点级阅读路径框架，允许后续正文逐步补齐。
- 对尚未完成正文的栏目提供可访问的栏目页或建设中说明，避免正式导航产生 404。

## Capabilities

### New Capabilities

- `site-information-architecture`: 定义 AI SEE Wiki 正式中英文栏目、导航、collections、资源中心、术语表和阅读路径入口的可观察行为。

### Modified Capabilities

- 无。

## Impact

- 影响 `site/.vuepress/navbar.ts`、`site/.vuepress/collections.ts`、`site/.vuepress/collections/`、`site/.vuepress/plume.config.ts` 等站点信息架构配置。
- 影响 `site/` 下中文栏目首页、英文栏目首页、资源中心入口、术语表入口和阅读路径占位页面。
- 不引入后端、数据库、API、鉴权、异步任务或外部服务。
- 不包含自定义首页具体内容、P0/P1 正文生产、SEO/sitemap/LLMs.txt 生产配置或视觉设计规范。
