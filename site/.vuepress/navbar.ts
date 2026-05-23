/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'
import { primarySectionSlugs, secondarySectionSlugs, siteSections } from './ia'

const primarySections = siteSections.filter(section => primarySectionSlugs.includes(section.slug as typeof primarySectionSlugs[number]))
const secondarySections = siteSections.filter(section => secondarySectionSlugs.includes(section.slug as typeof secondarySectionSlugs[number]))

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  ...primarySections.map(section => ({ text: section.zh, link: `/${section.slug}/` })),
  {
    text: '更多',
    items: secondarySections.map(section => ({ text: section.zh, link: `/${section.slug}/` })),
  },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  ...primarySections.map(section => ({ text: section.en, link: `/en/${section.slug}/` })),
  {
    text: 'More',
    items: secondarySections.map(section => ({ text: section.en, link: `/en/${section.slug}/` })),
  },
])
