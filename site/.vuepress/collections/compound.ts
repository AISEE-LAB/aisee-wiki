import { defineCollection } from 'vuepress-theme-plume'

export const compoundCollection = defineCollection({
  type: 'doc',
  dir: 'compound',
  linkPrefix: '/compound',
  title: 'Compound',
  sidebar: ['README.md'],
})

export const compoundEnCollection = defineCollection({
  type: 'doc',
  dir: 'compound',
  linkPrefix: '/compound',
  title: 'Compound',
  sidebar: ['README.md'],
})
