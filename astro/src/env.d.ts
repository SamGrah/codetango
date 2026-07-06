/// <reference types="astro/client" />

// Fontsource variable packages expose CSS-only entry points with no bundled type
// declarations; the bare side-effect import in Base.astro loads their @font-face
// CSS at build time. Declare the module so `astro check` doesn't treat it as missing.
declare module '@fontsource-variable/open-sans';
