// /llms.txt — the llmstxt.org entry point for AI agents: what this site is,
// where the token-efficient markdown mirrors live, and how to query the
// static search index. Regenerated from the content collection every build.
import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const postLines = posts.map((p) => {
    const md = new URL(`blog/${p.id}/index.md`, site);
    const when = p.data.date.toISOString().slice(0, 10);
    const synopsis = p.data.synopsis ? `: ${p.data.synopsis}` : '';
    return `- [${p.data.title}](${md})${synopsis} (${when})`;
  });

  const body = `# codeTango

> A technical blog about agentic AI development and operations, by Sam Graham.
> Topics: local agentic AI development workflows, LLMOps, agentic design
> patterns (tool use, orchestration, evaluation, guardrails), software
> architecture, and testing strategy.

Every post has a raw-markdown mirror at its canonical URL + \`index.md\` —
prefer those over the HTML pages (same content, far fewer tokens). Each HTML
page also advertises its mirror via \`<link rel="alternate" type="text/markdown">\`.

## Posts

${postLines.join('\n')}

## Full corpus

- [llms-full.txt](${new URL('llms-full.txt', site)}): every post, full text, one file — the whole blog in a single fetch

## Feeds and indexes

- [RSS](${new URL('rss.xml', site)}): full-content feed, newest first
- [Sitemap](${new URL('sitemap-index.xml', site)})

## Search

A static Pagefind v1 index is served under ${new URL('pagefind/', site)} — no
server-side API. To query it programmatically from a JS runtime (browser, Deno,
or a headless page):

    const pagefind = await import("${new URL('pagefind/pagefind.js', site)}");
    const { results } = await pagefind.search("your query");
    const first = await results[0].data(); // { url, excerpt, meta, ... }

The index covers post and About-page content only (no site chrome). For bulk
analysis, fetching llms-full.txt is simpler than searching.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
