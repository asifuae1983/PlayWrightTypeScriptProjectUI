import { type Page, type Locator } from '@playwright/test';

interface AddressDetails {
    title: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    address3?: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string;
}

interface ParsedName {
    title: string;
    firstName: string;
    lastName: string;
}

interface ParsedCityStateZip {
    city: string;
    state: string;
    zipcode: string;
}

export class CheckoutPage {
    readonly page: Page;
    readonly addressDetailsText: Locator;
    readonly reviewYourOrderText: Locator;
    readonly deliveryAddressContainer: string = '#address_delivery';
    readonly deliveryAddressFullName: Locator;
    readonly deliveryAddressSecondItem: Locator;
    readonly deliveryAddressCompany: Locator;
    readonly deliveryAddress1: Locator;
    readonly deliveryAddress2: Locator;
    readonly deliveryAddressCityStateZip: Locator;
    readonly deliveryAddressCountry: Locator;
    readonly deliveryAddressPhone: Locator;

    // Billing Address Selectors
    readonly billingAddressContainer: string = '#address_invoice';
    readonly billingAddressFullName: Locator;
    readonly billingAddressCompany: Locator;
    readonly billingAddress1: Locator;
    readonly billingAddress2: Locator;
    readonly billingAddressCityStateZip: Locator;
    readonly billingAddressCountry: Locator;
    readonly billingAddressPhone: Locator;

    readonly commentTextArea: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addressDetailsText = page.locator('h2:has-text("Address Details")');
        this.reviewYourOrderText = page.locator('h2:has-text("Review Your Order")');

        this.deliveryAddressFullName = page.locator(`${this.deliveryAddressContainer} li.address_firstname.address_lastname`);
        this.deliveryAddressSecondItem = page.locator(`${this.deliveryAddressContainer} li:nth-child(2)`);
        this.deliveryAddressCompany = page.locator(`${this.deliveryAddressContainer} li.address_company`);
        this.deliveryAddress1 = page.locator(`${this.deliveryAddressContainer} li.address_address1`).first();
        this.deliveryAddress2 = page.locator(`${this.deliveryAddressContainer} li.address_address2`);
        this.deliveryAddressCityStateZip = page.locator(`${this.deliveryAddressContainer} li.address_city`);
        this.deliveryAddressCountry = page.locator(`${this.deliveryAddressContainer} li.address_country_name`);
        this.deliveryAddressPhone = page.locator(`${this.deliveryAddressContainer} li.address_phone`);

        this.billingAddressFullName = page.locator(`${this.billingAddressContainer} li.address_firstname.address_lastname`);
        this.billingAddressCompany = page.locator(`${this.billingAddressContainer} li.address_company`);
        this.billingAddress1 = page.locator(`${this.billingAddressContainer} li.address_address1`).first();
        this.billingAddress2 = page.locator(`${this.billingAddressContainer} li.address_address2`);
        this.billingAddressCityStateZip = page.locator(`${this.billingAddressContainer} li.address_city`);
        this.billingAddressCountry = page.locator(`${this.billingAddressContainer} li.address_country_name`);
        this.billingAddressPhone = page.locator(`${this.billingAddressContainer} li.address_phone`);

        this.commentTextArea = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.locator('a[href="/payment"]');
    }

    async isAddressDetailsVisible(): Promise<boolean> {
        return await this.addressDetailsText.isVisible();
    }

    async isReviewYourOrderVisible(): Promise<boolean> {
        return await this.reviewYourOrderText.isVisible();
    }

    private _parseFullName(fullNameString: string | null): ParsedName {
        if (!fullNameString) return { title: '', firstName: '', lastName: '' };
        const parts = fullNameString.trim().split(' ');
        let title = '';
        let firstName = '';
        let lastName = '';

        if (parts.length > 0 && (parts[0].startsWith('Mr.') || parts[0].startsWith('Mrs.'))) {
            title = parts[0];
            firstName = parts.length > 1 ? parts[1] : '';
            lastName = parts.slice(2).join(' ');
        } else {
            firstName = parts.length > 0 ? parts[0] : '';
            lastName = parts.slice(1).join(' ');
        }
        return { title, firstName, lastName };
    }

    private _parseCityStateZip(cityStateZipString: string | null): ParsedCityStateZip {
        if (!cityStateZipString) return { city: '', state: '', zipcode: '' };
        const parts = cityStateZipString.trim().split(/\s+/);
        let city = '';
        let state = '';
        let zipcode = '';

        if (parts.length >= 3) {
            zipcode = parts.pop() || '';
            state = parts.pop() || '';
            city = parts.join(' ');
        } else if (parts.length === 2) {
            state = parts.shift() || '';
            zipcode = parts.join(' ');
        } else if (parts.length === 1) {
            city = parts[0];
        }
        return { city, state, zipcode };
    }

    private async _getAddressDetails(containerSelectorPrefix: string): Promise<AddressDetails> {
        // Full name
        const fullNameStrRaw = await this.page.locator(`${containerSelectorPrefix} li.address_firstname.address_lastname`).textContent();
        const fullNameStr = fullNameStrRaw ? fullNameStrRaw.replace(/^\.\s*/, '') : '';
        const { title, firstName, lastName } = this._parseFullName(fullNameStr);

        // Company (not present in your DOM, so will always be empty)
        let company = '';
        const companyLocator = this.page.locator(`${containerSelectorPrefix} li.address_company`).first();
        if (await companyLocator.count() > 0) {
            const companyText = await companyLocator.textContent();
            if (companyText) {
                company = companyText.trim();
            }
        }

        // Extract all address lines (address1, address2, address3)
        const addressLines = await this.page.locator(`${containerSelectorPrefix} li.address_address1.address_address2`).allTextContents();

        let address1 = '';
        let address2 = '';
        let address3 = '';

        if (addressLines.length > 0) address1 = addressLines[0].trim();
        if (addressLines.length > 1) address2 = addressLines[1].trim();
        if (addressLines.length > 2) address3 = addressLines[2].trim();

        // City, State, Zip
        const cityStateZipStr = await this.page.locator(`${containerSelectorPrefix} li.address_city`).textContent();
        const { city, state, zipcode } = this._parseCityStateZip(cityStateZipStr);

        // Country
        const country = (await this.page.locator(`${containerSelectorPrefix} li.address_country_name`).textContent() || '').trim();

        // Phone
        const phone = (await this.page.locator(`${containerSelectorPrefix} li.address_phone`).textContent() || '').trim();

        return {
            title,
            firstName,
            lastName,
            company,
            address1,
            address2,
            address3,
            city,
            state,
            zipcode,
            country,
            phone
        };
    }

    async getDeliveryAddressDetails(): Promise<AddressDetails> {
        return this._getAddressDetails(this.deliveryAddressContainer);
    }

    async getBillingAddressDetails(): Promise<AddressDetails> {
        return this._getAddressDetails(this.billingAddressContainer);
    }

    async enterComment(comment: string): Promise<void> {
        await this.commentTextArea.fill(comment);
    }

    async clickPlaceOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }
}
