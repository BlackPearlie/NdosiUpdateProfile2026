import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openEditProfile(): Promise<void> {
    await this.click(this.page.getByText('Edit Profile'));
  }

  async uploadProfileImage(filePath: string): Promise<void> {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: 'visible' });
    await fileInput.setInputFiles(filePath);
    await this.click(this.page.locator('button:has-text("Save")'));
    await this.page.waitForTimeout(2000);
  }

  async expectProfileImageChanged(previousSrc: string): Promise<void> {
    const afterSrc = await this.page.locator('.profile-picture img').getAttribute('src');
    expect(afterSrc).toBeTruthy();
    expect(afterSrc).not.toBe(previousSrc);
  }

  async getCurrentProfileImageSrc(): Promise<string> {
    try {
      return (await this.page.locator('.profile-picture img').getAttribute('src')) || '';
    } catch {
      return '';
    }
  }
}
