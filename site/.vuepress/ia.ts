export const siteSections = [
  {
    slug: 'learn',
    zh: '学习路径',
    en: 'Learn',
    role: '基础层与推荐阅读路径',
  },
  {
    slug: 'openspec',
    zh: 'OpenSpec',
    en: 'OpenSpec',
    role: '核心主线',
  },
  {
    slug: 'compound',
    zh: 'Compound',
    en: 'Compound',
    role: '核心主线',
  },
  {
    slug: 'aisee',
    zh: 'aisee',
    en: 'aisee',
    role: 'skill 生态与方法链路入口',
  },
  {
    slug: 'workflows',
    zh: '工程流程',
    en: 'Workflows',
    role: '综合实践与流程说明',
  },
  {
    slug: 'thinking',
    zh: '观点文章',
    en: 'Thinking',
    role: '观点、案例和文章型内容',
  },
  {
    slug: 'resources',
    zh: '资源中心',
    en: 'Resources',
    role: '模板、术语、命令、检查清单等资源',
  },
] as const

export const primarySectionSlugs = ['learn', 'openspec', 'compound', 'aisee', 'workflows', 'resources'] as const

export const secondarySectionSlugs = ['thinking'] as const
