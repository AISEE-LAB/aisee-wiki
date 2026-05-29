# AGENTS.md

> 最后更新：2026-05-29
> 项目上下文：见 `openspec/project.md`
> 本文件是项目级规则，适用于 Codex、Claude、Cursor 等 AI coding agents。

## 指令优先级

- 若存在多层 `AGENTS.md`，更靠近当前目录的文件优先生效。
- 用户当前消息和系统/开发者消息优先级高于本文件。
- 本文件不替代 `openspec/changes/<feature>/` 下的 artifacts；实现、修复或审查时必须以对应 change 为准。

## 单一事实来源

本项目以 `openspec/` 为唯一真实规范。
`openspec/changes/<feature>/` 下的 artifacts 具有规范效力。
对话历史、PR 评论、Slack/IM 讨论和个人笔记只能作为参考，不能覆盖 spec。

核心 artifacts：

- `proposal.md`：为什么做、做什么、成功标准、不在范围内事项。
- `specs/`：需求场景、边界条件、验收标准。
- `design.md`：技术方案、架构决策、接口定义、数据流。
- `tasks.md`：实现清单、状态追踪、依赖关系。

对于自定义 schema，artifact 名称和顺序可能不同；仍以 `openspec status`、`openspec instructions` 和 change 目录中的实际文件为准。

## 上下文加载顺序

开始实现、修复或审查 OpenSpec change 时按顺序读取：

1. `openspec/project.md`：项目上下文、技术栈、开发命令。
2. `openspec/changes/<feature>/proposal.md`：为什么做、做什么。
3. `openspec/changes/<feature>/specs/`：需求场景、边界条件、验收标准；若该 schema 不包含此目录，则以实际 artifacts 为准。
4. `openspec/changes/<feature>/design.md`：技术方案和架构决策；若不存在，则读取 schema 指定的等价 artifact。
5. `openspec/changes/<feature>/tasks.md`：实现清单和验证要求。
6. `.memory/rules.md` 与 `.memory/index.md`：先读规则和索引，再只加载相关记忆条目。
7. `docs/reflect/`：会话复盘和 memory 候选区；只有用户明确要求提升时，才按 `.memory/rules.md` 写入 `.memory/`。

若找不到对应 change，先说明 `[SPEC-GAP]`，不要直接实现新范围。

开始需求规划或 change 拆分时，按需读取：

- `docs/requirements/`：SRS 与 FR 来源。
- `docs/ui-content/`：页面内容、元素、状态和交互来源。
- `docs/tech-context/`：技术事实、项目约束、共享前置和风险来源。
- `docs/split/`：已生成的 change 拆分结果。

这些规划文档用于生成或补齐 OpenSpec artifacts，不能替代 `openspec/changes/<feature>/`。

## Spec First 约束

1. 实现、计划或建议前，先读取相关 `proposal.md`、`specs/`、`design.md`、`tasks.md` 或当前 schema 的等价 artifacts。
2. 只做补充增强：风险、边界 case、性能策略、测试方案、代码结构细节。
3. 不静默绕过、修改或忽略已有 spec。
4. 输出涉及 spec 时必须引用具体路径和章节。

### 冲突标记

| 标记 | 含义 | 处理 |
|---|---|---|
| `[SPEC-CHANGE-REQUIRED]` | 建议与现有 spec 冲突 | 暂停，实现前走 spec 修改流程 |
| `[SPEC-GAP]` | spec 缺少必要决策 | 补齐 spec 后继续 |
| `[RISK]` | 识别到实现风险 | 在 `tasks.md` 增加缓解措施 |

## OpenSpec 状态机

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

涉及开源插件命令时，遵循对应插件自身文档；本文件规定项目级 OpenSpec 状态机和 spec-first 约束。

## 上下文检查点

开始以下阶段前，应重新附最新 artifacts：

- 需求澄清
- 技术方案
- 实现
- 代码审查

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
- `docs/solutions/`：已解决问题与可复用实践知识库，按 category 组织并使用 YAML frontmatter（`module`、`tags`、`problem_type`）；适合在处理已记录领域的实现、调试或文档决策时检索。

每个 learning 至少包含：Pattern、Gotcha、Decision Log、Future Work。

## 执行约束

- 默认先读后写，修改前读取目标文件。
- 使用最小必要工具集；可并行读取时合并并行读取。
- 不回滚用户已有改动，除非用户明确要求。
- 不在项目外修改系统状态，除非用户明确要求。
- 不安装全局依赖，除非用户明确要求。
- 修改后运行与变更相关的最小验证命令。
- 若涉及 OpenAI / Codex / Claude / 第三方库配置，先查当前官方文档或项目内文档。

## 沙箱和网络

- 遵守当前 agent sandbox、approval policy 和网络策略。
- 网络仅用于任务必要的依赖安装、官方文档核对或 spec 明确允许的 API。
- 高风险命令必须先解释影响，再请求确认。

## Hook 配置

- Codex hooks：`.codex/hooks.json`
- Codex 配置：`.codex/config.toml`
- Claude Code hooks：`.claude/settings.json`
- 共享 hook 脚本：`.aisee/hooks/`

项目级 hooks 首次运行前可能需要在对应 agent 中信任。
若 hook 输出与本文件规则冲突，以本文件和 OpenSpec artifacts 为准。

## 输出要求

- 所有回复使用中文。
- 总结包含：改动文件、验证命令、未完成事项或风险。
- 涉及 spec 的输出必须引用具体路径。
