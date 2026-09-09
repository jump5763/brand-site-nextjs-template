---
name: edit-site-content
description: 编辑已有 Site Schema Page 和 Section 的内容，同时保留身份标识、数据归属和受控验证边界。
---

# 编辑站点内容

编辑已有 Page Section 所属的文案、媒体、metadata、链接、商品、分类、门店、评价或其他数据时，使用本 Skill。

## 契约

- 保留 `src/site-schema/current.json` 中 Site Schema 的顶层键 `siteId`、`siteUrl`、`theme`、`layout` 和 `pages`。
- 将各项值保留在其所属 Page Section 的 `content` 中。不要添加顶层 `resources` 或 `schemaVersion`。
- 保留 Page 的 `id`/`path` 和 Section 的 `id`/`type`/`variant`，除非任务明确要求改变编排。
- 内容页面通过 `src/app/[[...slug]]/page.tsx` 渲染；不要为内容编辑创建固定路由。

## 工作流程

1. 检查目标 Page 和 Section，并阅读[内容契约参考](references/content-contract.zh-CN.md)。
   查看 `src/site-schema/contracts/site-schema.schema.json` 和所选 `src/sections/<type>.<variant>/contract.schema.json`，了解数据契约。
2. 仅编辑必要的 `content` 字段。
   如需核对显示方式，读取同目录 `definition.tsx` 与真实 `view.tsx`；Header/Footer 的展示位于 `src/components/layout`。纯内容修改不迁移组件、不提取共享实现。
3. 运行参考文档中说明的受控检查。
4. 报告变更的 Page/Section ID 及相关证据。

受控入口为 `schema:check`、`validate:site`；涉及路由或渲染变更时，还需运行 `typecheck` 和 `build`。

不要执行任意 Shell 命令、手工修改生成文件，或通过 Site Schema 改变筛选条件、购物袋数量等客户端状态。

默认内容来自本模板原有首页和 Menu。v45 仅作为结构与协议参考，不作为默认业务内容。复用原有组件，并保留其视觉效果、响应式布局和交互行为。
