import { type Page, type Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';
import type { ExpectedProductInCart } from './ProductsPage';

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
    readonly productNameLinksInCart: Locator; // Added for getCartProductNames

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartText = page.getByText('Shopping Cart')
        this.cartTable = page.locator('#cart_info_table'); // For the main cart table visibility
        this.cartItems = page.locator('#cart_info_table tbody tr'); // For individual cart item rows
        this.proceedToCheckoutButton = page.locator('.col-sm-6 .btn.check_out');
        this.registerLoginLink = page.locator('.modal-body p a[href="/login"]');
        this.emptyCartText = page.locator('#empty_cart p'); // For "Cart is empty!" message
        this.cartSubscriptionText = page.locator('h2:has-text("Subscription")');
        this.cartSubscriptionEmailInput = page.locator('input[placeholder="Your email address"]');
        this.cartSubscriptionButton = page.locator('#subscribe');
        this.cartSuccessAlert = page.locator('.alert-success.alert');
        this.productNameLinksInCart = page.locator('#cart_info_table tbody tr td.cart_description a'); // Specific locator for product names
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
        // Check for the cart table itself as a better indicator of a populated/interactive cart view
        return await this.cartTable.isVisible();
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

    // New method to encapsulate subscription interaction with a wait
    async subscribeWithEmail(email: string): Promise<void> {
        const footerLocator = this.page.locator('footer'); // Assuming footer contains the subscription form
        await footerLocator.waitFor({ state: 'visible', timeout: 7000 });

        await this.cartSubscriptionText.scrollIntoViewIfNeeded(); 
        await this.cartSubscriptionText.waitFor({ state: 'visible', timeout: 7000 }); 
        await this.cartSubscriptionEmailInput.waitFor({ state: 'visible', timeout: 7000 }); 
        // await this.cartSubscriptionEmailInput.waitFor({ state: 'enabled', timeout: 3000 }); 
        await expect(this.cartSubscriptionEmailInput).toBeEnabled({ timeout: 3000 });
        await this.cartSubscriptionEmailInput.fill(email);
        await this.cartSubscriptionButton.click();
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

    /**
     * Ensure the cart table is visible before trying to get names.
     * isShoppingCartVisible() now checks this.cartTable.
     * @returns 
     */
    async getCartProductNames(): Promise<string[]> {
        // isShoppingCartVisible() now checks this.cartTable.
        if (!(await this.isShoppingCartVisible())) {
            if (await this.isEmptyCartVisible()) {
                return []; // Cart is explicitly empty
            }
            // If cart table isn't visible and cart isn't flagged as empty, it's an unexpected state.
            console.warn("[CartPage.getCartProductNames] Cart table not visible. Returning empty list of names.");
            return [];
        }

        // Use the dedicated locator for product name links
        const nameLocators = this.productNameLinksInCart;
        const count = await nameLocators.count();

        if (count === 0) {
            // This means the cart table is visible, but no product name links were found.
            // This could be a valid empty cart state if isEmptyCartVisible() wasn't checked or if DOM is unusual.
            return [];
        }

        return await nameLocators.allTextContents();
    }

    async logCartInfoText(): Promise<void> {
        const cartInfoText = await this.page.locator('#cart_info').textContent();
        console.log('cart_info text:', cartInfoText);
    }

    async navigateToCart(page: Page): Promise<void> {
        // Ensure any modal is closed before navigating to cart
        await this.closeModalIfOpen();
        
        const homePage = new HomePage(page);
        await homePage.clickCartLink();
        await expect(page).toHaveURL(/.*view_cart/);
        await expect(this.shoppingCartText).toBeVisible();
    }

    /**
     * Closes any open modal if present (e.g., "Added to cart" modal)
     */
    async closeModalIfOpen(): Promise<void> {
        try {
            // Check if modal is visible and close it
            const modal = this.page.locator('#cartModal');
            const continueButton = this.page.locator('button:has-text("Continue Shopping")');
            
            if (await modal.isVisible({ timeout: 2000 })) {
                await continueButton.click();
                await modal.waitFor({ state: 'hidden', timeout: 5000 });
                console.log('✅ Closed modal before navigating to cart');
            }
        } catch (error) {
            // Modal not present or already closed, continue normally
            console.log('📝 No modal to close, proceeding to cart navigation');
        }
    }

    async verifyProductsInCart(page: Page, expectedProducts: ExpectedProductInCart[]): Promise<void> {
        // Verify cart item count
        const cartItemCount = await this.getCartItemCount();
        expect(cartItemCount).toBeGreaterThanOrEqual(expectedProducts.length);

        // Log products for debugging
        const cartProductNames = await page.locator("tr[id^='product-'] a").allTextContents();
        console.log("Products in cart:", cartProductNames.map(n => n.trim()));

        // Verify each product
        for (const expectedProduct of expectedProducts) {
            await this.verifyProductDetails(page, expectedProduct);
        }

        console.log(`✅ Verified ${expectedProducts.length} products in cart`);
    }

    private async verifyProductDetails(page: Page, expectedProduct: ExpectedProductInCart): Promise<void> {
        if (!expectedProduct.name || !expectedProduct.price) {
            console.warn(`Skipping verification for invalid product: ${expectedProduct.name}`);
            return;
        }

        // Check product is visible in cart
        await expect(this.productInCartName(expectedProduct.name)).toBeVisible();

        // Get product row with robust locator
        const productRowLocator = page.locator(
            `//tr[contains(@id, 'product-') and .//a[normalize-space(text())='${expectedProduct.name}']]`
        );
        
        const rowCount = await productRowLocator.count();
        if (rowCount === 0) {
            const allRows = await page.locator("tr[id^='product-']").allTextContents();
            console.error(`Row for product "${expectedProduct.name}" not found. All rows:`, allRows);
            throw new Error(`Product row not found for: ${expectedProduct.name}`);
        }

        // Verify all details using Promise.all for efficiency
        const [priceText, quantityText, totalText] = await Promise.all([
            productRowLocator.locator('.cart_price p').textContent(),
            this.getQuantityText(productRowLocator),
            productRowLocator.locator('.cart_total p.cart_total_price').textContent()
        ]);

        // Verify price
        expect(priceText?.trim()).toBe(expectedProduct.price);

        // Verify quantity
        expect(parseInt(quantityText!.trim())).toBe(expectedProduct.quantity);

        // Verify total
        const priceNumber = parseInt(expectedProduct.price.replace(/[^\d]/g, ''), 10);
        const expectedTotal = `Rs. ${priceNumber * expectedProduct.quantity}`;
        expect(totalText?.trim()).toBe(expectedTotal);

        console.log(`✅ Verified product: ${expectedProduct.name}`);
    }

    private async getQuantityText(productRow: Locator): Promise<string | null> {
        const quantityLocator = productRow.locator('.cart_quantity .disabled');
        
        if (await quantityLocator.evaluate(el => el.tagName.toLowerCase() === 'input')) {
            return await quantityLocator.inputValue();
        } else {
            return await quantityLocator.textContent();
        }
    }
}
