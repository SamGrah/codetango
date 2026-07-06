# Visual Style Guide

Read this before changing CSS, JavaScript, components, or theme configuration. Source of
truth: `astro/src/styles/global.css` (all design tokens) + `astro/src/layouts/Base.astro`
(chrome). Update this file when the design changes.

Companion files: `authors-voice.md` (prose voice), `post-formatting.md` (content structure),
`astro-reference.md` (framework facts + visuals workflow), `deployment.md` (preview workflow).

## Design Principles

1. **Content-first minimalism.** Chrome recedes: no logo icon, no sidebars, footer reduced
   to social icons. The page is the post.
2. **Simply rendered HTML.** The site compiles to static HTML and must stay fast on slow
   connections and trivially crawlable by agents. Every byte of JS/CSS must earn its place.
3. **Low-key enhancement.** Features are quiet: subtle transitions (120–300 ms), no layout
   shift, `prefers-reduced-motion` always respected. Nothing animates for animation's sake.
4. **Calibration reference:** [savvycal.com/articles](https://savvycal.com/articles/) — the
   *level* of restraint to emulate (single column, title + excerpt + date, nothing else
   competing for attention). Not a template to copy.

## Brand

- Wordmark: **codeTango** — text only, no logo, rendered in the header (and only there).
  Hardcoded in `Base.astro` as `<em>code</em><span>Tango</span>`; colored via the
  `--wordmark-code` / `--wordmark-tango` tokens (do not hardcode hex). Do not reintroduce a
  logo icon.
- The teal identity lives in the wordmark, links, and accents — not a painted header bar.

## Color System

Theme is a token system in `global.css`, switched by `[data-theme]` on `<html>` (a binary
light/dark toggle persisted to `localStorage`; system preference is the default until first
click). Use the tokens for anything theme-aware; never hardcode theme colors.

**Dark mode is deep teal ink, not neutral charcoal.** `--bg: #0a1a1e` is a committed,
saturated teal-ink — deliberately brand-colored. It's the dark-mode signature: everything
else stays quiet so the ink and the glowing accent carry the mood. Light mode is clean white
— the two modes share the teal *identity* but not the same trick (bright accent-on-ink reads
differently from ink-accent-on-white). The load-bearing tokens:

| Token | Light | Dark | Note |
|---|---|---|---|
| `--bg` | `#ffffff` | `#0a1a1e` | dark = deep teal ink |
| `--text` | `#1f2a27` | `#dbeae7` | dark = soft foam-white |
| `--text-muted` | `#5f6f6b` | `#83a5a1` | ~6:1 on ink |
| `--accent` (links) | `#00796b` | `#5ed4c5` | dark = vivid aqua-teal, ~10:1 on ink |
| `--wordmark-code` (italic "code") | `#0f3328` | `#c2e4dd` | the anchor |
| `--wordmark-tango` ("Tango") | `#00796b` | `#5ed4c5` | the pop |
| `--border` | `#e4eae8` | `#17383d` | teal-tinted hairline |
| `--code-bg` (inline) | `#f4f7f6` | `#0e2a2f` | raised teal surface |

`#009688` (teal-500) fails AA contrast on white and is **not** used for text — links/accents
are `#00796b` (teal-700) light / `#5ed4c5` dark.

**Diagram palette** — Mermaid diagrams use the teal ramp exclusively (unstyled Mermaid
renders off-brand lavender). Established pairings, from published posts:

| Fill | Text | Stroke | Use |
|---|---|---|---|
| `#004D40` (teal-900) | `#E0F2F1` | `#00332A` | darkest step / terminal states |
| `#00695C` (teal-800) | `#E0F2F1` | `#004D40` | dark step |
| `#009688` (teal-500) | `#E0F2F1` | `#00695C` | mid step |
| `#4DB6AC` (teal-300) | `#004D40` | `#009688` | light step |
| `#B2DFDB` (teal-100) | `#004D40` | `#80CBC4` | lightest step / initial states |

Sequential meaning: light → dark encodes progression (see the task-lifecycle diagram in
`anatomy-of-an-agentic-dev-setup.md`). Do not introduce non-teal hues without approval.

## Typography

- **Font:** Open Sans Variable, self-hosted via `@fontsource-variable/open-sans` (no external
  font request). Body 17px / line-height 1.7.
- **Wordmark:** heavy weight, header only.
- **Post synopsis / lede:** italic, muted (`--text-muted`).
- Headings inside posts: H2/H3 only — the frontmatter title renders as the H1.

## Layout & Chrome

- **Single ~42rem (~672px) column** for everything — header, content, footer. One centered
  column, no sidebars.
- **Quiet chrome.** Header and page share the background, separated by whitespace; the footer
  by a hairline `--border`. No teal bar. Header carries the wordmark, Posts/About links, a
  search icon, and the theme toggle.
- Navigation is the two header links + the Pagefind search modal.

## Motion

All motion is subtle and gated behind `@media (prefers-reduced-motion: no-preference)` where
it spans surfaces. Nothing longer than ~300 ms; transitions cover
color/background/border/shadow/fill/stroke — never `all`; no motion that causes layout shift.

| Effect | Timing |
|---|---|
| Theme switch cross-fade (CSS-only, applied to body/header/content/nav/icons) | 220 ms ease |
| Page transition (root cross-fade via `<ClientRouter/>`) | 160 ms |
| Search modal + results entrance | ~165–230 ms, `cubic-bezier(0.22, 1, 0.36, 1)` |

**Page transitions** are driven by Astro's `<ClientRouter/>` (in `Base.astro`), which calls
`startViewTransition()` on every navigation — reliable in all browsers (a native
cross-document `@view-transition` opt-in was skipped intermittently; ClientRouter fires
3/3). Duration/curve live in `global.css` under `::view-transition-old/new(root)`;
reduced-motion disables it.

## Components

- **Listing row** = title / synopsis / `date · N min read`.
- **Post** = title / italic synopsis lede / meta line.
- **Code blocks** = Shiki dual-theme (`github-light`/`github-dark`), switched by
  `[data-theme]`. In dark mode the block panel is overridden from Shiki's neutral `#24292e`
  to the teal `--code-bg` (spans forced transparent) so code belongs to the palette — Shiki's
  syntax *colors* are kept.
- **Search** = Pagefind Component UI header modal (magnifier or ⌘K / `/`), live-as-you-type,
  themed to site tokens incl. the accent `mark` highlight. Details in `astro-reference.md` →
  Search.

## Visuals (all static SVG, build-time, no client JS)

Two paths, both embedded as markdown images and both getting a dark-mode light panel
(`#EEF4F2`, 10px radius; CSS targets `img[src^="/diagrams/"]` and `img[src^="/charts/"]`) —
so author them dark-on-transparent:

- **Diagrams** — Mermaid → committed SVG in `astro/public/diagrams/`. Style with the teal
  ramp above. Best for flowcharts/relationships; weak at precise placement.
- **Data charts** — Vega-Lite JSON spec in `astro/src/charts/*.vl.json` → generated SVG in
  `astro/public/charts/` via `scripts/build-charts.mjs` (auto on `prebuild`/`predev`, or
  `npm run charts`). The teal palette + Open Sans + minimal-axis look is applied
  automatically from `src/charts/_theme.mjs`, so specs stay data-only. See
  `astro-reference.md` → Visuals for the full workflow.

## Architecture & the JS budget

- **CSS:** one file, `astro/src/styles/global.css` — all tokens + component styles. Custom
  classes use the `ct-`/semantic naming already present; theme-aware colors come from tokens,
  dark deltas via `[data-theme="dark"]`.
- **Near-zero JS — two deliberate exceptions, everything else JS-free:** (1) `<ClientRouter/>`
  (~5.4 KB gzipped, global) for guaranteed-smooth page transitions; (2) Pagefind search (its
  component script idles in the head site-wide, index lazy-loads on first keystroke). Budget
  check: `find dist -name '*.js' -not -path '*/pagefind/*' | wc -l` = **1** — enforced by
  `test/build/js-budget.test.ts`. Any further script must clear a real bar.
- **ClientRouter swaps `<body>`**, so element-bound listeners die after the first navigation.
  Bind chrome interactivity by **delegation on `document`** (which persists), or re-bind on
  `astro:page-load`. The `<html>` element persists but ClientRouter copies the incoming
  document's attributes — so `data-theme` is re-applied on `astro:after-swap` (see
  `astro-reference.md`). Any new interactive control must follow these patterns.

## Verification Checklist (any visual change)

1. `npm run build && npm run preview` from `astro/` (prefix `PATH=/opt/homebrew/bin:$PATH`).
   Search and diagrams need a build — they don't work under `npm run dev`.
2. Check **light and dark** — cycle the toggle; confirm the 220 ms cross-fade stays smooth.
3. Navigate About → Posts → a post → back: wordmark intact, link active-state correct, theme
   choice persists across the swap, page transition fires on consecutive navigations.
4. Open the anatomy post — it exercises the diagram styling; confirm the dark-mode light
   panel behind each SVG.
5. Confirm no scrollbar-induced layout shift and sane behavior under
   `prefers-reduced-motion: reduce`.
6. `find dist -name '*.js' -not -path '*/pagefind/*' | wc -l` prints **1** (or `npm test`,
   which asserts it).
7. For anything non-trivial, browser-preview per `deployment.md` (`open -a "Google Chrome"
   <url>` — Chrome is not the default browser).
