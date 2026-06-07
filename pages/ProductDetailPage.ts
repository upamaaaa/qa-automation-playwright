import { Page, Locator, expect } from "@playwright/test";

export class ProductDetailPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator(".inventory_details_name");
    this.productDescription = page.locator(".inventory_details_desc");
    this.productPrice = page.locator(".inventory_details_price");
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async expectLoaded(expectedName: string) {
    await expect(this.productName).toBeVisible();
    await expect(this.productName).toHaveText(expectedName);
    await expect(this.productPrice).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.removeButton).toBeVisible();
  }

  async goBack() {
    await this.backButton.click();
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
  }
}
