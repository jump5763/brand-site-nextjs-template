# Section 验证分层

创建 Section 时按以下顺序验证：

1. 结构：确认 descriptor、Contract、Definition 和 View 都存在，`id === type.variant`，引用是同目录相对路径。
2. 生成：运行 `pnpm schema:generate`，再运行只读的 `pnpm schema:check`；不得手工编辑 generated 文件。
3. 数据：运行 `pnpm validate:site src/site-schema/current.json`，确认未登记 Section、无效 content、断链、非法媒体和重复身份能给出 JSON Pointer。
4. 代码：运行 `pnpm typecheck` 与 `pnpm lint`。检查失效导入、同层 Section 私有依赖和共享组件的反向依赖。交互 Section 在浏览器中确认关键行为；修改共享组件时检查其全部调用位置。仅迁移目录时，核对 DOM、class、状态与事件逻辑，保持当前页面基线。
5. 集成：运行 `pnpm build`。全部通过后才修改 `current.json`，再重跑数据校验与构建。

`schema:check` 校验 Descriptor、Contract、文件引用边界并检查全部生成产物的一致性；`validate:site` 与运行时共用 Validator，检查 SiteDocument 的结构与语义。修改 Contract 后先生成，提交前再检查，避免使用过期产物。

