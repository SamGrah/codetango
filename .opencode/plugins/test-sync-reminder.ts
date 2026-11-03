// After an edit to functionality source (src/lib, src/pages, scripts), append a
// non-blocking reminder about the testing contract to the tool result so it lands
// in the model's context. Content edits (src/content/blog) are auto-covered, so
// they're intentionally not nudged. CI's coverage meta-test is the hard
// enforcement — this is just the in-session prompt to write the test now.

const EDIT_TOOLS = new Set(["edit", "write", "patch"])
const WATCHED = /astro\/(src\/lib|src\/pages|scripts)\/[^\s"'`]+/g

function touchedPaths(input: unknown): string[] {
  const fields = input && typeof input === "object" ? (input as Record<string, unknown>) : {}
  const direct = [fields.path, fields.filePath, fields.file_path].filter(
    (v): v is string => typeof v === "string",
  )
  const haystack = direct.length > 0 ? direct.join("\n") : JSON.stringify(input ?? "")
  const matches = haystack.match(WATCHED) ?? []
  return [...new Set(matches)].filter((p) => !p.endsWith(".test.ts"))
}

export default {
  id: "codetango.test-sync-reminder",
  async setup(ctx: any) {
    await ctx.tool.hook("execute.after", (event: any) => {
      if (event.status !== "completed" || !EDIT_TOOLS.has(event.tool)) return
      const paths = touchedPaths(event.input)
      if (paths.length === 0) return

      const reminder =
        `\n\nTesting contract: you edited functionality source (${paths.join(", ")}). ` +
        "Per the `testing` skill, new/changed src/lib functions and src/pages endpoints need a " +
        "matching test in the same change (test/unit or test/build). The coverage meta-test " +
        "will fail CI otherwise. Run `npm test` before finishing."

      const { content, output } = event.result ?? {}
      const parts =
        typeof content === "string"
          ? [{ type: "text", text: content }]
          : Array.isArray(content)
            ? [...content]
            : output !== undefined
              ? [{ type: "text", text: typeof output === "string" ? output : JSON.stringify(output) }]
              : []
      event.result = { ...event.result, content: [...parts, { type: "text", text: reminder }] }
    })
  },
}
