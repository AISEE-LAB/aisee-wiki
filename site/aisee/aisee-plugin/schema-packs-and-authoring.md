---
title: Schema Packs 与 Authoring
permalink: /aisee/aisee-plugin/schema-packs-and-authoring/
createTime: 2026/06/08 12:30:00
---

# Schema Packs 与 Authoring

Schema pack 定义 OpenSpec change 内需要生成哪些 artifacts、它们的依赖顺序、模板和 authoring 规则。它不替代 OpenSpec，也不保存项目事实；项目事实仍来自 OpenSpec specs、change artifacts、`source-map.md`、`tasks.md` 和 Aisee registry。

## Schema pack 的职责

| 职责 | 说明 |
|---|---|
| 定义 artifact DAG | 说明 change 内 artifacts 的生成顺序和依赖关系。 |
| 提供模板 | 为 proposal、source-map、tasks 或其他 artifact 提供初始结构。 |
| 约束 authoring | 说明每类 artifact 应写什么、不应写什么。 |
| 支持校验 | 配合 OpenSpec validate 和 Aisee check 命令检查 change 是否完整。 |

Schema pack 是工作流结构，不是业务需求。业务行为、接口、数据和验证结论应写入对应 change artifact，而不是写入 schema 本身。

## Schema 选择

| Schema | 适用场景 | 说明 |
|---|---|---|
| `aisee-app-spec-driven` | App、小程序、Web、桌面软件、后端/API、CLI、异步任务、常规全栈开发 | 默认软件开发 schema，通过 `source-map.md` 管理 ID 和 artifact 适用性。 |
| `aisee-device-spec-driven` | MCU、RTOS、嵌入式 Linux、IoT、网关、驱动、量产和现场维护 | 硬件和嵌入式专用扩展，当前不作为 app 默认流程。 |
| `aisee-docsite-driven` | 文档站、产品文档、开发者文档 | 用于以文档变更为主要交付物的 change。 |
| `infra-change` | 部署、CI/CD、云资源、网络、运行环境 | 用于需要影响评估和回滚计划的基础设施变更。 |
| `security-audit` | 安全审计、威胁模型、安全修复规划 | 用于审计和安全设计，不替代安全测试报告。 |
| `quick-fix` | 小型、边界清晰、风险低的修复 | 避免为小修复生成过重 artifacts。 |
| `quick-research` | 技术调研、方案比较、建议结论 | 用于研究和决策输入，不直接作为实现任务清单。 |
| `opsx-collab-pr-loop` | 协作、PR loop、外部审查或交接 | 用于协作过程管理，不替代具体业务 schema。 |

选择 schema 时，应以交付物和风险面为依据。新软件功能通常选择 `aisee-app-spec-driven`；文档站变更选择 `aisee-docsite-driven`；低风险小修复选择 `quick-fix`；技术调研选择 `quick-research`。

## App schema authoring

`aisee-app-spec-driven` 的最小闭环是：

```text
proposal.md
  -> source-map.md
  -> specs/**/*.md
  -> tasks.md
```

按需 artifacts 由 `source-map.md` 和变更范围决定：

```text
source-map.md + specs/**/*.md
  ├─ change-context.md
  ├─ ui-contract.md
  ├─ service-contract.md
  └─ data-model.md
```

这些 artifacts 不是每个 change 都必须展开。`source-map.md` 的 Artifact 适用性表需要声明 Required=yes/no；Required=no 时必须写明不适用原因。

## Artifact 边界

| Artifact | 写什么 | 不写什么 |
|---|---|---|
| `proposal.md` | 目标、非目标、成功标准、读取顺序。 | 接口字段、数据库字段、任务步骤。 |
| `source-map.md` | ID 路由、来源、artifact 适用性、候选影响路径、预期证据类型。 | 具体实现步骤或最终验证结论。 |
| `specs/**/*.md` | 用户可观察行为和验收场景。 | UI 布局、API 字段、表字段、代码路径。 |
| `change-context.md` | 本 change 承接的架构约束、局部决策和风险。 | 全局架构重写。 |
| `ui-contract.md` | 页面内容结构、交互状态、权限可见性、前端数据需求。 | 完整视觉规范、组件库、配色、像素布局。 |
| `service-contract.md` | API、后端能力、CLI/job/integration 契约、provider/consumer、机器可读附件路径。 | 脱离 specs/source-map 自造字段。 |
| `data-model.md` | 实体、字段、关系、索引、迁移和兼容策略。 | 业务需求全文或 API 响应结构。 |
| `tasks.md` | 实现任务、验证任务、证据命令或证据路径。 | 需求、契约、ID 注册、归档判断。 |

## ID 与 source-map

正式 ID 应来自：

```text
aisee/registry/id-registry.json
```

工具不可用时只能使用临时占位符：

```text
{{scope}}:<TYPE>-NEW-001 [ID-RESERVATION-REQUIRED]
```

`source-map.md` 负责连接上游文档、OpenSpec artifacts、tasks、代码路径、测试路径和 evidence。它负责追踪，不负责重写完整需求、页面流程、接口细节或数据库模型。

## 常用命令

```bash
aisee schemas list --json
aisee schemas check --json --fail-on-blocker
aisee schemas install --all --json
aisee schemas install --schema aisee-app-spec-driven --json
```

创建 change 时应显式选择适用 schema：

```bash
/opsx:new add-login-session --schema aisee-app-spec-driven
/opsx:new fix-login-copy --schema quick-fix
```

## 文档站示例

本站的 `AISEE Plugin` 栏目使用 `aisee-docsite-driven` schema。该 schema 围绕文档差异组织 artifacts：

```text
proposal.md
  -> doc-change.md
  -> tasks.md
```

本次栏目变更涉及：

- 保留顶层 `/aisee/`；
- 将子入口从 `/aisee/workflows/` 改为 `/aisee/aisee-plugin/`；
- 新增多个 `AISEE Plugin` 专题页；
- 更新导航、侧边栏、内链和 `openspec/project-docs.md`。

这类文档站 change 不需要展开 app schema 下的 UI contract、service contract 或 data model。
