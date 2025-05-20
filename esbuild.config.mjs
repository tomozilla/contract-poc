import { build } from "esbuild";

const isDev = process.env.RAILS_ENV === "development";

build({
  entryPoints: ["app/javascript/tiptap_bundle.js"],
  bundle: true,
  format: "esm",
  target: "es2020",
  outdir: "app/assets/builds",
  sourcemap: isDev,
  // Everything that still comes from Importmap should stay OUT of the bundle
  external: [
    "@hotwired/*",          // Turbo, Stimulus
    "lodash.debounce"       // already pinned with importmap
  ],
}).then(() => console.log("✅  TipTap bundle built")).catch(() => process.exit(1));
