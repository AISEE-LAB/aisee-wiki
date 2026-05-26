<script setup lang="ts">
const steps = [
  {
    step: '01',
    title: '创建最小项目',
    action: '让 AI 先创建能启动的最小项目，不要一开始就生成完整页面。',
    check: '项目是否能启动，目录是否清楚，技术栈是否和你预期一致。',
  },
  {
    step: '02',
    title: '只做一块 Hero',
    action: '先委派首屏，不做整页。目标是尽快跑起预览并看到视觉反馈。',
    check: '标题层级、按钮位置、移动端首屏是否可读。',
  },
  {
    step: '03',
    title: '打开浏览器看结果',
    action: '不要只看代码，马上看页面、间距、字体、滚动和首屏观感。',
    check: '有没有溢出、错位、遮挡、过密、假大空文案。',
  },
  {
    step: '04',
    title: '逐块补全页面',
    action: '再做功能区、场景区、FAQ、CTA、Footer，每次只推进一块。',
    check: '每轮改动是否收敛，页面层级有没有被打乱。',
  },
  {
    step: '05',
    title: '验证与收尾',
    action: '最后再跑构建、看 diff、整理提交说明。',
    check: '本地能启动、构建通过、移动端不崩、改动范围可解释。',
  },
]
</script>

<template>
  <section class="project-loop-board">
    <header>
      <p>COLLABORATION LOOP</p>
      <h2>第一次项目最重要的不是“做完”，而是“一轮一轮做对”。</h2>
      <span>如果你让 AI 一次生成整站，学到的通常不是协作，而是如何在大面积返工中挣扎。第一轮项目要故意走慢一点，但每一步都可检查。</span>
    </header>

    <div class="project-loop-board__list">
      <article v-for="item in steps" :key="item.step" class="project-step">
        <span>{{ item.step }}</span>
        <div>
          <strong>{{ item.title }}</strong>
          <p>{{ item.action }}</p>
          <em>检查点：{{ item.check }}</em>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.project-loop-board {
  display: grid;
  gap: 18px;
  margin: 28px 0;
  padding: 24px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 95%, oklch(96% 0.012 208));
}

.project-loop-board header {
  display: grid;
  gap: 8px;
  max-width: 760px;
}

.project-loop-board header p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.project-loop-board header h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 26px;
  line-height: 1.3;
}

.project-loop-board header span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.project-loop-board__list {
  display: grid;
  gap: 10px;
}

.project-step {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 16px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.project-step span {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  color: #0f766e;
  background: color-mix(in oklch, oklch(57% 0.12 185) 12%, transparent);
  font-size: 14px;
  font-weight: 800;
}

.project-step strong {
  color: var(--vp-c-text-1);
  font-size: 17px;
}

.project-step p,
.project-step em {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.68;
  font-style: normal;
}

[data-theme="dark"] .project-loop-board,
[data-theme="dark"] .project-step {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 640px) {
  .project-loop-board {
    padding: 18px;
  }

  .project-loop-board header h2 {
    font-size: 22px;
  }

  .project-step {
    grid-template-columns: 1fr;
  }
}
</style>
