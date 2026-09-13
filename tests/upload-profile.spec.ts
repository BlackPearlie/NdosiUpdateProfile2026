import { test, expect } from '@playwright/test';
import selectors from '../src/selectors';
import fs from 'fs';

test('Upload profile picture and validate endpoints', async ({ page, context }) => {
  const base = process.env.BASE_URL || 'http://localhost:3000';
  const username = process.env.NDOSI_USERNAME || 'user@example.com';
  const password = process.env.NDOSI_PASSWORD || 'password';
  const picturePath = process.env.PROFILE_PICTURE || 'assets/profile.png';

  await page.goto(base);

  // capture relevant responses
  const apiCalls: Array<{ url: string; status: number; method: string }> = [];
  page.on('response', resp => {
    try {
      const req = resp.request();
      const method = req.method();
      const url = resp.url();
      if (method !== 'GET') {
        apiCalls.push({ url, status: resp.status(), method });
      }
    } catch (e) {
      // ignore
    }
  });

  // UI steps (selectors are configurable in src/selectors.ts)
  await page.fill(selectors.login.username, username);
  await page.fill(selectors.login.password, password);
  await page.click(selectors.login.submit);

  await page.click(selectors.menu);
  await page.click(selectors.myProfile);

  // store current profile src to compare later
  let beforeSrc = '';
  try {
    beforeSrc = await page.getAttribute(selectors.profileImage, 'src') || '';
  } catch (e) {
    beforeSrc = '';
  }

  await page.click(selectors.editProfile);
  const fileInput = await page.waitForSelector(selectors.fileInput);
  await fileInput.setInputFiles(picturePath);
  await page.click(selectors.saveButton);

  // wait for some network activity to settle
  await page.waitForTimeout(2000);

  // validate that profile image changed
  const afterSrc = await page.getAttribute(selectors.profileImage, 'src');
  expect(afterSrc).toBeTruthy();
  expect(afterSrc).not.toBe(beforeSrc);

  // Save endpoints to artifact
  const endpointsLog = { base, apiCalls };
  fs.writeFileSync('endpoints.json', JSON.stringify(endpointsLog, null, 2));

  // Validate response codes for collected API calls
  for (const call of apiCalls) {
    expect(call.status).toBeLessThan(400);
  }
});
