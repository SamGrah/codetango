import { describe, it, expect, beforeAll } from 'vitest';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ensureBuilt, DIST } from '../helpers/ensure-build';

/** Recursively collect .js files under dir, excluding the pagefind bundle. */
function siteJsFiles(dir: string, base = dir): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    const rel = full.slice(base.length + 1);
    if (rel.startsWith('pagefind/')) continue; // search bundle is a sanctioned exception
    if (entry.isDirectory()) out.push(...siteJsFiles(full, base));
    else if (entry.name.endsWith('.js')) out.push(rel);
  }
  return out;
}

describe('near-zero-JS budget', () => {
  beforeAll(ensureBuilt);

  it('ships exactly one client bundle (ClientRouter only)', () => {
    const js = siteJsFiles(DIST);
    // If this fails, a component was hydrated with client:* or a script crept in.
    expect(js, `unexpected client JS: ${js.join(', ')}`).toHaveLength(1);
  });
});
