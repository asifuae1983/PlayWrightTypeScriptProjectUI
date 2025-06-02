import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type SignupUserDetails } from '../pages/SignupPage'; // Import combined interface
import { Utils } from '../utils/utils';
import type { UsersFile, UserData } from '../../types/testData';

const usersTestData = Utils.loadTestData('users.json') as UsersFile;
const loadedUserData: UserData = usersTestData.registerUser;

test.describe('Test Case 1: Register User', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupPage: SignupPage;

    // Generate email and name once for the describe block
    const randomEmail = Utils.generateRandomEmail((loadedUserData.firstName || "test").toLowerCase());
    // Ensure randomName uses a base from loadedUserData if available, or a default
    const baseNameForRandom = loadedUserData.firstName || "TestUser";
    const randomName = `${baseNameForRandom}${Utils.generateRandomString(4)}`;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignupPage(page);
        await homePage.goto();
    });

    test('should register a new user, verify login, and delete account', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.isSliderVisible()).resolves.toBe(true);

        await homePage.clickSignupLoginLink();
        await expect(loginPage.isSignupFormVisible()).resolves.toBe(true);
        await expect(loginPage.newUserSignupText).toBeVisible();

        await loginPage.signup(randomName, randomEmail);

        await expect(signupPage.isAccountInfoTextVisible()).resolves.toBe(true);

        // Prepare data for SignupPage methods
        const userDetails: SignupUserDetails = {
            title: loadedUserData.title || 'Mr',
            password: loadedUserData.password || 'securepassword123',
            dayOfBirth: loadedUserData.dobDay || '1',
            monthOfBirth: loadedUserData.dobMonth || 'January',
            yearOfBirth: loadedUserData.dobYear || '1990',
            newsletter: loadedUserData.newsletter || false,
            optin: loadedUserData.optin || false,
            email: randomEmail, // Not strictly needed by fillAccountDetails if password is main focus

            firstName: randomName, // Use the generated randomName for the address form's first name
            lastName: loadedUserData.lastName || 'Doe',
            company: loadedUserData.company || 'Test Corp Ltd.',
            address1: loadedUserData.address1 || '123 Test Avenue',
            address2: loadedUserData.address2 || 'Suite 100',
            country: loadedUserData.country || 'United States',
            state: loadedUserData.state || 'California',
            city: loadedUserData.city || 'San Francisco',
            zipcode: loadedUserData.zipcode || '94107',
            mobileNumber: loadedUserData.mobileNumber || '5551234567'
        };

        await signupPage.fillAccountDetails(userDetails);
        await signupPage.clickCreateAccountButton();
        await expect(signupPage.isAccountCreatedVisible()).resolves.toBe(true);
        await expect(signupPage.accountCreatedText).toBeVisible();
        await signupPage.clickContinueButton();

        const adSelector = '#ad_position_box';
        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
        }

        const loggedInAsSelector = homePage.loggedInAsTextSelector(randomName);
        try {
            await page.waitForSelector(loggedInAsSelector, { timeout: 10000 });
        } catch (e) {
            console.log("'Logged in as' not visible, attempting to refresh and check again.");
            await page.reload({ waitUntil: 'domcontentloaded' });
            if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
                await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
            }
            await page.waitForSelector(loggedInAsSelector, { timeout: 15000 });
        }
        await expect(page.locator(loggedInAsSelector)).toBeVisible();

        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
        }
        await homePage.clickDeleteAccountLink();

        if (await page.locator(adSelector).isVisible({ timeout: 5000 })) {
            await page.evaluate((sel) => document.querySelector(sel)?.remove(), adSelector);
        }
        await expect(homePage.accountDeletedText).toBeVisible({ timeout: 10000 });
        await homePage.clickDeleteContinueButton();

        await expect(page).toHaveURL('https://automationexercise.com/');
    });
});
