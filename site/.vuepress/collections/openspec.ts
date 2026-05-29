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
    {
      text: '模型',
      items: [
        { text: '心智模型', link: '/openspec/mental-model/' },
      ],
    },
    {
      text: '用法',
      items: [
        { text: '基础工作流', link: '/openspec/workflow/' },
        { text: 'Artifact 写法指南', link: '/openspec/artifact-guide/' },
        { text: 'Spec 粒度设计', link: '/openspec/spec-granularity/' },
        { text: 'Delta Spec 深度解析', link: '/openspec/delta-spec/' },
      ],
    },
    {
      text: '扩展',
      items: [
        { text: 'OpenSpec Schema 是什么', link: '/openspec/schema/' },
      ],
    },
    {
      text: '边界',
      items: [
        { text: 'OpenSpec 的适用边界', link: '/openspec/boundaries/' },
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
