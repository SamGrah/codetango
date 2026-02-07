# /new-post — Create a New Blog Post

Create a new blog post for CodeTango. Before writing, gather the following from the user:

1. **Topic**: What is the post about?
2. **Angle/Thesis**: What specific argument or insight drives this post?
3. **Tags**: Which tags apply? (Refer to the tag vocabulary in `.claude/instructions/post-formatting.md`)
4. **Category**: Which category? (Refer to the category vocabulary in `.claude/instructions/post-formatting.md`)

## Steps

1. **Generate the filename** using kebab-case from the topic (e.g., `agentic-design-patterns.md`). Confirm with the user before creating.

2. **Write complete frontmatter** using today's date:
   ```yaml
   ---
   title: "Post Title Here"
   date: YYYY-MM-DD
   author: Sam Graham
   tags: ["tag-one", "tag-two"]
   categories: ["Category Name"]
   hide:
     - navigation
     - toc
   ---
   ```

3. **Write the excerpt** (1-3 sentences) — this appears on the blog listing. It should hook the reader with a clear statement of what they'll learn. Follow it with `<!-- more -->`.

4. **Generate the post skeleton** following this anatomy:
   - **Hook**: Opening paragraph that frames the problem or question
   - **Context**: Why this matters now; what the reader already knows
   - **Core Argument**: The main thesis with supporting evidence
   - **Example**: Concrete walkthrough, code snippet, or architecture diagram
   - **Trade-offs**: Honest assessment of limitations or alternatives
   - **Takeaways**: 2-4 bullet points the reader should remember

5. **Suggest Mermaid diagrams** where the post discusses architecture, workflows, or system interactions. Use ```` ```mermaid ```` blocks. Keep diagrams under 15 nodes.

6. **Validate** the completed post:
   - Frontmatter is complete and tags/categories match vocabulary
   - `<!-- more -->` separator is present after excerpt
   - Headings use H2 for sections, H3 sparingly — never H1
   - Code blocks have language tags
   - Filename is kebab-case

7. **Write the file** to `docs/blog/posts/<filename>.md`.

8. **Visual verification** (if post contains Mermaid diagrams or images):
   - Ensure `mkdocs serve` is running
   - Open Chrome explicitly: `open -a "Google Chrome" http://127.0.0.1:8000/codetango/blog/<post-slug>/`
   - Use browser MCP tools to screenshot the rendered post
   - Verify Mermaid diagrams render correctly (all nodes visible, arrows connect properly)
   - Verify images load and display at appropriate size
   - If issues are found, fix and re-verify before completing

## User Argument

$ARGUMENTS — If provided, treat this as the topic and skip the topic question. Still ask about angle and tags if not obvious.
