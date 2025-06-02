import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Utils } from '../utils/utils';
import type { FormDataFile, SubscriptionData } from 'types/testData';

const formData = Utils.loadTestData('formData.json') as FormDataFile;
const subscriptionData: SubscriptionData = formData.homepageSubscription;

test.describe('Test Case 10: Verify Subscription in home page', () => {
    let homePage: HomePage;
    let utils: Utils; // Utils instance for scrolling

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        utils = new Utils(page);
        await homePage.goto();
    });

    test('should subscribe with an email and verify success message', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.isSliderVisible()).resolves.toBe(true);

        if (!subscriptionData || !subscriptionData.emailPrefix || !subscriptionData.expectedSuccessMessage) {
            throw new Error("Subscription test data (emailPrefix or expectedSuccessMessage) is not defined in formData.json.");
        }
        const emailToSubscribe = Utils.generateRandomEmail(subscriptionData.emailPrefix);
        
        // Use the POM method that encapsulates scrolling, waiting, filling, and clicking
        await homePage.subscribeToNewsletter(emailToSubscribe);

        // The successAlert wait and getSuccessSubscriptionMessage are already part of the POM method or should be.
        // Let's assume getSuccessSubscriptionMessage handles its own wait if needed.
        // The waitFor for successAlert is still fine here if subscribeToNewsletter doesn't wait for it.
        await homePage.successAlert.waitFor({ state: 'visible', timeout: 10000 }); 
        const actualSuccessMessage = await homePage.getSuccessSubscriptionMessage();
        expect(actualSuccessMessage?.trim()).toBe(subscriptionData.expectedSuccessMessage);
        await expect(homePage.successAlert).toBeVisible();
    });
});
