# Deployment & Development Workflow

## Browser Preview (Claude Code for Chrome)

The Claude Code for Chrome extension enables visual verification of rendered content. Use this workflow when changes affect visual elements:

### When to Use Browser Preview

- **Always**: Mermaid diagrams, images, embedded media
- **Always**: Theme or CSS changes
- **Recommended**: Complex layout changes, new plugins, frontmatter changes that affect rendering

### Preview Workflow

1. **Ensure dev server is running**: `mkdocs serve` at `http://127.0.0.1:8000`
2. **Open Chrome explicitly**: Chrome is not the default browser, so use:
   ```bash
   open -a "Google Chrome" http://127.0.0.1:8000/codetango/path/to/page/
   ```
3. **Navigate/interact**: Use the browser MCP tools to navigate to specific pages
4. **Take a screenshot**: Capture the rendered output for verification
5. **Check for issues**: Verify diagrams render correctly, images load, layout is correct
6. **Iterate if needed**: Make fixes and re-verify

### Common Visual Checks

| Content Type      | What to Verify                                           |
|-------------------|----------------------------------------------------------|
| Mermaid diagrams  | All nodes visible, arrows connect correctly, text readable |
| Images            | Loads correctly, appropriate size, alt text renders on failure |
| Code blocks       | Syntax highlighting applied, not truncated               |
| Admonitions       | Icon and color correct, content formatted properly       |
| Tables            | Columns align, responsive on narrow viewports            |

---

## Local Development

### Setup

```bash
# Activate the virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Development Server

```bash
# Start live-reloading dev server (http://127.0.0.1:8000)
mkdocs serve --livereload
```

- Auto-reloads on file changes
- Shows warnings for broken links, missing files

### Local Build Validation

```bash
# Build with strict mode — fails on any warning
mkdocs build --strict
```

Always run this before pushing. It catches:

- Broken internal links
- Missing referenced files
- Invalid YAML in frontmatter
- Plugin configuration errors

## CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/ci.yml`)

**Trigger**: Push to `main` or `master` branch

**What it does**:

1. Checks out the repo
2. Configures git credentials for the bot
3. Sets up Python 3.x
4. Caches MkDocs build artifacts (weekly rotation via `%V` week number)
5. Sets `CI=True` environment variable (enables RSS plugin)
6. Installs dependencies from `requirements.txt`
7. Deploys to GitHub Pages via `mkdocs gh-deploy --force`

**Key detail**: The `CI=True` env var controls RSS feed generation. Locally, RSS is disabled so `mkdocs serve` is faster.

### Deployment Target

- GitHub Pages at `https://samgrah.github.io/codetango/`
- Uses the `gh-pages` branch (auto-managed by `mkdocs gh-deploy`)

## Pre-Push Checklist

Run these before pushing to `main`:

1. **Activate venv**: `source venv/bin/activate`
2. **Build strict**: `mkdocs build --strict` — must pass with zero warnings
3. **Check git status**: `git status` — no unintended files staged
4. **Review diff**: `git diff --staged` — verify only intended changes
5. **Verify frontmatter**: Every new/modified post has complete frontmatter
6. **Check filenames**: Post filenames use kebab-case, no spaces

## Troubleshooting

| Symptom                           | Cause                                       | Fix                                                                  |
| --------------------------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| `mermaid2` plugin not found       | Missing from `requirements.txt`             | `pip install mkdocs-mermaid2-plugin` and add to `requirements.txt`   |
| RSS feed not generating locally   | RSS is CI-only by default                   | Set `CI=True` env var: `CI=True mkdocs serve`                        |
| Build warning: page not in nav    | New page exists but not in `mkdocs.yml` nav | Add the page to the `nav` section in `mkdocs.yml`                    |
| Styles not updating               | Browser cache                               | Hard refresh (`Cmd+Shift+R`) or clear `.cache/` dir                  |
| `gh-deploy` fails on CI           | Git credentials misconfigured               | Check the `Configure Git Credentials` step in `ci.yml`               |
| Blog posts not appearing          | Missing `date` in frontmatter               | Add `date: YYYY-MM-DD` to post frontmatter                           |
| Excerpt not showing on listing    | Missing `<!-- more -->`                     | Add `<!-- more -->` after the excerpt paragraph                      |
| Superfences Mermaid not rendering | Custom fences not configured                | Add custom fence config under `pymdownx.superfences` in `mkdocs.yml` |
