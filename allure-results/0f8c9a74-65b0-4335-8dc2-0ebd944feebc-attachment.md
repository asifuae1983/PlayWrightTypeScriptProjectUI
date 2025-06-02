# Test info

- Name: Test Case 11: Verify Subscription in Cart page >> should subscribe with an email on the cart page and verify success message
- Location: /app/tests/verifyCartPageSubscription.spec.js:24:5

# Error details

```
TimeoutError: locator.scrollIntoViewIfNeeded: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#subscribe_email')

    at Utils.scrollToElement (/app/utils/utils.js:62:23)
    at /app/tests/verifyCartPageSubscription.spec.js:34:9
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
   1 | // utils/utils.js
   2 | const crypto = require('crypto');
   3 | const fs = require('fs'); // Import fs module
   4 | const path = require('path'); // Import path module
   5 |
   6 | class Utils {
   7 |     constructor(page) {
   8 |         this.page = page;
   9 |     }
  10 |
  11 |     /**
  12 |      * Loads test data from a JSON file.
  13 |      * @param {string} fileName - The name of the JSON file in the 'test-data' directory (e.g., 'users.json').
  14 |      * @returns {object} The parsed JSON data.
  15 |      */
  16 |     static loadTestData(fileName) {
  17 |         const filePath = path.join(__dirname, '..', 'test-data', fileName); // Assumes test-data is at project root
  18 |         if (!fs.existsSync(filePath)) {
  19 |             throw new Error(`Test data file not found: ${filePath}`);
  20 |         }
  21 |         const fileContent = fs.readFileSync(filePath, 'utf8');
  22 |         return JSON.parse(fileContent);
  23 |     }
  24 |
  25 |     static generateRandomEmail(prefix = 'testuser') {
  26 |         const randomString = crypto.randomBytes(4).toString('hex');
  27 |         return `${prefix}_${randomString}@example.com`;
  28 |     }
  29 |
  30 |     static generateRandomName(prefix = 'User') {
  31 |         const randomString = crypto.randomBytes(4).toString('hex');
  32 |         return `${prefix}${randomString}`;
  33 |     }
  34 |
  35 |     static generateRandomString(length = 10) {
  36 |         return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  37 |     }
  38 |
  39 |     async navigateTo(url) {
  40 |         await this.page.goto(url);
  41 |     }
  42 |
  43 |     // commonLogin is less common if tests handle their own data, but can be kept if useful
  44 |     async commonLogin(loginPage, email, password) {
  45 |         // Note: This method might become less relevant if login data is always sourced from JSON in tests.
  46 |         // Or, it could be adapted to take a user data object.
  47 |         await loginPage.loginEmailInput.fill(email);
  48 |         await loginPage.loginPasswordInput.fill(password);
  49 |         await loginPage.loginButton.click();
  50 |     }
  51 |
  52 |     async takeScreenshot(filename) {
  53 |         const screenshotsDir = path.join(__dirname, '..', 'screenshots'); // Ensure screenshots dir is at project root
  54 |         if (!fs.existsSync(screenshotsDir)) {
  55 |             fs.mkdirSync(screenshotsDir, { recursive: true });
  56 |         }
  57 |         await this.page.screenshot({ path: path.join(screenshotsDir, `${filename}.png`) });
  58 |     }
  59 |
  60 |     async scrollToElement(selector) {
  61 |         const element = await this.page.locator(selector);
> 62 |         await element.scrollIntoViewIfNeeded();
     |                       ^ TimeoutError: locator.scrollIntoViewIfNeeded: Timeout 10000ms exceeded.
  63 |     }
  64 |
  65 |     async isTextVisible(text, options = {}) {
  66 |         const { timeout = 5000 } = options;
  67 |         try {
  68 |             await this.page.waitForFunction(
  69 |                 (textToFind) => {
  70 |                     const elements = Array.from(document.querySelectorAll('*'));
  71 |                     return elements.some(el => el.textContent && el.textContent.trim() === textToFind && el.offsetParent !== null);
  72 |                 },
  73 |                 text,
  74 |                 { timeout }
  75 |             );
  76 |             return true;
  77 |         } catch (error) {
  78 |             // console.log(`Text "${text}" not visible within ${timeout}ms. Error: ${error.message}`);
  79 |             return false;
  80 |         }
  81 |     }
  82 |
  83 |     async acceptCookiesIfPresent(cookieButtonSelector = '#cookie_stop') {
  84 |         try {
  85 |             const cookieButton = this.page.locator(cookieButtonSelector);
  86 |             if (await cookieButton.isVisible({ timeout: 2000 })) {
  87 |                 await cookieButton.click();
  88 |                 // console.log('Cookie consent accepted.');
  89 |             }
  90 |         } catch (error) {
  91 |             // console.log('Cookie consent banner not found or not visible, or already handled.');
  92 |         }
  93 |     }
  94 | }
  95 |
  96 | module.exports = { Utils };
  97 |
```