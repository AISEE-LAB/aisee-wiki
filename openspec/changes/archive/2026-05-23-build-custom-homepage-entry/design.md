## Context

本 change 基于 `openspec/changes/build-custom-homepage-entry/proposal.md`，目标是用自定义首页替换 Plume 初始化的默认 home/hero 首页。当前 `site/README.md` 和 `site/en/README.md` 仍展示 Theme Plume 示例内容，与 AI SEE Wiki 的正式信息架构、价值主张和首页视觉探索不一致。

已确认的上下文：

- `site/` 是唯一公开站点发布源，`docs/` 是协作产物目录。
- 正式 IA 已建立：中文栏目为 `学习路径`、`OpenSpec`、`Compound`、`aisee`、`工程流程`、`观点文章`、`资源中心`；英文路径保持同 slug。
- 首页应表达“AI 时代的软件工程方法论”，强调 AI 增强软件工程、方法论驾驭工具、Spec-first、Harness、验证闭环和知识复利。
- `aisee` 是本站提供并持续探索的一套工作机制，和 OpenSpec 融合紧密，但不应被表达成与 OpenSpec / Compound 同等成熟的外部标准。
- `docs/design-assets/briefs/homepage-dev-visual-brief.md` 已沉淀首页视觉方向，首页是长页面，不应把所有内容堆叠在首屏。
- `docs/design-assets/assets/` 下已有 clean SVG 装饰素材，状态为 `usable`，可作为实现参考；裁切 PNG 仅保留为视觉追溯，不建议用于公开首页。

本 change 只涉及静态首页内容、前端布局和发布源静态资源，不涉及后端、数据库、API、运行时写入、鉴权或外部服务。

## Goals / Non-Goals

**Goals:**

- 替换 Plume 默认首页示例内容，建立 AI SEE Wiki 自定义中英文首页入口。
- 首页作为长页面承载价值主张、方法论判断、核心栏目入口和推荐学习路径。
- 中文首页优先表达完整结构；英文首页提供对应结构和基础表达，完整英文正文留给后续 i18n 内容 change。
- 首页内容必须连接现有正式栏目，不产生 demo/blog 示例入口或不存在的正式导航链接。
- 视觉实现优先使用代码、CSS、SVG 和已沉淀的 clean SVG 装饰素材，而不是整页切图。
- 在实现中保留后续首页文案、视觉和动效迭代空间。

**Non-Goals:**

- 不完成首页最终定稿文案。
- 不实现复杂流程讲解组件；流程组件属于 `build-reusable-flow-explainer`。
- 不编写 P0/P1 核心文章正文。
- 不完成英文首页最终正文。
- 不配置 SEO、sitemap、LLMs.txt、Cloudflare Pages 或评论系统。
- 不引入新的 UI 框架、图形库、后端服务或运行时 API。

## Decisions

### 1. 用自定义 Markdown + Vue 组件能力替换 Plume 默认 home 配置

设计：`site/README.md` 和 `site/en/README.md` 不再使用 Theme Plume 初始化的 `pageLayout: home` 示例配置。首页可以使用普通 Markdown、内联 HTML、项目本地 Vue 组件或首页专用 CSS 组合实现。

理由：Plume 默认 home/hero 适合快速模板站，不适合表达 AI SEE Wiki 的长页面信息结构和方法论主张。普通文档页或自定义组件能更细粒度控制内容区块、响应式布局和装饰素材。

备选方案：

- 继续使用 Plume home config：实现快，但会受主题预设结构限制，难以表达多段长页面。
- 整页图片作为首页：视觉还原快，但不可维护、不可搜索、不可访问，也不适合双语。

### 2. 首页采用长页面分段，而不是首屏堆叠

设计：首页按以下区块组织：

1. Hero：站点主张、方法论副标题、主要入口、方法论地图视觉。
2. 工程领域：AI 正在增强 Web、App、Desktop、嵌入式、硬件编程和复杂业务系统等开发领域。
3. 核心判断：工具越强，越需要方法论；突出需求契约、设计边界、验证 gate、知识沉淀。
4. 三条核心主线：OpenSpec、Compound Engineering、aisee 工作机制。
5. 推荐学习路径：基础能力、Spec-first、OpenSpec、Harness、验证闭环、知识复利、综合实践。
6. 开放协作：文档修订、真实案例、workflow / skill / schema 模板、术语与参考资料等入口。

理由：用户明确指出首页是长页面，不必全部堆叠在一起。分段结构可以让首页先表达价值，再逐步解释方法论和入口。

### 3. 副标题表达 OpenSpec / Compound 为参照，aisee 为探索性工作机制

设计：首页副标题采用类似以下语义：

> 以 OpenSpec 和 Compound Engineering 为核心参照，探索 AI 增强软件工程的方法论，并通过 aisee 工作机制把需求、设计、验证和复盘沉淀为可复用实践。

理由：`aisee skills` 是本站提供的探索性工作机制，与 OpenSpec 融合紧密，但不应被误表达为和 OpenSpec / Compound 并列的成熟外部体系。

### 4. 视觉素材只作为装饰层，真实内容由代码承载

设计：优先使用以下 clean SVG 素材作为装饰层：

- `docs/design-assets/assets/illustrations/homepage-hero-methodology-map-clean.svg`
- `docs/design-assets/assets/overlays/homepage-hero-flow-trail-clean.svg`
- `docs/design-assets/assets/overlays/homepage-method-loop-glow-clean.svg`
- `docs/design-assets/assets/overlays/homepage-open-collab-network-clean.svg`

若首页实现需要引用这些素材，应将确认可公开使用的版本复制到 `site/.vuepress/public/` 或 `site/` 下合适的发布源路径。`docs/design-assets/` 本身不是发布源，不应被站点运行时直接依赖。

理由：clean SVG 无文字、可缩放、可配合 CSS 动效，适合进入实现；裁切 PNG 含参考图文字和背景，不适合公开页面。

### 5. 响应式降级优先保证阅读

设计：

- Desktop：Hero 可采用文本 + 方法论地图两栏布局，中段使用多列 grid，学习路径横向展示。
- Tablet：Hero 上下分区，卡片 2-3 列，学习路径允许换行。
- Mobile：复杂方法论地图降级为简化装饰或隐藏，卡片单列，学习路径改为纵向 timeline。

理由：首页首先是文档入口，不能为了装饰牺牲可读性和移动端可用性。

## Risks / Trade-offs

- [RISK] 首页视觉探索可能让实现范围扩大。→ 缓解：本 change 只实现入口结构和可替换内容槽位，不追求最终视觉定稿。
- [RISK] clean SVG 素材在浅色背景上表现良好，但在暗色模式或其他背景下可能需要调整。→ 缓解：先作为浅色首页候选素材使用，必要时在实现中提供暗色降级或隐藏策略。
- [RISK] 英文首页如果照搬中文内容，可能形成生硬翻译。→ 缓解：本 change 只提供英文对应结构和基础表达，完整英文重写由后续 i18n change 完成。
- [RISK] 首页出现未完成栏目或文章死链。→ 缓解：只链接已存在的栏目首页、资源入口或建设中说明页。
- [RISK] 首页和后续流程讲解组件能力重叠。→ 缓解：首页中的流程视觉只做静态入口表达，复杂可复用流程组件留给 `build-reusable-flow-explainer`。

## Migration Plan

1. 替换 `site/README.md` 中的 Theme Plume 默认首页内容，建立中文自定义首页结构。
2. 替换 `site/en/README.md` 中的 Theme Plume 默认首页内容，建立英文对应首页结构。
3. 如需使用 clean SVG 素材，将可公开使用的素材复制到站点发布源，并避免引用 `docs/` 路径。
4. 添加或调整首页专用样式/组件，确保不影响其他栏目页面。
5. 检查首页链接只指向现有正式栏目或资源入口。
6. 运行 `openspec validate "build-custom-homepage-entry" --strict` 和 `pnpm docs:build`。

回滚策略：

- 如自定义组件或样式导致构建失败，可先回退为普通 Markdown + CSS 的静态首页结构。
- 如视觉素材引用有问题，可先移除装饰层，保留首页内容和正式入口。

## Open Questions

- 首页最终文案是否在本 change 内进一步打磨，还是保留为后续内容讨论的一部分？
- 首页是否需要移动端单独视觉参考图，还是在实现阶段直接基于响应式规则处理？
- 是否要把首页 clean SVG 素材复制到 `site/.vuepress/public/`，还是先用代码内联 SVG 实现？
