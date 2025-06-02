# Test info

- Name: Test Case 7: Verify Test Cases Page >> should navigate to the test cases page and verify its visibility
- Location: /app/tests/verifyTestCasesPage.spec.js:16:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 27
Received: 0
    at /app/tests/verifyTestCasesPage.spec.js:37:57
```

# Page snapshot

```yaml
- banner:
  - link "Website for practice automation":
    - /url: /
    - img "Website for practice automation"
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
- heading "Test Cases" [level=2]
- heading "Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:" [level=5]
- 'heading "Test Case 1: Register User" [level=4]':
  - 'link "Test Case 1: Register User"':
    - /url: "#collapse1"
- 'heading "Test Case 2: Login User with correct email and password" [level=4]':
  - 'link "Test Case 2: Login User with correct email and password"':
    - /url: "#collapse2"
- 'heading "Test Case 3: Login User with incorrect email and password" [level=4]':
  - 'link "Test Case 3: Login User with incorrect email and password"':
    - /url: "#collapse3"
- 'heading "Test Case 4: Logout User" [level=4]':
  - 'link "Test Case 4: Logout User"':
    - /url: "#collapse4"
- 'heading "Test Case 5: Register User with existing email" [level=4]':
  - 'link "Test Case 5: Register User with existing email"':
    - /url: "#collapse5"
- 'heading "Test Case 6: Contact Us Form" [level=4]':
  - 'link "Test Case 6: Contact Us Form"':
    - /url: "#collapse6"
- 'heading "Test Case 7: Verify Test Cases Page" [level=4]':
  - 'link "Test Case 7: Verify Test Cases Page"':
    - /url: "#collapse7"
- 'heading "Test Case 8: Verify All Products and product detail page" [level=4]':
  - 'link "Test Case 8: Verify All Products and product detail page"':
    - /url: "#collapse8"
- 'heading "Test Case 9: Search Product" [level=4]':
  - 'link "Test Case 9: Search Product"':
    - /url: "#collapse9"
- 'heading "Test Case 10: Verify Subscription in home page" [level=4]':
  - 'link "Test Case 10: Verify Subscription in home page"':
    - /url: "#collapse10"
- 'heading "Test Case 11: Verify Subscription in Cart page" [level=4]':
  - 'link "Test Case 11: Verify Subscription in Cart page"':
    - /url: "#collapse11"
- 'heading "Test Case 12: Add Products in Cart" [level=4]':
  - 'link "Test Case 12: Add Products in Cart"':
    - /url: "#collapse12"
- 'heading "Test Case 13: Verify Product quantity in Cart" [level=4]':
  - 'link "Test Case 13: Verify Product quantity in Cart"':
    - /url: "#collapse13"
- 'heading "Test Case 14: Place Order: Register while Checkout" [level=4]':
  - 'link "Test Case 14: Place Order: Register while Checkout"':
    - /url: "#collapse14"
- 'heading "Test Case 15: Place Order: Register before Checkout" [level=4]':
  - 'link "Test Case 15: Place Order: Register before Checkout"':
    - /url: "#collapse15"
- 'heading "Test Case 16: Place Order: Login before Checkout" [level=4]':
  - 'link "Test Case 16: Place Order: Login before Checkout"':
    - /url: "#collapse16"
- 'heading "Test Case 17: Remove Products From Cart" [level=4]':
  - 'link "Test Case 17: Remove Products From Cart"':
    - /url: "#collapse17"
- 'heading "Test Case 18: View Category Products" [level=4]':
  - 'link "Test Case 18: View Category Products"':
    - /url: "#collapse18"
- 'heading "Test Case 19: View & Cart Brand Products" [level=4]':
  - 'link "Test Case 19: View & Cart Brand Products"':
    - /url: "#collapse19"
- 'heading "Test Case 20: Search Products and Verify Cart After Login" [level=4]':
  - 'link "Test Case 20: Search Products and Verify Cart After Login"':
    - /url: "#collapse20"
- 'heading "Test Case 21: Add review on product" [level=4]':
  - 'link "Test Case 21: Add review on product"':
    - /url: "#collapse21"
- 'heading "Test Case 22: Add to cart from Recommended items" [level=4]':
  - 'link "Test Case 22: Add to cart from Recommended items"':
    - /url: "#collapse22"
- 'heading "Test Case 23: Verify address details in checkout page" [level=4]':
  - 'link "Test Case 23: Verify address details in checkout page"':
    - /url: "#collapse23"
- 'heading "Test Case 24: Download Invoice after purchase order" [level=4]':
  - 'link "Test Case 24: Download Invoice after purchase order"':
    - /url: "#collapse24"
- 'heading "Test Case 25: Verify Scroll Up using ''Arrow'' button and Scroll Down functionality" [level=4]':
  - 'link "Test Case 25: Verify Scroll Up using ''Arrow'' button and Scroll Down functionality"':
    - /url: "#collapse25"
- 'heading "Test Case 26: Verify Scroll Up without ''Arrow'' button and Scroll Down functionality" [level=4]':
  - 'link "Test Case 26: Verify Scroll Up without ''Arrow'' button and Scroll Down functionality"':
    - /url: "#collapse26"
- heading "Feedback for Us" [level=4]:
  - link "Feedback for Us":
    - /url: "#feedback"
- list:
  - listitem: We have identified above scenarios and added in the list.
  - listitem: You can explore more test cases in the website and if you find new test scenario that is not covered in above list, do let us know. We will definitely add that in above list.
  - listitem:
    - text: If you think, this website should cover up any particular feature, kindly share with us at
    - link "feedback@automationexercise.com":
      - /url: mailto:feedback@automationexercise.com
    - text: . We will work on that part. Your feedback matters a lot.
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
   1 | // tests/testcase7.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const { HomePage } = require('../pages/HomePage');
   4 | const { TestCasesPage } = require('../pages/TestCasesPage'); // Assuming you have this page object
   5 |
   6 | test.describe('Test Case 7: Verify Test Cases Page', () => {
   7 |     let homePage;
   8 |     let testCasesPage;
   9 |
  10 |     test.beforeEach(async ({ page }) => {
  11 |         homePage = new HomePage(page);
  12 |         testCasesPage = new TestCasesPage(page);
  13 |         await homePage.goto();
  14 |     });
  15 |
  16 |     test('should navigate to the test cases page and verify its visibility', async ({ page }) => {
  17 |         // 1. Launch browser and navigate to URL (handled by beforeEach)
  18 |         // 2. Verify that home page is visible successfully
  19 |         await expect(page).toHaveURL('https://automationexercise.com/');
  20 |         await expect(homePage.page.locator(homePage.slider)).toBeVisible();
  21 |
  22 |         // 3. Click on 'Test Cases' button
  23 |         // Assuming HomePage has a method like clickTestCasesLink()
  24 |         await homePage.clickTestCasesLink();
  25 |
  26 |         // 4. Verify user is navigated to test cases page successfully
  27 |         // The TestCasesPage object should have a method to verify its visibility
  28 |         // and the URL should be correct.
  29 |         await expect(page).toHaveURL('https://automationexercise.com/test_cases');
  30 |         await expect(testCasesPage.page.locator(testCasesPage.testCasesText)).toBeVisible();
  31 |
  32 |         // Optional: You can also verify the count of test cases or some specific text
  33 |         // For example, if TestCasesPage has a method getTestCasesCount()
  34 |         // const count = await testCasesPage.getTestCasesCount();
  35 |         // expect(count).toBeGreaterThan(0); // Check if there's at least one test case row
  36 |         // Based on the site, there are 26 test cases listed. The header row makes it 27.
> 37 |         expect(await testCasesPage.getTestCasesCount()).toBe(27);
     |                                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  38 |     });
  39 | });
  40 |
```