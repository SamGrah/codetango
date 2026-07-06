# Deployment & Development Workflow

> **Stack: Astro 7 (in `astro/`), deployed on Vercel as static HTML.**
> Read `.claude/instructions/astro-reference.md` before build/deploy work.

## How production deploys work

**Host: Vercel, native Git integration.** Vercel is connected to the GitHub repo and
auto-builds on every push to `main`; every branch/PR gets its own **preview deploy** URL.
There is no deploy script and no GitHub Actions deploy — pushing is the deploy.

- **Root Directory:** `astro/` (Vercel builds the Astro app, not the repo root)
- **Framework preset:** Astro (auto-detected)
- **Build command:** `npm run build` — runs `prebuild` (compiles Vega-Lite charts →
  `public/charts/*.svg`) then `astro build`
- **Output directory:** `dist/`
- **Install:** `npm ci` (Vercel installs devDependencies during the build, so the
  `vega`/`vega-lite` chart tools are available)
- **Node:** pinned to 22 via `astro/.node-version` and `engines.node >=22.12.0`
- **No SSR adapter.** Output is fully static (`output: 'static'`); Vercel just serves
  `dist/`. Do not add `@astrojs/vercel` unless a feature genuinely needs SSR/ISR.
- **Redirects:** `astro/vercel.json` maps legacy MkDocs URLs (old date-based post paths,
  `/blog/`, old RSS/sitemap paths) to the new structure. Vercel applies it automatically.

Production URL: `https://codetango.vercel.app/`.

Vercel is configured with **Root Directory = `astro`**, framework preset Astro, build
`npm run build`, output `dist/`. If a deploy ever needs re-verifying: check the home
listing, a post, `/about/`, `/rss.xml`, and an old date-based URL redirecting to its new
slug (redirect map in `astro/vercel.json`).

## CI (test gate)

`.github/workflows/ci.yml` runs on every **PR** and on pushes to **main**. It is the
assertion layer Vercel can't provide — Vercel only tells you the build succeeded, not
whether the JS budget, agent-facing outputs, or content conventions still hold. The job
(working directory `astro/`, Node from `.node-version`) runs:

```
npm ci  →  npm run check  →  npm run build  →  npm test
```

- `npm run check` = `astro check` (types + content refs).
- `npm test` = Vitest: unit (pure functions), content conventions (frontmatter,
  kebab-case, canonical tag/category vocabulary), build-output (JS budget, markdown
  mirrors, `llms.txt`/`llms-full.txt`, full-content RSS, `robots.txt`, sitemap, pagefind
  index), and internal-link integrity. See `astro-reference.md` → Testing.

Deployment stays entirely on Vercel; CI never deploys. **To make the gate blocking**
(owner, one-time): GitHub → Settings → Branches → protect `main` → *Require status checks
to pass* → select **CI / test**. Without that, the workflow runs but won't block a merge.

## Local development

From `astro/` (prefix `PATH=/opt/homebrew/bin:$PATH` — the nvm default is Node 20, but
Astro 7 needs ≥22.12; Homebrew node is 25.x):

```bash
npm install                       # first time
npm run dev                       # dev server (predev rebuilds charts) → localhost:4321
npm run build                     # production build → dist/ (prebuild rebuilds charts)
npm run preview                   # serve the built dist/ locally
npm run charts                    # rebuild chart SVGs only
```

### Pre-push checklist

1. `npm run check` and `npm test` pass (from `astro/`). `npm test` runs the same gate CI
   does; the build-output tests trigger a build automatically if `dist/` is missing.
   (This subsumes the old "build passes + JS budget = 1" checks — the `js-budget` test
   asserts exactly one client bundle, ClientRouter; the pagefind/ dir is the exempt
   search index + UI.)
2. New posts have complete frontmatter (see `astro-reference.md`); filenames are
   kebab-case (the filename becomes the URL slug); tags/categories come from the canonical
   vocabulary in `post-formatting.md` (the convention test hard-fails otherwise).
3. If you added a chart, its `src/charts/*.vl.json` spec is committed (the generated SVG
   in `public/charts/` is gitignored and rebuilt on deploy).
4. Browser-check visual changes in **both themes** (`open -a "Google Chrome" <url>` —
   Chrome is not the default browser).

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Build fails: `vega` not found | Platform pruned devDependencies | Move `vega`/`vega-lite` to `dependencies` in `astro/package.json` |
| Node engine error on Vercel | Node < 22.12 | Ensure `astro/.node-version` = `22` and `engines.node` present |
| Old post URL 404s | Missing redirect | Add a rule to `astro/vercel.json` |
| `dist` has extra `.js` files | A component got hydrated (`client:*`) | Remove the directive or move it to an island by intent |
| Charts missing on the site | Prebuild didn't run / spec error | `npm run charts` and read its error output |
| Search icon does nothing locally | Index/assets only exist after a build | `npm run build && npm run preview` (search never works under `npm run dev`) |
| Search results include nav/chrome text | `data-pagefind-body` missing | Keep it on the post article + About article only |
| Local `npm run dev` uses wrong Node | nvm default is 20 | Prefix `PATH=/opt/homebrew/bin:$PATH` |
