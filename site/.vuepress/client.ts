import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

import HomePage from './theme/components/HomePage.vue'
import FlowExplainer from './theme/components/FlowExplainer.vue'
import LearningFlow from './theme/components/LearningFlow.vue'
import DocFlow from './theme/components/doc-flow/DocFlow.vue'
import ToolLogoGrid from './theme/components/ToolLogoGrid.vue'
import ToolCompareMatrix from './theme/components/ToolCompareMatrix.vue'
import DiagramFigure from './theme/components/DiagramFigure.vue'
import LearnPathIndex from './theme/components/LearnPathIndex.vue'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
// import CustomComponent from './theme/components/Custom.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    app.component('HomePage', HomePage)
    app.component('FlowExplainer', FlowExplainer)
    app.component('LearningFlow', LearningFlow)
    app.component('DocFlow', DocFlow)
    app.component('ToolLogoGrid', ToolLogoGrid)
    app.component('ToolCompareMatrix', ToolCompareMatrix)
    app.component('DiagramFigure', DiagramFigure)
    app.component('LearnPathIndex', LearnPathIndex)
    // app.component('CustomComponent', CustomComponent)
  },
})
