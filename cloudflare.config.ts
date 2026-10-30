import { bindings, defineConfig, defineWorker } from "cf/config";

// Intentionally isolated from pincodeit.com; never attach a production domain here.
export default defineConfig({
  worker: defineWorker({
    name: "cf-migrate-pincode-preview",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-30",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none" },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
    },
  }),
});
