# 技术上下文摘要：AI SEE Wiki 文档站第一期完整上线

**文档编号**：TC-2026-05-22-ai-see-wiki-phase-one
**版本**：v1.0
**状态**：草稿
**创建日期**：2026-05-22
**来源输入**：SRS、项目目录、`openspec/project.md`

---

## 1. 范围

### 1.1 本文覆盖

- 需求 / 模块：AI SEE Wiki 文档站第一期完整上线
- 覆盖 FR：FR-001 ~ FR-018
- 覆盖平台：静态 PC Web / 移动 Web 文档站
- 用途：为 `aisee:split` 提供技术事实和约束

### 1.2 不在范围

- 不拆分 change
- 不命名 change
- 不输出执行命令
- 不生成 `design.md`
- 不做技术栈选型
- 不写实现方案

---

## 2. 技术栈状态

**状态**：部分确定

| 层 | 技术 / 现状 | 来源 | 可信度 | 备注 |
|----|-------------|------|--------|------|
| 前端 / 站点框架 | VuePress `2.0.0-rc.30` | `package.json`、`openspec/project.md` | high | 当前站点源码仍在 `docs/`，目标发布源为 `site/`。 |
| 主题 | `vuepress-theme-plume` `1.0.0-rc.201` | `package.json`、`docs/.vuepress/config.ts`、`docs/.vuepress/plume.config.ts` | high | 已启用 Plume 主题配置、本地搜索、中文/英文 locale 基础配置。 |
| 语言 | TypeScript、Markdown | `package.json`、`openspec/project.md`、`docs/.vuepress/*.ts` | high | 站点配置为 TypeScript，正文为 Markdown。 |
| 后端 | 无后端服务 | `openspec/project.md`、项目文件 | high | 当前为静态文档站，无 API 服务边界。 |
| 数据库 | 无 | `openspec/project.md` | high | 不涉及数据库建模。 |
| ORM / 数据访问 | 无 | `openspec/project.md` | high | 不涉及 ORM 或数据访问层。 |
| 鉴权 / 权限 | 公开文档站，无应用登录 | `openspec/project.md`、SRS | high | 私有资料保护依赖仓库权限和发布目录隔离，不依赖应用鉴权。 |
| 队列 / 异步 | 无 | `openspec/project.md` | high | 不涉及后台任务。 |
| 缓存 | VuePress/Plume 文件系统缓存 | `openspec/project.md`、`docs/.vuepress/config.ts` | high | 当前 `cache: 'filesystem'`。 |
| 文件存储 | Git 仓库中的 Markdown 与静态资源 | `openspec/project.md`、项目文件 | high | 公开内容与协作产物需要目录隔离。 |
| 通知 / 消息 | 无 | `openspec/project.md` | high | 不涉及站内消息、邮件、推送。 |
| 包管理 | pnpm `10.33.2`；保留当前 `package-lock.json` | `package.json`、用户确认 | high | 当前状态已确认保留。 |
| 运行环境 | Node.js `^20.19.0 || >=22.0.0` | `package.json` | high | hooks 已通过局部 CommonJS 配置兼容项目 ESM。 |
| CI/CD | GitHub Actions + Cloudflare Pages 目标未配置 | `openspec/project.md`、SRS、用户确认 | medium | 生产域名为 `aisee.wiki`；预览分支策略、检查矩阵未确认。 |
| 搜索 | Plume 本地搜索 | `docs/.vuepress/config.ts`、`openspec/project.md` | high | 当前配置为 `search: { provider: 'local' }`。 |
| 评论 | Giscus 规划，未配置 | `openspec/project.md`、SRS | medium | 仅规划在观点和案例文章启用。 |
| LLMs.txt | 使用 Plume 主题内置能力 | 用户确认、Plume 官方文档 | high | 官方文档说明通过主题 `llmstxt` 配置启用，生产构建时生成。 |

---

## 3. 来源与可信度

| 信息 | 来源 | 可信度 | 说明 |
|------|------|--------|------|
| 项目为 AI Engineering 双语静态文档站 | `openspec/project.md`、SRS 主文档 | high | 项目目标和用户已明确。 |
| 当前技术栈为 VuePress + Plume | `package.json`、`.vuepress` 配置 | high | 依赖和配置文件均存在。 |
| 当前源码目录为 `docs/`，目标发布源为 `site/` | `openspec/project.md`、SRS FR-001/FR-004 | high | 迁移方向已确认，实施未完成。 |
| `docs/` 目标职责是协作产物目录 | `openspec/project.md`、SRS FR-004 | high | 覆盖 requirements、ui-content、tech-context、split、reflect、learnings。 |
| 中文优先、英文完整补齐 | SRS 主文档、`openspec/project.md` | high | 执行顺序已确认。 |
| skills 源码独立仓库维护 | SRS 主文档、FR-015/FR-016、用户确认 | high | 独立仓库由维护者手动创建，不作为本项目技术决策。 |
| 当前无后端、数据库、权限系统、队列 | `openspec/project.md`、项目文件 | high | 项目为静态站点。 |
| Cloudflare Pages、GitHub Actions、Giscus 尚未落地 | `openspec/project.md`、SRS Open Questions、用户确认 | medium | 生产域名 `aisee.wiki` 和 LLMs.txt 内置能力已确认；预览分支、CI 检查矩阵、Giscus 未确认。 |
| Plume 最新配置入口 | Plume 官方文档 | high | 实施 Plume 功能前应查询 `https://theme-plume.vuejs.press/guide/intro/` 及相关功能页。 |
| 当前存在 OpenSpec 和 aisee hooks 配置 | `.aisee/hooks/`、`.claude/settings.json`、`.codex/hooks.json` | high | 已初始化到项目内。 |
| 当前未配置测试、lint、formatter | `openspec/project.md`、`package.json` | high | scripts 中没有 test/lint/format。 |

---

## 4. 现有架构边界

| 边界 | 当前事实 | 来源 | 对 split 的影响 |
|------|----------|------|----------------|
| 站点发布源边界 | 当前代码在 `docs/`，目标为 `site/`；`docs/` 保留协作产物。 | `openspec/project.md`、SRS FR-001/FR-004 | 所有站点内容、构建脚本、部署配置都受该迁移边界影响；协作产物不应混入发布源。 |
| VuePress 配置边界 | 当前配置集中在 `docs/.vuepress/`，包含 config、plume、navbar、collections。 | 项目文件 | 导航、集合、locale、搜索、SEO 和 LLMs.txt 相关工作会集中影响配置层。 |
| 中文内容边界 | 中文 P0/P1 是第一阶段内容生产主线。 | SRS FR-006 ~ FR-010 | 内容生产需要依赖栏目结构、事实源规则和阅读路径。 |
| 英文内容边界 | 英文不是逐字翻译，要求与中文共享 slug、结论和术语。 | SRS FR-011 ~ FR-014 | 英文工作受中文正文稳定性、术语表和路由规则约束。 |
| 资源中心边界 | 资源中心承载模板、Schema Pack、命令速查、检查清单、示例仓库、术语表、参考资料。 | SRS FR-009 | 资源页和核心文章存在交叉引用，需要避免空链接。 |
| skills 集成边界 | skills 源码不进文档站仓库，文档站只提供介绍、链接、安装命令和版本说明。 | SRS FR-015/FR-016、用户确认 | 独立仓库由维护者手动创建；本项目不承担仓库创建和版本规则设计。 |
| 开源部署边界 | 目标包含 README/贡献指南/许可证/Cloudflare Pages/GitHub Actions/SEO/LLMs.txt。 | SRS FR-017/FR-018、用户确认 | 生产域名和许可证方案已确认；预览分支、CI 检查矩阵、GitHub 仓库 URL 仍需配置。 |
| OpenSpec 工作流边界 | `openspec/` 为规范事实源，`docs/requirements/` 等为规划输入。 | `CLAUDE.md`、`AGENTS.md`、`openspec/project.md` | 后续实现前应从 SRS 进入 OpenSpec artifacts，不应直接跳到实现。 |

---

## 5. 已有可复用能力

| 能力 | 当前事实 | 来源 | 可复用方式 | 注意事项 |
|------|----------|------|------------|----------|
| 鉴权 | 未发现应用层鉴权；站点为公开静态文档站。 | `openspec/project.md` | 不需要复用应用鉴权。 | 私有内容保护依赖目录隔离、仓库权限和发布流程。 |
| 权限 | 未发现应用层角色权限；公开读者可访问发布内容。 | `openspec/project.md`、SRS FR-004 | 公开/非公开边界通过目录和仓库流程表达。 | 不要把未整理协作产物加入站点导航。 |
| 数据访问 | 无数据库、无 API 数据访问。 | `openspec/project.md` | 内容数据以 Markdown、配置文件和静态资源形式维护。 | 不应引入数据库或后端能力作为默认前置。 |
| 队列 / 异步 | 未发现可信来源。 | `openspec/project.md` | 无复用能力。 | 不涉及异步任务拆分。 |
| 文件存储 | Git 仓库承载 Markdown 与静态资源。 | `openspec/project.md`、项目文件 | 可复用现有 Markdown 文件组织和 VuePress 静态资源机制。 | 公开资源与本地 Obsidian 来源需要人工改写和脱敏。 |
| 通知 | 未发现可信来源。 | `openspec/project.md` | 无复用能力。 | 不涉及消息通知。 |
| 审计 / 日志 | Git 历史、PR、OpenSpec artifacts 可承担变更记录；未发现运行时审计。 | `CLAUDE.md`、`AGENTS.md`、仓库状态 | 可通过 OpenSpec change、Git commit、PR checklist 追踪内容变更。 | 不应将运行时审计能力写入需求。 |
| 搜索 | Plume 本地搜索已配置。 | `docs/.vuepress/config.ts` | 可用于站内文章和资源发现。 | 迁移到 `site/` 后配置路径需同步。 |
| 双语 locale | VuePress 已配置 `/` 与 `/en/` locale。 | `docs/.vuepress/config.ts` | 可复用为英文站基础。 | 当前导航和集合仍是示例结构，需要替换。 |
| OpenSpec / aisee 配置 | 已有 `openspec/`、`CLAUDE.md`、`AGENTS.md`、`.memory/`、hooks。 | 项目文件 | 可复用为后续 change 规划、上下文注入和密钥扫描。 | hooks 首次在 Codex 运行前可能需要信任。 |

---

## 6. 共享技术前置

| 前置项 | 为什么是共享前置 | 影响 FR / 页面 | 来源 | 阻塞程度 |
|--------|------------------|----------------|------|----------|
| `site/` 发布源迁移 | 导航、内容、英文、资源、部署、SEO 都依赖最终发布源。 | FR-001 ~ FR-018 | `openspec/project.md`、SRS FR-001/FR-004 | blocker |
| VuePress 脚本与源目录同步 | 当前脚本指向 `docs`，迁移后开发、构建、预览、部署命令都需同步。 | FR-001、FR-017、FR-018 | `package.json`、`openspec/project.md` | blocker |
| 栏目与 collections 配置 | P0/P1 内容、资源中心、英文站和阅读路径都依赖栏目结构。 | FR-002、FR-003、FR-006 ~ FR-014 | SRS、`.vuepress/collections.ts`、`.vuepress/navbar.ts` | blocker |
| 术语表与 slug 规则 | 中英文正文、SEO、语言切换、阅读路径都需要统一术语和路径。 | FR-005、FR-010、FR-012 ~ FR-014 | SRS FR-005/FR-013 | risk |
| 内容事实源索引 | P0/P1 正文必须基于规划文档和本地参考资料，不能凭空扩展。 | FR-006 ~ FR-008、FR-012 | SRS 主文档、FR-006/FR-008 | risk |
| 独立 skills 仓库链接 | skill 介绍页、安装命令、版本说明需要引用维护者手动创建的外部仓库。 | FR-015、FR-016 | SRS FR-015/FR-016、用户确认 | risk |
| 部署与公开仓库信息 | SEO、sitemap、canonical、Edit this page、Cloudflare Pages 都依赖域名和仓库配置。 | FR-014、FR-017、FR-018 | SRS Open Questions、`openspec/project.md`、用户确认 | risk |
| Plume 官方配置核对 | LLMs.txt、国际化、集合、SEO、sitemap 等配置需按当前 Plume 官方文档执行。 | FR-003、FR-014、FR-018 | Plume 官方文档 | risk |
| 质量检查规则 | 发布前链接检查、frontmatter、外链、敏感信息、构建说明需要统一口径。 | FR-017、FR-018 | SRS FR-018、`openspec/project.md` | risk |

---

## 7. 技术耦合点

| 耦合点 | 涉及范围 | 原因 | 给 split 的影响 |
|--------|----------|------|----------------|
| `docs/` 到 `site/` 的目录迁移与构建脚本 | FR-001、FR-004、FR-017、FR-018 | 目录迁移会同时影响 VuePress 配置路径、npm scripts、部署源、协作产物隔离。 | 不应把目录迁移、部署脚本和协作产物隔离作为互不相关的工作处理。 |
| 导航 / collections 与内容正文 | FR-003、FR-006 ~ FR-012 | 导航必须指向存在页面，正文完成状态影响导航可达性。 | 内容页与导航索引需要共享路由事实，避免生成空链接。 |
| 中文正文与英文正文 | FR-006、FR-007、FR-011、FR-012 | 英文正文依赖中文主题、结论和术语稳定，但不是逐字翻译。 | 英文内容技术提示应依赖中文内容稳定性和术语映射。 |
| 术语表与 SEO/LLM 索引 | FR-005、FR-013、FR-014、FR-018 | 术语统一影响英文可读性、slug、搜索和 AI 引用。 | 术语表不应与英文或 SEO 工作脱节。 |
| skills 文档与独立仓库 | FR-015、FR-016、FR-018 | 文档站不托管源码，但需要可信链接、安装命令和版本说明。 | 独立仓库信息确认前，相关页面只能使用待配置状态。 |
| 开源贡献说明与安全边界 | FR-004、FR-017、FR-018 | 公开内容、协作产物、私有本地参考资料需要清晰边界。 | 贡献指南和发布清单应共同覆盖敏感信息与未整理草稿风险。 |
| 当前 Plume 示例内容与正式站点 IA | FR-001、FR-003 | 当前 navbar/collections 仍引用 blog/demo 示例。 | 示例内容替换和正式 IA 建立存在耦合，避免正式导航引用 demo。 |

---

## 8. 平台 / 端能力限制

| 平台 | 能力限制 | 影响范围 | 给 split 的提示 |
|------|----------|----------|----------------|
| PC Web 文档站 | 静态站点，无后端运行时、无登录、无动态数据库查询。 | 全站内容、资源、搜索、SEO | 优先按静态 Markdown、配置和构建产物组织能力。 |
| 移动 Web 文档站 | 同为静态页面；移动适配依赖主题能力和 Markdown 内容结构。 | 首页、栏目页、文章页、资源页 | 技术上下文不要求单独移动端能力，但内容结构应语义化。 |
| App | 非目标平台，未发现可信来源。 | 无 | 不应为 App 能力引入技术前置。 |
| 微信小程序 | 非目标平台，未发现可信来源。 | 无 | 不应为小程序能力引入技术前置。 |
| GitHub / Cloudflare Pages | 生产域名已确认为 `aisee.wiki`；仓库 URL、预览分支策略未确认。 | 部署、编辑链接、SEO、sitemap、canonical | 可使用 `aisee.wiki` 作为生产域名；仓库 URL 和预览策略未确认前不得写死。 |

---

## 9. 给 aisee:split 的技术提示

> 只写事实、约束和原因，不写拆分结果。

### 9.1 共享技术前置提示

- `site/` 作为唯一发布源、`docs/` 作为协作产物目录是已确认架构约束；所有站点源码、构建脚本和部署配置都应围绕该边界处理。
- 当前 `package.json` scripts 仍指向 `docs`；源目录迁移会影响开发、构建、预览和部署说明。
- 栏目导航、collections、首页入口、资源中心和英文栏目入口共享同一套路由事实。
- P0/P1 中文正文是英文正文、术语表、阅读路径和资源引用的事实基础。
- 独立 skills 仓库由维护者手动创建；在维护者提供链接和安装方式前，skill 页面只能表达待配置状态，本项目不拆出仓库创建工作。
- LLMs.txt 使用 Plume 内置能力；实施前需按 Plume 官方文档核对 `llmstxt` 当前配置方式。

### 9.2 技术耦合提示

- 目录迁移与协作产物隔离强耦合；如果只迁移源码但未更新发布说明，仍可能误发布 `docs/` 草稿。
- 导航配置与正文完成度强耦合；正式导航不应指向 demo、空页面或未说明状态的缺页。
- 英文正文、slug、术语表和语言切换强耦合；英文页面不能脱离中文主题和术语规则独立扩展。
- SEO、sitemap、LLMs.txt、Edit this page 依赖生产域名和仓库 URL；生产域名可使用 `aisee.wiki`，仓库 URL 未确认前避免写死。

### 9.3 可并行边界提示

- 内容正文编写与部署配置从技术上相对独立，但都依赖最终目录边界和路由规则。
- 中文 P0/P1 正文的不同文章可以在统一写作标准和事实源规则明确后并行推进。
- 英文正文可在对应中文正文稳定后按主题并行推进。
- skills 介绍页可先按已知 skill 清单建立结构；具体安装命令和版本说明等待维护者手动创建的独立仓库信息。

### 9.4 不应横切的能力

- 不应把 `site/` / `docs/` 目录边界拆散到多个互不感知的工作中，否则容易造成构建脚本、部署源和协作目录不一致。
- 不应把术语表、slug 同步和英文正文完全分离，否则容易导致双语漂移。
- 不应把 skill 介绍页与版本/安装说明完全分离，否则容易产生文档与独立仓库行为漂移。
- 不应把质量检查清单与部署/SEO 配置完全分离，否则发布前无法判断哪些项已验证。

### 9.5 高风险区域

- 目录迁移后仍有脚本、配置或文档引用旧 `docs` 发布源。
- 正式导航继续引用 Plume demo/blog 示例内容。
- 公开页面暴露本地 Obsidian 绝对路径或未整理协作产物。
- 英文内容只做逐字翻译，缺少英文读者上下文。
- SEO 或 sitemap 配置仍写死未确认的 GitHub 仓库 URL、预览 URL 或错误域名。
- LLMs.txt 未按 Plume 官方内置能力配置，或声称未构建验证的产物已生成。
- skills 安装命令在维护者未提供独立仓库链接和安装方式前提前发布。
- 当前缺少测试、lint、格式化和链接检查命令，发布质量 gate 需要先定义。

---

## 10. 阻塞决策与风险

| 编号 | 标记 | 内容 | 影响 | 建议处理 |
|------|------|------|------|----------|
| B-001 | [STACK-DECISION-REQUIRED] | `site/` 迁移的具体实施边界和脚本更新口径需正式落入 OpenSpec artifacts。 | 影响 FR-001、FR-004、FR-017、FR-018 的 split 判断。 | 在后续 spec 中明确迁移涉及的源码、脚本、配置和文档边界。 |
| B-002 | [RISK] | 独立 skills 仓库由维护者手动创建，不作为本项目技术决策；链接、安装方式和版本说明需由维护者提供。 | 影响 FR-015、FR-016 的最终内容完整性，但不阻塞 split。 | 未提供前使用待配置状态，不拆出仓库创建工作。 |
| B-003 | [STACK-DECISION-REQUIRED] | Cloudflare Pages 生产域名已确认为 `aisee.wiki`；预览分支策略和 GitHub Actions 检查矩阵未确认。 | 影响 FR-017、FR-018 的部署说明和 CI gate。 | 实施前确认预览分支和检查矩阵；SEO 生产域名可用 `aisee.wiki`。 |
| B-004 | [RISK] | LLMs.txt 已确认使用 Plume 内置能力；需按当前官方文档核对配置，并在生产构建后验证产物。 | 影响 FR-018 的 AI 友好索引验收。 | 实施时参考 Plume LLMs txt 官方文档，避免静态文件方案。 |
| B-005 | [STACK-GAP] | 当前未配置 test/lint/format/link-check scripts。 | 影响质量检查和 CI gate 的自动化程度。 | 发布清单中区分人工检查与可执行命令，避免声称已自动验证。 |
| B-006 | [RISK] | 当前仓库同时有 `packageManager: pnpm` 和 `package-lock.json`，且已确认保留当前状态。 | 可能影响贡献者对安装命令的理解。 | 贡献说明中明确推荐命令和保留现状，避免自动删除 lockfile。 |
| B-007 | [SPEC-GAP] | SRS 允许英文正文分批还是同批发布仍待确认。 | 影响 FR-012、FR-014 的缺页处理和上线口径。 | split 前保持为 Open Question；不要把英文全量同步作为隐含前置。 |
| B-008 | [STACK-CONTEXT-MISSING] | GitHub 仓库 URL、Edit this page 配置未确认；许可证方案已确认为文档 `CC BY-SA 4.0`、代码示例 `MIT`。 | 影响 FR-017、FR-018 的开源配套。 | 实施前由维护者确认公开仓库 URL；许可证文本按已确认方案落地。 |
| B-009 | [STACK-GAP] | 当前正式站点 IA 尚未替换 Plume demo/blog 示例导航。 | 影响 FR-001、FR-003 的上线准备。 | 后续实现需要检查导航、collections 和页面路径一致性。 |
| B-010 | [RISK] | 公开内容需要基于本地 Obsidian 资料改写，但公开页不能暴露本地路径或私有资料。 | 影响 FR-006 ~ FR-009、FR-012。 | 建立事实源记录和公开引用边界，发布前做敏感信息检查。 |

---

## 11. Open Questions

| 编号 | 问题 | 影响范围 | 是否阻塞 split |
|------|------|----------|----------------|
| Q-001 | 维护者手动创建的独立 skills 仓库最终 URL 和安装方式是什么？ | FR-015、FR-016 | 否 |
| Q-002 | Cloudflare Pages 的预览分支策略和 GitHub Actions 检查矩阵如何配置？ | FR-017、FR-018 | 是 |
| Q-003 | P0/P1 英文正文是否需要与中文同步发布同一批次，还是允许在中文上线后按英文模块分批补齐？ | FR-011 ~ FR-014 | 否 |
| Q-004 | `thinking/` 栏目在第一期是否进入主导航，还是仅作为文章集合入口保留？ | FR-003、FR-005 | 否 |
| Q-005 | 每篇 P0/P1 中文文章的最终标题是否完全沿用规划文档，还是允许在实现阶段优化标题？ | FR-006、FR-007 | 否 |
| Q-006 | 本地参考目录中每篇文章对应的主要事实源文件清单需要在实现前逐篇确认。 | FR-006、FR-007、FR-008 | 否 |
| Q-007 | 资源中心第一期是否需要提供可下载模板文件，还是先提供页面化模板内容？ | FR-009 | 否 |
| Q-008 | 英文正文标题是否完全对应中文标题，还是允许按英文读者习惯重写标题？ | FR-012、FR-013 | 否 |
| Q-009 | 英文缺页说明是否使用统一文本 `English version is being prepared`，还是需要更完整的站点级说明？ | FR-014 | 否 |
| Q-010 | 发布清单是否需要在仓库中作为 PR checklist 模板落地？ | FR-017、FR-018 | 否 |
