import type { NextConfig } from 'next';

// Set only by the GitHub Pages deploy workflow, to "/my-portfolio". Local dev, CI and Playwright
// never set it, so they keep building and serving from "/". assetPrefix must match basePath,
// otherwise /_next/* assets would still resolve at the site root under the sub-path.
// Kept in sync with src/lib/base-path.ts, which mirrors this for root-relative links in components.
const basePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
