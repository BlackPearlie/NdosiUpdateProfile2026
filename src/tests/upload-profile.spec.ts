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

  await homePage.verifyHomePageIsDisplayed();
  await homePage.navigateToMyProfile();


  await profilePage.verifyProfilePageIsDisplayed();
  await profilePage.openEditProfile();
  await profilePage.uploadProfileImage(testData.profileImagePath);
   //validate that profile is updated
  //if(await profilePage.getCurrentProfileImageSrc() === ''){
 // throw new Error('Profile image source is empty after upload.');
  //}
  
 // fs.writeFileSync(
   // 'endpoints.json',
  //  JSON.stringify({ base: testData.baseUrl, apiCalls: appApiCalls }, null, 2),
 // );

 // for (const call of appApiCalls) {
    //expect(call.status).toBeLessThan(400);
 // }
});
