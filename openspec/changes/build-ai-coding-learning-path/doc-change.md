# Doc Change: build-ai-coding-learning-path

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在，但内容仍是待填写模板
- 涉及栏目：`learn`
- 涉及页面：`/learn/`、`/learn/ai-coding-intro/`、`/learn/tools-and-models/`、`/learn/dev-environment/`、`/learn/codex-setup/`、`/learn/first-ai-coding-project/`、`/learn/agent-basics/`、`/learn/agent-memory/`、`/learn/skills/`、`/learn/mcp/`、`/learn/agent-tools/`、`/learn/hooks/`、`/learn/agent-components/`
- 涉及导航/侧边栏：是
- 涉及站点配置：是，取决于 `@lobehub/icons` 和自定义 Vue 组件实现方式

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站页面清单。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| `site/learn/README.md` | 存在，内容为简短建设中说明和栏目链接 | 未体现维护者确认的 AI Coding 入门路径，缺少文章清单、读者分流和实操导向。 |
| `site/.vuepress/collections/learn.ts` | 侧边栏仅包含 `README.md` | 新增学习路径正文后需要纳入侧边栏。 |
| `site/en/learn/README.md` | 英文占位页存在 | 中文优先策略下可暂不写完整英文，但需要避免中英入口产生死链。 |
| 工具与模型 logo | 当前学习路径没有 logo 展示机制 | 需要按 LobeHub Icons 说明使用 `@lobehub/icons` 或其静态资源能力获取 logo。 |
| 文章排版 | 当前学习路径未使用复杂排版 | 需要利用 Plume 组件能力表达路线、矩阵、步骤、提示和案例。 |
| Agent 进阶内容 | 当前学习路径没有解释 memory、skill、MCP、tool、hook 等 Agent 核心组成 | 需要新增进阶分组，逐篇解释概念，并用总览文章说明它们如何配合分工。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 修改 | 学习路径首页 | `site/learn/README.md` | 改写为 AI Coding 入门总览，包含学习目标、路线图、文章入口、进阶入口。 |
| 新增 | AI Coding 到底改变了什么 | `site/learn/ai-coding-intro.md` | 介绍 AI Coding 从补全、生成到 Agent 的发展，以及工程师角色变化和常见误区。 |
| 新增 | AI 编程工具与模型怎么选 | `site/learn/tools-and-models.md` | 对 Codex、Claude、Gemini、GLM 等工具/模型做定位、能力维度和选型矩阵说明，并展示 logo。 |
| 新增 | 给 AI 准备运行环境 | `site/learn/dev-environment.md` | 说明 Git、Node.js、Python、终端、编辑器、浏览器等基础环境对 AI Coding 的意义和验证清单。 |
| 新增 | Codex 安装、配置与第一次运行 | `site/learn/codex-setup.md` | 重点讲 Codex 桌面版/CLI/项目读取/权限/diff/第一次安全任务。 |
| 新增 | 第一个 AI Coding 项目：复刻一个网站 | `site/learn/first-ai-coding-project.md` | 引导读者选择参考站、拆模块、让 AI 分步实现、预览修复和提交成果。 |
| 新增 | Agent 是怎么工作的 | `site/learn/agent-basics.md` | 建立 Agent 基础心智模型，说明模型、上下文、工具、环境、约束如何组合。 |
| 新增 | Memory：让 Agent 带着上下文持续工作 | `site/learn/agent-memory.md` | 说明 Agent memory 的层次，重点区分全局记忆、项目记忆、项目规则和当前会话上下文。 |
| 新增 | Skill：把经验封装成可复用能力 | `site/learn/skills.md` | 说明 skill 的定位、适用场景、边界和与普通 prompt 的区别。 |
| 新增 | MCP：让 Agent 连接外部能力 | `site/learn/mcp.md` | 说明 MCP 如何让 Agent 连接浏览器、Figma、数据库、文档等外部系统。 |
| 新增 | Tool：Agent 真正执行动作的接口 | `site/learn/agent-tools.md` | 说明 tool 是 Agent 执行动作的接口，并区分工具调用、命令执行和外部服务访问。 |
| 新增 | Hook：在关键节点加上自动检查和约束 | `site/learn/hooks.md` | 说明 hook 在执行前后、提交前、验证前等生命周期节点中的检查和约束作用。 |
| 新增 | Agent 的核心组成：Memory、Skill、MCP、Tool、Hook 如何配合 | `site/learn/agent-components.md` | 以 Codex 智能体为例，总结 Memory、Skill、MCP、Tool、Hook 的职责边界和协作关系，作为 Agent 进阶收束文章。 |
| 修改 | 学习路径 collection | `site/.vuepress/collections/learn.ts` | 将新增中文文章加入 sidebar，保持 README 为栏目首页。 |
| 可能新增 | 工具/模型 logo 展示组件 | `site/.vuepress/components/` 或主题组件目录 | 如 Plume/Markdown 原生能力不足，可新增轻量 Vue 组件展示 logo 卡片、选择矩阵或工具对比。 |
| 可能新增 | 学习路径视觉组件或配图 | `site/.vuepress/components/`、`site/.vuepress/theme/` 或 `site/public/` | 如 Markdown 表达不足，可新增路线图、流程图、检查清单、项目步骤或文章配图，避免页面只有纯文字。 |
| 可能修改 | 项目依赖 | `package.json`、锁文件 | 如实现选择通过 `@lobehub/icons` 包生成静态图标 URL 或封装组件，需添加依赖并验证构建；若直接使用 LobeHub 静态 URL，则不新增依赖。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| `/learn/` | 第一次进入 AI SEE Wiki 的 AI Coding 学习者 | 入门路径总览和读者分流 | 入门准备、实战项目、进阶方法论；5 篇正文入口；下一步阅读 | 大段工具安装细节、OpenSpec 深度正文 |
| `/learn/ai-coding-intro/` | 想理解 AI Coding 本质变化的开发者 | AI Coding 发展阶段、工程师角色变化、AI 擅长与不擅长的边界 | 补全/生成/Agent 对比；常见翻车原因；最小实操对比任务 | 工具排行榜、模型价格细节 |
| `/learn/tools-and-models/` | 面对多种工具和模型不知道如何选择的读者 | 工具形态、模型能力维度、Codex/Claude/Gemini/GLM 选型矩阵 | logo；更新时间；官方事实源口径；便捷度、工程能力、适用人群、成本等维度 | 绝对排名、未经核对的价格/额度/模型参数 |
| `/learn/dev-environment/` | 准备让 AI 在本地项目中工作的读者 | AI Coding 所需基础运行环境和验证清单 | Git、Node.js、Python、终端、编辑器、浏览器；最小验证命令；安全提醒 | 完整系统运维教程、大量 AI 包安装清单 |
| `/learn/codex-setup/` | 想以 Codex 作为主线工具上手的读者 | Codex 安装、登录、打开项目、理解命令与 diff、权限边界 | 桌面版/CLI 入口；第一次安全任务；常见问题；安全边界 | 未确认的安装命令、生产仓库高风险操作 |
| `/learn/first-ai-coding-project/` | 想完成第一个 AI Coding 成果的读者 | 复刻一个网站首页的分步实战 | 项目目标、参考站选择、模块拆分、提示词结构、预览修复、移动端检查、Git 提交标准 | 登录、后台、数据库、真实品牌素材复刻 |
| `/learn/agent-basics/` | 已完成基础上手、想理解 Agent 机制的读者 | Agent 的基本组成和工作循环 | 模型、上下文、工具、环境、约束、验证；Agent 不等于聊天模型 | 深入到某个具体 Agent 框架实现 |
| `/learn/agent-memory/` | 想理解 Agent 如何“记住”和复用上下文的读者 | Memory 的层次、来源和边界 | 全局记忆、项目记忆、项目规则、会话上下文、事实源优先级；以 Codex 项目工作流举例 | 把 memory 写成无限长期记忆或替代事实核查 |
| `/learn/skills/` | 想复用 AI 工程经验的读者 | Skill 的定位、结构、触发和边界 | Skill 与 prompt、脚本、文档的区别；何时适合沉淀为 skill | 写成某一个平台的私有功能说明 |
| `/learn/mcp/` | 想让 Agent 连接外部系统的读者 | MCP 的连接层定位 | MCP server/client、外部能力、权限边界、典型场景 | 大量协议细节或 SDK 教程 |
| `/learn/agent-tools/` | 想理解 Agent 如何真正执行动作的读者 | Tool 作为动作接口的职责 | 读文件、改代码、跑命令、查资料、调用 API；tool 与 MCP 的区别 | 罗列所有工具命令 |
| `/learn/hooks/` | 想给 Agent 执行过程加检查点的读者 | Hook 的生命周期检查和约束作用 | 执行前、执行后、提交前、验证前；安全、质量、上下文注入 | 把 hook 写成万能自动化系统 |
| `/learn/agent-components/` | 想串起 Agent 组成部分的读者 | Memory、Skill、MCP、Tool、Hook 的协作分工 | Codex 智能体示例；总览图；职责边界；典型请求从输入到执行再到沉淀的流转 | 重复前面每篇细节 |

## Learning Path Categories

| 分类 | 页面 | 目标 |
|---|---|---|
| 认知入门 | `/learn/ai-coding-intro/`、`/learn/tools-and-models/` | 建立 AI Coding 心智模型，理解工具和模型如何选择。 |
| 工具上手 | `/learn/dev-environment/`、`/learn/codex-setup/`、`/learn/first-ai-coding-project/` | 准备本地环境，跑通 Codex，并完成第一个 AI Coding 项目。 |
| Agent 进阶 | `/learn/agent-basics/`、`/learn/agent-memory/`、`/learn/skills/`、`/learn/mcp/`、`/learn/agent-tools/`、`/learn/hooks/`、`/learn/agent-components/` | 理解 Agent 的核心组成、能力边界和协作分工。 |

## Article Blueprints

### `/learn/` 学习路径

- 核心结论：学习路径先帮助读者跑通 AI Coding 入门闭环，再通过 Agent 进阶理解 memory、skill、MCP、tool、hook 等核心组成，最后引导进入 OpenSpec、Compound、aisee 等方法论。
- 建议结构：
  1. 这条路径适合谁：AI Coding 新手、用过 AI 工具但效果不稳定的人、准备把 AI Coding 引入团队流程的人。
  2. 三类路径：认知入门、工具上手、Agent 进阶。
  3. 正文入口：2 篇认知入门、3 篇工具上手、7 篇 Agent 进阶。
  4. 学完能做什么：能让 AI 读项目、改代码、跑命令、看 diff、完成一个简单网页项目，并理解 Agent 的 memory、skill、MCP、tool、hook 如何协作。
  5. 后续入口：Spec-first、OpenSpec、Compound、aisee、工程流程。
- 排版建议：使用路线图、入口卡片、步骤列表和提示块；避免写成纯目录页。
- 视觉要求：必须提供学习路线图或入口卡片组，清楚展示“认知入门 -> 工具上手 -> Agent 进阶 -> 工程方法论”的关系。
- 下一步阅读：第一篇指向 `/learn/ai-coding-intro/`，进阶入口可链接 `/openspec/`、`/compound/`、`/aisee/`、`/workflows/`。

### `/learn/ai-coding-intro/` AI Coding 到底改变了什么

- 核心结论：AI Coding 不是“让 AI 替你写代码”，而是让工程师从纯执行者转为任务定义者、上下文管理者和审查者。
- 建议结构：
  1. 从代码补全到 Agent：补全增强、Chat 生成、Agentic Coding 的差异。
  2. 工程师角色变化：过去自己拆任务/写代码/调试，现在定义目标/提供上下文/审查结果/控制风险。
  3. AI Coding 最容易翻车的原因：需求不清、上下文不足、一次性任务太大、没有验证、盲信输出。
  4. AI 擅长和不擅长什么：样板代码、页面结构、CRUD、测试草稿、重构建议；业务判断、安全边界、长期架构取舍和隐性需求仍需人工负责。
  5. 最小心智模型：读者不是在提问，而是在管理一个会写代码的执行者。
- 实操产出：同一个简单需求分别用模糊描述和明确约束描述让 AI 生成代码，对比输出差异。
- 排版建议：使用对比表、失败原因提示块、实操任务卡片。
- 视觉要求：必须包含“补全 -> 生成 -> Agent”的阶段对比图或卡片，以及“工程师角色变化”的前后对比。
- 参考来源：本地课程大纲“认知重构”部分；公开正文不暴露本地路径。

### `/learn/tools-and-models/` AI 编程工具与模型怎么选

- 核心结论：不要问“哪个工具最好”，而要问“当前任务需要哪种工具形态和模型能力”。
- 建议结构：
  1. 工具按形态分类：编辑器插件、AI-first 编辑器、Agent CLI/App、Web Chat。
  2. 模型按能力分类：代码生成、长上下文、多模态、工具调用、长任务稳定性、中文表达和本地化便利性。
  3. 横向视野：可纳入更多工具和模型，例如 Cursor、Windsurf、GitHub Copilot、Kiro、Qwen Code、DeepSeek、OpenRouter 等，用于帮助读者建立生态地图。
  4. 推荐重点：Codex、Claude Code、Gemini、GLM/Z Code，说明为什么本站后续重点围绕这几类展开。
  5. 选择矩阵：初学者、真实项目、UI 项目、团队使用分别看什么。
  6. 为什么本站重点讲 Codex：桌面体验、仓库/终端/diff/线程整合，以及后续 worktree、skills、自动化和 OpenSpec 工作流承接。
- 必须使用 logo：通过 LobeHub Icons 提供 OpenAI/Codex、Anthropic/Claude、Google/Gemini、Zhipu/GLM 的 provider 或 model logo；其他被纳入横向视野的工具/模型可在 LobeHub Icons 有资源时补充 logo。
- 排版建议：使用 logo 卡片、选择矩阵、能力维度表、更新时间提示块。
- 视觉要求：必须包含带 logo 的工具/模型卡片组，并至少包含一个选择矩阵或能力雷达/对比表；推荐工具与扩展视野工具在视觉上要有主次。
- 事实源注意：模型能力、平台支持、安装方式、价格/额度等实现时必须核对官方文档，不写绝对排名和未经确认的实时数据。

### `/learn/dev-environment/` 给 AI 准备运行环境

- 核心结论：AI 编程工具不是孤立聊天框，它需要一个能读仓库、装依赖、跑项目、执行验证的本地环境。
- 建议结构：
  1. 为什么 AI 需要运行环境：只聊天只能给建议，有环境才能运行、看到错误并修复。
  2. 最小环境清单：Git、Node.js、Python、终端、编辑器、浏览器。
  3. Git 要讲什么：版本管理、`git status`、每次修改前确认工作区、不要随便 reset。
  4. Node.js 要讲什么：LTS、前端项目和 CLI 工具依赖、`node -v`、`npm -v`。
  5. Python 要讲什么：版本、虚拟环境意义、初学者不要一开始安装大量 AI 包。
  6. 验证清单：`git --version`、`node -v`、`npm -v`、`python --version`、能打开终端、能进入项目目录。
- 排版建议：使用检查清单、命令代码块、系统差异提示块；不要变成完整系统运维教程。
- 视觉要求：必须包含“AI 本地运行环境”结构图或环境清单卡片，展示 Git、Node.js、Python、终端、编辑器、浏览器之间的作用。
- 参考来源：本地 `AI环境安装教程.md`，但公开正文只保留必要、稳定的入门信息。

### `/learn/codex-setup/` Codex 安装、配置与第一次运行

- 核心结论：Codex 的关键不是安装成功，而是理解它如何读取项目、执行命令、展示 diff，并在权限边界内工作。
- 建议结构：
  1. Codex 是什么：
     - AI Coding Agent。
     - 可以读项目、修改文件、运行命令、协助调试。
     - 不是普通聊天窗口。
  2. 使用前准备：
     - ChatGPT / OpenAI 账号。
     - Git。
     - Node.js。
     - 一个可实验的项目目录。
     - 不建议第一次就在重要生产仓库尝试。
  3. 安装方式：
     - 桌面版。
     - CLI。
     - IDE / 编辑器入口。
     - 不同系统的注意事项。
     - 具体命令和平台支持实现时必须核对 OpenAI 官方文档。
  4. 第一次打开项目：
     - 选择项目目录。
     - 看懂工作区。
     - 看懂对话线程。
     - 看懂命令执行。
     - 看懂文件 diff。
  5. 第一个安全任务：
     - “请阅读项目结构并总结技术栈，不要修改文件”。
     - “请告诉我如何启动项目，不要执行安装命令”。
     - “请检查 README 中的启动命令是否和 package.json 一致”。
  6. 权限和安全边界：
     - 不要随便允许删除、重置、全局安装、上传密钥。
     - 修改前先看 diff。
     - 重要操作前让 Codex 解释影响。
  7. 常见问题：
     - 找不到命令。
     - 登录失败。
     - 项目依赖装不上。
     - 权限弹窗看不懂。
     - AI 修改范围太大。
- 站内定位：这篇作为本站 Codex 主入口，后续学习路径、OpenSpec、Compound、aisee 和工程流程文章都可以链接它。
- 排版建议：使用步骤组件、风险提示块、命令代码组、安全任务卡片和常见问题折叠/分节。
- 视觉要求：必须包含 Codex 第一次使用流程图或步骤卡片，并用风险提示组件突出权限、diff 和危险操作边界。
- 事实源注意：参考本地 `AI编程工具安装教程.md`，但安装命令、平台支持、账号要求和产品入口必须以 OpenAI 官方文档为准。

### `/learn/first-ai-coding-project/` 第一个 AI Coding 项目：复刻一个网站

- 核心结论：第一个项目不要追求复杂功能，要练会拆任务、给参考、看效果、修问题、提交成果的基本节奏。
- 建议结构：
  1. 项目目标：选一个参考网站，复刻一个首页或落地页，做到 PC + 移动端可看，不做登录、后台、数据库。
  2. 选择参考网站：选结构清晰的网站；不照抄品牌和文案；只学习布局、信息层级和交互方式。
  3. 拆页面模块：Hero、功能介绍、场景/案例、定价或 CTA、FAQ、Footer。
  4. 推荐技术栈：Vite + React 或 Vite + Vue；样式可选 Tailwind 或组件库；重点是能让 AI 跑起来并预览。
  5. 和 AI 协作的步骤：创建项目、只做 Hero、运行预览、反馈问题、继续下一块、移动端适配、检查构建、提交 Git。
  6. 推荐提示词结构：目标、参考对象、技术栈、页面模块、视觉风格、验收标准、限制条件。
  7. 常见翻车点：一次生成整站、没有先跑起来、不看 diff、不测移动端、复制真实品牌内容、页面能看但代码不可维护。
  8. 完成标准：本地能启动、主要模块完整、移动端不崩、无明显报错、Git 有清晰提交、能说清楚 AI 做了什么和自己审查了什么。
- 排版建议：使用项目任务卡、步骤列表、提示词模板代码块、完成标准检查清单。
- 视觉要求：必须包含项目拆解图或页面模块卡片，展示 Hero、功能介绍、场景/案例、CTA、FAQ、Footer 等模块，以及“写 -> 看 -> 修 -> 提交”的循环。
- 参考来源：本地 Level 1 静态项目材料；公开正文使用自拟示例项目，不复刻真实品牌资产。

### `/learn/agent-basics/` Agent 是怎么工作的

- 核心结论：Agent 不是更会聊天的模型，而是模型、上下文、工具、运行环境、约束和验证共同组成的执行系统。
- 建议结构：
  1. 为什么从 Chat 走向 Agent。
  2. Agent 的最小组成：模型、上下文、memory、工具、环境、约束、验证。
  3. 一次 Agent 任务如何流动：输入目标、读取上下文、规划、调用工具、观察结果、修正、输出。
  4. Agent 容易失败的位置：目标模糊、工具权限过大、验证缺失、上下文污染、错误级联。
  5. 与后续文章关系：Memory、Skill、MCP、Tool、Hook 分别解决什么问题。
- 视觉要求：优先使用 Vue Flow 做 Agent 工作循环图，展示目标、上下文、memory、模型、工具、验证和输出之间的节点关系。

### `/learn/agent-memory/` Memory：让 Agent 带着上下文持续工作

- 核心结论：Memory 让 Agent 不只依赖当前一句 prompt，而是能在不同层级读取和复用上下文；但 memory 不是事实真理，仍需要项目文件、官方文档和当前任务来校验。
- 建议结构：
  1. 为什么 Agent 需要 Memory：项目约定、用户偏好、历史决策和长期上下文无法每次都靠用户重复输入。
  2. Memory 的四层区分：当前会话上下文、项目规则、项目记忆、全局记忆。
  3. 以 Codex 智能体为例：`AGENTS.md` 提供项目指令，`openspec/project.md` 提供项目上下文，`.memory/rules.md` 与 `.memory/index.md` 管理项目记忆，当前线程记录任务状态。
  4. 全局记忆与项目记忆：全局记忆偏用户长期偏好和跨项目习惯；项目记忆偏本仓库长期决策、技术栈、内容偏好和上下文快照。
  5. Memory 的优先级和边界：用户当前消息和项目文件优先；memory 只做辅助，不替代官方文档、代码事实和验证结果。
  6. 什么时候沉淀项目记忆：重复出现的偏好、长期有效的技术约定、重要架构决策、后续实现必须遵守的内容风格。
- 视觉要求：必须使用分层图或 Vue Flow 展示“当前会话 -> 项目规则 -> 项目记忆 -> 全局记忆”的关系，并标注 Codex 示例中的 `AGENTS.md`、`.memory/index.md`、`.memory/rules.md`。

### `/learn/skills/` Skill：把经验封装成可复用能力

- 核心结论：Skill 是把一套可复用做事方式封装起来，让 Agent 在合适任务中按稳定流程工作。
- 建议结构：
  1. Skill 解决什么问题：重复经验、复杂流程、团队约定和领域知识无法只靠一次 prompt 承载。
  2. Skill 不是什么：不是普通提示词、不是万能插件、不是替代项目文档。
  3. Skill 里通常放什么：触发条件、操作步骤、参考资料、脚本、模板、资产。
  4. 什么时候应该沉淀 Skill：重复出现、流程稳定、错误代价高、团队多人复用。
  5. Skill 与 OpenSpec/aisee 的关系：把需求澄清、设计、拆分、复盘等流程沉淀为可复用能力。
- 视觉要求：使用卡片或 Vue Flow 展示“经验 -> 规则 -> 脚本/模板 -> 可复用 Skill”的转化链路。

### `/learn/mcp/` MCP：让 Agent 连接外部能力

- 核心结论：MCP 是 Agent 连接外部工具、数据和服务的桥梁，让模型能在受控接口下使用外部能力。
- 建议结构：
  1. 为什么 Agent 需要 MCP：模型本身不能天然访问所有外部系统。
  2. MCP 的基本角色：client、server、tool/resource/prompt 等能力暴露。
  3. 典型场景：浏览器、Figma、数据库、文档、设计资产、企业内部系统。
  4. MCP 的边界：连接能力不等于授权无限操作；权限、隐私和审计仍需控制。
  5. MCP 与 Tool 的关系：MCP 常用于提供 tool，但 tool 不一定都来自 MCP。
- 视觉要求：优先用 Vue Flow 展示 Agent 通过 MCP 连接多个外部系统的拓扑关系。

### `/learn/agent-tools/` Tool：Agent 真正执行动作的接口

- 核心结论：Tool 是 Agent 把计划变成动作的接口，读文件、改代码、跑命令、查资料、调用 API 都通过工具完成。
- 建议结构：
  1. Tool 解决什么问题：模型只会生成文本，工具让它能观察和改变环境。
  2. 常见 Tool 类型：文件、Shell、浏览器、检索、图像、Git、外部 API。
  3. Tool 调用的基本闭环：选择工具、传参、执行、观察结果、调整下一步。
  4. Tool 的风险：误删文件、泄露秘密、执行高风险命令、错误结果被继续放大。
  5. Tool 与 MCP/Hook 的关系：MCP 提供能力，Hook 加检查点，Tool 执行动作。
- 视觉要求：使用执行闭环图或交互式节点流程展示“计划 -> Tool 调用 -> 观察 -> 下一步”的循环。

### `/learn/hooks/` Hook：在关键节点加上自动检查和约束

- 核心结论：Hook 是 Agent 工作流中的自动化检查点，用来在关键时刻注入上下文、拦截风险、运行验证或记录结果。
- 建议结构：
  1. 为什么需要 Hook：Agent 执行速度快，但也容易越界、漏验证或忘记项目规则。
  2. Hook 常见位置：任务开始前、工具调用前后、文件修改后、提交前、归档前。
  3. Hook 能做什么：注入规则、检查 secrets、阻止危险命令、运行测试、记录上下文。
  4. Hook 的边界：不能替代人类判断，也不应把所有流程做成硬阻断。
  5. 与项目规则关系：AGENTS.md、CLAUDE.md、OpenSpec 状态机和 hooks 共同形成约束层。
- 视觉要求：用生命周期时间线或 Vue Flow 展示 Hook 插入 Agent 执行链路的位置。

### `/learn/agent-components/` Agent 的核心组成：Memory、Skill、MCP、Tool、Hook 如何配合

- 核心结论：Memory、Skill、MCP、Tool、Hook 不是同一层能力；Memory 负责保留和调取上下文，Skill 负责复用流程，MCP 负责连接外部能力，Tool 负责执行动作，Hook 负责生命周期检查和约束。
- 建议结构：
  1. 五个概念的职责边界：Memory、Skill、MCP、Tool、Hook。
  2. 以 Codex 智能体为例：读取 `AGENTS.md` 和 `.memory/`，按 skill 或项目规则组织任务，通过 tool 读写文件和运行命令，通过 MCP/应用连接外部系统，通过 hook 做安全和流程检查。
  3. 一个请求从输入到完成的流转：用户目标 -> 当前会话 -> 项目规则/项目记忆 -> 模型推理 -> Skill 流程 -> Tool 执行 -> MCP 外部能力 -> Hook 检查 -> 输出/沉淀。
  4. 它们如何互相配合：Memory 提供上下文，Skill 调用流程，Tool 执行动作，MCP 扩展工具来源，Hook 控制风险。
  5. 常见误解：把 MCP 当 Agent、把 Tool 当 Skill、把 Hook 当业务逻辑、把 Memory 当事实真理、把 Skill 当普通文档。
  6. 下一步：进入 OpenSpec、Compound、aisee，理解如何把这些能力放进工程流程。
- 视觉要求：必须使用 Vue Flow 制作一张 Codex 智能体总览交互图，展示 Memory、Skill、MCP、Tool、Hook 的分工和协作流。

## Visual and Component Requirements

- 每篇文章必须至少包含一种非纯文本表达：配图、Mermaid/流程图、路线卡片、对比矩阵、步骤组件、检查清单、logo 卡片、自定义 Vue 组件或等效 Plume 组件。
- 配图可以是生成图、站内自制示意图、流程图或工具 logo 组合；不得使用未经授权的真实商业网站截图或品牌素材作为主要内容。
- 交互式 flow：维护者偏好优先使用 Vue Flow `https://vueflow.dev/` 做有冲击力的交互式流程、节点关系和学习路线体验，适合 `/learn/` 路线图、Codex 第一次使用流程、AI Coding 项目循环等核心可视化。
- 动效参考：维护者偏好优先参考 Vue Bits `https://vue-bits.dev/get-started/index` 的动效和微交互风格，用于卡片进入、节点高亮、步骤切换、状态反馈等增强理解的场景。
- 静态技术图：已安装的 `fireworks-tech-graph` skill 可作为静态 SVG/PNG 补充或兜底，适合无需交互的阶段演进图、工具矩阵、运行环境结构图和项目拆解图；生成后应放入站点公开资源目录并验证 SVG/PNG 可渲染。
- 优先使用 `vuepress-theme-plume` 已有能力，例如提示块、代码组、卡片式链接、步骤说明、表格和 Markdown 图示；只有当表达明显受限时才创建自定义组件。
- 自定义组件应服务内容理解和交互体验，例如学习路线、工具选择、Codex 安全任务、环境检查、项目拆解；允许做出视觉冲击力，但交互必须帮助读者理解流程或关系，不要只做装饰。
- 页面在移动端必须可读，卡片、表格、logo 网格和代码块不得造成横向溢出或文本遮挡。

## Site Impact

- 导航：不新增顶层导航；继续使用现有 `/learn/` 导航入口。
- 侧边栏：`learnCollection.sidebar` 需要按“认知入门 / 工具上手 / Agent 进阶”分组呈现；若 collection 配置不支持分组，应在 `/learn/` 首页提供清晰分组入口。
- 路由：新增 12 个稳定 permalink，分别为 `/learn/ai-coding-intro/`、`/learn/tools-and-models/`、`/learn/dev-environment/`、`/learn/codex-setup/`、`/learn/first-ai-coding-project/`、`/learn/agent-basics/`、`/learn/agent-memory/`、`/learn/skills/`、`/learn/mcp/`、`/learn/agent-tools/`、`/learn/hooks/`、`/learn/agent-components/`。
- frontmatter：每篇页面需包含 `title`、`permalink`、`createTime`，并沿用现有站点 frontmatter 风格；如使用 Plume article metadata，保持与项目现有约定一致。
- 标签/分类：文档型栏目默认不使用文章标签；如添加标签，应确认 Plume doc collection 支持方式并保持简洁。
- 搜索影响：新增正文会进入站内搜索；标题和小节应使用可检索中文关键词，如 AI Coding、Codex、Claude、Gemini、GLM、运行环境、复刻网站、Agent、Memory、全局记忆、项目记忆、Skill、MCP、Tool、Hook。
- 多语言影响：英文完整正文不在本 change 范围；`site/en/learn/README.md` 可保留建设中说明，并可增加中文内容优先完成的说明和无死链入口。
- 构建/部署影响：如新增 `@lobehub/icons` 依赖或自定义组件，必须通过 `pnpm docs:build`；如使用外部 CDN/SVG URL，需要检查构建不依赖网络下载。

## Logo 与组件约束

- LobeHub Icons 来源：实现时遵循 `https://lobehub.com/icons/skill.md`，可参考 `@lobehub/icons`、`getLobeIconCDN`、静态 SVG/PNG/WebP URL、`toc` 元数据。
- VuePress 适配：`@lobehub/icons` 的 React 组件不得直接写进 Vue Markdown 页面；优先使用静态 SVG/CDN URL、构建时生成 URL、或封装为 Vue 可用的轻量展示组件。
- 目标 logo：至少覆盖 OpenAI/Codex、Anthropic/Claude、Google/Gemini、Zhipu/GLM；如 LobeHub Icons 中不存在某个具体工具图标，应使用对应 provider logo 并在正文中避免暗示为官方产品图标。
- 暗色模式：logo 展示应检查亮暗主题可读性；必要时使用 `type="color"`、`brand`、`avatar` 或带背景容器。
- Plume 组件：优先使用 Plume/VuePress Markdown 扩展表达路线、提示、代码组、卡片和步骤；自定义组件只用于工具 logo 网格、模型选择矩阵或交互性明显更好的展示。
- 视觉表达：实现后检查每篇文章是否有至少一个配图、图示或组件化信息块，不能只依赖长段落正文。
- 技术图与 flow：交互式流程/节点体验优先使用 Vue Flow；动效和微交互优先参考 Vue Bits；静态 SVG/PNG 可用 `fireworks-tech-graph` 作为补充或兜底；所有交互必须通过桌面和移动端预览。

## Validation

- [x] 页面路径可访问：本地静态预览 `http://127.0.0.1:8088` 下 `/learn/` 和 12 个新增中文页面均返回 200。
- [x] 导航/侧边栏入口正确：`learnCollection.sidebar` 已按“认知入门 / 工具上手 / Agent 进阶”分组，构建产物侧边栏已渲染分组。
- [x] 内链有效：新增页面均使用稳定 `/learn/.../` permalink，并保留文章末尾下一步阅读。
- [x] 代码块、命令或示例已检查：危险 Git/删除/生产操作只作为风险提醒出现，未给出破坏性执行步骤。
- [x] 工具与模型事实已核对官方文档，正文标注更新时间或事实源口径：Codex、Claude Code、Gemini CLI、GLM Coding Plan 已核对官方说明，相关正文标注 2026-05-25 口径和“以官方文档为准”。
- [x] logo 资源来自 `@lobehub/icons` 说明支持的包、CDN 或静态资源路径：使用 `@lobehub/icons-static-svg` CDN 的 `codex-color.svg`、`claude-color.svg`、`gemini-color.svg`、`zhipu-color.svg` 等资源。
- [x] 每篇文章至少包含一种配图、图示或组件化信息块：12 篇正文和 `/learn/` 首页均包含 `LearningFlow` 或 `ToolLogoGrid`。
- [x] 视觉组件、表格、logo 网格和代码块在移动端不溢出、不遮挡正文：已用 Chrome headless 截图检查 `/learn/` 桌面和 `/learn/tools-and-models/` 移动端。
- [x] 若使用 Vue Flow、Vue Bits 风格动效或 `fireworks-tech-graph`，已验证构建、移动端布局、交互可用性和内容可读性：本次使用 Vue Flow 和 CSS 微动效，没有生成静态 fireworks 图。
- [x] 文档站构建或预览检查通过：`pnpm docs:build` 成功。
- [x] 需要时已截图或人工预览：已生成 `/tmp/aisee-learn-desktop.png` 与 `/tmp/aisee-learn-mobile.png` 并人工查看。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 已回写 `openspec/project-docs.md`：记录学习路径栏目状态、13 个页面清单、阅读路径、内容缺口、术语写作约定、站点结构约定和本 change 归档记录。

- [x] 页面清单已更新。
- [x] 栏目结构已更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A。本 change 会新增学习路径正文和页面清单，归档前必须回写基线。
