# Doc Change: transform-thinking-to-ai-engineering-column

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：AI Engineering
- 涉及页面：`/ai-engineering/`、`/en/ai-engineering/`、旧 `/thinking/`、旧 `/en/thinking/`
- 涉及导航/侧边栏：是
- 涉及站点配置：是

## Current Gap

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| `thinking` 栏目 | `site/thinking/README.md` 只是“观点文章”占位入口。 | 栏目名像博客或随笔，无法承载 AI Engineering 方法论基础。 |
| collection 类型 | `thinkingCollection` 是 `type: 'post'`，带 tags、archives、categories。 | 与“不再放博客”的新方向冲突。 |
| 首页内容地图 | 首页有 AI Engineering 方法框架，但栏目结构没有对应基础栏目。 | 读者看不到传统软件工程与 AI 增强软件工程的差异说明。 |
| 方法论承接 | OpenSpec、Compound、AISEE 已有具体机制文章。 | 缺少解释三者为什么存在的上层文章。 |
| 英文入口 | `/en/thinking/` 是英文 Thinking 占位。 | 需要改成 AI Engineering 稳定入口。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 新增 | AI Engineering 栏目首页 | `site/ai-engineering/README.md` | 建立栏目定位、核心问题、三条主线和阅读顺序。 |
| 新增 | 传统软件工程和 AI 增强软件工程有什么不同 | `site/ai-engineering/traditional-vs-ai-engineering.md` | 对比任务分工、上下文、交付物、验证和团队协作。 |
| 新增 | AI 没有改变什么 | `site/ai-engineering/what-does-not-change.md` | 说明需求、设计、测试、评审、架构判断仍然重要，而且更重要。 |
| 新增 | 从 Prompt 到 Spec | `site/ai-engineering/prompt-to-spec.md` | 解释聊天记录不能成为工程事实源，承接 OpenSpec。 |
| 新增 | 从 Tool 到 Harness | `site/ai-engineering/tool-to-harness.md` | 解释 Agent、Tool、MCP、Skill、Hook 为什么要放进有边界的执行环境。 |
| 新增 | 从经验到复利 | `site/ai-engineering/experience-to-compounding.md` | 解释知识沉淀、review 复用、solution docs 和 Compound Engineering。 |
| 新增 | 工程师在 AI 时代的新职责 | `site/ai-engineering/engineer-role.md` | 说明工程师从单纯实现者转向目标定义、上下文组织、风险控制和结果审查。 |
| 新增 | 英文入口 | `site/en/ai-engineering/README.md` | 提供英文稳定入口，说明中文正文优先。 |
| 删除 | 旧中文 Thinking | `site/thinking/README.md` | 移除旧占位栏目。 |
| 删除 | 旧英文 Thinking | `site/en/thinking/README.md` | 移除旧占位栏目。 |
| 修改 | Collection 配置 | `site/.vuepress/collections/ai-engineering.ts`、`collections.ts` | 新增 doc collection，删除 post collection。 |
| 修改 | 信息架构与导航 | `site/.vuepress/ia.ts`、`navbar.ts` | `thinking` slug 改为 `ai-engineering`，导航顺序前置到 OpenSpec 前。 |
| 修改 | 首页 | `HomePage.vue` | 内容地图和推荐阅读路径加入 AI Engineering。 |
| 修改 | 基线 | `openspec/project-docs.md` | 回写栏目结构、页面清单、缺口、阅读路径和术语。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/ai-engineering/` | 第一次进入方法论栏目的人。 | AI Engineering 解决什么问题，以及为什么本站用 OpenSpec、Compound 和 AISEE 组织方法。 | 栏目定位、核心问题、三条主线、阅读顺序。 | 博客口吻、泛行业趋势。 |
| `/ai-engineering/traditional-vs-ai-engineering/` | 想理解 AI 时代软件工程变化的读者。 | 传统工程和 AI 增强工程的差异。 | 对比表、变化不是“AI 替人写代码”的结论。 | 贬低传统软件工程。 |
| `/ai-engineering/what-does-not-change/` | 担心 AI 会替代工程原则的人。 | AI 放大了需求、设计、测试、评审、架构判断的重要性。 | “没变”和“更重要”的分层说明。 | 工程原则大全。 |
| `/ai-engineering/prompt-to-spec/` | 已用 AI 协作但结果不稳定的人。 | 从 prompt 到 spec 的原因和收益。 | 聊天记录、项目事实源、OpenSpec 承接关系。 | OpenSpec 命令教程。 |
| `/ai-engineering/tool-to-harness/` | 想理解 Agent 工程化的人。 | 从单个工具到有边界 harness 的演进。 | Tool、MCP、Skill、Hook、权限和验证边界。 | Agent 框架教程。 |
| `/ai-engineering/experience-to-compounding/` | 团队维护者和技术负责人。 | 为什么经验沉淀才能形成工程复利。 | review、debug、solution docs、memory、skill、Compound 承接关系。 | 空泛复盘鸡汤。 |
| `/ai-engineering/engineer-role/` | 想判断个人能力变化的工程师。 | AI 时代工程师职责变化。 | 目标定义、上下文组织、验证、风险和知识沉淀。 | 职业焦虑或宏观预测。 |

## Site Impact

- 导航：顶栏改为 `学习路径 / AI Engineering / OpenSpec / Compound / AISEE / 推荐资源`。
- 侧边栏：AI Engineering 中文栏目使用 doc collection 分组；英文只保留 README。
- 路由：新增 `/ai-engineering/` 和 `/en/ai-engineering/`；旧 `/thinking/` 和 `/en/thinking/` 不再生成。
- 搜索影响：新增中文正文进入本地搜索；旧 Thinking 占位不再进入索引。
- 多语言影响：英文只提供入口，不写完整翻译。
- 构建影响：collection 类型从 post 改 doc，需要构建验证。

## Validation

- [x] `/ai-engineering/` 和 6 篇中文正文可构建。
- [x] `/en/ai-engineering/` 可构建。
- [x] 顶栏和首页入口指向新路由。
- [x] `site/` 下不再有 `thinking` 公开 Markdown 页面。
- [x] `pnpm docs:build` 通过；仍有 `@vueuse/core` 上游 Rolldown pure annotation 警告。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新。
- [x] 栏目结构已更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A
