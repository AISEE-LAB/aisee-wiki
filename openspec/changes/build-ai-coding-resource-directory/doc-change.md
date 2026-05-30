# Doc Change: build-ai-coding-resource-directory

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：资源中心
- 涉及页面：`/resources/`、`/resources/ai-coding-resources/`
- 涉及导航/侧边栏：是
- 涉及站点配置：是

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| 资源中心首页 | `/resources/` 说明资源中心集中放置模板、Schema Pack、命令速查、检查清单、示例仓库、术语表和参考资料入口。 | 页面仍以“待补齐”为主，缺少可直接使用的 AI Coding 资源入口。 |
| 资源中心侧边栏 | `site/.vuepress/collections/resources.ts` 只列出首页、术语表和阅读路径。 | 新增资源目录后需要加入侧边栏，否则读者只能通过正文链接进入。 |
| AI Coding 生态资源 | 维护者提供 GitHub stars Excel，包含 259 个公开 star 仓库。 | 候选混有 AI Coding、Skill、Agent、MCP、设计、内容生成、通用工具和非相关仓库，需要筛选分类后再公开展示。 |
| 资源展示形态 | 现有资源页主要是 Markdown 文本。 | 多分类资源目录如果只用长表格，可读性和移动端体验较差，需要结构化卡片组件。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 新增 | AI Coding 资源目录 | `site/resources/ai-coding-resources.md` | 新增中文资源页，说明收录标准、分类、使用方式、精选资源和暂不收录类型。 |
| 新增 | 资源展示组件 | `site/.vuepress/theme/components/AiCodingResourceBoard.vue` | 用卡片分组呈现资源，包含名称、分类、推荐标签、说明、GitHub 链接和官网链接。 |
| 修改 | 客户端组件注册 | `site/.vuepress/client.ts` | 注册 `AiCodingResourceBoard`，供 Markdown 页面使用。 |
| 修改 | 资源中心首页 | `site/resources/README.md` | 增加 AI Coding 资源目录入口，并减少“全部待补”的占位语气。 |
| 修改 | 资源中心侧边栏 | `site/.vuepress/collections/resources.ts` | 将 `ai-coding-resources` 加入中文资源中心侧边栏。 |
| 迁移 | N/A | N/A | 本 change 不迁移已有页面。 |
| 归档 | N/A | N/A | 本 change 不归档已有页面。 |
| 删除 | N/A | N/A | 本 change 不删除已有页面。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/resources/ai-coding-resources/` | 想了解 AI Coding 开源生态、选择 Agent/Skill/MCP/设计辅助工具的学习者和维护者。 | 从 GitHub stars 中筛选 AI Coding 相关仓库，按方法论、Coding Agent、Skill、MCP/Tool、代码上下文、UI/UX 与设计、学习资料分类。 | 收录标准；资源分类说明；精选资源卡片；GitHub 和官网链接；`ui-ux-pro-max-skill` 等容易遗漏的 UI/UX Skill；暂不收录类型；更新口径。 | 实时排行；价格/额度；安装教程；账号共享/中转/key 自动化；泄露 prompt；生图/视频/PPT prompt 大合集；非 AI Coding 的通用工具。 |
| `/resources/` | 从导航进入资源中心的读者。 | 资源中心入口更新为可进入 AI Coding 资源目录、术语表和阅读路径。 | 新增资源目录链接；保留后续资源类型待补说明。 | 不在首页复制完整资源清单。 |

## Site Impact

- 导航：不新增顶层导航，沿用已有“资源中心”导航。
- 侧边栏：中文资源中心侧边栏新增 `ai-coding-resources`；英文资源中心侧边栏暂不变。
- 路由：新增 `/resources/ai-coding-resources/`。
- frontmatter：新增页面包含 `title`、`permalink`、`createTime`。
- 标签/分类：不新增 Plume 标签体系；资源类别由组件内部数据表达。
- 搜索影响：新增 Markdown 正文可被 Plume 本地搜索索引；组件内资源标题也应以可见文本呈现。
- 多语言影响：本轮只新增中文资源页；英文 `/en/resources/` 保持现状。
- 构建/部署影响：新增 Vue SFC 组件但不新增依赖；需要运行 `pnpm docs:build` 验证。

## Validation

- [x] 页面路径可访问。
- [x] 导航/侧边栏入口正确。
- [x] 内链有效。
- [x] 代码块、命令或示例已检查。
- [x] 文档站构建或预览检查通过。
- [x] 需要时已截图或人工预览。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [ ] 页面清单已更新。
- [ ] 栏目结构已更新。
- [ ] 内容状态已更新。
- [ ] 后续缺口已更新。
- [ ] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A
