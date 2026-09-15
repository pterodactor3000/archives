import type { NextConfig } from "next";

/** Vault static hosting on GitHub Pages (docs/apps/stack-notes, baseurl /archives). */
const vaultBase = "/archives/apps/stack-notes";

const nextConfig: NextConfig = {
  output: "export",
  basePath: vaultBase,
  assetPrefix: vaultBase,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
