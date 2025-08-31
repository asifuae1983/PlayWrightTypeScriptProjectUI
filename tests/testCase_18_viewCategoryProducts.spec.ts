import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage'; // This page is used for category titles

test.describe('Test Case 18: View Category Products', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage; // Renamed from categoryPage to match actual POM name used

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page); // Initialize ProductsPage
        await homePage.goto();
    });

    test('should view products by category and sub-category', async ({ page }: { page: Page }) => {
        await expect(homePage.areCategoriesVisible()).resolves.toBeTruthy();

        await homePage.clickWomenCategoryLink();
        await homePage.clickWomenDressCategoryLink();

        await expect(page).toHaveURL(/category_products\/1/);
        // Use ProductsPage instance to get the title, as category pages share structure with product listing pages
        const womenDressTitle = await productsPage.getCategoryTitleText();
        expect(womenDressTitle?.trim().toLowerCase()).toBe('women - dress products'.toLowerCase());
        await expect(productsPage.productList.first()).toBeVisible(); // Verify products are listed

        await homePage.clickMenCategoryLink();
        await homePage.clickMenTshirtsCategoryLink();

        await expect(page).toHaveURL(/category_products\/3/);
        const menTshirtsTitle = await productsPage.getCategoryTitleText();
        expect(menTshirtsTitle?.trim().toLowerCase()).toBe('men - tshirts products'.toLowerCase());
        await expect(productsPage.productList.first()).toBeVisible(); // Verify products are listed
    });
});
