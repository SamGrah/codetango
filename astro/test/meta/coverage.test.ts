import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Coverage guard — the deterministic half of "tests stay in sync as the project
 * grows". Content is auto-covered (the convention/agent-surface tests enumerate
 * the blog collection at runtime), so this file guards *functionality*:
 *
 *   1. Every exported function in src/lib/ must be named in some test.
 *   2. Every API endpoint in src/pages/ (a .js/.ts route that returns a Response)
 *      must have its output path asserted by a build-output test.
 *
 * When this fails, you added functionality without a test. The fix is to write
 * the test — see .claude/instructions/testing.md for which kind goes where.
 */

const ROOT = fileURLToPath(new URL('..', import.meta.url)); // astro/test/
const SRC = fileURLToPath(new URL('../../src', import.meta.url)); // astro/src/

function walk(dir: string, filter: (f: string) => boolean): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

const allTestSrc = walk(ROOT, (f) => f.endsWith('.test.ts'))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');
const buildTestSrc = walk(join(ROOT, 'build'), (f) => f.endsWith('.test.ts'))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');

describe('coverage: every exported lib function is referenced by a test', () => {
  const libFns = walk(join(SRC, 'lib'), (f) => f.endsWith('.ts')).flatMap((file) => {
    const code = readFileSync(file, 'utf8');
    const names = [
      ...code.matchAll(/export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/g),
      ...code.matchAll(/export\s+const\s+([A-Za-z0-9_]+)\s*=/g),
    ].map((m) => m[1]);
    return names.map((name) => ({ file: file.slice(SRC.length + 1), name }));
  });

  it.each(libFns)('$name ($file) is tested', ({ name }) => {
    // Word-boundary match so `readingTime` isn't satisfied by `readingTimeX`.
    expect(new RegExp(`\\b${name}\\b`).test(allTestSrc), `no test references ${name}()`).toBe(true);
  });
});

describe('coverage: every API endpoint has a build-output assertion', () => {
  // .js/.ts files under src/pages are non-HTML routes (llms.txt, rss.xml, the
  // markdown mirror, …). Their emitted path = filename minus the .js/.ts suffix.
  const endpoints = walk(join(SRC, 'pages'), (f) => /\.(js|ts)$/.test(f)).map((file) => {
    const base = file.split('/').pop()!;
    return { file: file.slice(SRC.length + 1), output: base.replace(/\.(js|ts)$/, '') };
  });

  it('found the known endpoints (sanity: the walker sees pages/)', () => {
    expect(endpoints.length).toBeGreaterThan(0);
  });

  it.each(endpoints)('output "$output" ($file) is asserted in test/build', ({ output }) => {
    expect(
      buildTestSrc.includes(output),
      `no build test references the "${output}" endpoint output`
    ).toBe(true);
  });
});
