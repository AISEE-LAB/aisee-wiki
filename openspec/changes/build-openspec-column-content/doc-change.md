# Doc Change: build-openspec-column-content

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：`/openspec/`、`/en/openspec/`
- 涉及页面：OpenSpec 中文栏目首页、OpenSpec 中文专题正文、英文 OpenSpec 占位入口
- 涉及导航/侧边栏：是
- 涉及站点配置：是

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| `/openspec/` | 只有栏目标题、极短定位、当前状态和下一步阅读链接 | 缺少 OpenSpec 的作用、能力模型、用法、扩展和边界说明，无法作为深度栏目入口。 |
| `site/.vuepress/collections/openspec.ts` | 中文 OpenSpec sidebar 仅包含 `README.md` | 无法承载分层阅读路径和多篇专题正文。 |
| `/en/openspec/` | 英文入口为占位页 | 本 change 不完成英文正文，但需要避免中文结构更新后英文入口产生误导。 |
| `openspec/project-docs.md` | 已记录 `/learn/` 栏目基线 | 未记录 OpenSpec 栏目结构、页面清单、内容状态和写作口径。 |
| 站内阅读路径 | `/learn/`、`/resources/reading-path/` 已把 OpenSpec 作为进阶入口 | 目前只能指向占位栏目，缺少可落地的 OpenSpec 深度页面。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 修改 | OpenSpec 栏目首页 | `site/openspec/README.md` | 从占位页改为栏目导览，说明定位、能力地图、分层阅读顺序和跨栏目边界。 |
| 新增 | OpenSpec 是什么 | `site/openspec/what-is-openspec.md` | 作用层：解释 AI 编程时代为什么需要规范层，以及 OpenSpec 解决的问题。 |
| 新增 | OpenSpec 心智模型 | `site/openspec/mental-model.md` | 模型层：解释 `openspec/specs/`、`openspec/changes/`、artifacts、archive 和事实源关系。 |
| 新增 | OpenSpec 基础工作流 | `site/openspec/workflow.md` | 用法层：说明从 propose 到 archive 的工作流、状态变化和审查节点。 |
| 新增 | Artifact 写法指南 | `site/openspec/artifact-guide.md` | 用法层：说明 proposal、spec、design、tasks 分别负责什么、如何写、常见错误。 |
| 新增 | Spec 粒度设计 | `site/openspec/spec-granularity.md` | 用法层：说明项目级、模块级、能力级 spec 的划分原则和边界。 |
| 新增 | Delta Spec 深度解析 | `site/openspec/delta-spec.md` | 用法层：说明 delta spec 与当前 spec 的关系、为何先描述变化再归档。 |
| 新增 | OpenSpec Schema 是什么 | `site/openspec/schema.md` | 扩展层：说明 schema 如何约束 artifacts、任务顺序和团队工作流。 |
| 新增 | OpenSpec 的适用边界 | `site/openspec/boundaries.md` | 边界层：说明什么时候适合使用 OpenSpec，什么时候不应滥用。 |
| 修改 | OpenSpec sidebar | `site/.vuepress/collections/openspec.ts` | 将中文 sidebar 改为“栏目首页 / 作用 / 模型 / 用法 / 扩展 / 边界”分组；英文 sidebar 保持最小入口。 |
| 修改 | 英文 OpenSpec 入口 | `site/en/openspec/README.md` | 保持占位状态，补充中文 OpenSpec 栏目已优先建设的说明和中文入口链接。 |
| 修改 | 站点阅读路径 | `site/resources/reading-path.md` | 将 OpenSpec 入口从栏目级占位升级为指向栏目首页和关键首篇文章。 |
| 修改 | 文档站基线 | `openspec/project-docs.md` | 归档前记录 OpenSpec 栏目结构、页面清单、阅读路径、内容状态和后续缺口。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/openspec/` | 从 `/learn/` 进入方法论阶段的读者 | OpenSpec 栏目导览和阅读分流 | 定位、能力地图、五层结构、建议阅读顺序、与 aisee/Compound/workflows 的边界 | 长篇完整教程、命令手册、SRS 到 Change 端到端链路 |
| `/openspec/what-is-openspec/` | 想知道为什么需要 OpenSpec 的开发者和团队维护者 | OpenSpec 的作用和问题背景 | 规范层、事实源、AI 协作失控风险、何时引入 OpenSpec、核心结论 | 具体 CLI 参数大全、Schema 细节 |
| `/openspec/mental-model/` | 已知道 OpenSpec 名称但不理解对象关系的读者 | OpenSpec 的文件和 artifact 心智模型 | `specs`、`changes`、`proposal`、`spec`、`design`、`tasks`、`archive` 的职责关系；推荐配图或 Mermaid | 实现某个具体项目的长案例 |
| `/openspec/workflow/` | 准备在项目里跑 OpenSpec change 的读者 | 从 propose 到 archive 的基础工作流 | change 生命周期、每阶段输入输出、验证节点、归档含义、可回退修正的说明 | aisee SRS 生产流程、Compound 专用命令细节 |
| `/openspec/artifact-guide/` | 需要写 OpenSpec artifacts 的作者 | 各 artifact 的写法和判断标准 | proposal/spec/design/tasks 的职责、内容结构、常见误区、审查清单 | 完整模板库下载、私有项目绝对路径 |
| `/openspec/spec-granularity/` | 需要拆分 spec 边界的维护者 | 如何决定 spec 粒度 | 项目级、模块级、能力级示例；过粗/过细风险；与并行 change 的关系 | 全站业务模块重新划分 |
| `/openspec/delta-spec/` | 对“为什么不直接改主 spec”困惑的读者 | Delta spec 的意义和归档关系 | 当前行为 vs 变更行为、ADDED/MODIFIED/REMOVED 语义、归档后的事实源更新 | OpenSpec 之外的产品变更管理方法大综述 |
| `/openspec/schema/` | 团队工作流维护者 | Schema 如何扩展 OpenSpec artifact 工作流 | schema 的作用、artifact DAG、模板、任务门禁、AI SEE Wiki 的 `aisee-docsite-driven` 示例 | 新建通用 schema pack 的完整实现教程 |
| `/openspec/boundaries/` | 准备推广 OpenSpec 的团队负责人 | OpenSpec 的适用边界和误用场景 | 适合场景、不适合场景、与需求访谈/代码质量/部署流程的边界、与 aisee/Compound/workflows 的关系 | 把 OpenSpec 包装成万能项目管理工具 |
| `/en/openspec/` | 英文读者 | 英文内容准备状态和稳定入口 | 说明中文内容优先建设、链接中文入口和英文资源入口 | 英文完整正文承诺 |

## Site Impact

- 导航：顶层导航继续使用既有 OpenSpec 入口，不新增顶层栏目。
- 侧边栏：中文 `openspecCollection.sidebar` 改为分组结构，建议顺序为“栏目首页 / 作用 / 模型 / 用法 / 扩展 / 边界”；英文 `openspecEnCollection.sidebar` 继续保持 `README.md`，除非实现时确认需要增加英文占位子页。
- 路由：中文页面采用平铺文件和短 slug，路径为 `/openspec/<slug>/`，不使用 `/openspec/usage/<slug>/` 等多级目录。
- frontmatter：新增和修改页面必须包含 `title`、`permalink`、`createTime`；标题使用中文短标题，避免侧边栏过长。
- 标签/分类：OpenSpec 栏目作为 doc collection，本 change 不新增标签或分类体系。
- 搜索影响：新增正文会进入站内搜索；标题和首段应包含稳定术语，便于搜索 OpenSpec、specs、changes、delta spec、schema 等关键词。
- 多语言影响：中文正文优先；英文 `/en/openspec/` 仅保持入口可用并说明英文正文待后续 change 完成。
- 构建/部署影响：预计只涉及 Markdown 和 collection 配置；必须运行 `pnpm docs:build` 或项目确认的等效构建检查。

## Validation

- [ ] 页面路径可访问。
- [ ] 导航/侧边栏入口正确。
- [ ] 内链有效。
- [ ] 代码块、命令或示例已检查。
- [ ] 文档站构建或预览检查通过。
- [ ] 需要时已截图或人工预览。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [ ] 页面清单已更新。
- [ ] 栏目结构已更新。
- [ ] 内容状态已更新。
- [ ] 后续缺口已更新。
- [ ] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A，本 change 会新增 OpenSpec 栏目结构和正文，归档前必须回写 `openspec/project-docs.md`。
