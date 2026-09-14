import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
 

   get verifyHomePageHeading(): Locator {
        return this.page.getByRole('heading', { name: /Welcome\s*back/i }); //Restore working regex
    }

    async verifyHomePageIsDisplayed() {
        await this.verifyVisible(this.verifyHomePageHeading);    
    }

    async navigateToMyProfile() {
        await this.click(this.page.locator('xpath=//button//span[text() = "Menu"]'));

        await this.click(this.page.locator('xpath=//span[contains(.,"My Profile")]').first());   

    }
 
}
