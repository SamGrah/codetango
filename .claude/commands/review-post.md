# /review-post — Review an Existing Blog Post

Review a blog post for structure, formatting, and content quality against CodeTango standards.

## Input

$ARGUMENTS — Path to the post file (e.g., `astro/src/content/blog/agentic-design-patterns.md`). If not provided, ask the user which post to review.

## Review Checklist

Read the post file, then evaluate each of these areas. Provide **actionable feedback** — not just "this is wrong" but "change X to Y".

### 1. Author's Voice (read `.claude/instructions/authors-voice.md` first)
- [ ] Content is framed as personal experience, not universal prescription
- [ ] No definitive statements ("X is...", "You should...", "Agents must...")
- [ ] Claims are scoped to the author's context ("I found...", "In my setup...", "What worked for me...")

### 2. Frontmatter Completeness
- [ ] `title` is present and descriptive (not generic)
- [ ] `date` is present and valid (YYYY-MM-DD)
- [ ] `author` is present
- [ ] `tags` array is present; tags match the established vocabulary
- [ ] `categories` array is present; categories match vocabulary
- [ ] No stale MkDocs keys (`hide:`, `<!-- more -->`) — Astro uses a `synopsis:` field

### 3. Synopsis Quality
- [ ] `synopsis` field is present and 1-3 sentences
- [ ] It hooks the reader — states what they'll learn or why this matters

### 4. Post Structure
- [ ] Follows the anatomy: hook → context → core argument → example → trade-offs → takeaways
- [ ] Missing sections are identified with suggestions for what to add
- [ ] Post has a clear thesis — not just a topic

### 5. Formatting
- [ ] Headings: H2 for major sections, H3 sparingly, never H1
- [ ] Code blocks have language tags (```python, ```yaml, etc.)
- [ ] Code blocks are under 25 lines; longer blocks are split or trimmed
- [ ] Mermaid diagrams (if present) have under 15 nodes and a caption
- [ ] No orphaned links or placeholder text

### 6. Tag & Category Consistency
- [ ] Tags come from the established vocabulary in `post-formatting.md`
- [ ] Categories come from the established vocabulary
- [ ] If new tags/categories are needed, flag them for the user to approve

### 7. Filename
- [ ] Uses kebab-case (no spaces, no uppercase)
- [ ] Is descriptive of the content

### 8. Visual Review (if post contains diagrams or images)
If the post contains diagrams, images, or other visual content:
- [ ] Build and preview: `npm run build && npm run preview`
- [ ] Open Chrome explicitly: `open -a "Google Chrome" http://localhost:4321/blog/<post-slug>/`
- [ ] Use browser MCP tools to screenshot the rendered post
- [ ] Verify: diagrams/charts render with all nodes/edges visible
- [ ] Verify: Images load correctly and are appropriately sized
- [ ] Verify: Code blocks have syntax highlighting applied

## Output Format

Provide a summary with:
1. **Overall assessment** (1-2 sentences)
2. **Issues found** (numbered list with severity: critical / suggestion)
3. **Specific fixes** (exact text changes where applicable)
4. **What's working well** (positive feedback to reinforce good patterns)
