<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  tone?: 'default' | 'cyan' | 'amber' | 'deep'
}>(), {
  class: '',
  tone: 'default',
})

const badgeClass = computed(() => cn('ui-badge', `ui-badge--${props.tone}`, props.class))
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<style scoped>
.ui-badge {
  align-items: center;
  background: color-mix(in oklch, var(--aisee-brand-surface) 44%, var(--aisee-surface-card));
  border: 1px solid var(--aisee-brand-border);
  border-radius: 999px;
  color: var(--aisee-brand-text-strong);
  display: inline-flex;
  font-size: 0.78rem;
  font-weight: 740;
  justify-content: center;
  line-height: 1.2;
  min-height: 30px;
  padding: 6px 11px;
  text-align: center;
}

.ui-badge--cyan {
  background: var(--aisee-brand-surface);
  border-color: var(--aisee-brand-border-strong);
  color: var(--aisee-brand-text);
}

.ui-badge--amber {
  background: var(--aisee-warning-surface);
  border-color: var(--aisee-warning-border);
  color: var(--aisee-warning-text);
}

.ui-badge--deep {
  background: color-mix(in oklch, var(--aisee-brand-surface-strong) 68%, transparent);
  border-color: var(--aisee-deep-border);
  color: var(--aisee-deep-text);
}

[data-theme="dark"] .ui-badge {
  background: var(--aisee-surface-card);
  border-color: var(--aisee-brand-border);
  color: var(--aisee-brand-text-strong);
}

[data-theme="dark"] .ui-badge--cyan {
  background: var(--aisee-brand-surface);
  border-color: var(--aisee-brand-border-strong);
  color: var(--aisee-brand-text);
}

[data-theme="dark"] .ui-badge--amber {
  background: var(--aisee-warning-surface);
  border-color: var(--aisee-warning-border);
  color: var(--aisee-warning-text);
}

[data-theme="dark"] .ui-badge--deep {
  background: color-mix(in oklch, var(--aisee-brand-surface-strong) 52%, transparent);
  border-color: var(--aisee-deep-border);
  color: var(--aisee-deep-text);
}
</style>
