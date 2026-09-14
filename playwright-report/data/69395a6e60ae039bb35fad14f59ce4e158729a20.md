# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-profile.spec.ts >> Upload profile picture and validate endpoints
- Location: src\tests\upload-profile.spec.ts:5:5

# Error details

```
Error: Profile image source is empty after upload.
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures/CustomFixtures';
  2  | import { testData } from '../utils/testData';
  3  | import fs from 'fs';
  4  | 
  5  | test('Upload profile picture and validate endpoints', async ({ page, loginPage, homePage, profilePage }) => {
  6  |   const apiCalls: Array<{ url: string; status: number; method: string }> = [];
  7  | 
  8  |   page.on('response', response => {
  9  |     try {
  10 |       const request = response.request();
  11 |       const method = request.method();
  12 |       const url = response.url();
  13 | 
  14 |       if (method !== 'GET') {
  15 |         apiCalls.push({ url, status: response.status(), method });
  16 |       }
  17 |     } catch {
  18 |       // ignore response parsing issues
  19 |     }
  20 |   });
  21 | 
  22 |   await loginPage.openNdosiPage();
  23 |   await loginPage.navigateToLoginPage();
  24 |   await loginPage.userLogin(testData.username, testData.password);
  25 | 
  26 |   await homePage.verifyHomePageIsDisplayed();
  27 |   await homePage.navigateToMyProfile();
  28 | 
  29 | 
  30 |   await profilePage.verifyProfilePageIsDisplayed();
  31 |   await profilePage.openEditProfile();
  32 |   await profilePage.uploadProfileImage(testData.profileImagePath);
  33 |    //validate that profile is updated
  34 |   if(await profilePage.getCurrentProfileImageSrc() === ''){
> 35 |     throw new Error('Profile image source is empty after upload.');
     |           ^ Error: Profile image source is empty after upload.
  36 |   }
  37 |  // fs.writeFileSync(
  38 |    // 'endpoints.json',
  39 |   //  JSON.stringify({ base: testData.baseUrl, apiCalls: appApiCalls }, null, 2),
  40 |  // );
  41 | 
  42 |  // for (const call of appApiCalls) {
  43 |     //expect(call.status).toBeLessThan(400);
  44 |  // }
  45 | });
  46 | 
```