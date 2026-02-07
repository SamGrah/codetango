# /review-post — Review an Existing Blog Post

Review a blog post for structure, formatting, and content quality against CodeTango standards.

## Input

$ARGUMENTS — Path to the post file (e.g., `docs/blog/posts/newpost.md`). If not provided, ask the user which post to review.

## Review Checklist

Read the post file, then evaluate each of these areas. Provide **actionable feedback** — not just "this is wrong" but "change X to Y".

### 1. Frontmatter Completeness
- [ ] `title` is present and descriptive (not generic)
- [ ] `date` is present and valid (YYYY-MM-DD)
- [ ] `author` is present
- [ ] `tags` array is present; tags match the established vocabulary
- [ ] `categories` array is present; categories match vocabulary
- [ ] `hide` includes `navigation` and `toc`

### 2. Excerpt Quality
- [ ] Text before `<!-- more -->` exists and is 1-3 sentences
- [ ] The excerpt hooks the reader — states what they'll learn or why this matters
- [ ] `<!-- more -->` separator is present

### 3. Post Structure
- [ ] Follows the anatomy: hook → context → core argument → example → trade-offs → takeaways
- [ ] Missing sections are identified with suggestions for what to add
- [ ] Post has a clear thesis — not just a topic

### 4. Formatting
- [ ] Headings: H2 for major sections, H3 sparingly, never H1
- [ ] Code blocks have language tags (```python, ```yaml, etc.)
- [ ] Code blocks are under 25 lines; longer blocks are split or trimmed
- [ ] Mermaid diagrams (if present) have under 15 nodes and a caption
- [ ] No orphaned links or placeholder text

### 5. Tag & Category Consistency
- [ ] Tags come from the established vocabulary in `post-formatting.md`
- [ ] Categories come from the established vocabulary
- [ ] If new tags/categories are needed, flag them for the user to approve

### 6. Filename
- [ ] Uses kebab-case (no spaces, no uppercase)
- [ ] Is descriptive of the content

### 7. Visual Review (if post contains diagrams or images)
If the post contains Mermaid diagrams, images, or other visual content:
- [ ] Ensure `mkdocs serve` is running
- [ ] Open Chrome explicitly: `open -a "Google Chrome" http://127.0.0.1:8000/codetango/blog/<post-slug>/`
- [ ] Use browser MCP tools to screenshot the rendered post
- [ ] Verify: Mermaid diagrams render with all nodes/edges visible
- [ ] Verify: Images load correctly and are appropriately sized
- [ ] Verify: Code blocks have syntax highlighting applied

## Output Format

Provide a summary with:
1. **Overall assessment** (1-2 sentences)
2. **Issues found** (numbered list with severity: critical / suggestion)
3. **Specific fixes** (exact text changes where applicable)
4. **What's working well** (positive feedback to reinforce good patterns)
