import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
  }

  async goto() {
    await this.page.goto("/cart.html");
    await expect(this.title).toHaveText("Your Cart");
  }

  async expectLoaded() {
    await expect(this.title).toHaveText("Your Cart");
  }

  async getItemNames(): Promise<string[]> {
    return this.cartItems.locator(".inventory_item_name").allTextContents();
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItemByName(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator("button[data-test^='remove']").click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
  }
}
