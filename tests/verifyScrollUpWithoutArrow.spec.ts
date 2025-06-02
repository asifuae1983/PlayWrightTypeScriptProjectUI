import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Test Case 26: Verify Scroll Up without "Arrow" button', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('Scroll down, then scroll up using page evaluate, and verify top text', async ({ page }: { page: Page }) => {
        await expect(homePage.isSliderVisible()).resolves.toBeTruthy();

        await homePage.scrollToBottom();
        await page.waitForTimeout(500);

        await expect(homePage.isSubscriptionTextVisible()).resolves.toBeTruthy();

        await homePage.scrollToTop();
        await page.waitForTimeout(1000); // Wait for scroll

        await expect(homePage.isFullFledgedTextVisible()).resolves.toBeTruthy();

        // Optional: Verify that the scroll up arrow button is not visible when at the very top.
        // const scrollArrow = homePage.scrollUpArrowButton; // It's a Locator
        // if (await scrollArrow.count() > 0) {
        //     await expect(scrollArrow).not.toBeVisible({ timeout: 1000 });
        // }
    });
});
