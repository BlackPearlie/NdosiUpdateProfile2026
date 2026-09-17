import { Page, Response, expect } from '@playwright/test';
import { BasePage } from './base.page';

type ProfileUpdateResponse = {
  success: boolean;
  message: string;
};

const profileImageEndpoint = 'https://www.ndosiautomation.co.za/APIDEV/profile/image';
const profileImageUrl = new URL(profileImageEndpoint);

export class ProfilePage extends BasePage {

  async verifyProfilePageIsDisplayed() {

    const profileHeading = this.page.getByRole('heading', { name: /My Profile/i });
    await this.waitForPageReady();
    await expect(profileHeading).toBeVisible();
  }
  
  async openEditProfile(): Promise<void> {
    await this.waitForPageReady();
    await this.scrollToBottom();
    await this.click(this.page.getByText('Edit Profile'));
    const btnSave = this.page.getByRole('button', { name: 'Save Changes' });
    await expect(btnSave).toBeVisible();
    await this.waitForPageReady();
    await this.scrollToBottom();
  }
  async uploadProfileImage(filePath: string): Promise<void> {
    await this.scrollToBottom();

    // 
    const fileChooserPromise = this.page.waitForEvent('filechooser');

    await this.page.getByText('Choose Photo').click();

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    console.log(`Uploaded file: ${filePath}`);
    console.log(`File Uploaded! `);
    await this.saveProfileImageAndValidateResponse();
    console.log(`Saved Changes!  `);
  }

  async saveProfileImageAndValidateResponse(): Promise<void> {
    const updateResponsePromise = this.page.waitForResponse(response => {
      const responseUrl = new URL(response.url());
      return response.request().method() === 'POST'
        && responseUrl.origin === profileImageUrl.origin
        && responseUrl.pathname === profileImageUrl.pathname;
    });

    await this.click(this.page.locator('button:has-text("Save Changes")'));
    const updateResponse = await updateResponsePromise;
    await this.validateProfilePictureUpdateResponse(updateResponse);
  }

  async validateProfilePictureUpdateResponse(response: Response): Promise<void> {
    const body = await response.json() as ProfileUpdateResponse;
    expect(response.ok()).toBeTruthy();
    expect(body.success).toBeTruthy();
    expect(body.message).toBe('Profile image uploaded successfully');
    console.log(`Profile update response message: ${body.message}`);
  }

 
}
