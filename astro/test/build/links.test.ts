import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';
import { parse } from 'node-html-parser';
import { ensureBuilt, DIST } from '../helpers/ensure-build';

function htmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const EXTERNAL = /^(https?:)?\/\/|^(mailto:|tel:|data:|#|javascript:)/i;

/** Map a site-absolute or relative URL path to the file it should resolve to in dist. */
function resolveToFile(rawUrl: string, fromFile: string): string | null {
  const url = rawUrl.split('#')[0].split('?')[0];
  if (!url) return null; // pure fragment/query
  let rel: string;
  if (url.startsWith('/')) {
    rel = url;
  } else {
    // relative to the directory of the containing HTML file, expressed under dist
    const fromDir = '/' + posix.relative(DIST, dirname(fromFile));
    rel = posix.normalize(posix.join(fromDir === '/.' ? '/' : fromDir, url));
  }
  const candidates: string[] = [];
  if (rel.endsWith('/')) {
    candidates.push(rel + 'index.html');
  } else if (posix.extname(rel)) {
    candidates.push(rel); // has an explicit extension (.md, .svg, .xml, .js, .css, …)
  } else {
    candidates.push(rel + '/index.html', rel + '.html');
  }
  return candidates.find((c) => existsSync(join(DIST, c))) ?? null;
}

describe('internal link & asset integrity', () => {
  beforeAll(ensureBuilt);

  it('every internal href/src in built HTML resolves to a file in dist', () => {
    const broken: string[] = [];
    for (const file of htmlFiles(DIST)) {
      const root = parse(readFileSync(file, 'utf8'));
      const refs = [
        ...root.querySelectorAll('a[href]').map((el) => el.getAttribute('href')!),
        ...root.querySelectorAll('link[href]').map((el) => el.getAttribute('href')!),
        ...root.querySelectorAll('script[src]').map((el) => el.getAttribute('src')!),
        ...root.querySelectorAll('img[src]').map((el) => el.getAttribute('src')!),
      ];
      for (const ref of refs) {
        if (!ref || EXTERNAL.test(ref)) continue;
        if (!resolveToFile(ref, file)) {
          broken.push(`${posix.relative(DIST, file)} → ${ref}`);
        }
      }
    }
    expect(broken, `broken internal links:\n${broken.join('\n')}`).toEqual([]);
  });
});
