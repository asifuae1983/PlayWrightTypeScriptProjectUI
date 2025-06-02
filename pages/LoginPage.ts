import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
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
}
