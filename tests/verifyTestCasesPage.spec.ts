import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TestCasesPage } from '../pages/TestCasesPage';

test.describe('Test Case 7: Verify Test Cases Page', () => {
    let homePage: HomePage;
    let testCasesPage: TestCasesPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        testCasesPage = new TestCasesPage(page);
        await homePage.goto();
    });

    test('should navigate to the test cases page and verify its visibility', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.slider).toBeVisible();

        await homePage.clickTestCasesLink();

        await expect(page).toHaveURL('https://automationexercise.com/test_cases');
        // isTestCasesTextVisible was defined in TestCasesPage.ts
        await expect(testCasesPage.isTestCasesTextVisible()).resolves.toBe(true);

        // Optional: Verify the count of test cases listed
        // The current getTestCasesCount counts all <tr>, including header.
        // If the table has a header row and 26 data rows, count should be 27.
        expect(await testCasesPage.getTestCasesCount()).toBe(27);
    });
});
