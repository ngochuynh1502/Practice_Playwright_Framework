import { BasePage } from "./BasePage";
import { Element } from "../core/elements/element";

export class BookStorePage extends BasePage {
    loginLink: Element;

    constructor() {
        super();
        this.loginLink = new Element("xpath=//a[@href='/login']");
    }

    async goToLoginPage(): Promise<void> {
        await this.loginLink.click();
    }
}