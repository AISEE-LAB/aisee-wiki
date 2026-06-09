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

const cardClass = computed(() => cn('ui-card', `ui-card--${props.tone}`, props.class))
</script>

<template>
  <article :class="cardClass">
    <slot />
  </article>
</template>

<style scoped>
.ui-card {
  background: var(--aisee-surface-card);
  border: 1px solid color-mix(in oklch, var(--aisee-brand-border) 76%, var(--vp-c-divider));
  border-radius: 8px;
  box-shadow: 0 18px 42px rgba(35, 64, 98, 0.09);
  backdrop-filter: blur(14px);
}

.ui-card--cyan {
  border-color: var(--aisee-brand-border-strong);
  box-shadow: 0 18px 42px color-mix(in srgb, var(--aisee-brand-primary) 10%, transparent);
}

.ui-card--amber {
  background: var(--aisee-warning-surface);
  border-color: var(--aisee-warning-border);
  box-shadow: 0 18px 42px color-mix(in srgb, var(--aisee-warning-solid) 10%, transparent);
}

.ui-card--deep {
  background:
    radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--aisee-brand-secondary) 52%, transparent), transparent 42%),
    var(--aisee-brand-gradient-deep);
  border-color: var(--aisee-deep-border);
  box-shadow: 0 24px 58px color-mix(in srgb, var(--aisee-brand-primary) 24%, transparent), inset 0 0 34px rgba(255, 255, 255, 0.12);
}

[data-theme="dark"] .ui-card {
  background: var(--aisee-surface-card);
  border-color: color-mix(in oklch, var(--aisee-brand-border) 78%, var(--vp-c-divider));
}

[data-theme="dark"] .ui-card--amber {
  background: var(--aisee-warning-surface);
}
</style>
