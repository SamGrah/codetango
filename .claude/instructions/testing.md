# Testing Contract

**Read this before adding or changing anything under `astro/src/`.** The test suite is
designed to stay in sync as the site grows — partly automatically, partly by a rule you
must follow. This file is the source of truth for both.

Suite lives in `astro/test/`, runs with Vitest (`npm test`), and is the CI gate
(`.github/workflows/ci.yml`). Full mechanics: `astro-reference.md` → Testing.

## The two ways tests keep up

1. **Content is auto-covered — no test edits needed.** The convention and agent-surface
   tests enumerate the blog collection at runtime (`readdirSync` / `publishedPosts()` in
   `test/helpers/ensure-build.ts`). A **new post** is automatically checked for valid
   frontmatter, canonical tags/categories, kebab-case filename, a markdown mirror, an
   `llms.txt` entry, RSS inclusion, and link integrity. Likewise, any **new page** is
   automatically swept by the link-integrity and JS-budget tests.

2. **Functionality is guarded, not auto-covered — you must write the test.** A new
   `src/lib/` function or a new `src/pages/` endpoint needs its own assertion. The
   **coverage meta-test** (`test/meta/coverage.test.ts`) enforces this: it fails CI if an
   exported lib function isn't referenced by any test, or if an endpoint's output path
   isn't asserted in `test/build/`. So "add functionality without a test" is a red build,
   not a silent gap — but the *fix* is yours to write.

## Coverage map — what to add for each change

| You changed / added… | Required test action |
| --- | --- |
| A **blog post** (`src/content/blog/*.md`) | Nothing — auto-covered. Just run `npm test`. |
| A **new tag/category** | Add it to the vocabulary in `post-formatting.md` first (the convention test parses that list); otherwise the post fails. |
| A **pure function** in `src/lib/` | Add/extend a `test/unit/<module>.test.ts` with cases for it. |
| A **new API endpoint** in `src/pages/` (`*.js`/`*.ts` returning a `Response`) | Add assertions in `test/build/agent-surface.test.ts` (or a new `test/build/*.test.ts`) that fetch its `dist/` output and check the contract. |
| A **new `.astro` page/route** | Auto-swept by link + JS-budget tests. Add a targeted `test/build/` assertion if it has a specific contract (meta tags, structured data, a required element). |
| A **change to an existing endpoint's output shape** (RSS fields, llms.txt format, mirror layout) | Update the matching `test/build/` assertion to the new contract. |
| A **new build script / pipeline** (`scripts/*.mjs`) | Assert its output exists in `test/build/integrity.test.ts`. |
| A **client-side script or hydrated component** | Expect the JS-budget test to fail — that's intentional. Only add JS with a deliberate reason; if so, update `test/build/js-budget.test.ts`'s expected count and document why. |

## The rule

Any change under `astro/src/` (or `scripts/`) that adds or alters functionality ships
**with its test in the same change**. Before declaring a task done, run `npm test` (it
builds `dist/` automatically if needed) and `npm run check`. Don't weaken a test to make
it pass — fix the code or update the assertion to the intended new contract.

## Gotchas when writing tests

- Tests must **not import `astro:*`** (those only resolve inside Astro's Vite pipeline).
  Keep testable logic in `src/lib/` (pure), and assert endpoints against their built
  `dist/` output instead of importing the route.
- Build-output tests read `dist/`; a single `globalSetup` builds it once. Put them under
  `test/build/**` so they're covered by that setup.
- RSS `content:encoded` is entity-escaped, not CDATA — match both forms.
