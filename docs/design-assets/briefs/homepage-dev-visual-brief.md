# 首页开发视觉 Brief

> 来源：
> - `docs/design-assets/homepage-reference/02-hero-long-page-first-viewport.png`
> - `docs/design-assets/homepage-reference/03-middle-methodology-sections.png`
> - `docs/design-assets/homepage-reference/04-bottom-learning-open-collaboration.png`
>
> 排除：
> - `docs/design-assets/homepage-reference/01-hero-dense-first-draft.png`
>
> 面向：前端实现
> 状态：`candidate`

## 视觉目标

首页是长页面，不是把所有信息塞进首屏。首屏负责表达主张和建立方法论视觉锚点；中段解释 AI 增强的工程范围、方法论必要性和三条核心主线；底部完成学习路径、工程师角色转变和开放协作收束。

整体应保持文档站气质：克制、清晰、可信，不做营销页堆叠。参考图中的发光和流动效果只作为方法论系统感的视觉提示，不能压过文字可读性。

## 代码实现优先项

- 导航、搜索、链接、页脚。
- 所有标题、正文、按钮、指标和卡片文案。
- 工程领域卡片。
- 方法论四原则块。
- 三条核心主线卡片。
- 推荐学习路径 timeline。
- 开放协作入口。
- SVG 流程图、连接线、进度线和状态点。

## 素材实现候选

已生成一组无文字、透明或半透明、可缩放的 SVG clean 素材，优先使用这些素材进入实现：

- `docs/design-assets/assets/illustrations/homepage-hero-methodology-map-clean.svg`
- `docs/design-assets/assets/overlays/homepage-hero-flow-trail-clean.svg`
- `docs/design-assets/assets/overlays/homepage-method-loop-glow-clean.svg`
- `docs/design-assets/assets/overlays/homepage-open-collab-network-clean.svg`

这些素材都是纯视觉层。真实内容仍由前端代码承载。此前从参考图中裁切出的 PNG 仅作为视觉追溯和候选参考，不建议直接用于公开首页。

## 响应式建议

- Desktop：Hero 两栏或内容 + 视觉地图布局；中段使用 3-6 列 grid；学习路径横向展示。
- Tablet：Hero 可上下分区；领域卡片 2-3 列；学习路径改为换行 steps。
- Mobile：隐藏复杂右侧地图或降级为简化背景；所有卡片单列；学习路径改为纵向 timeline。

## 动效建议

- Hero 方法论地图：路径流动、节点轻微脉冲、验证 gate 状态高亮。
- 工程领域卡片：hover 轻微浮起和边框亮度变化。
- 四原则回路：SVG 描边慢速流动。
- 学习路径：当前步骤或 hover 步骤高亮。

动效应可关闭或弱化，避免影响阅读。

## 不建议

- 不整页切图。
- 不裁切包含文字的 UI 区块。
- 不把参考图当最终设计稿逐像素复刻。
- 不新增未确认业务入口。
- 不用大面积渐变、装饰光球或过度 3D。
