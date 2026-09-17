import { Element } from "../core/elements/element";
import { bookData } from "../test-data/BookData";
import { BrowserUtils } from "../core/browser/browser-utils";

export class ProfilePage{
  okButton: Element;
  searchBox: Element;
  //deleteIcon: Element;
  table: Element;

  constructor() {
    this.okButton = new Element("id=closeSmallModal-ok");
    this.searchBox = new Element("#searchBox");
    this.table = new Element("xpath=//table");
  }

  async searchBookInProfile(bookTitle: string): Promise<void> {
    await this.searchBox.fillText(bookTitle);
  }

  async doesBookExist(
    bookTitle: string,
    shouldExist: boolean,
  ): Promise<boolean> {
    await this.table.waitForElementToBeVisible();
    const bookLink = new Element(`xpath=//a[.="${bookTitle}"]`);
    const numberOfElement = await bookLink.getNumberOfElements();
    //return numberOfElement > 0;
    return shouldExist ? numberOfElement > 0 : numberOfElement === 0;
  }

  async handleAlert(): Promise<string> {
    return await BrowserUtils.handleAlert();
  }

  async registerAlert(timeout: number = 5000): Promise<void> {
    await BrowserUtils.registerAlert(timeout);
  }
  async deleteBookByIsbn(isbn: string): Promise<void> {
    const deleteIcon = new Element(`xpath=//a[.="${isbn}"]`);
    await deleteIcon.click();
    await this.registerAlert();
    await this.okButton.click();
    await this.handleAlert();
  }

  async deleteBookByName(bookTitle: string): Promise<void> {
    const deleteIcon = new Element(
      `xpath=//a[contains(.,"${bookTitle}")]/ancestor::tr//span[@title='Delete']`,
    );
    await deleteIcon.click();
    await this.registerAlert();
    await this.okButton.click();
    await this.handleAlert();
  }

  async deleteBookIfExists(bookTitle: string) {
    const exists = await this.doesBookExist(bookTitle, true);
    if (exists == true) {
      console.log(`Book "${bookTitle}" already exists. Deleting it first...`);
      //await this.deleteBookByIsbn(bookData.isbn);
      await this.deleteBookByName(bookData.title);
    }
  }
}
