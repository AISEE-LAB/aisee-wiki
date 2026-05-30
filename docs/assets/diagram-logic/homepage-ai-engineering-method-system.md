# 首页 AI Engineering 方法系统图

## Expression Goal

在首页 Hero 右侧，用一张可维护的前端图表达 AI-Enhanced Software Engineering 的方法论结构，而不是用泛科技插画做装饰。

## Reader Context

读者第一次进入 AI SEE Wiki，需要快速理解本站讨论的不是单个工具、插件或代码生成技巧，而是一套围绕 OpenSpec、Compound Engineering 与 aisee 工作流组织起来的软件工程方法。

## Diagram Type

首页 Hero 概念图。使用 Vue 模板和 CSS 绘制，不使用位图，不把文字写进图片。

## Nodes And Roles

- `Spec First`：输入层。表达意图、约束、设计判断和验收标准先进入可审查的事实源。
- `Harness Better`：执行层。表达 Agent、Skill、MCP、Hook、Workflow、Schema 组成有边界的 AI 执行环境。
- `Verification Gate`：质量门。表达测试、评审、检查和 apply guard 决定是否继续。
- `Compound Knowledge`：沉淀层。表达 Review、Template、Case、Schema、Memory 等资产回流到下一轮工程。
- `AI Engineering Method`：中心概念。连接三条主线，不作为额外步骤。

## Edges And Labels

- 从 `Spec First` 到 `Harness Better`：规范驱动执行。
- 从 `Harness Better` 到 `Verification Gate`：执行结果进入验证。
- 从 `Verification Gate` 到 `Compound Knowledge`：通过验证的经验沉淀为资产。
- 从 `Compound Knowledge` 回到 `Spec First`：知识资产反哺下一次需求与规范。

## Main Reading Path

先看中心概念，再按 `Spec First -> Harness Better -> Verification Gate -> Compound Knowledge -> Spec First` 的闭环阅读。

## Branches And Loops

右侧只展示方法论闭环，不展开首页下方已有的六步工程链路，避免重复表达。

## Details Intentionally Left Out

- 不展示具体工具命令。
- 不展示完整六步流程。
- 不使用眼睛、大脑、灯泡等泛 AI 隐喻。
- 不展示 aisee plugin 的详细能力，留给下方内容区。

## Asset Or Component Choice

使用 `HomePage.vue` 内的 DOM/CSS 图形。理由：文字可控、响应式可控、无需担心生成图片中文字失真，并且后续可以按站点内容调整标签。
