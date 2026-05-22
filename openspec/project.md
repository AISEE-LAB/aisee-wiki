# 项目上下文

> 本文件描述项目技术上下文。AI 行为规则见 `CLAUDE.md` 和 `AGENTS.md`。
> 最后更新：2026-05-22

## 项目概览

- 名称：AI SEE Wiki
- 类型：静态文档站
- 目标：建设一个聚焦 OpenSpec、Compound Engineering 与 aisee skill 生态的中英双语 AI Engineering 开源文档站。
- 主要用户：AI Engineering 学习者、OpenSpec / Compound / aisee 实践者、文档贡献者、站点维护者。

## 技术栈

> 项目级技术栈的权威来源。未确认项写“未确认”，不要让 AI 在 change 阶段临时选型。

**技术栈状态**：部分确定
**技术栈来源**：既有代码、用户确认、SRS 文档

### 核心

- 语言：TypeScript、Markdown
- 框架：VuePress 2.0.0-rc.30
- 主题：vuepress-theme-plume 1.0.0-rc.201
- 数据库：无
- 运行环境：Node.js `^20.19.0 || >=22.0.0`
- 客户端形态：静态 PC Web / 移动 Web 文档站
- 站点发布源：目标为 `site/`；当前代码仍在 `docs/`，需通过后续 OpenSpec change 迁移
- 协作产物目录：`docs/`

### 工具链

- 包管理器：pnpm 10.33.2；保留当前 `package-lock.json`
- 构建工具：VuePress + Vite bundler
- 测试：未确认
- 格式化 / Lint：未确认
- CI/CD：目标为 GitHub Actions + Cloudflare Pages；生产域名已确认为 `aisee.wiki`，预览分支策略和检查矩阵未确认

### 基础设施

- 鉴权 / 权限：公开文档站，无应用登录
- ORM / 数据访问：无
- 队列 / 异步任务：无
- 缓存：VuePress/Plume 文件系统缓存
- 文件存储：Git 仓库中的 Markdown 与静态资源
- 通知 / 消息：无
- 部署环境：Cloudflare Pages，生产域名 `aisee.wiki`
- 搜索：Plume 本地搜索
- 评论：规划为 Giscus，仅在观点或案例文章启用，具体配置未确认
- LLMs.txt：使用 Plume 主题内置能力；具体配置实现时以官方文档为准

### 未确认技术决策

| 决策 | 影响范围 | 当前状态 | 负责人 |
|---|---|---|---|
| 从 `docs/` 迁移到 `site/` 的具体实施 change | 站点构建、脚本、部署配置 | 已确认方向，实施未完成 | 待指定 |
| 独立 skills 仓库 URL | aisee skill 文档入口、安装命令、版本说明 | 由维护者手动创建并提供；不作为本项目技术决策 | 维护者 |
| Cloudflare Pages 预览分支策略和 GitHub Actions 检查矩阵 | 部署、CI、发布质量门禁 | 未确认 | 待指定 |
| 测试、Lint、格式化工具 | CI、质量检查、贡献流程 | 未确认 | 待指定 |

## 架构概览

当前项目是 VuePress + vuepress-theme-plume 静态文档站。现有代码以 `docs/` 为 VuePress 源目录，包含 `.vuepress/` 配置、中文示例页面和英文 locale 入口。根据已确认 SRS，第一期目标架构应迁移为 `site/` 作为唯一站点发布源，`docs/` 保留为 aisee 规划链路和协作产物目录。

OpenSpec 用于管理后续站点迁移、内容生产、双语体系、skills 集成和部署质量配套等变更。当前 SRS 位于 `docs/requirements/2026-05-22-ai-see-wiki-phase-one/`。

## 模块划分

| 模块 | 路径 | 职责 |
|---|---|---|
| OpenSpec 配置 | `openspec/` | 管理 change、spec、archive 和项目上下文。 |
| 站点源码（当前） | `docs/.vuepress/`、`docs/*.md` | 当前 VuePress 源目录和示例内容；后续应迁移到 `site/`。 |
| 站点源码（目标） | `site/` | 目标唯一发布源，承载中文、英文、栏目、资源和静态资产。 |
| 需求规格 | `docs/requirements/` | `aisee:srs` 输出，作为 split 和 OpenSpec change 的输入。 |
| UI 内容规格 | `docs/ui-content/` | 页面清单、页面内容、元素、状态和交互路径。 |
| 技术上下文 | `docs/tech-context/` | 技术事实、架构边界、共享前置和风险；不替代本文件。 |
| Change 拆分 | `docs/split/` | `aisee:split` 输出，记录 change 候选和依赖关系。 |
| 会话复盘 | `docs/reflect/` | 会话复盘、workflow 改进和 memory 候选。 |
| 团队知识沉淀 | `docs/learnings/` | 可复用模式、坑点、决策和后续工作。 |
| 项目记忆 | `.memory/` | 长期项目记忆权威位置。 |
| Hooks | `.aisee/hooks/`、`.claude/`、`.codex/` | 项目级 OpenSpec 上下文注入、spec drift 检查和密钥扫描。 |

## 开发约定

- 分支命名：默认使用 `feature/<topic>`。
- 提交格式：中文 Conventional Commits，建议 `<type>(<scope>): <中文主题>`。
- 代码风格：沿用 VuePress / TypeScript 现有风格；未引入统一 formatter 前避免大规模格式化。
- 测试策略：当前未配置自动测试；文档站变更至少应进行链接检查和本地预览/构建检查，是否执行由具体 change 决定。
- 内容策略：中文优先完成 P0/P1 正文，再补英文完整正文；英文不是逐字翻译，应面向英文读者重写。

## 外部依赖和服务

| 服务 | 用途 | 环境变量 |
|---|---|---|
| GitHub | 开源仓库、Issue、PR、Edit this page、Actions | 未确认 |
| Cloudflare Pages | 静态站点部署，生产域名 `aisee.wiki` | 未确认 |
| Giscus | 评论系统，规划只在观点和案例文章启用 | 未确认 |
| 独立 aisee skills 仓库 | skill 源码、安装命令和版本说明来源；由维护者手动创建并提供链接 | 未确认 |

## 环境设置

```bash
pnpm install
```

## 常用命令

```bash
# 当前开发命令（迁移到 site/ 前）
pnpm docs:dev

# 当前构建命令（迁移到 site/ 前）
pnpm docs:build

# 当前本地预览命令（迁移到 site/ 前）
pnpm docs:preview

# VuePress / Plume 更新辅助命令
pnpm vp-update
```
