# CodeTango

Static Astro 7 blog about agentic AI development and operations, deployed on Vercel. The whole app lives in `astro/`. The repo root only has a thin `package.json` that forwards commands into `astro/`. You write blog prose (Markdown), site code (Astro, TypeScript, CSS), editorial feedback, and the tests that cover it.

## Style

- Prose is clear, precise, and opinionated, but framed as personal experience rather than prescription. Tone is conversational but not casual.
- Primary topics: local agentic dev workflows, LLMOps, agentic design patterns, and software architecture. Secondary topics: testing strategies, developer tooling, and engineering culture.
- Match the surrounding code's idiom, naming, and comment density.

## Skills

Detailed project docs live in `.opencode/skills/`. Load the matching skill before you work in that area:
- `astro-reference` before touching `astro/`: Astro 7 API facts that differ from older versions you may remember, the JS budget, search, and the agent-facing outputs
- `testing` before changing `astro/src/` or `astro/scripts/`
- `authors-voice` and `post-formatting` before writing or reviewing posts
- `visual-style-guide` before changing CSS, components, or the theme
- `deployment` before build, CI, or Vercel work
- `self-improvement-protocol` when you learn something worth saving in this file or in a skill

Slash commands: `/new-post [topic]` and `/review-post <path>` (in `.opencode/commands/`).

## Commands

- Fresh clone: run `npm ci` inside `astro/`. Root `npm install` installs nothing.
- From the root: `npm run dev|build|preview|check|test|charts`. These run `astro/` scripts with `PATH=/opt/homebrew/bin:$PATH`, because Astro needs Node 22.12 or newer and an older nvm Node may be first on PATH.
- Inside `astro/`: `npm run test:unit` runs only the fast unit tests. Use `npx vitest run test/build/links.test.ts` for one file.
- CI order, in `astro/`: `npm ci` → `npm run check` → `npm run build` → `npm test`. Before finishing, run `npm run check` and `npm test`.
- Agent-friendly dev server: `npx astro dev --background`. Manage it with `astro dev stop|status|logs`.
- Visual checks: use the Playwright MCP browser tools on `localhost:4321`, in both light and dark themes.

## Gotchas

- `npm test` builds `dist/` only if `dist/index.html` is missing. If `dist/` exists from an earlier build, the `test/build/**` tests check stale output. Run `npm run build` again after changing `src/`.
- `prebuild`/`predev` regenerate `public/charts/*.svg` from `src/charts/*.vl.json`. Those SVGs are gitignored, so commit the spec, not the SVG. Mermaid diagrams in `public/diagrams/` are the opposite: they are pre-rendered and committed.
- Search (Pagefind) is indexed after the build. In dev, `predev` copies the last build's `dist/pagefind` into `public/pagefind`, so search in dev is stale or missing until you run `npm run build`.
- Tests must not import `astro:*`. Put testable logic in `src/lib/` as pure functions, and test endpoints against their built `dist/` output.
- `test/meta/coverage.test.ts` fails if any exported `src/lib/` function is not named in a test, or if any `.js`/`.ts` endpoint in `src/pages/` has no assertion in `test/build/`. New functionality ships with its test in the same change.
- `test/content/conventions.test.ts` parses the allowed tags and categories from the `## Tag Vocabulary` / `## Category Vocabulary` sections of `.opencode/skills/post-formatting/SKILL.md`. Add new values there first (with the user's approval). Do not rename those headings or move that file.
- JS budget: `test/build/js-budget.test.ts` allows exactly one client bundle (`<ClientRouter />`) plus Pagefind. Any `client:*` directive or global script will fail it.
- ClientRouter replaces `<body>` on navigation. Bind events by delegating from `document` or on `astro:page-load`. Keep the `astro:after-swap` theme re-apply hook.
- A post's filename is its URL slug (kebab-case). If you rename a post, add a redirect in `astro/vercel.json`.
- Output stays fully static. Do not add an SSR adapter.

## Agent config

- `opencode.json` blocks `rm`, `git push --force`, `git reset --hard`, and `git clean`. Use `git rm` or `git mv` for tracked files.
- `.opencode/plugins/test-sync-reminder.ts` adds a testing-contract reminder to the result of any edit under `astro/src/lib`, `astro/src/pages`, or `astro/scripts`.
- `astro/AGENTS.md` is Astro's generated starter file and only covers the background dev server and links to the Astro docs.

## Workflow

- Work happens on PR branches. CI (`.github/workflows/ci.yml`) runs only on `pull_request`, and branch protection on `main` requires it to pass.
- Merging to `main` deploys to production through Vercel's Git integration. Every PR gets a preview deploy.

## Known issues

- `astro/src/pages/about.md` still has placeholder bio text (Montreal, Wizard Zines, Recurse Center) and needs real author content.
