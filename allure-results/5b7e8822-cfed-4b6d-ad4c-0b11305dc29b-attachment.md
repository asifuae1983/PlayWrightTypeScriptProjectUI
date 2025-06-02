# Test info

- Name: Test Case 15: Place Order: Register before Checkout >> should register, login, add product, and complete order
- Location: /app/tests/placeOrderRegisterBeforeCheckout.spec.js:35:5

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
   1 | // tests/placeOrderRegisterBeforeCheckout.spec.js
   2 | const { test, expect } = require('@playwright/test');
   3 | const { HomePage } = require('../pages/HomePage');
   4 | const { LoginPage } = require('../pages/LoginPage');
   5 | const { SignupPage } = require('../pages/SignupPage');
   6 | const { ProductsPage } = require('../pages/ProductsPage');
   7 | const { CartPage } = require('../pages/CartPage');
   8 | const { CheckoutPage } = require('../pages/CheckoutPage');
   9 | const { PaymentPage } = require('../pages/PaymentPage');
   10 | const { Utils } = require('../utils/utils');
   11 |
   12 | // Load Test Data
   13 | const users = Utils.loadTestData('users.json');
   14 | const productsData = Utils.loadTestData('products.json');
   15 | const paymentData = Utils.loadTestData('formData.json').paymentDetails;
   16 |
   17 | const newUser = users.registerBeforeCheckoutUser;
   18 | const productToOrder = productsData.addProductsToCart.products[1]; // Using the second product for variety
   19 |
   20 | test.describe('Test Case 15: Place Order: Register before Checkout', () => {
   21 |     let homePage, loginPage, signupPage, productsPage, cartPage, checkoutPage, paymentPage;
   22 |     const randomEmail = Utils.generateRandomEmail(newUser.emailPrefix);
   23 |     const randomName = Utils.generateRandomName(newUser.namePrefix); // This will be the logged-in username
   24 |
   25 |     test.beforeEach(async ({ page }) => {
   26 |         homePage = new HomePage(page);
   27 |         loginPage = new LoginPage(page);
   28 |         signupPage = new SignupPage(page);
   29 |         productsPage = new ProductsPage(page);
   30 |         cartPage = new CartPage(page);
   31 |         checkoutPage = new CheckoutPage(page);
   32 |         paymentPage = new PaymentPage(page);
   33 |     });
   34 |
>  35 |     test('should register, login, add product, and complete order', async ({ page }) => {
      |     ^ Error: browserType.launch: Executable doesn't exist at /home/swebot/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
   36 |         // 1. Launch browser and navigate to URL
   37 |         await homePage.goto();
   38 |         await expect(page).toHaveURL('https://automationexercise.com/');
   39 |
   40 |         // 2. Click on 'Signup / Login' button
   41 |         await homePage.clickSignupLoginLink();
   42 |
   43 |         // 3. Fill all details in Signup and create account
   44 |         await loginPage.signup(randomName, randomEmail);
   45 |         await signupPage.fillAccountInformation(
   46 |             newUser.title, newUser.password, newUser.dobDay, newUser.dobMonth, newUser.dobYear,
   47 |             newUser.newsletter, newUser.optin
   48 |         );
   49 |         await signupPage.fillAddressInformation(
   50 |             randomName, newUser.lastName, newUser.company, newUser.address1, newUser.address2,
   51 |             newUser.country, newUser.state, newUser.city, newUser.zipcode, newUser.mobileNumber
   52 |         );
   53 |         await signupPage.clickCreateAccountButton();
   54 |         await expect(signupPage.accountCreatedText).toBeVisible();
   55 |
   56 |         // 4. Verify 'ACCOUNT CREATED!' and click 'Continue' button
   57 |         await signupPage.clickContinueButton();
   58 |
   59 |         // 5. Verify 'Logged in as username' at top (with ad handling)
   60 |         if (await page.locator('#ad_position_box').isVisible({ timeout: 5000 })) {
   61 |             await page.evaluate(() => {
   62 |                 const ad = document.getElementById('ad_position_box');
   63 |                 if (ad) ad.remove();
   64 |             });
   65 |         }
   66 |         try {
   67 |             await page.waitForSelector(`li a:has-text("Logged in as ${randomName}")`, { timeout: 10000 });
   68 |         } catch (e) {
   69 |             await page.reload({ waitUntil: 'networkidle' });
   70 |             if (await page.locator('#ad_position_box').isVisible({ timeout: 5000 })) {
   71 |                  await page.evaluate(() => {
   72 |                     const ad = document.getElementById('ad_position_box');
   73 |                     if (ad) ad.remove();
   74 |                 });
   75 |             }
   76 |             await page.waitForSelector(`li a:has-text("Logged in as ${randomName}")`, { timeout: 15000 });
   77 |         }
   78 |         await expect(page.locator(`li a:has-text("Logged in as ${randomName}")`)).toBeVisible();
   79 |
   80 |         // 6. Add products to cart
   81 |         await homePage.clickProductsLink(); // Navigate to products page
   82 |         await productsPage.addProductToCartByName(productToOrder.name);
   83 |         await productsPage.clickContinueShopping(); // Or view cart link from modal
   84 |
   85 |         // 7. Click 'Cart' button
   86 |         await homePage.clickCartLink();
   87 |         await expect(page).toHaveURL(/.*view_cart/);
   88 |
   89 |         // 8. Verify Cart page is displayed
   90 |         expect(await cartPage.isShoppingCartVisible()).toBe(true);
   91 |
   92 |         // 9. Click Proceed To Checkout
   93 |         await cartPage.clickProceedToCheckout();
   94 |
   95 |         // 10. Verify Address Details and Review Your Order
   96 |         await expect(checkoutPage.addressDetailsText).toBeVisible();
   97 |         await expect(checkoutPage.reviewYourOrderText).toBeVisible();
   98 |         // Verify delivery address first name matches registered user's first name (randomName)
   99 |         const deliveryFirstName = await checkoutPage.getDeliveryAddressFirstName();
  100 |         expect(deliveryFirstName).toContain(randomName.replace("User", "")); // Assuming getDeliveryAddressFirstName returns "Mr. John Doe" or similar
  101 |
  102 |         const billingFirstName = await checkoutPage.getBillingAddressFirstName();
  103 |         expect(billingFirstName).toContain(randomName.replace("User", ""));
  104 |
  105 |
  106 |         // 11. Enter description in comment text area and click 'Place Order'
  107 |         await checkoutPage.enterComment("Order placed via automated test - Register before checkout.");
  108 |         await checkoutPage.clickPlaceOrder();
  109 |
  110 |         // 12. Enter payment details
  111 |         await paymentPage.fillPaymentDetails(
  112 |             paymentData.nameOnCard, // Or randomName if it should match account holder
  113 |             paymentData.cardNumber,
  114 |             paymentData.cvc,
  115 |             paymentData.expiryMonth,
  116 |             paymentData.expiryYear
  117 |         );
  118 |
  119 |         // 13. Click 'Pay and Confirm Order' button
  120 |         await paymentPage.clickPayAndConfirmOrder();
  121 |
  122 |         // 14. Verify success message 'Your order has been placed successfully!'
  123 |         await expect(paymentPage.orderPlacedText).toBeVisible({ timeout: 15000 });
  124 |
  125 |         // 15. Click 'Delete Account' button (Optional)
  126 |         await homePage.goto();
  127 |         if (await page.locator('#ad_position_box').isVisible({ timeout: 5000 })) {
  128 |             await page.evaluate(() => {
  129 |                 const ad = document.getElementById('ad_position_box');
  130 |                 if (ad) ad.remove();
  131 |             });
  132 |         }
  133 |         await page.locator('a[href="/delete_account"]').click();
  134 |         await expect(page.locator('h2[data-qa="account-deleted"]')).toBeVisible({ timeout: 10000 });
  135 |         await page.locator('a[data-qa="continue-button"]').click();
```