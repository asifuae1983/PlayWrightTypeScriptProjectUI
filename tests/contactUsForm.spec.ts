import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { Utils } from '../utils/utils';
import type { FormDataFile, ContactUsData } from 'types/testData';

// Load test data and cast to defined types
const formData = Utils.loadTestData('formData.json') as FormDataFile;
const contactUsData: ContactUsData = formData.contactUs;

const testFileName = contactUsData.testFileName;
const testFilePath = path.join(__dirname, '..', testFileName);

test.describe('Test Case 6: Contact Us Form', () => {
    let homePage: HomePage;
    let contactUsPage: ContactUsPage;

    test.beforeAll(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
        fs.writeFileSync(testFilePath, contactUsData.testFileContent || 'Default test content', 'utf8');
    });

    test.afterAll(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    test.beforeEach(async ({ page }: { page: Page }) => {
        homePage = new HomePage(page);
        contactUsPage = new ContactUsPage(page);
        await homePage.goto();
    });

    test('should submit the contact us form and verify success message', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.isSliderVisible()).resolves.toBe(true);

        await homePage.clickContactUsLink();
        // await page.waitForSelector('h2:has-text("Get In Touch")', { timeout: 8000 });
        const heading = page.getByText('Get In Touch', { exact: true });
        await expect(heading).toBeVisible();
        await expect(heading).toHaveText('Get In Touch'); 
        
        // await expect(contactUsPage.isGetInTouchVisible()).resolves.toBe(true);

        const name = Utils.generateRandomName(contactUsData.namePrefix);
        const email = Utils.generateRandomEmail(contactUsData.emailPrefix);

        await contactUsPage.fillContactForm(
            name,
            email,
            contactUsData.subject,
            contactUsData.message
        );

        console.log('Uploading file:', testFilePath, fs.existsSync(testFilePath));
        await contactUsPage.uploadFile(testFilePath);

        // clickSubmitButton in ContactUsPage already handles the dialog.
        await contactUsPage.clickSubmitButton();
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });

        const successMessageText = await contactUsPage.getSuccessMessage();
        expect(successMessageText).toContain('Success! Your details have been submitted successfully.');
        await expect(contactUsPage.successMessage).toBeVisible();
        console.log('Success message:', successMessageText);

        await contactUsPage.clickHomeButton();
        await expect(page).toHaveURL('https://automationexercise.com/');
        await expect(homePage.isSliderVisible()).resolves.toBe(true);
    });
});
