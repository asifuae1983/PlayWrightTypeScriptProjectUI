import { type Page, type Locator } from '@playwright/test';

export class TestCasesPage {
    readonly page: Page;
    readonly testCasesText: Locator; // Main "Test Cases" header text
    readonly testCaseEntries: Locator; // Locator for the individual test case entries

    constructor(page: Page) {
        this.page = page;
        this.testCasesText = page.locator('h2 b:has-text("Test Cases")');
        // Updated locator to target the <h4> elements representing each test case
        this.testCaseEntries = page.locator("//h4[starts-with(normalize-space(.), 'Test Case')]");
    }

    async isTestCasesTextVisible(): Promise<boolean> { // Renamed from isTestCasesPageVisible for clarity
        await this.testCasesText.waitFor({ state: 'visible', timeout: 5000 });
        return await this.testCasesText.isVisible();
    }

    async getTestCasesCount(): Promise<number> {
        // Wait for the first test case entry to be visible to ensure the list has loaded
        // before attempting to count all of them.
        try {
            await this.testCaseEntries.first().waitFor({ state: 'visible', timeout: 7000 });
        } catch (error) {
            // If no test case entries are found (e.g., page structure changed drastically), return 0
            console.warn("No test case entries found or visible within the timeout.");
            return 0;
        }
        return await this.testCaseEntries.count();
    }
}
