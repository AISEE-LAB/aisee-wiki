<script setup lang="ts">
const iconBase = 'https://unpkg.com/@lobehub/icons-static-svg@1.90.0/icons'

const modelCards = [
  {
    name: 'OpenAI GPT 系',
    icon: `${iconBase}/openai.svg`,
    focus: '真实仓库执行',
    bestFor: '多文件修改、命令执行、diff 审查、稳定推进工程任务。',
    watch: '模型层看的是能力上限；真正进入仓库执行时，还要再结合 Codex 这类工作入口。',
    tone: 'teal',
  },
  {
    name: 'Claude 模型系',
    icon: `${iconBase}/claude-color.svg`,
    focus: '长任务协作',
    bestFor: '长链路代码理解、重构、终端内连续迭代和团队规则执行。',
    watch: '强项在持续协作和长链路推理；是否好用，还要看你通过什么工具入口调用它。',
    tone: 'orange',
  },
  {
    name: 'Gemini 模型系',
    icon: `${iconBase}/gemini-color.svg`,
    focus: '长上下文 + 多模态',
    bestFor: '大仓库阅读、文档和截图输入、搜索结合、跨材料综合判断。',
    watch: '如果任务需要图片、文档或超长上下文，优先级会明显上升。',
    tone: 'blue',
  },
  {
    name: 'GLM 系',
    icon: `${iconBase}/zhipu-color.svg`,
    focus: '中文与成本补位',
    bestFor: '中文需求、本地化表达、预算敏感和兼容多种 coding 工具的场景。',
    watch: '更适合作为模型层补位，工具体验要结合具体入口再判断。',
    tone: 'purple',
  },
]

const dimensions = [
  ['代码修改能力', '看真实仓库修改、修 bug、跑命令后的回合稳定性。'],
  ['长上下文', '看能否稳定处理大仓库、长文档和多文件约束。'],
  ['多模态', '看截图、设计稿、文档、报错图片是否能直接参与任务。'],
  ['中文与本地化', '看中文需求表达、界面文案和本地场景兼容度。'],
]
</script>

<template>
  <section class="model-decision-board">
    <header>
      <p>MODEL LAYER</p>
      <h2>先判断模型能力，再决定把它放进什么入口。</h2>
      <span>模型决定上限，工具决定你能不能把这个上限稳定用出来。这一层先回答“谁更适合当前任务类型”。</span>
    </header>

    <div class="model-decision-board__cards">
      <article v-for="card in modelCards" :key="card.name" class="model-card" :class="`is-${card.tone}`">
        <div class="model-card__head">
          <div class="model-card__icon">
            <img :src="card.icon" :alt="`${card.name} logo`" loading="lazy">
          </div>
          <div>
            <strong>{{ card.name }}</strong>
            <small>{{ card.focus }}</small>
          </div>
        </div>
        <p>{{ card.bestFor }}</p>
        <em>{{ card.watch }}</em>
      </article>
    </div>

    <div class="model-decision-board__dimensions">
      <article v-for="[title, desc] in dimensions" :key="title">
        <strong>{{ title }}</strong>
        <p>{{ desc }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.model-decision-board {
  display: grid;
  gap: 20px;
  margin: 28px 0;
  padding: 26px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(58% 0.13 188) 11%, transparent), transparent 42%),
    color-mix(in oklch, var(--vp-c-bg) 94%, oklch(96% 0.012 210));
}

.model-decision-board header {
  display: grid;
  gap: 8px;
  max-width: 780px;
}

.model-decision-board header p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
}

.model-decision-board header h2 {
  margin: 0;
  font-size: 28px;
  line-height: 1.28;
}

.model-decision-board header span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.model-decision-board__cards,
.model-decision-board__dimensions {
  display: grid;
  gap: 12px;
}

.model-decision-board__cards {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.model-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 95%, white);
}

.model-card__head {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
}

.model-card__icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 8px;
  background: color-mix(in oklch, var(--accent) 10%, transparent);
}

.model-card__icon img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.model-card strong,
.model-card small,
.model-card p,
.model-card em {
  display: block;
}

.model-card strong {
  color: var(--vp-c-text-1);
  font-size: 17px;
}

.model-card small {
  margin-top: 4px;
  color: color-mix(in oklch, var(--accent) 76%, var(--vp-c-text-2));
  font-size: 13px;
  font-weight: 700;
}

.model-card p,
.model-card em {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.65;
  font-style: normal;
}

.model-card em {
  padding-top: 10px;
  border-top: 1px solid color-mix(in oklch, var(--vp-c-divider) 72%, transparent);
}

.model-decision-board__dimensions {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.model-decision-board__dimensions article {
  padding: 14px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 96%, white);
}

.model-decision-board__dimensions strong {
  color: var(--vp-c-text-1);
  font-size: 15px;
}

.model-decision-board__dimensions p {
  margin: 7px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.6;
}

.is-teal {
  --accent: #0f766e;
}

.is-orange {
  --accent: #c2410c;
}

.is-blue {
  --accent: #2563eb;
}

.is-purple {
  --accent: #7c3aed;
}

[data-theme="dark"] .model-decision-board,
[data-theme="dark"] .model-card,
[data-theme="dark"] .model-decision-board__dimensions article {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .model-decision-board__cards,
  .model-decision-board__dimensions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .model-decision-board {
    padding: 18px;
  }

  .model-decision-board header h2 {
    font-size: 22px;
  }
}
</style>
