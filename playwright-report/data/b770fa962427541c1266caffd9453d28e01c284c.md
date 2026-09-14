# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-profile.spec.ts >> Upload profile picture and validate endpoints
- Location: src\tests\upload-profile.spec.ts:5:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: Profile image source is empty after upload.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - img "NTA Logo" [ref=e7] [cursor=pointer]
      - generic [ref=e8]:
        - button "🏠 Home" [ref=e9] [cursor=pointer]:
          - generic [ref=e10]: 🏠
          - generic [ref=e11]: Home
        - button "📖 About Us" [ref=e12] [cursor=pointer]:
          - generic [ref=e13]: 📖
          - generic [ref=e14]: About Us
        - button "⭐ Testimonials" [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: ⭐
          - generic [ref=e17]: Testimonials
        - button "👨‍🏫 Mentors" [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: 👨‍🏫
          - generic [ref=e20]: Mentors
        - button "🎓 Graduates" [ref=e21] [cursor=pointer]:
          - generic [ref=e22]: 🎓
          - generic [ref=e23]: Graduates
        - button "📞 Contact Us" [ref=e24] [cursor=pointer]:
          - generic [ref=e25]: 📞
          - generic [ref=e26]: Contact Us
        - button "📚 Learn ▼" [ref=e28] [cursor=pointer]:
          - generic [ref=e29]: 📚
          - generic [ref=e30]: Learn
          - generic [ref=e31]: ▼
        - button "🔗 Connect ▼" [ref=e33] [cursor=pointer]:
          - generic [ref=e34]: 🔗
          - generic [ref=e35]: Connect
          - generic [ref=e36]: ▼
        - button "🎯 My Learning ▼" [ref=e38] [cursor=pointer]:
          - generic [ref=e39]: 🎯
          - generic [ref=e40]: My Learning
          - generic [ref=e41]: ▼
      - button "Menu ▼" [ref=e44] [cursor=pointer]:
        - generic [ref=e46]: Menu
        - generic [ref=e47]: ▼
  - main [ref=e48]:
    - generic [ref=e49]:
      - heading "👤 My Profile" [level=2] [ref=e50]
      - generic [ref=e51]:
        - generic [ref=e52]:
          - generic [ref=e55]:
            - heading "Mpho Test" [level=3] [ref=e56]
            - paragraph [ref=e57]: mpho@gmail.com
          - generic [ref=e58]:
            - generic [ref=e59]: First Name
            - generic [ref=e60]: Mpho
          - generic [ref=e61]:
            - generic [ref=e62]: Last Name
            - generic [ref=e63]: Test
          - generic [ref=e64]:
            - generic [ref=e65]: Email
            - generic [ref=e66]: mpho@gmail.com
          - generic [ref=e67]:
            - heading "📞 Contact Details" [level=4] [ref=e68]
            - generic [ref=e69]:
              - generic [ref=e70]: Phone Number
              - generic [ref=e71]: Not provided
            - generic [ref=e72]:
              - generic [ref=e73]: GitHub Username
              - generic [ref=e74]: Not provided
            - generic [ref=e75]:
              - generic [ref=e76]: LinkedIn Profile
              - generic [ref=e77]: Not provided
          - generic [ref=e78]:
            - heading "🆘 Next of Kin" [level=4] [ref=e79]
            - generic [ref=e80]:
              - generic [ref=e81]: Phone Number
              - generic [ref=e82]: Not provided
          - generic [ref=e83]:
            - heading "🧪 Testing Experience" [level=4] [ref=e84]
            - generic [ref=e85]:
              - generic [ref=e86]: Years of Experience
              - generic [ref=e87]: Not specified
          - generic [ref=e88]:
            - heading "About Me" [level=4] [ref=e89]
            - generic [ref=e90]: Not provided
          - generic [ref=e91]:
            - button "✏️ Edit Profile" [ref=e92] [cursor=pointer]
            - button "🔒 Change Password" [ref=e93] [cursor=pointer]
        - generic [ref=e94]:
          - generic [ref=e95]:
            - heading "⭐ My Testimonials" [level=3] [ref=e96]
            - button "+ Add Review" [ref=e97] [cursor=pointer]
          - generic [ref=e98]:
            - paragraph [ref=e99]: You haven't submitted any testimonials yet.
            - paragraph [ref=e100]: Share your experience with others!
  - button "🧪 Test" [ref=e101] [cursor=pointer]
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