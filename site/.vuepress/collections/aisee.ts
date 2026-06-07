import { defineCollection } from 'vuepress-theme-plume'

export const aiseeCollection = defineCollection({
  type: 'doc',
  dir: 'aisee',
  linkPrefix: '/aisee',
  title: 'AISEE',
  sidebar: [
    'README.md',
    {
      text: 'AISEE Plugin',
      items: [
        { text: 'AISEE Plugin', link: '/aisee/workflows/' },
      ],
    },
    {
      text: 'OpenSpec',
      items: [
        { text: 'OpenSpec', link: '/openspec/' },
        { text: '基础工作流', link: '/openspec/workflow/' },
        { text: 'Artifact 写法', link: '/openspec/artifact-guide/' },
      ],
    },
    {
      text: 'Compound Engineering',
      items: [
        { text: 'Compound Engineering', link: '/compound/' },
        { text: '工程复利循环', link: '/compound/workflow-loop/' },
        { text: '与 OpenSpec 配合', link: '/compound/with-openspec/' },
      ],
    },
  ],
})

export const aiseeEnCollection = defineCollection({
  type: 'doc',
  dir: 'aisee',
  linkPrefix: '/aisee',
  title: 'AISEE',
  sidebar: [
    'README.md',
    {
      text: 'AISEE Plugin',
      items: [
        { text: 'Overview', link: '/en/aisee/workflows/' },
      ],
    },
    {
      text: 'OpenSpec',
      items: [
        { text: 'OpenSpec', link: '/en/openspec/' },
      ],
    },
    {
      text: 'Compound Engineering',
      items: [
        { text: 'Compound Engineering', link: '/en/compound/' },
      ],
    },
  ],
})
