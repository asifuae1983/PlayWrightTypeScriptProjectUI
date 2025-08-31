import { test, expect, type Page, type Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type SignupUserDetails } from '../pages/SignupPage';
import { faker } from '@faker-js/faker';

interface TestUser extends SignupUserDetails {
    signupName: string;
}

let userData: TestUser;

test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let loginPage: LoginPage;

    test.beforeAll(async ({ browser }: { browser: Browser }) => {
        const page = await browser.newPage();
        const tempHomePage = new HomePage(page);
        const tempSignupPage = new SignupPage(page);
        const tempLoginPage = new LoginPage(page);

        const generatedFirstName = faker.person.firstName();
        const generatedLastName = faker.person.lastName();

        userData = {
            signupName: generatedFirstName,
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12, prefix: 'P@ss!' }),
            title: faker.helpers.arrayElement(['Mr', 'Mrs'] as const),
            dayOfBirth: faker.number.int({ min: 1, max: 28 }).toString(),
            monthOfBirth: faker.date.month(),
            yearOfBirth: faker.number.int({ min: 1970, max: 2005 }).toString(),
            firstName: generatedFirstName,
            lastName: generatedLastName,
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: 'United States',
            state: faker.location.state(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
            mobileNumber: faker.phone.number(),
            newsletter: true,
            optin: true
        };

        await tempHomePage.goto();
        await tempHomePage.clickSignupLoginLink();
        await tempLoginPage.signup(userData.signupName, userData.email);

        await tempSignupPage.fillAccountDetails(userData);
        await tempSignupPage.clickCreateAccountButton();
        await expect(tempSignupPage.accountCreatedText).toBeVisible();
        await tempSignupPage.clickContinueButton();

        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
        }

        // Logout the user
        if (await tempHomePage.isLoggedInAsVisible(userData.signupName)) {
            await tempHomePage.clickLogoutLink();
        }
        await page.close();
    });

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        loginPage = new LoginPage(page);
        await homePage.goto();
    });

    test('should search, add to cart, login, and verify cart', async ({ page }: { page: Page }) => {
        await homePage.clickProductsLink();
        await expect(productsPage.isAllProductsVisible()).resolves.toBeTruthy();
        await expect(page).toHaveURL(/.*products/);

        const searchProductName = 'Blue Top';
        await productsPage.searchProduct(searchProductName);
        await expect(productsPage.isSearchedProductsVisible()).resolves.toBeTruthy();

        const displayedProductNames = await productsPage.getDisplayedProductNames();
        expect(displayedProductNames.length).toBeGreaterThan(0);
        displayedProductNames.forEach(name => {
            expect(name.toLowerCase()).toContain(searchProductName.toLowerCase());
        });

        const addedProducts = await productsPage.addAllDisplayedProductsToCart();
        expect(addedProducts).toBeDefined();
        expect(addedProducts!.length).toBe(displayedProductNames.length);

        await homePage.clickCartLink();
        await expect(page).toHaveURL(/.*view_cart/);
        let cartProductNames = await cartPage.getCartProductNames();
        expect(cartProductNames.map(n => n.trim().toLowerCase()).sort())
            .toEqual(addedProducts!.map(n => n.trim().toLowerCase()).sort());

        await homePage.clickSignupLoginLink();
        await loginPage.login(userData.email, userData.password);

        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
        }

        // Debug: log what is actually displayed for the logged-in user
        const loggedInUser = await homePage.getLoggedInUserName?.();
        console.log('Logged in user (UI):', loggedInUser, 'Expected:', userData.signupName, userData.firstName, userData.lastName);

        // Accept either first name or full name as valid
        const expectedFullName = `${userData.firstName} ${userData.lastName}`;
        expect(
            loggedInUser?.toLowerCase().includes(userData.signupName.toLowerCase()) ||
            loggedInUser?.toLowerCase().includes(userData.firstName.toLowerCase()) ||
            loggedInUser?.toLowerCase().includes(expectedFullName.toLowerCase())
        ).toBeTruthy();

        await homePage.clickCartLink();
        await expect(page).toHaveURL(/.*view_cart/);
        cartProductNames = await cartPage.getCartProductNames();
        expect(cartProductNames.map(n => n.trim().toLowerCase()).sort())
            .toEqual(addedProducts!.map(n => n.trim().toLowerCase()).sort());
        expect(cartProductNames.length).toBeGreaterThan(0);
    });
});
