# Proposal: build-ai-coding-resource-directory

## 背景与问题

- 当前问题：`/resources/` 仍是占位入口，只列出术语表、阅读路径和若干待补资源类型，缺少可直接帮助读者发现 AI Coding 工具、Agent、Skill、MCP 和方法论仓库的资源目录。
- 触发原因：维护者提供了 GitHub stars 导出的 Excel，其中包含 259 个公开 star 仓库；这些仓库里既有 AI Coding 相关资源，也有生图、视频、通用前端、代理、笔记等非本站核心范围内容，需要筛选、分类、改写后进入资源中心。
- 关联基线：openspec/project-docs.md

## 目标

- 在中文资源中心新增一篇 AI Coding 资源目录页，基于维护者 GitHub stars 中的公开仓库，筛选与 AI Coding、Agent 工程化、Skill、MCP、Spec-driven、UI/UX Skill 和代码上下文相关的资源。
- 为资源目录提供结构化展示组件，支持按资源类别阅读，并为每个资源提供 GitHub 链接、官网链接、用途摘要和推荐标签。
- 更新 `/resources/` 入口和资源中心侧边栏，使读者能从资源中心稳定进入该目录。
- 明确收录标准、暂不收录类型和更新口径，避免把资源目录写成实时排行榜、无差别 awesome list 或未经核对的安装指南。

## 不在范围

- 不为所有 259 个 star 仓库建立完整数据库或逐仓库长评测。
- 不整理价格、额度、账号、安装命令、镜像源、中转服务或可能快速变化的配置。
- 不收录明显偏离 AI Coding 的生图/视频/PPT prompt 集、通用 SaaS 模板、普通终端工具、代理/账号共享/key 自动化、泄露 system prompt 等资源。
- 不在本轮补英文完整资源页；英文资源入口可保持现状。
- 不新增后端、数据库、远程数据同步或运行时 GitHub API 拉取能力。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | `/resources/` | 将资源中心从占位入口扩展为包含 AI Coding 资源目录的可用资源入口。 |
| 页面 | `site/resources/ai-coding-resources.md` | 新增中文资源目录正文，说明收录标准、分类、使用方式和暂不收录原因。 |
| 导航/侧边栏 | `site/resources/README.md`、`site/.vuepress/collections/resources.ts` | 在资源首页和侧边栏加入 AI Coding 资源目录入口。 |
| 路由/frontmatter | `/resources/ai-coding-resources/` | 新增稳定 permalink，保持 VuePress/Plume doc collection 路由一致。 |
| 站点配置 | `site/.vuepress/client.ts`、`site/.vuepress/theme/components/` | 注册并新增资源展示组件；不新增外部依赖。 |

## 成功标准

- [ ] 目标页面或栏目内容已补齐，资源目录包含 AI Coding 相关精选仓库，并明确分类和收录标准。
- [ ] 涉及的导航、侧边栏或路由入口正确，`/resources/` 可进入 `/resources/ai-coding-resources/`。
- [ ] 相关链接和引用已检查，外链仅指向公开 GitHub 仓库、官网或公开文档，不引用本地绝对路径。
- [ ] 文档站构建或预览检查通过。
- [ ] 归档前已处理 openspec/project-docs.md 回写。

## 约束与假设

- [ASSUMPTION] Excel 中的 GitHub stars 只作为维护者兴趣来源和候选池，最终正文以公开 GitHub 元数据和人工筛选后的工程相关性为准。
- [ASSUMPTION] 资源目录优先服务 AI SEE Wiki 读者理解 AI Coding 生态，不追求穷尽收录或按 star 数排名。
- [DOC-GAP] 资源中心尚缺模板、Schema Pack、命令速查和检查清单；本 change 只补 AI Coding 资源目录，不替代后续资源建设。
- [SITE-CONFIG-IMPACT] 新增组件必须沿用当前 VuePress/Plume 组件注册方式，移动端可读，构建通过，不引入额外运行时依赖。
