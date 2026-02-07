# MkDocs Material Configuration Reference

## Current Plugins

### blog
The built-in Material blog plugin. Enabled with defaults.
- Posts live in `docs/blog/posts/`
- Listing page at `docs/blog/index.md`
- Uses `date` from frontmatter for ordering
- Excerpt controlled by `<!-- more -->` separator

### search
Built-in search with these theme features enabled:
- `search.highlight` — highlights matches on the target page
- `search.share` — adds share button to search results
- `search.suggest` — shows completion suggestions

### mermaid2
Renders Mermaid diagrams in fenced code blocks (```` ```mermaid ````).
- **Known issue**: `mkdocs-mermaid2-plugin` is NOT in `requirements.txt` — needs to be added
- Requires superfences custom fence config for proper rendering (not yet configured)
- Package: `mkdocs-mermaid2-plugin`

### rss
Generates RSS feeds from blog posts.
- **Only enabled in CI** (`enabled: !ENV [CI, False]`)
- Matches posts at `blog/posts/.*`
- Uses `date` from frontmatter as creation date
- Feeds categories from both `categories` and `tags`

## Current Markdown Extensions

### pymdownx.highlight
Syntax highlighting for code blocks.
```yaml
- pymdownx.highlight:
    anchor_linenums: true
    line_spans: __span
    pygments_lang_class: true
```
- `anchor_linenums` — line numbers are anchor links
- `line_spans` — wraps lines in spans for targeting
- `pygments_lang_class` — adds language class to code block

### pymdownx.inlinehilite
Inline code highlighting: `` `#!python range(10)` `` renders with syntax highlighting.

### pymdownx.snippets
Include content from other files: `--8<-- "filename.md"`. Useful for reusable content blocks.

### pymdownx.superfences
Enhanced fenced code blocks. Required for Mermaid rendering when properly configured.

To enable Mermaid via superfences (recommended over mermaid2 standalone):
```yaml
- pymdownx.superfences:
    custom_fences:
      - name: mermaid
        class: mermaid
        format: !!python/name:pymdownx.superfences.fence_code_format
```

## Extensions NOT Yet Enabled

These are available in pymdownx/Material and can be added to `mkdocs.yml`:

### admonition + details
Callout boxes (note, warning, tip, etc.) and collapsible blocks.
```yaml
markdown_extensions:
  - admonition
  - pymdownx.details
```
Usage: `!!! note "Title"` or `??? note "Collapsible"`

### pymdownx.tabbed
Content tabs for showing alternatives (e.g., different languages).
```yaml
- pymdownx.tabbed:
    alternate_style: true
```
Usage: `=== "Tab 1"` / `=== "Tab 2"`

### pymdownx.arithmatex
Math rendering with MathJax or KaTeX.
```yaml
- pymdownx.arithmatex:
    generic: true
```
Requires adding MathJax JS to `extra_javascript`.

### pymdownx.tasklist
GitHub-style task lists.
```yaml
- pymdownx.tasklist:
    custom_checkbox: true
```

### pymdownx.critic
Track changes markup (additions, deletions, highlights).
```yaml
- pymdownx.critic
```

### pymdownx.keys
Keyboard key rendering: `++ctrl+alt+del++`.
```yaml
- pymdownx.keys
```

### pymdownx.mark
Highlight text with `==marked text==`.
```yaml
- pymdownx.mark
```

### attr_list + md_in_html
Add HTML attributes to Markdown elements; use Markdown inside HTML blocks.
```yaml
- attr_list
- md_in_html
```
Required for image alignment, button styling, and grid cards.

### toc (table of contents)
Configure table of contents behavior.
```yaml
- toc:
    permalink: true
    toc_depth: 3
```

## Theme Customization

### Palette
Three-mode toggle: auto → light → dark
- Primary color: `teal`
- Dark scheme: `slate`

### Navigation Features (currently enabled)
| Feature                          | Effect                              |
|----------------------------------|-------------------------------------|
| `navigation.footer`             | Previous/next links in footer       |
| `navigation.indexes`            | Section index pages                 |
| `navigation.instant`            | SPA-like navigation (no full reload)|
| `navigation.instant.prefetch`   | Prefetch links on hover             |
| `navigation.instant.progress`   | Loading progress bar                |
| `navigation.prune`              | Prune hidden nav items from DOM     |
| `navigation.tabs`               | Top-level sections as tabs          |
| `navigation.tabs.sticky`        | Tabs stick on scroll                |
| `navigation.top`                | Back-to-top button                  |
| `navigation.tracking`           | URL updates on scroll               |

### Font
- Text: Open Sans

### CSS Overrides (`docs/stylesheets/extra.css`)
```css
.md-grid { max-width: 900px; }
.md-sidebar { width: 20%; }
.md-sidebar.md-sidebar--post { width: 18%; }
```
