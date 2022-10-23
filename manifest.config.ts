import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;
import dotenv from "dotenv";
dotenv.config();

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: "mv3-solid-template",
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  action: { default_popup: "index.html" },
  content_scripts: [
    {
      js: ["./src/contents/index.tsx"],
      matches: ["https://www.google.com/*"],
    },
  ],
  background: {
    service_worker: "src/background.ts",
  },
  permissions: ["identity", "tabs", "storage"],
  key: process.env.VITE_MV3_KEY,
  oauth2: {
    client_id: process.env.VITE_OAUTH2_CLIENT_ID ?? "",
    scopes: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  },
}));
