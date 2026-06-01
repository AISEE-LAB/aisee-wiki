/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'
import { siteSections } from './ia'

const navbarSectionSlugs = ['learn', 'ai-engineering', 'openspec', 'compound', 'aisee', 'resources'] as const
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
  ...zhSectionNavbar,
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  ...enSectionNavbar,
])
