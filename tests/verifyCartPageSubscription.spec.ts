import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { Utils } from '../utils/utils';
import type { FormDataFile, SubscriptionData } from '../../types/testData';

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

        // Scroll to the subscription input field using its locator in CartPage
        await utils.scrollToElement(cartPage.cartSubscriptionEmailInput.toString()); // Pass selector string

        await expect(cartPage.cartSubscriptionText).toBeVisible();

        if (!subscriptionData || !subscriptionData.emailPrefix || !subscriptionData.expectedSuccessMessage) {
            throw new Error("Subscription test data (emailPrefix or expectedSuccessMessage) is not defined in formData.json.");
        }
        const emailToSubscribe = Utils.generateRandomEmail(subscriptionData.emailPrefix);
        await cartPage.enterCartSubscriptionEmail(emailToSubscribe);
        await cartPage.clickCartSubscriptionButton();

        await cartPage.cartSuccessAlert.waitFor({ state: 'visible', timeout: 10000 });
        const actualSuccessMessage = await cartPage.getCartSuccessSubscriptionMessage();
        expect(actualSuccessMessage?.trim()).toBe(subscriptionData.expectedSuccessMessage);
        await expect(cartPage.cartSuccessAlert).toBeVisible();
    });
});
