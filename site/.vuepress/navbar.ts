/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'
import { siteSections } from './ia'

const navbarSectionSlugs = ['learn', 'ai-engineering', 'projects', 'resources'] as const
const navbarSectionIcons = {
  learn: 'lucide:book-open',
  'ai-engineering': 'lucide:brain-circuit',
  projects: 'lucide:folder-git-2',
  resources: 'lucide:library-big',
} as const
const navbarSections = navbarSectionSlugs.map((slug) => {
  const section = siteSections.find(item => item.slug === slug)

  if (!section)
    throw new Error(`Missing navbar section: ${slug}`)

  return section
})

const zhSectionNavbar = navbarSections.map(section => ({
  text: section.zh,
  link: `/${section.slug}/`,
  icon: navbarSectionIcons[section.slug],
}))
const enSectionNavbar = navbarSections.map(section => ({
  text: section.en,
  link: `/en/${section.slug}/`,
  icon: navbarSectionIcons[section.slug],
}))
const homeNavbarIcon = 'lucide:house'
const aiseeNavbarIcon = 'lucide:workflow'
const aiseePluginNavbarIcon = 'lucide:puzzle'
const openspecNavbarIcon = 'lucide:file-check-2'
const compoundNavbarIcon = 'lucide:layers-3'

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: homeNavbarIcon },
  zhSectionNavbar[0],
  zhSectionNavbar[1],
  {
    text: 'AISEE',
    icon: aiseeNavbarIcon,
    items: [
      { text: 'AISEE Plugin', link: '/aisee/workflows/', icon: aiseePluginNavbarIcon },
      { text: 'OpenSpec', link: '/openspec/', icon: openspecNavbarIcon },
      { text: 'Compound Engineering', link: '/compound/', icon: compoundNavbarIcon },
    ],
  },
  zhSectionNavbar[2],
  zhSectionNavbar[3],
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/', icon: homeNavbarIcon },
  enSectionNavbar[0],
  enSectionNavbar[1],
  {
    text: 'AISEE',
    icon: aiseeNavbarIcon,
    items: [
      { text: 'AISEE Plugin', link: '/en/aisee/workflows/', icon: aiseePluginNavbarIcon },
      { text: 'OpenSpec', link: '/en/openspec/', icon: openspecNavbarIcon },
      { text: 'Compound Engineering', link: '/en/compound/', icon: compoundNavbarIcon },
    ],
  },
  enSectionNavbar[2],
  enSectionNavbar[3],
])
