<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  title?: string
  caption?: string
}>(), {
  title: '',
  caption: '',
})
</script>

<template>
  <figure class="diagram-figure">
    <figcaption v-if="title || caption" class="diagram-figure__caption">
      <strong v-if="title">{{ title }}</strong>
      <span v-if="caption">{{ caption }}</span>
    </figcaption>
    <a :href="src" target="_blank" rel="noreferrer" class="diagram-figure__media">
      <img :src="src" :alt="title || caption || 'diagram'" loading="lazy">
    </a>
  </figure>
</template>

<style scoped>
.diagram-figure {
  margin: 30px 0;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(49% 0.12 188) 10%, transparent), transparent 42%),
    color-mix(in oklch, var(--vp-c-bg) 93%, oklch(96% 0.012 205));
  box-shadow: 0 18px 44px color-mix(in oklch, var(--vp-c-text-1) 8%, transparent);
}

.diagram-figure__caption {
  display: grid;
  gap: 6px;
  padding: 20px 24px 14px;
}

.diagram-figure__caption strong {
  color: var(--vp-c-text-1);
  font-size: 22px;
  line-height: 1.3;
}

.diagram-figure__caption span {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.diagram-figure__media {
  display: block;
  padding: 16px;
  border-top: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
}

.diagram-figure img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
  background: #fff;
}

[data-theme="dark"] .diagram-figure {
  background: color-mix(in oklch, var(--vp-c-bg) 86%, oklch(25% 0.018 240));
}

[data-theme="dark"] .diagram-figure img {
  filter: brightness(0.94);
}

@media (max-width: 760px) {
  .diagram-figure__caption {
    padding: 16px 16px 12px;
  }

  .diagram-figure__caption strong {
    font-size: 19px;
  }

  .diagram-figure__media {
    padding: 10px;
    overflow-x: auto;
  }

  .diagram-figure img {
    min-width: 720px;
  }
}
</style>
