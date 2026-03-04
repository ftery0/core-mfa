import { defineConfig } from "tsup";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: {
    index: "src/index.ts",
    icons: "src/icons.ts",
  },
  format: ["cjs", "esm"],
  dts: false,
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: true,
  treeshake: true,
  outDir: "dist",
  external: ["react", "react-dom", "styled-components", "@tanstack/react-query"],
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(__dirname, "src"),
    };
    options.loader = {
      ".otf": "empty",
      ".ttf": "empty",
      ".woff": "empty",
      ".woff2": "empty",
    };
  },
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
});
