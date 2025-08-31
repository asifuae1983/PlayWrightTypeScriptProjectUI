import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { faker } from '@faker-js/faker';
import type { FormDataFile, ReviewData } from 'types/testData'; // For potential future use with JSON data
import { Utils } from '../utils/utils'; // For potential future use with JSON data


test.describe('Test Case 21: Add Review on Product', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    // let reviewData: ReviewData; // Example if loading from JSON

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        await homePage.goto();

        // Example: Load review data from JSON if it were structured that way
        // const formData = Utils.loadTestData('formData.json') as FormDataFile;
        // reviewData = formData.review;
    });

    test('should add a review to a product and verify success', async ({ page }: { page: Page }) => {
        // 2. Click on 'Products' button
        await homePage.clickProductsLink();
        await expect(page).toHaveURL(/.*products/);

        // 3. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(productsPage.isAllProductsVisible()).resolves.toBeTruthy();

        // 4. Click on 'View Product' button for a specific product (e.g., the first one)
        await productsPage.clickViewProduct(0);
        await productsPage.reviewFormName.waitFor({ state: 'visible', timeout: 10000 });

        // 5. Verify 'Write Your Review' section (form) is visible
        await expect(productsPage.isWriteYourReviewVisible()).resolves.toBeTruthy();

        // 6. Enter name, email, and review message
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const reviewMessage = faker.lorem.sentence();
        // Or use from reviewData if loaded from JSON:
        // const name = faker.person.firstName() + (reviewData.namePrefix || '');
        // const email = (reviewData.emailPrefix || 'prefix') + Date.now() + '@example.com';
        // const reviewMessage = reviewData.reviewMessage;

        // 7. Click 'Submit' button (This is done by fillReview method)
        await productsPage.fillReview(name, email, reviewMessage);

        // 8. Verify success message 'Thank you for your review.' is visible
        // The getReviewSuccessMessage method in ProductsPage now includes the waitFor logic.
        const successMessageText = await productsPage.getReviewSuccessMessage(5000); // Pass timeout if needed, else default (7000ms) will be used
        expect(successMessageText?.trim()).toBe('Thank you for your review.');
    });
});
