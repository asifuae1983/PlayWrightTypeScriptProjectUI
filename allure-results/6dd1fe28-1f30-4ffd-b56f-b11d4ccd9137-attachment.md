# Test info

- Name: Test Case 13: Verify Product quantity in Cart >> should set product quantity, add to cart, and verify quantity in cart
- Location: /app/tests/verifyProductQuantityInCart.spec.js:24:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
    at /app/tests/verifyProductQuantityInCart.spec.js:54:56
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
- text: Proceed To Checkout
- table:
  - rowgroup:
    - row "Item Description Price Quantity Total":
      - cell "Item"
      - cell "Description"
      - cell "Price"
      - cell "Quantity"
      - cell "Total"
      - cell
  - rowgroup:
    - row "Product Image Blue Top Women > Tops Rs. 500 4 Rs. 2000 ":
      - cell "Product Image":
        - link "Product Image":
          - /url: ""
          - img "Product Image"
      - cell "Blue Top Women > Tops":
        - heading "Blue Top" [level=4]:
          - link "Blue Top":
            - /url: /product_details/1
        - paragraph: Women > Tops
      - cell "Rs. 500":
        - paragraph: Rs. 500
      - cell "4":
        - button "4"
      - cell "Rs. 2000":
        - paragraph: Rs. 2000
      - cell ""
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
   1 | // tests/verifyProductQuantityInCart.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const { HomePage } = require('../pages/HomePage');
   4 | const { ProductsPage } = require('../pages/ProductsPage');
   5 | const { CartPage } = require('../pages/CartPage');
   6 | const { Utils } = require('../utils/utils');
   7 |
   8 | // Load product data
   9 | const productsTestData = Utils.loadTestData('products.json');
  10 | const testData = productsTestData.verifyProductQuantity;
  11 |
  12 | test.describe('Test Case 13: Verify Product quantity in Cart', () => {
  13 |     let homePage;
  14 |     let productsPage;
  15 |     let cartPage;
  16 |
  17 |     test.beforeEach(async ({ page }) => {
  18 |         homePage = new HomePage(page);
  19 |         productsPage = new ProductsPage(page);
  20 |         cartPage = new CartPage(page);
  21 |         await homePage.goto();
  22 |     });
  23 |
  24 |     test('should set product quantity, add to cart, and verify quantity in cart', async ({ page }) => {
  25 |         // 1. Launch browser and navigate to URL (handled by beforeEach)
  26 |         // 2. Verify that home page is visible successfully
  27 |         await expect(page).toHaveURL('https://automationexercise.com/');
  28 |
  29 |         // 3. Click 'View Product' for the product specified by index in testData
  30 |         // First, navigate to products page to be able to click on a product by index
  31 |         await homePage.clickProductsLink();
  32 |         await expect(productsPage.isAllProductsVisible()).resolves.toBe(true);
  33 |
  34 |         // Click on 'View Product' of the product specified by index
  35 |         await productsPage.clickViewProduct(testData.productToViewIndex);
  36 |
  37 |         // Verify correct product detail page is loaded (optional, but good for robustness)
  38 |         // For example, by checking the product name on the detail page
  39 |         const productNameOnDetail = await productsPage.getProductName();
  40 |         expect(productNameOnDetail.trim().toLowerCase()).toBe(testData.expectedProductName.toLowerCase());
  41 |
  42 |         // 4. Increase quantity to specified value (e.g., 4)
  43 |         await productsPage.setQuantity(testData.quantityToSet);
  44 |
  45 |         // 5. Click 'Add to cart' button
  46 |         await productsPage.clickAddToCartOnDetailPage(); // Use the specific method for detail page
  47 |
  48 |         // 6. Click 'View Cart' button (handle modal)
  49 |         // The modal appears after adding to cart from product detail page
  50 |         await page.locator(productsPage.viewCartLinkInModal).click();
  51 |
  52 |         // 7. Verify that product is displayed in cart page with exact quantity
  53 |         await expect(page).toHaveURL(/.*view_cart/);
> 54 |         expect(await cartPage.isShoppingCartVisible()).toBe(true);
     |                                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  55 |
  56 |         // Locate the product row in the cart by its name
  57 |         const productRow = page.locator(`//tr[contains(@id, 'product-')]//td[@class='cart_description']//a[text()='${testData.expectedProductName}']/ancestor::tr`);
  58 |         await expect(productRow).toBeVisible();
  59 |
  60 |         // Get the quantity from the cart
  61 |         // The website uses <button class="disabled">${quantity}</button> for quantity display.
  62 |         const cartQuantityElement = productRow.locator('.cart_quantity button.disabled');
  63 |         const actualQuantityInCart = await cartQuantityElement.textContent();
  64 |
  65 |         expect(parseInt(actualQuantityInCart)).toBe(testData.quantityToSet);
  66 |     });
  67 | });
  68 |
```