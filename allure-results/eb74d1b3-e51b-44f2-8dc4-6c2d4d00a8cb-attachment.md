# Test info

- Name: Test Case 10: Verify Subscription in home page >> should subscribe with an email and verify success message
- Location: /app/tests/verifyHomepageSubscription.spec.js:20:5

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
   1 | // tests/verifyHomepageSubscription.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const { HomePage } = require('../pages/HomePage');
   4 | const { Utils } = require('../utils/utils');
   5 |
   6 | // Load test data for homepage subscription
   7 | const formData = Utils.loadTestData('formData.json');
   8 | const subscriptionData = formData.homepageSubscription;
   9 |
  10 | test.describe('Test Case 10: Verify Subscription in home page', () => {
  11 |     let homePage;
  12 |     let utils;
  13 |
  14 |     test.beforeEach(async ({ page }) => {
  15 |         homePage = new HomePage(page);
  16 |         utils = new Utils(page); // For page-specific utils like scrollToElement
  17 |         await homePage.goto();
  18 |     });
  19 |
> 20 |     test('should subscribe with an email and verify success message', async ({ page }) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
  21 |         // 1. Launch browser and navigate to URL (handled by beforeEach)
  22 |         // 2. Verify that home page is visible successfully
  23 |         await expect(page).toHaveURL('https://automationexercise.com/');
  24 |         expect(await homePage.isSliderVisible()).toBe(true);
  25 |
  26 |         // 3. Scroll down to footer
  27 |         // Assuming the subscription section is in the footer.
  28 |         // We can scroll to the subscription email input directly or a known footer element.
  29 |         await utils.scrollToElement(homePage.subscriptionEmailInput);
  30 |         // Alternatively, page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  31 |
  32 |         // 4. Verify text 'SUBSCRIPTION'
  33 |         await expect(page.locator(homePage.subscriptionText)).toBeVisible();
  34 |
  35 |         // 5. Enter email address in input and click arrow button
  36 |         const emailToSubscribe = Utils.generateRandomEmail(subscriptionData.emailPrefix);
  37 |         await homePage.enterSubscriptionEmail(emailToSubscribe);
  38 |         await homePage.clickSubscriptionButton();
  39 |
  40 |         // 6. Verify success message 'You have been successfully subscribed!' is visible
  41 |         // The success message selector might need adjustment if not covered by homePage.successAlert
  42 |         // For now, assuming homePage.successAlert ('#success-subscribe') is correct.
  43 |         // We will use the expected message from JSON.
  44 |
  45 |         // Wait for the success message to appear
  46 |         const successMessageElement = page.locator(homePage.successAlert);
  47 |         await successMessageElement.waitFor({ state: 'visible', timeout: 10000 });
  48 |
  49 |         const actualSuccessMessage = await homePage.getSuccessSubscriptionMessage();
  50 |         expect(actualSuccessMessage.trim()).toBe(subscriptionData.expectedSuccessMessage);
  51 |         await expect(successMessageElement).toBeVisible();
  52 |     });
  53 | });
  54 |
```