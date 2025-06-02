# Test info

- Name: Test Case 11: Verify Subscription in Cart page >> should subscribe with an email on the cart page and verify success message
- Location: /app/tests/verifyCartPageSubscription.spec.ts:23:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 7000ms exceeded.
Call log:
  - waiting for locator('#subscribe_email') to be visible

    at CartPage.subscribeWithEmail (/app/pages/CartPage.ts:69:47)
    at /app/tests/verifyCartPageSubscription.spec.ts:32:9
```

# Page snapshot

```yaml
- banner:
  - link "Website for automation practice":
    - /url: /
    - img "Website for automation practice"
  - list:
    - listitem:
      - link " Home":
        - /url: /
    - listitem:
      - link " Products":
        - /url: /products
    - listitem:
      - link " Cart":
        - /url: /view_cart
    - listitem:
      - link " Signup / Login":
        - /url: /login
    - listitem:
      - link " Test Cases":
        - /url: /test_cases
    - listitem:
      - link " API Testing":
        - /url: /api_list
    - listitem:
      - link " Video Tutorials":
        - /url: https://www.youtube.com/c/AutomationExercise
    - listitem:
      - link " Contact us":
        - /url: /contact_us
- list:
  - listitem:
    - link "Home":
      - /url: /
  - listitem: Shopping Cart
- paragraph:
  - text: Cart is empty! Click
  - link "here":
    - /url: /products
  - text: to buy products.
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
   1 | import { type Page, type Locator } from '@playwright/test';
   2 |
   3 | export class CartPage {
   4 |     readonly page: Page;
   5 |     readonly shoppingCartText: Locator;
   6 |     readonly cartTable: Locator;
   7 |     readonly cartItems: Locator;
   8 |     readonly proceedToCheckoutButton: Locator;
   9 |     readonly registerLoginLink: Locator;
   10 |     readonly emptyCartText: Locator;
   11 |     readonly cartSubscriptionText: Locator;
   12 |     readonly cartSubscriptionEmailInput: Locator;
   13 |     readonly cartSubscriptionButton: Locator;
   14 |     readonly cartSuccessAlert: Locator;
   15 |     readonly productNameLinksInCart: Locator; // Added for getCartProductNames
   16 |
   17 |     constructor(page: Page) {
   18 |         this.page = page;
   19 |         this.shoppingCartText = page.locator('#cart_info:has-text("Shopping Cart")'); // Potentially for header text
   20 |         this.cartTable = page.locator('#cart_info_table'); // For the main cart table visibility
   21 |         this.cartItems = page.locator('#cart_info_table tbody tr'); // For individual cart item rows
   22 |         this.proceedToCheckoutButton = page.locator('.col-sm-6 .btn.check_out');
   23 |         this.registerLoginLink = page.locator('.modal-body p a[href="/login"]');
   24 |         this.emptyCartText = page.locator('#empty_cart p'); // For "Cart is empty!" message
   25 |         this.cartSubscriptionText = page.locator('h2:has-text("Subscription")');
   26 |         this.cartSubscriptionEmailInput = page.locator('#subscribe_email');
   27 |         this.cartSubscriptionButton = page.locator('#subscribe');
   28 |         this.cartSuccessAlert = page.locator('#success-subscribe');
   29 |         this.productNameLinksInCart = page.locator('#cart_info_table tbody tr td.cart_description a'); // Specific locator for product names
   30 |     }
   31 |
   32 |     productInCartName(productName: string): Locator {
   33 |         return this.page.locator(`//td[@class='cart_description']//a[text()='${productName}']`);
   34 |     }
   35 |
   36 |     productInCartQuantity(productId: string): Locator { // productId could be number if appropriate
   37 |         return this.page.locator(`#product-${productId} .cart_quantity`);
   38 |     }
   39 |
   40 |     productRemoveButton(productId: string): Locator { // productId could be number
   41 |         return this.page.locator(`#product-${productId} .cart_delete a`);
   42 |     }
   43 |
   44 |     async isShoppingCartVisible(): Promise<boolean> {
   45 |         // Check for the cart table itself as a better indicator of a populated/interactive cart view
   46 |         return await this.cartTable.isVisible();
   47 |     }
   48 |
   49 |     async enterCartSubscriptionEmail(email: string): Promise<void> {
   50 |         await this.cartSubscriptionEmailInput.fill(email);
   51 |     }
   52 |
   53 |     async clickCartSubscriptionButton(): Promise<void> {
   54 |         await this.cartSubscriptionButton.click();
   55 |     }
   56 |
   57 |     async getCartSuccessSubscriptionMessage(): Promise<string | null> {
   58 |         return await this.cartSuccessAlert.textContent();
   59 |     }
   60 |
   61 |     async isCartSubscriptionTextVisible(): Promise<boolean> {
   62 |         return await this.cartSubscriptionText.isVisible();
   63 |     }
   64 |
   65 |     // New method to encapsulate subscription interaction with a wait
   66 |     async subscribeWithEmail(email: string): Promise<void> {
   67 |         await this.cartSubscriptionText.scrollIntoViewIfNeeded(); // Ensure the section is in view
   68 |         await this.cartSubscriptionText.waitFor({ state: 'visible', timeout: 7000 }); // Wait for section header, increased timeout
>  69 |         await this.cartSubscriptionEmailInput.waitFor({ state: 'visible', timeout: 7000 }); // Wait for email input, increased timeout
      |                                               ^ TimeoutError: locator.waitFor: Timeout 7000ms exceeded.
   70 |         await this.cartSubscriptionEmailInput.waitFor({ state: 'enabled', timeout: 3000 }); // Ensure it's interactable
   71 |         await this.cartSubscriptionEmailInput.fill(email);
   72 |         await this.cartSubscriptionButton.click();
   73 |     }
   74 |
   75 |     async getCartItemCount(): Promise<number> {
   76 |         return await this.cartItems.count();
   77 |     }
   78 |
   79 |     async clickProceedToCheckout(): Promise<void> {
   80 |         await this.proceedToCheckoutButton.click();
   81 |     }
   82 |
   83 |     async clickRegisterLoginLinkInModal(): Promise<void> {
   84 |         await this.registerLoginLink.click();
   85 |     }
   86 |
   87 |     async isProductInCart(productName: string): Promise<boolean> {
   88 |         return await this.productInCartName(productName).isVisible();
   89 |     }
   90 |
   91 |     async getProductQuantityInCart(productId: string): Promise<string | null> { // productId could be number
   92 |         const quantityElement = this.productInCartQuantity(productId);
   93 |         return await quantityElement.textContent();
   94 |     }
   95 |
   96 |     async clickRemoveProductFromCart(productId: string): Promise<void> { // productId could be number
   97 |         await this.productRemoveButton(productId).click();
   98 |     }
   99 |
  100 |     async isEmptyCartVisible(): Promise<boolean> {
  101 |         const element = this.emptyCartText;
  102 |         if (await element.isVisible()) {
  103 |             const textContent = await element.textContent();
  104 |             return textContent ? textContent.includes('Cart is empty!') : false;
  105 |         }
  106 |         return false;
  107 |     }
  108 |
  109 |     async getCartProductNames(): Promise<string[]> {
  110 |         // Ensure the cart table is visible before trying to get names.
  111 |         // isShoppingCartVisible() now checks this.cartTable.
  112 |         if (!(await this.isShoppingCartVisible())) {
  113 |             if (await this.isEmptyCartVisible()) {
  114 |                 return []; // Cart is explicitly empty
  115 |             }
  116 |             // If cart table isn't visible and cart isn't flagged as empty, it's an unexpected state.
  117 |             console.warn("[CartPage.getCartProductNames] Cart table not visible. Returning empty list of names.");
  118 |             return [];
  119 |         }
  120 |
  121 |         // Use the dedicated locator for product name links
  122 |         const nameLocators = this.productNameLinksInCart;
  123 |         const count = await nameLocators.count();
  124 |
  125 |         if (count === 0) {
  126 |             // This means the cart table is visible, but no product name links were found.
  127 |             // This could be a valid empty cart state if isEmptyCartVisible() wasn't checked or if DOM is unusual.
  128 |             return [];
  129 |         }
  130 |
  131 |         return await nameLocators.allTextContents();
  132 |     }
  133 | }
  134 |
```