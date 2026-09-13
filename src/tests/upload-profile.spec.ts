import { test, expect } from '../fixtures/CustomFixtures';
import { testData } from '../utils/testData';
import fs from 'fs';

test('Upload profile picture and validate endpoints', async ({ page, loginPage, homePage, profilePage }) => {
  const apiCalls: Array<{ url: string; status: number; method: string }> = [];

  page.on('response', response => {
    try {
      const request = response.request();
      const method = request.method();
      const url = response.url();

      if (method !== 'GET') {
        apiCalls.push({ url, status: response.status(), method });
      }
    } catch {
      // ignore response parsing issues
    }
  });

  await loginPage.openNdosiPage();
  await loginPage.navigateToLoginPage();
  await loginPage.userLogin(testData.username, testData.password);

  await homePage.openMyProfile();

  const beforeSrc = await profilePage.getCurrentProfileImageSrc();
  await profilePage.openEditProfile();
  await profilePage.uploadProfileImage(testData.profileImagePath);
  await profilePage.expectProfileImageChanged(beforeSrc);

  fs.writeFileSync('endpoints.json', JSON.stringify({ base: testData.baseUrl, apiCalls }, null, 2));

  for (const call of apiCalls) {
    expect(call.status).toBeLessThan(400);
  }
});
