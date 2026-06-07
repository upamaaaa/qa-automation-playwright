import { test, expect } from "../../fixtures/index";
import { USERS, PRODUCTS } from "../../utils/testData";

test.describe("Shopping Cart", () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.waitForURL("**/inventory.html");
  });

  // UI-007
  test("UI-007: add a product to cart from inventory", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);

    await inventoryPage.goToCart();
    await cartPage.expectLoaded();
    const items = await cartPage.getItemNames();
    expect(items).toContain(PRODUCTS.backpack);
  });

  // UI-008
  test("UI-008: remove product from cart page", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.expectLoaded();

    await cartPage.removeItemByName(PRODUCTS.backpack);
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(0);
  });

  // UI-012
  test("UI-012: cart badge reflects number of items added", async ({
    inventoryPage,
  }) => {
    expect(await inventoryPage.getCartCount()).toBe(0);

    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.addToCartByName(PRODUCTS.bikeLight);
    expect(await inventoryPage.getCartCount()).toBe(2);

    await inventoryPage.removeFromCartByName(PRODUCTS.backpack);
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  // UI-014
  test("UI-014: add multiple products and verify all appear in cart", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.addToCartByName(PRODUCTS.bikeLight);
    await inventoryPage.addToCartByName(PRODUCTS.boltTShirt);

    expect(await inventoryPage.getCartCount()).toBe(3);

    await inventoryPage.goToCart();
    const items = await cartPage.getItemNames();
    expect(items).toContain(PRODUCTS.backpack);
    expect(items).toContain(PRODUCTS.bikeLight);
    expect(items).toContain(PRODUCTS.boltTShirt);
    expect(await cartPage.getItemCount()).toBe(3);
  });

  // Continue shopping link
  test("continue shopping button returns to inventory", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.continueShopping();
  });
});
