# Tasks: build-openspec-column-content

## 生成前一致性检查

- [x] proposal.md 的范围已覆盖 doc-change.md 的 Planned Changes。
- [x] doc-change.md 只记录本次相关差异，没有复制全站 inventory。
- [x] 涉及导航、侧边栏、路由或配置的影响已在 Site Impact 中写明。
- [x] Archive Updates 已说明归档前如何处理 openspec/project-docs.md。

## 1. 内容准备

- [x] 1.1 核对 OpenSpec 官方事实源，至少覆盖官网/README、getting started、concepts、conventions 或等价官方文档。
- [x] 1.2 核对项目内 OpenSpec 实践材料，至少读取 `openspec/project.md`、当前 change artifacts、已归档 change 示例和 `openspec/project-docs.md`。
- [x] 1.3 整理本 change 的公开术语口径，覆盖 OpenSpec、specs、changes、proposal、delta spec、design、tasks、archive、schema、artifact。
- [x] 1.4 确认“不把 SRS 到 OpenSpec Change 链路作为 OpenSpec 栏目主线”的边界，并在栏目首页或边界页中说明该主题后续归属 `/aisee/` 或 `/workflows/`。

## 2. 中文页面写作

- [x] 2.1 重写 `site/openspec/README.md`，提供 OpenSpec 定位、能力地图、五层阅读结构、推荐阅读顺序和跨栏目边界。
- [x] 2.2 新增 `site/openspec/what-is-openspec.md`，说明 OpenSpec 的作用、规范层价值、AI 协作风险和适用动机。
- [x] 2.3 新增 `site/openspec/mental-model.md`，说明 `openspec/specs/`、`openspec/changes/`、artifacts 与 archive 的心智模型，并使用 Mermaid、流程讲解组件或等价结构化表达。
- [x] 2.4 新增 `site/openspec/workflow.md`，说明从 propose 到 archive 的基础工作流、阶段输入输出、验证节点和归档含义。
- [x] 2.5 新增 `site/openspec/artifact-guide.md`，说明 proposal、spec、design、tasks 的职责、写法、常见误区和审查清单。
- [x] 2.6 新增 `site/openspec/spec-granularity.md`，说明项目级、模块级、能力级 spec 的划分原则、过粗/过细风险和并行 change 影响。
- [ ] 2.7 新增 `site/openspec/delta-spec.md`，说明 delta spec 的作用、变更语义、与当前 spec 的关系和 archive 后的事实源更新。
- [ ] 2.8 新增 `site/openspec/schema.md`，说明 OpenSpec schema 的扩展作用、artifact DAG、模板、门禁，并引用 AI SEE Wiki 的 `aisee-docsite-driven` 示例。
- [ ] 2.9 新增 `site/openspec/boundaries.md`，说明 OpenSpec 适合和不适合的场景，以及与 aisee、Compound、workflows 的边界。
- [ ] 2.10 检查每篇中文页面至少包含明确问题、核心结论、工作机制、常见误区或适用边界、下一步阅读。

## 3. 站点结构与配置

- [ ] 3.1 更新 `site/.vuepress/collections/openspec.ts`，将中文 sidebar 改为“栏目首页 / 作用 / 模型 / 用法 / 扩展 / 边界”分组。
- [ ] 3.2 保持中文页面为平铺路由 `/openspec/<slug>/`，不创建多级目录。
- [ ] 3.3 确认新增和修改页面 frontmatter 均包含 `title`、`permalink`、`createTime`，且 permalink 与侧边栏条目一致。
- [ ] 3.4 更新 `site/en/openspec/README.md`，说明英文正文待后续完成，并链接中文 OpenSpec 栏目和英文稳定入口。
- [ ] 3.5 更新 `site/resources/reading-path.md`，将 OpenSpec 入口指向栏目首页和关键首篇文章。
- [ ] 3.6 如实现中新增图示、组件调用或图片资源，确认资源位于 `site/.vuepress/public/` 或当前站点可发布路径，不引用维护者本地绝对路径。

## 4. 链接与内容质量检查

- [ ] 4.1 检查 `/learn/`、`/resources/reading-path/`、`/workflows/` 中指向 OpenSpec 的链接仍有效，并按需升级为具体页面链接。
- [ ] 4.2 检查 OpenSpec 页面之间的内链，确保不存在指向未创建页面的死链。
- [ ] 4.3 检查正文中的命令、路径和代码块，确保与当前项目结构或官方文档一致。
- [ ] 4.4 检查公开正文不暴露维护者本地绝对路径、未整理私有资料、密钥、token 或账号信息。
- [ ] 4.5 检查术语一致性，避免混淆 OpenSpec 自身能力、aisee 上游链路、Compound/Agent 执行增强和 workflows 端到端流程。

## 5. 验证

- [ ] 5.1 运行 `pnpm docs:build` 或项目确认的等效文档站构建检查。
- [ ] 5.2 如构建失败，修复 Markdown、frontmatter、组件调用、内链或 collection 配置问题后重新验证。
- [ ] 5.3 必要时运行本地预览，人工检查 OpenSpec 侧边栏分组、页面标题、目录和关键图示显示。
- [ ] 5.4 在本文件或最终交付说明中记录实际执行的验证命令和结果。

## 6. Archive Gate

- [ ] 6.1 完成 doc-change.md 中的 Archive Updates。
- [ ] 6.2 更新 `openspec/project-docs.md`，记录 OpenSpec 栏目结构、页面清单、阅读路径、内容状态、后续缺口和术语/写作约定。
- [ ] 6.3 确认验证结果已记录。
- [ ] 6.4 确认本 change 可归档。
