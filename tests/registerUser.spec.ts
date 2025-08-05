import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type SignupUserDetails } from '../pages/SignupPage'; // Import combined interface
import { Utils } from '../utils/utils';
import { UserSetupHelper } from '../helpers/UserSetupHelper'; 
import type { UsersFile, UserData } from 'types/testData';

const usersTestData = Utils.loadTestData('users.json') as UsersFile;
const loadedUserData: UserData = usersTestData.registerUser;

test.describe('Test Case 1: Register User', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupPage: SignupPage;
    let userDetails: SignupUserDetails;

    // Generate email and name once for the describe block
    const randomEmail = Utils.generateRandomEmail((loadedUserData.firstName || "test").toLowerCase());
    const baseNameForRandom = loadedUserData.firstName || "TestUser";
    const randomName = `${baseNameForRandom}${Utils.generateRandomString(4)}`;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignupPage(page);
        await homePage.goto();

        // Prepare user details once
        userDetails = UserSetupHelper.createSignupUserDetails(loadedUserData, randomName, randomEmail);
    });

    test('should register, verify login, and delete user account', async ({ page }: { page: Page }) => {
        const utils = new Utils(page);

        await test.step('Register new user account', async () => {
            await homePage.clickSignupLoginLink();
            await expect(loginPage.newUserSignupText).toBeVisible();

            await loginPage.signup(randomName, randomEmail);
            await expect(signupPage.isAccountInfoTextVisible()).resolves.toBe(true);

            await signupPage.fillAccountDetails(userDetails);
            await signupPage.clickCreateAccountButton();
            await expect(signupPage.accountCreatedText).toBeVisible();
            
            console.log(`User registration completed for: ${randomName}`);
        });

        await test.step('Verify successful login after registration', async () => {
            await signupPage.clickContinueButton();
            await utils.removeAdIfVisible();
            
            const loggedInAsSelector = homePage.loggedInAsTextSelector(randomName);
            await expect(page.locator(loggedInAsSelector)).toBeVisible({ timeout: 15000 });
            
            console.log(`Login verification successful for: ${randomName}`);
        });

        await test.step('🗑️ Delete user account and verify cleanup', async () => {
            await expect(homePage.deleteAccountLink).toBeVisible();
            await homePage.clickDeleteAccountLink();
            await utils.removeAdIfVisible();

            await expect(homePage.accountDeletedText).toBeVisible({ timeout: 10000 });
            await homePage.clickDeleteContinueButton();
            await expect(page).toHaveURL('https://automationexercise.com/');
            
            console.log(`Account deletion completed for: ${randomName}`);
        });
    });
});