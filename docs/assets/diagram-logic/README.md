# Excalidraw 图源到 SVG 的处理流程

本站的复杂静态图优先使用 `.excalidraw` 作为源文件，SVG 只作为 VuePress 页面展示产物。不要直接手写最终 SVG，否则后续很难维护布局、字体和连线。

## 处理思路

1. 先写图的逻辑文档，明确表达目标、读者视角、节点、连线、主线、分支和不展示的内容。
2. 再修改 `.excalidraw` 源文件，保证源文件里节点、箭头、文字和画布边界本身就是正确的。
3. 从 `.excalidraw` 导出 `.svg`，页面只引用 SVG。
4. 用渲染后的 PNG 或浏览器截图检查，不只看 macOS Quick Look 缩略图。

当前例子：

- 逻辑文档：`docs/assets/diagram-logic/learn-agent-components.md`
- 图源：`site/.vuepress/public/diagrams/learn/agent-components.excalidraw`
- 展示产物：`site/.vuepress/public/diagrams/learn/agent-components.svg`
- 页面引用：`site/learn/agent-components.md`

## 推荐目录约定

```text
docs/assets/diagram-logic/<page-or-topic>.md
site/.vuepress/public/diagrams/<section>/<name>.excalidraw
site/.vuepress/public/diagrams/<section>/<name>.svg
```

逻辑文档记录“为什么这样画”，`.excalidraw` 记录“图怎么画”，`.svg` 只负责展示。

## 布局选择

不是所有图都应该横向展开。画图前要先判断内容的阅读方式，再决定版式和页面组件模式。

| 内容类型 | 推荐版式 | 适合的 `DiagramFigure` 模式 |
| --- | --- | --- |
| 3 到 6 步线性流程 | 横向或轻微折线 | `fit` |
| 超过 6 步的流程、带判断和回路 | 纵向、折线或分区流程 | `fit` |
| Agent 循环、状态流转、反馈闭环 | 中心节点 + 回路，或上下分层 | `fit` |
| 系统架构、组件拓扑、调用链很多 | 横向宽图或泳道图 | `wide` |
| 小型概念关系、单个定义图 | 居中小图 | `compact` |
| 对比、选型、职责边界 | 表格或卡片矩阵，不一定画流程图 | 通常不用图，或 `compact` |

页面里使用组件时默认是 `fit`，也就是在正文区域内完整缩放：

```md
<DiagramFigure src="/diagrams/learn/agent-components.svg" />
```

只有图本身确实需要横向阅读时，才使用 `wide`，让图片在组件内部横向滚动，而不是撑出正文区域：

```md
<DiagramFigure
  src="/diagrams/path/wide-architecture.svg"
  mode="wide"
/>
```

小图或局部概念图可以用 `compact`：

```md
<DiagramFigure
  src="/diagrams/path/small-concept.svg"
  mode="compact"
/>
```

判断标准：图的版式服务于“读者按什么顺序理解”，不是服务于“所有节点都放在一行”。如果横向图会压缩文字、跨过右侧目录、产生大量折线或必须滚动才能理解主线，就应该改成纵向、分区、矩阵或多个小图。

## 导出命令

当前使用 `excalidraw-brute-export-cli` 批量导出。它会启动 headless browser 打开 Excalidraw，再模拟官方导出流程，因此比手写 SVG 更接近真实 Excalidraw 视觉效果。

```bash
pnpm dlx excalidraw-brute-export-cli \
  -i site/.vuepress/public/diagrams/learn/agent-components.excalidraw \
  -o site/.vuepress/public/diagrams/learn/agent-components.svg \
  -f svg -s 1 -b true -e true \
  --timeout 60000 --action-sleep-time 300
```

参数含义：

| 参数 | 含义 |
| --- | --- |
| `-i` | 输入 `.excalidraw` 源文件 |
| `-o` | 输出 SVG 文件 |
| `-f svg` | 导出 SVG |
| `-s 1` | 导出比例 |
| `-b true` | 保留背景 |
| `-e true` | 把 scene 数据嵌入 SVG，方便后续追溯来源 |
| `--timeout` | 给 Excalidraw 页面和导出流程更多等待时间 |
| `--action-sleep-time` | 每一步模拟操作之间的等待时间 |

首次使用如果提示缺少 Playwright Firefox，需要先安装浏览器运行时：

```bash
pnpm dlx playwright@1.60.0 install firefox
```

## 视觉检查

不要只看 macOS Quick Look 生成的缩略图。Quick Look 常生成方形缩略图，可能误判为右侧或底部裁切。

优先用 `rsvg-convert` 渲染完整 PNG：

```bash
mkdir -p /tmp/aisee-diagram-check
rsvg-convert -w 1600 \
  site/.vuepress/public/diagrams/learn/agent-components.svg \
  -o /tmp/aisee-diagram-check/agent-components.png
```

如果图已经接入 VuePress 页面，还要用浏览器截图检查页面里的真实效果，重点看：

- 图卡是否压到右侧目录。
- 图中文字是否过小。
- 连线是否跨过节点或标签。
- PC 首屏里图是否表达完整。
- 移动端是否允许横向滚动或有其他降级方式。

## 画布边界

Excalidraw 导出 SVG 时会根据元素边界自动计算 viewBox。为了避免图紧贴边界，可以在 `.excalidraw` 源文件里放一个白色、无边框、锁定的底层矩形作为画布边界。

示例：

```json
{
  "id": "canvas-pad",
  "type": "rectangle",
  "x": 0,
  "y": 0,
  "width": 1280,
  "height": 590,
  "strokeColor": "transparent",
  "backgroundColor": "#ffffff",
  "fillStyle": "solid",
  "roughness": 0,
  "locked": true
}
```

这样导出的 SVG 会保留稳定留白，不会因为最外侧箭头或文字贴边而显得被裁切。

## 字体配置

`.excalidraw` 中字体主要由两个地方控制：

1. 每个 text 元素的 `fontFamily`。
2. `appState.currentItemFontFamily`，也就是后续新建文字时的默认字体。

本站当前 Excalidraw 图默认使用普通无衬线风格，优先保证中英文混排的一致性和可读性：

```json
{
  "appState": {
    "currentItemFontFamily": 2
  }
}
```

每个文字元素也设置：

```json
{
  "type": "text",
  "fontFamily": 2,
  "fontSize": 18,
  "lineHeight": 1.25
}
```

常用字体编号：

| `fontFamily` | 用途 |
| --- | --- |
| `1` | Excalidraw 默认手绘风格字体，英文有手绘感，但中文通常会 fallback 到系统字体 |
| `2` | 普通无衬线字体，适合本站这类中文较多、需要严肃技术文档感的图 |
| `3` | 等宽字体，适合代码、命令、字段名 |

注意：`fontFamily: 1` 对英文会呈现明显的 Excalidraw 手绘风格；中文通常会走浏览器或系统 fallback 字体。本站默认使用 `fontFamily: 2`，避免中英文风格割裂。

如果从 Excalidraw UI 编辑，选中文字后在顶部工具栏选择字体即可；如果用脚本生成或批量修改 `.excalidraw`，必须同步修改所有 text 元素的 `fontFamily`，并把 `appState.currentItemFontFamily` 改成同一个值。

批量切换示例：

```bash
node <<'NODE'
const fs = require('fs')
const p = 'site/.vuepress/public/diagrams/learn/agent-components.excalidraw'
const data = JSON.parse(fs.readFileSync(p, 'utf8'))
for (const element of data.elements) {
  if (element.type === 'text') element.fontFamily = 2
}
data.appState = {
  ...data.appState,
  currentItemFontFamily: 2,
}
fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n')
NODE
```

改完字体后必须重新导出 SVG，并重新截图检查。不要只改 SVG 中的 `font-family`，那会让源文件和展示产物不一致。

## 文字对齐

如果 `.excalidraw` 里的文字是独立 text 元素，而不是绑定在形状里的文本，换字体后很容易出现“看起来不在中间”的问题。原因是不同字体的字宽、行高和基线不同，原先手工放置的 `x/y/width/height` 不会自动按形状重新居中。

处理原则：

- 优先在 `.excalidraw` 源文件里修文字位置，不要在导出的 SVG 里补丁式修改。
- 对矩形节点，把标题和副标题当成一个文字组，按节点高度整体垂直居中。
- 对菱形节点，先按外接矩形中心对齐，再视觉微调，因为菱形的可读区域比外接矩形更窄。
- 换 `fontFamily` 后必须重新检查主要节点的水平和垂直居中。

批量修正时可以用脚本重新计算 text 元素的位置，但最终仍要渲染 PNG 或页面截图做视觉检查。
