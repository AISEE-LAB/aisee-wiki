# Proposal: enhance-plume-seo-indexing

## 背景与问题

- 当前问题：站点已有基础 `title`、`description` 和双语 locale，但 Plume 的 `hostname` 未启用，构建产物没有 `sitemap.xml`、`canonical`、Open Graph / Twitter / JSON-LD 等 SEO 元信息，也没有 `llms.txt`。
- 触发原因：维护者要求按 Plume 主题最佳实践补齐 SEO 优化，并优先使用主题内置能力。
- 关联基线：openspec/project-docs.md

## 目标

- 按 Plume 官方文档在 `.vuepress/config.ts` 中配置生产域名 `https://aisee.wiki`，启用主题内置 SEO 与 sitemap 能力。
- 启用 Plume 内置 `llmstxt`，为中英文文档生成 LLM 友好索引文件。
- 依赖 Plume SEO 插件生成 `robots.txt`，避免在 public 目录手写重复规则。
- 为核心栏目入口和重点页面补充 `description` frontmatter，使自动生成的 SEO 描述不只依赖站点默认描述。
- 保持配置符合 Plume 边界：`hostname`、`llmstxt` 等不支持 `plume.config.ts` 的字段只放在 `.vuepress/config.ts`。

## 不在范围

- 不创建或修改 Cloudflare Pages 项目、DNS、生产发布、GitHub Actions。
- 不写死未确认的 GitHub 仓库 URL、预览 URL 或编辑链接配置。
- 不引入第三方 SEO 插件替代 Plume 内置能力。
- 不批量重写所有正文。
- 不新增商业分享图或未经授权图片。

## 变更范围

| 类型 | 范围 | 说明 |
|---|---|---|
| 栏目 | 全站 | 影响所有可构建页面的 SEO、sitemap 和 LLM 索引输出。 |
| 页面 | 核心入口页与重点页面 | 补充页面级 `description`，优先覆盖首页、栏目首页和入口型页面。 |
| 导航/侧边栏 | N/A | 不改变导航和侧边栏。 |
| 路由/frontmatter | 多个 Markdown 页面 | 只补充 `description`，不改 permalink。 |
| 站点配置 | `site/.vuepress/config.ts` | 启用 `hostname`、`llmstxt`，由 Plume 生成 SEO、sitemap 和 robots。 |

## 成功标准

- [ ] `site/.vuepress/config.ts` 使用 `hostname: 'https://aisee.wiki'` 启用 Plume SEO/sitemap 能力。
- [ ] 生产构建产物包含 `sitemap.xml`、`llms.txt` 和 `llms-full.txt`。
- [ ] 构建后的页面 head 包含 Open Graph / Twitter 或 JSON-LD 等 Plume 自动 SEO 元信息。
- [ ] `robots.txt` 可在构建产物中访问，并由 Plume 生成 sitemap 声明。
- [ ] 重点页面具备页面级 `description`。
- [ ] 文档站构建通过。
- [ ] 归档前已处理 openspec/project-docs.md 回写。

## 约束与假设

- [ASSUMPTION] 生产域名已按项目技术上下文确认为 `aisee.wiki`，配置使用 HTTPS 规范域名 `https://aisee.wiki`。
- [ASSUMPTION] 当前任务聚焦 SEO/LLM 索引落地，不处理 GitHub 仓库 URL、预览分支策略或 Cloudflare Pages 操作。
- [DOC-GAP] 英文完整正文和项目仓库 URL 仍未完全确认，页面描述只覆盖当前已发布内容，不声明未完成能力。
- [SITE-CONFIG-IMPACT] 本 change 影响 VuePress/Plume 生产构建输出、搜索引擎抓取入口和 LLM 友好索引。
