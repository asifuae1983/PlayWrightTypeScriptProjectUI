# Test info

- Name: Test Case 21: Add Review on Product >> should add a review to a product and verify success
- Location: /Users/asifuae1983/Desktop/AUTOMATION/PLAYWRIGHT/AutomationExercise/PlayWrightTypeScriptProjectUI/tests/testCase_21_addReviewOnProduct.spec.ts:24:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Thank you for your review."
Received: undefined
    at /Users/asifuae1983/Desktop/AUTOMATION/PLAYWRIGHT/AutomationExercise/PlayWrightTypeScriptProjectUI/tests/testCase_21_addReviewOnProduct.spec.ts:54:44
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
- heading "Category" [level=2]
- heading " Women" [level=4]:
  - link " Women":
    - /url: "#Women"
- heading " Men" [level=4]:
  - link " Men":
    - /url: "#Men"
- heading " Kids" [level=4]:
  - link " Kids":
    - /url: "#Kids"
- heading "Brands" [level=2]
- list:
  - listitem:
    - link "(6) Polo":
      - /url: /brand_products/Polo
  - listitem:
    - link "(5) H&M":
      - /url: /brand_products/H&M
  - listitem:
    - link "(5) Madame":
      - /url: /brand_products/Madame
  - listitem:
    - link "(3) Mast & Harbour":
      - /url: /brand_products/Mast & Harbour
  - listitem:
    - link "(4) Babyhug":
      - /url: /brand_products/Babyhug
  - listitem:
    - link "(3) Allen Solly Junior":
      - /url: /brand_products/Allen Solly Junior
  - listitem:
    - link "(3) Kookie Kids":
      - /url: /brand_products/Kookie Kids
  - listitem:
    - link "(5) Biba":
      - /url: /brand_products/Biba
- img "ecommerce website products"
- img "ecommerce website products"
- heading "Blue Top" [level=2]
- paragraph: "Category: Women > Tops"
- img "ecommerce website products"
- text: "Rs. 500 Quantity:"
- spinbutton: "1"
- button " Add to cart"
- paragraph: "Availability: In Stock"
- paragraph: "Condition: New"
- paragraph: "Brand: Polo"
- list:
  - listitem:
    - link "Write Your Review":
      - /url: "#reviews"
- textbox "Your Name"
- textbox "Email Address"
- textbox "Add Review Here!"
- button "Submit"
- insertion:
  - iframe
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
- insertion:
  - iframe
- insertion:
  - iframe
  - img
- insertion:
  - iframe
  - img
```

# Test source

```ts
   1 | import { test, expect, type Page } from '@playwright/test';
   2 | import { HomePage } from '../pages/HomePage';
   3 | import { ProductsPage } from '../pages/ProductsPage';
   4 | import { faker } from '@faker-js/faker';
   5 | import type { FormDataFile, ReviewData } from 'types/testData'; // For potential future use with JSON data
   6 | import { Utils } from '../utils/utils'; // For potential future use with JSON data
   7 |
   8 |
   9 | test.describe('Test Case 21: Add Review on Product', () => {
  10 |     let homePage: HomePage;
  11 |     let productsPage: ProductsPage;
  12 |     // let reviewData: ReviewData; // Example if loading from JSON
  13 |
  14 |     test.beforeEach(async ({ page }: { page: Page }) => {
  15 |         homePage = new HomePage(page);
  16 |         productsPage = new ProductsPage(page);
  17 |         await homePage.goto();
  18 |
  19 |         // Example: Load review data from JSON if it were structured that way
  20 |         // const formData = Utils.loadTestData('formData.json') as FormDataFile;
  21 |         // reviewData = formData.review;
  22 |     });
  23 |
  24 |     test('should add a review to a product and verify success', async ({ page }: { page: Page }) => {
  25 |         // 2. Click on 'Products' button
  26 |         await homePage.clickProductsLink();
  27 |         await expect(page).toHaveURL(/.*products/);
  28 |
  29 |         // 3. Verify user is navigated to ALL PRODUCTS page successfully
  30 |         await expect(productsPage.isAllProductsVisible()).resolves.toBeTruthy();
  31 |
  32 |         // 4. Click on 'View Product' button for a specific product (e.g., the first one)
  33 |         await productsPage.clickViewProduct(0);
  34 |         await productsPage.reviewFormName.waitFor({ state: 'visible', timeout: 10000 });
  35 |
  36 |         // 5. Verify 'Write Your Review' section (form) is visible
  37 |         await expect(productsPage.isWriteYourReviewVisible()).resolves.toBeTruthy();
  38 |
  39 |         // 6. Enter name, email, and review message
  40 |         const name = faker.person.fullName();
  41 |         const email = faker.internet.email();
  42 |         const reviewMessage = faker.lorem.sentence();
  43 |         // Or use from reviewData if loaded from JSON:
  44 |         // const name = faker.person.firstName() + (reviewData.namePrefix || '');
  45 |         // const email = (reviewData.emailPrefix || 'prefix') + Date.now() + '@example.com';
  46 |         // const reviewMessage = reviewData.reviewMessage;
  47 |
  48 |         // 7. Click 'Submit' button (This is done by fillReview method)
  49 |         await productsPage.fillReview(name, email, reviewMessage);
  50 |
  51 |         // 8. Verify success message 'Thank you for your review.' is visible
  52 |         // The getReviewSuccessMessage method in ProductsPage now includes the waitFor logic.
  53 |         const successMessageText = await productsPage.getReviewSuccessMessage(5000); // Pass timeout if needed, else default (7000ms) will be used
> 54 |         expect(successMessageText?.trim()).toBe('Thank you for your review.');
     |                                            ^ Error: expect(received).toBe(expected) // Object.is equality
  55 |     });
  56 | });
  57 |
```