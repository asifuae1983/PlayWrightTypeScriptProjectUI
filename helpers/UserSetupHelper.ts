import { expect, type Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, type AccountInformation, type AddressInformation } from '../pages/SignupPage';
import { Utils } from '../utils/utils';
import type { UserData } from 'types/testData';

export interface TestUser {
    email: string;
    name: string;
    password: string;
}

export class UserSetupHelper {
    static async createTestUser(browser: Browser, userData: UserData): Promise<TestUser> {
        const userEmail = Utils.generateRandomEmail(userData.emailPrefix || 'test');
        const userName = Utils.generateRandomName(userData.namePrefix || 'TestUser');
        const userPassword = userData.password || "defaultPassword123";

        const page = await browser.newPage();
        const utils = new Utils(page);
        const tempHomePage = new HomePage(page);
        const tempLoginPage = new LoginPage(page);
        const tempSignupPage = new SignupPage(page);

        await tempHomePage.goto();
        await tempHomePage.clickSignupLoginLink();
        await tempLoginPage.signup(userName, userEmail);

        const accountInfo: AccountInformation = {
            title: userData.title || 'Mr',
            password: userPassword,
            dayOfBirth: userData.dobDay || '1',
            monthOfBirth: userData.dobMonth || 'January',
            yearOfBirth: userData.dobYear || '1990',
            newsletter: userData.newsletter || false,
            optin: userData.optin || false,
        };

        const addressInfo: AddressInformation = {
            firstName: userName,
            lastName: userData.lastName || 'TestUser',
            company: userData.company || 'Test Corp',
            address1: userData.address1 || '123 Test St',
            address2: userData.address2 || '',
            country: userData.country || 'United States',
            state: userData.state || 'California',
            city: userData.city || 'TestCity',
            zipcode: userData.zipcode || '12345',
            mobileNumber: userData.mobileNumber || '5551234567'
        };

        await tempSignupPage.fillAccountInformationPart(accountInfo);
        await tempSignupPage.fillAddressInformationPart(addressInfo);
        await tempSignupPage.clickCreateAccountButton();
        await expect(tempSignupPage.accountCreatedText).toBeVisible();
        await tempSignupPage.clickContinueButton();

        await utils.removeAdIfVisible();

        try {
            await page.waitForSelector('a[href="/logout"]', { timeout: 10000 });
            await page.locator('a[href="/logout"]').click();
        } catch (e) {
            console.log("Logout link not immediately visible, reloading.");
            await page.reload({ waitUntil: 'domcontentloaded' });
            await utils.removeAdIfVisible();
            await page.waitForSelector('a[href="/logout"]', { timeout: 15000 });
            await page.locator('a[href="/logout"]').click();
        }

        await page.close();
        return { email: userEmail, name: userName, password: userPassword };
    }

    static createSignupUserDetails(userData: UserData, customName?: string, customEmail?: string): SignupUserDetails {
        const randomEmail = customEmail || Utils.generateRandomEmail(userData.emailPrefix || 'test');
        const randomName = customName || Utils.generateRandomName(userData.namePrefix || 'TestUser');

        return {
            title: userData.title || 'Mr',
            password: userData.password || 'securepassword123',
            dayOfBirth: userData.dobDay || '1',
            monthOfBirth: userData.dobMonth || 'January',
            yearOfBirth: userData.dobYear || '1990',
            newsletter: userData.newsletter || false,
            optin: userData.optin || false,
            email: randomEmail,
            firstName: randomName,
            lastName: userData.lastName || 'Doe',
            company: userData.company || 'Test Corp Ltd.',
            address1: userData.address1 || '123 Test Avenue',
            address2: userData.address2 || 'Suite 100',
            country: userData.country || 'United States',
            state: userData.state || 'California',
            city: userData.city || 'San Francisco',
            zipcode: userData.zipcode || '94107',
            mobileNumber: userData.mobileNumber || '5551234567'
        };
    }
}