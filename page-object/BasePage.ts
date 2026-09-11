import { Element } from "../core/elements/element";
import { BrowserUtils } from "../core/browser/browser-utils";
import { Page } from "@playwright/test";
import { BASE_URL, FRONTEND_BOOKSTORE_ENDPOINTS } from "../constants/url";

export class BasePage {
  userNameLabel: Element;
  alertEvent: any;

  constructor(protected readonly page: Page) {
    this.userNameLabel = new Element("id=userName-value");
    this.alertEvent = undefined;
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async goToBookStore() {
    await this.goTo(BASE_URL + FRONTEND_BOOKSTORE_ENDPOINTS.BOOKSTORE);
  }

  async goToLoginPage() {
    await this.goTo(BASE_URL + FRONTEND_BOOKSTORE_ENDPOINTS.LOGIN);
  }

  async goToProfilePage(){
    await this.goTo(BASE_URL + FRONTEND_BOOKSTORE_ENDPOINTS.PROFILE);
  }
  
  async registerAlert(timeout: number = 5000): Promise<void> {
    await BrowserUtils.registerAlert(timeout);
  }

  async handleAlert(): Promise<string> {
    return await BrowserUtils.handleAlert();
  }

  async waitForUserNameDisplayed() {
    await this.userNameLabel.waitForElementToBeVisible();
  }
}
