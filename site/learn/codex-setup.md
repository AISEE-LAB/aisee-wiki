---
title: Codex 安装、配置与第一次运行
permalink: /learn/codex-setup/
createTime: 2026/05/25 00:00:00
---

# Codex 安装、配置与第一次运行

Codex 的关键不是安装成功，而是理解它如何读取项目、执行命令、展示 diff，并在权限边界内工作。本文事实口径核对时间：2026-05-25；具体安装入口、账号、额度和平台支持以 OpenAI 官方文档为准。

<ClientOnly>
  <DiagramFigure
    src="https://images.ctfassets.net/kftzwdyauwt9/3G8qVyVJxJ8C8QD2wcSBgw/ef4163c22cbfffc69e71e7a881a76aa8/App.png?fm=webp&q=90&w=3840"
    title="Codex App 起始界面"
    caption="官方截图更适合用来理解入口形态：项目、线程和任务都围绕同一个工作区展开。"
  />
</ClientOnly>

## Codex 定位

Codex 是 AI Coding Agent。它可以读项目、修改文件、运行命令、协助调试，也能在桌面 App、CLI、IDE 或云端入口中承接任务。它不是普通聊天窗口：你给它的不是一个“问题”，而是一个需要在项目里执行并验证的任务。

OpenAI 官方介绍中，Codex App 被描述为面向多 Agent 并行和长期任务协作的命令中心；CLI 则是运行在终端里的本地 coding agent。OpenAI Help Center 对 Codex 的概括也很直接：它是一个帮助你 write, review, and ship code 的 AI agent。

## 使用前准备

| 准备项 | 为什么需要 |
|---|---|
| ChatGPT / OpenAI 账号 | 登录和使用 Codex 的基础 |
| Git | 查看修改、保护工作区、提交结果 |
| Node.js | Codex CLI 和前端项目常见依赖 |
| 可实验项目目录 | 第一次练权限、diff 和命令，不碰生产仓库 |

::: warning 第一次安全边界
不要第一次就在重要生产仓库中尝试。不要随便允许删除文件、重置 Git、全局安装依赖、上传密钥、访问生产服务或修改部署配置。
:::

## 官方入口

| 入口 | 适合谁 | 官方地址 / 安装方式 |
|---|---|---|
| 桌面 App | 想管理多个线程、项目和长任务的人 | [Codex 页面](https://openai.com/codex/)；官方当前说明 macOS 和 Windows 可用 |
| CLI | 习惯终端、想轻量进入项目的人 | `npm install -g @openai/codex` 或 `brew install codex`；参考 [npm 包页面](https://www.npmjs.com/package/%40openai/codex) |
| IDE Extension | 想在编辑器里直接委派任务的人 | 参考 [OpenAI Help Center](https://help.openai.com/en/articles/11369540/) 中的 Codex IDE extension 入口 |
| Codex Web | 想把任务委托到云端处理的人 | [chatgpt.com/codex](https://chatgpt.com/codex)；需要连接 ChatGPT 账号，部分场景还需要 GitHub 连接 |

```bash
npm install -g @openai/codex
codex
```

如果你不确定自己该用哪一种，第一次建议在 `桌面 App` 和 `CLI` 里二选一：

- 想看得更清楚：先用 App。
- 想直接贴着项目干活：先用 CLI。

不要第一次同时折腾多个入口。能稳定读项目、看 diff、跑安全任务，比装齐所有入口更重要。

## 界面重点

第一次打开 Codex，不急着让它写代码。先看懂下面四个对象：

1. `项目目录`：它决定 Codex 当前能读哪些文件、改哪些文件。
2. `线程`：每个任务是单独上下文，不是所有历史都混在一起。
3. `命令执行`：你要知道它跑了什么、为什么跑、输出是什么。
4. `diff`：这是你判断“改动范围是否可接受”的主入口。

<ClientOnly>
  <DiagramFigure
    src="https://images.ctfassets.net/kftzwdyauwt9/5a7uKTozmVeEuSwi3QdWAB/14acd3d814d1a3cf208eb3439d5a84e8/codexthread.png?fm=webp&q=90&w=3840"
    title="线程与工作区"
    caption="官方 Academy 示例里，左侧保留项目和历史，主区才是当前任务。把它当成“项目里的任务线程”，而不是普通聊天窗口。"
  />
</ClientOnly>

<ClientOnly>
  <DiagramFigure
    src="https://images.ctfassets.net/kftzwdyauwt9/5TedeTt4EoBLlDElPZUWF7/70b40b708719a7e32e7314ca4d49e676/5point5.png?fm=webp&q=90&w=3840"
    title="输入框、权限与本地工作模式"
    caption="第一次使用时，重点看默认权限和 Work locally 提示。不要急着切 Full permissions。"
  />
</ClientOnly>

## 第一次运行

第一次进入项目后，按这个顺序走会更稳：

1. 打开一个可实验项目，不要先碰生产仓库。
2. 让 Codex 只读项目结构，不要立即写文件。
3. 让它解释如何启动项目，不要先安装依赖。
4. 让它检查 README、`package.json`、配置文件是否一致。
5. 最后才允许它做单文件、小范围修改。

第一次运行你至少要确认五件事：

- 它是否在正确项目目录里。
- 它是否能读到 README、`package.json`、配置文件和源码目录。
- 它准备执行哪些命令。
- 它准备修改哪些文件。
- diff 是否小、清楚、符合你的目标。

<ClientOnly>
  <DiagramFigure
    src="https://images.ctfassets.net/kftzwdyauwt9/5aiLnrEq7KwGOenVhp1L3O/0e1b4056952d752671f6b94a467280f6/Termial.png?fm=webp&q=90&w=3840"
    title="CLI 入口的最小心智模型"
    caption="CLI 更贴近真实项目协作：目录、模型、提示词和输出都在同一条终端链路里。"
  />
</ClientOnly>

## 第一个安全任务组

可以直接使用这些任务练习：

```text
请阅读项目结构并总结技术栈，不要修改文件。
```

```text
请告诉我如何启动项目，不要执行安装命令。
```

```text
请检查 README 中的启动命令是否和 package.json 一致。如需修改，请先解释差异，不要直接改文件。
```

```text
请只修改一个文件，修复一个最小问题。修改前先列计划，修改后展示 diff，并告诉我如何验证。
```

这几类任务的顺序不要反过来。先只读、再解释、再校验、最后才做最小修改。这样你能先看懂 Codex 的读取、分析和说明能力，再逐步建立对写文件和跑命令的信任。

## 权限和安全边界

| 操作 | 初学阶段建议 |
|---|---|
| 删除文件、批量移动目录 | 先让 Codex 解释影响，再看 diff |
| `git reset`、强制推送 | 不授权，除非你完全知道后果 |
| 全局安装依赖 | 优先项目内依赖，避免污染系统 |
| 访问网络或上传内容 | 先确认是否包含密钥、私有代码或个人信息 |
| 修改配置、部署、CI | 让 Codex 给风险清单和回滚方案 |

如果你看不懂权限弹窗，默认做法应该是：先拒绝，然后让 Codex 用中文解释它打算执行什么、影响什么、为什么需要这个权限。第一次使用时，`拒绝不确定操作` 比 `快速通过任务` 更重要。

## 常见问题

| 问题 | 排查方向 |
|---|---|
| 找不到 `codex` 命令 | 检查 Node.js、npm 全局路径和安装是否成功 |
| 登录失败 | 以官方账号、地区、订阅和网络说明为准 |
| 项目依赖装不上 | 先让 Codex 解释依赖管理器、Node 版本和报错原因 |
| 权限弹窗看不懂 | 不确定就拒绝，要求 Codex 用中文解释会做什么 |
| AI 修改范围太大 | 中断任务，要求缩小到单文件或单模块，并先列计划 |

读完这篇后，你应该已经能做到三件事：

- 知道从 App、CLI、IDE、Web 里先选哪个入口。
- 知道第一次进入项目时该先看什么，而不是马上让 Codex 写代码。
- 知道如何用只读任务、小改动任务和 diff 审查来建立安全边界。
