# Test info

- Name: Test Case 13: Verify Product quantity in Cart >> should set product quantity, add to cart, and verify quantity in cart
- Location: /app/tests/verifyProductQuantityInCart.spec.js:24:5

# Error details

```
Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
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
> 24 |     test('should set product quantity, add to cart, and verify quantity in cart', async ({ page }) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
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
  54 |         expect(await cartPage.isShoppingCartVisible()).toBe(true);
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