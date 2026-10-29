// Mirrors the `basePath` passed to `next.config.ts`. Only the GitHub Pages deploy workflow sets
// PAGES_BASE_PATH, so local dev, CI and Playwright keep building and serving from "/". Both reads
// must agree, because Next.js resolves `basePath` at build time and does not expose it at runtime.
// A function, not a frozen constant, so a test can set the env var and observe a fresh read.
export function getBasePath() {
  return process.env.PAGES_BASE_PATH ?? '';
}
