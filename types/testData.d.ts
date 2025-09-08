// types/testData.d.ts

// ===================== USERS DATA STRUCTURES =====================

/**
 * Represents a user's address details.
 * Used as a base for user-related data and can be extended.
 */
export interface UserAddress {
  firstName?: string;
  lastName?: string; // Optional because some user entries might only have prefixes for generation
  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  mobileNumber?: string;
}

/**
 * Represents a complete user data object for test scenarios.
 * Extends UserAddress and adds registration/login-specific fields.
 */
export interface UserData extends UserAddress {
  title?: 'Mr' | 'Mrs' | 'Ms'; // User's title
  namePrefix?: string;         // Used for generating random names
  emailPrefix?: string;        // Used for generating random emails
  password?: string;
  dobDay?: string;
  dobMonth?: string;           // Could be string like "5" or "January"
  dobYear?: string;
  newsletter?: boolean;
  optin?: boolean;
  // UserAddress fields are flattened into UserData as per users.json structure
}

/**
 * Represents the structure of the users.json file.
 * Each property corresponds to a user scenario and contains UserData.
 */
export interface UsersFile {
  registerUser: UserData;
  loginUserCorrect: UserData;
  loginUserIncorrect: UserData;
  existingEmailUser: UserData;
  registerWhileCheckoutUser: UserData;
  registerBeforeCheckoutUser: UserData;
  loginBeforeCheckoutUser: UserData;
  // Add other top-level user keys if present in the future
}

// ===================== PRODUCTS DATA STRUCTURES =====================

/**
 * Represents a single product's data for product-related tests.
 */
export interface Product {
  id?: string | number;
  idForCartInteractions?: string; // Used for cart actions, e.g. "1", "2"
  name: string;
  price?: string;                 // Optional as not all product entries might have it
  brand?: string;
  category?: string;
  quantity?: number;
}

/**
 * Represents the structure of the products.json file.
 * Contains configuration for various product-related test scenarios.
 */
export interface ProductsFile {
  searchProduct: {
    searchTerm: string;
    expectedProductName: string;
  };
  viewProduct: {
    productIndex: number;
  };
  addProductsToCart: {
    products: Product[];
  };
  verifyProductQuantity: {
    productToViewIndex: number;
    quantityToSet: number;
    expectedProductName: string;
  };
  // Add other top-level product keys if present
}

// ===================== FORM DATA STRUCTURES =====================

/**
 * Represents the data required for the Contact Us form.
 */
export interface ContactUsData {
  namePrefix?: string;
  emailPrefix?: string;
  name?: string;
  email?: string;
  subject: string;
  message: string;
  testFileName: string;
  testFileContent: string;
}

/**
 * Represents the data required for submitting a product review.
 */
export interface ReviewData {
  namePrefix?: string;
  emailPrefix?: string;
  name?: string; // Optional if generated
  email?: string; // Optional if generated
  reviewMessage: string;
}

/**
 * Represents payment details for checkout/payment tests.
 */
export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

/**
 * Represents data for email subscription tests.
 */
export interface SubscriptionData {
  emailPrefix: string;
  expectedSuccessMessage: string;
}

/**
 * Represents the structure of the formData.json file.
 * Contains configuration for various form-related test scenarios.
 */
export interface FormDataFile {
  contactUs: ContactUsData;
  review: ReviewData; // Added ReviewData
  homepageSubscription: SubscriptionData;
  cartPageSubscription: SubscriptionData;
  paymentDetails: PaymentDetails;
  // Add other top-level form data keys if present
}
