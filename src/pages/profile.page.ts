import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

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
    await this.click(this.page.locator('button:has-text("Save Changes")'));
    console.log(`Saved Changes!  `);
    //  await this.page.waitForTimeout(2000);
  }

  async getCurrentProfileImageSrc(): Promise<string> {
    try {
      return (await this.page.locator('.profile-picture img').getAttribute('src')) || '';
    } catch {
      return '';
    }
  }
}
