/**
 * @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。
 *
 * Collections 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineCollections } from 'vuepress-theme-plume'
import { aiseeCollection, aiseeEnCollection } from './collections/aisee'
import { compoundCollection, compoundEnCollection } from './collections/compound'
import { learnCollection, learnEnCollection } from './collections/learn'
import { openspecCollection, openspecEnCollection } from './collections/openspec'
import { resourcesCollection, resourcesEnCollection } from './collections/resources'
import { thinkingCollection, thinkingEnCollection } from './collections/thinking'
import { workflowsCollection, workflowsEnCollection } from './collections/workflows'

export const zhCollections = defineCollections([
  learnCollection,
  openspecCollection,
  compoundCollection,
  aiseeCollection,
  workflowsCollection,
  resourcesCollection,
  thinkingCollection,
])

export const enCollections = defineCollections([
  learnEnCollection,
  openspecEnCollection,
  compoundEnCollection,
  aiseeEnCollection,
  workflowsEnCollection,
  resourcesEnCollection,
  thinkingEnCollection,
])
