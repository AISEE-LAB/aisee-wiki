import { defineCollection } from 'vuepress-theme-plume'

export const learnCollection = defineCollection({
  type: 'doc',
  dir: 'learn',
  linkPrefix: '/learn',
  title: '学习路径',
  sidebar: ['README.md'],
})

export const learnEnCollection = defineCollection({
  type: 'doc',
  dir: 'learn',
  linkPrefix: '/learn',
  title: 'Learn',
  sidebar: ['README.md'],
})
