import { test, expect, type Page, type Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { Utils } from '../utils/utils';
import { UserSetupHelper, type TestUser } from '../helpers/UserSetupHelper';
import type { UsersFile, UserData } from 'types/testData';

// Load test data
const usersTestData = Utils.loadTestData('users.json') as UsersFile;
const loadedUserData: UserData = usersTestData.loginUserCorrect;

test.describe('Test Case 2: Login User with correct email and password', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let testUser: TestUser;

    test.beforeAll(async ({ browser }: { browser: Browser }) => {
        testUser = await UserSetupHelper.createTestUser(browser, loadedUserData);
    });

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.goto();
        
        // Validate home page loads (moved to beforeEach)
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.slider).toBeVisible();
    });

    test('should login with correct credentials', async ({ page }: { page: Page }) => {
        // Action (in page object) - includes navigation to login page
        await loginPage.performCompleteLogin(testUser.email, testUser.password, testUser.name);
        
        // Business validation (in test)
        const loggedInAsSelector = homePage.loggedInAsTextSelector(testUser.name);
        await expect(page.locator(loggedInAsSelector)).toBeVisible();
    });

    test('should delete logged in user account', async ({ page }: { page: Page }) => {
        // Action - includes navigation and login
        await loginPage.performCompleteLogin(testUser.email, testUser.password, testUser.name);
        
        // Validations (in test)
        const loggedInAsSelector = homePage.loggedInAsTextSelector(testUser.name);
        await expect(page.locator(loggedInAsSelector)).toBeVisible();
        
        await expect(homePage.deleteAccountLink).toBeVisible();
        await homePage.performAccountDeletion();
        await expect(page).toHaveURL('https://automationexercise.com/');
    });
});