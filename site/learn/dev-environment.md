---
title: 给 AI 准备运行环境
permalink: /learn/dev-environment/
createTime: 2026/05/25 00:00:00
---

# 给 AI 准备运行环境

AI 编程工具不是孤立聊天框。只有本地环境能读仓库、装依赖、跑项目、执行验证，Agent 才能看到错误并继续修复。

<ClientOnly>
  <LearningFlow variant="environment" />
</ClientOnly>

## 最小环境清单

| 环境 | 作用 | 验证命令 |
|---|---|---|
| Git | 管理修改、查看 diff、提交成果 | `git --version` |
| Node.js | 前端项目、CLI 工具、Vue/React/VuePress 等 | `node -v`、`npm -v` |
| Python | 脚本、数据处理、AI SDK、后端项目 | `python --version` |
| 终端 | 让 Agent 执行命令并读取输出 | 能进入项目目录并运行命令 |
| 编辑器 | 人工审查代码、补充修改 | VS Code、JetBrains、Cursor 等 |
| 浏览器 | 预览页面、验证交互和移动端 | 能打开本地预览地址 |

::: warning 第一次不要在生产仓库尝试
请准备一个可实验项目。第一次练习时不要授权删除、重置、全局安装、上传密钥或修改生产配置。
:::

## Git 要先学会三件事

```bash
git status
git diff
git log --oneline -5
```

`git status` 告诉你工作区有没有修改；`git diff` 用来看 AI 改了什么；`git log` 用来确认当前分支历史。初学阶段不要把 `reset --hard`、强推送、批量删除交给 AI 自动执行。

## Node.js 和 Python 不要过度安装

前端入门先装 Node.js LTS 即可。Python 入门只需要能运行 `python --version`，需要项目隔离时再学习虚拟环境。不要一开始就让 AI 安装一大批 AI 包；依赖越多，排错成本越高。

## 验证清单

- [ ] 终端能进入一个英文路径项目目录。
- [ ] `git --version` 能显示版本。
- [ ] `node -v` 和 `npm -v` 能显示版本。
- [ ] `python --version` 能显示版本。
- [ ] 能打开编辑器并看到项目文件。
- [ ] 能打开浏览器访问本地预览地址。

下一篇：[Codex 安装、配置与第一次运行](/learn/codex-setup/)
