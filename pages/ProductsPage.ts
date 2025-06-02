import { type Page, type Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly allProductsText: Locator;
    readonly productList: Locator;
    readonly firstProductViewLink: Locator;
    readonly searchProductInput: Locator;
    readonly submitSearchButton: Locator;
    readonly searchedProductsText: Locator;
    // Product Detail Page selectors
    readonly productNameOnDetail: Locator; // Renamed to avoid conflict with method getProductName
    readonly productCategoryOnDetail: Locator; // Renamed
    readonly productPriceOnDetail: Locator; // Renamed
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButtonDetail: Locator;
    //Review selectors
    readonly reviewFormName: Locator;
    readonly reviewFormEmail: Locator;
    readonly reviewFormMessage: Locator;
    readonly reviewSubmitButton: Locator;
    readonly reviewSuccessMessage: Locator;
    // Modal selectors
    readonly addedModal: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartLinkInModal: Locator;
    readonly categoryTitleText: Locator;
    // Brand selectors
    readonly brandsSidebar: Locator;
    readonly writeYourReviewTextForm: Locator; // More specific for the form itself

    constructor(page: Page) {
        this.page = page;
        this.allProductsText = page.locator('h2.title:has-text("All Products")');
        this.productList = page.locator('.features_items .col-sm-4');
        this.firstProductViewLink = page.locator('.features_items .col-sm-4:first-child .choose a');
        this.searchProductInput = page.locator('#search_product');
        this.submitSearchButton = page.locator('#submit_search');
        this.searchedProductsText = page.locator('h2.title:has-text("Searched Products")');

        this.productNameOnDetail = page.locator('.product-information h2');
        this.productCategoryOnDetail = page.locator('.product-information p:has-text("Category:")');
        this.productPriceOnDetail = page.locator('.product-information span span');
        this.productAvailability = page.locator('.product-information p:has-text("Availability:")');
        this.productCondition = page.locator('.product-information p:has-text("Condition:")');
        this.productBrand = page.locator('.product-information p:has-text("Brand:")');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButtonDetail = page.locator('button[type="button"].cart');

        this.reviewFormName = page.locator('#name');
        this.reviewFormEmail = page.locator('#email');
        this.reviewFormMessage = page.locator('#review');
        this.reviewSubmitButton = page.locator('#button-review');
        this.reviewSuccessMessage = page.locator('#review-section div[class="alert alert-success"] span');

        this.addedModal = page.locator('.modal-content');
        this.continueShoppingButton = page.locator('.modal-footer button.btn-success, .modal-footer button.btn-block');
        this.viewCartLinkInModal = page.locator('.modal-body a[href="/view_cart"]');
        this.categoryTitleText = page.locator("h2.title.text-center");

        this.brandsSidebar = page.locator(".brands_products");
        this.writeYourReviewTextForm = page.locator('form#review-form'); // Form for writing review
    }

    // Methods for dynamic selectors
    productItemByName(name: string): Locator {
        return this.page.locator(`//div[@class='productinfo' and ./p[normalize-space(text())='${name}']]`);
    }

    addToCartButtonListing(name: string): Locator {
        return this.productItemByName(name).locator(`//a[contains(@class, 'add-to-cart')]`);
    }

    productPriceListing(name: string): Locator {
        return this.productItemByName(name).locator('h2');
    }

    brandLinkByName(brandName: string): Locator {
        return this.page.locator(`.brands_products a[href='/brand_products/${brandName}']`);
    }

    async isAllProductsVisible(): Promise<boolean> {
        return await this.allProductsText.isVisible();
    }

    async getProductCount(): Promise<number> {
        return await this.productList.count();
    }

    async clickViewProduct(productIndex: number = 0): Promise<void> {
        await this.productList.nth(productIndex).locator('.choose a').click();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchProductInput.fill(productName);
        await this.submitSearchButton.click();
    }

    async isSearchedProductsVisible(): Promise<boolean> {
        return await this.searchedProductsText.isVisible();
    }

    async getProductNameOnDetail(): Promise<string | null> {
        return await this.productNameOnDetail.textContent();
    }

    async getProductCategoryOnDetail(): Promise<string | null> {
        return await this.productCategoryOnDetail.textContent();
    }

    async getProductPriceOnDetail(): Promise<string | null> {
        return await this.productPriceOnDetail.textContent();
    }

    async setQuantity(quantity: number | string): Promise<void> {
        await this.quantityInput.fill(quantity.toString());
    }

    async clickAddToCartOnDetailPage(): Promise<void> {
        await this.addToCartButtonDetail.click();
    }

    async fillReview(name: string, email: string, message: string): Promise<void> {
        await this.reviewFormName.fill(name);
        await this.reviewFormEmail.fill(email);
        await this.reviewFormMessage.fill(message);
        await this.reviewSubmitButton.click();
    }

    async getReviewSuccessMessage(): Promise<string | null> {
        return await this.reviewSuccessMessage.textContent();
    }

    async addProductToCartByName(productName: string): Promise<void> {
        const productContainerLocator = this.productItemByName(productName).first();
        await productContainerLocator.hover();
        await this.addToCartButtonListing(productName).first().click();
    }

    async getProductPriceFromListing(productName: string): Promise<string> {
        const priceElement = this.productPriceListing(productName).first();
        return (await priceElement.innerText()).trim();
    }

    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.continueShoppingButton.click();
        await this.addedModal.waitFor({ state: 'hidden', timeout: 5000 });
    }

    async clickAddToCart(): Promise<void> { // This is for detail page
        await this.addToCartButtonDetail.click();
    }

    async getCategoryTitleText(): Promise<string | null> {
        return await this.categoryTitleText.textContent();
    }

    async areBrandsVisible(): Promise<boolean> {
        await this.brandsSidebar.scrollIntoViewIfNeeded();
        return await this.brandsSidebar.isVisible();
    }

    async clickBrandLink(brandName: string): Promise<void> {
        const brandLinkLocator = this.brandLinkByName(brandName);
        await brandLinkLocator.scrollIntoViewIfNeeded();
        await brandLinkLocator.click();
    }

    async getDisplayedProductNames(): Promise<string[]> {
        const productLocators = this.page.locator('.features_items .productinfo p');
        const count = await productLocators.count();
        const names: string[] = [];
        for (let i = 0; i < count; i++) {
            const name = await productLocators.nth(i).textContent();
            if (name) names.push(name);
        }
        return names;
    }

    async addAllDisplayedProductsToCart(): Promise<string[]> {
        const productNames = await this.getDisplayedProductNames();
        if (productNames.length === 0) {
            console.log("No products found to add to cart.");
            return [];
        }

        for (const name of productNames) {
            await this.addProductToCartByName(name);
            await this.clickContinueShopping();
            await this.page.waitForTimeout(500);
        }
        return productNames;
    }

    async isWriteYourReviewVisible(): Promise<boolean> {
        return await this.writeYourReviewTextForm.isVisible();
    }
}
