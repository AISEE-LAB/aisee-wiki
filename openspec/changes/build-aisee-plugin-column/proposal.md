# Proposal: build-aisee-plugin-column

## 背景与问题

- 当前问题：`/aisee/` 已明确为 AISEE 主线入口，但 `AISEE Plugin` 仍只有占位页，且当前路由写成 `/aisee/workflows/`，容易把插件本体误解为“某个 workflow 页面”而不是独立子栏目。
- 触发原因：维护者明确要求保留顶层 `/aisee/` 作为文档站栏目规范，同时将子入口从 `workflow` 改为 `aisee-plugin`，并基于 `/Users/fengliang/PycharmProjects/aisee-plugin` 仓库内容开始建设栏目正文。
- 关联基线：`openspec/project-docs.md`

## 目标

- 将 AISEE 二级入口统一为 `AISEE Plugin`，公开路由改为 `/aisee/aisee-plugin/` 与 `/en/aisee/aisee-plugin/`。
- 把当前占位页扩展为围绕 Aisee Plugin 的方法论与工作流栏目，覆盖职责边界、change authoring、schema pack、context pack、team knowledge、verify/archive guard 等核心主题。
- 修正文档站内所有指向旧 `/aisee/workflows/` 路由的公开链接，并同步导航、侧边栏与基线文档。

## 不在范围

- 不改动顶层 `/aisee/` 栏目定位。
- 不安装、升级或修改外部 `aisee-plugin` 仓库。
- 不在本 change 中补齐完整英文正文；英文只保持稳定入口和基础说明。
- 不把 OpenSpec 或 Compound Engineering 的现有正文迁移进 AISEE Plugin 栏目。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | AISEE / AISEE Plugin | 保留 `/aisee/`，建设 `/aisee/aisee-plugin/` 子栏目。 |
| 页面 | `site/aisee/`、`site/en/aisee/`、`site/ai-engineering/` | 更新入口说明、内链与新正文。 |
| 导航/侧边栏 | `site/.vuepress/navbar.ts`、`site/.vuepress/collections/aisee.ts` | AISEE Plugin 入口路由与侧边栏分组改为新路径。 |
| 路由/frontmatter | `/aisee/aisee-plugin/`、`/en/aisee/aisee-plugin/` | 统一公开 permalink，避免继续使用 `/aisee/workflows/`。 |
| 站点配置 | N/A | 不涉及主题配置或构建插件新增。 |

## 成功标准

- [ ] AISEE Plugin 栏目首页和专题正文已补齐，公开入口使用 `/aisee/aisee-plugin/`。
- [ ] 涉及的导航、侧边栏或路由入口正确。
- [ ] 相关链接和引用已检查。
- [ ] 文档站构建或预览检查通过。
- [ ] 归档前已处理 `openspec/project-docs.md` 回写。

## 约束与假设

- [ASSUMPTION] `AISEE Plugin` 栏目以外部 `aisee-plugin` 仓库的 README、workflow、schema pack、best practices、team knowledge、plugin marketplace 与 integration 文档为主要事实源。
- [DOC-GAP] 当前仓库尚无对应 `build-aisee-plugin-column` 内容基线，需要在本 change 中补齐栏目结构与正文范围说明。
- [SITE-CONFIG-IMPACT] 仅调整公开文档路由与内链，不新增站点插件或改动 Plume 全局配置。
