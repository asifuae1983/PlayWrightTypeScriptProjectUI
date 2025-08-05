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

## Test Cases

Below is a detailed list of all implemented test cases, including their script files, priority, objectives, detailed steps, and Page Objects used.

---
### Test Case 1: Register User

*   **Script File:** `registerUser.spec.ts`
*   **Priority:** Critical
*   **Objective:** Validates the complete user lifecycle including registration, login verification, and account deletion using helper methods and test steps.

*   **Test Structure:** Split into focused, atomic tests:
    1. **User Registration Test**: Creates new user account with generated data
    2. **Login Verification Test**: Validates login with registered credentials
    3. **Account Deletion Test**: Ensures proper account cleanup

*   **Implementation Details:**
    - Uses `UserSetupHelper` for consistent user data generation
    - Implements `test.step()` for clear test organization and reporting
    - Separates actions (page objects) from validations (test files)
    - Includes comprehensive error handling and modal management

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.ts`):
        *   `goto()`: Navigate to application base URL
        *   `verifyHomePage()`: Validate home page visibility
        *   `clickSignupLoginLink()`: Navigate to Signup/Login page
        *   `isLoggedInAsVisible(username)`: Verify user login status
        *   `performAccountDeletion()`: Complete account deletion workflow
    *   `LoginPage` (`pages/LoginPage.ts`):
        *   `isSignupFormVisible()`: Verify signup form presence
        *   `signup(name, email)`: Handle initial signup form submission
        *   `login(email, password)`: Handle user login process
    *   `SignupPage` (`pages/SignupPage.ts`):
        *   `isAccountInfoTextVisible()`: Verify account information section
        *   `fillAccountInformation(userData)`: Complete account details form
        *   `fillAddressInformation(userData)`: Complete address details form
        *   `clickCreateAccountButton()`: Submit registration form
        *   `isAccountCreatedVisible()`: Verify account creation success
        *   `clickContinueButton()`: Continue after account creation
    *   `UserSetupHelper` (`helpers/UserSetupHelper.ts`):
        *   `generateUserData()`: Create consistent test user data
        *   `createCompleteUser()`: End-to-end user creation workflow
        *   `clickCreateAccountButton()`: To submit the registration form.
        *   `isAccountCreatedVisible()`: To verify the 'ACCOUNT CREATED!' message.
        *   `clickContinueButton()`: To proceed after account creation.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   Used for generating random user data (name, email) and loading static test data if needed.

---
### Test Case 2: Login User with correct email and password

*   **Script File:** `loginUserCorrectCredentials.spec.ts`
*   **Priority:** Critical
*   **Objective:** Validates login with correct credentials and subsequent account deletion using helper methods.

*   **Implementation Features:**
    - Pre-test user setup using `UserSetupHelper`
    - Test steps for clear reporting and debugging
    - Comprehensive error handling and modal management
    - Clean separation of actions and validations

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.ts`):
        *   `goto()`: Navigate to home page
        *   `verifyHomePage()`: Validate home page visibility
        *   `clickSignupLoginLink()`: Navigate to login page
        *   `isLoggedInAsVisible(username)`: Confirm successful login
        *   `performAccountDeletion()`: Complete account deletion workflow
    *   `LoginPage` (`pages/LoginPage.ts`):
        *   `isLoginFormVisible()`: Ensure login form presence
        *   `login(email, password)`: Handle login credentials and submission
    *   `UserSetupHelper` (`helpers/UserSetupHelper.ts`):
        *   `generateUserData()`: Create test user data
        *   `createCompleteUser()`: End-to-end user registration for test setup

---
### Test Case 3: Login User with incorrect email and password

*   **Script File:** `loginUserIncorrectCredentials.spec.js`
*   **Priority:** High
*   **Objective:** Ensures appropriate error messages are shown for incorrect login attempts.

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Verify the home page is visible.
    3.  Click on the 'Signup / Login' link.
    4.  Verify 'Login to your account' text is visible.
    5.  Enter an incorrect/random email address and password.
    6.  Click the 'login' button.
    7.  Verify the error message 'Your email or password is incorrect!' is visible.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `clickSignupLoginLink()`: To go to the login page.
    *   `LoginPage` (`pages/LoginPage.js`):
        *   `isLoginFormVisible()`: To ensure the login form is present.
        *   `login(email, password)`: To fill incorrect login credentials and submit.
        *   `getLoginErrorMessage()`: To retrieve and verify the error message.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   For generating random incorrect email.

---
### Test Case 4: Logout User

*   **Script File:** `logoutUser.spec.js`
*   **Priority:** High
*   **Objective:** Validates the user logout process and redirection to the login page.

*   **Detailed Steps Performed:**
    1.  (Before All Tests in file) Register a new user with unique credentials.
    2.  Navigate to the application's home page.
    3.  Verify the home page is visible.
    4.  Click on the 'Signup / Login' link.
    5.  Verify 'Login to your account' text is visible.
    6.  Enter the pre-registered correct email address and password.
    7.  Click the 'login' button.
    8.  Verify that 'Logged in as [username]' is visible.
    9.  Click the 'Logout' button.
    10. Verify that the user is navigated to the login page and 'Login to your account' is visible.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `clickSignupLoginLink()`: To go to the login page.
        *   `isLoggedInAsVisible(username)`: To confirm successful login.
        *   `clickLogoutLink()`: To log the user out.
    *   `LoginPage` (`pages/LoginPage.js`):
        *   `isLoginFormVisible()`: To ensure the login form is present (before login and after logout).
        *   `login(email, password)`: To fill login credentials and submit.
    *   `SignupPage` (`pages/SignupPage.js`) (Used in `beforeAll`):
        *   Methods for user registration to create the test user.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   For generating user data for initial registration.

---
### Test Case 5: Register User with existing email

*   **Script File:** `registerUserExistingEmail.spec.js`
*   **Priority:** High
*   **Objective:** Ensures an error message is displayed when attempting to register with an already used email.

*   **Detailed Steps Performed:**
    1.  (Before All Tests in file) Register a new user with a unique email.
    2.  Navigate to the application's home page.
    3.  Verify the home page is visible.
    4.  Click on the 'Signup / Login' link.
    5.  Verify 'New User Signup!' text is visible.
    6.  Enter a new name and the *already registered* email address.
    7.  Click the 'Signup' button.
    8.  Verify the error message 'Email Address already exist!' is visible.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `clickSignupLoginLink()`: To go to the signup page.
    *   `LoginPage` (`pages/LoginPage.js`):
        *   `isSignupFormVisible()`: To verify the 'New User Signup!' section.
        *   `signup(name, email)`: To attempt signup with an existing email.
        *   `getSignupErrorMessage()`: To retrieve and verify the error message.
    *   `SignupPage` (`pages/SignupPage.js`) (Used in `beforeAll`):
        *   Methods for user registration to create the initial user with the target email.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   For generating user data for initial registration.

---
### Test Case 6: Contact Us Form

*   **Script File:** `contactUsForm.spec.js`
*   **Priority:** Medium
*   **Objective:** Tests the submission of the 'Contact Us' form, including file upload and success message verification.

*   **Detailed Steps Performed:**
    1.  (Before All Tests in file) Create a dummy file for upload.
    2.  Navigate to the application's home page.
    3.  Verify the home page is visible.
    4.  Click on the 'Contact Us' link.
    5.  Verify 'GET IN TOUCH' text is visible.
    6.  Enter name, email, subject, and message into the form.
    7.  Upload the previously created dummy file.
    8.  Click the 'Submit' button.
    9.  Accept the browser alert confirmation.
    10. Verify the success message 'Success! Your details have been submitted successfully.' is visible.
    11. Click the 'Home' button (on the Contact Us page after submission).
    12. Verify the user is navigated back to the home page successfully.
    13. (After All Tests in file) Delete the dummy file.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `clickContactUsLink()`: To navigate to the Contact Us page.
    *   `ContactUsPage` (`pages/ContactUsPage.js`):
        *   `isGetInTouchVisible()`: To verify the 'GET IN TOUCH' section.
        *   `fillContactForm(name, email, subject, message)`: To fill the form fields.
        *   `uploadFile(filePath)`: To upload a file.
        *   `clickSubmitButton()`: To submit the form and handle the alert.
        *   `getSuccessMessage()`: To retrieve and verify the success message.
        *   `clickHomeButton()`: To return to the home page.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   For generating form data (name, email).
    *   Node.js `fs` and `path` modules: Used directly in the test for file creation and deletion.

---
### Test Case 7: Verify Test Cases Page

*   **Script File:** `verifyTestCasesPage.spec.js`
*   **Priority:** Low
*   **Objective:** Checks navigation to the 'Test Cases' page and verifies its content.

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Verify the home page is visible.
    3.  Click on the 'Test Cases' button/link in the header.
    4.  Verify the user is navigated to the test cases page (URL check).
    5.  Verify the text 'Test Cases' (or a similar title) is visible on the page.
    6.  Optionally, verify the number of test cases listed matches the expected count.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `clickTestCasesLink()`: To navigate to the Test Cases page.
    *   `TestCasesPage` (`pages/TestCasesPage.js`):
        *   `isTestCasesTextVisible()`: To verify the main title/header of the page.
        *   `getTestCasesCount()`: To count and verify the number of test cases displayed.

---
### Test Case 8: Verify All Products and product detail page

*   **Script File:** `verifyAllProductsAndProductDetailPage.spec.js`
*   **Priority:** High
*   **Objective:** Checks navigation to the products page, product listing, and viewing individual product details.

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Verify the home page is visible.
    3.  Click on the 'Products' link in the header.
    4.  Verify the user is navigated to the 'ALL PRODUCTS' page and this title is visible.
    5.  Verify that a list of products is visible.
    6.  Click on 'View Product' for a specific product (e.g., the first one).
    7.  Verify the user is landed on the product detail page (URL check).
    8.  Verify that product details are visible: product name, category, price, availability, condition, brand.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `clickProductsLink()`: To navigate to the All Products page.
    *   `ProductsPage` (`pages/ProductsPage.js`):
        *   `isAllProductsVisible()`: To verify the 'ALL PRODUCTS' title/section.
        *   `getProductCount()`: To ensure products are listed.
        *   `clickViewProduct(index)`: To navigate to a specific product's detail page.
        *   `getProductName()`: To get product name on detail page.
        *   `getProductCategory()`: To get product category on detail page.
        *   `getProductPriceDetail()`: To get product price on detail page.
        *   Verifying visibility of availability, condition, brand using direct locators or dedicated methods.

---
### Test Case 9: Search Product

*   **Script File:** `searchProduct.spec.js`
*   **Priority:** High
*   **Objective:** Validates the product search functionality and display of search results.

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Verify the home page is visible.
    3.  Click on the 'Products' link.
    4.  Verify the user is navigated to the 'ALL PRODUCTS' page.
    5.  Enter a product name (e.g., "Blue Top") in the search input.
    6.  Click the search button.
    7.  Verify 'SEARCHED PRODUCTS' text is visible.
    8.  Verify that all products related to the search term are visible in the results.
    9.  Verify a specific expected product is among the search results.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `clickProductsLink()`: To go to the All Products page.
    *   `ProductsPage` (`pages/ProductsPage.js`):
        *   `isAllProductsVisible()`: To verify navigation to the products page.
        *   `searchProduct(productName)`: To enter search term and submit.
        *   `isSearchedProductsVisible()`: To verify the 'SEARCHED PRODUCTS' section.
        *   `getDisplayedProductNames()` (or similar logic): To get and verify the names of products in search results.

---
### Test Case 10: Verify Subscription in home page

*   **Script File:** `verifyHomepageSubscription.spec.js`
*   **Priority:** Medium
*   **Objective:** Validates the email subscription functionality on the home page.

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Verify the home page is visible.
    3.  Scroll down to the footer of the page.
    4.  Verify the text 'SUBSCRIPTION' is visible.
    5.  Enter a randomly generated email address in the subscription input field.
    6.  Click the subscribe arrow/button.
    7.  Verify the success message 'You have been successfully subscribed!' is visible.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `scrollToBottom()` (or `utils.scrollToElement()`): To scroll to the footer.
        *   `isSubscriptionTextVisible()`: To verify the 'SUBSCRIPTION' text.
        *   `enterSubscriptionEmail(email)`: To input the email.
        *   `clickSubscriptionButton()`: To submit the subscription.
        *   `getSuccessSubscriptionMessage()`: To retrieve and verify the success message.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   For generating a random email address.

---
### Test Case 11: Verify Subscription in Cart page

*   **Script File:** `verifyCartPageSubscription.spec.js`
*   **Priority:** Medium
*   **Objective:** Validates the email subscription functionality on the cart page.

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Click the 'Cart' button/link in the header.
    3.  Verify the cart page is displayed.
    4.  Scroll down to the footer of the page.
    5.  Verify the text 'SUBSCRIPTION' is visible.
    6.  Enter a randomly generated email address in the subscription input field.
    7.  Click the subscribe arrow/button.
    8.  Verify the success message 'You have been successfully subscribed!' is visible.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `clickCartLink()`: To navigate to the Cart page.
    *   `CartPage` (`pages/CartPage.js`):
        *   `isShoppingCartVisible()`: To verify cart page is loaded.
        *   `scrollToSubscriptionSection()` (or `utils.scrollToElement()`): To scroll to the footer.
        *   `isSubscriptionTextVisible()`: To verify 'SUBSCRIPTION' text (may use its own selector or a shared one).
        *   `enterCartSubscriptionEmail(email)`: To input the email.
        *   `clickCartSubscriptionButton()`: To submit the subscription.
        *   `getCartSuccessSubscriptionMessage()`: To retrieve and verify the success message.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   For generating a random email address.

---
### Test Case 12: Add Products in Cart

*   **Script File:** `addProductsInCart.spec.ts`
*   **Priority:** Critical
*   **Objective:** Tests adding multiple products to cart and verifying their details, with robust modal management and error handling.

*   **Key Features & Improvements:**
    - **Data-Driven**: Uses external JSON file for product configuration
    - **Modal Management**: Automatically handles blocking modals after adding products
    - **Type Safety**: Full TypeScript implementation with proper interfaces
    - **Test Steps**: Clear step organization for better reporting and debugging
    - **Helper Methods**: Centralized cart operations for reusability

*   **Technical Implementation:**
    - `addMultipleProductsToCart()`: Robust method that adds products and manages modals
    - `navigateToCart()`: Includes modal closure to prevent UI blocking
    - `verifyProductsInCart()`: Comprehensive validation of product details
    - **Bug Fix**: Resolved modal blocking issue that prevented cart navigation

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.ts`):
        *   `goto()`: Navigate to home page
        *   `clickProductsLink()`: Navigate to products page
        *   `clickCartLink()`: Navigate to cart (with modal safety)
    *   `ProductsPage` (`pages/ProductsPage.ts`):
        *   `navigateToProductsPage()`: Complete navigation with validation
        *   `addMultipleProductsToCart(products)`: Add products with modal management
        *   `addProductToCartByName(name)`: Individual product addition
        *   `clickContinueShopping()`: Close modal after adding products
        *   `getProductPriceFromListing()`: Extract product pricing information
    *   `CartPage` (`pages/CartPage.ts`):
        *   `navigateToCart()`: Safe navigation with modal closure
        *   `closeModalIfOpen()`: Utility to handle any blocking modals
        *   `verifyProductsInCart()`: Comprehensive cart validation
        *   `verifyProductDetails()`: Individual product detail verification
    *   **Test Data**: `test-data/products.json` - External configuration for test products

---
### Test Case 13: Verify Product quantity in Cart

*   **Script File:** `verifyProductQuantityInCart.spec.js`
*   **Priority:** High
*   **Objective:** Tests increasing product quantity on the product detail page and verifying it in the cart.

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Click 'View Product' for a specific product on the home page (or navigate to Products page first).
    3.  Verify the product detail page is opened.
    4.  Increase the quantity input field to a specific value (e.g., 4).
    5.  Click the 'Add to cart' button.
    6.  Click the 'View Cart' button in the modal.
    7.  Verify the product is displayed in the cart page with the exact quantity specified.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `clickProductsLink()`: (If navigating to products page first)
    *   `ProductsPage` (`pages/ProductsPage.js`):
        *   `clickViewProduct(index)`: To go to product detail page.
        *   `getProductName()`: To verify correct product detail page.
        *   `setQuantity(quantity)`: To change the quantity value.
        *   `clickAddToCartOnDetailPage()`: To add the product to cart from its detail page.
        *   `viewCartLinkInModal` (selector) / `clickViewCartLinkInModal()`: To navigate to cart from modal.
    *   `CartPage` (`pages/CartPage.js`):
        *   `isShoppingCartVisible()`: To verify cart page.
        *   Method to get quantity for a specific product in cart (e.g., `getProductQuantityInCart(productName)`).

---
### Test Case 14: Place Order: Register while Checkout

*   **Script File:** `placeOrderRegisterWhileCheckout.spec.js`
*   **Priority:** Critical
*   **Objective:** Validates the order placement flow where user registration occurs during the checkout process.

*   **Detailed Steps Performed:**
    1.  Navigate to the home page.
    2.  Add products to the cart.
    3.  Click the 'Cart' button and verify the cart page.
    4.  Click 'Proceed To Checkout'.
    5.  In the checkout modal/page, click the 'Register / Login' button.
    6.  Enter name and email for signup. Click 'Signup'.
    7.  Fill all details in the Signup form (account info, address info) and create the account.
    8.  Verify 'ACCOUNT CREATED!' and click 'Continue'.
    9.  Verify 'Logged in as username' at the top.
    10. Click the 'Cart' button again.
    11. Click 'Proceed To Checkout' again.
    12. Verify Address Details and Review Your Order.
    13. Enter a description in the comment text area and click 'Place Order'.
    14. Enter payment details: Name on Card, Card Number, CVC, Expiration date.
    15. Click 'Pay and Confirm Order' button.
    16. Verify the success message 'Your order has been placed successfully!'.
    17. Click 'Delete Account' button.
    18. Verify 'ACCOUNT DELETED!' and click 'Continue'.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage`: Navigation, adding products (if done from homepage), cart navigation, verifying login status, account deletion.
    *   `ProductsPage`: Adding products to cart.
    *   `CartPage`: Verifying cart, proceeding to checkout, clicking 'Register / Login' link in checkout modal.
    *   `LoginPage`: Initial signup step (name and email).
    *   `SignupPage`: Full registration form, account creation.
    *   `CheckoutPage`: Verifying address, reviewing order, adding comments, placing order.
    *   `PaymentPage`: Filling payment details, confirming payment, verifying order success.
    *   `Utils` / `faker`: For generating user and payment data.

---
### Test Case 15: Place Order: Register before Checkout

*   **Script File:** `placeOrderRegisterBeforeCheckout.spec.js`
*   **Priority:** Critical
*   **Objective:** Validates order placement after registering and logging in before adding items to cart.

*   **Detailed Steps Performed:**
    1.  Navigate to the home page.
    2.  Click 'Signup / Login' button.
    3.  Enter name and email for signup. Click 'Signup'.
    4.  Fill all details in Signup and create account.
    5.  Verify 'ACCOUNT CREATED!' and click 'Continue'.
    6.  Verify 'Logged in as username' at top.
    7.  Add products to cart.
    8.  Click 'Cart' button and verify cart page.
    9.  Click 'Proceed To Checkout'.
    10. Verify Address Details and Review Your Order.
    11. Enter description in comment text area and click 'Place Order'.
    12. Enter payment details.
    13. Click 'Pay and Confirm Order'.
    14. Verify success message 'Your order has been placed successfully!'.
    15. Click 'Delete Account'.
    16. Verify 'ACCOUNT DELETED!' and click 'Continue'.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage`: Navigation, signup navigation, adding products, cart navigation, verifying login, account deletion.
    *   `LoginPage`: Initial signup step.
    *   `SignupPage`: Full registration.
    *   `ProductsPage`: Adding products.
    *   `CartPage`: Verifying cart, proceeding to checkout.
    *   `CheckoutPage`: Address verification, order review, comments, placing order.
    *   `PaymentPage`: Payment details, confirmation, success message verification.
    *   `Utils` / `faker`: For user and payment data.

---
### Test Case 16: Place Order: Login before Checkout

*   **Script File:** `placeOrderLoginBeforeCheckout.spec.js`
*   **Priority:** Critical
*   **Objective:** Validates order placement for an existing user who logs in before adding items to cart.

*   **Detailed Steps Performed:**
    1.  (Before All Tests in file) Register a new user and log out.
    2.  Navigate to the home page.
    3.  Click 'Signup / Login' button.
    4.  Enter email and password of the pre-registered user. Click 'Login'.
    5.  Verify 'Logged in as username' at top.
    6.  Add products to cart.
    7.  Click 'Cart' button and verify cart page.
    8.  Click 'Proceed To Checkout'.
    9.  Verify Address Details and Review Your Order.
    10. Enter description and click 'Place Order'.
    11. Enter payment details.
    12. Click 'Pay and Confirm Order'.
    13. Verify success message.
    14. Click 'Delete Account'.
    15. Verify 'ACCOUNT DELETED!' and click 'Continue'.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage`: Navigation, login navigation, adding products, cart navigation, verifying login, account deletion.
    *   `LoginPage`: User login.
    *   `SignupPage` (in `beforeAll`): To create the existing user.
    *   `ProductsPage`: Adding products.
    *   `CartPage`: Verifying cart, proceeding to checkout.
    *   `CheckoutPage`: Address/order review, comments, placing order.
    *   `PaymentPage`: Payment details, confirmation, success message.
    *   `Utils` / `faker`: For user and payment data.

---
### Test Case 17: Remove Products From Cart

*   **Script File:** `removeProductsFromCart.spec.js`
*   **Priority:** High
*   **Objective:** Validates the removal of products from the shopping cart.

*   **Detailed Steps Performed:**
    1.  Navigate to the home page.
    2.  Add multiple products to the cart (e.g., two different products).
    3.  Click the 'Cart' button and verify the cart page.
    4.  Verify both products are initially in the cart.
    5.  Click the 'X' (remove) button corresponding to one of the products.
    6.  Verify that the product is removed from the cart (it should no longer be visible).
    7.  Verify the other product remains in the cart.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage`: Navigation, product page navigation (to add items), cart navigation.
    *   `ProductsPage`: Adding products to the cart.
    *   `CartPage`:
        *   `isShoppingCartVisible()`: Verifying cart page.
        *   `isProductInCart(productName)` or similar: To verify product presence.
        *   `clickRemoveProductFromCart(productIdOrName)`: To remove a product.
        *   Verifying cart becomes empty or product is not visible after removal.

---
### Test Case 18: View Category Products

*   **Script File:** `viewCategoryProducts.spec.js`
*   **Priority:** Medium
*   **Objective:** Verifies navigation and display of products based on categories and sub-categories.

*   **Detailed Steps Performed:**
    1.  Navigate to the home page.
    2.  Verify categories are visible on the left sidebar.
    3.  Click on a main category (e.g., 'Women').
    4.  Click on a sub-category link under 'Women' (e.g., 'Dress').
    5.  Verify the category page is displayed and confirm the title text (e.g., 'WOMEN - DRESS PRODUCTS').
    6.  On the left sidebar, click on a sub-category link under a different main category (e.g., 'Men > Tshirts').
    7.  Verify the user is navigated to the new category page and confirm its title.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `areCategoriesVisible()`: To check if the category sidebar section is visible.
        *   `clickWomenCategoryLink()`, `clickWomenDressCategoryLink()`, `clickMenCategoryLink()`, `clickMenTshirtsCategoryLink()`: To interact with category links.
    *   `ProductsPage` (`pages/ProductsPage.js`):
        *   `getCategoryTitleText()`: To retrieve and verify the title on the category products page.

---
### Test Case 19: View & Cart Brand Products

*   **Script File:** `viewCartBrandProducts.spec.js`
*   **Priority:** Medium
*   **Objective:** Verifies navigation and display of products based on brands.

*   **Detailed Steps Performed:**
    1.  Navigate to the home page.
    2.  Click on the 'Products' button.
    3.  Verify that Brands are visible on the left sidebar.
    4.  Click on a specific brand name (e.g., 'Polo').
    5.  Verify the user is navigated to the brand page and brand products are displayed (e.g., title 'BRAND - POLO PRODUCTS').
    6.  On the left sidebar, click on another brand link (e.g., 'H&M').
    7.  Verify navigation to the new brand page and its products/title are displayed.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `clickProductsLink()`: To go to the All Products page.
    *   `ProductsPage` (`pages/ProductsPage.js`):
        *   `areBrandsVisible()`: To check if the brands sidebar section is visible.
        *   `clickBrandLink(brandName)`: To click on a specific brand.
        *   `getCategoryTitleText()`: To retrieve and verify the title on the brand products page.
        *   Verifying products are displayed on the brand page.

---
### Test Case 20: Search Products and Verify Cart After Login

*   **Script File:** `searchProductsAndVerifyCartAfterLogin.spec.js`
*   **Priority:** High
*   **Objective:** Verifies that products searched and added to cart persist after the user logs in.

*   **Detailed Steps Performed:**
    1.  (Before All Tests in file) Register a new user and log out.
    2.  Navigate to the 'Products' page.
    3.  Search for a product (e.g., "Blue Top").
    4.  Verify 'SEARCHED PRODUCTS' is visible and products are displayed.
    5.  Add all displayed searched products to the cart.
    6.  Go to the 'Cart' page and verify the products are in the cart.
    7.  Navigate to 'Signup / Login' page and log in with the pre-registered user.
    8.  Go back to the 'Cart' page.
    9.  Verify the same products are still visible in the cart.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: Initial navigation.
        *   `clickProductsLink()`: To navigate to products page.
        *   `clickCartLink()`: To navigate to cart.
        *   `clickSignupLoginLink()`: To navigate to login page.
        *   `isLoggedInAsVisible()`: To verify login.
    *   `ProductsPage` (`pages/ProductsPage.js`):
        *   `searchProduct(productName)`: To perform search.
        *   `isSearchedProductsVisible()`: To verify search results section.
        *   `addAllDisplayedProductsToCart()`: To add all found items to cart.
        *   `getDisplayedProductNames()`: To get names of searched products.
    *   `CartPage` (`pages/CartPage.js`):
        *   `getCartProductNames()`: To get names of products in cart for verification.
        *   `verifyProductsInCart()` or similar logic.
    *   `LoginPage` (`pages/LoginPage.js`):
        *   `login(email, password)`: For user login.
    *   `SignupPage` (`pages/SignupPage.js`) (in `beforeAll`): For test user registration.
    *   `Utils` / `faker`: For user data generation.

---
### Test Case 21: Add review on product

*   **Script File:** `addReviewOnProduct.spec.js`
*   **Priority:** Medium
*   **Objective:** Tests the ability to submit a review for a product and verifies the success message.

*   **Detailed Steps Performed:**
    1.  Navigate to the 'Products' page.
    2.  Click 'View Product' for a specific product.
    3.  Verify 'Write Your Review' section is visible.
    4.  Enter name, a randomly generated email, and review text.
    5.  Click the 'Submit' button for the review.
    6.  Verify the success message 'Thank you for your review.' is displayed.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`, `clickProductsLink()`.
    *   `ProductsPage` (`pages/ProductsPage.js`):
        *   `isAllProductsVisible()`: Verify products page.
        *   `clickViewProduct(index)`: To go to product detail.
        *   `isWriteYourReviewVisible()`: To check for review section.
        *   `fillReview(name, email, message)`: To fill and submit the review form.
        *   `getReviewSuccessMessage()`: To verify success.
    *   `Utils` / `faker`: For generating review data (name, email).

---
### Test Case 22: Add to cart from Recommended items

*   **Script File:** `addRecommendedItemsToCart.spec.js`
*   **Priority:** Medium
*   **Objective:** Verifies adding a product to the cart from the 'Recommended Items' section.

*   **Detailed Steps Performed:**
    1.  Navigate to the home page.
    2.  Scroll to the bottom of the page.
    3.  Verify 'RECOMMENDED ITEMS' section is visible.
    4.  Capture the name of a product in the recommended items section.
    5.  Click 'Add To Cart' for that product.
    6.  Click 'View Cart' button (from modal).
    7.  Verify the captured product name is displayed in the cart page.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: Navigation.
        *   `scrollToBottom()`: To reach recommended items.
        *   `isRecommendedItemsVisible()`: Verify section.
        *   `getRecommendedItemName(index)`: To get product name for later verification.
        *   `addRecommendedItemToCart(index)`: To add item and handle modal.
        *   `clickViewCartModalLink()`: To go to cart.
    *   `CartPage` (`pages/CartPage.js`):
        *   `isProductInCart(productName)`: To verify the correct product was added.
    *   `Utils` (`utils/utils.js`): For scrolling if not in HomePage.

---
### Test Case 23: Verify address details in checkout page

*   **Script File:** `verifyAddressDetailsInCheckoutPage.spec.js`
*   **Priority:** High
*   **Objective:** Ensures delivery and billing addresses on the checkout page match the registered user's address.

*   **Detailed Steps Performed:**
    1.  Register a new user, storing all address details used.
    2.  Verify 'Logged in as username'.
    3.  Add a product to the cart.
    4.  Proceed to checkout.
    5.  Retrieve the delivery address displayed on the checkout page.
    6.  Compare each field of the displayed delivery address with the stored registration address details.
    7.  Retrieve the billing address displayed on the checkout page.
    8.  Compare each field of the displayed billing address with the stored registration address details.
    9.  Delete the account.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage`: Navigation, signup, login verification, cart access, account deletion.
    *   `LoginPage`: Initial signup.
    *   `SignupPage`: Full user registration, capturing address data.
    *   `ProductsPage`: Adding product to cart.
    *   `CartPage`: Proceeding to checkout.
    *   `CheckoutPage` (`pages/CheckoutPage.js`):
        *   `getDeliveryAddressDetails()`: To fetch structured delivery address from page.
        *   `getBillingAddressDetails()`: To fetch structured billing address from page.
    *   `Utils` / `faker`: For generating user data.

---
### Test Case 24: Download Invoice after purchase order

*   **Script File:** `downloadInvoiceAfterPurchase.spec.js`
*   **Priority:** Critical
*   **Objective:** Verifies that an invoice can be downloaded successfully after completing a purchase.

*   **Detailed Steps Performed:**
    1.  Register a new user.
    2.  Verify 'Logged in as username'.
    3.  Add a product to cart and proceed through checkout (address, review order).
    4.  Enter payment details and confirm order.
    5.  Verify 'Your order has been placed successfully!' message.
    6.  Start a listener for the page's 'download' event.
    7.  Click the 'Download Invoice' button.
    8.  Verify the download occurred and the suggested filename is 'invoice.txt'.
    9.  Click 'Continue' on the order success page.
    10. Delete the account.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage`: Registration, login verification, cart access, account deletion.
    *   `LoginPage`: Initial signup.
    *   `SignupPage`: Full registration.
    *   `ProductsPage`: Adding to cart.
    *   `CartPage`: Proceed to checkout.
    *   `CheckoutPage`: Address/order review, placing order.
    *   `PaymentPage` (`pages/PaymentPage.js`):
        *   `fillPaymentDetails(...)`: To enter payment info.
        *   `clickPayAndConfirmOrder()`: To submit payment.
        *   `isOrderPlacedVisible()`, `getOrderSuccessMessage()`: To verify order confirmation.
        *   `clickDownloadInvoice()`: To trigger invoice download.
        *   `clickContinueButton()`: To continue after order.
    *   Playwright's `page.on('download', ...)`: Used directly in test for download handling.
    *   `Utils` / `faker`: For user and payment data.

---
### Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality

*   **Script File:** `verifyScrollUpUsingArrow.spec.js`
*   **Priority:** Low
*   **Objective:** Tests the scroll-to-top functionality using the dedicated arrow button.

*   **Detailed Steps Performed:**
    1.  Navigate to the home page.
    2.  Verify home page is visible.
    3.  Scroll to the bottom of the page.
    4.  Verify 'SUBSCRIPTION' text (in footer) is visible.
    5.  Click the scroll-up arrow button (usually bottom-right).
    6.  Verify the page has scrolled up and specific text from the top of the page (e.g., "Full-Fledged practice website...") is visible.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: Navigation.
        *   `isSliderVisible()`: Verify home page.
        *   `scrollToBottom()`: Scroll down.
        *   `isSubscriptionTextVisible()`: Verify footer content visibility.
        *   `clickScrollUpArrow()`: Click the UI scroll arrow.
        *   `isFullFledgedTextVisible()`: Verify header content visibility after scroll.

---
### Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality

*   **Script File:** `verifyScrollUpWithoutArrow.spec.js`
*   **Priority:** Low
*   **Objective:** Tests page scrolling functionality using browser's native scroll (not the arrow button).

*   **Detailed Steps Performed:**
    1.  Navigate to the home page.
    2.  Verify home page is visible.
    3.  Scroll to the bottom of the page (using `page.evaluate` or `homePage.scrollToBottom()`).
    4.  Verify 'SUBSCRIPTION' text is visible.
    5.  Scroll to the top of the page (using `page.evaluate(() => window.scrollTo(0, 0))` or `homePage.scrollToTop()`).
    6.  Verify the page has scrolled up and specific text from the top (e.g., "Full-Fledged practice website...") is visible.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: Navigation.
        *   `isSliderVisible()`: Verify home page.
        *   `scrollToBottom()`: Scroll down.
        *   `isSubscriptionTextVisible()`: Verify footer content.
        *   `scrollToTop()`: Programmatic scroll to top.
        *   `isFullFledgedTextVisible()`: Verify header content.

---

## Test Case Independence

It is important to note that these test cases are designed to be **independent and atomic**. Each test script (`.spec.js` file) manages its own setup (including user registration if needed for the test) and, where appropriate, cleanup. You should be able to run individual test files or the entire suite in any order without tests failing due to dependencies on others.

The priority assigned in the table above refers to the functional importance and criticality of the test case for the application, not a required order of execution.

## Prerequisites

*   Node.js (version 16.x or higher recommended)
*   npm (usually comes with Node.js)
*   Git (for cloning the repository)

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**
    This will install Playwright and other necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    This command installs the default browsers for Playwright (Chromium, Firefox, WebKit).
    ```bash
    npx playwright install
    ```

## Running Tests

Playwright tests can be executed using the `npx playwright test` command.

1.  **Run all tests:**
    This command will run all `.spec.js` files in the `tests` directory.
    ```bash
    npx playwright test
    ```

2.  **Run a specific test file:**
    ```bash
    npx playwright test tests/registerUser.spec.js
    ```

3.  **Run tests in headed mode (to watch the browser):**
    ```bash
    npx playwright test --headed
    ```
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

4.  **Run tests on a specific browser:**
    ```bash
    npx playwright test --browser=chromium
    # Other options: --browser=firefox, --browser=webkit, or --browser=all
    ```

# Run tests against the DEV environment (default)
### Test Execution

Tests can be executed using the `npx playwright test` command. By default, tests run in headless mode, but you can run in headed mode (to watch the browser) or in a specific browser using the `--headed` and `--browser` options, respectively.

### Test Reports

After test execution, a detailed HTML report is generated in the `playwright-report` directory. This report includes test results, screenshots, and other useful information.

### Viewing the Report

You can view the HTML report using the following command:

```bash
npx playwright show-report
```

This will open the report in your default web browser.

## Additional Configuration

### Browser Selection

By default, tests run in Chromium. You can specify a different browser using the `--browser` option. For example:

```bash
# Run tests in Firefox
npx playwright test
```

6.  **View HTML Report:**
    After running tests, an HTML report is typically generated in the `playwright-report` directory.
    ```bash
    npx playwright show-report
    ```

## 📁 Project Structure

```
├── tests/                          # Test specification files (.spec.ts)
│   ├── registerUser.spec.ts        # User registration and lifecycle tests
│   ├── loginUserCorrectCredentials.spec.ts # Login validation tests
│   ├── addProductsInCart.spec.ts    # Cart functionality tests
│   └── ...
├── pages/                          # Page Object Model files (.ts)
│   ├── HomePage.ts                 # Home page interactions and navigation
│   ├── LoginPage.ts                # Login/signup form interactions
│   ├── SignupPage.ts               # User registration form handling
│   ├── ProductsPage.ts             # Product listing and cart operations
│   ├── CartPage.ts                 # Shopping cart verification and management
│   └── ...
├── helpers/                        # Helper classes for common workflows
│   ├── UserSetupHelper.ts          # User data generation and management
│   └── ...
├── utils/                          # Utility functions and common operations
│   ├── utils.ts                    # Core utility functions
│   └── ...
├── types/                          # TypeScript type definitions
│   ├── testData.ts                 # Data structure interfaces
│   └── ...
├── test-data/                      # External test data files
│   ├── users.json                  # User test data
│   ├── products.json               # Product test data
│   └── ...
├── allure-results/                 # Allure test results
├── playwright-report/              # HTML test reports
├── test-results/                   # Test execution artifacts
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project dependencies and scripts
```

## 🛠️ Prerequisites

*   **Node.js** (version 18.x or higher recommended)
*   **npm** (usually comes with Node.js)
*   **Git** (for cloning the repository)
*   **TypeScript** (installed as project dependency)

## 🚀 Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd PlayWrightTypeScriptProjectUI
    ```

2.  **Install dependencies:**
    This will install Playwright, TypeScript, and other necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    This command installs the default browsers for Playwright (Chromium, Firefox, WebKit).
    ```bash
    npx playwright install
    ```

4.  **Verify TypeScript compilation:**
    ```bash
    npx tsc --noEmit
    ```

## 🧪 Running Tests

Playwright tests can be executed using the `npx playwright test` command with various options:

### Basic Test Execution

1.  **Run all tests:**
    ```bash
    npx playwright test
    ```

2.  **Run a specific test file:**
    ```bash
    npx playwright test tests/registerUser.spec.ts
    npx playwright test tests/addProductsInCart.spec.ts
    ```

3.  **Run tests with specific pattern:**
    ```bash
    npx playwright test --grep "should add specified products"
    ```

### Development and Debugging

4.  **Run tests in headed mode (watch the browser):**
    ```bash
    npx playwright test --headed
    ```

5.  **Run tests on a specific browser:**
    ```bash
    npx playwright test --project=chromium
    npx playwright test --project=firefox
    npx playwright test --project=webkit
    ```

6.  **Debug tests with Playwright Inspector:**
    ```bash
    npx playwright test --debug
    ```

### Reporting and Analysis

7.  **Generate and view HTML report:**
    ```bash
    npx playwright test
    npx playwright show-report
    ```

8.  **Run tests with Allure reporting:**
    ```bash
    npm run test:allure
    npm run allure:serve
    ```

## 🏃‍♂️ Continuous Integration

For CI/CD environments, use headless mode with specific output formats:

```bash
# CI-friendly execution
npx playwright test --reporter=github

# With custom configuration
npx playwright test --config=playwright.config.ci.ts
```

## 🔧 Test Environment Configuration

This test suite supports multiple environments:

### Environment Files
- `playwright.config.ts`: Main Playwright configuration
- `tsconfig.json`: TypeScript compilation settings
- `test-data/*.json`: Environment-specific test data

### Environment Selection
```bash
# Run tests against different environments
ENV=qa npx playwright test
ENV=staging npx playwright test
ENV=prod npx playwright test
```

## 🐛 Troubleshooting

### Common Issues and Solutions

1. **Modal Blocking Issues:**
   - The test suite includes automatic modal management
   - If tests fail due to blocking modals, check the console logs for modal state

2. **Element Not Found:**
   - Tests include robust wait strategies and retry logic
   - Check if selectors need updating for application changes

3. **TypeScript Compilation Errors:**
   ```bash
   # Check for TypeScript errors
   npx tsc --noEmit
   ```

4. **Test Data Issues:**
   - Verify test data files in `test-data/` directory
   - Ensure data format matches TypeScript interfaces in `types/`

### Debugging Steps

1. **Run with detailed logging:**
   ```bash
   DEBUG=pw:api npx playwright test
   ```

2. **Run single test with trace:**
   ```bash
   npx playwright test --trace on tests/addProductsInCart.spec.ts
   ```

3. **View trace files:**
   ```bash
   npx playwright show-trace test-results/trace.zip
   ```

## 📈 Reporting

### HTML Reports
- Generated automatically after test runs
- Located in `playwright-report/` directory
- View with `npx playwright show-report`

### Allure Reports
- Enhanced reporting with test steps and attachments
- Setup: `npm install -g allure-commandline`
- Generate: `npm run allure:generate`
- Serve: `npm run allure:serve`

### Console Logging
- Detailed execution logs for debugging
- Product addition confirmations
- Modal state management logs
- Error context and troubleshooting information

## 🔄 Test Independence

All test cases are designed to be **independent and atomic**:

- ✅ Each test manages its own setup and cleanup
- ✅ Tests can run in any order without dependencies
- ✅ User data is generated uniquely for each test run
- ✅ Account cleanup ensures no test data pollution

## 🏗️ Extending the Test Suite

### Adding New Tests
1. Create new `.spec.ts` file in `tests/` directory
2. Follow existing patterns for test structure and steps
3. Use helper methods and page objects for consistency

### Adding New Page Objects
1. Create new `.ts` file in `pages/` directory
2. Implement locators and action methods
3. Keep validations in test files, actions in page objects

### Adding Test Data
1. Add data to appropriate `.json` file in `test-data/`
2. Update TypeScript interfaces in `types/`
3. Use `Utils.loadTestData()` to access data in tests

## 🎉 Recent Improvements & Achievements

### ✅ **Successfully Completed Refactoring**
- **TypeScript Migration**: Complete conversion from JavaScript to TypeScript with full type safety
- **Industry Best Practices**: Implementation of Page Object Model with proper separation of concerns
- **Helper Methods**: Centralized common workflows for better maintainability
- **Test Steps**: Enhanced reporting and debugging with `test.step()` implementation

### 🐛 **Critical Bug Fixes**
- **Modal Blocking Issue**: Resolved cart navigation failures caused by unhandled modals
- **Element Interaction**: Improved wait strategies and error handling
- **Test Stability**: Enhanced reliability through robust locator strategies

### 🏗️ **Architecture Improvements**
- **Code Organization**: Clean separation between actions (page objects) and validations (tests)
- **Reusability**: Helper methods reduce code duplication across test files
- **Data Management**: External JSON files for test data with proper TypeScript interfaces
- **Error Handling**: Comprehensive error handling with detailed logging

---

**📝 Note**: This test suite demonstrates modern test automation practices and serves as a reference implementation for Playwright with TypeScript projects.


