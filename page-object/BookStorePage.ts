import { Page } from "@playwright/test";
import { Element } from "../core/elements/element";
import { bookData } from "../test-data/BookData";
import { BrowserUtils } from "../core/browser/browser-utils";

export class BookStorePage{
  searchInput: Element;
  userNameLabel: Element;
  addToCollectionButton: Element;
  bookTitleLinks: Element;

  constructor() {
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

    async handleAlert(): Promise<string> {
    return await BrowserUtils.handleAlert();
  }

  async addBookToCollection(bookTitle: string): Promise<void> {
    await this.goToBookDetailsPage(bookTitle);
    await this.addToCollectionButton.click();
    await this.handleAlert();
  }
}
