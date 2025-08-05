import { expect, type Locator, type Page } from '@playwright/test';
import { Utils } from '../utils/utils';

export class HomePage {
    private page: Page;
    readonly slider: Locator;
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signupLoginLink: Locator;
    readonly testCasesLink: Locator;
    readonly apiTestingLink: Locator;
    readonly videoTutorialsLink: Locator;
    readonly contactUsLink: Locator;
    readonly subscriptionText: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscriptionButton: Locator;
    readonly successAlert: Locator;
    readonly womenCategoryLink: Locator;
    readonly womenDressCategoryLink: Locator;
    readonly menCategoryLink: Locator;
    readonly menTshirtsCategoryLink: Locator;
    readonly categoryView: Locator;
    readonly recommendedItemsSection: Locator;
    readonly addedModal: Locator;
    readonly viewCartLinkInModal: Locator;
    readonly deleteAccountLink: Locator;
    readonly logoutLink: Locator;
    readonly accountDeletedText: Locator;
    readonly deleteContinueButton: Locator;
    readonly scrollUpArrowButton: Locator;
    readonly fullFledgedText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.slider = page.locator('#slider');
        this.homeLink = page.locator('a[href="/"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('.shop-menu a[href="/view_cart"]');
        this.signupLoginLink = page.locator('a:has-text("Signup / Login")');
        this.testCasesLink = page.locator('a.test_cases_list[href="/test_cases"]');
        this.apiTestingLink = page.locator('a[href="/api_testing"]');
        this.videoTutorialsLink = page.locator('a[href="https://www.youtube.com/c/AutomationExercise"]');
        this.contactUsLink = page.locator('a[href="/contact_us"]');
        this.subscriptionText = page.locator('h2:has-text("Subscription")');
        this.subscriptionEmailInput = page.getByRole('textbox', { name: 'Your email address' })
        this.subscriptionButton = page.locator('#subscribe');
        this.successAlert = page.locator('.alert-success.alert', { hasText: 'You have been successfully subscribed!' }); // or whatever the correct selector is
        this.womenCategoryLink = page.locator("a[href='#Women']");
        this.womenDressCategoryLink = page.locator("a[href='/category_products/1']");
        this.menCategoryLink = page.locator("a[href='#Men']");
        this.menTshirtsCategoryLink = page.locator("a[href='/category_products/3']");
        this.categoryView = page.locator(".left-sidebar h2:has-text('Category')");
        this.recommendedItemsSection = page.locator('.recommended_items');
        this.addedModal = page.locator('.modal-content');
        this.viewCartLinkInModal = page.locator('.modal-body a[href="/view_cart"]');
        // this.deleteAccountLink = page.locator('a[href="/delete_account"]');
        this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
        this.logoutLink = page.locator('a[href="/logout"]');
        this.accountDeletedText = page.locator('h2[data-qa="account-deleted"]');
        this.deleteContinueButton = page.locator('a[data-qa="continue-button"]');
        this.scrollUpArrowButton = page.locator('#scrollUp');
        this.fullFledgedText = page.locator('//div[@class="item active"]//h2[contains(text(),"Full-Fledged practice website")]');
    }

    // Get all currently active recommended item cards
    private getActiveRecommendedItemCards(): Locator {
        // Assuming recommended items are within an active carousel slide, and each product is in a 'col-sm-4'
        // This might need adjustment if the structure is different (e.g. no 'col-sm-4' or if '.item.active' is not the direct parent)
        return this.recommendedItemsSection.locator('.item.active .single-products'); // .single-products is a common wrapper too.
    }

    // Returns a Locator for the name of a specific recommended item by its display index
    getRecommendedItemNameLocator(index: number): Locator {
        // Assuming the name is the first direct child <p> of .productinfo
        return this.getActiveRecommendedItemCards().nth(index).locator('.productinfo > p').first();
    }

    // Returns a Locator for the add-to-cart button of a specific recommended item
    getRecommendedItemAddToCartButtonLocator(index: number): Locator {
        // Targeting the add-to-cart button within productinfo (not the overlay one for recommended items usually)
        return this.getActiveRecommendedItemCards().nth(index).locator('.productinfo a.add-to-cart');
    }

    loggedInAsTextSelector(username: string): string { // Renamed for clarity
        return `li a:has-text('Logged in as ${username}')`;
    }

    async goto(): Promise<void> {
        await this.page.goto('https://automationexercise.com/');
    }

    async clickSignupLoginLink(): Promise<void> {
        // Wait for the link to be visible and enabled before clicking
        await this.signupLoginLink.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.signupLoginLink).toBeEnabled({ timeout: 5000 });
        await this.signupLoginLink.click();
    }

    async clickProductsLink(): Promise<void> {
        await this.productsLink.click();
    }

    async clickCartLink(): Promise<void> {
        await this.cartLink.click();
    }

    async clickTestCasesLink(): Promise<void> {
        await this.testCasesLink.first().click();
    }

    async clickContactUsLink(): Promise<void> {
        await this.contactUsLink.click();
    }

    async enterSubscriptionEmail(email: string): Promise<void> {
        await this.subscriptionEmailInput.fill(email);
    }

    async clickSubscriptionButton(): Promise<void> {
        await this.subscriptionButton.click();
    }

    async getSuccessSubscriptionMessage(): Promise<string | null> {
        return await this.successAlert.textContent();
    }

    async subscribeToNewsletter(email: string): Promise<void> {
        const footerLocator = this.page.locator('footer'); // Assuming footer contains the subscription form
        await footerLocator.waitFor({ state: 'visible', timeout: 7000 });

        await this.subscriptionText.scrollIntoViewIfNeeded(); 
        await this.subscriptionText.waitFor({ state: 'visible', timeout: 7000 }); 

        await this.subscriptionEmailInput.waitFor({ state: 'visible', timeout: 7000 }); 
        await expect(this.subscriptionEmailInput).toBeEnabled({ timeout: 3000 });
        await this.subscriptionEmailInput.fill(email);
        await this.subscriptionButton.click();
    }

    async isSliderVisible(): Promise<boolean> {
        return await this.slider.isVisible();
    }

    async areCategoriesVisible(): Promise<boolean> {
        return await this.categoryView.isVisible();
    }

    async clickWomenCategoryLink(): Promise<void> {
        await this.womenCategoryLink.click();
    }

    async clickWomenDressCategoryLink(): Promise<void> {
        await this.womenDressCategoryLink.click();
    }

    async clickMenCategoryLink(): Promise<void> {
        await this.menCategoryLink.click();
    }

    async clickMenTshirtsCategoryLink(): Promise<void> {
        await this.menTshirtsCategoryLink.click();
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async isRecommendedItemsVisible(): Promise<boolean> {
        const recommendedItems = this.recommendedItemsSection; // Use the Locator property
        await recommendedItems.scrollIntoViewIfNeeded();
        return await recommendedItems.isVisible();
    }

    async getRecommendedItemName(index: number): Promise<string | null> {
        return await this.getRecommendedItemNameLocator(index).textContent();
    }

    async addRecommendedItemToCart(index: number): Promise<string | null> {
        const itemName = await this.getRecommendedItemName(index);
        await this.getRecommendedItemAddToCartButtonLocator(index).click();
        await this.addedModal.waitFor({ state: 'visible', timeout: 5000 });
        return itemName;
    }

    async clickViewCartModalLink(): Promise<void> {
        await this.addedModal.waitFor({ state: 'visible', timeout: 5000 });
        await this.viewCartLinkInModal.click();
        await this.addedModal.waitFor({ state: 'hidden', timeout: 5000 });
    }

    async isLoggedInAsVisible(username: string): Promise<boolean> {
        return await this.page.locator(this.loggedInAsTextSelector(username)).isVisible();
    }

    async clickDeleteAccountLink(): Promise<void> {
        await this.deleteAccountLink.click();
    }

    async clickLogoutLink(): Promise<void> {
        await this.logoutLink.click();
    }

    async isAccountDeletedVisible(): Promise<boolean> {
        return await this.accountDeletedText.isVisible();
    }

    async clickDeleteContinueButton(): Promise<void> {
        await this.deleteContinueButton.click();
    }

    async isSubscriptionTextVisible(): Promise<boolean> {
        const subText = this.subscriptionText;
        await subText.scrollIntoViewIfNeeded();
        return await subText.isVisible();
    }

    async clickScrollUpArrow(): Promise<void> {
        const arrow = this.scrollUpArrowButton;
        await arrow.waitFor({ state: 'visible', timeout: 5000 });
        await arrow.click();
    }

    async isFullFledgedTextVisible(): Promise<boolean> {
        const textLocator = this.fullFledgedText;
        await textLocator.waitFor({ state: 'visible', timeout: 10000 });
        return await textLocator.isVisible();
    }

    async scrollToTop(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

    async getLoggedInUserName(): Promise<string | null> {
        // Adjust the selector to match your actual logged-in user element
        // Example: <a href="/profile"><i class="fa fa-user"></i> John Doe</a>
        const locator = this.page.locator('a:has(i.fa-user)');
        if (await locator.count() === 0) return null;
        return (await locator.first().textContent())?.replace(/\s+/, ' ').trim() || null;
    }

    // New method for account deletion workflow
    async performAccountDeletion(): Promise<void> {
        const utils = new Utils(this.page);
        
        // Actions only - no validations
        await utils.removeAdIfVisible();
        await this.clickDeleteAccountLink();
        await utils.removeAdIfVisible();
        
        // Wait for delete confirmation to appear (action, not validation)
        try {
            await this.page.waitForSelector('[data-qa="account-deleted"]', { timeout: 10000 });
        } catch (e) {
            console.log("Account deleted text not visible, attempting to refresh and check again.");
            await this.page.reload({ waitUntil: 'domcontentloaded' });
            await utils.removeAdIfVisible();
            await this.page.waitForSelector('[data-qa="account-deleted"]', { timeout: 15000 });
        }
        
        await this.clickDeleteContinueButton();
    }

    async verifyHomePage(): Promise<void> {
        await expect(this.page).toHaveURL('https://automationexercise.com/');
        await expect(this.slider).toBeVisible();
    }
}
