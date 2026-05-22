# AGENTS.md

> 最后更新：2026-05-22
> 工作流规则：见 `CLAUDE.md`
> 项目上下文：见 `openspec/project.md`

## Codex 指令加载

Codex 会在开始工作前读取 `AGENTS.md`。若存在多层 `AGENTS.md`，更靠近当前目录的文件优先生效；用户当前消息和系统消息优先级更高。

## 上下文加载顺序

开始实现、修复或审查 OpenSpec change 时按顺序读取：

1. `openspec/project.md`：项目上下文、技术栈、开发命令。
2. `openspec/changes/<feature>/proposal.md`：为什么做、做什么。
3. `openspec/changes/<feature>/specs/`：需求场景、边界条件、验收标准。
4. `openspec/changes/<feature>/design.md`：技术方案和架构决策。
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

## 共享工作流

OpenSpec 状态机、冲突标记、Compound / opsx 命令约束见 `CLAUDE.md`。这些规则同样适用于 Codex。

## Codex 专属执行约束

- 默认先读后写，修改前读取目标文件。
- 使用最小必要工具集；可并行读取时合并并行读取。
- 不回滚用户已有改动，除非用户明确要求。
- 不在项目外修改系统状态，除非用户明确要求。
- 不安装全局依赖，除非用户明确要求。
- 修改后运行与变更相关的最小验证命令。
- 若涉及 OpenAI / Codex / Claude / 第三方库配置，先查当前官方文档或项目内文档。

## 沙箱和网络

- 遵守当前 Codex sandbox、approval policy 和网络策略。
- 网络仅用于任务必要的依赖安装、官方文档核对或 spec 明确允许的 API。
- 高风险命令必须先解释影响，再请求确认。

## Hook 配置

- Codex hooks：`.codex/hooks.json`
- Codex 配置：`.codex/config.toml`
- 共享 hook 脚本：`.aisee/hooks/`

项目级 Codex hooks 首次运行前可能需要在 `/hooks` 中信任。

## 输出要求

- 所有回复使用中文。
- 总结包含：改动文件、验证命令、未完成事项或风险。
- 涉及 spec 的输出必须引用具体路径。
