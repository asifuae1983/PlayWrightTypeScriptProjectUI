import { test, expect, type Page, type Download } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

import { HomePage } from '../pages/HomePage';
import { SignupPage, type SignupUserDetails } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { faker } from '@faker-js/faker';
import type { PaymentDetails } from 'types/testData';

const downloadsDir = path.join(__dirname, '..', 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
}

test.describe('Test Case 24: Download Invoice After Purchase Order', () => {
    let homePage: HomePage;
    let signupPage: SignupPage;
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let paymentPage: PaymentPage;
    let userData: SignupUserDetails & { signupName: string };
    let paymentData: PaymentDetails;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        signupPage = new SignupPage(page);
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        paymentPage = new PaymentPage(page);

        const rawFirstName = faker.person.firstName();
        userData = {
            title: faker.helpers.arrayElement(['Mr', 'Mrs'] as const),
            name: rawFirstName,
            signupName: rawFirstName,
            email: faker.internet.email(),
            password: faker.internet.password({ length: 10, prefix: 'Test!' }),
            dayOfBirth: faker.number.int({ min: 1, max: 28 }).toString(),
            monthOfBirth: faker.date.month(),
            yearOfBirth: faker.number.int({ min: 1970, max: 2005 }).toString(),
            firstName: rawFirstName,
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

        paymentData = {
            nameOnCard: `${userData.firstName} ${userData.lastName}`,
            cardNumber: faker.finance.creditCardNumber(),
            cvc: faker.finance.creditCardCVV(),
            expiryMonth: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'),
            expiryYear: (new Date().getFullYear() + faker.number.int({ min: 1, max: 5 })).toString()
        };
    });

    test('Download Invoice after purchase and delete account', async ({ page }: { page: Page }) => {
        await homePage.goto();

        await homePage.clickSignupLoginLink();
        await loginPage.enterSignupName(userData.signupName);
        await loginPage.enterSignupEmail(userData.email);
        await loginPage.clickSignupButton();

        await signupPage.fillAccountDetails(userData);
        await signupPage.clickCreateAccountButton();
        await expect(signupPage.isAccountCreatedVisible()).resolves.toBeTruthy();
        await signupPage.clickContinueButton();

        await expect(homePage.isLoggedInAsVisible(userData.signupName)).resolves.toBeTruthy();

        await homePage.clickProductsLink();
        await productsPage.addProductToCartByName('Blue Top');
        await productsPage.clickContinueShopping();

        await homePage.clickCartLink();
        await expect(cartPage.isShoppingCartVisible()).resolves.toBeTruthy();
        await cartPage.clickProceedToCheckout();

        await expect(checkoutPage.isAddressDetailsVisible()).resolves.toBeTruthy();
        await expect(checkoutPage.isReviewYourOrderVisible()).resolves.toBeTruthy();

        const orderComment = "Order for test case 24 - invoice download.";
        await checkoutPage.enterComment(orderComment);
        await checkoutPage.clickPlaceOrder();

        await expect(paymentPage.isPaymentPageVisible()).resolves.toBeTruthy();
        await paymentPage.fillPaymentDetails(
            paymentData.nameOnCard, paymentData.cardNumber, paymentData.cvc,
            paymentData.expiryMonth, paymentData.expiryYear
        );

        await paymentPage.clickPayAndConfirmOrder();

        await expect(paymentPage.isOrderPlacedVisible()).resolves.toBeTruthy();
        const successText = await paymentPage.getOrderSuccessMessage();
        // expect(successText).toContain('Your order has been placed successfully!');
        expect(successText).toContain('Congratulations! Your order has been confirmed!')
        // Download invoice and save to disk
        const [download] = await Promise.all([
            page.waitForEvent('download', { timeout: 10000 }),
            paymentPage.clickDownloadInvoice()
        ]);

        const filename = download.suggestedFilename();
        expect(filename).toBe('invoice.txt');
        const filePath = path.join(downloadsDir, filename);
        await download.saveAs(filePath);
        expect(fs.existsSync(filePath)).toBe(true);

        await paymentPage.clickContinueButton();
        await expect(page).toHaveURL(/.*\/$/);

        await homePage.clickDeleteAccountLink();
        await expect(homePage.isAccountDeletedVisible()).resolves.toBeTruthy();
        await homePage.clickDeleteContinueButton();
        await expect(homePage.isLoggedInAsVisible(userData.signupName)).resolves.toBeFalsy();
    });
});
