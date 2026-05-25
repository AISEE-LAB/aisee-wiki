# Excalidraw 基础素材库

这些素材来自 Excalidraw 官方 Libraries 仓库，用于绘制本站技术文档中的流程图、Agent 结构图、系统架构图和运行环境图。

## 已下载素材

| 目录 | 来源库 | 用途 |
| --- | --- | --- |
| `flow-chart-symbols/` | Flow Chart Symbols | 开始/结束、处理、判断、输入输出、数据库等标准流程图符号 |
| `software-architecture/` | Software Architecture | 微服务、数据库、缓存、事件管道、浏览器、移动端等架构组件 |
| `system-design-components/` | System Design Components | 应用服务器、缓存、DNS、负载均衡、消息队列、CDN 等系统设计组件 |
| `software-logos/` | Software Logos | Docker、Kubernetes、Redis、Postgres、Nginx 等软件相关图形 |
| `technology-logos/` | Technology Logos | Git、Docker、Kubernetes、Kafka、Terraform 等技术 Logo |
| `cloud-symbols/` | Cloud | AWS、GCP、Azure、Kubernetes 等云与基础设施符号 |

每个目录保留：

- 原始 `.excalidrawlib`：可以导入 Excalidraw 继续编辑。
- `preview.*`：官方预览图，便于人工选择素材风格。
- `reference.md`：拆分后的素材索引。
- `icons/`：拆分后的单个素材 JSON，供脚本或 AI 精确引用。

## 绘图工作流

1. 先写清楚图的逻辑，不直接开画。
2. 判断图类型：流程图、关系图、架构图、数据流图、泳道图、时序图等。
3. 列出节点、节点类型、主线顺序、分支、回路和边标签。
4. 从 `reference.md` 中选择需要的素材。
5. 修改 `.excalidraw` 源文件。
6. 导出 `.svg` 给 VuePress 页面展示。
7. 截图检查：阅读顺序、连线方向、文字遮挡、PC 端首屏效果。

## 画图前逻辑模板

```md
# 图名

## 表达目标

这张图要让读者在 10 秒内理解什么？

## 读者视角

读者当前已经知道什么？还不知道什么？

## 图类型

流程图 / 关系图 / 架构图 / 数据流图 / 泳道图 / 时序图 / 其他

## 节点

| ID | 名称 | 类型 | 说明 |
| --- | --- | --- | --- |
| n1 |  | 开始/处理/判断/输出/组件 |  |

## 连线

| From | To | 标签 | 说明 |
| --- | --- | --- | --- |
| n1 | n2 |  |  |

## 主线

用一句话写出最主要的阅读顺序。

## 分支与回路

哪些路径是例外？哪些路径会回到前面的节点？

## 不展示的内容

哪些细节会干扰理解，应该放到正文里讲，而不是画进图里？

## 素材选择

使用哪个素材库？哪些节点需要图标？哪些只用基础形状？
```

## 资料来源

- Excalidraw Libraries: https://libraries.excalidraw.com/
- Libraries 仓库: https://github.com/excalidraw/excalidraw-libraries
- 本地生成工具: `/Users/fengliang/.agents/skills/excalidraw-diagram-generator`
