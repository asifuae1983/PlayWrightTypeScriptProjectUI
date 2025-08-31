import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage, type ExpectedProductInCart } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Utils } from '../utils/utils';
import type { ProductsFile, Product as ProductType } from 'types/testData';

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
        await test.step('Navigate to products page', async () => {
            await expect(page).toHaveURL('https://automationexercise.com/');
            await productsPage.navigateToProductsPage(page);
        });

        await test.step('Add multiple products to cart', async () => {
            const addedProducts = await productsPage.addMultipleProductsToCart(productsToAdd);
            expect(addedProducts.length).toBe(productsToAdd.length);
            console.log(`✅ Successfully added ${addedProducts.length} products to cart`);
        });

        await test.step('Navigate to cart and verify products', async () => {
            await cartPage.navigateToCart(page);
            
            const expectedProducts = productsToAdd
                .filter(product => product?.name && product?.price)
                .map(product => ({ ...product, quantity: 1 })) as ExpectedProductInCart[];
                
            await cartPage.verifyProductsInCart(page, expectedProducts);
            console.log(`✅ Verified all ${expectedProducts.length} products in cart`);
        });
    });
});
