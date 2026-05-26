<script setup lang="ts">
const phases = [
  {
    id: 'mindset',
    label: '01',
    title: '认知',
    summary: '先理解 AI Coding 改变的是工作闭环，不是单纯让补全更聪明。',
    outcome: '能判断任务边界、模型能力和人工审查责任。',
    accent: 'teal',
    articles: [
      {
        title: 'AI Coding 到底改变了什么',
        href: '/learn/ai-coding-intro/',
        problem: '从补全、Chat 到 Agentic Coding 的区别',
        result: '建立“管理一个会写代码的执行者”的心智模型',
      },
      {
        title: 'AI 编程工具与模型怎么选',
        href: '/learn/tools-and-models/',
        problem: 'Codex、Claude、Gemini、GLM 等工具如何取舍',
        result: '按任务类型选择工具和模型，而不是按热度排名',
      },
    ],
  },
  {
    id: 'practice',
    label: '02',
    title: '上手',
    summary: '再把本地环境和 Codex 跑通，练会读项目、看命令、审 diff。',
    outcome: '能在实验项目里完成一次低风险 AI Coding 闭环。',
    accent: 'blue',
    articles: [
      {
        title: '给 AI 准备运行环境',
        href: '/learn/dev-environment/',
        problem: '为什么 Agent 需要 Git、Node、Python、终端和浏览器',
        result: '能验证本地环境是否足够让 Agent 工作',
      },
      {
        title: 'Codex 安装、配置与第一次运行',
        href: '/learn/codex-setup/',
        problem: 'Codex 打开项目后应该先看什么',
        result: '理解项目读取、命令执行、diff 和权限边界',
      },
      {
        title: '第一个 AI Coding 项目：复刻一个网站',
        href: '/learn/first-ai-coding-project/',
        problem: '如何用小项目练出协作闭环',
        result: '能分模块完成一个 PC + 移动端可看的页面',
      },
    ],
  },
  {
    id: 'agent',
    label: '03',
    title: '进阶',
    summary: '最后拆开 Agent 的核心组成，理解 Memory、Skill、MCP、Tool、Hook 如何协作。',
    outcome: '能把单次 AI 协作升级成可复用、可审查的工程流程。',
    accent: 'orange',
    articles: [
      {
        title: 'Agent 是怎么工作的',
        href: '/learn/agent-basics/',
        problem: 'Agent 和聊天模型有什么本质区别',
        result: '理解目标、上下文、工具、验证之间的循环',
      },
      {
        title: 'Memory：让 Agent 带着上下文持续工作',
        href: '/learn/agent-memory/',
        problem: '全局记忆、项目记忆、规则和会话上下文如何区分',
        result: '能判断哪些信息该写进项目规则或 memory',
      },
      {
        title: 'Skill：把经验封装成可复用能力',
        href: '/learn/skills/',
        problem: '什么时候该把经验沉淀成 skill',
        result: '会识别重复流程、模板、脚本和触发条件',
      },
      {
        title: 'MCP：让 Agent 连接外部能力',
        href: '/learn/mcp/',
        problem: 'MCP 和普通工具调用是什么关系',
        result: '理解连接外部系统时的权限和审计边界',
      },
      {
        title: 'Tool：Agent 真正执行动作的接口',
        href: '/learn/agent-tools/',
        problem: 'Agent 如何读文件、改代码、跑命令',
        result: '能监督 tool 调用输入、输出和风险',
      },
      {
        title: 'Hook：在关键节点加上自动检查和约束',
        href: '/learn/hooks/',
        problem: '如何让 Agent 不忘规则、不漏验证',
        result: '知道哪些生命周期节点适合加自动检查',
      },
      {
        title: 'Agent 的核心组成如何配合',
        href: '/learn/agent-components/',
        problem: 'Memory、Skill、MCP、Tool、Hook 如何分工',
        result: '用 Codex 智能体串起完整工作流',
      },
    ],
  },
]

const checkpoints = [
  '能让 AI 阅读项目结构并总结技术栈',
  '能让 AI 说明启动方式而不是盲目安装依赖',
  '能控制文件修改范围并审查 diff',
  '能运行最小验证并解释结果',
  '能把稳定流程沉淀成 Memory、Skill 或 Hook',
]
</script>

<template>
  <section class="learn-index" aria-label="AI Coding 学习路径">
    <div class="learn-index__hero">
      <div class="learn-index__hero-copy">
        <p class="learn-index__eyebrow">AI CODING PATH</p>
        <h2>先建立判断力，再跑通工具，最后理解 Agent 的核心组成。</h2>
        <p>
          这不是一组零散教程，而是一条从认知到实操、再到工程化协作的路线。每篇文章都回答一个具体问题，并把下一步自然接上。
        </p>
      </div>
      <ol class="learn-index__steps" aria-label="三阶段路线">
        <li v-for="phase in phases" :key="phase.id" :class="`is-${phase.accent}`">
          <span>{{ phase.label }}</span>
          <strong>{{ phase.title }}</strong>
          <small>{{ phase.articles.length }} 篇</small>
        </li>
      </ol>
    </div>

    <div class="learn-index__phases">
      <section v-for="phase in phases" :key="phase.id" class="learn-phase" :class="`is-${phase.accent}`">
        <div class="learn-phase__intro">
          <span>{{ phase.label }}</span>
          <div>
            <h3>{{ phase.title }}</h3>
            <p>{{ phase.summary }}</p>
          </div>
        </div>
        <p class="learn-phase__outcome">{{ phase.outcome }}</p>
        <div class="learn-phase__articles">
          <a v-for="article in phase.articles" :key="article.href" class="learn-article" :href="article.href">
            <strong>{{ article.title }}</strong>
            <span>{{ article.problem }}</span>
            <em>{{ article.result }}</em>
          </a>
        </div>
      </section>
    </div>

    <section class="learn-index__finish">
      <div>
        <p class="learn-index__eyebrow">FINISH LINE</p>
        <h3>学完以后，你应该能独立监督一次 AI Coding 任务。</h3>
      </div>
      <ul>
        <li v-for="item in checkpoints" :key="item">{{ item }}</li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.learn-index {
  display: grid;
  gap: 28px;
  margin: 30px 0;
}

.learn-index__hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 28px;
  align-items: stretch;
  padding: 28px;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, oklch(57% 0.12 185) 14%, transparent), transparent 46%),
    color-mix(in oklch, var(--vp-c-bg) 94%, oklch(97% 0.014 215));
  box-shadow: 0 18px 44px color-mix(in oklch, var(--vp-c-text-1) 7%, transparent);
}

.learn-index__hero-copy {
  display: grid;
  align-content: center;
  gap: 12px;
}

.learn-index__eyebrow {
  margin: 0;
  color: #0f766e;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
}

.learn-index__hero h2,
.learn-index__finish h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 28px;
  line-height: 1.28;
  letter-spacing: 0;
}

.learn-index__hero p:not(.learn-index__eyebrow) {
  margin: 0;
  max-width: 650px;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.8;
}

.learn-index__steps {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.learn-index__steps li {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  min-height: 62px;
  padding: 14px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 78%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 88%, white);
}

.learn-index__steps span {
  color: var(--accent);
  font-weight: 800;
}

.learn-index__steps strong {
  color: var(--vp-c-text-1);
  font-size: 18px;
}

.learn-index__steps small {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.learn-index__phases {
  display: grid;
  gap: 18px;
}

.learn-phase {
  display: grid;
  gap: 16px;
  padding: 22px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-left: 4px solid var(--accent);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.learn-phase__intro {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.learn-phase__intro > span {
  color: var(--accent);
  font-size: 18px;
  font-weight: 800;
}

.learn-phase h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 24px;
  line-height: 1.3;
}

.learn-phase p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.learn-phase__outcome {
  padding: 10px 12px;
  border-radius: 6px;
  background: color-mix(in oklch, var(--accent) 9%, transparent);
}

.learn-phase__articles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.learn-article {
  display: grid;
  gap: 8px;
  min-height: 150px;
  padding: 16px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  color: inherit;
  background: color-mix(in oklch, var(--vp-c-bg) 94%, white);
  text-decoration: none;
  transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
}

.learn-article:hover {
  border-color: color-mix(in oklch, var(--accent) 58%, var(--vp-c-divider));
  box-shadow: 0 12px 28px color-mix(in oklch, var(--accent) 12%, transparent);
  transform: translateY(-1px);
}

.learn-article strong {
  color: var(--vp-c-text-1);
  font-size: 17px;
  line-height: 1.45;
}

.learn-article span,
.learn-article em {
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-style: normal;
  line-height: 1.65;
}

.learn-article em {
  color: color-mix(in oklch, var(--accent) 76%, var(--vp-c-text-2));
}

.learn-index__finish {
  display: grid;
  gap: 18px;
  padding: 24px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 92%, oklch(96% 0.012 205));
}

.learn-index__finish ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.learn-index__finish li {
  position: relative;
  padding-left: 20px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.learn-index__finish li::before {
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #0f766e;
  content: "";
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

[data-theme="dark"] .learn-index__hero,
[data-theme="dark"] .learn-index__finish,
[data-theme="dark"] .learn-index__steps li,
[data-theme="dark"] .learn-article {
  background: color-mix(in oklch, var(--vp-c-bg) 88%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .learn-index__hero {
    grid-template-columns: 1fr;
  }

  .learn-index__steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .learn-index__steps li {
    grid-template-columns: 1fr;
  }

  .learn-phase__articles,
  .learn-index__finish ul {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .learn-index__hero,
  .learn-phase,
  .learn-index__finish {
    padding: 18px;
  }

  .learn-index__hero h2,
  .learn-index__finish h3 {
    font-size: 23px;
  }

  .learn-index__steps {
    grid-template-columns: 1fr;
  }

  .learn-phase__intro {
    grid-template-columns: 1fr;
  }
}
</style>
