# 内容契约参考

`src/site-schema/current.json` 是内容的权威来源。其结构由 `src/site-schema/contracts/site-schema.schema.json` 和各个 Section 本地的 `contract.schema.json` 定义。

`pages[].metadata` 管理标题、描述、canonical 路径、robots、OpenGraph 和 JSON-LD。`pages[].sections[].content` 管理 Section 文案、媒体、链接、商品、分类、门店和评价。`layout.header.content` 和 `layout.footer.content` 管理页面外壳的导航与联系信息。`theme.fonts` 和 `theme.colors` 遵循项目主题契约。

不存在顶层 `resources` 集合，也不存在 `schemaVersion`。重复数据仍保留在 Section content 中；运行时索引通过派生生成，绝不写回 JSON。

根据变更范围，仅使用以下受控检查：

```text
schema:check
validate:site src/site-schema/current.json
typecheck（渲染器或适配器代码变更时）
build（路由或渲染变更时）
```

Sitemap 和 robots 使用同一份已校验文档。`metadata.robots.index === false` 的页面会被排除在 sitemap 之外；noindex 不会转换为 robots 的 disallow 规则。

展示代码由对应 Section 的 `view.tsx` 与本地子组件拥有；Definition 负责数据适配，`src/components/layout` 负责页面外壳。内容仍以 `current.json` 为准，不在 View 或共享组件中创建第二份默认内容。
