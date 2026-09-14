import { expect, Locator, Page } from '@playwright/test';

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a URL
     */
    async navigate(url: string) {
        await this.page.goto(url);
    }

    /**
     * Click an element
     */
    async click(locator: Locator) {
        await expect(locator).toBeVisible();
        await expect(locator).toBeEnabled();
        await locator.click();
    }

    /**
     * Enter text
     */
    async fill(locator: Locator, value: string) {
        await expect(locator).toBeVisible();
        await locator.fill(value);
    }

    /**
     * Select an option from a dropdown by visible label
     */
    async selectOption(locator: Locator, value: string) {
        await expect(locator).toBeVisible();
        await locator.selectOption({ label: value });
    }

    /**
     * Get text from an element
     */
    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? '';
    }

    /**
     * Verify text
     */
    async verifyText(locator: Locator, expected: string) {
        await expect(locator).toHaveText(expected);
    }

    /**
     * Verify element is visible
     */
    async verifyVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    /**
     * Wait for page to finish loading
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForPageReady() {
        await this.page.waitForFunction(() => document.readyState === 'complete');
    }

    async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }
}