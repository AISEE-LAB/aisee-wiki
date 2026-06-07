import { defineCollection } from 'vuepress-theme-plume'

export const learnCollection = defineCollection({
  type: 'doc',
  dir: 'learn',
  linkPrefix: '/learn',
  title: '指南',
  sidebar: [
    'README.md',
    {
      text: '认知',
      items: [
        { text: 'AI Coding 变了什么', link: '/learn/ai-coding-intro/' },
        { text: '工具与模型怎么选', link: '/learn/tools-and-models/' },
      ],
    },
    {
      text: '上手',
      items: [
        { text: '运行环境准备', link: '/learn/runtime-setup/' },
        { text: 'Codex 第一次运行', link: '/learn/codex-setup/' },
        { text: '第一个项目：复刻网站', link: '/learn/first-ai-project/' },
      ],
    },
    {
      text: '进阶',
      items: [
        { text: 'Agent 怎么工作', link: '/learn/agent-basics/' },
        { text: 'Memory：持续上下文', link: '/learn/agent-memory/' },
        { text: 'Skill：复用经验', link: '/learn/skills/' },
        { text: 'MCP：连接外部能力', link: '/learn/mcp/' },
        { text: 'Tool：执行动作接口', link: '/learn/tool-calls/' },
        { text: 'Hook：自动检查与约束', link: '/learn/hooks/' },
        { text: 'Agent 编排协作', link: '/learn/agent-orchestration/' },
      ],
    },
  ],
})

export const learnEnCollection = defineCollection({
  type: 'doc',
  dir: 'learn',
  linkPrefix: '/learn',
  title: 'Guides',
  sidebar: ['README.md'],
})
