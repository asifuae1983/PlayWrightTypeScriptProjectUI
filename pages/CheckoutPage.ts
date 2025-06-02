import { type Page, type Locator } from '@playwright/test';

interface AddressDetails {
    title: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
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

    // Delivery Address Selectors
    readonly deliveryAddressContainer: string = '#address_delivery'; // Store as string for use in _getAddressDetails
    readonly deliveryAddressFullName: Locator;
    readonly deliveryAddressCompany: Locator; // Will use more specific selectors in _getAddressDetails
    readonly deliveryAddress1: Locator;
    readonly deliveryAddress2: Locator;
    readonly deliveryAddressCityStateZip: Locator;
    readonly deliveryAddressCountry: Locator;
    readonly deliveryAddressPhone: Locator;

    // Billing Address Selectors
    readonly billingAddressContainer: string = '#address_invoice'; // Store as string
    readonly billingAddressFullName: Locator;
    readonly billingAddressCompany: Locator; // Will use more specific selectors in _getAddressDetails
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

        this.deliveryAddressFullName = page.locator(`${this.deliveryAddressContainer} li.address_firstname`);
        this.deliveryAddressCompany = page.locator(`${this.deliveryAddressContainer} li.address_company`); // Primary selector
        this.deliveryAddress1 = page.locator(`${this.deliveryAddressContainer} li.address_address1`).first();
        this.deliveryAddress2 = page.locator(`${this.deliveryAddressContainer} li.address_address2`); // Primary selector
        this.deliveryAddressCityStateZip = page.locator(`${this.deliveryAddressContainer} li.address_city`);
        this.deliveryAddressCountry = page.locator(`${this.deliveryAddressContainer} li.address_country_name`);
        this.deliveryAddressPhone = page.locator(`${this.deliveryAddressContainer} li.address_phone`);

        this.billingAddressFullName = page.locator(`${this.billingAddressContainer} li.address_firstname`);
        this.billingAddressCompany = page.locator(`${this.billingAddressContainer} li.address_company`); // Primary selector
        this.billingAddress1 = page.locator(`${this.billingAddressContainer} li.address_address1`).first();
        this.billingAddress2 = page.locator(`${this.billingAddressContainer} li.address_address2`); // Primary selector
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
        const parts = cityStateZipString.trim().split(/\s+/); // Split by any whitespace
        let city = '';
        let state = '';
        let zipcode = '';

        if (parts.length >= 3) {
            zipcode = parts.pop() || '';
            state = parts.pop() || '';
            city = parts.join(' ');
        } else if (parts.length === 2) { // E.g. "City Zipcode" or "State Zipcode" - less ideal
            state = parts.shift() || ''; // Or city
            zipcode = parts.join(' ');
        } else if (parts.length === 1) {
            city = parts[0]; // Or could be zipcode or state depending on what's available
        }
        return { city, state, zipcode };
    }

    private async _getAddressDetails(containerSelectorPrefix: string): Promise<AddressDetails> {
        const fullNameStr = await this.page.locator(`${containerSelectorPrefix} li.address_firstname`).textContent();
        const { title, firstName, lastName } = this._parseFullName(fullNameStr);

        let company = (await this.page.locator(`${containerSelectorPrefix} li.address_company`).first().textContent() || '').trim();
        // Fallback for company if it's not using address_company class (based on original JS)
        if (!company) {
            const companyPositionalLocator = this.page.locator(`${containerSelectorPrefix} ul > li:nth-child(3)`);
            const address1Text = (await this.page.locator(`${containerSelectorPrefix} li.address_address1`).first().textContent() || '').trim();
            if (await companyPositionalLocator.count() > 0 && (await companyPositionalLocator.textContent() || '').trim() !== address1Text) {
                company = (await companyPositionalLocator.textContent() || '').trim();
            }
        }

        const address1 = (await this.page.locator(`${containerSelectorPrefix} li.address_address1`).first().textContent() || '').trim();

        let address2 = (await this.page.locator(`${containerSelectorPrefix} li.address_address2`).first().textContent() || '').trim();
        // Fallback for address2 (based on original JS)
        if (!address2) {
            const potentialAddress2Locator = this.page.locator(`${containerSelectorPrefix} ul > li:nth-child(5)`);
            const cityText = (await this.page.locator(`${containerSelectorPrefix} li.address_city`).first().textContent() || '').trim();
            if (await potentialAddress2Locator.count() > 0) {
                const potentialAddress2Text = (await potentialAddress2Locator.textContent() || '').trim();
                if (potentialAddress2Text !== cityText && !((await potentialAddress2Locator.getAttribute('class') || '').includes('address_city'))) {
                    address2 = potentialAddress2Text;
                }
            }
        }
        if (address2 === address1 || address2 === company) address2 = '';


        const cityStateZipStr = await this.page.locator(`${containerSelectorPrefix} li.address_city`).textContent();
        const { city, state, zipcode } = this._parseCityStateZip(cityStateZipStr);

        const country = (await this.page.locator(`${containerSelectorPrefix} li.address_country_name`).textContent() || '').trim();
        const phone = (await this.page.locator(`${containerSelectorPrefix} li.address_phone`).textContent() || '').trim();

        return {
            title,
            firstName,
            lastName,
            company,
            address1,
            address2,
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
