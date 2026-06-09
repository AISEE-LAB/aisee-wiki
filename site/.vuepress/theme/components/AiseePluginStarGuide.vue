<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const repoUrl = 'https://github.com/AISEE-LAB/aisee-plugin'
const storageKey = 'aisee-plugin-star-guide:v1'

const isVisible = ref(false)
const hasClickedStarCta = ref(false)
const locale = ref<'zh' | 'en'>('zh')
const route = useRoute()

const content = computed(() => {
  if (locale.value === 'en') {
    return {
      eyebrow: 'Support AISEE Plugin',
      title: 'Thank you for supporting the core open-source project.',
      description: 'AISEE Plugin is one of the core public repos behind the workflows documented on this site. If this content is useful to you, please consider starring the repository on GitHub.',
      cta: 'Open GitHub to Star',
      close: 'I have done it, continue browsing',
      waiting: 'Click the GitHub button first to unlock close.',
    }
  }

  return {
    eyebrow: '支持核心开源项目',
    title: '感谢你支持核心开源项目。',
    description: 'AISEE Plugin 是本站工作流内容背后的核心公开仓库之一。如果这些内容对你有帮助，欢迎前往 GitHub 点亮 Star，支持项目持续演进。',
    cta: '前往 GitHub Star',
    close: '我已完成，继续浏览',
    waiting: '请先点击 GitHub 按钮，再解锁关闭。',
  }
})

function openGitHubStar(): void {
  hasClickedStarCta.value = true
}

function closeGuide(): void {
  if (!hasClickedStarCta.value)
    return

  if (typeof window !== 'undefined')
    window.sessionStorage.setItem(storageKey, 'acknowledged')
  isVisible.value = false
}

function updateGuideState(pathname: string): void {
  locale.value = pathname.startsWith('/en') ? 'en' : 'zh'

  if (pathname === '/' || pathname === '/en' || pathname === '/en/') {
    isVisible.value = false
    return
  }

  if (typeof window === 'undefined')
    return

  if (window.sessionStorage.getItem(storageKey) === 'acknowledged') {
    isVisible.value = false
    return
  }

  isVisible.value = true
}

watch(
  () => route.path,
  (pathname) => {
    updateGuideState(pathname)
  },
  { immediate: true },
)
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="star-guide" role="dialog" aria-modal="true" aria-labelledby="star-guide-title">
      <div class="star-guide__backdrop" />
      <section class="star-guide__panel">
        <p class="star-guide__eyebrow">{{ content.eyebrow }}</p>
        <h2 id="star-guide-title">{{ content.title }}</h2>
        <p class="star-guide__description">{{ content.description }}</p>

        <div class="star-guide__actions">
          <a
            class="star-guide__action star-guide__action--primary"
            :href="repoUrl"
            target="_blank"
            rel="noreferrer noopener"
            @click="openGitHubStar"
          >
            {{ content.cta }}
          </a>
          <button
            class="star-guide__action star-guide__action--secondary"
            type="button"
            :disabled="!hasClickedStarCta"
            @click="closeGuide"
          >
            {{ content.close }}
          </button>
        </div>

        <p v-if="!hasClickedStarCta" class="star-guide__hint">{{ content.waiting }}</p>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.star-guide {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 20px;
}

.star-guide__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(5, 14, 28, 0.66);
  backdrop-filter: blur(8px);
}

.star-guide__panel {
  position: relative;
  z-index: 1;
  width: min(100%, 560px);
  padding: 28px;
  border: 1px solid var(--aisee-brand-border-strong);
  border-radius: 16px;
  background:
    linear-gradient(135deg, color-mix(in oklch, var(--aisee-brand-surface) 56%, white), rgba(255, 255, 255, 0.96)),
    var(--aisee-surface-card);
  box-shadow:
    0 24px 70px rgba(5, 14, 28, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

.star-guide__eyebrow {
  margin: 0 0 8px;
  color: var(--aisee-brand-text);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.star-guide__panel h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  line-height: 1.22;
}

.star-guide__description {
  margin: 14px 0 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.75;
}

.star-guide__actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, max-content));
  gap: 12px;
  justify-content: center;
  margin-top: 22px;
}

.star-guide__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  min-width: 0;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 740;
  line-height: 1.2;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    opacity 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;
}

.star-guide__action:hover {
  transform: translateY(-1px);
}

.star-guide__action--primary {
  color: #fff;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--aisee-brand-secondary) 92%, white), var(--aisee-brand-primary));
  box-shadow:
    0 12px 26px color-mix(in srgb, var(--aisee-brand-primary) 18%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.star-guide__action--secondary {
  color: var(--aisee-brand-text-strong);
  background: rgba(255, 255, 255, 0.72);
  border-color: color-mix(in oklch, var(--aisee-brand-border) 86%, var(--vp-c-divider));
  cursor: pointer;
}

.star-guide__action--secondary:disabled {
  cursor: not-allowed;
  opacity: 0.58;
  transform: none;
  box-shadow: none;
}

.star-guide__hint {
  margin: 12px 0 0;
  color: var(--vp-c-text-3);
  font-size: 0.88rem;
  line-height: 1.55;
  text-align: center;
}

[data-theme="dark"] .star-guide__panel {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--aisee-brand-secondary) 16%, transparent), transparent),
    var(--aisee-surface-card);
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

[data-theme="dark"] .star-guide__action--secondary {
  background: color-mix(in oklch, var(--aisee-brand-surface-strong) 46%, var(--aisee-surface-card));
}

@media (max-width: 640px) {
  .star-guide {
    padding: 14px;
  }

  .star-guide__panel {
    padding: 22px 18px;
  }

  .star-guide__actions {
    grid-template-columns: 1fr;
  }
}
</style>
