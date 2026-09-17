import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests',
  timeout: 60_000,
  retries: 1,
  outputDir: 'test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright', { resultsDir: 'allure-results' }]
  ],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    baseURL: process.env.BASE_URL || 'https://ndosisimplifiedautomation.vercel.app/'
  },
  projects: [
    {
      name: 'chrome',
       use: {
         ...devices['Desktop Chrome'],
      channel: 'chrome',
      launchOptions: {
        args: ['--start-maximized']
      }
      }
    }
  ]
});
