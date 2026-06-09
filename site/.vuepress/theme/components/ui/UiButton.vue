<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  variant?: 'primary' | 'secondary'
}>(), {
  class: '',
  variant: 'primary',
})

const buttonClass = computed(() => cn('ui-button', `ui-button--${props.variant}`, props.class))
</script>

<template>
  <span :class="buttonClass">
    <slot />
  </span>
</template>

<style scoped>
.ui-button {
  align-items: center;
  border-radius: 8px;
  display: inline-flex;
  font-weight: 700;
  gap: 10px;
  justify-content: center;
  min-height: 52px;
  padding: 0 26px;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.ui-button--primary {
  background: var(--aisee-brand-gradient);
  box-shadow: 0 18px 34px color-mix(in srgb, var(--aisee-brand-primary) 24%, transparent);
  color: #fff;
}

.ui-button--secondary {
  background: color-mix(in oklch, var(--aisee-brand-surface) 42%, var(--aisee-surface-card));
  border: 1px solid var(--aisee-brand-border);
  color: var(--aisee-brand-text-strong);
}

[data-theme="dark"] .ui-button--secondary {
  background: color-mix(in oklch, var(--aisee-brand-surface-strong) 52%, var(--aisee-surface-card));
  border-color: var(--aisee-brand-border);
  color: var(--aisee-brand-text-strong);
}
</style>
