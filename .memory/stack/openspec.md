# OpenSpec Schema 使用约定

**日期：** 2026-05-25
**类型：** stack

## 摘要

本项目已安装并使用 `aisee-docsite-driven` 作为文档站 change 的项目级 schema。后续新建文档站 change 时应显式传入 schema，避免 OpenSpec CLI 默认回落到 `spec-driven`。

## 详情

- 项目配置 `openspec/config.yaml` 已设置为 `schema: aisee-docsite-driven`。
- 当前 OpenSpec CLI `openspec new change --help` 仍显示命令默认 schema 为 `spec-driven`。
- 后续新建文档站、知识库、教程、Wiki、内容导航或信息架构维护类 change 时，建议显式使用：

```bash
openspec new change <change-name> --schema aisee-docsite-driven
```

## 引用

- `openspec/config.yaml`
- `openspec/schemas/aisee-docsite-driven/schema.yaml`
