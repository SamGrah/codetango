# Astro Reference (v7)

Read this before touching anything in `astro/`. Astro has shipped three breaking majors in under two years, so **model training priors are frequently stale — trust this file and the live docs over remembered APIs.** When uncertain, consult https://docs.astro.build (or wire the official docs MCP server, below).

## Stack & Toolchain

| Item | Value |
|---|---|
| Astro | `^7.0.6` (July 2026), static output |
| Node | **≥ 22.12 required.** The nvm default on this machine is v20 — always prefix commands: `PATH=/opt/homebrew/bin:$PATH` (Homebrew node 25.x) |
| Package manager | npm (`astro/package.json`, lockfile committed) |
| Deploy | Vercel — root directory `astro/`, build `npm run build`, output `dist/` |

Commands (from `astro/`):

```bash
PATH=/opt/homebrew/bin:$PATH npm run build     # static build → dist/
PATH=/opt/homebrew/bin:$PATH npm run preview   # serve dist/ at localhost:4321
PATH=/opt/homebrew/bin:$PATH npx astro dev --background   # agent-friendly dev server
```

`astro dev --background` is the agent-oriented mode (see `astro/CLAUDE.md`): manage with `astro dev stop|status|logs`.

## v7 API Facts (the stale-knowledge trap list)

These all differ from pre-v6 Astro that models remember. Do not "correct" them backwards:

1. **Content config lives at `src/content.config.ts`** — not `src/content/config.ts`.
2. **Collections use the glob loader** (Content Layer API, mandatory): `loader: glob({ pattern: '**/*.md', base: './src/content/blog' })`. The legacy `type: 'content'` collections are gone.
3. **Entry identity is `entry.id`** (filename minus extension). `slug` is a reserved word in schemas and throws; there is no `entry.slug`.
4. **Rendering**: `const { Content } = await render(entry)` with `render` imported from `astro:content`. `entry.render()` no longer exists.
5. **Markdown processor is Sätteri** (Rust) by default — **remark/rehype plugins do not run.** Adding one requires opting back into `@astrojs/markdown-remark`. Avoid this unless truly needed; this project deliberately has no markdown plugins.
6. Dates in frontmatter need `z.coerce.date()`; format them with `timeZone: 'UTC'` (see `src/lib/utils.ts`) or `YYYY-MM-DD` dates shift a day in Montreal time.
7. Shiki dual themes: `markdown.shikiConfig.themes = { light, dark }` + `defaultColor: false` emits `--shiki-light`/`--shiki-dark` CSS variables; `global.css` switches them on `[data-theme="dark"]`.
8. Markdown **pages** (`src/pages/about.md`) still support `layout:` frontmatter — that's how About renders.
9. The v7 compiler hard-errors on unclosed HTML tags — it no longer auto-corrects.

## Project Map (`astro/`)

| Path | Purpose |
|---|---|
| `astro.config.mjs` | site URL, sitemap integration, Shiki dual themes |
| `src/content.config.ts` | blog collection schema — the post frontmatter contract |
| `src/content/blog/*.md` | posts (plain markdown; id = filename = URL slug) |
| `src/layouts/Base.astro` | HTML shell: head/meta/RSS link, header, footer, theme scripts |
| `src/layouts/MarkdownLayout.astro` | wrapper for markdown pages (About) |
| `src/pages/index.astro` | home = post listing |
| `src/pages/blog/[id].astro` | post page (`/blog/<id>/`) |
| `src/pages/about.md` | About page content |
| `src/pages/rss.xml.js` | RSS feed (`/rss.xml`) |
| `src/styles/global.css` | the entire design system — see `visual-style-guide.md` |
| `src/lib/utils.ts` | `formatDate` (UTC), `readingTime` |
| `src/charts/*.vl.json` | Vega-Lite chart specs (source; agent-authored) |
| `src/charts/_theme.mjs` | shared brand theme merged into every chart |
| `scripts/build-charts.mjs` | compiles chart specs → `public/charts/*.svg` |
| `public/diagrams/*.svg` | committed static Mermaid diagrams (see below) |
| `public/charts/*.svg` | generated static charts (gitignored build artifact) |
| `vercel.json` | legacy-URL redirects (old date-based paths, old RSS paths) |

## Post Frontmatter Contract

```yaml
---
title: "Post Title"            # required
synopsis: "One-two sentences." # optional; drives listing excerpt + under-title lede
date: YYYY-MM-DD               # required
author: Sam Graham             # defaults to Sam Graham
tags: ["tag-one"]              # kept as data; no tag pages rendered (yet)
categories: ["Category"]       # kept as data; included in RSS
draft: false                   # true → visible in dev, excluded from prod build + RSS
---
```

No `hide:` block (that was Material), no `<!-- more -->` separator (synopsis replaced it).

## Visuals: pick the right tool

Everything renders to **static SVG at build time** — no client JS, crawlable vector output. Two authoring paths:

| Need | Tool | How |
|---|---|---|
| Flowcharts, sequence, system/relationship diagrams | **Mermaid** | text DSL → SVG |
| Data charts (bar, line, scatter, area, pie…) | **Vega-Lite** | JSON spec → SVG (pipeline below) |
| Diagram where exact node placement matters | hand-authored SVG | Mermaid auto-layout (dagre) is weak at precise placement |

### Mermaid → SVG (kept, build-at-author-time)

Mermaid is not a site dependency — diagrams are rendered to SVG once and committed to `public/diagrams/`, embedded as markdown images (`![alt](/diagrams/name.svg)`). To add/convert one:

```bash
npx -p @mermaid-js/mermaid-cli mmdc -i diagram.mmd -o astro/public/diagrams/name.svg -b transparent
```

Use the teal ramp in `style` directives (see the anatomy post for reference) — auto-layout diagrams without styling render in Mermaid's default lavender, off-brand.

### Vega-Lite → SVG (automated build pipeline)

Charts are compiled from Vega-Lite specs to SVG automatically. To add a chart:

1. Drop a `<name>.vl.json` Vega-Lite spec in `astro/src/charts/`. Author only `data` + `mark` + `encoding` — the brand theme (teal palette, Open Sans, minimal axes) is merged in automatically from `src/charts/_theme.mjs`.
2. Reference the output in a post: `![alt](/charts/<name>.svg)`.
3. It builds automatically (`prebuild`/`predev` hooks run `scripts/build-charts.mjs`); or run `npm run charts` manually.

Generated SVGs land in `public/charts/` and are **gitignored** (build artifacts — regenerated from the committed specs). Deps: `vega` + `vega-lite` (devDependencies only — nothing ships to the client). Charts get the same dark-mode light-panel CSS treatment as diagrams (`img[src^="/charts/"]`), so keep chart text/marks dark-on-transparent. To recolor globally, edit `_theme.mjs`; to override one chart, add a `config` block to its spec (spec config wins).

## The JS Budget (near-zero: one deliberate bundle)

The site ships exactly **one** global client bundle: Astro's `<ClientRouter/>` (~5.4 KB gzipped), added in `Base.astro` to guarantee smooth page transitions in every browser (native cross-document view transitions were skipped intermittently — measured 0/4; ClientRouter fires reliably). The **only other JS** is the Pagefind search bundle (`dist/pagefind/`), generated post-build and loaded **exclusively on `/search/`** — every other page stays at ClientRouter-only. The two inline theme scripts aren't bundles. Treat this as the ceiling — any *further* script must clear a real bar, and interactivity belongs in explicitly-hydrated islands (`client:*`), never global scripts. Verify after any change:

```bash
find dist -name '*.js' -not -path '*/pagefind/*' | wc -l    # must print 1 (ClientRouter only)
```

A count above 1 means an unintended bundle crept in (e.g. an accidentally-hydrated component).

## Search (Pagefind 1.5 Component UI — header modal, MkDocs-style)

One site-wide search field: the header magnifier button (or **⌘K/Ctrl+K**) opens a `<pagefind-modal>` with live-as-you-type results. No search page (a redirect stub remains at `src/pages/search.astro`; deletable).

- Index is built post-build: `postbuild: pagefind --site dist` (devDependency `pagefind`). Works in `npm run build && npm run preview` and prod — **not in `npm run dev`** (no built HTML to index; the header icon is inert there and the component assets 404 harmlessly).
- Indexing is scoped by `data-pagefind-body` on the post article (`blog/[id].astro`) and About (`MarkdownLayout.astro`) — pages without it are excluded, and chrome is never indexed.
- Wiring (all in `Base.astro`): component CSS + module script in the head on every page (small and idle; the index lazy-loads on first keystroke); `<pagefind-modal reset-on-close>` in the body; our own `#search-open` icon button + a mod+K keydown handler call `modal.open()` via the **delegated-on-document** pattern (survives ClientRouter swaps — verified: modal re-upgrades and works after client-side navigations). We deliberately don't use `<pagefind-modal-trigger>` (own icon = full styling control).
- Theming: `--pf-*` custom properties on `body` in `global.css` map to site tokens (flip automatically with `[data-theme]`), plus an explicit `mark` rule — the component's default highlight color is near-black and invisible on the dark ink. Backdrop via `--pf-modal-backdrop` (separate dark value).
- Known quirk (harmless): after a ClientRouter swap + native-ESC close, the component's `isOpen` getter can go stale. Never gate on `isOpen` — call `.open()` unconditionally (the click handler already does).
- Do **not** use the legacy `PagefindUI` (`pagefind-ui.js`) API — 1.5's Component UI replaces it. Component guide: https://pagefind.app/llms-component-ui.txt

**ClientRouter consequence — swaps replace `<body>`.** Element-bound listeners die after the first client navigation. Bind chrome interactivity by **delegation on `document`** (which persists) or re-bind on the `astro:page-load` event. The theme toggle already does this (delegated click on `document`); follow that pattern for anything new. The `<html>` element persists across swaps, so `data-theme` carries over with no flash.

## Docs MCP (recommended)

Astro publishes an official docs MCP server (replaces their deleted llms.txt). To ground agents in current APIs:

```bash
claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp
```

Setup reference: https://docs.astro.build/en/guides/build-with-ai/

## Legacy URL Redirects

Old MkDocs URLs are mapped in `astro/vercel.json`: date-based post paths (`/blog/YYYY/MM/DD/slug/`) → `/blog/slug/` (the anatomy post's title-derived slug has an explicit entry), `/blog/` → `/`, category/archive pages → `/`, `feed_rss_created.xml`/`feed_rss_updated.xml` → `/rss.xml`, `sitemap.xml` → `/sitemap-index.xml`. If a post file is ever renamed, add a redirect.
