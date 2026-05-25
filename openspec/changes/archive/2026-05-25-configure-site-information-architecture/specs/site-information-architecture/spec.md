## ADDED Requirements

### Requirement: 中文栏目显示名与 slug 分离
系统 MUST 使用稳定英文 slug 作为栏目路径，同时为中文读者展示中文栏目显示名。

#### Scenario: 中文导航不直接显示英文 slug
- **WHEN** 读者查看中文导航或中文栏目入口
- **THEN** 系统不得直接把 `learn`、`workflows`、`thinking`、`resources` 作为中文显示名

#### Scenario: 中文栏目显示名可读
- **WHEN** 读者查看中文栏目入口
- **THEN** 系统必须展示 `学习路径`、`工程流程`、`观点文章`、`资源中心` 等中文显示名

#### Scenario: slug 保持稳定
- **WHEN** 维护者检查中文栏目路径
- **THEN** 系统必须保留 `/learn/`、`/openspec/`、`/compound/`、`/aisee/`、`/workflows/`、`/thinking/`、`/resources/` 作为栏目路径

### Requirement: 英文栏目与中文栏目 slug 对应
系统 MUST 在 `/en/` 下提供与中文栏目同 slug 的英文栏目入口。

#### Scenario: 英文栏目路径存在
- **WHEN** 维护者检查英文栏目路径
- **THEN** 系统必须提供 `/en/learn/`、`/en/openspec/`、`/en/compound/`、`/en/aisee/`、`/en/workflows/`、`/en/thinking/`、`/en/resources/`

#### Scenario: 英文栏目显示名使用英文
- **WHEN** 英文读者查看英文导航或英文栏目入口
- **THEN** 系统必须展示 `Learn`、`OpenSpec`、`Compound`、`aisee`、`Workflows`、`Thinking`、`Resources`

### Requirement: 正式导航替换示例入口
系统 MUST 使用正式栏目导航替换 Plume 初始化的 demo/blog 示例导航。

#### Scenario: 中文导航不引用示例内容
- **WHEN** 维护者检查中文导航配置
- **THEN** 导航不得包含 `博客`、`标签`、`归档`、`笔记`、`示例` 等 Plume demo/blog 示例入口

#### Scenario: 英文导航不引用示例内容
- **WHEN** 维护者检查英文导航配置
- **THEN** 导航不得包含 `Blog`、`Tags`、`Archives`、`Notes`、`Demo` 等 Plume demo/blog 示例入口

#### Scenario: 正式导航链接存在
- **WHEN** 读者点击正式导航入口
- **THEN** 每个导航链接必须指向存在的页面或栏目入口

### Requirement: 正式栏目页面可访问
系统 MUST 为每个正式栏目提供可访问的栏目首页。

#### Scenario: 中文栏目首页存在
- **WHEN** 维护者检查中文栏目目录
- **THEN** 每个中文栏目路径下必须存在栏目首页

#### Scenario: 英文栏目首页存在
- **WHEN** 维护者检查英文栏目目录
- **THEN** 每个英文栏目路径下必须存在栏目首页

#### Scenario: 栏目主页面使用 README 承载
- **WHEN** 维护者检查正式栏目源文件
- **THEN** 每个中英文正式栏目目录必须提供 `README.md` 作为栏目主页面

#### Scenario: doc collection 显式引用栏目主页面
- **WHEN** 维护者检查文档型栏目 collection 的侧边栏配置
- **THEN** 侧边栏必须显式引用 `README.md` 作为栏目首页入口

#### Scenario: 未完成正文有状态说明
- **WHEN** 某个栏目正文尚未完成
- **THEN** 栏目首页必须展示建设状态或待补齐说明，不得伪装为正文已完成

### Requirement: collections 使用正式栏目结构
系统 MUST 用正式栏目 collections 替换 demo/blog 示例 collections。

#### Scenario: collections 按栏目拆分
- **WHEN** 维护者检查 collections 配置
- **THEN** 系统必须为正式栏目提供按栏目拆分的 collection 配置文件，并由统一入口汇总

#### Scenario: 文档型栏目使用 doc collection
- **WHEN** 维护者检查 collections 配置
- **THEN** `learn`、`openspec`、`compound`、`aisee`、`workflows`、`resources` 必须按文档型栏目组织

#### Scenario: 观点栏目按文章型内容组织
- **WHEN** 维护者检查 `thinking` 栏目配置
- **THEN** `thinking` 必须按观点文章或文章型内容组织

#### Scenario: 观点文章列表不替代栏目主页面
- **WHEN** 维护者检查 `thinking` 栏目配置
- **THEN** 文章列表页不得占用 `/thinking/` 栏目主页面路径

#### Scenario: 观点文章派生页路径清晰
- **WHEN** 维护者检查 `thinking` 栏目配置
- **THEN** 标签、归档和分类页必须使用 `/thinking/articles/` 下的显式路径

#### Scenario: collections 不引用 demo 结构
- **WHEN** 维护者检查 collections 配置
- **THEN** collections 不得把 `demo` 作为正式栏目集合

### Requirement: 资源中心入口存在
系统 MUST 提供资源中心入口，并为后续资源内容保留可访问槽位。

#### Scenario: 中文资源中心包含资源槽位
- **WHEN** 读者访问 `/resources/`
- **THEN** 系统必须提供模板、Schema Pack、命令速查、检查清单、示例仓库、术语表、参考资料等入口或待补说明

#### Scenario: 英文资源中心存在
- **WHEN** 读者访问 `/en/resources/`
- **THEN** 系统必须提供英文资源中心入口和资源状态说明

### Requirement: 术语表与阅读路径入口存在
系统 MUST 提供站点级术语表入口和跨栏目阅读路径入口。

#### Scenario: 术语表入口可访问
- **WHEN** 读者从资源中心或栏目页进入术语表
- **THEN** 系统必须提供可访问的术语表页面或术语表入口页

#### Scenario: 阅读路径入口可访问
- **WHEN** 读者从栏目页寻找下一步阅读建议
- **THEN** 系统必须提供可访问的阅读路径入口或下一步阅读说明

#### Scenario: 未完成阅读内容不产生死链
- **WHEN** 推荐阅读内容尚未完成
- **THEN** 系统必须指向存在的栏目页、入口页或明确的建设中说明页
