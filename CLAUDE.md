# CLAUDE.md

> 本文件是项目级规则，优先级高于对话历史和个人偏好；不高于系统消息、开发者消息和用户当前明确指令。
> 最后更新：2026-05-22

## 单一事实来源

本项目以 `openspec/` 为唯一真实规范。
`openspec/changes/<feature>/` 下的 artifacts 具有规范效力。
对话历史、PR 评论、Slack/IM 讨论和个人笔记只能作为参考，不能覆盖 spec。

核心 artifacts：

- `proposal.md`：为什么做、做什么、成功标准、不在范围内事项。
- `specs/`：需求场景、边界条件、验收标准。
- `design.md`：技术方案、架构决策、接口定义、数据流。
- `tasks.md`：实现清单、状态追踪、依赖关系。

## 行为约束

### Spec First

1. 实现、计划或建议前，先读取相关 `proposal.md`、`specs/`、`design.md`、`tasks.md`。
2. 只做补充增强：风险、边界 case、性能策略、测试方案、代码结构细节。
3. 不静默绕过、修改或忽略已有 spec。
4. 输出必须引用具体 spec 路径和章节。

### 冲突标记

| 标记 | 含义 | 处理 |
|---|---|---|
| `[SPEC-CHANGE-REQUIRED]` | 建议与现有 spec 冲突 | 暂停，实现前走 spec 修改流程 |
| `[SPEC-GAP]` | spec 缺少必要决策 | 补齐 spec 后继续 |
| `[RISK]` | 识别到实现风险 | 在 `tasks.md` 增加缓解措施 |

## 工作流状态机

```text
aisee:srs
  ├─ aisee:ui-content
  ├─ aisee:tech-context
  └─ aisee:split
       └─ /opsx:new <change>
            └─ /opsx:continue      # proposal.md
            └─ aisee:change-design # design.md
            └─ /opsx:continue      # specs/ 与 tasks.md
            └─ /opsx:apply
            └─ /opsx:verify
            └─ /opsx:archive
```

约束：

- 规划材料不足：先补 `docs/requirements/`、`docs/ui-content/` 或 `docs/tech-context/`，不要直接进入实现。
- task 有误：暂停 → 更新 `tasks.md` → `/opsx:sync` → 继续。
- spec 有误：暂停 → 走 spec 修改流程 → `/opsx:sync` → 继续。
- 不跳过状态机步骤。
- 不带已知错误继续实现。
- 每个 change 必须以 archive 闭环。

## 上下文检查点

开始以下阶段前清空上下文并重新附最新 artifacts：

- 需求澄清
- 技术方案
- 实现
- 代码审查

涉及开源插件命令时，遵循对应插件自身文档；本文件只规定 OpenSpec 状态机和 spec-first 约束。

## 项目记忆

- 记忆规则：`.memory/rules.md`
- 项目索引：`.memory/index.md`

先读规则和索引，再只加载本任务相关条目。`.memory/` 是长期项目记忆的权威位置；`docs/reflect/` 是会话复盘和待确认候选区，不能替代 `.memory/`。

## 知识库

- `docs/requirements/`：`aisee:srs` 输出。
- `docs/ui-content/`：`aisee:ui-content` 输出，说明页面内容、元素、状态和交互，不含视觉设计规范。
- `docs/tech-context/`：`aisee:tech-context` 输出，说明技术事实、项目约束、共享前置和风险；不能替代 `openspec/project.md`。
- `docs/split/`：`aisee:split` 输出。
- `docs/reflect/`：会话反思、技能草案、memory 候选。
- `docs/learnings/`：团队知识库，命名 `<YYYY-MM-DD>-<feature>.md`。

每个 learning 至少包含：Pattern、Gotcha、Decision Log、Future Work。

## Hook 配置

- Claude Code hooks：`.claude/settings.json`
- 共享 hook 脚本：`.aisee/hooks/`

若 hook 输出与本文件规则冲突，以本文件和 OpenSpec artifacts 为准。
