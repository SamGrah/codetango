import { describe, it, expect } from 'vitest';
import { postToMarkdown, type MarkdownPost } from '../../src/lib/post-markdown';

const SITE = 'https://codetango.vercel.app';

function makePost(overrides: Partial<MarkdownPost['data']> & { id?: string; body?: string } = {}): MarkdownPost {
  const { id = 'sample-post', body = '  Hello body.  ', ...data } = overrides;
  return {
    id,
    body,
    data: {
      title: 'Sample Post',
      synopsis: 'A short synopsis.',
      date: new Date('2026-03-14T00:00:00.000Z'),
      author: 'Sam Graham',
      tags: ['agents', 'testing'],
      categories: ['Agentic Development'],
      ...data,
    },
  };
}

describe('postToMarkdown', () => {
  it('opens with an H1 title', () => {
    expect(postToMarkdown(makePost(), SITE).startsWith('# Sample Post\n')).toBe(true);
  });

  it('includes an absolute canonical URL for the post', () => {
    expect(postToMarkdown(makePost({ id: 'my-slug' }), SITE)).toContain(
      `- Canonical: ${SITE}/blog/my-slug/`
    );
  });

  it('formats the date as YYYY-MM-DD in UTC', () => {
    expect(postToMarkdown(makePost(), SITE)).toContain('- Date: 2026-03-14');
  });

  it('emits Tags and Categories lines when present', () => {
    const md = postToMarkdown(makePost(), SITE);
    expect(md).toContain('- Tags: agents, testing');
    expect(md).toContain('- Categories: Agentic Development');
  });

  it('omits Tags/Categories lines when the arrays are empty', () => {
    const md = postToMarkdown(makePost({ tags: [], categories: [] }), SITE);
    expect(md).not.toContain('- Tags:');
    expect(md).not.toContain('- Categories:');
  });

  it('emits the synopsis blockquote only when a synopsis exists', () => {
    expect(postToMarkdown(makePost(), SITE)).toContain('> A short synopsis.');
    expect(postToMarkdown(makePost({ synopsis: undefined }), SITE)).not.toContain('>');
  });

  it('trims the body and ends with a single trailing newline', () => {
    const md = postToMarkdown(makePost({ body: '  Hello body.  ' }), SITE);
    expect(md.endsWith('Hello body.\n')).toBe(true);
    expect(md.endsWith('\n\n')).toBe(false);
  });

  it('tolerates a missing body', () => {
    expect(() => postToMarkdown(makePost({ body: undefined }), SITE)).not.toThrow();
  });
});
