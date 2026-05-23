import { defineCollection } from 'vuepress-theme-plume'

export const resourcesCollection = defineCollection({
  type: 'doc',
  dir: 'resources',
  linkPrefix: '/resources',
  title: '资源中心',
  sidebar: ['README.md', 'glossary', 'reading-path'],
})

export const resourcesEnCollection = defineCollection({
  type: 'doc',
  dir: 'resources',
  linkPrefix: '/resources',
  title: 'Resources',
  sidebar: ['README.md', 'glossary', 'reading-path'],
})
