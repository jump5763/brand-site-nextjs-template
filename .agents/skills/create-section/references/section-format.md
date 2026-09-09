# Section 包格式

目录名、descriptor identity 和 Registry identity 必须一致；实现时断言 `id === type.variant`：

```text
src/sections/<type>.<variant>/
├── section.json
├── contract.schema.json
├── definition.tsx
└── view.tsx
```

`section.json` 使用本地相对引用：

```json
{
  "version": 1,
  "id": "type.variant",
  "type": "type",
  "variant": "variant",
  "contract": "./contract.schema.json",
  "definition": "./definition.tsx",
  "capability": {
    "title": "Human readable title",
    "description": "What this Section renders.",
    "useWhen": ["A concrete use case"],
    "avoidWhen": ["A nearby capability"],
    "rendering": "server"
  }
}
```

Contract 可以描述完整 Section wrapper 或 content；生成器会将 content Contract 包装为带身份字段的 Section。Contract 的 `$id` 必须以 `/<type>.<variant>` 或 `/<type>.<variant>.schema.json` 结尾，`$ref` 使用当前 Contract 内的 JSON Pointer，或 `https://codeforma.local/site-schema/core#/$defs/...` 引用共享数据结构。

Definition 的 `render(section, site)` 统一接收完整 Section 实例，需要解析 Page ID 链接时接收服务端 `site` 上下文；只向 Client View 传递必要 props。参数类型从 `src/site-schema/generated/types.ts` 导入；View props 由 `toProps` 明确定义。`schema:generate` 自动生成类型、根 Contract、静态 Registry 和能力目录，渲染器无需手工登记新能力。首次生成前类型尚不存在，先生成再执行 typecheck。View 不维护默认站点内容，不自行扫描文件系统，也不接受来自 JSON 的组件路径或可执行函数。

## 实现归属与共享复用

- `view.tsx` 保存真实布局，默认只消费已适配 props；小型私有子组件可留在该文件中。交互文件按需要拆分，例如 `hero.default/carousel.client.tsx`；Menu 的筛选与排序留在 `menu.catalog/catalog-model.ts`。复杂 props 可以放入同目录类型文件，简单 props 从 View 导出。
- Definition 读取生成类型，通过 `toProps` 适配内容；需要链接解析时使用 `src/site-schema/runtime/resolve-link.ts` 的 `resolveAction`。不要建立聚合所有 Section props 的页面级 view-model，也不要把专属实现放回全局业务目录。
- Header、Footer 和它们的私有组件属于 `src/components/layout`；基础 UI 属于 `src/components/ui`；不同能力已共用的 UI 模式属于 `src/components/shared`。同层 Section 通过页面组合，不能相互深层导入私有实现。
- 创建 UI 前，搜索 `ui` 与 `shared` 中相关文件，检查名称、导出、props 和已有调用位置，再确认实际布局与行为匹配。优先复用，但不为了套用共享组件删减需求。没有合适实现时在当前能力内编写。
- 出现新的独立使用方后，再评估是否提取：职责相同、接口自然、应一起变化、没有对使用方私有代码的反向依赖，四项同时满足才提升到最窄共同目录。第二个使用方不是自动提取命令，同一 Section 出现在多个页面不算新增所有者。
- 使用描述用途的文件名及直接导入。必要时在导出旁写一句英文用途注释，不额外维护共享组件 Registry。共享组件出现大量调用方特判时，应重新评估是否拆回各自能力。
- 只在维护需要时拆分文件和子目录。不要机械创建 `view.tsx → view.client.tsx` 转发链；完整交互 View 可以直接声明 `"use client"`。共享组件可被 View 正常组合，不能用跨目录转发隐藏 Section 的真实所有者。
