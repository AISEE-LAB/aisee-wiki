# Doc Change: enhance-plume-seo-indexing

## Baseline Reference

- 文档基线：openspec/project-docs.md
- 基线文件状态：已存在
- 涉及栏目：全站、指南、AI Engineering、AISEE、OpenSpec、Compound Engineering、开源项目、推荐资源
- 涉及页面：首页、英文首页、各栏目首页、重点入口页
- 涉及导航/侧边栏：否
- 涉及站点配置：是

## Current Gap

> 只摘录和本次 change 直接相关的现状，不复制全站 inventory。

| 对象 | 当前状态 | 问题/缺口 |
|---|---|---|
| `site/.vuepress/config.ts` | 已配置 `title`、`description`、locale、本地搜索；`hostname` 与 `llmstxt` 仍为注释示例。 | Plume 的 SEO、sitemap 和 LLMs.txt 能力未启用。 |
| 构建产物 | 页面有 `<title>` 与 `<meta name="description">`。 | 未生成 `sitemap.xml`、`robots.txt`、`llms.txt`、`llms-full.txt`；页面 head 缺少 canonical、OGP、Twitter Card 或 JSON-LD 等增强元信息。 |
| 页面 frontmatter | 多数页面只有 `title`，部分有 `permalink`、`createTime`。 | 重点页面缺少页面级 `description`，SEO 摘要容易回落到站点默认描述。 |
| 生产域名 | `docs/tech-context/2026-05-22-ai-see-wiki-phase-one.md` 确认生产域名 `aisee.wiki`。 | 尚未写入 Plume `hostname`。 |

## Planned Changes

| 类型 | 页面/对象 | 路径 | 说明 |
|---|---|---|---|
| 修改 | Plume 主题配置 | `site/.vuepress/config.ts` | 在 `plumeTheme` 中配置 `hostname: 'https://aisee.wiki'`，启用 Plume 内置 SEO 与 sitemap 生成；启用 `llmstxt: { locale: 'all' }`。 |
| 生成 | Robots 文件 | `site/.vuepress/dist/robots.txt` | 由 Plume SEO 插件在生产构建中生成，并追加 sitemap 地址；不在 public 目录手写重复规则。 |
| 修改 | 首页与栏目入口 frontmatter | `site/README.md`、`site/en/README.md`、`site/learn/README.md`、`site/ai-engineering/README.md`、`site/aisee/README.md`、`site/openspec/README.md`、`site/compound/README.md`、`site/projects/README.md`、`site/resources/README.md` 等 | 补充页面级 `description`，匹配当前页面实际内容。 |
| 修改 | 英文入口 frontmatter | `site/en/learn/README.md`、`site/en/ai-engineering/README.md`、`site/en/aisee/README.md`、`site/en/openspec/README.md`、`site/en/compound/README.md`、`site/en/projects/README.md`、`site/en/resources/README.md` | 补充英文页面级 `description`，避免沿用中文站点默认描述。 |
| 修改 | 文档基线 | `openspec/project-docs.md` | 记录当前 SEO、sitemap、robots 和 LLMs.txt 基线状态。 |

## Content Notes

| 页面 | 目标读者 | 核心内容 | 必须包含 | 不包含 |
|---|---|---|---|---|
| 首页和栏目入口 | 搜索引擎、分享卡片、LLM 索引和首次访问读者 | 用简短描述说明页面主题和读者价值 | `description` 与页面正文一致，中英文入口分别使用对应语言 | 不夸大未完成内容，不写价格、安装入口等易变信息 |
| `robots.txt` | 搜索引擎爬虫 | 提供抓取规则和 sitemap 地址 | 由 Plume 插件生成，并包含 `Sitemap: https://aisee.wiki/sitemap.xml` | 不在 public 目录维护重复 robots 规则 |

## Site Impact

- 导航：不变。
- 侧边栏：不变。
- 路由：不变；新增构建产物 `/robots.txt`、`/sitemap.xml`、`/llms.txt`、`/llms-full.txt`。
- frontmatter：重点页面新增 `description`。
- 标签/分类：不变。
- 搜索影响：页面描述更准确；本地搜索配置不变。
- 多语言影响：`llmstxt` 生成范围覆盖中英文；英文入口补英文描述。
- 构建/部署影响：生产构建会额外生成 sitemap、LLM 友好 Markdown 文件和增强 SEO meta；`hostname` 使用 `https://aisee.wiki`。

## Validation

- [ ] 页面路径可访问。
- [ ] 导航/侧边栏入口正确。
- [ ] 内链有效。
- [ ] 代码块、命令或示例已检查。
- [ ] 文档站构建或预览检查通过。
- [ ] 需要时已截图或人工预览。
- [ ] 检查构建产物包含 `sitemap.xml`、`robots.txt`、`llms.txt`、`llms-full.txt`。
- [ ] 抽查首页和一篇正文页面 head 中的 SEO 元信息。

## Archive Updates

归档前必须回写 `openspec/project-docs.md`，或在下方写明无需回写的原因。

- [x] 页面清单已更新或确认无需更新。
- [x] 栏目结构已更新或确认无需更新。
- [x] 内容状态已更新。
- [x] 后续缺口已更新。
- [x] 术语/写作约定已更新或确认无需更新。

无需回写的原因：

- N/A。本 change 改变长期站点构建和 SEO/LLM 索引基线，需要回写。
