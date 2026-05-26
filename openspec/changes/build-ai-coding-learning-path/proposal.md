# Proposal: build-ai-coding-learning-path

## 背景与问题

- 当前问题：`/learn/` 目前只是占位式推荐入口，尚未承载用户确认的 AI Coding 学习主线，也没有形成从认知、工具、环境、Codex 配置、第一个项目到 Agent 核心组成的完整路径；Agent 进阶还需要明确 Memory 在 Agent 系统中的位置，尤其要区分全局记忆、项目记忆和当前会话上下文。
- 触发原因：维护者确认“学习路径”应先服务 AI Coding 入门读者，分为入门准备与第一个实战项目，并要求文章排版充分利用 `vuepress-theme-plume` 组件能力，必要时创建自定义组件；工具与模型相关内容需要使用 `@lobehub/icons` 获取模型或工具 logo。
- 关联基线：openspec/project-docs.md

## 目标

- 将 `/learn/` 从占位入口升级为 AI Coding 学习路径首页，按“认知入门 / 工具上手 / Agent 进阶”组织正文。
- 新增 12 篇中文学习路径正文，覆盖 AI Coding 认知、工具与模型选型、基础运行环境、Codex 安装配置、第一个 AI Coding 项目，以及 memory、skill、MCP、tool、hook 等 Agent 核心组成。
- 在学习路径文章中使用 Plume 已有 Markdown/Vue 组件能力组织信息，例如卡片、步骤、提示、代码组、表格、图示和链接入口。
- 每篇文章都必须至少包含一种结构化视觉表达，例如配图、流程图、对比矩阵、路线卡片、步骤组件、检查清单或自定义展示组件，避免成为纯文字长文。
- 在工具与模型相关页面展示多个 AI 编程工具和模型生态，但站内推荐重点聚焦 Codex、Claude、Gemini、GLM；相关 logo 按 LobeHub Icons 说明使用 `@lobehub/icons` 的静态 CDN/SVG 能力或封装后的 Vue 组件方式获取图标资源。
- 视觉资产和交互表达优先参考：交互式流程/节点体验优先使用 Vue Flow；动效风格和微交互优先参考 Vue Bits；静态技术图可使用 `fireworks-tech-graph` 生成 SVG/PNG 作为补充或兜底。
- 为后续 OpenSpec、Compound、aisee 进阶内容建立清晰的站内下一步阅读入口。

## 不在范围

- 不在本 change 中完成 OpenSpec、Compound、aisee 专题正文。
- 不在本 change 中重写英文完整正文；英文页面可保持建设中说明或提供对应入口占位。
- 不在本 change 中创建新的 AI 编程工具评测系统、排行榜、实时价格表或自动更新模型能力数据库。
- 不在本 change 中复刻真实商业网站的品牌内容、文案、商标或受版权保护素材；第一个项目只使用参考结构和自拟示例内容。
- 不在本 change 中安装或配置生产级评论、搜索、部署、CI 或外部 API。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | `/learn/` | 从占位入口升级为 AI Coding 入门学习路径。 |
| 页面 | `/learn/`、`/learn/ai-coding-intro/`、`/learn/tools-and-models/`、`/learn/runtime-setup/`、`/learn/codex-setup/`、`/learn/first-ai-project/`、`/learn/agent-basics/`、`/learn/agent-memory/`、`/learn/skills/`、`/learn/mcp/`、`/learn/tool-calls/`、`/learn/hooks/`、`/learn/agent-orchestration/` | 新增或改写中文正文。 |
| 导航/侧边栏 | `site/.vuepress/collections/learn.ts` | 将新增文章纳入学习路径侧边栏，并保持 README 作为栏目首页。 |
| 路由/frontmatter | 中文学习路径页面 frontmatter | 每篇文章必须提供稳定 permalink、title、createTime 或项目现有 frontmatter 约定。 |
| 站点配置 | 可能涉及依赖、组件注册或主题组件目录 | 如实现采用 `@lobehub/icons` 运行时/构建时能力或新增 Vue 组件，需要更新相关依赖和组件文件；如仅使用静态 CDN URL，需要记录来源并避免不必要依赖。 |

## 成功标准

- [ ] `/learn/` 首页已改写为 AI Coding 学习路径总览，包含“认知入门 / 工具上手 / Agent 进阶”三类导读。
- [ ] 12 篇中文正文已创建并达到可发布内容，不是占位页或纯大纲。
- [ ] `tools-and-models` 页面可横向介绍更多 AI 编程工具和模型，但推荐重点明确聚焦 Codex、Claude、Gemini、GLM，并包含它们的定位、适用场景、便捷程度和选择矩阵。
- [ ] Agent 进阶分组覆盖 Agent 基础、Memory、Skill、MCP、Tool、Hook，以及 Memory/Skill/MCP/Tool/Hook 如何配合分工的总览文章。
- [ ] `agent-components` 文章以 Codex 智能体为主要例子，解释全局记忆、项目记忆、项目规则、当前会话上下文、工具执行、MCP 连接和 Hook 检查如何协作。
- [ ] 工具或模型 logo 按 `@lobehub/icons` 使用说明获取；VuePress 页面不得直接依赖 React 组件渲染，除非实现中提供兼容封装并通过构建验证。
- [ ] 每篇文章都有配图、流程图、矩阵、路线卡片、步骤组件、检查清单或等效结构化视觉表达，不得只有连续段落文字。
- [ ] 文章排版已使用 Plume 现有组件能力；若新增自定义组件，组件应服务清晰表达而不是装饰。
- [ ] 侧边栏入口、页面 permalink 和站内下一步阅读链接正确。
- [ ] 涉及最新工具、模型、安装方式或能力描述的内容已在实现时核对官方文档，并在正文中标注更新时间或事实源口径。
- [ ] `pnpm docs:build` 或等效文档站构建检查通过。
- [ ] 归档前已处理 openspec/project-docs.md 回写。

## 约束与假设

- [ASSUMPTION] 中文正文优先完成；英文 `/en/learn/` 可在本 change 中保持简要占位或补充对应链接说明，不要求同步完整翻译。
- [ASSUMPTION] 参考资料以 `/Users/fengliang/Documents/obsidian-note/AI项目文档/ai-engineer` 下课程材料为主，但公开正文不得暴露本地绝对路径。
- [ASSUMPTION] `tools-and-models` 涉及 Codex、Claude、Gemini、GLM 等动态信息，实施时必须再次核对官方文档或官方说明。
- [DOC-GAP] 当前 `openspec/project-docs.md` 仍是空基线，归档前需要至少回写本 change 涉及的学习路径栏目、页面清单、阅读路径和后续缺口。
- [SITE-CONFIG-IMPACT] 若使用 `@lobehub/icons` 包生成图标 URL或封装图标组件，需要检查 `package.json`、VuePress 构建和客户端兼容性；若使用 LobeHub 静态 CDN/SVG URL，需要检查链接有效性和暗色模式表现。
