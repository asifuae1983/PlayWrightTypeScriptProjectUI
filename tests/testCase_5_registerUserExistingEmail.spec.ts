import { test, expect, type Page, type Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type AccountInformation, type AddressInformation } from '../pages/SignupPage';
import { Utils } from '../utils/utils';
import type { UsersFile, UserData } from 'types/testData';

const usersTestData = Utils.loadTestData('users.json') as UsersFile;
const loadedUserData: UserData = usersTestData.existingEmailUser;

let existingEmail: string; // Will be set in beforeAll
let userNameForInitialRegistration: string; // Will be set in beforeAll

test.describe('Test Case 5: Register User with existing email', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeAll(async ({ browser }: { browser: Browser }) => {
        existingEmail = Utils.generateRandomEmail(loadedUserData.emailPrefix || "existing");
        userNameForInitialRegistration = Utils.generateRandomName(loadedUserData.namePrefix || "ExistingUser");

        const page = await browser.newPage();
        const tempHomePage = new HomePage(page);
        const tempLoginPage = new LoginPage(page);
        const tempSignupPage = new SignupPage(page);

        await tempHomePage.goto();
        await tempHomePage.clickSignupLoginLink();
        await tempLoginPage.signup(userNameForInitialRegistration, existingEmail);

        const accountInfo: AccountInformation = {
            title: loadedUserData.title || 'Mr',
            password: loadedUserData.password || 'password123',
            dayOfBirth: loadedUserData.dobDay || '1',
            monthOfBirth: loadedUserData.dobMonth || 'January',
            yearOfBirth: loadedUserData.dobYear || '1990',
            newsletter: loadedUserData.newsletter || false,
            optin: loadedUserData.optin || false,
        };
        const addressInfo: AddressInformation = {
            firstName: userNameForInitialRegistration,
            lastName: loadedUserData.lastName || 'EmailTest',
            company: loadedUserData.company || 'SomeCo',
            address1: loadedUserData.address1 || '1 Exist St',
            address2: loadedUserData.address2 || '',
            country: loadedUserData.country || 'Canada',
            state: loadedUserData.state || 'Ontario',
            city: loadedUserData.city || 'Ottawa',
            zipcode: loadedUserData.zipcode || 'K1A 0B1',
            mobileNumber: loadedUserData.mobileNumber || '1112223333'
        };

        await tempSignupPage.fillAccountInformationPart(accountInfo);
        await tempSignupPage.fillAddressInformationPart(addressInfo);
        await tempSignupPage.clickCreateAccountButton();
        await expect(tempSignupPage.accountCreatedText).toBeVisible();
        await tempSignupPage.clickContinueButton();

        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
        }
        try {
            // Attempt to logout if logged in
            if(await tempHomePage.isLoggedInAsVisible(userNameForInitialRegistration)){
                 await tempHomePage.clickLogoutLink();
            }
        } catch (e) {
            console.log("Error during logout in beforeAll for TC5, proceeding: ", (e as Error).message);
            await page.reload({ waitUntil: 'domcontentloaded' });
            if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
                 await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
            }
            if(await tempHomePage.isLoggedInAsVisible(userNameForInitialRegistration)){
                 await tempHomePage.clickLogoutLink();
            }
        }
        await page.close();
    });

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.goto();
    });

    test('should display error for existing email', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.isSliderVisible()).resolves.toBe(true);

        await homePage.clickSignupLoginLink();
        await expect(loginPage.isSignupFormVisible()).resolves.toBe(true);

        const newAttemptName = Utils.generateRandomName((loadedUserData.namePrefix || "NewAttempt") + "Next");
        await loginPage.signup(newAttemptName, existingEmail); // Use the pre-registered existingEmail

        // The specific error message locator might need adjustment if it's not a p tag with red style.
        // LoginPage.getSignupErrorMessage() might need to be more robust or this specific locator used.
        const errorMessageLocator = page.locator('.signup-form p[style="color: red;"]');
        await expect(errorMessageLocator).toBeVisible({ timeout: 10000 });
        await expect(errorMessageLocator).toHaveText('Email Address already exist!');
    });
});
