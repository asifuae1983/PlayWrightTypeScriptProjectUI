# Automation Exercise Test Suite

This repository contains an automated test suite for [https://automationexercise.com](https://automationexercise.com) using Playwright with JavaScript.

## Test Cases

Below is a detailed list of all implemented test cases, including their script files, priority, objectives, detailed steps, and Page Objects used.

---
### Test Case 1: Register User

*   **Script File:** `registerUser.spec.js`
*   **Priority:** Critical
*   **Objective:** Validates the new user registration process, login after registration, and account deletion.

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Verify the home page is visible (e.g., by checking for the main slider).
    3.  Click on the 'Signup / Login' link in the header.
    4.  Verify 'New User Signup!' text is visible.
    5.  Enter a randomly generated name and email into the signup form.
    6.  Click the 'Signup' button.
    7.  Verify 'ENTER ACCOUNT INFORMATION' text is visible on the signup page.
    8.  Fill in account information: Title, Password, Date of Birth.
    9.  Select checkboxes for newsletter and special offers (based on test data).
    10. Fill in address information: First name, Last name, Company, Address 1, Address 2, Country, State, City, Zipcode, Mobile Number.
    11. Click the 'Create Account' button.
    12. Verify 'ACCOUNT CREATED!' message is visible.
    13. Click the 'Continue' button.
    14. Verify that 'Logged in as [username]' is visible in the header.
    15. Click the 'Delete Account' link in the header.
    16. Verify 'ACCOUNT DELETED!' message is visible.
    17. Click the 'Continue' button.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the application's base URL.
        *   `isSliderVisible()`: To verify the home page is loaded.
        *   `clickSignupLoginLink()`: To navigate to the Signup/Login page.
        *   `isLoggedInAsVisible(username)`: To verify the user is logged in.
        *   `clickDeleteAccountLink()`: To initiate account deletion.
        *   `isAccountDeletedVisible()`: To verify the account deletion confirmation message.
        *   `clickDeleteContinueButton()`: To continue after account deletion.
    *   `LoginPage` (`pages/LoginPage.js`):
        *   `isSignupFormVisible()`: To verify the 'New User Signup!' section is present.
        *   `signup(name, email)`: To fill the initial signup form (name and email) and submit.
    *   `SignupPage` (`pages/SignupPage.js`):
        *   `isAccountInfoTextVisible()`: To verify the 'ENTER ACCOUNT INFORMATION' section is present.
        *   `fillAccountInformation(...)`: To fill user's account details.
        *   `fillAddressInformation(...)`: To fill user's address details.
        *   `clickCreateAccountButton()`: To submit the registration form.
        *   `isAccountCreatedVisible()`: To verify the 'ACCOUNT CREATED!' message.
        *   `clickContinueButton()`: To proceed after account creation.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   Used for generating random user data (name, email) and loading static test data if needed.

---
### Test Case 2: Login User with correct email and password

*   **Script File:** `loginUserCorrectCredentials.spec.js`
*   **Priority:** Critical
*   **Objective:** Validates login with correct credentials and subsequent account deletion.

*   **Detailed Steps Performed:**
    1.  (Before All Tests in file) Register a new user with unique credentials and log out.
    2.  Navigate to the application's home page.
    3.  Verify the home page is visible.
    4.  Click on the 'Signup / Login' link.
    5.  Verify 'Login to your account' text is visible.
    6.  Enter the pre-registered correct email address and password.
    7.  Click the 'login' button.
    8.  Verify that 'Logged in as [username]' is visible.
    9.  Click the 'Delete Account' button.
    10. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue'.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `isSliderVisible()`: To verify home page visibility.
        *   `clickSignupLoginLink()`: To go to the login page.
        *   `isLoggedInAsVisible(username)`: To confirm successful login.
        *   `clickDeleteAccountLink()`: To delete the account.
        *   `isAccountDeletedVisible()`: To verify account deletion.
        *   `clickDeleteContinueButton()`: To continue after deletion.
    *   `LoginPage` (`pages/LoginPage.js`):
        *   `isLoginFormVisible()`: To ensure the login form is present.
        *   `login(email, password)`: To fill login credentials and submit.
    *   `SignupPage` (`pages/SignupPage.js`) (Used in `beforeAll`):
        *   Methods for user registration (`fillAccountInformation`, `fillAddressInformation`, etc.) to create the test user.
    *   `Utils` (`utils/utils.js`) / `faker`:
        *   For generating user data for the initial registration in `beforeAll`.

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

*   **Script File:** `addProductsInCart.spec.js`
*   **Priority:** Critical
*   **Objective:** Tests adding multiple products to the cart and verifying their details (price, quantity, total).

*   **Detailed Steps Performed:**
    1.  Navigate to the application's home page.
    2.  Verify the home page is visible.
    3.  Click the 'Products' link.
    4.  Verify the 'ALL PRODUCTS' page is visible.
    5.  Hover over the first product and click 'Add to cart'.
    6.  Click the 'Continue Shopping' button in the modal.
    7.  Hover over the second product and click 'Add to cart'.
    8.  Click the 'View Cart' button (either in modal or header link).
    9.  Verify both products are added to the Cart.
    10. Verify their prices, quantity (should be 1 for each), and total price for each product.

*   **Page Objects Used and Their Purpose:**
    *   `HomePage` (`pages/HomePage.js`):
        *   `goto()`: To navigate to the home page.
        *   `clickProductsLink()`: To go to the products page.
        *   `clickCartLink()`: To navigate to the cart page (if 'View Cart' from header is used).
    *   `ProductsPage` (`pages/ProductsPage.js`):
        *   `isAllProductsVisible()`: To verify products page.
        *   `addProductToCartByName(productName)`: To add a specific product to the cart. (Test might use indices or more generic selectors too).
        *   `clickContinueShopping()`: To close the 'Added!' modal.
        *   `clickViewCartLinkInModal()`: (Alternative) To navigate to cart from modal.
    *   `CartPage` (`pages/CartPage.js`):
        *   `isShoppingCartVisible()`: To verify cart page.
        *   `getCartItemCount()`: To check number of items.
        *   Methods to get product details in cart (name, price, quantity, total for each item) e.g., `getProductDetailsInCart(productName)`.

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

4.  **Run tests on a specific browser:**
    ```bash
    npx playwright test --browser=chromium
    # Other options: --browser=firefox, --browser=webkit, or --browser=all
    ```

5.  **Run tests with UI Mode (for debugging, exploring, and seeing traces):**
    ```bash
    npx playwright test --ui
    ```

6.  **View HTML Report:**
    After running tests, an HTML report is typically generated in the `playwright-report` directory.
    ```bash
    npx playwright show-report
    ```

## Project Structure

*   `tests/`: Contains all the test script files (`.spec.js`).
*   `pages/`: Contains Page Object Model files, abstracting page interactions.
*   `test-data/`: Contains JSON files for test data (users, products, form data).
*   `utils/`: Contains utility functions used across tests.
*   `playwright.config.js`: Configuration file for Playwright.
*   `package.json`: Defines project dependencies and scripts.
