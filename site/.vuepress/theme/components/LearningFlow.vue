<script setup lang="ts">
import { computed } from 'vue'
import DocFlow, { type DocFlowEdgeItem, type DocFlowNodeItem } from './doc-flow/DocFlow.vue'

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

interface FlowPreset {
  eyebrow: string
  title: string
  description: string
  direction?: 'RIGHT' | 'DOWN'
  height?: number
  nodes: DocFlowNodeItem[]
  edges: DocFlowEdgeItem[]
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

const flowMap: Record<FlowVariant, FlowPreset> = {
  overview: {
    eyebrow: 'Learning path',
    title: 'AI Coding 学习路线',
    description: '先建立判断力，再跑通工具，最后理解 Agent 的核心组成。',
    direction: 'DOWN',
    height: 720,
    nodes: [
      { id: 'start', title: '开始学习', subtitle: '入口', kind: 'start' },
      { id: 'intro', title: '认知入门', subtitle: '理解变化', description: 'AI Coding 不是补全更聪明，而是工作闭环改变。', kind: 'process', href: '/learn/ai-coding-intro/' },
      { id: 'choose', title: '工具与模型选择', subtitle: '选择坐标', description: '按任务形态选择 Codex、Claude、Gemini、GLM 等工具。', kind: 'decision', href: '/learn/tools-and-models/' },
      { id: 'env', title: '准备运行环境', subtitle: 'Git / Node / Python', description: '让 AI 能读仓库、跑命令、看错误。', kind: 'process', href: '/learn/runtime-setup/' },
      { id: 'codex', title: 'Codex 第一次运行', subtitle: '项目 / 命令 / diff', description: '理解权限边界和第一次安全任务。', kind: 'agent', href: '/learn/codex-setup/' },
      { id: 'project', title: '复刻网站项目', subtitle: '第一个闭环', description: '拆模块、预览、反馈修复、提交。', kind: 'process', href: '/learn/first-ai-project/' },
      { id: 'agent', title: 'Agent 进阶', subtitle: '核心组成', description: '理解 Memory、Skill、MCP、Tool、Hook 如何协作。', kind: 'end', href: '/learn/agent-orchestration/' },
    ],
    edges: [
      { source: 'start', target: 'intro' },
      { source: 'intro', target: 'choose' },
      { source: 'choose', target: 'env', label: '确定主线' },
      { source: 'env', target: 'codex' },
      { source: 'codex', target: 'project' },
      { source: 'project', target: 'agent', label: '完成第一个项目' },
    ],
  },
  intro: {
    eyebrow: 'Mindset shift',
    title: '从补全到 Agent',
    description: 'AI Coding 的变化是从“生成代码片段”走向“在项目里持续执行和验证”。',
    direction: 'DOWN',
    height: 560,
    nodes: [
      { id: 'complete', title: '补全增强', subtitle: 'IDE 内联', kind: 'start' },
      { id: 'chat', title: 'Chat 生成', subtitle: '解释与片段', kind: 'process' },
      { id: 'agent', title: 'Agentic Coding', subtitle: '读项目 / 跑命令 / 改文件', kind: 'agent' },
      { id: 'human', title: '工程师定义目标', subtitle: '边界与验收', kind: 'guard' },
      { id: 'verify', title: '验证结果', subtitle: '测试 / 预览 / diff', kind: 'end' },
    ],
    edges: [
      { source: 'complete', target: 'chat', label: '上下文变长' },
      { source: 'chat', target: 'agent', label: '从回答到行动' },
      { source: 'human', target: 'agent', label: '给约束', kind: 'guard' },
      { source: 'agent', target: 'verify', label: '必须验证' },
    ],
  },
  environment: {
    eyebrow: 'Runtime',
    title: 'AI 能工作的本地环境',
    description: '本地环境的作用，是让 Agent 能观察真实项目并把错误反馈回下一轮。',
    direction: 'DOWN',
    height: 620,
    nodes: [
      { id: 'repo', title: 'Git 仓库', subtitle: '修改可追踪', kind: 'data' },
      { id: 'terminal', title: '终端', subtitle: '命令入口', kind: 'io' },
      { id: 'node', title: 'Node.js', subtitle: '前端 / CLI', kind: 'process' },
      { id: 'python', title: 'Python', subtitle: '脚本 / 后端', kind: 'process' },
      { id: 'preview', title: '浏览器预览', subtitle: '看真实效果', kind: 'guard' },
      { id: 'fix', title: '错误回到代码', subtitle: '继续修正', kind: 'end' },
    ],
    edges: [
      { source: 'repo', target: 'terminal' },
      { source: 'terminal', target: 'node' },
      { source: 'terminal', target: 'python' },
      { source: 'node', target: 'preview' },
      { source: 'python', target: 'preview' },
      { source: 'preview', target: 'fix' },
    ],
  },
  codex: {
    eyebrow: 'Codex loop',
    title: 'Codex 第一次运行看什么',
    description: '安装只是入口，关键是看懂项目读取、命令执行、diff 和权限确认。',
    direction: 'DOWN',
    height: 720,
    nodes: [
      { id: 'prepare', title: '准备实验项目', subtitle: '不要用生产仓库', kind: 'start' },
      { id: 'open', title: '打开项目目录', subtitle: '建立工作区', kind: 'io' },
      { id: 'read', title: '只读项目结构', subtitle: '先不改文件', kind: 'process' },
      { id: 'plan', title: '解释启动方式', subtitle: '不直接安装依赖', kind: 'decision' },
      { id: 'command', title: '执行命令', subtitle: '看输入与输出', kind: 'agent' },
      { id: 'diff', title: '审查 diff', subtitle: '确认修改范围', kind: 'guard' },
      { id: 'approve', title: '批准或拒绝', subtitle: '权限边界', kind: 'end' },
    ],
    edges: [
      { source: 'prepare', target: 'open' },
      { source: 'open', target: 'read' },
      { source: 'read', target: 'plan' },
      { source: 'plan', target: 'command', label: '需要验证' },
      { source: 'command', target: 'diff' },
      { source: 'diff', target: 'approve' },
    ],
  },
  project: {
    eyebrow: 'Project loop',
    title: '第一个 AI Coding 项目闭环',
    description: '先做小闭环：给参考、拆模块、预览、反馈、修复、提交。',
    direction: 'DOWN',
    height: 760,
    nodes: [
      { id: 'reference', title: '选择参考站', subtitle: '只学结构', kind: 'start' },
      { id: 'split', title: '拆页面模块', subtitle: 'Hero / CTA / FAQ', kind: 'process' },
      { id: 'build', title: '分块实现', subtitle: '一次只做一块', kind: 'agent' },
      { id: 'preview', title: '浏览器预览', subtitle: 'PC 和移动端', kind: 'guard' },
      { id: 'issue', title: '是否有问题', subtitle: '遮挡 / 溢出 / 报错', kind: 'decision' },
      { id: 'fix', title: '反馈修复', subtitle: '具体指出问题', kind: 'process' },
      { id: 'commit', title: '提交成果', subtitle: '看 diff 后提交', kind: 'end' },
    ],
    edges: [
      { source: 'reference', target: 'split' },
      { source: 'split', target: 'build' },
      { source: 'build', target: 'preview' },
      { source: 'preview', target: 'issue' },
      { source: 'issue', target: 'fix', label: '有问题', kind: 'feedback' },
      { source: 'fix', target: 'build', label: '继续迭代', kind: 'feedback' },
      { source: 'issue', target: 'commit', label: '通过' },
    ],
  },
  agent: {
    eyebrow: 'Agent loop',
    title: 'Agent 的最小工作循环',
    description: '参考程序主循环来理解：目标进入上下文，模型选择动作，工具结果再写回下一轮。',
    direction: 'DOWN',
    height: 780,
    nodes: [
      { id: 'user', title: '用户目标', subtitle: 'query', kind: 'start' },
      { id: 'context', title: '装载上下文', subtitle: 'messages / files / memory', kind: 'data' },
      { id: 'model', title: '模型推理', subtitle: 'plan or tool_use', kind: 'agent' },
      { id: 'decision', title: '需要工具吗', subtitle: 'stop reason', kind: 'decision' },
      { id: 'tool', title: '执行 Tool', subtitle: '真实动作', kind: 'process' },
      { id: 'result', title: 'tool_result', subtitle: '写回 messages', kind: 'io' },
      { id: 'done', title: '输出结果', subtitle: '完成或请求确认', kind: 'end' },
    ],
    edges: [
      { source: 'user', target: 'context' },
      { source: 'context', target: 'model' },
      { source: 'model', target: 'decision' },
      { source: 'decision', target: 'tool', label: 'tool_use' },
      { source: 'tool', target: 'result' },
      { source: 'result', target: 'model', label: '下一轮', kind: 'feedback' },
      { source: 'decision', target: 'done', label: '不需要工具' },
    ],
  },
  memory: {
    eyebrow: 'Memory layers',
    title: 'Codex 里的上下文层次',
    description: 'Memory 只是辅助上下文，项目文件、当前任务和项目规则仍然优先。',
    direction: 'DOWN',
    height: 650,
    nodes: [
      { id: 'current', title: '当前会话', subtitle: '最新目标和进度', kind: 'start' },
      { id: 'rules', title: '项目规则', subtitle: 'AGENTS.md', kind: 'guard' },
      { id: 'project', title: '项目记忆', subtitle: '.memory/index.md', kind: 'data' },
      { id: 'global', title: '全局记忆', subtitle: '跨项目偏好', kind: 'data' },
      { id: 'files', title: '项目文件事实', subtitle: '源码 / README / spec', kind: 'io' },
      { id: 'decision', title: '当前任务决策', subtitle: '只对本次任务负责', kind: 'end' },
    ],
    edges: [
      { source: 'current', target: 'rules', label: '先读当前' },
      { source: 'rules', target: 'project' },
      { source: 'project', target: 'global' },
      { source: 'global', target: 'files', label: '需要校验' },
      { source: 'files', target: 'decision' },
      { source: 'rules', target: 'decision', label: '约束', kind: 'guard' },
    ],
  },
  skill: {
    eyebrow: 'Skill pipeline',
    title: '经验如何变成 Skill',
    description: 'Skill 不是长提示词，而是把稳定流程、脚本、模板和检查项封装起来。',
    direction: 'DOWN',
    height: 560,
    nodes: [
      { id: 'repeat', title: '重复经验', subtitle: '多人多次出现', kind: 'start' },
      { id: 'trigger', title: '触发条件', subtitle: '什么时候使用', kind: 'decision' },
      { id: 'steps', title: '稳定步骤', subtitle: '怎么做', kind: 'process' },
      { id: 'assets', title: '脚本 / 模板 / 资料', subtitle: '可复用资产', kind: 'data' },
      { id: 'skill', title: 'Skill', subtitle: '封装成能力', kind: 'end' },
    ],
    edges: [
      { source: 'repeat', target: 'trigger' },
      { source: 'trigger', target: 'steps' },
      { source: 'steps', target: 'assets' },
      { source: 'assets', target: 'skill' },
    ],
  },
  mcp: {
    eyebrow: 'MCP topology',
    title: 'MCP 如何连接外部能力',
    description: 'MCP 是连接层，负责把外部系统能力以受控接口暴露给 Agent。',
    direction: 'DOWN',
    height: 680,
    nodes: [
      { id: 'agent', title: 'Agent Client', subtitle: 'Codex / Claude / IDE', kind: 'start' },
      { id: 'server', title: 'MCP Server', subtitle: '连接协议', kind: 'process' },
      { id: 'capability', title: '暴露能力', subtitle: 'Tool / Resource / Prompt', kind: 'decision' },
      { id: 'browser', title: '浏览器', subtitle: '点击 / 截图 / 验证', kind: 'io' },
      { id: 'figma', title: 'Figma', subtitle: '设计稿 / 组件', kind: 'io' },
      { id: 'docs', title: '文档或数据库', subtitle: '外部上下文', kind: 'data' },
      { id: 'guard', title: '权限与审计', subtitle: '必须显式管理', kind: 'guard' },
    ],
    edges: [
      { source: 'agent', target: 'server' },
      { source: 'server', target: 'capability' },
      { source: 'capability', target: 'browser' },
      { source: 'capability', target: 'figma' },
      { source: 'capability', target: 'docs' },
      { source: 'browser', target: 'guard', kind: 'guard' },
      { source: 'figma', target: 'guard', kind: 'guard' },
      { source: 'docs', target: 'guard', kind: 'guard' },
    ],
  },
  tools: {
    eyebrow: 'Tool loop',
    title: 'Tool 调用闭环',
    description: '工具调用要像函数调用一样看输入、输出和副作用。',
    direction: 'DOWN',
    height: 760,
    nodes: [
      { id: 'plan', title: '计划下一步', subtitle: 'model plan', kind: 'start' },
      { id: 'select', title: '选择 Tool', subtitle: 'file / shell / browser', kind: 'decision' },
      { id: 'input', title: '准备参数', subtitle: '路径 / 命令 / URL', kind: 'io' },
      { id: 'run', title: '执行动作', subtitle: '产生副作用', kind: 'process' },
      { id: 'observe', title: '观察输出', subtitle: 'stdout / diff / screenshot', kind: 'data' },
      { id: 'risk', title: '风险检查', subtitle: '删除 / 密钥 / 生产', kind: 'guard' },
      { id: 'next', title: '决定下一步', subtitle: '继续或停止', kind: 'end' },
    ],
    edges: [
      { source: 'plan', target: 'select' },
      { source: 'select', target: 'input' },
      { source: 'input', target: 'run' },
      { source: 'run', target: 'observe' },
      { source: 'observe', target: 'risk' },
      { source: 'risk', target: 'next' },
      { source: 'observe', target: 'plan', label: '修正计划', kind: 'feedback' },
    ],
  },
  hooks: {
    eyebrow: 'Hook lifecycle',
    title: 'Hook 插入 Agent 生命周期的位置',
    description: 'Hook 适合做明确、重复、高风险的检查，不替代人的判断。',
    direction: 'DOWN',
    height: 720,
    nodes: [
      { id: 'start', title: '任务开始', subtitle: '读取上下文', kind: 'start' },
      { id: 'pre', title: 'Pre Hook', subtitle: '注入规则 / 检查状态', kind: 'guard' },
      { id: 'tool', title: '工具调用', subtitle: '读写 / 命令 / 浏览器', kind: 'process' },
      { id: 'post', title: 'Post Hook', subtitle: '检查修改和输出', kind: 'guard' },
      { id: 'verify', title: '验证阶段', subtitle: 'build / test / preview', kind: 'process' },
      { id: 'commit', title: '提交前检查', subtitle: 'diff / secrets / message', kind: 'guard' },
      { id: 'done', title: '输出结果', subtitle: '说明验证和风险', kind: 'end' },
    ],
    edges: [
      { source: 'start', target: 'pre' },
      { source: 'pre', target: 'tool' },
      { source: 'tool', target: 'post' },
      { source: 'post', target: 'verify' },
      { source: 'verify', target: 'commit' },
      { source: 'commit', target: 'done' },
    ],
  },
  components: {
    eyebrow: 'Codex agent map',
    title: 'Memory、Skill、MCP、Tool、Hook 如何配合',
    description: '以 Codex 智能体为例，把上下文、流程、执行、连接和检查放进同一个控制流。',
    direction: 'DOWN',
    height: 860,
    nodes: [
      { id: 'user', title: '用户目标', subtitle: '当前任务', kind: 'start' },
      { id: 'memory', title: 'Memory', subtitle: '会话 / 项目 / 全局', kind: 'data' },
      { id: 'skill', title: 'Skill', subtitle: '匹配稳定流程', kind: 'decision' },
      { id: 'model', title: '模型规划', subtitle: '决定下一步动作', kind: 'agent' },
      { id: 'hookBefore', title: 'Hook 检查', subtitle: '危险动作前', kind: 'guard' },
      { id: 'tool', title: 'Tool 执行', subtitle: '文件 / Shell / 浏览器', kind: 'process' },
      { id: 'mcp', title: 'MCP 能力', subtitle: '外部系统', kind: 'io' },
      { id: 'result', title: '观察结果', subtitle: '输出写回上下文', kind: 'data' },
      { id: 'done', title: '结果与沉淀', subtitle: '验证 / 复盘 / 记忆', kind: 'end' },
    ],
    edges: [
      { source: 'user', target: 'memory' },
      { source: 'memory', target: 'skill' },
      { source: 'skill', target: 'model', label: '选流程' },
      { source: 'model', target: 'hookBefore' },
      { source: 'hookBefore', target: 'tool', kind: 'guard' },
      { source: 'tool', target: 'mcp', label: '需要外部能力' },
      { source: 'tool', target: 'result' },
      { source: 'mcp', target: 'result' },
      { source: 'result', target: 'model', label: '继续下一轮', kind: 'feedback' },
      { source: 'result', target: 'done', label: '完成' },
      { source: 'done', target: 'memory', label: '沉淀', kind: 'feedback' },
    ],
  },
}

const current = computed(() => flowMap[props.variant])
</script>

<template>
  <DocFlow
    :eyebrow="current.eyebrow"
    :title="title || current.title"
    :description="description || current.description"
    :direction="current.direction ?? 'DOWN'"
    :height="current.height"
    :nodes="current.nodes"
    :edges="current.edges"
  />
</template>
