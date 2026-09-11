import { BasePage } from "./BasePage";
import { Element } from "../core/elements/element";
import { bookData } from "../test-data/BookData";

export class BookStorePage extends BasePage {
  searchInput: Element;
  userNameLabel: Element;
  bookLink: Element;
  addToCollectionButton: Element;

  constructor(page: any) {
    super(page);
    this.searchInput = new Element("#searchBox");
    this.userNameLabel = new Element("id=userName-value");
    this.bookLink = new Element(`xpath=//a[.="${bookData.title}"]`);
    this.addToCollectionButton = new Element('xpath=//button[.="Add To Your Collection"]');
  }
  async searchBook(bookTitle: string) {
    await this.searchInput.fillText(bookTitle);
  }

  async waitForUserNameDisplayed() {
    await this.userNameLabel.waitForElementToBeVisible();
  }

  async goToBookDetailsPage(bookTitle: string) {
    await this.searchBook(bookTitle);
    await this.bookLink.click();
  }
  async addBookToCollection(bookTitle: string): Promise<void> {
    await this.goToBookDetailsPage(bookTitle);
    await this.addToCollectionButton.click();
    await this.handleAlert();
  }
}
