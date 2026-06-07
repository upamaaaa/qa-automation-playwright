import { test, expect } from "../../fixtures/index";
import { USERS, CHECKOUT_INFO, PRODUCTS } from "../../utils/testData";

const JP = "https://jsonplaceholder.typicode.com";

//  UI Negative Tests 

test.describe("Negative: Invalid Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("UI-003: empty username and password shows error", async ({ loginPage }) => {
    await loginPage.login("", "");
    await loginPage.expectError("Username is required");
  });

  test("empty password with valid username shows error", async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, "");
    await loginPage.expectError("Password is required");
  });

  test("wrong credentials show error message", async ({ loginPage }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await loginPage.expectError("do not match any user");
  });

  test("SQL injection in username does not crash the app", async ({ loginPage, page }) => {
    await loginPage.login("' OR '1'='1", "' OR '1'='1");
    await loginPage.expectError("do not match any user");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("UI-002: locked_out_user cannot log in", async ({ loginPage }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectError("locked out");
  });
});

test.describe("Negative: Empty Checkout Form", () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.waitForURL("**/inventory.html");
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test("empty checkout form shows first name required error", async ({ checkoutPage }) => {
    await checkoutPage.continue();
    await checkoutPage.expectError("First Name is required");
  });

  test("only postal code filled shows first name error first", async ({ checkoutPage }) => {
    await checkoutPage.fillInfo({ firstName: "", lastName: "", postalCode: "12345" });
    await checkoutPage.continue();
    await checkoutPage.expectError("First Name is required");
  });
});

//  API Negative Tests 

test.describe("Negative: API Error Responses", () => {

  test("GET non-existent user returns 404", async ({ request }) => {
    const res = await request.get(`${JP}/users/99999`);
    expect(res.status()).toBe(404);
  });

  test("GET non-existent post returns 404", async ({ request }) => {
    const res = await request.get(`${JP}/posts/99999`);
    expect(res.status()).toBe(404);
  });

  test("GET non-existent comment returns 404", async ({ request }) => {
    const res = await request.get(`${JP}/comments/99999`);
    expect(res.status()).toBe(404);
  });
});