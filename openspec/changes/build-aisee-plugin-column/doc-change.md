# Doc Change: build-aisee-plugin-column

## Baseline Reference

- 文档基线：`openspec/project-docs.md`
- 基线文件状态：已存在
- 涉及栏目：AISEE、AI Engineering
- 涉及页面：`/aisee/`、`/aisee/aisee-plugin/`、`/en/aisee/`、`/en/aisee/aisee-plugin/`
- 涉及导航/侧边栏：是
- 涉及站点配置：否

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| AISEE Plugin 入口 | 公开入口为 `/aisee/workflows/` | 命名更像“流程页”，不能准确表达这是 `AISEE Plugin` 子栏目。 |
| `site/aisee/workflows/README.md` | 仅有简短占位说明 | 尚未覆盖 Aisee Plugin 的职责边界、schema pack、context pack、team knowledge、verify/archive guard。 |
| AISEE 侧边栏 | 只有 `AISEE Plugin` 单入口 | 缺少子页，读者无法按主题深入阅读。 |
| AI Engineering 内链 | 多处指向 `/aisee/workflows/` | 需要与新的 `aisee-plugin` 路由保持一致。 |
| 英文入口 | `/en/aisee/workflows/` 为占位页 | 路由与中文主入口不一致，且仍沿用 workflow 命名。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 新增 | AISEE Plugin 总览 | `site/aisee/aisee-plugin/README.md` | 作为栏目总览，解释插件定位、边界、阅读顺序与核心链路。 |
| 新增 | 从意图到 change | `site/aisee/aisee-plugin/from-intent-to-change.md` | 覆盖 SRS、UI Content、Architecture、Change Plan、Change Author。 |
| 新增 | Schema Packs 与 Authoring | `site/aisee/aisee-plugin/schema-packs-and-authoring.md` | 解释 schema 选择、artifact DAG、文档站 schema 与 authoring 边界。 |
| 新增 | Context Packs 与 Contracts | `site/aisee/aisee-plugin/context-packs-and-contracts.md` | 解释 Aisee CLI、context pack、只读 contract 服务与跨仓库消费模式。 |
| 新增 | Team Knowledge Guardrails | `site/aisee/aisee-plugin/team-knowledge-guardrails.md` | 解释 reflect、curate、query、pack/card 边界与常见误用。 |
| 新增 | Verify 与 Archive Guard | `site/aisee/aisee-plugin/verify-and-archive-guard.md` | 解释 verify、archive-check、证据闭环与 accepted risk。 |
| 新增 | 英文占位入口 | `site/en/aisee/aisee-plugin/README.md` | 与中文新路由一致，保留稳定英文入口。 |
| 修改 | AISEE 栏目首页 | `site/aisee/README.md`、`site/en/aisee/README.md` | 更新入口文案与内链到 `/aisee/aisee-plugin/`。 |
| 修改 | 导航与侧边栏 | `site/.vuepress/navbar.ts`、`site/.vuepress/collections/aisee.ts` | AISEE Plugin 入口改为新路由，并补齐子页导航。 |
| 修改 | 相关方法论内链 | `site/ai-engineering/*.md`、必要英文入口页 | 清理旧 `/aisee/workflows/` 路由引用。 |
| 修改 | 文档基线 | `openspec/project-docs.md` | 回写 AISEE Plugin 路由、栏目说明和阅读路径。 |
| 删除 | 旧公开入口文件 | `site/aisee/workflows/README.md`、`site/en/aisee/workflows/README.md` | 移除旧 workflow 路由占位页。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/aisee/aisee-plugin/` | 想理解 AISEE Plugin 在整条工程链路里承担什么角色的读者 | 插件定位、与 OpenSpec/Compound 的边界、阅读顺序、核心链路 | “不替代 OpenSpec”“不把 CLI JSON 当第二事实源”“推荐阅读顺序” | 复制完整命令大全或外部仓库版本日志 |
| `/aisee/aisee-plugin/from-intent-to-change/` | 想把模糊想法收束成 OpenSpec change 的读者 | 前置澄清、change planning、authoring 顺序 | SRS/UI/Architecture -> change-plan -> change-author | 直接写成通用产品需求模板 |
| `/aisee/aisee-plugin/schema-packs-and-authoring/` | 想选 schema、补 artifacts 的读者 | schema 选择、artifact DAG、Required/N/A 边界 | `aisee-docsite-driven`、`app`、`quick-fix` 的使用边界 | 把每个 schema 都写成一样重的流程 |
| `/aisee/aisee-plugin/context-packs-and-contracts/` | 想让实现或跨仓库协作更稳的读者 | CLI context pack、contract 服务、最小读取模式 | “context pack 是读取入口，不是新文档” | 把 contract serve 写成 mock backend |
| `/aisee/aisee-plugin/team-knowledge-guardrails/` | 想复用跨项目经验的读者 | query、reflect、curate、promote-batch 边界 | “不自动写入 team knowledge”“不整库复制 docs/solutions” | 宣称当前功能已完全稳定 |
| `/aisee/aisee-plugin/verify-and-archive-guard/` | 想确认 change 何时可归档的读者 | verify、archive guard、证据闭环、accepted risk | validate、evidence、review/test/manual checks | 把 archive guard 写成形式步骤 |

## Site Impact

- 导航：AISEE 顶栏二级菜单中的 `AISEE Plugin` 改为 `/aisee/aisee-plugin/` 与 `/en/aisee/aisee-plugin/`。
- 侧边栏：AISEE 中文侧边栏在 `AISEE Plugin` 分组下增加专题子页；英文侧边栏入口同步到新路由。
- 路由：弃用公开 `/aisee/workflows/` 和 `/en/aisee/workflows/`，统一改为 `/aisee/aisee-plugin/` 和 `/en/aisee/aisee-plugin/`。
- frontmatter：新增页面补齐 `title`、`permalink`、`createTime`，栏目首页补页面级 `description`。
- 标签/分类：N/A
- 搜索影响：新页面进入 AISEE collection，本地搜索索引新增 Aisee Plugin 专题内容。
- 多语言影响：中文补完整正文；英文保持稳定入口页与基础说明。
- 构建/部署影响：仅文档内容与内链调整，需验证不存在旧路由 stale link。

## Validation

- [x] 页面路径可访问。
- [x] 导航/侧边栏入口正确。
- [x] 内链有效。
- [x] 代码块、命令或示例已检查。
- [x] 文档站构建或预览检查通过。
- [ ] 需要时已截图或人工预览。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新。
- [x] 栏目结构已更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A，本 change 直接改变了公开路由与栏目基线。
