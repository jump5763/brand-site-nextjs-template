---
name: create-section
description: 在确认现有能力不足后，创建可由 Site Schema Registry 发现和验证的餐饮 Section 包。
---

# create-section

只有在现有 Registry 能力无法满足需求时才使用本 Skill。先读取并比较已登记的 `src/sections/*/section.json`、Contract、Definition 和 View，记录能力缺口；可以复用的 Section 必须直接编排，不得重复创建同一 `type.variant`。

## 实施流程

1. 说明能力缺口、目标页面和预期内容，确认没有可复用的 Section。
2. 确定 v45 兼容的 `type`、`variant` 和 `id`（`id` 必须等于 `type.variant`），选择 `server` 或 `client-island` 渲染边界。
3. 从 `assets/section-template` 复制完整目录到 `src/sections/<type>.<variant>/`，填写 `section.json`、`contract.schema.json`、`definition.tsx` 和 `view.tsx`。
4. 优先组合 `src/components/ui` 与现有 Section View；交互状态放在最小 Client Island 中。不得修改通用 primitive、自动安装依赖、开放组件路径、Tailwind class、函数或 Shell 给 `current.json`。
5. 依次执行 `pnpm schema:generate`、`pnpm schema:check`、`pnpm validate:site src/site-schema/current.json`、`pnpm typecheck` 和 `pnpm build`。任何一步失败都先修复 Section 包。
6. 全部检查通过后，才在 `current.json` 中编排新 Section，并再次运行 `pnpm validate:site src/site-schema/current.json` 与 `pnpm build`。

## 输出边界

Section content 必须保持 v45 SiteDocument 结构；商品、分类、门店和评价属于使用它们的 Section content，不创建顶层 `resources`。`section.json` 只登记能力说明和本地引用，字段摘要由 Contract/生成器派生。禁止直接编辑 `src/site-schema/generated/**`。

