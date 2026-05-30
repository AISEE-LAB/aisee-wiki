import { defineCollection } from 'vuepress-theme-plume'

export const compoundCollection = defineCollection({
  type: 'doc',
  dir: 'compound',
  linkPrefix: '/compound',
  title: 'Compound Engineering',
  sidebar: [
    'README.md',
    {
      text: '总览',
      items: [
        { text: 'Compound Engineering 是什么', link: '/compound/what-is-compound-engineering/' },
        { text: '工程复利核心循环', link: '/compound/workflow-loop/' },
      ],
    },
    {
      text: '定义与计划',
      items: [
        { text: '策略、构思与计划', link: '/compound/strategy-brainstorm-plan/' },
      ],
    },
    {
      text: '执行与质量',
      items: [
        { text: '执行、调试与评审', link: '/compound/work-debug-review/' },
      ],
    },
    {
      text: '多智能体',
      items: [
        { text: '多智能体评审是什么', link: '/compound/multi-agent-review/' },
        { text: 'Reviewer Personas', link: '/compound/reviewer-personas/' },
        { text: '文档评审智能体', link: '/compound/document-review-agents/' },
        { text: '设计与 UI 评审智能体', link: '/compound/design-review-agents/' },
        { text: '研究型智能体', link: '/compound/research-agents/' },
        { text: '多智能体如何协作', link: '/compound/agent-orchestration/' },
      ],
    },
  ],
})

export const compoundEnCollection = defineCollection({
  type: 'doc',
  dir: 'compound',
  linkPrefix: '/compound',
  title: 'Compound',
  sidebar: ['README.md'],
})
