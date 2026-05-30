<script setup lang="ts">
import { computed, ref } from 'vue'

type Resource = {
  name: string
  repo: string
  description: string
  tags: string[]
  github: string
  site?: string
  icon: string
}

type Category = {
  key: string
  title: string
  summary: string
  resources: Resource[]
}

const categories: Category[] = [
  {
    key: 'methodology',
    title: '方法论与工作流',
    summary: '先看这些资源，理解如何把一次 AI Coding 从聊天、提示词和零散工具，推进到可审查、可复用的工程流程。',
    resources: [
      {
        name: 'OpenSpec',
        repo: 'Fission-AI/OpenSpec',
        description: '面向 AI coding assistants 的 spec-driven development，用仓库内 artifacts 固定变更意图、行为边界和验证任务。',
        tags: ['Spec-driven', '事实源'],
        github: 'https://github.com/Fission-AI/OpenSpec',
        site: 'https://openspec.dev/',
        icon: 'https://avatars.githubusercontent.com/u/203414896?v=4',
      },
      {
        name: 'Compound Engineering Plugin',
        repo: 'EveryInc/compound-engineering-plugin',
        description: '把策略、计划、执行、评审和知识沉淀串成工程复利流程的官方插件。',
        tags: ['Compound', '工程复利'],
        github: 'https://github.com/EveryInc/compound-engineering-plugin',
        site: 'https://every.to/guides/compound-engineering',
        icon: 'https://avatars.githubusercontent.com/u/76073155?v=4',
      },
      {
        name: 'get-shit-done',
        repo: 'gsd-build/get-shit-done',
        description: '轻量的 meta-prompting、context engineering 与 spec-driven Claude Code 工作流。',
        tags: ['Context', 'Workflow'],
        github: 'https://github.com/gsd-build/get-shit-done',
        icon: 'https://avatars.githubusercontent.com/u/260490621?v=4',
      },
      {
        name: 'spec-kitty',
        repo: 'Priivacy-ai/spec-kitty',
        description: '围绕 Spec Coding、看板、git worktrees 和自动合并的开发仪表盘。',
        tags: ['Spec Coding', 'Dashboard'],
        github: 'https://github.com/Priivacy-ai/spec-kitty',
        site: 'https://priivacy-ai.github.io/spec-kitty/',
        icon: 'https://avatars.githubusercontent.com/u/236980823?v=4',
      },
      {
        name: 'openspec-schemas',
        repo: 'intent-driven-dev/openspec-schemas',
        description: 'OpenSpec 自定义 schema 集合，适合研究 artifact DAG 和工作流扩展方式。',
        tags: ['Schema', 'OpenSpec'],
        github: 'https://github.com/intent-driven-dev/openspec-schemas',
        icon: 'https://avatars.githubusercontent.com/u/250779722?v=4',
      },
      {
        name: 'claude-code-best-practice',
        repo: 'shanraisshan/claude-code-best-practice',
        description: '从 vibe coding 走向 agentic engineering 的 Claude Code 实践合集。',
        tags: ['Best Practice', 'Claude Code'],
        github: 'https://github.com/shanraisshan/claude-code-best-practice',
        site: 'https://linkedin.com/in/shanraisshan',
        icon: 'https://avatars.githubusercontent.com/u/11731897?v=4',
      },
      {
        name: 'claude-code-workflow',
        repo: 'runesleo/claude-code-workflow',
        description: 'Claude Code 工作流模板，适合对比个人 CLAUDE.md 和项目规则组织方式。',
        tags: ['Workflow', 'Template'],
        github: 'https://github.com/runesleo/claude-code-workflow',
        icon: 'https://avatars.githubusercontent.com/u/245669230?v=4',
      },
    ],
  },
  {
    key: 'agents',
    title: 'Coding Agent 与 Harness',
    summary: '这些项目更接近“让 Agent 接手真实任务”的运行层，适合比较 CLI、WebUI、任务分派、长任务和多 Agent 协作方式。',
    resources: [
      {
        name: 'OpenHands',
        repo: 'OpenHands/OpenHands',
        description: '开源 AI-driven development 平台，适合观察完整 coding agent 产品如何组织环境、工具和任务。',
        tags: ['Agent', 'Platform'],
        github: 'https://github.com/OpenHands/OpenHands',
        site: 'https://openhands.dev',
        icon: 'https://avatars.githubusercontent.com/u/225919603?v=4',
      },
      {
        name: 'open-swe',
        repo: 'langchain-ai/open-swe',
        description: '异步开源 coding agent，适合研究 issue 到代码变更的代理式执行模式。',
        tags: ['SWE', 'Async'],
        github: 'https://github.com/langchain-ai/open-swe',
        site: 'https://openswe.vercel.app',
        icon: 'https://avatars.githubusercontent.com/u/126733545?v=4',
      },
      {
        name: 'crush',
        repo: 'charmbracelet/crush',
        description: '面向终端体验的 agentic coding 工具，适合关注 CLI 交互和开发者体验的人。',
        tags: ['CLI', 'Agentic Coding'],
        github: 'https://github.com/charmbracelet/crush',
        icon: 'https://avatars.githubusercontent.com/u/57376114?v=4',
      },
      {
        name: 'deepagents',
        repo: 'langchain-ai/deepagents',
        description: 'Batteries-included agent harness，可作为 agent 运行时和任务组织的参考。',
        tags: ['Harness', 'LangChain'],
        github: 'https://github.com/langchain-ai/deepagents',
        site: 'https://docs.langchain.com/deepagents',
        icon: 'https://avatars.githubusercontent.com/u/126733545?v=4',
      },
      {
        name: 'Trellis',
        repo: 'mindfold-ai/Trellis',
        description: '面向 agentic coding 的 harness，强调工作流和 Codex/Claude Code 类工具配合。',
        tags: ['Harness', 'Workflow'],
        github: 'https://github.com/mindfold-ai/Trellis',
        site: 'https://docs.trytrellis.app',
        icon: 'https://avatars.githubusercontent.com/u/219217320?v=4',
      },
      {
        name: 'OpenHarness',
        repo: 'HKUDS/OpenHarness',
        description: '开放式 agent harness，适合观察 agent 框架如何内置个人代理和工具链。',
        tags: ['Harness', 'Agent'],
        github: 'https://github.com/HKUDS/OpenHarness',
        icon: 'https://avatars.githubusercontent.com/u/118165258?v=4',
      },
      {
        name: 'opcode',
        repo: 'winfunc/opcode',
        description: 'Claude Code GUI 与工具包，覆盖自定义 agents、会话管理和后台 agent。',
        tags: ['GUI', 'Claude Code'],
        github: 'https://github.com/winfunc/opcode',
        site: 'https://opcode.sh',
        icon: 'https://avatars.githubusercontent.com/u/176251414?v=4',
      },
      {
        name: 'multica',
        repo: 'multica-ai/multica',
        description: '开源 managed agents 平台，把 coding agents 当作团队成员来分派、跟踪和沉淀 skill。',
        tags: ['Managed Agents', 'Team'],
        github: 'https://github.com/multica-ai/multica',
        site: 'https://multica.ai',
        icon: 'https://avatars.githubusercontent.com/u/254743058?v=4',
      },
      {
        name: 'Hermes Agent',
        repo: 'NousResearch/hermes-agent',
        description: 'Nous Research 的 agent 项目，适合观察面向个人成长型 assistant 的产品化方向。',
        tags: ['Assistant', 'Agent'],
        github: 'https://github.com/NousResearch/hermes-agent',
        site: 'https://hermes-agent.nousresearch.com',
        icon: 'https://avatars.githubusercontent.com/u/134168893?v=4',
      },
      {
        name: 'oh-my-claudecode',
        repo: 'Yeachan-Heo/oh-my-claudecode',
        description: '面向 Claude Code 的多 agent orchestration，适合研究团队式任务编排。',
        tags: ['Multi-agent', 'Claude Code'],
        github: 'https://github.com/Yeachan-Heo/oh-my-claudecode',
        site: 'https://oh-my-claudecode.dev',
        icon: 'https://avatars.githubusercontent.com/u/54757707?v=4',
      },
      {
        name: 'OpenClaw',
        repo: 'openclaw/openclaw',
        description: '跨平台个人 AI assistant，适合作为 OpenClaw 生态入口观察，不建议只按 star 数判断成熟度。',
        tags: ['Assistant', '待观察'],
        github: 'https://github.com/openclaw/openclaw',
        site: 'https://openclaw.ai',
        icon: 'https://avatars.githubusercontent.com/u/252820863?v=4',
      },
    ],
  },
  {
    key: 'skills',
    title: 'Skill、Prompt 与上下文工程',
    summary: '这组资源关注“把经验封装成可复用能力”，适合读完本站 Skill、Memory 和 Hook 文章后继续研究。',
    resources: [
      {
        name: 'SkillOpt',
        repo: 'microsoft/SkillOpt',
        description: '微软的 skill 文本空间优化器，通过 trajectory-driven edits 训练可复用自然语言技能。',
        tags: ['Skill', 'Optimization'],
        github: 'https://github.com/microsoft/SkillOpt',
        site: 'https://aka.ms/skillopt',
        icon: 'https://avatars.githubusercontent.com/u/6154722?v=4',
      },
      {
        name: 'skills',
        repo: 'vercel-labs/skills',
        description: 'Vercel Labs 的 open agent skills 工具，适合观察 skill 分发和运行入口设计。',
        tags: ['Skill Tool', 'Vercel'],
        github: 'https://github.com/vercel-labs/skills',
        site: 'https://skills.sh',
        icon: 'https://avatars.githubusercontent.com/u/108547162?v=4',
      },
      {
        name: 'mattpocock/skills',
        repo: 'mattpocock/skills',
        description: '工程师个人 `.claude` 目录中的实用 skills，适合学习个人知识如何沉淀为 skill。',
        tags: ['Personal Skills', 'Claude'],
        github: 'https://github.com/mattpocock/skills',
        icon: 'https://avatars.githubusercontent.com/u/28293365?v=4',
      },
      {
        name: 'andrej-karpathy-skills',
        repo: 'multica-ai/andrej-karpathy-skills',
        description: '把 Karpathy 对 LLM coding pitfalls 的观察整理为单个 CLAUDE.md 文件。',
        tags: ['CLAUDE.md', 'Pitfalls'],
        github: 'https://github.com/multica-ai/andrej-karpathy-skills',
        icon: 'https://avatars.githubusercontent.com/u/254743058?v=4',
      },
      {
        name: 'Vibe-Skills',
        repo: 'foryourhealth111-pixel/Vibe-Skills',
        description: '面向 agent 的通用 skills 包，覆盖上下文管理和能力组合，适合对比“大包式 skill”的边界。',
        tags: ['Skill Pack', 'Context'],
        github: 'https://github.com/foryourhealth111-pixel/Vibe-Skills',
        icon: 'https://avatars.githubusercontent.com/u/251585801?v=4',
      },
      {
        name: 'Fabric',
        repo: 'danielmiessler/Fabric',
        description: '用 crowdsourced prompts 解决具体问题的 AI augmentation 框架，可作为 prompt pattern 库参考。',
        tags: ['Prompt Patterns', 'AI Augmentation'],
        github: 'https://github.com/danielmiessler/Fabric',
        site: 'https://danielmiessler.com/p/fabric-origin-story',
        icon: 'https://avatars.githubusercontent.com/u/50654?v=4',
      },
      {
        name: 'prompt-optimizer',
        repo: 'linshenkx/prompt-optimizer',
        description: '提示词优化工具，适合把 prompt 从“凭感觉写”推进到测试和迭代。',
        tags: ['Prompt', 'Testing'],
        github: 'https://github.com/linshenkx/prompt-optimizer',
        site: 'https://prompt.always200.com',
        icon: 'https://avatars.githubusercontent.com/u/32978552?v=4',
      },
      {
        name: 'darwin-skill',
        repo: 'alchaincyf/darwin-skill',
        description: '面向 Claude Code 的 skill 自优化流程，强调评估、改进、测试、保留或回滚。',
        tags: ['Skill Evolution', 'Evaluation'],
        github: 'https://github.com/alchaincyf/darwin-skill',
        icon: 'https://avatars.githubusercontent.com/u/127714341?v=4',
      },
      {
        name: 'claude-token-efficient',
        repo: 'drona23/claude-token-efficient',
        description: '通过单个 CLAUDE.md 控制 Claude 输出冗余，适合学习 token 与输出规范约束。',
        tags: ['CLAUDE.md', 'Token'],
        github: 'https://github.com/drona23/claude-token-efficient',
        icon: 'https://avatars.githubusercontent.com/u/113818537?v=4',
      },
      {
        name: 'last30days-skill',
        repo: 'mvanhorn/last30days-skill',
        description: '研究最近 30 天趋势的 agent skill，适合作为“带时间边界的研究 skill”参考。',
        tags: ['Research Skill', 'Recency'],
        github: 'https://github.com/mvanhorn/last30days-skill',
        icon: 'https://avatars.githubusercontent.com/u/455140?v=4',
      },
      {
        name: 'skill-flow',
        repo: 'VintLin/skill-flow',
        description: '跨 Claude Code、Cursor、Copilot 等 coding agent 安装、管理和分享 skills。',
        tags: ['Skill Manager', 'Cross-agent'],
        github: 'https://github.com/VintLin/skill-flow',
        icon: 'https://avatars.githubusercontent.com/u/26142850?v=4',
      },
    ],
  },
  {
    key: 'tools',
    title: 'MCP、Tool Use 与浏览器自动化',
    summary: '这组资源用于理解 Agent 如何连接外部能力、控制浏览器、操作网页或把现有工具包装成可调用接口。',
    resources: [
      {
        name: 'agent-browser',
        repo: 'vercel-labs/agent-browser',
        description: '面向 AI agents 的浏览器自动化 CLI，适合研究 browser tool 的产品形态。',
        tags: ['Browser', 'CLI'],
        github: 'https://github.com/vercel-labs/agent-browser',
        site: 'https://agent-browser.dev',
        icon: 'https://avatars.githubusercontent.com/u/108547162?v=4',
      },
      {
        name: 'page-agent',
        repo: 'alibaba/page-agent',
        description: 'JavaScript in-page GUI agent，用自然语言控制网页界面。',
        tags: ['GUI Agent', 'Web'],
        github: 'https://github.com/alibaba/page-agent',
        site: 'https://alibaba.github.io/page-agent/',
        icon: 'https://avatars.githubusercontent.com/u/1961952?v=4',
      },
      {
        name: 'byob',
        repo: 'wxtsky/byob',
        description: 'Bring Your Own Browser，让 AI agent 使用你已经打开的 Chrome。',
        tags: ['Chrome', 'MCP'],
        github: 'https://github.com/wxtsky/byob',
        site: 'https://github.com/wxtsky/byob',
        icon: 'https://avatars.githubusercontent.com/u/79189721?v=4',
      },
      {
        name: 'OpenCLI',
        repo: 'jackwener/OpenCLI',
        description: '把网站变成 CLI，并允许 AI agent 使用已登录浏览器上下文。',
        tags: ['CLI', 'Browser'],
        github: 'https://github.com/jackwener/OpenCLI',
        site: 'https://opencli.info/',
        icon: 'https://avatars.githubusercontent.com/u/30525741?v=4',
      },
      {
        name: 'drawio-mcp-server',
        repo: 'lgazo/drawio-mcp-server',
        description: 'Draw.io 的 MCP Server，适合图示工具如何接入 Agent 的参考。',
        tags: ['MCP', 'Diagram'],
        github: 'https://github.com/lgazo/drawio-mcp-server',
        icon: 'https://avatars.githubusercontent.com/u/783655?v=4',
      },
      {
        name: 'teammcp',
        repo: 'cookjohn/teammcp',
        description: 'MCP-native collaboration server，为 AI agent 团队提供消息、任务和 dashboard。',
        tags: ['MCP', 'Collaboration'],
        github: 'https://github.com/cookjohn/teammcp',
        icon: 'https://avatars.githubusercontent.com/u/154727195?v=4',
      },
      {
        name: 'codex-claude-bridge',
        repo: 'AmirShayegh/codex-claude-bridge',
        description: '用 Codex 做自动代码评审，并提供 CLI 与 Claude Code MCP 集成。',
        tags: ['Codex', 'Code Review'],
        github: 'https://github.com/AmirShayegh/codex-claude-bridge',
        site: 'https://www.npmjs.com/package/codex-claude-bridge',
        icon: 'https://avatars.githubusercontent.com/u/34552761?v=4',
      },
      {
        name: 'better-icons',
        repo: 'better-auth/better-icons',
        description: '图标搜索和获取的 Skill/MCP server，适合 UI 生成流程中的素材检索。',
        tags: ['MCP', 'Icons'],
        github: 'https://github.com/better-auth/better-icons',
        icon: 'https://avatars.githubusercontent.com/u/163827765?v=4',
      },
      {
        name: 'harness-research',
        repo: 'Nimo1987/harness-research',
        description: '为 Agent 提供深度研究能力的 MCP server，覆盖多数据源、可信度评估和报告输出。',
        tags: ['MCP', 'Research'],
        github: 'https://github.com/Nimo1987/harness-research',
        icon: 'https://avatars.githubusercontent.com/u/128346683?v=4',
      },
    ],
  },
  {
    key: 'context',
    title: '代码上下文、记忆与观测',
    summary: '这组资源解决“Agent 如何知道当前仓库、历史会话和执行状态”的问题，适合和本站 Memory、Tool、Review 内容一起看。',
    resources: [
      {
        name: 'code-review-graph',
        repo: 'tirth8205/code-review-graph',
        description: '本地优先的代码智能图谱，为 MCP 和 CLI 构建代码库地图，减少大仓库审查上下文成本。',
        tags: ['Code Graph', 'Review'],
        github: 'https://github.com/tirth8205/code-review-graph',
        site: 'https://code-review-graph.com',
        icon: 'https://avatars.githubusercontent.com/u/68604113?v=4',
      },
      {
        name: 'graphify',
        repo: 'safishamsi/graphify',
        description: '把代码、数据库 schema、基础设施、文档和多媒体转换为可查询知识图谱的 AI coding assistant skill。',
        tags: ['Knowledge Graph', 'Skill'],
        github: 'https://github.com/safishamsi/graphify',
        site: 'https://graphifylabs.ai/',
        icon: 'https://avatars.githubusercontent.com/u/216348667?v=4',
      },
      {
        name: 'oh-my-mermaid',
        repo: 'oh-my-mermaid/oh-my-mermaid',
        description: '用 Claude Code 把复杂代码库转成可导航架构图，适合代码理解和沟通。',
        tags: ['Architecture', 'Diagram'],
        github: 'https://github.com/oh-my-mermaid/oh-my-mermaid',
        icon: 'https://avatars.githubusercontent.com/u/270088729?v=4',
      },
      {
        name: 'claude-devtools',
        repo: 'matt1398/claude-devtools',
        description: 'Claude Code 的 DevTools，查看 session logs、tool calls、token、subagents 和 context window。',
        tags: ['Observability', 'Claude Code'],
        github: 'https://github.com/matt1398/claude-devtools',
        site: 'https://claude-dev.tools',
        icon: 'https://avatars.githubusercontent.com/u/113107082?v=4',
      },
      {
        name: 'claude-hud',
        repo: 'jarrodwatts/claude-hud',
        description: 'Claude Code 插件，用于显示上下文使用、活动工具、运行中 agents 和 todo 进度。',
        tags: ['HUD', 'Plugin'],
        github: 'https://github.com/jarrodwatts/claude-hud',
        icon: 'https://avatars.githubusercontent.com/u/35651410?v=4',
      },
      {
        name: 'claude-history-sync',
        repo: 'kossen6891/claude-history-sync',
        description: '跨机器同步 Claude Code history，并把对话保留在对应 git repo 语境中。',
        tags: ['History', 'Sync'],
        github: 'https://github.com/kossen6891/claude-history-sync',
        icon: 'https://avatars.githubusercontent.com/u/262214865?v=4',
      },
      {
        name: 'plugin-archive',
        repo: 'Storybloq/plugin-archive',
        description: '面向 AI coding assistants 的跨会话上下文持久化插件。',
        tags: ['Session', 'Persistence'],
        github: 'https://github.com/Storybloq/plugin-archive',
        site: 'https://claudestory.com',
        icon: 'https://avatars.githubusercontent.com/u/276784697?v=4',
      },
      {
        name: 'claude-mem',
        repo: 'thedotmack/claude-mem',
        description: '跨 Agent 的持久上下文系统，捕获 session、压缩并注入未来任务上下文。',
        tags: ['Memory', 'Context'],
        github: 'https://github.com/thedotmack/claude-mem',
        site: 'https://claude-mem.ai',
        icon: 'https://avatars.githubusercontent.com/u/683968?v=4',
      },
      {
        name: 'mempalace',
        repo: 'MemPalace/mempalace',
        description: '开源 AI memory system，可作为长期记忆和检索层设计参考。',
        tags: ['Memory', 'MCP'],
        github: 'https://github.com/MemPalace/mempalace',
        site: 'http://mempalaceofficial.com/',
        icon: 'https://avatars.githubusercontent.com/u/275135684?v=4',
      },
      {
        name: 'claude-statusline',
        repo: 'nilbuild/claude-statusline',
        description: '轻量 Claude Code statusline 配置，适合观察低成本状态提示怎么进入工作流。',
        tags: ['Statusline', 'DX'],
        github: 'https://github.com/nilbuild/claude-statusline',
        icon: 'https://avatars.githubusercontent.com/u/4921183?v=4',
      },
    ],
  },
  {
    key: 'design',
    title: 'UI/UX、设计与可视化',
    summary: '这组是本轮复核中最容易漏掉的一类。它们不是普通设计素材，而是让 coding agent 更好地产出 UI、图示和可读文档的能力。',
    resources: [
      {
        name: 'ui-ux-pro-max-skill',
        repo: 'nextlevelbuilder/ui-ux-pro-max-skill',
        description: '为 AI 提供多端 UI/UX 设计智能的 Skill，是 AI Coding 做前端界面时值得首批收录的资源。',
        tags: ['UI/UX Skill', '重点补入'],
        github: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
        site: 'https://www.uupm.cc/',
        icon: 'https://avatars.githubusercontent.com/u/246974152?v=4',
      },
      {
        name: 'impeccable',
        repo: 'pbakaus/impeccable',
        description: '面向 AI harness 的设计语言资源，帮助改善生成界面的审美和设计判断。',
        tags: ['Design Language', 'Harness'],
        github: 'https://github.com/pbakaus/impeccable',
        site: 'https://impeccable.style',
        icon: 'https://avatars.githubusercontent.com/u/43004?v=4',
      },
      {
        name: 'awesome-design-md',
        repo: 'VoltAgent/awesome-design-md',
        description: '收集流行品牌 design system 的 DESIGN.md 分析，帮助 coding agents 生成匹配品牌语气的 UI。',
        tags: ['DESIGN.md', 'Design System'],
        github: 'https://github.com/VoltAgent/awesome-design-md',
        site: 'https://github.com/VoltAgent/voltagent',
        icon: 'https://avatars.githubusercontent.com/u/201282378?v=4',
      },
      {
        name: 'open-design',
        repo: 'nexu-io/open-design',
        description: '本地优先的开放式 AI design 工作台，覆盖原型、slides、图片、视频和导出工作流。',
        tags: ['Design Workspace', 'Local-first'],
        github: 'https://github.com/nexu-io/open-design',
        site: 'https://open-design.ai',
        icon: 'https://avatars.githubusercontent.com/u/263625318?v=4',
      },
      {
        name: 'taste-skill',
        repo: 'Leonxlnx/taste-skill',
        description: '给 AI 增加前端审美约束的 Skill，避免生成普通、模板化、缺乏品味的界面。',
        tags: ['Taste', 'Frontend'],
        github: 'https://github.com/Leonxlnx/taste-skill',
        site: 'https://tasteskill.dev',
        icon: 'https://avatars.githubusercontent.com/u/219127460?v=4',
      },
      {
        name: 'gsap-skills',
        repo: 'greensock/gsap-skills',
        description: 'GSAP 官方 AI skills，让 coding agents 正确使用动画模式、插件和最佳实践。',
        tags: ['Animation', 'Official Skill'],
        github: 'https://github.com/greensock/gsap-skills',
        icon: 'https://avatars.githubusercontent.com/u/2386673?v=4',
      },
      {
        name: 'design-md-chrome',
        repo: 'bergside/design-md-chrome',
        description: 'Chrome 扩展，从任意网站提取样式并生成 DESIGN.md 和 design skills。',
        tags: ['DESIGN.md', 'Chrome'],
        github: 'https://github.com/bergside/design-md-chrome',
        site: 'https://chromewebstore.google.com/detail/designmd-style-extractor/ogpdnchdjiibhobphelbbkemnnemkfma',
        icon: 'https://avatars.githubusercontent.com/u/109292896?v=4',
      },
      {
        name: 'fireworks-tech-graph',
        repo: 'yizhiyanhua-ai/fireworks-tech-graph',
        description: '从自然语言生成生产质量 SVG/PNG 技术图，支持 AI/Agent workflow patterns。',
        tags: ['Diagram', 'SVG'],
        github: 'https://github.com/yizhiyanhua-ai/fireworks-tech-graph',
        site: 'https://bradzhang.dev/en/case-studies/fireworks-tech-graph',
        icon: 'https://avatars.githubusercontent.com/u/251871046?v=4',
      },
      {
        name: 'markdown-viewer/skills',
        repo: 'markdown-viewer/skills',
        description: '面向 AI coding agents 的 Markdown 图示和数据可视化 skills。',
        tags: ['Markdown', 'Visualization'],
        github: 'https://github.com/markdown-viewer/skills',
        icon: 'https://avatars.githubusercontent.com/u/254370810?v=4',
      },
      {
        name: 'openpencil',
        repo: 'ZSeven-W/openpencil',
        description: 'AI-native vector design tool，强调 Design-as-Code 和 live canvas 上的 UI 生成。',
        tags: ['Vector Design', 'Design-as-Code'],
        github: 'https://github.com/ZSeven-W/openpencil',
        site: 'https://op.zseven.tech',
        icon: 'https://avatars.githubusercontent.com/u/218180147?v=4',
      },
      {
        name: 'html-anything',
        repo: 'nexu-io/html-anything',
        description: 'Agentic HTML editor，让本地 AI agent 写 HTML 并导出多种内容形态。',
        tags: ['HTML', 'Editor'],
        github: 'https://github.com/nexu-io/html-anything',
        site: 'https://open-design.ai/html-anything/',
        icon: 'https://avatars.githubusercontent.com/u/263625318?v=4',
      },
      {
        name: 'huashu-design',
        repo: 'alchaincyf/huashu-design',
        description: 'Claude Code 中 HTML-native 的设计 skill，覆盖高保真原型、幻灯片、动画和设计评审。',
        tags: ['HTML Design', 'Skill'],
        github: 'https://github.com/alchaincyf/huashu-design',
        icon: 'https://avatars.githubusercontent.com/u/127714341?v=4',
      },
      {
        name: 'cc-design',
        repo: 'ZeroZ-lab/cc-design',
        description: '面向 AI agents 的高保真 HTML 设计和原型指导 skill。',
        tags: ['Prototype', 'HTML'],
        github: 'https://github.com/ZeroZ-lab/cc-design',
        icon: 'https://avatars.githubusercontent.com/u/12062960?v=4',
      },
      {
        name: 'react-grab',
        repo: 'aidenybai/react-grab',
        description: '复制任意 UI 元素给 agent 使用，适合参考“从现有界面取样”的工作流。',
        tags: ['React', 'UI Capture'],
        github: 'https://github.com/aidenybai/react-grab',
        site: 'https://react-grab.com',
        icon: 'https://avatars.githubusercontent.com/u/38025074?v=4',
      },
    ],
  },
  {
    key: 'learning',
    title: '学习资料与训练场',
    summary: '这组资源适合新手或团队培训使用，重点不是工具清单，而是把 Agent、Claude Code、Harness 和 AI-native 能力讲成可练习路径。',
    resources: [
      {
        name: 'learn-claude-code',
        repo: 'shareAI-lab/learn-claude-code',
        description: '从 0 到 1 构建一个 nano Claude Code-like agent harness 的教程。',
        tags: ['Tutorial', 'Harness'],
        github: 'https://github.com/shareAI-lab/learn-claude-code',
        site: 'https://learn.shareai.run',
        icon: 'https://avatars.githubusercontent.com/u/189210346?v=4',
      },
      {
        name: 'easy-vibe',
        repo: 'datawhalechina/easy-vibe',
        description: '面向初学者的现代 AI Coding / vibe coding 课程。',
        tags: ['Course', 'Beginner'],
        github: 'https://github.com/datawhalechina/easy-vibe',
        site: 'https://datawhalechina.github.io/easy-vibe/',
        icon: 'https://avatars.githubusercontent.com/u/46047812?v=4',
      },
      {
        name: 'learn-harness-engineering',
        repo: 'walkinglabs/learn-harness-engineering',
        description: 'Harness engineering 风格的新手教程，适合理解 harness 这个概念如何落地。',
        tags: ['Harness', 'Course'],
        github: 'https://github.com/walkinglabs/learn-harness-engineering',
        site: 'https://walkinglabs.github.io/learn-harness-engineering/',
        icon: 'https://avatars.githubusercontent.com/u/271878417?v=4',
      },
      {
        name: 'claude-howto',
        repo: 'luongnv89/claude-howto',
        description: '图示化、示例驱动的 Claude Code 指南，包含基础概念和高级 agents。',
        tags: ['Guide', 'Claude Code'],
        github: 'https://github.com/luongnv89/claude-howto',
        site: 'http://luongnv.com/claude-howto/',
        icon: 'https://avatars.githubusercontent.com/u/3288457?v=4',
      },
      {
        name: 'ai-native-hiring-guide',
        repo: 'vorojar/ai-native-hiring-guide',
        description: 'AI-Native 工程师招聘和实操考核手册，适合团队定义 Builder / Reviewer 能力模型。',
        tags: ['Hiring', 'AI-native'],
        github: 'https://github.com/vorojar/ai-native-hiring-guide',
        site: 'https://vorojar.github.io/ai-native-hiring-guide/',
        icon: 'https://avatars.githubusercontent.com/u/130814500?v=4',
      },
      {
        name: 'harness-books',
        repo: 'wquguru/harness-books',
        description: 'Harness 相关学习资料集合，适合作为进一步阅读入口。',
        tags: ['Harness', 'Reading'],
        github: 'https://github.com/wquguru/harness-books',
        site: 'http://harness-books.agentway.dev/',
        icon: 'https://avatars.githubusercontent.com/u/209866177?v=4',
      },
      {
        name: 'OpenMAIC',
        repo: 'THU-MAIC/OpenMAIC',
        description: '多 Agent 互动课堂，用一键体验方式理解多 Agent 学习场景。',
        tags: ['Multi-agent', 'Classroom'],
        github: 'https://github.com/THU-MAIC/OpenMAIC',
        icon: 'https://avatars.githubusercontent.com/u/163809488?v=4',
      },
    ],
  },
]

const activeKey = ref(categories[0].key)
const activeCategory = computed(() => categories.find(category => category.key === activeKey.value) ?? categories[0])
const totalResources = computed(() => categories.reduce((total, category) => total + category.resources.length, 0))
</script>

<template>
  <section class="ai-resource-board" aria-label="AI Coding 资源目录">
    <header class="ai-resource-board__header">
      <div>
        <p>Curated from GitHub stars</p>
        <h2>按工程用途阅读，而不是按 star 数排序</h2>
      </div>
      <strong>{{ totalResources }} 个精选资源</strong>
    </header>

    <div class="ai-resource-board__tabs" role="tablist" aria-label="资源分类">
      <button
        v-for="category in categories"
        :key="category.key"
        type="button"
        :class="['ai-resource-board__tab', { 'ai-resource-board__tab--active': category.key === activeKey }]"
        role="tab"
        :aria-selected="category.key === activeKey"
        @click="activeKey = category.key"
      >
        <span>{{ category.title }}</span>
        <small>{{ category.resources.length }}</small>
      </button>
    </div>

    <section class="ai-resource-board__category">
      <div class="ai-resource-board__category-heading">
        <h3>{{ activeCategory.title }}</h3>
        <p>{{ activeCategory.summary }}</p>
      </div>

      <div class="ai-resource-board__grid">
        <article v-for="resource in activeCategory.resources" :key="resource.repo" class="ai-resource-card">
          <div class="ai-resource-card__top">
            <span class="ai-resource-card__icon">
              <span>{{ resource.name.slice(0, 1).toUpperCase() }}</span>
              <img :src="resource.icon" :alt="`${resource.name} icon`" loading="lazy">
            </span>
            <div>
              <strong>{{ resource.name }}</strong>
              <small>{{ resource.repo }}</small>
            </div>
          </div>
          <p>{{ resource.description }}</p>
          <div class="ai-resource-card__tags" aria-label="标签">
            <span v-for="tag in resource.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="ai-resource-card__links">
            <a :href="resource.github" target="_blank" rel="noreferrer">GitHub</a>
            <a v-if="resource.site" :href="resource.site" target="_blank" rel="noreferrer">官网/文档</a>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<style scoped>
.ai-resource-board {
  margin: 30px 0;
}

.ai-resource-board__header {
  display: flex;
  gap: 18px;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid color-mix(in oklch, var(--vp-c-divider) 86%, transparent);
}

.ai-resource-board__header p {
  margin: 0 0 8px;
  color: oklch(48% 0.13 174);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.ai-resource-board__header h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 28px;
  line-height: 1.25;
}

.ai-resource-board__header strong {
  flex: 0 0 auto;
  padding: 8px 11px;
  border: 1px solid color-mix(in oklch, oklch(67% 0.16 42) 42%, var(--vp-c-divider));
  border-radius: 8px;
  color: oklch(45% 0.13 42);
  font-size: 13px;
  line-height: 1.2;
  background: color-mix(in oklch, oklch(92% 0.05 65) 42%, var(--vp-c-bg));
}

.ai-resource-board__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0 24px;
}

.ai-resource-board__tab {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  min-height: 38px;
  padding: 8px 11px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 80%, transparent);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  font: inherit;
  font-size: 13px;
  line-height: 1.25;
  background: color-mix(in oklch, var(--vp-c-bg) 94%, white);
  cursor: pointer;
}

.ai-resource-board__tab small {
  display: grid;
  min-width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 999px;
  color: var(--vp-c-text-2);
  background: color-mix(in oklch, var(--vp-c-bg-soft) 92%, transparent);
}

.ai-resource-board__tab--active {
  border-color: color-mix(in oklch, oklch(54% 0.13 174) 62%, var(--vp-c-divider));
  color: var(--vp-c-text-1);
  background: color-mix(in oklch, oklch(92% 0.045 180) 48%, var(--vp-c-bg));
}

.ai-resource-board__tab--active small {
  color: white;
  background: oklch(48% 0.13 174);
}

.ai-resource-board__category-heading {
  max-width: 820px;
  margin-bottom: 18px;
}

.ai-resource-board__category-heading h3 {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
}

.ai-resource-board__category-heading p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.ai-resource-board__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.ai-resource-card {
  display: flex;
  min-width: 0;
  min-height: 238px;
  flex-direction: column;
  padding: 16px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(145deg, color-mix(in oklch, oklch(93% 0.03 206) 30%, transparent), transparent 46%),
    color-mix(in oklch, var(--vp-c-bg) 96%, white);
}

.ai-resource-card__top {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
}

.ai-resource-card__icon {
  position: relative;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  overflow: hidden;
  border-radius: 8px;
  color: oklch(45% 0.13 174);
  font-size: 17px;
  font-weight: 750;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(92% 0.045 180) 70%, var(--vp-c-bg)), color-mix(in oklch, oklch(93% 0.04 65) 55%, var(--vp-c-bg)));
  box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--vp-c-divider) 60%, transparent);
}

.ai-resource-card__icon img {
  position: absolute;
  inset: 0;
  width: 42px;
  height: 42px;
  object-fit: cover;
}

.ai-resource-card__top strong,
.ai-resource-card__top small {
  display: block;
  min-width: 0;
}

.ai-resource-card__top strong {
  overflow-wrap: anywhere;
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 1.3;
}

.ai-resource-card__top small {
  margin-top: 4px;
  overflow-wrap: anywhere;
  color: var(--vp-c-text-3);
  font-size: 12px;
  line-height: 1.35;
}

.ai-resource-card p {
  margin: 13px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.ai-resource-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 14px;
}

.ai-resource-card__tags span {
  padding: 4px 8px;
  border-radius: 999px;
  color: oklch(43% 0.13 252);
  font-size: 12px;
  line-height: 1.2;
  background: color-mix(in oklch, oklch(92% 0.045 252) 55%, var(--vp-c-bg));
}

.ai-resource-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.ai-resource-card__links a {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 6px 10px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 72%, transparent);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.25;
  text-decoration: none;
  background: color-mix(in oklch, var(--vp-c-bg) 96%, white);
}

.ai-resource-card__links a:hover {
  border-color: color-mix(in oklch, oklch(53% 0.13 174) 52%, var(--vp-c-divider));
  color: oklch(45% 0.13 174);
}

[data-theme="dark"] .ai-resource-board__header strong {
  color: oklch(78% 0.09 66);
  background: color-mix(in oklch, oklch(31% 0.04 66) 38%, var(--vp-c-bg));
}

[data-theme="dark"] .ai-resource-board__tab,
[data-theme="dark"] .ai-resource-card,
[data-theme="dark"] .ai-resource-card__links a {
  background: color-mix(in oklch, var(--vp-c-bg) 88%, oklch(23% 0.018 236));
}

[data-theme="dark"] .ai-resource-board__tab--active {
  background: color-mix(in oklch, oklch(28% 0.05 180) 52%, var(--vp-c-bg));
}

[data-theme="dark"] .ai-resource-card__tags span {
  color: oklch(80% 0.075 252);
  background: color-mix(in oklch, oklch(30% 0.055 252) 50%, var(--vp-c-bg));
}

@media (max-width: 780px) {
  .ai-resource-board__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .ai-resource-board__header h2 {
    font-size: 23px;
  }

  .ai-resource-board__grid {
    grid-template-columns: 1fr;
  }

  .ai-resource-card {
    min-height: 0;
  }
}

@media (max-width: 520px) {
  .ai-resource-board__tabs {
    display: grid;
    grid-template-columns: 1fr;
  }

  .ai-resource-board__tab {
    justify-content: space-between;
    width: 100%;
  }

  .ai-resource-card {
    padding: 14px;
  }
}
</style>
