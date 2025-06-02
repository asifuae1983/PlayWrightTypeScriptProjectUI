import { test, expect, type Page, type Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type UserData as SignupPageUserData, type AccountInformation, type AddressInformation } from '../pages/SignupPage';
import { Utils } from '../utils/utils';
import type { UsersFile, UserData } from '../../types/testData';

// Load test data
const usersTestData = Utils.loadTestData('users.json') as UsersFile;
// It's better to use a specific user type from users.json if loginUserCorrect has a fixed structure
// For now, casting to UserData which has many optional fields.
const loadedUserData: UserData = usersTestData.loginUserCorrect;

// Generate unique email and name for this test run
let userEmail: string;
let userName: string;
const userPassword = loadedUserData.password || "defaultPassword123"; // Ensure password exists

test.describe('Test Case 2: Login User with correct email and password', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    // signupPage is used in beforeAll, so not needed in beforeEach for this specific test logic
    // let signupPage: SignupPage;

    test.beforeAll(async ({ browser }: { browser: Browser }) => {
        userEmail = Utils.generateRandomEmail(loadedUserData.emailPrefix || 'logintest');
        userName = Utils.generateRandomName(loadedUserData.namePrefix || 'LoginUser');

        const page = await browser.newPage();
        const tempHomePage = new HomePage(page);
        const tempLoginPage = new LoginPage(page);
        const tempSignupPage = new SignupPage(page);

        await tempHomePage.goto();
        await tempHomePage.clickSignupLoginLink();
        await tempLoginPage.signup(userName, userEmail);

        // Construct the data for signup page methods
        const accountInfo: AccountInformation = {
            title: loadedUserData.title || 'Mr',
            password: userPassword, // from global scope
            dayOfBirth: loadedUserData.dobDay || '1',
            monthOfBirth: loadedUserData.dobMonth || 'January',
            yearOfBirth: loadedUserData.dobYear || '1990',
            newsletter: loadedUserData.newsletter || false,
            optin: loadedUserData.optin || false,
        };
        const addressInfo: AddressInformation = {
            firstName: userName, // or loadedUserData.firstName if it's different
            lastName: loadedUserData.lastName || 'TestUser',
            company: loadedUserData.company || 'Test Corp',
            address1: loadedUserData.address1 || '123 Test St',
            address2: loadedUserData.address2 || '',
            country: loadedUserData.country || 'United States',
            state: loadedUserData.state || 'California',
            city: loadedUserData.city || 'TestCity',
            zipcode: loadedUserData.zipcode || '12345',
            mobileNumber: loadedUserData.mobileNumber || '5551234567'
        };

        await tempSignupPage.fillAccountInformationPart(accountInfo);
        await tempSignupPage.fillAddressInformationPart(addressInfo);

        await tempSignupPage.clickCreateAccountButton();
        await expect(tempSignupPage.accountCreatedText).toBeVisible();
        await tempSignupPage.clickContinueButton();

        // Ad handling - kept from original, consider a utility if this pattern is common
        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => {
                const ad = document.querySelector(sel);
                if (ad) ad.remove();
            }, adSelector);
        }

        try {
            await page.waitForSelector('a[href="/logout"]', { timeout: 10000 });
            await page.locator('a[href="/logout"]').click();
        } catch (e) {
            console.log("Logout link not immediately visible after registration/continue in beforeAll, reloading.");
            await page.reload({ waitUntil: 'domcontentloaded' });
            if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
                await page.evaluate((sel) => {
                    const ad = document.querySelector(sel);
                    if (ad) ad.remove();
                }, adSelector);
            }
            await page.waitForSelector('a[href="/logout"]', { timeout: 15000 });
            await page.locator('a[href="/logout"]').click();
        }
        await page.close();
    });

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.goto();
    });

    test('should login with correct credentials and then delete account', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.slider).toBeVisible();

        await homePage.clickSignupLoginLink();
        await expect(loginPage.loginToYourAccountText).toBeVisible();

        await loginPage.login(userEmail, userPassword);

        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
             await page.evaluate((sel) => {
                const ad = document.querySelector(sel);
                if (ad) ad.remove();
            }, adSelector);
        }

        const loggedInAsSelector = homePage.loggedInAsTextSelector(userName);
        try {
            await page.waitForSelector(loggedInAsSelector, { timeout: 10000 });
        } catch (e) {
            console.log("'Logged in as' not visible after login, attempting to refresh and check again.");
            await page.reload({ waitUntil: 'domcontentloaded' });
            if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
                 await page.evaluate((sel) => {
                    const ad = document.querySelector(sel);
                    if (ad) ad.remove();
                }, adSelector);
            }
            await page.waitForSelector(loggedInAsSelector, { timeout: 15000 });
        }
        await expect(page.locator(loggedInAsSelector)).toBeVisible();

        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => {
               const ad = document.querySelector(sel);
               if (ad) ad.remove();
           }, adSelector);
       }
        await homePage.clickDeleteAccountLink();

        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => {
               const ad = document.querySelector(sel);
               if (ad) ad.remove();
           }, adSelector);
        }
        await expect(homePage.accountDeletedText).toBeVisible({ timeout: 10000 });
        await homePage.clickDeleteContinueButton();

        await expect(page).toHaveURL('https://automationexercise.com/');
    });
});
