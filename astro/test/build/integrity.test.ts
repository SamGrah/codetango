import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ensureBuilt, DIST } from '../helpers/ensure-build';

const CHARTS = fileURLToPath(new URL('../../public/charts', import.meta.url));

describe('build integrity', () => {
  beforeAll(ensureBuilt);

  it('emits the sitemap index', () => {
    expect(existsSync(`${DIST}/sitemap-index.xml`)).toBe(true);
  });

  it('builds the Pagefind search index', () => {
    expect(existsSync(`${DIST}/pagefind/pagefind-entry.json`)).toBe(true);
  });

  it('compiles the Vega-Lite chart pipeline to SVG', () => {
    const svgs = existsSync(CHARTS) ? readdirSync(CHARTS).filter((f) => f.endsWith('.svg')) : [];
    expect(svgs.length, 'at least one chart SVG produced').toBeGreaterThan(0);
  });

  it('renders the homepage', () => {
    expect(existsSync(`${DIST}/index.html`)).toBe(true);
  });
});
