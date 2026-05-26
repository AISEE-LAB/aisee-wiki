---
title: 给 AI 准备运行环境
permalink: /learn/runtime-setup/
createTime: 2026/05/25 00:00:00
---

# 给 AI 准备运行环境

AI 编程工具不是孤立聊天框。只有本地环境能读仓库、装依赖、跑项目、执行验证，Agent 才能看到错误并继续修复。你准备的不是一台“能装 AI 工具的电脑”，而是一套能让 Agent 形成闭环的最小工作环境。

<RuntimeSetupBoard />

## 环境作用

没有运行环境时，AI 最多只能给你建议和代码草稿；有了运行环境，它才能进入项目目录、读工作区状态、执行命令、看到报错，再把结果回到下一轮上下文。也就是说，环境决定的不是“能不能聊天”，而是“能不能协作”。

对新手来说，第一次不需要准备很复杂的机器。你只需要确认三件事：

- 它能进项目目录并看懂当前仓库。
- 它能执行最小命令并拿到真实输出。
- 它能让你看到代码变化和页面结果。

## 基础清单

| 环境 | 作用 | 第一次只要确认什么 |
|---|---|---|
| Git | 管理修改、查看 diff、提交成果 | `git --version`、`git status` 可用 |
| Node.js | 前端项目、CLI 工具、Vue/React/VuePress 等 | `node -v`、`npm -v` 有输出 |
| Python | 脚本、数据处理、AI SDK、后端项目 | `python --version` 可运行 |
| 终端 | 让 Agent 执行命令并读取输出 | 能进入项目目录并运行最小命令 |
| 编辑器 | 人工审查代码、补充修改 | 能打开项目文件并查看改动 |
| 浏览器 | 预览页面、验证交互和移动端 | 能打开本地预览地址 |

## 官方入口

以下链接口径核对时间为 2026-05-26。第一次准备环境时，优先使用官方入口，不要先找第三方整合包。

| 对象 | 官方入口 | 适合第一次怎么装 |
|---|---|---|
| Git | [git-scm.com](https://git-scm.com/downloads) | Windows 直接下载官方安装包；macOS 可先用 Xcode Command Line Tools；Linux 用发行版包管理器 |
| Node.js | [nodejs.org/download](https://nodejs.org/en/download/) | 直接装 LTS 版本，不必第一次就折腾多版本管理 |
| Python | [python.org/downloads](https://www.python.org/downloads/) | Windows 用官方安装器或 Microsoft Store；macOS 用 Python.org 安装包；Linux 多数发行版已自带或可直接装包 |
| VS Code | [code.visualstudio.com](https://code.visualstudio.com/) | 先装一个稳定编辑器即可，后面再决定要不要换 Cursor 或 JetBrains |
| 浏览器 | [Google Chrome](https://support.google.com/chrome/answer/95346) / [Firefox](https://www.firefox.com/) | 二选一即可，目标是能打开本地预览地址并做基本检查 |

::: warning 第一次不要在生产仓库尝试
请准备一个可实验项目。第一次练习时不要授权删除、重置、全局安装、上传密钥或修改生产配置。
:::

## Git 基础

```bash
git status
git diff
git log --oneline -5
```

`git status` 告诉你工作区有没有修改；`git diff` 用来看 AI 改了什么；`git log` 用来确认当前分支历史。这三条命令不是给 Git 入门考试用的，而是 AI Coding 的最低审查能力。

如果你自己都不会看这三样，后面就很难判断 Agent 改动是否超范围。初学阶段不要把 `reset --hard`、强推送、批量删除交给 AI 自动执行。

## 安装路径

如果你只想尽快开始，不想先研究太多环境工具，可以按下面走：

| 系统 | Git | Node.js | Python | 编辑器 / 浏览器 |
|---|---|---|---|---|
| Windows | 用 [Git for Windows](https://git-scm.com/downloads/win) 安装器 | 从 [Node.js 下载页](https://nodejs.org/en/download/) 装 LTS | 从 [Python.org](https://www.python.org/downloads/) 或 Microsoft Store 安装 | VS Code + Chrome / Firefox |
| macOS | 先执行 `xcode-select --install`，需要更新版本再看 Git 官方页 | 从 Node.js 官方下载页装 LTS | 从 Python.org 安装官方 macOS 包 | VS Code + Chrome / Firefox |
| Linux | 用发行版包管理器装，例如 `apt` 或 `dnf` | 从 Node.js 官方下载页选对应发行版入口 | 多数发行版已预装；缺失时优先用发行版包管理器 | VS Code `.deb` / `.rpm` 包或你现有编辑器 + Chrome / Firefox |

这一步的目标不是把机器整理到完美，而是让下面这些命令都能正常工作。

## 依赖策略

前端入门先装 Node.js LTS 即可。Python 入门只需要能运行 `python --version`，需要项目隔离时再学习虚拟环境。不要一开始就让 AI 安装一大批 AI 包；依赖越多，排错成本越高。

第一次练习时，环境策略应该是：

- `Node.js`：先保证能跑当前项目，不急着折腾多个版本管理器。
- `Python`：先保证系统里有可运行版本，不急着装 AI SDK 全家桶。
- `CLI 工具`：先装你当前要练的那一个，不要同时铺开一整套工具链。

## 首次自检

你可以按下面的顺序快速自检一遍，不需要超过五分钟：

```bash
git --version
git status
node -v
npm -v
python --version
```

然后再做两个动作：

1. 用终端进入一个项目目录。
2. 用浏览器打开这个项目的本地预览地址，确认自己能看到页面或服务结果。

如果前面的命令都能跑，目录能进，浏览器能看，本地环境就已经足够支撑你开始第一轮 AI Coding 练习。

## 常见误区

第一次准备环境时，很多人会被这些问题带偏：

- “我是不是必须先装所有 AI SDK？”
- “我要不要先把 Python、Node、pnpm、bun、docker 全配齐？”
- “我是不是必须先准备一套完美开发机？”

答案都是否。你需要的不是一套完美环境，而是一套能支撑当前任务闭环的环境。只要能读仓库、跑最小命令、看结果，就可以开始。

## 验证清单

- [ ] 终端能进入一个英文路径项目目录。
- [ ] `git --version` 能显示版本。
- [ ] `node -v` 和 `npm -v` 能显示版本。
- [ ] `python --version` 能显示版本。
- [ ] 能打开编辑器并看到项目文件。
- [ ] 能打开浏览器访问本地预览地址。

读完这一篇，你的目标不是“环境知识学完了”，而是确认下一篇里的 Codex 已经有条件进入项目、解释启动方式、读取文件和执行安全任务。
