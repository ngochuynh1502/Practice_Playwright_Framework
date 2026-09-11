import { BasePage } from "./BasePage";
import { Element } from "../core/elements/element";
import { bookData } from "../test-data/BookData";

export class ProfilePage extends BasePage {
  okButton: Element;
  searchBox: Element;
  bookLink: Element;
  deleteIcon: Element;

  constructor(page: any) {
    super(page);
    this.okButton = new Element("id=closeSmallModal-ok");
    this.searchBox = new Element("#searchBox");
    this.bookLink = new Element(`xpath=//a[.="${bookData.title}"]`);
    this.deleteIcon = new Element(`id=delete-record-${bookData.isbn}`); //('xpath=//span[@title="Delete"]');
  }

  async searchBookInProfile(bookTitle: string): Promise<void> {
    await this.searchBox.fillText(bookTitle);
  }

  async doesBookExist(bookTitle: string): Promise<boolean> {
    const numberOfElement = await this.bookLink.getNumberOfElements();
    if (numberOfElement > 0) {
      return true;
    }
    return false;
  }

  async deleteBookByName(bookTitle: string): Promise<void> {
    await this.deleteIcon.click();
    await this.registerAlert();
    await this.okButton.click();
    await this.handleAlert();
  }

  async deleteBookIfExists(bookTitle: string) {
    //await this.searchBookInProfile(bookTitle);
    const exists = await this.doesBookExist(bookTitle);
    if (exists == true) {
      console.log(`Book "${bookTitle}" already exists. Deleting it first...`);
      await this.deleteBookByName(bookTitle);
    }
  }
}
