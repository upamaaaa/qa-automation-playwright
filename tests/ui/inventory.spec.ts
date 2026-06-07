import { test, expect } from "../../fixtures/index";
import { USERS, PRODUCTS } from "../../utils/testData";
import {
  isAscending,
  isDescending,
  sortedAsc,
  sortedDesc,
} from "../../utils/sortHelpers";

test.describe("Product Inventory", () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.waitForURL("**/inventory.html");
  });

  // UI-004
  test("UI-004: product list loads with items after login", async ({
    inventoryPage,
  }) => {
    const count = await inventoryPage.inventoryItems.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  // UI-005
  test("UI-005: sort by price (low to high) orders correctly", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("lohi");
    const prices = await inventoryPage.getProductPrices();
    expect(isAscending(prices)).toBe(true);
  });

  // UI-006
  test("UI-006: sort by name (Z to A) orders correctly", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("za");
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual(sortedDesc(names));
  });

  // Sort Name A to Z
  test("sort by name (A to Z) orders correctly", async ({ inventoryPage }) => {
    await inventoryPage.sortBy("az");
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual(sortedAsc(names));
  });

  // Sort Price High to Low
  test("sort by price (high to low) orders correctly", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("hilo");
    const prices = await inventoryPage.getProductPrices();
    expect(isDescending(prices)).toBe(true);
  });

  // UI-011
  test("UI-011: clicking product name opens detail page", async ({
    inventoryPage,
    productDetailPage,
  }) => {
    await inventoryPage.openProductByName(PRODUCTS.backpack);
    await productDetailPage.expectLoaded(PRODUCTS.backpack);
    await expect(productDetailPage.productPrice).toContainText("$");
    await productDetailPage.goBack();
  });
});
