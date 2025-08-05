import { type Page, type Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';
import type { Product as ProductType } from 'types/testData';

interface ExpectedProductInCart extends ProductType {
  quantity: number;
  displayPrice?: string;
}

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
    readonly allProductsSection: Locator; // Added for general wait

    constructor(page: Page) {
        this.page = page;
        this.allProductsText = page.locator('h2.title:has-text("All Products")');
        this.allProductsSection = page.locator('div.features_items'); // Main container for product cards
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
        // Making locator for success message more flexible to class order
        this.reviewSuccessMessage = page.locator('#review-section .alert.alert-success span');

        this.addedModal = page.locator('.modal-content');
        this.continueShoppingButton = page.locator('.modal-footer button.btn-success, .modal-footer button.btn-block');
        this.viewCartLinkInModal = page.locator('.modal-body a[href="/view_cart"]');
        this.categoryTitleText = page.locator("h2.title.text-center");

        this.brandsSidebar = page.locator(".brands_products");
        this.writeYourReviewTextForm = page.locator('form#review-form'); // Form for writing review
    }

    // private async getProductCardWrapperByName(name: string){
    //     this.page.getByText('Blue Top').nth(1);
    // }
    // --- Start of Locator Strategy v5 for Product Listings ---

    private async getProductCardWrapperByName(name: string): Promise<Locator> {
        // Strategy v5: Find the <p> with the exact normalized name within a .productinfo div,
        // then navigate to its first ancestor div.product-image-wrapper.
        // const selector = `//div[@class='productinfo']/p[normalize-space(.)='${name}']/ancestor::div[@class='product-image-wrapper'][1]`;
        const selector = 'this.page.getByText(name, { exact: true }).first();' 
        
        // const locator = this.page.locator(selector);
        const locator = this.page.getByText(name, { exact: true }).first();
        const count = await locator.count();
        console.log("Locator  :", locator);
        console.log("Count    :", count);
        
        if (count === 0) {
            console.log(`[ProductsPage V5] Product card for "${name}" not found using selector: ${selector}`);
            // For debugging, let's see if the <p> tag itself is found:
            const pLocator = this.page.locator(`//div[@class='productinfo']/p[normalize-space(.)='${name}']`);
            const pCount = await pLocator.count();
            console.log(`[ProductsPage V5] Found ${pCount} <p> tags for product name "${name}"`);
            // const allNames = await this.page.locator('div.productinfo p').allTextContents();
            // console.log(`[ProductsPage V5] Available product names on page: ${allNames.map(n => n.trim()).join('; ')}`);
        } else {
            // console.log(`[ProductsPage V5] Found ${count} card(s) for product: "${name}" with selector: ${selector}`);
        }
        return locator.first(); // If count is 0, this will point to a non-existent element. Subsequent .count() checks handle this.
    }

    // --- End of Locator Strategy v5 ---

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

    async getReviewSuccessMessage(timeout: number = 7000): Promise<string | null> {
        try {
            const reviewSectionLocator = this.page.locator('#review-section');
            await reviewSectionLocator.waitFor({ state: 'visible', timeout }); // Wait for parent section
            await this.reviewSuccessMessage.waitFor({ state: 'visible', timeout }); // Then wait for message itself
            return await this.reviewSuccessMessage.textContent();
        } catch (error) {
            console.log(`Review success message not visible within ${timeout}ms. Error: ${error}`);
            return null;
        }
    }

    async addProductToCartByName(productName: string): Promise<void> {
        await this.allProductsSection.waitFor({ state: 'visible', timeout: 10000 });
        const productCardWrapper = await this.getProductCardWrapperByName(productName); 

        if (await productCardWrapper.count() === 0) { 
            const allNames = await this.page.locator('div.productinfo p').allTextContents(); 
            console.log(`[ProductsPage] AddToCart: Product card for "${productName}" not found. Available: ${allNames.map(n => n.trim()).join('; ')}`);
            throw new Error(`Cannot add product "${productName}" to cart: Product card not found.`);
        }

        await productCardWrapper.hover({ timeout: 7000 });
        // Use productName variable, not a hardcoded string
        const addToCartButton = this.page
          .locator('.productinfo.text-center', { hasText: productName })
          .locator('a:has-text("Add to cart")'); 
        await addToCartButton.waitFor({ state: 'visible', timeout: 5000 });
        await addToCartButton.click();
    }

    async getProductPriceFromListing1(productName: string): Promise<string> {
        await this.allProductsSection.waitFor({ state: 'visible', timeout: 10000 });
        const productCardWrapper = await this.getProductCardWrapperByName(productName); 

        if (await productCardWrapper.count() === 0) { 
            const allNames = await this.page.locator('div.productinfo p').allTextContents(); 
            console.log(`[ProductsPage] GetPrice: Product card for "${productName}" not found. Available: ${allNames.map(n => n.trim()).join('; ')}`);
            throw new Error(`Cannot get price for "${productName}": Product card not found.`);
        }
        // const priceElement = productCardWrapper.locator('div.productinfo h2'); 
        // const priceElement = productCardWrapper.locator('h2');
        // const priceElement = this.page.locator('.productinfo.text-center', { hasText: '${productName}' }).locator('h2');
        const priceElement = this.page.locator('.productinfo.text-center', { hasText: productName }).locator('h2');
        console.log("priceElement : ", await priceElement.textContent());
        // await priceElement.waitFor({ state: 'visible', timeout: 15000 });
        await expect(priceElement).toBeVisible({ timeout: 15000 });
        return (await priceElement.innerText()).trim();
    }

    async getProductPriceFromListing(productName: string): Promise<string> {
        await this.allProductsSection.waitFor({ state: 'visible', timeout: 10000 });
        const productCardWrapper = await this.getProductCardWrapperByName(productName); 

        if (await productCardWrapper.count() === 0) { 
          const allNames = await this.page.locator('div.productinfo p').allTextContents(); 
          console.log(`[ProductsPage] GetPrice: Product card for "${productName}" not found. Available: ${allNames.map(n => n.trim()).join('; ')}`);
          throw new Error(`Cannot get price for "${productName}": Product card not found.`);
        }

    // Use the variable directly, not as a string template
        const priceElement = this.page.locator('.productinfo.text-center', { hasText: productName }).locator('h2');
        await expect(priceElement).toBeVisible({ timeout: 15000 });
        const priceText = (await priceElement.textContent())?.trim() ?? '';
        console.log("priceElement : ", priceText);
        return priceText;
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

    async navigateToProductsPage(page: Page): Promise<void> {
        const homePage = new HomePage(page);
        await homePage.clickProductsLink();
        await expect(page).toHaveURL('https://automationexercise.com/products');
        await expect(this.allProductsText).toBeVisible();
    }

    async addMultipleProductsToCart(products: ProductType[]): Promise<ExpectedProductInCart[]> {
        const addedProducts: ExpectedProductInCart[] = [];

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (!product?.name || !product?.price) {
                console.warn(`Skipping invalid product at index ${i}`);
                continue;
            }

            const productPrice = await this.getProductPriceFromListing(product.name);
            await this.addProductToCartByName(product.name);
            addedProducts.push({ 
                ...product, 
                quantity: 1, 
                displayPrice: productPrice 
            });

            // Always close the modal after adding a product
            await this.clickContinueShopping();

            console.log(`✅ Added product to cart: ${product.name}`);
        }

        return addedProducts;
    }
}

export type { ExpectedProductInCart };
