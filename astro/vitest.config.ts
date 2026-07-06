import { defineConfig } from 'vitest/config';

// Tests deliberately avoid `astro:*` imports (which only resolve inside Astro's
// Vite pipeline), so a plain Vitest config is enough — no getViteConfig needed.
// Unit/convention tests are instant; build-output tests in test/build/** may
// trigger an `astro build` via ensureBuilt(), hence the generous timeout.
export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Builds dist/ once (if missing) before workers start — avoids the parallel
    // per-file build race. No-op in CI, where the build ran before `npm test`.
    globalSetup: ['./test/global-setup.ts'],
    testTimeout: 120_000,
    hookTimeout: 180_000,
  },
});
