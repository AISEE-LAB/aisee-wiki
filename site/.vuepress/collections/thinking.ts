import { defineCollection } from 'vuepress-theme-plume'

export const thinkingCollection = defineCollection({
  type: 'post',
  dir: 'thinking',
  title: '观点文章',
  link: '/thinking/articles/',
  linkPrefix: '/thinking',
  tagsLink: '/thinking/articles/tags/',
  archivesLink: '/thinking/articles/archives/',
  categoriesLink: '/thinking/articles/categories/',
  exclude: ['README.md'],
})

export const thinkingEnCollection = defineCollection({
  type: 'post',
  dir: 'thinking',
  title: 'Thinking',
  link: '/thinking/articles/',
  linkPrefix: '/thinking',
  tagsLink: '/thinking/articles/tags/',
  archivesLink: '/thinking/articles/archives/',
  categoriesLink: '/thinking/articles/categories/',
  exclude: ['README.md'],
})
