import { test, expect, type Page, type Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Utils } from '../utils/utils';
import type { ProductsFile, Product as ProductType } from '../../types/testData'; // Adjusted path

// Define a more specific type for products once they are in the cart for verification
interface ExpectedProductInCart extends ProductType {
  quantity: number;
  displayPrice?: string; // Price as displayed on product listing, optional
}

// Load product data and cast to defined types
const productsTestData = Utils.loadTestData('products.json') as ProductsFile;
const productsToAdd: ProductType[] = productsTestData.addProductsToCart.products;

test.describe('Test Case 12: Add Products in Cart', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    // Utils instance is not strictly needed if only static methods are used from it
    // let utils: Utils;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        // utils = new Utils(page); // Only if instance methods of Utils are needed
        await homePage.goto();
    });

    test('should add specified products to cart and verify them', async ({ page }: { page: Page }) => {
        // 1. Launch browser and navigate to URL (handled by beforeEach)
        // 2. Verify that home page is visible successfully
        await expect(page).toHaveURL('https://automationexercise.com/');

        // 3. Click 'Products' button
        await homePage.clickProductsLink();
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await expect(productsPage.allProductsText).toBeVisible();

        const expectedProductsInCart: ExpectedProductInCart[] = [];

        // 4. Add first product to cart
        const firstProduct = productsToAdd[0];
        if (!firstProduct || !firstProduct.name || !firstProduct.price) {
            throw new Error("First product data is invalid.");
        }
        const firstProductPriceFromListing = await productsPage.getProductPriceFromListing(firstProduct.name);
        await productsPage.addProductToCartByName(firstProduct.name);
        expectedProductsInCart.push({ ...firstProduct, quantity: 1, displayPrice: firstProductPriceFromListing });

        // 5. Click 'Continue Shopping' button
        await productsPage.clickContinueShopping();

        // 6. Add second product to cart
        const secondProduct = productsToAdd[1];
        if (!secondProduct || !secondProduct.name || !secondProduct.price) {
            throw new Error("Second product data is invalid.");
        }
        const secondProductPriceFromListing = await productsPage.getProductPriceFromListing(secondProduct.name);
        await productsPage.addProductToCartByName(secondProduct.name);
        expectedProductsInCart.push({ ...secondProduct, quantity: 1, displayPrice: secondProductPriceFromListing });

        await productsPage.clickContinueShopping(); // Assuming this is the flow, or click view cart from modal
        await homePage.clickCartLink();

        // 8. Verify both products are added to Cart
        await expect(page).toHaveURL(/.*view_cart/);
        await expect(cartPage.shoppingCartText).toBeVisible();

        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBeGreaterThanOrEqual(expectedProductsInCart.length);

        // 9. Verify their prices, quantity and total price
        for (const expectedProduct of expectedProductsInCart) {
            if (!expectedProduct.name || !expectedProduct.price) continue; // Skip if essential data is missing

            await expect(cartPage.productInCartName(expectedProduct.name)).toBeVisible();

            const productRowLocator: Locator = page.locator(`//tr[.//a[text()='${expectedProduct.name}'] and contains(@id, 'product-')]`);

            const cartPriceText = await productRowLocator.locator('.cart_price p').textContent();
            expect(cartPriceText?.trim()).toBe(expectedProduct.price);

            const cartQuantityText = await productRowLocator.locator('.cart_quantity .disabled').inputValue(); // Read value for input
            expect(parseInt(cartQuantityText.trim())).toBe(expectedProduct.quantity);

            const cartTotalText = await productRowLocator.locator('.cart_total p.cart_total_price').textContent();
            const priceNumber = parseInt(expectedProduct.price.replace('Rs. ', ''), 10);
            const expectedTotalPriceString = `Rs. ${priceNumber * expectedProduct.quantity}`;
            expect(cartTotalText?.trim()).toBe(expectedTotalPriceString);
        }
    });
});
