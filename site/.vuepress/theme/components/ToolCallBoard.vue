<script setup lang="ts">
const loop = [
  ['计划下一步', '模型判断该回答、该读文件，还是该执行动作。'],
  ['选择 Tool', '文件、Shell、浏览器、检索、Git 或外部 API。'],
  ['准备参数', '路径、命令、URL、查询条件、目标文件。'],
  ['执行动作', '真正产生副作用的一步，比如改文件、跑命令、点页面。'],
  ['观察结果', 'stdout、diff、截图、报错、页面变化。'],
  ['决定下一步', '继续修正、请求确认，或明确说明已经完成。'],
]

const toolTypes = [
  ['文件工具', '读文件、改文件、应用 patch', '容易误改无关文件或覆盖用户修改。'],
  ['Shell', '安装依赖、启动项目、跑测试', '容易执行高风险命令或污染环境。'],
  ['浏览器', '打开页面、点击、截图、验证 UI', '容易碰登录态、隐私和误操作。'],
  ['Git / 外部 API', '看状态、提交、推送、调用业务接口', '容易带上无关改动、碰生产、泄露密钥。'],
]

const risks = [
  '删除文件或大范围移动目录',
  'git reset / 强制推送 / 覆盖工作区',
  '全局安装依赖或改系统环境',
  '访问网络、上传内容、调用生产接口',
  '修改部署、CI、环境配置或密钥相关文件',
]
</script>

<template>
  <section class="tool-call-board">
    <div class="tool-call-board__hero">
      <p>TOOL LOOP</p>
      <h2>Tool 是 Agent 的手，能做事，也最容易把错误放大。</h2>
      <span>模型本身只会生成文本。真正会改动项目状态的是 Tool 调用，所以你要看的不是“它说了什么”，而是“它准备怎么做、做完看到了什么”。</span>
    </div>

    <div class="tool-call-board__loop">
      <article v-for="[title, desc] in loop" :key="title" class="tool-step">
        <strong>{{ title }}</strong>
        <p>{{ desc }}</p>
      </article>
    </div>

    <div class="tool-call-board__detail">
      <article>
        <p>COMMON TOOLS</p>
        <ul>
          <li v-for="[title, action, risk] in toolTypes" :key="title">
            <strong>{{ title }}</strong>
            <span>{{ action }}</span>
            <em>{{ risk }}</em>
          </li>
        </ul>
      </article>
      <article>
        <p>HIGH RISK</p>
        <ul>
          <li v-for="item in risks" :key="item">{{ item }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tool-call-board {
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

.tool-call-board__hero {
  display: grid;
  gap: 8px;
  max-width: 780px;
}

.tool-call-board__hero p,
.tool-call-board__detail p {
  margin: 0;
  color: #0f766e;
  font-size: 12px;
  font-weight: 800;
}

.tool-call-board__hero h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 28px;
  line-height: 1.28;
}

.tool-call-board__hero span {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.tool-call-board__loop {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.tool-step,
.tool-call-board__detail article,
.tool-call-board__detail li {
  border-radius: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-c-divider) 76%, transparent);
  background: color-mix(in oklch, var(--vp-c-bg) 97%, white);
}

.tool-step {
  display: grid;
  gap: 8px;
  padding: 16px;
}

.tool-step strong,
.tool-call-board__detail li strong {
  color: var(--vp-c-text-1);
}

.tool-step strong {
  font-size: 16px;
}

.tool-step p,
.tool-call-board__detail li span,
.tool-call-board__detail li em,
.tool-call-board__detail li {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.66;
}

.tool-step p {
  margin: 0;
}

.tool-call-board__detail {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 14px;
}

.tool-call-board__detail article {
  padding: 18px;
}

.tool-call-board__detail ul {
  display: grid;
  gap: 10px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.tool-call-board__detail li {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
}

.tool-call-board__detail li strong {
  font-size: 15px;
}

.tool-call-board__detail li span,
.tool-call-board__detail li em {
  display: block;
}

.tool-call-board__detail li em {
  font-style: normal;
}

[data-theme="dark"] .tool-call-board,
[data-theme="dark"] .tool-step,
[data-theme="dark"] .tool-call-board__detail article,
[data-theme="dark"] .tool-call-board__detail li {
  background: color-mix(in oklch, var(--vp-c-bg) 87%, oklch(25% 0.018 240));
}

@media (max-width: 960px) {
  .tool-call-board__loop,
  .tool-call-board__detail {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .tool-call-board {
    padding: 18px;
  }

  .tool-call-board__hero h2 {
    font-size: 22px;
  }
}
</style>
