import { type Page, type Locator } from '@playwright/test';

export class ContactUsPage {
    readonly page: Page;
    readonly getInTouchText: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageTextArea: Locator;
    readonly uploadFileInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // this.getInTouchText = page.locator('h2:has-text("Get In Touch")');
        this.getInTouchText = page.getByText('Get In Touch', { exact: true });
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageTextArea = page.locator('textarea[data-qa="message"]');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
        this.submitButton = page.locator('input[data-qa="submit-button"]');
        // this.successMessage = page.locator('.status.alert.alert-success');
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have');
        this.homeButton = page.locator('#form-section a.btn.btn-success');
    }

    async isGetInTouchVisible(): Promise<boolean> {
        return await this.getInTouchText.isVisible();
    }

    async fillContactForm(name: string, email: string, subject: string, message: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextArea.fill(message);
    }

    async uploadFile(filePath: string | string[]): Promise<void> {
        await this.uploadFileInput.setInputFiles(filePath);
    }

    async clickSubmitButton(): Promise<void> {
        // Handling the alert dialog that appears after clicking submit
        this.page.once('dialog', async dialog => { // Use 'once' if the dialog only appears once per submission
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        await this.submitButton.click();
    }

    async getSuccessMessage(): Promise<string | null> {
        await this.successMessage.waitFor({ state: 'visible' });
        return await this.successMessage.textContent();
    }

    async clickHomeButton(): Promise<void> {
        await this.homeButton.click();
    }
}
