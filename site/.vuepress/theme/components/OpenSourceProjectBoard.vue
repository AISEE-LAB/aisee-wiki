<script setup lang="ts">
import { computed } from 'vue'

type Locale = 'zh' | 'en'

type LocalizedText = {
  zh: string
  en: string
}

type Project = {
  name: string
  repo: string
  github: string
  site?: string
  avatar: string
  updatedAt: string
  description: LocalizedText
  audience: LocalizedText
  relation: LocalizedText
  tags: string[]
}

type ProjectTrack = {
  key: string
  title: LocalizedText
  projects: Project[]
}

const props = withDefaults(defineProps<{
  locale?: Locale
}>(), {
  locale: 'zh',
})

const tracks: ProjectTrack[] = [
  {
    key: 'workflow-core',
    title: {
      zh: '工作流核心',
      en: 'Workflow Core',
    },
    projects: [
      {
        name: 'aisee-plugin',
        repo: 'AISEE-LAB/aisee-plugin',
        github: 'https://github.com/AISEE-LAB/aisee-plugin',
        site: 'https://aisee.wiki',
        avatar: 'https://avatars.githubusercontent.com/u/283897964?v=4',
        updatedAt: '2026-06-08',
        description: {
          zh: 'AI software engineering toolkit，围绕 OpenSpec 与 Compound Engineering 工作流组织能力，是 AISEE 主线插件入口。',
          en: 'An AI software engineering toolkit organized around OpenSpec and Compound Engineering workflows, serving as the main plugin entry in the AISEE stack.',
        },
        audience: {
          zh: '适合想把 spec、执行、评审和沉淀串成一条工作流的团队或个人。',
          en: 'Best for teams or individuals who want one workflow for spec, execution, review, and knowledge capture.',
        },
        relation: {
          zh: '它连接本站的 AISEE、OpenSpec 和 Compound Engineering 叙事，是“方法论如何落地”的直接实现。',
          en: 'It connects the AISEE, OpenSpec, and Compound Engineering narratives in this wiki and acts as the implementation layer behind the methodology.',
        },
        tags: ['OpenSpec', 'Compound', 'Plugin', 'Workflow'],
      },
    ],
  },
  {
    key: 'knowledge-assets',
    title: {
      zh: '知识与技能资产',
      en: 'Knowledge & Skill Assets',
    },
    projects: [
      {
        name: 'skills-for-chinese',
        repo: 'AISEE-LAB/skills-for-chinese',
        github: 'https://github.com/AISEE-LAB/skills-for-chinese',
        avatar: 'https://avatars.githubusercontent.com/u/283897964?v=4',
        updatedAt: '2026-05-27',
        description: {
          zh: '本地 AI Coding Skills 中文图鉴，帮助中文用户快速看懂本机已安装的 skills、用途与入口。',
          en: 'A Chinese-language guide to locally installed AI Coding skills, helping users understand what is installed, what each skill does, and where to start.',
        },
        audience: {
          zh: '适合希望降低 skill 学习门槛、让团队成员先看懂再使用的人。',
          en: 'Best for readers who want to lower the learning curve for skills and help teammates understand them before using them.',
        },
        relation: {
          zh: '它补的是“能力可见性”这一层，适合作为 AISEE 生态里的入门解释器和知识索引。',
          en: 'It fills the “capability visibility” layer and works as an onboarding explainer plus a knowledge index inside the AISEE ecosystem.',
        },
        tags: ['Skills', 'Chinese', 'Catalog', 'Onboarding'],
      },
    ],
  },
]

function t(text: LocalizedText): string {
  return props.locale === 'en' ? text.en : text.zh
}

const projects = computed(() =>
  tracks.flatMap(track =>
    track.projects.map(project => ({
      ...project,
      trackTitle: t(track.title),
    })),
  ),
)
</script>

<template>
  <section class="oss-project-board" :aria-label="locale === 'en' ? 'Open source project board' : '开源项目看板'">
    <div class="oss-project-board__grid">
      <article v-for="project in projects" :key="project.repo" class="oss-project-card">
        <div class="oss-project-card__top">
          <span class="oss-project-card__icon">
            <img v-if="project.avatar" :src="project.avatar" :alt="`${project.name} avatar`" loading="lazy">
            <span v-else>{{ project.name.slice(0, 1).toUpperCase() }}</span>
          </span>
          <div class="oss-project-card__heading">
            <div>
              <strong>{{ project.name }}</strong>
              <small>{{ project.repo }}</small>
            </div>
          </div>
        </div>

        <p class="oss-project-card__description">
          {{ t(project.description) }}
        </p>

        <div class="oss-project-card__meta">
          <span>{{ project.trackTitle }}</span>
          <span>{{ project.updatedAt }}</span>
        </div>

        <div class="oss-project-card__tags" :aria-label="locale === 'en' ? 'Tags' : '标签'">
          <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>

        <div class="oss-project-card__links">
          <a :href="project.github" target="_blank" rel="noreferrer">GitHub</a>
          <a v-if="project.site" :href="project.site" target="_blank" rel="noreferrer">
            {{ locale === 'en' ? 'Docs' : '文档' }}
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
:global(.open-source-wide .vp-doc-container) {
  padding-right: 20px;
  padding-left: 20px;
}

:global(.open-source-wide .vp-doc-container .container),
:global(.open-source-wide .vp-doc-container.has-sidebar .container) {
  max-width: 1360px !important;
}

:global(.open-source-wide .vp-doc-container .content),
:global(.open-source-wide .vp-doc-container:not(.has-sidebar) .content) {
  width: min(100%, 1320px) !important;
  max-width: 1320px !important;
}

:global(.open-source-wide .vp-doc-container .content-container),
:global(.open-source-wide .vp-doc-container.has-aside .content-container) {
  width: 100%;
  max-width: none;
}

:global(.open-source-wide .vp-doc.plume-content) {
  max-width: none;
}

.oss-project-board {
  --oss-brand-border: var(--aisee-brand-border);
  --oss-brand-border-strong: var(--aisee-brand-border-strong);
  --oss-brand-text: var(--aisee-brand-text);
  --oss-card-bg: var(--aisee-surface-card-alt);
  margin: 12px 0 32px;
}

.oss-project-card {
  border: 1px solid color-mix(in oklch, var(--oss-brand-border) 78%, var(--vp-c-divider));
  border-radius: 8px;
  background: var(--oss-card-bg);
}

.oss-project-card__heading small,
.oss-project-card__meta,
.oss-project-card__tags span {
  color: var(--vp-c-text-2);
}

.oss-project-card__links a:hover,
.oss-project-card:hover {
  border-color: var(--oss-brand-border-strong);
  transform: translateY(-1px);
}

.oss-project-card__description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.65;
}

.oss-project-board__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.oss-project-card {
  display: grid;
  gap: 10px;
  padding: 14px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.oss-project-card__top {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: start;
}

.oss-project-card__icon {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--aisee-brand-gradient-soft);
  flex-shrink: 0;
}

.oss-project-card__icon > span {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--oss-brand-text);
  font-size: 16px;
  font-weight: 800;
}

.oss-project-card__icon img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.oss-project-card__heading {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: start;
}

.oss-project-card__heading strong,
.oss-project-card__heading small {
  display: block;
}

.oss-project-card__heading strong {
  color: var(--vp-c-text-1);
  font-size: 15px;
  line-height: 1.3;
}

.oss-project-card__heading small {
  margin-top: 2px;
  font-size: 11px;
  line-height: 1.4;
}

.oss-project-card__tags span {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.oss-project-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  line-height: 1.5;
}

.oss-project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.oss-project-card__tags span {
  background: color-mix(in oklch, var(--vp-c-bg) 70%, var(--vp-c-bg-soft));
}

.oss-project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.oss-project-card__links a {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid color-mix(in oklch, var(--oss-brand-border) 76%, var(--vp-c-divider));
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

[data-theme="dark"] .oss-project-card,
[data-theme="dark"] .oss-project-card__links a {
  background: var(--aisee-surface-card);
}

@media (max-width: 960px) {
  .oss-project-board__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  :global(.open-source-wide .vp-doc-container) {
    padding-right: 14px;
    padding-left: 14px;
  }

  .oss-project-board__grid {
    grid-template-columns: 1fr;
  }

  .oss-project-card__heading {
    display: grid;
  }
}
</style>
