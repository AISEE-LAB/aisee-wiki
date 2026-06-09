<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  Boxes,
  CircleDot,
  FileCheck2,
  FileText,
  GitBranch,
  LibraryBig,
  Lightbulb,
  Network,
  PackageCheck,
  PenLine,
  Workflow,
} from 'lucide-vue-next'

import UiButton from './ui/UiButton.vue'

const props = defineProps<{
  locale?: 'zh' | 'en'
}>()

const homeRef = ref<HTMLElement | null>(null)
let cleanupHeroAnimation: (() => void) | null = null
const isEn = computed(() => props.locale === 'en')
const domainIcons = [Lightbulb, FileText, FileCheck2, Workflow, Boxes, LibraryBig]
const principleIcons = [FileText, Workflow, LibraryBig]
const frameworkIcons = [Lightbulb, FileText, Network, Workflow, CircleDot, LibraryBig]
const pillarIcons = [FileCheck2, GitBranch, Boxes]
const openIcons = [GitBranch, PenLine, PackageCheck, Network]

const content = computed(() => {
  if (isEn.value) {
    return {
      eyebrow: 'AI-Enhanced Software Engineering',
      title: 'Understand software engineering in the AI era',
      subtitle: 'AISEE Wiki is an independent methodology site around OpenSpec, Compound Engineering, and AISEE workflows.',
      note: 'Spec First. Harness Better. Compound Knowledge.',
      primary: 'Open guides',
      secondary: 'Explore AISEE',
      domainCta: 'Start with the guide',
      visual: {
        coreTitle: 'AI Engineering Method',
        coreText: 'A repeatable loop for specification, harness, verification, and knowledge reuse.',
        specTitle: 'Spec First',
        specText: 'Intent, constraints, design decisions, and acceptance criteria become a reviewable source of truth.',
        specItems: ['Intent', 'Constraints', 'Acceptance'],
        harnessTitle: 'Harness Better',
        harnessText: 'AI works inside an explicit execution environment instead of an unbounded prompt.',
        harnessItems: ['Agent', 'Skill', 'MCP', 'Hook', 'Workflow', 'Schema'],
        gateTitle: 'Verification Gate',
        gateText: 'Tests, review, checks, and apply guards decide whether the work can move forward.',
        gateItems: ['Test', 'Review', 'Guard'],
        knowledgeTitle: 'Compound Knowledge',
        knowledgeText: 'Proven patterns, templates, schemas, and cases feed the next engineering cycle.',
        knowledgeItems: ['Review', 'Template', 'Case', 'Memory'],
      },
      domainsTitle: 'Start by what you need',
      domainsText: 'Use the homepage as a map. Pick the question you are trying to answer, then enter the section that carries that job.',
      domains: [
        ['New to AI Coding', 'Build the concepts, local setup, and agent basics before entering the methodology layer.', '/en/learn/'],
        ['Understand the shift', 'See what changes when AI participates in requirements, design, coding, review, and knowledge reuse.', '/en/ai-engineering/'],
        ['Manage changes with specs', 'Use OpenSpec to make scope, behavior, decisions, and acceptance criteria reviewable.', '/en/openspec/'],
        ['Run agent work reliably', 'Use Compound Engineering to plan, execute, review, debug, and preserve reusable knowledge.', '/en/compound/'],
        ['Adopt the AISEE workflow', 'Connect AISEE Plugin, OpenSpec, and Compound Engineering into an end-to-end practice.', '/en/aisee/workflows/'],
        ['Find references', 'Browse external resources and team-led open source projects from clearly separated entry points.', '/en/resources/'],
      ],
      methodTitle: 'Three method threads',
      methodText: 'The site is organized by methodology, not by tool commands. OpenSpec provides the source of truth, Compound provides the execution and learning discipline, and AISEE connects them into working flows.',
      principles: [
        ['Spec First', 'Turn intent, scope, behavior change, design judgment, and acceptance criteria into reviewable artifacts.'],
        ['Harness Better', 'Put AI inside explicit agents, skills, MCP tools, hooks, schemas, and workflows.'],
        ['Compound Knowledge', 'Keep templates, cases, schemas, retrospectives, and fixes available for the next change.'],
      ],
      frameworkTitle: 'From problem to reusable knowledge',
      frameworkText: 'The same loop should be visible in each serious AI engineering task: define, specify, prepare context, execute, verify, then preserve what worked.',
      framework: [
        ['01', 'Frame the problem', 'Clarify goal, user, constraint, non-goal, and acceptance direction.'],
        ['02', 'Model the spec', 'Make scope, behavior, and decisions inspectable before execution starts.'],
        ['03', 'Prepare context', 'Collect project facts, memory, skills, source maps, and tool boundaries.'],
        ['04', 'Execute the work', 'Let AI act inside explicit tasks, permissions, and workflow steps.'],
        ['05', 'Verify the result', 'Use tests, review, checks, and guards to decide whether work can move on.'],
        ['06', 'Compound knowledge', 'Keep patterns, fixes, templates, and cases available for the next change.'],
      ],
      pillarsTitle: 'AISEE practice sections',
      pillars: [
        ['AISEE Plugin', 'The installable workflow layer for SRS, context packs, schema packs, and handoffs.', '/en/aisee/workflows/'],
        ['OpenSpec', 'The specification layer and source of truth for controlled engineering changes.', '/en/openspec/'],
        ['Compound Engineering', 'The discipline for harnessed execution, review, debugging, and knowledge reuse.', '/en/compound/'],
      ],
      pathTitle: 'Recommended reading path',
      paths: [
        ['New to AI Coding', 'Start with guides for concepts, local setup, agent components, memory, skills, MCP, and hooks.', '/en/learn/'],
        ['Understanding the methodology', 'Read AI Engineering to understand what changed from traditional software engineering.', '/en/ai-engineering/'],
        ['Adopting AISEE', 'Use AISEE to connect plugin workflows, OpenSpec, and Compound Engineering.', '/en/aisee/'],
        ['Team open source', 'Browse projects maintained or led by the AISEE team.', '/en/projects/'],
      ],
      openTitle: 'Open collaboration and source notes',
      openText: 'This site is maintained as an independent practice and methodology wiki. It is not the official OpenSpec or Compound documentation.',
      openItems: [
        ['Source on GitHub', 'Documentation source is hosted in GitHub and pages can provide edit entries.'],
        ['Open source projects', 'Team-owned projects are separated from external recommended resources.'],
        ['Open contribution', 'Contributions can be fixes, cases, workflow templates, skills, or schemas.'],
        ['Clear attribution', 'The site documents independent practice, interpretation, and methodology.'],
      ],
      guideLink: '/en/learn/',
      projectsLink: '/en/projects/',
      resourcesLink: '/en/resources/',
      workflowLink: '/en/aisee/',
    }
  }

  return {
    eyebrow: 'AI-Enhanced Software Engineering',
    title: '深入理解 AI 时代的软件工程',
    subtitle: 'AISEE Wiki 是围绕 OpenSpec、Compound Engineering 与 AISEE 工作流建立的独立实践与方法论站点。',
    note: 'Spec First. Harness Better. Compound Knowledge.',
    primary: '打开指南',
    secondary: '了解 AISEE',
    domainCta: '进入指南',
    visual: {
      coreTitle: 'AI Engineering Method',
      coreText: '把规范、执行环境、验证和知识复用组织成可反复运行的工程闭环。',
      specTitle: 'Spec First',
      specText: '意图、约束、设计判断和验收标准先进入可审查的事实源。',
      specItems: ['意图', '约束', '验收'],
      harnessTitle: 'Harness Better',
      harnessText: 'AI 在明确的执行环境里工作，而不是裸跑在一次性 prompt 中。',
      harnessItems: ['Agent', 'Skill', 'MCP', 'Hook', 'Workflow', 'Schema'],
      gateTitle: 'Verification Gate',
      gateText: '测试、评审、检查和 apply guard 决定工程结果是否继续流转。',
      gateItems: ['测试', '评审', 'Guard'],
      knowledgeTitle: 'Compound Knowledge',
      knowledgeText: '把有效模式、模板、schema 和真实案例反哺下一轮工程。',
      knowledgeItems: ['Review', 'Template', 'Case', 'Memory'],
    },
    domainsTitle: '按目标进入',
    domainsText: '首页更像一张地图。先判断你现在要解决的问题，再进入承担这个任务的栏目。',
    domains: [
      ['刚开始学 AI Coding', '先建立概念、本地环境、工具选择和 Agent 基础认知。', '/learn/'],
      ['理解工程方法变化', '看清 AI 参与需求、设计、开发、评审和知识沉淀后，工程组织方式如何变化。', '/ai-engineering/'],
      ['用规范管理变更', '用 OpenSpec 固定目标、范围、行为变化、设计判断和验收边界。', '/openspec/'],
      ['组织 Agent 执行和复盘', '用 Compound Engineering 串起计划、执行、评审、调试和知识沉淀。', '/compound/'],
      ['采用 AISEE 工作流', '理解 AISEE Plugin 如何连接需求输入、OpenSpec change 和 Compound handoff。', '/aisee/workflows/'],
      ['寻找工具和项目参考', '从推荐资源与开源项目中区分外部参考和团队自有资产。', '/resources/'],
    ],
    methodTitle: '三条方法主线',
    methodText: '内容围绕方法论组织，而不是停留在命令清单：OpenSpec 提供事实源，Compound 提供执行与复盘纪律，AISEE 把两者连接成可落地的工作流。',
    principles: [
      ['Spec First', '把意图、范围、行为变化、设计判断和验收标准放进可审查的 artifacts。'],
      ['Harness Better', '用 Agent、Skill、MCP、Hook、Schema 和 Workflow 组成有边界的 AI 执行环境。'],
      ['Compound Knowledge', '把模板、案例、schema、复盘和修复经验留给下一次工程工作。'],
    ],
    frameworkTitle: '从问题到知识复利',
    frameworkText: '一次可靠的 AI 工程任务，应该能看见同一条链路：定义问题、建立规范、准备上下文、执行实现、验证结果、沉淀经验。',
    framework: [
      ['01', '问题定义', '明确目标、用户、约束、非目标和验收方向。'],
      ['02', '规范建模', '让范围、行为变化和设计判断在执行前可审查。'],
      ['03', '上下文组织', '准备项目事实、memory、skills、source-map 与工具边界。'],
      ['04', '工程执行', '让 AI 在明确任务、权限和工作流步骤中参与实现。'],
      ['05', '验证结果', '通过测试、评审、检查和 guard 判断是否继续流转。'],
      ['06', '知识复利', '把模式、修复、模板和案例留给下一轮工程。'],
    ],
    pillarsTitle: 'AISEE 主线入口',
    pillars: [
      ['AISEE Plugin', '把 SRS、上下文包、schema pack、change 规划和 handoff 做成工程化入口。', '/aisee/workflows/'],
      ['OpenSpec', '作为规范层和事实源，管理可审查、可验证、可归档的工程变更。', '/openspec/'],
      ['Compound Engineering', '提供有边界的执行、评审、调试、复盘与知识复利方法。', '/compound/'],
    ],
    pathTitle: '推荐指南路径',
    paths: [
      ['新手理解 AI Coding', '从指南中的概念、工具、agent 组件、memory、skills、MCP 和 hooks 建立基础模型。', '/learn/'],
      ['理解方法论基础', '先读 AI Engineering，理解传统软件工程与 AI 增强软件工程的差异。', '/ai-engineering/'],
      ['采用 AISEE', '从 AISEE 栏目理解插件、OpenSpec 和 Compound Engineering 如何组合。', '/aisee/'],
      ['查看团队项目', '了解 AISEE 团队自有或主导的开源项目。', '/projects/'],
    ],
    openTitle: '开放协作与来源说明',
    openText: '这里记录围绕 OpenSpec、Compound Engineering 与 AISEE 的实践、解释和方法论沉淀。',
    openItems: [
      ['源码托管', '文档源代码托管在 GitHub，页面可提供编辑入口。'],
      ['开源项目', '团队自有项目和外部推荐资源分开呈现，避免混淆来源。'],
      ['开放贡献', '接受文档修订、真实案例、workflow、skill 和 schema 模板。'],
      ['清晰声明', '内容不是 OpenSpec 或 Compound 官方文档，而是独立实践与方法论沉淀。'],
    ],
    guideLink: '/learn/',
    projectsLink: '/projects/',
    resourcesLink: '/resources/',
    workflowLink: '/aisee/',
  }
})
const heroTitleLines = computed(() => {
  if (isEn.value) {
    return [
      [{ text: 'Understand software', highlight: false }],
      [{ text: 'engineering', highlight: false }],
      [
        { text: 'in the ', highlight: false },
        { text: 'AI', highlight: true },
        { text: ' era', highlight: false },
      ],
    ]
  }

  return [
    [
      { text: '深入理解 ', highlight: false },
      { text: 'AI', highlight: true },
    ],
    [{ text: '时代的', highlight: false }],
    [{ text: '软件工程', highlight: false }],
  ]
})

onMounted(async () => {
  const root = homeRef.value
  if (!root) return
  if (isEn.value) return

  const { gsap } = await import('gsap')
  if (!homeRef.value) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const ctx = gsap.context(() => {
    const q = gsap.utils.selector(root)
    const titleChars = q('[data-hero-title-char]')

    if (reduceMotion) {
      gsap.set(titleChars, { clearProps: 'all' })
      return
    }

    gsap.fromTo(
      titleChars,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.01,
        ease: 'none',
        stagger: {
          each: 0.055,
          from: 'start',
        },
      },
    )
  }, root)

  cleanupHeroAnimation = () => ctx.revert()
})

onUnmounted(() => {
  cleanupHeroAnimation?.()
  cleanupHeroAnimation = null
})
</script>

<template>
  <main ref="homeRef" class="aisee-home">
    <section class="home-hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ content.eyebrow }}</p>
        <h1 :class="{ 'hero-title-zh': !isEn }">
          <span v-for="(line, lineIndex) in heroTitleLines" :key="lineIndex" class="hero-title__line">
            <template v-for="(segment, segmentIndex) in line" :key="`${lineIndex}-${segmentIndex}`">
              <em
                v-if="segment.highlight"
                class="hero-title__char hero-title__char--ai"
                data-hero-title-ai
                data-hero-title-char
              >
                {{ segment.text }}
              </em>
              <template v-else>
                <span
                  v-for="(char, charIndex) in Array.from(segment.text)"
                  :key="`${lineIndex}-${segmentIndex}-${charIndex}`"
                  class="hero-title__char"
                  data-hero-title-char
                >
                  {{ char === ' ' ? '\u00A0' : char }}
                </span>
              </template>
            </template>
          </span>
        </h1>
        <p class="hero-subtitle">{{ content.subtitle }}</p>
        <p class="hero-slogan">{{ content.note }}</p>
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
        <div class="method-system">
          <svg class="method-system__links" viewBox="0 0 720 500" fill="none" aria-hidden="true">
            <path class="method-system__loop method-system__loop--primary" d="M216 126 C318 42 504 64 570 168" />
            <path class="method-system__loop method-system__loop--secondary" d="M594 290 C530 426 292 456 150 340" />
            <path class="method-system__link" d="M168 174 C200 226 246 250 310 252" />
            <path class="method-system__link method-system__link--amber" d="M424 252 C488 252 532 278 560 326" />
            <path class="method-system__link" d="M392 326 C334 386 236 382 174 326" />
          </svg>

          <div class="method-system__core">
            <span><Boxes :size="24" /></span>
            <div>
              <strong>{{ content.visual.coreTitle }}</strong>
              <p>{{ content.visual.coreText }}</p>
            </div>
          </div>

          <div class="method-system__nodes">
            <article class="method-node method-node--spec">
              <span class="method-node__icon"><FileCheck2 :size="20" /></span>
              <div>
                <strong>{{ content.visual.specTitle }}</strong>
                <p>{{ content.visual.specText }}</p>
                <span class="method-node__chips">
                  <b v-for="item in content.visual.specItems" :key="item">{{ item }}</b>
                </span>
              </div>
            </article>

            <article class="method-node method-node--harness">
              <span class="method-node__icon"><Workflow :size="20" /></span>
              <div>
                <strong>{{ content.visual.harnessTitle }}</strong>
                <p>{{ content.visual.harnessText }}</p>
                <span class="method-node__chips method-node__chips--grid">
                  <b v-for="item in content.visual.harnessItems" :key="item">{{ item }}</b>
                </span>
              </div>
            </article>

            <article class="method-node method-node--gate">
              <span class="method-node__icon method-node__icon--amber"><CircleDot :size="20" /></span>
              <div>
                <strong>{{ content.visual.gateTitle }}</strong>
                <p>{{ content.visual.gateText }}</p>
                <span class="method-node__chips">
                  <b v-for="item in content.visual.gateItems" :key="item">{{ item }}</b>
                </span>
              </div>
            </article>

            <article class="method-node method-node--knowledge method-node--deep">
              <span class="method-node__icon method-node__icon--deep"><LibraryBig :size="20" /></span>
              <div>
                <strong>{{ content.visual.knowledgeTitle }}</strong>
                <p>{{ content.visual.knowledgeText }}</p>
                <span class="method-node__chips">
                  <b v-for="item in content.visual.knowledgeItems" :key="item">{{ item }}</b>
                </span>
              </div>
            </article>
          </div>
        </div>
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

    <section class="home-section framework-section">
      <div class="section-heading">
        <h2>{{ content.frameworkTitle }}</h2>
        <p>{{ content.frameworkText }}</p>
      </div>
      <div class="framework-rail">
        <article v-for="(item, index) in content.framework" :key="item[0]" class="framework-step">
          <span class="framework-step__icon" aria-hidden="true">
            <component :is="frameworkIcons[index]" :size="20" :stroke-width="2.1" />
          </span>
          <span class="framework-step__index">{{ item[0] }}</span>
          <h3>{{ item[1] }}</h3>
          <p>{{ item[2] }}</p>
        </article>
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
        <a v-for="(item, index) in content.domains" :key="item[0]" class="domain-card" :href="item[2]">
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
        </a>
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
        <a class="open-action open-action--primary" :href="content.projectsLink">{{ isEn ? 'Open Source' : '开源项目' }}</a>
        <a class="open-action" :href="content.resourcesLink">{{ isEn ? 'Recommended Resources' : '推荐资源' }}</a>
        <a class="open-action" :href="content.workflowLink">AISEE</a>
      </div>
    </section>

    <section class="home-section path-section">
      <div class="section-heading section-heading-row">
        <h2>{{ content.pathTitle }}</h2>
        <a :href="content.guideLink">{{ isEn ? 'View guide' : '查看学习指南' }}</a>
      </div>
      <div class="path-grid">
        <a v-for="item in content.paths" :key="item[0]" class="path-card" :href="item[2]">
          <strong>{{ item[0] }}</strong>
          <p>{{ item[1] }}</p>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.aisee-home {
  --home-text: #071426;
  --home-muted: #5a6b80;
  --home-soft: color-mix(in oklch, var(--aisee-brand-secondary) 10%, white);
  --home-line: var(--aisee-brand-border);
  --home-card: var(--aisee-surface-card);
  --home-cyan: var(--aisee-brand-secondary);
  --home-teal: var(--aisee-brand-primary);
  --home-blue: var(--aisee-brand-tertiary);
  --home-amber: var(--aisee-warning-solid);
  color: var(--home-text);
  background:
    linear-gradient(90deg, rgba(244, 250, 255, 0.82), rgba(255, 255, 255, 0.74) 38%, rgba(239, 249, 255, 0.92)),
    linear-gradient(180deg, #ffffff 0%, #f8fcff 46%, #ffffff 100%);
  box-sizing: border-box;
  margin: calc(var(--vp-nav-height, 64px) * -1) calc(50% - 50vw) 0;
  max-width: 100vw;
  padding: var(--vp-nav-height, 64px) max(34px, calc((100vw - 1510px) / 2)) 48px;
  overflow: hidden;
}

.aisee-home *,
.aisee-home *::before,
.aisee-home *::after {
  box-sizing: border-box;
}

.home-hero {
  display: grid;
  gap: clamp(64px, 5.2vw, 92px);
  grid-template-columns: minmax(520px, 0.9fr) minmax(620px, 1.1fr);
  min-height: min(560px, calc(100vh - 150px));
  align-items: center;
  padding: 58px 0 18px clamp(14px, 2.6vw, 44px);
}

.hero-copy {
  max-width: 740px;
  min-width: 0;
  padding-bottom: 8px;
}

.eyebrow {
  color: var(--home-teal);
  font-size: clamp(1.12rem, 1.52vw, 1.48rem);
  font-weight: 880;
  letter-spacing: 0;
  line-height: 1.2;
  margin: 0 0 22px;
}

.hero-copy h1 {
  color: var(--home-text);
  font-size: clamp(3.5rem, 4.65vw, 5.65rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0;
  margin: 0;
}

.hero-copy .hero-title-zh {
  font-size: clamp(3.2rem, 4.15vw, 5.05rem);
}

.hero-title__line {
  display: block;
  overflow: visible;
}

.hero-title__char {
  display: inline-block;
  transform-origin: 50% 82%;
  will-change: opacity, transform;
}

.hero-title__char--ai {
  --ai-glow-alpha: 0;
  background: linear-gradient(180deg, var(--home-cyan) 0%, var(--home-teal) 92%);
  background-clip: text;
  color: transparent;
  font-style: normal;
  text-shadow: 0 0 26px rgba(18, 200, 208, var(--ai-glow-alpha));
  transform-origin: 50% 62%;
}

.hero-title-zh .hero-title__line {
  white-space: nowrap;
}

.hero-subtitle {
  color: color-mix(in oklch, var(--home-text) 72%, white);
  font-size: clamp(1.02rem, 1.25vw, 1.2rem);
  line-height: 1.78;
  margin: 24px 0 0;
  overflow-wrap: break-word;
}

.hero-slogan {
  color: var(--aisee-brand-text-strong);
  font-size: clamp(1rem, 1.18vw, 1.14rem);
  font-weight: 850;
  line-height: 1.45;
  margin: 18px 0 0;
  overflow-wrap: break-word;
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
  overflow-wrap: break-word;
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

.method-system {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(243, 251, 255, 0.82)),
    radial-gradient(circle at 88% 10%, rgba(34, 211, 238, 0.14), transparent 34%),
    radial-gradient(circle at 18% 78%, rgba(217, 119, 6, 0.12), transparent 30%);
  border: 1px solid rgba(8, 155, 176, 0.18);
  border-radius: 8px;
  box-shadow: 0 18px 46px rgba(39, 62, 83, 0.06);
  isolation: isolate;
  max-width: 660px;
  min-height: 500px;
  overflow: hidden;
  padding: 24px;
  position: relative;
  width: 100%;
}

.method-system::before {
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

.method-system::after {
  background: linear-gradient(90deg, rgba(8, 155, 176, 0.24), rgba(23, 85, 184, 0.12), rgba(217, 119, 6, 0.18));
  content: "";
  height: 3px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.method-system__links {
  inset: 0;
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.method-system__link,
.method-system__loop {
  stroke: rgba(8, 155, 176, 0.36);
  stroke-width: 2.4;
  stroke-dasharray: 8 8;
}

.method-system__loop--secondary,
.method-system__link--amber {
  stroke: rgba(217, 119, 6, 0.32);
}

.method-system__core {
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
  max-width: 420px;
  padding: 16px;
  position: relative;
  z-index: 1;
}

.method-system__core > span {
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(191, 236, 255, 0.24);
  border-radius: 8px;
  display: flex;
  flex: 0 0 auto;
  height: 42px;
  justify-content: center;
  width: 42px;
}

.method-system__core > div,
.method-node > div {
  min-width: 0;
}

.method-system__core strong {
  display: block;
  font-size: 1.08rem;
  font-weight: 850;
}

.method-system__core p {
  color: rgba(232, 248, 255, 0.78);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 5px 0 0;
  overflow-wrap: break-word;
}

.method-system__nodes {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 18px;
  position: relative;
  z-index: 1;
}

.method-node__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.method-node__chips--grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.method-node__chips b {
  background: rgba(248, 252, 255, 0.86);
  border: 1px solid rgba(23, 85, 184, 0.12);
  border-radius: 999px;
  color: #19406f;
  font-size: 0.72rem;
  font-weight: 760;
  line-height: 1.2;
  min-height: 26px;
  padding: 5px 8px;
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

.section-kicker {
  color: var(--home-teal);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  margin: 0 0 10px;
  text-transform: uppercase;
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
.open-grid,
.path-grid {
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
.principle-card,
.framework-step,
.path-card {
  background: var(--home-card);
  border: 1px solid var(--home-line);
  border-radius: 8px;
  box-shadow: 0 18px 42px rgba(39, 62, 83, 0.06);
}

.domain-card {
  color: var(--home-text);
  display: grid;
  gap: 28px;
  grid-template-rows: auto 1fr;
  min-height: 176px;
  overflow: hidden;
  padding: 22px;
  position: relative;
  text-decoration: none;
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
.open-icon,
.framework-step__icon {
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
.open-card h3,
.framework-step h3 {
  font-size: 1.12rem;
  margin: 0;
}

.domain-card p,
.principle-card p,
.open-card p,
.framework-step p,
.path-card p {
  color: var(--home-muted);
  font-size: 0.93rem;
  line-height: 1.6;
  margin: 8px 0 0;
}

.principle-flow {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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

.framework-rail {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  margin-top: 30px;
  position: relative;
}

.framework-rail::before {
  background: linear-gradient(90deg, rgba(8, 155, 176, 0.22), rgba(23, 85, 184, 0.18), rgba(217, 119, 6, 0.18));
  content: "";
  height: 2px;
  left: 5%;
  position: absolute;
  right: 5%;
  top: 26px;
  z-index: 0;
}

.framework-step {
  min-height: 190px;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.framework-step__icon {
  height: 34px;
  margin-bottom: 18px;
  position: relative;
  width: 34px;
  z-index: 1;
}

.framework-step__index {
  color: rgba(23, 85, 184, 0.28);
  font-size: 1.55rem;
  font-weight: 900;
  line-height: 1;
  position: absolute;
  right: 18px;
  top: 18px;
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

.path-card strong {
  color: #0a2a54;
  display: block;
  font-size: 1.08rem;
  font-weight: 850;
  line-height: 1.35;
}

.learning-path {
  display: grid;
  gap: 0;
  grid-template-columns: repeat(5, minmax(0, 1fr));
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

.path-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.path-card {
  color: var(--home-text);
  min-height: 150px;
  padding: 24px;
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.path-card:hover {
  border-color: rgba(8, 145, 178, 0.42);
  transform: translateY(-3px);
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

[data-theme="dark"] .method-system {
  background:
    linear-gradient(135deg, rgba(12, 22, 34, 0.8), rgba(8, 17, 29, 0.72)),
    radial-gradient(circle at 72% 36%, rgba(34, 211, 238, 0.12), transparent 34%),
    radial-gradient(circle at 24% 68%, rgba(217, 119, 6, 0.08), transparent 28%);
}

[data-theme="dark"] .method-node,
[data-theme="dark"] .method-map__ticks span,
[data-theme="dark"] .method-node__chips b,
[data-theme="dark"] .domain-card,
[data-theme="dark"] .pillar-card,
[data-theme="dark"] .open-card,
[data-theme="dark"] .principle-card,
[data-theme="dark"] .framework-step,
[data-theme="dark"] .path-card {
  background: rgba(11, 24, 38, 0.78);
  border-color: rgba(148, 213, 255, 0.16);
}

[data-theme="dark"] .aisee-home .domain-icon,
[data-theme="dark"] .aisee-home .pillar-icon,
[data-theme="dark"] .aisee-home .principle-mark,
[data-theme="dark"] .aisee-home .open-icon,
[data-theme="dark"] .aisee-home .framework-step__icon,
[data-theme="dark"] .aisee-home .method-node__icon {
  background: rgba(17, 53, 73, 0.78);
  border-color: rgba(74, 201, 220, 0.42);
  color: rgba(181, 246, 255, 0.9);
}

[data-theme="dark"] .aisee-home .method-node__icon--amber,
[data-theme="dark"] .aisee-home .principle-mark {
  background: rgba(70, 42, 20, 0.68);
  border-color: rgba(245, 158, 11, 0.42);
  color: rgba(255, 218, 158, 0.92);
}

[data-theme="dark"] .pillar-card--primary {
  background:
    linear-gradient(135deg, rgba(14, 58, 71, 0.82), rgba(12, 26, 42, 0.9)),
    rgba(11, 24, 38, 0.86);
  border-color: rgba(74, 201, 220, 0.34);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.24);
}

[data-theme="dark"] .pillar-card--primary .pillar-icon {
  background: rgba(17, 88, 106, 0.55);
  border-color: rgba(74, 201, 220, 0.55);
  color: rgba(181, 246, 255, 0.92);
}

[data-theme="dark"] .method-node strong,
[data-theme="dark"] .pillar-card strong,
[data-theme="dark"] .path-card strong {
  color: rgba(235, 248, 255, 0.92);
}

[data-theme="dark"] .method-node p,
[data-theme="dark"] .pillar-card span:last-child,
[data-theme="dark"] .framework-step p,
[data-theme="dark"] .path-card p {
  color: rgba(220, 235, 245, 0.7);
}

[data-theme="dark"] .method-map__ticks span,
[data-theme="dark"] .method-node__chips b {
  color: rgba(235, 248, 255, 0.82);
}

[data-theme="dark"] .open-section {
  background:
    linear-gradient(90deg, rgba(10, 30, 44, 0.78), rgba(8, 18, 31, 0.86) 48%, rgba(9, 28, 43, 0.78)),
    linear-gradient(180deg, rgba(15, 55, 70, 0.18), rgba(8, 17, 29, 0.7));
  border-color: rgba(148, 213, 255, 0.16);
}

[data-theme="dark"] .open-action {
  background: rgba(11, 24, 38, 0.82);
  border-color: rgba(148, 213, 255, 0.18);
  color: rgba(235, 248, 255, 0.9);
}

[data-theme="dark"] .open-action--primary {
  background: linear-gradient(135deg, #089bb0, #087e82);
  border-color: transparent;
  color: #fff !important;
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

  .method-map,
  .method-system {
    max-width: 680px;
  }

  .domain-grid,
  .framework-rail {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .principle-flow,
  .open-grid,
  .path-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

}

@media (max-width: 760px) {
  .aisee-home {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding-left: 20px;
    padding-right: 20px;
  }

  .home-hero {
    min-height: auto;
    padding: 52px 0 44px;
  }

  .hero-copy h1 {
    font-size: clamp(2.35rem, 10vw, 3.25rem);
    line-height: 1.12;
    overflow-wrap: break-word;
  }

  .hero-title-zh .hero-title__line {
    white-space: normal;
  }

  .domain-grid,
  .principle-flow,
  .framework-rail,
  .pillar-grid,
  .open-grid,
  .path-grid,
  .learning-path {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 0;
  }

  .method-map,
  .method-system {
    margin-top: 8px;
    padding: 18px;
  }

  .method-map__core,
  .method-system__core {
    max-width: none;
  }

  .method-flow,
  .method-system__nodes {
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

  .method-system {
    min-height: 0;
  }

  .method-system__links {
    display: none;
  }

  .method-node__chips--grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .section-heading-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .principle-flow::before,
  .framework-rail::before,
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
