#!/usr/bin/env bash
# PostToolUse hook: after Claude edits functionality source (src/lib or src/pages),
# inject a non-blocking reminder about the testing contract. Content edits
# (src/content/blog) are auto-covered, so they're intentionally NOT nudged.
#
# Reads the hook payload JSON on stdin; emits additionalContext so the reminder
# lands in Claude's context without blocking the edit. CI's coverage meta-test is
# the hard enforcement — this is just the in-session prompt to write the test now.
set -euo pipefail

payload="$(cat)"

# Extract the edited file path from the tool input (jq if available, else python3).
if command -v jq >/dev/null 2>&1; then
  file="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty')"
else
  file="$(printf '%s' "$payload" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null || true)"
fi

case "$file" in
  *astro/src/lib/*|*astro/src/pages/*|*astro/scripts/*)
    # Skip if the edited file is itself a test.
    case "$file" in *.test.ts) exit 0 ;; esac
    msg="Testing contract: you edited functionality source ($file). Per .claude/instructions/testing.md, new/changed src/lib functions and src/pages endpoints need a matching test in the same change (test/unit or test/build). The coverage meta-test will fail CI otherwise. Run 'npm test' before finishing."
    printf '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":%s}}\n' \
      "$(printf '%s' "$msg" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')"
    ;;
  *)
    exit 0
    ;;
esac
