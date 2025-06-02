import { test, expect, type Page, type Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type SignupUserDetails } from '../pages/SignupPage';
import { faker } from '@faker-js/faker';

// Define a specific type for the userData used in this test
interface TestUser extends SignupUserDetails {
    signupName: string; // Name used for initial signup form, might be different from address firstName
}

let userData: TestUser; // Will be initialized in beforeAll

test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let loginPage: LoginPage;
    // signupPage instance is created in beforeAll for setup

    test.beforeAll(async ({ browser }: { browser: Browser }) => {
        const page = await browser.newPage();
        const tempHomePage = new HomePage(page);
        const tempSignupPage = new SignupPage(page); // Renamed from signupPage to avoid conflict
        const tempLoginPage = new LoginPage(page); // For initial signup step

        const generatedFirstName = faker.person.firstName();
        userData = {
            signupName: generatedFirstName, // Use a distinct name for the signup form's "Name" field
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12, prefix: 'P@ss!' }),
            title: faker.helpers.arrayElement(['Mr', 'Mrs'] as const),
            dayOfBirth: faker.number.int({ min: 1, max: 28 }).toString(),
            monthOfBirth: faker.date.month(),
            yearOfBirth: faker.number.int({ min: 1970, max: 2005 }).toString(),
            firstName: generatedFirstName, // For address details
            lastName: faker.person.lastName(),
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
        await tempLoginPage.signup(userData.signupName, userData.email); // Use LoginPage's signup for initial step

        await tempSignupPage.fillAccountDetails(userData); // Pass the full userData object
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

        const searchProductName = 'Blue Top'; // Example, ideally from products.json
        await productsPage.searchProduct(searchProductName);
        await expect(productsPage.isSearchedProductsVisible()).resolves.toBeTruthy();

        const displayedProductNames = await productsPage.getDisplayedProductNames();
        expect(displayedProductNames.length).toBeGreaterThan(0);
        displayedProductNames.forEach(name => {
            expect(name.toLowerCase()).toContain(searchProductName.toLowerCase());
        });

        const addedProducts = await productsPage.addAllDisplayedProductsToCart();
        // addAllDisplayedProductsToCart returns string[] | undefined. Handle undefined.
        expect(addedProducts).toBeDefined();
        expect(addedProducts!.length).toBe(displayedProductNames.length);

        await homePage.clickCartLink();
        await expect(page).toHaveURL(/.*view_cart/);
        let cartProductNames = await cartPage.getCartProductNames();
        expect(cartProductNames.sort()).toEqual(addedProducts!.sort());

        await homePage.clickSignupLoginLink();
        await loginPage.login(userData.email, userData.password); // userData is from beforeAll scope

        const adSelector = '#ad_position_box';
         if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
        }
        await expect(homePage.isLoggedInAsVisible(userData.signupName)).resolves.toBeTruthy();

        await homePage.clickCartLink();
        await expect(page).toHaveURL(/.*view_cart/);
        cartProductNames = await cartPage.getCartProductNames();
        expect(cartProductNames.sort()).toEqual(addedProducts!.sort());
        expect(cartProductNames.length).toBeGreaterThan(0);
    });
});
