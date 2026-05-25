# Tasks: build-ai-coding-learning-path

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容变更

- [ ] 1.1 改写 `site/learn/README.md`，形成 AI Coding 入门路径首页，包含读者定位、两段式路径、5 篇文章入口和进阶阅读入口。
- [ ] 1.2 新增 `site/learn/ai-coding-intro.md`，说明 AI Coding 从补全、生成到 Agent 的发展、工程师角色变化、AI 擅长/不擅长边界和最小实操任务。
- [ ] 1.3 新增 `site/learn/tools-and-models.md`，说明工具形态、模型能力维度，以及 Codex、Claude、Gemini、GLM 的定位、便捷度、适用场景和选择矩阵。
- [ ] 1.4 新增 `site/learn/dev-environment.md`，说明 Git、Node.js、Python、终端、编辑器、浏览器等基础运行环境及验证清单。
- [ ] 1.5 新增 `site/learn/codex-setup.md`，说明 Codex 安装入口、配置、第一次打开项目、命令执行、diff、权限边界和常见问题。
- [ ] 1.6 新增 `site/learn/first-ai-coding-project.md`，以“复刻一个网站首页”为第一个 AI Coding 项目，覆盖选参考、拆模块、分步实现、预览修复、移动端检查和 Git 提交标准。
- [ ] 1.7 每篇文章末尾添加下一步阅读，优先指向已存在页面或本 change 新增页面，未完成进阶正文只链接栏目首页。
- [ ] 1.8 公开正文不得暴露本地 Obsidian 绝对路径；参考资料只作为内部事实源使用。
- [ ] 1.9 按 `doc-change.md` 的 Article Blueprints 写作每篇正文，尤其确保 `codex-setup` 覆盖“Codex 是什么、使用前准备、安装方式、第一次打开项目、第一个安全任务、权限和安全边界、常见问题”。
- [ ] 1.10 每篇文章至少加入一种配图、流程图、路线卡片、对比矩阵、步骤组件、检查清单、logo 卡片或自定义组件，避免纯文字长文。

## 2. 站点结构与配置

- [ ] 2.1 更新 `site/.vuepress/collections/learn.ts`，将新增中文文章加入 sidebar，并保持 `README.md` 为栏目首页。
- [ ] 2.2 为新增页面设置稳定 frontmatter，包括 `title`、`permalink`、`createTime`，并沿用当前站点风格。
- [ ] 2.3 评估 Plume 已有组件能力，优先使用提示块、代码组、卡片、步骤、表格或内置 Markdown 扩展组织文章。
- [ ] 2.4 如 Plume 内置能力不足，新增轻量 Vue 组件用于工具 logo 网格、模型/工具选择矩阵或路线卡片，并避免装饰性过度设计。
- [ ] 2.5 按 LobeHub Icons 说明使用 `@lobehub/icons` 获取 Codex/OpenAI、Claude/Anthropic、Gemini/Google、GLM/Zhipu 等 logo；VuePress 中优先采用静态 SVG/CDN URL 或构建时生成 URL，不直接渲染 React 组件。
- [ ] 2.6 如新增 `@lobehub/icons` 依赖、图标生成脚本或自定义组件，更新对应依赖、锁文件和组件注册，并确认构建可运行。
- [ ] 2.7 检查 `site/en/learn/README.md` 是否需要补充无死链的英文占位说明；不要求完整英文正文。
- [ ] 2.8 如使用配图或自制示意图，将资源放在站点公开资源目录并使用稳定相对路径；不得引用未授权商业截图或本地绝对路径。
- [ ] 2.9 对核心交互式流程/节点体验优先使用 Vue Flow，例如学习路线、Codex 第一次使用流程、AI Coding 项目循环或复杂关系图。
- [ ] 2.10 对动效和微交互优先参考 Vue Bits 的风格和节奏，用于节点高亮、步骤切换、卡片进入、状态反馈等帮助理解的场景。
- [ ] 2.11 对无需交互的静态技术图使用 `fireworks-tech-graph` 作为补充或兜底，用于阶段演进、工具矩阵、环境结构或项目拆解 SVG/PNG。

## 3. 事实源与引用核对

- [ ] 3.1 使用本地参考目录中的课程大纲、环境安装、工具安装、Level 1 静态项目材料作为内容草稿事实源。
- [ ] 3.2 实施 `tools-and-models` 与 `codex-setup` 前，核对 Codex、Claude Code、Gemini、GLM/Zhipu 的官方文档或官方说明。
- [ ] 3.3 对安装命令、平台支持、账号要求、模型能力、价格/额度等易变内容，正文必须标注更新时间或使用“以官方文档为准”的口径。
- [ ] 3.4 检查所有外部链接是否必要、可访问，并避免把非官方社区方案写成官方能力。

## 4. 验证

- [ ] 4.1 检查 `/learn/` 和 5 个新增中文页面路径可访问。
- [ ] 4.2 检查学习路径侧边栏顺序、栏目首页入口和文章间内链。
- [ ] 4.3 检查代码块、终端命令、提示词示例和 Git 操作说明，避免危险命令或未解释的破坏性操作。
- [ ] 4.4 检查工具/模型 logo 在亮色和暗色主题下可读；如无法截图，至少人工预览说明检查结果。
- [ ] 4.5 运行 `pnpm docs:build` 或项目确认的等效构建检查。
- [ ] 4.6 如新增自定义组件，进行本地预览或截图检查，确认布局在桌面和移动端不溢出、不遮挡。
- [ ] 4.7 检查 6 个学习路径页面均包含配图、图示或组件化信息块，阅读体验不是纯文字堆叠。
- [ ] 4.8 如使用 Vue Flow、Vue Bits 风格动画组件或 `fireworks-tech-graph` 生成图，检查桌面和移动端渲染、交互可用性、亮暗主题、构建结果和资源路径。

## 5. Archive Gate

- [ ] 5.1 完成 doc-change.md 中的 Archive Updates。
- [ ] 5.2 更新 `openspec/project-docs.md`，记录学习路径栏目状态、页面清单、阅读路径、内容缺口和写作约定。
- [ ] 5.3 确认验证结果已记录。
- [ ] 5.4 确认本 change 可归档。
