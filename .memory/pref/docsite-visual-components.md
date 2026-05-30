# 文档站视觉与组件偏好

**日期：** 2026-05-27
**类型：** pref

## 摘要

学习路径和教程类页面不应只有纯文字，应优先使用结构化视觉表达和交互体验。维护者更偏向优先使用 Vue Flow 和 Vue Bits 做有冲击力的交互与动效；复杂静态图优先采用 Excalidraw 源文件工作流，`fireworks-tech-graph` 用于静态技术图补充或兜底。教程页还应控制视觉重量和导航可读性，避免大阴影、过长目录标题、重复导航提示，以及“组件已经说过一遍，正文再原样重复一遍”的写法。

## 详情

- 教程和学习路径文章需要配图、图示、对比矩阵、路线卡片、步骤组件、检查清单、logo 卡片或自定义组件，避免干巴巴的纯文字长文。
- Vue Flow `https://vueflow.dev/` 是复杂流程、节点关系、可交互学习路线和核心流程可视化的优先方案。文档站可以为了学习体验提供更强的视觉和交互冲击力。
- Vue Bits `https://vue-bits.dev/get-started/index` 是动效和微交互参考，适合卡片进入、节点高亮、步骤切换、状态反馈等帮助理解的场景。
- `fireworks-tech-graph` 已安装，可用于生成生产质量 SVG/PNG 静态技术图，适合作为补充或兜底，例如 AI Coding 阶段演进、工具选择矩阵、运行环境结构图和项目拆解图。
- 对流程图、Agent 工作流、MCP / Tool / Memory / Hook 关系图等复杂静态图，不要直接只改导出的 SVG。必须先梳理图的表达逻辑，再修改 `.excalidraw` 源文件，最后导出 SVG 给 VuePress 展示。
- 画图前先写清楚：表达目标、读者视角、图类型、节点、连线、主线、分支/回路、不展示内容和素材选择。若逻辑不清晰，先暂停绘制，避免出现“视觉还可以但顺序和连接不对”的图。
- Excalidraw 基础素材库放在 `docs/assets/excalidraw-libraries/`；画图时先查各库的 `reference.md`，只读取或引用需要的单个 `icons/*.json` 素材。
- 当前已准备的基础库包括：`flow-chart-symbols`、`software-architecture`、`system-design-components`、`software-logos`、`technology-logos`、`cloud-symbols`。
- `.excalidraw` 源文件应作为可维护资产保留；导出的 `.svg` 只是文档展示产物。发现图的逻辑、连接或顺序不对时，应回到源文件修正。
- Excalidraw 图默认使用 `fontFamily: 2`，优先保证中文技术文档的中英文一致性。切换字体后必须回到 `.excalidraw` 源文件重新检查和修正独立 text 元素的居中，不要只改导出的 SVG。
- `DiagramFigure` 根据内容选择展示模式：默认 `fit`，超宽架构图或泳道图才使用 `wide`，小型概念图使用 `compact`。不要为了视觉冲击让图卡撑出正文区域或压到右侧目录。
- 画图时不要默认横向。先根据读者阅读顺序判断横向、纵向、分区、矩阵或多图拆分，版式服务内容理解。
- 即使追求视觉冲击，也要保证交互服务内容理解；避免无意义动画堆叠或为了简单图示引入过重依赖。
- 视觉组件必须兼顾移动端可读性，避免表格、卡片、logo 网格、代码块或 flow 在移动端横向溢出或遮挡正文。
- 教程和学习路径文章的页内目录与侧边栏标题应尽量短，优先使用名词型、判断型短标题，避免口语化流程句和过长标题在窄栏里换行堆叠。
- 对使用 `vuepress-theme-plume` 的教程页，不再手写文末“下一篇”“下一步阅读”等导航提示，优先使用主题内置的上一篇 / 下一篇导航；跨栏目关系可以放在正文说明或侧边栏分组中，不放成文末重复导航块。
- 文档页卡片、截图容器和图示容器不要使用大面积漂浮阴影；优先使用边框、轻背景和适度 hover 反馈来建立层次。
- 当页面已经通过卡片、矩阵、分层板或检查组件承载一组结论时，正文不要再原样复述同一份清单。组件负责“速览结论”，正文应改写为判断规则、边界说明、读取顺序或具体例子，形成互补而不是重复。

## 引用

- `openspec/changes/build-ai-coding-learning-path/doc-change.md`
- `openspec/changes/build-ai-coding-learning-path/tasks.md`
- `docs/assets/excalidraw-libraries/README.md`
- `https://vue-bits.dev/get-started/index`
- `https://vueflow.dev/`
