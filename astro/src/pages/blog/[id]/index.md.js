// Raw-markdown mirror of every post at /blog/<slug>/index.md — the agent-facing
// version of the page. LLMs parse markdown at a fraction of the token cost of the
// HTML page; each post's <head> advertises this via rel="alternate" and llms.txt
// links here directly.
import { getCollection } from 'astro:content';
import { postToMarkdown } from '../../../lib/post-markdown';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
}

export async function GET({ props, site }) {
  return new Response(postToMarkdown(props.post, site), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
