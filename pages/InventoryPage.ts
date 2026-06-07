import { Page, Locator, expect } from "@playwright/test";

export type SortOption =
  | "az"
  | "za"
  | "lohi"
  | "hilo";

const SORT_VALUES: Record<SortOption, string> = {
  az: "az",
  za: "za",
  lohi: "lohi",
  hilo: "hilo",
};

export class InventoryPage {
  readonly page: Page;

  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".title");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator(".inventory_item");
    this.cartLink = page.locator(".shopping_cart_link");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.burgerMenu = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async goto() {
    await this.page.goto("/inventory.html");
    await this.expectLoaded();
  }

  async expectLoaded() {
    await expect(this.title).toHaveText("Products");
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  /** Sort the product list */
  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(SORT_VALUES[option]);
  }

  /** Get all product names in current display order */
  async getProductNames(): Promise<string[]> {
    return this.inventoryItems
      .locator(".inventory_item_name")
      .allTextContents();
  }

  /** Get all product prices as numbers */
  async getProductPrices(): Promise<number[]> {
    const texts = await this.inventoryItems
      .locator(".inventory_item_price")
      .allTextContents();
    return texts.map((t) => parseFloat(t.replace("$", "")));
  }

  /** Add a product to the cart by its name */
  async addToCartByName(productName: string) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator("button").click();
  }

  /** Remove a product from the cart by its name (when already added) */
  async removeFromCartByName(productName: string) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator("button").click();
  }

  /** Navigate to a product's detail page */
  async openProductByName(productName: string) {
    await this.inventoryItems
      .filter({ hasText: productName })
      .locator(".inventory_item_name")
      .click();
  }

  /** Return the current cart badge count, or 0 if badge hidden */
  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? "0", 10);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");
  }
}
