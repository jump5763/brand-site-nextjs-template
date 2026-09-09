---
name: create-section
description: 当现有 Section 无法满足内容结构、布局或交互要求时，扩展兼容能力或创建可由 Site Schema Registry 发现和验证的 Section 包。
---

# create-section

先对照用户要求读取候选 `src/sections/*/section.json`、Contract、Definition 和 View，核对内容结构、响应式布局、媒体、交互和操作入口。能够容纳文案不等于满足需求；只有满足相关验收条件的 Section 才直接复用。存在缺口时按以下流程补齐，不得为套用已有 Section 删减明确要求，也不得重复登记同一 `type.variant`。

## 实施流程

1. 记录具体能力缺口与对应验收条件。若原能力的语义不变且可通过兼容扩展满足需求，扩展现有包；若内容结构或布局语义不同，新增 variant 或 Section。用户已明确要求的布局和入口应在本次任务内实现，不作为可选升级另行搁置。
2. 读取 [Section 包格式](references/section-format.md) 与 [验证分层](references/validation.md)。新建时确定 `type`、`variant` 和 `id`（`id` 必须等于 `type.variant`），选择 `server` 或 `client-island` 渲染边界。
3. 新建时从 `assets/section-template` 复制完整目录到 `src/sections/<type>.<variant>/`，填写 `section.json`、`contract.schema.json`、`definition.tsx`，并在 `view.tsx` 编写真实布局；专属子组件与模型放在同一包内。扩展时同步更新这些文件及能力描述；保留已有内容的兼容性和原渲染默认行为，检查所有受影响的页面实例。
4. 按[实现归属与共享复用](references/section-format.md#实现归属与共享复用)先检查 `src/components/ui` 和 `src/components/shared` 中相关文件，读取候选组件的导出、props、实现和调用位置。匹配的完整 Section 通过页面编排复用；不导入其他 Section 的私有 View。缺少合适组件时先在当前 Section 内实现，只有满足共享提取条件才提升到最窄共同归属。交互状态保持在对应 Client Island 中。不得修改通用 primitive、自动安装依赖、开放组件路径、Tailwind class、函数或 Shell 给 `current.json`。
5. 依次执行 `pnpm schema:generate`、`pnpm schema:check`、`pnpm validate:site src/site-schema/current.json`、`pnpm typecheck`、`pnpm lint` 和 `pnpm build`。任何一步失败都先修复 Section 包。
6. 全部检查通过后，才在 `current.json` 中编排新 Section，并再次运行 `pnpm validate:site src/site-schema/current.json` 与 `pnpm build`。
7. 对照能力缺口逐项确认实现；有浏览器工具时检查相关尺寸下的布局和关键交互。验证失败、工具不可用或证据不足时明确报告未完成项，不以近似布局替代要求后宣称全部完成。

## 输出边界

Section content 必须保持 SiteDocument 结构；商品、分类、门店和评价属于使用它们的 Section content，不创建顶层 `resources`。`section.json` 只登记能力说明和本地引用，字段摘要由 Contract/生成器派生。禁止直接编辑 `src/site-schema/generated/**`。


默认内容来自本模板原有首页和 Menu。v45 仅作为结构与协议参考，不复制其业务内容。通过共享设计 token、基础组件和交互规范保持品牌一致；在保留已有页面行为的前提下，为新需求提供合适的布局。
