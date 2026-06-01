import { defineCollection } from 'vuepress-theme-plume'

export const resourcesCollection = defineCollection({
  type: 'doc',
  dir: 'resources',
  linkPrefix: '/resources',
  title: '推荐资源',
  sidebar: ['README.md'],
})

export const resourcesEnCollection = defineCollection({
  type: 'doc',
  dir: 'resources',
  linkPrefix: '/resources',
  title: 'Recommended Resources',
  sidebar: ['README.md'],
})
