import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 30000,
  use: {
    baseURL: "https://goodbudget.com",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  reporter: [["html", { outputFolder: "test-report", open: "never" }]],
  projects: [
    { name: "Chromium", use: { browserName: "chromium" } },
    { name: "Firefox", use: { browserName: "firefox" } },
    { name: "WebKit", use: { browserName: "webkit" } },
  ],
});
