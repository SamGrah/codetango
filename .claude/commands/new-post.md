# /new-post — Create a New Blog Post

Create a new blog post for CodeTango (Astro). Before writing, gather from the user:

1. **Topic**: What is the post about?
2. **Angle/Thesis**: What specific argument or insight drives this post?
3. **Tags**: Which tags apply? (Refer to the tag vocabulary in `.claude/instructions/post-formatting.md`)
4. **Category**: Which category? (Refer to the category vocabulary in `.claude/instructions/post-formatting.md`)

## Steps

0. **Read `.claude/instructions/authors-voice.md`** before writing any content. All prose
   must follow the author's voice: personal experience framing, no prescriptive or universal
   claims.

1. **Generate the filename** using kebab-case from the topic (e.g.,
   `agentic-design-patterns.md`). The filename becomes the URL slug. Confirm with the user
   before creating.

2. **Write complete frontmatter** using today's date:
   ```yaml
   ---
   title: "Post Title Here"
   synopsis: "1–3 sentence excerpt — shown on the listing and as the post lede."
   date: YYYY-MM-DD
   author: Sam Graham
   tags: ["tag-one", "tag-two"]
   categories: ["Category Name"]
   ---
   ```
   Tags/categories **must** come from the canonical vocabulary in `post-formatting.md`
   (the convention test hard-fails otherwise). There is no `<!-- more -->` separator and no
   `hide:` key — the `synopsis` field drives the listing preview.

3. **Write the `synopsis`** (1–3 sentences) to hook the reader with a clear statement of
   what they'll learn. It doubles as the listing excerpt and the lede under the title.

4. **Generate the post skeleton** following this anatomy:
   - **Hook**: Opening paragraph that frames the problem or question
   - **Context**: Why this matters now; what the reader already knows
   - **Core Argument**: The main thesis with supporting evidence
   - **Example**: Concrete walkthrough, code snippet, or diagram
   - **Trade-offs**: Honest assessment of limitations or alternatives
   - **Takeaways**: 2–4 bullet points the reader should remember

5. **Suggest diagrams** where the post discusses architecture, workflows, or system
   interactions. Visuals are static SVG rendered at build time (see `astro-reference.md` →
   visuals): a Vega-Lite spec in `astro/src/charts/*.vl.json` (data charts) or a committed
   Mermaid SVG in `astro/public/diagrams/`. Reference them as `![alt](/charts/…svg)` or
   `![alt](/diagrams/…svg)`.

6. **Validate** the completed post:
   - Frontmatter is complete; tags/categories match the vocabulary
   - `synopsis` is present (1–3 sentences)
   - Headings use H2 for sections, H3 sparingly — never H1 (the title is the H1)
   - Code blocks have language tags
   - Filename is kebab-case

7. **Write the file** to `astro/src/content/blog/<filename>.md`.

8. **Visual verification** (if the post contains diagrams or images):
   - Build and preview (search/diagrams need a build): `npm run build && npm run preview`
   - Open Chrome explicitly: `open -a "Google Chrome" http://localhost:4321/blog/<post-slug>/`
   - Use browser MCP tools to screenshot the rendered post
   - Verify diagrams/charts render (all nodes visible), images load at appropriate size
   - Fix and re-verify before completing

9. **Run the test suite** — `npm test`. A new post is **auto-covered**: the convention and
   agent-surface tests validate its frontmatter, canonical tags/categories, kebab-case
   filename, markdown mirror, RSS inclusion, and links with no test edits needed. Fix any
   failure (usually an off-vocabulary tag/category — add it to `post-formatting.md` first,
   with the user's approval) before finishing. See `.claude/instructions/testing.md`.

## User Argument

$ARGUMENTS — If provided, treat this as the topic and skip the topic question. Still ask
about angle and tags if not obvious.
