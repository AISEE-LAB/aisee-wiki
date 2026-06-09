<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const repoUrl = 'https://github.com/AISEE-LAB/aisee-plugin'
const storageKey = 'aisee-plugin-star-guide:v1'

const isVisible = ref(false)
const hasClickedStarCta = ref(false)
const locale = ref<'zh' | 'en'>('zh')

const content = computed(() => {
  if (locale.value === 'en') {
    return {
      eyebrow: 'Support AISEE Plugin',
      title: 'Before you continue, please support the core open-source repo.',
      description: 'AISEE Plugin is one of the core public repos behind the workflows documented on this site.',
      note: 'This site cannot truly verify your GitHub Star status. You need to open GitHub and complete the Star manually.',
      cta: 'Open GitHub to Star',
      close: 'I have done it, continue browsing',
      waiting: 'Click the GitHub button first to unlock close.',
    }
  }

  return {
    eyebrow: '支持核心开源项目',
    title: '继续浏览前，请先关注 AISEE Plugin。',
    description: 'AISEE Plugin 是本站工作流内容背后的核心公开仓库之一。',
    note: '站点无法真实校验你的 GitHub Star 状态。你需要打开 GitHub 页面后手动完成 Star。',
    cta: '前往 GitHub Star',
    close: '我已完成，继续浏览',
    waiting: '请先点击 GitHub 按钮，再解锁关闭。',
  }
})

function isLocalDevelopmentHost(hostname: string): boolean {
  return hostname === 'localhost'
    || hostname === '127.0.0.1'
    || hostname === '0.0.0.0'
    || hostname.endsWith('.local')
}

function openGitHubStar(): void {
  hasClickedStarCta.value = true
}

function closeGuide(): void {
  if (!hasClickedStarCta.value)
    return

  localStorage.setItem(storageKey, 'acknowledged')
  isVisible.value = false
}

onMounted(() => {
  const { hostname, pathname } = window.location

  if (isLocalDevelopmentHost(hostname))
    return

  if (document.documentElement.lang.startsWith('en') || pathname.startsWith('/en/'))
    locale.value = 'en'

  if (localStorage.getItem(storageKey) === 'acknowledged')
    return

  isVisible.value = true
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="star-guide" role="dialog" aria-modal="true" aria-labelledby="star-guide-title">
      <div class="star-guide__backdrop" />
      <section class="star-guide__panel">
        <p class="star-guide__eyebrow">{{ content.eyebrow }}</p>
        <h2 id="star-guide-title">{{ content.title }}</h2>
        <p class="star-guide__description">{{ content.description }}</p>
        <p class="star-guide__note">{{ content.note }}</p>

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

.star-guide__note {
  margin: 16px 0 0;
  padding: 12px 14px;
  border-left: 3px solid var(--aisee-warning-border);
  border-radius: 10px;
  color: var(--aisee-warning-text);
  font-size: 0.92rem;
  line-height: 1.65;
  background: var(--aisee-warning-surface);
}

.star-guide__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.star-guide__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 0.96rem;
  font-weight: 760;
  line-height: 1.2;
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease, opacity 0.18s ease;
}

.star-guide__action:hover {
  transform: translateY(-1px);
}

.star-guide__action--primary {
  color: #fff;
  background: var(--aisee-brand-gradient);
  box-shadow: 0 18px 34px color-mix(in srgb, var(--aisee-brand-primary) 24%, transparent);
}

.star-guide__action--secondary {
  color: var(--aisee-brand-text-strong);
  background: color-mix(in oklch, var(--aisee-brand-surface) 38%, var(--aisee-surface-card));
  border-color: var(--aisee-brand-border);
  cursor: pointer;
}

.star-guide__action--secondary:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  transform: none;
}

.star-guide__hint {
  margin: 12px 0 0;
  color: var(--vp-c-text-3);
  font-size: 0.88rem;
  line-height: 1.55;
}

[data-theme="dark"] .star-guide__panel {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--aisee-brand-secondary) 16%, transparent), transparent),
    var(--aisee-surface-card);
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

@media (max-width: 640px) {
  .star-guide {
    padding: 14px;
  }

  .star-guide__panel {
    padding: 22px 18px;
  }

  .star-guide__actions {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
