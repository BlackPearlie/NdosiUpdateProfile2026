import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openNdosiPage(): Promise<void> {
    await this.navigate('/');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.click(this.page.getByRole('button', { name: 'Login' }));
    await expect(this.page.locator('#login-email')).toBeVisible();
  }

  async userLogin(username: string, password: string): Promise<void> {
    await this.fill(this.page.locator('#login-email'), username);
    await this.fill(this.page.locator('#login-password'), password);
    await this.click(this.page.locator('xpath=//button[contains(.,"Login")]'));
  }

  async adminLogin(username: string, password: string): Promise<void> {
    await this.navigate('/');
    await this.navigateToLoginPage();
    await this.userLogin(username, password);
  }
}
