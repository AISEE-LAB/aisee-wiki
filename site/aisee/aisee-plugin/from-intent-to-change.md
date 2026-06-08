---
title: 从意图到 Change
permalink: /aisee/aisee-plugin/from-intent-to-change/
createTime: 2026/06/08 12:30:00
---

# 从意图到 Change

AISEE Plugin 的前置阶段用于把需求意图、页面内容和技术约束整理为 OpenSpec change authoring 的输入。它不直接替代 change artifacts，也不把 SRS、UI Content 或 Architecture 提升为 baseline。

## 目标

这个阶段要解决的是输入边界问题：在创建或补齐 OpenSpec change 之前，先明确本次工作要解决什么、影响哪些对象、需要哪些上下文、适合使用哪个 schema。

推荐顺序来自 Aisee Workflow 文档：

```text
aisee:srs
  -> aisee:ui-content（有 UI 时）
  -> aisee:design-spec / aisee:design-assets（有视觉设计需要时）
  -> aisee:architecture
  -> aisee:change-plan
  -> OpenSpec change
  -> aisee:change-author
```

这条顺序的核心不是增加文档数量，而是避免从一句需求直接进入实现。每一步只承担当前阶段需要的判断，并把需要长期保留的结论交给后续 OpenSpec artifact。

## 前置输入

| 输入 | 作用 | 边界 |
|---|---|---|
| SRS | 记录业务目标、范围、功能需求、非功能需求和验收标准。 | 不写实现任务，不替代 change artifacts。 |
| UI Content | 描述页面内容、状态、操作、权限可见性和前端数据需求。 | 不写组件库、配色、排版或视觉规范。 |
| Design Spec / Assets | 在存在视觉设计需要时记录视觉规范、参考图或素材输入。 | 不重复页面内容。 |
| Architecture | 记录技术事实、架构边界、平台约束、共享约定和风险。 | 不作为当前 change 的完整设计文档。 |

这些输入用于支持 change planning。需要长期保留的系统行为仍应进入 OpenSpec baseline 或已归档 change。

## 输入到 Change 的映射

前置输入进入 change planning 时，应先判断它们分别提供什么信息：

| 来源 | 进入 change planning 的信息 | 不应直接带入的内容 |
|---|---|---|
| SRS | 用户目标、范围、非目标、验收条件、风险约束。 | 完整需求原文、实现任务、组件拆分。 |
| UI Content | 页面、状态、操作、权限可见性、前端数据需求。 | 视觉风格、组件库选择、像素级布局。 |
| Design Spec / Assets | 已确认的视觉规范、参考图、素材和设计约束。 | 页面业务内容的重复描述。 |
| Architecture | 技术事实、平台约束、共享依赖、兼容要求和风险。 | 全局架构重写、未确认的新技术方向。 |

这些信息用于形成 change 候选和 source-map seed。候选 change 应能独立 validate、实现、验证和 archive；不能只按文档章节或技术层拆分。

## Change Planning

`aisee:change-plan` 将已确认输入拆成可独立交付的 OpenSpec changes。输出通常包括：

- change 列表；
- 依赖顺序；
- schema 建议；
- source-map seed。

拆分时应以可验证结果为边界。输入材料章节、技术层、页面类型、schema artifact 或任务阶段都不应直接作为 change 边界。

## Schema 判断

规划阶段应同时判断当前 change 需要哪个 schema：

| 场景 | 常见 schema | 判断依据 |
|---|---|---|
| 新功能、跨模块软件变更 | `aisee-app-spec-driven` | 需要 specs、tasks、source-map，且可能涉及 UI、service 或 data contract。 |
| 单点低风险修复 | `quick-fix` | 范围清楚，不改变公开契约或长期行为。 |
| 技术调研 | `quick-research` | 交付物是结论、比较或建议，不直接进入实现。 |
| 文档站变更 | `aisee-docsite-driven` | 交付物是页面、栏目、导航、内链或文档基线。 |
| 基础设施变更 | `infra-change` | 涉及部署、CI/CD、云资源、网络或回滚计划。 |
| 安全相关变更 | `security-audit` | 涉及威胁模型、安全审计或安全修复规划。 |

schema 判断不是形式选择。它决定后续 artifacts、检查项、evidence 类型和 archive 前需要闭合的内容。

## Change Authoring

创建 change 后，`aisee:change-author` 按目标 schema 的 artifact DAG 补齐文档。以 app schema 为例，常见 artifacts 包括：

```text
proposal.md
source-map.md
specs/**/*.md
tasks.md
change-context.md        # 按需
ui-contract.md           # 按需
service-contract.md      # 按需
data-model.md            # 按需
```

按需 artifact 是否展开，应由 `source-map.md` 或目标 schema 的规则决定。Required=yes 时补齐内容；Required=no 时写明不适用原因。

## Authoring 检查

进入实现前，应确认当前 change 已经 author 到可执行状态：

```bash
aisee change author-check <change> --json
openspec validate <change>
```

检查重点包括：

| 检查项 | 说明 |
|---|---|
| artifact 完整性 | 目标 schema 要求的 artifacts 是否存在，按需 artifacts 是否有 Required / N/A 判断。 |
| change 边界 | proposal、specs、tasks 是否指向同一个可验证结果。 |
| source-map | 上游输入、ID、候选路径、测试路径和 evidence 类型是否能追踪。 |
| contract 适用性 | ui、service、data 或其他 contract 是否应该展开，N/A 是否有具体原因。 |
| validate | OpenSpec 结构检查是否通过。 |

`author-check` 和 `validate` 不能替代人工判断，但能暴露缺失 artifact、断链和 schema 选择错误。

## 停止条件

以下情况应先回到前置输入或 change 规划，而不是继续进入实现：

| 情况 | 处理 |
|---|---|
| 目标、范围或非目标无法说明 | 补充 SRS 或 proposal 输入。 |
| UI 内容与技术约束不一致 | 回到 UI Content 或 Architecture 澄清。 |
| 一个 change 覆盖多个独立结果 | 重新拆分 change。 |
| contract 是否适用无法判断 | 在 source-map 或对应 contract artifact 中明确 Required 状态。 |
| 实现中发现 spec、contract、代码不一致 | 先回写当前 OpenSpec change，再继续实现。 |

## 实现交接

当 change 已 authored 且无 blocker 后，才适合生成实现上下文：

```bash
aisee context pack --change <change> --for ce-work --json
```

如果 context pack 仍输出 blocker，应回到当前 change artifact 修复，而不是让实现阶段自行补全需求。实现交接只应包含当前 change 的必读 artifacts、允许修改路径、验证命令、apply tracks 回写位置和 evidence 入口。

## 文档站场景

文档站变更通常使用 `aisee-docsite-driven` schema。最小闭环是：

```text
proposal.md
  -> doc-change.md
  -> tasks.md
  -> 内容修改 / 导航调整 / 构建验证
```

这个 schema 关注页面差异、站点结构影响、内链和构建验证，不要求生成 app schema 下的 UI contract、service contract 或 data model。

以本站栏目变更为例，前置输入不需要展开完整产品需求；更重要的是确认公开路由、侧边栏结构、导航入口、正文范围、内链迁移和构建验证。这些内容应进入 `doc-change.md` 和 `tasks.md`，而不是复制成 app schema 的 contract。
