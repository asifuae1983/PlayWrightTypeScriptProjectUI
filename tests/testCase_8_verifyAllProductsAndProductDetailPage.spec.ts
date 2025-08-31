import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { Utils } from '../utils/utils';
import type { ProductsFile } from 'types/testData';

const productsTestData = Utils.loadTestData('products.json') as ProductsFile;
const viewProductData = productsTestData.viewProduct;

test.describe('Test Case 8: Verify All Products and product detail page', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        await homePage.goto();
    });

    test('should display all products and verify product detail page', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.isSliderVisible()).resolves.toBe(true);

        await homePage.clickProductsLink();
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await expect(productsPage.isAllProductsVisible()).resolves.toBe(true);

        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);

        if (!viewProductData || typeof viewProductData.productIndex !== 'number') {
            throw new Error("View product test data (productIndex) is not defined or invalid in products.json.");
        }
        const productIndexToView = viewProductData.productIndex;
        expect(productIndexToView).toBeLessThan(productCount);
        await productsPage.clickViewProduct(productIndexToView);

        await expect(page.url()).toContain('/product_details/');

        // Using the renamed selectors for clarity on detail page
        await expect(productsPage.productNameOnDetail).toBeVisible();
        expect(await productsPage.getProductNameOnDetail()).not.toBeNull();

        await expect(productsPage.productCategoryOnDetail).toBeVisible();
        const categoryText = await productsPage.getProductCategoryOnDetail();
        expect(categoryText).toContain('Category:');

        await expect(productsPage.productPriceOnDetail).toBeVisible();
        expect(await productsPage.getProductPriceOnDetail()).not.toBeNull();

        await expect(productsPage.productAvailability).toBeVisible();
        await expect(productsPage.productCondition).toBeVisible();
        await expect(productsPage.productBrand).toBeVisible();
    });
});
