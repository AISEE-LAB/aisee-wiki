# 文档站视觉与组件偏好

**日期：** 2026-05-25
**类型：** pref

## 摘要

学习路径和教程类页面不应只有纯文字，应优先使用结构化视觉表达和交互体验。维护者更偏向优先使用 Vue Flow 和 Vue Bits 做有冲击力的交互与动效，`fireworks-tech-graph` 用于静态技术图补充或兜底。

## 详情

- 教程和学习路径文章需要配图、图示、对比矩阵、路线卡片、步骤组件、检查清单、logo 卡片或自定义组件，避免干巴巴的纯文字长文。
- Vue Flow `https://vueflow.dev/` 是复杂流程、节点关系、可交互学习路线和核心流程可视化的优先方案。文档站可以为了学习体验提供更强的视觉和交互冲击力。
- Vue Bits `https://vue-bits.dev/get-started/index` 是动效和微交互参考，适合卡片进入、节点高亮、步骤切换、状态反馈等帮助理解的场景。
- `fireworks-tech-graph` 已安装，可用于生成生产质量 SVG/PNG 静态技术图，适合作为补充或兜底，例如 AI Coding 阶段演进、工具选择矩阵、运行环境结构图和项目拆解图。
- 即使追求视觉冲击，也要保证交互服务内容理解；避免无意义动画堆叠或为了简单图示引入过重依赖。
- 视觉组件必须兼顾移动端可读性，避免表格、卡片、logo 网格、代码块或 flow 在移动端横向溢出或遮挡正文。

## 引用

- `openspec/changes/build-ai-coding-learning-path/doc-change.md`
- `openspec/changes/build-ai-coding-learning-path/tasks.md`
- `https://vue-bits.dev/get-started/index`
- `https://vueflow.dev/`
