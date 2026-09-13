import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProfilePage } from '../pages/profile.page';

type CustomFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  profilePage: ProfilePage;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }: { page: Page }, use: (value: LoginPage) => Promise<void>) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }: { page: Page }, use: (value: HomePage) => Promise<void>) => {
    await use(new HomePage(page));
  },

  profilePage: async ({ page }: { page: Page }, use: (value: ProfilePage) => Promise<void>) => {
    await use(new ProfilePage(page));
  }
});

export { expect };
