import { devices, type PlaywrightTestConfig } from '@playwright/test';


/**. This is for specifying environment file
 * dotenv.config({
 *   path: process.env.ENV_NAME ? `./env-files/.env.${process.env.ENV_NAME}` : `./env-files/.env.demo`
 * });
 */

const config: PlaywrightTestConfig = {
  testDir: './tests', // Directory where test files are located
  /* Maximum time one test can run for. */
  timeout: 60 * 1000, // 60 seconds (increased from default 30s due to website slowness/ads)
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000, // 10 seconds (increased from default 5s)
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // Default console reporter
    ['html', { open: 'on-failure', outputFolder: 'html-report' }], // HTML reporter
    ['allure-playwright', {
        detail: true,
        open: 'on-failure',
        outputFolder: 'allure-results',
        suiteTitle: false,
        environmentInfo: {
            NODE_VERSION: process.version,
            OS: process.platform,
            // Add any other environment info you want
        }
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10 * 1000, // 10 seconds for actions such as click() (increased from default 0)
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000', // Example, not used for automationexercise.com

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure', 
    headless: false, 
    permissions: ['clipboard-read', 'clipboard-write'],

    /* Ignores HTTPS errors, useful for local development with self-signed certificates */
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        // ...devices['Desktop Chrome'],
        viewport: null, // Allow browser to use full available screen
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 1000, // Slow down actions by 1 second for debugging purposes
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  // 🟥 Optional: for visual assertion screenshots
  //--------------------------------------------//
  snapshotPathTemplate: 'test-results/screenshots/{testName}-{projectName}-{arg}{ext}',
  
  
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;