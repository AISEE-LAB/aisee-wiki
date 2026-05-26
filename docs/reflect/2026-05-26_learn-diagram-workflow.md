# Reflect: Learn Diagram Workflow

_Date: 2026-05-26_

## Context

本次会话围绕 learn 栏目的视觉表达展开，重点解决 Agent 组件图的逻辑、Excalidraw 源文件、SVG 导出、页面组件、字体和文字对齐问题。最终形成了“先梳理图逻辑，再维护 `.excalidraw` 源文件，最后导出 SVG 并截图验证”的文档图工作流。

## Memory Candidates

- 文档站复杂静态图应以 `.excalidraw` 为源文件，SVG 只是展示产物；修改图时必须先改源文件再导出。  
  Type: pref
- Excalidraw 图默认使用 `fontFamily: 2`，优先保证中文技术文档的中英文一致性；切换字体后必须重新检查文字居中。  
  Type: pref
- `DiagramFigure` 不应默认横向撑宽；根据图内容选择 `fit / wide / compact`，只有确实需要横向阅读的超宽图才使用 `wide`。  
  Type: pref

## Project Facts

- Excalidraw 图源流程文档位于 `docs/assets/diagram-logic/README.md`。
- Agent 组件图逻辑文档位于 `docs/assets/diagram-logic/learn-agent-components.md`。
- Agent 组件图源位于 `site/.vuepress/public/diagrams/learn/agent-components.excalidraw`。
- Agent 组件图展示产物位于 `site/.vuepress/public/diagrams/learn/agent-components.svg`。
- `DiagramFigure` 组件位于 `site/.vuepress/theme/components/DiagramFigure.vue`，支持 `fit`、`wide`、`compact` 三种模式。
- 项目内新增真实 skill：`.codex/skills/aisee-doc-diagram/SKILL.md`。

## Workflow Preferences

- 画图前先写表达目标、读者视角、节点、连线、主线、分支和不展示内容。
- 不默认把所有图做成横向图；根据阅读顺序选择横向、纵向、分区、矩阵或多图拆分。
- Excalidraw 导出 SVG 后，用 `rsvg-convert` 渲染 PNG 检查，不只看 macOS Quick Look 缩略图。
- 接入 VuePress 页面后，用浏览器截图检查图卡是否压到右侧目录、移动端是否可读。
- 字体从手绘风格切到普通字体后，必须回到 `.excalidraw` 源文件修正 text 元素位置。

## Open Questions

- 是否需要把 `excalidraw-brute-export-cli` 固化为 `package.json` 脚本，减少每次手写导出命令。
- 是否需要继续把已有 `LearningFlow` 图替换为 Excalidraw 源文件工作流，还是只对复杂静态图使用该流程。
