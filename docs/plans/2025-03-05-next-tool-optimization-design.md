# 前端武器库优化设计文档

**日期**：2025-03-05  
**范围**：SEO、UI/UX 与可访问性、Next.js 技术实现

## 1. 目标与范围

- 在不改变产品定位的前提下，提升站在 **SEO、UI/UX、技术实现** 三方面的专业度。
- 覆盖 App Router 下所有主要工具页及全局布局与元信息。
- 风格保持极简卡片风与暗色模式支持，允许对布局与文案做明显优化。

## 2. SEO 设计要点

- **页面元信息**：每个工具页导出 `metadata`，标题格式统一为 `工具名_前端武器库`，描述为一两句自然中文，keywords 覆盖工具名（中英）、在线工具、前端工具等。
- **标题结构**：每页仅保留一个语义上的 `<h1>`，与工具名称一致；卡片内标题使用 `h2` 或普通文本。
- **站点级**：提供最小可用版 `app/robots.ts`（允许 /，禁止 /api/）与 `app/sitemap.ts`（首页 + 各工具路径），base URL 通过 `VERCEL_URL` 或 `NEXT_PUBLIC_APP_URL` 解析。
- **Open Graph**：本次不改，继续使用站点级统一配置。

## 3. UI/UX 与可访问性要点

- **文案**：工具内标题、按钮、标签统一为中文（如 输入文本、结果、清空、复制、解码、进制转换、配置、预览等）；Statistics 组件使用 词数、字符数、句子数、空格数。
- **图标按钮**：仅图标按钮提供可访问名称——优先增加简短中文文案，否则使用 `aria-label` 或 `sr-only`；装饰性图标使用 `aria-hidden="true"`。
- **表单**：输入框与 Label 正确关联（`htmlFor` / `aria-label`）；占位符使用「…」结尾，示例清晰。
- **反馈**：复制等操作后使用 Toast 提示；错误信息贴近字段或使用 `role="alert"`。

## 4. 技术实现要点

- **IP 查询**：通过 Route Handler `app/api/ip/route.ts` 代理请求 `https://ip-api.com`；页面从 headers 取客户端 IP 或从 query 取指定 IP，调用内部 `/api/ip`，使用 HTTPS，不保留 `console.log`。
- **UUID 工具**：初始列表在 `useEffect` 中生成，避免服务端/客户端 hydration 不一致；移除 render 阶段依赖 `Math.random` 的写法。
- **工具配置**：首页工具列表抽离到 `config/tools.ts`，统一管理图标、标题、描述、路由、是否外链；sitemap 使用同源 `toolPaths` 生成工具页 URL。
- **JSON / UUID 页**：拆分为服务端页面（导出 metadata）+ 客户端工具组件（`components/tools/JsonTool.tsx`、`UuidTool.tsx`），保证这两页也有完整 SEO 元信息。

## 5. 实施计划与回归清单

- 每个工具页最小回归检查：
  - 页面正常渲染（含暗黑模式切换）。
  - `metadata` 正确且无重复 H1。
  - 主要操作（复制、重置、查询、转换等）在桌面与移动端可完成。
- 外链使用 `target="_blank"` 时需配合 `rel="noopener noreferrer"`。

## 6. 后续新增工具规范（摘录）

- 新工具采用「路由页 + 业务组件」：`app/<tool>/page.tsx` 导出 `metadata` 并渲染 `components/tools/<Tool>Tool.tsx`。
- 在 `config/tools.ts` 中增加一项，并确保 `toolPaths` 包含新路径，sitemap 会自动纳入。
- 图标按钮必须带可访问名称；表单控件必须带 Label；用户可见文案优先使用简体中文。
