export const USERS = {
  standard: {
    username: process.env.STANDARD_USER ?? "standard_user",
    password: process.env.PASSWORD ?? "secret_sauce",
  },
  locked: {
    username: process.env.LOCKED_USER ?? "locked_out_user",
    password: process.env.PASSWORD ?? "secret_sauce",
  },
  problem: {
    username: process.env.PROBLEM_USER ?? "problem_user",
    password: process.env.PASSWORD ?? "secret_sauce",
  },
  invalid: {
    username: "not_a_real_user",
    password: "wrong_password",
  },
} as const;

export const PRODUCTS = {
  backpack: "Sauce Labs Backpack",
  bikeLight: "Sauce Labs Bike Light",
  boltTShirt: "Sauce Labs Bolt T-Shirt",
  fleeceJacket: "Sauce Labs Fleece Jacket",
} as const;

export const CHECKOUT_INFO = {
  valid: { firstName: "Jane", lastName: "Doe", postalCode: "10001" },
  missingFirst: { firstName: "", lastName: "Doe", postalCode: "10001" },
  missingLast: { firstName: "Jane", lastName: "", postalCode: "10001" },
  missingZip: { firstName: "Jane", lastName: "Doe", postalCode: "" },
  xssPayload: {
    firstName: "<script>alert(1)</script>",
    lastName: "Safe",
    postalCode: "00000",
  },
} as const;

export const API = {
  reqres: process.env.REQRES_BASE_URL ?? "https://reqres.in/api",
  jsonPlaceholder:
    process.env.JSON_PLACEHOLDER_URL ?? "https://jsonplaceholder.typicode.com",
} as const;
