import { defineCollection } from 'vuepress-theme-plume'

export const aiEngineeringCollection = defineCollection({
  type: 'doc',
  dir: 'ai-engineering',
  linkPrefix: '/ai-engineering',
  title: 'AI Engineering',
  sidebar: [
    'README.md',
    {
      text: '方法基础',
      items: [
        { text: '传统与 AI 增强', link: '/ai-engineering/traditional-vs-ai-engineering/' },
        { text: '从传统流程到 AISEE', link: '/ai-engineering/from-traditional-flow-to-aisee/' },
        { text: 'AI 没有改变什么', link: '/ai-engineering/what-does-not-change/' },
        { text: '工程师新职责', link: '/ai-engineering/engineer-role/' },
      ],
    },
    {
      text: '三条主线',
      items: [
        { text: '从 Prompt 到 Spec', link: '/ai-engineering/prompt-to-spec/' },
        { text: '从 Tool 到 Harness', link: '/ai-engineering/tool-to-harness/' },
        { text: '从经验到复利', link: '/ai-engineering/experience-to-compounding/' },
      ],
    },
  ],
})

export const aiEngineeringEnCollection = defineCollection({
  type: 'doc',
  dir: 'ai-engineering',
  linkPrefix: '/ai-engineering',
  title: 'AI Engineering',
  sidebar: ['README.md'],
})
