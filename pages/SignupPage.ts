import { type Page, type Locator } from '@playwright/test';
import { HomePage } from './HomePage';         
import { LoginPage } from './LoginPage';       
import { Utils } from '../utils/utils';  

// Interface for account information, matching typical userData structure
export interface AccountInformation {
    title: 'Mr' | 'Mrs' | 'Ms'; // Or string if more titles are possible
    password?: string; // Optional if not always set here
    name?: string; // Name used for signup, distinct from address firstName/lastName
    email?: string; // Optional if already handled by LoginPage
    dayOfBirth: string;
    monthOfBirth: string; // e.g., "January", "01", or number - depends on selectOption usage
    yearOfBirth: string;
    newsletter?: boolean;
    optin?: boolean;
}

// Interface for address information
export interface AddressInformation {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    country: string; // This will be the value for selectOption
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

// Combined interface for full signup details often used in tests
export interface SignupUserDetails extends AccountInformation, AddressInformation {
    // email is usually critical and comes from initial signup step on LoginPage
    email: string;
    // password is also critical
    password: string;
    address1: string;
    address2: string;
    address3?: string; // <-- Add this line
}


export class SignupPage {
    readonly page: Page;
    // Account Information
    readonly accountInfoText: Locator;
    readonly titleMrRadio: Locator;
    readonly titleMrsRadio: Locator;
    readonly passwordInput: Locator;
    readonly daysDropdown: Locator;
    readonly monthsDropdown: Locator;
    readonly yearsDropdown: Locator;
    readonly newsletterCheckbox: Locator;
    readonly optinCheckbox: Locator;
    // Address Information
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedText: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountInfoText = page.locator('h2 b:has-text("Enter Account Information")');
        this.titleMrRadio = page.locator('#id_gender1');
        this.titleMrsRadio = page.locator('#id_gender2');
        this.passwordInput = page.locator('#password');
        this.daysDropdown = page.locator('#days');
        this.monthsDropdown = page.locator('#months');
        this.yearsDropdown = page.locator('#years');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.optinCheckbox = page.locator('#optin');
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.companyInput = page.locator('#company');
        this.address1Input = page.locator('#address1');
        this.address2Input = page.locator('#address2');
        this.countryDropdown = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.locator('#mobile_number');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
        this.accountCreatedText = page.locator('h2[data-qa="account-created"]'); // 'ACCOUNT CREATED!'
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

    async fillAccountInformationPart(data: AccountInformation): Promise<void> {
        if (data.title === 'Mr') {
            await this.titleMrRadio.check();
        } else if (data.title === 'Mrs') {
            await this.titleMrsRadio.check();
        } // Note: No radio button for 'Ms' on the page, this might need UI adjustment or test data restriction.
        if(data.password) await this.passwordInput.fill(data.password);

        await this.daysDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.daysDropdown.locator('option').first().waitFor({ state: 'attached', timeout: 7000 }); // Wait for at least one option
        const dayOptionsCount = await this.daysDropdown.locator('option').count();
        if (dayOptionsCount < 32) { // Expected 31 days + 1 placeholder
            console.warn(`[SignupPage] Days dropdown has only ${dayOptionsCount} options, expected 32. Selection might fail or be incorrect.`);
        }
        const dayToSelect = parseInt(data.dayOfBirth, 10).toString(); // Normalize "05" to "5"
        await this.daysDropdown.selectOption(dayToSelect);

        await this.monthsDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.monthsDropdown.locator('option').first().waitFor({ state: 'attached', timeout: 7000 }); // Wait for at least one option
        const monthOptionsCount = await this.monthsDropdown.locator('option').count();
        if (monthOptionsCount < 13) { // Expected 12 months + 1 placeholder
            console.warn(`[SignupPage] Months dropdown has only ${monthOptionsCount} options, expected 13. Selection might fail or be incorrect.`);
        }
        await this.monthsDropdown.selectOption(data.monthOfBirth);

        await this.yearsDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.yearsDropdown.locator('option').first().waitFor({ state: 'attached', timeout: 7000 }); // Wait for at least one option
        const yearOptionsCount = await this.yearsDropdown.locator('option').count();
        if (yearOptionsCount < 10) { // Arbitrary threshold, e.g. expecting at least 10 years listed
            console.warn(`[SignupPage] Years dropdown has only ${yearOptionsCount} options. Expected more. Selection might fail or be incorrect.`);
            // Consider throwing an error if a minimum viable count isn't met, e.g. if (yearOptionsCount === 1 && (await this.yearsDropdown.locator('option').first().textContent()) === 'Year')
        }
        await this.yearsDropdown.selectOption(data.yearOfBirth);

        if (data.newsletter) {
            await this.newsletterCheckbox.check();
        }
        if (data.optin) {
            await this.optinCheckbox.check();
        }
    }

    async fillAddressInformationPart(data: AddressInformation): Promise<void> {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        if(data.company) {
            await this.companyInput.fill(data.company);
            console.log('Filled company:', data.company);
        }
        await this.address1Input.fill(data.address1);
        if(data.address2) await this.address2Input.fill(data.address2);

        await this.countryDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.countryDropdown.selectOption(data.country); // e.g. "United States"

        await this.stateInput.fill(data.state);
        await this.cityInput.fill(data.city);
        await this.zipcodeInput.fill(data.zipcode);
        await this.mobileNumberInput.fill(data.mobileNumber);
    }

    // Combined method often used in tests after initial name/email signup
    async fillAccountDetails(data: SignupUserDetails): Promise<void> {
        await this.fillAccountInformationPart(data); // data conforms to AccountInformation
        await this.fillAddressInformationPart(data); // data conforms to AddressInformation
    }

    // Original methods from JS, now typed
    async fillAccountInformation(title: 'Mr' | 'Mrs' | 'Ms', password: string, day: string, month: string, year: string, newsletter: boolean, optin: boolean): Promise<void> {
        await this.fillAccountInformationPart({ title, password, dayOfBirth: day, monthOfBirth: month, yearOfBirth: year, newsletter, optin });
    }

    async fillAddressInformation(firstName: string, lastName: string, company: string | undefined, address1: string, address2: string | undefined, country: string, state: string, city: string, zipcode: string, mobileNumber: string): Promise<void> {
        await this.fillAddressInformationPart({ firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber });
    }


    async clickCreateAccountButton(): Promise<void> {
        await this.createAccountButton.click();
    }

    async isAccountCreatedVisible(): Promise<boolean> {
        return await this.accountCreatedText.isVisible();
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    async isAccountInfoTextVisible(): Promise<boolean> {
        return await this.accountInfoText.isVisible();
    }

    async extractCompanyFromCheckout(): Promise<string | null> {
        // Print the address block for debugging
        const addressBlockHTML = await this.page.locator('ul.address').innerHTML();
        console.log('Checkout address block HTML:', addressBlockHTML);

        // Try the most common class
        let company = await this.page.locator('li.address_company').textContent();
        if (company && company.trim()) {
            console.log('Extracted company from checkout (by class):', company);
            return company.trim();
        }

        // Fallback: try the 3rd <li> in the address block
        company = await this.page.locator('ul.address li:nth-child(3)').textContent();
        if (company && company.trim()) {
            console.log('Extracted company from checkout (by position):', company);
            return company.trim();
        }

        // If still not found, log and return null
        console.warn('Company not found in checkout address block.');
        return null;
    }

    async debugCheckoutAddressBlock(): Promise<void> {
        console.log('Checkout address block HTML:', await this.page.locator('ul.address').innerHTML());
    }

    async performCompleteRegistration(name: string, email: string, userDetails: SignupUserDetails): Promise<void> {
        const homePage = new HomePage(this.page);
        const loginPage = new LoginPage(this.page);
        const utils = new Utils(this.page);

        // Navigate to signup
        await homePage.clickSignupLoginLink();
        await loginPage.signup(name, email);

        // Fill details and create account
        await this.fillAccountDetails(userDetails);
        await this.clickCreateAccountButton();
        await this.clickContinueButton();
        await utils.removeAdIfVisible();
    }
}
