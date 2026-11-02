import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4173";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.mjs",
  timeout: 90_000,
  expect: { timeout: 12_000 },
  fullyParallel: false,
  workers: process.env.CI ? 1 : 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  use: {
    baseURL,
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: 12_000,
    navigationTimeout: 35_000,
    serviceWorkers: "block",
  },
  webServer: {
    command: "npm run start -- -p 4173",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 150_000,
    env: { NEXT_TELEMETRY_DISABLED: "1" },
  },
});
