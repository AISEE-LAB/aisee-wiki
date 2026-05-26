<script setup lang="ts">
const modules = [
  {
    title: 'Hero',
    goal: '第一屏先把“这是什么、给谁用、下一步做什么”讲清楚。',
    ai: '做首屏结构、标题、副标题、CTA、基础视觉层级。',
    human: '检查首屏信息是否一眼能懂，移动端是否遮挡。',
    tone: 'teal',
  },
  {
    title: '功能介绍',
    goal: '用 3 到 6 个功能卡片解释产品价值。',
    ai: '搭卡片结构、图标位、标题和一句话说明。',
    human: '检查文案是否空泛，卡片是否过密，层级是否重复。',
    tone: 'blue',
  },
  {
    title: '场景 / 案例',
    goal: '让页面从“会做什么”走向“在哪些场景有用”。',
    ai: '组织场景块、案例卡、数据位或小对比区。',
    human: '检查示例是否合理，不要冒充真实客户或品牌。',
    tone: 'orange',
  },
  {
    title: 'CTA / FAQ / Footer',
    goal: '把收束动作、疑问处理和页面收尾补完整。',
    ai: '做 CTA、FAQ、页脚导航和联系位。',
    human: '检查按钮文案、答复具体性，以及页脚信息是否虚构过度。',
    tone: 'purple',
  },
]
</script>

<template>
  <section class="project-module-board">
    <header>
      <p>PAGE MODULES</p>
      <h2>第一次项目不要做整站，先把首页拆成几个可控模块。</h2>
      <span>这样做的目的不是降低审美要求，而是降低协作复杂度。你要练的是“按模块推进”，不是“一次生成整页”。</span>
    </header>

    <div class="project-module-board__grid">
      <article v-for="item in modules" :key="item.title" class="project-module" :class="`is-${item.tone}`">
        <strong>{{ item.title }}</strong>
        <p>{{ item.goal }}</p>
        <dl>
          <div>
            <dt>AI 可以先做</dt>
            <dd>{{ item.ai }}</dd>
          </div>
          <div>
            <dt>你要重点检查</dt>
            <dd>{{ item.human }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>

<style scoped>
.project-module-board {
  display: grid;
  gap: 18px;
  margin: 28px 0;
  padding: 24px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(57% 0.12 185) 10%, transparent), transparent 44%),
    color-mix(in oklch, var(--vp-c-bg) 95%, oklch(96% 0.012 208));
}

.project-module-board header {
  display: grid;
  gap: 8px;
  max-width: 760px;
}

.project-module-board header p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.project-module-board header h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 26px;
  line-height: 1.3;
}

.project-module-board header span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.project-module-board__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.project-module {
  display: grid;
  gap: 10px;
  padding: 18px;
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.project-module strong {
  color: var(--vp-c-text-1);
  font-size: 18px;
}

.project-module p,
.project-module dd {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.68;
}

.project-module dl {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-top: 10px;
  border-top: 1px solid color-mix(in oklch, var(--vp-c-divider) 72%, transparent);
}

.project-module dt {
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 800;
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

[data-theme="dark"] .project-module-board,
[data-theme="dark"] .project-module {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .project-module-board__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .project-module-board {
    padding: 18px;
  }

  .project-module-board header h2 {
    font-size: 22px;
  }
}
</style>
