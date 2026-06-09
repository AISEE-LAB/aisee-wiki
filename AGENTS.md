# AGENTS.md

> 最后更新：2026-06-09
> 本文件是项目级规则，适用于 Codex、Claude、Cursor 等 AI coding agents。

## 指令优先级

- 若存在多层 `AGENTS.md`，更靠近当前目录的文件优先生效。
- 用户当前消息和系统/开发者消息优先级高于本文件。

## 知识库

- `docs/requirements/`：历史需求来源。
- `docs/ui-content/`：页面内容、元素、状态和交互来源。
- `docs/tech-context/`：技术事实、项目约束、共享前置和风险来源。
- `docs/split/`：历史拆分或规划产物，如仍保留仅作参考。
- `docs/reflect/`：会话反思和待整理草案。
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
- 小范围站点改动默认可直接实现，不要求额外的仓库内 spec / memory 流程。
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

项目级 hooks 当前只保留敏感信息扫描类检查；首次运行前可能需要在对应 agent 中信任。

## 输出要求

- 所有回复使用中文。
- 总结包含：改动文件、验证命令、未完成事项或风险。
