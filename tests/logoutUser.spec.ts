import { test, expect, type Page, type Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type AccountInformation, type AddressInformation } from '../pages/SignupPage';
import { Utils } from '../utils/utils';
import type { UsersFile, UserData } from 'types/testData';

const usersTestData = Utils.loadTestData('users.json') as UsersFile;
const loadedUserData: UserData = usersTestData.loginUserCorrect; // Using a complete user profile for registration

let userEmail: string;
let userName: string;
const userPassword = loadedUserData.password || "defaultPassword123";

test.describe('Test Case 4: Logout User', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeAll(async ({ browser }: { browser: Browser }) => {
        userEmail = Utils.generateRandomEmail((loadedUserData.emailPrefix || "logout") + "Test");
        userName = Utils.generateRandomName((loadedUserData.namePrefix || "Logout") + "User");

        const page = await browser.newPage();
        const tempHomePage = new HomePage(page);
        const tempLoginPage = new LoginPage(page);
        const tempSignupPage = new SignupPage(page);

        await tempHomePage.goto();
        await tempHomePage.clickSignupLoginLink();
        await tempLoginPage.signup(userName, userEmail);

        const accountInfo: AccountInformation = {
            title: loadedUserData.title || 'Mr',
            password: userPassword,
            dayOfBirth: loadedUserData.dobDay || '1',
            monthOfBirth: loadedUserData.dobMonth || 'January',
            yearOfBirth: loadedUserData.dobYear || '1990',
            newsletter: loadedUserData.newsletter || true,
            optin: loadedUserData.optin || true,
        };
        const addressInfo: AddressInformation = {
            firstName: userName,
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

        const adSelector = '#ad_position_box'; // Ad handling
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => {
                const ad = document.querySelector(sel);
                if (ad) ad.remove();
            }, adSelector);
        }

        // Ensure user is actually logged in before closing setup page
        // No need to logout in beforeAll, the test will login and logout.
        const loggedInAsSelector = tempHomePage.loggedInAsTextSelector(userName);
        try {
            await page.waitForSelector(loggedInAsSelector, { timeout: 10000 });
        } catch (e) {
            console.log("'Logged in as' not visible after registration for logout test (beforeAll), reloading.");
            await page.reload({ waitUntil: 'domcontentloaded' });
            if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
                 await page.evaluate((sel) => {
                    const ad = document.querySelector(sel);
                    if (ad) ad.remove();
                }, adSelector);
            }
            await page.waitForSelector(loggedInAsSelector, { timeout: 15000 });
        }
        await page.close();
    });

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.goto();
    });

    test('should login, logout, and verify redirection to login page', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.slider).toBeVisible();

        await homePage.clickSignupLoginLink();
        await expect(loginPage.loginToYourAccountText).toBeVisible();

        await loginPage.login(userEmail, userPassword);

        const adSelector = '#ad_position_box'; // Ad handling
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
            console.log("'Logged in as' not visible after login for logout test, reloading.");
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
        await homePage.clickLogoutLink();

        await expect(page).toHaveURL('https://automationexercise.com/login');
        await expect(loginPage.loginToYourAccountText).toBeVisible();
    });
});
