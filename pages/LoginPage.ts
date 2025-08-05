import { expect, type Locator, type Page } from '@playwright/test';
import { Utils } from '../utils/utils';
import { HomePage } from './HomePage';

export class LoginPage {
    private page: Page;
    readonly loginForm: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly signupForm: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly newUserSignupText: Locator;
    readonly loginToYourAccountText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginForm = page.locator('.login-form');
        this.loginEmailInput = page.locator('input[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.loginError = page.locator('p[style="color: red;"]');
        this.signupForm = page.locator('.signup-form');
        this.signupNameInput = page.locator('input[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
        this.newUserSignupText = page.locator('h2:has-text("New User Signup!")');
        this.loginToYourAccountText = page.locator('h2:has-text("Login to your account")');
    }

    async login(email: string, password: string): Promise<void> {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    // Methods for the initial signup part often found on the login page
    async enterSignupName(name: string): Promise<void> {
        await this.signupNameInput.fill(name);
    }

    async enterSignupEmail(email: string): Promise<void> {
        await this.signupEmailInput.fill(email);
    }

    async clickSignupButton(): Promise<void> {
        await this.signupButton.click();
    }

    // Combined signup method if preferred, matches original structure.
    async signup(name: string, email: string): Promise<void> {
        await this.enterSignupName(name);
        await this.enterSignupEmail(email);
        await this.clickSignupButton();
    }


    async getLoginErrorMessage(): Promise<string | null> {
        return await this.loginError.textContent();
    }

    async getSignupErrorMessage(): Promise<string | null> {
        // Assuming the signup error (e.g., "Email Address already exist!") appears near the signup form
        // This might need a more specific selector if one exists, or rely on test assertions for specific error messages.
        // For now, let's assume a generic error display or that tests will assert specific error text.
        // If the error for signup is the same 'p[style="color: red;"]', then it's covered by loginError.
        // Typically, it's a different element or text.
        // This locator is a placeholder; adjust if a specific signup error message locator is known.
        const signupErrorLocator = this.page.locator('.signup-form p[style="color: red;"]'); // Placeholder
         if (await signupErrorLocator.count() > 0 && await signupErrorLocator.isVisible()) {
            return await signupErrorLocator.textContent();
        }
        // Fallback or if no specific error message for signup is consistently found by a generic selector.
        // Tests might need to use more specific assertions based on visible text.
        return "Error message locator for signup not specifically defined in this generic method.";
    }


    async isLoginFormVisible(): Promise<boolean> {
        return await this.loginToYourAccountText.isVisible(); // Check for title visibility
    }

    async isSignupFormVisible(): Promise<boolean> {
        return await this.newUserSignupText.isVisible(); // Check for title visibility
    }

    // New reusable methods for common login workflows
    async navigateToLoginPage(): Promise<void> {
        const homePage = new HomePage(this.page);
        await homePage.clickSignupLoginLink();
        await expect(this.loginToYourAccountText).toBeVisible();
    }

    async performLogin(email: string, password: string): Promise<void> {
        const utils = new Utils(this.page);
        
        // Actions only - no validations
        await this.login(email, password);
        await utils.removeAdIfVisible();
        
        // Remove the waitForSelector - let the test handle validation
        // The test will validate the login success with the correct username
    }

    async performCompleteLogin(email: string, password: string, username: string): Promise<void> {
        const homePage = new HomePage(this.page);
        const utils = new Utils(this.page);
        
        // Navigate and login (actions)
        await homePage.clickSignupLoginLink();
        await this.performLogin(email, password);
        
        // Wait for login completion (technical wait, not business validation)
        const loggedInAsSelector = homePage.loggedInAsTextSelector(username);
        try {
            await this.page.waitForSelector(loggedInAsSelector, { timeout: 10000 });
        } catch (e) {
            console.log("Login completion wait failed, attempting refresh...");
            await this.page.reload({ waitUntil: 'domcontentloaded' });
            await utils.removeAdIfVisible();
            await this.page.waitForSelector(loggedInAsSelector, { timeout: 15000 });
        }
    }

    async verifyUserLoggedIn(username: string): Promise<void> {
        const homePage = new HomePage(this.page);
        const loggedInAsSelector = homePage.loggedInAsTextSelector(username);
        const utils = new Utils(this.page);
        
        try {
            await this.page.waitForSelector(loggedInAsSelector, { timeout: 10000 });
        } catch (e) {
            console.log("'Logged in as' not visible after login, attempting to refresh and check again.");
            await this.page.reload({ waitUntil: 'domcontentloaded' });
            await utils.removeAdIfVisible();
            await this.page.waitForSelector(loggedInAsSelector, { timeout: 15000 });
        }
        await expect(this.page.locator(loggedInAsSelector)).toBeVisible();
    }

    async loginAndVerify(email: string, password: string, username: string): Promise<void> {
        await this.performCompleteLogin(email, password, username);
        await this.verifyUserLoggedIn(username);
    }
}
