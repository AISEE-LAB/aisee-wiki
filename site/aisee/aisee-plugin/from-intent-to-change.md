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

## 前置输入

| 输入 | 作用 | 边界 |
|---|---|---|
| SRS | 记录业务目标、范围、功能需求、非功能需求和验收标准。 | 不写实现任务，不替代 change artifacts。 |
| UI Content | 描述页面内容、状态、操作、权限可见性和前端数据需求。 | 不写组件库、配色、排版或视觉规范。 |
| Design Spec / Assets | 在存在视觉设计需要时记录视觉规范、参考图或素材输入。 | 不重复页面内容。 |
| Architecture | 记录技术事实、架构边界、平台约束、共享约定和风险。 | 不作为当前 change 的完整设计文档。 |

这些输入用于支持 change planning。需要长期保留的系统行为仍应进入 OpenSpec baseline 或已归档 change。

## Change Planning

`aisee:change-plan` 将已确认输入拆成可独立交付的 OpenSpec changes。输出通常包括：

- change 列表；
- 依赖顺序；
- schema 建议；
- source-map seed。

拆分时应以可验证结果为边界。输入材料章节、技术层、页面类型、schema artifact 或任务阶段都不应直接作为 change 边界。

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

## 停止条件

以下情况应先回到前置输入或 change 规划，而不是继续进入实现：

| 情况 | 处理 |
|---|---|
| 目标、范围或非目标无法说明 | 补充 SRS 或 proposal 输入。 |
| UI 内容与技术约束不一致 | 回到 UI Content 或 Architecture 澄清。 |
| 一个 change 覆盖多个独立结果 | 重新拆分 change。 |
| contract 是否适用无法判断 | 在 source-map 或对应 contract artifact 中明确 Required 状态。 |
| 实现中发现 spec、contract、代码不一致 | 先回写当前 OpenSpec change，再继续实现。 |

## 文档站场景

文档站变更通常使用 `aisee-docsite-driven` schema。最小闭环是：

```text
proposal.md
  -> doc-change.md
  -> tasks.md
  -> 内容修改 / 导航调整 / 构建验证
```

这个 schema 关注页面差异、站点结构影响、内链和构建验证，不要求生成 app schema 下的 UI contract、service contract 或 data model。
