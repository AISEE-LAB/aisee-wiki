<script setup lang="ts">
const signals = [
  {
    title: '重复出现',
    text: '同一类任务不断出现，而且每次都要重新解释做法。',
    tone: 'teal',
  },
  {
    title: '流程稳定',
    text: '步骤、输入、输出和检查点已经比较固定，不是每次都换思路。',
    tone: 'blue',
  },
  {
    title: '代价较高',
    text: '做错会带来明显返工、误删文件、越权操作或质量回退。',
    tone: 'orange',
  },
  {
    title: '多人复用',
    text: '不仅你自己会反复用，团队里的其他人和其他任务也会用到。',
    tone: 'purple',
  },
]

const sections = [
  ['触发条件', '什么时候应该启用，什么任务不要启用。'],
  ['执行步骤', '先读什么、再做什么、做到哪里停止。'],
  ['脚本 / 模板 / 资料', '把可复用资产跟流程一起打包，而不是只留一句提示词。'],
  ['验证与退出条件', '怎么判断做完，失败时该如何回退或交还给人。'],
]

const antiPatterns = [
  '把一次性任务也做成 skill，结果只有自己看得懂，几天后就失效。',
  '把项目事实写进 skill，而不是写在 README、规则文件或源码里。',
  '把 skill 当成万能插件，什么都想让它包办。',
  'skill 已经沉淀了流程，却不补验证和退出条件。',
]
</script>

<template>
  <section class="skill-board">
    <div class="skill-board__hero">
      <p>SKILL SYSTEM</p>
      <h2>Skill 不是更长的 prompt，而是把一套稳定做法封装成可复用能力。</h2>
      <span>它最适合处理那些“反复出现、流程固定、做错代价高、团队还会继续复用”的任务。没有这几个前提，沉淀出来的通常不是 skill，而是一段很快过期的说明。</span>
    </div>

    <div class="skill-board__signals">
      <article v-for="item in signals" :key="item.title" class="skill-signal" :class="`is-${item.tone}`">
        <strong>{{ item.title }}</strong>
        <p>{{ item.text }}</p>
      </article>
    </div>

    <div class="skill-board__structure">
      <div>
        <p>SKILL SHAPE</p>
        <h3>一个能长期复用的 skill，至少要把这四块讲清楚。</h3>
      </div>
      <ul>
        <li v-for="[title, desc] in sections" :key="title">
          <strong>{{ title }}</strong>
          <span>{{ desc }}</span>
        </li>
      </ul>
    </div>

    <div class="skill-board__anti">
      <p>ANTI-PATTERNS</p>
      <ul>
        <li v-for="item in antiPatterns" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.skill-board {
  display: grid;
  gap: 20px;
  margin: 28px 0;
  padding: 24px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(57% 0.12 185) 10%, transparent), transparent 44%),
    color-mix(in oklch, var(--vp-c-bg) 95%, oklch(96% 0.012 208));
}

.skill-board__hero {
  display: grid;
  gap: 8px;
  max-width: 780px;
}

.skill-board__hero p,
.skill-board__structure p,
.skill-board__anti p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.skill-board__hero h2,
.skill-board__structure h3 {
  margin: 0;
  color: var(--vp-c-text-1);
}

.skill-board__hero h2 {
  font-size: 28px;
  line-height: 1.28;
}

.skill-board__hero span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.skill-board__signals {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.skill-signal {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.skill-signal strong {
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.skill-signal p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.66;
}

.skill-board__structure {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
  gap: 18px;
  padding: 20px;
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
}

.skill-board__structure h3 {
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.35;
}

.skill-board__structure ul,
.skill-board__anti ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-board__structure li {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 74%, transparent);
  background: color-mix(in oklch, var(--vp-c-bg) 98%, white);
}

.skill-board__structure li strong {
  color: var(--vp-c-text-1);
  font-size: 15px;
}

.skill-board__structure li span,
.skill-board__anti li {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.66;
}

.skill-board__anti {
  display: grid;
  gap: 12px;
}

.skill-board__anti li {
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 74%, transparent);
  background: color-mix(in oklch, var(--vp-c-bg) 98%, white);
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

[data-theme="dark"] .skill-board,
[data-theme="dark"] .skill-signal,
[data-theme="dark"] .skill-board__structure,
[data-theme="dark"] .skill-board__structure li,
[data-theme="dark"] .skill-board__anti li {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .skill-board__signals,
  .skill-board__structure {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .skill-board {
    padding: 18px;
  }

  .skill-board__hero h2,
  .skill-board__structure h3 {
    font-size: 22px;
  }
}
</style>
