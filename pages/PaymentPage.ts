import { type Page, type Locator } from '@playwright/test';

export class PaymentPage {
    readonly page: Page;
    readonly paymentText: Locator;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly payAndConfirmOrderButton: Locator;
    readonly orderSuccessMessage: Locator;
    readonly orderPlacedText: Locator;
    readonly downloadInvoiceButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentText = page.locator('h2:has-text("Payment")');
        this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('input[data-qa="card-number"]');
        this.cvcInput = page.locator('input[data-qa="cvc"]');
        this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
        this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
        this.payAndConfirmOrderButton = page.locator('button[data-qa="pay-button"]');
        this.orderSuccessMessage = this.page.locator('p', { hasText: 'Congratulations!' });
        this.orderPlacedText = page.locator('h2[data-qa="order-placed"]');
        this.downloadInvoiceButton = page.locator('a.btn-default.check_out'); // Specific to download invoice
        this.continueButton = page.locator('a[data-qa="continue-button"]'); // Specific to continue after order
    }

    async isPaymentPageVisible(): Promise<boolean> {
        await this.nameOnCardInput.waitFor({ state: 'visible', timeout: 5000 }); // Ensure form is ready
        return await this.paymentText.isVisible();
    }

    async fillPaymentDetails(name: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string): Promise<void> {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(cardNumber);
        await this.cvcInput.fill(cvc);
        await this.expiryMonthInput.fill(expiryMonth);
        await this.expiryYearInput.fill(expiryYear);
    }

    async clickPayAndConfirmOrder(): Promise<void> {
        await this.payAndConfirmOrderButton.click();
    }

    async getOrderSuccessMessage(timeout: number = 10000): Promise<string | null> {
        try {
            await this.orderSuccessMessage.waitFor({ state: 'visible', timeout });
            return await this.orderSuccessMessage.textContent();
        } catch (error) {
            console.log(`Order success message not visible within ${timeout}ms. Error: ${error}`);
            return null; 
        }
    }

    async isOrderPlacedVisible(): Promise<boolean> {
        return await this.orderPlacedText.isVisible();
    }

    async clickDownloadInvoice(): Promise<void> {
        await this.downloadInvoiceButton.click();
    }

    async clickContinueButton(): Promise<void> { // Renamed from original to be more generic for this page context
        await this.continueButton.click();
    }
}
