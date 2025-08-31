import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Test Case 25: Verify Scroll Up using "Arrow" button', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('Scroll down, click arrow, and verify scroll up to top text', async ({ page }: { page: Page }) => {
        await expect(homePage.isSliderVisible()).resolves.toBeTruthy();

        await homePage.scrollToBottom();
        await page.waitForTimeout(500);

        await expect(homePage.isSubscriptionTextVisible()).resolves.toBeTruthy();

        await homePage.clickScrollUpArrow();
        await page.waitForTimeout(1000); // Wait for scroll animation

        await expect(homePage.isFullFledgedTextVisible()).resolves.toBeTruthy();
    });
});
