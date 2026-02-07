# /configure-mkdocs — Modify MkDocs Configuration

Help configure or update `mkdocs.yml` and related files safely.

## Input

$ARGUMENTS — Description of the desired configuration change (e.g., "enable admonitions", "add tabs extension", "change site name"). If not provided, ask the user what they want to configure.

## Steps

1. **Read current state**: Read `mkdocs.yml` and `requirements.txt` to understand the current configuration.

2. **Determine the change**: Based on the user's request, identify:
   - Which section of `mkdocs.yml` needs modification
   - Whether new pip packages are required
   - Whether the change interacts with existing config (e.g., superfences custom fences for mermaid)

3. **Show exact YAML diffs**: Present the change as before/after snippets — NOT the entire file. Example format:
   ```
   # Before:
   markdown_extensions:
     - pymdownx.highlight

   # After:
   markdown_extensions:
     - pymdownx.highlight
     - admonition
   ```

4. **Validate against Material schema**: Check that:
   - Extension/plugin names are correct
   - Nesting and indentation are valid YAML
   - The feature is compatible with the current Material version
   - Required dependencies exist in `requirements.txt`

5. **Update requirements.txt if needed**: If the change requires a new pip package (e.g., `mkdocs-mermaid2-plugin` for mermaid2), show the addition and remind the user to run `pip install -r requirements.txt`.

6. **Apply changes**: After user approval, edit `mkdocs.yml` (and `requirements.txt` if needed).

7. **Build verification**: Run `mkdocs build --strict` to catch any configuration errors.

8. **Visual verification** (for theme, plugin, or layout changes):
   - Ensure `mkdocs serve` is running
   - Open Chrome explicitly (not the default browser): `open -a "Google Chrome" http://127.0.0.1:8000/codetango/`
   - Use browser MCP tools to take a screenshot and verify the change renders correctly
   - Check affected pages — e.g., if enabling admonitions, verify an admonition block renders properly

## Common Configurations Reference

Consult `.claude/instructions/mkdocs-reference.md` for details on available plugins, extensions, and theme features before making changes.
