import { expect, test } from '../fixtures/CustomFixtures';
import { testData } from '../utils/testData';

test('Upload profile picture and validate endpoint responses', async ({ page, loginPage, homePage, profilePage }) => {
  const endpointResponses = new Map<string, { method: string; url: string; status: number }>();
 // Define non-blocking endpoints that can fail without failing the test
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

  await loginPage.openNdosiPage();
  await loginPage.navigateToLoginPage();
  await loginPage.userLogin(testData.username, testData.password);

  await homePage.verifyHomePageIsDisplayed();
  await homePage.navigateToMyProfile();


  await profilePage.verifyProfilePageIsDisplayed();
  await profilePage.openEditProfile();
  await profilePage.uploadProfileImage(testData.profileImagePath);
 
  // Validate endpoint responses and log it
  expect(endpointResponses.size).toBeGreaterThan(0);
  for (const endpoint of endpointResponses.values()) {
    console.log(`${endpoint.method} ${endpoint.url} -> ${endpoint.status}`);
    //making the test pass even if the endpoint fails, but logging a warning for non-blocking endpoints
    if (nonBlockingEndpoints.has(`${endpoint.method} ${endpoint.url}`)) {
      console.warn(`Non-blocking endpoint response: ${endpoint.method} ${endpoint.url} -> ${endpoint.status}`);
      continue;
    }
    expect.soft(endpoint.status, `${endpoint.method} ${endpoint.url}`).toBeLessThan(400);
  }
});
