# text-diff · Online Text Diff

[简体中文](./README.md) · **English** · [繁體中文](./README.zh-TW.md) · [日本語](./README.ja.md) · [한국어](./README.ko.md) · [Español](./README.es.md) · [Français](./README.fr.md) · [Deutsch](./README.de.md) · [Русский](./README.ru.md) · [Português](./README.pt.md)

[![CI](https://github.com/shigc/text-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/shigc/text-diff/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/demo-diff.shigc.top-0969da)](https://diff.shigc.top/)

A **fully client-side** text diff tool inspired by Beyond Compare. All computation happens in your browser — **your text is never uploaded to any server**, so it is safe to paste configs, logs, or contracts.

![text-diff preview](./public/og.png)

## Live demo

<https://diff.shigc.top/>

No installation, no sign-up — just open and use.

## Features

- **Two view modes**: side-by-side (split) and unified, with character-level inline highlighting
- **Diff navigation**: jump to previous / next change, with live counts of added / removed / modified lines
- **Compare options**: ignore whitespace, ignore case, visualize whitespace characters
- **Flexible input**: paste, pick a file, or drag & drop into the editor
- **One-click export**: HTML report / PDF / CSV
- **Multilingual UI**: Simplified Chinese, Traditional Chinese, English, Japanese, Korean, Spanish, French, German, Russian, Portuguese — switches instantly and remembers your choice
- **Tiny dependency footprint**: the only runtime dependency is [jsdiff](https://github.com/kpdecker/jsdiff); the build output is plain static files

## Local development

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # dev server, http://localhost:5173 by default
```

Common commands:

```bash
npm run build            # strict tsc type check + production build
npm run preview          # preview the build locally
npm run typecheck        # type check only
npm run lint             # ESLint
npm run format           # Prettier
npm run build:obfuscated # production build with JS obfuscation (off by default)
```

Production builds are **not** obfuscated by default, so the output stays readable and auditable. If you want obfuscation for your deployment, set `OBFUSCATE=1` or run `npm run build:obfuscated`.

## Deploy to Cloudflare Pages

### Option 1: Git integration (recommended)

Connect this repository in Cloudflare Pages with:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework        | None            |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20              |

Every push to `main` deploys automatically. `public/_headers` takes effect and adds CSP and other security headers to the site.

### Option 2: Command line

```bash
npx wrangler login   # browser authorization, or use an API token
npm run deploy       # build + deploy
```

To use an API token, copy `.env.example` to `.env` and fill in:

```dotenv
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
CF_PAGES_PROJECT=text-diff
CF_PAGES_BRANCH=main
```

`npm run deploy` reads `CF_PAGES_PROJECT` / `CF_PAGES_BRANCH` from `.env`, so forks only need to change the project name. `.env` is git-ignored and never committed.

## Project structure

```text
.
├─ index.html            single-page shell (SEO / OG metadata included)
├─ public/               robots.txt, sitemap.xml, _headers, social preview image
├─ scripts/              cross-platform build and deploy scripts
├─ src/
│  ├─ main.ts            entry point: wires state, rendering and interaction
│  ├─ state.ts           global state
│  ├─ styles.css         all styles
│  ├─ diff/              diff computation and types (jsdiff wrapper)
│  ├─ export/            HTML / PDF / CSV export
│  ├─ i18n/              i18n framework and 10 locales
│  └─ ui/                input, rendering, navigation, language switching
└─ .github/              CI, Dependabot, issue / PR templates
```

## Privacy

- All text processing happens inside your browser tab; there is no upload endpoint
- No analytics, tracking, ads or error reporting; the page requests no third-party resources
- `localStorage` only stores your UI language preference
- Exported files are generated locally and only saved when you click download

## Browser support

Modern browsers only (latest two major versions of Chrome / Edge / Firefox / Safari). The build targets ES2020; IE is not supported.

## Contributing

Issues and PRs are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) first. For security issues, report privately as described in [SECURITY.md](./SECURITY.md).

## Acknowledgements

Diff algorithm by [jsdiff](https://github.com/kpdecker/jsdiff) (MIT); interaction and visuals inspired by [Beyond Compare](https://www.scootersoftware.com/).

## License

[MIT](./LICENSE) © shigc
