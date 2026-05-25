<script setup lang="ts">
const iconBase = 'https://unpkg.com/@lobehub/icons-static-svg@1.90.0/icons'

const primaryTools = [
  {
    name: 'Codex',
    icon: `${iconBase}/codex-color.svg`,
    vendor: 'OpenAI',
    focus: '本站主线',
    description: '适合真实仓库里的读项目、改文件、跑命令、看 diff 和多线程任务。',
  },
  {
    name: 'Claude Code',
    icon: `${iconBase}/claude-color.svg`,
    vendor: 'Anthropic',
    focus: '强工程协作',
    description: '终端原生，适合长任务、代码库理解、重构和团队上下文流程。',
  },
  {
    name: 'Gemini',
    icon: `${iconBase}/gemini-color.svg`,
    vendor: 'Google',
    focus: '长上下文与多模态',
    description: '适合大上下文阅读、搜索结合、图片或文档参与的代码任务。',
  },
  {
    name: 'GLM',
    icon: `${iconBase}/zhipu-color.svg`,
    vendor: 'Z.AI / 智谱',
    focus: '中文与成本友好',
    description: '适合中文本地化、预算敏感和兼容多种编码工具的场景。',
  },
]

const extendedTools = [
  { name: 'Cursor', icon: `${iconBase}/cursor.svg`, description: 'AI-first 编辑器，适合喜欢编辑器内协作的人。' },
  { name: 'Windsurf', icon: `${iconBase}/windsurf.svg`, description: 'AI-first IDE，适合连续上下文与页面开发。' },
  { name: 'GitHub Copilot', icon: `${iconBase}/githubcopilot.svg`, description: '编辑器补全与轻量代码协作入口。' },
  { name: 'Qwen', icon: `${iconBase}/qwen-color.svg`, description: '国产模型生态，可作为中文和开源生态补充。' },
  { name: 'DeepSeek', icon: `${iconBase}/deepseek-color.svg`, description: '适合纳入模型对比和成本敏感任务评估。' },
]
</script>

<template>
  <section class="tool-logo-grid">
    <header>
      <p>Recommended stack</p>
      <h2>本站重点推荐的四类工具/模型</h2>
      <span>Logo 使用 LobeHub Icons 静态 SVG。这里不是排行榜，而是按任务形态给读者建立选择坐标。</span>
    </header>

    <div class="tool-logo-grid__primary">
      <article v-for="tool in primaryTools" :key="tool.name" class="tool-card tool-card--primary">
        <div class="tool-card__icon">
          <img :src="tool.icon" :alt="`${tool.name} logo`" loading="lazy">
        </div>
        <div>
          <strong>{{ tool.name }}</strong>
          <small>{{ tool.vendor }} · {{ tool.focus }}</small>
          <p>{{ tool.description }}</p>
        </div>
      </article>
    </div>

    <div class="tool-logo-grid__extended" aria-label="扩展视野">
      <article v-for="tool in extendedTools" :key="tool.name" class="tool-card">
        <div class="tool-card__icon">
          <img :src="tool.icon" :alt="`${tool.name} logo`" loading="lazy">
        </div>
        <div>
          <strong>{{ tool.name }}</strong>
          <p>{{ tool.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tool-logo-grid {
  margin: 30px 0;
  padding: 28px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(58% 0.13 188) 12%, transparent), transparent 42%),
    color-mix(in oklch, var(--vp-c-bg) 92%, oklch(96% 0.012 205));
}

header p {
  margin: 0 0 8px;
  color: oklch(50% 0.12 188);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

header h2 {
  margin: 0;
  font-size: 28px;
  line-height: 1.25;
}

header span {
  display: block;
  margin-top: 8px;
  max-width: 820px;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.7;
}

.tool-logo-grid__primary,
.tool-logo-grid__extended {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.tool-logo-grid__primary {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.tool-logo-grid__extended {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.tool-card {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  min-width: 0;
  gap: 14px;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 78%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 94%, white);
}

.tool-card--primary {
  min-height: 150px;
  padding: 20px;
  grid-template-columns: 58px minmax(0, 1fr);
}

.tool-card__icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 8px;
  background:
    linear-gradient(145deg, color-mix(in oklch, var(--vp-c-bg) 80%, white), color-mix(in oklch, var(--vp-c-bg-soft) 90%, transparent));
  box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--vp-c-divider) 52%, transparent);
}

.tool-card--primary .tool-card__icon {
  width: 58px;
  height: 58px;
}

.tool-card img {
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  object-fit: contain;
}

.tool-card--primary img {
  width: 40px;
  height: 40px;
}

.tool-card strong,
.tool-card small,
.tool-card p {
  display: block;
  min-width: 0;
}

.tool-card strong {
  color: var(--vp-c-text-1);
  font-size: 17px;
  line-height: 1.25;
}

.tool-card small {
  margin-top: 5px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.45;
}

.tool-card p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.65;
}

.tool-logo-grid__extended .tool-card {
  align-items: center;
  padding: 14px;
}

.tool-logo-grid__extended .tool-card strong {
  font-size: 16px;
}

.tool-logo-grid__extended .tool-card p {
  margin-top: 5px;
  font-size: 13px;
  line-height: 1.5;
}

[data-theme="dark"] .tool-logo-grid {
  background: color-mix(in oklch, var(--vp-c-bg) 86%, oklch(25% 0.018 240));
}

[data-theme="dark"] .tool-card {
  background: color-mix(in oklch, var(--vp-c-bg) 84%, oklch(24% 0.02 240));
}

[data-theme="dark"] .tool-card__icon {
  background: color-mix(in oklch, var(--vp-c-bg) 78%, oklch(28% 0.02 240));
}

@media (max-width: 960px) {
  .tool-logo-grid__primary,
  .tool-logo-grid__extended {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .tool-logo-grid {
    padding: 18px;
  }

  header h2 {
    font-size: 22px;
  }

  .tool-logo-grid__primary,
  .tool-logo-grid__extended {
    grid-template-columns: 1fr;
  }

  .tool-card,
  .tool-card--primary {
    grid-template-columns: 44px minmax(0, 1fr);
    min-height: 0;
    padding: 14px;
  }

  .tool-card__icon,
  .tool-card--primary .tool-card__icon {
    width: 44px;
    height: 44px;
  }

  .tool-card img,
  .tool-card--primary img {
    width: 30px;
    height: 30px;
  }
}
</style>
