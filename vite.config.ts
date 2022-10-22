import path, { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
const root = resolve(__dirname, "src");
export default defineConfig({
  resolve: {
    alias: {
      "@src": root,
    },
  },
  plugins: [solidPlugin(), crx({ manifest })],
});
