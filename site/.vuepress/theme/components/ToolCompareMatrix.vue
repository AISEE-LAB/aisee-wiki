<script setup lang="ts">
const rows = [
  {
    name: 'Codex',
    badge: '本站主线',
    shape: 'Agent App / CLI',
    bestFor: '真实仓库、多文件修改、命令执行、diff 审查',
    watch: '第一次使用先从只读任务开始，明确权限边界。',
    score: ['项目理解', '执行闭环', '权限审查'],
  },
  {
    name: 'Claude Code',
    badge: '工程协作',
    shape: 'Terminal Agent',
    bestFor: '长任务、重构、代码库理解、团队规则执行',
    watch: '适合 CLI 用户，团队要统一上下文和提交规范。',
    score: ['长任务', '重构', '终端体验'],
  },
  {
    name: 'Gemini',
    badge: '多模态',
    shape: 'CLI / Web / API',
    bestFor: '长上下文阅读、截图/文档参与、搜索结合',
    watch: '编码入口和认证方式要按实际环境确认。',
    score: ['长上下文', '多模态', '资料整合'],
  },
  {
    name: 'GLM',
    badge: '中文友好',
    shape: '模型 / 编程生态',
    bestFor: '中文需求、本地化、预算敏感和国产模型补充',
    watch: '不同工具接入体验差异较大，要以真实任务测试。',
    score: ['中文表达', '成本', '生态兼容'],
  },
  {
    name: 'Cursor / Windsurf',
    badge: '编辑器内',
    shape: 'AI-first IDE',
    bestFor: '页面开发、局部重构、边写边问、快速试错',
    watch: '适合个人效率提升，团队迁移要评估编辑器习惯。',
    score: ['低切换', '页面开发', '上下文索引'],
  },
  {
    name: 'GitHub Copilot',
    badge: '轻量入口',
    shape: '编辑器补全',
    bestFor: '日常续写、小函数、测试补全、低打扰协作',
    watch: '不适合作为复杂 Agent 工作流的唯一入口。',
    score: ['补全', '低干扰', '编辑器集成'],
  },
]
</script>

<template>
  <section class="tool-compare">
    <header>
      <p>Decision matrix</p>
      <h2>按任务选择，而不是按品牌选择</h2>
      <span>先看任务是否需要读项目、执行命令、处理图片、长上下文或中文本地化，再决定入口。</span>
    </header>

    <div class="tool-compare__grid">
      <article v-for="row in rows" :key="row.name" class="tool-compare__row">
        <div class="tool-compare__title">
          <strong>{{ row.name }}</strong>
          <span>{{ row.badge }}</span>
        </div>
        <dl>
          <div>
            <dt>形态</dt>
            <dd>{{ row.shape }}</dd>
          </div>
          <div>
            <dt>优先场景</dt>
            <dd>{{ row.bestFor }}</dd>
          </div>
          <div>
            <dt>注意</dt>
            <dd>{{ row.watch }}</dd>
          </div>
        </dl>
        <ul aria-label="能力标签">
          <li v-for="item in row.score" :key="item">{{ item }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tool-compare {
  box-sizing: border-box;
  max-width: 100%;
  margin: 28px 0;
  padding: 24px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 94%, oklch(96% 0.014 198));
}

.tool-compare *,
.tool-compare *::before,
.tool-compare *::after {
  box-sizing: border-box;
}

header p {
  margin: 0 0 8px;
  color: oklch(50% 0.12 188);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

header h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 24px;
  line-height: 1.3;
}

header span {
  display: block;
  max-width: 760px;
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.tool-compare__grid {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.tool-compare__row {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr) 210px;
  gap: 14px;
  align-items: center;
  min-width: 0;
  padding: 14px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 72%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 96%, white);
}

.tool-compare__title strong,
.tool-compare__title span {
  display: block;
}

.tool-compare__title strong {
  color: var(--vp-c-text-1);
  font-size: 17px;
  line-height: 1.3;
}

.tool-compare__title span {
  width: fit-content;
  margin-top: 7px;
  padding: 4px 8px;
  border-radius: 999px;
  background: color-mix(in oklch, oklch(50% 0.12 188) 11%, transparent);
  color: oklch(48% 0.12 188);
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

dl {
  display: grid;
  grid-template-columns: 0.7fr 1.5fr 1.3fr;
  gap: 12px;
  margin: 0;
}

dt {
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 800;
}

dd {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.55;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  padding: 5px 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 70%, transparent);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

[data-theme="dark"] .tool-compare {
  background: color-mix(in oklch, var(--vp-c-bg) 86%, oklch(25% 0.018 240));
}

[data-theme="dark"] .tool-compare__row {
  background: color-mix(in oklch, var(--vp-c-bg) 84%, oklch(24% 0.02 240));
}

@media (max-width: 980px) {
  .tool-compare__row {
    grid-template-columns: 1fr;
    align-items: start;
  }

  dl {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ul {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .tool-compare {
    padding: 18px;
    overflow-wrap: anywhere;
  }

  header h2 {
    font-size: 21px;
  }

  dl {
    grid-template-columns: 1fr;
  }
}
</style>
