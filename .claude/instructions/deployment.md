# Deployment & Development Workflow

> **Current stack: Astro 7 (in `astro/`), deployed on Vercel as static HTML.** The
> legacy MkDocs deployment is retired — see "Legacy (MkDocs)" at the bottom for history.
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

## One-time Vercel dashboard setup (cutover from MkDocs)

Only the project owner can do this in the Vercel dashboard:

1. **Project → Settings → General → Root Directory** → set to `astro` → Save.
2. Confirm **Framework Preset = Astro**, **Build = `npm run build`**, **Output = `dist`**
   (auto-filled once the root directory is `astro`).
3. **Deployments →** redeploy `main` (or push a commit) to build the Astro site.
4. Verify: home listing, a post, `/about/`, `/rss.xml`, and an old URL redirecting
   (e.g. `/blog/2026/03/14/anatomy-of-my-agentic-development-setup/` → new slug).

Until step 1 is done, Vercel still builds the old MkDocs site from the repo root.

## CI

None. There are no GitHub Actions — Vercel is the single source of truth. Every push and
PR gets a Vercel build (production for `main`, a preview URL otherwise), so a broken build
surfaces there. The old `.github/workflows/ci.yml` (`mkdocs gh-deploy`, later a build-check)
was removed. If you ever want a pre-Vercel gate, re-add a workflow that runs
`npm ci && npm run build` in `astro/`.

## Retiring the old GitHub Pages deploy

The legacy `mkdocs gh-deploy --force` pushed to a `gh-pages` branch (still present on the
remote, now stale). To fully retire it (owner, optional cleanup):

- The Actions workflow was removed, so nothing new is published to Pages.
- **GitHub → Settings → Pages** → set Source to "None" (disable the Pages site).
- Delete the stale branch: `git push origin --delete gh-pages`.

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

1. `npm run build` passes (from `astro/`).
2. `find dist -name '*.js' -not -path '*/pagefind/*' | wc -l` prints **1** (ClientRouter
   only — a higher number means an unintended client bundle crept in; the pagefind/
   directory is the search index + UI, loaded only on /search/).
3. New posts have complete frontmatter (see `astro-reference.md`); filenames are
   kebab-case (the filename becomes the URL slug).
4. If you added a chart, its `src/charts/*.vl.json` spec is committed (the generated SVG
   in `public/charts/` is gitignored and rebuilt on deploy).
5. Browser-check visual changes in **both themes** (`open -a "Google Chrome" <url>` —
   Chrome is not the default browser).

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Vercel still builds MkDocs | Root Directory not set to `astro` | Dashboard → Settings → Root Directory = `astro` |
| Build fails: `vega` not found | Platform pruned devDependencies | Move `vega`/`vega-lite` to `dependencies` in `astro/package.json` |
| Node engine error on Vercel | Node < 22.12 | Ensure `astro/.node-version` = `22` and `engines.node` present |
| Old post URL 404s | Missing redirect | Add a rule to `astro/vercel.json` |
| `dist` has extra `.js` files | A component got hydrated (`client:*`) | Remove the directive or move it to an island by intent |
| Charts missing on the site | Prebuild didn't run / spec error | `npm run charts` and read its error output |
| Search icon does nothing locally | Index/assets only exist after a build | `npm run build && npm run preview` (search never works under `npm run dev`) |
| Search results include nav/chrome text | `data-pagefind-body` missing | Keep it on the post article + About article only |
| Local `npm run dev` uses wrong Node | nvm default is 20 | Prefix `PATH=/opt/homebrew/bin:$PATH` |

---

## Legacy (MkDocs) — retired, for reference

The site was previously MkDocs Material with **two** parallel MkDocs deploys on push to
`main`:

1. **GitHub Actions** → `pip install -r requirements.txt` → `mkdocs gh-deploy --force` →
   GitHub Pages (`gh-pages` branch).
2. **Vercel** → root `package.json` `build: python3 -m mkdocs build -d public` → `public/`.

Both are superseded by the single Vercel/Astro pipeline above. The root `package.json`,
`mkdocs.yml`, `requirements.txt`, `venv/`, `site/`, `public/`, and `docs/` are legacy MkDocs
artifacts; leave them during transition, remove at full cutover once the Astro deploy is
confirmed in production.
