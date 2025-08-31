import { test, expect, type Page, type Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { Utils } from '../utils/utils';
import type { ProductsFile } from 'types/testData';

const productsTestData = Utils.loadTestData('products.json') as ProductsFile;
const searchData = productsTestData.searchProduct;

test.describe('Test Case 9: Search Product', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        await homePage.goto();
    });

    test('should search for a product and verify search results', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.isSliderVisible()).resolves.toBe(true);

        await homePage.clickProductsLink();
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await expect(productsPage.isAllProductsVisible()).resolves.toBe(true);

        if (!searchData || !searchData.searchTerm || !searchData.expectedProductName) {
            throw new Error("Search test data (searchTerm or expectedProductName) is not defined in products.json.");
        }
        await productsPage.searchProduct(searchData.searchTerm);

        await expect(productsPage.isSearchedProductsVisible()).resolves.toBe(true);

        // Using the getDisplayedProductNames method from ProductsPage
        const displayedProductNames = await productsPage.getDisplayedProductNames();
        expect(displayedProductNames.length).toBeGreaterThan(0);

        let foundExpectedProduct = false;
        for (const name of displayedProductNames) {
            if (name.trim().toLowerCase() === searchData.expectedProductName.toLowerCase()) {
                foundExpectedProduct = true;
            }
            // Verify all displayed products are related to the search term
            expect(name.toLowerCase().includes(searchData.searchTerm.toLowerCase())).toBe(true);
        }

        if (!foundExpectedProduct) {
            throw new Error(`Expected product "${searchData.expectedProductName}" not found in search results for "${searchData.searchTerm}". Found: ${displayedProductNames.join(', ')}`);
        }
        expect(foundExpectedProduct).toBe(true); // Basic assertion after custom error check
    });
});
