<script setup lang="ts">
const stages = [
  {
    label: '01',
    title: '补全增强',
    shape: 'IDE 内联补全',
    ai: '根据当前文件续写函数、变量名和局部逻辑。',
    human: '负责设计函数边界、类型、命名和上下文。',
    risk: '看起来很快，但只理解局部。',
    tone: 'teal',
  },
  {
    label: '02',
    title: 'Chat 生成',
    shape: '聊天窗口生成片段',
    ai: '根据描述生成代码块、解释报错、给出方案草稿。',
    human: '负责补充背景、粘贴错误、筛选方案并搬回项目。',
    risk: '回答可能正确，但不一定适配当前仓库。',
    tone: 'blue',
  },
  {
    label: '03',
    title: 'Agentic Coding',
    shape: 'Agent 进入项目执行',
    ai: '读取项目、修改文件、运行命令、观察错误并继续修复。',
    human: '负责定义目标、控制权限、审查 diff 和验收结果。',
    risk: '速度更快，错误扩散也更快。',
    tone: 'orange',
  },
]

const roleChanges = [
  ['拆任务', '把目标、约束、验收标准讲清楚'],
  ['写代码', '监督 Agent 分步修改并控制范围'],
  ['调试错误', '让错误输出回到下一轮上下文'],
  ['自己判断完成', '用构建、预览、测试和 diff 验收'],
]
</script>

<template>
  <section class="ai-intro-panel" aria-label="AI Coding 变化速览">
    <div class="ai-intro-panel__header">
      <p>SHIFT MAP</p>
      <h2>变化不在“生成更多代码”，而在“行动范围变大”。</h2>
      <span>AI 从局部补全走向项目级执行后，工程师的主要工作从亲自敲代码，转向定义目标、提供上下文和审查结果。</span>
    </div>

    <div class="ai-intro-panel__stages">
      <article v-for="stage in stages" :key="stage.title" class="ai-stage" :class="`is-${stage.tone}`">
        <div class="ai-stage__top">
          <span>{{ stage.label }}</span>
          <strong>{{ stage.title }}</strong>
        </div>
        <p class="ai-stage__shape">{{ stage.shape }}</p>
        <dl>
          <div>
            <dt>AI 做什么</dt>
            <dd>{{ stage.ai }}</dd>
          </div>
          <div>
            <dt>人负责什么</dt>
            <dd>{{ stage.human }}</dd>
          </div>
        </dl>
        <p class="ai-stage__risk">{{ stage.risk }}</p>
      </article>
    </div>

    <div class="ai-intro-panel__roles">
      <div>
        <p>ROLE CHANGE</p>
        <h3>工程师不是退出执行，而是上移到控制层。</h3>
      </div>
      <ul>
        <li v-for="[before, after] in roleChanges" :key="before">
          <span>{{ before }}</span>
          <strong>{{ after }}</strong>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ai-intro-panel {
  display: grid;
  gap: 22px;
  margin: 30px 0;
  padding: 26px;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(58% 0.12 185) 13%, transparent), transparent 42%),
    color-mix(in oklch, var(--vp-c-bg) 94%, oklch(97% 0.012 220));
  box-shadow: 0 18px 44px color-mix(in oklch, var(--vp-c-text-1) 7%, transparent);
}

.ai-intro-panel__header {
  display: grid;
  gap: 10px;
  max-width: 760px;
}

.ai-intro-panel__header p,
.ai-intro-panel__roles p {
  margin: 0;
  color: #0f766e;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
}

.ai-intro-panel__header h2,
.ai-intro-panel__roles h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  letter-spacing: 0;
}

.ai-intro-panel__header h2 {
  font-size: 27px;
  line-height: 1.3;
}

.ai-intro-panel__header span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.8;
}

.ai-intro-panel__stages {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.ai-stage {
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid color-mix(in oklch, var(--accent) 38%, var(--vp-c-divider));
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 92%, white);
}

.ai-stage__top {
  display: flex;
  gap: 10px;
  align-items: center;
}

.ai-stage__top span {
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  color: var(--accent);
  background: color-mix(in oklch, var(--accent) 10%, transparent);
  font-weight: 800;
}

.ai-stage__top strong {
  color: var(--vp-c-text-1);
  font-size: 18px;
}

.ai-stage__shape,
.ai-stage__risk {
  margin: 0;
  color: color-mix(in oklch, var(--accent) 78%, var(--vp-c-text-2));
  font-size: 14px;
  font-weight: 700;
}

.ai-stage dl {
  display: grid;
  gap: 10px;
  margin: 0;
}

.ai-stage dt {
  margin-bottom: 3px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 800;
}

.ai-stage dd {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.ai-stage__risk {
  padding-top: 10px;
  border-top: 1px solid color-mix(in oklch, var(--vp-c-divider) 70%, transparent);
  font-weight: 600;
}

.ai-intro-panel__roles {
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
  gap: 18px;
  align-items: start;
  padding: 20px;
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 88%, oklch(96% 0.012 205));
}

.ai-intro-panel__roles h3 {
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.35;
}

.ai-intro-panel__roles ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ai-intro-panel__roles li {
  display: grid;
  grid-template-columns: 98px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 11px 12px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 78%, transparent);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.ai-intro-panel__roles li span {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.ai-intro-panel__roles li strong {
  color: var(--vp-c-text-1);
  font-size: 15px;
  line-height: 1.55;
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

[data-theme="dark"] .ai-intro-panel,
[data-theme="dark"] .ai-stage,
[data-theme="dark"] .ai-intro-panel__roles,
[data-theme="dark"] .ai-intro-panel__roles li {
  background: color-mix(in oklch, var(--vp-c-bg) 88%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .ai-intro-panel__stages,
  .ai-intro-panel__roles {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .ai-intro-panel {
    padding: 18px;
  }

  .ai-intro-panel__header h2 {
    font-size: 23px;
  }

  .ai-intro-panel__roles li {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
