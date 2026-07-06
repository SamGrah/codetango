// /llms-full.txt — the entire blog as one markdown document (llmstxt.org
// companion file). Lets an agent ingest the whole corpus in a single fetch
// instead of crawling post by post.
import { getCollection } from 'astro:content';
import { postToMarkdown } from '../lib/post-markdown';

export async function GET({ site }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const header = `# codeTango — full corpus

> All posts from https://codetango.vercel.app/, newest first, in raw markdown.
> See /llms.txt for the per-post index, feeds, and search.

`;
  const body = posts.map((p) => postToMarkdown(p, site)).join('\n\n---\n\n');

  return new Response(header + body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
