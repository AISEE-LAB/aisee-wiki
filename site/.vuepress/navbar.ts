/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'
import { siteSections } from './ia'

const navbarSectionSlugs = ['learn', 'ai-engineering', 'projects', 'resources'] as const
const navbarSections = navbarSectionSlugs.map((slug) => {
  const section = siteSections.find(item => item.slug === slug)

  if (!section)
    throw new Error(`Missing navbar section: ${slug}`)

  return section
})

const zhSectionNavbar = navbarSections.map(section => ({ text: section.zh, link: `/${section.slug}/` }))
const enSectionNavbar = navbarSections.map(section => ({ text: section.en, link: `/en/${section.slug}/` }))

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  zhSectionNavbar[0],
  zhSectionNavbar[1],
  {
    text: 'AISEE',
    items: [
      { text: 'AISEE Plugin', link: '/aisee/workflows/' },
      { text: 'OpenSpec', link: '/openspec/' },
      { text: 'Compound Engineering', link: '/compound/' },
    ],
  },
  zhSectionNavbar[2],
  zhSectionNavbar[3],
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  enSectionNavbar[0],
  enSectionNavbar[1],
  {
    text: 'AISEE',
    items: [
      { text: 'AISEE Plugin', link: '/en/aisee/workflows/' },
      { text: 'OpenSpec', link: '/en/openspec/' },
      { text: 'Compound Engineering', link: '/en/compound/' },
    ],
  },
  enSectionNavbar[2],
  enSectionNavbar[3],
])
