<script setup lang="ts">
const chatFlow = [
  ['用户目标', '描述问题、贴代码、请求解释'],
  ['模型回答', '生成片段、解释报错、给方案'],
  ['输出结束', '这一轮通常停在“答案已经给出”'],
]

const agentFlow = [
  ['用户目标', '任务、约束、验收标准'],
  ['装载上下文', '项目文件、规则、历史结果'],
  ['模型计划', '决定下一步动作'],
  ['执行 Tool', '读文件、跑命令、改代码'],
  ['观察结果', 'stdout、diff、截图、报错'],
  ['验证 / 输出', '继续迭代或提交结果'],
]

const failures = [
  '目标太大，一轮里混了创建项目、做整页、适配移动端和构建检查。',
  '上下文不全，没有告诉 Agent 技术栈、目录结构和禁止操作。',
  '工具权限给得太快，没看命令、没看 diff，就让它继续写。',
  '看到了输出，但没跑验证，所以“看起来做完”其实没有闭环。',
]
</script>

<template>
  <section class="agent-basics-board">
    <div class="agent-basics-board__hero">
      <p>AGENT LOOP</p>
      <h2>Chat 在回答你，Agent 在替你推进任务。</h2>
      <span>真正的变化不是模型更能说，而是它开始读上下文、执行动作、观察结果，再决定下一步。执行闭环一旦出现，风险和收益都会一起放大。</span>
    </div>

    <div class="agent-basics-board__compare">
      <article class="agent-lane agent-lane--chat">
        <header>
          <strong>Chat 路径</strong>
          <span>回答通常停在这一轮</span>
        </header>
        <ol>
          <li v-for="[title, desc] in chatFlow" :key="title">
            <strong>{{ title }}</strong>
            <p>{{ desc }}</p>
          </li>
        </ol>
      </article>

      <article class="agent-lane agent-lane--agent">
        <header>
          <strong>Agent 路径</strong>
          <span>结果回写后继续下一轮</span>
        </header>
        <ol>
          <li v-for="[title, desc] in agentFlow" :key="title">
            <strong>{{ title }}</strong>
            <p>{{ desc }}</p>
          </li>
        </ol>
      </article>
    </div>

    <div class="agent-basics-board__failures">
      <div>
        <p>FAILURE POINTS</p>
        <h3>第一次接触 Agent，最容易在闭环里失控。</h3>
      </div>
      <ul>
        <li v-for="item in failures" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.agent-basics-board {
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

.agent-basics-board__hero {
  display: grid;
  gap: 8px;
  max-width: 780px;
}

.agent-basics-board__hero p,
.agent-basics-board__failures p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.agent-basics-board__hero h2,
.agent-basics-board__failures h3 {
  margin: 0;
  color: var(--vp-c-text-1);
}

.agent-basics-board__hero h2 {
  font-size: 28px;
  line-height: 1.28;
}

.agent-basics-board__hero span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.agent-basics-board__compare {
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
  gap: 14px;
}

.agent-lane {
  display: grid;
  gap: 14px;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.agent-lane header {
  display: grid;
  gap: 4px;
}

.agent-lane header strong {
  color: var(--vp-c-text-1);
  font-size: 18px;
}

.agent-lane header span {
  color: color-mix(in oklch, var(--accent) 76%, var(--vp-c-text-2));
  font-size: 13px;
  font-weight: 700;
}

.agent-lane ol {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.agent-lane li {
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
  background: color-mix(in oklch, var(--vp-c-bg) 98%, white);
}

.agent-lane li strong {
  color: var(--vp-c-text-1);
  font-size: 15px;
}

.agent-lane li p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.62;
}

.agent-basics-board__failures {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
  gap: 18px;
  padding: 20px;
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 78%, transparent);
}

.agent-basics-board__failures h3 {
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.35;
}

.agent-basics-board__failures ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.agent-basics-board__failures li {
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 74%, transparent);
  background: color-mix(in oklch, var(--vp-c-bg) 98%, white);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.68;
}

.agent-lane--chat {
  --accent: #2563eb;
}

.agent-lane--agent {
  --accent: #c2410c;
}

[data-theme="dark"] .agent-basics-board,
[data-theme="dark"] .agent-lane,
[data-theme="dark"] .agent-lane li,
[data-theme="dark"] .agent-basics-board__failures,
[data-theme="dark"] .agent-basics-board__failures li {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .agent-basics-board__compare,
  .agent-basics-board__failures {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .agent-basics-board {
    padding: 18px;
  }

  .agent-basics-board__hero h2,
  .agent-basics-board__failures h3 {
    font-size: 22px;
  }
}
</style>
