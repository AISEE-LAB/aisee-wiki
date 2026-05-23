# AI SEE Wiki 文档站第一期 - OpenSpec Change 拆分

**来源输入**：
- `docs/requirements/2026-05-22-ai-see-wiki-phase-one/00-main.md`
- `docs/tech-context/2026-05-22-ai-see-wiki-phase-one.md`
- 用户补充：首页不使用 Plume 主题自带首页，需要自定义首页；软件工程或插件流程讲解需要可复用流程组件。

---

## Summary

8 changes across 5 phases · estimated total: 8-12 weeks · 4 can run in parallel

---

## Dependency graph

```text
Phase 1 (sequential shared prerequisite):
  [migrate-site-source-boundary]

Phase 2 (parallel after phase 1):
  [configure-site-information-architecture]
  [build-custom-homepage-entry]
  [build-reusable-flow-explainer]

Phase 3:
  [publish-zh-core-content] depends on information architecture and flow component

Phase 4 (parallel after Chinese content foundation):
  [publish-en-i18n-content]
  [integrate-aisee-skills-docs]

Phase 5:
  [add-oss-deployment-quality] depends on site boundary, IA, i18n and skills docs
```

| Change | Depends on | Can run in parallel with |
|--------|------------|--------------------------|
| configure-site-information-architecture | migrate-site-source-boundary | build-custom-homepage-entry, build-reusable-flow-explainer |
| build-custom-homepage-entry | migrate-site-source-boundary | configure-site-information-architecture, build-reusable-flow-explainer |
| build-reusable-flow-explainer | migrate-site-source-boundary | configure-site-information-architecture, build-custom-homepage-entry |
| publish-en-i18n-content | publish-zh-core-content | integrate-aisee-skills-docs |
| integrate-aisee-skills-docs | configure-site-information-architecture | publish-en-i18n-content |

---

## Change details

─────────────────────────────────────────────────

### change 1/8

Name: `migrate-site-source-boundary`

Title: 迁移站点发布源并隔离协作产物

Schema: `spec-driven`

Complexity: M

Description:
  将 VuePress 发布源从当前 `docs/` 迁移到 `site/`，并把 `docs/` 固定为 aisee 协作产物目录。

In Scope:
- 迁移现有 VuePress/Plume 源码到 `site/`，保持站点可启动、可构建的基础状态 (FR-001)
- 更新 `package.json` 中开发、构建、预览脚本，使其指向 `site/` (FR-001, FR-017, FR-018)
- 将 `docs/requirements/`、`docs/ui-content/`、`docs/tech-context/`、`docs/split/`、`docs/reflect/`、`docs/learnings/` 明确保留为协作产物目录 (FR-004)
- 更新 README 或贡献说明中的目录职责边界 (FR-004, FR-017)
- 保留当前 `package-lock.json`，不自动删除 lockfile (tech-context B-006)

Out of Scope:
- 最终中文/英文正文内容
- 自定义首页视觉与详细文案
- skills 独立仓库创建
- Cloudflare Pages 生产部署配置

Depends on: none

Parallel with: none

Split rationale:
  `site/` / `docs/` 边界是所有后续内容、导航、部署和质量检查的共享前置。该 change 合并后站点仍应能以迁移后的源目录运行，并且不会误把协作产物作为发布源。

Command:
  `/opsx:new "migrate-site-source-boundary" --schema spec-driven`

─────────────────────────────────────────────────

### change 2/8

Name: `configure-site-information-architecture`

Title: 配置站点信息架构与导航入口

Schema: `spec-driven`

Complexity: M

Description:
  建立中文/英文栏目、导航、集合、资源中心和术语/阅读路径入口，替换 Plume demo 导航。

In Scope:
- 配置中文栏目路径：`learn`、`openspec`、`compound`、`aisee`、`workflows`、`thinking`、`resources` (FR-001, FR-003)
- 配置英文 `/en/` 下对应栏目入口和 slug 规则 (FR-011, FR-013)
- 替换当前 demo/blog 示例导航，避免正式导航指向示例内容 (FR-003)
- 建立资源中心入口、术语表入口和站点级阅读路径框架 (FR-005, FR-009, FR-010)
- 保留 `thinking/` 是否进入主导航为可配置决策，不阻塞基础 IA (SRS Q-004)

Out of Scope:
- P0/P1 文章正文
- 自定义首页具体内容
- SEO、sitemap、LLMs.txt 生产配置
- 视觉设计规范

Depends on: `migrate-site-source-boundary`

Parallel with: `build-custom-homepage-entry`, `build-reusable-flow-explainer`

Split rationale:
  IA、导航和集合配置是内容工作的路由基础，但不需要等待首页文案或文章正文定稿。该 change 可独立交付一个可浏览、无 demo 正式入口的站点骨架。

Command:
  `/opsx:new "configure-site-information-architecture" --schema spec-driven`

─────────────────────────────────────────────────

### change 3/8

Name: `build-custom-homepage-entry`

Title: 构建自定义首页入口

Schema: `spec-driven`

Complexity: M

Description:
  用自定义首页替代 Plume 主题自带首页，建立可承载后续首页内容讨论的页面结构。

In Scope:
- 明确首页不使用 Plume 主题默认 home/hero 方案，改用项目自定义首页 (用户补充, FR-002)
- 建立首页基础结构：站点定位、三条核心主线入口、推荐学习路径、开源入口的内容槽位 (FR-002)
- 保证首页与站点 IA、中文根路径 `/`、英文 `/en/` 的入口关系一致 (FR-002, FR-011)
- 为后续首页内容深度讨论预留可替换内容区，不把最终文案写死为本 change 的唯一成果

Out of Scope:
- 首页最终视觉稿、动效和完整文案
- 英文首页最终正文
- 文章内容生产
- 流程讲解组件

Depends on: `migrate-site-source-boundary`

Parallel with: `configure-site-information-architecture`, `build-reusable-flow-explainer`

Split rationale:
  首页是用户明确追加的独立产品边界。把自定义首页入口单独拆出，可以先废除默认主题首页依赖，同时允许具体首页内容和视觉在后续讨论中细化。

Command:
  `/opsx:new "build-custom-homepage-entry" --schema spec-driven`

─────────────────────────────────────────────────

### change 4/8

Name: `build-reusable-flow-explainer`

Title: 开发可复用流程讲解组件

Schema: `spec-driven`

Complexity: M

Description:
  提供一个可在软件工程方法论和插件流程文章中复用的流程讲解组件。

In Scope:
- 设计并实现一个 VuePress/Plume 可用的流程讲解组件，用于展示软件工程流程、插件流程、aisee 链路和 OpenSpec 状态机 (用户补充, FR-008, FR-010)
- 支持节点、阶段、连接关系、说明文本、状态/强调等基础表达能力
- 提供 Markdown 中的最小使用示例或组件示例页
- 支持中文内容优先使用，后续英文内容可复用同一组件 (FR-006, FR-007, FR-012)
- 遵守静态站点约束，不引入后端、数据库或运行时 API

Out of Scope:
- 为所有文章绘制最终流程图
- 复杂交互编辑器、拖拽编辑或在线保存
- 具体插件流程文章正文
- 第三方图形库选型承诺，除非后续 design.md 明确确认

Depends on: `migrate-site-source-boundary`

Parallel with: `configure-site-information-architecture`, `build-custom-homepage-entry`

Split rationale:
  流程组件会被 OpenSpec、Compound、aisee 和 workflows 多处内容复用，是内容生产的共享能力。单独拆出可以先稳定组件接口，避免每篇文章各自写一次不可维护的流程表达。

Command:
  `/opsx:new "build-reusable-flow-explainer" --schema spec-driven`

─────────────────────────────────────────────────

### change 5/8

Name: `publish-zh-core-content`

Title: 发布中文 P0/P1 核心正文

Schema: `spec-driven`

Complexity: L

Description:
  完成中文 P0/P1 文章正文、事实源规则、资源入口和中文阅读路径。

In Scope:
- 完成中文 P0 六篇核心文章正文 (FR-006)
- 完成中文 P1 六篇方法论闭环文章正文 (FR-007)
- 建立并应用中文文章写作标准、事实源记录和边界规则 (FR-008)
- 建立中文资源中心、模板页、命令速查和核心资源入口 (FR-009)
- 为中文正文建立文章间阅读路径，并在需要时使用流程讲解组件 (FR-010)
- 公开正文不得暴露本地 Obsidian 绝对路径或未整理私有资料 (tech-context B-010)

Out of Scope:
- 英文完整正文
- skills 仓库安装命令最终值
- 自定义首页最终视觉设计
- Cloudflare Pages 部署

Depends on: `configure-site-information-architecture`, `build-reusable-flow-explainer`

Parallel with: none

Split rationale:
  中文 P0/P1 是内容事实源主线，也是英文正文和资源引用的基础。虽然文章数量较多，但它们共享写作标准、事实源规则和阅读路径，作为一个 L 级内容 change 更容易保持一致性。

Command:
  `/opsx:new "publish-zh-core-content" --schema spec-driven`

─────────────────────────────────────────────────

### change 6/8

Name: `publish-en-i18n-content`

Title: 发布英文内容与双语体系

Schema: `spec-driven`

Complexity: L

Description:
  基于中文核心正文补齐英文 P0/P1 正文、双语术语、slug 和语言切换规则。

In Scope:
- 建立英文首页与英文栏目入口 (FR-011)
- 完成英文 P0/P1 正文，面向英文读者重写而不是逐字翻译 (FR-012)
- 建立中英文术语映射和 slug 同步规则 (FR-013)
- 配置双语 SEO 所需的标题、描述、canonical 和语言替代链接基础，生产域名使用 `aisee.wiki` (FR-014)
- 英文缺页策略保持为待确认项，不影响已完成英文页面发布 (SRS Q-009)

Out of Scope:
- 中文正文重写
- Cloudflare Pages 预览分支策略
- LLMs.txt 生产构建验证
- skills 独立仓库创建

Depends on: `publish-zh-core-content`

Parallel with: `integrate-aisee-skills-docs`

Split rationale:
  英文正文依赖中文主题、结论和术语稳定，但可与 skills 文档并行推进。该 change 保持双语内容、slug、术语和 SEO 入口在一个边界内，降低双语漂移风险。

Command:
  `/opsx:new "publish-en-i18n-content" --schema spec-driven`

─────────────────────────────────────────────────

### change 7/8

Name: `integrate-aisee-skills-docs`

Title: 集成 aisee skills 文档入口

Schema: `spec-driven`

Complexity: M

Description:
  在文档站提供 aisee skill 生态、skill 详情、安装入口占位和版本说明边界。

In Scope:
- 提供 aisee skill 生态总览和核心 skill 介绍页 (FR-015)
- 覆盖 `aisee:srs`、`aisee:ui-content`、`aisee:tech-context`、`aisee:split`、`aisee:change-design`、`aisee-init`、`aisee-opsx-schema`、`aisee-spec-migrate`、`aisee-reflect` (FR-015)
- 为已发布或待发布 skill 提供安装命令、版本说明、更新边界和仓库链接占位 (FR-016)
- 明确独立 skills 仓库由维护者手动创建，本项目不创建或维护该仓库 (SRS A-002, tech-context B-002)
- 在仓库 URL 和安装方式未提供前显示待配置状态，不发布不可用命令

Out of Scope:
- 创建独立 skills 仓库
- 发布或修改 skill 源码
- 实现安装脚本
- 英文完整正文

Depends on: `configure-site-information-architecture`

Parallel with: `publish-en-i18n-content`

Split rationale:
  skills 文档是独立内容域，依赖 IA 但不依赖英文正文完成。由于独立仓库由维护者手动创建，这个 change 只处理文档站引用与版本边界，避免把外部仓库工作混入当前项目。

Command:
  `/opsx:new "integrate-aisee-skills-docs" --schema spec-driven`

─────────────────────────────────────────────────

### change 8/8

Name: `add-oss-deployment-quality`

Title: 补齐开源部署与质量配套

Schema: `spec-driven`

Complexity: M

Description:
  完成开源贡献、许可证、部署说明、SEO、LLMs.txt 和发布质量检查配套。

In Scope:
- 提供开源贡献指南、目录边界说明、敏感信息规则和本地开发/构建/预览说明 (FR-017)
- 落地许可证说明：文档 `CC BY-SA 4.0`，代码示例 `MIT` (FR-017)
- 配置或说明 Cloudflare Pages 部署，生产域名使用 `aisee.wiki` (FR-017, FR-018)
- 使用 Plume 内置 `llmstxt` 能力，并按官方文档核对配置方式 (FR-018, tech-context B-004)
- 建立发布前质量检查清单：内部链接、外链、frontmatter、skills 链接、SEO、敏感信息、构建状态 (FR-018)
- 记录 GitHub 仓库 URL、预览分支策略、Actions 检查矩阵仍需确认的项 (tech-context B-003, B-008)

Out of Scope:
- 实际创建 Cloudflare 项目
- 推送或发布生产站点
- 截图验收
- 删除 `package-lock.json`
- skills 独立仓库创建

Depends on: `migrate-site-source-boundary`, `configure-site-information-architecture`, `publish-en-i18n-content`, `integrate-aisee-skills-docs`

Parallel with: none

Split rationale:
  开源和部署配套依赖最终目录、IA、双语页面和 skills 链接边界稳定。它不是纯基础设施，因为交付的是读者和贡献者可见的开源、SEO、LLM 和发布质量能力。

Command:
  `/opsx:new "add-oss-deployment-quality" --schema spec-driven`

─────────────────────────────────────────────────

---

## All commands

```bash
# Phase 1
/opsx:new "migrate-site-source-boundary" --schema spec-driven

# Phase 2 - run in parallel after Phase 1
/opsx:new "configure-site-information-architecture" --schema spec-driven
/opsx:new "build-custom-homepage-entry" --schema spec-driven
/opsx:new "build-reusable-flow-explainer" --schema spec-driven

# Phase 3
/opsx:new "publish-zh-core-content" --schema spec-driven

# Phase 4 - run in parallel after Phase 3 where dependencies allow
/opsx:new "publish-en-i18n-content" --schema spec-driven
/opsx:new "integrate-aisee-skills-docs" --schema spec-driven

# Phase 5
/opsx:new "add-oss-deployment-quality" --schema spec-driven
```

---

## Overall rationale

本次采用 vertical + shared-prerequisite 的拆分策略：先处理 `site/` / `docs/` 目录边界，再让 IA、自定义首页和流程组件并行推进。中文内容是英文内容和资源引用的事实基础，因此放在英文完整正文之前；skills 文档与英文内容可并行，因为它主要依赖 IA 和外部仓库链接占位。最大不确定性在首页最终内容、流程组件展示形态、CI/部署检查矩阵和英文发布节奏，因此这些内容分别被隔离到可控 change 或 Open Questions 中。

[ASSUMPTION] 自定义首页先交付首页结构与内容槽位，最终首页文案和视觉细节后续单独讨论 - affects `build-custom-homepage-entry` - confirm before implementation.

[ASSUMPTION] 可复用流程组件先覆盖静态文档中的流程讲解，不包含拖拽编辑、在线保存或复杂交互编辑器 - affects `build-reusable-flow-explainer` - confirm before implementation.
