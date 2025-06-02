// types/testData.d.ts

// For users.json
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

export interface UserData extends UserAddress {
  title?: 'Mr' | 'Mrs' | 'Ms'; // Added 'Ms'
  namePrefix?: string;
  emailPrefix?: string;
  password?: string;
  dobDay?: string;
  dobMonth?: string; // Could be string like "5" or "January"
  dobYear?: string;
  newsletter?: boolean;
  optin?: boolean;
  // UserAddress fields are flattened into UserData as per users.json structure
}

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

// For products.json
export interface Product {
  id?: string | number;
  idForCartInteractions?: string; // Based on observed data "1", "2"
  name: string;
  price?: string; // Optional as not all product entries might have it (e.g. if only name is needed)
  brand?: string;
  category?: string;
  quantity?: number;
}

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

// For formData.json
export interface ContactUsData {
  namePrefix?: string;
  emailPrefix?: string;
  name?: string; // Optional if generated
  email?: string; // Optional if generated
  subject: string;
  message: string;
  testFileName: string;
  testFileContent: string;
}

export interface ReviewData {
    namePrefix?: string;
    emailPrefix?: string;
    name?: string; // Optional if generated
    email?: string; // Optional if generated
    reviewMessage: string;
}

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export interface SubscriptionData {
    emailPrefix: string;
    expectedSuccessMessage: string;
}

export interface FormDataFile {
  contactUs: ContactUsData;
  review: ReviewData; // Added ReviewData
  homepageSubscription: SubscriptionData;
  cartPageSubscription: SubscriptionData;
  paymentDetails: PaymentDetails;
  // Add other top-level form data keys if present
}
