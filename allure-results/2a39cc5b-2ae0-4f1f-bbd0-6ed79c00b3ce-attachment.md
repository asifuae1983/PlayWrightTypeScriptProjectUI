# Test info

- Name: Test Case 11: Verify Subscription in Cart page >> should subscribe with an email on the cart page and verify success message
- Location: /app/tests/verifyCartPageSubscription.spec.js:24:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('a[href="/view_cart"]') resolved to 2 elements:
    1) <a href="/view_cart">…</a> aka getByRole('link', { name: ' Cart' })
    2) <a href="/view_cart">…</a> aka locator('a').filter({ hasText: 'View Cart' })

Call log:
  - waiting for locator('a[href="/view_cart"]')

    at HomePage.clickCartLink (/app/pages/HomePage.js:33:48)
    at /app/tests/verifyCartPageSubscription.spec.js:21:24
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
  - listitem
  - listitem
  - listitem
- heading "AutomationExercise" [level=1]
- heading "Full-Fledged practice website for Automation Engineers" [level=2]
- paragraph: All QA engineers can use this website for automation practice and API testing either they are at beginner or advance level. This is for everybody to help them brush up their automation skills.
- link "Test Cases":
  - /url: /test_cases
  - button "Test Cases"
- link "APIs list for practice":
  - /url: /api_list
  - button "APIs list for practice"
- img "demo website for practice"
- link "":
  - /url: "#slider-carousel"
- link "":
  - /url: "#slider-carousel"
- heading "Category" [level=2]
- heading " Women" [level=4]:
  - link " Women":
    - /url: "#Women"
- heading " Men" [level=4]:
  - link " Men":
    - /url: "#Men"
- heading " Kids" [level=4]:
  - link " Kids":
    - /url: "#Kids"
- insertion:
  - iframe
- heading "Brands" [level=2]
- list:
  - listitem:
    - link "(6) Polo":
      - /url: /brand_products/Polo
  - listitem:
    - link "(5) H&M":
      - /url: /brand_products/H&M
  - listitem:
    - link "(5) Madame":
      - /url: /brand_products/Madame
  - listitem:
    - link "(3) Mast & Harbour":
      - /url: /brand_products/Mast & Harbour
  - listitem:
    - link "(4) Babyhug":
      - /url: /brand_products/Babyhug
  - listitem:
    - link "(3) Allen Solly Junior":
      - /url: /brand_products/Allen Solly Junior
  - listitem:
    - link "(3) Kookie Kids":
      - /url: /brand_products/Kookie Kids
  - listitem:
    - link "(5) Biba":
      - /url: /brand_products/Biba
- heading "Features Items" [level=2]
- img "ecommerce website products"
- heading "Rs. 500" [level=2]
- paragraph: Blue Top
- text:  Add to cart
- heading "Rs. 500" [level=2]
- paragraph: Blue Top
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/1
- img "ecommerce website products"
- heading "Rs. 400" [level=2]
- paragraph: Men Tshirt
- text:  Add to cart
- heading "Rs. 400" [level=2]
- paragraph: Men Tshirt
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/2
- img "ecommerce website products"
- heading "Rs. 1000" [level=2]
- paragraph: Sleeveless Dress
- text:  Add to cart
- heading "Rs. 1000" [level=2]
- paragraph: Sleeveless Dress
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/3
- img "ecommerce website products"
- heading "Rs. 1500" [level=2]
- paragraph: Stylish Dress
- text:  Add to cart
- heading "Rs. 1500" [level=2]
- paragraph: Stylish Dress
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/4
- img "ecommerce website products"
- heading "Rs. 600" [level=2]
- paragraph: Winter Top
- text:  Add to cart
- heading "Rs. 600" [level=2]
- paragraph: Winter Top
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/5
- img "ecommerce website products"
- heading "Rs. 400" [level=2]
- paragraph: Summer White Top
- text:  Add to cart
- heading "Rs. 400" [level=2]
- paragraph: Summer White Top
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/6
- img "ecommerce website products"
- heading "Rs. 1000" [level=2]
- paragraph: Madame Top For Women
- text:  Add to cart
- heading "Rs. 1000" [level=2]
- paragraph: Madame Top For Women
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/7
- img "ecommerce website products"
- heading "Rs. 700" [level=2]
- paragraph: Fancy Green Top
- text:  Add to cart
- heading "Rs. 700" [level=2]
- paragraph: Fancy Green Top
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/8
- img "ecommerce website products"
- heading "Rs. 499" [level=2]
- paragraph: Sleeves Printed Top - White
- text:  Add to cart
- heading "Rs. 499" [level=2]
- paragraph: Sleeves Printed Top - White
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/11
- img "ecommerce website products"
- heading "Rs. 359" [level=2]
- paragraph: Half Sleeves Top Schiffli Detailing - Pink
- text:  Add to cart
- heading "Rs. 359" [level=2]
- paragraph: Half Sleeves Top Schiffli Detailing - Pink
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/12
- img "ecommerce website products"
- heading "Rs. 278" [level=2]
- paragraph: Frozen Tops For Kids
- text:  Add to cart
- heading "Rs. 278" [level=2]
- paragraph: Frozen Tops For Kids
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/13
- img "ecommerce website products"
- heading "Rs. 679" [level=2]
- paragraph: Full Sleeves Top Cherry - Pink
- text:  Add to cart
- heading "Rs. 679" [level=2]
- paragraph: Full Sleeves Top Cherry - Pink
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/14
- img "ecommerce website products"
- heading "Rs. 315" [level=2]
- paragraph: Printed Off Shoulder Top - White
- text:  Add to cart
- heading "Rs. 315" [level=2]
- paragraph: Printed Off Shoulder Top - White
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/15
- img "ecommerce website products"
- heading "Rs. 478" [level=2]
- paragraph: Sleeves Top and Short - Blue & Pink
- text:  Add to cart
- heading "Rs. 478" [level=2]
- paragraph: Sleeves Top and Short - Blue & Pink
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/16
- img "ecommerce website products"
- heading "Rs. 1200" [level=2]
- paragraph: Little Girls Mr. Panda Shirt
- text:  Add to cart
- heading "Rs. 1200" [level=2]
- paragraph: Little Girls Mr. Panda Shirt
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/18
- img "ecommerce website products"
- heading "Rs. 1050" [level=2]
- paragraph: Sleeveless Unicorn Patch Gown - Pink
- text:  Add to cart
- heading "Rs. 1050" [level=2]
- paragraph: Sleeveless Unicorn Patch Gown - Pink
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/19
- img "ecommerce website products"
- heading "Rs. 1190" [level=2]
- paragraph: Cotton Mull Embroidered Dress
- text:  Add to cart
- heading "Rs. 1190" [level=2]
- paragraph: Cotton Mull Embroidered Dress
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/20
- img "ecommerce website products"
- heading "Rs. 1530" [level=2]
- paragraph: Blue Cotton Indie Mickey Dress
- text:  Add to cart
- heading "Rs. 1530" [level=2]
- paragraph: Blue Cotton Indie Mickey Dress
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/21
- img "ecommerce website products"
- heading "Rs. 1600" [level=2]
- paragraph: Long Maxi Tulle Fancy Dress Up Outfits -Pink
- text:  Add to cart
- heading "Rs. 1600" [level=2]
- paragraph: Long Maxi Tulle Fancy Dress Up Outfits -Pink
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/22
- img "ecommerce website products"
- heading "Rs. 1100" [level=2]
- paragraph: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
- text:  Add to cart
- heading "Rs. 1100" [level=2]
- paragraph: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/23
- img "ecommerce website products"
- heading "Rs. 849" [level=2]
- paragraph: Colour Blocked Shirt – Sky Blue
- text:  Add to cart
- heading "Rs. 849" [level=2]
- paragraph: Colour Blocked Shirt – Sky Blue
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/24
- img "ecommerce website products"
- heading "Rs. 1299" [level=2]
- paragraph: Pure Cotton V-Neck T-Shirt
- text:  Add to cart
- heading "Rs. 1299" [level=2]
- paragraph: Pure Cotton V-Neck T-Shirt
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/28
- img "ecommerce website products"
- heading "Rs. 1000" [level=2]
- paragraph: Green Side Placket Detail T-Shirt
- text:  Add to cart
- heading "Rs. 1000" [level=2]
- paragraph: Green Side Placket Detail T-Shirt
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/29
- img "ecommerce website products"
- heading "Rs. 1500" [level=2]
- paragraph: Premium Polo T-Shirts
- text:  Add to cart
- heading "Rs. 1500" [level=2]
- paragraph: Premium Polo T-Shirts
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/30
- img "ecommerce website products"
- heading "Rs. 850" [level=2]
- paragraph: Pure Cotton Neon Green Tshirt
- text:  Add to cart
- heading "Rs. 850" [level=2]
- paragraph: Pure Cotton Neon Green Tshirt
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/31
- img "ecommerce website products"
- heading "Rs. 799" [level=2]
- paragraph: Soft Stretch Jeans
- text:  Add to cart
- heading "Rs. 799" [level=2]
- paragraph: Soft Stretch Jeans
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/33
- img "ecommerce website products"
- heading "Rs. 1200" [level=2]
- paragraph: Regular Fit Straight Jeans
- text:  Add to cart
- heading "Rs. 1200" [level=2]
- paragraph: Regular Fit Straight Jeans
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/35
- img "ecommerce website products"
- heading "Rs. 1400" [level=2]
- paragraph: Grunt Blue Slim Fit Jeans
- text:  Add to cart
- heading "Rs. 1400" [level=2]
- paragraph: Grunt Blue Slim Fit Jeans
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/37
- img "ecommerce website products"
- heading "Rs. 2300" [level=2]
- paragraph: Rose Pink Embroidered Maxi Dress
- text:  Add to cart
- heading "Rs. 2300" [level=2]
- paragraph: Rose Pink Embroidered Maxi Dress
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/38
- img "ecommerce website products"
- heading "Rs. 3000" [level=2]
- paragraph: Cotton Silk Hand Block Print Saree
- text:  Add to cart
- heading "Rs. 3000" [level=2]
- paragraph: Cotton Silk Hand Block Print Saree
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/39
- img "ecommerce website products"
- heading "Rs. 3500" [level=2]
- paragraph: Rust Red Linen Saree
- text:  Add to cart
- heading "Rs. 3500" [level=2]
- paragraph: Rust Red Linen Saree
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/40
- img "ecommerce website products"
- heading "Rs. 5000" [level=2]
- paragraph: Beautiful Peacock Blue Cotton Linen Saree
- text:  Add to cart
- heading "Rs. 5000" [level=2]
- paragraph: Beautiful Peacock Blue Cotton Linen Saree
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/41
- img "ecommerce website products"
- heading "Rs. 1400" [level=2]
- paragraph: Lace Top For Women
- text:  Add to cart
- heading "Rs. 1400" [level=2]
- paragraph: Lace Top For Women
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/42
- img "ecommerce website products"
- heading "Rs. 1389" [level=2]
- paragraph: GRAPHIC DESIGN MEN T SHIRT - BLUE
- text:  Add to cart
- heading "Rs. 1389" [level=2]
- paragraph: GRAPHIC DESIGN MEN T SHIRT - BLUE
- text:  Add to cart
- list:
  - listitem:
    - link " View Product":
      - /url: /product_details/43
- heading "recommended items" [level=2]
- img "ecommerce website products"
- heading "Rs. 1500" [level=2]
- paragraph: Stylish Dress
- text:  Add to cart
- img "ecommerce website products"
- heading "Rs. 600" [level=2]
- paragraph: Winter Top
- text:  Add to cart
- img "ecommerce website products"
- heading "Rs. 400" [level=2]
- paragraph: Summer White Top
- text:  Add to cart
- link "":
  - /url: "#recommended-item-carousel"
- link "":
  - /url: "#recommended-item-carousel"
- insertion
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
   1 | // pages/HomePage.js
   2 | class HomePage {
   3 |     constructor(page) {
   4 |         this.page = page;
   5 |         this.slider = '#slider';
   6 |         this.homeLink = 'a[href="/"]';
   7 |         this.productsLink = 'a[href="/products"]';
   8 |         this.cartLink = 'a[href="/view_cart"]';
   9 |         this.signupLoginLink = 'a[href="/login"]';
  10 |         this.testCasesLink = 'a[href="/test_cases"]';
  11 |         this.apiTestingLink = 'a[href="/api_testing"]';
  12 |         this.videoTutorialsLink = 'a[href="https://www.youtube.com/c/AutomationExercise"]';
  13 |         this.contactUsLink = 'a[href="/contact_us"]';
  14 |         this.subscriptionText = 'footer h2:has-text("Subscription")';
  15 |         this.subscriptionEmailInput = 'footer #subscribe_email';
  16 |         this.subscriptionButton = 'footer #subscribe';
  17 |         this.successAlert = 'footer #success-subscribe'; // Assuming an ID for the success alert
  18 |     }
  19 |
  20 |     async goto() {
  21 |         await this.page.goto('https://automationexercise.com/');
  22 |     }
  23 |
  24 |     async clickSignupLoginLink() {
  25 |         await this.page.locator(this.signupLoginLink).click();
  26 |     }
  27 |
  28 |     async clickProductsLink() {
  29 |         await this.page.locator(this.productsLink).click();
  30 |     }
  31 |
  32 |     async clickCartLink() {
> 33 |         await this.page.locator(this.cartLink).click();
     |                                                ^ Error: locator.click: Error: strict mode violation: locator('a[href="/view_cart"]') resolved to 2 elements:
  34 |     }
  35 |
  36 |     async clickTestCasesLink() {
  37 |         await this.page.locator(this.testCasesLink).click();
  38 |     }
  39 |
  40 |     async clickContactUsLink() {
  41 |         await this.page.locator(this.contactUsLink).click();
  42 |     }
  43 |
  44 |     async enterSubscriptionEmail(email) {
  45 |         await this.page.locator(this.subscriptionEmailInput).fill(email);
  46 |     }
  47 |
  48 |     async clickSubscriptionButton() {
  49 |         await this.page.locator(this.subscriptionButton).click();
  50 |     }
  51 |
  52 |     async getSuccessSubscriptionMessage() {
  53 |         return await this.page.locator(this.successAlert).textContent();
  54 |     }
  55 |
  56 |     async isSliderVisible() {
  57 |         return await this.page.locator(this.slider).isVisible();
  58 |     }
  59 | }
  60 |
  61 | module.exports = { HomePage };
  62 |
```