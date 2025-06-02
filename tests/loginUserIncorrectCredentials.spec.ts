import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { Utils } from '../utils/utils';
import type { UsersFile, UserData } from 'types/testData';

// Load test data
const usersTestData = Utils.loadTestData('users.json') as UsersFile;
const incorrectLoginData: UserData = usersTestData.loginUserIncorrect;

test.describe('Test Case 3: Login User with incorrect email and password', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.goto();
    });

    test('should display an error message for incorrect login credentials', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.isSliderVisible()).resolves.toBe(true);

        await homePage.clickSignupLoginLink();
        await expect(loginPage.isLoginFormVisible()).resolves.toBe(true);
        await expect(loginPage.loginToYourAccountText).toBeVisible();

        const incorrectEmail = Utils.generateRandomEmail(incorrectLoginData.emailPrefix || 'incorrect');
        const incorrectPassword = incorrectLoginData.password || 'invalidpassword';
        await loginPage.login(incorrectEmail, incorrectPassword);

        await expect(loginPage.loginError).toBeVisible();
        const errorMessage = await loginPage.getLoginErrorMessage();
        // Error message is "Your email or password is required incorrect!" - this seems like a typo on the site.
        // Let's check for "incorrect" as it's less likely to change than the full sentence with the typo.
        expect(errorMessage?.toLowerCase()).toContain('incorrect');
    });
});
