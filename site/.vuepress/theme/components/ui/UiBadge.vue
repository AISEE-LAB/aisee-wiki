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
  background: rgba(248, 252, 255, 0.94);
  border: 1px solid rgba(23, 85, 184, 0.13);
  border-radius: 999px;
  color: #19406f;
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
  background: rgba(236, 254, 255, 0.9);
  border-color: rgba(8, 155, 176, 0.22);
  color: #075985;
}

.ui-badge--amber {
  background: rgba(255, 247, 237, 0.92);
  border-color: rgba(217, 119, 6, 0.22);
  color: #9a4b06;
}

.ui-badge--deep {
  background: rgba(255, 255, 255, 0.11);
  border-color: rgba(191, 236, 255, 0.2);
  color: #e8f8ff;
}

[data-theme="dark"] .ui-badge {
  background: rgba(11, 24, 38, 0.78);
  border-color: rgba(148, 213, 255, 0.16);
  color: rgba(214, 235, 255, 0.9);
}

[data-theme="dark"] .ui-badge--cyan {
  background: rgba(9, 58, 72, 0.62);
  border-color: rgba(74, 201, 220, 0.32);
  color: rgba(181, 246, 255, 0.92);
}

[data-theme="dark"] .ui-badge--amber {
  background: rgba(70, 42, 20, 0.62);
  border-color: rgba(245, 158, 11, 0.34);
  color: rgba(255, 218, 158, 0.92);
}

[data-theme="dark"] .ui-badge--deep {
  background: rgba(255, 255, 255, 0.11);
  border-color: rgba(191, 236, 255, 0.2);
  color: #e8f8ff;
}
</style>
