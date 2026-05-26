# Workflow Fix: 文档图布局与字体检查

_Date: 2026-05-26_

## Problem

文档图一开始容易被做成横向大图，导致页面组件压到右侧目录；Excalidraw 字体从手绘风格切到普通字体后，独立 text 元素的位置不会自动重算，容易出现文字不居中。

## Fix

画图前先判断阅读顺序和页面容器，再选择版式和 `DiagramFigure` 模式。字体变更后，必须回到 `.excalidraw` 源文件重新居中文字，并重新导出 SVG。

## Applies To

- [ ] Global
- [x] This project only

## Suggested Instruction

```markdown
为文档站制作复杂静态图时，先写图逻辑，再选择版式，不默认横向。`.excalidraw` 是源文件，SVG 是展示产物。导出后用 `rsvg-convert` 或浏览器截图检查，不只看 Quick Look。Excalidraw 默认使用 `fontFamily: 2`；修改字体后必须重新检查和修正独立 text 元素的居中。`DiagramFigure` 默认使用 `fit`，只有确实需要横向阅读的图才使用 `wide`。
```

## Verification

- 已用 Agent 组件图验证 `.excalidraw` 源文件、SVG 导出、PNG 渲染和 VuePress 构建。
- 已修复 `DiagramFigure` 组件，避免图卡撑出正文区域压到右侧目录。
