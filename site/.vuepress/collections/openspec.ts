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
  ],
})

export const openspecEnCollection = defineCollection({
  type: 'doc',
  dir: 'openspec',
  linkPrefix: '/openspec',
  title: 'OpenSpec',
  sidebar: ['README.md'],
})
