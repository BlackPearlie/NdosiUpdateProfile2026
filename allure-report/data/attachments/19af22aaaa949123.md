# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-profile.spec.ts >> Upload profile picture and validate endpoint responses
- Location: src\tests\upload-profile.spec.ts:4:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForResponse: Test timeout of 60000ms exceeded.
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
              - generic [ref=e71]: "+27728476110"
            - generic [ref=e72]:
              - generic [ref=e73]: GitHub Username
              - link "🐙 git123" [ref=e75] [cursor=pointer]:
                - /url: https://github.com/git123
            - generic [ref=e76]:
              - generic [ref=e77]: LinkedIn Profile
              - generic [ref=e78]: Not provided
          - generic [ref=e79]:
            - heading "🆘 Next of Kin" [level=4] [ref=e80]
            - generic [ref=e81]:
              - generic [ref=e82]: Phone Number
              - generic [ref=e83]: "+27728476000"
          - generic [ref=e84]:
            - heading "🧪 Testing Experience" [level=4] [ref=e85]
            - generic [ref=e86]:
              - generic [ref=e87]: Years of Experience
              - generic [ref=e88]: Not specified
          - generic [ref=e89]:
            - heading "About Me" [level=4] [ref=e90]
            - generic [ref=e91]: Not provided
          - generic [ref=e92]:
            - button "✏️ Edit Profile" [ref=e93] [cursor=pointer]
            - button "🔒 Change Password" [ref=e94] [cursor=pointer]
        - generic [ref=e95]:
          - generic [ref=e96]:
            - heading "⭐ My Testimonials" [level=3] [ref=e97]
            - button "+ Add Review" [ref=e98] [cursor=pointer]
          - generic [ref=e99]:
            - paragraph [ref=e100]: You haven't submitted any testimonials yet.
            - paragraph [ref=e101]: Share your experience with others!
  - button "🧪 Test" [ref=e102] [cursor=pointer]
```

# Test source

```ts
  1  | import { Page, Response, expect } from '@playwright/test';
  2  | import { BasePage } from './base.page';
  3  | 
  4  | type ProfileUpdateResponse = {
  5  |   success: boolean;
  6  |   message: string;
  7  | };
  8  | 
  9  | const profileImageEndpoint = 'https://www.ndosiautomation.co.za/APIDEV/profile/image';
  10 | const profileImageUrl = new URL(profileImageEndpoint);
  11 | 
  12 | export class ProfilePage extends BasePage {
  13 | 
  14 |   async verifyProfilePageIsDisplayed() {
  15 | 
  16 |     const profileHeading = this.page.getByRole('heading', { name: /My Profile/i });
  17 |     await this.waitForPageReady();
  18 |     await expect(profileHeading).toBeVisible();
  19 |   }
  20 |   
  21 |   async openEditProfile(): Promise<void> {
  22 |     await this.waitForPageReady();
  23 |     await this.scrollToBottom();
  24 |     await this.click(this.page.getByText('Edit Profile'));
  25 |     const btnSave = this.page.getByRole('button', { name: 'Save Changes' });
  26 |     await expect(btnSave).toBeVisible();
  27 |     await this.waitForPageReady();
  28 |     await this.scrollToBottom();
  29 |   }
  30 |   async uploadProfileImage(filePath: string): Promise<void> {
  31 |     await this.scrollToBottom();
  32 | 
  33 |     // 
  34 |     const fileChooserPromise = this.page.waitForEvent('filechooser');
  35 | 
  36 |     await this.page.getByText('Choose Photo').click();
  37 | 
  38 |     const fileChooser = await fileChooserPromise;
  39 |     await fileChooser.setFiles(filePath);
  40 |     console.log(`Uploaded file: ${filePath}`);
  41 |     console.log(`File Uploaded! `);
  42 |     await this.saveProfileImageAndValidateResponse();
  43 |     console.log(`Saved Changes!  `);
  44 |   }
  45 | 
  46 |   async saveProfileImageAndValidateResponse(): Promise<void> {
> 47 |     const updateResponsePromise = this.page.waitForResponse(response => {
     |                                             ^ Error: page.waitForResponse: Test timeout of 60000ms exceeded.
  48 |       const responseUrl = new URL(response.url());
  49 |       return response.request().method() === 'POST'
  50 |         && responseUrl.origin === profileImageUrl.origin
  51 |         && responseUrl.pathname === profileImageUrl.pathname;
  52 |     });
  53 | 
  54 |     await this.click(this.page.locator('button:has-text("Save Changes")'));
  55 |     const updateResponse = await updateResponsePromise;
  56 |     await this.validateProfilePictureUpdateResponse(updateResponse);
  57 |   }
  58 | 
  59 |   async validateProfilePictureUpdateResponse(response: Response): Promise<void> {
  60 |     const body = await response.json() as ProfileUpdateResponse;
  61 |     expect(response.ok()).toBeTruthy();
  62 |     expect(body.success).toBeTruthy();
  63 |     expect(body.message).toBe('Profile image uploaded successfully');
  64 |     console.log(`Profile update response message: ${body.message}`);
  65 |   }
  66 | 
  67 |  
  68 | }
  69 | 
```