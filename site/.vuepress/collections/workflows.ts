import { defineCollection } from 'vuepress-theme-plume'

export const workflowsCollection = defineCollection({
  type: 'doc',
  dir: 'workflows',
  linkPrefix: '/workflows',
  title: '工程流程',
  sidebar: ['README.md', 'flow-explainer'],
})

export const workflowsEnCollection = defineCollection({
  type: 'doc',
  dir: 'workflows',
  linkPrefix: '/workflows',
  title: 'Workflows',
  sidebar: ['README.md'],
})
