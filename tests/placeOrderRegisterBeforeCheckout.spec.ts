import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type AccountInformation, type AddressInformation, type SignupUserDetails } from '../pages/SignupPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { Utils } from '../utils/utils';
import type { UsersFile, UserData, ProductsFile, Product as ProductType, FormDataFile, PaymentDetails } from '../../types/testData';

const users = Utils.loadTestData('users.json') as UsersFile;
const productsData = Utils.loadTestData('products.json') as ProductsFile;
const formData = Utils.loadTestData('formData.json') as FormDataFile;

const loadedNewUser: UserData = users.registerBeforeCheckoutUser;
const productToOrder: ProductType = productsData.addProductsToCart.products[1]; // Using second product
const paymentDetails: PaymentDetails = formData.paymentDetails;

test.describe('Test Case 15: Place Order: Register before Checkout', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupPage: SignupPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let paymentPage: PaymentPage;

    // Generate email and name once for the entire describe block if tests are sequential
    // or inside beforeEach/test if each test run should be completely independent.
    // For this case, the test itself does the registration, so it's fine in the test.

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignupPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        paymentPage = new PaymentPage(page);
        await homePage.goto();
    });

    test('should register, login, add product, complete order, and delete account', async ({ page }: { page: Page }) => {
        const randomEmail = Utils.generateRandomEmail(loadedNewUser.emailPrefix || "regbefore");
        const randomName = Utils.generateRandomName(loadedNewUser.namePrefix || "RegBefore");

        await homePage.clickSignupLoginLink();
        await loginPage.signup(randomName, randomEmail);

        const signupData: SignupUserDetails = {
            // AccountInformation part
            title: loadedNewUser.title || 'Mr',
            password: loadedNewUser.password || 'password123',
            dayOfBirth: loadedNewUser.dobDay || '1',
            monthOfBirth: loadedNewUser.dobMonth || '1',
            yearOfBirth: loadedNewUser.dobYear || '1990',
            newsletter: loadedNewUser.newsletter || false,
            optin: loadedNewUser.optin || false,
            email: randomEmail, // From generated data

            // AddressInformation part
            firstName: randomName, // Using the generated name as first name for address
            lastName: loadedNewUser.lastName || 'User',
            company: loadedNewUser.company || 'Test Inc',
            address1: loadedNewUser.address1 || '123 Main St',
            address2: loadedNewUser.address2 || '',
            country: loadedNewUser.country || 'United States',
            state: loadedNewUser.state || 'CA',
            city: loadedNewUser.city || 'Los Angeles',
            zipcode: loadedNewUser.zipcode || '90001',
            mobileNumber: loadedNewUser.mobileNumber || '5551234567',
        };
        await signupPage.fillAccountDetails(signupData);
        await signupPage.clickCreateAccountButton();
        await expect(signupPage.accountCreatedText).toBeVisible();
        await signupPage.clickContinueButton();

        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate(sel => document.querySelector(sel)?.remove(), adSelector);
        }
        const loggedInAsSelector = homePage.loggedInAsTextSelector(randomName);
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
        await homePage.clickProductsLink();
        await productsPage.addProductToCartByName(productToOrder.name);
        await productsPage.clickContinueShopping();

        await homePage.clickCartLink();
        await expect(page).toHaveURL(/.*view_cart/);
        await expect(cartPage.shoppingCartText).toBeVisible();

        await cartPage.clickProceedToCheckout();
        await expect(checkoutPage.addressDetailsText).toBeVisible();
        await expect(checkoutPage.reviewYourOrderText).toBeVisible();

        const deliveryDetails = await checkoutPage.getDeliveryAddressDetails();
        expect(deliveryDetails.firstName.toLowerCase()).toContain(randomName.toLowerCase());

        await checkoutPage.enterComment("Order: Register before checkout.");
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
