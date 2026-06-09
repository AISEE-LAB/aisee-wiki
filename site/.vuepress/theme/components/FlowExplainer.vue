<script setup lang="ts">
import { computed } from 'vue'

type FlowStatus = 'default' | 'active' | 'done' | 'blocked' | 'risk'
type FlowConnectionType = 'next' | 'depends' | 'feedback' | 'gate'
type FlowMode = 'auto' | 'lanes' | 'timeline'

interface FlowItem {
  id: string
  title: string
  description?: string
  status?: FlowStatus
  accent?: string
  href?: string
  highlight?: boolean
}

interface FlowStage {
  id: string
  title: string
  description?: string
  accent?: string
  items: FlowItem[]
}

interface FlowConnection {
  from: string
  to: string
  label?: string
  type?: FlowConnectionType
}

interface FlowLegendItem {
  status: FlowStatus
  label: string
  description?: string
}

const props = withDefaults(defineProps<{
  title: string
  eyebrow?: string
  description?: string
  mode?: FlowMode
  stages: FlowStage[]
  connections?: FlowConnection[]
  legend?: FlowLegendItem[]
}>(), {
  eyebrow: 'Flow explainer',
  description: '',
  mode: 'auto',
  connections: () => [],
  legend: () => [],
})

const statusText: Record<FlowStatus, string> = {
  default: '说明',
  active: '当前重点',
  done: '已完成',
  blocked: '受阻',
  risk: '风险',
}

const connectionText: Record<FlowConnectionType, string> = {
  next: '下一步',
  depends: '依赖',
  feedback: '回流',
  gate: '验证',
}

const stageCount = computed(() => Math.max(props.stages.length, 1))
const displayMode = computed<'lanes' | 'timeline'>(() => {
  if (props.mode === 'lanes' || props.mode === 'timeline') return props.mode
  return props.stages.length > 4 ? 'timeline' : 'lanes'
})

const visibleLegend = computed(() => {
  if (props.legend.length > 0) return props.legend

  const used = new Set<FlowStatus>()
  props.stages.forEach((stage) => {
    stage.items.forEach((item) => used.add(item.status ?? 'default'))
  })

  return Array.from(used).map((status) => ({
    status,
    label: statusText[status],
  }))
})

const nodeTitleById = computed(() => {
  const result = new Map<string, string>()
  props.stages.forEach((stage) => {
    result.set(stage.id, stage.title)
    stage.items.forEach((item) => result.set(item.id, item.title))
  })
  return result
})

function getStatus(item: FlowItem): FlowStatus {
  return item.status ?? 'default'
}

function getNodeTitle(id: string): string {
  return nodeTitleById.value.get(id) ?? id
}

function getConnectionType(connection: FlowConnection): FlowConnectionType {
  return connection.type ?? 'next'
}

function getMotionIndex(index: number, max = 8): number {
  return Math.min(index, max)
}
</script>

<template>
  <section
    class="flow-explainer"
    :class="`flow-explainer--${displayMode}`"
    :style="{ '--flow-stage-count': stageCount }"
  >
    <header class="flow-explainer__header">
      <p class="flow-explainer__eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p v-if="description" class="flow-explainer__description">{{ description }}</p>
    </header>

    <div class="flow-explainer__stages" aria-label="流程阶段">
      <section
        v-for="(stage, stageIndex) in stages"
        :key="stage.id"
        class="flow-stage"
        :class="{ 'flow-stage--last': stageIndex === stages.length - 1 }"
        :style="{ '--flow-stage-index': getMotionIndex(stageIndex) }"
      >
        <header class="flow-stage__header">
          <span class="flow-stage__index">{{ stageIndex + 1 }}</span>
          <div>
            <h3>{{ stage.title }}</h3>
            <p v-if="stage.description">{{ stage.description }}</p>
          </div>
        </header>

        <div class="flow-stage__items">
          <article
            v-for="(item, itemIndex) in stage.items"
            :key="item.id"
            class="flow-item"
            :class="[
              `flow-item--${getStatus(item)}`,
              { 'flow-item--highlight': item.highlight },
            ]"
            :style="{
              '--flow-stage-index': getMotionIndex(stageIndex),
              '--flow-item-index': getMotionIndex(itemIndex, 5),
            }"
          >
            <a v-if="item.href" class="flow-item__link" :href="item.href">
              <span class="flow-item__title">{{ item.title }}</span>
              <span class="flow-item__status">{{ statusText[getStatus(item)] }}</span>
            </a>
            <div v-else class="flow-item__body">
              <span class="flow-item__title">{{ item.title }}</span>
              <span class="flow-item__status">{{ statusText[getStatus(item)] }}</span>
            </div>
            <p v-if="item.description">{{ item.description }}</p>
            <span v-if="item.accent" class="flow-item__accent">{{ item.accent }}</span>
          </article>
        </div>
      </section>
    </div>

    <section v-if="connections.length > 0" class="flow-connections" aria-label="流程关系">
      <h3>关系说明</h3>
      <ul>
        <li
          v-for="(connection, connectionIndex) in connections"
          :key="`${connection.from}-${connection.to}-${connection.label ?? ''}`"
          :class="`flow-connection--${getConnectionType(connection)}`"
          :style="{ '--flow-connection-index': getMotionIndex(connectionIndex, 6) }"
        >
          <span class="flow-connection__type">{{ connectionText[getConnectionType(connection)] }}</span>
          <span class="flow-connection__node">{{ getNodeTitle(connection.from) }}</span>
          <span class="flow-connection__arrow" aria-hidden="true">→</span>
          <span class="flow-connection__node">{{ getNodeTitle(connection.to) }}</span>
          <span v-if="connection.label" class="flow-connection__label">{{ connection.label }}</span>
        </li>
      </ul>
    </section>

    <footer v-if="visibleLegend.length > 0" class="flow-legend" aria-label="状态图例">
      <span
        v-for="(item, legendIndex) in visibleLegend"
        :key="item.status"
        class="flow-legend__item"
        :class="`flow-legend__item--${item.status}`"
        :style="{ '--flow-legend-index': getMotionIndex(legendIndex, 5) }"
      >
        <strong>{{ item.label }}</strong>
        <span v-if="item.description">{{ item.description }}</span>
      </span>
    </footer>
  </section>
</template>

<style scoped>
.flow-explainer {
  --flow-stage-count: 3;
  --flow-accent: var(--aisee-brand-primary);
  --flow-accent-strong: var(--aisee-brand-tertiary);
  --flow-accent-soft: color-mix(in oklch, var(--aisee-brand-secondary) 14%, var(--vp-c-bg));
  --flow-border: color-mix(in oklch, var(--aisee-brand-border) 74%, var(--vp-c-divider));
  --flow-panel: var(--aisee-surface-card);
  --flow-soft: var(--aisee-surface-card-alt);
  --flow-text-muted: var(--vp-c-text-2);
  --flow-focus: var(--aisee-brand-secondary);
  --flow-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --flow-reveal-duration: 220ms;
  margin: 28px 0;
  padding: 26px;
  border: 1px solid var(--flow-border);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, var(--flow-accent-soft) 72%, transparent), transparent 42%),
    linear-gradient(315deg, color-mix(in oklch, var(--aisee-brand-tertiary) 8%, transparent), transparent 46%),
    var(--vp-c-bg);
}

.flow-explainer__header {
  max-width: 760px;
  margin-bottom: 24px;
  animation: flow-reveal var(--flow-reveal-duration) var(--flow-ease) both;
}

.flow-explainer__eyebrow {
  margin: 0 0 6px;
  color: var(--flow-accent-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.flow-explainer__header h2 {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.25;
}

.flow-explainer__description {
  margin: 10px 0 0;
  color: var(--flow-text-muted);
  line-height: 1.7;
}

.flow-explainer__stages {
  display: grid;
  grid-template-columns: repeat(var(--flow-stage-count), minmax(0, 1fr));
  gap: 18px;
}

.flow-stage {
  position: relative;
  min-width: 0;
  padding: 0;
  animation: flow-reveal var(--flow-reveal-duration) var(--flow-ease) both;
  animation-delay: calc(45ms * var(--flow-stage-index, 0));
}

.flow-stage:not(.flow-stage--last)::after {
  position: absolute;
  top: 18px;
  right: -18px;
  z-index: 1;
  width: 18px;
  height: 2px;
  background: linear-gradient(90deg, var(--flow-accent), var(--aisee-brand-tertiary));
  content: "";
  transform-origin: left center;
  animation: flow-link-draw 180ms var(--flow-ease) both;
  animation-delay: calc(80ms + 45ms * var(--flow-stage-index, 0));
}

.flow-stage__header {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  min-height: 78px;
  margin-bottom: 12px;
}

.flow-stage__index {
  display: inline-grid;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 50%;
  color: oklch(98% 0.01 190);
  background: var(--flow-accent-strong);
  font-size: 0.86rem;
  font-weight: 700;
  outline: 4px solid color-mix(in oklch, var(--flow-accent-soft) 80%, transparent);
}

.flow-stage__header h3 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.35;
}

.flow-stage__header p {
  margin: 4px 0 0;
  color: var(--flow-text-muted);
  font-size: 0.9rem;
  line-height: 1.55;
}

.flow-stage__items {
  display: grid;
  grid-auto-rows: minmax(156px, 1fr);
  gap: 9px;
}

.flow-item {
  --item-border: var(--flow-border);
  --item-bg: var(--flow-panel);
  --item-dot: oklch(58% 0.03 230);
  --item-chip-bg: color-mix(in oklch, var(--vp-c-bg-soft) 76%, transparent);
  --item-chip-text: var(--flow-text-muted);
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 156px;
  padding: 12px 13px;
  border: 1px solid var(--item-border);
  border-radius: 8px;
  background: var(--item-bg);
  animation: flow-reveal 200ms var(--flow-ease) both;
  animation-delay: calc(
    70ms + 36ms * var(--flow-stage-index, 0) + 24ms * var(--flow-item-index, 0)
  );
  transition:
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
}

.flow-item--active {
  --item-border: var(--aisee-brand-border-strong);
  --item-bg: color-mix(in oklch, var(--aisee-brand-surface) 68%, var(--vp-c-bg));
  --item-dot: var(--aisee-brand-primary);
  --item-chip-bg: color-mix(in oklch, var(--aisee-brand-surface) 82%, var(--vp-c-bg));
  --item-chip-text: var(--aisee-brand-text);
}

.flow-item--done {
  --item-border: color-mix(in oklch, oklch(58% 0.13 150) 42%, var(--flow-border));
  --item-dot: oklch(55% 0.13 150);
  --item-chip-bg: oklch(94% 0.045 150);
  --item-chip-text: oklch(36% 0.1 150);
}

.flow-item--blocked {
  --item-border: color-mix(in oklch, oklch(64% 0.14 72) 48%, var(--flow-border));
  --item-dot: oklch(64% 0.14 72);
  --item-chip-bg: oklch(94% 0.055 78);
  --item-chip-text: oklch(42% 0.1 72);
}

.flow-item--risk {
  --item-border: color-mix(in oklch, oklch(58% 0.16 26) 50%, var(--flow-border));
  --item-dot: oklch(58% 0.16 26);
  --item-chip-bg: oklch(95% 0.04 26);
  --item-chip-text: oklch(42% 0.12 26);
}

.flow-item--highlight {
  outline: 2px solid color-mix(in oklch, var(--flow-focus) 30%, transparent);
  outline-offset: 0;
}

.flow-item:hover,
.flow-item:focus-within {
  border-color: color-mix(in oklch, var(--item-dot) 68%, var(--item-border));
  transform: translateY(-1px);
}

.flow-item__link,
.flow-item__body {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 24px;
}

.flow-item__link {
  color: inherit;
  text-decoration: none;
}

.flow-item__link:focus-visible {
  outline: 2px solid var(--flow-focus);
  outline-offset: 4px;
  border-radius: 6px;
}

.flow-item__link:hover .flow-item__title {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.flow-item__title {
  position: relative;
  min-width: 0;
  padding-left: 14px;
  font-weight: 700;
  line-height: 1.42;
}

.flow-item__title::before {
  position: absolute;
  top: 0.58em;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--item-dot);
  content: "";
}

.flow-item__status,
.flow-item__accent {
  flex: 0 0 auto;
  max-width: 46%;
  padding: 2px 8px;
  border-radius: 999px;
  color: var(--item-chip-text);
  background: var(--item-chip-bg);
  font-size: 0.75rem;
  line-height: 1.5;
  white-space: normal;
}

.flow-item__status {
  max-width: 100%;
  white-space: nowrap;
}

.flow-item p {
  margin: 8px 0 0;
  color: var(--flow-text-muted);
  font-size: 0.9rem;
  line-height: 1.58;
}

.flow-item__accent {
  display: inline-block;
  align-self: flex-start;
  margin-top: auto;
  color: var(--aisee-brand-text);
  background: color-mix(in oklch, var(--aisee-brand-surface) 76%, var(--vp-c-bg));
}

.flow-connections {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--flow-border);
}

.flow-connections h3 {
  margin: 0 0 10px;
  font-size: 1rem;
}

.flow-connections ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 9px 14px;
  align-items: stretch;
  margin: 0;
  padding: 0;
  list-style: none;
}

.flow-connections li {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-content: flex-start;
  align-items: flex-start;
  min-width: 0;
  min-height: 92px;
  height: 100%;
  margin: 0;
  padding: 10px 12px;
  border: 1px solid color-mix(in oklch, var(--flow-border) 76%, transparent);
  border-radius: 8px;
  color: var(--flow-text-muted);
  background: color-mix(in oklch, var(--vp-c-bg) 82%, var(--flow-soft));
  line-height: 1.5;
  animation: flow-fade 160ms var(--flow-ease) both;
  animation-delay: calc(120ms + 26ms * var(--flow-connection-index, 0));
}

.flow-connection__type {
  padding: 2px 7px;
  border-radius: 999px;
  color: oklch(98% 0.01 190);
  background: var(--flow-accent-strong);
  font-size: 0.75rem;
  font-weight: 700;
}

.flow-connection--depends .flow-connection__type {
  background: var(--aisee-brand-tertiary);
}

.flow-connection--feedback .flow-connection__type {
  background: oklch(48% 0.15 22);
}

.flow-connection--gate .flow-connection__type {
  background: oklch(47% 0.11 68);
}

.flow-connection__node {
  color: var(--vp-c-text-1);
  font-weight: 650;
}

.flow-connection__arrow {
  color: var(--flow-accent);
  font-weight: 700;
}

.flow-connection__label {
  color: var(--flow-text-muted);
}

.flow-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.flow-legend__item {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  min-height: 32px;
  padding: 5px 10px;
  border: 1px solid var(--flow-border);
  border-radius: 999px;
  color: var(--flow-text-muted);
  background: var(--flow-panel);
  font-size: 0.8rem;
  animation: flow-reveal 180ms var(--flow-ease) both;
  animation-delay: calc(140ms + 22ms * var(--flow-legend-index, 0));
}

.flow-legend__item strong {
  color: var(--vp-c-text-1);
}

.flow-explainer--timeline .flow-explainer__stages {
  grid-template-columns: 1fr;
  gap: 0;
}

.flow-explainer--timeline .flow-stage {
  display: grid;
  grid-template-columns: minmax(180px, 0.34fr) minmax(0, 1fr);
  gap: 18px;
  padding: 0 0 18px 24px;
  border-left: 1px solid color-mix(in oklch, var(--flow-border) 92%, transparent);
}

.flow-explainer--timeline .flow-stage:last-child {
  padding-bottom: 0;
}

.flow-explainer--timeline .flow-stage::after {
  display: none;
}

.flow-explainer--timeline .flow-stage__header {
  min-height: 0;
  margin-bottom: 0;
}

.flow-explainer--timeline .flow-stage__index {
  position: absolute;
  top: 0;
  left: -14px;
}

.flow-explainer--timeline .flow-stage__items {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

[data-theme="dark"] .flow-explainer {
  --flow-accent: var(--aisee-brand-secondary);
  --flow-accent-strong: var(--aisee-brand-tertiary-strong);
  --flow-accent-soft: color-mix(in oklch, var(--aisee-brand-secondary) 22%, transparent);
  --flow-border: var(--aisee-brand-border);
  --flow-panel: var(--aisee-surface-card);
  --flow-soft: var(--aisee-surface-card-alt);
  --flow-text-muted: rgba(220, 235, 245, 0.72);
  --flow-focus: var(--aisee-brand-secondary);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--aisee-brand-secondary) 22%, transparent), transparent 42%),
    linear-gradient(315deg, color-mix(in srgb, var(--aisee-brand-tertiary) 18%, transparent), transparent 48%),
    rgba(9, 18, 30, 0.84);
}

[data-theme="dark"] .flow-explainer__eyebrow {
  color: var(--aisee-brand-text);
}

[data-theme="dark"] .flow-stage__index {
  color: var(--aisee-brand-text-strong);
  background: var(--aisee-brand-primary);
  outline-color: color-mix(in srgb, var(--aisee-brand-secondary) 24%, transparent);
}

[data-theme="dark"] .flow-stage:not(.flow-stage--last)::after {
  background: linear-gradient(90deg, var(--aisee-brand-secondary), var(--aisee-brand-tertiary-strong));
}

[data-theme="dark"] .flow-item {
  --item-border: rgba(148, 213, 255, 0.14);
  --item-bg: rgba(11, 24, 38, 0.82);
  --item-dot: rgba(156, 178, 194, 0.86);
  --item-chip-bg: rgba(255, 255, 255, 0.08);
  --item-chip-text: rgba(231, 240, 248, 0.78);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

[data-theme="dark"] .flow-item--active {
  --item-border: var(--aisee-brand-border-strong);
  --item-bg: var(--aisee-brand-surface);
  --item-dot: var(--aisee-brand-secondary);
  --item-chip-bg: color-mix(in srgb, var(--aisee-brand-secondary) 18%, transparent);
  --item-chip-text: var(--aisee-brand-text);
}

[data-theme="dark"] .flow-item--done {
  --item-border: rgba(74, 222, 128, 0.34);
  --item-dot: rgba(74, 222, 128, 0.86);
  --item-chip-bg: rgba(74, 222, 128, 0.14);
  --item-chip-text: rgba(187, 247, 208, 0.92);
}

[data-theme="dark"] .flow-item--blocked {
  --item-border: rgba(245, 158, 11, 0.36);
  --item-dot: rgba(245, 158, 11, 0.86);
  --item-chip-bg: rgba(245, 158, 11, 0.15);
  --item-chip-text: rgba(255, 218, 158, 0.92);
}

[data-theme="dark"] .flow-item--risk {
  --item-border: rgba(248, 113, 113, 0.38);
  --item-dot: rgba(248, 113, 113, 0.88);
  --item-chip-bg: rgba(248, 113, 113, 0.14);
  --item-chip-text: rgba(254, 202, 202, 0.92);
}

[data-theme="dark"] .flow-item__title {
  color: rgba(245, 250, 255, 0.92);
}

[data-theme="dark"] .flow-item p {
  color: rgba(220, 235, 245, 0.72);
}

[data-theme="dark"] .flow-item__accent {
  color: var(--aisee-brand-text);
  background: color-mix(in srgb, var(--aisee-brand-secondary) 14%, transparent);
}

[data-theme="dark"] .flow-connections li,
[data-theme="dark"] .flow-legend__item {
  background: var(--aisee-surface-card);
  border-color: var(--aisee-brand-border);
}

[data-theme="dark"] .flow-connection__type {
  color: var(--aisee-brand-text-strong);
  background: var(--aisee-brand-primary);
}

[data-theme="dark"] .flow-connection--depends .flow-connection__type {
  background: var(--aisee-brand-tertiary-strong);
}

[data-theme="dark"] .flow-connection--feedback .flow-connection__type {
  background: #b4533a;
}

[data-theme="dark"] .flow-connection--gate .flow-connection__type {
  background: #9a6a1f;
}

@media (max-width: 960px) {
  .flow-explainer__stages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .flow-connections ul {
    grid-template-columns: 1fr;
  }

  .flow-stage::after {
    display: none;
  }

  .flow-explainer--timeline .flow-stage {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

@media (max-width: 680px) {
  .flow-explainer {
    padding: 18px;
  }

  .flow-explainer__stages {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .flow-explainer--timeline .flow-stage {
    padding-left: 20px;
  }

  .flow-stage__header {
    min-height: 0;
  }

  .flow-item__link,
  .flow-item__body {
    display: grid;
    gap: 6px;
    min-height: 44px;
  }

  .flow-item__status,
  .flow-item__accent {
    max-width: 100%;
    width: fit-content;
  }
}

@media (prefers-reduced-motion: reduce) {
  .flow-explainer__header,
  .flow-stage,
  .flow-stage:not(.flow-stage--last)::after,
  .flow-item,
  .flow-connections li,
  .flow-legend__item {
    animation: none;
  }

  .flow-item {
    transition: none;
  }

  .flow-item:hover,
  .flow-item:focus-within {
    transform: none;
  }
}

@keyframes flow-reveal {
  from {
    opacity: 0;
    transform: translate3d(0, 6px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes flow-link-draw {
  from {
    opacity: 0;
    transform: scaleX(0.55);
  }

  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes flow-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
