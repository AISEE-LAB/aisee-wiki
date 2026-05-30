<script setup lang="ts">
import { computed } from 'vue'
import {
  Boxes,
  CircuitBoard,
  CircleDot,
  Cpu,
  FileCheck2,
  FileText,
  GitBranch,
  Globe2,
  LibraryBig,
  Lightbulb,
  Monitor,
  Network,
  PackageCheck,
  PenLine,
  Radar,
  Smartphone,
  Workflow,
} from 'lucide-vue-next'

import UiButton from './ui/UiButton.vue'

const props = defineProps<{
  locale?: 'zh' | 'en'
}>()

const isEn = computed(() => props.locale === 'en')
const domainIcons = [Globe2, Smartphone, Monitor, Cpu, CircuitBoard, Workflow]
const principleIcons = [FileText, PenLine, PackageCheck, LibraryBig]
const pillarIcons = [FileCheck2, GitBranch, Boxes]
const openIcons = [PenLine, Lightbulb, Workflow, Network]

const content = computed(() => {
  if (isEn.value) {
    return {
      eyebrow: 'AI-enhanced software engineering',
      title: 'Software engineering methodology for the AI era',
      subtitle: 'Using OpenSpec and Compound Engineering as core references, AI SEE Wiki explores methods for AI-enhanced software engineering and uses the AISEE working mechanism to turn requirements, design, verification, and reflection into reusable practice.',
      note: 'English content is being prepared. This page keeps the same structure as the Chinese homepage while the Chinese methodology articles are completed first.',
      primary: 'Start reading',
      secondary: 'View methodology map',
      domainCta: 'View all domains',
      visual: {
        insightTitle: 'Requirement Insight',
        insightItems: ['User needs', 'Business goals', 'Constraints'],
        specTitle: 'OpenSpec',
        specNodes: ['Need', 'Design', 'API', 'Test'],
        executionTitle: 'Engineering Execution',
        executionNodes: ['Plan', 'Code', 'Build', 'Verify', 'Ship'],
        reviewTitle: 'Review and Reflection',
        reviewNodes: ['Code review', 'Design review', 'Retrospective', 'Root cause'],
        knowledgeTitle: 'Knowledge Compounding',
        knowledgeNodes: ['Spec library', 'Component library', 'Cases', 'Templates', 'Assets'],
      },
      domainsTitle: 'AI is enhancing every kind of engineering',
      domainsText: 'The domains differ, but the engineering base is shared: clear inputs, explicit constraints, verifiable outputs, and reusable knowledge.',
      domains: [
        ['Web', 'Interfaces, components, services'],
        ['App', 'Mobile experience and platform flows'],
        ['Desktop', 'Local capability and cross-platform tools'],
        ['Embedded', 'Constraints, interfaces, firmware flows'],
        ['Hardware', 'Design, drivers, and validation loops'],
        ['Complex Systems', 'Business systems that must evolve'],
      ],
      methodTitle: 'Powerful tools still need effective ways of use',
      methodText: 'AI tools become more useful when teams know how to frame problems, set boundaries, verify outputs, and turn experience into reusable practice.',
      principles: [
        ['Requirement Contract', 'Clarify what should be built and where the boundary is.'],
        ['Design Boundary', 'Constrain choices before generation starts.'],
        ['Verification Gate', 'Make quality measurable and reviewable.'],
        ['Knowledge Compounding', 'Turn experience into reusable assets.'],
      ],
      pillarsTitle: 'Three core threads',
      pillars: [
        ['OpenSpec', 'Specification layer and source of truth', '/en/openspec/'],
        ['Compound Engineering', 'Harness and knowledge compounding', '/en/compound/'],
        ['AISEE mechanism', 'An evolving working mechanism integrated with OpenSpec', '/en/aisee/'],
      ],
      pathTitle: 'Recommended learning path',
      path: ['Foundations', 'Spec-first', 'OpenSpec', 'Harness', 'Verification', 'Knowledge', 'Practice'],
      openTitle: 'Open collaboration',
      openText: 'AI SEE Wiki is an open engineering knowledge base. Contributions can start from corrections, cases, workflow templates, terminology, and references.',
      openItems: [
        ['Documentation edits', 'Fix wording, structure, and examples.'],
        ['Real cases', 'Share project experience and lessons.'],
        ['Workflow / skill / schema', 'Contribute reusable engineering assets.'],
        ['Terminology and references', 'Improve shared language and sources.'],
      ],
      guideLink: '/en/learn/',
      resourcesLink: '/en/resources/',
      workflowLink: '/en/aisee/',
    }
  }

  return {
    eyebrow: 'AI 增强软件工程',
    title: 'AI 时代的软件工程方法论',
    subtitle: '以 OpenSpec 和 Compound Engineering 为核心参照，探索 AI 增强软件工程的方法论，并通过 AISEE 工作机制把需求、设计、验证和复盘沉淀为可复用实践。',
    note: '工具和技能固然强大，但真正决定上限的是方法论。没有需求契约，AI 会放大模糊；没有验证 gate，AI 会制造不确定性；没有知识沉淀，AI 协作就只是一次性消耗。',
    primary: '开始阅读',
    secondary: '查看方法论地图',
    domainCta: '查看全部领域',
    visual: {
      insightTitle: '需求洞察',
      insightItems: ['用户需求', '业务目标', '约束与假设'],
      specTitle: 'OpenSpec（规范先行）',
      specNodes: ['需求 Spec', '设计 Spec', '接口 Spec', '测试 Spec'],
      executionTitle: '工程执行（AI 增强）',
      executionNodes: ['设计与规划', '编码实现', '集成构建', '测试验证', '发布部署'],
      reviewTitle: '评审与复盘（持续改进）',
      reviewNodes: ['代码评审', '设计评审', '回顾复盘', '问题归因'],
      knowledgeTitle: '知识复利（持续沉淀）',
      knowledgeNodes: ['规范库', '组件库', '最佳实践', '模式与模板', '经验资产'],
    },
    domainsTitle: 'AI 正在增强每一种工程开发',
    domainsText: 'Web、App、Desktop、嵌入式、硬件编程和复杂业务系统的对象不同，但共同底座都是清晰输入、明确约束、可验证输出和可复用知识。',
    domains: [
      ['Web 开发', '界面、组件、服务与体验验证'],
      ['App 开发', '移动体验、平台能力和发布流程'],
      ['Desktop 开发', '本地能力、自动化和跨平台工具'],
      ['嵌入式程序开发', '约束建模、接口契约和固件流程'],
      ['硬件编程', '设计、驱动、测试和工程协作'],
      ['复杂业务系统', '需求拆分、长期维护和演进治理'],
    ],
    methodTitle: '工具强，也需要掌握高效使用的方法',
    methodText: 'AI 工具越强，越需要知道如何提出问题、设置边界、验证结果，并把经验沉淀为可复用实践。',
    principles: [
      ['需求契约', '用 Spec 明确要做什么，形成可协商、可追溯的边界。'],
      ['设计边界', '在实现前选择设计与取舍，保持一致性与可组合性。'],
      ['验证 gate', '用可执行检查守住质量，不满足就回到上一环。'],
      ['知识沉淀', '复盘、模板和经验资产驱动下一轮更快更稳。'],
    ],
    pillarsTitle: '三条核心主线',
    pillars: [
      ['OpenSpec', '规范层与事实源', '/openspec/'],
      ['Compound Engineering', 'Harness 与知识复利', '/compound/'],
      ['AISEE 工作机制', '与 OpenSpec 融合的探索性实践', '/aisee/'],
    ],
    pathTitle: '推荐学习路径',
    path: ['基础能力', 'Spec-first', 'OpenSpec', 'Harness', '验证闭环', '知识复利', '综合实践'],
    openTitle: '开放协作',
    openText: 'AI SEE Wiki 是开放的工程知识库，欢迎从文档修订、真实案例、workflow / skill / schema 模板、术语与参考资料开始参与。',
    openItems: [
      ['文档修订', '修正表述、补充内容、优化表达与结构。'],
      ['真实案例', '分享实践经验、项目案例、踩坑与解决方案。'],
      ['workflow / skill / schema 模板', '贡献高质量模板，促进最佳实践沉淀。'],
      ['术语与参考资料', '完善术语解释、参考资料、外部链接与原则来源。'],
    ],
    guideLink: '/learn/',
    resourcesLink: '/resources/',
    workflowLink: '/aisee/',
  }
})
</script>

<template>
  <main class="aisee-home">
    <section class="home-hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ content.eyebrow }}</p>
        <h1 v-if="isEn">
          <span>Software engineering</span>
          <span>methodology</span>
          <span>for the AI era</span>
        </h1>
        <h1 v-else class="hero-title-zh">
          <span><em>AI</em> 时代的</span>
          <span>软件工程方法论</span>
        </h1>
        <p class="hero-subtitle">{{ content.subtitle }}</p>
        <div class="hero-actions">
          <a class="action" :href="content.guideLink">
            <UiButton>
              <FileCheck2 :size="18" />
              {{ content.primary }}
            </UiButton>
          </a>
          <a class="action" :href="content.workflowLink">
            <UiButton variant="secondary">
              <GitBranch :size="18" />
              {{ content.secondary }}
            </UiButton>
          </a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="method-map">
          <div class="method-map__core">
            <span><Boxes :size="22" /></span>
            <div>
              <strong>{{ isEn ? 'Method layer' : '方法论层' }}</strong>
              <p>{{ isEn ? 'Keep AI work inside a verifiable engineering loop.' : '把 AI 协作放进可验证的工程闭环。' }}</p>
            </div>
          </div>

          <div class="method-flow">
            <article class="method-node method-node--one">
              <span class="method-node__icon"><Radar :size="20" /></span>
              <div>
                <strong>{{ content.visual.insightTitle }}</strong>
                <p>{{ isEn ? 'Clarify needs, goals, and constraints.' : '先说清需求、目标和约束。' }}</p>
              </div>
            </article>

            <article class="method-node method-node--two">
              <span class="method-node__icon"><FileCheck2 :size="20" /></span>
              <div>
                <strong>{{ content.visual.specTitle }}</strong>
                <p>{{ isEn ? 'Turn intent into an explicit contract.' : '把意图写成可协商的契约。' }}</p>
              </div>
            </article>

            <article class="method-node method-node--three">
              <span class="method-node__icon method-node__icon--amber"><CircleDot :size="20" /></span>
              <div>
                <strong>{{ isEn ? 'Verification gate' : '验证 gate' }}</strong>
                <p>{{ isEn ? 'Use checks and review before moving on.' : '用检查与评审决定是否继续。' }}</p>
              </div>
            </article>

            <article class="method-node method-node--four method-node--deep">
              <span class="method-node__icon method-node__icon--deep"><LibraryBig :size="20" /></span>
              <div>
                <strong>{{ content.visual.knowledgeTitle }}</strong>
                <p>{{ isEn ? 'Feed proven practice into the next cycle.' : '把有效经验反哺下一轮工程。' }}</p>
              </div>
            </article>
          </div>

          <div class="method-map__ticks">
            <span v-for="item in content.visual.executionNodes.slice(0, 4)" :key="item">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section domains-section">
      <div class="section-heading section-heading-row">
        <div>
          <h2>{{ content.domainsTitle }}</h2>
          <p>{{ content.domainsText }}</p>
        </div>
        <a :href="content.guideLink">{{ content.domainCta }}</a>
      </div>
      <div class="domain-grid">
        <article v-for="(item, index) in content.domains" :key="item[0]" class="domain-card">
          <div class="domain-card__top">
            <span class="domain-icon" aria-hidden="true">
              <component :is="domainIcons[index]" :size="21" :stroke-width="2.1" />
            </span>
            <span class="domain-index">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div>
            <h3>{{ item[0] }}</h3>
            <p>{{ item[1] }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="home-section method-section">
      <div class="section-heading">
        <h2>{{ content.methodTitle }}</h2>
        <p>{{ content.methodText }}</p>
      </div>
      <div class="principle-flow">
        <article v-for="(item, index) in content.principles" :key="item[0]" class="principle-card">
          <span class="principle-step">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="principle-mark" aria-hidden="true">
            <component :is="principleIcons[index]" :size="21" :stroke-width="2.1" />
          </span>
          <div>
            <h3>{{ item[0] }}</h3>
            <p>{{ item[1] }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="home-section pillars-section">
      <div class="section-heading">
        <h2>{{ content.pillarsTitle }}</h2>
      </div>
      <div class="pillar-grid">
        <a v-for="(item, index) in content.pillars" :key="item[0]" class="pillar-card" :class="{ 'pillar-card--primary': index === 0 }" :href="item[2]">
          <span class="pillar-icon" aria-hidden="true">
            <component :is="pillarIcons[index]" :size="22" :stroke-width="2.1" />
          </span>
          <div>
            <strong>{{ item[0] }}</strong>
            <span>{{ item[1] }}</span>
          </div>
        </a>
      </div>
    </section>

    <section class="home-section path-section">
      <div class="section-heading section-heading-row">
        <h2>{{ content.pathTitle }}</h2>
        <a :href="content.guideLink">{{ isEn ? 'View guide' : '查看学习指南' }}</a>
      </div>
      <ol class="learning-path">
        <li v-for="(item, index) in content.path" :key="item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ item }}</strong>
        </li>
      </ol>
    </section>

    <section class="home-section open-section">
      <div class="section-heading">
        <h2>{{ content.openTitle }}</h2>
        <p>{{ content.openText }}</p>
      </div>
      <div class="open-grid">
        <article v-for="(item, index) in content.openItems" :key="item[0]" class="open-card">
          <span class="open-icon" aria-hidden="true">
            <component :is="openIcons[index]" :size="20" :stroke-width="2.1" />
          </span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
      <div class="open-actions">
        <a class="open-action open-action--primary" :href="content.resourcesLink">{{ isEn ? 'Resources' : '资源中心' }}</a>
        <a class="open-action" :href="content.workflowLink">{{ isEn ? 'AISEE' : 'AISEE' }}</a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.aisee-home {
  --home-text: #071426;
  --home-muted: #5a6b80;
  --home-soft: #edf6fb;
  --home-line: rgba(35, 69, 98, 0.14);
  --home-card: rgba(255, 255, 255, 0.9);
  --home-cyan: #089bb0;
  --home-teal: #087e82;
  --home-blue: #1755b8;
  --home-amber: #d97706;
  color: var(--home-text);
  background:
    linear-gradient(90deg, rgba(244, 250, 255, 0.82), rgba(255, 255, 255, 0.74) 38%, rgba(239, 249, 255, 0.92)),
    linear-gradient(180deg, #ffffff 0%, #f8fcff 46%, #ffffff 100%);
  margin: calc(var(--vp-nav-height, 64px) * -1) calc(50% - 50vw) 0;
  padding: var(--vp-nav-height, 64px) max(34px, calc((100vw - 1510px) / 2)) 48px;
  overflow: hidden;
}

.home-hero {
  display: grid;
  gap: 42px;
  grid-template-columns: minmax(520px, 0.9fr) minmax(620px, 1.1fr);
  min-height: min(560px, calc(100vh - 150px));
  align-items: center;
  padding: 58px 0 18px clamp(42px, 5vw, 92px);
}

.hero-copy {
  max-width: 740px;
  padding-bottom: 8px;
}

.eyebrow {
  color: var(--home-teal);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 18px;
}

.hero-copy h1 {
  color: #061326;
  font-size: clamp(3.5rem, 4.65vw, 5.65rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0;
  margin: 0;
}

.hero-copy h1 span {
  display: block;
}

.hero-copy h1 em {
  background: linear-gradient(180deg, #12c8d0 0%, #0961c6 92%);
  background-clip: text;
  color: transparent;
  font-style: normal;
}

.hero-title-zh span:last-child {
  white-space: nowrap;
}

.hero-subtitle {
  color: #26394f;
  font-size: clamp(1.02rem, 1.25vw, 1.2rem);
  line-height: 1.78;
  margin: 24px 0 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 30px;
}

.action {
  display: inline-flex;
  text-decoration: none;
  transition: transform 0.18s ease;
}

.action:hover {
  transform: translateY(-2px);
}

.hero-visual {
  align-items: center;
  display: flex;
  min-height: 440px;
  position: relative;
}

.method-map {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(243, 251, 255, 0.82)),
    radial-gradient(circle at 92% 0%, rgba(34, 211, 238, 0.14), transparent 36%);
  border: 1px solid rgba(8, 155, 176, 0.18);
  border-radius: 8px;
  box-shadow: 0 18px 46px rgba(39, 62, 83, 0.06);
  isolation: isolate;
  max-width: 600px;
  overflow: hidden;
  padding: 24px;
  position: relative;
  width: 100%;
}

.method-map::before {
  background-image:
    linear-gradient(rgba(24, 84, 130, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 84, 130, 0.055) 1px, transparent 1px);
  background-size: 36px 36px;
  content: "";
  inset: 0;
  mask-image: linear-gradient(90deg, transparent 0, #000 13%, #000 88%, transparent 100%);
  pointer-events: none;
  position: absolute;
  z-index: -2;
}

.method-map::after {
  background: linear-gradient(90deg, rgba(8, 155, 176, 0.24), rgba(23, 85, 184, 0.12), rgba(217, 119, 6, 0.18));
  content: "";
  height: 3px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.method-map__core {
  align-items: center;
  background:
    radial-gradient(circle at 92% 0%, rgba(34, 211, 238, 0.2), transparent 42%),
    linear-gradient(135deg, rgba(8, 82, 124, 0.96), rgba(7, 54, 92, 0.98));
  border: 1px solid rgba(88, 215, 255, 0.24);
  border-radius: 8px;
  color: #e8f8ff;
  display: flex;
  gap: 14px;
  margin: 0 auto;
  max-width: 390px;
  padding: 16px;
  position: relative;
  z-index: 1;
}

.method-map__core > span {
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(191, 236, 255, 0.24);
  border-radius: 8px;
  display: flex;
  flex: 0 0 auto;
  height: 40px;
  justify-content: center;
  width: 40px;
}

.method-map__core strong {
  display: block;
  font-size: 1.06rem;
  font-weight: 850;
}

.method-map__core p {
  color: rgba(232, 248, 255, 0.78);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 5px 0 0;
}

.method-flow {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 18px;
  position: relative;
  z-index: 1;
}

.method-flow::before {
  border: 1px dashed rgba(8, 155, 176, 0.22);
  border-radius: 999px;
  content: "";
  inset: 18px 42px;
  position: absolute;
  z-index: -1;
}

.method-node {
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(32, 86, 130, 0.14);
  border-radius: 8px;
  display: flex;
  gap: 10px;
  min-height: 106px;
  padding: 13px;
}

.method-node--deep {
  background:
    linear-gradient(135deg, rgba(236, 254, 255, 0.72), rgba(255, 255, 255, 0.9)),
    rgba(255, 255, 255, 0.86);
  border-color: rgba(8, 155, 176, 0.22);
}

.method-node__icon {
  align-items: center;
  background: rgba(236, 254, 255, 0.92);
  border: 1px solid rgba(8, 155, 176, 0.24);
  border-radius: 8px;
  color: var(--home-teal);
  display: inline-flex;
  flex: 0 0 auto;
  height: 36px;
  justify-content: center;
  position: relative;
  width: 36px;
}

.method-node__icon--amber {
  background: rgba(255, 247, 237, 0.92);
  border-color: rgba(217, 119, 6, 0.26);
  color: var(--home-amber);
}

.method-node__icon--deep {
  background: linear-gradient(135deg, rgba(8, 82, 124, 0.96), rgba(7, 54, 92, 0.98));
  border-color: rgba(88, 215, 255, 0.24);
  color: #e8f8ff;
}

.method-node strong {
  color: #0a2a54;
  display: block;
  font-size: 0.94rem;
  font-weight: 850;
  line-height: 1.35;
}

.method-node p {
  color: #5b6f83;
  font-size: 0.78rem;
  line-height: 1.48;
  margin: 4px 0 0;
}

.method-map__ticks {
  border-top: 1px solid rgba(32, 86, 130, 0.11);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
  padding-top: 14px;
  position: relative;
  z-index: 1;
}

.method-map__ticks span {
  background: rgba(248, 252, 255, 0.86);
  border: 1px solid rgba(23, 85, 184, 0.12);
  border-radius: 999px;
  color: #19406f;
  font-size: 0.76rem;
  font-weight: 760;
  flex: 1 1 92px;
  min-height: 30px;
  padding: 6px 10px;
  text-align: center;
}

.home-section {
  border-top: 1px solid var(--home-line);
  padding: 64px 0;
  position: relative;
}

.section-heading {
  max-width: 820px;
}

.section-heading h2 {
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: 0;
  line-height: 1.12;
  margin: 0;
}

.section-heading p {
  color: var(--home-muted);
  font-size: 1.06rem;
  line-height: 1.75;
  margin: 14px 0 0;
}

.section-heading-row {
  align-items: center;
  display: flex;
  gap: 32px;
  justify-content: space-between;
  max-width: none;
}

.section-heading-row a,
.open-actions a {
  color: var(--home-blue);
  font-weight: 700;
  text-decoration: none;
}

.domains-section {
  padding-top: 70px;
}

.domain-grid,
.pillar-grid,
.open-grid {
  display: grid;
  gap: 18px;
  margin-top: 26px;
}

.domain-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.domain-card,
.pillar-card,
.open-card,
.principle-card {
  background: var(--home-card);
  border: 1px solid var(--home-line);
  border-radius: 8px;
  box-shadow: 0 18px 42px rgba(39, 62, 83, 0.06);
}

.domain-card {
  display: grid;
  gap: 28px;
  grid-template-rows: auto 1fr;
  min-height: 176px;
  overflow: hidden;
  padding: 22px;
  position: relative;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.domain-card:hover {
  border-color: rgba(8, 155, 176, 0.28);
  box-shadow: 0 22px 50px rgba(39, 62, 83, 0.1);
  transform: translateY(-3px);
}

.domain-card::after {
  background: linear-gradient(90deg, rgba(8, 155, 176, 0.52), rgba(23, 85, 184, 0.08));
  bottom: 0;
  content: "";
  height: 3px;
  left: 0;
  position: absolute;
  right: 0;
}

.domain-card__top {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}

.domain-index {
  color: rgba(23, 85, 184, 0.28);
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1;
}

.domain-icon,
.pillar-icon,
.principle-mark,
.open-icon {
  align-items: center;
  background: linear-gradient(135deg, rgba(8, 145, 178, 0.14), rgba(29, 78, 216, 0.14));
  border: 2px solid rgba(8, 145, 178, 0.55);
  border-radius: 8px;
  color: var(--home-teal);
  display: inline-flex;
  height: 34px;
  justify-content: center;
  margin-bottom: 18px;
  width: 34px;
}

.domain-card:nth-child(2n) .domain-icon,
.pillar-card:nth-child(2n) .pillar-icon {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(14, 165, 233, 0.12));
  border-color: rgba(23, 85, 184, 0.42);
  color: var(--home-blue);
}

.domain-card:nth-child(5n) .domain-icon {
  background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(8, 155, 176, 0.1));
  border-color: rgba(217, 119, 6, 0.46);
  color: var(--home-amber);
}

.domain-card h3,
.principle-card h3,
.open-card h3 {
  font-size: 1.12rem;
  margin: 0;
}

.domain-card p,
.principle-card p,
.open-card p {
  color: var(--home-muted);
  font-size: 0.93rem;
  line-height: 1.6;
  margin: 8px 0 0;
}

.principle-flow {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 30px;
  position: relative;
}

.principle-flow::before {
  background: linear-gradient(90deg, rgba(8, 155, 176, 0.18), rgba(23, 85, 184, 0.24), rgba(217, 119, 6, 0.18));
  content: "";
  height: 2px;
  left: 36px;
  position: absolute;
  right: 36px;
  top: 46px;
  z-index: 0;
}

.principle-card {
  display: grid;
  gap: 18px;
  grid-template-rows: auto 1fr;
  min-height: 204px;
  padding: 24px;
  position: relative;
  z-index: 1;
}

.principle-step {
  color: rgba(217, 119, 6, 0.34);
  font-size: 1.9rem;
  font-weight: 900;
  line-height: 1;
  position: absolute;
  right: 22px;
  top: 20px;
}

.principle-mark {
  border-color: rgba(217, 119, 6, 0.58);
  color: var(--home-amber);
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}

.pillar-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.pillar-card .pillar-icon {
  margin-bottom: 0;
}

.pillar-card {
  align-items: start;
  color: var(--home-text);
  display: flex;
  gap: 18px;
  min-height: 156px;
  padding: 28px;
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.pillar-card--primary {
  background:
    linear-gradient(135deg, rgba(236, 254, 255, 0.92), rgba(255, 255, 255, 0.92)),
    var(--home-card);
  border-color: rgba(8, 155, 176, 0.24);
}

.pillar-card--primary .pillar-icon {
  background: linear-gradient(135deg, rgba(8, 155, 176, 0.18), rgba(23, 85, 184, 0.12));
  border-color: rgba(8, 155, 176, 0.55);
  color: var(--home-teal);
}

.pillar-card:hover {
  border-color: rgba(8, 145, 178, 0.42);
  transform: translateY(-3px);
}

.pillar-card strong {
  display: block;
  font-size: 1.26rem;
  margin-bottom: 8px;
}

.pillar-card span:last-child {
  color: var(--home-muted);
}

.learning-path {
  display: grid;
  gap: 0;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  list-style: none;
  margin: 34px 0 0;
  padding: 0;
  position: relative;
}

.learning-path::before {
  background: linear-gradient(90deg, rgba(8, 155, 176, 0.2), rgba(23, 85, 184, 0.2));
  content: "";
  height: 2px;
  left: 7%;
  position: absolute;
  right: 7%;
  top: 28px;
}

.learning-path li {
  min-height: 86px;
  padding: 0 10px;
  position: relative;
  text-align: center;
}

.learning-path li::before {
  background: #fff;
  border: 2px solid rgba(8, 155, 176, 0.34);
  border-radius: 999px;
  box-shadow: 0 0 0 8px rgba(8, 155, 176, 0.07);
  content: "";
  display: block;
  height: 16px;
  margin: 20px auto 14px;
  position: relative;
  width: 16px;
  z-index: 1;
}

.learning-path span {
  color: var(--home-teal);
  display: block;
  font-size: 0.78rem;
  font-weight: 800;
}

.learning-path strong {
  display: block;
  font-size: 0.95rem;
  margin-top: 2px;
}

.open-section {
  background:
    linear-gradient(90deg, rgba(236, 254, 255, 0.7), rgba(255, 255, 255, 0.84) 48%, rgba(241, 248, 255, 0.78)),
    linear-gradient(180deg, rgba(236, 254, 255, 0.38), rgba(255, 255, 255, 0.72));
  border: 1px solid rgba(8, 145, 178, 0.12);
  border-radius: 8px;
  margin-top: 20px;
  padding: 48px;
  overflow: hidden;
}

.open-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.open-card {
  position: relative;
  min-height: 126px;
  padding: 22px;
  z-index: 1;
}

.open-icon {
  height: 32px;
  margin-bottom: 16px;
  width: 32px;
}

.open-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
  position: relative;
  z-index: 1;
}

.open-action {
  align-items: center;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(23, 85, 184, 0.18);
  border-radius: 8px;
  display: inline-flex;
  min-height: 44px;
  padding: 0 18px;
}

.open-action--primary {
  background: linear-gradient(135deg, #089bb0, #087e82);
  border-color: transparent;
  color: #fff !important;
  box-shadow: 0 16px 30px rgba(8, 155, 176, 0.18);
}

[data-theme="dark"] .aisee-home {
  --home-text: rgba(255, 255, 245, 0.92);
  --home-muted: rgba(235, 245, 255, 0.68);
  --home-line: rgba(148, 213, 255, 0.16);
  --home-card: rgba(12, 22, 34, 0.74);
  background:
    linear-gradient(90deg, rgba(9, 22, 35, 0.94), rgba(8, 17, 29, 0.84), rgba(6, 24, 39, 0.92)),
    linear-gradient(180deg, #08111d 0%, #0b1420 48%, #07101a 100%);
}

[data-theme="dark"] .hero-subtitle {
  color: rgba(236, 247, 255, 0.86);
}

[data-theme="dark"] .hero-copy h1 {
  color: rgba(255, 255, 245, 0.94);
}

[data-theme="dark"] .learning-path li {
  color: rgba(255, 255, 245, 0.92);
}

[data-theme="dark"] .learning-path li::before {
  background: #0b1420;
}

[data-theme="dark"] .method-map {
  background:
    linear-gradient(135deg, rgba(12, 22, 34, 0.8), rgba(8, 17, 29, 0.72)),
    radial-gradient(circle at 72% 36%, rgba(34, 211, 238, 0.12), transparent 34%),
    radial-gradient(circle at 24% 68%, rgba(217, 119, 6, 0.08), transparent 28%);
}

[data-theme="dark"] .method-node,
[data-theme="dark"] .method-map__ticks span {
  background: rgba(11, 24, 38, 0.78);
  border-color: rgba(148, 213, 255, 0.16);
}

[data-theme="dark"] .method-node strong {
  color: rgba(235, 248, 255, 0.92);
}

[data-theme="dark"] .method-node p {
  color: rgba(220, 235, 245, 0.7);
}

[data-theme="dark"] .method-map__ticks span {
  color: rgba(235, 248, 255, 0.82);
}

@media (max-width: 1180px) {
  .home-hero {
    grid-template-columns: minmax(0, 1fr);
    padding-left: 0;
    padding-top: 68px;
  }

  .hero-visual {
    min-height: 0;
    overflow: hidden;
  }

  .method-map {
    max-width: 680px;
  }

  .domain-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .principle-flow,
  .open-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .learning-path {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .aisee-home {
    margin-left: -24px;
    margin-right: -24px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .home-hero {
    min-height: auto;
    padding: 52px 0 44px;
  }

  .hero-copy h1 {
    font-size: clamp(2.45rem, 11vw, 3.6rem);
  }

  .hero-title-zh span:last-child {
    white-space: normal;
  }

  .domain-grid,
  .principle-flow,
  .pillar-grid,
  .open-grid,
  .learning-path {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 0;
  }

  .method-map {
    margin-top: 8px;
    padding: 18px;
  }

  .method-map__core {
    max-width: none;
  }

  .method-flow {
    grid-template-columns: 1fr;
  }

  .method-flow::before {
    border-radius: 0;
    border-width: 0 0 0 1px;
    inset: 18px auto 18px 17px;
    width: 1px;
  }

  .method-node {
    min-height: auto;
  }

  .section-heading-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .principle-flow::before,
  .learning-path::before {
    display: none;
  }

  .learning-path {
    gap: 12px;
  }

  .learning-path li {
    align-items: center;
    background: rgba(255, 255, 255, 0.76);
    border: 1px solid var(--home-line);
    border-radius: 8px;
    display: flex;
    gap: 14px;
    min-height: 62px;
    padding: 12px 16px;
    text-align: left;
  }

  .learning-path li::before {
    flex: 0 0 auto;
    margin: 0;
  }

  .learning-path strong {
    margin-top: 0;
  }

  .open-section {
    padding: 30px 22px;
  }
}
</style>
