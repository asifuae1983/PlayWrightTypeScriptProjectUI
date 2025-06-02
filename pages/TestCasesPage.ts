import { type Page, type Locator } from '@playwright/test';

export class TestCasesPage {
    readonly page: Page;
    readonly testCasesText: Locator;
    readonly testCaseRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.testCasesText = page.locator('h2 b:has-text("Test Cases")');
        this.testCaseRows = page.locator('.table.table-striped tr'); // Assuming this is the table of test cases
    }

    async isTestCasesTextVisible(): Promise<boolean> { // Renamed from isTestCasesPageVisible for clarity
        await this.testCasesText.waitFor({ state: 'visible', timeout: 5000 });
        return await this.testCasesText.isVisible();
    }

    async getTestCasesCount(): Promise<number> {
        // This counts all <tr> elements. If the table has a <thead>, this might be accurate for data rows
        // or might need adjustment if header rows are also <tr> within the same parent.
        // For now, assume it counts data rows or is used with knowledge of table structure.
        return await this.testCaseRows.count();
    }
}
