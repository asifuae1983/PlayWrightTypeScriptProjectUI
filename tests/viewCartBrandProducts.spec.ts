import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Test Case 19: View Brand Products', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        await homePage.goto();
    });

    test('should view products by brand', async ({ page }: { page: Page }) => {
        await homePage.clickProductsLink();
        await expect(page).toHaveURL(/.*products/);

        await expect(productsPage.areBrandsVisible()).resolves.toBeTruthy();

        const brand1Name = 'Polo';
        await productsPage.clickBrandLink(brand1Name);

        await expect(page).toHaveURL(new RegExp(`/brand_products/${brand1Name.replace(/\s/g, '%20')}`)); // Handle spaces in URL
        let brandPageTitle = await productsPage.getCategoryTitleText();
        expect(brandPageTitle?.trim()).toBe(`BRAND - ${brand1Name.toUpperCase()} PRODUCTS`);
        await expect(productsPage.productList.first()).toBeVisible(); // Check if product list has items

        const brand2Name = 'H&M'; // H&M also has a space in its URL representation if not handled by selector
        await productsPage.clickBrandLink(brand2Name);

        // URL might encode H&M differently, e.g. H%26M or H%20%26%20M
        // The clickBrandLink method uses the exact brandName for the href, so URL should match that.
        // Let's assume the href in the page object is correct for constructing the URL.
        // Example: .brands_products a[href='/brand_products/H&M']
        await expect(page).toHaveURL(new RegExp(`/brand_products/H&M`)); // The POM selector uses "H&M" directly
        brandPageTitle = await productsPage.getCategoryTitleText();
        expect(brandPageTitle?.trim()).toBe(`BRAND - ${brand2Name.toUpperCase()} PRODUCTS`);
        await expect(productsPage.productList.first()).toBeVisible();
    });
});
