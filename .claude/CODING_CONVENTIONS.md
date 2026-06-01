# Coding Conventions

## Project Structure

```
src.ngmthaq.github.io/
├── src/
│   ├── pages/                  # One folder per route/tool (feature-based)
│   │   ├── __root.tsx          # Root layout (Outlet only)
│   │   ├── index.tsx           # Home page (eager-loaded)
│   │   └── <tool-name>/
│   │       └── index.lazy.tsx  # Tool page (lazy-loaded)
│   ├── router/
│   │   ├── index.ts            # Router instance
│   │   └── routeTree.gen.ts    # AUTO-GENERATED — do not edit
│   └── styles/
│       ├── _variables.scss     # Bootstrap custom variables
│       ├── custom-bootstrap.scss
│       └── index.scss
├── public/                     # Static assets
├── dist/                       # Build output
├── vite.config.ts
├── tsconfig.app.json
└── package.json
```

## Formatting (Prettier)

| Rule              | Value                               |
| ----------------- | ----------------------------------- |
| Quotes            | Single quotes (`'`) including JSX   |
| Semicolons        | Required                            |
| Trailing commas   | All (ES5+)                          |
| Tab width         | 2 spaces                            |
| Print width       | 100 characters                      |
| Line endings      | LF                                  |
| Arrow parens      | Omit for single argument (`x => x`) |
| Bracket spacing   | `{ x }`                             |
| Bracket same line | false                               |

## Naming Conventions

| Target                 | Convention                         | Example                    |
| ---------------------- | ---------------------------------- | -------------------------- |
| Directories            | `kebab-case`                       | `mock-data-generator/`     |
| Page files             | `index.tsx` / `index.lazy.tsx`     | `index.lazy.tsx`           |
| Components             | `PascalCase` function declarations | `RouteComponent`           |
| Types / interfaces     | `PascalCase`                       | `type Field = { ... }`     |
| Variables / functions  | `camelCase`                        | `addField`, `generateJson` |
| Internal schema fields | `__` prefix                        | `__id`, `__parentId`       |
| React hooks            | `use` prefix                       | `useState`, `useMemo`      |

## Import Order (ESLint import/order)

Imports must be grouped and alphabetized in this order, with a blank line between each group:

```ts
// 1. builtin (node built-ins)
// 2. external (npm packages)
import { faker } from '@faker-js/faker';
import { createLazyFileRoute } from '@tanstack/react-router';

// 3. internal (path aliases)
// 4. parent (../)
// 5. sibling (./)
import type { FileRouteTypes } from '../router/routeTree.gen';
```

Use `import type` for type-only imports.

## Route Pattern

Every page must follow this structure:

**Lazy route (standard tool page):**

```tsx
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/route-name/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>...</div>;
}
```

**Eager route (index page):**

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>...</div>;
}
```

Rules:

- Route export is always named `Route`
- Component is always named `RouteComponent` (not default-exported separately)
- New tool pages go in `src/pages/<kebab-case-name>/index.lazy.tsx`

## UI & Styling

- **Bootstrap 5 utility classes** are the primary styling approach (`py-4`, `mb-3`, `d-flex`, etc.)
- **React Bootstrap** components for layout and interactive elements (`Container`, `Row`, `Col`, `Card`, `Button`)
- **Bootstrap Icons** via `<i className='bi bi-*'>` for icons
- **SCSS** only for global custom variables (`src/styles/_variables.scss`)
- **Inline styles** (`style={{...}}`) are acceptable for specific layout/positioning that cannot be expressed with utilities

## State Management

- Local component state only: `useState`, `useRef`, `useEffect`, `useMemo`
- No global state management library
- Co-locate state with the component that owns it (all logic stays within the page file)

## TypeScript

- Strict TypeScript enforced via `tsconfig.app.json`
- Prefer `type` over `interface` for local type definitions
- Use `import type` for type-only imports
- Use `FC` from React for typed function components when needed (e.g., `App.tsx`)

## Error Handling

- No formal error boundaries required for utility tools
- Validate inputs at the component level with conditional rendering
- No global error handling infrastructure

## Testing

- **Skip-Testing** — no automated tests in this project

## Linting & Git Hooks

- ESLint runs on commit via Husky + lint-staged (`eslint . --fix` on all staged files)
- Run `yarn lint` to fix lint issues and `yarn format` to format before committing
