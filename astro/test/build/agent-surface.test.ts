import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { ensureBuilt, DIST, publishedPosts } from '../helpers/ensure-build';

const read = (rel: string) => readFileSync(`${DIST}/${rel}`, 'utf8');
const posts = publishedPosts();

describe('agent-facing surface', () => {
  beforeAll(ensureBuilt);

  describe.each(posts)('post $id', ({ id }) => {
    it('has an HTML page', () => {
      expect(existsSync(`${DIST}/blog/${id}/index.html`)).toBe(true);
    });

    it('has a raw-markdown mirror shaped like postToMarkdown output', () => {
      const md = read(`blog/${id}/index.md`);
      expect(md.startsWith('# ')).toBe(true);
      expect(md).toContain(`- Canonical: https://codetango.vercel.app/blog/${id}/`);
      expect(md).toContain('\n---\n');
    });

    it('advertises the markdown mirror via rel="alternate" in the HTML head', () => {
      const html = read(`blog/${id}/index.html`);
      expect(html).toMatch(
        new RegExp(
          `<link[^>]+rel="alternate"[^>]+type="text/markdown"[^>]+href="/blog/${id}/index\\.md"`
        )
      );
    });
  });

  it('llms.txt lists every published post by its markdown-mirror URL', () => {
    const llms = read('llms.txt');
    for (const { id } of posts) {
      expect(llms).toContain(`/blog/${id}/index.md`);
    }
  });

  it('llms-full.txt contains every post title', () => {
    const full = read('llms-full.txt');
    for (const { data } of posts) {
      expect(full).toContain(data.title);
    }
  });

  it('robots.txt allows AI crawlers and points to the sitemap', () => {
    const robots = read('robots.txt');
    expect(robots).toMatch(/User-agent:\s*GPTBot/);
    expect(robots).toMatch(/User-agent:\s*ClaudeBot/);
    expect(robots).toMatch(/Sitemap:\s*https:\/\/codetango\.vercel\.app\/sitemap-index\.xml/);
  });

  describe('RSS feed', () => {
    const rss = read('rss.xml');
    // @astrojs/rss entity-escapes content:encoded (no CDATA); tolerate both forms.
    const encoded = [
      ...rss.matchAll(/<content:encoded>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content:encoded>/g),
    ].map((m) => m[1]);

    it('has one item per published post', () => {
      const items = rss.match(/<item>/g) ?? [];
      expect(items).toHaveLength(posts.length);
    });

    it('carries a full-content block for every item', () => {
      expect(encoded.length).toBe(posts.length);
    });

    it('the content is the full body, far longer than the synopsis', () => {
      const withSynopsis = posts.find((p) => p.data.synopsis);
      if (withSynopsis) {
        const longest = Math.max(...encoded.map((c) => c.length));
        expect(longest).toBeGreaterThan((withSynopsis.data.synopsis ?? '').length + 100);
      }
    });

    it('absolutizes root-relative links/images (none leak into the feed body)', () => {
      // Feed body is HTML-entity-escaped, so a root-relative href reads href=&quot;/… .
      // Also guard the raw form in case a future change switches to CDATA.
      for (const body of encoded) {
        expect(body).not.toMatch(/(?:href|src)=(?:"|&quot;)\/[^/]/);
      }
    });
  });
});
