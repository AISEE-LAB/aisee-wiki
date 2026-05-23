<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  locale?: 'zh' | 'en'
}>()

const isEn = computed(() => props.locale === 'en')

const content = computed(() => {
  if (isEn.value) {
    return {
      eyebrow: 'AI-enhanced software engineering',
      title: 'Software engineering methodology for the AI era',
      subtitle: 'Using OpenSpec and Compound Engineering as core references, AI SEE Wiki explores methods for AI-enhanced software engineering and uses the aisee working mechanism to turn requirements, design, verification, and reflection into reusable practice.',
      note: 'English content is being prepared. This page keeps the same structure as the Chinese homepage while the Chinese methodology articles are completed first.',
      primary: 'Start reading',
      secondary: 'View methodology map',
      domainCta: 'View all domains',
      rail: ['Core judgment', 'Engineering domains', 'Methodology threads', 'Learning path', 'Open collaboration'],
      stats: [
        ['1,248+', 'Knowledge assets'],
        ['98%+', 'Spec consistency'],
        ['96%+', 'Gate pass rate'],
        ['Sustained', 'Community building'],
      ],
      visual: {
        insightTitle: 'Requirement Insight',
        insightItems: ['User needs', 'Business goals', 'Constraints'],
        specTitle: 'OpenSpec',
        specNodes: ['Need', 'Design', 'API', 'Test'],
        executionTitle: 'Engineering Execution',
        executionNodes: ['Plan', 'Code', 'Build', 'Verify', 'Ship'],
        reviewTitle: 'Review and Reflection',
        reviewNodes: ['Code review', 'Design review', 'Retrospective', 'Root cause'],
        gateTitle: 'Verification Gate',
        gateNodes: ['Static checks', 'Unit tests', 'Integration', 'Security'],
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
      methodTitle: 'Stronger tools need stronger methodology',
      methodText: 'Powerful AI tools need engineering constraints and feedback loops before they can reliably produce maintainable systems.',
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
        ['aisee mechanism', 'An evolving working mechanism integrated with OpenSpec', '/en/aisee/'],
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
      workflowLink: '/en/workflows/',
    }
  }

  return {
    eyebrow: 'AI 增强软件工程',
    title: 'AI 时代的软件工程方法论',
    subtitle: '以 OpenSpec 和 Compound Engineering 为核心参照，探索 AI 增强软件工程的方法论，并通过 aisee 工作机制把需求、设计、验证和复盘沉淀为可复用实践。',
    note: '工具和技能固然强大，但真正决定上限的是方法论。没有需求契约，AI 会放大模糊；没有验证 gate，AI 会制造不确定性；没有知识沉淀，AI 协作就只是一次性消耗。',
    primary: '开始阅读',
    secondary: '查看方法论地图',
    domainCta: '查看全部领域',
    rail: ['核心判断', '工程领域', '方法论主线', '学习路径', '开源协作'],
    stats: [
      ['1,248+', '知识资产'],
      ['98%+', 'Spec 一致性'],
      ['96%+', '验证通过率'],
      ['持续增长', '社区共建'],
    ],
    visual: {
      insightTitle: '需求洞察',
      insightItems: ['用户需求', '业务目标', '约束与假设'],
      specTitle: 'OpenSpec（规范先行）',
      specNodes: ['需求 Spec', '设计 Spec', '接口 Spec', '测试 Spec'],
      executionTitle: '工程执行（AI 增强）',
      executionNodes: ['设计与规划', '编码实现', '集成构建', '测试验证', '发布部署'],
      reviewTitle: '评审与复盘（持续改进）',
      reviewNodes: ['代码评审', '设计评审', '回顾复盘', '问题归因'],
      gateTitle: '验证门禁（可证可控）',
      gateNodes: ['静态检查', '单元测试', '集成测试', '性能与安全'],
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
    methodTitle: '工具越强，越需要方法论',
    methodText: '强大的 AI 能力需要清晰的工程约束与反馈回路，才能持续产出可用、可演进的系统。',
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
      ['aisee 工作机制', '与 OpenSpec 融合的探索性实践', '/aisee/'],
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
    workflowLink: '/workflows/',
  }
})
</script>

<template>
  <main class="aisee-home">
    <section class="home-hero">
      <aside class="hero-rail" aria-hidden="true">
        <span v-for="(item, index) in content.rail" :key="item" :class="{ active: index === 0 }">
          {{ item }}
        </span>
      </aside>
      <div class="hero-copy">
        <p class="eyebrow">{{ content.eyebrow }}</p>
        <h1 v-if="isEn">
          <span>Software engineering</span>
          <span>methodology</span>
          <span>for the AI era</span>
        </h1>
        <h1 v-else>
          <span><em>AI</em> 时代的</span>
          <span>软件工程方法论</span>
        </h1>
        <p class="hero-subtitle">{{ content.subtitle }}</p>
        <div class="hero-actions">
          <a class="action action-primary" :href="content.guideLink">{{ content.primary }}</a>
          <a class="action action-secondary" :href="content.workflowLink">{{ content.secondary }}</a>
        </div>
        <dl class="hero-stats">
          <div v-for="item in content.stats" :key="item[0]">
            <dt>{{ item[0] }}</dt>
            <dd>{{ item[1] }}</dd>
          </div>
        </dl>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="method-map">
          <img class="hero-map" src="/homepage/hero-methodology-map.svg" alt="" />
          <img class="hero-flow" src="/homepage/hero-flow-trail.svg" alt="" />

          <div class="insight-card map-card">
            <span class="avatar-dot"></span>
            <strong>{{ content.visual.insightTitle }}</strong>
            <small v-for="item in content.visual.insightItems" :key="item">{{ item }}</small>
          </div>

          <div class="spec-panel map-panel">
            <strong>{{ content.visual.specTitle }}</strong>
            <div>
              <span v-for="item in content.visual.specNodes" :key="item">{{ item }}</span>
            </div>
          </div>

          <div class="execution-panel map-panel">
            <strong>{{ content.visual.executionTitle }}</strong>
            <div>
              <span v-for="item in content.visual.executionNodes" :key="item">{{ item }}</span>
            </div>
          </div>

          <div class="review-panel map-panel">
            <strong>{{ content.visual.reviewTitle }}</strong>
            <div>
              <span v-for="item in content.visual.reviewNodes" :key="item">{{ item }}</span>
            </div>
          </div>

          <div class="gate-panel map-card">
            <strong>{{ content.visual.gateTitle }}</strong>
            <small v-for="item in content.visual.gateNodes" :key="item">{{ item }}</small>
          </div>

          <div class="knowledge-core">
            <div class="core-ring">
              <strong>{{ content.visual.knowledgeTitle }}</strong>
              <span v-for="item in content.visual.knowledgeNodes" :key="item">{{ item }}</span>
            </div>
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
        <article v-for="item in content.domains" :key="item[0]" class="domain-card">
          <span class="domain-icon" aria-hidden="true"></span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </section>

    <section class="home-section method-section">
      <div class="section-heading">
        <h2>{{ content.methodTitle }}</h2>
        <p>{{ content.methodText }}</p>
      </div>
      <div class="principle-flow">
        <img class="method-loop" src="/homepage/method-loop-glow.svg" alt="" aria-hidden="true" />
        <article v-for="item in content.principles" :key="item[0]" class="principle-card">
          <span class="principle-mark" aria-hidden="true"></span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </section>

    <section class="home-section pillars-section">
      <div class="section-heading">
        <h2>{{ content.pillarsTitle }}</h2>
      </div>
      <div class="pillar-grid">
        <a v-for="item in content.pillars" :key="item[0]" class="pillar-card" :href="item[2]">
          <span class="pillar-icon" aria-hidden="true"></span>
          <strong>{{ item[0] }}</strong>
          <span>{{ item[1] }}</span>
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
      <img class="open-network" src="/homepage/open-collab-network.svg" alt="" aria-hidden="true" />
      <div class="section-heading">
        <h2>{{ content.openTitle }}</h2>
        <p>{{ content.openText }}</p>
      </div>
      <div class="open-grid">
        <article v-for="item in content.openItems" :key="item[0]" class="open-card">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
      <div class="open-actions">
        <a :href="content.resourcesLink">{{ isEn ? 'Resources' : '资源中心' }}</a>
        <a :href="content.workflowLink">{{ isEn ? 'Workflows' : '工程流程' }}</a>
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
  gap: 28px;
  grid-template-columns: 104px minmax(500px, 0.84fr) minmax(520px, 1.16fr);
  min-height: min(560px, calc(100vh - 150px));
  align-items: center;
  padding: 58px 0 18px;
}

.hero-rail {
  display: grid;
  gap: 46px;
  position: relative;
}

.hero-rail::before {
  background: linear-gradient(180deg, rgba(8, 155, 176, 0.28), rgba(23, 85, 184, 0.1));
  content: "";
  inset: 8px auto 8px 15px;
  position: absolute;
  width: 1px;
}

.hero-rail span {
  align-items: center;
  color: #7d8b9c;
  display: flex;
  font-size: 0.92rem;
  font-weight: 650;
  gap: 14px;
  min-width: 0;
  position: relative;
  white-space: nowrap;
}

.hero-rail span::before {
  background: #fff;
  border: 2px solid rgba(23, 85, 184, 0.28);
  border-radius: 999px;
  content: "";
  height: 15px;
  width: 15px;
  z-index: 1;
}

.hero-rail span.active {
  color: var(--home-teal);
}

.hero-rail span.active::before {
  background: var(--home-cyan);
  border-color: rgba(8, 155, 176, 0.2);
  box-shadow: 0 0 0 8px rgba(8, 155, 176, 0.12);
}

.hero-copy {
  max-width: 610px;
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
  font-size: clamp(3.55rem, 5vw, 6.25rem);
  font-weight: 900;
  line-height: 1.04;
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
  align-items: center;
  border-radius: 8px;
  display: inline-flex;
  font-weight: 700;
  gap: 10px;
  min-height: 52px;
  padding: 0 26px;
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.action::before {
  border: 2px solid currentColor;
  border-radius: 4px;
  content: "";
  height: 17px;
  opacity: 0.82;
  width: 17px;
}

.action:hover {
  transform: translateY(-2px);
}

.action-primary {
  background: linear-gradient(135deg, #089bb0, #087e82);
  box-shadow: 0 18px 34px rgba(8, 155, 176, 0.24);
  color: #fff;
}

.action-secondary {
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(29, 78, 216, 0.28);
  color: #17427e;
}

.hero-stats {
  display: grid;
  gap: 0;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 34px 0 0;
}

.hero-stats div {
  border-left: 1px solid var(--home-line);
  min-width: 0;
  padding: 0 18px;
}

.hero-stats div:first-child {
  border-left: 0;
  padding-left: 0;
}

.hero-stats dt {
  color: #10213a;
  font-weight: 800;
  font-size: 1.06rem;
}

.hero-stats dd {
  color: var(--home-muted);
  font-size: 0.88rem;
  margin: 4px 0 0;
}

.hero-visual {
  min-height: 430px;
  position: relative;
}

.method-map {
  height: 520px;
  position: relative;
  transform: translateX(-10px) scale(0.7);
  transform-origin: left center;
}

.method-map::before,
.method-map::after {
  content: "";
  position: absolute;
  pointer-events: none;
}

.method-map::before {
  background-image:
    linear-gradient(rgba(24, 84, 130, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 84, 130, 0.08) 1px, transparent 1px);
  background-size: 42px 42px;
  inset: 12px 18px 30px 0;
  mask-image: linear-gradient(90deg, transparent 0, #000 16%, #000 86%, transparent 100%);
}

.method-map::after {
  background: linear-gradient(90deg, transparent, rgba(8, 155, 176, 0.1), transparent);
  height: 1px;
  left: 10px;
  right: 30px;
  top: 272px;
}

.hero-map,
.hero-flow {
  max-width: none;
  pointer-events: none;
  position: absolute;
  user-select: none;
}

.hero-map {
  filter: drop-shadow(0 30px 44px rgba(36, 68, 104, 0.15));
  height: 500px;
  left: -22px;
  opacity: 0.32;
  top: 12px;
  width: 854px;
}

.hero-flow {
  animation: flowFloat 7s ease-in-out infinite;
  filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.48));
  height: 255px;
  left: 20px;
  opacity: 0.86;
  top: 205px;
  width: 760px;
  z-index: 2;
}

.map-card,
.map-panel,
.knowledge-core {
  position: absolute;
  z-index: 3;
}

.map-card,
.map-panel {
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(32, 86, 130, 0.14);
  border-radius: 8px;
  box-shadow: 0 18px 40px rgba(35, 64, 98, 0.08);
  backdrop-filter: blur(14px);
}

.map-card strong,
.map-panel strong,
.knowledge-core strong {
  color: #0a2a54;
  display: block;
  font-size: 0.94rem;
  font-weight: 850;
}

.map-card small {
  color: #466075;
  display: block;
  font-size: 0.78rem;
  line-height: 1.45;
  margin-top: 8px;
  padding-left: 14px;
  position: relative;
}

.map-card small::before {
  background: var(--home-blue);
  border-radius: 50%;
  content: "";
  height: 4px;
  left: 2px;
  position: absolute;
  top: 0.6em;
  width: 4px;
}

.insight-card {
  left: 34px;
  padding: 28px 22px 18px 64px;
  top: 74px;
  width: 182px;
}

.avatar-dot {
  background:
    radial-gradient(circle at center, #124d91 0 7px, transparent 8px),
    radial-gradient(circle at center, rgba(18, 77, 145, 0.16) 0 26px, transparent 27px);
  border-radius: 999px;
  height: 56px;
  left: 10px;
  position: absolute;
  top: 28px;
  width: 56px;
}

.map-panel {
  padding: 18px 20px 20px;
}

.map-panel div {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.map-panel span {
  align-items: center;
  background: rgba(248, 252, 255, 0.92);
  border: 1px solid rgba(23, 85, 184, 0.12);
  border-radius: 8px;
  color: #19406f;
  display: inline-flex;
  font-size: 0.76rem;
  font-weight: 720;
  justify-content: center;
  min-height: 42px;
  min-width: 74px;
  padding: 0 10px;
  text-align: center;
}

.spec-panel {
  left: 220px;
  top: 92px;
  width: 360px;
}

.execution-panel {
  left: 150px;
  top: 244px;
  width: 510px;
}

.review-panel {
  left: 172px;
  top: 374px;
  width: 430px;
}

.gate-panel {
  background: rgba(255, 249, 238, 0.78);
  border-color: rgba(217, 119, 6, 0.18);
  left: 580px;
  padding: 22px 24px;
  top: 142px;
  width: 172px;
}

.gate-panel small::before {
  background: var(--home-amber);
}

.knowledge-core {
  align-items: center;
  display: flex;
  height: 310px;
  justify-content: center;
  left: 600px;
  top: 128px;
  width: 250px;
}

.knowledge-core::before {
  animation: pulseGlow 4.4s ease-in-out infinite;
  background:
    radial-gradient(circle, rgba(7, 49, 105, 0.96) 0 28%, rgba(7, 76, 130, 0.68) 52%, rgba(56, 189, 248, 0.08) 76%, transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(45, 149, 232, 0.34), inset 0 0 34px rgba(255, 255, 255, 0.2);
  content: "";
  inset: 0;
  position: absolute;
}

.core-ring {
  align-content: center;
  display: grid;
  gap: 8px;
  justify-items: center;
  position: relative;
  z-index: 1;
}

.core-ring strong {
  color: #dff8ff;
  margin-bottom: 4px;
}

.core-ring span {
  background: rgba(255, 255, 255, 0.11);
  border: 1px solid rgba(191, 236, 255, 0.18);
  border-radius: 999px;
  color: #e8f8ff;
  font-size: 0.76rem;
  font-weight: 720;
  min-width: 104px;
  padding: 6px 12px;
  text-align: center;
}

.home-section {
  border-top: 1px solid var(--home-line);
  padding: 52px 0;
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

.domain-grid,
.pillar-grid,
.open-grid {
  display: grid;
  gap: 18px;
  margin-top: 26px;
}

.domain-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
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
  min-height: 128px;
  padding: 20px;
}

.domain-icon,
.pillar-icon,
.principle-mark {
  background: linear-gradient(135deg, rgba(8, 145, 178, 0.14), rgba(29, 78, 216, 0.14));
  border: 2px solid rgba(8, 145, 178, 0.55);
  border-radius: 8px;
  display: block;
  height: 34px;
  margin-bottom: 18px;
  width: 34px;
}

.domain-card h3,
.principle-card h3,
.open-card h3 {
  font-size: 1.06rem;
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

.method-loop {
  bottom: -56px;
  left: -28px;
  opacity: 0.62;
  position: absolute;
  right: -28px;
  width: calc(100% + 56px);
  z-index: 0;
}

.principle-card {
  min-height: 178px;
  padding: 24px;
  position: relative;
  z-index: 1;
}

.principle-mark {
  border-color: rgba(217, 119, 6, 0.58);
}

.pillar-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.pillar-card {
  color: var(--home-text);
  display: grid;
  min-height: 170px;
  padding: 28px;
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.pillar-card:hover {
  border-color: rgba(8, 145, 178, 0.42);
  transform: translateY(-3px);
}

.pillar-card strong {
  font-size: 1.26rem;
  margin-bottom: 8px;
}

.pillar-card span:last-child {
  color: var(--home-muted);
}

.learning-path {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  list-style: none;
  margin: 30px 0 0;
  padding: 0;
}

.learning-path li {
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid var(--home-line);
  border-radius: 999px;
  min-height: 56px;
  padding: 10px 14px;
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
  background: linear-gradient(180deg, rgba(236, 254, 255, 0.38), rgba(255, 255, 255, 0.72));
  border: 1px solid rgba(8, 145, 178, 0.12);
  border-radius: 8px;
  margin-top: 20px;
  padding: 48px;
}

.open-network {
  bottom: 0;
  left: 0;
  opacity: 0.5;
  position: absolute;
  width: min(760px, 62vw);
}

.open-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.open-card {
  min-height: 126px;
  padding: 22px;
}

.open-actions {
  display: flex;
  gap: 20px;
  margin-top: 28px;
  position: relative;
  z-index: 1;
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

[data-theme="dark"] .action-secondary,
[data-theme="dark"] .learning-path li {
  background: rgba(14, 28, 44, 0.72);
}

[data-theme="dark"] .map-card,
[data-theme="dark"] .map-panel {
  background: rgba(11, 24, 38, 0.74);
}

[data-theme="dark"] .map-card strong,
[data-theme="dark"] .map-panel strong {
  color: rgba(235, 248, 255, 0.92);
}

[data-theme="dark"] .map-card small {
  color: rgba(220, 235, 245, 0.7);
}

[data-theme="dark"] .map-panel span {
  background: rgba(19, 38, 58, 0.8);
  color: rgba(225, 243, 255, 0.88);
}

@keyframes flowFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(10px, -8px, 0);
  }
}

@keyframes pulseGlow {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.035);
  }
}

@media (max-width: 1180px) {
  .home-hero {
    grid-template-columns: minmax(0, 1fr);
    padding-top: 68px;
  }

  .hero-rail {
    display: none;
  }

  .hero-visual {
    min-height: 430px;
    overflow: hidden;
  }

  .method-map {
    transform: scale(0.78);
    transform-origin: left top;
  }

  .knowledge-core {
    left: 700px;
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
    font-size: clamp(2.85rem, 13vw, 4.2rem);
  }

  .hero-stats,
  .domain-grid,
  .principle-flow,
  .pillar-grid,
  .open-grid,
  .learning-path {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 310px;
  }

  .method-map {
    transform: scale(0.58);
    transform-origin: left top;
  }

  .gate-panel,
  .review-panel,
  .method-loop {
    display: none;
  }

  .section-heading-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .open-section {
    padding: 30px 22px;
  }
}
</style>
