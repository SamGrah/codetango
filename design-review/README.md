# Redesign review

Ten throwaway redesign mockups for codeTango, plus a reviewer for comparing them. Nothing here is built or deployed. It lives outside `astro/` on purpose.

## Open it

Open `design-review/index.html` in a browser. If your browser blocks `file://` iframes, serve the repo root instead:

```sh
python3 -m http.server 8765
# then visit http://localhost:8765/design-review/
```

Keys: `1`–`0` pick a design, `←`/`→` previous or next, `v` home or post, `t` theme, `m` desktop or mobile width, `s` star. Notes and stars are saved in your browser's localStorage. **Copy notes** puts them on the clipboard as Markdown.

## Layout

- `designs/NN-name.html` are the mockups. Each one is self-contained and can be opened on its own with `?theme=light|dark&view=home|post`.
- `designs/_frame.js` is the shared contract: it applies theme and view, and syncs with the reviewer.
- `designs.js` is the manifest: concept, palette, type and trade-offs for each design.
- `content.html` is the real post content every mockup uses, word for word.

The reviewer now holds the chosen design only: **Conservative+**, a refinement of Modular Poster with teal, ink and ochre. Every earlier and discarded design is in this branch's git history. Round 3 and later designs uses the live site's chrome from `chrome.html`: italic "code" in the wordmark, the sun/moon theme toggle, and the footer icon links including the Pied Piper hat. The reviewer marks each design that breaks the current style guide and says which rule it breaks.
