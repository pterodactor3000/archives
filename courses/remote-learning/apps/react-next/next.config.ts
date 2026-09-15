import type { NextConfig } from "next";

/** Vault static hosting on GitHub Pages (docs/apps/remote-learning/react-next). */
const vaultBase = "/archives/apps/remote-learning/react-next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: vaultBase,
  assetPrefix: vaultBase,
  images: { unoptimized: true },
  trailingSlash: true,
  reactCompiler: true,
};

export default nextConfig;
