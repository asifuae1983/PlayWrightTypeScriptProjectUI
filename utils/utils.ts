// utils/utils.ts
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { Page } from '@playwright/test'; // Import Page type

export class Utils {
    page: Page; // Class property type

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Loads test data from a JSON file.
     * @param {string} fileName - The name of the JSON file in the 'test-data' directory (e.g., 'users.json').
     * @returns {any} The parsed JSON data. // Keeping 'any' for now as per plan
     */
    static loadTestData(fileName: string): any {
        const filePath = path.join(__dirname, '..', 'test-data', fileName); // Assumes test-data is at project root
        if (!fs.existsSync(filePath)) {
            throw new Error(`Test data file not found: ${filePath}`);
        }
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    }

    static generateRandomEmail(prefix: string = 'testuser'): string {
        const randomString = crypto.randomBytes(4).toString('hex');
        return `${prefix}_${randomString}@example.com`;
    }

    static generateRandomName(prefix: string = 'User'): string {
        const randomString = crypto.randomBytes(4).toString('hex');
        return `${prefix}${randomString}`;
    }

    static generateRandomString(length: number = 10): string {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    // commonLogin is less common if tests handle their own data, but can be kept if useful
    async commonLogin(loginPage: any, email: string, password: string): Promise<void> {
        // Note: This method might become less relevant if login data is always sourced from JSON in tests.
        // Or, it could be adapted to take a user data object.
        // Using 'any' for loginPage for now. A better approach would be an interface or specific Page Object type.
        await loginPage.loginEmailInput.fill(email); // Assuming loginPage has these locators
        await loginPage.loginPasswordInput.fill(password);
        await loginPage.loginButton.click();
    }

    async takeScreenshot(filename: string): Promise<void> {
        const screenshotsDir = path.join(__dirname, '..', 'screenshots'); // Ensure screenshots dir is at project root
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }
        await this.page.screenshot({ path: path.join(screenshotsDir, `${filename}.png`) });
    }

    async scrollToElement(selector: string): Promise<void> {
        const element = await this.page.locator(selector);
        await element.scrollIntoViewIfNeeded();
    }

    async isTextVisible(text: string, options: { timeout?: number } = {}): Promise<boolean> {
        const { timeout = 5000 } = options;
        try {
            await this.page.waitForFunction(
                (textToFind) => {
                    const elements = Array.from(document.querySelectorAll('*'));
                    return elements.some(el => el.textContent && el.textContent.trim() === textToFind && el.offsetParent !== null);
                },
                text,
                { timeout }
            );
            return true;
        } catch (error) {
            // console.log(`Text "${text}" not visible within ${timeout}ms. Error: ${error.message}`);
            return false;
        }
    }

    async acceptCookiesIfPresent(cookieButtonSelector: string = '#cookie_stop'): Promise<void> {
        try {
            const cookieButton = this.page.locator(cookieButtonSelector);
            if (await cookieButton.isVisible({ timeout: 2000 })) { // Added await here
                await cookieButton.click();
                // console.log('Cookie consent accepted.');
            }
        } catch (error) {
            // console.log('Cookie consent banner not found or not visible, or already handled.');
        }
    }
}
