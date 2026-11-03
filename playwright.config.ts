import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    actionTimeout: 6000,
    baseURL: "http://127.0.0.1:43173",
    trace: "retain-on-failure",
    locale: "en-US",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "node scripts/test-api.mjs",
      url: "http://127.0.0.1:43176/health",
      reuseExistingServer: false,
      timeout: 60000,
    },
    {
      command:
        "node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 43173 --strictPort",
      url: "http://127.0.0.1:43173",
      reuseExistingServer: false,
      env: { BRUMA_API_URL: "http://127.0.0.1:43176" },
    },
  ],
});
