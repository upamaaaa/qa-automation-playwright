import { test, expect } from "../../fixtures/index";
import { USERS, PRODUCTS, CHECKOUT_INFO } from "../../utils/testData";

test.describe("Checkout Flow", () => {
  test.beforeEach(async ({ loginPage, inventoryPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.waitForURL("**/inventory.html");
    // Ensure cart has at least one item
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
  });

  // UI-009
  test("UI-009: complete checkout flow places order successfully", async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.expectLoaded();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillInfo(CHECKOUT_INFO.valid);
    await checkoutPage.continue();

    const total = await checkoutPage.getSummaryTotal();
    expect(total).toContain("Total:");

    await checkoutPage.finish();
    await checkoutPage.expectOrderConfirmed();
    await checkoutPage.backToProducts();
  });

  // UI-010
  test("UI-010: checkout with empty first name shows validation error", async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo(CHECKOUT_INFO.missingFirst);
    await checkoutPage.continue();
    await checkoutPage.expectError("First Name is required");
  });

  test("checkout with empty last name shows validation error", async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo(CHECKOUT_INFO.missingLast);
    await checkoutPage.continue();
    await checkoutPage.expectError("Last Name is required");
  });

  test("checkout with empty postal code shows validation error", async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo(CHECKOUT_INFO.missingZip);
    await checkoutPage.continue();
    await checkoutPage.expectError("Postal Code is required");
  });
});
