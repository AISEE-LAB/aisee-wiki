# 首页参考图切图与前端实现分析

> 来源参考图：
> - `docs/design-assets/homepage-reference/02-hero-long-page-first-viewport.png`
> - `docs/design-assets/homepage-reference/03-middle-methodology-sections.png`
> - `docs/design-assets/homepage-reference/04-bottom-learning-open-collaboration.png`
>
> 排除：`docs/design-assets/homepage-reference/01-hero-dense-first-draft.png`
>
> 状态：`candidate`
> 用途：为 `build-custom-homepage-entry` 的首页开发提供视觉资产拆分依据。

## 总体结论

首页不建议采用整页切图。参考图中的导航、标题、正文、按钮、卡片、时间线、流程节点、图标、页脚和大部分连接线，都应由前端使用 Vue 组件、CSS、SVG 和图标库实现。

需要单独处理为位图或透明素材的部分，主要是复杂的发光装饰层、方法论地图背景、能量流光、知识复利光环和底部网络纹理。这些素材也不建议直接从参考图裁切含文字区域，而应按参考图重新生成或绘制为无文字、可复用的装饰层。

## 需要完整切图或重新生成的素材

| ID | 建议素材 | 来源图 | 类型 | 用途 | 处理方式 | 状态 | 备注 |
|----|----------|--------|------|------|----------|------|------|
| homepage-hero-methodology-map | Hero 右侧方法论地图装饰层 | 02 | `illustration` / `overlay` | 首屏右侧视觉主体，表达需求洞察、OpenSpec、验证 gate、知识复利的系统流 | 不建议直接裁参考图；建议重新生成或绘制为无文字透明 PNG/WebP，文字和节点由代码叠加 | `candidate` | 如果用前端 SVG 完整复刻成本较高，可先作为一张背景视觉层使用 |
| homepage-hero-flow-trail | Hero 主能量流光 | 02 | `overlay` | 从需求洞察流向知识复利的动态感路径 | 可用 SVG path + CSS 动效实现；若追求参考图质感，可生成透明流光 PNG 作为叠加层 | `candidate` | 推荐优先 SVG/CSS，便于响应式和动效 |
| homepage-method-loop-glow | “工具越强，越需要方法论”底部发光回路 | 03 | `overlay` | 四个原则块之间的长回路动效背景 | 可用 SVG path + CSS 实现；只在无法达到发光质感时生成透明 overlay | `candidate` | 不应裁切包含卡片和文字的整块图片 |
| homepage-open-collab-network | 开放协作区底部网络纹理 | 04 | `overlay` | 开放协作 section 的轻量背景纹理 | 可生成低透明度 PNG/WebP 或用 CSS/SVG 点线网络实现 | `candidate` | 素材应极淡，不抢正文 |

## 不建议切图，应该由前端实现的内容

| 区域 | 来源图 | 实现方式 | 原因 |
|------|--------|----------|------|
| 顶部导航栏 | 02 | VuePress/Plume navbar 或自定义 Vue 组件 + CSS | 需要真实链接、响应式、搜索入口和可访问性 |
| Logo 与站点名 | 02 / 04 | 复用站点 logo 资产或 SVG，文字用真实文本 | 避免位图文字模糊，便于深色模式和 SEO |
| Hero 标题与副标题 | 02 | HTML 文本 + CSS 排版 | 需要可编辑、可翻译、可被搜索和复制 |
| Hero 操作按钮 | 02 | Button/Link 组件 | 需要 hover、focus、路由跳转和响应式 |
| Hero 指标数据 | 02 | HTML 列表或 stats 组件 | 后续文案和数据可能调整 |
| 左侧滚动锚点 | 02 | sticky nav + CSS 状态 | 需要随滚动更新，不能切图 |
| 工程领域卡片 | 02 / 03 | Grid + Icon 组件 | 内容简单，代码实现更清晰；图标可用 lucide 或自定义 SVG |
| “工具越强”四原则块 | 03 | Card 组件 + SVG 连接线 | 文案、状态和顺序需要可维护 |
| 三条核心主线卡片 | 03 | 结构化 HTML + Icon 组件 | 应保持语义化和可维护 |
| 推荐学习路径 | 03 / 04 | Timeline/Step 组件 + SVG/CSS 线条 | 后续需要链接到真实栏目或文章 |
| “从工具使用者到工程系统设计者”正文 | 04 | HTML 文本 + CSS 布局 | 核心价值表达必须可维护 |
| 工程方法论循环图 | 04 | SVG diagram 或可复用流程组件 | 与后续 `build-reusable-flow-explainer` 能力重合，适合组件化 |
| 开放协作入口 | 04 | Grid/Card + Icon 组件 | 需要跳转到贡献指南、案例、模板等真实页面 |
| 页脚 | 04 | Footer 组件 | 需要真实链接、版权、许可和主题切换 |

## 逐图分析

### 02 Hero 首屏

可作为完整视觉方向参考，但不建议整屏切图。

需要素材化的只有右侧复杂方法论地图和部分流光装饰。标题、按钮、导航、指标和下方工程领域入口都应由代码实现。首屏右侧视觉如果直接切成一张大图，会有三个问题：

- 文字和节点内容不可维护。
- 响应式缩放后细节容易糊。
- 后续动效无法拆分为路径流动、节点脉冲和状态变化。

推荐做法：

1. 用代码实现首屏结构和所有文字。
2. 用 SVG/CSS 绘制主要路径、节点和可控门禁。
3. 如需视觉质感，单独生成无文字的“发光流光 / 知识复利光环”透明素材作为 overlay。

### 03 中段方法论区

该图几乎全部适合代码实现。

工程领域卡片、原则块、三主线卡片和学习路径都属于结构化 UI。唯一可能素材化的是“四原则块”底部横向发光回路，但该回路也可以先用 SVG path + CSS `stroke-dasharray`、`filter: drop-shadow()` 和渐变描边实现。

推荐做法：

1. 工程领域卡片使用响应式 grid。
2. 四原则块使用普通卡片组件。
3. 发光连接线用 SVG 绝对定位层。
4. 三主线区使用三列布局，移动端改为单列。

### 04 底部收束区

推荐学习路径、方法论循环图、开放协作和页脚都应代码实现。底部开放协作区左下角网络纹理可以作为一个极淡的独立 overlay，也可以直接用 SVG 点线背景。

推荐做法：

1. 学习路径使用可复用 timeline/steps 组件。
2. 方法论循环图优先等待流程讲解组件或用 SVG diagram 实现。
3. 开放协作用卡片入口，不切图。
4. 页脚用真实链接实现。

## 开发建议

- 不做整页切图。
- 不把参考图中的中文文字裁成图片。
- 所有可交互元素都必须由代码实现。
- 图标优先使用 `lucide-vue-next` 或项目已有图标体系；没有匹配图标时再补自定义 SVG。
- 动效优先使用 CSS/SVG：路径流动、节点脉冲、卡片 hover、进度点高亮。
- 位图只用于无法高效代码化的装饰质感层，并保持无文字、无交互、低耦合。

## 建议素材产出清单

| ID | 文件建议 | 类型 | 透明 | 尺寸建议 | 用途 |
|----|----------|------|------|----------|------|
| homepage-hero-methodology-map-clean | `docs/design-assets/assets/illustrations/homepage-hero-methodology-map-clean.svg` | `illustration` | 是 | 1400x820 | Hero 右侧复杂视觉背景，推荐用于实现 |
| homepage-hero-flow-trail-clean | `docs/design-assets/assets/overlays/homepage-hero-flow-trail-clean.svg` | `overlay` | 是 | 1400x420 | Hero 能量流光叠加，推荐用于实现 |
| homepage-method-loop-glow-clean | `docs/design-assets/assets/overlays/homepage-method-loop-glow-clean.svg` | `overlay` | 是 | 1600x260 | 方法论四原则流光回路，推荐用于实现 |
| homepage-open-collab-network-clean | `docs/design-assets/assets/overlays/homepage-open-collab-network-clean.svg` | `overlay` | 半透明 | 1600x260 | 开放协作区淡纹理，推荐用于实现 |
| homepage-hero-methodology-map-crop | `docs/design-assets/assets/illustrations/homepage-hero-methodology-map-crop.png` | `illustration` | 否 | 925x545 | Hero 右侧复杂视觉背景参考裁切 |
| homepage-hero-flow-trail-crop | `docs/design-assets/assets/overlays/homepage-hero-flow-trail-crop.png` | `overlay` | 否 | 835x335 | Hero 能量流光参考裁切 |
| homepage-method-loop-glow-crop | `docs/design-assets/assets/overlays/homepage-method-loop-glow-crop.png` | `overlay` | 否 | 1450x175 | 方法论四原则流光回路参考裁切 |
| homepage-open-collab-network-crop | `docs/design-assets/assets/overlays/homepage-open-collab-network-crop.png` | `overlay` | 否 | 520x50 | 开放协作区淡纹理参考裁切 |

裁切素材已经保存，但当前状态仍是 `candidate`。已补充重绘后的 SVG clean 版本，状态为 `usable`，更适合公开首页实现。若后续需要更强质感，可在 SVG 基础上继续生成透明 PNG/WebP 版本。
