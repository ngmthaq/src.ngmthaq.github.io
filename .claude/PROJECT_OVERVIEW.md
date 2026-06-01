# PROJECT OVERVIEW

---

- **Project Name**: `DevTools by ngmthaq`
- **Project Description**: `A personal collection of developer utility tools (25+ tools) deployed to GitHub Pages at src.ngmthaq.github.io. Tools include text/data utilities, encoders/decoders, viewers, converters, and generators.`
- **Programming Languages**: `TypeScript, TSX`
- **Frameworks**: `React 19, Vite 7`
- **Package Managers**: `Yarn`
- **Key Libraries**: `@tanstack/react-router, bootstrap, react-bootstrap, bootstrap-icons, @uiw/react-markdown-preview, mermaid, @faker-js/faker, diff, react-json-view, sass`
- **Database**: `None (pure frontend)`
- **Doc Directory**: `/docs`
- **Testing Workflow**: `Skip-Testing` <!-- Code-First | Test-First | Skip-Testing -->
- **Playwright Check**: `None` <!-- Always | None | Ask-User -->

> Note: DO NOT edit the checklist template above.

## Additional Informations

### Routing

- TanStack Router with file-based routing and auto code-splitting
- Routes directory: `src/pages/`
- Auto-generated route tree: `src/router/routeTree.gen.ts` — **do not edit manually**

### Available Tools (Pages)

| Tool                   | Path                     |
| ---------------------- | ------------------------ |
| My Resume              | `/resume`                |
| Text Generator         | `/text-generator`        |
| Mock Data Generator    | `/mock-data-generator`   |
| Meta Generator         | `/meta-generator`        |
| NPM Script Generator   | `/npm-script`            |
| Word Counter           | `/word-counter`          |
| On Key Down            | `/on-key-down`           |
| JavaScript Regex Test  | `/javascript-regex-test` |
| Regex Library          | `/regex-library`         |
| Minify / Prettify Tool | `/minify-prettify`       |
| Timestamp to Date      | `/timestamp-to-date`     |
| String Converter       | `/string-converter`      |
| JSON Viewer            | `/json-viewer`           |
| Markdown Viewer        | `/markdown-viewer`       |
| Mermaid Viewer         | `/mermaid-viewer`        |
| CSV Viewer             | `/csv-viewer`            |
| JWT Decoder            | `/jwt-decoder`           |
| MD5                    | `/md5`                   |
| Text Diff Viewer       | `/text-diff-viewer`      |
| Color Converter        | `/color-converter`       |
| Image Converter        | `/image-converter`       |
| Image → Base64         | `/image-to-base64`       |
| Base64 Image Preview   | `/base64-image-preview`  |
| URL Encoder/Decoder    | `/url-encoder-decoder`   |
| Query Params Parser    | `/query-params-parser`   |

### Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `yarn dev`     | Start dev server (all interfaces) |
| `yarn build`   | Type-check + Vite build           |
| `yarn preview` | Preview production build          |
| `yarn lint`    | Run ESLint with auto-fix          |
| `yarn format`  | Run Prettier                      |
