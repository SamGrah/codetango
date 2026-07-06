import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const BLOG_DIR = fileURLToPath(new URL('../../src/content/blog', import.meta.url));
const POST_FORMATTING = fileURLToPath(
  new URL('../../../.claude/instructions/post-formatting.md', import.meta.url)
);

/** Pull every `backtick-wrapped` token out of a slice of the formatting doc. */
function backtickTokens(section: string): string[] {
  return [...section.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
}

/** Parse the canonical tag & category vocabularies from post-formatting.md — the
 *  single source of truth, so tests never drift from the documented lists. */
function loadVocabulary() {
  const doc = readFileSync(POST_FORMATTING, 'utf8');
  const tagStart = doc.indexOf('## Tag Vocabulary');
  const catStart = doc.indexOf('## Category Vocabulary');
  expect(tagStart, 'Tag Vocabulary heading present').toBeGreaterThan(-1);
  expect(catStart, 'Category Vocabulary heading present').toBeGreaterThan(-1);
  const tagSection = doc.slice(tagStart, catStart);
  const catSectionEnd = doc.indexOf('\n## ', catStart + 1);
  const catSection = doc.slice(catStart, catSectionEnd === -1 ? undefined : catSectionEnd);
  return {
    tags: new Set(backtickTokens(tagSection)),
    categories: new Set(backtickTokens(catSection)),
  };
}

const vocab = loadVocabulary();
const postFiles = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
const posts = postFiles.map((file) => ({
  file,
  ...matter(readFileSync(`${BLOG_DIR}/${file}`, 'utf8')),
}));

describe('blog content conventions', () => {
  it('the vocabulary lists parsed and are non-empty', () => {
    expect(vocab.tags.size).toBeGreaterThan(10);
    expect(vocab.categories.has('Testing')).toBe(true);
    expect(vocab.categories.has('Agentic Development')).toBe(true);
  });

  it('there is at least one post to validate', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  describe.each(posts)('$file', ({ file, data }) => {
    it('has a non-empty string title', () => {
      expect(typeof data.title).toBe('string');
      expect(data.title.trim().length).toBeGreaterThan(0);
    });

    it('has a valid date', () => {
      // gray-matter yields a Date for unquoted YYYY-MM-DD; be liberal otherwise.
      const d = data.date instanceof Date ? data.date : new Date(data.date);
      expect(data.date, 'date frontmatter present').toBeDefined();
      expect(Number.isNaN(d.valueOf())).toBe(false);
    });

    it('uses a kebab-case filename', () => {
      expect(file).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*\.md$/);
    });

    it('uses only canonical tags', () => {
      const tags: string[] = data.tags ?? [];
      const unknown = tags.filter((t) => !vocab.tags.has(t));
      expect(unknown, `off-vocabulary tags in ${file}`).toEqual([]);
    });

    it('uses only canonical categories', () => {
      const categories: string[] = data.categories ?? [];
      const unknown = categories.filter((c) => !vocab.categories.has(c));
      expect(unknown, `off-vocabulary categories in ${file}`).toEqual([]);
    });
  });
});
