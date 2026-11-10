---
name: CodeTango Visual Style Guide
description: Read before changing CSS, JavaScript, Astro components, layouts, or theme. Design principles, color tokens and diagram palette, typography, layout, motion rules, and the visual verification checklist.
---

# Visual Style Guide

Read this before changing CSS, JavaScript, components, or theme configuration. Source of
truth: `astro/src/styles/global.css` (all design tokens) + `astro/src/layouts/Base.astro`
(chrome). Update this file when the design changes.

Companion files: the `authors-voice` skill (prose voice), the `post-formatting` skill (content structure),
the `astro-reference` skill (framework facts + visuals workflow), the `deployment` skill (preview workflow).

## Design Principles

The design is **Modular Poster**: a restrained Swiss/Bauhaus poster system. Flat colour
fields sit on a modular grid around a calm, centred reading column.

1. **The reading column is sacred.** Post text sits in one centred ~44rem column with no
   texture, fields, or decoration behind it. Composition happens around it, never in it.
2. **Colour fields carry the character.** Boldness comes from a few flat geometric fields
   (teal slab, ink bar, ochre disc), not from big chrome type, gradients, cards, or shadows.
   Fields are decorative (`aria-hidden`) and never sit behind body text.
3. **Simply rendered HTML.** The site compiles to static HTML and must stay fast on slow
   connections and trivially crawlable by agents. Every byte of JS/CSS must earn its place.
4. **Low-key enhancement.** Motion is short (≤300 ms), never shifts layout, and always
   respects `prefers-reduced-motion`.

## Brand

- Wordmark: **codeTango**, text only and no logo, in the header (and only there).
  Hardcoded in `Base.astro` as `<em>code</em><span>Tango</span>`. "code" is **always italic**.
  Colour comes from the `--wm-code` / `--wm-tango` tokens (don't hardcode hex). Don't
  reintroduce a logo icon, and keep the wordmark at a normal, confident size: giant
  decorative wordmarks read as gaudy.
- Teal leads the brand. Ink and ochre are its two supporting field colours.
- The theme toggle is the sun/moon icon button (sun in light, moon in dark, one click
  flips the theme). The footer always uses the icon links (RSS, GitHub, LinkedIn) and always
  keeps the Pied Piper hat link. Never replace these with text labels or a custom control.

## Color System

Theme is a token system in `global.css`, switched by `[data-theme]` on `<html>` (a binary
light/dark toggle persisted to `localStorage`; system preference is the default until first
click). Use the tokens for anything theme-aware; never hardcode theme colors.

| Token | Light | Dark | Note |
|---|---|---|---|
| `--paper` | `#ffffff` | `#0b1b20` | page background; dark = deep teal night |
| `--text` | `#172a2f` | `#dce9e6` | |
| `--muted` | `#56676a` | `#8ea9a4` | meta, synopses, footer |
| `--link` | `#00756a` | `#5ed4c5` | link text, AA on the page |
| `--link-strong` | `#00695c` | `#8fe4d9` | link hover, search highlight |
| `--field-teal` | `#0e7c70` | `#1f8a7c` | teal slab, rule slab, code-block edge, footer bar |
| `--field-two` | `#1a3238` | `#9db5b0` | ink bar / column block, footer circle |
| `--ochre` | `#c9962b` | `#d6a440` | accent: disc, H2 squares, active nav, quote edge, selection, footer circle |
| `--on-field` | `#ffffff` | `#f4fbf9` | text on a painted field (home "Posts", quotes) |
| `--quote-field` | `#0e7c70` | `#136a60` | blockquote background (AA with `--on-field`) |
| `--code-bg` | `#f1f5f4` | `#102a30` | inline code and code-block panel |
| `--rule` | `#dde5e3` | `#1b3a40` | hairlines, table borders |
| `--wm-code` / `--wm-tango` | `#172a2f` / `#00756a` | `#c2e4dd` / `#5ed4c5` | wordmark |

**Ochre is an approved accent, for shapes only.** It fails contrast as text (~2.6:1 on
white), so use it on fields, rules, markers, and highlights, never on text or links. Don't add
further hues without approval.

**Diagram palette.** Mermaid diagrams and Vega-Lite charts stay **teal-only**: ochre is a
site accent, not a data colour. Unstyled Mermaid renders off-brand lavender. Established pairings, from published posts:

| Fill | Text | Stroke | Use |
|---|---|---|---|
| `#004D40` (teal-900) | `#E0F2F1` | `#00332A` | darkest step / terminal states |
| `#00695C` (teal-800) | `#E0F2F1` | `#004D40` | dark step |
| `#009688` (teal-500) | `#E0F2F1` | `#00695C` | mid step |
| `#4DB6AC` (teal-300) | `#004D40` | `#009688` | light step |
| `#B2DFDB` (teal-100) | `#004D40` | `#80CBC4` | lightest step / initial states |

Sequential meaning: light → dark encodes progression (see the task-lifecycle diagram in
`anatomy-of-an-agentic-dev-setup.md`).

## Typography

- **Font:** Familjen Grotesk Variable, self-hosted via `@fontsource-variable/familjen-grotesk`
  (upright + italic; no external font request). It is the only family; code uses the
  system monospace stack (`--font-mono`), which has reliable box-drawing glyphs.
- Base 18px / 1.65. Post body 19px / 1.7 on the 44rem measure (18px / 1.65 below 46rem).
- Titles: weight 650, tight negative tracking, flush left. Listing titles up to 3.6rem, the
  post title up to 4.6rem.
- **Post synopsis / lede:** italic, muted.
- Headings inside posts: H2/H3 only. The frontmatter title renders as the H1.

## Layout & Chrome

- **The module grid** (`.grid`): 12 columns (6 below 46rem), max 82rem, `--pad` side padding.
  Header, footer, the home band, and listing entries sit on it.
- **Header:** wordmark left; Posts/About, search icon, and theme toggle right. The active
  nav link gets an ochre underline. It shares the page background (no painted bar).
- **Home:** a band of three fields (a teal slab holding the visible "Posts" H1, an ink bar, an
  ochre quarter-disc), then entries with the date on columns 1–2, a big flush-left title
  and synopsis on 3–9, and category, read time, and tags on 11–12.
- **Post / About:** the head shares the reading column's left edge. An ink column block
  fills the left margin, an ochre disc sits in the right margin (hidden below 62rem), and a
  teal rule slab closes the head. The body is the centred 44rem `.prose` column.
- **Footer:** an accent strip (teal rectangle, ink circle, ochre circle), then the copyright
  line and the icon links.

## Motion

All motion is subtle and gated behind `@media (prefers-reduced-motion: no-preference)`.
Nothing longer than ~300 ms; transitions cover colour/background/border, never `all`;
no motion causes layout shift.

| Effect | Timing |
|---|---|
| Theme switch cross-fade | 220 ms ease |
| Page transition (root cross-fade via `<ClientRouter/>`) | 160 ms |
| Fields paint in (slabs wipe, bars rise, discs grow; transform only) | 240 ms, 0–60 ms stagger, `cubic-bezier(0.22, 1, 0.36, 1)`; replays on every navigation by design |
| Search modal + results entrance | ~165–230 ms, `cubic-bezier(0.22, 1, 0.36, 1)` |

**Page transitions** are driven by Astro's `<ClientRouter/>` (in `Base.astro`), which calls
`startViewTransition()` on every navigation — reliable in all browsers (a native
cross-document `@view-transition` opt-in was skipped intermittently; ClientRouter fires
3/3). Duration/curve live in `global.css` under `::view-transition-old/new(root)`;
reduced-motion disables it.

## Components

- **Listing entry** = date / title / synopsis / category + read time / tags, on the grid.
- **Post head** = title / italic synopsis lede / meta (author, date, read time, category) /
  tags, with the column block, disc, and rule slab. Keep meta plain: no boxed metadata,
  and no reading-time bars or other meta widgets.
- **Blockquote** = a solid `--quote-field` with `--on-field` text and an ochre left edge. On wide
  screens it extends `--quote-bleed` into the margins while its text stays on the column edges.
- **H2** = an ochre square hangs in the left margin on wide screens (≥64rem).
- **Code blocks** = Shiki dual-theme (`github-light`/`github-dark`), switched by
  `[data-theme]`. The panel is overridden to `--code-bg` in both themes, with a teal left edge
  (spans forced transparent), so code belongs to the palette. Shiki's syntax *colours* are kept.
- **Search** = Pagefind Component UI header modal (magnifier or ⌘K / `/`), live-as-you-type,
  themed to site tokens incl. the `mark` highlight. Details in the `astro-reference` skill →
  Search.

## Visuals (all static SVG, build-time, no client JS)

Two paths, both embedded as markdown images and both getting a dark-mode light panel
(`#EEF4F2`, 10px radius; CSS targets `img[src^="/diagrams/"]` and `img[src^="/charts/"]`) —
so author them dark-on-transparent:

- **Diagrams** — Mermaid → committed SVG in `astro/public/diagrams/`. Style with the teal
  ramp above. Best for flowcharts/relationships; weak at precise placement.
- **Data charts** — Vega-Lite JSON spec in `astro/src/charts/*.vl.json` → generated SVG in
  `astro/public/charts/` via `scripts/build-charts.mjs` (auto on `prebuild`/`predev`, or
  `npm run charts`). The teal palette + Familjen Grotesk + minimal-axis look is applied
  automatically from `src/charts/_theme.mjs`, so specs stay data-only. See
  the `astro-reference` skill → Visuals for the full workflow.

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
  the `astro-reference` skill). Any new interactive control must follow these patterns.

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
7. For anything non-trivial, browser-preview per the `deployment` skill (Playwright MCP
   browser tools: navigate, toggle theme, screenshot).
