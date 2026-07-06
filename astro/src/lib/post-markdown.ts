/**
 * Render a blog post to its raw-markdown mirror: an H1 title, a metadata block
 * (synopsis, author, date, tags/categories, canonical URL), a `---` rule, then
 * the trimmed body. Kept free of `astro:content` imports so it's unit-testable
 * outside Astro's Vite pipeline. Used by the /blog/<id>/index.md endpoint and by
 * /llms-full.txt.
 */

/** The subset of a content-collection entry this helper reads. */
export interface MarkdownPost {
  id: string;
  body?: string;
  data: {
    title: string;
    synopsis?: string;
    date: Date;
    author: string;
    tags: string[];
    categories: string[];
  };
}

export function postToMarkdown(post: MarkdownPost, site: string | URL): string {
  const { title, synopsis, date, author, tags, categories } = post.data;
  const meta = [
    `# ${title}`,
    '',
    synopsis ? `> ${synopsis}\n` : null,
    `- Author: ${author}`,
    `- Date: ${date.toISOString().slice(0, 10)}`,
    tags.length ? `- Tags: ${tags.join(', ')}` : null,
    categories.length ? `- Categories: ${categories.join(', ')}` : null,
    `- Canonical: ${new URL(`blog/${post.id}/`, site)}`,
    '',
    '---',
    '',
  ].filter((l) => l !== null);
  return meta.join('\n') + (post.body ?? '').trim() + '\n';
}
