# Test info

- Name: Test Case 9: Search Product >> should search for a product and verify search results
- Location: /app/tests/searchProduct.spec.js:23:5

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
   1 | // tests/searchProduct.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const fs = require('fs');
   4 | const path = require('path');
   5 | const { HomePage } = require('../pages/HomePage');
   6 | const { ProductsPage } = require('../pages/ProductsPage');
   7 |
   8 | // Load product test data
   9 | const productsTestDataPath = path.join(__dirname, '..', 'test-data', 'products.json');
  10 | const productsTestData = JSON.parse(fs.readFileSync(productsTestDataPath, 'utf8'));
  11 | const searchData = productsTestData.searchProduct; // Contains searchTerm and expectedProductName
  12 |
  13 | test.describe('Test Case 9: Search Product', () => {
  14 |     let homePage;
  15 |     let productsPage;
  16 |
  17 |     test.beforeEach(async ({ page }) => {
  18 |         homePage = new HomePage(page);
  19 |         productsPage = new ProductsPage(page);
  20 |         await homePage.goto();
  21 |     });
  22 |
> 23 |     test('should search for a product and verify search results', async ({ page }) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
  24 |         await expect(page).toHaveURL('https://automationexercise.com/');
  25 |         expect(await homePage.isSliderVisible()).toBe(true);
  26 |
  27 |         await homePage.clickProductsLink();
  28 |         await expect(page).toHaveURL('https://automationexercise.com/products');
  29 |         expect(await productsPage.isAllProductsVisible()).toBe(true);
  30 |
  31 |         // Use searchTerm from products.json
  32 |         await productsPage.searchProduct(searchData.searchTerm);
  33 |
  34 |         expect(await productsPage.isSearchedProductsVisible()).toBe(true);
  35 |
  36 |         const productElements = await page.locator('.features_items .col-sm-4 .productinfo p').all();
  37 |         expect(productElements.length).toBeGreaterThan(0); // Make sure some products are found
  38 |
  39 |         let foundExpectedProduct = false;
  40 |         for (const productElement of productElements) {
  41 |             const productNameText = await productElement.textContent();
  42 |             // Check if the current product's name matches the expectedProductName from JSON
  43 |             if (productNameText.trim().toLowerCase() === searchData.expectedProductName.toLowerCase()) {
  44 |                 foundExpectedProduct = true;
  45 |             }
  46 |             // Also verify that all displayed products are related to the search term (original broader check)
  47 |             expect(productNameText.toLowerCase()).toContain(searchData.searchTerm.toLowerCase());
  48 |         }
  49 |
  50 |         // Verify that the specific expected product was found in the search results
  51 |         expect(foundExpectedProduct).toBe(true, `Expected product "${searchData.expectedProductName}" not found in search results for "${searchData.searchTerm}"`);
  52 |     });
  53 | });
  54 |
```