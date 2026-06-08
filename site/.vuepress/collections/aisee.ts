import { defineCollection } from 'vuepress-theme-plume'

export const aiseeCollection = defineCollection({
  type: 'doc',
  dir: 'aisee',
  linkPrefix: '/aisee',
  title: 'AISEE',
  sidebar: [
    {
      text: '栏目首页',
      items: [
        { text: 'AISEE', link: '/aisee/' },
      ],
    },
    {
      text: '总览',
      items: [
        { text: 'AISEE Plugin', link: '/aisee/aisee-plugin/' },
      ],
    },
    {
      text: '前置澄清与规划',
      items: [
        { text: '从意图到 Change', link: '/aisee/aisee-plugin/from-intent-to-change/' },
        { text: 'Schema Packs 与 Authoring', link: '/aisee/aisee-plugin/schema-packs-and-authoring/' },
      ],
    },
    {
      text: '上下文与执行',
      items: [
        { text: 'Context Packs 与 Contracts', link: '/aisee/aisee-plugin/context-packs-and-contracts/' },
      ],
    },
    {
      text: '验证与沉淀',
      items: [
        { text: 'Team Knowledge Guardrails', link: '/aisee/aisee-plugin/team-knowledge-guardrails/' },
        { text: 'Verify 与 Archive Guard', link: '/aisee/aisee-plugin/verify-and-archive-guard/' },
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
    {
      text: 'Section Home',
      items: [
        { text: 'AISEE', link: '/en/aisee/' },
      ],
    },
    {
      text: 'Overview',
      items: [
        { text: 'Overview', link: '/en/aisee/aisee-plugin/' },
      ],
    },
  ],
})
