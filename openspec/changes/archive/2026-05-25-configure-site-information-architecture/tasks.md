## 1. 栏目映射与页面结构

- [x] 1.1 定义或记录栏目 slug、中文显示名、英文显示名和栏目角色的统一映射
- [x] 1.2 创建中文栏目首页：`learn`、`openspec`、`compound`、`aisee`、`workflows`、`thinking`、`resources`
- [x] 1.3 创建英文栏目首页：`en/learn`、`en/openspec`、`en/compound`、`en/aisee`、`en/workflows`、`en/thinking`、`en/resources`
- [x] 1.4 确认中文栏目页标题和入口文案不直接使用 `learn`、`workflows`、`thinking`、`resources` 作为中文显示名
- [x] 1.5 为未完成正文的栏目页加入建设状态或待补齐说明
- [x] 1.6 确认每个中英文栏目都提供 `README.md` 主页面，文章型栏目不得用列表页替代栏目主页面

## 2. 导航与 collections 配置

- [x] 2.1 更新 `site/.vuepress/navbar.ts`，用正式中文导航替换 demo/blog 示例导航
- [x] 2.2 更新 `site/.vuepress/navbar.ts`，用正式英文导航替换 demo/blog 示例导航
- [x] 2.3 更新 `site/.vuepress/collections.ts`，用正式 doc collections 组织 `learn`、`openspec`、`compound`、`aisee`、`workflows`、`resources`
- [x] 2.4 更新 `site/.vuepress/collections.ts`，将 `thinking` 按观点文章或文章型内容组织
- [x] 2.5 确认 navbar 和 collections 不再把 `demo`、`blog` 作为正式栏目入口
- [x] 2.6 将 collections 按栏目拆分到 `site/.vuepress/collections/`，并由 `site/.vuepress/collections.ts` 统一汇总
- [x] 2.7 将 `thinking` 文章列表入口与 `/thinking/` 栏目主页面分离
- [x] 2.8 在 doc collection 侧边栏中显式引用 `README.md` 栏目主页面
- [x] 2.9 显式配置 `thinking` 标签、归档和分类页路径

## 3. 资源中心、术语表与阅读路径

- [x] 3.1 在中文资源中心提供模板、Schema Pack、命令速查、检查清单、示例仓库、术语表、参考资料等入口或待补说明
- [x] 3.2 在英文资源中心提供英文资源入口和资源状态说明
- [x] 3.3 创建站点级术语表入口页，并标明完整术语解释将由后续内容 change 补齐
- [x] 3.4 在栏目页提供下一步阅读建议，未完成内容必须指向存在的栏目页、入口页或建设中说明页

## 4. 验证

- [x] 4.1 运行 `openspec validate "configure-site-information-architecture" --strict`
- [x] 4.2 运行静态检查，确认中文导航和中文栏目入口没有直接显示 `learn`、`workflows`、`thinking`、`resources`
- [x] 4.3 运行静态检查，确认正式导航不包含 demo/blog 示例入口
- [x] 4.4 运行路径检查，确认所有中英文正式栏目首页、资源中心、术语表和阅读路径入口存在
- [x] 4.5 运行 `pnpm docs:build`
