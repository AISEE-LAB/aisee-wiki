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
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(32, 86, 130, 0.16);
  border-radius: 8px;
  box-shadow: 0 18px 42px rgba(35, 64, 98, 0.09);
  backdrop-filter: blur(14px);
}

.ui-card--cyan {
  border-color: rgba(8, 155, 176, 0.22);
  box-shadow: 0 18px 42px rgba(8, 155, 176, 0.1);
}

.ui-card--amber {
  background: rgba(255, 249, 238, 0.92);
  border-color: rgba(217, 119, 6, 0.22);
  box-shadow: 0 18px 42px rgba(217, 119, 6, 0.08);
}

.ui-card--deep {
  background:
    radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.52), transparent 42%),
    linear-gradient(180deg, rgba(8, 63, 104, 0.96), rgba(5, 45, 75, 0.98));
  border-color: rgba(88, 215, 255, 0.5);
  box-shadow: 0 24px 58px rgba(13, 91, 151, 0.24), inset 0 0 34px rgba(255, 255, 255, 0.12);
}

[data-theme="dark"] .ui-card {
  background: rgba(11, 24, 38, 0.74);
  border-color: rgba(148, 213, 255, 0.16);
}

[data-theme="dark"] .ui-card--amber {
  background: rgba(44, 30, 12, 0.74);
}
</style>
