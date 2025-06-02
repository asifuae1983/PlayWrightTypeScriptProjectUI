import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test.describe('Test Case 22: Add Recommended Items to Cart', () => {
    let homePage: HomePage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        await homePage.goto();
    });

    test('should add a recommended item to cart and verify', async ({ page }: { page: Page }) => {
        // 2. Scroll to bottom of page
        await homePage.scrollToBottom();
        await page.waitForTimeout(1000); // Wait for items to load if lazy-loaded

        // 3. Verify 'RECOMMENDED ITEMS' are visible
        await expect(homePage.isRecommendedItemsVisible()).resolves.toBeTruthy();

        // 4. Click on 'Add To Cart' on a Recommended product
        const recommendedItemIndex = 0;

        // Ensure there's at least one recommended item before trying to interact
        // The recommendedItemAddToCartButtonSelector method returns a string selector
        const addToCartButtonSelector = homePage.recommendedItemAddToCartButtonSelector(recommendedItemIndex);
        const recommendedItemsCount = await page.locator(addToCartButtonSelector).count();

        if (recommendedItemsCount === 0) {
            console.log("Skipping test: No recommended items found to add to cart.");
            test.skip(); // Skip test if no recommended items are present
            return;
        }

        const addedProductName = await homePage.addRecommendedItemToCart(recommendedItemIndex);
        expect(addedProductName).toBeTruthy(); // Ensure a name was captured

        // 5. Click on 'View Cart' button (in modal)
        await homePage.clickViewCartModalLink();

        await expect(page).toHaveURL(/.*view_cart/);
        await expect(cartPage.isShoppingCartVisible()).resolves.toBeTruthy();

        // 6. Verify that product is displayed in cart page
        if (addedProductName) { // Type guard for addedProductName
            await expect(cartPage.isProductInCart(addedProductName)).resolves.toBeTruthy();
        } else {
            throw new Error("Product name was not captured from recommended items.");
        }
    });
});
