import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { BookStore_URL } from '../constants/url.ts';

export class BookStorePage extends BasePage {
  private readonly searchInput: Locator;
  private readonly bookTitleLinks: Locator;
  private readonly noDataText: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#searchBox');
    this.noDataText = page.locator('.rt-noData'); //('No rows found');
    this.bookTitleLinks = page.locator('a[href^="/books?search="]');
    //('.rt-tr-group .action-buttons a');
  }

  async goto() {
    await super.goto(BookStore_URL);
  }

  async searchBook(bookTitle: string) {
    await this.searchInput.fill(bookTitle);
  }

  async verifyResult(keyword: string): Promise<string[]> {
    const titles = await this.bookTitleLinks.allInnerTexts();

    // No Results
    if (titles.length === 0) {
      return [];
    }

    // Has Results
    for (const title of titles) {
      expect(title.toLowerCase()).toContain(
        keyword.toLowerCase()
      );
    }
    return titles;
  }

  async getIsbnFromFirstResult(): Promise<string> {
    const firstLink = this.bookTitleLinks.first();
    const href = await firstLink.getAttribute('href');
    if (!href) return '';
    const match = href.match(/(\d{10,13})/);
    return match ? match[1] : '';
  }

  async addBookByTitle(bookTitle: string) {
    await this.page.getByRole('link', {
        name: bookTitle
      }).click();
    await this.page.getByRole('button', {
        name: 'Add To Your Collection'
      }).click();

    const dialogPromise = this.page.waitForEvent('dialog');
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Book added');
    await dialog.accept();
  }

}
