# 能力目录参考

生成文件 `src/site-schema/generated/capabilities.json` 是已安装 Section 能力的权威目录。它由本地所有 `src/sections/*/section.json` 派生，而不只包含 `current.json` 当前使用的 Section。

编排 Page 前，检查所选能力的描述文件（descriptor）、本地 `contract.schema.json`、Definition 和 View。确保 `type`、`variant`、`id` 以及有序的 `content` 字段与该 Contract 保持一致。已登记但尚未使用的能力可以直接选用，无需修改生成文件。

## 能力匹配

- 将需求与实际渲染的内容结构、桌面／平板／手机布局、媒体编排、交互和必需操作入口逐项对照。检查 `useWhen` 和 `avoidWhen`；如果能力限制与需求冲突，在实现和描述文件中解决冲突之前，应将其视为能力缺口。
- 仅能将文案存入现有字段并不足以证明能力匹配。例如，带有步骤配图的三栏流程不能替换为两栏故事加勾选列表；装饰性徽章不能替代用户要求的辅助链接。
- 当每个实例都适合其用途，且整页符合要求的编排方式时，允许重复使用同一种 Section。不要设置重复次数限制，不要把无关内容强塞进必填字段，也不要为了填满模板而编造事实。
- 通过共享设计 token、字体排版、容器、按钮和交互规范保持品牌一致性。这并不要求每个页面重复相同的 Section 布局。
- 对于满足需求的能力，直接复用而不修改；当其语义保持不变时，进行兼容扩展；当内容结构或布局语义不同时，引入新的 variant 或 Section。保留已有实例，并更新描述文件，使其与实际能力一致。

新增能力时，创建完整的本地 Section 包，包含描述文件、Contract、Definition、View 和必要的 Client Island。扩展能力时，同步更新现有包中的相关内容。遵循 `create-section` 工作流，在编排使用变更后能力的实例之前，先运行 `schema:generate`，再运行 `schema:check`。不得仅为局限于当前能力目录而删减明确要求。

验证分层：

- 内容编辑：运行 `schema:check` 和 `validate:site`。
- 页面编排：运行 `schema:check`、`validate:site`；涉及路由或渲染变更时，还需运行 `typecheck` 和 `build`。
- 新增或扩展 Section：运行 `schema:generate`、`schema:check`、`validate:site`、`typecheck` 和 `build`；检查受影响的已有实例是否出现回归。
- SEO：检查 canonical URL、sitemap 的收录与 noindex 页面的排除逻辑，以及 robots 中的 sitemap URL，确保统一使用 `siteUrl`。

Schema 和构建检查验证的是结构与技术属性，不能证明设计需求已经满足。将最终页面与原始需求逐项对照；有浏览器工具时，使用浏览器验证证据核对布局和交互。在最终报告中明确列出未满足的要求、无法执行的检查和失败的检查，不要将它们重新归类为可选的后续工作。

实现位于 `src/sections/<type>.<variant>/view.tsx` 及其专属文件中。页面外壳位于 `src/components/layout`，基础组件与共享 UI 分别位于 `src/components/ui`、`src/components/shared`。扩展能力时遵循 `create-section` 的复用检查和共享提取条件，不从其他 Section 深层导入私有实现。
