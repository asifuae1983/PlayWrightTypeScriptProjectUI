import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { Utils } from '../utils/utils';
import type { FormDataFile, SubscriptionData } from 'types/testData';

const formData = Utils.loadTestData('formData.json') as FormDataFile;
const subscriptionData: SubscriptionData = formData.cartPageSubscription;

test.describe('Test Case 11: Verify Subscription in Cart page', () => {
    let homePage: HomePage;
    let cartPage: CartPage;
    let utils: Utils; // Utils instance for scrolling

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        utils = new Utils(page);
        await homePage.goto();
        await homePage.clickCartLink();
    });

    test('should subscribe with an email on the cart page and verify success message', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL(/.*view_cart/);

        if (!subscriptionData || !subscriptionData.emailPrefix || !subscriptionData.expectedSuccessMessage) {
            throw new Error("Subscription test data (emailPrefix or expectedSuccessMessage) is not defined in formData.json.");
        }
        const emailToSubscribe = Utils.generateRandomEmail(subscriptionData.emailPrefix);

        // Use the POM method that encapsulates scrolling, waiting, filling, and clicking
        await cartPage.subscribeWithEmail(emailToSubscribe);

        // Debug: log page content and alert visibility
        console.log('Page content:', await cartPage.page.content());
        const isVisible = await cartPage.cartSuccessAlert.isVisible();
        console.log('Is cart success alert visible?', isVisible);

        if (isVisible) {
            const actualText = await cartPage.cartSuccessAlert.textContent();
            console.log('Actual cart success alert text:', actualText);
        }

        await expect(cartPage.cartSuccessAlert).toBeVisible({ timeout: 10000 });
        await expect(cartPage.cartSuccessAlert).toContainText(subscriptionData.expectedSuccessMessage, { timeout: 10000 });
    });
});
