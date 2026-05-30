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
  ],
})

export const compoundEnCollection = defineCollection({
  type: 'doc',
  dir: 'compound',
  linkPrefix: '/compound',
  title: 'Compound',
  sidebar: ['README.md'],
})
