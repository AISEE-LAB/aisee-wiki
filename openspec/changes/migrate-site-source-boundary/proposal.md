## Why

AI SEE Wiki 当前仍以 `docs/` 作为 VuePress 发布源，但项目已确认 `docs/` 应长期保留为 aisee 需求、技术上下文、拆分、复盘和学习沉淀等协作产物目录。现在需要先把站点源码迁移到 `site/`，否则后续首页、信息架构、中文/英文内容、skills 文档和部署质量工作都会建立在不稳定的目录边界上。

## What Changes

- **BREAKING**: 将公开站点发布源从 `docs/` 迁移为 `site/`，后续站点源码、VuePress 配置、页面和静态资源应以 `site/` 为准。
- 更新开发、构建、预览相关脚本，使现有命令继续可用但指向迁移后的 `site/` 源目录。
- 保留 `docs/` 作为协作产物目录，覆盖 `requirements`、`ui-content`、`tech-context`、`split`、`reflect`、`learnings` 等规划和沉淀内容。
- 补充仓库说明，明确 `site/` 与 `docs/` 的职责边界、公开发布范围和协作产物进入公开站点前的整理要求。
- 保留当前 `package-lock.json` 状态，不把 lockfile 策略调整纳入本 change。

## Capabilities

### New Capabilities

- `site-source-boundary`: 定义并验证 `site/` 作为唯一公开站点源目录、`docs/` 作为协作产物目录，以及相关脚本和仓库说明需要保持一致的行为。

### Modified Capabilities

- 无。

## Impact

- 影响 VuePress/Plume 源目录、`.vuepress` 配置所在位置、站点页面和静态资源路径。
- 影响 `package.json` 中 `docs:dev`、`docs:build`、`docs:preview` 等站点命令的源目录参数。
- 影响 README、贡献说明或部署说明中关于目录职责、公开发布范围和协作产物边界的描述。
- 不影响后端、数据库、鉴权、API、skills 独立仓库创建、Cloudflare Pages 生产项目创建或首页最终内容设计。
