<p align="center">
  <img src="site/.vuepress/public/brand/aisee-logo-wordmark.svg" alt="AISEE Wiki" width="560">
</p>

<p align="center">
  <strong>面向 OpenSpec、Compound Engineering 与 AISEE workflows 的开放方法论与实践文档站。</strong>
</p>

<p align="center">
  <a href="https://aisee.wiki"><img src="https://img.shields.io/badge/website-aisee.wiki-015cfa" alt="Website"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-16a34a" alt="License"></a>
</p>

<p align="center">
  <a href="https://aisee.wiki">网站</a> ·
  <a href="https://github.com/AISEE-LAB/aisee-wiki">GitHub</a> ·
  <a href="https://github.com/AISEE-LAB/aisee-plugin">AISEE Plugin 仓库</a> ·
  <a href="https://aisee.wiki/learn/">指南</a> ·
  <a href="https://aisee.wiki/openspec/">OpenSpec</a> ·
  <a href="https://aisee.wiki/compound/">Compound Engineering</a> ·
  <a href="https://aisee.wiki/aisee/">AISEE</a>
</p>

# AISEE Wiki

AISEE Wiki 是一个围绕 OpenSpec、Compound Engineering 与 AISEE workflows 建立的开放方法论与实践文档站。

它的目标不是替代这些项目本身的官方仓库，而是把 AI Engineering 相关的概念、工作流、组合方式、实践路径和可公开沉淀的经验整理成更适合阅读与学习的文档入口。

## 你可以在这里找到什么

- AI Coding 与 agent workflows 的入门指南
- OpenSpec 方法论、artifact 写法与 schema 说明
- Compound Engineering 的执行、评审与知识复利文档
- AISEE workflows、插件生态与组合实践入口
- 推荐资源目录与 AISEE 团队开源项目入口

## 适合谁看

- 想系统学习 AI Coding、agent workflows 和规范化协作的开发者
- 想把 AI 协作从聊天记录推进到可审查工作流的团队
- 想理解 OpenSpec、Compound Engineering 与 AISEE 之间关系边界的人
- 想寻找实践案例、阅读路径和公开参考资料的读者

## 从哪里开始

- [指南](https://aisee.wiki/learn/)：从 AI Coding 基础、工具和 agent 组成开始
- [OpenSpec](https://aisee.wiki/openspec/)：理解规范层、artifact、delta spec 和 schema
- [Compound Engineering](https://aisee.wiki/compound/)：理解执行、评审、调试与知识复利
- [AISEE](https://aisee.wiki/aisee/)：理解 workflows、插件生态和组合实践
- [推荐资源](https://aisee.wiki/resources/)：查看精选项目、工具和方法论参考

## 项目关系

- OpenSpec 和 Compound Engineering 都是独立开源项目。
- [AISEE-LAB/aisee-plugin](https://github.com/AISEE-LAB/aisee-plugin) 是 AISEE 工作流相关的源码仓库之一；AISEE Wiki 负责文档化其用法、上下文和组合实践。
- AISEE Wiki 负责文档化它们的用法、关系和组合实践，不替代这些项目本身的官方仓库。
- 本仓库是文档站仓库，不是上游 SDK、CLI 或插件源码仓库。

## 仓库结构

- `site/`：公开站点源目录，包含 VuePress 配置、公开页面、英文入口和公开静态资源。
- `docs/`：项目资料与协作沉淀目录，包含需求文档、UI 内容规格、技术上下文、复盘和学习沉淀。

`docs/` 不作为 VuePress 发布源。协作产物转为公开站点页面前，必须经过人工审阅、改写，并清理私有本地路径、未整理草稿和敏感内容。

## 为什么需要 AISEE Wiki

当团队同时接触 OpenSpec、Compound Engineering、AISEE Plugin、skills、MCP 和 agent workflows 时，信息通常分散在多个仓库、README、对话和实践记录里。AISEE Wiki 把这些内容按“指南 / 方法论 / 工作流 / 推荐资源 / 团队项目”重新组织，降低理解和采用门槛。

## 本地开发

```sh
pnpm i
```

`docs:*` 命令名为兼容保留；当前实际站点源目录已经迁移为 `site/`。

```sh
# start dev server
pnpm docs:dev
# build for production
pnpm docs:build
# preview production build in local
pnpm docs:preview
# update vuepress and theme
pnpm vp-update
```

## 技术栈

- [VuePress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
- TypeScript
- Markdown

## 贡献

- 公开站点内容主要位于 `site/`
- 协作材料位于 `docs/`，但不会直接作为公开站点发布源

如果你要修改站点内容或结构，建议先检查相关页面、组件与项目文档，再进行本地预览或构建验证。

## 协议

[MIT](LICENSE)
