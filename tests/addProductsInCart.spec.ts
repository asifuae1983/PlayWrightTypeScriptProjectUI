import { test, expect, type Page, type Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Utils } from '../utils/utils';
import type { ProductsFile, Product as ProductType } from 'types/testData'; // Adjusted path

interface ExpectedProductInCart extends ProductType {
  quantity: number;
  displayPrice?: string;
}

const productsTestData = Utils.loadTestData('products.json') as ProductsFile;
const productsToAdd: ProductType[] = productsTestData.addProductsToCart.products;

test.describe('Test Case 12: Add Products in Cart', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        await homePage.goto();
    });

    test('should add specified products to cart and verify them', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');

        await homePage.clickProductsLink();
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await expect(productsPage.allProductsText).toBeVisible();

        const expectedProductsInCart: ExpectedProductInCart[] = [];

        // Add first product
        const firstProduct = productsToAdd[0];
        if (!firstProduct || !firstProduct.name || !firstProduct.price) {
            throw new Error("First product data is invalid.");
        }
        const firstProductPriceFromListing = await productsPage.getProductPriceFromListing(firstProduct.name);
        await productsPage.addProductToCartByName(firstProduct.name);
        expectedProductsInCart.push({ ...firstProduct, quantity: 1, displayPrice: firstProductPriceFromListing });

        await productsPage.clickContinueShopping();

        // Add second product
        const secondProduct = productsToAdd[1];
        if (!secondProduct || !secondProduct.name || !secondProduct.price) {
            throw new Error("Second product data is invalid.");
        }
        const secondProductPriceFromListing = await productsPage.getProductPriceFromListing(secondProduct.name);
        await productsPage.addProductToCartByName(secondProduct.name);
        expectedProductsInCart.push({ ...secondProduct, quantity: 1, displayPrice: secondProductPriceFromListing });

        await productsPage.clickContinueShopping();
        await homePage.clickCartLink();

        // Verify both products are added to Cart
        await expect(page).toHaveURL(/.*view_cart/);
        await expect(cartPage.shoppingCartText).toBeVisible();

        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBeGreaterThanOrEqual(expectedProductsInCart.length);

        // Log the product names in the cart for debugging
        const cartProductNames = await page.locator("tr[id^='product-'] a").allTextContents();
        console.log("Product names in cart:", cartProductNames.map(n => n.trim()));

        // Verify their prices, quantity and total price
        for (const expectedProduct of expectedProductsInCart) {
            if (!expectedProduct.name || !expectedProduct.price) continue;

            // Check product is visible in cart
            await expect(cartPage.productInCartName(expectedProduct.name)).toBeVisible();

            // Robust row locator using normalize-space
            const productRowLocator: Locator = page.locator(
              `//tr[contains(@id, 'product-') and .//a[normalize-space(text())='${expectedProduct.name}']]`
            );
            const rowCount = await productRowLocator.count();
            if (rowCount === 0) {
                // Extra debug info if not found
                const allRows = await page.locator("tr[id^='product-']").allTextContents();
                console.error(`Row for product "${expectedProduct.name}" not found. All rows:`, allRows);
            }
            expect(rowCount).toBeGreaterThan(0);

            // Price check
            const cartPriceText = await productRowLocator.locator('.cart_price p').textContent();
            expect(cartPriceText?.trim()).toBe(expectedProduct.price);

            // Quantity check
            let cartQuantityText: string | null;
            const quantityLocator = productRowLocator.locator('.cart_quantity .disabled');
            if (await quantityLocator.evaluate(el => el.tagName.toLowerCase() === 'input')) {
                cartQuantityText = await quantityLocator.inputValue();
            } else {
                cartQuantityText = await quantityLocator.textContent();
            }
            expect(parseInt(cartQuantityText!.trim())).toBe(expectedProduct.quantity);

            // Total price check
            const cartTotalText = await productRowLocator.locator('.cart_total p.cart_total_price').textContent();
            const priceNumber = parseInt(expectedProduct.price.replace(/[^\d]/g, ''), 10);
            const expectedTotalPriceString = `Rs. ${priceNumber * expectedProduct.quantity}`;
            expect(cartTotalText?.trim()).toBe(expectedTotalPriceString);
        }
    });
});
