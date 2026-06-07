import { defineCollection } from 'vuepress-theme-plume'

export const projectsCollection = defineCollection({
  type: 'doc',
  dir: 'projects',
  linkPrefix: '/projects',
  title: '开源项目',
  sidebar: ['README.md'],
})

export const projectsEnCollection = defineCollection({
  type: 'doc',
  dir: 'projects',
  linkPrefix: '/projects',
  title: 'Open Source',
  sidebar: ['README.md'],
})
