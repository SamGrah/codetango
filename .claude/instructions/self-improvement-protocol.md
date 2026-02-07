# Self-Improvement Protocol

This document defines when and how to update the Claude configuration files for CodeTango. The goal is to keep project knowledge accurate and growing without bloating the root CLAUDE.md.

## Triggers

Update configuration files when any of these occur:

| Trigger | Example | Target File |
|---------|---------|-------------|
| Recurring error encountered | Same YAML validation issue hits twice | `deployment.md` troubleshooting table |
| New config discovered | User enables a new extension | `mkdocs-reference.md` |
| New pattern established | Team settles on a new tag convention | `post-formatting.md` |
| Useful resource found | Official docs link for a tricky feature | Relevant instruction file |
| New known issue | Plugin incompatibility discovered | `CLAUDE.md` Known Issues |
| New quick command | Helpful one-liner for common task | `CLAUDE.md` Quick Commands |
| New post category or tag | User approves a new vocabulary item | `post-formatting.md` |

## Target File Rules

| File | Max Size | Contains |
|------|----------|----------|
| `CLAUDE.md` | 300 lines | Identity, layout, config summary, guardrails, known issues, @ imports |
| `post-formatting.md` | No hard limit | Post anatomy, heading rules, code conventions, tag/category vocabulary, tone |
| `mkdocs-reference.md` | No hard limit | Plugins, extensions, theme config, CSS overrides |
| `deployment.md` | No hard limit | Local dev, CI/CD, pre-push checklist, troubleshooting |
| `self-improvement-protocol.md` | No hard limit | This file — triggers, rules, searched locations |

## Rules

1. **Keep CLAUDE.md under 300 lines**. If new content belongs in CLAUDE.md but it's near the limit, extract detailed content to the appropriate instructions/ file and add a brief summary + reference in CLAUDE.md.

2. **Extract, don't delete**. When moving content out of CLAUDE.md, move it to the right instructions/ file — never just remove it.

3. **Never remove info unless confirmed obsolete**. If unsure whether something is still relevant, leave it and add a `<!-- TODO: verify if still needed -->` comment.

4. **New instruction files are allowed**. If a topic doesn't fit existing files, create a new `.claude/instructions/<topic>.md` and add an `@` import to CLAUDE.md.

5. **Update, don't duplicate**. Before adding information, check if it already exists in another file. Update the existing location rather than creating a second copy.

6. **Preserve @ import paths**. If a file is renamed or moved, update all `@` references in CLAUDE.md immediately.

## Frequently Searched Locations

A living reference of commonly accessed paths and what they contain:

| Path | Contains |
|------|----------|
| `mkdocs.yml` | All site configuration |
| `requirements.txt` | Python package dependencies |
| `docs/blog/posts/` | All blog post files |
| `docs/blog/index.md` | Blog listing page config |
| `docs/index.md` | Homepage content |
| `docs/about.md` | About page content |
| `docs/stylesheets/extra.css` | CSS overrides |
| `.github/workflows/ci.yml` | CI/CD pipeline definition |
| `.claude/settings.json` | Claude permission rules |
| `.claude/commands/` | Slash command definitions |
| `.claude/instructions/` | Detailed reference documents |

## Subagent Protocol

All subagents spawned via the Task tool inherit this self-improvement protocol. Subagent responsibilities:

1. **Report discoveries**: If a subagent finds a new pattern, recurring issue, or useful information, it must include this in its response to the main context.

2. **Flag update candidates**: Subagents should explicitly state "This should be added to `<filename>`" when they discover something that belongs in project memory.

3. **Don't update directly**: Subagents report back — the main context decides whether and where to write the update.

4. **Include context**: When reporting a discovery, include enough context (file paths, error messages, config snippets) so the main context can write a useful update without re-investigating.
