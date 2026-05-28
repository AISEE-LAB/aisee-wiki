<script setup lang="ts">
const keyEvents = [
  {
    event: 'SessionStart',
    use: '任务会话初始化时注入规则、上下文、change 状态或项目级提示。',
    avoid: '不要在这里直接改业务文件或执行高风险命令。',
  },
  {
    event: 'UserPromptSubmit',
    use: '用户提交输入时做预检查或附加轻量提示。',
    avoid: '不适合挂需要 matcher 的复杂逻辑，官方也不支持 matcher。',
  },
  {
    event: 'PreToolUse',
    use: '在 Bash、apply_patch、MCP tool 调用前拦危险动作、查路径和参数。',
    avoid: '不要把每一次普通调用都变成繁琐阻断。',
  },
  {
    event: 'PermissionRequest',
    use: '在即将弹审批时补充风险说明、权限解释或策略提醒。',
    avoid: '不要假设所有高风险动作都会先进入这个事件。',
  },
  {
    event: 'PostToolUse',
    use: '工具执行后检查输出、diff、失败结果和下一步建议。',
    avoid: '已经发生的副作用不能靠这个事件回滚。',
  },
  {
    event: 'Stop',
    use: '一次 turn 结束时做收尾检查、结果记录或最终提醒。',
    avoid: '不要把它当成“归档前”专用节点。',
  },
]

const secondaryEvents = [
  ['SubagentStart', '子代理启动时触发，适合补充上下文和边界提醒。'],
  ['SubagentStop', '子代理结束时触发，适合检查输出和结果汇总。'],
  ['PreCompact', '会话压缩前触发，适合保存重要上下文。'],
  ['PostCompact', '会话压缩后触发，适合确认关键信息没有丢失。'],
]
</script>

<template>
  <section class="codex-hook-event-board">
    <div class="codex-hook-event-board__hero">
      <p>CODEX HOOK EVENTS</p>
      <h2>本文以 Codex Hooks 系统为例，Hook 的价值取决于挂在哪个事件上。</h2>
    </div>

    <div class="codex-hook-event-board__timeline">
      <article v-for="item in keyEvents" :key="item.event" class="hook-event">
        <strong>{{ item.event }}</strong>
        <p>适合：{{ item.use }}</p>
        <em>不适合：{{ item.avoid }}</em>
      </article>
    </div>

    <div class="codex-hook-event-board__secondary">
      <div>
        <p>SECONDARY EVENTS</p>
        <h3>这些事件存在，但通常不是第一批要先用好的节点。</h3>
      </div>
      <ul>
        <li v-for="[title, desc] in secondaryEvents" :key="title">
          <strong>{{ title }}</strong>
          <span>{{ desc }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.codex-hook-event-board {
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

.codex-hook-event-board__hero {
  display: grid;
  gap: 8px;
  max-width: 780px;
}

.codex-hook-event-board__hero p,
.codex-hook-event-board__secondary p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.codex-hook-event-board__hero h2,
.codex-hook-event-board__secondary h3 {
  margin: 0;
  color: var(--vp-c-text-1);
}

.codex-hook-event-board__hero h2 {
  font-size: 28px;
  line-height: 1.28;
}

.codex-hook-event-board__hero span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.codex-hook-event-board__timeline {
  display: grid;
  gap: 10px;
}

.hook-event,
.codex-hook-event-board__secondary article,
.codex-hook-event-board__secondary li {
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.hook-event {
  display: grid;
  gap: 6px;
  padding: 16px;
}

.hook-event strong,
.codex-hook-event-board__secondary li strong {
  color: var(--vp-c-text-1);
}

.hook-event strong {
  font-size: 17px;
}

.hook-event p,
.hook-event em,
.codex-hook-event-board__secondary li span {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.66;
  font-style: normal;
}

.codex-hook-event-board__secondary {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
  gap: 18px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.codex-hook-event-board__secondary h3 {
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.35;
}

.codex-hook-event-board__secondary ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.codex-hook-event-board__secondary li {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
}

[data-theme="dark"] .codex-hook-event-board,
[data-theme="dark"] .hook-event,
[data-theme="dark"] .codex-hook-event-board__secondary,
[data-theme="dark"] .codex-hook-event-board__secondary li {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .codex-hook-event-board__secondary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .codex-hook-event-board {
    padding: 18px;
  }

  .codex-hook-event-board__hero h2,
  .codex-hook-event-board__secondary h3 {
    font-size: 22px;
  }
}
</style>
