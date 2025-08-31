import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Utils } from '../utils/utils';
import type { ProductsFile, Product as ProductType } from 'types/testData';

const productsTestData = Utils.loadTestData('products.json') as ProductsFile;
const productsToManageInCart: ProductType[] = productsTestData.addProductsToCart.products;

// Ensure products have necessary fields, provide defaults or throw error if not
if (productsToManageInCart.length < 2 || !productsToManageInCart[0]?.name || !productsToManageInCart[0]?.idForCartInteractions || !productsToManageInCart[1]?.name) {
    throw new Error("Test data for productsToManageInCart is incomplete. Need at least two products with name and idForCartInteractions for the first product.");
}
const productToRemove: ProductType = productsToManageInCart[0];
const productToRemain: ProductType = productsToManageInCart[1];


test.describe('Test Case 17: Remove Products From Cart', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        await homePage.goto();

        await homePage.clickProductsLink();
        await expect(productsPage.isAllProductsVisible()).resolves.toBe(true);

        for (const product of productsToManageInCart) {
            if (!product.name) throw new Error("Product name is undefined in test data for beforeEach loop.");
            await productsPage.addProductToCartByName(product.name);
            await productsPage.clickContinueShopping();
        }
        await homePage.clickCartLink();
    });

    test('should add products, remove one, and verify cart content', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL(/.*view_cart/);
        await expect(cartPage.isShoppingCartVisible()).resolves.toBe(true);

        // productToRemove and productToRemain are guaranteed to have .name by the check at the top
        await expect(cartPage.productInCartName(productToRemove.name!)).toBeVisible();
        await expect(cartPage.productInCartName(productToRemain.name!)).toBeVisible();

        // productToRemove.idForCartInteractions is guaranteed by the check at the top
        await cartPage.clickRemoveProductFromCart(productToRemove.idForCartInteractions!);

        await expect(cartPage.productInCartName(productToRemove.name!)).not.toBeVisible({ timeout: 10000 });
        await expect(cartPage.productInCartName(productToRemain.name!)).toBeVisible();
    });
});
