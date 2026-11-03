import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e-api",
  workers: 1,
  fullyParallel: false,
  use: { baseURL: "http://127.0.0.1:43176" },
  reporter: "list",
  webServer: {
    command: "node scripts/test-api.mjs",
    url: "http://127.0.0.1:43176/health",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
