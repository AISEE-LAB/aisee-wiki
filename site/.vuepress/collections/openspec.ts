import { defineCollection } from 'vuepress-theme-plume'

export const openspecCollection = defineCollection({
  type: 'doc',
  dir: 'openspec',
  linkPrefix: '/openspec',
  title: 'OpenSpec',
  sidebar: [
    'README.md',
    {
      text: '作用',
      items: [
        { text: 'OpenSpec 是什么', link: '/openspec/what-is-openspec/' },
      ],
    },
    {
      text: '模型',
      items: [
        { text: '心智模型', link: '/openspec/mental-model/' },
      ],
    },
    {
      text: '用法',
      items: [
        { text: '基础工作流', link: '/openspec/workflow/' },
      ],
    },
  ],
})

export const openspecEnCollection = defineCollection({
  type: 'doc',
  dir: 'openspec',
  linkPrefix: '/openspec',
  title: 'OpenSpec',
  sidebar: ['README.md'],
})
