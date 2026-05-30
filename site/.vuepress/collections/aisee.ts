import { defineCollection } from 'vuepress-theme-plume'

export const aiseeCollection = defineCollection({
  type: 'doc',
  dir: 'aisee',
  linkPrefix: '/aisee',
  title: 'AISEE',
  sidebar: [
    'README.md',
    {
      text: '工程流程',
      items: [
        { text: '流程总览', link: '/aisee/workflows/' },
        { text: '流程讲解组件示例', link: '/aisee/workflows/flow-explainer/' },
      ],
    },
  ],
})

export const aiseeEnCollection = defineCollection({
  type: 'doc',
  dir: 'aisee',
  linkPrefix: '/aisee',
  title: 'AISEE',
  sidebar: [
    'README.md',
    {
      text: 'Workflows',
      items: [
        { text: 'Overview', link: '/en/aisee/workflows/' },
      ],
    },
  ],
})
