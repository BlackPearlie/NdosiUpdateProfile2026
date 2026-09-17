import { expect, test } from '../fixtures/CustomFixtures';
import { testData } from '../utils/testData';

test('Upload profile picture and validate endpoint responses', async ({ page, loginPage, homePage, profilePage }, testInfo) => {
  const endpointResponses = new Map<string, { method: string; url: string; status: number }>();
  const nonBlockingEndpoints = new Set([
    'GET https://www.ndosiautomation.co.za/APIDEV/student/today'
  ]);

  page.on('response', response => {
    const resourceType = response.request().resourceType();
    if (resourceType !== 'xhr' && resourceType !== 'fetch') {
      return;
    }

    const method = response.request().method();
    const url = response.url();
    endpointResponses.set(`${method} ${url}`, { method, url, status: response.status() });
  });

  await test.step('Authenticate user', async () => {
    await loginPage.openNdosiPage();
    await loginPage.navigateToLoginPage();
    await loginPage.userLogin(testData.username, testData.password);
  });

  await test.step('Open profile editor', async () => {
    await homePage.verifyHomePageIsDisplayed();
    await homePage.navigateToMyProfile();
    await profilePage.verifyProfilePageIsDisplayed();
    await profilePage.openEditProfile();
  });

  await test.step('Upload and save profile picture', async () => {
    await profilePage.uploadProfileImage(testData.profileImagePath);
  });
 
  expect(endpointResponses.size).toBeGreaterThan(0);
  await test.step('Validate API responses', async () => {
    const endpointSummary = [...endpointResponses.values()];
    await testInfo.attach('endpoint-responses.json', {
      body: JSON.stringify(endpointSummary, null, 2),
      contentType: 'application/json'
    });

    for (const endpoint of endpointSummary) {
      console.log(`${endpoint.method} ${endpoint.url} -> ${endpoint.status}`);
      if (nonBlockingEndpoints.has(`${endpoint.method} ${endpoint.url}`)) {
        testInfo.annotations.push({
          type: 'known-issue',
          description: `${endpoint.method} ${endpoint.url} returned ${endpoint.status}`
        });
        console.warn(`Non-blocking endpoint response: ${endpoint.method} ${endpoint.url} -> ${endpoint.status}`);
        continue;
      }
      expect.soft(endpoint.status, `${endpoint.method} ${endpoint.url}`).toBeLessThan(400);
    }
  });
});
