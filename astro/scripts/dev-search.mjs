// Make search work under `npm run dev`.
//
// Pagefind's assets (component UI + index) are generated against dist/ by the
// postbuild step, so the dev server has nothing at /pagefind/ and the search
// modal silently never registers. This copies the most recent build's bundle
// into public/pagefind/ (gitignored) so dev serves it. The index is only as
// fresh as the last `npm run build` — fine for exercising the UI locally.
import { cpSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const src = `${root}dist/pagefind`;
const dest = `${root}public/pagefind`;

if (existsSync(src)) {
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
  console.log('dev-search: copied dist/pagefind → public/pagefind (index from last build)');
} else {
  console.log('dev-search: no dist/pagefind yet — run `npm run build` once to enable search in dev');
}
