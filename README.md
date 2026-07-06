# CodeTango

A technical blog about agentic AI development and operations, built with
[Astro](https://astro.build/) and deployed on [Vercel](https://vercel.com/).

**Live site:** [codetango.vercel.app](https://codetango.vercel.app/)

## Topics

- Local agentic AI development workflows
- LLMOps: deploying, monitoring, and operating agents in production
- Agentic design patterns (tool use, orchestration, evaluation, guardrails)
- Software architecture and systems design

## Local Development

**Prerequisites:** Node ≥ 22.12 (an `astro/.node-version` pins `22`).

The site lives in `astro/`. Run commands from the repo root — the root `package.json`
proxies into `astro/` and pins a Homebrew Node on PATH (the shell default may be older):

```bash
npm run dev       # dev server with live reload → http://localhost:4321
npm run build     # production build → astro/dist/
npm run preview   # serve the built site locally
npm run check     # type + content check (astro check)
npm test          # run the test suite (Vitest)
```

Or work inside `astro/` directly (prefix `PATH=/opt/homebrew/bin:$PATH` if your default
Node is older than 22.12).

> Search (Pagefind) only works against a build, not `npm run dev` — use
> `npm run build && npm run preview` to exercise it.

## Project Structure

```
astro/
├── src/
│   ├── content/blog/     # Blog posts (Markdown, kebab-case filenames)
│   ├── pages/            # Routes + endpoints (RSS, llms.txt, markdown mirrors)
│   ├── layouts/          # Base + markdown layouts
│   ├── lib/              # Pure helpers
│   ├── styles/           # global.css design system
│   └── charts/           # Vega-Lite specs → build-time SVG
├── public/               # Static assets (diagrams, charts, robots.txt)
├── scripts/              # Build-time chart + dev-search helpers
├── test/                 # Vitest suite (unit / content / build / meta)
└── astro.config.mjs      # Astro configuration
```

## Deployment

Vercel builds and deploys automatically on every push to `main` (production); each pull
request gets its own preview URL. The build is fully static — there is no server runtime.

## CI

`.github/workflows/ci.yml` runs on every PR and push to `main`: `astro check`, a production
build, and the Vitest suite (pure functions, content conventions, build-output contracts,
internal-link integrity, and a coverage guard). It gates quality; Vercel handles deploys.

## Tech Stack

- [Astro 7](https://astro.build/) — static output, near-zero client JS
- View transitions via `<ClientRouter />`; search via [Pagefind](https://pagefind.app/)
- Build-time visuals: Mermaid (committed SVGs) + [Vega-Lite](https://vega.github.io/vega-lite/)
- Testing: [Vitest](https://vitest.dev/); CI via GitHub Actions
