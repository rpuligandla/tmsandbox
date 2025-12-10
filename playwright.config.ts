import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: "./tests",

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["junit", { outputFile: "test-results/results.xml" }],
    ["line"], // Add line reporter for better console output
  ],

  // Shared settings for all the projects below
  use: {
    // Collect trace when retrying the failed test
    trace: "on-first-retry",

    // API request context options
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Playwright-API-Tests/1.0",
    },

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video recording
    video: "retain-on-failure",
  },

  // Configure projects for different test suites
  projects: [
    {
      name: "tmsandbox-api-tests",
      testMatch: /.*tmsandbox.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        // TM Sandbox API-specific settings
        headless: true,
        baseURL: "https://api.tmsandbox.co.nz",
        extraHTTPHeaders: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Playwright-TMSandbox-Tests/1.0",
        },
      },
    },
    {
      name: "example-api-tests",
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        // Example API tests (JSONPlaceholder)
        headless: true,
        baseURL: "https://jsonplaceholder.typicode.com",
        extraHTTPHeaders: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Playwright-Example-Tests/1.0",
        },
      },
    },
    {
      name: "all-other-tests",
      testMatch: /.*\.spec\.ts/,
      testIgnore: [/.*tmsandbox.*\.spec\.ts/, /.*\.api\.spec\.ts/],
      use: {
        ...devices["Desktop Chrome"],
        // General test settings
        headless: true,
      },
    },
  ],

  // Output directory for test results
  outputDir: "test-results/",

  // Global test timeout (5 minutes)
  timeout: 300000,

  // Expect timeout (10 seconds)
  expect: {
    timeout: 10000,
  },

  // Web Server (if needed for local testing)
  // webServer: {
  //   command: 'npm run start:api',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  // },
});
