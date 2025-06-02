# Test info

- Name: Test Case 8: Verify All Products and product detail page >> should display all products and verify product detail page
- Location: /app/tests/verifyAllProductsAndProductDetailPage.spec.js:23:5

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
   1 | // tests/verifyAllProductsAndProductDetailPage.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const fs = require('fs');
   4 | const path = require('path');
   5 | const { HomePage } = require('../pages/HomePage');
   6 | const { ProductsPage } = require('../pages/ProductsPage');
   7 |
   8 | // Load product test data
   9 | const productsTestDataPath = path.join(__dirname, '..', 'test-data', 'products.json');
  10 | const productsTestData = JSON.parse(fs.readFileSync(productsTestDataPath, 'utf8'));
  11 | const viewProductData = productsTestData.viewProduct; // Contains productIndex
  12 |
  13 | test.describe('Test Case 8: Verify All Products and product detail page', () => {
  14 |     let homePage;
  15 |     let productsPage;
  16 |
  17 |     test.beforeEach(async ({ page }) => {
  18 |         homePage = new HomePage(page);
  19 |         productsPage = new ProductsPage(page);
  20 |         await homePage.goto();
  21 |     });
  22 |
> 23 |     test('should display all products and verify product detail page', async ({ page }) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
  24 |         await expect(page).toHaveURL('https://automationexercise.com/');
  25 |         expect(await homePage.isSliderVisible()).toBe(true);
  26 |
  27 |         await homePage.clickProductsLink();
  28 |         await expect(page).toHaveURL('https://automationexercise.com/products');
  29 |         expect(await productsPage.isAllProductsVisible()).toBe(true);
  30 |
  31 |         const productCount = await productsPage.getProductCount();
  32 |         expect(productCount).toBeGreaterThan(0);
  33 |
  34 |         // Click on 'View Product' using index from products.json
  35 |         // Ensure the index is valid for the current product count if necessary,
  36 |         // or ensure the test data provides a safe index (e.g., 0 for first product).
  37 |         const productIndexToView = viewProductData.productIndex;
  38 |         expect(productIndexToView).toBeLessThan(productCount); // Basic check
  39 |         await productsPage.clickViewProduct(productIndexToView);
  40 |
  41 |         await expect(page.url()).toContain('/product_details/');
  42 |
  43 |         expect(await productsPage.getProductName()).not.toBeNull();
  44 |         const categoryText = await productsPage.getProductCategory();
  45 |         expect(categoryText).toContain('Category:');
  46 |         expect(await productsPage.getProductPrice()).not.toBeNull();
  47 |         await expect(page.locator(productsPage.productAvailability)).toBeVisible();
  48 |         await expect(page.locator(productsPage.productCondition)).toBeVisible();
  49 |         await expect(page.locator(productsPage.productBrand)).toBeVisible();
  50 |     });
  51 | });
  52 |
```