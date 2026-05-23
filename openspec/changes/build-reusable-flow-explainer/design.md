## Context

本 change 基于 `openspec/changes/build-reusable-flow-explainer/proposal.md`，目标是在后续中文 P0/P1 正文大规模生产前，提供一个可复用的流程讲解组件。当前 `site/` 已是唯一公开站点发布源，正式 IA 已包含 `/workflows/` 和 `/en/workflows/` 栏目入口，`site/workflows/README.md` 已明确“流程正文和可复用流程组件将在后续 change 中补齐”。

已确认的上下文：

- `openspec/project.md`：项目是 VuePress `2.0.0-rc.30` + `vuepress-theme-plume` `1.0.0-rc.201` 静态文档站，无后端、数据库、鉴权或运行时 API。
- `site/.vuepress/client.ts` 已注册项目本地 `HomePage` 组件，说明当前项目可以通过 VuePress client config 注册自定义 Vue 组件。
- `site/.vuepress/theme/components/` 已存在本地 Vue 组件目录，适合放置流程讲解组件。
- SRS FR-008 要求涉及流程的文章使用 Mermaid 或等价文本说明流程关系；用户补充要求软件工程或插件流程讲解需要可复用流程组件。
- 该组件会被 OpenSpec、Compound/Harness、aisee 和 workflows 内容复用，但本 change 不负责写完这些文章。

本 change 只涉及静态展示组件、示例页面、样式和构建检查，不涉及在线编辑、拖拽编排、数据持久化或外部服务。

## Goals / Non-Goals

**Goals:**

- 提供一个 VuePress Markdown 中可直接使用的流程讲解组件。
- 支持用结构化数据表达阶段、节点、连接关系、说明文本、状态和强调。
- 支持至少一种 OpenSpec/aisee/Harness 类流程示例，作为后续正文复用参考。
- 在桌面端展示清晰的阶段关系，在移动端降级为可读的纵向流程或分组列表。
- 组件内容必须可维护、可搜索、可访问；关键文本不得只出现在图片中。
- 保持静态站点约束，不引入后端、数据库、运行时 API 或复杂图形编辑依赖。

**Non-Goals:**

- 不实现拖拽编辑、在线保存、节点重排、缩放画布或流程图编辑器。
- 不为所有 P0/P1 文章绘制最终流程图。
- 不替代 Mermaid 在简单流程图中的用途；简单图仍可继续使用 Mermaid。
- 不建立独立流程数据文件系统或内容管理系统。
- 不引入第三方图形库、布局引擎或可视化框架，除非实现中证明原生方案无法满足 spec。
- 不完成英文流程正文；英文内容深化属于后续 i18n content change。

## Decisions

### 1. 使用项目本地 Vue 组件，而不是图片或第三方图形库

设计：新增 `FlowExplainer.vue` 或等价本地组件，放在 `site/.vuepress/theme/components/`，通过 `site/.vuepress/client.ts` 注册为全局组件，供 Markdown 页面直接使用。

理由：项目已经使用 VuePress client config 注册 `HomePage`，本地 Vue 组件是当前最小、最一致的扩展方式。流程讲解需要承载真实文本、链接和状态，不适合用含文字图片实现；第三方图形库会扩大依赖和维护面，目前需求只要求静态展示。

备选方案：

- Mermaid：适合简短流程图，但难以承载丰富说明、状态、下一步阅读和响应式降级。
- SVG 切图：视觉可控，但文本不可维护、不可搜索，也不利于双语。
- 第三方图形库：能力更强，但当前没有拖拽、缩放、自动布局等必要需求。

### 2. 组件接口以阶段和连接为核心

设计：组件最小输入围绕以下结构组织：

- `title` / `description`：流程标题和说明。
- `stages`：阶段列表，每个阶段包含 `id`、`title`、`description`、`items`。
- `items`：节点列表，每个节点包含 `id`、`title`、`description`、`status`、`accent`、`href` 等可选字段。
- `connections`：连接关系列表，描述 `from`、`to`、`label` 和可选关系类型。
- `legend`：状态或颜色说明，可选。

理由：OpenSpec 状态机、Compound/Harness 循环和 aisee 链路都能抽象为“阶段 + 节点 + 关系”。保持接口小而稳定，可以先支撑内容生产，再根据真实文章需求扩展。

### 3. 桌面端强调关系，移动端强调阅读顺序

设计：

- 桌面端：使用 CSS grid/flex 展示阶段列、节点列表和连接提示；连接可以用轻量线条、箭头或关系标签表达。
- 移动端：优先展示阶段纵向顺序和节点说明，连接关系可转为“下一步”“依赖”“回流”等文本标签。
- 无论视口大小，核心流程文本和链接必须可见，视觉连接不得成为理解流程的唯一来源。

理由：流程图在窄屏中很容易拥挤。AI SEE Wiki 是文档站，移动端应优先保证阅读和导航，而不是强行保留桌面图形布局。

### 4. 示例页放在 workflows 栏目，作为组件用法而非最终正文

设计：在 `site/workflows/` 下新增组件示例页，或更新现有 workflows 栏目入口链接到示例页。示例可以选择 OpenSpec propose-to-archive、aisee 从 SRS 到 change 的链路，或 Harness 验证闭环。示例应展示组件调用方式、阶段、节点、连接和状态，但应明确它是示例/建设中内容，不代表 P0/P1 正文完成。

理由：`workflows` 栏目是流程说明的自然承载位置；示例页能让维护者在构建后快速验证组件效果，也给后续文章作者提供复制入口。

### 5. 样式收敛在组件内或专用样式文件中

设计：优先在 Vue SFC scoped style 中实现组件样式；如需要全局变量，使用项目已有主题变量或组件专用 class 前缀，避免影响普通文档页面和首页。颜色使用有限的状态语义，如 default、active、done、blocked、risk，不把视觉主题写死为单一流程类型。

理由：该组件会跨栏目复用，样式污染会影响首页、栏目页和文章页。使用局部样式更容易控制 blast radius。

### 6. 验证以 OpenSpec、静态检查和构建为准

设计：实现后至少运行：

1. `openspec validate "build-reusable-flow-explainer" --strict`
2. 静态检查确认组件已注册、示例页存在，且示例页不引用 `docs/` 协作产物路径。
3. `pnpm docs:build`

如果实现阶段新增复杂交互或视觉状态，补充本地预览或浏览器截图检查。

## Risks / Trade-offs

- [RISK] 组件接口过度设计，影响首版实现速度。→ 缓解：首版只要求阶段、节点、连接、状态和示例；后续文章真实需要再扩展。
- [RISK] 连接线在移动端不可读。→ 缓解：移动端把连接降级为文本关系和顺序提示，保留核心信息。
- [RISK] 示例页被读者误认为正式流程正文已完成。→ 缓解：示例页明确说明是组件示例或建设中内容，后续正文另行完成。
- [RISK] 组件与 Mermaid 能力重叠。→ 缓解：明确 Mermaid 仍用于简单图；本组件用于需要说明、状态、链接和响应式阅读的流程讲解。
- [RISK] 后续英文内容需要不同表达长度，可能撑破布局。→ 缓解：组件样式使用自适应宽度、换行和纵向降级，不依赖固定文本长度。

## Migration Plan

1. 新增流程讲解 Vue 组件，定义阶段、节点、连接和状态 props。
2. 在 `site/.vuepress/client.ts` 注册组件，供 Markdown 使用。
3. 新增或更新 workflows 示例页，展示组件最小用法和至少一个真实方法论相关示例。
4. 添加组件样式，确保桌面、平板和移动端文本不重叠、入口可点击。
5. 检查示例页链接只指向存在的正式栏目或资源入口。
6. 运行 `openspec validate "build-reusable-flow-explainer" --strict` 和 `pnpm docs:build`。

回滚策略：

- 如果组件注册或 SFC 构建失败，先移除示例页中的组件调用并恢复为普通 Markdown 流程列表，保留需求文档和任务状态。
- 如果响应式视觉不稳定，先隐藏装饰连接线，保留阶段、节点和关系文本。

## Open Questions

- 首个示例优先采用 OpenSpec propose-to-archive，还是 aisee 从 SRS 到 change 的链路？当前设计允许选择其中一个作为最小示例。
- 组件 props 是否需要在首版抽出 TypeScript 类型文件？若实现保持在单个 SFC 内即可清晰表达，可先不拆分。
