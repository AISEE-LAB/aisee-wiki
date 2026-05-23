import { defineCollection } from 'vuepress-theme-plume'

export const openspecCollection = defineCollection({
  type: 'doc',
  dir: 'openspec',
  linkPrefix: '/openspec',
  title: 'OpenSpec',
  sidebar: ['README.md'],
})

export const openspecEnCollection = defineCollection({
  type: 'doc',
  dir: 'openspec',
  linkPrefix: '/openspec',
  title: 'OpenSpec',
  sidebar: ['README.md'],
})
