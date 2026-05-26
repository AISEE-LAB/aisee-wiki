<script setup lang="ts">
const references = [
  {
    title: 'Artificial Analysis',
    tag: '模型总览',
    href: 'https://artificialanalysis.ai/models',
    summary: '适合先看模型层的综合判断：智能水平、价格、速度、延迟、上下文窗口，以及 Coding / Agentic 相关指标。',
    use: '回答“当前这一代模型大概谁更强、谁更快、谁更贵”。',
    watch: '它回答的是模型层，不回答你该用哪个 IDE、CLI 或 agent 产品。',
    tone: 'teal',
  },
  {
    title: 'SWE-rebench',
    tag: '工程任务',
    href: 'https://swe-rebench.com/',
    summary: '更接近真实仓库修复任务，适合补充看 agentic coding 在工程现场的完成度。',
    use: '回答“模型或 agent 配置在真实代码仓库任务里能不能做完”。',
    watch: '它更偏工程闭环表现，不等于日常聊天、文档分析或 UI 多模态体验。',
    tone: 'orange',
  },
]
</script>

<template>
  <section class="benchmark-snapshot">
    <div class="benchmark-snapshot__grid">
      <article v-for="item in references" :key="item.title" class="benchmark-card" :class="`is-${item.tone}`">
        <div class="benchmark-card__head">
          <strong>{{ item.title }}</strong>
          <span>{{ item.tag }}</span>
        </div>
        <p>{{ item.summary }}</p>
        <dl>
          <div>
            <dt>适合回答</dt>
            <dd>{{ item.use }}</dd>
          </div>
          <div>
            <dt>不要误读</dt>
            <dd>{{ item.watch }}</dd>
          </div>
        </dl>
        <a :href="item.href" target="_blank" rel="noreferrer">打开参考来源</a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.benchmark-snapshot {
  display: grid;
  margin: 28px 0;
}

.benchmark-snapshot__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.benchmark-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.benchmark-card__head {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.benchmark-card__head strong {
  color: var(--vp-c-text-1);
  font-size: 18px;
}

.benchmark-card__head span {
  padding: 4px 8px;
  border-radius: 999px;
  background: color-mix(in oklch, var(--accent) 10%, transparent);
  color: color-mix(in oklch, var(--accent) 78%, var(--vp-c-text-2));
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

.benchmark-card p,
.benchmark-card a {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.benchmark-card dl {
  display: grid;
  gap: 10px;
  margin: 0;
}

.benchmark-card dt {
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 800;
}

.benchmark-card dd {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.65;
}

.benchmark-card a {
  width: fit-content;
  color: color-mix(in oklch, var(--accent) 82%, var(--vp-c-text-2));
  text-decoration: none;
}

.benchmark-card a:hover {
  text-decoration: underline;
}

.is-teal {
  --accent: #0f766e;
}

.is-orange {
  --accent: #c2410c;
}

[data-theme="dark"] .benchmark-card {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .benchmark-snapshot__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .benchmark-card__head {
    display: grid;
    justify-content: start;
  }
}
</style>
