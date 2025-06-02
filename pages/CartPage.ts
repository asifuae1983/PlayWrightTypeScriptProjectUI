import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly shoppingCartText: Locator;
    readonly cartTable: Locator;
    readonly cartItems: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly registerLoginLink: Locator;
    readonly emptyCartText: Locator;
    readonly cartSubscriptionText: Locator;
    readonly cartSubscriptionEmailInput: Locator;
    readonly cartSubscriptionButton: Locator;
    readonly cartSuccessAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartText = page.locator('#cart_info:has-text("Shopping Cart")');
        this.cartTable = page.locator('#cart_info_table');
        this.cartItems = page.locator('#cart_info_table tbody tr');
        this.proceedToCheckoutButton = page.locator('.col-sm-6 .btn.check_out');
        this.registerLoginLink = page.locator('.modal-body p a[href="/login"]');
        this.emptyCartText = page.locator('#empty_cart p');
        this.cartSubscriptionText = page.locator('h2:has-text("Subscription")'); // Assuming this is unique enough for cart page footer
        this.cartSubscriptionEmailInput = page.locator('#subscribe_email'); // Assuming this ID is unique in footer
        this.cartSubscriptionButton = page.locator('#subscribe'); // Assuming this ID is unique in footer
        this.cartSuccessAlert = page.locator('#success-subscribe'); // Assuming this ID is unique in footer
    }

    productInCartName(productName: string): Locator {
        return this.page.locator(`//td[@class='cart_description']//a[text()='${productName}']`);
    }

    productInCartQuantity(productId: string): Locator { // productId could be number if appropriate
        return this.page.locator(`#product-${productId} .cart_quantity`);
    }

    productRemoveButton(productId: string): Locator { // productId could be number
        return this.page.locator(`#product-${productId} .cart_delete a`);
    }

    async isShoppingCartVisible(): Promise<boolean> {
        return await this.shoppingCartText.isVisible();
    }

    async enterCartSubscriptionEmail(email: string): Promise<void> {
        await this.cartSubscriptionEmailInput.fill(email);
    }

    async clickCartSubscriptionButton(): Promise<void> {
        await this.cartSubscriptionButton.click();
    }

    async getCartSuccessSubscriptionMessage(): Promise<string | null> {
        return await this.cartSuccessAlert.textContent();
    }

    async isCartSubscriptionTextVisible(): Promise<boolean> {
        return await this.cartSubscriptionText.isVisible();
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async clickProceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutButton.click();
    }

    async clickRegisterLoginLinkInModal(): Promise<void> {
        await this.registerLoginLink.click();
    }

    async isProductInCart(productName: string): Promise<boolean> {
        return await this.productInCartName(productName).isVisible();
    }

    async getProductQuantityInCart(productId: string): Promise<string | null> { // productId could be number
        const quantityElement = this.productInCartQuantity(productId);
        return await quantityElement.textContent();
    }

    async clickRemoveProductFromCart(productId: string): Promise<void> { // productId could be number
        await this.productRemoveButton(productId).click();
    }

    async isEmptyCartVisible(): Promise<boolean> {
        const element = this.emptyCartText;
        if (await element.isVisible()) {
            const textContent = await element.textContent();
            return textContent ? textContent.includes('Cart is empty!') : false;
        }
        return false;
    }

    async getCartProductNames(): Promise<string[]> {
        try {
            // Adding a specific wait for the cart items to be potentially populated
            await this.page.waitForSelector('#cart_info_table tbody tr td.cart_description a', { timeout: 5000 });
        } catch (e) {
            // If items don't appear, and cart is meant to be empty, this is fine.
            // Check if the empty cart message is visible.
            if (await this.isEmptyCartVisible()) {
                return []; // Return empty array if cart is explicitly empty
            }
            // Otherwise, re-throw or handle as an unexpected state.
            // For now, let it proceed, and count will be 0.
        }

        const productLinkLocators = this.page.locator(`${this.cartItems.first().locator(':scope').toString()} .cart_description a`);
        const count = await productLinkLocators.count();
        const names: string[] = [];

        if (count === 0) {
            if (await this.isEmptyCartVisible()) {
                return names;
            }
        }

        for (let i = 0; i < count; i++) {
            const name = await productLinkLocators.nth(i).textContent();
            if (name) {
                names.push(name);
            }
        }
        return names;
    }
}
