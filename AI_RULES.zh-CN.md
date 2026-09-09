# AI 开发规范

本文档概述了此 Next.js 应用的技术栈及特定库的使用指南。遵守这些规范有助于保持一致性、改善协作，并确保 AI 助手能够有效理解和修改代码库。

## 技术栈概览

本应用使用以下核心技术构建：

*   **框架**：Next.js（App Router）
*   **语言**：TypeScript
*   **UI 组件**：Shadcn/UI——一套基于 Radix UI 和 Tailwind CSS 构建的可复用 UI 组件集合。
*   **样式**：Tailwind CSS——一个实用工具优先的 CSS 框架，用于快速开发 UI。
*   **图标**：Lucide React——一个全面且设计简洁美观的 SVG 图标库。
*   **表单**：使用 React Hook Form 管理表单状态和验证，通常配合 Zod 进行模式验证。
*   **状态管理**：主要使用 React Context API 和 React 内置 Hook（`useState`、`useReducer`）。
*   **通知/Toast**：使用 Sonner 显示非侵入式通知。
*   **图表**：使用 Recharts 进行数据可视化。
*   **动画**：使用 `tailwindcss-animate` 以及 Radix UI 组件内置的动画能力。

## 库使用指南

为确保一致性并充分发挥所选技术栈的优势，请遵循以下规范：

1.  **UI 组件**：
    *   **首选方案**：始终优先使用 `src/components/ui/` 目录中的组件（Shadcn/UI 组件）。
    *   **自定义组件**：如果 Shadcn/UI 中没有所需组件，请遵循 Shadcn/UI 的组合模式，在 `src/components/` 中创建新组件（即基于 Radix UI 原语构建，并使用 Tailwind CSS 设置样式）。
    *   **避免事项**：未经讨论，不得引入新的第三方 UI 组件库。

2.  **样式**：
    *   **首选方案**：所有样式一律使用 Tailwind CSS 实用工具类。
    *   **全局样式**：`src/app/globals.css` 仅用于 Tailwind 基础指令、全局 CSS 变量定义和少量基础样式。避免在此添加组件专用样式。
    *   **CSS-in-JS**：不要使用 CSS-in-JS 库（例如 Styled Components、Emotion）。

3.  **图标**：
    *   **首选方案**：使用 `lucide-react` 库中的图标。

4.  **表单**：
    *   **管理**：所有表单逻辑（状态、验证、提交）均使用 `react-hook-form`。
    *   **验证**：使用 `zod` 进行基于模式的验证，并通过 `@hookform/resolvers` 与 `react-hook-form` 集成。

5.  **状态管理**：
    *   **局部状态**：使用 React 的 `useState` 和 `useReducer` Hook 管理组件级状态。
    *   **共享/全局状态**：对于多个组件之间共享的状态，优先使用 React Context API。
    *   **复杂全局状态**：如果应用状态变得非常复杂，应先讨论是否引入专用状态管理库（例如 Zustand、Jotai），再进行实现。

6.  **路由**：
    *   使用 Next.js App Router（位于 `src/app/` 目录中的文件系统路由）。

7.  **API 调用与数据获取**：
    *   **客户端**：使用原生 `fetch` API 或其简单封装。
    *   **服务端（Next.js）**：使用 Next.js Route Handlers（位于 `src/app/api/`）或 Server Actions 处理服务端逻辑和数据获取。

8.  **动画**：
    *   使用 `tailwindcss-animate` 插件以及 Radix UI 组件提供的动画实用工具。

9.  **通知/Toast**：
    *   所有 Toast 通知均使用 `Sonner` 组件（来自 `src/components/ui/sonner.tsx`）。

10. **图表与数据可视化**：
    *   使用 `recharts` 及其相关组件（例如 `src/components/ui/chart.tsx`）展示图表。

11. **实用工具函数**：
    *   通用辅助函数应放在 `src/lib/utils.ts` 中。
    *   确保函数具有完善的类型定义，并具备清晰、可复用的用途。

12. **自定义 Hook**：
    *   自定义 React Hook 应放在 `src/hooks/` 目录中（例如 `src/hooks/use-mobile.tsx`）。

13. **TypeScript**：
    *   所有新增代码均使用 TypeScript 编写。
    *   尽量使用强类型，并充分利用 TypeScript 的特性来提升代码质量和可维护性。应尽可能避免使用 `any`。

遵循这些指南，可以帮助我们构建更加健壮、可维护且一致的应用。

## Site Schema 项目规范

本模板使用与 keke-brand-site v45 兼容的 Site Schema。编辑 `src/site-schema/current.json` 时必须保留顶层 `siteId`、`siteUrl`、`theme`、`layout`、`pages`，商品、分类、门店、评价、metadata 和 Section 数据都归属于对应 Page 的 Section `content`。禁止添加顶层 `resources` 或 `schemaVersion`。

所有内容页面统一由唯一入口 `src/app/[[...slug]]/page.tsx` 渲染。同一份已校验文档驱动 Page metadata、canonical、`src/app/sitemap.ts` 和 `src/app/robots.ts`。编排页面只能使用 `src/site-schema/generated/capabilities.json` 中已登记的 `type.variant`。

只使用受控入口 `schema:check`、`validate:site`；涉及路由或渲染时再运行 `typecheck` 和 `build`。禁止在 Agent 工作流中执行任意 Shell，禁止手工改 generated 文件。工作流见 `.agents/skills/edit-site-content/SKILL.md` 和 `.agents/skills/compose-page/SKILL.md`。
