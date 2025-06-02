# Test info

- Name: Test Case 2: Login User with correct email and password >> should login with correct credentials and then delete account
- Location: /app/tests/loginUserCorrectCredentials.spec.js:93:5

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
   1 | // tests/loginUserCorrectCredentials.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const fs = require('fs');
   4 | const path = require('path');
   5 | const { HomePage } = require('../pages/HomePage');
   6 | const { LoginPage } = require('../pages/LoginPage');
   7 | const { SignupPage } = require('../pages/SignupPage');
   8 | const { Utils } = require('../utils/utils');
   9 |
   10 | // Load test data
   11 | const usersTestDataPath = path.join(__dirname, '..', 'test-data', 'users.json');
   12 | const usersTestData = JSON.parse(fs.readFileSync(usersTestDataPath, 'utf8'));
   13 | const userData = usersTestData.loginUserCorrect; // Use the 'loginUserCorrect' block
   14 |
   15 | // Generate unique email and name for this test run based on prefixes from JSON
   16 | const userEmail = Utils.generateRandomEmail(userData.emailPrefix);
   17 | const userName = Utils.generateRandomName(userData.namePrefix);
   18 | const userPassword = userData.password; // Password from JSON
   19 |
   20 | test.describe('Test Case 2: Login User with correct email and password', () => {
   21 |     let homePage; // Define here to be accessible in beforeAll if needed for setup page instances
   22 |     let loginPage; // Define here
   23 |     let signupPage; // Define here
   24 |
   25 |     test.beforeAll(async ({ browser }) => {
   26 |         const page = await browser.newPage(); // Create a new page context for setup
   27 |         const tempHomePage = new HomePage(page);
   28 |         const tempLoginPage = new LoginPage(page);
   29 |         const tempSignupPage = new SignupPage(page);
   30 |
   31 |         await tempHomePage.goto();
   32 |         await tempHomePage.clickSignupLoginLink();
   33 |         // Use the globally defined unique userName and userEmail for signup
   34 |         await tempLoginPage.signup(userName, userEmail);
   35 |
   36 |         await tempSignupPage.fillAccountInformation(
   37 |             userData.title || 'Mr', // Default title if not in JSON for this user
   38 |             userPassword, // Use the globally defined userPassword
   39 |             userData.dobDay,
   40 |             userData.dobMonth,
   41 |             userData.dobYear,
   42 |             false,
   43 |             false
   44 |         );
   45 |         await tempSignupPage.fillAddressInformation(
   46 |             userName, // Use the generated name
   47 |             userData.lastName,
   48 |             userData.company,
   49 |             userData.address1,
   50 |             userData.address2 || '', // Optional address2
   51 |             userData.country,
   52 |             userData.state,
   53 |             userData.city,
   54 |             userData.zipcode,
   55 |             userData.mobileNumber
   56 |         );
   57 |         await tempSignupPage.clickCreateAccountButton();
   58 |         await expect(tempSignupPage.accountCreatedText).toBeVisible();
   59 |         await tempSignupPage.clickContinueButton();
   60 |
   61 |         if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
   62 |             await page.evaluate(() => {
   63 |                 const ad = document.getElementById('ad_position_box');
   64 |                 if (ad) ad.remove();
   65 |             });
   66 |         }
   67 |         try {
   68 |             await page.waitForSelector('a[href="/logout"]', { timeout: 10000 });
   69 |             await page.locator('a[href="/logout"]').click();
   70 |         } catch (e) {
   71 |             console.log("Logout link not immediately visible after registration/continue in beforeAll, reloading.");
   72 |             await page.reload({ waitUntil: 'networkidle' }); // Wait for network to be idle
   73 |              if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) { // Check for ad again after reload
   74 |                 await page.evaluate(() => {
   75 |                     const ad = document.getElementById('ad_position_box');
   76 |                     if (ad) ad.remove();
   77 |                 });
   78 |             }
   79 |             await page.waitForSelector('a[href="/logout"]', { timeout: 15000 });
   80 |             await page.locator('a[href="/logout"]').click();
   81 |         }
   82 |         await page.close();
   83 |     });
   84 |
   85 |     test.beforeEach(async ({ page }) => {
   86 |         // Re-assign page objects for the actual test context
   87 |         homePage = new HomePage(page);
   88 |         loginPage = new LoginPage(page);
   89 |         // signupPage is not typically needed in beforeEach for a login test, but defined if other tests in describe block need it
   90 |         await homePage.goto();
   91 |     });
   92 |
>  93 |     test('should login with correct credentials and then delete account', async ({ page }) => {
      |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
   94 |         await expect(page).toHaveURL('https://automationexercise.com/');
   95 |         expect(await homePage.isSliderVisible()).toBe(true);
   96 |
   97 |         await homePage.clickSignupLoginLink();
   98 |         expect(await loginPage.isLoginFormVisible()).toBe(true);
   99 |         await expect(page.locator(loginPage.loginToYourAccountText)).toBeVisible();
  100 |
  101 |         // Use the globally defined unique userEmail and userPassword for login
  102 |         await loginPage.login(userEmail, userPassword);
  103 |
  104 |         if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
  105 |             await page.evaluate(() => {
  106 |                 const ad = document.getElementById('ad_position_box');
  107 |                 if (ad) ad.remove();
  108 |             });
  109 |         }
  110 |         try {
  111 |             await page.waitForSelector(`li a:has-text("Logged in as ${userName}")`, { timeout: 10000 });
  112 |         } catch (e) {
  113 |             console.log("'Logged in as' not visible after login, attempting to refresh and check again.");
  114 |             await page.reload({ waitUntil: 'networkidle' });
  115 |              if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
  116 |                 await page.evaluate(() => {
  117 |                     const ad = document.getElementById('ad_position_box');
  118 |                     if (ad) ad.remove();
  119 |                 });
  120 |             }
  121 |             await page.waitForSelector(`li a:has-text("Logged in as ${userName}")`, { timeout: 15000 });
  122 |         }
  123 |         await expect(page.locator(`li a:has-text("Logged in as ${userName}")`)).toBeVisible();
  124 |
  125 |         const deleteAccountLink = 'a[href="/delete_account"]';
  126 |         if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
  127 |             await page.evaluate(() => {
  128 |                 const ad = document.getElementById('ad_position_box');
  129 |                 if (ad) ad.remove();
  130 |             });
  131 |         }
  132 |         await page.locator(deleteAccountLink).click();
  133 |
  134 |         const accountDeletedTextSelector = 'h2[data-qa="account-deleted"]';
  135 |         if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
  136 |              await page.evaluate(() => {
  137 |                 const ad = document.getElementById('ad_position_box');
  138 |                 if (ad) ad.remove();
  139 |             });
  140 |         }
  141 |         await expect(page.locator(accountDeletedTextSelector)).toBeVisible({ timeout: 10000 });
  142 |         const continueButtonAfterDeleteSelector = 'a[data-qa="continue-button"]';
  143 |         await page.locator(continueButtonAfterDeleteSelector).click();
  144 |
  145 |         await expect(page).toHaveURL('https://automationexercise.com/');
  146 |     });
  147 | });
  148 |
```