## Context

本 change 的动机来自 `openspec/changes/migrate-site-source-boundary/proposal.md`：当前 VuePress 站点源码仍位于 `docs/`，但项目已确认 `docs/` 应作为 aisee 协作产物目录，目标公开站点发布源为 `site/`。这一边界同时影响后续首页、信息架构、中文/英文内容、skills 文档和部署质量工作，因此需要先完成源目录迁移和职责说明。

技术栈来源：

- `openspec/project.md`：项目为 VuePress `2.0.0-rc.30` + `vuepress-theme-plume` `1.0.0-rc.201` 静态文档站，目标发布源为 `site/`，协作产物目录为 `docs/`。
- `docs/tech-context/2026-05-22-ai-see-wiki-phase-one.md`：目录迁移是共享技术前置；当前脚本仍指向 `docs`；`package-lock.json` 已确认保留。
- `package.json`：`docs:dev`、`docs:build`、`docs:dev-clean` 当前使用 `vuepress ... docs`，`docs:preview` 当前预览 `docs/.vuepress/dist`。
- `docs/.vuepress/config.ts`、`plume.config.ts`、`navbar.ts`、`collections.ts`：现有 VuePress/Plume 配置、双语 locale、本地搜索、示例导航和示例 collection 均在 `docs/.vuepress/` 下。
- VuePress 官方文档：CLI 使用 `vuepress dev [targetDir]` 和 `vuepress build [targetDir]` 指定源目录。
- Plume 官方文档：文档源目录包含 `.vuepress/` 配置、`README.md` 主页和内容目录；VuePress 一般只接管 CLI 指定的源目录。

现有页面承载：

- 中文根页：`docs/README.md`
- 英文根页：`docs/en/README.md`
- 示例页面：`docs/demo/*`、`docs/en/demo/*`、`docs/blog/preview/*`
- 协作产物：`docs/requirements/`、`docs/tech-context/`、`docs/split/`、`docs/ui-content/`、`docs/reflect/`、`docs/learnings/`

本 change 不引入后端、数据库、API、鉴权、队列、异步任务或外部运行时服务。

## Goals / Non-Goals

**Goals:**

- 将 VuePress/Plume 站点源码边界从 `docs/` 迁移到 `site/`，包括 `.vuepress/` 配置、现有公开页面、英文 locale 入口和公开静态资源。
- 更新站点脚本，使开发、构建、清缓存开发和本地预览命令指向 `site/` 及其构建产物。
- 保留 `docs/` 作为协作产物目录，并确保它不再被 VuePress CLI 作为发布源接管。
- 在仓库说明中明确 `site/` / `docs/` 的职责边界、公开发布范围、协作产物进入公开站点前的整理和脱敏要求。
- 保持迁移后站点基础行为等价：现有页面能在新源目录下被 VuePress 识别，中文 `/` 与英文 `/en/` 入口仍存在。
- 为后续 specs 提供可观察行为边界：源目录、脚本、预览产物、协作目录隔离、文档说明和安全检查。

**Non-Goals:**

- 不重设计首页，不实现用户后续要求的自定义首页。
- 不替换正式信息架构、导航、collections 或示例内容；示例导航清理属于后续 `configure-site-information-architecture`。
- 不生产中文/英文 P0/P1 正文。
- 不创建、发布或迁移 aisee skills 独立仓库。
- 不创建 Cloudflare Pages 项目，不配置生产部署、GitHub Actions、SEO、sitemap 或 LLMs.txt。
- 不调整包管理策略，不删除 `package-lock.json`。
- 不引入测试、lint、formatter、数据库、API 或后端服务。

## Decisions

### 1. 采用 `site/` 作为唯一 VuePress targetDir

设计：迁移后所有 VuePress CLI 命令以 `site` 作为 targetDir，例如开发和构建命令应从当前 `vuepress ... docs` 改为指向 `site`。预览命令应指向 `site/.vuepress/dist`。

理由：VuePress 官方 CLI 通过 `[targetDir]` 指定文档源目录；Plume 项目结构也把 `.vuepress/` 和 Markdown 内容放在文档源目录下。使用 `site/` 作为唯一 targetDir 能让 `docs/` 从发布链路中退出，符合 FR-001 和 FR-004 的已确认边界。

备选方案：

- 继续使用 `docs/` 作为发布源并把协作产物迁走：不采用。用户已确认“按规划迁移到 `site/` 并把协作产物保留在独立 `docs/`”。
- 使用额外构建配置过滤 `docs/` 中的协作产物：不采用。过滤规则容易漂移，且不如物理目录边界清晰。

### 2. 迁移站点源码，保留协作产物原位

设计：将当前公开站点源码从 `docs/` 移入 `site/`，至少包括 `.vuepress/`、`README.md`、`en/README.md` 和当前可构建的示例公开页面。`docs/requirements/`、`docs/ui-content/`、`docs/tech-context/`、`docs/split/`、`docs/reflect/`、`docs/learnings/` 保留在 `docs/`。

理由：本 change 的核心是目录职责分离，而不是内容重写。保留协作产物原位可以维持 aisee 工作流输入路径，迁移公开站点源码可以解除 VuePress 对 `docs/` 的接管。

备选方案：

- 只复制源码到 `site/`，不删除 `docs/` 下旧站点源码：不采用作为最终状态。短期复制可辅助迁移，但最终不能留下两个可被误用的站点源目录。
- 同时清理 demo/blog 示例：不纳入本 change。示例正式替换与 IA 强相关，应由后续 change 处理；本 change 只保证迁移后仍可构建。

### 3. 保持现有脚本名，改变脚本指向

设计：保留 `docs:dev`、`docs:build`、`docs:dev-clean`、`docs:preview` 这些用户已知命令名，只更新内部路径到 `site`。README 或贡献说明应明确虽然命令名仍含 `docs`，但源目录已迁移为 `site/`；是否后续新增 `site:*` 别名留给开源质量配套 change。

理由：保留命令名可降低迁移影响，避免本 change 同时改动使用习惯和目录结构。脚本内部路径变化是本 change 必须完成的行为。

备选方案：

- 立即改名为 `site:dev`、`site:build`：不采用。会扩大破坏面，并需要同步更多文档和习惯；可在后续贡献体验优化中评估。

### 4. 公开边界通过目录和文档约束表达，不引入运行时权限

设计：`docs/` 中的协作产物不通过 VuePress targetDir 发布；README 或贡献说明说明协作产物进入公开站点前必须整理、脱敏、改写，不得暴露本地 Obsidian 绝对路径或私有资料。

理由：项目是公开静态文档站，没有应用登录、鉴权、数据库或后端权限系统。目录隔离和发布说明是与当前技术栈匹配的最小方案。

备选方案：

- 引入站点内权限或加密能力保护协作产物：不采用。协作产物不应进入公开站点源目录，运行时保护会让错误边界更复杂。

### 5. 迁移计划和回滚策略

迁移计划：

1. 记录当前 `docs/` 中哪些文件属于公开站点源码，哪些属于协作产物。
2. 创建 `site/`，移动公开站点源码和 `.vuepress/` 配置到 `site/`。
3. 更新 `package.json` 脚本中的 VuePress targetDir 和预览 dist 路径。
4. 更新 README 或贡献说明，写明目录职责边界和公开前整理要求。
5. 运行最小验证：检查 `site/.vuepress/config.ts` 存在，脚本不再指向 `vuepress ... docs`，`docs/` 协作产物仍存在；如用户允许，再运行 `pnpm docs:build`。

回滚策略：

- 若构建或路由在迁移后异常，可在同一 change 内将公开站点源码移回 `docs/` 并恢复脚本路径；协作产物目录不应被删除。
- 回滚不应删除 `docs/requirements/`、`docs/tech-context/`、`docs/split/`、`docs/ui-content/`、`docs/reflect/`、`docs/learnings/`。

### 6. 后续 specs 应覆盖的行为

后续 `site-source-boundary` spec 应至少覆盖：

- `site/` 是唯一 VuePress 发布源。
- `docs/` 是协作产物目录，不作为 VuePress targetDir。
- 开发、构建、清缓存开发和预览脚本指向迁移后的路径。
- 中文 `/` 和英文 `/en/` 基础入口迁移后仍存在。
- 仓库说明明确公开内容与协作产物边界。
- 保留 `package-lock.json`，不把 lockfile 删除作为验收条件。

## Risks / Trade-offs

- [RISK] 迁移后仍有脚本、README、部署说明或配置注释指向旧 `docs` 发布源。→ 缓解：tasks 中加入 `rg "vuepress .*docs|docs/.vuepress/dist|docsDir: 'docs'|docsDir: \"docs\""` 类检查，并人工确认语境；文档中允许描述历史状态，但不能把 `docs/` 写成当前发布源。
- [RISK] `.vuepress/.cache` 或 `.vuepress/.temp` 等生成物被误迁移、误提交或影响构建。→ 缓解：迁移时区分源码与生成物；生成物不作为设计要求，是否补 `.gitignore` 由实现阶段按当前仓库状态处理。
- [RISK] 当前导航和 collections 仍包含 demo/blog 示例，迁移后仍会存在示例页面。→ 缓解：本 change 明确不清理 IA；后续 `configure-site-information-architecture` 负责替换正式导航。当前只要求迁移后可构建、边界清晰。
- [RISK] 保留 `docs:*` 脚本名可能让贡献者误以为源目录仍是 `docs/`。→ 缓解：README 或贡献说明必须说明命令名兼容保留，实际发布源为 `site/`。
- [RISK] 未运行构建时无法证明所有路径完全可用。→ 缓解：本 change 的最小验证至少做路径和脚本静态检查；如果执行环境允许，运行 `pnpm docs:build` 作为最终验证。

Open Questions:

- 是否要在本 change 同时新增 `site:dev` / `site:build` 脚本别名？当前设计不新增，仅保留既有 `docs:*` 命令名。
- README 与贡献说明是否拆分为两个文件？当前设计允许更新 README 或贡献说明，只要求目录边界对贡献者可见。
