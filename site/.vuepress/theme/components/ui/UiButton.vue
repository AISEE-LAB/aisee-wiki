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
  background: linear-gradient(135deg, #089bb0, #087e82);
  box-shadow: 0 18px 34px rgba(8, 155, 176, 0.24);
  color: #fff;
}

.ui-button--secondary {
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(29, 78, 216, 0.28);
  color: #17427e;
}

[data-theme="dark"] .ui-button--secondary {
  background: rgba(11, 24, 38, 0.78);
  border-color: rgba(148, 213, 255, 0.2);
  color: rgba(235, 248, 255, 0.92);
}
</style>
