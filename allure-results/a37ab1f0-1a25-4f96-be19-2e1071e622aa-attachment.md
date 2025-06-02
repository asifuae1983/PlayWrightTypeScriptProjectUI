# Test info

- Name: Test Case 4: Logout User >> should login, logout, and verify redirection to login page
- Location: /app/tests/logoutUser.spec.js:92:5

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
   1 | // tests/logoutUser.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const fs = require('fs');
   4 | const path = require('path');
   5 | const { HomePage } = require('../pages/HomePage');
   6 | const { LoginPage } = require('../pages/LoginPage');
   7 | const { SignupPage } = require('../pages/SignupPage');
   8 | const { Utils } = require('../utils/utils');
   9 |
   10 | // Load test data - using 'loginUserCorrect' as we need a valid user to login then logout
   11 | const usersTestDataPath = path.join(__dirname, '..', 'test-data', 'users.json');
   12 | const usersTestData = JSON.parse(fs.readFileSync(usersTestDataPath, 'utf8'));
   13 | const userData = usersTestData.loginUserCorrect; // Using data that can successfully register and login
   14 |
   15 | // Generate unique email and name for this test run
   16 | const userEmail = Utils.generateRandomEmail(userData.emailPrefix + "logout"); // Make prefix unique for this test
   17 | const userName = Utils.generateRandomName(userData.namePrefix + "Logout"); // Make prefix unique
   18 | const userPassword = userData.password;
   19 |
   20 | test.describe('Test Case 4: Logout User', () => {
   21 |     let homePage;
   22 |     let loginPage;
   23 |     let signupPage;
   24 |
   25 |     test.beforeAll(async ({ browser }) => {
   26 |         const page = await browser.newPage();
   27 |         const tempHomePage = new HomePage(page);
   28 |         const tempLoginPage = new LoginPage(page);
   29 |         const tempSignupPage = new SignupPage(page);
   30 |
   31 |         await tempHomePage.goto();
   32 |         await tempHomePage.clickSignupLoginLink();
   33 |         await tempLoginPage.signup(userName, userEmail);
   34 |
   35 |         await tempSignupPage.fillAccountInformation(
   36 |             userData.title || 'Mr',
   37 |             userPassword,
   38 |             userData.dobDay,
   39 |             userData.dobMonth,
   40 |             userData.dobYear,
   41 |             true,
   42 |             true
   43 |         );
   44 |         await tempSignupPage.fillAddressInformation(
   45 |             userName,
   46 |             userData.lastName,
   47 |             userData.company,
   48 |             userData.address1,
   49 |             userData.address2 || '',
   50 |             userData.country,
   51 |             userData.state,
   52 |             userData.city,
   53 |             userData.zipcode,
   54 |             userData.mobileNumber
   55 |         );
   56 |         await tempSignupPage.clickCreateAccountButton();
   57 |         await expect(tempSignupPage.accountCreatedText).toBeVisible();
   58 |         await tempSignupPage.clickContinueButton();
   59 |
   60 |         // Ad handling and ensuring login before closing the setup page
   61 |         if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
   62 |             await page.evaluate(() => {
   63 |                 const ad = document.getElementById('ad_position_box');
   64 |                 if (ad) ad.remove();
   65 |             });
   66 |         }
   67 |         try {
   68 |             await page.waitForSelector(`li a:has-text("Logged in as ${userName}")`, { timeout: 10000 });
   69 |         } catch (e) {
   70 |             console.log("'Logged in as' not visible after registration for logout test (beforeAll), reloading.");
   71 |             await page.reload({ waitUntil: 'networkidle' });
   72 |             if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
   73 |                 await page.evaluate(() => {
   74 |                     const ad = document.getElementById('ad_position_box');
   75 |                     if (ad) ad.remove();
   76 |                 });
   77 |             }
   78 |             await page.waitForSelector(`li a:has-text("Logged in as ${userName}")`, { timeout: 15000 });
   79 |         }
   80 |         // We don't logout here; the test itself will log in and then log out.
   81 |         // We just ensure the user is created and was logged in.
   82 |         await page.close();
   83 |     });
   84 |
   85 |     test.beforeEach(async ({ page }) => {
   86 |         homePage = new HomePage(page);
   87 |         loginPage = new LoginPage(page);
   88 |         // signupPage = new SignupPage(page); // Not usually needed for the actual logout test logic
   89 |         await homePage.goto();
   90 |     });
   91 |
>  92 |     test('should login, logout, and verify redirection to login page', async ({ page }) => {
      |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
   93 |         await expect(page).toHaveURL('https://automationexercise.com/');
   94 |         expect(await homePage.isSliderVisible()).toBe(true);
   95 |
   96 |         await homePage.clickSignupLoginLink();
   97 |         expect(await loginPage.isLoginFormVisible()).toBe(true);
   98 |
   99 |         await loginPage.login(userEmail, userPassword); // Login with the pre-registered user
  100 |
  101 |         if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
  102 |             await page.evaluate(() => {
  103 |                 const ad = document.getElementById('ad_position_box');
  104 |                 if (ad) ad.remove();
  105 |             });
  106 |         }
  107 |         try {
  108 |             await page.waitForSelector(`li a:has-text("Logged in as ${userName}")`, { timeout: 10000 });
  109 |         } catch (e) {
  110 |             console.log("'Logged in as' not visible after login for logout test, reloading.");
  111 |             await page.reload({ waitUntil: 'networkidle' });
  112 |             if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
  113 |                 await page.evaluate(() => {
  114 |                     const ad = document.getElementById('ad_position_box');
  115 |                     if (ad) ad.remove();
  116 |                 });
  117 |             }
  118 |             await page.waitForSelector(`li a:has-text("Logged in as ${userName}")`, { timeout: 15000 });
  119 |         }
  120 |         await expect(page.locator(`li a:has-text("Logged in as ${userName}")`)).toBeVisible();
  121 |
  122 |         const logoutLink = 'a[href="/logout"]';
  123 |         if (await page.locator('#ad_position_box').isVisible({timeout: 5000})) {
  124 |             await page.evaluate(() => {
  125 |                 const ad = document.getElementById('ad_position_box');
  126 |                 if (ad) ad.remove();
  127 |             });
  128 |         }
  129 |         await page.locator(logoutLink).click();
  130 |
  131 |         await expect(page).toHaveURL('https://automationexercise.com/login');
  132 |         expect(await loginPage.isLoginFormVisible()).toBe(true);
  133 |     });
  134 | });
  135 |
```