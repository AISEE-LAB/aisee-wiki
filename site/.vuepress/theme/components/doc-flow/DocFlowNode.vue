<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

export interface DocFlowNodeData {
  title: string
  subtitle?: string
  description?: string
  badge?: string
  kind?: 'start' | 'process' | 'decision' | 'io' | 'data' | 'guard' | 'agent' | 'end'
  href?: string
  sourcePosition?: Position
  targetPosition?: Position
}

defineProps<{
  data: DocFlowNodeData
}>()
</script>

<template>
  <div class="doc-flow-node" :class="`doc-flow-node--${data.kind ?? 'process'}`">
    <Handle
      type="target"
      :position="data.targetPosition ?? Position.Left"
      class="doc-flow-node__handle"
    />
    <a v-if="data.href" class="doc-flow-node__link" :href="data.href">
      <span v-if="data.badge" class="doc-flow-node__badge">{{ data.badge }}</span>
      <strong>{{ data.title }}</strong>
      <small v-if="data.subtitle">{{ data.subtitle }}</small>
      <p v-if="data.description">{{ data.description }}</p>
    </a>
    <div v-else class="doc-flow-node__link">
      <span v-if="data.badge" class="doc-flow-node__badge">{{ data.badge }}</span>
      <strong>{{ data.title }}</strong>
      <small v-if="data.subtitle">{{ data.subtitle }}</small>
      <p v-if="data.description">{{ data.description }}</p>
    </div>
    <Handle
      type="source"
      :position="data.sourcePosition ?? Position.Right"
      class="doc-flow-node__handle"
    />
  </div>
</template>

<style scoped>
.doc-flow-node {
  --doc-node-color: oklch(50% 0.12 188);
  position: relative;
  width: 210px;
  min-height: 76px;
  color: var(--doc-node-color);
}

.doc-flow-node__link {
  display: grid;
  min-height: 76px;
  align-content: center;
  padding: 12px 15px;
  border: 1.5px solid color-mix(in oklch, currentColor 36%, var(--vp-c-divider));
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, currentColor 8%, transparent), transparent 58%),
    color-mix(in oklch, var(--vp-c-bg) 95%, white);
  color: inherit;
  box-shadow:
    0 16px 32px color-mix(in oklch, currentColor 12%, transparent),
    inset 0 1px 0 color-mix(in oklch, white 56%, transparent);
  text-decoration: none;
}

a.doc-flow-node__link:hover {
  border-color: color-mix(in oklch, currentColor 58%, var(--vp-c-divider));
  color: inherit;
  text-decoration: none;
  transform: translateY(-1px);
}

.doc-flow-node__badge {
  width: fit-content;
  margin-bottom: 7px;
  color: currentColor;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
}

.doc-flow-node strong {
  color: var(--vp-c-text-1);
  font-size: 15px;
  font-weight: 850;
  line-height: 1.32;
}

.doc-flow-node small {
  margin-top: 4px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.35;
}

.doc-flow-node p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.55;
}

.doc-flow-node--start,
.doc-flow-node--end {
  --doc-node-color: oklch(49% 0.12 188);
}

.doc-flow-node--start .doc-flow-node__link,
.doc-flow-node--end .doc-flow-node__link {
  border-radius: 999px;
  text-align: center;
}

.doc-flow-node--decision {
  --doc-node-color: oklch(58% 0.13 58);
}

.doc-flow-node--decision .doc-flow-node__link {
  border-radius: 18px 4px;
}

.doc-flow-node--io {
  --doc-node-color: oklch(52% 0.12 255);
}

.doc-flow-node--io .doc-flow-node__link {
  border-radius: 8px;
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
  padding-right: 24px;
  padding-left: 24px;
}

.doc-flow-node--data {
  --doc-node-color: oklch(55% 0.11 280);
}

.doc-flow-node--guard {
  --doc-node-color: oklch(56% 0.13 138);
}

.doc-flow-node--agent {
  --doc-node-color: oklch(54% 0.13 35);
}

.doc-flow-node__handle {
  width: 7px;
  height: 7px;
  border: 0;
  background: currentColor;
  opacity: 0;
}

[data-theme="dark"] .doc-flow-node__link {
  background:
    linear-gradient(135deg, color-mix(in oklch, currentColor 9%, transparent), transparent 58%),
    color-mix(in oklch, var(--vp-c-bg) 84%, oklch(24% 0.02 240));
  border-color: color-mix(in oklch, currentColor 30%, var(--vp-c-divider));
  box-shadow:
    0 16px 32px color-mix(in oklch, black 26%, transparent),
    inset 0 1px 0 color-mix(in oklch, white 10%, transparent);
}

[data-theme="dark"] .doc-flow-node--decision {
  --doc-node-color: oklch(72% 0.13 58);
}

[data-theme="dark"] .doc-flow-node--guard {
  --doc-node-color: oklch(68% 0.13 138);
}

[data-theme="dark"] .doc-flow-node--agent {
  --doc-node-color: oklch(70% 0.13 35);
}
</style>
