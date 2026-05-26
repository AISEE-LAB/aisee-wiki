<script setup lang="ts">
const combos = [
  {
    title: '第一次在真实仓库里协作',
    tool: 'Codex 或 Claude Code',
    model: 'OpenAI / Claude 主线模型',
    reason: '重点是读项目、跑命令、看 diff 和做最小验证。',
    tone: 'teal',
  },
  {
    title: '页面开发与截图反馈',
    tool: 'AI-first IDE 或 Gemini CLI',
    model: '多模态 / 长上下文模型权重上升',
    reason: '如果任务高度依赖截图、文档或超长上下文，Gemini 这类模型的优势会更明显。',
    tone: 'blue',
  },
  {
    title: '中文需求、本地化与预算控制',
    tool: '支持自定义模型的 coding 工具',
    model: 'GLM 系作为补位',
    reason: '更适合中文表达、本地化界面和成本敏感场景。',
    tone: 'orange',
  },
  {
    title: '只想先讨论方案和拆任务',
    tool: 'Web Chat',
    model: '按资料类型选择',
    reason: '这时先要思路和结构，不一定需要进入项目执行。',
    tone: 'purple',
  },
]
</script>

<template>
  <section class="recommended-combos">
    <header>
      <p>PLAYBOOK</p>
      <h2>最后才是组合推荐。</h2>
      <span>选型不是“先挑品牌”，而是“先判断任务，再组合模型层和工具层”。</span>
    </header>

    <div class="recommended-combos__grid">
      <article v-for="combo in combos" :key="combo.title" class="combo-card" :class="`is-${combo.tone}`">
        <strong>{{ combo.title }}</strong>
        <dl>
          <div>
            <dt>工具入口</dt>
            <dd>{{ combo.tool }}</dd>
          </div>
          <div>
            <dt>模型层</dt>
            <dd>{{ combo.model }}</dd>
          </div>
        </dl>
        <p>{{ combo.reason }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.recommended-combos {
  display: grid;
  gap: 18px;
  margin: 28px 0;
  padding: 24px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(54% 0.11 32) 8%, transparent), transparent 42%),
    color-mix(in oklch, var(--vp-c-bg) 95%, oklch(96% 0.01 210));
}

.recommended-combos header {
  display: grid;
  gap: 8px;
  max-width: 760px;
}

.recommended-combos header p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.recommended-combos header h2 {
  margin: 0;
  font-size: 26px;
  line-height: 1.3;
}

.recommended-combos header span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.recommended-combos__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.combo-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.combo-card strong {
  color: var(--vp-c-text-1);
  font-size: 17px;
  line-height: 1.4;
}

.combo-card dl {
  display: grid;
  gap: 10px;
  margin: 0;
}

.combo-card dt {
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 800;
}

.combo-card dd {
  margin: 4px 0 0;
  color: color-mix(in oklch, var(--accent) 76%, var(--vp-c-text-2));
  font-size: 14px;
  font-weight: 700;
}

.combo-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
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

[data-theme="dark"] .recommended-combos,
[data-theme="dark"] .combo-card {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .recommended-combos__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .recommended-combos {
    padding: 18px;
  }

  .recommended-combos header h2 {
    font-size: 22px;
  }
}
</style>
