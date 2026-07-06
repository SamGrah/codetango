# Visual Style Guide

> **Status (July 2026):** the design is migrating to the Astro implementation in `astro/` (source of truth: `astro/src/styles/global.css` + `astro/src/layouts/Base.astro`). The **Design Principles, Brand, diagram palette, and Motion rules below carry over unchanged**. Material-specific sections (Layout & Chrome regimes, CSS/JS Architecture, the mermaid pipeline) describe the legacy MkDocs site only. Astro-era deltas are listed in "Astro Implementation" at the end of this file.

Read this before changing CSS, JavaScript, template overrides, or theme configuration. This documents the visual design language as implemented — for the legacy site: `docs/stylesheets/extra.css`, `docs/javascripts/extra.js`, `overrides/`, and the `theme:` block of `mkdocs.yml`. Update this file when the design changes.

Companion files: `authors-voice.md` (prose voice), `post-formatting.md` (content structure), `mkdocs-reference.md` (config catalog), `deployment.md` (preview workflow).

## Design Principles

1. **Content-first minimalism.** Chrome recedes: no logo icon, no sidebars, no generator notice, footer reduced to prev/next + social icons. The page is the post.
2. **Simply rendered HTML.** The site compiles to static HTML and must stay fast on slow connections and trivially crawlable by agents. Every byte of JS/CSS must earn its place.
3. **Low-key enhancement.** Features are quiet: subtle transitions (120–300 ms), no layout shift, `prefers-reduced-motion` always respected. Nothing animates for animation's sake.
4. **Calibration reference:** [savvycal.com/articles](https://savvycal.com/articles/) — the *level* of restraint to emulate (single column, title + excerpt + date, nothing else competing for attention). Not a template to copy.

## Brand

- Wordmark: **codeTango** — text only, no logo. Weight 900, 1.3rem, rendered in the header (and only there).
  - `code` — italic, `#0F3328` (near-black green)
  - `Tango` — `#E0F2F1` (teal-50)
- The wordmark spans are injected by `styleSiteName()` in `extra.js`; the Material logo button is hidden in CSS. Do not reintroduce a logo icon.

## Color System

Theme: Material `default` scheme (light) / `slate` scheme (dark), primary `teal`, three-state toggle (auto → light → dark). Use Material variables (`--md-primary-fg-color`, `--md-primary-bg-color`, …) for anything theme-aware; hardcode hex only for the brand marks above. Dark-mode-specific overrides target `[data-md-color-scheme="slate"]`.

| Role | Value |
|---|---|
| Primary / header | Material `teal` (`#009688` family) |
| Dark scheme | `slate` |
| Post synopsis (light) | `rgba(0, 0, 0, 0.56)` |
| Post synopsis (dark) | `rgba(236, 239, 241, 0.82)` |

**Diagram palette** — Mermaid diagrams use the Material teal ramp exclusively. Established pairings (from published posts):

| Fill | Text | Stroke | Use |
|---|---|---|---|
| `#004D40` (teal-900) | `#E0F2F1` | `#00332A` | darkest step / terminal states |
| `#00695C` (teal-800) | `#E0F2F1` | `#004D40` | dark step |
| `#009688` (teal-500) | `#E0F2F1` | `#00695C` | mid step |
| `#4DB6AC` (teal-300) | `#004D40` | `#009688` | light step |
| `#B2DFDB` (teal-100) | `#004D40` | `#80CBC4` | lightest step / initial states |

Sequential meaning: light → dark encodes progression (see the task-lifecycle diagram in `anatomy-of-an-agentic-dev-setup.md`). Do not introduce non-teal hues into diagrams without approval.

## Typography

- **Font:** Open Sans (set via `theme.font.text`), all weights from Google Fonts. Material's default type scale applies (~16px effective body).
- **Wordmark:** 1.3rem / 900.
- **Post synopsis:** 0.87em, italic, muted (see colors above).
- **Header tabs (mid-width in-header variant):** 0.84rem / 400; active = 500, full opacity.
- **Mobile drawer links:** 0.95rem / 400; active = 500.
- Headings inside posts: H2/H3 only — the frontmatter title renders as H1 (see `post-formatting.md`).

## Layout & Chrome

- **Content grid:** `.md-grid { max-width: 900px }` — the single most important layout decision. One centered column.
- **Sidebars:** both `.md-sidebar--primary` and `.md-sidebar--post` are `display: none` at all widths. Navigation happens exclusively through the two header tabs (About, Posts).
- **Header:** left-aligned (no logo padding), brand always visible, stable across navigation (duplicate topic suppressed). `scrollbar-gutter: stable` on `html` prevents shift when page height changes.
- **Per-page chrome hiding via frontmatter:** posts hide `navigation` + `toc`; About and the blog index also hide `footer`. The About page's H1 is hidden by the `ct-hide-about-title` body class (applied by JS when the path matches `/about/`).

**Responsive regimes** (breakpoints mirror Material's):

| Range | Behavior |
|---|---|
| > 76.234375em | Tabs bar below header (default placement) |
| 60em – 76.234375em | Tabs bar shown as block below header |
| 37.5001em – 59.984375em | Tabs moved *into* the header, absolutely centered (`syncTabsPlacement()` + `.md-tabs--in-header`); search collapses to icon with a "ghost" shrink animation |
| ≤ 37.5em | Tabs hidden; custom pure-CSS hamburger (two bars morphing to an X) opens `ct-mobile-drawer` — a JS-built panel that slides from under the header, closes on scroll, link click, or search open |

## Motion

All motion is subtle and gated behind `@media (prefers-reduced-motion: no-preference)` where it spans surfaces.

| Effect | Timing |
|---|---|
| Theme switch cross-fade (`--ct-theme-transition`, applied to body, header, content, nav, icons…) | 220 ms ease |
| Mobile drawer open/close | max-height 300 ms `cubic-bezier(0.22, 1, 0.36, 1)`, opacity 240 ms ease |
| Hamburger → X morph | 180 ms ease |
| Search ghost collapse (resize crossing into mid-width) | 180 ms ease |
| Mermaid reveal (pending → ready) | opacity 120 ms linear |

Rules: nothing longer than ~300 ms; transitions cover color/background/border/shadow/fill/stroke — never `all`; no motion that causes layout shift.

## Components

**Post synopsis.** Frontmatter `synopsis:` is the canonical excerpt. It renders in two places: on the listing card (`overrides/partials/post.html` — replaces body-excerpt rendering) and under the post title (`overrides/blog-post.html` injects it; JS repositions it directly after the H1). Keep `<!-- more -->` in the post body anyway — the blog plugin still uses it to delimit excerpts internally.

**Mermaid pipeline** (fully custom — the `mermaid2` plugin is *not* used):
1. Build time: the custom superfences formatter (`overrides/mermaid_fence.py`) emits `<pre class="ct-mermaid"><code>…escaped source…</code></pre>` — deliberately *not* `class="mermaid"`, so Material's bundled v10 renderer ignores it.
2. Runtime: `extra.js` lazy-loads Mermaid **v11.13.0** as an ESM module from unpkg (with `modulepreload` priming), renders each block, and swaps in the SVG. Pending blocks reserve 9rem height at opacity 0; ready blocks fade in centered.
3. `venn-beta` diagrams get special handling: viewBox zoomed to 0.75×, forced font sizes (15px, 12px italic for intersection labels), fixed 613px height via `.ct-mermaid--venn`.
4. Render failure falls back to the escaped code block — a broken diagram never breaks the page.

**Code blocks.** Highlighted at build time by Pygments (`pymdownx.highlight`) — zero runtime JS. Language classes and anchor line-numbers are enabled.

**Search.** Material's built-in client-side search with highlight/share/suggest. This is the heaviest JS feature on the site; treat it as the ceiling for acceptable feature weight.

## CSS Architecture

- One file: `docs/stylesheets/extra.css`, loaded after the theme.
- Custom classes use the **`ct-` prefix** (`ct-post-synopsis`, `ct-mobile-drawer`, `ct-mermaid`, `ct-search-ghost`, …). Anything unprefixed is a Material override.
- `!important` is tolerated only when overriding Material's own specificity (sidebar hiding, drawer button, nav-title flattening) — never on `ct-` classes.
- Theme-aware colors come from Material CSS variables; dark deltas via `[data-md-color-scheme="slate"]`.

## JS Architecture

- One file: `docs/javascripts/extra.js`, vanilla ES — no frameworks, no build step. External deps only as version-pinned ESM CDN imports (currently `mermaid@11.13.0`).
- Entry point: `document$.subscribe(...)` — Material's observable that fires on initial load *and* after each navigation.
- **Custom instant navigation:** same-origin link clicks are intercepted, the target is fetched, and `.md-container` (+ tabs) is swapped in place — Material's `navigation.instant` is deliberately commented out in `mkdocs.yml` because it conflicts with this. Any new per-page enhancement must be invoked from **both** the `document$` subscription and the post-swap sequence in `navigateInternal()`, or it will silently stop working after the first in-site navigation.
- Current behavior inventory: wordmark styling, internal-link normalization, mobile drawer build/teardown, tabs placement sync, search collapse animation, Mermaid render + stabilize, synopsis repositioning, About-title hiding.

## Verification Checklist (any visual change)

1. Serve locally with `./venv/bin/python -m mkdocs serve --livereload` — **must be `python -m mkdocs`**, not bare `mkdocs`: the custom fence imports `overrides.mermaid_fence`, which requires the project root on `sys.path`.
2. Check **light, dark, and the auto state** — cycle the three-state toggle; confirm the 220 ms cross-fade stays smooth.
3. Check all four responsive regimes (wide / 60–76em / 37.5–60em / mobile drawer).
4. Navigate About → Posts → a post → back **without full reloads**: wordmark intact, tabs active-state correct, Mermaid re-renders.
5. Open the anatomy post — it exercises all three diagram types (`venn-beta`, `flowchart`, `block-beta`).
6. Confirm no scrollbar-induced layout shift and sane behavior under `prefers-reduced-motion: reduce`.
7. For anything non-trivial, do a browser preview per `deployment.md` (`open -a "Google Chrome" <url>` — Chrome is not the default browser).

## Astro Implementation (July 2026)

Source of truth: `astro/src/styles/global.css` (all tokens) + `astro/src/layouts/Base.astro` (chrome). Deltas from the Material era:

**Chrome went quiet.** No teal header bar — header and page share the background, separated by whitespace; footer by a hairline border. The teal identity lives in the wordmark, links, and accents instead of a painted bar.

**Dark mode is deep teal ink, not neutral charcoal.** The background (`--bg: #0a1a1e`) is a committed, saturated teal-ink — deliberately brand-colored rather than a muddy green-gray. It is the dark-mode signature: everything else stays quiet so the ink and the glowing accent carry the mood. Light mode remains a clean white (`#ffffff`) — the two modes share the teal *identity* but not the same trick (bright accent-on-ink reads differently from ink-accent-on-white). Full dark token set lives in `global.css`; the load-bearing ones:

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

**Accent shifted one step for contrast.** Links/accents are `#00796B` (teal-700) on light and `#5ED4C5` (bright aqua-teal) on dark — `#009688` (teal-500) fails AA contrast on white and is no longer used for text. The diagram palette section above is unchanged (SVGs carry it).

**Layout.** Single 42rem (~672px) column for everything — header, content, footer (was: 900px Material grid). Body 17px Open Sans Variable / 1.7, self-hosted via Fontsource (the Google Fonts request is gone).

**Motion.** The 220 ms theme cross-fade carries over (CSS-only, reduced-motion-gated). Page transitions are a **160 ms root cross-fade** driven by Astro's `<ClientRouter/>` (in `Base.astro`), which calls `startViewTransition()` on every navigation — reliable in all browsers. This replaced a native cross-document `@view-transition` opt-in that the browser skipped intermittently (measured 0/4 navigations firing); ClientRouter fires 3/3. The bare `@view-transition` rule is kept as a no-JS fallback. Duration/curve live in `global.css` under `::view-transition-old/new(root)`; reduced-motion disables it (both via the CSS `@media` block and ClientRouter's own respect for the preference).

**Toggle must survive swaps.** Because `<ClientRouter/>` swaps the `<body>`, any element-bound listener dies after the first navigation. The theme toggle is therefore a **delegated** listener on `document` (which persists across swaps); the `<html>` element also persists, so `data-theme` carries over with no flash. Any future interactive control added to the chrome must follow the same pattern (delegate on `document`, or re-bind on `astro:page-load`).

**Components.** Listing row = title / synopsis / `date · N min read`. Post = title / italic synopsis lede / meta line. Code blocks are Shiki dual-theme (`github-light`/`github-dark`) switched by `[data-theme]` — but in dark mode the block panel is overridden from Shiki's neutral `#24292e` to the teal `--code-bg` (spans forced transparent) so code belongs to the palette; Shiki's syntax *colors* are kept.

**Visuals (all static SVG, build-time, no client JS).** Two paths, both embedded as markdown images and both getting the same dark-mode light panel (`#EEF4F2`, 10px radius; the CSS targets `img[src^="/diagrams/"]` and `img[src^="/charts/"]`), so author them dark-on-transparent:
- *Diagrams* — Mermaid → committed SVG in `public/diagrams/`. Style with the teal ramp (unstyled Mermaid renders off-brand lavender). Best for flowcharts/relationships; weak at precise placement.
- *Data charts* — Vega-Lite JSON spec in `src/charts/*.vl.json` → generated SVG in `public/charts/` via `scripts/build-charts.mjs` (auto on `prebuild`/`predev`, or `npm run charts`). The teal palette + Open Sans + minimal-axis look is applied automatically from `src/charts/_theme.mjs`, so specs stay data-only. See `astro-reference.md` → "Visuals" for the full workflow.

**Feature budget (near-zero JS).** The site ships exactly **one** client bundle: `<ClientRouter/>` (~5.4 KB gzipped), the deliberate exception taken to guarantee smooth page transitions in every browser. Everything else stays JS-free — the two inline theme scripts don't count as bundles. Treat this as the ceiling: `find dist -name '*.js'` should return **1** (the ClientRouter chunk), and any further script must clear a real bar. Search was removed (Pagefind is the sanctioned path if it earns its way back). Theme toggle is a binary override persisted to localStorage; system preference is the default until first click. Tag/category pages are not rendered (data preserved in frontmatter + RSS).

**Verification (Astro era).** `PATH=/opt/homebrew/bin:$PATH npm run build && npm run preview` from `astro/`, curl the pages, then: `find dist -name '*.js' | wc -l` must print `1` (ClientRouter only — a higher number means an unintended bundle crept in); check both themes and reduced-motion; confirm page transitions fire on consecutive navigations (instrument `astro:before-swap` → `viewTransition: true`) and the theme toggle still works after a navigation; confirm diagrams on the anatomy post.
