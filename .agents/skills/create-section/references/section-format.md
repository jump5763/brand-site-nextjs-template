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
