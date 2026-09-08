import { expect, type Locator, type Page } from "@playwright/test";
import { Profile_URL } from "../constants/url.ts";

export class Profile {
  private readonly page: Page;
  private readonly usernameValue: Locator;
  private readonly profileButton: Locator;
  private readonly searchBox: Locator;
  private readonly deleteIcon: Locator;
  private readonly alertButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameValue = page.locator("#userName-value");
    this.profileButton = page.locator('xpath=//span[text()="Profile"]');
    this.searchBox = page.locator("#searchBox");
    this.deleteIcon = page.locator('xpath=//span[@title="Delete"]');
    this.alertButton = page.locator('xpath=//button[text()="OK"]');
  }
  async validateLoginSuccess(usernameLogin: string) {
    await expect(this.usernameValue).toHaveText(usernameLogin);
  }

  async gotoProfilePage() {
    if (!this.page.url().includes('/profile')) {
      await this.profileButton.click();
    }
    await expect(this.page).toHaveURL(/\/profile/);
    await expect(this.searchBox).toBeVisible();
  }

  async deleteTheBook(bookTitle: string) {
    await this.searchBox.fill(bookTitle);
    const bookLink = this.page.getByRole("link", {
      name: bookTitle,
      exact: true,
    });

    await expect(bookLink).toBeVisible();
    await this.deleteIcon.click();

    // Custom modal dialog handling
    await expect(
      this.page.getByRole("dialog", { name: "Delete Book" }),
    ).toBeVisible();

    await this.page
      .getByRole("dialog", { name: "Delete Book" })
      .getByRole("button", { name: "OK" })
      .click();
  }

  async triggerAlertAndAccept(expectedMessage: string): Promise<void> {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe(expectedMessage);
      await dialog.accept();
    });
    await this.alertButton.click();
  }

  async verifyBookDisplayed(bookTitle: string, shouldExist: boolean) {
    await expect(this.page.locator('table')).toBeVisible();
    const bookLink = this.page.getByRole("link", { name: bookTitle });
    const noRowsText = this.page.getByText("No rows found");


    if (shouldExist) {
      console.log(`Book "${bookTitle}" is displayed in Profile page`);
      await expect(bookLink).toBeVisible();
      await expect(noRowsText).not.toBeVisible();
    } else {
      console.log(`Book "${bookTitle}" is not displayed in Profile page`);
      await expect(bookLink).toHaveCount(0);
      //await expect(noRowsText).toBeVisible();
    }
  }

  async isBookDisplayed(bookTitle: string): Promise<boolean> {
    const bookLink = this.page.getByRole("link", {name: bookTitle});
    await expect(this.page.locator('table')).toBeVisible();

    try {
      await expect(bookLink).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  async deleteBookIfExists(bookTitle: string) {
    const exists = await this.isBookDisplayed(bookTitle);
    if (exists) {
      console.log(`Book "${bookTitle}" already exists. Deleting it first...`);
      await this.deleteTheBook(bookTitle);
    }
  }
}
