import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

export const ASTRO_ROOT = fileURLToPath(new URL('../..', import.meta.url));
export const DIST = fileURLToPath(new URL('../../dist', import.meta.url));
export const BLOG_DIR = fileURLToPath(new URL('../../src/content/blog', import.meta.url));

/** Ensure a production build exists in dist/. In CI the build already ran, so
 *  this is a no-op; locally it makes `npm test` self-contained. */
export function ensureBuilt(): void {
  if (existsSync(`${DIST}/index.html`)) return;
  execSync('npm run build', { cwd: ASTRO_ROOT, stdio: 'inherit' });
}

export interface PostFrontmatter {
  title: string;
  synopsis?: string;
  date: Date;
  tags?: string[];
  categories?: string[];
  draft?: boolean;
}

/** The non-draft posts as they appear in dist, keyed by slug (= filename sans .md). */
export function publishedPosts(): { id: string; data: PostFrontmatter }[] {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data } = matter(readFileSync(`${BLOG_DIR}/${file}`, 'utf8'));
      return { id: file.replace(/\.md$/, ''), data: data as PostFrontmatter };
    })
    .filter((p) => !p.data.draft);
}
