# Plan: Modernize UI across all tool pages (except /resume)

- From: planner
- To: Root Agent
- Title: Plan Response — Modernize UI across all tool pages (except /resume)
- Description: Introduce a shared app shell (navbar + footer) via the root layout, create reusable `ToolPageLayout` and `PageHeader` components, replace emoji icons with Bootstrap Icons on the home page, and apply consistent modern visual polish to all 25 non-resume pages without changing any business logic.

---

## Approach Summary

The current site has no shared chrome — every page independently renders its own "Back to Home" button and title row, with no navigation header, no footer branding, and no consistent visual language beyond plain Bootstrap defaults. The approach is:

1. **Add a shared app shell** by enhancing `src/pages/__root.tsx` to render a sticky `<Navbar>` at the top and a slim `<footer>` at the bottom, wrapping `<Outlet />`.
2. **Create two shared components** in `src/components/`: `AppShell.tsx` (navbar + footer) and `ToolPageLayout.tsx` (breadcrumb + icon + title + container).
3. **Modernize the home page**: replace emoji icons with Bootstrap Icons, add hero section, improve card hover transitions.
4. **Apply per-page visual improvements** to all 24 tool pages: use `<ToolPageLayout>`, icon card titles, styled code outputs, copy-to-clipboard buttons.
5. **No new npm packages.** Bootstrap Icons are already available.

## Functional Requirements

- FR-1: All 25 tool page computations, state, event handlers remain unchanged.
- FR-2: The donate QR popover continues to work (moved to `AppShell`).
- FR-3: The `/resume` page is not touched.
- FR-4: The shared navbar links back to `/` (home). No new routes are added.
- FR-5: All lazy-loading (`createLazyFileRoute`) stays in place.

## Non-Functional Requirements

- NFR-1: No new npm packages.
- NFR-2: Bootstrap 5 utility classes remain primary styling approach.
- NFR-3: SCSS changes limited to `_variables.scss` and `index.scss`.
- NFR-4: Code style: single quotes, semicolons, 2-space indent, 100-char line width.
- NFR-5: Route exports remain named `Route`; route components named `RouteComponent`.
- NFR-6: `src/router/routeTree.gen.ts` must not be edited.
- NFR-7: Site must remain fully functional with no broken imports or missing components.

## Files in Scope

### New files

| File                                | Purpose                                                     |
| ----------------------------------- | ----------------------------------------------------------- |
| `src/components/AppShell.tsx`       | Sticky navbar + footer wrapper                              |
| `src/components/ToolPageLayout.tsx` | Per-tool-page layout: breadcrumb + icon + title + container |

### Modified files

| File                                | Change                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| `src/pages/__root.tsx`              | Wrap `<Outlet />` with `<AppShell>`                                              |
| `src/pages/index.tsx`               | Hero section, Bootstrap Icons, improved cards, remove donate (moved to AppShell) |
| `src/styles/_variables.scss`        | Add spacers 6–8, card border-radius                                              |
| `src/styles/index.scss`             | Add `.tool-card`, `.hero-gradient`, `.code-output`, font-smoothing               |
| All 24 `src/pages/*/index.lazy.tsx` | Use `<ToolPageLayout>`, icon card titles, styled outputs, copy buttons           |

## Risks & Assumptions

- R1: `py-8` in `index.tsx` references non-existent Bootstrap spacer — fixed by adding spacers 6–8.
- R2: Donate QR popover state moves from `index.tsx` → `AppShell.tsx`.
- R3: 7 pages use `Container fluid` (no `xl`) — `ToolPageLayout` accepts optional `fluid` prop.
- R4: Import path from tool pages: `'../../../components/ToolPageLayout'` (verified correct).
- R5: Bootstrap Icons class names verified from Bootstrap Icons 1.x.
- R6: Copy-to-clipboard requires HTTPS — GitHub Pages uses HTTPS, safe.
- A1: No dark mode introduced. Light-mode only.
- A2: AppShell sticky navbar is 56px tall — `py-4` on tool containers provides adequate clearance.

## Open Questions / Blockers

None.

## Status

- [x] Ready to execute

## Task List

| #    | Status | Task                                                                              | Responsible Role | Dependencies |
| ---- | ------ | --------------------------------------------------------------------------------- | ---------------- | ------------ |
| 1.1  | DONE   | Extend SCSS variables (spacers 6–8, card border-radius)                           | developer        | none         |
| 1.2  | DONE   | Add utility classes to index.scss                                                 | developer        | none         |
| 1.3  | DONE   | Create AppShell.tsx (navbar + footer with donate QR)                              | developer        | none         |
| 1.4  | DONE   | Create ToolPageLayout.tsx (breadcrumb + icon + title + container, fluid prop)     | developer        | none         |
| 1.5  | DONE   | Update \_\_root.tsx to use AppShell                                               | developer        | 1.3          |
| 2.1  | DONE   | Redesign index.tsx (hero, Bootstrap Icons, hover transitions, remove donate)      | developer        | 1.3, 1.2     |
| 3.1  | DONE   | text-generator: apply ToolPageLayout, icon card titles, copy button               | developer        | 1.4          |
| 3.2  | DONE   | mock-data-generator: apply ToolPageLayout (fluid), icon card titles, .code-output | developer        | 1.4          |
| 3.3  | DONE   | meta-generator: apply ToolPageLayout, icon card titles, copy button               | developer        | 1.4          |
| 3.4  | DONE   | npm-script: apply ToolPageLayout, icon card titles, copy buttons                  | developer        | 1.4          |
| 3.5  | DONE   | word-counter: apply ToolPageLayout, icon card titles, table-hover                 | developer        | 1.4          |
| 3.6  | DONE   | on-key-down: apply ToolPageLayout, icon card titles, .code-output                 | developer        | 1.4          |
| 3.7  | DONE   | javascript-regex-test: apply ToolPageLayout, icon card titles, .code-output       | developer        | 1.4          |
| 3.8  | DONE   | regex-library: apply ToolPageLayout, icon card titles, styled code blocks         | developer        | 1.4          |
| 3.9  | DONE   | minify-prettify: apply ToolPageLayout (fluid), icon card titles, copy button      | developer        | 1.4          |
| 3.10 | DONE   | timestamp-to-date: apply ToolPageLayout, icon card titles, alert result           | developer        | 1.4          |
| 3.11 | DONE   | string-converter: apply ToolPageLayout, icon card titles, copy button             | developer        | 1.4          |
| 3.12 | DONE   | json-viewer: apply ToolPageLayout (fluid), icon card titles                       | developer        | 1.4          |
| 3.13 | DONE   | markdown-viewer: apply ToolPageLayout (fluid), icon card titles, styled preview   | developer        | 1.4          |
| 3.14 | DONE   | mermaid-viewer: apply ToolPageLayout (fluid), icon card titles, styled preview    | developer        | 1.4          |
| 3.15 | DONE   | csv-viewer: apply ToolPageLayout (fluid), icon card titles                        | developer        | 1.4          |
| 3.16 | DONE   | jwt-decoder: apply ToolPageLayout, icon card titles, .code-output                 | developer        | 1.4          |
| 3.17 | DONE   | md5: apply ToolPageLayout, icon card titles, copy button                          | developer        | 1.4          |
| 3.18 | DONE   | text-diff-viewer: apply ToolPageLayout (fluid), icon card titles, styled diff     | developer        | 1.4          |
| 3.19 | DONE   | color-converter: apply ToolPageLayout, icon card titles, copy buttons             | developer        | 1.4          |
| 3.20 | DONE   | image-converter: apply ToolPageLayout, icon card titles, fix "ConvertF" typo      | developer        | 1.4          |
| 3.21 | DONE   | image-to-base64: apply ToolPageLayout, icon card titles, copy buttons             | developer        | 1.4          |
| 3.22 | DONE   | base64-image-preview: apply ToolPageLayout, icon card titles                      | developer        | 1.4          |
| 3.23 | DONE   | url-encoder-decoder: apply ToolPageLayout, icon card titles, copy button          | developer        | 1.4          |
| 3.24 | DONE   | query-params-parser: apply ToolPageLayout, icon card titles                       | developer        | 1.4          |
| 4.1  | DONE   | Typography and font-smoothing in index.scss                                       | developer        | 1.2          |
| 4.2  | DONE   | Card visual baseline in \_variables.scss                                          | developer        | 1.1          |
