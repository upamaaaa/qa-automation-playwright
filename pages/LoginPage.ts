import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator(".error-button");
  }

  /** Navigate to the login page */
  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
    await expect(this.loginButton).toBeVisible();
  }

  /** Fill credentials and submit */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Assert the error banner */
  async expectError(partial: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(partial);
  }

  /** Dismiss the error banner */
  async closeError() {
    await this.errorCloseButton.click();
    await expect(this.errorMessage).not.toBeVisible();
  }
}
