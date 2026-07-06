import { ensureBuilt } from './helpers/ensure-build';

// Runs ONCE in the main process before any test worker starts collecting — the
// correct place to guarantee dist/ exists. (Per-file beforeAll hooks would race:
// Vitest runs the build-output files in parallel, firing concurrent builds.)
export default function setup() {
  ensureBuilt();
}
