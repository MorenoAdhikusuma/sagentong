import "@sagentong/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  transpilePackages: ["@sagentong/db", "@sagentong/auth", "@sagentong/env"],
  serverExternalPackages: ["pg"],
};

export default nextConfig;
