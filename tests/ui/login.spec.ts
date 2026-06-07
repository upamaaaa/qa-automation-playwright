import { test, expect } from "../../fixtures/index";
import { USERS } from "../../utils/testData";

test.describe("Login Flow", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // UI-001
  test("UI-001: standard_user can log in successfully", async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator(".title")).toHaveText("Products");
  });

  // UI-002 (negative)
  test("UI-002: locked_out_user sees error message", async ({ loginPage }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectError("Sorry, this user has been locked out");
  });

  // Edge case
  test("UI-002b: error banner can be dismissed", async ({ loginPage }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectError("locked out");
    await loginPage.closeError();
  });

  // UI-013: Logout clears session
  test("UI-013: logout redirects to login and clears session", async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.waitForURL("**/inventory.html");
    await inventoryPage.logout();
    await expect(page).toHaveURL("https://www.saucedemo.com/");

    // Back navigation should NOT allow access
    await page.goBack();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
});
