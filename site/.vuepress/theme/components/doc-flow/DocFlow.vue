<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ELK from 'elkjs/lib/elk.bundled.js'
import { MarkerType, Position, VueFlow, type Edge, type Node } from '@vue-flow/core'
import DocFlowNode, { type DocFlowNodeData } from './DocFlowNode.vue'

type DocFlowDirection = 'RIGHT' | 'DOWN'
type DocFlowEdgeKind = 'normal' | 'feedback' | 'guard'

export interface DocFlowNodeItem extends Omit<DocFlowNodeData, 'sourcePosition' | 'targetPosition'> {
  id: string
}

export interface DocFlowEdgeItem {
  id?: string
  source: string
  target: string
  label?: string
  kind?: DocFlowEdgeKind
}

const props = withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  direction?: DocFlowDirection
  height?: number
  nodes: DocFlowNodeItem[]
  edges: DocFlowEdgeItem[]
}>(), {
  eyebrow: 'Flow',
  description: '',
  direction: 'DOWN',
  height: 520,
})

const elk = new ELK()
const layoutKey = ref(0)
const flowNodes = ref<Node<DocFlowNodeData>[]>([])
const flowEdges = ref<Edge[]>([])
const isReady = ref(false)

const sourcePosition = computed(() => props.direction === 'DOWN' ? Position.Bottom : Position.Right)
const targetPosition = computed(() => props.direction === 'DOWN' ? Position.Top : Position.Left)

const flowStyle = computed(() => ({
  '--doc-flow-height': `${props.height}px`,
}))

async function applyLayout() {
  const nodeWidth = 210
  const nodeHeight = 84
  const runKey = layoutKey.value + 1
  layoutKey.value = runKey
  isReady.value = false

  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': props.direction,
      'elk.spacing.nodeNode': props.direction === 'DOWN' ? '28' : '34',
      'elk.layered.spacing.nodeNodeBetweenLayers': props.direction === 'DOWN' ? '42' : '68',
      'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
      'elk.edgeRouting': 'ORTHOGONAL',
      'elk.padding': '[top=28,left=28,bottom=28,right=28]',
    },
    children: props.nodes.map((node) => ({
      id: node.id,
      width: nodeWidth,
        height: node.description ? nodeHeight + 12 : nodeHeight,
    })),
    edges: props.edges
      .filter((edge) => edge.kind !== 'feedback')
      .map((edge, index) => ({
        id: edge.id ?? `${edge.source}-${edge.target}-${index}`,
        sources: [edge.source],
        targets: [edge.target],
      })),
  }

  const layouted = await elk.layout(graph)
  if (layoutKey.value !== runKey) return

  const positionById = new Map(layouted.children?.map((node) => [node.id, node]) ?? [])

  flowNodes.value = props.nodes.map((node) => {
    const layoutedNode = positionById.get(node.id)

    return {
      id: node.id,
      type: 'doc',
      position: {
        x: layoutedNode?.x ?? 0,
        y: layoutedNode?.y ?? 0,
      },
      data: {
        ...node,
        sourcePosition: sourcePosition.value,
        targetPosition: targetPosition.value,
      },
      draggable: false,
      selectable: false,
    }
  })

  flowEdges.value = props.edges.map((edge, index) => ({
    id: edge.id ?? `${edge.source}-${edge.target}-${index}`,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    type: 'smoothstep',
    animated: edge.kind === 'feedback',
    markerEnd: MarkerType.ArrowClosed,
    class: [
      'doc-flow-edge',
      `doc-flow-edge--${edge.kind ?? 'normal'}`,
    ].join(' '),
  }))

  isReady.value = true
}

onMounted(() => {
  void applyLayout()
})

watch(
  () => [props.direction, props.nodes, props.edges],
  () => {
    void applyLayout()
  },
  { deep: true },
)
</script>

<template>
  <section class="doc-flow" :style="flowStyle">
    <header class="doc-flow__header">
      <p>{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <span v-if="description">{{ description }}</span>
    </header>

    <div class="doc-flow__canvas">
      <VueFlow
        v-if="isReady"
        :key="layoutKey"
        :nodes="flowNodes"
        :edges="flowEdges"
        :nodes-draggable="false"
        :nodes-connectable="false"
        :elements-selectable="false"
        :edges-updatable="false"
        :zoom-on-scroll="false"
        :zoom-on-pinch="false"
        :zoom-on-double-click="false"
        :pan-on-drag="false"
        :pan-on-scroll="false"
        :selection-on-drag="false"
        :fit-view-options="{ padding: 0.08 }"
        fit-view-on-init
      >
        <template #node-doc="nodeProps">
          <DocFlowNode v-bind="nodeProps" />
        </template>
      </VueFlow>
      <div v-else class="doc-flow__loading">流程图生成中</div>
    </div>
  </section>
</template>

<style>
.doc-flow {
  --doc-flow-primary: oklch(49% 0.12 188);
  box-sizing: border-box;
  max-width: 100%;
  margin: 30px 0;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  border-radius: 8px;
  background:
    linear-gradient(135deg, color-mix(in oklch, var(--doc-flow-primary) 10%, transparent), transparent 42%),
    color-mix(in oklch, var(--vp-c-bg) 93%, oklch(96% 0.012 205));
  box-shadow: 0 18px 44px color-mix(in oklch, var(--vp-c-text-1) 8%, transparent);
}

.doc-flow *,
.doc-flow *::before,
.doc-flow *::after {
  box-sizing: border-box;
}

.doc-flow__header {
  padding: 24px 28px 16px;
}

.doc-flow__header p {
  margin: 0 0 8px;
  color: var(--doc-flow-primary);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0;
  text-transform: uppercase;
}

.doc-flow__header h2 {
  max-width: 840px;
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 26px;
  line-height: 1.25;
}

.doc-flow__header span {
  display: block;
  max-width: 860px;
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.doc-flow__canvas {
  position: relative;
  height: var(--doc-flow-height);
  border-top: 1px solid color-mix(in oklch, var(--vp-c-divider) 82%, transparent);
  background-image:
    linear-gradient(color-mix(in oklch, var(--vp-c-divider) 38%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in oklch, var(--vp-c-divider) 38%, transparent) 1px, transparent 1px);
  background-size: 24px 24px;
}

.doc-flow .vue-flow {
  background: transparent;
}

.doc-flow .vue-flow__attribution {
  display: none;
}

.doc-flow .vue-flow__node {
  border: 0;
  background: transparent;
  box-shadow: none;
}

.doc-flow .vue-flow__edge-path {
  stroke: color-mix(in oklch, var(--doc-flow-primary) 82%, var(--vp-c-divider));
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.doc-flow .doc-flow-edge--guard .vue-flow__edge-path {
  stroke: oklch(56% 0.13 138);
}

.doc-flow .doc-flow-edge--feedback .vue-flow__edge-path {
  stroke: oklch(58% 0.13 58);
  stroke-dasharray: 7 7;
}

.doc-flow .vue-flow__arrowhead polyline,
.doc-flow .vue-flow__arrowhead path {
  stroke: color-mix(in oklch, var(--doc-flow-primary) 82%, var(--vp-c-divider));
  fill: color-mix(in oklch, var(--doc-flow-primary) 82%, var(--vp-c-divider));
}

.doc-flow .vue-flow__edge-textbg {
  fill: color-mix(in oklch, var(--vp-c-bg) 94%, white);
  rx: 6px;
  ry: 6px;
}

.doc-flow .vue-flow__edge-text {
  fill: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 800;
}

.doc-flow__loading {
  display: grid;
  height: 100%;
  place-items: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
  font-weight: 700;
}

[data-theme="dark"] .doc-flow {
  background: color-mix(in oklch, var(--vp-c-bg) 86%, oklch(25% 0.018 240));
}

[data-theme="dark"] .doc-flow .vue-flow__edge-textbg {
  fill: color-mix(in oklch, var(--vp-c-bg) 84%, oklch(24% 0.02 240));
}

@media (max-width: 760px) {
  .doc-flow__header {
    padding: 18px 18px 12px;
  }

  .doc-flow__header h2 {
    font-size: 21px;
  }

  .doc-flow__canvas {
    height: 520px;
  }
}
</style>
