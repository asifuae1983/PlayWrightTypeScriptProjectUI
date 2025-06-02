# Test info

- Name: Test Case 3: Login User with incorrect email and password >> should display an error message for incorrect login credentials
- Location: /app/tests/loginUserIncorrectCredentials.spec.js:24:5

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
   1 | // tests/loginUserIncorrectCredentials.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const fs = require('fs');
   4 | const path = require('path');
   5 | const { HomePage } = require('../pages/HomePage');
   6 | const { LoginPage } = require('../pages/LoginPage');
   7 | const { Utils } = require('../utils/utils');
   8 |
   9 | // Load test data
  10 | const usersTestDataPath = path.join(__dirname, '..', 'test-data', 'users.json');
  11 | const usersTestData = JSON.parse(fs.readFileSync(usersTestDataPath, 'utf8'));
  12 | const incorrectLoginData = usersTestData.loginUserIncorrect;
  13 |
  14 | test.describe('Test Case 3: Login User with incorrect email and password', () => {
  15 |     let homePage;
  16 |     let loginPage;
  17 |
  18 |     test.beforeEach(async ({ page }) => {
  19 |         homePage = new HomePage(page);
  20 |         loginPage = new LoginPage(page);
  21 |         await homePage.goto();
  22 |     });
  23 |
> 24 |     test('should display an error message for incorrect login credentials', async ({ page }) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
  25 |         await expect(page).toHaveURL('https://automationexercise.com/');
  26 |         expect(await homePage.isSliderVisible()).toBe(true);
  27 |
  28 |         await homePage.clickSignupLoginLink();
  29 |         expect(await loginPage.isLoginFormVisible()).toBe(true);
  30 |         await expect(page.locator(loginPage.loginToYourAccountText)).toBeVisible();
  31 |
  32 |         // Use a dynamically generated email with the prefix from JSON, and password from JSON
  33 |         const incorrectEmail = Utils.generateRandomEmail(incorrectLoginData.emailPrefix);
  34 |         const incorrectPassword = incorrectLoginData.password;
  35 |         await loginPage.login(incorrectEmail, incorrectPassword);
  36 |
  37 |         await expect(page.locator(loginPage.loginError)).toBeVisible();
  38 |         const errorMessage = await loginPage.getLoginErrorMessage();
  39 |         // The error message could be "Your email or password is Cincorrect!" or similar
  40 |         expect(errorMessage.toLowerCase()).toContain('incorrect');
  41 |     });
  42 | });
  43 |
```