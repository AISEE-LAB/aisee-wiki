## Context

本 change 基于 `openspec/changes/configure-site-information-architecture/proposal.md`，目标是在 `site/` 发布源迁移完成后，替换 Plume 初始化的 demo/blog 信息架构，建立 AI SEE Wiki 第一阶段可用的中英文栏目、导航、集合、资源中心、术语表和阅读路径入口。

技术栈与事实来源：

- `openspec/project.md`：站点源码已迁移到 `site/`，技术栈为 VuePress `2.0.0-rc.30` + `vuepress-theme-plume` `1.0.0-rc.201`，无后端、数据库、鉴权和 API。
- `site/.vuepress/navbar.ts`：当前中文导航仍为“首页 / 博客 / 标签 / 归档 / 笔记-示例”，英文导航仍为 “Home / Blog / Tags / Archives / Notes-Demo”。
- `site/.vuepress/collections.ts`：当前 collections 仍是 `blog` 和 `demo` 示例结构。
- `site/`：当前仍保留 demo/blog 示例公开页面，可构建但不是正式 IA。
- SRS FR-001、FR-003、FR-005、FR-011、FR-013：要求建立正式栏目、资源中心、术语表、阅读路径、英文栏目入口和 slug 同步规则。
- 用户约束：中文栏目入口不能直接写 `learn`、`workflows`、`thinking`、`resources`；中文读者可见入口必须使用中文显示名，slug 单独管理。
- Plume 官方文档：导航栏可通过 `navbar` 配置覆盖默认导航；collection 支持 `doc` 和 `post` 类型，多语言 collection 配置位于各 locale 下，`dir` 相对对应语言目录。

本 change 涉及的页面承载是静态 Markdown 和 VuePress/Plume 配置，不涉及表单、写入数据、接口提交、运行时权限、状态机、异步任务或外部集成。

## Goals / Non-Goals

**Goals:**

- 建立正式栏目路由与显示名映射，中文显示名与英文 slug 分离。
- 替换 demo/blog 示例导航，正式导航不得指向 demo 页面、blog 示例页、示例标签或示例归档。
- 建立中文栏目入口：`学习路径`、`OpenSpec`、`Compound`、`aisee`、`工程流程`、`观点文章`、`资源中心`。
- 建立英文 `/en/` 下对应栏目入口：`Learn`、`OpenSpec`、`Compound`、`aisee`、`Workflows`、`Thinking`、`Resources`。
- 为 `/learn/`、`/openspec/`、`/compound/`、`/aisee/`、`/workflows/`、`/thinking/`、`/resources/` 及 `/en/` 下对应路径建立可访问栏目页。
- 在资源中心中提供术语表入口、模板/Schema Pack/命令速查/检查清单/示例仓库/参考资料等后续资源槽位。
- 建立站点级阅读路径框架，让尚未完成正文的页面有明确状态说明，不产生导航 404。
- 保持中文优先，英文栏目可先提供结构与状态说明，完整英文正文由后续 change 完成。

**Non-Goals:**

- 不实现自定义首页具体布局、最终首页文案或视觉设计。
- 不编写 P0/P1 中文或英文正文。
- 不实现可复用流程讲解组件。
- 不集成 skills 独立仓库链接、安装命令或版本说明。
- 不配置 SEO、sitemap、LLMs.txt、Cloudflare Pages、GitHub Actions 或 Giscus。
- 不引入后端、数据库、API、运行时鉴权、搜索后端或动态内容系统。

## Decisions

### 1. 中文显示名与 slug 分离

设计：栏目使用稳定英文 slug 作为路径，中文导航、栏目页标题和读者可见入口使用中文显示名。

| slug | 中文显示名 | 英文显示名 | 栏目角色 |
|---|---|---|---|
| `learn` | 学习路径 | Learn | 基础层与推荐阅读路径 |
| `openspec` | OpenSpec | OpenSpec | 核心主线 |
| `compound` | Compound | Compound | 核心主线 |
| `aisee` | aisee | aisee | skill 生态与方法链路入口 |
| `workflows` | 工程流程 | Workflows | 综合实践与流程说明 |
| `thinking` | 观点文章 | Thinking | 观点、案例和文章型内容 |
| `resources` | 资源中心 | Resources | 模板、术语、命令、检查清单等资源 |

理由：slug 需要中英文一致、便于 URL 稳定和英文站复用；中文读者可见入口需要自然表达，不能直接暴露 `learn`、`workflows`、`thinking`、`resources` 这些英文 slug。

备选方案：

- 中文路径也使用拼音或中文路径：不采用。会增加双语 slug 同步复杂度。
- 中文导航直接显示英文 slug：不采用。与用户约束和中文站体验冲突。

### 2. 正式导航替换 demo/blog 示例入口

设计：`site/.vuepress/navbar.ts` 中的中文导航替换为正式栏目入口；英文导航替换为 `/en/` 下对应入口。demo/blog 示例页面可以暂时保留在仓库中用于参考，但不得出现在正式导航、栏目首页或阅读路径入口中。

建议导航层级：

- 中文：`首页`、`学习路径`、`OpenSpec`、`Compound`、`aisee`、`工程流程`、`资源中心`，`观点文章` 可作为“更多”或二级入口出现。
- 英文：`Home`、`Learn`、`OpenSpec`、`Compound`、`aisee`、`Workflows`、`Resources`，`Thinking` 可作为 secondary item。

理由：FR-003 要求正式导航覆盖核心栏目和资源入口，同时 SRS Q-004 对 `thinking/` 是否进入主导航仍未完全关闭。将 `观点文章` 设计为可访问但不阻塞主导航结构，既满足入口存在，也保留后续导航权重调整空间。

### 3. collections 按栏目拆分并按内容组织方式划分

设计：在 `site/.vuepress/collections.ts` 中用正式 collections 替换 `blog/demo` 示例 collections。`site/.vuepress/collections.ts` 只作为汇总入口；每个正式栏目在 `site/.vuepress/collections/` 下拥有独立配置文件，便于后续按栏目维护侧边栏、文章列表、资源页和额外集合配置。

- `learn`、`openspec`、`compound`、`aisee`、`workflows`、`resources` 使用独立 `doc` collection，适合结构化文档和侧边栏。
- `thinking` 使用独立 `post` collection，适合观点文章、案例和较松散内容。
- 每个栏目保留独立栏目主页面，即对应目录下的 `README.md`；doc collection 的 sidebar 必须显式把 `README.md` 作为栏目首页入口，而不是依赖空字符串等隐式写法。栏目主页面承载定位、当前状态和下一步入口。
- `thinking` 的栏目主页面保留为 `/thinking/`，文章列表入口单独配置为 `/thinking/articles/`，避免 post collection 列表页与栏目主页面争用同一路由。
- `thinking` 的标签、归档和分类页路径必须显式放在 `/thinking/articles/` 下，避免生成难以理解的默认派生路径。
- 英文 locale 使用同一组 slug 和对应英文标题，`dir` 相对 `site/en/`。

理由：Plume doc collection 适合强关联文档和侧边栏；post collection 适合碎片化文章列表。按栏目拆分配置可以让后续正文、侧边栏和栏目策略独立演进，避免所有栏目逻辑堆在单个工厂函数中。该划分与 SRS 中“文档型内容”和“观点型内容”边界一致。

备选方案：

- 所有栏目都使用 doc collection：实现更简单，但不利于 `thinking` 后续作为观点/文章集合。
- 只建页面不配置 collections：短期可用，但会让后续正文和侧边栏缺少统一组织方式。

### 4. 栏目页先交付结构与状态，不伪造正文完成

设计：每个栏目首页提供栏目定位、内容范围、当前状态和下一步阅读建议。正文尚未完成时使用“建设中”或“待补齐”状态，不链接不存在的文章。

页面最小承载：

- 中文栏目页：栏目标题、定位、可阅读内容、建设状态、下一步入口。
- 英文栏目页：英文标题、简短定位、建设状态，可链接中文对应栏目或根页。
- 资源中心页：资源槽位和术语表入口。
- 术语表页：先提供核心术语框架和待补状态，完整术语解释可由内容 change 补齐。

理由：FR-003 要求导航引用存在页面；FR-005 要求术语表和阅读路径入口；但 P0/P1 正文不属于本 change。用结构页和状态说明可以独立交付 IA，同时避免 404 和伪完成。

### 5. 迁移计划与回滚策略

迁移计划：

1. 定义栏目映射常量或在 `navbar.ts` / `collections.ts` 中保持同一映射口径。
2. 更新中文和英文 navbar，移除 blog/demo 示例入口。
3. 更新 collections，移除 demo/blog 示例 collections，在 `site/.vuepress/collections/` 下加入按栏目拆分的正式 collection 配置，并由 `site/.vuepress/collections.ts` 汇总。
4. 创建中文与英文栏目首页、资源中心、术语表和阅读路径入口页。
5. 检查导航链接、collection linkPrefix/permalink 与页面路径一致。
6. 运行 `openspec validate "configure-site-information-architecture" --strict` 和 `pnpm docs:build`。

回滚策略：

- 若 Plume collection 配置导致构建失败，可先保留页面与 navbar，临时回退 collection 改动，并在 tasks 中标记 collection 问题待修复。
- 若某个栏目路径或显示名需要调整，优先修改映射与对应页面，不恢复 demo/blog 导航。

### 6. 后续 specs 应覆盖的行为

后续 `site-information-architecture` spec 应至少覆盖：

- 中文显示名不得直接使用 `learn`、`workflows`、`thinking`、`resources`。
- 中文栏目入口与英文 slug 映射稳定。
- 英文 `/en/` 栏目与中文栏目 slug 对应。
- 正式导航不得引用 demo/blog 示例入口。
- 每个正式栏目入口可访问且不产生 404。
- 每个正式栏目必须有 `README.md` 栏目主页面；doc collection 侧边栏必须显式引用 `README.md`；文章型栏目不得用文章列表页替代栏目主页面。
- collections 必须按栏目拆分，汇总入口不得重新堆回单个大配置。
- 资源中心、术语表和阅读路径入口存在。
- 正文未完成时必须显示状态说明，不得伪造已完成内容。

## Risks / Trade-offs

- [RISK] SRS 原文中把栏目 slug 写进中文栏目范围，容易被误实现为中文显示名。→ 缓解：本 design 明确显示名与 slug 分离，spec 中写入中文入口不得直接显示特定英文 slug。
- [RISK] `thinking/` 是否进入主导航仍是未完全关闭的问题。→ 缓解：实现上保证 `观点文章` 可访问，并允许在主导航或“更多”二级入口中呈现；不让该决策阻塞 IA。
- [RISK] Plume collection 配置与页面 permalink 不一致会导致侧边栏或列表异常。→ 缓解：优先使用目录 README 与稳定路径；构建后检查栏目入口和 collection 前缀。
- [RISK] 为避免 404 创建大量占位页，可能让读者误以为正文已完成。→ 缓解：所有占位页必须明确当前状态和下一步补齐方向。
- [RISK] demo/blog 示例页面保留在仓库中但不在导航中，后续仍可能被误链接。→ 缓解：静态检查导航、栏目首页和阅读路径不得引用 demo/blog 示例入口；是否删除示例页面留给后续清理。

Open Questions:

- `观点文章` 第一阶段放在主导航还是“更多”二级入口？当前设计允许二级入口，不阻塞实现。
- 术语表在本 change 中只建立入口与框架，完整术语解释是否并入中文核心正文 change？当前设计倾向后续内容 change 补齐完整解释。
