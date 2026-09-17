# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-profile.spec.ts >> Upload profile picture and validate endpoint responses
- Location: src\tests\upload-profile.spec.ts:4:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /My Profile/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: /My Profile/i }) with timeout 5000ms
  - waiting for getByRole('heading', { name: /My Profile/i })

```

```yaml
- navigation:
  - img "NTA Logo"
  - button "🏠 Home"
  - button "📖 About Us"
  - button "⭐ Testimonials"
  - button "👨‍🏫 Mentors"
  - button "🎓 Graduates"
  - button "📞 Contact Us"
  - button "📚 Learn ▼"
  - button "🔗 Connect ▼"
  - button "🎯 My Learning ▼"
  - button "Menu ▼"
- main: Loading profile...
- button "🧪 Test"
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
> 18 |     await expect(profileHeading).toBeVisible();
     |                                  ^ Error: expect(locator).toBeVisible() failed
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
  47 |     const updateResponsePromise = this.page.waitForResponse(response => {
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