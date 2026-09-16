import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Element } from "../core/elements/element";
import { bookData } from "../test-data/BookData";

export class BookStorePage extends BasePage {
  searchInput: Element;
  userNameLabel: Element;
  addToCollectionButton: Element;
  bookTitleLinks: Element;

  constructor(page: Page) {
    super(page);
    this.searchInput = new Element("#searchBox");
    this.userNameLabel = new Element("id=userName-value");
    this.addToCollectionButton = new Element('xpath=//button[.="Add To Your Collection"]');
    this.bookTitleLinks = new Element('a[href^="/books?search="]');
  }
  async searchBook(bookTitle: string) {
    await this.searchInput.fillText(bookTitle);
  }

  async getSearchResults(): Promise<string[]> {
    return await this.bookTitleLinks.allInnerTexts();
  }

  async waitForUserNameDisplayed() {
    await this.userNameLabel.waitForElementToBeVisible();
  }

  async goToBookDetailsPage(bookTitle: string) {
    const bookLink = new Element(`xpath=//a[.="${bookData.title}"]`);
    await this.searchBook(bookTitle);
    await bookLink.click();
  }
  async addBookToCollection(bookTitle: string): Promise<void> {
    await this.goToBookDetailsPage(bookTitle);
    await this.addToCollectionButton.click();
    await this.handleAlert();
  }
}
