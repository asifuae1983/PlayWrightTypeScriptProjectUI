import { test, expect, type Page, type Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type AccountInformation, type AddressInformation } from '../pages/SignupPage'; // Removed UserData as SignupPageUserData
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { Utils } from '../utils/utils';
import type { UsersFile, UserData, ProductsFile, Product as ProductType, FormDataFile, PaymentDetails } from 'types/testData';

const users = Utils.loadTestData('users.json') as UsersFile;
const productsData = Utils.loadTestData('products.json') as ProductsFile;
const formData = Utils.loadTestData('formData.json') as FormDataFile;

const loadedExistingUserData: UserData = users.loginBeforeCheckoutUser;
const productToOrder: ProductType = productsData.addProductsToCart.products[0];
const paymentDetails: PaymentDetails = formData.paymentDetails;

let userEmail: string;
let userName: string;
const userPassword = loadedExistingUserData.password || "defaultPassword123";

test.describe('Test Case 16: Place Order: Login before Checkout', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let paymentPage: PaymentPage;

    test.beforeAll(async ({ browser }: { browser: Browser }) => {
        userEmail = Utils.generateRandomEmail(loadedExistingUserData.emailPrefix || "loginbeforeco");
        userName = Utils.generateRandomName(loadedExistingUserData.namePrefix || "LoginBeforeCO");

        const page = await browser.newPage();
        const tempHomePage = new HomePage(page);
        const tempLoginPage = new LoginPage(page);
        const tempSignupPage = new SignupPage(page);

        await tempHomePage.goto();
        await tempHomePage.clickSignupLoginLink();
        await tempLoginPage.signup(userName, userEmail);

        const accountInfo: AccountInformation = {
            title: loadedExistingUserData.title || 'Mr',
            password: userPassword,
            dayOfBirth: loadedExistingUserData.dobDay || '1',
            monthOfBirth: loadedExistingUserData.dobMonth || 'January',
            yearOfBirth: loadedExistingUserData.dobYear || '1990',
            newsletter: loadedExistingUserData.newsletter || false,
            optin: loadedExistingUserData.optin || false,
        };
        const addressInfo: AddressInformation = {
            firstName: userName, // Or loadedExistingUserData.firstName
            lastName: loadedExistingUserData.lastName || 'TestUser',
            company: loadedExistingUserData.company || 'Test Corp',
            address1: loadedExistingUserData.address1 || '123 Test St',
            address2: loadedExistingUserData.address2 || '',
            country: loadedExistingUserData.country || 'United States',
            state: loadedExistingUserData.state || 'California',
            city: loadedExistingUserData.city || 'TestCity',
            zipcode: loadedExistingUserData.zipcode || '12345',
            mobileNumber: loadedExistingUserData.mobileNumber || '5551234567'
        };
        await tempSignupPage.fillAccountInformationPart(accountInfo);
        await tempSignupPage.fillAddressInformationPart(addressInfo);
        await tempSignupPage.clickCreateAccountButton();
        await expect(tempSignupPage.accountCreatedText).toBeVisible();
        await tempSignupPage.clickContinueButton();

        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate(sel => document.querySelector(sel)?.remove(), adSelector);
        }
        try {
            await tempHomePage.clickLogoutLink(); // Use Page Object method
        } catch (e) {
            await page.reload({ waitUntil: 'domcontentloaded' });
            if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
                 await page.evaluate(sel => document.querySelector(sel)?.remove(), adSelector);
            }
            await tempHomePage.clickLogoutLink();
        }
        await expect(page).toHaveURL(/.*login/);
        await page.close();
    });

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        paymentPage = new PaymentPage(page);
        await homePage.goto();
    });

    test('should login, add product, complete order, and delete account', async ({ page }: { page: Page }) => {
        await homePage.clickSignupLoginLink();
        await expect(loginPage.loginToYourAccountText).toBeVisible();
        await loginPage.login(userEmail, userPassword);

        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate(sel => document.querySelector(sel)?.remove(), adSelector);
        }
        const loggedInAsSelector = homePage.loggedInAsTextSelector(userName);
        try {
            await page.waitForSelector(loggedInAsSelector, { timeout: 10000 });
        } catch (e) {
            await page.reload({ waitUntil: 'domcontentloaded' });
             if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
                await page.evaluate(sel => document.querySelector(sel)?.remove(), adSelector);
            }
            await page.waitForSelector(loggedInAsSelector, { timeout: 15000 });
        }
        await expect(page.locator(loggedInAsSelector)).toBeVisible();

        if (!productToOrder || !productToOrder.name) {
            throw new Error("Product to order or its name is undefined.");
        }
        await homePage.clickProductsLink(); // Or navigate directly if URL is fixed
        await productsPage.addProductToCartByName(productToOrder.name);
        await productsPage.clickContinueShopping();

        await homePage.clickCartLink();
        await expect(page).toHaveURL(/.*view_cart/);
        await expect(cartPage.shoppingCartText).toBeVisible();

        await cartPage.clickProceedToCheckout();
        await expect(checkoutPage.addressDetailsText).toBeVisible();
        await expect(checkoutPage.reviewYourOrderText).toBeVisible();

        // Basic check for address, more detailed in TC23
        const deliveryDetails = await checkoutPage.getDeliveryAddressDetails();
        expect(deliveryDetails.firstName.toLowerCase()).toContain((loadedExistingUserData.firstName || userName).toLowerCase());


        await checkoutPage.enterComment("Order placed by existing user - Login before checkout.");
        await checkoutPage.clickPlaceOrder();

        await paymentPage.fillPaymentDetails(
            paymentDetails.nameOnCard, paymentDetails.cardNumber, paymentDetails.cvc,
            paymentDetails.expiryMonth, paymentDetails.expiryYear
        );
        await paymentPage.clickPayAndConfirmOrder();
        await expect(paymentPage.orderPlacedText).toBeVisible({ timeout: 15000 });

        await homePage.goto(); // Go home to find delete link
         if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate(sel => document.querySelector(sel)?.remove(), adSelector);
        }
        await homePage.clickDeleteAccountLink();
        await expect(homePage.accountDeletedText).toBeVisible({ timeout: 10000 });
        await homePage.clickDeleteContinueButton();
        await expect(page).toHaveURL('https://automationexercise.com/');
    });
});
