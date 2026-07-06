// Build-time chart pipeline: compiles every src/charts/*.vl.json Vega-Lite spec to a
// static SVG in public/charts/ — no client-side JS, crawlable vector output. Mirrors the
// Mermaid → SVG approach. Runs automatically before `dev` and `build` (see package.json);
// run standalone with `npm run charts`.
//
// Authoring a chart: drop a `<name>.vl.json` Vega-Lite spec in src/charts/. The site's
// brand theme (src/charts/_theme.mjs) is merged in automatically. Reference the output in
// a post as an image: ![alt text](/charts/<name>.svg)

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as vega from 'vega';
import { compile } from 'vega-lite';
import { chartTheme } from '../src/charts/_theme.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(here, '../src/charts');
const outDir = path.resolve(here, '../public/charts');

await mkdir(outDir, { recursive: true });

const specs = (await readdir(srcDir)).filter((f) => f.endsWith('.vl.json')).sort();

if (specs.length === 0) {
  console.log('charts: no *.vl.json specs in src/charts/ — nothing to build');
  process.exit(0);
}

let built = 0;
for (const file of specs) {
  const name = file.replace(/\.vl\.json$/, '');
  try {
    const vlSpec = JSON.parse(await readFile(path.join(srcDir, file), 'utf8'));
    // Brand theme first, then any per-spec config wins.
    vlSpec.config = { ...chartTheme, ...(vlSpec.config ?? {}) };

    const vgSpec = compile(vlSpec).spec;
    const view = new vega.View(vega.parse(vgSpec), { renderer: 'none' }).logLevel(vega.Error);
    const svg = await view.toSVG();

    await writeFile(path.join(outDir, `${name}.svg`), svg, 'utf8');
    console.log(`charts: ${file} → public/charts/${name}.svg`);
    built += 1;
  } catch (err) {
    console.error(`charts: FAILED to build ${file}\n  ${err.message}`);
    process.exitCode = 1;
  }
}

console.log(`charts: built ${built}/${specs.length} chart(s)`);
