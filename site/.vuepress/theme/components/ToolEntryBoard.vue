<script setup lang="ts">
const iconBase = 'https://unpkg.com/@lobehub/icons-static-svg@1.90.0/icons'

const entries = [
  {
    title: '编辑器补全',
    tools: [
      { name: 'GitHub Copilot', icon: `${iconBase}/githubcopilot.svg` },
    ],
    bestFor: '低打扰续写、小函数、小改动、测试补全。',
    watch: '更像“加速写代码”，不是完整 Agent 工作流。',
    tone: 'teal',
  },
  {
    title: 'AI-first IDE',
    tools: [
      { name: 'Cursor', icon: `${iconBase}/cursor.svg` },
      { name: 'Windsurf', icon: `${iconBase}/windsurf.svg` },
    ],
    bestFor: '页面开发、局部重构、边写边问、快速预览。',
    watch: '体验强依赖编辑器习惯和团队迁移成本。',
    tone: 'blue',
  },
  {
    title: 'Agent CLI / App',
    tools: [
      { name: 'Codex', icon: `${iconBase}/codex-color.svg` },
      { name: 'Claude Code', icon: `${iconBase}/claude-color.svg` },
      { name: 'Gemini CLI', icon: `${iconBase}/gemini-color.svg` },
    ],
    bestFor: '读仓库、改文件、跑命令、看 diff、做多步骤任务。',
    watch: '这是进入真实 AI Coding 的主线，权限边界和验证最关键。',
    tone: 'orange',
  },
      {
        title: 'Web Chat / 研究入口',
        tools: [
      { name: 'ChatGPT', icon: `${iconBase}/openai.svg` },
          { name: 'Claude', icon: `${iconBase}/claude-color.svg` },
          { name: 'Gemini', icon: `${iconBase}/gemini-color.svg` },
          { name: 'GLM', icon: `${iconBase}/zhipu-color.svg` },
        ],
    bestFor: '方案讨论、解释概念、文档阅读、先做思路整理。',
    watch: '适合前置思考，不等于已经具备项目执行能力。',
    tone: 'purple',
  },
]
</script>

<template>
  <section class="tool-entry-board">
    <header>
      <p>TOOL LAYER</p>
      <h2>工具入口回答的是“我在哪里工作”。</h2>
      <span>同一个模型，放进不同入口，协作体验会差很多。这里判断的是交互方式、执行能力和团队适配度。</span>
    </header>

    <div class="tool-entry-board__grid">
      <article v-for="entry in entries" :key="entry.title" class="entry-card" :class="`is-${entry.tone}`">
        <div class="entry-card__title">
          <strong>{{ entry.title }}</strong>
          <div class="entry-card__icons" aria-label="代表工具">
            <span v-for="tool in entry.tools" :key="tool.name" :title="tool.name">
              <img :src="tool.icon" :alt="`${tool.name} logo`" loading="lazy">
            </span>
          </div>
        </div>
        <p>{{ entry.bestFor }}</p>
        <em>{{ entry.watch }}</em>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tool-entry-board {
  display: grid;
  gap: 20px;
  margin: 28px 0;
  padding: 24px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 95%, oklch(96% 0.012 208));
}

.tool-entry-board header {
  display: grid;
  gap: 8px;
  max-width: 760px;
}

.tool-entry-board header p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.tool-entry-board header h2 {
  margin: 0;
  font-size: 26px;
  line-height: 1.3;
}

.tool-entry-board header span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.tool-entry-board__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.entry-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 96%, white);
}

.entry-card__title {
  display: grid;
  gap: 10px;
}

.entry-card__title strong {
  color: var(--vp-c-text-1);
  font-size: 18px;
}

.entry-card__icons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.entry-card__icons span {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 8px;
  background: color-mix(in oklch, var(--accent) 10%, transparent);
}

.entry-card__icons img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.entry-card p,
.entry-card em {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
  font-style: normal;
}

.entry-card em {
  padding-top: 10px;
  border-top: 1px solid color-mix(in oklch, var(--vp-c-divider) 72%, transparent);
}

.is-teal {
  --accent: #0f766e;
}

.is-blue {
  --accent: #2563eb;
}

.is-orange {
  --accent: #c2410c;
}

.is-purple {
  --accent: #7c3aed;
}

[data-theme="dark"] .tool-entry-board,
[data-theme="dark"] .entry-card {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .tool-entry-board__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .tool-entry-board {
    padding: 18px;
  }

  .tool-entry-board header h2 {
    font-size: 22px;
  }
}
</style>
