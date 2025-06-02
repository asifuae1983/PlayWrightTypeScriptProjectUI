# Test info

- Name: Test Case 17: Remove Products From Cart >> should add products, remove one, and verify cart content
- Location: /app/tests/removeProductsFromCart.spec.js:37:5

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
   1 | // tests/removeProductsFromCart.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const { HomePage } = require('../pages/HomePage');
   4 | const { ProductsPage } = require('../pages/ProductsPage');
   5 | const { CartPage } = require('../pages/CartPage');
   6 | const { Utils } = require('../utils/utils');
   7 |
   8 | // Load product data
   9 | const productsTestData = Utils.loadTestData('products.json');
  10 | // Using the products defined for adding to cart. We'll add both, then remove one.
  11 | const productsToManageInCart = productsTestData.addProductsToCart.products;
  12 | const productToRemove = productsToManageInCart[0]; // e.g., "Blue Top" with id "1"
  13 | const productToRemain = productsToManageInCart[1]; // e.g., "Men Tshirt" with id "2"
  14 |
  15 | test.describe('Test Case 17: Remove Products From Cart', () => {
  16 |     let homePage;
  17 |     let productsPage;
  18 |     let cartPage;
  19 |
  20 |     test.beforeEach(async ({ page }) => {
  21 |         homePage = new HomePage(page);
  22 |         productsPage = new ProductsPage(page);
  23 |         cartPage = new CartPage(page);
  24 |         await homePage.goto();
  25 |
  26 |         // Add products to cart as setup for the test
  27 |         await homePage.clickProductsLink();
  28 |         await expect(productsPage.isAllProductsVisible()).resolves.toBe(true);
  29 |
  30 |         for (const product of productsToManageInCart) {
  31 |             await productsPage.addProductToCartByName(product.name);
  32 |             await productsPage.clickContinueShopping(); // Close modal after each add
  33 |         }
  34 |         await homePage.clickCartLink(); // Go to cart page
  35 |     });
  36 |
> 37 |     test('should add products, remove one, and verify cart content', async ({ page }) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
  38 |         // 1. Launch browser, navigate to Home (Done in homePage.goto() implicitly by test runner if not first test)
  39 |         // 2. Add products to cart (Done in beforeEach)
  40 |         // 3. Click 'Cart' button (Done in beforeEach)
  41 |         // 4. Verify cart page is displayed
  42 |         await expect(page).toHaveURL(/.*view_cart/);
  43 |         expect(await cartPage.isShoppingCartVisible()).toBe(true);
  44 |
  45 |         // Verify both products are initially in the cart
  46 |         await expect(page.locator(cartPage.productInCartName(productToRemove.name))).toBeVisible();
  47 |         await expect(page.locator(cartPage.productInCartName(productToRemain.name))).toBeVisible();
  48 |
  49 |         // 5. Click 'X' button corresponding to a particular product
  50 |         // Using productToRemove.idForCartInteractions which should map to the 'product-ID' in cart HTML
  51 |         await cartPage.clickRemoveProductFromCart(productToRemove.idForCartInteractions);
  52 |
  53 |         // 6. Verify that product is removed from the cart
  54 |         // The page should refresh or update automatically after removal.
  55 |         // Wait for the element of the removed product to NOT be visible.
  56 |         await expect(page.locator(cartPage.productInCartName(productToRemove.name))).not.toBeVisible({ timeout: 10000 });
  57 |
  58 |         // Verify the other product still exists
  59 |         await expect(page.locator(cartPage.productInCartName(productToRemain.name))).toBeVisible();
  60 |
  61 |         // If only one product was left and it was removed, the cart should show "Cart is empty!"
  62 |         // In this specific test, we add two and remove one, so cart won't be empty.
  63 |         // If we were to remove the second product as well:
  64 |         // await cartPage.clickRemoveProductFromCart(productToRemain.idForCartInteractions);
  65 |         // await expect(page.locator(cartPage.productInCartName(productToRemain.name))).not.toBeVisible({ timeout: 10000 });
  66 |         // expect(await cartPage.isEmptyCartVisible()).toBe(true); // Then check for empty
  67 |     });
  68 | });
  69 |
```