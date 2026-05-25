import { defineCollection } from 'vuepress-theme-plume'

export const learnCollection = defineCollection({
  type: 'doc',
  dir: 'learn',
  linkPrefix: '/learn',
  title: '学习路径',
  sidebar: [
    'README.md',
    {
      text: '认知入门',
      items: [
        'ai-coding-intro.md',
        'tools-and-models.md',
      ],
    },
    {
      text: '工具上手',
      items: [
        'dev-environment.md',
        'codex-setup.md',
        'first-ai-coding-project.md',
      ],
    },
    {
      text: 'Agent 进阶',
      items: [
        'agent-basics.md',
        'agent-memory.md',
        'skills.md',
        'mcp.md',
        'agent-tools.md',
        'hooks.md',
        'agent-components.md',
      ],
    },
  ],
})

export const learnEnCollection = defineCollection({
  type: 'doc',
  dir: 'learn',
  linkPrefix: '/learn',
  title: 'Learn',
  sidebar: ['README.md'],
})
