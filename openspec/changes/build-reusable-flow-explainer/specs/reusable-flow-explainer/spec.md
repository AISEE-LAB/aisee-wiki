## ADDED Requirements

### Requirement: Markdown 可复用流程组件
系统 MUST 提供一个可在 VuePress Markdown 页面中复用的流程讲解组件。

#### Scenario: Markdown 页面调用组件
- **WHEN** 内容作者在站点 Markdown 页面中插入流程讲解组件并传入有效流程数据
- **THEN** 系统必须渲染包含流程标题、阶段、节点和说明文本的流程讲解区域

#### Scenario: 组件由项目本地注册
- **WHEN** 维护者检查组件注册方式
- **THEN** 系统必须通过项目本地 VuePress client config 或等价本地机制注册组件，不得要求每篇文章手动引入复杂运行时代码

#### Scenario: 组件内容不是整页图片
- **WHEN** 维护者检查流程讲解实现
- **THEN** 流程标题、阶段名称、节点名称和说明文本必须由 Markdown、Vue props 或等价文本结构承载，不得只作为含文字图片展示

### Requirement: 流程阶段与节点表达
系统 MUST 支持用结构化数据表达流程阶段、节点和节点说明。

#### Scenario: 展示多个阶段
- **WHEN** 流程数据包含多个阶段
- **THEN** 系统必须按阶段展示流程，并为每个阶段显示阶段标题和阶段说明或等价描述

#### Scenario: 展示阶段内节点
- **WHEN** 某个阶段包含多个节点
- **THEN** 系统必须展示每个节点的名称，并在存在节点说明时展示对应说明文本

#### Scenario: 节点可链接到站内页面
- **WHEN** 节点数据包含站内链接
- **THEN** 系统必须把节点渲染为可访问的链接或提供等价的可点击入口

### Requirement: 连接关系与状态表达
系统 MUST 支持表达节点之间的连接关系、流程状态和重点强调。

#### Scenario: 展示节点连接关系
- **WHEN** 流程数据包含节点之间的连接关系
- **THEN** 系统必须展示这些关系的方向或依赖含义，形式可以是连接线、箭头、关系标签或等价文本说明

#### Scenario: 展示节点状态
- **WHEN** 节点数据包含状态信息
- **THEN** 系统必须用可读文本、标签、图标或样式表达状态，不得只依赖颜色区分状态

#### Scenario: 展示强调节点
- **WHEN** 节点数据标记某个阶段或节点为重点
- **THEN** 系统必须在视觉或文本层级上突出该阶段或节点，且不得影响其他节点可读性

### Requirement: 支持 OpenSpec、Compound/Harness 和 aisee 场景
系统 MUST 能用于解释 OpenSpec 状态机、Compound/Harness 循环、aisee 链路和通用软件工程流程。

#### Scenario: OpenSpec 流程可表达
- **WHEN** 内容作者使用组件表达 OpenSpec 从需求到归档的流程
- **THEN** 系统必须能展示 proposal、spec、design、tasks、apply、verify、archive 等阶段或等价节点关系

#### Scenario: Harness 循环可表达
- **WHEN** 内容作者使用组件表达 Harness 或验证闭环
- **THEN** 系统必须能展示输入契约、执行流程、验证 gate、人工决策点和知识回流等节点或等价节点关系

#### Scenario: aisee 链路可表达
- **WHEN** 内容作者使用组件表达 aisee 从 SRS 到 OpenSpec change 的链路
- **THEN** 系统必须能展示需求澄清、UI 内容、技术上下文、change 拆分、设计和复盘等阶段或等价节点关系

### Requirement: 示例页或示例内容存在
系统 MUST 提供至少一个流程讲解组件的使用示例，供后续内容作者复用。

#### Scenario: 中文示例可访问
- **WHEN** 维护者进入 workflows 栏目或组件示例入口
- **THEN** 系统必须提供一个可访问的中文流程组件示例页或示例区块

#### Scenario: 示例包含真实方法论场景
- **WHEN** 读者查看组件示例
- **THEN** 示例必须使用 OpenSpec、Compound/Harness、aisee 或软件工程流程相关场景，不得只使用无关占位数据

#### Scenario: 示例不冒充完整正文
- **WHEN** 示例内容尚未扩展为正式文章
- **THEN** 系统必须把示例表达为组件示例、建设中内容或基础示例，不得声称对应 P0/P1 正文已经完成

### Requirement: 响应式与可访问性
系统 MUST 在桌面、平板和移动端保持流程讲解内容可读、关系可理解、入口可操作。

#### Scenario: 桌面端展示流程关系
- **WHEN** 读者在常见桌面宽度查看流程讲解组件
- **THEN** 系统必须展示阶段关系和节点说明，且主要文本不得出现严重重叠

#### Scenario: 移动端降级为可读顺序
- **WHEN** 读者在移动端宽度查看流程讲解组件
- **THEN** 系统必须优先展示可读的阶段顺序、节点说明和关系文本，可简化或隐藏复杂连接线

#### Scenario: 长流程不被横向挤压
- **WHEN** 流程阶段数量较多或内容作者显式选择长流程模式
- **THEN** 系统必须提供纵向 timeline 或等价布局，避免阶段列过窄导致主要文本严重挤压或重叠

#### Scenario: 动态效果可降级
- **WHEN** 组件使用进入、hover、focus 或等价动态效果
- **THEN** 动态效果必须保持克制，不得依赖厚重阴影表达层级，并必须尊重用户的 reduced motion 偏好

#### Scenario: 状态表达可访问
- **WHEN** 流程节点使用状态颜色、强调色或视觉标识
- **THEN** 系统必须同时提供文本、标签、图标含义或等价可读信息，避免只依赖颜色传达状态

### Requirement: 静态站点边界
系统 MUST 遵守 AI SEE Wiki 静态文档站边界。

#### Scenario: 不依赖后端能力
- **WHEN** 维护者构建站点
- **THEN** 流程讲解组件不得要求后端服务、数据库、鉴权、运行时 API 或在线保存能力

#### Scenario: 不引入编辑器能力
- **WHEN** 读者查看流程讲解组件
- **THEN** 系统不得提供拖拽编辑、在线重排、在线保存或流程图编辑器能力作为本 change 的交付内容

#### Scenario: 不直接引用协作产物路径
- **WHEN** 维护者检查流程组件示例和相关页面
- **THEN** 公开站点运行时不得直接引用 `docs/requirements/`、`docs/tech-context/`、`docs/split/` 或其他 `docs/` 协作产物路径作为前端资源
