<script setup lang="ts">
const layers = [
  {
    title: '当前会话',
    source: '当前线程 / 最新消息',
    use: '保存本轮目标、最近命令、刚发生的判断和待确认事项。',
    boundary: '最新消息优先，旧对话很快会过期，不能把一次性状态沉淀成长期事实。',
    tone: 'teal',
  },
  {
    title: '项目规则',
    source: 'AGENTS.md / 项目规则',
    use: '约束 Agent 在这个仓库里怎么读、怎么写、哪些操作要谨慎。',
    boundary: '规则负责约束行为，不负责替代代码事实和官方文档。',
    tone: 'blue',
  },
  {
    title: '项目记忆',
    source: '.memory/index.md / .memory/rules.md',
    use: '沉淀长期有效的仓库约定、内容口径、工作流修复和重复出现的偏好。',
    boundary: '必须可索引、可审查、可更新，不能无限堆历史碎片。',
    tone: 'orange',
  },
  {
    title: '全局记忆',
    source: '跨项目长期偏好',
    use: '减少重复沟通，例如回复语言、写作风格和长期工作习惯。',
    boundary: '不能覆盖项目规则，也不能压过当前任务和项目事实。',
    tone: 'purple',
  },
]

const shouldStore = [
  '反复出现的目录约定、组件命名口径和写作规则',
  '未来任务仍必须遵守的安全边界和协作习惯',
  '长期有效的架构决策、工作流修复和内容偏好',
  '需要通过 `.memory/index.md` 稳定索引的项目级事实',
]

const shouldNotStore = [
  '会频繁变化的版本号、价格、安装方式和额度信息',
  '只对当前一次任务有效的临时状态',
  '可以直接从源码、README 或官方文档读到的事实',
  '未经验证的猜测、印象和一次性试错结论',
]
</script>

<template>
  <section class="memory-layer-board">
    <div class="memory-layer-board__hero">
      <p>MEMORY LAYERS</p>
      <h2>Memory 不是长期大脑，而是 Agent 进入任务时读取的一组分层上下文。</h2>
      <span>优先级永远是：当前任务和项目事实先决定方向，规则约束行为，项目记忆和全局记忆只负责帮助 Agent 更快进入状态。</span>
    </div>

    <div class="memory-layer-board__stack">
      <article v-for="item in layers" :key="item.title" class="memory-layer" :class="`is-${item.tone}`">
        <strong>{{ item.title }}</strong>
        <small>{{ item.source }}</small>
        <p>{{ item.use }}</p>
        <em>{{ item.boundary }}</em>
      </article>
    </div>

    <div class="memory-layer-board__compare">
      <article>
        <p>SHOULD STORE</p>
        <h3>适合写进项目记忆</h3>
        <ul>
          <li v-for="item in shouldStore" :key="item">{{ item }}</li>
        </ul>
      </article>
      <article>
        <p>DO NOT STORE</p>
        <h3>不适合写进项目记忆</h3>
        <ul>
          <li v-for="item in shouldNotStore" :key="item">{{ item }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.memory-layer-board {
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

.memory-layer-board__hero {
  display: grid;
  gap: 8px;
  max-width: 780px;
}

.memory-layer-board__hero p,
.memory-layer-board__compare p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.memory-layer-board__hero h2,
.memory-layer-board__compare h3 {
  margin: 0;
  color: var(--vp-c-text-1);
}

.memory-layer-board__hero h2 {
  font-size: 28px;
  line-height: 1.28;
}

.memory-layer-board__hero span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.memory-layer-board__stack {
  display: grid;
  gap: 10px;
}

.memory-layer {
  display: grid;
  gap: 8px;
  padding: 16px 18px;
  border-radius: 8px;
  border-left: 4px solid var(--accent);
  border: 1px solid color-mix(in oklch, var(--accent) 34%, var(--vp-c-divider));
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.memory-layer strong,
.memory-layer small,
.memory-layer p,
.memory-layer em {
  display: block;
}

.memory-layer strong {
  color: var(--vp-c-text-1);
  font-size: 17px;
}

.memory-layer small {
  color: color-mix(in oklch, var(--accent) 76%, var(--vp-c-text-2));
  font-size: 13px;
  font-weight: 700;
}

.memory-layer p,
.memory-layer em {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.66;
  font-style: normal;
}

.memory-layer em {
  padding-top: 8px;
  border-top: 1px solid color-mix(in oklch, var(--vp-c-divider) 72%, transparent);
}

.memory-layer-board__compare {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.memory-layer-board__compare article {
  padding: 18px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.memory-layer-board__compare h3 {
  margin-top: 6px;
  font-size: 21px;
  line-height: 1.35;
}

.memory-layer-board__compare ul {
  display: grid;
  gap: 10px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.memory-layer-board__compare li {
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 74%, transparent);
  background: color-mix(in oklch, var(--vp-c-bg) 98%, white);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.66;
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

[data-theme="dark"] .memory-layer-board,
[data-theme="dark"] .memory-layer,
[data-theme="dark"] .memory-layer-board__compare article,
[data-theme="dark"] .memory-layer-board__compare li {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .memory-layer-board__compare {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .memory-layer-board {
    padding: 18px;
  }

  .memory-layer-board__hero h2,
  .memory-layer-board__compare h3 {
    font-size: 22px;
  }
}
</style>
