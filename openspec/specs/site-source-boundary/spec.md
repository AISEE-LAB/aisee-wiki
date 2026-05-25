# site-source-boundary Specification

## Purpose

定义 AI SEE Wiki 公开站点源目录与协作产物目录的当前行为基线。站点源码必须以 `site/` 为唯一 VuePress 发布源，`docs/` 保留为需求、规划、复盘和学习沉淀等协作产物目录。

## Requirements
### Requirement: 站点源目录
系统 MUST 使用 `site/` 作为本仓库唯一的 VuePress 公开站点源目录。

#### Scenario: VuePress 配置位于 site 下
- **WHEN** 维护者在迁移后检查仓库
- **THEN** VuePress 配置必须位于 `site/.vuepress/`

#### Scenario: docs 不再作为 VuePress 源目录
- **WHEN** 维护者检查站点命令配置
- **THEN** 开发、构建或预览命令均不得把 `docs/` 作为 VuePress 源目录

### Requirement: 现有公开入口页面保持可用
系统 MUST 在迁移后的 `site/` 源目录中保留现有公开站点入口页面。

#### Scenario: 中文根入口存在
- **WHEN** 站点源目录完成迁移
- **THEN** `site/README.md` 必须作为中文根入口页面存在

#### Scenario: 英文根入口存在
- **WHEN** 站点源目录完成迁移
- **THEN** `site/en/README.md` 必须作为英文 `/en/` 入口页面存在

### Requirement: 站点命令指向迁移后的源目录
系统 MUST 保持现有站点命令名可用，同时将命令目标路径改为 `site/`。

#### Scenario: 开发命令指向 site
- **WHEN** 维护者运行或查看 `docs:dev` 命令
- **THEN** 该命令必须以 `site` 作为目标目录启动 VuePress

#### Scenario: 清缓存开发命令指向 site
- **WHEN** 维护者运行或查看 `docs:dev-clean` 命令
- **THEN** 该命令必须以 `site` 作为目标目录启动 VuePress，并保留清理 cache 和 temp 的行为

#### Scenario: 构建命令指向 site
- **WHEN** 维护者运行或查看 `docs:build` 命令
- **THEN** 该命令必须以 `site` 作为目标目录构建 VuePress，并保留清理 cache 和 temp 的行为

#### Scenario: 预览命令指向 site 构建产物
- **WHEN** 维护者运行或查看 `docs:preview` 命令
- **THEN** 该命令必须从 `site/.vuepress/dist` 提供生产构建产物预览

### Requirement: 协作产物保留在公开站点源目录之外
系统 MUST 将 aisee 协作产物保留在 `docs/` 下，并使其位于 VuePress 公开站点源目录之外。

#### Scenario: 需求文档保留在 docs
- **WHEN** 站点源目录完成迁移
- **THEN** `docs/requirements/` 必须在 `site/` 之外保持可用

#### Scenario: 规划产物保留在 docs
- **WHEN** 站点源目录完成迁移
- **THEN** `docs/ui-content/`、`docs/tech-context/` 和 `docs/split/` 必须在 `site/` 之外保持可用

#### Scenario: 复盘与学习沉淀保留在 docs
- **WHEN** 站点源目录完成迁移
- **THEN** `docs/reflect/` 和 `docs/learnings/` 必须在 `site/` 之外保持可用

### Requirement: 仓库文档说明目录边界
系统 MUST 面向维护者和贡献者说明 `site/` 与 `docs/` 的职责边界。

#### Scenario: 公开源目录边界已说明
- **WHEN** 贡献者阅读仓库文档
- **THEN** 文档必须说明 `site/` 是公开站点源目录

#### Scenario: 协作产物边界已说明
- **WHEN** 贡献者阅读仓库文档
- **THEN** 文档必须说明 `docs/` 用于需求文档、UI 内容规格、技术上下文、拆分产物、复盘和学习沉淀

#### Scenario: 公开发布清理要求已说明
- **WHEN** 贡献者阅读仓库文档
- **THEN** 文档必须要求协作产物在转为公开站点页面前经过审阅、改写，并清理私有本地路径或敏感内容

### Requirement: package lock 状态保持不变
系统 MUST 在站点源目录迁移期间保留现有 package lock 状态。

#### Scenario: package lock 文件保持存在
- **WHEN** 迁移完成
- **THEN** 如果 `package-lock.json` 在本 change 之前已经存在，则它必须继续存在

#### Scenario: 删除 lockfile 不是成功条件
- **WHEN** 维护者验证迁移结果
- **THEN** 通过本 change 不得要求删除 `package-lock.json`
