# Test info

- Name: Test Case 13: Verify Product quantity in Cart >> should set product quantity, add to cart, and verify quantity in cart
- Location: /app/tests/verifyProductQuantityInCart.spec.ts:23:9

# Error details

```
Error: locator.textContent: Unsupported token "@class" while parsing css selector "./td[@class='cart_quantity']/button[@class='disabled']". Did you mean to CSS.escape it?
Call log:
  - waiting for //td[@class='cart_description']//a[text()='Blue Top']/ancestor::tr[1] >> ./td[@class='cart_quantity']/button[@class='disabled']

    at /app/tests/verifyProductQuantityInCart.spec.ts:58:68
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
   1 | import { test, expect, type Page, type Locator } from '@playwright/test';
   2 | import { HomePage } from '../pages/HomePage';
   3 | import { ProductsPage } from '../pages/ProductsPage';
   4 | import { CartPage } from '../pages/CartPage';
   5 | import { Utils } from '../utils/utils';
   6 | import type { ProductsFile } from 'types/testData';
   7 |
   8 | const productsTestData = Utils.loadTestData('products.json') as ProductsFile;
   9 | const testData = productsTestData.verifyProductQuantity;
  10 |
  11 | test.describe('Test Case 13: Verify Product quantity in Cart', () => {
  12 |     let homePage: HomePage;
  13 |     let productsPage: ProductsPage;
  14 |     let cartPage: CartPage;
  15 |
  16 |     test.beforeEach(async ({ page }: { page: Page }) => {
  17 |         homePage = new HomePage(page);
  18 |         productsPage = new ProductsPage(page);
  19 |         cartPage = new CartPage(page);
  20 |         await homePage.goto();
  21 |     });
  22 |
  23 |     test('should set product quantity, add to cart, and verify quantity in cart', async ({ page }: { page: Page }) => {
  24 |         await expect(page).toHaveURL('https://automationexercise.com/');
  25 |
  26 |         await homePage.clickProductsLink();
  27 |         await expect(productsPage.isAllProductsVisible()).resolves.toBe(true);
  28 |
  29 |         if (!testData || typeof testData.productToViewIndex !== 'number' ||
  30 |             !testData.expectedProductName || typeof testData.quantityToSet !== 'number') {
  31 |             throw new Error("Test data for verifying product quantity is incomplete or invalid.");
  32 |         }
  33 |
  34 |         await productsPage.clickViewProduct(testData.productToViewIndex);
  35 |
  36 |         const productNameOnDetail = await productsPage.getProductNameOnDetail(); // Using renamed method
  37 |         expect(productNameOnDetail?.trim().toLowerCase()).toBe(testData.expectedProductName.toLowerCase());
  38 |
  39 |         await productsPage.setQuantity(testData.quantityToSet);
  40 |         await productsPage.clickAddToCartOnDetailPage();
  41 |
  42 |         await productsPage.viewCartLinkInModal.click(); // productsPage has this locator
  43 |
  44 |         await expect(page).toHaveURL(/.*view_cart/);
  45 |         await expect(cartPage.isShoppingCartVisible()).resolves.toBe(true);
  46 |
  47 |         // In CartPage, productInCartName(productName) returns a Locator for the link.
  48 |         // We need to find the row for that product to get its quantity.
  49 |         const productLinkInCart = cartPage.productInCartName(testData.expectedProductName);
  50 |         await expect(productLinkInCart).toBeVisible();
  51 |
  52 |         // Define productRowLocator using a single, more complete XPath based on the product link
  53 |         const productRowLocator: Locator = page.locator(`//td[@class='cart_description']//a[text()='${testData.expectedProductName}']/ancestor::tr[1]`);
  54 |         await expect(productRowLocator).toBeVisible(); // Ensure the row itself is found
  55 |
  56 |         // Chain with relative XPath to find the cart quantity element
  57 |         const cartQuantityElement: Locator = productRowLocator.locator("./td[@class='cart_quantity']/button[@class='disabled']");
> 58 |         const actualQuantityInCartText = await cartQuantityElement.textContent();
     |                                                                    ^ Error: locator.textContent: Unsupported token "@class" while parsing css selector "./td[@class='cart_quantity']/button[@class='disabled']". Did you mean to CSS.escape it?
  59 |
  60 |         expect(actualQuantityInCartText).not.toBeNull(); // Add a null check before parseInt
  61 |         expect(parseInt(actualQuantityInCartText!)).toBe(testData.quantityToSet); // Use non-null assertion
  62 |     });
  63 | });
  64 |
```