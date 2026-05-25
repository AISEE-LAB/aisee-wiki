<script setup lang="ts">
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'

type FlowVariant =
  | 'overview'
  | 'intro'
  | 'environment'
  | 'codex'
  | 'project'
  | 'agent'
  | 'memory'
  | 'skill'
  | 'mcp'
  | 'tools'
  | 'hooks'
  | 'components'

interface FlowNode {
  id: string
  label: string
  x: number
  y: number
  type?: 'primary' | 'context' | 'action' | 'guard'
}

interface FlowEdge {
  id: string
  source: string
  target: string
  label?: string
}

const props = withDefaults(defineProps<{
  variant?: FlowVariant
  title?: string
  description?: string
}>(), {
  variant: 'overview',
  title: '',
  description: '',
})

const flowMap: Record<FlowVariant, {
  eyebrow: string
  title: string
  description: string
  nodes: FlowNode[]
  edges: FlowEdge[]
}> = {
  overview: {
    eyebrow: 'Learning path',
    title: 'AI Coding 学习路线',
    description: '先建立认知，再跑通工具，最后理解 Agent 的核心组成。',
    nodes: [
      { id: 'start', label: '认知入门', x: 0, y: 110, type: 'primary' },
      { id: 'intro', label: 'AI Coding 变化', x: 230, y: 30, type: 'context' },
      { id: 'choice', label: '工具与模型选择', x: 230, y: 190, type: 'context' },
      { id: 'hands', label: '工具上手', x: 500, y: 110, type: 'primary' },
      { id: 'env', label: '运行环境', x: 760, y: 20, type: 'action' },
      { id: 'codex', label: 'Codex 第一次运行', x: 760, y: 140, type: 'action' },
      { id: 'project', label: '复刻网站项目', x: 760, y: 260, type: 'action' },
      { id: 'agent', label: 'Agent 进阶', x: 1040, y: 110, type: 'primary' },
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'intro' },
      { id: 'e2', source: 'start', target: 'choice' },
      { id: 'e3', source: 'intro', target: 'hands' },
      { id: 'e4', source: 'choice', target: 'hands' },
      { id: 'e5', source: 'hands', target: 'env' },
      { id: 'e6', source: 'env', target: 'codex' },
      { id: 'e7', source: 'codex', target: 'project' },
      { id: 'e8', source: 'project', target: 'agent' },
    ],
  },
  intro: {
    eyebrow: 'Mindset shift',
    title: '从补全到 Agent',
    description: 'AI Coding 的变化不是代码补全更聪明，而是工作方式变成目标、上下文、执行和审查的闭环。',
    nodes: [
      { id: 'complete', label: '补全增强', x: 0, y: 120, type: 'context' },
      { id: 'generate', label: 'Chat 生成', x: 300, y: 120, type: 'context' },
      { id: 'agent', label: 'Agentic Coding', x: 600, y: 120, type: 'primary' },
      { id: 'human', label: '工程师：定义与审查', x: 900, y: 40, type: 'guard' },
      { id: 'verify', label: '验证与风险控制', x: 900, y: 210, type: 'guard' },
    ],
    edges: [
      { id: 'e1', source: 'complete', target: 'generate', label: '从句内到文件级' },
      { id: 'e2', source: 'generate', target: 'agent', label: '从回答到执行' },
      { id: 'e3', source: 'agent', target: 'human', label: '需要监督' },
      { id: 'e4', source: 'agent', target: 'verify', label: '必须验证' },
    ],
  },
  environment: {
    eyebrow: 'Local runtime',
    title: 'AI 能工作的本地环境',
    description: '让 Agent 能读仓库、装依赖、跑项目、看错误，再回到代码里修正。',
    nodes: [
      { id: 'repo', label: 'Git 仓库', x: 0, y: 120, type: 'context' },
      { id: 'terminal', label: '终端', x: 260, y: 120, type: 'primary' },
      { id: 'node', label: 'Node.js', x: 540, y: 20, type: 'action' },
      { id: 'python', label: 'Python', x: 540, y: 220, type: 'action' },
      { id: 'editor', label: '编辑器', x: 820, y: 70, type: 'context' },
      { id: 'browser', label: '浏览器预览', x: 820, y: 190, type: 'guard' },
    ],
    edges: [
      { id: 'e1', source: 'repo', target: 'terminal' },
      { id: 'e2', source: 'terminal', target: 'node' },
      { id: 'e3', source: 'terminal', target: 'python' },
      { id: 'e4', source: 'node', target: 'browser' },
      { id: 'e5', source: 'python', target: 'editor' },
      { id: 'e6', source: 'editor', target: 'repo' },
    ],
  },
  codex: {
    eyebrow: 'Codex workflow',
    title: '第一次使用 Codex 看什么',
    description: '核心不是装上软件，而是理解项目、命令、diff 和权限边界。',
    nodes: [
      { id: 'open', label: '打开项目目录', x: 0, y: 120, type: 'primary' },
      { id: 'read', label: '读取结构', x: 260, y: 40, type: 'context' },
      { id: 'ask', label: '安全任务', x: 260, y: 200, type: 'guard' },
      { id: 'command', label: '命令执行', x: 540, y: 40, type: 'action' },
      { id: 'diff', label: '查看 diff', x: 540, y: 200, type: 'guard' },
      { id: 'approve', label: '确认或拒绝', x: 820, y: 120, type: 'primary' },
    ],
    edges: [
      { id: 'e1', source: 'open', target: 'read' },
      { id: 'e2', source: 'open', target: 'ask' },
      { id: 'e3', source: 'read', target: 'command' },
      { id: 'e4', source: 'ask', target: 'diff' },
      { id: 'e5', source: 'command', target: 'approve' },
      { id: 'e6', source: 'diff', target: 'approve' },
    ],
  },
  project: {
    eyebrow: 'First project loop',
    title: '写、看、修、提交',
    description: '第一个项目用小闭环训练协作节奏，而不是一次生成整站。',
    nodes: [
      { id: 'reference', label: '选参考', x: 0, y: 120, type: 'context' },
      { id: 'split', label: '拆模块', x: 250, y: 120, type: 'primary' },
      { id: 'build', label: '分块实现', x: 500, y: 30, type: 'action' },
      { id: 'preview', label: '浏览器预览', x: 750, y: 30, type: 'guard' },
      { id: 'fix', label: '反馈修复', x: 750, y: 210, type: 'action' },
      { id: 'commit', label: 'Git 提交', x: 1000, y: 120, type: 'primary' },
    ],
    edges: [
      { id: 'e1', source: 'reference', target: 'split' },
      { id: 'e2', source: 'split', target: 'build' },
      { id: 'e3', source: 'build', target: 'preview' },
      { id: 'e4', source: 'preview', target: 'fix', label: '发现问题' },
      { id: 'e5', source: 'fix', target: 'build', label: '继续迭代' },
      { id: 'e6', source: 'preview', target: 'commit', label: '验收通过' },
    ],
  },
  agent: {
    eyebrow: 'Agent loop',
    title: 'Agent 的最小工作循环',
    description: '目标进入上下文，模型规划并调用工具，观察结果后继续修正，最后输出可验证结果。',
    nodes: [
      { id: 'goal', label: '用户目标', x: 0, y: 120, type: 'primary' },
      { id: 'context', label: '上下文 / Memory', x: 260, y: 30, type: 'context' },
      { id: 'model', label: '模型推理', x: 520, y: 120, type: 'primary' },
      { id: 'tool', label: 'Tool 执行', x: 790, y: 30, type: 'action' },
      { id: 'observe', label: '观察结果', x: 790, y: 220, type: 'context' },
      { id: 'verify', label: '验证输出', x: 1060, y: 120, type: 'guard' },
    ],
    edges: [
      { id: 'e1', source: 'goal', target: 'context' },
      { id: 'e2', source: 'context', target: 'model' },
      { id: 'e3', source: 'model', target: 'tool' },
      { id: 'e4', source: 'tool', target: 'observe' },
      { id: 'e5', source: 'observe', target: 'model', label: '修正' },
      { id: 'e6', source: 'observe', target: 'verify' },
    ],
  },
  memory: {
    eyebrow: 'Memory layers',
    title: 'Codex 里的上下文层次',
    description: 'Memory 是辅助上下文，不是事实真理；当前任务、项目文件和官方文档仍然优先。',
    nodes: [
      { id: 'thread', label: '当前会话上下文', x: 0, y: 130, type: 'primary' },
      { id: 'rules', label: '项目规则 AGENTS.md', x: 260, y: 30, type: 'guard' },
      { id: 'project', label: '项目记忆 .memory/', x: 260, y: 230, type: 'context' },
      { id: 'global', label: '全局记忆', x: 540, y: 130, type: 'context' },
      { id: 'files', label: '代码与文档事实', x: 820, y: 30, type: 'guard' },
      { id: 'answer', label: '当前任务决策', x: 820, y: 230, type: 'primary' },
    ],
    edges: [
      { id: 'e1', source: 'thread', target: 'rules' },
      { id: 'e2', source: 'thread', target: 'project' },
      { id: 'e3', source: 'project', target: 'global' },
      { id: 'e4', source: 'global', target: 'answer' },
      { id: 'e5', source: 'files', target: 'answer', label: '优先校验' },
      { id: 'e6', source: 'rules', target: 'files' },
    ],
  },
  skill: {
    eyebrow: 'Reusable capability',
    title: '经验沉淀成 Skill',
    description: 'Skill 把稳定流程、规则、脚本和模板打包，降低重复任务的解释成本。',
    nodes: [
      { id: 'experience', label: '重复经验', x: 0, y: 120, type: 'context' },
      { id: 'rules', label: '触发条件与步骤', x: 260, y: 120, type: 'guard' },
      { id: 'assets', label: '脚本 / 模板 / 资料', x: 540, y: 40, type: 'action' },
      { id: 'skill', label: 'Skill', x: 540, y: 210, type: 'primary' },
      { id: 'task', label: '稳定复用到任务', x: 820, y: 120, type: 'primary' },
    ],
    edges: [
      { id: 'e1', source: 'experience', target: 'rules' },
      { id: 'e2', source: 'rules', target: 'assets' },
      { id: 'e3', source: 'rules', target: 'skill' },
      { id: 'e4', source: 'assets', target: 'task' },
      { id: 'e5', source: 'skill', target: 'task' },
    ],
  },
  mcp: {
    eyebrow: 'Connector layer',
    title: 'MCP 连接外部能力',
    description: 'MCP 让 Agent 通过受控接口连接外部系统，但权限和审计仍然要被明确管理。',
    nodes: [
      { id: 'agent', label: 'Agent Client', x: 0, y: 130, type: 'primary' },
      { id: 'server', label: 'MCP Server', x: 310, y: 130, type: 'context' },
      { id: 'figma', label: 'Figma', x: 630, y: 20, type: 'action' },
      { id: 'browser', label: 'Browser', x: 630, y: 120, type: 'action' },
      { id: 'db', label: 'Database', x: 630, y: 220, type: 'action' },
      { id: 'guard', label: '权限 / 审计', x: 920, y: 130, type: 'guard' },
    ],
    edges: [
      { id: 'e1', source: 'agent', target: 'server' },
      { id: 'e2', source: 'server', target: 'figma' },
      { id: 'e3', source: 'server', target: 'browser' },
      { id: 'e4', source: 'server', target: 'db' },
      { id: 'e5', source: 'figma', target: 'guard' },
      { id: 'e6', source: 'browser', target: 'guard' },
      { id: 'e7', source: 'db', target: 'guard' },
    ],
  },
  tools: {
    eyebrow: 'Action interface',
    title: 'Tool 调用闭环',
    description: '工具让模型观察和改变环境；每次调用都要看输入、输出和下一步影响。',
    nodes: [
      { id: 'plan', label: '计划', x: 0, y: 120, type: 'primary' },
      { id: 'select', label: '选择 Tool', x: 240, y: 40, type: 'context' },
      { id: 'run', label: '执行动作', x: 500, y: 40, type: 'action' },
      { id: 'observe', label: '观察结果', x: 500, y: 220, type: 'context' },
      { id: 'risk', label: '风险检查', x: 760, y: 120, type: 'guard' },
      { id: 'next', label: '下一步', x: 1020, y: 120, type: 'primary' },
    ],
    edges: [
      { id: 'e1', source: 'plan', target: 'select' },
      { id: 'e2', source: 'select', target: 'run' },
      { id: 'e3', source: 'run', target: 'observe' },
      { id: 'e4', source: 'observe', target: 'risk' },
      { id: 'e5', source: 'risk', target: 'next' },
      { id: 'e6', source: 'observe', target: 'plan', label: '修正计划' },
    ],
  },
  hooks: {
    eyebrow: 'Lifecycle guard',
    title: 'Hook 插入 Agent 生命周期',
    description: 'Hook 不替代判断，它把自动检查放在容易越界或漏验证的位置。',
    nodes: [
      { id: 'start', label: '任务开始', x: 0, y: 120, type: 'primary' },
      { id: 'pre', label: '前置注入规则', x: 240, y: 40, type: 'guard' },
      { id: 'tool', label: '工具调用', x: 500, y: 120, type: 'action' },
      { id: 'post', label: '后置检查', x: 760, y: 40, type: 'guard' },
      { id: 'verify', label: '验证 / 提交前', x: 760, y: 220, type: 'guard' },
      { id: 'done', label: '输出结果', x: 1020, y: 120, type: 'primary' },
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'pre' },
      { id: 'e2', source: 'pre', target: 'tool' },
      { id: 'e3', source: 'tool', target: 'post' },
      { id: 'e4', source: 'tool', target: 'verify' },
      { id: 'e5', source: 'post', target: 'done' },
      { id: 'e6', source: 'verify', target: 'done' },
    ],
  },
  components: {
    eyebrow: 'Codex agent map',
    title: 'Codex 智能体核心组成',
    description: 'Memory、Skill、MCP、Tool、Hook 分处不同层级，协作完成“理解、执行、检查、沉淀”。',
    nodes: [
      { id: 'user', label: '用户目标', x: 0, y: 150, type: 'primary' },
      { id: 'memory', label: 'Memory', x: 250, y: 20, type: 'context' },
      { id: 'skill', label: 'Skill', x: 250, y: 150, type: 'context' },
      { id: 'hook', label: 'Hook', x: 250, y: 280, type: 'guard' },
      { id: 'model', label: '模型推理', x: 540, y: 150, type: 'primary' },
      { id: 'tool', label: 'Tool', x: 820, y: 80, type: 'action' },
      { id: 'mcp', label: 'MCP', x: 820, y: 220, type: 'action' },
      { id: 'result', label: '结果与沉淀', x: 1100, y: 150, type: 'primary' },
    ],
    edges: [
      { id: 'e1', source: 'user', target: 'memory', label: '带入上下文' },
      { id: 'e2', source: 'user', target: 'skill', label: '选择流程' },
      { id: 'e3', source: 'hook', target: 'model', label: '加约束' },
      { id: 'e4', source: 'memory', target: 'model' },
      { id: 'e5', source: 'skill', target: 'model' },
      { id: 'e6', source: 'model', target: 'tool' },
      { id: 'e7', source: 'tool', target: 'mcp', label: '外部能力' },
      { id: 'e8', source: 'mcp', target: 'result' },
      { id: 'e9', source: 'tool', target: 'result' },
      { id: 'e10', source: 'result', target: 'memory', label: '可复用经验' },
    ],
  },
}

const current = computed(() => flowMap[props.variant])
const nodes = computed(() => current.value.nodes.map((node) => ({
  id: node.id,
  position: { x: node.x, y: node.y },
  data: { label: node.label },
  class: `learn-flow-node learn-flow-node--${node.type ?? 'context'}`,
  draggable: false,
})))

const edges = computed(() => current.value.edges.map((edge) => ({
  id: edge.id,
  source: edge.source,
  target: edge.target,
  label: edge.label,
  animated: true,
  type: 'smoothstep',
  class: 'learn-flow-edge',
})))
</script>

<template>
  <section class="learn-flow" :class="`learn-flow--${variant}`">
    <header class="learn-flow__header">
      <p>{{ current.eyebrow }}</p>
      <h2>{{ title || current.title }}</h2>
      <span>{{ description || current.description }}</span>
    </header>
    <div class="learn-flow__canvas">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :nodes-draggable="false"
        :nodes-connectable="false"
        :elements-selectable="false"
        :zoom-on-scroll="false"
        :zoom-on-pinch="false"
        :pan-on-drag="true"
        fit-view-on-init
      />
    </div>
  </section>
</template>

<style>
.learn-flow {
  --learn-flow-border: color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  --learn-flow-panel: color-mix(in oklch, var(--vp-c-bg) 92%, oklch(95% 0.018 197));
  --learn-flow-ink: var(--vp-c-text-1);
  --learn-flow-muted: var(--vp-c-text-2);
  --learn-flow-primary: oklch(50% 0.12 188);
  --learn-flow-action: oklch(58% 0.14 35);
  --learn-flow-context: oklch(54% 0.11 255);
  --learn-flow-guard: oklch(49% 0.12 138);
  margin: 30px 0;
  overflow: hidden;
  border: 1px solid var(--learn-flow-border);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, var(--learn-flow-primary) 11%, transparent), transparent 38%),
    var(--learn-flow-panel);
  box-shadow: 0 18px 44px color-mix(in oklch, var(--vp-c-text-1) 9%, transparent);
}

.learn-flow__header {
  padding: 22px 24px 14px;
}

.learn-flow__header p {
  margin: 0 0 8px;
  color: var(--learn-flow-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.learn-flow__header h2 {
  margin: 0;
  font-size: 24px;
  line-height: 1.25;
}

.learn-flow__header span {
  display: block;
  margin-top: 8px;
  max-width: 760px;
  color: var(--learn-flow-muted);
  font-size: 14px;
  line-height: 1.7;
}

.learn-flow__canvas {
  height: 390px;
  border-top: 1px solid var(--learn-flow-border);
  background-image:
    linear-gradient(color-mix(in oklch, var(--learn-flow-border) 42%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in oklch, var(--learn-flow-border) 42%, transparent) 1px, transparent 1px);
  background-size: 24px 24px;
}

.learn-flow .vue-flow__attribution {
  display: none;
}

.learn-flow .vue-flow__node {
  width: 150px;
  padding: 12px 14px;
  border: 1px solid color-mix(in oklch, currentColor 30%, transparent);
  border-radius: 8px;
  background: color-mix(in oklch, var(--vp-c-bg) 88%, white);
  color: var(--learn-flow-context);
  box-shadow: 0 12px 26px color-mix(in oklch, currentColor 15%, transparent);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
  text-align: center;
}

.learn-flow .learn-flow-node--primary {
  color: var(--learn-flow-primary);
}

.learn-flow .learn-flow-node--action {
  color: var(--learn-flow-action);
}

.learn-flow .learn-flow-node--guard {
  color: var(--learn-flow-guard);
}

.learn-flow .vue-flow__edge-path {
  stroke: color-mix(in oklch, var(--learn-flow-primary) 68%, var(--vp-c-divider));
  stroke-width: 2.5;
}

.learn-flow .vue-flow__edge-textbg {
  fill: var(--vp-c-bg);
}

.learn-flow .vue-flow__edge-text {
  fill: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 600;
}

[data-theme="dark"] .learn-flow {
  --learn-flow-panel: color-mix(in oklch, var(--vp-c-bg) 86%, oklch(26% 0.018 240));
}

[data-theme="dark"] .learn-flow .vue-flow__node {
  background: color-mix(in oklch, var(--vp-c-bg) 84%, oklch(24% 0.02 240));
}

@media (max-width: 760px) {
  .learn-flow__header {
    padding: 18px 18px 12px;
  }

  .learn-flow__header h2 {
    font-size: 20px;
  }

  .learn-flow__canvas {
    height: 360px;
  }

  .learn-flow .vue-flow__node {
    width: 132px;
    padding: 10px 12px;
    font-size: 12px;
  }
}
</style>
