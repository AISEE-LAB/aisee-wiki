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
import AiCodingIntroPanel from './theme/components/AiCodingIntroPanel.vue'
import ModelDecisionBoard from './theme/components/ModelDecisionBoard.vue'
import ToolEntryBoard from './theme/components/ToolEntryBoard.vue'
import BenchmarkSnapshot from './theme/components/BenchmarkSnapshot.vue'
import RecommendedCombos from './theme/components/RecommendedCombos.vue'
import RuntimeSetupBoard from './theme/components/RuntimeSetupBoard.vue'
import ProjectModuleBoard from './theme/components/ProjectModuleBoard.vue'
import ProjectLoopBoard from './theme/components/ProjectLoopBoard.vue'
import AgentBasicsBoard from './theme/components/AgentBasicsBoard.vue'
import MemoryLayerBoard from './theme/components/MemoryLayerBoard.vue'
import SkillBoard from './theme/components/SkillBoard.vue'
import ToolCallBoard from './theme/components/ToolCallBoard.vue'
import CodexHookEventBoard from './theme/components/CodexHookEventBoard.vue'
import AiCodingResourceBoard from './theme/components/AiCodingResourceBoard.vue'
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
    app.component('AiCodingIntroPanel', AiCodingIntroPanel)
    app.component('ModelDecisionBoard', ModelDecisionBoard)
    app.component('ToolEntryBoard', ToolEntryBoard)
    app.component('BenchmarkSnapshot', BenchmarkSnapshot)
    app.component('RecommendedCombos', RecommendedCombos)
    app.component('RuntimeSetupBoard', RuntimeSetupBoard)
    app.component('ProjectModuleBoard', ProjectModuleBoard)
    app.component('ProjectLoopBoard', ProjectLoopBoard)
    app.component('AgentBasicsBoard', AgentBasicsBoard)
    app.component('MemoryLayerBoard', MemoryLayerBoard)
    app.component('SkillBoard', SkillBoard)
    app.component('ToolCallBoard', ToolCallBoard)
    app.component('CodexHookEventBoard', CodexHookEventBoard)
    app.component('AiCodingResourceBoard', AiCodingResourceBoard)
    // app.component('CustomComponent', CustomComponent)
  },
})
