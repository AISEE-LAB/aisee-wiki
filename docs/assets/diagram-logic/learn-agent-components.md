# Agent Components Diagram Logic

**日期：** 2026-05-26
**页面：** `site/learn/agent-components.md`
**图源：** `site/.vuepress/public/diagrams/learn/agent-components.excalidraw`
**展示：** `site/.vuepress/public/diagrams/learn/agent-components.svg`

## 表达目标

让读者理解 Memory、Skill、MCP、Tool、Hook 不是五个并列功能，而是围绕一次 Codex Agent 任务分别承担上下文、流程、连接、执行和检查职责。

## 读者视角

读者已经看过 Agent 基础文章，知道 Agent 有目标、上下文、工具和反馈循环；但还不清楚 Memory、Skill、MCP、Tool、Hook 在一次任务中如何分工。

## 图类型

关系 + 流程混合图。主线表达任务流转，辅助节点表达组件职责。

## 节点

| ID | 名称 | 类型 | 说明 |
| --- | --- | --- | --- |
| n1 | 用户目标 | 输入 | 任务、约束、验收标准 |
| n2 | 装载上下文 | 处理 | 当前会话、项目规则、项目记忆、全局记忆 |
| n3 | 模型计划 | 处理 | 判断下一步是直接输出还是调用工具 |
| n4 | Tool 执行 | 执行 | 读文件、改代码、跑命令、浏览器、API |
| n5 | 观察结果 | 反馈 | stdout、diff、截图、报错、测试结果 |
| n6 | 输出结果 | 输出 | 解释、diff、验证结果、下一步建议 |
| s1 | Memory | 支撑 | 为上下文装载提供长期或短期信息 |
| s2 | Skill | 支撑 | 为模型计划提供稳定流程、模板和脚本 |
| s3 | MCP | 支撑 | 把外部系统能力暴露为可用工具 |
| s4 | Hook | 约束 | 在工具调用、文件修改、提交前等节点检查或拦截 |

## 连线

| From | To | 标签 | 说明 |
| --- | --- | --- | --- |
| n1 | n2 | 输入 | 当前任务进入上下文 |
| n2 | n3 | 供模型判断 | 上下文成为推理材料 |
| n3 | n4 | 需要动作 | 需要读取、修改、运行或访问外部系统 |
| n4 | n5 | 返回结果 | 工具执行结果进入观察 |
| n5 | n3 | 下一轮 | 观察结果重新进入模型计划 |
| n3 | n6 | 可交付 | 不需要继续调用工具时输出 |
| s1 | n2 | 提供背景 | Memory 不是事实源，只提供可复用上下文 |
| s2 | n3 | 约束流程 | Skill 不执行动作，只让流程稳定 |
| s3 | n4 | 提供能力 | MCP 常把外部系统封装为 Tool |
| s4 | n4 | 检查/拦截 | Hook 约束执行边界 |
| s4 | n6 | 提交前检查 | 输出或提交前做安全、质量、上下文检查 |

## 主线

用户目标进入上下文，模型基于上下文和 Skill 计划下一步；先判断是否需要工具，需要动作时调用 Tool，Tool 结果进入观察并回到下一轮；不需要继续调用工具时输出结果。

## 分支与回路

- `模型计划 -> 需要工具? -> Tool 执行 -> 观察结果 -> 模型计划` 是 Agent 的执行回路。
- `模型计划 -> 需要工具? -> 输出结果` 是任务完成或需要用户确认时的出口。
- MCP 不直接替代 Agent，只给 Tool 层提供外部能力。
- Hook 不直接做业务判断，只在工具调用、输出或提交等生命周期节点检查、注入或拦截。

## 布局约束

- PC 端优先，横向空间可以适度展开，但右侧出口不能贴近导出边界。
- 上方是支撑层：Memory、Skill、Hook。
- 中间是任务主线：用户目标、装载上下文、模型计划、是否需要工具、输出结果。
- 下方是执行回路：执行 Tool、观察结果，并以虚线回到模型计划。
- MCP 靠近 Tool，而不是放到主线里，避免读者误解 MCP 会直接替代 Agent 执行动作。

## 不展示的内容

- 不展开具体 MCP 协议字段。
- 不列出所有 Tool 类型。
- 不画全局记忆和项目记忆的完整层级，细节留给 Memory 文章。
- 不画每个 Hook 的实现脚本，细节留给 Hook 文章。

## 素材选择

这张图主要使用 Excalidraw 基础形状，不强行引入软件图标。原因是核心目标是解释职责边界和流向，图标会增加噪音。后续涉及具体外部系统拓扑时再使用 `docs/assets/excalidraw-libraries/` 中的素材库。

## 导出与检查

图源修改后必须重新导出 SVG：

```bash
pnpm dlx excalidraw-brute-export-cli \
  -i site/.vuepress/public/diagrams/learn/agent-components.excalidraw \
  -o site/.vuepress/public/diagrams/learn/agent-components.svg \
  -f svg -s 1 -b true -e true \
  --timeout 60000 --action-sleep-time 300
```

视觉检查不要只看 macOS Quick Look 缩略图，它会生成方形缩略图，容易误判为右侧或底部裁切。优先用下面命令渲染完整 PNG 后检查：

```bash
rsvg-convert -w 1600 \
  site/.vuepress/public/diagrams/learn/agent-components.svg \
  -o /tmp/aisee-diagram-check/agent-components.png
```
