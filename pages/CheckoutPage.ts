import { Page, Locator, expect } from "@playwright/test";

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage {
  readonly page: Page;

  // Step 1
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Step 2
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;

  // Confirmation
  readonly confirmationHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.summaryTotal = page.locator(".summary_total_label");
    this.finishButton = page.locator('[data-test="finish"]');

    this.confirmationHeader = page.locator(".complete-header");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillInfo(info: CheckoutInfo) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async expectError(partial: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(partial);
  }

  async finish() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
  }

  async expectOrderConfirmed() {
    await expect(this.confirmationHeader).toHaveText(
      "Thank you for your order!",
    );
  }

  async backToProducts() {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
  }

  async getSummaryTotal(): Promise<string> {
    return (await this.summaryTotal.textContent()) ?? "";
  }
}
