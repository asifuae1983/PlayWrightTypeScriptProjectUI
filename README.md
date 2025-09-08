# Automation Exercise Test Suite

This repository contains an automated test suite for [https://automationexercise.com](https://automationexercise.com) using Playwright with JavaScript.

## Test Environment Configuration

This test suite supports multiple environments such as **development (dev)**, **quality assurance (qa)**, and **production (prod)**. The environment-specific settings are managed via the following files:

- `envConfig.ts`: Contains environment-specific variables such as base URLs, credentials, and other configuration values.
- `playwright.config.ts`: Configures Playwright test runner settings, including environment selection and test options.

### Selecting the Environment

You can specify the environment when running tests by setting an environment variable or passing a parameter, depending on your setup. For example:

```bash
# Run tests against the QA environment
set ENV=qa
npx playwright test
```

# Automation Exercise Test Suite

This repository contains an automated test suite for [https://automationexercise.com](https://automationexercise.com) using Playwright with TypeScript, following industry best practices.

## 🏗️ Architecture & Best Practices

This test suite implements industry-standard practices for maintainable and scalable test automation:

### ✅ **Page Object Model (POM)**
- **Actions in Page Objects**: All interactions (clicks, navigation, form filling) are encapsulated in page object methods
- **Validations in Tests**: All assertions and expectations remain in test files for clarity
- **Separation of Concerns**: Clean separation between test logic and page interactions

### 🔧 **Helper Methods & Utilities**
- **UserSetupHelper**: Centralized user data generation and management
- **Utils**: Common utility functions for data loading and browser interactions
- **Reusable Components**: Modular design for easy maintenance and updates

### 📋 **Test Structure**
- **Test Steps**: Uses `test.step()` for clear test organization and better reporting
- **Atomic Tests**: Each test is independent and can run in isolation
- **Data-Driven**: External JSON files for test data management

### 🛡️ **Reliability Features**
- **Modal Management**: Automatic handling of blocking modals and popups
- **Wait Strategies**: Strategic waits for dynamic content and API responses
- **Error Handling**: Comprehensive error handling with detailed logging
- **Retry Logic**: Built-in retry mechanisms for flaky interactions

### 📊 **Reporting & Debugging**
- **Allure Integration**: Enhanced reporting with test steps and attachments
- **Detailed Logging**: Comprehensive console logging for debugging
- **Screenshots**: Automatic screenshots on failures
- **Test Artifacts**: Trace files and network logs for troubleshooting

## 📁 Project Structure

```
├── tests/                          # Test specification files (.spec.ts/.spec.js)
│   ├── registerUser.spec.ts
│   ├── loginUserCorrectCredentials.spec.ts
│   ├── addProductsInCart.spec.ts
│   ├── ... (other test cases)
├── pages/                          # Page Object Model files
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── ... (other page objects)
├── helpers/                        # Helper classes for workflows
│   ├── UserSetupHelper.ts
│   └── ...
├── utils/                          # Utility functions and common operations
│   ├── utils.ts
│   └── ...
├── types/                          # TypeScript type definitions
│   ├── testData.ts
│   └── ...
├── test-data/                      # External test data files
│   ├── users.json
│   ├── products.json
│   └── ...
├── envConfig.ts                    # Environment-specific variables
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies and scripts
└── README.md                       # Project documentation
```

---

## 🧪 Test Execution Steps

1. **Install Dependencies:**  
   `npm install`

2. **Install Playwright Browsers:**  
   `npx playwright install`

3. **Set Environment (Optional):**  
   On Mac/Linux:  
   `export ENV=qa`  
   `npx playwright test`  
   On Windows (cmd):  
   `set ENV=qa`  
   `npx playwright test`

4. **Run All Tests:**  
   `npx playwright test`

5. **Run a Specific Test File:**  
   `npx playwright test tests/registerUser.spec.ts`

6. **Run Tests in Headed Mode (see browser UI):**  
   `npx playwright test --headed`

7. **Run Tests on a Specific Browser:**  
   `npx playwright test --project=chromium`  
   `npx playwright test --project=firefox`  
   `npx playwright test --project=webkit`

8. **Debug Tests with Playwright Inspector:**  
   `npx playwright test --debug`

9. **View HTML Report:**  
   `npx playwright show-report`

---

**Tip:**  
For more advanced options (parallelism, retries, environment selection, etc.), see `playwright.config.ts` and the Playwright documentation.

## Test Cases

Below is a detailed list of all implemented test cases, including their script files, priority, objectives, detailed steps, and Page Objects used.

---
### Test Case 1: Register User

*   **Script File:** `registerUser.spec.ts`
*   **Priority:** Critical
*   **Objective:** Validates the complete user lifecycle: registration, login verification, and account deletion.

#### What happens in this test?
- Generates unique user data using `UserSetupHelper`.
- Navigates to Signup/Login, fills registration, submits, and verifies account creation.
- Logs in with new credentials, verifies login.
- Deletes the account and verifies cleanup.
- Uses `test.step()` for clear reporting and robust modal/error handling.

#### Page Objects Used
- `HomePage`, `LoginPage`, `SignupPage`, `UserSetupHelper`, `Utils`

---

### Test Case 2: Login User with correct email and password

*   **Script File:** `loginUserCorrectCredentials.spec.ts`
*   **Priority:** Critical
*   **Objective:** Validates login with correct credentials and account deletion.

#### What happens in this test?
- Registers a user via `UserSetupHelper`.
- Navigates to login, enters correct credentials, submits, and verifies login.
- Deletes the account and verifies cleanup.
- Uses `test.step()` for clarity and error handling.

#### Page Objects Used
- `HomePage`, `LoginPage`, `UserSetupHelper`

---

### Test Case 3: Login User with incorrect email and password

*   **Script File:** `loginUserIncorrectCredentials.spec.js`
*   **Priority:** High
*   **Objective:** Ensures error message is shown for incorrect login.

#### What happens in this test?
- Navigates to login page.
- Enters random/incorrect credentials.
- Submits and verifies error message.
- Uses random data generation for negative scenario.

#### Page Objects Used
- `HomePage`, `LoginPage`, `Utils`

---

### Test Case 4: Logout User

*   **Script File:** `logoutUser.spec.js`
*   **Priority:** High
*   **Objective:** Validates logout and redirection to login page.

#### What happens in this test?
- Registers a user, logs in.
- Clicks logout, verifies redirection to login.
- Ensures session cleanup.

#### Page Objects Used
- `HomePage`, `LoginPage`, `SignupPage`, `Utils`

---

### Test Case 5: Register User with existing email

*   **Script File:** `registerUserExistingEmail.spec.js`
*   **Priority:** High
*   **Objective:** Ensures error message for duplicate registration.

#### What happens in this test?
- Registers a user.
- Attempts to register again with same email.
- Verifies duplicate email error message.

#### Page Objects Used
- `HomePage`, `LoginPage`, `SignupPage`, `Utils`

---

### Test Case 6: Contact Us Form

*   **Script File:** `contactUsForm.spec.js`
*   **Priority:** Medium
*   **Objective:** Tests Contact Us form submission, file upload, and success message.

#### What happens in this test?
- Creates dummy file for upload.
- Fills and submits contact form, uploads file.
- Handles alert, verifies success message, returns to home.
- Cleans up dummy file.

#### Page Objects Used
- `HomePage`, `ContactUsPage`, `Utils`, Node.js `fs`/`path`

---

### Test Case 7: Verify Test Cases Page

*   **Script File:** `verifyTestCasesPage.spec.js`
*   **Priority:** Low
*   **Objective:** Checks navigation to Test Cases page and verifies content.

#### What happens in this test?
- Navigates to Test Cases page.
- Verifies page title and (optionally) test case count.

#### Page Objects Used
- `HomePage`, `TestCasesPage`

---

### Test Case 8: Verify All Products and product detail page

*   **Script File:** `verifyAllProductsAndProductDetailPage.spec.js`
*   **Priority:** High
*   **Objective:** Checks navigation to products page, product listing, and detail view.

#### What happens in this test?
- Navigates to All Products.
- Verifies product list, clicks View Product, checks detail info.

#### Page Objects Used
- `HomePage`, `ProductsPage`

---

### Test Case 9: Search Product

*   **Script File:** `searchProduct.spec.js`
*   **Priority:** High
*   **Objective:** Validates product search and search results.

#### What happens in this test?
- Navigates to Products.
- Searches for a product, verifies results and expected product presence.

#### Page Objects Used
- `HomePage`, `ProductsPage`, `Utils`

---

### Test Case 10: Verify Subscription in home page

*   **Script File:** `verifyHomepageSubscription.spec.js`
*   **Priority:** Medium
*   **Objective:** Validates email subscription on home page.

#### What happens in this test?
- Scrolls to footer, enters random email, submits.
- Verifies subscription success message.

#### Page Objects Used
- `HomePage`, `Utils`

---

### Test Case 11: Verify Subscription in Cart page

*   **Script File:** `verifyCartPageSubscription.spec.js`
*   **Priority:** Medium
*   **Objective:** Validates email subscription on cart page.

#### What happens in this test?
- Navigates to Cart, scrolls to footer, enters random email, submits.
- Verifies subscription success message.

#### Page Objects Used
- `HomePage`, `CartPage`, `Utils`

---

### Test Case 12: Add Products in Cart

*   **Script File:** `addProductsInCart.spec.ts`
*   **Priority:** Critical
*   **Objective:** Tests adding multiple products to cart and verifies details.

#### What happens in this test?
- Loads product data from JSON.
- Adds multiple products, manages modals.
- Navigates to cart, verifies product details.

#### Page Objects Used
- `HomePage`, `ProductsPage`, `CartPage`, test-data JSON

---

### Test Case 13: Verify Product quantity in Cart

*   **Script File:** `verifyProductQuantityInCart.spec.js`
*   **Priority:** High
*   **Objective:** Tests increasing product quantity and verifies in cart.

#### What happens in this test?
- Opens product detail, sets quantity, adds to cart.
- Verifies correct quantity in cart.

#### Page Objects Used
- `HomePage`, `ProductsPage`, `CartPage`

---

### Test Case 14: Place Order: Register while Checkout

*   **Script File:** `placeOrderRegisterWhileCheckout.spec.js`
*   **Priority:** Critical
*   **Objective:** Validates order placement with registration during checkout.

#### What happens in this test?
- Adds products, proceeds to checkout, registers user.
- Completes registration, logs in, completes order, enters payment, verifies success.
- Deletes account.

#### Page Objects Used
- `HomePage`, `ProductsPage`, `CartPage`, `LoginPage`, `SignupPage`, `CheckoutPage`, `PaymentPage`, `Utils`

---

### Test Case 15: Place Order: Register before Checkout

*   **Script File:** `placeOrderRegisterBeforeCheckout.spec.js`
*   **Priority:** Critical
*   **Objective:** Validates order placement after registering before adding to cart.

#### What happens in this test?
- Registers user, logs in, adds products, checks out, completes order, enters payment, verifies success.
- Deletes account.

#### Page Objects Used
- `HomePage`, `LoginPage`, `SignupPage`, `ProductsPage`, `CartPage`, `CheckoutPage`, `PaymentPage`, `Utils`

---

### Test Case 16: Place Order: Login before Checkout

*   **Script File:** `placeOrderLoginBeforeCheckout.spec.js`
*   **Priority:** Critical
*   **Objective:** Validates order placement for existing user who logs in before shopping.

#### What happens in this test?
- Registers user, logs out, logs in, adds products, checks out, completes order, enters payment, verifies success.
- Deletes account.

#### Page Objects Used
- `HomePage`, `LoginPage`, `SignupPage`, `ProductsPage`, `CartPage`, `CheckoutPage`, `PaymentPage`, `Utils`

---

### Test Case 17: Remove Products From Cart

*   **Script File:** `removeProductsFromCart.spec.js`
*   **Priority:** High
*   **Objective:** Validates removal of products from cart.

#### What happens in this test?
- Adds multiple products to cart.
- Removes one, verifies only the other remains.

#### Page Objects Used
- `HomePage`, `ProductsPage`, `CartPage`

---

### Test Case 18: View Category Products

*   **Script File:** `viewCategoryProducts.spec.js`
*   **Priority:** Medium
*   **Objective:** Verifies category and sub-category navigation.

#### What happens in this test?
- Navigates categories, clicks sub-categories, verifies correct product lists.

#### Page Objects Used
- `HomePage`, `ProductsPage`

---

### Test Case 19: View & Cart Brand Products

*   **Script File:** `viewCartBrandProducts.spec.js`
*   **Priority:** Medium
*   **Objective:** Verifies brand navigation and product display.

#### What happens in this test?
- Navigates to brands, clicks brand links, verifies product lists.

#### Page Objects Used
- `HomePage`, `ProductsPage`

---

### Test Case 20: Search Products and Verify Cart After Login

*   **Script File:** `searchProductsAndVerifyCartAfterLogin.spec.js`
*   **Priority:** High
*   **Objective:** Verifies cart persistence after login.

#### What happens in this test?
- Searches and adds products to cart as guest.
- Logs in, verifies cart contents persist.

#### Page Objects Used
- `HomePage`, `ProductsPage`, `CartPage`, `LoginPage`, `SignupPage`, `Utils`

---

### Test Case 21: Add review on product

*   **Script File:** `addReviewOnProduct.spec.js`
*   **Priority:** Medium
*   **Objective:** Tests submitting a product review.

#### What happens in this test?
- Opens product detail, fills review form, submits, verifies success message.

#### Page Objects Used
- `HomePage`, `ProductsPage`, `Utils`

---

### Test Case 22: Add to cart from Recommended items

*   **Script File:** `addRecommendedItemsToCart.spec.js`
*   **Priority:** Medium
*   **Objective:** Verifies adding recommended item to cart.

#### What happens in this test?
- Scrolls to recommended section, adds item, verifies in cart.

#### Page Objects Used
- `HomePage`, `CartPage`, `Utils`

---

### Test Case 23: Verify address details in checkout page

*   **Script File:** `verifyAddressDetailsInCheckoutPage.spec.js`
*   **Priority:** High
*   **Objective:** Ensures checkout addresses match registration.

#### What happens in this test?
- Registers user, adds product, checks out.
- Compares displayed addresses with registration data.

#### Page Objects Used
- `HomePage`, `LoginPage`, `SignupPage`, `ProductsPage`, `CartPage`, `CheckoutPage`, `Utils`

---

### Test Case 24: Download Invoice after purchase order

*   **Script File:** `downloadInvoiceAfterPurchase.spec.js`
*   **Priority:** Critical
*   **Objective:** Verifies invoice download after purchase.

#### What happens in this test?
- Registers user, completes order, triggers invoice download, verifies file.

#### Page Objects Used
- `HomePage`, `LoginPage`, `SignupPage`, `ProductsPage`, `CartPage`, `CheckoutPage`, `PaymentPage`, `Utils`, Playwright download API

---

### Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality

*   **Script File:** `verifyScrollUpUsingArrow.spec.js`
*   **Priority:** Low
*   **Objective:** Tests scroll-to-top arrow functionality.

#### What happens in this test?
- Scrolls to bottom, clicks scroll-up arrow, verifies top content is visible.

#### Page Objects Used
- `HomePage`

---

### Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality

*   **Script File:** `verifyScrollUpWithoutArrow.spec.js`
*   **Priority:** Low
*   **Objective:** Tests scroll using browser native scroll.

#### What happens in this test?
- Scrolls to bottom and then to top using script, verifies top content is visible.

#### Page Objects Used
- `HomePage`


