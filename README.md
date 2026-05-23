# AI SEE Wiki

AI SEE Wiki 是一个聚焦 OpenSpec、Compound Engineering 与 aisee skill 生态的 AI Engineering 开源文档站。

站点使用 [VuePress](https://vuepress.vuejs.org/) 和 [vuepress-theme-plume](https://theme-plume.vuejs.press/) 构建。

## 目录边界

- `site/`：公开站点源目录，包含 VuePress 配置、公开页面、英文入口和公开静态资源。
- `docs/`：aisee 协作产物目录，包含需求文档、UI 内容规格、技术上下文、change 拆分产物、复盘和学习沉淀。
- `openspec/`：OpenSpec 规范与 change 事实源。

`docs/` 不作为 VuePress 发布源。协作产物转为公开站点页面前，必须经过人工审阅、改写，并清理私有本地路径、未整理草稿和敏感内容。

## Install

```sh
pnpm i
```

## Usage

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

## Documents

- [vuepress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
