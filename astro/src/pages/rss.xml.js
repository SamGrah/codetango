import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const md = new MarkdownIt({ html: false, linkify: true });

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'codeTango',
    description: 'A technical blog about agentic AI development and operations.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.synopsis,
      link: `/blog/${post.id}/`,
      categories: [...post.data.categories, ...post.data.tags],
      // Full post body so feed readers (and feed-reading agents) never need a
      // second fetch. Rendered with plain markdown-it — no Shiki highlighting
      // in feeds — and root-relative image/link URLs made absolute.
      content: sanitizeHtml(md.render(post.body ?? ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        transformTags: {
          img: (tagName, attribs) => ({
            tagName,
            attribs: {
              ...attribs,
              src: attribs.src?.startsWith('/')
                ? new URL(attribs.src, context.site).href
                : attribs.src,
            },
          }),
          a: (tagName, attribs) => ({
            tagName,
            attribs: {
              ...attribs,
              href: attribs.href?.startsWith('/')
                ? new URL(attribs.href, context.site).href
                : attribs.href,
            },
          }),
        },
      }),
    })),
  });
}
