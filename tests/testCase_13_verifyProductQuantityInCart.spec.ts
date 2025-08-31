import { test, expect, type Page, type Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Utils } from '../utils/utils';
import type { ProductsFile } from 'types/testData';

const productsTestData = Utils.loadTestData('products.json') as ProductsFile;
const testData = productsTestData.verifyProductQuantity;

test.describe('Test Case 13: Verify Product quantity in Cart', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        await homePage.goto();
    });

    test('should set product quantity, add to cart, and verify quantity in cart', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');

        await homePage.clickProductsLink();
        await expect(productsPage.isAllProductsVisible()).resolves.toBe(true);

        if (!testData || typeof testData.productToViewIndex !== 'number' ||
            !testData.expectedProductName || typeof testData.quantityToSet !== 'number') {
            throw new Error("Test data for verifying product quantity is incomplete or invalid.");
        }

        await productsPage.clickViewProduct(testData.productToViewIndex);

        const productNameOnDetail = await productsPage.getProductNameOnDetail(); // Using renamed method
        expect(productNameOnDetail?.trim().toLowerCase()).toBe(testData.expectedProductName.toLowerCase());

        await productsPage.setQuantity(testData.quantityToSet);
        await productsPage.clickAddToCartOnDetailPage();

        await productsPage.viewCartLinkInModal.click(); // productsPage has this locator

        await expect(page).toHaveURL(/.*view_cart/);
        await expect(cartPage.isShoppingCartVisible()).resolves.toBe(true);

        // In CartPage, productInCartName(productName) returns a Locator for the link.
        // We need to find the row for that product to get its quantity.
        const productLinkInCart = cartPage.productInCartName(testData.expectedProductName);
        await expect(productLinkInCart).toBeVisible();

        // Define productRowLocator using a single, more complete XPath based on the product link
        const productRowLocator: Locator = page.locator(`//td[@class='cart_description']//a[text()='${testData.expectedProductName}']/ancestor::tr[1]`);
        await expect(productRowLocator).toBeVisible(); // Ensure the row itself is found

        // Construct a full XPath for the quantity element to avoid chaining issues
        const cartQuantityElement: Locator = page.locator(`//td[@class='cart_description']//a[text()='${testData.expectedProductName}']/ancestor::tr[1]//td[@class='cart_quantity']/button[@class='disabled']`);
        const actualQuantityInCartText = await cartQuantityElement.textContent();

        expect(actualQuantityInCartText).not.toBeNull(); // Add a null check before parseInt
        expect(parseInt(actualQuantityInCartText!)).toBe(testData.quantityToSet); // Use non-null assertion
    });
});
