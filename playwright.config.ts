import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
//1: install dotEnv dependency
//2: create .env file under /env directory 
/*
  .env: 
    APP_NAME=brandonApp
    ENVIRONMENT=test
  env.dev:
    VERSION=1.0.0
  env.test:
    VERSION=1.1.1
  env.uat:
    VERSION=1.1.2
*/
//3: config base .env file
// dotenv.config({ path: ('env/.env') });

const APP_NAME = process.env.APP_NAME || 'brandonApp';
const ENV = process.env.ENVIRONMENT || 'dev';
const specificEnvFile = path.resolve(__dirname, `.env.${ENV}`);
dotenv.config({ path: path.resolve(__dirname, `.env.${ENV}`) });
console.log(`Loading environment: ${ENV} from ${specificEnvFile}`);
const VERSION = process.env.VERSION || '1.1.0';

//4: Dynamically load env files based on ENVIRONMENT variable


console.log(APP_NAME, VERSION, ENV);
const RESULTS_PATH = `${APP_NAME}/${VERSION}/${ENV}`;

// 01: Grab the target env

// 02: Check if it is locdal or not
// 03: if local, set empty allure-results path
// 04: if not local, set allure-results path to include app name, version, env
const AllureResultsPath = ENV === 'local' ? '' : `allure-results/${RESULTS_PATH}`;


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
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
    ['list'],  // keeps default terminal output
    ['allure-playwright', {
      resultsDir: AllureResultsPath,
      details: true,
    }

    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
