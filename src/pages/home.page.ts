import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openMyProfile(): Promise<void> {
    await this.click(this.page.locator('#menu'));
    await this.click(this.page.getByText('My Profile'));
  }
}
