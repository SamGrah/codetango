---
name: CodeTango Self-Improvement Protocol
description: Read when you discover a recurring issue, new pattern, or useful fact that should be persisted in AGENTS.md or a project skill. Triggers and rules for updating the agent config.
---

# Self-Improvement Protocol

This document defines when and how to update the OpenCode configuration for CodeTango. The goal is to keep project knowledge accurate and growing without bloating the root `AGENTS.md`, which is loaded into every session.

## Triggers

Update configuration files when any of these occur:

| Trigger | Example | Target File |
|---------|---------|-------------|
| Recurring error encountered | Same build/deploy issue hits twice | `deployment` skill troubleshooting table |
| New config discovered | New Astro plugin/config gotcha | `astro-reference` skill |
| New pattern established | Team settles on a new tag convention | `post-formatting` skill |
| Useful resource found | Official docs link for a tricky feature | Relevant skill |
| New known issue | Plugin incompatibility discovered | `AGENTS.md` Known Issues |
| New quick command | Helpful one-liner for common task | `AGENTS.md` Commands |
| New post category or tag | User approves a new vocabulary item | `post-formatting` skill |
| New functionality added | New `src/lib/` fn, `src/pages/` endpoint, or `.astro` page | Write its test (see `testing` skill coverage map) **in the same change** |
| Output contract changed | RSS fields, llms.txt format, mirror layout altered | Update the matching `test/build/**` assertion |
| New kind of test surface | A test pattern worth reusing (new build-output check, new convention) | `testing` skill coverage map |

## Target File Rules

| File | Max Size | Contains |
|------|----------|----------|
| `AGENTS.md` | ~100 lines | Identity, commands, gotchas, guardrails, known issues, skill index |
| `.opencode/skills/post-formatting/SKILL.md` | No hard limit | Post anatomy, heading rules, code conventions, tag/category vocabulary, tone |
| `.opencode/skills/astro-reference/SKILL.md` | No hard limit | Astro 7 API facts, toolchain, zero-JS budget, agent surface, redirects |
| `.opencode/skills/testing/SKILL.md` | No hard limit | Testing contract, coverage map, what's auto-covered vs hand-written |
| `.opencode/skills/deployment/SKILL.md` | No hard limit | Local dev, Vercel deploy, CI test gate, pre-push checklist, troubleshooting |
| `.opencode/skills/self-improvement-protocol/SKILL.md` | No hard limit | This file — triggers, rules, searched locations |

## Rules

1. **Keep AGENTS.md compact**. It is loaded into every session. If new content is detailed or only relevant to some tasks, put it in the appropriate skill and leave at most a one-line pointer in `AGENTS.md`.

2. **Extract, don't delete**. When moving content out of `AGENTS.md`, move it to the right skill — never just remove it.

3. **Never remove info unless confirmed obsolete**. If unsure whether something is still relevant, leave it and add a `<!-- TODO: verify if still needed -->` comment.

4. **New skills are allowed**. If a topic doesn't fit an existing skill, create `.opencode/skills/<kebab-id>/SKILL.md` with `name` and a `description` that says *when* to load it (OpenCode only advertises skills that have a description), and add it to the skill index in `AGENTS.md`.

5. **Update, don't duplicate**. Before adding information, check if it already exists elsewhere. Update the existing location rather than creating a second copy.

6. **Keep paths in sync**. A skill's ID is its directory name. If you rename one, update every reference (`AGENTS.md`, other skills, commands). `astro/test/content/conventions.test.ts` reads `.opencode/skills/post-formatting/SKILL.md` directly — moving or renaming that file, or its `## Tag Vocabulary` / `## Category Vocabulary` headings, breaks the test.

## Frequently Searched Locations

A living reference of commonly accessed paths and what they contain:

| Path | Contains |
|------|----------|
| `astro/astro.config.mjs` | Astro site configuration |
| `astro/package.json` | Scripts + dependencies |
| `astro/src/content/blog/` | All blog post files |
| `astro/src/pages/` | Routes + endpoints (index, about, RSS, llms.txt, mirrors) |
| `astro/src/styles/global.css` | The design system (tokens, theming) |
| `astro/src/content.config.ts` | Blog collection schema (Zod) |
| `.github/workflows/ci.yml` | CI test-gate pipeline |
| `opencode.json` | OpenCode project config (permission rules) |
| `.opencode/plugins/` | Local plugins (`test-sync-reminder.ts`) |
| `.opencode/commands/` | Slash command definitions (`/new-post`, `/review-post`) |
| `.opencode/skills/` | Detailed reference docs, loaded on demand as skills |
| `astro/test/` | Test suite (unit / content / build / meta); see `testing` skill |
| `astro/test/meta/coverage.test.ts` | Coverage guard — fails CI if new functionality lacks a test |

## Subagent Protocol

All subagents inherit this self-improvement protocol. Subagent responsibilities:

1. **Report discoveries**: If a subagent finds a new pattern, recurring issue, or useful information, it must include this in its response to the main context.

2. **Flag update candidates**: Subagents should explicitly state "This should be added to `<filename>`" when they discover something that belongs in project memory.

3. **Don't update directly**: Subagents report back — the main context decides whether and where to write the update.

4. **Include context**: When reporting a discovery, include enough context (file paths, error messages, config snippets) so the main context can write a useful update without re-investigating.
