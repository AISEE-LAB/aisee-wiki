<script setup lang="ts">
const capabilities = [
  {
    title: '读仓库',
    stack: 'Git + 终端',
    detail: '让 Agent 能进入项目目录、看工作区状态、读取 README 和配置文件。',
    note: '没有这一层，它只能给建议，不能理解真实项目。',
    tone: 'teal',
  },
  {
    title: '跑项目',
    stack: 'Node.js / Python',
    detail: '让 Agent 能安装项目依赖、启动前端或脚本、读取报错输出。',
    note: '第一次只要能跑最小命令，不要追求把所有生态都装齐。',
    tone: 'blue',
  },
  {
    title: '看结果',
    stack: '编辑器 + 浏览器',
    detail: '让人能审查代码、让 Agent 能基于页面效果、日志和 diff 继续修正。',
    note: '能看到结果，才有真正的反馈闭环。',
    tone: 'orange',
  },
]

const checks = [
  ['Git', '`git --version`', '能显示版本号，并且在项目目录里执行 `git status`。'],
  ['Node.js', '`node -v` / `npm -v`', '能确认 Node 和 npm 已可用，足够支撑前端项目和 CLI。'],
  ['Python', '`python --version`', '能确认本地 Python 可运行，先不要急着装一堆包。'],
  ['终端', '进入项目目录', '能 `cd` 到项目目录，并执行最小命令。'],
  ['浏览器', '打开本地地址', '能访问 `localhost` 预览地址并观察页面变化。'],
]
</script>

<template>
  <section class="runtime-setup-board">
    <div class="runtime-setup-board__hero">
      <p>RUNTIME SETUP</p>
      <h2>环境不是附属品，而是 AI Coding 能不能闭环的前提。</h2>
      <span>对 Agent 来说，本地环境至少要满足三件事：能读仓库、能跑命令、能看结果。缺一项，协作都会断在中间。</span>
    </div>

    <div class="runtime-setup-board__caps">
      <article v-for="item in capabilities" :key="item.title" class="runtime-cap" :class="`is-${item.tone}`">
        <strong>{{ item.title }}</strong>
        <small>{{ item.stack }}</small>
        <p>{{ item.detail }}</p>
        <em>{{ item.note }}</em>
      </article>
    </div>

    <div class="runtime-setup-board__check">
      <div>
        <p>FIRST CHECK</p>
        <h3>第一次只验证“能不能工作”，不要先追求装得很全。</h3>
      </div>
      <ul>
        <li v-for="[name, cmd, desc] in checks" :key="name">
          <span>{{ name }}</span>
          <strong>{{ cmd }}</strong>
          <em>{{ desc }}</em>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.runtime-setup-board {
  display: grid;
  gap: 20px;
  margin: 28px 0;
  padding: 24px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(58% 0.13 188) 12%, transparent), transparent 44%),
    color-mix(in oklch, var(--vp-c-bg) 95%, oklch(96% 0.012 210));
}

.runtime-setup-board__hero {
  display: grid;
  gap: 8px;
  max-width: 780px;
}

.runtime-setup-board__hero p,
.runtime-setup-board__check p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.runtime-setup-board__hero h2,
.runtime-setup-board__check h3 {
  margin: 0;
  color: var(--vp-c-text-1);
}

.runtime-setup-board__hero h2 {
  font-size: 28px;
  line-height: 1.28;
}

.runtime-setup-board__hero span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.runtime-setup-board__caps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.runtime-cap {
  display: grid;
  gap: 8px;
  padding: 18px;
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.runtime-cap strong,
.runtime-cap small,
.runtime-cap p,
.runtime-cap em {
  display: block;
}

.runtime-cap strong {
  color: var(--vp-c-text-1);
  font-size: 18px;
}

.runtime-cap small {
  color: color-mix(in oklch, var(--accent) 78%, var(--vp-c-text-2));
  font-size: 13px;
  font-weight: 700;
}

.runtime-cap p,
.runtime-cap em {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.68;
  font-style: normal;
}

.runtime-cap em {
  padding-top: 10px;
  border-top: 1px solid color-mix(in oklch, var(--vp-c-divider) 72%, transparent);
}

.runtime-setup-board__check {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
  gap: 18px;
  padding: 20px;
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 78%, transparent);
}

.runtime-setup-board__check h3 {
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.35;
}

.runtime-setup-board__check ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.runtime-setup-board__check li {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 74%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 98%, white);
}

.runtime-setup-board__check span {
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 800;
}

.runtime-setup-board__check strong {
  color: var(--vp-c-text-1);
  font-size: 15px;
}

.runtime-setup-board__check em {
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.6;
  font-style: normal;
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

[data-theme="dark"] .runtime-setup-board,
[data-theme="dark"] .runtime-cap,
[data-theme="dark"] .runtime-setup-board__check,
[data-theme="dark"] .runtime-setup-board__check li {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .runtime-setup-board__caps,
  .runtime-setup-board__check {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .runtime-setup-board {
    padding: 18px;
  }

  .runtime-setup-board__hero h2,
  .runtime-setup-board__check h3 {
    font-size: 22px;
  }
}
</style>
